/**
 * CFP Professional Conduct Questions - Batch 9
 * Domain 1: Professional Conduct and Regulation (15% of exam)
 * 25 additional questions
 */

import { Question } from '../../../types';

export const CFP_PROFESSIONAL_BATCH9_QUESTIONS: Question[] = [
  // PCR-1: Standards of Conduct
  {
    id: 'CFP-PCR-B9-001',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Standards of Conduct',
    subtopic: 'Acting in Client Interest',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When client preferences conflict with what a CFP professional believes is objectively best, the planner should:',
    options: [
      'A) Override the client\'s wishes',
      'B) Discuss the concerns, ensure client understands implications, and if legal, ultimately respect client\'s informed decision',
      'C) Refuse to provide any service',
      'D) Document only the recommendation'
    ],
    correctAnswer: 1,
    explanation: 'Client autonomy with informed consent: CFP professionals provide advice, but competent clients make decisions. Process: clearly explain recommendation and rationale, discuss risks of client\'s preference, ensure understanding. If legal and client insists with full understanding, respect decision. Document the discussion. Only refuse if clearly illegal or against Standards.'
  },
  {
    id: 'CFP-PCR-B9-002',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Standards of Conduct',
    subtopic: 'Prudent Care',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The duty of prudent care for a CFP professional includes:',
    options: [
      'A) Guaranteeing investment results',
      'B) Acting with skill, diligence, and good judgment that a professional would use under similar circumstances',
      'C) Always avoiding all risk',
      'D) Matching industry average performance'
    ],
    correctAnswer: 1,
    explanation: 'Duty of care: act with skill, diligence, competence, and good judgment. Not perfection—reasonable professional standard. Consider: expertise, thorough analysis, appropriate recommendations, proper follow-through. Process matters—documented, thoughtful approach. Bad outcome doesn\'t mean breach if process was sound. Continuing education maintains competence.'
  },
  {
    id: 'CFP-PCR-B9-003',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Standards of Conduct',
    subtopic: 'Integrity',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Acting with integrity as a CFP professional means:',
    options: [
      'A) Maximizing profits',
      'B) Being honest and ethical in all professional dealings, avoiding misleading conduct',
      'C) Strict rule following only',
      'D) Never making mistakes'
    ],
    correctAnswer: 1,
    explanation: 'Integrity: core principle underlying all conduct. Includes: honesty, candor, transparency, keeping promises. No misleading communications, omissions of material facts, or half-truths. Applies: client interactions, dealings with other professionals, public communications. Foundation of trust. When in doubt about whether something is ethical, it probably isn\'t.'
  },
  // PCR-2: Fiduciary Duty
  {
    id: 'CFP-PCR-B9-004',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Fiduciary Duty',
    subtopic: 'Full Disclosure',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Material facts that must be disclosed to clients include:',
    options: [
      'A) Only compensation',
      'B) Conflicts of interest, compensation arrangements, material limitations, and any information that could affect client decisions',
      'C) Only positive information',
      'D) Competitor pricing'
    ],
    correctAnswer: 1,
    explanation: 'Material disclosure required: conflicts of interest (all types), compensation (all sources), limitations of services, relationship with third parties, any factor that could affect client\'s decision or the advice. Written disclosure preferred. Ongoing duty—disclose new conflicts as they arise. Client must understand to give informed consent. Err on side of over-disclosure.'
  },
  {
    id: 'CFP-PCR-B9-005',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Fiduciary Duty',
    subtopic: 'Undivided Loyalty',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The duty of loyalty is potentially violated when:',
    options: [
      'A) Recommending lower-cost options',
      'B) A planner steers clients to products that benefit the planner without disclosure or when better alternatives exist for the client',
      'C) Referring to specialists',
      'D) Charging reasonable fees'
    ],
    correctAnswer: 1,
    explanation: 'Loyalty breaches: recommending products primarily for compensation benefit, steering to affiliated entities without disclosure, using client opportunities for personal gain, competing directly with client. Not necessarily prohibited—requires disclosure and client consent. Conflicts managed through: avoid if possible, disclose fully, obtain informed consent. Prioritize client interest.'
  },
  {
    id: 'CFP-PCR-B9-006',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Fiduciary Duty',
    subtopic: 'Confidentiality Exceptions',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A CFP professional may disclose confidential client information without consent when:',
    options: [
      'A) Asked by other clients',
      'B) Required by law, subpoena, or to prevent reasonably certain and imminent harm',
      'C) It would help close a sale',
      'D) Requested by media'
    ],
    correctAnswer: 1,
    explanation: 'Confidentiality exceptions: legal requirement (subpoena, court order, regulatory investigation), prevent reasonably certain serious bodily harm, defend against claims by client, with explicit informed consent. Must be proportionate—disclose only what\'s necessary. Document reason for disclosure. Gray areas: suspected elder abuse (may have reporting obligation). Seek guidance in unclear situations.'
  },
  // PCR-3: Regulation
  {
    id: 'CFP-PCR-B9-007',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Regulation',
    subtopic: 'Broker-Dealer Supervision',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Broker-dealer supervision requirements include:',
    options: [
      'A) No supervisory obligations',
      'B) Written supervisory procedures, designated supervisors, transaction review, and compliance monitoring',
      'C) Only annual reviews',
      'D) Self-certification'
    ],
    correctAnswer: 1,
    explanation: 'BD supervision: FINRA Rule 3110 requires written supervisory procedures (WSPs), designated supervisors for each office, review of transactions/correspondence, branch office oversight. Principal review of trades. Compliance staffing requirements. Failure is serious violation. Affects CFPs in BD environment—must work within supervisory structure, escalate issues appropriately.'
  },
  {
    id: 'CFP-PCR-B9-008',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Regulation',
    subtopic: 'State Securities Regulation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Investment advisers with under $100 million in regulatory AUM typically register with:',
    options: [
      'A) SEC only',
      'B) Their state securities regulator(s), unless an exception applies',
      'C) FINRA only',
      'D) No registration required'
    ],
    correctAnswer: 1,
    explanation: 'IA registration: <$100M AUM generally state-registered (exceptions: Wyoming-only, certain advisers). $100M-$110M can choose. >$110M must be SEC-registered. Multi-state advisers with 15+ states can switch to SEC. States enforce via state securities administrators. Know your registration status and applicable state requirements. CFPs must maintain required registrations.'
  },
  {
    id: 'CFP-PCR-B9-009',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Regulation',
    subtopic: 'ERISA Fiduciary',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Providing investment advice to ERISA retirement plans creates:',
    options: [
      'A) No special obligations',
      'B) ERISA fiduciary status with strict prohibited transaction rules and personal liability potential',
      'C) Only disclosure duties',
      'D) Exempt status'
    ],
    correctAnswer: 1,
    explanation: 'ERISA fiduciary: triggered when providing investment advice for compensation to retirement plans. Strict duties: prudence, loyalty, diversification. Prohibited transactions: self-dealing, conflicts. Personal liability possible. DOL fiduciary rule (versions have changed). PTEs (prohibited transaction exemptions) allow some activities. Higher standard than general investment advice. Know when ERISA applies.'
  },
  // PCR-4: Practice Standards
  {
    id: 'CFP-PCR-B9-010',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Practice Standards',
    subtopic: 'Informed Consent',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Obtaining informed consent requires:',
    options: [
      'A) A signed form only',
      'B) Ensuring client understands the information, implications, and has opportunity to ask questions before agreeing',
      'C) Verbal agreement only',
      'D) Witnessed signatures'
    ],
    correctAnswer: 1,
    explanation: 'Informed consent: more than signature. Client must: receive material information, understand it (confirmed), have opportunity for questions, freely agree. Planner must: disclose in understandable language, confirm understanding, document. For complex matters, allow reflection time. Consent to one thing isn\'t consent to all. Ongoing as new issues arise. Process, not just paperwork.'
  },
  {
    id: 'CFP-PCR-B9-011',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Practice Standards',
    subtopic: 'Implementation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When implementing financial planning recommendations:',
    options: [
      'A) All implementation is the client\'s responsibility',
      'B) The planner should coordinate and assist as mutually agreed, tracking progress on recommendations',
      'C) Implementation always optional',
      'D) Only products can be implemented'
    ],
    correctAnswer: 1,
    explanation: 'Implementation duties: depends on engagement scope. If agreed: select products/services, coordinate with other professionals, submit applications, complete paperwork. Track: what\'s implemented, what\'s pending, who\'s responsible. Document recommendations, implementation status, reasons for changes. Some engagements advice-only—client implements. Clarify expectations upfront.'
  },
  {
    id: 'CFP-PCR-B9-012',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Practice Standards',
    subtopic: 'Updating Plans',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A financial plan should be updated when:',
    options: [
      'A) Only annually',
      'B) Material client changes occur, significant market shifts happen, or laws affecting the plan change',
      'C) Only at client request',
      'D) Never—original plan stands'
    ],
    correctAnswer: 1,
    explanation: 'Plan update triggers: material life changes (marriage, divorce, job change, inheritance, health issue), significant market movements affecting strategy, law changes (tax law, Social Security), progress review indicates adjustment needed. Proactive monitoring per engagement. Not necessarily comprehensive redo—may be targeted updates. Document changes and rationale.'
  },
  // Additional Topics
  {
    id: 'CFP-PCR-B9-013',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Standards of Conduct',
    subtopic: 'Professionalism',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'CFP Board\'s Code of Ethics includes a duty of professionalism which requires:',
    options: [
      'A) Always agreeing with clients',
      'B) Acting with dignity, meeting ethical and legal standards, and upholding the profession\'s reputation',
      'C) Maximizing revenue',
      'D) Avoiding all client contact'
    ],
    correctAnswer: 1,
    explanation: 'Professionalism: treat clients, colleagues, and regulators with respect. Uphold profession\'s reputation. Meet all applicable ethical standards and laws. Continuing education requirement. Don\'t engage in conduct reflecting negatively on profession. Cooperative with CFP Board investigations. Model behavior for others. Extends beyond client interactions to all professional conduct.'
  },
  {
    id: 'CFP-PCR-B9-014',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Fiduciary Duty',
    subtopic: 'Managing Conflicts',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The hierarchy for managing conflicts of interest is:',
    options: [
      'A) Disclose, avoid, consent',
      'B) Avoid if practicable; if not, fully disclose and obtain informed consent; manage ongoing',
      'C) Ignore if minor',
      'D) Consent, disclose, avoid'
    ],
    correctAnswer: 1,
    explanation: 'Conflict management hierarchy: 1) Avoid—eliminate conflict if practicable. 2) If unavoidable—full disclosure of nature, extent, and potential impact. 3) Obtain informed client consent. 4) Manage—mitigate impact, monitor ongoing. Some conflicts cannot be managed even with consent—too severe. Document all steps. Prevention best—design business to minimize conflicts.'
  },
  {
    id: 'CFP-PCR-B9-015',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Regulation',
    subtopic: 'Anti-Money Laundering',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Financial institutions\' AML programs must include:',
    options: [
      'A) Only customer identification',
      'B) Customer identification, suspicious activity monitoring and reporting, employee training, and independent testing',
      'C) Portfolio performance tracking',
      'D) Marketing programs'
    ],
    correctAnswer: 1,
    explanation: 'AML program requirements (Bank Secrecy Act/USA PATRIOT Act): Customer Identification Program (CIP—verify identity), Customer Due Diligence (CDD—understand relationships), Suspicious Activity Reports (SARs—file when warranted), employee training, independent testing, designated compliance officer. CTRs for cash >$10K. CFPs at covered institutions must understand and follow AML obligations.'
  },
  {
    id: 'CFP-PCR-B9-016',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Practice Standards',
    subtopic: 'Presenting Recommendations',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Recommendations should be presented to clients:',
    options: [
      'A) With technical jargon to demonstrate expertise',
      'B) In clear, understandable language appropriate to client\'s knowledge level, with opportunity for questions',
      'C) Only in writing',
      'D) Without alternatives'
    ],
    correctAnswer: 1,
    explanation: 'Presentation best practices: adapt to client\'s communication style, avoid jargon (or explain it), use visuals if helpful, allow questions, confirm understanding. Present rationale—why recommendation fits goals. Written summary often useful. Alternative approaches may be discussed. Client should have time to consider. Goal: informed decision-making, not just acceptance.'
  },
  {
    id: 'CFP-PCR-B9-017',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Standards of Conduct',
    subtopic: 'Competence',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A CFP professional lacking expertise in a specific area should:',
    options: [
      'A) Decline all such engagements',
      'B) Gain competence, refer appropriately, or associate with qualified specialists to serve the client',
      'C) Proceed anyway',
      'D) Only provide general advice'
    ],
    correctAnswer: 1,
    explanation: 'Competence gaps: options include gaining expertise (education, research), referring to specialists, collaborative approach with other professionals. Don\'t practice beyond competence without support. Continuing education addresses many gaps over time. Complex areas (estate law, tax): work with attorneys, CPAs. Maintain competence through ongoing education. Know limitations.'
  },
  {
    id: 'CFP-PCR-B9-018',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Fiduciary Duty',
    subtopic: 'Investment Selection',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When selecting investments for clients, fiduciary duty requires:',
    options: [
      'A) Choosing best-performing funds',
      'B) Prudent selection considering cost, risk, fit with client objectives, and tax efficiency among other factors',
      'C) Proprietary products only',
      'D) Avoiding all risk'
    ],
    correctAnswer: 1,
    explanation: 'Investment fiduciary standards: prudent process more important than specific outcome. Consider: client\'s goals, risk tolerance, time horizon, overall portfolio, costs (expense ratios, loads), tax efficiency, diversification. No requirement to pick "best" performer—that\'s not knowable. Reasonable selection with documented rationale. Monitor ongoing. Compare similar products fairly.'
  },
  {
    id: 'CFP-PCR-B9-019',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Regulation',
    subtopic: 'Advertising Rules',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Investment adviser advertising regulations require:',
    options: [
      'A) No restrictions',
      'B) No false or misleading statements, specific rules on testimonials/endorsements, and performance presentation standards',
      'C) Only SEC approval',
      'D) Competitor comparisons'
    ],
    correctAnswer: 1,
    explanation: 'IA advertising rules (Marketing Rule): no untrue statements or omissions, testimonials allowed with disclosures, performance must not be misleading, specific requirements for hypothetical and composite performance. CFP Board also regulates—no misleading claims about CFP certification. Social media is advertising. Substantiate claims. Pre-approval often required at firms.'
  },
  {
    id: 'CFP-PCR-B9-020',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Practice Standards',
    subtopic: 'Documentation',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Proper documentation of client engagements protects:',
    options: [
      'A) Only the planner',
      'B) Both client and planner by creating a record of agreements, recommendations, disclosures, and decisions',
      'C) Only if litigation occurs',
      'D) No one—it\'s just paperwork'
    ],
    correctAnswer: 1,
    explanation: 'Documentation benefits: client reference (what was agreed, why), planner protection (demonstrate compliance), regulatory evidence. Document: engagement terms, client information, analysis, recommendations, disclosures, client decisions, implementation, updates. Retention per requirements (typically 5+ years). Contemporaneous notes most credible. "If it\'s not documented, it didn\'t happen."'
  },
  {
    id: 'CFP-PCR-B9-021',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Standards of Conduct',
    subtopic: 'Fairness',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Treating clients fairly as a CFP professional means:',
    options: [
      'A) Identical service to all',
      'B) Reasonable and not taking advantage of client\'s lack of knowledge, age, or circumstances',
      'C) Equal outcomes',
      'D) Lowest possible fees'
    ],
    correctAnswer: 1,
    explanation: 'Fairness duty: don\'t exploit client vulnerabilities (limited knowledge, age-related concerns, emotional state). Act reasonably in all aspects of relationship. Doesn\'t mean identical service—may charge/serve differently based on client needs. But disclosures must be fair, advice appropriate, fees reasonable. Enhanced care for vulnerable clients. Fair dealing with colleagues too.'
  },
  {
    id: 'CFP-PCR-B9-022',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Fiduciary Duty',
    subtopic: 'Cost Transparency',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Fiduciary duty regarding costs requires disclosure of:',
    options: [
      'A) Only advisory fees',
      'B) All material costs including advisory fees, product costs, commissions, platform fees, and transaction costs',
      'C) Only costs over $1,000',
      'D) Costs are never disclosed'
    ],
    correctAnswer: 1,
    explanation: 'Cost disclosure: client must understand total cost. Includes: advisory fees (how calculated), fund expense ratios, commissions, loads, platform/custody fees, transaction costs, any revenue sharing. Aggregate impact on returns. Comparison of cost differences between alternatives. Written disclosure, confirmed understanding. Hiding costs = breach of fiduciary duty.'
  },
  {
    id: 'CFP-PCR-B9-023',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Regulation',
    subtopic: 'Privacy Regulation',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Regulation S-P requires financial institutions to:',
    options: [
      'A) Share information freely',
      'B) Provide privacy notices explaining information practices and give customers opt-out rights for certain sharing',
      'C) Sell data to third parties',
      'D) Delete all records'
    ],
    correctAnswer: 1,
    explanation: 'Reg S-P (Privacy of Consumer Financial Information): initial and annual privacy notices required. Must describe: what information collected, how used, how protected. Customer opt-out rights for sharing with non-affiliated third parties. Safeguards rule: protect customer records. Applies to SEC-registered advisers, BDs. GLBA is underlying statute. State laws may be stricter.'
  },
  {
    id: 'CFP-PCR-B9-024',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Practice Standards',
    subtopic: 'Referring Clients',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When referring clients to other professionals, a CFP certificant should:',
    options: [
      'A) Never refer',
      'B) Refer to competent professionals, disclose any compensation for referrals, and follow up as appropriate',
      'C) Refer only to those paying referral fees',
      'D) Guarantee others\' work'
    ],
    correctAnswer: 1,
    explanation: 'Referral best practices: refer to qualified, competent professionals. Disclose: any referral compensation received, conflicts of interest. Consider: reputation, expertise, cost. Follow up on critical matters. Not responsible for others\' work but should monitor for client\'s benefit. Referral relationships should be based on quality, not just compensation. Document referrals made.'
  },
  {
    id: 'CFP-PCR-B9-025',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Standards of Conduct',
    subtopic: 'Diligence',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The duty of diligence requires a CFP professional to:',
    options: [
      'A) Work quickly without checking',
      'B) Provide services thoroughly, timely, and with appropriate attention to detail',
      'C) Delay all decisions',
      'D) Focus only on major matters'
    ],
    correctAnswer: 1,
    explanation: 'Diligence: thorough professional service with appropriate care. Includes: timely responses, complete analysis, attention to detail, follow-through on commitments. Balance speed with accuracy. Prioritize time-sensitive matters. Don\'t cut corners. Diligence in: data gathering, analysis, recommendations, implementation, monitoring. Builds client confidence and reduces errors.'
  }
];
