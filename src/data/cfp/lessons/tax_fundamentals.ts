/**
 * CFP Domain 5: Tax Planning
 * Area TAX-1: Tax Fundamentals
 * 
 * These lessons cover fundamental tax concepts including
 * filing status, income categories, and deductions.
 */

import type { Lesson } from '../../../types';

export const CFP_TAX1_LESSONS: Lesson[] = [
  {
    id: 'CFP-TAX-L001',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    title: 'Income Tax Fundamentals',
    description: 'Calculate taxable income through the tax formula and understand deductions, filing status, and tax rates.',
    order: 1,
    duration: 50,
    difficulty: 'intermediate',
    topics: [
      'Calculate taxable income through the tax formula',
      'Distinguish above-the-line and below-the-line deductions',
      'Compare filing status options and implications',
      'Apply marginal vs. effective tax rate concepts'
    ],
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Understanding the structure of income tax is essential for effective tax planning. This lesson covers the fundamental tax formula, deductions, filing status, and marginal versus effective tax rates.'
        },
        {
          title: 'The Tax Formula',
          type: 'table',
          headers: ['Step', 'Component'],
          rows: [
            ['**Gross Income**', 'All income from all sources'],
            ['Less: **Above-the-line deductions**', 'Adjustments to income'],
            ['= **Adjusted Gross Income (AGI)**', 'Key threshold figure'],
            ['Less: **Standard or itemized deductions**', 'Larger of the two'],
            ['Less: **Qualified business income (QBI) deduction**', 'Up to 20% of QBI'],
            ['= **Taxable Income**', 'Amount subject to tax'],
            ['× **Tax rates**', 'Progressive brackets'],
            ['= **Tax liability**', 'Before credits'],
            ['Less: **Tax credits**', 'Dollar-for-dollar reduction'],
            ['= **Taxes due (or refund)**', 'Final amount']
          ]
        },
        {
          title: 'Gross Income - What\'s Included',
          type: 'table',
          headers: ['Taxable', 'Examples'],
          rows: [
            ['Wages and salaries', 'Employment income'],
            ['Interest', 'Bank accounts, bonds'],
            ['Dividends', 'Qualified and ordinary'],
            ['Business income', 'Self-employment, partnerships'],
            ['Capital gains', 'Sales of property'],
            ['Retirement distributions', 'IRA, 401(k), pensions'],
            ['Rental income', 'Net rental receipts'],
            ['Alimony received', 'Pre-2019 divorces only']
          ]
        },
        {
          title: 'Gross Income - What\'s Excluded',
          type: 'table',
          headers: ['Excluded', 'Examples'],
          rows: [
            ['Municipal bond interest', 'Tax-exempt'],
            ['Life insurance proceeds', 'Death benefits'],
            ['Gifts and inheritances', 'To recipient'],
            ['Roth IRA distributions', 'If qualified'],
            ['Health insurance (employer)', 'Fringe benefit'],
            ['Child support', 'Received payments']
          ]
        },
        {
          title: 'Above-the-Line Deductions',
          type: 'table',
          headers: ['Deduction', 'Limit'],
          rows: [
            ['Traditional IRA contributions', '$7,500 ($8,500 if 50+)'],
            ['HSA contributions', '$4,450 individual, $8,900 family'],
            ['Self-employment tax (50%)', 'Half of SE tax'],
            ['Student loan interest', '$2,500'],
            ['Educator expenses', '$300'],
            ['Alimony paid', 'Pre-2019 divorces']
          ]
        },
        {
          title: 'Why AGI Matters',
          type: 'callout',
          content: 'Many tax benefits phase out based on AGI: Child tax credit, IRA deduction limits, Education credits, and Medicare premium surcharges (IRMAA). Reducing AGI through above-the-line deductions can unlock additional tax benefits.'
        },
        {
          title: 'Standard Deduction (2026)',
          type: 'table',
          headers: ['Filing Status', 'Amount'],
          rows: [
            ['Single', '$15,350'],
            ['MFJ', '$30,700'],
            ['MFS', '$15,350'],
            ['HOH', '$22,950'],
            ['Additional (65+/blind)', '$1,550 (single), $1,550 (MFJ per person)']
          ]
        },
        {
          title: 'Common Itemized Deductions',
          type: 'table',
          headers: ['Deduction', 'Limit/Rule'],
          rows: [
            ['State and local taxes (SALT)', '$10,000 cap'],
            ['Mortgage interest', '$750K debt limit'],
            ['Charitable contributions', '60% AGI (cash), 30% (appreciated)'],
            ['Medical expenses', 'Exceeding 7.5% AGI']
          ]
        },
        {
          title: 'Standard vs. Itemized Decision',
          type: 'callout',
          content: 'Itemize if: Total itemized deductions > Standard deduction. Otherwise, take the standard deduction for simplicity and maximum benefit.'
        },
        {
          title: 'Five Filing Statuses',
          type: 'table',
          headers: ['Status', 'Requirements', 'Generally Best For'],
          rows: [
            ['**Single**', 'Unmarried, no dependents', 'Singles'],
            ['**MFJ**', 'Married, file together', 'Most married couples'],
            ['**MFS**', 'Married, file separately', 'Liability separation, income-driven loans'],
            ['**HOH**', 'Unmarried + qualifying person', 'Single parents'],
            ['**QSS**', 'Spouse died within 2 years + dependent child', 'Surviving spouses']
          ]
        },
        {
          title: 'Head of Household Requirements',
          type: 'list',
          items: [
            'Unmarried (or considered unmarried)',
            'Pay more than half household costs',
            'Qualifying person lived with you more than half year'
          ]
        },
        {
          title: 'Tax Brackets (2026) - Married Filing Jointly',
          type: 'table',
          headers: ['Rate', 'Income Range'],
          rows: [
            ['10%', '$0 - $24,450'],
            ['12%', '$24,451 - $99,400'],
            ['22%', '$99,401 - $211,900'],
            ['24%', '$211,901 - $403,800'],
            ['32%', '$403,801 - $512,500'],
            ['35%', '$512,501 - $768,650'],
            ['37%', '$768,651+']
          ]
        },
        {
          title: 'Tax Brackets (2026) - Single',
          type: 'table',
          headers: ['Rate', 'Income Range'],
          rows: [
            ['10%', '$0 - $12,200'],
            ['12%', '$12,201 - $49,600'],
            ['22%', '$49,601 - $105,750'],
            ['24%', '$105,751 - $201,850'],
            ['32%', '$201,851 - $256,500'],
            ['35%', '$256,501 - $640,850'],
            ['37%', '$640,851+']
          ]
        },
        {
          title: 'Marginal vs. Effective Tax Rate',
          type: 'text',
          content: 'Marginal Rate: The rate on the next dollar of income. Effective Rate: The average rate on all income, calculated as Total Tax ÷ Taxable Income.'
        },
        {
          title: 'Example: Single Filer with $100,000 Taxable Income',
          type: 'example',
          content: '10% on first $11,600 = $1,160 | 12% on next $35,550 = $4,266 | 22% on next $53,375 = $11,743 | 24% on remaining $11,475 = $2,754. Total Tax: $19,923. Marginal rate: 24%. Effective rate: 19.9%.'
        },
        {
          title: 'Tax Credits vs. Deductions',
          type: 'table',
          headers: ['Type', 'Impact'],
          rows: [
            ['**Deduction**', 'Reduces taxable income'],
            ['**Credit**', 'Reduces tax dollar-for-dollar']
          ]
        },
        {
          title: 'Why Credits Are More Valuable',
          type: 'example',
          content: '$1,000 deduction in 22% bracket = $220 tax savings. $1,000 credit = $1,000 tax savings. Credits are more valuable!'
        },
        {
          title: 'Refundable vs. Non-refundable Credits',
          type: 'table',
          headers: ['Credit Type', 'Can Exceed Tax Liability?'],
          rows: [
            ['**Refundable**', 'Yes (creates refund)'],
            ['**Non-refundable**', 'No (reduces to $0 only)']
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Tax formula: Gross income → AGI → taxable income → tax',
            'Above-the-line deductions reduce AGI; below-the-line reduce taxable income',
            'Standard vs. itemized: Use whichever is greater',
            'Marginal rate: Rate on next dollar; Effective rate: Average rate',
            'Credits > Deductions: $1 credit = $1 tax reduction'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-TAX-L002',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    title: 'Types of Income and Special Rules',
    description: 'Distinguish ordinary income from capital gains and understand passive activity loss limitations.',
    order: 2,
    duration: 50,
    difficulty: 'intermediate',
    topics: [
      'Distinguish ordinary income from capital gains',
      'Apply qualified dividend and capital gains rates',
      'Calculate passive activity loss limitations',
      'Identify tax treatment of various income types'
    ],
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Different types of income receive different tax treatment. Understanding these distinctions is crucial for tax planning.'
        },
        {
          title: 'Three Income Categories',
          type: 'table',
          headers: ['Category', 'Tax Rate', 'Can Offset'],
          rows: [
            ['**Ordinary income**', 'Progressive (10-37%)', 'With ordinary losses'],
            ['**Capital gains/losses**', '0%, 15%, 20% (long-term)', 'With capital losses'],
            ['**Passive income/losses**', 'Ordinary rates', 'With passive losses only']
          ]
        },
        {
          title: 'What\'s Taxed as Ordinary Income',
          type: 'table',
          headers: ['Source', 'Tax Treatment'],
          rows: [
            ['Wages and salaries', 'Ordinary'],
            ['Self-employment income', 'Ordinary + SE tax'],
            ['Interest (most)', 'Ordinary'],
            ['Short-term capital gains', 'Ordinary'],
            ['Ordinary dividends', 'Ordinary'],
            ['Retirement plan distributions', 'Ordinary'],
            ['Rental income (net)', 'Ordinary (often passive)']
          ]
        },
        {
          title: 'Holding Period Rules',
          type: 'table',
          headers: ['Holding Period', 'Tax Treatment'],
          rows: [
            ['**Short-term** (≤1 year)', 'Ordinary income rates'],
            ['**Long-term** (>1 year)', 'Preferential rates']
          ]
        },
        {
          title: 'Long-Term Capital Gains Rates (2024)',
          type: 'table',
          headers: ['Filing Status', '0% Rate', '15% Rate', '20% Rate'],
          rows: [
            ['Single', '$0-$47,025', '$47,026-$518,900', '$518,901+'],
            ['MFJ', '$0-$94,050', '$94,051-$583,750', '$583,751+']
          ]
        },
        {
          title: 'Net Investment Income Tax (NIIT)',
          type: 'warning',
          content: 'Additional 3.8% on investment income if MAGI exceeds $250,000 (MFJ) or $200,000 (Single). Maximum LTCG rate: 23.8% (20% + 3.8%).'
        },
        {
          title: 'Capital Loss Netting Process',
          type: 'list',
          items: [
            'Net short-term gains and losses',
            'Net long-term gains and losses',
            'Net the two results together'
          ]
        },
        {
          title: 'Annual Capital Loss Deduction Limit',
          type: 'callout',
          content: 'Capital losses can offset unlimited capital gains, plus $3,000 of ordinary income per year. Excess carries forward indefinitely.'
        },
        {
          title: 'Capital Loss Netting Example',
          type: 'example',
          content: 'Short-term gain: $5,000 | Short-term loss: ($8,000) | Long-term gain: $10,000 | Long-term loss: ($2,000). Net ST: -$3,000 | Net LT: +$8,000. Overall: +$5,000 net long-term gain.'
        },
        {
          title: 'Qualified Dividend Requirements',
          type: 'table',
          headers: ['Requirement', 'Detail'],
          rows: [
            ['Holding period', '60+ days during 121-day window'],
            ['Qualified source', 'US corporation or qualified foreign'],
            ['Not excluded', 'Not money market funds or certain preferred']
          ]
        },
        {
          title: 'Interest Income Treatment',
          type: 'table',
          headers: ['Type', 'Tax Treatment'],
          rows: [
            ['Bank interest', 'Fully taxable (ordinary)'],
            ['Corporate bonds', 'Fully taxable (ordinary)'],
            ['Treasury bonds', 'Federal tax, exempt from state'],
            ['Municipal bonds', 'Exempt from federal, may be exempt from state'],
            ['Private activity bonds', 'May be subject to AMT']
          ]
        },
        {
          title: 'Passive Activity Rules',
          type: 'table',
          headers: ['Activity', 'Passive?'],
          rows: [
            ['Rental real estate', 'Generally yes (exceptions exist)'],
            ['Limited partnership', 'Yes'],
            ['Business without material participation', 'Yes'],
            ['Portfolio income', 'No (not passive)']
          ]
        },
        {
          title: 'Passive Loss Limitations',
          type: 'table',
          headers: ['Rule', 'Description'],
          rows: [
            ['Passive losses offset passive income only', 'Cannot offset wages or portfolio income'],
            ['Suspended losses carry forward', 'Until future passive income or disposition'],
            ['Full release at disposition', 'Suspended losses allowed when you sell']
          ]
        },
        {
          title: 'Real Estate Professional Exception',
          type: 'callout',
          content: 'Can treat rental income as non-passive if: More than 750 hours in real estate activities, more than half of working time in real estate, and material participation in each rental activity.'
        },
        {
          title: '$25,000 Rental Loss Exception',
          type: 'table',
          headers: ['Income (MAGI)', 'Allowed Rental Loss'],
          rows: [
            ['$100,000 or less', '$25,000'],
            ['$100,001-$150,000', 'Phases out $1 per $2'],
            ['$150,001+', '$0']
          ]
        },
        {
          title: 'Rental Loss Exception Requirements',
          type: 'list',
          items: [
            'Active participation (approve tenants, expenses)',
            'Own at least 10% of property',
            'Not passive investor'
          ]
        },
        {
          title: 'At-Risk Rules',
          type: 'text',
          content: 'Can only deduct losses to the extent of: Cash invested, Property basis, and Borrowed amounts for which you\'re personally liable. Cannot deduct losses from non-recourse loans (unless qualified real estate).'
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Ordinary income: 10-37%; includes wages, interest, ST gains',
            'LTCG/qualified dividends: 0%, 15%, 20% (+ 3.8% NIIT if applicable)',
            'Capital losses: Offset gains first, then $3,000 ordinary income',
            'Passive losses: Only offset passive income (suspended otherwise)',
            '$25,000 rental exception: Phases out between $100K-$150K MAGI'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-TAX-L003',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    title: 'Capital Gains Tax Planning',
    description: 'Apply capital gains taxation to investment decisions and implement tax-efficient gain/loss harvesting.',
    order: 3,
    duration: 50,
    difficulty: 'intermediate',
    topics: [
      'Apply capital gains taxation to investment decisions',
      'Calculate cost basis using different methods',
      'Evaluate wash sale and related party rules',
      'Implement tax-efficient gain/loss harvesting'
    ],
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Strategic management of capital gains and losses can significantly reduce lifetime tax burden.'
        },
        {
          title: 'Capital Gains Tax Rates (2024)',
          type: 'table',
          headers: ['Type', 'Rate'],
          rows: [
            ['Short-term (<1 year)', 'Ordinary income rates (10-37%)'],
            ['Long-term (>1 year)', '0%, 15%, or 20%'],
            ['Collectibles (art, coins)', '28% maximum'],
            ['Section 1202 QSBS', 'Up to 100% excluded'],
            ['Unrecaptured 1250 (depreciation)', '25%']
          ]
        },
        {
          title: 'Net Investment Income Tax',
          type: 'warning',
          content: '+3.8% on investment income if MAGI exceeds $250,000 (MFJ) or $200,000 (Single).'
        },
        {
          title: 'Cost Basis Formula',
          type: 'callout',
          content: 'Gain/Loss = Amount Realized - Adjusted Basis'
        },
        {
          title: 'Determining Basis',
          type: 'table',
          headers: ['Acquisition', 'Basis'],
          rows: [
            ['Purchased', 'Cost + transaction fees'],
            ['Gift', 'Donor\'s basis (dual basis rule for losses)'],
            ['Inheritance', 'Fair market value at date of death'],
            ['Stock split', 'Original basis spread across shares'],
            ['Reinvested dividends', 'Amount reinvested']
          ]
        },
        {
          title: 'Gift Basis Rules',
          type: 'table',
          headers: ['Situation', 'Basis Used'],
          rows: [
            ['FMV > Donor\'s basis at gift', 'Donor\'s basis (carryover)'],
            ['FMV < Donor\'s basis, sold at gain', 'Donor\'s basis'],
            ['FMV < Donor\'s basis, sold at loss', 'FMV at gift date'],
            ['FMV < Donor\'s basis, sold between', 'No gain or loss']
          ]
        },
        {
          title: 'Inherited Property: Step-Up in Basis',
          type: 'callout',
          content: 'Inherited property receives basis equal to FMV at date of death. This is a powerful tax benefit that eliminates unrealized gains.'
        },
        {
          title: 'Step-Up Example',
          type: 'example',
          content: 'Decedent\'s basis: $50,000 | FMV at death: $200,000 | Heir\'s basis: $200,000 | If sold for $210,000: $10,000 gain (not $160,000).'
        },
        {
          title: 'Step-Up Planning Implications',
          type: 'list',
          items: [
            'Don\'t sell appreciated assets before death if leaving to heirs',
            'Consider gifting assets with LOSS (no step-up for losses)',
            'Low-basis assets ideal to hold until death'
          ]
        },
        {
          title: 'Wash Sale Rule',
          type: 'warning',
          content: 'Cannot deduct loss if you purchase substantially identical security within 30 days before or after the sale.'
        },
        {
          title: 'What Triggers Wash Sale',
          type: 'table',
          headers: ['Action', 'Wash Sale?'],
          rows: [
            ['Buy same stock within 30 days', 'Yes'],
            ['Buy in IRA within 30 days', 'Yes'],
            ['Spouse buys same stock', 'Yes'],
            ['Buy similar but not identical ETF', 'Usually no'],
            ['Buy different sector stock', 'No']
          ]
        },
        {
          title: 'Wash Sale Consequence',
          type: 'text',
          content: 'Loss is disallowed (not permanently lost). Disallowed loss is added to new shares\' basis. Holding period of old shares tacks on.'
        },
        {
          title: 'Substantially Identical Securities',
          type: 'table',
          headers: ['Scenario', 'Substantially Identical?'],
          rows: [
            ['Same company\'s stock', 'Yes'],
            ['Same mutual fund', 'Yes'],
            ['S&P 500 fund → different S&P 500 fund', 'Usually yes'],
            ['S&P 500 fund → Total Market fund', 'Usually no'],
            ['Stock → option on same stock', 'Yes'],
            ['Bonds of same issuer', 'Depends on terms']
          ]
        },
        {
          title: 'Tax-Gain Harvesting Strategy',
          type: 'text',
          content: 'Realize gains when in low or 0% bracket. Consider during: Early retirement (low income year), Year with large losses to offset, Rebalancing needed, Before expected rate increase.'
        },
        {
          title: 'Tax-Gain Harvesting Example',
          type: 'example',
          content: 'Retired couple with $80,000 taxable income (MFJ): 0% LTCG threshold is $94,050. Can realize $14,050 in LTCG at 0% rate.'
        },
        {
          title: 'Tax-Loss Harvesting Strategy',
          type: 'text',
          content: 'Realize losses to: Offset capital gains, Offset $3,000 ordinary income, Carry forward excess.'
        },
        {
          title: 'Tax-Loss Harvesting Best Practices',
          type: 'list',
          items: [
            'Avoid wash sales: Keep 31+ day gap',
            'Use similar replacement: Stay invested in market',
            'Harvest throughout year: Don\'t wait until December',
            'Consider ST vs LT: Match character when possible',
            'Document everything: Track for carryforward'
          ]
        },
        {
          title: 'Netting Order',
          type: 'list',
          items: [
            'Short-term gains vs. short-term losses',
            'Long-term gains vs. long-term losses (by rate bracket)',
            'Net short-term vs. net long-term'
          ]
        },
        {
          title: 'Section 121: Home Sale Exclusion',
          type: 'table',
          headers: ['Requirement', 'Detail'],
          rows: [
            ['Ownership test', 'Owned 2 of last 5 years'],
            ['Use test', 'Lived in 2 of last 5 years'],
            ['Frequency', 'Once per 2 years']
          ]
        },
        {
          title: 'Home Sale Exclusion Amounts',
          type: 'table',
          headers: ['Filing Status', 'Maximum Exclusion'],
          rows: [
            ['Single', '$250,000'],
            ['MFJ', '$500,000']
          ]
        },
        {
          title: 'Partial Exclusion',
          type: 'callout',
          content: 'If requirements not fully met due to work, health, or unforeseen circumstances, a pro-rata portion of exclusion may apply.'
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Hold >1 year for preferential LTCG rates (0%, 15%, 20%)',
            'Inherited property: Step-up to FMV at death (huge benefit)',
            'Wash sale: 30-day window, substantially identical; loss added to basis',
            'Tax-gain harvest in 0% bracket years; tax-loss harvest to offset gains',
            'Home sale: $250K/$500K exclusion if owned and lived 2 of 5 years'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-TAX-L004',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    title: 'Alternative Minimum Tax (AMT)',
    description: 'Explain the AMT calculation process and apply AMT planning strategies.',
    order: 4,
    duration: 45,
    difficulty: 'advanced',
    topics: [
      'Explain the AMT calculation process',
      'Identify common AMT preference items and adjustments',
      'Calculate AMT liability',
      'Apply AMT planning strategies'
    ],
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'The AMT is a parallel tax system designed to ensure high-income taxpayers pay at least a minimum amount of tax.'
        },
        {
          title: 'Why AMT Exists',
          type: 'callout',
          content: 'Original purpose: Prevent wealthy taxpayers from using deductions and preferences to pay little or no tax. After TCJA (2017), far fewer taxpayers are subject to AMT due to higher exemptions and SALT cap.'
        },
        {
          title: 'AMT Calculation Formula',
          type: 'table',
          headers: ['Step', 'Calculation'],
          rows: [
            ['1. Start with taxable income', 'Regular taxable income'],
            ['2. Add back AMT adjustments', 'Disallowed deductions'],
            ['3. Add AMT preference items', 'Tax benefits not allowed for AMT'],
            ['= **AMTI**', 'Alternative Minimum Taxable Income'],
            ['4. Subtract exemption', 'Phases out at high income'],
            ['= **AMT base**', 'Amount subject to AMT rates'],
            ['5. Apply AMT rates', '26% and 28%'],
            ['= **Tentative Minimum Tax**', 'Before comparing'],
            ['6. Pay greater of TMT or regular tax', 'Only pay AMT if TMT > regular']
          ]
        },
        {
          title: 'AMT Exemption (2024)',
          type: 'table',
          headers: ['Filing Status', 'Exemption', 'Phase-out Begins', 'Phase-out Complete'],
          rows: [
            ['Single', '$85,700', '$609,350', '$952,150'],
            ['MFJ', '$133,300', '$1,218,700', '$1,751,900'],
            ['MFS', '$66,650', '$609,350', '$876,575']
          ]
        },
        {
          title: 'Exemption Phase-out Rate',
          type: 'warning',
          content: 'Exemption reduced by 25 cents per dollar over threshold.'
        },
        {
          title: 'AMT Rates',
          type: 'table',
          headers: ['Rate', 'AMTI Range (2024)'],
          rows: [
            ['**26%**', 'Up to $220,700 (MFJ) / $110,350 (others)'],
            ['**28%**', 'Above those amounts']
          ]
        },
        {
          title: 'AMT Adjustments - Added Back to Taxable Income',
          type: 'table',
          headers: ['Adjustment', 'AMT Treatment'],
          rows: [
            ['State and local taxes (SALT)', 'Not deductible for AMT'],
            ['Miscellaneous itemized (pre-TCJA)', 'Not deductible'],
            ['Standard deduction', 'Not allowed for AMT'],
            ['Personal exemptions (pre-TCJA)', 'Not allowed'],
            ['Medical expenses', '7.5% floor still applies'],
            ['Home equity interest (non-acquisition)', 'Not deductible']
          ]
        },
        {
          title: 'SALT Is Key',
          type: 'callout',
          content: 'Even with $10,000 cap, adding back SALT is often the largest AMT adjustment.'
        },
        {
          title: 'AMT Preference Items',
          type: 'table',
          headers: ['Preference', 'AMT Treatment'],
          rows: [
            ['**ISO spread**', 'Spread at exercise is preference'],
            ['Private activity bond interest', 'Taxable for AMT'],
            ['Percentage depletion excess', 'Added back'],
            ['Pre-1987 accelerated depreciation', 'Adjusted'],
            ['Certain intangible drilling costs', 'Adjusted']
          ]
        },
        {
          title: 'ISO Exercise: Major AMT Trigger',
          type: 'table',
          headers: ['Event', 'Regular Tax', 'AMT'],
          rows: [
            ['ISO exercise', 'No tax', 'Spread = preference'],
            ['Sale (qualified)', 'LTCG on full gain', 'Credit for prior AMT']
          ]
        },
        {
          title: 'AMT Calculation Example',
          type: 'example',
          content: 'Regular taxable income: $200,000 | State income tax: $12,000 | ISO exercise spread: $80,000 | AMTI = $200,000 + $12,000 + $80,000 = $292,000 | Less Exemption (MFJ): ($133,300) | AMT base: $158,700 | AMT (26% × $158,700): $41,262 | Regular tax (assume): $35,000 | AMT owed: $41,262 - $35,000 = $6,262'
        },
        {
          title: 'AMT Credit',
          type: 'text',
          content: 'AMT paid due to timing differences (like ISOs) creates a credit that can be used against regular tax in future years when regular tax exceeds TMT. Carries forward indefinitely.'
        },
        {
          title: 'Timing vs. Permanent Items',
          type: 'table',
          headers: ['Type', 'Creates Credit?'],
          rows: [
            ['ISO exercise (timing)', 'Yes'],
            ['SALT deduction (permanent)', 'No'],
            ['Private activity bonds', 'Depends']
          ]
        },
        {
          title: 'AMT Planning Strategies - Before Year-End',
          type: 'list',
          items: [
            'Defer ISO exercise: Spread across years',
            'Calculate AMT exposure: Before making decisions',
            'Bunch deductions: If near AMT threshold',
            'Consider SALT timing: Property tax payments'
          ]
        },
        {
          title: 'ISO Planning Strategies',
          type: 'list',
          items: [
            'Model scenarios: Know AMT impact before exercising',
            'Same-year sale: Disqualifying disposition avoids AMT',
            'Multi-year exercise: Stay below AMT threshold',
            'Set aside cash: For AMT payment'
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'AMT = Parallel system; pay greater of AMT or regular tax',
            'AMTI = Regular taxable income + adjustments + preferences',
            'Main triggers: ISO exercise, SALT (though capped), private activity bonds',
            'Exemption phases out at 25% rate over threshold',
            'AMT credit: Recovers timing-related AMT when regular tax exceeds TMT'
          ]
        }
      ]
    }
  }
];

export default CFP_TAX1_LESSONS;
