/**
 * CFP Retirement Questions - SECURE 2.0 Deep Dive
 * Domain 6: Retirement Savings and Income Planning (19% of exam)
 * 
 * Focus: SECURE Act 2.0 provisions effective 2023-2025
 * - 529→Roth IRA rollovers
 * - Emergency savings linked accounts
 * - Enhanced catch-up contributions (60-63)
 * - Roth employer contributions
 * - Student loan matching
 * - Automatic enrollment mandates
 * - Penalty-free emergency withdrawals
 */

import { Question } from '../../../types';

export const CFP_SECURE_2_0_QUESTIONS: Question[] = [
  // 529→Roth IRA Rollovers
  {
    id: 'cfp-ret-sec2-001',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'SECURE 2.0',
    subtopic: '529 to Roth Conversion',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Under SECURE 2.0, beneficiaries may roll unused 529 plan funds to a Roth IRA. Which statement is CORRECT?',
    options: [
      'C) The rollover is only available for 529 accounts opened before 2023',
      'B) The 529 account must have been open for at least 15 years, rollovers are subject to annual Roth contribution limits, and there is a $35,000 lifetime cap',
      'D) The rolled-over amount is fully taxable as ordinary income',
      'A) The rollover is unlimited in amount with no restrictions',
    ],
    correctAnswer: 1,
    explanation: 'SECURE 2.0 529→Roth rollover (effective 2024): 529 must be open 15+ years. Annual limit: normal Roth IRA contribution limit ($7,500 in 2026). Lifetime cap: $35,000. Rollover is tax-free. Cannot include contributions/earnings from last 5 years. Beneficiary must have earned income ≥ rollover amount. Phase-out rules don\'t apply. Great for over-funded 529s.'
  },
  {
    id: 'cfp-ret-sec2-002',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-3',
    topic: 'SECURE 2.0',
    subtopic: '529 to Roth Conversion',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A client\'s child received a full scholarship, leaving $50,000 in a 529 plan opened 16 years ago. Under SECURE 2.0, which strategy BEST utilizes these funds?',
    options: [
      'D) Leave the account until the child has grandchildren',
      'C) Change beneficiary to a cousin who will never attend college',
      'B) Roll $7,000 annually to the child\'s Roth IRA until reaching the $35,000 lifetime limit, with excess used for other qualified expenses',
      'A) Withdraw entire amount and pay the 10% penalty plus tax on earnings',
    ],
    correctAnswer: 2,
    explanation: 'Best strategy: roll to Roth IRA up to annual limits ($7,000/year) until hitting $35,000 lifetime cap. Start child\'s Roth early for decades of tax-free growth. Remaining $15,000+ can be used for other qualified expenses (graduate school, sibling education), changed beneficiary, or withdrawn (scholarship exception = no 10% penalty on amount = scholarship).'
  },
  
  // Emergency Savings Linked Retirement Accounts
  {
    id: 'cfp-ret-sec2-003',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'SECURE 2.0',
    subtopic: 'Emergency Savings Accounts',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'SECURE 2.0 allows employers to offer emergency savings accounts linked to retirement plans. These accounts:',
    options: [
      'C) Require vesting schedules like employer matching',
      'D) Are only available to highly compensated employees',
      'B) Accept after-tax employee contributions up to $2,500, with withdrawals penalty-free and at least monthly',
      'A) Are funded with employer contributions only and have no limits',
    ],
    correctAnswer: 2,
    explanation: 'Pension-linked emergency savings accounts (PLESAs) under SECURE 2.0 (effective 2024): Employer-sponsored, linked to DC plans. Employee after-tax contributions up to $2,500. First 4 withdrawals/year penalty-free, no reason required. Available to non-highly compensated. Invested in "principal preservation" vehicles (stable value). Aim: reduce retirement plan leakage from early withdrawals.'
  },
  {
    id: 'cfp-ret-sec2-004',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'SECURE 2.0',
    subtopic: 'Emergency Savings Accounts',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A non-highly compensated employee wants to build an emergency fund through their 401(k). Under SECURE 2.0\'s emergency savings account provision:',
    options: [
      'C) Funds can only be accessed after age 59½',
      'D) The employer is required to match emergency account contributions',
      'B) The account balance is automatically transferred to the 401(k) when it exceeds $2,500, and the employee may withdraw funds at least monthly without penalty',
      'A) Contributions reduce their 401(k) deferral limit',
    ],
    correctAnswer: 2,
    explanation: 'PLESA features: Separate from 401(k) deferral (doesn\'t reduce limit). Max $2,500 balance—excess auto-transfers to 401(k). Non-HCE only. Must allow monthly withdrawals minimum. First 4/year no penalty, after that same as regular distribution. Employer may auto-enroll at up to 3%. Goal: emergency access without raiding retirement.'
  },
  
  // Enhanced Catch-up Contributions (Ages 60-63)
  {
    id: 'cfp-ret-sec2-005',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'SECURE 2.0',
    subtopic: 'Catch-up Contributions 60-63',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Under SECURE 2.0, the catch-up contribution limit for 401(k) plans for participants ages 60-63 beginning in 2025 will be:',
    options: [
      'D) Only available for Roth contributions',
      'B) The greater of $10,000 or 150% of the regular catch-up limit (indexed for inflation after 2025)',
      'C) Eliminated entirely for this age group',
      'A) $7,500, the same as participants age 50-59',
    ],
    correctAnswer: 1,
    explanation: 'SECURE 2.0 "super catch-up" (effective 2025): Ages 60-63 can contribute the greater of $10,000 OR 150% of the regular catch-up ($7,500 × 150% = $11,250). This $10,000/$11,250 limit will be indexed for inflation starting 2026. Example: 2025 regular limit $23,500 + $11,250 = $34,750 max for ages 60-63. Returns to standard catch-up at 64. Helps late savers accelerate.'
  },
  {
    id: 'cfp-ret-sec2-006',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'SECURE 2.0',
    subtopic: 'Catch-up Contributions 60-63',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which SIMPLE IRA participant benefits from the SECURE 2.0 enhanced catch-up provision?',
    options: [
      'D) A 45-year-old high earner',
      'B) A 61-year-old who can contribute an additional $5,000 (or 150% of normal catch-up)',
      'C) A 65-year-old business owner',
      'A) A 55-year-old maximizing contributions',
    ],
    correctAnswer: 1,
    explanation: 'SIMPLE IRA enhanced catch-up (ages 60-63): Greater of $5,000 or 150% of regular catch-up ($3,500 × 150% = $5,250). Regular catch-up (50+): $3,500. So ages 60-63 can contribute extra $5,250 vs $3,500. Combined 2025: $16,000 deferral + $5,250 catch-up = $21,250. At 64, reverts to $3,500. Similar 150% boost for SIMPLE, SEP catch-ups.'
  },
  
  // Roth Employer Contributions
  {
    id: 'cfp-ret-sec2-007',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'SECURE 2.0',
    subtopic: 'Roth Employer Match',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'SECURE 2.0 allows employer matching contributions to be made on a Roth basis. This means:',
    options: [
      'B) Both employer and employee pay tax on the contribution',
      'C) Neither employer nor employee pays current tax; it\'s all deferred',
      'D) Employees can deduct the employer match on their tax return',
      'A) Employers receive a tax deduction but employees pay income tax on the match in the year of contribution',
    ],
    correctAnswer: 3,
    explanation: 'Roth employer match (effective 2023): Employee can elect for employer match/nonelective contributions to go to designated Roth account. Employer still deducts; employee includes in current income (W-2). Benefit: growth is tax-free. 100% immediately vested when Roth (employer contribution vesting still applies for forfeiture). Must be fully vested if Roth. Good for those expecting higher future tax rates.'
  },
  {
    id: 'cfp-ret-sec2-008',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'SECURE 2.0',
    subtopic: 'Roth Employer Match',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A 35-year-old employee in the 24% tax bracket receives a $6,000 employer 401(k) match. If she elects the Roth option for employer contributions under SECURE 2.0:',
    options: [
      'B) She receives no benefit because employer matches cannot be Roth',
      'C) The employer loses their tax deduction',
      'D) The match must be withdrawn within 5 years',
      'A) She will owe $1,440 in current income tax but gain tax-free growth for 30 years',
    ],
    correctAnswer: 3,
    explanation: 'Choosing Roth employer match: $6,000 × 24% = $1,440 current tax. BUT: 30 years of tax-free growth. If invested at 7%: $6,000 → ~$45,676 tax-free. Break-even: if future tax rate stays same, Roth wins due to tax-free earnings growth. Employer keeps deduction. Match immediately 100% vested when designated Roth. Trade-off: current tax for future tax-free growth.'
  },
  
  // Student Loan Matching
  {
    id: 'cfp-ret-sec2-009',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'SECURE 2.0',
    subtopic: 'Student Loan Matching',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under SECURE 2.0\'s student loan matching provision, employers may:',
    options: [
      'C) Deduct student loan payments from employee paychecks and apply them to 401(k)',
      'B) Make matching contributions to an employee\'s retirement account based on qualified student loan payments, even if the employee doesn\'t contribute to the plan',
      'D) Pay off student loans directly as a tax-free benefit',
      'A) Only match student loan payments for employees under 30',
    ],
    correctAnswer: 1,
    explanation: 'SECURE 2.0 student loan matching (effective 2024): Employer can treat qualified student loan payments as elective deferrals for matching purposes. Employee doesn\'t need to contribute to 401(k) to get match. Example: Employee pays $500/month to loans, employer matches as if $500 went to 401(k). Self-certification allowed. Addresses: young workers can\'t save due to loans. Employers get same deduction as regular match.'
  },
  
  // Automatic Enrollment Mandates
  {
    id: 'cfp-ret-sec2-010',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'SECURE 2.0',
    subtopic: 'Automatic Enrollment',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'SECURE 2.0 requires automatic enrollment for new 401(k) and 403(b) plans established after December 29, 2022. The initial automatic enrollment rate must be:',
    options: [
      'B) At least 3% but not more than 10%, with annual auto-escalation of 1% until reaching at least 10% (up to 15%)',
      'C) Determined entirely by employee election',
      'D) At least 15% to match typical savings rates',
      'A) Exactly 6% of compensation',
    ],
    correctAnswer: 0,
    explanation: 'SECURE 2.0 auto-enrollment mandate (effective 2025 for new plans): 3-10% initial rate. Auto-escalation: 1%/year up to at least 10%, max 15%. Exemptions: small businesses (<10 employees), new businesses (<3 years), church plans, governmental plans. Existing plans grandfathered. Employee can opt out. QDIA rules apply. Dramatically increases participation vs. voluntary enrollment.'
  },
  
  // Penalty-Free Emergency Withdrawals
  {
    id: 'cfp-ret-sec2-011',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'SECURE 2.0',
    subtopic: 'Emergency Withdrawals',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Under SECURE 2.0, penalty-free emergency withdrawals from retirement accounts allow:',
    options: [
      'C) Penalty-free access only for federally declared disasters',
      'D) Immediate access to entire retirement balance',
      'B) One distribution per year up to $1,000 for emergency personal expense, with option to repay within 3 years',
      'A) Unlimited withdrawals for any personal expense',
    ],
    correctAnswer: 2,
    explanation: 'SECURE 2.0 emergency expense withdrawal (effective 2024): One per calendar year. Up to $1,000. Self-certification of emergency expense. No 10% penalty. Still subject to income tax. Can repay within 3 years (no new withdrawal until repaid or 3 years pass). No employer approval needed. Aims to reduce hardship withdrawals which have more restrictions.'
  },
  {
    id: 'cfp-ret-sec2-012',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-2',
    topic: 'SECURE 2.0',
    subtopic: 'Domestic Abuse Victim Exception',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'SECURE 2.0 adds a penalty exception for domestic abuse victims. This exception allows:',
    options: [
      'C) Withdrawal only if a protective order exists',
      'D) Distribution directly to a domestic violence shelter',
      'B) Penalty-free withdrawal up to $10,000 (indexed) or 50% of vested balance, whichever is less, with 3-year repayment option and tax spread over 3 years',
      'A) Unlimited tax-free withdrawals',
    ],
    correctAnswer: 2,
    explanation: 'Domestic abuse victim exception (effective 2024): Self-certification within 1 year of abuse. Up to $10,000 (indexed) or 50% of vested balance, whichever is less. No 10% penalty. Tax can be spread over 3 years. Repayment within 3 years = refund of taxes. No court documentation required. Another SECURE 2.0 provision: financial abuse is recognized abuse type.'
  },
  
  // RMD Changes
  {
    id: 'cfp-ret-sec2-013',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'SECURE 2.0',
    subtopic: 'RMD Age Changes',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under SECURE 2.0\'s RMD changes, an individual born in 1965 must begin taking RMDs at age:',
    options: [
      'D) 70½',
      'C) 75',
      'B) 73',
      'A) 72',
    ],
    correctAnswer: 1,
    explanation: 'SECURE 2.0 RMD ages: Born 1951-1959: Age 73. Born 1960+: Age 75 (effective 2033). Individual born 1965 reaches 75 in 2040, so RMDs begin in 2040. Note: SECURE Act 1.0 raised to 72, SECURE 2.0 raised further. Roth 401(k) RMDs eliminated starting 2024. Traditional IRA/401(k) still have RMDs. Planning: longer deferral = more growth, but larger RMDs later.'
  },
  {
    id: 'cfp-ret-sec2-014',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'SECURE 2.0',
    subtopic: 'Roth 401(k) RMDs',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Beginning in 2024, SECURE 2.0 eliminates RMDs for:',
    options: [
      'D) All retirement accounts for those under age 75',
      'B) Inherited IRAs from non-spouse beneficiaries',
      'C) Designated Roth accounts in employer plans (Roth 401(k), Roth 403(b))',
      'A) Traditional 401(k) accounts',
    ],
    correctAnswer: 2,
    explanation: 'Roth 401(k)/403(b) RMD elimination (effective 2024): Previously, Roth 401(k)s had RMDs (unlike Roth IRAs). SECURE 2.0 aligns them. No RMDs for designated Roth accounts. No need to roll Roth 401(k) to Roth IRA to avoid RMDs. Roth IRAs never had RMDs. Inherited Roths still have rules. Traditional accounts still require RMDs at 73/75.'
  },
  
  // Reduced RMD Penalty
  {
    id: 'cfp-ret-sec2-015',
    courseId: 'cfp',
    section: 'CFP-RET',
    blueprintArea: 'RET-4',
    topic: 'SECURE 2.0',
    subtopic: 'RMD Penalties',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'SECURE 2.0 reduced the penalty for failure to take a required minimum distribution from:',
    options: [
      'B) 50% to 10%',
      'D) RMD penalties were eliminated entirely',
      'C) 25% to 0%',
      'A) 50% to 25%, with further reduction to 10% if corrected within the IRS correction window',
    ],
    correctAnswer: 3,
    explanation: 'RMD penalty reduction (effective 2023): Previous penalty: 50% of shortfall. New: 25% of shortfall. If corrected during IRS correction window (generally within 2 years): reduced to 10%. Example: Miss $20,000 RMD, penalty = $5,000 (25%). Correct timely = $2,000 (10%). Still important to take RMDs, but less draconian penalty for honest mistakes.'
  },
];

export default CFP_SECURE_2_0_QUESTIONS;
