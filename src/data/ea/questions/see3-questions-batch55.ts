/**
 * EA SEE Part 3: Representation - Questions Batch 55
 * Focus: SEE3-5 Penalties, SEE3-6 Appeals, SEE3-7 Collection Procedures
 * Critical coverage gap - these areas have very few questions
 * 
 * Tax Year: 2024-2025
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH55: Question[] = [
  // ============================================================================
  // SEE3-5: PENALTIES AND INTEREST (Expanding from 16 to 50+ questions)
  // ============================================================================
  
  // Civil Penalties - Accuracy Related
  {
    id: 'see3-pen-001',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Civil Penalties',
    subtopic: 'Accuracy-Related Penalty',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'The accuracy-related penalty under IRC §6662 is what percentage of the underpayment?',
    options: [
      '10%',
      '20%',
      '25%',
      '75%'
    ],
    correctAnswer: 1,
    explanation: 'The accuracy-related penalty under §6662 is 20% of the underpayment attributable to negligence, disregard of rules, substantial understatement, substantial valuation misstatement, or other listed grounds. For gross valuation misstatement, the penalty increases to 40%.',
    reference: 'IRC §6662'
  },
  {
    id: 'see3-pen-002',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Civil Penalties',
    subtopic: 'Substantial Understatement',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'For individuals, a "substantial understatement of income tax" exists when the understatement exceeds the greater of:',
    options: [
      '$5,000 or 10% of the tax required to be shown',
      '$5,000 or 25% of the tax required to be shown',
      '$10,000 or 10% of the tax required to be shown',
      '$2,500 or 10% of the tax required to be shown'
    ],
    correctAnswer: 0,
    explanation: 'For individuals, a substantial understatement exists when the understatement exceeds the greater of $5,000 OR 10% of the tax required to be shown on the return. For corporations (other than S corps), the threshold is the greater of $10,000 or 10%.',
    reference: 'IRC §6662(d)(1)(A)'
  },
  {
    id: 'see3-pen-003',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Civil Penalties',
    subtopic: 'Negligence',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'Negligence for penalty purposes includes all of the following EXCEPT:',
    options: [
      'Failure to make a reasonable attempt to comply with tax law',
      'Failure to keep adequate records',
      'Honest mistake on a complex issue',
      'Careless disregard for tax rules'
    ],
    correctAnswer: 2,
    explanation: 'Negligence is the failure to make a reasonable attempt to comply with tax law or keep adequate books and records. An honest mistake on a genuinely complex issue, made in good faith, is typically not considered negligence. The standard is whether a reasonable person would have known better.',
    reference: 'IRC §6662(c)'
  },
  {
    id: 'see3-pen-004',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Civil Penalties',
    subtopic: 'Reasonable Cause',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Reliance on a tax professional may constitute reasonable cause defense against penalties if:',
    options: [
      'The taxpayer simply relied on the professional\'s advice without providing information',
      'The taxpayer provided all necessary information and the reliance was in good faith',
      'The tax professional was a CPA, regardless of information provided',
      'The taxpayer signed an engagement letter'
    ],
    correctAnswer: 1,
    explanation: 'Reliance on a tax professional is reasonable cause if: (1) the taxpayer provided accurate and complete information to the professional, (2) the professional was qualified, and (3) the taxpayer reasonably relied on the advice in good faith. Simply hiring a professional is not enough.',
    reference: 'Treas. Reg. §1.6664-4'
  },
  {
    id: 'see3-pen-005',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Civil Penalties',
    subtopic: 'Fraud Penalty',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The civil fraud penalty under IRC §6663 is:',
    options: [
      '20% of the underpayment',
      '50% of the underpayment',
      '75% of the underpayment due to fraud',
      '100% of the underpayment'
    ],
    correctAnswer: 2,
    explanation: 'The civil fraud penalty is 75% of the underpayment attributable to fraud. The burden of proof is on the IRS to show fraud by clear and convincing evidence. If the IRS proves fraud on any portion, the burden shifts to the taxpayer to prove the remaining portion is not fraudulent.',
    reference: 'IRC §6663'
  },
  {
    id: 'see3-pen-006',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Civil Penalties',
    subtopic: 'Failure to File',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The failure to file penalty is:',
    options: [
      '0.5% per month, up to 25%',
      '5% per month, up to 25%',
      '10% per month, up to 50%',
      '5% per month, unlimited'
    ],
    correctAnswer: 1,
    explanation: 'The failure to file penalty (FTF) is 5% of the unpaid tax for each month or partial month the return is late, up to a maximum of 25%. If both FTF and FTP apply for the same month, FTF is reduced by the FTP amount (so effectively 4.5% FTF + 0.5% FTP).',
    reference: 'IRC §6651(a)(1)'
  },
  {
    id: 'see3-pen-007',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Civil Penalties',
    subtopic: 'Failure to Pay',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'The failure to pay penalty is:',
    options: [
      '0.5% per month, up to 25%',
      '5% per month, up to 25%',
      '0.5% per month, up to 50%',
      '1% per month, up to 25%'
    ],
    correctAnswer: 0,
    explanation: 'The failure to pay penalty (FTP) is 0.5% of the unpaid tax for each month or partial month the tax remains unpaid, up to a maximum of 25%. If an installment agreement is in place, the rate is reduced to 0.25% per month.',
    reference: 'IRC §6651(a)(2)'
  },
  {
    id: 'see3-pen-008',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Civil Penalties',
    subtopic: 'Minimum Penalty',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'If a return is filed more than 60 days late, the minimum failure to file penalty is:',
    options: [
      'The tax due',
      '$100',
      'The lesser of $485 (2024) or 100% of the tax due',
      '$450 or 25% of the tax, whichever is greater'
    ],
    correctAnswer: 2,
    explanation: 'For returns more than 60 days late, the minimum failure to file penalty is the LESSER of $485 (for 2024, adjusted for inflation) OR 100% of the unpaid tax. This ensures a minimum penalty even on small balances but caps it at the tax owed.',
    reference: 'IRC §6651(a)'
  },
  {
    id: 'see3-pen-009',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Interest',
    subtopic: 'Rate Determination',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'The IRS interest rate on underpayments of tax is:',
    options: [
      'A fixed rate of 5%',
      'The federal short-term rate plus 3 percentage points',
      'The prime rate plus 2 percentage points',
      'The federal long-term rate'
    ],
    correctAnswer: 1,
    explanation: 'The IRS underpayment interest rate for individuals is the federal short-term rate plus 3 percentage points, compounded daily. The rate is adjusted quarterly. For large corporate underpayments (over $100,000), the rate is the short-term rate plus 5 points.',
    reference: 'IRC §6621'
  },
  {
    id: 'see3-pen-010',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Interest',
    subtopic: 'Interest Abatement',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Interest may be abated by the IRS when:',
    options: [
      'The taxpayer demonstrates reasonable cause',
      'The interest was caused by IRS error or delay',
      'The taxpayer enters an installment agreement',
      'The taxpayer files an offer in compromise'
    ],
    correctAnswer: 1,
    explanation: 'Unlike penalties, interest generally cannot be abated for reasonable cause. Interest may only be abated when attributable to IRS errors or delays in performing a ministerial or managerial act. Entering payment plans or OICs does not stop or reduce interest - it continues to accrue.',
    reference: 'IRC §6404'
  },
  {
    id: 'see3-pen-011',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Estimated Tax',
    subtopic: 'Safe Harbor',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'To avoid the estimated tax penalty using the prior year safe harbor, a taxpayer must pay:',
    options: [
      '90% of prior year tax',
      '100% of prior year tax (or 110% if AGI > $150,000)',
      '100% of current year tax',
      '80% of current year tax'
    ],
    correctAnswer: 1,
    explanation: 'To avoid the estimated tax penalty, taxpayers must pay at least 100% of prior year tax liability (or 110% if prior year AGI exceeded $150,000 for MFJ/$75,000 for MFS). Alternatively, paying 90% of current year tax also avoids the penalty.',
    reference: 'IRC §6654(d)(1)(B)'
  },
  {
    id: 'see3-pen-012',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Preparer Penalties',
    subtopic: 'Unreasonable Position',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A tax return preparer faces a penalty for an unreasonable position that lacks:',
    options: [
      'Any legal support',
      'Reasonable basis',
      'Substantial authority',
      'More likely than not probability of success'
    ],
    correctAnswer: 2,
    explanation: 'Under §6694(a), a preparer faces a penalty if the position does not have substantial authority (unless the position is disclosed and has reasonable basis). For disclosed positions, reasonable basis is sufficient. For undisclosed positions, substantial authority is required.',
    reference: 'IRC §6694(a)'
  },
  {
    id: 'see3-pen-013',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Preparer Penalties',
    subtopic: 'Willful Understatement',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The penalty for willful or reckless conduct by a tax preparer under §6694(b) is:',
    options: [
      '$500',
      '$1,000 or 50% of preparer fee, whichever is greater',
      '$5,000 or 75% of preparer fee, whichever is greater',
      'Automatic suspension of PTIN'
    ],
    correctAnswer: 2,
    explanation: 'For willful attempt to understate tax or reckless/intentional disregard of rules, the penalty is the GREATER of $5,000 or 75% of the income derived by the preparer from the return. This is much higher than the negligent ($1,000/50%) penalty.',
    reference: 'IRC §6694(b)'
  },
  {
    id: 'see3-pen-014',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Civil Penalties',
    subtopic: 'Frivolous Return',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'The penalty for filing a frivolous tax return is:',
    options: [
      '$500',
      '$2,500',
      '$5,000',
      '$10,000'
    ],
    correctAnswer: 2,
    explanation: 'The frivolous return penalty is $5,000. A frivolous return is one that (1) does not contain information to judge correctness of tax, or (2) is based on frivolous positions (e.g., "wages are not income," "filing is voluntary"). This is in addition to other applicable penalties.',
    reference: 'IRC §6702'
  },
  {
    id: 'see3-pen-015',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Civil Penalties',
    subtopic: 'Erroneous Refund Claims',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The penalty for filing an erroneous claim for refund or credit is:',
    options: [
      '10% of the excessive amount claimed',
      '20% of the excessive amount claimed',
      '50% of the excessive amount claimed',
      '75% of the excessive amount claimed'
    ],
    correctAnswer: 1,
    explanation: 'Under §6676, if a claim for refund or credit is made for an excessive amount and lacks a reasonable basis, the penalty is 20% of the excessive amount. This does not apply to EITC claims, which have separate penalties.',
    reference: 'IRC §6676'
  },
  {
    id: 'see3-pen-016',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Criminal Penalties',
    subtopic: 'Tax Evasion',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Criminal tax evasion under IRC §7201 can result in:',
    options: [
      'Up to 1 year imprisonment and $10,000 fine',
      'Up to 3 years imprisonment and $100,000 fine',
      'Up to 5 years imprisonment and $250,000 fine',
      'Up to 10 years imprisonment and $500,000 fine'
    ],
    correctAnswer: 2,
    explanation: 'Willful attempt to evade or defeat tax is a felony punishable by up to 5 years imprisonment and a fine up to $250,000 ($500,000 for corporations), plus costs of prosecution. This is the most serious tax crime and requires willfulness.',
    reference: 'IRC §7201'
  },
  {
    id: 'see3-pen-017',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Criminal Penalties',
    subtopic: 'Willful Failure to File',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'Willful failure to file a return under IRC §7203 is:',
    options: [
      'A civil penalty only',
      'A misdemeanor with up to 1 year imprisonment',
      'A felony with up to 3 years imprisonment',
      'A felony with up to 5 years imprisonment'
    ],
    correctAnswer: 1,
    explanation: 'Willful failure to file a return, pay tax, or keep records is a misdemeanor under §7203, punishable by up to 1 year imprisonment and $25,000 fine ($100,000 for corporations). This is less severe than tax evasion because no affirmative act of evasion is required.',
    reference: 'IRC §7203'
  },
  {
    id: 'see3-pen-018',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Interest',
    subtopic: 'Compounding',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'IRS interest is compounded:',
    options: [
      'Monthly',
      'Quarterly',
      'Daily',
      'Annually'
    ],
    correctAnswer: 2,
    explanation: 'IRS interest on underpayments (and overpayments) is compounded daily. This means interest accrues on both the tax due and previously accrued interest. The rate is adjusted quarterly based on the federal short-term rate.',
    reference: 'IRC §6622'
  },
  {
    id: 'see3-pen-019',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Civil Penalties',
    subtopic: 'First-Time Abatement',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'First-Time Penalty Abatement (FTA) may be requested if:',
    options: [
      'The taxpayer has never filed a return',
      'The taxpayer has a clean compliance history for the prior 3 years',
      'The penalty amount is under $500',
      'The taxpayer is on an installment agreement'
    ],
    correctAnswer: 1,
    explanation: 'First-Time Abatement (FTA) is an administrative penalty waiver for taxpayers with a clean compliance history - no penalties in the prior 3 years, all required returns filed, and all taxes paid or on a payment plan. It applies to FTF, FTP, and failure to deposit penalties.',
    reference: 'IRM 20.1.1.3.6.1'
  },
  {
    id: 'see3-pen-020',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-5',
    topic: 'Preparer Penalties',
    subtopic: 'PTIN Requirement',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'The penalty for failure to furnish a PTIN on a return is:',
    options: [
      '$50 per failure',
      '$100 per failure',
      '$250 per failure',
      '$500 per failure'
    ],
    correctAnswer: 0,
    explanation: 'Tax return preparers must include their PTIN on every return they prepare. Failure to do so results in a $50 penalty per failure. The maximum annual penalty is $27,000 (for 2024). Using a false or expired PTIN is a separate violation.',
    reference: 'IRC §6695(c)'
  },
  
  // ============================================================================
  // SEE3-6: APPEALS (Expanding from 13 to 40+ questions)
  // ============================================================================
  
  {
    id: 'see3-app-001',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-6',
    topic: 'IRS Appeals',
    subtopic: 'Purpose',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'The mission of the IRS Independent Office of Appeals is to:',
    options: [
      'Collect delinquent taxes',
      'Audit tax returns',
      'Resolve tax controversies without litigation',
      'Prosecute tax fraud cases'
    ],
    correctAnswer: 2,
    explanation: 'The IRS Independent Office of Appeals resolves tax controversies fairly and impartially, without litigation when possible. Appeals considers the hazards of litigation - the likelihood that the IRS would prevail in court - when negotiating settlements.',
    reference: 'IRC §7803(e)'
  },
  {
    id: 'see3-app-002',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-6',
    topic: 'IRS Appeals',
    subtopic: 'Request Process',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'To request an Appeals conference for an audit dispute, a taxpayer files:',
    options: [
      'Form 843',
      'Form 911',
      'A written protest or Form 12203',
      'Form 9423'
    ],
    correctAnswer: 2,
    explanation: 'For proposed amounts over $25,000, a formal written protest is required. For amounts of $25,000 or less, Form 12203 (Request for Appeals Review) or a brief written statement is sufficient. The protest must include a statement of facts and applicable law.',
    reference: 'IRS Publication 5'
  },
  {
    id: 'see3-app-003',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-6',
    topic: 'IRS Appeals',
    subtopic: 'Written Protest Requirements',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A formal written protest must include all of the following EXCEPT:',
    options: [
      'A statement that the taxpayer wants to appeal',
      'The taxpayer\'s name, address, and SSN/EIN',
      'A copy of the taxpayer\'s bank statements',
      'A statement of facts and law supporting the position'
    ],
    correctAnswer: 2,
    explanation: 'A formal written protest must include: (1) statement of intent to appeal, (2) taxpayer identifying information, (3) date and symbols from the IRS letter, (4) tax periods involved, (5) itemized schedule of disagreed items, (6) statement of facts, (7) statement of law. Bank statements are not required.',
    reference: 'IRS Publication 5'
  },
  {
    id: 'see3-app-004',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-6',
    topic: 'IRS Appeals',
    subtopic: 'Hazards of Litigation',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: '"Hazards of litigation" in Appeals means:',
    options: [
      'The cost of going to court',
      'The likelihood either party would win if the case went to court',
      'The danger of criminal prosecution',
      'The risk of additional penalties'
    ],
    correctAnswer: 1,
    explanation: 'Hazards of litigation refers to the uncertainty of the outcome if a case goes to court - essentially the probability that the IRS (or taxpayer) would prevail. Appeals considers these hazards when negotiating settlements, potentially compromising on positions that are weak.',
    reference: 'IRM 8.6.1'
  },
  {
    id: 'see3-app-005',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-6',
    topic: 'IRS Appeals',
    subtopic: 'Fast Track Settlement',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'Fast Track Settlement (FTS) allows disputes to be resolved:',
    options: [
      'Before the audit is complete',
      'While still at the examination stage with Appeals mediating',
      'Only in Tax Court',
      'Only for amounts under $10,000'
    ],
    correctAnswer: 1,
    explanation: 'Fast Track Settlement is an alternative dispute resolution technique where Appeals helps resolve issues while the case is still with Examination. An Appeals officer acts as a neutral facilitator. Either party can withdraw at any time. It speeds resolution significantly.',
    reference: 'Rev. Proc. 2003-40'
  },
  {
    id: 'see3-app-006',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-6',
    topic: 'Tax Court',
    subtopic: 'Jurisdiction',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'To petition the U.S. Tax Court, a taxpayer must:',
    options: [
      'First pay the tax in dispute',
      'Receive a notice of deficiency and file within 90 days',
      'Have income over $100,000',
      'Have a case assigned to Appeals first'
    ],
    correctAnswer: 1,
    explanation: 'To petition Tax Court, the taxpayer must receive a statutory notice of deficiency (90-day letter) and file a petition within 90 days (150 days if addressed outside the U.S.). No payment of the disputed tax is required to access Tax Court - this is its unique advantage.',
    reference: 'IRC §6213'
  },
  {
    id: 'see3-app-007',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-6',
    topic: 'Tax Court',
    subtopic: 'Small Tax Case',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'The Small Tax Case (S case) procedure in Tax Court is available for disputes of:',
    options: [
      '$10,000 or less per year',
      '$25,000 or less per year',
      '$50,000 or less per year',
      '$75,000 or less per year'
    ],
    correctAnswer: 2,
    explanation: 'Small tax cases (S cases) are available for disputes of $50,000 or less per tax year, including penalties. The procedure is simplified - informal, no formal rules of evidence, but the decision is not appealable. Regular Tax Court applies to larger amounts.',
    reference: 'IRC §7463'
  },
  {
    id: 'see3-app-008',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-6',
    topic: 'Refund Litigation',
    subtopic: 'Forum Choice',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'To sue for a refund in District Court or Court of Federal Claims, the taxpayer must first:',
    options: [
      'File a petition with Tax Court',
      'Pay the full amount of the disputed tax',
      'Go through Appeals',
      'Get approval from the IRS Commissioner'
    ],
    correctAnswer: 1,
    explanation: 'To sue in U.S. District Court or the Court of Federal Claims, the taxpayer must first pay the full tax, file a claim for refund, and either receive a denial or wait 6 months. This is "pay first, sue later" - the opposite of Tax Court.',
    reference: 'IRC §7422'
  },
  {
    id: 'see3-app-009',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-6',
    topic: 'Refund Litigation',
    subtopic: 'Claim for Refund',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A claim for refund must generally be filed within:',
    options: [
      '1 year from payment',
      '2 years from payment or 3 years from filing, whichever is later',
      '3 years from filing only',
      '5 years from filing'
    ],
    correctAnswer: 1,
    explanation: 'A refund claim must be filed within 3 years from when the return was filed OR 2 years from when the tax was paid, whichever is later. The amount recoverable depends on which limitation period applies - tax paid within the relevant period.',
    reference: 'IRC §6511'
  },
  {
    id: 'see3-app-010',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-6',
    topic: 'IRS Appeals',
    subtopic: 'Collection Appeals',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'A Collection Due Process (CDP) hearing is available:',
    options: [
      'Before any collection action',
      'Before or after filing of a federal tax lien or levy',
      'Only after levy has been made',
      'Only for amounts over $50,000'
    ],
    correctAnswer: 1,
    explanation: 'CDP hearings are available after the IRS files a Notice of Federal Tax Lien or before (or after) levy. The taxpayer has 30 days to request a CDP hearing. These hearings allow taxpayers to challenge the appropriateness of collection action and propose alternatives.',
    reference: 'IRC §6320, §6330'
  },
  {
    id: 'see3-app-011',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-6',
    topic: 'Collection Appeals',
    subtopic: 'CDP Timeline',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A Request for a Collection Due Process hearing must be filed within:',
    options: [
      '10 days of the notice',
      '30 days of the notice',
      '45 days of the notice',
      '90 days of the notice'
    ],
    correctAnswer: 1,
    explanation: 'A CDP hearing request must be filed within 30 days of the date of the lien/levy notice. If filed timely, the taxpayer has the right to judicial review in Tax Court. If filed late, the taxpayer gets an "equivalent hearing" but cannot petition Tax Court.',
    reference: 'IRC §6330(a)(3)'
  },
  {
    id: 'see3-app-012',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-6',
    topic: 'Tax Court',
    subtopic: 'Representation',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'Before the U.S. Tax Court, taxpayers may be represented by:',
    options: [
      'Only attorneys admitted to practice before Tax Court',
      'Attorneys, CPAs, or Enrolled Agents admitted to practice before Tax Court',
      'Any individual chosen by the taxpayer',
      'Only the taxpayer themselves (pro se)'
    ],
    correctAnswer: 1,
    explanation: 'Tax Court practitioners may include attorneys, CPAs, Enrolled Agents, and others who pass the Tax Court examination. These individuals must be admitted to practice before Tax Court. Taxpayers may also represent themselves (pro se).',
    reference: 'Tax Court Rules'
  },
  {
    id: 'see3-app-013',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-6',
    topic: 'IRS Appeals',
    subtopic: 'Post-Appeals Mediation',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Post-Appeals Mediation (PAM) is available when:',
    options: [
      'Before the case goes to Appeals',
      'After Appeals and IRS agree but taxpayer disagrees',
      'When Appeals and taxpayer cannot reach agreement on factual issues',
      'Only for international tax issues'
    ],
    correctAnswer: 2,
    explanation: 'Post-Appeals Mediation is an ADR technique available when Appeals and the taxpayer cannot agree. A mediator (often another Appeals officer) facilitates settlement. Either party can terminate mediation. It\'s used when traditional Appeals negotiation fails.',
    reference: 'Rev. Proc. 2014-63'
  },
  {
    id: 'see3-app-014',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-6',
    topic: 'Statutory Notice',
    subtopic: '90-Day Letter',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'A statutory notice of deficiency (90-day letter) is issued:',
    options: [
      'After every audit',
      'Before the IRS can assess additional tax (absent consent)',
      'Only if the taxpayer requests it',
      'Only for fraud cases'
    ],
    correctAnswer: 1,
    explanation: 'A statutory notice of deficiency (90-day letter) must be issued before the IRS can assess tax in a deficiency situation (income, estate, gift taxes). It gives the taxpayer 90 days to petition Tax Court. The taxpayer can also agree and waive the notice.',
    reference: 'IRC §6212'
  },
  {
    id: 'see3-app-015',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-6',
    topic: 'Collection Appeals',
    subtopic: 'CAP vs CDP',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The Collection Appeals Program (CAP) differs from Collection Due Process (CDP) in that:',
    options: [
      'CAP is more formal',
      'CDP provides Tax Court review; CAP does not',
      'CAP requires a filing fee',
      'CDP is faster than CAP'
    ],
    correctAnswer: 1,
    explanation: 'CDP (Collection Due Process) provides the right to judicial review in Tax Court if the taxpayer disagrees with the Appeals determination. CAP (Collection Appeals Program) is an administrative process with no judicial review - the Appeals decision is final. CDP has stricter deadlines.',
    reference: 'IRS Publication 1660'
  },
  
  // ============================================================================
  // SEE3-7: COLLECTION PROCEDURES (Expanding from 20 to 45+ questions)
  // ============================================================================
  
  {
    id: 'see3-coll-001',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Installment Agreements',
    subtopic: 'Guaranteed IA',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'The IRS must accept a guaranteed installment agreement if the tax liability is:',
    options: [
      '$10,000 or less, payable within 3 years',
      '$25,000 or less, payable within 6 years',
      '$50,000 or less, payable within 72 months',
      '$100,000 or less, payable within 5 years'
    ],
    correctAnswer: 0,
    explanation: 'The IRS must accept a guaranteed installment agreement if: (1) tax owed is $10,000 or less (excluding penalties and interest), (2) taxpayer can pay within 3 years, (3) all returns are filed, (4) no IA in prior 5 years. No financial statement required.',
    reference: 'IRC §6159(c)'
  },
  {
    id: 'see3-coll-002',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Installment Agreements',
    subtopic: 'Streamlined IA',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A streamlined installment agreement (no financial statement required) is available for individuals owing:',
    options: [
      '$25,000 or less',
      '$50,000 or less in combined tax, penalty, and interest',
      '$100,000 or less',
      '$250,000 or less'
    ],
    correctAnswer: 1,
    explanation: 'Streamlined installment agreements are available for individuals owing $50,000 or less (combined tax, penalties, and interest) who can pay within 72 months. No Collection Information Statement (Form 433-A) is required. The IRS will not file a lien in most cases.',
    reference: 'IRS Fresh Start'
  },
  {
    id: 'see3-coll-003',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Federal Tax Lien',
    subtopic: 'Lien Filing',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'A federal tax lien arises automatically when:',
    options: [
      'A tax return is filed showing a balance due',
      'An assessment is made, demand is sent, and the taxpayer fails to pay',
      'The IRS files a Notice of Federal Tax Lien',
      'The taxpayer enters an installment agreement'
    ],
    correctAnswer: 1,
    explanation: 'The federal tax lien arises automatically when: (1) an assessment is made, (2) demand for payment is sent, and (3) the taxpayer fails to pay within 10 days. Filing the Notice of Federal Tax Lien (NFTL) is a separate action that makes the lien public.',
    reference: 'IRC §6321'
  },
  {
    id: 'see3-coll-004',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Federal Tax Lien',
    subtopic: 'Priority',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A federal tax lien generally has priority over:',
    options: [
      'A mortgage recorded before the NFTL is filed',
      'A judgment creditor who perfected before the NFTL is filed',
      'Unsecured creditors',
      'A purchase money security interest'
    ],
    correctAnswer: 2,
    explanation: 'A federal tax lien is valid against the taxpayer immediately but is generally not valid against purchasers, holders of security interests, mechanic\'s lien holders, or judgment lien creditors until the NFTL is filed. However, it does have priority over unsecured creditors.',
    reference: 'IRC §6323'
  },
  {
    id: 'see3-coll-005',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Levy',
    subtopic: 'Exempt Property',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'Property exempt from IRS levy includes all of the following EXCEPT:',
    options: [
      'Necessary clothing',
      'Unemployment benefits',
      'Investment accounts',
      'Workers\' compensation benefits'
    ],
    correctAnswer: 2,
    explanation: 'Levy exemptions include: wearing apparel and schoolbooks, fuel/provisions/furniture (up to limits), books and tools of trade (up to limit), unemployment benefits, workers\' comp, certain annuity/pension payments, child support. Investment accounts are NOT exempt.',
    reference: 'IRC §6334'
  },
  {
    id: 'see3-coll-006',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Levy',
    subtopic: 'Continuous Levy',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A continuous levy on wages attaches to:',
    options: [
      'Only the wages owed on the levy date',
      'Up to 15% of wages until the tax is paid',
      'All future wages until released',
      '100% of wages with no exemption'
    ],
    correctAnswer: 2,
    explanation: 'A continuous levy on wages attaches to all future wages until released (unlike a one-time levy on a bank account). The employer must honor the levy by paying over amounts above the exempt amount each pay period. The exempt amount is based on filing status and dependents.',
    reference: 'IRC §6331(e)'
  },
  {
    id: 'see3-coll-007',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Offer in Compromise',
    subtopic: 'Doubt as to Collectibility',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'An offer in compromise based on "doubt as to collectibility" is accepted when:',
    options: [
      'The taxpayer can prove the IRS assessment is wrong',
      'The taxpayer cannot pay the full liability',
      'The taxpayer demonstrates exceptional circumstances',
      'Collecting would create economic hardship'
    ],
    correctAnswer: 1,
    explanation: 'Doubt as to collectibility means the taxpayer\'s assets and income are insufficient to pay the full tax liability. The IRS calculates the Reasonable Collection Potential (RCP) - what they could collect - and may accept less if the offer exceeds RCP.',
    reference: 'IRC §7122'
  },
  {
    id: 'see3-coll-008',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Offer in Compromise',
    subtopic: 'Application Process',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An offer in compromise is submitted using:',
    options: [
      'Form 656 with $205 application fee (waivable for low income)',
      'Form 433-D only',
      'Form 843',
      'A letter to the IRS Commissioner'
    ],
    correctAnswer: 0,
    explanation: 'Offers in compromise are submitted on Form 656 (Offer in Compromise) with detailed financial information (Forms 433-A/B) and a $205 application fee (waived for low-income taxpayers). Payment must accompany the offer - either lump sum or periodic.',
    reference: 'Form 656 Instructions'
  },
  {
    id: 'see3-coll-009',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Offer in Compromise',
    subtopic: 'OIC Requirements',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Which is NOT a requirement to qualify for an offer in compromise?',
    options: [
      'All required tax returns must be filed',
      'The taxpayer must be current with estimated tax payments',
      'The taxpayer must have assets worth less than $1 million',
      'The taxpayer cannot be in open bankruptcy'
    ],
    correctAnswer: 2,
    explanation: 'OIC requirements include: all returns filed, current with estimated payments and withholding, not in open bankruptcy. There is no asset limit - wealthy taxpayers can submit OICs if they genuinely cannot pay (doubt as to collectibility). High assets don\'t disqualify but reduce likelihood of acceptance.',
    reference: 'Form 656'
  },
  {
    id: 'see3-coll-010',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Currently Not Collectible',
    subtopic: 'CNC Status',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Currently Not Collectible (CNC) status means:',
    options: [
      'The tax debt is forgiven',
      'Collection is temporarily suspended due to financial hardship',
      'The statute of limitations is suspended',
      'The taxpayer enters a formal payment plan'
    ],
    correctAnswer: 1,
    explanation: 'CNC (Currently Not Collectible) status temporarily suspends collection activity because the taxpayer cannot pay basic living expenses and pay the tax. The debt is NOT forgiven - interest and penalties continue to accrue. The IRS reviews CNC cases periodically.',
    reference: 'IRM 5.16.1'
  },
  {
    id: 'see3-coll-011',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Collection Statute',
    subtopic: 'CSED',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'The Collection Statute Expiration Date (CSED) is generally:',
    options: [
      '3 years from assessment',
      '6 years from assessment',
      '10 years from assessment',
      'Unlimited'
    ],
    correctAnswer: 2,
    explanation: 'The IRS generally has 10 years from assessment to collect tax. After the CSED, the tax is no longer legally collectible. Certain actions (bankruptcy, OIC, CDP, taxpayer abroad) can suspend or extend this period.',
    reference: 'IRC §6502'
  },
  {
    id: 'see3-coll-012',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Trust Fund Recovery Penalty',
    subtopic: 'Responsible Persons',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The Trust Fund Recovery Penalty (TFRP) may be assessed against:',
    options: [
      'Only the employer (business entity)',
      'Only the owner of the business',
      'Any responsible person who willfully failed to pay over trust fund taxes',
      'Only the person who signed tax returns'
    ],
    correctAnswer: 2,
    explanation: 'The TFRP (100% penalty) can be assessed against any "responsible person" who willfully failed to collect, account for, or pay over trust fund taxes (employee withholding). This includes officers, directors, employees, or others with authority over finances. Multiple persons can be liable.',
    reference: 'IRC §6672'
  },
  {
    id: 'see3-coll-013',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Lien Release',
    subtopic: 'Certificate of Release',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A federal tax lien must be released within:',
    options: [
      '10 days of payment in full or the liability becoming unenforceable',
      '30 days of payment in full or the liability becoming unenforceable',
      '60 days of payment in full',
      '90 days of submitting Form 12277'
    ],
    correctAnswer: 1,
    explanation: 'The IRS must release a federal tax lien within 30 days after: (1) the liability is satisfied, (2) the liability becomes legally unenforceable, or (3) a bond is accepted. The taxpayer can request a Certificate of Release of Federal Tax Lien.',
    reference: 'IRC §6325(a)'
  },
  {
    id: 'see3-coll-014',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Subordination',
    subtopic: 'Lien Subordination',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The IRS may subordinate a federal tax lien when:',
    options: [
      'The taxpayer files bankruptcy',
      'Subordination will increase the amount ultimately collected',
      'The taxpayer requests it in writing',
      'The tax is less than $25,000'
    ],
    correctAnswer: 1,
    explanation: 'The IRS may subordinate its lien to another creditor if doing so will ultimately increase collections (e.g., allowing refinancing that generates funds to pay IRS). Subordination does not release the lien; it just allows another creditor priority.',
    reference: 'IRC §6325(d)'
  },
  {
    id: 'see3-coll-015',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Discharge of Lien',
    subtopic: 'Property Discharge',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A discharge of the federal tax lien releases:',
    options: [
      'The entire tax liability',
      'The lien from all property',
      'The lien from specific property',
      'The taxpayer from further collection'
    ],
    correctAnswer: 2,
    explanation: 'A discharge removes the lien from specific property (e.g., to allow sale) but the lien remains on other property. Conditions include: IRS receives fair value, double the liability, or amount equal to IRS interest. The underlying tax debt remains.',
    reference: 'IRC §6325(b)'
  },
  {
    id: 'see3-coll-016',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Taxpayer Advocate',
    subtopic: 'TAS Assistance',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'The Taxpayer Advocate Service (TAS) can assist when:',
    options: [
      'The taxpayer disagrees with the amount of tax owed',
      'The taxpayer is experiencing significant hardship due to IRS action',
      'The taxpayer wants faster refund processing',
      'The taxpayer needs help preparing a return'
    ],
    correctAnswer: 1,
    explanation: 'TAS assists when taxpayers are experiencing significant hardship (financial difficulty, immediate threat of adverse action, rights not being respected) or when IRS systems/procedures are not working as intended. TAS does not represent taxpayers in disputes over tax liability.',
    reference: 'IRC §7803(c)'
  },
  {
    id: 'see3-coll-017',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Installment Agreements',
    subtopic: 'User Fees',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'The user fee for setting up an online installment agreement is:',
    options: [
      'Free',
      '$31 for direct debit setup',
      '$107 for other payment methods',
      'All of the above depending on setup method'
    ],
    correctAnswer: 3,
    explanation: 'Installment agreement fees vary: Online direct debit is $31 (lowest); online payment card/check is $130; phone/mail setup is $178 (highest). Low-income taxpayers may qualify for fee waivers or reimbursements. Fees are waived for guaranteed IAs under $10,000.',
    reference: 'IRS User Fee Schedule'
  },
  {
    id: 'see3-coll-018',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Levy',
    subtopic: 'Bank Levy',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When the IRS levies a bank account, the bank must:',
    options: [
      'Immediately send all funds to the IRS',
      'Hold funds for 21 days before sending to IRS',
      'Notify the account holder and wait 30 days',
      'Close the account permanently'
    ],
    correctAnswer: 1,
    explanation: 'When a bank receives a levy, it must hold the funds for 21 days before remitting to the IRS. This gives the taxpayer time to contact IRS, dispute the levy, or make payment arrangements. The levy captures funds as of the levy date only (not future deposits).',
    reference: 'IRC §6332(c)'
  },
  {
    id: 'see3-coll-019',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Innocent Spouse',
    subtopic: 'Relief Types',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Innocent spouse relief under IRC §6015 may be available when:',
    options: [
      'Both spouses signed a joint return',
      'One spouse was unaware of an understatement and it would be inequitable to hold them liable',
      'The couple is still married',
      'The tax is under $10,000'
    ],
    correctAnswer: 1,
    explanation: 'Innocent spouse relief may apply when: (1) a joint return was filed, (2) there was an understatement of tax due to erroneous items of the other spouse, (3) the requesting spouse did not know and had no reason to know, and (4) it would be inequitable to hold the requesting spouse liable.',
    reference: 'IRC §6015'
  },
  {
    id: 'see3-coll-020',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-7',
    topic: 'Bankruptcy',
    subtopic: 'Automatic Stay',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The automatic stay in bankruptcy affects IRS collection by:',
    options: [
      'Permanently stopping all collection',
      'Temporarily stopping most collection activity',
      'Having no effect on tax collection',
      'Discharging all tax debt'
    ],
    correctAnswer: 1,
    explanation: 'The automatic stay temporarily stops most IRS collection activity (liens, levies, suits). However, the IRS can still assess tax, demand returns, and audit during bankruptcy. Some collection (like continuous levies issued pre-petition) may continue. The stay lifts when bankruptcy ends or is modified.',
    reference: '11 USC §362'
  },
];
