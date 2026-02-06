/**
 * EA SEE Part 2: Businesses - Questions Batch 47 (Q461-470)
 * Information Returns and Reporting Requirements
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH47: Question[] = [
  // ==========================================
  // SEE2-2: Information Returns
  // ==========================================
  {
    id: 'see2-461',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Information Returns',
    subtopic: 'Form 1099-NEC',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 1099-NEC is used to report:',
    options: [
      'Interest income',
      'Nonemployee compensation of $600 or more',
      'Dividend income',
      'Rental income'
    ],
    correctAnswer: 1,
    explanation: 'Form 1099-NEC reports nonemployee compensation of $600 or more paid to independent contractors, freelancers, and self-employed individuals during the tax year.',
    reference: 'IRC §6041A; IRS Form 1099-NEC Instructions',
  },
  {
    id: 'see2-462',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Information Returns',
    subtopic: 'Form 1099-MISC',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 1099-MISC is used to report:',
    options: [
      'All payments to contractors',
      'Rents, royalties, prizes, and other miscellaneous income of $600 or more',
      'Employee wages',
      'Partnership distributions'
    ],
    correctAnswer: 1,
    explanation: 'Form 1099-MISC reports rents ($600+), royalties ($10+), prizes, awards, other income payments, and amounts for attorneys. Nonemployee compensation moved to 1099-NEC.',
    reference: 'IRS Form 1099-MISC Instructions',
  },
  {
    id: 'see2-463',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Information Returns',
    subtopic: '1099-NEC Due Date',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 1099-NEC must be filed with the IRS and furnished to recipients by:',
    options: [
      'February 28',
      'January 31',
      'March 31',
      'April 15'
    ],
    correctAnswer: 1,
    explanation: 'Form 1099-NEC must be furnished to recipients AND filed with the IRS by January 31. There is no automatic extension for filing 1099-NEC.',
    reference: 'IRC §6041A',
  },
  {
    id: 'see2-464',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Information Returns',
    subtopic: 'Backup Withholding',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A payer must withhold backup withholding at 24% if:',
    options: [
      'The payment exceeds $10,000',
      'The payee has not provided a correct TIN or is subject to backup withholding notice',
      'The payee is an employee',
      'The payment is for rent'
    ],
    correctAnswer: 1,
    explanation: 'Backup withholding (24%) applies when the payee fails to provide TIN, provides incorrect TIN, or IRS notifies payer of underreported income requiring backup withholding.',
    reference: 'IRC §3406',
  },
  {
    id: 'see2-465',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Information Returns',
    subtopic: 'Form W-9',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Form W-9 is used by payees to:',
    options: [
      'Report income',
      'Provide their TIN and certify backup withholding status to payers',
      'Request a refund',
      'Register a new business'
    ],
    correctAnswer: 1,
    explanation: 'Form W-9 is used to provide the payer with the payee\'s name, address, TIN, and certification regarding backup withholding status before payments subject to information reporting.',
    reference: 'IRS Form W-9 Instructions',
  },
  {
    id: 'see2-466',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Information Returns',
    subtopic: 'Form 1099-K',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 1099-K reports:',
    options: [
      'Employee wages',
      'Payments from payment card transactions and third-party network transactions',
      'Interest income',
      'Retirement distributions'
    ],
    correctAnswer: 1,
    explanation: 'Form 1099-K reports payments processed by payment settlement entities (credit/debit card transactions, PayPal, Venmo, etc.) above the threshold ($600 for 2024 per transition rule).',
    reference: 'IRC §6050W',
  },
  {
    id: 'see2-467',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Information Returns',
    subtopic: 'Failure to File Penalty',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The penalty for failing to file correct information returns by the due date is:',
    options: [
      'A flat $100 per return',
      '$60 to $310 per return depending on how late, with maximum per year',
      '10% of unreported amounts',
      'No penalty if corrected within 1 year'
    ],
    correctAnswer: 1,
    explanation: 'Penalties range from $60 (corrected within 30 days) to $310 per return (after August 1 or not filed), with annual maximums based on small business status.',
    reference: 'IRC §6721',
  },
  {
    id: 'see2-468',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Information Returns',
    subtopic: 'Failure to Furnish',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The penalty for failure to furnish correct payee statements is:',
    options: [
      '$50 flat',
      '$60 to $310 per statement depending on lateness',
      '5% of unreported income',
      'No penalty exists'
    ],
    correctAnswer: 1,
    explanation: 'Penalties for failure to furnish correct payee statements mirror the filing penalties: $60 if corrected within 30 days, up to $310 if not corrected or furnished.',
    reference: 'IRC §6722',
  },
  {
    id: 'see2-469',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Information Returns',
    subtopic: 'Form 8300',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 8300 must be filed when a business receives:',
    options: [
      'Any cash payment',
      'More than $10,000 in cash in one transaction or related transactions',
      'Payments by check over $10,000',
      'Credit card payments over $10,000'
    ],
    correctAnswer: 1,
    explanation: 'Form 8300 must be filed within 15 days when a business receives more than $10,000 in cash (including cashier\'s checks under certain conditions) in one transaction or related transactions.',
    reference: 'IRC §6050I',
  },
  {
    id: 'see2-470',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Information Returns',
    subtopic: 'FinCEN BOI Report',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Beginning in 2024, most companies must file a Beneficial Ownership Information (BOI) report with:',
    options: [
      'The IRS',
      'FinCEN (Financial Crimes Enforcement Network)',
      'The SEC',
      'State Secretary of State'
    ],
    correctAnswer: 1,
    explanation: 'Under the Corporate Transparency Act, most companies must file BOI reports with FinCEN disclosing beneficial owners (25%+ ownership or substantial control). New entities must file within 30/90 days of formation.',
    reference: 'Corporate Transparency Act; 31 CFR 1010',
  },
];
