
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, writeBatch, getDoc } from 'firebase/firestore';
import { ALL_QUESTIONS } from '../src/data/questions/index';
// Need to handle the relative imports in the data files which might break in a standalone script
// We will rely on vite-node or tsx to handle the module resolution
import { LESSONS } from '../src/data/lessons/index';
import { ALL_TBS } from '../src/data/tbs/index';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyA4YQJ-XyJgQ1-r_xqt4eM-N1Sd05Yv9ak",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "passcpa-dev.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "passcpa-dev",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "passcpa-dev.firebasestorage.app",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "592178009498",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:592178009498:web:c1d5a12b9e3ff9b53a53e7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrateQuestions() {
    console.log(`Starting migration of ${ALL_QUESTIONS.length} questions...`);
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
        console.log(`Migrated ${count}/${ALL_QUESTIONS.length} questions`);
    }
}

async function migrateLessons() {
    console.log('Starting migration of lessons...');
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
     console.log(`Starting migration of ${ALL_TBS.length} simulations...`);
     const batch = writeBatch(db);
     // TBS count is small (26), one batch is fine
     for (const tbs of ALL_TBS) {
         const ref = doc(db, 'tbs', tbs.id);
         const data = JSON.parse(JSON.stringify(tbs));
         batch.set(ref, data, { merge: true });
     }
     await batch.commit();
     console.log(`Migrated ${ALL_TBS.length} simulations`);
}

async function run() {
    try {
        await migrateTBS();
        // Remaking migrateLessons to be safe
        let allLessons = [];
        Object.values(LESSONS).forEach(list => allLessons.push(...list));
        console.log(`Found ${allLessons.length} lessons to migrate`);
        
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
            console.log(`Batch of lessons committed`);
        }

        await migrateQuestions();
        
        console.log('Migration Complete');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

run();
