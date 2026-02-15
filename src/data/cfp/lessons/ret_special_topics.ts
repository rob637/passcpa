/**
 * CFP Domain 6: Retirement Savings and Income Planning
 * Area RET-5: Special Retirement Topics
 * 
 * These lessons cover inherited IRAs, divorce, NUA,
 * and special distribution rules under SECURE Act.
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_RET5_LESSONS: CFPLesson[] = [
  {
    id: "CFP-RET-L017",
    domain: "CFP-RET",
    blueprintArea: "RET-5",
    title: "Inherited IRAs and SECURE Act Rules",
    order: 17,
    duration: 55,
    objectives: [
      "Apply the 10-year rule for inherited IRAs",
      "Identify eligible designated beneficiaries",
      "Calculate RMDs for inherited accounts",
      "Compare pre-SECURE and post-SECURE inheritance rules"
    ],
    content: `
# Inherited IRAs and SECURE Act Rules

The SECURE Act (2019) dramatically changed inherited IRA rules, eliminating the "stretch IRA" for most beneficiaries.

---

## The Old Rules (Pre-2020)

### Stretch IRA

Before SECURE Act, any designated beneficiary could:
- Take RMDs over **their own life expectancy**
- Stretch distributions (and tax deferral) over decades

### Example: Young Beneficiary Under Old Rules

30-year-old inherits IRA:
- Life expectancy: ~53 years
- Could stretch distributions over 5+ decades
- Tremendous tax-deferred growth

---

## SECURE Act Changes (Post-2019)

### The 10-Year Rule

Most non-spouse beneficiaries must now:
- Completely distribute the inherited IRA within **10 years**
- No more "stretch" over life expectancy

### Three Types of Beneficiaries

| Category | Who | Rule |
|----------|-----|------|
| **Eligible Designated Beneficiary (EDB)** | 5 categories (see below) | Stretch (life expectancy) OR 10-year |
| **Designated Beneficiary** | Any other individual | 10-year rule |
| **Non-Designated Beneficiary** | Estate, charity, certain trusts | 5-year rule |

---

## Eligible Designated Beneficiaries (EDBs)

These five categories can still "stretch":

| EDB Category | Rule |
|--------------|------|
| **1. Surviving spouse** | Stretch; can treat as own |
| **2. Minor child of deceased** | Stretch until majority, then 10-year |
| **3. Disabled individual** | Stretch (IRS definition) |
| **4. Chronically ill individual** | Stretch (requires certification) |
| **5. Not more than 10 years younger** | Stretch (siblings, elderly parents) |

### Important Notes

- Minor child rule: Only **deceased owner's** children, not grandchildren
- "Minor" = under 21 (under SECURE Act)
- Once minor reaches majority, **10-year clock starts**

---

## 10-Year Rule Details

### Key Change in 2024

IRS final regulations clarified:

| If Owner Died | Rule |
|---------------|------|
| **Before RMD age** | Distribute by end of year 10 (any timing) |
| **After RMD age** | Annual RMDs required + distribute by year 10 |

### Example: Owner Died After RMD Age

Owner died at 76 (past RMD age), beneficiary age 45:

Year 1-9: Must take **annual RMDs** based on beneficiary's life expectancy
Year 10: **Must distribute remaining balance**

### Example: Owner Died Before RMD Age

Owner died at 68 (before RMD age):

Years 1-9: No required distributions (can if desired)
Year 10: **Must distribute entire balance**

---

## Surviving Spouse Options

| Option | How It Works | When It's Best |
|--------|--------------|----------------|
| **Treat as own IRA** | Roll over to spouse's own IRA | Spouse is younger than 59½ and won't need funds |
| **Remain beneficiary** | Keep as inherited IRA | Need funds before 59½ (no 10% penalty) |
| **10-year rule** | Deplete within 10 years | Want rapid distribution |

### Spouse's Decision Framework

| Spouse's Age | Needs Funds Soon? | Best Option |
|--------------|-------------------|-------------|
| Under 59½ | Yes | Remain beneficiary (no 10% penalty) |
| Under 59½ | No | Wait, then roll over at 59½ |
| Over 59½ | Either | Roll over to own IRA |

---

## Inherited Roth IRAs

### Same 10-Year Rule Applies

Non-EDB beneficiaries must distribute within 10 years.

### Key Difference

- Distributions are **tax-free** (if original 5-year rule met)
- No annual RMDs required during 10 years
- Best strategy: Wait until year 10 (maximize tax-free growth)

---

## Trusts as Beneficiaries

### See-Through (Look-Through) Trust

If trust meets requirements, look through to individual beneficiaries:
- Trust is valid under state law
- Trust is irrevocable (or becomes so at death)
- Beneficiaries are identifiable
- Trust documentation provided to custodian

### Two Types

| Trust Type | What Distributes | Rule |
|------------|------------------|------|
| **Conduit trust** | Must distribute all RMDs to beneficiary | Based on oldest beneficiary |
| **Accumulation trust** | Can accumulate within trust | Often subject to 10-year |

---

## Multiple Beneficiaries

### Separate Account Rule

If inherited IRA is split into separate accounts by **December 31 of year following death**:
- Each beneficiary uses own classification
- Each can be EDB or regular beneficiary separately

### If Not Split

Use the **oldest beneficiary's** status:
- If any beneficiary is not a "designated beneficiary," treat all as non-designated

---

## Planning Strategies

### For Account Owners

| Strategy | Purpose |
|----------|---------|
| **Roth conversions** | Beneficiaries inherit tax-free |
| **Name EDBs** | Preserve stretch potential |
| **Consider charities** | Tax-free to charity, not subject to income tax |
| **Life insurance** | Replace retirement account tax burden |

### For Beneficiaries

| Strategy | Purpose |
|----------|---------|
| **Split accounts quickly** | Preserve each person's treatment |
| **Time distributions** | Manage income in lower years |
| **Consider state taxes** | Some states don't tax retirement income |

---

## Key Takeaways

1. **10-year rule** now applies to most non-spouse beneficiaries
2. **5 EDB categories** can still stretch: spouse, minor child, disabled, chronically ill, not 10+ years younger
3. **If owner died after RMD age**: Annual RMDs required + empty by year 10
4. **Spouse options**: Treat as own, remain beneficiary, or 10-year
5. **Inherited Roth**: 10-year rule applies but distributions are tax-free
    `,
    keyTakeaways: [
      "SECURE Act: 10-year rule for most non-spouse beneficiaries",
      "5 EDBs can stretch: spouse, minor child, disabled, chronically ill, ≤10 years younger",
      "If owner died after RMD age: Annual RMDs + deplete by year 10",
      "Spouse can: treat as own, remain beneficiary, or elect 10-year",
      "Inherited Roth: 10-year rule but tax-free distributions"
    ],
    keyFormulas: [
      "10-Year Rule Deadline = December 31 of 10th year after death",
      "Inherited IRA RMD = Previous year-end balance / Life expectancy factor"
    ],
    mnemonics: [
      "EDB = \"Every Disabled Beneficiary Stretches\" (Spouse, Minor child, Disabled, Chronically ill, ≤10 years younger)",
      "SECURE = Stretch Eliminated; Curtailed Unfairly for Regular Estate-planning"
    ],
    practiceProblems: [
      {
        question: "A 45-year-old inherits a Traditional IRA from their 70-year-old parent (who died before RMD age began). What is the distribution rule?",
        answer: "10-year rule. Since the owner died before RMD age, no annual distributions are required—but the entire account must be distributed by December 31 of the 10th year after death."
      },
      {
        question: "A 40-year-old inherits an IRA from their 78-year-old parent (who died after RMD age began). What is the distribution rule?",
        answer: "10-year rule WITH annual RMDs. Since the owner died after RMD age, the beneficiary must take annual RMDs based on their life expectancy AND must deplete the account by year 10."
      },
      {
        question: "Who qualifies as an Eligible Designated Beneficiary (EDB) under SECURE Act?",
        answer: "(1) Surviving spouse, (2) Minor child of the deceased (not grandchild), (3) Disabled individual, (4) Chronically ill individual, (5) Individual not more than 10 years younger than deceased."
      }
    ],
    relatedLessons: ["CFP-RET-L016", "CFP-RET-L009", "CFP-EST-L003"]
  },

  {
    id: "CFP-RET-L018",
    domain: "CFP-RET",
    blueprintArea: "RET-5",
    title: "Net Unrealized Appreciation (NUA)",
    order: 18,
    duration: 45,
    objectives: [
      "Explain the NUA tax strategy",
      "Calculate tax savings from NUA treatment",
      "Identify when NUA is advantageous",
      "Apply NUA distribution requirements"
    ],
    content: `
# Net Unrealized Appreciation (NUA)

**NUA** is a tax strategy that can convert ordinary income into long-term capital gains when distributing employer stock from a qualified plan.

---

## What Is NUA?

### Definition

The increase in value of employer stock while held inside a qualified plan.

$$\\text{NUA} = \\text{Current FMV} - \\text{Cost Basis}$$

### Why It Matters

- Normal 401(k) distributions: **Taxed as ordinary income** (up to 37%)
- NUA strategy: **NUA portion taxed as long-term capital gains** (up to 20%)

---

## How NUA Works

### Without NUA (Standard Rollover)

1. Roll employer stock to IRA
2. Eventually withdraw stock
3. **Entire value taxed as ordinary income**

### With NUA Strategy

1. Distribute employer stock to taxable brokerage account
2. Pay ordinary income tax on **cost basis only**
3. NUA (appreciation) taxed at **LTCG rates** when sold
4. Any additional appreciation after distribution = STCG or LTCG

---

## Example: NUA vs. Rollover

| Facts | |
|-------|------|
| Employer stock FMV | $500,000 |
| Cost basis in plan | $100,000 |
| NUA | $400,000 |
| Marginal tax rate | 35% |
| LTCG rate | 15% |

### Option 1: Roll to IRA (No NUA)

Withdraw $500,000 later:
$$\\text{Tax} = \\$500,000 \\times 35\\% = \\$175,000$$

### Option 2: NUA Strategy

At distribution:
$$\\text{Tax on basis} = \\$100,000 \\times 35\\% = \\$35,000$$

At sale (any time after):
$$\\text{Tax on NUA} = \\$400,000 \\times 15\\% = \\$60,000$$

$$\\text{Total Tax} = \\$35,000 + \\$60,000 = \\$95,000$$

### Savings

$$\\text{Tax Savings} = \\$175,000 - \\$95,000 = \\$80,000$$

---

## NUA Requirements

### Must Be From Qualified Plan

- 401(k), profit-sharing, ESOP
- **Not from IRA** (NUA doesn't apply to IRAs)

### Must Be Lump-Sum Distribution

Must distribute **entire balance** within one tax year due to:
1. Separation from service
2. Death
3. Disability (self-employed only)
4. After reaching age 59½

### Must Distribute In-Kind

- Employer stock goes to taxable account **as stock**
- Cannot sell in plan first

---

## When NUA Makes Sense

### Good Candidates for NUA

| Factor | Favorable |
|--------|-----------|
| **NUA is large** | Large appreciation = more LTCG benefit |
| **Low cost basis** | More of value is NUA |
| **High ordinary rate** | Bigger spread between OI and LTCG |
| **Need liquidity soon** | No 10% early withdrawal penalty on NUA |

### NUA May NOT Be Best When

| Factor | Unfavorable |
|--------|-------------|
| **Small NUA** | Little benefit for complexity |
| **Low ordinary rate** | Small rate differential |
| **Won't sell for decades** | Tax deferral in IRA may win |
| **Want diversification** | Concentrated stock risk |

---

## The 10% Early Withdrawal Penalty

### Special Rule for NUA

If under 59½:
- **10% penalty applies to cost basis** (distributed from plan)
- **10% penalty does NOT apply to NUA** (taxed as LTCG at sale)

### Example

Age 50 person takes NUA distribution:
| Component | Tax |
|-----------|-----|
| $100,000 basis | Ordinary income + 10% penalty |
| $400,000 NUA | LTCG when sold (no penalty) |

---

## Post-Distribution Appreciation

After stock is in taxable account, additional gains are:

| Holding Period | Tax Treatment |
|----------------|---------------|
| ≤ 1 year | Short-term capital gains |
| > 1 year | Long-term capital gains |

**Note**: NUA itself is automatically LTCG regardless of when sold.

---

## Partial NUA Strategy

### Split the Distribution

Can take some employer stock as NUA and roll the rest to IRA:
- Portion taken as stock → NUA treatment
- Portion rolled to IRA → tax deferral continues

### When This Makes Sense

- Only need some liquidity
- Want to manage current-year tax hit (basis tax)
- Diversify some while preserving NUA on rest

---

## Key Takeaways

1. **NUA** = employer stock appreciation in plan; taxed at LTCG rate
2. Must be **lump-sum distribution** from qualified plan (not IRA)
3. Pay **ordinary income on cost basis** upfront, **LTCG on NUA** when sold
4. NUA is **not subject to 10% early withdrawal penalty** (even if under 59½)
5. Best when: **Large NUA, low basis, high marginal rate, need access**
    `,
    keyTakeaways: [
      "NUA = appreciation inside plan; taxed at LTCG rates when sold",
      "Must be lump-sum distribution from qualified plan (not IRA)",
      "Pay ordinary income on cost basis at distribution; LTCG on NUA at sale",
      "No 10% penalty on NUA portion (even if under 59½)",
      "Best when NUA is large relative to basis and high marginal rate"
    ],
    keyFormulas: [
      "NUA = FMV at Distribution - Cost Basis",
      "Tax Savings = (NUA × Ordinary Rate) - (NUA × LTCG Rate)"
    ],
    mnemonics: [
      "NUA = Notice the Upside Advantage (LTCG instead of ordinary)"
    ],
    practiceProblems: [
      {
        question: "An employee has $600,000 of employer stock in their 401(k) with a $150,000 cost basis. Their marginal rate is 32% and LTCG rate is 15%. Compare NUA vs. full IRA rollover.",
        answer: "NUA: $600K - $150K = $450K. Tax: $150K × 32% = $48K at distribution + $450K × 15% = $67,500 at sale = $115,500 total. Rollover: $600K × 32% = $192,000. Savings = $76,500."
      },
      {
        question: "Can NUA be applied to employer stock held in an IRA?",
        answer: "No. NUA only applies to distributions from qualified plans (401(k), profit-sharing, etc.). Once stock is rolled to an IRA, NUA treatment is lost."
      },
      {
        question: "A 55-year-old uses NUA and distributes $50,000 basis and $200,000 NUA. What is the early withdrawal penalty situation?",
        answer: "10% penalty applies to the $50,000 basis only = $5,000 penalty. The $200,000 NUA is not subject to the 10% penalty—it's taxed as LTCG whenever sold."
      }
    ],
    relatedLessons: ["CFP-RET-L008", "CFP-RET-L016", "CFP-TAX-L003"]
  },

  {
    id: "CFP-RET-L019",
    domain: "CFP-RET",
    blueprintArea: "RET-5",
    title: "Retirement Plans and Divorce (QDROs)",
    order: 19,
    duration: 45,
    objectives: [
      "Explain QDRO requirements and process",
      "Compare division of different retirement account types",
      "Apply special tax rules for divorce-related transfers",
      "Identify common QDRO mistakes to avoid"
    ],
    content: `
# Retirement Plans and Divorce (QDROs)

Retirement accounts are often the largest marital asset after a home. Proper division requires understanding QDROs and special tax rules.

---

## What Is a QDRO?

### Definition

**Qualified Domestic Relations Order**: A court order that divides a qualified retirement plan in a divorce or separation.

### Why It's Needed

ERISA-covered retirement plans (401(k), pension, 403(b)) are protected from assignment.

Exception: A QDRO allows division to an **alternate payee** (spouse, former spouse, child, dependent).

---

## Plans That Need QDROs

| Needs QDRO | Doesn't Need QDRO |
|------------|-------------------|
| 401(k) | IRA |
| 403(b) | SEP-IRA |
| Defined benefit pension | SIMPLE IRA |
| Profit-sharing plan | Roth IRA |
| 457(b) governmental | |

### IRAs: Transfer Incident to Divorce

IRAs are divided by **transfer incident to divorce** (under IRC 408(d)(6)):
- No QDRO required
- Just need divorce decree or separation agreement
- Tax-free transfer between spouses

---

## QDRO Requirements

### Must Include

1. Names and addresses of participant and alternate payee
2. Name of each plan covered
3. Dollar amount or percentage of benefit
4. Number of payments or time period
5. Whether it's participant's or alternate spouses benefit

### Cannot Require

- Plan to provide benefit not otherwise available
- Increased benefits (actuarially)
- Benefit already allocated to another alternate payee

---

## Division Methods

### Defined Contribution Plans (401(k))

| Method | Description |
|--------|-------------|
| **Separate interest** | Alternate payee gets their own account |
| **Shared payment** | Split each distribution |

**Separate interest is preferred**:
- Alternate payee controls investments
- Independent from participant's decisions
- Can roll to their own plan/IRA

### Defined Benefit Pensions

| Method | Description |
|--------|-------------|
| **Separate interest** | Independent benefit stream |
| **Shared payment** | Split participant's benefit |

Shared payment risk: If participant dies, alternate payee may lose benefit.

---

## Tax Treatment: Special Early Distribution Rule

### The 10% Penalty Exception

Distributions from QDRO to alternate payee:
- **Age-based penalty exception**: If taken directly from the plan, **no 10% early withdrawal penalty** (even if under 59½)

### But Watch Out for Rollovers!

If alternate payee:
1. **Leaves money in plan** → Can withdraw penalty-free
2. **Takes direct distribution** → Penalty-free (QDRO exception)
3. **Rolls to IRA first** → 10% penalty applies to early withdrawals
4. **Rolls to IRA, then takes out** → 10% penalty if under 59½

> **Key Planning Point**: If alternate payee needs funds, take from plan before rolling!

---

## IRA Division in Divorce

### Transfer Incident to Divorce (408(d)(6))

- Tax-free transfer from one spouse's IRA to other spouse's IRA
- No QDRO needed
- Must be pursuant to divorce/separation instrument
- Receiving spouse treats as their own IRA

### Not Covered

Payments **to** spouse before transfer:
- Treated as participant's distribution
- Taxable to participant
- Potential 10% penalty

---

## Common QDRO Mistakes

### For Participants (Owners)

| Mistake | Consequence |
|---------|-------------|
| Signing before QDRO approved | Could delay benefits |
| Not checking future benefit language | May give away more than intended |
| Ignoring survivor benefits | Ex-spouse may get survivor benefits |

### For Alternate Payees

| Mistake | Consequence |
|---------|-------------|
| Rolling to IRA before taking needed funds | Lose penalty-free access |
| Not checking vesting | May not receive all expected funds |
| Delaying QDRO submission | Plan changes, participant retires |

### For Both

- Not valuing pension correctly (present value vs. future payments)
- Missing deadlines for QDRO submission
- Using generic QDRO language instead of plan-specific

---

## Valuing Retirement Accounts

### Defined Contribution Plans

Value is straightforward: Account balance at division date.

### Defined Benefit Pensions

Complex to value:
- **Present value**: Actuarial calculation
- **Coverture fraction**: Marital portion

$$\\text{Coverture Fraction} = \\frac{\\text{Years of Marriage During Employment}}{\\text{Total Years of Employment}}$$

### Example

- 25 years total employment
- 15 years married during employment
- Pension = $3,000/month

Coverture fraction = 15/25 = 60%

Marital portion = $3,000 × 60% = $1,800/month

If split 50/50: Alternate payee = $900/month

---

## Key Takeaways

1. **QDRO required** for qualified plans (401(k), pension); **not for IRAs**
2. IRAs divide via **transfer incident to divorce** (tax-free)
3. **QDRO distributions**: No 10% early withdrawal penalty from the plan
4. **Roll to IRA first** = lose penalty-free access (10% applies if under 59½)
5. **Coverture fraction** determines marital portion of pension
    `,
    keyTakeaways: [
      "QDRO required for qualified plans (401(k), 403(b), pension); not for IRAs",
      "IRAs: Transfer incident to divorce = tax-free, no QDRO needed",
      "QDRO distribution exception: No 10% penalty from plan (even under 59½)",
      "Rolling to IRA first loses penalty-free access",
      "Coverture fraction = marital years / total employment years"
    ],
    keyFormulas: [
      "Coverture Fraction = Years Married During Employment / Total Employment Years",
      "Marital Benefit = Total Benefit × Coverture Fraction"
    ],
    mnemonics: [
      "QDRO = Quit (Plan), Don't Roll Over (first if you need funds)"
    ],
    practiceProblems: [
      {
        question: "A 50-year-old alternate payee receives $100,000 from ex-spouse's 401(k) via QDRO. They need $30,000 now and want to save the rest. What should they do?",
        answer: "Take $30,000 directly from the 401(k) (no 10% penalty due to QDRO exception), then roll the remaining $70,000 to an IRA. If they roll all to IRA first, the $30,000 withdrawal would face a 10% penalty."
      },
      {
        question: "An employee worked 30 years and was married for 20 of those years. The pension is $4,500/month. What is the marital portion?",
        answer: "Coverture fraction = 20/30 = 66.7%. Marital portion = $4,500 × 0.667 = $3,000/month. If split 50/50, each spouse gets $1,500/month."
      },
      {
        question: "Does dividing an IRA in divorce require a QDRO?",
        answer: "No. IRAs are not ERISA-qualified plans. They are divided via 'transfer incident to divorce' under IRC 408(d)(6), which requires only the divorce decree or separation agreement."
      }
    ],
    relatedLessons: ["CFP-RET-L012", "CFP-RET-L007", "CFP-EST-L002"]
  },

  {
    id: "CFP-RET-L020",
    domain: "CFP-RET",
    blueprintArea: "RET-5",
    title: "Retirement Plan Selection and Integration",
    order: 20,
    duration: 50,
    objectives: [
      "Recommend appropriate plan types for different situations",
      "Integrate retirement plans with overall financial plan",
      "Apply SECURE 2.0 provisions to planning",
      "Coordinate multiple retirement income sources"
    ],
    content: `
# Retirement Plan Selection and Integration

Selecting the right retirement plan—and integrating it with other planning areas—is critical to maximizing benefits.

---

## Plan Selection Decision Tree

### Start with Key Questions

| Question | If Yes → Consider |
|----------|-------------------|
| Self-employed, no employees? | Solo 401(k), SEP-IRA |
| Small employer, want simplicity? | SIMPLE IRA, SEP-IRA |
| Want employee contributions? | 401(k), SIMPLE |
| Need high owner contributions? | DB plan, cash balance |
| Employees should participate? | 401(k), SIMPLE |

---

## Quick Plan Selection Matrix

| Situation | Best Options | Why |
|-----------|--------------|-----|
| **Solo consultant, variable income** | SEP-IRA | Flexible contributions, simple |
| **Solo consultant, high stable income** | Solo 401(k) + DB | Maximize contributions |
| **Small business, 5 employees** | SIMPLE IRA or 401(k) | Balance cost vs. features |
| **Professional practice, age 55+** | Cash balance + 401(k) | Maximum deductions |
| **Family business, want to favor owner** | Safe harbor 401(k) + DB | Pass discrimination, add DB |

---

## SECURE 2.0 Highlights

### Expanded Catch-Up Contributions

| Age | 401(k)/403(b) Catch-Up |
|-----|------------------------|
| 50-59 | $7,500 |
| 60-63 | **$11,250** (super catch-up) |
| 64+ | $7,500 |

### RMD Changes

| Provision | Details |
|-----------|---------|
| RMD age | 73 now; 75 for those born 1960+ |
| Penalty reduction | 25% (was 50%); 10% if corrected timely |
| Roth 401(k) | No RMD during owner's lifetime |

### New Plan Features

| Feature | Description |
|---------|-------------|
| **Starter 401(k)** | Simplified plan for small employers |
| **Rothification** | Employer match can be Roth |
| **Emergency savings** | Plans can include emergency fund feature |
| **Student loan match** | Employer match for student loan payments |

---

## Integrating Retirement with Other Goals

### Tax Planning Integration

| Strategy | Retirement Component |
|----------|---------------------|
| **Current deductions** | Traditional contributions reduce AGI |
| **Tax diversification** | Balance Traditional, Roth, taxable |
| **Managing brackets** | Time Roth conversions strategically |
| **AMT planning** | ISO exercise, deduction timing |

### Estate Planning Integration

| Goal | Retirement Strategy |
|------|---------------------|
| **Maximize to heirs** | Roth conversions (tax-free inheritance) |
| **Charitable giving** | QCDs, charity as beneficiary |
| **EDB protection** | Name eligible beneficiaries strategically |
| **Trust planning** | See-through trusts for flexibility |

### Risk Management Integration

| Risk | Retirement Solution |
|------|---------------------|
| **Longevity** | Delay Social Security, annuitize portion |
| **Inflation** | Equity allocation, TIPS, I-bonds |
| **Sequence** | Bucket strategy, buffer assets |
| **Healthcare** | Medicare planning, HSA utilization |

---

## Coordinating Multiple Income Sources

### The Puzzle Pieces

| Income Source | Characteristics |
|---------------|-----------------|
| **Social Security** | Inflation-adjusted, may be taxable |
| **Pension** | Fixed or COLA, may have survivor benefit |
| **Traditional IRA/401(k)** | Taxable, RMDs required |
| **Roth IRA** | Tax-free, no RMDs |
| **Taxable accounts** | Favorable cap gains rates |
| **Annuities** | Guaranteed income, various tax treatment |
| **Part-time work** | Ordinary income |

### Optimal Sequencing Considerations

1. **Bridge years** (62-70): Use savings, delay Social Security
2. **Roth conversion window**: Before SS and RMDs start
3. **Tax bracket management**: Smooth income across years
4. **Medicare IRMAA**: Watch income spikes

---

## Social Security Integration

### Coordination with Retirement Accounts

| If You | Strategy |
|--------|----------|
| Have large Traditional accounts | Delay SS, do Roth conversions |
| Have mostly Roth | May claim SS earlier (lower tax impact) |
| Have pension | May claim SS earlier (guaranteed income met) |
| Are married | Coordinate spousal strategies |

### Break-Even Analysis

Delaying SS from 62 to 70:
- 77% increase in monthly benefit
- Break-even around age 80-82
- If healthy, delay is usually optimal

---

## Case Study: Comprehensive Integration

### Client Profile

| Factor | Details |
|--------|---------|
| Ages | Both 60 |
| Traditional IRAs | $1.5M combined |
| Roth IRAs | $200K |
| Taxable | $300K |
| Social Security (combined at 70) | $70K/year |
| Annual spending | $100K |

### Integrated Strategy

| Age | Strategy |
|-----|----------|
| 60-63 | Take distributions from Traditional, do Roth conversions (fill 22% bracket) |
| 64-69 | Continue conversions, use taxable for living expenses |
| 70+ | Start Social Security, take RMDs, use Roth for spikes |

### Tax Savings

Without strategy: High RMDs + 85% SS taxation = ~28% effective rate
With strategy: Smooth income = ~18% effective rate

---

## Key Takeaways

1. **Plan selection**: Match to business structure, owner age, contribution goals
2. **SECURE 2.0**: Super catch-up (60-63), RMD age 75, Roth 401(k) no RMD
3. **Integration**: Connect retirement with tax, estate, risk management
4. **Sequencing**: Strategic ordering of withdrawals minimizes lifetime taxes
5. **Social Security**: Delay usually optimal; creates Roth conversion window
    `,
    keyTakeaways: [
      "Match plan type to business structure, owner age, and contribution goals",
      "SECURE 2.0: Super catch-up at 60-63, RMD age 75, Roth 401(k) no RMD",
      "Integrate retirement with tax planning, estate planning, risk management",
      "Strategic withdrawal sequencing can significantly reduce lifetime taxes",
      "Delay Social Security usually optimal; creates Roth conversion window"
    ],
    keyFormulas: [
      "Break-even Age for SS Delay ≈ 80-82 (varies by rates)",
      "Roth Conversion Value = Tax Saved in Future / Tax Paid Now"
    ],
    practiceProblems: [
      {
        question: "A 62-year-old retiring couple has $2M in Traditional IRAs and modest spending. What strategy should they consider before claiming Social Security at 70?",
        answer: "Roth conversions during the 'bridge years' (62-70). While living expenses are low and before RMDs/SS begin, convert Traditional to Roth to fill low tax brackets. This reduces future RMDs and the taxation of Social Security."
      },
      {
        question: "Under SECURE 2.0, what is the catch-up contribution for a 62-year-old in a 401(k)?",
        answer: "Super catch-up: $11,250 (for ages 60-63). The regular catch-up is $7,500, but SECURE 2.0 provides a 50% higher catch-up for ages 60-63."
      },
      {
        question: "A 45-year-old self-employed professional wants to maximize retirement contributions. Net SE income is $400,000. What plan combination should they consider?",
        answer: "Solo 401(k) + Cash Balance (or DB) plan. The Solo 401(k) allows $24,500 employee + ~$71,500 employer = ~$71,500 total. Adding a cash balance plan could add $100,000+ more depending on plan design—total contributions potentially $170,000+."
      }
    ],
    relatedLessons: ["CFP-RET-L002", "CFP-RET-L015", "CFP-RET-L016"]
  }
];

export default CFP_RET5_LESSONS;
