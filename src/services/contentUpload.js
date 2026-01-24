// Bulk Upload Script for Local Questions to Firestore
// Run from Admin CMS or as a one-time migration

import { collection, doc, writeBatch, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ALL_QUESTIONS } from '../data/questions';
import { FAR_TBS_ALL, REG_TBS_ALL, AUD_TBS_ALL, BEC_TBS_ALL } from '../data/tbs';
import { BEC_WRITTEN_COMMUNICATIONS } from '../data/written-communication';

// Batch size for Firestore (max 500 per batch)
const BATCH_SIZE = 400;

/**
 * Upload all local MCQ questions to Firestore
 */
export async function uploadAllMCQs(onProgress) {
  const questionsRef = collection(db, 'questions');

  // Get existing question IDs to avoid duplicates
  const existingSnap = await getDocs(questionsRef);
  const existingIds = new Set(existingSnap.docs.map((d) => d.id));

  // Filter out questions that already exist
  const newQuestions = ALL_QUESTIONS.filter((q) => !existingIds.has(q.id));

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

  // Don't forget the last batch
  if (batchCount > 0) {
    batches.push(currentBatch);
  }

  // Commit all batches
  for (let i = 0; i < batches.length; i++) {
    await batches[i].commit();
    uploaded += Math.min(BATCH_SIZE, newQuestions.length - i * BATCH_SIZE);
    onProgress?.({
      current: uploaded,
      total: newQuestions.length,
      percent: Math.round((uploaded / newQuestions.length) * 100),
    });
  }

  return {
    uploaded: newQuestions.length,
    skipped: existingIds.size,
    total: ALL_QUESTIONS.length,
    message: `Uploaded ${newQuestions.length} new questions`,
  };
}

/**
 * Upload all TBS to Firestore
 */
export async function uploadAllTBS(onProgress) {
  const tbsRef = collection(db, 'tbs');

  const allTBS = [...FAR_TBS_ALL, ...REG_TBS_ALL, ...AUD_TBS_ALL, ...BEC_TBS_ALL];

  // Get existing
  const existingSnap = await getDocs(tbsRef);
  const existingIds = new Set(existingSnap.docs.map((d) => d.id));

  const newTBS = allTBS.filter((t) => !existingIds.has(t.id));

  if (newTBS.length === 0) {
    return { uploaded: 0, skipped: allTBS.length, message: 'All TBS already exist' };
  }

  const batch = writeBatch(db);

  for (const tbs of newTBS) {
    const docRef = doc(tbsRef, tbs.id);
    batch.set(docRef, {
      ...tbs,
      createdAt: new Date(),
      source: 'local_bank',
      verified: true,
    });
  }

  await batch.commit();

  return {
    uploaded: newTBS.length,
    skipped: existingIds.size,
    total: allTBS.length,
    message: `Uploaded ${newTBS.length} new TBS`,
  };
}

/**
 * Upload Written Communication tasks
 */
export async function uploadAllWC(onProgress) {
  const wcRef = collection(db, 'written_communications');

  const existingSnap = await getDocs(wcRef);
  const existingIds = new Set(existingSnap.docs.map((d) => d.id));

  const newWC = BEC_WRITTEN_COMMUNICATIONS.filter((w) => !existingIds.has(w.id));

  if (newWC.length === 0) {
    return {
      uploaded: 0,
      skipped: BEC_WRITTEN_COMMUNICATIONS.length,
      message: 'All WC already exist',
    };
  }

  const batch = writeBatch(db);

  for (const wc of newWC) {
    const docRef = doc(wcRef, wc.id);
    batch.set(docRef, {
      ...wc,
      createdAt: new Date(),
      source: 'local_bank',
    });
  }

  await batch.commit();

  return {
    uploaded: newWC.length,
    skipped: existingIds.size,
    total: BEC_WRITTEN_COMMUNICATIONS.length,
    message: `Uploaded ${newWC.length} new Written Communications`,
  };
}

/**
 * Upload everything
 */
export async function uploadAllContent(onProgress) {
  const results = {
    mcq: null,
    tbs: null,
    wc: null,
    errors: [],
  };

  try {
    onProgress?.({ stage: 'mcq', message: 'Uploading MCQ questions...' });
    results.mcq = await uploadAllMCQs((p) => onProgress?.({ stage: 'mcq', ...p }));
  } catch (error) {
    results.errors.push({ stage: 'mcq', error: error.message });
  }

  try {
    onProgress?.({ stage: 'tbs', message: 'Uploading TBS...' });
    results.tbs = await uploadAllTBS((p) => onProgress?.({ stage: 'tbs', ...p }));
  } catch (error) {
    results.errors.push({ stage: 'tbs', error: error.message });
  }

  try {
    onProgress?.({ stage: 'wc', message: 'Uploading Written Communications...' });
    results.wc = await uploadAllWC((p) => onProgress?.({ stage: 'wc', ...p }));
  } catch (error) {
    results.errors.push({ stage: 'wc', error: error.message });
  }

  return results;
}

/**
 * Get content statistics
 */
export function getLocalContentStats() {
  const allTBS = [...FAR_TBS_ALL, ...REG_TBS_ALL, ...AUD_TBS_ALL, ...BEC_TBS_ALL];

  return {
    mcq: {
      total: ALL_QUESTIONS.length,
      bySection: {
        REG: ALL_QUESTIONS.filter((q) => q.section === 'REG').length,
        FAR: ALL_QUESTIONS.filter((q) => q.section === 'FAR').length,
        AUD: ALL_QUESTIONS.filter((q) => q.section === 'AUD').length,
        BEC: ALL_QUESTIONS.filter((q) => q.section === 'BEC').length,
      },
    },
    tbs: {
      total: allTBS.length,
      bySection: {
        FAR: FAR_TBS_ALL.length,
        REG: REG_TBS_ALL.length,
        AUD: AUD_TBS_ALL.length,
        BEC: BEC_TBS_ALL.length,
      },
    },
    wc: {
      total: BEC_WRITTEN_COMMUNICATIONS.length,
    },
  };
}
