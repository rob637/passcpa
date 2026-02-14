/**
 * EA Study Schedules
 * Tailored plans for 4-week, 8-week, and 12-week preparation
 */

export interface StudyDay {
  day: string;
  focus: string;
  tasks: string[];
  timeEstimate: string;
}

export interface StudyWeek {
  week: number;
  theme: string;
  section: 'SEE1' | 'SEE2' | 'SEE3' | 'All';
  days: StudyDay[];
  weeklyGoal: string;
  questionTarget: number;
}

export interface StudySchedule {
  duration: string;
  title: string;
  description: string;
  targetAudience: string;
  hoursPerWeek: number;
  totalHours: number;
  weeks: StudyWeek[];
  tips: string[];
}

// ============================================
// 4-WEEK INTENSIVE SCHEDULE
// ============================================
export const FOUR_WEEK_SCHEDULE: StudySchedule = {
  duration: '4 weeks',
  title: 'Intensive EA Prep',
  description: 'Accelerated study plan for those with tax experience or limited time',
  targetAudience: 'Experienced tax professionals or refresher candidates',
  hoursPerWeek: 25,
  totalHours: 100,
  weeks: [
    {
      week: 1,
      theme: 'Individual Taxation Blitz',
      section: 'SEE1',
      weeklyGoal: 'Master filing requirements, income, and adjustments',
      questionTarget: 200,
      days: [
        {
          day: 'Monday',
          focus: 'Filing Requirements & Status',
          tasks: ['Filing thresholds by status', 'Residency rules', 'Form 1040 overview'],
          timeEstimate: '3-4 hrs',
        },
        {
          day: 'Tuesday',
          focus: 'Gross Income',
          tasks: ['Taxable vs non-taxable income', 'W-2, 1099 types', 'Schedule C basics'],
          timeEstimate: '3-4 hrs',
        },
        {
          day: 'Wednesday',
          focus: 'Adjustments & AGI',
          tasks: ['Above-the-line deductions', 'IRA contributions', 'SE tax deduction'],
          timeEstimate: '3-4 hrs',
        },
        {
          day: 'Thursday',
          focus: 'Itemized Deductions',
          tasks: ['Schedule A categories', 'Limitations', 'SALT cap'],
          timeEstimate: '3-4 hrs',
        },
        {
          day: 'Friday',
          focus: 'Credits & Payments',
          tasks: ['Refundable vs nonrefundable', 'EITC, CTC, AOTC', 'Estimated payments'],
          timeEstimate: '3-4 hrs',
        },
        {
          day: 'Saturday',
          focus: 'Review & Practice',
          tasks: ['100+ practice questions', 'Weak area review', 'Flashcard drill'],
          timeEstimate: '4-5 hrs',
        },
        {
          day: 'Sunday',
          focus: 'Mock Exam',
          tasks: ['Full SEE1 mock exam', 'Score and analyze', 'Gap identification'],
          timeEstimate: '3-4 hrs',
        },
      ],
    },
    {
      week: 2,
      theme: 'Business Taxation Blitz',
      section: 'SEE2',
      weeklyGoal: 'Master business entities and tax computations',
      questionTarget: 200,
      days: [
        {
          day: 'Monday',
          focus: 'Entity Selection',
          tasks: ['Sole prop, Partnership, S Corp, C Corp', 'Formation', 'Characteristics'],
          timeEstimate: '3-4 hrs',
        },
        {
          day: 'Tuesday',
          focus: 'Business Income & Deductions',
          tasks: ['Ordinary vs capital', 'Business expenses', 'Depreciation overview'],
          timeEstimate: '3-4 hrs',
        },
        {
          day: 'Wednesday',
          focus: 'MACRS & Section 179',
          tasks: ['Depreciation methods', 'Bonus depreciation', 'Listed property'],
          timeEstimate: '3-4 hrs',
        },
        {
          day: 'Thursday',
          focus: 'Pass-through Entities',
          tasks: ['Partnership K-1', 'S Corp K-1', 'Basis calculations'],
          timeEstimate: '3-4 hrs',
        },
        {
          day: 'Friday',
          focus: 'Employment Taxes',
          tasks: ['FICA', 'FUTA', 'Payroll forms 941/940'],
          timeEstimate: '3-4 hrs',
        },
        {
          day: 'Saturday',
          focus: 'Review & Practice',
          tasks: ['100+ practice questions', 'Entity comparison charts', 'Weakness review'],
          timeEstimate: '4-5 hrs',
        },
        {
          day: 'Sunday',
          focus: 'Mock Exam',
          tasks: ['Full SEE2 mock exam', 'Score and analyze', 'Gap identification'],
          timeEstimate: '3-4 hrs',
        },
      ],
    },
    {
      week: 3,
      theme: 'Representation & Ethics Blitz',
      section: 'SEE3',
      weeklyGoal: 'Master Circular 230 and IRS procedures',
      questionTarget: 200,
      days: [
        {
          day: 'Monday',
          focus: 'Practice Before IRS',
          tasks: ['Who can practice', 'ACE rights', 'Form 2848, 8821'],
          timeEstimate: '3-4 hrs',
        },
        {
          day: 'Tuesday',
          focus: 'Circular 230 Part I',
          tasks: ['Duties and restrictions', 'Due diligence', 'Client conflicts'],
          timeEstimate: '3-4 hrs',
        },
        {
          day: 'Wednesday',
          focus: 'Circular 230 Part II',
          tasks: ['Sanctions', 'OPR', 'Disciplinary procedures'],
          timeEstimate: '3-4 hrs',
        },
        {
          day: 'Thursday',
          focus: 'Examination Process',
          tasks: ['Audit types', 'Correspondence', 'Notice sequence'],
          timeEstimate: '3-4 hrs',
        },
        {
          day: 'Friday',
          focus: 'Collection & Appeals',
          tasks: ['Collection alternatives', 'CDP rights', 'Appeals process'],
          timeEstimate: '3-4 hrs',
        },
        {
          day: 'Saturday',
          focus: 'Review & Practice',
          tasks: ['100+ practice questions', 'Circular 230 summary', 'Form comparison'],
          timeEstimate: '4-5 hrs',
        },
        {
          day: 'Sunday',
          focus: 'Mock Exam',
          tasks: ['Full SEE3 mock exam', 'Score and analyze', 'Gap identification'],
          timeEstimate: '3-4 hrs',
        },
      ],
    },
    {
      week: 4,
      theme: 'Final Review & Exam Prep',
      section: 'All',
      weeklyGoal: 'Consolidate knowledge and build exam confidence',
      questionTarget: 300,
      days: [
        {
          day: 'Monday',
          focus: 'SEE1 Weak Areas',
          tasks: ['Review missed questions', 'Flashcard review', 'Quick reference study'],
          timeEstimate: '3-4 hrs',
        },
        {
          day: 'Tuesday',
          focus: 'SEE2 Weak Areas',
          tasks: ['Review missed questions', 'Entity comparison', 'Depreciation drill'],
          timeEstimate: '3-4 hrs',
        },
        {
          day: 'Wednesday',
          focus: 'SEE3 Weak Areas',
          tasks: ['Circular 230 review', 'Penalties summary', 'Collection process'],
          timeEstimate: '3-4 hrs',
        },
        {
          day: 'Thursday',
          focus: 'Full Mixed Review',
          tasks: ['100 questions all sections', 'Timed practice', 'Speed improvement'],
          timeEstimate: '3-4 hrs',
        },
        {
          day: 'Friday',
          focus: 'Final Mock Exam',
          tasks: ['Full-length practice exam', 'Exam conditions', 'Time management'],
          timeEstimate: '4-5 hrs',
        },
        {
          day: 'Saturday',
          focus: 'Light Review',
          tasks: ['Flash card review only', 'Quick reference sheets', 'Rest before exam'],
          timeEstimate: '2-3 hrs',
        },
        {
          day: 'Sunday',
          focus: 'Exam Day Prep',
          tasks: ['Review exam logistics', 'Prepare materials', 'Get good rest'],
          timeEstimate: '1 hr',
        },
      ],
    },
  ],
  tips: [
    'This schedule requires 25+ hours/week - commit before starting',
    'Prior tax experience is strongly recommended',
    'Take each section exam as soon as you complete that week',
    'Use commute time for audio review or flashcards',
    'Skip material you already know well, focus on gaps',
  ],
};

