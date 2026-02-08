/**
 * CISA Cram Mode Service
 * 
 * Intensive last-minute study mode featuring:
 * - High-yield topics by exam weight
 * - Essential formulas and frameworks
 * - Key terminology flashcards
 * - Rapid-fire practice questions
 * - 3-5 day study plan
 */

import { CISASectionId } from '../courses/cisa/config';

// Types
export interface CramTopic {
  id: string;
  domain: CISASectionId;
  title: string;
  priority: 'critical' | 'high' | 'medium';
  estimatedMinutes: number;
  keyPoints: string[];
  mnemonics?: string[];
  commonQuestions: string[];
}

export interface CramFramework {
  id: string;
  name: string;
  domain: CISASectionId;
  description: string;
  keyComponents: string[];
  examTip: string;
}

export interface CramDay {
  day: number;
  title: string;
  focusDomains: CISASectionId[];
  topics: string[]; // Topic IDs
  frameworkCount: number;
  practiceQuestions: number;
  estimatedHours: number;
}

export interface CramState {
  currentDay: number;
  startDate: Date | null;
  completedTopics: string[];
  frameworksReviewed: string[];
  questionsAnswered: number;
  correctAnswers: number;
  isActive: boolean;
}

// High-yield CISA topics organized by domain
export const CISA_CRAM_TOPICS: CramTopic[] = [
  // DOMAIN 4 - Operations & Business Resilience (26%)
  {
    id: 'cram-d4-001',
    domain: 'CISA4',
    title: 'Disaster Recovery Planning',
    priority: 'critical',
    estimatedMinutes: 20,
    keyPoints: [
      'RTO (Recovery Time Objective) - max acceptable downtime',
      'RPO (Recovery Point Objective) - max acceptable data loss',
      'BIA (Business Impact Analysis) - identifies critical processes',
      'Hot site: Fully operational, immediate failover',
      'Warm site: Partially equipped, hours to activate',
      'Cold site: Empty facility, days to activate',
    ],
    mnemonics: ['RTO = Time, RPO = Point/Data', 'Hot-Warm-Cold = Fast-Medium-Slow'],
    commonQuestions: [
      'Which recovery strategy minimizes RTO?',
      'What should be performed before creating a DRP?',
      'How often should DR plans be tested?',
    ],
  },
  {
    id: 'cram-d4-002',
    domain: 'CISA4',
    title: 'Change Management',
    priority: 'critical',
    estimatedMinutes: 15,
    keyPoints: [
      'CAB (Change Advisory Board) approves changes',
      'Emergency changes require post-implementation review',
      'Separation of duties between development and production',
      'Rollback procedures must be documented',
      'All changes must be logged and traceable',
    ],
    commonQuestions: [
      'Who should approve emergency changes?',
      'What is the purpose of the CAB?',
      'What control prevents unauthorized production changes?',
    ],
  },
  {
    id: 'cram-d4-003',
    domain: 'CISA4',
    title: 'Incident Management',
    priority: 'high',
    estimatedMinutes: 15,
    keyPoints: [
      'Detection → Analysis → Containment → Eradication → Recovery → Lessons Learned',
      'Incident classification by severity/impact',
      'Chain of custody for forensic evidence',
      'Communication plan for stakeholders',
      'Post-incident review is mandatory',
    ],
    mnemonics: ['DACERLR - Detect, Analyze, Contain, Eradicate, Recover, Learn, Report'],
    commonQuestions: [
      'What is the first step in incident response?',
      'Why is chain of custody important?',
      'Who should be notified during a major incident?',
    ],
  },
  
  // DOMAIN 5 - Protection of Information Assets (26%)
  {
    id: 'cram-d5-001',
    domain: 'CISA5',
    title: 'Access Control Models',
    priority: 'critical',
    estimatedMinutes: 20,
    keyPoints: [
      'DAC (Discretionary) - Owner controls access',
      'MAC (Mandatory) - System enforces access by labels',
      'RBAC (Role-Based) - Access based on job function',
      'Principle of Least Privilege - minimum necessary access',
      'Separation of Duties - prevent fraud',
      'Need-to-Know - access only to required information',
    ],
    mnemonics: ['DAC = Discretion of owner, MAC = Mandatory labels, RBAC = Role determines access'],
    commonQuestions: [
      'Which access model is based on security labels?',
      'What control prevents a single person from committing fraud?',
      'Which principle limits access to job requirements?',
    ],
  },
  {
    id: 'cram-d5-002',
    domain: 'CISA5',
    title: 'Encryption Fundamentals',
    priority: 'critical',
    estimatedMinutes: 20,
    keyPoints: [
      'Symmetric encryption: Same key for encrypt/decrypt (AES, 3DES)',
      'Asymmetric encryption: Public/Private key pair (RSA)',
      'Hash functions: One-way, integrity verification (SHA-256)',
      'Digital signatures: Authentication + Non-repudiation',
      'PKI: Public Key Infrastructure for certificate management',
      'TLS/SSL: Transport layer security for data in transit',
    ],
    mnemonics: ['Symmetric = Same key, Asymmetric = A pair'],
    commonQuestions: [
      'What provides non-repudiation?',
      'Which is faster: symmetric or asymmetric?',
      'What ensures message integrity?',
    ],
  },
  {
    id: 'cram-d5-003',
    domain: 'CISA5',
    title: 'Network Security Controls',
    priority: 'high',
    estimatedMinutes: 15,
    keyPoints: [
      'Firewall: Network perimeter protection',
      'IDS (Intrusion Detection): Detects attacks, alerts only',
      'IPS (Intrusion Prevention): Detects AND blocks attacks',
      'DMZ: Network segment for public-facing servers',
      'VPN: Encrypted tunnel for remote access',
      'Network segmentation: Isolate sensitive systems',
    ],
    commonQuestions: [
      'What is the difference between IDS and IPS?',
      'Where should web servers be placed?',
      'What technology secures remote access?',
    ],
  },
  
  // DOMAIN 1 - IS Auditing Process (18%)
  {
    id: 'cram-d1-001',
    domain: 'CISA1',
    title: 'Audit Planning',
    priority: 'critical',
    estimatedMinutes: 20,
    keyPoints: [
      'Risk-based audit approach prioritizes high-risk areas',
      'Audit charter defines authority and responsibility',
      'Materiality determines significance of findings',
      'Audit universe: All auditable areas in organization',
      'Engagement letter documents scope and objectives',
      'Preliminary survey: Understand the environment',
    ],
    commonQuestions: [
      'What document establishes audit authority?',
      'How should audits be prioritized?',
      'What determines significance of an issue?',
    ],
  },
  {
    id: 'cram-d1-002',
    domain: 'CISA1',
    title: 'Audit Evidence',
    priority: 'critical',
    estimatedMinutes: 15,
    keyPoints: [
      'Sufficient: Enough evidence to support conclusions',
      'Relevant: Evidence relates to audit objectives',
      'Reliable: Evidence is trustworthy and accurate',
      'Physical evidence > Documentary > Hearsay',
      'Corroborating evidence strengthens findings',
      'Evidence must be properly documented and stored',
    ],
    mnemonics: ['SCAR - Sufficient, Competent(Reliable), Appropriate, Relevant'],
    commonQuestions: [
      'What makes evidence reliable?',
      'Which type of evidence is most persuasive?',
      'Why is corroborating evidence important?',
    ],
  },
  {
    id: 'cram-d1-003',
    domain: 'CISA1',
    title: 'Audit Reporting',
    priority: 'high',
    estimatedMinutes: 15,
    keyPoints: [
      'Exit meeting: Discuss findings with management',
      'Draft report: Allow management response',
      'Final report: Include management action plans',
      'Findings: Condition + Criteria + Cause + Effect',
      'Follow-up audit: Verify corrective actions',
      'Independence must be maintained throughout',
    ],
    mnemonics: ['CCCE - Condition, Criteria, Cause, Effect'],
    commonQuestions: [
      'What should findings include?',
      'When should management respond?',
      'What is the purpose of follow-up audit?',
    ],
  },
  
  // DOMAIN 2 - IT Governance (18%)
  {
    id: 'cram-d2-001',
    domain: 'CISA2',
    title: 'IT Governance Frameworks',
    priority: 'critical',
    estimatedMinutes: 25,
    keyPoints: [
      'COBIT: Control Objectives for Information Technology',
      'ITIL: IT Service Management best practices',
      'ISO 27001: Information Security Management System',
      'ISO 38500: Corporate governance of IT',
      'Board responsibility: Strategic alignment, value delivery',
      'IT steering committee: Prioritization and oversight',
    ],
    mnemonics: ['COBIT = Controls, ITIL = IT Library/Services, ISO 27001 = Security'],
    commonQuestions: [
      'Which framework focuses on IT controls?',
      'Who is ultimately responsible for IT governance?',
      'What is the purpose of IT steering committee?',
    ],
  },
  {
    id: 'cram-d2-002',
    domain: 'CISA2',
    title: 'IT Risk Management',
    priority: 'critical',
    estimatedMinutes: 20,
    keyPoints: [
      'Risk = Threat × Vulnerability × Impact',
      'Risk identification → Assessment → Response → Monitoring',
      'Risk responses: Accept, Mitigate, Transfer, Avoid',
      'Risk appetite: Amount of risk organization accepts',
      'Risk tolerance: Acceptable variance from appetite',
      'Residual risk: Risk remaining after controls',
    ],
    mnemonics: ['AMTA - Accept, Mitigate, Transfer, Avoid'],
    commonQuestions: [
      'What is residual risk?',
      'Who defines risk appetite?',
      'What is the difference between risk appetite and tolerance?',
    ],
  },
  
  // DOMAIN 3 - Acquisition, Development & Implementation (12%)
  {
    id: 'cram-d3-001',
    domain: 'CISA3',
    title: 'SDLC and Project Management',
    priority: 'high',
    estimatedMinutes: 20,
    keyPoints: [
      'SDLC phases: Planning → Analysis → Design → Development → Testing → Implementation → Maintenance',
      'Agile: Iterative, flexible, continuous delivery',
      'Waterfall: Sequential, documentation-heavy',
      'Project scope creep: Controls needed to prevent',
      'User acceptance testing (UAT): Final validation',
      'Post-implementation review: Evaluate success',
    ],
    commonQuestions: [
      'Who should perform UAT?',
      'What prevents scope creep?',
      'When should audit be involved in SDLC?',
    ],
  },
  {
    id: 'cram-d3-002',
    domain: 'CISA3',
    title: 'Application Controls',
    priority: 'high',
    estimatedMinutes: 15,
    keyPoints: [
      'Input controls: Validation, authorization, completeness',
      'Processing controls: Error handling, reconciliation',
      'Output controls: Distribution, retention, disposal',
      'Edit checks: Range, limit, validity, reasonableness',
      'Programmed controls: Automated checks in applications',
      'Control totals: Batch totals, hash totals, record counts',
    ],
    mnemonics: ['IPO - Input, Processing, Output controls'],
    commonQuestions: [
      'What type of control validates data entry?',
      'What ensures batch processing completeness?',
      'What is a hash total used for?',
    ],
  },
];

