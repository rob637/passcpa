/**
 * CIA Cram Mode Service
 * 
 * Intensive last-minute preparation for the CIA exam.
 * Focuses on high-yield topics, IPPF framework, and IIA standards.
 * 
 * Cram Mode Features:
 * - 5-day intensive study plan
 * - IPPF (International Professional Practices Framework) deep dives
 * - IIA Standards quick reference
 * - Code of Ethics mastery
 * - Part-specific high-yield topics
 */

import { CIAPart, CIA_PART_CONFIG } from './ciaAnalytics';

// ============================================================================
// Types
// ============================================================================

export interface CramSession {
  id: string;
  day: number; // 1-5
  part: CIAPart | 'all';
  topic: string;
  duration: number; // minutes
  type: 'review' | 'practice' | 'flashcards' | 'standards' | 'ethics';
  completed: boolean;
  score?: number;
}

export interface CramPlan {
  userId: string;
  examDate: Date;
  startDate: Date;
  currentDay: number;
  sessions: CramSession[];
  progress: {
    sessionsCompleted: number;
    totalSessions: number;
    averageScore: number;
    hoursStudied: number;
  };
  focusAreas: CIAPart[];
  weakTopics: string[];
}

export interface IPPFComponent {
  code: string;
  name: string;
  description: string;
  keyPoints: string[];
  examTips: string[];
  part: CIAPart;
}

export interface IIAStandard {
  number: string;
  title: string;
  summary: string;
  keyRequirements: string[];
  examFocus: string;
  part: CIAPart;
}

export interface EthicsRule {
  principle: string;
  rules: string[];
  examples: string[];
  violations: string[];
}

// ============================================================================
// IPPF Framework Reference
// ============================================================================

export const IPPF_COMPONENTS: IPPFComponent[] = [
  {
    code: 'MISSION',
    name: 'Mission of Internal Auditing',
    description: 'To enhance and protect organizational value by providing risk-based and objective assurance, advice, and insight.',
    keyPoints: [
      'Enhance and protect organizational value',
      'Risk-based approach',
      'Objective assurance and advice',
      'Provides insight to management',
    ],
    examTips: [
      'Know the exact wording of the mission statement',
      'Understand how mission guides audit activities',
    ],
    part: 'CIA1',
  },
  {
    code: 'PRINCIPLES',
    name: 'Core Principles for Internal Auditing',
    description: 'Ten principles that articulate internal auditing effectiveness.',
    keyPoints: [
      'Demonstrates integrity',
      'Demonstrates competence and due professional care',
      'Is objective and free from undue influence',
      'Aligns with strategies, objectives, and risks',
      'Is appropriately positioned and resourced',
      'Demonstrates quality and continuous improvement',
      'Communicates effectively',
      'Provides risk-based assurance',
      'Is insightful, proactive, and future-focused',
      'Promotes organizational improvement',
    ],
    examTips: [
      'Know all 10 principles',
      'Understand how principles apply in practice scenarios',
    ],
    part: 'CIA1',
  },
  {
    code: 'DEFINITION',
    name: 'Definition of Internal Auditing',
    description: 'Internal auditing is an independent, objective assurance and consulting activity designed to add value and improve operations.',
    keyPoints: [
      'Independence and objectivity',
      'Assurance and consulting activities',
      'Adds value to organization',
      'Systematic, disciplined approach',
      'Evaluates governance, risk, and control',
    ],
    examTips: [
      'Memorize the exact definition',
      'Distinguish between assurance and consulting',
    ],
    part: 'CIA1',
  },
  {
    code: 'COE',
    name: 'Code of Ethics',
    description: 'Principles and Rules of Conduct that guide internal auditors professional behavior.',
    keyPoints: [
      'Four Principles: Integrity, Objectivity, Confidentiality, Competency',
      'Rules of Conduct for each principle',
      'Applicable to all internal audit services',
    ],
    examTips: [
      'Know all four principles and their rules',
      'Recognize ethics violations in scenarios',
    ],
    part: 'CIA1',
  },
  {
    code: 'STANDARDS',
    name: 'International Standards for Professional Practice',
    description: 'Mandatory guidance for internal audit practice, consisting of Attribute and Performance Standards.',
    keyPoints: [
      'Attribute Standards (1000s) - characteristics of organizations and individuals',
      'Performance Standards (2000s) - nature of internal audit activities',
      'Implementation Standards - apply to specific engagement types',
    ],
    examTips: [
      'Know the standard numbers and their topics',
      'Focus on 1000-1322 and 2000-2600 series',
    ],
    part: 'CIA1',
  },
  {
    code: 'IG',
    name: 'Implementation Guidance',
    description: 'Recommended (not mandatory) guidance that assists in applying the Standards.',
    keyPoints: [
      'Practices, methods, and considerations',
      'Not mandatory but strongly recommended',
      'Provides how-to guidance',
    ],
    examTips: [
      'Understand it is guidance, not mandatory',
      'Know how it supplements Standards',
    ],
    part: 'CIA2',
  },
  {
    code: 'SG',
    name: 'Supplemental Guidance',
    description: 'Detailed guidance for conducting internal audit activities.',
    keyPoints: [
      'Position Papers',
      'Practice Guides',
      'Global Technology Audit Guides (GTAGs)',
    ],
    examTips: [
      'Know the types of supplemental guidance',
      'Understand their role in audit practice',
    ],
    part: 'CIA2',
  },
];

