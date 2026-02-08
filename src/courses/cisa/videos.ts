/**
 * CISA Video Content Configuration
 * 
 * Defines video content structure for the CISA course.
 * Videos can be recorded and uploaded to replace placeholders.
 */

export type VideoStatus = 'planned' | 'in-production' | 'available';

export interface VideoLesson {
  id: string;
  sectionId: string;
  title: string;
  description: string;
  duration: number; // minutes
  order: number;
  status: VideoStatus;
  videoUrl?: string;
  thumbnailUrl?: string;
  transcript?: string;
  topics: string[];
}

export interface VideoSection {
  sectionId: string;
  title: string;
  totalVideos: number;
  estimatedTotalMinutes: number;
  videos: VideoLesson[];
}

// Video content structure for each domain
export const CISA_VIDEO_CONTENT: VideoSection[] = [
  {
    sectionId: 'CISA1',
    title: 'Domain 1: Information Systems Auditing Process',
    totalVideos: 8,
    estimatedTotalMinutes: 180,
    videos: [
      {
        id: 'CISA1-V001',
        sectionId: 'CISA1',
        title: 'Introduction to IS Auditing',
        description: 'Overview of IS auditing, the ISACA code of ethics, and the audit charter',
        duration: 25,
        order: 1,
        status: 'planned',
        topics: ['IS Audit Overview', 'Audit Charter', 'Professional Ethics']
      },
      {
        id: 'CISA1-V002',
        sectionId: 'CISA1',
        title: 'Risk-Based Audit Planning',
        description: 'How to develop a risk-based audit approach and create the audit plan',
        duration: 25,
        order: 2,
        status: 'planned',
        topics: ['Risk Assessment', 'Audit Planning', 'Materiality']
      },
      {
        id: 'CISA1-V003',
        sectionId: 'CISA1',
        title: 'Audit Evidence and Sampling',
        description: 'Types of audit evidence, sampling techniques, and documentation',
        duration: 20,
        order: 3,
        status: 'planned',
        topics: ['Evidence Types', 'Sampling', 'Documentation']
      },
      {
        id: 'CISA1-V004',
        sectionId: 'CISA1',
        title: 'Internal Controls Evaluation',
        description: 'Understanding and testing internal controls in IS environments',
        duration: 25,
        order: 4,
        status: 'planned',
        topics: ['Control Objectives', 'Testing Controls', 'Control Weaknesses']
      },
      {
        id: 'CISA1-V005',
        sectionId: 'CISA1',
        title: 'IT General Controls',
        description: 'Evaluating ITGCs: access, change management, operations, development',
        duration: 25,
        order: 5,
        status: 'planned',
        topics: ['ITGCs', 'Access Controls', 'Change Management']
      },
      {
        id: 'CISA1-V006',
        sectionId: 'CISA1',
        title: 'CAATs and Data Analytics',
        description: 'Using computer-assisted audit techniques and data analytics',
        duration: 25,
        order: 6,
        status: 'planned',
        topics: ['CAATs', 'GAS', 'Data Analytics', 'Continuous Auditing']
      },
      {
        id: 'CISA1-V007',
        sectionId: 'CISA1',
        title: 'Audit Reporting and Communication',
        description: 'Drafting findings, structuring reports, and communicating results',
        duration: 20,
        order: 7,
        status: 'planned',
        topics: ['Audit Reports', 'Findings', 'Recommendations']
      },
      {
        id: 'CISA1-V008',
        sectionId: 'CISA1',
        title: 'Domain 1 Exam Strategy',
        description: 'Tips and strategies for tackling Domain 1 exam questions',
        duration: 15,
        order: 8,
        status: 'planned',
        topics: ['Exam Tips', 'Question Patterns', 'Time Management']
      }
    ]
  },
  {
    sectionId: 'CISA2',
    title: 'Domain 2: Governance and Management of IT',
    totalVideos: 6,
    estimatedTotalMinutes: 140,
    videos: [
      {
        id: 'CISA2-V001',
        sectionId: 'CISA2',
        title: 'IT Governance Frameworks',
        description: 'COBIT, ITIL, and other frameworks for IT governance',
        duration: 25,
        order: 1,
        status: 'planned',
        topics: ['COBIT', 'ITIL', 'Governance Frameworks']
      },
      {
        id: 'CISA2-V002',
        sectionId: 'CISA2',
        title: 'IT Strategy and Organization',
        description: 'Aligning IT with business strategy, organizational structures',
        duration: 25,
        order: 2,
        status: 'planned',
        topics: ['IT Strategy', 'Alignment', 'Organization']
      },
      {
        id: 'CISA2-V003',
        sectionId: 'CISA2',
        title: 'IT Risk Management',
        description: 'Risk assessment, risk treatment, and risk monitoring',
        duration: 25,
        order: 3,
        status: 'planned',
        topics: ['Risk Assessment', 'Risk Treatment', 'KRIs']
      },
      {
        id: 'CISA2-V004',
        sectionId: 'CISA2',
        title: 'IT Policies and Procedures',
        description: 'Developing, implementing, and auditing IT policies',
        duration: 20,
        order: 4,
        status: 'planned',
        topics: ['Policies', 'Standards', 'Procedures']
      },
      {
        id: 'CISA2-V005',
        sectionId: 'CISA2',
        title: 'Third-Party and Vendor Management',
        description: 'Managing vendor risk, SLAs, and outsourcing',
        duration: 25,
        order: 5,
        status: 'planned',
        topics: ['Vendor Risk', 'SLAs', 'Outsourcing']
      },
      {
        id: 'CISA2-V006',
        sectionId: 'CISA2',
        title: 'Domain 2 Exam Strategy',
        description: 'Tips and strategies for tackling Domain 2 exam questions',
        duration: 20,
        order: 6,
        status: 'planned',
        topics: ['Exam Tips', 'Question Patterns']
      }
    ]
  },
  {
    sectionId: 'CISA3',
    title: 'Domain 3: IS Acquisition, Development & Implementation',
    totalVideos: 6,
    estimatedTotalMinutes: 130,
    videos: [
      {
        id: 'CISA3-V001',
        sectionId: 'CISA3',
        title: 'SDLC and Development Methodologies',
        description: 'Waterfall, Agile, DevOps, and secure development practices',
        duration: 25,
        order: 1,
        status: 'planned',
        topics: ['SDLC', 'Agile', 'DevOps', 'DevSecOps']
      },
      {
        id: 'CISA3-V002',
        sectionId: 'CISA3',
        title: 'Project Management for IT Auditors',
        description: 'Project governance, risk, and auditor involvement',
        duration: 25,
        order: 2,
        status: 'planned',
        topics: ['Project Management', 'Governance', 'Risk']
      },
      {
        id: 'CISA3-V003',
        sectionId: 'CISA3',
        title: 'Application Security Testing',
        description: 'SAST, DAST, code review, and security testing approaches',
        duration: 20,
        order: 3,
        status: 'planned',
        topics: ['SAST', 'DAST', 'Code Review', 'Penetration Testing']
      },
      {
        id: 'CISA3-V004',
        sectionId: 'CISA3',
        title: 'System Acquisition and Vendor Selection',
        description: 'RFP process, vendor evaluation, and contract management',
        duration: 20,
        order: 4,
        status: 'planned',
        topics: ['RFP', 'Vendor Selection', 'Contracts']
      },
      {
        id: 'CISA3-V005',
        sectionId: 'CISA3',
        title: 'Change and Configuration Management',
        description: 'Managing changes, version control, and release management',
        duration: 20,
        order: 5,
        status: 'planned',
        topics: ['Change Management', 'Configuration', 'Release']
      },
      {
        id: 'CISA3-V006',
        sectionId: 'CISA3',
        title: 'Domain 3 Exam Strategy',
        description: 'Tips and strategies for tackling Domain 3 exam questions',
        duration: 20,
        order: 6,
        status: 'planned',
        topics: ['Exam Tips', 'Question Patterns']
      }
    ]
  },
  {
    sectionId: 'CISA4',
    title: 'Domain 4: IS Operations and Business Resilience',
    totalVideos: 8,
    estimatedTotalMinutes: 180,
    videos: [
      {
        id: 'CISA4-V001',
        sectionId: 'CISA4',
        title: 'IT Service Management',
        description: 'ITIL service management, SLAs, and service delivery',
        duration: 25,
        order: 1,
        status: 'planned',
        topics: ['ITIL', 'Service Management', 'SLAs']
      },
      {
        id: 'CISA4-V002',
        sectionId: 'CISA4',
        title: 'IT Operations and Data Center',
        description: 'Data center operations, environmental controls, and monitoring',
        duration: 25,
        order: 2,
        status: 'planned',
        topics: ['Data Center', 'Environmental Controls', 'Monitoring']
      },
      {
        id: 'CISA4-V003',
        sectionId: 'CISA4',
        title: 'Incident and Problem Management',
        description: 'Incident response, problem management, and root cause analysis',
        duration: 20,
        order: 3,
        status: 'planned',
        topics: ['Incident Management', 'Problem Management', 'RCA']
      },
      {
        id: 'CISA4-V004',
        sectionId: 'CISA4',
        title: 'Business Impact Analysis',
        description: 'Conducting BIA, determining RTO/RPO, and critical processes',
        duration: 25,
        order: 4,
        status: 'planned',
        topics: ['BIA', 'RTO', 'RPO', 'MTD']
      },
      {
        id: 'CISA4-V005',
        sectionId: 'CISA4',
        title: 'Business Continuity Planning',
        description: 'Developing and maintaining business continuity plans',
        duration: 25,
        order: 5,
        status: 'planned',
        topics: ['BCP', 'Recovery Strategies', 'Plan Maintenance']
      },
      {
        id: 'CISA4-V006',
        sectionId: 'CISA4',
        title: 'Disaster Recovery',
        description: 'DR planning, recovery sites, and testing',
        duration: 25,
        order: 6,
        status: 'planned',
        topics: ['DRP', 'Recovery Sites', 'DRP Testing']
      },
      {
        id: 'CISA4-V007',
        sectionId: 'CISA4',
        title: 'Backup and Media Management',
        description: 'Backup strategies, media handling, and data retention',
        duration: 20,
        order: 7,
        status: 'planned',
        topics: ['Backup', 'Media Management', 'Retention']
      },
      {
        id: 'CISA4-V008',
        sectionId: 'CISA4',
        title: 'Domain 4 Exam Strategy',
        description: 'Tips and strategies for tackling Domain 4 exam questions',
        duration: 15,
        order: 8,
        status: 'planned',
        topics: ['Exam Tips', 'Question Patterns']
      }
    ]
  },
  {
    sectionId: 'CISA5',
    title: 'Domain 5: Protection of Information Assets',
    totalVideos: 10,
    estimatedTotalMinutes: 220,
    videos: [
      {
        id: 'CISA5-V001',
        sectionId: 'CISA5',
        title: 'Information Security Governance',
        description: 'Security policies, organization, and governance framework',
        duration: 25,
        order: 1,
        status: 'planned',
        topics: ['Security Governance', 'Policies', 'CISO Role']
      },
      {
        id: 'CISA5-V002',
        sectionId: 'CISA5',
        title: 'Access Control Fundamentals',
        description: 'Authentication, authorization, and access management',
        duration: 25,
        order: 2,
        status: 'planned',
        topics: ['Authentication', 'Authorization', 'Access Control']
      },
      {
        id: 'CISA5-V003',
        sectionId: 'CISA5',
        title: 'Network Security',
        description: 'Firewalls, IDS/IPS, VPNs, and network segmentation',
        duration: 25,
        order: 3,
        status: 'planned',
        topics: ['Firewalls', 'IDS', 'Network Segmentation']
      },
      {
        id: 'CISA5-V004',
        sectionId: 'CISA5',
        title: 'Cryptography Essentials',
        description: 'Encryption, hashing, digital signatures, and PKI',
        duration: 25,
        order: 4,
        status: 'planned',
        topics: ['Encryption', 'Hashing', 'PKI', 'Digital Signatures']
      },
      {
        id: 'CISA5-V005',
        sectionId: 'CISA5',
        title: 'Physical and Environmental Security',
        description: 'Physical access controls, environmental protection',
        duration: 20,
        order: 5,
        status: 'planned',
        topics: ['Physical Security', 'Environmental Controls']
      },
      {
        id: 'CISA5-V006',
        sectionId: 'CISA5',
        title: 'Security Operations and Monitoring',
        description: 'SIEM, SOC, vulnerability management, and incident response',
        duration: 25,
        order: 6,
        status: 'planned',
        topics: ['SIEM', 'SOC', 'Vulnerability Management']
      },
      {
        id: 'CISA5-V007',
        sectionId: 'CISA5',
        title: 'Privacy and Data Protection',
        description: 'GDPR, privacy principles, and data protection controls',
        duration: 20,
        order: 7,
        status: 'planned',
        topics: ['Privacy', 'GDPR', 'Data Protection']
      },
      {
        id: 'CISA5-V008',
        sectionId: 'CISA5',
        title: 'Emerging Technology Security',
        description: 'Cloud, AI/ML, IoT, and API security considerations',
        duration: 25,
        order: 8,
        status: 'planned',
        topics: ['Cloud Security', 'AI Security', 'IoT', 'API Security']
      },
      {
        id: 'CISA5-V009',
        sectionId: 'CISA5',
        title: 'Security Awareness and Training',
        description: 'Building security culture and awareness programs',
        duration: 15,
        order: 9,
        status: 'planned',
        topics: ['Security Awareness', 'Training', 'Culture']
      },
      {
        id: 'CISA5-V010',
        sectionId: 'CISA5',
        title: 'Domain 5 Exam Strategy',
        description: 'Tips and strategies for tackling Domain 5 exam questions',
        duration: 15,
        order: 10,
        status: 'planned',
        topics: ['Exam Tips', 'Question Patterns']
      }
    ]
  }
];

// Summary statistics
export const VIDEO_CONTENT_SUMMARY = {
  totalVideos: CISA_VIDEO_CONTENT.reduce((sum, section) => sum + section.totalVideos, 0),
  totalMinutes: CISA_VIDEO_CONTENT.reduce((sum, section) => sum + section.estimatedTotalMinutes, 0),
  bySection: CISA_VIDEO_CONTENT.map(section => ({
    sectionId: section.sectionId,
    videos: section.totalVideos,
    minutes: section.estimatedTotalMinutes
  }))
};

// Helper function to get video by ID
export function getVideoById(videoId: string): VideoLesson | undefined {
  for (const section of CISA_VIDEO_CONTENT) {
    const video = section.videos.find(v => v.id === videoId);
    if (video) return video;
  }
  return undefined;
}

// Helper function to get all videos for a section
export function getVideosBySection(sectionId: string): VideoLesson[] {
  const section = CISA_VIDEO_CONTENT.find(s => s.sectionId === sectionId);
  return section?.videos || [];
}
