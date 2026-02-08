/**
 * SEE Part 3: Representation, Practices, and Procedures - Comprehensive Study Guide
 * 
 * This guide covers all 4 domains of the SEE Part 3 exam with:
 * - Domain overviews and weight information
 * - Key concepts and common exam traps
 * - Circular 230 requirements
 * - Practice strategies
 * 
 * Updated for Tax Year 2024-2025
 */

export const SEE3_STUDY_GUIDE = {
  section: 'SEE3',
  title: 'SEE Part 3: Representation - Complete Study Guide',
  version: '2024-2025',
  examInfo: {
    totalQuestions: 100,
    scoredQuestions: 85,
    pretestQuestions: 15,
    timeAllowed: '3.5 hours (210 minutes)',
    passingScore: '105 (scaled score, approximately 70%)',
    examFormat: 'Computer-based, multiple choice',
  },
  
  domains: [
    {
      id: 'SEE3-1',
      name: 'Practices and Procedures',
      weight: '30.6%',
      estimatedQuestions: 26,
      overview: 'Covers authorization forms, IRS procedures, notices, and practitioner responsibilities.',
      
      keyTopics: [
        {
          topic: 'Power of Attorney (Form 2848)',
          concepts: [
            'Authorizes representation before the IRS',
            'Must specify tax matters and years',
            'CAF (Centralized Authorization File) number',
            'Revocation of prior POA (automatic unless specified)',
            'Line 5 authorizations: Signing authority',
            'Line 6: Retention of prior representatives',
          ],
          examTips: [
            'EXAM TRAP: Form 2848 does NOT authorize signing returns by default',
            'POA automatically revokes prior POAs for same matters unless box checked',
          ],
        },
        {
          topic: 'Tax Information Authorization (Form 8821)',
          concepts: [
            'Allows designee to receive and inspect tax information',
            'Does NOT authorize representation',
            'Useful for accountants who just need records',
            'Does not require designee to be enrolled',
          ],
          examTips: [
            'MNEMONIC: "8821 = See Only" (vs. 2848 = Speak for)',
            'Third-party designee on return (checkbox) expires after 1 year',
          ],
        },
        {
          topic: 'Centralized Authorization File (CAF)',
          concepts: [
            '9-digit number assigned to practitioners',
            'Links representative to taxpayer records',
            'Allows electronic access to transcripts',
            'Updated when new POA or TIA filed',
          ],
          examTips: [
            'CAF number stays with practitioner for career',
            'Withdraw from CAF if leaving matter',
          ],
        },
        {
          topic: 'IRS Notices and Letters',
          concepts: [
            'CP notices: Computer-generated (math errors, discrepancies)',
            'Letter notices: More complex issues',
            'Notice of Deficiency (90-day letter): Statutory notice',
            'Deadline adherence critical',
          ],
          examTips: [
            'EXAM TRAP: 90-day letter starts Tax Court clock - CANNOT extend',
            'CP2000: Proposed changes based on third-party info',
          ],
        },
        {
          topic: 'Taxpayer Advocate Service',
          concepts: [
            'Form 911: Request for Taxpayer Advocate Assistance',
            'Helps with systemic problems or hardship',
            'Can issue Taxpayer Assistance Orders (TAOs)',
            'Does not represent taxpayers',
          ],
          examTips: [
            'TAS is independent organization within IRS',
            'Know when to refer clients to TAS',
          ],
        },
        {
          topic: 'Practitioner Responsibilities',
          concepts: [
            'Return preparer identification (PTIN)',
            'Signature requirements',
            'Record retention',
            'Client communication',
            'Responding to IRS on client\'s behalf',
          ],
          examTips: [
            'PTIN required for all compensated preparers',
            'Must keep copy of return or list of names/EINs for 3 years',
          ],
        },
      ],
      
      practiceStrategy: 'Know the differences between Form 2848 and Form 8821 cold. Understand what powers each form grants and when each is appropriate.',
    },
    
    {
      id: 'SEE3-2',
      name: 'Representation Before the IRS',
      weight: '29.4%',
      estimatedQuestions: 25,
      overview: 'The Circular 230 domain - covers practitioner standards, ethical requirements, and disciplinary procedures.',
      
      keyTopics: [
        {
          topic: 'Who May Practice',
          concepts: [
            'Attorneys, CPAs, Enrolled Agents: Unlimited practice',
            'Enrolled Retirement Plan Agents (ERPAs): Retirement matters only',
            'Enrolled Actuaries: Specific actuarial matters',
            'Unenrolled return preparers: Limited representation',
            'Annual Filing Season Program (AFSP): Limited representation',
          ],
          examTips: [
            'MNEMONIC: "ACE" can do unlimited - Attorneys, CPAs, EAs',
            'Unenrolled preparers: Only returns they prepared, only before revenue agents/CSRs',
          ],
        },
        {
          topic: 'Circular 230 Due Diligence',
          concepts: [
            'Reliance on client information in good faith',
            'Cannot ignore implications of information',
            'Must make reasonable inquiries if info appears incorrect',
            'Know the facts and law',
          ],
          examTips: [
            'EXAM TRAP: You CAN rely on client info unless it appears wrong',
            'Don\'t need to audit or verify everything',
            'Due diligence for EITC is statutory (§6695(g))',
          ],
        },
        {
          topic: 'Conflicts of Interest',
          concepts: [
            'Cannot represent conflicting interests without consent',
            'Reasonable belief representation possible despite conflict',
            'Informed, written consent from each party',
            'Conflicts: IRS vs. client, client vs. client',
          ],
          examTips: [
            'Can represent former adverse parties if no confidential info conflicted',
            'Firm conflicts can be imputed to all members',
          ],
        },
        {
          topic: 'Advertising and Solicitation',
          concepts: [
            'Truthful, not misleading',
            'Cannot imply special relationship with IRS',
            'Fee information permitted',
            'No false or misleading statements',
          ],
          examTips: [
            'Cannot claim "former IRS" if never employed by IRS',
            'Can use client testimonials if truthful',
          ],
        },
        {
          topic: 'Fees and Contingent Fees',
          concepts: [
            'Contingent fees: Generally prohibited for original returns',
            'Exceptions: Refund claims, IRS examinations, other proceedings',
            'Unconscionable fees prohibited',
            'Fee information must be accurate',
          ],
          examTips: [
            'EXAM TRAP: NO contingent fees for PREPARATION of original return',
            'Representing in audit: Contingent fee OK',
          ],
        },
        {
          topic: 'Sanctions and Discipline',
          concepts: [
            'Reprimand/Censure (public or private)',
            'Suspension from practice',
            'Disbarment from practice',
            'Monetary penalties',
            'Office of Professional Responsibility (OPR)',
          ],
          examTips: [
            'Criminal prosecution is Justice Department, not OPR',
            'Expedited suspension for conviction or certain conduct',
          ],
        },
        {
          topic: 'Best Practices for Tax Advisors',
          concepts: [
            'Communicate clearly with client',
            'Establish facts and evaluate credibility',
            'Apply law to facts correctly',
            'Arrive at well-reasoned conclusion',
            'Advise client of consequences of conclusions reached',
          ],
          examTips: [
            'Best practices are aspirational but expected',
            'Distinguish from mandatory Circular 230 duties',
          ],
        },
      ],
      
      practiceStrategy: 'Circular 230 is heavily tested. Memorize the conflicts rules, contingent fee rules, and who can practice. These are frequently tested.',
    },
    
    {
      id: 'SEE3-3',
      name: 'Specific Areas of Representation',
      weight: '23.5%',
      estimatedQuestions: 20,
      overview: 'Covers examinations, appeals, collections, and relief provisions.',
      
      keyTopics: [
        {
          topic: 'Audits and Examinations',
          concepts: [
            'Correspondence audit: Mail, simple issues',
            'Office audit: At IRS office, more complex',
            'Field audit: At taxpayer location, most thorough',
            'DIF scoring: How returns are selected',
            'Taxpayer rights during audit',
          ],
          examTips: [
            'Correspondence audits are most common',
            'Field audits are most comprehensive',
            'Retain right to ask for supervisor',
          ],
        },
        {
          topic: 'Appeals Process',
          concepts: [
            '30-day letter: Proposed changes, right to appeal',
            'Written protest: Required for amounts >$25,000',
            'Small case request: Amounts ≤$25,000',
            '90-day letter (Notice of Deficiency): Tax Court jurisdiction',
            'Appeals conference: No new evidence rule (relaxed)',
          ],
          examTips: [
            'EXAM TRAP: 90-day letter gives 90 days (150 if abroad) to file Tax Court petition',
            'If no Tax Court petition, IRS can assess tax',
          ],
        },
        {
          topic: 'Collection Procedures',
          concepts: [
            'Notice of Federal Tax Lien: Claim against property',
            'Levy: Actual seizure of property',
            'Bank levies: 21-day holding period',
            'Wage garnishment: Continues until satisfied',
            'Property exempt from levy',
          ],
          examTips: [
            'MNEMONIC: "Lien = Claim, Levy = Seize"',
            '30-day notice required before levy',
            'Can request Collection Due Process (CDP) hearing',
          ],
        },
        {
          topic: 'Offers in Compromise',
          concepts: [
            'Doubt as to Liability: Dispute the tax owed',
            'Doubt as to Collectibility: Cannot pay full amount',
            'Effective Tax Administration: Hardship or equity',
            '20% payment with lump sum offer',
            'Periodic payments continue during consideration',
          ],
          examTips: [
            'Must be current on all filing requirements',
            'User fee: $205 (waived if low income)',
            'IRS generally looks at Reasonable Collection Potential (RCP)',
          ],
        },
        {
          topic: 'Installment Agreements',
          concepts: [
            'Guaranteed IA: ≤$10,000, 3-year payment',
            'Streamlined IA: ≤$50,000, 72-month payment',
            'Non-streamlined: Financial disclosure required',
            'Partial Payment IA (PPIA): Less than full balance',
            'User fees vary by method',
          ],
          examTips: [
            'Online Payment Agreement: Lower user fees',
            'Direct debit lowers user fees',
            'Lien may still be filed with IA',
          ],
        },
        {
          topic: 'Innocent Spouse Relief',
          concepts: [
            'IRC §6015(b): Traditional innocent spouse',
            'IRC §6015(c): Separation of liability (divorced/separated)',
            'IRC §6015(f): Equitable relief',
            'Form 8857 to request',
            '2-year deadline (from first collection activity)',
          ],
          examTips: [
            'Separation of liability: Must be divorced, widowed, or separated 12 months',
            'Equitable relief is catch-all for other situations',
          ],
        },
        {
          topic: 'Taxpayer Bill of Rights',
          concepts: [
            'Right to be informed',
            'Right to quality service',
            'Right to pay no more than correct tax',
            'Right to appeal',
            'Right to finality',
            'Right to privacy, confidentiality, representation',
          ],
          examTips: [
            'Know the 10 taxpayer rights',
            'Frequently tested in general terms',
          ],
        },
      ],
      
      practiceStrategy: 'Focus on the differences between OIC grounds and IA types. Know the collection process sequence and taxpayer rights.',
    },
    
    {
      id: 'SEE3-4',
      name: 'Filing Process',
      weight: '16.5%',
      estimatedQuestions: 14,
      overview: 'Covers amended returns, statutes of limitations, penalties, and record retention.',
      
      keyTopics: [
        {
          topic: 'Amended Returns and Refund Claims',
          concepts: [
            'Form 1040-X for individuals',
            'Refund deadline: Later of 3 years from filing or 2 years from payment',
            'Bad debts/worthless securities: 7 years',
            'Net operating loss carryback: Special rules',
            'Protective claims for uncertain positions',
          ],
          examTips: [
            'EXAM TRAP: If filed late, 3 years runs from actual filing date',
            'Cannot change MFJ to MFS after due date',
          ],
        },
        {
          topic: 'Statute of Limitations',
          concepts: [
            'Assessment: Generally 3 years from filing',
            '25% omission: 6 years',
            'Fraud or no return: No limitation',
            'FBAR: 6 years',
            'Collection: 10 years from assessment',
          ],
          examTips: [
            'MNEMONIC: "3-6-Forever" - Normal, omission, fraud',
            'Extended statute: Form 872 (fixed date) or 872-A (indefinite)',
          ],
        },
        {
          topic: 'Penalties',
          concepts: [
            'Failure to file: 5% per month, max 25%',
            'Failure to pay: 0.5% per month, max 25%',
            'Accuracy-related: 20% of underpayment',
            'Fraud: 75% of underpayment',
            'Reasonable cause defense',
            'First-time penalty abatement (FTA)',
          ],
          examTips: [
            'EXAM TRAP: If both FTF and FTP apply, FTF reduced by FTP amount',
            'Accuracy penalty requires negligence OR substantial understatement',
            'Substantial understatement: Greater of $5,000 or 10% of correct tax',
          ],
        },
        {
          topic: 'Preparer Penalties',
          concepts: [
            '§6694(a): Unreasonable positions - $1,000 or 50% of fee',
            '§6694(b): Willful/reckless conduct - $5,000 or 75% of fee',
            '§6695: Various other (PTIN, refund check, etc.)',
            '§6695(g): EITC due diligence - $635 per failure (2024)',
          ],
          examTips: [
            'More likely than not standard for disclosed positions',
            'Substantial authority required for undisclosed positions',
          ],
        },
        {
          topic: 'Interest',
          concepts: [
            'Interest on underpayments: Federal short-term rate + 3%',
            'Large corporate underpayments: +5%',
            'Overpayments to individuals: Same rate',
            'Interest accrues from due date',
            'Cannot be abated for reasonable cause',
          ],
          examTips: [
            'Interest is NOT a penalty and cannot be waived',
            'Only penalties can be abated for reasonable cause',
          ],
        },
        {
          topic: 'Document Retention',
          concepts: [
            'Tax returns: At least 3 years (7 for safety)',
            'Property records: Until disposition + 3 years',
            'Employment records: 4 years after tax due',
            'Preparer copies: 3 years for preparers',
            'Electronic records: Same rules as paper',
          ],
          examTips: [
            'Keep property records for as long as you own plus statute period',
            'Don\'t destroy records if audit pending',
          ],
        },
      ],
      
      practiceStrategy: 'Memorize the penalty rates and statute of limitation periods. These are heavily tested with specific numbers.',
    },
  ],
  
  circular230Summary: {
    title: 'Circular 230 Quick Reference',
    sections: [
      {
        section: 'Subpart A: Rules Governing Authority to Practice',
        keyRules: [
          'Who may practice before IRS (§10.3)',
          'Categories of practitioners (§10.4-10.7)',
          'Eligibility requirements',
        ],
      },
      {
        section: 'Subpart B: Duties and Restrictions',
        keyRules: [
          'Due diligence (§10.22)',
          'Prompt disposition of matters (§10.23)',
          'Return of client records (§10.28)',
          'Conflicts of interest (§10.29)',
          'Solicitation (§10.30)',
          'Contingent fees (§10.27)',
        ],
      },
      {
        section: 'Subpart C: Sanctions',
        keyRules: [
          'Censure, suspension, disbarment (§10.50)',
          'Expedited proceedings (§10.82)',
          'Incompetence and disreputable conduct (§10.51)',
        ],
      },
      {
        section: 'Subpart D: Rules Governing Disciplinary Proceedings',
        keyRules: [
          'Administrative Law Judge proceedings',
          'Appeal rights',
          'Expedited procedures',
        ],
      },
    ],
  },
  
  examStrategies: {
    timeManagement: [
      'Circular 230 questions are often fact-heavy - read carefully',
      'Collection questions may have long scenarios - identify key facts',
      'Save penalty calculation questions for later',
    ],
    answerTechniques: [
      'For Circular 230: Ask what\'s mandatory vs. aspirational',
      'For penalties: Know the percentage and per-item amounts',
      'For procedures: Think about what the taxpayer can DO in each situation',
    ],
    commonMistakes: [
      'Confusing 2848 (representation) with 8821 (information only)',
      'Not knowing contingent fees ARE allowed for refund claims',
      'Mixing up penalties (failure to file vs. failure to pay percentages)',
      'Confusing lien (claim) vs. levy (seizure)',
    ],
  },
  
  studySchedule: {
    week1: 'Forms 2848, 8821, CAF, practitioner basics',
    week2: 'Circular 230: Who may practice, due diligence',
    week3: 'Circular 230: Conflicts, fees, advertising, sanctions',
    week4: 'Audits and examinations, appeals process',
    week5: 'Collection: liens, levies, rights',
    week6: 'OIC, installment agreements, innocent spouse',
    week7: 'Amended returns, SOL, penalties, interest',
    week8: 'Document retention, review, practice exams',
  },
};
