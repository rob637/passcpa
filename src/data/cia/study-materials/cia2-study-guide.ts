/**
 * CIA Part 2 Study Guide: Practice of Internal Auditing
 * 
 * Comprehensive study guide based on IIA's 2024 CIA Exam Syllabus
 * Part 2 covers the practical application of internal auditing
 * 
 * Exam Format: 100 questions, 2 hours
 */

import { CIAStudyGuide } from './cia1-study-guide';

export const CIA2_STUDY_GUIDE: CIAStudyGuide = {
  id: 'cia2-study-guide',
  part: 'CIA2',
  title: 'CIA Part 2: Practice of Internal Auditing',
  subtitle: 'Comprehensive Study Guide',
  version: '2024-2025',
  lastUpdated: '2024-01-15',
  
  examFormat: {
    questions: 100,
    duration: '2 hours (120 minutes)',
    passingScore: 'Scaled score of 600 (out of 750)',
  },

  domains: [
    // =====================================================
    // Domain I: Managing the Internal Audit Activity (20%)
    // =====================================================
    {
      id: 'cia2-domain-1',
      title: 'Domain I: Managing the Internal Audit Activity',
      weight: '20%',
      overview: 'Covers planning, policies, resource management, and coordination. The CAE\'s responsibilities for running an effective IA function.',

      keyTopics: [
        {
          name: 'Risk-Based Planning',
          description: 'CAE establishes risk-based plans to determine audit priorities.',
          keyPoints: [
            'Risk assessment informs the audit plan',
            'Plan aligned with organizational objectives',
            'Consider input from senior management and board',
            'Plans should be flexible and updated as needed',
            'Document basis for prioritization decisions',
          ],
          standards: ['Standard 2010'],
        },
        {
          name: 'Communication and Approval',
          description: 'Plans and resource requirements must be communicated and approved.',
          keyPoints: [
            'Communicate plans to senior management and board',
            'Communicate the impact of resource limitations',
            'Obtain approval of the audit plan',
            'Report changes to the plan as they occur',
          ],
          standards: ['Standard 2020'],
        },
        {
          name: 'Resource Management',
          description: 'CAE ensures appropriate, sufficient, and effectively deployed resources.',
          keyPoints: [
            'Appropriate: Right competencies for engagements',
            'Sufficient: Enough resources to execute the plan',
            'Effectively deployed: Optimal allocation and scheduling',
            'Consider use of external resources when needed',
            'Technology resources and data analytics capabilities',
          ],
          standards: ['Standard 2030'],
        },
        {
          name: 'Policies and Procedures',
          description: 'CAE establishes policies and procedures to guide the IA activity.',
          keyPoints: [
            'Form and content depend on size and structure of IA activity',
            'Document audit methodology and practices',
            'Include work paper standards and retention',
            'Address confidentiality and information security',
          ],
          standards: ['Standard 2040'],
        },
        {
          name: 'Coordination and Reliance',
          description: 'CAE coordinates with internal and external assurance providers.',
          keyPoints: [
            'Avoid duplication of efforts',
            'Ensure adequate coverage of risks',
            'External auditors: Coordinate for efficiency',
            'Other assurance providers: Consider combined assurance',
            'May rely on work of others if appropriate',
          ],
          standards: ['Standard 2050'],
        },
        {
          name: 'Reporting to Board and Management',
          description: 'CAE reports periodically to senior management and the board.',
          keyPoints: [
            'Report on purpose, authority, responsibility, and performance',
            'Include significant risk exposures and control issues',
            'Report on audit plan status and emerging issues',
            'Escalate critical issues appropriately',
          ],
          standards: ['Standard 2060'],
        },
      ],

      examTips: [
        'Risk-based planning is fundamental—know Standard 2010 well',
        'Resource limitations must be communicated to the board',
        'Coordination with external auditors reduces duplication',
        'CAE reports to BOTH senior management AND the board',
      ],

      commonMistakes: [
        'Thinking the audit plan is static (it should be flexible)',
        'Forgetting to communicate resource limitation impacts',
        'Not coordinating with other assurance providers',
        'Underestimating the importance of policies and procedures',
      ],

      practiceQuestions: [
        'What is the basis for risk-based audit planning?',
        'Who approves the internal audit plan?',
        'What should the CAE do when resources are limited?',
        'Why should IA coordinate with external auditors?',
      ],
    },

    // =====================================================
    // Domain II: Planning the Engagement (20%)
    // =====================================================
    {
      id: 'cia2-domain-2',
      title: 'Domain II: Planning the Engagement',
      weight: '20%',
      overview: 'Covers engagement planning including objectives, scope, resource allocation, and work programs.',

      keyTopics: [
        {
          name: 'Planning Considerations',
          description: 'Auditors must develop and document engagement planning.',
          keyPoints: [
            'Objectives and scope of the engagement',
            'Allocation of engagement resources',
            'Engagement work program',
            'Consider objectives, risks, and controls in the area',
            'Identify significant prior engagements',
          ],
          standards: ['Standard 2200'],
        },
        {
          name: 'Engagement Objectives',
          description: 'Objectives reflect assessment of risks and controls.',
          keyPoints: [
            'Develop objectives for each engagement',
            'Preliminary risk assessment informs objectives',
            'Consider probability of significant errors, fraud, or noncompliance',
            'Consulting engagement objectives address governance, risk, and control',
          ],
          standards: ['Standard 2210'],
        },
        {
          name: 'Engagement Scope',
          description: 'Scope must be sufficient to achieve engagement objectives.',
          keyPoints: [
            'Consider systems, records, personnel, and physical properties',
            'Include relevant systems, including third parties',
            'Document any scope limitations',
            'For consulting, scope is agreed with client',
          ],
          standards: ['Standard 2220'],
        },
        {
          name: 'Engagement Resource Allocation',
          description: 'Determine and allocate appropriate resources for the engagement.',
          keyPoints: [
            'Based on nature, complexity, and time constraints',
            'Mix of knowledge, skills, and competencies',
            'Consider use of technology-based tools',
            'May use external resources if needed',
          ],
          standards: ['Standard 2230'],
        },
        {
          name: 'Engagement Work Program',
          description: 'Develop work programs that achieve engagement objectives.',
          keyPoints: [
            'Document procedures for identifying, analyzing, evaluating, and recording',
            'Work program is approved before implementation',
            'Modifications require appropriate approval',
            'Includes sampling methodology and criteria',
          ],
          standards: ['Standard 2240'],
        },
      ],

      examTips: [
        'Engagement objectives are based on RISK ASSESSMENT',
        'Scope limitations must be documented and communicated',
        'Work programs require approval BEFORE execution',
        'Resource allocation considers knowledge, skills, and competencies',
      ],

      commonMistakes: [
        'Developing objectives without risk assessment',
        'Not documenting scope limitations',
        'Beginning work before the program is approved',
        'Ignoring third-party systems in scope determination',
      ],

      practiceQuestions: [
        'What informs the development of engagement objectives?',
        'What should be done if scope is limited by management?',
        'Who approves the engagement work program?',
        'What factors determine resource allocation?',
      ],
    },

    // =====================================================
    // Domain III: Performing the Engagement (40%)
    // =====================================================
    {
      id: 'cia2-domain-3',
      title: 'Domain III: Performing the Engagement',
      weight: '40%',
      overview: 'This is the HIGHEST WEIGHTED domain. Covers information gathering, analysis, documentation, and supervision. Master evidence and testing concepts.',

      keyTopics: [
        {
          name: 'Identifying Information',
          description: 'Auditors must identify sufficient, reliable, relevant, and useful information.',
          keyPoints: [
            'Sufficient: Factual, adequate, and convincing',
            'Reliable: Obtain through appropriate techniques',
            'Relevant: Supports findings and recommendations',
            'Useful: Helps organization meet objectives',
            'Information types: Physical, testimonial, documentary, analytical',
          ],
          standards: ['Standard 2310'],
        },
        {
          name: 'Analysis and Evaluation',
          description: 'Conclusions and engagement results based on appropriate analyses.',
          keyPoints: [
            'Apply audit techniques appropriately',
            'Data analytics and technology tools',
            'Root cause analysis for significant findings',
            'Compare findings to criteria (Standards, policies, benchmarks)',
          ],
          standards: ['Standard 2320'],
        },
        {
          name: 'Documenting Information',
          description: 'Work papers document engagement information.',
          keyPoints: [
            'Document sufficient information to support conclusions',
            'Work papers are property of the organization',
            'Retention policies must comply with requirements',
            'Control access and confidentiality',
            'CAE controls work paper access',
          ],
          standards: ['Standard 2330'],
        },
        {
          name: 'Engagement Supervision',
          description: 'Engagements must be properly supervised.',
          keyPoints: [
            'Ensure objectives are achieved',
            'Ensure quality of work',
            'Develop staff through supervision',
            'Level of supervision varies with proficiency and experience',
            'Document evidence of supervision',
          ],
          standards: ['Standard 2340'],
        },
        {
          name: 'Audit Evidence Types',
          description: 'Different types of evidence used in internal auditing.',
          keyPoints: [
            'Physical: Observation, inspection, inventory counts',
            'Testimonial: Interviews, inquiries, confirmations',
            'Documentary: Documents, records, written evidence',
            'Analytical: Comparisons, ratios, trend analysis',
            'Most reliable: Physical and documentary from independent sources',
          ],
        },
        {
          name: 'Sampling Techniques',
          description: 'Statistical and judgmental sampling approaches.',
          keyPoints: [
            'Statistical: Random, systematic, stratified',
            'Non-statistical/Judgmental: Based on auditor judgment',
            'Sample size depends on confidence level and risk',
            'Document sampling methodology and rationale',
            'Evaluate results and project to population',
          ],
        },
        {
          name: 'Analytical Procedures',
          description: 'Evaluating information through analysis of relationships.',
          keyPoints: [
            'Trend analysis: Compare over time periods',
            'Ratio analysis: Compare relationships',
            'Reasonableness tests: Expected vs. actual',
            'Variance analysis: Actual vs. budget',
            'Used in planning, fieldwork, and review',
          ],
        },
      ],

      examTips: [
        'Know the SRRU criteria: Sufficient, Reliable, Relevant, Useful',
        'Physical and documentary evidence from independent sources is MOST reliable',
        'Work papers are property of the ORGANIZATION, not the auditor',
        'CAE controls access to work papers',
        'Supervision intensity varies with staff experience',
      ],

      commonMistakes: [
        'Thinking work papers belong to the auditor',
        'Relying solely on testimonial evidence',
        'Not documenting the basis for conclusions',
        'Inadequate supervision of less experienced staff',
      ],

      practiceQuestions: [
        'What are the four characteristics of suitable audit information?',
        'Which type of evidence is generally most reliable?',
        'Who controls access to internal audit work papers?',
        'How does supervision intensity vary?',
      ],
    },

    // =====================================================
    // Domain IV: Communicating Engagement Results (20%)
    // =====================================================
    {
      id: 'cia2-domain-4',
      title: 'Domain IV: Communicating Engagement Results',
      weight: '20%',
      overview: 'Covers communication quality, content, dissemination, and follow-up processes.',

      keyTopics: [
        {
          name: 'Communication Criteria',
          description: 'Communications must be accurate, objective, clear, concise, constructive, complete, and timely.',
          keyPoints: [
            'Accurate: Free from errors and distortions',
            'Objective: Fair, impartial, unbiased',
            'Clear: Easily understood, logical',
            'Concise: To the point, avoids unnecessary detail',
            'Constructive: Helpful, leads to improvement',
            'Complete: Contains all significant information',
            'Timely: Opportune and expedient',
          ],
          standards: ['Standard 2420'],
        },
        {
          name: 'Quality of Communications',
          description: 'Engagement communications must meet quality criteria.',
          keyPoints: [
            'Apply the COCCCC+T criteria',
            'Use appropriate tone and language',
            'Consider the audience',
            'Visual aids where appropriate',
          ],
          standards: ['Standard 2420'],
        },
        {
          name: 'Communication Content',
          description: 'What to include in engagement communications.',
          keyPoints: [
            'Objectives, scope, and results',
            'Applicable conclusions and recommendations',
            'Acknowledgment of satisfactory performance',
            'Action plans with responsible parties and dates',
            'Overall opinion when appropriate',
          ],
          standards: ['Standard 2410'],
        },
        {
          name: 'Errors and Omissions',
          description: 'Process for correcting significant errors or omissions.',
          keyPoints: [
            'If discovered after communication is issued',
            'Communicate corrected information to all recipients',
            'Document the correction appropriately',
          ],
          standards: ['Standard 2421'],
        },
        {
          name: 'Disseminating Results',
          description: 'CAE communicates results to appropriate parties.',
          keyPoints: [
            'Consider who needs the information',
            'Confidentiality and sensitivity considerations',
            'Prior to release, review and approve the communication',
            'Consider communicating outside the organization if required',
          ],
          standards: ['Standard 2440'],
        },
        {
          name: 'Monitoring Progress',
          description: 'CAE establishes a follow-up process.',
          keyPoints: [
            'Monitor and ensure management actions are implemented',
            'Track status of corrective actions',
            'Escalate when management accepts unacceptable risk',
            'Report status to senior management and board',
          ],
          standards: ['Standard 2500'],
        },
        {
          name: 'Communicating Acceptance of Risks',
          description: 'When management accepts a level of risk that may be unacceptable.',
          keyPoints: [
            'First discuss with management',
            'If not resolved, report to the board',
            'The decision to accept risk belongs to management/board',
            'IA role is to ensure decision makers are informed',
          ],
          standards: ['Standard 2600'],
        },
      ],

      examTips: [
        'Memorize COCCCC+T: Clear, Objective, Concise, Constructive, Complete, Correct (Accurate), Timely',
        'Errors after issuance require communication to ALL original recipients',
        'Follow-up is required—don\'t just issue the report and forget',
        'Unacceptable risk acceptance must be escalated to the BOARD',
      ],

      commonMistakes: [
        'Forgetting to include positive observations (satisfactory performance)',
        'Not following up on corrective actions',
        'Failing to escalate when management accepts excessive risk',
        'Issuing reports without reviewing for quality criteria',
      ],

      practiceQuestions: [
        'What are the seven criteria for effective communication?',
        'What should be done if an error is discovered after report issuance?',
        'Who is responsible for deciding whether to accept risk?',
        'What must the CAE do if management accepts unacceptable risk?',
      ],
    },
  ],

  studyPlan: [
    {
      week: 1,
      focus: 'Domain I: Managing the IA Activity',
      topics: ['Risk-based planning', 'Resource management', 'Policies', 'Coordination', 'Reporting'],
      hours: 12,
      activities: ['Study Standards 2000-2060', 'Create planning scenarios', 'Resource allocation exercises', '40 MCQs'],
    },
    {
      week: 2,
      focus: 'Domain II: Planning the Engagement',
      topics: ['Engagement objectives', 'Scope determination', 'Resource allocation', 'Work programs'],
      hours: 12,
      activities: ['Study Standards 2200-2240', 'Practice developing objectives', 'Create sample work programs', '40 MCQs'],
    },
    {
      week: 3,
      focus: 'Domain III Part A: Evidence and Information',
      topics: ['SRRU criteria', 'Evidence types', 'Sampling techniques', 'Analytical procedures'],
      hours: 15,
      activities: ['Study Standards 2310-2320', 'Practice evidence evaluation', 'Sampling exercises', '50 MCQs'],
    },
    {
      week: 4,
      focus: 'Domain III Part B: Documentation and Supervision',
      topics: ['Work papers', 'Documentation standards', 'Supervision requirements', 'Quality control'],
      hours: 15,
      activities: ['Study Standards 2330-2340', 'Work paper exercises', 'Supervision scenarios', '50 MCQs'],
    },
    {
      week: 5,
      focus: 'Domain IV: Communicating Results',
      topics: ['COCCCC+T criteria', 'Report content', 'Dissemination', 'Follow-up'],
      hours: 12,
      activities: ['Study Standards 2400-2600', 'Practice report writing', 'Follow-up process design', '40 MCQs'],
    },
    {
      week: 6,
      focus: 'Integration and Practice',
      topics: ['Cross-domain scenarios', 'Full engagement lifecycle', 'Complex applications'],
      hours: 12,
      activities: ['Full practice exams', 'Case study analysis', 'Weak area review', '75 MCQs'],
    },
  ],

  examTips: [
    'Domain III (40%) is heaviest—focus on evidence and documentation',
    'Know SRRU: Sufficient, Reliable, Relevant, Useful',
    'Memorize COCCCC+T for communication quality',
    'Work papers belong to the organization, not the auditor',
    'Follow-up is mandatory, not optional',
    'Risk-based planning is foundational to audit management',
    'Escalate unacceptable risk to the board',
    'Supervision varies by staff experience level',
    'External auditor coordination reduces duplication',
    'Pace yourself: ~72 seconds per question',
  ],
};

export default CIA2_STUDY_GUIDE;
