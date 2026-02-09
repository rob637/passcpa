/**
 * CPA REG Study Guide
 * Taxation and Regulation
 * 
 * Based on 2024-2026 AICPA Blueprint
 */

import { CPAStudyGuide, BlueprintArea, StudyWeek } from './far-study-guide';

export const REG_STUDY_GUIDE: CPAStudyGuide = {
  id: 'reg-study-guide',
  section: 'REG',
  title: 'Taxation and Regulation',
  version: '2024-2026',
  lastUpdated: '2024-12-01',

  examFormat: {
    testlets: 5,
    mcqs: 50,
    tbs: 7,
    duration: '4 hours',
  },

  blueprintAreas: [
    // =====================================================
    // REG Area I: Ethics and Tax Practice (10-20%)
    // =====================================================
    {
      id: 'REG-I',
      title: 'Area I: Ethics, Responsibilities & Practice',
      weight: '10-20%',
      overview: 'Professional and legal responsibilities in tax practice, including Circular 230.',

      keyTopics: [
        {
          name: 'Circular 230',
          description: 'Treasury regulations governing practice before the IRS',
          keyPoints: [
            'Who may practice: CPAs, attorneys, EAs, limited practice by others',
            'Due diligence: Must exercise care in preparing returns and representing clients',
            'Contingent fees: Generally prohibited for original returns; allowed for amended returns/claims',
            'Written advice: Must base on reasonable factual and legal assumptions',
            'Knowledge of error: Must notify client promptly; cannot sign if client refuses to correct',
            'Return preparer penalties: §6694 accuracy, §6695 procedural',
            'Censure, suspension, disbarment for violations',
          ],
          references: ['Treasury Circular 230'],
        },
        {
          name: 'Tax Return Preparer Standards',
          description: 'Legal standards for return positions',
          keyPoints: [
            'Substantial authority standard for undisclosed positions (35-40%)',
            'Reasonable basis + adequate disclosure for disclosed positions (20%)',
            'More-likely-than-not for tax shelter positions (>50%)',
            'Good faith reasonable cause defense',
            'Reliance on information furnished by taxpayer',
          ],
        },
        {
          name: 'Taxpayer Rights',
          description: 'Taxpayer Bill of Rights and procedures',
          keyPoints: [
            'Right to be informed, quality service, challenge IRS, appeal',
            'Statute of limitations: 3 years general, 6 years if 25% omission, unlimited fraud',
            'Interest and penalties: Late filing 5%/month, late payment 0.5%/month',
            'Accuracy penalty 20%, fraud penalty 75%',
            'Reasonable cause defense for most penalties',
          ],
        },
        {
          name: 'Business Law Concepts',
          description: 'Agency, contracts, and business associations',
          keyPoints: [
            'Agency: Actual authority (express/implied), apparent authority, ratification',
            'Agent duties: Loyalty, obedience, reasonable care, accounting',
            'Principal liability: Tort (scope of employment), contract (authorized acts)',
            'Contracts: Offer, acceptance, consideration, capacity, legality',
            'Statute of frauds: Real estate, 1+ year, $500+ goods, guaranty',
          ],
        },
      ],

      examTips: [
        'Circular 230 rules are frequently tested',
        'Know penalty thresholds and amounts',
        'Statutes of limitations heavily tested',
        'Agency principles appear in both MCQs and TBS',
      ],
    },

    // =====================================================
    // REG Area II: Business Entities (20-30%)
    // =====================================================
    {
      id: 'REG-II',
      title: 'Area II: Business Entity Taxation',
      weight: '20-30%',
      overview: 'Formation, operations, and liquidation of various business entities.',

      keyTopics: [
        {
          name: 'C Corporations',
          description: 'Formation, income, deductions, and distributions',
          keyPoints: [
            'Formation: §351 nonrecognition if control (80%) immediately after',
            'Basis: Carryover + gain recognized - boot received',
            'Taxable income: Gross income - deductions (DRD, charitable limits)',
            'DRD: 50% (<20%), 65% (20-79%), 100% (80%+, same group)',
            'Charitable contribution limit: 10% of taxable income (before DRD, carryforward 5 years)',
            'NOL: 80% of taxable income limit, indefinite carryforward',
            'AMT: 15% minimum tax on adjusted financial statement income (AFSI)',
            'Distributions: Earnings and profits determines dividend vs. return of capital',
          ],
          references: ['IRC §301-385'],
        },
        {
          name: 'S Corporations',
          description: 'Pass-through taxation for qualifying corporations',
          keyPoints: [
            '100 shareholder limit (family counted as 1), one class of stock, eligible shareholders only',
            'No C corps, partnerships, nonresident aliens as shareholders',
            'Items pass through to shareholders on ending date of S year',
            'Separately stated items: Capital gains/losses, §1231, dividends, charitable, interest income',
            'Shareholder basis: Investment + income - losses - distributions',
            'Loss limitation: Stock basis + debt basis; at-risk; passive activity',
            'AAA tracks accumulated adjustment account for distributions',
            'Built-in gains tax if former C corp: 5-year recognition period',
          ],
          references: ['IRC §1361-1379'],
        },
        {
          name: 'Partnerships',
          description: 'Formation, operations, and partner transactions',
          keyPoints: [
            'Formation: Generally tax-free; basis = FMV of property contributed',
            'Partner basis: Initial + income share - losses - distributions + liabilities',
            'Guaranteed payments: Deductible to partnership, ordinary income to partner',
            'Special allocations: Must have substantial economic effect',
            'Distributions: Generally tax-free; cash in excess of basis = gain',
            'Hot assets: §751 ordinary income (unrealized receivables, inventory)',
            'Substantial built-in loss: >$250,000 triggers inside basis adjustment',
          ],
          references: ['IRC §701-761'],
        },
        {
          name: 'Entity Comparison',
          description: 'Choice of entity considerations',
          keyPoints: [
            'C Corp: Double taxation, unlimited growth, fringe benefits deductible',
            'S Corp: Single taxation, limited shareholders, salary requirement',
            'Partnership: Maximum flexibility, SE tax, basis from debt',
            'LLC: Flexibility + liability protection, check-the-box rules',
            'Self-employment: Partners and LLC members (material participation) subject to SE',
            'Qualified Business Income deduction (§199A): 20% for pass-through income',
          ],
        },
      ],

      criticalFormulas: [
        'DRD amounts: 50% / 65% / 100% based on ownership percentage',
        'Shareholder stock basis: Beginning + Income - Losses - Distributions',
        'Partner outside basis: Capital + Share of liabilities',
      ],

      examTips: [
        '§351 and §721 formation rules critical for TBS',
        'Know basis calculations for all entity types',
        'DRD percentages and charitable limits memorize',
        'S Corp eligibility requirements frequently tested',
        'Partnership hot assets and §751 is complex but testable',
      ],
    },

    // =====================================================
    // REG Area III: Individual Taxation (35-45%)
    // =====================================================
    {
      id: 'REG-III',
      title: 'Area III: Individual Taxation',
      weight: '35-45%',
      overview: 'Comprehensive individual taxation including income, deductions, and credits.',

      keyTopics: [
        {
          name: 'Gross Income',
          description: 'Inclusions and exclusions from gross income',
          keyPoints: [
            'All income from whatever source unless specifically excluded',
            'Inclusions: Compensation, business income, dividends, interest, rents, royalties, alimony (pre-2019)',
            'Exclusions: Gifts, inheritance, life insurance proceeds, muni bond interest, qualified scholarships',
            'Constructive receipt: Must include when available without restriction',
            'Assignment of income: Taxed to earner regardless of payment direction',
            'Community property: Income split equally between spouses',
          ],
        },
        {
          name: 'Adjustments to Income',
          description: 'Above-the-line deductions for AGI',
          keyPoints: [
            'Educator expenses: $300 max',
            'Self-employment tax: 50% of SE tax',
            'Self-employed health insurance: 100% of premiums',
            'Self-employed retirement: SEP, SIMPLE, Keogh contributions',
            'IRA contributions: Traditional deductible subject to limits',
            'HSA contributions: $4,150 single, $8,300 family (2024)',
            'Alimony paid: Pre-2019 divorce agreements only',
            'Student loan interest: $2,500 max, phased out at higher income',
          ],
        },
        {
          name: 'Itemized Deductions',
          description: 'Below-the-line deductions from AGI',
          keyPoints: [
            'Medical: Excess of 7.5% of AGI',
            'Taxes: SALT limited to $10,000 (state/local income or sales + property)',
            'Interest: Home mortgage acquisition debt ($750K limit), investment interest',
            'Charitable: Cash 60% AGI, capital gain property 30% AGI, 5-year carryforward',
            'Casualty: Federally declared disaster only, $100 floor + 10% AGI',
            'Standard deduction: $14,600 single, $29,200 MFJ (2024)',
          ],
        },
        {
          name: 'Property Transactions',
          description: 'Basis, recognition, and character of gains/losses',
          keyPoints: [
            'Basis: Cost + improvements - depreciation',
            'Gift: Carryover basis (loss = lower of FMV or donor basis)',
            'Inheritance: Stepped-up (or down) to date of death FMV',
            '§1031 Like-kind exchange: Real property only, boot triggers gain',
            '§121 Exclusion: $250K single, $500K MFJ, 2 of 5 year ownership/use',
            '§1231: Net gain = LTCG, net loss = ordinary',
            '§1245 recapture: Depreciation on personal property = ordinary',
            '§1250: 25% rate on unrecaptured §1250 gain (depreciation on real property)',
          ],
        },
        {
          name: 'Tax Credits',
          description: 'Nonrefundable and refundable credits',
          keyPoints: [
            'Child tax credit: $2,000 per qualifying child, $1,700 refundable',
            'Child care credit: 20-35% of $3,000 (1 child) or $6,000 (2+)',
            'Earned income credit: Refundable, based on earned income and children',
            'Education credits: American Opportunity ($2,500), Lifetime Learning ($2,000)',
            'Adoption credit: Up to $16,810',
            'Retirement saver credit: 10-50% of contributions up to $2,000',
          ],
        },
        {
          name: 'Alternative Minimum Tax',
          description: 'AMT calculation and planning',
          keyPoints: [
            'Regular tax + preference items + adjustments = AMTI',
            'Exemption: $85,700 single, $133,300 MFJ (2024) - phases out',
            'Add back: SALT deduction, miscellaneous deductions',
            'Preference items: Private activity bond interest, percentage depletion, ISO bargain element',
            '26% on first $232,600, 28% on excess',
          ],
        },
      ],

      criticalFormulas: [
        'Taxable Income = AGI - Standard/Itemized Deductions - QBI Deduction',
        'Gift basis: Gain basis = donor basis; Loss basis = lower of FMV or donor basis',
        'Like-kind exchange: Basis = FMV - deferred gain (or + deferred loss)',
        'MACRS rates: 3yr (33%), 5yr (20%), 7yr (14.3%), 39yr (2.56%)',
      ],

      examTips: [
        'Individual tax is the largest REG area - know it well',
        'Property basis and character of gain is heavily tested',
        '§1031 and §121 rules appear on most exams',
        'Know which credits are refundable vs. nonrefundable',
        'Practice basis calculation TBS scenarios',
      ],
    },

    // =====================================================
    // REG Area IV: Property Law (10-15%)
    // =====================================================
    {
      id: 'REG-IV',
      title: 'Area IV: Federal Taxation of Property',
      weight: '10-15%',
      overview: 'Estate, gift, and trust taxation fundamentals.',

      keyTopics: [
        {
          name: 'Gift Tax',
          description: 'Lifetime transfers and annual exclusions',
          keyPoints: [
            'Annual exclusion: $18,000 per donee (2024)',
            'Gift splitting: Married couples can elect to split gifts',
            'Lifetime exemption: $13.61 million unified credit (2024)',
            'Present interest requirement for annual exclusion',
            'Educational/medical: Unlimited if paid directly to institution',
            'Taxable gifts reduce available estate exemption',
          ],
        },
        {
          name: 'Estate Tax',
          description: 'Death transfer taxation',
          keyPoints: [
            'Gross estate: FMV of all assets owned at death',
            'Included: Probate assets, life insurance (if incidents of ownership), joint tenancy, revocable trusts, general powers of appointment',
            'Deductions: Marital (unlimited), charitable, debts, expenses',
            'Unified credit: $13.61 million exemption (2024)',
            'Portability: Deceased spouse unused exclusion (DSUE) transferable',
            'Estate tax rate: 40% on taxable estate over exemption',
          ],
        },
        {
          name: 'Income Taxation of Trusts',
          description: 'Trust and estate income tax basics',
          keyPoints: [
            'Simple trust: Must distribute all DNI currently, no charitable, no corpus distributions',
            'Complex trust: All other trusts',
            'Distributable Net Income (DNI): Limits deduction for distributions',
            'Distribution deduction: Lesser of DNI or actual distributions',
            'Compressed tax brackets: 37% rate at $14,450 (2024)',
            'Grantor trust rules: Trust income taxed to grantor if control retained',
          ],
        },
      ],

      examTips: [
        'Know the unified credit amount and annual exclusion',
        'Marital and charitable deductions are unlimited',
        'Simple vs. complex trust distinctions tested',
        'DNI concept important for trust taxation',
      ],
    },
  ],

  studyPlan: [
    { week: 1, focus: 'Ethics and Practice', topics: ['Circular 230', 'Preparer Standards', 'Penalties'], hours: 15, activities: ['Circular 230 review', 'Penalty calculations'] },
    { week: 2, focus: 'Individual Income & Adjustments', topics: ['Gross Income', 'Exclusions', 'Adjustments'], hours: 25, activities: ['Income scenarios', 'Form 1040 practice'] },
    { week: 3, focus: 'Deductions & Credits', topics: ['Itemized Deductions', 'Standard Deduction', 'Credits'], hours: 25, activities: ['Deduction comparison', 'Credit eligibility'] },
    { week: 4, focus: 'Property Transactions', topics: ['Basis', 'Sales', '§1031', '§121', '§1231/1245'], hours: 25, activities: ['Basis calculations', 'Character determination'] },
    { week: 5, focus: 'C Corporations', topics: ['Formation', 'Operations', 'Distributions', 'AMT'], hours: 20, activities: ['Corporate tax calculations', '§351 problems'] },
    { week: 6, focus: 'S Corps and Partnerships', topics: ['S Corp Rules', 'Partnership Taxation', 'Basis'], hours: 25, activities: ['Pass-through scenarios', 'Basis tracking'] },
    { week: 7, focus: 'Estate, Gift, and Trusts', topics: ['Gift Tax', 'Estate Tax', 'Trust Taxation'], hours: 15, activities: ['Transfer tax problems', 'DNI calculations'] },
    { week: 8, focus: 'Review and Practice Exams', topics: ['Full practice exams', 'Weak areas'], hours: 30, activities: ['2 complete practice exams', 'Tax TBS practice'] },
  ],

  examTips: [
    'Individual tax is largest section - prioritize it',
    'Entity formation rules (§351, §721) critical',
    'Property basis flows through everything',
    'Know your deduction limits and phase-outs',
    'Circular 230 is straightforward if you study it',
    'Practice multi-step tax calculation TBS',
  ],

  commonMistakes: [
    'Confusing gift basis rules for gains vs. losses',
    'Forgetting about self-employment tax for partners',
    'Mixing up DRD percentages',
    'Not recognizing S Corp eligibility issues',
    'Overlooking §1245 recapture on property sales',
    'Forgetting the SALT $10,000 limitation',
  ],
};

export default REG_STUDY_GUIDE;
