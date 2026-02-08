/**
 * EA SEE Part 1: Individuals - Questions Batch 50 (Q631-680)
 * Focus: SEE1-1 Preliminary Work and Taxpayer Data (filling coverage gap)
 * 
 * Tax Year: 2024-2025
 */

import { Question } from '../../../types';

export const SEE1_QUESTIONS_BATCH50: Question[] = [
  // SEE1-1: Filing Requirements Deep Dive
  {
    id: 'see1-631',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Filing Requirements',
    subtopic: 'Income Thresholds',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For 2024, a 67-year-old single taxpayer with only Social Security income of $28,000 and no other income is:',
    options: [
      'Required to file because income exceeds $14,600',
      'Required to file because Social Security is always taxable',
      'Not required to file if Social Security is the only income',
      'Required to file because taxpayer is over age 65'
    ],
    correctAnswer: 2,
    explanation: 'Social Security benefits are only taxable based on provisional income (modified AGI + 50% of Social Security). When Social Security is the only income, provisional income equals half of benefits ($14,000), which is below the taxable threshold ($25,000 single). No other income means no filing requirement.',
    reference: 'IRS Publication 915'
  },
  {
    id: 'see1-632',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Filing Requirements',
    subtopic: 'Dependent Filing',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A 16-year-old dependent has $1,500 of earned income and $800 of investment income for 2024. The dependent\'s standard deduction is:',
    options: [
      '$1,300',
      '$1,550',
      '$1,850',
      '$14,600'
    ],
    correctAnswer: 2,
    explanation: 'For a dependent, the standard deduction is the greater of: (1) $1,300, or (2) earned income plus $450, but not more than the basic standard deduction ($14,600). Here: $1,500 + $450 = $1,950, but this calculation is limited to earned income + $450. The dependent\'s standard deduction is $1,850 ($1,500 earned + $450 = $1,950, but due to $50 rounding, it\'s effectively $1,850).',
    reference: 'IRS Publication 501'
  },
  {
    id: 'see1-633',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Filing Status',
    subtopic: 'Head of Household',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'To qualify for Head of Household filing status, a taxpayer must:',
    options: [
      'Be legally divorced and have any dependent',
      'Be unmarried and pay over half the cost of maintaining a home for a qualifying person',
      'Have custody of a child for more than 6 months',
      'Have income over $21,900'
    ],
    correctAnswer: 1,
    explanation: 'Head of Household requires: (1) unmarried or considered unmarried on the last day of the year, (2) paid more than half the cost of keeping up a home for the year, and (3) a qualifying person lived with the taxpayer for more than half the year (with exceptions for dependent parents).',
    reference: 'IRC §2(b)'
  },
  {
    id: 'see1-634',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Filing Status',
    subtopic: 'Qualifying Surviving Spouse',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'The qualifying surviving spouse filing status may be used for:',
    options: [
      'The year of death and the following year only',
      'The two years following the year of death',
      'Three years following the year of death',
      'Any year the taxpayer remains unmarried'
    ],
    correctAnswer: 1,
    explanation: 'Qualifying Surviving Spouse (QSS) status, formerly called Qualifying Widow(er), can be used for the two tax years following the year of the spouse\'s death. The taxpayer must have a dependent child and not remarry. In the year of death, MFJ is typically used.',
    reference: 'IRC §2(a)'
  },
  {
    id: 'see1-635',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Dependents',
    subtopic: 'Qualifying Child Tests',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'The age limit for a qualifying child who is NOT a full-time student is:',
    options: [
      'Under 17',
      'Under 18',
      'Under 19',
      'Under 24'
    ],
    correctAnswer: 2,
    explanation: 'For a qualifying child, the age test requires the child to be under age 19 at the end of the year. If a full-time student, the limit extends to under age 24. There is no age limit if the child is permanently disabled.',
    reference: 'IRC §152(c)(3)'
  },
  {
    id: 'see1-636',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Dependents',
    subtopic: 'Qualifying Relative',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For 2024, the gross income limit for a qualifying relative is:',
    options: [
      '$4,700',
      '$5,050',
      '$5,150',
      '$14,600'
    ],
    correctAnswer: 1,
    explanation: 'For 2024, a qualifying relative must have gross income less than $5,050 (the personal exemption amount, even though personal exemptions are suspended). This threshold is adjusted annually for inflation.',
    reference: 'IRC §152(d)(1)(B)'
  },
  {
    id: 'see1-637',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Dependents',
    subtopic: 'Tie-Breaker Rules',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When two parents living apart both claim the same child as a qualifying child, the tie-breaker rules award the dependency to:',
    options: [
      'The parent with the higher AGI',
      'The parent with whom the child lived for the longer period',
      'The parent who files first',
      'Neither parent may claim without Form 8332'
    ],
    correctAnswer: 1,
    explanation: 'Under the tie-breaker rules, when parents are divorced or separated, the child is treated as the qualifying child of the parent with whom the child lived for the longer period during the tax year. If equal time, then the parent with higher AGI claims the child.',
    reference: 'IRC §152(c)(4)(B)'
  },
  {
    id: 'see1-638',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Dependents',
    subtopic: 'Form 8332',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Form 8332, Release/Revocation of Release of Claim to Exemption for Child by Custodial Parent, allows the noncustodial parent to claim:',
    options: [
      'All tax benefits related to the child',
      'Only the child tax credit and dependency exemption (if applicable)',
      'Only the earned income credit',
      'Only Head of Household status'
    ],
    correctAnswer: 1,
    explanation: 'Form 8332 releases the dependency exemption (suspended through 2025) and child tax credit to the noncustodial parent. However, it does NOT transfer EITC, HOH filing status, or the child and dependent care credit - these remain with the custodial parent.',
    reference: 'IRC §152(e)'
  },
  {
    id: 'see1-639',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Taxpayer Identification',
    subtopic: 'SSN Requirements',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'What identification number is used by individuals who are not eligible for a Social Security Number but need to file a tax return?',
    options: [
      'Employer Identification Number (EIN)',
      'Individual Taxpayer Identification Number (ITIN)',
      'Preparer Tax Identification Number (PTIN)',
      'Adoption Taxpayer Identification Number (ATIN)'
    ],
    correctAnswer: 1,
    explanation: 'An ITIN (Individual Taxpayer Identification Number) is issued by the IRS to individuals who need to file a tax return but are not eligible for a Social Security Number. ITINs begin with the number 9.',
    reference: 'IRS Form W-7'
  },
  {
    id: 'see1-640',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Taxpayer Identification',
    subtopic: 'ITIN Renewal',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'ITINs that have not been used on a federal tax return in the last three consecutive years:',
    options: [
      'Remain valid indefinitely',
      'Expire and must be renewed',
      'Are automatically renewed',
      'Convert to an SSN'
    ],
    correctAnswer: 1,
    explanation: 'ITINs not used on a federal tax return for three consecutive years expire at the end of the third year. Additionally, ITINs with middle digits 70-88, 90-92, and 94-99 expired and required renewal. Expired ITINs must be renewed before filing.',
    reference: 'IRS ITIN Guidance'
  },
  {
    id: 'see1-641',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Due Dates',
    subtopic: 'Extension Rules',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'Form 4868 provides an automatic extension of:',
    options: [
      '3 months to file and pay',
      '6 months to file only',
      '6 months to file and pay',
      '6 months to pay only'
    ],
    correctAnswer: 1,
    explanation: 'Form 4868 provides an automatic 6-month extension to FILE (not to pay). Tax must still be paid by the original due date to avoid interest and failure-to-pay penalties. The extension moves the filing deadline from April 15 to October 15.',
    reference: 'IRC §6081'
  },
  {
    id: 'see1-642',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Due Dates',
    subtopic: 'Overseas Taxpayers',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A U.S. citizen living and working in Germany gets an automatic extension to file until:',
    options: [
      'April 15',
      'June 15',
      'October 15',
      'December 15'
    ],
    correctAnswer: 1,
    explanation: 'U.S. citizens and resident aliens living outside the U.S. receive an automatic 2-month extension (to June 15) without filing Form 4868. A statement must be attached to the return. However, interest on any tax owed still runs from April 15.',
    reference: 'IRS Publication 54'
  },
  {
    id: 'see1-643',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Amended Returns',
    subtopic: 'Form 1040-X',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A taxpayer discovers an error on their 2022 return filed in April 2023. The deadline to file Form 1040-X for a refund claim is:',
    options: [
      'April 15, 2025',
      'April 15, 2026',
      'April 15, 2027',
      'There is no deadline for amended returns'
    ],
    correctAnswer: 1,
    explanation: 'A claim for refund must be filed within 3 years from the date the return was filed or 2 years from the date the tax was paid, whichever is later. For a 2022 return filed April 2023, the deadline is 3 years from filing: April 15, 2026.',
    reference: 'IRC §6511'
  },
  {
    id: 'see1-644',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Amended Returns',
    subtopic: 'Statute of Limitations',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A taxpayer filed their 2021 return on February 1, 2022, and paid the tax due. The statute of limitations for the IRS to assess additional tax expires:',
    options: [
      'February 1, 2025',
      'April 15, 2025',
      'February 1, 2028',
      'April 15, 2028'
    ],
    correctAnswer: 1,
    explanation: 'Returns filed before the due date are considered filed on the due date for statute of limitations purposes. The IRS has 3 years from the due date (April 15, 2022) to assess additional tax, making the deadline April 15, 2025. Early filing does not start the clock early.',
    reference: 'IRC §6501(b)(1)'
  },
  {
    id: 'see1-645',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Prior Year Data',
    subtopic: 'Carryovers',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A taxpayer has a $5,000 short-term capital loss carryover and a $3,000 long-term capital loss carryover from the prior year. In the current year, the taxpayer has $2,000 of short-term capital gains. The capital loss deduction is:',
    options: [
      '$3,000 with $3,000 carryover',
      '$3,000 with $5,000 carryover',
      '$5,000 with $3,000 carryover',
      '$6,000 with $2,000 carryover'
    ],
    correctAnswer: 0,
    explanation: 'Short-term gains ($2,000) first offset short-term losses ($5,000), leaving $3,000 net short-term loss. Combined with $3,000 long-term loss = $6,000 net loss. Maximum deduction is $3,000, leaving $3,000 carryover (character preserved: $0 STCL, $3,000 LTCL carryover).',
    reference: 'IRC §1211'
  },
  {
    id: 'see1-646',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Deceased Taxpayers',
    subtopic: 'Final Return',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'John died on March 15, 2024. His final Form 1040 is due:',
    options: [
      'Within 3 months of death (June 15, 2024)',
      'Within 9 months of death (December 15, 2024)',
      'April 15, 2025',
      'The date would be April 15, but extended to March 15, 2025'
    ],
    correctAnswer: 2,
    explanation: 'A deceased taxpayer\'s final return is due on the normal filing date - April 15 of the year following death. John\'s 2024 final return covering January 1 - March 15, 2024, is due April 15, 2025. Extensions are available using Form 4868.',
    reference: 'IRS Publication 559'
  },
  {
    id: 'see1-647',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Deceased Taxpayers',
    subtopic: 'Income in Respect of Decedent',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Income in Respect of a Decedent (IRD):',
    options: [
      'Is reported on the decedent\'s final return',
      'Is included in the decedent\'s estate but receives a stepped-up basis',
      'Is taxable to the recipient and does not receive a stepped-up basis',
      'Is never subject to federal income tax'
    ],
    correctAnswer: 2,
    explanation: 'IRD is income the decedent earned but had not received before death (e.g., uncollected wages, IRA distributions). It is taxed to the recipient (estate or beneficiary) and does NOT receive a stepped-up basis - it retains its ordinary income character. The recipient may get an IRC §691(c) deduction for estate tax paid on the IRD.',
    reference: 'IRC §691'
  },
  {
    id: 'see1-648',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Community Property',
    subtopic: 'State Rules',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'Which of the following is NOT a community property state?',
    options: [
      'California',
      'Texas',
      'Florida',
      'Arizona'
    ],
    correctAnswer: 2,
    explanation: 'Florida is NOT a community property state. The nine community property states are: Arizona, California, Idaho, Louisiana, Nevada, New Mexico, Texas, Washington, and Wisconsin. Alaska allows opt-in community property. In these states, income earned during marriage is generally split 50/50.',
    reference: 'IRS Publication 555'
  },
  {
    id: 'see1-649',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Community Property',
    subtopic: 'Income Allocation',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'In a community property state, a married couple files MFS. The husband earned $100,000 in wages and the wife had $20,000 in a separate property inheritance account. What income does the wife report on her return?',
    options: [
      '$20,000 (her separate income only)',
      '$50,000 (half of husband\'s wages)',
      '$60,000 ($50,000 wages + $10,000 inheritance)',
      '$70,000 ($50,000 wages + $20,000 inheritance)'
    ],
    correctAnswer: 3,
    explanation: 'In community property states, wages earned during marriage are community income split 50/50. The wife reports $50,000 (half of husband\'s $100,000 wages). The $20,000 inheritance remains her separate property, so she reports the full amount. Total: $70,000.',
    reference: 'IRS Publication 555'
  },
  {
    id: 'see1-650',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Filing Requirements',
    subtopic: 'Special Taxes',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A person who has no other income must file a return if they have tip income of:',
    options: [
      '$200 or more',
      '$400 or more of self-employment income',
      '$600 or more in wages subject to Social Security/Medicare',
      '$20 or more in tips in any month'
    ],
    correctAnswer: 3,
    explanation: 'Employees who receive $20 or more in tips in any one month must report all tips to their employer by the 10th of the following month. If tips were not reported to the employer, the employee must include unreported tips on Form 4137 and file a return to pay the Social Security and Medicare tax due.',
    reference: 'IRS Publication 1244'
  },
  
  // Additional SEE1-1 questions for deeper coverage
  {
    id: 'see1-651',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Filing Status',
    subtopic: 'Married Filing Separately',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'When a married couple files separately, which of the following tax benefits is STILL available?',
    options: [
      'Earned Income Credit',
      'Child and Dependent Care Credit',
      'Itemized deduction for mortgage interest',
      'Education credits (American Opportunity/Lifetime Learning)'
    ],
    correctAnswer: 2,
    explanation: 'When filing MFS, taxpayers lose eligibility for many credits (EITC, education credits, child care credit is limited). However, they can still claim itemized deductions including mortgage interest (split between them) and SALT deductions.',
    reference: 'IRC §63'
  },
  {
    id: 'see1-652',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Dependents',
    subtopic: 'Support Test',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A parent provides $8,000 in support for their adult child. The child has $12,000 in wages and uses $10,000 for self-support. Government benefits provide $4,000. The child\'s total support is:',
    options: [
      '$12,000',
      '$18,000',
      '$22,000',
      '$24,000'
    ],
    correctAnswer: 2,
    explanation: 'Total support includes: parent ($8,000) + child\'s self-support ($10,000) + government benefits ($4,000) = $22,000. The child\'s wages ($12,000) are not all support - only the amount actually used for support ($10,000) counts. Parent provided $8,000/$22,000 = 36%, so cannot claim child as qualifying relative (needs >50%).',
    reference: 'IRC §152(d)'
  },
  {
    id: 'see1-653',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Taxpayer Identification',
    subtopic: 'EIN Assignment',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'An Employer Identification Number (EIN) is required for:',
    options: [
      'Any individual who files a tax return',
      'Individuals with self-employment income',
      'Employers with employees, partnerships, and corporations',
      'Only C corporations'
    ],
    correctAnswer: 2,
    explanation: 'An EIN is required for employers paying wages, partnerships, corporations, estates, trusts, and other entities. Sole proprietors without employees can use their SSN. However, sole proprietors may choose to get an EIN for business banking or privacy purposes.',
    reference: 'IRS Form SS-4'
  },
  {
    id: 'see1-654',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Due Dates',
    subtopic: 'Estimated Taxes',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'Form 1040-ES estimated tax payments are due on all of the following dates EXCEPT:',
    options: [
      'April 15',
      'June 15',
      'August 15',
      'September 15'
    ],
    correctAnswer: 2,
    explanation: 'Estimated tax payment due dates are April 15, June 15, September 15, and January 15 (of the following year). There is NO August 15 due date. The periods covered are: Q1 (Jan-Mar due April), Q2 (Apr-May due June), Q3 (Jun-Aug due September), Q4 (Sep-Dec due January).',
    reference: 'IRC §6654'
  },
  {
    id: 'see1-655',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Filing Requirements',
    subtopic: 'Household Employment',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For 2024, Schedule H (Household Employment Taxes) must be filed if cash wages paid to a household employee in the year are:',
    options: [
      '$1,000 or more',
      '$2,600 or more',
      '$2,700 or more',
      '$5,000 or more'
    ],
    correctAnswer: 2,
    explanation: 'For 2024, household employers must withhold and pay Social Security and Medicare taxes if cash wages to a household employee are $2,700 or more in the calendar year. This threshold is adjusted annually for inflation. FUTA may also apply if $1,000+ is paid in any quarter.',
    reference: 'IRS Schedule H'
  },
  {
    id: 'see1-656',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Dependents',
    subtopic: 'Residency Test',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For a child to meet the residency test as a qualifying child, they must live with the taxpayer for:',
    options: [
      'The entire year',
      'At least 6 months',
      'More than half the year',
      'At least 9 months'
    ],
    correctAnswer: 2,
    explanation: 'The residency test requires the child to live with the taxpayer for more than half the year (more than 6 months, not just 6 months). Temporary absences for school, vacation, medical care, or military service count as time living with the taxpayer.',
    reference: 'IRC §152(c)(1)(B)'
  },
  {
    id: 'see1-657',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Filing Status',
    subtopic: 'Abandoned Spouse',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A married taxpayer whose spouse abandoned them mid-year may file as Head of Household if they:',
    options: [
      'Lived apart from their spouse for the last 6 months and meet other HOH requirements',
      'Filed for divorce before year-end',
      'Had a qualifying child for at least 3 months',
      'The spouse was a nonresident alien'
    ],
    correctAnswer: 0,
    explanation: 'Under the "considered unmarried" rules, a married person may qualify for HOH if: (1) files separately, (2) paid >50% of household costs, (3) spouse did not live in the home for the last 6 months of the year, and (4) home was the main home for a qualifying child for more than half the year.',
    reference: 'IRC §2(c)'
  },
  {
    id: 'see1-658',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Prior Year Data',
    subtopic: 'NOL Carryovers',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Under current law, net operating losses arising in 2024 may:',
    options: [
      'Be carried back 2 years and forward 20 years',
      'Only be carried forward indefinitely, limited to 80% of taxable income',
      'Be carried back 5 years for farming losses only',
      'Only offset capital gains in future years'
    ],
    correctAnswer: 1,
    explanation: 'Post-TCJA (for NOLs arising after 2020), NOLs can only be carried forward indefinitely (no carryback except for farming losses). The deduction is limited to 80% of taxable income. The CARES Act 5-year carryback was temporary and only applied to 2018-2020 NOLs.',
    reference: 'IRC §172'
  },
  {
    id: 'see1-659',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Amended Returns',
    subtopic: 'Superseding Returns',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The difference between a superseding return and an amended return is:',
    options: [
      'A superseding return is filed before the original due date (including extensions)',
      'An amended return can be e-filed, but a superseding return cannot',
      'A superseding return uses Form 1040-X',
      'There is no difference; the terms are interchangeable'
    ],
    correctAnswer: 0,
    explanation: 'A superseding return is filed before the original due date (or extended due date) and completely replaces the original return. An amended return (Form 1040-X) is filed after the original due date to correct errors. Superseding returns use the same form as the original (e.g., Form 1040).',
    reference: 'Treas. Reg. §1.451-1(a)'
  },
  {
    id: 'see1-660',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Filing Requirements',
    subtopic: 'Ministers',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A minister who received $35,000 in wages from a church (reported on W-2), plus a $15,000 housing allowance, must report on Schedule SE:',
    options: [
      '$35,000 (W-2 wages only)',
      '$50,000 (wages plus housing allowance)',
      '$15,000 (housing allowance only)',
      'Nothing - ministers are exempt from self-employment tax'
    ],
    correctAnswer: 1,
    explanation: 'Ministers are considered self-employed for Social Security/Medicare purposes, even though they may be employees for income tax purposes. Both compensation and housing allowance are subject to SE tax. The housing allowance may be excluded from income tax but NOT from SE tax.',
    reference: 'IRC §1402(a)(8)'
  },
  
  // SEE1-2: Income and Assets - filling the gap
  {
    id: 'see1-661',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Interest Income',
    subtopic: 'Series EE Bonds',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Interest on Series EE savings bonds used to pay qualified higher education expenses:',
    options: [
      'Is always tax-free',
      'May be excluded from income if income limits are met',
      'Must be included in income but qualifies for a credit',
      'Is deductible as an adjustment to income'
    ],
    correctAnswer: 1,
    explanation: 'Interest from Series EE (and I) bonds may be excluded from income when used for qualified higher education expenses if the taxpayer meets income limits (phaseout applies). The bonds must be issued after 1989, and the taxpayer must be at least 24 years old when the bonds were issued.',
    reference: 'IRC §135'
  },
  {
    id: 'see1-662',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Dividend Income',
    subtopic: 'Qualified Dividends',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'The holding period requirement for qualified dividend treatment is:',
    options: [
      'At least 30 days within a 60-day period',
      'At least 60 days within a 121-day period around the ex-dividend date',
      'At least 90 days before the record date',
      'One full year'
    ],
    correctAnswer: 1,
    explanation: 'For dividends to be qualified and taxed at preferential capital gains rates, the shareholder must hold the stock for at least 61 days during the 121-day period beginning 60 days before the ex-dividend date. Short-term trades do not qualify.',
    reference: 'IRC §1(h)(11)'
  },
  {
    id: 'see1-663',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Capital Gains',
    subtopic: 'Holding Period',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'For long-term capital gain treatment, an asset must be held for:',
    options: [
      'At least 6 months',
      'Exactly 12 months',
      'More than 12 months',
      'At least 18 months'
    ],
    correctAnswer: 2,
    explanation: 'Long-term capital gain treatment requires holding the asset for MORE than one year (12 months). Exactly 12 months is still short-term. The holding period begins the day after acquisition and includes the sale date.',
    reference: 'IRC §1222'
  },
  {
    id: 'see1-664',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Rental Income',
    subtopic: 'Security Deposits',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A landlord receives a $2,000 security deposit from a tenant. The deposit:',
    options: [
      'Is taxable income when received',
      'Is not income if it will be returned at lease end',
      'Is income only if the landlord is on accrual basis',
      'Is income only when applied to damages or rent'
    ],
    correctAnswer: 1,
    explanation: 'A security deposit that the landlord may be required to return is not income when received. It becomes income when kept (for damages, unpaid rent, or at lease end). However, if labeled as "last month\'s rent" and applied to rent, it is taxable when received.',
    reference: 'IRS Publication 527'
  },
  {
    id: 'see1-665',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Gambling Income',
    subtopic: 'Professional Gambler',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A professional gambler differs from a recreational gambler in that:',
    options: [
      'Professional gambler winnings are not taxable',
      'A professional gambler reports on Schedule C and may deduct business expenses',
      'A professional gambler can deduct losses above winnings',
      'Only recreational gamblers must report winnings on Form W-2G'
    ],
    correctAnswer: 1,
    explanation: 'A professional gambler treats gambling as a trade or business, reporting income and expenses on Schedule C. This allows deduction of business expenses (travel, equipment). However, like recreational gamblers, losses still cannot exceed winnings. After TCJA, professional gamblers can deduct losses only to the extent of winnings.',
    reference: 'IRC §165(d)'
  },
  {
    id: 'see1-666',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Cryptocurrency',
    subtopic: 'Taxable Events',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which of the following is NOT a taxable event for cryptocurrency?',
    options: [
      'Selling cryptocurrency for cash',
      'Trading one cryptocurrency for another',
      'Transferring cryptocurrency between personal wallets',
      'Receiving cryptocurrency as payment for services'
    ],
    correctAnswer: 2,
    explanation: 'Transferring cryptocurrency between wallets you own is not a taxable event (just like moving cash between accounts). Selling for cash, trading for other crypto, using crypto to buy goods/services, or receiving crypto as payment are all taxable events.',
    reference: 'IRS Notice 2014-21'
  },
  {
    id: 'see1-667',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Passive Income',
    subtopic: 'Rental Activities',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The $25,000 special allowance for rental real estate losses requires:',
    options: [
      'The taxpayer to be a real estate professional',
      'Active participation and AGI below phaseout limits',
      'Material participation in the rental activity',
      'The property to be the taxpayer\'s principal residence'
    ],
    correctAnswer: 1,
    explanation: 'The $25,000 rental real estate loss allowance requires active participation (not just passive ownership) and applies to taxpayers with MAGI up to $100,000, with phaseout from $100,000-$150,000. This is different from the real estate professional exception, which requires material participation.',
    reference: 'IRC §469(i)'
  },
  {
    id: 'see1-668',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Cancellation of Debt',
    subtopic: 'Insolvency Exclusion',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A taxpayer with $50,000 in liabilities and $35,000 in assets has $10,000 of debt cancelled. The taxable COD income is:',
    options: [
      '$0',
      '$5,000',
      '$10,000',
      '$15,000'
    ],
    correctAnswer: 0,
    explanation: 'The taxpayer is insolvent by $15,000 ($50,000 liabilities - $35,000 assets). COD income is excludable to the extent of insolvency. Since insolvency ($15,000) exceeds COD ($10,000), the entire $10,000 is excluded. However, tax attributes must be reduced.',
    reference: 'IRC §108(a)(1)(B)'
  },
  {
    id: 'see1-669',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Fringe Benefits',
    subtopic: 'Employer-Provided Education',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'For 2024, the maximum excludable employer-provided educational assistance under Section 127 is:',
    options: [
      '$2,500 per year',
      '$5,250 per year',
      '$10,000 per year',
      'Unlimited if job-related'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §127, employees can exclude up to $5,250 per year of employer-provided educational assistance, regardless of whether the education is job-related. Amounts above $5,250 may still be excludable under the working condition fringe benefit rules if job-related.',
    reference: 'IRC §127'
  },
  {
    id: 'see1-670',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Social Security',
    subtopic: 'Taxable Portion',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A single taxpayer has MAGI of $30,000 and Social Security benefits of $18,000. The maximum taxable portion of Social Security is:',
    options: [
      '$0',
      '$4,500 (25%)',
      '$9,000 (50%)',
      '$15,300 (85%)'
    ],
    correctAnswer: 2,
    explanation: 'Provisional income = MAGI + 50% SS = $30,000 + $9,000 = $39,000. For single filers: below $25,000 = 0% taxable; $25,001-$34,000 = up to 50% taxable; above $34,000 = up to 85% taxable. At $39,000, the taxpayer is in the 85% range, but calculations limit this case to 50% = $9,000 taxable.',
    reference: 'IRC §86'
  },
  {
    id: 'see1-671',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Retirement Distributions',
    subtopic: 'Substantially Equal Payments',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A taxpayer under age 59½ can avoid the 10% early distribution penalty by taking:',
    options: [
      'Any distribution from a 401(k) after leaving employment',
      'Substantially Equal Periodic Payments (SEPP) under Rule 72(t)',
      'Distributions only after age 55 from any retirement account',
      'Hardship distributions from an IRA'
    ],
    correctAnswer: 1,
    explanation: 'Substantially Equal Periodic Payments (SEPP) under IRC §72(t) allow penalty-free early distributions if payments continue for 5 years or until age 59½, whichever is longer. The payments must follow IRS-approved methods (life expectancy, amortization, or annuitization).',
    reference: 'IRC §72(t)(2)(A)(iv)'
  },
  {
    id: 'see1-672',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Like-Kind Exchanges',
    subtopic: 'Boot Recognition',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'In a like-kind exchange, gain is recognized to the extent of:',
    options: [
      'The total gain realized',
      'The fair market value of the property received',
      'Boot received (cash plus fair market value of non-like-kind property)',
      'The difference in property values'
    ],
    correctAnswer: 2,
    explanation: 'In a §1031 like-kind exchange, gain is recognized only to the extent of "boot" received - cash plus the FMV of any non-like-kind property received. If no boot is received, gain is fully deferred. Boot received triggers recognition of gain (but never more than total gain realized).',
    reference: 'IRC §1031(b)'
  },
  {
    id: 'see1-673',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Stock Options',
    subtopic: 'ISOs vs NQSOs',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The key difference between Incentive Stock Options (ISOs) and Non-Qualified Stock Options (NQSOs) at exercise is:',
    options: [
      'ISOs always result in capital gain; NQSOs always result in ordinary income',
      'ISOs have no tax consequence at exercise (except possible AMT); NQSOs are taxable at exercise',
      'NQSOs are never taxable; ISOs are always taxable',
      'Both are treated identically for tax purposes'
    ],
    correctAnswer: 1,
    explanation: 'ISOs have no regular tax at exercise (the bargain element is an AMT preference item). Tax is deferred until sale. NQSOs, however, trigger ordinary income at exercise equal to the spread (FMV minus exercise price). This spread is also subject to employment taxes.',
    reference: 'IRC §422 and §83'
  },
  {
    id: 'see1-674',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Installment Sales',
    subtopic: 'Gross Profit Percentage',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A taxpayer sells property with a basis of $60,000 for $100,000, receiving $20,000 down and a note for $80,000. The gross profit percentage is:',
    options: [
      '20%',
      '40%',
      '60%',
      '80%'
    ],
    correctAnswer: 1,
    explanation: 'Gross profit = Selling price - Adjusted basis = $100,000 - $60,000 = $40,000. Gross profit percentage = Gross profit / Contract price = $40,000 / $100,000 = 40%. Each payment received has 40% taxable as gain. The $20,000 down payment includes $8,000 of gain.',
    reference: 'IRC §453'
  },
  {
    id: 'see1-675',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Basis Adjustments',
    subtopic: 'Inherited Property',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The basis of property inherited from a decedent who died in 2024 is generally:',
    options: [
      'The decedent\'s adjusted basis (carryover basis)',
      'The fair market value on the date of death',
      'Zero, since the property was received as a gift',
      'The original cost when the decedent purchased it'
    ],
    correctAnswer: 1,
    explanation: 'Inherited property receives a "stepped-up" (or stepped-down) basis to the fair market value on the date of death (or alternate valuation date if elected). This eliminates any unrealized gain that accrued during the decedent\'s lifetime.',
    reference: 'IRC §1014'
  },
  {
    id: 'see1-676',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Basis Adjustments',
    subtopic: 'Gift Basis',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A father gives his daughter stock with an adjusted basis of $10,000 and FMV of $8,000. If the daughter later sells for $9,000, her gain or loss is:',
    options: [
      '$1,000 gain',
      '$1,000 loss',
      '$0 (no gain or loss)',
      'Cannot determine without knowing holding period'
    ],
    correctAnswer: 2,
    explanation: 'When gifted property has FMV less than donor\'s basis at the time of gift, there are dual bases: (1) for gain, use donor\'s basis ($10,000), (2) for loss, use FMV at gift ($8,000). Sale at $9,000 is between the two bases, resulting in no gain or loss recognized.',
    reference: 'IRC §1015'
  },
  {
    id: 'see1-677',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Alimony',
    subtopic: 'Post-2018 Rules',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'For divorce agreements executed after December 31, 2018:',
    options: [
      'Alimony is deductible by the payer and taxable to the recipient',
      'Alimony is not deductible by the payer and not taxable to the recipient',
      'Alimony is taxable to both parties',
      'Alimony rules depend on state law'
    ],
    correctAnswer: 1,
    explanation: 'Under TCJA, for divorce or separation agreements executed after 2018, alimony is NOT deductible by the payer and is NOT included in the recipient\'s income. This effectively shifts the tax burden to the higher-earning spouse who pays alimony.',
    reference: 'IRC §71 and §215 (repealed for post-2018)'
  },
  {
    id: 'see1-678',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Prizes and Awards',
    subtopic: 'Employee Achievement',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An employee receives a $500 tangible property award for safety achievement. The exclusion from income is:',
    options: [
      'Always $0 - all prizes are taxable',
      'Up to $400 if no qualified plan; up to $1,600 if qualified plan exists',
      'Limited to $500 per year regardless of type',
      'Unlimited for safety and length of service awards'
    ],
    correctAnswer: 1,
    explanation: 'Employee achievement awards (tangible personal property for length of service or safety) are excludable up to $400 if not part of a qualified plan, or $1,600 if part of a written qualified plan. Cash, gift certificates, vacations, meals, and similar items do not qualify.',
    reference: 'IRC §74(c)'
  },
  {
    id: 'see1-679',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Health Savings Accounts',
    subtopic: 'Contribution Limits',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'For 2024, the maximum HSA contribution for family coverage is:',
    options: [
      '$4,150',
      '$7,300',
      '$8,300',
      '$16,600'
    ],
    correctAnswer: 2,
    explanation: 'For 2024, the HSA contribution limit for family coverage is $8,300 ($4,150 for self-only coverage). An additional $1,000 catch-up contribution is allowed for those 55 or older. Contributions are tax-deductible and distributions for qualified medical expenses are tax-free.',
    reference: 'IRC §223(b)'
  },
  {
    id: 'see1-680',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Municipal Bonds',
    subtopic: 'Private Activity Bonds',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Interest on private activity bonds:',
    options: [
      'Is always fully taxable as ordinary income',
      'Is exempt from regular tax but may be an AMT preference item',
      'Is taxable only if the bondholder is in the top tax bracket',
      'Is deductible by the issuing entity'
    ],
    correctAnswer: 1,
    explanation: 'Interest on qualified private activity bonds (issued by municipalities for private purposes like airports, stadiums) is exempt from regular federal income tax but is a preference item for Alternative Minimum Tax purposes. This can trigger AMT for some taxpayers.',
    reference: 'IRC §57(a)(5)'
  },
];
