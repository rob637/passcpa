import { Lesson } from '../../types';

export const barLessons: Lesson[] = [
  // ==========================================
  // AREA I: BUSINESS COMBINATIONS & CONSOLIDATIONS (10 Lessons)
  // ==========================================
  {
      id: 'bar-001',
      section: 'BAR',
      title: 'Acquisition Method: Overview',
      description: 'Accounting for business combinations under ASC 805.',
      order: 1,
      duration: 55,
      difficulty: 'intermediate',
      topics: ['Bus Com', 'Acquisition'],
      content: {
          sections: [
              {
                  title: 'The Measurement Principle',
                  type: 'text',
                  content: `Acquirer recognizes assets acquired, liabilities assumed, and non‐controlling interest in the acquiree at their **Fair Values** on the acquisition date.`
              },
              {
                  title: 'CAR IN BIG',
                  type: 'text',
                  content: `The mnemonic for the consolidation elimination entry:
                  
**C:** Common Stock (Sub) - Eliminated
**A:** APIC (Sub) - Eliminated
**R:** Retained Earnings (Sub) - Eliminated

**I:** Investment in Sub - Eliminated
**N:** Non-Controlling Interest - Created

**B:** Balance Sheet Adjustments (to FV)
**I:** Intangible Assets (to FV)
**G:** Goodwill (Plug)`
              }
          ]
      }
  },
  {
      id: 'bar-004',
      section: 'BAR',
      title: 'Consolidation Procedures',
      description: 'Eliminating intercompany transactions and combining statements.',
      order: 4,
      duration: 70,
      difficulty: 'advanced',
      topics: ['Consolidation', 'Bar'],
      content: {
          sections: [
              {
                  title: 'Intercompany Eliminations',
                  type: 'text',
                  content: `You cannot owe money to yourself or make profit selling to yourself.
                  
**Eliminate:**
• Intercompany Payables/Receivables (100%).
• Intercompany Revenue/Expenses (100%).
• Intercompany Profit in Ending Inventory (COGS Adjustment).`
              }
          ]
      }
  },
  
  // ==========================================
  // AREA II: TECHNICAL ACCOUNTING (12 Lessons)
  // ==========================================
  {
      id: 'bar-007',
      section: 'BAR',
      title: 'Derivatives: Forwards, Futures, Options, Swaps',
      description: 'Identifying and valuing derivative instruments.',
      order: 7,
      duration: 65,
      difficulty: 'advanced',
      topics: ['Derivatives', 'Hedging'],
      content: {
          sections: [
              {
                  title: 'Definition (NUNS)',
                  type: 'list',
                  content: [
                      { term: 'N - No Net Investment', definition: 'Little or no initial cash outlay.' },
                      { term: 'U - Underlying', definition: 'The variable (e.g., stock price, interest rate).' },
                      { term: 'N - Notional Amount', definition: 'Currency amount, shares, bushels, etc.' },
                      { term: 'S - Settlement', definition: 'Can be settled net.' }
                  ]
              },
              {
                  title: 'Reporting',
                  type: 'text',
                  content: `All derivatives are recognized on the Balance Sheet at **Fair Value**.
Unrealized Gains/Losses go to **Net Income** (unless it's a specific hedge).`
              }
          ]
      }
  },
  {
      id: 'bar-008',
      section: 'BAR',
      title: 'Hedge Accounting: Fair Value vs Cash Flow',
      description: 'Special accounting treatment to match timing of G/L.',
      order: 8,
      duration: 60,
      difficulty: 'advanced',
      topics: ['Hedging', 'Bar'],
      content: {
          sections: [
              {
                  title: 'Fair Value Hedge',
                  type: 'text',
                  content: `Hedging against change in value of a recognized asset/liability or firm commitment.
                  
• Gain/Loss on Derivative: **Net Income**.
• Gain/Loss on Hedged Item: **Net Income**. (They offset).`
              },
              {
                  title: 'Cash Flow Hedge',
                  type: 'text',
                  content: `Hedging against variability in future cash flows (forecasted transaction).
                  
• Effective Portion: **OCI (PUFI)**.
• Ineffective Portion: **Net Income**.`
              }
          ]
      }
  },

  // ==========================================
  // AREA III: STATE & LOCAL GOVERNMENT - ADVANCED (9 Lessons)
  // ==========================================
  {
      id: 'bar-023',
      section: 'BAR',
      title: 'Capital Assets & Infrastructure (GASB)',
      description: 'Modified approach for infrastructure assets.',
      order: 23,
      duration: 55,
      difficulty: 'intermediate',
      topics: ['Government', 'GASB'],
      content: {
          sections: [
              {
                  title: 'Modified Approach',
                  type: 'text',
                  content: `Governments can choose NOT to depreciate infrastructure (roads, bridges) if:
1. They maintain an asset management system.
2. They document that assets are preserved at a specific condition level.
                  
Instead of depreciation, all **maintenance costs are expensed**.`
              }
          ]
      }
  },
  {
      id: 'bar-025',
      section: 'BAR',
      title: 'Pension Accounting: GASB 68',
      description: 'Net Pension Liability calculation for governments.',
      order: 25,
      duration: 65,
      difficulty: 'advanced',
      topics: ['Pension', 'Government'],
      content: {
          sections: [
              {
                  title: 'Rule of Thumb',
                  type: 'text',
                  content: `**SIR AGE** (Commercial) vs **SIR** (Government).
                  
Governmental Funds (Modified Accrual) only record the "payable" (current portion).
Government-Wide (Accrual) records the full Net Pension Liability.`
              }
          ]
      }
  },

  // ==========================================
  // AREA IV: FINANCIAL ANALYSIS & PLANNING (9 Lessons)
  // ==========================================
  {
      id: 'bar-032',
      section: 'BAR',
      title: 'Ratio Analysis: Liquidity, Solvency, Profitability',
      description: 'Calculating and interpreting key financial ratios.',
      order: 32,
      duration: 55,
      difficulty: 'intermediate',
      topics: ['Ratios', 'Analysis'],
      content: {
          sections: [
              {
                  title: 'Core Ratios',
                  type: 'table',
                  headers: ['Ratio', 'Formula', 'Purpose'],
                  rows: [
                      ['Current Ratio', 'CA / CL', 'Liquidity (Short-term health)'],
                      ['Debt-to-Equity', 'Total Liab / Total Equity', 'Solvency (Long-term risk)'],
                      ['Return on Assets', 'NI / Avg Assets', 'Profitability (Efficiency)'],
                      ['Times Int Earned', 'EBIT / Interest Exp', 'Coverage (Ability to pay debt)']
                  ]
              }
          ]
      }
  },
  {
      id: 'bar-040',
      section: 'BAR',
      title: 'Capital Budgeting: NPV, IRR, Payback',
      description: 'Advanced decision making for investments (Moved from BEC).',
      order: 40,
      duration: 60,
      difficulty: 'advanced',
      topics: ['Capital Budgeting', 'Finance'],
      content: {
          sections: [
              {
                  title: 'NPV Profile',
                  type: 'text',
                  content: `NPV assumes reinvestment at the **Cost of Capital (WACC)**.
IRR assumes reinvestment at the **IRR**.
                  
**Decision Rule:**
If NPV > 0: Accept.
If IRR > WACC: Accept.`
              }
          ]
      }
  }
];
