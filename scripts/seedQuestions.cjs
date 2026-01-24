/**
 * CPA Exam Question Seeder
 * Run this script to populate Firestore with real CPA exam questions
 * 
 * Usage: node scripts/seedQuestions.cjs
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, writeBatch } = require('firebase/firestore');

// Firebase config - same as your app
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyCovX75O39r8MNLphj4fQbckdcqBL30gXU",
  authDomain: "passcpa-dev.firebaseapp.com",
  projectId: "passcpa-dev",
  storageBucket: "passcpa-dev.firebasestorage.app",
  messagingSenderId: "321683631029",
  appId: "1:321683631029:web:9b3c2c5e5a6d8f0e4a7b8c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ============================================
// REAL CPA EXAM QUESTIONS
// Based on AICPA Blueprints and actual exam content
// ============================================

const CPA_QUESTIONS = [
  // ============================================
  // REG - TAXATION & REGULATION
  // ============================================
  
  // Individual Taxation
  {
    section: 'REG',
    topicId: 'reg-individual-tax',
    topic: 'Individual Taxation',
    difficulty: 'medium',
    question: 'For 2024, the standard deduction for a married couple filing jointly is:',
    options: [
      { id: 'A', text: '$27,700' },
      { id: 'B', text: '$29,200' },
      { id: 'C', text: '$14,600' },
      { id: 'D', text: '$21,900' }
    ],
    correctAnswer: 'B',
    explanation: 'For tax year 2024, the standard deduction for married filing jointly is $29,200. This is adjusted annually for inflation. The $14,600 is for single filers, and $21,900 is for head of household.',
    references: ['IRC §63(c)', 'Rev. Proc. 2023-34']
  },
  {
    section: 'REG',
    topicId: 'reg-individual-tax',
    topic: 'Individual Taxation',
    difficulty: 'hard',
    question: 'A taxpayer received $50,000 in wages and had $8,000 in qualified student loan interest paid during the year. The taxpayer\'s modified AGI is $75,000 and filing status is single. What is the maximum student loan interest deduction allowed?',
    options: [
      { id: 'A', text: '$0' },
      { id: 'B', text: '$2,500' },
      { id: 'C', text: '$8,000' },
      { id: 'D', text: '$1,667' }
    ],
    correctAnswer: 'B',
    explanation: 'The student loan interest deduction is limited to $2,500 per year, regardless of the actual interest paid. Since the taxpayer\'s MAGI of $75,000 is below the phaseout threshold for single filers ($75,000-$90,000), the full $2,500 deduction is allowed.',
    references: ['IRC §221', 'Publication 970']
  },
  {
    section: 'REG',
    topicId: 'reg-individual-tax',
    topic: 'Individual Taxation',
    difficulty: 'medium',
    question: 'Which of the following is NOT considered earned income for purposes of the Earned Income Tax Credit (EITC)?',
    options: [
      { id: 'A', text: 'Wages from employment' },
      { id: 'B', text: 'Net earnings from self-employment' },
      { id: 'C', text: 'Interest and dividend income' },
      { id: 'D', text: 'Union strike benefits' }
    ],
    correctAnswer: 'C',
    explanation: 'Interest and dividend income is investment income, not earned income. The EITC is specifically designed for working individuals, so only wages, salaries, tips, and net self-employment earnings qualify as earned income.',
    references: ['IRC §32(c)(2)', 'Publication 596']
  },
  {
    section: 'REG',
    topicId: 'reg-individual-tax',
    topic: 'Individual Taxation',
    difficulty: 'easy',
    question: 'The holding period required for long-term capital gain treatment is:',
    options: [
      { id: 'A', text: 'More than 6 months' },
      { id: 'B', text: 'More than 12 months' },
      { id: 'C', text: 'At least 12 months' },
      { id: 'D', text: 'More than 18 months' }
    ],
    correctAnswer: 'B',
    explanation: 'To qualify for long-term capital gain treatment, the asset must be held for MORE than 12 months (one year). Exactly 12 months is still short-term.',
    references: ['IRC §1222']
  },

  // Business Taxation
  {
    section: 'REG',
    topicId: 'reg-business-tax',
    topic: 'Business Taxation',
    difficulty: 'hard',
    question: 'Alpha Corporation, a calendar-year C corporation, has the following for the current year: Gross receipts $500,000, Cost of goods sold $200,000, Operating expenses $150,000, Charitable contributions $25,000, Dividends received from 30%-owned domestic corporation $40,000. What is Alpha\'s taxable income?',
    options: [
      { id: 'A', text: '$139,000' },
      { id: 'B', text: '$140,000' },
      { id: 'C', text: '$165,000' },
      { id: 'D', text: '$150,000' }
    ],
    correctAnswer: 'A',
    explanation: 'Taxable income calculation: $500,000 - $200,000 - $150,000 = $150,000 before DRD and charitable. Charitable deduction limited to 10% of $150,000 + $40,000 = $19,000. DRD for 30%-owned = 65% × $40,000 = $26,000. But DRD limited to 65% × ($150,000 - $19,000) = $85,150. Taxable income = $150,000 - $19,000 + $40,000 - $26,000 - $6,000 charitable carryover = $139,000.',
    references: ['IRC §170(b)(2)', 'IRC §243']
  },
  {
    section: 'REG',
    topicId: 'reg-business-tax',
    topic: 'Business Taxation',
    difficulty: 'medium',
    question: 'A C corporation\'s charitable contribution deduction is limited to what percentage of taxable income computed without regard to the deduction?',
    options: [
      { id: 'A', text: '50%' },
      { id: 'B', text: '30%' },
      { id: 'C', text: '10%' },
      { id: 'D', text: '60%' }
    ],
    correctAnswer: 'C',
    explanation: 'C corporations are limited to a charitable contribution deduction of 10% of taxable income, computed without regard to the charitable contribution deduction, the DRD, any NOL carryback, and any capital loss carryback. Excess contributions can be carried forward 5 years.',
    references: ['IRC §170(b)(2)']
  },
  {
    section: 'REG',
    topicId: 'reg-business-tax',
    topic: 'Business Taxation',
    difficulty: 'medium',
    question: 'Which of the following organizational costs may a corporation elect to deduct in the year business begins?',
    options: [
      { id: 'A', text: 'Up to $5,000, with excess amortized over 180 months' },
      { id: 'B', text: 'Up to $10,000, with excess amortized over 60 months' },
      { id: 'C', text: 'The full amount in the year incurred' },
      { id: 'D', text: 'Up to $50,000, with excess amortized over 15 years' }
    ],
    correctAnswer: 'A',
    explanation: 'A corporation may elect to deduct up to $5,000 of organizational expenditures in the year business begins. This $5,000 is reduced (but not below zero) by the amount by which total organizational costs exceed $50,000. Any remaining costs are amortized over 180 months.',
    references: ['IRC §248']
  },

  // Ethics and Responsibilities
  {
    section: 'REG',
    topicId: 'reg-ethics',
    topic: 'Ethics and Responsibilities',
    difficulty: 'medium',
    question: 'Under Treasury Department Circular 230, which of the following activities is a CPA prohibited from engaging in?',
    options: [
      { id: 'A', text: 'Charging a contingent fee for preparing an original tax return' },
      { id: 'B', text: 'Charging a contingent fee for representing a client in an audit' },
      { id: 'C', text: 'Advertising professional services' },
      { id: 'D', text: 'Providing written tax advice' }
    ],
    correctAnswer: 'A',
    explanation: 'Circular 230 prohibits charging contingent fees for preparing original tax returns or claims for refund. Contingent fees are generally allowed for examination matters, refund claims after the return is filed, and other IRS representation.',
    references: ['31 CFR §10.27']
  },
  {
    section: 'REG',
    topicId: 'reg-ethics',
    topic: 'Ethics and Responsibilities',
    difficulty: 'hard',
    question: 'A CPA discovers a material error in a client\'s previously filed tax return. Under what circumstances must the CPA inform the client of the error?',
    options: [
      { id: 'A', text: 'Only if the error results in additional tax due' },
      { id: 'B', text: 'Only if the error exceeds $10,000' },
      { id: 'C', text: 'In all cases where the CPA becomes aware of the error' },
      { id: 'D', text: 'Only if the CPA prepared the original return' }
    ],
    correctAnswer: 'C',
    explanation: 'Under AICPA SSTS No. 6 and Circular 230, a CPA must promptly inform the client of any error discovered in a previously filed return, regardless of who prepared it or the amount involved. The CPA should recommend corrective measures but cannot disclose the error to the IRS without client consent.',
    references: ['SSTS No. 6', '31 CFR §10.21']
  },

  // ============================================
  // FAR - FINANCIAL ACCOUNTING & REPORTING
  // ============================================

  // Revenue Recognition
  {
    section: 'FAR',
    topicId: 'far-revenue',
    topic: 'Revenue Recognition',
    difficulty: 'medium',
    question: 'Under ASC 606, which of the following is NOT one of the five steps in revenue recognition?',
    options: [
      { id: 'A', text: 'Identify the contract with a customer' },
      { id: 'B', text: 'Determine the transaction price' },
      { id: 'C', text: 'Match revenues with expenses' },
      { id: 'D', text: 'Recognize revenue when performance obligations are satisfied' }
    ],
    correctAnswer: 'C',
    explanation: 'The five steps under ASC 606 are: (1) Identify the contract, (2) Identify performance obligations, (3) Determine transaction price, (4) Allocate transaction price to performance obligations, (5) Recognize revenue when obligations are satisfied. Matching revenues with expenses is not part of ASC 606.',
    references: ['ASC 606-10-05-4']
  },
  {
    section: 'FAR',
    topicId: 'far-revenue',
    topic: 'Revenue Recognition',
    difficulty: 'hard',
    question: 'A company sells equipment for $100,000 with a two-year warranty. The stand-alone selling price of the equipment is $95,000 and the warranty is $8,000. Using the relative stand-alone selling price method, how much revenue should be allocated to the equipment?',
    options: [
      { id: 'A', text: '$95,000' },
      { id: 'B', text: '$92,233' },
      { id: 'C', text: '$100,000' },
      { id: 'D', text: '$97,087' }
    ],
    correctAnswer: 'B',
    explanation: 'Allocation: Equipment = ($95,000 / $103,000) × $100,000 = $92,233. Warranty = ($8,000 / $103,000) × $100,000 = $7,767. The transaction price of $100,000 is allocated based on relative stand-alone selling prices.',
    references: ['ASC 606-10-32-31']
  },
  {
    section: 'FAR',
    topicId: 'far-revenue',
    topic: 'Revenue Recognition',
    difficulty: 'medium',
    question: 'Under ASC 606, a performance obligation is satisfied over time if:',
    options: [
      { id: 'A', text: 'The customer receives and consumes the benefits as the entity performs' },
      { id: 'B', text: 'The contract term exceeds one year' },
      { id: 'C', text: 'Payment is received in advance' },
      { id: 'D', text: 'The goods have been shipped FOB shipping point' }
    ],
    correctAnswer: 'A',
    explanation: 'A performance obligation is satisfied over time if one of three criteria is met: (1) customer simultaneously receives and consumes benefits, (2) the entity\'s performance creates or enhances an asset the customer controls, or (3) the entity\'s performance creates an asset with no alternative use and the entity has an enforceable right to payment.',
    references: ['ASC 606-10-25-27']
  },

  // Leases
  {
    section: 'FAR',
    topicId: 'far-leases',
    topic: 'Leases',
    difficulty: 'medium',
    question: 'Under ASC 842, which of the following is correct regarding a lessee\'s accounting for an operating lease?',
    options: [
      { id: 'A', text: 'No asset or liability is recorded' },
      { id: 'B', text: 'A right-of-use asset and lease liability are recorded' },
      { id: 'C', text: 'Only a lease liability is recorded' },
      { id: 'D', text: 'The leased asset is capitalized at fair value' }
    ],
    correctAnswer: 'B',
    explanation: 'Under ASC 842, lessees must recognize both a right-of-use (ROU) asset and a lease liability for virtually all leases, including operating leases. The main exception is for short-term leases (12 months or less) where an accounting policy election is made.',
    references: ['ASC 842-20-25-1']
  },
  {
    section: 'FAR',
    topicId: 'far-leases',
    topic: 'Leases',
    difficulty: 'hard',
    question: 'A lessee enters into a 5-year lease with annual payments of $10,000 due at the end of each year. The lessee\'s incremental borrowing rate is 6%. The present value of an ordinary annuity of 1 for 5 periods at 6% is 4.212. What is the initial lease liability?',
    options: [
      { id: 'A', text: '$50,000' },
      { id: 'B', text: '$42,120' },
      { id: 'C', text: '$44,651' },
      { id: 'D', text: '$37,908' }
    ],
    correctAnswer: 'B',
    explanation: 'The initial lease liability is the present value of lease payments: $10,000 × 4.212 = $42,120. Since payments are at year-end, we use the ordinary annuity factor.',
    references: ['ASC 842-20-30-1']
  },

  // Consolidations
  {
    section: 'FAR',
    topicId: 'far-consolidations',
    topic: 'Consolidations',
    difficulty: 'hard',
    question: 'Parent Company owns 80% of Subsidiary. During the year, Subsidiary sold inventory to Parent for $100,000 with a gross profit of 30%. At year-end, Parent still held $40,000 of this inventory. What is the unrealized profit to be eliminated in consolidation?',
    options: [
      { id: 'A', text: '$12,000' },
      { id: 'B', text: '$9,600' },
      { id: 'C', text: '$30,000' },
      { id: 'D', text: '$24,000' }
    ],
    correctAnswer: 'A',
    explanation: 'Unrealized profit = Inventory on hand × Gross profit rate = $40,000 × 30% = $12,000. In consolidation, 100% of the unrealized profit is eliminated regardless of the ownership percentage. The NCI bears their share through the consolidated net income allocation.',
    references: ['ASC 810-10-45-1']
  },
  {
    section: 'FAR',
    topicId: 'far-consolidations',
    topic: 'Consolidations',
    difficulty: 'medium',
    question: 'When consolidating a subsidiary, which of the following is correct?',
    options: [
      { id: 'A', text: 'Intercompany receivables and payables are netted and shown separately' },
      { id: 'B', text: 'All intercompany transactions and balances are eliminated' },
      { id: 'C', text: 'Only intercompany sales are eliminated' },
      { id: 'D', text: 'Intercompany balances are eliminated only if material' }
    ],
    correctAnswer: 'B',
    explanation: 'In consolidated financial statements, all intercompany transactions and balances must be eliminated in their entirety. This includes intercompany sales, receivables, payables, loans, and unrealized profits in inventory and fixed assets.',
    references: ['ASC 810-10-45-1']
  },

  // Government Accounting
  {
    section: 'FAR',
    topicId: 'far-government',
    topic: 'Government Accounting',
    difficulty: 'medium',
    question: 'Under GASB standards, which fund would be used to account for resources legally restricted for the acquisition of capital assets?',
    options: [
      { id: 'A', text: 'General Fund' },
      { id: 'B', text: 'Capital Projects Fund' },
      { id: 'C', text: 'Enterprise Fund' },
      { id: 'D', text: 'Internal Service Fund' }
    ],
    correctAnswer: 'B',
    explanation: 'Capital Projects Funds are used to account for financial resources restricted, committed, or assigned for the acquisition or construction of major capital facilities (other than those financed by proprietary or fiduciary funds).',
    references: ['GASB Codification 1300.106']
  },
  {
    section: 'FAR',
    topicId: 'far-government',
    topic: 'Government Accounting',
    difficulty: 'hard',
    question: 'A city receives a $1,000,000 federal grant that must be used for road improvements. At year-end, $300,000 has been spent. How should this be reported in the General Fund?',
    options: [
      { id: 'A', text: 'Revenue of $1,000,000' },
      { id: 'B', text: 'Revenue of $300,000 and deferred inflow of $700,000' },
      { id: 'C', text: 'Revenue of $300,000' },
      { id: 'D', text: 'Deferred inflow of $1,000,000' }
    ],
    correctAnswer: 'C',
    explanation: 'For expenditure-driven grants, revenue is recognized when qualifying expenditures are incurred. Only $300,000 in qualifying expenditures have been made, so only $300,000 is recognized as revenue. The remaining grant funds are not yet recognized.',
    references: ['GASB Statement No. 33']
  },

  // ============================================
  // AUD - AUDITING & ATTESTATION
  // ============================================

  // Audit Evidence
  {
    section: 'AUD',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    difficulty: 'medium',
    question: 'Which of the following audit procedures provides the most reliable evidence?',
    options: [
      { id: 'A', text: 'Inquiry of client personnel' },
      { id: 'B', text: 'Observation of client activities' },
      { id: 'C', text: 'External confirmation' },
      { id: 'D', text: 'Analytical procedures' }
    ],
    correctAnswer: 'C',
    explanation: 'External confirmation involves obtaining evidence directly from independent third parties. This is generally more reliable than evidence obtained from the client because it is independent of the client and obtained directly by the auditor.',
    references: ['AU-C 500.A31']
  },
  {
    section: 'AUD',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    difficulty: 'easy',
    question: 'The two characteristics that determine the persuasiveness of audit evidence are:',
    options: [
      { id: 'A', text: 'Competence and sufficiency' },
      { id: 'B', text: 'Relevance and reliability' },
      { id: 'C', text: 'Appropriateness and sufficiency' },
      { id: 'D', text: 'Validity and completeness' }
    ],
    correctAnswer: 'C',
    explanation: 'Audit evidence must be both appropriate (quality - relevance and reliability) and sufficient (quantity). Appropriateness relates to the quality of evidence, while sufficiency relates to the quantity needed to support the auditor\'s conclusions.',
    references: ['AU-C 500.05']
  },
  {
    section: 'AUD',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    difficulty: 'hard',
    question: 'An auditor is testing accounts receivable confirmations. Of 100 confirmations sent, 80 were returned. Of the 80 returned, 5 reported exceptions. The auditor investigated the exceptions and found 2 were timing differences and 3 were actual errors. What is the exception rate?',
    options: [
      { id: 'A', text: '5%' },
      { id: 'B', text: '3%' },
      { id: 'C', text: '3.75%' },
      { id: 'D', text: '6.25%' }
    ],
    correctAnswer: 'C',
    explanation: 'The exception rate is based on actual errors (misstatements), not timing differences. Exception rate = 3 errors / 80 responses = 3.75%. The auditor must also consider the 20 non-responses through alternative procedures.',
    references: ['AU-C 505']
  },

  // Internal Control
  {
    section: 'AUD',
    topicId: 'aud-internal-control',
    topic: 'Internal Control',
    difficulty: 'medium',
    question: 'According to COSO, which of the following is NOT one of the five components of internal control?',
    options: [
      { id: 'A', text: 'Control environment' },
      { id: 'B', text: 'Risk assessment' },
      { id: 'C', text: 'Segregation of duties' },
      { id: 'D', text: 'Monitoring activities' }
    ],
    correctAnswer: 'C',
    explanation: 'The five components of internal control per COSO are: (1) Control Environment, (2) Risk Assessment, (3) Control Activities, (4) Information and Communication, and (5) Monitoring Activities. Segregation of duties is a type of control activity, not a component itself.',
    references: ['COSO Framework', 'AU-C 315']
  },
  {
    section: 'AUD',
    topicId: 'aud-internal-control',
    topic: 'Internal Control',
    difficulty: 'medium',
    question: 'A material weakness in internal control over financial reporting exists when:',
    options: [
      { id: 'A', text: 'A deficiency in controls is identified' },
      { id: 'B', text: 'There is a reasonable possibility that a material misstatement will not be prevented or detected timely' },
      { id: 'C', text: 'Management intentionally overrides controls' },
      { id: 'D', text: 'The control has not been tested by the auditor' }
    ],
    correctAnswer: 'B',
    explanation: 'A material weakness is a deficiency, or combination of deficiencies, in ICFR such that there is a reasonable possibility that a material misstatement of the financial statements will not be prevented or detected on a timely basis.',
    references: ['AU-C 265.07']
  },

  // Audit Reports
  {
    section: 'AUD',
    topicId: 'aud-reports',
    topic: 'Audit Reports',
    difficulty: 'medium',
    question: 'An auditor concludes that a client\'s financial statements are fairly presented except for inadequate disclosure of related party transactions. The auditor should issue:',
    options: [
      { id: 'A', text: 'An unmodified opinion' },
      { id: 'B', text: 'A qualified opinion' },
      { id: 'C', text: 'An adverse opinion' },
      { id: 'D', text: 'A disclaimer of opinion' }
    ],
    correctAnswer: 'B',
    explanation: 'When there is a material misstatement (including inadequate disclosure) that is not pervasive, the auditor should issue a qualified opinion. An adverse opinion would be appropriate if the misstatement were pervasive to the financial statements.',
    references: ['AU-C 705']
  },
  {
    section: 'AUD',
    topicId: 'aud-reports',
    topic: 'Audit Reports',
    difficulty: 'hard',
    question: 'An auditor is unable to obtain sufficient appropriate audit evidence about inventory due to a fire that destroyed records. Inventory is material but not pervasive. The auditor should:',
    options: [
      { id: 'A', text: 'Issue an unmodified opinion with an emphasis-of-matter paragraph' },
      { id: 'B', text: 'Issue a qualified opinion due to a scope limitation' },
      { id: 'C', text: 'Issue an adverse opinion' },
      { id: 'D', text: 'Withdraw from the engagement' }
    ],
    correctAnswer: 'B',
    explanation: 'When the auditor is unable to obtain sufficient appropriate audit evidence and the possible effects are material but not pervasive, a qualified opinion is appropriate. A disclaimer would be issued if the effects were pervasive.',
    references: ['AU-C 705.13']
  },

  // ============================================
  // BAR - BUSINESS ANALYSIS & REPORTING
  // ============================================

  // Financial Statement Analysis
  {
    section: 'BAR',
    topicId: 'bar-analysis',
    topic: 'Financial Statement Analysis',
    difficulty: 'medium',
    question: 'A company has current assets of $500,000, inventory of $200,000, and current liabilities of $250,000. What is the quick ratio?',
    options: [
      { id: 'A', text: '2.0' },
      { id: 'B', text: '1.2' },
      { id: 'C', text: '1.0' },
      { id: 'D', text: '0.8' }
    ],
    correctAnswer: 'B',
    explanation: 'Quick ratio = (Current Assets - Inventory) / Current Liabilities = ($500,000 - $200,000) / $250,000 = $300,000 / $250,000 = 1.2. The quick ratio excludes inventory because it is the least liquid current asset.',
    references: ['Financial Ratios']
  },
  {
    section: 'BAR',
    topicId: 'bar-analysis',
    topic: 'Financial Statement Analysis',
    difficulty: 'hard',
    question: 'A company reports net income of $100,000, depreciation of $20,000, an increase in accounts receivable of $15,000, and a decrease in accounts payable of $10,000. What is cash flow from operating activities using the indirect method?',
    options: [
      { id: 'A', text: '$95,000' },
      { id: 'B', text: '$105,000' },
      { id: 'C', text: '$115,000' },
      { id: 'D', text: '$145,000' }
    ],
    correctAnswer: 'A',
    explanation: 'CFO = Net Income + Depreciation - Increase in A/R - Decrease in A/P = $100,000 + $20,000 - $15,000 - $10,000 = $95,000. Depreciation is added back (non-cash), increase in A/R is subtracted (used cash), decrease in A/P is subtracted (used cash).',
    references: ['ASC 230']
  },
  {
    section: 'BAR',
    topicId: 'bar-analysis',
    topic: 'Financial Statement Analysis',
    difficulty: 'easy',
    question: 'Which financial ratio measures a company\'s ability to pay interest on its debt?',
    options: [
      { id: 'A', text: 'Debt-to-equity ratio' },
      { id: 'B', text: 'Times interest earned ratio' },
      { id: 'C', text: 'Current ratio' },
      { id: 'D', text: 'Return on assets' }
    ],
    correctAnswer: 'B',
    explanation: 'The times interest earned (TIE) ratio, calculated as EBIT divided by interest expense, measures a company\'s ability to meet interest payments. A higher ratio indicates greater ability to cover interest obligations.',
    references: ['Financial Ratios']
  },

  // Cost Accounting
  {
    section: 'BAR',
    topicId: 'bar-cost',
    topic: 'Cost Accounting',
    difficulty: 'medium',
    question: 'A company produces 10,000 units with the following costs: Direct materials $50,000, Direct labor $30,000, Variable overhead $20,000, Fixed overhead $40,000. What is the product cost per unit under absorption costing?',
    options: [
      { id: 'A', text: '$10' },
      { id: 'B', text: '$12' },
      { id: 'C', text: '$14' },
      { id: 'D', text: '$8' }
    ],
    correctAnswer: 'C',
    explanation: 'Under absorption costing, product cost includes all manufacturing costs (DM + DL + Variable OH + Fixed OH). Total = $50,000 + $30,000 + $20,000 + $40,000 = $140,000. Per unit = $140,000 / 10,000 = $14.',
    references: ['Cost Accounting Standards']
  },
  {
    section: 'BAR',
    topicId: 'bar-cost',
    topic: 'Cost Accounting',
    difficulty: 'hard',
    question: 'Using the data from the previous question, if variable costing is used and 8,000 units are sold at $20 each, what is the operating income under variable costing?',
    options: [
      { id: 'A', text: '$40,000' },
      { id: 'B', text: '$80,000' },
      { id: 'C', text: '$32,000' },
      { id: 'D', text: '$0' }
    ],
    correctAnswer: 'A',
    explanation: 'Variable cost per unit = ($50,000 + $30,000 + $20,000) / 10,000 = $10. Revenue = 8,000 × $20 = $160,000. Variable costs = 8,000 × $10 = $80,000. Contribution margin = $80,000. Operating income = $80,000 - $40,000 (fixed OH) = $40,000.',
    references: ['Cost Accounting Standards']
  },

  // Budgeting
  {
    section: 'BAR',
    topicId: 'bar-budgeting',
    topic: 'Budgeting',
    difficulty: 'medium',
    question: 'A static budget shows sales of $500,000 and variable costs of $300,000 for 10,000 units. Actual results show sales of $540,000 and variable costs of $340,000 for 11,000 units. What is the flexible budget variance for variable costs?',
    options: [
      { id: 'A', text: '$10,000 unfavorable' },
      { id: 'B', text: '$10,000 favorable' },
      { id: 'C', text: '$40,000 unfavorable' },
      { id: 'D', text: '$30,000 unfavorable' }
    ],
    correctAnswer: 'A',
    explanation: 'Variable cost per unit (budgeted) = $300,000 / 10,000 = $30. Flexible budget for 11,000 units = 11,000 × $30 = $330,000. Flexible budget variance = Actual - Flexible = $340,000 - $330,000 = $10,000 unfavorable.',
    references: ['Managerial Accounting']
  },

  // More REG Questions
  {
    section: 'REG',
    topicId: 'reg-property',
    topic: 'Property Transactions',
    difficulty: 'hard',
    question: 'A taxpayer exchanges a rental property (FMV $400,000, adjusted basis $250,000) for another rental property (FMV $350,000) plus $50,000 cash in a like-kind exchange. What is the recognized gain?',
    options: [
      { id: 'A', text: '$0' },
      { id: 'B', text: '$50,000' },
      { id: 'C', text: '$100,000' },
      { id: 'D', text: '$150,000' }
    ],
    correctAnswer: 'B',
    explanation: 'In a like-kind exchange, gain is recognized to the extent of boot received. Boot = $50,000 cash. Realized gain = $400,000 - $250,000 = $150,000. Recognized gain = lesser of realized gain ($150,000) or boot received ($50,000) = $50,000.',
    references: ['IRC §1031']
  },
  {
    section: 'REG',
    topicId: 'reg-property',
    topic: 'Property Transactions',
    difficulty: 'medium',
    question: 'Section 1231 assets include all of the following EXCEPT:',
    options: [
      { id: 'A', text: 'Depreciable business property held more than one year' },
      { id: 'B', text: 'Land used in a business held more than one year' },
      { id: 'C', text: 'Inventory' },
      { id: 'D', text: 'Timber' }
    ],
    correctAnswer: 'C',
    explanation: 'Section 1231 assets include depreciable property and land used in a trade or business held more than one year. Inventory and property held for sale to customers are specifically excluded from Section 1231.',
    references: ['IRC §1231']
  },

  // More FAR Questions
  {
    section: 'FAR',
    topicId: 'far-equity',
    topic: 'Stockholders\' Equity',
    difficulty: 'medium',
    question: 'A company issues 10,000 shares of $1 par common stock for $15 per share. The journal entry includes:',
    options: [
      { id: 'A', text: 'Credit to Common Stock for $150,000' },
      { id: 'B', text: 'Credit to APIC for $150,000' },
      { id: 'C', text: 'Credit to Common Stock for $10,000 and APIC for $140,000' },
      { id: 'D', text: 'Credit to Retained Earnings for $140,000' }
    ],
    correctAnswer: 'C',
    explanation: 'Common Stock is credited for par value (10,000 × $1 = $10,000). Additional Paid-in Capital (APIC) is credited for the excess (10,000 × ($15 - $1) = $140,000). Total credit = $150,000.',
    references: ['ASC 505']
  },
  {
    section: 'FAR',
    topicId: 'far-equity',
    topic: 'Stockholders\' Equity',
    difficulty: 'hard',
    question: 'A company has 100,000 shares of common stock outstanding and declares a 10% stock dividend when the market price is $20 per share and par value is $1. What is the total amount debited to Retained Earnings?',
    options: [
      { id: 'A', text: '$10,000' },
      { id: 'B', text: '$200,000' },
      { id: 'C', text: '$100,000' },
      { id: 'D', text: '$190,000' }
    ],
    correctAnswer: 'B',
    explanation: 'For a small stock dividend (<20-25%), retained earnings is debited at fair market value. Shares issued = 100,000 × 10% = 10,000. Debit to Retained Earnings = 10,000 × $20 = $200,000.',
    references: ['ASC 505-20']
  },

  // More AUD Questions
  {
    section: 'AUD',
    topicId: 'aud-sampling',
    topic: 'Audit Sampling',
    difficulty: 'medium',
    question: 'When using statistical sampling in tests of controls, which of the following is correct?',
    options: [
      { id: 'A', text: 'Sample size increases as tolerable deviation rate increases' },
      { id: 'B', text: 'Sample size decreases as expected deviation rate increases' },
      { id: 'C', text: 'Sample size increases as confidence level increases' },
      { id: 'D', text: 'Sample size is not affected by population size for large populations' }
    ],
    correctAnswer: 'C',
    explanation: 'Higher confidence level requires larger sample size. Also, sample size increases as expected deviation rate approaches tolerable rate. For large populations, sample size is relatively unaffected by population size.',
    references: ['AU-C 530']
  },
  {
    section: 'AUD',
    topicId: 'aud-fraud',
    topic: 'Fraud',
    difficulty: 'medium',
    question: 'The fraud triangle consists of which three elements?',
    options: [
      { id: 'A', text: 'Opportunity, pressure, and rationalization' },
      { id: 'B', text: 'Motive, means, and method' },
      { id: 'C', text: 'Control, detection, and prevention' },
      { id: 'D', text: 'Risk, materiality, and evidence' }
    ],
    correctAnswer: 'A',
    explanation: 'The fraud triangle identifies three conditions present when fraud occurs: Incentive/Pressure (motivation to commit fraud), Opportunity (weak controls that allow fraud), and Rationalization (attitude that justifies fraudulent behavior).',
    references: ['AU-C 240']
  }
];

async function seedQuestions() {
  console.log('Starting to seed CPA questions to Firestore...');
  console.log(`Total questions to seed: ${CPA_QUESTIONS.length}`);
  
  const batch = writeBatch(db);
  
  for (const question of CPA_QUESTIONS) {
    const questionRef = doc(collection(db, 'questions'));
    batch.set(questionRef, {
      ...question,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  
  try {
    await batch.commit();
    console.log(`✅ Successfully seeded ${CPA_QUESTIONS.length} questions!`);
    
    // Count by section
    const counts = CPA_QUESTIONS.reduce((acc, q) => {
      acc[q.section] = (acc[q.section] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\nQuestions by section:');
    Object.entries(counts).forEach(([section, count]) => {
      console.log(`  ${section}: ${count}`);
    });
    
  } catch (error) {
    console.error('❌ Error seeding questions:', error);
  }
  
  process.exit(0);
}

seedQuestions();
