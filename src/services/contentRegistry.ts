/**
 * Content Registry
 * 
 * Single source of truth for ALL content across ALL exams.
 * This registry provides:
 * - Exact counts of lessons, MCQs, TBS, flashcards, etc.
 * - Actual lesson durations (not estimates)
 * - Content type metadata for each section
 * - Study time calculations based on REAL data
 * 
 * NEVER estimate content. Always use actual counts from this registry.
 */

import type { CourseId } from '../types/course';

// =============================================================================
// CONTENT TYPES
// =============================================================================

export type ContentType = 
  | 'lesson'      // Video/text lessons
  | 'mcq'         // Multiple choice questions
  | 'tbs'         // Task-based simulations (CPA)
  | 'simulation'  // Simulations (CMA, CIA)
  | 'flashcard'   // Flashcards
  | 'caseStudy'   // Case studies (CFP)
  | 'mockExam';   // Full practice exams

export interface ContentCounts {
  lessons: number;
  lessonMinutes: number;
  mcqs: number;
  tbs: number;           // Task-based simulations (CPA, EA)
  simulations: number;   // General simulations (CMA, CIA, CISA)
  flashcards: number;
  caseStudies: number;   // CFP only
}

export interface SectionContentInfo {
  courseId: CourseId;
  section: string;
  sectionName: string;              // Human-readable name
  counts: ContentCounts;
  contentTypes: ContentType[];      // What content types are available
  blueprintWeight?: number;         // Exam weight (0-100)
  industryHoursMin: number;         // Industry study time range (low)
  industryHoursMax: number;         // Industry study time range (high)
}

export interface ExamContentInfo {
  courseId: CourseId;
  examName: string;
  sections: string[];               // Section codes for this exam
  totalContentTime: number;         // Total lesson minutes across all sections
  industryTotalHours: {
    min: number;
    max: number;
  };
  /**
   * Study plan mode:
   * - 'per-section': User studies for ONE section at a time (CPA, EA, CMA, CIA)
   * - 'full-exam': User studies for ALL sections at once (CISA, CFP)
   */
  studyPlanMode: 'per-section' | 'full-exam';
}

// =============================================================================
// TIME CONSTANTS - Based on research and real-world testing
// =============================================================================

export const TIME_CONSTANTS = {
  // MCQ timing (minutes)
  mcq: {
    firstAttempt: 2.0,        // Read, answer, review explanation
    reviewAttempt: 1.0,       // Faster on repeat
    masteredAttempt: 0.5,     // Quick recall check
  },
  
  // TBS/Simulation timing (minutes)
  tbs: {
    firstAttempt: 18,         // Complex multi-step problem
    reviewAttempt: 12,        // Faster with familiarity
  },
  
  // Flashcard timing (minutes per card)
  flashcard: {
    perCard: 0.3,             // 18 seconds per card
    reviewSessions: 3,        // Spaced repetition is efficient
  },
  
  // Case Study timing (CFP)
  caseStudy: {
    firstAttempt: 45,         // Complex scenario analysis
    reviewAttempt: 25,        // Review key concepts
  },
  
  // Mock Exam
  mockExam: {
    duration: 240,            // 4 hours
    reviewTime: 60,           // Post-exam review
  },
  
  // Experience multipliers for lesson time
  experienceMultipliers: {
    none: 1.3,                // 30% more time: note-taking, pausing, rereading
    some: 1.0,                // Standard pace
    retake: 0.7,              // Can skim familiar material at 1.4x
  },
  
  // Adaptive learning factors
  // VoraPrep's adaptive engine is efficient - students master faster with:
  // - Targeted practice (skip what you know)
  // - Clear explanations (understand on first try)
  // - Spaced repetition (retain without grinding)
  adaptive: {
    // What percentage of MCQs does a typical student need to see?
    mcqCoverageNone: 0.75,    // New students: see 75% (adaptive skips easy ones)
    mcqCoverageSome: 0.55,    // Some experience: see 55% (focus on gaps)
    mcqCoverageRetake: 0.40,  // Retakers: focus on weak areas, see 40%
    
    // Average passes through content (weighted)
    passesNone: 1.5,          // 1.5 passes with good explanations
    passesSome: 1.25,         // Efficient review
    passesRetake: 1.1,        // Quick targeted review
  },
};

