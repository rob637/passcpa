// CISA Lessons Index - JSON-based
// Migrated to JSON format: 2026-02-28

import { Lesson } from '../../../types';

// Domain 1 imports
import cisa1Data from './json/cisa1.json';
import cisa1Batch2Data from './json/cisa1-batch2.json';
import cisa1Batch3Data from './json/cisa1-batch3.json';

// Domain 2 imports
import cisa2Data from './json/cisa2.json';
import cisa2Batch2Data from './json/cisa2-batch2.json';

// Domain 3 imports
import cisa3Data from './json/cisa3.json';
import cisa3Batch2Data from './json/cisa3-batch2.json';

// Domain 4 imports
import cisa4Data from './json/cisa4.json';
import cisa4Batch2Data from './json/cisa4-batch2.json';

// Domain 5 imports
import cisa5Data from './json/cisa5.json';
import cisa5Batch2Data from './json/cisa5-batch2.json';

// Type assertions
export const cisa1Lessons: Lesson[] = cisa1Data as Lesson[];
export const cisa1LessonsBatch2: Lesson[] = cisa1Batch2Data as Lesson[];
export const cisa1LessonsBatch3: Lesson[] = cisa1Batch3Data as Lesson[];
export const cisa2Lessons: Lesson[] = cisa2Data as Lesson[];
export const cisa2LessonsBatch2: Lesson[] = cisa2Batch2Data as Lesson[];
export const cisa3Lessons: Lesson[] = cisa3Data as Lesson[];
export const cisa3LessonsBatch2: Lesson[] = cisa3Batch2Data as Lesson[];
export const cisa4Lessons: Lesson[] = cisa4Data as Lesson[];
export const cisa4LessonsBatch2: Lesson[] = cisa4Batch2Data as Lesson[];
export const cisa5Lessons: Lesson[] = cisa5Data as Lesson[];
export const cisa5LessonsBatch2: Lesson[] = cisa5Batch2Data as Lesson[];

// Combined by domain
export const CISA1_LESSONS: Lesson[] = [...cisa1Lessons, ...cisa1LessonsBatch2, ...cisa1LessonsBatch3];
export const CISA2_LESSONS: Lesson[] = [...cisa2Lessons, ...cisa2LessonsBatch2];
export const CISA3_LESSONS: Lesson[] = [...cisa3Lessons, ...cisa3LessonsBatch2];
export const CISA4_LESSONS: Lesson[] = [...cisa4Lessons, ...cisa4LessonsBatch2];
export const CISA5_LESSONS: Lesson[] = [...cisa5Lessons, ...cisa5LessonsBatch2];

// All CISA lessons
export const ALL_CISA_LESSONS: Lesson[] = [
  ...CISA1_LESSONS,
  ...CISA2_LESSONS,
  ...CISA3_LESSONS,
  ...CISA4_LESSONS,
  ...CISA5_LESSONS,
];

// Alias for backward compatibility
export const allCisaLessons = ALL_CISA_LESSONS;

// Helper functions
export const getCISALessonById = (id: string): Lesson | undefined => {
  return ALL_CISA_LESSONS.find(lesson => lesson.id === id);
};

export const getCISALessonsBySection = (section: string): Lesson[] => {
  return ALL_CISA_LESSONS.filter(lesson => lesson.section === section);
};

export const getCISALessonsByDomain = (domain: 1 | 2 | 3 | 4 | 5): Lesson[] => {
  const domainMap = {
    1: CISA1_LESSONS,
    2: CISA2_LESSONS,
    3: CISA3_LESSONS,
    4: CISA4_LESSONS,
    5: CISA5_LESSONS,
  };
  return domainMap[domain];
};

export const getCISALessonCount = () => ({
  total: ALL_CISA_LESSONS.length,
  domain1: CISA1_LESSONS.length,
  domain2: CISA2_LESSONS.length,
  domain3: CISA3_LESSONS.length,
  domain4: CISA4_LESSONS.length,
  domain5: CISA5_LESSONS.length,
});

export default ALL_CISA_LESSONS;
