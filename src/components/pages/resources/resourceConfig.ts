/**
 * Resource Configuration
 * 
 * Centralized configuration for all study resources across all courses.
 * Each resource type (cheatsheet, study-guide, formula-sheet, mnemonic) 
 * is mapped to its actual data and display configuration.
 */

import { CourseId } from '../../../types/course';
import { LucideIcon, ScrollText, BookOpen, Calculator, Brain, FileText, Target } from 'lucide-react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type ResourceType = 'cheatsheet' | 'study-guide' | 'formula-sheet' | 'mnemonic' | 'reference' | 'blueprint';

export interface ResourceItem {
  id: string;
  type: ResourceType;
  title: string;
  description: string;
  section?: string;
  /** Loader function to fetch the actual content */
  loadContent?: () => Promise<unknown>;
  /** For markdown-based content like cheatsheets */
  markdownFile?: string;
}

export interface ResourceCategory {
  type: ResourceType;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  colorLight: string;
  colorDark: string;
  items: ResourceItem[];
}

export interface CourseResourceConfig {
  courseId: CourseId;
  categories: ResourceCategory[];
  /** Optional exam overview info */
  examOverview?: {
    title: string;
    description: string;
    format: string;
    duration: string;
    sections: number;
  };
  /** Why take this exam - career value proposition */
  examValue?: {
    title: string;
    subtitle: string;
    benefits: {
      icon: 'salary' | 'career' | 'credibility' | 'network' | 'knowledge' | 'global';
      title: string;
      description: string;
    }[];
    stats?: {
      label: string;
      value: string;
      source?: string;
    }[];
  };
  /** Exam tips for success */
  examTips?: {
    title: string;
    tips: string[];
  };
  /** Strategy content for exam preparation */
  strategyContent?: {
    /** Exam structure breakdown */
    examStructure: {
      sections: {
        name: string;
        code: string;
        duration: string;
        questionTypes: { type: string; count: string; weight: string }[];
        passingScore: string;
      }[];
      totalTime: string;
      testingWindow: string;
      retakePolicy: string;
    };
    /** Time management strategies */
    timeManagement: {
      title: string;
      strategies: { title: string; description: string }[];
    };
    /** Question type strategies */
    questionStrategies: {
      type: string;
      tips: string[];
    }[];
    /** Study planning advice */
    studyPlanning: {
      recommendedHours: string;
      weeklySchedule: string;
      tips: string[];
    };
    /** Test day preparation */
    testDay: {
      before: string[];
      during: string[];
      mindset: string[];
    };
  };
}

// ============================================================================
// RESOURCE TYPE METADATA
// ============================================================================

export const RESOURCE_TYPE_META: Record<ResourceType, { icon: LucideIcon; label: string; description: string }> = {
  'cheatsheet': { icon: ScrollText, label: 'Cheatsheets', description: 'Quick reference guides for key topics' },
  'study-guide': { icon: BookOpen, label: 'Study Guides', description: 'Comprehensive study materials with study plans' },
  'formula-sheet': { icon: Calculator, label: 'Formula Sheets', description: 'Essential formulas and calculations' },
  'mnemonic': { icon: Brain, label: 'Mnemonics', description: 'Memory aids to help you remember key concepts' },
  'reference': { icon: FileText, label: 'Quick References', description: 'Tables, deadlines, and quick lookups' },
  'blueprint': { icon: Target, label: 'Exam Blueprint', description: 'Interactive exam structure and domain weight breakdown' },
};

// ============================================================================
// CPA RESOURCES
// ============================================================================

