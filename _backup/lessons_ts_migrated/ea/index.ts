// EA Lessons Index - JSON-based
// Migrated to JSON format: 2026-02-28

import type { Lesson } from '../../../types';

// Import lesson data from JSON files
import see1Data from './json/see1.json';
import see2Data from './json/see2.json';
import see3Data from './json/see3.json';

// Type assertion
export const eaPart1Lessons: Lesson[] = see1Data as Lesson[];
export const eaPart2Lessons: Lesson[] = see2Data as Lesson[];
export const eaPart3Lessons: Lesson[] = see3Data as Lesson[];

// Aliases for backward compatibility
export const getSEE1Lessons = () => eaPart1Lessons;
export const getSEE2Lessons = () => eaPart2Lessons;
export const getSEE3Lessons = () => eaPart3Lessons;

export const getSEE1LessonById = (id: string) => eaPart1Lessons.find(l => l.id === id);
export const getSEE2LessonById = (id: string) => eaPart2Lessons.find(l => l.id === id);
export const getSEE3LessonById = (id: string) => eaPart3Lessons.find(l => l.id === id);

export const getSEE1LessonCount = () => eaPart1Lessons.length;
export const getSEE2LessonCount = () => eaPart2Lessons.length;
export const getSEE3LessonCount = () => eaPart3Lessons.length;

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
