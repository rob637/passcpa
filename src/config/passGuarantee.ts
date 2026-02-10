/**
 * Pass Guarantee Configuration
 * 
 * Unified pass guarantee terms for all VoraPrep courses.
 * 
 * Key safeguards to prevent gaming:
 * 1. Minimum 3 months paid subscription required
 * 2. 80%+ content engagement (lessons, questions, flashcards)
 * 3. Mock exam completion with score threshold
 * 4. Official score report required as proof of failure
 * 5. Limited extensions (max 2 per exam section)
 */

import { CourseId } from '../types/course';

// ============================================================================
// Types
// ============================================================================

export interface PassGuaranteeRequirement {
  id: string;
  title: string;
  description: string;
  metric: PassGuaranteeMetric;
  threshold: number;
  icon: string;
}

export type PassGuaranteeMetric =
  | 'lesson_completion'      // % of lessons marked complete
  | 'question_completion'    // % of practice questions answered
  | 'average_score'          // Average score on practice questions
  | 'mock_exam_completion'   // % of mock exams completed
  | 'final_mock_score'       // Score on final mock exam
  | 'flashcard_review'       // % of flashcards reviewed
  | 'min_paid_months'        // Minimum months subscribed before claiming
  | 'study_days';            // Minimum days of active study

export interface PassGuaranteeConfig {
  enabled: boolean;
  name: string;
  tagline: string;
  description: string;
  requirements: PassGuaranteeRequirement[];
  claimPolicy: ClaimPolicy;
  extensionTerms: ExtensionTerms;
  supportContact: string;
}

export interface ClaimPolicy {
  minPaidMonths: number;           // Must have paid for X months before claiming
  minDaysBeforeExam: number;       // Must have subscribed X days before exam
  maxDaysAfterFailure: number;     // Must submit claim within X days of exam
  examAttemptLimit: number;        // Applies to first N exam attempts
  proofRequired: string[];         // Documents needed to claim
}

export interface ExtensionTerms {
  monthsPerClaim: number;          // Free months per successful claim
  maxClaimsPerSection: number;     // Maximum claims allowed per section/part
  discountAfterMaxClaims: number;  // Discount % if they exceed max claims
}

export interface UserPassGuaranteeProgress {
  // Engagement metrics
  lessonsCompleted: number;
  lessonsTotal: number;
  questionsAnswered: number;
  questionsTotal: number;
  averageScore: number;
  mockExamsCompleted: number;
  mockExamsTotal: number;
  finalMockScore: number | null;
  flashcardsReviewed: number;
  flashcardsTotal: number;
  
  // Subscription metrics
  paidMonthsCount: number;
  subscriptionStartDate: Date | null;
  activeDaysCount: number;
}

export interface PassGuaranteeEligibility {
  eligible: boolean;
  requirementsMet: string[];
  requirementsNotMet: RequirementStatus[];
  percentComplete: number;
}

export interface RequirementStatus {
  id: string;
  title: string;
  current: number;
  required: number;
  percentComplete: number;
}

// ============================================================================
// Configuration
// ============================================================================

/**
 * Universal requirements that apply to all courses
 */
export const PASS_GUARANTEE_REQUIREMENTS: PassGuaranteeRequirement[] = [
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
    description: 'Work through at least 80% of the lesson content for your exam section',
    metric: 'lesson_completion',
    threshold: 80,
    icon: 'BookOpen'
  },
  {
    id: 'pg-question-completion',
    title: 'Answer 80% of Practice Questions',
    description: 'Attempt at least 80% of the practice questions for your exam section',
    metric: 'question_completion',
    threshold: 80,
    icon: 'CheckCircle'
  },
  {
    id: 'pg-average-score',
    title: 'Achieve 70% Average Score',
    description: 'Maintain a 70% or higher average on practice questions',
    metric: 'average_score',
    threshold: 70,
    icon: 'Target'
  },
  {
    id: 'pg-mock-exams',
    title: 'Complete All Mock Exams',
    description: 'Take and complete all available mock exams for your section',
    metric: 'mock_exam_completion',
    threshold: 100,
    icon: 'FileCheck'
  },
  {
    id: 'pg-final-mock',
    title: 'Score 75%+ on Final Mock',
    description: 'Achieve a score of 75% or above on your final practice exam',
    metric: 'final_mock_score',
    threshold: 75,
    icon: 'Award'
  },
  {
    id: 'pg-flashcards',
    title: 'Review 80% of Flashcards',
    description: 'Review at least 80% of the flashcards at least once',
    metric: 'flashcard_review',
    threshold: 80,
    icon: 'Layers'
  }
];

/**
 * Universal claim policy
 */
export const PASS_GUARANTEE_CLAIM_POLICY: ClaimPolicy = {
  minPaidMonths: 3,            // Must have 3 months of paid subscription
  minDaysBeforeExam: 30,       // Must have studied for at least 30 days
  maxDaysAfterFailure: 30,     // Must submit claim within 30 days of exam
  examAttemptLimit: 2,         // Applies to first 2 exam attempts only
  proofRequired: [
    'Official score report showing failing score',
    'Score report must show exam date within subscription period',
    'Score report submitted within 30 days of exam date'
  ]
};

