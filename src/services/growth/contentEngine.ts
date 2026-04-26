/**
 * Content Engine — Automated content generation for SEO
 * 
 * Generates blog posts, guides, and resource pages from:
 * 1. Content templates (per content type)
 * 2. Exam data (questions, lessons, topics already in the app)
 * 3. Keyword gap analysis (missing content for high-volume keywords)
 * 4. Gemini AI for drafting (same integration used by AI tutor)
 * 
 * All content publishes under voraprep.com/blog/* for domain authority.
 */

import type { CourseId } from '../../types/course';
import { COURSE_DISPLAY_STATS } from '../../config/contentStats';
import type {
  ContentBrief,
  ContentTemplate,
  ContentType,
  ContentStatus,
  SearchIntent,
} from '../../types/growth';

// ============================================================================
// Content Templates — Define what content to auto-generate per exam
// ============================================================================

/**
 * Master content template library.
 * Each template can generate N articles per exam × sections.
 * 
 * Variable tokens:
 *   {exam}     — "CPA", "EA", "CMA"
 *   {examFull} — "Certified Public Accountant (CPA)"
 *   {section}  — "FAR", "SEE1", "CISA1"
 *   {sectionName} — "Financial Accounting and Reporting"
 *   {year}     — "2026"
 *   {price}    — "$19"
 *   {questions}— "5,000+"
 *   {course}   — "cpa" (lowercase slug)
 */