// =============================================================================
// SECTION CONTENT DATA - REAL DATA from actual content files
// =============================================================================

const SECTION_CONTENT: Record<string, SectionContentInfo> = {
  // =========================================================================
  // CPA SECTIONS
  // =========================================================================
  'FAR': {
    courseId: 'cpa',
    section: 'FAR',
    sectionName: 'Financial Accounting and Reporting',
    counts: {
      lessons: 110,
      lessonMinutes: 5660,
      mcqs: 1658,
      tbs: 48,
      simulations: 0,
      flashcards: 199,
      caseStudies: 0,
    },
    contentTypes: ['lesson', 'mcq', 'tbs', 'flashcard', 'mockExam'],
    blueprintWeight: 100,  // Full exam
    industryHoursMin: 120,
    industryHoursMax: 160,
  },
  'AUD': {
    courseId: 'cpa',
    section: 'AUD',
    sectionName: 'Auditing and Attestation',
    counts: {
      lessons: 73,
      lessonMinutes: 3625,
      mcqs: 1458,
      tbs: 46,
      simulations: 0,
      flashcards: 99,
      caseStudies: 0,
    },
    contentTypes: ['lesson', 'mcq', 'tbs', 'flashcard', 'mockExam'],
    blueprintWeight: 100,
    industryHoursMin: 90,
    industryHoursMax: 120,
  },
  'REG': {
    courseId: 'cpa',
    section: 'REG',
    sectionName: 'Regulation',
    counts: {
      lessons: 83,
      lessonMinutes: 4270,
      mcqs: 1468,
      tbs: 49,
      simulations: 0,
      flashcards: 108,
      caseStudies: 0,
    },
    contentTypes: ['lesson', 'mcq', 'tbs', 'flashcard', 'mockExam'],
    blueprintWeight: 100,
    industryHoursMin: 100,
    industryHoursMax: 120,
  },
  'BAR': {
    courseId: 'cpa',
    section: 'BAR',
    sectionName: 'Business Analysis and Reporting',
    counts: {
      lessons: 77,
      lessonMinutes: 4095,
      mcqs: 1600,
      tbs: 43,
      simulations: 0,
      flashcards: 85,
      caseStudies: 0,
    },
    contentTypes: ['lesson', 'mcq', 'tbs', 'flashcard', 'mockExam'],
    blueprintWeight: 100,
    industryHoursMin: 100,
    industryHoursMax: 120,
  },
  'ISC': {
    courseId: 'cpa',
    section: 'ISC',
    sectionName: 'Information Systems and Controls',
    counts: {
      lessons: 59,
      lessonMinutes: 3010,
      mcqs: 1487,
      tbs: 42,
      simulations: 0,
      flashcards: 57,
      caseStudies: 0,
    },
    contentTypes: ['lesson', 'mcq', 'tbs', 'flashcard', 'mockExam'],
    blueprintWeight: 100,
    industryHoursMin: 90,
    industryHoursMax: 100,
  },
  'TCP': {
    courseId: 'cpa',
    section: 'TCP',
    sectionName: 'Tax Compliance and Planning',
    counts: {
      lessons: 54,
      lessonMinutes: 2810,
      mcqs: 1483,
      tbs: 49,
      simulations: 0,
      flashcards: 68,
      caseStudies: 0,
    },
    contentTypes: ['lesson', 'mcq', 'tbs', 'flashcard', 'mockExam'],
    blueprintWeight: 100,
    industryHoursMin: 90,
    industryHoursMax: 100,
  },
  
  // =========================================================================
  // EA SECTIONS (Enrolled Agent)
  // =========================================================================
  'SEE1': {
    courseId: 'ea',
    section: 'SEE1',
    sectionName: 'Individuals',
    counts: {
      lessons: 55,
      lessonMinutes: 2335,
      mcqs: 819,
      tbs: 0,
      simulations: 0,
      flashcards: 150,
      caseStudies: 0,
    },
    contentTypes: ['lesson', 'mcq', 'flashcard', 'mockExam'],
    blueprintWeight: 100,
    industryHoursMin: 60,
    industryHoursMax: 80,
  },
  'SEE2': {
    courseId: 'ea',
    section: 'SEE2',
    sectionName: 'Businesses',
    counts: {
      lessons: 62,
      lessonMinutes: 3040,
      mcqs: 1141,
      tbs: 0,
      simulations: 0,
      flashcards: 142,
      caseStudies: 0,
    },
    contentTypes: ['lesson', 'mcq', 'flashcard', 'mockExam'],
    blueprintWeight: 100,
    industryHoursMin: 70,
    industryHoursMax: 90,
  },
  'SEE3': {
    courseId: 'ea',
    section: 'SEE3',
    sectionName: 'Representation, Practices, and Procedures',
    counts: {
      lessons: 40,
      lessonMinutes: 1780,
      mcqs: 1037,
      tbs: 0,
      simulations: 0,
      flashcards: 147,
      caseStudies: 0,
    },
    contentTypes: ['lesson', 'mcq', 'flashcard', 'mockExam'],
    blueprintWeight: 100,
    industryHoursMin: 40,
    industryHoursMax: 60,
  },
  
  // =========================================================================
  // CMA SECTIONS (Certified Management Accountant)
  // =========================================================================
  'CMA1': {
    courseId: 'cma',
    section: 'CMA1',
    sectionName: 'Financial Planning, Performance, and Analytics',
    counts: {
      lessons: 157,
      lessonMinutes: 7470,
      mcqs: 1280,
      tbs: 0,
      simulations: 0,
      flashcards: 261,
      caseStudies: 0,
    },
    contentTypes: ['lesson', 'mcq', 'flashcard', 'mockExam'],
    blueprintWeight: 100,
    industryHoursMin: 140,
    industryHoursMax: 170,
  },
  'CMA2': {
    courseId: 'cma',
    section: 'CMA2',
    sectionName: 'Strategic Financial Management',
    counts: {
      lessons: 162,
      lessonMinutes: 7570,
      mcqs: 1248,
      tbs: 0,
      simulations: 0,
      flashcards: 240,
      caseStudies: 0,
    },
    contentTypes: ['lesson', 'mcq', 'flashcard', 'mockExam'],
    blueprintWeight: 100,
    industryHoursMin: 140,
    industryHoursMax: 170,
  },
  
  // =========================================================================
  // CIA SECTIONS (Certified Internal Auditor)
  // =========================================================================
  'CIA1': {
    courseId: 'cia',
    section: 'CIA1',
    sectionName: 'Essentials of Internal Auditing',
    counts: {
      lessons: 116,
      lessonMinutes: 3969,
      mcqs: 735,
      tbs: 0,
      simulations: 0,
      flashcards: 188,
      caseStudies: 0,
    },
    contentTypes: ['lesson', 'mcq', 'flashcard', 'mockExam'],
    blueprintWeight: 100,
    industryHoursMin: 80,
    industryHoursMax: 120,
  },
  'CIA2': {
    courseId: 'cia',
    section: 'CIA2',
    sectionName: 'Practice of Internal Auditing',
    counts: {
      lessons: 106,
      lessonMinutes: 3729,
      mcqs: 713,
      tbs: 0,
      simulations: 0,
      flashcards: 181,
      caseStudies: 0,
    },
    contentTypes: ['lesson', 'mcq', 'flashcard', 'mockExam'],
    blueprintWeight: 100,
    industryHoursMin: 80,
    industryHoursMax: 120,
  },
  'CIA3': {
    courseId: 'cia',
    section: 'CIA3',
    sectionName: 'Business Knowledge for Internal Auditing',
    counts: {
      lessons: 102,
      lessonMinutes: 3183,
      mcqs: 764,
      tbs: 0,
      simulations: 0,
      flashcards: 172,
      caseStudies: 0,
    },
    contentTypes: ['lesson', 'mcq', 'flashcard', 'mockExam'],
    blueprintWeight: 100,
    industryHoursMin: 80,
    industryHoursMax: 120,
  },
  
  // =========================================================================
  // CISA SECTIONS (Certified Information Systems Auditor)
  // =========================================================================
  'CISA1': {
    courseId: 'cisa',
    section: 'CISA1',
    sectionName: 'Information Systems Auditing Process',
    counts: {
      lessons: 34,
      lessonMinutes: 1530,
      mcqs: 291,
      tbs: 0,
      simulations: 0,
      flashcards: 107,
      caseStudies: 0,
    },
    contentTypes: ['lesson', 'mcq', 'flashcard', 'mockExam'],
    blueprintWeight: 21,
    industryHoursMin: 30,
    industryHoursMax: 40,
  },
  'CISA2': {
    courseId: 'cisa',
    section: 'CISA2',
    sectionName: 'Governance and Management of IT',
    counts: {
      lessons: 25,
      lessonMinutes: 1075,
      mcqs: 286,
      tbs: 0,
      simulations: 0,
      flashcards: 99,
      caseStudies: 0,
    },
    contentTypes: ['lesson', 'mcq', 'flashcard', 'mockExam'],
    blueprintWeight: 16,
    industryHoursMin: 25,
    industryHoursMax: 35,
  },
  'CISA3': {
    courseId: 'cisa',
    section: 'CISA3',
    sectionName: 'Information Systems Acquisition, Development, and Implementation',
    counts: {
      lessons: 28,
      lessonMinutes: 1215,
      mcqs: 280,
      tbs: 0,
      simulations: 0,
      flashcards: 91,
      caseStudies: 0,
    },
    contentTypes: ['lesson', 'mcq', 'flashcard', 'mockExam'],
    blueprintWeight: 18,
    industryHoursMin: 28,
    industryHoursMax: 38,
  },
  'CISA4': {
    courseId: 'cisa',
    section: 'CISA4',
    sectionName: 'Information Systems Operations and Business Resilience',
    counts: {
      lessons: 31,
      lessonMinutes: 1425,
      mcqs: 305,
      tbs: 0,
      simulations: 0,
      flashcards: 96,
      caseStudies: 0,
    },
    contentTypes: ['lesson', 'mcq', 'flashcard', 'mockExam'],
    blueprintWeight: 20,
    industryHoursMin: 30,
    industryHoursMax: 40,
  },
  'CISA5': {
    courseId: 'cisa',
    section: 'CISA5',
    sectionName: 'Protection of Information Assets',
    counts: {
      lessons: 34,
      lessonMinutes: 1555,
      mcqs: 358,
      tbs: 0,
      simulations: 0,
      flashcards: 128,
      caseStudies: 0,
    },
    contentTypes: ['lesson', 'mcq', 'flashcard', 'mockExam'],
    blueprintWeight: 25,
    industryHoursMin: 35,
    industryHoursMax: 50,
  },
  
  // =========================================================================
  // CFP SECTIONS (Certified Financial Planner)
  // =========================================================================
  'CFP-GEN': {
    courseId: 'cfp',
    section: 'CFP-GEN',
    sectionName: 'General Financial Planning Principles',
    counts: {
      lessons: 32,
      lessonMinutes: 1340,
      mcqs: 305,
      tbs: 0,
      simulations: 0,
      flashcards: 100,
      caseStudies: 6,
    },
    contentTypes: ['lesson', 'mcq', 'flashcard', 'caseStudy', 'mockExam'],
    blueprintWeight: 15,
    industryHoursMin: 35,
    industryHoursMax: 45,
  },
  'CFP-PSY': {
    courseId: 'cfp',
    section: 'CFP-PSY',
    sectionName: 'Psychology of Financial Planning',
    counts: {
      lessons: 17,
      lessonMinutes: 715,
      mcqs: 183,
      tbs: 0,
      simulations: 0,
      flashcards: 50,
      caseStudies: 6,
    },
    contentTypes: ['lesson', 'mcq', 'flashcard', 'caseStudy', 'mockExam'],
    blueprintWeight: 7,
    industryHoursMin: 15,
    industryHoursMax: 25,
  },
  'CFP-INV': {
    courseId: 'cfp',
    section: 'CFP-INV',
    sectionName: 'Investment Planning',
    counts: {
      lessons: 27,
      lessonMinutes: 1140,
      mcqs: 337,
      tbs: 0,
      simulations: 0,
      flashcards: 100,
      caseStudies: 7,
    },
    contentTypes: ['lesson', 'mcq', 'flashcard', 'caseStudy', 'mockExam'],
    blueprintWeight: 17,
    industryHoursMin: 40,
    industryHoursMax: 55,
  },
  'CFP-RISK': {
    courseId: 'cfp',
    section: 'CFP-RISK',
    sectionName: 'Risk Management and Insurance Planning',
    counts: {
      lessons: 24,
      lessonMinutes: 790,
      mcqs: 322,
      tbs: 0,
      simulations: 0,
      flashcards: 90,
      caseStudies: 7,
    },
    contentTypes: ['lesson', 'mcq', 'flashcard', 'caseStudy', 'mockExam'],
    blueprintWeight: 12,
    industryHoursMin: 28,
    industryHoursMax: 38,
  },
  'CFP-TAX': {
    courseId: 'cfp',
    section: 'CFP-TAX',
    sectionName: 'Tax Planning',
    counts: {
      lessons: 25,
      lessonMinutes: 1025,
      mcqs: 337,
      tbs: 0,
      simulations: 0,
      flashcards: 100,
      caseStudies: 6,
    },
    contentTypes: ['lesson', 'mcq', 'flashcard', 'caseStudy', 'mockExam'],
    blueprintWeight: 14,
    industryHoursMin: 32,
    industryHoursMax: 45,
  },
  'CFP-RET': {
    courseId: 'cfp',
    section: 'CFP-RET',
    sectionName: 'Retirement Savings and Income Planning',
    counts: {
      lessons: 41,
      lessonMinutes: 1810,
      mcqs: 349,
      tbs: 0,
      simulations: 0,
      flashcards: 120,
      caseStudies: 7,
    },
    contentTypes: ['lesson', 'mcq', 'flashcard', 'caseStudy', 'mockExam'],
    blueprintWeight: 18,
    industryHoursMin: 42,
    industryHoursMax: 58,
  },
  'CFP-EST': {
    courseId: 'cfp',
    section: 'CFP-EST',
    sectionName: 'Estate Planning',
    counts: {
      lessons: 25,
      lessonMinutes: 945,
      mcqs: 279,
      tbs: 0,
      simulations: 0,
      flashcards: 90,
      caseStudies: 6,
    },
    contentTypes: ['lesson', 'mcq', 'flashcard', 'caseStudy', 'mockExam'],
    blueprintWeight: 10,
    industryHoursMin: 25,
    industryHoursMax: 35,
  },
  'CFP-PCR': {
    courseId: 'cfp',
    section: 'CFP-PCR',
    sectionName: 'Professional Conduct and Regulation',
    counts: {
      lessons: 19,
      lessonMinutes: 630,
      mcqs: 256,
      tbs: 0,
      simulations: 0,
      flashcards: 67,
      caseStudies: 7,
    },
    contentTypes: ['lesson', 'mcq', 'flashcard', 'caseStudy', 'mockExam'],
    blueprintWeight: 7,
    industryHoursMin: 15,
    industryHoursMax: 25,
  },

  // =========================================================================
  // AGGREGATED EXAM ENTRIES (for full-exam study plans)
  // =========================================================================
  // CISA is ONE exam covering all 5 domains at once
  'CISA': {
    courseId: 'cisa',
    section: 'CISA',
    sectionName: 'CISA Full Exam (All 5 Domains)',
    counts: {
      // Aggregated from CISA1-5
      lessons: 34 + 25 + 28 + 31 + 34,               // 152 total
      lessonMinutes: 1530 + 1075 + 1215 + 1425 + 1555,  // 6800 total
      mcqs: 291 + 286 + 280 + 305 + 358,             // 1520 total
      tbs: 0,
      simulations: 0,
      flashcards: 107 + 99 + 91 + 96 + 128,           // 521 total
      caseStudies: 0,
    },
    contentTypes: ['lesson', 'mcq', 'flashcard', 'mockExam'],
    blueprintWeight: 100,  // Full exam
    industryHoursMin: 150,
    industryHoursMax: 200,
  },

  // CFP is ONE exam covering all 8 domains at once
  'CFP': {
    courseId: 'cfp',
    section: 'CFP',
    sectionName: 'CFP Full Exam (All 8 Domains)',
    counts: {
      // Aggregated from all CFP sections
      lessons: 32 + 17 + 27 + 24 + 25 + 41 + 25 + 19,   // 210 total
      lessonMinutes: 1340 + 715 + 1140 + 790 + 1025 + 1810 + 945 + 630, // 8395 total
      mcqs: 305 + 183 + 337 + 322 + 337 + 349 + 279 + 256, // 2368 total
      tbs: 0,
      simulations: 0,
      flashcards: 100 + 50 + 100 + 90 + 100 + 120 + 90 + 67,  // 717 total
      caseStudies: 6 + 6 + 7 + 7 + 6 + 7 + 6 + 7,            // 52 total
    },
    contentTypes: ['lesson', 'mcq', 'flashcard', 'caseStudy', 'mockExam'],
    blueprintWeight: 100,  // Full exam
    industryHoursMin: 250,
    industryHoursMax: 300,
  },
};

