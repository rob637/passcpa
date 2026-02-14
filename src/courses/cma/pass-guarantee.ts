/**
 * CMA Pass Guarantee Configuration
 * 
 * Defines the pass guarantee terms and requirements for the CMA (Certified Management Accountant) course.
 * CMA exam has 2 parts, each scored 0-500, passing is 360.
 * 
 * NOTE: Uses the unified PassGuarantee config from src/config/passGuarantee.ts
 * This file contains CMA-specific overrides and part-specific requirements.
 */

import {
  PassGuaranteeConfig,
  PassGuaranteeRequirement,
  ClaimPolicy,
  ExtensionTerms,
  PASS_GUARANTEE_CLAIM_POLICY,
  PASS_GUARANTEE_EXTENSION_TERMS
} from '../../config/passGuarantee';

// Re-export types for backwards compatibility
export type { PassGuaranteeConfig, PassGuaranteeRequirement };

// CMA-specific requirements (aligned with unified config but with CMA-specific thresholds)
const CMA_REQUIREMENTS: PassGuaranteeRequirement[] = [
  {
    id: 'pg-min-subscription',
    title: 'Maintain Active Subscription',
    description: 'Be subscribed for at least 3 consecutive months before your exam date',
    metric: 'min_paid_months',
    threshold: 3,
    icon: 'CreditCard'
  },
  {
    id: 'pg-lesson-completion',
    title: 'Complete 80% of Lessons',
    description: 'Work through at least 80% of the lesson content for the part you\'re studying',
    metric: 'lesson_completion',
    threshold: 80,
    icon: 'BookOpen'
  },
  {
    id: 'pg-question-completion',
    title: 'Complete 80% of Practice Questions',
    description: 'Answer at least 80% of the practice questions for that part',
    metric: 'question_completion',
    threshold: 80,
    icon: 'CheckCircle'
  },
  {
    id: 'pg-average-score',
    title: 'Achieve 70% Average Score',
    description: 'Maintain a 70% average on practice questions',
    metric: 'average_score',
    threshold: 70,
    icon: 'Target'
  },
  {
    id: 'pg-mock-exams',
    title: 'Complete All Mock Exams',
    description: 'Take and complete all available mock exams for that part',
    metric: 'mock_exam_completion',
    threshold: 100,
    icon: 'FileCheck'
  },
  {
    id: 'pg-final-mock',
    title: 'Score 72%+ on Final Mock',
    description: 'Achieve a score of 72% or above on your final practice exam (equivalent to 360/500)',
    metric: 'final_mock_score',
    threshold: 72,
    icon: 'Award'
  },
  {
    id: 'pg-flashcards',
    title: 'Review 80% of Flashcards',
    description: 'Review at least 80% of the flashcards at least once for that part',
    metric: 'flashcard_review',
    threshold: 80,
    icon: 'Layers'
  }
];

export interface CMAPassGuaranteeConfig extends PassGuaranteeConfig {
  claimPolicy: ClaimPolicy;
  extensionTerms: ExtensionTerms;
}

export const CMA_PASS_GUARANTEE: CMAPassGuaranteeConfig = {
  enabled: true,
  name: 'CMA Pass Guarantee',
  tagline: 'Pass or Study Free Until You Do',
  description: 'We\'re confident you\'ll pass with VoraPrep. Meet our study requirements, take your CMA exam, and if you don\'t pass, we\'ll extend your subscription free for 3 months so you can keep studying.',
  
  requirements: CMA_REQUIREMENTS,
  
  claimPolicy: {
    ...PASS_GUARANTEE_CLAIM_POLICY,
    proofRequired: [
      'Official IMA score report showing score below 360',
      'Score report must show exam date within subscription period',
      'Score report submitted within 30 days of exam date'
    ]
  },
  
  extensionTerms: PASS_GUARANTEE_EXTENSION_TERMS,
  
  supportContact: 'support@voraprep.com'
};

