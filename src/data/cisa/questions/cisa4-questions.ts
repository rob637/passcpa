import { Question } from '../../../types';
import { CISA4_QUESTIONS_BATCH2 } from './cisa4-questions-batch2';
import { CISA4_QUESTIONS_BATCH3 } from './cisa4-questions-batch3';
import { CISA4_QUESTIONS_BATCH4 } from './cisa4-questions-batch4';
import { CISA4_QUESTIONS_BATCH5 } from './cisa4-questions-batch5';
import { CISA4_QUESTIONS_BATCH6 } from './cisa4-questions-batch6';
import { CISA4_QUESTIONS_BATCH7 } from './cisa4-questions-batch7';
import { CISA4_QUESTIONS_BATCH8 } from './cisa4-questions-batch8';
import { CISA4_QUESTIONS_BATCH9 } from './cisa4-questions-batch9';
import { CISA4_QUESTIONS_BATCH10 } from './cisa-questions-batch10';
import { CISA4_QUESTIONS_BATCH11 } from './cisa-questions-batch11';
import { CISA4_QUESTIONS_BATCH12 } from './cisa-questions-batch12';
import { CISA4_QUESTIONS_BATCH13 } from './cisa-questions-batch13';

const CISA4_QUESTIONS_BATCH1: Question[] = [
  {
    id: 'cisa4-001',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The primary purpose of a Service Level Agreement (SLA) is to:',
    options: [
      'Define the technical specifications of the hardware',
      'Agree on the level of service to be provided and monitored',
      'Establish the penalty clauses for service failure',
      'List the employees responsible for support'
    ],
    correctAnswer: 1,
    explanation: 'An SLA is an agreement between the service provider and the customer that defines the services to be delivered and the performance standards (levels) expected.',
    topic: 'IS Operations',
    subtopic: 'Service Level Management'
  },
  {
    id: 'cisa4-002',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which of the following is the most effective method for testing a disaster recovery plan (DRP) without disrupting operations?',
    options: [
      'Full interruption test',
      'Parallel test',
      'Tabletop walkthrough',
      'Checklist review'
    ],
    correctAnswer: 2,
    explanation: 'A structured walkthrough or tabletop test involves key personnel discussing the plan scenarios step-by-step. It is effective for verification without any operational disruption. (Parallel tests minimize risk but require resources; Walkthrough is often "most effective" for initial validation or non-disruption constraints depending on specific context, but typically the question implies specific constraints only solved by walkthrough or simulation).',
    topic: 'Disaster Recovery',
    subtopic: 'DRP Testing'
  }
];

export const CISA4_QUESTIONS: Question[] = [
  ...CISA4_QUESTIONS_BATCH1,
  ...CISA4_QUESTIONS_BATCH2,
  ...CISA4_QUESTIONS_BATCH3,
  ...CISA4_QUESTIONS_BATCH4,
  ...CISA4_QUESTIONS_BATCH5,
  ...CISA4_QUESTIONS_BATCH6,
  ...CISA4_QUESTIONS_BATCH7,
  ...CISA4_QUESTIONS_BATCH8,
  ...CISA4_QUESTIONS_BATCH9,
  ...CISA4_QUESTIONS_BATCH10,
  ...CISA4_QUESTIONS_BATCH11,
  ...CISA4_QUESTIONS_BATCH12,
  ...CISA4_QUESTIONS_BATCH13,
];
