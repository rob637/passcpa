/**
 * Database Migration Script
 * 
 * SAFE USAGE:
 *   FIREBASE_ENV=development npx tsx scripts/migrate_to_db.ts
 *   FIREBASE_ENV=staging npx tsx scripts/migrate_to_db.ts
 *   FIREBASE_ENV=production npx tsx scripts/migrate_to_db.ts --confirm-production
 * 
 * NEVER run without specifying FIREBASE_ENV!
 */

import { collection, doc, writeBatch, getDoc } from 'firebase/firestore';
import { initializeFirebaseForMigration, logMigrationAction } from './lib/firebase-admin';
import { ALL_QUESTIONS } from '../src/data/questions/index';
import { LESSONS } from '../src/data/lessons/index';
import { ALL_TBS } from '../src/data/tbs/index';

// These will be set after initialization
let db: Awaited<ReturnType<typeof initializeFirebaseForMigration>>['db'];
let environment: Awaited<ReturnType<typeof initializeFirebaseForMigration>>['environment'];

async function migrateQuestions() {
    logMigrationAction(`Starting migration of ${ALL_QUESTIONS.length} questions...`, environment);
    const batchSize = 400; // Firestore limit is 500
    const chunks = [];
    
    for (let i = 0; i < ALL_QUESTIONS.length; i += batchSize) {
        chunks.push(ALL_QUESTIONS.slice(i, i + batchSize));
    }

    let count = 0;
    for (const chunk of chunks) {
        const batch = writeBatch(db);
        chunk.forEach(q => {
            // Use existing ID or generate one if missing
            const ref = q.id ? doc(db, 'questions', q.id) : doc(collection(db, 'questions'));
            // Remove undefined values
            const data = JSON.parse(JSON.stringify(q));
            batch.set(ref, data, { merge: true });
        });
        await batch.commit();
        count += chunk.length;
        logMigrationAction(`Migrated ${count}/${ALL_QUESTIONS.length} questions`, environment);
    }
}

async function migrateLessons() {
    logMigrationAction('Starting migration of lessons...', environment);
    let totalLessons = 0;
    const batch = writeBatch(db);
    let opCount = 0;

    for (const [section, lessons] of Object.entries(LESSONS)) {
        for (const lesson of lessons) {
            const ref = doc(db, 'lessons', lesson.id);
            const data = JSON.parse(JSON.stringify(lesson));
            batch.set(ref, data, { merge: true });
            opCount++;
            totalLessons++;

            if (opCount >= 400) {
                await batch.commit();
                opCount = 0; // Reset batch
                // Need to create new batch here? Yes, variable is const though? No, verify scope.
                // writeBatch creates a new instance.
                // Wait, batch is const defined outside loop. This logic is flawed.
            }
        }
    }
    // This batch logic above is buggy because I can't reassign const batch.
    // I will rewrite this function to be chunk-based like questions.
}

async function migrateTBS() {
     logMigrationAction(`Starting migration of ${ALL_TBS.length} simulations...`, environment);
     const batch = writeBatch(db);
     // TBS count is small (26), one batch is fine
     for (const tbs of ALL_TBS) {
         const ref = doc(db, 'tbs', tbs.id);
         const data = JSON.parse(JSON.stringify(tbs));
         batch.set(ref, data, { merge: true });
     }
     await batch.commit();
     logMigrationAction(`Migrated ${ALL_TBS.length} simulations`, environment);
}

async function run() {
    try {
        // Initialize Firebase with safety checks
        const firebaseInstance = await initializeFirebaseForMigration();
        db = firebaseInstance.db;
        environment = firebaseInstance.environment;

        logMigrationAction('Migration starting...', environment, {
          projectId: firebaseInstance.projectId,
          questionsCount: ALL_QUESTIONS.length,
          tbsCount: ALL_TBS.length,
        });

        await migrateTBS();
        // Remaking migrateLessons to be safe
        const allLessons: any[] = [];
        Object.values(LESSONS).forEach(list => allLessons.push(...list));
        logMigrationAction(`Found ${allLessons.length} lessons to migrate`, environment);
        
        const lessonChunks = [];
        for(let i=0; i<allLessons.length; i+=400) {
            lessonChunks.push(allLessons.slice(i, i+400));
        }
        
        for(const chunk of lessonChunks) {
            const batch = writeBatch(db);
            chunk.forEach(l => {
                const ref = doc(db, 'lessons', l.id);
                const data = JSON.parse(JSON.stringify(l));

                // TRANSFORMATION: Fix nested arrays for Firestore (Lesson Tables)
                if (data.content && Array.isArray(data.content.sections)) {
                    data.content.sections = data.content.sections.map((section: any) => {
                        if (section.type === 'table' && Array.isArray(section.rows)) {
                            // Check if it's a nested array
                            const isNested = section.rows.some((r: any) => Array.isArray(r));
                            if (isNested) {
                                section.rows = section.rows.map((row: any) => {
                                    return Array.isArray(row) ? { values: row } : row;
                                });
                            }
                        }
                        return section;
                    });
                }

                batch.set(ref, data, { merge: true });
            });
            await batch.commit();
            logMigrationAction(`Batch of lessons committed`, environment);
        }

        await migrateQuestions();
        
        logMigrationAction('Migration Complete', environment);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

run();