export const CONTENT_TEMPLATES: ContentTemplate[] = [
  // ------ Study Guides (per section) ------
  {
    id: 'study-guide-section',
    contentType: 'study-guide',
    titleTemplate: 'Complete {exam} {sectionName} Study Guide {year}',
    slugTemplate: '{course}-{section}-study-guide-{year}',
    wordCountTarget: 2500,
    ctaType: 'free-trial',
    applicableCourses: 'all',
    perSection: true,
    seasonal: true,
    priority: 1,
    outlineTemplate: [
      { heading: 'What Is {exam} {sectionName}?', level: 2, keyPoints: ['Overview of the section', 'What it tests', 'Weight on the exam'], wordCount: 300 },
      { heading: '{sectionName} Exam Format and Structure', level: 2, keyPoints: ['Question types', 'Time allowed', 'Passing score'], wordCount: 250 },
      { heading: 'Key Topics in {sectionName}', level: 2, keyPoints: ['Blueprint areas', 'High-weight topics', 'Common tested concepts'], wordCount: 400 },
      { heading: 'How to Study for {sectionName} Effectively', level: 2, keyPoints: ['Study plan', 'Spaced repetition', 'Practice questions'], wordCount: 400 },
      { heading: 'Common Mistakes to Avoid', level: 2, keyPoints: ['Time management', 'Skipping hard topics', 'Not doing enough MCQ'], wordCount: 300 },
      { heading: '{sectionName} Pass Rates and What They Mean', level: 2, keyPoints: ['Historical pass rates', 'Difficulty perception', 'What a 75 means'], wordCount: 250 },
      { heading: 'Best {sectionName} Study Resources in {year}', level: 2, keyPoints: ['VoraPrep features', 'Comparison with alternatives', 'Free vs paid'], wordCount: 300 },
      { heading: 'FAQs About {exam} {sectionName}', level: 2, keyPoints: ['5-8 common questions', 'Direct answers'], wordCount: 300 },
    ],
  },

  // ------ Exam Comparison ------
  {
    id: 'exam-comparison',
    contentType: 'comparison',
    titleTemplate: '{exam} vs {comparisonExam}: Which Certification Is Right for You in {year}?',
    slugTemplate: '{course}-vs-{comparisonCourse}-certification-{year}',
    wordCountTarget: 2000,
    ctaType: 'register',
    applicableCourses: 'all',
    perSection: false,
    seasonal: true,
    priority: 2,
    outlineTemplate: [
      { heading: '{exam} vs {comparisonExam} at a Glance', level: 2, keyPoints: ['Side-by-side comparison table', 'Key differences'], wordCount: 300 },
      { heading: 'What Is the {exam}?', level: 2, keyPoints: ['Overview', 'Who it\'s for', 'Career impact'], wordCount: 300 },
      { heading: 'What Is the {comparisonExam}?', level: 2, keyPoints: ['Overview', 'Who it\'s for', 'Career impact'], wordCount: 300 },
      { heading: 'Exam Difficulty Comparison', level: 2, keyPoints: ['Pass rates', 'Study hours', 'Content difficulty'], wordCount: 300 },
      { heading: 'Salary and Career Outcomes', level: 2, keyPoints: ['Average salary', 'Job market demand', 'Career advancement'], wordCount: 300 },
      { heading: 'Which Should You Choose?', level: 2, keyPoints: ['Decision framework', 'Career goals', 'Time investment'], wordCount: 250 },
      { heading: 'Can You Get Both?', level: 2, keyPoints: ['Dual certification value', 'Overlap in content', 'Study timeline'], wordCount: 250 },
    ],
  },

  // ------ Pass Rates Article ------
  {
    id: 'pass-rates',
    contentType: 'pass-rates',
    titleTemplate: '{exam} Pass Rates {year}: What to Expect',
    slugTemplate: '{course}-pass-rates-{year}',
    wordCountTarget: 1800,
    ctaType: 'free-trial',
    applicableCourses: 'all',
    perSection: false,
    seasonal: true,
    priority: 2,
    outlineTemplate: [
      { heading: '{exam} Overall Pass Rates in {year}', level: 2, keyPoints: ['Aggregate pass rate', 'Year-over-year trends', 'What the numbers mean'], wordCount: 300 },
      { heading: 'Pass Rates by Section', level: 2, keyPoints: ['Per-section breakdown', 'Hardest vs easiest', 'Historical context'], wordCount: 400 },
      { heading: 'Why the {exam} Pass Rate Is Low', level: 2, keyPoints: ['Common failure reasons', 'Study habits data', 'Time investment gap'], wordCount: 300 },
      { heading: 'How to Beat the Odds', level: 2, keyPoints: ['Study strategies', 'Adaptive learning benefits', 'Practice question volume'], wordCount: 300 },
      { heading: 'How VoraPrep Helps You Pass', level: 2, keyPoints: ['AI-powered adaptive engine', 'Spaced repetition', 'Score predictor'], wordCount: 250 },
      { heading: '{exam} Pass Rate FAQs', level: 2, keyPoints: ['Common questions with data-backed answers'], wordCount: 250 },
    ],
  },

  // ------ Study Schedule ------
  {
    id: 'study-schedule',
    contentType: 'study-schedule',
    titleTemplate: '{exam} Study Schedule {year}: Week-by-Week Plan for Working Professionals',
    slugTemplate: '{course}-study-schedule-{year}',
    wordCountTarget: 2200,
    ctaType: 'register',
    applicableCourses: 'all',
    perSection: false,
    seasonal: true,
    priority: 2,
    outlineTemplate: [
      { heading: 'How Long Does It Take to Study for the {exam}?', level: 2, keyPoints: ['Total hours needed', 'Per section breakdown', 'Full-time vs part-time'], wordCount: 300 },
      { heading: '{exam} Study Schedule Overview', level: 2, keyPoints: ['Timeline options: 3mo, 6mo, 12mo', 'Section order strategy', 'Milestone dates'], wordCount: 300 },
      { heading: 'Week-by-Week Study Plan', level: 2, keyPoints: ['Detailed weekly breakdown', 'Topics per week', 'MCQ targets'], wordCount: 600 },
      { heading: 'Study Tips for Working Professionals', level: 2, keyPoints: ['Morning vs evening study', 'Weekend strategy', 'Burnout prevention'], wordCount: 300 },
      { heading: 'When to Take the Exam', level: 2, keyPoints: ['Exam windows', 'Testing center tips', 'Score release dates'], wordCount: 250 },
      { heading: 'Free Study Tools from VoraPrep', level: 2, keyPoints: ['Adaptive practice', 'AI tutor', 'Score predictor'], wordCount: 200 },
    ],
  },

  // ------ 90-Day Study Plan ------
  {
    id: '90-day-study-plan',
    contentType: 'study-schedule',
    titleTemplate: '90-Day {exam} Study Plan ({year}): Daily Schedule for Busy Candidates',
    slugTemplate: '90-day-{course}-study-plan-{year}',
    wordCountTarget: 2200,
    ctaType: 'register',
    applicableCourses: 'all',
    perSection: false,
    seasonal: true,
    priority: 1,
    outlineTemplate: [
      { heading: 'Is 90 Days Enough to Pass the {exam}?', level: 2, keyPoints: ['Who a 90-day plan works for', 'When to choose a longer schedule', 'Study-hour expectations'], wordCount: 280 },
      { heading: 'Your 12-Week {exam} Roadmap', level: 2, keyPoints: ['Weeks 1-4 foundation', 'Weeks 5-8 intensive practice', 'Weeks 9-12 final review and exam readiness'], wordCount: 500 },
      { heading: 'A Realistic Weekly Calendar for Working Professionals', level: 2, keyPoints: ['Weekday study blocks', 'Weekend catch-up sessions', 'Rest and recovery'], wordCount: 350 },
      { heading: 'Daily MCQ, Lesson, and Review Targets', level: 2, keyPoints: ['Question targets by week', 'When to add simulations/case studies', 'How to use spaced repetition'], wordCount: 350 },
      { heading: 'What to Do If You Fall Behind', level: 2, keyPoints: ['How to triage weak topics', 'How to use PTO strategically', 'How to compress the final two weeks'], wordCount: 300 },
      { heading: 'Tools That Make a 90-Day Plan Work', level: 2, keyPoints: ['Adaptive study plans', 'Progress tracking', 'AI tutoring for fast clarification'], wordCount: 220 },
    ],
  },

  // ------ Section Cheat Sheet ------
  {
    id: 'cheat-sheet-section',
    contentType: 'cheat-sheet',
    titleTemplate: '{exam} {sectionName} Cheat Sheet ({year}): Key Formulas, Rules, and Mnemonics',
    slugTemplate: '{course}-{section}-cheat-sheet-{year}',
    wordCountTarget: 1800,
    ctaType: 'free-trial',
    applicableCourses: 'all',
    perSection: true,
    seasonal: true,
    priority: 1,
    outlineTemplate: [
      { heading: '{sectionName} at a Glance', level: 2, keyPoints: ['What the section tests', 'Highest-weight areas', 'What to memorize vs understand'], wordCount: 250 },
      { heading: 'Must-Know Formulas, Rules, and Frameworks', level: 2, keyPoints: ['Core formulas', 'Thresholds or rules to memorize', 'Shortcuts that save time'], wordCount: 500 },
      { heading: 'Common Traps and Test-Day Reminders', level: 2, keyPoints: ['Frequent distractors', 'Calculation mistakes', 'Timing pitfalls'], wordCount: 300 },
      { heading: 'Mnemonics and Memory Aids', level: 2, keyPoints: ['Easy recall techniques', 'How to build your own memory hooks', 'What is worth memorizing'], wordCount: 300 },
      { heading: 'How to Use This Cheat Sheet in Your Study Routine', level: 2, keyPoints: ['When to review it', 'How to pair it with MCQs', 'How to turn it into flashcards'], wordCount: 250 },
      { heading: 'More {exam} {sectionName} Help', level: 2, keyPoints: ['Link to study guide', 'Link to practice questions', 'Link to schedule or pass-rate article'], wordCount: 200 },
    ],
  },

  // ------ Career Guide ------
  {
    id: 'career-guide',
    contentType: 'career-guide',
    titleTemplate: 'What Can You Do With a {exam}? Career Paths, Salary, and ROI ({year})',
    slugTemplate: 'what-can-you-do-with-a-{course}-{year}',
    wordCountTarget: 2200,
    ctaType: 'register',
    applicableCourses: 'all',
    perSection: false,
    seasonal: true,
    priority: 2,
    outlineTemplate: [
      { heading: 'What the {exam} Credential Signals to Employers', level: 2, keyPoints: ['Skills employers associate with the credential', 'How it differs from general experience', 'Why it matters in hiring'], wordCount: 320 },
      { heading: 'Top Career Paths After the {exam}', level: 2, keyPoints: ['Common job titles', 'Public vs private sector roles', 'Leadership paths'], wordCount: 450 },
      { heading: 'Salary Potential and Long-Term ROI', level: 2, keyPoints: ['Entry-level vs senior pay', 'Certification premium', 'Payback period on exam costs'], wordCount: 400 },
      { heading: 'Who Should Pursue the {exam}?', level: 2, keyPoints: ['Best fit backgrounds', 'Who may prefer a different certification', 'Career stage considerations'], wordCount: 320 },
      { heading: 'How to Get Started', level: 2, keyPoints: ['Requirements snapshot', 'Timeline', 'Best first steps for candidates'], wordCount: 300 },
      { heading: 'Next Resources to Explore', level: 2, keyPoints: ['Study schedule', 'Pass rates', 'Best review course comparison'], wordCount: 220 },
    ],
  },

  // ------ News / Changes Update ------
  {
    id: 'news-update',
    contentType: 'news-update',
    titleTemplate: '{exam} Exam Changes {year}: What Candidates Need to Know',
    slugTemplate: '{course}-exam-changes-{year}',
    wordCountTarget: 1800,
    ctaType: 'free-trial',
    applicableCourses: 'all',
    perSection: false,
    seasonal: true,
    priority: 1,
    outlineTemplate: [
      { heading: 'What Changed for the {exam} in {year}?', level: 2, keyPoints: ['Official updates', 'What stayed the same', 'Who is affected'], wordCount: 300 },
      { heading: 'Changes to Exam Format, Blueprints, or Timing', level: 2, keyPoints: ['Section structure', 'Question weighting', 'Testing windows or registration changes'], wordCount: 350 },
      { heading: 'How These Changes Affect Your Study Plan', level: 2, keyPoints: ['What to prioritize now', 'What old advice is outdated', 'Whether you should accelerate or delay your test date'], wordCount: 350 },
      { heading: 'What Current Candidates Should Do Next', level: 2, keyPoints: ['Checklist for candidates already studying', 'Checklist for new starters', 'When to verify official announcements'], wordCount: 300 },
      { heading: 'Best Resources to Stay Current', level: 2, keyPoints: ['Official exam body pages', 'Candidate handbooks', 'VoraPrep study schedule and guide articles'], wordCount: 250 },
      { heading: 'FAQ About {year} {exam} Changes', level: 2, keyPoints: ['Will old materials still work?', 'Will pass rates change?', 'What if you are mid-plan?'], wordCount: 250 },
    ],
  },

  // ------ Case Study / Success Plan ------
  {
    id: 'case-study',
    contentType: 'case-study',
    titleTemplate: 'How to Pass the {exam} While Working Full Time ({year})',
    slugTemplate: 'pass-{course}-while-working-full-time-{year}',
    wordCountTarget: 2000,
    ctaType: 'register',
    applicableCourses: 'all',
    perSection: false,
    seasonal: true,
    priority: 1,
    outlineTemplate: [
      { heading: 'Why Working Professionals Struggle With the {exam}', level: 2, keyPoints: ['Time pressure', 'Energy management', 'Consistency problems'], wordCount: 280 },
      { heading: 'A Realistic Weekly System That Actually Works', level: 2, keyPoints: ['Weekday routine', 'Weekend structure', 'How to protect study time'], wordCount: 420 },
      { heading: 'How to Study Efficiently When Time Is Limited', level: 2, keyPoints: ['Prioritizing high-yield topics', 'Using adaptive practice', 'Reviewing mistakes instead of rereading'], wordCount: 380 },
      { heading: 'What to Do During Busy Season or High-Stress Weeks', level: 2, keyPoints: ['Minimum viable study habit', 'How to bounce back after lost weeks', 'When to move an exam date'], wordCount: 320 },
      { heading: 'Sample 8-Week and 12-Week Work-Friendly Plans', level: 2, keyPoints: ['Compressed plan', 'Standard plan', 'When each makes sense'], wordCount: 350 },
      { heading: 'Tools That Save Time', level: 2, keyPoints: ['AI tutor for stuck points', 'Personalized next-step guidance', 'Smart question review'], wordCount: 250 },
    ],
  },

  // ------ Competitor Comparison (Review Course Comparison) ------
  {
    id: 'review-comparison',
    contentType: 'review-comparison',
    titleTemplate: 'Best {exam} Review Courses in {year}: Honest Comparison (Including Free Options)',
    slugTemplate: 'best-{course}-review-courses-{year}',
    wordCountTarget: 2800,
    ctaType: 'pricing',
    applicableCourses: 'all',
    perSection: false,
    seasonal: true,
    priority: 1,
    outlineTemplate: [
      { heading: 'Best {exam} Prep Courses at a Glance', level: 2, keyPoints: ['Quick comparison table', 'Price, features, pass rates'], wordCount: 300 },
      { heading: 'How We Evaluated Each Course', level: 2, keyPoints: ['Methodology: price, tech, content, support', 'What matters most'], wordCount: 200 },
      { heading: 'Individual Course Reviews', level: 2, keyPoints: ['3-5 competitors + VoraPrep', 'Pros/cons each', 'Best for whom'], wordCount: 800 },
      { heading: 'VoraPrep: AI-Powered {exam} Prep', level: 2, keyPoints: ['Feature deep-dive', 'Why AI matters', 'Price advantage'], wordCount: 400 },
      { heading: 'Price Comparison', level: 2, keyPoints: ['Side-by-side pricing table', 'Value per dollar analysis'], wordCount: 300 },
      { heading: 'Which {exam} Course Is Best for You?', level: 2, keyPoints: ['Decision matrix by learner type', 'Budget considerations'], wordCount: 300 },
      { heading: 'FAQ About {exam} Review Courses', level: 2, keyPoints: ['Common questions'], wordCount: 250 },
    ],
  },

  // ------ Salary Guide ------
  {
    id: 'salary-guide',
    contentType: 'salary-guide',
    titleTemplate: '{exam} Salary Guide {year}: How Much Do {exam}s Earn?',
    slugTemplate: '{course}-salary-guide-{year}',
    wordCountTarget: 2000,
    ctaType: 'register',
    applicableCourses: 'all',
    perSection: false,
    seasonal: true,
    priority: 3,
    outlineTemplate: [
      { heading: 'Average {exam} Salary in {year}', level: 2, keyPoints: ['National average', 'Median vs mean', 'Bonus and total comp'], wordCount: 300 },
      { heading: '{exam} Salary by Experience Level', level: 2, keyPoints: ['Entry level', 'Mid-career', 'Senior/Partner'], wordCount: 300 },
      { heading: '{exam} Salary by Location', level: 2, keyPoints: ['Top-paying states/cities', 'Cost-of-living adjusted', 'Remote work impact'], wordCount: 400 },
      { heading: '{exam} Salary by Industry', level: 2, keyPoints: ['Public accounting', 'Corporate', 'Government', 'Consulting'], wordCount: 300 },
      { heading: 'How {exam} Certification Affects Your Salary', level: 2, keyPoints: ['Premium over non-certified', 'Promotion speed', 'ROI calculation'], wordCount: 350 },
      { heading: 'Start Your {exam} Journey', level: 2, keyPoints: ['CTA to VoraPrep', 'Free trial offer'], wordCount: 150 },
    ],
  },

  // ------ Free Practice Questions (Lead Gen) ------
  {
    id: 'free-practice',
    contentType: 'practice-questions',
    titleTemplate: 'Free {exam} {sectionName} Practice Questions ({year})',
    slugTemplate: 'free-{course}-{section}-practice-questions-{year}',
    wordCountTarget: 3000,
    ctaType: 'free-trial',
    applicableCourses: 'all',
    perSection: true,
    seasonal: true,
    priority: 1,
    outlineTemplate: [
      { heading: 'About These Free {sectionName} Questions', level: 2, keyPoints: ['Number of questions', 'Difficulty mix', 'Blueprint alignment'], wordCount: 200 },
      { heading: '{sectionName} Practice Questions', level: 2, keyPoints: ['10-15 sample questions with explanations', 'Varying difficulty'], wordCount: 1500 },
      { heading: 'How Did You Score?', level: 2, keyPoints: ['Score interpretation', 'What your results mean', 'Next steps'], wordCount: 300 },
      { heading: 'Get More {exam} Practice on VoraPrep', level: 2, keyPoints: ['Full question bank', 'Adaptive engine', 'AI tutor'], wordCount: 300 },
    ],
  },

  // ------ Topic Explainer (per blueprint area) ------
  {
    id: 'topic-explainer',
    contentType: 'topic-explainer',
    titleTemplate: 'Understanding {topic}: {exam} {sectionName} Deep Dive',
    slugTemplate: '{course}-{section}-breakdown-{year}',
    wordCountTarget: 2400,
    ctaType: 'free-trial',
    applicableCourses: 'all',
    perSection: true, // actually per-topic, but we generate per section and expand
    seasonal: false,
    priority: 3,
    outlineTemplate: [
      { heading: 'Why {topic} Feels Hard — and How to Make It Click', level: 2, keyPoints: ['Why candidates get stuck here', 'How it appears on the exam', 'The one big idea to anchor first'], wordCount: 280 },
      { heading: 'The Core Idea in Plain English', level: 2, keyPoints: ['Clear definition without jargon overload', 'Use an analogy or mental model', 'Show why it matters in real practice'], wordCount: 420 },
      { heading: 'A Step-by-Step Framework for Solving {topic} Questions', level: 2, keyPoints: ['Decision process', 'Rules and exceptions', 'What to do first under time pressure'], wordCount: 450 },
      { heading: 'Worked Example: {topic} From Start to Finish', level: 2, keyPoints: ['Realistic exam-style scenario', 'Detailed explanation of each step', 'How to avoid common mistakes'], wordCount: 520 },
      { heading: 'Common Traps and Quick Self-Check', level: 2, keyPoints: ['Frequent distractors', '3-5 quick self-check prompts', 'Memory aids or mnemonics'], wordCount: 350 },
      { heading: 'How to Master {topic} with VoraPrep', level: 2, keyPoints: ['Adaptive practice', 'AI tutor for explanations', 'Related guides and cheat sheets'], wordCount: 250 },
    ],
  },

  // ------ Exam Tips ------
  {
    id: 'exam-tips',
    contentType: 'exam-tips',
    titleTemplate: '15 Tips to Pass the {exam} Exam in {year}',
    slugTemplate: '{course}-exam-tips-{year}',
    wordCountTarget: 1800,
    ctaType: 'register',
    applicableCourses: 'all',
    perSection: false,
    seasonal: false,
    priority: 3,
    outlineTemplate: [
      { heading: 'Before Exam Day', level: 2, keyPoints: ['What to bring', 'Night before routine', 'Prometric/Pearson tips'], wordCount: 300 },
      { heading: 'During the Exam', level: 2, keyPoints: ['Time management', 'Flagging strategy', 'MCQ approach', 'TBS approach'], wordCount: 500 },
      { heading: 'Section-Specific Tips', level: 2, keyPoints: ['Per-section strategies', 'What to focus on last minute'], wordCount: 400 },
      { heading: 'After the Exam', level: 2, keyPoints: ['Score release timeline', 'What to do if you fail', 'Retake strategy'], wordCount: 300 },
      { heading: 'Prepare with VoraPrep', level: 2, keyPoints: ['Exam simulator feature', 'Score predictor', 'Adaptive practice'], wordCount: 200 },
    ],
  },

  // ------ Requirements by State (CPA specific — massive SEO surface area) ------
  {
    id: 'requirements-state',
    contentType: 'requirements',
    titleTemplate: 'CPA Requirements in {state} ({year}): Education, Exam & Experience',
    slugTemplate: 'cpa-requirements-{stateSlug}-{year}',
    wordCountTarget: 1800,
    ctaType: 'register',
    applicableCourses: ['cpa'],
    perSection: false,
    seasonal: true,
    priority: 2,
    outlineTemplate: [
      { heading: 'CPA Requirements in {state} Overview', level: 2, keyPoints: ['Quick summary table', 'Education hours', 'Experience requirement'], wordCount: 300 },
      { heading: 'Education Requirements', level: 2, keyPoints: ['150 credit hours', 'Accounting coursework', 'Business coursework'], wordCount: 300 },
      { heading: 'Exam Requirements', level: 2, keyPoints: ['Eligibility application', 'NTS process', 'State board info'], wordCount: 250 },
      { heading: 'Experience Requirements', level: 2, keyPoints: ['Supervised experience', 'Qualifying activities', 'Verification process'], wordCount: 250 },
      { heading: 'CPA License Application Process', level: 2, keyPoints: ['Steps to licensure', 'Fees', 'Timeline'], wordCount: 250 },
      { heading: 'Start Your CPA Journey in {state}', level: 2, keyPoints: ['VoraPrep CTA', 'Free trial', 'Success stories from state'], wordCount: 200 },
    ],
  },
];

