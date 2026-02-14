/**
 * CFP Course Types
 * 
 * Type definitions specific to the CFP (Certified Financial Planner) course
 */

/**
 * CFP Exam Domains with their weights
 */
export type CFPDomain = 
  | 'CFP-PCR'   // Professional Conduct and Regulation (15%)
  | 'CFP-GEN'   // General Principles (18%)
  | 'CFP-RISK'  // Risk Management and Insurance (12%)
  | 'CFP-INV'   // Investment Planning (11%)
  | 'CFP-TAX'   // Tax Planning (14%)
  | 'CFP-RET'   // Retirement Planning (19%)
  | 'CFP-EST';  // Estate Planning (12%)

/**
 * CFP Blueprint Areas
 */
export type CFPBlueprintArea =
  // Professional Conduct
  | 'PRO-1' | 'PRO-2'
  // General Principles
  | 'GEN-1' | 'GEN-2' | 'GEN-3' | 'GEN-4' | 'GEN-5' | 'GEN-6'
  // Risk Management
  | 'RIS-1' | 'RIS-2' | 'RIS-3' | 'RIS-4'
  // Investments
  | 'INV-1' | 'INV-2' | 'INV-3'
  // Tax
  | 'TAX-1' | 'TAX-2'
  // Retirement
  | 'RET-1' | 'RET-2' | 'RET-3' | 'RET-4' | 'RET-5'
  // Estate
  | 'EST-1' | 'EST-2' | 'EST-3';

/**
 * Key formula definition for lessons
 */
export interface CFPFormula {
  name: string;
  formula: string;
  variables?: Record<string, string>;
  example?: string;
}

/**
 * Mnemonic for memorization
 * Supports both 'name' (legacy) and 'acronym' field names
 */
export interface CFPMnemonic {
  name?: string;
  acronym?: string;
  meaning: string;
  usage?: string;  // Optional for flexibility
}

/**
 * Flexible formula type - can be string or object
 */
export type CFPFormulaInput = string | CFPFormula;

/**
 * Flexible mnemonic type - can be string or object
 */
export type CFPMnemonicInput = string | CFPMnemonic;

/**
 * Practice problem with solution
 */
export interface CFPPracticeProblem {
  question: string;
  answer: string;
  explanation?: string;
}

/**
 * CFP Lesson — DEPRECATED
 * CFP lessons now use the shared Lesson type from src/types/index.ts.
 * This interface is kept temporarily for reference only.
 * @deprecated Use Lesson from '../types' instead
 */
/**
 * CFP Lesson type
 * 
 * CFP lessons use a different shape from the shared Lesson type:
 * - `domain` instead of `section`
 * - `objectives` instead of `topics`
 * - `content` as raw markdown string instead of LessonContent
 */
export interface CFPLesson {
  id: string;
  domain: string;
  blueprintArea?: string;
  title: string;
  order: number;
  duration: number;
  objectives: string[];
  content: string;
  difficulty?: string;
  keyTerms?: (string | { term: string; definition: string })[];
  keyTakeaways?: string[];
  keyFormulas?: (string | { name: string; formula: string; variables?: Record<string, string> })[];
  mnemonics?: (string | CFPMnemonic)[];
  formulas?: (string | CFPFormula)[];
  practiceProblems?: CFPPracticeProblem[];
  relatedQuestionIds?: string[];
  relatedLessons?: string[];
}

/**
 * CFP Course Statistics
 */
export interface CFPCourseStats {
  totalLessons: number;
  totalQuestions: number;
  totalDuration: number; // in minutes
  byDomain: Record<string, {
    lessons: number;
    questions: number;
    examWeight: number;
  }>;
}