const CPA_RESOURCES: CourseResourceConfig = {
  courseId: 'cpa',
  examOverview: {
    title: 'CPA Exam Overview',
    description: 'The Uniform CPA Examination tests candidates on professional competencies for entry-level CPAs.',
    format: '6 sections total: 3 Core (FAR, AUD, REG) + 3 Discipline options (BAR, ISC, TCP) - take 4',
    duration: '4 hours per section',
    sections: 4,
  },
  examValue: {
    title: 'Why Become a CPA?',
    subtitle: 'The CPA credential opens doors to the highest-paying and most respected careers in accounting',
    benefits: [
      { icon: 'salary', title: 'Higher Earning Potential', description: 'CPAs earn 10-15% more than non-certified accountants on average' },
      { icon: 'career', title: 'Career Advancement', description: 'Required for signing audit reports, partnership tracks, and C-suite roles' },
      { icon: 'credibility', title: 'Professional Credibility', description: 'Gold standard credential recognized across all industries' },
      { icon: 'network', title: 'Professional Network', description: 'Access to AICPA resources, conferences, and peer community' },
    ],
    stats: [
      { label: 'Avg. Salary Premium', value: '+$15,000/yr', source: 'AICPA' },
      { label: 'Job Growth', value: '6%', source: 'BLS 2023-33' },
      { label: 'Active CPAs', value: '665,000+', source: 'NASBA' },
    ],
  },
  examTips: {
    title: 'CPA Exam Success Tips',
    tips: [
      'Start with FAR - it\'s the foundation for other sections',
      'Schedule exams close together to retain knowledge',
      'Use the Authoritative Literature during the exam (FAR, AUD, REG)',
      'For TBS questions, break down the data systematically',
      'Time management: ~1.5 min per MCQ, 15-20 min per TBS',
      'Flag difficult questions and come back - don\'t get stuck',
      'Practice with exam-format simulations (not just MCQs)',
      'Review AICPA sample tests to understand the interface',
    ],
  },
  strategyContent: {
    examStructure: {
      sections: [
        { name: 'Financial Accounting & Reporting', code: 'FAR', duration: '4 hours', questionTypes: [{ type: 'MCQ', count: '50', weight: '50%' }, { type: 'TBS', count: '7', weight: '50%' }], passingScore: '75' },
        { name: 'Auditing & Attestation', code: 'AUD', duration: '4 hours', questionTypes: [{ type: 'MCQ', count: '78', weight: '50%' }, { type: 'TBS', count: '7', weight: '50%' }], passingScore: '75' },
        { name: 'Taxation & Regulation', code: 'REG', duration: '4 hours', questionTypes: [{ type: 'MCQ', count: '72', weight: '50%' }, { type: 'TBS', count: '8', weight: '50%' }], passingScore: '75' },
        { name: 'Discipline (BAR/ISC/TCP)', code: 'DSC', duration: '4 hours', questionTypes: [{ type: 'MCQ', count: '50-82', weight: '50-60%' }, { type: 'TBS', count: '6', weight: '40-50%' }], passingScore: '75' },
      ],
      totalTime: '16 hours (4 sections x 4 hours)',
      testingWindow: 'Year-round at Prometric centers',
      retakePolicy: '18-month window from first passed section',
    },
    timeManagement: {
      title: 'Time Allocation Strategy',
      strategies: [
        { title: 'MCQ Pacing', description: '~90 seconds per MCQ. Flag difficult questions and move on.' },
        { title: 'TBS Allocation', description: '15-20 minutes per TBS. Read requirements first, then gather data.' },
        { title: 'Use the Break', description: 'Take the optional 15-minute break between testlets to reset.' },
        { title: 'Testlet Strategy', description: 'Complete each testlet before moving on - you cannot go back.' },
      ],
    },
    questionStrategies: [
      { type: 'Multiple Choice (MCQ)', tips: ['Read the question stem carefully before looking at answers', 'Eliminate obviously wrong answers first', 'Watch for qualifiers: always, never, except, only', 'If stuck, choose the most comprehensive answer', 'Harder second testlet may mean you\'re doing well (adaptive testing)'] },
      { type: 'Task-Based Simulations (TBS)', tips: ['Read all tabs before starting', 'Use the Authoritative Literature tab for standards', 'Check your work cell by cell - partial credit is awarded', 'Use Excel-like functions for calculations', 'Answer what you know first, then research the rest'] },
      { type: 'Written Communication (WC)', tips: ['Use professional memo/letter format', 'State your conclusion upfront', 'Support with 2-3 key points', 'Keep it concise (1 page max)', 'Proofread for grammar and spelling'] },
    ],
    studyPlanning: {
      recommendedHours: '300-400 hours total (75-100 per section)',
      weeklySchedule: '15-25 hours per week for 3-4 months per section',
      tips: ['Study FAR first - it\'s the largest and foundational', 'Schedule sections 4-6 weeks apart to maintain momentum', 'Use the 18-month window wisely - don\'t let sections expire', 'Mix reading, practice MCQs, and simulations', 'Track weak areas and revisit before exam'],
    },
    testDay: {
      before: ['Get 7-8 hours of sleep', 'Eat a light, healthy meal', 'Arrive 30 minutes early', 'Bring two forms of ID', 'Review key formulas/mnemonics on the way'],
      during: ['Use the 15-minute break', 'Don\'t dwell on difficult questions', 'Trust your preparation', 'Manage your time by testlet', 'Answer every question - no penalty for guessing'],
      mindset: ['Harder questions may be a good sign (adaptive testing)', 'You don\'t need perfection - aim for 75', 'Stay calm and systematic', 'Each section is a fresh start'],
    },
  },
  categories: [
    {
      type: 'cheatsheet',
      title: 'Cheatsheets',
      description: 'Quick reference guides for all CPA sections',
      icon: ScrollText,
      color: 'emerald-600',
      colorLight: 'emerald-50',
      colorDark: 'emerald-900/30',
      items: [
        { id: 'cpa-cs-far', type: 'cheatsheet', title: 'FAR Cheatsheet', description: 'Financial statements, leases, EPS, governmental accounting', section: 'FAR', markdownFile: 'far-cheatsheet.md' },
        { id: 'cpa-cs-aud', type: 'cheatsheet', title: 'AUD Cheatsheet', description: 'Audit procedures, evidence, reports, ethics', section: 'AUD', markdownFile: 'aud-cheatsheet.md' },
        { id: 'cpa-cs-reg', type: 'cheatsheet', title: 'REG Cheatsheet', description: 'Individual tax, business, ethics', section: 'REG', markdownFile: 'reg-cheatsheet.md' },
        { id: 'cpa-cs-bar', type: 'cheatsheet', title: 'BAR Cheatsheet', description: 'Analysis and reporting, government, NFP', section: 'BAR', markdownFile: 'bar-cheatsheet.md' },
      ],
    },
    {
      type: 'study-guide',
      title: 'Study Guides',
      description: 'Comprehensive guides with blueprints and study plans',
      icon: BookOpen,
      color: 'blue-600',
      colorLight: 'blue-50',
      colorDark: 'blue-900/30',
      items: [
        { id: 'cpa-sg-far', type: 'study-guide', title: 'FAR Study Guide', description: '4 blueprint areas, 8-week study plan', section: 'FAR' },
        { id: 'cpa-sg-aud', type: 'study-guide', title: 'AUD Study Guide', description: 'Ethics, risk assessment, procedures, reporting', section: 'AUD' },
        { id: 'cpa-sg-reg', type: 'study-guide', title: 'REG Study Guide', description: 'Individual tax, entities, property, ethics', section: 'REG' },
        { id: 'cpa-sg-bar', type: 'study-guide', title: 'BAR Study Guide', description: 'Financial analysis, consolidations, government', section: 'BAR' },
      ],
    },
    {
      type: 'formula-sheet',
      title: 'Formula Sheets',
      description: 'Essential formulas for calculations',
      icon: Calculator,
      color: 'purple-600',
      colorLight: 'purple-50',
      colorDark: 'purple-900/30',
      items: [
        { id: 'cpa-fs-all', type: 'formula-sheet', title: 'CPA Formula Sheet', description: 'Ratios, EPS, depreciation, CVP, bonds, tax calculations' },
      ],
    },
    {
      type: 'mnemonic',
      title: 'Mnemonics',
      description: 'Memory aids for key concepts',
      icon: Brain,
      color: 'amber-600',
      colorLight: 'amber-50',
      colorDark: 'amber-900/30',
      items: [
        { id: 'cpa-mn-far', type: 'mnemonic', title: 'FAR Mnemonics', description: 'CLIP-P, I-DART, DAD GALL, OWNES', section: 'FAR' },
        { id: 'cpa-mn-aud', type: 'mnemonic', title: 'AUD Mnemonics', description: 'CRIME, HAPIE, SCRIPTED, OCEAN', section: 'AUD' },
        { id: 'cpa-mn-reg', type: 'mnemonic', title: 'REG Mnemonics', description: 'HIP MAGIC, MACRS tables', section: 'REG' },
        { id: 'cpa-mn-bar', type: 'mnemonic', title: 'BAR Mnemonics', description: 'Combined analysis and reporting aids', section: 'BAR' },
      ],
    },
    {
      type: 'reference',
      title: 'Quick References',
      description: 'Tables, deadlines, and quick lookups',
      icon: FileText,
      color: 'cyan-600',
      colorLight: 'cyan-50',
      colorDark: 'cyan-900/30',
      items: [
        { id: 'cpa-ref-scoring', type: 'reference', title: 'CPA Exam Scoring', description: 'How the exam is scored, testlet difficulty, passing scores' },
        { id: 'cpa-ref-timeline', type: 'reference', title: 'CPA Timeline', description: 'Steps from application to license, typical timeframes' },
        { id: 'cpa-ref-nts', type: 'reference', title: 'NTS & Testing Windows', description: 'Notice to Schedule details, testing center policies' },
        { id: 'cpa-ref-ethics', type: 'reference', title: 'AICPA Ethics', description: 'Professional conduct, independence, integrity rules' },
      ],
    },
    {
      type: 'blueprint',
      title: 'Exam Blueprint',
      description: 'Interactive exam structure and domain weight breakdown',
      icon: Target,
      color: 'indigo-600',
      colorLight: 'indigo-50',
      colorDark: 'indigo-900/30',
      items: [
        { id: 'cpa-blueprint', type: 'blueprint', title: 'CPA Exam Blueprint', description: 'FAR domain weights, exam format, and topic breakdown' },
      ],
    },
  ],
};

// ============================================================================
// EA RESOURCES
// ============================================================================

