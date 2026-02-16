/**
 * CFP Domain 5: Tax Planning
 * Additional Tax Lessons
 * 
 * These lessons expand coverage of charitable giving, estate/gift tax integration,
 * advanced investment taxation, and small business tax planning.
 */

import type { Lesson } from '../../../types';

export const CFP_TAX4_LESSONS: Lesson[] = [
  {
    id: 'CFP-TAX-L013',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    title: 'Charitable Giving Strategies',
    description: 'Apply tax-efficient charitable giving strategies and maximize charitable deductions within AGI limitations.',
    order: 13,
    duration: 55,
    difficulty: 'intermediate',
    topics: [
      'Apply tax-efficient charitable giving strategies',
      'Compare donor-advised funds, private foundations, and direct giving',
      'Analyze charitable remainder and lead trusts',
      'Maximize charitable deductions within AGI limitations'
    ],
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Strategic charitable giving maximizes both tax benefits and charitable impact. Understanding the options helps advisors create optimal giving plans.'
        },
        {
          title: 'Tax Benefits of Charitable Giving',
          type: 'table',
          headers: ['Benefit', 'Description'],
          rows: [
            ['**Income tax deduction**', 'Itemized deduction (subject to AGI limits)'],
            ['**Avoid capital gains**', 'Donate appreciated property at FMV, no gain recognition'],
            ['**Estate tax deduction**', 'Unlimited charitable estate deduction'],
            ['**Income exclusion**', 'QCDs from IRAs excluded from income for 70½+']
          ]
        },
        {
          title: 'AGI Limitations on Charitable Deductions',
          type: 'table',
          headers: ['Donation Type', 'To Public Charity', 'To Private Foundation'],
          rows: [
            ['**Cash**', '60% of AGI', '30% of AGI'],
            ['**Long-term appreciated property**', '30% of AGI', '20% of AGI'],
            ['**Short-term capital gain property**', '50% of AGI (basis only)', 'Basis only']
          ]
        },
        {
          title: 'Carryforward',
          type: 'callout',
          content: 'Unused deductions carry forward for 5 years.'
        },
        {
          title: 'Gift of Appreciated Property - The Power',
          type: 'table',
          headers: ['Scenario', 'Sell Then Give Cash', 'Give Property Directly'],
          rows: [
            ['FMV of stock', '$100,000', '$100,000'],
            ['Cost basis', '$20,000', '$20,000'],
            ['Capital gains tax (20%+3.8%)', '$19,040', '$0'],
            ['Available for charity', '$80,960', '$100,000'],
            ['Additional tax benefit', 'None', 'Avoid $19,040 tax']
          ]
        },
        {
          title: 'Appreciated Property Requirements',
          type: 'list',
          items: [
            'Must be long-term capital gain property (held > 1 year)',
            'Deductible at fair market value',
            '30% of AGI limit (not 60% like cash)',
            'Must be publicly traded or have qualified appraisal'
          ]
        },
        {
          title: 'What to Give',
          type: 'table',
          headers: ['Good Candidates ✅', 'Less Ideal ❌'],
          rows: [
            ['Highly appreciated stock', 'Property at basis (no advantage over cash)'],
            ['Mutual fund shares with low basis', 'Depreciated property (take loss, give cash instead)'],
            ['Long-held real estate', 'Short-term holdings (deduction limited to basis)']
          ]
        },
        {
          title: 'Donor-Advised Funds (DAFs)',
          type: 'text',
          content: 'Charitable giving account sponsored by a public charity where donors: 1) Contribute assets (immediate deduction), 2) Advise grants to qualified charities over time, 3) Investments grow tax-free.'
        },
        {
          title: 'DAF Advantages',
          type: 'table',
          headers: ['Benefit', 'Explanation'],
          rows: [
            ['**Immediate deduction**', 'Full FMV deduction in year of contribution'],
            ['**Grant over time**', 'Recommend grants to charities when ready'],
            ['**Administrative ease**', 'One receipt, no annual requirements'],
            ['**Privacy**', 'Can give anonymously to charities'],
            ['**Appreciated property**', 'Accept a wide range of assets'],
            ['**Tax-free growth**', 'Assets grow until granted']
          ]
        },
        {
          title: 'DAF vs. Private Foundation',
          type: 'table',
          headers: ['Factor', 'DAF', 'Private Foundation'],
          rows: [
            ['**Startup cost**', 'None', '$10K+ legal fees'],
            ['**Minimum contribution**', 'Often $5K-25K', 'Typically $250K+'],
            ['**Annual filing**', 'None', '990-PF required'],
            ['**Payout requirement**', 'None', '5% annually'],
            ['**Deduction limit**', '60%/30% of AGI', '30%/20% of AGI'],
            ['**Control**', 'Advisory only', 'Full governance'],
            ['**Excise taxes**', 'None', '1.39% on net investment income']
          ]
        },
        {
          title: 'DAF Best For',
          type: 'callout',
          content: 'Clients wanting simplicity, who don\'t need a family legacy structure.'
        },
        {
          title: 'Charitable Remainder Trusts (CRTs) - How They Work',
          type: 'list',
          items: [
            'Donor transfers assets to irrevocable trust',
            'Trust pays income stream to donor (or beneficiary) for life or term',
            'Remainder goes to charity',
            'Partial income tax deduction at contribution'
          ]
        },
        {
          title: 'Two Types of CRTs',
          type: 'table',
          headers: ['Type', 'Annual Payment'],
          rows: [
            ['**Charitable Remainder Annuity Trust (CRAT)**', 'Fixed dollar amount (at least 5% of initial value)'],
            ['**Charitable Remainder Unitrust (CRUT)**', 'Fixed percentage of trust value (revalued annually)']
          ]
        },
        {
          title: 'CRT Benefits',
          type: 'list',
          items: [
            'Partial income tax deduction (PV of remainder)',
            'Avoid immediate capital gains on contributed assets',
            'Income stream for life or up to 20 years',
            'Asset goes to charity at termination'
          ]
        },
        {
          title: 'CRT Example',
          type: 'example',
          content: 'Contribution: $500,000 highly appreciated stock | Basis: $50,000 | CRT payout rate: 5% per year | Estimated life: 20 years | Present value of remainder: ~$185,000 | Income tax deduction: ~$185,000 | Capital gains avoided at contribution: ~$90,000 (20%+3.8% on $450,000).'
        },
        {
          title: 'CRT Requirements',
          type: 'list',
          items: [
            'Minimum 5% payout (maximum ~50%)',
            'Remainder must be at least 10% of initial contribution',
            'Irrevocable trust'
          ]
        },
        {
          title: 'Charitable Lead Trusts (CLTs) - How They Work',
          type: 'text',
          content: 'The opposite of CRTs: 1) Donor transfers assets to trust, 2) Trust pays charity for a term, 3) Remainder goes back to donor (or heirs), 4) Gift/estate tax savings (not income tax deduction).'
        },
        {
          title: 'CLT Types',
          type: 'table',
          headers: ['Type', 'Use'],
          rows: [
            ['**Grantor CLT**', 'Income tax deduction, taxed on trust income'],
            ['**Non-Grantor CLT**', 'No income deduction, no tax on trust income; Estate planning tool—remainder passes at reduced value']
          ]
        },
        {
          title: 'CLT Primary Use',
          type: 'callout',
          content: 'Estate/wealth transfer planning: Freeze value of assets passed to heirs, satisfy charitable intent during donor\'s life, reduce gift/estate tax on transferred assets.'
        },
        {
          title: 'Qualified Charitable Distributions (QCDs)',
          type: 'text',
          content: 'Direct transfers from IRA to charity (not DAF) for taxpayers 70½ or older.'
        },
        {
          title: 'QCD Benefits',
          type: 'table',
          headers: ['Benefit', 'Explanation'],
          rows: [
            ['**Excluded from income**', 'Up to $105,000 (2024, indexed) not counted as gross income'],
            ['**Satisfies RMD**', 'Counts toward Required Minimum Distribution'],
            ['**No itemization needed**', 'Benefits even standard deduction users'],
            ['**Lower AGI**', 'Reduces Medicare premiums, SS taxation, etc.']
          ]
        },
        {
          title: 'QCD Requirements',
          type: 'list',
          items: [
            'Must be 70½ or older',
            'Direct transfer to qualified charity (not DAF)',
            'Regular IRA (not SEP or SIMPLE while contributions ongoing)',
            'No benefit received (quid pro quo)'
          ]
        },
        {
          title: 'QCD vs. Regular Distribution + Donation',
          type: 'table',
          headers: ['Scenario', 'Regular Distribution', 'QCD'],
          rows: [
            ['Distribution', '$10,000 income', '$0 income'],
            ['Donation', '$10,000 deduction (if itemizing)', 'No deduction needed'],
            ['Net effect (itemizer)', 'Wash', 'Same'],
            ['Net effect (standard deduction)', '$10,000 taxable, no deduction', '$0 taxable']
          ]
        },
        {
          title: 'QCD Key Insight',
          type: 'callout',
          content: 'QCDs are especially valuable for clients who don\'t itemize.'
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Donate appreciated property to avoid capital gains and get FMV deduction',
            'Donor-advised funds offer simplicity and flexibility for most clients',
            'CRTs provide income stream with partial deduction and capital gains deferral',
            'CLTs are estate planning tools that benefit charity during term',
            'QCDs are powerful for IRA owners who don\'t itemize'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-TAX-L014',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    title: 'Estate and Gift Tax Integration',
    description: 'Explain the unified transfer tax system and integrate income and transfer tax planning.',
    order: 14,
    duration: 50,
    difficulty: 'advanced',
    topics: [
      'Explain the unified transfer tax system',
      'Calculate gift tax implications and exemption usage',
      'Integrate income and transfer tax planning',
      'Apply basis step-up and carryover basis rules'
    ],
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Income, gift, and estate taxes interact in complex ways. Understanding these connections enables integrated planning.'
        },
        {
          title: 'The Unified Transfer Tax System',
          type: 'table',
          headers: ['Component', 'Explanation'],
          rows: [
            ['**Unified credit**', 'Single lifetime exemption for gifts + estate (~$7.0M in 2026 - TCJA sunset)'],
            ['**Gift tax return**', 'Tracks taxable gifts reducing available exemption'],
            ['**Estate tax return**', 'Uses remaining exemption after lifetime gifts'],
            ['**Cumulative system**', 'Gifts reduce estate exemption dollar-for-dollar']
          ]
        },
        {
          title: 'Annual Exclusion vs. Lifetime Exemption',
          type: 'table',
          headers: ['Type', 'Amount (2026)', 'Impact'],
          rows: [
            ['**Annual exclusion**', '$19,000/recipient', 'No exemption used, no return required'],
            ['**Lifetime exemption**', '~$7.0 million', 'Gifts above annual exclusion reduce this']
          ]
        },
        {
          title: 'Gift Tax Return (Form 709) Required When',
          type: 'list',
          items: [
            'Gifts to any one person exceed annual exclusion',
            'Gifts to non-citizen spouses exceed special limit ($190,000)',
            'Gift-splitting elected with spouse',
            'Gifts of future interests (no annual exclusion)'
          ]
        },
        {
          title: 'Strategic Use: Gift Now vs. Give at Death',
          type: 'table',
          headers: ['Consideration', 'Lifetime Gift', 'Bequest at Death'],
          rows: [
            ['**Uses exemption**', 'Yes', 'Yes'],
            ['**Appreciation after transfer**', 'Out of estate', 'In estate'],
            ['**Basis**', 'Carryover (donor\'s basis)', 'Step-up to FMV'],
            ['**Control**', 'Lost', 'Retained until death']
          ]
        },
        {
          title: 'When Gifting Makes Sense ✅',
          type: 'list',
          items: [
            'Asset has high growth potential',
            'Donor has excess exemption',
            'Asset has high basis (little step-up lost)',
            'Estate is clearly taxable'
          ]
        },
        {
          title: 'When to Wait and Pass at Death ❌',
          type: 'list',
          items: [
            'Asset has low basis (lose step-up)',
            'Estate won\'t be taxable',
            'Donor may need assets',
            'Asset is hard to value (discount planning)'
          ]
        },
        {
          title: 'At Death: Step-Up in Basis',
          type: 'example',
          content: 'Decedent\'s basis: $100,000 | FMV at death: $500,000 | Heir\'s new basis: $500,000 (stepped up) | If heir sells at $500,000: $0 gain.'
        },
        {
          title: 'Lifetime Gift: Carryover Basis',
          type: 'example',
          content: 'Donor\'s basis: $100,000 | FMV at gift: $500,000 | Donee\'s basis: $100,000 (carryover) | If donee sells at $500,000: $400,000 gain.'
        },
        {
          title: 'The Strategic Calculation',
          type: 'text',
          content: 'Is gift tax savings > lost step-up benefit? Estate tax rate: 40%. Capital gains rate: 23.8% (20% + 3.8% NIIT). Built-in gain: $400,000. Tax on gain if sold: $95,200. Estate tax on $500,000: $200,000. Net savings from gifting: $104,800.'
        },
        {
          title: 'Rule of Thumb',
          type: 'callout',
          content: 'If estate is taxable, gift high-growth assets; if not taxable, hold for step-up.'
        },
        {
          title: 'Grantor Trusts',
          type: 'table',
          headers: ['Characteristic', 'Advantage'],
          rows: [
            ['Grantor pays income tax', 'Trust assets grow without tax reduction'],
            ['Assets not included in estate (with proper design)', 'Best of both worlds'],
            ['"Defective" for income tax, not estate', 'Intentionally Defective Grantor Trust (IDGT)']
          ]
        },
        {
          title: 'Sale to Grantor Trust',
          type: 'table',
          headers: ['Transaction', 'Tax Consequence'],
          rows: [
            ['Sale to IDGT', 'No income tax (sale to self for income purposes)'],
            ['Note received', 'Installment payments or balloon'],
            ['Appreciation above interest', 'Passes to trust beneficiaries']
          ]
        },
        {
          title: 'Generation-Skipping Transfer (GST) Tax',
          type: 'text',
          content: '40% tax on transfers to skip persons (typically grandchildren or those 37.5+ years younger). Exists to prevent wealthy families from avoiding estate tax at each generation.'
        },
        {
          title: 'GST Exemption',
          type: 'list',
          items: [
            'Equal to estate exemption (~$13.6M in 2024)',
            'Separate from estate exemption (applies specifically to skip transfers)',
            'Once used, cannot be restored'
          ]
        },
        {
          title: 'Three Types of GST Transfers',
          type: 'table',
          headers: ['Type', 'Example'],
          rows: [
            ['**Direct skip**', 'Gift directly to grandchild'],
            ['**Taxable distribution**', 'Trust distribution to grandchild'],
            ['**Taxable termination**', 'Child dies, grandchild becomes beneficiary']
          ]
        },
        {
          title: 'Portability of Estate Exemption',
          type: 'text',
          content: 'Surviving spouse can use deceased spouse\'s unused exemption (DSUE). Must file estate tax return for deceased spouse (even if no tax due) and elect portability on Form 706. Applies only to federal estate tax (not GST).'
        },
        {
          title: 'Portability Example',
          type: 'example',
          content: 'Husband dies with $8M estate, uses $8M of exemption. Without portability: Wife\'s exemption = ~$13.6M. With portability: Wife\'s exemption = ~$13.6M + $5.6M unused = ~$19.2M. If wife\'s estate at death is $30M: Without portability taxable estate = $16.4M. With portability taxable estate = $10.8M. Estate tax savings: ~$2.24M.'
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Gift and estate taxes are unified—gifts reduce available estate exemption',
            'Annual exclusion gifts don\'t use lifetime exemption',
            'Basis rules differ: step-up at death, carryover for gifts',
            'Don\'t give away low-basis assets if estate won\'t be taxable',
            'File for portability to preserve deceased spouse\'s exemption'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-TAX-L015',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    title: 'Investment Tax Planning',
    description: 'Apply tax-efficient investment strategies and evaluate asset location across account types.',
    order: 15,
    duration: 50,
    difficulty: 'intermediate',
    topics: [
      'Apply tax-efficient investment strategies',
      'Analyze tax-loss harvesting and wash sale rules',
      'Evaluate asset location across account types',
      'Understand tax treatment of various investment types'
    ],
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Tax-efficient investing can add significant value. Understanding how investment decisions affect taxes helps maximize after-tax returns.'
        },
        {
          title: 'Tax Treatment of Investment Income',
          type: 'table',
          headers: ['Type', 'Tax Rate', 'Examples'],
          rows: [
            ['**Qualified dividends**', '0%/15%/20%', 'Most US stock dividends'],
            ['**Ordinary dividends**', 'Ordinary income rates', 'REITs, some foreign dividends'],
            ['**Interest income**', 'Ordinary income rates', 'Bonds, CDs, savings'],
            ['**Long-term capital gains**', '0%/15%/20%', 'Assets held > 1 year'],
            ['**Short-term capital gains**', 'Ordinary income rates', 'Assets held ≤ 1 year'],
            ['**Municipal bond interest**', 'Tax-exempt (federal)', 'Muni bonds']
          ]
        },
        {
          title: 'Qualified Dividend Requirements',
          type: 'list',
          items: [
            'Paid by US corporation or qualified foreign corporation',
            'Held for more than 60 days during 121-day window',
            'Not generated by hedging positions'
          ]
        },
        {
          title: 'Tax-Loss Harvesting - What It Is',
          type: 'text',
          content: 'Selling investments at a loss to offset gains, reduce taxes, and reinvest in similar (not identical) securities.'
        },
        {
          title: 'Tax-Loss Harvesting Steps',
          type: 'list',
          items: [
            'Identify position with unrealized loss',
            'Sell the position, realize loss',
            'Use loss to offset gains (and up to $3,000 ordinary income)',
            'Reinvest in similar but not "substantially identical" security'
          ]
        },
        {
          title: 'Loss Harvesting Example',
          type: 'example',
          content: 'Realized long-term gains: $50,000 | Tax at 23.8%: $11,900. Harvested losses: ($30,000) | Net gains: $20,000 | Tax at 23.8%: $4,760. Tax savings: $7,140.'
        },
        {
          title: 'Wash Sale Rule',
          type: 'table',
          headers: ['Rule', 'Detail'],
          rows: [
            ['**What triggers**', 'Buy "substantially identical" security 30 days before or after sale'],
            ['**Consequence**', 'Loss is disallowed; added to replacement security\'s basis'],
            ['**Applies to**', 'Stocks, bonds, options; across accounts (including spouse, IRA)']
          ]
        },
        {
          title: 'What\'s Substantially Identical?',
          type: 'table',
          headers: ['Allowed (Not Identical)', 'Not Allowed (Identical)'],
          rows: [
            ['Switch S&P 500 ETF providers', 'Repurchase same ETF'],
            ['Switch total market to large cap', 'Same fund in different account'],
            ['Switch individual stock to sector ETF', 'Options on same stock'],
            ['Tesla to EV sector ETF', 'Tesla to Tesla']
          ]
        },
        {
          title: 'Asset Location Strategy',
          type: 'text',
          content: 'Place investments in the account type that provides the best after-tax result.'
        },
        {
          title: 'Asset Location General Guidelines',
          type: 'table',
          headers: ['Asset Type', 'Best Location', 'Reason'],
          rows: [
            ['**Taxable bonds**', 'Tax-advantaged (IRA, 401k)', 'Interest taxed as ordinary income'],
            ['**REITs**', 'Tax-advantaged', 'Dividends are ordinary income'],
            ['**High-yield bonds**', 'Tax-advantaged', 'High ordinary income'],
            ['**Growth stocks**', 'Taxable', 'Low current income, potential step-up'],
            ['**Tax-managed equity**', 'Taxable', 'Already tax-efficient'],
            ['**Municipal bonds**', 'Taxable', 'Already tax-exempt'],
            ['**Foreign stocks**', 'Taxable (sometimes)', 'Foreign tax credit available']
          ]
        },
        {
          title: 'Account Type Tax Trade-Offs',
          type: 'table',
          headers: ['Account', 'Tax on Growth', 'Tax on Withdrawal'],
          rows: [
            ['Taxable', 'Annual (dividends, gains)', 'Only on realized gains'],
            ['Traditional IRA', 'Deferred', 'Ordinary income rates'],
            ['Roth IRA', 'Never', 'Tax-free']
          ]
        },
        {
          title: 'Asset Location Priority',
          type: 'list',
          items: [
            'Max tax-deferred contribution limits',
            'Place tax-inefficient assets in tax-advantaged accounts',
            'Place tax-efficient assets in taxable accounts',
            'Use Roth for highest expected growth (if available)'
          ]
        },
        {
          title: 'What Makes a Fund Tax-Efficient?',
          type: 'table',
          headers: ['Factor', 'Tax-Efficient', 'Tax-Inefficient'],
          rows: [
            ['**Turnover**', 'Low (<20%)', 'High (>100%)'],
            ['**Capital gains distributions**', 'Minimal', 'Significant annual distributions'],
            ['**Dividends**', 'Qualified', 'Ordinary'],
            ['**Structure**', 'ETF (in-kind redemptions)', 'Mutual fund (cash redemptions)']
          ]
        },
        {
          title: 'Why ETFs Are More Tax-Efficient',
          type: 'table',
          headers: ['Feature', 'ETF', 'Mutual Fund'],
          rows: [
            ['Redemption mechanism', 'In-kind (shares to APs)', 'Cash (forces sales)'],
            ['Capital gains distributions', 'Rare', 'Common'],
            ['Tax lot control', 'Available', 'Available']
          ]
        },
        {
          title: 'Index vs. Active Funds',
          type: 'table',
          headers: ['Type', 'Typical Turnover', 'Tax Efficiency'],
          rows: [
            ['Index funds', '3-10%', 'High'],
            ['Actively managed', '50-200%+', 'Lower'],
            ['Tax-managed funds', 'Varies', 'Designed for efficiency']
          ]
        },
        {
          title: 'Capital Gains Timing Strategies',
          type: 'table',
          headers: ['Strategy', 'Application'],
          rows: [
            ['**Defer realization**', 'Hold appreciated assets to delay tax'],
            ['**0% bracket harvesting**', 'Realize gains when in 0% LTCG bracket'],
            ['**Lot selection**', 'Choose highest-basis lots when selling'],
            ['**Offset gains**', 'Match realized gains with losses']
          ]
        },
        {
          title: '0% LTCG Strategy',
          type: 'callout',
          content: 'In 2024, 0% rate applies to LTCG if taxable income is under ~$47,000 (single) or ~$94,000 (married). Strategy: Retirees in low-income years can realize gains tax-free, resetting basis.'
        },
        {
          title: 'Holding Period Matters',
          type: 'table',
          headers: ['Holding Period', 'Treatment'],
          rows: [
            ['> 1 year', 'Long-term (0/15/20%)'],
            ['≤ 1 year', 'Short-term (ordinary rates up to 37%)']
          ]
        },
        {
          title: 'Important Note',
          type: 'warning',
          content: 'Holding just one extra day can save 17%+ in taxes!'
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Asset location can add 0.5%+ per year in after-tax returns',
            'Tax-loss harvesting reduces current taxes (beware wash sales)',
            'Qualified dividends and LTCG are taxed at favorable rates',
            'ETFs are generally more tax-efficient than mutual funds',
            'Harvest gains in 0% bracket years when possible'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-TAX-L016',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    title: 'Property Transactions: Section 1031 and Installment Sales',
    description: 'Apply Section 1031 like-kind exchange rules and analyze installment sale tax treatment.',
    order: 16,
    duration: 50,
    difficulty: 'advanced',
    topics: [
      'Apply Section 1031 like-kind exchange rules',
      'Analyze installment sale tax treatment',
      'Evaluate Section 121 primary residence exclusion',
      'Navigate related party transaction rules'
    ],
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Real estate transactions have unique tax rules that can defer or reduce taxes. Understanding these provisions is essential for clients with property.'
        },
        {
          title: 'Section 1031 Like-Kind Exchanges - What Is It?',
          type: 'text',
          content: 'Exchange of "like-kind" business or investment property with deferral of gain recognition.'
        },
        {
          title: '1031 Basic Requirements',
          type: 'table',
          headers: ['Requirement', 'Detail'],
          rows: [
            ['**Qualified property**', 'Real property held for business or investment'],
            ['**Like-kind**', 'Real property for real property (broad definition)'],
            ['**No personal use property**', 'Principal residence doesn\'t qualify'],
            ['**Held for business/investment**', 'Both relinquished and replacement property']
          ]
        },
        {
          title: 'What\'s "Like-Kind" for Real Estate?',
          type: 'table',
          headers: ['Exchange', 'Like-Kind?'],
          rows: [
            ['Office building → Apartment', '✅ Yes'],
            ['Raw land → Commercial building', '✅ Yes'],
            ['US real estate → Foreign real estate', '❌ No'],
            ['Real property → Personal property', '❌ No'],
            ['Vacation home (personal use) → Rental', '❌ No (unless rental use established)']
          ]
        },
        {
          title: 'Timeline Requirements',
          type: 'table',
          headers: ['Deadline', 'Requirement'],
          rows: [
            ['**45 days**', 'Identify replacement property in writing'],
            ['**180 days**', 'Close on replacement property'],
            ['**Both deadlines are strict**', 'No extensions (even for reasonable cause)']
          ]
        },
        {
          title: 'Identification Rules',
          type: 'table',
          headers: ['Rule', 'Description'],
          rows: [
            ['**Three-property rule**', 'Identify up to 3 properties regardless of value'],
            ['**200% rule**', 'Identify any number if total FMV ≤ 200% of relinquished'],
            ['**95% rule**', 'Identify any amount but must acquire 95% of value identified']
          ]
        },
        {
          title: 'Identification Note',
          type: 'callout',
          content: 'Most taxpayers use the three-property rule for simplicity.'
        },
        {
          title: 'Boot and Gain Recognition',
          type: 'text',
          content: 'Boot is non-like-kind property received in exchange (cash, debt relief, other property). Boot triggers gain recognition.'
        },
        {
          title: 'Types of Boot',
          type: 'table',
          headers: ['Boot Type', 'Taxable?'],
          rows: [
            ['Cash received', 'Taxable'],
            ['Net debt relief', 'Taxable'],
            ['Non-qualified property', 'Taxable']
          ]
        },
        {
          title: 'Boot Example',
          type: 'example',
          content: 'Relinquished property FMV: $500,000 | Mortgage on relinquished: $200,000 | Replacement property FMV: $450,000 | Mortgage on replacement: $150,000 | Cash received: $50,000 | Net debt relief: $50,000 ($200K - $150K). Total boot: $100,000 | Recognized gain: $100,000 (or actual gain if less).'
        },
        {
          title: 'Basis in Replacement Property',
          type: 'callout',
          content: 'Basis = FMV of replacement - deferred gain. If you defer $200,000 of gain on a $500,000 replacement, your basis is $300,000.'
        },
        {
          title: 'Installment Sales - What Is It?',
          type: 'text',
          content: 'Sale where at least one payment is received after the year of sale, allowing gain recognition as payments are received.'
        },
        {
          title: 'Installment Method Calculation',
          type: 'table',
          headers: ['Component', 'Calculation'],
          rows: [
            ['**Gross profit**', 'Sale price - adjusted basis'],
            ['**Gross profit ratio**', 'Gross profit ÷ sale price'],
            ['**Gain recognized per payment**', 'Payment × gross profit ratio']
          ]
        },
        {
          title: 'Installment Sale Example',
          type: 'example',
          content: 'Sale price: $500,000 | Adjusted basis: $200,000 | Gross profit: $300,000 | Gross profit ratio: 60% | Down payment: $100,000 | Gain recognized on down payment: $60,000 (60% × $100K).'
        },
        {
          title: 'When Installment Sale Is Useful',
          type: 'list',
          items: [
            'Seller wants to defer taxes over time',
            'Buyer can\'t pay full price upfront',
            'Spreading income avoids higher tax brackets'
          ]
        },
        {
          title: 'Installment Sale Limitations',
          type: 'table',
          headers: ['Situation', 'Rule'],
          rows: [
            ['**Depreciation recapture**', 'Recognized in year of sale (not deferred)'],
            ['**Inventory/dealer property**', 'Installment method not available'],
            ['**Related parties**', 'Special rules and potential acceleration'],
            ['**Interest requirement**', 'Must charge adequate interest (AFR minimum)']
          ]
        },
        {
          title: 'Section 121 Primary Residence Exclusion',
          type: 'table',
          headers: ['Filing Status', 'Exclusion Amount'],
          rows: [
            ['Single', '$250,000'],
            ['Married filing jointly', '$500,000']
          ]
        },
        {
          title: 'Section 121 Requirements',
          type: 'table',
          headers: ['Requirement', 'Detail'],
          rows: [
            ['**Ownership test**', 'Own for 2 of last 5 years'],
            ['**Use test**', 'Live in as primary residence 2 of last 5 years'],
            ['**Frequency**', 'Can use exclusion only once every 2 years']
          ]
        },
        {
          title: 'Partial Exclusion',
          type: 'callout',
          content: 'Available if full requirements not met due to: Job change (work-related move), Health reasons, Unforeseen circumstances. Exclusion is prorated based on time met vs. required.'
        },
        {
          title: 'Net Investment Income Tax Impact',
          type: 'table',
          headers: ['Filing Status', 'Threshold'],
          rows: [
            ['Single', '$200,000'],
            ['Married filing jointly', '$250,000'],
            ['Married filing separately', '$125,000']
          ]
        },
        {
          title: 'NIIT Planning Implications',
          type: 'list',
          items: [
            'Large gain may trigger NIIT',
            'Installment sales may keep AGI below threshold',
            '1031 exchanges defer NIIT as well as regular capital gains tax'
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Section 1031 defers gain on business/investment real estate exchanges',
            '45/180 day deadlines are strict—no extensions',
            'Boot is taxable—minimize cash and net debt relief',
            'Installment sales spread gain recognition over payment period',
            'Section 121 excludes $250K/$500K of primary residence gain'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-TAX-L017',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    title: 'Small Business Tax Planning',
    description: 'Apply retirement plan options for small business owners and analyze S-Corp reasonable compensation requirements.',
    order: 17,
    duration: 50,
    difficulty: 'advanced',
    topics: [
      'Apply retirement plan options for small business owners',
      'Analyze Section 199A QBI deduction strategies',
      'Evaluate S-Corp reasonable compensation requirements',
      'Plan for succession and sale tax implications'
    ],
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Small business owners have unique tax planning opportunities. Understanding these strategies helps advisors serve entrepreneurs effectively.'
        },
        {
          title: 'Retirement Plans for Business Owners',
          type: 'table',
          headers: ['Plan', 'Max Contribution (2026)', 'Best For'],
          rows: [
            ['**SEP-IRA**', '25% of comp, up to $71,500', 'Simple setup, fluctuating income'],
            ['**SIMPLE IRA**', '$17,000 + 3% match', 'Small employer, employee participation'],
            ['**Solo 401(k)**', '$24,500 + 25% of comp, up to $71,500', 'Self-employed, maximize contributions'],
            ['**Defined Benefit**', 'Actuarially determined (can exceed $200K)', 'High income, older owners']
          ]
        },
        {
          title: 'SEP-IRA Features',
          type: 'table',
          headers: ['Feature', 'Detail'],
          rows: [
            ['**Contribution**', 'Employer only (25% of compensation)'],
            ['**Deadline**', 'Tax filing deadline including extensions'],
            ['**Employees**', 'Must cover all eligible employees at same %'],
            ['**Admin**', 'Minimal paperwork']
          ]
        },
        {
          title: 'Solo 401(k) Features',
          type: 'table',
          headers: ['Feature', 'Detail'],
          rows: [
            ['**Employee deferral**', '$24,500 ($32,000 if 50+)'],
            ['**Employer profit sharing**', 'Up to 25% of compensation'],
            ['**Total**', 'Up to $71,500 ($79,000 if 50+)'],
            ['**Roth option**', 'Available'],
            ['**Loans**', 'Available']
          ]
        },
        {
          title: 'Solo 401(k) Advantage',
          type: 'callout',
          content: 'Solo 401(k) often allows higher contributions than SEP for same income due to employee deferral component.'
        },
        {
          title: 'Defined Benefit Plans',
          type: 'table',
          headers: ['Feature', 'Detail'],
          rows: [
            ['**Contribution**', 'Based on promised benefit at retirement'],
            ['**Deduction**', 'Often $100,000+ per year for older owners'],
            ['**Complexity**', 'Requires actuary, annual compliance'],
            ['**Best for**', 'High earners age 50+ with stable income']
          ]
        },
        {
          title: 'Section 199A QBI Deduction - Basics',
          type: 'text',
          content: '20% deduction on Qualified Business Income from pass-through entities (sole proprietorships, partnerships, S-corps).'
        },
        {
          title: 'QBI Limitations by Income',
          type: 'table',
          headers: ['Income Level', 'Limitation'],
          rows: [
            ['Below threshold ($182,100 single/$364,200 MFJ)', 'Full 20% deduction'],
            ['Phase-in range', 'W-2 wage/property limits begin'],
            ['Above phase-in', 'Limited to 50% of W-2 wages OR 25% wages + 2.5% property']
          ]
        },
        {
          title: 'SSTB vs. Non-SSTB',
          type: 'table',
          headers: ['SSTB Industries', 'Non-SSTB Safe'],
          rows: [
            ['Law, medical, accounting', 'Engineering, architecture'],
            ['Consulting', 'Manufacturing'],
            ['Financial services', 'Real estate, construction'],
            ['Athletics, performing arts', 'Retail, wholesale']
          ]
        },
        {
          title: 'SSTB Warning',
          type: 'warning',
          content: 'SSTBs: Deduction phases out entirely above income thresholds.'
        },
        {
          title: 'QBI Planning Strategies',
          type: 'table',
          headers: ['Strategy', 'Application'],
          rows: [
            ['**Income smoothing**', 'Keep income below thresholds if near'],
            ['**W-2 wage strategy**', 'Ensure adequate wages for high earners'],
            ['**Separating businesses**', 'Carve out non-SSTB activities'],
            ['**Retirement contributions**', 'Reduce AGI to stay under thresholds']
          ]
        },
        {
          title: 'S-Corporation Compensation',
          type: 'text',
          content: 'S-Corp shareholder-employees must receive "reasonable compensation" before taking distributions.'
        },
        {
          title: 'Why Reasonable Compensation Matters',
          type: 'table',
          headers: ['Payment Type', 'Subject to FICA?', 'Subject to Income Tax?'],
          rows: [
            ['W-2 wages', 'Yes (15.3% combined)', 'Yes'],
            ['Distributions', 'No', 'Yes']
          ]
        },
        {
          title: 'IRS Scrutiny Factors',
          type: 'list',
          items: [
            'Industry compensation surveys',
            'Time spent in business',
            'Comparable positions',
            'Business revenue and profitability',
            'Distribution/salary ratio'
          ]
        },
        {
          title: 'Common Mistake',
          type: 'warning',
          content: 'Owner pays $30K salary, takes $300K distributions. Risk: IRS reclassifies distributions as wages. Penalty: Back FICA taxes + penalties + interest.'
        },
        {
          title: 'Safe Approach',
          type: 'list',
          items: [
            'Document compensation analysis',
            'Pay reasonable salary based on comparable positions',
            'Take distributions after adequate wages'
          ]
        },
        {
          title: 'Business Sale Structures',
          type: 'table',
          headers: ['Structure', 'Seller Benefit', 'Buyer Benefit'],
          rows: [
            ['**Asset sale**', 'Capital gains (mostly)', 'Basis step-up, depreciation'],
            ['**Stock sale**', 'Capital gains', 'Simpler transaction'],
            ['**Installment sale**', 'Defer gain', 'Finance purchase price']
          ]
        },
        {
          title: 'Asset Allocation in Asset Sales',
          type: 'table',
          headers: ['Allocated To', 'Seller Tax Treatment'],
          rows: [
            ['Inventory', 'Ordinary income'],
            ['Equipment (to extent of depreciation)', 'Ordinary income (recapture)'],
            ['Equipment (above recapture)', 'Capital gain'],
            ['Goodwill/intangibles', 'Capital gain'],
            ['Covenant not to compete', 'Ordinary income']
          ]
        },
        {
          title: '1202 QSBS Exclusion',
          type: 'table',
          headers: ['Provision', 'Detail'],
          rows: [
            ['**What**', 'Excludes 100% of gain on qualified small business stock'],
            ['**Requirements**', 'C-Corp, held 5+ years, acquired at original issuance'],
            ['**Limit**', 'Greater of $10M or 10× basis'],
            ['**Eligible businesses**', 'Active trade or business (not services, finance, hospitality)']
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Solo 401(k) often beats SEP-IRA for maximizing contributions',
            'Defined benefit plans allow massive deductions for older, high-income owners',
            'QBI deduction requires careful income threshold management',
            'S-Corp reasonable compensation must be documented and defensible',
            'Asset sales allow basis step-up for buyers; stock sales are simpler'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-TAX-L018',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    title: 'Year-End and Multi-Year Tax Planning',
    description: 'Apply income timing and acceleration strategies with multi-year tax projections.',
    order: 18,
    duration: 45,
    difficulty: 'intermediate',
    topics: [
      'Apply income timing and acceleration strategies',
      'Analyze multi-year tax projections',
      'Evaluate tax law change planning',
      'Integrate life events into tax planning'
    ],
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Proactive tax planning throughout the year—not just at tax time—maximizes savings. Multi-year perspective reveals opportunities invisible in single-year planning.'
        },
        {
          title: 'Why Single-Year Planning Falls Short',
          type: 'table',
          headers: ['Single-Year Focus', 'Multi-Year Opportunity'],
          rows: [
            ['"Minimize this year\'s tax"', '"Minimize lifetime tax"'],
            ['Defer income automatically', 'Sometimes accelerate income'],
            ['Maximize deductions now', 'Sometimes defer deductions']
          ]
        },
        {
          title: 'When to Accelerate Income',
          type: 'table',
          headers: ['Situation', 'Strategy'],
          rows: [
            ['Expect higher rates next year', 'Recognize income now'],
            ['Tax law sunset (TCJA 2026?)', 'Accelerate before rates rise'],
            ['Low-income year', 'Realize gains at favorable rates'],
            ['Using up NOL/capital losses', 'Offset income while losses available']
          ]
        },
        {
          title: 'When to Defer Income',
          type: 'table',
          headers: ['Situation', 'Strategy'],
          rows: [
            ['High-income year', 'Defer to lower-income future year'],
            ['Approaching retirement', 'Push income to lower-bracket years'],
            ['Large one-time gain', 'Spread via installment sale']
          ]
        },
        {
          title: 'Year-End Checklist - Income Timing',
          type: 'table',
          headers: ['Action', 'Deadline'],
          rows: [
            ['Defer/accelerate billing (self-employed)', 'Year-end'],
            ['Defer bonus if employer allows', 'December 31'],
            ['Realize capital gains/losses', 'December 31 settlement'],
            ['Complete Roth conversions', 'December 31']
          ]
        },
        {
          title: 'Year-End Checklist - Deduction Timing',
          type: 'table',
          headers: ['Action', 'Deadline'],
          rows: [
            ['Prepay state taxes (SALT limit consideration)', 'December 31'],
            ['Charitable contributions', 'December 31'],
            ['Bunch itemized deductions', 'Alternate years'],
            ['Pay medical expenses', 'December 31']
          ]
        },
        {
          title: 'Year-End Checklist - Retirement Contributions',
          type: 'table',
          headers: ['Type', 'Deadline'],
          rows: [
            ['401(k) elective deferrals', 'December 31'],
            ['IRA contributions', 'April 15 of following year'],
            ['SEP-IRA contributions', 'Tax filing deadline + extensions']
          ]
        },
        {
          title: 'Bunching Strategy',
          type: 'text',
          content: 'Concentrate deductible expenses in alternating years to exceed standard deduction threshold.'
        },
        {
          title: 'Bunching Example',
          type: 'example',
          content: 'Without Bunching: Year 1 itemized $20,000, Year 2 itemized $20,000. Both use standard deduction ($29,200). Total 2-year benefit: $58,400. With Bunching: Year 1 itemized $35,000, Year 2 itemized $5,000 (use standard $29,200). Total 2-year benefit: $64,200. Additional benefit: $5,800.'
        },
        {
          title: 'What to Bunch',
          type: 'table',
          headers: ['Item', 'Bunchable?'],
          rows: [
            ['Charitable donations', '✅ (use DAF for flexibility)'],
            ['State/local taxes', 'Limited (SALT cap $10,000)'],
            ['Property taxes', 'Limited (SALT cap)'],
            ['Medical expenses', 'Somewhat (if near 7.5% threshold)'],
            ['Mortgage interest', 'No (pay as required)']
          ]
        },
        {
          title: 'Roth Conversion Planning',
          type: 'text',
          content: 'Each year, evaluate converting traditional IRA to Roth. Consider: Current bracket (how much "room" before next bracket?), Future rates (will rates be higher?), RMD avoidance (reduce future required distributions), Estate planning (leave tax-free inheritance).'
        },
        {
          title: 'Tax Brackets for Bracket Filling (2026 MFJ)',
          type: 'table',
          headers: ['Bracket', 'Threshold'],
          rows: [
            ['12%', 'Up to $98,500'],
            ['22%', 'Up to $210,000'],
            ['24%', 'Up to $400,000'],
            ['32%', 'Up to $509,000']
          ]
        },
        {
          title: 'Bracket Filling Strategy',
          type: 'callout',
          content: 'Convert enough to "fill" current bracket without jumping to next.'
        },
        {
          title: 'Multi-Year Conversion Approaches',
          type: 'table',
          headers: ['Approach', 'Best For'],
          rows: [
            ['Convert entire IRA quickly', 'Young, low-income phase'],
            ['Gradual annual conversions', 'Retire early, before SS/RMDs'],
            ['Bracket-filling', 'Stay within tax-efficient zone'],
            ['None', 'Already in high bracket, expect lower future rates']
          ]
        },
        {
          title: 'TCJA Sunset Concerns (2025/2026)',
          type: 'table',
          headers: ['Provision', 'Current', 'After Sunset'],
          rows: [
            ['Top bracket', '37%', '39.6%'],
            ['Standard deduction', '$29,200 (MFJ)', '~$13,000'],
            ['Child tax credit', '$2,000', '$1,000'],
            ['QBI deduction', '20%', 'Eliminated'],
            ['Estate exemption', '~$13.6M', '~$7M']
          ]
        },
        {
          title: 'Strategic Responses to Sunset',
          type: 'table',
          headers: ['Strategy', 'Rationale'],
          rows: [
            ['Accelerate Roth conversions', 'Lock in lower rates'],
            ['Gift before sunset', 'Use large exemption'],
            ['Accelerate income', 'If expecting higher rates'],
            ['Defer deductions', 'Save for when more valuable']
          ]
        },
        {
          title: 'Sunset Caution',
          type: 'warning',
          content: 'Caution: Laws can change; don\'t over-optimize for uncertain future.'
        },
        {
          title: 'Major Life Events Tax Checklist',
          type: 'table',
          headers: ['Event', 'Tax Considerations'],
          rows: [
            ['**Marriage**', 'Withholding update, filing status, SS benefits'],
            ['**Divorce**', 'Alimony, QDROs, residence sale, filing status'],
            ['**New child**', 'Credits, withholding, 529 plans'],
            ['**Job change**', '401(k) rollover, moving expenses (no longer deductible)'],
            ['**Home purchase**', 'Mortgage interest, property taxes, points'],
            ['**Retirement**', 'RMDs, SS claiming, Roth conversions, Medicare premiums'],
            ['**Inheritance**', 'Step-up in basis, IRD, estate settlement'],
            ['**Death of spouse**', 'Filing status, survivor options, portability election']
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Multi-year planning often finds opportunities single-year misses',
            'Bunching deductions optimizes standard vs. itemized choice',
            'Bracket-filling Roth conversions can reduce lifetime taxes',
            'Tax law sunsets create planning urgency',
            'Life events trigger important tax planning opportunities'
          ]
        }
      ]
    }
  }
];
