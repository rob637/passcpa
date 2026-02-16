/**
 * One-time script to set isAdmin: true on admin user documents in Firestore.
 *
 * Usage:
 *   node scripts/set-admin.cjs --project staging
 *   node scripts/set-admin.cjs --project production
 *   node scripts/set-admin.cjs --project development
 *
 * Looks up each ADMIN_EMAIL by email in the users collection and sets isAdmin: true.
 * Uses Firebase Admin SDK with Application Default Credentials (from `firebase login`).
 */

const admin = require('firebase-admin');

const ADMIN_EMAILS = [
  'admin@voraprep.com',
  'rob@sagecg.com',
  'rob@voraprep.com',
];

const PROJECT_MAP = {
  development: 'passcpa-dev',
  staging: 'voraprep-staging',
  production: 'voraprep-prod',
};

async function main() {
  const args = process.argv.slice(2);
  const projectArg = args.find((a, i) => args[i - 1] === '--project') || 'staging';
  const projectId = PROJECT_MAP[projectArg] || projectArg;

  console.log(`Setting isAdmin on project: ${projectId}`);

  admin.initializeApp({ projectId });
  const db = admin.firestore();

  for (const email of ADMIN_EMAILS) {
    console.log(`\nLooking up: ${email}`);
    const snapshot = await db.collection('users').where('email', '==', email).limit(1).get();

    if (snapshot.empty) {
      console.log(`  ⚠ No user document found for ${email}`);
      continue;
    }

    const userDoc = snapshot.docs[0];
    const data = userDoc.data();
    if (data.isAdmin === true) {
      console.log(`  ✓ Already has isAdmin: true (uid: ${userDoc.id})`);
      continue;
    }

    await userDoc.ref.update({ isAdmin: true });
    console.log(`  ✓ Set isAdmin: true (uid: ${userDoc.id})`);
  }

  console.log('\nDone.');
  process.exit(0);
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
