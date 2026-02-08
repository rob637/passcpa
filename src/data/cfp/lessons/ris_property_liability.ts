/**
 * CFP Risk Management Lessons - Property and Liability Insurance
 * Domain 3: Risk Management and Insurance Planning (12% of exam)
 * Blueprint Area: RIS-4 - Property and Liability Insurance
 * 
 * Topics: Homeowners, auto, umbrella, liability coverage
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_RIS4_LESSONS: CFPLesson[] = [
  {
    id: 'CFP-RIS-L011',
    domain: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    title: 'Homeowners Insurance',
    order: 11,
    duration: 30,
    objectives: [
      'Distinguish homeowners policy forms',
      'Understand coverage sections and limits',
      'Apply coinsurance and valuation concepts',
      'Identify common exclusions'
    ],
    content: `
# Homeowners Insurance

## Homeowners Policy Forms

### HO-1: Basic Form
- Named perils only (10)
- Rarely offered today

### HO-2: Broad Form
- Named perils (16)
- Moderate protection

### HO-3: Special Form (Most Common)
- **Dwelling:** Open perils (all-risk)
- **Personal property:** Named perils
- Standard for homeowners

### HO-4: Renters Insurance
- No dwelling coverage
- Personal property: Named perils
- Liability included

### HO-5: Comprehensive Form
- **Dwelling:** Open perils
- **Personal property:** Open perils
- Broadest coverage

### HO-6: Condo Unit Owners
- Walls-in coverage
- HO association covers building exterior
- Personal property and liability

### HO-8: Modified Coverage Form
- For older homes
- Pays actual cash value (not replacement)
- Functional replacement cost option

### Comparison
| Form | Dwelling | Personal Property | Best For |
|------|----------|-------------------|----------|
| HO-3 | Open | Named | Most homeowners |
| HO-4 | None | Named | Renters |
| HO-5 | Open | Open | Premium protection |
| HO-6 | Walls-in | Named | Condo owners |

## Coverage Sections

### Section I: Property Coverage

**Coverage A - Dwelling:**
- House structure
- Attached structures
- Replacement cost basis

**Coverage B - Other Structures:**
- Detached garage, shed, fence
- 10% of Coverage A
- Not used for business

**Coverage C - Personal Property:**
- Belongings inside and away from home
- 50-70% of Coverage A
- Worldwide coverage (some limits)

**Coverage D - Loss of Use:**
- Additional living expenses
- Fair rental value
- 20-30% of Coverage A

### Coverage Sublimits
Special limits on certain items:
| Category | Typical Limit |
|----------|---------------|
| Cash/coin | $200 |
| Securities | $1,500 |
| Watercraft | $1,500 |
| Jewelry/watches | $1,500 |
| Firearms | $2,500 |
| Silverware | $2,500 |
| Business property | $2,500 |

**Solution:** Schedule valuable items with specific coverage

### Section II: Liability Coverage

**Coverage E - Personal Liability:**
- Bodily injury/property damage claims
- Legal defense costs
- Minimum $100,000 (recommend $300,000+)

**Coverage F - Medical Payments to Others:**
- No-fault payment for guest injuries
- $1,000-$5,000 typical
- Not for household members

## Valuation Methods

### Replacement Cost
- Cost to replace with like kind and quality
- No deduction for depreciation
- Standard for dwelling

### Actual Cash Value (ACV)
$$\\text{ACV} = \\text{Replacement Cost} - \\text{Depreciation}$$

Example:
- 10-year old roof replacement: $15,000
- Depreciation (5%/year × 10 years): $7,500
- ACV payment: $7,500

### Functional Replacement Cost
Replace with functionally similar but not identical
- Modern materials for older home features
- Used in HO-8 policies

## Coinsurance (80% Rule)

### Requirement
Insure dwelling at minimum 80% of replacement cost

### Penalty Formula

$$\\text{Payment} = \\frac{\\text{Coverage Carried}}{\\text{Coverage Required}} \\times \\text{Loss}$$

### Example
| Factor | Value |
|--------|-------|
| Replacement cost | $400,000 |
| 80% requirement | $320,000 |
| Actual coverage | $240,000 |
| Loss | $100,000 |

$$\\text{Payment} = \\frac{240,000}{320,000} \\times 100,000 = \\$75,000$$

Insured pays $25,000 penalty for underinsurance

### Guaranteed Replacement Cost
- Eliminates coinsurance concerns
- Pays full rebuild even if over limit
- Available for additional premium

## Common Exclusions

### Section I Exclusions
- Flood
- Earthquake
- War
- Nuclear hazard
- Neglect/maintenance
- Ordinance or law (unless endorsed)
- Mold (usually limited)

### Section II Exclusions
- Business activities
- Professional liability
- Motor vehicles (on public roads)
- Watercraft (over certain size)
- Intentional acts
- Workers compensation situations
    `,
    keyTakeaways: [
      'HO-3 is most common: open perils on dwelling, named perils on personal property',
      'Coverage B (other structures) = 10% of A; Coverage C (personal property) = 50-70% of A',
      '80% coinsurance requires insuring to 80% of replacement cost to avoid penalties',
      'Flood and earthquake require separate policies',
      'Personal liability coverage applies to negligence claims anywhere'
    ],
    keyFormulas: [
      {
        name: 'Coinsurance Payment',
        formula: 'Payment = (Coverage Carried ÷ Coverage Required) × Loss'
      },
      {
        name: 'Actual Cash Value',
        formula: 'ACV = Replacement Cost - Depreciation'
      }
    ],
    mnemonics: [
      {
        name: 'DUPLE',
        meaning: 'HO Coverage Sections: Dwelling, Use (loss of), Personal property, Liability, Everyone\'s medical (Coverage F)'
      }
    ],
    practiceProblems: [
      {
        question: 'A home with $600,000 replacement cost is insured for $400,000. The policy has 80% coinsurance. A $120,000 loss occurs. How much does insurance pay (before deductible)?',
        answer: '$100,000. Coverage required = $600,000 × 80% = $480,000. Payment = ($400,000 ÷ $480,000) × $120,000 = 83.3% × $120,000 = $100,000.'
      }
    ],
    relatedLessons: ['CFP-RIS-L012', 'CFP-RIS-L013']
  },
  {
    id: 'CFP-RIS-L012',
    domain: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    title: 'Auto Insurance',
    order: 12,
    duration: 30,
    objectives: [
      'Explain PAP coverage parts',
      'Apply liability coverage concepts',
      'Distinguish collision vs. comprehensive',
      'Understand uninsured/underinsured coverage'
    ],
    content: `
# Auto Insurance

## Personal Auto Policy (PAP) Structure

### Part A: Liability Coverage
Pays for bodily injury and property damage to others when you're at fault

**Split Limits:**
Expressed as three numbers: 100/300/50
- $100,000 per person bodily injury
- $300,000 per accident bodily injury
- $50,000 property damage

**Combined Single Limit (CSL):**
One limit for all coverage
Example: $500,000 CSL (any combination of BI/PD)

**What's Covered:**
- Injuries to others
- Damage to others' property
- Legal defense costs (in addition to limits)
- Volunteer workers using your car

### Part B: Medical Payments (MedPay)
- Pays medical expenses for you and passengers
- Regardless of fault
- Typical limits: $5,000-$10,000
- Per person limit

### Part C: Uninsured/Underinsured Motorist

**Uninsured Motorist (UM):**
Covers you when hit by driver with:
- No insurance
- Hit-and-run
- Insurance company insolvent

**Underinsured Motorist (UIM):**
Covers you when at-fault driver has insufficient coverage
- Their limits < your damages
- Your UIM covers the difference

**Example:**
- Your injuries: $200,000
- At-fault driver's limit: $50,000
- Your UIM: $250,000
- UIM pays: $150,000 (your damages - their payment)

### Part D: Physical Damage

**Collision:**
- Damage from collision with object or vehicle
- Regardless of fault
- Subject to deductible
- Pays to repair/replace your vehicle

**Comprehensive (Other Than Collision):**
Damage from:
- Theft
- Vandalism
- Weather (hail, flood, wind)
- Fire
- Hitting an animal
- Glass breakage

**Coverage Trigger:**
| Event | Coverage |
|-------|----------|
| Hit another car | Collision |
| Hit a deer | Comprehensive |
| Hail damage | Comprehensive |
| Back into pole | Collision |
| Car stolen | Comprehensive |

### Part E: Duties After Accident
- Notify insurer promptly
- Cooperate in investigation
- File police report if required
- Submit proof of loss

### Part F: General Provisions
- Policy territory (US, Canada, Puerto Rico)
- Termination/renewal provisions
- Other insurance handling

## Coverage Extensions

### Who is Insured?
- Named insured and family members
- Anyone using covered vehicle with permission

### What Vehicles Are Covered?
- Vehicles listed in declarations
- Newly acquired vehicles (coverage period varies)
- Temporary substitute vehicles
- Non-owned vehicles used by insured

## Exclusions

### Liability Exclusions
- Intentional injury
- Vehicles with fewer than 4 wheels
- Vehicles used as public transportation
- Business use of vehicle (other than private passenger)

### Physical Damage Exclusions
- Wear and tear
- Mechanical breakdown
- Custom equipment (unless scheduled)
- Personal belongings in vehicle (covered by HO)

## No-Fault Insurance

### Pure No-Fault (Rare)
- Cannot sue for pain/suffering
- Your insurer pays regardless of fault

### Modified No-Fault (Most No-Fault States)
- Personal Injury Protection (PIP) required
- Can sue if injuries exceed threshold
- Threshold: dollar amount or verbal (serious injury)

### PIP Coverage
- Medical expenses
- Lost wages
- Essential services
- Funeral expenses

## Coverage Recommendations

### Minimum State Limits
Often inadequate (e.g., 25/50/25)

### Recommended Coverage
| Coverage | Recommendation |
|----------|----------------|
| Liability | 100/300/100 or higher |
| UM/UIM | Match liability |
| Med Pay | $10,000+ |
| Collision | ACV with $500-$1,000 deductible |
| Comprehensive | ACV with $250-$500 deductible |
    `,
    keyTakeaways: [
      'PAP has 6 parts: Liability, Med Pay, UM/UIM, Physical Damage, Duties, General',
      'Split limits: Per person BI / Per accident BI / Property damage',
      'Collision covers impact with objects; Comprehensive covers all other perils',
      'UM covers when at-fault driver has no insurance; UIM covers insufficient coverage',
      'Legal defense costs are in addition to liability limits'
    ],
    keyFormulas: [],
    mnemonics: [
      {
        name: 'PAP LMUPD',
        meaning: 'PAP Parts: Liability, Medical, Uninsured, Physical damage, Duties (and provisions)'
      }
    ],
    practiceProblems: [
      {
        question: 'You have 100/300/50 liability coverage. You cause an accident injuring 3 people. Damages: $90,000, $80,000, and $50,000. How much does your insurance pay for bodily injury?',
        answer: '$220,000. Per-person claims are $90K + $80K + $50K = $220,000. Since no single person exceeds $100K and total doesn\'t exceed $300K, all claims are fully paid. ($90K ≤ $100K, $80K ≤ $100K, $50K ≤ $100K, and $220K ≤ $300K)'
      }
    ],
    relatedLessons: ['CFP-RIS-L011', 'CFP-RIS-L013']
  },
  {
    id: 'CFP-RIS-L013',
    domain: 'CFP-RISK',
    blueprintArea: 'RIS-4',
    title: 'Umbrella Liability and Other Coverage',
    order: 13,
    duration: 25,
    objectives: [
      'Explain umbrella policy purpose and structure',
      'Identify coverage gaps filled by umbrella',
      'Understand professional liability coverage',
      'Apply appropriate coverage recommendations'
    ],
    content: `
# Umbrella Liability and Other Coverage

## Personal Umbrella Policy

### Purpose
- Provide additional liability limits
- Fill gaps in underlying coverage
- Excess liability protection

### How It Works
1. Underlying policies exhausted first
2. Umbrella covers excess (up to limit)
3. Some claims covered only by umbrella (with SIR)

### Typical Limits
- $1,000,000 to $5,000,000 common
- Available up to $10,000,000+
- Coverage for whole family

### Self-Insured Retention (SIR)
For claims covered by umbrella but NOT underlying:
- Acts as deductible (typically $250-$10,000)
- Examples: Libel, slander, invasion of privacy

### Underlying Requirements
Must maintain minimum underlying coverage:
| Policy | Typical Minimum |
|--------|-----------------|
| Auto liability | $250,000/$500,000 |
| Homeowners liability | $300,000 |
| Watercraft | $300,000 |

### Example
| Coverage | Amount |
|----------|--------|
| Judgment against you | $1,500,000 |
| Auto liability pays | $300,000 |
| Umbrella pays | $1,200,000 |
| Your cost | $0 |

Without umbrella:
- You pay $1,200,000 out of pocket
- Home, income, assets at risk

### What Umbrella Covers
- Bodily injury liability
- Property damage liability
- Personal injury (libel, slander, defamation)
- Broader geographic coverage
- Legal defense costs

### What's Excluded
- Business activities
- Professional liability
- Workers compensation
- Intentional acts
- Contractual liability (some)

### Who Needs Umbrella?
Anyone with:
- Assets to protect
- Visible career/public profile
- Teen drivers
- Swimming pool
- Rental property
- Pets (especially certain breeds)
- Frequent entertaining

## Professional Liability Insurance

### Errors and Omissions (E&O)
For professional services:
- Financial advisors
- Insurance agents
- Consultants
- Real estate agents

**Covers:**
- Negligent acts
- Errors in advice
- Omissions of service
- Legal defense

### Malpractice Insurance
For licensed professionals:
- Doctors
- Lawyers
- Accountants
- Architects/engineers

### Directors and Officers (D&O)
For corporate boards/executives:
- Wrongful act claims
- Shareholder suits
- Regulatory actions
- Employment practices

### Key Features
**Claims-Made vs. Occurrence:**
| Type | Coverage Trigger |
|------|------------------|
| Occurrence | When incident happens |
| Claims-made | When claim is filed |

**Tail Coverage:**
- Extended reporting period
- Critical when leaving practice
- Covers claims filed after policy ends

## Other Important Coverages

### Flood Insurance
- Not covered by homeowners
- NFIP (National Flood Insurance Program)
- Required in designated flood zones
- Maximum: $250,000 dwelling / $100,000 contents

### Earthquake Insurance
- Not covered by homeowners
- High deductibles (10-25% of value)
- Critical in seismic zones

### Identity Theft Coverage
- Credit monitoring
- Recovery expenses
- Legal fees
- Lost wages for resolution

### Special Events Coverage
- Weddings
- Parties
- Liability for event

## Creating Proper Coverage

### Coverage Coordination
Avoid:
- Gaps (no coverage)
- Overlaps (paying twice for same coverage)

### Annual Review Checklist
1. Update home value (inflation)
2. Review vehicle list
3. Assess liability exposure
4. Check special items (jewelry, art)
5. Verify umbrella requirements met
6. Update beneficiaries (life insurance)
    `,
    keyTakeaways: [
      'Umbrella provides excess liability AND fills coverage gaps',
      'Self-insured retention applies when umbrella covers what underlying does not',
      'Underlying policy minimums must be met for umbrella eligibility',
      'Professional liability uses claims-made—tail coverage critical when leaving',
      'Flood and earthquake require separate policies beyond homeowners'
    ],
    keyFormulas: [],
    mnemonics: [
      {
        name: 'SAFE',
        meaning: 'Separate Policies Needed: Specialty equipment, Auto (for vehicle damage), Flood, Earthquake'
      }
    ],
    practiceProblems: [
      {
        question: 'A client has $300,000 auto liability and $1M umbrella. A lawsuit results in $900,000 judgment. How much does each policy pay?',
        answer: 'Auto pays $300,000, Umbrella pays $600,000. The underlying auto policy pays first up to its limit, then the umbrella pays the excess ($900,000 - $300,000 = $600,000).'
      }
    ],
    relatedLessons: ['CFP-RIS-L011', 'CFP-RIS-L012']
  }
];

export default CFP_RIS4_LESSONS;
