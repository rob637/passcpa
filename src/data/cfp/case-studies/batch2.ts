/**
 * CFP Case Studies - Batch 2
 * Additional case studies for comprehensive exam preparation
 */

import { CaseStudy } from '../../../types';

export const CFP_CASE_STUDIES_BATCH2: CaseStudy[] = [
  // ============================================
  // Case Study 6: Divorce Financial Planning
  // ============================================
  {
    id: 'CFP-CASE-006',
    title: 'The Hendricks Divorce: Dividing Assets and Planning Forward',
    courseId: 'cfp',
    difficulty: 'hard',
    estimatedTime: 22,
    domains: ['GEN', 'TAX', 'RET', 'INV', 'RISK'],
    scenario: `
## Client Profile: Sarah Hendricks

**Sarah Hendricks** (Age 47)
- Marketing Director at a healthcare company
- Salary: $165,000
- Currently going through divorce after 18 years of marriage
- Two children: Emma (16) and Jack (13)
- Will have primary custody (70/30 split)

**Divorce Settlement Terms (Proposed):**
- Sarah receives: Primary residence, 50% of retirement accounts, spousal support
- Spousal support: $4,000/month for 5 years (taxable as ordinary income to Sarah per pre-2019 agreement terms — divorce finalized 2018, modified 2024)
- Child support: $2,500/month until each child turns 18 (non-taxable)

**Assets to Be Divided:**
| Asset | Total Value | Sarah's Share |
|-------|-------------|---------------|
| Primary residence | $650,000 (mortgage: $180,000) | 100% |
| Ex-spouse's 401(k) | $480,000 | 50% ($240,000 via QDRO) |
| Sarah's 401(k) | $185,000 | 100% |
| Joint brokerage | $120,000 (basis: $85,000) | 50% ($60,000) |
| Ex-spouse pension | $35,000/yr at 65 | 50% via QDRO |

**Sarah's Current Benefits:**
- 401(k) with 5% match
- Group term life: 2x salary ($330,000)
- Group LTD: 60% of salary
- HSA-eligible health plan

**Liabilities:**
- Mortgage: $180,000 (3.5%, 18 years remaining, $1,450/month)
- Auto loan: $18,000 (4.9%, 3 years remaining)
- Credit cards: $8,500 (carried during divorce proceedings)

**Monthly Cash Flow (Post-Divorce):**
- Salary (net): $9,200
- Spousal support: $4,000
- Child support: $2,500
- Total inflow: $15,700
- Expenses (including mortgage, kids, debt): ~$13,500
- Discretionary: ~$2,200

**Goals:**
1. Maintain home for children's stability
2. Fund college for both children
3. Rebuild retirement savings (feels behind)
4. Update estate plan (ex-spouse currently named everywhere)
5. Ensure adequate insurance coverage as single parent

**Risk Tolerance:** Moderate (concerned about sequence of returns risk)
`,
    questions: [
      {
        id: 'CFP-CASE-006-Q1',
        domain: 'RET',
        question: 'Sarah will receive $240,000 from her ex-spouse\'s 401(k) via QDRO. If she needs $30,000 for immediate expenses, what is the tax treatment?',
        options: [
          { id: 'A', text: 'The full $30,000 is subject to ordinary income tax plus 10% early withdrawal penalty' },
          { id: 'B', text: 'The $30,000 is tax-free because it\'s a divorce settlement' },
          { id: 'C', text: 'The $30,000 is taxed as ordinary income but exempt from the 10% early withdrawal penalty' },
          { id: 'D', text: 'Only 50% of the withdrawal is taxable' }
        ],
        correctOptionId: 'C',
        explanation: `**QDRO Distribution Rules:**

When a non-participant spouse receives funds from a qualified plan via QDRO:

1. **Ordinary income tax applies** - The distribution is taxable as ordinary income

2. **10% penalty exemption** - QDRO distributions are specifically exempt from the 10% early withdrawal penalty under IRC §72(t)(2)(C)

**Important distinction:**
- This exemption ONLY applies to direct distributions from the plan
- If Sarah rolls the $240,000 to an IRA first, then withdraws, the 10% penalty WOULD apply
- The penalty exemption is for the alternate payee (Sarah) only

**Planning tip:** If Sarah needs cash, she should take the distribution directly from the 401(k) before rolling the remainder to an IRA.`
      },
      {
        id: 'CFP-CASE-006-Q2',
        domain: 'TAX',
        question: 'Sarah\'s spousal support ($4,000/month) was established in a divorce agreement finalized in 2018 and modified in 2024. The tax treatment is:',
        options: [
          { id: 'A', text: 'Tax-free to Sarah, non-deductible by ex-spouse' },
          { id: 'B', text: 'Taxable to Sarah, deductible by ex-spouse' },
          { id: 'C', text: 'Taxable to Sarah, non-deductible by ex-spouse' },
          { id: 'D', text: '50% taxable to each party' }
        ],
        correctOptionId: 'B',
        explanation: `**Alimony Tax Rules - Transition Period:**

The Tax Cuts and Jobs Act (TCJA) changed alimony taxation:

**Pre-2019 divorce agreements:**
- Alimony is deductible by payer
- Alimony is taxable income to recipient
- This treatment continues unless the agreement is MODIFIED to specifically adopt the new rules

**Post-2018 divorce agreements:**
- Alimony is NOT deductible by payer
- Alimony is NOT taxable to recipient

**Sarah's situation:**
- Original agreement: 2018 (pre-TCJA)
- Modified: 2024 (but didn't adopt new rules)
- Result: Old rules apply — taxable to Sarah, deductible by ex-spouse

The 2024 modification must explicitly state it adopts TCJA rules to change the treatment. Otherwise, pre-2019 rules continue.`
      },
      {
        id: 'CFP-CASE-006-Q3',
        domain: 'GEN',
        question: 'Sarah has $8,500 in credit card debt at 19% APR and ~$2,200/month discretionary income. What approach balances debt payoff with other goals?',
        options: [
          { id: 'A', text: 'Minimum payments only while maximizing 401(k) contributions' },
          { id: 'B', text: 'Pay off credit card aggressively (4 months), then redirect to savings' },
          { id: 'C', text: 'Balance transfer to 0% card, pay minimum, invest the difference' },
          { id: 'D', text: 'Withdraw from QDRO funds to pay off immediately' }
        ],
        correctOptionId: 'B',
        explanation: `**Debt Payoff Analysis:**

At $2,200/month discretionary:
- Pay ~$2,000/month toward credit card
- Debt paid off in ~4.5 months
- Interest saved: ~$500

**Why this is optimal:**
1. 19% APR exceeds any guaranteed investment return
2. Short payoff timeline doesn't significantly delay other goals
3. Frees up cash flow faster than balance transfer strategies
4. Avoids raiding retirement funds (QDRO withdrawal would work but depletes future)

**Balance transfer consideration:**
- Could work if she has access to 0% offer
- But the debt is small enough that aggressive payoff is cleaner
- Balance transfer fees (3-5%) reduce the benefit

After debt is paid: Redirect $2,000/month to emergency fund, then college savings.`
      },
      {
        id: 'CFP-CASE-006-Q4',
        domain: 'RISK',
        question: 'As a newly single parent with two dependents, Sarah\'s life insurance needs have changed. Her current $330,000 group coverage is:',
        options: [
          { id: 'A', text: 'Adequate—it equals 2x salary which is the standard recommendation' },
          { id: 'B', text: 'Likely inadequate—she should calculate needs based on income replacement, mortgage, and education funding' },
          { id: 'C', text: 'Excessive—child support from ex-spouse reduces her need' },
          { id: 'D', text: 'Irrelevant—group coverage is sufficient for any single parent' }
        ],
        correctOptionId: 'B',
        explanation: `**Life Insurance Needs Analysis for Sarah:**

**Income replacement (until Jack turns 18 in 5 years):**
- Net income: $9,200/month = $110,400/year
- 5 years: ~$550,000 present value

**Mortgage payoff:** $180,000

**Education funding (2 children):**
- ~$100,000 each = $200,000

**Final expenses:** $15,000

**Total need:** ~$945,000

**Current coverage:** $330,000 (shortfall: ~$615,000)

**Additional considerations:**
- Child support stops if ex-spouse dies (separate issue)
- Spousal support stops if Sarah dies (children need coverage of that income loss)
- Sarah should purchase individual term policy for ~$600,000-$700,000

Group coverage alone is almost never sufficient for a single parent with dependents and a mortgage.`
      },
      {
        id: 'CFP-CASE-006-Q5',
        domain: 'GEN',
        question: 'Sarah\'s estate plan names her ex-spouse as beneficiary on her 401(k), life insurance, and POA documents. What is the MOST urgent update?',
        options: [
          { id: 'A', text: 'Update the will first—it governs all asset distribution' },
          { id: 'B', text: 'Update beneficiary designations—they override the will for retirement accounts and insurance' },
          { id: 'C', text: 'Wait until divorce is finalized to make any changes' },
          { id: 'D', text: 'Only update POA documents since those affect incapacity' }
        ],
        correctOptionId: 'B',
        explanation: `**Beneficiary Designation Priority:**

**Critical rule:** Beneficiary designations on retirement accounts and life insurance OVERRIDE wills.

If Sarah dies with ex-spouse still named:
- 401(k) → ex-spouse (regardless of will)
- Life insurance → ex-spouse (regardless of will)
- QDRO assets → follows QDRO designation

**Urgent actions:**
1. Update 401(k) beneficiary (may need QDRO/divorce decree for some plans)
2. Update life insurance beneficiary
3. Update IRA beneficiaries
4. Then update will, POA, healthcare directive

**Note on timing:**
- Many states have laws that automatically revoke ex-spouse beneficiary upon divorce
- BUT: Relying on automatic revocation is risky
- Federal law (ERISA) may still pay to named beneficiary
- Always explicitly update designations`
      },
      {
        id: 'CFP-CASE-006-Q6',
        domain: 'RET',
        question: 'Sarah will receive 50% of her ex-spouse\'s pension ($17,500/year starting at 65) via QDRO. For retirement planning purposes, she should:',
        options: [
          { id: 'A', text: 'Include the full $17,500/year in her retirement income projection' },
          { id: 'B', text: 'Ignore it—pension benefits are unreliable' },
          { id: 'C', text: 'Include it but note it likely has no survivor benefit or COLA' },
          { id: 'D', text: 'Convert the pension to a lump sum immediately' }
        ],
        correctOptionId: 'C',
        explanation: `**Pension Division via QDRO:**

Sarah's $17,500/year pension share has key limitations:

**Typical QDRO pension terms:**
- Fixed dollar amount (no COLA adjustment)
- Single life payout (ends at ex-spouse's death OR Sarah's death)
- May be "shared payment" (Sarah only receives while ex-spouse is alive)

**Planning implications:**
1. Include in projections at nominal value
2. Assume NO inflation adjustment over 18+ years
3. Model scenario where pension stops early
4. Consider this income "at risk" and build additional savings

**Cannot convert to lump sum:**
- Most pension QDROs don't allow lump-sum payout to alternate payee
- Sarah typically must wait for ex-spouse to reach pension eligibility age

The $17,500/year is valuable but has more risk than Sarah's own 401(k).`
      }
    ],
    scoringGuide: `
## Scoring Guide

**6 correct:** Excellent - Strong divorce planning knowledge
**5 correct:** Good - Review missed concepts
**3-4 correct:** Fair - Focus on QDRO and beneficiary rules
**Below 3:** Significant review needed

## Key Divorce Planning Takeaways:
1. QDRO distributions are exempt from 10% penalty (but not income tax)
2. Pre-2019 alimony rules apply unless agreement explicitly adopts TCJA
3. Beneficiary designations override wills—update immediately
4. Single parents typically need MORE life insurance, not less
5. Pension QDROs have survivor and COLA limitations
6. High-interest debt payoff beats investing at 19% APR
`
  },
  // ============================================
  // Case Study 7: Special Needs Planning
  // ============================================
  {
    id: 'CFP-CASE-007',
    title: 'The Okonkwo Family: Special Needs Trust Planning',
    courseId: 'cfp',
    difficulty: 'hard',
    estimatedTime: 20,
    domains: ['EST', 'TAX', 'RISK', 'GEN', 'RET'],
    scenario: `
## Client Profile: The Okonkwo Family

**David Okonkwo** (Age 55)
- Pediatrician, private practice owner
- Annual income: $320,000
- Employer-sponsored retirement plan: SEP-IRA with $890,000

**Amara Okonkwo** (Age 53)
- Part-time nurse practitioner
- Annual income: $85,000
- 403(b): $210,000

**Children:**
- Chisom (Age 24): Healthy, working as an engineer, financially independent
- Adaeze (Age 21): Has Down syndrome, receives SSI ($943/month) and Medicaid
  - Lives at home, attends day program
  - Has part-time job earning $400/month (within SSI limits)
  - Will need lifelong support and care

**Assets:**
- Primary residence: $780,000 (paid off)
- Investment accounts: $450,000 (joint)
- David's SEP-IRA: $890,000
- Amara's 403(b): $210,000
- 529 plan for Chisom: $45,000 (unused)
- Life insurance: $1M term on David (15 years remaining)
- Life insurance: $500,000 term on Amara (10 years remaining)

**Estate Planning (Current):**
- Simple wills leaving everything equally to both children
- David and Amara are each other's POA
- No trusts established
- No letter of intent for Adaeze's care

**Goals:**
1. Ensure Adaeze has lifelong financial security without losing government benefits
2. Not burden Chisom with sole responsibility for Adaeze's care
3. Retire at 62 (David) and 60 (Amara) with $15,000/month income
4. Leave appropriate inheritance to both children

**Concerns:**
- How to structure inheritance for a child receiving SSI/Medicaid
- Who should serve as trustee after they're gone
- Whether to use a third-party or first-party SNT
`,
    questions: [
      {
        id: 'CFP-CASE-007-Q1',
        domain: 'EST',
        question: 'If David and Amara leave their estate equally to both children under current wills, what happens to Adaeze\'s SSI and Medicaid benefits?',
        options: [
          { id: 'A', text: 'Benefits continue because inheritance is exempt' },
          { id: 'B', text: 'Benefits are suspended until inheritance is spent down to $2,000' },
          { id: 'C', text: 'Benefits convert to a higher tier due to inheritance' },
          { id: 'D', text: 'Only SSI is affected; Medicaid continues regardless' }
        ],
        correctOptionId: 'B',
        explanation: `**SSI and Medicaid Asset Rules:**

**SSI resource limit:** $2,000 for an individual

If Adaeze inherits $500,000+ directly:
1. **SSI immediately terminates** - She exceeds the $2,000 limit
2. **Medicaid eligibility lost** - SSI and Medicaid are linked
3. **Must "spend down"** - Until assets return below $2,000
4. **Then reapply** - Process can take months

**The spend-down trap:**
- Inheritance must pay for ALL care, medical, housing
- When depleted, must reapply for benefits
- Gap in coverage can be devastating

**Solution:** Third-party Special Needs Trust (SNT)
- Assets held in trust don't count against SSI limits
- Trust can supplement (not replace) government benefits
- Adaeze maintains benefits while trust enhances quality of life`
      },
      {
        id: 'CFP-CASE-007-Q2',
        domain: 'EST',
        question: 'What type of Special Needs Trust should David and Amara establish for Adaeze?',
        options: [
          { id: 'A', text: 'First-party (d)(4)(A) SNT because Adaeze is the beneficiary' },
          { id: 'B', text: 'Third-party SNT because assets come from parents, not Adaeze' },
          { id: 'C', text: 'Pooled trust because it\'s easier to administer' },
          { id: 'D', text: 'Revocable living trust with SNT provisions' }
        ],
        correctOptionId: 'B',
        explanation: `**Special Needs Trust Types:**

**Third-Party SNT (correct for Okonkwos):**
- Funded with someone else's assets (parents, grandparents)
- NO Medicaid payback requirement at beneficiary's death
- Remainder goes to other family members
- Can be established during life or at death (testamentary)

**First-Party (d)(4)(A) SNT:**
- Funded with beneficiary's OWN assets (inheritance, settlement, etc.)
- REQUIRES Medicaid payback at death
- Used when disabled person receives direct inheritance or lawsuit settlement

**Pooled Trust (d)(4)(C):**
- Managed by nonprofit
- Good for smaller amounts or when no family trustee available
- May have Medicaid payback requirement

**Why third-party for Okonkwos:**
- Assets come from David and Amara (not Adaeze's own money)
- No Medicaid payback means remainder benefits Chisom
- Maximum flexibility for parents to control terms`
      },
      {
        id: 'CFP-CASE-007-Q3',
        domain: 'EST',
        question: 'The Okonkwos\' third-party SNT for Adaeze can pay for which of the following without affecting her SSI benefits?',
        options: [
          { id: 'A', text: 'Monthly cash allowance deposited to her checking account' },
          { id: 'B', text: 'Food and housing expenses directly' },
          { id: 'C', text: 'Vacations, recreation, electronics, and supplemental therapies paid directly to vendors' },
          { id: 'D', text: 'All of the above without any impact' }
        ],
        correctOptionId: 'C',
        explanation: `**SNT Distribution Rules (SSI impact):**

**NO SSI reduction (trust can freely pay):**
- Recreation and vacations
- Electronics, computers, phones
- Supplemental therapies not covered by Medicaid
- Entertainment, hobbies
- Vehicle (if not for shelter purposes)
- Personal care items
- Education and training

**REDUCES SSI (In-Kind Support and Maintenance):**
- Food
- Shelter/housing costs (rent, mortgage, utilities)
- If trust pays these, SSI reduced by up to 1/3 (~$314/month)

**TERMINATES SSI (direct cash):**
- Cash given directly to beneficiary counts as income
- Cannot distribute cash that Adaeze controls

**Best practice:** Pay vendors directly for permissible expenses. Never give cash. If paying housing, understand the ISM reduction trade-off.`
      },
      {
        id: 'CFP-CASE-007-Q4',
        domain: 'GEN',
        question: 'David and Amara are concerned about who will manage Adaeze\'s care after they\'re gone. What planning document addresses daily care preferences?',
        options: [
          { id: 'A', text: 'Will with detailed instructions' },
          { id: 'B', text: 'Durable power of attorney' },
          { id: 'C', text: 'Letter of intent (memorandum of intent)' },
          { id: 'D', text: 'Healthcare directive' }
        ],
        correctOptionId: 'C',
        explanation: `**Letter of Intent for Special Needs Planning:**

A Letter of Intent is a non-binding document that provides:

**Personal information:**
- Daily routines and preferences
- Favorite foods, activities, triggers
- Medical history and current medications
- Healthcare providers and contacts

**Care instructions:**
- Living situation preferences
- Employment/day program details
- Religious or cultural considerations
- Social relationships to maintain

**Why it matters:**
- Future caregivers/trustees may not know Adaeze well
- Guides decisions about quality of life
- Trustees use it to make distributions appropriately
- Should be updated regularly as needs change

**Legal status:**
- Not legally binding (unlike will or trust)
- But critically important for continuity of care
- Often referenced by guardian and trustee`
      },
      {
        id: 'CFP-CASE-007-Q5',
        domain: 'RET',
        question: 'David\'s SEP-IRA ($890,000) could fund Adaeze\'s SNT after his death. If the SNT is named as beneficiary, the distribution rules are:',
        options: [
          { id: 'A', text: '10-year rule applies—SNT must distribute all funds within 10 years' },
          { id: 'B', text: 'Eligible Designated Beneficiary rules allow stretch over Adaeze\'s life expectancy' },
          { id: 'C', text: 'Required minimum distributions begin immediately at 10% per year' },
          { id: 'D', text: 'IRA must be fully distributed within 5 years' }
        ],
        correctOptionId: 'B',
        explanation: `**SECURE Act and Disabled Beneficiaries:**

Under the SECURE Act (2019), most beneficiaries face the 10-year rule. However, **Eligible Designated Beneficiaries (EDBs)** can still stretch:

**EDB categories:**
1. Surviving spouse
2. Minor children (until majority)
3. **Disabled individuals**
4. Chronically ill individuals
5. Beneficiaries not more than 10 years younger than deceased

**Adaeze qualifies as disabled:**
- Can stretch IRA distributions over her life expectancy
- SNT must be properly structured as "see-through" trust
- Trust must meet conduit or accumulation trust rules

**Requirements for SNT as IRA beneficiary:**
- Trust is irrevocable at death
- Trust beneficiaries are identifiable
- Trust document provided to plan custodian
- Disabled beneficiary properly documented

This preserves tax-deferred growth much longer than 10-year rule.`
      },
      {
        id: 'CFP-CASE-007-Q6',
        domain: 'RISK',
        question: 'Adaeze currently receives Medicaid which covers most medical needs. What type of insurance should the Okonkwos consider for Adaeze\'s future?',
        options: [
          { id: 'A', text: 'Comprehensive health insurance to replace Medicaid' },
          { id: 'B', text: 'Long-term care insurance for future nursing home needs' },
          { id: 'C', text: 'ABLE account contributions for future qualified disability expenses' },
          { id: 'D', text: 'No additional insurance needed—Medicaid provides complete coverage' }
        ],
        correctOptionId: 'C',
        explanation: `**ABLE Accounts for Special Needs Planning:**

ABLE (Achieving a Better Life Experience) accounts offer:

**Tax advantages:**
- Tax-free growth
- Tax-free withdrawals for qualified disability expenses
- State tax deduction in some states

**SSI-friendly:**
- First $100,000 doesn't count against SSI resource limit
- Amounts over $100,000 suspend (not terminate) SSI
- Medicaid eligibility maintained regardless of balance

**Qualified expenses:**
- Housing, transportation, education
- Health and wellness
- Assistive technology
- Financial management

**Contribution limit:** $18,000/year (2024), plus earned income bonus if employed

**Why for Adaeze:**
- Supplements SNT with more flexible access
- Can be used for expenses that might cause ISM reduction if paid by SNT
- Adaeze can control her own ABLE account
- Parents, grandparents, others can contribute`
      }
    ],
    scoringGuide: `
## Scoring Guide

**6 correct:** Excellent - Strong special needs planning knowledge
**5 correct:** Good - Review missed concepts
**3-4 correct:** Fair - Focus on SNT rules and benefit preservation
**Below 3:** Significant review needed

## Key Special Needs Planning Takeaways:
1. Direct inheritance terminates SSI/Medicaid
2. Third-party SNT: funded by others, no payback
3. First-party SNT: funded by beneficiary, Medicaid payback required
4. SNT can pay supplemental expenses, but food/shelter reduces SSI
5. Letter of Intent guides future caregivers
6. Disabled beneficiaries can still stretch inherited IRAs
7. ABLE accounts supplement SNT with more flexibility
`
  }
];

export default CFP_CASE_STUDIES_BATCH2;
