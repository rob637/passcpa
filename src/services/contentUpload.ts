// Bulk Upload Script for Local Questions to Firestore
// Run from Admin CMS or as a one-time migration

import { collection, doc, writeBatch, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
// @ts-ignore
import { ALL_QUESTIONS } from '../data/questions';
// @ts-ignore
import { FAR_TBS_ALL, REG_TBS_ALL, AUD_TBS_ALL, BEC_TBS_ALL } from '../data/tbs';
// @ts-ignore
import { BEC_WRITTEN_COMMUNICATIONS } from '../data/written-communication';

// Batch size for Firestore (max 500 per batch)
const BATCH_SIZE = 400;

/**
 * Upload all local MCQ questions to Firestore
 */
export async function uploadAllMCQs(onProgress: (status: string) => void) {
  const questionsRef = collection(db, 'questions');

  // Get existing question IDs to avoid duplicates
  const existingSnap = await getDocs(questionsRef);
  const existingIds = new Set(existingSnap.docs.map((d) => d.id));

  // Filter out questions that already exist
  const newQuestions = ALL_QUESTIONS.filter((q: any) => !existingIds.has(q.id));

  if (newQuestions.length === 0) {
    return { uploaded: 0, skipped: ALL_QUESTIONS.length, message: 'All questions already exist' };
  }

  let uploaded = 0;
  let batches = [];
  let currentBatch = writeBatch(db);
  let batchCount = 0;

  for (const question of newQuestions) {
    const docRef = doc(questionsRef, question.id);
    currentBatch.set(docRef, {
      ...question,
      createdAt: new Date(),
      source: 'local_bank',
      verified: true,
    });

    batchCount++;

    if (batchCount >= BATCH_SIZE) {
      batches.push(currentBatch);
      currentBatch = writeBatch(db);
      batchCount = 0;
    }
  }

  // Push final batch
  if (batchCount > 0) {
    batches.push(currentBatch);
  }

  // Execute batches
  for (let i = 0; i < batches.length; i++) {
    if (onProgress) {
        onProgress(`Uploading batch ${i + 1} of ${batches.length}...`);
    }
    await batches[i].commit();
    uploaded += (i === batches.length - 1) ? batchCount : BATCH_SIZE;
  }

  return { uploaded, skipped: ALL_QUESTIONS.length - newQuestions.length };
}

/**
 * Upload TBS simulations
 */
export async function uploadTBS(onProgress: (status: string) => void) {
    // Combine all TBS
    const allTBS = [...FAR_TBS_ALL, ...REG_TBS_ALL, ...AUD_TBS_ALL, ...BEC_TBS_ALL];
    
    const tbsRef = collection(db, 'tbs');
    const existingSnap = await getDocs(tbsRef);
    const existingIds = new Set(existingSnap.docs.map(d => d.id));

    const newTBS = allTBS.filter((t: any) => !existingIds.has(t.id));

    if (newTBS.length === 0) {
        return { uploaded: 0, skipped: allTBS.length, message: 'All TBS already exist' };
    }

    let currentBatch = writeBatch(db);
    let batchCount = 0;
    const batches = [];

    for (const tbs of newTBS) {
        const docRef = doc(tbsRef, tbs.id);
        currentBatch.set(docRef, {
            ...tbs,
            createdAt: new Date(),
            source: 'local_bank',
            verified: true
        });

        batchCount++;
         if (batchCount >= BATCH_SIZE) {
            batches.push(currentBatch);
            currentBatch = writeBatch(db);
            batchCount = 0;
        }
    }

    if (batchCount > 0) batches.push(currentBatch);

    for (let i = 0; i < batches.length; i++) {
        if (onProgress) onProgress(`Uploading TBS Batch ${i+1}/${batches.length}`);
        await batches[i].commit();
    }

    return { uploaded: newTBS.length, skipped: allTBS.length - newTBS.length };
}

/**
 * Upload Written Communications
 */
export async function uploadWC(onProgress: (status: string) => void) {
    if (!BEC_WRITTEN_COMMUNICATIONS || BEC_WRITTEN_COMMUNICATIONS.length === 0) return { uploaded: 0 };

    const wcRef = collection(db, 'written_communications');
    const existingSnap = await getDocs(wcRef);
    const existingIds = new Set(existingSnap.docs.map(d => d.id));

    const newWC = BEC_WRITTEN_COMMUNICATIONS.filter((wc: any) => !existingIds.has(wc.id));

     if (newWC.length === 0) {
        return { uploaded: 0, skipped: BEC_WRITTEN_COMMUNICATIONS.length };
    }

    const batch = writeBatch(db);
    newWC.forEach((wc: any) => {
        const docRef = doc(wcRef, wc.id);
        batch.set(docRef, { ...wc, createdAt: new Date(), source: 'local_bank' });
    });

    await batch.commit();
    return { uploaded: newWC.length, skipped: BEC_WRITTEN_COMMUNICATIONS.length - newWC.length };
}

export default {
    uploadAllMCQs,
    uploadTBS,
    uploadWC
};