const EA_RESOURCES: CourseResourceConfig = {
  courseId: 'ea',
  examOverview: {
    title: 'EA Exam Overview',
    description: 'The IRS Special Enrollment Examination (SEE) tests competency in tax representation.',
    format: '3 parts: Individuals, Businesses, Representation',
    duration: '3.5 hours per part',
    sections: 3,
  },
  examValue: {
    title: 'Why Become an Enrolled Agent?',
    subtitle: 'EAs are federally-authorized tax practitioners with unlimited practice rights before the IRS',
    benefits: [
      { icon: 'credibility', title: 'Federal Authorization', description: 'Only credential granted by the federal government for tax representation' },
      { icon: 'career', title: 'Unlimited Practice Rights', description: 'Represent any taxpayer on any tax matter before any IRS office' },
      { icon: 'salary', title: 'Growing Demand', description: 'Tax complexity drives consistent demand for qualified EAs' },
      { icon: 'knowledge', title: 'Tax Expertise', description: 'Demonstrate mastery of individual and business taxation' },
    ],
    stats: [
      { label: 'Active EAs', value: '~60,000', source: 'IRS' },
      { label: 'Median Income', value: '$57,000+', source: 'PayScale' },
      { label: 'Job Outlook', value: 'Strong', source: 'BLS' },
    ],
  },
  examTips: {
    title: 'EA Exam Success Tips',
    tips: [
      'Take SEE1 (Individuals) first - it builds the foundation',
      'Know the current year tax law - the exam updates annually',
      'Memorize key limits: contribution limits, income thresholds, phase-outs',
      'Circular 230 is heavily tested in Part 3 - know it cold',
      'Practice with IRS publications as reference',
      'Time management: all 100 questions in 3.5 hours',
      'Focus on the most tested topics per Prometric feedback',
    ],
  },
  strategyContent: {
    examStructure: {
      sections: [
        { name: 'Individuals', code: 'SEE1', duration: '3.5 hours', questionTypes: [{ type: 'MCQ', count: '100', weight: '100%' }], passingScore: '105/130' },
        { name: 'Businesses', code: 'SEE2', duration: '3.5 hours', questionTypes: [{ type: 'MCQ', count: '100', weight: '100%' }], passingScore: '105/130' },
        { name: 'Representation', code: 'SEE3', duration: '3.5 hours', questionTypes: [{ type: 'MCQ', count: '100', weight: '100%' }], passingScore: '105/130' },
      ],
      totalTime: '10.5 hours (3 parts x 3.5 hours)',
      testingWindow: 'Year-round at Prometric centers (except March/April)',
      retakePolicy: '3-year window to pass all 3 parts; can retake after 24 hours',
    },
    timeManagement: {
      title: 'Time Allocation Strategy',
      strategies: [
        { title: 'Pace Yourself', description: '~2 minutes per question. Flag difficult ones and return.' },
        { title: 'First Pass', description: 'Answer confidently known questions first.' },
        { title: 'Second Pass', description: 'Work through flagged questions with remaining time.' },
        { title: 'Never Leave Blank', description: 'No penalty for guessing - answer everything.' },
      ],
    },
    questionStrategies: [
      { type: 'Multiple Choice (MCQ)', tips: ['All 100 questions are MCQ - practice extensively', 'Know current year tax law (limits, thresholds, rates)', 'Watch for "except" and "not" in question stems', 'Use process of elimination', 'Circular 230 questions in Part 3 require memorization'] },
    ],
    studyPlanning: {
      recommendedHours: '150-200 hours total (50-70 per part)',
      weeklySchedule: '10-15 hours per week for 6-8 weeks per part',
      tips: ['Start with SEE1 (Individuals) - foundational concepts', 'SEE2 (Businesses) builds on SEE1 entity concepts', 'SEE3 (Representation) is mostly Circular 230 memorization', 'Use IRS publications as study aids', 'Practice with current year tax law updates'],
    },
    testDay: {
      before: ['Review key limits and thresholds', 'Bring two valid IDs', 'Arrive 30 minutes early', 'Get good sleep - it\'s a 3.5 hour exam'],
      during: ['Flag difficult questions quickly', 'Don\'t spend more than 3 min on any question', 'Trust your first instinct', 'Answer every question'],
      mindset: ['105/130 is passing - you don\'t need perfection', 'Harder questions may be "experimental" (not scored)', 'Stay calm and systematic', 'Each part is independent - focus on one at a time'],
    },
  },
  categories: [
    {
      type: 'cheatsheet',
      title: 'Cheatsheets',
      description: 'Quick reference for all SEE parts',
      icon: ScrollText,
      color: 'emerald-600',
      colorLight: 'emerald-50',
      colorDark: 'emerald-900/30',
      items: [
        { id: 'ea-cs-see1', type: 'cheatsheet', title: 'SEE1 Cheatsheet', description: 'Individual taxation: income, deductions, credits', section: 'SEE1' },
        { id: 'ea-cs-see2', type: 'cheatsheet', title: 'SEE2 Cheatsheet', description: 'Business taxation: entities, depreciation, basis', section: 'SEE2' },
        { id: 'ea-cs-see3', type: 'cheatsheet', title: 'SEE3 Cheatsheet', description: 'Representation: Circular 230, procedures, ethics', section: 'SEE3' },
      ],
    },
    {
      type: 'study-guide',
      title: 'Study Guides',
      description: 'Comprehensive guides with study plans',
      icon: BookOpen,
      color: 'blue-600',
      colorLight: 'blue-50',
      colorDark: 'blue-900/30',
      items: [
        { id: 'ea-sg-see1', type: 'study-guide', title: 'SEE1 Study Guide', description: 'Individual taxation: 5 domains, 8-week plan', section: 'SEE1' },
        { id: 'ea-sg-see2', type: 'study-guide', title: 'SEE2 Study Guide', description: 'Business taxation: 6 domains, entity types', section: 'SEE2' },
        { id: 'ea-sg-see3', type: 'study-guide', title: 'SEE3 Study Guide', description: 'Representation: Circular 230, penalties, ethics', section: 'SEE3' },
      ],
    },
    {
      type: 'formula-sheet',
      title: 'Formula Sheets',
      description: 'Tax formulas and calculations',
      icon: Calculator,
      color: 'purple-600',
      colorLight: 'purple-50',
      colorDark: 'purple-900/30',
      items: [
        { id: 'ea-fs-all', type: 'formula-sheet', title: 'EA Formula Sheet', description: 'Income, SE tax, depreciation, penalties, credits, retirement' },
      ],
    },
    {
      type: 'mnemonic',
      title: 'Mnemonics',
      description: 'Memory aids for tax concepts',
      icon: Brain,
      color: 'amber-600',
      colorLight: 'amber-50',
      colorDark: 'amber-900/30',
      items: [
        { id: 'ea-mn-see1', type: 'mnemonic', title: 'SEE1 Mnemonics', description: 'Dependent tests, filing status, AGI', section: 'SEE1' },
        { id: 'ea-mn-see2', type: 'mnemonic', title: 'SEE2 Mnemonics', description: 'Entity basis, depreciation, QBI', section: 'SEE2' },
        { id: 'ea-mn-see3', type: 'mnemonic', title: 'SEE3 Mnemonics', description: 'Circular 230, penalties, POAs', section: 'SEE3' },
      ],
    },
    {
      type: 'reference',
      title: 'Quick References',
      description: 'Tables and quick lookups',
      icon: FileText,
      color: 'cyan-600',
      colorLight: 'cyan-50',
      colorDark: 'cyan-900/30',
      items: [
        { id: 'ea-ref-forms', type: 'reference', title: 'IRS Form Guide', description: 'Quick reference for common tax forms' },
        { id: 'ea-ref-penalties', type: 'reference', title: 'Penalty Tables', description: 'Taxpayer and preparer penalty amounts' },
        { id: 'ea-ref-deadlines', type: 'reference', title: 'Due Date Guide', description: 'Filing and extension deadlines by entity' },
      ],
    },
    {
      type: 'blueprint',
      title: 'Exam Blueprint',
      description: 'Interactive exam structure and domain weight breakdown',
      icon: Target,
      color: 'indigo-600',
      colorLight: 'indigo-50',
      colorDark: 'indigo-900/30',
      items: [
        { id: 'ea-blueprint', type: 'blueprint', title: 'EA Exam Blueprint', description: 'SEE part weights, exam format, and topic breakdown' },
      ],
    },
  ],
};

