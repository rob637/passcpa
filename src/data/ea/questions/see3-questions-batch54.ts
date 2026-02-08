/**
 * EA SEE Part 3: Representation - Questions Batch 54 (Q631-660)
 * Complex representation scenarios
 * 
 * Tax Year: 2024-2025
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH54: Question[] = [
  // SEE3-1: Practices and Procedures
  {
    id: 'see3-631',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Collection Statute',
    subtopic: 'Statute Suspension Events',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The 10-year collection statute is suspended for:',
    options: [
      'Time spent outside the country only',
      'OIC pending, installment agreement request pending, CDP hearing, and certain other events',
      'Any time the taxpayer is unemployed',
      'Weekends and holidays'
    ],
    correctAnswer: 1,
    explanation: 'The collection statute is suspended for: OIC pending (+30 days), installment agreement pending (+30 days), CDP hearing, bankruptcy, military deferment, and time outside US for 6+ months. The statute resumes after suspension ends.',
    reference: 'IRC §6502(a)(2)'
  },
  {
    id: 'see3-632',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Assessment',
    subtopic: 'Quick Assessment',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A mathematical or clerical error assessment:',
    options: [
      'Requires a 90-day letter',
      'Can be made immediately without a notice of deficiency',
      'Must go through Appeals',
      'Only applies to amended returns'
    ],
    correctAnswer: 1,
    explanation: 'Math/clerical errors and certain other items (like limited partnership items) can be assessed immediately without a notice of deficiency. The taxpayer receives a notice and can request abatement within 60 days.',
    reference: 'IRC §6213(b)'
  },
  {
    id: 'see3-633',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Examination',
    subtopic: 'Correspondence Audit',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'A correspondence audit is typically used for:',
    options: [
      'Complex business returns only',
      'Simple issues that can be resolved through document exchange by mail',
      'Criminal investigations',
      'Large partnerships'
    ],
    correctAnswer: 1,
    explanation: 'Correspondence audits handle simple issues (itemized deductions, credits, income verification) through mail. No in-person meeting. If unable to resolve, may be elevated to office or field exam.',
    reference: 'IRM 4.19.3'
  },
  {
    id: 'see3-634',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Abatement',
    subtopic: 'First Time Abatement',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'First Time Abatement (FTA) of penalties is available if the taxpayer:',
    options: [
      'Has never filed late in their lifetime',
      'Has clean penalty history for the prior 3 years and is compliant',
      'Is over 65 years old',
      'Files for bankruptcy'
    ],
    correctAnswer: 1,
    explanation: 'FTA is available for failure to file/pay penalties if: (1) no penalties in the prior 3 tax years, (2) all required returns filed or on extension, (3) any tax due is paid or in payment arrangement. Request by phone or letter.',
    reference: 'IRM 20.1.1.3.6.1'
  },
  {
    id: 'see3-635',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Refund Suit',
    subtopic: 'Prerequisites',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Before suing for refund in District Court or Court of Federal Claims, the taxpayer must:',
    options: [
      'Wait 90 days after any notice',
      'Pay the full amount assessed and file a claim for refund',
      'File in Tax Court first',
      'Obtain IRS permission'
    ],
    correctAnswer: 1,
    explanation: 'Refund suits require: (1) full payment of the assessed tax, (2) filing a timely administrative claim for refund (Form 1040-X or 843), (3) waiting 6 months or receiving denial. Tax Court does not require prepayment.',
    reference: 'IRC §7422'
  },
  // SEE3-2: Representation
  {
    id: 'see3-636',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Circular 230',
    subtopic: 'Due Diligence',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Due diligence under Circular 230 requires a practitioner to:',
    options: [
      'Accept all client statements at face value',
      'Make reasonable inquiries when information appears incorrect, inconsistent, or incomplete',
      'Audit the client before preparing the return',
      'Perform background checks on all clients'
    ],
    correctAnswer: 1,
    explanation: 'Practitioners must make reasonable inquiries if information appears incorrect, incomplete, or inconsistent. Must not ignore implications of furnished information and should not rely on client statements without verification when warranted.',
    reference: 'Circular 230 §10.22'
  },
  {
    id: 'see3-637',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Circular 230',
    subtopic: 'Sanctions',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Sanctions available under Circular 230 for practitioner misconduct include:',
    options: [
      'Only monetary penalties',
      'Censure, suspension, disbarment, and monetary penalties',
      'Only criminal prosecution',
      'Loss of citizenship'
    ],
    correctAnswer: 1,
    explanation: 'OPR (Office of Professional Responsibility) can impose: censure (public reprimand), suspension (temporary loss of practice rights), disbarment (permanent), and monetary penalties. Expedited suspension available in certain cases.',
    reference: 'Circular 230 §10.50'
  },
  {
    id: 'see3-638',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Practice Before IRS',
    subtopic: 'Form 2848 Scope',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A Power of Attorney (Form 2848) grants the representative authority to:',
    options: [
      'Sign the original return',
      'Receive and inspect confidential information, represent before IRS, and perform acts on behalf of the taxpayer',
      'Cash refund checks',
      'Conduct criminal defense'
    ],
    correctAnswer: 1,
    explanation: 'Form 2848 authorizes: receiving confidential tax information, representing before all IRS offices, signing documents (if checked), and performing specific acts. Does NOT authorize signing original returns or receiving refund checks without check endorsement.',
    reference: 'Form 2848 Instructions'
  },
  {
    id: 'see3-639',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Confidentiality',
    subtopic: 'Privilege',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The tax practitioner privilege under IRC §7525:',
    options: [
      'Applies to all tax matters',
      'Applies only to non-criminal tax matters before IRS and in federal court proceedings',
      'Is the same as attorney-client privilege',
      'Covers tax return preparation'
    ],
    correctAnswer: 1,
    explanation: 'IRC §7525 extends attorney-type privilege to EAs, CPAs, and enrolled actuaries for tax advice. Does NOT apply to: criminal matters, tax shelter promotions, written advice in connection with shelter transactions, or state proceedings.',
    reference: 'IRC §7525'
  },
  {
    id: 'see3-640',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Form 8821',
    subtopic: 'Tax Information Authorization',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'Form 8821 differs from Form 2848 in that Form 8821:',
    options: [
      'Grants full representation authority',
      'Only authorizes inspection and receipt of confidential tax information',
      'Is used for criminal matters',
      'Expires immediately'
    ],
    correctAnswer: 1,
    explanation: 'Form 8821 (Tax Information Authorization) allows designated person to receive and inspect tax information BUT not represent the taxpayer before IRS. Useful for financial planners, mortgage companies, and others who need access to tax info.',
    reference: 'Form 8821 Instructions'
  },
  // SEE3-3: Specific Areas of Representation
  {
    id: 'see3-641',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Offers in Compromise',
    subtopic: 'Effective Tax Administration',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'An Effective Tax Administration (ETA) OIC may be accepted when:',
    options: [
      'The taxpayer can pay in full immediately',
      'Collection would create economic hardship or compelling public policy reasons exist',
      'The liability is questionable',
      'The taxpayer has no assets'
    ],
    correctAnswer: 1,
    explanation: 'ETA OICs are for taxpayers who can pay but collection would be inequitable due to: exceptional circumstances causing economic hardship, or compelling public policy/equity factors. Must prove exceptional circumstances.',
    reference: 'Treas. Reg. §301.7122-1(b)(3)'
  },
  {
    id: 'see3-642',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'CDP Hearings',
    subtopic: 'Issues Raised',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'At a CDP hearing, the taxpayer can:',
    options: [
      'Only discuss payment options',
      'Challenge the underlying liability if no prior opportunity, request collection alternatives, and argue spousal defenses',
      'Appeal to the Supreme Court',
      'Request a new examination'
    ],
    correctAnswer: 1,
    explanation: 'CDP hearings allow: challenging the liability (if no prior opportunity), requesting innocent spouse relief, proposing collection alternatives (installment, OIC, CNC), and challenging lien/levy appropriateness. Settlement Officer handles.',
    reference: 'IRC §6330(c)'
  },
  {
    id: 'see3-643',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'CNC Status',
    subtopic: 'Currently Not Collectible',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When an account is placed in Currently Not Collectible (CNC) status:',
    options: [
      'The debt is forgiven',
      'Collection is suspended but interest and penalties continue to accrue',
      'The statute of limitations is extended indefinitely',
      'The taxpayer can request a refund'
    ],
    correctAnswer: 1,
    explanation: 'CNC means IRS cannot collect at this time due to hardship. Debt is NOT forgiven - interest and penalties continue, refunds are offset, liens may remain. IRS may resume collection if circumstances change. CSED continues to run.',
    reference: 'IRM 5.16.1'
  },
  {
    id: 'see3-644',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Innocent Spouse',
    subtopic: 'Separation of Liability',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Relief under IRC §6015(c) (separation of liability):',
    options: [
      'Is available to currently married couples filing jointly',
      'Separates liability between spouses; only available if divorced, separated, or widowed',
      'Requires proof of no knowledge',
      'Only applies to understatements'
    ],
    correctAnswer: 1,
    explanation: 'Section 6015(c) allocates the understatement between spouses based on the items attributable to each. Requires divorce, legal separation, or not living together for 12 months. Cannot benefit from fraudulent scheme.',
    reference: 'IRC §6015(c)'
  },
  {
    id: 'see3-645',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Appeals',
    subtopic: 'Fast Track Mediation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Fast Track Mediation is:',
    options: [
      'Only for large corporations',
      'An expedited process to resolve disputes while the case is still with IRS examination or collection',
      'A replacement for Tax Court',
      'Only available after litigation'
    ],
    correctAnswer: 1,
    explanation: 'Fast Track Mediation uses Appeals mediators to help resolve disputes while the case is still in examination or collection. Typically resolves in 30-40 days. Both parties must agree to participate. Non-binding unless agreement reached.',
    reference: 'Rev. Proc. 2003-41'
  },
  // SEE3-4: Filing Process
  {
    id: 'see3-646',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-4',
    topic: 'ERO Obligations',
    subtopic: 'Due Diligence',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An Electronic Return Originator (ERO) must:',
    options: [
      'Guarantee the refund amount',
      'Verify taxpayer identity, compare return to source documents, and retain records',
      'Submit returns within 24 hours',
      'Use only IRS-approved computers'
    ],
    correctAnswer: 1,
    explanation: 'ERO duties include: identity verification (Compare taxpayer to ID), comparing return data to source documents, retaining Form 8879 and copies for 3 years, ensuring accuracy. Publication 1345 details requirements.',
    reference: 'Pub. 1345'
  },
  {
    id: 'see3-647',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-4',
    topic: 'Preparer Penalties',
    subtopic: 'Willful or Reckless Conduct',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The penalty for willful or reckless conduct by a tax return preparer is:',
    options: [
      '$500',
      '$1,000 or 50% of income derived, whichever is greater',
      '$5,000 or 75% of income derived, whichever is greater',
      '100% of the tax underpayment'
    ],
    correctAnswer: 2,
    explanation: 'IRC §6694(b) imposes a penalty of the greater of $5,000 or 75% of the income from the return for willful or reckless conduct (willful attempt to understate liability or reckless/intentional disregard of rules).',
    reference: 'IRC §6694(b)'
  },
  {
    id: 'see3-648',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-4',
    topic: 'Due Diligence',
    subtopic: 'Form 8867',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Form 8867 (Paid Preparer\'s Due Diligence Checklist) must be filed with returns claiming:',
    options: [
      'Any deduction',
      'EIC, CTC, AOTC, and Head of Household filing status',
      'Mortgage interest deduction',
      'Charitable contributions only'
    ],
    correctAnswer: 1,
    explanation: 'Due diligence requirements (Form 8867, record retention, knowledge requirement, documentation) apply to: Earned Income Credit, Child Tax Credit/Additional CTC/Other Dependent Credit, American Opportunity Credit, and HOH status.',
    reference: 'IRC §6695(g)'
  },
  {
    id: 'see3-649',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-4',
    topic: 'Recordkeeping',
    subtopic: 'Client Records',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'A tax return preparer must retain client records for at least:',
    options: [
      '1 year',
      '3 years from the later of the due date or the date of filing',
      '7 years',
      '10 years'
    ],
    correctAnswer: 1,
    explanation: 'Preparers must retain copies of returns/claims or a list of taxpayers and tax years for 3 years from the close of the return period (later of due date or filing date). EROs must retain Form 8879 for 3 years.',
    reference: 'IRC §6107'
  },
  {
    id: 'see3-650',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Jeopardy Assessment',
    subtopic: 'Emergency Assessment',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A jeopardy assessment is made when:',
    options: [
      'The taxpayer disagrees with the IRS',
      'Collection of the tax would be jeopardized by delay (e.g., taxpayer fleeing, hiding assets)',
      'The return has math errors',
      'An extension is requested'
    ],
    correctAnswer: 1,
    explanation: 'Jeopardy assessments are immediate assessments when delay would jeopardize collection - taxpayer hiding assets, leaving the country, doing acts to impair collection. Normal deficiency procedures are bypassed. Post-assessment review available.',
    reference: 'IRC §6861'
  },
  {
    id: 'see3-651',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Examination',
    subtopic: 'Fraud Badges',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Which is considered a badge of fraud?',
    options: [
      'Filing for an extension',
      'Understating income, claiming fictitious deductions, maintaining inadequate records, and dealing in cash',
      'Using a tax preparer',
      'Taking legal tax deductions'
    ],
    correctAnswer: 1,
    explanation: 'Fraud badges include: substantial understatement, fictitious deductions, two sets of books, inadequate records, failure to file, concealing assets, cash transactions, false statements, altered documents, and lifestyle inconsistent with reported income.',
    reference: 'IRM 25.1.3'
  },
  {
    id: 'see3-652',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Circular 230',
    subtopic: 'Practitioner Advertising',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under Circular 230, practitioners may advertise:',
    options: [
      'Any claims without limitation',
      'Services truthfully and without false or misleading statements',
      'Guaranteed results',
      'Connections to IRS officials'
    ],
    correctAnswer: 1,
    explanation: 'Advertising must be truthful without false, misleading, or deceptive statements. Cannot claim connections to IRS, guarantee refunds, or make false claims about qualifications. Fee information must include scope of services.',
    reference: 'Circular 230 §10.30'
  },
  {
    id: 'see3-653',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Conflicts',
    subtopic: 'Conflict of Interest',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A practitioner may represent conflicting parties if:',
    options: [
      'Never allowed',
      'Each party provides informed written consent and the practitioner believes competent representation is possible',
      'The IRS approves',
      'One party pays more'
    ],
    correctAnswer: 1,
    explanation: 'Circular 230 §10.29 allows representation despite conflicts if: (1) practitioner reasonably believes competent and diligent representation possible, (2) representation is not prohibited by law, and (3) each party gives informed written consent.',
    reference: 'Circular 230 §10.29'
  },
  {
    id: 'see3-654',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Trust Fund',
    subtopic: 'Trust Fund Taxes',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'Trust fund taxes include:',
    options: [
      'Corporate income tax',
      'The employee portion of FICA and withheld income taxes',
      'Self-employment tax',
      'Estimated tax payments'
    ],
    correctAnswer: 1,
    explanation: 'Trust fund taxes are amounts held in trust for the government: withheld income taxes, employee FICA (not employer portion), and certain excise taxes. Employer portion of FICA is not trust fund; it\'s the employer\'s own liability.',
    reference: 'IRC §7501'
  },
  {
    id: 'see3-655',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Equitable Relief',
    subtopic: 'Innocent Spouse §6015(f)',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Equitable relief under IRC §6015(f) is available when:',
    options: [
      'Traditional innocent spouse requirements are met',
      'Relief is not available under §6015(b) or (c) but it would be inequitable to hold the requesting spouse liable',
      'The requesting spouse committed fraud',
      'The spouses are still married and living together'
    ],
    correctAnswer: 1,
    explanation: 'Section 6015(f) is the safety net when §6015(b) and (c) are unavailable. IRS considers factors like: abuse, knowledge, significant benefit, compliance history, economic hardship. Available for understatements AND underpayments.',
    reference: 'IRC §6015(f); Rev. Proc. 2013-34'
  },
  {
    id: 'see3-656',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-4',
    topic: 'Criminal Referral',
    subtopic: 'Criminal Investigation Indicators',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Criminal Investigation (CI) typically investigates:',
    options: [
      'All audits that result in additional tax',
      'Cases involving willful tax evasion, tax fraud, and related financial crimes',
      'Math errors only',
      'Late filing penalties'
    ],
    correctAnswer: 1,
    explanation: 'CI investigates willful violations including: tax evasion, filing false returns, tax fraud, money laundering, refund fraud, and related financial crimes. Requires willfulness - intentional violation of a known legal duty.',
    reference: 'IRM 9.1.3'
  },
  {
    id: 'see3-657',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Assessment',
    subtopic: 'Deficiency Notice',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A Notice of Deficiency (90-day letter) is:',
    options: [
      'A suggestion to pay more tax',
      'A legally required notice before the IRS can assess most income, estate, and gift taxes',
      'A collection notice',
      'A criminal summons'
    ],
    correctAnswer: 1,
    explanation: 'The statutory notice of deficiency is required before assessment for most income, estate, and gift taxes. Gives taxpayer 90 days (150 if abroad) to petition Tax Court. After 90 days, IRS can assess the deficiency.',
    reference: 'IRC §6212'
  },
  {
    id: 'see3-658',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-4',
    topic: 'Form 8821',
    subtopic: 'Centralized Authorization File',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The Centralized Authorization File (CAF):',
    options: [
      'Stores taxpayer returns',
      'Is the IRS database that records POAs and Tax Information Authorizations',
      'Contains audit results',
      'Is the taxpayer\'s credit file'
    ],
    correctAnswer: 1,
    explanation: 'The CAF is the IRS computer database that stores authorizations (Forms 2848 and 8821). CAF numbers are assigned to representatives for identification. CAF unit processes authorizations and responds to inquiries.',
    reference: 'IRM 21.3.7'
  },
  {
    id: 'see3-659',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Liens',
    subtopic: 'Federal Tax Lien',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A federal tax lien arises when:',
    options: [
      'A return is filed',
      'Tax is assessed, a demand for payment is made, and the taxpayer fails to pay',
      'The taxpayer requests an extension',
      'The IRS sends a collection notice'
    ],
    correctAnswer: 1,
    explanation: 'The federal tax lien arises after: (1) assessment, (2) notice and demand for payment, and (3) failure to pay. The lien attaches to all property and rights to property. An NFTL is filed to perfect the lien against third parties.',
    reference: 'IRC §6321, §6322'
  },
  {
    id: 'see3-660',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'OPR',
    subtopic: 'Office of Professional Responsibility',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'The Office of Professional Responsibility (OPR):',
    options: [
      'Processes tax returns',
      'Enforces Circular 230 and disciplines practitioners',
      'Collects unpaid taxes',
      'Examines tax returns'
    ],
    correctAnswer: 1,
    explanation: 'OPR is the IRS office that administers and enforces Circular 230. It investigates practitioner misconduct, initiates disciplinary proceedings, and imposes sanctions (censure, suspension, disbarment, monetary penalties).',
    reference: 'Circular 230 §10.60'
  }
];
