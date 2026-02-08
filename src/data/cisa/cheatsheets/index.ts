/**
 * CISA Cheatsheets Index
 * Quick reference guides for all 5 CISA domains
 */

// Domain-specific cheatsheet paths
export const cisaCheatsheets = {
  cisa1: {
    title: 'IS Auditing Process',
    weight: 21,
    path: './cisa1-cheatsheet.md',
    topics: [
      'Audit Standards & Guidelines',
      'Audit Planning',
      'Audit Evidence',
      'Sampling Methods',
      'CAATs',
      'Control Testing',
      'Reporting',
      'Follow-Up',
      'Professional Ethics',
    ],
  },
  cisa2: {
    title: 'IT Governance and Management',
    weight: 17,
    path: './cisa2-cheatsheet.md',
    topics: [
      'Governance Frameworks',
      'IT Governance Principles',
      'Organizational Structure',
      'IT Strategy',
      'Policies & Standards',
      'Risk Management',
      'Resource Management',
      'Performance Management',
      'Third-Party Management',
    ],
  },
  cisa3: {
    title: 'IS Acquisition, Development & Implementation',
    weight: 12,
    path: './cisa3-cheatsheet.md',
    topics: [
      'SDLC Phases',
      'Development Methodologies',
      'Requirements Management',
      'Design & Architecture',
      'Testing',
      'Security in Development',
      'Change Management',
      'Configuration Management',
      'Implementation',
      'Acquisition',
    ],
  },
  cisa4: {
    title: 'IS Operations and Business Resilience',
    weight: 23,
    path: './cisa4-cheatsheet.md',
    topics: [
      'IT Operations',
      'Service Management',
      'Monitoring & Logging',
      'Business Continuity',
      'Disaster Recovery',
      'Backup & Recovery',
      'Incident Response',
      'Physical Security',
      'Cloud Operations',
      'Asset Management',
    ],
  },
  cisa5: {
    title: 'Protection of Information Assets',
    weight: 27,
    path: './cisa5-cheatsheet.md',
    topics: [
      'Security Fundamentals',
      'Access Control',
      'Identity Management',
      'Cryptography',
      'Network Security',
      'Threat Landscape',
      'Data Protection',
      'Security Operations',
      'Cloud Security',
    ],
  },
};

// Domain weights for exam strategy
export const domainWeights = {
  'CISA1': 21,
  'CISA2': 17,
  'CISA3': 12,
  'CISA4': 23,
  'CISA5': 27,
};

// Study priority order (by weight)
export const studyPriority = ['CISA5', 'CISA4', 'CISA1', 'CISA2', 'CISA3'];

export default cisaCheatsheets;
