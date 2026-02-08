/**
 * Course Types for Multi-Course Platform
 * 
 * This module defines the type system for supporting multiple exam prep courses
 * (CPA, CMA, EA, CIA, etc.) within a single platform.
 */

/**
 * Unique identifier for each course/exam
 */
export type CourseId = 'cpa' | 'cma' | 'ea' | 'cia' | 'cfp' | 'cisa';

/**
 * The default course when none is specified (backwards compatibility)
 */
export const DEFAULT_COURSE_ID: CourseId = 'cpa';

/**
 * Validates if a string is a valid CourseId
 */
export const isValidCourseId = (id: string): id is CourseId => {
  return ['cpa', 'cma', 'ea', 'cia', 'cfp', 'cisa'].includes(id);
};

/**
 * Question types supported across different exams
 */
export type QuestionType = 'mcq' | 'tbs' | 'wc' | 'essay' | 'data-insights' | 'case';

/**
 * Blueprint area within an exam section
 */
export interface BlueprintArea {
  id: string;
  name: string;
  weight: string;
  topics: string[];
  questionCount?: number;  // Optional: number of questions in this area
}

/**
 * Configuration for an exam section (e.g., FAR, PART1, etc.)
 */
export interface ExamSectionConfig {
  id: string;                    // e.g., 'FAR', 'PART1', 'QUANT'
  name: string;                  // e.g., 'Financial Accounting and Reporting'
  shortName: string;             // e.g., 'FAR'
  weight: string;                // e.g., '25-35%' or '100%'
  questionCount: number;
  timeAllowed: number;           // minutes
  questionTypes: QuestionType[];
  blueprintAreas: BlueprintArea[];
}

/**
 * Pricing configuration for a course
 */
export interface CoursePricing {
  monthly: number;
  annual: number;
  lifetime?: number;
  bundleDiscount?: number;       // % discount when bundled with other courses
}

/**
 * Metadata about the exam/certification
 */
export interface CourseMetadata {
  examProvider: string;          // 'AICPA', 'IMA', 'IRS', 'IIA'
  websiteUrl: string;
  nextExamWindow?: string;
  averageStudyHours: number;
  difficultyRating: 1 | 2 | 3 | 4 | 5;
  prerequisites?: string[];
  careerPaths: string[];
}

/**
 * Complete course definition
 */
export interface Course {
  id: CourseId;
  name: string;
  shortName: string;
  description: string;
  color?: string; // Brand color for the course
  sections: ExamSectionConfig[];
  passingScore?: number;
  totalTime?: number;             // minutes per section
  pricing?: CoursePricing;
  metadata?: CourseMetadata;
  
  // Pass guarantee configuration
  passGuarantee?: {
    enabled: boolean;
    headline: string;
    bulletPoints: string[];
    termsLink: string;
  };
  
  // Feature flags for course-specific behavior
  hasTBS?: boolean; // Top-level shortcut
  features?: {
    hasTBS?: boolean;
    hasWrittenCommunication?: boolean;
    hasEssay?: boolean;
    hasDataInsights?: boolean;
    hasCaseStudies?: boolean;
    adaptiveLearning?: boolean;
    simulationExams?: boolean;
    flashcards?: boolean;
    performanceTracking?: boolean;
  };
}

/**
 * User's course-specific preferences
 */
export interface CoursePreferences {
  examDate?: Date;
  weeklyGoal?: number;
  focusAreas?: string[];
  lastAccessed?: Date;
}

/**
 * Subscription tier for multi-course access
 */
export type SubscriptionTierType = 'free' | 'single' | 'dual' | 'all-access';

/**
 * User's course subscription/access
 */
export interface CourseSubscription {
  tier: SubscriptionTierType;
  courses: CourseId[];           // Which courses they have access to
  billingInterval: 'monthly' | 'annual' | 'lifetime';
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodEnd?: Date;
}