// CMA Part-specific thresholds
export const CMA_PART_REQUIREMENTS = {
  Part1: {
    name: 'Financial Planning, Performance, and Analytics',
    questionCount: 500,
    mockExamCount: 3,
    lessonCount: 30,
    flashcardCount: 300,
    domains: [
      { id: 'A', name: 'External Financial Reporting Decisions', weight: 15 },
      { id: 'B', name: 'Planning, Budgeting, and Forecasting', weight: 20 },
      { id: 'C', name: 'Performance Management', weight: 20 },
      { id: 'D', name: 'Cost Management', weight: 15 },
      { id: 'E', name: 'Internal Controls', weight: 15 },
      { id: 'F', name: 'Technology and Analytics', weight: 15 }
    ]
  },
  Part2: {
    name: 'Strategic Financial Management',
    questionCount: 500,
    mockExamCount: 3,
    lessonCount: 30,
    flashcardCount: 300,
    domains: [
      { id: 'A', name: 'Financial Statement Analysis', weight: 20 },
      { id: 'B', name: 'Corporate Finance', weight: 20 },
      { id: 'C', name: 'Decision Analysis', weight: 25 },
      { id: 'D', name: 'Risk Management', weight: 10 },
      { id: 'E', name: 'Investment Decisions', weight: 15 },
      { id: 'F', name: 'Professional Ethics', weight: 10 }
    ]
  }
};

// Helper function to check if a user meets pass guarantee requirements for a part
export interface UserProgress {
  paidMonthsCount: number;
  lessonCompletion: number;
  questionCompletion: number;
  averageScore: number;
  mockExamCompletion: number;
  finalMockScore: number;
  flashcardReview: number;
}

export function checkPassGuaranteeEligibility(
  progress: UserProgress,
  _part: keyof typeof CMA_PART_REQUIREMENTS
): {
  eligible: boolean;
  requirementsMet: string[];
  requirementsNotMet: string[];
} {
  const requirementsMet: string[] = [];
  const requirementsNotMet: string[] = [];

  for (const req of CMA_PASS_GUARANTEE.requirements) {
    let met = false;
    
    switch (req.metric) {
      case 'min_paid_months':
        met = progress.paidMonthsCount >= req.threshold;
        break;
      case 'lesson_completion':
        met = progress.lessonCompletion >= req.threshold;
        break;
      case 'question_completion':
        met = progress.questionCompletion >= req.threshold;
        break;
      case 'average_score':
        met = progress.averageScore >= req.threshold;
        break;
      case 'mock_exam_completion':
        met = progress.mockExamCompletion >= req.threshold;
        break;
      case 'final_mock_score':
        met = progress.finalMockScore >= req.threshold;
        break;
      case 'flashcard_review':
        met = progress.flashcardReview >= req.threshold;
        break;
    }

    if (met) {
      requirementsMet.push(req.id);
    } else {
      requirementsNotMet.push(req.id);
    }
  }

  return {
    eligible: requirementsNotMet.length === 0,
    requirementsMet,
    requirementsNotMet
  };
}

export const PASS_GUARANTEE_SUMMARY = {
  headline: 'Pass Guaranteed or Study Free Until You Do',
  subheadline: 'Complete our proven study plan and pass your CMA exam',
  
  bullets: [
    'Must be subscribed for at least 3 months before your exam',
    'Complete 80% of lessons, questions, and flashcards',
    'Achieve 70% average score on practice questions',
    'Take all mock exams and score 72%+ on your final mock',
    'Submit official IMA score report within 30 days if you don\'t pass',
    'Get 3 months free extension per section (up to 2 times each)'
  ],
  
  termsLink: '/terms/pass-guarantee',
  
  // For marketing display
  stats: {
    passRate: '92%',
    avgScoreIncrease: '+35 points',
    studentsHelped: '15,000+'
  }
};

// Function to get overall pass guarantee status for all parts
export function getOverallPassGuaranteeStatus(
  partProgress: Record<string, UserProgress>
): {
  allPartsEligible: boolean;
  partStatus: Record<string, { eligible: boolean; percentage: number }>;
} {
  const partStatus: Record<string, { eligible: boolean; percentage: number }> = {};
  let allPartsEligible = true;

  for (const [part, progress] of Object.entries(partProgress)) {
    const result = checkPassGuaranteeEligibility(
      progress,
      part as keyof typeof CMA_PART_REQUIREMENTS
    );
    
    const totalReqs = CMA_PASS_GUARANTEE.requirements.length;
    const metReqs = result.requirementsMet.length;
    
    partStatus[part] = {
      eligible: result.eligible,
      percentage: Math.round((metReqs / totalReqs) * 100)
    };

    if (!result.eligible) {
      allPartsEligible = false;
    }
  }

  return {
    allPartsEligible,
    partStatus
  };
}
