/**
 * Exam Service
 *
 * Multi-course exam simulation service. Exam format configs are stored in a
 * Record lookup (not switch/case), and TBS loading uses the generic
 * courseDataLoader.
 */

import { CourseId } from '../types/course';
import { getCourse } from '../courses';
import { TBS } from '../types';
import { loadCourseData } from './courseDataLoader';

export interface TestletConfig {
  type: 'mcq' | 'tbs' | 'wc';
  questions: number;
  time: number; // in seconds
}

export interface ExamConfig {
  testlets: TestletConfig[];
  totalTime: number; // in seconds
  passingScore: number;
  description?: string;
}

// Cache for loaded exam configs
const examConfigCache: Record<string, ExamConfig> = {};

/**
 * Get exam configuration for a course section
 */
export function getExamConfig(courseId: CourseId, sectionId: string): ExamConfig {
  const cacheKey = `${courseId}-${sectionId}`;
  
  if (examConfigCache[cacheKey]) {
    return examConfigCache[cacheKey];
  }
  
  const course = getCourse(courseId);
  if (!course) {
    return getDefaultExamConfig(75);
  }
  
  // Get section-specific config if available
  const section = course.sections.find(s => s.id === sectionId);
  void section; // May be used for section-specific time in future
  const passingScore = course.passingScore || 75;

  const builder = examConfigBuilders[courseId];
  const config = builder
    ? builder(sectionId, passingScore)
    : getDefaultExamConfig(passingScore);

  examConfigCache[cacheKey] = config;
  return config;
}

/**
 * Get mini exam config (shorter practice version)
 */
export function getMiniExamConfig(courseId: CourseId, passingScore: number = 75): ExamConfig {
  const course = getCourse(courseId);
  const hasTbs = course?.hasTBS ?? false;
  
  const testlets: TestletConfig[] = [
    { type: 'mcq', questions: 18, time: 25 * 60 },
    { type: 'mcq', questions: 18, time: 25 * 60 },
  ];
  
  // Add TBS for courses that have it
  if (hasTbs) {
    testlets.push({ type: 'tbs', questions: 2, time: 20 * 60 });
  }
  
  return {
    testlets,
    totalTime: hasTbs ? 70 * 60 : 50 * 60,
    passingScore,
    description: 'Mini practice exam',
  };
}

// CPA Exam Configuration - matches AICPA specifications
function getCPAExamConfig(sectionId: string, passingScore: number): ExamConfig {
  // Section-specific MCQ and TBS counts per AICPA CPA Evolution (2024+)
  // Structure: 2 MCQ testlets + 3 TBS testlets, 4 hours total
  const sectionConfigs: Record<string, { mcq: number; tbs: number }> = {
    'FAR': { mcq: 50, tbs: 7 },
    'AUD': { mcq: 78, tbs: 7 },
    'REG': { mcq: 72, tbs: 8 },
    'BAR': { mcq: 50, tbs: 7 },
    'ISC': { mcq: 82, tbs: 6 }, // 60% MCQ / 40% TBS weighting
    'TCP': { mcq: 68, tbs: 7 },
  };
  
  const config = sectionConfigs[sectionId] || { mcq: 72, tbs: 7 };
  const mcqPerTestlet = Math.ceil(config.mcq / 2);
  const tbsTestlet1 = Math.floor(config.tbs / 2);
  const tbsTestlet2 = config.tbs - tbsTestlet1;
  
  // Time allocation: ~1.5 min/MCQ, ~15 min/TBS, remaining for review
  const mcqTime = 45 * 60; // 45 min per MCQ testlet
  const tbsTime = Math.floor((4 * 60 * 60 - 2 * mcqTime) / 2); // Split remaining time
  
  return {
    testlets: [
      { type: 'mcq', questions: mcqPerTestlet, time: mcqTime },
      { type: 'mcq', questions: config.mcq - mcqPerTestlet, time: mcqTime },
      { type: 'tbs', questions: tbsTestlet1, time: tbsTime },
      { type: 'tbs', questions: tbsTestlet2, time: tbsTime },
    ],
    totalTime: 4 * 60 * 60, // 4 hours
    passingScore,
    description: `CPA ${sectionId} - ${config.mcq} MCQ + ${config.tbs} TBS`,
  };
}

// EA Exam Configuration (Enrolled Agent - IRS)
function getEAExamConfig(_sectionId: string, passingScore: number): ExamConfig {
  // EA has MCQ-only format, 100 questions per part
  return {
    testlets: [
      { type: 'mcq', questions: 50, time: 90 * 60 },
      { type: 'mcq', questions: 50, time: 90 * 60 },
    ],
    totalTime: 3.5 * 60 * 60, // 3.5 hours
    passingScore,
    description: 'IRS Special Enrollment Examination',
  };
}

