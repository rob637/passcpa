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
 * CFP Lesson structure
 */
export interface CFPLesson {
  /** Unique lesson identifier (e.g., 'TAX-L001') */
  id: string;
  
  /** Domain this lesson belongs to */
  domain: string;
  
  /** Blueprint area within the domain */
  blueprintArea: string;
  
  /** Lesson title */
  title: string;
  
  /** Order within the domain/area for sequencing */
  order: number;
  
  /** Estimated duration in minutes */
  duration: number;
  
  /** Learning objectives for this lesson */
  objectives: string[];
  
  /** Main lesson content in Markdown format */
  content: string;
  
  /** Key points students should remember */
  keyTakeaways: string[];
  
  /** Important formulas covered in this lesson */
  keyFormulas?: CFPFormulaInput[];
  
  /** Memory aids and mnemonics */
  mnemonics?: CFPMnemonicInput[];
  
  /** Practice problems with solutions */
  practiceProblems?: CFPPracticeProblem[];
  
  /** IDs of related lessons for cross-referencing */
  relatedLessons?: string[];
  
  /** Video explanation URL if available */
  videoUrl?: string;
  
  /** Additional resources and references */
  references?: string[];
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