// ============================================================================
// IIA Standards Quick Reference
// ============================================================================

export const IIA_STANDARDS: IIAStandard[] = [
  // Attribute Standards (1000 series)
  {
    number: '1000',
    title: 'Purpose, Authority, and Responsibility',
    summary: 'Internal audit charter must define purpose, authority, and responsibility.',
    keyRequirements: [
      'Charter must be approved by board',
      'Defines reporting relationships',
      'Establishes access to records and personnel',
    ],
    examFocus: 'Know what must be included in the charter',
    part: 'CIA1',
  },
  {
    number: '1100',
    title: 'Independence and Objectivity',
    summary: 'Internal audit must be independent and auditors objective.',
    keyRequirements: [
      'CAE reports functionally to the board',
      'No direct operational responsibility impairs objectivity',
      'Disclose impairments to independence',
    ],
    examFocus: 'Identify threats to independence and objectivity',
    part: 'CIA1',
  },
  {
    number: '1200',
    title: 'Proficiency and Due Professional Care',
    summary: 'Engagements must be performed with proficiency and due care.',
    keyRequirements: [
      'Possess knowledge and skills for engagements',
      'Exercise due professional care',
      'Continuing professional development',
    ],
    examFocus: 'Distinguish proficiency from due care requirements',
    part: 'CIA1',
  },
  {
    number: '1300',
    title: 'Quality Assurance and Improvement Program',
    summary: 'CAE must develop QAIP covering all aspects of internal audit.',
    keyRequirements: [
      'Internal assessments ongoing and periodic',
      'External assessments at least every 5 years',
      'Report results to board',
    ],
    examFocus: 'Know frequency requirements and assessment types',
    part: 'CIA1',
  },
  // Performance Standards (2000 series)
  {
    number: '2000',
    title: 'Managing the Internal Audit Activity',
    summary: 'CAE must manage audit activity to ensure it adds value.',
    keyRequirements: [
      'Risk-based audit plan',
      'Communicate plans and resource requirements',
      'Report to senior management and board',
    ],
    examFocus: 'Understand the CAE\'s management responsibilities',
    part: 'CIA2',
  },
  {
    number: '2100',
    title: 'Nature of Work',
    summary: 'Internal audit evaluates and contributes to governance, risk, and control.',
    keyRequirements: [
      'Governance processes',
      'Risk management',
      'Control processes',
    ],
    examFocus: 'How internal audit adds value in each area',
    part: 'CIA2',
  },
  {
    number: '2200',
    title: 'Engagement Planning',
    summary: 'Internal auditors must develop and document plans for each engagement.',
    keyRequirements: [
      'Objectives, scope, timing, resources',
      'Consider risk assessment results',
      'Document work programs',
    ],
    examFocus: 'Elements of engagement planning',
    part: 'CIA2',
  },
  {
    number: '2300',
    title: 'Performing the Engagement',
    summary: 'Internal auditors must identify, analyze, evaluate, and document information.',
    keyRequirements: [
      'Sufficient, reliable, relevant information',
      'Analysis and evaluation of information',
      'Document engagement results',
    ],
    examFocus: 'Evidence requirements and documentation',
    part: 'CIA2',
  },
  {
    number: '2400',
    title: 'Communicating Results',
    summary: 'Internal auditors must communicate engagement results.',
    keyRequirements: [
      'Criteria for reporting',
      'Quality of communications',
      'Errors and omissions disclosure',
    ],
    examFocus: 'Report elements and communication quality',
    part: 'CIA2',
  },
  {
    number: '2500',
    title: 'Monitoring Progress',
    summary: 'CAE must establish follow-up process for disposition of results.',
    keyRequirements: [
      'Monitor management actions',
      'Follow-up on engagement results',
      'Report unacceptable risk acceptance',
    ],
    examFocus: 'Follow-up responsibilities',
    part: 'CIA2',
  },
  {
    number: '2600',
    title: 'Communicating Acceptance of Risks',
    summary: 'When management accepts risk exceeding appetite, CAE must discuss with management.',
    keyRequirements: [
      'Discuss with senior management',
      'If not resolved, report to board',
      'Document all communications',
    ],
    examFocus: 'Escalation process for risk acceptance',
    part: 'CIA2',
  },
];

