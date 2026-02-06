/**
 * CISA (Certified Information Systems Auditor) Course Configuration
 * 
 * ISACA CISA Exam prep course
 * Based on the latest CISA Job Practice Areas
 */

export type CISASectionId = 'CISA1' | 'CISA2' | 'CISA3' | 'CISA4' | 'CISA5';

export const CISA_SECTION_IDS: CISASectionId[] = ['CISA1', 'CISA2', 'CISA3', 'CISA4', 'CISA5'];

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

export const CISA_SECTION_CONFIG: Record<CISASectionId, CISASectionConfig> = {
  CISA1: {
    id: 'CISA1',
    title: 'Domain 1: Information Systems Auditing Process',
    shortTitle: 'Auditing Process',
    description: 'Providing audit services in accordance with IS audit standards to assist the organization in protecting and controlling information systems.',
    weight: 21,
    questionCount: 85,
    color: 'bg-indigo-500',
    icon: 'FileSearch',
    topics: [
      'Planning',
      'Execution',
      'Reporting',
      'Follow-up'
    ]
  },
  CISA2: {
    id: 'CISA2',
    title: 'Domain 2: Governance and Management of IT',
    shortTitle: 'IT Governance',
    description: 'Assurance that necessary leadership, organizational structures and processes are in place to achieve objectives and to support the organization\'s strategy.',
    weight: 17,
    questionCount: 85,
    color: 'bg-blue-500',
    icon: 'Building',
    topics: [
      'IT Governance',
      'IT Management',
      'Risk Management'
    ]
  },
  CISA3: {
    id: 'CISA3',
    title: 'Domain 3: IS Acquisition, Development & Implementation',
    shortTitle: 'Acquisition & Dev',
    description: 'Assurance that the practices for the acquisition, development, testing and implementation of information systems meet the organization\'s strategies and objectives.',
    weight: 12,
    questionCount: 85,
    color: 'bg-cyan-500',
    icon: 'Code',
    topics: [
      'Project Management',
      'Business Application Development',
      'Virtualization & Cloud'
    ]
  },
  CISA4: {
    id: 'CISA4',
    title: 'Domain 4: IS Operations and Business Resilience',
    shortTitle: 'Operations & Resilience',
    description: 'Assurance that IT operations and support processes ensure the required level of service and security.',
    weight: 23,
    questionCount: 85,
    color: 'bg-teal-500',
    icon: 'Server',
    topics: [
      'IS Operations',
      'Business Resilience',
      'Disaster Recovery'
    ]
  },
  CISA5: {
    id: 'CISA5',
    title: 'Domain 5: Protection of Information Assets',
    shortTitle: 'InfoSec',
    description: 'Assurance that the organization\'s security policies, standards, procedures and controls ensure the confidentiality, integrity and availability of information assets.',
    weight: 27,
    questionCount: 85,
    color: 'bg-emerald-500',
    icon: 'Shield',
    topics: [
      'Information Security',
      'Privacy',
      'Physical Access',
      'Logical Access'
    ]
  }
};

export const CISA_SECTIONS: CISASectionConfig[] = CISA_SECTION_IDS.map(id => CISA_SECTION_CONFIG[id]);
