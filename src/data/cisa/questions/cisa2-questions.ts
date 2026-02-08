import { Question } from '../../../types';
import { CISA2_QUESTIONS_BATCH2 } from './cisa2-questions-batch2';
import { CISA2_QUESTIONS_BATCH3 } from './cisa2-questions-batch3';
import { CISA2_QUESTIONS_BATCH4 } from './cisa2-questions-batch4';
import { CISA2_QUESTIONS_BATCH5 } from './cisa2-questions-batch5';
import { CISA2_QUESTIONS_BATCH6 } from './cisa2-questions-batch6';
import { CISA2_QUESTIONS_BATCH7 } from './cisa2-questions-batch7';
import { CISA2_QUESTIONS_BATCH8 } from './cisa2-questions-batch8';
import { CISA2_QUESTIONS_BATCH9 } from './cisa2-cisa3-batch9';

const CISA2_QUESTIONS_BATCH1: Question[] = [
  {
    id: 'CISA2-001',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'medium',
    question: 'Effective IT governance is MAINLY the responsibility of:',
    options: [
      'The Chief Information Officer (CIO)',
      'The Board of Directors',
      'The IT Steering Committee',
      'The Audit Committee'
    ],
    correctAnswer: 1,
    explanation: 'Governance is the responsibility of the Board of Directors and executive management. They set the strategic direction and ensure objectives are achieved.',
    topic: 'IT Governance',
    subtopic: 'Roles and Responsibilities'
  },
  {
    id: 'CISA2-002',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'Which of the following creates the GREATEST risk in a segregation of duties (SoD) conflict?',
    options: [
      'A database administrator who backs up the database',
      'A systems analyst who reviews system logs',
      'A developer who has promoting rights to production',
      'A librarian who controls program versions'
    ],
    correctAnswer: 2,
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
];
