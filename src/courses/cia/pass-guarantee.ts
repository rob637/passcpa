/**
 * CIA Pass Guarantee Configuration
 * 
 * Defines the pass guarantee terms and requirements for the CIA (Certified Internal Auditor) course.
 * CIA exam has 3 parts, each scored 250-750, passing is 600.
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

export const CIA_PASS_GUARANTEE: PassGuaranteeConfig = {
  enabled: true,
  name: 'CIA Pass Guarantee',
  tagline: 'Pass All 3 Parts or Your Money Back',
  description: 'We\'re so confident in our CIA prep course that we offer a full money-back guarantee. Complete the requirements below for each part and pass your exam, or receive a full refund for that part.',
  
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
      description: 'Answer at least 80% of the practice questions for that part',
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
      title: 'Score 600+ on Final Mock Exam',
      description: 'Achieve a scaled score of 600 or above on the final practice exam (IIA passing score is 600/750)',
      metric: 'final_mock_score',
      threshold: 600,
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
    description: 'Full refund of your subscription payment if you meet all requirements but do not pass that part of the CIA exam.',
    processingDays: 14,
    excludedPlans: ['free', 'trial']
  },
  
  eligibilityWindow: {
    minDaysBeforeExam: 30, // Must study for at least 30 days before exam
    maxDaysAfterPurchase: 365, // Must take exam within 1 year of purchase
    examAttemptLimit: 1, // Applies to first exam attempt only
    proofRequired: [
      'IIA score report showing failing score (below 600)',
      'Screenshot of completed course dashboard for that part',
      'Exam date within eligibility window'
    ]
  },
  
  supportContact: 'support@voraprep.com'
};

// CIA Part-specific thresholds based on IIA exam structure
export const CIA_PART_REQUIREMENTS = {
  Part1: {
    name: 'Essentials of Internal Auditing',
    questionCount: 500,
    mockExamCount: 3,
    lessonCount: 35,
    flashcardCount: 350,
    examDuration: 150, // 2.5 hours
    examQuestions: 125,
    domains: [
      { id: '1', name: 'Foundations of Internal Auditing', weight: 40 },
      { id: '2', name: 'Independence and Objectivity', weight: 30 },
      { id: '3', name: 'Proficiency and Due Professional Care', weight: 30 }
    ]
  },
  Part2: {
    name: 'Practice of Internal Auditing',
    questionCount: 500,
    mockExamCount: 3,
    lessonCount: 35,
    flashcardCount: 350,
    examDuration: 120, // 2 hours
    examQuestions: 100,
    domains: [
      { id: '1', name: 'Managing the Internal Audit Activity', weight: 40 },
      { id: '2', name: 'Planning the Engagement', weight: 30 },
      { id: '3', name: 'Performing the Engagement', weight: 30 }
    ]
  },
  Part3: {
    name: 'Business Knowledge for Internal Auditing',
    questionCount: 500,
    mockExamCount: 3,
    lessonCount: 35,
    flashcardCount: 350,
    examDuration: 120, // 2 hours
    examQuestions: 100,
    domains: [
      { id: '1', name: 'Business Acumen', weight: 35 },
      { id: '2', name: 'Information Security', weight: 25 },
      { id: '3', name: 'Information Technology', weight: 20 },
      { id: '4', name: 'Financial Management', weight: 20 }
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
  _part: keyof typeof CIA_PART_REQUIREMENTS
): {
  eligible: boolean;
  requirementsMet: string[];
  requirementsNotMet: string[];
} {
  const requirementsMet: string[] = [];
  const requirementsNotMet: string[] = [];

  for (const req of CIA_PASS_GUARANTEE.requirements) {
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
  subheadline: 'Complete our proven study plan and pass your CIA exam',
  
  bullets: [
    'Full refund if you don\'t pass after completing all requirements',
    'Applies to each of the 3 CIA parts independently',
    'Valid for 12 months from purchase date',
    'No hidden fees or complicated claims process'
  ],
  
  termsLink: '/terms/pass-guarantee',
  
  // For marketing display
  stats: {
    passRate: '91%',
    avgScoreIncrease: '+45 points',
    studentsHelped: '20,000+'
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
      part as keyof typeof CIA_PART_REQUIREMENTS
    );
    
    const totalReqs = CIA_PASS_GUARANTEE.requirements.length;
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
