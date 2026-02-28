/**
 * CFP Tax Planning Lessons - Advanced Topics
 * Domain 5: Tax Planning (14% of exam)
 * Blueprint Area: TAX-2 (Tax Planning Strategies)
 * 
 * 4 lessons covering advanced tax planning concepts
 */

import type { Lesson } from '../../../types';

export const TAX_ADVANCED_LESSONS: Lesson[] = [
  {
    id: 'TAX-L009',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    title: 'Alternative Minimum Tax (AMT)',
    description: 'Understand AMT calculation methodology and apply strategies to minimize AMT exposure.',
    order: 9,
    duration: 40,
    difficulty: 'advanced',
    topics: [
      'Understand AMT calculation methodology',
      'Identify common AMT preference items and adjustments',
      'Apply strategies to minimize AMT exposure',
      'Analyze ISO exercise timing for AMT impact'
    ],
    content: {
      sections: [
        {
          title: 'AMT Overview',
          type: 'text',
          content: 'The Alternative Minimum Tax is a parallel tax system designed to ensure high-income taxpayers pay at least a minimum amount of tax.'
        },
        {
          title: 'AMT Calculation Process',
          type: 'list',
          items: [
            'Regular Taxable Income',
            '+ AMT Adjustments',
            '+ AMT Preferences',
            '= Alternative Minimum Taxable Income (AMTI)',
            '- AMT Exemption',
            '= AMT Base',
            '× AMT Rate (26% or 28%)',
            '= Tentative Minimum Tax',
            '- Regular Tax Liability',
            '= AMT (if positive)'
          ]
        },
        {
          title: 'AMT Exemption Amounts (2026)',
          type: 'table',
          headers: ['Filing Status', 'Exemption', 'Phase-out Starts', 'Phase-out Complete'],
          rows: [
            ['Single', '$88,100', '$626,350', '$978,750'],
            ['MFJ', '$137,000', '$1,252,700', '$1,800,700'],
            ['MFS', '$68,500', '$626,350', '$900,350']
          ]
        },
        {
          title: 'Exemption Phase-out',
          type: 'callout',
          content: 'Phase-out: 25% of AMTI above threshold. The exemption is reduced by 25 cents for every dollar above the phase-out threshold.'
        },
        {
          title: 'AMT Adjustments - Common Add-Backs',
          type: 'table',
          headers: ['Item', 'Treatment'],
          rows: [
            ['SALT Deduction', 'Add back to AMTI'],
            ['Miscellaneous Itemized', 'Add back (pre-TCJA)'],
            ['Standard Deduction', 'Cannot use under AMT'],
            ['Medical (10% AGI floor)', 'Same as regular'],
            ['Mortgage Interest', 'Only acquisition debt']
          ]
        },
        {
          title: 'AMT Preference Items',
          type: 'table',
          headers: ['Item', 'Description'],
          rows: [
            ['**Private Activity Bond Interest**', 'Tax-exempt for regular tax, taxable for AMT (exceptions apply)'],
            ['**Incentive Stock Options (ISO)**', 'Bargain element at exercise: (FMV - Exercise Price) × Shares'],
            ['**Accelerated Depreciation**', 'Difference vs. straight-line, primarily affects real property']
          ]
        },
        {
          title: 'The ISO AMT Trap',
          type: 'warning',
          content: 'Example: Exercise 10,000 shares at $10 exercise price when FMV is $50. Bargain element: $40 × 10,000 = $400,000 AMT income! This can trigger significant unexpected AMT liability.'
        },
        {
          title: 'ISO Strategies',
          type: 'list',
          items: [
            'Calculate "AMT-free" amount before exercise',
            'Same-day sale (disqualifying) avoids AMT',
            'Exercise in low-income years',
            'Spread exercises across multiple years',
            'Consider early exercise when spread is small'
          ]
        },
        {
          title: 'AMT Credit',
          type: 'callout',
          content: 'When you pay AMT due to timing differences (like ISOs), you get an AMT credit. It carries forward indefinitely, is used when regular tax exceeds TMT, and has a refundable portion for some taxpayers.'
        },
        {
          title: 'AMT Planning Strategies',
          type: 'table',
          headers: ['Strategy', 'Application'],
          rows: [
            ['Accelerate Into AMT Years', 'Income already taxed at 26-28%; additional STCG taxed at same rate vs. 32-37%'],
            ['Defer From AMT Years', 'If AMT income is low enough; push income to regular tax year'],
            ['SALT and Timing', 'Large SALT payments don\'t help in AMT years; consider deferring to non-AMT year']
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'AMT is a parallel tax system ensuring minimum tax payment',
            'Key adjustments: SALT add-back, home equity interest',
            'Key preferences: ISO exercise, private activity bonds',
            'ISO bargain element creates AMT income at exercise',
            'AMT credit carries forward for timing differences'
          ]
        }
      ]
    }
  },
  {
    id: 'TAX-L010',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    title: 'Passive Activity and At-Risk Rules',
    description: 'Distinguish passive from non-passive activities and apply material participation tests.',
    order: 10,
    duration: 35,
    difficulty: 'advanced',
    topics: [
      'Distinguish passive from non-passive activities',
      'Apply material participation tests',
      'Calculate passive activity loss limitations',
      'Understand real estate professional exception'
    ],
    content: {
      sections: [
        {
          title: 'Overview of Loss Limitation Rules',
          type: 'text',
          content: 'Three loss limitation rules apply in order: 1) Basis Limitation (How much in the game), 2) At-Risk Rules (How much you can lose), 3) Passive Activity Rules (Nature of the activity).'
        },
        {
          title: 'At-Risk Rules (§465)',
          type: 'table',
          headers: ['At-Risk Amount Includes', 'NOT At-Risk'],
          rows: [
            ['Cash contributions', 'Nonrecourse debt (except qualified RE)'],
            ['Adjusted basis of property contributed', 'Amounts protected by agreements'],
            ['Borrowed amounts where personally liable', 'Loans from related parties'],
            ['Certain qualified nonrecourse financing (real estate)', '']
          ]
        },
        {
          title: 'Passive Activity Rules (§469)',
          type: 'callout',
          content: 'Passive Activities Defined: 1) Trade or business where taxpayer does NOT materially participate, 2) Rental activities (generally passive by definition). Key Rule: Passive losses can only offset passive income.'
        },
        {
          title: 'Suspended Losses',
          type: 'text',
          content: 'Suspended losses carry forward until the activity becomes profitable or the activity is fully disposed.'
        },
        {
          title: 'Material Participation Tests',
          type: 'table',
          headers: ['Test', 'Description'],
          rows: [
            ['1', '500+ hours in activity'],
            ['2', 'Substantially all participation'],
            ['3', '100+ hours AND no one participates more'],
            ['4', 'Significant participation (100+ hrs) totaling 500+'],
            ['5', 'Materially participated 5 of prior 10 years'],
            ['6', 'Personal service activity, 3 prior years'],
            ['7', 'Regular, continuous, substantial participation']
          ]
        },
        {
          title: 'Material Participation Mnemonic',
          type: 'callout',
          content: '500, All, 100+, SPA5-3, Regular - These represent the key tests to remember for material participation.'
        },
        {
          title: '$25,000 Rental Allowance',
          type: 'text',
          content: 'For active participation (lower standard than material): Deduct up to $25,000 passive losses against ordinary income. Must own at least 10% of activity. Applies to rental real estate only.'
        },
        {
          title: 'Rental Allowance Phase-out',
          type: 'table',
          headers: ['AGI', 'Allowance'],
          rows: [
            ['≤$100,000', '$25,000'],
            ['$125,000', '$12,500'],
            ['$150,000+', '$0']
          ]
        },
        {
          title: 'Phase-out Formula',
          type: 'callout',
          content: 'Allowance Reduction = (AGI - $100,000) × 50%'
        },
        {
          title: 'Real Estate Professional Exception',
          type: 'text',
          content: 'Requirements (Both Must Be Met): 1) More than 750 hours in real property trades/businesses, 2) More than 50% of personal service time in real property activities. Additional requirement: Must materially participate in each rental OR elect to aggregate all rentals as one activity.'
        },
        {
          title: 'Real Estate Professional Result',
          type: 'callout',
          content: 'Rental losses are NOT passive — they become fully deductible against ordinary income. This is a powerful tax planning tool for qualifying professionals.'
        },
        {
          title: 'Disposition of Passive Activities',
          type: 'text',
          content: 'Upon complete disposition to unrelated party: All suspended losses become deductible, includes losses from prior years, activity must be fully terminated.'
        },
        {
          title: 'Types of Dispositions',
          type: 'table',
          headers: ['Type', 'Treatment'],
          rows: [
            ['Sale (complete)', 'All suspended losses released'],
            ['Gift', 'Losses transfer to donee\'s basis'],
            ['Death', 'Losses lost, but basis stepped up'],
            ['Installment sale', 'Losses released proportionally']
          ]
        },
        {
          title: 'Planning Strategies',
          type: 'list',
          items: [
            'Passive income generators (PIGs): Create passive income to absorb passive losses - rental income, K-1 income',
            'Group activities: Combine related activities for easier material participation',
            'Real estate professional status: Must genuinely meet requirements, documentation is critical',
            'Timing dispositions: Trigger suspended losses strategically'
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Passive losses only offset passive income',
            'Material participation: 500+ hours is the clearest test',
            'Rentals get $25,000 allowance with active participation',
            'Real estate professionals can deduct rental losses fully',
            'Complete disposition releases suspended losses'
          ]
        }
      ]
    }
  },
  {
    id: 'TAX-L011',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    title: 'Section 199A Qualified Business Income Deduction',
    description: 'Calculate the QBI deduction and navigate threshold and phase-out rules.',
    order: 11,
    duration: 35,
    difficulty: 'advanced',
    topics: [
      'Calculate the QBI deduction for eligible taxpayers',
      'Apply W-2 wages and capital limitations',
      'Identify specified service trades or businesses (SSTBs)',
      'Navigate threshold and phase-out rules'
    ],
    content: {
      sections: [
        {
          title: 'Overview',
          type: 'text',
          content: 'The Qualified Business Income deduction allows eligible taxpayers to deduct up to 20% of qualified business income from pass-through entities.'
        },
        {
          title: 'Eligible Structures',
          type: 'list',
          items: [
            'Sole proprietorships',
            'Partnerships (general and limited)',
            'S corporations',
            'LLCs (taxed as above)',
            'Trusts and estates'
          ]
        },
        {
          title: 'NOT Eligible',
          type: 'warning',
          content: 'C corporations and W-2 wages (from employment) are NOT eligible for the QBI deduction.'
        },
        {
          title: 'Basic Calculation',
          type: 'callout',
          content: 'QBI Deduction = Lesser of: 1) 20% of QBI, OR 2) 20% of (Taxable Income - Net Capital Gains)'
        },
        {
          title: 'Income Thresholds (2024)',
          type: 'table',
          headers: ['Filing Status', 'Full Deduction', 'Phase-in Range', 'Full Limitations'],
          rows: [
            ['Single', '≤$191,950', '$191,950 - $241,950', '>$241,950'],
            ['MFJ', '≤$383,900', '$383,900 - $483,900', '>$483,900']
          ]
        },
        {
          title: 'W-2 Wages and Capital Limitation',
          type: 'text',
          content: 'Above the threshold, QBI deduction is limited to the GREATER of: Option 1: 50% of W-2 wages, or Option 2: 25% of W-2 wages + 2.5% of UBIA (Unadjusted Basis Immediately After Acquisition).'
        },
        {
          title: 'W-2/UBIA Limit Example',
          type: 'example',
          content: 'QBI: $500,000 | W-2 wages: $200,000 | UBIA: $1,000,000. Option 1: 50% × $200,000 = $100,000. Option 2: 25% × $200,000 + 2.5% × $1,000,000 = $50,000 + $25,000 = $75,000. Greater of: $100,000. 20% × $500,000 = $100,000. Deduction limited to: $100,000 ✓'
        },
        {
          title: 'Specified Service Trades or Businesses (SSTBs)',
          type: 'warning',
          content: 'SSTBs Face Additional Limits: Above threshold, NO 199A deduction is allowed.'
        },
        {
          title: 'SSTB Categories',
          type: 'table',
          headers: ['SSTB Categories', 'Examples'],
          rows: [
            ['Health', 'Doctors, dentists, nurses'],
            ['Law', 'Attorneys, paralegals'],
            ['Accounting', 'CPAs, tax preparers'],
            ['Actuarial', 'Actuaries'],
            ['Performing Arts', 'Musicians, actors'],
            ['Consulting', 'Business consultants'],
            ['Athletics', 'Professional athletes'],
            ['Financial Services', 'Advisors, brokers'],
            ['Brokerage Services', 'Real estate (some), stockbrokers']
          ]
        },
        {
          title: 'Exceptions (NOT SSTBs)',
          type: 'list',
          items: [
            'Architecture',
            'Engineering',
            'Real estate agents/brokers (generally)',
            'Restaurants/retail'
          ]
        },
        {
          title: 'Phase-In Calculations',
          type: 'text',
          content: 'For income in the phase-in range: Non-SSTBs have wage/capital limitation phase in. SSTBs have both QBI and wages/capital reduced. Applicable % formula uses (Taxable Income - Threshold) / $50,000 (or $100,000 MFJ).'
        },
        {
          title: 'Aggregation Rules',
          type: 'text',
          content: 'Taxpayers may elect to aggregate businesses if: Same owner (directly or indirectly), Same tax year, and meet two of three factors: 1) Same products/services, 2) Shared facilities/operations, 3) Common ownership (50%+). Benefit: Combine high-wage and high-capital businesses.'
        },
        {
          title: 'Planning Strategies',
          type: 'table',
          headers: ['Strategy', 'Action'],
          rows: [
            ['Increase W-2 Wages', 'Pay yourself more salary from S corp - more wages = higher deduction ceiling'],
            ['Maximize UBIA', 'Acquire capital-intensive businesses, consider timing of asset purchases'],
            ['Avoid SSTB Classification', 'Structure business to avoid SSTB, separate non-SSTB activities'],
            ['Income Management', 'Keep income below thresholds, time income recognition, consider Roth conversions strategically']
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'QBI deduction = 20% of qualified business income',
            'W-2/UBIA limits apply above income thresholds',
            'SSTBs get no deduction above thresholds',
            'Aggregation can help maximize the deduction',
            'Deduction expires after 2025 without legislation'
          ]
        }
      ]
    }
  },
  {
    id: 'TAX-L012',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    title: 'Net Investment Income Tax and Additional Medicare Tax',
    description: 'Calculate the 3.8% NIIT on investment income and develop strategies to minimize surtaxes.',
    order: 12,
    duration: 30,
    difficulty: 'advanced',
    topics: [
      'Calculate the 3.8% NIIT on investment income',
      'Apply the 0.9% Additional Medicare Tax',
      'Identify income included and excluded from NIIT',
      'Develop strategies to minimize these surtaxes'
    ],
    content: {
      sections: [
        {
          title: 'Overview of ACA Surtaxes',
          type: 'table',
          headers: ['Tax', 'Rate', 'Threshold', 'On What'],
          rows: [
            ['NIIT', '3.8%', '$200K/$250K', 'Investment income'],
            ['Add\'l Medicare', '0.9%', '$200K/$250K', 'Earned income']
          ]
        },
        {
          title: 'Net Investment Income Tax Thresholds',
          type: 'table',
          headers: ['Filing Status', 'Threshold'],
          rows: [
            ['Single', '$200,000'],
            ['MFJ', '$250,000'],
            ['MFS', '$125,000']
          ]
        },
        {
          title: 'NIIT Calculation',
          type: 'callout',
          content: 'NIIT = 3.8% × Lesser of: Net Investment Income, OR MAGI - Threshold'
        },
        {
          title: 'Net Investment Income Includes',
          type: 'list',
          items: [
            'Interest (taxable)',
            'Dividends (ordinary and qualified)',
            'Capital gains (short and long-term)',
            'Rental income (non-professional)',
            'Passive business income',
            'Annuity income (non-qualified)',
            'Royalties'
          ]
        },
        {
          title: 'Net Investment Income Excludes',
          type: 'list',
          items: [
            'Municipal bond interest',
            'Wages and self-employment income',
            'Social Security benefits',
            'Tax-exempt income',
            'Distributions from retirement accounts',
            'Income from active trade/business',
            'S corp/partner income with material participation'
          ]
        },
        {
          title: 'NIIT Calculation Example',
          type: 'example',
          content: 'MFJ with MAGI: $320,000. Net Investment Income: $50,000. Excess MAGI: $320,000 - $250,000 = $70,000. Lesser of NII ($50,000) or excess ($70,000) = $50,000. NIIT: 3.8% × $50,000 = $1,900.'
        },
        {
          title: 'Additional Medicare Tax (§3101(b)(2))',
          type: 'text',
          content: 'Applies to wages over threshold and self-employment income over threshold. Calculation: 0.9% × (Earned Income - Threshold).'
        },
        {
          title: 'Medicare Tax Withholding Issue',
          type: 'warning',
          content: 'Employers must withhold starting at $200,000 regardless of filing status. MFJ may underwithhold (threshold $250K). MFS may underwithhold (threshold $125K).'
        },
        {
          title: 'Self-Employed Medicare Tax',
          type: 'text',
          content: 'For SE income: Regular SE tax is 15.3% (12.4% + 2.9%). Additional 0.9% applies on excess over threshold. Only 50% of regular SE tax is deductible.'
        },
        {
          title: 'Combined Tax Rates for High-Income Taxpayers',
          type: 'table',
          headers: ['Income Type', 'Marginal Rate', '+ NIIT', 'Total'],
          rows: [
            ['Ordinary Income', '37%', 'N/A', '37%'],
            ['LTCG/Qual Div', '20%', '3.8%', '23.8%'],
            ['Short-Term CG', '37%', '3.8%', '40.8%'],
            ['Wages', '37%', '+0.9% Med', '37.9%*']
          ]
        },
        {
          title: 'Rate Notes',
          type: 'callout',
          content: '*Plus 6.2% employee FICA if below wage base'
        },
        {
          title: 'Planning Strategies',
          type: 'table',
          headers: ['Strategy', 'Application'],
          rows: [
            ['Reduce MAGI', 'Maximize retirement contributions, harvest capital losses, time income recognition, municipal bond investments'],
            ['Shift to Non-NIIT Income', 'Active business income (materially participate), qualified retirement plan distributions, Roth conversions (planned)'],
            ['Real Estate Professional', 'Rental income becomes non-passive, escapes NIIT classification'],
            ['Installment Sales', 'Spread gain recognition, may keep MAGI below threshold'],
            ['Tax-Loss Harvesting', 'Reduces NII directly, reduces MAGI (if gains absorbed)']
          ]
        },
        {
          title: 'Reporting',
          type: 'table',
          headers: ['Tax', 'Form', 'Line'],
          rows: [
            ['NIIT', 'Form 8960', 'Added to Form 1040'],
            ['Add\'l Medicare', 'Form 8959', 'Schedule 2']
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'NIIT: 3.8% on investment income above $200K/$250K',
            'Add Medicare: 0.9% on wages/SE above $200K/$250K',
            'NIIT applies to capital gains, dividends, interest, passive income',
            'Active business income and muni bonds escape NIIT',
            'Top combined rate on investment income: 23.8%'
          ]
        }
      ]
    }
  }
];

export default TAX_ADVANCED_LESSONS;
