/**
 * CFP Risk Management Lessons - Fundamentals and Concepts
 * Domain 3: Risk Management and Insurance Planning (12% of exam)
 * Blueprint Area: RIS-1 - Risk Management Concepts
 * 
 * Topics: Risk analysis, management techniques, insurance basics
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_RIS1_LESSONS: CFPLesson[] = [
  {
    id: 'CFP-RIS-L001',
    domain: 'CFP-RIS',
    blueprintArea: 'RIS-1',
    title: 'Principles of Risk Management',
    order: 1,
    duration: 25,
    objectives: [
      'Define and classify types of risk',
      'Apply the risk management process',
      'Distinguish between risk management techniques',
      'Evaluate appropriate strategies for different risks'
    ],
    content: `
# Principles of Risk Management

## Understanding Risk

### Definition
**Risk:** The uncertainty concerning the occurrence of a loss

### Types of Risk

**Pure Risk vs. Speculative Risk:**
| Type | Definition | Insurable? |
|------|------------|------------|
| Pure risk | Chance of loss only (no gain) | Yes |
| Speculative risk | Chance of loss or gain | No |

**Static vs. Dynamic Risk:**
- **Static:** Losses from natural forces or human error
- **Dynamic:** Losses from economic/societal changes

**Fundamental vs. Particular Risk:**
- **Fundamental:** Affects large groups (war, recession)
- **Particular:** Affects individuals (auto accident)

**Objective vs. Subjective Risk:**
- **Objective:** Actual variability of outcomes (statistical)
- **Subjective:** Perceived uncertainty (psychological)

## Risk Exposures

### Personal Risk Exposures
1. **Death** - Loss of income, final expenses
2. **Disability** - Loss of income, medical costs
3. **Poor Health** - Medical expenses
4. **Unemployment** - Loss of income
5. **Longevity** - Outliving assets

### Property Risk Exposures
1. **Direct loss** - Damage to property itself
2. **Indirect loss** - Consequential losses (lost rental income)

### Liability Risk Exposures
1. **Personal liability** - Negligent acts
2. **Professional liability** - Malpractice, E&O
3. **Business liability** - Product, premises

## The Risk Management Process

### Step 1: Identify Risks
- Personal and business exposures
- Property holdings
- Liability exposures
- Financial dependencies

### Step 2: Analyze Risks
**Frequency:** How often might loss occur?
**Severity:** How large could the loss be?

| Frequency | Severity | Priority |
|-----------|----------|----------|
| High | High | Avoid or reduce |
| High | Low | Retain |
| Low | High | Transfer (insure) |
| Low | Low | Retain |

### Step 3: Select Techniques
Choose from five risk management techniques

### Step 4: Implement
Execute the chosen strategy

### Step 5: Monitor and Review
Regular reassessment as circumstances change

## Risk Management Techniques

### 1. Risk Avoidance
Eliminate the exposure entirely
- Don't buy a motorcycle
- Don't perform certain procedures

**Advantages:** Eliminates loss potential
**Disadvantages:** May eliminate benefits too

### 2. Risk Reduction (Loss Control)
**Loss Prevention:** Reduce frequency
- Smoke detectors
- Safe driving courses
- Security systems

**Loss Reduction:** Minimize severity
- Fire extinguishers
- Seatbelts
- Sprinkler systems

### 3. Risk Retention
Accept and pay for losses yourself
- Deductibles
- Self-insurance
- Emergency funds

**Active retention:** Deliberate choice
**Passive retention:** Failure to identify risk

### 4. Risk Transfer
Shift risk to another party
- Insurance (most common)
- Contracts (hold harmless clauses)
- Hedging

### 5. Risk Sharing
Distribute risk among parties
- Partnerships
- Joint ventures
- Insurance pools

## Decision Framework

### What to Insure
**Don't risk more than you can afford to lose:**
- Large potential losses should be transferred
- Small, frequent losses are best retained

**Don't risk a lot for a little:**
- Premium cost should be reasonable relative to coverage

**Consider the odds:**
- High-probability losses may be uninsurable or expensive
    `,
    keyTakeaways: [
      'Pure risks (loss only possible) are insurable; speculative risks are not',
      'Risk management uses 5 techniques: avoid, reduce, retain, transfer, share',
      'High severity/low frequency risks should be transferred (insured)',
      'High frequency/low severity risks should be retained',
      'Risk management is an ongoing process, not a one-time decision'
    ],
    keyFormulas: [],
    mnemonics: [
      {
        name: 'ARRT-S',
        meaning: 'Risk Techniques: Avoid, Reduce, Retain, Transfer, Share'
      }
    ],
    practiceProblems: [
      {
        question: 'A client faces a risk with high severity but low frequency (rare catastrophic loss). Which risk management technique is most appropriate?',
        answer: 'Transfer (Insurance). High severity risks should be transferred because the client cannot afford to pay for the loss themselves. Low frequency makes insurance cost-effective.'
      }
    ],
    relatedLessons: ['CFP-RIS-L002', 'CFP-RIS-L003']
  },
  {
    id: 'CFP-RIS-L002',
    domain: 'CFP-RIS',
    blueprintArea: 'RIS-1',
    title: 'Insurance Fundamentals',
    order: 2,
    duration: 30,
    objectives: [
      'Understand requirements for insurable risks',
      'Explain key insurance principles',
      'Distinguish policy types and components',
      'Apply insurance selection criteria'
    ],
    content: `
# Insurance Fundamentals

## Requirements for Insurable Risks

### 1. Large Number of Similar Exposures
- Law of large numbers applies
- Enables accurate predictions
- Allows premium calculation

### 2. Accidental and Unintentional Losses
- Must be beyond insured's control
- Cannot be caused deliberately
- Fortuitous occurrence

### 3. Determinable and Measurable Loss
- Loss must be identifiable
- Amount must be quantifiable
- Time and place determinable

### 4. Not Catastrophic
- No single event should cause massive losses
- Catastrophes (war, nuclear) often excluded
- Private insurance has capacity limits

### 5. Economically Feasible Premium
- Premium must be affordable
- Less than expected loss + admin costs
- Otherwise, no market exists

## Key Insurance Principles

### Principle of Indemnity
Insured should be restored to pre-loss condition—no more, no less
- Cannot profit from insurance
- Prevents moral hazard

**Exceptions:**
- Life insurance (valued contract)
- Valued policies (agreed amount)

### Insurable Interest
Must have financial stake in insured subject
- Property: At time of loss
- Life: At inception of policy only

**Who has insurable interest:**
- Yourself
- Spouse, children, business partners
- Key employees
- Creditors (to extent of debt)

### Subrogation
Insurer's right to recover from responsible third party

**Example:**
1. Driver hits your car ($10,000 damage)
2. Your insurer pays you $10,000
3. Insurer sues negligent driver for $10,000

**Purpose:** Prevents double recovery, reduces premiums

### Utmost Good Faith
Both parties must act honestly
- **Representations:** Statements in application
- **Concealment:** Failure to disclose material facts
- **Warranty:** Statements guaranteed true
- **Misrepresentation:** False material statements

## Insurance Contract Components

### Declarations (Dec Page)
Who, what, when, where, how much
- Named insured
- Property/risk described
- Policy period
- Coverage amounts
- Premium

### Insuring Agreement
The heart of the contract—what's covered

**Two Forms:**
1. **Named perils:** Lists specific covered perils
2. **Open perils (all-risk):** Covers all perils except exclusions

### Conditions
Rules for both parties
- Notice requirements
- Claims procedures
- Cancellation provisions
- Duties after loss

### Exclusions
What is NOT covered
- Intentional acts
- War
- Nuclear hazard
- Wear and tear
- Maintenance items

### Endorsements/Riders
Modifications to base policy
- Add coverage
- Remove exclusions
- Change limits

## Types of Insurance Contracts

### Valued vs. Indemnity Contracts
| Type | Pays | Example |
|------|------|---------|
| Valued | Agreed amount | Life insurance |
| Indemnity | Actual loss | Property insurance |

### Personal vs. Commercial
- Personal: Individuals/families
- Commercial: Businesses

### Occurrence vs. Claims-Made
| Type | Coverage Trigger |
|------|------------------|
| Occurrence | When event happens |
| Claims-made | When claim is filed |

## Policy Selection Criteria

### Financial Strength of Insurer
Rating agencies:
- A.M. Best
- Standard & Poor's
- Moody's

### Policy Provisions
- Coverage breadth
- Exclusions
- Conditions
- Renewal terms

### Cost Considerations
- Premium
- Deductibles
- Coinsurance
- Discounts available

### Service Reputation
- Claims handling
- Customer service
- Agent support
    `,
    keyTakeaways: [
      'Insurable risks require: large numbers, accidental losses, measurable, not catastrophic',
      'Indemnity principle: restore to pre-loss position, no profit',
      'Insurable interest required: property (at loss), life (at inception)',
      'Subrogation allows insurer to recover from responsible parties',
      'Open perils covers everything except exclusions; named perils only covers listed items'
    ],
    keyFormulas: [],
    mnemonics: [
      {
        name: 'DICEE',
        meaning: 'Contract Components: Declarations, Insuring agreement, Conditions, Exclusions, Endorsements'
      }
    ],
    practiceProblems: [
      {
        question: 'Sarah takes out a life insurance policy on her business partner. Two years later, they dissolve the partnership. Is the policy still valid?',
        answer: 'Yes. For life insurance, insurable interest is required only at policy inception, not at the time of claim. Sarah had insurable interest when the policy was taken out, so it remains valid even after the partnership ends.'
      }
    ],
    relatedLessons: ['CFP-RIS-L001', 'CFP-RIS-L003']
  },
  {
    id: 'CFP-RIS-L003',
    domain: 'CFP-RIS',
    blueprintArea: 'RIS-1',
    title: 'Insurance Pricing and Underwriting',
    order: 3,
    duration: 25,
    objectives: [
      'Understand how insurance premiums are calculated',
      'Explain the underwriting process',
      'Apply deductibles and coinsurance concepts',
      'Distinguish rating classifications'
    ],
    content: `
# Insurance Pricing and Underwriting

## Premium Calculation

### Components of Premium

$$\\text{Premium} = \\text{Pure Premium} + \\text{Expense Loading}$$

**Pure Premium:** Expected losses per exposure
**Expense Loading:** Administrative costs, commissions, profit

### Rating Factors

**Life Insurance:**
- Age
- Gender
- Health status
- Occupation
- Lifestyle (smoking, hobbies)
- Family health history

**Auto Insurance:**
- Age, gender, marital status
- Driving record
- Vehicle type
- Location
- Annual mileage
- Credit score (where permitted)

**Homeowners Insurance:**
- Location (fire/crime risk)
- Construction type
- Age of home
- Coverage amount
- Deductible
- Claims history

## The Underwriting Process

### Purpose
Select and classify applicants so premium matches risk

### Classification Categories
1. **Preferred** - Better than average risk
2. **Standard** - Average expected risk
3. **Substandard/Rated** - Higher than average risk
4. **Declined** - Uninsurable risk

### Underwriting Information Sources
- Application
- Medical exams
- MIB (Medical Information Bureau)
- Inspection reports
- MVR (Motor Vehicle Records)
- Credit reports

### Adverse Selection
Tendency of high-risk individuals to seek more insurance
- Insurers use underwriting to combat
- Results in risk pooling concerns
- May lead to policy modifications

## Deductibles

### Purpose
- Eliminate small claims (expensive to process)
- Reduce moral hazard
- Lower premiums

### Types of Deductibles

**Flat/Straight Deductible:**
Fixed dollar amount per loss
Example: $500 deductible; $3,000 loss pays $2,500

**Percentage Deductible:**
Percentage of covered value
Common in: Hurricane, earthquake coverage
Example: 2% deductible on $500,000 home = $10,000 deductible

**Aggregate Deductible:**
Total deductible for policy period
Example: First $2,000 of annual claims paid by insured

**Split Deductible:**
Different deductibles for different perils

### Deductible Selection Strategy
- Higher deductible = Lower premium
- Consider:
  - Emergency fund availability
  - Premium savings vs. risk
  - Claim frequency expectations

## Coinsurance

### Property Insurance Coinsurance

**Purpose:**
Encourage insurance to value (discourage underinsurance)

**Formula:**

$$\\text{Payment} = \\frac{\\text{Coverage Carried}}{\\text{Coverage Required}} \\times \\text{Loss} - \\text{Deductible}$$

**Coverage Required =** Property Value × Coinsurance % (typically 80%)

**Example:**
| Element | Value |
|---------|-------|
| Building value | $500,000 |
| Coinsurance requirement | 80% |
| Required coverage | $400,000 |
| Actual coverage | $300,000 |
| Loss | $100,000 |
| Deductible | $1,000 |

$$\\text{Payment} = \\frac{300,000}{400,000} \\times 100,000 - 1,000 = 75,000 - 1,000 = \\$74,000$$

**The insured becomes a "co-insurer" for $26,000**

### Health Insurance Coinsurance
After deductible, insured and insurer share costs
Example: 80/20 coinsurance = Insurer pays 80%, insured pays 20%

## Policy Limits

### Per-Occurrence Limit
Maximum for single event
Example: $100,000 per accident liability

### Aggregate Limit
Maximum for policy period
Example: $300,000 annual aggregate

### Split Limits
Separate limits for different coverages
Example: Auto 100/300/50
- $100,000 per person bodily injury
- $300,000 per accident bodily injury
- $50,000 property damage

### Combined Single Limit (CSL)
One limit for all coverages
Example: $500,000 CSL (any combination of BI/PD)
    `,
    keyTakeaways: [
      'Premiums = Pure premium (expected losses) + Expense loading',
      'Underwriting classifies risks: Preferred, Standard, Substandard, Declined',
      'Higher deductibles reduce premiums but increase out-of-pocket risk',
      'Coinsurance penalizes underinsurance with formula: (Coverage Carried ÷ Required) × Loss',
      'Adverse selection causes high-risk individuals to seek more coverage'
    ],
    keyFormulas: [
      {
        name: 'Coinsurance Penalty',
        formula: 'Payment = (Coverage Carried ÷ Coverage Required) × Loss - Deductible'
      },
      {
        name: 'Coverage Required',
        formula: 'Required = Property Value × Coinsurance Percentage'
      }
    ],
    mnemonics: [
      {
        name: 'PSSD',
        meaning: 'Underwriting Categories: Preferred, Standard, Substandard, Declined'
      }
    ],
    practiceProblems: [
      {
        question: 'A building worth $800,000 is insured for $480,000 with an 80% coinsurance clause and $5,000 deductible. A fire causes $200,000 damage. How much does insurance pay?',
        answer: '$145,000. Required coverage = $800,000 × 80% = $640,000. Payment = ($480,000 ÷ $640,000) × $200,000 - $5,000 = $150,000 - $5,000 = $145,000.'
      }
    ],
    relatedLessons: ['CFP-RIS-L002', 'CFP-RIS-L004']
  }
];

export default CFP_RIS1_LESSONS;
