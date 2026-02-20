// Core domain types

// Import CourseId for use in this file
import type { CourseId as CourseIdType } from './course';

// Firestore-compatible timestamp type (accepts Date, Firestore Timestamp, FieldValue from serverTimestamp())
// Using structural types to avoid importing Firebase in the types layer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FirestoreTimestamp = Date | { seconds: number; nanoseconds: number } | { isEqual: (other: any) => boolean };

// Re-export course types for convenience
export * from './course';
export type { CourseId } from './course';
export type { CourseId as CourseIdType } from './course';
export type { CourseData } from './courseData';

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
 * CPA Exam Sections (original type - kept for backward compatibility)
 * Used throughout CPA-specific components
 */
export type ExamSection = 'FAR' | 'AUD' | 'REG' | 'BAR' | 'ISC' | 'TCP' | 'PREP' | 'BEC';

/**
 * EA (Enrolled Agent) Exam Sections
 * SEE = Special Enrollment Examination
 */
export type EASection = 'SEE1' | 'SEE2' | 'SEE3';

/**
 * CMA (Certified Management Accountant) Exam Sections
 */
export type CMASection = 'CMA1' | 'CMA2';

/**
 * CIA (Certified Internal Auditor) Exam Sections
 */
export type CIASection = 'CIA1' | 'CIA2' | 'CIA3';

/**
 * CISA (Certified Information Systems Auditor) Exam Sections
 */
export type CISASection = 'CISA1' | 'CISA2' | 'CISA3' | 'CISA4' | 'CISA5';

/**
 * CFP (Certified Financial Planner) Exam Sections
 */
export type CFPSection = 'CFP-PCR' | 'CFP-GEN' | 'CFP-RISK' | 'CFP-INV' | 'CFP-TAX' | 'CFP-RET' | 'CFP-EST' | 'CFP-PSY';

/**
 * All exam sections across all courses (for multi-course components)
 */
export type AllExamSections = ExamSection | EASection | CMASection | CIASection | CISASection | CFPSection;

/** @deprecated BEC ended December 15, 2023. Replaced by BAR/ISC/TCP in CPA Evolution. Use ExamSection instead. */
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
  markdown?: string; // Alternative: raw markdown content (used by CFP, CIA, etc.)
}

export interface Lesson {
  id: string;
  courseId?: CourseIdType;       // NEW: Multi-course support (defaults to 'cpa')
  section: AllExamSections;      // Updated: supports all course sections
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

/**
 * Answer option format for CFP-style questions
 */
export interface QuestionOption {
  id: string;
  text: string;
}

/**
 * CFP-style question with different structure
 */
export interface CFPQuestion {
  id: string;
  courseId?: CourseIdType;
  text: string;                  // Question text
  options: QuestionOption[];     // {id, text}[] format
  correctOptionId: string;       // 'A', 'B', 'C', 'D'
  explanation: string;
  blueprintArea?: string;
  skillLevel?: 'Remembering and Understanding' | 'Application' | 'Analysis' | 'Evaluation' | 'Remembering';
}

/**
 * Case Study question within a case study
 */
export interface CaseStudyQuestion {
  id: string;
  domain: string;               // Which CFP domain (RET, TAX, INV, EST, RISK, etc.)
  question: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
}

/**
 * CFP Case Study - Multi-part scenarios testing integrated knowledge
 */
export interface CaseStudy {
  id: string;
  title: string;
  courseId: CourseIdType;
  difficulty: NormalizedDifficulty;
  estimatedTime: number;        // Time in minutes
  domains: string[];            // CFP domains covered
  scenario: string;             // Markdown-formatted scenario
  questions: CaseStudyQuestion[];
  scoringGuide?: string;        // Markdown-formatted scoring guide
}

export interface Question {
  id: string;
  courseId?: CourseIdType;       // NEW: Multi-course support (defaults to 'cpa')
  section: AllExamSections;      // Updated: supports all course sections
  topic: string;
  subtopic?: string; // Optional — many questions omit this
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
  calculationType?: string; // For calculation-focused practice questions (EA)
  
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

/**
 * CMA Case-Based Question (CBQ) Types
 * Replacing essays starting Sept/Oct 2026
 * 
 * CBQ Question Types:
 * - numerical_entry: Type in a calculated value (e.g., NPV, variance)
 * - drag_and_drop: Arrange items in order or match items
 * - multiple_select: Select all that apply (checkbox)
 * - dropdown: Select from a dropdown list
 */
export type CBQQuestionType = 'numerical_entry' | 'drag_and_drop' | 'multiple_select' | 'dropdown';

/**
 * Individual CBQ question within a case scenario
 */
export interface CBQQuestion {
  id: string;
  prompt: string;
  type: CBQQuestionType;
  
  // For dropdown and multiple_select
  options?: string[];
  
  // For drag_and_drop - items to arrange or match
  dragItems?: string[];
  dropZones?: string[]; // Labels for drop zones (for matching)
  
