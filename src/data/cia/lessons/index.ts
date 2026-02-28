// CIA Lessons Index - JSON-based
// Migrated to JSON format: 2026-02-28

import { Lesson } from '../../../types';

// CIA1 imports
import cia1Data from './json/cia1.json';
import cia1Batch2Data from './json/cia1-batch2.json';
import cia1Batch3Data from './json/cia1-batch3.json';

// CIA2 imports
import cia2Data from './json/cia2.json';
import cia2Batch2Data from './json/cia2-batch2.json';
import cia2Batch3Data from './json/cia2-batch3.json';
import cia2DomainIIIData from './json/cia2-domain-iii.json';

// CIA3 imports
import cia3Data from './json/cia3.json';
import cia3Batch2Data from './json/cia3-batch2.json';
import cia3Batch3Data from './json/cia3-batch3.json';

// Mixed batch imports
import ciaBatch3Data from './json/cia-batch3.json';
import ciaBatch4Data from './json/cia-batch4.json';
import ciaBatch5Data from './json/cia-batch5.json';
import gias2024Data from './json/gias-2024.json';
import ciaMissingData from './json/cia-missing.json';

// Type assertions
export const cia1Lessons: Lesson[] = cia1Data as Lesson[];
export const cia1LessonsBatch2: Lesson[] = cia1Batch2Data as Lesson[];
export const cia1LessonsBatch3: Lesson[] = cia1Batch3Data as Lesson[];
export const cia2Lessons: Lesson[] = cia2Data as Lesson[];
export const cia2LessonsBatch2: Lesson[] = cia2Batch2Data as Lesson[];
export const cia2LessonsBatch3: Lesson[] = cia2Batch3Data as Lesson[];
export const cia2DomainIIILessons: Lesson[] = cia2DomainIIIData as Lesson[];
export const cia3Lessons: Lesson[] = cia3Data as Lesson[];
export const cia3LessonsBatch2: Lesson[] = cia3Batch2Data as Lesson[];
export const cia3LessonsBatch3: Lesson[] = cia3Batch3Data as Lesson[];
export const ciaLessonsBatch3: Lesson[] = ciaBatch3Data as Lesson[];
export const ciaLessonsBatch4: Lesson[] = ciaBatch4Data as Lesson[];
export const ciaLessonsBatch5: Lesson[] = ciaBatch5Data as Lesson[];
export const gias2024Lessons: Lesson[] = gias2024Data as Lesson[];
export const ciaMissingTopicsLessons: Lesson[] = ciaMissingData as Lesson[];

// Combined by part
export const CIA1_LESSONS: Lesson[] = [
  ...cia1Lessons,
  ...cia1LessonsBatch2,
  ...cia1LessonsBatch3,
];

export const CIA2_LESSONS: Lesson[] = [
  ...cia2Lessons,
  ...cia2LessonsBatch2,
  ...cia2LessonsBatch3,
  ...cia2DomainIIILessons,
];

export const CIA3_LESSONS: Lesson[] = [
  ...cia3Lessons,
  ...cia3LessonsBatch2,
  ...cia3LessonsBatch3,
];

// All CIA lessons
export const ALL_CIA_LESSONS: Lesson[] = [
  ...CIA1_LESSONS,
  ...CIA2_LESSONS,
  ...CIA3_LESSONS,
  ...ciaLessonsBatch3,
  ...ciaLessonsBatch4,
  ...ciaLessonsBatch5,
  ...gias2024Lessons,
  ...ciaMissingTopicsLessons,
];

// Helper functions
export const getCIALessonById = (id: string): Lesson | undefined => {
  return ALL_CIA_LESSONS.find(lesson => lesson.id === id);
};

export const getCIALessonsBySection = (section: string): Lesson[] => {
  return ALL_CIA_LESSONS.filter(lesson => lesson.section === section);
};

export const getCIALessonCount = () => ({
  total: ALL_CIA_LESSONS.length,
  cia1: CIA1_LESSONS.length,
  cia2: CIA2_LESSONS.length,
  cia3: CIA3_LESSONS.length,
});

export default ALL_CIA_LESSONS;
