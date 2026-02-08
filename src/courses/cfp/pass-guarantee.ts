/**
 * CFP Pass Guarantee Configuration
 * 
 * Defines the pass guarantee terms and requirements for the CFP (Certified Financial Planner) course.
 * CFP exam is a single exam covering 8 principal knowledge domains.
 * Passing score is determined by CFP Board using a modified Angoff method (approximately 62-65%).
 */

export interface PassGuaranteeConfig {
  enabled: boolean;
  name: string;
  tagline: string;
  description: string;
  requirements: PassGuaranteeRequirement[];
  refundPolicy: RefundPolicy;
  eligibilityWindow: EligibilityWindow;
  supportContact: string;
}

export interface PassGuaranteeRequirement {
  id: string;
  title: string;
  description: string;
  metric: string;
  threshold: number;
  icon: string;
}

export interface RefundPolicy {
  type: 'full' | 'partial' | 'credit';
  percentage: number;
  description: string;
  processingDays: number;
  excludedPlans: string[];
}

export interface EligibilityWindow {
  minDaysBeforeExam: number;
  maxDaysAfterPurchase: number;
  examAttemptLimit: number;
  proofRequired: string[];
}

export const CFP_PASS_GUARANTEE: PassGuaranteeConfig = {
  enabled: true,
  name: 'CFP Pass Guarantee',
  tagline: 'Pass the CFP Exam or Your Money Back',
  description: 'We\'re so confident in our CFP prep course that we offer a full money-back guarantee. Complete the requirements below and pass your exam, or receive a full refund.',
  
  requirements: [
    {
      id: 'pg-req-001',
      title: 'Complete All Lessons',
      description: 'Work through 100% of the lesson content across all 8 domains',
      metric: 'lesson_completion',
      threshold: 100,
      icon: 'BookOpen'
    },
    {
      id: 'pg-req-002',
      title: 'Complete 80% of Practice Questions',
      description: 'Answer at least 80% of the 1,500+ practice questions',
      metric: 'question_completion',
      threshold: 80,
      icon: 'CheckCircle'
    },
    {
      id: 'pg-req-003',
      title: 'Achieve 70% Average Score',
      description: 'Maintain a 70% average on practice questions in best attempts',
      metric: 'average_score',
      threshold: 70,
      icon: 'Target'
    },
    {
      id: 'pg-req-004',
      title: 'Complete All Mock Exams',
      description: 'Take and complete all available mock exams',
      metric: 'mock_exam_completion',
      threshold: 100,
      icon: 'FileCheck'
    },
    {
      id: 'pg-req-005',
      title: 'Score 70%+ on Final Mock Exam',
      description: 'Achieve a score of 70% or above on the final practice exam (passing is approximately 62-65%)',
      metric: 'final_mock_score',
      threshold: 70,
      icon: 'Award'
    },
    {
      id: 'pg-req-006',
      title: 'Review All Flashcards',
      description: 'Review at least 90% of flashcards at least once',
      metric: 'flashcard_review',
      threshold: 90,
      icon: 'Layers'
    },
    {
      id: 'pg-req-007',
      title: 'Complete Case Studies',
      description: 'Complete all case study practice scenarios',
      metric: 'case_study_completion',
      threshold: 100,
      icon: 'Briefcase'
    }
  ],
  
  refundPolicy: {
    type: 'full',
    percentage: 100,
    description: 'Full refund of your subscription payment if you meet all requirements but do not pass the CFP exam.',
    processingDays: 14,
    excludedPlans: ['free', 'trial']
  },
  
  eligibilityWindow: {
    minDaysBeforeExam: 30, // Must study for at least 30 days before exam
    maxDaysAfterPurchase: 365, // Must take exam within 1 year of purchase
    examAttemptLimit: 1, // Applies to first exam attempt only
    proofRequired: [
      'CFP Board exam score report showing failing score',
      'Screenshot of completed course dashboard',
      'Exam date within eligibility window'
    ]
  },
  
  supportContact: 'support@voraprep.com'
};

