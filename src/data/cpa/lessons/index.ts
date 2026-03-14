// CPA Exam Lesson Content - JSON-based for easier maintenance
// BEC was retired December 15, 2023 - content migrated to BAR
// Migrated to JSON format: 2026-02-28

import { Lesson } from '../../../types';

// Import lesson data from JSON files
import prepData from './json/prep.json';
import farData from './json/far.json';
import farBatch2Data from './json/far-batch2.json';
import audData from './json/aud.json';
import regData from './json/reg.json';
import barData from './json/bar.json';
import iscData from './json/isc.json';
import tcpData from './json/tcp.json';

// Type assertion - JSON imports are validated at build time
export const prepLessons: Lesson[] = prepData as Lesson[];
export const farLessons: Lesson[] = [...(farData as Lesson[]), ...(farBatch2Data as Lesson[]).filter(l => l.section === 'FAR')];
export const audLessons: Lesson[] = audData as Lesson[];
export const regLessons: Lesson[] = regData as Lesson[];
export const barLessons: Lesson[] = barData as Lesson[];
export const iscLessons: Lesson[] = iscData as Lesson[];
export const tcpLessons: Lesson[] = tcpData as Lesson[];

// Combined lessons record for backward compatibility
export const LESSONS: Record<string, Lesson[]> = {
  prep: prepLessons,
  far: farLessons,
  aud: audLessons,
  reg: regLessons,
  bar: barLessons,
  isc: iscLessons,
  tcp: tcpLessons,
};

// Helper function to get all lessons
export const getAllLessons = (): Lesson[] => {
  return [...(LESSONS.prep || []), ...LESSONS.far, ...LESSONS.aud, ...LESSONS.reg, ...(LESSONS.bar || []), ...(LESSONS.isc || []), ...(LESSONS.tcp || [])];
};

// Get lessons by section (sorted by order)
export const getLessonsBySection = (section: string): Lesson[] => {
  const lessons = LESSONS[section.toLowerCase()] || [];
  // Sort by order to ensure correct sequence
  return [...lessons].sort((a, b) => (a.order || 0) - (b.order || 0));
};

// Get lesson by ID
export const getLessonById = (lessonId: string): Lesson | undefined => {
  const allLessons = getAllLessons();
  return allLessons.find((lesson) => lesson.id === lessonId);
};

// Get lesson stats
export const getLessonStats = () => {
  return {
    total: getAllLessons().length,
    bySection: {
      PREP: (LESSONS.prep || []).length,
      FAR: LESSONS.far.length,
      AUD: LESSONS.aud.length,
      REG: LESSONS.reg.length,
      BAR: (LESSONS.bar || []).length,
      ISC: (LESSONS.isc || []).length,
      TCP: (LESSONS.tcp || []).length,
    },
  };
};

export default LESSONS;