// Key frameworks to memorize
export const CISA_CRAM_FRAMEWORKS: CramFramework[] = [
  {
    id: 'fw-cobit',
    name: 'COBIT 2019',
    domain: 'CISA2',
    description: 'Framework for enterprise governance and management of IT',
    keyComponents: [
      '40 governance and management objectives',
      '5 principles: Meeting stakeholder needs, holistic approach, dynamic governance system, distinct governance from management, tailored to enterprise needs',
      'Governance vs Management distinction',
    ],
    examTip: 'COBIT focuses on WHAT should be done, ITIL focuses on HOW to do it.',
  },
  {
    id: 'fw-itil',
    name: 'ITIL 4',
    domain: 'CISA4',
    description: 'IT Service Management best practices',
    keyComponents: [
      'Service Value System (SVS)',
      '34 management practices',
      '4 dimensions: Organizations/People, Information/Technology, Partners/Suppliers, Value Streams/Processes',
    ],
    examTip: 'ITIL is about IT service delivery and operations, not security controls.',
  },
  {
    id: 'fw-iso27001',
    name: 'ISO/IEC 27001',
    domain: 'CISA5',
    description: 'Information Security Management System (ISMS)',
    keyComponents: [
      'Plan-Do-Check-Act cycle',
      'Risk assessment and treatment',
      '114 controls in Annex A (ISO 27002)',
      'Certification by third-party auditors',
    ],
    examTip: 'ISO 27001 is the certifiable standard; ISO 27002 is the implementation guidance.',
  },
  {
    id: 'fw-nist',
    name: 'NIST Cybersecurity Framework',
    domain: 'CISA5',
    description: 'Voluntary framework for managing cybersecurity risk',
    keyComponents: [
      '5 functions: Identify, Protect, Detect, Respond, Recover',
      'Implementation Tiers (1-4)',
      'Framework Profile: Current vs Target state',
    ],
    examTip: 'Remember IPDRR sequence - starts with Identify, ends with Recover.',
  },
  {
    id: 'fw-coso',
    name: 'COSO Internal Control Framework',
    domain: 'CISA2',
    description: 'Internal control guidance for enterprises',
    keyComponents: [
      '5 components: Control Environment, Risk Assessment, Control Activities, Information & Communication, Monitoring',
      '17 principles',
      'COSO ERM: Enterprise Risk Management',
    ],
    examTip: 'COSO is broader than IT; focuses on organizational internal controls.',
  },
];

