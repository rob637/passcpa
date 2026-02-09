/**
 * CISA (Certified Information Systems Auditor) Course Configuration
 * 
 * ISACA CISA Exam prep course
 * Based on the latest CISA Job Practice Areas (2024)
 * 
 * Exam Format: 150 MCQ questions, 4 hours, 5 domains
 * Passing Score: 450 out of 800 scaled score
 */

import { Course } from '../../types/course';
import { PASS_GUARANTEE_SUMMARY } from './pass-guarantee';

// Preserve these types for UI components that expect them
export type CISASectionId = 'CISA1' | 'CISA2' | 'CISA3' | 'CISA4' | 'CISA5';

export const CISA_SECTION_IDS: CISASectionId[] = ['CISA1', 'CISA2', 'CISA3', 'CISA4', 'CISA5'];

// Legacy interface for backward compatibility with UI components
export interface CISASectionConfig {
  id: CISASectionId;
  title: string;
  shortTitle: string;
  description: string;
  weight: number;
  questionCount: number;
  color: string;
  icon: string;
  topics: string[];
}

// Legacy section config for UI components
export const CISA_SECTION_CONFIG: Record<CISASectionId, CISASectionConfig> = {
  CISA1: {
    id: 'CISA1',
    title: 'Domain 1: Information Systems Auditing Process',
    shortTitle: 'Auditing Process',
    description: 'Providing audit services in accordance with IS audit standards to assist the organization in protecting and controlling information systems.',
    weight: 18,
    questionCount: 27, // 18% of 150
    color: 'bg-indigo-500',
    icon: 'FileSearch',
    topics: [
      'IS Audit Standards, Guidelines, and Codes of Ethics',
      'Business Processes and Their Dependencies',
      'Types of Controls (Preventive, Detective, Corrective)',
      'Risk-Based Audit Planning',
      'Audit Objectives and Scope',
      'Audit Resource Management',
      'Audit Evidence Collection Techniques',
      'Computer-Assisted Audit Techniques (CAATs)',
      'Data Analytics in Auditing',
      'Continuous Auditing and Monitoring',
      'Audit Sampling Methodologies',
      'Audit Documentation Requirements',
      'Audit Findings and Recommendations',
      'Audit Report Structure and Content',
      'Communication with Stakeholders',
      'Follow-up and Remediation Tracking',
      'Quality Assurance and Improvement Program'
    ]
  },
  CISA2: {
    id: 'CISA2',
    title: 'Domain 2: Governance and Management of IT',
    shortTitle: 'IT Governance',
    description: 'Assurance that necessary leadership, organizational structures and processes are in place to achieve objectives and to support the organization\'s strategy.',
    weight: 18,
    questionCount: 27, // 18% of 150
    color: 'bg-blue-500',
    icon: 'Building',
    topics: [
      'IT Governance Frameworks (COBIT, ITIL)',
      'IT Strategy and Alignment',
      'Organizational Structure and Roles',
      'IT Policies, Standards, and Procedures',
      'Enterprise Architecture',
      'IT Resource Management',
      'IT Portfolio Management',
      'Vendor and Third-Party Management',
      'IT Performance Measurement (KPIs, KRIs)',
      'IT Risk Management Frameworks',
      'Risk Assessment Methodologies',
      'Risk Treatment and Response Options',
      'Regulatory and Compliance Requirements',
      'IT Audit Committee and Board Oversight',
      'Information Security Governance',
      'Business Case Development',
      'IT Investment Management'
    ]
  },
  CISA3: {
    id: 'CISA3',
    title: 'Domain 3: IS Acquisition, Development & Implementation',
    shortTitle: 'Acquisition & Dev',
    description: 'Assurance that the practices for the acquisition, development, testing and implementation of information systems meet the organization\'s strategies and objectives.',
    weight: 12,
    questionCount: 18, // 12% of 150
    color: 'bg-cyan-500',
    icon: 'Code',
    topics: [
      'Project Governance and Management',
      'Project Life Cycle Methodologies',
      'Agile and DevOps Practices',
      'Requirements Analysis and Management',
      'Feasibility Studies and Business Cases',
      'Vendor Selection and Contracting',
      'Software Development Life Cycle (SDLC)',
      'Application Development Controls',
      'Secure Coding Practices',
      'Code Review and Static Analysis',
      'Testing Methodologies (Unit, Integration, UAT)',
      'Quality Assurance Processes',
      'Data Conversion and Migration',
      'System Implementation and Deployment',
      'Change and Release Management',
      'Post-Implementation Review',
      'Cloud Computing and Virtualization',
      'Infrastructure as Code',
      'API Security and Integration'
    ]
  },
  CISA4: {
    id: 'CISA4',
    title: 'Domain 4: IS Operations and Business Resilience',
    shortTitle: 'Operations & Resilience',
    description: 'Assurance that IT operations and support processes ensure the required level of service and security.',
    weight: 26,
    questionCount: 39, // 26% of 150
    color: 'bg-teal-500',
    icon: 'Server',
    topics: [
      'IT Service Management (ITSM)',
      'Service Level Agreements (SLAs)',
      'Incident Management',
      'Problem Management',
      'Change Management',
      'Configuration Management',
      'IT Asset Management',
      'Capacity and Performance Management',
      'Systems and Infrastructure Operations',
      'Database Administration',
      'Network Administration',
      'Job Scheduling and Batch Processing',
      'Help Desk and End-User Support',
      'Business Impact Analysis (BIA)',
      'Business Continuity Planning (BCP)',
      'Disaster Recovery Planning (DRP)',
      'Backup and Recovery Strategies',
      'High Availability and Redundancy',
      'Crisis Management and Communication',
      'Testing DR/BCP Plans',
      'Third-Party Resilience Requirements'
    ]
  },
  CISA5: {
    id: 'CISA5',
    title: 'Domain 5: Protection of Information Assets',
    shortTitle: 'InfoSec',
    description: 'Assurance that the organization\'s security policies, standards, procedures and controls ensure the confidentiality, integrity and availability of information assets.',
    weight: 26,
    questionCount: 39, // 26% of 150
    color: 'bg-emerald-500',
    icon: 'Shield',
    topics: [
      'Information Security Program Management',
      'Security Policies and Standards',
      'Security Awareness and Training',
      'Data Classification and Handling',
      'Identity and Access Management (IAM)',
      'Authentication Methods (MFA, SSO, Biometrics)',
      'Authorization and Access Control Models',
      'Privileged Access Management',
      'Network Security Controls',
      'Firewalls, IDS/IPS, and SIEM',
      'Endpoint Security',
      'Mobile Device Security',
      'Encryption and Cryptographic Controls',
      'Public Key Infrastructure (PKI)',
      'Application Security',
      'Web Application Firewalls (WAF)',
      'Vulnerability Assessment and Penetration Testing',
      'Security Monitoring and Logging',
      'Incident Response',
      'Forensic Investigation',
      'Physical and Environmental Security',
      'Privacy and Data Protection (GDPR, etc.)',
      'Cloud Security Controls',
      'Zero Trust Architecture'
    ]
  }
};

