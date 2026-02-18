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
    titleTemplate: 'How to Pass {exam} {section} in {year}: Complete Study Guide',
    slugTemplate: 'how-to-pass-{course}-{section}-{year}',
    wordCountTarget: 2500,
    ctaType: 'free-trial',
    applicableCourses: 'all',
    perSection: true,
    seasonal: true,
    priority: 1,
    outlineTemplate: [
      { heading: 'What Is {exam} {section}?', level: 2, keyPoints: ['Overview of the section', 'What it tests', 'Weight on the exam'], wordCount: 300 },
      { heading: '{section} Exam Format and Structure', level: 2, keyPoints: ['Question types', 'Time allowed', 'Passing score'], wordCount: 250 },
      { heading: 'Key Topics on {section}', level: 2, keyPoints: ['Blueprint areas', 'High-weight topics', 'Common tested concepts'], wordCount: 400 },
      { heading: 'How to Study for {section} Effectively', level: 2, keyPoints: ['Study plan', 'Spaced repetition', 'Practice questions'], wordCount: 400 },
      { heading: 'Common Mistakes to Avoid', level: 2, keyPoints: ['Time management', 'Skipping hard topics', 'Not doing enough MCQ'], wordCount: 300 },
      { heading: '{section} Pass Rates and What They Mean', level: 2, keyPoints: ['Historical pass rates', 'Difficulty perception', 'What a 75 means'], wordCount: 250 },
      { heading: 'Best {section} Study Resources in {year}', level: 2, keyPoints: ['VoraPrep features', 'Comparison with alternatives', 'Free vs paid'], wordCount: 300 },
      { heading: 'FAQs About {exam} {section}', level: 2, keyPoints: ['5-8 common questions', 'Direct answers'], wordCount: 300 },
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
    titleTemplate: '{exam} Exam Pass Rates {year}: Section-by-Section Breakdown',
    slugTemplate: '{course}-exam-pass-rates-{year}',
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
    titleTemplate: 'Free {exam} {section} Practice Questions ({year}): Test Your Knowledge',
    slugTemplate: 'free-{course}-{section}-practice-questions-{year}',
    wordCountTarget: 3000,
    ctaType: 'free-trial',
    applicableCourses: 'all',
    perSection: true,
    seasonal: true,
    priority: 1,
    outlineTemplate: [
      { heading: 'About These Free {section} Questions', level: 2, keyPoints: ['Number of questions', 'Difficulty mix', 'Blueprint alignment'], wordCount: 200 },
      { heading: '{section} Practice Questions', level: 2, keyPoints: ['10-15 sample questions with explanations', 'Varying difficulty'], wordCount: 1500 },
      { heading: 'How Did You Score?', level: 2, keyPoints: ['Score interpretation', 'What your results mean', 'Next steps'], wordCount: 300 },
      { heading: 'Get More {exam} Practice on VoraPrep', level: 2, keyPoints: ['Full question bank', 'Adaptive engine', 'AI tutor'], wordCount: 300 },
    ],
  },

  // ------ Topic Explainer (per blueprint area) ------
  {
    id: 'topic-explainer',
    contentType: 'topic-explainer',
    titleTemplate: '{topic} Explained: {exam} {section} Study Guide',
    slugTemplate: '{course}-{section}-{topicSlug}-explained',
    wordCountTarget: 2000,
    ctaType: 'free-trial',
    applicableCourses: 'all',
    perSection: true, // actually per-topic, but we generate per section and expand
    seasonal: false,
    priority: 3,
    outlineTemplate: [
      { heading: 'What Is {topic}?', level: 2, keyPoints: ['Clear definition', 'Why it matters', 'How it appears on the exam'], wordCount: 300 },
      { heading: 'Key Concepts You Need to Know', level: 2, keyPoints: ['Core concepts', 'Rules and exceptions', 'Examples'], wordCount: 500 },
      { heading: 'How {topic} Is Tested on the {exam}', level: 2, keyPoints: ['Question types', 'Common traps', 'Blueprint weight'], wordCount: 300 },
      { heading: 'Practice Questions on {topic}', level: 2, keyPoints: ['3-5 sample questions', 'Detailed explanations'], wordCount: 500 },
      { heading: 'Study Tips for {topic}', level: 2, keyPoints: ['Memory techniques', 'Common mistakes', 'Time allocation'], wordCount: 200 },
      { heading: 'Master {topic} with VoraPrep', level: 2, keyPoints: ['Adaptive practice', 'AI tutor for explanations'], wordCount: 200 },
    ],
  },

  // ------ Exam Tips ------
  {
    id: 'exam-tips',
    contentType: 'exam-tips',
    titleTemplate: '{exam} Exam Day Tips: {count} Strategies from Successful Candidates',
    slugTemplate: '{course}-exam-day-tips-{year}',
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
    questionCount: '5,000+',
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
    questionCount: '3,000+',
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
    questionCount: '3,000+',
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
    questionCount: '2,500+',
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
    questionCount: '2,500+',
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
    questionCount: '2,500+',
    sections: [
      { id: 'CISA1', name: 'Information Systems Auditing Process', topics: ['IS Audit Standards', 'Risk-Based Audit Planning', 'Audit Execution', 'Control Self-Assessment'] },
      { id: 'CISA2', name: 'Governance and Management of IT', topics: ['IT Governance', 'IT Strategy', 'IT Resource Management', 'IT Risk Management', 'Compliance'] },
      { id: 'CISA3', name: 'IS Acquisition, Development & Implementation', topics: ['SDLC', 'Project Management', 'Business Case', 'Testing', 'Implementation'] },
      { id: 'CISA4', name: 'IS Operations and Business Resilience', topics: ['IT Operations', 'BCP', 'DRP', 'Incident Management', 'SLAs', 'Database Management'] },
      { id: 'CISA5', name: 'Protection of Information Assets', topics: ['InfoSec Frameworks', 'Access Controls', 'Network Security', 'Encryption', 'Vulnerability Management'] },
    ],
  },
};

