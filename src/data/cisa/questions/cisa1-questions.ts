import { Question } from '../../../types';
import { CISA1_QUESTIONS_BATCH2 } from './cisa1-questions-batch2';
import { CISA1_QUESTIONS_BATCH3 } from './cisa1-questions-batch3';
import { CISA1_QUESTIONS_BATCH4 } from './cisa1-questions-batch4';
import { CISA1_QUESTIONS_BATCH5 } from './cisa1-questions-batch5';
import { CISA1_QUESTIONS_BATCH6 } from './cisa1-questions-batch6';
import { CISA1_QUESTIONS_BATCH7 } from './cisa1-questions-batch7';
import { CISA1_QUESTIONS_BATCH8 } from './cisa1-questions-batch8';
import { CISA1_QUESTIONS_ANALYTICS } from './cisa1-questions-analytics';
import { CISA1_QUESTIONS_BATCH10 } from './cisa-questions-batch10';
import { CISA1_QUESTIONS_BATCH11 } from './cisa-questions-batch11';
import { CISA1_QUESTIONS_BATCH12 } from './cisa-questions-batch12';
import { CISA1_QUESTIONS_BATCH13 } from './cisa-questions-batch13';

const CISA1_QUESTIONS_BATCH1: Question[] = [
  {
    id: 'cisa1-001',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which of the following describes the key objective of an IS audit strategy?',
    options: [
      'To provide sufficient evidence to support the audit opinion',
      'To identify all vulnerabilities in the system',
      'To eliminate all risks in the IT environment',
      'To ensure compliance with every regulation globally'
    ],
    correctAnswer: 0,
    explanation: 'The primary objective of an audit strategy is to determine the scope and approach that will provide sufficient appropriate evidence to support the auditor\'s opinion.',
    topic: 'Planning',
    subtopic: 'Audit Strategy'
  },
  {
    id: 'cisa1-002',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When an IS auditor identifies a significant control weakness, the FIRST step should be to:',
    options: [
      'Report the finding to the audit committee immediately',
      'Validate the finding with the auditee',
      'Conduct a root cause analysis',
      'Develop a recommendation for remediation'
    ],
    correctAnswer: 1,
    explanation: 'The auditor should first validate the finding with the auditee to ensure the factual accuracy of the observation before proceeding to analysis or reporting.',
    topic: 'Execution',
    subtopic: 'Audit Findings'
  }
];

export const CISA1_QUESTIONS: Question[] = [
  ...CISA1_QUESTIONS_BATCH1,
  ...CISA1_QUESTIONS_BATCH2,
  ...CISA1_QUESTIONS_BATCH3,
  ...CISA1_QUESTIONS_BATCH4,
  ...CISA1_QUESTIONS_BATCH5,
  ...CISA1_QUESTIONS_BATCH6,
  ...CISA1_QUESTIONS_BATCH7,
  ...CISA1_QUESTIONS_BATCH8,
  ...CISA1_QUESTIONS_ANALYTICS,
  ...CISA1_QUESTIONS_BATCH10,
  ...CISA1_QUESTIONS_BATCH11,
  ...CISA1_QUESTIONS_BATCH12,
  ...CISA1_QUESTIONS_BATCH13,
];