// =============================================================================
// EXAM CONFIGURATIONS
// =============================================================================

const EXAM_CONFIGS: Record<CourseId, ExamContentInfo> = {
  cpa: {
    courseId: 'cpa',
    examName: 'Certified Public Accountant',
    sections: ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'],
    totalContentTime: 22560,
    industryTotalHours: { min: 300, max: 400 },
    studyPlanMode: 'per-section',  // Each section is a separate exam
  },
  ea: {
    courseId: 'ea',
    examName: 'Enrolled Agent',
    sections: ['SEE1', 'SEE2', 'SEE3'],
    totalContentTime: 7155,
    industryTotalHours: { min: 150, max: 200 },
    studyPlanMode: 'per-section',  // Each part is a separate exam
  },
  cma: {
    courseId: 'cma',
    examName: 'Certified Management Accountant',
    sections: ['CMA1', 'CMA2'],
    totalContentTime: 15040,  // 7470 + 7570
    industryTotalHours: { min: 280, max: 340 },
    studyPlanMode: 'per-section',  // Each part is a separate exam
  },
  cia: {
    courseId: 'cia',
    examName: 'Certified Internal Auditor',
    sections: ['CIA1', 'CIA2', 'CIA3'],
    totalContentTime: 12646,  // 4514 + 4164 + 3968
    industryTotalHours: { min: 240, max: 360 },
    studyPlanMode: 'per-section',  // Each part is a separate exam
  },
  cisa: {
    courseId: 'cisa',
    examName: 'Certified Information Systems Auditor',
    sections: ['CISA1', 'CISA2', 'CISA3', 'CISA4', 'CISA5'],
    totalContentTime: 6800,
    industryTotalHours: { min: 150, max: 200 },
    studyPlanMode: 'full-exam',    // ONE exam covering all 5 domains
  },
  cfp: {
    courseId: 'cfp',
    examName: 'Certified Financial Planner',
    sections: ['CFP-GEN', 'CFP-PSY', 'CFP-INV', 'CFP-RISK', 'CFP-TAX', 'CFP-RET', 'CFP-EST', 'CFP-PCR'],
    totalContentTime: 8395,
    industryTotalHours: { min: 250, max: 300 },
    studyPlanMode: 'full-exam',    // ONE exam covering all 8 domains
  },
};

