/**
 * CIA Part 1 Flashcards - Batch 2
 * Additional flashcards for Essentials of Internal Auditing
 *
 * Note: Duplicates removed (b2-001, b2-003, b2-005, b2-006, b2-007, b2-008, b2-018)
 */

import { CIAFlashcard } from './index';

export const CIA1_FLASHCARDS_BATCH2: CIAFlashcard[] = [
  // IIA Standards - Attribute Standards
  {
    id: 'cia1-fc-b2-002',
    section: 'CIA1',
    type: 'concept',
    topic: 'Independence',
    subtopic: 'Impairments',
    front: 'What are examples of impairments to independence or objectivity?',
    back: 'Personal conflicts of interest, scope limitations, restrictions on access, resource limitations, management influence over engagement conclusions, financial interests in the audited operation, prior operational responsibility for audited area, close personal relationships.',
    difficulty: 'hard',
    tags: ['independence', 'impairment', 'objectivity'],
    reference: 'Standard 1130'
  },
  {
    id: 'cia1-fc-b2-004',
    section: 'CIA1',
    type: 'definition',
    topic: 'Risk Management',
    subtopic: 'Risk Appetite',
    front: 'What is the difference between risk appetite and risk tolerance?',
    back: 'Risk Appetite: The broad level of risk an organization is willing to accept in pursuit of its objectives (board-level, strategic). Risk Tolerance: The acceptable level of variation relative to achievement of a specific objective (operational, measurable). Risk tolerance is narrower and more specific than risk appetite.',
    difficulty: 'hard',
    tags: ['risk appetite', 'risk tolerance', 'ERM'],
  },
  {
    id: 'cia1-fc-b2-009',
    section: 'CIA1',
    type: 'definition',
    topic: 'Controls',
    subtopic: 'Control Types',
    front: 'What is the difference between preventive, detective, and corrective controls?',
    back: 'Preventive: Stop unwanted events before they occur (approvals, segregation, access controls). Detective: Identify unwanted events after they occur (reconciliations, audits, exception reports). Corrective: Fix problems after detection (backup restoration, disciplinary action, process changes).',
    difficulty: 'easy',
    tags: ['controls', 'preventive', 'detective'],
  },
  {
    id: 'cia1-fc-b2-010',
    section: 'CIA1',
    type: 'standard',
    topic: 'Engagement',
    subtopic: 'Engagement Planning',
    front: 'What elements must be included in the engagement work program?',
    back: 'The work program must include: 1) Objectives of the engagement, 2) Procedures for identifying, analyzing, evaluating, and documenting information, 3) Procedures must be sufficient to achieve engagement objectives, 4) Must be approved prior to implementation, 5) Any adjustments approved promptly.',
    difficulty: 'medium',
    tags: ['work program', 'planning', 'engagement'],
    reference: 'Standard 2240'
  },
  {
    id: 'cia1-fc-b2-011',
    section: 'CIA1',
    type: 'concept',
    topic: 'Evidence',
    subtopic: 'Evidence Attributes',
    front: 'What are the attributes of reliable audit evidence?',
    back: 'SRRC: Sufficient (adequate quantity), Reliable (trustworthy, verified), Relevant (pertains to audit objectives), Competent (valid, factual). Evidence should support engagement observations and conclusions. Physical evidence and external confirmations are generally most reliable.',
    difficulty: 'medium',
    tags: ['evidence', 'testing', 'documentation'],
    reference: 'Standard 2310'
  },
  {
    id: 'cia1-fc-b2-012',
    section: 'CIA1',
    type: 'definition',
    topic: 'Sampling',
    subtopic: 'Statistical Sampling',
    front: 'What is the difference between attribute sampling and variable sampling?',
    back: 'Attribute Sampling: Tests yes/no characteristics (e.g., was approval obtained?). Used for compliance testing. Measures rate of occurrence. Variable Sampling: Tests numerical values (e.g., invoice amounts). Used for substantive testing. Estimates population values or totals.',
    difficulty: 'hard',
    tags: ['sampling', 'attribute', 'variable'],
  },
  {
    id: 'cia1-fc-b2-013',
    section: 'CIA1',
    type: 'standard',
    topic: 'Communication',
    subtopic: 'Engagement Results',
    front: 'What must be included in engagement communications?',
    back: 'Communications must include: 1) Objectives and scope, 2) Conclusions, 3) Recommendations and action plans, 4) Opinion when appropriate. Must be accurate, objective, clear, concise, constructive, complete, and timely. Significant errors must be corrected and communicated.',
    difficulty: 'medium',
    tags: ['communication', 'reporting', 'findings'],
    reference: 'Standard 2400'
  },
  {
    id: 'cia1-fc-b2-014',
    section: 'CIA1',
    type: 'mnemonic',
    topic: 'Findings',
    subtopic: 'Finding Components',
    front: 'What are the five elements of an audit finding?',
    back: 'CCCER: Condition (what is), Criteria (what should be), Cause (why it happened), Effect/Impact (significance), Recommendation (what to do). A complete finding addresses all five elements to support conclusions and enable corrective action.',
    difficulty: 'easy',
    tags: ['findings', 'condition', 'criteria'],
  },
  {
    id: 'cia1-fc-b2-015',
    section: 'CIA1',
    type: 'concept',
    topic: 'IIA Standards',
    subtopic: 'Conformance',
    front: 'What does "Conforms with the IIA Standards" mean?',
    back: 'Means the internal audit activity and individual auditors demonstrate achievement of all applicable Standards. Results from effective implementation of the Mandatory Guidance (Definition, Principles, Standards, Code of Ethics). External assessments required at least every 5 years.',
    difficulty: 'medium',
    tags: ['conformance', 'standards', 'IPPF'],
  },
  {
    id: 'cia1-fc-b2-016',
    section: 'CIA1',
    type: 'definition',
    topic: 'Risk',
    subtopic: 'Inherent vs Residual',
    front: 'What is the difference between inherent risk and residual risk?',
    back: 'Inherent Risk: The risk before any controls are applied. The natural risk level in absence of management action. Residual Risk: The risk remaining after controls are applied. Should be within risk appetite. Formula: Residual = Inherent - Control Effectiveness.',
    difficulty: 'medium',
    tags: ['inherent', 'residual', 'risk'],
  },
  {
    id: 'cia1-fc-b2-017',
    section: 'CIA1',
    type: 'standard',
    topic: 'Follow-up',
    subtopic: 'Monitoring Results',
    front: 'What are the CAE\'s responsibilities for follow-up?',
    back: 'The CAE must establish and maintain a system to monitor the disposition of results communicated. Must establish a follow-up process to monitor and ensure management actions have been effectively implemented or that senior management has accepted the risk of not taking action.',
    difficulty: 'medium',
    tags: ['follow-up', 'monitoring', 'CAE'],
    reference: 'Standard 2500'
  },
  {
    id: 'cia1-fc-b2-019',
    section: 'CIA1',
    type: 'definition',
    topic: 'CAE Role',
    subtopic: 'Functional Reporting',
    front: 'What does functional reporting to the board mean?',
    back: 'Functional reporting to the board includes: 1) Approving the internal audit charter, 2) Approving the risk-based audit plan, 3) Approving the CAE appointment and removal, 4) Approving the CAE remuneration, 5) Receiving communications from the CAE on results, 6) Approving the budget and resource plan.',
    difficulty: 'hard',
    tags: ['CAE', 'board', 'functional reporting'],
  },
  {
    id: 'cia1-fc-b2-020',
    section: 'CIA1',
    type: 'concept',
    topic: 'Ethics',
    subtopic: 'Confidentiality',
    front: 'What are internal auditors\' confidentiality obligations?',
    back: 'Auditors must: 1) Be prudent in use and protection of information, 2) Not use information for personal gain, 3) Not use information in a manner contrary to law or detrimental to organization, 4) Protect information even after leaving employment. May disclose when required by law or professional standards.',
    difficulty: 'medium',
    tags: ['confidentiality', 'ethics', 'code'],
  },
];

export default CIA1_FLASHCARDS_BATCH2;
