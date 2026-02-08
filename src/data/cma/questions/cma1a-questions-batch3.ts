/**
 * CMA Part 1, Section A: External Financial Reporting - Questions Batch 3 (Q51-75)
 * Weight: 15% of Part 1 Exam
 * 
 * Blueprint Areas:
 * - CMA1-A: External Financial Reporting Decisions
 * 
 * Topics covered:
 * - Lease Accounting (ASC 842)
 * - Deferred Taxes
 * - Pension Accounting
 * - EPS Calculations
 * - SEC Reporting
 * - Segment Reporting
 */

import { Question } from '../../../types';

export const CMA1A_QUESTIONS_BATCH3: Question[] = [
  // ==========================================
  // Lease Accounting (ASC 842)
  // ==========================================
  {
    id: 'cma1-a-051',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Lease Accounting',
    subtopic: 'Lease Classification',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under ASC 842, a lease is classified as a finance lease if it meets any of the following criteria EXCEPT:',
    options: [
      'Transfer of ownership at end of lease term',
      'Bargain purchase option',
      'Lease term is 50% or more of the asset\'s useful life',
      'Present value of lease payments equals or exceeds 90% of fair value'
    ],
    correctAnswer: 2,
    explanation: 'The threshold for lease term is 75% or more (not 50%) of the remaining economic life of the asset. The other criteria listed (ownership transfer, bargain purchase option, and 90% PV test) are accurate.',
    reference: 'ASC 842; Lease Accounting',
  },
  {
    id: 'cma1-a-052',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Lease Accounting',
    subtopic: 'Operating Lease',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For an operating lease under ASC 842, the lessee recognizes:',
    options: [
      'Only rent expense on a straight-line basis',
      'A right-of-use asset and lease liability, with single lease cost recognized straight-line',
      'No balance sheet recognition, only footnote disclosure',
      'Depreciation expense and interest expense separately'
    ],
    correctAnswer: 1,
    explanation: 'Under ASC 842, lessees must recognize both operating and finance leases on the balance sheet as a right-of-use (ROU) asset and lease liability. For operating leases, a single lease cost is recognized on a straight-line basis.',
    reference: 'ASC 842; Operating Lease Accounting',
  },
  {
    id: 'cma1-a-053',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Lease Accounting',
    subtopic: 'Initial Measurement',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Apex Corp. signs a 5-year lease requiring annual payments of $50,000 at the end of each year. The discount rate is 6%. The present value of an ordinary annuity of $1 for 5 years at 6% is 4.2124. What is the initial lease liability?',
    options: [
      '$250,000',
      '$210,620',
      '$212,124',
      '$265,000'
    ],
    correctAnswer: 1,
    explanation: 'Lease Liability = Annual Payment × PV Factor = $50,000 × 4.2124 = $210,620. The lease liability is measured at the present value of future lease payments.',
    reference: 'ASC 842; Lease Liability Measurement',
  },
  {
    id: 'cma1-a-054',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Lease Accounting',
    subtopic: 'Right-of-Use Asset',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The right-of-use asset includes all of the following EXCEPT:',
    options: [
      'Initial measurement of lease liability',
      'Lease payments made at or before commencement',
      'Initial direct costs incurred by lessee',
      'Variable lease payments based on an index'
    ],
    correctAnswer: 3,
    explanation: 'Variable lease payments based on an index or rate are included in the lease liability (and thus ROU asset), but variable payments that are NOT based on an index (e.g., based on usage) are expensed as incurred and not capitalized.',
    reference: 'ASC 842; Right-of-Use Asset Components',
  },

  // ==========================================
  // Deferred Tax Assets and Liabilities
  // ==========================================
  {
    id: 'cma1-a-055',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Deferred Taxes',
    subtopic: 'Temporary Differences',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which of the following creates a deferred tax LIABILITY?',
    options: [
      'Warranty expenses recognized before paid',
      'Accelerated depreciation for tax, straight-line for book',
      'Unearned revenue taxed when received',
      'Allowance for doubtful accounts'
    ],
    correctAnswer: 1,
    explanation: 'Accelerated depreciation for tax creates higher deductions now, lowering current taxable income below book income. This means taxes will be higher in the future when book depreciation exceeds tax depreciation, creating a deferred tax liability.',
    reference: 'ASC 740; Deferred Tax Accounting',
  },
  {
    id: 'cma1-a-056',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Deferred Taxes',
    subtopic: 'Deferred Tax Asset',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Beacon Inc. has a temporary difference of $200,000 that will result in deductible amounts in future years. The enacted tax rate is 25%. What deferred tax asset should Beacon record?',
    options: [
      '$200,000',
      '$50,000',
      '$150,000',
      '$66,667'
    ],
    correctAnswer: 1,
    explanation: 'Deferred Tax Asset = Temporary Difference × Tax Rate = $200,000 × 25% = $50,000. Future deductible amounts create deferred tax assets because they will reduce future taxable income.',
    reference: 'ASC 740; Deferred Tax Calculations',
  },
  {
    id: 'cma1-a-057',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Deferred Taxes',
    subtopic: 'Valuation Allowance',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'A valuation allowance for deferred tax assets is required when:',
    options: [
      'The deferred tax asset exceeds $1 million',
      'It is more likely than not that all or a portion will not be realized',
      'The company has permanent differences',
      'Tax rates are expected to decrease'
    ],
    correctAnswer: 1,
    explanation: 'A valuation allowance reduces the deferred tax asset when it is "more likely than not" (greater than 50% probability) that some or all of the asset will not be realized. This is a judgment-based assessment.',
    reference: 'ASC 740; Valuation Allowance',
  },
  {
    id: 'cma1-a-058',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Deferred Taxes',
    subtopic: 'Rate Changes',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Delta Corp. has a deferred tax liability of $90,000 measured at a 30% tax rate. If the enacted tax rate changes to 25%, what adjustment is required?',
    options: [
      'Increase liability by $15,000',
      'Decrease liability by $15,000',
      'No adjustment needed until the difference reverses',
      'Restate prior period financial statements'
    ],
    correctAnswer: 1,
    explanation: 'Deferred tax accounts must be adjusted when enacted rates change. Original DTL: $90,000 (at 30%). New DTL: ($90,000 / 0.30) × 0.25 = $75,000. Adjustment: $90,000 - $75,000 = $15,000 decrease.',
    reference: 'ASC 740; Tax Rate Changes',
  },

  // ==========================================
  // Pension Accounting
  // ==========================================
  {
    id: 'cma1-a-059',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Pension Accounting',
    subtopic: 'Defined Benefit vs Defined Contribution',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'In a defined contribution pension plan, the employer\'s obligation is to:',
    options: [
      'Guarantee a specific retirement benefit amount',
      'Make specified contributions to the plan',
      'Manage investment risk for employees',
      'Maintain a minimum funding level'
    ],
    correctAnswer: 1,
    explanation: 'In a defined contribution plan (like a 401(k)), the employer\'s obligation is limited to making specified contributions. Investment risk and retirement benefit amounts are borne by the employee.',
    reference: 'Pension Accounting; ASC 715',
  },
  {
    id: 'cma1-a-060',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Pension Accounting',
    subtopic: 'Projected Benefit Obligation',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The Projected Benefit Obligation (PBO) differs from the Accumulated Benefit Obligation (ABO) because PBO:',
    options: [
      'Uses a higher discount rate',
      'Includes estimated future salary increases',
      'Excludes vested benefits',
      'Is always lower than ABO'
    ],
    correctAnswer: 1,
    explanation: 'PBO projects future benefits using estimated future salary levels, while ABO uses current salary levels. For pay-related plans, PBO is typically higher than ABO because it anticipates salary growth.',
    reference: 'ASC 715; Pension Obligations',
  },
  {
    id: 'cma1-a-061',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Pension Accounting',
    subtopic: 'Pension Cost Components',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Which component of net periodic pension cost typically REDUCES pension expense?',
    options: [
      'Service cost',
      'Interest cost',
      'Expected return on plan assets',
      'Amortization of prior service cost'
    ],
    correctAnswer: 2,
    explanation: 'Expected return on plan assets is subtracted when calculating net periodic pension cost, reducing pension expense. Service cost, interest cost, and amortization components add to pension expense.',
    reference: 'ASC 715; Net Periodic Pension Cost',
  },
  {
    id: 'cma1-a-062',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Pension Accounting',
    subtopic: 'Funded Status',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Echo Corp. has plan assets with a fair value of $800,000 and a PBO of $950,000. What should Echo report on its balance sheet?',
    options: [
      'Pension asset of $150,000',
      'Pension liability of $150,000',
      'No balance sheet recognition required',
      'Deferred pension cost of $150,000'
    ],
    correctAnswer: 1,
    explanation: 'The funded status (Plan Assets - PBO) must be reported on the balance sheet. $800,000 - $950,000 = -$150,000, indicating an underfunded plan, which is reported as a pension liability.',
    reference: 'ASC 715; Balance Sheet Recognition',
  },

  // ==========================================
  // Earnings Per Share (EPS)
  // ==========================================
  {
    id: 'cma1-a-063',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Earnings Per Share',
    subtopic: 'Basic EPS',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Fox Inc. has net income of $500,000, preferred dividends of $50,000, and 100,000 weighted-average common shares outstanding. What is basic EPS?',
    options: [
      '$5.00',
      '$4.50',
      '$5.50',
      '$4.00'
    ],
    correctAnswer: 1,
    explanation: 'Basic EPS = (Net Income - Preferred Dividends) / Weighted Average Common Shares = ($500,000 - $50,000) / 100,000 = $4.50. Preferred dividends are subtracted because EPS measures earnings available to common shareholders.',
    reference: 'ASC 260; Basic EPS',
  },
  {
    id: 'cma1-a-064',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Earnings Per Share',
    subtopic: 'Diluted EPS - Options',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Grant Corp. has 50,000 stock options outstanding with an exercise price of $20. The average market price is $30. Using the treasury stock method, how many incremental shares are added for diluted EPS?',
    options: [
      '50,000 shares',
      '16,667 shares',
      '33,333 shares',
      '25,000 shares'
    ],
    correctAnswer: 1,
    explanation: 'Treasury Stock Method: Shares from exercise = 50,000. Proceeds = 50,000 × $20 = $1,000,000. Shares repurchased = $1,000,000 / $30 = 33,333. Incremental shares = 50,000 - 33,333 = 16,667.',
    reference: 'ASC 260; Treasury Stock Method',
  },
  {
    id: 'cma1-a-065',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Earnings Per Share',
    subtopic: 'Antidilution',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Stock options are antidilutive and excluded from diluted EPS when:',
    options: [
      'The company has a net loss',
      'The exercise price exceeds the market price',
      'The options are fully vested',
      'Both A and B'
    ],
    correctAnswer: 3,
    explanation: 'Options are antidilutive when: (1) the company has a net loss (adding shares would reduce the loss per share), OR (2) the exercise price exceeds market price (out-of-the-money options add no proceeds benefit).',
    reference: 'ASC 260; Antidilutive Securities',
  },
  {
    id: 'cma1-a-066',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Earnings Per Share',
    subtopic: 'Convertible Securities',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Harbor Corp. has $1,000,000 of 8% convertible bonds converted into 40,000 common shares. The tax rate is 25%. For diluted EPS, what is the numerator adjustment?',
    options: [
      '$80,000',
      '$60,000',
      '$20,000',
      '$100,000'
    ],
    correctAnswer: 1,
    explanation: 'Interest expense added back = $1,000,000 × 8% = $80,000. After-tax adjustment = $80,000 × (1 - 0.25) = $60,000. This is added to the numerator because if converted, interest would not be paid.',
    reference: 'ASC 260; If-Converted Method',
  },

  // ==========================================
  // SEC Reporting Requirements
  // ==========================================
  {
    id: 'cma1-a-067',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'SEC Reporting',
    subtopic: 'Form 10-K',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 10-K is filed:',
    options: [
      'Monthly with quarterly updates',
      'Annually within 60-90 days after fiscal year end',
      'Only when material events occur',
      'Semi-annually'
    ],
    correctAnswer: 1,
    explanation: 'Form 10-K is the annual report filed with the SEC. Large accelerated filers have 60 days, accelerated filers have 75 days, and non-accelerated filers have 90 days after fiscal year end.',
    reference: 'SEC Regulation S-K; Form 10-K Requirements',
  },
  {
    id: 'cma1-a-068',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'SEC Reporting',
    subtopic: 'Form 8-K',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Which event would require a Form 8-K filing?',
    options: [
      'Routine quarterly earnings announcement',
      'Entry into a material definitive agreement',
      'Annual stockholder meeting',
      'Changes in accounting estimates'
    ],
    correctAnswer: 1,
    explanation: 'Form 8-K reports unscheduled material events such as material agreements, acquisitions, changes in control, bankruptcy, auditor changes, and director resignations. Routine earnings are in 10-Q/10-K.',
    reference: 'SEC Form 8-K Triggering Events',
  },
  {
    id: 'cma1-a-069',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'SEC Reporting',
    subtopic: 'MD&A',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Management\'s Discussion and Analysis (MD&A) is required to discuss all of the following EXCEPT:',
    options: [
      'Known trends and uncertainties',
      'Liquidity and capital resources',
      'Detailed competitor analysis',
      'Results of operations'
    ],
    correctAnswer: 2,
    explanation: 'MD&A requires discussion of results, liquidity, capital resources, and known trends/uncertainties. Detailed competitor analysis is not a required element, though competitive factors may be mentioned in risk discussions.',
    reference: 'SEC Regulation S-K Item 303',
  },
  {
    id: 'cma1-a-070',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'SEC Reporting',
    subtopic: 'SOX Compliance',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under SOX Section 404, management is required to:',
    options: [
      'Personally guarantee financial statement accuracy',
      'Assess and report on internal control over financial reporting',
      'Approve all material transactions over $10,000',
      'Conduct surprise audits quarterly'
    ],
    correctAnswer: 1,
    explanation: 'SOX Section 404 requires management to annually assess and report on the effectiveness of internal control over financial reporting (ICFR). For larger companies, the external auditor must also attest to this assessment.',
    reference: 'Sarbanes-Oxley Act Section 404',
  },

  // ==========================================
  // Segment Reporting
  // ==========================================
  {
    id: 'cma1-a-071',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Segment Reporting',
    subtopic: 'Operating Segments',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under ASC 280, an operating segment must meet all of the following criteria EXCEPT:',
    options: [
      'Engages in business activities that may earn revenues',
      'Results are regularly reviewed by the chief operating decision maker',
      'Discrete financial information is available',
      'Has more than 100 employees'
    ],
    correctAnswer: 3,
    explanation: 'Employee count is not a criterion for operating segment identification. The three criteria are: (1) engages in revenue-generating activities, (2) CODM reviews results, and (3) discrete financial information is available.',
    reference: 'ASC 280; Operating Segment Definition',
  },
  {
    id: 'cma1-a-072',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Segment Reporting',
    subtopic: 'Quantitative Thresholds',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'An operating segment is reportable if it meets which percentage threshold for revenue, profit/loss, or assets?',
    options: [
      '5% or more',
      '10% or more',
      '15% or more',
      '20% or more'
    ],
    correctAnswer: 1,
    explanation: 'A segment is reportable if its revenue, absolute profit/loss, or assets is 10% or more of the combined totals. Additionally, reportable segments must represent at least 75% of total external revenues.',
    reference: 'ASC 280; Quantitative Thresholds',
  },
  {
    id: 'cma1-a-073',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Segment Reporting',
    subtopic: 'Reconciliation',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Segment disclosures require reconciliation of segment totals to:',
    options: [
      'Budgeted amounts',
      'Consolidated financial statement amounts',
      'Prior year segment amounts',
      'Industry averages'
    ],
    correctAnswer: 1,
    explanation: 'ASC 280 requires reconciliation of total segment revenues, profit/loss, assets, and other significant items to the corresponding consolidated financial statement amounts.',
    reference: 'ASC 280; Segment Reconciliation Requirements',
  },

  // ==========================================
  // Fair Value Measurements
  // ==========================================
  {
    id: 'cma1-a-074',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Fair Value',
    subtopic: 'Fair Value Hierarchy',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A company uses observable prices from similar assets in active markets. This represents which level in the fair value hierarchy?',
    options: [
      'Level 1',
      'Level 2',
      'Level 3',
      'Not covered by fair value hierarchy'
    ],
    correctAnswer: 1,
    explanation: 'Level 2 inputs are observable inputs other than Level 1 prices, including quoted prices for similar assets in active markets. Level 1 uses identical assets; Level 3 uses unobservable inputs.',
    reference: 'ASC 820; Fair Value Hierarchy',
  },
  {
    id: 'cma1-a-075',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-A',
    topic: 'Fair Value',
    subtopic: 'Level 3 Inputs',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'Level 3 fair value measurements require:',
    options: [
      'Use of quoted prices from active markets',
      'Enhanced disclosures including valuation techniques and sensitivity analysis',
      'Third-party appraisal only',
      'Board of directors approval'
    ],
    correctAnswer: 1,
    explanation: 'Level 3 measurements use unobservable inputs and require enhanced disclosures including valuation techniques, inputs used, reconciliation of beginning/ending balances, and sensitivity to changes in unobservable inputs.',
    reference: 'ASC 820; Level 3 Disclosure Requirements',
  },
];
