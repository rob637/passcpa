/**
 * CISA Pass Guarantee Configuration
 * 
 * Defines the pass guarantee terms and requirements for the CISA course.
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

export const CISA_PASS_GUARANTEE: PassGuaranteeConfig = {
  enabled: true,
  name: 'CISA Pass Guarantee',
  tagline: 'Pass or Your Money Back',
  description: 'We\'re so confident in our CISA prep course that we offer a full money-back guarantee. Complete the requirements below and pass your exam, or receive a full refund.',
  
  requirements: [
    {
      id: 'pg-req-001',
      title: 'Complete All Lessons',
      description: 'Work through 100% of the lesson content across all 5 domains',
      metric: 'lesson_completion',
      threshold: 100,
      icon: 'BookOpen'
    },
    {
      id: 'pg-req-002',
      title: 'Complete 80% of Practice Questions',
      description: 'Answer at least 80% of the 1,100+ practice questions',
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
      description: 'Take and complete all available mock exams',
      metric: 'mock_exam_completion',
      threshold: 100,
      icon: 'FileCheck'
    },
    {
      id: 'pg-req-005',
      title: 'Score 450+ on Final Mock Exam',
      description: 'Achieve a score of 450 or above on the final practice exam (passing is 450)',
      metric: 'final_mock_score',
      threshold: 450,
      icon: 'Award'
    },
    {
      id: 'pg-req-006',
      title: 'Review All Flashcards',
      description: 'Review at least 90% of flashcards at least once',
      metric: 'flashcard_review',
      threshold: 90,
      icon: 'Layers'
    }
  ],
  
  refundPolicy: {
    type: 'full',
    percentage: 100,
    description: 'Full refund of your subscription payment if you meet all requirements but do not pass the exam.',
    processingDays: 14,
    excludedPlans: ['free', 'trial']
  },
  
  eligibilityWindow: {
    minDaysBeforeExam: 30, // Must study for at least 30 days before exam
    maxDaysAfterPurchase: 365, // Must take exam within 1 year of purchase
    examAttemptLimit: 1, // Applies to first exam attempt only
    proofRequired: [
      'ISACA exam score report showing failing score',
      'Screenshot of completed course dashboard',
      'Exam date within eligibility window'
    ]
  },
  
  supportContact: 'support@voraprep.com'
};

// Helper function to check if a user meets pass guarantee requirements
export interface UserProgress {
  lessonCompletionPercent: number;
  questionCompletionPercent: number;
  averageScore: number;
  mockExamCompletionPercent: number;
  finalMockScore: number;
  flashcardReviewPercent: number;
}

export function checkPassGuaranteeEligibility(
  progress: UserProgress
): { eligible: boolean; metRequirements: string[]; unmetRequirements: string[] } {
  const metRequirements: string[] = [];
  const unmetRequirements: string[] = [];
  
  for (const req of CISA_PASS_GUARANTEE.requirements) {
    let metricValue: number;
    
    switch (req.metric) {
      case 'lesson_completion':
        metricValue = progress.lessonCompletionPercent;
        break;
      case 'question_completion':
        metricValue = progress.questionCompletionPercent;
        break;
      case 'average_score':
        metricValue = progress.averageScore;
        break;
      case 'mock_exam_completion':
        metricValue = progress.mockExamCompletionPercent;
        break;
      case 'final_mock_score':
        metricValue = progress.finalMockScore;
        break;
      case 'flashcard_review':
        metricValue = progress.flashcardReviewPercent;
        break;
      default:
        metricValue = 0;
    }
    
    if (metricValue >= req.threshold) {
      metRequirements.push(req.id);
    } else {
      unmetRequirements.push(req.id);
    }
  }
  
  return {
    eligible: unmetRequirements.length === 0,
    metRequirements,
    unmetRequirements
  };
}

// Export summary for display
export const PASS_GUARANTEE_SUMMARY = {
  headline: 'Pass Guaranteed or 100% Money Back',
  bulletPoints: [
    'Complete all lessons and 80%+ of practice questions',
    'Score 450+ on final mock exam (ISACA passing score)',
    'If you fail the real exam, we refund 100% of your payment',
    'No questions asked - just provide your score report'
  ],
  termsLink: '/terms/pass-guarantee',
  trustBadge: 'Over 10,000 students passed with our courses'
};
