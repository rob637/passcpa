
export * from './cia1-questions';
export * from './cia1-questions-batch2';
export * from './cia1-questions-batch3';
export * from './cia1-questions-batch4';
export * from './cia1-questions-batch5';
export * from './cia1-proficiency-questions';
export * from './cia1-gias-2024-questions';
export * from './cia2-questions';
export * from './cia2-questions-batch2';
export * from './cia2-questions-batch3';
export * from './cia2-questions-batch4';
export * from './cia2-questions-batch5';
export * from './cia3-questions';
export * from './cia3-questions-batch2';
export * from './cia3-questions-batch3';
export * from './cia3-questions-batch4';
export * from './cia3-questions-batch5';
export * from './cia-missing-topics-questions';
export * from './cia2-domain-iii-questions';
export * from './cia-questions-batch6';
export * from './cia-questions-batch7';
export * from './cia-questions-batch8';
export * from './cia-questions-batch9';

// Combined CIA1 questions for convenience
import { CIA1_QUESTIONS } from './cia1-questions';
import { CIA1_QUESTIONS_BATCH2 } from './cia1-questions-batch2';
import { CIA1_QUESTIONS_BATCH3 } from './cia1-questions-batch3';
import { CIA1_QUESTIONS_BATCH4 } from './cia1-questions-batch4';
import { CIA1_QUESTIONS_BATCH5 } from './cia1-questions-batch5';
import { CIA1_PROFICIENCY_QUESTIONS } from './cia1-proficiency-questions';
import { CIA1_GIAS_2024_QUESTIONS } from './cia1-gias-2024-questions';
import { CIA_QUESTIONS_BATCH6 } from './cia-questions-batch6';
import { CIA_QUESTIONS_BATCH7 } from './cia-questions-batch7';
import { CIA_QUESTIONS_BATCH8 } from './cia-questions-batch8';
import { CIA_QUESTIONS_BATCH9 } from './cia-questions-batch9';

// Filter batch 6 by section
const CIA1_BATCH6 = CIA_QUESTIONS_BATCH6.filter(q => q.section === 'CIA1');
const CIA2_BATCH6 = CIA_QUESTIONS_BATCH6.filter(q => q.section === 'CIA2');
const CIA3_BATCH6 = CIA_QUESTIONS_BATCH6.filter(q => q.section === 'CIA3');
const CIA1_BATCH7 = CIA_QUESTIONS_BATCH7.filter(q => q.section === 'CIA1');
const CIA2_BATCH7 = CIA_QUESTIONS_BATCH7.filter(q => q.section === 'CIA2');
const CIA3_BATCH7 = CIA_QUESTIONS_BATCH7.filter(q => q.section === 'CIA3');
const CIA1_BATCH8 = CIA_QUESTIONS_BATCH8.filter(q => q.section === 'CIA1');
const CIA2_BATCH8 = CIA_QUESTIONS_BATCH8.filter(q => q.section === 'CIA2');
const CIA3_BATCH8 = CIA_QUESTIONS_BATCH8.filter(q => q.section === 'CIA3');
const CIA1_BATCH9 = CIA_QUESTIONS_BATCH9.filter(q => q.section === 'CIA1');
const CIA2_BATCH9 = CIA_QUESTIONS_BATCH9.filter(q => q.section === 'CIA2');
const CIA3_BATCH9 = CIA_QUESTIONS_BATCH9.filter(q => q.section === 'CIA3');

export const ALL_CIA1_QUESTIONS = [
  ...CIA1_GIAS_2024_QUESTIONS, // GIAS 2024 - Critical Update, Priority Content
  ...CIA1_QUESTIONS,
  ...CIA1_QUESTIONS_BATCH2,
  ...CIA1_QUESTIONS_BATCH3,
  ...CIA1_QUESTIONS_BATCH4,
  ...CIA1_QUESTIONS_BATCH5,       // Foundations: Mission, Core Principles, IPPF, Ethics
  ...CIA1_PROFICIENCY_QUESTIONS,   // Proficiency & Due Professional Care expansion
  ...CIA1_BATCH6,                   // Cross-part batch 6 - CIA1 questions
  ...CIA1_BATCH7,                   // Cross-part batch 7 - CIA1 questions
  ...CIA1_BATCH8,                   // Cross-part batch 8 - CIA1 questions
  ...CIA1_BATCH9,                   // Cross-part batch 9 - CIA1 questions
];

// Combined CIA2 questions for convenience
import { CIA2_QUESTIONS } from './cia2-questions';
import { CIA2_QUESTIONS_BATCH2 } from './cia2-questions-batch2';
import { CIA2_QUESTIONS_BATCH3 } from './cia2-questions-batch3';
import { CIA2_QUESTIONS_BATCH4 } from './cia2-questions-batch4';
import { CIA2_QUESTIONS_BATCH5 } from './cia2-questions-batch5';
import { CIA_MISSING_TOPICS_QUESTIONS } from './cia-missing-topics-questions';
import { CIA2_DOMAIN_III_QUESTIONS } from './cia2-domain-iii-questions';

// Filter missing topics for CIA2 (Fraud and Sampling)
const CIA2_MISSING_TOPICS = CIA_MISSING_TOPICS_QUESTIONS.filter(q => q.section === 'CIA2');

export const ALL_CIA2_QUESTIONS = [
  ...CIA2_QUESTIONS,
  ...CIA2_QUESTIONS_BATCH2,
  ...CIA2_QUESTIONS_BATCH3,
  ...CIA2_QUESTIONS_BATCH4,
  ...CIA2_QUESTIONS_BATCH5,       // Planning, Managing IA, CAE/Board, Resources
  ...CIA2_MISSING_TOPICS,
  ...CIA2_DOMAIN_III_QUESTIONS,  // Revenue, Procurement, Payroll, ESG, Third-Party
  ...CIA2_BATCH6,                 // Cross-part batch 6 - CIA2 questions
  ...CIA2_BATCH7,                 // Cross-part batch 7 - CIA2 questions
  ...CIA2_BATCH8,                 // Cross-part batch 8 - CIA2 questions
  ...CIA2_BATCH9,                 // Cross-part batch 9 - CIA2 questions
];

// Combined CIA3 questions for convenience
import { CIA3_QUESTIONS } from './cia3-questions';
import { CIA3_QUESTIONS_BATCH2 } from './cia3-questions-batch2';
import { CIA3_QUESTIONS_BATCH3 } from './cia3-questions-batch3';
import { CIA3_QUESTIONS_BATCH4 } from './cia3-questions-batch4';
import { CIA3_QUESTIONS_BATCH5 } from './cia3-questions-batch5';

// Filter missing topics for CIA3 (IFRS/GAAP)
const CIA3_MISSING_TOPICS = CIA_MISSING_TOPICS_QUESTIONS.filter(q => q.section === 'CIA3');

export const ALL_CIA3_QUESTIONS = [
  ...CIA3_QUESTIONS,
  ...CIA3_QUESTIONS_BATCH2,
  ...CIA3_QUESTIONS_BATCH3,
  ...CIA3_QUESTIONS_BATCH4,
  ...CIA3_QUESTIONS_BATCH5,       // InfoSec Frameworks, Privacy, Business Acumen
  ...CIA3_MISSING_TOPICS,
  ...CIA3_BATCH6,                 // Cross-part batch 6 - CIA3 questions
  ...CIA3_BATCH7,                 // Cross-part batch 7 - CIA3 questions
  ...CIA3_BATCH8,                 // Cross-part batch 8 - CIA3 questions
  ...CIA3_BATCH9,                 // Cross-part batch 9 - CIA3 questions
];
