
import { Question } from '../../../types';

export const CISA4_QUESTIONS: Question[] = [
  {
    id: 'CISA4-001',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
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
    id: 'CISA4-002',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
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