// Standard Course configuration following the platform pattern
export const CISA_COURSE: Course = {
  id: 'cisa',
  name: 'CISA Exam Review',
  shortName: 'CISA',
  description: 'Comprehensive preparation for the ISACA Certified Information Systems Auditor Examination',
  passingScore: 450, // Scaled score out of 800
  totalTime: 240, // 4 hours (240 minutes)
  
  sections: [
    {
      id: 'CISA1',
      name: 'Domain 1: Information Systems Auditing Process',
      shortName: 'Audit',
      weight: '18%',
      questionCount: 27,
      timeAllowed: 43, // Proportional to weight
      questionTypes: ['mcq'],
      blueprintAreas: [
        {
          id: 'CISA1-A',
          name: 'IS Audit Process',
          weight: '10%',
          topics: [
            'IS Audit Standards and Guidelines',
            'Risk-Based Audit Planning',
            'Audit Objectives and Scope',
            'Audit Resource Management',
          ]
        },
        {
          id: 'CISA1-B',
          name: 'Audit Execution',
          weight: '8%',
          topics: [
            'Audit Evidence Collection',
            'CAATs and Data Analytics',
            'Sampling Methodologies',
            'Audit Documentation',
            'Findings and Recommendations',
          ]
        },
      ]
    },
    {
      id: 'CISA2',
      name: 'Domain 2: Governance and Management of IT',
      shortName: 'Gov',
      weight: '18%',
      questionCount: 27,
      timeAllowed: 43,
      questionTypes: ['mcq'],
      blueprintAreas: [
        {
          id: 'CISA2-A',
          name: 'IT Governance',
          weight: '9%',
          topics: [
            'IT Governance Frameworks (COBIT, ITIL)',
            'IT Strategy and Business Alignment',
            'Organizational Structure and Roles',
            'IT Policies and Standards',
          ]
        },
        {
          id: 'CISA2-B',
          name: 'IT Risk Management',
          weight: '9%',
          topics: [
            'Risk Assessment Methodologies',
            'Risk Treatment Options',
            'Regulatory Compliance',
            'Third-Party Risk Management',
          ]
        },
      ]
    },
    {
      id: 'CISA3',
      name: 'Domain 3: IS Acquisition, Development & Implementation',
      shortName: 'Dev',
      weight: '12%',
      questionCount: 18,
      timeAllowed: 29,
      questionTypes: ['mcq'],
      blueprintAreas: [
        {
          id: 'CISA3-A',
          name: 'Project Management',
          weight: '6%',
          topics: [
            'Project Governance',
            'SDLC Methodologies',
            'Agile and DevOps',
            'Requirements Management',
          ]
        },
        {
          id: 'CISA3-B',
          name: 'System Implementation',
          weight: '6%',
          topics: [
            'Secure Coding Practices',
            'Testing Methodologies',
            'Change and Release Management',
            'Post-Implementation Review',
          ]
        },
      ]
    },
    {
      id: 'CISA4',
      name: 'Domain 4: IS Operations and Business Resilience',
      shortName: 'Ops',
      weight: '26%',
      questionCount: 39,
      timeAllowed: 62,
      questionTypes: ['mcq'],
      blueprintAreas: [
        {
          id: 'CISA4-A',
          name: 'IT Operations',
          weight: '13%',
          topics: [
            'IT Service Management (ITSM)',
            'Service Level Agreements',
            'Incident and Problem Management',
            'Change and Configuration Management',
            'Infrastructure Operations',
          ]
        },
        {
          id: 'CISA4-B',
          name: 'Business Resilience',
          weight: '13%',
          topics: [
            'Business Impact Analysis (BIA)',
            'Business Continuity Planning (BCP)',
            'Disaster Recovery Planning (DRP)',
            'Backup and Recovery Strategies',
            'Testing BCP/DRP Plans',
          ]
        },
      ]
    },
    {
      id: 'CISA5',
      name: 'Domain 5: Protection of Information Assets',
      shortName: 'Sec',
      weight: '26%',
      questionCount: 39,
      timeAllowed: 62,
      questionTypes: ['mcq'],
      blueprintAreas: [
        {
          id: 'CISA5-A',
          name: 'Information Security Management',
          weight: '13%',
          topics: [
            'Security Program Management',
            'Security Policies and Standards',
            'Security Awareness and Training',
            'Data Classification and Handling',
          ]
        },
        {
          id: 'CISA5-B',
          name: 'Security Controls',
          weight: '13%',
          topics: [
            'Identity and Access Management (IAM)',
            'Network Security Controls',
            'Encryption and Cryptography',
            'Vulnerability Management',
            'Incident Response',
          ]
        },
      ]
    },
  ],
  
  metadata: {
    examProvider: 'PSI (ISACA)',
    websiteUrl: 'https://www.isaca.org/credentialing/cisa',
    averageStudyHours: 200,
    difficultyRating: 4,
    careerPaths: ['IS Auditor', 'IT Security Analyst', 'Compliance Manager', 'IT Risk Manager'],
  },
  
  features: {
    hasTBS: false,
    hasWrittenCommunication: false,
    hasEssay: false,
    hasDataInsights: false,
  },
  
  examOverview: {
    title: 'Why Become CISA Certified?',
    description: 'The Certified Information Systems Auditor (CISA) from ISACA is the world\'s leading certification for IS audit professionals. CISA demonstrates your ability to assess vulnerabilities, report on compliance, and implement controls.',
    benefits: [
      'Most recognized IT audit certification globally',
      'Required or preferred for many IT audit positions',
      'Validates expertise in IS security, audit, and control',
      'Average salary premium of 20-35%',
      'Recognized by DoD for IAT/IAM Level III positions',
    ],
    careerOpportunities: [
      'IS/IT Auditor',
      'IT Security Manager',
      'Compliance Manager/Officer',
      'IT Risk Manager',
      'Information Security Analyst',
      'Security Consultant',
      'IT Governance Specialist',
    ],
    averageSalary: '$90,000 - $150,000+ (senior roles $130K+)',
    examFormat: '1 exam (150 questions), 4 hours, 100% MCQ',
  },
  
  examStrategy: {
    title: 'CISA Exam Success Strategies',
    keyStrategies: [
      { title: 'Think Like an IS Auditor', description: 'The exam tests what an IS auditor should do FIRST, what is MOST important, and the BEST answer - not just what\'s technically correct.' },
      { title: 'Understand ISACA\'s Mindset', description: 'ISACA emphasizes risk-based approaches. When in doubt, choose the answer that addresses risk or follows audit standards.' },
      { title: 'Master Domain 1', description: 'Information Systems Auditing Process (21%) is foundational - understand audit planning, execution, and reporting thoroughly.' },
      { title: 'Know the Frameworks', description: 'COBIT, ITIL, ISO 27001 - understand when each applies and key concepts from each.' },
    ],
    studyTips: [
      'Use the CISA Review Manual as your primary source',
      'Focus on ISACA\'s terminology and definitions',
      'Practice with official ISACA questions - they test reasoning, not memorization',
      'Review the glossary - ISACA\'s definitions may differ from industry usage',
      'Join ISACA study groups or local chapters',
    ],
    commonMistakes: [
      'Choosing technically correct answers over audit-focused answers',
      'Not understanding "FIRST" and "MOST" qualifiers in questions',
      'Underestimating governance and management domains',
      'Ignoring the work experience requirement (5 years, some substitutions allowed)',
      'Rushing through the 4-hour exam',
    ],
    timeManagement: 'Plan 150-200 study hours. Schedule exam after 2-4 months of dedicated study.',
  },
  
  passGuarantee: {
    enabled: true,
    headline: PASS_GUARANTEE_SUMMARY.headline,
    bulletPoints: PASS_GUARANTEE_SUMMARY.bulletPoints,
    termsLink: PASS_GUARANTEE_SUMMARY.termsLink,
  },
};

/**
 * Legacy export for backward compatibility with existing UI components
 */
export const CISA_SECTIONS: CISASectionConfig[] = CISA_SECTION_IDS.map(id => CISA_SECTION_CONFIG[id]);

/**
 * Get CISA section by ID (legacy helper)
 */
export const getCISASection = (sectionId: CISASectionId): CISASectionConfig | undefined => {
  return CISA_SECTION_CONFIG[sectionId];
};

export default CISA_COURSE;
