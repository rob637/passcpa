/**
 * Firebase Admin Configuration for Migration Scripts
 * 
 * This module provides SAFE Firebase initialization for migration scripts.
 * It REQUIRES explicit environment specification and NEVER uses fallback values.
 * 
 * Usage:
 *   FIREBASE_ENV=development npx tsx scripts/migrate_to_db.ts
 *   FIREBASE_ENV=staging npx tsx scripts/migrate_to_db.ts
 *   FIREBASE_ENV=production npx tsx scripts/migrate_to_db.ts --confirm-production
 */

import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import * as readline from 'readline';

type Environment = 'development' | 'staging' | 'production';

// Environment configurations - NO FALLBACKS
const ENVIRONMENTS: Record<Environment, {
  projectId: string;
  description: string;
  color: string;
  requiresConfirmation: boolean;
}> = {
  development: {
    projectId: 'passcpa-dev',
    description: 'Development (passcpa-dev)',
    color: '\x1b[32m', // Green
    requiresConfirmation: false,
  },
  staging: {
    projectId: 'voraprep-staging',
    description: 'Staging (voraprep-staging)',
    color: '\x1b[33m', // Yellow
    requiresConfirmation: true,
  },
  production: {
    projectId: 'voraprep-prod',
    description: '🚨 PRODUCTION (voraprep-prod) 🚨',
    color: '\x1b[31m', // Red
    requiresConfirmation: true,
  },
};

function getEnvOrThrow(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `\n❌ Missing required environment variable: ${key}\n` +
      `\nMake sure to set it before running the script:\n` +
      `  export ${key}=your-value\n` +
      `\nOr use a .env file with the appropriate values.`
    );
  }
  return value;
}

async function confirmProduction(): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    console.log('\n\x1b[31m' + '═'.repeat(60) + '\x1b[0m');
    console.log('\x1b[31m⚠️  WARNING: YOU ARE ABOUT TO MODIFY PRODUCTION DATA ⚠️\x1b[0m');
    console.log('\x1b[31m' + '═'.repeat(60) + '\x1b[0m\n');
    console.log('This action can affect real users and cannot be easily undone.\n');

    rl.question('Type "I UNDERSTAND" to continue: ', (answer) => {
      rl.close();
      resolve(answer === 'I UNDERSTAND');
    });
  });
}

export async function initializeFirebaseForMigration(): Promise<{
  app: FirebaseApp;
  db: Firestore;
  environment: Environment;
  projectId: string;
}> {
  // Get environment from FIREBASE_ENV variable
  const envName = process.env.FIREBASE_ENV as Environment | undefined;

  if (!envName) {
    console.error('\n❌ ERROR: FIREBASE_ENV not specified!\n');
    console.error('You MUST specify which environment to target:\n');
    console.error('  FIREBASE_ENV=development npx tsx scripts/your-script.ts');
    console.error('  FIREBASE_ENV=staging npx tsx scripts/your-script.ts');
    console.error('  FIREBASE_ENV=production npx tsx scripts/your-script.ts\n');
    process.exit(1);
  }

  if (!ENVIRONMENTS[envName]) {
    console.error(`\n❌ ERROR: Invalid FIREBASE_ENV="${envName}"\n`);
    console.error('Valid environments: development, staging, production\n');
    process.exit(1);
  }

  const envConfig = ENVIRONMENTS[envName];

  // Display environment banner
  console.log('\n' + envConfig.color + '═'.repeat(60) + '\x1b[0m');
  console.log(envConfig.color + `📍 Target Environment: ${envConfig.description}` + '\x1b[0m');
  console.log(envConfig.color + '═'.repeat(60) + '\x1b[0m\n');

  // Require confirmation for staging/production
  if (envConfig.requiresConfirmation) {
    if (envName === 'production') {
      // Extra confirmation for production
      if (!process.argv.includes('--confirm-production')) {
        console.error('❌ Production migrations require --confirm-production flag\n');
        console.error('Usage: FIREBASE_ENV=production npx tsx scripts/your-script.ts --confirm-production\n');
        process.exit(1);
      }

      const confirmed = await confirmProduction();
      if (!confirmed) {
        console.log('\n❌ Migration cancelled.\n');
        process.exit(0);
      }
    } else {
      // Staging confirmation
      console.log('⚠️  You are targeting STAGING environment.');
      console.log('   Press Ctrl+C within 5 seconds to cancel...\n');
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  // Load Firebase config from environment variables
  // These MUST be set - no fallbacks!
  const firebaseConfig = {
    apiKey: getEnvOrThrow(`FIREBASE_${envName.toUpperCase()}_API_KEY`),
    authDomain: getEnvOrThrow(`FIREBASE_${envName.toUpperCase()}_AUTH_DOMAIN`),
    projectId: getEnvOrThrow(`FIREBASE_${envName.toUpperCase()}_PROJECT_ID`),
    storageBucket: getEnvOrThrow(`FIREBASE_${envName.toUpperCase()}_STORAGE_BUCKET`),
    messagingSenderId: getEnvOrThrow(`FIREBASE_${envName.toUpperCase()}_MESSAGING_SENDER_ID`),
    appId: getEnvOrThrow(`FIREBASE_${envName.toUpperCase()}_APP_ID`),
  };

  // Verify projectId matches expected
  if (firebaseConfig.projectId !== envConfig.projectId) {
    console.error(`\n❌ ERROR: Project ID mismatch!\n`);
    console.error(`   Expected: ${envConfig.projectId}`);
    console.error(`   Got: ${firebaseConfig.projectId}\n`);
    console.error('This is a safety check to prevent writing to the wrong database.\n');
    process.exit(1);
  }

  console.log(`✅ Firebase config verified for: ${firebaseConfig.projectId}`);
  console.log(`📁 Initializing Firestore connection...\n`);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return {
    app,
    db,
    environment: envName,
    projectId: firebaseConfig.projectId,
  };
}

/**
 * Helper to log migration actions with environment context
 */
export function logMigrationAction(
  action: string,
  environment: Environment,
  details?: Record<string, unknown>
) {
  const envConfig = ENVIRONMENTS[environment];
  const timestamp = new Date().toISOString();
  
  console.log(
    `${envConfig.color}[${timestamp}] [${environment.toUpperCase()}]${'\x1b[0m'} ${action}`
  );
  
  if (details) {
    console.log('  ', JSON.stringify(details, null, 2));
  }
}
