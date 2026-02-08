/**
 * ISACA Standards Reference
 * Key standards, guidelines, and frameworks referenced in CISA exam
 */

export interface IsacaStandard {
  id: string;
  name: string;
  category: 'ITAF' | 'COBIT' | 'ISO' | 'NIST' | 'OTHER';
  description: string;
  keyPoints: string[];
  examRelevance: 'high' | 'medium' | 'low';
  domains: ('CISA1' | 'CISA2' | 'CISA3' | 'CISA4' | 'CISA5')[];
}

export const isacaStandards: IsacaStandard[] = [
  // ISACA IT Audit Framework (ITAF)
  {
    id: 'ITAF-1001',
    name: 'ITAF - Audit Charter',
    category: 'ITAF',
    description: 'Establishes audit function authority, responsibility, and accountability',
    keyPoints: [
      'Approved by board/audit committee',
      'Defines scope and authority',
      'Ensures independence',
      'Reviewed annually',
    ],
    examRelevance: 'high',
    domains: ['CISA1'],
  },
  {
    id: 'ITAF-1002',
    name: 'ITAF - Independence',
    category: 'ITAF',
    description: 'Auditor must be independent in mind and appearance',
    keyPoints: [
      'Free from conflicts of interest',
      'Objective in attitude',
      'Report functionally to audit committee',
      'Disclosed impairments',
    ],
    examRelevance: 'high',
    domains: ['CISA1'],
  },
  {
    id: 'ITAF-1003',
    name: 'ITAF - Due Professional Care',
    category: 'ITAF',
    description: 'Apply skill and care expected of reasonably prudent auditor',
    keyPoints: [
      'Competence in IT audit',
      'Maintain proficiency through CPE',
      'Exercise professional judgment',
      'Apply appropriate skepticism',
    ],
    examRelevance: 'high',
    domains: ['CISA1'],
  },
  {
    id: 'ITAF-1004',
    name: 'ITAF - Professional Competence',
    category: 'ITAF',
    description: 'Maintain knowledge and skills relevant to audit activities',
    keyPoints: [
      'CISA certification demonstrates competence',
      'Continuing professional education',
      'Knowledge of current standards',
      'Technical skills in audit areas',
    ],
    examRelevance: 'high',
    domains: ['CISA1'],
  },
  {
    id: 'ITAF-1005',
    name: 'ITAF - Audit Planning',
    category: 'ITAF',
    description: 'Risk-based approach to audit planning',
    keyPoints: [
      'Risk assessment drives priorities',
      'Document audit objectives and scope',
      'Develop audit program',
      'Allocate resources appropriately',
    ],
    examRelevance: 'high',
    domains: ['CISA1'],
  },
  {
    id: 'ITAF-1006',
    name: 'ITAF - Audit Evidence',
    category: 'ITAF',
    description: 'Sufficient appropriate evidence to support conclusions',
    keyPoints: [
      'Relevant to audit objectives',
      'Reliable - quality of source',
      'Sufficient - quantity adequate',
      'Documented in workpapers',
    ],
    examRelevance: 'high',
    domains: ['CISA1'],
  },
  {
    id: 'ITAF-1007',
    name: 'ITAF - Audit Reporting',
    category: 'ITAF',
    description: 'Communicate results through appropriate reporting',
    keyPoints: [
      'Timely issuance',
      'Accurate and objective',
      'Include scope, findings, recommendations',
      'Management response required',
    ],
    examRelevance: 'high',
    domains: ['CISA1'],
  },
  {
    id: 'ITAF-1008',
    name: 'ITAF - Follow-up Activities',
    category: 'ITAF',
    description: 'Monitor and report on management remediation',
    keyPoints: [
      'Track finding status',
      'Verify implementation',
      'Escalate overdue items',
      'Report to audit committee',
    ],
    examRelevance: 'high',
    domains: ['CISA1'],
  },
  
  // COBIT 2019
  {
    id: 'COBIT-2019',
    name: 'COBIT 2019 Framework',
    category: 'COBIT',
    description: 'Framework for governance and management of enterprise IT',
    keyPoints: [
      '40 governance and management objectives',
      'Governance: Evaluate, Direct, Monitor (EDM)',
      'Management: APO, BAI, DSS, MEA',
      'Enables alignment of IT with business',
    ],
    examRelevance: 'high',
    domains: ['CISA2'],
  },
  {
    id: 'COBIT-EDM',
    name: 'COBIT - Evaluate, Direct, Monitor',
    category: 'COBIT',
    description: 'Governance domain for board-level oversight',
    keyPoints: [
      'EDM01: Governance Framework',
      'EDM02: Benefits Delivery',
      'EDM03: Risk Optimization',
      'EDM04: Resource Optimization',
      'EDM05: Stakeholder Transparency',
    ],
    examRelevance: 'high',
    domains: ['CISA2'],
  },
  {
    id: 'COBIT-APO',
    name: 'COBIT - Align, Plan, Organize',
    category: 'COBIT',
    description: 'Management domain for strategy and planning',
    keyPoints: [
      'IT strategy alignment',
      'Enterprise architecture',
      'Innovation management',
      'Budget and resource management',
      'Human resource management',
    ],
    examRelevance: 'high',
    domains: ['CISA2', 'CISA3'],
  },
  {
    id: 'COBIT-BAI',
    name: 'COBIT - Build, Acquire, Implement',
    category: 'COBIT',
    description: 'Management domain for solutions development',
    keyPoints: [
      'Program and project management',
      'Requirements definition',
      'Solutions development',
      'Change management',
      'Knowledge management',
    ],
    examRelevance: 'high',
    domains: ['CISA3'],
  },
  {
    id: 'COBIT-DSS',
    name: 'COBIT - Deliver, Service, Support',
    category: 'COBIT',
    description: 'Management domain for IT operations',
    keyPoints: [
      'Operations management',
      'Service request and incident management',
      'Problem management',
      'Continuity management',
      'Security services management',
    ],
    examRelevance: 'high',
    domains: ['CISA4', 'CISA5'],
  },
  {
    id: 'COBIT-MEA',
    name: 'COBIT - Monitor, Evaluate, Assess',
    category: 'COBIT',
    description: 'Management domain for performance monitoring',
    keyPoints: [
      'Performance and conformance monitoring',
      'Internal control system assessment',
      'Compliance assessment',
      'Assurance activities',
    ],
    examRelevance: 'high',
    domains: ['CISA1', 'CISA2'],
  },
  
  // ISO Standards
  {
    id: 'ISO-27001',
    name: 'ISO/IEC 27001',
    category: 'ISO',
    description: 'Information Security Management System requirements',
    keyPoints: [
      'Plan-Do-Check-Act cycle',
      'Risk-based approach',
      'Annex A controls (93 controls)',
      'Certification available',
    ],
    examRelevance: 'high',
    domains: ['CISA5'],
  },
  {
    id: 'ISO-27002',
    name: 'ISO/IEC 27002',
    category: 'ISO',
    description: 'Code of practice for information security controls',
    keyPoints: [
      'Implementation guidance for Annex A',
      'Organizational, people, physical, technological controls',
      'Best practice recommendations',
      'Not certifiable (use 27001)',
    ],
    examRelevance: 'medium',
    domains: ['CISA5'],
  },
  {
    id: 'ISO-22301',
    name: 'ISO 22301',
    category: 'ISO',
    description: 'Business Continuity Management System requirements',
    keyPoints: [
      'BCM lifecycle',
      'Business impact analysis',
      'Risk assessment',
      'Business continuity plans',
      'Exercise and testing',
    ],
    examRelevance: 'high',
    domains: ['CISA4'],
  },
  {
    id: 'ISO-31000',
    name: 'ISO 31000',
    category: 'ISO',
    description: 'Risk Management guidelines',
    keyPoints: [
      'Risk management framework',
      'Risk assessment process',
      'Integrated into governance',
      'Continual improvement',
    ],
    examRelevance: 'medium',
    domains: ['CISA2'],
  },
  {
    id: 'ISO-38500',
    name: 'ISO/IEC 38500',
    category: 'ISO',
    description: 'Governance of IT for the organization',
    keyPoints: [
      'Evaluate, Direct, Monitor model',
      'Six principles of IT governance',
      'Board-level guidance',
      'Aligned with COBIT',
    ],
    examRelevance: 'medium',
    domains: ['CISA2'],
  },
  
  // NIST Frameworks
  {
    id: 'NIST-CSF',
    name: 'NIST Cybersecurity Framework',
    category: 'NIST',
    description: 'Framework for managing cybersecurity risk',
    keyPoints: [
      'Five functions: Identify, Protect, Detect, Respond, Recover',
      'Framework Core, Implementation Tiers, Profiles',
      'Risk-based approach',
      'Widely adopted standard',
    ],
    examRelevance: 'high',
    domains: ['CISA5'],
  },
  {
    id: 'NIST-800-53',
    name: 'NIST SP 800-53',
    category: 'NIST',
    description: 'Security and Privacy Controls for Information Systems',
    keyPoints: [
      'Control families (20 families)',
      'Control baselines (Low, Moderate, High)',
      'Required for US federal systems',
      'Comprehensive control catalog',
    ],
    examRelevance: 'medium',
    domains: ['CISA5'],
  },
  {
    id: 'NIST-800-30',
    name: 'NIST SP 800-30',
    category: 'NIST',
    description: 'Guide for Conducting Risk Assessments',
    keyPoints: [
      'Risk assessment methodology',
      'Threat and vulnerability identification',
      'Likelihood and impact analysis',
      'Risk determination',
    ],
    examRelevance: 'medium',
    domains: ['CISA2', 'CISA5'],
  },
  {
    id: 'NIST-800-61',
    name: 'NIST SP 800-61',
    category: 'NIST',
    description: 'Computer Security Incident Handling Guide',
    keyPoints: [
      'Preparation phase',
      'Detection and analysis',
      'Containment, eradication, recovery',
      'Post-incident activity',
    ],
    examRelevance: 'high',
    domains: ['CISA4'],
  },
  {
    id: 'NIST-800-34',
    name: 'NIST SP 800-34',
    category: 'NIST',
    description: 'Contingency Planning Guide',
    keyPoints: [
      'Business impact analysis',
      'Recovery strategies',
      'Contingency plan development',
      'Testing and exercises',
    ],
    examRelevance: 'high',
    domains: ['CISA4'],
  },
  
  // Other Important Standards
  {
    id: 'ITIL-4',
    name: 'ITIL 4',
    category: 'OTHER',
    description: 'IT Service Management best practices',
    keyPoints: [
      'Service value system',
      '34 management practices',
      'Service lifecycle approach',
      'Incident, problem, change management',
    ],
    examRelevance: 'high',
    domains: ['CISA4'],
  },
  {
    id: 'PCI-DSS',
    name: 'PCI DSS',
    category: 'OTHER',
    description: 'Payment Card Industry Data Security Standard',
    keyPoints: [
      '12 requirements',
      'Protect cardholder data',
      'Annual assessments required',
      'Compliance levels based on volume',
    ],
    examRelevance: 'medium',
    domains: ['CISA5'],
  },
  {
    id: 'GDPR',
    name: 'GDPR',
    category: 'OTHER',
    description: 'General Data Protection Regulation',
    keyPoints: [
      'Data subject rights',
      'Privacy by design',
      'Breach notification (72 hours)',
      'Data protection officer',
      'Significant penalties',
    ],
    examRelevance: 'medium',
    domains: ['CISA5'],
  },
  {
    id: 'SOC-REPORTS',
    name: 'SOC Reports (1, 2, 3)',
    category: 'OTHER',
    description: 'Service Organization Control reports',
    keyPoints: [
      'SOC 1: Financial reporting controls',
      'SOC 2: Security, availability, processing integrity, confidentiality, privacy',
      'SOC 3: Public version of SOC 2',
      'Type I: Point in time, Type II: Period of time',
    ],
    examRelevance: 'high',
    domains: ['CISA1', 'CISA5'],
  },
  {
    id: 'COSO',
    name: 'COSO Internal Control Framework',
    category: 'OTHER',
    description: 'Framework for internal control system',
    keyPoints: [
      '5 components: Control Environment, Risk Assessment, Control Activities, Information & Communication, Monitoring',
      '17 principles',
      'Foundation for IT controls',
      'Aligned with financial controls',
    ],
    examRelevance: 'medium',
    domains: ['CISA1', 'CISA2'],
  },
  {
    id: 'CIS-CONTROLS',
    name: 'CIS Critical Security Controls',
    category: 'OTHER',
    description: 'Prioritized cybersecurity best practices',
    keyPoints: [
      '18 controls (v8)',
      'Implementation groups (IG1, IG2, IG3)',
      'Prioritized for maximum impact',
      'Updated regularly',
    ],
    examRelevance: 'medium',
    domains: ['CISA5'],
  },
];

// Helper functions
export const getStandardsByDomain = (domain: 'CISA1' | 'CISA2' | 'CISA3' | 'CISA4' | 'CISA5'): IsacaStandard[] => {
  return isacaStandards.filter(s => s.domains.includes(domain));
};

export const getHighRelevanceStandards = (): IsacaStandard[] => {
  return isacaStandards.filter(s => s.examRelevance === 'high');
};

export const getStandardsByCategory = (category: IsacaStandard['category']): IsacaStandard[] => {
  return isacaStandards.filter(s => s.category === category);
};

// Summary statistics
export const standardsStats = {
  total: isacaStandards.length,
  byCategory: {
    ITAF: isacaStandards.filter(s => s.category === 'ITAF').length,
    COBIT: isacaStandards.filter(s => s.category === 'COBIT').length,
    ISO: isacaStandards.filter(s => s.category === 'ISO').length,
    NIST: isacaStandards.filter(s => s.category === 'NIST').length,
    OTHER: isacaStandards.filter(s => s.category === 'OTHER').length,
  },
  highRelevance: isacaStandards.filter(s => s.examRelevance === 'high').length,
};

export default isacaStandards;