// 5-Day Cram Schedule
export const CISA_CRAM_SCHEDULE: CramDay[] = [
  {
    day: 1,
    title: 'Domains 4 & 5: Operations and Security (52% of exam)',
    focusDomains: ['CISA4', 'CISA5'],
    topics: ['cram-d4-001', 'cram-d4-002', 'cram-d4-003', 'cram-d5-001', 'cram-d5-002', 'cram-d5-003'],
    frameworkCount: 2,
    practiceQuestions: 75,
    estimatedHours: 6,
  },
  {
    day: 2,
    title: 'Domain 1: IS Audit Process (18%)',
    focusDomains: ['CISA1'],
    topics: ['cram-d1-001', 'cram-d1-002', 'cram-d1-003'],
    frameworkCount: 1,
    practiceQuestions: 50,
    estimatedHours: 4,
  },
  {
    day: 3,
    title: 'Domains 2 & 3: Governance and Development (30%)',
    focusDomains: ['CISA2', 'CISA3'],
    topics: ['cram-d2-001', 'cram-d2-002', 'cram-d3-001', 'cram-d3-002'],
    frameworkCount: 2,
    practiceQuestions: 50,
    estimatedHours: 5,
  },
  {
    day: 4,
    title: 'Full Practice Exam + Review',
    focusDomains: ['CISA1', 'CISA2', 'CISA3', 'CISA4', 'CISA5'],
    topics: [],
    frameworkCount: 0,
    practiceQuestions: 150,
    estimatedHours: 6,
  },
  {
    day: 5,
    title: 'Final Review: Weak Areas + Frameworks',
    focusDomains: ['CISA4', 'CISA5'], // Default to high-weight, adjust based on performance
    topics: [],
    frameworkCount: 5,
    practiceQuestions: 50,
    estimatedHours: 4,
  },
];

