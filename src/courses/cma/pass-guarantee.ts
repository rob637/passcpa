/**
 * CMA Pass Guarantee Configuration
 * 
 * Defines the pass guarantee terms and requirements for the CMA (Certified Management Accountant) course.
 * CMA exam has 2 parts, each scored 0-500, passing is 360.
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

export const CMA_PASS_GUARANTEE: PassGuaranteeConfig = {
  enabled: true,
  name: 'CMA Pass Guarantee',
  tagline: 'Pass Both Parts or Your Money Back',
  description: 'We\'re so confident in our CMA prep course that we offer a full money-back guarantee. Complete the requirements below for each part and pass your exam, or receive a full refund for that part.',
  
  requirements: [
    {
      id: 'pg-req-001',
      title: 'Complete All Lessons',
      description: 'Work through 100% of the lesson content for the part you\'re studying',
      metric: 'lesson_completion',
      threshold: 100,
      icon: 'BookOpen'
    },
    {
      id: 'pg-req-002',
      title: 'Complete 80% of Practice Questions',
      description: 'Answer at least 80% of the practice questions for that part (100 MCQs per part)',
      metric: 'question_completion',
      threshold: 80,
      icon: 'CheckCircle'
    },
    {
      id: 'pg-req-003',
      title: 'Achieve 75% Average Score',
      description: 'Maintain a 75% average on practice questions in best attempts',
      metric: 'average_score',
      threshold: 75,
      icon: 'Target'
    },
    {
      id: 'pg-req-004',
      title: 'Complete All Mock Exams',
      description: 'Take and complete all available mock exams for that part',
      metric: 'mock_exam_completion',
      threshold: 100,
      icon: 'FileCheck'
    },
    {
      id: 'pg-req-005',
      title: 'Score 360+ on Final Mock Exam',
      description: 'Achieve a scaled score of 360 or above on the final practice exam (IMA passing score is 360/500)',
      metric: 'final_mock_score',
      threshold: 360,
      icon: 'Award'
    },
    {
      id: 'pg-req-006',
      title: 'Review All Flashcards',
      description: 'Review at least 90% of flashcards at least once for that part',
      metric: 'flashcard_review',
      threshold: 90,
      icon: 'Layers'
    }
  ],
  
  refundPolicy: {
    type: 'full',
    percentage: 100,
    description: 'Full refund of your subscription payment if you meet all requirements but do not pass that part of the CMA exam.',
    processingDays: 14,
    excludedPlans: ['free', 'trial']
  },
  
  eligibilityWindow: {
    minDaysBeforeExam: 30, // Must study for at least 30 days before exam
    maxDaysAfterPurchase: 365, // Must take exam within 1 year of purchase
    examAttemptLimit: 1, // Applies to first exam attempt only
    proofRequired: [
      'IMA score report showing failing score (below 360)',
      'Screenshot of completed course dashboard for that part',
      'Exam date within eligibility window'
    ]
  },
  
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
  headline: 'Pass Guaranteed or 100% Money Back',
  subheadline: 'Complete our proven study plan and pass your CMA exam',
  
  bullets: [
    'Full refund if you don\'t pass after completing all requirements',
    'Applies to each of the 2 CMA parts independently',
    'Valid for 12 months from purchase date',
    'No hidden fees or complicated claims process'
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
