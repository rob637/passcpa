
import { Question } from '../../../types';

export const CISA1_QUESTIONS: Question[] = [
  {
    id: 'CISA1-001',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
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
    id: 'CISA1-002',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
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
