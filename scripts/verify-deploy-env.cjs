#!/usr/bin/env node
/**
 * Verify Deploy Environment
 * 
 * Prevents deploying wrong environment builds to wrong Firebase projects.
 * Reads the built index.html to detect which Firebase project the build targets,
 * then compares against the current Firebase project being deployed to.
 * 
 * Usage: node scripts/verify-deploy-env.cjs
 * Called automatically by firebase predeploy hook
 * 
 * In CI environments (GitHub Actions), this check is skipped because
 * the workflow already performs its own environment verification.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Skip in CI environments - GitHub Actions already verifies environment before deploy
if (process.env.CI || process.env.GITHUB_ACTIONS) {
  console.log('🔍 CI environment detected - skipping predeploy verification (handled by workflow)');
  process.exit(0);
}

// Project ID patterns to detect from build
const PROJECT_PATTERNS = {
  'passcpa-dev': 'development',
  'voraprep-staging': 'staging', 
  'voraprep-prod': 'production',
  'passcpa': 'production', // Legacy prod project name
};

// Get current Firebase project from CLI
function getCurrentFirebaseProject() {
  // First check environment variables (set by firebase CLI with --project flag)
  // GCLOUD_PROJECT is set by Firebase CLI when --project is specified
  if (process.env.GCLOUD_PROJECT) {
    return process.env.GCLOUD_PROJECT;
  }
  if (process.env.FIREBASE_PROJECT) {
    return process.env.FIREBASE_PROJECT;
  }
  
  try {
    // Execute firebase use and capture both stdout and stderr
    const result = execSync('firebase use 2>&1', { encoding: 'utf8' }).trim();
    // Output varies by context:
    //   Interactive terminal: "Active Project: staging (voraprep-staging)" or "Active Project: passcpa-dev"
    //   Non-interactive/subprocess: just "voraprep-staging"
    
    // Try parenthesized project ID first (alias format)
    const aliasMatch = result.match(/Active Project:\s*\S+\s+\((\S+)\)/);
    if (aliasMatch) return aliasMatch[1];
    // Try direct "Active Project: project-id" format
    const match = result.match(/Active Project:\s*(\S+)/);
    if (match) return match[1];
    // Non-interactive: output is just the project ID
    if (result && !result.includes(' ') && !result.includes('\n')) return result;
    
    // Fallback: check .firebaserc
    const firebaserc = JSON.parse(fs.readFileSync('.firebaserc', 'utf8'));
    return firebaserc.projects?.default;
  } catch {
    // Alternative: check .firebaserc
    try {
      const firebaserc = JSON.parse(fs.readFileSync('.firebaserc', 'utf8'));
      return firebaserc.projects?.default;
    } catch {
      return null;
    }
  }
}

// Detect which project the build targets by checking dist files
function detectBuildTarget() {
  const distPath = path.join(__dirname, '..', 'dist');
  const indexPath = path.join(distPath, 'index.html');
  
  if (!fs.existsSync(indexPath)) {
    console.error('❌ No build found. Run npm run build:{env} first.');
    process.exit(1);
  }

  // Check all JS files in dist/assets for Firebase config
  const assetsPath = path.join(distPath, 'assets');
  
  if (fs.existsSync(assetsPath)) {
    const jsFiles = fs.readdirSync(assetsPath).filter(f => f.endsWith('.js'));
    
    // Count occurrences to determine the PRIMARY environment
    // Some admin components may have hardcoded prod URLs even in dev builds
    let devCount = 0, prodCount = 0, stagingCount = 0;
    
    for (const jsFile of jsFiles) {
      try {
        const content = fs.readFileSync(path.join(assetsPath, jsFile), 'utf8');
        
        // Check for Firebase config patterns in the firebase config file specifically
        // (look for auth domain patterns which are more reliable)
        if (content.includes('passcpa-dev.firebaseapp.com')) {
          devCount += 10; // Strong signal
        }
        if (content.includes('voraprep-prod.firebaseapp.com')) {
          prodCount += 10; // Strong signal
        }
        if (content.includes('voraprep-staging.firebaseapp.com')) {
          stagingCount += 10; // Strong signal
        }
        
        // Weak signals (could be hardcoded URLs in UI)
        if (content.includes('passcpa-dev')) devCount++;
        if (content.includes('voraprep-prod')) prodCount++;
        if (content.includes('voraprep-staging')) stagingCount++;
      } catch {}
    }
    
    // Return based on highest count
    if (devCount >= prodCount && devCount >= stagingCount && devCount > 0) {
      return { projectId: 'passcpa-dev', envName: 'development' };
    }
    if (stagingCount >= prodCount && stagingCount >= devCount && stagingCount > 0) {
      return { projectId: 'voraprep-staging', envName: 'staging' };
    }
    if (prodCount > 0) {
      return { projectId: 'voraprep-prod', envName: 'production' };
    }
  }
  
  return null;
}

// Main
function main() {
  const currentProject = getCurrentFirebaseProject();
  const buildTarget = detectBuildTarget();
  
  console.log('\n🔍 Verifying deploy environment...');
  console.log(`   Deploy target: ${currentProject || 'unknown'}`);
  console.log(`   Build target:  ${buildTarget?.projectId || 'unknown'} (${buildTarget?.envName || '?'})`);
  
  if (!currentProject) {
    console.error('❌ Could not determine current Firebase project. Run: firebase use <project>');
    process.exit(1);
  }
  
  if (!buildTarget) {
    console.warn('⚠️  Could not detect build target from dist. Proceeding with caution...');
    return;
  }
  
  // Check for mismatch
  const targetEnv = PROJECT_PATTERNS[currentProject];
  if (buildTarget.envName !== targetEnv) {
    console.error('\n❌ ENVIRONMENT MISMATCH DETECTED!');
    console.error(`   You're trying to deploy a ${buildTarget.envName.toUpperCase()} build`);
    console.error(`   to the ${targetEnv?.toUpperCase() || currentProject} Firebase project.`);
    console.error('\n   To fix, run the correct deploy command:');
    console.error(`   npm run deploy:dev     # For development`);
    console.error(`   npm run deploy:staging # For staging`);
    console.error(`   npm run deploy:prod    # For production`);
    console.error('');
    process.exit(1);
  }
  
  console.log(`✅ Environment verified: ${buildTarget.envName}\n`);
}

main();