// ============================================================================
// Code of Ethics Reference
// ============================================================================

export const CODE_OF_ETHICS: EthicsRule[] = [
  {
    principle: 'Integrity',
    rules: [
      'Perform work with honesty, diligence, and responsibility',
      'Observe the law and make disclosures expected by law and profession',
      'Not knowingly be party to illegal activity or discredit profession',
      'Respect and contribute to legitimate and ethical objectives',
    ],
    examples: [
      'Reporting all findings, even unfavorable ones',
      'Not accepting bribes or gifts that could influence judgment',
    ],
    violations: [
      'Hiding negative findings to please management',
      'Falsifying documentation',
    ],
  },
  {
    principle: 'Objectivity',
    rules: [
      'Not participate in activities or relationships that may impair judgment',
      'Not accept anything that may impair judgment',
      'Disclose all material facts known that could distort reporting',
    ],
    examples: [
      'Disclosing family relationship with auditee',
      'Refusing gifts from audit clients',
    ],
    violations: [
      'Auditing an area where you previously had operational responsibility',
      'Hiding conflicts of interest',
    ],
  },
  {
    principle: 'Confidentiality',
    rules: [
      'Be prudent in use and protection of information',
      'Not use information for personal gain or contrary to law/objectives',
    ],
    examples: [
      'Securing audit working papers',
      'Not discussing audit findings with unauthorized parties',
    ],
    violations: [
      'Sharing confidential information with competitors',
      'Using insider information for personal trading',
    ],
  },
  {
    principle: 'Competency',
    rules: [
      'Engage only in services for which you have necessary knowledge and skills',
      'Perform services in accordance with Standards',
      'Continually improve proficiency and effectiveness',
    ],
    examples: [
      'Seeking training for new audit areas',
      'Declining assignments beyond your expertise',
    ],
    violations: [
      'Accepting complex IT audit without proper training',
      'Not maintaining CPE requirements',
    ],
  },
];

// ============================================================================
// High-Yield Topics by Part
// ============================================================================

