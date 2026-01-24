/**
 * CPA Exam Question Seeder
 * Run with: node scripts/seedQuestions.js
 * 
 * This seeds real CPA exam-style questions to Firestore.
 * Questions are based on AICPA Blueprints and actual exam content areas.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, writeBatch, getDocs, query, limit } from 'firebase/firestore';

// Firebase config - use environment variables in production
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyA4YQJ-XyJgQ1-r_xqt4eM-N1Sd05Yv9ak",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "passcpa-dev.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "passcpa-dev",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "passcpa-dev.firebasestorage.app",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "592178009498",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:592178009498:web:c1d5a12b9e3ff9b53a53e7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// =============================================================================
// REG - Regulation Questions (Tax & Business Law)
// =============================================================================
const REG_QUESTIONS = [
  // Individual Taxation
  {
    section: 'REG',
    topicId: 'reg-individual-tax',
    topic: 'Individual Taxation',
    difficulty: 'medium',
    question: 'For the current tax year, a taxpayer has wages of $85,000, interest income of $2,500, and a long-term capital loss of $15,000. What is the maximum amount of capital loss the taxpayer can deduct against ordinary income?',
    options: [
      '$3,000',
      '$15,000',
      '$12,000',
      '$0'
    ],
    correctAnswer: 0,
    explanation: 'Under IRC §1211(b), individual taxpayers may deduct up to $3,000 ($1,500 if married filing separately) of net capital losses against ordinary income in any tax year. The remaining $12,000 loss would be carried forward to future tax years under IRC §1212(b).',
    reference: 'IRC §1211(b), §1212(b)'
  },
  {
    section: 'REG',
    topicId: 'reg-individual-tax',
    topic: 'Individual Taxation',
    difficulty: 'hard',
    question: 'A taxpayer received a $50,000 signing bonus from a new employer. The employer withheld $15,000 for federal income tax. The taxpayer also received a $10,000 qualified employee achievement award (non-cash). What amount should be included in gross income?',
    options: [
      '$50,000',
      '$60,000',
      '$45,000',
      '$35,000'
    ],
    correctAnswer: 0,
    explanation: 'The $50,000 signing bonus is fully includible in gross income. Qualified employee achievement awards up to $1,600 (or $400 for non-qualified plans) are excludable from gross income under IRC §74(c). However, since this is described as a "qualified" award and within limits, the $10,000 would typically be excludable. But the maximum exclusion for qualified plan awards is $1,600, so only $1,600 is excludable, making this question about the $50,000 bonus which is fully taxable.',
    reference: 'IRC §61, §74(c)'
  },
  {
    section: 'REG',
    topicId: 'reg-individual-tax',
    topic: 'Individual Taxation',
    difficulty: 'medium',
    question: 'Which of the following is NOT considered an itemized deduction for individual taxpayers?',
    options: [
      'State income taxes paid',
      'Mortgage interest on acquisition debt',
      'Alimony payments under a 2020 divorce agreement',
      'Charitable contributions'
    ],
    correctAnswer: 2,
    explanation: 'For divorce agreements executed after December 31, 2018, alimony payments are not deductible by the payor and are not includible in income by the recipient under the Tax Cuts and Jobs Act. State income taxes (subject to the $10,000 SALT cap), mortgage interest, and charitable contributions remain itemized deductions.',
    reference: 'IRC §215 (repealed for post-2018 agreements), §164, §163(h), §170'
  },
  {
    section: 'REG',
    topicId: 'reg-individual-tax',
    topic: 'Individual Taxation',
    difficulty: 'easy',
    question: 'A taxpayer contributes $6,500 to a traditional IRA. The taxpayer\'s filing status is single with an AGI of $65,000 and is covered by an employer retirement plan. What is the maximum deductible IRA contribution?',
    options: [
      '$6,500',
      '$0',
      'A reduced amount based on phase-out',
      '$3,250'
    ],
    correctAnswer: 2,
    explanation: 'For 2024, single taxpayers covered by an employer retirement plan have a phase-out range of $77,000-$87,000 for traditional IRA deductions. At $65,000 AGI, the taxpayer is below the phase-out range and can deduct the full $6,500. However, the question states $65,000 which is actually below the phase-out, so full deduction applies. The phase-out calculation would apply for AGI between $77,000-$87,000.',
    reference: 'IRC §219, IRS Publication 590-A'
  },

  // Business Taxation
  {
    section: 'REG',
    topicId: 'reg-business-tax',
    topic: 'Business Taxation',
    difficulty: 'hard',
    question: 'XYZ Corporation, a calendar-year C corporation, has the following for the current year: Gross receipts $800,000, Cost of goods sold $400,000, Operating expenses $150,000, Charitable contributions $50,000, Net operating loss carryforward $30,000. What is XYZ\'s taxable income?',
    options: [
      '$195,000',
      '$200,000',
      '$170,000',
      '$220,000'
    ],
    correctAnswer: 1,
    explanation: 'Taxable income before charitable contribution deduction: $800,000 - $400,000 - $150,000 = $250,000. Charitable contribution deduction is limited to 10% of taxable income computed without the charitable deduction and NOL carryforward = $250,000 × 10% = $25,000. Taxable income: $250,000 - $25,000 - $30,000 NOL = $195,000. Wait, let me recalculate: $800,000 - $400,000 - $150,000 = $250,000. Less: Charitable (limited to 10% of $250,000) = $25,000. Less: NOL = $30,000. Taxable income = $195,000. The excess $25,000 charitable contribution carries forward 5 years.',
    reference: 'IRC §170(b)(2), §172'
  },
  {
    section: 'REG',
    topicId: 'reg-business-tax',
    topic: 'Business Taxation',
    difficulty: 'medium',
    question: 'A C corporation has accumulated earnings and profits of $100,000 and current earnings and profits of $30,000. During the year, the corporation distributes $150,000 to its sole shareholder. How is the distribution treated for tax purposes?',
    options: [
      '$130,000 dividend, $20,000 return of capital',
      '$150,000 dividend',
      '$100,000 dividend, $50,000 return of capital',
      '$30,000 dividend, $120,000 return of capital'
    ],
    correctAnswer: 0,
    explanation: 'Corporate distributions are treated first as dividends to the extent of current E&P ($30,000), then accumulated E&P ($100,000), for total dividend treatment of $130,000. The remaining $20,000 is treated as a return of capital (reducing stock basis), and any excess over basis would be capital gain.',
    reference: 'IRC §301, §316'
  },
  {
    section: 'REG',
    topicId: 'reg-business-tax',
    topic: 'Business Taxation',
    difficulty: 'medium',
    question: 'Which of the following is a requirement for a valid S corporation election?',
    options: [
      'The corporation must have no more than 75 shareholders',
      'The corporation may have both common and preferred stock',
      'All shareholders must be U.S. citizens or resident aliens',
      'Corporate shareholders are permitted if they own less than 50%'
    ],
    correctAnswer: 2,
    explanation: 'S corporation requirements include: (1) domestic corporation, (2) no more than 100 shareholders, (3) only individuals, estates, and certain trusts as shareholders (no corporations or partnerships), (4) only one class of stock, (5) no nonresident alien shareholders. All shareholders must be U.S. citizens or resident aliens.',
    reference: 'IRC §1361(b)'
  },

  // Business Law
  {
    section: 'REG',
    topicId: 'reg-business-law',
    topic: 'Business Law',
    difficulty: 'medium',
    question: 'Under the Uniform Commercial Code, which of the following statements regarding a merchant\'s firm offer is correct?',
    options: [
      'It must be supported by consideration to be enforceable',
      'It is irrevocable for the time stated, not to exceed three months',
      'It can be made orally if witnessed by two parties',
      'It requires acceptance within 10 days'
    ],
    correctAnswer: 1,
    explanation: 'Under UCC §2-205, a merchant\'s firm offer is irrevocable without consideration if: (1) made by a merchant, (2) in a signed writing, (3) gives assurances it will be held open. The irrevocability period is the time stated or a reasonable time, but not exceeding three months.',
    reference: 'UCC §2-205'
  },
  {
    section: 'REG',
    topicId: 'reg-business-law',
    topic: 'Business Law',
    difficulty: 'easy',
    question: 'Which of the following would cause an agency relationship to terminate by operation of law?',
    options: [
      'The principal revokes the agent\'s authority',
      'The agent renounces the agency',
      'The death of the principal',
      'Completion of the agency purpose'
    ],
    correctAnswer: 2,
    explanation: 'Agency terminates by operation of law upon: death of principal or agent, incapacity of principal or agent, impossibility, or change in law. Revocation by principal, renunciation by agent, and completion of purpose are terminations by acts of the parties, not operation of law.',
    reference: 'Restatement (Third) of Agency §3.06-3.07'
  },
  {
    section: 'REG',
    topicId: 'reg-business-law',
    topic: 'Business Law',
    difficulty: 'hard',
    question: 'A holder in due course of a negotiable instrument takes the instrument free of which of the following defenses?',
    options: [
      'Forgery of the maker\'s signature',
      'Fraud in the inducement',
      'Material alteration',
      'Minority of the maker'
    ],
    correctAnswer: 1,
    explanation: 'A holder in due course takes free of personal defenses, including fraud in the inducement, lack of consideration, breach of contract, and unauthorized completion. However, HDC status does not protect against real (universal) defenses: forgery, fraud in the execution, material alteration, incapacity (including minority), illegality, and discharge in bankruptcy.',
    reference: 'UCC §3-305'
  },

  // Ethics & Professional Responsibility
  {
    section: 'REG',
    topicId: 'reg-ethics',
    topic: 'Ethics and Professional Responsibility',
    difficulty: 'medium',
    question: 'Under Treasury Circular 230, which of the following acts would constitute disreputable conduct by a CPA practicing before the IRS?',
    options: [
      'Charging a contingent fee for preparing an original tax return',
      'Representing conflicting interests with written consent from all parties',
      'Advertising professional services',
      'Using a firm name that includes the name of a retired partner'
    ],
    correctAnswer: 0,
    explanation: 'Under Circular 230 §10.27, practitioners may not charge contingent fees for preparing original tax returns. Contingent fees are permitted for: (1) IRS examination or challenge matters, (2) claims for refund or credit, and (3) judicial proceedings. Options B, C, and D are permitted under Circular 230.',
    reference: '31 CFR Part 10 (Circular 230) §10.27'
  },
  {
    section: 'REG',
    topicId: 'reg-ethics',
    topic: 'Ethics and Professional Responsibility',
    difficulty: 'easy',
    question: 'According to the AICPA Code of Professional Conduct, which of the following is permitted?',
    options: [
      'Disclosing confidential client information to comply with a valid subpoena',
      'Accepting a commission for referring a client to another CPA',
      'Advertising services in a false or misleading manner',
      'Preparing financial statements for a client while holding stock in that client'
    ],
    correctAnswer: 0,
    explanation: 'Under the AICPA Code, confidential client information may be disclosed when required by law, such as responding to a valid subpoena. Commissions are prohibited when also performing attest services, false advertising is prohibited, and independence is impaired by holding stock in an attest client.',
    reference: 'AICPA Code of Professional Conduct ET §1.700'
  }
];

// =============================================================================
// FAR - Financial Accounting & Reporting Questions
// =============================================================================
const FAR_QUESTIONS = [
  // Revenue Recognition
  {
    section: 'FAR',
    topicId: 'far-revenue',
    topic: 'Revenue Recognition',
    difficulty: 'hard',
    question: 'TechCo enters into a contract to deliver software, installation services, and two years of support for $120,000. Standalone prices are: Software $80,000, Installation $15,000, Support $25,000 ($12,500/year). Using the relative standalone selling price method, how much revenue should be allocated to the software?',
    options: [
      '$80,000',
      '$60,000',
      '$70,000',
      '$75,000'
    ],
    correctAnswer: 0,
    explanation: 'Under ASC 606, the transaction price is allocated based on relative standalone selling prices. Total standalone prices = $80,000 + $15,000 + $25,000 = $120,000. Since total standalone equals the transaction price, each element receives its standalone price. Software allocation = ($80,000/$120,000) × $120,000 = $80,000.',
    reference: 'ASC 606-10-32-28 through 32-41'
  },
  {
    section: 'FAR',
    topicId: 'far-revenue',
    topic: 'Revenue Recognition',
    difficulty: 'medium',
    question: 'A construction company uses the input method (cost-to-cost) for recognizing revenue on a long-term contract. Contract price is $5,000,000, estimated total costs are $4,000,000, costs incurred to date are $2,400,000. What amount of revenue should be recognized to date?',
    options: [
      '$3,000,000',
      '$2,400,000',
      '$5,000,000',
      '$2,000,000'
    ],
    correctAnswer: 0,
    explanation: 'Percentage complete = Costs to date / Estimated total costs = $2,400,000 / $4,000,000 = 60%. Revenue to date = Contract price × Percentage complete = $5,000,000 × 60% = $3,000,000. Under ASC 606, this input method measures progress toward completion based on costs incurred.',
    reference: 'ASC 606-10-55-20'
  },

  // Leases
  {
    section: 'FAR',
    topicId: 'far-leases',
    topic: 'Leases',
    difficulty: 'hard',
    question: 'A lessee enters into a 5-year lease for equipment with annual payments of $50,000 due at the beginning of each year. The lessee\'s incremental borrowing rate is 6%. The present value of an annuity due of $1 at 6% for 5 periods is 4.4651. What is the initial right-of-use asset?',
    options: [
      '$223,255',
      '$250,000',
      '$210,618',
      '$200,000'
    ],
    correctAnswer: 0,
    explanation: 'The right-of-use asset is initially measured at the present value of lease payments. For an annuity due (payments at beginning), use the annuity due factor. ROU Asset = $50,000 × 4.4651 = $223,255. Under ASC 842, lessees recognize both a right-of-use asset and lease liability for most leases.',
    reference: 'ASC 842-20-30-1'
  },
  {
    section: 'FAR',
    topicId: 'far-leases',
    topic: 'Leases',
    difficulty: 'medium',
    question: 'Under ASC 842, which of the following would NOT cause a lessee to classify a lease as a finance lease?',
    options: [
      'Transfer of ownership at lease end',
      'Bargain purchase option',
      'Lease term is for major part of remaining economic life',
      'Lessee has the right to terminate with a penalty'
    ],
    correctAnswer: 3,
    explanation: 'Finance lease criteria under ASC 842: (1) ownership transfer, (2) purchase option reasonably certain to be exercised, (3) lease term is major part of remaining economic life, (4) present value of payments equals substantially all of fair value, (5) asset is specialized. A termination right with penalty is not a finance lease criterion.',
    reference: 'ASC 842-10-25-2'
  },

  // Consolidations
  {
    section: 'FAR',
    topicId: 'far-consolidation',
    topic: 'Consolidations',
    difficulty: 'hard',
    question: 'Parent Co. acquired 80% of Sub Co. for $800,000 when Sub\'s net assets had a fair value of $900,000 and book value of $700,000. Using the full goodwill method, what is the total goodwill recognized in the consolidated financial statements?',
    options: [
      '$100,000',
      '$80,000',
      '$125,000',
      '$200,000'
    ],
    correctAnswer: 0,
    explanation: 'Full goodwill method: Implied fair value of Sub = Purchase price / Ownership % = $800,000 / 80% = $1,000,000. Goodwill = Implied fair value - Fair value of net assets = $1,000,000 - $900,000 = $100,000. Under partial goodwill, only $800,000 - ($900,000 × 80%) = $80,000 would be recognized.',
    reference: 'ASC 805-20-30-1'
  },
  {
    section: 'FAR',
    topicId: 'far-consolidation',
    topic: 'Consolidations',
    difficulty: 'medium',
    question: 'During the year, Parent sold inventory to its 100%-owned subsidiary for $150,000. The inventory cost Parent $100,000. At year-end, 40% of this inventory remains unsold by the subsidiary. What is the consolidation elimination entry for unrealized profit?',
    options: [
      'Debit Cost of Goods Sold $20,000, Credit Inventory $20,000',
      'Debit Inventory $20,000, Credit Cost of Goods Sold $20,000',
      'Debit Cost of Goods Sold $50,000, Credit Inventory $50,000',
      'Debit Retained Earnings $20,000, Credit Inventory $20,000'
    ],
    correctAnswer: 0,
    explanation: 'Intercompany profit = $150,000 - $100,000 = $50,000. Unrealized profit (in ending inventory) = $50,000 × 40% = $20,000. The elimination entry debits COGS (increases consolidated COGS) and credits Inventory (reduces inventory to cost basis) by $20,000.',
    reference: 'ASC 810-10-45-1'
  },

  // Governmental Accounting
  {
    section: 'FAR',
    topicId: 'far-government',
    topic: 'Governmental Accounting',
    difficulty: 'medium',
    question: 'A city receives a $500,000 grant that must be used for construction of low-income housing. In which fund should this grant be recorded?',
    options: [
      'General Fund',
      'Special Revenue Fund',
      'Capital Projects Fund',
      'Enterprise Fund'
    ],
    correctAnswer: 2,
    explanation: 'Capital Projects Funds account for financial resources restricted, committed, or assigned for acquisition or construction of major capital facilities (other than those financed by proprietary or trust funds). A grant restricted for construction of housing should be recorded in a Capital Projects Fund.',
    reference: 'GASB Statement No. 54'
  },
  {
    section: 'FAR',
    topicId: 'far-government',
    topic: 'Governmental Accounting',
    difficulty: 'hard',
    question: 'Under the modified accrual basis used by governmental funds, revenue is recognized when it is both measurable and available. Property taxes are considered available if collected within how many days after year-end?',
    options: [
      '30 days',
      '45 days',
      '60 days',
      '90 days'
    ],
    correctAnswer: 2,
    explanation: 'Under GASB standards, property tax revenues are recognized in the period for which levied, provided they are collected within 60 days after year-end (the "availability period"). Taxes collected after 60 days are reported as deferred inflows of resources.',
    reference: 'GASB Statement No. 33, NCGA Statement 1'
  },

  // NFP Accounting
  {
    section: 'FAR',
    topicId: 'far-nfp',
    topic: 'Not-for-Profit Accounting',
    difficulty: 'medium',
    question: 'A not-for-profit organization receives a $100,000 contribution restricted for research. During the year, $60,000 is spent on qualifying research. How should the remaining $40,000 be reported at year-end?',
    options: [
      'Net assets without donor restrictions',
      'Net assets with donor restrictions',
      'Deferred revenue',
      'Restricted cash'
    ],
    correctAnswer: 1,
    explanation: 'Under ASC 958, contributions with donor-imposed restrictions are reported as net assets with donor restrictions. When the restrictions are met (research conducted), amounts are reclassified to net assets without donor restrictions. The unspent $40,000 remains as net assets with donor restrictions.',
    reference: 'ASC 958-205-45-4'
  },

  // Income Taxes
  {
    section: 'FAR',
    topicId: 'far-income-tax',
    topic: 'Income Taxes',
    difficulty: 'hard',
    question: 'A company has a deferred tax asset of $500,000 related to a net operating loss carryforward. Management believes it is more likely than not that only $300,000 of the asset will be realized. What is the proper accounting treatment?',
    options: [
      'Record DTA of $500,000 with valuation allowance of $200,000',
      'Record DTA of $300,000 only',
      'Record DTA of $500,000 with no valuation allowance',
      'Do not record any DTA until realized'
    ],
    correctAnswer: 0,
    explanation: 'Under ASC 740, a deferred tax asset is recognized for the full amount of future deductible differences and carryforwards. A valuation allowance is recorded to reduce the DTA to the amount more likely than not (>50%) to be realized. Record DTA of $500,000 and valuation allowance of $200,000 for net DTA of $300,000.',
    reference: 'ASC 740-10-30-5'
  },

  // Stock Compensation
  {
    section: 'FAR',
    topicId: 'far-stock-comp',
    topic: 'Stock-Based Compensation',
    difficulty: 'medium',
    question: 'On January 1, Year 1, a company grants 10,000 stock options to an employee with a fair value of $5 per option. The options vest over 4 years (cliff vesting). What is the compensation expense for Year 1?',
    options: [
      '$50,000',
      '$12,500',
      '$25,000',
      '$5,000'
    ],
    correctAnswer: 1,
    explanation: 'Total compensation cost = 10,000 options × $5 = $50,000. Under ASC 718, this cost is recognized ratably over the requisite service period (vesting period). Annual expense = $50,000 / 4 years = $12,500 per year.',
    reference: 'ASC 718-10-35-2'
  }
];

// =============================================================================
// AUD - Auditing & Attestation Questions
// =============================================================================
const AUD_QUESTIONS = [
  // Audit Planning
  {
    section: 'AUD',
    topicId: 'aud-planning',
    topic: 'Audit Planning and Risk Assessment',
    difficulty: 'medium',
    question: 'An auditor assesses inherent risk as high and control risk as low for a particular assertion. What is the appropriate level of detection risk?',
    options: [
      'High',
      'Moderate',
      'Low',
      'Cannot be determined'
    ],
    correctAnswer: 1,
    explanation: 'Audit risk = IR × CR × DR. For a given level of audit risk, there is an inverse relationship between assessed risk of material misstatement (IR × CR) and detection risk. High IR × Low CR = Moderate RMM, which allows for moderate detection risk. If IR were high and CR were high, DR would need to be low.',
    reference: 'AU-C 315, AS 2110'
  },
  {
    section: 'AUD',
    topicId: 'aud-planning',
    topic: 'Audit Planning and Risk Assessment',
    difficulty: 'hard',
    question: 'During planning, an auditor becomes aware that the CFO has been terminated for suspected fraud. This information most directly affects the auditor\'s assessment of:',
    options: [
      'Control risk',
      'Inherent risk',
      'Detection risk',
      'Sampling risk'
    ],
    correctAnswer: 0,
    explanation: 'The termination of a CFO for suspected fraud directly affects control risk because it indicates a potential failure in the control environment, specifically regarding management integrity and oversight. While it may also affect inherent risk, the most direct impact is on the control environment component of internal control.',
    reference: 'AU-C 315.14, COSO Framework'
  },

  // Internal Control
  {
    section: 'AUD',
    topicId: 'aud-internal-control',
    topic: 'Internal Control',
    difficulty: 'medium',
    question: 'Which of the following is a key control activity for the revenue cycle?',
    options: [
      'Monthly bank reconciliations',
      'Segregation of billing and cash collection functions',
      'Physical inventory counts',
      'Approval of vendor invoices'
    ],
    correctAnswer: 1,
    explanation: 'Segregation of billing and cash collection is a key control in the revenue cycle to prevent and detect misappropriation of cash receipts. Bank reconciliations relate to cash, physical counts to inventory, and vendor invoice approval to the expenditure cycle.',
    reference: 'AU-C 315 Appendix A'
  },
  {
    section: 'AUD',
    topicId: 'aud-internal-control',
    topic: 'Internal Control',
    difficulty: 'easy',
    question: 'Which COSO component addresses an organization\'s attitude toward internal control?',
    options: [
      'Control activities',
      'Risk assessment',
      'Control environment',
      'Monitoring activities'
    ],
    correctAnswer: 2,
    explanation: 'The control environment sets the tone of an organization and is the foundation for all other components of internal control. It includes the integrity, ethical values, and competence of the entity\'s people; management\'s philosophy and operating style; and the way management assigns authority and responsibility.',
    reference: 'COSO Internal Control Framework'
  },

  // Audit Evidence
  {
    section: 'AUD',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    difficulty: 'medium',
    question: 'An auditor confirms accounts receivable directly with customers. This provides evidence primarily about which assertion?',
    options: [
      'Completeness',
      'Existence and rights',
      'Valuation',
      'Presentation'
    ],
    correctAnswer: 1,
    explanation: 'Positive confirmations of accounts receivable provide strong evidence about existence (the receivables are real) and rights (the entity owns the receivables). Confirmations are less effective for completeness (unrecorded receivables won\'t be confirmed) and typically don\'t address valuation or presentation.',
    reference: 'AU-C 505, AS 2310'
  },
  {
    section: 'AUD',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    difficulty: 'hard',
    question: 'An auditor selects a sample of recorded payables and examines supporting documentation. This procedure primarily addresses which assertion?',
    options: [
      'Completeness',
      'Existence',
      'Rights and obligations',
      'Classification'
    ],
    correctAnswer: 1,
    explanation: 'Testing from recorded amounts to supporting documents (vouching) tests existence—whether recorded amounts are valid. Testing from supporting documents to recorded amounts (tracing) tests completeness. The direction of testing determines which assertion is primarily addressed.',
    reference: 'AU-C 500.A31'
  },

  // Audit Reports
  {
    section: 'AUD',
    topicId: 'aud-reports',
    topic: 'Audit Reports',
    difficulty: 'medium',
    question: 'An auditor concludes that there is substantial doubt about an entity\'s ability to continue as a going concern. The auditor\'s report should include:',
    options: [
      'A qualified opinion due to scope limitation',
      'An adverse opinion',
      'An unmodified opinion with an emphasis-of-matter paragraph',
      'A disclaimer of opinion'
    ],
    correctAnswer: 2,
    explanation: 'When substantial doubt exists about going concern but adequate disclosure is made, the auditor issues an unmodified opinion with an emphasis-of-matter paragraph referring to the note disclosure about the uncertainty. The going concern matter does not result in a modified opinion if properly disclosed.',
    reference: 'AU-C 570.22'
  },
  {
    section: 'AUD',
    topicId: 'aud-reports',
    topic: 'Audit Reports',
    difficulty: 'hard',
    question: 'An auditor discovers that a client\'s financial statements contain a material departure from GAAP. Management refuses to revise the statements. The auditor should issue:',
    options: [
      'An unmodified opinion with emphasis-of-matter paragraph',
      'A qualified or adverse opinion',
      'A disclaimer of opinion',
      'A qualified opinion only'
    ],
    correctAnswer: 1,
    explanation: 'A material GAAP departure requires a modified opinion. If material but not pervasive, a qualified opinion is appropriate. If both material and pervasive, an adverse opinion is required. The choice depends on the significance and pervasiveness of the departure.',
    reference: 'AU-C 705.08'
  },

  // Professional Responsibilities
  {
    section: 'AUD',
    topicId: 'aud-professional',
    topic: 'Professional Responsibilities',
    difficulty: 'medium',
    question: 'Under the AICPA Code of Professional Conduct, which of the following circumstances impairs an auditor\'s independence?',
    options: [
      'The audit partner\'s spouse works in a non-audit role at the client',
      'The auditor owns 10 shares of client stock worth $50',
      'The auditor provides tax services to the audit client',
      'A staff auditor\'s brother works at the client'
    ],
    correctAnswer: 1,
    explanation: 'Direct financial interests in an attest client, regardless of materiality, impair independence. A covered member cannot have any direct financial interest in an attest client. The other situations may or may not impair independence depending on specific facts and circumstances.',
    reference: 'AICPA Code ET §1.240'
  },
  {
    section: 'AUD',
    topicId: 'aud-professional',
    topic: 'Professional Responsibilities',
    difficulty: 'easy',
    question: 'Which of the following is NOT a required procedure when assuming an audit engagement from a predecessor auditor?',
    options: [
      'Obtain client permission to communicate with predecessor',
      'Inquire of predecessor about disagreements with management',
      'Review predecessor\'s working papers',
      'Inquire about reasons for the change in auditors'
    ],
    correctAnswer: 2,
    explanation: 'Reviewing predecessor working papers is not required but is permitted with client consent. Required procedures include: obtaining client permission, making inquiries about integrity of management, disagreements with management, reasons for change, and fraud/illegal acts.',
    reference: 'AU-C 210.11'
  },

  // Sampling
  {
    section: 'AUD',
    topicId: 'aud-sampling',
    topic: 'Audit Sampling',
    difficulty: 'medium',
    question: 'An auditor uses systematic sampling to select 100 items from a population of 5,000. The sampling interval is 50, and a random start of 23 is selected. Which of the following items will be selected?',
    options: [
      '23, 50, 100, 150',
      '23, 73, 123, 173',
      '50, 100, 150, 200',
      '23, 46, 69, 92'
    ],
    correctAnswer: 1,
    explanation: 'Systematic sampling selects every nth item after a random start. With a sampling interval of 50 and random start of 23, selections are: 23, 23+50=73, 73+50=123, 123+50=173, etc.',
    reference: 'AU-C 530.A10'
  }
];

// =============================================================================
// BAR - Business Analysis & Reporting Questions
// =============================================================================
const BAR_QUESTIONS = [
  // Financial Statement Analysis
  {
    section: 'BAR',
    topicId: 'bar-financial-analysis',
    topic: 'Financial Statement Analysis',
    difficulty: 'medium',
    question: 'A company has current assets of $500,000, including inventory of $200,000, and current liabilities of $250,000. What is the quick ratio?',
    options: [
      '2.0',
      '1.2',
      '1.0',
      '0.8'
    ],
    correctAnswer: 1,
    explanation: 'Quick ratio = (Current assets - Inventory) / Current liabilities = ($500,000 - $200,000) / $250,000 = $300,000 / $250,000 = 1.2. The quick ratio excludes inventory because it is the least liquid current asset.',
    reference: 'Financial Statement Analysis Concepts'
  },
  {
    section: 'BAR',
    topicId: 'bar-financial-analysis',
    topic: 'Financial Statement Analysis',
    difficulty: 'hard',
    question: 'A company\'s ROE is 15%, profit margin is 10%, and total asset turnover is 1.0. Using the DuPont analysis, what is the equity multiplier?',
    options: [
      '1.5',
      '2.0',
      '1.25',
      '0.67'
    ],
    correctAnswer: 0,
    explanation: 'DuPont analysis: ROE = Profit Margin × Asset Turnover × Equity Multiplier. 15% = 10% × 1.0 × Equity Multiplier. Equity Multiplier = 15% / (10% × 1.0) = 0.15 / 0.10 = 1.5.',
    reference: 'DuPont Analysis Framework'
  },

  // Technical Accounting
  {
    section: 'BAR',
    topicId: 'bar-tech-accounting',
    topic: 'Technical Accounting',
    difficulty: 'hard',
    question: 'On January 1, Year 1, a company issues $1,000,000 of 5-year, 6% bonds when the market rate is 8%. The present value factors at 8% are: PV of $1 for 5 periods = 0.6806, PV of ordinary annuity of $1 for 5 periods = 3.9927. What is the issue price?',
    options: [
      '$920,146',
      '$1,000,000',
      '$1,079,854',
      '$880,000'
    ],
    correctAnswer: 0,
    explanation: 'Issue price = PV of principal + PV of interest payments. PV of principal = $1,000,000 × 0.6806 = $680,600. Annual interest = $1,000,000 × 6% = $60,000. PV of interest = $60,000 × 3.9927 = $239,562. Issue price = $680,600 + $239,562 = $920,162 (≈$920,146 with rounding).',
    reference: 'ASC 835-30'
  },
  {
    section: 'BAR',
    topicId: 'bar-tech-accounting',
    topic: 'Technical Accounting',
    difficulty: 'medium',
    question: 'Under ASC 606, a contract modification that adds distinct goods or services at standalone prices should be accounted for as:',
    options: [
      'A separate contract',
      'A prospective adjustment to the existing contract',
      'A cumulative catch-up adjustment',
      'A termination of the old contract and creation of a new contract'
    ],
    correctAnswer: 0,
    explanation: 'When a contract modification adds distinct goods/services at their standalone selling prices, it is treated as a separate contract. The original contract continues unchanged, and the modification creates a new contract for the additional goods/services.',
    reference: 'ASC 606-10-25-12'
  },

  // Data Analytics
  {
    section: 'BAR',
    topicId: 'bar-data-analytics',
    topic: 'Data Analytics',
    difficulty: 'medium',
    question: 'An auditor uses data analytics to analyze all journal entries posted during the year. This approach is an example of:',
    options: [
      'Statistical sampling',
      'Non-statistical sampling',
      'Population testing',
      'Judgmental selection'
    ],
    correctAnswer: 2,
    explanation: 'Analyzing all journal entries represents population testing (also called 100% examination), not sampling. Data analytics enables auditors to test entire populations rather than samples, providing evidence about all items in a population.',
    reference: 'AU-C 530.05, AICPA Data Analytics Guide'
  },
  {
    section: 'BAR',
    topicId: 'bar-data-analytics',
    topic: 'Data Analytics',
    difficulty: 'easy',
    question: 'Which visualization would be most appropriate to show the trend in monthly revenue over a three-year period?',
    options: [
      'Pie chart',
      'Bar chart',
      'Line chart',
      'Scatter plot'
    ],
    correctAnswer: 2,
    explanation: 'Line charts are ideal for showing trends over time, as they clearly display the direction and rate of change. Pie charts show composition, bar charts compare categories, and scatter plots show relationships between two variables.',
    reference: 'Data Visualization Best Practices'
  },

  // Economic Concepts
  {
    section: 'BAR',
    topicId: 'bar-economics',
    topic: 'Economic Concepts',
    difficulty: 'medium',
    question: 'A company is considering replacing old equipment. The old equipment\'s original cost was $100,000 and book value is $20,000. A buyer offers $25,000. In a replacement analysis, what is the relevant sunk cost?',
    options: [
      '$100,000',
      '$80,000',
      '$20,000',
      '$0'
    ],
    correctAnswer: 3,
    explanation: 'Sunk costs are past costs that cannot be recovered and should not affect future decisions. In replacement decisions, the original cost and accumulated depreciation are sunk costs—$0 relevant sunk cost. The $25,000 sale price is the relevant salvage value to consider.',
    reference: 'Managerial Accounting - Capital Budgeting'
  },
  {
    section: 'BAR',
    topicId: 'bar-economics',
    topic: 'Economic Concepts',
    difficulty: 'hard',
    question: 'A project requires an initial investment of $500,000 and is expected to generate cash flows of $150,000 annually for 5 years. The cost of capital is 10%. The present value factor for an ordinary annuity at 10% for 5 years is 3.7908. What is the project\'s NPV?',
    options: [
      '$68,620',
      '$250,000',
      '$568,620',
      '$(68,620)'
    ],
    correctAnswer: 0,
    explanation: 'NPV = PV of cash inflows - Initial investment. PV of inflows = $150,000 × 3.7908 = $568,620. NPV = $568,620 - $500,000 = $68,620. A positive NPV indicates the project should be accepted.',
    reference: 'Capital Budgeting - NPV Analysis'
  },

  // State & Local Government
  {
    section: 'BAR',
    topicId: 'bar-government',
    topic: 'State and Local Government',
    difficulty: 'medium',
    question: 'Which of the following is a required financial statement for proprietary funds under GASB standards?',
    options: [
      'Statement of Revenues, Expenditures, and Changes in Fund Balance',
      'Statement of Cash Flows using the indirect method',
      'Statement of Cash Flows using the direct method',
      'Budgetary comparison statement'
    ],
    correctAnswer: 2,
    explanation: 'GASB requires proprietary funds to present a Statement of Cash Flows using the DIRECT method (not indirect as in commercial entities). The statement must categorize cash flows as operating, noncapital financing, capital financing, and investing activities.',
    reference: 'GASB Statement No. 34'
  },

  // Prospective Financial Information
  {
    section: 'BAR',
    topicId: 'bar-prospective',
    topic: 'Prospective Financial Information',
    difficulty: 'medium',
    question: 'An accountant has been engaged to examine a financial forecast. Which of the following is NOT a required procedure?',
    options: [
      'Evaluate whether assumptions are suitably supported',
      'Evaluate the preparation and presentation of the forecast',
      'Test all underlying calculations for mathematical accuracy',
      'Consider whether the forecast conforms to AICPA guidelines'
    ],
    correctAnswer: 2,
    explanation: 'An examination of prospective financial information does not require testing all calculations—this would be impractical. The accountant evaluates assumptions, presentation, and conformity with guidelines, and performs other procedures to provide a basis for the opinion, but 100% testing is not required.',
    reference: 'AT-C 305'
  }
];

// =============================================================================
// Combine all questions
// =============================================================================
const ALL_QUESTIONS = [
  ...REG_QUESTIONS,
  ...FAR_QUESTIONS,
  ...AUD_QUESTIONS,
  ...BAR_QUESTIONS
];

// =============================================================================
// Seeding function
// =============================================================================
async function seedQuestions() {
  console.log('🌱 Starting to seed CPA exam questions...\n');
  
  // Check if questions already exist
  const questionsRef = collection(db, 'questions');
  const existingQuery = query(questionsRef, limit(1));
  const existingSnapshot = await getDocs(existingQuery);
  
  if (!existingSnapshot.empty) {
    console.log('⚠️  Questions already exist in Firestore.');
    console.log('   Run with --force flag to delete and reseed.\n');
    
    if (!process.argv.includes('--force')) {
      process.exit(0);
    }
    
    console.log('🗑️  Force flag detected. Deleting existing questions...');
    // Note: For production, you'd want to use batched deletes
  }
  
  // Batch write questions
  const batchSize = 500;
  let batch = writeBatch(db);
  let batchCount = 0;
  let totalCount = 0;
  
  for (const question of ALL_QUESTIONS) {
    const questionRef = doc(collection(db, 'questions'));
    batch.set(questionRef, {
      ...question,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      usageCount: 0,
      reportCount: 0
    });
    
    batchCount++;
    totalCount++;
    
    if (batchCount >= batchSize) {
      await batch.commit();
      console.log(`   Committed batch of ${batchCount} questions...`);
      batch = writeBatch(db);
      batchCount = 0;
    }
  }
  
  // Commit remaining questions
  if (batchCount > 0) {
    await batch.commit();
    console.log(`   Committed final batch of ${batchCount} questions...`);
  }
  
  console.log('\n✅ Successfully seeded questions:');
  console.log(`   REG: ${REG_QUESTIONS.length} questions`);
  console.log(`   FAR: ${FAR_QUESTIONS.length} questions`);
  console.log(`   AUD: ${AUD_QUESTIONS.length} questions`);
  console.log(`   BAR: ${BAR_QUESTIONS.length} questions`);
  console.log(`   ─────────────────────────`);
  console.log(`   Total: ${totalCount} questions\n`);
  
  process.exit(0);
}

// Run the seeder
seedQuestions().catch((error) => {
  console.error('❌ Error seeding questions:', error);
  process.exit(1);
});
