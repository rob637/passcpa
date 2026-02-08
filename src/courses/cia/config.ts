/**
 * CIA (Certified Internal Auditor) Course Configuration
 * 
 * IIA CIA Exam prep course
 * Based on 2025-2026 CIA Content Specification Outlines
 */

import { Course } from '../../types/course';

export type CIASectionId = 'CIA1' | 'CIA2' | 'CIA3';

export const CIA_SECTIONS: CIASectionId[] = ['CIA1', 'CIA2', 'CIA3'];

export const CIA_SECTION_CONFIG: Record<CIASectionId, { 
  id: CIASectionId;
  name: string; 
  shortName: string; 
  examCode: string; 
  color: string;
  icon: string;
  questionsCount: number;
}> = {
  CIA1: {
    id: 'CIA1',
    name: 'Part 1: Essentials of Internal Auditing',
    shortName: 'Essentials',
    examCode: 'CIA-I',
    color: '#fbbf24', // Amber-400
    icon: 'ShieldCheck',
    questionsCount: 125
  },
  CIA2: {
    id: 'CIA2',
    name: 'Part 2: Practice of Internal Auditing',
    shortName: 'Practice',
    examCode: 'CIA-II',
    color: '#f59e0b', // Amber-500
    icon: 'Briefcase',
    questionsCount: 100
  },
  CIA3: {
    id: 'CIA3',
    name: 'Part 3: Business Knowledge for Internal Auditing',
    shortName: 'Business',
    examCode: 'CIA-III',
    color: '#d97706', // Amber-600
    icon: 'TrendingUp',
    questionsCount: 100
  }
};