// ============================================================================
// Exam Metadata for Template Interpolation
// ============================================================================

export interface ExamContentMeta {
  courseId: CourseId;
  exam: string;             // 'CPA'
  examFull: string;         // 'Certified Public Accountant (CPA)'
  course: string;           // 'cpa' (slug)
  sections: ExamSectionMeta[];
  price: string;            // '$19'
  annualPrice: string;      // '$99'
  questionCount: string;    // '5,000+'
}

export interface ExamSectionMeta {
  id: string;              // 'FAR'
  name: string;            // 'Financial Accounting and Reporting'
  topics: string[];        // high-level topics for content generation
}

/** Metadata used by the content engine to generate briefs */
export const EXAM_CONTENT_META: Record<CourseId, ExamContentMeta> = {
  cpa: {
    courseId: 'cpa',
    exam: 'CPA',
    examFull: 'Certified Public Accountant (CPA)',
    course: 'cpa',
    price: '$19',
    annualPrice: '$99',
    questionCount: COURSE_DISPLAY_STATS.cpa.questions,
    sections: [
      { id: 'FAR', name: 'Financial Accounting and Reporting', topics: ['Governmental Accounting', 'NFP Accounting', 'Financial Statements', 'Revenue Recognition', 'Leases', 'Bonds', 'Inventory', 'Fixed Assets', 'Equity', 'Business Combinations'] },
      { id: 'AUD', name: 'Auditing and Attestation', topics: ['Audit Planning', 'Internal Controls', 'Audit Evidence', 'Audit Reports', 'Ethics', 'Sampling', 'Review Engagements', 'SSARS', 'SOC Reports'] },
      { id: 'REG', name: 'Taxation and Regulation', topics: ['Individual Tax', 'Corporate Tax', 'Partnership Tax', 'Property Transactions', 'Business Law', 'Ethics', 'S Corporations', 'Estate & Gift Tax'] },
      { id: 'BAR', name: 'Business Analysis and Reporting', topics: ['Financial Statement Analysis', 'Variance Analysis', 'Prospective Financial Statements', 'IFRS', 'State & Local Government'] },
      { id: 'ISC', name: 'Information Systems and Controls', topics: ['IT Governance', 'Cybersecurity', 'Data Analytics', 'System Development', 'IT Audit', 'SOC Engagements'] },
      { id: 'TCP', name: 'Tax Compliance and Planning', topics: ['Tax Planning Strategies', 'Entity Selection', 'Multi-jurisdictional Tax', 'Tax Research', 'Wealth Transfer'] },
    ],
  },
  ea: {
    courseId: 'ea',
    exam: 'EA',
    examFull: 'Enrolled Agent (EA)',
    course: 'ea',
    price: '$14',
    annualPrice: '$69',
    questionCount: COURSE_DISPLAY_STATS.ea.questions,
    sections: [
      { id: 'SEE1', name: 'Individual Taxation', topics: ['Filing Status', 'Income', 'Deductions', 'Credits', 'AMT', 'Capital Gains', 'Retirement Plans', 'Education Credits'] },
      { id: 'SEE2', name: 'Business Taxation', topics: ['Business Income', 'Business Deductions', 'Corporations', 'Partnerships', 'S Corporations', 'Depreciation', 'Payroll Tax'] },
      { id: 'SEE3', name: 'Representation, Practices & Procedures', topics: ['Circular 230', 'IRS Procedures', 'Penalties', 'Appeals', 'Collections', 'Taxpayer Rights', 'Ethics'] },
    ],
  },
  cma: {
    courseId: 'cma',
    exam: 'CMA',
    examFull: 'Certified Management Accountant (CMA)',
    course: 'cma',
    price: '$14',
    annualPrice: '$69',
    questionCount: COURSE_DISPLAY_STATS.cma.questions,
    sections: [
      { id: 'CMA1', name: 'Financial Planning, Performance & Analytics', topics: ['Budgeting', 'Forecasting', 'Cost Management', 'Internal Controls', 'Technology', 'Performance Measures'] },
      { id: 'CMA2', name: 'Strategic Financial Management', topics: ['Financial Statement Analysis', 'Corporate Finance', 'Decision Analysis', 'Risk Management', 'Investment Decisions', 'Ethics'] },
    ],
  },
  cia: {
    courseId: 'cia',
    exam: 'CIA',
    examFull: 'Certified Internal Auditor (CIA)',
    course: 'cia',
    price: '$14',
    annualPrice: '$69',
    questionCount: COURSE_DISPLAY_STATS.cia.questions,
    sections: [
      { id: 'CIA1', name: 'Essentials of Internal Auditing', topics: ['IIA Standards', 'Independence', 'Audit Planning', 'Engagement Procedures', 'Governance', 'Risk Management'] },
      { id: 'CIA2', name: 'Practice of Internal Auditing', topics: ['Engagement Planning', 'Data Analytics', 'Audit Testing', 'Communicating Results', 'Monitoring', 'Quality Assurance'] },
      { id: 'CIA3', name: 'Business Knowledge for Internal Auditing', topics: ['Business Acumen', 'Information Security', 'IT Operations', 'Financial Accounting', 'Managerial Accounting', 'Regulatory'] },
    ],
  },
  cfp: {
    courseId: 'cfp',
    exam: 'CFP',
    examFull: 'Certified Financial Planner (CFP)',
    course: 'cfp',
    price: '$14',
    annualPrice: '$69',
    questionCount: COURSE_DISPLAY_STATS.cfp.questions,
    sections: [
      { id: 'CFP1', name: 'Professional Conduct & Regulation', topics: ['CFP Board Standards', 'Fiduciary Duty', 'Practice Standards'] },
      { id: 'CFP2', name: 'General Principles of Financial Planning', topics: ['Financial Planning Process', 'Time Value of Money', 'Economic Concepts'] },
      { id: 'CFP3', name: 'Education Planning', topics: ['529 Plans', 'Coverdell ESAs', 'Financial Aid', 'Education Tax Benefits'] },
      { id: 'CFP4', name: 'Risk Management & Insurance', topics: ['Life Insurance', 'Health Insurance', 'Disability', 'Long-Term Care', 'Property & Casualty'] },
      { id: 'CFP5', name: 'Investment Planning', topics: ['Asset Allocation', 'Modern Portfolio Theory', 'Securities Analysis', 'Alternative Investments'] },
      { id: 'CFP6', name: 'Tax Planning', topics: ['Income Tax', 'Tax-Advantaged Accounts', 'Tax Planning Strategies', 'AMT'] },
      { id: 'CFP7', name: 'Retirement Savings & Income Planning', topics: ['401(k)', 'IRA', 'Pension Plans', 'Social Security', 'Distribution Planning'] },
      { id: 'CFP8', name: 'Estate Planning', topics: ['Wills', 'Trusts', 'Gift Tax', 'Estate Tax', 'Charitable Planning'] },
    ],
  },
  cisa: {
    courseId: 'cisa',
    exam: 'CISA',
    examFull: 'Certified Information Systems Auditor (CISA)',
    course: 'cisa',
    price: '$14',
    annualPrice: '$69',
    questionCount: COURSE_DISPLAY_STATS.cisa.questions,
    sections: [
      { id: 'CISA1', name: 'Information Systems Auditing Process', topics: ['IS Audit Standards', 'Risk-Based Audit Planning', 'Audit Execution', 'Control Self-Assessment'] },
      { id: 'CISA2', name: 'Governance and Management of IT', topics: ['IT Governance', 'IT Strategy', 'IT Resource Management', 'IT Risk Management', 'Compliance'] },
      { id: 'CISA3', name: 'IS Acquisition, Development & Implementation', topics: ['SDLC', 'Project Management', 'Business Case', 'Testing', 'Implementation'] },
      { id: 'CISA4', name: 'IS Operations and Business Resilience', topics: ['IT Operations', 'BCP', 'DRP', 'Incident Management', 'SLAs', 'Database Management'] },
      { id: 'CISA5', name: 'Protection of Information Assets', topics: ['InfoSec Frameworks', 'Access Controls', 'Network Security', 'Encryption', 'Vulnerability Management'] },
    ],
  },
};

