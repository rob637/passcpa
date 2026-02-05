/**
 * EA Course Data Index
 * Special Enrollment Examination (SEE)
 * 
 * Central export for all EA course content:
 * - Part 1: Individuals (SEE1)
 * - Part 2: Businesses (SEE2)
 * - Part 3: Representation, Practices, and Procedures (SEE3)
 */

// Lesson imports
import { eaPart1Lessons, getSEE1Lessons, getSEE1LessonById, getSEE1LessonCount } from './lessons/see1';
import { eaPart2Lessons, getSEE2Lessons, getSEE2LessonById, getSEE2LessonCount } from './lessons/see2';
import { eaPart3Lessons, getSEE3Lessons, getSEE3LessonById, getSEE3LessonCount } from './lessons/see3';

// Lesson matrix import
import { 
  EA_LESSON_MATRIX, 
  EA_BLUEPRINT_AREAS,
  getEALessonsBySection as getMatrixLessonsBySection,
  getEALessonById as getMatrixLessonById,
  getEALessonsByBlueprintArea,
  getTCJAAffectedLessons,
  type EALessonMatrixEntry,
  type EABlueprintArea
} from './lessonMatrix';

// Re-export types
export type { EALessonMatrixEntry, EABlueprintArea };

// Combined lesson arrays
export const allEALessons = [
  ...eaPart1Lessons,
  ...eaPart2Lessons,
  ...eaPart3Lessons,
];

// Part-specific exports
export {
  // Part 1: Individuals
  eaPart1Lessons,
  getSEE1Lessons,
  getSEE1LessonById,
  getSEE1LessonCount,
  
  // Part 2: Businesses
  eaPart2Lessons,
  getSEE2Lessons,
  getSEE2LessonById,
  getSEE2LessonCount,
  
  // Part 3: Representation
  eaPart3Lessons,
  getSEE3Lessons,
  getSEE3LessonById,
  getSEE3LessonCount,
  
  // Lesson Matrix
  EA_LESSON_MATRIX,
  EA_BLUEPRINT_AREAS,
  getEALessonsByBlueprintArea,
  getTCJAAffectedLessons,
};

// Utility functions
export const getEALessonById = (id: string) => {
  return allEALessons.find(lesson => lesson.id === id);
};

export const getLessonsByEASection = (section: 'SEE1' | 'SEE2' | 'SEE3') => {
  return allEALessons.filter(lesson => lesson.section === section);
};

// Matrix-based section lookup
export const getMatrixLessonsForSection = getMatrixLessonsBySection;
export const getMatrixLessonDetails = getMatrixLessonById;

export const getEALessonCount = () => ({
  total: allEALessons.length,
  SEE1: getSEE1LessonCount(),
  SEE2: getSEE2LessonCount(),
  SEE3: getSEE3LessonCount(),
});

// Course statistics
export const EA_COURSE_STATS = {
  totalLessons: allEALessons.length,
  parts: {
    SEE1: {
      name: 'Individuals',
      lessonCount: eaPart1Lessons.length,
      examQuestions: 100,
      passingScore: 105,
      maxScore: 130,
      timeLimit: '3.5 hours',
    },
    SEE2: {
      name: 'Businesses', 
      lessonCount: eaPart2Lessons.length,
      examQuestions: 100,
      passingScore: 105,
      maxScore: 130,
      timeLimit: '3.5 hours',
    },
    SEE3: {
      name: 'Representation, Practices, and Procedures',
      lessonCount: eaPart3Lessons.length,
      examQuestions: 100,
      passingScore: 105,
      maxScore: 130,
      timeLimit: '3.5 hours',
    },
  },
  examInfo: {
    testingWindow: 'May 1 - February 28 (following year)',
    closedPeriod: 'March 1 - April 30',
    passingScore: 105,
    maxScore: 130,
    questionsPerPart: 100,
    timePerPart: '3.5 hours',
  },
  taxLawCutoff: 'December 31 of prior year',
};

// Blueprint area weights for exam preparation
export const EA_EXAM_WEIGHTS = {
  SEE1: {
    'Preliminary Work and Taxpayer Data': '15%',
    'Income and Assets': '25%', 
    'Deductions and Credits': '25%',
    'Taxation and Advice': '20%',
    'Specialized Returns': '15%',
  },
  SEE2: {
    'Business Entities': '20%',
    'Business Income': '20%',
    'Business Expenses': '20%',
    'Special Topics': '20%',
    'Business Tax Compliance': '20%',
  },
  SEE3: {
    'Practices and Procedures': '25%',
    'Representation': '25%',
    'Specific Areas of Practice': '25%',
    'Completion of Filing Process': '25%',
  },
};

export default {
  lessons: allEALessons,
  matrix: EA_LESSON_MATRIX,
  blueprintAreas: EA_BLUEPRINT_AREAS,
  stats: EA_COURSE_STATS,
  weights: EA_EXAM_WEIGHTS,
};
