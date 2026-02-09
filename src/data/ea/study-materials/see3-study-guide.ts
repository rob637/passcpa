/**
 * EA SEE3 Study Guide
 * Representation, Practices, and Procedures
 * 
 * Based on IRS Special Enrollment Examination Part 3
 */

import { EAStudyGuide, EADomain, StudyWeek } from './see1-study-guide';

export const SEE3_STUDY_GUIDE: EAStudyGuide = {
  id: 'see3-study-guide',
  part: 'SEE3',
  title: 'Representation, Practices, and Procedures',
  version: '2024-2025',
  lastUpdated: '2024-12-01',

  examFormat: {
    questions: 100,
    duration: '3.5 hours',
    passingScore: 'Scaled score of 105',
    format: 'Multiple choice',
  },

  domains: [
    // =====================================================
    // Domain 1: Practices and Procedures (25%)
    // =====================================================
    {
      id: 'SEE3-D1',
      title: 'Practices and Procedures',
      weight: '25%',
      overview: 'IRS examination process, appeals, and taxpayer penalties.',

      keyTopics: [
        {
          name: 'IRS Examinations (Audits)',
          description: 'Types of examinations and procedures',
          keyPoints: [
            'Correspondence audit: Simple issues, conducted by mail',
            'Office audit: Taxpayer visits IRS office with records',
            'Field audit: Revenue agent visits taxpayer\'s location',
            'Selection methods: DIF score, matching, industry focus',
            'Audit notice: Letter 2202 or similar',
            '30-day letter: Preliminary determination of deficiency',
            '90-day letter (Notice of Deficiency): Statutory notice before Tax Court',
          ],
          irsReference: 'Publication 556',
        },
        {
          name: 'Statute of Limitations',
          description: 'Time limits for assessment and refunds',
          keyPoints: [
            'General assessment period: 3 years from filing or due date (later of)',
            '25% gross income omission: 6 years',
            'No return filed, fraud, willful evasion: Unlimited',
            'Refund claim: 3 years from filing or 2 years from payment (later)',
            'Carryback claims: Period of the carryback year',
            'Extension: Form 872 for consent to extend',
            'Amended return does NOT restart the clock',
          ],
        },
        {
          name: 'Collection Process',
          description: 'How IRS collects unpaid taxes',
          keyPoints: [
            'Notice and demand for payment',
            'Notice of Federal Tax Lien: Protects government\'s interest',
            'Notice of Intent to Levy: Final warning before seizure',
            'Levy: Seizure of wages, bank accounts, property',
            '10-year collection statute (CSED)',
            'Installment Agreement: Pay over time (Form 9465)',
            'Offer in Compromise: Settle for less (Form 656)',
            'Currently Not Collectible: Hardship status',
            'Innocent spouse relief: Form 8857',
          ],
          irsReference: 'Publication 594',
        },
        {
          name: 'Taxpayer Penalties',
          description: 'Civil penalties for noncompliance',
          keyPoints: [
            'Failure to file: 5% per month, max 25%',
            'Failure to pay: 0.5% per month, max 25%',
            'Combined: If both apply, FTF reduced by FTP amount',
            'Accuracy-related: 20% of underpayment',
            'Negligence: Disregard of rules or regulations',
            'Substantial understatement: >$5,000 or >10% of correct tax',
            'Fraud: 75% of portion due to fraud',
            'Reasonable cause defense: Facts and circumstances',
            'Frivolous return: $5,000 penalty',
          ],
        },
        {
          name: 'Interest',
          description: 'Interest on underpayments and overpayments',
          keyPoints: [
            'Underpayment rate: Federal short-term rate + 3%',
            'Overpayment rate: Federal short-term rate + 3% (2% for corps)',
            'Large corporate underpayment: FST + 5%',
            'Compounded daily',
            'Can be abated only for IRS error or delay',
          ],
        },
      ],

      examTips: [
        'Statute of limitations periods are heavily tested',
        'Know penalty percentages and maximums',
        'Collection process sequence is important',
        '30-day vs. 90-day letter distinctions',
      ],
    },

    // =====================================================
    // Domain 2: Representation Before the IRS (20%)
    // =====================================================
    {
      id: 'SEE3-D2',
      title: 'Representation Before the IRS',
      weight: '20%',
      overview: 'Power of attorney, who may represent, and representation procedures.',

      keyTopics: [
        {
          name: 'Who May Practice',
          description: 'Authorized representatives before the IRS',
          keyPoints: [
            'Attorneys: Licensed in any U.S. jurisdiction',
            'CPAs: Licensed in any state',
            'Enrolled Agents: Enrolled to practice before IRS',
            'Enrolled Actuaries: Limited to actuarial matters',
            'Enrolled Retirement Plan Agents: Limited to retirement plans',
            'Annual Filing Season Program: Limited representation rights',
            'Unenrolled preparers: Can only represent returns they prepared, limited to revenue agents and customer service',
          ],
        },
        {
          name: 'Power of Attorney',
          description: 'Form 2848 and representation authority',
          keyPoints: [
            'Form 2848: Power of Attorney and Declaration of Representative',
            'Authorizes representative to act on behalf of taxpayer',
            'Specifies tax matters, forms, and periods covered',
            'Must be signed by taxpayer (or authorized party)',
            'Can authorize receipt of refund checks',
            'Representative must sign declaration',
            'CAF number assigned to practitioners',
          ],
          irsReference: 'Form 2848 Instructions',
        },
        {
          name: 'Tax Information Authorization',
          description: 'Form 8821 for disclosure of tax information',
          keyPoints: [
            'Form 8821: Tax Information Authorization',
            'Allows designee to receive and inspect confidential information',
            'Does NOT authorize representation',
            'No signature from appointee required',
            'Useful for third parties like banks, attorneys',
          ],
        },
        {
          name: 'Centralized Authorization File',
          description: 'CAF system administration',
          keyPoints: [
            'CAF: IRS database of practitioner authorizations',
            'CAF number: Unique identifier for practitioners',
            'Authorizations filed under taxpayer\'s account',
            'Revocation: File new 2848 or written statement',
            'Withdrawal: Practitioner may withdraw from representation',
          ],
        },
        {
          name: 'Conferences and Appeals',
          description: 'Resolving disputes before litigation',
          keyPoints: [
            'Informal conference during examination',
            'Appeal rights after 30-day letter',
            'Form 12203: Request for Appeals Review',
            'Appeals Settlement Guidelines',
            'Hazards of litigation considered',
            'Collection Due Process (CDP) appeal for liens/levies',
            'Equivalent hearing if CDP deadline missed',
          ],
        },
      ],

      examTips: [
        'Know who can practice and with what limitations',
        'Form 2848 vs. Form 8821 distinctions',
        'CAF system and number assignment',
        'Appeals process procedural steps',
      ],
    },

    // =====================================================
    // Domain 3: Circular 230 (25%)
    // =====================================================
    {
      id: 'SEE3-D3',
      title: 'Circular 230',
      weight: '25%',
      overview: 'Treasury regulations governing practice before the IRS.',

      keyTopics: [
        {
          name: 'Duties and Restrictions',
          description: 'Practitioner obligations under Circular 230',
          keyPoints: [
            'Competence: Must have knowledge and skill required',
            'Due diligence: Exercise due care in preparing and filing',
            'Prompt responsiveness: Timely responses to IRS requests',
            'Accuracy: Must be accurate in oral and written communications',
            'Cannot charge unconscionable fees',
            'Must return client records upon request',
            'Cannot endorse or negotiate refund checks (except certain payees)',
            'Must not use IRS employment for private gain',
          ],
          irsReference: 'Circular 230, Subpart B',
        },
        {
          name: 'Tax Return Positions',
          description: 'Standards for return positions',
          keyPoints: [
            'Undisclosed positions: Substantial authority standard (35-40%)',
            'Disclosed positions: Reasonable basis standard (20%+)',
            'Tax shelters and reportable transactions: More-likely-than-not (>50%)',
            'Must inform client of penalties and opportunities for disclosure',
            'Cannot advise position primarily for delay',
          ],
        },
        {
          name: 'Knowledge of Client Error',
          description: 'Handling client omissions and errors',
          keyPoints: [
            'Must advise client promptly of noncompliance, error, or omission',
            'Must advise of consequences of noncompliance',
            'Cannot sign return if client refuses to correct known error',
            'May withdraw from engagement if client refuses correction',
            'Cannot inform IRS without client consent (privilege)',
          ],
        },
        {
          name: 'Conflicts of Interest',
          description: 'Identifying and managing conflicts',
          keyPoints: [
            'Must not represent conflicting interests except with consent',
            'Written informed consent required',
            'Must reasonably believe can provide competent representation',
            'Cannot represent if prohibited by law',
            'Example: Representing both spouses with conflicting interests',
          ],
        },
        {
          name: 'Advertising and Solicitation',
          description: 'Rules for marketing services',
          keyPoints: [
            'Must not make false or misleading statements',
            'Cannot imply special relationship with IRS',
            'Fee information must be factual',
            'May not use IRS seal without permission',
            'Cannot solicit business from prospects known to be in need of services concerning a specific IRS matter',
          ],
        },
        {
          name: 'Contingent Fees',
          description: 'When contingent fees are prohibited',
          keyPoints: [
            'Generally prohibited for original return preparation',
            'Generally prohibited for amended returns filed during examination',
            'Allowed for: Refund claims, credits/deductions before exam, Collection matters, amended returns not under exam',
            'Fee cannot be "unconscionable"',
          ],
        },
        {
          name: 'Best Practices',
          description: 'Recommended professional conduct',
          keyPoints: [
            'Communicate clearly with client',
            'Establish facts and evaluate credibility',
            'Apply law to facts correctly',
            'Advise client of consequences of conclusions reached',
            'Act fairly and with integrity',
          ],
        },
      ],

      examTips: [
        'Circular 230 is 25% of the exam - study it thoroughly',
        'Know the different position standards (substantial authority, reasonable basis, MLTN)',
        'Contingent fee rules are frequently tested',
        'Client error notification requirements',
        'Conflict of interest consent requirements',
      ],
    },

    // =====================================================
    // Domain 4: Completion of the Filing Process (17%)
    // =====================================================
    {
      id: 'SEE3-D4',
      title: 'Completion of the Filing Process',
      weight: '17%',
      overview: 'E-file, signatures, extensions, and amended returns.',

      keyTopics: [
        {
          name: 'E-File Requirements',
          description: 'Electronic filing for tax return preparers',
          keyPoints: [
            'Mandatory for preparers filing 11+ returns',
            'ERO: Electronic Return Originator',
            'Form 8879: IRS e-file Signature Authorization',
            'PIN requirements and procedures',
            'Acknowledgment retention: 3 years',
            'Rejection procedures and correction',
          ],
        },
        {
          name: 'Signatures',
          description: 'Signature requirements for returns',
          keyPoints: [
            'Taxpayer signature required on return',
            'Preparer signature required if compensation received',
            'PTIN: Preparer Tax Identification Number required',
            'Electronic signatures: PIN, Self-Select PIN',
            'Form 8453: Paper signature document for e-file',
            'Power of attorney cannot sign return (generally)',
          ],
        },
        {
          name: 'Extensions',
          description: 'Filing deadline extensions',
          keyPoints: [
            'Form 4868: Individual extension (6 months)',
            'Form 7004: Business extension (various periods)',
            'Extension to file, NOT to pay',
            'Estimated payment required to avoid penalties',
            'Combat zone extensions automatically extended',
            'Disaster relief extensions are automatic',
          ],
        },
        {
          name: 'Amended Returns',
          description: 'Correcting previously filed returns',
          keyPoints: [
            'Form 1040-X: Amended U.S. Individual Income Tax Return',
            'Must explain changes',
            'File within 3 years of original due date or 2 years from payment',
            'Cannot change from MFJ to MFS after deadline',
            'Protective claim: File when unresolved contingency',
            'Electronic filing available for Form 1040-X',
          ],
        },
        {
          name: 'Refunds',
          description: 'Claiming refunds and credits',
          keyPoints: [
            'Overpayment can be refunded or applied to next year',
            'Direct deposit: Up to 3 accounts',
            'Offset: Refund may be reduced by past-due obligations',
            'Injured spouse: Form 8379 to protect share of refund',
            'Math error notices: No formal CDP rights',
          ],
        },
      ],

      examTips: [
        'E-file preparer threshold and requirements',
        'PTIN requirement for all paid preparers',
        'Extension procedures and payment requirements',
        'Amended return filing deadlines',
      ],
    },

    // =====================================================
    // Domain 5: Preparer Responsibilities (13%)
    // =====================================================
    {
      id: 'SEE3-D5',
      title: 'Preparer Responsibilities',
      weight: '13%',
      overview: 'Preparer penalties, due diligence, and recordkeeping.',

      keyTopics: [
        {
          name: 'Preparer Penalties',
          description: 'IRC penalties for preparers',
          keyPoints: [
            '§6694(a): Unreasonable positions - $1,000 or 50% of income',
            '§6694(b): Willful or reckless conduct - $5,000 or 75% of income',
            '§6695: Various procedural penalties',
            'Failure to furnish copy to taxpayer: $60 per return',
            'Failure to sign: $60 per return',
            'Failure to furnish PTIN: $60 per return',
            'Failure to retain copy or list: $60 per return',
            'Failure to file information return (e.g., 8867): $600',
            'Negotiating/endorsing refund check: $600',
          ],
          irsReference: 'IRC §6694, §6695',
        },
        {
          name: 'Due Diligence Requirements',
          description: 'Specific due diligence obligations',
          keyPoints: [
            'Form 8867: EIC, CTC, AOTC, HOH due diligence checklist',
            'Must complete for each applicable return',
            'Must ask client adequate questions',
            'Cannot know/have reason to know information is incorrect',
            'Must apply knowledge of tax law correctly',
            'Penalty: $600 per failure (per credit)',
            'Retain records for 3 years',
          ],
          irsReference: 'Form 8867 Instructions',
        },
        {
          name: 'Recordkeeping',
          description: 'What preparers must retain',
          keyPoints: [
            'Copy of return or list of taxpayers: 3 years',
            'Due diligence documentation: 3 years',
            'E-file records: 3 years',
            'POA records: During representation period',
            'Client communications: As appropriate',
          ],
        },
        {
          name: 'PTIN Requirements',
          description: 'Preparer Tax Identification Number',
          keyPoints: [
            'Required for ALL paid tax return preparers',
            'Apply online through IRS portal',
            'Annual renewal required',
            'Background check required',
            'Must be included on every return prepared',
            'Cannot use SSN in lieu of PTIN',
          ],
        },
        {
          name: 'Disclosure and Use of Information',
          description: 'Taxpayer privacy protections',
          keyPoints: [
            'Cannot disclose tax return information without consent',
            'Consent must be knowing and voluntary',
            'Cannot sell or share for solicitation without consent',
            'Penalty for disclosure: $1,000 per disclosure',
            'Criminal penalties for willful disclosure',
          ],
        },
      ],

      examTips: [
        'Know the preparer penalty amounts',
        'Due diligence Form 8867 requirements',
        'PTIN requirements and renewal',
        'Recordkeeping retention periods',
      ],
    },
  ],

  studyPlan: [
    { week: 1, focus: 'Examinations & Collection', topics: ['Audit types', 'Collection process', 'Liens/levies'], hours: 15, activities: ['IRS notice review', 'Collection scenarios'] },
    { week: 2, focus: 'Statutes & Penalties', topics: ['Assessment periods', 'Refund periods', 'Taxpayer penalties'], hours: 15, activities: ['Timeline calculations', 'Penalty computation'] },
    { week: 3, focus: 'Representation & POA', topics: ['Who may practice', 'Form 2848', 'CAF system'], hours: 15, activities: ['Form 2848 practice', 'Authorization scenarios'] },
    { week: 4, focus: 'Circular 230 - Part 1', topics: ['Duties', 'Restrictions', 'Return positions'], hours: 20, activities: ['Circular 230 reading', 'Ethics scenarios'] },
    { week: 5, focus: 'Circular 230 - Part 2', topics: ['Conflicts', 'Advertising', 'Contingent fees'], hours: 20, activities: ['Conflict identification', 'Fee analysis'] },
    { week: 6, focus: 'Filing Process', topics: ['E-file', 'Signatures', 'Extensions', 'Amendments'], hours: 15, activities: ['E-file requirements', 'Amendment practice'] },
    { week: 7, focus: 'Preparer Responsibilities', topics: ['Preparer penalties', 'Due diligence', 'PTIN'], hours: 15, activities: ['Form 8867 review', 'Penalty scenarios'] },
    { week: 8, focus: 'Review & Practice Exams', topics: ['Full practice exams', 'Weak areas'], hours: 15, activities: ['2-3 practice exams', 'Timed sessions'] },
  ],

  examTips: [
    'Circular 230 (25%) is the largest tested area - know it thoroughly',
    'Statute of limitations questions are very common',
    'Preparer penalty amounts should be memorized',
    'Distinguish between Form 2848 and Form 8821',
    'Due diligence requirements have specific penalties',
    'The exam focuses heavily on ethics and professional conduct',
  ],

  commonMistakes: [
    'Confusing the 3-year and 6-year assessment periods',
    'Not knowing contingent fee exceptions',
    'Mixing up substantial authority (35-40%) vs. reasonable basis (20%)',
    'Forgetting the specific preparer penalty amounts',
    'Not recognizing when conflict of interest consent is needed',
    'Overlooking Form 8867 due diligence requirements',
  ],
};

export default SEE3_STUDY_GUIDE;
