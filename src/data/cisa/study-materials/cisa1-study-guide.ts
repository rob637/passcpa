/**
 * CISA Domain 1 Study Guide
 * Information Systems Auditing Process
 * 
 * Based on 2024 ISACA CISA Exam Content Outline
 * Weight: 18% (approximately 27 questions)
 */

export interface CISAStudyGuide {
  id: string;
  section: string;
  title: string;
  version: string;
  lastUpdated: string;
  examFormat: {
    totalQuestions: number;
    questionType: string;
    duration: string;
    passingScore: string;
  };
  blueprintAreas: BlueprintArea[];
  studyPlan: StudyWeek[];
  examTips: string[];
  commonMistakes: string[];
}

export interface BlueprintArea {
  id: string;
  title: string;
  weight: string;
  overview: string;
  keyTopics: TopicDetail[];
  criticalFormulas?: string[];
  examTips: string[];
}

export interface TopicDetail {
  name: string;
  description: string;
  keyPoints: string[];
  references?: string[];
}

export interface StudyWeek {
  week: number;
  focus: string;
  topics: string[];
  hours: number;
  activities: string[];
}

export const CISA1_STUDY_GUIDE: CISAStudyGuide = {
  id: 'cisa1-study-guide',
  section: 'CISA1',
  title: 'Domain 1: Information Systems Auditing Process',
  version: '2024',
  lastUpdated: '2026-02-10',

  examFormat: {
    totalQuestions: 150,
    questionType: 'Multiple Choice Questions (MCQ)',
    duration: '4 hours',
    passingScore: '450 scaled score (out of 800)',
  },

  blueprintAreas: [
    // =====================================================
    // Domain 1A: IS Audit Planning
    // =====================================================
    {
      id: 'CISA1-A',
      title: 'IS Audit Planning',
      weight: '~6%',
      overview: 'Risk-based audit planning, ISACA standards compliance, and developing effective audit programs that align resources with organizational risk priorities.',

      keyTopics: [
        {
          name: 'Risk-Based Audit Planning',
          description: 'Understanding and applying risk assessment to prioritize audit focus',
          keyPoints: [
            'Audit Risk = Inherent Risk × Control Risk × Detection Risk',
            'Inherent Risk: Risk before controls are applied (nature of business/system)',
            'Control Risk: Risk that controls fail to prevent or detect material issues',
            'Detection Risk: Risk that audit procedures fail to detect issues (auditor-controlled)',
            'Risk assessment drives audit scope, resource allocation, and timing',
            'Higher risk areas require more extensive testing and evidence',
            'Audit universe should be maintained and updated regularly',
            'Risk ranking methodologies: Qualitative (High/Medium/Low), Quantitative (dollars/scores)',
          ],
          references: ['ISACA IT Audit Framework', 'COBIT 2019'],
        },
        {
          name: 'ISACA Standards Framework',
          description: 'Understanding mandatory and recommended guidance for IS auditors',
          keyPoints: [
            'Standards are MANDATORY - auditors must comply or document exceptions',
            'Guidelines are RECOMMENDED - help implement standards effectively',
            'Tools and Techniques are OPTIONAL - provide practical assistance',
            'Key Standards: Audit Charter, Independence, Due Professional Care, Competence',
            'Audit Charter: Formal document granting authority, responsibility, accountability',
            'Independence must be maintained in fact and appearance at all times',
            'Professional skepticism: Question evidence and assumptions',
            'Continuing professional education requirements for competence',
          ],
        },
        {
          name: 'Audit Planning Process',
          description: 'Steps and activities in developing an effective audit plan',
          keyPoints: [
            'Understand the business environment, IT infrastructure, and regulatory requirements',
            'Identify audit objectives aligned with organizational goals and risks',
            'Determine scope boundaries - what is included and excluded',
            'Assess resource requirements: staff, tools, time, budget',
            'Develop audit program with detailed procedures and expected evidence',
            'Establish timelines and milestones for audit activities',
            'Communicate plan to stakeholders and obtain management buy-in',
            'Plan for use of Computer-Assisted Audit Techniques (CAATs)',
          ],
        },
        {
          name: 'Materiality and Audit Scope',
          description: 'Determining what matters and defining audit boundaries',
          keyPoints: [
            'Materiality: Threshold above which misstatements affect decisions',
            'Quantitative factors: Dollar amounts, transaction volumes, system criticality',
            'Qualitative factors: Regulatory impact, reputation, legal requirements',
            'Scope creep: Uncontrolled expansion of audit scope without authorization',
            'Scope limitations must be documented and communicated',
            'Management requests should be evaluated against risk priorities',
            'Consider both individual and aggregate materiality',
          ],
        },
      ],

      criticalFormulas: [
        'Audit Risk = Inherent Risk × Control Risk × Detection Risk',
        'Detection Risk = Audit Risk / (Inherent Risk × Control Risk)',
      ],

      examTips: [
        'Standards are MANDATORY - when a question asks about compliance, Standards always win',
        'Detection Risk is the ONLY component the auditor directly controls',
        'An audit charter must grant formal authority for the audit function',
        'Risk-based approach means focusing resources on highest risk areas first',
      ],
    },

    // =====================================================
    // Domain 1B: IS Audit Execution
    // =====================================================
    {
      id: 'CISA1-B',
      title: 'IS Audit Execution',
      weight: '~6%',
      overview: 'Collecting and evaluating evidence, using CAATs, and executing audit procedures to support audit conclusions.',

      keyTopics: [
        {
          name: 'Audit Evidence Quality (SCAR)',
          description: 'Criteria for evaluating the quality and reliability of audit evidence',
          keyPoints: [
            'Sufficient: Enough quantity of evidence to support conclusions',
            'Competent: Evidence is reliable, valid, and comes from credible sources',
            'Appropriate: Evidence fits the audit objective and is relevant to the finding',
            'Relevant: Evidence directly relates to the control or finding being tested',
            'Evidence must be documented in workpapers for review',
            'Multiple sources strengthen evidence reliability',
            'Consider source independence when evaluating evidence',
          ],
        },
        {
          name: 'Evidence Reliability Hierarchy',
          description: 'Understanding which sources of evidence are most reliable',
          keyPoints: [
            '1. Physical observation by auditor (most reliable)',
            '2. External documents (third-party confirmations, vendor reports)',
            '3. Internal documents (policies, procedures, logs)',
            '4. Auditor analysis and recalculation',
            '5. Oral representations from management/staff (least reliable)',
            'Original documents more reliable than copies or summaries',
            'Evidence obtained directly by auditor more reliable than provided by auditee',
            'Corroborating evidence from multiple sources strengthens conclusions',
          ],
        },
        {
          name: 'Computer-Assisted Audit Techniques (CAATs)',
          description: 'Using technology to perform audit procedures more effectively',
          keyPoints: [
            'Generalized Audit Software (GAS): Data extraction, analysis, and reporting (e.g., ACL, IDEA)',
            'Test Data: Dummy transactions processed to test program logic and controls',
            'Integrated Test Facility (ITF): Test data processed in production environment',
            'Parallel Simulation: Auditor\' software reprocesses data to verify results',
            'Embedded Audit Modules: Continuous monitoring modules within applications',
            'CAATs enable testing of 100% of transactions vs. sampling',
            'Appropriate for large data volumes and repetitive transactions',
            'Requires understanding of data structures and system logic',
          ],
          references: ['ISACA CAAT Guidelines'],
        },
        {
          name: 'Sampling Methodologies',
          description: 'Statistical and non-statistical approaches to audit sampling',
          keyPoints: [
            'Statistical Sampling: Probability-based, results can be projected',
            'Non-Statistical Sampling: Judgment-based selection, cannot project',
            'Attribute Sampling: Tests rate of control deviations (yes/no)',
            'Variable Sampling: Tests monetary amounts (values)',
            'Confidence level, precision, and expected error rate affect sample size',
            'Stratification improves efficiency for populations with variability',
            'Haphazard selection is not random and may introduce bias',
            'Document sampling methodology and rationale in workpapers',
          ],
        },
        {
          name: 'Testing Approaches',
          description: 'Methods for testing controls and transactions',
          keyPoints: [
            'Tests of Controls: Evaluate design and operating effectiveness of controls',
            'Substantive Testing: Tests transactions and balances for accuracy',
            'Compliance Testing: Verify adherence to policies and standards',
            'Walkthrough: Trace a transaction through the process end-to-end',
            'Observation: Watch controls being performed in real-time',
            'Inquiry: Interview personnel about processes and controls',
            'Inspection: Review documentation, configurations, and evidence',
            'Re-performance: Auditor independently executes the control',
          ],
        },
      ],

      criticalFormulas: [
        'Sample Size = (Reliability Factor × Population) / (Precision × Expected Error Rate)',
      ],

      examTips: [
        'SCAR mnemonic: Sufficient, Competent, Appropriate, Relevant',
        'Physical observation by auditor is MOST reliable evidence',
        'GAS is best for large-scale data analysis across entire populations',
        'Test data validates program logic; parallel simulation validates processing',
      ],
    },

    // =====================================================
    // Domain 1C: Control Self-Assessment
    // =====================================================
    {
      id: 'CISA1-C',
      title: 'Control Self-Assessment (CSA)',
      weight: '~2%',
      overview: 'Understanding CSA as a complement to traditional auditing where management and staff evaluate their own control environment.',

      keyTopics: [
        {
          name: 'CSA Fundamentals',
          description: 'Understanding what CSA is and how it supports the control environment',
          keyPoints: [
            'CSA is management and staff evaluating their own control environment',
            'Facilitated workshops are the most common CSA approach',
            'Questionnaire-based CSA allows broader participation',
            'Management analysis approach uses process documentation review',
            'CSA promotes ownership of controls by business units',
            'Creates a control-conscious culture throughout the organization',
            'Identifies control gaps before formal audits',
            'Supplements but does NOT replace independent audit',
          ],
        },
        {
          name: 'CSA Benefits and Limitations',
          description: 'Evaluating the value and constraints of CSA programs',
          keyPoints: [
            'Benefits: Improved risk awareness among staff and management',
            'Benefits: Early detection of control weaknesses and gaps',
            'Benefits: Increased employee buy-in and accountability',
            'Benefits: Reduced audit time through better control documentation',
            'Benefits: Enhanced communication between business and IT',
            'Limitations: Potential bias from self-interest',
            'Limitations: May lack independence and objectivity',
            'Limitations: Requires skilled facilitation for effectiveness',
          ],
        },
        {
          name: 'CSA Implementation',
          description: 'Keys to successful CSA program implementation',
          keyPoints: [
            'Executive sponsorship is critical for success',
            'Clear objectives and scope for CSA activities',
            'Trained facilitators for workshops',
            'Documented methodology and consistent approach',
            'Integration with enterprise risk management',
            'Regular reporting to audit committee and management',
            'Action tracking for identified improvements',
            'Periodic evaluation of CSA program effectiveness',
          ],
        },
      ],

      examTips: [
        'CSA SUPPLEMENTS but never REPLACES independent audit',
        'Facilitated workshop is the most common and effective CSA approach',
        'CSA promotes control ownership but may lack objectivity',
        'Benefits include early detection and improved risk awareness',
      ],
    },

    // =====================================================
    // Domain 1D: Reporting and Follow-Up
    // =====================================================
    {
      id: 'CISA1-D',
      title: 'Audit Reporting and Follow-Up',
      weight: '~2%',
      overview: 'Communicating audit results effectively and ensuring corrective actions are implemented and verified.',

      keyTopics: [
        {
          name: 'Five Cs of Audit Findings',
          description: 'Essential components that every audit finding should document',
          keyPoints: [
            'Condition: What IS happening - the actual situation found',
            'Criteria: What SHOULD BE - the standard, policy, or requirement',
            'Cause: WHY it happened - the root cause of the gap',
            'Consequence: Business IMPACT - risk and potential damage',
            'Corrective Action: HOW to fix - specific recommendations',
            'All five elements create complete, actionable findings',
            'Missing elements weaken the finding and response',
            'Root cause analysis ensures permanent fixes, not symptoms',
          ],
        },
        {
          name: 'Audit Report Structure',
          description: 'Components of an effective audit report',
          keyPoints: [
            'Executive summary for senior management and board',
            'Scope and objectives clearly stated',
            'Methodology and approach used',
            'Detailed findings with risk ratings',
            'Recommendations with priority levels',
            'Management response and action plans',
            'Target remediation dates and responsible parties',
            'Overall audit opinion or conclusion',
          ],
        },
        {
          name: 'Follow-Up Process',
          description: 'Ensuring corrective actions are implemented effectively',
          keyPoints: [
            'Track all findings to resolution',
            'Verify corrective actions implemented as agreed',
            'Assess if remaining risk is within acceptable tolerance',
            'Re-test controls after remediation when appropriate',
            'Escalate to audit committee when deadlines missed',
            'Close findings only when evidence confirms resolution',
            'Document follow-up activities in workpapers',
            'Report on remediation status periodically',
          ],
        },
        {
          name: 'Report Distribution and Communication',
          description: 'Ensuring audit results reach appropriate stakeholders',
          keyPoints: [
            'Distribute to auditee management first for factual accuracy',
            'Final report to senior management and audit committee',
            'Consider regulatory reporting requirements',
            'Protect confidential information in distribution',
            'Present findings in management meetings as needed',
            'Track acknowledgment of report receipt',
            'Maintain report retention per policy and regulations',
          ],
        },
      ],

      examTips: [
        'Memorize the Five Cs: Condition, Criteria, Cause, Consequence, Corrective Action',
        'Follow-up is CRITICAL - auditor must verify corrective actions implemented',
        'Escalate to audit committee when management misses remediation deadlines',
        'Management response should include specific actions, dates, and owners',
      ],
    },

    // =====================================================
    // Domain 1E: Control Frameworks
    // =====================================================
    {
      id: 'CISA1-E',
      title: 'Control Frameworks',
      weight: '~2%',
      overview: 'Understanding major IT and internal control frameworks used as criteria for IS audits.',

      keyTopics: [
        {
          name: 'COBIT Framework',
          description: 'ISACA\'s framework for IT governance and management',
          keyPoints: [
            'COBIT = Control Objectives for Information and Related Technology',
            'Developed and maintained by ISACA',
            'Aligns IT with business objectives',
            'Provides comprehensive IT governance framework',
            'Includes performance measurement and maturity models',
            'COBIT 2019 is the current version',
            'Covers 40 governance and management objectives',
            'Used as audit criteria for IT controls',
          ],
          references: ['COBIT 2019 Framework'],
        },
        {
          name: 'COSO Internal Control Framework',
          description: 'Enterprise-wide internal control framework widely used as audit criteria',
          keyPoints: [
            'Five Components: Control Environment, Risk Assessment, Control Activities, Information & Communication, Monitoring',
            'Control Environment: Tone at the top, integrity, ethics',
            'Risk Assessment: Identify and assess risks to objectives',
            'Control Activities: Policies and procedures to address risks',
            'Information & Communication: Relevant information flows',
            'Monitoring Activities: Ongoing and separate evaluations',
            '17 Principles support the five components',
            'Applies to all organizations regardless of size',
          ],
          references: ['COSO Internal Control - Integrated Framework (2013)'],
        },
        {
          name: 'IT General Controls vs. Application Controls',
          description: 'Understanding the two main categories of IT controls',
          keyPoints: [
            'IT General Controls (ITGCs): Apply across IT environment',
            'ITGCs include: Access security, Change management, Operations, Program development',
            'Application Controls: Specific to individual applications',
            'Input Controls: Validate data at entry (edits, batch totals)',
            'Processing Controls: Ensure accurate processing',
            'Output Controls: Verify completeness and accuracy of results',
            'ITGCs support effectiveness of application controls',
            'Weaknesses in ITGCs can undermine application controls',
          ],
        },
        {
          name: 'Control Types',
          description: 'Classification of controls by function and timing',
          keyPoints: [
            'Preventive Controls: Stop errors/issues before they occur (access controls)',
            'Detective Controls: Identify errors after they occur (audit logs, reconciliations)',
            'Corrective Controls: Fix errors after detection (backup restoration)',
            'Directive Controls: Guide behavior (policies, training)',
            'Compensating Controls: Alternative controls when primary controls insufficient',
            'Manual vs. Automated controls',
            'Key controls vs. supporting controls',
            'Design effectiveness vs. operating effectiveness',
          ],
        },
      ],

      examTips: [
        'COBIT is ISACA\'s IT governance framework - know it well',
        'COSO has 5 components: Control Environment, Risk Assessment, Control Activities, I&C, Monitoring',
        'ITGCs support all application controls - ITGC weaknesses affect everything',
        'Preventive controls stop problems; Detective controls identify problems after the fact',
      ],
    },
  ],

  studyPlan: [
    { week: 1, focus: 'Audit Planning Fundamentals', topics: ['Risk-based planning', 'ISACA Standards', 'Audit Charter'], hours: 8, activities: ['Read ISACA standards', 'Risk assessment practice', 'MCQ practice'] },
    { week: 2, focus: 'Audit Execution and Evidence', topics: ['SCAR criteria', 'Evidence hierarchy', 'CAATs'], hours: 10, activities: ['Evidence evaluation exercises', 'CAAT scenarios', 'Sample size calculations'] },
    { week: 3, focus: 'CSA, Reporting, and Control Frameworks', topics: ['CSA benefits/limitations', 'Five Cs', 'COBIT/COSO', 'Control types'], hours: 8, activities: ['Report writing practice', 'Framework comparison', 'Domain 1 full practice exam'] },
  ],

  examTips: [
    'Independence is paramount - when in doubt, independence wins over other considerations',
    'Always use a risk-based approach - prioritize by risk, not by convenience',
    'Evidence from external sources is more reliable than internal sources',
    'Standards are MANDATORY, guidelines are RECOMMENDED, tools/techniques are OPTIONAL',
    'CSA supplements but does NOT replace independent audit',
    'Document EVERYTHING - if it\'s not documented, it didn\'t happen',
    'Follow-up is critical - ensure corrective actions are actually implemented',
    'Know the Five Cs for every audit finding',
    'COBIT and COSO are frequently tested as audit criteria frameworks',
    'Detection Risk is the only audit risk component the auditor can control',
  ],

  commonMistakes: [
    'Confusing Standards (mandatory) with Guidelines (recommended)',
    'Thinking oral evidence is as reliable as documented evidence',
    'Believing CSA can replace independent auditing',
    'Forgetting that ITGCs affect all application controls',
    'Not understanding the difference between test data and parallel simulation',
    'Overlooking that Detective Risk is auditor-controlled',
    'Missing the importance of root cause analysis (Cause in Five Cs)',
    'Assuming all sampling methods allow statistical projection',
  ],
};

export default CISA1_STUDY_GUIDE;
