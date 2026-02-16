/**
 * CFP Risk Management Lessons - Fundamentals and Concepts
 * Domain 3: Risk Management and Insurance Planning (12% of exam)
 * Blueprint Area: RIS-1 - Risk Management Concepts
 * 
 * Topics: Risk analysis, management techniques, insurance basics
 */

import type { Lesson } from '../../../types';

export const CFP_RIS1_LESSONS: Lesson[] = [
  {
    id: 'CFP-RIS-L001',
    courseId: 'cfp',
    section: 'CFP-RISK',
    title: 'Principles of Risk Management',
    description: 'Define and classify types of risk, apply the risk management process, and evaluate appropriate strategies',
    order: 1,
    duration: 25,
    difficulty: 'beginner',
    topics: [
      'Define and classify types of risk',
      'Apply the risk management process',
      'Distinguish between risk management techniques',
      'Evaluate appropriate strategies for different risks'
    ],
    blueprintArea: 'RIS-1',
    content: {
      sections: [
        {
          title: 'Understanding Risk',
          type: 'text',
          content: 'Risk is the uncertainty concerning the occurrence of a loss. Understanding the different types of risk is fundamental to developing appropriate risk management strategies for clients.'
        },
        {
          title: 'Pure Risk vs. Speculative Risk',
          type: 'table',
          headers: ['Type', 'Definition', 'Insurable?'],
          rows: [
            ['Pure risk', 'Chance of loss only (no gain)', 'Yes'],
            ['Speculative risk', 'Chance of loss or gain', 'No']
          ]
        },
        {
          title: 'Other Risk Classifications',
          type: 'list',
          items: [
            'Static Risk: Losses from natural forces or human error',
            'Dynamic Risk: Losses from economic/societal changes',
            'Fundamental Risk: Affects large groups (war, recession)',
            'Particular Risk: Affects individuals (auto accident)',
            'Objective Risk: Actual variability of outcomes (statistical)',
            'Subjective Risk: Perceived uncertainty (psychological)'
          ]
        },
        {
          title: 'Personal Risk Exposures',
          type: 'list',
          items: [
            'Death - Loss of income, final expenses',
            'Disability - Loss of income, medical costs',
            'Poor Health - Medical expenses',
            'Unemployment - Loss of income',
            'Longevity - Outliving assets'
          ]
        },
        {
          title: 'Property and Liability Risk Exposures',
          type: 'text',
          content: 'Property risks include direct loss (damage to property itself) and indirect loss (consequential losses like lost rental income). Liability risks include personal liability (negligent acts), professional liability (malpractice, E&O), and business liability (product, premises).'
        },
        {
          title: 'The Risk Management Process',
          type: 'list',
          items: [
            'Step 1: Identify Risks - Personal/business exposures, property holdings, liability exposures, financial dependencies',
            'Step 2: Analyze Risks - Assess frequency (how often) and severity (how large)',
            'Step 3: Select Techniques - Choose from five risk management techniques',
            'Step 4: Implement - Execute the chosen strategy',
            'Step 5: Monitor and Review - Regular reassessment as circumstances change'
          ]
        },
        {
          title: 'Risk Analysis Matrix',
          type: 'table',
          headers: ['Frequency', 'Severity', 'Priority'],
          rows: [
            ['High', 'High', 'Avoid or reduce'],
            ['High', 'Low', 'Retain'],
            ['Low', 'High', 'Transfer (insure)'],
            ['Low', 'Low', 'Retain']
          ]
        },
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'The exam frequently tests the risk matrix. Remember: high severity/low frequency risks should be transferred (insured) because clients cannot afford to pay for losses themselves, but the low frequency makes insurance cost-effective.'
        },
        {
          title: 'Risk Management Techniques',
          type: 'text',
          content: 'Risk Avoidance eliminates the exposure entirely (don\'t buy a motorcycle). Risk Reduction includes loss prevention (reduce frequency via smoke detectors, security systems) and loss reduction (minimize severity via fire extinguishers, seatbelts). Risk Retention means accepting and paying for losses yourself through deductibles, self-insurance, or emergency funds. Risk Transfer shifts risk to another party through insurance, contracts (hold harmless clauses), or hedging. Risk Sharing distributes risk among parties through partnerships, joint ventures, or insurance pools.'
        },
        {
          title: 'Decision Framework',
          type: 'list',
          items: [
            'Don\'t risk more than you can afford to lose - Large potential losses should be transferred',
            'Don\'t risk a lot for a little - Premium cost should be reasonable relative to coverage',
            'Consider the odds - High-probability losses may be uninsurable or expensive'
          ]
        },
        {
          title: 'Exam Tip: ARRT-S Mnemonic',
          type: 'warning',
          content: 'Remember the five Risk Techniques with ARRT-S: Avoid, Reduce, Retain, Transfer, Share.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Pure risks (loss only possible) are insurable; speculative risks are not',
            'Risk management uses 5 techniques: avoid, reduce, retain, transfer, share',
            'High severity/low frequency risks should be transferred (insured)',
            'High frequency/low severity risks should be retained',
            'Risk management is an ongoing process, not a one-time decision'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-RIS-L002',
    courseId: 'cfp',
    section: 'CFP-RISK',
    title: 'Insurance Fundamentals',
    description: 'Understand requirements for insurable risks, key insurance principles, and policy components',
    order: 2,
    duration: 30,
    difficulty: 'beginner',
    topics: [
      'Understand requirements for insurable risks',
      'Explain key insurance principles',
      'Distinguish policy types and components',
      'Apply insurance selection criteria'
    ],
    blueprintArea: 'RIS-1',
    content: {
      sections: [
        {
          title: 'Requirements for Insurable Risks',
          type: 'list',
          items: [
            'Large Number of Similar Exposures - Law of large numbers enables accurate predictions',
            'Accidental and Unintentional Losses - Must be beyond insured\'s control, fortuitous occurrence',
            'Determinable and Measurable Loss - Loss must be identifiable and quantifiable',
            'Not Catastrophic - No single event should cause massive losses; war/nuclear often excluded',
            'Economically Feasible Premium - Premium must be affordable (less than expected loss + admin costs)'
          ]
        },
        {
          title: 'Principle of Indemnity',
          type: 'text',
          content: 'The insured should be restored to pre-loss condition—no more, no less. You cannot profit from insurance, which prevents moral hazard. Exceptions include life insurance (valued contract) and valued policies (agreed amount).'
        },
        {
          title: 'Insurable Interest',
          type: 'callout',
          content: 'You must have a financial stake in the insured subject. For property insurance, insurable interest is required at time of loss. For life insurance, insurable interest is required only at policy inception. Those with insurable interest include yourself, spouse, children, business partners, key employees, and creditors (to extent of debt).'
        },
        {
          title: 'Subrogation',
          type: 'text',
          content: 'Subrogation is the insurer\'s right to recover from a responsible third party. Example: Someone hits your car ($10,000 damage), your insurer pays you $10,000, then the insurer sues the negligent driver for $10,000. This prevents double recovery and helps reduce premiums.'
        },
        {
          title: 'Utmost Good Faith',
          type: 'list',
          items: [
            'Representations - Statements made in the application',
            'Concealment - Failure to disclose material facts',
            'Warranty - Statements guaranteed to be true',
            'Misrepresentation - False material statements'
          ]
        },
        {
          title: 'Insurance Contract Components (DICEE)',
          type: 'list',
          items: [
            'Declarations (Dec Page) - Who, what, when, where, how much: named insured, property, policy period, coverage amounts, premium',
            'Insuring Agreement - What\'s covered (named perils or open perils/all-risk)',
            'Conditions - Rules: notice requirements, claims procedures, cancellation, duties after loss',
            'Exclusions - What\'s NOT covered: intentional acts, war, nuclear hazard, wear and tear',
            'Endorsements/Riders - Modifications to base policy: add coverage, remove exclusions, change limits'
          ]
        },
        {
          title: 'Valued vs. Indemnity Contracts',
          type: 'table',
          headers: ['Type', 'Pays', 'Example'],
          rows: [
            ['Valued', 'Agreed amount', 'Life insurance'],
            ['Indemnity', 'Actual loss', 'Property insurance']
          ]
        },
        {
          title: 'Occurrence vs. Claims-Made',
          type: 'table',
          headers: ['Type', 'Coverage Trigger'],
          rows: [
            ['Occurrence', 'When event happens'],
            ['Claims-made', 'When claim is filed']
          ]
        },
        {
          title: 'Policy Selection Criteria',
          type: 'list',
          items: [
            'Financial Strength - Rating agencies: A.M. Best, Standard & Poor\'s, Moody\'s',
            'Policy Provisions - Coverage breadth, exclusions, conditions, renewal terms',
            'Cost Considerations - Premium, deductibles, coinsurance, discounts available',
            'Service Reputation - Claims handling, customer service, agent support'
          ]
        },
        {
          title: 'Exam Tip: Life Insurance Insurable Interest',
          type: 'warning',
          content: 'Remember: For life insurance, insurable interest is required only at policy inception, NOT at the time of claim. A policy remains valid even if the insurable interest relationship ends later.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Insurable risks require: large numbers, accidental losses, measurable, not catastrophic',
            'Indemnity principle: restore to pre-loss position, no profit',
            'Insurable interest required: property (at loss), life (at inception)',
            'Subrogation allows insurer to recover from responsible parties',
            'Open perils covers everything except exclusions; named perils only covers listed items'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-RIS-L003',
    courseId: 'cfp',
    section: 'CFP-RISK',
    title: 'Insurance Pricing and Underwriting',
    description: 'Understand how insurance premiums are calculated and apply deductibles and coinsurance concepts',
    order: 3,
    duration: 25,
    difficulty: 'intermediate',
    topics: [
      'Understand how insurance premiums are calculated',
      'Explain the underwriting process',
      'Apply deductibles and coinsurance concepts',
      'Distinguish rating classifications'
    ],
    blueprintArea: 'RIS-1',
    content: {
      sections: [
        {
          title: 'Premium Calculation',
          type: 'text',
          content: 'Premium = Pure Premium + Expense Loading. Pure Premium is the expected losses per exposure, while Expense Loading covers administrative costs, commissions, and profit.'
        },
        {
          title: 'Rating Factors by Insurance Type',
          type: 'list',
          items: [
            'Life Insurance: Age, gender, health status, occupation, lifestyle (smoking, hobbies), family health history',
            'Auto Insurance: Age, gender, marital status, driving record, vehicle type, location, annual mileage, credit score',
            'Homeowners Insurance: Location (fire/crime risk), construction type, age of home, coverage amount, deductible, claims history'
          ]
        },
        {
          title: 'The Underwriting Process',
          type: 'text',
          content: 'The purpose of underwriting is to select and classify applicants so the premium matches the risk. Information sources include application, medical exams, MIB (Medical Information Bureau), inspection reports, MVR (Motor Vehicle Records), and credit reports.'
        },
        {
          title: 'Underwriting Classification Categories',
          type: 'table',
          headers: ['Category', 'Risk Level'],
          rows: [
            ['Preferred', 'Better than average risk'],
            ['Standard', 'Average expected risk'],
            ['Substandard/Rated', 'Higher than average risk'],
            ['Declined', 'Uninsurable risk']
          ]
        },
        {
          title: 'Adverse Selection',
          type: 'callout',
          content: 'Adverse selection is the tendency of high-risk individuals to seek more insurance. Insurers use underwriting to combat this, as it can result in risk pooling concerns and may lead to policy modifications.'
        },
        {
          title: 'Types of Deductibles',
          type: 'list',
          items: [
            'Flat/Straight Deductible: Fixed dollar amount per loss (e.g., $500 deductible; $3,000 loss pays $2,500)',
            'Percentage Deductible: Percentage of covered value, common in hurricane/earthquake coverage (e.g., 2% on $500,000 home = $10,000)',
            'Aggregate Deductible: Total deductible for policy period (e.g., first $2,000 of annual claims paid by insured)',
            'Split Deductible: Different deductibles for different perils'
          ]
        },
        {
          title: 'Deductible Selection Strategy',
          type: 'text',
          content: 'Higher deductible = Lower premium. Consider emergency fund availability, premium savings vs. risk, and claim frequency expectations when selecting deductibles.'
        },
        {
          title: 'Property Insurance Coinsurance',
          type: 'text',
          content: 'Coinsurance encourages insurance to value and discourages underinsurance. The coinsurance formula is: Payment = (Coverage Carried ÷ Coverage Required) × Loss - Deductible. Coverage Required = Property Value × Coinsurance % (typically 80%).'
        },
        {
          title: 'Coinsurance Example',
          type: 'table',
          headers: ['Element', 'Value'],
          rows: [
            ['Building value', '$500,000'],
            ['Coinsurance requirement', '80%'],
            ['Required coverage', '$400,000'],
            ['Actual coverage', '$300,000'],
            ['Loss', '$100,000'],
            ['Deductible', '$1,000'],
            ['Payment calculation', '($300K ÷ $400K) × $100K - $1K = $74,000'],
            ['Insured pays', '$26,000 (becomes a "co-insurer")']
          ]
        },
        {
          title: 'Policy Limits',
          type: 'list',
          items: [
            'Per-Occurrence Limit: Maximum for single event (e.g., $100,000 per accident liability)',
            'Aggregate Limit: Maximum for policy period (e.g., $300,000 annual aggregate)',
            'Split Limits: Separate limits for different coverages (e.g., Auto 100/300/50: $100K per person BI, $300K per accident BI, $50K PD)',
            'Combined Single Limit (CSL): One limit for all coverages (e.g., $500,000 CSL for any combination of BI/PD)'
          ]
        },
        {
          title: 'Exam Tip: Coinsurance Formula',
          type: 'warning',
          content: 'Remember PSSD for underwriting categories: Preferred, Standard, Substandard, Declined. And always apply the coinsurance penalty formula when coverage carried is less than 80% of property value.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Premiums = Pure premium (expected losses) + Expense loading',
            'Underwriting classifies risks: Preferred, Standard, Substandard, Declined',
            'Higher deductibles reduce premiums but increase out-of-pocket risk',
            'Coinsurance penalizes underinsurance with formula: (Coverage Carried ÷ Required) × Loss',
            'Adverse selection causes high-risk individuals to seek more coverage'
          ]
        }
      ]
    }
  }
];

export default CFP_RIS1_LESSONS;
