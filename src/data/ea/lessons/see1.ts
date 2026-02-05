/**
 * EA Part 1: Individuals - Lesson Content
 * Special Enrollment Examination (SEE)
 * 
 * Complete lesson content for all 50 Part 1 lessons covering:
 * - Filing requirements and taxpayer data
 * - Income and assets
 * - Deductions and adjustments
 * - Tax computation
 * - Credits
 * - Specialized returns
 * 
 * Based on IRS SEE Content Outline and Publication 17
 * Tax law as of December 31, 2024
 */

import { Lesson } from '../../../types';

export const eaPart1Lessons: Lesson[] = [
  // ============================================================================
  // SEE1-1: PRELIMINARY WORK AND TAXPAYER DATA (Lessons 1-8)
  // ============================================================================
  
  {
    id: 'SEE1-001',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Filing Requirements and Due Dates',
    description: 'Master the fundamental rules for who must file a federal income tax return and critical deadlines',
    order: 1,
    duration: 45,
    difficulty: 'beginner',
    topics: ['Filing requirements', 'Due dates', 'Extensions'],
    blueprintArea: 'SEE1-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Filing requirements are the foundation of tax practice! As an Enrolled Agent, you MUST know who is required to file, when returns are due, and the consequences of late filing. These questions appear frequently on the SEE and are essential for serving clients.",
        },
        {
          title: 'Who Must File a Federal Income Tax Return?',
          type: 'text',
          content: "**General Rule:** You must file a federal income tax return if your gross income exceeds certain thresholds based on your filing status, age, and dependency status.\n\n**2024 Filing Thresholds (Single Taxpayers):**\n• Under 65: $14,600\n• 65 or older: $16,550\n\n**Married Filing Jointly:**\n• Both under 65: $29,200\n• One spouse 65+: $30,750\n• Both 65+: $32,300\n\n**Head of Household:**\n• Under 65: $21,900\n• 65 or older: $23,850",
        },
        {
          title: '🧠 Memory Aid: Who ALWAYS Files',
          type: 'callout',
          content: "**\"SENSE\"** - You MUST file regardless of income if:\n\n**S**elf-employment income ≥ $400\n**E**mployer advance of EIC\n**N**et earnings from church employee ≥ $108.28\n**S**pecial taxes owed (AMT, household employment, etc.)\n**E**xcess contributions to HSA or Archer MSA\n\n**Also file if:** Received HSA/Archer MSA distribution, owe taxes on qualified plan distributions, or must recapture credits.",
        },
        {
          title: 'Special Filing Requirements',
          type: 'table',
          headers: ['Situation', 'Filing Required?', 'Why?'],
          rows: [
            ['Self-employment income ≥ $400', 'YES', 'Must pay SE tax'],
            ['Dependent with unearned income > $1,300', 'YES', 'Kiddie tax may apply'],
            ['Dependent with earned income > $14,600', 'YES', 'Exceeds threshold'],
            ['Advance Premium Tax Credit received', 'YES', 'Must reconcile on Form 8962'],
            ['Want to claim refundable credit', 'YES', 'Must file to receive refund'],
          ],
        },
        {
          title: 'Due Dates for Individual Returns',
          type: 'text',
          content: "**Form 1040 Due Date:** April 15 following the close of the tax year\n\n**If April 15 falls on weekend or holiday:** Due the next business day\n\n**Examples for Tax Year 2024:**\n• Regular due date: April 15, 2025\n• Extended due date: October 15, 2025\n\n**U.S. Citizens/Residents Abroad:**\n• Automatic 2-month extension to June 15\n• Must attach statement to return\n• Interest still runs from April 15!",
        },
        {
          title: '⚠️ Exam Trap: Extensions',
          type: 'warning',
          content: "**Form 4868 grants an AUTOMATIC 6-month extension to FILE, NOT to PAY!**\n\n• Extension is to October 15\n• Tax must still be paid by April 15\n• Failure to pay = FTP penalty + interest\n• No approval needed - just file Form 4868\n\n**Estimated tax due:** Enter on Form 4868 line 4 and pay with filing.",
        },
        {
          title: 'Combat Zone Extensions',
          type: 'text',
          content: "**Special Rules for Military Personnel:**\n\nService in a designated combat zone extends deadlines:\n• At least 180 days after leaving combat zone\n• Plus any days remaining in the filing period when entering the zone\n\n**Also applies to:**\n• Hospitalization resulting from combat zone service\n• Contingency operations",
        },
        {
          title: 'Disaster Area Extensions',
          type: 'text',
          content: "**Federally Declared Disaster Areas:**\n\nThe IRS may postpone deadlines for taxpayers affected by federally declared disasters. Check IRS announcements for:\n• Specific affected areas\n• Extended deadlines\n• Which tax actions are postponed\n\n**Common postponements:** Filing, payment, estimated taxes, IRA contributions",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Filing thresholds vary by filing status and age",
            "Self-employment income ≥ $400 ALWAYS requires filing",
            "Form 1040 is due April 15 (or next business day)",
            "Form 4868 extends filing to October 15 (not payment!)",
            "U.S. citizens abroad get automatic 2-month extension",
            "Combat zone service significantly extends all deadlines",
            "Always check for disaster relief announcements",
          ],
        },
      ],
    },
  },
  
  {
    id: 'SEE1-002',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Filing Status Determination',
    description: 'Learn to correctly determine the most advantageous filing status for every taxpayer situation',
    order: 2,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Single', 'MFJ', 'MFS', 'HOH', 'QSS'],
    blueprintArea: 'SEE1-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Filing status affects EVERYTHING: tax rates, standard deduction, eligibility for credits, phase-out thresholds. Choosing the wrong status can cost your client thousands of dollars or trigger an audit. This is one of the most heavily tested areas on the SEE!",
        },
        {
          title: 'The Five Filing Statuses',
          type: 'table',
          headers: ['Status', '2024 Standard Deduction', 'Key Requirement'],
          rows: [
            ['Single', '$14,600', 'Unmarried (or legally separated) on 12/31'],
            ['Married Filing Jointly (MFJ)', '$29,200', 'Married on 12/31 (or spouse died during year)'],
            ['Married Filing Separately (MFS)', '$14,600', 'Married but electing separate returns'],
            ['Head of Household (HOH)', '$21,900', 'Unmarried + maintain home for qualifying person'],
            ['Qualifying Surviving Spouse (QSS)', '$29,200', 'Spouse died in prior 2 years + dependent child'],
          ],
        },
        {
          title: '🧠 Memory Aid: HOH Requirements',
          type: 'callout',
          content: "**\"HOME\"** test for Head of Household:\n\n**H**ome - You paid MORE than half the cost of keeping up the home\n**O**ne dependent - A qualifying person lived with you more than half the year\n**M**arital status - Unmarried (or considered unmarried) on 12/31\n**E**xception - Your parent can live elsewhere if you pay 50%+ of their home costs",
        },
        {
          title: 'Married Filing Jointly (MFJ)',
          type: 'text',
          content: "**Requirements:**\n• Legally married on December 31 of the tax year\n• Both spouses agree to file jointly\n• Can file jointly even if living apart\n\n**Benefits:**\n• Highest standard deduction ($29,200)\n• Access to all credits (EIC, Education, etc.)\n• Lower tax rates at all income levels\n\n**Joint liability:** Both spouses are jointly and severally liable for the ENTIRE tax liability, even if only one spouse had income!",
        },
        {
          title: 'Married Filing Separately (MFS)',
          type: 'text',
          content: "**When MFS Makes Sense:**\n• Spouse has significant unpaid taxes\n• Spouse has questionable deductions\n• Separation/divorce in progress\n• Medical expenses (lower AGI = lower 7.5% floor)\n• Student loan IBR plans\n\n**MFS Restrictions (\"Penalty\" provisions):**\n• NO earned income credit\n• NO education credits\n• NO child tax credit (if living with spouse)\n• Social Security 85% taxable at lower thresholds\n• Lower IRA contribution phase-outs",
        },
        {
          title: 'Head of Household (HOH)',
          type: 'text',
          content: "**Three Requirements - ALL must be met:**\n\n**1. Unmarried** (or \"considered unmarried\") on December 31\n\n**2. Paid more than half the cost of keeping up a home** for the year\n• Rent, mortgage interest, property taxes, utilities, repairs, food\n• NOT clothing, education, medical, vacations, life insurance\n\n**3. Qualifying person lived with you more than half the year**\n• Qualifying child (any age if disabled)\n• Qualifying relative (MUST be related, not just any QR)\n• EXCEPTION: Parent doesn't have to live with you!",
        },
        {
          title: '\"Considered Unmarried\" for HOH',
          type: 'text',
          content: "**A MARRIED person can file HOH if ALL of these apply:**\n\n1. Didn't live with spouse for the LAST 6 months of the year\n2. Paid MORE than half the cost of the home\n3. Home was the main home of qualifying child for MORE than half the year\n4. Can claim the child as a dependent (or could but for custody agreement)\n\n**Key point:** \"Last 6 months\" means July 1 - December 31, NOT any 6-month period!",
        },
        {
          title: '⚠️ Exam Trap: The Parent Exception',
          type: 'warning',
          content: "**For HOH status, a PARENT does NOT have to live with you!**\n\nYou can file HOH if:\n• Your parent qualifies as your dependent\n• You pay MORE than half the cost of their home\n• Your parent can live in their own home, nursing home, etc.\n\n**But wait!** For qualifying relatives (siblings, etc.), they MUST live with you the entire year to allow HOH status.",
        },
        {
          title: 'Qualifying Surviving Spouse (QSS)',
          type: 'text',
          content: "**Requirements (ALL must be met):**\n\n1. Spouse died in one of the PRIOR two tax years\n2. You were entitled to file MFJ the year spouse died\n3. You didn't remarry before year-end\n4. You have a dependent child (not adult)\n5. You paid more than half the cost of keeping up the home\n6. The home was the main home of your child the entire year\n\n**Benefit:** Same tax rates and standard deduction as MFJ ($29,200)",
        },
        {
          title: 'Filing Status Decision Tree',
          type: 'list',
          content: [
            "Step 1: Are you legally married on 12/31? → If no, consider Single or HOH",
            "Step 2: If married, can you both agree to file jointly? → If yes, MFJ is usually best",
            "Step 3: If married but filing separately may benefit, compare MFJ vs MFS",
            "Step 4: If unmarried, do you meet HOH requirements? → If yes, file HOH",
            "Step 5: Did your spouse die in the past 2 years with a dependent child? → QSS",
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Filing status is determined on December 31 of the tax year",
            "MFJ almost always produces the lowest tax for married couples",
            "MFS severely restricts access to credits and favorable provisions",
            "HOH requires unmarried + paid 50%+ of home + qualifying person",
            "Parents don't have to live with you for HOH status",
            "QSS available for 2 years after spouse's death (with dependent child)",
            "'Considered unmarried' requires living apart the LAST 6 months of the year",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-003',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Dependency Requirements',
    description: 'Master the qualifying child and qualifying relative tests to correctly claim dependents',
    order: 3,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Qualifying child', 'Qualifying relative', 'Tie-breaker rules'],
    blueprintArea: 'SEE1-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Dependency claims are a major audit trigger! Correctly determining who qualifies as a dependent affects exemptions, filing status, CTC, EIC, and many other benefits. The SEE tests this extensively because it's where preparers make costly mistakes.",
        },
        {
          title: 'Two Types of Dependents',
          type: 'text',
          content: "**Every dependent must meet ONE of these two definitions:**\n\n**1. Qualifying Child (QC)** - Generally children, stepchildren, foster children\n• Uses the CARES test\n\n**2. Qualifying Relative (QR)** - Other relatives (and sometimes non-relatives)\n• Uses the SUPORT test\n\n**Note:** A person can NEVER be both types - you test for QC first, then QR if QC fails.",
        },
        {
          title: '🧠 Memory Aid: Qualifying Child - \"CARES\"',
          type: 'callout',
          content: "**C**lose relative (child, stepchild, sibling, or descendant thereof)\n**A**ge test (under 19, or under 24 if student, or any age if disabled)\n**R**esidency (lived with you MORE than half the year)\n**E**liminate joint return (child can't file MFJ unless only to claim refund)\n**S**upport (child can't provide more than half their OWN support)\n\n**Remember:** The \"S\" is about the CHILD providing their own support, not about YOU providing support!",
        },
        {
          title: 'Qualifying Child Tests in Detail',
          type: 'table',
          headers: ['Test', 'Requirement', 'Key Details'],
          rows: [
            ['Relationship', 'Child, stepchild, foster child, sibling, or their descendants', 'Includes adopted, half-siblings'],
            ['Age', 'Under 19 at year-end, or under 24 if full-time student, or any age if permanently disabled', 'Student = 5+ months enrollment'],
            ['Residency', 'Same principal residence for MORE than half the year', 'Temporary absences count as living together'],
            ['Joint Return', 'Cannot file MFJ with their spouse', 'Exception: filing only to claim refund'],
            ['Support', 'Child did NOT provide more than half their OWN support', 'Look at what CHILD paid, not parent'],
          ],
        },
        {
          title: '🧠 Memory Aid: Qualifying Relative - \"SUPORT\"',
          type: 'callout',
          content: "**S**upport - YOU provided MORE than half\n**U**nder the gross income limit ($5,050 for 2024)\n**P**recludes being a qualifying child of anyone\n**O**nly certain relationships... OR\n**R**esident of your household all year\n**T**axpayer (joint return test)\n\n**Key difference from QC:** For QR, YOU must provide >50% support, and there's a gross income limit!",
        },
        {
          title: 'Qualifying Relative Tests in Detail',
          type: 'table',
          headers: ['Test', 'Requirement', 'Key Details'],
          rows: [
            ['Support', 'Taxpayer provides MORE than half of dependent\'s support', 'Total support = food, shelter, clothing, medical, education, etc.'],
            ['Gross Income', 'Dependent\'s gross income < $5,050 (2024)', 'Tax-exempt income doesn\'t count'],
            ['Not a QC', 'Cannot be a qualifying child of ANY taxpayer', 'Even if that taxpayer doesn\'t claim them'],
            ['Relationship OR Residence', 'Related per IRC 152(d)(2) OR lives with taxpayer all year', 'Relatives: parents, siblings, in-laws, aunts/uncles, nieces/nephews'],
            ['Joint Return', 'Cannot file MFJ', 'Same exception as QC'],
          ],
        },
        {
          title: 'The Support Test',
          type: 'text',
          content: "**What Counts as Support:**\n• Food (at home and away)\n• Lodging (fair rental value if owned)\n• Clothing\n• Education\n• Medical and dental care\n• Recreation\n• Transportation\n• Similar necessities\n\n**What Doesn't Count:**\n• Life insurance premiums\n• Funeral expenses\n• Scholarships (for QC test - excluded from support calculation)\n• Tax-exempt income (Social Security, welfare)\n\n**IMPORTANT:** Scholarships are EXCLUDED from the support test for a qualifying child!",
        },
        {
          title: '⚠️ Exam Trap: Multiple Support Agreement',
          type: 'warning',
          content: "**When NO ONE person provides >50% support:**\n\nA Multiple Support Agreement (Form 2120) allows ONE person to claim the dependent if:\n\n1. Combined support from the group exceeds 50%\n2. Each individual would qualify EXCEPT for support test\n3. The person claiming contributed MORE than 10%\n4. Others who contributed >10% sign Form 2120 agreeing not to claim\n\n**Common for elderly parents supported by multiple children.**",
        },
        {
          title: 'Tie-Breaker Rules for Qualifying Child',
          type: 'text',
          content: "**When a child qualifies for more than one taxpayer:**\n\n**1. Parent vs. Non-Parent:**\n• Parent WINS (child is treated as QC of parent)\n\n**2. Both Parents (not filing jointly):**\n• Parent with whom child lived LONGER wins\n• If equal time, parent with HIGHER AGI wins\n\n**3. Non-Parent vs. Non-Parent:**\n• Person with HIGHER AGI wins\n\n**4. Parent vs. Parent - Neither claims child:**\n• Non-parent with highest AGI can claim",
        },
        {
          title: 'Divorced and Separated Parents',
          type: 'text',
          content: "**Custodial Parent (CP):** The parent with whom the child lived MORE nights during the year.\n\n**Default Rule:** Custodial parent claims the child as dependent.\n\n**Release of Claim (Form 8332):**\nThe custodial parent can release the dependency claim to the noncustodial parent:\n• For the current year only, or\n• For current and future years\n• NCP can then claim child tax credit and dependency\n\n**Custodial parent ALWAYS keeps:**\n• HOH filing status (if otherwise qualified)\n• Earned income credit\n• Child and dependent care credit\n• These CANNOT be transferred!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Qualifying Child uses CARES tests - age, relationship, residency, support (by child)",
            "Qualifying Relative uses SUPORT tests - includes gross income limit (<$5,050)",
            "For QC, the CHILD must not provide >50% of their OWN support",
            "For QR, the TAXPAYER must provide >50% of the dependent's support",
            "Scholarships are excluded from the QC support calculation",
            "Tie-breakers: Parent wins, then longer residence, then higher AGI",
            "Form 8332 releases dependency but NOT EIC, HOH, or dependent care credit",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-004',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Taxpayer Identification Numbers',
    description: 'Understand the different types of tax identification numbers and when each applies',
    order: 4,
    duration: 35,
    difficulty: 'beginner',
    topics: ['SSN', 'ITIN', 'EIN', 'ATIN', 'PTIN'],
    blueprintArea: 'SEE1-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Every tax return needs valid identification numbers. Using the wrong type of TIN or entering incorrect numbers causes delays, rejected e-files, and disallowed credits. As an EA, you'll help clients obtain the correct TINs and troubleshoot ID issues constantly.",
        },
        {
          title: 'Types of Taxpayer Identification Numbers',
          type: 'table',
          headers: ['TIN Type', 'Format', 'Issued By', 'Purpose'],
          rows: [
            ['SSN', 'XXX-XX-XXXX', 'Social Security Administration', 'U.S. citizens and authorized workers'],
            ['ITIN', '9XX-XX-XXXX', 'IRS', 'Foreign nationals without SSN eligibility'],
            ['EIN', 'XX-XXXXXXX', 'IRS', 'Businesses, trusts, estates, nonprofits'],
            ['ATIN', 'XXX-XX-XXXX', 'IRS', 'Adopted children pending SSN'],
            ['PTIN', 'PXXXXXXXX', 'IRS', 'Paid tax return preparers'],
          ],
        },
        {
          title: 'Social Security Number (SSN)',
          type: 'text',
          content: "**Who Gets an SSN:**\n• U.S. citizens\n• Permanent residents (green card holders)\n• Noncitizens authorized to work in the U.S.\n\n**Key Points:**\n• Required for EIC, CTC, ACTC, and most refundable credits\n• Work-authorized SSN needed for many credits\n• SSA assigns numbers; apply with Form SS-5\n• SSN cards marked \"Valid for work only with DHS authorization\" limit credit eligibility",
        },
        {
          title: 'Individual Taxpayer Identification Number (ITIN)',
          type: 'text',
          content: "**Who Gets an ITIN:**\n• Noncitizen spouse filing jointly\n• Nonresident with U.S. tax obligation\n• Dependents who aren't eligible for SSN\n• Foreign investors with U.S. income\n\n**Apply with Form W-7:**\n• Submit with tax return (or exception applies)\n• Must include passport or specified documents\n• ITINs expire if not used for 3 consecutive years\n• Middle two digits are 70-99 (identifying feature)\n\n**Cannot be used for:**\n• Work authorization\n• EIC or refundable portion of CTC (for the worker)",
        },
        {
          title: '⚠️ Exam Trap: ITIN and Credits',
          type: 'warning',
          content: "**ITINs and Credit Eligibility:**\n\n**CANNOT get EIC** with an ITIN (need valid SSN)\n\n**CAN claim CTC** for a child with an SSN, even if parent has ITIN\n\n**Dependent claimed** with ITIN → $500 Credit for Other Dependents (not CTC)\n\n**Key:** The credit depends on the TIN of the person for whom it's claimed, not (usually) the claimer.",
        },
        {
          title: 'Employer Identification Number (EIN)',
          type: 'text',
          content: "**Who Needs an EIN:**\n• Corporations and partnerships\n• Estates and trusts\n• Employers with employees\n• Non-profits and other organizations\n• Single-member LLCs with employees or excise tax\n\n**How to Apply:**\n• Form SS-4 (or online at IRS.gov)\n• Immediate issuance online or by phone\n• No cost to obtain\n• One EIN per responsible party per day\n\n**Format:** Two digits, hyphen, seven digits (XX-XXXXXXX)",
        },
        {
          title: 'Adoption Taxpayer Identification Number (ATIN)',
          type: 'text',
          content: "**When ATIN is Used:**\n• Child placed for domestic adoption\n• Adoption not yet final\n• SSN cannot be obtained yet\n• Need to file tax return claiming child\n\n**Apply with Form W-7A:**\n• Temporary number\n• Expires after 2 years\n• Must apply for SSN when adoption is final\n• Can be used to claim child as dependent",
        },
        {
          title: 'Preparer Tax Identification Number (PTIN)',
          type: 'text',
          content: "**Who Needs a PTIN:**\n• ANY person paid to prepare (or help prepare) federal tax returns\n• Must be renewed annually\n• Required to sign returns as paid preparer\n\n**Format:** Starts with \"P\" followed by 8 digits\n\n**Annual Renewal:**\n• Renewal period: October 1 - December 31\n• Annual fee applies\n• Must complete PTIN renewal BEFORE preparing returns\n\n**Enrolled Agents:** Must have PTIN in addition to EA credentials",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "SSN is required for EIC and refundable credits (work-authorized)",
            "ITIN is for those ineligible for SSN with U.S. tax filing obligation",
            "ITINs start with 9 and have 70-99 as middle digits",
            "EIN is for business entities, estates, trusts, and employers",
            "ATIN is temporary for adopted children pending SSN",
            "PTIN is required for ALL paid preparers - renewed annually",
            "Wrong TIN = rejected e-file, delayed refund, disallowed credits",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-005',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Extensions and Amended Returns',
    description: 'Master the rules for filing extensions and correcting previously filed returns',
    order: 5,
    duration: 40,
    difficulty: 'beginner',
    topics: ['Form 4868', 'Form 1040-X', 'Statute of limitations'],
    blueprintArea: 'SEE1-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Extensions and amended returns are daily work for tax practitioners! You MUST know how to properly extend clients by April 15 and when/how to file amended returns to claim refunds or correct errors. Get these wrong, and your client loses money.",
        },
        {
          title: 'Form 4868: Automatic Extension',
          type: 'text',
          content: "**What Form 4868 Does:**\n• Extends filing deadline from April 15 to October 15\n• Extension is AUTOMATIC - no approval needed\n• Just file by April 15 (or first business day after if on weekend)\n\n**What Form 4868 Does NOT Do:**\n• Does NOT extend the time to PAY\n• Does NOT stop interest from accruing\n• Does NOT prevent failure-to-pay penalty\n\n**How to File:**\n• E-file through tax software\n• Paper Form 4868\n• Credit/debit card payment (acts as extension)\n• Electronic Federal Tax Payment System (EFTPS)",
        },
        {
          title: '⚠️ Exam Trap: Extension ≠ Payment Extension',
          type: 'warning',
          content: "**The most tested concept about extensions:**\n\n• Form 4868 extends FILING to October 15\n• Taxes are still due APRIL 15\n• Failure-to-pay penalty: 0.5% per month (max 25%)\n• Interest: Federal short-term rate + 3%\n\n**Tip:** Estimate tax and pay with extension to minimize penalties and interest!",
        },
        {
          title: 'Special Extension Situations',
          type: 'table',
          headers: ['Situation', 'Automatic Extension', 'Details'],
          rows: [
            ['U.S. citizens/residents abroad', '2 months (June 15)', 'Interest still runs from April 15'],
            ['Combat zone', '180+ days after leaving', 'Plus time remaining when entered'],
            ['Federally declared disaster', 'Varies by announcement', 'Check IRS notices'],
            ['April 15 is weekend/holiday', 'Next business day', 'Applies automatically'],
          ],
        },
        {
          title: 'Form 1040-X: Amended Returns',
          type: 'text',
          content: "**When to File 1040-X:**\n• Correct errors on filed returns (income, deductions, credits)\n• Change filing status\n• Claim additional refunds\n• Report additional income discovered\n• Change itemized ↔ standard deduction\n\n**Do NOT use 1040-X for:**\n• Math errors (IRS corrects automatically)\n• Missing schedules (they'll request)\n• Changing from MFJ to MFS after due date (generally prohibited)\n\n**How to File:**\n• Can now e-file most amended returns\n• Explain ALL changes in Part III\n• Attach supporting schedules",
        },
        {
          title: 'Statute of Limitations for Refunds',
          type: 'text',
          content: "**To claim a REFUND, you must file within the LATER of:**\n\n**Option 1:** 3 years from the date the original return was FILED\n\n**Option 2:** 2 years from the date the tax was PAID\n\n**If you file within 3 years:** Refund limited to taxes paid within 3 years before claim plus extensions\n\n**If you file within 2 years:** Refund limited to amount paid within 2 years before claim\n\n**After both periods expire:** No refund, even if you overpaid!",
        },
        {
          title: 'Example: Refund Limitations',
          type: 'example',
          content: "**Scenario:** Tax year 2020 return was due April 15, 2021.\n\n• Filed original return: April 15, 2021\n• Paid tax with return: $5,000\n• Discoveredoverpayment: $2,000\n\n**Deadline to claim refund:** April 15, 2024 (3 years from filing)\n\n**If claiming on April 10, 2024:** Refund allowed ($2,000)\n**If claiming on April 20, 2024:** NO refund allowed - too late!\n\n**Key:** Mark your calendar for the refund claim deadline!",
        },
        {
          title: 'Changing Filing Status on Amended Return',
          type: 'text',
          content: "**Allowed Changes:**\n• Single to HOH (if requirements met)\n• MFS to MFJ (if filing timely amended return)\n• QSS status correction\n\n**Generally NOT Allowed:**\n• MFJ to MFS after due date (including extensions)\n\n**Exception:** MFJ to MFS allowed if:\n• Filed before due date, OR\n• Court-ordered pursuant to deficiency notice\n\n**Remember:** MFJ is irrevocable after the due date!",
        },
        {
          title: 'Waiting for Original Return Processing',
          type: 'text',
          content: "**Best Practice:**\n\nWait for original return to be fully processed BEFORE filing 1040-X:\n• Usually 16-20 weeks for e-file\n• Can take longer during peak season\n• IRS will process in order received\n\n**Why wait?** Filing 1040-X before original is processed can cause significant delays and confusion.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Form 4868 automatically extends filing to October 15",
            "Payment is still due April 15 - extension doesn't extend payment!",
            "Form 1040-X corrects previously filed returns",
            "Refund claim deadline: later of 3 years from filing or 2 years from payment",
            "MFJ cannot be changed to MFS after the due date",
            "Wait for original return processing before filing amendments",
            "E-filing is now available for most amended returns",
          ],
        },
      ],
    },
  },

  // Continue with more lessons...
  // Due to length, I'll add a few more key lessons

  {
    id: 'SEE1-009',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Wages, Salaries, and Tips',
    description: 'Understand the taxation of employment income and common reporting issues',
    order: 9,
    duration: 50,
    difficulty: 'beginner',
    topics: ['Form W-2', 'Tip income', 'Fringe benefits', 'Stock options'],
    blueprintArea: 'SEE1-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "W-2 income is the most common form of taxable income. Understanding what's included, what's excluded, and how to properly report it is fundamental. The SEE tests various scenarios involving wages, tips, and fringe benefits.",
        },
        {
          title: 'Form W-2 Basics',
          type: 'text',
          content: "**Key Boxes on Form W-2:**\n\n• **Box 1:** Wages, tips, other compensation (taxable income)\n• **Box 2:** Federal income tax withheld\n• **Box 3:** Social Security wages\n• **Box 4:** Social Security tax withheld\n• **Box 5:** Medicare wages and tips\n• **Box 6:** Medicare tax withheld\n• **Box 12:** Various codes for benefits\n• **Box 13:** Statutory employee, retirement plan, third-party sick pay\n\n**Why Box 1 ≠ Box 3 or Box 5:**\nPre-tax deductions (401k, health insurance, etc.) reduce Box 1 but not always Social Security wages.",
        },
        {
          title: 'Box 12 Codes You Need to Know',
          type: 'table',
          headers: ['Code', 'Description', 'Tax Treatment'],
          rows: [
            ['C', 'Taxable cost of group-term life > $50,000', 'Included in Box 1'],
            ['D', 'Elective deferrals to 401(k)', 'Pre-tax, reduces Box 1'],
            ['E', 'Elective deferrals to 403(b)', 'Pre-tax, reduces Box 1'],
            ['DD', 'Cost of employer health coverage', 'Informational only - not taxable'],
            ['G', 'Elective deferrals to 457(b)', 'Pre-tax, reduces Box 1'],
            ['W', 'HSA employer contributions', 'Excluded from income'],
          ],
        },
        {
          title: 'Tip Income',
          type: 'text',
          content: "**All tips are taxable income:**\n• Cash tips\n• Credit card tips\n• Tips shared with other employees\n• Non-cash tips (fair market value)\n\n**Reporting Requirements:**\n• Tips of $20+ in a month MUST be reported to employer\n• Report by 10th of following month\n• Employer withholds income and FICA taxes\n• Unreported tips → Form 4137 with return\n\n**Allocated Tips (Box 8):**\nIf tips seem low, employer may allocate additional tips. These are NOT included in Box 1 - taxpayer must report as additional income if not already reported.",
        },
        {
          title: '⚠️ Exam Trap: Allocated Tips',
          type: 'warning',
          content: "**Box 8 - Allocated Tips:**\n\n• NOT included in Box 1 wages\n• NOT automatically subject to withholding\n• Employee MUST include as income if tips weren't already reported\n• If you reported all tips, allocated tips may be disputed\n\n**Key:** Allocated tips are a RED FLAG for underreporting!",
        },
        {
          title: 'Taxable vs. Nontaxable Fringe Benefits',
          type: 'table',
          headers: ['Benefit', 'Includable in Income?', 'Notes'],
          rows: [
            ['Health insurance premiums', 'NO', 'Excluded if paid by employer'],
            ['Group-term life ≤ $50,000', 'NO', 'Excluded'],
            ['Group-term life > $50,000', 'YES (excess)', 'Cost of excess included (Table I)'],
            ['Personal use of company car', 'YES', 'FMV of personal use'],
            ['De minimis benefits', 'NO', 'Small value, administratively impractical to account'],
            ['Qualified employee discounts', 'NO', 'Within limits (20% services, GP% goods)'],
            ['Working condition fringe', 'NO', 'Would be deductible if paid by employee'],
            ['Qualified transportation', 'NO', 'Up to limits ($315/month transit, $315 parking)'],
          ],
        },
        {
          title: 'Statutory Employees',
          type: 'text',
          content: "**Statutory Employees (Box 13 checked):**\n\nTreated as employees for FICA but self-employed for income tax:\n• Life insurance salespersons\n• Certain agent-drivers or commission drivers\n• Traveling salespersons\n• Home workers (some)\n\n**Special Treatment:**\n• Report income and expenses on Schedule C\n• Deduct business expenses (even without itemizing)\n• Do NOT pay self-employment tax (already paid FICA)\n\n**Key:** Look for the statutory employee checkbox on W-2!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Box 1 on W-2 shows taxable wages after pre-tax deductions",
            "All tips are taxable - cash, credit card, shared, and non-cash",
            "Tips $20+/month must be reported to employer by the 10th",
            "Allocated tips (Box 8) may need to be added to income",
            "Group-term life insurance over $50,000 = taxable benefit",
            "Box 12 codes show various pre-tax and informational amounts",
            "Statutory employees file Schedule C but don't pay SE tax",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-014',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Capital Gains and Losses',
    description: 'Master the rules for taxing gains and losses on capital assets',
    order: 14,
    duration: 65,
    difficulty: 'intermediate',
    topics: ['Short-term', 'Long-term', 'Netting rules', 'Rate structure'],
    blueprintArea: 'SEE1-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Capital gains and losses are among the most complex areas of individual taxation!The SEE heavily tests holding periods, netting rules, and rate structures. Master this and you'll excel on many exam questions.",
        },
        {
          title: 'What is a Capital Asset?',
          type: 'text',
          content: "**Capital Asset = Everything EXCEPT (what it's NOT):**\n\n• Inventory or property held for sale to customers\n• Depreciable property used in business (Section 1231)\n• Real property used in business (Section 1231)\n• Accounts/notes receivable from business\n• Supplies used in business\n• Certain intellectual property (copyrights, etc.)\n• Government publications\n\n**Examples of Capital Assets:**\n• Stocks and bonds\n• Personal residence\n• Personal-use property (car, furniture)\n• Investment real estate (not used in business)",
        },
        {
          title: '🧠 Memory Aid: Capital Asset Exclusions',
          type: 'callout',
          content: "**\"ACID\"** is NOT a capital asset:\n\n**A**ccounts receivable (from services or inventory)\n**C**opyrights and creative works (in creator's/donee's hands)\n**I**nventory and dealer property\n**D**epreciable property/real estate used in trade or business",
        },
        {
          title: 'Holding Period',
          type: 'text',
          content: "**Short-Term:** Held 1 year or LESS\n• Taxed as ordinary income (up to 37%)\n\n**Long-Term:** Held MORE than 1 year\n• Taxed at preferential rates (0%, 15%, or 20%)\n\n**How to Count:**\n• Start the day AFTER acquisition\n• End on the day of sale\n• \"More than 1 year\" = 1 year + 1 day minimum\n\n**Example:** Buy March 15, 2024 → Must sell after March 15, 2025 for LTCG",
        },
        {
          title: 'Long-Term Capital Gains Rates (2024)',
          type: 'table',
          headers: ['Filing Status', '0% Rate', '15% Rate', '20% Rate'],
          rows: [
            ['Single', 'Up to $47,025', '$47,026 - $518,900', 'Over $518,900'],
            ['MFJ', 'Up to $94,050', '$94,051 - $583,750', 'Over $583,750'],
            ['HOH', 'Up to $63,000', '$63,001 - $551,350', 'Over $551,350'],
            ['MFS', 'Up to $47,025', '$47,026 - $291,850', 'Over $291,850'],
          ],
        },
        {
          title: 'Capital Gains Netting Process',
          type: 'text',
          content: "**Step 1: Net within each category**\n• Short-term gains against short-term losses → Net ST gain or loss\n• Long-term gains against long-term losses → Net LT gain or loss\n\n**Step 2: Net between categories (if applicable)**\n• Net ST gain + Net LT loss = Combined result\n• Net ST loss + Net LT gain = Combined result\n\n**Step 3: Apply final result**\n• Net capital gain → Taxed at applicable rates\n• Net capital loss → Deduct up to $3,000 vs. ordinary income",
        },
        {
          title: '⚠️ Exam Trap: $3,000 Loss Limitation',
          type: 'warning',
          content: "**Capital Losses:**\n\n• First offset capital gains\n• Then deduct up to $3,000 against ordinary income ($1,500 MFS)\n• Excess carries forward indefinitely\n• Carryover keeps its character (ST or LT)\n\n**Example:**\n• $10,000 capital loss\n• $2,000 capital gain\n• Net loss: $8,000\n• Current year deduction: $3,000\n• Carryforward to next year: $5,000",
        },
        {
          title: 'Special Capital Gains Rates',
          type: 'table',
          headers: ['Type of Gain', 'Rate', 'Notes'],
          rows: [
            ['Collectibles (art, coins, antiques)', '28%', 'Maximum rate, can be lower'],
            ['Section 1250 unrecaptured gain', '25%', 'Depreciation recapture on real property'],
            ['Qualified Small Business Stock', '0%/50%/75%/100% exclusion', 'Section 1202 - complex rules'],
            ['Net Investment Income Tax', '+3.8%', 'On top of regular rates for high earners'],
          ],
        },
        {
          title: 'Wash Sale Rule',
          type: 'text',
          content: "**The Wash Sale Rule Disallows Losses When:**\n\nYou sell stock at a loss AND buy substantially identical stock within:\n• 30 days BEFORE the sale, OR\n• 30 days AFTER the sale\n\n**Result:** Loss is disallowed and added to the basis of the replacement stock.\n\n**Wash sale period:** 61 days total (30 before + sale date + 30 after)\n\n**Does NOT apply to gains!**\n\n**Example:** Sell 100 XYZ at $1,000 loss on March 15. Buy 100 XYZ on March 28. Loss disallowed → added to new shares' basis.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Capital assets = everything EXCEPT inventory, business property, A/R, etc.",
            "Holding period: LTCG requires more than 1 year (1 year + 1 day)",
            "LTCG rates: 0%, 15%, or 20% depending on taxable income",
            "Netting: ST vs ST, LT vs LT, then across categories",
            "Capital loss deduction limited to $3,000 per year ($1,500 MFS)",
            "Excess losses carry forward indefinitely",
            "Wash sale rule disallows losses if repurchase within 30 days before/after",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-030',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Qualified Business Income Deduction',
    description: 'Master Section 199A and the 20% pass-through deduction rules',
    order: 30,
    duration: 65,
    difficulty: 'advanced',
    topics: ['Section 199A', '20% deduction', 'Specified service trades', 'W-2 wage limitation'],
    blueprintArea: 'SEE1-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The Section 199A QBI deduction can save clients up to 20% on pass-through business income! It's also one of the most complex provisions in the tax code. The SEE tests this heavily because it's so important for tax practitioners serving small businesses.",
        },
        {
          title: 'What is QBI?',
          type: 'text',
          content: "**Qualified Business Income (QBI):**\n\nThe net amount of qualified items of income, gain, deduction, and loss from any qualified trade or business.\n\n**Includes:**\n• Schedule C income (sole proprietors)\n• S corporation income (K-1)\n• Partnership income (K-1)\n• REIT dividends and PTP income\n\n**Does NOT Include:**\n• W-2 wages\n• Capital gains/losses\n• Interest income not properly allocable\n• Reasonable compensation from S-corp\n• Guaranteed payments from partnership",
        },
        {
          title: 'Basic QBI Deduction',
          type: 'text',
          content: "**For Taxpayers Below Thresholds:**\n\nDeduction = **20% of QBI**\n\n**2024 Thresholds:**\n• Single/HOH: $182,100 taxable income\n• MFJ: $364,200 taxable income\n\n**Below threshold = No limitations!**\n• SSTB rules don't apply\n• W-2 wage/property limitations don't apply\n• Simply 20% of QBI",
        },
        {
          title: '🧠 Memory Aid: The QBI Calculation',
          type: 'callout',
          content: "**QBI Deduction = LESSER of:**\n\n**Option A:** 20% of QBI from all qualifying businesses\n\n**Option B:** 20% of (Taxable Income − Net Capital Gains)\n\n**Then apply W-2 and SSTB limitations if over threshold!**",
        },
        {
          title: 'Specified Service Trade or Business (SSTB)',
          type: 'text',
          content: "**SSTBs are penalized at higher income levels!**\n\n**SSTB Fields:**\n• Health (doctors, dentists, nurses, etc.)\n• Law (attorneys)\n• Accounting\n• Actuarial science\n• Performing arts\n• Consulting\n• Athletics\n• Financial services\n• Brokerage services\n• Any trade where principal asset is reputation/skill of employees\n\n**Specifically EXCLUDED from SSTB:**\n• Engineering\n• Architecture\n• Real estate agents/brokers (if otherwise qualifying)",
        },
        {
          title: 'SSTB Phase-Out',
          type: 'table',
          headers: ['Income Level', 'Single/HOH', 'MFJ', 'SSTB Treatment'],
          rows: [
            ['Below threshold', '< $182,100', '< $364,200', 'Full 20% deduction'],
            ['Phase-out range', '$182,100 - $232,100', '$364,200 - $464,200', 'Partial deduction'],
            ['Above phase-out', '> $232,100', '> $464,200', 'NO deduction for SSTB'],
          ],
        },
        {
          title: 'W-2 Wage and Property Limitation',
          type: 'text',
          content: "**For Taxpayers ABOVE Thresholds:**\n\nQBI deduction limited to the GREATER of:\n\n**Option 1:** 50% of W-2 wages paid by the business\n\n**Option 2:** 25% of W-2 wages + 2.5% of unadjusted basis of qualified property\n\n**Qualified Property:**\n• Depreciable tangible property\n• Held at close of tax year\n• Used in production of QBI\n• Within depreciable period (greater of 10 years or MACRS period)\n\n**Phase-in:** Applies fully above threshold; phases in through phase-out range.",
        },
        {
          title: '⚠️ Exam Trap: Aggregation Rules',
          type: 'warning',
          content: "**Aggregating Businesses:**\n\nTaxpayers can aggregate multiple qualifying businesses if:\n• Same owners (within tolerance)\n• Common ownership between businesses\n• Businesses share resources (employees, accounting, etc.)\n\n**Why aggregate?**\n• W-2 wages from one business can cover QBI from another\n• Qualified property from one business helps another\n• Can't cherry-pick which to aggregate each year\n\n**Key:** Once aggregated, must continue in future years.",
        },
        {
          title: 'Example: QBI Deduction Calculation',
          type: 'example',
          content: "**Facts:**\n• Sarah (single) has $300,000 taxable income\n• Schedule C net income: $200,000 (consulting = SSTB)\n• No W-2 wages paid, no qualified property\n\n**Analysis:**\n• Above $232,100 threshold → SSTB gets NO deduction\n• If she were at $182,000 TI → Full 20% deduction ($40,000)\n• If she were at $207,100 TI → Partial deduction (50% of otherwise allowable)\n\n**Key:** For high-income SSTBs, converting to C-corp may be beneficial!",
        },
        {
          title: 'TCJA Sunset - 2026',
          type: 'warning',
          content: "**Section 199A is scheduled to expire after December 31, 2025!**\n\nUnless extended by Congress:\n• No QBI deduction for 2026 and beyond\n• Significant tax increase for pass-through businesses\n• May impact entity choice decisions\n\n**EA exam implication:** Know the current rules, but be aware of the sunset.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "QBI deduction = up to 20% of qualified business income",
            "Below threshold: simple 20% deduction, no limitations",
            "SSTB deduction phases out and disappears at high incomes",
            "W-2 wage and property limitations apply above thresholds",
            "SSTB includes health, law, accounting, consulting, financial services",
            "Engineering and architecture are NOT SSTBs",
            "Section 199A is scheduled to expire after 2025",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-040',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Earned Income Credit',
    description: 'Master the complex EIC rules and due diligence requirements',
    order: 40,
    duration: 60,
    difficulty: 'advanced',
    topics: ['EIC requirements', 'Investment income limit', 'Credit amounts', 'Due diligence'],
    blueprintArea: 'SEE1-5',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The EIC is one of the largest anti-poverty programs in the U.S. and is HEAVILY tested on the SEE! It's also a major audit area with strict due diligence requirements for preparers. Get this wrong and you face penalties. Get it right and you change lives.",
        },
        {
          title: 'EIC Overview',
          type: 'text',
          content: "**What is the EIC?**\nA refundable credit for low-to-moderate income workers, especially those with qualifying children.\n\n**Key Characteristics:**\n• REFUNDABLE - can get money even with zero tax liability\n• Phases in with income, then phases out\n• Credit amount depends on number of qualifying children\n• Available to workers without children (smaller credit)\n\n**Maximum Credits (2024):**\n• No children: $632\n• 1 child: $4,213\n• 2 children: $6,960\n• 3+ children: $7,830",
        },
        {
          title: 'Basic EIC Requirements',
          type: 'table',
          headers: ['Requirement', 'Details', 'Notes'],
          rows: [
            ['Earned income', 'Must have wages, SE income, or other earned income', 'Investment income alone doesn\'t qualify'],
            ['SSN', 'Valid SSN for taxpayer, spouse, and qualifying children', 'Must be valid for work'],
            ['Filing status', 'Cannot be MFS', 'MFJ, Single, HOH, QSS allowed'],
            ['Not a dependent', 'Cannot be claimed as dependent on another return', 'Also can\'t be a qualifying child of another'],
            ['Investment income', 'Must be ≤ $11,600 (2024)', 'Key limitation!'],
            ['U.S. residency', 'Main home in U.S. for more than half the year', 'Includes military overseas'],
          ],
        },
        {
          title: '🧠 Memory Aid: EIC Requirements',
          type: 'callout',
          content: "**\"RESIDE\":**\n\n**R**equires earned income\n**E**arnings under phase-out limit\n**S**SN required (valid for work)\n**I**nvestment income under $11,600\n**D**ependency - can't be claimed by others\n**E**xclude MFS status",
        },
        {
          title: 'EIC Qualifying Child Rules',
          type: 'text',
          content: "**Different from Dependency Qualifying Child!**\n\n**Relationship:** Child, stepchild, foster child, sibling, or descendant\n\n**Age:** Under 19 (or under 24 if student, or any age if disabled)\n\n**Residency:** Lived with taxpayer for MORE than half the year\n\n**Joint return:** Child cannot file MFJ (unless only for refund)\n\n**NO support test!** (Unlike dependency rules)\n\n**Key Difference:** No gross income test, no support test for EIC!",
        },
        {
          title: 'EIC Income Limits (2024)',
          type: 'table',
          headers: ['Children', 'Single/HOH Max AGI', 'MFJ Max AGI', 'Max Credit'],
          rows: [
            ['0', '$18,591', '$25,511', '$632'],
            ['1', '$49,084', '$56,004', '$4,213'],
            ['2', '$55,768', '$62,688', '$6,960'],
            ['3+', '$59,899', '$66,819', '$7,830'],
          ],
        },
        {
          title: '⚠️ Investment Income Limit',
          type: 'warning',
          content: "**Investment Income Must Be ≤ $11,600 (2024)**\n\n**Investment income includes:**\n• Taxable interest\n• Tax-exempt interest\n• Ordinary dividends\n• Capital gain net income\n• Net rental/royalty income (if positive)\n• Passive income\n\n**This is an absolute limit - exceed it and EIC = $0!**",
        },
        {
          title: 'Preparer Due Diligence - Form 8867',
          type: 'text',
          content: "**Paid preparers MUST complete Form 8867 for claims including:**\n• Earned Income Credit\n• Child Tax Credit / ACTC\n• American Opportunity Credit\n• Head of Household status\n\n**Due Diligence Requirements:**\n1. Complete eligibility checklist on Form 8867\n2. Compute credits using Form 8867\n3. Verify documentation of proof\n4. Know Rules - apply knowledge to specific return\n\n**Penalty for failure: $635 per failure (2024)**\n\nA preparation with all 4 credits = potential $2,540 penalty per return!",
        },
        {
          title: 'Documentation Preparers Should Obtain',
          type: 'list',
          content: [
            "School records showing child's address",
            "Landlord or property management statements",
            "Healthcare provider records",
            "Social service agency records",
            "Employer records",
            "Day care records",
            "Documents showing relationship (birth certificates)",
            "Keep records for 3 years from due date or date filed",
          ],
        },
        {
          title: 'Common EIC Issues and Audits',
          type: 'text',
          content: "**IRS Common Audit Triggers:**\n\n• Claiming child who lives with someone else\n• Filing status errors (HOH when shouldn't)\n• Income discrepancies\n• Child SSN issues\n• Multiple filers claiming same child\n\n**Most common EIC error:** Claiming a child who doesn't meet residency requirement!\n\n**Result of erroneous claim:**\n• Credit recapture + interest\n• 2-year ban (reckless or intentional disregard)\n• 10-year ban (fraud)",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "EIC is a refundable credit for low-to-moderate income workers",
            "Maximum credit with 3+ children is $7,830 (2024)",
            "Investment income limit: $11,600 (absolute cutoff)",
            "Must have valid work-authorized SSN",
            "Cannot file MFS to claim EIC",
            "Qualifying child rules differ from dependency rules (no support test)",
            "Form 8867 due diligence required - $635 penalty per failure",
            "Keep documentation records for 3 years",
          ],
        },
      ],
    },
  },
  
  // ============================================================================
  // ADDITIONAL SEE1-2: INCOME AND ASSETS (Lessons 10-22)
  // ============================================================================

  {
    id: 'SEE1-010',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Interest Income',
    description: 'Understand all types of interest income and their tax treatment',
    order: 10,
    duration: 40,
    difficulty: 'beginner',
    topics: ['Taxable interest', 'Tax-exempt interest', 'OID', 'Series EE/I bonds'],
    blueprintArea: 'SEE1-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Interest income comes in many forms with different tax treatments. Know when it's taxable, when it's tax-exempt, and how to properly report it. This is foundational for the SEE!",
        },
        {
          title: 'Taxable vs. Tax-Exempt Interest',
          type: 'table',
          headers: ['Type', 'Tax Treatment', 'Reported On'],
          rows: [
            ['Bank account interest', 'Fully taxable', 'Form 1099-INT Box 1'],
            ['CD interest', 'Fully taxable', 'Form 1099-INT Box 1'],
            ['Treasury bonds/bills/notes', 'Federal taxable, State exempt', 'Form 1099-INT'],
            ['Municipal bonds', 'Federal exempt, may be State taxable', 'Form 1099-INT Box 8'],
            ['Private activity bonds', 'May be AMT preference', 'Form 1099-INT Box 9'],
          ],
        },
        {
          title: 'Original Issue Discount (OID)',
          type: 'text',
          content: "**What is OID?**\nThe difference between a bond's stated redemption price at maturity and its original issue price.\n\n**How it's taxed:**\n• Treated as interest income over the life of the bond\n• Must include in income each year, even if not received\n• Reported on Form 1099-OID\n\n**Example:**\n• Buy bond for $900, matures at $1,000\n• OID = $100 spread over holding period\n• Include portion as interest income annually",
        },
        {
          title: 'Series EE and I Savings Bonds',
          type: 'text',
          content: "**General Rule:**\nInterest is taxable when the bond is redeemed (cash method).\n\n**Election to report annually:**\n• Can elect to report interest each year\n• Once elected, applies to all bonds and future bonds\n\n**Education Exclusion (Series EE/I):**\n• Can exclude interest if used for qualified education expenses\n• Must be purchased when owner is 24+\n• Income limitations apply\n• Must be used for tuition and fees (not room/board)",
        },
        {
          title: 'Nominee Interest',
          type: 'text',
          content: "**What is Nominee Interest?**\nInterest reported to you on Form 1099-INT that actually belongs to someone else.\n\n**How to handle:**\n1. Include the full amount on Schedule B\n2. Subtract nominee portion with \"NOMINEE\" notation\n3. Issue Form 1099-INT to the actual owner (if $10+)\n\n**Common situations:**\n• Joint accounts where other person is beneficial owner\n• Custodial accounts",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Bank and CD interest is fully taxable",
            "Treasury bond interest is federal taxable but state exempt",
            "Municipal bond interest is federal exempt",
            "OID must be included in income annually as it accrues",
            "Series EE/I bond interest can be deferred until redemption",
            "Education exclusion available for EE/I bonds used for tuition",
            "Nominee interest must be reported and then subtracted",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-011',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Dividend Income',
    description: 'Master the taxation of ordinary and qualified dividends',
    order: 11,
    duration: 35,
    difficulty: 'beginner',
    topics: ['Qualified dividends', 'Ordinary dividends', 'Capital gain distributions'],
    blueprintArea: 'SEE1-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Dividends are taxed at different rates depending on their classification. Knowing the difference between qualified and ordinary dividends can significantly impact your client's tax liability.",
        },
        {
          title: 'Types of Dividends',
          type: 'table',
          headers: ['Type', 'Tax Rate', 'Requirements'],
          rows: [
            ['Qualified dividends', '0%, 15%, or 20%', 'Holding period met, from domestic corp or qualified foreign corp'],
            ['Ordinary dividends', 'Ordinary income rates', 'All dividends that don\'t qualify for preferential rates'],
            ['Capital gain distributions', 'LTCG rates', 'From mutual funds, represents fund\'s LTCG'],
            ['Nontaxable distributions', 'Not taxable (return of capital)', 'Reduces basis in stock'],
          ],
        },
        {
          title: 'Qualified Dividend Requirements',
          type: 'text',
          content: "**To qualify for preferential rates:**\n\n**1. Holding Period:**\n• Must hold stock for more than 60 days during 121-day period\n• Period starts 60 days before ex-dividend date\n\n**2. Type of Stock:**\n• Domestic corporation stock\n• Qualified foreign corporation stock\n• NOT dividends from tax-exempt organizations\n• NOT dividends from REITs (generally)\n\n**Qualified dividends appear in Box 1b of Form 1099-DIV**",
        },
        {
          title: '⚠️ Exam Trap: REIT and Mutual Fund Dividends',
          type: 'warning',
          content: "**REIT Dividends:**\n• Generally NOT qualified dividends\n• Taxed as ordinary income\n• Exception: Capital gain distributions from REIT\n\n**Mutual Fund Dividends:**\n• Can be qualified if underlying stocks meet requirements\n• Capital gain distributions are always LTCG rate\n• Look at 1099-DIV boxes carefully!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Qualified dividends taxed at 0%, 15%, or 20% rates",
            "Must hold stock 60+ days in 121-day window",
            "REIT dividends are generally ordinary income",
            "Capital gain distributions get LTCG treatment",
            "Return of capital reduces basis, not immediately taxable",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-012',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Rental Income and Expenses',
    description: 'Learn to properly report rental income and deductible expenses on Schedule E',
    order: 12,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Schedule E', 'Rental expenses', 'Personal use', 'Passive activity rules'],
    blueprintArea: 'SEE1-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Rental real estate is one of the most common investments. Understanding how to properly report income and expenses, handle mixed-use situations, and navigate passive activity rules is essential for serving clients.",
        },
        {
          title: 'Rental Income',
          type: 'text',
          content: "**What is Rental Income?**\nAny payment received for the use or occupation of property.\n\n**Includes:**\n• Rent payments\n• Advance rent (taxable when received)\n• Security deposits kept\n• Tenant-paid expenses (fair market value)\n• Cancellation payments\n\n**Does NOT include:**\n• Refundable security deposits (until kept)\n• Tenant improvements in lieu of rent (special rules)",
        },
        {
          title: 'Deductible Rental Expenses',
          type: 'table',
          headers: ['Expense', 'Deductible?', 'Notes'],
          rows: [
            ['Mortgage interest', 'Yes', 'On Schedule E, not Schedule A'],
            ['Property taxes', 'Yes', 'Schedule E'],
            ['Insurance', 'Yes', 'Fire, liability, flood'],
            ['Repairs and maintenance', 'Yes', 'Keeps property in working condition'],
            ['Utilities', 'Yes', 'If landlord pays'],
            ['Depreciation', 'Yes', 'Must depreciate improvements'],
            ['Management fees', 'Yes', 'Including HOA fees'],
            ['Improvements', 'No (capitalize)', 'Depreciate over useful life'],
          ],
        },
        {
          title: 'Depreciation of Rental Property',
          type: 'text',
          content: "**Residential Rental Property:**\n• 27.5 years straight-line\n• Mid-month convention\n\n**Nonresidential Rental Property:**\n• 39 years straight-line\n• Mid-month convention\n\n**Land is never depreciable!**\n\n**Basis for depreciation:**\n• Cost + improvements - land value\n• Allocate purchase price between land and building",
        },
        {
          title: 'Personal Use Days Test',
          type: 'text',
          content: "**The \"14-Day\" or \"10%\" Rules:**\n\n**Minimal personal use (true rental):**\n• Personal use ≤ GREATER of 14 days or 10% of rental days\n• Full rental expense deductions allowed\n• Passive activity rules apply\n\n**Dwelling unit as residence:**\n• Personal use > GREATER of 14 days or 10% of rental days\n• Property is treated as residence\n• Rental expenses limited to rental income\n• No loss allowed to offset other income\n\n**Personal use = Used by owner, family, or anyone paying less than fair rent**",
        },
        {
          title: '⚠️ Exam Trap: Vacation Home Rules',
          type: 'warning',
          content: "**Special Scenario: Rented AND Personal Use**\n\nIf property rented < 15 days AND used personally:\n• Rental income is TAX-FREE (not reported!)\n• No rental expenses deductible\n• Mortgage interest and taxes may still be deductible on Schedule A\n\n**This is the famous \"Augusta Rule\" - commonly tested!**",
        },
        {
          title: 'Passive Activity Loss Rules',
          type: 'text',
          content: "**Rental activities are generally passive!**\n\n• Losses limited to passive income\n• Excess losses suspended and carried forward\n\n**$25,000 Exception:**\n• Can deduct up to $25,000 of rental losses against nonpassive income\n• Must actively participate (make management decisions)\n• Phases out: AGI $100,000 - $150,000\n• Completely gone at $150,000 AGI\n\n**Real Estate Professional Exception:**\n• More than 50% of services in real property trades\n• 750+ hours of material participation\n• All rental activities can be treated as nonpassive",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Advance rent is taxable when received, not when earned",
            "Security deposits are income only when kept",
            "Residential rental property depreciates over 27.5 years",
            "Personal use > 14 days or 10% = treated as residence",
            "Rented < 15 days = income tax-free, no expense deduction",
            "$25,000 rental loss exception phases out $100K-$150K AGI",
            "Real estate professionals can deduct rental losses fully",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-015',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Sale of Residence',
    description: 'Master Section 121 exclusion and proper reporting of home sale gains',
    order: 15,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Section 121', '$250,000/$500,000 exclusion', 'Ownership and use tests'],
    blueprintArea: 'SEE1-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The Section 121 exclusion is one of the best tax breaks available! Qualified homeowners can exclude up to $500,000 of gain on their primary residence sale. This is heavily tested on the SEE.",
        },
        {
          title: 'Section 121 Exclusion Amounts',
          type: 'table',
          headers: ['Filing Status', 'Maximum Exclusion', 'Requirements'],
          rows: [
            ['Single/HOH', '$250,000', 'Ownership + use tests met'],
            ['MFJ (either qualifies)', '$250,000', 'Only one spouse meets tests'],
            ['MFJ (both qualify)', '$500,000', 'Both own, both use, neither excluded gain in 2 years'],
            ['MFS', '$250,000 each', 'Each must meet tests independently'],
          ],
        },
        {
          title: 'Ownership and Use Tests',
          type: 'text',
          content: "**Both tests must be met during the 5 years before sale:**\n\n**Ownership Test:**\n• Owned the home for at least 2 years\n• OR periods that aggregate to 2 years\n\n**Use Test:**\n• Used as principal residence for at least 2 years\n• OR periods that aggregate to 2 years\n• Can be different 2-year periods than ownership\n\n**The \"2-out-of-5-year\" rule:**\n• Look back 5 years from date of sale\n• Need 24 months (730 days) of ownership\n• Need 24 months (730 days) of use as principal residence",
        },
        {
          title: '🧠 Memory Aid: Section 121 Tests',
          type: 'callout',
          content: "**\"2/2/5\"** Rule:\n\n• **2** years of ownership\n• **2** years of use\n• During the **5** years before sale\n\n**Plus:** Cannot have used exclusion in prior 2 years!",
        },
        {
          title: 'Reduced Exclusion',
          type: 'text',
          content: "**Partial exclusion available if tests not fully met due to:**\n\n• Change in place of employment (at least 50 miles)\n• Health reasons (doctor's order)\n• Unforeseen circumstances (divorce, disaster, etc.)\n\n**Calculate reduced exclusion:**\n\nProrated amount = Maximum exclusion × (Short period / 2 years)\n\n**Example:**\nOwned/used 1 year due to job transfer\nReduced exclusion = $250,000 × (1/2) = $125,000",
        },
        {
          title: 'Special Situations',
          type: 'table',
          headers: ['Situation', 'Rule'],
          rows: [
            ['Death of spouse', 'Surviving spouse can use $500,000 if sold within 2 years of death'],
            ['Divorce transfer', 'Receiving spouse includes transferring spouse\'s ownership time'],
            ['Military duty', 'Can suspend 5-year period for up to 10 years'],
            ['Rental conversion', 'Depreciation cannot be excluded (recaptured at 25%)'],
            ['Two homes', 'Must determine which is principal residence based on facts'],
          ],
        },
        {
          title: '⚠️ Exam Trap: Depreciation Recapture',
          type: 'warning',
          content: "**If home was ever used for business or rental:**\n\n• Section 121 exclusion does NOT apply to depreciation\n• Must recapture depreciation as gain at 25% rate\n• This is \"unrecaptured Section 1250 gain\"\n\n**Example:**\n• Total gain: $300,000\n• Depreciation taken: $20,000\n• Excludable: $280,000 (under limit)\n• Taxable: $20,000 at 25% = $5,000 tax",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Single taxpayers exclude up to $250,000 of gain",
            "Married filing jointly can exclude up to $500,000",
            "Must meet 2-year ownership AND 2-year use tests in prior 5 years",
            "Cannot have used exclusion in prior 2 years",
            "Reduced exclusion available for job, health, unforeseen circumstances",
            "Depreciation taken cannot be excluded - recaptured at 25%",
            "Military can suspend the 5-year period up to 10 years",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-016',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Retirement Income and Distributions',
    description: 'Understand taxation of IRA, 401(k), pension, and Social Security distributions',
    order: 16,
    duration: 60,
    difficulty: 'intermediate',
    topics: ['Traditional IRA', 'Roth IRA', '401(k)', 'Social Security taxation'],
    blueprintArea: 'SEE1-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Retirement distributions are a major source of income for many clients. Knowing when distributions are taxable, how to handle early withdrawals, and the complex Social Security rules is essential.",
        },
        {
          title: 'Traditional IRA/401(k) Distributions',
          type: 'text',
          content: "**General Rule:**\nDistributions from traditional retirement accounts are FULLY taxable as ordinary income.\n\n**Exception for basis:**\nIf nondeductible contributions were made, portion of distribution is tax-free (pro-rata rule).\n\n**Early Distribution Penalty (10%):**\nApplies to distributions before age 59½ unless exception applies.\n\n**Required Minimum Distributions (RMDs):**\n• Must begin at age 73 (under SECURE 2.0)\n• Penalty for failure: 25% of amount not withdrawn (was 50%)\n• Reduced to 10% if corrected timely",
        },
        {
          title: 'Early Distribution Exceptions',
          type: 'table',
          headers: ['Exception', 'Applies to IRA?', 'Applies to 401(k)?'],
          rows: [
            ['Death', 'Yes', 'Yes'],
            ['Disability', 'Yes', 'Yes'],
            ['Medical expenses > 7.5% AGI', 'Yes', 'Yes'],
            ['SEPP (72(t) payments)', 'Yes', 'Yes'],
            ['First-time homebuyer ($10,000)', 'Yes', 'No'],
            ['Qualified higher education', 'Yes', 'No'],
            ['Separation from service at 55+', 'No', 'Yes'],
            ['QDRO (divorce)', 'No', 'Yes'],
          ],
        },
        {
          title: 'Roth IRA Rules',
          type: 'text',
          content: "**Qualified Distributions (Tax-Free):**\nDistribution is qualified if:\n• 5-year holding period met, AND\n• Age 59½, death, disability, or first-time homebuyer ($10K)\n\n**5-Year Holding Period:**\n• Starts January 1 of year first Roth created/converted\n• Each conversion has its own 5-year period for under-59½\n\n**Ordering Rules for Nonqualified:**\n1. Regular contributions (always tax and penalty-free)\n2. Conversions (taxable if under 5 years and under 59½)\n3. Earnings (taxable and 10% penalty if nonqualified)",
        },
        {
          title: 'Social Security Taxation',
          type: 'text',
          content: "**Modified AGI Threshold Test:**\n\nProvisional Income = AGI + 50% of SS benefits + tax-exempt interest\n\n**Single/HOH Thresholds:**\n• Below $25,000: 0% taxable\n• $25,000 - $34,000: Up to 50% taxable\n• Above $34,000: Up to 85% taxable\n\n**MFJ Thresholds:**\n• Below $32,000: 0% taxable\n• $32,000 - $44,000: Up to 50% taxable\n• Above $44,000: Up to 85% taxable\n\n**Maximum 85% of benefits can ever be taxable!**",
        },
        {
          title: '⚠️ Exam Trap: SS Calculation',
          type: 'warning',
          content: "**The Social Security calculation appears complex but follow these steps:**\n\n1. Calculate provisional income (AGI + ½ SS + tax-exempt interest)\n2. Compare to thresholds\n3. Calculate using the lesser of formulas\n\n**Key:** Tax-exempt interest IS included in provisional income!\n\n**MFS living with spouse:** 85% is always taxable (no threshold benefit)",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Traditional IRA/401(k) distributions are fully taxable (except basis)",
            "10% early withdrawal penalty applies before age 59½ with exceptions",
            "RMDs begin at age 73 under SECURE 2.0",
            "Roth qualified distributions require 5-year hold plus age 59½",
            "Social Security: up to 85% can be taxable based on provisional income",
            "First-time homebuyer exception: IRA only, not 401(k)",
            "Age 55 separation from service: 401(k) only, not IRA",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // SEE1-3: DEDUCTIONS AND ADJUSTMENTS (Lessons 23-35)
  // ============================================================================

  {
    id: 'SEE1-025',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Standard vs. Itemized Deductions',
    description: 'Determine when to itemize and understand the standard deduction amounts',
    order: 25,
    duration: 45,
    difficulty: 'beginner',
    topics: ['Standard deduction', 'Itemized deductions', 'Schedule A'],
    blueprintArea: 'SEE1-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Every individual return requires a deduction choice. The TCJA nearly doubled standard deductions, so many taxpayers no longer benefit from itemizing. Know both options to advise clients correctly!",
        },
        {
          title: '2024 Standard Deductions',
          type: 'table',
          headers: ['Filing Status', 'Under 65', '65 or Blind', 'Both 65+ and Blind'],
          rows: [
            ['Single', '$14,600', '+$1,950', '+$3,900'],
            ['MFJ', '$29,200', '+$1,550 each', '+$3,100 each'],
            ['MFS', '$14,600', '+$1,550', '+$3,100'],
            ['HOH', '$21,900', '+$1,950', '+$3,900'],
          ],
        },
        {
          title: 'Who CANNOT Use Standard Deduction?',
          type: 'text',
          content: "**Must itemize if:**\n\n• MFS and spouse itemizes (both must use same method)\n• Nonresident alien or dual-status alien\n• Estate or trust\n• Short tax year due to accounting period change\n\n**Can be claimed as dependent:**\n• Standard deduction limited to GREATER of:\n  - $1,300, or\n  - Earned income + $450 (up to normal amount)",
        },
        {
          title: 'Itemized Deduction Categories',
          type: 'list',
          content: [
            "Medical and dental expenses (exceeding 7.5% AGI floor)",
            "Taxes paid (SALT limited to $10,000)",
            "Home mortgage interest (limited to $750,000 debt)",
            "Charitable contributions (various AGI limits)",
            "Casualty losses (federally declared disasters only)",
            "Other itemized deductions (limited under TCJA)",
          ],
        },
        {
          title: '⚠️ TCJA Changes (Expires 2026)',
          type: 'warning',
          content: "**Current law through 2025:**\n\n• Standard deduction nearly doubled\n• SALT deduction capped at $10,000\n• Miscellaneous itemized deductions suspended\n• Home equity loan interest not deductible (unless home acquisition)\n• Casualty losses only for federal disasters\n\n**2026 sunset:** These revert to pre-TCJA rules unless extended!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Standard deduction is $14,600 single / $29,200 MFJ (2024)",
            "Additional deduction for age 65+ and/or blind",
            "MFS must both use same method (standard or itemized)",
            "Dependents have limited standard deduction",
            "SALT cap ($10,000) applies through 2025",
            "Compare itemized total to standard deduction - use larger",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-026',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Medical and Dental Expenses',
    description: 'Learn what medical expenses are deductible and how to calculate the deduction',
    order: 26,
    duration: 40,
    difficulty: 'beginner',
    topics: ['Qualified medical expenses', '7.5% AGI floor', 'Whose expenses'],
    blueprintArea: 'SEE1-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Medical expenses can be substantial, but few taxpayers can deduct them due to the 7.5% AGI floor. Know what qualifies and how to maximize this deduction for clients with high medical costs.",
        },
        {
          title: 'The 7.5% AGI Floor',
          type: 'text',
          content: "**Only expenses EXCEEDING 7.5% of AGI are deductible!**\n\n**Example:**\n• AGI: $100,000\n• Medical expenses: $10,000\n• Floor: $100,000 × 7.5% = $7,500\n• Deductible amount: $10,000 - $7,500 = **$2,500**\n\nWith high standard deductions, many taxpayers get no benefit even with significant medical costs.",
        },
        {
          title: 'Qualified Medical Expenses',
          type: 'table',
          headers: ['Deductible', 'Not Deductible'],
          rows: [
            ['Doctor, dentist, hospital fees', 'Cosmetic surgery (unless injury/deformity)'],
            ['Prescription medications', 'Over-the-counter medicines (unless prescribed)'],
            ['Insulin', 'Weight loss programs for general health'],
            ['Medical equipment', 'Gym memberships'],
            ['Mental health treatment', 'Tuition at regular school'],
            ['Long-term care (within limits)', 'Illegal operations/treatments'],
            ['Medical miles (67¢ for 2024)', 'Future medical expenses'],
            ['Insurance premiums (not pre-tax)', 'Medicare Part A (if covered by SS)'],
          ],
        },
        {
          title: 'Whose Expenses Qualify?',
          type: 'text',
          content: "**You can deduct medical expenses for:**\n\n• Yourself\n• Your spouse\n• Your dependents (using dependency rules)\n• Person who WOULD be your dependent except for:\n  - Filing a joint return\n  - Having gross income ≥ $5,050\n  - You being claimed as dependent\n\n**Key:** The gross income limit doesn't block medical expense deduction!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Only expenses exceeding 7.5% of AGI are deductible",
            "Cosmetic procedures not deductible unless for injury/deformity",
            "Prescriptions and insulin are deductible",
            "Can deduct for dependents and \"almost-dependents\"",
            "Medical insurance premiums deductible if not pre-tax",
            "Must itemize to claim medical expense deduction",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-027',
    courseId: 'ea',
    section: 'SEE1',
    title: 'State and Local Taxes (SALT)',
    description: 'Understand the $10,000 SALT deduction cap and what taxes qualify',
    order: 27,
    duration: 35,
    difficulty: 'beginner',
    topics: ['SALT cap', 'Income tax vs sales tax', 'Property taxes'],
    blueprintArea: 'SEE1-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The SALT cap is one of the most significant TCJA changes affecting high-tax state residents. The $10,000 limit ($5,000 MFS) drastically changed who benefits from itemizing.",
        },
        {
          title: 'SALT Deduction Components',
          type: 'text',
          content: "**State and local income taxes** OR **general sales taxes** (choose one)\n**PLUS:**\n**Real property taxes** (primary residence \n+ vacation home)\n**Personal property taxes** (if based on value)\n\n**ALL COMBINED LIMITED TO $10,000 ($5,000 MFS)**",
        },
        {
          title: 'Income Tax vs. Sales Tax Election',
          type: 'text',
          content: "**Choose the larger of:**\n\n**State/Local Income Taxes:**\n• Actual withholding and estimated payments\n• Prior year state tax paid (if claimed when paid)\n\n**General Sales Taxes:**\n• Actual receipts (must keep records), OR\n• IRS tables (based on income, family size, location)\n• Add actual sales tax on major purchases\n\n**Tip:** Sales tax election often better in states with no income tax (TX, FL, WA, etc.)",
        },
        {
          title: '⚠️ Exam Trap: Foreign Taxes',
          type: 'warning',
          content: "**Foreign income taxes are NOT part of SALT!**\n\n• Foreign taxes deducted separately (OR claimed as credit)\n• Not subject to $10,000 cap\n• Most taxpayers benefit more from foreign tax credit",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "SALT cap is $10,000 ($5,000 MFS) through 2025",
            "Choose income taxes OR sales taxes (not both)",
            "Property taxes on main home and vacation home qualify",
            "Foreign taxes not subject to SALT cap",
            "Cap scheduled to expire after 2025",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-028',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Mortgage Interest Deduction',
    description: 'Learn the rules for deducting home mortgage interest',
    order: 28,
    duration: 40,
    difficulty: 'beginner',
    topics: ['Acquisition debt', 'Points', 'Home equity debt'],
    blueprintArea: 'SEE1-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The mortgage interest deduction is a significant tax benefit for homeowners. TCJA reduced the debt limit and changed home equity rules - know the current law!",
        },
        {
          title: 'Acquisition Debt Limits',
          type: 'table',
          headers: ['Debt Incurred', 'Limit (MFJ)', 'Limit (MFS)'],
          rows: [
            ['Before 12/15/2017', '$1,000,000', '$500,000'],
            ['On or after 12/15/2017', '$750,000', '$375,000'],
          ],
        },
        {
          title: 'Acquisition Debt Definition',
          type: 'text',
          content: "**Acquisition debt is debt used to:**\n• Buy the home\n• Build the home\n• Substantially improve the home\n\n**Secured by the home (main or second home)**\n\n**Home equity debt (HELOC for other purposes):**\n• NOT deductible 2018-2025 unless used to improve the home\n• Interest on HELOC for kitchen remodel = deductible\n• Interest on HELOC to pay off credit cards = NOT deductible",
        },
        {
          title: 'Mortgage Points',
          type: 'text',
          content: "**Points on purchase of main home:**\n• Generally fully deductible in year paid\n• Must be for main residence\n• Charging points must be established practice in area\n• Points stated on settlement statement\n\n**Points on refinance:**\n• Must be amortized over life of loan\n• Exception: Portion for home improvements may be current\n• Old loan unamortized points deductible when refinanced",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Acquisition debt limit is $750,000 for debt after 12/15/2017",
            "Home equity interest not deductible unless used to improve home",
            "Points on purchase generally deductible immediately",
            "Points on refinance must be amortized",
            "Applies to main home and one second home",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-029',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Charitable Contributions',
    description: 'Master the rules for deducting donations to qualified charities',
    order: 29,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['AGI limits', 'Cash vs property', 'Documentation requirements'],
    blueprintArea: 'SEE1-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Charitable giving is both personally rewarding and tax-advantageous when done correctly. Know the limits, documentation rules, and special provisions for maximum benefit.",
        },
        {
          title: 'AGI Limitations by Type',
          type: 'table',
          headers: ['Type of Contribution', 'AGI Limit', 'Notes'],
          rows: [
            ['Cash to public charities', '60%', 'Most common limit'],
            ['Appreciated capital gain property', '30%', 'Public charities'],
            ['Cash to private foundations', '30%', 'Less favorable'],
            ['Appreciated property to private foundations', '20%', 'Least favorable'],
          ],
        },
        {
          title: 'Qualified Organizations',
          type: 'text',
          content: "**Deductible contributions to:**\n• Churches, synagogues, mosques\n• Nonprofit educational organizations\n• Nonprofit hospitals\n• Public parks and recreation organizations\n• United Way, Red Cross, Salvation Army\n• Volunteer fire companies\n• 501(c)(3) organizations\n\n**NOT deductible:**\n• Individuals (no matter how needy)\n• Political organizations or candidates\n• Social clubs\n• Foreign organizations (generally)\n• Contributions for which you receive equal value",
        },
        {
          title: 'Property Donations',
          type: 'text',
          content: "**Appreciated capital gain property held > 1 year:**\n• Deduct fair market value\n• 30% AGI limit applies\n• Can elect 50% limit with basis-only deduction\n\n**Ordinary income property:**\n• Deduct the lesser of FMV or basis\n• Includes inventory, artwork by creator\n\n**Vehicle, boat, or airplane donations:**\n• If charity sells for > $500, limited to sales price\n• If used significantly by charity, FMV allowed\n• Form 1098-C required for acknowledgment",
        },
        {
          title: 'Documentation Requirements',
          type: 'table',
          headers: ['Amount', 'Documentation Required'],
          rows: [
            ['< $250', 'Receipt or bank record'],
            ['$250+', 'Written acknowledgment from charity'],
            ['$250+ with goods/services received', 'Acknowledgment must describe goods/services'],
            ['$500+ noncash', 'Form 8283 Section A'],
            ['$5,000+ noncash (except public securities)', 'Form 8283 Section B + qualified appraisal'],
          ],
        },
        {
          title: 'Special Rules',
          type: 'text',
          content: "**Qualified Charitable Distribution (QCD):**\n• Age 70½ or older\n• Direct transfer from IRA to charity\n• Up to $105,000 per year (2024)\n• Satisfies RMD but not included in income\n• Better than deduction for many taxpayers\n\n**Bunching Strategy:**\n• Contribute multiple years' donations in one year\n• Itemize that year, standard deduction other years\n• Donor-advised funds facilitate this",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Cash contributions limited to 60% of AGI",
            "Appreciated property contributions limited to 30% of AGI",
            "Written acknowledgment required for $250+ donations",
            "Qualified appraisal needed for $5,000+ noncash donations",
            "QCD is powerful tool for those 70½+ with RMDs",
            "Carryforward available for 5 years if limits exceeded",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // SEE1-4: TAX COMPUTATION (Lessons 36-40)
  // ============================================================================

  {
    id: 'SEE1-036',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Tax Rates and Tax Tables',
    description: 'Understand the graduated tax rate structure and how to compute tax liability',
    order: 36,
    duration: 35,
    difficulty: 'beginner',
    topics: ['Tax brackets', 'Marginal rates', 'Effective tax rate'],
    blueprintArea: 'SEE1-4',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Understanding the progressive tax system is fundamental. Know how marginal rates work, and you'll never confuse a client about whether earning more money actually costs them more than they earn!",
        },
        {
          title: '2024 Tax Brackets - Single',
          type: 'table',
          headers: ['Taxable Income', 'Tax Rate', 'Tax on Previous Brackets'],
          rows: [
            ['$0 - $11,600', '10%', '$0'],
            ['$11,601 - $47,150', '12%', '$1,160'],
            ['$47,151 - $100,525', '22%', '$5,426'],
            ['$100,526 - $191,950', '24%', '$17,168.50'],
            ['$191,951 - $243,725', '32%', '$39,110.50'],
            ['$243,726 - $609,350', '35%', '$55,678.50'],
            ['Over $609,350', '37%', '$183,647.25'],
          ],
        },
        {
          title: '2024 Tax Brackets - MFJ',
          type: 'table',
          headers: ['Taxable Income', 'Tax Rate', 'Tax on Previous Brackets'],
          rows: [
            ['$0 - $23,200', '10%', '$0'],
            ['$23,201 - $94,300', '12%', '$2,320'],
            ['$94,301 - $201,050', '22%', '$10,852'],
            ['$201,051 - $383,900', '24%', '$34,337'],
            ['$383,901 - $487,450', '32%', '$78,221'],
            ['$487,451 - $731,200', '35%', '$111,357'],
            ['Over $731,200', '37%', '$196,669.50'],
          ],
        },
        {
          title: 'Marginal vs. Effective Rate',
          type: 'text',
          content: "**Marginal Rate:**\nThe rate on your LAST dollar of income - your tax bracket.\n\n**Effective Rate:**\nTotal tax divided by total income - your average rate.\n\n**Example (Single, $100,000 taxable income):**\n• Marginal rate: 22%\n• Tax: $1,160 + $4,266 + $11,647.38 = $17,073\n• Effective rate: ~17.1%\n\n**Key:** Moving into a higher bracket only affects income IN that bracket!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "U.S. has 7 tax brackets: 10%, 12%, 22%, 24%, 32%, 35%, 37%",
            "MFJ brackets are generally double Single brackets (except 35%/37%)",
            "Marginal rate applies only to income in that bracket",
            "Effective rate is always lower than marginal rate",
            "Tax tables used for income under $100,000",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-037',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Alternative Minimum Tax (AMT)',
    description: 'Understand the parallel AMT system and who it affects',
    order: 37,
    duration: 50,
    difficulty: 'advanced',
    topics: ['AMT income', 'Exemption amounts', 'Preference items'],
    blueprintArea: 'SEE1-4',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The AMT is a parallel tax system designed to ensure high-income taxpayers pay a minimum amount. While TCJA reduced AMT impact, it still affects some taxpayers, especially with large ISO exercises or significant state tax deductions.",
        },
        {
          title: 'How AMT Works',
          type: 'text',
          content: "**Two-step process:**\n\n1. Calculate regular tax liability\n2. Calculate tentative minimum tax (TMT)\n\n**AMT = TMT - Regular Tax** (if positive)\n\n**2024 AMT Rates:**\n• 26% on first $232,600 (MFJ) of AMTI above exemption\n• 28% on AMTI above that amount\n\n**2024 Exemption Amounts:**\n• Single/HOH: $85,700\n• MFJ: $133,300\n• MFS: $66,650",
        },
        {
          title: 'Common AMT Adjustments',
          type: 'table',
          headers: ['Item', 'Regular Tax', 'AMT'],
          rows: [
            ['SALT deduction', 'Up to $10,000', 'Not allowed'],
            ['Misc. itemized deductions', 'Not allowed', 'Not allowed'],
            ['Standard deduction', 'Allowed', 'Not allowed'],
            ['Personal exemptions', 'Suspended', 'Suspended'],
            ['Medical expenses', '7.5% floor', '7.5% floor'],
            ['ISO exercise', 'No income', 'Bargain element is income'],
          ],
        },
        {
          title: 'AMT Preference Items',
          type: 'text',
          content: "**Add to regular taxable income:**\n\n• Private activity bond interest (tax-exempt for regular tax)\n• Percentage depletion in excess of basis\n• Pre-1987 accelerated depreciation\n\n**Important for ISO:**\nExercising incentive stock options creates AMT income equal to the bargain element (FMV - exercise price), even though no regular income is recognized.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "AMT ensures minimum tax is paid by high-income taxpayers",
            "AMT rates are 26% and 28%",
            "SALT deduction not allowed for AMT",
            "ISO exercise is a major AMT trigger",
            "TCJA increased exemptions, reducing AMT impact",
            "AMT credit may be available for future years",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // SEE1-5: CREDITS (Lessons 41-50)
  // ============================================================================

  {
    id: 'SEE1-041',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Child Tax Credit',
    description: 'Master the child tax credit and credit for other dependents',
    order: 41,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['CTC', 'ACTC', 'Credit for other dependents'],
    blueprintArea: 'SEE1-5',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The Child Tax Credit is one of the most valuable family credits. Understanding who qualifies, the refundable portion, and income limits helps maximize benefits for clients with children.",
        },
        {
          title: 'Child Tax Credit Basics (2024)',
          type: 'table',
          headers: ['Feature', 'Amount', 'Notes'],
          rows: [
            ['CTC per qualifying child', '$2,000', 'Nonrefundable portion'],
            ['Refundable (ACTC) maximum', '$1,700', 'Per qualifying child'],
            ['Credit for Other Dependents', '$500', 'Nonrefundable'],
            ['AGI phase-out begins', '$200,000 ($400,000 MFJ)', '$50 reduction per $1,000 over'],
          ],
        },
        {
          title: 'Qualifying Child for CTC',
          type: 'text',
          content: "**Must meet ALL of these:**\n\n• Under age 17 at end of tax year\n• Your qualifying child (per dependency rules)\n• U.S. citizen, national, or resident alien\n• Claimed as YOUR dependent\n• Has valid SSN (not ITIN)\n\n**Key:** Must have SSN by return due date (including extensions)",
        },
        {
          title: 'Additional Child Tax Credit (ACTC)',
          type: 'text',
          content: "**The refundable portion:**\n\nUp to $1,700 per qualifying child (2024)\n\n**Calculated as:**\n15% of earned income over $2,500\n\n**Example:**\n• Earned income: $20,000\n• Calculation: ($20,000 - $2,500) × 15% = $2,625\n• Limited to $1,700 per child\n\n**Three qualifying children or more:**\nAlternative calculation using excess FICA taxes may apply.",
        },
        {
          title: 'Credit for Other Dependents',
          type: 'text',
          content: "**$500 nonrefundable credit for:**\n\n• Dependents age 17+\n• Dependents who don't have SSN (ITIN holders)\n• Parents and other non-child dependents\n• Children under 17 with only ITIN\n\n**Same AGI phase-out as CTC applies**",
        },
        {
          title: '⚠️ Exam Trap: ITIN vs SSN',
          type: 'warning',
          content: "**Child with ITIN = $500 Credit for Other Dependents**\n**Child with SSN = $2,000 CTC**\n\n**Parent has ITIN but child has SSN:**\nFull $2,000 CTC allowed!\n\n**Key:** It's the CHILD'S number that matters for the credit amount.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "CTC is $2,000 per qualifying child under 17",
            "ACTC (refundable portion) limited to $1,700 per child",
            "Child must have valid SSN for full CTC",
            "Credit for Other Dependents is $500 for non-CTC dependents",
            "Phase-out begins at $200,000 ($400,000 MFJ)",
            "ITIN holders get $500 credit, not full CTC",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-042',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Child and Dependent Care Credit',
    description: 'Learn the rules for claiming the dependent care credit',
    order: 42,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Qualifying expenses', 'AGI limitations', 'Employer benefits'],
    blueprintArea: 'SEE1-5',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Working parents need care for their children. This credit helps offset those costs, but has specific rules about qualifying expenses and the work requirement.",
        },
        {
          title: 'Credit Calculation',
          type: 'text',
          content: "**Credit = Applicable Percentage × Qualified Expenses**\n\n**Maximum Qualified Expenses:**\n• $3,000 for one qualifying person\n• $6,000 for two or more\n\n**Applicable Percentage:**\n• 35% for AGI ≤ $15,000\n• Reduces by 1% for each $2,000 over $15,000\n• Floors at 20% for AGI over $43,000\n\n**Maximum Credit:**\n• $1,050 (one qualifying person) at 35%\n• $2,100 (two or more) at 35%\n• $600/$1,200 at 20% (most taxpayers)",
        },
        {
          title: 'Qualifying Person',
          type: 'text',
          content: "**Care must be for:**\n\n1. Your dependent under age 13\n   - Must be your qualifying child\n   - Must have lived with you more than half the year\n\n2. Your disabled spouse\n   - Physically or mentally incapable of self-care\n   - Lived with you more than half the year\n\n3. Any disabled dependent\n   - Any age if disabled\n   - Must be your dependent",
        },
        {
          title: 'Work Requirement',
          type: 'text',
          content: "**Both spouses must have earned income** (MFJ)\n\n**Exception - Deemed earned income:**\n• Full-time student: $250/month (one dependent) or $500 (two+)\n• Disabled spouse: Same deemed amounts\n\n**Expense limitation:**\nCannot claim more than the lower-earning spouse's income.",
        },
        {
          title: 'Qualifying Expenses',
          type: 'table',
          headers: ['Qualifies', 'Does NOT Qualify'],
          rows: [
            ['Day care center', 'Overnight camp'],
            ['Babysitter fees', 'Schooling (1st grade+)'],
            ['Au pair (care portion)', 'Food and lodging separately stated'],
            ['Before/after school care', 'Payments to your child under 19'],
            ['Day camp (summer)', 'Payments to person you claim as dependent'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Credit is 20%-35% of up to $3,000/$6,000 expenses",
            "Must have earned income (both spouses if MFJ)",
            "Qualifying person must be under 13 (or disabled)",
            "Day camp qualifies; overnight camp does not",
            "Cannot pay your own dependent under 19",
            "Employer DCAP reduces expense limit dollar-for-dollar",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-043',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Education Credits',
    description: 'Master the American Opportunity Credit and Lifetime Learning Credit',
    order: 43,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['AOTC', 'LLC', 'Qualified expenses', 'Income limits'],
    blueprintArea: 'SEE1-5',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Education credits can be worth thousands! Know which credit is better for each situation - they're mutually exclusive per student per year.",
        },
        {
          title: 'Comparison Chart',
          type: 'table',
          headers: ['Feature', 'AOTC', 'LLC'],
          rows: [
            ['Maximum credit', '$2,500', '$2,000'],
            ['Refundable?', 'Yes (40%, up to $1,000)', 'No'],
            ['Years available', 'First 4 years only', 'Unlimited'],
            ['Enrollment', 'At least half-time', 'One or more courses'],
            ['Felony drug conviction', 'Disqualifies', 'Does not disqualify'],
            ['MFS eligible?', 'No', 'No'],
          ],
        },
        {
          title: 'American Opportunity Credit (AOTC)',
          type: 'text',
          content: "**Credit Calculation:**\n100% of first $2,000 + 25% of next $2,000 = **$2,500 max**\n\n**Requirements:**\n• First 4 years of postsecondary education\n• Pursuing degree or credential\n• At least half-time enrollment\n• No felony drug conviction\n\n**2024 Income Phase-out:**\n• Single: $80,000 - $90,000\n• MFJ: $160,000 - $180,000\n\n**40% Refundable:** Up to $1,000 can be refunded even with $0 tax",
        },
        {
          title: 'Lifetime Learning Credit (LLC)',
          type: 'text',
          content: "**Credit Calculation:**\n20% of up to $10,000 expenses = **$2,000 max**\n\n**Key differences from AOTC:**\n• Any year of study (not just first 4)\n• One course qualifies (no half-time requirement)\n• Career improvement courses qualify\n• NOT refundable\n\n**2024 Income Phase-out:**\n• Single: $80,000 - $90,000\n• MFJ: $160,000 - $180,000",
        },
        {
          title: 'Qualified Expenses',
          type: 'table',
          headers: ['Expense', 'AOTC', 'LLC'],
          rows: [
            ['Tuition', 'Yes', 'Yes'],
            ['Required fees', 'Yes', 'Yes'],
            ['Books and supplies', 'Yes (if required)', 'Only if paid to institution'],
            ['Equipment', 'Yes (if required)', 'Only if paid to institution'],
            ['Room and board', 'No', 'No'],
            ['Transportation', 'No', 'No'],
          ],
        },
        {
          title: '⚠️ Exam Trap: AOTC vs LLC Choice',
          type: 'warning',
          content: "**Can only claim ONE credit per student per year!**\n\n**Choose AOTC when:**\n• First 4 years of college\n• Would benefit from refundable portion\n• Student enrolled at least half-time\n\n**Choose LLC when:**\n• Graduate school\n• Fifth year or beyond\n• Part-time or single course\n• Career improvement (not degree)",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "AOTC: $2,500 max, 40% refundable, first 4 years only",
            "LLC: $2,000 max, nonrefundable, unlimited years",
            "Both phase out at same AGI levels ($80K-$90K single)",
            "AOTC requires half-time enrollment; LLC does not",
            "Books qualify for AOTC even if not paid to school",
            "Cannot claim MFS for either credit",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-044',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Premium Tax Credit',
    description: 'Understand the health insurance marketplace credit and reconciliation',
    order: 44,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['ACA', 'APTC', 'Reconciliation', 'Form 8962'],
    blueprintArea: 'SEE1-5',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The Premium Tax Credit helps individuals afford health insurance through the Marketplace. Understanding how advance payments work and the reconciliation process is essential for accurate tax returns.",
        },
        {
          title: 'PTC Basics',
          type: 'text',
          content: "**What is the PTC?**\nA refundable credit to help pay for health insurance purchased through the Health Insurance Marketplace (healthcare.gov).\n\n**How it works:**\n• Calculate annual PTC based on income and family size\n• Can receive advance payments (APTC) monthly to reduce premiums\n• Reconcile at tax time - may owe back or get more\n\n**Cannot have access to:**\n• Employer-sponsored coverage that's affordable/adequate\n• Medicare, Medicaid, CHIP\n• TRICARE, VA coverage",
        },
        {
          title: 'Income Requirements',
          type: 'text',
          content: "**Household income between:**\n• 100% - 400% of Federal Poverty Level (FPL)\n\n**2024 FPL Reference:**\n• 100% FPL (single): ~$14,580\n• 400% FPL (single): ~$58,320\n• Add ~$5,380 per additional household member\n\n**Special rule extended through 2025:**\nNo cliff at 400% FPL - credit phases out smoothly above 400%",
        },
        {
          title: 'Reconciliation Process',
          type: 'text',
          content: "**At tax time, compare:**\n• Advance PTC received during year\n• Actual PTC based on year-end income\n\n**If actual > advance:**\nClaim additional credit = refund increase\n\n**If advance > actual:**\nMust repay excess (subject to caps based on income)\n\n**Form 8962 required** for anyone who:\n• Received advance payments, or\n• Is claiming the PTC",
        },
        {
          title: 'Repayment Caps (2024)',
          type: 'table',
          headers: ['Income Level (%FPL)', 'Single Repayment Cap', 'MFJ Repayment Cap'],
          rows: [
            ['< 200%', '$375', '$775'],
            ['200% - 300%', '$950', '$1,900'],
            ['300% - 400%', '$1,575', '$3,175'],
            ['> 400%', 'Full repayment', 'Full repayment'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "PTC helps pay for Marketplace health insurance",
            "Income must be 100-400% FPL (extended cliff removal through 2025)",
            "APTC reduces monthly premiums in advance",
            "Form 8962 reconciles advance payments with actual eligibility",
            "May owe back excess APTC (repayment caps apply)",
            "MFS can now claim PTC in limited circumstances",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-045',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Retirement Savings Contributions Credit',
    description: 'Learn about the Saver\'s Credit for low-to-moderate income retirement contributions',
    order: 45,
    duration: 30,
    difficulty: 'beginner',
    topics: ['Saver\'s Credit', 'AGI limits', 'Eligible contributions'],
    blueprintArea: 'SEE1-5',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The Saver's Credit (officially Retirement Savings Contributions Credit) provides extra incentive for low-to-moderate income workers to save for retirement. It's often overlooked!",
        },
        {
          title: 'Credit Rates (2024)',
          type: 'table',
          headers: ['AGI (MFJ)', 'AGI (HOH)', 'AGI (Single/MFS)', 'Credit Rate'],
          rows: [
            ['Up to $46,000', 'Up to $34,500', 'Up to $23,000', '50%'],
            ['$46,001 - $50,000', '$34,501 - $37,500', '$23,001 - $25,000', '20%'],
            ['$50,001 - $76,500', '$37,501 - $57,375', '$25,001 - $38,250', '10%'],
            ['Over $76,500', 'Over $57,375', 'Over $38,250', '0%'],
          ],
        },
        {
          title: 'How the Credit Works',
          type: 'text',
          content: "**Credit = Rate × Contribution (up to $2,000)**\n\n**Maximum credit:**\n• $1,000 per person ($2,000 MFJ)\n\n**Eligible contributions:**\n• Traditional and Roth IRA\n• 401(k), 403(b), 457\n• SIMPLE IRA\n• ABLE accounts\n\n**Must be age 18+, not a student, and not claimed as dependent**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Credit can be 10%, 20%, or 50% of contributions up to $2,000",
            "Maximum credit is $1,000 per person",
            "Must be 18+, not full-time student, not a dependent",
            "Nonrefundable credit",
            "AGI limits are relatively low - benefits lower-income savers",
          ],
        },
      ],
    },
  },
  // ============================================================================
  // SEE1-4: TAXATION AND ADVICE - Continued (Lessons 36-38)
  // ============================================================================

  {
    id: 'SEE1-036',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Kiddie Tax Rules',
    description: 'Understand taxation of unearned income for children',
    order: 36,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Kiddie tax', 'Unearned income', 'Age rules', 'Form 8615'],
    blueprintArea: 'SEE1-4',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The kiddie tax prevents parents from shifting investment income to children in lower tax brackets. Understanding when it applies and how to calculate it is essential for family tax planning.",
        },
        {
          title: 'Who is Subject to Kiddie Tax?',
          type: 'text',
          content: "**The kiddie tax applies if:**\n\n• Child has more than $2,500 (2024) of unearned income, AND\n• Child meets age requirements:\n  - Under age 18 at year end, OR\n  - Age 18 with earned income ≤ 50% of support, OR\n  - Age 19-23 and full-time student with earned income ≤ 50% of support\n\n• At least one parent is alive at year end\n• Child doesn't file joint return with spouse",
        },
        {
          title: 'How Kiddie Tax Works',
          type: 'table',
          headers: ['Unearned Income', 'Tax Treatment'],
          rows: [
            ['First $1,250', 'Tax-free (standard deduction portion)'],
            ['$1,251 - $2,500', 'Taxed at child\'s rate'],
            ['Over $2,500', 'Taxed at parents\' marginal rate'],
          ],
        },
        {
          title: 'What is Unearned Income?',
          type: 'list',
          content: [
            "Interest and dividends",
            "Capital gains",
            "Rental income",
            "Taxable Social Security benefits",
            "Pension/annuity distributions",
            "Income from trusts",
            "Taxable scholarships (non-tuition portion)",
          ],
        },
        {
          title: 'Calculating the Kiddie Tax',
          type: 'text',
          content: "**Form 8615 Calculation:**\n\n1. Determine child's net unearned income\n2. Calculate tax on net unearned income at parent's rate\n3. Calculate tax on child's remaining taxable income at child's rate\n4. Total tax = Sum of both\n\n**Net Unearned Income =**\nUnearned income - $1,250 - Greater of ($1,250 OR itemized deductions related to unearned income)",
        },
        {
          title: '⚠️ Exam Trap: Parent\'s Rate',
          type: 'warning',
          content: "**The kiddie tax uses the parents' MARGINAL rate:**\n\n• Add child's net unearned income to parents' taxable income\n• Calculate incremental tax at that bracket\n• This is the tax on the child's net unearned income\n\n**If parents file MFS:** Use parent with higher taxable income",
        },
        {
          title: 'Form 8814 Alternative',
          type: 'text',
          content: "**Parents' Election to Report Child's Income:**\n\nIf child meets requirements, parents may include child's income on their return (Form 8814):\n\n• Child's only income is interest/dividends\n• Gross income < $12,500\n• No estimated tax paid under child's SSN\n• No withholding\n\n**Disadvantage:** Additional $125 tax and child loses own standard deduction",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Kiddie tax applies to children under 18 (or 19-23 if student)",
            "First $1,250 unearned income tax-free, next $1,250 at child's rate",
            "Unearned income over $2,500 taxed at parents' marginal rate",
            "Use Form 8615 to calculate kiddie tax",
            "Parents may elect to report on their return using Form 8814",
            "Earned income is always taxed at child's own rate",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-037',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Estimated Tax Payments',
    description: 'Master the rules for quarterly estimated tax payments',
    order: 37,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Safe harbor', 'Quarterly payments', 'Penalty calculation'],
    blueprintArea: 'SEE1-4',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Clients with self-employment income, investment income, or other non-wage income must make estimated tax payments. Understanding safe harbors and penalty calculation helps clients avoid unnecessary penalties.",
        },
        {
          title: 'Who Must Pay Estimated Tax?',
          type: 'text',
          content: "**Required if:**\n\n• Expected to owe $1,000 or more when return is filed, AND\n• Withholding + credits will be less than the smaller of:\n  - 90% of current year tax, OR\n  - 100% of prior year tax (110% if prior year AGI > $150,000 MFJ)\n\n**Not required if:**\n• Owed zero tax in prior year (and was U.S. citizen/resident full year)",
        },
        {
          title: 'Quarterly Due Dates',
          type: 'table',
          headers: ['Period', 'Due Date'],
          rows: [
            ['Jan 1 - Mar 31', 'April 15'],
            ['Apr 1 - May 31', 'June 15'],
            ['Jun 1 - Aug 31', 'September 15'],
            ['Sep 1 - Dec 31', 'January 15 (following year)'],
          ],
        },
        {
          title: 'Safe Harbor Rules',
          type: 'text',
          content: "**No penalty if payments equal or exceed:**\n\n**100% Safe Harbor:**\n• Pay 100% of prior year tax liability\n• Applies if prior year AGI ≤ $150,000 ($75,000 MFS)\n\n**110% Safe Harbor:**\n• Pay 110% of prior year tax liability\n• Applies if prior year AGI > $150,000 ($75,000 MFS)\n\n**90% Current Year:**\n• Pay 90% of current year tax liability\n• Always an alternative safe harbor\n\n**Exception:** Prior year must have been 12 months and tax return filed",
        },
        {
          title: '🧠 Memory Aid: Safe Harbor',
          type: 'callout',
          content: "**\"Pay Last Year's Tax\"**\n\n• AGI ≤ $150K: Pay 100% of last year\n• AGI > $150K: Pay 110% of last year\n\n**OR pay 90% of this year (if you can predict it)**\n\n**The 110% is the commonly tested one for high-income taxpayers!**",
        },
        {
          title: 'Annualized Income Installment Method',
          type: 'text',
          content: "**For Uneven Income:**\n\nIf income varies significantly during the year, taxpayer can use annualized income method to reduce earlier payments.\n\n**How it works:**\n• Calculate income for each period\n• Annualize it (multiply by factor)\n• Pay tax proportionate to income in each period\n\n**Schedule AI (Form 2210)** required to claim this method and avoid/reduce penalty.",
        },
        {
          title: 'Underpayment Penalty',
          type: 'text',
          content: "**Form 2210 Calculation:**\n\n• Penalty is essentially interest on late payments\n• Rate is federal short-term rate + 3%\n• Calculated from payment due date to earlier of:\n  - Date payment made, or\n  - Return due date (April 15)\n\n**Penalty Waiver:**\nAvailable if underpayment due to casualty, disaster, or other unusual circumstances\nRetired/disabled taxpayers age 62+ in certain situations",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Estimated tax required if owing $1,000+ and withholding insufficient",
            "Due dates: April 15, June 15, September 15, January 15",
            "100% safe harbor if prior AGI ≤ $150K; 110% if higher",
            "90% of current year tax is alternative safe harbor",
            "Annualized income method helps with uneven income",
            "Penalty = interest at federal short-term rate + 3%",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-038',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Withholding Requirements',
    description: 'Understand income tax withholding and Form W-4',
    order: 38,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Form W-4', 'Withholding tables', 'Backup withholding'],
    blueprintArea: 'SEE1-4',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Proper withholding is the first line of defense against underpayment penalties. Understanding how W-4 works helps clients adjust withholding to match their expected tax liability.",
        },
        {
          title: 'Form W-4 Overview',
          type: 'text',
          content: "**Current W-4 (2020+):**\n\n• No more allowances/exemptions\n• Based on actual tax credits and deductions\n• Five steps (Steps 2-4 optional)\n\n**Key Elements:**\n• Filing status\n• Multiple jobs/spouse works adjustment\n• Dependents and credits\n• Other adjustments (deductions, additional income)\n• Extra withholding",
        },
        {
          title: 'W-4 Steps',
          type: 'table',
          headers: ['Step', 'Purpose', 'Who Uses'],
          rows: [
            ['Step 1', 'Filing status', 'Everyone (required)'],
            ['Step 2', 'Multiple jobs or spouse works', 'Two-earner households'],
            ['Step 3', 'Claim dependents', 'Those with qualifying dependents'],
            ['Step 4', 'Other adjustments', 'Itemizers, other income'],
            ['Step 5', 'Sign and date', 'Everyone (required)'],
          ],
        },
        {
          title: 'When New W-4 Required',
          type: 'text',
          content: "**Employee must submit new W-4:**\n\n• Within 10 days of changes that reduce withholding allowances\n• Marriage or divorce\n• New dependents\n• Change in expected deductions\n\n**Employee may (but not required to):**\n• Submit new W-4 anytime\n• Update for life changes\n\n**Employer must:**\n• Implement new W-4 by start of first payroll period ending ≥30 days after receipt",
        },
        {
          title: 'Backup Withholding',
          type: 'text',
          content: "**Rate: 24%**\n\n**When required:**\n• Payee didn't provide TIN (or incorrect TIN)\n• IRS notifies payer that backup withholding is required\n• Payee failed to certify not subject to backup withholding\n\n**Applies to:**\n• Interest\n• Dividends\n• Rents, royalties\n• Non-employee compensation\n• Broker transactions\n• Other reportable payments",
        },
        {
          title: '⚠️ Exam Trap: Exempt from Withholding',
          type: 'warning',
          content: "**Employee can claim exempt from withholding if:**\n\n• Had no tax liability last year, AND\n• Expects no tax liability this year\n\n**Exempt status expires February 15 of following year!**\n\nEmployee must submit new W-4 each year to continue exemption.",
        },
        {
          title: 'Other Withholding Types',
          type: 'text',
          content: "**Pensions and Annuities:**\n• W-4P for periodic payments\n• Can elect no withholding (with some exceptions)\n• Default withholding if no W-4P\n\n**Gambling Winnings:**\n• 24% on winnings over threshold\n• Generally $1,200 for slots/bingo, $1,500 for keno, $5,000 for other\n\n**Supplemental Wages:**\n• Flat 22% rate (or aggregate method)\n• Includes bonuses, commissions, severance",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Form W-4 determines income tax withholding amount",
            "2020+ W-4 uses tax credits and deductions, not allowances",
            "New W-4 required within 10 days if circumstances reduce withholding",
            "Backup withholding is 24% for missing/incorrect TIN",
            "Exempt status expires February 15 each year",
            "Supplemental wages: 22% flat rate",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // SEE1-5: CREDITS - Continued (Lessons 44-46)
  // ============================================================================

  {
    id: 'SEE1-044',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Premium Tax Credit',
    description: 'Understand the credit for health insurance purchased through the Marketplace',
    order: 44,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Marketplace insurance', 'APTC', 'Form 8962', 'Reconciliation'],
    blueprintArea: 'SEE1-5',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The Premium Tax Credit makes health insurance affordable for millions of Americans. Understanding eligibility, advance payments, and reconciliation is essential for clients who purchase coverage through Healthcare.gov.",
        },
        {
          title: 'Eligibility Requirements',
          type: 'list',
          content: [
            "Purchased coverage through the Health Insurance Marketplace",
            "Household income 100%-400% of Federal Poverty Level (no upper limit through 2025)",
            "Cannot be claimed as dependent",
            "Cannot file MFS (unless certain abuse/abandonment exceptions)",
            "Not eligible for other minimum essential coverage (employer, Medicare, Medicaid)",
          ],
        },
        {
          title: 'How the Credit Works',
          type: 'text',
          content: "**Credit Amount:**\nPremium for second-lowest-cost Silver plan (SLCSP) minus expected contribution\n\n**Expected Contribution:**\nBased on household income as percentage of FPL, multiplied by applicable percentage\n\n**2024 Applicable Percentages:**\n• 100-150% FPL: 0% to 4% of income\n• 150-200% FPL: 4% to 6.3% of income\n• 200-250% FPL: 6.3% to 8.05% of income\n• 250-400% FPL: 8.05% to 8.5% of income\n• Over 400% FPL: 8.5% (due to ARP extension)",
        },
        {
          title: 'Advance Premium Tax Credit (APTC)',
          type: 'text',
          content: "**Paid in Advance:**\nBased on estimated income from Marketplace application, credit is paid directly to insurer monthly.\n\n**Must Reconcile:**\nAt tax time, compare actual income to estimate:\n• If income higher → may owe back some APTC\n• If income lower → may get additional credit\n\n**Form 1095-A:**\nReceived from Marketplace showing:\n• Monthly premiums\n• Monthly SLCSP\n• Monthly APTC paid",
        },
        {
          title: 'Form 8962 Reconciliation',
          type: 'text',
          content: "**Required if any APTC received or claiming PTC:**\n\n**Part I:** Family size, modified AGI, FPL calculation\n**Part II:** Monthly calculation (if circumstances changed)\n**Part III:** Repayment limitation (if applicable)\n\n**Repayment Caps (2024):**\nBased on income, maximum repayment limited:\n• Under 200% FPL: $375 (single) / $750 (other)\n• 200-300% FPL: $950 (single) / $1,900 (other)\n• 300-400% FPL: $1,600 (single) / $3,200 (other)\n• Over 400% FPL: Full repayment required",
        },
        {
          title: '⚠️ Exam Trap: MFS and PTC',
          type: 'warning',
          content: "**MFS taxpayers generally CANNOT claim PTC!**\n\n**Limited Exception:**\n• Victim of domestic abuse or spousal abandonment\n• Living apart from spouse at end of year\n• Indicate on Form 8962\n\n**Key:** If client has APTC and files MFS, they may have to repay entire APTC!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "PTC available for Marketplace insurance if income 100%+ FPL",
            "Credit = SLCSP premium minus expected contribution",
            "APTC is paid in advance to insurer monthly",
            "Must reconcile on Form 8962 using Form 1095-A data",
            "Repayment caps exist for income under 400% FPL",
            "MFS generally ineligible (limited exceptions)",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-046',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Energy Credits for Individuals',
    description: 'Master the residential clean energy and efficiency credits',
    order: 46,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Residential clean energy credit', 'Energy efficient home credit', 'Clean vehicle credit'],
    blueprintArea: 'SEE1-5',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The Inflation Reduction Act significantly expanded energy credits! These credits can provide thousands of dollars for clients investing in clean energy and energy efficiency. Know the new rules!",
        },
        {
          title: 'Residential Clean Energy Credit (25D)',
          type: 'text',
          content: "**30% credit for:**\n\n• Solar electric (photovoltaic) systems\n• Solar water heaters\n• Fuel cells\n• Small wind energy systems\n• Geothermal heat pumps\n• Battery storage (3+ kWh capacity) - new for 2023+\n\n**Must be for taxpayer's residence in U.S.**\n\n**No dollar cap on credit amount!**\n\n**Carryforward:** Unused credit carries forward indefinitely",
        },
        {
          title: 'Energy Efficient Home Improvement Credit (25C)',
          type: 'text',
          content: "**Annual Limits (2023+):**\n\n**Overall Annual Cap: $3,200**\n\n• $1,200 for insulation, windows, doors, home energy audits\n• $2,000 for heat pumps, biomass stoves, heat pump water heaters\n\n**Specific Limits:**\n• Exterior doors: $250/door, $500 total\n• Windows: $600 max\n• Home energy audit: $150 max\n• Insulation/air sealing: $1,200 max\n\n**Must meet Energy Star requirements**",
        },
        {
          title: 'Credit Comparison',
          type: 'table',
          headers: ['Feature', 'Residential Clean Energy (25D)', 'Home Improvement (25C)'],
          rows: [
            ['Credit rate', '30%', '30%'],
            ['Annual cap', 'None', '$3,200'],
            ['Carryforward', 'Yes', 'No'],
            ['Property type', 'Generation systems', 'Efficiency improvements'],
            ['Refundable', 'No', 'No'],
          ],
        },
        {
          title: 'Clean Vehicle Credit (30D)',
          type: 'text',
          content: "**New for 2023+:**\n\nUp to $7,500 for new qualifying EVs:\n• $3,750 for battery component requirement\n• $3,750 for critical mineral requirement\n\n**Income Limits:**\n• Single: $150,000 MAGI\n• HOH: $225,000 MAGI\n• MFJ: $300,000 MAGI\n\n**Vehicle Price Caps:**\n• SUVs, vans, pickups: $80,000\n• Other vehicles: $55,000\n\n**Transfer Option:** Can transfer credit to dealer at point of sale",
        },
        {
          title: 'Used Clean Vehicle Credit (25E)',
          type: 'text',
          content: "**New Credit for Used EVs:**\n\n**Amount:** Lesser of $4,000 or 30% of sale price\n\n**Requirements:**\n• Model year at least 2 years before sale\n• Price ≤ $25,000\n• First transfer since 8/16/22\n• Purchased from dealer\n\n**Income Limits:**\n• Single: $75,000 MAGI\n• HOH: $112,500 MAGI\n• MFJ: $150,000 MAGI",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Residential Clean Energy Credit: 30%, no cap, carryforward allowed",
            "Home Improvement Credit: 30%, $3,200 annual cap, no carryforward",
            "New EV credit up to $7,500, income and price limits apply",
            "Used EV credit up to $4,000 or 30% of price",
            "All credits are nonrefundable",
            "Battery storage now qualifies for clean energy credit",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // SEE1-6: SPECIALIZED RETURNS (Lessons 47-50)
  // ============================================================================

  {
    id: 'SEE1-047',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Farm Income and Expenses',
    description: 'Understand special tax rules for farming operations',
    order: 47,
    duration: 55,
    difficulty: 'advanced',
    topics: ['Schedule F', 'Crop insurance', 'Farm income averaging'],
    blueprintArea: 'SEE1-6',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Farmers have unique tax rules and elections! Understanding Schedule F, income averaging, and special deductions helps you serve agricultural clients effectively.",
        },
        {
          title: 'Schedule F Overview',
          type: 'text',
          content: "**Who Files Schedule F:**\n• Farmers (cultivating land, raising livestock)\n• NOT ranchers who only buy/sell livestock (Schedule C)\n• NOT agricultural laborers (Form W-2)\n\n**Accounting Method:**\n• Most farmers use cash method\n• Can use accrual if desired\n• Special rules for prepaid expenses",
        },
        {
          title: 'Farm Income',
          type: 'table',
          headers: ['Income Type', 'Reporting', 'Notes'],
          rows: [
            ['Sales of livestock raised', 'Schedule F', 'Ordinary income'],
            ['Sales of produce grown', 'Schedule F', 'Ordinary income'],
            ['Crop insurance proceeds', 'Schedule F', 'Can elect to defer 1 year'],
            ['Government payments', 'Schedule F', 'CRP, ARC, PLC, etc.'],
            ['Sales of purchased livestock', 'Form 4797', 'Section 1231'],
            ['Sales of farm equipment', 'Form 4797', 'Depreciation recapture'],
          ],
        },
        {
          title: 'Farm Income Averaging',
          type: 'text',
          content: "**Schedule J Election:**\n\nFarmers can elect to average current year farm income over prior 3 years.\n\n**Benefits:**\n• Smooth income fluctuations\n• Lower marginal tax rate in high-income years\n• Particularly helpful after good crop year\n\n**Requirements:**\n• Must have elected farm income\n• Complete Schedule J\n• Can use even if didn't farm in prior years\n\n**Elected Farm Income:** Any portion of current year taxable income attributable to farming",
        },
        {
          title: 'Crop Insurance Deferral',
          type: 'text',
          content: "**Election to Defer:**\n\nIf crop insurance proceeds received because of destruction/damage to crops:\n• Can elect to include in FOLLOWING year\n• Must be cash-method farmer\n• Would have reported crop income in following year under normal practice\n\n**Applies to:**\n• Crop insurance payments\n• Disaster payments\n• Weather-related livestock sales (different deferral period)",
        },
        {
          title: 'Special Farm Deductions',
          type: 'text',
          content: "**Unique to Farming:**\n\n• Soil and water conservation expenses (limited)\n• Fertilizer and lime (current or amortize)\n• Land clearing (capitalize)\n• Prepaid feed (limited deductions)\n\n**Depreciation:**\n• Farm buildings: 20-year MACRS\n• Agricultural structures: 10 or 15 years\n• Livestock: 3, 5, or 7 years\n• Fencing: 7 or 15 years",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Schedule F for farming income and expenses",
            "Most farmers use cash method accounting",
            "Farm income averaging with Schedule J (3-year lookback)",
            "Crop insurance can be deferred to following year",
            "Livestock raised = ordinary income; purchased = Section 1231",
            "Special depreciation rules for farm property",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-048',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Virtual Currency Transactions',
    description: 'Master the tax treatment of cryptocurrency and digital assets',
    order: 48,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Crypto as property', 'Basis', 'Reporting requirements'],
    blueprintArea: 'SEE1-6',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Cryptocurrency is everywhere! The IRS treats virtual currency as property, not currency. Understanding the tax implications of buying, selling, spending, and receiving crypto is increasingly important.",
        },
        {
          title: 'Property Treatment',
          type: 'text',
          content: "**Virtual currency is PROPERTY for tax purposes:**\n\n• NOT currency (despite the name)\n• General property transaction rules apply\n• Every disposal is a taxable event\n• Must track basis and holding period\n\n**Examples of virtual currency:**\n• Bitcoin, Ethereum, Litecoin\n• Stablecoins\n• NFTs (non-fungible tokens)\n• Tokens received from airdrops",
        },
        {
          title: 'Taxable Events',
          type: 'table',
          headers: ['Transaction', 'Taxable?', 'Character'],
          rows: [
            ['Sell crypto for USD', 'Yes', 'Capital gain/loss'],
            ['Exchange crypto for crypto', 'Yes', 'Capital gain/loss'],
            ['Buy goods/services with crypto', 'Yes', 'Capital gain/loss'],
            ['Receive as payment for services', 'Yes', 'Ordinary income'],
            ['Mining rewards', 'Yes', 'Ordinary income'],
            ['Staking rewards', 'Yes', 'Ordinary income'],
            ['Buy crypto with USD', 'No', 'Establishes basis'],
            ['Transfer between own wallets', 'No', 'No gain/loss'],
            ['Gifts of crypto', 'Generally no', 'Donee takes carryover basis'],
          ],
        },
        {
          title: 'Basis Determination',
          type: 'text',
          content: "**Initial Basis:**\n• Purchased: Cost in USD at time of purchase\n• Received as income: FMV when received\n• Gifted: Carryover basis (with modifications)\n• Inherited: FMV at date of death\n\n**Identifying Specific Units:**\n• FIFO (First In, First Out) is default\n• Specific identification allowed if:\n  - Can identify specific unit sold\n  - Documented before sale\n\n**This matters because different purchases have different basis!**",
        },
        {
          title: 'Reporting Requirements',
          type: 'text',
          content: "**Form 1040 Question:**\nMust answer yes/no to virtual currency question on Form 1040.\n\n**Form 8949/Schedule D:**\n• Report sales and exchanges\n• Calculate gain/loss on each transaction\n• Short-term vs. long-term classification\n\n**Receiving as Income:**\n• Report FMV as income when received\n• Self-employment income if received for services\n• May be subject to SE tax",
        },
        {
          title: '⚠️ Exam Trap: Crypto to Crypto',
          type: 'warning',
          content: "**Exchanging one cryptocurrency for another IS taxable!**\n\n• Like-kind exchange (Section 1031) does NOT apply\n• Must recognize gain/loss on each exchange\n• New crypto takes FMV as basis\n\n**Example:**\nTrade 1 BTC (basis $10,000) for 10 ETH (FMV $50,000)\n= $40,000 capital gain\nNew basis in ETH = $50,000",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Virtual currency is property, not currency",
            "Every sale, exchange, or use is potentially taxable",
            "Receiving crypto as income = ordinary income at FMV",
            "Mining and staking rewards are ordinary income",
            "Crypto-to-crypto trades are taxable (no like-kind exchange)",
            "Must answer virtual currency question on Form 1040",
            "Track basis carefully for each purchase/receipt",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-049',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Foreign Income and Exclusions',
    description: 'Understand tax rules for U.S. citizens with foreign income',
    order: 49,
    duration: 55,
    difficulty: 'advanced',
    topics: ['FEIE', 'Foreign housing exclusion', 'Tax home', 'Bona fide residence'],
    blueprintArea: 'SEE1-6',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "U.S. citizens and residents are taxed on worldwide income! The foreign earned income exclusion (FEIE) can significantly reduce tax for those living and working abroad. Know the requirements!",
        },
        {
          title: 'U.S. Worldwide Taxation',
          type: 'text',
          content: "**U.S. citizens and residents are taxed on worldwide income:**\n\n• Regardless of where earned\n• Regardless of where they live\n• Must report all foreign income\n• May get relief through:\n  - Foreign Earned Income Exclusion\n  - Foreign Housing Exclusion/Deduction\n  - Foreign Tax Credit\n\n**FBAR:** Report foreign accounts over $10,000 aggregate",
        },
        {
          title: 'Foreign Earned Income Exclusion (FEIE)',
          type: 'text',
          content: "**2024 Exclusion: $126,500**\n\n**Requirements:**\n• U.S. citizen or resident alien\n• Tax home in foreign country\n• Meet either:\n  - Bona Fide Residence Test, OR\n  - Physical Presence Test\n\n**Form 2555** to claim exclusion\n\n**What Qualifies:**\n• Wages, salaries, professional fees\n• Self-employment income\n• NOT: Pensions, investments, employer-paid housing",
        },
        {
          title: 'Qualification Tests',
          type: 'table',
          headers: ['Test', 'Requirement', 'Who Uses'],
          rows: [
            ['Bona Fide Residence', 'Uninterrupted period including full tax year', 'Long-term expatriates'],
            ['Physical Presence', '330 full days in foreign country in 12-month period', 'Anyone abroad 330+ days'],
          ],
        },
        {
          title: 'Tax Home Requirement',
          type: 'text',
          content: "**Tax home must be in foreign country:**\n\n• Where principal place of business is located\n• Cannot maintain significant ties to U.S. home\n• Temporary work assignments may not shift tax home\n\n**Abode in U.S.:**\nIf you maintain an abode (home) in the U.S., you must establish bona fide residence abroad to qualify for FEIE.\n\n**Key:** Your tax home is where you WORK, not where your family lives.",
        },
        {
          title: 'Foreign Housing Exclusion',
          type: 'text',
          content: "**Additional Exclusion:**\n\nHousing expenses over base amount, up to limit:\n\n**Base Amount:** 16% of FEIE ($20,240 for 2024)\n**Maximum Exclusion:** 30% of FEIE ($37,950 for 2024)\n\n**Qualifying Housing Expenses:**\n• Rent\n• Utilities (except telephone)\n• Insurance\n• Furniture rental\n• Repairs\n\n**NOT Included:** Home purchase, improvements, lavish expenses",
        },
        {
          title: '⚠️ Exam Trap: FEIE vs. Foreign Tax Credit',
          type: 'warning',
          content: "**Cannot Double Dip!**\n\n• Cannot claim Foreign Tax Credit on income excluded under FEIE\n• Must choose which benefit to use\n• If income exceeds FEIE, can use FTC on excess\n\n**Strategy:**\n• High-tax countries: FTC may be better\n• Low/no-tax countries: FEIE often better\n• Many use both (FEIE on first $126,500, FTC on rest)",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "U.S. taxes citizens/residents on worldwide income",
            "FEIE: Up to $126,500 (2024) exclusion for foreign earned income",
            "Must meet Bona Fide Residence OR Physical Presence test",
            "Tax home must be in foreign country",
            "Foreign Housing Exclusion available for housing costs over base amount",
            "Foreign Tax Credit cannot be claimed on excluded income",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE1-050',
    courseId: 'ea',
    section: 'SEE1',
    title: 'Due Diligence Requirements',
    description: 'Master preparer due diligence for refundable credits',
    order: 50,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Form 8867', 'EIC due diligence', 'CTC/AOTC/HOH due diligence'],
    blueprintArea: 'SEE1-6',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Due diligence isn't optional! Paid preparers face $635 penalties per credit/status if they fail to meet requirements. These penalties add up fast. This is heavily tested and affects your practice daily.",
        },
        {
          title: 'Form 8867: Due Diligence Checklist',
          type: 'text',
          content: "**Required for returns claiming:**\n\n• Earned Income Credit (EIC)\n• Child Tax Credit (CTC) / Additional CTC\n• American Opportunity Tax Credit (AOTC)\n• Head of Household filing status\n\n**Form 8867 must be completed and retained for 3 years**\n\n**Penalty: $635 per failure (2024)**\n\n4 items on one return = potential $2,540 penalty!",
        },
        {
          title: 'Four Due Diligence Requirements',
          type: 'table',
          headers: ['Requirement', 'What It Means'],
          rows: [
            ['Knowledge', 'Know the law and how to apply it'],
            ['Document Review', 'Review documents and don\'t ignore inconsistencies'],
            ['Reasonable Inquiry', 'Ask questions when information seems incorrect/incomplete'],
            ['Retain Records', 'Keep Form 8867, worksheets, and supporting docs for 3 years'],
          ],
        },
        {
          title: 'Knowledge Requirement',
          type: 'text',
          content: "**You must know the eligibility rules for:**\n\n• EIC (earned income, investment income limit, residency, relationship)\n• CTC (qualifying child, age, support, residency)\n• AOTC (enrollment status, expenses, eligible institution)\n• HOH (unmarried, qualifying person, maintaining home)\n\n**Can't claim ignorance!**\nIf you prepare these returns, you must know the rules.",
        },
        {
          title: 'Document Review',
          type: 'text',
          content: "**Must review information provided:**\n\n• Don't ignore red flags\n• Information must be consistent\n• Compare to prior years if available\n\n**Red Flags:**\n• Same address for unrelated individuals\n• Questionable W-2s\n• AGI inconsistent with claimed credits\n• Same child claimed by multiple taxpayers\n• Self-employment income with no expenses",
        },
        {
          title: 'Reasonable Inquiry',
          type: 'text',
          content: "**Ask questions when:**\n\n• Information seems incorrect, inconsistent, or incomplete\n• Red flags present\n• Something doesn't add up\n\n**Document the inquiry and response!**\n\n**Cannot rely solely on client statements if:**\n• Statements are inconsistent\n• You have reason to doubt accuracy\n• Industry knowledge suggests otherwise",
        },
        {
          title: '⚠️ What Gets Preparers in Trouble',
          type: 'warning',
          content: "**Common Due Diligence Failures:**\n\n• Not asking about absent parent\n• Accepting verbal statements without probing\n• Not verifying student enrollment for AOTC\n• Ignoring W-2/1099 inconsistencies\n• Not documenting reasonable cause for exceptions\n• Same-day preparation without adequate inquiry\n\n**IRS focuses on high-EIC ZIP codes!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "$635 penalty per credit/status for due diligence failure",
            "Four items on one return = up to $2,540 penalty",
            "Must complete Form 8867 and retain 3 years",
            "Four requirements: Knowledge, Documents, Inquiry, Records",
            "Cannot ignore red flags or inconsistencies",
            "Document all inquiries and responses",
            "Applies to EIC, CTC, AOTC, and HOH",
          ],
        },
      ],
    },
  },
];

// Export section lessons
export const getSEE1Lessons = () => eaPart1Lessons;
export const getSEE1LessonById = (id: string) => eaPart1Lessons.find(l => l.id === id);
export const getSEE1LessonCount = () => eaPart1Lessons.length;
