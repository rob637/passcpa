/**
 * CFP Study Guide - All Domains
 * Certified Financial Planner Examination
 * 
 * Based on CFP Board Principal Knowledge Topics
 */

export interface CFPStudyGuide {
  id: string;
  title: string;
  version: string;
  lastUpdated: string;
  examFormat: ExamFormat;
  domains: CFPDomain[];
  studyPlan: StudyWeek[];
  examTips: string[];
  testTakingStrategies: string[];
}

export interface StudyWeek {
  week: number;
  focus: string;
  hours: number;
  topics: string[];
  activities: string[];
}

export interface ExamFormat {
  questions: number;
  duration: string;
  format: string;
  passingScore: string;
}

export interface CFPDomain {
  id: string;
  name: string;
  weight: string;
  questionCount: string;
  overview: string;
  keyTopics: TopicArea[];
  examTips: string[];
}

export interface TopicArea {
  name: string;
  description: string;
  keyPoints: string[];
  mustKnow?: string[];
}

export const CFP_COMPREHENSIVE_GUIDE: CFPStudyGuide = {
  id: 'cfp-comprehensive-guide',
  title: 'CFP Certification Examination Study Guide',
  version: '2026',
  lastUpdated: '2026-02-01',

  examFormat: {
    questions: 170,
    duration: '6 hours (two 3-hour sessions)',
    format: 'Multiple choice, includes case studies (item sets)',
    passingScore: 'Criterion-referenced (varies by exam)',
  },

  domains: [
    // =====================================================
    // Domain 1: Professional Conduct and Regulation (15%)
    // =====================================================
    {
      id: 'GEN',
      name: 'General Principles of Financial Planning',
      weight: '15%',
      questionCount: '~26 questions',
      overview: 'Ethics, practice standards, client communication, and regulatory compliance.',

      keyTopics: [
        {
          name: 'CFP Board Standards of Conduct',
          description: 'Ethics, practice standards, and fiduciary duty',
          keyPoints: [
            'Fiduciary duty: Act in client\'s best interest at all times',
            'Duty of Loyalty: No conflicts; disclose material conflicts',
            'Duty of Care: Competence, thoroughness, diligence',
            'Duty to Follow Client Instructions: Within ethical bounds',
            'Code of Ethics: Integrity, objectivity, competence, fairness, confidentiality, professionalism, diligence',
            'Practice Standards: 7-step financial planning process',
          ],
          mustKnow: [
            'The 7-step financial planning process',
            'Material conflict disclosure requirements',
            'Compensation disclosure',
          ],
        },
        {
          name: 'Financial Planning Process',
          description: 'The 7-step client engagement process',
          keyPoints: [
            '1. Understanding client circumstances, goals, values',
            '2. Identifying and selecting goals',
            '3. Analyzing current course vs. potential strategies',
            '4. Developing recommendations',
            '5. Presenting recommendations',
            '6. Implementing recommendations',
            '7. Monitoring and updating',
            'Engagement letter requirements',
            'Scope of engagement definition',
          ],
        },
        {
          name: 'Regulatory Environment',
          description: 'SEC, state regulators, and professional standards',
          keyPoints: [
            'Investment Advisers Act of 1940: RIA registration, Form ADV',
            'Securities Act of 1933: Primary market disclosure',
            'Securities Exchange Act of 1934: Secondary market, brokers',
            'FINRA: Broker-dealer regulation, suitability',
            'State insurance regulators: License requirements',
            'Fiduciary vs. suitability standard',
            'Form ADV Part 2A (brochure) and Part 2B (supplement)',
          ],
        },
        {
          name: 'Behavioral Finance',
          description: 'Client psychology and decision-making biases',
          keyPoints: [
            'Loss aversion: Losses hurt more than gains feel good',
            'Anchoring: Over-reliance on first piece of information',
            'Mental accounting: Treating money differently based on source',
            'Overconfidence: Overestimating ability/knowledge',
            'Confirmation bias: Seeking supporting information',
            'Recency bias: Overweighting recent events',
            'Framing effects: Decision changes based on presentation',
            'Risk tolerance vs. risk capacity vs. risk perception',
          ],
        },
      ],

      examTips: [
        'Ethics questions are heavily tested',
        'Know the 7-step process cold',
        'Understand when fiduciary vs. suitability applies',
        'Behavioral biases appear in case studies',
      ],
    },

    // =====================================================
    // Domain 2: Risk Management and Insurance (12%)
    // =====================================================
    {
      id: 'RISK',
      name: 'Risk Management and Insurance Planning',
      weight: '12%',
      questionCount: '~20 questions',
      overview: 'Life, health, disability, property, and liability insurance analysis.',

      keyTopics: [
        {
          name: 'Life Insurance',
          description: 'Types, features, and needs analysis',
          keyPoints: [
            'Term: Pure death benefit, level/decreasing, convertible',
            'Whole Life: Fixed premium, cash value, dividends (participating)',
            'Universal Life: Flexible premium, credited interest rate',
            'Variable UL: Subaccounts, investment risk, no guaranteed CV',
            'Indexed UL: Tied to index (S&P 500), caps and floors',
            'Needs analysis: Human life value, income replacement, expense elimination',
            'Section 101: Death benefits generally income tax-free',
            'MEC rules: 7-pay test, affects withdrawals and loans',
            'Transfer for value: Death benefit becomes taxable',
          ],
          mustKnow: [
            'Premium/face amount/cash value relationships',
            'MEC 7-pay test consequences',
            'Transfer for value exceptions (spouse, partner, insured, corp)',
          ],
        },
        {
          name: 'Disability Insurance',
          description: 'Income protection and policy features',
          keyPoints: [
            'Own occupation vs. any occupation definition',
            'Elimination period: Waiting period before benefits start',
            'Benefit period: Duration of payments',
            'Residual benefits: Partial disability coverage',
            'COLA rider: Inflation adjustment during disability',
            'Non-cancelable: Premium/benefits guaranteed',
            'Guaranteed renewable: Can\'t cancel but can raise premium by class',
            'Tax treatment: Employer-paid = benefits taxable; employee-paid = tax-free',
          ],
        },
        {
          name: 'Health Insurance',
          description: 'Medical coverage and HSA planning',
          keyPoints: [
            'HDHP requirements: Min deductible $1,650 single, $3,300 family (2026)',
            'HSA contributions: $4,450 single, $8,900 family (2026), $1,000 55+ catchup',
            'HSA triple tax advantage: Deduction, tax-free growth, tax-free for medical',
            'Medicare: Part A (hospital), B (medical), C (Advantage), D (drugs)',
            'Medicare eligibility: Age 65 or disabled/ESRD',
            'COBRA: 18 months continuation (36 for qualifying events)',
            'ACA marketplace: Premium tax credits, subsidies',
          ],
          mustKnow: [
            'HSA eligibility rules and contribution limits',
            'Medicare enrollment periods and penalties',
            'COBRA coverage duration by event type',
          ],
        },
        {
          name: 'Long-Term Care Insurance',
          description: 'Coverage for extended care needs',
          keyPoints: [
            'Benefit triggers: Cannot perform 2 of 6 ADLs or cognitive impairment',
            'ADLs: Bathing, dressing, toileting, transferring, continence, eating',
            'Daily/monthly benefit: Coverage amount per day/month',
            'Elimination period: 30-90 days typical',
            'Benefit period: 2-5 years or lifetime',
            'Partnership policies: Asset protection with Medicaid',
            'Tax-qualified policies: Benefits tax-free if triggers met',
            'Hybrid policies: Life insurance with LTC rider',
          ],
        },
        {
          name: 'Property and Liability Insurance',
          description: 'Homeowners, auto, umbrella coverage',
          keyPoints: [
            'HO-3: Special form, open perils on dwelling, named perils on contents',
            'HO-5: Comprehensive, open perils on both',
            'Replacement cost vs. actual cash value',
            '80% coinsurance rule: Maintain 80% of RCV',
            'Liability coverage: Section II, bodily injury and property damage',
            'Auto: Liability, collision, comprehensive, UM/UIM',
            'Umbrella: Excess liability, typically $1M+ coverage',
            'Personal liability: Homeowners limit typically $100K-$300K',
          ],
        },
      ],

      examTips: [
        'Know life insurance tax rules (§101, MEC, transfer for value)',
        'Disability own-occ vs. any-occ frequently tested',
        'HSA rules are high-frequency topics',
        'LTC benefit triggers must be memorized',
      ],
    },

    // =====================================================
    // Domain 3: Investment Planning (17%)
    // =====================================================
    {
      id: 'INV',
      name: 'Investment Planning',
      weight: '17%',
      questionCount: '~29 questions',
      overview: 'Portfolio theory, asset allocation, securities analysis, and performance measurement.',

      keyTopics: [
        {
          name: 'Modern Portfolio Theory',
          description: 'Diversification and efficient frontier concepts',
          keyPoints: [
            'Systematic risk: Market risk, cannot be diversified away',
            'Unsystematic risk: Company-specific, diversifiable',
            'Efficient frontier: Optimal risk-return combinations',
            'Correlation: -1 to +1, lower = better diversification',
            'Standard deviation: Measure of total risk',
            'Beta: Measure of systematic risk relative to market (market β = 1)',
            'R-squared (R²): Percent of return explained by market',
          ],
          mustKnow: [
            'Standard deviation vs. beta distinction',
            'Correlation and diversification relationship',
            'Efficient frontier interpretation',
          ],
        },
        {
          name: 'Asset Allocation',
          description: 'Strategic and tactical allocation approaches',
          keyPoints: [
            'Strategic: Long-term target based on goals and risk tolerance',
            'Tactical: Short-term deviations based on market conditions',
            'Core-satellite: Index core + active satellites',
            'Rebalancing: Calendar vs. percentage deviation triggers',
            'Asset location: Tax-efficient placement across account types',
            'Stocks in taxable (lower taxes, loss harvesting)',
            'Bonds in tax-deferred (interest taxed as ordinary)',
            'Position sizing: Concentration risk management',
          ],
        },
        {
          name: 'Risk-Adjusted Performance',
          description: 'Measuring investment returns relative to risk',
          keyPoints: [
            'Sharpe Ratio: (Return - Risk-free) / Std Dev',
            'Treynor Ratio: (Return - Risk-free) / Beta',
            'Jensen\'s Alpha: Actual return - CAPM expected return',
            'CAPM: E(R) = Rf + β(Rm - Rf)',
            'Information Ratio: Alpha / Tracking Error',
            'Sortino Ratio: Uses downside deviation (not std dev)',
            'Higher Sharpe/Treynor = better risk-adjusted performance',
          ],
          mustKnow: [
            'Sharpe ratio formula and interpretation',
            'CAPM formula and components',
            'When to use Sharpe vs. Treynor',
          ],
        },
        {
          name: 'Bond Investment',
          description: 'Fixed income analysis and valuation',
          keyPoints: [
            'Duration: Price sensitivity to interest rate changes',
            'Convexity: Rate of change of duration',
            'Yield to Maturity: Total return if held to maturity',
            'Current Yield: Annual coupon / Current price',
            'Taxable equivalent yield: Tax-free yield / (1 - tax rate)',
            'Inverse relationship: Prices down when rates up',
            'Credit risk: Default probability',
            'Reinvestment risk: Coupons reinvested at lower rates',
            'Call risk: Called when rates fall (bad for investor)',
          ],
        },
        {
          name: 'Equity Valuation',
          description: 'Stock analysis methods',
          keyPoints: [
            'DDM: P = D1 / (r - g) where g = constant growth rate',
            'P/E Ratio: Price per share / Earnings per share',
            'PEG Ratio: P/E / Earnings growth rate',
            'EV/EBITDA: Enterprise value measure',
            'Book Value: Assets - Liabilities',
            'Fundamental analysis: Company financials and operations',
            'Technical analysis: Price/volume patterns and trends',
          ],
        },
        {
          name: 'Investment Vehicles',
          description: 'Mutual funds, ETFs, and alternatives',
          keyPoints: [
            'Mutual funds: Open-end, NAV pricing, end of day',
            'ETFs: Exchange-traded, intraday, tax efficient',
            'Closed-end funds: Fixed shares, premium/discount to NAV',
            'Index funds: Passive management, low expense ratios',
            'Alternative investments: Hedge funds, PE, real assets',
            'Accredited investor: $200K income ($300K joint) or $1M+ net worth',
            'REITs: Real estate exposure, 90% distribution requirement',
          ],
        },
      ],

      examTips: [
        'Know Sharpe and Treynor formulas cold',
        'CAPM is tested regularly',
        'Duration and bond pricing relationship',
        'Correlation and diversification benefits',
        'Practice risk-adjusted return comparisons',
      ],
    },

    // =====================================================
    // Domain 4: Tax Planning (14%)
    // =====================================================
    {
      id: 'TAX',
      name: 'Tax Planning',
      weight: '14%',
      questionCount: '~24 questions',
      overview: 'Individual taxation, tax-advantaged strategies, and planning techniques.',

      keyTopics: [
        {
          name: 'Income Tax Fundamentals',
          description: 'Tax calculation and filing requirements',
          keyPoints: [
            'Gross Income - Adjustments = AGI',
            'AGI - Deductions (Standard/Itemized) = Taxable Income',
            'Tax brackets 2026: 10%, 12%, 22%, 24%, 32%, 35%, 37%',
            'Filing status: Single, MFJ, MFS, HOH, QW',
            'Standard deduction 2026: $15,350 single, $30,700 MFJ',
            'AMT: Alternative minimum tax for preference items',
            'NIIT: 3.8% on investment income over $200K/$250K',
          ],
        },
        {
          name: 'Capital Gains and Losses',
          description: 'Investment taxation rules',
          keyPoints: [
            'Short-term: Held ≤1 year, taxed as ordinary income',
            'Long-term: Held >1 year, preferential rates (0%, 15%, 20%)',
            'Netting rules: ST gains/losses net first, then LT, then cross',
            '$3,000 annual loss limitation against ordinary income',
            'Wash sale: 30 days before/after, loss disallowed',
            'Step-up in basis at death: Eliminates capital gain',
            'Collectibles: 28% maximum rate',
            'QSBS: §1202 exclusion up to $10M or 10× basis',
          ],
          mustKnow: [
            'Long-term capital gains rate thresholds',
            'Wash sale rule (30-day window both ways)',
            'Loss carryforward (unlimited)',
          ],
        },
        {
          name: 'Tax-Advantaged Accounts',
          description: 'Retirement and education account rules',
          keyPoints: [
            'Traditional IRA: Deductible contribution, taxable withdrawal',
            'Roth IRA: After-tax contribution, tax-free withdrawal',
            '401(k) 2026: $24,500 limit, $7,500 catch-up if 50+',
            'IRA 2026: $7,500 limit, $1,000 catch-up if 50+',
            'Backdoor Roth: Nondeductible IRA → Roth conversion',
            '529 Plan: State tax deduction (varies), tax-free for education',
            'Coverdell ESA: $2,000/year limit, K-12 and college',
            'ABLE accounts: Disability savings, $19,000/year',
          ],
        },
        {
          name: 'Charitable Giving Strategies',
          description: 'Tax-efficient charitable donations',
          keyPoints: [
            'Cash donations: Up to 60% AGI limitation',
            'Appreciated property: FMV deduction, avoid capital gains (30% AGI)',
            'Donor Advised Fund: Immediate deduction, distribute later',
            'Charitable Remainder Trust: Income now, charity later',
            'Charitable Lead Trust: Charity first, heirs later',
            'QCD: Qualified Charitable Distribution from IRA (age 70½+)',
            'Bunching strategy: Combine years to exceed standard deduction',
          ],
        },
        {
          name: 'Business and Self-Employment',
          description: 'Business owner tax planning',
          keyPoints: [
            'Self-employment tax: 15.3% on 92.35% of net SE income',
            'QBI deduction: 20% of qualified business income (§199A)',
            'W-2/capital limitation above thresholds',
            'SSTB: Specified service trade/business subject to limits',
            'Entity choice: Schedule C, S Corp, partnership tax implications',
            'Reasonable compensation for S Corp owners',
            'Pass-through losses: Basis, at-risk, passive activity limits',
          ],
        },
      ],

      examTips: [
        'Know capital gains netting rules',
        'Retirement contribution limits are commonly tested',
        'Roth vs. traditional analysis',
        'QBI deduction rules and limitations',
        'Charitable planning strategies for high-income clients',
      ],
    },

    // =====================================================
    // Domain 5: Retirement Savings and Income Planning (18%)
    // =====================================================
    {
      id: 'RET',
      name: 'Retirement Savings and Income Planning',
      weight: '18%',
      questionCount: '~31 questions',
      overview: 'Retirement plan types, Social Security, distribution planning, and income strategies.',

      keyTopics: [
        {
          name: 'Employer Retirement Plans',
          description: 'Qualified plan types and features',
          keyPoints: [
            'Defined benefit: Formula-based, employer bears investment risk',
            'Defined contribution: Account balance, employee bears investment risk',
            '401(k)/403(b): Employee deferral + employer match',
            'Vesting schedules: 3-year cliff or 2-6 year graded',
            'Top-heavy rules: >60% in key employees, special contributions',
            'Safe harbor 401(k): Avoid ADP/ACP testing',
            'SIMPLE IRA: <100 employees, 3% match or 2% nonelective',
            'SEP IRA: Up to 25% compensation, $71,500 max (2026)',
          ],
          mustKnow: [
            'Contribution limits for each plan type',
            'Early withdrawal penalties and exceptions',
            'Required minimum distribution (RMD) rules',
          ],
        },
        {
          name: 'SECURE 2.0 Changes',
          description: 'Recent retirement legislation updates',
          keyPoints: [
            'RMD age: 73 (2023-2032), 75 (2033+)',
            'Catch-up contributions: $7,500 (50+), $11,250 (60-63) starting 2025',
            'Roth employer match option: Match can go to Roth, immediately vested',
            '529-to-Roth: $35,000 lifetime limit, 15-year account requirement',
            'Student loan matching: Employer can match student loan payments',
            'Emergency savings: PLESA up to $2,500, penalty-free withdrawals',
            'Reduced RMD penalty: 25% (10% if corrected timely)',
            'Roth 401(k): No RMDs during lifetime (starting 2024)',
          ],
        },
        {
          name: 'Social Security',
          description: 'Benefits, strategies, and taxation',
          keyPoints: [
            'Full retirement age: 66-67 depending on birth year',
            'Early claiming: 62, permanent reduction (~6.67%/year)',
            'Delayed credits: 8%/year past FRA up to age 70',
            'Spousal benefit: Up to 50% of worker\'s PIA',
            'Survivor benefit: Up to 100% of deceased spouse\'s benefit',
            'File and suspend: Ended 2016, but survivor strategies remain',
            'Taxation: 0%, 50%, or 85% taxable based on provisional income',
            'Provisional income: AGI + tax-exempt interest + 50% SS benefits',
            'Earnings test: Before FRA, $1 withheld per $2 earned over $23,400',
          ],
          mustKnow: [
            'FRA by birth year ranges',
            'Reduction/delayed credit percentages',
            'Provisional income taxation thresholds',
          ],
        },
        {
          name: 'Distribution Planning',
          description: 'RMDs and withdrawal strategies',
          keyPoints: [
            'RMD: Required minimum distribution from retirement accounts',
            'RMD calculation: Prior Dec 31 balance / Uniform Lifetime Table divisor',
            'First RMD deadline: April 1 of year after reaching RMD age',
            'Inherited IRA: 10-year rule for most beneficiaries (SECURE Act)',
            'Eligible designated beneficiaries: Spouse, minor child, disabled, <10 years younger',
            'Roth IRA: No RMDs for owner; 10-year rule for most beneficiaries',
            'SEPP/72(t): Substantially equal periodic payments avoid 10% penalty',
            'NUA: Net unrealized appreciation on employer stock',
          ],
        },
        {
          name: 'Retirement Income Strategies',
          description: 'Creating sustainable retirement income',
          keyPoints: [
            'Systematic withdrawal: 4% rule, adjust for inflation',
            'Bucket strategy: Short, medium, long-term buckets',
            'Floor-and-upside: Guaranteed floor + growth potential',
            'Annuitization: Life annuity for longevity protection',
            'Sequence of returns risk: Early losses hurt more',
            'Tax-efficient withdrawal sequence: Generally taxable → tax-deferred → tax-free',
            'Roth conversions: Strategic conversions in low-income years',
            'Social Security bridge: Delay SS while spending portfolio',
          ],
        },
      ],

      examTips: [
        'SECURE 2.0 changes are highly testable',
        'Social Security optimization strategies',
        'Know RMD calculation mechanics',
        '10-year rule for inherited IRAs',
        'Contribution limits and catch-ups',
      ],
    },

    // =====================================================
    // Domain 6: Estate Planning (10%)
    // =====================================================
    {
      id: 'EST',
      name: 'Estate Planning',
      weight: '10%',
      questionCount: '~17 questions',
      overview: 'Wealth transfer, trust planning, and estate tax strategies.',

      keyTopics: [
        {
          name: 'Estate Transfer Basics',
          description: 'Probate and non-probate transfers',
          keyPoints: [
            'Will: Revocable, controls probate assets only',
            'Intestate succession: State law governs without valid will',
            'Probate assets: Titled in decedent\'s name alone',
            'Non-probate: Joint tenancy, beneficiary designations, trusts',
            'TOD/POD: Transfer/payable on death designations',
            'Community property: 9 states, each spouse owns 50%',
            'Tenancy by entirety: Married couples, creditor protection',
          ],
        },
        {
          name: 'Trust Fundamentals',
          description: 'Trust types and applications',
          keyPoints: [
            'Revocable living trust: Avoid probate, no estate tax benefit',
            'Irrevocable trust: Remove assets from estate, gift tax implications',
            'Testamentary trust: Created by will, goes through probate',
            'Grantor trust: Income taxed to grantor (rules in IRC 671-679)',
            'Simple trust: Must distribute all DNI currently',
            'Complex trust: Can accumulate income, make charitable gifts',
            'Crummey powers: Present interest for annual exclusion',
          ],
          mustKnow: [
            'Revocable vs. irrevocable distinctions',
            'Grantor trust rules',
            'Crummey powers for annual exclusion',
          ],
        },
        {
          name: 'Estate and Gift Tax',
          description: 'Transfer tax system',
          keyPoints: [
            'Unified credit: $7.0 million exemption (2026 - TCJA sunset)',
            'Annual exclusion: $19,000 per donee (2026)',
            'Gift splitting: Married couples can double gifts',
            'Educational/medical: Unlimited if paid directly',
            'Estate tax rate: 40% on taxable estate over exemption',
            'Gross estate: FMV of all assets, including life insurance',
            'Marital deduction: Unlimited for US citizen spouse',
            'Step-up in basis: Inherited assets receive date-of-death FMV',
            'GSTT: Generation-skipping transfer tax, separate $7.0M exemption',
          ],
        },
        {
          name: 'Advanced Estate Planning',
          description: 'Sophisticated wealth transfer techniques',
          keyPoints: [
            'GRAT: Grantor retained annuity trust, zeroed-out for gift tax',
            'QPRT: Qualified personal residence trust',
            'ILIT: Irrevocable life insurance trust, remove from estate',
            'Family LP/LLC: Valuation discounts, control retention',
            'Charitable remainder trust: Income to donor, remainder to charity',
            'Charitable lead trust: Income to charity, remainder to heirs',
            'Private foundation vs. donor advised fund',
            'Dynasty trust: Multi-generational, avoid estate tax at each level',
          ],
        },
        {
          name: 'Incapacity Planning',
          description: 'Powers of attorney and healthcare directives',
          keyPoints: [
            'Durable power of attorney: Financial decisions if incapacitated',
            'Healthcare proxy: Medical decisions',
            'Living will: End-of-life care preferences',
            'HIPAA authorization: Medical information access',
            'Guardianship/conservatorship: Court-appointed, expensive',
            'Revocable trust: Successor trustee for incapacity',
            'Digital assets: Fiduciary access to digital accounts',
          ],
        },
      ],

      examTips: [
        'Know unified credit and annual exclusion amounts',
        'GRAT, ILIT, CRT/CLT frequently tested',
        'Marital deduction is unlimited',
        'Step-up in basis rules',
        'Probate vs. non-probate asset transfers',
      ],
    },

    // =====================================================
    // Domain 7: Psychology of Financial Planning (7%)
    // =====================================================
    {
      id: 'PSY',
      name: 'Psychology of Financial Planning',
      weight: '7%',
      questionCount: '~12 questions',
      overview: 'Understanding client behavior, communication, and counseling techniques.',

      keyTopics: [
        {
          name: 'Client Communication',
          description: 'Effective communication techniques',
          keyPoints: [
            'Active listening: Fully concentrating on client',
            'Open-ended questions: Encourage detailed responses',
            'Reflective statements: Confirm understanding',
            'Body language: Nonverbal communication',
            'Empathy: Understanding client perspective',
            'Difficult conversations: Money scripts, family dynamics',
          ],
        },
        {
          name: 'Behavioral Biases',
          description: 'Common cognitive and emotional biases',
          keyPoints: [
            'Loss aversion: Prefer avoiding losses to equivalent gains',
            'Overconfidence: Overestimating own abilities',
            'Anchoring: Over-relying on first information received',
            'Herding: Following the crowd',
            'Status quo bias: Preference for current state',
            'Recency effect: Overweighting recent events',
            'Confirmation bias: Seeking confirming information',
            'Self-control: Difficulty with delayed gratification',
          ],
        },
        {
          name: 'Money Scripts',
          description: 'Unconscious beliefs about money',
          keyPoints: [
            'Money avoidance: Money is bad, undeserved',
            'Money worship: More money solves everything',
            'Money status: Self-worth equals net worth',
            'Money vigilance: Secrecy, anxiety about money',
            'Identifying and addressing unhealthy beliefs',
            'Couples with different money scripts',
          ],
        },
        {
          name: 'Life Transitions',
          description: 'Planning through major life changes',
          keyPoints: [
            'Marriage: Combining finances, goal alignment',
            'Divorce: Asset division, QDRO, support',
            'Death of spouse: Grief awareness, urgent vs. important',
            'Career change: Income impact, benefits transition',
            'Retirement: Identity transition, purpose',
            'Inheritance: Sudden wealth, family dynamics',
            'Crisis counseling: Emotional support vs. financial advice',
          ],
        },
      ],

      examTips: [
        'Know common behavioral biases and mitigation strategies',
        'Client communication in case studies',
        'Money scripts and their implications',
        'Recognize when to refer to therapist/counselor',
      ],
    },
  ],

  studyPlan: [
    {
      week: 1,
      focus: 'General Principles & Financial Planning Process',
      hours: 20,
      topics: ['CFP Board Standards', 'Fiduciary duty', '7-step process', 'Ethics'],
      activities: ['Read CFP Standards of Conduct', 'Practice 50 ethics MCQs'],
    },
    {
      week: 2,
      focus: 'Risk Management & Insurance Fundamentals',
      hours: 25,
      topics: ['Life insurance', 'Health insurance', 'Property & casualty', 'Disability'],
      activities: ['Insurance needs analysis', 'Policy comparison practice'],
    },
    {
      week: 3,
      focus: 'Risk Management Deep Dive',
      hours: 25,
      topics: ['Long-term care', 'Business insurance', 'Liability coverage', 'Medicare'],
      activities: ['Complete risk domain', 'Practice 100 MCQs'],
    },
    {
      week: 4,
      focus: 'Investment Planning Fundamentals',
      hours: 25,
      topics: ['Asset classes', 'Modern Portfolio Theory', 'CAPM', 'Alpha/Beta'],
      activities: ['Master risk-return calculations', 'Portfolio construction'],
    },
    {
      week: 5,
      focus: 'Investment Strategies & Analysis',
      hours: 25,
      topics: ['Security analysis', 'Asset allocation', 'Rebalancing', 'Behavioral finance'],
      activities: ['Investment policy statement practice', '100 investment MCQs'],
    },
    {
      week: 6,
      focus: 'Tax Planning',
      hours: 25,
      topics: ['Individual taxation', 'Capital gains', 'AMT', 'Tax-efficient strategies'],
      activities: ['Tax calculation practice', 'Master basis rules'],
    },
    {
      week: 7,
      focus: 'Tax Planning & Entity Selection',
      hours: 25,
      topics: ['Business entities', 'Pass-through taxation', 'Estate/gift tax basics'],
      activities: ['Complete tax domain', 'Practice 100 tax MCQs'],
    },
    {
      week: 8,
      focus: 'Retirement Planning Fundamentals',
      hours: 25,
      topics: ['Qualified plans', '401(k)', 'IRAs', 'Roth conversions', 'RMDs'],
      activities: ['Retirement plan comparison', 'Contribution limit rules'],
    },
    {
      week: 9,
      focus: 'Retirement Distribution & Social Security',
      hours: 25,
      topics: ['Distribution strategies', 'Social Security optimization', 'Medicare planning'],
      activities: ['Retirement income sequencing', 'SS break-even analysis'],
    },
    {
      week: 10,
      focus: 'Estate Planning',
      hours: 25,
      topics: ['Wills & trusts', 'Gift strategies', 'Charitable planning', 'Generation-skipping'],
      activities: ['Trust selection practice', 'Estate tax calculations'],
    },
    {
      week: 11,
      focus: 'Psychology & Case Studies',
      hours: 20,
      topics: ['Behavioral biases', 'Client communication', 'Life transitions', 'Item sets'],
      activities: ['Case study practice', 'Money script identification'],
    },
    {
      week: 12,
      focus: 'Final Review & Practice Exams',
      hours: 30,
      topics: ['All domains', 'Weak areas', 'Full-length practice exams'],
      activities: ['2 complete practice exams', 'Review missed questions', 'Time management drills'],
    },
  ],

  examTips: [
    'Use process of elimination on difficult questions',
    'Read case study facts carefully - all information provided is usually relevant',
    'Watch for qualifiers: "always," "never," "must," "may"',
    'Manage time: ~2 minutes per question, flag and move on',
    'First pass: Answer what you know confidently',
    'Second pass: Work through flagged questions',
    'Don\'t change answers unless you have a good reason',
    'Trust your preparation',
  ],

  testTakingStrategies: [
    'Read the last sentence of the question first to understand what\'s being asked',
    'Identify if it\'s asking for "best," "most appropriate," "first step," etc.',
    'For calculations, estimate first to eliminate obviously wrong answers',
    'In ethics questions, "disclose and document" is often correct',
    'For item sets, read the questions before the case to focus your reading',
    'Watch for distractors that mix correct and incorrect elements',
    'If two answers seem similar, there\'s probably a key distinction',
    'Mark calculation-heavy questions to return to if time permits',
  ],
};

export default CFP_COMPREHENSIVE_GUIDE;