// CFP Domain thresholds based on CFP Board exam blueprint
export const CFP_DOMAIN_REQUIREMENTS = {
  questionCount: 1500,
  mockExamCount: 4,
  lessonCount: 60,
  flashcardCount: 800,
  caseStudyCount: 12,
  examDuration: 360, // 6 hours (two 3-hour sessions)
  examQuestions: 170,
  domains: [
    { id: 'A', name: 'Professional Conduct and Regulation', weight: 8, questionEstimate: 14 },
    { id: 'B', name: 'General Principles of Financial Planning', weight: 17, questionEstimate: 29 },
    { id: 'C', name: 'Education Planning', weight: 4, questionEstimate: 7 },
    { id: 'D', name: 'Risk Management and Insurance Planning', weight: 11, questionEstimate: 19 },
    { id: 'E', name: 'Investment Planning', weight: 17, questionEstimate: 29 },
    { id: 'F', name: 'Tax Planning', weight: 14, questionEstimate: 24 },
    { id: 'G', name: 'Retirement Savings and Income Planning', weight: 18, questionEstimate: 31 },
    { id: 'H', name: 'Estate Planning', weight: 11, questionEstimate: 19 }
  ]
};

// Helper function to check if a user meets pass guarantee requirements
export interface UserProgress {
  lessonCompletion: number;
  questionCompletion: number;
  averageScore: number;
  mockExamCompletion: number;
  finalMockScore: number;
  flashcardReview: number;
  caseStudyCompletion: number;
}

export function checkPassGuaranteeEligibility(
  progress: UserProgress
): {
  eligible: boolean;
  requirementsMet: string[];
  requirementsNotMet: string[];
} {
  const requirementsMet: string[] = [];
  const requirementsNotMet: string[] = [];

  for (const req of CFP_PASS_GUARANTEE.requirements) {
    let met = false;
    
    switch (req.metric) {
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
      case 'case_study_completion':
        met = progress.caseStudyCompletion >= req.threshold;
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
  headline: 'Pass Guaranteed or 100% Money Back',
  subheadline: 'Complete our proven study plan and pass your CFP exam',
  
  bullets: [
    'Full refund if you don\'t pass after completing all requirements',
    'Covers all 8 Principal Knowledge domains',
    'Valid for 12 months from purchase date',
    'No hidden fees or complicated claims process'
  ],
  
  termsLink: '/terms/pass-guarantee',
  
  // For marketing display
  stats: {
    passRate: '89%',
    avgScoreIncrease: '+15%',
    studentsHelped: '25,000+'
  }
};

// Function to get overall pass guarantee status
export function getOverallPassGuaranteeStatus(
  progress: UserProgress
): {
  eligible: boolean;
  percentage: number;
  requirementsMet: number;
  totalRequirements: number;
} {
  const result = checkPassGuaranteeEligibility(progress);
  const totalReqs = CFP_PASS_GUARANTEE.requirements.length;
  const metReqs = result.requirementsMet.length;
  
  return {
    eligible: result.eligible,
    percentage: Math.round((metReqs / totalReqs) * 100),
    requirementsMet: metReqs,
    totalRequirements: totalReqs
  };
}

// Domain-specific progress tracking
export interface DomainProgress {
  domainId: string;
  lessonProgress: number;
  questionProgress: number;
  averageScore: number;
  flashcardProgress: number;
}

export function getDomainReadiness(
  domainProgress: DomainProgress[]
): {
  overallReady: boolean;
  domainStatus: Record<string, { ready: boolean; score: number }>;
  weakestDomains: string[];
} {
  const domainStatus: Record<string, { ready: boolean; score: number }> = {};
  const weakestDomains: string[] = [];
  let allReady = true;

  for (const dp of domainProgress) {
    // Calculate composite readiness score (0-100)
    const score = Math.round(
      (dp.lessonProgress * 0.2) +
      (dp.questionProgress * 0.3) +
      (dp.averageScore * 0.35) +
      (dp.flashcardProgress * 0.15)
    );
    
    const ready = score >= 70;
    domainStatus[dp.domainId] = { ready, score };
    
    if (!ready) {
      allReady = false;
      weakestDomains.push(dp.domainId);
    }
  }

  // Sort weakest domains by score (lowest first)
  weakestDomains.sort((a, b) => 
    (domainStatus[a]?.score || 0) - (domainStatus[b]?.score || 0)
  );

  return {
    overallReady: allReady,
    domainStatus,
    weakestDomains: weakestDomains.slice(0, 3) // Top 3 weakest
  };
}
