/**
 * CFP Estate Planning Lessons - Gift and Estate Taxation
 * Domain 7: Estate Planning (12% of exam)
 * Blueprint Area: EST-2 - Gift and Estate Taxation
 * 
 * Topics: Gift tax, estate tax, GSTT, valuation, marital/charitable deductions
 */

import type { Lesson } from '../../../types';

export const CFP_EST2_LESSONS: Lesson[] = [
  {
    id: 'CFP-EST-L005',
    courseId: 'cfp',
    section: 'CFP-EST',
    title: 'Gift Tax Fundamentals',
    description: 'Understand the gift tax annual exclusion, calculate taxable gifts, apply gift-splitting rules, and identify gift tax exclusions.',
    order: 5,
    duration: 35,
    difficulty: 'intermediate',
    topics: [
      'Gift tax annual exclusion',
      'Calculating taxable gifts',
      'Gift-splitting rules',
      'Gift tax exclusions and deductions'
    ],
    blueprintArea: 'EST-2',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'The gift tax exists to prevent avoidance of estate tax through lifetime transfers. A gift is a transfer of property where full consideration is not received in return. Understanding gift tax rules is essential for effective wealth transfer planning.'
        },
        {
          title: 'Annual Exclusion (2026)',
          type: 'callout',
          content: '$19,000 per donee per year. Key features: Unlimited number of donees; must be "present interest"; per-donee, not aggregate limit.'
        },
        {
          title: 'Gift Splitting Example',
          type: 'text',
          content: 'Married couple with 3 children:\n2 donors × 3 donees × $19,000 = $114,000/year can be transferred gift-tax-free.\n\nGift splitting allows married couples to treat each gift as made half by each spouse. Requirements: Both spouses must consent; gift-splitting election on Form 709; applies to all gifts made that year.\n\nExample: Wife gives $38,000 to son. With gift-splitting:\n• Wife: $19,000 (her half) ✓ Covered by exclusion\n• Husband: $19,000 (his half) ✓ Covered by exclusion\n• No taxable gift!'
        },
        {
          title: 'Present vs. Future Interest',
          type: 'text',
          content: 'Present Interest (Qualifies for Annual Exclusion): Immediate right to use, possess, or enjoy; unrestricted access to gift.\n\nFuture Interest (No Annual Exclusion): Right to use property comes later; most trust gifts are future interests.'
        },
        {
          title: 'Crummey Powers',
          type: 'callout',
          content: 'Crummey powers convert future interest to present interest for annual exclusion. How it works:\n1. Gift made to trust\n2. Beneficiary notified of withdrawal right (typically 30-60 days)\n3. Beneficiary allows right to lapse\n4. Gift qualifies for annual exclusion'
        },
        {
          title: 'Unlimited Exclusions (Not Subject to Gift Tax)',
          type: 'table',
          headers: ['Type', 'Description'],
          rows: [
            ['Tuition', 'Paid directly to educational institution'],
            ['Medical', 'Paid directly to medical provider'],
            ['Spouse', 'Unlimited marital deduction (if US citizen)'],
            ['Charity', 'Unlimited charitable deduction'],
            ['Political', 'Political organizations']
          ]
        },
        {
          title: 'Exam Warning',
          type: 'warning',
          content: 'Direct Payment Requirement: Tuition and medical payments must be made directly to the provider—not to the student/patient. Paying $50,000 tuition directly to Harvard: No gift tax ✓. Giving grandson $50,000 to pay his tuition: Taxable gift!'
        },
        {
          title: 'Calculating Taxable Gifts Formula',
          type: 'text',
          content: 'Taxable Gifts = Total Gifts - Annual Exclusions - Marital Deduction - Charitable Deduction'
        },
        {
          title: 'Example Calculation',
          type: 'table',
          headers: ['Gift', 'Amount', 'Exclusion/Deduction', 'Taxable'],
          rows: [
            ['Son', '$30,000', '$19,000 annual', '$11,000'],
            ['College (direct)', '$50,000', 'Unlimited education', '$0'],
            ['Wife', '$20,000', 'Unlimited marital', '$0'],
            ['Charity', '$25,000', 'Unlimited charitable', '$0'],
            ['TOTAL', '', '', '$11,000']
          ]
        },
        {
          title: 'Lifetime Gift Tax Exemption',
          type: 'text',
          content: 'Unified Credit (2026): $7.0 Million (TCJA sunset reduced from ~$13.6M). Same exemption for gifts and estate; lifetime gifts reduce estate exemption; gift tax rate: 40%.'
        },
        {
          title: 'Why Give During Life?',
          type: 'list',
          items: [
            'Remove future appreciation from estate',
            'Use annual exclusions ($19,000/year/person)',
            'Leverage valuation discounts',
            'Pay tax on tax-exclusive basis'
          ]
        },
        {
          title: 'Tax-Exclusive vs. Tax-Inclusive',
          type: 'text',
          content: 'Gift Tax (Tax-Exclusive): Tax paid on amount transferred only; gift tax paid by donor is removed from estate.\n\nEstate Tax (Tax-Inclusive): Tax calculated on assets including tax payment; more expensive than gift tax.\n\nExample: Transfer $1M at 40% rate:\n• Gift: Pay $400,000 tax, $1M transfers (donor pays tax from other assets)\n• Estate: $1.4M needed to transfer $1M after 40% tax'
        },
        {
          title: 'Mnemonic: TEMP',
          type: 'callout',
          content: 'Unlimited Gift Exclusions: Tuition (direct), Education medical (direct), Marital, Political/charities'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Annual exclusion is $19,000/donee (2026) for present interest gifts',
            'Gift splitting doubles the annual exclusion for married couples',
            'Tuition and medical paid directly to providers are unlimited exclusions',
            'Crummey powers convert trust gifts to present interests',
            'Gift tax is "tax-exclusive" making it more efficient than estate tax'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-EST-L006',
    courseId: 'cfp',
    section: 'CFP-EST',
    title: 'Estate Tax Calculation',
    description: 'Calculate the gross estate, identify available deductions, apply the unified credit, and understand portability.',
    order: 6,
    duration: 40,
    difficulty: 'intermediate',
    topics: [
      'Gross estate calculation',
      'Estate tax deductions',
      'Unified credit application',
      'Portability of unused exemption'
    ],
    blueprintArea: 'EST-2',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Estate tax applies to the value of a decedent\'s taxable estate above the exemption amount. Understanding what\'s included in the gross estate, available deductions, and the unified credit system is essential for CFP professionals.'
        },
        {
          title: 'Gross Estate Rule',
          type: 'callout',
          content: 'General Rule (IRC §2033-2044): Include all property in which decedent had an interest at death.'
        },
        {
          title: 'Gross Estate Components',
          type: 'table',
          headers: ['Category', 'Examples', 'IRC Section'],
          rows: [
            ['Owned Property', 'Real estate, stocks, bank accounts', '§2033'],
            ['Life Insurance', 'Incidents of ownership or payable to estate', '§2042'],
            ['Annuities', 'Survivor benefits', '§2039'],
            ['Joint Property', 'JTWROS (portion included)', '§2040'],
            ['Revocable Trusts', 'Assets in revocable trust', '§2038'],
            ['Powers of Appointment', 'General powers', '§2041'],
            ['Transfers with Retained Interest', 'GRATs, retained life estates', '§2036-2038'],
            ['Prior Taxable Gifts', 'Gifts in last 3 years (insurance)', '§2035']
          ]
        },
        {
          title: 'Life Insurance Rules (§2042)',
          type: 'text',
          content: 'Life insurance is included if decedent:\n• Had "incidents of ownership" (ability to change beneficiary, borrow, etc.)\n• Policy payable to estate\n• Transferred policy within 3 years of death'
        },
        {
          title: 'Joint Tenancy (§2040)',
          type: 'text',
          content: 'Between spouses: 50% included regardless of contribution.\nBetween non-spouses: Proportionate to contribution (burden on estate to prove).'
        },
        {
          title: 'Estate Tax Deductions',
          type: 'text',
          content: 'Marital Deduction (Unlimited): Property passing to surviving US citizen spouse; must be included in gross estate; must pass to spouse (outright or qualifying trust).\n\nQualifying Trusts: QTIP, GPOA trust, Estate trust.\n\nCharitable Deduction (Unlimited): Property passing to qualified charities.\n\nDebts, Expenses, Losses: Mortgages and debts; funeral expenses; administrative costs; casualty/theft losses.\n\nState Death Taxes: Deduction for state estate or inheritance taxes paid.'
        },
        {
          title: 'Estate Tax Calculation Formula',
          type: 'text',
          content: 'Tentative Tax Base = Gross Estate - Deductions + Adjusted Taxable Gifts\n\nEstate Tax = Tentative Tax - Credits'
        },
        {
          title: 'Unified Credit (2026)',
          type: 'callout',
          content: 'Exempts $7.0 million from estate/gift tax (TCJA sunset). Credit amount: ~$2,725,800 (40% of $7.0M). Reduced by gift tax credits used during life.'
        },
        {
          title: 'Example Estate Tax Calculation',
          type: 'table',
          headers: ['Step', 'Amount'],
          rows: [
            ['Gross Estate', '$16,000,000'],
            ['Less: Marital', '($5,000,000)'],
            ['Less: Charitable', '($1,000,000)'],
            ['Less: Debts/expenses', '($500,000)'],
            ['Taxable Estate', '$9,500,000'],
            ['Plus: Adjusted Taxable Gifts', '$1,000,000'],
            ['Tentative Tax Base', '$10,500,000'],
            ['Tentative Tax (40%)', '$4,200,000'],
            ['Less: Unified Credit', '($2,725,800)'],
            ['Estate Tax Due', '$1,474,200']
          ]
        },
        {
          title: 'Portability: Deceased Spousal Unused Exclusion (DSUE)',
          type: 'text',
          content: 'Concept: Surviving spouse can use deceased spouse\'s unused exemption.\n\nRequirements:\n• Must file estate tax return (Form 706)\n• Election must be timely made\n• Surviving spouse must be US citizen\n\nExample:\n• Husband dies with $5M estate, $7.0M exemption\n• Unused: $7.0M - $5M = $2.0M\n• Wife\'s new exemption: $7.0M + $2.0M = $9.0M'
        },
        {
          title: 'Exam Warning',
          type: 'warning',
          content: 'Portability Limitations: Only available from last deceased spouse; does NOT apply to GST exemption; must file Form 706 return even if no tax due to preserve portability.'
        },
        {
          title: 'State Estate/Inheritance Taxes',
          type: 'text',
          content: 'Estate Tax: Tax on the estate (transferor pays).\nInheritance Tax: Tax on beneficiary (recipient pays).\n\nMany states have lower exemptions than federal: Massachusetts ($2M), Oregon ($1M), New York ($6.94M with cliff).\n\nPlanning Consideration: Federal exemption may shelter estate, but state tax can still apply.'
        },
        {
          title: 'Mnemonic: MCE',
          type: 'callout',
          content: 'Estate Deductions: Marital, Charitable, Expenses/debts'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Gross estate includes all property with incidents of ownership',
            'Marital and charitable deductions are unlimited',
            'Unified credit exempts $7.0M (2026 - TCJA sunset) from estate tax',
            'Portability allows surviving spouse to use deceased spouse\'s unused exemption',
            'State estate taxes may apply even when no federal tax is due'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-EST-L007',
    courseId: 'cfp',
    section: 'CFP-EST',
    title: 'Generation-Skipping Transfer Tax',
    description: 'Understand the purpose of GSTT, identify skip persons and taxable transfers, and apply the GST exemption.',
    order: 7,
    duration: 30,
    difficulty: 'advanced',
    topics: [
      'Purpose of GSTT',
      'Skip persons and taxable transfers',
      'GST exemption application',
      'GSTT planning opportunities'
    ],
    blueprintArea: 'EST-2',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'The Generation-Skipping Transfer Tax (GSTT) prevents wealth from skipping generations and avoiding estate tax at each level. Without GSTT, a grandparent could transfer to grandchildren and bypass estate tax at the parent\'s generation.'
        },
        {
          title: 'GSTT Rate',
          type: 'callout',
          content: '40% flat rate—applied IN ADDITION to gift or estate tax. This makes GSTT one of the most punitive taxes in the code.'
        },
        {
          title: 'Skip Person Definition',
          type: 'text',
          content: 'A skip person is:\n1. Two or more generations below transferor, OR\n2. A trust with only skip person beneficiaries\n\nSkip Persons include: Grandchildren (if parent alive or deceased); great-grandchildren; unrelated persons 37.5+ years younger.\n\nNon-Skip Persons: Children; spouse; persons within one generation.'
        },
        {
          title: 'Deceased Parent Exception',
          type: 'callout',
          content: 'If a grandchild\'s parent (transferor\'s child) is deceased, the grandchild "moves up" and is NOT a skip person. This is a key exam concept.'
        },
        {
          title: 'Types of GST Transfers',
          type: 'text',
          content: 'Direct Skip: Transfer directly to skip person (gift to grandchild, bequest to grandchild). Tax paid by: Transferor (or estate).\n\nTaxable Distribution: Distribution from trust to skip person (not direct skip). Trust pays income to grandchild. Tax paid by: Distributee.\n\nTaxable Termination: Trust terminates, assets pass to skip persons. Life estate to child ends; remainder to grandchildren. Tax paid by: Trustee from trust assets.'
        },
        {
          title: 'GST Exemption (2026)',
          type: 'text',
          content: '$7.0 Million—same amount as estate/gift exemption (TCJA sunset). Key features:\n• Separate allocation from estate exemption\n• NOT portable (unlike estate exemption)\n• Can be allocated to direct skips or trusts benefiting skip persons'
        },
        {
          title: 'Inclusion Ratio Calculation',
          type: 'text',
          content: 'Inclusion Ratio = 1 - (GST Exemption Allocated ÷ Value of Transfer)\n\nApplicable Rate = Maximum Rate × Inclusion Ratio\n\nExample:\n• Transfer $5M to dynasty trust\n• Allocate $5M GST exemption\n• Inclusion ratio: 1 - ($5M/$5M) = 0\n• Applicable rate: 40% × 0 = 0%\n• Result: Trust is "GST-exempt"'
        },
        {
          title: 'GSTT Planning Strategies',
          type: 'list',
          items: [
            'Dynasty Trust: Allocate full GST exemption; trust lasts for generations; no estate tax or GSTT at each generation',
            'Annual Exclusion: Direct skip gifts qualifying for annual exclusion are also exempt from GSTT',
            'Reverse QTIP Election: Allows deceased spouse\'s executor to preserve deceased spouse\'s GST exemption'
          ]
        },
        {
          title: 'Exam Warning',
          type: 'warning',
          content: 'GSTT Traps:\n• Inadequate exemption allocation = inclusion ratio of 1 = full 40% tax\n• Non-portable exemption: GST exemption CANNOT be ported to surviving spouse\n• Trust modifications may trigger GSTT if beneficiaries change'
        },
        {
          title: 'Mnemonic: DDD',
          type: 'callout',
          content: 'GST Transfer Types: Direct skip, Distribution (taxable), Termination (taxable)'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'GSTT is 40% flat tax on transfers to persons 2+ generations below',
            'Skip persons include grandchildren and more remote descendants',
            'GST exemption ($7.0M) is NOT portable between spouses',
            'Deceased parent exception moves grandchild up a generation',
            'Dynasty trusts use GST exemption to avoid transfer taxes for generations'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-EST-L008',
    courseId: 'cfp',
    section: 'CFP-EST',
    title: 'Valuation and Special Techniques',
    description: 'Understand fair market value determination, apply valuation discounts, and explain special use valuation and alternate valuation.',
    order: 8,
    duration: 35,
    difficulty: 'advanced',
    topics: [
      'Fair market value determination',
      'Valuation discounts',
      'Special use valuation (2032A)',
      'Alternate valuation date election'
    ],
    blueprintArea: 'EST-2',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Valuation is critical for gift and estate tax purposes. Understanding fair market value, available discounts, and special valuation elections can significantly reduce transfer tax liability.'
        },
        {
          title: 'Fair Market Value Definition',
          type: 'callout',
          content: '"The price at which property would change hands between a willing buyer and a willing seller, neither being under any compulsion to buy or sell and both having reasonable knowledge of relevant facts."'
        },
        {
          title: 'Valuation Dates',
          type: 'text',
          content: 'Estate tax: Date of death (or alternate valuation date)\nGift tax: Date of gift'
        },
        {
          title: 'Lack of Marketability Discount',
          type: 'text',
          content: 'Reflects inability to easily sell interest in secondary market.\n\nApplies to: Closely-held business interests; private company stock; limited partnership interests.\n\nTypical Range: 15-35%'
        },
        {
          title: 'Lack of Control (Minority) Discount',
          type: 'text',
          content: 'Reflects inability to control business decisions.\n\nMinority interests cannot: Elect board members; declare dividends; sell company assets; hire/fire management.\n\nTypical Range: 15-40%'
        },
        {
          title: 'Combined Discount Example',
          type: 'table',
          headers: ['Step', 'Value'],
          rows: [
            ['Pro-rata share of business', '$1,000,000'],
            ['Minority discount (25%)', '($250,000)'],
            ['Subtotal', '$750,000'],
            ['Lack of marketability (20%)', '($150,000)'],
            ['Discounted Value', '$600,000']
          ]
        },
        {
          title: 'Tax Savings from Discounts',
          type: 'callout',
          content: 'Tax Savings at 40%: ($1M - $600K) × 40% = $160,000. Discounts must be supported by qualified appraisal meeting USPAP standards.'
        },
        {
          title: 'Special Use Valuation (IRC §2032A)',
          type: 'text',
          content: 'Purpose: Allow family farms and businesses to be valued at current use rather than highest/best use.\n\nRequirements:\n1. Property must be real property\n2. Used for farming or closely-held business\n3. Must meet percentage tests: 50% of adjusted gross estate is farm/business property; 25% is qualifying real property\n4. Decedent or family must have materially participated\n5. Property passes to qualified heirs\n6. Qualified heirs must continue qualified use for 10 years\n\nMaximum Reduction (2026): $1,440,000\n\nRecapture: If property is sold or use changes within 10 years, special use valuation recaptured with interest.'
        },
        {
          title: 'Alternate Valuation Date (IRC §2032)',
          type: 'text',
          content: 'Option: Value estate assets 6 months after death instead of date of death.\n\nRequirements:\n• Must reduce gross estate value\n• Must reduce estate tax liability\n• Election is irrevocable\n\nWhen to Use: When assets have declined in value since death.\n\nExample:\n• Date of death value: $15,000,000\n• 6-month value: $13,000,000\n• Election saves: ($15M - $13M) × 40% = $800,000\n\nNote: If property sold/distributed before 6 months, use date of disposition value.'
        },
        {
          title: 'Other Valuation Discounts',
          type: 'text',
          content: 'Blockage Discount: Large blocks of stock may depress price if sold at once. Example: 500,000 shares at $50 = $25M market value, but blockage discount of 10% = $22.5M.\n\nKey Person Discount: Value reduction when business depends heavily on a key person who died.'
        },
        {
          title: 'Valuation Planning Techniques',
          type: 'list',
          items: [
            'Freeze Techniques: Lock in current value, shift future appreciation (GRATs, IDGT sales, preferred partnership interests)',
            'Family Limited Partnerships: Transfer limited partnership interests; apply minority and marketability discounts; maintain control through general partner interest; shift appreciation to younger generations'
          ]
        },
        {
          title: 'Mnemonic: MMM',
          type: 'callout',
          content: 'Valuation Discounts: Minority, Marketability, Must be supported by appraisal'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Fair market value is the standard for gift and estate tax',
            'Minority and marketability discounts can significantly reduce taxable value',
            'Special use valuation can save up to $1.44M for farms/businesses',
            'Alternate valuation date requires both reduced value AND reduced tax',
            'Proper appraisals are essential to support claimed discounts'
          ]
        }
      ]
    }
  }
];

export default CFP_EST2_LESSONS;
