/**
 * CPA Pass Guarantee Configuration
 * 
 * Defines the pass guarantee terms and requirements for the CPA (Certified Public Accountant) course.
 * CPA exam has 4 sections (AUD, FAR, REG, BEC/BAR/ISC/TCP), each scored 0-99, passing is 75.
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

export const CPA_PASS_GUARANTEE: PassGuaranteeConfig = {
  enabled: true,
  name: 'CPA Pass Guarantee',
  tagline: 'Pass All 4 Sections or Your Money Back',
  description: 'We\'re so confident in our CPA prep course that we offer a full money-back guarantee. Complete the requirements below for each section and pass your exam, or receive a full refund for that section.',
  
  requirements: [
    {
      id: 'pg-req-001',
      title: 'Complete All Lessons',
      description: 'Work through 100% of the lesson content for the section you\'re studying',
      metric: 'lesson_completion',
      threshold: 100,
      icon: 'BookOpen'
    },
    {
      id: 'pg-req-002',
      title: 'Complete 80% of Practice Questions',
      description: 'Answer at least 80% of the practice questions for that section',
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
      description: 'Take and complete all available mock exams for that section',
      metric: 'mock_exam_completion',
      threshold: 100,
      icon: 'FileCheck'
    },
    {
      id: 'pg-req-005',
      title: 'Score 75+ on Final Mock Exam',
      description: 'Achieve a scaled score of 75 or above on the final practice exam (AICPA passing score is 75)',
      metric: 'final_mock_score',
      threshold: 75,
      icon: 'Award'
    },
    {
      id: 'pg-req-006',
      title: 'Review All Flashcards',
      description: 'Review at least 90% of flashcards at least once for that section',
      metric: 'flashcard_review',
      threshold: 90,
      icon: 'Layers'
    },
    {
      id: 'pg-req-007',
      title: 'Complete Task-Based Simulations',
      description: 'Complete all TBS practice problems for that section',
      metric: 'tbs_completion',
      threshold: 100,
      icon: 'Clipboard'
    }
  ],
  
  refundPolicy: {
    type: 'full',
    percentage: 100,
    description: 'Full refund of your subscription payment if you meet all requirements but do not pass that section of the CPA exam.',
    processingDays: 14,
    excludedPlans: ['free', 'trial']
  },
  
  eligibilityWindow: {
    minDaysBeforeExam: 30, // Must study for at least 30 days before exam
    maxDaysAfterPurchase: 365, // Must take exam within 1 year of purchase
    examAttemptLimit: 1, // Applies to first exam attempt only
    proofRequired: [
      'AICPA/NASBA score report showing failing score (below 75)',
      'Screenshot of completed course dashboard for that section',
      'Exam date within eligibility window'
    ]
  },
  
  supportContact: 'support@voraprep.com'
};

// CPA Section-specific thresholds
export const CPA_SECTION_REQUIREMENTS = {
  AUD: {
    questionCount: 800,
    mockExamCount: 3,
    lessonCount: 40,
    flashcardCount: 400
  },
  FAR: {
    questionCount: 1000,
    mockExamCount: 3,
    lessonCount: 50,
    flashcardCount: 500
  },
  REG: {
    questionCount: 700,
    mockExamCount: 3,
    lessonCount: 35,
    flashcardCount: 350
  },
  // 2024 CPA Evolution - Core section disciplines
  BAR: {
    questionCount: 400,
    mockExamCount: 2,
    lessonCount: 20,
    flashcardCount: 200
  },
  ISC: {
    questionCount: 400,
    mockExamCount: 2,
    lessonCount: 20,
    flashcardCount: 200
  },
  TCP: {
    questionCount: 400,
    mockExamCount: 2,
    lessonCount: 20,
    flashcardCount: 200
  }
};

// Helper function to check if a user meets pass guarantee requirements for a section
export interface UserProgress {
  lessonCompletion: number;
  questionCompletion: number;
  averageScore: number;
  mockExamCompletion: number;
  finalMockScore: number;
  flashcardReview: number;
  tbsCompletion: number;
}

export function checkPassGuaranteeEligibility(
  progress: UserProgress,
  _section: keyof typeof CPA_SECTION_REQUIREMENTS
): {
  eligible: boolean;
  requirementsMet: string[];
  requirementsNotMet: string[];
} {
  const requirementsMet: string[] = [];
  const requirementsNotMet: string[] = [];

  for (const req of CPA_PASS_GUARANTEE.requirements) {
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
      case 'tbs_completion':
        met = progress.tbsCompletion >= req.threshold;
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
  subheadline: 'Complete our proven study plan and pass your CPA exam',
  
  bullets: [
    'Full refund if you don\'t pass after completing all requirements',
    'Applies to each of the 4 CPA sections independently',
    'Valid for 12 months from purchase date',
    'No hidden fees or complicated claims process'
  ],
  
  termsLink: '/terms/pass-guarantee',
  
  // For marketing display
  stats: {
    passRate: '94%',
    avgScoreIncrease: '+18 points',
    studentsHelped: '50,000+'
  }
};

// Function to get overall pass guarantee status for all sections
export function getOverallPassGuaranteeStatus(
  sectionProgress: Record<string, UserProgress>
): {
  allSectionsEligible: boolean;
  sectionStatus: Record<string, { eligible: boolean; percentage: number }>;
} {
  const sectionStatus: Record<string, { eligible: boolean; percentage: number }> = {};
  let allSectionsEligible = true;

  for (const [section, progress] of Object.entries(sectionProgress)) {
    const result = checkPassGuaranteeEligibility(
      progress,
      section as keyof typeof CPA_SECTION_REQUIREMENTS
    );
    
    const totalReqs = CPA_PASS_GUARANTEE.requirements.length;
    const metReqs = result.requirementsMet.length;
    
    sectionStatus[section] = {
      eligible: result.eligible,
      percentage: Math.round((metReqs / totalReqs) * 100)
    };

    if (!result.eligible) {
      allSectionsEligible = false;
    }
  }

  return {
    allSectionsEligible,
    sectionStatus
  };
}
