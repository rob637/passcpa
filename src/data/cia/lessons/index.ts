/**
 * CIA (Certified Internal Auditor) Lessons
 * 
 * Based on IIA CIA Exam Content Specification 2024-2025
 * Three parts matching exam structure
 */

// CIA Part 1: Essentials of Internal Auditing
export { cia1Lessons, getCIA1Lessons } from './cia1-lessons';
import { cia1LessonsBatch2 } from './cia1-lessons-batch2';

// CIA Part 2: Practice of Internal Auditing
export { cia2Lessons, getCIA2Lessons } from './cia2-lessons';
import { cia2LessonsBatch2 } from './cia2-lessons-batch2';

// CIA Part 3: Business Knowledge for Internal Auditing
export { cia3Lessons, getCIA3Lessons } from './cia3-lessons';
import { cia3LessonsBatch2 } from './cia3-lessons-batch2';

// Additional lessons batches
import { ciaLessonsBatch3 } from './cia-lessons-batch3';
import { ciaLessonsBatch4 } from './cia-lessons-batch4';
import { ciaLessonsBatch5 } from './cia-lessons-batch5';
import { gias2024Lessons } from './gias-2024-lesson';
import { ciaMissingTopicsLessons } from './cia-missing-topics';
import { cia2DomainIIILessons } from './cia2-domain-iii-expansion';
import { cia1LessonsBatch3 } from './cia1-lessons-batch3';
import { cia2LessonsBatch3 } from './cia2-lessons-batch3';
import { cia3LessonsBatch3 } from './cia3-lessons-batch3';

// Combined exports
import { cia1Lessons } from './cia1-lessons';
import { cia2Lessons } from './cia2-lessons';
import { cia3Lessons } from './cia3-lessons';

export const ALL_CIA_LESSONS = [
  ...gias2024Lessons,  // GIAS 2024 lessons first (critical update)
  ...cia1Lessons,
  ...cia1LessonsBatch2,
  ...cia1LessonsBatch3,  // Core Principles, IPPF, Proficiency, Ethics
  ...cia2Lessons,
  ...cia2LessonsBatch2,
  ...cia2LessonsBatch3,  // Engagement Planning, RCM, CAE Strategy
  ...cia3Lessons,
  ...cia3LessonsBatch2,
  ...cia3LessonsBatch3,  // NIST CSF, ISO 27001, Strategy Frameworks, M&A
  ...ciaLessonsBatch3,
  ...ciaLessonsBatch4,
  ...ciaLessonsBatch5,
  ...ciaMissingTopicsLessons,  // Fraud, Sampling, IFRS/GAAP
  ...cia2DomainIIILessons,     // Part 2 Domain III expansion + ESG
];

export const getCIALessons = () => ALL_CIA_LESSONS;
export const getCIALessonCount = () => ALL_CIA_LESSONS.length;
export const getCIALessonById = (id: string) => ALL_CIA_LESSONS.find(l => l.id === id);
export const getCIALessonsBySection = (section: 'CIA1' | 'CIA2' | 'CIA3') => 
  ALL_CIA_LESSONS.filter(l => l.section === section);