// Storage key
const CRAM_STATE_KEY = 'cisa-cram-state';

// Module state
let cramState: CramState = loadCramState();

/**
 * Load cram state from storage
 */
function loadCramState(): CramState {
  try {
    const stored = localStorage.getItem(CRAM_STATE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.startDate) parsed.startDate = new Date(parsed.startDate);
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load cram state:', e);
  }
  return {
    currentDay: 1,
    startDate: null,
    completedTopics: [],
    frameworksReviewed: [],
    questionsAnswered: 0,
    correctAnswers: 0,
    isActive: false,
  };
}

/**
 * Save cram state to storage
 */
function saveCramState(): void {
  try {
    localStorage.setItem(CRAM_STATE_KEY, JSON.stringify(cramState));
  } catch (e) {
    console.error('Failed to save cram state:', e);
  }
}

/**
 * Start cram mode
 */
export function startCramMode(): CramState {
  cramState = {
    currentDay: 1,
    startDate: new Date(),
    completedTopics: [],
    frameworksReviewed: [],
    questionsAnswered: 0,
    correctAnswers: 0,
    isActive: true,
  };
  saveCramState();
  return cramState;
}

/**
 * Get current cram state
 */
export function getCramState(): CramState {
  return cramState;
}

/**
 * Get today's study plan
 */
export function getTodaysStudyPlan(): Omit<CramDay, 'topics'> & { topics: CramTopic[]; frameworks: CramFramework[] } {
  const day = CISA_CRAM_SCHEDULE[cramState.currentDay - 1] || CISA_CRAM_SCHEDULE[0];
  
  const topics = day.topics
    .map(id => CISA_CRAM_TOPICS.find(t => t.id === id))
    .filter((t): t is CramTopic => t !== undefined);
  
  const frameworks = day.focusDomains.includes('CISA1' as CISASectionId) || 
                     day.focusDomains.includes('CISA2' as CISASectionId) ||
                     cramState.currentDay === 5
    ? CISA_CRAM_FRAMEWORKS.filter(f => day.focusDomains.includes(f.domain))
    : [];
  
  return {
    ...day,
    topics,
    frameworks,
  };
}

/**
 * Complete a topic
 */
export function completeTopic(topicId: string): void {
  if (!cramState.completedTopics.includes(topicId)) {
    cramState.completedTopics.push(topicId);
    saveCramState();
  }
}

/**
 * Review a framework
 */
export function reviewFramework(frameworkId: string): void {
  if (!cramState.frameworksReviewed.includes(frameworkId)) {
    cramState.frameworksReviewed.push(frameworkId);
    saveCramState();
  }
}

/**
 * Record practice question result
 */
export function recordPracticeQuestion(isCorrect: boolean): void {
  cramState.questionsAnswered++;
  if (isCorrect) cramState.correctAnswers++;
  saveCramState();
}

/**
 * Advance to next day
 */
