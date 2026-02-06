
import { Question } from '../../../types';

export const CIA1_QUESTIONS: Question[] = [
  {
    id: 'CIA1-001',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'According to the IIA Code of Ethics, which of the following principles requires internal auditors to disclose all material facts known to them that, if not disclosed, may distort the reporting of activities under review?',
    options: [
      'Integrity',
      'Objectivity',
      'Confidentiality',
      'Competency'
    ],
    correctAnswer: 1,
    explanation: 'Objectivity requires internal auditors to disclose all material facts known to them that, if not disclosed, may distort the reporting of activities under review. Integrity establishes trust. Confidentiality requires prudent use of information. Competency involves knowledge and skills.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Code of Ethics'
  },
  {
    id: 'CIA1-002',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'Which of the following best describes the difference between assurance services and consulting services provided by internal audit?',
    options: [
      'Assurance services involve 2 parties, while consulting involves 3 parties',
      'Assurance services are customer-driven, while consulting services are auditor-driven',
      'Assurance services involve 3 parties (auditee, auditor, user), while consulting involves 2 parties (customer, auditor)',
      'There is no fundamental difference in the structure of the engagement'
    ],
    correctAnswer: 2,
    explanation: 'Assurance services typically involve three parties: the person/group directly involved with the process (process owner/auditee), the person making the assessment (auditor), and the person using the assessment (user). Consulting services generally involve two parties: the customer and the internal auditor.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Charter'
  },
  {
    id: 'CIA1-003',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Organizational independence is effectively achieved when the chief audit executive (CAE) reports functionally to whom?',
    options: [
      'The CEO',
      'The Board or Audit Committee',
      'The CFO',
      'Legal Counsel'
    ],
    correctAnswer: 1,
    explanation: 'To maintain organizational independence, the CAE should report functionally to the Board (or Audit Committee) and administratively to Senior Management (e.g., CEO). Functional reporting includes approval of the charter, risk assessment, and audit plan.',
    topic: 'Independence and Objectivity',
    subtopic: 'Organizational Independence'
  }
];