// ============================================================================
// CMA RESOURCES
// ============================================================================

const CMA_RESOURCES: CourseResourceConfig = {
  courseId: 'cma',
  examValue: {
    title: 'Why Become a CMA?',
    subtitle: 'Certified Management Accountants are strategic partners driving organizational performance.',
    benefits: [
      { icon: 'salary', title: 'Higher Earnings', description: 'CMAs earn 62% more than non-certified peers in total compensation' },
      { icon: 'career', title: 'Strategic Roles', description: 'Qualify for CFO, Controller, and FP&A leadership positions' },
      { icon: 'global', title: 'Global Recognition', description: 'Recognized in 100+ countries for management accounting expertise' },
      { icon: 'knowledge', title: 'Business Acumen', description: 'Master decision analysis, strategy, and financial management' },
    ],
    stats: [
      { value: '62%', label: 'Higher Compensation' },
      { value: '100+', label: 'Countries Recognition' },
      { value: '85K+', label: 'CMAs Worldwide' },
    ],
  },
  examTips: {
    title: 'CMA Exam Tips',
    tips: [
      'Master essay writing - Part 1 & 2 both include written essays worth 25% of the score.',
      'Focus on calculations first - practice variance analysis, IRR/NPV, and WACC calculations daily.',
      'Understand the "why" behind formulas - the CMA tests conceptual application, not just memorization.',
      'Time management is critical - allocate 3 hours for MCQs and 1 hour for essays.',
      'Review ethics thoroughly - professional ethics questions appear across both parts.',
    ],
  },
  examOverview: {
    title: 'CMA Exam Overview',
    description: 'The CMA exam tests competency in management accounting and financial strategy.',
    format: '2 parts: Financial Planning & Analysis, Strategic Financial Management',
    duration: '4 hours per part (including essays)',
    sections: 2,
  },
  strategyContent: {
    examStructure: {
      sections: [
        { name: 'Financial Planning, Performance & Analytics', code: 'Part 1', duration: '4 hours', questionTypes: [{ type: 'MCQ', count: '100', weight: '75%' }, { type: 'Essay', count: '2', weight: '25%' }], passingScore: '360/500' },
        { name: 'Strategic Financial Management', code: 'Part 2', duration: '4 hours', questionTypes: [{ type: 'MCQ', count: '100', weight: '75%' }, { type: 'Essay', count: '2', weight: '25%' }], passingScore: '360/500' },
      ],
      totalTime: '8 hours (2 parts x 4 hours)',
      testingWindow: 'Jan-Feb, May-Jun, Sep-Oct testing windows',
      retakePolicy: '3-year window to pass both parts',
    },
    timeManagement: {
      title: 'Time Allocation Strategy',
      strategies: [
        { title: 'MCQ Phase', description: '3 hours for 100 MCQs (~1.8 min each)' },
        { title: 'Essay Phase', description: '1 hour for 2 essays (30 min each)' },
        { title: 'Essay Structure', description: 'State conclusion → Support with 3 points → Show calculations' },
        { title: 'Don\'t Rush Essays', description: 'Essays are 25% of score - allocate full hour' },
      ],
    },
    questionStrategies: [
      { type: 'Multiple Choice (MCQ)', tips: ['Heavy on calculations - know variance formulas by heart', 'IRR, NPV, WACC appear frequently', 'Understand concepts, not just formulas', 'Use process of elimination on conceptual questions'] },
      { type: 'Essay Questions', tips: ['Read the scenario carefully - use all information provided', 'State your recommendation clearly upfront', 'Support with calculations AND reasoning', 'Use professional memo format', 'Show your work - partial credit is given'] },
    ],
    studyPlanning: {
      recommendedHours: '300-400 hours total (150-200 per part)',
      weeklySchedule: '15-20 hours per week for 10-12 weeks per part',
      tips: ['Master calculations first - they\'re the foundation', 'Practice essays weekly - don\'t save for the end', 'Understand ethics concepts for both parts', 'Review cost accounting formulas daily', 'IMA\'s learning system is comprehensive'],
    },
    testDay: {
      before: ['Review key formulas (variances, ratios, TVM)', 'Practice one timed essay', 'Light review - no cramming', 'Get good rest'],
      during: ['Complete MCQs first (3 hours)', 'Allocate full hour for essays', 'Show calculations in essays', 'Review flagged MCQs if time permits'],
      mindset: ['360/500 is passing - aim for solid, not perfect', 'Essays can save you - write clearly and completely', 'Trust your preparation', 'Each part is independent'],
    },
  },
  categories: [
    {
      type: 'cheatsheet',
      title: 'Cheatsheets',
      description: 'Quick reference for both parts',
      icon: ScrollText,
      color: 'emerald-600',
      colorLight: 'emerald-50',
      colorDark: 'emerald-900/30',
      items: [
        { id: 'cma-cs-p1', type: 'cheatsheet', title: 'Part 1 Cheatsheet', description: 'Budgeting, performance management, cost accounting', section: 'CMA1' },
        { id: 'cma-cs-p2', type: 'cheatsheet', title: 'Part 2 Cheatsheet', description: 'Financial management, decision analysis, ethics', section: 'CMA2' },
      ],
    },
    {
      type: 'study-guide',
      title: 'Study Guides',
      description: 'Comprehensive guides with study plans',
      icon: BookOpen,
      color: 'blue-600',
      colorLight: 'blue-50',
      colorDark: 'blue-900/30',
      items: [
        { id: 'cma-sg-p1', type: 'study-guide', title: 'Part 1 Study Guide', description: 'Financial planning, budgeting, cost management', section: 'CMA1' },
        { id: 'cma-sg-p2', type: 'study-guide', title: 'Part 2 Study Guide', description: 'Corporate finance, decision analysis, ethics', section: 'CMA2' },
      ],
    },
    {
      type: 'formula-sheet',
      title: 'Formula Sheets',
      description: 'Essential formulas for calculations',
      icon: Calculator,
      color: 'purple-600',
      colorLight: 'purple-50',
      colorDark: 'purple-900/30',
      items: [
        { id: 'cma-fs-p1', type: 'formula-sheet', title: 'Part 1 Formulas', description: 'CVP, variances, ratios, budgeting', section: 'CMA1' },
        { id: 'cma-fs-p2', type: 'formula-sheet', title: 'Part 2 Formulas', description: 'TVM, WACC, NPV, capital budgeting', section: 'CMA2' },
      ],
    },
    {
      type: 'mnemonic',
      title: 'Mnemonics',
      description: 'Memory aids for key concepts',
      icon: Brain,
      color: 'amber-600',
      colorLight: 'amber-50',
      colorDark: 'amber-900/30',
      items: [
        { id: 'cma-mn-var', type: 'mnemonic', title: 'Variance Mnemonics', description: 'AQ-SQ, AP-SP variance analysis', section: 'CMA1' },
        { id: 'cma-mn-ratio', type: 'mnemonic', title: 'Ratio Mnemonics', description: 'Liquidity, profitability, leverage', section: 'CMA2' },
      ],
    },
    {
      type: 'reference',
      title: 'Quick References',
      description: 'Tables, deadlines, and quick lookups',
      icon: FileText,
      color: 'cyan-600',
      colorLight: 'cyan-50',
      colorDark: 'cyan-900/30',
      items: [
        { id: 'cma-ref-testing', type: 'reference', title: 'CMA Testing Windows', description: 'Jan-Feb, May-Jun, Sep-Oct testing periods' },
        { id: 'cma-ref-essay', type: 'reference', title: 'Essay Writing Guide', description: 'Structured approach to CMA essay questions' },
        { id: 'cma-ref-calculator', type: 'reference', title: 'Calculator Policy', description: 'Approved calculators and functionality' },
      ],
    },
    {
      type: 'blueprint',
      title: 'Exam Blueprint',
      description: 'Interactive exam structure and domain weight breakdown',
      icon: Target,
      color: 'indigo-600',
      colorLight: 'indigo-50',
      colorDark: 'indigo-900/30',
      items: [
        { id: 'cma-blueprint', type: 'blueprint', title: 'CMA Exam Blueprint', description: 'Part 1 & 2 domain weights, exam format, and topic breakdown' },
      ],
    },
  ],
};

