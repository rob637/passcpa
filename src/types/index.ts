// Core domain types

/**
 * Normalized Difficulty Levels
 * - 'easy' / 'medium' / 'hard' are the canonical values for questions/TBS
 * - 'beginner' / 'intermediate' / 'advanced' are allowed for lessons (maps to easy/medium/hard)
 * - 'moderate' and 'tough' are deprecated aliases (use 'medium' and 'hard' instead)
 */
export type Difficulty = 'easy' | 'medium' | 'hard' | 'beginner' | 'intermediate' | 'advanced' | 'moderate' | 'tough';
export type NormalizedDifficulty = 'easy' | 'medium' | 'hard';
export type MultiLevelDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type QuestionDifficulty = 'easy' | 'medium' | 'hard';
export type ExamSection = 'FAR' | 'AUD' | 'REG' | 'BAR' | 'ISC' | 'TCP' | 'PREP' | 'BEC';

/** @deprecated BEC was replaced by BAR/ISC/TCP in 2024 CPA Evolution. Use ExamSection instead. */
export type LegacyExamSection = 'BEC';

/** Maps various difficulty labels to normalized values */
export const normalizeDifficulty = (d: Difficulty): NormalizedDifficulty => {
  switch (d) {
    case 'easy':
    case 'beginner':
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

export interface LessonContentSection {
  title: string;
  type: 'text' | 'list' | 'table' | 'interactive' | 'dates' | 'callout' | 'example' | 'warning' | 'summary';
  
  // Content can be various formats depending on type
  content?: string | DefinitionListItem[] | string[] | any;
  
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
  section: ExamSection;
  title: string;
  description: string;
  order: number;
  duration: number; // in minutes
  difficulty: Difficulty;
  topics: string[];
  content: LessonContent;
}

export interface Question {
  id: string;
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
  
  // Legacy or optional
  choices?: string[]; // Sometimes used instead of options in legacy
}

export type TBSType = 'journal_entry' | 'reconciliation' | 'document_review' | 'research' | 'calculation' | 'form_completion' | 'written_communication';

export const TBS_TYPES = {
  JOURNAL_ENTRY: 'journal_entry',
  RECONCILIATION: 'reconciliation',
  DOCUMENT_REVIEW: 'document_review',
  RESEARCH: 'research',
  CALCULATION: 'calculation',
  FORM_COMPLETION: 'form_completion',
  WRITTEN_COMMUNICATION: 'written_communication',
} as const;

export interface TBS {
  id: string;
  section: ExamSection;
  type: TBSType;
  title?: string;
  description?: string;
  difficulty: Difficulty;
  estimatedTime?: number;
  timeEstimate?: number; // Legacy alias
  topic?: string;
  scenario?: string;

  exhibits?: any[]; // Define more strictly if possible
  questions?: any[]; // Inner questions for the sim
  requirements?: any[]; // Alternative to questions used in some data

  hints?: string[];
  references?: string[];

  // ... add other fields as discovered
  [key: string]: any; // Allow flexibility for now
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
  [key: string]: any;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  examDate?: any; // Timestamp or Date
  examSection: ExamSection;
  createdAt: any; // Firestore Timestamp
  dailyGoal?: number;
  isAdmin?: boolean; // Admin role for CMS access
}