// CMA Exam Configuration (Certified Management Accountant)
function getCMAExamConfig(_sectionId: string, passingScore: number): ExamConfig {
  // CMA has 2 parts, each 4 hours: 100 MCQ + 2 essays
  return {
    testlets: [
      { type: 'mcq', questions: 50, time: 90 * 60 },
      { type: 'mcq', questions: 50, time: 90 * 60 },
      { type: 'wc', questions: 2, time: 60 * 60 }, // Essays
    ],
    totalTime: 4 * 60 * 60,
    passingScore,
    description: 'IMA Certified Management Accountant',
  };
}

// CIA Exam Configuration (Certified Internal Auditor)
function getCIAExamConfig(sectionId: string, passingScore: number): ExamConfig {
  // CIA has different question counts per part
  const questionCounts: Record<string, number> = {
    'CIA1': 125, // Essentials of Internal Auditing
    'CIA2': 100, // Practice of Internal Auditing
    'CIA3': 100, // Business Knowledge for Internal Auditing
  };
  
  const timeMinutes: Record<string, number> = {
    'CIA1': 150, // 2.5 hours
    'CIA2': 120, // 2 hours
    'CIA3': 120, // 2 hours
  };
  
  const questions = questionCounts[sectionId] || 100;
  const time = (timeMinutes[sectionId] || 120) * 60;
  
  return {
    testlets: [
      { type: 'mcq', questions: Math.floor(questions / 2), time: time / 2 },
      { type: 'mcq', questions: Math.ceil(questions / 2), time: time / 2 },
    ],
    totalTime: time,
    passingScore,
    description: 'IIA Certified Internal Auditor',
  };
}

// CISA Exam Configuration (Certified Information Systems Auditor)
function getCISAExamConfig(_sectionId: string, passingScore: number): ExamConfig {
  // CISA has 150 questions in 4 hours
  return {
    testlets: [
      { type: 'mcq', questions: 50, time: 80 * 60 },
      { type: 'mcq', questions: 50, time: 80 * 60 },
      { type: 'mcq', questions: 50, time: 80 * 60 },
    ],
    totalTime: 4 * 60 * 60,
    passingScore,
    description: 'ISACA Certified Information Systems Auditor',
  };
}

// CFP Exam Configuration (Certified Financial Planner)
function getCFPExamConfig(_sectionId: string, passingScore: number): ExamConfig {
  // CFP has 170 questions in 6 hours (two 3-hour sessions)
  return {
    testlets: [
      { type: 'mcq', questions: 85, time: 3 * 60 * 60 },
      { type: 'mcq', questions: 85, time: 3 * 60 * 60 },
    ],
    totalTime: 6 * 60 * 60,
    passingScore,
    description: 'CFP Board Certification Examination',
  };
}

// Default exam config for unknown courses
function getDefaultExamConfig(passingScore: number): ExamConfig {
  return {
    testlets: [
      { type: 'mcq', questions: 50, time: 60 * 60 },
      { type: 'mcq', questions: 50, time: 60 * 60 },
    ],
    totalTime: 2 * 60 * 60,
    passingScore,
  };
}

/**
 * Exam config builders by course.
 * New courses: add an entry here or get getDefaultExamConfig automatically.
 */
const examConfigBuilders: Partial<Record<CourseId, (sectionId: string, passingScore: number) => ExamConfig>> = {
  cpa: getCPAExamConfig,
  ea: getEAExamConfig,
  cma: getCMAExamConfig,
  cia: getCIAExamConfig,
  cisa: getCISAExamConfig,
  cfp: getCFPExamConfig,
};

/**
 * Load TBS questions for a course section.
 * Uses COURSE_DATA.tbs — works for any course that provides TBS content.
 */
export async function loadExamTBS(courseId: CourseId, sectionId: string, count: number): Promise<TBS[]> {
  try {
    const courseData = await loadCourseData(courseId);
    const allTbs = (courseData.tbs || []) as TBS[];
    const sectionTbs = allTbs.filter(t => t.section === sectionId);
    return sectionTbs.slice(0, count);
  } catch (error) {
    console.error(`Failed to load TBS for ${courseId}/${sectionId}:`, error);
    return [];
  }
}

/**
 * Get exam provider name for display
 */
export function getExamProviderName(courseId: CourseId): string {
  const course = getCourse(courseId);
  return course?.metadata?.examProvider || 'Exam';
}

/**
 * Get exam description UI text
 */
export function getExamDescription(courseId: CourseId, sectionId: string): string {
  const config = getExamConfig(courseId, sectionId);
  const course = getCourse(courseId);
  const hours = Math.round(config.totalTime / 3600);
  const shortName = course?.shortName || courseId.toUpperCase();
  
  const hasTbs = config.testlets.some(t => t.type === 'tbs');
  const hasWc = config.testlets.some(t => t.type === 'wc');
  
  if (hasWc) {
    return `${hours} hours • Full ${shortName} exam structure with essays`;
  }
  if (hasTbs) {
    return `${hours} hours • Full ${shortName} exam with simulations`;
  }
  return `${hours} hours • Full ${shortName} exam structure`;
}