// ============================================================================
// CIA RESOURCES
// ============================================================================

const CIA_RESOURCES: CourseResourceConfig = {
  courseId: 'cia',
  examValue: {
    title: 'Why Become a CIA?',
    subtitle: 'The only globally recognized internal audit certification, trusted worldwide.',
    benefits: [
      { icon: 'credibility', title: 'Gold Standard', description: 'The CIA is the only globally accepted internal audit certification' },
      { icon: 'salary', title: 'Premium Earnings', description: 'CIAs earn significantly more than non-certified internal auditors' },
      { icon: 'career', title: 'CAE Pathway', description: 'Required credential for Chief Audit Executive and director roles' },
      { icon: 'global', title: 'Worldwide Demand', description: 'Regulatory requirements drive demand for CIAs across industries' },
    ],
    stats: [
      { value: '195', label: 'Countries Recognition' },
      { value: '200K+', label: 'CIAs Worldwide' },
      { value: '40%', label: 'Salary Premium' },
    ],
  },
  examTips: {
    title: 'CIA Exam Tips',
    tips: [
      'Know the IIA Standards cold - they are the foundation of every part of the exam.',
      'Think like an internal auditor - questions test judgment, not just knowledge.',
      'Part 3 is sneaky - it covers IT, business, and finance knowledge with depth.',
      'Practice situational questions - real-world scenarios are common.',
      'Review the IPPF regularly - the International Professional Practices Framework is essential.',
    ],
  },
  examOverview: {
    title: 'CIA Exam Overview',
    description: 'The CIA exam tests competency in internal auditing for IIA certification.',
    format: '3 parts: Essentials, Practice, Business Knowledge',
    duration: '2-2.5 hours per part',
    sections: 3,
  },
  strategyContent: {
    examStructure: {
      sections: [
        { name: 'Essentials of Internal Auditing', code: 'Part 1', duration: '2.5 hours', questionTypes: [{ type: 'MCQ', count: '125', weight: '100%' }], passingScore: '600/800' },
        { name: 'Practice of Internal Auditing', code: 'Part 2', duration: '2 hours', questionTypes: [{ type: 'MCQ', count: '100', weight: '100%' }], passingScore: '600/800' },
        { name: 'Business Knowledge for IA', code: 'Part 3', duration: '2 hours', questionTypes: [{ type: 'MCQ', count: '100', weight: '100%' }], passingScore: '600/800' },
      ],
      totalTime: '6.5 hours (across 3 parts)',
      testingWindow: 'Year-round at Pearson VUE centers',
      retakePolicy: '4-year window to pass all 3 parts',
    },
    timeManagement: {
      title: 'Time Allocation Strategy',
      strategies: [
        { title: 'Part 1', description: '125 questions in 2.5 hours = ~1.2 min per question' },
        { title: 'Parts 2 & 3', description: '100 questions in 2 hours = ~1.2 min per question' },
        { title: 'Flag Strategy', description: 'Flag uncertain questions and return in final 15 min' },
        { title: 'Think Like an Auditor', description: 'Choose the most risk-focused answer' },
      ],
    },
    questionStrategies: [
      { type: 'Multiple Choice (MCQ)', tips: ['Know the IIA Standards (IPPF) cold', 'Think "what would an auditor do" - risk-based mindset', 'Part 3 covers IT, finance, business - broad knowledge', 'Practice situational/scenario questions', 'COBIT, COSO, and ISO frameworks appear frequently'] },
    ],
    studyPlanning: {
      recommendedHours: '250-350 hours total',
      weeklySchedule: '10-15 hours per week for 8-10 weeks per part',
      tips: ['Start with Part 1 - it covers the Standards foundation', 'Part 2 is practical application of Part 1', 'Part 3 is the broadest - covers IT, finance, operations', 'Memorize the IPPF (International Professional Practices Framework)', 'Review IIA sample questions'],
    },
    testDay: {
      before: ['Review IIA Standards summary', 'Know the Three Lines Model', 'Light review of Part 3 topics (broad coverage)', 'Rest well - exams require focus'],
      during: ['Read questions carefully - scenario context matters', 'Think "as an internal auditor"', 'Flag difficult questions', 'Answer everything - guess if needed'],
      mindset: ['600/800 scaled score to pass', 'Focus on audit judgment questions', 'Part 3 is broad but not deep', 'Each part is independent'],
    },
  },
  categories: [
    {
      type: 'cheatsheet',
      title: 'Cheatsheets',
      description: 'Quick reference for all CIA parts',
      icon: ScrollText,
      color: 'emerald-600',
      colorLight: 'emerald-50',
      colorDark: 'emerald-900/30',
      items: [
        { id: 'cia-cs-p1', type: 'cheatsheet', title: 'Part 1 Cheatsheet', description: 'Internal audit fundamentals, standards', section: 'CIA1' },
        { id: 'cia-cs-p2', type: 'cheatsheet', title: 'Part 2 Cheatsheet', description: 'Managing the IA activity', section: 'CIA2' },
        { id: 'cia-cs-p3', type: 'cheatsheet', title: 'Part 3 Cheatsheet', description: 'Business knowledge for IA', section: 'CIA3' },
      ],
    },
    {
      type: 'study-guide',
      title: 'Study Guides',
      description: 'Comprehensive guides with IIA standards',
      icon: BookOpen,
      color: 'blue-600',
      colorLight: 'blue-50',
      colorDark: 'blue-900/30',
      items: [
        { id: 'cia-sg-p1', type: 'study-guide', title: 'Part 1 Study Guide', description: 'IIA Standards, independence, governance', section: 'CIA1' },
        { id: 'cia-sg-p2', type: 'study-guide', title: 'Part 2 Study Guide', description: 'Audit planning, supervision, communication', section: 'CIA2' },
        { id: 'cia-sg-p3', type: 'study-guide', title: 'Part 3 Study Guide', description: 'IT, business processes, financial management', section: 'CIA3' },
      ],
    },
    {
      type: 'formula-sheet',
      title: 'Formula Sheets',
      description: 'Sampling, risk, financial ratios',
      icon: Calculator,
      color: 'purple-600',
      colorLight: 'purple-50',
      colorDark: 'purple-900/30',
      items: [
        { id: 'cia-fs-all', type: 'formula-sheet', title: 'CIA Formula Sheet', description: 'Sampling, risk assessment, DuPont, IT metrics, NPV/IRR' },
      ],
    },
    {
      type: 'mnemonic',
      title: 'Mnemonics',
      description: 'Memory aids for audit concepts',
      icon: Brain,
      color: 'amber-600',
      colorLight: 'amber-50',
      colorDark: 'amber-900/30',
      items: [
        { id: 'cia-mn-3lines', type: 'mnemonic', title: 'Three Lines Model', description: 'Governance, management, IA roles', section: 'CIA1' },
        { id: 'cia-mn-qaip', type: 'mnemonic', title: 'QAIP Framework', description: 'Quality assurance assessments', section: 'CIA2' },
        { id: 'cia-mn-fraud', type: 'mnemonic', title: 'Fraud Triangle', description: 'Opportunity, rationalization, pressure', section: 'CIA3' },
      ],
    },
    {
      type: 'reference',
      title: 'Quick References',
      description: 'Tables, standards, and quick lookups',
      icon: FileText,
      color: 'cyan-600',
      colorLight: 'cyan-50',
      colorDark: 'cyan-900/30',
      items: [
        { id: 'cia-ref-ippf', type: 'reference', title: 'IPPF Overview', description: 'International Professional Practices Framework structure' },
        { id: 'cia-ref-standards', type: 'reference', title: 'IIA Standards Summary', description: 'Attribute and Performance Standards quick reference' },
        { id: 'cia-ref-testing', type: 'reference', title: 'CIA Testing Info', description: 'Pearson VUE testing, scheduling, and retake policies' },
      ],
    },
    {
      type: 'blueprint',
      title: 'Exam Blueprint',
      description: 'Interactive exam structure and domain weight breakdown',
      icon: Target,
      color: 'indigo-600',
      colorLight: 'indigo-50',
      colorDark: 'indigo-900/30',
      items: [
        { id: 'cia-blueprint', type: 'blueprint', title: 'CIA Exam Blueprint', description: 'Part 1-3 domain weights, exam format, and topic breakdown' },
      ],
    },
  ],
};

