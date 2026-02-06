/**
 * CISA Course Module
 * Certified Information Systems Auditor (ISACA)
 */

import { Course } from '../../types/course';

export const CISA_COURSE: Course = {
  id: 'cisa',
  name: 'CISA Exam Review',
  shortName: 'CISA',
  description: 'Comprehensive preparation for the ISACA Certified Information Systems Auditor Examination',
  passingScore: 450, // Scaled score out of 800
  totalTime: 240, // 4 hours
  
  sections: [
    {
      id: 'CISA1',
      name: 'Domain 1: Information Systems Auditing Process',
      shortName: 'CISA1',
      weight: '21%',
      questionCount: 32, // ~21% of 150
      timeAllowed: 50,
      questionTypes: ['mcq'],
      blueprintAreas: [
        {
          id: 'CISA1-I',
          name: 'Planning',
          weight: '30%',
          topics: [
            'IS audit standards, guidelines, and codes of ethics',
            'Business processes',
            'Types of controls',
            'Risk-based audit planning',
            'Types of audits and assessments'
          ]
        },
        {
          id: 'CISA1-II',
          name: 'Execution',
          weight: '40%',
          topics: [
            'Audit project management',
            'Sampling methodology',
            'Audit evidence collection techniques',
            'Data analytics',
            'Reporting and communication techniques'
          ]
        },
        {
          id: 'CISA1-III',
          name: 'Reporting and Follow-up',
          weight: '30%',
          topics: [
            'Audit report preparation',
            'Follow-up activities',
            'Quality assurance',
          ]
        }
      ]
    },
    {
      id: 'CISA2',
      name: 'Domain 2: Governance and Management of IT',
      shortName: 'CISA2',
      weight: '17%',
      questionCount: 26,
      timeAllowed: 41,
      questionTypes: ['mcq'],
      blueprintAreas: [
        {
          id: 'CISA2-I',
          name: 'IT Governance',
          weight: '40%',
          topics: [
            'IT governance structure',
            'IT strategy',
            'IT-related frameworks, standards, and best practices',
            'IT resource management'
          ]
        },
        {
          id: 'CISA2-II',
          name: 'IT Management',
          weight: '30%',
          topics: [
            'IT resource management',
            'IT service provider acquisition and management',
            'IT performance monitoring and reporting'
          ]
        },
        {
          id: 'CISA2-III',
          name: 'Risk Management',
          weight: '30%',
          topics: [
            'IT risk identification',
            'IT risk assessment and analysis',
            'Risk response and mitigation',
            'Risk and control monitoring'
          ]
        }
      ]
    },
    {
      id: 'CISA3',
      name: 'Domain 3: IS Acquisition, Development & Implementation',
      shortName: 'CISA3',
      weight: '12%',
      questionCount: 18,
      timeAllowed: 29,
      questionTypes: ['mcq'],
      blueprintAreas: [
        {
          id: 'CISA3-I',
          name: 'Project Governance and Management',
          weight: '50%',
          topics: [
            'Project governance structure',
            'Project management practices',
            'Feasibility study and business case',
            'Project risk management'
          ]
        },
        {
          id: 'CISA3-II',
          name: 'Systems Development',
          weight: '50%',
          topics: [
            'SDLC methodologies',
            'Application development',
            'Testing methodologies',
            'Configuration and release management',
            'System migration, infrastructure deployment'
          ]
        }
      ]
    },
    {
      id: 'CISA4',
      name: 'Domain 4: IS Operations and Business Resilience',
      shortName: 'CISA4',
      weight: '23%',
      questionCount: 35,
      timeAllowed: 55,
      questionTypes: ['mcq'],
      blueprintAreas: [
        {
          id: 'CISA4-I',
          name: 'IS Operations',
          weight: '40%',
          topics: [
            'IT operations management',
            'IT asset management',
            'Job scheduling',
            'System interfaces',
            'End-user computing'
          ]
        },
        {
          id: 'CISA4-II',
          name: 'Business Resilience',
          weight: '60%',
          topics: [
            'Business impact analysis',
            'Disaster recovery planning',
            'Business continuity planning',
            'Data backup, storage, and restoration'
          ]
        }
      ]
    },
    {
      id: 'CISA5',
      name: 'Domain 5: Protection of Information Assets',
      shortName: 'CISA5',
      weight: '27%',
      questionCount: 41,
      timeAllowed: 65,
      questionTypes: ['mcq'],
      blueprintAreas: [
        {
          id: 'CISA5-I',
          name: 'Information Security',
          weight: '40%',
          topics: [
            'Information security management frameworks',
            'Security policies, standards, and procedures',
            'Security awareness training',
            'Incident management',
            'Identity and access management'
          ]
        },
        {
          id: 'CISA5-II',
          name: 'Network and Endpoint Security',
          weight: '30%',
          topics: [
            'Network infrastructure security',
            'Firewalls and VPNs',
            'Wireless network security',
            'Cryptographic systems',
            'Public key infrastructure'
          ]
        },
        {
          id: 'CISA5-III',
          name: 'Data Privacy and Protection',
          weight: '30%',
          topics: [
            'Data classification',
            'Privacy principles',
            'Physical and environmental controls',
            'Mobile, IoT, and cloud security'
          ]
        }
      ]
    }
  ],
  
  pricing: {
    monthly: 39,
    annual: 299,
    lifetime: 699
  },
  
  metadata: {
    examProvider: 'ISACA',
    websiteUrl: 'https://www.isaca.org/credentialing/cisa',
    averageStudyHours: 300,
    difficultyRating: 4,
    careerPaths: [
      'IS Auditor',
      'IT Audit Manager',
      'Compliance Officer',
      'Security Consultant',
      'Risk Manager'
    ]
  }
};

export { CISA_SECTIONS, CISA_SECTION_CONFIG, CISA_SECTION_IDS } from './config';
export type { CISASectionId, CISASectionConfig } from './config';
