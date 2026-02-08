/**
 * CFP Professional Conduct Questions - Batch 6
 * Domain 1: Professional Conduct and Regulation (15% of exam)
 * 25 additional questions covering ethics and standards
 */

import { Question } from '../../../types';

export const CFP_PROFESSIONAL_BATCH6_QUESTIONS: Question[] = [
  // PCR-1: CFP Board Standards
  {
    id: 'CFP-PCR-B6-001',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'CFP Standards',
    subtopic: 'Duties to Clients',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A CFP® professional must provide in writing the Duty of Loyalty, Duty of Care, and Duty to Follow Client Instructions:',
    options: [
      'A) Only upon client request',
      'B) Before or at the time of the engagement when providing Financial Advice',
      'C) Only for clients with over $100,000 in assets',
      'D) Within 30 days of the first meeting'
    ],
    correctAnswer: 1,
    explanation: 'CFP Board\'s Code and Standards require written disclosure of fiduciary duties before or at engagement. Clients must understand their CFP® professional\'s loyalty obligation, care standard, and duty to follow instructions. This disclosure establishes the foundation of the fiduciary relationship.'
  },
  {
    id: 'CFP-PCR-B6-002',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'CFP Standards',
    subtopic: 'Material Conflict Disclosure',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When a CFP® professional has a potential conflict of interest:',
    options: [
      'A) The conflict need not be disclosed if immaterial',
      'B) The Material conflict must be disclosed in writing, and informed consent obtained before the engagement or at the time providing the advice',
      'C) Oral disclosure is always sufficient',
      'D) Disclosure is only required if the client asks'
    ],
    correctAnswer: 1,
    explanation: 'Material conflicts require written disclosure AND obtaining informed client consent. Materiality is assessed from the client\'s perspective. This includes conflicts arising from compensation arrangements, business relationships, and interests that could affect judgment or impartiality.'
  },
  {
    id: 'CFP-PCR-B6-003',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'CFP Standards',
    subtopic: 'Financial Planning Definition',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under the CFP Board Standards, "Financial Planning" triggers full fiduciary duty when the engagement:',
    options: [
      'A) Involves any investment recommendation',
      'B) Involves the integrated and comprehensive development and implementation of the client\'s financial goals',
      'C) Only involves retirement planning',
      'D) Includes a written plan document only'
    ],
    correctAnswer: 1,
    explanation: 'Financial Planning as defined by CFP Board involves integrating relevant financial planning elements to develop strategies addressing the client\'s goals and circumstances comprehensively. This broader engagement triggers specific disclosure requirements and the full scope of fiduciary duties throughout.'
  },
  // PCR-2: Regulatory Framework
  {
    id: 'CFP-PCR-B6-004',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Regulation',
    subtopic: 'State Registration',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Investment adviser representatives must typically register in:',
    options: [
      'A) Only the state where their principal office is located',
      'B) Each state where they have a place of business or meet with more than 5 retail clients in a 12-month period',
      'C) Only with the SEC',
      'D) No state registration is required for RIAs'
    ],
    correctAnswer: 1,
    explanation: 'IAR registration follows state-specific rules. Generally, registration is required in states where the IAR has a place of business and may be required after meeting a de minimis threshold (often 5 clients) in other states. Multi-state IARs may need multiple registrations.'
  },
  {
    id: 'CFP-PCR-B6-005',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Regulation',
    subtopic: 'Form CRS',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Form CRS (Client Relationship Summary) must include:',
    options: [
      'A) Only fee information',
      'B) Relationship types, fees, conflicts, disciplinary history, and key questions for clients to ask',
      'C) Detailed investment recommendations',
      'D) Tax advice'
    ],
    correctAnswer: 1,
    explanation: 'The SEC\'s Form CRS (2-page max for each registration type) covers: services offered, fees and costs, conflicts of interest, legal standards, disciplinary history, and conversation starters for clients. It must be delivered to retail investors at or before the first recommendation and updated regularly.'
  },
  {
    id: 'CFP-PCR-B6-006',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Regulation',
    subtopic: 'Custody Rule',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Under the SEC\'s custody rule, an investment adviser with custody of client assets must:',
    options: [
      'A) Have no additional requirements if a qualified custodian is used',
      'B) Maintain assets with a qualified custodian, provide quarterly statements, and undergo surprise annual examinations',
      'C) Only report custody annually',
      'D) Obtain client permission each time funds are accessed'
    ],
    correctAnswer: 1,
    explanation: 'Custody (holding assets or having authority to withdraw) triggers major compliance requirements: qualified custodian use, quarterly statements to clients, surprise examinations by independent public accountants. Exceptions exist for certain limited powers (fee deduction authority with safeguards).'
  },
  // PCR-3: Ethics
  {
    id: 'CFP-PCR-B6-007',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Ethics',
    subtopic: 'Borrowing from Clients',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A CFP® professional borrowing money from a client:',
    options: [
      'A) Is always prohibited',
      'B) Is prohibited unless the client is in the business of lending or is a family member (with specific conditions)',
      'C) Is permitted with written consent only',
      'D) Is allowed with any client under $10,000'
    ],
    correctAnswer: 1,
    explanation: 'Borrowing from clients creates significant conflict of interest. It\'s prohibited unless: the client is a lending institution in the business of lending (fair market terms), or the client is an immediate family member. Even then, conflicts must be managed. This protects clients from potential exploitation.'
  },
  {
    id: 'CFP-PCR-B6-008',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Ethics',
    subtopic: 'Gifts and Entertainment',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Accepting gifts from product sponsors:',
    options: [
      'A) Is never permitted',
      'B) May create conflicts of interest that must be disclosed and managed to ensure the gift doesn\'t influence recommendations',
      'C) Is permitted without disclosure',
      'D) Is only an issue for gifts over $1,000'
    ],
    correctAnswer: 1,
    explanation: 'Gifts and entertainment from product sponsors create potential bias toward recommending their products. CFP® professionals must ensure gifts don\'t improperly influence recommendations and may need to disclose material gifts as conflicts. Firms often have policies limiting gifts and requiring reporting.'
  },
  {
    id: 'CFP-PCR-B6-009',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Ethics',
    subtopic: 'Outside Business Activities',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When a CFP® professional engages in outside business activities:',
    options: [
      'A) No disclosure is needed if unrelated to financial planning',
      'B) They must manage potential conflicts and may need to disclose when the activities could affect their duties or create conflicts',
      'C) They must disclose only to the CFP Board',
      'D) They are automatically prohibited from CFP® practice'
    ],
    correctAnswer: 1,
    explanation: 'Outside business activities can create conflicts (time, loyalty, competing interests) or confusion about professional capacity. Broker-dealers require prior approval; advisers must assess conflicts and disclose when material. Activities that could impair duties or mislead clients require attention.'
  },
  // Additional Topics
  {
    id: 'CFP-PCR-B6-010',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'CFP Standards',
    subtopic: 'Selecting Products',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When recommending financial products, a CFP® professional must select products:',
    options: [
      'A) Only from their proprietary offerings',
      'B) That are in the client\'s best interest based on reasonable investigation into appropriateness given client circumstances',
      'C) With the lowest fees available',
      'D) Only from pre-approved lists'
    ],
    correctAnswer: 1,
    explanation: 'The Duty of Care requires reasonable basis for recommendations through investigation and analysis. Products must be suitable for the specific client\'s situation. While cost matters, best interest considers multiple factors including goals, risk tolerance, and preferences.'
  },
  {
    id: 'CFP-PCR-B6-011',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Regulation',
    subtopic: 'Anti-Money Laundering',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Anti-money laundering requirements for financial advisers include:',
    options: [
      'A) Only reporting suspicious activity',
      'B) Customer identification programs, monitoring for suspicious activity, and filing Suspicious Activity Reports when appropriate',
      'C) Ignoring cash transactions',
      'D) Reporting all transactions over $1,000'
    ],
    correctAnswer: 1,
    explanation: 'AML programs require: Customer Identification Program (CIP), Customer Due Diligence (CDD), ongoing monitoring, suspicious activity reporting (SARs), and BSA compliance. Financial advisers must identify customers, verify identity, and be alert to red flags like unexplained wealth or unusual transactions.'
  },
  {
    id: 'CFP-PCR-B6-012',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Ethics',
    subtopic: 'Referral Arrangements',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When receiving compensation for client referrals:',
    options: [
      'A) No disclosure is required',
      'B) The arrangement must be disclosed as a conflict, fees cannot be unreasonable, and payments must comply with regulations',
      'C) Only the referring party needs to know',
      'D) Referral fees are prohibited'
    ],
    correctAnswer: 1,
    explanation: 'Referral fees create conflicts of interest—advisers may be motivated by payment rather than client fit. Disclosure is required. Under the SEC\'s marketing rule, referral arrangements must be disclosed, payments documented, and arrangements must not create unreasonable compensation or materially mislead investors.'
  },
  {
    id: 'CFP-PCR-B6-013',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'CFP Standards',
    subtopic: 'Financial Planning Process',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The CFP Board\'s Financial Planning Practice Standards require the financial planning process to:',
    options: [
      'A) Be completed in a single meeting',
      'B) Include understanding the client\'s circumstances, identifying goals, analyzing information, developing recommendations, implementing, and monitoring',
      'C) Focus only on investments',
      'D) Skip implementation if the client prefers'
    ],
    correctAnswer: 1,
    explanation: 'The Practice Standards outline the financial planning process: 1) Understanding circumstances, 2) Identifying goals, 3) Analyzing current course, 4) Developing recommendations, 5) Presenting recommendations, 6) Implementing, 7) Monitoring. Scope determines which steps are applicable.'
  },
  {
    id: 'CFP-PCR-B6-014',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Regulation',
    subtopic: 'Books and Records',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Investment advisers must generally retain certain books and records for:',
    options: [
      'A) 1 year',
      'B) At least 5 years from the end of the fiscal year (some records longer)',
      'C) 10 years for all records',
      'D) No minimum requirement'
    ],
    correctAnswer: 1,
    explanation: 'SEC Rule 204-2 requires most records be kept 5 years (first 2 in an accessible place). Some partnership records require 6 years; written agreements and advertising must be kept for the relationship plus 5 years. Records must be maintained in a way that allows SEC examination.'
  },
  {
    id: 'CFP-PCR-B6-015',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Ethics',
    subtopic: 'Continuing Education',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'CFP® professionals must complete continuing education:',
    options: [
      'A) Only if requested by the CFP Board',
      'B) Every two years, including ethics requirements, to maintain competence and certification',
      'C) Once after initial certification',
      'D) Only when changing employers'
    ],
    correctAnswer: 1,
    explanation: 'CFP® CE: 30 hours per 2-year cycle, including 2 hours of ethics (CFP Board\'s Standards). This ensures ongoing competence in a changing field. CE must relate to financial planning topics. CFP Board verifies compliance and may audit. Failure to complete CE can result in suspension.'
  },
  {
    id: 'CFP-PCR-B6-016',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'CFP Standards',
    subtopic: 'Terminating Engagement',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When terminating a client engagement, a CFP® professional:',
    options: [
      'A) Has no particular obligations',
      'B) Should document the termination, return client property, and facilitate an orderly transition',
      'C) Must provide referrals to other advisers',
      'D) Cannot terminate without CFP Board approval'
    ],
    correctAnswer: 1,
    explanation: 'Termination should be professional: notify client, return documents and property, assist with transition, and maintain records. Avoid abandoning clients abruptly during critical periods. Termination can be mutual or initiated by either party based on engagement terms.'
  },
  {
    id: 'CFP-PCR-B6-017',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Regulation',
    subtopic: 'Pay-to-Play',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The SEC\'s "pay-to-play" rule (Rule 206(4)-5) restricts:',
    options: [
      'A) All political contributions',
      'B) Investment advisers from receiving compensation for advising government entities within 2 years of making political contributions to officials who can influence the selection',
      'C) Marketing to government clients',
      'D) Contributions to federal candidates only'
    ],
    correctAnswer: 1,
    explanation: 'Pay-to-play rules prevent advisers from using political contributions to secure government contracts. A covered contribution triggers a 2-year "time out" from receiving compensation for advising that government entity. De minimis exceptions exist for contributions under $350/$150 depending on whether the giver can vote for the official.'
  },
  {
    id: 'CFP-PCR-B6-018',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Ethics',
    subtopic: 'Marketing and Advertising',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under the SEC\'s marketing rule for investment advisers, testimonials and endorsements:',
    options: [
      'A) Are completely prohibited',
      'B) Are permitted with required disclosures, including compensation arrangements and conflicts of interest',
      'C) Need no disclosure',
      'D) Only apply to social media'
    ],
    correctAnswer: 1,
    explanation: 'The SEC\'s amended marketing rule (2022) permits testimonials and endorsements with proper disclosures: whether the promoter is a client, compensation paid, conflicts of interest, and material facts. Materiality is key. Advisers must have reasonable basis to believe testimonials won\'t be misleading.'
  },
  {
    id: 'CFP-PCR-B6-019',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'CFP Standards',
    subtopic: 'Documenting Recommendations',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Documentation of financial planning recommendations:',
    options: [
      'A) Is optional',
      'B) Should be sufficient to support the basis for recommendations and demonstrate compliance with standards',
      'C) Is only required for clients over $500,000',
      'D) Must follow a specific CFP Board format'
    ],
    correctAnswer: 1,
    explanation: 'Documentation demonstrates the basis for recommendations, compliance with duties, and the planning process followed. While no specific format is required, records should be sufficient to reconstruct the analysis and show the recommendation was in the client\'s best interest.'
  },
  {
    id: 'CFP-PCR-B6-020',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Regulation',
    subtopic: 'Proxy Voting',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When an investment adviser has proxy voting authority:',
    options: [
      'A) Proxies need not be voted',
      'B) The adviser must adopt and disclose policies, vote in clients\' best interests, and maintain records',
      'C) Only management recommendations can be followed',
      'D) Clients cannot direct voting'
    ],
    correctAnswer: 1,
    explanation: 'Advisers with proxy voting authority must: adopt written policies (disclosed to clients), vote in clients\' best interests, describe policies upon request, disclose how clients can obtain voting records, and maintain voting records for 5 years. Conflicts (e.g., voting on affiliated issuers) must be addressed.'
  },
  {
    id: 'CFP-PCR-B6-021',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Ethics',
    subtopic: 'Professional Liability',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Errors and omissions (E&O) insurance for financial planners:',
    options: [
      'A) Is required by the CFP Board',
      'B) Protects against claims of negligence, errors, or omissions in professional services though not specifically required by CFP Board',
      'C) Covers intentional fraud',
      'D) Is only for attorneys'
    ],
    correctAnswer: 1,
    explanation: 'E&O insurance covers professional liability claims—negligent advice, errors in analysis, omissions in recommendations. While CFP Board doesn\'t require it, many employers and professional associations do. It doesn\'t cover intentional misconduct. Coverage limits and exclusions vary by policy.'
  },
  {
    id: 'CFP-PCR-B6-022',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'CFP Standards',
    subtopic: 'Duty to Inform',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A CFP® professional\'s duty to inform clients includes:',
    options: [
      'A) Providing information only when requested',
      'B) Communicating material information needed for informed decision-making and keeping clients reasonably informed',
      'C) Daily updates on all account holdings',
      'D) Information about all competitors'
    ],
    correctAnswer: 1,
    explanation: 'The duty to inform means providing information relevant to decision-making: scope of engagement, material changes, risks, costs, and progress toward goals. Communication frequency and method should match engagement terms and client preferences. Clients need adequate information to make informed choices.'
  },
  {
    id: 'CFP-PCR-B6-023',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Regulation',
    subtopic: 'Exam and Registration',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The Series 65 exam:',
    options: [
      'A) Is the CFP® exam',
      'B) Is a state qualification exam for Investment Adviser Representatives, covering regulations, ethics, and investment knowledge',
      'C) Only covers insurance',
      'D) Is optional for all advisers'
    ],
    correctAnswer: 1,
    explanation: 'Series 65 (Uniform Investment Adviser Law Exam) qualifies individuals as IARs. It covers federal/state laws, ethics, economics, investment analysis, and investment strategies. FINRA administered. Passing Series 66 (combined with Series 7) is an alternative. CFP® certificants may have exemptions in some states.'
  },
  {
    id: 'CFP-PCR-B6-024',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Ethics',
    subtopic: 'Reporting Requirements',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'CFP® professionals must report to CFP Board:',
    options: [
      'A) Only felony convictions',
      'B) Criminal and regulatory matters including felonies, financial crimes, and certain civil judicial or regulatory actions',
      'C) Only if found guilty',
      'D) Changes in employment only'
    ],
    correctAnswer: 1,
    explanation: 'CFP Board requires disclosure of criminal matters (not just convictions), civil actions, regulatory proceedings, bankruptcy, customer complaints, and other matters bearing on fitness. Requirements include timing obligations (often 30 days). Failure to report is itself a violation.'
  },
  {
    id: 'CFP-PCR-B6-025',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'CFP Standards',
    subtopic: 'Firm Supervision',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A CFP® professional with supervisory responsibility:',
    options: [
      'A) Has no special obligations',
      'B) Must make reasonable efforts to ensure supervised persons comply with applicable standards and may be sanctioned for supervisory failures',
      'C) Is only responsible for their own conduct',
      'D) Can delegate all compliance responsibilities'
    ],
    correctAnswer: 1,
    explanation: 'Supervisors must establish systems, provide training, and monitor compliance. They can be disciplined for failing to reasonably supervise—even if they didn\'t participate in misconduct. This creates accountability at the supervisory level and encourages proper compliance infrastructure.'
  }
];
