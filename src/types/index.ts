// Core domain types

// Import CourseId for use in this file
import type { CourseId as CourseIdType } from './course';

// Re-export course types for convenience
export * from './course';
export type { CourseId } from './course';

/**
 * Normalized Difficulty Levels
 * - 'easy' / 'medium' / 'hard' are the canonical values for questions/TBS
 * - 'beginner' / 'intermediate' / 'advanced' are allowed for lessons (maps to easy/medium/hard)
 * - 'moderate' and 'tough' are deprecated aliases (use 'medium' and 'hard' instead)
 */
export type Difficulty = 'easy' | 'medium' | 'hard' | 'beginner' | 'intermediate' | 'advanced' | 'moderate' | 'tough' | 'foundational';
export type NormalizedDifficulty = 'easy' | 'medium' | 'hard';
export type MultiLevelDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

/**
 * Exam Sections across all courses
 * 
 * CPA Sections: FAR, AUD, REG, BAR, ISC, TCP, PREP (BEC deprecated)
 * EA Sections: SEE1 (Individuals), SEE2 (Businesses), SEE3 (Representation)
 * CMA Sections: CMA1 (Part 1), CMA2 (Part 2)
 * CIA Sections: CIA1, CIA2, CIA3
 */
export type ExamSection = 
  // CPA Sections
  | 'FAR' | 'AUD' | 'REG' | 'BAR' | 'ISC' | 'TCP' | 'PREP' | 'BEC'
  // EA Sections (Enrolled Agent - Special Enrollment Examination)
  | 'SEE1' | 'SEE2' | 'SEE3'
  // CMA Sections (Certified Management Accountant)
  | 'CMA1' | 'CMA2'
  // CIA Sections (Certified Internal Auditor)
  | 'CIA1' | 'CIA2' | 'CIA3';

/**
 * Course-specific section types for type-safe components
 */
export type CPASection = 'FAR' | 'AUD' | 'REG' | 'BAR' | 'ISC' | 'TCP' | 'PREP' | 'BEC';
export type EASection = 'SEE1' | 'SEE2' | 'SEE3';
export type CMASection = 'CMA1' | 'CMA2';
export type CIASection = 'CIA1' | 'CIA2' | 'CIA3';

/** Array of all CPA sections for iteration */
export const CPA_SECTIONS: CPASection[] = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP', 'PREP', 'BEC'];
export const EA_SECTIONS: EASection[] = ['SEE1', 'SEE2', 'SEE3'];
export const CMA_SECTIONS: CMASection[] = ['CMA1', 'CMA2'];
export const CIA_SECTIONS: CIASection[] = ['CIA1', 'CIA2', 'CIA3'];

/** @deprecated BEC was replaced by BAR/ISC/TCP in 2024 CPA Evolution. Use ExamSection instead. */
export type LegacyExamSection = 'BEC';

/** Maps various difficulty labels to normalized values */
export const normalizeDifficulty = (d: Difficulty): NormalizedDifficulty => {
  switch (d) {
    case 'easy':
    case 'beginner':
    case 'foundational':
      return 'easy';
    case 'medium':
    case 'intermediate':
    case 'moderate':
      return 'medium';
    case 'hard':
    case 'advanced':
    case 'tough':
      return 'hard';
    default:
      return 'medium';
  }
};

/** Callout types for lesson content styling */
export type CalloutType = 'important' | 'tip' | 'warning' | 'info' | 'exam-trap' | 'memory-aid';

/** Definition list item for term/definition pairs */
export interface DefinitionListItem {
  term: string;
  definition: string;
}

// TBS sub-types for type safety
export interface TBSExhibit {
  id: string;
  title: string;
  type: 'document' | 'spreadsheet' | 'form' | 'memo' | 'email' | 'image';
  content: string | Record<string, unknown>;
}

export interface TBSQuestion {
  id: string;
  prompt: string;
  type?: 'dropdown' | 'input' | 'checkbox' | 'radio';
  options?: string[];
  correctAnswer?: string | number | string[];
}

export interface TBSRequirement {
  id: string;
  text?: string;
  question?: string; // Alternative to text
  type?: string; // Type of requirement (calculation, journal_entry, etc.)
  correctAnswer?: unknown; // Can be complex objects for certain TBS types
  correctAnswers?: unknown; // Array of correct answers
  correctEntries?: { account: string; debit: number | null; credit: number | null }[];
  options?: string[];
  tolerance?: number;
  explanation?: string;
  points?: number;
  hints?: string[];
  keyPoints?: string[];
  template?: unknown; // Template for forms
  items?: unknown[]; // List items for matching/classification
  fields?: unknown[]; // Form fields
  rubric?: unknown; // Grading rubric
  multipleEntriesAllowed?: boolean;
  [key: string]: unknown; // Allow additional properties
}

export interface LessonContentSection {
  title: string;
  type: 'text' | 'list' | 'table' | 'interactive' | 'dates' | 'callout' | 'example' | 'warning' | 'summary';
  
