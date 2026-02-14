import { Question } from '../../../types';
import { CISA2_QUESTIONS_BATCH2 } from './cisa2-questions-batch2';
import { CISA2_QUESTIONS_BATCH3 } from './cisa2-questions-batch3';
import { CISA2_QUESTIONS_BATCH4 } from './cisa2-questions-batch4';
import { CISA2_QUESTIONS_BATCH5 } from './cisa2-questions-batch5';
import { CISA2_QUESTIONS_BATCH6 } from './cisa2-questions-batch6';
import { CISA2_QUESTIONS_BATCH7 } from './cisa2-questions-batch7';
import { CISA2_QUESTIONS_BATCH8 } from './cisa2-questions-batch8';
import { CISA2_QUESTIONS_BATCH9 } from './cisa2-cisa3-batch9';
import { CISA2_QUESTIONS_BATCH10 } from './cisa-questions-batch10';
import { CISA2_QUESTIONS_BATCH11 } from './cisa-questions-batch11';
import { CISA2_QUESTIONS_BATCH12 } from './cisa-questions-batch12';
import { CISA2_QUESTIONS_BATCH13 } from './cisa-questions-batch13';
import { COBIT_2019_QUESTIONS } from './cisa-cobit-privacy-batch15';

const CISA2_QUESTIONS_BATCH1: Question[] = [
  {
    id: 'cisa2-001',
    courseId: 'cisa',
    section: 'CISA2',
    blueprintArea: 'CISA2-A',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Effective IT governance is MAINLY the responsibility of:',
    options: [
      'The Board of Directors',
      'The Audit Committee',
      'The Chief Information Officer (CIO)',
      'The IT Steering Committee',
    ],
    correctAnswer: 0,
    explanation: 'Governance is the responsibility of the Board of Directors and executive management. They set the strategic direction and ensure objectives are achieved.',
    topic: 'IT Governance',
    subtopic: 'Roles and Responsibilities'
  },
  {
    id: 'cisa2-002',
    courseId: 'cisa',
    section: 'CISA2',
    blueprintArea: 'CISA2-A',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Which of the following creates the GREATEST risk in a segregation of duties (SoD) conflict?',
    options: [
      'A systems analyst who reviews system logs',
      'A librarian who controls program versions',
      'A database administrator who backs up the database',
      'A developer who has promoting rights to production',
    ],
    correctAnswer: 3,
    explanation: 'A developer with access to move code to production (promoting rights) creates a significant risk because they could introduce unauthorized code or bypass change controls without detection.',
    topic: 'Risk Management',
    subtopic: 'Segregation of Duties'
  }
];

export const CISA2_QUESTIONS: Question[] = [
  ...CISA2_QUESTIONS_BATCH1,
  ...CISA2_QUESTIONS_BATCH2,
  ...CISA2_QUESTIONS_BATCH3,
  ...CISA2_QUESTIONS_BATCH4,
  ...CISA2_QUESTIONS_BATCH5,
  ...CISA2_QUESTIONS_BATCH6,
  ...CISA2_QUESTIONS_BATCH7,
  ...CISA2_QUESTIONS_BATCH8,
  ...CISA2_QUESTIONS_BATCH9,
  ...CISA2_QUESTIONS_BATCH10,
  ...CISA2_QUESTIONS_BATCH11,
  ...CISA2_QUESTIONS_BATCH12,
  ...CISA2_QUESTIONS_BATCH13,
  ...COBIT_2019_QUESTIONS, // COBIT 2019 deep dive (Batch 15)
];
