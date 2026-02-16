/**
 * CFP Risk Management Lessons - Life Insurance
 * Domain 3: Risk Management and Insurance Planning (12% of exam)
 * Blueprint Area: RIS-2 - Life Insurance
 * 
 * Topics: Life insurance types, needs analysis, policy provisions
 */

import type { Lesson } from '../../../types';

export const CFP_RIS2_LESSONS: Lesson[] = [
  {
    id: 'CFP-RIS-L004',
    courseId: 'cfp',
    section: 'CFP-RISK',
    title: 'Life Insurance Needs Analysis',
    description: 'Calculate life insurance needs using multiple methods and integrate life insurance into financial planning',
    order: 4,
    duration: 30,
    difficulty: 'intermediate',
    topics: [
      'Calculate life insurance needs using multiple methods',
      'Identify factors affecting insurance amount',
      'Compare needs approaches for different situations',
      'Integrate life insurance into financial planning'
    ],
    blueprintArea: 'RIS-2',
    content: {
      sections: [
        {
          title: 'Purpose of Life Insurance',
          type: 'text',
          content: 'Life insurance replaces income and resources lost when someone dies. Those who need life insurance include: income earners with dependents, non-working spouses (childcare value), business owners (key person/buy-sell), estate planning needs, and debt/mortgage holders.'
        },
        {
          title: 'Human Life Value Approach',
          type: 'text',
          content: 'The Human Life Value approach values a person\'s future earning potential. Formula: HLV = Annual Earnings × PV Factor for Working Years. Steps: (1) Estimate average annual earnings, (2) Deduct taxes and self-consumption (30-40%), (3) Select discount rate, (4) Calculate PV of income stream to retirement.'
        },
        {
          title: 'Human Life Value Example',
          type: 'table',
          headers: ['Factor', 'Value'],
          rows: [
            ['Annual income', '$100,000'],
            ['Less personal consumption', '-$35,000'],
            ['Net for family', '$65,000'],
            ['Years to retirement', '25'],
            ['Discount rate', '5%'],
            ['PV annuity factor', '14.094'],
            ['Human life value', '$916,110']
          ]
        },
        {
          title: 'Needs Approach (Capital Needs Analysis)',
          type: 'callout',
          content: 'The Needs Approach is the most comprehensive method—it matches coverage to specific needs. This is the preferred method for CFP exam questions.'
        },
        {
          title: 'Needs Approach: Step 1 - Identify Needs',
          type: 'list',
          items: [
            'Immediate Needs (Lump Sum): Final expenses (funeral, medical), Emergency fund, Debt payoff (mortgage, loans), Estate taxes/settlement costs, Children\'s education fund',
            'Ongoing Needs (Income Replacement): Living expenses for family, Child care, Retirement funding for spouse'
          ]
        },
        {
          title: 'Needs Approach: Steps 2-3',
          type: 'text',
          content: 'Step 2: Inventory Resources - existing life insurance, liquid assets, Social Security survivor benefits, pension survivor benefits, spouse\'s income. Step 3: Calculate Gap using formula: Insurance Need = Total Needs - Total Resources.'
        },
        {
          title: 'Needs Analysis Example',
          type: 'table',
          headers: ['Needs', 'Amount'],
          rows: [
            ['Final expenses', '$25,000'],
            ['Mortgage payoff', '$350,000'],
            ['Emergency fund', '$30,000'],
            ['College fund (2 children)', '$200,000'],
            ['Income replacement (PV)', '$800,000'],
            ['Total Needs', '$1,405,000'],
            ['', ''],
            ['Resources', 'Amount'],
            ['Existing group life', '$200,000'],
            ['Savings', '$50,000'],
            ['Social Security PV', '$150,000'],
            ['Spouse income', '$100,000'],
            ['Total Resources', '$500,000'],
            ['', ''],
            ['Insurance Need', '$905,000']
          ]
        },
        {
          title: 'Multiple of Income Rule of Thumb',
          type: 'text',
          content: 'Simple estimate: 7-10 times annual income. Advantages: Quick estimate, easy to understand. Disadvantages: Ignores specific circumstances, may significantly over/underestimate.'
        },
        {
          title: 'Comparison of Methods',
          type: 'table',
          headers: ['Method', 'Best Used For', 'Accuracy'],
          rows: [
            ['Human Life Value', 'Maximum potential', 'Low'],
            ['Needs Analysis', 'Comprehensive planning', 'High'],
            ['Multiple of Income', 'Quick estimate', 'Low']
          ]
        },
        {
          title: 'Special Considerations',
          type: 'list',
          items: [
            'Stay-at-Home Spouse: Value services at replacement cost ($30,000-$80,000/year) - childcare, housekeeping, transportation, meal preparation',
            'Business Owners: Key person insurance, buy-sell funding, loan collateral, business continuation',
            'Single Parents: Higher need since there\'s no second income',
            'Dual-Income Families: Cover both spouses proportionally'
          ]
        },
        {
          title: 'Exam Tip: FDEM-IC Mnemonic',
          type: 'warning',
          content: 'Remember immediate needs with FDEM-IC: Final expenses, Debt, Emergency fund, Mortgage, Income replacement, College.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Needs approach is most comprehensive—matches specific needs to resources',
            'Human life value calculates PV of future earnings minus self-consumption',
            'Rule of thumb (7-10x income) is quick but imprecise',
            'Remember to value stay-at-home spouse services',
            'Review needs periodically as circumstances change'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-RIS-L005',
    courseId: 'cfp',
    section: 'CFP-RISK',
    title: 'Types of Life Insurance',
    description: 'Compare term and permanent life insurance and apply appropriate policy types to client needs',
    order: 5,
    duration: 35,
    difficulty: 'intermediate',
    topics: [
      'Compare term and permanent life insurance',
      'Explain features of whole life, universal life, variable products',
      'Apply appropriate policy type to client needs',
      'Understand policy cost structures'
    ],
    blueprintArea: 'RIS-2',
    content: {
      sections: [
        {
          title: 'Term Life Insurance Characteristics',
          type: 'list',
          items: [
            'Pure death protection only - no cash value accumulation',
            'Lowest initial cost among all policy types',
            'Coverage for a specified period',
            'Best for: Temporary needs, maximum coverage for limited budget, mortgage protection, young families'
          ]
        },
        {
          title: 'Types of Term Insurance',
          type: 'list',
          items: [
            'Level Term: Premium and death benefit remain level; common terms: 10, 15, 20, 30 years; most popular form',
            'Decreasing Term: Face amount decreases over time, premium remains level; often used for mortgage protection',
            'Annual Renewable Term (ART): Renews each year without evidence; premium increases annually'
          ]
        },
        {
          title: 'Critical Term Insurance Features',
          type: 'callout',
          content: 'Renewability allows renewal without proof of insurability (premium based on attained age, often renewable to age 70-95). Convertibility allows conversion to permanent policy without evidence of insurability—critical if health changes. Return of Premium (ROP) Term returns premiums if insured survives term but costs 50-100% more.'
        },
        {
          title: 'Whole Life Insurance Characteristics',
          type: 'list',
          items: [
            'Permanent coverage (to age 100+) with level premium for life',
            'Cash value accumulates tax-deferred with fixed death benefit',
            'Ordinary (Straight) Life: Premiums paid to death or age 100; lowest premium; builds cash value slowly',
            'Limited Pay Whole Life: Same coverage, compressed payments (10-pay, 20-pay, paid-up at 65); higher premium, builds cash faster',
            'Single Premium Whole Life: One lump-sum payment, immediately paid up; classified as MEC'
          ]
        },
        {
          title: 'Cash Value Features',
          type: 'list',
          items: [
            'Loans: Borrow against cash value; interest charged (typically 6-8%); reduces death benefit if not repaid',
            'Withdrawals: Up to basis = tax-free (FIFO); must maintain minimum coverage',
            'Dividends (Participating Policies): Not guaranteed; options include cash, reduce premium, buy paid-up additions (additional permanent coverage)'
          ]
        },
        {
          title: 'Universal Life (UL) Characteristics',
          type: 'text',
          content: 'Universal Life offers flexible premiums, adjustable death benefit, and transparent cost structure. How it works: Premium paid → Less mortality charges and expenses → Remainder credits to cash value → Cash value earns interest.'
        },
        {
          title: 'UL Death Benefit Options',
          type: 'table',
          headers: ['Option', 'Structure', 'Impact'],
          rows: [
            ['Option A (Level)', 'Fixed death benefit', 'Net amount at risk decreases as CV grows; lower cost at older ages'],
            ['Option B (Increasing)', 'Death benefit = Face + Cash value', 'Net amount at risk remains level; higher cost']
          ]
        },
        {
          title: 'Indexed Universal Life (IUL)',
          type: 'text',
          content: 'Cash value linked to stock index (S&P 500) with participation rate (e.g., 80% of gains), cap rate (e.g., maximum 12%), and floor (typically 0% - no loss to CV). Example: 15% index return with 80% participation and 12% cap credits 12%; 10% return credits 8%; -5% return credits 0%.'
        },
        {
          title: 'Variable Life Insurance',
          type: 'list',
          items: [
            'Cash value invested in subaccounts with investment risk on policyholder',
            'Potential for higher returns but also potential for loss',
            'Variable Universal Life (VUL): Combines variable investing with UL flexibility',
            'Considered a security (not just insurance); requires securities license; prospectus required'
          ]
        },
        {
          title: 'Policy Type Comparison',
          type: 'table',
          headers: ['Feature', 'Term', 'Whole Life', 'UL', 'VUL'],
          rows: [
            ['Cash value', 'No', 'Yes', 'Yes', 'Yes'],
            ['Premium', 'Level', 'Level', 'Flexible', 'Flexible'],
            ['Investment risk', 'N/A', 'Insurer', 'Insurer', 'Owner'],
            ['Cost', 'Lowest', 'Higher', 'Moderate', 'Variable'],
            ['Best for', 'Temp needs', 'Guarantees', 'Flexibility', 'Growth potential']
          ]
        },
        {
          title: 'Exam Tip: TWUV Mnemonic',
          type: 'warning',
          content: 'Policy Types from Least to Most Risk: Term, Whole life, Universal, Variable. Remember convertibility is critical for term policies in case health changes.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Term provides maximum coverage at lowest cost; no cash value',
            'Whole life guarantees level premiums and builds cash value',
            'Universal life offers premium/death benefit flexibility',
            'Variable products shift investment risk to policyholder',
            'Convertibility feature is critical for term policies'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-RIS-L006',
    courseId: 'cfp',
    section: 'CFP-RISK',
    title: 'Life Insurance Policy Provisions',
    description: 'Explain standard policy provisions, settlement options, and tax treatment of life insurance',
    order: 6,
    duration: 30,
    difficulty: 'intermediate',
    topics: [
      'Explain standard policy provisions',
      'Understand settlement options',
      'Apply beneficiary designation rules',
      'Identify tax treatment of life insurance'
    ],
    blueprintArea: 'RIS-2',
    content: {
      sections: [
        {
          title: 'Standard Policy Provisions',
          type: 'list',
          items: [
            'Grace Period: 30-31 days after premium due; policy remains in force; late payment accepted without evidence',
            'Incontestability Clause: After 2 years in force, insurer cannot contest based on misrepresentation (except fraud in some states)',
            'Suicide Clause: No death benefit if suicide within 2 years; return of premiums only; after 2 years, suicide covered',
            'Free Look Period: 10-30 days after delivery; full refund of premium; no questions asked'
          ]
        },
        {
          title: 'Misstatement of Age/Gender',
          type: 'text',
          content: 'If age or gender is misstated, the death benefit is adjusted. Formula: Adjusted DB = (Premium Paid ÷ Correct Premium) × Original DB. The benefit is recalculated to what the premium would have purchased at the correct age/gender.'
        },
        {
          title: 'Policy Ownership Rights',
          type: 'list',
          items: [
            'Policy owner has all rights: Change beneficiary, Assign policy, Surrender for cash, Take loans',
            'Owner ≠ Insured considerations: Estate taxes if owner dies first, Gift tax if policy given away'
          ]
        },
        {
          title: 'Beneficiary Designations',
          type: 'table',
          headers: ['Type', 'Description'],
          rows: [
            ['Primary Beneficiary', 'First in line for death benefit'],
            ['Contingent (Secondary)', 'Receives if primary predeceases'],
            ['Revocable', 'Can be changed; most common'],
            ['Irrevocable', 'Needs beneficiary consent; used in divorce/estate planning'],
            ['Per Stirpes', 'Passes to descendants'],
            ['Per Capita', 'Divides among those alive']
          ]
        },
        {
          title: 'Common Beneficiary Mistakes',
          type: 'warning',
          content: 'Avoid these common mistakes: Minor named as beneficiary (requires guardianship), Estate as beneficiary (subject to probate, creditors, taxes), Failing to update after divorce.'
        },
        {
          title: 'Settlement Options',
          type: 'list',
          items: [
            'Lump Sum: Default option; immediate payment; recipient can invest',
            'Interest Only: Principal held by insurer; interest paid periodically; principal paid at specified time or death',
            'Fixed Period: Equal payments for specified years; combines principal and interest; payments stop at period end',
            'Fixed Amount: Equal payments of specified amount; payments continue until exhausted',
            'Life Income (Annuity): Based on beneficiary\'s life expectancy'
          ]
        },
        {
          title: 'Life Income Annuity Types',
          type: 'table',
          headers: ['Type', 'Payments', 'Feature'],
          rows: [
            ['Straight life', 'For life', 'Highest payment'],
            ['Life with period certain', 'Life or minimum period', 'Guaranteed period'],
            ['Refund life', 'Life with minimum refund', 'Principal returned'],
            ['Joint and survivor', 'Two lives', 'Lower payments']
          ]
        },
        {
          title: 'Death Benefit Tax Treatment',
          type: 'text',
          content: 'Death benefits are generally income tax-free under IRC §101. Exceptions: Transfer for value (death benefit loses income tax exclusion, gain is taxable), Interest on delayed payments.'
        },
        {
          title: 'Transfer for Value Exceptions',
          type: 'list',
          items: [
            'Transfers allowed without triggering tax: To the insured, To partner of insured, To corporation where insured is shareholder, To trust of insured, With carryover basis (gift)'
          ]
        },
        {
          title: 'Cash Value Tax Treatment',
          type: 'list',
          items: [
            'Accumulation is tax-deferred',
            'Loans are not taxable (if policy remains in force)',
            'Withdrawals: FIFO (basis first, then gain)',
            'Surrender: Gain taxable as ordinary income'
          ]
        },
        {
          title: 'MEC Rules (Modified Endowment Contract)',
          type: 'callout',
          content: 'A policy fails the 7-pay test when premiums exceed the level annual premium to pay up in 7 years. MEC consequences: Loans/withdrawals taxed LIFO (gain first) and 10% penalty if under 59½.'
        },
        {
          title: 'Estate Tax Treatment',
          type: 'text',
          content: 'Proceeds are included in estate if: Owned by deceased, Deceased had "incidents of ownership", or Payable to estate. Solution: ILIT (Irrevocable Life Insurance Trust) - Trust owns policy, proceeds excluded from estate, 3-year lookback on transfers.'
        },
        {
          title: 'Exam Tip: 2-2-30 Timing',
          type: 'warning',
          content: 'Remember 2-2-30 for policy timing: 2 years incontestability, 2 years suicide clause, 30 days grace period.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Incontestability clause prevents challenges after 2 years (except fraud)',
            'Death benefits are income tax-free unless transfer for value applies',
            'Cash value grows tax-deferred; withdrawals are FIFO (basis first)',
            'MECs use LIFO taxation with 10% penalty before 59½',
            'ILITs remove life insurance from taxable estate'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-RIS-L007',
    courseId: 'cfp',
    section: 'CFP-RISK',
    title: 'Business Uses of Life Insurance',
    description: 'Apply key person insurance and buy-sell funding concepts with life insurance',
    order: 7,
    duration: 25,
    difficulty: 'advanced',
    topics: [
      'Apply key person insurance concepts',
      'Structure buy-sell funding with life insurance',
      'Understand executive benefit arrangements',
      'Distinguish business versus personal insurance uses'
    ],
    blueprintArea: 'RIS-2',
    content: {
      sections: [
        {
          title: 'Key Person Insurance',
          type: 'text',
          content: 'Key person insurance protects the business from financial loss due to death of a key employee. Key persons include: owner/major shareholder, top salesperson, technical expert, key manager/executive. Structure: Business owns and pays premium, business is beneficiary.'
        },
        {
          title: 'Key Person Insurance Uses',
          type: 'list',
          items: [
            'Recruit/train replacement',
            'Cover lost revenue',
            'Reassure creditors/customers',
            'Pay off debts'
          ]
        },
        {
          title: 'Key Person Valuation Methods',
          type: 'list',
          items: [
            'Multiple of compensation (5-10x salary)',
            'Contribution to profits (PV of profit attributable to key person)',
            'Replacement cost (hiring/training new person)'
          ]
        },
        {
          title: 'Buy-Sell Agreements',
          type: 'callout',
          content: 'Buy-sell agreements establish a binding arrangement for business interest transfer at death/disability. When funded with life insurance: Provides immediate liquidity, guaranteed funds at death, predetermined amount.'
        },
        {
          title: 'Cross-Purchase Agreement',
          type: 'text',
          content: 'Structure: Each owner buys insurance on each other owner. Example with 3 equal owners: Owner A buys on B and C, Owner B buys on A and C, Owner C buys on A and B = 6 total policies. Formula: Policies = n × (n-1).'
        },
        {
          title: 'Cross-Purchase Tax Results',
          type: 'list',
          items: [
            'Premiums: Not deductible',
            'Proceeds: Income tax-free',
            'Purchasers: Get stepped-up basis'
          ]
        },
        {
          title: 'Entity Purchase (Stock Redemption)',
          type: 'text',
          content: 'Structure: Business buys insurance on each owner. Example with 3 owners: Company buys on A, B, and C = 3 total policies. Tax results: Premiums not deductible, proceeds generally income tax-free, may trigger corporate AMT, no basis step-up for remaining owners.'
        },
        {
          title: 'Cross-Purchase vs Entity Purchase',
          type: 'table',
          headers: ['Feature', 'Cross-Purchase', 'Entity Purchase'],
          rows: [
            ['Number of policies', 'n × (n-1)', 'n'],
            ['Premium payer', 'Each owner', 'Company'],
            ['Basis step-up', 'Yes', 'No'],
            ['Complexity', 'Higher', 'Lower'],
            ['Large groups?', 'Difficult', 'Easier']
          ]
        },
        {
          title: 'Wait-and-See (Hybrid) Approach',
          type: 'text',
          content: 'Company buys policies, and at death, parties choose entity or cross-purchase. This provides flexibility to optimize at the time of the event.'
        },
        {
          title: 'Split-Dollar Life Insurance',
          type: 'list',
          items: [
            'Purpose: Share cost and benefits of life insurance between employer and employee',
            'Endorsement Method: Employer owns policy, endorses death benefit to employee\'s beneficiary, employer recovers premiums at death or termination',
            'Collateral Assignment Method: Employee owns policy, assigns portion to employer as collateral, employer receives collateral amount at death',
            'Post-2003 Tax Treatment: Economic benefit regime (taxable benefit to employee) or Loan regime (treated as loan with AFR interest)'
          ]
        },
        {
          title: 'Executive Bonus (Section 162)',
          type: 'text',
          content: 'Structure: Employer pays bonus, employee uses bonus to pay premium on policy, employee owns policy. Tax treatment: Bonus deductible to employer, taxable income to employee. Can "double bonus" to cover taxes.'
        },
        {
          title: 'Business Life Insurance Taxation Summary',
          type: 'table',
          headers: ['Arrangement', 'Premium', 'Death Benefit'],
          rows: [
            ['Key Person', 'Not deductible', 'Tax-free'],
            ['Cross-Purchase', 'Not deductible', 'Tax-free'],
            ['Entity Purchase', 'Not deductible', 'Tax-free (AMT possible)'],
            ['Split-Dollar', 'Complex', 'Complex'],
            ['Section 162', 'Deductible', 'Tax-free']
          ]
        },
        {
          title: 'Exam Tip: CARES Mnemonic',
          type: 'warning',
          content: 'Business Life Insurance Uses: Cross-purchase, Attract/retain, Redemption (entity), Executive benefits, Split-dollar.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Key person insurance protects business from loss of essential employees',
            'Cross-purchase provides basis step-up but requires more policies',
            'Entity purchase is simpler but no basis step-up for survivors',
            'Split-dollar splits costs and benefits between employer and employee',
            'Section 162 bonus uses deductible compensation to fund employee-owned insurance'
          ]
        }
      ]
    }
  }
];

export default CFP_RIS2_LESSONS;
