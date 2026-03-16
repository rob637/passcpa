/**
 * Fix Orphaned Users
 * 
 * Finds users who exist in Firebase Auth but don't have a Firestore document,
 * then creates the missing documents.
 * 
 * Usage:
 *   node scripts/fix-orphaned-users.cjs
 * 
 * Requires:
 *   - Firebase CLI logged in with admin access
 *   - Run `firebase login --reauth` if auth expires
 */

const admin = require('firebase-admin');
const path = require('path');

// Try to use Firebase CLI credentials via environment
// Run: export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
// Or it will try to use default credentials

try {
  admin.initializeApp({
    projectId: 'voraprep-prod',
  });
} catch (e) {
  // Already initialized
}

const db = admin.firestore();
const auth = admin.auth();

async function findOrphanedUsers() {
  console.log('🔍 Finding orphaned users (Auth exists, Firestore missing)...\n');
  
  const orphaned = [];
  let nextPageToken;
  let totalAuthUsers = 0;
  
  // Iterate through all Firebase Auth users
  do {
    const listResult = await auth.listUsers(1000, nextPageToken);
    totalAuthUsers += listResult.users.length;
    
    for (const user of listResult.users) {
      // Check if Firestore document exists
      const docRef = db.collection('users').doc(user.uid);
      const docSnap = await docRef.get();
      
      // Document doesn't exist OR exists but has no fields (ghost doc)
      if (!docSnap.exists || Object.keys(docSnap.data() || {}).length === 0) {
        orphaned.push({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
          createdAt: user.metadata.creationTime,
          lastSignIn: user.metadata.lastSignInTime,
          hasGhostDoc: docSnap.exists, // Has subcollections but no fields
        });
      }
    }
    
    nextPageToken = listResult.pageToken;
  } while (nextPageToken);
  
  console.log(`Total Firebase Auth users: ${totalAuthUsers}`);
  console.log(`Orphaned users (no Firestore doc): ${orphaned.length}\n`);
  
  return orphaned;
}

async function fixOrphanedUsers(orphaned, dryRun = true) {
  if (orphaned.length === 0) {
    console.log('✅ No orphaned users to fix!');
    return;
  }
  
  console.log(`${dryRun ? '🔍 DRY RUN - ' : '🔧 '}Processing ${orphaned.length} orphaned users...\n`);
  
  for (const user of orphaned) {
    const profile = {
      email: user.email || '',
      displayName: user.displayName || user.email?.split('@')[0] || 'User',
      createdAt: user.createdAt ? admin.firestore.Timestamp.fromDate(new Date(user.createdAt)) : admin.firestore.Timestamp.now(),
      activeCourse: 'cpa', // Default, but we can try to infer from subcollections
      onboardingComplete: false,
      dailyGoal: 50,
      settings: {
        notifications: true,
        darkMode: false,
        soundEffects: true,
      },
      _repairedAt: admin.firestore.Timestamp.now(),
      _repairReason: 'orphaned_auth_user',
    };
    
    // Try to infer course from daily_log subcollection if it exists
    if (user.hasGhostDoc) {
      try {
        const dailyLogSnap = await db.collection('users').doc(user.uid).collection('daily_log').limit(1).get();
        if (!dailyLogSnap.empty) {
          const logData = dailyLogSnap.docs[0].data();
          if (logData.courseId) {
            profile.activeCourse = logData.courseId;
          }
        }
      } catch {
        // Ignore
      }
    }
    
    console.log(`  ${user.email || user.uid}`);
    console.log(`    - UID: ${user.uid}`);
    console.log(`    - Display Name: ${user.displayName || '(none)'}`);
    console.log(`    - Auth Created: ${user.createdAt}`);
    console.log(`    - Email Verified: ${user.emailVerified}`);
    console.log(`    - Has Ghost Doc: ${user.hasGhostDoc}`);
    console.log(`    - Inferred Course: ${profile.activeCourse}`);
    
    if (!dryRun) {
      try {
        await db.collection('users').doc(user.uid).set(profile, { merge: true });
        console.log(`    ✅ Fixed!\n`);
      } catch (err) {
        console.log(`    ❌ Error: ${err.message}\n`);
      }
    } else {
      console.log(`    (dry run - would create document)\n`);
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = !args.includes('--fix');
  
  if (dryRun) {
    console.log('='.repeat(60));
    console.log('DRY RUN MODE - No changes will be made');
    console.log('Run with --fix to actually create the missing documents');
    console.log('='.repeat(60) + '\n');
  }
  
  try {
    const orphaned = await findOrphanedUsers();
    await fixOrphanedUsers(orphaned, dryRun);
    
    if (dryRun && orphaned.length > 0) {
      console.log('\n' + '='.repeat(60));
      console.log('To fix these users, run:');
      console.log('  node scripts/fix-orphaned-users.cjs --fix');
      console.log('='.repeat(60));
    }
  } catch (err) {
    console.error('Error:', err.message);
    if (err.message.includes('invalid_grant') || err.message.includes('invalid_rapt')) {
      console.log('\n⚠️  Auth token expired. Run: firebase login --reauth');
    }
    process.exit(1);
  }
  
  process.exit(0);
}

main();
