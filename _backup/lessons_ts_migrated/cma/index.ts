/**
 * CMA Course Lessons Index
 * 
 * This file exports all CMA lessons organized by section.
 * 
 * Part 1: Financial Planning, Performance, and Analytics
 * - CMA1-A: External Financial Reporting (15%)
 * - CMA1-B: Planning, Budgeting, and Forecasting (20%)
 * - CMA1-C: Performance Management (20%)
 * - CMA1-D: Cost Management (15%)
 * - CMA1-E: Internal Controls (15%)
 * - CMA1-F: Technology and Analytics (15%)
 * 
 * Part 2: Strategic Financial Management
 * - CMA2-A: Financial Statement Analysis (20%)
 * - CMA2-B: Corporate Finance (20%)
 * - CMA2-C: Decision Analysis (25%)
 * - CMA2-D: Risk Management (10%)
 * - CMA2-E: Investment Decisions (10%)
 * - CMA2-F: Professional Ethics (15%)
 */

import { Lesson } from '../../../types';

// Part 1 imports
import { cma1ALessons } from './cma1-a';
import { cma1BLessons } from './cma1-b';
import { cma1CLessons } from './cma1-c';
import { cma1DLessons } from './cma1-d';
import { cma1ELessons } from './cma1-e';
import { cma1FLessons } from './cma1-f';

// Part 2 imports
import { cma2ALessons } from './cma2-a';
import { cma2BLessons } from './cma2-b';
import { cma2CLessons } from './cma2-c';
import { cma2DLessons } from './cma2-d';
import { cma2ELessons } from './cma2-e';
import { cma2FLessons } from './cma2-f';

// Export individual section arrays
export {
  cma1ALessons,
  cma1BLessons,
  cma1CLessons,
  cma1DLessons,
  cma1ELessons,
  cma1FLessons,
  cma2ALessons,
  cma2BLessons,
  cma2CLessons,
  cma2DLessons,
  cma2ELessons,
  cma2FLessons,
};

// Combined Part 1 lessons
export const cmaPart1Lessons: Lesson[] = [
  ...cma1ALessons,
  ...cma1BLessons,
  ...cma1CLessons,
  ...cma1DLessons,
  ...cma1ELessons,
  ...cma1FLessons,
];

// Combined Part 2 lessons
export const cmaPart2Lessons: Lesson[] = [
  ...cma2ALessons,
  ...cma2BLessons,
  ...cma2CLessons,
  ...cma2DLessons,
  ...cma2ELessons,
  ...cma2FLessons,
];

// All CMA lessons
export const cmaLessons: Lesson[] = [
  ...cmaPart1Lessons,
  ...cmaPart2Lessons,
];

// Helper functions
export const getCMALessonById = (id: string): Lesson | undefined => 
  cmaLessons.find(lesson => lesson.id === id);

export const getCMALessonsBySection = (section: string): Lesson[] =>
  cmaLessons.filter(lesson => lesson.blueprintArea === section);

export const getCMALessonsByPart = (part: 'CMA1' | 'CMA2'): Lesson[] =>
  part === 'CMA1' ? cmaPart1Lessons : cmaPart2Lessons;

export const getCMALessonCount = (): { part1: number; part2: number; total: number } => ({
  part1: cmaPart1Lessons.length,
  part2: cmaPart2Lessons.length,
  total: cmaLessons.length,
});

export const getCMASectionCounts = (): Record<string, number> => ({
  'CMA1-A': cma1ALessons.length,
  'CMA1-B': cma1BLessons.length,
  'CMA1-C': cma1CLessons.length,
  'CMA1-D': cma1DLessons.length,
  'CMA1-E': cma1ELessons.length,
  'CMA1-F': cma1FLessons.length,
  'CMA2-A': cma2ALessons.length,
  'CMA2-B': cma2BLessons.length,
  'CMA2-C': cma2CLessons.length,
  'CMA2-D': cma2DLessons.length,
  'CMA2-E': cma2ELessons.length,
  'CMA2-F': cma2FLessons.length,
});

export default cmaLessons;
