/**
 * CFP Estate Planning Lessons - Wealth Transfer Strategies
 * Domain 7: Estate Planning (12% of exam)
 * Blueprint Area: EST-3 - Wealth Transfer and Business Succession
 * 
 * Topics: Advanced techniques, GRATs, business succession, family planning
 */

import type { Lesson } from '../../../types';

export const CFP_EST3_LESSONS: Lesson[] = [
  {
    id: 'CFP-EST-L009',
    courseId: 'cfp',
    section: 'CFP-EST',
    title: 'Wealth Transfer Techniques',
    description: 'Understand GRATs and their tax advantages, explain installment sales to IDGTs, apply QPRTs for residence transfers, and compare freeze techniques.',
    order: 9,
    duration: 40,
    difficulty: 'advanced',
    topics: [
      'GRATs and tax advantages',
      'Installment sales to IDGTs',
      'QPRTs for residence transfers',
      'Freeze technique comparison'
    ],
    blueprintArea: 'EST-3',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Advanced wealth transfer techniques allow clients to transfer appreciating assets to the next generation at reduced gift tax cost. These strategies leverage the difference between actual growth and IRS-assumed growth rates.'
        },
        {
          title: 'Grantor Retained Annuity Trust (GRAT)',
          type: 'text',
          content: 'How GRATs Work:\n1. Grantor transfers assets to irrevocable trust\n2. Grantor receives fixed annuity payments for term\n3. At term end, remainder passes to beneficiaries (or trust)\n4. Gift value = Transfer value - Present value of retained annuity'
        },
        {
          title: 'GRAT Calculation',
          type: 'text',
          content: 'Taxable Gift = FMV of Assets - PV of Annuity Stream\n\nZeroed-Out GRAT: Annuity set so taxable gift = approximately $0. Uses IRC §7520 rate (120% of mid-term AFR). If assets grow faster than 7520 rate, excess passes gift-tax-free.'
        },
        {
          title: 'GRAT Example',
          type: 'table',
          headers: ['Element', 'Value'],
          rows: [
            ['Assets transferred', '$5,000,000'],
            ['Term', '5 years'],
            ['Annuity', '$1,100,000/year'],
            ['7520 rate', '5%'],
            ['PV of annuities', '≈$4,900,000'],
            ['Taxable gift', '≈$100,000']
          ]
        },
        {
          title: 'GRAT Success',
          type: 'callout',
          content: 'If assets grow at 10% (vs. 5% assumed rate): After 5 years of annuities and growth, ~$2M+ passes to beneficiaries tax-free!'
        },
        {
          title: 'GRAT Risks',
          type: 'warning',
          content: 'Grantor must survive the term (mortality risk). No estate tax benefit if dies during term—assets return to estate. Rolling GRATs (multiple short-term 2-year GRATs) mitigate mortality risk by capturing appreciation in each period.'
        },
        {
          title: 'Qualified Personal Residence Trust (QPRT)',
          type: 'text',
          content: 'Purpose: Transfer residence at reduced gift tax value while continuing to live there.\n\nHow It Works:\n1. Transfer home to irrevocable trust\n2. Reserve right to live in home for term of years\n3. At term end, home passes to beneficiaries\n4. Gift value = Home value - PV of retained use\n\nBenefits: Significant gift tax discount (20-70% depending on term/age); removes appreciation from estate; continue living in home during trust term.\n\nPost-Term Options: Move out (property belongs to beneficiaries); rent at fair market rate (additional estate reduction); beneficiaries can allow continued residence.'
        },
        {
          title: 'QPRT Mortality Risk',
          type: 'warning',
          content: 'If grantor dies during term: Full FMV included in gross estate; no benefit achieved (but no worse off than not doing the QPRT).'
        },
        {
          title: 'Installment Sales to IDGTs',
          type: 'text',
          content: 'Concept: Sell appreciating assets to grantor trust in exchange for installment note.\n\nWhy "Intentionally Defective"? Trust is "defective" for income tax (grantor pays tax) but complete for gift/estate tax (assets removed from estate).\n\nBenefits:\n1. No gain recognized on sale (sale to self for income tax)\n2. Interest payments are not income to grantor\n3. Appreciation shifts to beneficiaries\n4. Grantor paying income tax = additional gift without gift tax'
        },
        {
          title: 'IDGT Structure',
          type: 'text',
          content: 'Structure:\n1. Create IDGT, seed with gift (10% of sale value)\n2. Sell asset to trust for installment note (AFR interest)\n3. Trust pays principal + interest over term\n4. Asset appreciates inside trust; appreciation avoids transfer tax'
        },
        {
          title: 'IDGT Example',
          type: 'table',
          headers: ['Element', 'Amount'],
          rows: [
            ['Asset value', '$10,000,000'],
            ['Seed gift', '$1,000,000'],
            ['Sale to IDGT', '$9,000,000'],
            ['Note term', '9 years'],
            ['AFR rate', '4%'],
            ['Annual payment', '~$1,300,000']
          ]
        },
        {
          title: 'IDGT Result',
          type: 'callout',
          content: 'If asset grows 8%, trust keeps excess appreciation (~$4M over term) tax-free!'
        },
        {
          title: 'Family Limited Partnerships (FLPs)',
          type: 'text',
          content: 'Structure: Parents contribute assets to partnership; parents retain general partner interest (1-2%); children receive limited partner interests (gift/sale).\n\nBenefits:\n1. Valuation discounts (minority, marketability)\n2. Control retained through GP interest\n3. Creditor protection for limited partners\n4. Wealth shift through discounted gifts\n\nLegitimate Purposes: Consolidated management; asset protection; family governance; intergenerational business succession.'
        },
        {
          title: 'Exam Warning',
          type: 'warning',
          content: 'IRS Scrutiny of FLPs: Must have legitimate non-tax business purpose; must observe formalities; cannot retain too much control; death-bed transfers are problematic.'
        },
        {
          title: 'Technique Comparison',
          type: 'table',
          headers: ['Technique', 'Best For', 'Key Risk'],
          rows: [
            ['GRAT', 'Appreciating assets', 'Mortality during term'],
            ['QPRT', 'Personal residence', 'Mortality; must pay rent after'],
            ['IDGT Sale', 'Income-producing assets', 'Note must be repaid'],
            ['FLP', 'Closely-held assets', 'IRS challenge; business purposes']
          ]
        },
        {
          title: 'Mnemonic: GIFT',
          type: 'callout',
          content: 'Wealth Transfer Techniques: GRATs, IDGTs, FLPs, Trusts (QPRTs)'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'GRATs transfer appreciation above 7520 rate tax-free',
            'Zeroed-out GRATs have minimal gift tax cost',
            'QPRTs transfer residence at substantial discount',
            'IDGT sales freeze value while shifting appreciation',
            'FLPs combine control retention with valuation discounts'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-EST-L010',
    courseId: 'cfp',
    section: 'CFP-EST',
    title: 'Business Succession Planning',
    description: 'Identify business succession options, understand buy-sell agreements, and apply IRC §303 and §6166 provisions.',
    order: 10,
    duration: 35,
    difficulty: 'advanced',
    topics: [
      'Business succession options',
      'Buy-sell agreements',
      'IRC §303 and §6166 provisions',
      'Family business transitions'
    ],
    blueprintArea: 'EST-3',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Business succession planning ensures smooth ownership transitions at death, disability, or retirement. Proper planning protects business value and family wealth.'
        },
        {
          title: 'Internal Succession Options',
          type: 'text',
          content: 'Family Transfer: Gifts (annual exclusion, exemption); sales (installment, IDGT); bequests (estate plan).\n\nManagement/Employee Buyout: Key employees purchase business; often structured with seller financing; ESOP (Employee Stock Ownership Plan).'
        },
        {
          title: 'External Succession Options',
          type: 'text',
          content: 'Third-Party Sale: Strategic buyer (competitor, industry player); financial buyer (private equity); highest value but loss of legacy.\n\nMerger: Combine with complementary business; may retain some ownership/involvement.\n\nLiquidation: Wind down operations; sell assets; last resort option.'
        },
        {
          title: 'Buy-Sell Agreements',
          type: 'text',
          content: 'Purpose: Predetermined terms for ownership transfers upon triggering events.\n\nTriggering Events: Death; disability; retirement; divorce; termination of employment; bankruptcy.'
        },
        {
          title: 'Types of Buy-Sell Agreements',
          type: 'table',
          headers: ['Type', 'Description', 'Key Feature'],
          rows: [
            ['Cross-Purchase', 'Remaining owners buy interest from departing owner', 'Purchasers get stepped-up basis'],
            ['Entity Purchase (Stock Redemption)', 'Business buys back departing owner\'s interest', 'Simpler with many owners; no basis step-up'],
            ['Wait-and-See (Hybrid)', 'Allows flexibility at trigger', 'Can choose cross-purchase or redemption']
          ]
        },
        {
          title: 'Funding Buy-Sell Agreements',
          type: 'text',
          content: 'Life Insurance: Most common funding mechanism; provides immediate liquidity at death; premiums are not deductible.\n\nDisability Insurance: Funds buyout at disability; usually with installment payments.\n\nSinking Fund: Accumulate cash over time; may be insufficient at early death.'
        },
        {
          title: 'Cross-Purchase Insurance',
          type: 'callout',
          content: 'For n owners, you need n × (n-1) policies. Example: 3 equal shareholders need 6 policies—each owner buys a policy on each other owner.'
        },
        {
          title: 'Valuation Methods',
          type: 'table',
          headers: ['Method', 'Description'],
          rows: [
            ['Fixed price', 'Simple but requires updates'],
            ['Formula', 'Multiple of earnings, book value'],
            ['Appraisal', 'Independent valuation at trigger'],
            ['Combination', 'Formula with appraisal floor']
          ]
        },
        {
          title: 'IRC §303 Redemption',
          type: 'text',
          content: 'Purpose: Allow estate to redeem stock to pay death taxes and expenses without dividend treatment.\n\nRequirements:\n1. Stock value > 35% of adjusted gross estate\n2. Redemption limited to death taxes + funeral/admin expenses\n3. Must occur within Section 303 time period\n\nBenefits: Capital gain treatment (not dividend); if basis stepped up at death, little or no gain; provides liquidity without income tax.'
        },
        {
          title: '§303 Example',
          type: 'table',
          headers: ['Element', 'Value'],
          rows: [
            ['Closely-held stock', '$8,000,000'],
            ['Adjusted gross estate', '$12,000,000'],
            ['Stock/Estate ratio', '66.7% (>35% ✓)'],
            ['Estate taxes + expenses', '$1,500,000'],
            ['§303 redemption allowed', 'Up to $1,500,000'],
            ['Basis (stepped-up)', 'FMV at death'],
            ['Gain on redemption', '$0']
          ]
        },
        {
          title: 'IRC §6166 Installment Payment',
          type: 'text',
          content: 'Purpose: Allow estate to pay estate tax attributable to closely-held business over time.\n\nRequirements:\n1. Closely-held business interest > 35% of adjusted gross estate\n2. Decedent must be active in business\n3. Business must continue operating\n\nPayment Terms: 4-year deferral (interest only); 10-year installment payments; special 2% interest rate on first $750K deferred tax; regular interest on balance.\n\nBenefits: Preserves business liquidity; avoids forced sale of business; low interest rate on portion.'
        },
        {
          title: 'Exam Warning',
          type: 'warning',
          content: '§6166 Acceleration Events (full payment due): 50% or more of business sold; business income substantially reduced; missed payments.'
        },
        {
          title: 'Family Business Transition Strategies',
          type: 'list',
          items: [
            'Lifetime Transfers: Annual exclusion gifts, GRATs, IDGT sales, FLP/LLC for discounts',
            'Control Transition: Voting/non-voting structure—transfer non-voting shares (discounted), retain voting shares (control)',
            'Management Succession: Identify and develop successors; create employment agreements; establish governance structure',
            'Equalizing Estates: Life insurance for inactive children; non-business assets to inactive children; installment sale to active child'
          ]
        },
        {
          title: 'Mnemonic: CES',
          type: 'callout',
          content: 'Buy-Sell Types: Cross-purchase, Entity purchase, (Wait and) See'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Buy-sell agreements establish terms for ownership transitions',
            'Cross-purchase provides basis step-up; entity purchase is simpler',
            'IRC §303 allows stock redemption to pay estate taxes at capital gain rates',
            'IRC §6166 permits 14-year installment payment of estate taxes',
            'Voting/non-voting structures enable control retention during lifetime transfers'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-EST-L011',
    courseId: 'cfp',
    section: 'CFP-EST',
    title: 'Charitable Estate Planning',
    description: 'Integrate charitable giving with estate planning, apply charitable remainder and lead trusts, and understand private foundations vs. donor-advised funds.',
    order: 11,
    duration: 30,
    difficulty: 'advanced',
    topics: [
      'Charitable giving in estate plans',
      'Charitable remainder and lead trusts',
      'Private foundations vs. donor-advised funds',
      'Income, gift, and estate tax benefits'
    ],
    blueprintArea: 'EST-3',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Charitable estate planning combines philanthropic goals with tax benefits. Understanding charitable giving vehicles helps advisors maximize both family wealth transfer and charitable impact.'
        },
        {
          title: 'Estate Tax Charitable Deduction',
          type: 'callout',
          content: 'Unlimited deduction for bequests to charity. Reduces taxable estate dollar-for-dollar. Charity receives full amount (no estate tax).'
        },
        {
          title: 'IRD Strategy',
          type: 'text',
          content: 'Best assets to leave to charity: IRAs, 401(k)s (would be taxed as income to heirs); appreciated stock (charity avoids capital gains).\n\nStrategy: Leave IRD to charity; leave stepped-up assets to family.'
        },
        {
          title: 'Charitable Remainder Trust (CRT)',
          type: 'text',
          content: 'Structure:\n1. Donor transfers assets to irrevocable trust\n2. Donor (or others) receive income for life or term\n3. Charity receives remainder at trust termination\n\nTypes:\n• CRAT (Charitable Remainder Annuity Trust): Fixed dollar payment each year; no additional contributions; payment: 5-50% of initial value.\n• CRUT (Charitable Remainder Unitrust): Percentage of annual trust value; may allow additional contributions; payment: 5-50% of annual value.'
        },
        {
          title: 'CRT Tax Benefits',
          type: 'table',
          headers: ['Benefit', 'Explanation'],
          rows: [
            ['Income tax deduction', 'PV of remainder interest'],
            ['No capital gains', 'Trust sells asset, no gain to donor'],
            ['Estate tax reduction', 'Removes asset from estate'],
            ['Income stream', 'Payments for life or term']
          ]
        },
        {
          title: 'CRT Requirements',
          type: 'text',
          content: 'Deduction = FMV of Gift - PV of Retained Income Interest\n\nRequirements: Remainder must be at least 10% of initial value; term: life or up to 20 years; payout: 5-50% annually.'
        },
        {
          title: 'Charitable Lead Trust (CLT)',
          type: 'text',
          content: 'Structure: Income to charity for term; remainder to family.\n\nPurpose: Transfer assets to family at reduced gift/estate tax cost.\n\nTypes:\n• Grantor CLT: Immediate income tax deduction; grantor taxed on trust income annually.\n• Non-Grantor CLT: No income tax deduction; trust pays tax on income not distributed to charity.\n\nGift/Estate Tax Calculation: Taxable Gift = FMV of Assets - PV of Charity\'s Income Interest'
        },
        {
          title: 'CRT vs. CLT Comparison',
          type: 'table',
          headers: ['Feature', 'CRT', 'CLT'],
          rows: [
            ['Income stream', 'To donor/family', 'To charity'],
            ['Remainder', 'To charity', 'To family'],
            ['Income tax deduction', 'Yes (at creation)', 'Depends on type'],
            ['Estate tax benefit', 'Asset removed', 'Gift tax reduction'],
            ['Best use', 'Retirement income', 'Wealth transfer']
          ]
        },
        {
          title: 'Memory Aid',
          type: 'callout',
          content: 'CRT = Charity gets Remainder (you get income first)\nCLT = Charity Leads (charity gets income first)'
        },
        {
          title: 'Private Foundations',
          type: 'text',
          content: 'Characteristics: Separate legal entity (nonprofit); family can control and manage; make grants to charities; complex rules and excise taxes.\n\nBenefits: Family involvement in philanthropy; perpetual existence; employment for family members; control over grant-making.\n\nDrawbacks: Administrative burden; 5% annual distribution requirement; excise taxes (1.39% on investment income); lower deduction limits (30% AGI vs. 60%).'
        },
        {
          title: 'Donor-Advised Funds (DAF)',
          type: 'text',
          content: 'Characteristics: Account at public charity; immediate deduction at contribution; advise on grants (no control); no minimum distribution requirement.\n\nBenefits: Simple administration (no legal entity); full public charity deduction limits; lower costs than foundation; immediate deduction, distribute later.'
        },
        {
          title: 'DAF vs. Private Foundation',
          type: 'table',
          headers: ['Factor', 'DAF', 'Private Foundation'],
          rows: [
            ['Control', 'Advisory', 'Full control'],
            ['Deduction limit', '60% (cash)', '30% (cash)'],
            ['Admin cost', 'Low', 'High'],
            ['Minimum payout', 'None', '5%/year'],
            ['Public reporting', 'None', 'Yes (Form 990-PF)']
          ]
        },
        {
          title: 'Wealth Replacement Strategy',
          type: 'text',
          content: 'Challenge: Assets left to charity are not available for family.\n\nSolution: Wealth Replacement Trust\n1. Create ILIT (Irrevocable Life Insurance Trust)\n2. Use tax savings from charitable gift to pay premiums\n3. Insurance replaces "lost" inheritance\n4. Insurance proceeds estate-tax-free\n\nExample: Donate $1M to charity via CRT; tax savings: ~$300K; use savings to fund ILIT purchasing $1M policy; family receives same value, tax-free.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Leave IRD assets (IRAs) to charity; stepped-up assets to family',
            'CRTs provide income to donor, remainder to charity',
            'CLTs provide income to charity, remainder to family at reduced tax',
            'DAFs offer simplicity; private foundations offer control',
            'Wealth replacement trusts (ILITs) can replace charitable gifts to family'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-EST-L012',
    courseId: 'cfp',
    section: 'CFP-EST',
    title: 'Estate Planning for Special Situations',
    description: 'Plan for blended families, address non-citizen spouse issues, structure planning for minor children, and navigate domestic partner considerations.',
    order: 12,
    duration: 30,
    difficulty: 'intermediate',
    topics: [
      'Blended family planning',
      'Non-citizen spouse issues',
      'Minor children planning',
      'Domestic partner considerations'
    ],
    blueprintArea: 'EST-3',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Special situations require tailored estate planning approaches. This lesson covers common scenarios requiring specialized strategies: blended families, non-citizen spouses, minor children, and unmarried partners.'
        },
        {
          title: 'Blended Family Challenges',
          type: 'text',
          content: 'Common Challenges:\n• Competing interests (spouse vs. children from prior marriage)\n• Desire to provide for current spouse AND ensure children inherit\n• Step-children (no legal inheritance rights)\n• Potential for family conflict'
        },
        {
          title: 'QTIP Trust for Blended Families',
          type: 'callout',
          content: 'Preferred tool for blended families:\n1. Assets pass to QTIP trust at first death\n2. Surviving spouse receives all income for life\n3. At spouse\'s death, remainder passes to children from first marriage\n4. Qualifies for marital deduction'
        },
        {
          title: 'Other Blended Family Strategies',
          type: 'list',
          items: [
            'Prenuptial agreements: Define separate vs. marital property; waive elective share rights; establish inheritance expectations',
            'Life insurance: Name children as beneficiaries; separate from estate assets for spouse',
            'Separate trusts: Trust for spouse (marital trust); trust for children (family trust)'
          ]
        },
        {
          title: 'Non-Citizen Spouse Problem',
          type: 'warning',
          content: 'Marital deduction NOT available for non-citizen spouse. Concern: Spouse leaves US, takes assets beyond US tax jurisdiction.'
        },
        {
          title: 'Qualified Domestic Trust (QDOT)',
          type: 'text',
          content: 'Requirements:\n1. At least one US trustee (or US bank)\n2. Trustee must withhold estate tax on principal distributions\n3. Must meet regulatory requirements\n4. Election made on estate tax return\n\nHow It Works: Assets pass to QDOT instead of outright to spouse; marital deduction allowed for assets in QDOT; estate tax deferred until distributions from QDOT or spouse\'s death.'
        },
        {
          title: 'QDOT Taxation',
          type: 'table',
          headers: ['Event', 'Tax Treatment'],
          rows: [
            ['Income distributions', 'No additional tax'],
            ['Principal distributions', 'Estate tax (deferred) due'],
            ['Spouse\'s death', 'Tax on remaining principal'],
            ['Hardship distributions', 'May be exempt']
          ]
        },
        {
          title: 'Non-Citizen Spouse Gift Exclusion',
          type: 'callout',
          content: '$190,000 annual exclusion for gifts to non-citizen spouse (2026)—much higher than regular $19,000 exclusion.'
        },
        {
          title: 'Planning for Minor Children',
          type: 'text',
          content: 'Guardianship Designation:\n• Guardianship of Person: Who raises child; court approves, but will respects wishes; name alternates.\n• Guardianship of Property: Who manages assets for child; often separate from personal guardian.'
        },
        {
          title: 'Trusts for Minors',
          type: 'table',
          headers: ['Trust Type', 'Key Features'],
          rows: [
            ['UTMA', 'Simple custodial account; custodian manages until age 18-21; assets belong to child; no asset protection'],
            ['Section 2503(c) Trust', 'Qualifies for annual exclusion; income may be accumulated; must distribute at age 21'],
            ['Crummey Trust', 'Qualifies for annual exclusion; more flexible terms; can last beyond age 21']
          ]
        },
        {
          title: 'Age-Based Distribution Provisions',
          type: 'text',
          content: 'Common trust provisions:\n• 1/3 at age 25\n• 1/2 of remainder at age 30\n• Balance at age 35\n\nOr: Income at 25, principal at 35.\n\nIncentive Trusts: Distributions tied to behavior (matching employment income; education completion bonuses; avoiding substance abuse). Caution: Subjective criteria can create conflict.'
        },
        {
          title: 'Unmarried/Domestic Partner Challenges',
          type: 'text',
          content: 'Challenges:\n• No marital deduction\n• No automatic inheritance rights\n• Potential family conflict\n• Healthcare decision concerns'
        },
        {
          title: 'Unmarried Partner Strategies',
          type: 'list',
          items: [
            'Wills and trusts essential: Cannot rely on intestacy; must explicitly name partner; consider family challenge risk',
            'Beneficiary designations: Update retirement accounts; update life insurance; most reliable transfer method',
            'Healthcare documents: Healthcare proxy critical; hospital visitation authorization; HIPAA authorization',
            'Property ownership: Joint tenancy with right of survivorship; community property (if applicable)'
          ]
        },
        {
          title: 'Same-Sex Marriage',
          type: 'callout',
          content: 'Post-Obergefell: Legal marriage = full marital benefits including marital deduction, unlimited gifts, portability. Same planning as opposite-sex couples.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'QTIP trusts balance spouse and children interests in blended families',
            'QDOTs allow marital deduction deferral for non-citizen spouses',
            'Minor children need guardianship designations and structured trusts',
            'Unmarried partners must explicitly plan—no automatic inheritance',
            'Section 2503(c) and Crummey trusts qualify minor gifts for annual exclusion'
          ]
        }
      ]
    }
  }
];

export default CFP_EST3_LESSONS;
