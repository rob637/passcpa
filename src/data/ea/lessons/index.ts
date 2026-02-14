/**
 * EA Lessons Index
 * Aggregates all EA lesson content across SEE1, SEE2, SEE3.
 */

import type { Lesson } from '../../../types';
import { eaPart1Lessons, getSEE1Lessons, getSEE1LessonById, getSEE1LessonCount } from './see1';
import { eaPart2Lessons, getSEE2Lessons, getSEE2LessonById, getSEE2LessonCount } from './see2';
import { eaPart3Lessons, getSEE3Lessons, getSEE3LessonById, getSEE3LessonCount } from './see3';

// Part-specific re-exports
export {
  eaPart1Lessons, getSEE1Lessons, getSEE1LessonById, getSEE1LessonCount,
  eaPart2Lessons, getSEE2Lessons, getSEE2LessonById, getSEE2LessonCount,
  eaPart3Lessons, getSEE3Lessons, getSEE3LessonById, getSEE3LessonCount,
};

/** All EA lessons combined */
export const allEALessons: Lesson[] = [
  ...eaPart1Lessons,
  ...eaPart2Lessons,
  ...eaPart3Lessons,
];

/** Get a single lesson by ID */
export const getEALessonById = (id: string): Lesson | undefined => {
  return allEALessons.find(lesson => lesson.id === id);
};

/** Get lessons for a specific section */
export const getEALessonsBySection = (section: 'SEE1' | 'SEE2' | 'SEE3'): Lesson[] => {
  return allEALessons.filter(lesson => lesson.section === section);
};

/** Get lesson count by section */
export const getEALessonCount = () => ({
  total: allEALessons.length,
  SEE1: getSEE1LessonCount(),
  SEE2: getSEE2LessonCount(),
  SEE3: getSEE3LessonCount(),
});

export default allEALessons;
