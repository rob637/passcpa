/**
 * CFP Risk Management Lessons - Property and Liability Insurance
 * Domain 3: Risk Management and Insurance Planning (12% of exam)
 * Blueprint Area: RIS-4 - Property and Liability Insurance
 * 
 * Topics: Homeowners, auto, umbrella, liability coverage
 */

import type { Lesson } from '../../../types';

export const CFP_RIS4_LESSONS: Lesson[] = [
  {
    id: 'CFP-RIS-L011',
    courseId: 'cfp',
    section: 'CFP-RISK',
    title: 'Homeowners Insurance',
    description: 'Distinguish homeowners policy forms, understand coverage sections, and apply coinsurance concepts',
    order: 11,
    duration: 30,
    difficulty: 'intermediate',
    topics: [
      'Distinguish homeowners policy forms',
      'Understand coverage sections and limits',
      'Apply coinsurance and valuation concepts',
      'Identify common exclusions'
    ],
    blueprintArea: 'RIS-4',
    content: {
      sections: [
        {
          title: 'Homeowners Policy Forms',
          type: 'list',
          items: [
            'HO-1: Basic Form - Named perils only (10), rarely offered today',
            'HO-2: Broad Form - Named perils (16), moderate protection',
            'HO-3: Special Form (Most Common) - Dwelling: Open perils (all-risk), Personal property: Named perils',
            'HO-4: Renters Insurance - No dwelling coverage, personal property named perils, liability included',
            'HO-5: Comprehensive Form - Both dwelling and personal property: Open perils (broadest)',
            'HO-6: Condo Unit Owners - Walls-in coverage, HO association covers building exterior',
            'HO-8: Modified Coverage Form - For older homes, pays actual cash value (not replacement)'
          ]
        },
        {
          title: 'Policy Form Comparison',
          type: 'table',
          headers: ['Form', 'Dwelling', 'Personal Property', 'Best For'],
          rows: [
            ['HO-3', 'Open', 'Named', 'Most homeowners'],
            ['HO-4', 'None', 'Named', 'Renters'],
            ['HO-5', 'Open', 'Open', 'Premium protection'],
            ['HO-6', 'Walls-in', 'Named', 'Condo owners']
          ]
        },
        {
          title: 'Section I: Property Coverage',
          type: 'list',
          items: [
            'Coverage A - Dwelling: House structure, attached structures, replacement cost basis',
            'Coverage B - Other Structures: Detached garage, shed, fence; 10% of Coverage A; not used for business',
            'Coverage C - Personal Property: Belongings inside and away from home; 50-70% of Coverage A; worldwide coverage (some limits)',
            'Coverage D - Loss of Use: Additional living expenses, fair rental value; 20-30% of Coverage A'
          ]
        },
        {
          title: 'Coverage Sublimits',
          type: 'table',
          headers: ['Category', 'Typical Limit'],
          rows: [
            ['Cash/coin', '$200'],
            ['Securities', '$1,500'],
            ['Watercraft', '$1,500'],
            ['Jewelry/watches', '$1,500'],
            ['Firearms', '$2,500'],
            ['Silverware', '$2,500'],
            ['Business property', '$2,500']
          ]
        },
        {
          title: 'Valuable Items Solution',
          type: 'callout',
          content: 'Schedule valuable items with specific coverage to overcome sublimits. A scheduled personal property endorsement provides agreed-value coverage for jewelry, art, collectibles, etc.'
        },
        {
          title: 'Section II: Liability Coverage',
          type: 'list',
          items: [
            'Coverage E - Personal Liability: Bodily injury/property damage claims, legal defense costs; Minimum $100,000 (recommend $300,000+)',
            'Coverage F - Medical Payments to Others: No-fault payment for guest injuries; $1,000-$5,000 typical; NOT for household members'
          ]
        },
        {
          title: 'Valuation Methods',
          type: 'list',
          items: [
            'Replacement Cost: Cost to replace with like kind and quality; no deduction for depreciation; standard for dwelling',
            'Actual Cash Value (ACV): Replacement Cost - Depreciation; example: 10-year roof ($15,000) with 50% depreciation pays $7,500',
            'Functional Replacement Cost: Replace with functionally similar but not identical; modern materials for older home features; used in HO-8'
          ]
        },
        {
          title: 'Coinsurance (80% Rule)',
          type: 'text',
          content: 'Coinsurance requires insuring dwelling at minimum 80% of replacement cost. Penalty formula: Payment = (Coverage Carried ÷ Coverage Required) × Loss.'
        },
        {
          title: 'Coinsurance Example',
          type: 'table',
          headers: ['Factor', 'Value'],
          rows: [
            ['Replacement cost', '$400,000'],
            ['80% requirement', '$320,000'],
            ['Actual coverage', '$240,000'],
            ['Loss', '$100,000'],
            ['Payment', '($240K ÷ $320K) × $100K = $75,000'],
            ['Penalty for underinsurance', '$25,000']
          ]
        },
        {
          title: 'Guaranteed Replacement Cost',
          type: 'text',
          content: 'Guaranteed replacement cost eliminates coinsurance concerns. It pays full rebuild even if over limit. Available for additional premium.'
        },
        {
          title: 'Common Exclusions',
          type: 'list',
          items: [
            'Section I Exclusions: Flood, earthquake, war, nuclear hazard, neglect/maintenance, ordinance or law (unless endorsed), mold (usually limited)',
            'Section II Exclusions: Business activities, professional liability, motor vehicles (on public roads), watercraft (over certain size), intentional acts, workers compensation situations'
          ]
        },
        {
          title: 'Exam Tip: DUPLE Mnemonic',
          type: 'warning',
          content: 'HO Coverage Sections: Dwelling, Use (loss of), Personal property, Liability, Everyone\'s medical (Coverage F).'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'HO-3 is most common: open perils on dwelling, named perils on personal property',
            'Coverage B (other structures) = 10% of A; Coverage C (personal property) = 50-70% of A',
            '80% coinsurance requires insuring to 80% of replacement cost to avoid penalties',
            'Flood and earthquake require separate policies',
            'Personal liability coverage applies to negligence claims anywhere'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-RIS-L012',
    courseId: 'cfp',
    section: 'CFP-RISK',
    title: 'Auto Insurance',
    description: 'Explain PAP coverage parts, apply liability coverage concepts, and understand UM/UIM coverage',
    order: 12,
    duration: 30,
    difficulty: 'intermediate',
    topics: [
      'Explain PAP coverage parts',
      'Apply liability coverage concepts',
      'Distinguish collision vs. comprehensive',
      'Understand uninsured/underinsured coverage'
    ],
    blueprintArea: 'RIS-4',
    content: {
      sections: [
        {
          title: 'Personal Auto Policy (PAP) Structure',
          type: 'callout',
          content: 'PAP has 6 parts: Liability, Medical, Uninsured, Physical damage, Duties (and provisions). Remember: PAP LMUPD.'
        },
        {
          title: 'Part A: Liability Coverage',
          type: 'text',
          content: 'Pays for bodily injury and property damage to others when you\'re at fault. Legal defense costs are in addition to limits. Covers volunteer workers using your car.'
        },
        {
          title: 'Split Limits vs. Combined Single Limit',
          type: 'list',
          items: [
            'Split Limits: Expressed as three numbers (e.g., 100/300/50): $100,000 per person BI, $300,000 per accident BI, $50,000 property damage',
            'Combined Single Limit (CSL): One limit for all coverages (e.g., $500,000 CSL for any combination of BI/PD)'
          ]
        },
        {
          title: 'Part B: Medical Payments (MedPay)',
          type: 'list',
          items: [
            'Pays medical expenses for you and passengers',
            'Regardless of fault',
            'Typical limits: $5,000-$10,000',
            'Per person limit'
          ]
        },
        {
          title: 'Part C: Uninsured/Underinsured Motorist',
          type: 'list',
          items: [
            'Uninsured Motorist (UM): Covers you when hit by driver with no insurance, hit-and-run, or insurer insolvent',
            'Underinsured Motorist (UIM): Covers when at-fault driver has insufficient coverage; your UIM covers the difference'
          ]
        },
        {
          title: 'UIM Example',
          type: 'table',
          headers: ['Item', 'Amount'],
          rows: [
            ['Your injuries', '$200,000'],
            ['At-fault driver\'s limit', '$50,000'],
            ['Your UIM', '$250,000'],
            ['UIM pays', '$150,000 (your damages - their payment)']
          ]
        },
        {
          title: 'Part D: Physical Damage',
          type: 'list',
          items: [
            'Collision: Damage from collision with object or vehicle; regardless of fault; subject to deductible',
            'Comprehensive (Other Than Collision): Theft, vandalism, weather (hail, flood, wind), fire, hitting an animal, glass breakage'
          ]
        },
        {
          title: 'Collision vs. Comprehensive',
          type: 'table',
          headers: ['Event', 'Coverage'],
          rows: [
            ['Hit another car', 'Collision'],
            ['Hit a deer', 'Comprehensive'],
            ['Hail damage', 'Comprehensive'],
            ['Back into pole', 'Collision'],
            ['Car stolen', 'Comprehensive']
          ]
        },
        {
          title: 'Who and What is Insured',
          type: 'list',
          items: [
            'Who: Named insured and family members, anyone using covered vehicle with permission',
            'Vehicles: Listed vehicles, newly acquired vehicles (coverage period varies), temporary substitute vehicles, non-owned vehicles used by insured'
          ]
        },
        {
          title: 'Liability Exclusions',
          type: 'list',
          items: [
            'Intentional injury',
            'Vehicles with fewer than 4 wheels',
            'Vehicles used as public transportation',
            'Business use of vehicle (other than private passenger)'
          ]
        },
        {
          title: 'No-Fault Insurance',
          type: 'text',
          content: 'Pure no-fault (rare) means you cannot sue for pain/suffering and your insurer pays regardless of fault. Modified no-fault (most states) requires Personal Injury Protection (PIP) but allows suit if injuries exceed threshold. PIP covers medical expenses, lost wages, essential services, and funeral expenses.'
        },
        {
          title: 'Coverage Recommendations',
          type: 'table',
          headers: ['Coverage', 'Recommendation'],
          rows: [
            ['Liability', '100/300/100 or higher'],
            ['UM/UIM', 'Match liability'],
            ['Med Pay', '$10,000+'],
            ['Collision', 'ACV with $500-$1,000 deductible'],
            ['Comprehensive', 'ACV with $250-$500 deductible']
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'PAP has 6 parts: Liability, Med Pay, UM/UIM, Physical Damage, Duties, General',
            'Split limits: Per person BI / Per accident BI / Property damage',
            'Collision covers impact with objects; Comprehensive covers all other perils',
            'UM covers when at-fault driver has no insurance; UIM covers insufficient coverage',
            'Legal defense costs are in addition to liability limits'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-RIS-L013',
    courseId: 'cfp',
    section: 'CFP-RISK',
    title: 'Umbrella Liability and Other Coverage',
    description: 'Explain umbrella policy purpose and structure, and understand professional liability coverage',
    order: 13,
    duration: 25,
    difficulty: 'intermediate',
    topics: [
      'Explain umbrella policy purpose and structure',
      'Identify coverage gaps filled by umbrella',
      'Understand professional liability coverage',
      'Apply appropriate coverage recommendations'
    ],
    blueprintArea: 'RIS-4',
    content: {
      sections: [
        {
          title: 'Personal Umbrella Policy Purpose',
          type: 'callout',
          content: 'Umbrella policies provide additional liability limits AND fill gaps in underlying coverage. Typical limits range from $1,000,000 to $5,000,000+ for the whole family.'
        },
        {
          title: 'How Umbrella Works',
          type: 'list',
          items: [
            'Underlying policies exhausted first',
            'Umbrella covers excess (up to limit)',
            'Some claims covered only by umbrella (with SIR)'
          ]
        },
        {
          title: 'Self-Insured Retention (SIR)',
          type: 'text',
          content: 'For claims covered by umbrella but NOT underlying, the SIR acts as a deductible (typically $250-$10,000). Examples include libel, slander, and invasion of privacy claims.'
        },
        {
          title: 'Underlying Coverage Requirements',
          type: 'table',
          headers: ['Policy', 'Typical Minimum'],
          rows: [
            ['Auto liability', '$250,000/$500,000'],
            ['Homeowners liability', '$300,000'],
            ['Watercraft', '$300,000']
          ]
        },
        {
          title: 'Umbrella Example',
          type: 'table',
          headers: ['Coverage', 'Amount'],
          rows: [
            ['Judgment against you', '$1,500,000'],
            ['Auto liability pays', '$300,000'],
            ['Umbrella pays', '$1,200,000'],
            ['Your cost', '$0']
          ]
        },
        {
          title: 'Without Umbrella',
          type: 'warning',
          content: 'Without umbrella, you would pay $1,200,000 out of pocket. Your home, income, and assets would all be at risk.'
        },
        {
          title: 'What Umbrella Covers',
          type: 'list',
          items: [
            'Bodily injury liability',
            'Property damage liability',
            'Personal injury (libel, slander, defamation)',
            'Broader geographic coverage',
            'Legal defense costs'
          ]
        },
        {
          title: 'Umbrella Exclusions',
          type: 'list',
          items: [
            'Business activities',
            'Professional liability',
            'Workers compensation',
            'Intentional acts',
            'Contractual liability (some)'
          ]
        },
        {
          title: 'Who Needs Umbrella?',
          type: 'list',
          items: [
            'Anyone with assets to protect',
            'Visible career/public profile',
            'Teen drivers',
            'Swimming pool owners',
            'Rental property owners',
            'Pet owners (especially certain breeds)',
            'Frequent entertainers'
          ]
        },
        {
          title: 'Professional Liability Insurance',
          type: 'list',
          items: [
            'Errors and Omissions (E&O): For professional services - financial advisors, insurance agents, consultants, real estate agents',
            'Malpractice Insurance: For licensed professionals - doctors, lawyers, accountants, architects/engineers',
            'Directors and Officers (D&O): For corporate boards/executives - wrongful act claims, shareholder suits, regulatory actions'
          ]
        },
        {
          title: 'Claims-Made vs. Occurrence',
          type: 'table',
          headers: ['Type', 'Coverage Trigger'],
          rows: [
            ['Occurrence', 'When incident happens'],
            ['Claims-made', 'When claim is filed']
          ]
        },
        {
          title: 'Tail Coverage',
          type: 'text',
          content: 'Tail coverage provides an extended reporting period, critical when leaving practice. It covers claims filed after the policy ends for incidents that occurred during the policy period.'
        },
        {
          title: 'Other Important Coverages',
          type: 'list',
          items: [
            'Flood Insurance: Not covered by homeowners; NFIP; required in designated flood zones; max $250,000 dwelling / $100,000 contents',
            'Earthquake Insurance: Not covered by homeowners; high deductibles (10-25% of value); critical in seismic zones',
            'Identity Theft Coverage: Credit monitoring, recovery expenses, legal fees, lost wages',
            'Special Events Coverage: Weddings, parties, liability for event'
          ]
        },
        {
          title: 'Annual Review Checklist',
          type: 'list',
          items: [
            'Update home value (inflation)',
            'Review vehicle list',
            'Assess liability exposure',
            'Check special items (jewelry, art)',
            'Verify umbrella requirements met',
            'Update beneficiaries (life insurance)'
          ]
        },
        {
          title: 'Exam Tip: SAFE Mnemonic',
          type: 'warning',
          content: 'Separate Policies Needed: Specialty equipment, Auto (for vehicle damage), Flood, Earthquake.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Umbrella provides excess liability AND fills coverage gaps',
            'Self-insured retention applies when umbrella covers what underlying does not',
            'Underlying policy minimums must be met for umbrella eligibility',
            'Professional liability uses claims-made—tail coverage critical when leaving',
            'Flood and earthquake require separate policies beyond homeowners'
          ]
        }
      ]
    }
  }
];

export default CFP_RIS4_LESSONS;