  // Content can be various formats depending on type
  content?: string | string[] | DefinitionListItem[] | string[][] | Record<string, unknown>;
  
  // For 'list' type - simple string array (alternative to content)
  items?: string[];
  
  // For 'callout' type - styling variant
  calloutType?: CalloutType;
  
  // For 'table' type
  headers?: string[];
  rows?: string[][];
}

export interface LessonContent {
  sections: LessonContentSection[];
}

export interface Lesson {
  id: string;
  courseId?: CourseIdType;       // NEW: Multi-course support (defaults to 'cpa')
  section: ExamSection;
  title: string;
  description: string;
  order: number;
  duration: number; // in minutes
  difficulty: Difficulty;
  topics: string[];
  content: LessonContent;
  
  // Optional blueprint mapping (exam-specific)
  blueprintArea?: string;
  blueprintTopic?: string;
  skillLevel?: 'Remembering and Understanding' | 'Application' | 'Analysis' | 'Evaluation';
}

export interface Question {
  id: string;
  courseId?: CourseIdType;       // NEW: Multi-course support (defaults to 'cpa')
  section: ExamSection;
  topic: string;
  subtopic: string; // Made required to match existing data
  topicId?: string; // Legacy
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  
  // Blueprint tagging
  blueprintArea?: string;
  blueprintGroup?: string;
  blueprintTopic?: string;
  
  // Metadata
  skillLevel?: 'Remembering and Understanding' | 'Application' | 'Analysis' | 'Evaluation' | 'Remembering';
  reference?: string;
  source?: string;
  verified?: boolean;
  hr1?: boolean; // Layout helper?
  effectiveDate?: string; // For regulation changes
  
  // Video explanation support (World-Class feature)
  videoExplanation?: {
    url: string;            // YouTube, Vimeo, or direct video URL (required when present)
    thumbnail?: string;     // Thumbnail image URL
    duration?: number;      // Duration in seconds
    title?: string;         // Video title
    provider?: 'youtube' | 'vimeo' | 'direct';
    transcriptUrl?: string; // URL to transcript for accessibility
  };
  
  // AI-generated explanation (for dynamic content)
  aiExplanation?: boolean;  // Whether to offer AI-powered explanation
  
  // Legacy or optional
  choices?: string[]; // Sometimes used instead of options in legacy
}

export type TBSType = 'journal_entry' | 'reconciliation' | 'document_review' | 'research' | 'calculation' | 'form_completion' | 'written_communication' | 'multiple_choice';

export const TBS_TYPES = {
  JOURNAL_ENTRY: 'journal_entry',
  RECONCILIATION: 'reconciliation',
  DOCUMENT_REVIEW: 'document_review',
  RESEARCH: 'research',
  CALCULATION: 'calculation',
  FORM_COMPLETION: 'form_completion',
  WRITTEN_COMMUNICATION: 'written_communication',
  MULTIPLE_CHOICE: 'multiple_choice',
} as const;

export interface TBS {
  id: string;
  courseId?: CourseIdType;       // NEW: Multi-course support (defaults to 'cpa')
  section: ExamSection;
  type: TBSType;
  title?: string;
  description?: string;
  difficulty: Difficulty;
  estimatedTime?: number;
  timeEstimate?: number; // Legacy alias
  topic?: string;
  scenario?: string;

  exhibits?: TBSExhibit[]; // Exhibits like documents, spreadsheets
  questions?: TBSQuestion[]; // Inner questions for the sim
  requirements?: TBSRequirement[]; // Alternative to questions used in some data

  hints?: string[];
  references?: string[];

  // Blueprint mapping
  blueprintArea?: string;
  blueprintTopic?: string;
}

export interface WCRubricCategory {
  weight: number;
  criteria: string[];
}

export interface WCRubric {
  organization: WCRubricCategory;
  development: WCRubricCategory;
  expression: WCRubricCategory;
}

export interface WCTask {
  id: string;
  section: ExamSection;
  type: 'written_communication';
  topic: string;
  difficulty: Difficulty;
  estimatedTime: number;
  scenario: string;
  prompt?: string; // Optional - some data uses task instead
  task?: string; // The task description/instructions (optional in some data)
  rubric?: WCRubric;
  sampleResponse?: string;
  hints?: string[];
  references?: string[];
  keyPoints?: string[]; // Key points for the response
  blueprintArea?: string;
  blueprintTopic?: string;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  examDate?: Date | { seconds: number; nanoseconds: number }; // Date or Firestore Timestamp
  examSection: ExamSection;
  createdAt: Date | { seconds: number; nanoseconds: number }; // Firestore Timestamp
  dailyGoal?: number;
  isAdmin?: boolean; // Admin role for CMS access
  studyPlanId?: string; // Reference to study plan document
  onboardingComplete?: boolean;
  onboardingCompletedAt?: Date | { seconds: number; nanoseconds: number };
  dailyReminderEnabled?: boolean;
  dailyReminderTime?: string;
  weeklyReportEnabled?: boolean;
  timezone?: string; // IANA timezone string (e.g., "America/New_York")
}

