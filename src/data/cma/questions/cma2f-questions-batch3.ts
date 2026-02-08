/**
 * CMA Part 2, Section F: Professional Ethics - Questions Batch 3 (Q51-75)
 * Weight: 15% of Part 2 Exam
 * 
 * Blueprint Areas:
 * - CMA2-F: Professional Ethics
 * 
 * Topics covered:
 * - IMA Statement of Ethical Professional Practice
 * - Ethical Decision Frameworks
 * - Organizational Ethics
 * - Fraud and Misconduct
 * - Whistleblowing and Reporting
 * - Global Ethics Considerations
 */

import { Question } from '../../../types';

export const CMA2F_QUESTIONS_BATCH3: Question[] = [
  // ==========================================
  // IMA Ethical Standards - Advanced
  // ==========================================
  {
    id: 'cma2-f-051',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'IMA Standards',
    subtopic: 'Competence Advanced',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under IMA standards, a management accountant who lacks expertise in a specialized area should:',
    options: [
      'Fake expertise to maintain credibility',
      'Recognize limitations and either develop competence or seek expert assistance',
      'Refuse all challenging assignments',
      'Delegate all work to subordinates'
    ],
    correctAnswer: 1,
    explanation: 'Competence standard requires recognizing limitations. Options: develop the expertise through training, consult with qualified experts, or recuse from the assignment if unable to become competent.',
    reference: 'IMA Competence Standard',
  },
  {
    id: 'cma2-f-052',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'IMA Standards',
    subtopic: 'Confidentiality Limits',
    difficulty: 'easy',
    skillLevel: 'Evaluation',
    question: 'The IMA confidentiality standard may be overridden when:',
    options: [
      'Sharing information would benefit the professional personally',
      'Legal or professional obligations require disclosure (e.g., court order, regulatory requirement)',
      'A competitor offers payment',
      'Information is no longer useful to the company'
    ],
    correctAnswer: 1,
    explanation: 'Confidentiality has limits: legal requirements (subpoenas, regulatory mandates), professional ethics (reporting fraud), and protecting public interest can require disclosure.',
    reference: 'Confidentiality Exceptions',
  },
  {
    id: 'cma2-f-053',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'IMA Standards',
    subtopic: 'Integrity Challenges',
    difficulty: 'easy',
    skillLevel: 'Evaluation',
    question: 'A CFO asks you to record revenue early to meet analyst expectations. According to IMA standards, you should:',
    options: [
      'Record the entry as requested to support the team',
      'Refuse to participate in the unethical conduct and follow resolution process',
      'Delay response until next quarter',
      'Record it but inform the board later'
    ],
    correctAnswer: 1,
    explanation: 'Integrity standard requires refusing to participate in activities that discredit the profession. Follow the ethical conflict resolution process: discuss with supervisor, escalate if needed, ultimately refuse.',
    reference: 'IMA Integrity Standard',
  },
  {
    id: 'cma2-f-054',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'IMA Standards',
    subtopic: 'Credibility Full Disclosure',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The credibility standard of "communicate information fairly and objectively" means:',
    options: [
      'Presenting only positive news to management',
      'Disclosing all relevant information that users would need for decision-making',
      'Using technical jargon to appear knowledgeable',
      'Copying competitor reports'
    ],
    correctAnswer: 1,
    explanation: 'Credibility requires fair, objective, and complete communication. Material information—favorable or unfavorable—must be disclosed if it would affect users\' decisions.',
    reference: 'IMA Credibility Standard',
  },

  // ==========================================
  // Ethical Conflict Resolution
  // ==========================================
  {
    id: 'cma2-f-055',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Conflict Resolution',
    subtopic: 'Resolution Process',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'According to IMA guidance, the first step in resolving an ethical conflict is:',
    options: [
      'Immediately resign',
      'Discuss the matter with your immediate supervisor or next higher level not involved',
      'Go directly to external regulators',
      'Contact the media'
    ],
    correctAnswer: 1,
    explanation: 'IMA resolution process: (1) Discuss with immediate supervisor (unless involved), (2) Escalate to higher levels, (3) Consult ethics hotlines/counselors, (4) Consider resignation if unresolved.',
    reference: 'Ethical Conflict Resolution',
  },
  {
    id: 'cma2-f-056',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Conflict Resolution',
    subtopic: 'Escalation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'If an ethical issue cannot be resolved with your immediate supervisor, the next step is to:',
    options: [
      'Give up and comply',
      'Escalate to the next higher management level or audit committee',
      'Sue the company immediately',
      'Do nothing'
    ],
    correctAnswer: 1,
    explanation: 'Continue escalating within the organization: higher management, chief ethics officer, audit committee, or board of directors. Exhaust internal options before considering external action.',
    reference: 'Escalation Process',
  },
  {
    id: 'cma2-f-057',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Conflict Resolution',
    subtopic: 'Documentation',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'When facing an ethical conflict, documentation is important because:',
    options: [
      'It\'s required for all work activities',
      'It provides evidence of concerns raised and responses received',
      'It is used to threaten supervisors',
      'It\'s only needed for tax purposes'
    ],
    correctAnswer: 1,
    explanation: 'Documenting ethical concerns, discussions, and responses protects the individual, creates a record for investigations, and demonstrates good faith efforts to resolve issues.',
    reference: 'Documentation in Ethics',
  },

  // ==========================================
  // Organizational Ethics
  // ==========================================
  {
    id: 'cma2-f-059',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Organizational Ethics',
    subtopic: 'Code of Conduct',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'An effective corporate code of conduct should:',
    options: [
      'Be as brief as possible with no examples',
      'Provide clear expectations, practical guidance, and be communicated and enforced consistently',
      'Only apply to lower-level employees',
      'Never be updated'
    ],
    correctAnswer: 1,
    explanation: 'Effective codes: clear principles, realistic examples, accessible language, consistent enforcement, regular training, and periodic updates. Apply to all levels including leadership.',
    reference: 'Code of Conduct',
  },
  {
    id: 'cma2-f-060',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Organizational Ethics',
    subtopic: 'Ethics Training',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Ethics training programs should:',
    options: [
      'Be a one-time event at hire',
      'Use case studies, be regularly updated, and include all employees',
      'Focus only on legal compliance',
      'Be optional for executives'
    ],
    correctAnswer: 1,
    explanation: 'Effective ethics training: regular (not one-time), case-based for engagement, updated for new issues, mandatory for all levels, with opportunity for discussion and questions.',
    reference: 'Ethics Training',
  },
  {
    id: 'cma2-f-061',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Organizational Ethics',
    subtopic: 'Ethics Hotlines',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Anonymous ethics hotlines help organizations by:',
    options: [
      'Eliminating the need for internal controls',
      'Providing a safe channel for reporting concerns without fear of retaliation',
      'Replacing management oversight',
      'Generating revenue'
    ],
    correctAnswer: 1,
    explanation: 'Hotlines encourage reporting by protecting anonymity. Many frauds are detected through tips. Hotlines must be truly independent with guaranteed confidentiality and non-retaliation policies.',
    reference: 'Ethics Hotlines',
  },

  // ==========================================
  // Fraud and Misconduct
  // ==========================================
  {
    id: 'cma2-f-062',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Fraud',
    subtopic: 'Fraud Triangle',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The fraud triangle includes:',
    options: [
      'Assets, liabilities, and equity',
      'Opportunity, rationalization, and pressure/incentive',
      'Revenue, expense, and profit',
      'Planning, execution, and cover-up'
    ],
    correctAnswer: 1,
    explanation: 'Fraud triangle (Cressey): (1) Pressure/incentive (financial need, targets), (2) Opportunity (weak controls), (3) Rationalization (self-justification). All three typically present in fraud.',
    reference: 'Fraud Triangle',
  },
  {
    id: 'cma2-f-063',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Fraud',
    subtopic: 'Red Flags',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Which is a common fraud red flag?',
    options: [
      'Employees taking vacations',
      'Lifestyle inconsistent with compensation, unusual hours, and reluctance to share duties',
      'Following all company procedures',
      'Regular job rotation'
    ],
    correctAnswer: 1,
    explanation: 'Red flags: living beyond means, unusual work hours, reluctance to take vacation, unwillingness to share duties, unusually close vendor relationships, missing documentation.',
    reference: 'Fraud Red Flags',
  },
  {
    id: 'cma2-f-064',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Fraud',
    subtopic: 'Financial Statement Fraud',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'Financial statement fraud typically involves:',
    options: [
      'Employees stealing cash',
      'Management intentionally misstating financials to deceive users',
      'Vendor overcharging',
      'Employee expense abuse'
    ],
    correctAnswer: 1,
    explanation: 'Financial statement fraud: intentional misstatement of financials by management to meet targets, inflate stock price, or obtain financing. Examples: premature revenue, hidden liabilities, improper capitalization.',
    reference: 'Financial Statement Fraud',
  },
  {
    id: 'cma2-f-065',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Fraud',
    subtopic: 'Corruption',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Corruption in a business context includes:',
    options: [
      'Only government officials taking bribes',
      'Bribery, kickbacks, conflicts of interest, and bid rigging',
      'Poor customer service',
      'High employee turnover'
    ],
    correctAnswer: 1,
    explanation: 'Corruption: bribery (payments for favorable treatment), kickbacks (payments from vendors), conflicts of interest, bid rigging, and other abuse of position for personal gain.',
    reference: 'Business Corruption',
  },

  // ==========================================
  // Whistleblowing
  // ==========================================
  {
    id: 'cma2-f-066',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Whistleblowing',
    subtopic: 'Legal Protections',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The Sarbanes-Oxley Act provides whistleblower protections by:',
    options: [
      'Allowing unlimited anonymous tips',
      'Prohibiting retaliation against employees who report securities violations',
      'Requiring all complaints to be public',
      'Only protecting management'
    ],
    correctAnswer: 1,
    explanation: 'SOX Section 806 protects employees who report securities fraud from retaliation (discharge, demotion, harassment). Provides remedies including reinstatement and back pay.',
    reference: 'SOX Whistleblower Protections',
  },
  {
    id: 'cma2-f-067',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Whistleblowing',
    subtopic: 'Dodd-Frank',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Under Dodd-Frank whistleblower provisions, eligible whistleblowers may receive:',
    options: [
      'No compensation',
      '10-30% of sanctions over $1 million in SEC enforcement actions',
      'Only thank-you letters',
      'Guaranteed employment'
    ],
    correctAnswer: 1,
    explanation: 'Dodd-Frank: whistleblowers who voluntarily provide original information leading to successful SEC enforcement (>$1M sanctions) may receive 10-30% of the monetary sanctions.',
    reference: 'Dodd-Frank Whistleblower Award',
  },
  {
    id: 'cma2-f-068',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Whistleblowing',
    subtopic: 'Ethical Considerations',
    difficulty: 'easy',
    skillLevel: 'Evaluation',
    question: 'Before external whistleblowing, an employee should typically:',
    options: [
      'Immediately contact the media',
      'Exhaust internal reporting channels while documenting concerns and responses',
      'Never report anything externally',
      'Wait until retirement'
    ],
    correctAnswer: 1,
    explanation: 'Best practice: use internal channels first (hotline, management, audit committee), document thoroughly, and escalate externally only if internal remedies fail or legal obligations require it.',
    reference: 'Whistleblowing Process',
  },

  // ==========================================
  // Global Ethics
  // ==========================================
  {
    id: 'cma2-f-070',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Global Ethics',
    subtopic: 'UK Bribery Act',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The UK Bribery Act differs from FCPA in that it:',
    options: [
      'Only applies to UK citizens',
      'Prohibits both public and private sector bribery, including facilitation payments',
      'Has no penalties',
      'Only covers UK transactions'
    ],
    correctAnswer: 1,
    explanation: 'UK Bribery Act is broader: covers private sector bribery (not just government officials), prohibits facilitation payments (FCPA has limited exception), and has strict liability for organizations.',
    reference: 'UK Bribery Act',
  },
  {
    id: 'cma2-f-071',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Global Ethics',
    subtopic: 'Cultural Considerations',
    difficulty: 'easy',
    skillLevel: 'Evaluation',
    question: 'When business practices vary across cultures, an ethical approach is to:',
    options: [
      'Always apply home country standards regardless of local norms',
      'Balance respect for cultural differences with adherence to core ethical principles and legal requirements',
      'Ignore all ethical standards abroad',
      'Only follow local laws even if they permit corruption'
    ],
    correctAnswer: 1,
    explanation: 'Navigate cultural differences while maintaining core principles. Some practices may be acceptable locally but violate core ethics or laws (bribery). Build relationships ethically within cultural context.',
    reference: 'Cross-Cultural Ethics',
  },

  // ==========================================
  // Corporate Social Responsibility
  // ==========================================
  {
    id: 'cma2-f-072',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'CSR and Sustainability',
    subtopic: 'Stakeholder Theory',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Stakeholder theory suggests businesses should consider:',
    options: [
      'Only shareholder wealth maximization',
      'Interests of all stakeholders: employees, customers, communities, environment, and shareholders',
      'Only customer satisfaction',
      'Government interests only'
    ],
    correctAnswer: 1,
    explanation: 'Stakeholder theory: businesses have responsibilities to all affected parties (stakeholders), not just shareholders. Long-term value creation requires balancing stakeholder interests.',
    reference: 'Stakeholder Theory',
  },
  {
    id: 'cma2-f-073',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'CSR and Sustainability',
    subtopic: 'ESG Reporting',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'ESG reporting addresses:',
    options: [
      'Only earnings per share',
      'Environmental, Social, and Governance factors relevant to sustainability',
      'Only executive compensation',
      'Technical accounting standards only'
    ],
    correctAnswer: 1,
    explanation: 'ESG: Environmental (emissions, resource use), Social (labor practices, community), Governance (board, ethics, transparency). Increasingly important to investors and stakeholders.',
    reference: 'ESG Reporting',
  },

  // ==========================================
  // Professional Responsibility
  // ==========================================
  {
    id: 'cma2-f-074',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Professional Responsibility',
    subtopic: 'Continuing Education',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'CMAs are required to maintain competence through:',
    options: [
      'No ongoing requirements',
      'Continuing Professional Education (CPE) requirements',
      'Only on-the-job experience',
      'Annual certification exams'
    ],
    correctAnswer: 1,
    explanation: 'CMAs must complete continuing education (30 hours per year) to maintain certification. This ensures ongoing competence in evolving business, technology, and regulatory environments.',
    reference: 'CMA CPE Requirements',
  },
  {
    id: 'cma2-f-075',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Professional Responsibility',
    subtopic: 'Public Trust',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Management accountants\' ethical obligations serve to:',
    options: [
      'Only benefit their employers',
      'Protect the public interest by ensuring reliable information for decision-making',
      'Maximize personal income',
      'Compete with other professions'
    ],
    correctAnswer: 1,
    explanation: 'Beyond employer interests, accountants serve the public interest. Reliable financial information enables functioning capital markets, informed stakeholder decisions, and economic stability.',
    reference: 'Public Interest Obligation',
  }
];
