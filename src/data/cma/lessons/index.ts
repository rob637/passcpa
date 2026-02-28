// CMA Lessons Index - JSON-based
// Migrated to JSON format: 2026-02-28

import { Lesson } from '../../../types';

// Part 1 imports from JSON
import cma1AData from './json/cma1-a.json';
import cma1BData from './json/cma1-b.json';
import cma1CData from './json/cma1-c.json';
import cma1DData from './json/cma1-d.json';
import cma1EData from './json/cma1-e.json';
import cma1FData from './json/cma1-f.json';

// Part 2 imports from JSON
import cma2AData from './json/cma2-a.json';
import cma2BData from './json/cma2-b.json';
import cma2CData from './json/cma2-c.json';
import cma2DData from './json/cma2-d.json';
import cma2EData from './json/cma2-e.json';
import cma2FData from './json/cma2-f.json';

// Type assertion and export
export const cma1ALessons: Lesson[] = cma1AData as Lesson[];
export const cma1BLessons: Lesson[] = cma1BData as Lesson[];
export const cma1CLessons: Lesson[] = cma1CData as Lesson[];
export const cma1DLessons: Lesson[] = cma1DData as Lesson[];
export const cma1ELessons: Lesson[] = cma1EData as Lesson[];
export const cma1FLessons: Lesson[] = cma1FData as Lesson[];
export const cma2ALessons: Lesson[] = cma2AData as Lesson[];
export const cma2BLessons: Lesson[] = cma2BData as Lesson[];
export const cma2CLessons: Lesson[] = cma2CData as Lesson[];
export const cma2DLessons: Lesson[] = cma2DData as Lesson[];
export const cma2ELessons: Lesson[] = cma2EData as Lesson[];
export const cma2FLessons: Lesson[] = cma2FData as Lesson[];

// Part 1 combined
export const CMA1_LESSONS: Lesson[] = [
  ...cma1ALessons,
  ...cma1BLessons,
  ...cma1CLessons,
  ...cma1DLessons,
  ...cma1ELessons,
  ...cma1FLessons,
];

// Part 2 combined
export const CMA2_LESSONS: Lesson[] = [
  ...cma2ALessons,
  ...cma2BLessons,
  ...cma2CLessons,
  ...cma2DLessons,
  ...cma2ELessons,
  ...cma2FLessons,
];

// All CMA lessons
export const ALL_CMA_LESSONS: Lesson[] = [...CMA1_LESSONS, ...CMA2_LESSONS];

// Alias for backward compatibility
export const cmaLessons = ALL_CMA_LESSONS;

// Helper functions
export const getCMALessonById = (id: string): Lesson | undefined => {
  return ALL_CMA_LESSONS.find(lesson => lesson.id === id);
};

export const getCMALessonsBySection = (section: string): Lesson[] => {
  return ALL_CMA_LESSONS.filter(lesson => lesson.section === section);
};

export const getCMALessonsByPart = (part: 1 | 2): Lesson[] => {
  return part === 1 ? CMA1_LESSONS : CMA2_LESSONS;
};

export const getCMALessonCount = () => ({
  total: ALL_CMA_LESSONS.length,
  part1: CMA1_LESSONS.length,
  part2: CMA2_LESSONS.length,
});

export default ALL_CMA_LESSONS;
