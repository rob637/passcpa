/**
 * CIA Cheatsheets Index
 * Quick reference guides for all 3 CIA parts
 */

// Part-specific cheatsheet paths
export const ciaCheatsheets = {
  cia1: {
    title: 'Essentials of Internal Auditing',
    path: './cia1-cheatsheet.md',
    topics: [
      'Foundations of Internal Auditing',
      'Internal Audit Definition & Mission',
      'Core Principles',
      'Three Lines Model',
      'Independence and Objectivity',
      'Audit Charter',
      'Proficiency and Due Professional Care',
      'QAIP (Quality Assurance)',
      'Governance, Risk, and Control',
      'IIA Standards Structure',
    ],
  },
  cia2: {
    title: 'Practice of Internal Auditing',
    path: './cia2-cheatsheet.md',
    topics: [
      'Managing the IA Activity',
      'Risk-Based Audit Planning',
      'CAE Responsibilities',
      'Engagement Planning',
      'Preliminary Survey',
      'Work Program Development',
      'Audit Evidence',
      'Sampling Methods',
      'Working Papers',
      'Communicating Results',
      'Report Writing',
      'Follow-Up Process',
    ],
  },
  cia3: {
    title: 'Business Knowledge for Internal Auditing',
    path: './cia3-cheatsheet.md',
    topics: [
      'Strategic Planning',
      'Performance Measurement',
      'Quality Management',
      'Information Security (CIA Triad)',
      'Access Control',
      'Incident Response',
      'IT General Controls',
      'SDLC',
      'Cloud Computing',
      'Financial Management',
      'Capital Budgeting',
      'Financial Ratios',
      'Working Capital',
      'Risk Frameworks (COSO)',
    ],
  },
};

// Domain weights for each part
export const partWeights = {
  'CIA1': {
    'Foundations': 40,
    'Independence': 15,
    'Proficiency': 15,
    'QAIP': 10,
    'Governance': 20,
  },
  'CIA2': {
    'Managing IA Activity': 20,
    'Planning': 20,
    'Performing': 40,
    'Communicating': 20,
  },
  'CIA3': {
    'Business Acumen': 35,
    'Information Security': 25,
    'Information Technology': 20,
    'Financial Management': 20,
  },
};

// Export all cheatsheet content
export default ciaCheatsheets;
