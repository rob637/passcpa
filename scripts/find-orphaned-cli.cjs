/**
 * Find Orphaned Users using Firebase CLI
 * Uses firebase firestore:document command to check each user
 */

const { exec } = require('child_process');
const util = require('util');
const fs = require('fs');
const path = require('path');

const execPromise = util.promisify(exec);

async function checkUserDoc(uid) {
  try {
    const { stdout } = await execPromise(
      `firebase firestore:document users/${uid} --project voraprep-prod 2>/dev/null`,
      { timeout: 15000 }
    );
    // Check if the document has actual user fields
    return stdout.includes('"email"') || stdout.includes('"displayName"') || stdout.includes('"createdAt"');
  } catch {
    return false;
  }
}

async function main() {
  // Load exported auth users
  const usersPath = path.join(__dirname, '..', 'users.json');
  if (!fs.existsSync(usersPath)) {
    console.error('users.json not found. Run: firebase auth:export users.json --project voraprep-prod');
    process.exit(1);
  }
  
  const authData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
  const authUsers = authData.users || authData;
  
  console.log(`Checking ${authUsers.length} Firebase Auth users for Firestore documents...\n`);
  
  const orphaned = [];
  let checked = 0;
  
  for (const user of authUsers) {
    checked++;
    process.stdout.write(`\rChecking ${checked}/${authUsers.length}...`);
    
    const hasDoc = await checkUserDoc(user.localId);
    if (!hasDoc) {
      orphaned.push({
        uid: user.localId,
        email: user.email,
        displayName: user.displayName,
        createdAt: user.createdAt,
      });
    }
  }
  
  console.log(`\n\n=== RESULTS ===`);
  console.log(`Total Auth users: ${authUsers.length}`);
  console.log(`Orphaned users (no Firestore doc): ${orphaned.length}`);
  
  if (orphaned.length > 0) {
    console.log(`\nOrphaned users:`);
    orphaned.forEach(u => {
      console.log(`  ${u.email || u.uid} (${u.displayName || 'no name'})`);
    });
    
    // Save to file
    fs.writeFileSync(
      path.join(__dirname, '..', 'orphaned-users.json'),
      JSON.stringify(orphaned, null, 2)
    );
    console.log(`\nSaved to orphaned-users.json`);
  }
}

main().catch(console.error);