export function advanceDay(): boolean {
  if (cramState.currentDay < CISA_CRAM_SCHEDULE.length) {
    cramState.currentDay++;
    saveCramState();
    return true;
  }
  return false;
}

/**
 * Get cram mode progress
 */
export function getCramProgress(): {
  daysCompleted: number;
  totalDays: number;
  topicsCompleted: number;
  totalTopics: number;
  frameworksReviewed: number;
  totalFrameworks: number;
  questionsAccuracy: number;
  overallProgress: number;
} {
  const totalTopics = CISA_CRAM_TOPICS.length;
  const totalFrameworks = CISA_CRAM_FRAMEWORKS.length;
  
  const daysCompleted = cramState.currentDay - 1;
  const topicsCompleted = cramState.completedTopics.length;
  const frameworksReviewed = cramState.frameworksReviewed.length;
  const questionsAccuracy = cramState.questionsAnswered > 0
    ? Math.round((cramState.correctAnswers / cramState.questionsAnswered) * 100)
    : 0;
  
  // Overall progress weighted: 40% topics, 30% frameworks, 30% questions
  const topicProgress = (topicsCompleted / totalTopics) * 40;
  const frameworkProgress = (frameworksReviewed / totalFrameworks) * 30;
  const questionProgress = Math.min((cramState.questionsAnswered / 275) * 30, 30); // Target 275 questions
  
  return {
    daysCompleted,
    totalDays: CISA_CRAM_SCHEDULE.length,
    topicsCompleted,
    totalTopics,
    frameworksReviewed,
    totalFrameworks,
    questionsAccuracy,
    overallProgress: Math.round(topicProgress + frameworkProgress + questionProgress),
  };
}

/**
 * Get high-yield topics for a domain
 */
export function getHighYieldTopics(domain?: CISASectionId): CramTopic[] {
  let topics = CISA_CRAM_TOPICS;
  
  if (domain) {
    topics = topics.filter(t => t.domain === domain);
  }
  
  return topics.sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

/**
 * Get quick study session (15-30 minutes)
 */
export function getQuickStudySession(): {
  topics: CramTopic[];
  frameworks: CramFramework[];
  estimatedMinutes: number;
} {
  // Pick 2-3 incomplete topics prioritized by importance
  const incompletTopics = CISA_CRAM_TOPICS
    .filter(t => !cramState.completedTopics.includes(t.id))
    .sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2 };
      const domainWeight = { CISA4: 0, CISA5: 1, CISA1: 2, CISA2: 3, CISA3: 4 };
      return (priorityOrder[a.priority] + domainWeight[a.domain]) - 
             (priorityOrder[b.priority] + domainWeight[b.domain]);
    })
    .slice(0, 2);
  
  // Include 1 framework if not all reviewed
  const unreviewedFrameworks = CISA_CRAM_FRAMEWORKS
    .filter(f => !cramState.frameworksReviewed.includes(f.id))
    .slice(0, 1);
  
  const estimatedMinutes = incompletTopics.reduce((sum, t) => sum + t.estimatedMinutes, 0) + 
                          unreviewedFrameworks.length * 10;
  
  return {
    topics: incompletTopics,
    frameworks: unreviewedFrameworks,
    estimatedMinutes,
  };
}

/**
 * Reset cram mode
 */
export function resetCramMode(): void {
  cramState = {
    currentDay: 1,
    startDate: null,
    completedTopics: [],
    frameworksReviewed: [],
    questionsAnswered: 0,
    correctAnswers: 0,
    isActive: false,
  };
  saveCramState();
}

/**
 * End cram mode and get summary
 */
export function endCramMode(): {
  totalDays: number;
  topicsLearned: number;
  frameworksReviewed: number;
  questionsAnswered: number;
  accuracy: number;
  readinessBoost: number; // Estimated percentage point improvement
} {
  const progress = getCramProgress();
  
  // Estimate readiness boost based on cram engagement
  const engagementScore = (progress.topicsCompleted / progress.totalTopics) * 0.5 +
                         (progress.frameworksReviewed / progress.totalFrameworks) * 0.3 +
                         Math.min(cramState.questionsAnswered / 275, 1) * 0.2;
  const readinessBoost = Math.round(engagementScore * 15); // Max 15% boost
  
  const summary = {
    totalDays: cramState.currentDay,
    topicsLearned: progress.topicsCompleted,
    frameworksReviewed: progress.frameworksReviewed,
    questionsAnswered: cramState.questionsAnswered,
    accuracy: progress.questionsAccuracy,
    readinessBoost,
  };
  
  cramState.isActive = false;
  saveCramState();
  
  return summary;
}
