/**
 * CPA AUD Study Guide
 * Auditing and Attestation
 * 
 * Based on 2024-2026 AICPA Blueprint
 */

import { CPAStudyGuide } from './far-study-guide';

export const AUD_STUDY_GUIDE: CPAStudyGuide = {
  id: 'aud-study-guide',
  section: 'AUD',
  title: 'Auditing and Attestation',
  version: '2024-2026',
  lastUpdated: '2024-12-01',

  examFormat: {
    testlets: 5,
    mcqs: 50,
    tbs: 7,
    duration: '4 hours',
  },

  blueprintAreas: [
    // =====================================================
    // AUD Area I: Ethics, Independence & Professional Conduct (15-25%)
    // =====================================================
    {
      id: 'AUD-I',
      title: 'Area I: Ethics, Independence & Professional Conduct',
      weight: '15-25%',
      overview: 'AICPA Code of Professional Conduct, independence requirements, and ethical responsibilities.',

      keyTopics: [
        {
          name: 'AICPA Code of Professional Conduct',
          description: 'Framework for ethical behavior and professional responsibilities',
          keyPoints: [
            'Principles: Responsibilities, Public Interest, Integrity, Objectivity, Due Care, Scope/Nature',
            'Independence in FACT (state of mind) and APPEARANCE (perception)',
            'Conceptual Framework: Identify threats, evaluate significance, apply safeguards',
            'Threats: Self-interest, Self-review, Advocacy, Familiarity, Undue influence',
            'General standards: Professional competence, due professional care, planning/supervision, sufficient data',
          ],
          references: ['AICPA Code ET 1.000'],
        },
        {
          name: 'Independence Requirements',
          description: 'Rules and interpretations for maintaining independence',
          keyPoints: [
            'Financial interests: Direct = always impaired; Indirect = material impairs',
            'Covered members: Engagement team, those who influence engagement, firm partners',
            'Immediate family: Spouses and dependents treated as member',
            'Close relatives: Parents, siblings - less restrictive rules',
            'Employment: Former employees cooling-off period; No key positions at client',
            'Non-attest services: Cannot perform management functions or decisions',
            'Loans: Normal lending arrangements allowed; otherwise impaired',
          ],
        },
        {
          name: 'SEC and PCAOB Requirements',
          description: 'Additional independence rules for public companies',
          keyPoints: [
            'Partner rotation: Lead and concurring partner 5-year on, 5-year off',
            'Prohibited services: Bookkeeping, IT systems design, appraisal, actuarial, internal audit outsourcing, HR, legal, investment banking',
            'Audit committee pre-approval required for all services',
            'Contingent fees prohibited',
            'Cooling-off period: 1 year before joining client in financial oversight role',
          ],
          references: ['SOX Section 201-206'],
        },
      ],

      examTips: [
        'Focus on threats and safeguards framework',
        'Know covered members and family restrictions',
        'Distinguish AICPA from SEC/PCAOB requirements',
        'Independence impairment MCQs are very common',
      ],
    },

    // =====================================================
    // AUD Area II: Risk Assessment & Planning (20-30%)
    // =====================================================
    {
      id: 'AUD-II',
      title: 'Area II: Risk Assessment & Planning',
      weight: '20-30%',
      overview: 'Understanding the entity, assessing risks, and developing audit strategy.',

      keyTopics: [
        {
          name: 'Audit Risk Model',
          description: 'Relationship between risk components',
          keyPoints: [
            'AR = IR × CR × DR (Audit Risk = Inherent × Control × Detection)',
            'IR + CR = RMM (Risk of Material Misstatement)',
            'Auditor controls Detection Risk through nature, timing, extent of procedures',
            'Lower acceptable AR = more audit work needed',
            'Inverse relationship: Higher RMM requires lower DR',
          ],
        },
        {
          name: 'Understanding the Entity',
          description: 'Risk assessment procedures to understand business and environment',
          keyPoints: [
            'Industry, regulatory, and external factors',
            'Nature of entity: Operations, ownership, governance, investments',
            'Accounting policies and practices',
            'Objectives/strategies and related business risks',
            'Measurement and review of financial performance',
            'Internal control components (COSO framework)',
          ],
        },
        {
          name: 'Internal Control - COSO Framework',
          description: 'Five components of internal control',
          keyPoints: [
            'Control Environment: Tone at top, ethical values, governance',
            'Risk Assessment: How entity identifies and manages risks',
            'Information & Communication: Systems for financial reporting',
            'Control Activities: Policies and procedures (segregation, authorization, reconciliation)',
            'Monitoring: Ongoing and separate evaluations of control effectiveness',
          ],
        },
        {
          name: 'Fraud Considerations',
          description: 'Auditor responsibility for detecting fraud',
          keyPoints: [
            'Fraud triangle: Opportunity, Rationalization, Pressure/Incentive',
            'Types: Fraudulent financial reporting vs. Misappropriation of assets',
            'Required fraud inquiries: Management, audit committee, internal audit',
            'Professional skepticism throughout the audit',
            'Revenue recognition presumed fraud risk',
            'Management override of controls presumed fraud risk',
            'Document fraud risk assessment and responses',
          ],
          references: ['AU-C 240'],
        },
        {
          name: 'Materiality',
          description: 'Determining materiality levels for the audit',
          keyPoints: [
            'Overall materiality: Based on appropriate benchmark (e.g., 5% of income, 0.5-1% of revenue)',
            'Performance materiality: Lower than overall to reduce aggregation risk',
            'Tolerable misstatement: For account/class level testing',
            'Clearly trivial threshold: Below which items need not be accumulated',
            'Materiality revised as audit progresses if necessary',
          ],
        },
      ],

      criticalFormulas: [
        'Audit Risk = Inherent Risk × Control Risk × Detection Risk',
        'Detection Risk = Audit Risk / (Inherent Risk × Control Risk)',
      ],

      examTips: [
        'Know the audit risk model and inverse relationships',
        'Understand COSO five components (CRIME/CRIMP mnemonic)',
        'Fraud triangle and revenue presumption heavily tested',
        'Materiality concepts appear in MCQs and TBS',
      ],
    },

    // =====================================================
    // AUD Area III: Performing Audit Procedures (30-40%)
    // =====================================================
    {
      id: 'AUD-III',
      title: 'Area III: Performing Audit Procedures',
      weight: '30-40%',
      overview: 'Evidence gathering, substantive procedures, and tests of controls.',

      keyTopics: [
        {
          name: 'Audit Evidence',
          description: 'Nature and evaluation of audit evidence',
          keyPoints: [
            'Sufficient (quantity) and Appropriate (quality = relevance + reliability)',
            'Reliability factors: Independence, internal control, direct knowledge, documentary, original',
            'Types: Inspection, observation, inquiry, confirmation, recalculation, reperformance, analytical procedures',
            'Confirmation types: Positive (response required), Negative (respond only if disagree)',
            'Exceptions: Investigate all non-replies and exceptions',
          ],
          references: ['AU-C 500'],
        },
        {
          name: 'Management Assertions',
          description: 'Categories of assertions tested by audit procedures',
          keyPoints: [
            'Transaction assertions: Occurrence, Completeness, Accuracy, Cutoff, Classification (COACC)',
            'Balance assertions: Existence, Rights & Obligations, Completeness, Valuation & Allocation (ERCV)',
            'Presentation assertions: Occurrence/Rights, Completeness, Classification/Understandability, Accuracy/Valuation',
            'Each procedure should address specific assertion(s)',
          ],
        },
        {
          name: 'Sampling',
          description: 'Statistical and nonstatistical sampling approaches',
          keyPoints: [
            'Sampling risk: Risk conclusions wrong due to sample not representative',
            'Non-sampling risk: All other examination risk (human error, wrong procedure)',
            'Attribute sampling: Tests of controls (rate of deviation)',
            'Variables sampling: Substantive tests (dollar amounts)',
            'Sample size factors: Confidence, tolerable deviation/misstatement, expected deviation/misstatement, population size',
          ],
        },
        {
          name: 'Substantive Procedures by Cycle',
          description: 'Key procedures for major transaction cycles',
          keyPoints: [
            'Revenue/Receivables: Confirmation, subsequent receipts, cutoff, allowance estimate',
            'Purchases/Payables: Search for unrecorded liabilities, vendor confirmation, three-way match',
            'Inventory: Observation, test counts, cutoff, pricing, obsolescence review',
            'Payroll: Recalculate, verify authorization, observe distribution',
            'Fixed Assets: Vouch additions/disposals, physical inspection, depreciation recalculation',
          ],
        },
        {
          name: 'Related Parties and Estimates',
          description: 'Special audit considerations',
          keyPoints: [
            'Related party transactions: Identify, understand, evaluate substance, disclosure',
            'Accounting estimates: Evaluate method, assumptions, and data; review for bias',
            'Fair value estimates: Consider valuation models, inputs, and specialist use',
            'Going concern: Evaluate one year from FS date; substantial doubt assessment',
          ],
        },
      ],

      examTips: [
        'Know assertions inside and out - most tested topic',
        'Match procedures to assertions in TBS',
        'Confirmation - understand positive vs. negative',
        'Sampling concepts tested conceptually more than mathematically',
      ],
    },

    // =====================================================
    // AUD Area IV: Forming Conclusions and Reporting (15-25%)
    // =====================================================
    {
      id: 'AUD-IV',
      title: 'Area IV: Forming Conclusions and Reporting',
      weight: '15-25%',
      overview: 'Audit reports, modifications, and other reporting responsibilities.',

      keyTopics: [
        {
          name: 'Unmodified Opinion',
          description: 'Standard unqualified audit report elements',
          keyPoints: [
            'Title: "Independent Auditor\'s Report"',
            'Addressee: Usually shareholders/board of directors',
            'Opinion section (first): "In our opinion, the financial statements present fairly..."',
            'Basis for Opinion: Conducted in accordance with GAAS/PCAOB standards',
            'Key Audit Matters (optional for nonissuers, required CAMs for issuers)',
            'Responsibilities of Management: FS preparation, internal control, going concern',
            'Auditor Responsibilities: Reasonable assurance, GAAS, professional skepticism',
            'Signature, City/State, Date (not before sufficient appropriate evidence obtained)',
          ],
        },
        {
          name: 'Modified Opinions',
          description: 'Types and circumstances for modification',
          keyPoints: [
            'Qualified: Material but not pervasive (GAAP departure or scope limitation)',
            'Adverse: Material and pervasive GAAP departure',
            'Disclaimer: Material and pervasive scope limitation',
            '"Except for" language for qualified (both types)',
            '"Do not present fairly" for adverse; "Disclaimer of opinion" header for disclaimer',
            'Basis for Modification paragraph required before Opinion',
          ],
        },
        {
          name: 'Emphasis and Other Matters',
          description: 'Additional paragraphs in audit report',
          keyPoints: [
            'Emphasis-of-Matter: Appropriately presented but fundamental importance (going concern, significant uncertainty)',
            'Other-Matter: Not in FS but relevant to understanding audit/responsibilities',
            'Emphasis = Point to FS disclosure; Other = Auditor\'s own disclosure',
            'Neither modifies the opinion',
          ],
        },
        {
          name: 'Group Audits and Other Auditors',
          description: 'Using work of component auditors',
          keyPoints: [
            'Group engagement partner responsible for direction, supervision, review',
            'Determine component materiality for significant components',
            'Options: Take responsibility (no reference) or make reference (divide responsibility)',
            'When making reference: Modified report sections include reference to other auditors',
            'Cannot reference component auditor if opinion is modified for that component',
          ],
        },
        {
          name: 'Other Reports',
          description: 'Compilations, reviews, and attestation engagements',
          keyPoints: [
            'Compilation: No assurance; accountant not required to be independent',
            'Review: Limited assurance; analytical procedures and inquiry; "Nothing came to our attention..."',
            'Agreed-upon procedures: Procedures specified by engaging party; findings reported',
            'SOC Reports: Type 1 (design) vs. Type 2 (design + operating effectiveness over period)',
          ],
        },
      ],

      examTips: [
        'Know report elements and order (Opinion first now)',
        'Distinguish qualified, adverse, disclaimer circumstances',
        'Emphasis-of-Matter vs. Other-Matter frequently tested',
        'Practice report modification TBS',
      ],
    },
  ],

  studyPlan: [
    { week: 1, focus: 'Ethics and Independence', topics: ['AICPA Code', 'Independence', 'SEC/PCAOB'], hours: 20, activities: ['Code of Conduct review', 'Independence scenarios'] },
    { week: 2, focus: 'Risk Assessment', topics: ['Audit Risk Model', 'Understanding Entity', 'Materiality'], hours: 20, activities: ['AR model problems', 'Materiality calculations'] },
    { week: 3, focus: 'Internal Control & Fraud', topics: ['COSO Framework', 'Fraud Procedures', 'Documentation'], hours: 20, activities: ['Control identification', 'Fraud risk assessment'] },
    { week: 4, focus: 'Evidence and Assertions', topics: ['Evidence Types', 'Assertions', 'Confirmation'], hours: 25, activities: ['Assertion matching', 'Procedure design'] },
    { week: 5, focus: 'Sampling and Procedures', topics: ['Sampling Methods', 'Substantive Procedures'], hours: 20, activities: ['Sampling factors', 'Cycle procedures'] },
    { week: 6, focus: 'Reporting', topics: ['Opinion Types', 'Report Modifications', 'Other Reports'], hours: 25, activities: ['Report writing TBS', 'Modification scenarios'] },
    { week: 7, focus: 'Group Audits and Attestation', topics: ['Component Auditors', 'Reviews', 'SOC'], hours: 15, activities: ['Compilation/Review practice'] },
    { week: 8, focus: 'Review and Practice Exams', topics: ['Full practice exams', 'Weak areas'], hours: 30, activities: ['2 complete practice exams', 'Review TBS'] },
  ],

  examTips: [
    'AUD is conceptual - understand the "why" not just the "what"',
    'Focus on audit risk model relationships',
    'Know report format changes - Opinion paragraph FIRST now',
    'Assertions are tested in almost every TBS',
    'Use CRIME for COSO internal control components',
    'Independence and ethics are straightforward if you know the rules',
  ],

  commonMistakes: [
    'Mixing up scope limitation vs. GAAP departure consequences',
    'Confusing positive vs. negative confirmations',
    'Not understanding audit risk inverse relationships',
    'Forgetting that fraud risk assessment requires documentation',
    'Mixing up new report order (Opinion, Basis, Key/CAM, Responsibilities)',
  ],
};

export default AUD_STUDY_GUIDE;