// =============================================================================
// PUBLIC API
// =============================================================================

/**
 * Get content info for a specific section
 */
export function getSectionContent(section: string): SectionContentInfo | null {
  // Normalize section name
  const normalizedSection = section.toUpperCase();
  return SECTION_CONTENT[normalizedSection] || null;
}

/**
 * Get content info for all sections of an exam
 */
export function getExamContent(courseId: CourseId): SectionContentInfo[] {
  const examConfig = EXAM_CONFIGS[courseId];
  if (!examConfig) return [];
  
  return examConfig.sections
    .map(section => SECTION_CONTENT[section])
    .filter((s): s is SectionContentInfo => s !== null);
}

/**
 * Get exam configuration
 */
export function getExamConfig(courseId: CourseId): ExamContentInfo | null {
  return EXAM_CONFIGS[courseId] || null;
}

/**
 * Get all available sections for an exam
 */
export function getExamSections(courseId: CourseId): string[] {
  const examConfig = EXAM_CONFIGS[courseId];
  return examConfig?.sections || [];
}

/**
 * Calculate estimated study hours for a section based on ACTUAL content.
 * 
 * This is an HONEST bottom-up calculation:
 * - Lessons: actual lesson minutes × experience multiplier
 * - MCQs: target coverage × passes × time per question
 * - TBS: actual count × time per simulation
 * - Flashcards: actual count × time × review sessions
 * - Mock exams: 2 × (exam + review time)
 * 
 * If this number differs significantly from industry benchmarks, we need to
 * discuss adding or removing content - NOT fudge the numbers.
 */