// ============================================================================
// CFP RESOURCES
// ============================================================================

const CFP_RESOURCES: CourseResourceConfig = {
  courseId: 'cfp',
  examOverview: {
    title: 'CFP Exam Overview',
    description: 'The CFP exam tests competency in comprehensive financial planning.',
    format: '7 domains across financial planning',
    duration: '6 hours (2 sessions)',
    sections: 7,
  },
  examValue: {
    title: 'Why Become a CFP®?',
    subtitle: 'The CFP® certification is the gold standard for financial planners, demonstrating competence and ethics',
    benefits: [
      { icon: 'salary', title: 'Premium Compensation', description: 'CFP® professionals earn 26% more than non-certified planners on average' },
      { icon: 'credibility', title: 'Client Trust', description: '87% of consumers say CFP® certification is important when choosing an advisor' },
      { icon: 'career', title: 'Competitive Edge', description: 'Stand out in a crowded field - only ~90,000 CFP® professionals in the US' },
      { icon: 'knowledge', title: 'Comprehensive Expertise', description: 'Master all aspects of financial planning: investments, tax, retirement, estate' },
    ],
    stats: [
      { label: 'Income Premium', value: '+26%', source: 'CFP Board' },
      { label: 'Consumer Trust', value: '87%', source: 'CFP Board Survey' },
      { label: 'Active CFP® Pros', value: '~96,000', source: 'CFP Board 2024' },
    ],
  },
  examTips: {
    title: 'CFP® Exam Success Tips',
    tips: [
      'Use process of elimination on difficult questions',
      'Read case study facts carefully - all information provided is usually relevant',
      'Watch for qualifiers: "always," "never," "must," "may"',
      'Manage time: ~2 minutes per question, flag and move on',
      'First pass: Answer what you know confidently',
      'Second pass: Work through flagged questions',
      'Don\'t change answers unless you have a good reason',
      'Trust your preparation - you\'ve put in the work',
    ],
  },
  strategyContent: {
    examStructure: {
      sections: [
        { name: 'CFP® Exam', code: 'CFP', duration: '6 hours (2 sessions)', questionTypes: [{ type: 'MCQ', count: '170', weight: '100%' }], passingScore: 'Varies by exam (criterion-referenced)' },
      ],
      totalTime: '6 hours (two 3-hour sessions with break)',
      testingWindow: 'March, July, November testing windows',
      retakePolicy: 'Must wait until next testing window; 5 attempts total',
    },
    timeManagement: {
      title: 'Time Allocation Strategy',
      strategies: [
        { title: 'Pace', description: '~2 minutes per question average' },
        { title: 'Case Studies', description: 'Read all case facts before answering related questions' },
        { title: 'Two-Pass Approach', description: 'Answer confident questions first, flag others' },
        { title: 'Use the Break', description: 'Take the break between sessions to reset' },
      ],
    },
    questionStrategies: [
      { type: 'Multiple Choice (MCQ)', tips: ['170 questions including case studies', 'Case studies provide client scenarios - read all facts', 'Apply the financial planning process to each question', 'Calculations: use your approved calculator', 'Ethics questions emphasize fiduciary duty and CFP Standards'] },
      { type: 'Case Studies', tips: ['Read the entire case before answering any questions', 'Note client facts: age, goals, risk tolerance, assets', 'Watch for changes in client situation across questions', 'Apply comprehensive planning, not siloed thinking', 'Usually 2-3 cases with 8-12 questions each'] },
    ],
    studyPlanning: {
      recommendedHours: '250-300 hours total',
      weeklySchedule: '15-20 hours per week for 3-4 months',
      tips: ['Study all 7 domains - exam integrates across topics', 'Focus extra time on Retirement and Tax (heavily weighted)', 'Practice case studies early and often', 'Know TVM calculations cold', 'Review CFP Board Principal Topics list'],
    },
    testDay: {
      before: ['Review key formulas and ratios', 'Know your calculator functions', 'Get good sleep - it\'s a 6-hour exam', 'Arrive 30 minutes early'],
      during: ['Take the scheduled break', 'Read case study facts completely', 'Flag uncertain questions', 'Manage energy across both sessions'],
      mindset: ['Pass rate is ~65% - preparation matters', 'Comprehensive thinking across domains', 'Trust your training', 'Each question is independent - move on from difficult ones'],
    },
  },
  categories: [
    {
      type: 'cheatsheet',
      title: 'Cheatsheets',
      description: 'Quick reference for all domains',
      icon: ScrollText,
      color: 'emerald-600',
      colorLight: 'emerald-50',
      colorDark: 'emerald-900/30',
      items: [
        { id: 'cfp-cs-gpp', type: 'cheatsheet', title: 'General Principles', description: 'Ethics, fiduciary duty, practice standards', section: 'GPP' },
        { id: 'cfp-cs-ris', type: 'cheatsheet', title: 'Risk & Insurance', description: 'Life, health, disability, liability', section: 'RIS' },
        { id: 'cfp-cs-inv', type: 'cheatsheet', title: 'Investment Planning', description: 'Asset allocation, portfolio theory', section: 'INV' },
        { id: 'cfp-cs-tax', type: 'cheatsheet', title: 'Tax Planning', description: 'Income, deductions, credits, strategies', section: 'TAX' },
        { id: 'cfp-cs-ret', type: 'cheatsheet', title: 'Retirement Planning', description: 'Qualified plans, Social Security', section: 'RET' },
        { id: 'cfp-cs-est', type: 'cheatsheet', title: 'Estate Planning', description: 'Trusts, transfers, tax strategies', section: 'EST' },
        { id: 'cfp-cs-psy', type: 'cheatsheet', title: 'Psychology of Planning', description: 'Behavioral finance, communication', section: 'PSY' },
      ],
    },
    {
      type: 'study-guide',
      title: 'Study Guides',
      description: 'Comprehensive guides with study plans',
      icon: BookOpen,
      color: 'blue-600',
      colorLight: 'blue-50',
      colorDark: 'blue-900/30',
      items: [
        { id: 'cfp-sg-all', type: 'study-guide', title: 'CFP Comprehensive Guide', description: 'All 7 domains: General, Risk, Investment, Tax, Retirement, Estate, Psychology' },
      ],
    },
    {
      type: 'formula-sheet',
      title: 'Formula Sheets',
      description: 'TVM, investment, retirement formulas',
      icon: Calculator,
      color: 'purple-600',
      colorLight: 'purple-50',
      colorDark: 'purple-900/30',
      items: [
        { id: 'cfp-fs-all', type: 'formula-sheet', title: 'CFP Formula Sheet', description: 'TVM, risk-adjusted returns, retirement, estate, tax' },
      ],
    },
    {
      type: 'mnemonic',
      title: 'Mnemonics',
      description: 'Memory aids for financial planning',
      icon: Brain,
      color: 'amber-600',
      colorLight: 'amber-50',
      colorDark: 'amber-900/30',
      items: [
        { id: 'cfp-mn-secure', type: 'mnemonic', title: 'SECURE 2.0', description: 'Key provisions and age requirements', section: 'RET' },
        { id: 'cfp-mn-ethics', type: 'mnemonic', title: 'CFP Ethics Code', description: 'ACT FAIR - duties to clients', section: 'GPP' },
        { id: 'cfp-mn-trusts', type: 'mnemonic', title: 'Trust Types', description: 'GRAT, GRUT, ILIT, QPRT essentials', section: 'EST' },
      ],
    },
    {
      type: 'reference',
      title: 'Quick References',
      description: 'Tables, limits, and quick lookups',
      icon: FileText,
      color: 'cyan-600',
      colorLight: 'cyan-50',
      colorDark: 'cyan-900/30',
      items: [
        { id: 'cfp-ref-limits', type: 'reference', title: '2026 Contribution Limits', description: 'IRA, 401(k), HSA, FSA annual limits' },
        { id: 'cfp-ref-ss', type: 'reference', title: 'Social Security Reference', description: 'FRA, cola, taxation, spousal benefits' },
        { id: 'cfp-ref-testing', type: 'reference', title: 'CFP Exam Info', description: 'Testing windows, passing rates, retake policy' },
        { id: 'cfp-ref-calculator', type: 'reference', title: 'Calculator Guide', description: 'HP 10bII+ and TI BA II Plus key functions' },
      ],
    },
    {
      type: 'blueprint',
      title: 'Exam Blueprint',
      description: 'Interactive exam structure and domain weight breakdown',
      icon: Target,
      color: 'indigo-600',
      colorLight: 'indigo-50',
      colorDark: 'indigo-900/30',
      items: [
        { id: 'cfp-blueprint', type: 'blueprint', title: 'CFP Exam Blueprint', description: '7 domain weights, exam format, and topic breakdown' },
      ],
    },
  ],
};