export const HIGH_YIELD_TOPICS: Record<CIAPart, { topic: string; weight: string; tips: string[] }[]> = {
  CIA1: [
    {
      topic: 'IPPF Framework',
      weight: '25%',
      tips: [
        'Know all mandatory vs. recommended guidance',
        'Memorize Mission, Definition, Principles',
        'Understand Standards structure (1000s vs 2000s)',
      ],
    },
    {
      topic: 'Independence and Objectivity',
      weight: '20%',
      tips: [
        'Organizational independence (CAE reporting)',
        'Individual objectivity (conflict of interest)',
        'Impairments and disclosures',
      ],
    },
    {
      topic: 'Code of Ethics',
      weight: '15%',
      tips: [
        'Four principles: Integrity, Objectivity, Confidentiality, Competency',
        'Rules of conduct for each',
        'Violation scenarios',
      ],
    },
    {
      topic: 'Quality Assurance',
      weight: '15%',
      tips: [
        'Internal vs external assessments',
        'Self-assessment with independent validation',
        'Frequency: external every 5 years',
      ],
    },
    {
      topic: 'Governance, Risk, Control',
      weight: '25%',
      tips: [
        'Three lines model',
        'Risk assessment concepts',
        'Control types and frameworks',
      ],
    },
  ],
  CIA2: [
    {
      topic: 'Managing the Audit Activity',
      weight: '20%',
      tips: [
        'Risk-based audit planning',
        'Resource management',
        'CAE responsibilities',
      ],
    },
    {
      topic: 'Engagement Planning',
      weight: '25%',
      tips: [
        'Objectives, scope, criteria',
        'Risk-based work programs',
        'Resource allocation',
      ],
    },
    {
      topic: 'Performing the Engagement',
      weight: '30%',
      tips: [
        'Evidence: sufficient, reliable, relevant, useful',
        'Analytical procedures',
        'Sampling techniques',
        'Documentation standards',
      ],
    },
    {
      topic: 'Communicating Results',
      weight: '25%',
      tips: [
        'Report elements',
        'Finding attributes (condition, criteria, cause, effect)',
        'Engagement opinions',
        'Report distribution',
      ],
    },
  ],
  CIA3: [
    {
      topic: 'Business Processes',
      weight: '30%',
      tips: [
        'Process analysis and mapping',
        'Performance metrics',
        'Operational efficiency',
      ],
    },
    {
      topic: 'Financial Management',
      weight: '25%',
      tips: [
        'Financial statement analysis',
        'Budgeting and forecasting',
        'Internal financial controls',
      ],
    },
    {
      topic: 'Information Technology',
      weight: '25%',
      tips: [
        'IT governance',
        'Change management',
        'Data security and privacy',
        'Application controls',
      ],
    },
    {
      topic: 'Information Security',
      weight: '20%',
      tips: [
        'Security frameworks',
        'Access controls',
        'Incident response',
        'Business continuity',
      ],
    },
  ],
};

// ============================================================================
// Cram Plan Generation
// ============================================================================

/**
 * Generate a 5-day cram plan
 */
