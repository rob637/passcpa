import { Lesson } from '../../types';

export const tcpLessons: Lesson[] = [
  // ==========================================
  // AREA I: TAX COMPLIANCE & PLANNING FOR INDIVIDUALS (10 Lessons)
  // ==========================================
  {
      id: 'tcp-001',
      section: 'TCP',
      title: 'Gross Income: Need-to-Know Inclusions',
      description: 'Advanced inclusions: illegal income, prizes, scholarships.',
      order: 1,
      duration: 50,
      difficulty: 'intermediate',
      topics: ['Individual Tax', 'Gross Income'],
      content: {
          sections: [
              {
                  title: 'Specific Items',
                  type: 'text',
                  content: `• **Prizes/Awards:** FMV is taxable (exceptions for employee achievement/civic awards donated to charity).
• **Scholarships:** Taxable IF used for room & board. Nontaxable if for tuition/books (degree candidate).
• **Gambling Winnings:** Gross income. Losses itemized to extent of winnings.`
              }
          ]
      }
  },
  {
      id: 'tcp-005',
      section: 'TCP',
      title: 'Passive Activity Losses (PALs)',
      description: 'Limitations on loss deductibility.',
      order: 5,
      duration: 60,
      difficulty: 'advanced',
      topics: ['Tax', 'Losses'],
      content: {
          sections: [
              {
                  title: 'The Buckets',
                  type: 'text',
                  content: `Income is basketed:
1. Active (Wages, Material Participation).
2. Portfolio (Interest, Dividends).
3. Passive (Rental, Limited Partnership).

**Rule:** Passive losses can ONLY offset Passive income.
**Exception:** Mom & Pop Rule (Rental RE) - Deduct up to $25k if AGI < $100k.`
              }
          ]
      }
  },

  // ==========================================
  // AREA II: ENTITY TAX COMPLIANCE (14 Lessons)
  // ==========================================
  {
      id: 'tcp-015',
      section: 'TCP',
      title: 'Consolidated Tax Returns (C-Corps)',
      description: 'Eligibility and mechanics of filing together.',
      order: 15,
      duration: 65,
      difficulty: 'advanced',
      topics: ['C-Corp', 'Consolidation'],
      content: {
          sections: [
              {
                  title: 'Affiliated Group',
                  type: 'text',
                  content: `To file consolidated:
• Parent must own ≥ **80% Voting Power** AND
• Parent must own ≥ **80% Value** of stock.

*Note: This is different from the GAAP consolidation rule (>50%).*`
              }
          ]
      }
  },
  {
      id: 'tcp-020',
      section: 'TCP',
      title: 'Partnership Basis Adjustments (754 Election)',
      description: 'Making inside basis equal outside basis.',
      order: 20,
      duration: 70,
      difficulty: 'advanced',
      topics: ['Partnership', 'Basis'],
      content: {
          sections: [
              {
                  title: 'Section 754',
                  type: 'text',
                  content: `Optional election.
When a partnership interest is sold or partner dies, there is a discrepancy between the new partner's Outside Basis (what they paid) and their share of Inside Basis.

• Section 743(b) adjustment fixes this for the **transferee partner only**.`
              }
          ]
      }
  },

  // ==========================================
  // AREA III: PROPERTY TRANSACTIONS (12 Lessons)
  // ==========================================
  {
      id: 'tcp-028',
      section: 'TCP',
      title: 'Like-Kind Exchanges (1031)',
      description: 'Deferral of gain on real property.',
      order: 28,
      duration: 60,
      difficulty: 'intermediate',
      topics: ['Property', 'Tax Deferral'],
      content: {
          sections: [
              {
                  title: 'Requirements',
                  type: 'list',
                  content: [
                      { term: 'Property', definition: 'Must be Real Property used in trade/business or investment.' },
                      { term: 'Identification', definition: '45 days to identify replacement.' },
                      { term: 'Receipt', definition: '180 days to receive replacement.' }
                  ]
              },
              {
                  title: 'Boot',
                  type: 'text',
                  content: `If you receive Cash or Net Debt Relief (Boot), you recognize **Gain** = Lesser of:
1. Realized Gain
2. Boot Received`
              }
          ]
      }
  }
];