  // Correct answer varies by type:
  // - numerical_entry: number
  // - dropdown: string (selected option)
  // - multiple_select: string[] (all correct options)
  // - drag_and_drop: string[] (items in correct order) or Record<string, string> (for matching)
  correctAnswer: number | string | string[] | Record<string, string>;
  
  // Tolerance for numerical_entry (e.g., ±0.01)
  tolerance?: number;
  
  // Points for this question
  points: number;
  
  explanation: string;
  hints?: string[];
}

/**
 * CMA Case-Based Question (CBQ) - Full scenario with multiple interactive questions
 * 
 * Structure:
 * - Scenario: Business context with data/exhibits
 * - 3-5 related questions in various formats
 * - Total ~15-20 minutes per CBQ
 * 
 * CMA Exam Structure (Sept 2026+):
 * - 100 MCQs (75% of score)
 * - 2 CBQs (25% of score)
 */
export interface CBQ {
  id: string;
  courseId: 'cma';
  section: CMASection;
  title: string;
  difficulty: NormalizedDifficulty;
  estimatedTime: number; // Minutes (typically 15-20)
  
  // Business scenario with data
  scenario: string; // Markdown-formatted scenario
  
  // Optional exhibits (financial statements, data tables, etc.)
  exhibits?: TBSExhibit[];
  
  // Multiple interactive questions
  questions: CBQQuestion[];
  
  // Blueprint mapping
  blueprintArea: string; // e.g., 'CMA1-B', 'CMA2-C'
  topics: string[]; // Topics covered
  
  // Total points for scoring
  totalPoints: number;
  
  // References and hints
  references?: string[];
  scoringNotes?: string;
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
  section: AllExamSections;
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

/**
 * User Profile - represents user data stored in Firestore
 * Canonical definition - import from here instead of defining locally
 */
export interface UserProfile {
  // Identity
  id?: string;                   // Firestore document ID (same as uid)
  uid?: string;                  // Firebase Auth UID (alias for id)
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  
  // Course & Exam Configuration
  activeCourse?: CourseIdType;   // Primary course the user is studying (defaults to 'cpa')
  examSection?: AllExamSections | string | null; // Current section being studied
  /** @deprecated Use examDates instead for multi-course support */
  examDate?: Date | { seconds: number; nanoseconds: number } | null; // Legacy: Target exam date
  /** Target exam dates keyed by section ID (e.g., { 'FAR': Date, 'SEE1': Date }) */
  examDates?: Record<string, Date | { seconds: number; nanoseconds: number } | null>;
  
  // Study Goals
  dailyGoal?: number;            // Daily XP/points goal
  /** @deprecated Use studyPlans instead for multi-course support */
  studyPlanId?: string | null;   // Legacy: Reference to study plan document
  /** Study plan IDs keyed by course ID (e.g., { 'cpa': 'plan-123', 'ea': 'plan-456' }) */
  studyPlans?: Record<CourseIdType, string | null>;
  
  // Progress tracking
  lessonProgress?: Record<string, number>; // Lesson completion progress by lesson ID
  
  // Onboarding
  /** @deprecated Use onboardingCompleted instead for multi-course support */
  onboardingComplete?: boolean;
  onboardingCompletedAt?: Date | { seconds: number; nanoseconds: number } | null;
  /** Onboarding completion status keyed by course ID (e.g., { 'cpa': true, 'ea': false }) */
  onboardingCompleted?: Partial<Record<CourseIdType, boolean>>;
  
  // Permissions
  isAdmin?: boolean;             // Admin role for CMS access
  
  // Notifications
  dailyReminderEnabled?: boolean;
  dailyReminderTime?: string;    // e.g., "09:00"
  weeklyReportEnabled?: boolean;
  emailUnsubscribed?: boolean;   // User opted out of marketing emails
  emailUnsubscribedAt?: Date | FirestoreTimestamp;
  
  // Preferences
  timezone?: string;             // IANA timezone string (e.g., "America/New_York")
  settings?: {
    notifications?: boolean;
    darkMode?: boolean;
    soundEffects?: boolean;
  };
  
  // Curriculum filtering (smart study)
  enableCurriculumFilter?: boolean; // Filter to covered topics only
  enablePreviewMode?: boolean;      // Allow 10% lookahead for next topics
  
  // Study schedule — which days the user intends to study (0=Sun, 1=Mon, ..., 6=Sat)
  // If omitted, all 7 days are assumed.
  studyDayPreferences?: number[];
  
  // Signup source tracking (UTM, timezone, etc.)
  signupSource?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    gclid?: string;
    referrer?: string;
    timezone?: string;
    language?: string;
  };
  
  // Timestamps (FieldValue allowed for serverTimestamp() during writes)
  createdAt?: FirestoreTimestamp;
  updatedAt?: FirestoreTimestamp;
}