export function generateCramPlan(
  userId: string,
  examDate: Date,
  focusAreas: CIAPart[],
  weakTopics: string[]
): CramPlan {
  const startDate = new Date();
  const sessions: CramSession[] = [];
  let sessionId = 0;
  
  // Day 1: IPPF and Ethics Deep Dive (Focus on Part 1)
  sessions.push(
    createSession(++sessionId, 1, 'CIA1', 'IPPF Framework Overview', 45, 'review'),
    createSession(++sessionId, 1, 'CIA1', 'Code of Ethics Principles', 30, 'ethics'),
    createSession(++sessionId, 1, 'CIA1', 'IIA Standards 1000 Series', 45, 'standards'),
    createSession(++sessionId, 1, 'CIA1', 'Part 1 Practice Questions', 60, 'practice'),
  );
  
  // Day 2: Standards Deep Dive (Mix of Part 1 & 2)
  sessions.push(
    createSession(++sessionId, 2, 'CIA1', 'Independence and Objectivity', 30, 'review'),
    createSession(++sessionId, 2, 'CIA2', 'IIA Standards 2000 Series', 60, 'standards'),
    createSession(++sessionId, 2, 'CIA2', 'Engagement Planning', 45, 'review'),
    createSession(++sessionId, 2, 'CIA2', 'Part 2 Practice Questions', 60, 'practice'),
  );
  
  // Day 3: Part 2 & Part 3 Focus
  sessions.push(
    createSession(++sessionId, 3, 'CIA2', 'Performing Engagements', 45, 'review'),
    createSession(++sessionId, 3, 'CIA2', 'Communicating Results', 45, 'review'),
    createSession(++sessionId, 3, 'CIA3', 'IT and Security Concepts', 45, 'review'),
    createSession(++sessionId, 3, 'CIA3', 'Part 3 Practice Questions', 60, 'practice'),
  );
  
  // Day 4: Weak Areas Focus + Full Review
  for (const area of focusAreas.slice(0, 2)) {
    sessions.push(
      createSession(++sessionId, 4, area, `${CIA_PART_CONFIG[area].name} Review`, 60, 'review'),
    );
  }
  sessions.push(
    createSession(++sessionId, 4, 'all', 'High-Yield Flashcards', 45, 'flashcards'),
    createSession(++sessionId, 4, 'all', 'Mixed Practice Questions', 60, 'practice'),
  );
  
  // Day 5: Final Review and Confidence Building
  sessions.push(
    createSession(++sessionId, 5, 'CIA1', 'Ethics Quick Review', 20, 'ethics'),
    createSession(++sessionId, 5, 'CIA1', 'Standards Quick Reference', 30, 'standards'),
    createSession(++sessionId, 5, 'all', 'Weak Topics Focus', 45, 'review'),
    createSession(++sessionId, 5, 'all', 'Final Practice Set', 60, 'practice'),
    createSession(++sessionId, 5, 'all', 'Last-Minute Tips', 15, 'review'),
  );
  
  return {
    userId,
    examDate,
    startDate,
    currentDay: 1,
    sessions,
    progress: {
      sessionsCompleted: 0,
      totalSessions: sessions.length,
      averageScore: 0,
      hoursStudied: 0,
    },
    focusAreas,
    weakTopics,
  };
}

function createSession(
  id: number,
  day: number,
  part: CIAPart | 'all',
  topic: string,
  duration: number,
  type: CramSession['type']
): CramSession {
  return {
    id: `cram_${id}`,
    day,
    part,
    topic,
    duration,
    type,
    completed: false,
  };
}

/**
 * Complete a cram session
 */
export function completeSession(
  plan: CramPlan,
  sessionId: string,
  score?: number
): CramPlan {
  const updatedSessions = plan.sessions.map(s => {
    if (s.id === sessionId) {
      return { ...s, completed: true, score };
    }
    return s;
  });
  
  const completed = updatedSessions.filter(s => s.completed);
  const scores = completed.filter(s => s.score !== undefined).map(s => s.score as number);
  const hoursStudied = completed.reduce((sum, s) => sum + s.duration, 0) / 60;
  
  return {
    ...plan,
    sessions: updatedSessions,
    progress: {
      sessionsCompleted: completed.length,
      totalSessions: plan.sessions.length,
      averageScore: scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0,
      hoursStudied: Math.round(hoursStudied * 10) / 10,
    },
  };
}

/**
 * Get sessions for a specific day
 */
export function getDaySessions(plan: CramPlan, day: number): CramSession[] {
  return plan.sessions.filter(s => s.day === day);
}

/**
 * Advance to next day
 */
export function advanceDay(plan: CramPlan): CramPlan {
  return {
    ...plan,
    currentDay: Math.min(5, plan.currentDay + 1),
  };
}

// ============================================================================
// Quick Reference Cards
// ============================================================================