/**
 * Extension terms for pass guarantee claims
 */
export const PASS_GUARANTEE_EXTENSION_TERMS: ExtensionTerms = {
  monthsPerClaim: 3,           // 3 free months per successful claim
  maxClaimsPerSection: 2,      // Up to 2 claims per section (6 months free max)
  discountAfterMaxClaims: 50   // 50% off after exhausting claims
};

/**
 * Main pass guarantee configuration
 */
export const PASS_GUARANTEE_CONFIG: PassGuaranteeConfig = {
  enabled: true,
  name: 'VoraPrep Pass Guarantee',
  tagline: 'Pass or Study Free Until You Do',
  description: `We're confident you'll pass with VoraPrep. Meet our study requirements, take your exam, and if you don't pass, we'll extend your subscription free for 3 months so you can keep studying.`,
  requirements: PASS_GUARANTEE_REQUIREMENTS,
  claimPolicy: PASS_GUARANTEE_CLAIM_POLICY,
  extensionTerms: PASS_GUARANTEE_EXTENSION_TERMS,
  supportContact: 'support@voraprep.com'
};

// ============================================================================
// Course-specific passing scores (for reference)
// ============================================================================

export const EXAM_PASSING_SCORES: Record<CourseId, { score: number; description: string }> = {
  cpa: { score: 75, description: '75 on a scale of 0-99' },
  ea: { score: 105, description: '105 on IRS scaled score (40-130)' },
  cma: { score: 360, description: '360 on a scale of 0-500' },
  cia: { score: 600, description: '600 on a scale of 250-750' },
  cisa: { score: 450, description: '450 on a scale of 200-800' },
  cfp: { score: 65, description: 'Approximately 65% (CFP Board sets passing)' }
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Check if a user meets all pass guarantee requirements
 */
export function checkPassGuaranteeEligibility(
  progress: UserPassGuaranteeProgress
): PassGuaranteeEligibility {
  const requirementsMet: string[] = [];
  const requirementsNotMet: RequirementStatus[] = [];

  for (const req of PASS_GUARANTEE_REQUIREMENTS) {
    const { current, required } = getMetricValues(progress, req);
    const percentComplete = Math.min(100, Math.round((current / required) * 100));
    const met = current >= required;

    if (met) {
      requirementsMet.push(req.id);
    } else {
      requirementsNotMet.push({
        id: req.id,
        title: req.title,
        current,
        required,
        percentComplete
      });
    }
  }

  const totalRequirements = PASS_GUARANTEE_REQUIREMENTS.length;
  const percentComplete = Math.round(
    (requirementsMet.length / totalRequirements) * 100
  );

  return {
    eligible: requirementsNotMet.length === 0,
    requirementsMet,
    requirementsNotMet,
    percentComplete
  };
}

/**
 * Get the current and required values for a metric
 */
function getMetricValues(
  progress: UserPassGuaranteeProgress,
  requirement: PassGuaranteeRequirement
): { current: number; required: number } {
  const { metric, threshold } = requirement;
  let current = 0;

  switch (metric) {
    case 'min_paid_months':
      current = progress.paidMonthsCount;
      return { current, required: threshold };

    case 'lesson_completion':
      current = progress.lessonsTotal > 0
        ? Math.round((progress.lessonsCompleted / progress.lessonsTotal) * 100)
        : 0;
      return { current, required: threshold };

    case 'question_completion':
      current = progress.questionsTotal > 0
        ? Math.round((progress.questionsAnswered / progress.questionsTotal) * 100)
        : 0;
      return { current, required: threshold };

    case 'average_score':
      current = Math.round(progress.averageScore);
      return { current, required: threshold };

    case 'mock_exam_completion':
      current = progress.mockExamsTotal > 0
        ? Math.round((progress.mockExamsCompleted / progress.mockExamsTotal) * 100)
        : 0;
      return { current, required: threshold };

    case 'final_mock_score':
      current = progress.finalMockScore ?? 0;
      return { current, required: threshold };

    case 'flashcard_review':
      current = progress.flashcardsTotal > 0
        ? Math.round((progress.flashcardsReviewed / progress.flashcardsTotal) * 100)
        : 0;
      return { current, required: threshold };

    case 'study_days':
      current = progress.activeDaysCount;
      return { current, required: threshold };

    default:
      return { current: 0, required: threshold };
  }
}

/**
 * Format requirement for display
 */
export function formatRequirementProgress(status: RequirementStatus): string {
  return `${status.current}/${status.required} (${status.percentComplete}%)`;
}

/**
 * Get human-readable summary of pass guarantee status
 */
export function getPassGuaranteeSummary(eligibility: PassGuaranteeEligibility): string {
  if (eligibility.eligible) {
    return 'You meet all Pass Guarantee requirements! If you don\'t pass your exam, submit your score report to receive a free extension.';
  }

  const unmetCount = eligibility.requirementsNotMet.length;
  const totalCount = eligibility.requirementsMet.length + unmetCount;
  
  return `You've met ${eligibility.requirementsMet.length} of ${totalCount} requirements (${eligibility.percentComplete}% complete). Complete all requirements before your exam to qualify for the Pass Guarantee.`;
}
