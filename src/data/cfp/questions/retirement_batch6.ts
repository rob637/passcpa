/**
 * CFP Retirement Questions - Batch 6
 * Domain 6: Retirement Savings and Income Planning (19% of exam)
 * 25 additional questions covering advanced retirement topics
 */

import { Question } from '../../../types';

export const CFP_RETIREMENT_BATCH6_QUESTIONS: Question[] = [
  // RET-1: Retirement Planning Analysis
  {
    id: 'CFP-RET-B6-001',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Retirement Planning',
    subtopic: 'Sequence Risk',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Sequence of returns risk is most problematic:',
    options: [
      'A) During the early accumulation phase',
      'B) During years immediately before and after retirement when the portfolio is largest',
      'C) Only when investing in bonds',
      'D) When using annuities exclusively'
    ],
    correctAnswer: 1,
    explanation: 'Sequence risk matters most when withdrawals occur during market downturns, especially near retirement when the portfolio is largest. Poor returns early in retirement deplete assets faster, leaving less to benefit from later recovery. Mitigation strategies include bucket approaches, guardrails, and maintaining adequate cash reserves.'
  },
  {
    id: 'CFP-RET-B6-002',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Retirement Planning',
    subtopic: 'Guardrails Strategy',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A "guardrails" withdrawal strategy:',
    options: [
      'A) Fixes the withdrawal amount regardless of portfolio performance',
      'B) Adjusts withdrawals based on portfolio performance to avoid depleting assets too quickly',
      'C) Requires 100% stock allocation',
      'D) Only allows withdrawals from bonds'
    ],
    correctAnswer: 1,
    explanation: 'Guardrails strategies (like Guyton-Klinger or dynamic spending rules) adjust withdrawals based on portfolio performance. If the portfolio drops significantly, spending decreases; if it grows substantially, spending may increase. This flexibility reduces sequence risk compared to fixed withdrawal approaches.'
  },
  {
    id: 'CFP-RET-B6-003',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Retirement Planning',
    subtopic: 'Income Floor',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'An income floor strategy in retirement planning:',
    options: [
      'A) Maximizes investment risk for higher returns',
      'B) Creates guaranteed income from secure sources (Social Security, pensions, annuities) to cover essential expenses',
      'C) Invests entirely in equities',
      'D) Relies solely on portfolio withdrawals'
    ],
    correctAnswer: 1,
    explanation: 'Income floor strategies ensure essential expenses (housing, food, healthcare, insurance) are covered by guaranteed income sources. This provides psychological security and allows the remaining portfolio to be invested more aggressively for discretionary spending. Social Security, pensions, and SPIAs are common floor components.'
  },
  // RET-2: More Employer Plans
  {
    id: 'CFP-RET-B6-004',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Employer Plans',
    subtopic: 'Auto-Escalation',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Auto-escalation in 401(k) plans:',
    options: [
      'A) Automatically reduces contribution rates over time',
      'B) Automatically increases contribution rates annually until a target is reached',
      'C) Requires employee action each year',
      'D) Only applies to employer matching'
    ],
    correctAnswer: 1,
    explanation: 'Auto-escalation automatically increases employee contribution rates annually (typically 1% per year) until reaching a target rate (often 10-15%). Combined with auto-enrollment, this addresses inertia and helps employees save adequately. Employees can opt out or change rates but many don\'t, benefiting from the defaults.'
  },
  {
    id: 'CFP-RET-B6-005',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Employer Plans',
    subtopic: 'In-Service Distributions',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'In-service distributions from 401(k) plans are typically available:',
    options: [
      'A) At any time for active employees',
      'B) After reaching age 59½ or meeting other plan-specific requirements',
      'C) Only for employer contributions',
      'D) Never for active employees'
    ],
    correctAnswer: 1,
    explanation: 'Most 401(k) plans allow in-service distributions after age 59½. Some plans permit earlier distributions under specific circumstances (hardship, disability, after-tax contributions). In-service distributions enable rollover to IRAs for more investment options or Roth conversions while still employed.'
  },
  {
    id: 'CFP-RET-B6-006',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Employer Plans',
    subtopic: 'Forfeitures',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Forfeitures in defined contribution plans are funds that:',
    options: [
      'A) Are returned to employees upon termination',
      'B) Are unvested employer contributions that revert to the plan when employees leave before vesting',
      'C) Are always distributed equally to remaining participants',
      'D) Must be donated to charity'
    ],
    correctAnswer: 1,
    explanation: 'Forfeitures occur when employees leave before fully vesting in employer contributions. These funds revert to the plan and can be used to reduce future employer contributions, pay plan expenses, or allocate to remaining participants. Forfeiture timing and use varies by plan document.'
  },
  // RET-3: More IRA Topics
  {
    id: 'CFP-RET-B6-007',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'IRAs',
    subtopic: 'Spousal IRA',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A spousal IRA allows a non-working spouse to:',
    options: [
      'A) Contribute based on the working spouse\'s income',
      'B) Make only catch-up contributions',
      'C) Contribute unlimited amounts',
      'D) Only receive rollover from the working spouse'
    ],
    correctAnswer: 0,
    explanation: 'Spousal IRAs allow a non-working or low-earning spouse to contribute up to the annual limit ($7,000 for 2024, plus $1,000 catch-up if 50+) as long as the couple files jointly and the working spouse has sufficient earned income to cover both contributions. This maintains retirement savings for caregivers and non-working spouses.'
  },
  {
    id: 'CFP-RET-B6-008',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'IRAs',
    subtopic: 'Investment Options',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'IRAs cannot invest in:',
    options: [
      'A) Stocks and bonds',
      'B) Life insurance and collectibles',
      'C) Mutual funds and ETFs',
      'D) Real estate'
    ],
    correctAnswer: 1,
    explanation: 'IRAs prohibit investments in life insurance (except some exceptions for qualified plans) and collectibles (art, antiques, gems, stamps, coins except certain U.S. coins, alcoholic beverages). Most other investments are permitted, including stocks, bonds, mutual funds, ETFs, and real estate (though real estate requires a self-directed IRA).'
  },
  {
    id: 'CFP-RET-B6-009',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'IRAs',
    subtopic: 'Prohibited Transactions',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A prohibited transaction with an IRA includes:',
    options: [
      'A) Contributing the maximum amount',
      'B) Selling property to or buying property from disqualified persons, or using IRA assets for personal benefit',
      'C) Rolling over to another IRA',
      'D) Converting to a Roth IRA'
    ],
    correctAnswer: 1,
    explanation: 'Prohibited transactions include transactions between the IRA and disqualified persons (owner, family members, fiduciaries), such as selling property to the IRA, borrowing from it, or using IRA property personally. Consequences can include immediate taxation of the entire IRA and penalties.'
  },
  // RET-4: More Distribution Topics
  {
    id: 'CFP-RET-B6-010',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Distributions',
    subtopic: 'Uniform Lifetime Table',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The Uniform Lifetime Table is used for RMD calculations when:',
    options: [
      'A) The beneficiary is more than 10 years younger than the owner',
      'B) The owner is taking RMDs and the sole beneficiary is not a spouse more than 10 years younger',
      'C) The owner is under age 59½',
      'D) Only for inherited IRAs'
    ],
    correctAnswer: 1,
    explanation: 'Most IRA owners use the Uniform Lifetime Table for RMD calculations. The Joint Life and Last Survivor Table is only used when the sole beneficiary is a spouse more than 10 years younger, resulting in smaller RMDs. The Single Life Expectancy Table is used for inherited IRAs.'
  },
  {
    id: 'CFP-RET-B6-011',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Distributions',
    subtopic: 'Still-Working Exception',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The still-working exception for RMDs allows:',
    options: [
      'A) Delay of all IRA RMDs while employed',
      'B) Delay of RMDs from current employer\'s plan (not IRAs) if still working and not a 5% owner',
      'C) Exemption from all RMDs permanently',
      'D) Early distributions without penalty'
    ],
    correctAnswer: 1,
    explanation: 'The still-working exception allows employees who are not 5% owners to delay RMDs from their current employer\'s retirement plan until they actually retire. It does NOT apply to IRAs or plans from prior employers. This allows continued tax-deferred growth while working past the RMD age.'
  },
  {
    id: 'CFP-RET-B6-012',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Distributions',
    subtopic: 'Pro-Rata Rule',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The pro-rata rule for IRA distributions means:',
    options: [
      'A) All distributions are tax-free',
      'B) Distributions from IRAs containing both pre-tax and after-tax amounts are taxed proportionally across all traditional IRAs',
      'C) Roth conversions are always fully taxable',
      'D) Only the specific IRA distributed affects taxation'
    ],
    correctAnswer: 1,
    explanation: 'The pro-rata rule aggregates all traditional, SEP, and SIMPLE IRAs for determining the taxable portion of distributions. Even if withdrawing from an IRA with only after-tax contributions, the taxable portion is based on the ratio of after-tax to total IRA assets across all accounts. This affects backdoor Roth conversion planning.'
  },
  // RET-5: More Social Security
  {
    id: 'CFP-RET-B6-013',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Social Security',
    subtopic: 'Restricted Application',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Under current rules, a restricted application for spousal benefits only is available to:',
    options: [
      'A) Anyone who is married',
      'B) Only those born before January 2, 1954 (grandfathered)',
      'C) Anyone who waits until FRA to claim',
      'D) Only widows and widowers'
    ],
    correctAnswer: 1,
    explanation: 'The Bipartisan Budget Act of 2015 eliminated restricted applications for those born after January 1, 1954. Now, filing for any benefit automatically files for all eligible benefits. Those born before January 2, 1954 can still file a restricted application for spousal benefits at FRA while delaying their own benefit to earn delayed credits.'
  },
  {
    id: 'CFP-RET-B6-014',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Social Security',
    subtopic: 'Widow/Widower Benefits',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A surviving spouse can claim survivor benefits starting at age:',
    options: [
      'A) 72',
      'B) 62',
      'C) 60 (or 50 if disabled)',
      'D) FRA only'
    ],
    correctAnswer: 2,
    explanation: 'Surviving spouses can claim reduced survivor benefits as early as age 60 (50 if disabled). Benefits increase up to survivor FRA. A widow(er) can strategically claim one benefit (own or survivor) early and switch to the larger benefit later. Remarriage before age 60 typically ends eligibility for deceased spouse\'s benefits.'
  },
  {
    id: 'CFP-RET-B6-015',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Social Security',
    subtopic: 'Taxation of Benefits',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Social Security benefits can be up to what percentage taxable?',
    options: [
      'A) 100%',
      'B) 85%',
      'C) 50%',
      'D) 0%—Social Security is never taxable'
    ],
    correctAnswer: 1,
    explanation: 'Up to 85% of Social Security benefits can be taxable depending on "combined income" (AGI + nontaxable interest + 50% of SS benefits). Below $25K (single) or $32K (MFJ), benefits are tax-free. Between thresholds, up to 50% is taxable. Above $34K (single) or $44K (MFJ), up to 85% is taxable.'
  },
  // RET-1: More Planning Concepts
  {
    id: 'CFP-RET-B6-016',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Retirement Planning',
    subtopic: 'Replacement Ratio',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The income replacement ratio approach to retirement planning:',
    options: [
      'A) Assumes 100% of pre-retirement income is needed',
      'B) Estimates retirement income needs as a percentage (typically 70-80%) of pre-retirement income',
      'C) Ignores Social Security in calculations',
      'D) Is only used for early retirees'
    ],
    correctAnswer: 1,
    explanation: 'Replacement ratios estimate needed retirement income as a percentage of pre-retirement income, typically 70-80%. The reduction accounts for eliminated work expenses, taxes, and savings. The expense method is more precise but replacement ratios provide a useful quick estimate. Higher earners often need lower ratios.'
  },
  {
    id: 'CFP-RET-B6-017',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-1',
    topic: 'Retirement Planning',
    subtopic: 'Longevity Insurance',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A deferred income annuity (DIA) or longevity insurance product:',
    options: [
      'A) Provides immediate income from purchase',
      'B) Begins payments at a future age (often 80-85) to insure against outliving assets',
      'C) Has no role in retirement planning',
      'D) Is only available through employer plans'
    ],
    correctAnswer: 1,
    explanation: 'DIAs (including QLACs in qualified accounts) provide payments starting at a future age, insuring against longevity risk. The delay allows for lower premiums or higher future payments. Knowing income is guaranteed from age 80-85+ allows more aggressive spending from other assets in earlier retirement years.'
  },
  // RET-2: More Plan Types
  {
    id: 'CFP-RET-B6-018',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Employer Plans',
    subtopic: 'Cash Balance Plans',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A cash balance pension plan:',
    options: [
      'A) Is a pure defined contribution plan',
      'B) Is a defined benefit plan with individual account balances that grow by annual credits and interest credits',
      'C) Has no employer contribution',
      'D) Cannot be combined with 401(k) plans'
    ],
    correctAnswer: 1,
    explanation: 'Cash balance plans are defined benefit plans where participants have hypothetical account balances. Each year they receive pay credits (often percentage of salary) and interest credits. The employer bears investment risk. Benefits are typically portable as lump sums. Often paired with 401(k) for high-employer contribution strategies.'
  },
  {
    id: 'CFP-RET-B6-019',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Employer Plans',
    subtopic: '403(b) Plans',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: '403(b) plans are available to employees of:',
    options: [
      'A) For-profit corporations only',
      'B) Public schools, certain tax-exempt organizations, and ministers',
      'C) State and local governments only',
      'D) Self-employed individuals'
    ],
    correctAnswer: 1,
    explanation: '403(b) plans serve public school employees, 501(c)(3) tax-exempt organization employees, and ministers. Similar to 401(k) plans in contribution limits and many rules. Historically limited to annuities, now most allow mutual fund investments. Special catch-up provisions for 15+ years of service may apply.'
  },
  {
    id: 'CFP-RET-B6-020',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'Employer Plans',
    subtopic: 'Profit Sharing',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A profit sharing plan differs from a money purchase pension plan in that:',
    options: [
      'A) Only profit sharing allows Roth contributions',
      'B) Profit sharing contributions are discretionary while money purchase requires fixed annual contributions',
      'C) Profit sharing has higher contribution limits',
      'D) Money purchase plans are not qualified'
    ],
    correctAnswer: 1,
    explanation: 'Profit sharing allows flexible employer contributions (0-25% of compensation annually based on profits and discretion). Money purchase pension plans require fixed annual contributions as a percentage of pay. Money purchase penalty for under-contribution makes them less flexible. Many employers prefer profit sharing for this flexibility.'
  },
  // RET-3/4: More IRA and Distribution
  {
    id: 'CFP-RET-B6-021',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'IRAs',
    subtopic: 'SEP IRA',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A SEP IRA contribution deadline for self-employed individuals is:',
    options: [
      'A) December 31 of the tax year',
      'B) Tax filing deadline including extensions (typically October 15)',
      'C) April 15 with no extensions',
      'D) 60 days after year-end'
    ],
    correctAnswer: 1,
    explanation: 'SEP contributions can be made up to the tax filing deadline including extensions. For self-employed individuals, this often means October 15 if extended. This provides flexibility to assess income and profit before determining contributions. Contributions are employer-only, up to 25% of compensation (20% of net SE income).'
  },
  {
    id: 'CFP-RET-B6-022',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Distributions',
    subtopic: 'SECURE 2.0 Changes',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'SECURE 2.0 changed the RMD age to:',
    options: [
      'A) 70½ for everyone',
      'B) 72 for everyone',
      'C) 73 (2023) and eventually 75 (2033)',
      'D) 65 for early retirees'
    ],
    correctAnswer: 2,
    explanation: 'SECURE 2.0 raised the RMD age to 73 for those reaching age 72 after 2022, and will raise it to 75 for those reaching 74 after 2032. This provides additional years of tax-deferred growth. SECURE 1.0 had raised it from 70½ to 72. The RMD penalty was also reduced from 50% to 25% (10% if corrected quickly).'
  },
  {
    id: 'CFP-RET-B6-023',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'Distributions',
    subtopic: 'Emergency Savings',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'SECURE 2.0\'s emergency savings provision allows 401(k) plans to offer:',
    options: [
      'A) Unlimited emergency withdrawals',
      'B) Pension-linked emergency savings accounts with after-tax contributions up to $2,500',
      'C) Emergency loans up to $50,000',
      'D) Pre-tax emergency savings'
    ],
    correctAnswer: 1,
    explanation: 'SECURE 2.0 permits 401(k), 403(b), and governmental 457(b) plans to offer emergency savings accounts (Sidecar accounts) funded with Roth/after-tax contributions up to $2,500 for non-highly compensated employees. First 4 withdrawals per year are penalty-free. This addresses emergency savings needs while maintaining retirement contributions.'
  },
  // RET-5: More Social Security
  {
    id: 'CFP-RET-B6-024',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Social Security',
    subtopic: 'Family Maximum',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The Social Security family maximum:',
    options: [
      'A) Has no limit on total family benefits',
      'B) Limits total benefits payable on one worker\'s record, typically 150-180% of their PIA',
      'C) Only applies to survivor benefits',
      'D) Applies only when there are more than 5 beneficiaries'
    ],
    correctAnswer: 1,
    explanation: 'The family maximum caps total benefits payable on one worker\'s record at 150-180% of the worker\'s PIA. When combined benefits exceed this, dependent and spousal benefits are proportionally reduced (the worker\'s benefit is not reduced). This affects families with multiple dependents claiming on one record.'
  },
  {
    id: 'CFP-RET-B6-025',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-5',
    topic: 'Social Security',
    subtopic: 'Disability Conversion',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Social Security Disability Insurance (SSDI) benefits:',
    options: [
      'A) End at age 62',
      'B) Automatically convert to retirement benefits at FRA with no change in amount',
      'C) Must be reapplied for at retirement',
      'D) Are always higher than retirement benefits'
    ],
    correctAnswer: 1,
    explanation: 'SSDI benefits automatically convert to retirement benefits at FRA, typically at the same amount (SSDI pays the FRA amount). The transition is seamless. Medicare eligibility earned through SSDI continues. This prevents benefit reduction that would occur if claiming early retirement instead of SSDI.'
  }
];
