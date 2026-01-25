import { Lesson } from '../../types';

export const farLessons: Lesson[] = [
  // ==========================================
  // AREA I: CONCEPTUAL FRAMEWORK & STANDARD SETTING (5 Lessons)
  // ==========================================
  {
    id: 'far-001',
    section: 'FAR',
    title: 'FASB Conceptual Framework: Foundation of GAAP',
    description: 'Master the objectives, qualitative characteristics, and elements of financial statements.',
    order: 1,
    duration: 45,
    difficulty: 'beginner',
    topics: ['Conceptual Framework', 'Qualitative Characteristics', 'Elements'],
    content: {
      sections: [
        {
          title: 'The Constitution of Accounting',
          type: 'text',
          content: `The FASB Conceptual Framework is not GAAP itself, but the theory behind GAAP. It guides the standard setters (FASB) and helps practitioners resolve issues not covered by specific standards.`
        },
        {
          title: 'Qualitative Characteristics (SFAC 8)',
          type: 'text',
          content: `**Fundamental Characteristics:**
1. **Relevance:** Predictive Value, Confirmatory Value, Materiality. (Tip: "PCR")
2. **Faithful Representation:** Complete, Neutral, Free from Error. (Tip: "CNF")

**Enhancing Characteristics:**
• Comparability
• Verifiability
• Timeliness
• Understandability`
        },
        {
          title: 'Elements of Financial Statements',
          type: 'list',
          content: [
            { term: 'Assets', definition: 'Probable future economic benefits controlled by the entity.' },
            { term: 'Liabilities', definition: 'Probable future sacrifices of economic benefits.' },
            { term: 'Equity', definition: 'Residual interest in assets (Assets - Liabilities).' },
            { term: 'Investments by Owners', definition: 'Increases in equity from transfers to it.' },
            { term: 'Distributions to Owners', definition: 'Decreases in equity from transfers.' },
            { term: 'Comprehensive Income', definition: 'Change in equity from non-owner sources.' },
            { term: 'Revenues/Expenses', definition: 'Inflows/Outflows from ongoing major operations.' },
            { term: 'Gains/Losses', definition: 'Increases/Decreases from peripheral transactions.' }
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Relevance and Faithful Representation are the two Fundamental qualities.',
            'Conceptual Framework is NOT authoritative GAAP, but a guide.',
            'Memorize "PCR" and "CNF".'
          ]
        }
      ]
    }
  },
  {
    id: 'far-002',
    section: 'FAR',
    title: 'Financial Statements: Components & Presentation',
    description: 'Determine the required financial statements and their proper presentation.',
    order: 2,
    duration: 55,
    difficulty: 'beginner',
    topics: ['Financial Statements', 'Presentation'],
    content: {
      sections: [
        {
          title: 'The Complete Set',
          type: 'list',
          content: [
            { term: 'Statement of Financial Position (Balance Sheet)', definition: 'Point in time. A = L + E.' },
            { term: 'Statement of Earnings (Income Statement)', definition: 'Period of time. Performance.' },
            { term: 'Statement of Comprehensive Income', definition: 'Net Income + OCI.' },
            { term: 'Statement of Cash Flows', definition: 'Operating, Investing, Financing activities.' },
            { term: 'Statement of Changes in Owners\' Equity', definition: 'Reconciliation of beginning to ending equity.' }
          ]
        },
        {
          title: 'Current vs. Non-Current',
          type: 'text',
          content: `**Classified Balance Sheet:** Distinction is based on the operating cycle or one year, whichever is *longer*.
          
• **Current Assets:** Cash, A/R, Inventory, Prepaids.
• **Current Liabilities:** A/P, Wages Payable, Current portion of LTD.`
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Footnotes are an integral part of financial statements.',
            'Understand the Current vs. Non-Current distinction.',
            'Comprehensive Income includes OCI (PUFI).'
          ]
        }
      ]
    }
  },
  {
    id: 'far-003',
    section: 'FAR',
    title: 'GAAP Hierarchy & Standard-Setting Process',
    description: 'Understand the Accounting Standards Codification (ASC) and how new standards are created.',
    order: 3,
    duration: 40,
    difficulty: 'beginner',
    topics: ['FASB', 'ASC', 'Codification'],
    content: {
      sections: [
        {
          title: 'The Single Source of Truth',
          type: 'text',
          content: `**FASB Accounting Standards Codification (ASC)** is the single source of authoritative nongovernmental US GAAP.
          
If it's not in the Codification, it's not GAAP.`
        },
        {
          title: 'The Due Process',
          type: 'list',
          content: [
            { term: '1. Agenda', definition: 'FASB identifies a financial reporting issue.' },
            { term: '2. Discussion Paper (Optional)', definition: 'FASB solicits views.' },
            { term: '3. Exposure Draft', definition: 'FASB issues a proposed standard for public comment.' },
            { term: '4. Accounting Standards Update (ASU)', definition: 'FASB issues the final standard (which amends the ASC).' }
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'ASUs are NOT GAAP; they update the Codification.',
            'SEC guidance is authoritative for public companies.',
            'Private Company Council (PCC) provides alternatives for private companies.'
          ]
        }
      ]
    }
  },
  {
    id: 'far-004',
    section: 'FAR',
    title: 'SEC Reporting: 10-K, 10-Q, 8-K',
    description: 'Navigate the reporting requirements for public companies.',
    order: 4,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['SEC', 'Reporting', 'Public Companies'],
    content: {
      sections: [
        {
          title: 'Key SEC Forms',
          type: 'table',
          headers: ['Form', 'Description', 'Deadline (Large Accelerated)'],
          rows: [
            ['10-K', 'Annual Report. Audited.', '60 days after year-end'],
            ['10-Q', 'Quarterly Report. Reviewed (unaudited).', '40 days after quarter-end'],
            ['8-K', 'Current Report. Major events.', '4 business days after event'],
            ['S-1', 'IPO Registration Statement.', 'Before listing'],
            ['Forms 3, 4, 5', 'Insider trading/holdings.', 'Varies']
          ]
        },
        {
          title: 'Regulation S-X vs S-K',
          type: 'text',
          content: `• **Reg S-X:** Form and content of financial statements (the numbers).
• **Reg S-K:** Non-financial disclosures (MD&A, Description of Business).`
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Know the deadlines for Large Accelerated vs Accelerated vs Non-Accelerated files.',
            '8-K is for major events (e.g., Change in Auditor, Bankruptcy).',
            '10-Q is unaudited but reviewed.'
          ]
        }
      ]
    }
  },
  {
    id: 'far-005',
    section: 'FAR',
    title: 'GAAP vs IFRS: Key Differences',
    description: 'Identify major conceptual differences between US GAAP and International Standards.',
    order: 5,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['IFRS', 'GAAP', 'International'],
    content: {
      sections: [
        {
          title: 'Principles vs. Rules',
          type: 'text',
          content: `• **US GAAP:** Rules-based. Specific guidance for specific industries.
• **IFRS:** Principles-based. More professional judgment required.`
        },
        {
          title: 'Major Differences (Quick List)',
          type: 'list',
          content: [
            { term: 'Inventory', definition: 'IFRS prohibits LIFO. GAAP allows LIFO.' },
            { term: 'Impamiment', definition: 'IFRS allows reversal of impairment losses (except Goodwill). GAAP prohibits reversal (mostly).' },
            { term: 'Development Costs', definition: 'IFRS capitalizes some development costs. GAAP expenses R&D (generally).' }
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'LIFO is strictly USA.',
            'IFRS allows revaluation of PP&E to fair value; GAAP uses historical cost.',
            'Extraordinary items are prohibited in both.'
          ]
        }
      ]
    }
  },

  // ==========================================
  // AREA II: FINANCIAL STATEMENT ACCOUNTS (25 Lessons)
  // Cash & Receivables
  // ==========================================
  {
    id: 'far-006',
    section: 'FAR',
    title: 'Cash & Cash Equivalents',
    description: 'Recognition and measurement of cash, restricted cash, and equivalents.',
    order: 6,
    duration: 35,
    difficulty: 'beginner',
    topics: ['Cash', 'Cash Equivalents'],
    content: {
      sections: [
        {
          title: 'What is Cash?',
          type: 'text',
          content: `Coin, currency, checking accounts, savings accounts, money market funds, deposits not restricted.`
        },
        {
          title: 'Cash Equivalents',
          type: 'text',
          content: `Short-term, highly liquid investments that are:
1. Readily convertible to known amounts of cash.
2. Original maturity of **3 months or less** from date of purchase.

*Examples:* Treasury bills, Commercial paper, Money market funds.`
        },
        {
          title: 'Restricted Cash',
          type: 'warning',
          content: `If cash is set aside for a specific purpose (e.g., bond sinking fund), it is RESTRICTED.
• If for current liability -> Current Asset.
• If for long-term liab -> Non-Current Asset.`
        },
        {
            title: 'Bank Overdrafts',
            type: 'text',
            content: `Generally a **current liability**. Exception: If the entity has another account at the *same bank* with a positive balance, right of offset applies.`
        }
      ]
    }
  },
  {
    id: 'far-007',
    section: 'FAR',
    title: 'Bank Reconciliations',
    description: 'Reconciling the bank statement to the general ledger balance.',
    order: 7,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Bank Rec', 'Cash'],
    content: {
      sections: [
        {
            title: 'The Formulas',
            type: 'table',
            headers: ['Bank Balance', 'Book Balance'],
            rows: [
                ['Balance per Bank', 'Balance per Books'],
                ['+ Deposits in Transit', '+ Notes Collected by Bank'],
                ['- Outstanding Checks', '- Service Charges'],
                ['+/- Bank Errors', '- NSF Checks'],
                ['', '+/- Book Errors'],
                ['= Adjusted Cash Balance', '= Adjusted Cash Balance']
            ]
        },
        {
            title: 'Logic Check',
            type: 'text',
            content: `**Goal:** Both sides must equal the "True" (Adjusted) Balance.
            
• Items on the **Bank** side are things the Bank doesn't know about yet (DIT, O/S Checks).
• Items on the **Book** side are things the Company doesn't know about yet (Service charges, NSF).`
        },
        {
            title: 'Key Takeaways',
            type: 'summary',
            content: [
                'Always adjust to the "True" balance.',
                'Only journalize items on the "Book" side.',
                'NSF checks are Accounts Receivable (Debtors), not Expenses.'
            ]
        }
      ]
    }
  },
  {
    id: 'far-008',
    section: 'FAR',
    title: 'Accounts Receivable & Allowance Methods',
    description: 'Valuation of A/R and estimating uncollectible accounts.',
    order: 8,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['A/R', 'Bad Debt'],
    content: {
      sections: [
          {
              title: 'Net Realizable Value (NRV)',
              type: 'text',
              content: `Accounts Receivable must be shown at NRV.
              
**A/R (Gross) - Allowance for Doubtful Accounts = NRV**`
          },
          {
              title: 'Methods of Estimation',
              type: 'list',
              content: [
                  { term: 'Percentage of Sales (Income Statement Approach)', definition: 'Focuses on matching. % of Credit Sales = Bad Debt Expense. Fast but less accurate for BS.' },
                  { term: 'Percentage of Receivables (Balance Sheet Approach)', definition: 'Focuses on valuation. Target ending Allowance balance based on aging. Bad Debt Expense is the "plug".' },
                  { term: 'Aging of Receivables', definition: 'Most accurate. Older debts get higher % uncollectible rates.' }
              ]
          },
          {
              title: 'Write-Offs',
              type: 'text',
              content: `Dr. Allowance for Doubtful Accounts
  Cr. Accounts Receivable
  
*Note:* This entry has NO effect on Net Income or Total Assets (NRV stays same).`
          }
      ]
    }
  },
  {
    id: 'far-009',
    section: 'FAR',
    title: 'CECL: Current Expected Credit Losses',
    description: 'Understanding the ASU 2016-13 forward-looking impairment model.',
    order: 9,
    duration: 60,
    difficulty: 'advanced',
    topics: ['CECL', 'Impairment'],
    content: {
      sections: [
          {
              title: 'Incurred Loss vs. Expected Loss',
              type: 'text',
              content: `**Old Model:** Wait until a loss is probable (Incurred).
**CECL Model:** Record expected lifetime losses at inception.`
          },
          {
              title: 'Scope',
              type: 'text',
              content: `Applies to financial assets measured at amortized cost:
• Trade Receivables
• Debt Securities (HTM)
• Net Investment in Leases`
          },
          {
              title: 'Measurement',
              type: 'text',
              content: `Based on:
1. Past events (historical loss experience).
2. Current conditions.
3. Reasonable and supportable forecasts.`
          }
      ]
    }
  },
  {
    id: 'far-010',
    section: 'FAR',
    title: 'Notes Receivable & Impairment',
    description: 'Accounting for N/R with and without stated interest rates.',
    order: 10,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Notes Receivable', 'Interest'],
    content: {
        sections: [
            {
                title: 'Non-Interest Bearing Notes',
                type: 'text',
                content: `If a note has no stated rate (or an unreasonable rate), you must impute interest at the market rate.
                
**Present Value** of future cash flows = Recording Value.
The specific difference between Face Value and Present Value is the **Discount on Note Receivable**.`
            },
            {
                title: 'Amortizing the Discount',
                type: 'text',
                content: `The discount is amortized over the life of the note using the **Effective Interest Method**.
                
Interest Revenue = Carrying Value × Market Rate`
            }
        ]
    }
  },
  {
      id: 'far-011',
      section: 'FAR',
      title: 'Factoring, Pledging & Transfers of Receivables',
      description: 'Sale vs. Secured Borrowing treatment for receivables.',
      order: 11,
      duration: 50,
      difficulty: 'advanced',
      topics: ['Factoring', 'Transfers'],
      content: {
          sections: [
              {
                  title: 'Sale vs. Borrowing',
                  type: 'text',
                  content: `**Sale:** Receiver "controls" the asset. Transferor derecognizes A/R and records Gain/Loss.
**Borrowing (Pledging):** Transferor keeps A/R on books, records a liability (Loan).`
              },
              {
                  title: 'Factoring',
                  type: 'list',
                  content: [
                      { term: 'With Recourse', definition: 'Seller guarantees payment. Usually a Borrowing (unless control surrendered).' },
                      { term: 'Without Recourse', definition: 'Factor assumes risk of loss. Always a Sale. Seller expenses the fee and loss.' }
                  ]
              }
          ]
      }
  },

  // ==========================================
  // Inventory
  // ==========================================
  {
      id: 'far-012',
      section: 'FAR',
      title: 'Inventory Cost Flow: FIFO, LIFO, Weighted Avg',
      description: 'Calculate Ending Inventory and COGS using flow assumptions.',
      order: 12,
      duration: 55,
      difficulty: 'intermediate',
      topics: ['Inventory', 'Cost Accounting'],
      content: {
          sections: [
              {
                  title: 'In Times of Rising Prices (Inflation)',
                  type: 'table',
                  headers: ['Method', 'COGS', 'End Inv', 'Net Income'],
                  rows: [
                      ['FIFO', 'Lowest', 'Highest', 'Highest'],
                      ['LIFO', 'Highest', 'Lowest', 'Lowest'],
                      ['Weighted Avg', 'Middle', 'Middle', 'Middle']
                  ]
              },
              {
                  title: 'Periodic vs. Perpetual',
                  type: 'text',
                  content: `• **FIFO:** Same result under Periodic and Perpetual.
• **LIFO/Weighted Avg:** Different results depending on system.`
              },
              {
                  title: 'Key Takeaways',
                  type: 'summary',
                  content: [
                      'LIFO saves tax dollars in inflationary times (Lower Income).',
                      'FIFO represents physical flow for most businesses.'
                  ]
              }
          ]
      }
  },
  {
      id: 'far-013',
      section: 'FAR',
      title: 'Lower of Cost or Market / NRV',
      description: 'Valuation of inventory subsequent to acquisition.',
      order: 13,
      duration: 45,
      difficulty: 'intermediate',
      topics: ['Inventory', 'Valuation'],
      content: {
          sections: [
              {
                  title: 'The Two Rules',
                  type: 'list',
                  content: [
                      { term: 'Lower of Cost or NRV', definition: 'Use for FIFO and Weighted Average.' },
                      { term: 'Lower of Cost or Market', definition: 'Use for LIFO and Retail Inventory Method.' }
                  ]
              },
              {
                  title: 'Defining "Market" (LIFO)',
                  type: 'text',
                  content: `Market is the **Replacement Cost**, constrained by a ceiling and floor:
• **Ceiling:** NRV (Selling Price - Selling Cost)
• **Floor:** NRV - Normal Profit Margin
                  
*Rule:* Market is the middle value of [Replacement, Ceiling, Floor]. Compare that middle value to Cost.`
              }
          ]
      }
  },
  {
      id: 'far-014',
      section: 'FAR',
      title: 'Dollar-Value LIFO',
      description: 'Converting inventory at current prices to base year prices and back.',
      order: 14,
      duration: 70,
      difficulty: 'advanced',
      topics: ['LIFO', 'Inventory'],
      content: {
          sections: [
              {
                  title: 'Steps',
                  type: 'list',
                  content: [
                      { term: '1. Deflate', definition: 'Convert Ending Inventory at Current Cost to Base Year Cost using price index.' },
                      { term: '2. Compare', definition: 'Compare to Beginning Inventory at Base Year Cost to find the "Layer" added.' },
                      { term: '3. Inflate', definition: 'Multiply the specific Layer by the specific year\'s Price Index.' }
                  ]
              },
              {
                  title: 'Price Index Calculation',
                  type: 'text',
                  content: `Price Index = Ending Inventory at Current Cost / Ending Inventory at Base Year Cost`
              }
          ]
      }
  },
  {
      id: 'far-015',
      section: 'FAR',
      title: 'Inventory Errors & Period Corrections',
      description: 'Impact of errors on Financial Statements.',
      order: 15,
      duration: 40,
      difficulty: 'intermediate',
      topics: ['Errors', 'Inventory'],
      content: {
          sections: [
              {
                  title: 'Self-Correcting Errors',
                  type: 'text',
                  content: `Inventory errors reverse themselves over 2 years.
                  
Example: **Overstated Ending Inventory (Year 1)**
• Year 1: COGS Understated -> NI Overstated -> RE Overstated.
• Year 2: Beg Inv Overstated -> COGS Overstated -> NI Understated -> RE Correct.`
              },
              {
                  title: 'The COGS Formula',
                  type: 'text',
                  content: `Beg Inv + Purchases - End Inv = COGS.
                  
Use this formula to trace the error.`
              }
          ]
      }
  },

  // ==========================================
  // PP&E
  // ==========================================
  {
    id: 'far-016',
    section: 'FAR',
    title: 'PP&E Acquisition & Capitalization',
    description: 'What costs to capitalize vs expense for fixed assets.',
    order: 16,
    duration: 50,
    difficulty: 'beginner',
    topics: ['PPE', 'Capitalization'],
    content: {
      sections: [
        {
          title: 'General Rule',
          type: 'text',
          content: `Capitalize all costs necessary to get the asset to the location and condition for its intended use.`
        },
        {
          title: 'Specific Assets',
          type: 'list',
          content: [
            { term: 'Land', definition: 'Purchase price + closing costs + razing old building - salvage proceeds. NEVER DEPRECIATE LAND.' },
            { term: 'Equipment', definition: 'Purchase price + freight-in + installation + testing.' },
            { term: 'Buildings (Constructed)', definition: 'Materials + Labor + Overhead + Interest during construction.' }
          ]
        },
        {
          title: 'Capitalized Interest',
          type: 'text',
          content: `Only on assets constructed for own use. Based on Weighted Average Accumulated Expenditures (WAAE). Limit: Cannot exceed actual interest incurred.`
        }
      ]
    }
  },
  {
    id: 'far-017',
    section: 'FAR',
    title: 'Depreciation Methods',
    description: 'Straight-line, DDB, Units of Production, and Sum-of-Years Digits.',
    order: 17,
    duration: 55,
    difficulty: 'beginner',
    topics: ['Depreciation'],
    content: {
      sections: [
        {
          title: 'Straight-Line',
          type: 'text',
          content: `(Cost - Salvage) / Useful Life`
        },
        {
          title: 'Double Declining Balance (DDB)',
          type: 'text',
          content: `2 / Useful Life × Book Value at Beginning of Year.
          
*Note:* Ignore salvage value in the calculation basis, but DO NOT depreciate below salvage value.`
        },
        {
          title: 'Sum-of-the-Years\' Digits (SYD)',
          type: 'text',
          content: `(Cost - Salvage) × (Remaining Life / Sum of Years)
          
Sum of Years denominator = N(N+1)/2`
        }
      ]
    }
  },
  {
    id: 'far-018',
    section: 'FAR',
    title: 'Asset Impairment: Long-Lived Assets',
    description: 'Two-step impairment test for PP&E.',
    order: 18,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Impairment', 'PPE'],
    content: {
      sections: [
        {
          title: 'The Two-Step Test (Finite Life)',
          type: 'list',
          content: [
            { term: '1. Recoverability Test', definition: 'Is Carrying Value > Undiscounted Future Cash Flows? If yes, proceed to step 2.' },
            { term: '2. Measurement', definition: 'Impairment Loss = Carrying Value - Fair Value (or Discounted Cash Flows).' }
          ]
        },
        {
          title: 'Restoration',
          type: 'warning',
          content: `Under US GAAP, you **cannot** reverse an impairment loss on assets held for use.`
        }
      ]
    }
  },
  {
    id: 'far-019',
    section: 'FAR',
    title: 'Disposals & Nonmonetary Exchanges',
    description: 'Commercial substance and gain recognition rules.',
    order: 19,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Exchanges', 'Disposals'],
    content: {
      sections: [
        {
          title: 'Commercial Substance',
          type: 'text',
          content: `If the exchange has commercial substance (future cash flows change): **Recognize All Gains and Losses.**`
        },
        {
          title: 'Lacks Commercial Substance',
          type: 'list',
          content: [
            { term: 'No Cash Received', definition: 'Defer Gain.' },
            { term: 'Some Cash Received (Boot < 25%)', definition: 'Recognize proportional gain.' },
            { term: 'Major Cash Received (Boot > 25%)', definition: 'Viewed as a monetary sale. Recognize All Gain.' },
            { term: 'Loss', definition: 'Always recognize losses immediately (conservatism).' }
          ]
        }
      ]
    }
  }
];
