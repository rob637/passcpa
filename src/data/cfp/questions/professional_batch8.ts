/**
 * CFP Professional Conduct Questions - Batch 8
 * Domain 1: Professional Conduct and Regulation (15% of exam)
 * 25 additional questions covering ethics and regulation
 */

import { Question } from '../../../types';

export const CFP_PROFESSIONAL_BATCH8_QUESTIONS: Question[] = [
  // PCR-1: Fiduciary Duties
  {
    id: 'CFP-PCR-B8-001',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Fiduciary Duty',
    subtopic: 'Duty of Care',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The fiduciary Duty of Care requires CFP professionals to:',
    options: [
      'A) Simply follow industry standards',
      'B) Act with competence, prudence, and diligence by understanding the client\'s situation before making recommendations',
      'C) Guarantee investment returns',
      'D) Only consider the client\'s stated goals'
    ],
    correctAnswer: 1,
    explanation: 'Duty of Care: act with skill, care, prudence, and diligence. Components: have reasonable basis for recommendations, understand client circumstances and goals, conduct thorough analysis, make suitable recommendations, review periodically. Not about guarantees—about process and diligence. Malpractice may occur when this duty is breached.'
  },
  {
    id: 'CFP-PCR-B8-002',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Fiduciary Duty',
    subtopic: 'Duty of Loyalty',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The Duty of Loyalty prohibits CFP professionals from:',
    options: [
      'A) Earning reasonable compensation',
      'B) Placing their interests ahead of the client\'s interests or benefiting personally at the client\'s expense',
      'C) Recommending proprietary products',
      'D) Charging fees'
    ],
    correctAnswer: 1,
    explanation: 'Duty of Loyalty: place client\'s interests first. Cannot: subordinate client interests to your own or third parties, use client information for personal benefit, receive undisclosed compensation affecting recommendations. Can still earn fair compensation—the duty is about whose interests prevail when conflicts exist.'
  },
  {
    id: 'CFP-PCR-B8-003',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Fiduciary Duty',
    subtopic: 'When Fiduciary Applies',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Under CFP Board Standards, the fiduciary duty at all times applies when:',
    options: [
      'A) Only during formal planning engagements',
      'B) Whenever providing Financial Advice, regardless of whether it is part of a financial planning engagement',
      'C) Only for fee-only advisors',
      'D) Only when managing assets'
    ],
    correctAnswer: 1,
    explanation: 'CFP Board\'s fiduciary duty: applies ALL THE TIME when providing Financial Advice (broad definition including investment, insurance, tax, estate recommendations). Not just during comprehensive planning. This is broader than some regulatory standards (like SEC\'s best interest for brokers). Key distinction for CFP Standards of Conduct.'
  },
  // PCR-2: Client Relationships
  {
    id: 'CFP-PCR-B8-004',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Client Relationships',
    subtopic: 'Client Communication',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Effective communication with clients requires CFP professionals to:',
    options: [
      'A) Use technical language to demonstrate expertise',
      'B) Communicate clearly and in a manner appropriate to the client\'s level of understanding',
      'C) Provide information only in writing',
      'D) Limit explanations to save time'
    ],
    correctAnswer: 1,
    explanation: 'Clear communication: adapt to client\'s knowledge level, avoid unnecessary jargon, confirm understanding, document key points. Clients can\'t make informed decisions if they don\'t understand. Ask questions to gauge comprehension. Written and oral explanations both important. Communication failure is a common source of complaints.'
  },
  {
    id: 'CFP-PCR-B8-005',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Client Relationships',
    subtopic: 'Managing Expectations',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A CFP professional should manage client expectations by:',
    options: [
      'A) Making optimistic projections',
      'B) Being realistic about potential outcomes, discussing uncertainties, and explaining assumptions used in planning',
      'C) Avoiding discussion of risks',
      'D) Promising specific returns'
    ],
    correctAnswer: 1,
    explanation: 'Expectation management: be realistic about outcomes, discuss what could go wrong, explain assumptions (returns, inflation, longevity), update projections when conditions change. Overpromising leads to disappointment and complaints. Better to exceed modest expectations than fail ambitious ones. Document disclosed assumptions.'
  },
  {
    id: 'CFP-PCR-B8-006',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Client Relationships',
    subtopic: 'Referrals',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When referring clients to other professionals, CFP professionals should:',
    options: [
      'A) Refer to anyone who pays the highest referral fee',
      'B) Make referrals based on the client\'s needs and disclose any compensation or relationship with the referral',
      'C) Never make referrals',
      'D) Only refer within their firm'
    ],
    correctAnswer: 1,
    explanation: 'Referral standards: refer when beneficial to client (needs expertise you lack), base on competence not compensation, disclose any referral arrangements, don\'t guarantee the other professional\'s work. Referral fees must be disclosed as potential conflicts. Maintain relationships with quality professionals for referrals.'
  },
  // PCR-3: Conflicts of Interest
  {
    id: 'CFP-PCR-B8-007',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Conflicts of Interest',
    subtopic: 'Identifying Conflicts',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Material conflicts of interest must be identified and disclosed including:',
    options: [
      'A) Only commission arrangements',
      'B) Any circumstances creating potential for the professional\'s interests to diverge from client interests',
      'C) Only written agreements',
      'D) Business relationships between clients'
    ],
    correctAnswer: 1,
    explanation: 'Material conflicts include: compensation arrangements (commissions, fees, revenue sharing), proprietary products, brokerage affiliations, referral compensation, personal trading that affects recommendations, outside business activities, family relationships. Ask: could this influence my recommendation? If yes, it\'s likely a conflict requiring disclosure.'
  },
  {
    id: 'CFP-PCR-B8-008',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Conflicts of Interest',
    subtopic: 'Managing Conflicts',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'After identifying a conflict, CFP professionals must:',
    options: [
      'A) Immediately terminate the client',
      'B) Disclose the conflict, obtain informed consent when appropriate, and manage or eliminate the conflict',
      'C) Ignore minor conflicts',
      'D) Report to regulators only'
    ],
    correctAnswer: 1,
    explanation: 'Conflict management process: identify all material conflicts, disclose to client in clear terms, for significant conflicts obtain informed written consent, implement controls to prevent conflicts from affecting advice, if unmanageable decline to act. Disclosure alone may not be sufficient for serious conflicts.'
  },
  {
    id: 'CFP-PCR-B8-009',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Conflicts of Interest',
    subtopic: 'Proprietary Products',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Recommending proprietary products requires:',
    options: [
      'A) Never recommending them',
      'B) Disclosure of the proprietary relationship, demonstration that the recommendation is in client\'s interest, and consideration of alternatives',
      'C) Automatic client consent',
      'D) Only verbal disclosure'
    ],
    correctAnswer: 1,
    explanation: 'Proprietary product recommendations: disclose the relationship (firm manufactures/earns more), demonstrate the product is in client\'s interest compared to alternatives, don\'t recommend solely because of higher compensation. The product must genuinely serve the client\'s needs—not just profitable for advisor.'
  },
  // PCR-4: Regulation
  {
    id: 'CFP-PCR-B8-010',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Regulation',
    subtopic: 'Investment Advisers Act',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under the Investment Advisers Act of 1940, investment advisers owe clients:',
    options: [
      'A) Only suitability obligations',
      'B) A federal fiduciary duty requiring them to act in clients\' best interests',
      'C) No special duties',
      'D) Duties only for large accounts'
    ],
    correctAnswer: 1,
    explanation: 'Investment Advisers Act fiduciary duty (per SEC v. Capital Gains): advisers have affirmative duty to act in utmost good faith, disclose all material facts, employ reasonable care to avoid misleading clients. This is a federal standard. CFP Board\'s fiduciary duty may exceed regulatory requirements in some areas.'
  },
  {
    id: 'CFP-PCR-B8-011',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Regulation',
    subtopic: 'Regulation Best Interest',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'FINRA\'s Regulation Best Interest (Reg BI) requires broker-dealers to:',
    options: [
      'A) Provide ongoing monitoring',
      'B) Make recommendations in the customer\'s best interest at the time of recommendation without placing their own interests ahead',
      'C) Act as fiduciaries like RIAs',
      'D) Only sell no-load products'
    ],
    correctAnswer: 1,
    explanation: 'Reg BI (2020): broker-dealers must satisfy disclosure, care, conflict of interest, and compliance obligations. Must act in best interest at time of recommendation. Different from ongoing fiduciary—point-in-time standard. No prohibition on commissions. CFP Board standard often exceeds Reg BI requirements. Know which standard applies when.'
  },
  {
    id: 'CFP-PCR-B8-012',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Regulation',
    subtopic: 'Form ADV',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Form ADV Part 2 (the "brochure") must be delivered to clients and includes:',
    options: [
      'A) Client account balances',
      'B) Description of services, fees, conflicts of interest, disciplinary history, and business practices',
      'C) Tax returns',
      'D) Investment recommendations'
    ],
    correctAnswer: 1,
    explanation: 'Form ADV Part 2: firm brochure written in plain English. Includes: services offered, fees and compensation, conflicts of interest, disciplinary information, financial condition, business background. Part 2B (brochure supplement) covers supervised persons. Must deliver initially and offer annually. Key disclosure document for RIAs.'
  },
  // PCR-5: Practice Standards
  {
    id: 'CFP-PCR-B8-013',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-5',
    topic: 'Practice Standards',
    subtopic: 'Documentation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Proper documentation practices for CFP professionals include:',
    options: [
      'A) Only documenting complaints',
      'B) Maintaining records of client information, analysis, recommendations, disclosures, and client communications',
      'C) Verbal records only',
      'D) Destroying files after 3 years'
    ],
    correctAnswer: 1,
    explanation: 'Documentation requirements: client data gathered, analysis performed, recommendations made and rationale, disclosures provided, client acknowledgments, ongoing communications. Supports: regulatory compliance, continuity if planner changes, defense against complaints. Electronic records acceptable. Retention periods vary by regulation (typically 5-7 years minimum).'
  },
  {
    id: 'CFP-PCR-B8-014',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-5',
    topic: 'Practice Standards',
    subtopic: 'Competence',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'If a client\'s needs exceed a CFP professional\'s competence:',
    options: [
      'A) Proceed anyway',
      'B) Refer to or consult with a qualified specialist or decline the engagement',
      'C) Charge higher fees',
      'D) Hide the knowledge gap'
    ],
    correctAnswer: 1,
    explanation: 'Competence standard: don\'t provide services you\'re not qualified to provide. Options: refer to specialist, collaborate with qualified professional, acquire necessary competence through education/training before advising. Acknowledge limitations—clients respect honesty. Build referral network for areas outside expertise.'
  },
  {
    id: 'CFP-PCR-B8-015',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-5',
    topic: 'Practice Standards',
    subtopic: 'Continuing Education',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'CFP certification continuing education requirements include:',
    options: [
      'A) No requirements after certification',
      'B) 30 hours every two years, including 2 hours of CFP Board-approved ethics',
      'C) 100 hours annually',
      'D) Only ethics courses'
    ],
    correctAnswer: 1,
    explanation: 'CFP CE requirements: 30 hours every 2-year reporting period, at least 2 hours must be CFP Board-approved ethics CE. Hours must be in financial planning topics. Self-reported but subject to audit. Purpose: maintain competence, stay current. Meets the ongoing competence requirement of the Standards of Conduct.'
  },
  // Additional Topics
  {
    id: 'CFP-PCR-B8-016',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Fiduciary Duty',
    subtopic: 'Follow Instructions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The Duty to Follow Client Instructions means:',
    options: [
      'A) Always doing what clients demand',
      'B) Following reasonable and lawful client instructions within the scope of engagement',
      'C) Ignoring client preferences',
      'D) Only following written instructions'
    ],
    correctAnswer: 1,
    explanation: 'Duty to Follow Instructions: comply with reasonable, lawful client directives within engagement scope. Can decline: illegal instructions, unreasonable requests outside scope, instructions requiring unethical conduct. If fundamental disagreement, may need to terminate relationship. Balance fiduciary judgment with respecting client autonomy.'
  },
  {
    id: 'CFP-PCR-B8-017',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Client Relationships',
    subtopic: 'Diminished Capacity',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When a CFP professional suspects a client has diminished capacity:',
    options: [
      'A) Continue as normal',
      'B) Protect the client by limiting transactions, contacting trusted contacts, and following firm protocols',
      'C) Immediately terminate relationship',
      'D) Contact law enforcement first'
    ],
    correctAnswer: 1,
    explanation: 'Diminished capacity protocols: document observations, limit risky transactions, contact designated trusted contact if appropriate, follow firm procedures, consult compliance, consider Adult Protective Services if exploitation suspected. Some states allow temporary holds. Protect client while respecting dignity. Challenging balance—plan in advance.'
  },
  {
    id: 'CFP-PCR-B8-018',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Conflicts of Interest',
    subtopic: 'Outside Business Activities',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Outside business activities (OBAs) of CFP professionals:',
    options: [
      'A) Are always prohibited',
      'B) Must be disclosed to clients if they create conflicts and to employers/broker-dealers as required',
      'C) Never need to be reported',
      'D) Only matter for tax purposes'
    ],
    correctAnswer: 1,
    explanation: 'OBAs: business activities outside your primary role. Broker-dealers require advance notice and approval. RIAs must disclose. CFP Board requires disclosure of conflicts. Consider: does OBA create conflicts with clients? Take time from client service? Create appearance problems? Disclose and manage appropriately.'
  },
  {
    id: 'CFP-PCR-B8-019',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Regulation',
    subtopic: 'State Registration',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Investment adviser representatives typically must register with:',
    options: [
      'A) Only federal regulators',
      'B) The state(s) where they have a place of business, following that state\'s qualification requirements',
      'C) Only their employer',
      'D) Only CFP Board'
    ],
    correctAnswer: 1,
    explanation: 'IAR registration: state-by-state for state-registered advisers, states can require registration for SEC RIA personnel too. Must pass exams (Series 65 or 66 typically). Some states accept CFP as substitute for exam. Background checks, disclosure of disciplinary history. Know and follow your state\'s requirements.'
  },
  {
    id: 'CFP-PCR-B8-020',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-5',
    topic: 'Practice Standards',
    subtopic: 'Errors and Omissions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'If a CFP professional discovers an error that harmed a client:',
    options: [
      'A) Hide the error',
      'B) Promptly disclose the error to the client and take appropriate corrective action',
      'C) Wait for the client to notice',
      'D) Only report to regulators'
    ],
    correctAnswer: 1,
    explanation: 'Error handling: disclose promptly to client, take corrective action if possible, document what happened and response, notify E&O carrier if applicable, consider firm compliance notification. Covering up errors magnifies problems. Timely disclosure often preserves relationships and limits liability. Integrity includes owning mistakes.'
  },
  {
    id: 'CFP-PCR-B8-021',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Fiduciary Duty',
    subtopic: 'Prudent Process',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A prudent process for investment recommendations includes:',
    options: [
      'A) Following hunches',
      'B) Defining objectives, evaluating options, documenting rationale, monitoring results, and making adjustments',
      'C) Copying other advisors',
      'D) Relying on past performance only'
    ],
    correctAnswer: 1,
    explanation: 'Prudent investment process: understand client objectives and constraints, analyze options against those criteria, select appropriate investments, document rationale, monitor and review periodically, rebalance and adjust as needed. Process, not outcome, is evaluated. Good faith errors in a prudent process differ from negligence.'
  },
  {
    id: 'CFP-PCR-B8-022',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Client Relationships',
    subtopic: 'Termination',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When terminating a client relationship, a CFP professional should:',
    options: [
      'A) Simply stop responding',
      'B) Provide reasonable notice, assist with transition to another advisor, and return client property',
      'C) Keep all documents',
      'D) Demand final payment first'
    ],
    correctAnswer: 1,
    explanation: 'Proper termination: written notice with effective date, summarize pending matters requiring attention, assist with transition if appropriate, return client documents and property, provide account transfer assistance. Can\'t abandon clients in critical situations. Document reasons for termination. Professional exit maintains reputation.'
  },
  {
    id: 'CFP-PCR-B8-023',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Conflicts of Interest',
    subtopic: 'Gifts and Entertainment',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Accepting gifts and entertainment from product providers:',
    options: [
      'A) Is always acceptable',
      'B) Should be limited and disclosed, avoiding anything that could influence recommendations',
      'C) Is prohibited entirely',
      'D) Only matters if over $1,000'
    ],
    correctAnswer: 1,
    explanation: 'Gifts/entertainment: firms typically have policies limiting value, requiring approval, and documenting. Even modest gifts can create subtle bias. Ask: would I recommend this product without the relationship? Would clients be concerned if they knew? FINRA limits, firm policies, and professional judgment all apply. When in doubt, decline.'
  },
  {
    id: 'CFP-PCR-B8-024',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Regulation',
    subtopic: 'Anti-Money Laundering',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Bank Secrecy Act/Anti-Money Laundering (AML) requirements include:',
    options: [
      'A) Only apply to banks',
      'B) Customer identification programs, monitoring for suspicious activity, and filing reports above thresholds',
      'C) Monthly reporting of all transactions',
      'D) Client notification of all reports'
    ],
    correctAnswer: 1,
    explanation: 'BSA/AML for financial institutions: Customer Identification Program (verify identity), Customer Due Diligence (understand relationship), suspicious activity monitoring and reporting (SAR), Currency Transaction Reports over $10K. Broker-dealers and RIAs have obligations. SARs are confidential—don\'t tip off subjects. Know your firm\'s program.'
  },
  {
    id: 'CFP-PCR-B8-025',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-5',
    topic: 'Practice Standards',
    subtopic: 'Client Privacy',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Protecting client privacy includes:',
    options: [
      'A) Sharing information freely with colleagues',
      'B) Safeguarding client information, limiting access to those with need, and following privacy regulations',
      'C) Publishing success stories',
      'D) Discussing clients at conferences'
    ],
    correctAnswer: 1,
    explanation: 'Privacy protection: Regulation S-P (privacy notices), safeguarding nonpublic personal information, limiting internal access, secure electronic transmission, proper document disposal, cybersecurity measures. Never discuss client information in public, on social media, or with unauthorized parties. Confidentiality is fundamental to trust.'
  }
];
