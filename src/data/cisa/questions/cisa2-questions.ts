
import { Question } from '../../../types';

export const CISA2_QUESTIONS: Question[] = [
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
