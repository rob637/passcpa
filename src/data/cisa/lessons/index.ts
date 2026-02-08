/**
 * CISA Lessons Index
 * Exports all CISA certification lessons organized by domain
 */

import { cisa1Lessons } from './cisa1-lessons';
import { cisa1LessonsBatch2 } from './cisa1-lessons-batch2';
import { cisa1LessonsBatch3 } from './cisa1-lessons-batch3';
import { cisa2Lessons } from './cisa2-lessons';
import { cisa2LessonsBatch2 } from './cisa2-lessons-batch2';
import { cisa3Lessons } from './cisa3-lessons';
import { cisa3LessonsBatch2 } from './cisa3-lessons-batch2';
import { cisa4Lessons } from './cisa4-lessons';
import { cisa4LessonsBatch2 } from './cisa4-lessons-batch2';
import { cisa5Lessons } from './cisa5-lessons';
import { cisa5LessonsBatch2 } from './cisa5-lessons-batch2';

// Export individual domain lessons
export { cisa1Lessons } from './cisa1-lessons';
export { cisa1LessonsBatch2 } from './cisa1-lessons-batch2';
export { cisa1LessonsBatch3 } from './cisa1-lessons-batch3';
export { cisa2Lessons } from './cisa2-lessons';
export { cisa2LessonsBatch2 } from './cisa2-lessons-batch2';
export { cisa3Lessons } from './cisa3-lessons';
export { cisa3LessonsBatch2 } from './cisa3-lessons-batch2';
export { cisa4Lessons } from './cisa4-lessons';
export { cisa4LessonsBatch2 } from './cisa4-lessons-batch2';
export { cisa5Lessons } from './cisa5-lessons';
export { cisa5LessonsBatch2 } from './cisa5-lessons-batch2';

// Combined export of all CISA lessons
export const allCisaLessons = [
  ...cisa1Lessons,
  ...cisa1LessonsBatch2,
  ...cisa1LessonsBatch3,
  ...cisa2Lessons,
  ...cisa2LessonsBatch2,
  ...cisa3Lessons,
  ...cisa3LessonsBatch2,
  ...cisa4Lessons,
  ...cisa4LessonsBatch2,
  ...cisa5Lessons,
  ...cisa5LessonsBatch2,
];

export default allCisaLessons;
