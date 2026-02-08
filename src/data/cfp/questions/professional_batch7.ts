/**
 * CFP Professional Conduct Questions - Batch 7
 * Domain 1: Professional Conduct and Regulation (15% of exam)
 * 25 additional questions covering ethics and regulatory topics
 */

import { Question } from '../../../types';

export const CFP_PROFESSIONAL_BATCH7_QUESTIONS: Question[] = [
  // PCR-1: CFP Board Standards
  {
    id: 'CFP-PCR-B7-001',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'CFP Standards',
    subtopic: 'Code of Ethics',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The CFP Board\'s Code of Ethics requires CFP® professionals to:',
    options: [
      'A) Only follow state laws',
      'B) Act with honesty, integrity, competence, and diligence in their professional activities',
      'C) Maximize firm revenue',
      'D) Avoid all risks'
    ],
    correctAnswer: 1,
    explanation: 'The Code of Ethics establishes eight principles: Client-First (act in client\'s best interest), Integrity, Objectivity, Fairness, Professionalism, Competence, Confidentiality, and Diligence. These aren\'t just goals—they\'re enforceable standards. Violations can result in discipline including certification revocation.'
  },
  {
    id: 'CFP-PCR-B7-002',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'CFP Standards',
    subtopic: 'Duties When Providing Financial Advice',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The "Duty of Loyalty" under CFP Board Standards requires that:',
    options: [
      'A) Loyalty to employer comes first',
      'B) Client\'s interests take priority over the CFP® professional\'s or firm\'s interests, with required conflict disclosure and management',
      'C) Clients must be loyal to advisors',
      'D) Loyalty is optional based on circumstances'
    ],
    correctAnswer: 1,
    explanation: 'Duty of Loyalty: place client interests above your own and your firm\'s. This includes: avoiding conflicts (or disclosing and obtaining informed consent), not recommending products for higher commission, and not steering clients to benefit affiliated entities. It\'s part of the fiduciary duty applying when providing financial advice.'
  },
  {
    id: 'CFP-PCR-B7-003',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'CFP Standards',
    subtopic: 'Financial Planning Process Steps',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The CFP Board\'s Practice Standards require financial planning to include:',
    options: [
      'A) Only investment recommendations',
      'B) Understanding circumstances, identifying goals, analyzing, developing recommendations, implementing, and monitoring',
      'C) Annual reviews only',
      'D) Written plans exclusively'
    ],
    correctAnswer: 1,
    explanation: 'The Practice Standards outline the financial planning process: 1) Understanding the client\'s circumstances, 2) Identifying and selecting goals, 3) Analyzing the situation and courses of action, 4) Developing recommendations, 5) Presenting recommendations, 6) Implementing recommendations, and 7) Monitoring progress and updating.'
  },
  // PCR-2: Regulatory Environment
  {
    id: 'CFP-PCR-B7-004',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Regulation',
    subtopic: 'Investment Company Act',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The Investment Company Act of 1940 regulates:',
    options: [
      'A) Individual investment advisers',
      'B) Mutual funds, closed-end funds, UITs, and other pooled investment vehicles that invest in securities',
      'C) Private placements only',
      'D) Broker-dealer sales practices'
    ],
    correctAnswer: 1,
    explanation: 'The \'40 Act regulates investment companies—entities that invest in securities on behalf of shareholders. It requires registration, imposes governance requirements (independent directors), limits leverage and affiliated transactions, and mandates disclosure. Mutual funds, closed-end funds, and ETFs are registered investment companies.'
  },
  {
    id: 'CFP-PCR-B7-005',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Regulation',
    subtopic: 'FINRA Rules',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A FINRA-registered representative recommending securities must ensure:',
    options: [
      'A) Maximum commission',
      'B) Suitability at the time of recommendation, considering customer profile and product characteristics',
      'C) Only proprietary products are sold',
      'D) Minimum documentation'
    ],
    correctAnswer: 1,
    explanation: 'FINRA suitability (Rule 2111) has three components: reasonable-basis (product understanding), customer-specific (appropriate for this customer), and quantitative (not excessive trading). Reg BI enhanced this to "best interest" standard. Representatives must know-your-customer and have reasonable basis for recommendations.'
  },
  {
    id: 'CFP-PCR-B7-006',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Regulation',
    subtopic: 'State Insurance Regulation',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Insurance regulation in the United States is primarily handled by:',
    options: [
      'A) Federal agencies exclusively',
      'B) State insurance departments, with each state having its own commissioner and licensing requirements',
      'C) The SEC',
      'D) FINRA'
    ],
    correctAnswer: 1,
    explanation: 'Insurance is regulated primarily at the state level. Each state has an insurance commissioner/department that licenses agents, approves products and rates, enforces regulations, and handles consumer complaints. The National Association of Insurance Commissioners (NAIC) promotes some uniformity but states remain primary regulators.'
  },
  // PCR-3: Fiduciary Responsibility
  {
    id: 'CFP-PCR-B7-007',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Fiduciary',
    subtopic: 'Duty of Care',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The fiduciary Duty of Care requires CFP® professionals to:',
    options: [
      'A) Guarantee investment returns',
      'B) Act with the care, skill, prudence, and diligence that a prudent professional would use',
      'C) Avoid all risky investments',
      'D) Only recommend proprietary products'
    ],
    correctAnswer: 1,
    explanation: 'Duty of Care (part of fiduciary standard): act as a competent, prudent professional would. This includes: understanding products before recommending, conducting appropriate analysis, maintaining current knowledge, developing recommendations carefully, and not being negligent. It\'s about professional competence and diligence.'
  },
  {
    id: 'CFP-PCR-B7-008',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Fiduciary',
    subtopic: 'Conflicts of Interest',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When a material conflict of interest exists, a CFP® professional must:',
    options: [
      'A) Ignore it if it\'s minimal',
      'B) Disclose it fully, obtain informed consent, and manage it in a way that does not compromise the client\'s interests',
      'C) Terminate the client relationship',
      'D) Only document internally'
    ],
    correctAnswer: 1,
    explanation: 'Conflict management: 1) Avoid if possible, 2) Disclose the nature of the conflict and how addressed, 3) Obtain informed client consent, 4) Manage to prioritize client interests. Some conflicts may be irreconcilable and require declining the engagement. Documentation is essential. Best interest doesn\'t mean no conflicts—it means managed conflicts.'
  },
  {
    id: 'CFP-PCR-B7-009',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Fiduciary',
    subtopic: 'Compensation Disclosure',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'CFP® professionals must disclose compensation information:',
    options: [
      'A) Only if clients ask',
      'B) In clear terms including how they are compensated, sources, and any conflicts compensation creates',
      'C) After services are provided',
      'D) Only for fee-based accounts'
    ],
    correctAnswer: 1,
    explanation: 'Compensation disclosure must be: provided before services, clear (clients understand what and how much), complete (all sources—fees, commissions, referral fees, 12b-1 fees), and explain conflicts (products paying more may create bias). This enables informed client decisions about the relationship.'
  },
  // PCR-4: Practice Management
  {
    id: 'CFP-PCR-B7-010',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Practice Management',
    subtopic: 'Client Agreements',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A financial planning engagement letter should include:',
    options: [
      'A) Only fee information',
      'B) Services provided, compensation, scope, responsibilities of both parties, and termination terms',
      'C) Account performance history',
      'D) Guaranteed outcomes'
    ],
    correctAnswer: 1,
    explanation: 'Engagement letters define the relationship: scope of services (comprehensive or limited), compensation (amount, timing, method), client and planner responsibilities, duration and termination terms, and conflict disclosures. Written agreements prevent misunderstandings and demonstrate professionalism. Required for CFP® financial planning engagements.'
  },
  {
    id: 'CFP-PCR-B7-011',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Practice Management',
    subtopic: 'Record Retention',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Regulatory record retention requirements typically require:',
    options: [
      'A) One year of records',
      'B) Maintaining books and records for specified periods (often 5+ years) in accessible format',
      'C) Only electronic storage',
      'D) Client responsibility for records'
    ],
    correctAnswer: 1,
    explanation: 'Record retention: SEC/state advisers typically 5 years minimum (some records longer). FINRA: 3-6 years depending on record type. Records must be accessible and reproducible. Includes: correspondence, recommendations, account records, complaints, advertising. Proper retention protects against regulatory issues and client disputes.'
  },
  {
    id: 'CFP-PCR-B7-012',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Practice Management',
    subtopic: 'Continuing Education',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'CFP® professionals must complete continuing education requirements that include:',
    options: [
      'A) No ethics requirement',
      'B) 30 hours every two years including at least 2 hours of ethics',
      'C) Only investment-related courses',
      'D) 100 hours annually'
    ],
    correctAnswer: 1,
    explanation: 'CFP® CE: 30 hours every 2-year reporting period, with at least 2 hours in ethics. CE must be reported by specific deadline. Courses must be from CFP Board-approved providers. This ensures ongoing competence in a changing field. Additional licensing (Series, insurance) may have separate CE requirements.'
  },
  // Additional Topics
  {
    id: 'CFP-PCR-B7-013',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'CFP Standards',
    subtopic: 'Objectivity',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The principle of Objectivity requires CFP® professionals to:',
    options: [
      'A) Only provide written recommendations',
      'B) Be intellectually honest and impartial, providing advice based on client needs rather than personal or professional biases',
      'C) Reject all compensation',
      'D) Never express opinions'
    ],
    correctAnswer: 1,
    explanation: 'Objectivity means intellectual honesty and impartiality. Recommendations should be based on client circumstances, not personal opinions about products, company relationships, or compensation incentives. Being objective doesn\'t mean not having views—it means ensuring views don\'t compromise advice quality.'
  },
  {
    id: 'CFP-PCR-B7-014',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Regulation',
    subtopic: 'de Minimis Exemption',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The de minimis exemption for investment adviser registration allows:',
    options: [
      'A) Unlimited clients in any state',
      'B) An adviser to have up to 5 clients in a state during the preceding 12 months without registering there',
      'C) Avoidance of all registration',
      'D) Only institutional clients'
    ],
    correctAnswer: 1,
    explanation: 'De minimis: advisers with an office in one state can generally advise up to 5 clients in another state without registering there (during preceding 12 months). Rules vary by state. Some states have stricter rules or no de minimis. This exemption facilitates interstate advice for advisers with few out-of-state clients.'
  },
  {
    id: 'CFP-PCR-B7-015',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Fiduciary',
    subtopic: 'Principal Trading',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'An adviser engaging in principal trading with client accounts must:',
    options: [
      'A) Proceed without disclosure',
      'B) Disclose the nature of the trade and obtain client consent for each transaction due to the conflict of interest',
      'C) Avoid all trades',
      'D) File with the SEC'
    ],
    correctAnswer: 1,
    explanation: 'Principal trading (adviser buys from or sells to client for its own account) creates significant conflicts—the adviser is on both sides. Advisers Act 206(3) requires disclosure and transaction-by-transaction consent. Many advisers prohibit principal trading entirely. It differs from agency trading (executing client orders through markets).'
  },
  {
    id: 'CFP-PCR-B7-016',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Practice Management',
    subtopic: 'Supervision',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Supervisory responsibilities in financial services firms include:',
    options: [
      'A) Only hiring decisions',
      'B) Establishing procedures, reviewing activities, ensuring compliance, and taking corrective action when problems arise',
      'C) Client meetings only',
      'D) Annual reviews exclusively'
    ],
    correctAnswer: 1,
    explanation: 'Supervision requires: written supervisory procedures, reasonable measures to detect violations, proper delegation (supervisors must be qualified), regular review of activities, and corrective action for problems. Firms are liable for supervisory failures. Strong supervision culture protects clients, firms, and individual professionals.'
  },
  {
    id: 'CFP-PCR-B7-017',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'CFP Standards',
    subtopic: 'Confidentiality Exceptions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Exceptions to CFP® confidentiality requirements include:',
    options: [
      'A) Sharing with any interested party',
      'B) Client consent, legal requirements (subpoenas, reporting laws), and defending against charges of wrongdoing',
      'C) Competitive intelligence',
      'D) Social media sharing'
    ],
    correctAnswer: 1,
    explanation: 'Confidentiality protects client information, with exceptions: 1) Client consent, 2) Legal requirements (court orders, regulatory examinations, mandatory reporting), 3) Defending against allegations (but disclose only what\'s necessary). Even within exceptions, minimize disclosure. Confidentiality continues after the relationship ends.'
  },
  {
    id: 'CFP-PCR-B7-018',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Regulation',
    subtopic: 'Anti-Money Laundering',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Anti-money laundering (AML) regulations require financial firms to:',
    options: [
      'A) Only report large cash deposits',
      'B) Implement customer identification programs, monitor for suspicious activity, and file required reports',
      'C) Avoid foreign clients',
      'D) Guarantee customer identity'
    ],
    correctAnswer: 1,
    explanation: 'AML programs include: Customer Identification Program (CIP) verifying identity, Customer Due Diligence (CDD) understanding the customer, monitoring for suspicious activity, Suspicious Activity Reports (SAR) when warranted, Currency Transaction Reports (CTR) for cash over $10,000, and training. Bank Secrecy Act and USA PATRIOT Act govern requirements.'
  },
  {
    id: 'CFP-PCR-B7-019',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Fiduciary',
    subtopic: 'Best Execution',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The best execution duty for investment advisers means:',
    options: [
      'A) Lowest commission always',
      'B) Seeking the most favorable execution terms reasonably available under the circumstances, considering various factors',
      'C) Only using one broker',
      'D) Fastest execution always'
    ],
    correctAnswer: 1,
    explanation: 'Best execution considers: price, speed, likelihood of execution, research and services, confidentiality, and commission costs together—not just lowest commission. Soft dollar arrangements (receiving research for directing trades) must be disclosed and provide genuine benefit. Advisers should periodically review and compare execution quality.'
  },
  {
    id: 'CFP-PCR-B7-020',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Practice Management',
    subtopic: 'Privacy and Data Security',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Privacy requirements under Regulation S-P require financial institutions to:',
    options: [
      'A) Share information freely',
      'B) Provide privacy notices explaining information sharing practices and allow opt-out of certain sharing',
      'C) Never share any information',
      'D) Only notify after data breaches'
    ],
    correctAnswer: 1,
    explanation: 'Regulation S-P (privacy of consumer financial information): initial and annual privacy notices, opt-out rights for sharing with non-affiliates, and safeguards for customer information. Many states have additional requirements. Data security includes physical, administrative, and technical safeguards. Increasingly, cybersecurity is a regulatory focus.'
  },
  {
    id: 'CFP-PCR-B7-021',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'CFP Standards',
    subtopic: 'Grounds for Discipline',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Grounds for CFP Board discipline include:',
    options: [
      'A) Only criminal convictions',
      'B) Standards violations, criminal conduct, professional misconduct, false statements, and failure to respond to Board inquiries',
      'C) Client complaints only',
      'D) Changing employers'
    ],
    correctAnswer: 1,
    explanation: 'Discipline grounds: Standards of Conduct violations, crimes (felonies, financial crimes, crimes of moral turpitude), professional discipline by other regulators, bankruptcy/civil judgments in certain cases, false statements to Board, failure to respond to inquiries, and unauthorized use of CFP marks. Sanctions range from private censure to permanent revocation.'
  },
  {
    id: 'CFP-PCR-B7-022',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Regulation',
    subtopic: 'Accredited Investor',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'An accredited investor under Regulation D includes individuals with:',
    options: [
      'A) Any income level',
      'B) $200,000 income ($300,000 joint) for past two years with expectation of same, or $1 million net worth excluding primary residence',
      'C) Only institutional investors',
      'D) Securities licenses only'
    ],
    correctAnswer: 1,
    explanation: 'Accredited investors can access private placements. Individual standards: income ($200K/$300K joint for two years, expected to continue) or net worth ($1M excluding primary residence). Entities have their own standards. Recent additions: knowledgeable employees, professionals with certain licenses (Series 7, 65, 82). Accredited status reduces investor protections.'
  },
  {
    id: 'CFP-PCR-B7-023',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Fiduciary',
    subtopic: 'Informed Consent',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Informed consent from clients requires:',
    options: [
      'A) Simply obtaining a signature',
      'B) Ensuring clients understand the information disclosed, its implications, and can ask questions before agreeing',
      'C) Reading a disclosure aloud',
      'D) Email confirmation only'
    ],
    correctAnswer: 1,
    explanation: 'Informed consent means the client truly understands what they\'re consenting to. This requires: clear disclosure in understandable terms, opportunity for questions, verification of understanding, and documentation. A client signing a disclosure they don\'t understand hasn\'t given "informed" consent. Complexity requires extra care.'
  },
  {
    id: 'CFP-PCR-B7-024',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Practice Management',
    subtopic: 'Business Continuity',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A business continuity plan for a financial planning practice should address:',
    options: [
      'A) Only natural disasters',
      'B) How the firm will maintain operations and protect client interests during disruptions including disasters, death, or incapacity',
      'C) Only IT backup',
      'D) Insurance coverage exclusively'
    ],
    correctAnswer: 1,
    explanation: 'Business continuity planning: data backup and recovery, alternative communication methods, key person succession, client notification procedures, regulatory requirements, and testing. For solo practitioners, having an agreement with another planner to serve clients if incapacitated is essential for client protection.'
  },
  {
    id: 'CFP-PCR-B7-025',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'CFP Standards',
    subtopic: 'Professionalism',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The CFP Board\'s Principle of Professionalism requires:',
    options: [
      'A) Only technical competence',
      'B) Behavior that reflects positively on the profession, including civility, respect, and compliance with applicable laws',
      'C) Wearing professional attire',
      'D) Formal communication only'
    ],
    correctAnswer: 1,
    explanation: 'Professionalism means conduct becoming of a professional: treating people with dignity and respect, complying with laws and regulations, cooperating with regulators and CFP Board, and behaving in ways that enhance public trust in the profession. It extends beyond client relationships to all professional interactions.'
  }
];
