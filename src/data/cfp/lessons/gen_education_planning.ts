/**
 * CFP Domain 2: General Principles of Financial Planning
 * Area GEN-4: Education Planning
 *
 * These lessons cover 529 plans, Coverdell ESAs,
 * education tax benefits, and financial aid considerations.
 */

import type { Lesson } from '../../../types';

export const CFP_GEN4_LESSONS: Lesson[] = [
  {
    id: 'CFP-GEN-L016',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    title: '529 Plans - Qualified Tuition Programs',
    description: 'Understand 529 plan types, contribution rules, tax benefits, and qualified expenses for education savings',
    order: 16,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['529 Plans', 'College Savings Plans', 'Prepaid Tuition Plans', 'Super-Funding', 'SECURE 2.0', 'Education Expenses'],
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: '529 Plans are state-sponsored, tax-advantaged savings accounts designed to encourage saving for future education costs. Understanding the different types, contribution rules, and qualified expenses is essential for CFP® professionals advising families on education planning strategies.'
        },
        {
          title: 'Two Types of 529 Plans',
          type: 'text',
          content: 'There are two main types of 529 plans, each with different features and benefits.'
        },
        {
          title: '529 College Savings Plans',
          type: 'table',
          headers: ['Feature', 'Description'],
          rows: [
            ['Contributions', 'Cash only, invested in mutual fund-like options'],
            ['Control', 'Account owner controls investments and distributions'],
            ['Use', 'Any eligible institution nationwide'],
            ['Growth', 'Tax-deferred; tax-free if used for qualified expenses']
          ]
        },
        {
          title: 'Prepaid Tuition Plans',
          type: 'table',
          headers: ['Feature', 'Description'],
          rows: [
            ['Contributions', 'Purchase tuition credits/units'],
            ['Guarantee', 'Covers future tuition regardless of increases'],
            ['Use', 'Usually limited to participating schools (often in-state)'],
            ['Status', 'Declining - fewer states offer them']
          ]
        },
        {
          title: '⚠️ Exam Tip: 529 Plan Types',
          type: 'warning',
          content: 'Most exam questions focus on 529 College Savings Plans. Know both types exist, but expect the majority of questions to test College Savings Plan rules.'
        },
        {
          title: 'Key Tax Benefits',
          type: 'text',
          content: '529 plans offer significant federal and state tax advantages for education savers.'
        },
        {
          title: 'Federal Tax Treatment',
          type: 'table',
          headers: ['Benefit', 'Description'],
          rows: [
            ['No federal deduction', 'Contributions are NOT federally tax-deductible'],
            ['Tax-deferred growth', 'Earnings grow without annual taxation'],
            ['Tax-free withdrawals', 'For qualified education expenses'],
            ['Gift tax exclusion', 'Contributions qualify for annual exclusion']
          ]
        },
        {
          title: 'State Tax Treatment',
          type: 'text',
          content: 'Many states offer **state income tax deductions** for contributions:\n\n• Deduction limited to in-state plans for some states\n• Some states offer deduction for any plan\n• Varies widely - know the client\'s state'
        },
        {
          title: 'Contribution Rules',
          type: 'text',
          content: 'There\'s no annual federal contribution limit for 529 plans, but several considerations apply:'
        },
        {
          title: 'Contribution Considerations',
          type: 'table',
          headers: ['Consideration', 'Details'],
          rows: [
            ['Gift tax', 'Contributions over $19,000/year (2026) per beneficiary use lifetime exclusion'],
            ['State limits', 'Aggregate limits typically $300,000-$550,000 per beneficiary'],
            ['Income limits', 'NONE - anyone can contribute regardless of income']
          ]
        },
        {
          title: '📊 Super-Funding (5-Year Election)',
          type: 'example',
          content: 'Contributors can make a lump sum contribution and spread it over 5 years for gift tax purposes.\n\n**2026 Example:**\n• Maximum super-fund amount: $19,000 × 5 = **$95,000**\n• Married couple splitting gifts: $38,000 × 5 = **$190,000**\n\n**Rules:**\n• Must file Form 709 each year\n• Contributor must survive 5 years or excess reverts to estate\n• No additional gifts to that beneficiary during 5-year period'
        },
        {
          title: 'SECURE 2.0 Act: 529 to Roth IRA Rollover',
          type: 'text',
          content: '**Effective 2024**: Unused 529 funds can be rolled to a **Roth IRA** for the beneficiary. This is a major planning opportunity for families with excess education savings.'
        },
        {
          title: '529 to Roth IRA Rollover Requirements',
          type: 'table',
          headers: ['Requirement', 'Detail'],
          rows: [
            ['Account age', '529 must be open 15+ years'],
            ['Contribution age', 'Contributions from last 5 years excluded'],
            ['Annual limit', 'Subject to Roth IRA contribution limit ($7,500 in 2026)'],
            ['Lifetime limit', '$35,000 maximum rollover per beneficiary'],
            ['Income test', 'Beneficiary must have earned income']
          ]
        },
        {
          title: '🧠 Memory Aid: SECURE 2.0 Roth Rollover',
          type: 'callout',
          content: 'Remember the key numbers: **15 years** (account age), **$35K** (lifetime limit), **5-year lookback** (recent contributions excluded).'
        },
        {
          title: 'Qualified Education Expenses',
          type: 'text',
          content: 'Understanding what qualifies for tax-free 529 withdrawals is critical for exam success.'
        },
        {
          title: 'Higher Education (Tax-Free Qualified)',
          type: 'list',
          content: [
            { term: 'Tuition and fees', definition: 'Required for enrollment' },
            { term: 'Room and board', definition: 'If enrolled at least half-time' },
            { term: 'Books and supplies', definition: 'Required for courses' },
            { term: 'Computers and equipment', definition: 'Required for enrollment' },
            { term: 'Special needs services', definition: 'For special needs beneficiaries' },
            { term: 'Student loan repayment', definition: 'Up to $10,000 lifetime (SECURE Act)' }
          ]
        },
        {
          title: 'K-12 Tuition (Limited)',
          type: 'text',
          content: '• Up to **$10,000 per year** per beneficiary\n• **Tuition only** - not books, supplies, or room'
        },
        {
          title: 'Apprenticeship Programs',
          type: 'text',
          content: 'Registered apprenticeship programs now qualify for fees, books, supplies, and equipment.'
        },
        {
          title: 'Non-Qualified Distributions',
          type: 'text',
          content: 'If funds are used for non-qualified expenses, different tax treatment applies:'
        },
        {
          title: 'Non-Qualified Distribution Tax Treatment',
          type: 'table',
          headers: ['Component', 'Tax Treatment'],
          rows: [
            ['Contributions', 'Return tax-free (already taxed)'],
            ['Earnings', 'Taxed as ordinary income + 10% penalty']
          ]
        },
        {
          title: 'Penalty Waivers',
          type: 'text',
          content: 'The 10% penalty is waived if:\n\n• Beneficiary receives tax-free scholarship (to extent of scholarship)\n• Beneficiary attends U.S. military academy\n• Beneficiary dies or becomes disabled\n• Beneficiary receives qualifying employer education assistance'
        },
        {
          title: 'Investment Options',
          type: 'table',
          headers: ['Type', 'Description'],
          rows: [
            ['Age-based', 'Automatically becomes more conservative as child ages'],
            ['Risk-based', 'Choose aggressive, moderate, or conservative'],
            ['Static/Individual', 'Choose specific funds (stocks, bonds, etc.)']
          ]
        },
        {
          title: '⚠️ Investment Change Limit',
          type: 'warning',
          content: 'Can change investment strategy **twice per year**. However, you can change anytime when **changing beneficiaries**.'
        },
        {
          title: 'Account Ownership and Control',
          type: 'table',
          headers: ['Role', 'Rights'],
          rows: [
            ['Account Owner', 'Contributes, controls investments, requests distributions, can change beneficiary'],
            ['Beneficiary', 'Person whose education expenses are paid; no control rights']
          ]
        },
        {
          title: 'Changing Beneficiaries',
          type: 'text',
          content: 'Can change to another **member of the family** without tax consequences:\n\n• Siblings, children, parents, grandparents\n• First cousins, aunts, uncles\n• In-laws of the above\n• Spouse of the beneficiary'
        },
        {
          title: 'Financial Aid Impact (FAFSA Treatment)',
          type: 'table',
          headers: ['Owner Type', 'EFC Impact'],
          rows: [
            ['Parent-owned', 'Counted as parental asset (5.64% maximum)'],
            ['Student-owned', 'Counted as student asset (higher impact)'],
            ['Grandparent-owned', 'Previously distributions as untaxed income (now simplified)']
          ]
        },
        {
          title: 'FAFSA Simplification Act (2024)',
          type: 'callout',
          content: 'Grandparent-owned 529s no longer count against student aid under the FAFSA Simplification Act.'
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            '**529 College Savings Plans** = investment accounts with tax-free growth for education',
            '**No federal deduction**, but many states offer deductions',
            '**Super-funding**: Up to 5 years of gifts at once ($95,000 single/$190,000 married in 2026)',
            '**SECURE 2.0**: Unused funds can roll to Roth IRA ($35,000 lifetime limit)',
            'Non-qualified withdrawals: **Earnings taxed + 10% penalty**'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-GEN-L017',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    title: 'Coverdell ESAs and Education Savings Bonds',
    description: 'Compare Coverdell ESA contribution limits, income restrictions, and K-12 advantages with 529 plans and savings bond education exclusions',
    order: 17,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Coverdell ESA', 'Education IRAs', 'Series EE Bonds', 'Series I Bonds', 'Education Savings', 'K-12 Education'],
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'Beyond 529 plans, Coverdell ESAs and certain savings bonds offer additional tax-advantaged education savings options. Understanding the differences helps advisors recommend the right mix of education funding vehicles for each client situation.'
        },
        {
          title: 'Coverdell Education Savings Accounts (ESAs)',
          type: 'text',
          content: 'Coverdell ESAs (formerly Education IRAs) provide tax-free growth for education expenses with some key limitations.'
        },
        {
          title: 'Coverdell ESA Overview',
          type: 'table',
          headers: ['Feature', 'Detail'],
          rows: [
            ['Annual contribution limit', '**$2,000** per beneficiary'],
            ['Contribution deadline', 'April 15 of following year'],
            ['Income limits', 'Phase-out applies (see below)'],
            ['Age limit', 'Beneficiary must be under 18 (exceptions for special needs)'],
            ['Distribution deadline', 'Funds must be used by age 30']
          ]
        },
        {
          title: 'Income Phase-Out (2026)',
          type: 'table',
          headers: ['Filing Status', 'Full Contribution', 'Phase-Out', 'No Contribution'],
          rows: [
            ['Single/HOH', '< $95,000', '$95,000 - $110,000', '> $110,000'],
            ['MFJ', '< $190,000', '$190,000 - $220,000', '> $220,000']
          ]
        },
        {
          title: 'Coverdell vs. 529 Comparison',
          type: 'table',
          headers: ['Feature', 'Coverdell ESA', '529 Plan'],
          rows: [
            ['Annual contribution limit', '$2,000', 'No limit (gift tax applies)'],
            ['Income limits', 'Yes (phase-out)', '**None**'],
            ['Age restrictions', 'Under 18 to contribute, 30 to use', '**None**'],
            ['K-12 expenses', 'Broad (tuition, books, supplies, uniforms)', '**Tuition only** ($10,000 max)'],
            ['Investment options', 'Self-directed (any investment)', 'Limited to plan options'],
            ['State tax deduction', '**No**', 'Often yes']
          ]
        },
        {
          title: 'Key Advantage of Coverdell',
          type: 'callout',
          content: '**Broader K-12 qualified expenses** - not just tuition, but also books and supplies, tutoring, uniforms, transportation, and computer equipment.'
        },
        {
          title: 'Distribution Rules',
          type: 'text',
          content: 'Coverdell ESAs offer different qualified expenses for higher education versus K-12.'
        },
        {
          title: 'Higher Education Qualified Expenses',
          type: 'text',
          content: 'Same as 529: tuition, fees, books, room & board, computer equipment.'
        },
        {
          title: 'Elementary/Secondary (K-12) Qualified Expenses',
          type: 'list',
          content: [
            { term: 'Tuition, fees, books, supplies', definition: 'Core educational expenses' },
            { term: 'Academic tutoring', definition: 'Supplemental instruction' },
            { term: 'Room and board', definition: 'If away from home' },
            { term: 'Uniforms', definition: 'Required school attire' },
            { term: 'Transportation', definition: 'To and from school' },
            { term: 'Extended day programs', definition: 'Before/after school care' }
          ]
        },
        {
          title: 'Non-Qualified Distributions',
          type: 'text',
          content: 'Same as 529:\n\n• Contributions return tax-free\n• Earnings taxed as ordinary income + **10% penalty**'
        },
        {
          title: '⚠️ Coordination with 529',
          type: 'warning',
          content: 'Can contribute to **both** Coverdell and 529 in same year for same beneficiary, but total education tax benefits cannot exceed actual qualified expenses. Expenses used for Coverdell can\'t also be used for 529 or AOTC/LLC.'
        },
        {
          title: 'Series EE and Series I Savings Bonds',
          type: 'text',
          content: 'Interest from EE and I bonds can be **tax-free** if used for qualified higher education expenses.'
        },
        {
          title: 'Education Tax Exclusion Requirements',
          type: 'table',
          headers: ['Requirement', 'Detail'],
          rows: [
            ['Bond issuance', 'Must be issued **after 1989**'],
            ['Owner age', 'Owner must be **at least 24** at issuance'],
            ['Ownership', 'Owner or co-owner must be taxpayer, spouse, or dependent'],
            ['Qualified expenses', 'Tuition and REQUIRED fees at eligible institution'],
            ['Registration', 'Cannot be in child\'s name']
          ]
        },
        {
          title: 'Income Limits (2026)',
          type: 'table',
          headers: ['Filing Status', 'Full Exclusion', 'Phase-Out', 'No Exclusion'],
          rows: [
            ['Single/HOH', '< $100,800', '$100,800 - $115,800', '> $115,800'],
            ['MFJ', '< $151,300', '$151,300 - $181,300', '> $181,300']
          ]
        },
        {
          title: 'Bond Exclusion Calculation',
          type: 'text',
          content: 'If qualified expenses are less than total bond proceeds, a partial exclusion applies:\n\n$$\\text{Excludable Interest} = \\text{Interest} \\times \\frac{\\text{Qualified Expenses}}{\\text{Bond Proceeds}}$$'
        },
        {
          title: '📊 Bond Exclusion Example',
          type: 'example',
          content: '**Bond redemption**: $15,000 (principal) + $3,000 (interest) = $18,000\n**Qualified expenses**: $12,000\n\n$$\\text{Excludable Interest} = \\$3,000 \\times \\frac{\\$12,000}{\\$18,000} = \\$2,000$$\n\n**Tax-free interest**: $2,000\n**Taxable interest**: $1,000'
        },
        {
          title: 'Coordination Rules',
          type: 'text',
          content: 'Understanding how multiple education accounts interact is crucial for planning.'
        },
        {
          title: 'Same Year Contributions',
          type: 'text',
          content: 'Can fund multiple accounts for same beneficiary:\n\n• 529 Plan\n• Coverdell ESA\n• UTMA/UGMA\n• Trust accounts'
        },
        {
          title: '⚠️ No Double-Dipping',
          type: 'warning',
          content: 'An expense can only qualify for **ONE** tax benefit:\n\n• 529 tax-free distribution, OR\n• Coverdell tax-free distribution, OR\n• AOTC/LLC tax credit, OR\n• Qualified scholarship\n\n**Strategy**: Use some expenses for tax credits (AOTC/LLC) and others for 529/Coverdell.'
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            '**Coverdell ESA**: $2,000/year limit, income phase-out, must use by age 30',
            '**Coverdell K-12 advantage**: Broader expenses (books, tutoring) vs. 529 tuition-only limit',
            '**Savings bonds education exclusion**: Owner must be 24+ at issuance',
            '**Bonds must be in parent/taxpayer name**, not child\'s name',
            '**Same expense cannot be used** for both 529/Coverdell AND education credits'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-GEN-L018',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    title: 'Education Tax Credits and Deductions',
    description: 'Compare AOTC and Lifetime Learning Credit, apply income phase-outs, and coordinate education credits with 529/Coverdell distributions',
    order: 18,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['American Opportunity Tax Credit', 'Lifetime Learning Credit', 'Student Loan Interest Deduction', 'Education Tax Benefits', 'Section 127'],
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'Education tax credits provide dollar-for-dollar reductions in tax liability, often more valuable than deductions. Understanding when to use AOTC vs. LLC and how to coordinate with 529 plans can save families thousands of dollars.'
        },
        {
          title: 'American Opportunity Tax Credit (AOTC)',
          type: 'text',
          content: 'The **most valuable** education tax credit for undergraduates.'
        },
        {
          title: 'AOTC Overview',
          type: 'table',
          headers: ['Feature', 'Detail'],
          rows: [
            ['Maximum credit', '**$2,500 per student per year**'],
            ['Calculation', '100% of first $2,000 + 25% of next $2,000'],
            ['Refundable portion', '**40% ($1,000) is refundable**'],
            ['Eligibility period', '**First 4 years** of post-secondary education'],
            ['Enrollment', 'At least **half-time**'],
            ['Felony drug conviction', '**Disqualifies**']
          ]
        },
        {
          title: 'AOTC Qualified Expenses',
          type: 'list',
          content: [
            { term: 'Tuition and required fees', definition: 'Costs required for enrollment' },
            { term: 'Course materials', definition: 'Books, supplies, equipment required for courses' },
            { term: 'NOT included', definition: 'Room and board, transportation, insurance' }
          ]
        },
        {
          title: 'AOTC Income Phase-Out (2026)',
          type: 'table',
          headers: ['Filing Status', 'Full Credit', 'Phase-Out', 'No Credit'],
          rows: [
            ['Single/HOH', '< $80,000', '$80,000 - $90,000', '> $90,000'],
            ['MFJ', '< $160,000', '$160,000 - $180,000', '> $180,000']
          ]
        },
        {
          title: 'Lifetime Learning Credit (LLC)',
          type: 'text',
          content: 'Broader eligibility than AOTC, but smaller benefit.'
        },
        {
          title: 'LLC Overview',
          type: 'table',
          headers: ['Feature', 'Detail'],
          rows: [
            ['Maximum credit', '**$2,000 per tax return** (not per student)'],
            ['Calculation', '20% of first $10,000 in expenses'],
            ['Refundable', '**No** - non-refundable credit'],
            ['Eligibility period', '**Unlimited** - any year, any number of years'],
            ['Enrollment', '**Any enrollment** - even one course'],
            ['Felony drug conviction', '**No restriction**']
          ]
        },
        {
          title: 'LLC Qualified Expenses',
          type: 'text',
          content: '• Tuition and required fees\n• Course materials if required to be purchased from institution\n• **NOT** included: Books purchased elsewhere, room and board'
        },
        {
          title: 'LLC Income Phase-Out (2026)',
          type: 'table',
          headers: ['Filing Status', 'Full Credit', 'Phase-Out', 'No Credit'],
          rows: [
            ['Single/HOH', '< $80,000', '$80,000 - $90,000', '> $90,000'],
            ['MFJ', '< $160,000', '$160,000 - $180,000', '> $180,000']
          ]
        },
        {
          title: 'AOTC vs. LLC Comparison',
          type: 'table',
          headers: ['Feature', 'AOTC', 'LLC'],
          rows: [
            ['Maximum', '$2,500/student', '$2,000/return'],
            ['Refundable', 'Yes (40%)', 'No'],
            ['Years available', '4 years only', 'Unlimited'],
            ['Enrollment', 'Half-time minimum', 'Even one course'],
            ['Professional degrees', 'No (undergrad only)', '**Yes**'],
            ['Graduate school', 'No', '**Yes**']
          ]
        },
        {
          title: '🧠 Memory Aid: AOTC vs. LLC',
          type: 'callout',
          content: '**AOTC = American = First 4 is the OPPORTUNITY**\n**LLC = Lifetime = LEARNING for LIFE (unlimited years)**\n\nUse AOTC for first 4 years of college; switch to LLC for 5th year or graduate school.'
        },
        {
          title: 'Choosing the Right Credit',
          type: 'text',
          content: '**Choose AOTC when:**\n• First 4 years of undergraduate\n• The student has no felony drug conviction\n• Need refundable credit (low tax liability)\n\n**Choose LLC when:**\n• Graduate school or professional degree\n• 5th year of undergraduate\n• Less than half-time enrollment\n• Taking courses for job skills (not degree)'
        },
        {
          title: 'Student Loan Interest Deduction',
          type: 'text',
          content: '**Above-the-line deduction** (reduces AGI regardless of itemizing).'
        },
        {
          title: 'Student Loan Interest Deduction Overview',
          type: 'table',
          headers: ['Feature', 'Detail'],
          rows: [
            ['Maximum deduction', '**$2,500 per year**'],
            ['Loan type', 'Any qualified education loan'],
            ['Interest only', 'Cannot deduct principal'],
            ['Dependency', 'Cannot claim if claimed as dependent']
          ]
        },
        {
          title: 'Student Loan Interest Income Phase-Out (2026)',
          type: 'table',
          headers: ['Filing Status', 'Full Deduction', 'Phase-Out', 'No Deduction'],
          rows: [
            ['Single/HOH', '< $80,000', '$80,000 - $95,000', '> $95,000'],
            ['MFJ', '< $165,000', '$165,000 - $195,000', '> $195,000']
          ]
        },
        {
          title: 'Qualified Loans',
          type: 'text',
          content: '**Qualified:**\n• Federal student loans\n• Private student loans\n• Loans from any lender for qualified education expenses\n\n**NOT Qualified:**\n• Loans from relatives\n• Employer plan loans\n• Loans from qualified retirement plans'
        },
        {
          title: '⚠️ Coordination with 529/Coverdell',
          type: 'warning',
          content: '**You cannot double-dip**: Expenses used for tax-free distributions CANNOT also be used for education credits.'
        },
        {
          title: '📊 Optimal Strategy Example',
          type: 'example',
          content: 'For a student with $15,000 in tuition and $5,000 in books:\n\n**Option A: All 529**\n• Withdraw $20,000 tax-free from 529\n• No education credits\n\n**Option B: Split (Usually Better)**\n• Withdraw $16,000 from 529 for room/board and remaining tuition\n• Pay $4,000 of tuition out-of-pocket (or taxable 529)\n• Claim AOTC: 100% × $2,000 + 25% × $2,000 = **$2,500 credit**\n\n**Net Benefit**: $2,500 credit > tax avoided on $4,000 of 529 earnings'
        },
        {
          title: 'Employer-Provided Education Assistance (Section 127)',
          type: 'table',
          headers: ['Feature', 'Detail'],
          rows: [
            ['Maximum exclusion', '**$5,250 per year**'],
            ['Courses', 'Any education (doesn\'t need to be job-related)'],
            ['Undergraduate and graduate', 'Both qualify'],
            ['Student loans', 'Can be used for student loan repayment (through 2025)']
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            '**AOTC**: $2,500/student, 40% refundable, first 4 undergraduate years only',
            '**LLC**: $2,000/return, non-refundable, unlimited years, includes graduate school',
            '**Student loan interest**: Up to $2,500 deduction, above-the-line',
            '**No double-dipping**: Separate expenses for 529/Coverdell vs. credits',
            '**Employer education assistance**: $5,250 tax-free per year'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-GEN-L019',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    title: 'Financial Aid and Student Loan Strategies',
    description: 'Understand FAFSA methodology, asset treatment differences, federal vs. private loans, and strategies to maximize financial aid eligibility',
    order: 19,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['FAFSA', 'Student Aid Index', 'Financial Aid', 'Federal Student Loans', 'Private Student Loans', 'Asset Positioning'],
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'Understanding financial aid can help families maximize eligibility and minimize education costs. The difference between parent-owned and student-owned assets can mean thousands of dollars in aid eligibility.'
        },
        {
          title: 'FAFSA Overview',
          type: 'text',
          content: 'The **Free Application for Federal Student Aid (FAFSA)** determines eligibility for:\n\n• Federal grants (Pell Grant, FSEOG)\n• Federal student loans (Direct)\n• Work-study programs\n• Many state and institutional aid programs'
        },
        {
          title: 'FAFSA Simplification Act (Effective 2024-25)',
          type: 'callout',
          content: 'Major changes include:\n\n• New **Student Aid Index (SAI)** replaces EFC\n• Reduced questions (108 → 36)\n• Simplified needs test for more families\n• Grandparent-owned 529s no longer counted as student income'
        },
        {
          title: 'Student Aid Index (SAI) Calculation',
          type: 'text',
          content: 'The SAI formula considers both parent and student income and assets.'
        },
        {
          title: 'Parent Income Assessment',
          type: 'table',
          headers: ['Parent AGI Component', 'Treatment'],
          rows: [
            ['Total income', 'Starting point'],
            ['Minus: Allowances', 'Income protection, employment expense, taxes'],
            ['Adjusted Available Income (AAI)', 'Subject to 22%-47% contribution rate']
          ]
        },
        {
          title: 'Parent Asset Assessment',
          type: 'table',
          headers: ['Asset Type', 'Assessment Rate'],
          rows: [
            ['Parent assets above asset protection', '**Up to 5.64%** per year'],
            ['Asset protection allowance', 'Based on age ($0 for younger parents)']
          ]
        },
        {
          title: 'Student Income Assessment',
          type: 'table',
          headers: ['Student Income', 'Treatment'],
          rows: [
            ['Income protection', '~$9,410 (2024-25)'],
            ['Income above protection', '**50%** assessed']
          ]
        },
        {
          title: 'Student Asset Assessment',
          type: 'table',
          headers: ['Asset Type', 'Assessment Rate'],
          rows: [
            ['All student assets', '**20%** per year']
          ]
        },
        {
          title: '⚠️ Critical Asset Distinction',
          type: 'warning',
          content: 'Parent assets are assessed at a maximum of **5.64%** while student assets are assessed at **20%**. This 3.5× difference makes asset ownership structure critically important.'
        },
        {
          title: 'Asset Treatment by Account Type',
          type: 'text',
          content: 'Different accounts have very different financial aid impacts.'
        },
        {
          title: 'Parental Assets (5.64% Maximum)',
          type: 'text',
          content: '• **Parent-owned 529 plans** (student is beneficiary)\n• **Cash, checking, savings**\n• **Investment accounts** (non-retirement)\n• **Real estate** (excluding primary home)\n• **Business equity** (if >100 employees)'
        },
        {
          title: 'Student Assets (20%)',
          type: 'text',
          content: '• **Student-owned 529 plans**\n• **UTMA/UGMA custodial accounts** (student is owner at majority)\n• **Student savings/checking**\n• **Student investments**'
        },
        {
          title: 'Excluded Assets',
          type: 'text',
          content: '• **Retirement accounts** (401k, IRA, Roth IRA, pensions)\n• **Primary residence equity**\n• **Cash value of life insurance**\n• **Personal property** (cars, furniture)\n• **Small business equity** (<100 employees, family-owned)'
        },
        {
          title: '📊 Impact Analysis Example',
          type: 'example',
          content: '**Client Situation:**\n• Parent-owned 529: $100,000\n• UTMA in student\'s name: $50,000\n\n**Financial Aid Impact:**\n• 529 impact: $100,000 × 5.64% = **$5,640** expected contribution\n• UTMA impact: $50,000 × 20% = **$10,000** expected contribution\n\n**Key Insight:** UTMA nearly **doubles** the financial aid impact despite being half the value!'
        },
        {
          title: 'Federal Student Loan Types',
          type: 'text',
          content: 'Understanding the different federal loan options helps families make informed borrowing decisions.'
        },
        {
          title: 'Direct Subsidized Loans',
          type: 'table',
          headers: ['Feature', 'Detail'],
          rows: [
            ['Eligibility', 'Demonstrated financial need'],
            ['Interest accrual', 'Government pays interest during school'],
            ['Annual limits', '$3,500 (Fr), $4,500 (So), $5,500 (Jr/Sr)'],
            ['Aggregate limit', '$23,000 (dependent undergraduate)']
          ]
        },
        {
          title: 'Direct Unsubsidized Loans',
          type: 'table',
          headers: ['Feature', 'Detail'],
          rows: [
            ['Eligibility', 'No need requirement'],
            ['Interest accrual', 'Student responsible from disbursement'],
            ['Annual limits', 'Same base + additional amounts'],
            ['Aggregate limit', '$31,000 (dependent undergraduate)']
          ]
        },
        {
          title: 'Parent PLUS Loans',
          type: 'table',
          headers: ['Feature', 'Detail'],
          rows: [
            ['Eligibility', 'Parent of dependent student, no adverse credit'],
            ['Amount', 'Up to cost of attendance minus other aid'],
            ['Interest', 'Higher rate than student loans'],
            ['Repayment', 'Parent is responsible (cannot transfer)']
          ]
        },
        {
          title: 'Financial Aid Strategies',
          type: 'text',
          content: 'Several legitimate strategies can help maximize financial aid eligibility.'
        },
        {
          title: '1. Asset Positioning',
          type: 'text',
          content: '**Before FAFSA filing:**\n\n• Reduce cash in student\'s name\n• Pay down debt with liquid assets\n• Max out parent retirement contributions (excluded)\n• Consider prepaying non-education expenses'
        },
        {
          title: '2. Timing Income',
          type: 'text',
          content: '• Defer bonuses if possible\n• Realize capital gains in non-FAFSA years\n• Control income recognition where possible'
        },
        {
          title: '3. Use Parent-Owned 529s',
          type: 'text',
          content: '• Counts as parent asset (5.64%) not student (20%)\n• Qualified distributions don\'t count as income'
        },
        {
          title: '4. FAFSA Filing Timing',
          type: 'text',
          content: '• File early (October 1 for following fall)\n• Use prior-prior year tax data\n• Submit corrections promptly if situation changes'
        },
        {
          title: 'Private Student Loans',
          type: 'text',
          content: 'Private loans should typically be a last resort after exhausting federal options.'
        },
        {
          title: 'When to Consider Private Loans',
          type: 'text',
          content: '• After exhausting federal options\n• If federal limits don\'t meet needs\n• If credit-worthy with low rates available'
        },
        {
          title: 'Federal vs. Private Loan Comparison',
          type: 'table',
          headers: ['Feature', 'Federal', 'Private'],
          rows: [
            ['Interest rates', 'Set by law (fixed)', 'Based on credit (often variable)'],
            ['Income-driven repayment', 'Yes', 'Rarely'],
            ['Public Service Forgiveness', 'Yes', 'No'],
            ['Death/disability discharge', 'Yes', 'Varies'],
            ['Cosigner release', 'N/A', 'Sometimes available']
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            '**Parent assets**: 5.64% max assessment; **Student assets**: 20% assessment',
            '**UTMA disadvantage**: Counted as student asset (4× worse for aid)',
            '**Retirement accounts**: Excluded from FAFSA',
            '**FAFSA Simplification**: Grandparent 529s no longer hurt aid',
            '**Federal loans first**: Better protections than private loans'
          ]
        }
      ]
    }
  }
];

export default CFP_GEN4_LESSONS;
