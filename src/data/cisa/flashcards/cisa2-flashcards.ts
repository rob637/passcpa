/**
 * CISA Domain 2: Governance and Management of IT - Flashcards
 * 17% of exam weight
 */

import { Flashcard } from './types';

export const cisa2Flashcards: Flashcard[] = [
  // IT Governance Fundamentals
  {
    id: 'cisa2-fc-001',
    front: 'What is IT Governance?',
    back: 'The framework ensuring IT investments support business objectives, risks are managed appropriately, and resources are used responsibly. Part of corporate governance.',
    category: 'IT Governance',
    tags: ['governance', 'IT management', 'CISA2'],
  },
  {
    id: 'cisa2-fc-002',
    front: 'What does SVRP-P stand for in IT Governance outcomes?',
    back: 'Strategic alignment\nValue delivery\nRisk management\nPerformance measurement\nResource management (Plus)',
    category: 'IT Governance',
    tags: ['SVRP-P', 'governance outcomes', 'CISA2'],
  },
  {
    id: 'cisa2-fc-003',
    front: 'Who is ultimately responsible for IT governance?',
    back: 'The Board of Directors. They set direction, approve strategy, and provide oversight. Management implements, but the board is accountable.',
    category: 'IT Governance',
    tags: ['board responsibility', 'accountability', 'CISA2'],
  },
  
  // IT Strategy
  {
    id: 'cisa2-fc-004',
    front: 'What should the IT strategy be aligned with?',
    back: 'The overall business strategy. IT strategy should support and enable business objectives, not exist in isolation.',
    category: 'IT Strategy',
    tags: ['strategic alignment', 'IT strategy', 'CISA2'],
  },
  {
    id: 'cisa2-fc-005',
    front: 'What is an IT steering committee?',
    back: 'A governance body with IT and business leadership that oversees IT investments, priorities, and alignment with business objectives.',
    category: 'IT Strategy',
    tags: ['steering committee', 'governance body', 'CISA2'],
  },
  {
    id: 'cisa2-fc-006',
    front: 'What is the purpose of an IT balanced scorecard?',
    back: 'To measure IT performance across multiple perspectives: financial, customer, internal processes, and learning/growth - not just financial metrics.',
    category: 'IT Strategy',
    tags: ['balanced scorecard', 'performance measurement', 'CISA2'],
  },
  
  // Policies and Procedures
  {
    id: 'cisa2-fc-007',
    front: 'What is the difference between a policy and a procedure?',
    back: 'Policy: High-level statement of management intent (WHAT to do)\nProcedure: Detailed step-by-step instructions (HOW to do it)',
    category: 'Policies',
    tags: ['policy', 'procedure', 'governance', 'CISA2'],
  },
  {
    id: 'cisa2-fc-008',
    front: 'Who should approve organizational security policies?',
    back: 'Senior management (C-level) or the Board. Policies require authority to be enforceable across the organization.',
    category: 'Policies',
    tags: ['policy approval', 'senior management', 'CISA2'],
  },
  {
    id: 'cisa2-fc-009',
    front: 'How often should policies be reviewed?',
    back: 'At least annually, or when significant changes occur (regulatory, organizational, technology). Regular review ensures currency and relevance.',
    category: 'Policies',
    tags: ['policy review', 'governance', 'CISA2'],
  },
  
  // Organizational Structure
  {
    id: 'cisa2-fc-010',
    front: 'What is Segregation of Duties (SoD)?',
    back: 'Dividing critical functions among different people to prevent fraud and error. No single person should control all phases of a transaction.',
    category: 'Organization',
    tags: ['segregation of duties', 'SoD', 'controls', 'CISA2'],
  },
  {
    id: 'cisa2-fc-011',
    front: 'What are the classic SoD incompatible functions?',
    back: '• Authorization (approve)\n• Custody (access/handle assets)\n• Recording (accounting/documentation)\n• Verification (reconciliation)',
    category: 'Organization',
    tags: ['SoD', 'incompatible functions', 'CISA2'],
  },
  {
    id: 'cisa2-fc-012',
    front: 'What is a compensating control?',
    back: 'An alternative control used when ideal controls cannot be implemented (e.g., small staff). Should adequately address the risk in a different way.',
    category: 'Organization',
    tags: ['compensating control', 'SoD', 'CISA2'],
  },
  
  // HR Controls
  {
    id: 'cisa2-fc-013',
    front: 'What is the purpose of background checks?',
    back: 'To verify candidate information and identity, identify potential risks before hiring, especially for positions with access to sensitive data or systems.',
    category: 'HR Controls',
    tags: ['background checks', 'hiring', 'CISA2'],
  },
  {
    id: 'cisa2-fc-014',
    front: 'What should happen on an employee\'s last day (termination)?',
    back: '• Disable/revoke all access immediately\n• Collect badges, keys, equipment\n• Exit interview\n• Remove from systems\n• Redirect email (if appropriate)',
    category: 'HR Controls',
    tags: ['termination', 'offboarding', 'access removal', 'CISA2'],
  },
  {
    id: 'cisa2-fc-015',
    front: 'What is the purpose of mandatory vacation policies?',
    back: 'To detect fraud or irregularities. When employees are absent, others perform their duties and may discover concealed issues. Acts as detective control.',
    category: 'HR Controls',
    tags: ['mandatory vacation', 'fraud detection', 'CISA2'],
  },
  
  // Risk Management
  {
    id: 'cisa2-fc-016',
    front: 'What are the four ways to treat risk?',
    back: 'Accept: Accept the risk as-is\nMitigate: Reduce likelihood or impact\nTransfer: Shift to third party (insurance)\nAvoid: Eliminate the activity causing risk',
    category: 'Risk Management',
    tags: ['risk treatment', 'risk options', 'CISA2'],
  },
  {
    id: 'cisa2-fc-017',
    front: 'What is the formula for Single Loss Expectancy (SLE)?',
    back: 'SLE = Asset Value (AV) × Exposure Factor (EF)\n\nExposure Factor = percentage of asset lost in an event',
    category: 'Risk Management',
    tags: ['SLE', 'quantitative risk', 'formula', 'CISA2'],
  },
  {
    id: 'cisa2-fc-018',
    front: 'What is the formula for Annualized Loss Expectancy (ALE)?',
    back: 'ALE = SLE × ARO\n\nARO = Annualized Rate of Occurrence (times per year event occurs)\nALE helps prioritize security investments by expected annual loss.',
    category: 'Risk Management',
    tags: ['ALE', 'ARO', 'quantitative risk', 'formula', 'CISA2'],
  },
  {
    id: 'cisa2-fc-019',
    front: 'What is residual risk?',
    back: 'The risk remaining after controls are applied. Residual risk must be within the organization\'s risk appetite. Formula: Inherent Risk - Control Effectiveness',
    category: 'Risk Management',
    tags: ['residual risk', 'risk acceptance', 'CISA2'],
  },
  
  // Vendor Management
  {
    id: 'cisa2-fc-020',
    front: 'What is vendor due diligence?',
    back: 'Evaluation of a vendor\'s capabilities, financial stability, security practices, and compliance before entering a relationship. Assesses third-party risk.',
    category: 'Vendor Management',
    tags: ['due diligence', 'vendor risk', 'CISA2'],
  },
  {
    id: 'cisa2-fc-021',
    front: 'What should be included in a vendor contract for security?',
    back: '• Security requirements and standards\n• Right to audit\n• Data protection obligations\n• Incident notification requirements\n• Breach liability\n• Termination/transition provisions',
    category: 'Vendor Management',
    tags: ['vendor contract', 'security requirements', 'CISA2'],
  },
  {
    id: 'cisa2-fc-022',
    front: 'What is vendor lock-in?',
    back: 'Dependency on a vendor that makes switching difficult or costly. Mitigate with open standards, documented interfaces, and exit planning.',
    category: 'Vendor Management',
    tags: ['vendor lock-in', 'vendor risk', 'CISA2'],
  },
  
  // BIA and Recovery
  {
    id: 'cisa2-fc-023',
    front: 'What is a Business Impact Analysis (BIA)?',
    back: 'Process to identify critical business processes and the impact if they are unavailable. Determines recovery priorities and requirements (RTO, RPO).',
    category: 'BIA',
    tags: ['BIA', 'business impact', 'recovery', 'CISA2'],
  },
  {
    id: 'cisa2-fc-024',
    front: 'What is RTO (Recovery Time Objective)?',
    back: 'Maximum acceptable time to restore a system or process after disruption. How quickly must we be back up?',
    category: 'BIA',
    tags: ['RTO', 'recovery objectives', 'CISA2'],
  },
  {
    id: 'cisa2-fc-025',
    front: 'What is RPO (Recovery Point Objective)?',
    back: 'Maximum acceptable data loss measured in time. If RPO = 4 hours, you need backups every 4 hours to meet the objective.',
    category: 'BIA',
    tags: ['RPO', 'data loss', 'backup', 'CISA2'],
  },
  {
    id: 'cisa2-fc-026',
    front: 'What is MTD (Maximum Tolerable Downtime)?',
    back: 'The maximum time a business function can be unavailable before the organization faces unacceptable consequences. MTD ≥ RTO.',
    category: 'BIA',
    tags: ['MTD', 'downtime', 'business continuity', 'CISA2'],
  },
  
  // ITSM
  {
    id: 'cisa2-fc-027',
    front: 'What is ITIL?',
    back: 'IT Infrastructure Library - best practice framework for IT Service Management (ITSM). Covers service strategy, design, transition, operation, and improvement.',
    category: 'IT Service Management',
    tags: ['ITIL', 'ITSM', 'best practices', 'CISA2'],
  },
  {
    id: 'cisa2-fc-028',
    front: 'What is a Service Level Agreement (SLA)?',
    back: 'Formal agreement defining service expectations between provider and customer: availability, performance, response times, and remedies for failure.',
    category: 'IT Service Management',
    tags: ['SLA', 'service levels', 'CISA2'],
  },
  
  // IT Financial Management
  {
    id: 'cisa2-fc-029',
    front: 'What is the difference between CapEx and OpEx?',
    back: 'CapEx (Capital Expenditure): One-time investment in assets (servers, buildings)\nOpEx (Operating Expenditure): Ongoing costs (salaries, subscriptions, cloud services)',
    category: 'IT Finance',
    tags: ['CapEx', 'OpEx', 'IT budgeting', 'CISA2'],
  },
  {
    id: 'cisa2-fc-030',
    front: 'What is Total Cost of Ownership (TCO)?',
    back: 'Complete cost of an IT investment including purchase, implementation, operation, maintenance, training, and disposal over its lifecycle.',
    category: 'IT Finance',
    tags: ['TCO', 'cost analysis', 'CISA2'],
  },
];

export default cisa2Flashcards;
