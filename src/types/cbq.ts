/**
 * CMA Case-Based Question (CBQ) Types
 * 
 * Effective September 2026, CBQs replace essays on the CMA exam.
 * Each part has 2 CBQs worth 25% of total score.
 * 
 * CBQ Structure:
 * - Business scenario with data/exhibits
 * - 3-5 related questions in various formats
 * - ~15-20 minutes per CBQ
 */

// The four CBQ question types per IMA specification
export type CBQQuestionType = 
  | 'numerical_entry'   // Calculate and type a value (NPV, variance, ratio)
  | 'drag_and_drop'     // Arrange items or match concepts
  | 'multiple_select'   // Select ALL correct options (checkbox style)
  | 'dropdown';         // Choose from dropdown options (list selection)

/**
 * Base question structure shared by all CBQ types
 */
interface CBQQuestionBase {
  id: string;
  type: CBQQuestionType;
  question: string;
  explanation: string;
  points: number; // Partial credit available on CBQs
  hint?: string;
}

/**
 * Numerical Entry Question
 * User calculates and enters a numeric value
 */
export interface NumericalEntryQuestion extends CBQQuestionBase {
  type: 'numerical_entry';
  correctAnswer: number;
  tolerance?: number; // Allow for rounding differences (e.g., ±0.01)
  unit?: string; // e.g., "$", "%", "units"
  decimalPlaces?: number; // Expected precision
}

/**
 * Drag and Drop Question
 * User arranges items in order or matches items
 */
export interface DragAndDropQuestion extends CBQQuestionBase {
  type: 'drag_and_drop';
  dragItems: { id: string; text: string }[];
  dropZones: { id: string; label: string }[];
  correctMapping: Record<string, string>; // dropZoneId -> dragItemId
  mode: 'order' | 'match'; // Ordering vs matching
}

/**
 * Multiple Select Question
 * User selects ALL correct options (partial credit for partially correct)
 */
export interface MultipleSelectQuestion extends CBQQuestionBase {
  type: 'multiple_select';
  options: { id: string; text: string }[];
  correctAnswers: string[]; // Array of correct option IDs
}

/**
 * Dropdown/List Selection Question
 * User selects from dropdown menus (often multiple dropdowns in one question)
 */
export interface DropdownQuestion extends CBQQuestionBase {
  type: 'dropdown';
  blanks: {
    id: string;
    options: string[];
    correctAnswer: string;
  }[];
  questionTemplate: string; // Use {{blankId}} for blanks
}

// Union type for all CBQ question types
export type CBQQuestion = 
  | NumericalEntryQuestion 
  | DragAndDropQuestion 
  | MultipleSelectQuestion 
  | DropdownQuestion;

/**
 * CBQ Exhibit - supporting data for the scenario
 */
export interface CBQExhibit {
  id: string;
  title: string;
  type: 'table' | 'text' | 'chart' | 'financial_statement';
  content: string; // HTML or markdown content
}

/**
 * Complete CBQ Scenario
 * A business case with exhibits and 3-5 related questions
 */
export interface CBQScenario {
  id: string;
  section: 'CMA1' | 'CMA2';
  title: string;
  scenario: string; // The business case description
  exhibits: CBQExhibit[];
  questions: CBQQuestion[];
  totalPoints: number;
  estimatedMinutes: number; // Typically 15-20 minutes
  difficulty: 'foundational' | 'intermediate' | 'advanced';
  topics: string[]; // Blueprint areas covered
}

/**
 * User's answer to a CBQ question
 */
export interface CBQAnswer {
  questionId: string;
  type: CBQQuestionType;
  answer: number | string | string[] | Record<string, string>;
  timeSpent: number; // seconds
}

/**
 * Scoring result for a single CBQ question
 */
export interface CBQQuestionResult {
  questionId: string;
  type: CBQQuestionType;
  pointsEarned: number;
  pointsPossible: number;
  isCorrect: boolean;
  isPartiallyCorrect: boolean;
  feedback: string;
  userAnswer: CBQAnswer['answer'];
  correctAnswer: CBQAnswer['answer'];
}

/**
 * Complete result for a CBQ scenario
 */
export interface CBQScenarioResult {
  scenarioId: string;
  questionResults: CBQQuestionResult[];
  totalPointsEarned: number;
  totalPointsPossible: number;
  percentScore: number;
  timeSpent: number;
  completedAt: Date;
}

/**
 * CMA exam format preference (for transition period May-Aug 2026)
 */
export type CMAExamFormat = 'essay' | 'cbq';

/**
 * Check if CBQ is available/mandatory based on exam date
 */
export function getCBQAvailability(examDate: Date): {
  cbqAvailable: boolean;
  essayAvailable: boolean;
  cbqMandatory: boolean;
  formatChoice: boolean;
} {
  const mayStart = new Date('2026-05-01');
  const septStart = new Date('2026-09-01');
  
  if (examDate >= septStart) {
    // Sept 2026+: CBQ mandatory
    return {
      cbqAvailable: true,
      essayAvailable: false,
      cbqMandatory: true,
      formatChoice: false,
    };
  } else if (examDate >= mayStart) {
    // May-Aug 2026: Transition period, candidate choice
    return {
      cbqAvailable: true,
      essayAvailable: true,
      cbqMandatory: false,
      formatChoice: true,
    };
  } else {
    // Before May 2026: Essay only
    return {
      cbqAvailable: false,
      essayAvailable: true,
      cbqMandatory: false,
      formatChoice: false,
    };
  }
}
