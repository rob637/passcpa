/**
 * CISA Domain 1: Information Systems Auditing Process - Flashcards
 * 21% of exam weight
 */

import { Flashcard } from './types';

export const cisa1Flashcards: Flashcard[] = [
  // IS Audit Fundamentals
  {
    id: 'CISA1-FC-001',
    front: 'What is the primary objective of an IS audit?',
    back: 'To provide assurance that information systems adequately protect assets, maintain data integrity, and operate effectively to achieve organizational goals.',
    category: 'IS Audit Fundamentals',
    tags: ['audit objectives', 'assurance', 'CISA1'],
  },
  {
    id: 'CISA1-FC-002',
    front: 'What does ISACA stand for?',
    back: 'Information Systems Audit and Control Association (now goes by ISACA only as the organization has expanded beyond audit).',
    category: 'IS Audit Fundamentals',
    tags: ['ISACA', 'professional organizations', 'CISA1'],
  },
  {
    id: 'CISA1-FC-003',
    front: 'What are the three lines of defense in the risk management model?',
    back: '1st Line: Operational management (risk owners)\n2nd Line: Risk management and compliance functions\n3rd Line: Internal audit (independent assurance)',
    category: 'IS Audit Fundamentals',
    tags: ['three lines', 'risk management', 'CISA1'],
  },
  
  // Audit Standards and Guidelines
  {
    id: 'CISA1-FC-004',
    front: 'What is the difference between ISACA standards and guidelines?',
    back: 'Standards are MANDATORY requirements for IS auditors. Guidelines are RECOMMENDED practices that help implement standards.',
    category: 'Audit Standards',
    tags: ['standards', 'guidelines', 'ISACA', 'CISA1'],
  },
  {
    id: 'CISA1-FC-005',
    front: 'What is the most important attribute an IS auditor must maintain?',
    back: 'Independence - both in fact and in appearance. The auditor must be free from conflicts of interest and conditions that impair objectivity.',
    category: 'Audit Standards',
    tags: ['independence', 'objectivity', 'ethics', 'CISA1'],
  },
  {
    id: 'CISA1-FC-006',
    front: 'What should an IS auditor do if independence is impaired?',
    back: 'Disclose the impairment to appropriate parties (audit committee, management) and consider whether to decline the engagement or implement safeguards.',
    category: 'Audit Standards',
    tags: ['independence', 'disclosure', 'CISA1'],
  },
  
  // Risk-Based Auditing
  {
    id: 'CISA1-FC-007',
    front: 'What is risk-based auditing?',
    back: 'An approach that prioritizes audit resources based on risk assessment, focusing effort on high-risk areas to provide the greatest assurance value.',
    category: 'Risk-Based Auditing',
    tags: ['risk-based', 'audit planning', 'CISA1'],
  },
  {
    id: 'CISA1-FC-008',
    front: 'What are the three components of audit risk?',
    back: 'Inherent Risk: Risk before controls\nControl Risk: Risk that controls fail to prevent/detect\nDetection Risk: Risk that audit procedures miss issues',
    category: 'Risk-Based Auditing',
    tags: ['audit risk', 'inherent risk', 'control risk', 'CISA1'],
  },
  {
    id: 'CISA1-FC-009',
    front: 'What is the audit risk formula?',
    back: 'Audit Risk = Inherent Risk × Control Risk × Detection Risk\n\nAuditors can only directly control Detection Risk by changing audit procedures.',
    category: 'Risk-Based Auditing',
    tags: ['audit risk', 'risk formula', 'CISA1'],
  },
  
  // Control Self-Assessment
  {
    id: 'CISA1-FC-010',
    front: 'What is Control Self-Assessment (CSA)?',
    back: 'A technique where management and staff evaluate their own control environment. Empowers process owners to assess risks and controls in their areas.',
    category: 'Control Self-Assessment',
    tags: ['CSA', 'self-assessment', 'control evaluation', 'CISA1'],
  },
  {
    id: 'CISA1-FC-011',
    front: 'What are the benefits of CSA?',
    back: '• Improved risk awareness\n• Employee buy-in to controls\n• Early problem detection\n• Reduced audit time\n• Better understanding of processes',
    category: 'Control Self-Assessment',
    tags: ['CSA', 'benefits', 'CISA1'],
  },
  {
    id: 'CISA1-FC-012',
    front: 'What is a key limitation of CSA?',
    back: 'Potential bias - employees may understate control weaknesses in their own areas. CSA should complement, not replace, independent audit.',
    category: 'Control Self-Assessment',
    tags: ['CSA', 'limitations', 'bias', 'CISA1'],
  },
  
  // Audit Evidence
  {
    id: 'CISA1-FC-013',
    front: 'What does the SCAR acronym represent for audit evidence?',
    back: 'S - Sufficient (enough quantity)\nC - Competent (reliable and relevant)\nA - Appropriate (fits audit objective)\nR - Relevant (relates to finding)',
    category: 'Audit Evidence',
    tags: ['SCAR', 'evidence', 'audit procedures', 'CISA1'],
  },
  {
    id: 'CISA1-FC-014',
    front: 'Which is more reliable: evidence from auditee or external source?',
    back: 'External evidence is more reliable than evidence from the auditee because it is independent of the entity being audited.',
    category: 'Audit Evidence',
    tags: ['evidence reliability', 'external evidence', 'CISA1'],
  },
  {
    id: 'CISA1-FC-015',
    front: 'What are the types of audit evidence in order of reliability?',
    back: '1. Physical observation (most reliable)\n2. Documentary evidence from third party\n3. Documentary evidence from auditee\n4. Analysis performed by auditor\n5. Oral representations (least reliable)',
    category: 'Audit Evidence',
    tags: ['evidence types', 'reliability', 'CISA1'],
  },
  
  // CAATs
  {
    id: 'CISA1-FC-016',
    front: 'What are CAATs?',
    back: 'Computer-Assisted Audit Techniques - software tools that auditors use to analyze data, perform calculations, and test controls automatically.',
    category: 'CAATs',
    tags: ['CAATs', 'audit tools', 'data analysis', 'CISA1'],
  },
  {
    id: 'CISA1-FC-017',
    front: 'Name three common CAAT techniques.',
    back: '1. Test data/parallel simulation - Process test transactions\n2. Integrated test facility (ITF) - Test data in live system\n3. Generalized audit software - Data extraction and analysis',
    category: 'CAATs',
    tags: ['CAATs', 'test data', 'ITF', 'GAS', 'CISA1'],
  },
  {
    id: 'CISA1-FC-018',
    front: 'What is an Integrated Test Facility (ITF)?',
    back: 'A CAAT where a fictitious entity is created within the production system to process test transactions alongside real data. Auditor tests real processing logic.',
    category: 'CAATs',
    tags: ['ITF', 'CAATs', 'test techniques', 'CISA1'],
  },
  
  // Audit Documentation
  {
    id: 'CISA1-FC-019',
    front: 'What is the primary purpose of audit workpapers?',
    back: 'To document audit procedures performed, evidence obtained, and conclusions reached. They support the audit opinion and provide a record of work.',
    category: 'Audit Documentation',
    tags: ['workpapers', 'documentation', 'evidence', 'CISA1'],
  },
  {
    id: 'CISA1-FC-020',
    front: 'What are the key elements of proper workpaper documentation?',
    back: '• Audit objective\n• Procedures performed\n• Evidence obtained\n• Conclusions reached\n• Auditor signature/date\n• Review signature/date',
    category: 'Audit Documentation',
    tags: ['workpapers', 'documentation elements', 'CISA1'],
  },
  
  // Audit Findings
  {
    id: 'CISA1-FC-021',
    front: 'What are the five Cs of audit findings?',
    back: 'Condition: What is wrong\nCriteria: What should be\nCause: Why it happened\nConsequence: Business impact/risk\nCorrective Action: How to fix it',
    category: 'Audit Findings',
    tags: ['five Cs', 'audit findings', 'reporting', 'CISA1'],
  },
  {
    id: 'CISA1-FC-022',
    front: 'Why is identifying the root cause of a finding important?',
    back: 'Root cause helps ensure corrective actions address the underlying problem, not just symptoms. Without it, issues are likely to recur.',
    category: 'Audit Findings',
    tags: ['root cause', 'corrective action', 'CISA1'],
  },
  
  // Reporting
  {
    id: 'CISA1-FC-023',
    front: 'What is the purpose of an exit meeting?',
    back: 'To present preliminary findings to management, validate accuracy, discuss recommendations, and get agreement on action plans before the final report.',
    category: 'Audit Reporting',
    tags: ['exit meeting', 'communication', 'reporting', 'CISA1'],
  },
  {
    id: 'CISA1-FC-024',
    front: 'What should an IS auditor do if management refuses to implement a recommendation?',
    back: 'Document management\'s response, assess and communicate the risk of non-implementation, and escalate to appropriate parties (audit committee) if risk is significant.',
    category: 'Audit Reporting',
    tags: ['management response', 'escalation', 'CISA1'],
  },
  
  // Control Frameworks
  {
    id: 'CISA1-FC-025',
    front: 'What is COBIT?',
    back: 'Control Objectives for Information and Related Technology - ISACA\'s framework for IT governance and management, providing goals, metrics, and maturity models.',
    category: 'Control Frameworks',
    tags: ['COBIT', 'IT governance', 'framework', 'CISA1'],
  },
  {
    id: 'CISA1-FC-026',
    front: 'What are the five components of the COSO Internal Control Framework?',
    back: '1. Control Environment\n2. Risk Assessment\n3. Control Activities\n4. Information and Communication\n5. Monitoring Activities',
    category: 'Control Frameworks',
    tags: ['COSO', 'internal control', 'framework', 'CISA1'],
  },
  {
    id: 'CISA1-FC-027',
    front: 'What are IT General Controls (ITGCs)?',
    back: 'Controls that apply across multiple systems and support application controls. Include:\n• Logical access security\n• Change management\n• Operations/backup\n• System development',
    category: 'IT Controls',
    tags: ['ITGCs', 'general controls', 'CISA1'],
  },
  {
    id: 'CISA1-FC-028',
    front: 'What is the difference between ITGCs and application controls?',
    back: 'ITGCs: General controls across IT environment (access, change, operations)\nApplication Controls: Specific to individual applications (input, processing, output validation)',
    category: 'IT Controls',
    tags: ['ITGCs', 'application controls', 'CISA1'],
  },
  
  // Follow-up
  {
    id: 'CISA1-FC-029',
    front: 'What is the purpose of audit follow-up?',
    back: 'To verify that agreed-upon corrective actions have been implemented effectively and issues have been resolved.',
    category: 'Follow-up',
    tags: ['follow-up', 'corrective action', 'verification', 'CISA1'],
  },
  {
    id: 'CISA1-FC-030',
    front: 'What should an auditor do if corrective actions are overdue?',
    back: 'Report the status to appropriate parties, assess if remaining risk is acceptable, escalate to audit committee or board if management repeatedly fails to act.',
    category: 'Follow-up',
    tags: ['follow-up', 'escalation', 'overdue', 'CISA1'],
  },
];

export default cisa1Flashcards;