export function calculateSectionStudyHours(
  section: string,
  experience: 'none' | 'some' | 'retake' = 'some'
): {
  total: number;
  breakdown: {
    lessons: number;
    mcqs: number;
    tbs: number;
    flashcards: number;
    caseStudies: number;
    mockExams: number;
  };
  assumptions: string[];
} {
  const content = getSectionContent(section);
  if (!content) {
    return {
      total: 0,
      breakdown: { lessons: 0, mcqs: 0, tbs: 0, flashcards: 0, caseStudies: 0, mockExams: 0 },
      assumptions: ['Section not found'],
    };
  }
  
  const tc = TIME_CONSTANTS;
  const expMult = tc.experienceMultipliers[experience];
  const adaptiveCoverage = tc.adaptive[`mcqCoverage${experience.charAt(0).toUpperCase() + experience.slice(1)}` as keyof typeof tc.adaptive] as number;
  const passes = tc.adaptive[`passes${experience.charAt(0).toUpperCase() + experience.slice(1)}` as keyof typeof tc.adaptive] as number;
  
  // LESSONS: actual lesson minutes × experience multiplier
  const lessonMinutes = content.counts.lessonMinutes * expMult;
  const lessonHours = lessonMinutes / 60;
  
  // MCQs: coverage% of questions × passes × weighted time per question
  const avgMcqTime = (tc.mcq.firstAttempt + tc.mcq.reviewAttempt * (passes - 1)) / passes;
  const mcqMinutes = content.counts.mcqs * adaptiveCoverage * avgMcqTime * passes;
  const mcqHours = mcqMinutes / 60;
  
  // TBS: actual count × average time × passes (capped at 2)
  const avgTbsTime = (tc.tbs.firstAttempt + tc.tbs.reviewAttempt) / 2;
  const tbsMinutes = content.counts.tbs * avgTbsTime * Math.min(passes, 2);
  const tbsHours = tbsMinutes / 60;
  
  // FLASHCARDS: actual count × time per card × review sessions
  const flashcardMinutes = content.counts.flashcards * tc.flashcard.perCard * tc.flashcard.reviewSessions;
  const flashcardHours = flashcardMinutes / 60;
  
  // CASE STUDIES (CFP): actual count × average time
  const caseStudyMinutes = content.counts.caseStudies * (tc.caseStudy.firstAttempt + tc.caseStudy.reviewAttempt) / 2;
  const caseStudyHours = caseStudyMinutes / 60;
  
  // MOCK EXAMS: 2 full exams with review
  const mockExamMinutes = 2 * (tc.mockExam.duration + tc.mockExam.reviewTime);
  const mockExamHours = mockExamMinutes / 60;
  
  const total = Math.round(lessonHours + mcqHours + tbsHours + flashcardHours + caseStudyHours + mockExamHours);
  
  return {
    total,
    breakdown: {
      lessons: Math.round(lessonHours * 10) / 10,
      mcqs: Math.round(mcqHours * 10) / 10,
      tbs: Math.round(tbsHours * 10) / 10,
      flashcards: Math.round(flashcardHours * 10) / 10,
      caseStudies: Math.round(caseStudyHours * 10) / 10,
      mockExams: Math.round(mockExamHours * 10) / 10,
    },
    assumptions: [
      `Experience: ${experience} (${Math.round(expMult * 100)}% lesson time, ${Math.round(adaptiveCoverage * 100)}% MCQ coverage)`,
      `Lessons: ${content.counts.lessons} @ ${Math.round(content.counts.lessonMinutes / content.counts.lessons)} min avg`,
      `MCQs: ${content.counts.mcqs} × ${Math.round(adaptiveCoverage * 100)}% coverage × ${passes} passes`,
      `TBS: ${content.counts.tbs} simulations`,
      `Flashcards: ${content.counts.flashcards} cards × ${tc.flashcard.reviewSessions} sessions`,
      `Mock exams: 2 × ${tc.mockExam.duration + tc.mockExam.reviewTime} min`,
    ],
  };
}

