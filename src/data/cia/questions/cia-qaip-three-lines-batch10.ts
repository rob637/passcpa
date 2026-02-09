/**
 * CIA Part 1: QAIP and Three Lines Model Deep Dive
 * Focused batch on Quality Assurance & Improvement Program and Three Lines Model
 * 
 * QAIP Standards Coverage:
 * - 1300: Quality Assurance and Improvement Program
 * - 1310: Requirements of the QAIP
 * - 1311: Internal Assessments
 * - 1312: External Assessments
 * - 1320: Reporting on the QAIP
 * - 1321: Use of "Conforms with the IPPF" Statement
 * - 1322: Disclosure of Non-conformance
 * 
 * Three Lines Model Coverage:
 * - First Line: Operational management
 * - Second Line: Risk management, compliance
 * - Third Line: Internal audit
 * - Six Principles of the Model
 * - Governing body role
 */

import { Question } from '../../../types';

// QAIP Standards Questions
export const CIA_QAIP_QUESTIONS: Question[] = [
  {
    id: 'CIA1-QAIP-001',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'What is the primary purpose of a Quality Assurance and Improvement Program (QAIP)?',
    options: [
      'To reduce audit costs and improve efficiency',
      'To enable an evaluation of the internal audit activity\'s conformance with the Standards and Code of Ethics',
      'To document audit findings for external regulators',
      'To provide training for new internal auditors'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1300 requires the CAE to develop and maintain a QAIP that covers all aspects of the internal audit activity, enabling evaluation of conformance with the IIA Standards and Code of Ethics, and whether auditors apply the Standards.',
    topic: 'Quality Assurance',
    subtopic: 'QAIP Purpose'
  },
  {
    id: 'CIA1-QAIP-002',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'According to Standard 1310, what components must the QAIP include?',
    options: [
      'Internal assessments only',
      'External assessments only',
      'Both internal and external assessments',
      'Self-assessments by individual auditors only'
    ],
    correctAnswer: 2,
    explanation: 'Standard 1310 requires the QAIP to include both internal assessments (ongoing monitoring and periodic self-assessments) and external assessments conducted at least every five years by a qualified, independent assessor or team.',
    topic: 'Quality Assurance',
    subtopic: 'QAIP Requirements'
  },
  {
    id: 'CIA1-QAIP-003',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Internal assessments under Standard 1311 must include:',
    options: [
      'Annual external reviews',
      'Ongoing monitoring of the performance of the internal audit activity',
      'Board approval of all audit findings',
      'Independent verification by an external party'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1311 requires internal assessments to include ongoing monitoring embedded in day-to-day supervision, review, and measurement of the internal audit activity, as well as periodic assessments to appraise conformance with the Standards.',
    topic: 'Quality Assurance',
    subtopic: 'Internal Assessments'
  },
  {
    id: 'CIA1-QAIP-004',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'How often must external assessments be conducted under the IIA Standards?',
    options: [
      'Annually',
      'Every three years',
      'At least once every five years',
      'At the discretion of the CAE'
    ],
    correctAnswer: 2,
    explanation: 'Standard 1312 requires external assessments to be conducted at least once every five years by a qualified, independent assessor or assessment team from outside the organization.',
    topic: 'Quality Assurance',
    subtopic: 'External Assessments'
  },
  {
    id: 'CIA1-QAIP-005',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'Which approach is NOT acceptable for conducting an external assessment under Standard 1312?',
    options: [
      'Full external assessment by a qualified independent assessor',
      'Self-assessment with independent external validation',
      'Self-assessment without external validation reported as an external assessment',
      'Assessment by an assessment team including qualified members from outside the organization'
    ],
    correctAnswer: 2,
    explanation: 'External assessments can be full external assessments or self-assessments with independent external validation. A self-assessment without independent external validation cannot be represented as an external assessment.',
    topic: 'Quality Assurance',
    subtopic: 'External Assessment Approaches'
  },
  {
    id: 'CIA1-QAIP-006',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'What qualifications must an external assessor possess under the Standards?',
    options: [
      'CPA certification only',
      'Competence in professional practice of internal auditing and the external assessment process',
      'At least 20 years of auditing experience',
      'Employment by a Big Four accounting firm'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1312 requires external assessors to demonstrate competence in two areas: (1) the professional practice of internal auditing, and (2) the external assessment process. No specific certification or years of experience are mandated.',
    topic: 'Quality Assurance',
    subtopic: 'Assessor Qualifications'
  },
  {
    id: 'CIA1-QAIP-007',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'According to Standard 1320, to whom must the results of the QAIP be communicated?',
    options: [
      'External auditors only',
      'Senior management and the board',
      'All stakeholders including media',
      'Regulatory authorities only'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1320 requires the CAE to communicate the results of the QAIP to senior management and the board. This includes the scope and frequency of assessments, qualifications and independence of assessors, conclusions reached, and corrective action plans.',
    topic: 'Quality Assurance',
    subtopic: 'QAIP Reporting'
  },
  {
    id: 'CIA1-QAIP-008',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'When can the internal audit activity use the statement that it "Conforms with the International Standards for the Professional Practice of Internal Auditing"?',
    options: [
      'After completing any external assessment',
      'Only when results of the QAIP support this statement',
      'When the CAE self-certifies conformance',
      'After five years of operation without findings'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1321 states that the CAE may state that the internal audit activity conforms with the IPPF only when the results of the QAIP support this statement. Use of this phrase is appropriate when assessments demonstrate that the activity meets the expectations in the Standards.',
    topic: 'Quality Assurance',
    subtopic: 'Conformance Statement'
  },
  {
    id: 'CIA1-QAIP-009',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'When nonconformance with the Standards or Code of Ethics impacts the overall scope or operation of the internal audit activity, the CAE must:',
    options: [
      'Immediately resign from the position',
      'Disclose the nonconformance and its impact to senior management and the board',
      'Wait until the next scheduled board meeting',
      'Report only to external regulators'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1322 requires disclosure when nonconformance impacts the overall scope or operation of the internal audit activity. The CAE must disclose the nonconformance and the impact to senior management and the board.',
    topic: 'Quality Assurance',
    subtopic: 'Nonconformance Disclosure'
  },
  {
    id: 'CIA1-QAIP-010',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Ongoing monitoring activities within the QAIP typically include:',
    options: [
      'Annual external reviews conducted by third parties',
      'Supervisory review of workpapers, checklists, and feedback from audit clients',
      'Board approval of each engagement',
      'Regulatory examination of audit reports'
    ],
    correctAnswer: 1,
    explanation: 'Ongoing monitoring is embedded in the routine policies and practices used to manage the internal audit activity. It includes supervisory review of workpapers, post-engagement feedback, and routine quality checklists.',
    topic: 'Quality Assurance',
    subtopic: 'Ongoing Monitoring'
  },
  {
    id: 'CIA1-QAIP-011',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'The difference between ongoing monitoring and periodic assessments in the QAIP is:',
    options: [
      'Ongoing monitoring is external; periodic assessments are internal',
      'Ongoing monitoring is continuous; periodic assessments are conducted at specific intervals',
      'Ongoing monitoring requires board approval; periodic assessments do not',
      'There is no difference; they are the same activity'
    ],
    correctAnswer: 1,
    explanation: 'Ongoing monitoring is embedded in day-to-day activities and provides continuous feedback. Periodic assessments (self-assessments or by persons with knowledge of IA practices) are conducted at specific intervals to evaluate conformance with the Standards.',
    topic: 'Quality Assurance',
    subtopic: 'Assessment Types'
  },
  {
    id: 'CIA1-QAIP-012',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Who has ultimate responsibility for maintaining the QAIP?',
    options: [
      'The audit committee',
      'The Chief Audit Executive (CAE)',
      'External auditors',
      'The CEO'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1300 specifically assigns responsibility to the CAE to develop and maintain a QAIP covering all aspects of the internal audit activity. The CAE owns the program, though results are communicated to the board.',
    topic: 'Quality Assurance',
    subtopic: 'QAIP Responsibility'
  }
];

// Three Lines Model Questions
export const CIA_THREE_LINES_QUESTIONS: Question[] = [
  {
    id: 'CIA1-3L-001',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'In the IIA\'s Three Lines Model, which line represents operational management that owns and manages risks?',
    options: [
      'First Line',
      'Second Line',
      'Third Line',
      'Governing Body'
    ],
    correctAnswer: 0,
    explanation: 'The First Line consists of operational management - those who own and manage risks. They are responsible for achieving organizational objectives while managing risks within acceptable levels.',
    topic: 'Three Lines Model',
    subtopic: 'First Line Roles'
  },
  {
    id: 'CIA1-3L-002',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'What is the primary function of the Second Line in the Three Lines Model?',
    options: [
      'Providing independent assurance',
      'Providing expertise, support, monitoring, and challenge on risk-related matters',
      'Managing day-to-day operations',
      'Approving the internal audit charter'
    ],
    correctAnswer: 1,
    explanation: 'The Second Line provides expertise, support, monitoring, and challenge on risk-related matters. This includes functions like risk management, compliance, quality control, IT security, and controllership.',
    topic: 'Three Lines Model',
    subtopic: 'Second Line Roles'
  },
  {
    id: 'CIA1-3L-003',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'Internal audit represents which line in the Three Lines Model?',
    options: [
      'First Line',
      'Second Line',
      'Third Line',
      'Fourth Line'
    ],
    correctAnswer: 2,
    explanation: 'Internal audit is the Third Line, providing independent and objective assurance and advice on all matters related to the achievement of objectives. Internal audit\'s independence from management is essential to its role.',
    topic: 'Three Lines Model',
    subtopic: 'Third Line Roles'
  },
  {
    id: 'CIA1-3L-004',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'According to the Three Lines Model, which principle addresses the relationship between lines?',
    options: [
      'Lines must not communicate to maintain independence',
      'Coordination, collaboration, and communication is essential among all lines',
      'The Third Line must oversee First and Second Lines',
      'Each line operates in complete isolation'
    ],
    correctAnswer: 1,
    explanation: 'Principle 5 of the Three Lines Model emphasizes that the three lines collectively contribute to governance and risk management through coordination, collaboration, and communication. No function operates in isolation.',
    topic: 'Three Lines Model',
    subtopic: 'Coordination Principle'
  },
  {
    id: 'CIA1-3L-005',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Where does the governing body (board) fit in the Three Lines Model?',
    options: [
      'It is part of the First Line',
      'It is part of the Second Line',
      'It is outside (above) the three lines structure',
      'It is the Fourth Line'
    ],
    correctAnswer: 2,
    explanation: 'The governing body is positioned outside the three lines structure. It is accountable to stakeholders for organizational oversight and establishes structures and processes for governance. It delegates resources and authority to management.',
    topic: 'Three Lines Model',
    subtopic: 'Governing Body Role'
  },
  {
    id: 'CIA1-3L-006',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'Which of the following is a key characteristic that distinguishes the Third Line from the Second Line?',
    options: [
      'The Third Line reports only to management',
      'The Third Line maintains independence from management responsibility for operations',
      'The Third Line performs operational tasks',
      'The Third Line has no interaction with the board'
    ],
    correctAnswer: 1,
    explanation: 'The Third Line\'s distinguishing characteristic is its independence from management responsibilities for operations. While the Second Line may have some management functions, the Third Line must remain independent to provide objective assurance.',
    topic: 'Three Lines Model',
    subtopic: 'Independence Requirement'
  },
  {
    id: 'CIA1-3L-007',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Which functions typically represent the Second Line?',
    options: [
      'Sales, production, and customer service',
      'Risk management, compliance, quality, and IT security',
      'Internal audit and external audit',
      'Board of directors and audit committee'
    ],
    correctAnswer: 1,
    explanation: 'Second Line functions typically include risk management, compliance, controllership, quality control, IT security, and other functions that provide expertise, support, monitoring, and challenge on risk-related matters.',
    topic: 'Three Lines Model',
    subtopic: 'Second Line Functions'
  },
  {
    id: 'CIA1-3L-008',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'According to the Six Principles of the Three Lines Model, which principle addresses how the governing body ensures appropriate structures and processes for effective governance?',
    options: [
      'Principle 1: Governance',
      'Principle 2: Governing body roles',
      'Principle 3: Management and first/second line roles',
      'Principle 6: Creation and protection of value'
    ],
    correctAnswer: 1,
    explanation: 'Principle 2 states that the governing body ensures appropriate structures and processes are in place for effective governance. This includes establishing and overseeing the management function and creating an independent internal audit function.',
    topic: 'Three Lines Model',
    subtopic: 'Six Principles'
  },
  {
    id: 'CIA1-3L-009',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'What does Principle 6 of the Three Lines Model emphasize?',
    options: [
      'All roles must be held by different individuals',
      'External providers can play important roles in any line',
      'All roles collectively contribute to the creation and protection of value',
      'The First Line is most important'
    ],
    correctAnswer: 2,
    explanation: 'Principle 6 emphasizes that all roles collectively contribute to the creation and protection of value when aligned with stakeholder interests. Effective governance and risk management require all three lines working together.',
    topic: 'Three Lines Model',
    subtopic: 'Value Creation'
  },
  {
    id: 'CIA1-3L-010',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'In the Three Lines Model, when internal audit takes on consulting engagements for management, what safeguard is most important?',
    options: [
      'The board must approve each consulting engagement',
      'Internal audit must not perform any consulting',
      'Internal audit must maintain objectivity and clearly communicate its roles to avoid misunderstanding',
      'Consulting must be limited to financial matters only'
    ],
    correctAnswer: 2,
    explanation: 'When internal audit performs consulting, it must maintain objectivity and clearly communicate its roles. The Standards allow consulting but require safeguards to ensure that taking on consulting activities does not impair independence needed for assurance.',
    topic: 'Three Lines Model',
    subtopic: 'Consulting Safeguards'
  },
  {
    id: 'CIA1-3L-011',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The Three Lines Model replaced the former "Three Lines of Defense" model primarily to:',
    options: [
      'Add a fourth line for external audit',
      'Remove governance and focus only on operations',
      'Emphasize collaboration over defensive positioning and recognize governance roles',
      'Eliminate the need for internal audit'
    ],
    correctAnswer: 2,
    explanation: 'The IIA updated to the "Three Lines Model" (from "Three Lines of Defense") to emphasize collaboration, alignment, and value creation rather than defensive positioning. It also explicitly addresses the role of governing bodies.',
    topic: 'Three Lines Model',
    subtopic: 'Model Evolution'
  },
  {
    id: 'CIA1-3L-012',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'According to the Three Lines Model, accountability to stakeholders for organizational oversight flows directly between:',
    options: [
      'The First Line and stakeholders',
      'The governing body and stakeholders',
      'Internal audit and stakeholders',
      'The CEO and stakeholders'
    ],
    correctAnswer: 1,
    explanation: 'The governing body is accountable to stakeholders for organizational oversight. Stakeholders rely on the governing body to set objectives, ensure achievement of those objectives, and manage risks. This is a core governance principle.',
    topic: 'Three Lines Model',
    subtopic: 'Accountability'
  }
];

// Combined export
export const CIA_QAIP_THREE_LINES_BATCH10: Question[] = [
  ...CIA_QAIP_QUESTIONS,
  ...CIA_THREE_LINES_QUESTIONS
];
