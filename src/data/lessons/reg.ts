import { Lesson } from '../../types';

export const regLessons: Lesson[] = [
  // ==========================================
  // AREA I: ETHICS, PROFESSIONAL RESPONSIBILITIES & FEDERAL TAX PROCEDURES (8 Lessons)
  // ==========================================
  {
      id: 'reg-001',
      section: 'REG',
      title: 'Treasury Circular 230: Practice Before IRS',
      description: 'Rules governing authority to practice and duties of practitioners.',
      order: 1,
      duration: 55,
      difficulty: 'beginner',
      topics: ['Circular 230', 'Ethics', 'IRS'],
      content: {
          sections: [
              {
                  title: 'Authority to Practice',
                  type: 'list',
                  content: [
                      { term: 'Attorneys', definition: 'Any attorney in good standing.' },
                      { term: 'CPAs', definition: 'Any CPA in good standing.' },
                      { term: 'Enrolled Agents', definition: 'Passed IRS exam.' }
                  ]
              },
              {
                  title: 'Best Practices',
                  type: 'text',
                  content: `1. Communicate clearly with the client.
2. Establish facts and determine relevance.
3. Advise client regarding consequences of conclusions.`
              },
              {
                  title: 'Contingent Fees',
                  type: 'text',
                  content: `Generally **prohibited** for tax return preparation.
                  
**Exceptions (Allowed):**
• IRS Examination (Audit).
• Claim for refund of interest/penalties.
• Judicial proceeding.`
              }
          ]
      }
  },
  {
      id: 'reg-002',
      section: 'REG',
      title: 'Tax Preparer Penalties',
      description: 'Civil penalties for understatement of liability.',
      order: 2,
      duration: 50,
      difficulty: 'intermediate',
      topics: ['Penalties', 'Compliance'],
      content: {
          sections: [
              {
                  title: 'Key Penalties',
                  type: 'table',
                  headers: ['Violation', 'Penalty Amount', 'Criteria'],
                  rows: [
                      ['Unreasonable Position', 'Greater of $1,000 or 50% of income', 'No substantial authority'],
                      ['Willful/Reckless Conduct', 'Greater of $5,000 or 75% of income', 'Intentional disregard'],
                      ['Failure to Provide Copy', '$50', 'Must give copy to taxpayer'],
                      ['Failure to Sign', '$50', 'Preparer must sign return']
                  ]
              },
              {
                  title: 'Avoidance Standards',
                  type: 'list',
                  content: [
                      { term: 'Frivolous', definition: '< 20% chance. Never allowed.' },
                      { term: 'Reasonable Basis', definition: '> 20% chance. Must disclose to avoid penalty.' },
                      { term: 'Substantial Authority', definition: '> 40% chance. Avoids most penalties undeclarified.' },
                      { term: 'More Likely Than Not', definition: '> 50% chance. Required for Tax Shelters.' }
                  ]
              }
          ]
      }
  },

  // ==========================================
  // AREA II: BUSINESS LAW (10 Lessons)
  // ==========================================
  {
      id: 'reg-009',
      section: 'REG',
      title: 'Agency: Formation & Authority',
      description: 'The Principal-Agent relationship.',
      order: 9,
      duration: 50,
      difficulty: 'beginner',
      topics: ['Business Law', 'Agency'],
      content: {
          sections: [
              {
                  title: 'Formation',
                  type: 'text',
                  content: `Requires:
• Consent (Agreement between P and A).
• Principal with capacity (Not a minor).
• Writing? No, unless satisfying Statute of Frauds (e.g., land, > 1 year).`
              },
              {
                  title: 'Types of Authority',
                  type: 'list',
                  content: [
                      { term: 'Actual Express', definition: 'P tells A to do it ("Go buy this car").' },
                      { term: 'Actual Implied', definition: 'Necessary to carry out express duties (Business manager hiring staff).' },
                      { term: 'Apparent', definition: 'P gives Third Party the impression that A has authority (Title, Uniform). P is bound!' }
                  ]
              }
          ]
      }
  },
  {
      id: 'reg-011',
      section: 'REG',
      title: 'Contracts: Formation & Enforceability',
      description: 'Offer, Acceptance, Consideration, and Defenses.',
      order: 11,
      duration: 60,
      difficulty: 'intermediate',
      topics: ['Business Law', 'Contracts'],
      content: {
          sections: [
              {
                  title: 'Elements',
                  type: 'text',
                  content: `1. **Offer:** Intent, certain terms, communicated.
2. **Acceptance:** Mirror Image Rule (Common Law).
3. **Consideration:** Bargained-for exchange of legal value. (Gift promises not binding).`
              },
              {
                  title: 'Statute of Frauds (MY LEGS)',
                  type: 'text',
                  content: `Contracts that MUST be in writing to be enforceable:
**M** - Marriage
**Y** - Year (Cannot be performed within 1 year)
**L** - Land
**E** - Executors
**G** - Goods > $500 (UCC)
**S** - Surety (Guaranty)`
              }
          ]
      }
  },

  // ==========================================
  // AREA III: FEDERAL TAXATION OF INDIVIDUALS (17 Lessons)
  // ==========================================
  {
      id: 'reg-019',
      section: 'REG',
      title: 'Gross Income: Inclusions',
      description: 'What is taxable income? Wages, Interest, Dividends.',
      order: 19,
      duration: 60,
      difficulty: 'beginner',
      topics: ['Tax', 'Individual'],
      content: {
          sections: [
              {
                  title: 'Formula',
                  type: 'text',
                  content: `Gross Income - Adjustments = AGI.
AGI - Standard/Itemized Deduction = Taxable Income.`
              },
              {
                  title: 'Taxable Items',
                  type: 'list',
                  content: [
                      { term: 'Wages', definition: 'Form W-2. FMV of property received is also income.' },
                      { term: 'Interest', definition: 'Schedule B. Municipal bond interest is non-taxable (Exclusion).' },
                      { term: 'Dividends', definition: 'Qualified dividends taxed at preferential rates (0/15/20%).' },
                      { term: 'Alimony', definition: 'Pre-2019 divorce: Income. Post-2019 divorce: Not Income.' }
                  ]
              }
          ]
      }
  },
  {
      id: 'reg-021',
      section: 'REG',
      title: 'H.R. 1: Tip Income Exclusion (Effective July 1, 2026)',
      description: 'New legislation exempting service industry tips from federal income tax.',
      order: 21,
      duration: 40,
      difficulty: 'beginner',
      topics: ['Tax', 'H.R. 1', 'New Law'],
      content: {
          sections: [
              {
                  title: 'The Change (H.R. 1)',
                  type: 'text',
                  content: `Effective July 1, 2026, tips received by service industry employees are **100% excluded** from Gross Income for federal income tax purposes.
                  
*Note:* They remain subject to FICA (Payroll) taxes unless specified otherwise.`
              },
              {
                  title: 'Reporting',
                  type: 'text',
                  content: `Employees must still report tips to employer for payroll tax purposes, but will deduct them as an "Above-the-Line" adjustment or direct exclusion on Form 1040.`
              }
          ]
      }
  },
  {
      id: 'reg-024',
      section: 'REG',
      title: 'Qualified Business Income Deduction (199A)',
      description: 'The 20% deduction for pass-through entities.',
      order: 24,
      duration: 65,
      difficulty: 'advanced',
      topics: ['QBI', 'Tax'],
      content: {
          sections: [
              {
                  title: 'The Basic Deduction',
                  type: 'text',
                  content: `20% of Qualified Business Income (QBI) for Sole Proprietorships, S-Corps, and Partnerships.`
              },
              {
                  title: 'Limitations',
                  type: 'text',
                  content: `If Taxable Income is above the threshold ($191,950 Single / $383,900 MFJ for 2024 - *Indexed for inflation*):
                  
**SSTB (Specified Service Trade or Business):**
• Examples: Health, Law, Accounting, Performing Arts.
• Deduction phases out completely. No QBI for high earners in SSTB.

**Non-SSTB:**
• Deduction limited to greater of:
  1. 50% of W-2 Wages.
  2. 25% of W-2 Wages + 2.5% of Unadjusted Basis of Property.`
              }
          ]
      }
  },
  {
      id: 'reg-025',
      section: 'REG',
      title: 'H.R. 1: SALT Deduction Changes',
      description: 'Removal/Modification of the $10,000 SALT Cap.',
      order: 25,
      duration: 45,
      difficulty: 'intermediate',
      topics: ['SALT', 'Itemized Deductions', 'H.R. 1'],
      content: {
          sections: [
              {
                  title: 'The Old Rule (TCJA)',
                  type: 'text',
                  content: `State and Local Tax (SALT) deduction on Schedule A was capped at $10,000 total.`
              },
              {
                  title: 'New Rule (Effective July 1, 2026)',
                  type: 'text',
                  content: `H.R. 1 **removes** the cap for households with AGI under $400,000 and doubles the cap to $20,000 for others.
                  
*Strategy:* Taxpayers in high-tax states (NY, CA) should itemize if total SALT > Standard Deduction.`
              }
          ]
      }
  },

  // ==========================================
  // AREA IV: FEDERAL TAXATION OF ENTITIES (18 Lessons)
  // ==========================================
  {
      id: 'reg-037',
      section: 'REG',
      title: 'C Corps: Formation (Section 351)',
      description: 'Tax-free incorporation requirements.',
      order: 37,
      duration: 55,
      difficulty: 'advanced',
      topics: ['C Corp', 'Formation'],
      content: {
          sections: [
              {
                  title: 'The 80% Control Test',
                  type: 'text',
                  content: `No gain/loss recognized if:
1. Contributors transfer **Property** (not services).
2. Contributors receive **Stock** (not boot).
3. Contributors have **80% Control** immediately after transaction.`
              },
              {
                  title: 'Boot',
                  type: 'text',
                  content: `If cash/debt is received, Gain is recognized up to the lesser of:
• Realized Gain.
• Boot Received.`
              },
              {
                  title: 'Basis',
                  type: 'text',
                  content: `**Shareholder Basis:** NBV of Property + Gain Recognized - Boot Received.
**Corporation Basis:** NBV of Property + Gain Recognized by Shareholder.`
              }
          ]
      }
  },
  {
      id: 'reg-042',
      section: 'REG',
      title: 'S Corps: Eligibility & Election',
      description: 'Requirements to be an S Corporation.',
      order: 42,
      duration: 55,
      difficulty: 'beginner',
      topics: ['S Corp', 'Flow-Through'],
      content: {
          sections: [
              {
                  title: 'Eligibility Requirements',
                  type: 'list',
                  content: [
                      { term: 'Shareholders', definition: 'Max 100. (Family counts as 1). US Citizens/Residents only. Individuals/Estates/Trusts only (No Corps/Partnerships).' },
                      { term: 'Stock', definition: 'One class of stock only. (Voting rights can differ, but economic rights must be identical).' },
                      { term: 'Corporation', definition: 'Must be a domestic corporation.' }
                  ]
              },
              {
                  title: 'Election',
                  type: 'text',
                  content: `File Form 2553 by **March 15th** (for calendar year) to be effective for current year.`
              }
          ]
      }
  },
  {
      id: 'reg-050',
      section: 'REG',
      title: 'Partnerships: Formation',
      description: 'Section 721 non-recognition and basis rules.',
      order: 50,
      duration: 60,
      difficulty: 'intermediate',
      topics: ['Partnership', 'Tax'],
      content: {
          sections: [
              {
                  title: 'General Rule (No Control Test)',
                  type: 'text',
                  content: `Unlike C-Corps, there is **no 80% control requirement** for tax-free contribution to a partnership.`
              },
              {
                  title: 'Services',
                  type: 'warning',
                  content: `If a partner contributes **Services** for a capital interest, it is **Ordinary Income** to the partner at FMV.`
              },
              {
                  title: 'Liabilities Assumed',
                  type: 'text',
                  content: `If the partnership assumes a partner's liability:
• Partner's Basis decreases.
• If Liability > Basis -> **Gain** is recognized (cannot have negative basis).`
              }
          ]
      }
  }
];