/**
 * Compare our content-based estimate with industry standards
 */
export function compareWithIndustry(
  section: string,
  experience: 'none' | 'some' | 'retake' = 'some'
): {
  ourEstimate: number;
  industryMin: number;
  industryMax: number;
  withinRange: boolean;
  difference: number;
  percentDifference: number;
} {
  const content = getSectionContent(section);
  if (!content) {
    return {
      ourEstimate: 0,
      industryMin: 0,
      industryMax: 0,
      withinRange: false,
      difference: 0,
      percentDifference: 0,
    };
  }
  
  const { total } = calculateSectionStudyHours(section, experience);
  const industryMid = (content.industryHoursMin + content.industryHoursMax) / 2;
  const difference = total - industryMid;
  
  return {
    ourEstimate: total,
    industryMin: content.industryHoursMin,
    industryMax: content.industryHoursMax,
    withinRange: total >= content.industryHoursMin && total <= content.industryHoursMax,
    difference,
    percentDifference: Math.round((difference / industryMid) * 100),
  };
}

/**
 * Get total content type across all sections of an exam
 */
export function getExamTotals(courseId: CourseId): ContentCounts {
  const sections = getExamContent(courseId);
  
  return sections.reduce((totals, section) => ({
    lessons: totals.lessons + section.counts.lessons,
    lessonMinutes: totals.lessonMinutes + section.counts.lessonMinutes,
    mcqs: totals.mcqs + section.counts.mcqs,
    tbs: totals.tbs + section.counts.tbs,
    simulations: totals.simulations + section.counts.simulations,
    flashcards: totals.flashcards + section.counts.flashcards,
    caseStudies: totals.caseStudies + section.counts.caseStudies,
  }), {
    lessons: 0,
    lessonMinutes: 0,
    mcqs: 0,
    tbs: 0,
    simulations: 0,
    flashcards: 0,
    caseStudies: 0,
  });
}

