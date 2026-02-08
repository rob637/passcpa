/**
 * CIA Part 3 Study Guide: Business Knowledge for Internal Auditing
 * 
 * Comprehensive study guide based on IIA's 2024 CIA Exam Syllabus
 * Part 3 covers business acumen required for internal auditors
 * 
 * Exam Format: 100 questions, 2 hours
 */

import { CIAStudyGuide } from './cia1-study-guide';

export const CIA3_STUDY_GUIDE: CIAStudyGuide = {
  id: 'cia3-study-guide',
  part: 'CIA3',
  title: 'CIA Part 3: Business Knowledge for Internal Auditing',
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
    // Domain I: Business Acumen (35%)
    // =====================================================
    {
      id: 'cia3-domain-1',
      title: 'Domain I: Business Acumen',
      weight: '35%',
      overview: 'This is the HIGHEST WEIGHTED domain. Covers organizational objectives, strategic planning, business processes, financial management, and organizational behavior.',

      keyTopics: [
        {
          name: 'Organizational Objectives, Behavior, and Performance',
          description: 'Understanding how organizations function and achieve their goals.',
          keyPoints: [
            'Mission, vision, and values',
            'Strategic planning and goal setting',
            'Performance measurement and KPIs',
            'Organizational behavior and culture',
            'Change management dynamics',
            'Stakeholder relationships',
          ],
        },
        {
          name: 'Organizational Structure and Business Processes',
          description: 'How organizations are structured and operate.',
          keyPoints: [
            'Common organizational structures (functional, divisional, matrix)',
            'Business process concepts and mapping',
            'Value chain analysis',
            'Process improvement methodologies',
            'Project management fundamentals',
            'Supply chain management',
          ],
        },
        {
          name: 'Data Analytics',
          description: 'Using data to support audit conclusions and business decisions.',
          keyPoints: [
            'Data analytics concepts and applications',
            'Descriptive, diagnostic, predictive, prescriptive analytics',
            'Data visualization principles',
            'Data quality and integrity',
            'Continuous auditing and monitoring',
            'Big data considerations',
          ],
        },
        {
          name: 'Financial Management',
          description: 'Understanding financial operations and analysis.',
          keyPoints: [
            'Financial statement analysis (balance sheet, income statement, cash flow)',
            'Ratio analysis (liquidity, solvency, profitability)',
            'Budgeting and forecasting',
            'Capital budgeting (NPV, IRR, payback)',
            'Working capital management',
            'Cost management and analysis',
          ],
        },
        {
          name: 'Managerial Accounting',
          description: 'Internal financial information for decision-making.',
          keyPoints: [
            'Cost behavior (fixed, variable, mixed)',
            'Cost allocation methods',
            'Activity-based costing',
            'Variance analysis',
            'Break-even analysis',
            'Transfer pricing',
          ],
        },
      ],

      examTips: [
        'Understand financial ratios and what they indicate',
        'Know the difference between descriptive and predictive analytics',
        'Understand organizational structures and their implications',
        'Capital budgeting: NPV > 0 = Accept; IRR > Cost of Capital = Accept',
        'Variance analysis: Favorable reduces costs or increases revenue',
      ],

      commonMistakes: [
        'Confusing liquidity with solvency ratios',
        'Not understanding when NPV and IRR give conflicting signals',
        'Forgetting that data analytics requires data quality',
        'Ignoring behavioral aspects of organizational change',
      ],

      practiceQuestions: [
        'What is the difference between mission and vision?',
        'How do you calculate the current ratio?',
        'What is the purpose of variance analysis?',
        'What does a positive NPV indicate?',
      ],
    },

    // =====================================================
    // Domain II: Information Security (25%)
    // =====================================================
    {
      id: 'cia3-domain-2',
      title: 'Domain II: Information Security',
      weight: '25%',
      overview: 'Covers IT governance, information security, cybersecurity, and technology controls. Critical for modern internal auditing.',

      keyTopics: [
        {
          name: 'IT Governance',
          description: 'Ensuring IT supports organizational objectives.',
          keyPoints: [
            'IT governance frameworks (COBIT)',
            'IT strategy alignment with business strategy',
            'IT policies and procedures',
            'IT investment and resource management',
            'IT performance measurement',
            'Roles and responsibilities',
          ],
        },
        {
          name: 'Information Security Concepts',
          description: 'Fundamentals of protecting organizational information.',
          keyPoints: [
            'CIA Triad: Confidentiality, Integrity, Availability',
            'Security policies and standards',
            'Access control principles (least privilege, separation of duties)',
            'Authentication and authorization',
            'Encryption and cryptography basics',
            'Security awareness training',
          ],
        },
        {
          name: 'Cybersecurity Risks and Controls',
          description: 'Managing cyber threats and implementing controls.',
          keyPoints: [
            'Common cyber threats (malware, phishing, ransomware)',
            'Vulnerability management',
            'Network security controls (firewalls, IDS/IPS)',
            'Endpoint protection',
            'Security incident management',
            'Business continuity and disaster recovery',
          ],
        },
        {
          name: 'Data Privacy',
          description: 'Protecting personal and sensitive information.',
          keyPoints: [
            'Privacy principles (collection limitation, use limitation)',
            'Regulatory requirements (GDPR, CCPA)',
            'Data classification',
            'Data lifecycle management',
            'Privacy impact assessments',
            'Breach notification requirements',
          ],
        },
        {
          name: 'Technology Controls',
          description: 'General and application controls for IT systems.',
          keyPoints: [
            'General controls (access, change management, operations)',
            'Application controls (input, processing, output)',
            'Logical access controls',
            'Change management processes',
            'System development life cycle (SDLC)',
            'Third-party and cloud security',
          ],
        },
      ],

      examTips: [
        'Memorize CIA Triad: Confidentiality, Integrity, Availability',
        'Know the difference between general and application controls',
        'COBIT is the dominant IT governance framework',
        'Least privilege: Access only to what is needed',
        'Separation of duties prevents fraud and errors',
      ],

      commonMistakes: [
        'Confusing authentication (who you are) with authorization (what you can do)',
        'Thinking encryption makes data safe if access controls are weak',
        'Ignoring third-party and cloud security responsibilities',
        'Underestimating social engineering risks',
      ],

      practiceQuestions: [
        'What are the three components of the CIA Triad?',
        'What is the difference between general and application controls?',
        'What is the principle of least privilege?',
        'What is the purpose of separation of duties?',
      ],
    },

    // =====================================================
    // Domain III: Information Technology (20%)
    // =====================================================
    {
      id: 'cia3-domain-3',
      title: 'Domain III: Information Technology',
      weight: '20%',
      overview: 'Covers IT systems, infrastructure, data management, and emerging technologies.',

      keyTopics: [
        {
          name: 'IT Systems and Infrastructure',
          description: 'Understanding technology environments and components.',
          keyPoints: [
            'Hardware and software components',
            'Operating systems and databases',
            'Network architectures and topologies',
            'Cloud computing models (IaaS, PaaS, SaaS)',
            'Virtualization concepts',
            'Internet of Things (IoT)',
          ],
        },
        {
          name: 'Data Management',
          description: 'Managing organizational data assets.',
          keyPoints: [
            'Database management systems',
            'Data governance and stewardship',
            'Data quality management',
            'Master data management',
            'Data warehousing and analytics',
            'Data backup and recovery',
          ],
        },
        {
          name: 'Emerging Technologies',
          description: 'Understanding impact of new technologies on auditing.',
          keyPoints: [
            'Artificial intelligence and machine learning',
            'Robotic process automation (RPA)',
            'Blockchain and distributed ledger technology',
            'Cloud computing risks and benefits',
            'Mobile technology risks',
            'Digital transformation',
          ],
        },
        {
          name: 'System Development',
          description: 'How systems are developed and maintained.',
          keyPoints: [
            'System Development Life Cycle (SDLC) phases',
            'Agile vs. Waterfall methodologies',
            'Testing and quality assurance',
            'Change management and version control',
            'User acceptance testing',
            'Post-implementation review',
          ],
        },
        {
          name: 'IT Auditing Concepts',
          description: 'Techniques for auditing technology environments.',
          keyPoints: [
            'IT general controls testing',
            'Application controls testing',
            'CAATs (Computer-Assisted Audit Techniques)',
            'Data analytics in IT audits',
            'Continuous auditing and monitoring',
            'IT audit documentation',
          ],
        },
      ],

      examTips: [
        'Know the cloud models: IaaS, PaaS, SaaS and their control implications',
        'SDLC phases: Planning, Analysis, Design, Development, Testing, Implementation, Maintenance',
        'Agile = Iterative; Waterfall = Sequential',
        'CAATs enhance audit efficiency and effectiveness',
        'Blockchain provides immutability, not privacy',
      ],

      commonMistakes: [
        'Confusing IaaS, PaaS, and SaaS control responsibilities',
        'Thinking cloud computing eliminates security responsibilities',
        'Not understanding how AI/ML affects audit procedures',
        'Ignoring the importance of change management in SDLC',
      ],

      practiceQuestions: [
        'What are the three main cloud computing service models?',
        'What are the phases of the SDLC?',
        'How does Agile differ from Waterfall development?',
        'What are CAATs and how are they used?',
      ],
    },

    // =====================================================
    // Domain IV: Financial Management (20%)
    // =====================================================
    {
      id: 'cia3-domain-4',
      title: 'Domain IV: Financial Management',
      weight: '20%',
      overview: 'Covers financial accounting, management accounting, and regulatory issues. Some overlap with Domain I but focused on accounting and finance specifics.',

      keyTopics: [
        {
          name: 'Financial Accounting and Finance',
          description: 'Understanding external financial reporting.',
          keyPoints: [
            'Generally Accepted Accounting Principles (GAAP)',
            'International Financial Reporting Standards (IFRS)',
            'Financial statement components',
            'Revenue recognition principles',
            'Asset valuation methods',
            'Liability and equity accounting',
          ],
        },
        {
          name: 'Financial Statement Analysis',
          description: 'Analyzing financial health and performance.',
          keyPoints: [
            'Horizontal and vertical analysis',
            'Ratio analysis categories (liquidity, leverage, efficiency, profitability)',
            'Common-size statements',
            'Trend analysis',
            'Benchmarking',
            'Cash flow analysis',
          ],
        },
        {
          name: 'Corporate Finance',
          description: 'Financial decision-making for organizations.',
          keyPoints: [
            'Capital structure decisions',
            'Cost of capital (WACC)',
            'Dividend policy',
            'Working capital management',
            'Risk management and hedging',
            'Mergers and acquisitions',
          ],
        },
        {
          name: 'Treasury Management',
          description: 'Managing cash and liquidity.',
          keyPoints: [
            'Cash management strategies',
            'Banking relationships',
            'Short-term financing options',
            'Investment management',
            'Foreign exchange management',
            'Interest rate management',
          ],
        },
        {
          name: 'Fraud Prevention and Detection',
          description: 'Understanding and addressing fraud risks.',
          keyPoints: [
            'Fraud Triangle: Pressure, Opportunity, Rationalization',
            'Types of fraud (asset misappropriation, corruption, financial statement fraud)',
            'Red flags and indicators',
            'Fraud prevention controls',
            'Fraud detection techniques',
            'Investigation considerations',
          ],
        },
      ],

      examTips: [
        'Know the Fraud Triangle cold—Pressure, Opportunity, Rationalization',
        'Understand key ratios: Current, Quick, Debt-to-Equity, ROE, ROA',
        'WACC = Weighted cost of debt and equity',
        'Cash flow statement has three sections: Operating, Investing, Financing',
        'Asset misappropriation is most common; financial statement fraud is most costly',
      ],

      commonMistakes: [
        'Confusing GAAP and IFRS requirements',
        'Not recognizing fraud red flags in scenarios',
        'Calculating ratios incorrectly under pressure',
        'Ignoring the operating cash flow section of cash flow statements',
      ],

      practiceQuestions: [
        'What are the three elements of the Fraud Triangle?',
        'How do you calculate the current ratio?',
        'What are the three types of fraud?',
        'What does WACC represent?',
      ],
    },
  ],

  studyPlan: [
    {
      week: 1,
      focus: 'Domain I Part A: Organizational Knowledge',
      topics: ['Organizational objectives', 'Strategic planning', 'Organizational structure', 'Business processes'],
      hours: 12,
      activities: ['Read organizational behavior materials', 'Structure analysis', 'Process mapping exercises', '40 MCQs'],
    },
    {
      week: 2,
      focus: 'Domain I Part B: Financial and Managerial Accounting',
      topics: ['Financial statements', 'Ratio analysis', 'Cost behavior', 'Budgeting', 'Capital budgeting'],
      hours: 15,
      activities: ['Financial statement analysis practice', 'Ratio calculations', 'Variance analysis', '50 MCQs'],
    },
    {
      week: 3,
      focus: 'Domain II: Information Security',
      topics: ['IT governance', 'CIA Triad', 'Access controls', 'Cybersecurity', 'Data privacy'],
      hours: 15,
      activities: ['Study COBIT basics', 'Security control mapping', 'Privacy regulation review', '50 MCQs'],
    },
    {
      week: 4,
      focus: 'Domain III: Information Technology',
      topics: ['IT systems', 'Cloud computing', 'SDLC', 'Emerging technologies', 'CAATs'],
      hours: 12,
      activities: ['Cloud model comparison', 'SDLC phase review', 'Technology trends research', '40 MCQs'],
    },
    {
      week: 5,
      focus: 'Domain IV: Financial Management and Fraud',
      topics: ['Corporate finance', 'Treasury', 'Fraud Triangle', 'Fraud types', 'Detection techniques'],
      hours: 12,
      activities: ['Finance calculations', 'Fraud scenario analysis', 'Red flag identification', '40 MCQs'],
    },
    {
      week: 6,
      focus: 'Integration and Practice',
      topics: ['Cross-domain scenarios', 'Time management', 'Exam strategy'],
      hours: 12,
      activities: ['Full practice exams', 'Weak area focus', 'Final review', '75 MCQs'],
    },
  ],

  examTips: [
    'Domain I (35%) is heaviest—strong focus on financial and organizational knowledge',
    'Know all major financial ratios and how to calculate them',
    'Memorize the Fraud Triangle: Pressure, Opportunity, Rationalization',
    'Understand cloud computing models and their control implications',
    'CIA Triad (Confidentiality, Integrity, Availability) is foundational for security',
    'SDLC phases are frequently tested',
    'Data analytics is increasingly important—know the four types',
    'COBIT is the primary IT governance framework',
    'Capital budgeting: NPV is generally preferred over IRR',
    'Variance analysis: Know favorable vs. unfavorable',
    'Pace yourself: ~72 seconds per question',
    'Part 3 is considered the most difficult by many candidates',
  ],
};

export default CIA3_STUDY_GUIDE;