const AUTHORITATIVE_SOURCE_LINKS: Record<CourseId, string[]> = {
  cpa: [
    'AICPA CPA Exam: https://www.aicpa-cima.com/resources/landing/uniform-cpa-examination',
    'NASBA CPA Candidate Resources: https://nasba.org/exams/cpaexam/',
    'BLS Accountants and Auditors: https://www.bls.gov/ooh/business-and-financial/accountants-and-auditors.htm',
  ],
  ea: [
    'IRS Enrolled Agent Information: https://www.irs.gov/tax-professionals/enrolled-agents',
    'IRS SEE Exam Overview: https://www.prometric.com/test-takers/search/irs',
    'BLS Tax Examiners and Collectors: https://www.bls.gov/ooh/business-and-financial/tax-examiners-and-collectors-and-revenue-agents.htm',
  ],
  cma: [
    'IMA CMA Certification: https://www.imanet.org/cma-certification',
    'BLS Financial Managers: https://www.bls.gov/ooh/management/financial-managers.htm',
  ],
  cia: [
    'IIA CIA Certification: https://www.theiia.org/en/certifications/cia/',
    'BLS Auditors and Compliance Roles: https://www.bls.gov/ooh/business-and-financial/accountants-and-auditors.htm',
  ],
  cisa: [
    'ISACA CISA Certification: https://www.isaca.org/credentialing/cisa',
    'BLS Information Security Analysts: https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm',
  ],
  cfp: [
    'CFP Board Certification: https://www.cfp.net/get-certified/certification-process',
    'BLS Personal Financial Advisors: https://www.bls.gov/ooh/business-and-financial/personal-financial-advisors.htm',
  ],
};

const CPA_COMPLEX_TOPIC_SERIES: Record<string, string[]> = {
  FAR: [
    'Consolidations',
    'Statement of Cash Flows',
    'Leases',
    'Deferred Taxes',
    'Bonds and Amortization',
    'Pensions',
    'Revenue Recognition',
    'Diluted EPS',
    'Governmental Funds',
    'Not-for-Profit Net Assets',
  ],
  AUD: [
    'Audit Sampling',
    'Transaction Cycles',
    'Subsequent Events',
    'Group Audits',
    'SOC Reports',
    'Independence Threats',
    'Internal Control Deficiencies',
    'Audit Opinions',
    'Analytical Procedures',
    'SSARS vs SSAE',
  ],
  REG: [
    'Partnership Basis',
    'S Corporation Basis',
    'Book to Tax Differences',
    'Property Transactions',
    'Agency and Suretyship',
    'Circular 230',
    'Corporate Liquidations',
    'Estate and Gift Tax',
    'Tax Research',
    'Contract Remedies',
  ],
  BAR: [
    'Variance Analysis',
    'Transfer Pricing',
    'Activity Based Costing',
    'Capital Budgeting',
    'Residual Income and EVA',
    'Forecasting and Regression',
    'Cost Behavior',
    'Business Valuation',
    'Government-Wide Reconciliations',
    'Hedging and Risk Management',
  ],
  ISC: [
    'Zero Trust',
    'SOC 1 vs SOC 2',
    'Encryption and Key Management',
    'Identity and Access Management',
    'RTO vs RPO',
    'Change Management Controls',
    'Data Governance',
    'Cybersecurity Frameworks',
    'Incident Response',
    'AI and Automation Controls',
  ],
  TCP: [
    'Advanced Entity Basis',
    'Property Distributions',
    'Passive Activity Losses',
    'Multijurisdictional Taxation',
    'Stock vs Asset Sales',
    'Compensation Planning',
    'Retirement Plan Strategies',
    'Estate and Gift Planning',
    'Tax Research Hierarchy',
    'International Tax and Withholding',
  ],
};

const CPA_WOW_VALUE_FORMATS: Array<{
  slugSuffix: string;
  titlePattern: string;
  hook: string;
  wowElement: string;
  learnerPromise: string;
}> = [
  {
    slugSuffix: 'trap-guide',
    titlePattern: 'CPA {section} {topic}: Trap Guide for Easy Points ({year})',
    hook: 'Show the exact trap pattern that keeps costing candidates points.',
    wowElement: 'a trap-vs-truth table',
    learnerPromise: 'teach the clue words that instantly change the answer choice',
  },
  {
    slugSuffix: 'decision-tree',
    titlePattern: 'CPA {section} {topic}: Decision Tree for Faster Answers ({year})',
    hook: 'Turn a confusing topic into a faster yes/no path under time pressure.',
    wowElement: 'a simple decision tree',
    learnerPromise: 'reduce overthinking and narrow the answer quickly',
  },
  {
    slugSuffix: 'mini-case',
    titlePattern: 'CPA {section} {topic}: Mini-Case Walkthrough ({year})',
    hook: 'Make the topic feel real with an exam-style scenario solved step by step.',
    wowElement: 'a worked mini-case',
    learnerPromise: 'connect the rule to a concrete scenario they can remember',
  },
  {
    slugSuffix: 'memory-hacks',
    titlePattern: 'CPA {section} {topic}: Memory Hacks That Actually Stick ({year})',
    hook: 'Give readers a faster recall system than brute-force rereading.',
    wowElement: 'a memory hook and pattern summary',
    learnerPromise: 'make recall easier on exam day',
  },
  {
    slugSuffix: '30-minute-rescue-plan',
    titlePattern: 'CPA {section} {topic}: 30-Minute Rescue Plan ({year})',
    hook: 'Help the reader recover fast when a topic still feels shaky late in prep.',
    wowElement: 'a 30-minute rescue checklist',
    learnerPromise: 'show exactly what to review when time is short',
  },
  {
    slugSuffix: 'pattern-recognition',
    titlePattern: 'CPA {section} {topic}: Pattern Recognition Guide ({year})',
    hook: 'Teach what high scorers notice immediately in this topic.',
    wowElement: 'a pattern-recognition cheat table',
    learnerPromise: 'train the reader to spot the tested pattern quickly',
  },
  {
    slugSuffix: 'high-scorer-playbook',
    titlePattern: 'CPA {section} {topic}: High-Scorer Playbook ({year})',
    hook: 'Frame the topic the way strong candidates actually attack it.',
    wowElement: 'a high-scorer playbook',
    learnerPromise: 'move the reader from memorizing to strategic thinking',
  },
  {
    slugSuffix: 'from-confusing-to-clear',
    titlePattern: 'CPA {section} {topic}: From Confusing to Clear ({year})',
    hook: 'Take a topic people hate and make it feel teachable and manageable.',
    wowElement: 'an aha-moment explanation',
    learnerPromise: 'give the reader the feeling of “finally, I get it”',
  },
  {
    slugSuffix: 'quick-review-map',
    titlePattern: 'CPA {section} {topic}: Quick Review Map ({year})',
    hook: 'Package the topic into a last-week review asset people will bookmark.',
    wowElement: 'a quick review map',
    learnerPromise: 'help the reader revise the topic in minutes, not hours',
  },
  {
    slugSuffix: 'mistake-autopsy',
    titlePattern: 'CPA {section} {topic}: Mistake Autopsy ({year})',
    hook: 'Break down why smart candidates still miss this topic under pressure.',
    wowElement: 'a mistake autopsy',
    learnerPromise: 'turn common misses into repeatable wins',
  },
];

// ============================================================================
// Content Brief Generator
// ============================================================================

const CURRENT_YEAR = new Date().getFullYear().toString();

