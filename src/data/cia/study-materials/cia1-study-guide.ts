/**
 * CIA Part 1 Study Guide: Essentials of Internal Auditing
 * 
 * Comprehensive study guide based on IIA's 2024 CIA Exam Syllabus
 * Part 1 covers the mandatory elements of internal auditing
 * 
 * Exam Format: 125 questions, 2.5 hours
 */

export interface CIAStudyGuide {
  id: string;
  part: 'CIA1' | 'CIA2' | 'CIA3';
  title: string;
  subtitle: string;
  version: string;
  lastUpdated: string;
  examFormat: {
    questions: number;
    duration: string;
    passingScore: string;
  };
  domains: CIADomain[];
  studyPlan: StudyWeek[];
  examTips: string[];
}

export interface CIADomain {
  id: string;
  title: string;
  weight: string;
  overview: string;
  keyTopics: TopicDetail[];
  examTips: string[];
  commonMistakes: string[];
  practiceQuestions: string[];
}

export interface TopicDetail {
  name: string;
  description: string;
  keyPoints: string[];
  standards?: string[];
}

export interface StudyWeek {
  week: number;
  focus: string;
  topics: string[];
  hours: number;
  activities: string[];
}

export const CIA1_STUDY_GUIDE: CIAStudyGuide = {
  id: 'cia1-study-guide',
  part: 'CIA1',
  title: 'CIA Part 1: Essentials of Internal Auditing',
  subtitle: 'Comprehensive Study Guide',
  version: '2024-2025',
  lastUpdated: '2024-01-15',
  
  examFormat: {
    questions: 125,
    duration: '2.5 hours (150 minutes)',
    passingScore: 'Scaled score of 600 (out of 750)',
  },

  domains: [
    // =====================================================
    // Domain I: Foundations of Internal Auditing (40%)
    // =====================================================
    {
      id: 'cia1-domain-1',
      title: 'Domain I: Foundations of Internal Auditing',
      weight: '40%',
      overview: 'This is the HIGHEST WEIGHTED domain. It covers the mission, definition, core principles, Code of Ethics, and International Standards of internal auditing. Mastery of the IIA Standards is absolutely essential.',
      
      keyTopics: [
        {
          name: 'Mission of Internal Audit',
          description: 'To enhance and protect organizational value by providing risk-based and objective assurance, advice, and insight.',
          keyPoints: [
            'Enhance and protect organizational value',
            'Provide risk-based assurance',
            'Deliver objective advice and insight',
            'Support governance, risk, and control processes',
          ],
        },
        {
          name: 'Definition of Internal Auditing',
          description: 'An independent, objective assurance and consulting activity designed to add value and improve operations.',
          keyPoints: [
            'Independence and objectivity are foundational',
            'Two types of services: Assurance and Consulting',
            'Purpose: Add value and improve operations',
            'Systematic, disciplined approach',
            'Focus on risk management, control, and governance',
          ],
        },
        {
          name: 'Core Principles for Practice',
          description: 'The 10 Core Principles articulate internal audit effectiveness.',
          keyPoints: [
            '1. Demonstrates integrity',
            '2. Demonstrates competence and due professional care',
            '3. Is objective and free from undue influence',
            '4. Aligns with strategies, objectives, and risks',
            '5. Is appropriately positioned and adequately resourced',
            '6. Demonstrates quality and continuous improvement',
            '7. Communicates effectively',
            '8. Provides risk-based assurance',
            '9. Is insightful, proactive, and future-focused',
            '10. Promotes organizational improvement',
          ],
        },
        {
          name: 'Code of Ethics',
          description: 'Principles and Rules of Conduct governing internal auditor behavior.',
          keyPoints: [
            'Principles: Integrity, Objectivity, Confidentiality, Competency',
            'Each principle has specific Rules of Conduct',
            'Applies to all IIA members and certification holders',
            'Violations may result in disciplinary action',
          ],
          standards: ['Code of Ethics'],
        },
        {
          name: 'International Standards',
          description: 'Mandatory guidance for the professional practice of internal auditing.',
          keyPoints: [
            'Attribute Standards (1000-1322): Characteristics of organizations and individuals',
            'Performance Standards (2000-2600): Nature of IA activities and quality criteria',
            'Implementation Standards: Apply to specific types of engagements',
            'Mandatory vs. Recommended guidance distinction',
          ],
        },
        {
          name: 'Internal Audit Charter',
          description: 'Formal document defining IA purpose, authority, and responsibility.',
          keyPoints: [
            'Must be approved by the board',
            'Defines scope and authority of internal audit',
            'Establishes IA position within organization',
            'Authorizes access to records, personnel, and property',
            'Must be reviewed periodically',
          ],
          standards: ['Standard 1000'],
        },
      ],

      examTips: [
        'Memorize the Definition of Internal Auditing word-for-word',
        'Know all 10 Core Principles by heart',
        'Understand the difference between Principles and Rules of Conduct in the Code of Ethics',
        'Be able to identify which Standard applies to a given scenario',
        'The Charter must be approved by the BOARD, not just senior management',
      ],

      commonMistakes: [
        'Confusing organizational independence with individual objectivity',
        'Thinking consulting services don\'t require objectivity (they do)',
        'Not recognizing that the CAE reports FUNCTIONALLY to the board',
        'Forgetting that the audit charter requires board approval',
      ],

      practiceQuestions: [
        'Which element of the IA definition emphasizes adding value?',
        'What is the purpose of the internal audit charter?',
        'Which Core Principle relates to being risk-based?',
        'How do Attribute Standards differ from Performance Standards?',
      ],
    },

    // =====================================================
    // Domain II: Independence and Objectivity (15%)
    // =====================================================
    {
      id: 'cia1-domain-2',
      title: 'Domain II: Independence and Objectivity',
      weight: '15%',
      overview: 'Covers organizational independence, individual objectivity, and managing impairments. Critical for understanding audit quality and credibility.',

      keyTopics: [
        {
          name: 'Organizational Independence',
          description: 'Freedom from conditions threatening unbiased performance of IA responsibilities.',
          keyPoints: [
            'CAE reports functionally to the board',
            'CAE has direct and unrestricted access to senior management and the board',
            'Board approves: charter, risk-based plan, budget, decisions about CAE',
            'Independence allows internal audit to conduct work without interference',
          ],
          standards: ['Standard 1100', 'Standard 1110'],
        },
        {
          name: 'Individual Objectivity',
          description: 'Unbiased mental attitude allowing auditors to perform without compromise.',
          keyPoints: [
            'Avoid conflicts of interest',
            'Do not audit your own previous work',
            'Report impartially without influence',
            'Disclose potential impairments',
          ],
          standards: ['Standard 1120'],
        },
        {
          name: 'Impairments to Independence or Objectivity',
          description: 'Conditions that may prevent unbiased, objective audit work.',
          keyPoints: [
            'Personal impairments: relationships, biases, financial interests',
            'Organizational impairments: scope limitations, resource restrictions',
            'Must be disclosed to appropriate parties',
            'CAE determines if impairment can be managed or engagement reassigned',
          ],
          standards: ['Standard 1130'],
        },
        {
          name: 'Dual Reporting Relationship',
          description: 'CAE reports administratively and functionally to different parties.',
          keyPoints: [
            'Functional reporting: Board/Audit Committee (critical decisions)',
            'Administrative reporting: Senior management (daily operations)',
            'Functional reporting protects independence',
            'Administrative reporting enables resources and support',
          ],
        },
      ],

      examTips: [
        'Functional reporting is to the BOARD; administrative is to MANAGEMENT',
        'Objectivity is about the INDIVIDUAL; Independence is about the ACTIVITY',
        'Impairments must be DISCLOSED, not hidden or ignored',
        'Prior responsibility for an area creates objectivity impairment',
      ],

      commonMistakes: [
        'Thinking the CAE can report only to management',
        'Believing that impairments automatically disqualify an auditor',
        'Confusing scope limitations (organizational) with personal bias',
        'Not recognizing when to recuse from an engagement',
      ],

      practiceQuestions: [
        'What is the difference between functional and administrative reporting?',
        'An auditor previously managed the department being audited. What impairment exists?',
        'Who approves the internal audit charter?',
        'How should impairments be handled?',
      ],
    },

    // =====================================================
    // Domain III: Proficiency and Due Professional Care (18%)
    // =====================================================
    {
      id: 'cia1-domain-3',
      title: 'Domain III: Proficiency and Due Professional Care',
      weight: '18%',
      overview: 'Covers the competencies required of internal auditors and the care expected in performing engagements.',

      keyTopics: [
        {
          name: 'Proficiency',
          description: 'Knowledge, skills, and competencies needed to perform responsibilities.',
          keyPoints: [
            'Auditors must possess necessary knowledge and skills',
            'CAE must obtain competent advice if activity lacks expertise',
            'Continuing professional development required',
            'Understanding of fraud risks is mandatory (not detection expertise)',
          ],
          standards: ['Standard 1200', 'Standard 1210'],
        },
        {
          name: 'Due Professional Care',
          description: 'Care and skill expected of a reasonably prudent and competent auditor.',
          keyPoints: [
            'Consider scope, complexity, and materiality',
            'Consider probability and significance of issues',
            'Appropriate extent of work to achieve objectives',
            'Use of technology-based and other audit techniques',
            'Not infallibility—reasonable assurance, not absolute',
          ],
          standards: ['Standard 1220'],
        },
        {
          name: 'Continuing Professional Development',
          description: 'Ongoing enhancement of knowledge and skills.',
          keyPoints: [
            'Auditors must enhance knowledge through CPD',
            'CAE encourages professional development',
            'Certifications require ongoing CPE credits',
            'Includes technical, business, and soft skills',
          ],
          standards: ['Standard 1230'],
        },
        {
          name: 'Fraud Knowledge',
          description: 'Understanding fraud risks without being fraud investigation experts.',
          keyPoints: [
            'Must have sufficient knowledge to identify red flags',
            'Not required to have expertise of fraud examiners',
            'Must consider fraud risks in every engagement',
            'Recognize when to escalate or involve specialists',
          ],
        },
      ],

      examTips: [
        'Due professional care does NOT guarantee finding all errors or fraud',
        'Proficiency is about HAVING skills; due care is about USING them properly',
        'If expertise is lacking, the CAE obtains competent ADVICE or ASSISTANCE',
        'CPD is mandatory for maintaining certifications',
      ],

      commonMistakes: [
        'Thinking auditors must be fraud experts (just need sufficient knowledge)',
        'Believing due professional care means absolute assurance',
        'Ignoring the need for outside expertise when skills are lacking',
        'Underestimating the importance of technology proficiency',
      ],

      practiceQuestions: [
        'What should the CAE do when staff lacks specialized expertise?',
        'What is the difference between proficiency and due professional care?',
        'What level of fraud knowledge is required for internal auditors?',
        'Does due professional care guarantee detection of all fraud?',
      ],
    },

    // =====================================================
    // Domain IV: Quality Assurance and Improvement Program (7%)
    // =====================================================
    {
      id: 'cia1-domain-4',
      title: 'Domain IV: Quality Assurance and Improvement Program',
      weight: '7%',
      overview: 'Covers the QAIP requirements including internal and external assessments, conformance with Standards, and reporting results.',

      keyTopics: [
        {
          name: 'QAIP Requirements',
          description: 'CAE must develop and maintain a quality assurance and improvement program.',
          keyPoints: [
            'Covers all aspects of internal audit activity',
            'Includes internal and external assessments',
            'Enables evaluation of conformance with Standards and Code',
            'Assesses efficiency and effectiveness of IA activity',
          ],
          standards: ['Standard 1300'],
        },
        {
          name: 'Internal Assessments',
          description: 'Ongoing monitoring and periodic self-assessments of IA activity.',
          keyPoints: [
            'Ongoing monitoring: Real-time, built into policies and practices',
            'Periodic assessments: Self-assessments or by others with sufficient knowledge',
            'Conducted by persons with sufficient knowledge of IA practices',
            'Include feedback from audit clients and stakeholders',
          ],
          standards: ['Standard 1311'],
        },
        {
          name: 'External Assessments',
          description: 'External reviews required at least every 5 years.',
          keyPoints: [
            'Must be performed at least once every 5 years',
            'Qualified, independent assessor or assessment team',
            'Full external assessment or self-assessment with independent validation (SAIV)',
            'Board approves the external assessor',
          ],
          standards: ['Standard 1312'],
        },
        {
          name: 'Reporting on QAIP',
          description: 'CAE must communicate results to appropriate parties.',
          keyPoints: [
            'Report to senior management and the board',
            'Include scope, frequency, and results of assessments',
            'Report on conformance or nonconformance with Standards',
            '"Conforms with the International Standards" only if supported by QAIP results',
          ],
          standards: ['Standard 1320'],
        },
        {
          name: 'Nonconformance Disclosure',
          description: 'Required disclosure when nonconformance impacts the overall scope or operation of IA.',
          keyPoints: [
            'Disclose the nature of nonconformance',
            'Explain impact on audit activity',
            'Report to senior management and board',
            'Consider in overall assessment and opinions',
          ],
          standards: ['Standard 1322'],
        },
      ],

      examTips: [
        'External assessments: Required at least every FIVE years',
        'SAIV counts as external assessment if properly validated',
        'Internal assessments include BOTH ongoing monitoring AND periodic reviews',
        'BOARD approves the external assessor',
      ],

      commonMistakes: [
        'Thinking external assessments are done every year (every 5 years)',
        'Forgetting that self-assessment with validation (SAIV) qualifies as external',
        'Not recognizing ongoing monitoring as part of internal assessments',
        'Ignoring the requirement to report QAIP results to the board',
      ],

      practiceQuestions: [
        'How often must external quality assessments be performed?',
        'What is SAIV and when is it acceptable?',
        'Who must approve the external quality assessor?',
        'What are the two components of internal assessments?',
      ],
    },

    // =====================================================
    // Domain V: Governance, Risk Management, and Control (20%)
    // =====================================================
    {
      id: 'cia1-domain-5',
      title: 'Domain V: Governance, Risk Management, and Control',
      weight: '20%',
      overview: 'Covers IA\'s role in evaluating and contributing to governance, risk management, and internal control processes. Second highest weighted domain.',

      keyTopics: [
        {
          name: 'Governance',
          description: 'Processes ensuring organizations achieve objectives ethically and with accountability.',
          keyPoints: [
            'IA assesses and makes recommendations on governance',
            'Governance includes ethics, performance management, IT controls',
            'Board oversight and organizational accountability',
            'IA promotes ethical culture and values',
          ],
          standards: ['Standard 2110'],
        },
        {
          name: 'Risk Management',
          description: 'Processes for identifying, assessing, and managing risks.',
          keyPoints: [
            'IA evaluates effectiveness of risk management processes',
            'Risk management aligns with organizational objectives',
            'IA assesses whether significant risks are identified and assessed',
            'IA determines if risk responses are appropriate',
            'Risk appetite and tolerance consideration',
          ],
          standards: ['Standard 2120'],
        },
        {
          name: 'Internal Control',
          description: 'Processes ensuring objectives are achieved effectively and efficiently.',
          keyPoints: [
            'IA evaluates adequacy and effectiveness of controls',
            'Controls address operations, reporting, and compliance',
            'COSO framework commonly used',
            'Five components: Environment, Risk Assessment, Activities, Info/Comm, Monitoring',
          ],
          standards: ['Standard 2130'],
        },
        {
          name: 'Three Lines Model',
          description: 'Framework for coordinating risk management and control responsibilities.',
          keyPoints: [
            'First Line: Management (owns and manages risk)',
            'Second Line: Risk, Compliance, Quality (oversight and support)',
            'Third Line: Internal Audit (independent assurance)',
            'Governing body: Ultimate accountability and oversight',
          ],
        },
        {
          name: 'COSO Framework',
          description: 'Widely accepted internal control framework.',
          keyPoints: [
            '5 Components: Control Environment, Risk Assessment, Control Activities, Information & Communication, Monitoring',
            '17 Principles across the components',
            '3 Objectives: Operations, Reporting, Compliance',
            'Applies to entity level and significant units',
          ],
        },
      ],

      examTips: [
        'Know the Three Lines Model cold—frequently tested',
        'Understand COSO\'s 5 components and their relationships',
        'IA evaluates but doesn\'t manage risk (management owns risk)',
        'Governance includes ethics, IT controls, and performance management',
      ],

      commonMistakes: [
        'Thinking IA owns risk management (management does)',
        'Confusing the three lines with old "three lines of defense" terminology',
        'Forgetting that IA helps EVALUATE controls, not implement them',
        'Not understanding the distinction between governance and management',
      ],

      practiceQuestions: [
        'Which line is internal audit in the Three Lines Model?',
        'What are the five components of the COSO framework?',
        'Who owns and manages organizational risk?',
        'What does IA assess regarding governance?',
      ],
    },
  ],

  studyPlan: [
    {
      week: 1,
      focus: 'Domain I Part A: Mission, Definition, Core Principles',
      topics: ['Mission of IA', 'Definition of IA', '10 Core Principles', 'Mandatory vs Recommended Guidance'],
      hours: 15,
      activities: ['Read IIA Standards', 'Memorize definition', 'Create Core Principles flashcards', '50 MCQs'],
    },
    {
      week: 2,
      focus: 'Domain I Part B: Code of Ethics & Standards Structure',
      topics: ['Code of Ethics principles', 'Rules of Conduct', 'Attribute Standards overview', 'Performance Standards overview'],
      hours: 15,
      activities: ['Study Code of Ethics', 'Map Standards to scenarios', 'Practice identifying violations', '50 MCQs'],
    },
    {
      week: 3,
      focus: 'Domain II: Independence and Objectivity',
      topics: ['Organizational independence', 'Individual objectivity', 'Impairments', 'Dual reporting'],
      hours: 12,
      activities: ['Study Standards 1100-1130', 'Practice impairment scenarios', 'CAE reporting exercises', '40 MCQs'],
    },
    {
      week: 4,
      focus: 'Domain III: Proficiency and Due Care',
      topics: ['Proficiency requirements', 'Due professional care', 'CPD', 'Fraud knowledge'],
      hours: 12,
      activities: ['Study Standards 1200-1230', 'Competency gap analysis', 'Care vs guarantee distinction', '40 MCQs'],
    },
    {
      week: 5,
      focus: 'Domain IV: QAIP',
      topics: ['QAIP requirements', 'Internal assessments', 'External assessments', 'Reporting results'],
      hours: 8,
      activities: ['Study Standards 1300-1322', 'SAIV process', 'Nonconformance scenarios', '30 MCQs'],
    },
    {
      week: 6,
      focus: 'Domain V: Governance, Risk, Control',
      topics: ['Governance concepts', 'Risk management', 'Internal control', 'COSO framework', 'Three Lines Model'],
      hours: 15,
      activities: ['Study Standards 2110-2130', 'COSO components deep dive', 'Three Lines scenarios', '50 MCQs'],
    },
    {
      week: 7,
      focus: 'Integration and Practice',
      topics: ['Cross-domain scenarios', 'Complex multi-concept questions', 'Exam strategy'],
      hours: 15,
      activities: ['Full practice exams', 'Review weak areas', 'Time management practice', '100 MCQs'],
    },
    {
      week: 8,
      focus: 'Final Review',
      topics: ['High-weight domains review', 'Commonly tested concepts', 'Exam day preparation'],
      hours: 10,
      activities: ['Final practice exam', 'Quick reference review', 'Mental preparation', 'Rest before exam'],
    },
  ],

  examTips: [
    'Domain I (40%) deserves the most study time—nearly half the exam!',
    'Memorize the Definition of Internal Auditing verbatim',
    'Know all 10 Core Principles and how they apply',
    'Understand the difference between Attribute and Performance Standards',
    'CAE functional reporting to the BOARD is heavily tested',
    'External quality assessments every 5 years—not annually',
    'Three Lines Model: Management (1st), Risk/Compliance (2nd), IA (3rd)',
    'COSO has 5 components and 17 principles',
    'Due care means reasonable assurance, NOT a guarantee',
    'When in doubt on ethics, choose disclosure and transparency',
    'Read all answer choices before selecting—IIA loves "best answer" format',
    'Pace yourself: ~75 seconds per question',
  ],
};

export default CIA1_STUDY_GUIDE;
