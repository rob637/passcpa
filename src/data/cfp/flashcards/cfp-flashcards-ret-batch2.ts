/**
 * CFP Flashcards - Retirement Planning Batch 2
 * 60 additional flashcards for Retirement domain
 */

import { Flashcard } from './index';

export const CFP_FLASHCARDS_RET_BATCH2: Flashcard[] = [
  {
    id: 'FC-RET-011',
    domain: 'RET',
    category: 'Qualified Plans',
    front: 'What are the 401(k) contribution limits for 2026?',
    back: '2026 Limits:\n• Employee deferral: $24,500\n• Catch-up (50+): $7,500 additional\n• Super catch-up (60-63): $11,250 (SECURE 2.0)\n• Total (with employer): $71,500\n• Catch-up total: $79,000\n\nNote: Limits adjust annually for inflation',
    difficulty: 'easy',
    tags: ['401k', 'limits', 'contributions']
  },
  {
    id: 'FC-RET-012',
    domain: 'RET',
    category: 'Qualified Plans',
    front: 'What is a SAFE HARBOR 401(k)?',
    back: 'Safe Harbor 401(k):\n• Automatically passes ADP/ACP testing\n• Required employer contribution:\n  - 3% non-elective, OR\n  - 4% match (100% of first 3%, 50% of next 2%)\n• Immediately 100% vested\n• Lower admin burden',
    difficulty: 'medium',
    tags: ['401k', 'safe-harbor', 'testing']
  },
  {
    id: 'FC-RET-013',
    domain: 'RET',
    category: 'Qualified Plans',
    front: 'What is the ADP/ACP test for 401(k) plans?',
    back: 'ADP Test (Actual Deferral Percentage):\n• Tests employee deferrals\n\nACP Test (Actual Contribution Percentage):\n• Tests employer matching/after-tax\n\nHCEs cannot exceed NHCEs by:\n• More than 2% absolute, OR\n• More than 2x (if NHCE ≤2%)',
    difficulty: 'hard',
    tags: ['401k', 'testing', 'compliance']
  },
  {
    id: 'FC-RET-014',
    domain: 'RET',
    category: 'IRAs',
    front: 'What is the difference between TRADITIONAL and ROTH IRA?',
    back: 'TRADITIONAL:\n• Deductible contributions (income limits if covered by plan)\n• Tax-deferred growth\n• Taxable withdrawals\n• RMDs at 73\n\nROTH:\n• Non-deductible contributions\n• Tax-free growth\n• Tax-free qualified withdrawals\n• No RMDs for owner',
    difficulty: 'medium',
    tags: ['ira', 'roth', 'traditional']
  },
  {
    id: 'FC-RET-015',
    domain: 'RET',
    category: 'IRAs',
    front: 'What are the IRA contribution limits for 2024?',
    back: '2024 IRA Limits:\n• Contribution: $7,000\n• Catch-up (50+): $1,000 additional\n• Total if 50+: $8,000\n\nMust have earned income\nCan contribute to both traditional and Roth (combined limit)',
    difficulty: 'easy',
    tags: ['ira', 'limits', 'contributions']
  },
  {
    id: 'FC-RET-016',
    domain: 'RET',
    category: 'IRAs',
    front: 'What are ROTH IRA income limits for 2024?',
    back: '2024 Roth IRA Phaseouts (MAGI):\n\nSingle:\n• Full: <$146,000\n• Partial: $146,000-$161,000\n• None: >$161,000\n\nMarried Filing Jointly:\n• Full: <$230,000\n• Partial: $230,000-$240,000\n• None: >$240,000',
    difficulty: 'medium',
    tags: ['ira', 'roth', 'income-limits']
  },
  {
    id: 'FC-RET-017',
    domain: 'RET',
    category: 'IRAs',
    front: 'What is a BACKDOOR ROTH IRA?',
    back: 'Backdoor Roth Strategy:\n1. Contribute to non-deductible Traditional IRA\n2. Convert to Roth IRA\n3. Pay tax only on any gains\n\nWarning: Pro-rata rule applies if you have other traditional IRA balances\n\nUsed when income exceeds Roth limits',
    difficulty: 'hard',
    tags: ['ira', 'roth', 'strategy']
  },
  {
    id: 'FC-RET-018',
    domain: 'RET',
    category: 'IRAs',
    front: 'What is the PRO-RATA rule for IRA conversions?',
    back: 'Pro-Rata Rule:\n• ALL traditional IRAs aggregated\n• Cannot convert only non-deductible portion\n\nFormula:\nTaxable % = Pre-tax balance ÷ Total IRA balance\n\nSolution: Roll pre-tax to 401(k) first',
    difficulty: 'hard',
    tags: ['ira', 'conversion', 'pro-rata']
  },
  {
    id: 'FC-RET-019',
    domain: 'RET',
    category: 'Distributions',
    front: 'What is the 10% early withdrawal penalty exception list?',
    back: '10% Penalty Exceptions:\n• Death\n• Disability\n• Medical expenses >7.5% AGI\n• Health insurance (if unemployed)\n• SEPP (72t payments)\n• First home ($10K IRA only)\n• Higher education (IRA only)\n• Birth/adoption ($5K)\n• Age 55 separation from service (401k)',
    difficulty: 'hard',
    tags: ['distributions', 'penalty', 'exceptions']
  },
  {
    id: 'FC-RET-020',
    domain: 'RET',
    category: 'Distributions',
    front: 'What are REQUIRED MINIMUM DISTRIBUTIONS (RMDs)?',
    back: 'RMDs:\n• Begin at age 73 (SECURE 2.0)\n• Based on Uniform Lifetime Table\n• Must take by Dec 31 each year\n• 1st year: Can defer to April 1 next year\n• 25% penalty for missed RMDs\n\nRMD = Account Balance ÷ Life Expectancy Factor',
    difficulty: 'medium',
    tags: ['rmd', 'distributions', 'requirement']
  },
  {
    id: 'FC-RET-021',
    domain: 'RET',
    category: 'Distributions',
    front: 'What is a QUALIFIED CHARITABLE DISTRIBUTION (QCD)?',
    back: 'QCD Features:\n• Direct IRA transfer to charity\n• Age 70½ or older\n• Up to $100K/year\n• Satisfies RMD requirement\n• Excluded from taxable income\n• Must be to qualified charity\n• Not from SEP/SIMPLE IRAs if active',
    difficulty: 'medium',
    tags: ['ira', 'qcd', 'charitable']
  },
  {
    id: 'FC-RET-022',
    domain: 'RET',
    category: 'Social Security',
    front: 'What is FULL RETIREMENT AGE for Social Security?',
    back: 'Full Retirement Age (FRA):\n• Born 1943-1954: Age 66\n• Born 1955: 66 + 2 months\n• Born 1956: 66 + 4 months\n• Born 1957: 66 + 6 months\n• Born 1958: 66 + 8 months\n• Born 1959: 66 + 10 months\n• Born 1960+: Age 67',
    difficulty: 'medium',
    tags: ['social-security', 'fra', 'age']
  },
  {
    id: 'FC-RET-023',
    domain: 'RET',
    category: 'Social Security',
    front: 'What are SOCIAL SECURITY early and delayed retirement credits?',
    back: 'Early Claiming (before FRA):\n• Reduction of 5/9% per month for first 36 months\n• 5/12% per month beyond 36 months\n• At 62: ~25-30% reduction\n\nDelayed Credits (after FRA):\n• 8% per year increase\n• Maximum at age 70\n• 24-32% increase if delay to 70',
    difficulty: 'hard',
    tags: ['social-security', 'claiming', 'credits']
  },
  {
    id: 'FC-RET-024',
    domain: 'RET',
    category: 'Social Security',
    front: 'What is the SOCIAL SECURITY earnings test?',
    back: 'Earnings Test (before FRA):\n• 2024 limit: $22,320/year\n• Lose $1 for every $2 over limit\n\nYear of FRA:\n• Higher limit: $59,520\n• Lose $1 for every $3 over\n\nAfter FRA: No reduction\nNote: Lost benefits restored over time',
    difficulty: 'medium',
    tags: ['social-security', 'earnings', 'working']
  },
  {
    id: 'FC-RET-025',
    domain: 'RET',
    category: 'Social Security',
    front: 'How is a SPOUSE\'s Social Security benefit calculated?',
    back: 'Spousal Benefit:\n• Up to 50% of worker\'s PIA\n• Must be married 1+ year\n• Worker must have filed\n• Reduced if claiming early\n\nEx-Spouse:\n• Married 10+ years\n• Divorced 2+ years\n• Both age 62+\n• Does NOT affect ex\'s benefit',
    difficulty: 'medium',
    tags: ['social-security', 'spousal', 'benefits']
  },
  {
    id: 'FC-RET-026',
    domain: 'RET',
    category: 'Social Security',
    front: 'How is the SURVIVOR\'s Social Security benefit calculated?',
    back: 'Survivor Benefits:\n• 100% of deceased\'s benefit at FRA\n• Reduced if claimed early\n• Can claim as early as age 60\n• Disabled: Age 50\n• Caring for child: Any age\n\nStrategy: Widow(er) can switch between own/survivor benefit',
    difficulty: 'hard',
    tags: ['social-security', 'survivor', 'benefits']
  },
  {
    id: 'FC-RET-027',
    domain: 'RET',
    category: 'Pension Plans',
    front: 'What is a DEFINED BENEFIT plan?',
    back: 'Defined Benefit Plan:\n• Employer funds entirely\n• Promise specific retirement benefit\n• Formula: Years × Salary × %\n• Employer bears investment risk\n• PBGC insurance protection\n• Vesting: 5 year cliff or 3-7 graded',
    difficulty: 'medium',
    tags: ['pension', 'defined-benefit', 'employer']
  },
  {
    id: 'FC-RET-028',
    domain: 'RET',
    category: 'Pension Plans',
    front: 'What is the PENSION BENEFIT GUARANTY CORPORATION (PBGC)?',
    back: 'PBGC:\n• Federal agency\n• Insures DB plan benefits\n• Steps in if plan fails\n• Does NOT cover DC plans\n• Maximum guarantee limit (~$80K/year at 65)\n• Funded by employer premiums\n• Single and multiemployer plans',
    difficulty: 'medium',
    tags: ['pension', 'pbgc', 'insurance']
  },
  {
    id: 'FC-RET-029',
    domain: 'RET',
    category: 'Qualified Plans',
    front: 'What is a PROFIT SHARING plan?',
    back: 'Profit Sharing Plan:\n• Defined contribution plan\n• Employer contributes discretionary amount\n• Up to 25% of eligible compensation\n• Can skip contributions\n• Allocation formulas vary\n• Popular for small business',
    difficulty: 'medium',
    tags: ['profit-sharing', 'dc-plan', 'employer']
  },
  {
    id: 'FC-RET-030',
    domain: 'RET',
    category: 'Self-Employed',
    front: 'What is a SEP-IRA and its contribution limits?',
    back: 'SEP-IRA (Simplified Employee Pension):\n• Employer contributions only\n• Up to 25% of compensation\n• Max: $69,000 (2024)\n• Self-employed: ~20% of net SE income\n• Easy to establish/maintain\n• Must cover eligible employees\n• Deadline: Tax filing + extensions',
    difficulty: 'medium',
    tags: ['sep', 'self-employed', 'contributions']
  },
  {
    id: 'FC-RET-031',
    domain: 'RET',
    category: 'Self-Employed',
    front: 'What is a SIMPLE IRA?',
    back: 'SIMPLE IRA:\n• For employers <100 employees\n• Employee deferrals: $16,000 (2024)\n• Catch-up (50+): $3,500\n• Required employer match:\n  - 3% match, OR\n  - 2% non-elective\n• 25% penalty for early withdrawal in first 2 years\n• No other qualified plans allowed',
    difficulty: 'medium',
    tags: ['simple', 'small-business', 'contributions']
  },
  {
    id: 'FC-RET-032',
    domain: 'RET',
    category: 'Self-Employed',
    front: 'What is a SOLO 401(k)?',
    back: 'Solo 401(k) (Individual 401k):\n• Self-employed, no employees\n• Employee + employer contributions\n• 2024 limit: $69,000 total\n• Catch-up: $7,500 additional\n• Roth option available\n• Loans permitted\n• Higher contributions than SEP',
    difficulty: 'medium',
    tags: ['solo-401k', 'self-employed', 'contributions']
  },
  {
    id: 'FC-RET-033',
    domain: 'RET',
    category: 'Qualified Plans',
    front: 'What is a MONEY PURCHASE PENSION plan?',
    back: 'Money Purchase Pension:\n• Defined contribution plan\n• MANDATORY annual employer contribution\n• Fixed percentage of compensation\n• Up to 25% of eligible comp\n• Less flexible than profit sharing\n• Less common today (merged with PS limits)',
    difficulty: 'hard',
    tags: ['money-purchase', 'dc-plan', 'employer']
  },
  {
    id: 'FC-RET-034',
    domain: 'RET',
    category: 'Qualified Plans',
    front: 'What is a 403(b) plan?',
    back: '403(b) Tax-Sheltered Annuity:\n• For public schools, 501(c)(3) organizations\n• Same limits as 401(k): $24,500 (2026)\n• 15-year rule: Extra $3,000/year\n• Investments: Annuities or mutual funds\n• May have church plan features\n• Catch-up: $7,500 (50+), $11,250 (60-63)',
    difficulty: 'medium',
    tags: ['403b', 'nonprofit', 'education']
  },
  {
    id: 'FC-RET-035',
    domain: 'RET',
    category: 'Qualified Plans',
    front: 'What is a 457(b) plan?',
    back: '457(b) Deferred Compensation:\n• State/local government, tax-exempt orgs\n• Deferral limit: $24,500 (2026)\n• "Double limit" catch-up in 3 years before retirement\n• NO 10% early withdrawal penalty\n• Separate from 401(k)/403(b) limits\n• Catch-up: $7,500 (50+)',
    difficulty: 'medium',
    tags: ['457', 'government', 'deferred-comp']
  },
  {
    id: 'FC-RET-036',
    domain: 'RET',
    category: 'Plan Features',
    front: 'What are VESTING schedules for employer contributions?',
    back: 'Vesting Options:\n\nCLIFF VESTING:\n• 0% until requirement met\n• 100% after (3 years DC, 5 years DB)\n\nGRADED VESTING:\n• Gradual increase\n• 2-6 years for DC plans\n• 3-7 years for DB plans\n\nEmployee contributions: Always 100% vested',
    difficulty: 'medium',
    tags: ['vesting', 'plans', 'employer']
  },
  {
    id: 'FC-RET-037',
    domain: 'RET',
    category: 'Plan Features',
    front: 'What is a HARDSHIP WITHDRAWAL from 401(k)?',
    back: 'Hardship Withdrawal:\n• Immediate and heavy financial need\n• No other resources available\n• Allowed reasons:\n  - Medical expenses\n  - Home purchase\n  - Tuition\n  - Prevent eviction\n  - Funeral expenses\n• Subject to income tax\n• 10% penalty may apply\n• Cannot borrow amount',
    difficulty: 'medium',
    tags: ['401k', 'hardship', 'withdrawal']
  },
  {
    id: 'FC-RET-038',
    domain: 'RET',
    category: 'Plan Features',
    front: 'What are the 401(k) LOAN rules?',
    back: '401(k) Loan Rules:\n• Up to 50% of vested balance\n• Maximum: $50,000\n• Repay within 5 years (15 for home)\n• Interest paid to yourself\n• If terminate: Full balance due\n• Defaulted loan = distribution + penalty\n• Double taxation on interest',
    difficulty: 'medium',
    tags: ['401k', 'loan', 'features']
  },
  {
    id: 'FC-RET-039',
    domain: 'RET',
    category: 'Rollovers',
    front: 'What is the difference between DIRECT and INDIRECT rollover?',
    back: 'DIRECT ROLLOVER (Trustee-to-Trustee):\n• Funds go directly between custodians\n• No withholding\n• No 60-day limit\n• Preferred method\n\nINDIRECT ROLLOVER:\n• You receive check\n• 20% mandatory withholding\n• Must redeposit within 60 days\n• Once per 12 months (IRA)',
    difficulty: 'medium',
    tags: ['rollover', 'ira', '401k']
  },
  {
    id: 'FC-RET-040',
    domain: 'RET',
    category: 'Rollovers',
    front: 'What are the ROLLOVER OPTIONS when leaving a job?',
    back: 'Options for 401(k) at Job Change:\n1. Leave in old plan (if allowed)\n2. Roll to new employer 401(k)\n3. Roll to Traditional IRA\n4. Roll to Roth IRA (taxable conversion)\n5. Cash out (taxes + penalty)\n\nConsider: fees, investment options, creditor protection',
    difficulty: 'medium',
    tags: ['rollover', 'job-change', 'options']
  },
  {
    id: 'FC-RET-041',
    domain: 'RET',
    category: 'Calculations',
    front: 'How to calculate RETIREMENT INCOME NEED?',
    back: 'Income Replacement Method:\n\n1. Estimate pre-retirement income\n2. Apply replacement ratio (70-80%)\n3. Subtract Social Security\n4. Subtract pension income\n5. Remaining = Required from savings\n\nReal dollar adjustment for inflation needed',
    difficulty: 'medium',
    tags: ['calculation', 'planning', 'income']
  },
  {
    id: 'FC-RET-042',
    domain: 'RET',
    category: 'Calculations',
    front: 'What is the 4% WITHDRAWAL RULE?',
    back: '4% Rule (Bengen):\n• Withdraw 4% of portfolio in year 1\n• Adjust for inflation each year\n• 30-year retirement horizon\n• Based on ~50/50 stock/bond mix\n\nLimitations:\n• Based on historical data\n• May need adjustment for:\n  - Low rates\n  - Longer retirement\n  - Market conditions',
    difficulty: 'medium',
    tags: ['withdrawal', 'strategy', 'sustainable']
  },
  {
    id: 'FC-RET-043',
    domain: 'RET',
    category: 'Calculations',
    front: 'How to calculate CAPITAL PRESERVATION vs CAPITAL UTILIZATION?',
    back: 'CAPITAL PRESERVATION:\n• Never touch principal\n• Live only on income/growth\n• Use PV of perpetuity formula\n\nCAPITAL UTILIZATION:\n• Spend principal over time\n• Target zero at end of plan\n• Use PV of annuity formula\n• More aggressive withdrawal rate',
    difficulty: 'hard',
    tags: ['calculation', 'planning', 'strategy']
  },
  {
    id: 'FC-RET-044',
    domain: 'RET',
    category: 'Medicare',
    front: 'What are the PARTS OF MEDICARE?',
    back: 'Medicare Parts:\n• Part A: Hospital insurance (free if worked 10+ years)\n• Part B: Medical insurance ($174.70/month 2024)\n• Part C: Medicare Advantage (private)\n• Part D: Prescription drugs (varies)\n\nOriginal Medicare = A + B\nMedigap supplements A & B',
    difficulty: 'medium',
    tags: ['medicare', 'healthcare', 'retirement']
  },
  {
    id: 'FC-RET-045',
    domain: 'RET',
    category: 'Medicare',
    front: 'When should you ENROLL in Medicare?',
    back: 'Medicare Enrollment:\n• Initial: 3 months before to 3 months after 65th birthday\n• Late enrollment: penalty\n\nExceptions:\n• Working with employer coverage\n• Special Enrollment Period when work ends\n• 8 months after employment ends\n\nPart B penalty: 10% per year late',
    difficulty: 'medium',
    tags: ['medicare', 'enrollment', 'penalties']
  },
  {
    id: 'FC-RET-046',
    domain: 'RET',
    category: 'Medicare',
    front: 'What are IRMAA surcharges for Medicare?',
    back: 'IRMAA (Income-Related Monthly Adjustment):\n• Higher premiums for high earners\n• Affects Part B and Part D\n• Based on MAGI from 2 years ago\n• 2024 thresholds:\n  - Single: >$103,000\n  - MFJ: >$206,000\n• Strategy: Manage income in pre-Medicare years',
    difficulty: 'hard',
    tags: ['medicare', 'irmaa', 'surcharge']
  },
  {
    id: 'FC-RET-047',
    domain: 'RET',
    category: 'HSAs',
    front: 'How can HSAs be used in RETIREMENT?',
    back: 'HSA Retirement Strategy:\n• After 65: No penalty for non-medical (just income tax)\n• Before 65: Tax-free for qualified medical only\n• Can pay Medicare premiums (not Medigap)\n• Reimburse past medical expenses anytime\n• Carry over balance indefinitely\n• Superior to Traditional IRA for medical',
    difficulty: 'hard',
    tags: ['hsa', 'retirement', 'strategy']
  },
  {
    id: 'FC-RET-048',
    domain: 'RET',
    category: 'Sequence Risk',
    front: 'What is SEQUENCE OF RETURNS risk?',
    back: 'Sequence Risk:\n• Order of returns matters when withdrawing\n• Early negative returns + withdrawals = devastating\n• Can\'t recover losses while withdrawing\n\nMitigation:\n• Maintain cash buffer\n• Flexible spending\n• Asset allocation glide path\n• Avoid selling low',
    difficulty: 'hard',
    tags: ['risk', 'sequence', 'withdrawal']
  },
  {
    id: 'FC-RET-049',
    domain: 'RET',
    category: 'Strategy',
    front: 'What is a BUCKET STRATEGY for retirement?',
    back: 'Bucket Strategy:\n• Bucket 1 (1-2 years): Cash/short-term\n• Bucket 2 (3-10 years): Bonds/moderate\n• Bucket 3 (10+ years): Stocks/growth\n\nBenefits:\n• Reduces sequence risk\n• Psychological comfort\n• Avoid selling equities in downturns',
    difficulty: 'medium',
    tags: ['strategy', 'buckets', 'allocation']
  },
  {
    id: 'FC-RET-050',
    domain: 'RET',
    category: 'Strategy',
    front: 'What is tax-efficient WITHDRAWAL SEQUENCING?',
    back: 'Withdrawal Order Strategy:\n\nTraditional approach:\n1. Taxable accounts first\n2. Tax-deferred second\n3. Roth last\n\nOptimal approach:\n• Fill lower tax brackets from tax-deferred\n• Use Roth to avoid higher brackets\n• Consider capital gains rates',
    difficulty: 'hard',
    tags: ['strategy', 'tax', 'withdrawal']
  },
  {
    id: 'FC-RET-051',
    domain: 'RET',
    category: 'SECURE Act',
    front: 'What are key SECURE 2.0 Act provisions?',
    back: 'SECURE 2.0 (2022):\n• RMD age: 73 (2023), 75 (2033)\n• Catch-up Roth for high earners\n• 529 to Roth rollover (limits apply)\n• Reduced RMD penalty (25%/10%)\n• Employer match can be Roth\n• Emergency savings accounts\n• Student loan matching allowed',
    difficulty: 'hard',
    tags: ['secure-act', 'legislation', 'changes']
  },
  {
    id: 'FC-RET-052',
    domain: 'RET',
    category: 'Beneficiaries',
    front: 'What is the 10-YEAR RULE for inherited IRAs?',
    back: '10-Year Rule (SECURE Act):\n• Most non-spouse beneficiaries\n• Must empty account within 10 years\n• No annual RMD requirements (but may be)\n• Exceptions (Eligible Designated Beneficiaries):\n  - Spouse\n  - Minor children (until majority)\n  - Disabled/chronically ill\n  - Not more than 10 years younger',
    difficulty: 'hard',
    tags: ['inherited-ira', 'beneficiary', '10-year']
  },
  {
    id: 'FC-RET-053',
    domain: 'RET',
    category: 'Beneficiaries',
    front: 'What are SPOUSE options for inherited retirement accounts?',
    back: 'Spouse Inherited Account Options:\n\n1. ROLL TO OWN IRA:\n   • Treat as own\n   • RMDs at own age 73\n\n2. INHERITED IRA:\n   • Use own life expectancy\n   • Can withdraw before 59½ without penalty\n\n3. LUMP SUM:\n   • Fully taxable',
    difficulty: 'medium',
    tags: ['inherited-ira', 'spouse', 'options']
  },
  {
    id: 'FC-RET-054',
    domain: 'RET',
    category: 'NUA',
    front: 'What is NET UNREALIZED APPRECIATION (NUA)?',
    back: 'NUA Strategy:\n• Applies to employer stock in 401(k)\n• Lump sum distribution to taxable account\n• Pay ordinary income tax on cost basis only\n• NUA taxed as LTCG when sold\n\nBest when:\n• Large appreciation\n• Low cost basis\n• Lower tax bracket at distribution',
    difficulty: 'hard',
    tags: ['nua', 'employer-stock', 'strategy']
  },
  {
    id: 'FC-RET-055',
    domain: 'RET',
    category: 'SEPP',
    front: 'What is a SUBSTANTIALLY EQUAL PERIODIC PAYMENT (72t)?',
    back: '72(t) SEPP Rules:\n• Avoid 10% early withdrawal penalty\n• Must continue for 5 years OR until 59½\n• Three calculation methods:\n  - Required Minimum Distribution\n  - Fixed Amortization\n  - Fixed Annuitization\n• Cannot modify once started\n• Penalty if broken: retroactive',
    difficulty: 'hard',
    tags: ['sepp', '72t', 'early-withdrawal']
  },
  {
    id: 'FC-RET-056',
    domain: 'RET',
    category: 'Annuities',
    front: 'What is an IMMEDIATE ANNUITY?',
    back: 'Immediate Annuity (SPIA):\n• Lump sum premium\n• Payments begin immediately\n• Fixed or variable payments\n• Life, period certain, or both\n• No accumulation phase\n• Addresses longevity risk\n• Irrevocable (usually)',
    difficulty: 'medium',
    tags: ['annuity', 'immediate', 'income']
  },
  {
    id: 'FC-RET-057',
    domain: 'RET',
    category: 'Annuities',
    front: 'What is a DEFERRED ANNUITY?',
    back: 'Deferred Annuity:\n• Accumulation phase before payments\n• Fixed, variable, or indexed\n• Tax-deferred growth\n• Surrender charges apply\n• Annuitization optional\n• Death benefit features\n• Income riders available',
    difficulty: 'medium',
    tags: ['annuity', 'deferred', 'accumulation']
  },
  {
    id: 'FC-RET-058',
    domain: 'RET',
    category: 'Annuities',
    front: 'How are NON-QUALIFIED annuities taxed?',
    back: 'Non-Qualified Annuity Taxation:\n\nDuring Accumulation:\n• Tax-deferred growth\n\nWithdrawals (before annuitization):\n• LIFO - earnings first (taxable)\n• 10% penalty before 59½\n\nAnnuity Payments:\n• Exclusion ratio (return of basis tax-free)\n• Remaining = taxable',
    difficulty: 'hard',
    tags: ['annuity', 'taxation', 'non-qualified']
  },
  {
    id: 'FC-RET-059',
    domain: 'RET',
    category: 'Long-Term Care',
    front: 'What retirement planning considerations for LONG-TERM CARE?',
    back: 'LTC Retirement Planning:\n• 70% chance of needing some LTC after 65\n• Medicare: Only 100 days skilled nursing\n• Medicaid: Must "spend down" assets\n• LTC Insurance: Self-insure risk\n• Hybrid products: Life + LTC\n• Average nursing home: $7,000-10,000/month',
    difficulty: 'medium',
    tags: ['ltc', 'healthcare', 'planning']
  },
  {
    id: 'FC-RET-060',
    domain: 'RET',
    category: 'Calculations',
    front: 'How to calculate RETIREMENT GAP?',
    back: 'Retirement Gap Calculation:\n\n1. Desired annual income (today\'s $)\n2. Inflate to retirement (if serial payment)\n3. Subtract guaranteed income (SS, pension)\n4. Calculate PV of annuity needed\n5. Subtract current savings (FV to retirement)\n6. Gap = Additional savings needed\n\nSolve for PMT to close gap',
    difficulty: 'hard',
    tags: ['calculation', 'gap', 'planning']
  },
  {
    id: 'FC-RET-061',
    domain: 'RET',
    category: 'Social Security',
    front: 'What is the WINDFALL ELIMINATION PROVISION (WEP)?',
    back: 'WEP:\n• Reduces Social Security for those with pension from non-covered employment\n• Affects government workers not paying SS tax\n• Modified formula reduces benefit\n• Maximum reduction ~$500/month\n• Eliminated if 30+ years substantial earnings',
    difficulty: 'hard',
    tags: ['social-security', 'wep', 'pension']
  },
  {
    id: 'FC-RET-062',
    domain: 'RET',
    category: 'Social Security',
    front: 'What is the GOVERNMENT PENSION OFFSET (GPO)?',
    back: 'GPO:\n• Affects spousal/survivor SS benefits\n• If receiving pension from non-covered employment\n• Offset = 2/3 of government pension\n• Can reduce SS spousal benefit to zero\n• Different from WEP\n• Applies to government workers',
    difficulty: 'hard',
    tags: ['social-security', 'gpo', 'pension']
  },
  {
    id: 'FC-RET-063',
    domain: 'RET',
    category: 'Plan Design',
    front: 'What is a CROSS-TESTED or AGE-WEIGHTED plan?',
    back: 'Cross-Tested Plan:\n• Profit sharing allocation method\n• Benefits tested, not contributions\n• Favors older employees\n• Must pass nondiscrimination testing\n• Good for older business owners\n• Younger employees get less\n\nAge-Weighted:\n• Similar, uses age factor in allocation',
    difficulty: 'hard',
    tags: ['plan-design', 'cross-tested', 'allocation']
  },
  {
    id: 'FC-RET-064',
    domain: 'RET',
    category: 'Plan Design',
    front: 'What is a CASH BALANCE plan?',
    back: 'Cash Balance Plan:\n• Hybrid: DB promise + DC presentation\n• Hypothetical account balance\n• Guaranteed return (pay credits)\n• Portable like DC plan\n• Favors older employees less than DB\n• PBGC covered\n• Popular for small to mid-size firms',
    difficulty: 'hard',
    tags: ['cash-balance', 'hybrid', 'plan-design']
  },
  {
    id: 'FC-RET-065',
    domain: 'RET',
    category: 'Tax Planning',
    front: 'What is a ROTH CONVERSION LADDER?',
    back: 'Roth Conversion Ladder:\n• Early retirement strategy\n• Convert Traditional to Roth each year\n• Pay tax on conversion\n• Wait 5 years to access converted amount\n• Fill low tax brackets\n• Avoid 10% penalty\n• Requires planning 5+ years ahead',
    difficulty: 'hard',
    tags: ['roth', 'conversion', 'early-retirement']
  },
  {
    id: 'FC-RET-066',
    domain: 'RET',
    category: 'Calculations',
    front: 'What is REPLACEMENT RATIO and typical targets?',
    back: 'Replacement Ratio:\n• Retirement income ÷ Pre-retirement income\n\nTargets:\n• General rule: 70-80%\n• Higher income: May need less %\n• Lower income: May need higher %\n\nFactors reducing need:\n• No payroll taxes\n• No retirement savings\n• Paid-off mortgage\n• Lower expenses',
    difficulty: 'medium',
    tags: ['calculation', 'replacement', 'income']
  },
  {
    id: 'FC-RET-067',
    domain: 'RET',
    category: 'Risk Management',
    front: 'What are the MAJOR RETIREMENT RISKS?',
    back: 'Retirement Risks:\n• Longevity: Outliving money\n• Inflation: Purchasing power erosion\n• Sequence of Returns: Early losses\n• Healthcare: Rising medical costs\n• Market: Investment volatility\n• Interest Rate: Income reduction\n• Policy: Tax/benefit changes',
    difficulty: 'medium',
    tags: ['risk', 'planning', 'retirement']
  },
  {
    id: 'FC-RET-068',
    domain: 'RET',
    category: 'Strategies',
    front: 'What is SOCIAL SECURITY OPTIMIZATION?',
    back: 'SS Optimization Strategies:\n• Delay to maximize benefit\n• Coordinate spousal claims\n• Higher earner delays longer\n• Consider break-even analysis\n• Factor health and longevity\n• Survivor benefit planning\n• Minimize taxation of benefits',
    difficulty: 'medium',
    tags: ['social-security', 'strategy', 'optimization']
  },
  {
    id: 'FC-RET-069',
    domain: 'RET',
    category: 'Taxation',
    front: 'How is SOCIAL SECURITY taxed?',
    back: 'SS Taxation:\n• Up to 85% can be taxable\n\nProvisional Income = AGI + ½ SS + Tax-exempt interest\n\nSingle:\n• <$25K: 0% taxable\n• $25K-$34K: up to 50%\n• >$34K: up to 85%\n\nMFJ:\n• <$32K: 0%\n• $32K-$44K: up to 50%\n• >$44K: up to 85%',
    difficulty: 'hard',
    tags: ['social-security', 'taxation', 'provisional']
  },
  {
    id: 'FC-RET-070',
    domain: 'RET',
    category: 'Plan Features',
    front: 'What is AUTOMATIC ENROLLMENT in 401(k)?',
    back: 'Automatic Enrollment:\n• Employees enrolled unless opt-out\n• Default contribution rate (often 3%)\n• Default investment (usually TDF)\n• Safe harbor from fiduciary liability\n• QACA: Qualified Automatic Contribution Arrangement\n• EACA: Eligible Automatic Contribution Arrangement\n• Increases participation significantly',
    difficulty: 'medium',
    tags: ['401k', 'automatic', 'enrollment']
  },
];