/**
 * Check if a section has sufficient content for study planning
 */
export function hasMinimumContent(section: string): {
  ready: boolean;
  missing: string[];
} {
  const content = getSectionContent(section);
  if (!content) {
    return { ready: false, missing: ['Section not found'] };
  }
  
  const missing: string[] = [];
  
  if (content.counts.lessons < 10) {
    missing.push(`lessons (have ${content.counts.lessons}, need 10+)`);
  }
  if (content.counts.mcqs < 100) {
    missing.push(`MCQs (have ${content.counts.mcqs}, need 100+)`);
  }
  
  return {
    ready: missing.length === 0,
    missing,
  };
}

/**
 * Get the study plan section(s) for an exam.
 * 
 * - For per-section exams (CPA, EA, CMA, CIA): Returns individual sections
 * - For full-exam exams (CISA, CFP): Returns the aggregated section
 * 
 * @returns Array of section codes that can be used for study planning
 */
export function getStudyPlanSections(courseId: CourseId): {
  mode: 'per-section' | 'full-exam';
  sections: string[];
  description: string;
} {
  const examConfig = EXAM_CONFIGS[courseId];
  if (!examConfig) {
    return { mode: 'per-section', sections: [], description: 'Unknown exam' };
  }
  
  if (examConfig.studyPlanMode === 'full-exam') {
    // Return the aggregated section code
    const aggregatedSection = courseId.toUpperCase(); // 'CISA' or 'CFP'
    return {
      mode: 'full-exam',
      sections: [aggregatedSection],
      description: `${examConfig.examName} is taken as ONE exam. Study covers all ${examConfig.sections.length} domains together.`,
    };
  }
  
  // Per-section mode
  return {
    mode: 'per-section',
    sections: examConfig.sections,
    description: `${examConfig.examName} has ${examConfig.sections.length} separate exams. Study for one section at a time.`,
  };
}

/**
 * Get the appropriate section code for study planning.
 * 
 * For CISA/CFP: Always returns the full exam code ('CISA' or 'CFP')
 * For CPA/EA/CMA/CIA: Returns the provided section if valid
 */
export function resolveStudySection(courseId: CourseId, requestedSection?: string): string | null {
  const examConfig = EXAM_CONFIGS[courseId];
  if (!examConfig) return null;
  
  if (examConfig.studyPlanMode === 'full-exam') {
    // Always return the aggregated section
    return courseId.toUpperCase();
  }
  
  // Per-section mode - validate the requested section
  if (!requestedSection) {
    // Return first section as default
    return examConfig.sections[0] || null;
  }
  
  const normalized = requestedSection.toUpperCase();
  if (examConfig.sections.includes(normalized)) {
    return normalized;
  }
  
  // Invalid section
  return null;
}

// Export for use in study plan generation
export { SECTION_CONTENT, EXAM_CONFIGS };
