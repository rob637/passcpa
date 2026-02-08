/**
 * CIA Lessons: Missing Topics - Fraud, Sampling, IFRS/GAAP
 * 
 * These lessons address gaps identified in the content review:
 * 1. Fraud Examination Techniques
 * 2. Statistical Sampling Formulas
 * 3. IFRS vs GAAP Comparison
 */

import { Lesson } from '../../../types';

export const ciaMissingTopicsLessons: Lesson[] = [
  // ============================================================================
  // FRAUD EXAMINATION TECHNIQUES
  // ============================================================================
  {
    id: 'CIA2-II-051',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Fraud Examination Techniques',
    description: 'Master advanced fraud detection and examination techniques for internal auditors',
    order: 51,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Fraud examination', 'Red flags', 'Investigation techniques', 'ACFE methodology'],
    blueprintArea: 'CIA2-II',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'Fraud costs organizations an estimated 5% of revenue annually (ACFE Report to the Nations). Internal auditors play a crucial role in fraud detection and deterrence. Understanding examination techniques is essential for CIA Part 2.',
        },
        {
          title: 'Fraud Detection Methods',
          type: 'text',
          content: "**Internal auditors use multiple methods to detect fraud:**\n\n**1. Data Analytics**\n• Benford's Law analysis (digit frequency analysis)\n• Duplicate payment testing\n• Gaps and duplicates in sequential numbering\n• Stratification analysis (identifying outliers)\n• Relative size factor testing\n\n**2. Accounting Analysis**\n• Horizontal analysis (trend comparison)\n• Vertical analysis (common-size statements)\n• Ratio analysis (unusual fluctuations)\n• Journal entry testing (unusual entries)\n• Account reconciliation review\n\n**3. Document Examination**\n• Alteration detection\n• Signature analysis\n• Photocopies vs. originals\n• Supporting documentation verification\n• Vendor file review",
        },
        {
          title: "Benford's Law Application",
          type: 'text',
          content: "**Benford's Law** states that in naturally occurring datasets, the first digit follows a predictable distribution:\n\n• **Digit 1**: ~30.1% frequency\n• **Digit 2**: ~17.6% frequency\n• **Digit 3**: ~12.5% frequency\n• **Digit 4**: ~9.7% frequency\n• **Digits 5-9**: Decreasing percentages\n\n**Application in Fraud Detection:**\n• Compare actual first-digit distribution to expected\n• Significant deviations indicate potential manipulation\n• Works best on large datasets (invoices, payments)\n• NOT applicable to assigned numbers (SSN, account numbers)\n• Particularly useful for expense reports, reimbursements",
        },
        {
          title: 'Red Flag Categories',
          type: 'table',
          headers: ['Category', 'Behavioral Red Flags', 'Documentary Red Flags'],
          rows: [
            ['Asset Misappropriation', 'Living beyond means, financial difficulties, refusal to take vacation', 'Missing documents, altered records, excessive voids'],
            ['Corruption', 'Unusually close vendor relationships, lifestyle changes', 'Single-source contracts, inflated invoices, kickback patterns'],
            ['Financial Statement Fraud', 'Pressure to meet targets, resistance to audit, management override', 'Unusual journal entries, revenue timing issues, reserve manipulation'],
          ],
        },
        {
          title: 'Fraud Interview Techniques',
          type: 'text',
          content: "**Interview Progression:**\n\n**1. Information-Gathering Interview**\n• Non-accusatory tone\n• Open-ended questions\n• Establish baseline behavior\n• Gather facts and timeline\n\n**2. Assessment Interview**\n• Observe verbal and non-verbal cues\n• Identify inconsistencies\n• Test alibis and explanations\n\n**3. Admission-Seeking Interview (if warranted)**\n• Only after sufficient evidence gathered\n• Follow legal and HR guidelines\n• Document carefully\n• Consider legal counsel involvement\n\n**Key Principles:**\n• Maintain objectivity\n• Document everything\n• Protect whistleblower identity\n• Follow organization's investigation policy",
        },
        {
          title: 'Memory Aid: MICE',
          type: 'callout',
          content: '**Fraud Motivators (MICE):**\n\n**M**oney - Financial pressure or greed\n**I**deology - Belief they are entitled or justified\n**C**oercion - External pressure or threats\n**E**go - Status, recognition, power',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Benford's Law analyzes first-digit distribution to detect manipulation",
            'Data analytics can test 100% of transactions for anomalies',
            'Red flags are categorized by fraud type (misappropriation, corruption, financial statement)',
            'Interview progression: information gathering → assessment → admission seeking',
            'Always follow organizational policies and involve legal/HR as appropriate',
          ],
        },
      ],
    },
  },

  // ============================================================================
  // STATISTICAL SAMPLING FORMULAS
  // ============================================================================
  {
    id: 'CIA2-III-052',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Statistical Sampling Formulas and Techniques',
    description: 'Master the mathematical foundations of statistical sampling for audit testing',
    order: 52,
    duration: 55,
    difficulty: 'advanced',
    topics: ['Statistical sampling', 'Sample size formulas', 'Confidence levels', 'Precision'],
    blueprintArea: 'CIA2-III',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'Statistical sampling allows auditors to make objective, defensible conclusions about a population based on a sample. Understanding the formulas helps you properly design samples and interpret results. The CIA exam tests both concepts and calculations.',
        },
        {
          title: 'Key Sampling Concepts',
          type: 'text',
          content: "**Confidence Level (Reliability)**\n• Probability that sample result reflects population\n• Common levels: 90%, 95%, 99%\n• Higher confidence = larger sample required\n• 95% confidence means 5% risk of wrong conclusion\n\n**Precision (Tolerable Error)**\n• Acceptable range of deviation from sample result\n• Also called 'allowable error' or 'precision'\n• Tighter precision = larger sample required\n\n**Expected Error Rate**\n• Anticipated deviation rate in population\n• Based on prior experience or pilot testing\n• Higher expected rate = larger sample required\n\n**Population Size (N)**\n• Total items in population\n• Less impact on sample size than other factors\n• Finite population correction applies when sampling >5% of population",
        },
        {
          title: 'Attribute Sampling Formula',
          type: 'text',
          content: "**Attribute Sampling** tests yes/no characteristics (compliance testing)\n\n**Sample Size Formula:**\n```\nn = (Z² × p × (1-p)) / E²\n```\n\nWhere:\n• **n** = Sample size\n• **Z** = Z-score for confidence level (1.65 for 90%, 1.96 for 95%, 2.58 for 99%)\n• **p** = Expected error rate (as decimal)\n• **E** = Precision/tolerable error rate (as decimal)\n\n**Example:**\n• Confidence: 95% (Z = 1.96)\n• Expected error: 2% (p = 0.02)\n• Tolerable error: 5% (E = 0.05)\n\nn = (1.96² × 0.02 × 0.98) / 0.05²\nn = (3.84 × 0.0196) / 0.0025\nn = 0.0753 / 0.0025\nn = **30 items**",
        },
        {
          title: 'Variables Sampling Approaches',
          type: 'text',
          content: "**Variables Sampling** tests dollar amounts (substantive testing)\n\n**1. Mean-Per-Unit (MPU)**\n• Estimates population total from sample mean\n• Population estimate = Sample mean × Population size\n• Standard formula but high variability\n\n**2. Difference Estimation**\n• Estimates total error from sample differences\n• Audited value - Book value for each item\n• More efficient when errors are expected\n\n**3. Ratio Estimation**\n• Uses ratio of audited to book values\n• Population estimate = Book total × (Sample audited / Sample book)\n• Efficient when proportional relationship exists\n\n**4. Monetary Unit Sampling (MUS/PPS)**\n• Each dollar is a sampling unit\n• Larger items more likely to be selected\n• Combines attributes and variables approaches\n• Most commonly used for substantive testing",
        },
        {
          title: 'Z-Score Reference Table',
          type: 'table',
          headers: ['Confidence Level', 'Z-Score', 'One-Tail Z'],
          rows: [
            ['80%', '1.28', '0.84'],
            ['90%', '1.65', '1.28'],
            ['95%', '1.96', '1.65'],
            ['99%', '2.58', '2.33'],
          ],
        },
        {
          title: 'Sample Size Relationships',
          type: 'callout',
          content: '**Factors that INCREASE sample size:**\n• Higher confidence level desired\n• Lower tolerable error (tighter precision)\n• Higher expected error rate\n• Greater population variability\n\n**Factors that DECREASE sample size:**\n• Lower confidence level acceptable\n• Higher tolerable error\n• Lower expected error rate\n• Smaller population (for finite correction)',
        },
        {
          title: 'Evaluating Sample Results',
          type: 'text',
          content: "**Calculating Upper Deviation Rate:**\n\nAfter testing, compute the upper deviation rate:\n\n**Upper Limit = Sample Rate + Precision Adjustment**\n\n**Decision Rule:**\n• If Upper Limit < Tolerable Rate → Accept (control is effective)\n• If Upper Limit ≥ Tolerable Rate → Reject (control may not be effective)\n\n**Example:**\n• Tolerable rate: 5%\n• Sample: 100 items, 3 exceptions\n• Sample rate: 3%\n• Precision adjustment: 1.5% (from statistical tables)\n• Upper limit: 3% + 1.5% = 4.5%\n• Since 4.5% < 5%, conclude control is effective at stated confidence",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Confidence level, precision, and expected error are the key drivers of sample size',
            'Z-scores: 90% = 1.65, 95% = 1.96, 99% = 2.58',
            'Attribute sampling tests compliance (yes/no); Variables sampling tests amounts',
            'MUS/PPS is most commonly used for substantive testing',
            'Compare upper deviation limit to tolerable rate to evaluate results',
          ],
        },
      ],
    },
  },

  // ============================================================================
  // IFRS VS GAAP COMPARISON
  // ============================================================================
  {
    id: 'CIA3-II-053',
    courseId: 'cia',
    section: 'CIA3',
    title: 'IFRS vs US GAAP: Key Differences for Auditors',
    description: 'Understand the critical differences between IFRS and US GAAP that impact internal audit',
    order: 53,
    duration: 45,
    difficulty: 'advanced',
    topics: ['IFRS', 'US GAAP', 'Financial reporting', 'Global accounting standards'],
    blueprintArea: 'CIA3-II',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'Internal auditors in global organizations must understand both IFRS and US GAAP. The CIA exam tests knowledge of key differences. Over 140 countries use IFRS, while US companies follow US GAAP. Many multinationals must reconcile between both frameworks.',
        },
        {
          title: 'Framework Comparison',
          type: 'text',
          content: "**IFRS (International Financial Reporting Standards)**\n• Issued by: International Accounting Standards Board (IASB)\n• Approach: Principles-based\n• Used by: 140+ countries worldwide\n• Focus: Fair value and economic substance\n\n**US GAAP (Generally Accepted Accounting Principles)**\n• Issued by: Financial Accounting Standards Board (FASB)\n• Approach: Rules-based\n• Used by: United States (SEC registrants required)\n• Focus: Historical cost and detailed guidance\n\n**Key Philosophical Differences:**\n• IFRS emphasizes professional judgment\n• US GAAP provides more specific rules and bright-line tests\n• IFRS uses more fair value measurements\n• US GAAP has more industry-specific guidance",
        },
        {
          title: 'Major Differences: Revenue Recognition',
          type: 'text',
          content: "**Revenue Recognition (ASC 606 / IFRS 15)**\n\nBoth frameworks now use the 5-step model, but differences remain:\n\n**1. Contract Modifications**\n• IFRS: More general guidance\n• GAAP: More specific prospective vs. cumulative treatment\n\n**2. Right of Return**\n• IFRS: More judgment in estimating returns\n• GAAP: More prescriptive rules\n\n**3. Licenses**\n• Some differences in point-in-time vs. over-time recognition\n\n**5-Step Model (Both):**\n1. Identify contract with customer\n2. Identify performance obligations\n3. Determine transaction price\n4. Allocate price to obligations\n5. Recognize revenue when/as obligations satisfied",
        },
        {
          title: 'Major Differences: Inventory',
          type: 'table',
          headers: ['Area', 'IFRS', 'US GAAP'],
          rows: [
            ['LIFO Method', 'PROHIBITED', 'Permitted'],
            ['Inventory Write-Down', 'Lower of cost or NRV', 'Lower of cost or market'],
            ['Write-Down Reversal', 'REQUIRED if value recovers', 'PROHIBITED'],
            ['Biological Assets', 'Fair value (IAS 41)', 'Historical cost'],
          ],
        },
        {
          title: 'Major Differences: Fixed Assets & Leases',
          type: 'table',
          headers: ['Area', 'IFRS', 'US GAAP'],
          rows: [
            ['Revaluation Model', 'Permitted (upward or down)', 'Not permitted (hedge exception)'],
            ['Component Depreciation', 'Required', 'Permitted, often not used'],
            ['Investment Property', 'Fair value option (IAS 40)', 'No separate category'],
            ['Lease Classification', 'Single model (finance lease)', 'Two models (finance and operating)'],
            ['Lease Right-of-Use Asset', 'On balance sheet', 'On balance sheet'],
          ],
        },
        {
          title: 'Major Differences: Financial Instruments',
          type: 'text',
          content: "**Classification:**\n• IFRS (IFRS 9): Three categories based on business model and cash flow characteristics\n  - Amortized cost\n  - FVOCI (Fair Value through Other Comprehensive Income)\n  - FVPL (Fair Value through Profit/Loss)\n\n• GAAP (ASC 320/321): More categories\n  - Trading securities\n  - Available-for-sale\n  - Held-to-maturity\n  - Equity method investments\n\n**Impairment:**\n• IFRS: Expected credit loss model (forward-looking)\n• GAAP: Current expected credit loss (CECL) model - similar approach\n\n**Derivatives:**\n• Both require fair value measurement\n• Hedge accounting rules differ in application",
        },
        {
          title: 'Major Differences: Intangibles & R&D',
          type: 'table',
          headers: ['Area', 'IFRS', 'US GAAP'],
          rows: [
            ['Development Costs', 'Capitalize if criteria met', 'Expense as incurred (exceptions)'],
            ['In-Process R&D', 'Capitalize if acquired', 'Capitalize if acquired'],
            ['Software Development', 'Capitalize development phase', 'More specific capitalization rules'],
            ['Goodwill Impairment', 'One-step test', 'Optional one-step or two-step'],
            ['Goodwill Amortization', 'Not permitted (impairment only)', 'Not permitted (private company option)'],
          ],
        },
        {
          title: 'Memory Aid: Key IFRS-Only Rules',
          type: 'callout',
          content: '**IFRS Allows What GAAP Prohibits (RRIL):**\n\n**R**evaluation of fixed assets upward\n**R**eversal of inventory write-downs\n**I**FRS = no LIFO\n**L**ast-in-first-out is prohibited',
        },
        {
          title: 'Convergence Status',
          type: 'text',
          content: "**Areas of Convergence:**\n• Revenue recognition (ASC 606 / IFRS 15)\n• Leases (ASC 842 / IFRS 16)\n• Credit losses (CECL / ECL models)\n\n**Areas Still Divergent:**\n• Inventory (LIFO, write-down reversal)\n• Fixed asset revaluation\n• Research and development\n• Statement presentation and terminology\n\n**Practical Implications for Auditors:**\n• Verify correct framework applied\n• Review reconciliations for dual reporters\n• Understand management judgments under IFRS\n• Check consistency of accounting policies",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'IFRS is principles-based; US GAAP is rules-based',
            'LIFO is prohibited under IFRS but permitted under US GAAP',
            'IFRS allows/requires reversal of inventory write-downs; US GAAP prohibits',
            'IFRS permits upward revaluation of fixed assets; US GAAP does not',
            'IFRS requires capitalizing development costs meeting criteria; US GAAP expenses most R&D',
          ],
        },
      ],
    },
  },
];

export default ciaMissingTopicsLessons;
