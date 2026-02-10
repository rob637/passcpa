/**
 * Beta User Trial Transition Script
 * 
 * Sets trial end date to March 1, 2026 (14 days from Feb 15) for existing users.
 * 
 * SAFETY FEATURES:
 * - Dry-run by default (use --execute to actually modify)
 * - Skips users with active paid subscriptions
 * - Exports backup of current state before modifying
 * - Full audit logging
 * - Requires production confirmation
 * 
 * Usage:
 *   # Dry run (shows what would change, no modifications):
 *   FIREBASE_ENV=production npx tsx scripts/transition-beta-users.ts --confirm-production
 * 
 *   # Actually execute the migration:
 *   FIREBASE_ENV=production npx tsx scripts/transition-beta-users.ts --confirm-production --execute
 */

import { collection, getDocs, doc, setDoc, Timestamp } from 'firebase/firestore';
import { initializeFirebaseForMigration, logMigrationAction } from './lib/firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

const TRIAL_END_DATE = new Date('2026-03-01T23:59:59Z'); // March 1, 2026 end of day
const TRIAL_START_DATE = new Date('2026-02-15T00:00:00Z'); // Feb 15, 2026

interface SubscriptionDoc {
  id: string;
  tier?: string;
  status?: string;
  trialEnd?: Date;
  stripeSubscriptionId?: string;
  [key: string]: unknown;
}

async function main() {
  const isDryRun = !process.argv.includes('--execute');
  
  console.log('\n' + '═'.repeat(60));
  console.log('🔄 Beta User Trial Transition Script');
  console.log('═'.repeat(60));
  console.log(`\n📅 Trial End Date: ${TRIAL_END_DATE.toISOString()}`);
  console.log(`📅 Trial Start Date: ${TRIAL_START_DATE.toISOString()}`);
  console.log(`\n🔍 Mode: ${isDryRun ? '⚠️  DRY RUN (no changes will be made)' : '⚡ EXECUTE (will modify data)'}`);
  
  if (isDryRun) {
    console.log('\n💡 To actually execute, add --execute flag\n');
  }

  const { db, environment, projectId } = await initializeFirebaseForMigration();

  // Step 1: Fetch all subscriptions
  console.log('\n📊 Fetching all subscription records...\n');
  const subscriptionsRef = collection(db, 'subscriptions');
  const snapshot = await getDocs(subscriptionsRef);
  
  const allSubs: SubscriptionDoc[] = [];
  const toUpdate: SubscriptionDoc[] = [];
  const skipped: { id: string; reason: string }[] = [];

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const sub: SubscriptionDoc = {
      id: docSnap.id,
      tier: data.tier,
      status: data.status,
      trialEnd: data.trialEnd?.toDate?.() || data.trialEnd,
      stripeSubscriptionId: data.stripeSubscriptionId,
      ...data,
    };
    allSubs.push(sub);

    // Determine if this user should be updated
    const isPaidActive = 
      sub.tier !== 'free' && 
      (sub.status === 'active' || sub.stripeSubscriptionId);

    if (isPaidActive) {
      skipped.push({ id: sub.id, reason: `Paid subscriber (tier: ${sub.tier}, status: ${sub.status})` });
    } else {
      toUpdate.push(sub);
    }
  });

  console.log(`📈 Total subscriptions found: ${allSubs.length}`);
  console.log(`✅ Will update: ${toUpdate.length}`);
  console.log(`⏭️  Will skip: ${skipped.length}\n`);

  // Step 2: Show what will be skipped
  if (skipped.length > 0) {
    console.log('─'.repeat(40));
    console.log('Skipped users (already paid):');
    console.log('─'.repeat(40));
    skipped.forEach(({ id, reason }) => {
      console.log(`  ⏭️  ${id}: ${reason}`);
    });
    console.log('');
  }

  // Step 3: Show what will be updated
  if (toUpdate.length > 0) {
    console.log('─'.repeat(40));
    console.log('Users to update:');
    console.log('─'.repeat(40));
    toUpdate.slice(0, 20).forEach((sub) => {
      const currentTrialEnd = sub.trialEnd ? new Date(sub.trialEnd).toISOString() : 'none';
      console.log(`  📝 ${sub.id}`);
      console.log(`      Current: tier=${sub.tier || 'none'}, status=${sub.status || 'none'}, trialEnd=${currentTrialEnd}`);
      console.log(`      New: tier=free, status=trialing, trialEnd=${TRIAL_END_DATE.toISOString()}`);
    });
    if (toUpdate.length > 20) {
      console.log(`  ... and ${toUpdate.length - 20} more`);
    }
    console.log('');
  }

  // Step 4: Export backup
  const backupDir = path.join(__dirname, '../backups');
  const backupFile = path.join(backupDir, `subscriptions-backup-${Date.now()}.json`);
  
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  fs.writeFileSync(backupFile, JSON.stringify({
    exportedAt: new Date().toISOString(),
    environment,
    projectId,
    totalRecords: allSubs.length,
    subscriptions: allSubs,
  }, null, 2));
  
  console.log(`💾 Backup exported to: ${backupFile}\n`);

  // Step 5: Execute if not dry run
  if (isDryRun) {
    console.log('═'.repeat(60));
    console.log('🔍 DRY RUN COMPLETE - No changes were made');
    console.log('═'.repeat(60));
    console.log('\nTo execute the migration, run with --execute flag:\n');
    console.log(`  FIREBASE_ENV=production npx tsx scripts/transition-beta-users.ts --confirm-production --execute\n`);
    return;
  }

  // Actually execute updates
  console.log('═'.repeat(60));
  console.log('⚡ EXECUTING MIGRATION...');
  console.log('═'.repeat(60) + '\n');

  let successCount = 0;
  let errorCount = 0;

  for (const sub of toUpdate) {
    try {
      const subRef = doc(db, 'subscriptions', sub.id);
      await setDoc(subRef, {
        tier: 'free',
        status: 'trialing',
        trialEnd: Timestamp.fromDate(TRIAL_END_DATE),
        trialStartDate: Timestamp.fromDate(TRIAL_START_DATE),
        isBetaUser: true,
        isFounder: true, // Eligible for founder pricing
        updatedAt: Timestamp.now(),
      }, { merge: true }); // IMPORTANT: merge to not overwrite other fields

      logMigrationAction(`Updated ${sub.id}`, environment);
      successCount++;
    } catch (error) {
      console.error(`  ❌ Error updating ${sub.id}:`, error);
      errorCount++;
    }
  }

  console.log('\n' + '═'.repeat(60));
  console.log('✅ MIGRATION COMPLETE');
  console.log('═'.repeat(60));
  console.log(`\n📊 Results:`);
  console.log(`   ✅ Successfully updated: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   ⏭️  Skipped (paid): ${skipped.length}`);
  console.log(`\n💾 Backup file: ${backupFile}`);
  console.log(`\n📅 All updated users now have trial ending: ${TRIAL_END_DATE.toISOString()}\n`);
}

main().catch((error) => {
  console.error('\n❌ Migration failed:', error);
  process.exit(1);
});