export interface QuickCard {
  front: string;
  back: string;
  part: CIAPart;
  category: string;
}

/**
 * Get high-yield flashcards for cram mode
 */
export function getCramFlashcards(): QuickCard[] {
  return [
    // IPPF Cards
    {
      front: 'What is the Mission of Internal Auditing?',
      back: 'To enhance and protect organizational value by providing risk-based and objective assurance, advice, and insight.',
      part: 'CIA1',
      category: 'IPPF',
    },
    {
      front: 'What are the four components of mandatory IPPF guidance?',
      back: '1. Core Principles\n2. Definition of Internal Auditing\n3. Code of Ethics\n4. International Standards',
      part: 'CIA1',
      category: 'IPPF',
    },
    {
      front: 'What are the four principles in the Code of Ethics?',
      back: '1. Integrity\n2. Objectivity\n3. Confidentiality\n4. Competency',
      part: 'CIA1',
      category: 'Ethics',
    },
    {
      front: 'What distinguishes Attribute Standards from Performance Standards?',
      back: 'Attribute Standards (1000s) describe characteristics of organizations and individuals. Performance Standards (2000s) describe the nature of internal auditing and quality criteria.',
      part: 'CIA1',
      category: 'Standards',
    },
    {
      front: 'How often must external quality assessments be conducted?',
      back: 'At least once every five years by a qualified, independent assessor or assessment team from outside the organization.',
      part: 'CIA1',
      category: 'Standards',
    },
    {
      front: 'What are the four conditions of a finding?',
      back: '1. Condition (What is?)\n2. Criteria (What should be?)\n3. Cause (Why the difference?)\n4. Effect (What is the impact?)',
      part: 'CIA2',
      category: 'Reporting',
    },
    {
      front: 'What does SRRP stand for in evidence evaluation?',
      back: 'Sufficient, Reliable, Relevant, and (sometimes) Pertinent - the criteria for audit evidence.',
      part: 'CIA2',
      category: 'Evidence',
    },
    {
      front: 'What is the Three Lines Model?',
      back: '1st Line: Operational management (owns risk)\n2nd Line: Risk/Compliance functions (oversees risk)\n3rd Line: Internal Audit (provides assurance)',
      part: 'CIA1',
      category: 'Governance',
    },
    {
      front: 'Who should approve the internal audit charter?',
      back: 'The board (or equivalent oversight body) must approve the charter.',
      part: 'CIA1',
      category: 'Standards',
    },
    {
      front: 'What is the primary purpose of the audit work program?',
      back: 'To document procedures for collecting, analyzing, interpreting, and documenting information during the engagement.',
      part: 'CIA2',
      category: 'Planning',
    },
  ];
}

// ============================================================================
// Exam Day Tips
// ============================================================================

export function getExamDayTips(part: CIAPart): string[] {
  const generalTips = [
    'Arrive early and get settled',
    'Read each question carefully - twice if needed',
    'Watch for qualifiers like "most," "least," "best," "except"',
    'Eliminate obviously wrong answers first',
    'Flag difficult questions and return to them',
    'Manage your time - don\'t spend too long on any one question',
    'Trust your preparation',
  ];
  
  const partSpecificTips: Record<CIAPart, string[]> = {
    CIA1: [
      'Know the IPPF cold - especially mission, definition, and principles',
      'Ethics questions often require identifying violations',
      'Standards questions focus on requirements, not recommendations',
      'Independence scenarios are heavily tested',
    ],
    CIA2: [
      'Focus on the engagement lifecycle',
      'Know evidence requirements (sufficient, reliable, relevant)',
      'Report writing questions focus on the four conditions',
      'Understand sampling and analytical procedures',
    ],
    CIA3: [
      'Balance business and IT knowledge',
      'IT questions focus on controls, not technical details',
      'Financial questions emphasize internal controls',
      'Know common security frameworks and concepts',
    ],
  };
  
  return [...partSpecificTips[part], ...generalTips];
}
