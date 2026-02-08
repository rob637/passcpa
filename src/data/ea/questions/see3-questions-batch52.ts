/**
 * EA SEE Part 3: Representation - Questions Batch 52 (Q571-600)
 * Mixed Blueprint Areas for comprehensive coverage
 * 
 * Tax Year: 2024-2025
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH52: Question[] = [
  // SEE3-1: Practices and Procedures
  {
    id: 'see3-571',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Penalty Abatement',
    subtopic: 'First-Time Penalty Abatement',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'To qualify for First-Time Penalty Abatement (FTA), a taxpayer must:',
    options: [
      'Have never filed a tax return late',
      'Be penalty-free for the prior 3 years, have filed all required returns, and be current on payments',
      'Have a reasonable cause for the penalty',
      'Request abatement within 30 days of the penalty notice'
    ],
    correctAnswer: 1,
    explanation: 'FTA eligibility requires: (1) no penalties for prior 3 years (for the same return type), (2) all required returns filed or valid extension, (3) paid or arranged to pay any tax due. FTA is administrative, not in code.',
    reference: 'IRM 20.1.1.3.6.1'
  },
  {
    id: 'see3-572',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'IRS Notices',
    subtopic: 'CP2000 Response',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A CP2000 notice indicates that:',
    options: [
      'The IRS has selected the return for audit',
      'The return has a math error',
      'Income reported to the IRS does not match the return',
      'The taxpayer owes criminal penalties'
    ],
    correctAnswer: 2,
    explanation: 'CP2000 is an Automated Underreporter (AUR) notice indicating a discrepancy between income on the return and information returns (W-2s, 1099s). It\'s not an audit; taxpayer can agree, partially agree, or disagree.',
    reference: 'IRM 4.19.3'
  },
  {
    id: 'see3-573',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Statute of Limitations',
    subtopic: 'Claim for Refund',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'A claim for refund must generally be filed within:',
    options: [
      '2 years from the date the tax was paid',
      '3 years from the date of filing or 2 years from tax paid, whichever is later',
      '5 years from the due date',
      '1 year from the assessment date'
    ],
    correctAnswer: 1,
    explanation: 'Claims for refund must be filed within 3 years from filing (or due date if unfiled) or 2 years from payment, whichever is later. The amount refundable may be limited by when payments were made.',
    reference: 'IRC §6511'
  },
  {
    id: 'see3-574',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Collection Due Process',
    subtopic: 'CDP Hearing Rights',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A taxpayer has the right to a Collection Due Process (CDP) hearing after receiving:',
    options: [
      'Any balance due notice',
      'A Final Notice of Intent to Levy or Notice of Federal Tax Lien Filing',
      'A CP2000 notice',
      'Form 1099 showing income'
    ],
    correctAnswer: 1,
    explanation: 'CDP rights attach when IRS issues a Final Notice of Intent to Levy (Letter 1058 or LT11) or Notice of Federal Tax Lien Filing (Letter 3172). Taxpayer has 30 days to request CDP hearing from the date of the notice.',
    reference: 'IRC §6320, §6330'
  },
  {
    id: 'see3-575',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Examinations',
    subtopic: 'Examination Selection',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'Returns are selected for examination based on:',
    options: [
      'Random selection only',
      'DIF scores, related examinations, and information matching',
      'Alphabetical order of taxpayer last name',
      'Size of refund claimed'
    ],
    correctAnswer: 1,
    explanation: 'IRS uses DIF (Discriminant Index Function) scores, related return examinations (partnerships, employers), and document matching (W-2, 1099) to select returns. Random sampling is also used for some research audits.',
    reference: 'Pub. 556'
  },
  // SEE3-2: Representation
  {
    id: 'see3-576',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Circular 230',
    subtopic: 'Solicitation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under Circular 230, a practitioner may NOT:',
    options: [
      'Advertise services on social media',
      'Use testimonials from satisfied clients',
      'Make false or misleading statements about fees',
      'List professional certifications in advertisements'
    ],
    correctAnswer: 2,
    explanation: 'Circular 230 §10.30 prohibits false, fraudulent, misleading, or deceptive statements in advertising. Testimonials and certifications are permitted if truthful. Fee advertising is allowed but must not be false or misleading.',
    reference: 'Circular 230 §10.30'
  },
  {
    id: 'see3-577',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Circular 230',
    subtopic: 'Competence',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'If a client asks an enrolled agent to represent them in an area the EA has limited experience with, the EA should:',
    options: [
      'Decline to represent the client in all matters',
      'Become competent through study or associate with someone competent',
      'Represent the client and learn as the case progresses',
      'Refer only complicated cases to attorneys'
    ],
    correctAnswer: 1,
    explanation: 'Circular 230 §10.35 requires competent representation. A practitioner can become competent through study, training, or experience, or by associating with someone who has the requisite competence.',
    reference: 'Circular 230 §10.35'
  },
  {
    id: 'see3-578',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Circular 230',
    subtopic: 'Conflicts of Interest',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A practitioner may represent clients with conflicting interests if:',
    options: [
      'Never - conflicting interests are always prohibited',
      'The practitioner reasonably believes competent representation is possible and clients provide informed written consent',
      'Only if the IRS approves in advance',
      'The conflict involves only minor tax matters'
    ],
    correctAnswer: 1,
    explanation: 'Circular 230 §10.29 allows representation of conflicting interests if: (1) the practitioner reasonably believes competent and diligent representation is possible, and (2) affected clients give informed consent confirmed in writing.',
    reference: 'Circular 230 §10.29'
  },
  {
    id: 'see3-579',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Circular 230',
    subtopic: 'Due Diligence',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A practitioner exercising due diligence under Circular 230 must:',
    options: [
      'Personally verify every item reported on a return',
      'Rely on client information unless the practitioner has reason to question it',
      'Obtain all source documents before preparing a return',
      'Independently research all legal issues'
    ],
    correctAnswer: 1,
    explanation: 'Circular 230 §10.34 allows practitioners to rely in good faith on client information without verification unless there is reason to believe it is incorrect or incomplete. Practitioners must make reasonable inquiries.',
    reference: 'Circular 230 §10.34'
  },
  {
    id: 'see3-580',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Practice Rights',
    subtopic: 'EA Privileges',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'Enrolled agents have:',
    options: [
      'Limited practice rights before the IRS',
      'Unlimited practice rights before the IRS in all tax matters',
      'Practice rights only in the state where licensed',
      'Rights to practice before Tax Court only'
    ],
    correctAnswer: 1,
    explanation: 'Enrolled agents have unlimited practice rights before the IRS. They can represent any taxpayer regarding any tax matter before any office of the IRS. This includes audits, collections, and appeals.',
    reference: 'Circular 230 §10.3'
  },
  // SEE3-3: Specific Areas of Representation
  {
    id: 'see3-581',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Appeals',
    subtopic: 'Protest Requirements',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A written protest to IRS Appeals must include:',
    options: [
      'Only the taxpayer\'s name and tax year',
      'Statement of facts, applicable law, and arguments',
      'Payment of 50% of the proposed tax',
      'A court filing fee'
    ],
    correctAnswer: 1,
    explanation: 'A formal written protest must include: taxpayer information, statement of issues, facts supporting position, relevant law and arguments, and a perjury declaration. Required when disputed amounts exceed $25,000.',
    reference: 'Pub. 5'
  },
  {
    id: 'see3-582',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Appeals',
    subtopic: 'Fast Track Settlement',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Fast Track Settlement (FTS) is:',
    options: [
      'A court proceeding for expedited resolution',
      'A program allowing Appeals participation during the examination',
      'Only available for corporations',
      'Required before Tax Court petition'
    ],
    correctAnswer: 1,
    explanation: 'Fast Track Settlement brings an Appeals officer into the examination while it\'s still with the exam function. Available for most issues, it aims to resolve disputes quickly without the traditional appeals process.',
    reference: 'Rev. Proc. 2017-25'
  },
  {
    id: 'see3-583',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Offer in Compromise',
    subtopic: 'OIC Types',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'An Offer in Compromise based on Doubt as to Collectibility evaluates:',
    options: [
      'Whether the tax was correctly assessed',
      'The taxpayer\'s ability to pay the full liability within the statutory period',
      'Criminal liability of the taxpayer',
      'Whether interest charges were correctly calculated'
    ],
    correctAnswer: 1,
    explanation: 'Doubt as to Collectibility OICs are approved when full payment is unlikely within the collection statute. IRS calculates reasonable collection potential (RCP) based on assets and future income. Doubt as to Liability questions whether the tax is correct.',
    reference: 'IRM 5.8.4'
  },
  {
    id: 'see3-584',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Installment Agreements',
    subtopic: 'Streamlined IA',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A streamlined installment agreement is available when the total liability is:',
    options: [
      '$10,000 or less',
      '$50,000 or less for individuals',
      '$100,000 or less',
      '$250,000 or less'
    ],
    correctAnswer: 1,
    explanation: 'Streamlined IAs are available for individual taxpayers with $50,000 or less in combined liability ($100,000 for non-streamlined without financial statement). Must be payable within 72 months and before CSED.',
    reference: 'IRM 5.14.5'
  },
  {
    id: 'see3-585',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Currently Not Collectible',
    subtopic: 'CNC Status',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When an account is placed in Currently Not Collectible (CNC) status:',
    options: [
      'The liability is immediately discharged',
      'The collection statute is suspended',
      'Collection activity stops but the liability remains and the statute continues',
      'Interest stops accruing'
    ],
    correctAnswer: 2,
    explanation: 'CNC status temporarily suspends collection activity but the debt remains. The 10-year collection statute continues to run. IRS can resume collection if financial situation improves. Refunds may still be applied to the balance.',
    reference: 'IRM 5.16.1'
  },
  // SEE3-4: Filing Process
  {
    id: 'see3-586',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-4',
    topic: 'Penalties',
    subtopic: 'Failure to File vs. Failure to Pay',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The failure to file penalty is:',
    options: [
      '0.5% per month, up to 25%',
      '5% per month, up to 25%',
      '1% per month with no maximum',
      '10% flat penalty'
    ],
    correctAnswer: 1,
    explanation: 'Failure to file is 5% per month (or part thereof), up to 25%. If fraud is involved, it\'s 15%/month up to 75%. The penalty is reduced by any failure to pay penalty for the same month. Minimum penalty applies after 60 days.',
    reference: 'IRC §6651(a)(1)'
  },
  {
    id: 'see3-587',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-4',
    topic: 'Penalties',
    subtopic: 'Reasonable Cause',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Which of the following is LEAST likely to constitute reasonable cause for penalty abatement?',
    options: [
      'Death or serious illness of taxpayer or immediate family',
      'Fire or natural disaster destroying records',
      'Reliance on advice of a tax professional (with full disclosure)',
      'Ignorance of the tax law'
    ],
    correctAnswer: 3,
    explanation: 'Generally, ignorance of the law is not reasonable cause. Reasonable cause includes: death/serious illness, unavoidable absence, fire/casualty, erroneous IRS advice, reasonable reliance on professional (with full disclosure and competent advice).',
    reference: 'IRM 20.1.1.3.2'
  },
  {
    id: 'see3-588',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-4',
    topic: 'Interest',
    subtopic: 'Interest Rates',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'IRS interest on underpayments is:',
    options: [
      'A fixed 6% annually',
      'The federal short-term rate plus 3 percentage points, compounded daily',
      'Prime rate plus 2%',
      'Simple interest at 5% annually'
    ],
    correctAnswer: 1,
    explanation: 'Individual underpayment interest is the federal short-term rate plus 3 points, compounded daily. Corporate underpayments over $100,000 add 5 points. Overpayment interest is short-term rate plus 2 points (3 for corporations).',
    reference: 'IRC §6621'
  },
  {
    id: 'see3-589',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-4',
    topic: 'E-File Requirements',
    subtopic: 'ERO Responsibilities',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'An Electronic Return Originator (ERO) must:',
    options: [
      'Only verify the taxpayer\'s identity',
      'Retain records for at least 3 years from the due date or filing date',
      'Send paper copies to the IRS within 30 days',
      'Charge fixed fees regardless of complexity'
    ],
    correctAnswer: 1,
    explanation: 'EROs must: verify taxpayer identity, submit returns timely, retain records for 3 years from due date (or IRS received date if later), and provide copies to taxpayers. They must meet IRS e-file eligibility standards.',
    reference: 'Pub. 1345'
  },
  {
    id: 'see3-590',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-4',
    topic: 'Taxpayer Rights',
    subtopic: 'Taxpayer Bill of Rights',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'The Taxpayer Bill of Rights includes all of the following EXCEPT:',
    options: [
      'The right to be informed',
      'The right to quality service',
      'The right to pay no taxes',
      'The right to appeal IRS decisions'
    ],
    correctAnswer: 2,
    explanation: 'The Taxpayer Bill of Rights includes 10 rights: be informed, quality service, pay no more than correct amount, challenge IRS and be heard, appeal, finality, privacy, confidentiality, retain representation, and fair/just tax system.',
    reference: 'IRC §7803(a)(3)'
  },
  {
    id: 'see3-591',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Levies and Liens',
    subtopic: 'Federal Tax Lien',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A federal tax lien arises:',
    options: [
      'When the IRS files Form 668(Y)',
      'Automatically when assessment is made, demand is issued, and taxpayer fails to pay',
      'Only after a court judgment',
      'When the taxpayer files bankruptcy'
    ],
    correctAnswer: 1,
    explanation: 'The lien arises by operation of law (IRC §6321) upon: (1) assessment, (2) demand, and (3) failure to pay. Filing the Notice of Federal Tax Lien (Form 668) protects the government\'s priority against third parties.',
    reference: 'IRC §6321, §6322'
  },
  {
    id: 'see3-592',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Levies',
    subtopic: 'Levy Exemptions',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Which of the following is exempt from levy?',
    options: [
      'Bank accounts',
      'Wages above a specified exempt amount',
      'Business inventory',
      'Investment accounts'
    ],
    correctAnswer: 1,
    explanation: 'Certain property is exempt from levy: wearing apparel and school books, fuel/provisions/furniture/personal effects up to $11,820, books/tools of trade up to $5,910, unemployment benefits, workers\' comp, certain pension payments, and wages up to the exempt amount.',
    reference: 'IRC §6334'
  },
  {
    id: 'see3-593',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Circular 230',
    subtopic: 'Sanctions',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The Office of Professional Responsibility can impose which sanction for Circular 230 violations?',
    options: [
      'Criminal prosecution',
      'Censure, suspension, or disbarment from practice',
      'State license revocation',
      'Civil tax penalties'
    ],
    correctAnswer: 1,
    explanation: 'OPR can impose: censure (public reprimand), suspension from practice, or disbarment. Monetary penalties up to the statutory maximum can also be imposed. Criminal matters are referred to DOJ; state licenses are state matters.',
    reference: 'Circular 230 §10.50'
  },
  {
    id: 'see3-594',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'Circular 230',
    subtopic: 'Return of Client Records',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under Circular 230, a practitioner must return a client\'s records:',
    options: [
      'Only after all fees are paid',
      'Promptly upon request, regardless of fee disputes',
      'Within 90 days of termination',
      'Only if the client signs a release'
    ],
    correctAnswer: 1,
    explanation: 'Circular 230 §10.28 requires prompt return of client records upon request. The practitioner may retain copies. Fee disputes do not justify withholding client records needed for tax matters.',
    reference: 'Circular 230 §10.28'
  },
  {
    id: 'see3-595',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Tax Court',
    subtopic: 'Deficiency Procedures',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A taxpayer must receive a statutory notice of deficiency (90-day letter) before the IRS can:',
    options: [
      'Conduct an audit',
      'Assess income tax deficiencies',
      'Issue a notice of levy',
      'File a federal tax lien'
    ],
    correctAnswer: 1,
    explanation: 'The statutory notice of deficiency (IRC §6212) is required before assessment of income, estate, gift, and certain excise tax deficiencies. It gives the taxpayer 90 days (150 if outside U.S.) to petition Tax Court.',
    reference: 'IRC §6212, §6213'
  },
  {
    id: 'see3-596',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Tax Court',
    subtopic: 'Small Tax Case Procedure',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The Tax Court small tax case procedure is available when the disputed amount is:',
    options: [
      '$25,000 or less per year',
      '$50,000 or less per year',
      '$75,000 or less per year',
      '$100,000 or less per year'
    ],
    correctAnswer: 1,
    explanation: 'Small tax case (S case) procedure is available if disputed amount per year is $50,000 or less. Proceedings are informal, no briefs required, and the decision is final (not appealable). Taxpayer must elect this procedure.',
    reference: 'IRC §7463'
  },
  {
    id: 'see3-597',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Refund Claims',
    subtopic: 'Suit for Refund',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'To sue for refund in federal district court or Court of Federal Claims, a taxpayer must first:',
    options: [
      'Petition the Tax Court',
      'Pay the full tax and file an administrative claim for refund',
      'Request a CDP hearing',
      'Obtain approval from the IRS Commissioner'
    ],
    correctAnswer: 1,
    explanation: 'District court and Court of Federal Claims are refund fora; taxpayer must pay the tax, file a refund claim, wait 6 months or receive denial, then sue. Tax Court is a prepayment forum with different requirements.',
    reference: 'IRC §7422'
  },
  {
    id: 'see3-598',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-4',
    topic: 'Preparer Penalties',
    subtopic: 'Unreasonable Position',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A preparer penalty under IRC §6694(a) applies when:',
    options: [
      'Any error is made on a return',
      'A position is taken without substantial authority (or reasonable basis with disclosure)',
      'The preparer disagrees with the IRS',
      'The refund is less than expected'
    ],
    correctAnswer: 1,
    explanation: 'The §6694(a) penalty applies to unreasonable positions: positions without substantial authority (or reasonable basis if properly disclosed), or tax shelter positions without reasonable belief of more likely than not success. Penalty is the greater of $1,000 or 50% of income derived.',
    reference: 'IRC §6694(a)'
  },
  {
    id: 'see3-599',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-4',
    topic: 'Preparer Penalties',
    subtopic: 'Willful or Reckless Conduct',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The §6694(b) penalty for willful or reckless conduct is:',
    options: [
      '$500 per return',
      'The greater of $5,000 or 75% of income derived',
      '$1,000 per return',
      '10% of the tax liability'
    ],
    correctAnswer: 1,
    explanation: 'The §6694(b) penalty for willful understatement or reckless/intentional disregard of rules is the greater of $5,000 or 75% of income derived. This is more severe than the §6694(a) penalty ($1,000/50%).',
    reference: 'IRC §6694(b)'
  },
  {
    id: 'see3-600',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-1',
    topic: 'Collection Statute',
    subtopic: 'CSED',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The Collection Statute Expiration Date (CSED) is generally:',
    options: [
      '3 years from assessment',
      '6 years from assessment',
      '10 years from assessment',
      '20 years from assessment'
    ],
    correctAnswer: 2,
    explanation: 'The CSED is 10 years from assessment (IRC §6502). It can be extended by waiver, OIC, installment agreement while pending, bankruptcy, or CDP hearing request. The time is tolled (suspended) during these events.',
    reference: 'IRC §6502'
  }
];