const HIGH_ROI_TOPIC_LIMITS: Record<CourseId, number> = {
  cpa: 10,
  ea: 8,
  cma: 6,
  cia: 8,
  cfp: 10,
  cisa: 8,
};

const HIGH_ROI_TOPIC_FORMATS = [
  {
    slugSuffix: 'cheat-sheet',
    title: '{exam} {section} {topic} Cheat Sheet ({year})',
    keywordModifier: 'cheat sheet',
  },
  {
    slugSuffix: 'mistakes-guide',
    title: '{exam} {section} {topic}: Common Mistakes and How to Avoid Them ({year})',
    keywordModifier: 'common mistakes',
  },
  {
    slugSuffix: 'study-guide',
    title: '{exam} {section} {topic} Study Guide for Busy Candidates ({year})',
    keywordModifier: 'study guide',
  },
  {
    slugSuffix: 'practice-questions',
    title: '{exam} {section} {topic} Practice Questions Explained ({year})',
    keywordModifier: 'practice questions',
  },
] as const;

/**
 * Interpolate template variables in a string
 */
function interpolate(template: string, vars: Record<string, string>): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  return result;
}

/**
 * Generate a URL-safe slug from a string
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generate all content briefs for a single exam from templates.
 * Returns briefs for: per-section guides, pass rates, salary, etc.
 */