// ============================================================================
// CISA RESOURCES
// ============================================================================

const CISA_RESOURCES: CourseResourceConfig = {
  courseId: 'cisa',
  examValue: {
    title: 'Why Become a CISA?',
    subtitle: 'The premier credential for IT audit, control, and security professionals.',
    benefits: [
      { icon: 'salary', title: 'Top Earnings', description: 'CISA ranks among the highest-paying IT certifications globally' },
      { icon: 'credibility', title: 'Industry Standard', description: 'DoD Directive 8570 approved; required for many government roles' },
      { icon: 'career', title: 'High Demand', description: 'Cybersecurity and IT audit skills are in critical shortage worldwide' },
      { icon: 'network', title: 'ISACA Network', description: 'Join 165,000+ ISACA-certified professionals and 200+ chapters' },
    ],
    stats: [
      { value: '150K+', label: 'CISAs Worldwide' },
      { value: '#1', label: 'IT Audit Credential' },
      { value: '50%', label: 'Salary Premium' },
    ],
  },
  examTips: {
    title: 'CISA Exam Tips',
    tips: [
      'Think like an IS auditor - always prioritize risk-based decision making.',
      'Domain 5 is heavily weighted - Protection of Information Assets is 27% of the exam.',
      'Know your acronyms - RTO, RPO, MTPD, BIA, and SDLC phases are tested frequently.',
      'Focus on governance frameworks - COBIT, ITIL, and ISO standards appear throughout.',
      'Practice with the ISACA mindset - choose answers that are most audit-focused.',
    ],
  },
  examOverview: {
    title: 'CISA Exam Overview',
    description: 'The CISA exam tests competency in IS auditing from ISACA.',
    format: '5 domains across IS audit',
    duration: '4 hours (240 minutes)',
    sections: 5,
  },
  strategyContent: {
    examStructure: {
      sections: [
        { name: 'IS Audit Process', code: 'Domain 1', duration: 'n/a', questionTypes: [{ type: 'MCQ', count: '~26', weight: '17%' }], passingScore: 'Combined 450/800' },
        { name: 'IT Governance & Management', code: 'Domain 2', duration: 'n/a', questionTypes: [{ type: 'MCQ', count: '~26', weight: '17%' }], passingScore: 'Combined' },
        { name: 'IS Acquisition & Development', code: 'Domain 3', duration: 'n/a', questionTypes: [{ type: 'MCQ', count: '~18', weight: '12%' }], passingScore: 'Combined' },
        { name: 'IS Operations & Resilience', code: 'Domain 4', duration: 'n/a', questionTypes: [{ type: 'MCQ', count: '~41', weight: '27%' }], passingScore: 'Combined' },
        { name: 'Protection of Information Assets', code: 'Domain 5', duration: 'n/a', questionTypes: [{ type: 'MCQ', count: '~41', weight: '27%' }], passingScore: 'Combined' },
      ],
      totalTime: '4 hours (150 questions)',
      testingWindow: 'Year-round at PSI testing centers',
      retakePolicy: 'Must wait 30 days between attempts',
    },
    timeManagement: {
      title: 'Time Allocation Strategy',
      strategies: [
        { title: 'Pace', description: '~1.6 minutes per question (4 hours / 150 questions)' },
        { title: 'Domain Weight', description: 'Domains 4 & 5 are 54% of exam - prioritize these in study' },
        { title: 'Flag Strategy', description: 'Mark uncertain questions and return with remaining time' },
        { title: 'Think Like an Auditor', description: 'Risk-based answers are usually correct' },
      ],
    },
    questionStrategies: [
      { type: 'Multiple Choice (MCQ)', tips: ['All 150 questions are MCQ', 'Think from IS auditor perspective (risk-based)', 'Know COBIT 2019, ITIL, ISO frameworks', 'Domain 5 (Protection) is highest weighted - know security controls', 'Acronyms matter: RTO, RPO, MTPD, BIA, SDLC', 'ISACA mindset: governance and control-focused answers'] },
    ],
    studyPlanning: {
      recommendedHours: '200-300 hours total',
      weeklySchedule: '15-20 hours per week for 3-4 months',
      tips: ['Focus on Domains 4 & 5 (54% of exam)', 'Know COBIT 2019 principles and components', 'Understand BCP/DRP concepts thoroughly', 'SDLC phases and controls are tested', 'Review ISACA official QAE database'],
    },
    testDay: {
      before: ['Review Domain 4 & 5 key concepts', 'Know your acronyms (RTO, RPO, etc.)', 'Arrive early with valid ID', 'Light review - trust your preparation'],
      during: ['Think "what would an IS auditor recommend"', 'Flag uncertain questions', 'Don\'t overthink - choose audit-focused answers', 'Answer all questions - no penalty'],
      mindset: ['450/800 scaled score to pass', 'About 50% pass first time - preparation matters', 'Risk-based thinking wins', 'Each question is independent'],
    },
  },
  categories: [
    {
      type: 'cheatsheet',
      title: 'Cheatsheets',
      description: 'Quick reference for all domains',
      icon: ScrollText,
      color: 'emerald-600',
      colorLight: 'emerald-50',
      colorDark: 'emerald-900/30',
      items: [
        { id: 'cisa-cs-d1', type: 'cheatsheet', title: 'Domain 1 Cheatsheet', description: 'IS Audit Process', section: 'CISA1' },
        { id: 'cisa-cs-d2', type: 'cheatsheet', title: 'Domain 2 Cheatsheet', description: 'IT Governance', section: 'CISA2' },
        { id: 'cisa-cs-d3', type: 'cheatsheet', title: 'Domain 3 Cheatsheet', description: 'IS Acquisition & Development', section: 'CISA3' },
        { id: 'cisa-cs-d4', type: 'cheatsheet', title: 'Domain 4 Cheatsheet', description: 'IS Operations & Resilience', section: 'CISA4' },
        { id: 'cisa-cs-d5', type: 'cheatsheet', title: 'Domain 5 Cheatsheet', description: 'Protection of Information Assets', section: 'CISA5' },
      ],
    },
    {
      type: 'study-guide',
      title: 'Study Guides',
      description: 'Comprehensive guides with domain breakdowns and study plans',
      icon: BookOpen,
      color: 'blue-600',
      colorLight: 'blue-50',
      colorDark: 'blue-900/30',
      items: [
        { id: 'cisa-sg-d1', type: 'study-guide', title: 'Domain 1 Study Guide', description: 'IS Audit Process (18%)', section: 'CISA1' },
        { id: 'cisa-sg-d2', type: 'study-guide', title: 'Domain 2 Study Guide', description: 'IT Governance & Management (18%)', section: 'CISA2' },
        { id: 'cisa-sg-d3', type: 'study-guide', title: 'Domain 3 Study Guide', description: 'IS Acquisition & Development (12%)', section: 'CISA3' },
        { id: 'cisa-sg-d4', type: 'study-guide', title: 'Domain 4 Study Guide', description: 'IS Operations & Resilience (26%)', section: 'CISA4' },
        { id: 'cisa-sg-d5', type: 'study-guide', title: 'Domain 5 Study Guide', description: 'Protection of Information Assets (26%)', section: 'CISA5' },
      ],
    },
    {
      type: 'formula-sheet',
      title: 'Formula Sheets',
      description: 'IT audit metrics and calculations',
      icon: Calculator,
      color: 'purple-600',
      colorLight: 'purple-50',
      colorDark: 'purple-900/30',
      items: [
        { id: 'cisa-fs-all', type: 'formula-sheet', title: 'CISA Formula Sheet', description: 'ALE/SLE, RTO/RPO, SDLC metrics, availability, security' },
      ],
    },
    {
      type: 'mnemonic',
      title: 'Mnemonics',
      description: 'Memory aids for IS audit',
      icon: Brain,
      color: 'amber-600',
      colorLight: 'amber-50',
      colorDark: 'amber-900/30',
      items: [
        { id: 'cisa-mn-cobit', type: 'mnemonic', title: 'COBIT 2019', description: 'Governance system and design factors', section: 'CISA2' },
        { id: 'cisa-mn-sdlc', type: 'mnemonic', title: 'SDLC Phases', description: 'Planning through maintenance', section: 'CISA3' },
        { id: 'cisa-mn-bcp', type: 'mnemonic', title: 'BCP/DRP', description: 'RTO, RPO, MTPD key metrics', section: 'CISA4' },
        { id: 'cisa-mn-crypto', type: 'mnemonic', title: 'Cryptography', description: 'Symmetric vs asymmetric, key lengths', section: 'CISA5' },
      ],
    },
    {
      type: 'reference',
      title: 'Quick References',
      description: 'Tables, standards, and quick lookups',
      icon: FileText,
      color: 'cyan-600',
      colorLight: 'cyan-50',
      colorDark: 'cyan-900/30',
      items: [
        { id: 'cisa-ref-domains', type: 'reference', title: 'Domain Weight Chart', description: 'Domain weights: D1 18%, D2 18%, D3 12%, D4 26%, D5 26%' },
        { id: 'cisa-ref-acronyms', type: 'reference', title: 'Key Acronyms', description: 'RTO, RPO, MTPD, BIA, SDLC, COBIT, ITIL definitions' },
        { id: 'cisa-ref-testing', type: 'reference', title: 'CISA Testing Info', description: 'PSI testing, scheduling, and retake policies' },
        { id: 'cisa-ref-frameworks', type: 'reference', title: 'Framework Comparison', description: 'COBIT vs ITIL vs ISO 27001 quick comparison' },
      ],
    },
    {
      type: 'blueprint',
      title: 'Exam Blueprint',
      description: 'Interactive exam structure and domain weight breakdown',
      icon: Target,
      color: 'indigo-600',
      colorLight: 'indigo-50',
      colorDark: 'indigo-900/30',
      items: [
        { id: 'cisa-blueprint', type: 'blueprint', title: 'CISA Exam Blueprint', description: '5 domain weights, exam format, and topic breakdown' },
      ],
    },
  ],
};

// ============================================================================
// EXPORT ALL CONFIGS
// ============================================================================

export const COURSE_RESOURCE_CONFIG: Record<CourseId, CourseResourceConfig> = {
  cpa: CPA_RESOURCES,
  ea: EA_RESOURCES,
  cma: CMA_RESOURCES,
  cia: CIA_RESOURCES,
  cfp: CFP_RESOURCES,
  cisa: CISA_RESOURCES,
};

export function getResourceConfig(courseId: CourseId): CourseResourceConfig {
  return COURSE_RESOURCE_CONFIG[courseId];
}

export function getResourceCategory(courseId: CourseId, type: ResourceType): ResourceCategory | undefined {
  const config = COURSE_RESOURCE_CONFIG[courseId];
  return config?.categories.find(c => c.type === type);
}

export function getResourceItem(courseId: CourseId, type: ResourceType, itemId: string): ResourceItem | undefined {
  const config = COURSE_RESOURCE_CONFIG[courseId];
  const category = config?.categories.find(c => c.type === type);
  return category?.items.find(i => i.id === itemId);
}