// ============================================
// 8-WEEK STANDARD SCHEDULE
// ============================================
export const EIGHT_WEEK_SCHEDULE: StudySchedule = {
  duration: '8 weeks',
  title: 'Standard EA Prep',
  description: 'Balanced study plan covering all three sections thoroughly',
  targetAudience: 'Those with some tax background seeking thorough preparation',
  hoursPerWeek: 15,
  totalHours: 120,
  weeks: [
    {
      week: 1,
      theme: 'SEE1: Income Fundamentals',
      section: 'SEE1',
      weeklyGoal: 'Understand filing requirements and gross income',
      questionTarget: 100,
      days: [
        {
          day: 'Mon-Tue',
          focus: 'Filing Requirements',
          tasks: ['Who must file', 'Filing status', 'Due dates and extensions'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Wed-Thu',
          focus: 'Gross Income',
          tasks: ['Taxable income types', 'Non-taxable income', 'Form 1099 series'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Fri-Sat',
          focus: 'Self-Employment',
          tasks: ['Schedule C', 'SE tax calculation', 'Business expenses'],
          timeEstimate: '5 hrs total',
        },
        {
          day: 'Sunday',
          focus: 'Weekly Review',
          tasks: ['50+ practice questions', 'Flashcard study', 'Notes review'],
          timeEstimate: '2 hrs',
        },
      ],
    },
    {
      week: 2,
      theme: 'SEE1: Deductions & Credits',
      section: 'SEE1',
      weeklyGoal: 'Master adjustments, deductions, and tax credits',
      questionTarget: 100,
      days: [
        {
          day: 'Mon-Tue',
          focus: 'Adjustments to Income',
          tasks: ['IRA contributions', 'Student loan interest', 'Health insurance'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Wed-Thu',
          focus: 'Itemized Deductions',
          tasks: ['Medical, taxes, interest', 'Charitable contributions', 'Standard vs itemized'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Fri-Sat',
          focus: 'Tax Credits',
          tasks: ['Refundable credits (EITC, CTC)', 'Education credits', 'Child care credit'],
          timeEstimate: '5 hrs total',
        },
        {
          day: 'Sunday',
          focus: 'SEE1 Mock Exam',
          tasks: ['Full practice exam', 'Score analysis', 'Identify weak areas'],
          timeEstimate: '3 hrs',
        },
      ],
    },
    {
      week: 3,
      theme: 'SEE1: Assets & Retirement',
      section: 'SEE1',
      weeklyGoal: 'Complete individual taxation with capital gains and retirement',
      questionTarget: 100,
      days: [
        {
          day: 'Mon-Tue',
          focus: 'Capital Gains/Losses',
          tasks: ['Basis calculations', 'Holding periods', 'Capital loss limitations'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Wed-Thu',
          focus: 'Retirement Distributions',
          tasks: ['IRA, 401(k) rules', 'Early withdrawal penalties', 'RMDs'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Fri-Sat',
          focus: 'Special Topics',
          tasks: ['AMT basics', 'Estimated taxes', 'Extensions'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Sunday',
          focus: 'SEE1 Final Review',
          tasks: ['Full mock exam', 'Review all weak areas', 'Prepare for SEE2'],
          timeEstimate: '3 hrs',
        },
      ],
    },
    {
      week: 4,
      theme: 'SEE2: Business Entities',
      section: 'SEE2',
      weeklyGoal: 'Understand entity types and tax treatment',
      questionTarget: 100,
      days: [
        {
          day: 'Mon-Tue',
          focus: 'Entity Comparison',
          tasks: ['Sole prop, partnership, LLC', 'C corp vs S corp', 'Entity selection factors'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Wed-Thu',
          focus: 'Corporate Taxation',
          tasks: ['Form 1120', 'Corporate deductions', 'Dividends received deduction'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Fri-Sat',
          focus: 'S Corporations',
          tasks: ['S corp requirements', 'Form 1120-S', 'Shareholder basis'],
          timeEstimate: '5 hrs total',
        },
        {
          day: 'Sunday',
          focus: 'Weekly Review',
          tasks: ['75+ practice questions', 'Entity comparison chart', 'Notes review'],
          timeEstimate: '2 hrs',
        },
      ],
    },
    {
      week: 5,
      theme: 'SEE2: Partnerships & Depreciation',
      section: 'SEE2',
      weeklyGoal: 'Master partnership taxation and depreciation rules',
      questionTarget: 100,
      days: [
        {
          day: 'Mon-Tue',
          focus: 'Partnerships',
          tasks: ['Form 1065', 'K-1 items', 'Partner basis tracking'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Wed-Thu',
          focus: 'Depreciation Methods',
          tasks: ['MACRS tables', 'Section 179', 'Bonus depreciation'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Fri-Sat',
          focus: 'Special Depreciation',
          tasks: ['Listed property', 'Luxury auto limits', 'Amortization'],
          timeEstimate: '5 hrs total',
        },
        {
          day: 'Sunday',
          focus: 'SEE2 Mock Exam',
          tasks: ['Full practice exam', 'Focus on calculations', 'Time management'],
          timeEstimate: '3 hrs',
        },
      ],
    },
    {
      week: 6,
      theme: 'SEE2: Employment Tax & Review',
      section: 'SEE2',
      weeklyGoal: 'Complete business taxation with employment taxes',
      questionTarget: 100,
      days: [
        {
          day: 'Mon-Tue',
          focus: 'Employment Taxes',
          tasks: ['FICA calculations', 'Payroll forms', 'Deposit requirements'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Wed-Thu',
          focus: 'FUTA & Year-End',
          tasks: ['FUTA tax', 'W-2/W-3', 'Information returns'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Fri-Sat',
          focus: 'SEE2 Comprehensive Review',
          tasks: ['Weak area focus', 'Entity comparison drills', 'Depreciation practice'],
          timeEstimate: '5 hrs total',
        },
        {
          day: 'Sunday',
          focus: 'SEE2 Final Mock',
          tasks: ['Full mock exam', 'Score and analyze', 'Transition to SEE3'],
          timeEstimate: '3 hrs',
        },
      ],
    },
    {
      week: 7,
      theme: 'SEE3: Representation & Ethics',
      section: 'SEE3',
      weeklyGoal: 'Master Circular 230 and representation rules',
      questionTarget: 100,
      days: [
        {
          day: 'Mon-Tue',
          focus: 'Practice Before IRS',
          tasks: ['Enrolled agent authority', 'POA forms', 'Limited practice'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Wed-Thu',
          focus: 'Circular 230 Duties',
          tasks: ['Practitioner duties', 'Prohibited conduct', 'Fee restrictions'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Fri-Sat',
          focus: 'Sanctions & Discipline',
          tasks: ['OPR proceedings', 'Sanction types', 'Return to practice'],
          timeEstimate: '5 hrs total',
        },
        {
          day: 'Sunday',
          focus: 'SEE3 Practice',
          tasks: ['75+ questions', 'Circular 230 flashcards', 'Form comparison'],
          timeEstimate: '3 hrs',
        },
      ],
    },
    {
      week: 8,
      theme: 'SEE3: Procedures & Final Prep',
      section: 'SEE3',
      weeklyGoal: 'Complete IRS procedures and prepare for all exams',
      questionTarget: 150,
      days: [
        {
          day: 'Mon-Tue',
          focus: 'Examination & Collection',
          tasks: ['Audit types', 'Collection process', 'Taxpayer rights'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Wed-Thu',
          focus: 'Appeals & Penalties',
          tasks: ['Appeals process', 'Tax Court', 'Penalty types/rates'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Fri',
          focus: 'SEE3 Mock Exam',
          tasks: ['Full practice exam', 'Score and analyze'],
          timeEstimate: '3 hrs',
        },
        {
          day: 'Sat',
          focus: 'All Sections Review',
          tasks: ['Quick reference sheets', 'Key flashcards', 'High-priority topics'],
          timeEstimate: '3 hrs',
        },
        {
          day: 'Sunday',
          focus: 'Final Prep',
          tasks: ['Light review only', 'Exam logistics', 'Rest'],
          timeEstimate: '2 hrs',
        },
      ],
    },
  ],
  tips: [
    'Schedule your first exam for end of Week 3 (SEE1)',
    'Take SEE2 at end of Week 6, SEE3 at end of Week 8',
    'Use weekday commutes for flashcard review',
    "Don't skip the weekend mock exams - they're essential",
    'Track your question accuracy to identify weak areas',
  ],
};

// ============================================
// 12-WEEK COMPREHENSIVE SCHEDULE
// ============================================
export const TWELVE_WEEK_SCHEDULE: StudySchedule = {
  duration: '12 weeks',
  title: 'Comprehensive EA Prep',
  description: 'Thorough preparation for those new to tax or wanting deep mastery',
  targetAudience: 'Career changers, thorough learners, or those with limited tax experience',
  hoursPerWeek: 10,
  totalHours: 120,
  weeks: [
    {
      week: 1,
      theme: 'SEE1: Tax Fundamentals',
      section: 'SEE1',
      weeklyGoal: 'Build foundation of tax system knowledge',
      questionTarget: 50,
      days: [
        {
          day: 'Mon-Wed',
          focus: 'Tax System Overview',
          tasks: ['How taxes work', 'Form 1040 walkthrough', 'Key terminology'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Thu-Sat',
          focus: 'Filing Requirements',
          tasks: ['Who must file', 'Filing status determination', 'Due dates'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Sunday',
          focus: 'Week 1 Review',
          tasks: ['25 practice questions', 'Create notes summary'],
          timeEstimate: '2 hrs',
        },
      ],
    },
    {
      week: 2,
      theme: 'SEE1: Income Recognition',
      section: 'SEE1',
      weeklyGoal: 'Understand what constitutes taxable income',
      questionTarget: 50,
      days: [
        {
          day: 'Mon-Wed',
          focus: 'Wages & Compensation',
          tasks: ['W-2 items', 'Fringe benefits', 'Stock compensation'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Thu-Sat',
          focus: 'Other Income Sources',
          tasks: ['Interest/dividends', 'Rental income', 'Alimony rules'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Sunday',
          focus: 'Week 2 Review',
          tasks: ['50 practice questions', 'Income type comparison'],
          timeEstimate: '2 hrs',
        },
      ],
    },
    {
      week: 3,
      theme: 'SEE1: Self-Employment',
      section: 'SEE1',
      weeklyGoal: 'Master Schedule C and self-employment tax',
      questionTarget: 75,
      days: [
        {
          day: 'Mon-Wed',
          focus: 'Schedule C',
          tasks: ['Business income', 'Deductible expenses', 'Home office'],
          timeEstimate: '5 hrs total',
        },
        {
          day: 'Thu-Sat',
          focus: 'SE Tax',
          tasks: ['SE tax calculation', 'SE deduction', 'Estimated taxes'],
          timeEstimate: '3 hrs total',
        },
        {
          day: 'Sunday',
          focus: 'Week 3 Review',
          tasks: ['Practice calculations', 'SE tax scenarios'],
          timeEstimate: '2 hrs',
        },
      ],
    },
    {
      week: 4,
      theme: 'SEE1: Deductions',
      section: 'SEE1',
      weeklyGoal: 'Understand above and below the line deductions',
      questionTarget: 75,
      days: [
        {
          day: 'Mon-Wed',
          focus: 'Adjustments to Income',
          tasks: ['IRA contributions', 'HSA deduction', 'Student loan interest'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Thu-Sat',
          focus: 'Itemized Deductions',
          tasks: ['Schedule A categories', 'Limitations', 'SALT cap'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Sunday',
          focus: 'SEE1 First Mock',
          tasks: ['Half-length mock exam', 'Identify gaps'],
          timeEstimate: '2 hrs',
        },
      ],
    },
    {
      week: 5,
      theme: 'SEE1: Credits & Assets',
      section: 'SEE1',
      weeklyGoal: 'Master tax credits and capital transactions',
      questionTarget: 75,
      days: [
        {
          day: 'Mon-Wed',
          focus: 'Tax Credits',
          tasks: ['EITC requirements', 'Child tax credit', 'Education credits'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Thu-Sat',
          focus: 'Capital Gains',
          tasks: ['Basis calculation', 'Holding periods', 'Loss limitations'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Sunday',
          focus: 'Week 5 Review',
          tasks: ['Credit eligibility practice', 'Capital gain scenarios'],
          timeEstimate: '2 hrs',
        },
      ],
    },
    {
      week: 6,
      theme: 'SEE1: Retirement & Review',
      section: 'SEE1',
      weeklyGoal: 'Complete SEE1 content and full mock exam',
      questionTarget: 100,
      days: [
        {
          day: 'Mon-Wed',
          focus: 'Retirement Accounts',
          tasks: ['IRA types', 'Distribution rules', '10% penalty exceptions'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Thu-Fri',
          focus: 'SEE1 Comprehensive Review',
          tasks: ['Weak area study', 'Flashcard drill', 'Quick reference review'],
          timeEstimate: '3 hrs total',
        },
        {
          day: 'Sat-Sun',
          focus: 'SEE1 Final Mock',
          tasks: ['Full-length mock exam', 'Review missed questions', 'Exam readiness check'],
          timeEstimate: '4 hrs total',
        },
      ],
    },
    {
      week: 7,
      theme: 'SEE2: Entity Fundamentals',
      section: 'SEE2',
      weeklyGoal: 'Understand business entity types and selection',
      questionTarget: 50,
      days: [
        {
          day: 'Mon-Wed',
          focus: 'Entity Comparison',
          tasks: ['Sole prop basics', 'Partnership overview', 'LLC taxation'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Thu-Sat',
          focus: 'Corporations',
          tasks: ['C corp vs S corp', 'Formation', 'Tax consequences'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Sunday',
          focus: 'Week 7 Review',
          tasks: ['Entity comparison chart', '50 questions'],
          timeEstimate: '2 hrs',
        },
      ],
    },
    {
      week: 8,
      theme: 'SEE2: Corporate Taxation',
      section: 'SEE2',
      weeklyGoal: 'Master C corporation and S corporation rules',
      questionTarget: 75,
      days: [
        {
          day: 'Mon-Wed',
          focus: 'C Corporation Tax',
          tasks: ['Form 1120', 'Corporate deductions', 'DRD'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Thu-Sat',
          focus: 'S Corporation Tax',
          tasks: ['S election requirements', 'Form 1120-S', 'Shareholder basis'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Sunday',
          focus: 'Week 8 Review',
          tasks: ['Corporate tax calculations', 'Basis tracking practice'],
          timeEstimate: '2 hrs',
        },
      ],
    },
    {
      week: 9,
      theme: 'SEE2: Partnerships & Pass-throughs',
      section: 'SEE2',
      weeklyGoal: 'Understand partnership taxation and K-1s',
      questionTarget: 75,
      days: [
        {
          day: 'Mon-Wed',
          focus: 'Partnership Basics',
          tasks: ['Form 1065', 'Ordinary vs separately stated', 'At-risk rules'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Thu-Sat',
          focus: 'Partner Basis & K-1',
          tasks: ['Initial basis', 'Adjustments', 'Distribution rules'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Sunday',
          focus: 'SEE2 Mock Exam',
          tasks: ['Half-length mock', 'Identify weak areas'],
          timeEstimate: '2 hrs',
        },
      ],
    },
    {
      week: 10,
      theme: 'SEE2: Depreciation & Employment Tax',
      section: 'SEE2',
      weeklyGoal: 'Master depreciation methods and payroll taxes',
      questionTarget: 100,
      days: [
        {
          day: 'Mon-Wed',
          focus: 'Depreciation',
          tasks: ['MACRS tables', 'Section 179', 'Bonus depreciation'],
          timeEstimate: '5 hrs total',
        },
        {
          day: 'Thu-Sat',
          focus: 'Employment Taxes',
          tasks: ['FICA/FUTA', 'Forms 941/940', 'Deposit schedules'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Sunday',
          focus: 'SEE2 Final Mock',
          tasks: ['Full mock exam', 'Review and analyze'],
          timeEstimate: '3 hrs',
        },
      ],
    },
    {
      week: 11,
      theme: 'SEE3: Representation & Circular 230',
      section: 'SEE3',
      weeklyGoal: 'Master practice rights and ethics requirements',
      questionTarget: 75,
      days: [
        {
          day: 'Mon-Wed',
          focus: 'Practice Before IRS',
          tasks: ['EA authority', 'Forms 2848/8821', 'Limited practice'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Thu-Sat',
          focus: 'Circular 230',
          tasks: ['Duties', 'Prohibited conduct', 'Sanctions'],
          timeEstimate: '5 hrs total',
        },
        {
          day: 'Sunday',
          focus: 'Week 11 Review',
          tasks: ['Ethics scenarios', 'Circular 230 flashcards'],
          timeEstimate: '2 hrs',
        },
      ],
    },
    {
      week: 12,
      theme: 'SEE3: Procedures & Final Prep',
      section: 'SEE3',
      weeklyGoal: 'Complete all content and prepare for exams',
      questionTarget: 100,
      days: [
        {
          day: 'Mon-Tue',
          focus: 'IRS Procedures',
          tasks: ['Audit types', 'Collection process', 'Appeals'],
          timeEstimate: '4 hrs total',
        },
        {
          day: 'Wed-Thu',
          focus: 'Penalties & Statutes',
          tasks: ['Penalty types', 'Statutes of limitations', 'Taxpayer rights'],
          timeEstimate: '3 hrs total',
        },
        {
          day: 'Friday',
          focus: 'SEE3 Mock',
          tasks: ['Full mock exam', 'Review'],
          timeEstimate: '2 hrs',
        },
        {
          day: 'Sat',
          focus: 'Final Review',
          tasks: ['All quick reference sheets', 'Key flashcards'],
          timeEstimate: '2 hrs',
        },
        {
          day: 'Sunday',
          focus: 'Exam Ready',
          tasks: ['Light review', 'Rest', 'Prepare for test day'],
          timeEstimate: '1 hr',
        },
      ],
    },
  ],
  tips: [
    'Take exams as you complete each section (SEE1 after Week 6, SEE2 after Week 10, SEE3 after Week 12)',
    'This pace allows for deeper understanding - take time to grasp concepts',
    "Don't rush; if you need extra time on a topic, use weekend catch-up time",
    'Build a study group for accountability',
    'Review prior week material briefly before starting new week',
    'Health and rest are important - sustainable pace wins',
  ],
};

// Export all schedules
export const EA_STUDY_SCHEDULES = {
  intensive: FOUR_WEEK_SCHEDULE,
  standard: EIGHT_WEEK_SCHEDULE,
  comprehensive: TWELVE_WEEK_SCHEDULE,
};

// Helper to get schedule by weeks
export function getScheduleByDuration(weeks: 4 | 8 | 12): StudySchedule {
  switch (weeks) {
    case 4:
      return FOUR_WEEK_SCHEDULE;
    case 8:
      return EIGHT_WEEK_SCHEDULE;
    case 12:
      return TWELVE_WEEK_SCHEDULE;
  }
}