export function generateBriefsForExam(courseId: CourseId): ContentBrief[] {
  const meta = EXAM_CONTENT_META[courseId];
  if (!meta) return [];

  const briefs: ContentBrief[] = [];
  let briefCounter = 0;

  for (const template of CONTENT_TEMPLATES) {
    // Check if template applies to this course
    if (template.applicableCourses !== 'all' && !template.applicableCourses.includes(courseId)) {
      continue;
    }

    if (template.perSection) {
      // Generate one brief per section
      for (const section of meta.sections) {
        briefCounter++;
        const vars: Record<string, string> = {
          exam: meta.exam,
          examFull: meta.examFull,
          course: meta.course,
          section: section.id,
          sectionName: section.name,
          topic: section.topics[0] || section.name,
          year: CURRENT_YEAR,
          price: meta.price,
          questions: meta.questionCount,
        };

        const title = interpolate(template.titleTemplate, vars);
        const slug = interpolate(template.slugTemplate, vars).toLowerCase();

        briefs.push({
          id: `${courseId}-${template.id}-${section.id.toLowerCase()}-${CURRENT_YEAR}`,
          title,
          slug,
          courseId,
          section: section.id,
          contentType: template.contentType,
          targetKeywords: generateKeywordsForBrief(template.contentType, meta, section),
          primaryKeyword: generatePrimaryKeyword(template.contentType, meta, section),
          searchIntent: getIntentForContentType(template.contentType),
          estimatedVolume: 0, // filled by keyword research
          competitorUrls: [],
          outline: template.outlineTemplate.map(s => ({
            ...s,
            heading: interpolate(s.heading, vars),
            keyPoints: s.keyPoints.map(kp => interpolate(kp, vars)),
          })),
          wordCountTarget: template.wordCountTarget,
          internalLinks: generateInternalLinks(courseId, section.id),
          ctaType: template.ctaType,
          ctaUrl: `/${meta.course}${template.ctaType === 'pricing' ? '#pricing' : ''}`,
          status: 'brief' as ContentStatus,
          priority: template.priority,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    } else {
      // Generate one brief for the whole exam
      briefCounter++;
      const vars: Record<string, string> = {
        exam: meta.exam,
        examFull: meta.examFull,
        course: meta.course,
        year: CURRENT_YEAR,
        price: meta.price,
        questions: meta.questionCount,
        count: '15', // for exam tips
      };

      const title = interpolate(template.titleTemplate, vars);
      const slug = interpolate(template.slugTemplate, vars).toLowerCase();

      briefs.push({
        id: `${courseId}-${template.id}-${CURRENT_YEAR}`,
        title,
        slug,
        courseId,
        contentType: template.contentType,
        targetKeywords: generateKeywordsForBrief(template.contentType, meta),
        primaryKeyword: generatePrimaryKeyword(template.contentType, meta),
        searchIntent: getIntentForContentType(template.contentType),
        estimatedVolume: 0,
        competitorUrls: [],
        outline: template.outlineTemplate.map(s => ({
          ...s,
          heading: interpolate(s.heading, vars),
          keyPoints: s.keyPoints.map(kp => interpolate(kp, vars)),
        })),
        wordCountTarget: template.wordCountTarget,
        internalLinks: generateInternalLinks(courseId),
        ctaType: template.ctaType,
        ctaUrl: `/${meta.course}${template.ctaType === 'pricing' ? '#pricing' : ''}`,
        status: 'brief' as ContentStatus,
        priority: template.priority,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  return briefs;
}

/**
 * Generate all content briefs for all exams.
 * This is the full content matrix — typically 400-600+ briefs.
 */
export function generateFullContentMatrix(): ContentBrief[] {
  const allCourses: CourseId[] = ['cpa', 'ea', 'cma', 'cia', 'cfp', 'cisa'];
  const allBriefs: ContentBrief[] = [];

  for (const courseId of allCourses) {
    allBriefs.push(...generateBriefsForExam(courseId));
  }

  // Add cross-exam comparison briefs
  allBriefs.push(...generateComparisonBriefs());

  // Add 50 high-ROI topic briefs across all exams
  allBriefs.push(...generateHighRoiTopicBriefs());

  // Competitor comparison + "best review course" articles — HIGH CONVERSION / high AEO intent
  allBriefs.push(...generateCompetitorBattleBriefs());

  // Add 60 CPA hard-topic deep dives (10 per section across all 6 sections)
  allBriefs.push(...generateCPAComplexTopicBriefs());

  // Add 60 more CPA wow-factor conversion articles with trap guides, decision trees, and mini-cases
  allBriefs.push(...generateCPAWowFactorBriefs());

  // Sort by priority
  allBriefs.sort((a, b) => a.priority - b.priority);

  return allBriefs;
}

// ============================================================================
// Competitor Battle Briefs — target "best review course" + "vs Becker/Gleim" searches
// These are the highest-conversion AEO targets in the exam-prep space.
// Becker has huge domain authority but their content is stale; we beat them with
// answer-first, direct, opinionated content that AI engines love to cite.
// ============================================================================

const COMPETITORS: Record<string, string[]> = {
  cpa:  ['Becker', 'Gleim', 'Roger CPA Review', 'Wiley CPAexcel', 'Surgent CPA'],
  ea:   ['Gleim EA', 'Fast Forward Academy', 'Surgent EA'],
  cma:  ['Gleim CMA', 'Wiley CMA', 'IMA Learning'],
  cia:  ['Gleim CIA', 'IIA Learning Solutions'],
  cfp:  ['Kaplan Financial', 'the American College', 'Dalton Education'],
  cisa: ['ISACA QAE', 'Steer CPA', 'IT Governance'],
};

const COMPETITOR_ANGLES = [
  { type: 'best-course', titleTemplate: 'Best {exam} Review Course in {year}: Honest Rankings', slug: 'best-{course}-review-course-{year}', volume: 5400 },
  { type: 'voraprep-vs', titleTemplate: 'VoraPrep vs Becker {exam}: Which One Actually Gets You to {score}?', slug: 'voraprep-vs-becker-{course}-review-{year}', volume: 1200 },
  { type: 'becker-vs-gleim', titleTemplate: 'Becker vs Gleim {exam}: Side-by-Side Comparison ({year})', slug: 'becker-vs-gleim-{exam-lower}-review-{year}', volume: 3200 },
  { type: 'affordable', titleTemplate: 'Cheapest {exam} Review Course That Still Gets You to {score} ({year})', slug: 'cheapest-{course}-review-course-{year}', volume: 2100 },
  { type: 'switch', titleTemplate: 'I Switched from Becker to VoraPrep: Here\'s What Happened', slug: 'switched-from-becker-to-voraprep-{course}-{year}', volume: 600 },
];

function generateCompetitorBattleBriefs(): ContentBrief[] {
  const briefs: ContentBrief[] = [];
  const allCourses: CourseId[] = ['cpa', 'ea', 'cma', 'cia', 'cfp', 'cisa'];

  for (const courseId of allCourses) {
    const meta = EXAM_CONTENT_META[courseId];
    const competitors = COMPETITORS[courseId] || ['Becker'];
    const passScore = courseId === 'cpa' ? '75' : courseId === 'cisa' ? '450' : '75';

    for (const angle of COMPETITOR_ANGLES) {
      const title = angle.titleTemplate
        .replace('{exam}', meta.exam)
        .replace('{course}', meta.course)
        .replace('{year}', String(CURRENT_YEAR))
        .replace('{score}', `${passScore}+`);

      const slug = angle.slug
        .replace('{exam}', meta.exam)
        .replace('{exam-lower}', meta.exam.toLowerCase())
        .replace('{course}', meta.course)
        .replace('{year}', String(CURRENT_YEAR));

      briefs.push({
        id: `competitor-${courseId}-${angle.type}-${CURRENT_YEAR}`,
        title,
        slug,
        courseId,
        contentType: 'review-comparison' as ContentType,
        targetKeywords: [
          `best ${meta.exam.toLowerCase()} review course`,
          `${meta.exam.toLowerCase()} review course comparison`,
          `voraprep vs becker ${meta.course}`,
          `becker vs gleim ${meta.exam.toLowerCase()}`,
          `cheapest ${meta.exam.toLowerCase()} review course`,
          `${meta.exam.toLowerCase()} review course ${CURRENT_YEAR}`,
        ],
        primaryKeyword: `best ${meta.exam.toLowerCase()} review course`,
        searchIntent: 'commercial' as SearchIntent,
        estimatedVolume: angle.volume,
        competitorUrls: [
          `https://www.becker.com/cpa-review`,
          `https://www.gleim.com/cpa-review`,
        ],
        outline: [
          {
            heading: `The short answer: which ${meta.exam} review course is best in ${CURRENT_YEAR}?`,
            level: 2 as const,
            keyPoints: [
              `Direct answer paragraph naming the best option for each candidate type`,
              `Key comparison table: VoraPrep vs Becker vs Gleim (price, questions, pass rates, AI features)`,
              `Who each course is best for (one sentence each)`,
            ],
            wordCount: 300,
          },
          {
            heading: `${meta.exam} Review Course Comparison: Full Breakdown`,
            level: 2 as const,
            keyPoints: [
              `Price comparison (VoraPrep: $19/mo vs Becker: $1,500+ vs Gleim: $1,000+)`,
              `Question bank size and quality`,
              `AI / adaptive features`,
              `Pass guarantee and support`,
            ],
            wordCount: 500,
          },
          {
            heading: `Why VoraPrep Beats ${competitors[0]} on Price (Without Sacrificing Quality)`,
            level: 2 as const,
            keyPoints: [
              `${meta.questionCount} practice questions at $19/mo`,
              `AI tutor (Vory) included — competitors charge $300+ for similar`,
              `Adaptive learning engine included`,
              `No hidden fees, no 18-month expiration`,
            ],
            wordCount: 350,
          },
          {
            heading: `What ${meta.exam} Candidates Complain About With Becker and Gleim`,
            level: 2 as const,
            keyPoints: [
              `Price shock (upfront $1,500+ for Becker)`,
              `Content that feels like a textbook (passive reading)`,
              `No real AI explanations — just static answer keys`,
              `Real candidate frustrations from Reddit/forums`,
            ],
            wordCount: 350,
          },
          {
            heading: `Our Verdict: Best ${meta.exam} Review Course by Candidate Type`,
            level: 2 as const,
            keyPoints: [
              `Best for budget-conscious candidates: VoraPrep`,
              `Best for candidates who want brand recognition: Becker (with caveats)`,
              `Best for question-volume drilling: VoraPrep or Gleim`,
              `Clear CTA to try VoraPrep free`,
            ],
            wordCount: 300,
          },
        ],
        wordCountTarget: 1800,
        internalLinks: [`/${meta.course}`, `/${meta.course}/practice`, `/pricing`, `/blog`],
        ctaType: 'free-trial' as const,
        ctaUrl: `/register?course=${courseId}`,
        status: 'brief' as ContentStatus,
        priority: 1, // highest priority — highest conversion potential
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  return briefs;
}

function generateHighRoiTopicBriefs(): ContentBrief[] {
  const briefs: ContentBrief[] = [];

  for (const [courseId, limit] of Object.entries(HIGH_ROI_TOPIC_LIMITS) as Array<[CourseId, number]>) {
    const meta = EXAM_CONTENT_META[courseId];
    const selectedTopics = selectHighRoiTopics(meta, limit);

    selectedTopics.forEach(({ section, topic }, index) => {
      const format = HIGH_ROI_TOPIC_FORMATS[index % HIGH_ROI_TOPIC_FORMATS.length];
      const topicSlug = slugify(topic);
      const topicKeyword = topic.toLowerCase();
      const title = interpolate(format.title, {
        exam: meta.exam,
        section: section.id,
        topic,
        year: CURRENT_YEAR,
      });

      briefs.push({
        id: `${courseId}-high-roi-${section.id.toLowerCase()}-${topicSlug}-${format.slugSuffix}-${CURRENT_YEAR}`,
        title,
        slug: `${courseId}-${section.id.toLowerCase()}-${topicSlug}-${format.slugSuffix}-${CURRENT_YEAR}`,
        courseId,
        section: section.id,
        contentType: 'topic-explainer' as ContentType,
        targetKeywords: [
          `${meta.exam.toLowerCase()} ${section.id.toLowerCase()} ${topicKeyword} ${format.keywordModifier}`,
          `${topicKeyword} ${meta.exam.toLowerCase()}`,
          `${meta.exam.toLowerCase()} ${topicKeyword}`,
          `how to study ${topicKeyword} for ${meta.exam.toLowerCase()}`,
          `${topicKeyword} ${format.keywordModifier} ${meta.exam.toLowerCase()}`,
        ],
        primaryKeyword: `${meta.exam.toLowerCase()} ${section.id.toLowerCase()} ${topicKeyword} ${format.keywordModifier}`,
        searchIntent: 'informational' as SearchIntent,
        estimatedVolume: 260 + (limit - index) * 12,
        competitorUrls: AUTHORITATIVE_SOURCE_LINKS[courseId],
        outline: [
          {
            heading: `${topic}: What You Actually Need to Know for ${section.id}`,
            level: 2,
            keyPoints: [
              `Explain why ${topicKeyword} matters on ${meta.exam} ${section.id}`,
              'Call out where candidates usually overcomplicate it',
              'Set up the one mental model that makes the topic easier',
            ],
            wordCount: 260,
          },
          {
            heading: 'The Core Rule in Plain English',
            level: 2,
            keyPoints: [
              'Translate technical wording into practical language',
              'Show the key rule, threshold, or framework candidates must remember',
              'Differentiate look-alike concepts that create wrong answers',
            ],
            wordCount: 360,
          },
          {
            heading: `Worked Example: ${topic} Under Exam Conditions`,
            level: 2,
            keyPoints: [
              'Use an exam-style example with a fully explained solution path',
              'Show where time pressure leads to mistakes',
              'Highlight the fastest reliable way to reach the answer',
            ],
            wordCount: 520,
          },
          {
            heading: 'Common Mistakes, Traps, and Memory Hooks',
            level: 2,
            keyPoints: [
              'List the most common candidate errors',
              'Add one mnemonic, checklist, or memory hook',
              'Explain how to recognize trap answer choices quickly',
            ],
            wordCount: 340,
          },
          {
            heading: `How to Lock In ${topic} This Week`,
            level: 2,
            keyPoints: [
              'Recommend a 7-day reinforcement routine',
              'Point readers to related VoraPrep lessons, flashcards, or questions',
              'End with a strong free-trial CTA',
            ],
            wordCount: 260,
          },
        ],
        wordCountTarget: 2100,
        internalLinks: generateInternalLinks(courseId, section.id),
        ctaType: 'free-trial' as const,
        ctaUrl: `/${meta.course}`,
        status: 'brief' as ContentStatus,
        priority: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
  }

  return briefs;
}

function selectHighRoiTopics(meta: ExamContentMeta, limit: number): Array<{ section: ExamSectionMeta; topic: string }> {
  const selected: Array<{ section: ExamSectionMeta; topic: string }> = [];
  let topicIndex = 0;

  while (selected.length < limit) {
    let addedThisRound = false;

    for (const section of meta.sections) {
      const topic = section.topics[topicIndex];
      if (!topic) {
        continue;
      }

      selected.push({ section, topic });
      addedThisRound = true;

      if (selected.length >= limit) {
        break;
      }
    }

    if (!addedThisRound) {
      break;
    }

    topicIndex += 1;
  }

  return selected;
}

function generateCPAComplexTopicBriefs(): ContentBrief[] {
  const meta = EXAM_CONTENT_META.cpa;

  return meta.sections.flatMap(section => {
    const topics = CPA_COMPLEX_TOPIC_SERIES[section.id] || [];

    return topics.map((topic, index) => {
      const topicSlug = slugify(topic);
      const normalizedTopic = topic.toLowerCase();

      return {
        id: `cpa-hard-topic-${section.id.toLowerCase()}-${topicSlug}-${CURRENT_YEAR}`,
        title: `CPA ${section.id} Deep Dive: ${topic} Made Practical (${CURRENT_YEAR})`,
        slug: `cpa-${section.id.toLowerCase()}-${topicSlug}-deep-dive-${CURRENT_YEAR}`,
        courseId: 'cpa' as CourseId,
        section: section.id,
        contentType: 'topic-explainer' as ContentType,
        targetKeywords: [
          `cpa ${section.id.toLowerCase()} ${normalizedTopic}`,
          `${topic} cpa`,
          `${section.id.toLowerCase()} ${normalizedTopic} examples`,
          `how to study ${normalizedTopic} for cpa`,
          `cpa ${section.id.toLowerCase()} hard topics`,
        ],
        primaryKeyword: `cpa ${section.id.toLowerCase()} ${normalizedTopic}`,
        searchIntent: 'informational' as SearchIntent,
        estimatedVolume: 250 + (10 - index) * 20,
        competitorUrls: [],
        outline: [
          {
            heading: `${topic}: Why It Feels So Hard`,
            level: 2,
            keyPoints: [
              `Why ${normalizedTopic} trips candidates up`,
              `Where ${normalizedTopic} appears in ${section.id} MCQs and simulations`,
              'The single big idea to anchor before memorizing details',
            ],
            wordCount: 260,
          },
          {
            heading: 'The Core Idea in Plain English',
            level: 2,
            keyPoints: [
              `Teach ${normalizedTopic} with an analogy or mental model`,
              'Translate the technical language into everyday terms',
              'Call out the vocabulary candidates confuse most often',
            ],
            wordCount: 360,
          },
          {
            heading: `A Step-by-Step Framework for ${topic}`,
            level: 2,
            keyPoints: [
              'Use a checklist or decision tree',
              'Show what to do first, second, and third',
              'Highlight shortcuts that save time without sacrificing accuracy',
            ],
            wordCount: 420,
          },
          {
            heading: `Worked Example: Solving a ${topic} Problem`,
            level: 2,
            keyPoints: [
              'Walk through a realistic exam-style scenario from start to finish',
              'Explain the reasoning behind each move',
              'Show how the final answer is reached without skipping steps',
            ],
            wordCount: 520,
          },
          {
            heading: 'Common Traps and Exam-Day Mistakes',
            level: 2,
            keyPoints: [
              'Most common distractors and half-right answers',
              'What students forget under time pressure',
              'How to recover if you get stuck mid-question',
            ],
            wordCount: 340,
          },
          {
            heading: 'Quick Self-Check and 7-Day Reinforcement Plan',
            level: 2,
            keyPoints: [
              'Include 3-5 quick self-check prompts',
              'Recommend a short weekly review routine',
              'Point readers to VoraPrep practice questions, study guides, and cheat sheets',
            ],
            wordCount: 320,
          },
        ],
        wordCountTarget: 2400,
        internalLinks: generateInternalLinks('cpa', section.id),
        ctaType: 'free-trial' as const,
        ctaUrl: '/cpa',
        status: 'brief' as ContentStatus,
        priority: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
  });
}

function generateCPAWowFactorBriefs(): ContentBrief[] {
  const meta = EXAM_CONTENT_META.cpa;

  return meta.sections.flatMap((section, sectionIndex) => {
    const topics = CPA_COMPLEX_TOPIC_SERIES[section.id] || [];

    return topics.map((topic, topicIndex) => {
      const topicSlug = slugify(topic);
      const normalizedTopic = topic.toLowerCase();
      const format = CPA_WOW_VALUE_FORMATS[(topicIndex + sectionIndex) % CPA_WOW_VALUE_FORMATS.length];
      const formatKeyword = format.slugSuffix.replace(/-/g, ' ');

      return {
        id: `cpa-wow-${section.id.toLowerCase()}-${topicSlug}-${format.slugSuffix}-${CURRENT_YEAR}`,
        title: interpolate(format.titlePattern, {
          section: section.id,
          topic,
          year: CURRENT_YEAR,
        }),
        slug: `cpa-${section.id.toLowerCase()}-${topicSlug}-${format.slugSuffix}-${CURRENT_YEAR}`,
        courseId: 'cpa' as CourseId,
        section: section.id,
        contentType: 'topic-explainer' as ContentType,
        targetKeywords: [
          `cpa ${section.id.toLowerCase()} ${normalizedTopic} ${formatKeyword}`,
          `${topic} ${formatKeyword} cpa`,
          `cpa ${section.id.toLowerCase()} ${normalizedTopic} tricks`,
          `how to avoid ${normalizedTopic} mistakes on cpa`,
          `cpa ${section.id.toLowerCase()} ${normalizedTopic} examples`,
        ],
        primaryKeyword: `cpa ${section.id.toLowerCase()} ${normalizedTopic} ${formatKeyword}`,
        searchIntent: 'informational' as SearchIntent,
        estimatedVolume: 300 + (10 - topicIndex) * 15,
        competitorUrls: [],
        outline: [
          {
            heading: `${topic}: Why This Topic Costs Smart Candidates Points`,
            level: 2,
            keyPoints: [
              format.hook,
              `Explain why ${normalizedTopic} feels harder than it should in ${section.id}`,
              'Name the one misunderstanding that causes the most missed questions',
            ],
            wordCount: 250,
          },
          {
            heading: 'The Fastest Way to Think About It',
            level: 2,
            keyPoints: [
              'Teach the concept with a clear analogy and plain-English explanation',
              `Include ${format.wowElement} for instant clarity`,
              `Specifically ${format.learnerPromise}`,
            ],
            wordCount: 380,
          },
          {
            heading: `Decision Tree, Trap-vs-Truth, and What to Notice First`,
            level: 2,
            keyPoints: [
              'Give the reader a decision tree or if/then checklist',
              'Add a trap-vs-truth comparison box that separates similar answer choices',
              'Show the signal words that tell the reader which path to take',
            ],
            wordCount: 420,
          },
          {
            heading: `Worked Mini-Case: ${topic} Without the Confusion`,
            level: 2,
            keyPoints: [
              'Walk through a realistic mini-case from start to finish',
              'Include the intermediate thinking, not just the final answer',
              'Create a genuine aha moment so the reader feels the topic finally click',
            ],
            wordCount: 520,
          },
          {
            heading: 'Common Traps, Quick Self-Check, and Last-Week Review',
            level: 2,
            keyPoints: [
              'Show 3-5 common traps and why they look tempting',
              'Include a quick self-check list with short prompts',
              'Add a 15-30 minute review plan for the final week before the exam',
            ],
            wordCount: 360,
          },
          {
            heading: 'What to Practice Next in VoraPrep',
            level: 2,
            keyPoints: [
              'Point readers to related VoraPrep practice, study guides, and cheat sheets',
              'Explain how adaptive drilling helps them lock in the concept faster',
              'End with a concrete CTA to keep practicing inside VoraPrep',
            ],
            wordCount: 250,
          },
        ],
        wordCountTarget: 2300,
        internalLinks: generateInternalLinks('cpa', section.id),
        ctaType: 'free-trial' as const,
        ctaUrl: '/cpa',
        status: 'brief' as ContentStatus,
        priority: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
  });
}

/**
 * Generate comparison briefs between all exam pairs.
 */
function generateComparisonBriefs(): ContentBrief[] {
  const pairs: [CourseId, CourseId][] = [
    ['cpa', 'cma'], ['cpa', 'ea'], ['cpa', 'cia'],
    ['ea', 'cpa'], // EA perspective
    ['cma', 'cia'], ['cma', 'cfp'],
    ['cia', 'cisa'],
    ['cfp', 'cpa'],
    ['cisa', 'cia'],
  ];

  return pairs.map(([a, b]) => {
    const metaA = EXAM_CONTENT_META[a];
    const metaB = EXAM_CONTENT_META[b];
    return {
      id: `comparison-${a}-vs-${b}-${CURRENT_YEAR}`,
      title: `${metaA.exam} vs ${metaB.exam}: Which Certification Is Right for You in ${CURRENT_YEAR}?`,
      slug: `${metaA.course}-vs-${metaB.course}-certification-${CURRENT_YEAR}`,
      courseId: a,
      contentType: 'comparison' as ContentType,
      targetKeywords: [
        `${metaA.course} vs ${metaB.course}`,
        `${metaA.exam} vs ${metaB.exam}`,
        `${metaA.exam} or ${metaB.exam}`,
        `difference between ${metaA.exam} and ${metaB.exam}`,
      ],
      primaryKeyword: `${metaA.course} vs ${metaB.course}`,
      searchIntent: 'informational' as SearchIntent,
      estimatedVolume: 0,
      competitorUrls: [],
      outline: [],
      wordCountTarget: 2000,
      internalLinks: [`/${metaA.course}`, `/${metaB.course}`],
      ctaType: 'register' as const,
      ctaUrl: '/register',
      status: 'brief' as ContentStatus,
      priority: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
}

// ============================================================================
// Keyword Generation Helpers
// ============================================================================

function generatePrimaryKeyword(contentType: ContentType, meta: ExamContentMeta, section?: ExamSectionMeta): string {
  const exam = meta.exam.toLowerCase();
  const sec = section?.id.toLowerCase() || '';

  const keywordMap: Record<ContentType, string> = {
    'study-guide': section ? `${exam} ${sec} study guide` : `${exam} study guide`,
    'comparison': `${exam} certification`,
    'topic-explainer': section ? `${exam} ${sec} ${section.topics[0]?.toLowerCase() || ''}` : `${exam} topics`,
    'pass-rates': `${exam} pass rates`,
    'study-schedule': `${exam} study schedule`,
    'review-comparison': `best ${exam} review course`,
    'salary-guide': `${exam} salary`,
    'requirements': `${exam} requirements`,
    'practice-questions': section ? `${exam} ${sec} practice questions` : `${exam} practice questions`,
    'cheat-sheet': section ? `${exam} ${sec} cheat sheet` : `${exam} cheat sheet`,
    'exam-tips': `${exam} exam tips`,
    'career-guide': `what can you do with a ${exam}`,
    'news-update': `${exam} exam changes ${CURRENT_YEAR}`,
    'case-study': `how to pass ${exam} while working full time`,
  };

  return keywordMap[contentType] || `${exam} exam prep`;
}

function generateKeywordsForBrief(contentType: ContentType, meta: ExamContentMeta, section?: ExamSectionMeta): string[] {
  const primary = generatePrimaryKeyword(contentType, meta, section);
  const exam = meta.exam.toLowerCase();
  const sec = section?.id.toLowerCase() || '';

  const baseKeywords = [primary];

  // Add variations
  if (section) {
    baseKeywords.push(
      `${exam} ${sec}`,
      `${exam} ${sec} ${CURRENT_YEAR}`,
      `pass ${exam} ${sec}`,
      `${exam} ${section.name.toLowerCase()}`,
    );
  }

  // Add content-type-specific keywords
  const typeKeywords: Record<string, string[]> = {
    'study-guide': [`how to study for ${exam}`, `${exam} study tips`, `${exam} exam prep`],
    'topic-explainer': [`${exam} difficult topics`, `${exam} ${sec} explained`, `${exam} hard concepts`],
    'pass-rates': [`${exam} pass rate ${CURRENT_YEAR}`, `${exam} difficulty`, `${exam} failure rate`],
    'practice-questions': [`free ${exam} questions`, `${exam} mcq practice`, `${exam} sample questions`],
    'review-comparison': [`${exam} review courses compared`, `cheap ${exam} prep`, `${exam} prep cost`],
    'salary-guide': [`${exam} salary ${CURRENT_YEAR}`, `how much do ${exam}s make`, `${exam} earning potential`],
    'cheat-sheet': [`${exam} cheat sheet`, `${exam} formula sheet`, `${exam} mnemonics`],
    'career-guide': [`${exam} jobs`, `${exam} career path`, `is ${exam} worth it`],
    'news-update': [`${exam} exam changes`, `${exam} blueprint changes`, `${exam} new exam format`],
    'case-study': [`pass ${exam} while working full time`, `${exam} success story`, `${exam} study plan for busy professionals`],
  };

  if (typeKeywords[contentType]) {
    baseKeywords.push(...typeKeywords[contentType]);
  }

  return [...new Set(baseKeywords)]; // deduplicate
}

function getIntentForContentType(contentType: ContentType): SearchIntent {
  const intentMap: Record<ContentType, SearchIntent> = {
    'study-guide': 'informational',
    'comparison': 'commercial',
    'topic-explainer': 'informational',
    'pass-rates': 'informational',
    'study-schedule': 'informational',
    'review-comparison': 'commercial',
    'salary-guide': 'informational',
    'requirements': 'informational',
    'practice-questions': 'transactional',
    'cheat-sheet': 'informational',
    'exam-tips': 'informational',
    'career-guide': 'informational',
    'news-update': 'informational',
    'case-study': 'informational',
  };
  return intentMap[contentType] || 'informational';
}

function generateInternalLinks(courseId: CourseId, section?: string): string[] {
  const links = [
    `/${courseId}`,
    `/${courseId}/practice`,
    `/${courseId}/study`,
    '/blog',
    '/pricing',
    '/register',
    `/blog/${courseId}-study-schedule-${CURRENT_YEAR}`,
    `/blog/90-day-${courseId}-study-plan-${CURRENT_YEAR}`,
    `/blog/${courseId}-pass-rates-${CURRENT_YEAR}`,
    `/blog/best-${courseId}-review-courses-${CURRENT_YEAR}`,
    `/blog/${courseId}-exam-tips-${CURRENT_YEAR}`,
    `/blog/${courseId}-salary-guide-${CURRENT_YEAR}`,
    `/blog/what-can-you-do-with-a-${courseId}-${CURRENT_YEAR}`,
    `/blog/${courseId}-exam-changes-${CURRENT_YEAR}`,
    `/blog/pass-${courseId}-while-working-full-time-${CURRENT_YEAR}`,
  ];

  if (section) {
    links.push(
      `/blog/free-${courseId}-${section.toLowerCase()}-practice-questions-${CURRENT_YEAR}`,
      `/blog/${courseId}-${section.toLowerCase()}-cheat-sheet-${CURRENT_YEAR}`,
      `/blog/${courseId}-${section.toLowerCase()}-study-guide-${CURRENT_YEAR}`,
    );

    const meta = EXAM_CONTENT_META[courseId];
    for (const s of meta.sections) {
      if (s.id !== section) {
        links.push(`/blog/${courseId}-${s.id.toLowerCase()}-study-guide-${CURRENT_YEAR}`);
      }
    }
  }

  return [...new Set(links)];
}

// ============================================================================
// Content Generation Prompt Builder (for Gemini)
// ============================================================================

/**
 * Build a Gemini prompt to generate a full article from a content brief.
 * This produces SEO-optimized, exam-accurate content by leveraging:
 * - The brief outline and keywords
 * - VoraPrep's exam data (topics, questions, blueprint)
 * - SEO best practices
 */
export function buildContentGenerationPrompt(brief: ContentBrief): string {
  const meta = EXAM_CONTENT_META[brief.courseId];
  const authorityLinks = AUTHORITATIVE_SOURCE_LINKS[brief.courseId] || [];

  return `You are a professional content writer specializing in ${meta.examFull} exam preparation.
Write a comprehensive, SEO-optimized blog article for VoraPrep (voraprep.com), an AI-powered exam prep platform.

ARTICLE SPECIFICATIONS:
- Title: ${brief.title}
- Primary Keyword: "${brief.primaryKeyword}" (use in the title, first paragraph, and 2-3 subheadings naturally)
- Secondary Keywords: ${brief.targetKeywords.map(k => `"${k}"`).join(', ')}
- Word Count Target: ${brief.wordCountTarget} words
- Search Intent: ${brief.searchIntent}
- Content Type: ${brief.contentType}

OUTLINE (follow this structure):
${brief.outline.map(s => `${'#'.repeat(s.level)} ${s.heading}\n${s.keyPoints.map(kp => `  - ${kp}`).join('\n')}\n  Target: ~${s.wordCount} words`).join('\n\n')}

ANSWER-FIRST BLOCK (required — place this BEFORE any H2 headings):
A. Write a "Direct Answer" paragraph: 2-4 sentences that directly and completely answer the search query.
   - This must stand alone and satisfy the reader even if they read nothing else.
   - Use plain language, no jargon. Lead with the most important fact.
B. Immediately after the Direct Answer, add a "Key Facts" table (no heading required):
   | Fact | Detail |
   |------|--------|
   (3-5 rows with the most important numbers, rules, or thresholds on this topic)

SEO & VALUE REQUIREMENTS:
1. Use the primary keyword naturally in the first 100 words (within the Direct Answer block).
2. Include secondary keywords throughout (1-2 times each, naturally).
3. Use H2 and H3 headings with keywords where natural.
4. Write a meta title (60 chars max) and meta description (155 chars max).
5. INTERNAL LINKING — use ALL of these in the article body (2-3 in-line, rest in a "Related resources" section near the end):
   - Exam landing page: https://voraprep.com/${brief.courseId}
   - Practice questions page: https://voraprep.com/${brief.courseId}/practice
   - Blog index: https://voraprep.com/blog
   - Any of these section-specific internal links where genuinely relevant: ${brief.internalLinks.map(l => `https://voraprep.com${l}`).join(', ')}
   End the article with a "Related VoraPrep resources" section (bullet list with one-line descriptions for each link).
6. Add a short "Official resources and references" section with 2-4 bullet links to authoritative sources when relevant: ${authorityLinks.join(', ')}
7. Include a table, checklist, comparison box, or trap-vs-truth chart anywhere it helps the reader.
8. Do not invent statistics, fees, deadlines, or board rules. If something varies by state or changes yearly, say so and direct readers to the official source.
9. Add a clear CTA to VoraPrep at the end.
10. Teach like a fantastic coach, not a dry textbook: include at least one analogy, one worked example, one "common traps" callout, and one short "quick self-check" section.
11. Create at least one genuine aha moment for the reader and, where relevant, include a decision tree or trap-vs-truth box that makes the concept feel much easier than expected.

TONE & STYLE:
- Professional but approachable (like a knowledgeable study buddy)
- Data-driven, but only with defensible numbers
- Actionable: readers should know exactly what to do next
- Honest: acknowledge exam difficulty, don't oversell
- Specific and useful, not generic filler
- Creative and memorable when helpful: use an analogy, mini-case, or vivid comparison to make complex ideas stick
- Give the reader at least one aha moment, not just more information
- Use bullet points and numbered lists for scannability

ABOUT VORAPREP (for CTA/mentions):
- AI-powered exam prep for ${meta.exam} and 5 other certifications
- ${meta.questionCount} practice questions
- Adaptive learning engine
- AI tutor (Vory) for explanations
- Starting at ${meta.price}/month or ${meta.annualPrice}/year
- Free trial available

OUTPUT FORMAT:
Return the article in Markdown format with:
1. A YAML frontmatter block with meta_title and meta_description
2. The full article content
3. Do NOT include the H1 title in the body (it's rendered separately)

---
meta_title: "..."
meta_description: "..."
---

[Article content in Markdown]`;
}

/**
 * Build a prompt for generating SEO meta data for existing pages.
 */
export function buildMetaOptimizationPrompt(
  pageTitle: string,
  pageContent: string,
  targetKeyword: string,
): string {
  return `Optimize the SEO metadata for this page.

PAGE TITLE: ${pageTitle}
TARGET KEYWORD: "${targetKeyword}"
PAGE CONTENT SUMMARY: ${pageContent.substring(0, 500)}...

Generate:
1. meta_title (max 60 chars, include keyword, include "VoraPrep")
2. meta_description (max 155 chars, include keyword, compelling CTA)
3. og_title (can be same as meta_title)
4. og_description (max 200 chars, more descriptive)
5. 5 additional secondary keywords to target

Return as JSON:
{
  "meta_title": "...",
  "meta_description": "...",
  "og_title": "...",
  "og_description": "...",
  "secondary_keywords": ["...", "...", "...", "...", "..."]
}`;
}

// ============================================================================
// US States (for CPA requirements pages)
// ============================================================================

export const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
  'District of Columbia', 'Puerto Rico', 'US Virgin Islands', 'Guam',
];

/**
 * Generate CPA state requirement briefs for all 50 states + territories.
 * This alone creates 54 high-value SEO pages.
 */
export function generateStateCPABriefs(): ContentBrief[] {
  const meta = EXAM_CONTENT_META.cpa;
  const template = CONTENT_TEMPLATES.find(t => t.id === 'requirements-state')!;

  return US_STATES.map(state => {
    const stateSlug = slugify(state);
    const vars = {
      exam: meta.exam,
      course: meta.course,
      state,
      stateSlug,
      year: CURRENT_YEAR,
    };

    return {
      id: `cpa-requirements-${stateSlug}-${CURRENT_YEAR}`,
      title: interpolate(template.titleTemplate, vars),
      slug: interpolate(template.slugTemplate, vars),
      courseId: 'cpa' as CourseId,
      contentType: 'requirements' as ContentType,
      targetKeywords: [
        `cpa requirements ${state.toLowerCase()}`,
        `how to become a cpa in ${state.toLowerCase()}`,
        `cpa license ${state.toLowerCase()}`,
        `${state.toLowerCase()} cpa exam`,
        `cpa ${state.toLowerCase()} ${CURRENT_YEAR}`,
      ],
      primaryKeyword: `cpa requirements ${state.toLowerCase()}`,
      searchIntent: 'informational' as SearchIntent,
      estimatedVolume: state === 'California' || state === 'Texas' || state === 'New York' || state === 'Florida' ? 2000 : 500,
      competitorUrls: [],
      outline: template.outlineTemplate.map(s => ({
        ...s,
        heading: interpolate(s.heading, vars),
        keyPoints: s.keyPoints.map(kp => interpolate(kp, vars)),
      })),
      wordCountTarget: template.wordCountTarget,
      internalLinks: ['/cpa', '/blog', '/register'],
      ctaType: template.ctaType,
      ctaUrl: '/cpa',
      status: 'brief' as ContentStatus,
      priority: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
}

/**
 * Get content pipeline summary statistics.
 */
export function getContentPipelineSummary(): {
  totalBriefs: number;
  byExam: Record<string, number>;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  estimatedTotalWordCount: number;
} {
  const allBriefs = generateFullContentMatrix();
  const stateBriefs = generateStateCPABriefs();
  const combined = [...allBriefs, ...stateBriefs];

  const byExam: Record<string, number> = {};
  const byType: Record<string, number> = {};
  const byStatus: Record<string, number> = {};
  let totalWords = 0;

  for (const brief of combined) {
    byExam[brief.courseId] = (byExam[brief.courseId] || 0) + 1;
    byType[brief.contentType] = (byType[brief.contentType] || 0) + 1;
    byStatus[brief.status] = (byStatus[brief.status] || 0) + 1;
    totalWords += brief.wordCountTarget;
  }

  return {
    totalBriefs: combined.length,
    byExam,
    byType,
    byStatus,
    estimatedTotalWordCount: totalWords,
  };
}
