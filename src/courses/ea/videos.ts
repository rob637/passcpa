/**
 * EA Video Content Configuration
 * 
 * Defines video content structure for the EA (Enrolled Agent) course.
 * Organized by SEE Part with comprehensive domain coverage.
 * Videos can be recorded and uploaded to replace placeholders.
 */

export type VideoStatus = 'planned' | 'in-production' | 'available';

export interface VideoLesson {
  id: string;
  sectionId: string;
  title: string;
  description: string;
  duration: number; // minutes
  order: number;
  status: VideoStatus;
  videoUrl?: string;
  thumbnailUrl?: string;
  transcript?: string;
  topics: string[];
}

export interface VideoSection {
  sectionId: string;
  title: string;
  totalVideos: number;
  estimatedTotalMinutes: number;
  videos: VideoLesson[];
}

// Video content structure for each SEE Part
export const EA_VIDEO_CONTENT: VideoSection[] = [
  // ========================================
  // SEE PART 1: INDIVIDUALS
  // ========================================
  {
    sectionId: 'SEE1',
    title: 'Part 1: Individuals',
    totalVideos: 18,
    estimatedTotalMinutes: 450,
    videos: [
      // Domain 1: Preliminary Work (3 videos)
      {
        id: 'SEE1-V001',
        sectionId: 'SEE1',
        title: 'Filing Requirements and Due Dates',
        description: 'Who must file, filing thresholds by status and age, automatic extensions',
        duration: 25,
        order: 1,
        status: 'planned',
        topics: ['Filing Requirements', 'Due Dates', 'Extensions', 'Thresholds']
      },
      {
        id: 'SEE1-V002',
        sectionId: 'SEE1',
        title: 'Filing Status Determination',
        description: 'Single, MFJ, MFS, HOH, QSS - rules, requirements, and exam traps',
        duration: 30,
        order: 2,
        status: 'planned',
        topics: ['Filing Status', 'Head of Household', 'Qualifying Surviving Spouse']
      },
      {
        id: 'SEE1-V003',
        sectionId: 'SEE1',
        title: 'Dependents: Qualifying Child vs. Qualifying Relative',
        description: 'CARES and SUPORT tests, tie-breaker rules, who can be claimed',
        duration: 35,
        order: 3,
        status: 'planned',
        topics: ['Qualifying Child', 'Qualifying Relative', 'CARES Test', 'SUPORT Test']
      },
      
      // Domain 2: Income and Assets (4 videos)
      {
        id: 'SEE1-V004',
        sectionId: 'SEE1',
        title: 'Wages, Interest, and Dividends',
        description: 'W-2 income, fringe benefits, taxable vs. tax-exempt interest, qualified dividends',
        duration: 30,
        order: 4,
        status: 'planned',
        topics: ['W-2 Income', 'Interest', 'Dividends', 'Fringe Benefits']
      },
      {
        id: 'SEE1-V005',
        sectionId: 'SEE1',
        title: 'Business Income (Schedule C)',
        description: 'Self-employment income, business expenses, home office, vehicle expenses',
        duration: 30,
        order: 5,
        status: 'planned',
        topics: ['Schedule C', 'Self-Employment', 'Home Office', 'Business Expenses']
      },
      {
        id: 'SEE1-V006',
        sectionId: 'SEE1',
        title: 'Capital Gains and Losses',
        description: 'Short-term vs. long-term, $3,000 loss limitation, wash sales, basis calculations',
        duration: 30,
        order: 6,
        status: 'planned',
        topics: ['Capital Gains', 'Capital Losses', 'Wash Sale', 'Basis']
      },
      {
        id: 'SEE1-V007',
        sectionId: 'SEE1',
        title: 'Retirement and Social Security Income',
        description: 'IRA/401(k) distributions, 10% penalty, RMDs, SS benefit taxation',
        duration: 30,
        order: 7,
        status: 'planned',
        topics: ['IRA Distributions', 'Early Withdrawal Penalty', 'RMDs', 'Social Security']
      },
      
      // Domain 3: Deductions and Credits (4 videos)
      {
        id: 'SEE1-V008',
        sectionId: 'SEE1',
        title: 'Adjustments to Income (Above-the-Line)',
        description: 'HSA, SE health insurance, IRA, student loan interest, alimony',
        duration: 25,
        order: 8,
        status: 'planned',
        topics: ['Adjustments', 'HSA', 'IRA Deduction', 'Student Loan Interest']
      },
      {
        id: 'SEE1-V009',
        sectionId: 'SEE1',
        title: 'Itemized Deductions (Schedule A)',
        description: 'Medical, SALT cap, mortgage interest, charitable contributions',
        duration: 30,
        order: 9,
        status: 'planned',
        topics: ['Medical Expenses', 'SALT', 'Mortgage Interest', 'Charitable']
      },
      {
        id: 'SEE1-V010',
        sectionId: 'SEE1',
        title: 'Nonrefundable Credits',
        description: 'Child care credit, LLC, foreign tax credit, saver\'s credit',
        duration: 25,
        order: 10,
        status: 'planned',
        topics: ['Child Care Credit', 'Lifetime Learning Credit', 'Foreign Tax Credit']
      },
      {
        id: 'SEE1-V011',
        sectionId: 'SEE1',
        title: 'Refundable Credits: EITC, CTC, AOTC',
        description: 'Earned income credit, child tax credit, American Opportunity Credit',
        duration: 30,
        order: 11,
        status: 'planned',
        topics: ['EITC', 'Child Tax Credit', 'AOTC', 'Premium Tax Credit']
      },
      
      // Domain 4: Taxation (3 videos)
      {
        id: 'SEE1-V012',
        sectionId: 'SEE1',
        title: 'Tax Computation and Special Taxes',
        description: 'Tax brackets, LTCG rates, kiddie tax, NIIT',
        duration: 25,
        order: 12,
        status: 'planned',
        topics: ['Tax Brackets', 'Capital Gains Rates', 'Kiddie Tax', 'NIIT']
      },
      {
        id: 'SEE1-V013',
        sectionId: 'SEE1',
        title: 'AMT and Self-Employment Tax',
        description: 'AMT calculation, AMT adjustments, SE tax computation',
        duration: 30,
        order: 13,
        status: 'planned',
        topics: ['AMT', 'AMT Adjustments', 'Self-Employment Tax', 'SE Deduction']
      },
      {
        id: 'SEE1-V014',
        sectionId: 'SEE1',
        title: 'Estimated Tax and Penalties',
        description: 'Safe harbor rules, high-income payers, underpayment penalties',
        duration: 20,
        order: 14,
        status: 'planned',
        topics: ['Estimated Tax', 'Safe Harbor', 'Underpayment Penalty']
      },
      
      // Domain 5: Advising (2 videos)
      {
        id: 'SEE1-V015',
        sectionId: 'SEE1',
        title: 'Tax Planning Strategies',
        description: 'Income timing, deduction bunching, Roth conversions, capital gain harvesting',
        duration: 30,
        order: 15,
        status: 'planned',
        topics: ['Tax Planning', 'Roth Conversion', 'Bunching', 'Gain Harvesting']
      },
      {
        id: 'SEE1-V016',
        sectionId: 'SEE1',
        title: 'Retirement and HSA Planning',
        description: 'IRA vs. Roth selection, RMD strategies, HSA triple tax advantage',
        duration: 25,
        order: 16,
        status: 'planned',
        topics: ['Retirement Planning', 'HSA', 'Backdoor Roth', 'RMD Planning']
      },
      
      // Domain 6: Specialized Returns (2 videos)
      {
        id: 'SEE1-V017',
        sectionId: 'SEE1',
        title: 'Amended Returns and Foreign Income',
        description: 'Form 1040-X, FEIE, FTC, FBAR, Form 8938',
        duration: 30,
        order: 17,
        status: 'planned',
        topics: ['Amended Returns', 'FEIE', 'Foreign Tax Credit', 'FBAR']
      },
      {
        id: 'SEE1-V018',
        sectionId: 'SEE1',
        title: 'Estate and Gift Tax Basics',
        description: 'Annual exclusion, lifetime exemption, stepped-up basis, gift basis rules',
        duration: 25,
        order: 18,
        status: 'planned',
        topics: ['Gift Tax', 'Estate Tax', 'Stepped-Up Basis', 'Carryover Basis']
      },
    ]
  },
  
  // ========================================
  // SEE PART 2: BUSINESSES
  // ========================================
  {
    sectionId: 'SEE2',
    title: 'Part 2: Businesses',
    totalVideos: 18,
    estimatedTotalMinutes: 480,
    videos: [
      // Domain 1: Business Entities (6 videos)
      {
        id: 'SEE2-V001',
        sectionId: 'SEE2',
        title: 'Sole Proprietorships (Schedule C)',
        description: 'Schedule C reporting, income, expenses, SE tax implications',
        duration: 25,
        order: 1,
        status: 'planned',
        topics: ['Schedule C', 'Sole Proprietorship', 'Business Expenses']
      },
      {
        id: 'SEE2-V002',
        sectionId: 'SEE2',
        title: 'Partnership Basics (Form 1065)',
        description: 'Formation, Schedule K-1, guaranteed payments, special allocations',
        duration: 35,
        order: 2,
        status: 'planned',
        topics: ['Partnerships', 'Form 1065', 'K-1', 'Guaranteed Payments']
      },
      {
        id: 'SEE2-V003',
        sectionId: 'SEE2',
        title: 'Partner Basis and Distributions',
        description: 'Inside vs. outside basis, distribution rules, ordering rules',
        duration: 30,
        order: 3,
        status: 'planned',
        topics: ['Partner Basis', 'Distributions', 'At-Risk', 'Passive Loss']
      },
      {
        id: 'SEE2-V004',
        sectionId: 'SEE2',
        title: 'C Corporation Taxation (Form 1120)',
        description: 'Corporate tax rate, DRD, accumulated earnings tax, PHC rules',
        duration: 30,
        order: 4,
        status: 'planned',
        topics: ['C Corporation', 'Form 1120', 'Corporate Tax', 'DRD']
      },
      {
        id: 'SEE2-V005',
        sectionId: 'SEE2',
        title: 'S Corporation Basics (Form 1120-S)',
        description: 'Election requirements, eligibility, Form 2553, AAA',
        duration: 30,
        order: 5,
        status: 'planned',
        topics: ['S Corporation', 'Form 1120-S', 'Election', 'AAA']
      },
      {
        id: 'SEE2-V006',
        sectionId: 'SEE2',
        title: 'S Corp Shareholder Basis and Reasonable Compensation',
        description: 'Stock basis, debt basis, reasonable salary requirements',
        duration: 30,
        order: 6,
        status: 'planned',
        topics: ['Shareholder Basis', 'Reasonable Compensation', 'Built-In Gains']
      },
      
      // Domain 2: Business Tax Preparation (9 videos)
      {
        id: 'SEE2-V007',
        sectionId: 'SEE2',
        title: 'Accounting Methods',
        description: 'Cash vs. accrual, hybrid methods, inventory methods, Form 3115',
        duration: 25,
        order: 7,
        status: 'planned',
        topics: ['Cash Method', 'Accrual Method', 'Inventory', 'UNICAP']
      },
      {
        id: 'SEE2-V008',
        sectionId: 'SEE2',
        title: 'Income Recognition',
        description: 'Constructive receipt, installment sales, like-kind exchanges',
        duration: 25,
        order: 8,
        status: 'planned',
        topics: ['Income Recognition', 'Installment Sales', '§1031 Exchanges']
      },
      {
        id: 'SEE2-V009',
        sectionId: 'SEE2',
        title: 'Business Expenses',
        description: 'Ordinary and necessary, meals, entertainment, start-up costs',
        duration: 25,
        order: 9,
        status: 'planned',
        topics: ['Business Expenses', 'Meals', 'Start-Up Costs', 'Organizational Costs']
      },
      {
        id: 'SEE2-V010',
        sectionId: 'SEE2',
        title: 'Depreciation: MACRS Basics',
        description: 'Recovery periods, conventions, methods, real property',
        duration: 30,
        order: 10,
        status: 'planned',
        topics: ['MACRS', 'Recovery Periods', 'Conventions', 'Methods']
      },
      {
        id: 'SEE2-V011',
        sectionId: 'SEE2',
        title: 'Section 179 and Bonus Depreciation',
        description: '§179 limits, bonus depreciation phase-out, listed property',
        duration: 30,
        order: 11,
        status: 'planned',
        topics: ['Section 179', 'Bonus Depreciation', 'Listed Property', 'Luxury Autos']
      },
      {
        id: 'SEE2-V012',
        sectionId: 'SEE2',
        title: 'Employment Taxes',
        description: 'FICA, FUTA, deposit schedules, Forms 940/941',
        duration: 30,
        order: 12,
        status: 'planned',
        topics: ['FICA', 'FUTA', 'Form 940', 'Form 941', 'Deposits']
      },
      {
        id: 'SEE2-V013',
        sectionId: 'SEE2',
        title: 'Business Credits Overview',
        description: 'General business credit, R&D credit, WOTC, disabled access',
        duration: 25,
        order: 13,
        status: 'planned',
        topics: ['Business Credits', 'R&D Credit', 'WOTC', 'Form 3800']
      },
      {
        id: 'SEE2-V014',
        sectionId: 'SEE2',
        title: 'Corporate Estimated Tax',
        description: 'Deposit requirements, large corporation rules, annualization',
        duration: 20,
        order: 14,
        status: 'planned',
        topics: ['Corporate Estimated Tax', 'Large Corporations', 'Safe Harbor']
      },
      {
        id: 'SEE2-V015',
        sectionId: 'SEE2',
        title: 'QBI Deduction (§199A)',
        description: 'Qualified business income, limitations, SSTB, calculations',
        duration: 30,
        order: 15,
        status: 'planned',
        topics: ['QBI Deduction', '§199A', 'SSTB', 'W-2 Limitation']
      },
      
      // Domain 3: Specialized Returns (3 videos)
      {
        id: 'SEE2-V016',
        sectionId: 'SEE2',
        title: 'Retirement Plans for Small Business',
        description: 'SEP-IRA, SIMPLE, Solo 401(k), contribution limits',
        duration: 30,
        order: 16,
        status: 'planned',
        topics: ['SEP-IRA', 'SIMPLE IRA', 'Solo 401(k)', 'Retirement Plans']
      },
      {
        id: 'SEE2-V017',
        sectionId: 'SEE2',
        title: 'Passive Activity Rules',
        description: 'Material participation, rental property, $25,000 allowance, grouping',
        duration: 30,
        order: 17,
        status: 'planned',
        topics: ['Passive Activities', 'Material Participation', 'Rental Losses']
      },
      {
        id: 'SEE2-V018',
        sectionId: 'SEE2',
        title: 'Trusts, Estates, and Tax-Exempt Organizations',
        description: 'Form 1041 basics, Form 990 series, UBTI',
        duration: 30,
        order: 18,
        status: 'planned',
        topics: ['Trusts', 'Estates', 'Exempt Organizations', 'UBTI']
      },
    ]
  },
  
  // ========================================
  // SEE PART 3: REPRESENTATION
  // ========================================
  {
    sectionId: 'SEE3',
    title: 'Part 3: Representation, Practices, and Procedures',
    totalVideos: 15,
    estimatedTotalMinutes: 360,
    videos: [
      // Domain 1: Practices and Procedures (4 videos)
      {
        id: 'SEE3-V001',
        sectionId: 'SEE3',
        title: 'Power of Attorney (Form 2848)',
        description: 'Authorization levels, CAF number, signing authority, revocation',
        duration: 25,
        order: 1,
        status: 'planned',
        topics: ['Form 2848', 'Power of Attorney', 'CAF', 'Representation']
      },
      {
        id: 'SEE3-V002',
        sectionId: 'SEE3',
        title: 'Tax Information Authorization and Other Forms',
        description: 'Form 8821 vs. 2848, Form 56, third-party designee',
        duration: 20,
        order: 2,
        status: 'planned',
        topics: ['Form 8821', 'Form 56', 'Information Authorization']
      },
      {
        id: 'SEE3-V003',
        sectionId: 'SEE3',
        title: 'IRS Notices and Taxpayer Advocate',
        description: 'CP notices, letter notices, Taxpayer Advocate Service, Form 911',
        duration: 25,
        order: 3,
        status: 'planned',
        topics: ['IRS Notices', 'Taxpayer Advocate', 'CP Notices', 'Form 911']
      },
      {
        id: 'SEE3-V004',
        sectionId: 'SEE3',
        title: 'Practitioner Responsibilities',
        description: 'PTIN requirements, signature requirements, record retention',
        duration: 20,
        order: 4,
        status: 'planned',
        topics: ['PTIN', 'Preparer Requirements', 'Record Retention']
      },
      
      // Domain 2: Circular 230 (4 videos)
      {
        id: 'SEE3-V005',
        sectionId: 'SEE3',
        title: 'Who May Practice Before the IRS',
        description: 'Attorneys, CPAs, EAs, enrolled actuaries, limited practitioners',
        duration: 25,
        order: 5,
        status: 'planned',
        topics: ['Who May Practice', 'Circular 230', 'Practitioner Types']
      },
      {
        id: 'SEE3-V006',
        sectionId: 'SEE3',
        title: 'Circular 230: Due Diligence and Best Practices',
        description: 'Due diligence requirements, reliance on client info, best practices',
        duration: 25,
        order: 6,
        status: 'planned',
        topics: ['Due Diligence', 'Client Information', 'Best Practices']
      },
      {
        id: 'SEE3-V007',
        sectionId: 'SEE3',
        title: 'Conflicts of Interest and Fees',
        description: 'Conflict rules, contingent fees, advertising, solicitation',
        duration: 25,
        order: 7,
        status: 'planned',
        topics: ['Conflicts of Interest', 'Contingent Fees', 'Advertising']
      },
      {
        id: 'SEE3-V008',
        sectionId: 'SEE3',
        title: 'Sanctions and Disciplinary Proceedings',
        description: 'Censure, suspension, disbarment, OPR proceedings',
        duration: 20,
        order: 8,
        status: 'planned',
        topics: ['Sanctions', 'Disbarment', 'OPR', 'Discipline']
      },
      
      // Domain 3: Specific Representation Areas (4 videos)
      {
        id: 'SEE3-V009',
        sectionId: 'SEE3',
        title: 'Audits and Examinations',
        description: 'Types of audits, taxpayer rights, appeals process',
        duration: 25,
        order: 9,
        status: 'planned',
        topics: ['Audits', 'Examinations', 'Taxpayer Rights', 'Appeals']
      },
      {
        id: 'SEE3-V010',
        sectionId: 'SEE3',
        title: 'Collection Process: Liens and Levies',
        description: 'Federal tax lien, levy procedures, collection rights',
        duration: 25,
        order: 10,
        status: 'planned',
        topics: ['Tax Lien', 'Levy', 'Collection', 'CDP Hearing']
      },
      {
        id: 'SEE3-V011',
        sectionId: 'SEE3',
        title: 'Offers in Compromise',
        description: 'OIC grounds, application process, payment options',
        duration: 30,
        order: 11,
        status: 'planned',
        topics: ['Offers in Compromise', 'Doubt as to Collectibility', 'Form 656']
      },
      {
        id: 'SEE3-V012',
        sectionId: 'SEE3',
        title: 'Installment Agreements and Innocent Spouse',
        description: 'IA types, guaranteed IA, innocent spouse relief',
        duration: 25,
        order: 12,
        status: 'planned',
        topics: ['Installment Agreements', 'Innocent Spouse', 'Form 8857']
      },
      
      // Domain 4: Filing Process (3 videos)
      {
        id: 'SEE3-V013',
        sectionId: 'SEE3',
        title: 'Amended Returns and Statute of Limitations',
        description: 'Form 1040-X, refund claims, assessment periods, fraud',
        duration: 25,
        order: 13,
        status: 'planned',
        topics: ['Amended Returns', '1040-X', 'Statute of Limitations']
      },
      {
        id: 'SEE3-V014',
        sectionId: 'SEE3',
        title: 'Penalties and Interest',
        description: 'Failure to file, failure to pay, accuracy-related, preparer penalties',
        duration: 30,
        order: 14,
        status: 'planned',
        topics: ['Penalties', 'Interest', 'Reasonable Cause', 'FTA']
      },
      {
        id: 'SEE3-V015',
        sectionId: 'SEE3',
        title: 'Document Retention and SEE Part 3 Strategy',
        description: 'Record keeping requirements, exam strategies for Part 3',
        duration: 20,
        order: 15,
        status: 'planned',
        topics: ['Document Retention', 'Exam Strategy', 'Part 3 Tips']
      },
    ]
  },
];

// Summary of video content
export const EA_VIDEO_SUMMARY = {
  totalSections: 3,
  totalVideos: EA_VIDEO_CONTENT.reduce((sum, section) => sum + section.videos.length, 0),
  totalMinutes: EA_VIDEO_CONTENT.reduce((sum, section) => sum + section.estimatedTotalMinutes, 0),
  bySection: EA_VIDEO_CONTENT.map(section => ({
    sectionId: section.sectionId,
    title: section.title,
    videoCount: section.videos.length,
    minutes: section.estimatedTotalMinutes,
  })),
};

// Helper to get videos by status
export function getVideosByStatus(status: VideoStatus): VideoLesson[] {
  return EA_VIDEO_CONTENT.flatMap(section => 
    section.videos.filter(video => video.status === status)
  );
}

// Helper to get all videos for a section
export function getVideosForSection(sectionId: string): VideoLesson[] {
  const section = EA_VIDEO_CONTENT.find(s => s.sectionId === sectionId);
  return section ? section.videos : [];
}