export const CIA_COURSE: Course = {
  id: 'cia',
  name: 'CIA Exam Review',
  shortName: 'CIA',
  description: 'Comprehensive preparation for the IIA Certified Internal Auditor Examination',
  passingScore: 600, // Scaled score out of 750
  totalTime: 150, // 2.5 hours per part (varies)
  
  sections: [
    {
      id: 'CIA1',
      name: 'Part 1: Essentials of Internal Auditing',
      shortName: 'CIA1',
      weight: '100%',
      questionCount: 125,
      timeAllowed: 150, // 2.5 hours
      questionTypes: ['mcq'],
      blueprintAreas: [
        {
          id: 'CIA1-I',
          name: 'Foundations of Internal Auditing',
          weight: '40%',
          topics: [
            'Mission of internal audit',
            'Definition of internal auditing',
            'Core principles',
            'Code of Ethics',
            'International Standards',
          ]
        },
        {
          id: 'CIA1-II',
          name: 'Independence and Objectivity',
          weight: '15%',
          topics: [
            'Organizational independence',
            'Individual objectivity',
            'Impairments',
          ]
        },
        {
          id: 'CIA1-III',
          name: 'Proficiency and Due Professional Care',
          weight: '15%',
          topics: [
            'Proficiency requirements',
            'Due professional care',
            'Continuing professional development',
          ]
        },
        {
          id: 'CIA1-IV',
          name: 'Quality Assurance and Improvement Program',
          weight: '10%',
          topics: [
            'Internal assessments',
            'External assessments',
            'Reporting on QAIP',
          ]
        },
        {
          id: 'CIA1-V',
          name: 'Governance, Risk Management, and Control',
          weight: '20%',
          topics: [
            'Corporate governance concepts',
            'Enterprise risk management',
            'Internal control frameworks',
          ]
        },
      ]
    },
    {
      id: 'CIA2',
      name: 'Part 2: Practice of Internal Auditing',
      shortName: 'CIA2',
      weight: '100%',
      questionCount: 100,
      timeAllowed: 120, // 2 hours
      questionTypes: ['mcq'],
      blueprintAreas: [
        {
          id: 'CIA2-I',
          name: 'Managing the Internal Audit Activity',
          weight: '20%',
          topics: [
            'Audit planning and strategy',
            'Resource management',
            'Policies and procedures',
            'Coordination and reliance',
          ]
        },
        {
          id: 'CIA2-II',
          name: 'Planning the Engagement',
          weight: '20%',
          topics: [
            'Engagement planning',
            'Engagement objectives',
            'Engagement scope',
            'Resource allocation',
          ]
        },
        {
          id: 'CIA2-III',
          name: 'Performing the Engagement',
          weight: '40%',
          topics: [
            'Information gathering',
            'Analysis and evaluation',
            'Documentation',
            'Engagement supervision',
          ]
        },
        {
          id: 'CIA2-IV',
          name: 'Communicating Engagement Results and Monitoring Progress',
          weight: '20%',
          topics: [
            'Communication criteria and quality',
            'Disseminating results',
            'Monitoring progress',
          ]
        },
      ]
    },
    {
      id: 'CIA3',
      name: 'Part 3: Business Knowledge for Internal Auditing',
      shortName: 'CIA3',
      weight: '100%',
      questionCount: 100,
      timeAllowed: 120, // 2 hours
      questionTypes: ['mcq'],
      blueprintAreas: [
        {
          id: 'CIA3-I',
          name: 'Business Acumen',
          weight: '35%',
          topics: [
            'Strategic management',
            'Business processes and structures',
            'Organizational behavior',
            'Management frameworks',
          ]
        },
        {
          id: 'CIA3-II',
          name: 'Information Security',
          weight: '25%',
          topics: [
            'Information security fundamentals',
            'Information security governance',
            'Security risk assessment',
            'Security controls',
          ]
        },
        {
          id: 'CIA3-III',
          name: 'Information Technology',
          weight: '20%',
          topics: [
            'IT governance',
            'IT operations',
            'IT infrastructure',
            'Emerging technologies',
          ]
        },
        {
          id: 'CIA3-IV',
          name: 'Financial Management',
          weight: '20%',
          topics: [
            'Financial accounting and finance',
            'Managerial accounting',
          ]
        },
      ]
    },
  ],
  
  pricing: {
    monthly: 39,
    annual: 349,
    lifetime: 599,
  },
  
  metadata: {
    examProvider: 'Pearson VUE (IIA)',
    websiteUrl: 'https://www.theiia.org/en/certifications/cia/',
    averageStudyHours: 350,
    difficultyRating: 4,
    careerPaths: ['Internal Audit', 'Risk Management', 'Compliance', 'Corporate Governance'],
  },
  
  features: {
    hasTBS: false,
    hasWrittenCommunication: false,
    hasEssay: false,
    hasDataInsights: false,
  },
  
  examOverview: {
    title: 'Why Become a CIA?',
    description: 'The Certified Internal Auditor (CIA) designation from The IIA is the only globally recognized certification for internal auditors. CIAs are the gold standard in internal audit, demonstrating competency in risk assessment, governance, and controls.',
    benefits: [
      'Only globally recognized internal audit certification',
      'Demonstrates commitment to professional excellence',
      'Increases career advancement opportunities',
      'Higher salary potential (CIAs earn 20-50% more)',
      'Membership in elite professional community',
    ],
    careerOpportunities: [
      'Internal Audit Manager / Director',
      'Chief Audit Executive (CAE)',
      'Risk Management Specialist',
      'Compliance Officer',
      'IT Auditor',
      'Forensic Auditor',
      'Corporate Governance Consultant',
    ],
    averageSalary: '$80,000 - $180,000+ (CAEs earn $150K+)',
    examFormat: '3 parts (Essentials, Practice, Business Knowledge), 2-2.5 hours each, 100% MCQ',
  },
  
  examStrategy: {
    title: 'CIA Exam Success Strategies',
    keyStrategies: [
      { title: 'Master the IPPF', description: 'The International Professional Practices Framework is the foundation of Parts 1 and 2. Know the Standards, Implementation Guidance, and Code of Ethics.' },
      { title: 'Think Like an Internal Auditor', description: 'Apply professional skepticism. Questions often test what an internal auditor SHOULD do, not what\'s easiest.' },
      { title: 'Part 3 is Different', description: 'Part 3 covers business knowledge (finance, IT, operations) - study it differently than Parts 1 & 2.' },
      { title: 'Understand Not Memorize', description: 'The exam tests application of concepts, not rote memorization. Practice applying standards to scenarios.' },
    ],
    studyTips: [
      'Read the IIA\'s International Standards and Code of Ethics multiple times',
      'Practice scenario-based questions - that\'s how the exam tests',
      'Don\'t neglect Part 3 business topics (IT security, financial management)',
      'Take each part separately - schedule exams 2-3 months apart',
      'Use the IIA\'s CIA Learning System as primary study material',
    ],
    commonMistakes: [
      'Underestimating Part 3 (business knowledge is broad)',
      'Not understanding when to use different types of audit engagements',
      'Confusing assurance vs. consulting engagements',
      'Skipping the code of ethics section',
      'Rushing through questions without reading all options',
    ],
    timeManagement: 'Plan 100-150 hours per part. Most pass all 3 parts within 12-18 months.',
  },
};

export default CIA_COURSE;
