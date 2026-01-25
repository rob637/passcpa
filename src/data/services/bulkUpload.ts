// Firestore Bulk Upload Service
// Uploads question banks to Firestore

import { db } from '../../config/firebase';
import { collection, doc, writeBatch, getDocs, query, where } from 'firebase/firestore';
import { ALL_QUESTIONS, getQuestionStats } from '../questions';
import { ExamSection } from '../../types';

const QUESTIONS_COLLECTION = 'questions';
const BATCH_SIZE = 500; // Firestore batch limit

type ProgressCallback = (percent: number, message: string) => void;

interface UploadResults {
  success: number;
  failed: number;
  errors: string[];
}

/**
 * Upload all questions to Firestore
 * @param {Function} onProgress - Progress callback (percent, message)
 * @returns {Promise<{success: number, failed: number, errors: string[]}>}
 */
export const uploadAllQuestions = async (onProgress: ProgressCallback = () => {}) => {
  const results: UploadResults = {
    success: 0,
    failed: 0,
    errors: [],
  };

  const questions = ALL_QUESTIONS;
  const totalBatches = Math.ceil(questions.length / BATCH_SIZE);

  onProgress(0, `Starting upload of ${questions.length} questions...`);

  for (let i = 0; i < questions.length; i += BATCH_SIZE) {
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
    const batch = writeBatch(db);
    const batchQuestions = questions.slice(i, i + BATCH_SIZE);

    onProgress(
      Math.round((i / questions.length) * 100),
      `Processing batch ${batchNumber}/${totalBatches}...`
    );

    for (const question of batchQuestions) {
      try {
        const docRef = doc(collection(db, QUESTIONS_COLLECTION), question.id);
        batch.set(docRef, {
          ...question,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        results.success++;
      } catch (error: any) {
        results.failed++;
        results.errors.push(`${question.id}: ${error.message}`);
      }
    }

    try {
      await batch.commit();
      onProgress(
        Math.round(((i + batchQuestions.length) / questions.length) * 100),
        `Committed batch ${batchNumber}/${totalBatches}`
      );
    } catch (error: any) {
      results.failed += batchQuestions.length;
      results.success -= batchQuestions.length;
      results.errors.push(`Batch ${batchNumber} failed: ${error.message}`);
    }
  }

  onProgress(100, `Upload complete! ${results.success} questions uploaded.`);
  return results;
};

/**
 * Upload questions for a specific section
 * @param {string} section - Section code (FAR, AUD, REG, BEC)
 * @param {Array} questions - Questions to upload
 * @param {Function} onProgress - Progress callback
 */
export const uploadSectionQuestions = async (section: ExamSection, questions: any[], onProgress: ProgressCallback = () => {}) => {
  const results: UploadResults = {
    success: 0,
    failed: 0,
    errors: [],
  };

  const totalBatches = Math.ceil(questions.length / BATCH_SIZE);

  onProgress(0, `Starting upload of ${questions.length} ${section} questions...`);

  for (let i = 0; i < questions.length; i += BATCH_SIZE) {
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
    const batch = writeBatch(db);
    const batchQuestions = questions.slice(i, i + BATCH_SIZE);

    for (const question of batchQuestions) {
      try {
        const docRef = doc(collection(db, QUESTIONS_COLLECTION), question.id);
        batch.set(docRef, {
          ...question,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        results.success++;
      } catch (error: any) {
        results.failed++;
        results.errors.push(`${question.id}: ${error.message}`);
      }
    }

    try {
      await batch.commit();
      onProgress(
        Math.round(((i + batchQuestions.length) / questions.length) * 100),
        `Committed batch ${batchNumber}/${totalBatches}`
      );
    } catch (error: any) {
      results.failed += batchQuestions.length;
      results.success -= batchQuestions.length;
      results.errors.push(`Batch ${batchNumber} failed: ${error.message}`);
    }
  }

  onProgress(100, `Upload complete! ${results.success} ${section} questions uploaded.`);
  return results;
};

/**
 * Delete all questions from Firestore
 * @param {Function} onProgress - Progress callback
 */
export const deleteAllQuestions = async (onProgress: ProgressCallback = () => {}) => {
  onProgress(0, 'Fetching existing questions...');

  const snapshot = await getDocs(collection(db, QUESTIONS_COLLECTION));
  const total = snapshot.size;

  if (total === 0) {
    onProgress(100, 'No questions to delete.');
    return { deleted: 0 };
  }

  let deleted = 0;
  const docs = snapshot.docs;

  for (let i = 0; i < docs.length; i += BATCH_SIZE) {
    const batch = writeBatch(db);
    const batchDocs = docs.slice(i, i + BATCH_SIZE);

    batchDocs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    deleted += batchDocs.length;
    onProgress(Math.round((deleted / total) * 100), `Deleted ${deleted}/${total} questions...`);
  }

  onProgress(100, `Deleted ${deleted} questions.`);
  return { deleted };
};

/**
 * Delete questions for a specific section
 * @param {string} section - Section code
 * @param {Function} onProgress - Progress callback
 */
export const deleteSectionQuestions = async (section: ExamSection, onProgress: ProgressCallback = () => {}) => {
  onProgress(0, `Fetching ${section} questions...`);

  const q = query(collection(db, QUESTIONS_COLLECTION), where('section', '==', section));
  const snapshot = await getDocs(q);
  const total = snapshot.size;

  if (total === 0) {
    onProgress(100, `No ${section} questions to delete.`);
    return { deleted: 0 };
  }

  let deleted = 0;
  const docs = snapshot.docs;

  for (let i = 0; i < docs.length; i += BATCH_SIZE) {
    const batch = writeBatch(db);
    const batchDocs = docs.slice(i, i + BATCH_SIZE);

    batchDocs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    deleted += batchDocs.length;
    onProgress(
      Math.round((deleted / total) * 100),
      `Deleted ${deleted}/${total} ${section} questions...`
    );
  }

  onProgress(100, `Deleted ${deleted} ${section} questions.`);
  return { deleted };
};

/**
 * Get current question count from Firestore
 */
export const getFirestoreQuestionCount = async () => {
  const snapshot = await getDocs(collection(db, QUESTIONS_COLLECTION));

  const counts: { total: number; bySection: Record<string, number> } = {
    total: snapshot.size,
    bySection: { FAR: 0, AUD: 0, REG: 0, BEC: 0 },
  };

  snapshot.forEach((doc) => {
    const section = doc.data().section;
    if (counts.bySection[section] !== undefined) {
      counts.bySection[section]++;
    }
  });

  return counts;
};


export default {
  uploadAllQuestions,
  uploadSectionQuestions,
  deleteAllQuestions,
  deleteSectionQuestions,
  getFirestoreQuestionCount,
  getQuestionStats,
};
