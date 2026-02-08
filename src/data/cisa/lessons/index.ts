/**
 * CISA Lessons Index
 * Exports all CISA certification lessons organized by domain
 */

import { cisa1Lessons } from './cisa1-lessons';
import { cisa2Lessons } from './cisa2-lessons';
import { cisa3Lessons } from './cisa3-lessons';
import { cisa4Lessons } from './cisa4-lessons';
import { cisa5Lessons } from './cisa5-lessons';

// Export individual domain lessons
export { cisa1Lessons } from './cisa1-lessons';
export { cisa2Lessons } from './cisa2-lessons';
export { cisa3Lessons } from './cisa3-lessons';
export { cisa4Lessons } from './cisa4-lessons';
export { cisa5Lessons } from './cisa5-lessons';

// Combined export of all CISA lessons
export const allCisaLessons = [
  ...cisa1Lessons,
  ...cisa2Lessons,
  ...cisa3Lessons,
  ...cisa4Lessons,
  ...cisa5Lessons,
];

export default allCisaLessons;
