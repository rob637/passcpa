/**
 * CFP Tax Planning Lessons - Advanced Topics
 * Domain 5: Tax Planning (14% of exam)
 * Blueprint Area: TAX-2 (Tax Planning Strategies)
 * 
 * 4 lessons covering advanced tax planning concepts
 */

import { CFPLesson } from '../../../types/cfp';

export const TAX_ADVANCED_LESSONS: CFPLesson[] = [
  {
    id: 'TAX-L009',
    domain: 'Tax Planning',
    blueprintArea: 'TAX-2',
    title: 'Alternative Minimum Tax (AMT)',
    order: 9,
    duration: 40,
    objectives: [
      'Understand AMT calculation methodology',
      'Identify common AMT preference items and adjustments',
      'Apply strategies to minimize AMT exposure',
      'Analyze ISO exercise timing for AMT impact'
    ],
    content: `# Alternative Minimum Tax (AMT)

## AMT Overview

The Alternative Minimum Tax is a parallel tax system designed to ensure high-income taxpayers pay at least a minimum amount of tax.

### AMT Calculation Process

\`\`\`
Regular Taxable Income
+ AMT Adjustments
+ AMT Preferences
= Alternative Minimum Taxable Income (AMTI)
- AMT Exemption
= AMT Base
× AMT Rate (26% or 28%)
= Tentative Minimum Tax
- Regular Tax Liability
= AMT (if positive)
\`\`\`

## AMT Exemption Amounts (2024)

| Filing Status | Exemption | Phase-out Starts | Phase-out Complete |
|--------------|-----------|------------------|-------------------|
| Single | $85,700 | $609,350 | $952,150 |
| MFJ | $133,300 | $1,218,700 | $1,751,900 |
| MFS | $66,650 | $609,350 | $876,100 |

**Phase-out:** 25% of AMTI above threshold

## AMT Adjustments (Add Back)

### Common Adjustments

| Item | Treatment |
|------|-----------|
| SALT Deduction | Add back to AMTI |
| Miscellaneous Itemized | Add back (pre-TCJA) |
| Standard Deduction | Cannot use under AMT |
| Medical (10% AGI floor) | Same as regular |
| Mortgage Interest | Only acquisition debt |

## AMT Preference Items

### Items That Increase AMTI

1. **Private Activity Bond Interest**
   - Tax-exempt for regular tax
   - Taxable for AMT (exceptions apply)

2. **Incentive Stock Options (ISO)**
   - Bargain element at exercise
   - $$(\\text{FMV} - \\text{Exercise Price}) \\times \\text{Shares}$$

3. **Accelerated Depreciation**
   - Difference vs. straight-line
   - Primarily affects real property

## ISO and AMT Planning

### The ISO AMT Trap

\`\`\`
Example:
Exercise 10,000 shares
Exercise price: $10
FMV at exercise: $50
Bargain element: $40 × 10,000 = $400,000 AMT income!
\`\`\`

### ISO Strategies

1. **Calculate "AMT-free" amount** before exercise
2. **Same-day sale** (disqualifying) avoids AMT
3. **Exercise in low-income years**
4. **Spread exercises** across multiple years
5. **Consider early exercise** when spread is small

## AMT Credit

When you pay AMT due to **timing differences** (like ISOs), you get an AMT credit:
- Carries forward indefinitely
- Used when regular tax exceeds TMT
- Refundable portion for some taxpayers

## Planning Strategies

### Accelerate Into AMT Years
- Income already taxed at 26-28%
- Additional STCG taxed at same rate vs. 32-37%

### Defer From AMT Years
- If AMT income is low enough
- Push income to regular tax year

### SALT and Timing
- Large SALT payments don't help in AMT years
- Consider deferring to non-AMT year
`,
    keyTakeaways: [
      'AMT is a parallel tax system ensuring minimum tax payment',
      'Key adjustments: SALT add-back, home equity interest',
      'Key preferences: ISO exercise, private activity bonds',
      'ISO bargain element creates AMT income at exercise',
      'AMT credit carries forward for timing differences'
    ],
    keyFormulas: [
      {
        name: 'AMT Base',
        formula: 'AMTI - AMT Exemption = AMT Base',
        variables: {
          AMTI: 'Alternative minimum taxable income',
          Exemption: 'Filing status-based exemption'
        }
      },
      {
        name: 'ISO AMT Income',
        formula: '(FMV - Exercise Price) × Shares = Bargain Element',
        variables: {
          FMV: 'Fair market value at exercise',
          Exercise: 'Option exercise price'
        }
      }
    ],
    mnemonics: [
      {
        acronym: 'SAP',
        meaning: 'AMT preferences: SALT, Activity bonds (private), Preferences (ISOs/depreciation)',
        usage: 'Remember main AMT adjustments'
      }
    ],
    practiceProblems: [
      {
        question: 'Jane exercises ISOs for 5,000 shares at $20 when FMV is $80. What is the AMT preference amount?',
        answer: '$300,000. Bargain element = ($80 - $20) × 5,000 = $60 × 5,000 = $300,000.'
      }
    ],
    relatedLessons: ['TAX-L001', 'TAX-L005', 'RET-L012']
  },
  {
    id: 'TAX-L010',
    domain: 'Tax Planning',
    blueprintArea: 'TAX-2',
    title: 'Passive Activity and At-Risk Rules',
    order: 10,
    duration: 35,
    objectives: [
      'Distinguish passive from non-passive activities',
      'Apply material participation tests',
      'Calculate passive activity loss limitations',
      'Understand real estate professional exception'
    ],
    content: `# Passive Activity and At-Risk Rules

## Overview of Loss Limitation Rules

Three loss limitation rules apply in order:

\`\`\`
1. Basis Limitation (How much in the game)
2. At-Risk Rules (How much you can lose)
3. Passive Activity Rules (Nature of the activity)
\`\`\`

## At-Risk Rules (§465)

### At-Risk Amount Includes:
- Cash contributions
- Adjusted basis of property contributed
- Borrowed amounts where personally liable
- Certain qualified nonrecourse financing (real estate)

### NOT At-Risk:
- Nonrecourse debt (except qualified RE)
- Amounts protected by agreements
- Loans from related parties

## Passive Activity Rules (§469)

### Passive Activities Defined
1. **Trade or business** where taxpayer does NOT materially participate
2. **Rental activities** (generally passive by definition)

### Key Rule
> **Passive losses can only offset passive income**

Suspended losses carry forward until:
- Activity becomes profitable
- Activity is fully disposed

## Material Participation Tests

A taxpayer materially participates if they meet ANY of these:

| Test | Description |
|------|-------------|
| 1 | 500+ hours in activity |
| 2 | Substantially all participation |
| 3 | 100+ hours AND no one participates more |
| 4 | Significant participation (100+ hrs) totaling 500+ |
| 5 | Materially participated 5 of prior 10 years |
| 6 | Personal service activity, 3 prior years |
| 7 | Regular, continuous, substantial participation |

**Mnemonic: 500, All, 100+, SPA5-3, Regular**

## Rental Activity Exception

### $25,000 Allowance
For active participation (lower standard than material):
- Deduct up to $25,000 passive losses against ordinary income
- Must own at least 10% of activity
- Applies to rental real estate only

### Phase-out
$$\\text{Allowance Reduction} = \\frac{(\\text{AGI} - \\$100,000) \\times 50\\%}{\\$1}$$

| AGI | Allowance |
|-----|-----------|
| ≤$100,000 | $25,000 |
| $125,000 | $12,500 |
| $150,000+ | $0 |

## Real Estate Professional Exception

### Requirements (Both Must Be Met)
1. More than **750 hours** in real property trades/businesses
2. More than **50%** of personal service time in real property activities

### Additional Requirement
- Must **materially participate** in each rental
- OR elect to **aggregate** all rentals as one activity

### Result
Rental losses are **NOT passive** — fully deductible against ordinary income.

## Disposition of Passive Activities

Upon **complete disposition** to unrelated party:
- All suspended losses become deductible
- Includes losses from prior years
- Activity must be fully terminated

### Types of Dispositions
- Sale (complete)
- Gift (losses transfer to donee's basis)
- Death (losses lost, but basis stepped up)
- Installment sale (losses released proportionally)

## Planning Strategies

1. **Passive income generators (PIGs)**
   - Create passive income to absorb passive losses
   - Rental income, K-1 income

2. **Group activities**
   - Combine related activities
   - Easier to meet material participation

3. **Real estate professional status**
   - Must genuinely meet requirements
   - Documentation is critical

4. **Timing dispositions**
   - Trigger suspended losses strategically
`,
    keyTakeaways: [
      'Passive losses only offset passive income',
      'Material participation: 500+ hours is the clearest test',
      'Rentals get $25,000 allowance with active participation',
      'Real estate professionals can deduct rental losses fully',
      'Complete disposition releases suspended losses'
    ],
    keyFormulas: [
      {
        name: '$25K Allowance Phase-out',
        formula: 'Reduction = (AGI - $100,000) × 50%',
        variables: {
          AGI: 'Adjusted gross income'
        }
      }
    ],
    mnemonics: [
      {
        acronym: 'PAL',
        meaning: 'Passive Activity Losses — can only offset Passive income',
        usage: 'Remember the fundamental PAL limitation'
      }
    ],
    practiceProblems: [
      {
        question: 'A taxpayer with AGI of $130,000 actively participates in rental property with $40,000 in losses. How much can they deduct?',
        answer: '$10,000. Phase-out: ($130,000 - $100,000) × 50% = $15,000 reduction. Allowance: $25,000 - $15,000 = $10,000.'
      }
    ],
    relatedLessons: ['TAX-L001', 'TAX-L009', 'INV-L010']
  },
  {
    id: 'TAX-L011',
    domain: 'Tax Planning',
    blueprintArea: 'TAX-2',
    title: 'Section 199A Qualified Business Income Deduction',
    order: 11,
    duration: 35,
    objectives: [
      'Calculate the QBI deduction for eligible taxpayers',
      'Apply W-2 wages and capital limitations',
      'Identify specified service trades or businesses (SSTBs)',
      'Navigate threshold and phase-out rules'
    ],
    content: `# Section 199A QBI Deduction

## Overview

The Qualified Business Income deduction allows eligible taxpayers to deduct up to 20% of qualified business income from pass-through entities.

### Eligible Structures
- Sole proprietorships
- Partnerships (general and limited)
- S corporations  
- LLCs (taxed as above)
- Trusts and estates

### NOT Eligible
- C corporations
- W-2 wages (from employment)

## Basic Calculation

$$\\text{QBI Deduction} = \\text{Lesser of:}$$

\`\`\`
1. 20% of QBI, OR
2. 20% of (Taxable Income - Net Capital Gains)
\`\`\`

## Income Thresholds (2024)

| Filing Status | Full Deduction | Phase-in Range | Full Limitations |
|--------------|----------------|----------------|------------------|
| Single | ≤$191,950 | $191,950 - $241,950 | >$241,950 |
| MFJ | ≤$383,900 | $383,900 - $483,900 | >$483,900 |

## W-2 Wages and Capital Limitation

Above the threshold, QBI deduction limited to GREATER of:

\`\`\`
Option 1: 50% of W-2 wages
Option 2: 25% of W-2 wages + 2.5% of UBIA
\`\`\`

**UBIA** = Unadjusted Basis Immediately After Acquisition

### Example
\`\`\`
QBI: $500,000
W-2 wages: $200,000
UBIA: $1,000,000

Option 1: 50% × $200,000 = $100,000
Option 2: 25% × $200,000 + 2.5% × $1,000,000 
        = $50,000 + $25,000 = $75,000

Greater of: $100,000
20% × $500,000 = $100,000

Deduction limited to: $100,000 ✓
\`\`\`

## Specified Service Trades or Businesses (SSTBs)

### SSTBs Face Additional Limits
Above threshold: **NO** 199A deduction allowed

| SSTB Categories | Examples |
|-----------------|----------|
| Health | Doctors, dentists, nurses |
| Law | Attorneys, paralegals |
| Accounting | CPAs, tax preparers |
| Actuarial | Actuaries |
| Performing Arts | Musicians, actors |
| Consulting | Business consultants |
| Athletics | Professional athletes |
| Financial Services | Advisors, brokers |
| Brokerage Services | Real estate (some), stockbrokers |

### Exceptions (NOT SSTBs)
- Architecture
- Engineering
- Real estate agents/brokers (generally)
- Restaurants/retail

## Phase-In Calculations

For income in the phase-in range:

### Non-SSTBs
Wage/capital limitation phases in:
$$\\text{Applicable \\%} = \\frac{\\text{Taxable Income} - \\text{Threshold}}{\\$50,000 \\text{ (or } \\$100,000 \\text{ MFJ)}}$$

### SSTBs
Both QBI and wages/capital are reduced:
$$\\text{Applicable \\%} = 1 - \\frac{\\text{Taxable Income} - \\text{Threshold}}{\\$50,000 \\text{ (or } \\$100,000 \\text{ MFJ)}}$$

## Aggregation Rules

Taxpayers may elect to aggregate businesses if:
- Same owner (directly or indirectly)
- Same tax year
- Meet two of three factors:
  1. Same products/services
  2. Shared facilities/operations
  3. Common ownership (50%+)

**Benefit:** Combine high-wage and high-capital businesses

## Planning Strategies

### Increase W-2 Wages
- Pay yourself more salary from S corp
- More wages = higher deduction ceiling

### Maximize UBIA
- Acquire capital-intensive businesses
- Consider timing of asset purchases

### Avoid SSTB Classification
- Structure business to avoid SSTB
- Separate non-SSTB activities

### Income Management
- Keep income below thresholds
- Time income recognition
- Consider Roth conversions strategically
`,
    keyTakeaways: [
      'QBI deduction = 20% of qualified business income',
      'W-2/UBIA limits apply above income thresholds',
      'SSTBs get no deduction above thresholds',
      'Aggregation can help maximize the deduction',
      'Deduction expires after 2025 without legislation'
    ],
    keyFormulas: [
      {
        name: 'Basic QBI Deduction',
        formula: 'Lesser of: 20% × QBI OR 20% × (TI - Net Cap Gains)',
        variables: {
          QBI: 'Qualified business income',
          TI: 'Taxable income'
        }
      },
      {
        name: 'W-2/Capital Limits',
        formula: 'Greater of: 50% × W-2 OR 25% × W-2 + 2.5% × UBIA',
        variables: {
          UBIA: 'Unadjusted basis immediately after acquisition'
        }
      }
    ],
    mnemonics: [
      {
        acronym: 'HLAC PAF',
        meaning: 'SSTBs: Health, Law, Accounting, Consulting, Performing Arts, Athletics, Financial',
        usage: 'Remember which businesses are SSTBs'
      }
    ],
    practiceProblems: [
      {
        question: 'A single taxpayer has $180,000 taxable income and $100,000 QBI from a manufacturing business. What is the 199A deduction?',
        answer: '$20,000. Below $191,950 threshold, no limitations. 20% × $100,000 = $20,000.'
      }
    ],
    relatedLessons: ['TAX-L001', 'TAX-L008', 'RET-L016']
  },
  {
    id: 'TAX-L012',
    domain: 'Tax Planning',
    blueprintArea: 'TAX-2',
    title: 'Net Investment Income Tax and Additional Medicare Tax',
    order: 12,
    duration: 30,
    objectives: [
      'Calculate the 3.8% NIIT on investment income',
      'Apply the 0.9% Additional Medicare Tax',
      'Identify income included and excluded from NIIT',
      'Develop strategies to minimize these surtaxes'
    ],
    content: `# Net Investment Income Tax (NIIT) and Additional Medicare Tax

## Overview of ACA Surtaxes

The Affordable Care Act created two additional taxes:

| Tax | Rate | Threshold | On What |
|-----|------|-----------|---------|
| NIIT | 3.8% | $200K/$250K | Investment income |
| Add'l Medicare | 0.9% | $200K/$250K | Earned income |

## Net Investment Income Tax (§1411)

### Threshold (MAGI)
| Filing Status | Threshold |
|--------------|-----------|
| Single | $200,000 |
| MFJ | $250,000 |
| MFS | $125,000 |

### NIIT Calculation
$$NIIT = 3.8\\% \\times \\text{Lesser of:}$$
- Net Investment Income, OR
- MAGI - Threshold

### Net Investment Income Includes:

**Included:**
- Interest (taxable)
- Dividends (ordinary and qualified)
- Capital gains (short and long-term)
- Rental income (non-professional)
- Passive business income
- Annuity income (non-qualified)
- Royalties

**Excluded:**
- Municipal bond interest
- Wages and self-employment income
- Social Security benefits
- Tax-exempt income
- Distributions from retirement accounts
- Income from active trade/business
- S corp/partner income with material participation

### NIIT Calculation Example

\`\`\`
MFJ with MAGI: $320,000
Net Investment Income: $50,000

Excess MAGI: $320,000 - $250,000 = $70,000
Lesser of NII ($50,000) or excess ($70,000) = $50,000
NIIT: 3.8% × $50,000 = $1,900
\`\`\`

## Additional Medicare Tax (§3101(b)(2))

### Applies To:
- Wages over threshold
- Self-employment income over threshold

### Calculation
$$\\text{Add'l Med Tax} = 0.9\\% \\times (\\text{Earned Income} - \\text{Threshold})$$

### Withholding Issue
Employers must withhold starting at $200,000 regardless of filing status:
- MFJ: May underwithhold (threshold $250K)
- MFS: May underwithhold (threshold $125K)

### Self-Employed
For SE income:
- Regular SE tax: 15.3% (12.4% + 2.9%)
- Additional: 0.9% on excess over threshold
- Deduct 50% of regular SE tax only

## Combined Tax Rates

### For High-Income Taxpayers

| Income Type | Marginal Rate | + NIIT | Total |
|-------------|---------------|--------|-------|
| Ordinary Income | 37% | N/A | 37% |
| LTCG/Qual Div | 20% | 3.8% | 23.8% |
| Short-Term CG | 37% | 3.8% | 40.8% |
| Wages | 37% | +0.9% Med | 37.9%* |

*Plus 6.2% employee FICA if below wage base

## Planning Strategies

### Reduce MAGI
- Maximize retirement contributions
- Harvest capital losses
- Time income recognition
- Municipal bond investments

### Shift to Non-NIIT Income
- Active business income (materially participate)
- Qualified retirement plan distributions
- Roth conversions (planned)

### Real Estate Professional
- Rental income becomes non-passive
- Escapes NIIT classification

### Installment Sales
- Spread gain recognition
- May keep MAGI below threshold

### Tax-Loss Harvesting
- Reduces NII directly
- Reduces MAGI (if gains absorbed)

## Reporting

| Tax | Form | Line |
|-----|------|------|
| NIIT | Form 8960 | Added to Form 1040 |
| Add'l Medicare | Form 8959 | Schedule 2 |

Both are due with regular tax return, with estimated payments if needed.
`,
    keyTakeaways: [
      'NIIT: 3.8% on investment income above $200K/$250K',
      'Add Medicare: 0.9% on wages/SE above $200K/$250K',
      'NIIT applies to capital gains, dividends, interest, passive income',
      'Active business income and muni bonds escape NIIT',
      'Top combined rate on investment income: 23.8%'
    ],
    keyFormulas: [
      {
        name: 'NIIT',
        formula: '3.8% × Lesser of (NII or MAGI - Threshold)',
        variables: {
          NII: 'Net investment income',
          MAGI: 'Modified AGI'
        }
      },
      {
        name: 'Additional Medicare',
        formula: '0.9% × (Earned Income - Threshold)',
        variables: {
          Threshold: '$200K single, $250K MFJ'
        }
      }
    ],
    mnemonics: [
      {
        acronym: 'NIIT NOT',
        meaning: 'NIIT does NOT apply to: Retirement distributions, Municipal bonds, Active business, Wages, Social Security',
        usage: 'Remember what\'s excluded from NIIT'
      }
    ],
    practiceProblems: [
      {
        question: 'A single taxpayer has $180,000 wages and $60,000 in dividends. Calculate the NIIT.',
        answer: '$1,520. MAGI = $240,000. Excess = $240,000 - $200,000 = $40,000. NII = $60,000. Lesser = $40,000. NIIT = 3.8% × $40,000 = $1,520.'
      }
    ],
    relatedLessons: ['TAX-L001', 'TAX-L005', 'INV-L009']
  }
];

export default TAX_ADVANCED_LESSONS;
