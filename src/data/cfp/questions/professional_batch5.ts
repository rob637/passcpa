/**
 * CFP Professional Conduct Questions - Batch 5
 * Domain 1: Professional Conduct and Regulation (15% of exam)
 * 25 additional questions covering ethics and fiduciary duty
 */

import { Question } from '../../../types';

export const CFP_PROFESSIONAL_BATCH5_QUESTIONS: Question[] = [
  // PCR-1: Code of Ethics Deep Dive
  {
    id: 'CFP-PCR-B5-001',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Code of Ethics',
    subtopic: 'Client Interest First',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When a client requests a strategy that is legal but not in the client\'s best financial interest, the CFP® professional should:',
    options: [
      'A) Implement the request without comment since the client is always right',
      'B) Document concerns, explain why the strategy may not be optimal, provide alternatives, and implement only if the client persists after being fully informed',
      'C) Refuse to implement the request under any circumstances',
      'D) Refer the client to another professional'
    ],
    correctAnswer: 1,
    explanation: 'CFP® professionals must act in clients\' best interests but clients retain autonomy. The professional should document concerns, explain potential issues, offer better alternatives, and ensure informed consent. If the client still wants to proceed after understanding the implications, implementation with documentation is appropriate.'
  },
  {
    id: 'CFP-PCR-B5-002',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Code of Ethics',
    subtopic: 'Competence',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The competence requirement of the CFP® Code means professionals must:',
    options: [
      'A) Know everything about all financial topics',
      'B) Attain and maintain the ability to provide professional services competently, seeking additional instruction or declining engagement when lacking knowledge',
      'C) Only work with simple client situations',
      'D) Pass the CFP® exam every 5 years'
    ],
    correctAnswer: 1,
    explanation: 'Competence requires attaining and maintaining knowledge and skill needed to provide services competently. When facing unfamiliar areas, professionals should seek additional education, consult experts, or decline/refer the engagement. Continuing education helps maintain competence, but it must go beyond minimum requirements when needed.'
  },
  {
    id: 'CFP-PCR-B5-003',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Code of Ethics',
    subtopic: 'Confidentiality',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When a divorcing client asks the CFP® professional not to share financial information with their spouse who is also a joint client, the professional should:',
    options: [
      'A) Honor the request since one client asked for confidentiality',
      'B) Recognize the conflict between joint clients, consider whether continued representation is possible, and potentially withdraw from one or both clients',
      'C) Share all information with both spouses regardless of the request',
      'D) Continue without any changes to the engagement'
    ],
    correctAnswer: 1,
    explanation: 'Joint clients create shared confidentiality, but divorce creates conflicting interests. The professional faces a material conflict and may need to withdraw from representing both. Options include continuing with conflicts waivers, representing neither, or representing one with the other\'s consent. Documentation is essential.'
  },
  // PCR-2: Practice Standards
  {
    id: 'CFP-PCR-B5-004',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Practice Standards',
    subtopic: 'Scope of Engagement',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client only wants help selecting investments for their 401(k). The CFP® professional may:',
    options: [
      'A) Not assist because it\'s not comprehensive financial planning',
      'B) Provide limited-scope advice after ensuring it is suitable and does not require comprehensive planning',
      'C) Insist on doing a full financial plan first',
      'D) Refer to a non-CFP® professional'
    ],
    correctAnswer: 1,
    explanation: 'CFP® professionals can provide limited-scope (modular) advice when appropriate. The professional must ensure the limited scope is suitable for client needs and doesn\'t ignore obvious problems requiring attention. This must be clearly communicated and agreed upon in the engagement terms.'
  },
  {
    id: 'CFP-PCR-B5-005',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Practice Standards',
    subtopic: 'Updating Analysis',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'When a client experiences a major life event (job loss, divorce, inheritance), the CFP® professional should:',
    options: [
      'A) Wait until the next scheduled review',
      'B) Promptly contact the client to discuss implications and update the financial plan',
      'C) Assume no changes are needed until told otherwise',
      'D) Terminate the engagement'
    ],
    correctAnswer: 1,
    explanation: 'Major life events can significantly impact financial plans. CFP® professionals in ongoing relationships should proactively reach out when aware of material changes. This demonstrates duty of care and ensures recommendations remain appropriate given changed circumstances.'
  },
  {
    id: 'CFP-PCR-B5-006',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Practice Standards',
    subtopic: 'Referrals',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When referring clients to other professionals (attorneys, CPAs), the CFP® professional:',
    options: [
      'A) Must share any referral fees received with the client',
      'B) Should refer only to competent professionals, disclose any conflicts or compensation arrangements, and ensure the referral is in the client\'s interest',
      'C) Has no obligation once the referral is made',
      'D) Should never make referrals'
    ],
    correctAnswer: 1,
    explanation: 'Referrals should be to competent professionals and in the client\'s best interest. Any conflicts (such as receiving referral fees or having ownership interests) must be disclosed. After referring, the CFP® professional may maintain involvement if appropriate and agreed upon.'
  },
  // PCR-3: Fiduciary Duty
  {
    id: 'CFP-PCR-B5-007',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Fiduciary Duty',
    subtopic: 'Duty to Inquire',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The duty to inquire requires CFP® professionals to:',
    options: [
      'A) Accept client statements at face value',
      'B) Make reasonable inquiry when information appears incomplete, inaccurate, or client understanding seems limited',
      'C) Investigate every statement thoroughly',
      'D) Only ask questions on a standard checklist'
    ],
    correctAnswer: 1,
    explanation: 'Duty to inquire means following up when something doesn\'t add up—inconsistent information, unrealistic assumptions, apparent misunderstanding. Professionals can\'t blindly accept information that appears problematic. The inquiry should be reasonable and proportionate to the concern.'
  },
  {
    id: 'CFP-PCR-B5-008',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Fiduciary Duty',
    subtopic: 'Best Interest',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The CFP® Fiduciary duty at all times means:',
    options: [
      'A) Fiduciary duty applies only when providing financial planning',
      'B) Fiduciary duty applies at all times when providing financial advice, not just during "Financial Planning" engagements',
      'C) Fiduciary duty can be waived by client consent',
      'D) Fiduciary duty is aspirational, not mandatory'
    ],
    correctAnswer: 1,
    explanation: 'Under the 2019 Standards, CFP® professionals owe fiduciary duty at all times when providing Financial Advice, not just when performing comprehensive financial planning. This expanded the duty beyond the traditional scope. It cannot be waived or circumvented through engagement letters.'
  },
  {
    id: 'CFP-PCR-B5-009',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Fiduciary Duty',
    subtopic: 'Conflicts Disclosure',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Full and fair disclosure of material conflicts includes:',
    options: [
      'A) General statements about potential conflicts',
      'B) Specific disclosure of how the professional and firm are compensated, any ownership interests, and incentives that could affect objectivity',
      'C) A standard form letter',
      'D) Verbal disclosure only'
    ],
    correctAnswer: 1,
    explanation: 'Material conflict disclosure must be specific enough for clients to understand how conflicts might affect advice. This includes all compensation methods (commissions, fees, bonuses), revenue sharing, product incentives, proprietary product requirements, and any relationships that could bias recommendations.'
  },
  // PCR-4: Regulation
  {
    id: 'CFP-PCR-B5-010',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Regulation',
    subtopic: 'Broker-Dealer Supervision',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under broker-dealer supervision requirements, supervisory procedures must:',
    options: [
      'A) Be the same at every firm',
      'B) Be tailored to the firm\'s business, reasonably designed to achieve compliance, and include documented review of representative activities',
      'C) Apply only to new representatives',
      'D) Be reviewed only when violations occur'
    ],
    correctAnswer: 1,
    explanation: 'Broker-dealers must establish, maintain, and enforce written supervisory procedures (WSPs) tailored to their business. FINRA Rule 3110 requires supervision of registered representatives, review of customer accounts, and procedures to ensure compliance. Supervisors must be qualified and training documented.'
  },
  {
    id: 'CFP-PCR-B5-011',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Regulation',
    subtopic: 'Privacy Notice',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Under Regulation S-P, financial institutions must provide privacy notices:',
    options: [
      'A) Only when requested',
      'B) At account opening and annually thereafter, describing information sharing practices',
      'C) Only if they share information with non-affiliates',
      'D) Only to business customers'
    ],
    correctAnswer: 1,
    explanation: 'Regulation S-P requires financial institutions to provide initial privacy notices at relationship establishment and annual notices thereafter. Notices must describe information collection, sharing practices, and consumer rights to opt out of certain sharing. Changes to practices require new notices.'
  },
  {
    id: 'CFP-PCR-B5-012',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Regulation',
    subtopic: 'ADV Part 2',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Form ADV Part 2A (the brochure) must be:',
    options: [
      'A) Provided only upon request',
      'B) Delivered to clients initially and offered annually, describing advisory services, fees, conflicts, disciplinary history, and more',
      'C) Filed with FINRA',
      'D) Updated only every 5 years'
    ],
    correctAnswer: 1,
    explanation: 'Form ADV Part 2A must be delivered to prospective clients before or at advisory agreement signing, and updates or a summary of changes must be offered annually. It\'s written in plain English and covers services, fees, conflicts, disciplinary information, code of ethics, and business practices.'
  },
  // PCR-1: More Ethics
  {
    id: 'CFP-PCR-B5-013',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Code of Ethics',
    subtopic: 'Sound Judgment',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'When ethical principles conflict in a situation (e.g., client autonomy versus best interest), the CFP® professional should:',
    options: [
      'A) Always prioritize one principle over others',
      'B) Use sound judgment to balance principles, considering facts, potential harm, and ethical reasoning',
      'C) Refer matters to the CFP Board',
      'D) Follow whatever the client prefers'
    ],
    correctAnswer: 1,
    explanation: 'Ethical dilemmas often involve balancing competing principles. Sound judgment considers all relevant facts, potential consequences, stakeholder interests, and professional obligations. There\'s rarely a formula—thoughtful analysis, documentation, and sometimes consultation are the best approaches.'
  },
  {
    id: 'CFP-PCR-B5-014',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Code of Ethics',
    subtopic: 'Fairness',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The fairness principle in the CFP® Code means:',
    options: [
      'A) Treating all clients exactly the same regardless of circumstances',
      'B) Being fair in all professional relationships, which may mean different treatment based on different circumstances while avoiding discrimination',
      'C) Charging all clients the same fees',
      'D) Providing unlimited services to all clients'
    ],
    correctAnswer: 1,
    explanation: 'Fairness doesn\'t mean identical treatment—it means equitable treatment based on circumstances. Different clients may receive different service levels based on engagement terms, but decisions shouldn\'t be based on discriminatory factors. Fairness applies to clients, colleagues, and other professionals.'
  },
  {
    id: 'CFP-PCR-B5-015',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Code of Ethics',
    subtopic: 'Professionalism',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Professionalism as a CFP® principle includes:',
    options: [
      'A) Only following regulations that are enforced',
      'B) Acting with dignity, courtesy, and respect; cooperating with regulators; and upholding the profession\'s reputation',
      'C) Competing aggressively against other advisors',
      'D) Maximizing personal income'
    ],
    correctAnswer: 1,
    explanation: 'Professionalism encompasses conduct that maintains public confidence in the profession. This includes treating colleagues and regulators with respect, cooperating with CFP Board and regulatory investigations, continuing education, and avoiding conduct that reflects adversely on the profession.'
  },
  // PCR-2: More Practice Standards
  {
    id: 'CFP-PCR-B5-016',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Practice Standards',
    subtopic: 'Technology Use',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When using financial planning software for recommendations, the CFP® professional:',
    options: [
      'A) Can rely entirely on software output without review',
      'B) Must understand the methodology, verify input accuracy, and apply professional judgment to outputs',
      'C) Must avoid using software entirely',
      'D) Has no responsibility for software-generated recommendations'
    ],
    correctAnswer: 1,
    explanation: 'Technology is a tool, not a replacement for professional judgment. CFP® professionals must understand software assumptions and limitations, verify inputs are accurate, critically evaluate outputs, and tailor recommendations to client circumstances. "The computer said so" is never a valid defense.'
  },
  {
    id: 'CFP-PCR-B5-017',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Practice Standards',
    subtopic: 'Fee Disclosure',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'CFP® professionals must disclose fees and costs:',
    options: [
      'A) Only when specifically asked by the client',
      'B) In writing, before engagement, including all sources of compensation, how fees are calculated, and product costs',
      'C) Only total fees, not breakdown',
      'D) After services are rendered'
    ],
    correctAnswer: 1,
    explanation: 'Full fee disclosure must occur before engagement, allowing clients to make informed decisions. This includes all compensation (fees, commissions, trails, bonuses), how fees are calculated, when charged, and product costs (expense ratios, surrender charges). Regular disclosure of ongoing fees is also expected.'
  },
  {
    id: 'CFP-PCR-B5-018',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Practice Standards',
    subtopic: 'Documentation',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Proper documentation practices require maintaining records of:',
    options: [
      'A) Only successful recommendations',
      'B) Client data, analysis, recommendations, rationale, client decisions, and basis for determining suitability',
      'C) Only items required by regulators',
      'D) Information until the engagement ends'
    ],
    correctAnswer: 1,
    explanation: 'Documentation should demonstrate the basis for recommendations, including client circumstances, analysis performed, alternatives considered, and rationale for recommendations made. It protects both client and professional. Records should be maintained for a reasonable period after the relationship ends.'
  },
  // Additional Topics
  {
    id: 'CFP-PCR-B5-019',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Fiduciary Duty',
    subtopic: 'Reasonable Compensation',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The requirement that CFP® professionals receive only reasonable and disclosed compensation means:',
    options: [
      'A) Fees cannot exceed industry averages',
      'B) Compensation must be disclosed, proportionate to value provided, and not create incentives to recommend unsuitable products',
      'C) All CFP® professionals must charge the same rates',
      'D) Commission-based compensation is prohibited'
    ],
    correctAnswer: 1,
    explanation: 'Reasonable compensation considers value provided, complexity, and market rates. The key is full disclosure and alignment of incentives. Compensation structures shouldn\'t drive recommendations that aren\'t in client interest. Neither fee-only nor commission-based is inherently more "fiduciary"—transparency and alignment matter.'
  },
  {
    id: 'CFP-PCR-B5-020',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Regulation',
    subtopic: 'Advertising Rules',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under SEC and FINRA advertising rules, investment advisers and registered reps:',
    options: [
      'A) Can make any claims that are technically true',
      'B) Cannot make false or misleading statements, must include appropriate disclosures, and face restrictions on testimonials and performance claims',
      'C) Can guarantee investment results',
      'D) Are not subject to advertising regulation'
    ],
    correctAnswer: 1,
    explanation: 'Advertising is heavily regulated. SEC Marketing Rule allows testimonials with disclosures. Performance advertising has specific requirements (net of fees, appropriate timeframes, comparison to benchmarks). FINRA reviews communication categories differently. All must be fair, balanced, and not misleading.'
  },
  {
    id: 'CFP-PCR-B5-021',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Code of Ethics',
    subtopic: 'Diligence',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Diligence as a CFP® principle requires:',
    options: [
      'A) Completing tasks within 24 hours',
      'B) Providing professional services promptly, thoroughly, and with careful attention to client needs and deadlines',
      'C) Never declining a client request',
      'D) Working only during business hours'
    ],
    correctAnswer: 1,
    explanation: 'Diligence means timely and thorough service delivery. This includes meeting deadlines, following up on action items, conducting adequate research, and maintaining ongoing attention to client needs. It doesn\'t mean instant response but rather reliable, consistent professional service.'
  },
  {
    id: 'CFP-PCR-B5-022',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Practice Standards',
    subtopic: 'Termination',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When terminating a client relationship, the CFP® professional should:',
    options: [
      'A) Simply stop responding to the client',
      'B) Provide written notice, allow reasonable transition time, and ensure the client has access to necessary information',
      'C) Refund all fees ever collected',
      'D) Continue providing advice indefinitely'
    ],
    correctAnswer: 1,
    explanation: 'Professional termination protects all parties. Written notice, reasonable transition period, transfer of records, and clear documentation of the termination reason are appropriate. Sudden abandonment, especially during critical periods, may violate duties. Engagement terms should address termination procedures.'
  },
  {
    id: 'CFP-PCR-B5-023',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Fiduciary Duty',
    subtopic: 'Principal Trades',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When a fiduciary engages in principal transactions (trading from firm inventory with client accounts):',
    options: [
      'A) This is always prohibited',
      'B) Prior informed consent is required, pricing must be fair, and potential conflicts must be managed',
      'C) No disclosure is needed if pricing is competitive',
      'D) Clients cannot opt out'
    ],
    correctAnswer: 1,
    explanation: 'Principal trades create conflicts because the firm is on both sides. Fiduciaries must obtain informed consent, ensure fair pricing, and manage conflicts appropriately. Section 206(3) of the Investment Advisers Act requires written disclosure and client consent before each principal trade.'
  },
  {
    id: 'CFP-PCR-B5-024',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Regulation',
    subtopic: 'State Registration',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Most investment advisers with less than $100 million in AUM are required to register with:',
    options: [
      'A) The SEC only',
      'B) State securities regulators in states where they have a place of business or clients',
      'C) FINRA',
      'D) The Department of Labor'
    ],
    correctAnswer: 1,
    explanation: 'SEC registration requires $100M+ AUM (with exceptions). Smaller advisers register with state(s) where they maintain a place of business or have clients, subject to de minimis exemptions. This creates "mid-sized adviser" category ($100-110M) with SEC registration option. State rules vary significantly.'
  },
  {
    id: 'CFP-PCR-B5-025',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Code of Ethics',
    subtopic: 'Integrity',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The CFP® integrity principle emphasizes:',
    options: [
      'A) Following the letter of the law regardless of ethics',
      'B) Honesty, truthfulness, and placing client interests ahead of personal interests',
      'C) Maximizing profitability',
      'D) Avoiding difficult conversations'
    ],
    correctAnswer: 1,
    explanation: 'Integrity is foundational—it means being honest, truthful, and trustworthy in all professional activities. It goes beyond legal compliance to encompass ethical behavior even when not legally required. Professionals should not deceive, mislead, or create false impressions, even through omission.'
  }
];