// ============================================================================
// Content Brief Generator
// ============================================================================

const CURRENT_YEAR = new Date().getFullYear().toString();

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

  // Sort by priority
  allBriefs.sort((a, b) => a.priority - b.priority);

  return allBriefs;
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
    'cheat-sheet': `${exam} cheat sheet`,
    'exam-tips': `${exam} exam tips`,
    'career-guide': `${exam} career`,
    'news-update': `${exam} exam changes ${CURRENT_YEAR}`,
    'case-study': `pass ${exam} exam`,
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
    'pass-rates': [`${exam} pass rate ${CURRENT_YEAR}`, `${exam} difficulty`, `${exam} failure rate`],
    'practice-questions': [`free ${exam} questions`, `${exam} mcq practice`, `${exam} sample questions`],
    'review-comparison': [`${exam} review courses compared`, `cheap ${exam} prep`, `${exam} prep cost`],
    'salary-guide': [`${exam} salary ${CURRENT_YEAR}`, `how much do ${exam}s make`, `${exam} earning potential`],
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
    '/blog',
    '/compare',
    '/register',
  ];

  if (section) {
    // Link to other section guides
    const meta = EXAM_CONTENT_META[courseId];
    for (const s of meta.sections) {
      if (s.id !== section) {
        links.push(`/blog/how-to-pass-${courseId}-${s.id.toLowerCase()}-${CURRENT_YEAR}`);
      }
    }
  }

  return links;
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

  return `You are a professional content writer specializing in ${meta.examFull} exam preparation.
Write a comprehensive, SEO-optimized blog article for VoraPrep (voraprep.com), an AI-powered exam prep platform.

ARTICLE SPECIFICATIONS:
- Title: ${brief.title}
- Primary Keyword: "${brief.primaryKeyword}" (use in H1, first paragraph, and 2-3 subheadings)
- Secondary Keywords: ${brief.targetKeywords.map(k => `"${k}"`).join(', ')}
- Word Count Target: ${brief.wordCountTarget} words
- Search Intent: ${brief.searchIntent}
- Content Type: ${brief.contentType}

OUTLINE (follow this structure):
${brief.outline.map(s => `${'#'.repeat(s.level)} ${s.heading}\n${s.keyPoints.map(kp => `  - ${kp}`).join('\n')}\n  Target: ~${s.wordCount} words`).join('\n\n')}

SEO REQUIREMENTS:
1. Use the primary keyword naturally in the first 100 words
2. Include secondary keywords throughout (1-2 times each naturally)
3. Use H2 and H3 headings with keywords where natural
4. Write a meta title (60 chars max) and meta description (155 chars max)
5. Include internal link placeholders: ${brief.internalLinks.map(l => `[${l}]`).join(', ')}
6. Add a clear CTA to VoraPrep at the end

TONE & STYLE:
- Professional but approachable (like a knowledgeable study buddy)
- Data-driven: include specific numbers, pass rates, study hours
- Actionable: readers should know exactly what to do next
- Honest: acknowledge exam difficulty, don't oversell
- Use bullet points and numbered lists for scannability
- Include a comparison table where relevant

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
