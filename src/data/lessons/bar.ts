import { Lesson } from '../../types';

export const barLessons: Lesson[] = [
  {
    id: 'BAR-I-001',
    section: 'BAR',
    title: "Acquisition Method: Overview",
    description: "Master the acquisition method for business combinations under ASC 805",
    order: 1,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Business Combinations"],
    blueprintArea: 'BAR-I',
    blueprintTopic: 'BAR-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Business combinations are complex transactions that reshape corporate structures! The acquisition method is the ONLY method for accounting for business combinations. Understanding these rules is essential for BAR and advanced financial reporting!"
        },
        {
          title: 'Acquisition Method Overview',
          type: 'text',
          content: "**ASC 805 requires the acquisition method:**\n\n• Replaced pooling-of-interests method\n• Applies to ALL business combinations\n• One party is always the acquirer\n• Assets/liabilities measured at fair value\n\n**Key date: Acquisition date (control obtained)**"
        },
        {
          title: 'Four Steps of Acquisition Method',
          type: 'table',
          headers: ['Step', 'Action'],
          rows: [
            ['1', 'Identify the acquirer'],
            ['2', 'Determine acquisition date'],
            ['3', 'Recognize and measure identifiable assets/liabilities'],
            ['4', 'Recognize and measure goodwill or bargain purchase gain']
          ]
        },
        {
          title: '🧠 Memory Aid: Acquisition Method',
          type: 'callout',
          content: "**\"IADG\"** for acquisition method:\n\n**I**dentify the acquirer\n**A**cquisition date determined\n**D**etermine fair values\n**G**oodwill (or bargain gain) recognized\n\n**IADG = Acquisition method steps!**"
        },
        {
          title: 'Identifying the Acquirer',
          type: 'text',
          content: "**The acquirer is the entity that obtains CONTROL:**\n\n**Indicators of control:**\n• Voting rights transferred\n• Relative size\n• Who initiates the combination\n• Who has power over governance\n\n**Variable interest entities: Consider primary beneficiary**"
        },
        {
          title: 'Acquisition Date',
          type: 'text',
          content: "**Date when acquirer obtains control:**\n\n• Generally the closing date\n• Can be different from agreement date\n• All measurements made as of this date\n\n**Control = Power to govern financial/operating policies**"
        },
        {
          title: '⚠️ Exam Trap: Control Definition',
          type: 'warning',
          content: "**Control ≠ 100% ownership!**\n\n**Control typically exists with:**\n• >50% voting interest\n• Or contractual arrangements\n• Or variable interest relationship\n\n**Less than majority ownership can still be control!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Acquisition method is ONLY method for business combinations",
            "Four steps: Identify acquirer, date, measure, recognize goodwill",
            "Acquirer is entity obtaining control",
            "Acquisition date = Date control obtained",
            "All assets/liabilities measured at fair value at acquisition date",
            "Control doesn't require 100% ownership"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-I-002',
    section: 'BAR',
    title: "Measuring Consideration Transferred",
    description: "Understand how to measure purchase price in business combinations",
    order: 2,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Business Combinations"],
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Consideration transferred determines goodwill! Getting this measurement right—including contingent consideration—is critical for proper business combination accounting on BAR!"
        },
        {
          title: 'Components of Consideration',
          type: 'text',
          content: "**Consideration transferred includes:**\n\n• Cash\n• Other assets transferred\n• Liabilities incurred to former owners\n• Equity interests issued\n• Contingent consideration\n\n**Measured at FAIR VALUE at acquisition date**"
        },
        {
          title: 'Fair Value Measurement',
          type: 'table',
          headers: ['Consideration Type', 'Measurement'],
          rows: [
            ['Cash', 'Face amount'],
            ['Non-cash assets', 'Fair value (may trigger gain/loss)'],
            ['Stock issued', 'Fair value of shares on acquisition date'],
            ['Liabilities assumed', 'Fair value'],
            ['Contingent consideration', 'Fair value at acquisition date']
          ]
        },
        {
          title: '🧠 Memory Aid: Consideration',
          type: 'callout',
          content: "**\"SCALE\"** for consideration:\n\n**S**tock issued (FV)\n**C**ash paid\n**A**ssets transferred (FV)\n**L**iabilities assumed\n**E**arnouts (contingent consideration)\n\n**All at FAIR VALUE!**"
        },
        {
          title: 'Contingent Consideration',
          type: 'text',
          content: "**Earnouts and contingent payments:**\n\n• Included at acquisition date FV\n• Classified as liability or equity\n• Liability: Remeasured each period (changes in P&L)\n• Equity: NOT remeasured\n\n**Probability-weighted expected value often used**"
        },
        {
          title: 'Acquisition Costs',
          type: 'text',
          content: "**NOT part of consideration transferred:**\n\n• Finder's fees\n• Advisory/legal/accounting fees\n• General administrative costs\n\n**These are EXPENSED as incurred!**\n\n**Exception:** Stock issuance costs reduce equity"
        },
        {
          title: '⚠️ Exam Trap: Acquisition Costs',
          type: 'warning',
          content: "**Don't capitalize acquisition costs!**\n\n**Old rules:** Capitalized as part of purchase price\n**Current rules:** EXPENSED immediately\n\n**Example:**\n• Legal fees: $500K → Expense\n• Due diligence: $200K → Expense\n• Investment banker: $1M → Expense\n\n**Only stock issuance costs reduce equity!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Consideration = Cash + Assets + Stock + Liabilities + Contingent",
            "All measured at fair value at acquisition date",
            "Contingent consideration: FV at acquisition date",
            "Liability contingent consideration: Remeasured each period",
            "Acquisition costs are EXPENSED (not capitalized)",
            "Stock issuance costs reduce additional paid-in capital"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-I-003',
    section: 'BAR',
    title: "Goodwill & Bargain Purchases",
    description: "Master goodwill calculation and bargain purchase accounting",
    order: 3,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Business Combinations"],
    blueprintArea: 'BAR-I',
    blueprintTopic: 'BAR-I-A-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Goodwill is what makes acquisitions premium deals! Understanding when goodwill arises versus a bargain purchase gain is fundamental to business combination accounting on BAR!"
        },
        {
          title: 'Goodwill Calculation',
          type: 'text',
          content: "**Basic formula:**\n\nConsideration transferred\n+ NCI fair value (if applicable)\n+ Previously held equity interest FV\n− Net identifiable assets acquired (at FV)\n= **Goodwill**\n\n**Goodwill = Excess purchase price over net assets**"
        },
        {
          title: 'Components of Goodwill',
          type: 'text',
          content: "**Goodwill represents:**\n\n• Synergies expected from combination\n• Value of assembled workforce\n• Going concern value\n• Expected future benefits not separately recognized\n\n**Not amortized—tested for impairment annually!**"
        },
        {
          title: '🧠 Memory Aid: Goodwill',
          type: 'callout',
          content: "**\"Goodwill = PREMIUM\"**\n\n**P**rice paid\n**R**educed by\n**E**stimated fair value of\n**M**easurable\n**I**dentifiable\n**U**nderlying\n**M**erged assets/liabilities\n\n**Premium over identifiable net assets!**"
        },
        {
          title: 'Bargain Purchase',
          type: 'text',
          content: "**When net assets exceed consideration:**\n\n**Bargain purchase = Negative goodwill**\n\n**Before recognizing gain:**\n1. Reassess identification of assets/liabilities\n2. Review measurement procedures\n3. Confirm fair values are correct\n\n**If still exists: Recognize GAIN in income!**"
        },
        {
          title: 'Bargain Purchase Situations',
          type: 'table',
          headers: ['Scenario', 'Result'],
          rows: [
            ['Distressed seller', 'Possible bargain purchase'],
            ['Forced liquidation', 'Possible bargain purchase'],
            ['FV calculation error', 'Correct before recognizing gain'],
            ['Measurement period adjustment', 'Retrospective adjustment']
          ]
        },
        {
          title: '⚠️ Exam Trap: Goodwill Impairment',
          type: 'warning',
          content: "**Goodwill is NOT amortized!**\n\n**Instead:**\n• Tested annually for impairment\n• Tested when triggering events occur\n• Impairment = Carrying amount > Fair value\n• Write down to FV; NEVER write back up\n\n**Goodwill impairment is a one-way street!**"
        },
        {
          title: 'Measurement Period',
          type: 'text',
          content: "**Up to one year after acquisition:**\n\n• Adjustments allowed for provisional amounts\n• New information about facts existing at acquisition date\n• Retrospective adjustment to goodwill\n• Not new events after acquisition date\n\n**One year max from acquisition date**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Goodwill = Consideration − Net identifiable assets at FV",
            "Goodwill: NOT amortized, tested for impairment",
            "Bargain purchase: Recognize gain (after reassessment)",
            "Measurement period: Up to 1 year for adjustments",
            "Impairment losses: Never reversed",
            "Always reassess before recognizing bargain gain"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-I-004',
    section: 'BAR',
    title: "Consolidation Procedures",
    description: "Master the mechanics of preparing consolidated financial statements",
    order: 4,
    duration: 70,
    difficulty: 'advanced',
    topics: ["Business Combinations", "Consolidation"],
    blueprintArea: 'BAR-I',
    blueprintTopic: 'BAR-I-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Consolidated financial statements present the parent and subsidiaries as a single economic entity! Understanding elimination entries and consolidation mechanics is essential for BAR!"
        },
        {
          title: 'Consolidation Requirement',
          type: 'text',
          content: "**Consolidation required when:**\n\n• Parent has controlling financial interest\n• Typically >50% voting interest\n• Or control through VIE relationship\n\n**Present parent + subsidiaries as ONE entity**"
        },
        {
          title: 'Basic Elimination Entries',
          type: 'table',
          headers: ['Entry Type', 'Purpose'],
          rows: [
            ['Investment elimination', 'Remove investment account against subsidiary equity'],
            ['Intercompany receivables/payables', 'Eliminate internal balances'],
            ['Intercompany revenues/expenses', 'Eliminate internal transactions'],
            ['Intercompany profit/inventory', 'Eliminate unrealized profits'],
            ['Intercompany dividends', 'Eliminate subsidiary dividends to parent']
          ]
        },
        {
          title: '🧠 Memory Aid: Eliminations',
          type: 'callout',
          content: "**\"DRIP\"** eliminations:\n\n**D**ividends (intercompany)\n**R**eciprocal accounts (A/R, A/P)\n**I**nvestment vs equity\n**P**rofits (unrealized intercompany)\n\n**DRIP away the intercompany stuff!**"
        },
        {
          title: 'Investment Elimination Entry',
          type: 'text',
          content: "**At acquisition:**\n\nDR: Common stock (subsidiary)\nDR: APIC (subsidiary)\nDR: Retained earnings (subsidiary)\nDR: Identifiable assets (FV adjustments)\nDR: Goodwill\n    CR: Investment in subsidiary\n    CR: NCI (if < 100%)\n\n**Eliminates investment against subsidiary equity**"
        },
        {
          title: 'Post-Acquisition Consolidation',
          type: 'text',
          content: "**Each subsequent period:**\n\n1. Eliminate investment vs. equity (at acquisition amounts)\n2. Adjust for acquisition-date FV differences\n3. Eliminate intercompany transactions\n4. Allocate subsidiary income to NCI\n5. Eliminate intercompany dividends"
        },
        {
          title: '⚠️ Exam Trap: Consolidated Retained Earnings',
          type: 'warning',
          content: "**Consolidated RE ≠ Parent RE + Sub RE**\n\n**Consolidated RE includes:**\n• Parent's RE\n• Parent's share of sub's post-acquisition RE\n• Less intercompany profits NOT yet realized\n\n**Subsidiary pre-acquisition RE is eliminated!**"
        },
        {
          title: 'Consolidation Worksheet',
          type: 'text',
          content: "**Columns typically include:**\n\n• Parent book balances\n• Subsidiary book balances\n• Eliminations (DR)\n• Eliminations (CR)\n• Consolidated balances\n\n**Work through methodically—debits = credits in eliminations!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Consolidation: Present parent + subs as single entity",
            "Eliminate investment account against subsidiary equity",
            "Eliminate ALL intercompany transactions",
            "Unrealized intercompany profit must be deferred",
            "NCI gets allocation of subsidiary income",
            "Consolidated RE includes only post-acquisition sub earnings"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-I-005',
    section: 'BAR',
    title: "Intercompany Transactions: Inventory",
    description: "Master elimination of unrealized profit in intercompany inventory sales",
    order: 5,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Business Combinations", "Consolidation"],
    blueprintArea: 'BAR-I',
    blueprintTopic: 'BAR-I-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Intercompany inventory sales create unrealized profit that must be eliminated! Whether upstream or downstream, the consolidated entity can't recognize profit on internal transfers. Master these adjustments for BAR!"
        },
        {
          title: 'Upstream vs. Downstream',
          type: 'text',
          content: "**Direction matters for NCI:**\n\n**Downstream:** Parent sells to subsidiary\n• 100% unrealized profit to parent\n• NCI unaffected\n\n**Upstream:** Subsidiary sells to parent\n• Unrealized profit in subsidiary's income\n• NCI shares in the adjustment"
        },
        {
          title: 'Basic Elimination',
          type: 'table',
          headers: ['Transaction', 'Elimination Entry'],
          rows: [
            ['Intercompany sale', 'DR: Sales; CR: COGS'],
            ['Unrealized profit (in ending inventory)', 'DR: COGS; CR: Inventory'],
            ['Beginning inventory profit (from prior year)', 'DR: RE; CR: COGS']
          ]
        },
        {
          title: '🧠 Memory Aid: Inventory Profit',
          type: 'callout',
          content: "**\"UNSOLD = UNREALIZED\"**\n\n• If inventory is SOLD outside the group → Profit is realized\n• If inventory is STILL HELD → Profit is unrealized\n\n**Only eliminate profit in ending inventory!**"
        },
        {
          title: 'Calculation Example',
          type: 'text',
          content: "**Example:**\n• Parent sells inventory to sub for $100K\n• Cost to parent: $70K (gross profit = $30K)\n• Sub holds $40K of inventory at year-end\n\n**Unrealized profit:**\n$40K × 30% gross profit rate = $12K\n\n**Entry:**\nDR: COGS $12K\nCR: Inventory $12K"
        },
        {
          title: 'Downstream Sale Impact',
          type: 'text',
          content: "**Parent sells to subsidiary:**\n\n• Eliminate 100% of unrealized profit\n• Entire adjustment affects parent's income\n• NCI is NOT affected\n• NCI still gets its share of sub's income\n\n**Parent bears all unrealized profit adjustment**"
        },
        {
          title: '⚠️ Exam Trap: Upstream Sale & NCI',
          type: 'warning',
          content: "**Upstream sale = NCI affected!**\n\n**When subsidiary sells to parent:**\n• Unrealized profit is in subsidiary's income\n• Must allocate adjustment between parent and NCI\n• NCI bears its percentage share\n\n**Example:** Sub has 20% NCI, $10K unrealized profit\n• NCI share: 20% × $10K = $2K reduction"
        },
        {
          title: 'Prior Year Unrealized Profit',
          type: 'text',
          content: "**Beginning inventory:**\n\n• Was unrealized last year\n• Now sold to third party = REALIZED\n• Must adjust beginning RE (consolidation entry)\n\n**Entry:**\nDR: Beginning RE\nCR: COGS\n\n**Reverses prior year elimination**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Eliminate unrealized profit in ending inventory",
            "Downstream (parent→sub): 100% to parent, NCI unaffected",
            "Upstream (sub→parent): Allocate to parent AND NCI",
            "Entry: DR COGS, CR Inventory",
            "Prior year unrealized → Adjust beginning RE when realized",
            "Calculate based on gross profit percentage"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-I-006',
    section: 'BAR',
    title: "Intercompany Transactions: Fixed Assets",
    description: "Master elimination of gain/loss on intercompany fixed asset transfers",
    order: 6,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Business Combinations", "Consolidation"],
    blueprintArea: 'BAR-I',
    blueprintTopic: 'BAR-I-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Fixed asset transfers between affiliates require special treatment! The gain/loss must be eliminated and depreciation adjusted over the asset's life. These multi-year adjustments are frequently tested on BAR!"
        },
        {
          title: 'Basic Principle',
          type: 'text',
          content: "**No profit on internal transfers:**\n\n• Gain/loss on intercompany fixed asset sale is unrealized\n• Asset must be at ORIGINAL cost to consolidated entity\n• Depreciation based on original cost, not transfer price\n\n**Unrealized gain realized through depreciation over time**"
        },
        {
          title: 'Year of Sale Elimination',
          type: 'table',
          headers: ['Entry', 'Purpose'],
          rows: [
            ['DR: Gain on sale; CR: Equipment', 'Eliminate gain and restore asset to original cost'],
            ['DR: Accumulated depreciation', 'Restore original accumulated depreciation'],
            ['DR: Equipment; CR: Depreciation expense', 'Adjust excess depreciation']
          ]
        },
        {
          title: '🧠 Memory Aid: Fixed Asset Transfer',
          type: 'callout',
          content: "**\"GRAD\"** for fixed asset eliminations:\n\n**G**ain eliminated\n**R**estore asset to original cost\n**A**djust accumulated depreciation\n**D**epreciation expense corrected\n\n**GRAD-ually realize through depreciation!**"
        },
        {
          title: 'Depreciation Adjustment',
          type: 'text',
          content: "**If asset sold at gain:**\n\n• Transferee depreciates higher amount\n• Excess depreciation = Realization of gain\n• Consolidated depreciation based on ORIGINAL cost\n\n**Each year:**\nDR: Accumulated depreciation\nCR: Depreciation expense\n\n**Reduces depreciation to original cost basis**"
        },
        {
          title: 'Example Calculation',
          type: 'text',
          content: "**Example:**\n• Parent sells equipment to sub for $100K\n• Original cost: $80K; Accum depr: $20K; BV: $60K\n• Gain: $40K ($100K − $60K)\n• Remaining life: 4 years\n\n**Annual adjustment:**\n• Excess depreciation: $40K ÷ 4 = $10K/year\n• Gain realized: $10K/year through depreciation"
        },
        {
          title: '⚠️ Exam Trap: Land Transfers',
          type: 'warning',
          content: "**Land is NOT depreciated!**\n\n**Intercompany land transfer:**\n• Gain eliminated entirely\n• Stays unrealized until land sold to outside party\n• No gradual realization\n\n**Land gain only realized when sold OUTSIDE the group!**"
        },
        {
          title: 'Subsequent Years',
          type: 'text',
          content: "**Years after transfer:**\n\nDR: Beginning RE (original gain)\nCR: Equipment (cost difference)\nDR: Accumulated depreciation (original balance)\nCR: Beginning RE (cumulative depreciation adjustments)\nDR: Accumulated depreciation\nCR: Depreciation expense (current year)\n\n**Track cumulative realized amount!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Eliminate entire gain/loss on intercompany fixed asset sale",
            "Restore asset to original cost to consolidated entity",
            "Gain realized through depreciation over remaining life",
            "Land gains remain unrealized until external sale",
            "Upstream vs downstream affects NCI allocation",
            "Track cumulative adjustments in subsequent years"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-I-007',
    section: 'BAR',
    title: "Noncontrolling Interests",
    description: "Master accounting for minority shareholders in consolidated statements",
    order: 7,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Business Combinations", "Consolidation"],
    blueprintArea: 'BAR-I',
    blueprintTopic: 'BAR-I-B-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "When parent owns less than 100%, outside shareholders have a noncontrolling interest! NCI must be properly measured, presented, and allocated its share of income. Understanding NCI is critical for BAR!"
        },
        {
          title: 'NCI Definition',
          type: 'text',
          content: "**Noncontrolling interest (NCI):**\n\n• Equity in subsidiary NOT owned by parent\n• Also called minority interest\n• Part of consolidated equity\n• Presented separately from parent's equity\n\n**Example:** Parent owns 80% → NCI = 20%"
        },
        {
          title: 'NCI Measurement at Acquisition',
          type: 'table',
          headers: ['Method', 'Measurement'],
          rows: [
            ['Fair value method', 'NCI at full fair value (includes NCI share of goodwill)'],
            ['Proportionate share', 'NCI % × Fair value of net identifiable assets'],
            ['US GAAP', 'Fair value method REQUIRED']
          ]
        },
        {
          title: '🧠 Memory Aid: NCI',
          type: 'callout',
          content: "**\"SEPIA\"** for NCI:\n\n**S**eparately presented in equity\n**E**arnings allocated proportionally\n**P**art of consolidated equity (not liability)\n**I**nitially at fair value\n**A**djusted for share of income/dividends\n\n**NCI = Outside owners' stake!**"
        },
        {
          title: 'NCI in Consolidated Income',
          type: 'text',
          content: "**Allocation of subsidiary income:**\n\n• NCI gets proportionate share\n• Presented as allocation, not expense\n• Shown after consolidated net income\n\n**Presentation:**\nNet income\n  Less: NCI share\n  Net income attributable to parent"
        },
        {
          title: 'NCI Balance Sheet Presentation',
          type: 'text',
          content: "**Equity section:**\n\n• NCI shown in equity\n• Separate from parent's equity\n• NOT a liability\n\n**Stockholders' equity:**\n  Parent equity: $XXX\n  Noncontrolling interest: $XXX\n  Total equity: $XXX"
        },
        {
          title: '⚠️ Exam Trap: Losses Exceeding NCI',
          type: 'warning',
          content: "**NCI can go negative!**\n\n**If subsidiary has large losses:**\n• NCI absorbs its share of losses\n• NCI can become negative (deficit)\n• Parent does NOT absorb NCI's share\n\n**Exception:** NCI has obligation to fund losses\n\n**NCI takes the bad with the good!**"
        },
        {
          title: 'Changes in Ownership',
          type: 'text',
          content: "**Transactions with NCI (no loss of control):**\n\n• Treated as equity transactions\n• No gain/loss in income\n• Adjust NCI and parent's equity\n\n**Example:** Parent buys additional 10% from NCI\n• Debit NCI for its carrying amount\n• Debit/credit APIC for difference vs. cash paid"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "NCI = Equity in subsidiary not owned by parent",
            "Initially measured at fair value (US GAAP)",
            "NCI receives proportionate share of subsidiary income",
            "Presented separately in equity section",
            "NCI can go negative if losses are large",
            "Transactions with NCI = Equity transactions (no gain/loss)"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-I-008',
    section: 'BAR',
    title: "Variable Interest Entities: Identification",
    description: "Master the identification of VIEs under ASC 810",
    order: 8,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Business Combinations", "VIE"],
    blueprintArea: 'BAR-I',
    blueprintTopic: 'BAR-I-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "VIEs can require consolidation even without majority ownership! Special purpose entities and structured financing often involve VIEs. Understanding these rules prevents off-balance sheet surprises on BAR!"
        },
        {
          title: 'VIE Definition',
          type: 'text',
          content: "**Variable Interest Entity (VIE):**\n\n• Entity where voting rights don't determine control\n• Requires consolidation based on variable interests\n• Primary beneficiary must consolidate\n\n**Created to address Enron-type off-balance sheet abuses**"
        },
        {
          title: 'VIE Characteristics',
          type: 'table',
          headers: ['Characteristic', 'Indicator'],
          rows: [
            ['Insufficient equity', 'Equity < 10% of total assets'],
            ['Equity holders lack power', 'Cannot make significant decisions'],
            ['Equity holders lack losses', 'Don\'t absorb expected losses'],
            ['Equity holders lack returns', 'Don\'t receive expected residual returns']
          ]
        },
        {
          title: '🧠 Memory Aid: VIE Tests',
          type: 'callout',
          content: "**\"PLRL\"** for VIE:\n\n**P**ower lacking in equity holders\n**L**osses not absorbed by equity\n**R**eturns not received by equity\n**L**ow equity investment\n\n**ANY of these = VIE!**"
        },
        {
          title: 'Variable Interests',
          type: 'text',
          content: "**What creates a variable interest:**\n\n• Equity investments\n• Loans/debt\n• Guarantees\n• Leases\n• Service contracts\n• Derivative contracts\n\n**Variable interest = Exposure to VIE's variability**"
        },
        {
          title: 'Scope Exceptions',
          type: 'text',
          content: "**NOT subject to VIE consolidation:**\n\n• Qualified employee benefit plans\n• Registered investment companies\n• Certain governmental organizations\n• Entities meeting business scope exception\n\n**Business scope exception:** Entity has sufficient equity and equity holders have power, losses, and returns"
        },
        {
          title: '⚠️ Exam Trap: Voting Interest vs. VIE Model',
          type: 'warning',
          content: "**Two consolidation models exist:**\n\n**1. Voting Interest Model:**\n• Traditional >50% control\n• Used when NOT a VIE\n\n**2. VIE Model:**\n• Based on variable interests\n• Primary beneficiary consolidates\n\n**Test VIE model FIRST! Only use voting model if not VIE**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "VIE: Entity where voting rights don't determine control",
            "Characteristics: Low equity, equity holders lack power/losses/returns",
            "Variable interests: Any exposure to entity's variability",
            "Must consolidate if you're primary beneficiary",
            "Test VIE model before voting interest model",
            "Scope exceptions apply to certain entities"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-I-009',
    section: 'BAR',
    title: "VIE: Primary Beneficiary",
    description: "Determine who must consolidate a variable interest entity",
    order: 9,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Business Combinations", "VIE"],
    blueprintArea: 'BAR-I',
    blueprintTopic: 'BAR-I-C-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Once a VIE is identified, someone must consolidate it! The primary beneficiary—not necessarily the largest investor—must include the VIE on its balance sheet. Understanding this determination is essential for BAR!"
        },
        {
          title: 'Primary Beneficiary Definition',
          type: 'text',
          content: "**Primary beneficiary has BOTH:**\n\n1. **Power:** Direct activities that most significantly impact VIE's economic performance\n\n2. **Economics:** Obligation to absorb losses OR right to receive benefits that could be significant\n\n**BOTH criteria must be met!**"
        },
        {
          title: 'Power Criterion',
          type: 'text',
          content: "**Power to direct activities:**\n\n• Significant activities = Those impacting economic performance\n• May be through contracts, voting rights, or other arrangements\n• Consider: Asset management, financing decisions, operating decisions\n\n**Who makes the key decisions?**"
        },
        {
          title: '🧠 Memory Aid: Primary Beneficiary',
          type: 'callout',
          content: "**\"PE\"** for Primary Beneficiary:\n\n**P**ower to direct significant activities\n**E**conomics: Absorb losses OR receive returns\n\n**Need BOTH P and E!**\n\n**No power? Not primary beneficiary.\nNo economics? Not primary beneficiary.**"
        },
        {
          title: 'Economics Criterion',
          type: 'table',
          headers: ['Economic Interest', 'Examples'],
          rows: [
            ['Absorb losses', 'Guarantees, subordinated debt, equity'],
            ['Receive returns', 'Equity returns, fees, residual interests'],
            ['Significant', 'Potential to be significant (doesn\'t have to be expected)']
          ]
        },
        {
          title: 'Multiple Parties Analysis',
          type: 'text',
          content: "**When multiple parties involved:**\n\n• Each party evaluates both criteria\n• Power may be shared—look at significant activities\n• Only ONE primary beneficiary\n• If power shared equally and economics equal → No one consolidates (rare)\n\n**Related party considerations may apply**"
        },
        {
          title: '⚠️ Exam Trap: Reassessment Required',
          type: 'warning',
          content: "**Reassess primary beneficiary when:**\n\n• VIE's governing documents change\n• Contractual arrangements change\n• Equity ownership changes\n• VIE issues/repurchases equity\n\n**Continuous assessment—status can change!**\n\n**Event-driven, not calendar-driven**"
        },
        {
          title: 'Consolidation by Primary Beneficiary',
          type: 'text',
          content: "**When identified as primary beneficiary:**\n\n• Consolidate VIE\n• Apply acquisition method (if first consolidation)\n• Measure assets/liabilities at fair value\n• Recognize goodwill if applicable\n\n**Treat like business combination**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Primary beneficiary = Power + Significant economics",
            "Power: Direct activities impacting economic performance",
            "Economics: Absorb losses OR receive significant returns",
            "BOTH criteria required for consolidation",
            "Reassess when circumstances change",
            "Only one primary beneficiary possible"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-I-010',
    section: 'BAR',
    title: "Disposal of Subsidiaries",
    description: "Master accounting for subsidiary disposals and deconsolidation",
    order: 10,
    duration: 45,
    difficulty: 'advanced',
    topics: ["Business Combinations", "Consolidation"],
    blueprintArea: 'BAR-I',
    blueprintTopic: 'BAR-I-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "When control is lost, deconsolidation occurs! The accounting depends on whether any interest is retained and at what level. Understanding these rules is important for BAR!"
        },
        {
          title: 'Deconsolidation Trigger',
          type: 'text',
          content: "**Deconsolidate when control is LOST:**\n\n• Sale of controlling interest\n• Subsidiary issues stock diluting parent below control\n• Contractual change removing control\n• Loss of primary beneficiary status (VIE)\n\n**Control = >50% voting OR VIE primary beneficiary**"
        },
        {
          title: 'Gain/Loss Calculation',
          type: 'text',
          content: "**On deconsolidation:**\n\nConsideration received\n+ FV of any retained interest\n− Carrying amount of subsidiary's net assets\n− Carrying amount of NCI\n= **Gain or loss**\n\n**Recognize in income immediately**"
        },
        {
          title: '🧠 Memory Aid: Deconsolidation',
          type: 'callout',
          content: "**\"CFRN\"** for deconsolidation:\n\n**C**onsideration received\n**F**air value of retained interest\n**R**emove net assets (book value)\n**N**CI removed\n\n**C + F − R − N = Gain/Loss**"
        },
        {
          title: 'Retained Interest Accounting',
          type: 'table',
          headers: ['Retained Interest Level', 'Accounting Method'],
          rows: [
            ['20-50% (significant influence)', 'Equity method'],
            ['<20% (no significant influence)', 'Fair value (ASC 321)'],
            ['Retained control (>50%)', 'Still consolidate (no deconsolidation)']
          ]
        },
        {
          title: 'Partial Disposal Without Loss of Control',
          type: 'text',
          content: "**If control is retained:**\n\n• No deconsolidation\n• Transaction with NCI (equity transaction)\n• No gain/loss in income\n• Adjust NCI and parent's equity\n\n**Example:** Reduce from 90% to 60% (still control)"
        },
        {
          title: '⚠️ Exam Trap: OCI Recycling',
          type: 'warning',
          content: "**When deconsolidating:**\n\n**OCI items of subsidiary:**\n• Foreign currency translation adjustments → Income\n• Pension adjustments → Income\n\n**Recycle accumulated OCI to income!**\n\n**Don't leave subsidiary's OCI in parent's equity!**"
        },
        {
          title: 'Retained Interest at Fair Value',
          type: 'text',
          content: "**Any retained interest:**\n\n• Measured at fair value at deconsolidation date\n• FV becomes new \"cost\" basis\n• Apply appropriate method going forward\n\n**Fresh start for any retained investment**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Deconsolidate when control is lost",
            "Gain/Loss = Consideration + FV retained − Net assets − NCI",
            "Retained interest measured at fair value",
            "Recycle subsidiary's OCI to income",
            "Partial disposal WITH control = Equity transaction",
            "Apply equity or FV method based on retained interest level"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-II-001',
    section: 'BAR',
    title: "Complex Contract Modifications",
    description: "Master revenue recognition for modified contracts under ASC 606",
    order: 11,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Technical Accounting"],
    blueprintArea: 'BAR-II',
    blueprintTopic: 'BAR-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Contract modifications can significantly change revenue recognition! Understanding whether to treat modifications as separate contracts or cumulative catch-ups is essential for BAR!"
        },
        {
          title: 'Contract Modification Definition',
          type: 'text',
          content: "**Contract modification:**\n\n• Change to scope and/or price\n• Approved by parties\n• May add, remove, or change goods/services\n• May change consideration\n\n**Creates new enforceable rights and obligations**"
        },
        {
          title: 'Three Modification Approaches',
          type: 'table',
          headers: ['Approach', 'When to Apply'],
          rows: [
            ['Separate contract', 'Distinct goods + Standalone selling price'],
            ['Terminate and create new', 'Not distinct goods, remaining goods distinct from delivered'],
            ['Cumulative catch-up', 'Not distinct, remaining goods NOT distinct from delivered']
          ]
        },
        {
          title: '🧠 Memory Aid: Modifications',
          type: 'callout',
          content: "**\"STC\"** for contract modifications:\n\n**S**eparate contract (distinct + SSP)\n**T**erminate & create new (not distinct, remaining distinct)\n**C**umulative catch-up (not distinct, remaining not distinct)\n\n**STC = How did the mod affect the deal?**"
        },
        {
          title: 'Separate Contract Treatment',
          type: 'text',
          content: "**Two criteria BOTH met:**\n\n1. Additional distinct goods/services\n2. Price increases by standalone selling price\n\n**Result:**\n• Account for mod as separate contract\n• Original contract unaffected\n• Two separate performance obligations"
        },
        {
          title: '⚠️ Exam Trap: Cumulative Catch-Up',
          type: 'warning',
          content: "**Cumulative catch-up adjustment:**\n\n**When remaining goods NOT distinct from delivered:**\n• Single performance obligation continues\n• Revise total transaction price\n• Adjust progress measure if needed\n• Record cumulative adjustment to revenue\n\n**May result in revenue increase or decrease!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Contract modification = Approved change to scope/price",
            "Test: Are new goods distinct? At standalone price?",
            "Separate contract if distinct + standalone price",
            "Terminate/new if remaining goods distinct",
            "Cumulative catch-up if single continuing obligation",
            "Changes in estimate → Prospective; modifications → May be retrospective"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-II-002',
    section: 'BAR',
    title: "Principal vs Agent Considerations",
    description: "Determine whether an entity is principal or agent in revenue transactions",
    order: 12,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Technical Accounting"],
    blueprintArea: 'BAR-II',
    blueprintTopic: 'BAR-II-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Is your company selling or facilitating? Principal records gross revenue; agent records only the fee. Getting this wrong overstates or understates revenue significantly! Critical for BAR!"
        },
        {
          title: 'Principal vs. Agent',
          type: 'text',
          content: "**Principal:**\n• Controls goods/services BEFORE transfer\n• Records GROSS revenue\n\n**Agent:**\n• Arranges for another party to provide goods/services\n• Records NET revenue (commission/fee)\n\n**Key question: Who controls the good before customer gets it?**"
        },
        {
          title: 'Control Indicators',
          type: 'table',
          headers: ['Indicator', 'Principal', 'Agent'],
          rows: [
            ['Primary responsibility', 'Has it', 'Does not have it'],
            ['Inventory risk', 'Bears risk', 'No risk'],
            ['Pricing discretion', 'Sets prices', 'No discretion'],
            ['Credit risk', 'Bears risk', 'Minimal risk']
          ]
        },
        {
          title: '🧠 Memory Aid: Principal Indicators',
          type: 'callout',
          content: "**\"PIPC\"** for Principal:\n\n**P**rimary responsibility for fulfillment\n**I**nventory risk before/after transfer\n**P**rice discretion\n**C**redit risk from customer\n\n**PIPC = Principal controls the deal!**"
        },
        {
          title: '⚠️ Exam Trap: Legal Title Alone',
          type: 'warning',
          content: "**Legal title is NOT determinative!**\n\n**An entity can have title momentarily but be agent:**\n• Drop-shipping arrangements\n• Consignment-like arrangements\n\n**Focus on CONTROL, not legal form!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Principal = Control before transfer → Gross revenue",
            "Agent = Arranges transfer → Net revenue",
            "Key indicators: PIPC (responsibility, inventory, price, credit)",
            "Legal title alone doesn't determine status",
            "Evaluate each performance obligation separately",
            "Focus on economic substance, not form"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-II-003',
    section: 'BAR',
    title: "Licenses of Intellectual Property",
    description: "Master revenue recognition for IP licenses under ASC 606",
    order: 13,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Technical Accounting"],
    blueprintArea: 'BAR-II',
    blueprintTopic: 'BAR-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "IP licenses are everywhere—software, music, franchises, patents! Determining whether revenue is recognized at a point in time or over time dramatically impacts financial statements. Essential for BAR!"
        },
        {
          title: 'Two Types of Licenses',
          type: 'text',
          content: "**Right to access (dynamic):**\n• Customer accesses IP as it exists throughout license\n• IP changes during license period\n• Revenue recognized OVER TIME\n\n**Right to use (static):**\n• Customer uses IP as it exists at grant date\n• IP doesn't change\n• Revenue recognized at POINT IN TIME"
        },
        {
          title: 'Access vs. Use Criteria',
          type: 'table',
          headers: ['Factor', 'Right to Access', 'Right to Use'],
          rows: [
            ['Entity activity', 'Significantly affects IP', 'Does NOT significantly affect'],
            ['Customer expectation', 'Expects continued involvement', 'No expectation'],
            ['Revenue pattern', 'Over time', 'Point in time'],
            ['Examples', 'Franchise, sports team logo', 'Software, music, completed content']
          ]
        },
        {
          title: '🧠 Memory Aid: License Type',
          type: 'callout',
          content: "**\"Dynamic = Duration, Static = Snapshot\"**\n\n**Dynamic (Access):**\n• IP changes during license\n• Revenue over the duration\n\n**Static (Use):**\n• IP fixed at grant date\n• Revenue at snapshot point in time"
        },
        {
          title: '⚠️ Exam Trap: Sales-Based Royalties',
          type: 'warning',
          content: "**Special rule for IP licenses:**\n\n• Sales-based royalties on IP licenses\n• Recognized when LATER of:\n  - Sale occurs\n  - Performance obligation satisfied\n\n**Variable consideration constraint doesn't apply!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Right to access = IP changes, recognize over time",
            "Right to use = IP static, recognize point in time",
            "Functional IP → Generally right to use",
            "Symbolic IP → Generally right to access",
            "Sales-based royalties: Recognize when sale occurs",
            "Evaluate if license is distinct from other promises"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-II-004',
    section: 'BAR',
    title: "Lease Modifications & Reassessments",
    description: "Master accounting for lease changes under ASC 842",
    order: 14,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Technical Accounting"],
    blueprintArea: 'BAR-II',
    blueprintTopic: 'BAR-II-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Lease terms change! Modifications, renewals, and terminations require careful accounting. Understanding when to remeasure and how is critical for BAR!"
        },
        {
          title: 'Lease Modification Definition',
          type: 'text',
          content: "**Lease modification:**\n\n• Change to terms not part of original lease\n• Includes changes to:\n  - Scope (add/terminate right to use)\n  - Consideration\n  - Lease term\n\n**Requires agreement between parties**"
        },
        {
          title: 'Modification Accounting',
          type: 'table',
          headers: ['Modification Type', 'Lessee Treatment'],
          rows: [
            ['Separate lease (add ROU + standalone price)', 'Account as new separate lease'],
            ['Full termination', 'Derecognize ROU and lease liability'],
            ['Partial termination', 'Proportionate reduction; gain/loss possible'],
            ['All other modifications', 'Remeasure liability; adjust ROU asset']
          ]
        },
        {
          title: '🧠 Memory Aid: Lease Mods',
          type: 'callout',
          content: "**\"STAR\"** for lease modifications:\n\n**S**eparate lease if add ROU + standalone price\n**T**ermination → Derecognize\n**A**djust liability at new rate\n**R**emeasure ROU asset\n\n**STAR = Navigate the modification!**"
        },
        {
          title: '⚠️ Exam Trap: Rate Change',
          type: 'warning',
          content: "**Modification → New discount rate!**\n\n**Remeasure using:**\n• Rate implicit in modified lease, OR\n• Lessee's incremental borrowing rate at modification date\n\n**NOT original discount rate!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Modification = Change to terms not in original lease",
            "Separate lease if: Add ROU + Standalone price",
            "Other modifications: Remeasure liability and adjust ROU",
            "Use new discount rate at modification date",
            "Terminations may result in gain/loss",
            "Reassess when term or purchase option changes"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-II-005',
    section: 'BAR',
    title: "Subleases",
    description: "Master sublease accounting under ASC 842",
    order: 15,
    duration: 45,
    difficulty: 'advanced',
    topics: ["Technical Accounting"],
    blueprintArea: 'BAR-II',
    blueprintTopic: 'BAR-II-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Subleasing adds complexity! The original lessee becomes a sublessor with dual roles. Understanding proper classification and recognition prevents errors on BAR!"
        },
        {
          title: 'Sublease Overview',
          type: 'text',
          content: "**Sublease structure:**\n\n• Original lessor → Head lessor\n• Original lessee → Intermediate lessor (sublessor)\n• New lessee → Sublessee\n\n**Sublessor has two leases:**\n• Head lease (as lessee)\n• Sublease (as lessor)"
        },
        {
          title: 'Sublease Classification',
          type: 'text',
          content: "**Sublessor classifies sublease:**\n\n• Based on RIGHT-OF-USE ASSET (not underlying asset)\n• Apply same criteria as any lessor\n• Compare to ROU asset, not original property\n\n**ROU asset = Reference for classification tests**"
        },
        {
          title: '🧠 Memory Aid: Sublease',
          type: 'callout',
          content: "**\"DUAL HAT\"** for sublessors:\n\n**D**ual role: Lessee AND lessor\n**U**se ROU for classification\n**A**ccount for both leases\n**L**essee obligations continue\n\n**HAT: Head lease still Applies Throughout!**"
        },
        {
          title: '⚠️ Exam Trap: Head Lease Continues',
          type: 'warning',
          content: "**Sublease ≠ Termination of head lease!**\n\n**Sublessor's obligations continue:**\n• Still owe payments to head lessor\n• ROU asset and lease liability remain\n• Sublessee default → Sublessor still responsible"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Sublease = Lessee grants right to use to third party",
            "Classify sublease using ROU asset as reference",
            "Head lease accounting continues unchanged",
            "Operating: Keep ROU, recognize sublease income",
            "Finance: Derecognize ROU, record net investment",
            "Sublessor still liable under head lease"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-II-006',
    section: 'BAR',
    title: "Build-to-Suit Arrangements",
    description: "Master accounting for build-to-suit leases under ASC 842",
    order: 16,
    duration: 45,
    difficulty: 'advanced',
    topics: ["Technical Accounting"],
    blueprintArea: 'BAR-II',
    blueprintTopic: 'BAR-II-B-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Build-to-suit arrangements blur the line between construction and leasing! Determining who owns the asset during and after construction affects both parties' balance sheets. Important for BAR!"
        },
        {
          title: 'Build-to-Suit Overview',
          type: 'text',
          content: "**Build-to-suit lease:**\n\n• Lessor constructs asset to lessee specifications\n• Lessee involved in construction\n• Question: Who OWNS asset during construction?\n\n**ASC 842 simplified the analysis from old GAAP**"
        },
        {
          title: 'Control During Construction',
          type: 'text',
          content: "**Key question: Does lessee control asset during construction?**\n\n**Lessee controls if:**\n• Lessee owns underlying land, OR\n• Lessee directs structural design/construction\n\n**If lessee controls → Lessee owns (not a lease)**"
        },
        {
          title: '🧠 Memory Aid: Build-to-Suit',
          type: 'callout',
          content: "**\"LAND + DESIGN\"** test:\n\n**L**essee owns land? OR\n**A**ctive direction of\n**N**ew construction\n**D**esign decisions?\n\n**If YES → Lessee owns asset during construction!**"
        },
        {
          title: '⚠️ Exam Trap: Post-Construction',
          type: 'warning',
          content: "**After construction completes:**\n\n**If lessee controlled construction:**\n• Evaluate if sale to lessor qualifies as sale\n• ASC 606 criteria must be met\n• If sale → Sale-leaseback accounting\n• If NOT sale → Failed sale-leaseback (financing)"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Build-to-suit: Lessor constructs to lessee specs",
            "Key: Does lessee control during construction?",
            "Control indicators: Land ownership, design direction",
            "Lessee control: Lessee capitalizes construction",
            "Lessor control: Normal lease at commencement",
            "Post-construction: Evaluate sale-leaseback criteria"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-II-007',
    section: 'BAR',
    title: "Derivatives: Forwards, Futures, Options, Swaps",
    description: "Master derivative instruments under ASC 815",
    order: 17,
    duration: 65,
    difficulty: 'advanced',
    topics: ["Technical Accounting"],
    blueprintArea: 'BAR-II',
    blueprintTopic: 'BAR-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Derivatives are powerful financial instruments that can hedge risk or speculate! Understanding the four main types—forwards, futures, options, and swaps—is fundamental for BAR!"
        },
        {
          title: 'Derivative Characteristics',
          type: 'text',
          content: "**A derivative has three characteristics:**\n\n1. Underlying + Notional/Payment provision\n2. Little or no initial net investment\n3. Net settlement possible\n\n**Value DERIVED from something else**"
        },
        {
          title: 'Types of Derivatives',
          type: 'table',
          headers: ['Type', 'Description', 'Key Feature'],
          rows: [
            ['Forward', 'Customized contract to buy/sell at future date', 'OTC, counterparty risk'],
            ['Future', 'Standardized exchange-traded forward', 'Daily settlement, margin'],
            ['Option', 'Right (not obligation) to buy/sell', 'Premium paid, asymmetric'],
            ['Swap', 'Exchange cash flows over time', 'Interest rate, currency common']
          ]
        },
        {
          title: '🧠 Memory Aid: Derivative Types',
          type: 'callout',
          content: "**\"FFOS\"** derivatives:\n\n**F**orward = Future agreement (customized)\n**F**uture = Forward on exchange\n**O**ption = Optional exercise\n**S**wap = Switch cash flows\n\n**All derive value from underlying!**"
        },
        {
          title: '⚠️ Exam Trap: Fair Value Measurement',
          type: 'warning',
          content: "**All derivatives at FAIR VALUE on balance sheet!**\n\n• Derivatives = Assets or liabilities\n• Measured at fair value each period\n• Gains/losses: Income OR OCI (if hedge qualified)\n\n**No \"cost\" for derivatives—always fair value!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Derivatives: Underlying + Notional, little investment, net settle",
            "Forward: Customized, OTC, counterparty risk",
            "Future: Standardized, exchange, daily margin",
            "Option: Right to buy (call) or sell (put), premium paid",
            "Swap: Exchange cash flows (interest, currency)",
            "All derivatives on balance sheet at fair value"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-II-008',
    section: 'BAR',
    title: "Hedge Accounting: Fair Value Hedges",
    description: "Master fair value hedge accounting under ASC 815",
    order: 18,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Technical Accounting"],
    blueprintArea: 'BAR-II',
    blueprintTopic: 'BAR-II-C-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Fair value hedges protect against changes in asset/liability fair values! When done right, the derivative gain/loss offsets the hedged item's change. Understanding this matching is essential for BAR!"
        },
        {
          title: 'Fair Value Hedge Overview',
          type: 'text',
          content: "**Fair value hedge hedges:**\n\n• Exposure to changes in fair value\n• Of recognized asset/liability\n• Or unrecognized firm commitment\n\n**Example:** Fixed-rate debt exposed to fair value changes as rates move"
        },
        {
          title: 'Hedge Accounting Criteria',
          type: 'table',
          headers: ['Requirement', 'Description'],
          rows: [
            ['Formal documentation', 'Document hedging relationship at inception'],
            ['Eligible hedged item', 'Asset, liability, or firm commitment'],
            ['Eligible hedging instrument', 'Derivative (or certain non-derivatives)'],
            ['Effectiveness', 'Hedge expected to be highly effective']
          ]
        },
        {
          title: '🧠 Memory Aid: Fair Value Hedge',
          type: 'callout',
          content: "**\"BOTH to Income\"** for fair value hedges:\n\n• Derivative gain/loss → **Income**\n• Hedged item adjustment → **Income**\n\n**Both changes hit income → Natural offset!**"
        },
        {
          title: '⚠️ Exam Trap: Basis Adjustment',
          type: 'warning',
          content: "**Hedged item basis CHANGES!**\n\n**For fair value hedges:**\n• Adjust carrying amount of hedged item\n• Only for the hedged risk\n• Basis adjustment amortized over remaining life\n\n**Different from cash flow hedges!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Fair value hedge: Hedge exposure to FV changes",
            "Both derivative and hedged item changes → Income",
            "Natural offset reduces earnings volatility",
            "Hedged item basis is adjusted",
            "Must document and prove effectiveness",
            "Ineffectiveness flows through income"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-II-009',
    section: 'BAR',
    title: "Hedge Accounting: Cash Flow Hedges",
    description: "Master cash flow hedge accounting under ASC 815",
    order: 19,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Technical Accounting"],
    blueprintArea: 'BAR-II',
    blueprintTopic: 'BAR-II-C-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Cash flow hedges protect against variability in expected cash flows! The derivative gain/loss is parked in OCI until the hedged item affects earnings. This timing is critical for BAR!"
        },
        {
          title: 'Cash Flow Hedge Overview',
          type: 'text',
          content: "**Cash flow hedge hedges:**\n\n• Exposure to variability in cash flows\n• From recognized asset/liability OR\n• Forecasted transaction\n\n**Example:** Variable-rate debt, future inventory purchase, forecasted sale"
        },
        {
          title: 'Cash Flow Hedge Accounting',
          type: 'table',
          headers: ['Component', 'Treatment'],
          rows: [
            ['Effective portion', 'Derivative change → OCI'],
            ['Ineffective portion', 'Derivative change → Income'],
            ['Reclassification', 'OCI → Income when hedged item affects earnings'],
            ['Hedged item', 'NO basis adjustment']
          ]
        },
        {
          title: '🧠 Memory Aid: Cash Flow Hedge',
          type: 'callout',
          content: "**\"OCI Parking Lot\"** for cash flow hedges:\n\n• Derivative gain/loss → **OCI** (parks there)\n• When hedged item affects income → **Reclassify to income**\n\n**OCI = Waiting room until cash flow realized!**"
        },
        {
          title: '⚠️ Exam Trap: OCI Reclassification',
          type: 'warning',
          content: "**When to reclassify OCI to income:**\n\n• When hedged item affects earnings!\n\n**Examples:**\n• Interest expense recognized → Reclassify\n• Inventory sold (COGS) → Reclassify\n• Forecasted transaction recognized → Reclassify"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Cash flow hedge: Hedge variability in cash flows",
            "Effective portion → OCI (parking lot)",
            "Reclassify to income when hedged item affects earnings",
            "NO basis adjustment to hedged item",
            "Ineffective portion → Straight to income",
            "Discontinued hedge: OCI treatment depends on probability"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-II-010',
    section: 'BAR',
    title: "Foreign Currency Transactions",
    description: "Master accounting for transactions in foreign currencies under ASC 830",
    order: 20,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Technical Accounting"],
    blueprintArea: 'BAR-II',
    blueprintTopic: 'BAR-II-D-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Global business means foreign currency transactions! Exchange rates change, creating gains and losses. Understanding the two-transaction approach is essential for BAR!"
        },
        {
          title: 'Two-Transaction Approach',
          type: 'text',
          content: "**Foreign currency transactions:**\n\n1. **Operating decision:** Buy/sell in foreign currency\n2. **Financing decision:** How exchange rates affect settlement\n\n**Separate the commerce from the currency!**"
        },
        {
          title: 'Recording Foreign Transactions',
          type: 'table',
          headers: ['Event', 'Rate Used'],
          rows: [
            ['Initial recording', 'Spot rate at transaction date'],
            ['Balance sheet date', 'Current spot rate (remeasure)'],
            ['Settlement date', 'Spot rate at settlement'],
            ['Exchange gain/loss', 'Difference → Income']
          ]
        },
        {
          title: '🧠 Memory Aid: Foreign Transaction',
          type: 'callout',
          content: "**\"SSIS\"** for foreign transactions:\n\n**S**pot rate at transaction\n**S**pot rate at balance sheet\n**I**ncome for exchange gain/loss\n**S**pot rate at settlement\n\n**Always spot rate; changes hit income!**"
        },
        {
          title: '⚠️ Exam Trap: Exchange G/L in Income',
          type: 'warning',
          content: "**Transaction gains/losses → INCOME!**\n\n**NOT OCI** (unless hedged)\n\n**Remember:**\n• Transaction = Income\n• Translation (of foreign sub) = OCI (CTA)\n\n**Two different things!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Two-transaction approach: Operating + Financing",
            "Record at spot rate at transaction date",
            "Remeasure monetary items at each balance sheet date",
            "Exchange gains/losses → Income (not OCI)",
            "Only monetary items remeasured",
            "Can hedge with forwards, options, or foreign debt"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-II-011',
    section: 'BAR',
    title: "Translation of Foreign Operations",
    description: "Master the translation method for foreign subsidiaries under ASC 830",
    order: 21,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Technical Accounting"],
    blueprintArea: 'BAR-II',
    blueprintTopic: 'BAR-II-D-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Foreign subsidiaries keep books in their functional currency! To consolidate, you must translate to the reporting currency. The cumulative translation adjustment (CTA) in OCI is a key concept for BAR!"
        },
        {
          title: 'Translation Method',
          type: 'text',
          content: "**Used when functional currency = Local currency:**\n\n• Foreign sub operates independently\n• Books in local currency\n• Translate to reporting currency for consolidation\n\n**Translation adjustment → OCI (CTA)**"
        },
        {
          title: 'Translation Rates',
          type: 'table',
          headers: ['Account', 'Exchange Rate'],
          rows: [
            ['Assets', 'Current rate (at balance sheet date)'],
            ['Liabilities', 'Current rate (at balance sheet date)'],
            ['Common stock', 'Historical rate (when issued)'],
            ['Retained earnings', 'Composite of historical rates'],
            ['Revenues/Expenses', 'Average rate for period']
          ]
        },
        {
          title: '🧠 Memory Aid: Translation',
          type: 'callout',
          content: "**\"CAR\"** for Translation:\n\n**C**urrent rate for assets/liabilities\n**A**verage rate for income statement\n**R**etained/Stock at historical\n\n**CAR drives translation!**\n\n**Difference → CTA in OCI**"
        },
        {
          title: '⚠️ Exam Trap: CTA vs. G/L',
          type: 'warning',
          content: "**Translation adjustment ≠ Transaction gain/loss!**\n\n**Translation (of foreign sub):**\n• CTA → OCI (AOCI)\n• Recycled to income on disposal\n\n**Transaction (individual deals):**\n• Exchange G/L → Income"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Translation: Functional currency ≠ Reporting currency",
            "Assets/Liabilities: Current rate",
            "Revenues/Expenses: Average rate",
            "Equity: Historical rates",
            "CTA = Balancing plug → OCI (AOCI)",
            "CTA recycled to income on disposal"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-II-012',
    section: 'BAR',
    title: "Remeasurement",
    description: "Master the remeasurement method for foreign operations under ASC 830",
    order: 22,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Technical Accounting"],
    blueprintArea: 'BAR-II',
    blueprintTopic: 'BAR-II-D-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Remeasurement applies when the functional currency is the REPORTING currency! This creates exchange gains and losses in income—different from translation's OCI treatment. Know when to use which method for BAR!"
        },
        {
          title: 'Remeasurement Method',
          type: 'text',
          content: "**Used when functional currency = Reporting currency:**\n\n• Foreign sub is extension of parent\n• Functional currency = Parent's currency\n• Local currency books → Remeasure to functional\n\n**Exchange gains/losses → Income**"
        },
        {
          title: 'Remeasurement Rates',
          type: 'table',
          headers: ['Account', 'Exchange Rate'],
          rows: [
            ['Monetary assets/liabilities', 'Current rate'],
            ['Non-monetary assets/liabilities', 'Historical rate'],
            ['Common stock', 'Historical rate'],
            ['Revenues/Expenses (most)', 'Average rate'],
            ['COGS, Depreciation', 'Historical rate (matches asset)']
          ]
        },
        {
          title: '🧠 Memory Aid: Remeasurement',
          type: 'callout',
          content: "**\"MNH\"** for Remeasurement:\n\n**M**onetary = Current rate\n**N**on-monetary = Historical rate\n**H**istorical for related expenses (COGS, depreciation)\n\n**Difference → Income (not OCI!)**"
        },
        {
          title: '⚠️ Exam Trap: COGS and Depreciation',
          type: 'warning',
          content: "**In remeasurement:**\n\n**COGS = Historical rate** (matches inventory)\n**Depreciation = Historical rate** (matches asset)\n\n**These don't use average rate!**\n\n**Expense follows the asset's rate!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Remeasurement: Functional = Reporting currency",
            "Monetary items: Current rate",
            "Non-monetary items: Historical rate",
            "COGS/Depreciation: Historical (follow asset)",
            "Exchange G/L → Income (not OCI)",
            "Highly inflationary → Remeasurement required"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-III-001',
    section: 'BAR',
    title: "Capital Assets & Infrastructure (GASB)",
    description: "Master governmental capital asset accounting under GASB standards",
    order: 23,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Governmental"],
    blueprintArea: 'BAR-III',
    blueprintTopic: 'BAR-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Governments own massive infrastructure—roads, bridges, water systems! Understanding how to capitalize, depreciate, and report these assets is essential for BAR governmental questions!"
        },
        {
          title: 'Capital Asset Definition',
          type: 'text',
          content: "**Governmental capital assets:**\n\n• Land, buildings, equipment\n• Infrastructure (roads, bridges, water systems)\n• Construction in progress\n• Intangibles\n\n**Reported in government-wide statements AND proprietary funds**"
        },
        {
          title: 'Reporting Capital Assets',
          type: 'table',
          headers: ['Statement Type', 'Capital Asset Treatment'],
          rows: [
            ['Government-wide', 'Capitalize and depreciate'],
            ['Proprietary funds', 'Capitalize and depreciate'],
            ['Governmental funds', 'NOT reported (expenditure when acquired)'],
            ['Fiduciary funds', 'Depends on fund type']
          ]
        },
        {
          title: '🧠 Memory Aid: Capital Assets',
          type: 'callout',
          content: "**\"PEG\"** for capital asset reporting:\n\n**P**roprietary funds = Capitalize\n**E**nterprise/Government-wide = Capitalize\n**G**overnmental funds = Expenditure\n\n**PEG = Where to put capital assets!**"
        },
        {
          title: 'Infrastructure Assets',
          type: 'text',
          content: "**Two approaches for infrastructure:**\n\n**1. Standard depreciation:**\n• Depreciate over useful life\n• Traditional approach\n\n**2. Modified approach (eligible networks):**\n• No depreciation\n• Preserve at established condition level\n• Disclose maintenance costs"
        },
        {
          title: '⚠️ Exam Trap: Modified Approach',
          type: 'warning',
          content: "**Modified approach requirements:**\n\n• Complete inventory of infrastructure\n• Condition assessment every 3 years\n• Estimate to maintain at established level\n• Demonstrate preservation at that level\n\n**Miss requirements → Must depreciate!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Capital assets: Land, buildings, equipment, infrastructure",
            "Capitalize in government-wide and proprietary funds",
            "Governmental funds: Expenditure (no capitalization)",
            "Infrastructure: Depreciate OR modified approach",
            "Modified approach: No depreciation if maintained",
            "Condition assessment required every 3 years for modified"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-III-002',
    section: 'BAR',
    title: "Long-Term Liabilities: Governmental",
    description: "Master governmental long-term debt and liability accounting",
    order: 24,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Governmental"],
    blueprintArea: 'BAR-III',
    blueprintTopic: 'BAR-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Governments issue billions in bonds! Understanding where and how to report long-term debt—and the difference between fund and government-wide reporting—is critical for BAR!"
        },
        {
          title: 'Long-Term Liabilities Overview',
          type: 'text',
          content: "**Governmental long-term liabilities:**\n\n• General obligation bonds\n• Revenue bonds\n• Capital leases\n• Compensated absences\n• Pension/OPEB liabilities\n\n**Treatment differs by statement type!**"
        },
        {
          title: 'Reporting Long-Term Debt',
          type: 'table',
          headers: ['Statement Type', 'Long-Term Debt Treatment'],
          rows: [
            ['Government-wide', 'Report ALL long-term debt'],
            ['Proprietary funds', 'Report fund-specific debt'],
            ['Governmental funds', 'NOT reported (use debt service fund)'],
            ['Debt service fund', 'Expenditure when principal due']
          ]
        },
        {
          title: '🧠 Memory Aid: Governmental Debt',
          type: 'callout',
          content: "**\"GWAP\"** for debt reporting:\n\n**G**overnment-wide = All debt\n**W**hen due = Expenditure (gov't funds)\n**A**ccrual basis (government-wide)\n**P**roprietary = Business-type debt\n\n**GWAP = Where does debt go?**"
        },
        {
          title: 'Debt Service Fund',
          type: 'text',
          content: "**Purpose:**\n\n• Accumulate resources for principal/interest\n• Modified accrual basis\n• Expenditure when due (not when incurred)\n\n**No long-term debt on fund balance sheet!**"
        },
        {
          title: '⚠️ Exam Trap: Bond Issuance',
          type: 'warning',
          content: "**Bond proceeds:**\n\n**Governmental funds:**\n• Credit: Other financing sources (NOT revenue)\n\n**Government-wide:**\n• Credit: Bonds payable (liability)\n\n**Different classification by statement type!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Long-term debt: Government-wide and proprietary only",
            "Governmental funds: NO long-term debt reported",
            "Debt service fund: Expenditure when principal due",
            "Bond proceeds = Other financing source (funds)",
            "Bond proceeds = Liability (government-wide)",
            "Reconciliation needed between fund and government-wide"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-III-003',
    section: 'BAR',
    title: "Pension Accounting: GASB 68",
    description: "Master governmental pension accounting standards",
    order: 25,
    duration: 65,
    difficulty: 'advanced',
    topics: ["Governmental"],
    blueprintArea: 'BAR-III',
    blueprintTopic: 'BAR-III-A-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Government pensions are MASSIVE liabilities! GASB 68 requires reporting net pension liability on government-wide statements. Understanding these complex calculations is essential for BAR!"
        },
        {
          title: 'Net Pension Liability',
          type: 'text',
          content: "**Key measure under GASB 68:**\n\nNet Pension Liability (NPL) =\nTotal Pension Liability (TPL)\n− Plan Fiduciary Net Position (Plan Assets)\n\n**Reported on government-wide statement of net position**"
        },
        {
          title: 'GASB 68 Components',
          type: 'table',
          headers: ['Component', 'Description'],
          rows: [
            ['Total pension liability', 'PV of projected benefits (actuarial)'],
            ['Plan fiduciary net position', 'Plan assets at fair value'],
            ['Net pension liability', 'TPL minus assets (unfunded portion)'],
            ['Pension expense', 'Annual cost recognition'],
            ['Deferred outflows/inflows', 'Timing differences']
          ]
        },
        {
          title: '🧠 Memory Aid: GASB 68',
          type: 'callout',
          content: "**\"TAPE\"** for pensions:\n\n**T**otal pension liability\n**A**ssets (plan fiduciary net position)\n**P**ension expense\n**E**quality: NPL = TPL − Assets\n\n**TAPE measures the pension gap!**"
        },
        {
          title: 'Deferred Items',
          type: 'text',
          content: "**Deferred outflows/inflows of resources:**\n\n• Differences in expected vs. actual experience\n• Investment gains/losses vs. expected\n• Changes in assumptions\n• Contributions after measurement date\n\n**Amortized to pension expense over time**"
        },
        {
          title: '⚠️ Exam Trap: Measurement Date',
          type: 'warning',
          content: "**Measurement date timing:**\n\n• Can be up to 12 months before fiscal year-end\n• Contributions AFTER measurement date = Deferred outflow\n\n**Watch for contributions made after measurement but before year-end!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "NPL = Total pension liability − Plan assets",
            "Reported on government-wide statements",
            "Deferred outflows/inflows for timing differences",
            "Pension expense: Complex calculation with amortization",
            "Measurement date can be up to 12 months prior",
            "Required disclosures and RSI schedules"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-III-004',
    section: 'BAR',
    title: "OPEB: GASB 75",
    description: "Master governmental other postemployment benefit accounting",
    order: 26,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Governmental"],
    blueprintArea: 'BAR-III',
    blueprintTopic: 'BAR-III-A-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Retiree healthcare is a huge obligation! GASB 75 mirrors GASB 68 for OPEB. Understanding these parallel standards helps you tackle both pension and OPEB questions on BAR!"
        },
        {
          title: 'OPEB Overview',
          type: 'text',
          content: "**Other postemployment benefits:**\n\n• Healthcare (most common)\n• Life insurance\n• Disability benefits\n• Long-term care\n\n**NOT pensions—but similar accounting under GASB 75**"
        },
        {
          title: 'GASB 75 vs. GASB 68',
          type: 'table',
          headers: ['Element', 'GASB 68 (Pension)', 'GASB 75 (OPEB)'],
          rows: [
            ['Primary liability', 'Net pension liability', 'Net OPEB liability'],
            ['Calculation', 'TPL − Plan assets', 'Total OPEB liability − Plan assets'],
            ['Deferred items', 'Yes', 'Yes'],
            ['RSI required', 'Yes', 'Yes'],
            ['Discount rate', 'Based on funding', 'Based on funding']
          ]
        },
        {
          title: '🧠 Memory Aid: OPEB',
          type: 'callout',
          content: "**\"SAME as Pensions\"** for OPEB:\n\n**S**imilar structure to GASB 68\n**A**ctuarial liability calculation\n**M**easurement date rules\n**E**xpense recognition with deferrals\n\n**If you know 68, you know 75!**"
        },
        {
          title: 'Key Differences',
          type: 'text',
          content: "**OPEB unique considerations:**\n\n• Healthcare cost trends important\n• Many plans unfunded or pay-as-you-go\n• If unfunded: Use municipal bond rate for discount\n• Volatility in healthcare assumptions\n\n**Healthcare inflation is a big variable!**"
        },
        {
          title: '⚠️ Exam Trap: Unfunded Plans',
          type: 'warning',
          content: "**Discount rate for unfunded OPEB:**\n\n• No plan assets = No expected return\n• Use tax-exempt municipal bond index rate\n• Higher discount rate → Lower liability\n\n**Watch the discount rate source!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "OPEB: Healthcare, life insurance, other post-retirement benefits",
            "Net OPEB liability = Total OPEB liability − Plan assets",
            "Structure mirrors GASB 68 (pensions)",
            "Unfunded plans: Use municipal bond rate",
            "Healthcare trend rates affect liability",
            "Deferred outflows/inflows same concept as pensions"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-III-005',
    section: 'BAR',
    title: "ACFR Components",
    description: "Master the Annual Comprehensive Financial Report structure",
    order: 27,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Governmental"],
    blueprintArea: 'BAR-III',
    blueprintTopic: 'BAR-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The ACFR is the gold standard for government financial reporting! Understanding its three sections and what goes where is essential for governmental accounting on BAR!"
        },
        {
          title: 'ACFR Overview',
          type: 'text',
          content: "**Annual Comprehensive Financial Report:**\n\n• Formerly \"CAFR\" (Comprehensive Annual Financial Report)\n• Most complete government financial report\n• Three main sections\n• Includes audited financial statements\n\n**The \"annual report\" for governments**"
        },
        {
          title: 'Three Sections of ACFR',
          type: 'table',
          headers: ['Section', 'Contents'],
          rows: [
            ['Introductory', 'Letter of transmittal, org chart, list of officials'],
            ['Financial', 'MD&A, basic F/S, notes, RSI, combining statements'],
            ['Statistical', 'Ten years of data, trends, demographics, economic info']
          ]
        },
        {
          title: '🧠 Memory Aid: ACFR Sections',
          type: 'callout',
          content: "**\"IFS\"** for ACFR:\n\n**I**ntroductory (who we are)\n**F**inancial (audited numbers)\n**S**tatistical (trends over time)\n\n**IFS = The three parts of ACFR!**"
        },
        {
          title: 'Financial Section Contents',
          type: 'text',
          content: "**Financial section includes:**\n\n1. Independent auditor's report\n2. MD&A (Management's Discussion and Analysis)\n3. Basic financial statements\n4. Notes to financial statements\n5. Required supplementary information (RSI)\n6. Combining and individual fund statements"
        },
        {
          title: '⚠️ Exam Trap: Statistical Section',
          type: 'warning',
          content: "**Statistical section is NOT audited!**\n\n• Ten-year trend information\n• Revenue capacity (tax base)\n• Debt capacity\n• Demographics and economic data\n• Operating information\n\n**Informative but unaudited!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "ACFR: Most comprehensive government report",
            "Three sections: Introductory, Financial, Statistical",
            "Financial section is audited",
            "Statistical section: 10-year trends (unaudited)",
            "MD&A is RSI (required supplementary information)",
            "ACFR name changed from CAFR"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-III-006',
    section: 'BAR',
    title: "RSI & Supplementary Information",
    description: "Understand required and other supplementary information",
    order: 28,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Governmental"],
    blueprintArea: 'BAR-III',
    blueprintTopic: 'BAR-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Some information is REQUIRED but not part of basic statements! RSI has special audit procedures. Know what's RSI versus basic F/S versus supplementary information for BAR!"
        },
        {
          title: 'RSI Definition',
          type: 'text',
          content: "**Required Supplementary Information (RSI):**\n\n• GASB requires it\n• Accompanies basic financial statements\n• Subject to limited audit procedures\n• NOT part of basic F/S\n\n**Between basic F/S and supplementary**"
        },
        {
          title: 'Common RSI Items',
          type: 'table',
          headers: ['RSI Item', 'Requirement'],
          rows: [
            ['MD&A', 'GASB 34 requires before basic F/S'],
            ['Pension schedules', 'GASB 68 requires after notes'],
            ['OPEB schedules', 'GASB 75 requires after notes'],
            ['Infrastructure condition', 'If using modified approach'],
            ['Budgetary comparison', 'General fund and major special revenue']
          ]
        },
        {
          title: '🧠 Memory Aid: RSI Position',
          type: 'callout',
          content: "**\"Bookends\"** for RSI:\n\n**Before basic F/S:** MD&A\n**After notes:** Everything else (pensions, budgets, etc.)\n\n**MD&A = Opening bookend\nOther RSI = Closing bookend**"
        },
        {
          title: 'Audit Treatment',
          type: 'text',
          content: "**RSI audit procedures:**\n\n• Limited procedures only\n• Inquiries and analytical procedures\n• NOT audited like basic F/S\n• Auditor expresses no opinion\n• But must report if materially misstated"
        },
        {
          title: '⚠️ Exam Trap: MD&A Location',
          type: 'warning',
          content: "**MD&A comes BEFORE basic financial statements!**\n\n• Only RSI that comes first\n• All other RSI follows the notes\n\n**Order:**\n1. MD&A (RSI)\n2. Basic F/S\n3. Notes\n4. Other RSI"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "RSI: Required but not part of basic F/S",
            "MD&A: RSI that comes BEFORE basic F/S",
            "Other RSI: Comes after notes",
            "Limited audit procedures (not full audit)",
            "Pension/OPEB schedules are RSI",
            "Budgetary comparison for general fund is RSI"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-III-007',
    section: 'BAR',
    title: "Government-Wide to Fund Reconciliations",
    description: "Master the reconciliation between fund and government-wide statements",
    order: 29,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Governmental"],
    blueprintArea: 'BAR-III',
    blueprintTopic: 'BAR-III-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Fund statements use modified accrual; government-wide uses full accrual! Reconciling between them tests your understanding of both measurement focuses. Essential for BAR!"
        },
        {
          title: 'Why Reconciliation Needed',
          type: 'text',
          content: "**Different bases:**\n\n**Governmental funds:**\n• Modified accrual basis\n• Current financial resources focus\n• No capital assets or long-term debt\n\n**Government-wide:**\n• Full accrual basis\n• Economic resources focus\n• Capital assets and long-term debt included"
        },
        {
          title: 'Common Reconciling Items',
          type: 'table',
          headers: ['Item', 'Fund → Government-Wide Adjustment'],
          rows: [
            ['Capital outlays', 'Add: Capitalized as assets'],
            ['Depreciation', 'Subtract: Expense not in funds'],
            ['Bond proceeds', 'Remove: Not revenue, add liability'],
            ['Principal payments', 'Remove: Not expense, reduce liability'],
            ['Internal service funds', 'Add: Usually governmental activities']
          ]
        },
        {
          title: '🧠 Memory Aid: Reconciliation',
          type: 'callout',
          content: "**\"CAD-BP\"** adjustments:\n\n**C**apital assets (add)\n**A**ccumulated depreciation (subtract)\n**D**ebt long-term (add liability)\n**B**ond proceeds (remove from revenues)\n**P**rincipal repayments (remove from expenditures)\n\n**CAD-BP = Key reconciling items!**"
        },
        {
          title: 'Balance Sheet Reconciliation',
          type: 'text',
          content: "**Fund balance → Net position:**\n\n• Add capital assets\n• Subtract accumulated depreciation\n• Subtract long-term liabilities\n• Add internal service fund net position\n• Adjust for deferred outflows/inflows\n\n**Result: Net position of governmental activities**"
        },
        {
          title: '⚠️ Exam Trap: Internal Service Funds',
          type: 'warning',
          content: "**Internal service funds:**\n\n• Proprietary fund type BUT\n• Usually serve governmental activities\n• Add to governmental activities in reconciliation\n\n**Don't forget internal service fund adjustment!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Reconciliation bridges modified to full accrual",
            "Add capital assets, subtract depreciation",
            "Add long-term debt as liability",
            "Bond proceeds: Not revenue (liability)",
            "Principal payments: Not expense (debt reduction)",
            "Internal service funds typically added to governmental"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-III-008',
    section: 'BAR',
    title: "Fiduciary Activities: GASB 84",
    description: "Master accounting for governmental fiduciary funds",
    order: 30,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Governmental"],
    blueprintArea: 'BAR-III',
    blueprintTopic: 'BAR-III-B-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Governments hold assets for others—pension trusts, investment pools, custodial funds! GASB 84 clarifies when fiduciary reporting applies. Know these distinctions for BAR!"
        },
        {
          title: 'Fiduciary Funds Overview',
          type: 'text',
          content: "**Fiduciary funds hold assets for others:**\n\n• NOT the government's own resources\n• Held in trust or custodial capacity\n• NOT included in government-wide statements\n• Separate fiduciary fund statements\n\n**Reported in their own statements**"
        },
        {
          title: 'Types of Fiduciary Funds',
          type: 'table',
          headers: ['Fund Type', 'Purpose'],
          rows: [
            ['Pension trust funds', 'Hold pension plan assets'],
            ['Investment trust funds', 'External investment pools'],
            ['Private-purpose trust', 'Benefit individuals/organizations'],
            ['Custodial funds', 'Collecting/disbursing for others']
          ]
        },
        {
          title: '🧠 Memory Aid: Fiduciary Funds',
          type: 'callout',
          content: "**\"PIPC\"** fiduciary funds:\n\n**P**ension trusts\n**I**nvestment trusts\n**P**rivate-purpose trusts\n**C**ustodial funds\n\n**PIPC = Holding assets for others!**"
        },
        {
          title: 'GASB 84 Criteria',
          type: 'text',
          content: "**Is it fiduciary? Ask:**\n\n1. Are assets controlled by the government?\n2. Are assets NOT derived from government's own-source revenues?\n3. Do assets have one or more external beneficiaries?\n\n**All YES = Fiduciary fund required**"
        },
        {
          title: '⚠️ Exam Trap: Custodial vs. Agency',
          type: 'warning',
          content: "**GASB 84 replaced agency funds with custodial!**\n\n**Old: Agency funds**\n• Assets = Liabilities (no net position)\n\n**New: Custodial funds**\n• Report additions/deductions\n• Can have net position\n\n**Terminology change!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Fiduciary: Hold assets for others (not government's own)",
            "Four types: Pension, investment, private-purpose trusts; custodial",
            "NOT in government-wide statements",
            "GASB 84: Control + external source + external beneficiary",
            "Custodial funds replaced agency funds",
            "Reported on Statement of Fiduciary Net Position"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-III-009',
    section: 'BAR',
    title: "Leases: GASB 87",
    description: "Master governmental lease accounting under GASB 87",
    order: 31,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Governmental"],
    blueprintArea: 'BAR-III',
    blueprintTopic: 'BAR-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "GASB 87 brought leases on-balance sheet for governments—similar to ASC 842 for private entities! Understanding this standard is critical for BAR governmental questions!"
        },
        {
          title: 'GASB 87 Overview',
          type: 'text',
          content: "**Key changes under GASB 87:**\n\n• Single model for lease accounting\n• Most leases on balance sheet\n• Lessee: Right-to-use asset + Lease liability\n• Lessor: Lease receivable + Deferred inflow\n\n**No more operating lease off-balance sheet!**"
        },
        {
          title: 'Lessee Accounting',
          type: 'table',
          headers: ['Element', 'Treatment'],
          rows: [
            ['Right-to-use asset', 'Intangible asset (amortize)'],
            ['Lease liability', 'PV of future payments'],
            ['Interest expense', 'On lease liability'],
            ['Amortization', 'On right-to-use asset']
          ]
        },
        {
          title: '🧠 Memory Aid: GASB 87 Lessee',
          type: 'callout',
          content: "**\"RAIL\"** for GASB 87 lessee:\n\n**R**ight-to-use asset recorded\n**A**mortize the asset\n**I**nterest on liability\n**L**iability for future payments\n\n**RAIL = On the balance sheet!**"
        },
        {
          title: 'Lessor Accounting',
          type: 'text',
          content: "**Lessor records:**\n\n• Lease receivable (PV of future payments)\n• Deferred inflow of resources\n• Keep underlying asset on books\n• Recognize revenue as deferred inflow is recognized\n\n**Note: Asset stays with lessor!**"
        },
        {
          title: '⚠️ Exam Trap: Short-Term Lease Exception',
          type: 'warning',
          content: "**Short-term leases (≤12 months):**\n\n• Maximum term including extensions ≤12 months\n• Can recognize payments as expense/revenue\n• No asset/liability recognition required\n\n**Similar to practical expedient in ASC 842!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "GASB 87: Single model, most leases on balance sheet",
            "Lessee: Right-to-use asset + Lease liability",
            "Lessor: Lease receivable + Deferred inflow",
            "No operating/finance distinction for lessees",
            "Short-term (≤12 months) can be expensed",
            "Underlying asset stays with lessor"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-IV-001',
    section: 'BAR',
    title: "Ratio Analysis: Liquidity, Solvency, Profitability",
    description: "Master financial ratio analysis for decision-making",
    order: 32,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Financial Analysis"],
    blueprintArea: 'BAR-IV',
    blueprintTopic: 'BAR-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Ratios turn numbers into insights! Liquidity, solvency, and profitability ratios help evaluate financial health. These are fundamental tools for financial analysis on BAR!"
        },
        {
          title: 'Ratio Categories',
          type: 'text',
          content: "**Three main categories:**\n\n**Liquidity:** Can company pay short-term obligations?\n**Solvency:** Can company meet long-term obligations?\n**Profitability:** Is company generating adequate returns?\n\n**Each tells a different story**"
        },
        {
          title: 'Key Ratios',
          type: 'table',
          headers: ['Ratio', 'Formula', 'Category'],
          rows: [
            ['Current ratio', 'Current assets / Current liabilities', 'Liquidity'],
            ['Quick ratio', '(Cash + AR + Marketable sec) / CL', 'Liquidity'],
            ['Debt-to-equity', 'Total debt / Total equity', 'Solvency'],
            ['ROA', 'Net income / Average total assets', 'Profitability'],
            ['ROE', 'Net income / Average equity', 'Profitability']
          ]
        },
        {
          title: '🧠 Memory Aid: Ratio Categories',
          type: 'callout',
          content: "**\"LSP\"** for ratios:\n\n**L**iquidity = Short-term (current)\n**S**olvency = Long-term (debt)\n**P**rofitability = Returns (income)\n\n**LSP = Full financial picture!**"
        },
        {
          title: '⚠️ Exam Trap: Industry Comparison',
          type: 'warning',
          content: "**Ratios must be compared!**\n\n• To prior periods (trend)\n• To industry benchmarks\n• To competitors\n\n**A ratio alone is meaningless—context required!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Liquidity: Current ratio, quick ratio, cash ratio",
            "Solvency: Debt-to-equity, times interest earned",
            "Profitability: ROA, ROE, profit margins",
            "Compare to trends, industry, competitors",
            "Higher liquidity = Better short-term health",
            "Balance between leverage and safety for solvency"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-IV-002',
    section: 'BAR',
    title: "Trend Analysis & Benchmarking",
    description: "Master horizontal and vertical analysis techniques",
    order: 33,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Financial Analysis"],
    blueprintArea: 'BAR-IV',
    blueprintTopic: 'BAR-IV-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Single-year data tells little—trends reveal the story! Horizontal and vertical analysis help identify patterns and compare companies of different sizes. Essential skills for BAR!"
        },
        {
          title: 'Types of Analysis',
          type: 'text',
          content: "**Horizontal analysis:**\n• Year-over-year changes\n• Shows trends over time\n• Absolute and percentage change\n\n**Vertical analysis:**\n• Common-size statements\n• Each item as % of base\n• Compare companies of different sizes"
        },
        {
          title: 'Common-Size Statements',
          type: 'table',
          headers: ['Statement', 'Base (100%)'],
          rows: [
            ['Income statement', 'Net sales/Revenue'],
            ['Balance sheet', 'Total assets'],
            ['Cash flow statement', 'Total cash from operations']
          ]
        },
        {
          title: '🧠 Memory Aid: Analysis Types',
          type: 'callout',
          content: "**\"HV\"** for analysis:\n\n**H**orizontal = History (time series)\n**V**ertical = Various sizes (common-size)\n\n**H looks across years; V looks within one year!**"
        },
        {
          title: '⚠️ Exam Trap: Base Year Selection',
          type: 'warning',
          content: "**Horizontal analysis base year:**\n\n• Choose representative year\n• Abnormal base → Misleading trends\n• Watch for acquisition/divestiture effects\n\n**Garbage in = Garbage out!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Horizontal: Compare across time periods",
            "Vertical: Each item as % of base amount",
            "Income statement base: Revenue",
            "Balance sheet base: Total assets",
            "Benchmarking: Compare to industry/competitors",
            "Multiple years reveal meaningful trends"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-IV-003',
    section: 'BAR',
    title: "Prospective Financial Statements",
    description: "Understand forecasts and projections",
    order: 34,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Financial Analysis"],
    blueprintArea: 'BAR-IV',
    blueprintTopic: 'BAR-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Looking forward matters as much as looking back! Forecasts and projections help with planning and decision-making. Understanding these prospective statements is important for BAR!"
        },
        {
          title: 'Forecasts vs. Projections',
          type: 'text',
          content: "**Forecast:**\n• Expected future results\n• Based on expected conditions\n• Management's best estimate\n\n**Projection:**\n• Hypothetical results\n• Based on \"what if\" assumptions\n• One or more hypothetical conditions"
        },
        {
          title: 'Key Differences',
          type: 'table',
          headers: ['Feature', 'Forecast', 'Projection'],
          rows: [
            ['Basis', 'Expected conditions', 'Hypothetical conditions'],
            ['Use', 'General use', 'Limited use (specified users)'],
            ['Assumptions', 'Most likely', '"What if" scenarios'],
            ['Distribution', 'Broad distribution OK', 'Restricted distribution']
          ]
        },
        {
          title: '🧠 Memory Aid: Forecast vs. Projection',
          type: 'callout',
          content: "**\"F = Future Expected, P = Pretend\"**\n\n**F**orecast = What we EXPECT\n**P**rojection = What IF (hypothetical)\n\n**Forecasts predict; Projections explore!**"
        },
        {
          title: '⚠️ Exam Trap: Limited Use',
          type: 'warning',
          content: "**Projections = Limited use only!**\n\n• Only for specified users\n• NOT for general distribution\n• Based on hypothetical assumptions\n\n**Forecasts can be widely distributed; projections cannot!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Forecast: Expected results, general use",
            "Projection: Hypothetical results, limited use",
            "Both are prospective financial statements",
            "Forecasts based on most likely assumptions",
            "Projections explore 'what if' scenarios",
            "Distribution differs based on type"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-IV-004',
    section: 'BAR',
    title: "Cost-Volume-Profit Analysis",
    description: "Master CVP analysis and breakeven calculations",
    order: 35,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Financial Analysis"],
    blueprintArea: 'BAR-IV',
    blueprintTopic: 'BAR-IV-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "How many units to break even? What's the profit at different volumes? CVP analysis answers these critical questions. A fundamental tool for decision-making on BAR!"
        },
        {
          title: 'CVP Fundamentals',
          type: 'text',
          content: "**Key components:**\n\n• Selling price per unit\n• Variable cost per unit\n• Fixed costs (total)\n• Contribution margin = Price − Variable cost\n\n**Contribution margin covers fixed costs, then profit**"
        },
        {
          title: 'CVP Formulas',
          type: 'table',
          headers: ['Measure', 'Formula'],
          rows: [
            ['Contribution margin (unit)', 'Price − Variable cost'],
            ['CM ratio', 'CM / Price'],
            ['Breakeven (units)', 'Fixed costs / CM per unit'],
            ['Breakeven (dollars)', 'Fixed costs / CM ratio'],
            ['Target profit (units)', '(Fixed costs + Target profit) / CM']
          ]
        },
        {
          title: '🧠 Memory Aid: Breakeven',
          type: 'callout',
          content: "**\"FCM\"** for breakeven:\n\n**F**ixed costs ÷\n**C**ontribution\n**M**argin\n\n**FCM = Units to break even!**"
        },
        {
          title: '⚠️ Exam Trap: Assumptions',
          type: 'warning',
          content: "**CVP assumes:**\n\n• Linear revenue and costs\n• Fixed costs remain fixed\n• Variable costs are truly variable\n• Sales mix constant (multi-product)\n\n**Violations break the model!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "CM = Price − Variable cost per unit",
            "Breakeven units = Fixed costs / CM per unit",
            "Breakeven $ = Fixed costs / CM ratio",
            "Target profit: Add to fixed costs",
            "Margin of safety = Actual − Breakeven",
            "Assumes linear relationships and constant mix"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-IV-005',
    section: 'BAR',
    title: "Budgeting & Forecasting",
    description: "Master budgeting concepts and techniques",
    order: 36,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Financial Analysis"],
    blueprintArea: 'BAR-IV',
    blueprintTopic: 'BAR-IV-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Budgets are the financial roadmap! Understanding different budget types and their purposes helps evaluate performance and plan resources. Key concepts for BAR!"
        },
        {
          title: 'Types of Budgets',
          type: 'text',
          content: "**Operating budget:**\n• Sales, production, purchases\n• SG&A expenses\n• Budgeted income statement\n\n**Financial budget:**\n• Capital expenditures\n• Cash budget\n• Budgeted balance sheet"
        },
        {
          title: 'Budget Types',
          type: 'table',
          headers: ['Type', 'Description'],
          rows: [
            ['Static', 'Fixed for one activity level'],
            ['Flexible', 'Adjusts for actual activity'],
            ['Master', 'Comprehensive company budget'],
            ['Rolling', 'Continuously updated (12-month window)'],
            ['Zero-based', 'Start from zero each period']
          ]
        },
        {
          title: '🧠 Memory Aid: Budget Sequence',
          type: 'callout',
          content: "**\"SPPP-C\"** budget order:\n\n**S**ales budget (starting point)\n**P**roduction budget\n**P**urchases budget (materials)\n**P**ayroll budget (labor)\n**C**ash budget (ending point)\n\n**Sales drives everything!**"
        },
        {
          title: '⚠️ Exam Trap: Static vs. Flexible',
          type: 'warning',
          content: "**Static budget:**\n• Planned activity level\n• Compare actual to plan\n\n**Flexible budget:**\n• Actual activity level\n• Better for performance evaluation\n\n**Flexible removes volume variance!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Sales budget is the starting point",
            "Static: Fixed activity level",
            "Flexible: Adjusted for actual volume",
            "Master budget: All company budgets combined",
            "Cash budget: Timing of receipts/disbursements",
            "Rolling budgets always look 12 months ahead"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-IV-006',
    section: 'BAR',
    title: "Variance Analysis",
    description: "Master budget variance calculations and analysis",
    order: 37,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Financial Analysis"],
    blueprintArea: 'BAR-IV',
    blueprintTopic: 'BAR-IV-B-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Why did we miss budget? Variance analysis breaks down differences into price, efficiency, and volume components. Understanding these helps explain performance on BAR!"
        },
        {
          title: 'Variance Framework',
          type: 'text',
          content: "**Total variance:**\n\nActual results − Budgeted results\n\n**Favorable (F):** Better than budget\n**Unfavorable (U):** Worse than budget\n\n**Break into components for insight**"
        },
        {
          title: 'Key Variances',
          type: 'table',
          headers: ['Variance', 'Formula'],
          rows: [
            ['Material price', '(Actual price − Std price) × Actual qty'],
            ['Material quantity', '(Actual qty − Std qty allowed) × Std price'],
            ['Labor rate', '(Actual rate − Std rate) × Actual hours'],
            ['Labor efficiency', '(Actual hours − Std hours allowed) × Std rate'],
            ['Volume', '(Budgeted volume − Actual volume) × Std CM']
          ]
        },
        {
          title: '🧠 Memory Aid: Variance Formulas',
          type: 'callout',
          content: "**\"PAQ\"** for price variance:\n**P**rice diff × **A**ctual **Q**uantity\n\n**\"QSP\"** for quantity variance:\n**Q**uantity diff × **S**tandard **P**rice\n\n**Price uses Actual; Quantity uses Standard!**"
        },
        {
          title: '⚠️ Exam Trap: Favorable vs. Unfavorable',
          type: 'warning',
          content: "**Favorable ≠ Always good!**\n\n**Example:**\n• Favorable material price + Unfavorable quality\n• Cheaper materials caused more waste\n\n**Look at related variances together!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Price variance: Price diff × Actual quantity",
            "Quantity variance: Qty diff × Standard price",
            "Favorable = Better than budget",
            "Unfavorable = Worse than budget",
            "Related variances should be analyzed together",
            "Investigate significant variances"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-IV-007',
    section: 'BAR',
    title: "Cost Accounting: Job & Process",
    description: "Master job-order and process costing systems",
    order: 38,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Financial Analysis"],
    blueprintArea: 'BAR-IV',
    blueprintTopic: 'BAR-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Different products need different costing! Job costing tracks individual orders; process costing averages costs across identical units. Know which to use for BAR!"
        },
        {
          title: 'Job vs. Process Costing',
          type: 'text',
          content: "**Job-order costing:**\n• Unique products/batches\n• Track costs per job\n• Custom manufacturing, construction\n\n**Process costing:**\n• Homogeneous products\n• Average costs per unit\n• Chemicals, food processing"
        },
        {
          title: 'Comparison',
          type: 'table',
          headers: ['Feature', 'Job Costing', 'Process Costing'],
          rows: [
            ['Cost object', 'Individual job', 'Process/Department'],
            ['Products', 'Unique', 'Homogeneous'],
            ['Cost accumulation', 'By job', 'By process'],
            ['Unit cost', 'Job cost / Units in job', 'Process cost / Equivalent units']
          ]
        },
        {
          title: '🧠 Memory Aid: Job vs. Process',
          type: 'callout',
          content: "**\"JUP\"** for Job costing:\n**J**ob = **U**nique **P**roducts\n\n**\"PAH\"** for Process costing:\n**P**rocess = **A**verage for **H**omogeneous\n\n**Unique = Job; Identical = Process!**"
        },
        {
          title: '⚠️ Exam Trap: Equivalent Units',
          type: 'warning',
          content: "**Process costing uses equivalent units:**\n\n**Equivalent units:**\n• WIP × % complete\n• Represents full units of work done\n\n**Two methods:**\n• Weighted average (simpler)\n• FIFO (separates periods)"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Job costing: Unique products, track by job",
            "Process costing: Homogeneous, average cost",
            "Job: Custom furniture, construction",
            "Process: Oil refining, chemicals",
            "Equivalent units for partial completion",
            "Both use DM + DL + OH"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-IV-008',
    section: 'BAR',
    title: "Activity-Based Costing",
    description: "Master ABC costing methodology",
    order: 39,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Financial Analysis"],
    blueprintArea: 'BAR-IV',
    blueprintTopic: 'BAR-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Traditional costing can distort product costs! Activity-based costing assigns overhead based on actual activities that cause costs. More accurate costing for better decisions on BAR!"
        },
        {
          title: 'ABC Overview',
          type: 'text',
          content: "**Activity-Based Costing:**\n\n• Identify activities that cause costs\n• Assign costs to activities (cost pools)\n• Allocate to products based on activity usage\n\n**More accurate than single OH rate**"
        },
        {
          title: 'ABC vs. Traditional',
          type: 'table',
          headers: ['Feature', 'Traditional', 'ABC'],
          rows: [
            ['Cost pools', 'One or few', 'Multiple activity pools'],
            ['Allocation base', 'Volume-based (DL hours)', 'Multiple cost drivers'],
            ['Accuracy', 'Less accurate', 'More accurate'],
            ['Complexity', 'Simpler', 'More complex']
          ]
        },
        {
          title: '🧠 Memory Aid: ABC Steps',
          type: 'callout',
          content: "**\"IAAA\"** for ABC:\n\n**I**dentify activities\n**A**ssign costs to pools\n**A**llocate to products\n**A**nalyze for decisions\n\n**IAAA = ABC process!**"
        },
        {
          title: '⚠️ Exam Trap: Cost Drivers',
          type: 'warning',
          content: "**Cost driver selection critical!**\n\n**Good drivers:**\n• Cause the cost\n• Measurable\n• Different for different products\n\n**Bad driver = Wrong product costs!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "ABC: Multiple cost pools and drivers",
            "More accurate than traditional single-rate",
            "Identifies activities that cause costs",
            "Better for diverse products/complexity",
            "Costlier to implement than traditional",
            "Cost drivers must cause the cost"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-IV-009',
    section: 'BAR',
    title: "Capital Budgeting: NPV, IRR, Payback",
    description: "Master capital investment decision techniques",
    order: 40,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Financial Analysis"],
    blueprintArea: 'BAR-IV',
    blueprintTopic: 'BAR-IV-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Big investments require careful analysis! NPV, IRR, and payback help evaluate whether projects create value. These capital budgeting tools are essential for BAR!"
        },
        {
          title: 'Capital Budgeting Methods',
          type: 'text',
          content: "**Three main methods:**\n\n**NPV:** Present value of cash flows minus investment\n**IRR:** Rate that makes NPV = 0\n**Payback:** Time to recover investment\n\n**NPV is generally preferred**"
        },
        {
          title: 'Method Comparison',
          type: 'table',
          headers: ['Method', 'Decision Rule', 'Pros/Cons'],
          rows: [
            ['NPV', 'Accept if NPV > 0', 'Best method; considers TVM and all cash flows'],
            ['IRR', 'Accept if IRR > Required return', 'Intuitive %; can give multiple rates'],
            ['Payback', 'Accept if payback < Target', 'Simple; ignores TVM and later cash flows']
          ]
        },
        {
          title: '🧠 Memory Aid: NPV Formula',
          type: 'callout',
          content: "**\"Cash In Present Value\"**\n\nNPV = Σ [CF ÷ (1+r)^n] − Initial Investment\n\n**Positive NPV = Value created!**\n**Negative NPV = Value destroyed!**"
        },
        {
          title: 'IRR Calculation',
          type: 'text',
          content: "**Internal Rate of Return:**\n\n• Rate where NPV = 0\n• Compare to required return (hurdle rate)\n• If IRR > Required return → Accept\n\n**Caution:** Non-conventional cash flows can give multiple IRRs"
        },
        {
          title: '⚠️ Exam Trap: Payback Limitations',
          type: 'warning',
          content: "**Payback ignores:**\n\n• Time value of money\n• Cash flows after payback\n• Profitability of project\n\n**Simple but flawed—use with other methods!**\n\n**Discounted payback addresses TVM issue**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "NPV: Accept if positive (best method)",
            "IRR: Accept if > required return",
            "Payback: Simple but ignores TVM",
            "NPV conflicts with IRR: Use NPV",
            "All methods use after-tax cash flows",
            "Consider qualitative factors too"
          ]
        }
      ]
    }
  },
  // ==========================================
  // ADDITIONAL BAR LESSONS - Business Analysis
  // ==========================================
  {
    id: 'BAR-V-001',
    section: 'BAR',
    title: "Data Analytics Fundamentals",
    description: "Understand data analytics concepts and applications in accounting",
    order: 41,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Business Analysis", "Data Analytics"],
    blueprintArea: 'null',
    blueprintTopic: 'null-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Data analytics is transforming accounting! CPAs must understand how to use data to identify trends, anomalies, and insights. This is a growing focus area on the BAR exam!"
        },
        {
          title: 'Types of Data Analytics',
          type: 'table',
          headers: ['Type', 'Purpose', 'Example'],
          rows: [
            ['Descriptive', 'What happened?', 'Revenue by region last quarter'],
            ['Diagnostic', 'Why did it happen?', 'Root cause of variance'],
            ['Predictive', 'What will happen?', 'Sales forecast models'],
            ['Prescriptive', 'What should we do?', 'Optimal pricing recommendation']
          ]
        },
        {
          title: '🧠 Memory Aid: Analytics Types',
          type: 'callout',
          content: "**\"DDPP\"** for analytics types:\n\n**D**escriptive → Look back\n**D**iagnostic → Dig deeper\n**P**redictive → Project forward\n**P**rescriptive → Provide action\n\n**Past → Why → Future → Action!**"
        },
        {
          title: 'Data Analytics Process',
          type: 'text',
          content: "**CRISP-DM Framework:**\n\n1. **Business Understanding** - Define objectives\n2. **Data Understanding** - Explore available data\n3. **Data Preparation** - Clean and transform\n4. **Modeling** - Apply analytics techniques\n5. **Evaluation** - Assess results\n6. **Deployment** - Implement findings"
        },
        {
          title: 'Key Analytics Tools',
          type: 'text',
          content: "**Common tools in practice:**\n\n• **Excel** - Basic analysis, pivot tables\n• **SQL** - Database queries\n• **Visualization** - Tableau, Power BI\n• **Statistical** - R, Python\n• **Audit-specific** - ACL, IDEA"
        },
        {
          title: '⚠️ Exam Trap: Data Quality',
          type: 'warning',
          content: "**Garbage In, Garbage Out!**\n\n**Data quality dimensions:**\n• Accuracy\n• Completeness\n• Timeliness\n• Consistency\n\n**Analytics are only as good as the underlying data!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Four types: Descriptive, Diagnostic, Predictive, Prescriptive",
            "CRISP-DM provides structured analytics approach",
            "Data quality is critical for reliable analytics",
            "CPAs use analytics for audit, fraud detection, forecasting",
            "Visualization helps communicate insights",
            "Understanding limitations is as important as capabilities"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-V-002',
    section: 'BAR',
    title: "Statistical Sampling and Analysis",
    description: "Apply statistical concepts in audit and business contexts",
    order: 42,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Business Analysis", "Data Analytics"],
    blueprintArea: 'null',
    blueprintTopic: 'null-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Statistical sampling allows conclusions about entire populations from testing samples. Understanding confidence levels, sampling risk, and projection techniques is essential for BAR!"
        },
        {
          title: 'Sampling Approaches',
          type: 'table',
          headers: ['Approach', 'Method', 'Use Case'],
          rows: [
            ['Statistical', 'Random selection, quantified risk', 'Audit testing with precision'],
            ['Non-statistical', 'Judgmental selection', 'Targeted testing, walkthroughs'],
            ['Attribute', 'Test rate of occurrence', 'Control testing (deviation rate)'],
            ['Variables', 'Test monetary amounts', 'Substantive testing (misstatement)']
          ]
        },
        {
          title: 'Key Statistical Concepts',
          type: 'text',
          content: "**Sampling Risk:**\n• Risk of incorrect conclusion from sample\n\n**Confidence Level:**\n• Probability sample represents population\n• 95% = 5% risk of incorrect conclusion\n\n**Tolerable Rate/Amount:**\n• Maximum acceptable deviation/error"
        },
        {
          title: '🧠 Memory Aid: Sampling Risk',
          type: 'callout',
          content: "**\"RIRA\"** for sampling risks:\n\n**R**isk of **I**ncorrect **R**ejection = Alpha risk\n(Conclude controls ineffective when effective)\n\n**R**isk of **I**ncorrect **A**cceptance = Beta risk\n(Conclude controls effective when ineffective)\n\n**Beta is WORSE - could miss problems!**"
        },
        {
          title: 'Sample Size Factors',
          type: 'table',
          headers: ['Factor', 'Effect on Sample Size'],
          rows: [
            ['Higher confidence needed', 'LARGER sample'],
            ['Lower tolerable error', 'LARGER sample'],
            ['Higher expected error', 'LARGER sample'],
            ['Larger population', 'Slightly larger sample'],
            ['More variability', 'LARGER sample']
          ]
        },
        {
          title: '⚠️ Exam Trap: Projection',
          type: 'warning',
          content: "**Project sample results to population!**\n\n• Found 2% deviation rate in sample\n• Project 2% to ENTIRE population\n• Add allowance for sampling risk\n\n**Don't just report sample results—EXTRAPOLATE!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Statistical sampling quantifies risk; non-statistical is judgmental",
            "Attribute sampling for controls; Variables for amounts",
            "Beta risk (incorrect acceptance) is more serious",
            "Sample size increases with confidence and precision needs",
            "Always project results to population",
            "Consider both sampling and non-sampling risk"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-V-003',
    section: 'BAR',
    title: "Regression Analysis",
    description: "Apply regression techniques for forecasting and analysis",
    order: 43,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Business Analysis", "Data Analytics"],
    blueprintArea: 'null',
    blueprintTopic: 'null-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Regression analysis quantifies relationships between variables! It's used for budgeting, cost estimation, and analytical procedures in audit. BAR tests application of these concepts!"
        },
        {
          title: 'Simple Linear Regression',
          type: 'text',
          content: "**Y = a + bX**\n\n**Where:**\n• Y = Dependent variable (what we predict)\n• X = Independent variable (predictor)\n• a = Y-intercept (fixed component)\n• b = Slope (variable component)\n\n**Example:** Total Cost = Fixed Cost + (Variable Rate × Units)"
        },
        {
          title: 'Key Regression Statistics',
          type: 'table',
          headers: ['Statistic', 'What It Measures', 'Interpretation'],
          rows: [
            ['R-squared (R²)', 'Variation explained', '0.85 = 85% explained by model'],
            ['Coefficient', 'Change in Y per unit X', 'Slope of relationship'],
            ['Standard Error', 'Precision of estimate', 'Lower = more precise'],
            ['P-value', 'Statistical significance', '<0.05 = significant']
          ]
        },
        {
          title: '🧠 Memory Aid: R-squared',
          type: 'callout',
          content: "**R² = \"Reliability\" (sort of)**\n\nR² of 0.90 means:\n• 90% of variation EXPLAINED by model\n• 10% due to other factors\n\n**Higher R² = Better fit (but check causation!)**"
        },
        {
          title: 'Multiple Regression',
          type: 'text',
          content: "**Y = a + b₁X₁ + b₂X₂ + ... + bₙXₙ**\n\n**Uses multiple predictors:**\n• Sales = f(advertising, price, economy)\n• Cost = f(units, complexity, setup)\n\n**Watch for multicollinearity:**\n• When predictors are highly correlated\n• Makes individual coefficients unreliable"
        },
        {
          title: '⚠️ Exam Trap: Correlation ≠ Causation',
          type: 'warning',
          content: "**High R² doesn't prove causation!**\n\n**Examples of spurious correlation:**\n• Ice cream sales and drowning (both caused by summer)\n• Stork population and births (both rural phenomena)\n\n**Always consider logical relationship!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Simple regression: Y = a + bX (one predictor)",
            "Multiple regression: Multiple predictors",
            "R² measures how well model explains variation",
            "P-value tests statistical significance",
            "Correlation does NOT prove causation",
            "Watch for multicollinearity in multiple regression"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-V-004',
    section: 'BAR',
    title: "Variance Analysis Deep Dive",
    description: "Master multi-level variance analysis for performance evaluation",
    order: 44,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Business Analysis", "Managerial Accounting"],
    blueprintArea: 'null',
    blueprintTopic: 'null-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Variance analysis isolates reasons for differences between budgeted and actual results! Understanding how to decompose variances into price, quantity, and mix components is critical for BAR!"
        },
        {
          title: 'Direct Material Variances',
          type: 'text',
          content: "**Price Variance:**\n(Actual Price − Standard Price) × Actual Quantity\n\n**Quantity Variance:**\n(Actual Quantity − Standard Quantity) × Standard Price\n\n**Total = Price + Quantity**"
        },
        {
          title: 'Direct Labor Variances',
          type: 'table',
          headers: ['Variance', 'Formula', 'Favorable If'],
          rows: [
            ['Rate Variance', '(AR − SR) × AH', 'Actual Rate < Standard'],
            ['Efficiency Variance', '(AH − SH) × SR', 'Actual Hours < Standard'],
            ['Total Labor Variance', 'Rate + Efficiency', 'Total < Budget']
          ]
        },
        {
          title: '🧠 Memory Aid: Variance Formulas',
          type: 'callout',
          content: "**\"PQ Sandwich\"** method:\n\nAP × AQ ←Price→ SP × AQ ←Quantity→ SP × SQ\n\n**Price uses ACTUAL quantity**\n**Quantity uses STANDARD price**\n\n**Sandwiched term (SP × AQ) is used for BOTH!**"
        },
        {
          title: 'Overhead Variances',
          type: 'text',
          content: "**Variable Overhead:**\n• Spending Variance: Actual vs. budgeted at actual activity\n• Efficiency Variance: Activity variance × standard rate\n\n**Fixed Overhead:**\n• Budget Variance: Actual vs. budgeted fixed OH\n• Volume Variance: Budgeted vs. applied (capacity utilization)"
        },
        {
          title: '⚠️ Exam Trap: Favorable vs. Unfavorable',
          type: 'warning',
          content: "**Favorable ≠ Good Management!**\n\n**Examples of misleading variances:**\n• Favorable price variance from inferior materials\n• Favorable labor efficiency from skipping steps\n• Favorable overhead from underproduction\n\n**Always investigate the CAUSE!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Price variance: Actual vs. Standard price × Actual qty",
            "Quantity variance: Actual vs. Standard qty × Standard price",
            "Labor: Rate and Efficiency variances",
            "Overhead: Variable (spending/efficiency) and Fixed (budget/volume)",
            "Sales: Price, Mix, and Quantity effects",
            "Investigate causes, not just amounts"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-V-005',
    section: 'BAR',
    title: "Transfer Pricing",
    description: "Understand transfer pricing methods and implications",
    order: 45,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Business Analysis", "Managerial Accounting"],
    blueprintArea: 'null',
    blueprintTopic: 'null-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Transfer pricing determines how divisions within a company price internal transactions! It affects divisional performance evaluation, tax planning, and goal congruence. BAR tests these concepts!"
        },
        {
          title: 'Transfer Pricing Methods',
          type: 'table',
          headers: ['Method', 'Price Set At', 'Best When'],
          rows: [
            ['Market-Based', 'External market price', 'Competitive external market exists'],
            ['Cost-Based', 'Variable or full cost', 'No external market; cost data reliable'],
            ['Cost-Plus', 'Cost + markup', 'No market; need profit incentive'],
            ['Negotiated', 'Division agreement', 'Both divisions have bargaining power']
          ]
        },
        {
          title: 'Transfer Pricing Formula',
          type: 'text',
          content: "**Minimum Transfer Price (Selling Division):**\n\nMinimum TP = Variable Cost + Opportunity Cost\n\n**Where opportunity cost:**\n• If excess capacity: $0\n• If at capacity: Contribution margin lost\n\n**Maximum Transfer Price (Buying Division):**\nMaximum TP = External purchase price"
        },
        {
          title: '🧠 Memory Aid: Transfer Pricing Range',
          type: 'callout',
          content: "**\"VOC to Market\"**\n\n**Floor:** Variable cost + Opportunity Cost (seller's minimum)\n**Ceiling:** Market price (buyer's maximum)\n\n**If Floor > Ceiling → Buy externally!**\n**If Floor < Ceiling → Internal transfer benefits company**"
        },
        {
          title: 'Goal Congruence Issues',
          type: 'text',
          content: "**Transfer pricing should promote:**\n\n✓ Decisions optimal for company\n✓ Fair performance evaluation\n✓ Division manager motivation\n\n**Conflicts arise when:**\n• Tax optimization conflicts with performance\n• Division incentives conflict with corporate goals"
        },
        {
          title: '⚠️ Exam Trap: Tax Implications',
          type: 'warning',
          content: "**International transfer pricing is heavily regulated!**\n\n• IRS requires arm's length transactions\n• Section 482 allows IRS to reallocate income\n• Documentation requirements are substantial\n\n**Tax optimization can't override arm's length principle!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Market-based pricing best when external market exists",
            "Minimum TP = Variable cost + Opportunity cost",
            "Maximum TP = External market price",
            "Goal congruence: Individual decisions align with corporate goals",
            "International TP requires arm's length pricing",
            "Consider tax, performance evaluation, and motivation"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-V-006',
    section: 'BAR',
    title: "Balanced Scorecard and KPIs",
    description: "Implement strategic performance measurement systems",
    order: 46,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Business Analysis", "Performance Measurement"],
    blueprintArea: 'null',
    blueprintTopic: 'null-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Financial metrics alone don't tell the whole story! The Balanced Scorecard links strategy to operations through multiple perspectives. BAR tests understanding of comprehensive performance measurement!"
        },
        {
          title: 'Four Perspectives',
          type: 'table',
          headers: ['Perspective', 'Key Question', 'Example Measures'],
          rows: [
            ['Financial', 'How do we look to shareholders?', 'ROI, EVA, Revenue growth'],
            ['Customer', 'How do customers see us?', 'Satisfaction, Retention, Market share'],
            ['Internal Process', 'What must we excel at?', 'Quality, Cycle time, Efficiency'],
            ['Learning & Growth', 'Can we continue to improve?', 'Training, Innovation, Employee satisfaction']
          ]
        },
        {
          title: 'Strategy Map',
          type: 'text',
          content: "**Cause-and-effect relationships:**\n\nLearning & Growth → Improves\n↓\nInternal Processes → Drives\n↓\nCustomer Results → Generates\n↓\nFinancial Performance\n\n**Bottom perspectives ENABLE top perspectives**"
        },
        {
          title: '🧠 Memory Aid: BSC Perspectives',
          type: 'callout',
          content: "**\"FICL\" = Financial success requires:**\n\n**F**inancial outcomes depend on...\n**I**nternal processes which need...\n**C**ustomer satisfaction built through...\n**L**earning & Growth\n\n**Start at bottom, flow to top!**"
        },
        {
          title: 'Key Performance Indicators (KPIs)',
          type: 'text',
          content: "**Good KPIs are SMART:**\n\n• **S**pecific - Clear definition\n• **M**easurable - Quantifiable\n• **A**chievable - Realistic targets\n• **R**elevant - Linked to strategy\n• **T**ime-bound - Defined period\n\n**Leading vs. Lagging:**\n• Leading: Predict future (training hours)\n• Lagging: Report past (revenue)"
        },
        {
          title: '⚠️ Exam Trap: Too Many Metrics',
          type: 'warning',
          content: "**More metrics ≠ Better measurement!**\n\n**Common mistakes:**\n• Measuring everything possible\n• Conflicting measures\n• Gaming the metrics\n• Ignoring qualitative factors\n\n**Focus on vital few, not trivial many!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "BSC: Financial, Customer, Internal Process, Learning & Growth",
            "Strategy maps show cause-and-effect relationships",
            "Leading indicators predict; Lagging indicators report",
            "KPIs should be SMART",
            "Balance quantitative and qualitative measures",
            "Link measures to strategic objectives"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-V-007',
    section: 'BAR',
    title: "Economic Value Added (EVA)",
    description: "Calculate and interpret residual income metrics",
    order: 47,
    duration: 45,
    difficulty: 'advanced',
    topics: ["Business Analysis", "Performance Measurement"],
    blueprintArea: 'null',
    blueprintTopic: 'null-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "EVA measures true economic profit after accounting for capital costs! Unlike accounting profit, EVA shows whether a company creates value for shareholders. This is a key BAR concept!"
        },
        {
          title: 'EVA Formula',
          type: 'text',
          content: "**EVA = NOPAT − (Capital × WACC)**\n\n**Where:**\n• NOPAT = Net Operating Profit After Tax\n• Capital = Invested capital\n• WACC = Weighted Average Cost of Capital\n\n**Positive EVA = Value creation**\n**Negative EVA = Value destruction**"
        },
        {
          title: 'EVA vs. Traditional Metrics',
          type: 'table',
          headers: ['Metric', 'Formula', 'Limitation'],
          rows: [
            ['Net Income', 'Revenue − Expenses', 'Ignores cost of equity'],
            ['ROI', 'Income ÷ Investment', 'Percentage can mislead'],
            ['Residual Income', 'Income − (Capital × Rate)', 'Dollar amount, not rate'],
            ['EVA', 'NOPAT − Capital Charge', 'Requires adjustments']
          ]
        },
        {
          title: '🧠 Memory Aid: EVA Calculation',
          type: 'callout',
          content: "**\"NOPAT minus Capital Charge\"**\n\nStep 1: Calculate NOPAT (operating profit × (1 − tax rate))\nStep 2: Calculate Capital Charge (Capital × WACC)\nStep 3: EVA = Step 1 − Step 2\n\n**Positive = Creating shareholder value!**"
        },
        {
          title: 'NOPAT Adjustments',
          type: 'text',
          content: "**Common adjustments to accounting profit:**\n\n• Add back: R&D expense (capitalize)\n• Add back: Goodwill amortization\n• Add back: Operating lease interest\n• Remove: Non-operating items\n\n**Goal: Reflect economic reality**"
        },
        {
          title: '⚠️ Exam Trap: ROI vs. EVA Decisions',
          type: 'warning',
          content: "**ROI can lead to BAD decisions!**\n\n**Example:** Division with 15% ROI, Company WACC 10%\n• Project offers 12% return\n• Manager rejects (lowers division ROI)\n• But 12% > 10% WACC = Value creation!\n\n**EVA encourages all positive-NPV projects**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "EVA = NOPAT − (Capital × WACC)",
            "Positive EVA indicates value creation",
            "EVA addresses cost of equity that accounting ignores",
            "ROI can lead to suboptimal decisions",
            "NOPAT requires adjustments for economic profit",
            "EVA aligns manager incentives with shareholders"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-V-008',
    section: 'BAR',
    title: "Business Process Improvement",
    description: "Apply process improvement methodologies",
    order: 48,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Business Analysis", "Operations"],
    blueprintArea: 'null',
    blueprintTopic: 'null-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "CPAs increasingly advise on operational efficiency! Understanding Lean, Six Sigma, and other process improvement methods helps identify waste and drive performance. BAR tests these concepts!"
        },
        {
          title: 'Lean Principles',
          type: 'text',
          content: "**Eliminate waste (Muda):**\n\n**7 Types of Waste:**\n1. **T**ransportation\n2. **I**nventory\n3. **M**otion\n4. **W**aiting\n5. **O**verproduction\n6. **O**verprocessing\n7. **D**efects\n\n**Memory: TIM WOOD**"
        },
        {
          title: 'Six Sigma DMAIC',
          type: 'table',
          headers: ['Phase', 'Purpose', 'Key Tools'],
          rows: [
            ['Define', 'Identify problem', 'Project charter, VOC'],
            ['Measure', 'Quantify current state', 'Data collection, process maps'],
            ['Analyze', 'Find root causes', 'Fishbone, 5 Whys, Pareto'],
            ['Improve', 'Implement solutions', 'Pilot testing, DOE'],
            ['Control', 'Sustain gains', 'Control charts, SOPs']
          ]
        },
        {
          title: '🧠 Memory Aid: DMAIC',
          type: 'callout',
          content: "**\"Dumb Managers Always Ignore Controls\"**\n\n**D**efine the problem\n**M**easure current performance\n**A**nalyze root causes\n**I**mprove the process\n**C**ontrol to sustain\n\n**Don't skip Control—gains will fade!**"
        },
        {
          title: 'Theory of Constraints',
          type: 'text',
          content: "**Focus on bottlenecks:**\n\n1. **Identify** the constraint\n2. **Exploit** it (maximize throughput)\n3. **Subordinate** everything else to it\n4. **Elevate** (add capacity if needed)\n5. **Repeat** (find new constraint)\n\n**Throughput = Revenue − Direct Materials**"
        },
        {
          title: '⚠️ Exam Trap: Local vs. Global Optima',
          type: 'warning',
          content: "**Improving one area may hurt overall!**\n\n**Example:**\n• Faster machine upstream of bottleneck\n• Creates more WIP inventory\n• Doesn't increase throughput\n• Wastes money!\n\n**Focus on the CONSTRAINT, not everywhere!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Lean: Eliminate 7 wastes (TIM WOOD)",
            "Six Sigma: DMAIC methodology",
            "Theory of Constraints: Focus on bottleneck",
            "Throughput = Revenue − Direct Materials",
            "Local optimization can hurt global performance",
            "Control phase is essential for sustainability"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-V-009',
    section: 'BAR',
    title: "Risk Assessment and Management",
    description: "Apply enterprise risk management frameworks",
    order: 49,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Business Analysis", "Risk Management"],
    blueprintArea: 'null',
    blueprintTopic: 'null-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Enterprise Risk Management (ERM) is essential for modern business! CPAs must understand how to identify, assess, and respond to risks across the organization. BAR tests ERM concepts!"
        },
        {
          title: 'COSO ERM Framework',
          type: 'text',
          content: "**Five Components:**\n\n1. **Governance & Culture** - Tone at top, oversight\n2. **Strategy & Objective-Setting** - Risk appetite aligned\n3. **Performance** - Identify and assess risks\n4. **Review & Revision** - Monitor changes\n5. **Information & Communication** - Reporting risks"
        },
        {
          title: 'Risk Assessment Matrix',
          type: 'table',
          headers: ['Likelihood/Impact', 'Low Impact', 'Medium Impact', 'High Impact'],
          rows: [
            ['High Likelihood', 'Moderate', 'High', 'Critical'],
            ['Medium Likelihood', 'Low', 'Moderate', 'High'],
            ['Low Likelihood', 'Minimal', 'Low', 'Moderate']
          ]
        },
        {
          title: '🧠 Memory Aid: Risk Responses',
          type: 'callout',
          content: "**\"TARA\"** for risk responses:\n\n**T**ransfer (insurance, outsource)\n**A**void (don't do the activity)\n**R**educe (controls, mitigation)\n**A**ccept (retain the risk)\n\n**Choose based on cost vs. benefit!**"
        },
        {
          title: 'Risk Categories',
          type: 'table',
          headers: ['Category', 'Examples'],
          rows: [
            ['Strategic', 'Competition, market changes, reputation'],
            ['Operational', 'Process failures, IT systems, fraud'],
            ['Financial', 'Credit, liquidity, market risk'],
            ['Compliance', 'Legal, regulatory, contractual'],
            ['Reporting', 'Financial statement errors, disclosures']
          ]
        },
        {
          title: '⚠️ Exam Trap: Risk Appetite vs. Tolerance',
          type: 'warning',
          content: "**Risk Appetite ≠ Risk Tolerance!**\n\n**Risk Appetite:** Broad level of risk willing to accept\n(Strategic, board-level decision)\n\n**Risk Tolerance:** Acceptable variation in outcomes\n(Operational, management-level)\n\n**Tolerance should align with Appetite!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "COSO ERM: Five integrated components",
            "Risk responses: Transfer, Avoid, Reduce, Accept",
            "Assess risks by likelihood × impact",
            "Risk appetite is strategic; tolerance is operational",
            "Categories: Strategic, Operational, Financial, Compliance, Reporting",
            "ERM should be integrated with strategy"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-V-010',
    section: 'BAR',
    title: "IFRS vs. US GAAP Key Differences",
    description: "Compare major differences between IFRS and US GAAP",
    order: 50,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Technical Accounting", "IFRS"],
    blueprintArea: 'null',
    blueprintTopic: 'null-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Global business requires understanding both frameworks! BAR tests key differences between IFRS and US GAAP. Focus on conceptual differences and major accounting treatments!"
        },
        {
          title: 'Framework Differences',
          type: 'table',
          headers: ['Aspect', 'US GAAP', 'IFRS'],
          rows: [
            ['Approach', 'Rules-based', 'Principles-based'],
            ['Standard setter', 'FASB', 'IASB'],
            ['Inventory methods', 'LIFO allowed', 'LIFO prohibited'],
            ['Revaluation', 'Generally prohibited', 'Allowed for PP&E, intangibles'],
            ['Development costs', 'Expensed', 'Capitalize if criteria met']
          ]
        },
        {
          title: 'Inventory Differences',
          type: 'text',
          content: "**US GAAP:**\n• LIFO, FIFO, weighted average allowed\n• Lower of cost or market\n\n**IFRS:**\n• LIFO prohibited\n• Lower of cost or NRV\n• Reversal of write-downs allowed\n\n**Key exam point: LIFO → FIFO conversion**"
        },
        {
          title: '🧠 Memory Aid: IFRS No LIFO',
          type: 'callout',
          content: "**\"IFRS = In France, Really no LIFO, Sorry!\"**\n\nIFRS prohibits LIFO because:\n• Doesn't reflect current prices on B/S\n• Often used for tax manipulation\n• Doesn't match physical flow\n\n**If converting LIFO to IFRS → Use FIFO or average**"
        },
        {
          title: 'Property, Plant & Equipment',
          type: 'table',
          headers: ['Topic', 'US GAAP', 'IFRS'],
          rows: [
            ['Revaluation', 'Not allowed', 'Allowed (fair value model)'],
            ['Component depreciation', 'Not required', 'Required'],
            ['Impairment reversal', 'Prohibited', 'Required if indicators'],
            ['Interest capitalization', 'Specific borrowings first', 'All borrowings weighted']
          ]
        },
        {
          title: '⚠️ Exam Trap: Convergence Status',
          type: 'warning',
          content: "**Some areas converged, some not!**\n\n**Converged:** Revenue (ASC 606/IFRS 15), Leases (similar)\n**NOT Converged:** Inventory, Revaluation, R&D, Impairment\n\n**Know which topics still differ!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "IFRS is principles-based; US GAAP is rules-based",
            "IFRS prohibits LIFO; allows revaluation",
            "IFRS requires component depreciation",
            "IFRS allows impairment reversal; GAAP doesn't",
            "Revenue recognition now converged (ASC 606/IFRS 15)",
            "R&D: IFRS capitalizes development; GAAP expenses"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-V-011',
    section: 'BAR',
    title: "Revenue Recognition: Complex Arrangements",
    description: "Apply ASC 606 to complex multi-element arrangements",
    order: 51,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Technical Accounting", "Revenue"],
    blueprintArea: 'null',
    blueprintTopic: 'null-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Complex revenue arrangements with multiple deliverables require careful analysis! Understanding how to identify and allocate to performance obligations is critical for BAR!"
        },
        {
          title: 'Identifying Performance Obligations',
          type: 'text',
          content: "**A promise is distinct if:**\n\n1. **Capable of being distinct** - Customer can benefit on its own or with readily available resources\n\n2. **Distinct within context** - Separately identifiable from other promises\n\n**If not distinct → Combine with other promises**"
        },
        {
          title: 'Allocation Methods',
          type: 'table',
          headers: ['Method', 'When to Use', 'Approach'],
          rows: [
            ['Standalone Selling Price', 'Observable price exists', 'Use actual SSP'],
            ['Adjusted Market Assessment', 'No SSP, market data available', 'Estimate from market'],
            ['Expected Cost Plus Margin', 'No market data', 'Cost + reasonable margin'],
            ['Residual', 'SSP highly variable', 'Remainder after other allocations']
          ]
        },
        {
          title: '🧠 Memory Aid: When to Recognize',
          type: 'callout',
          content: "**\"POT\" Test for Over Time:**\n\n**P**erformed and consumed simultaneously\n**O**wner controls asset as created\n**T**ransferred progressively (no alternative use + payment right)\n\n**If ANY met → Recognize over time**\n**If NONE → Recognize at point in time**"
        },
        {
          title: 'Variable Consideration',
          type: 'text',
          content: "**Estimate variable amounts:**\n\n• Discounts, rebates, refunds\n• Performance bonuses\n• Penalties\n\n**Methods:**\n• Expected value (probability-weighted)\n• Most likely amount\n\n**Constrain if significant reversal possible**"
        },
        {
          title: '⚠️ Exam Trap: Bill-and-Hold',
          type: 'warning',
          content: "**Bill-and-hold may allow early recognition IF:**\n\n✓ Substantive reason for arrangement\n✓ Product separately identified as customer's\n✓ Product currently ready for transfer\n✓ Entity cannot use product or direct to another\n\n**Must meet ALL criteria!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Identify distinct performance obligations",
            "Allocate transaction price using SSP hierarchy",
            "Over time if: Simultaneous, Control, or No alternative use",
            "Variable consideration: Expected value or most likely",
            "Apply constraint to variable consideration",
            "Bill-and-hold requires all criteria met"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-V-012',
    section: 'BAR',
    title: "Lease Accounting: Lessee",
    description: "Apply ASC 842 lease accounting from lessee perspective",
    order: 52,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Technical Accounting", "Leases"],
    blueprintArea: 'null',
    blueprintTopic: 'null-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "ASC 842 brought most leases onto the balance sheet! Understanding ROU assets, lease liabilities, and the finance vs. operating distinction is essential for BAR!"
        },
        {
          title: 'Lease Classification',
          type: 'text',
          content: "**Finance Lease if ANY:**\n\n1. Ownership transfers at end\n2. Bargain purchase option\n3. Lease term ≥ 75% of economic life\n4. PV of payments ≥ 90% of fair value\n5. Specialized asset with no alternative use\n\n**Otherwise → Operating Lease**"
        },
        {
          title: 'Initial Measurement',
          type: 'table',
          headers: ['Component', 'Included in ROU Asset', 'Included in Lease Liability'],
          rows: [
            ['PV of lease payments', 'Yes', 'Yes'],
            ['Initial direct costs', 'Yes', 'No'],
            ['Prepaid rent', 'Yes', 'No'],
            ['Lease incentives received', 'Deducted', 'Deducted']
          ]
        },
        {
          title: '🧠 Memory Aid: Finance vs. Operating P&L',
          type: 'callout',
          content: "**Finance Lease:**\n• Amortization (ROU) + Interest (liability)\n• **Front-loaded** expense (higher early)\n\n**Operating Lease:**\n• Single **straight-line** lease expense\n• **Level** expense over term\n\n**Total expense same over life!**"
        },
        {
          title: 'Subsequent Measurement',
          type: 'text',
          content: "**Finance Lease:**\n• ROU: Amortize (usually straight-line)\n• Liability: Effective interest method\n\n**Operating Lease:**\n• ROU: Adjusted to produce straight-line expense\n• Liability: Effective interest method\n\n**Lease liability = PV of remaining payments**"
        },
        {
          title: '⚠️ Exam Trap: Short-Term Exemption',
          type: 'warning',
          content: "**Short-term lease (≤12 months):**\n\n• Can elect to NOT capitalize\n• Recognize expense straight-line\n• Must include renewals that are \"reasonably certain\"\n\n**\"Reasonably certain\" is a HIGH threshold!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Finance if: Transfer, BPO, 75% life, 90% FV, specialized",
            "Both types: ROU asset and lease liability on B/S",
            "Finance: Amortization + Interest (front-loaded)",
            "Operating: Single straight-line expense",
            "Short-term exemption: ≤12 months, policy election",
            "Include options reasonably certain to exercise"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-V-013',
    section: 'BAR',
    title: "Stock-Based Compensation",
    description: "Account for stock options and restricted stock",
    order: 53,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Technical Accounting", "Equity"],
    blueprintArea: 'null',
    blueprintTopic: 'null-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Stock compensation is common in public companies! Understanding measurement, recognition, and modification accounting is key for BAR and real-world practice!"
        },
        {
          title: 'Measurement Date',
          type: 'text',
          content: "**Grant Date Fair Value:**\n\n• Stock options: Use option pricing model (Black-Scholes)\n• Restricted stock: Stock price on grant date\n• Performance awards: Probability-weighted outcomes\n\n**Fair value fixed at grant (usually)**"
        },
        {
          title: 'Recognition Patterns',
          type: 'table',
          headers: ['Award Type', 'Service Condition', 'Recognition Pattern'],
          rows: [
            ['Options with cliff vesting', '3 years', 'Straight-line over 3 years'],
            ['Options with graded vesting', '1/3 each year', 'Accelerated (each tranche separate)'],
            ['Performance with target', 'Achieve metrics', 'Over service period, adjusted for probability'],
            ['Market condition', 'Stock price target', 'Over service period (ignore outcome)']
          ]
        },
        {
          title: '🧠 Memory Aid: Service vs. Performance vs. Market',
          type: 'callout',
          content: "**Condition Types:**\n\n**Service:** Just stay employed → Recognize over period\n**Performance:** Hit targets → Adjust for probability\n**Market:** Stock price goal → Baked into FV, ignore outcome\n\n**Market is SPECIAL - never adjust expense!**"
        },
        {
          title: 'Forfeitures',
          type: 'text',
          content: "**Policy choice:**\n\n**Option 1:** Estimate forfeitures at grant\n• Adjust as actual forfeitures differ\n\n**Option 2:** Recognize forfeitures as they occur\n• Simpler, but more volatility\n\n**Either way, total expense = Awards that vest**"
        },
        {
          title: '⚠️ Exam Trap: Modifications',
          type: 'warning',
          content: "**Modification accounting:**\n\n• Calculate incremental FV (new − old)\n• Old: At modification date\n• New: With modified terms\n\n**Incremental value → Additional expense**\n\n**Cannot reduce expense below original grant value!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Measure at grant date fair value",
            "Options: Use Black-Scholes or similar model",
            "Service conditions: Straight-line or accelerated",
            "Performance: Adjust for probability of achievement",
            "Market conditions: Baked into FV, don't adjust",
            "Modifications: Recognize incremental value"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-V-014',
    section: 'BAR',
    title: "Foreign Currency Translation",
    description: "Apply ASC 830 for foreign subsidiaries and transactions",
    order: 54,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Technical Accounting", "International"],
    blueprintArea: 'null',
    blueprintTopic: 'null-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Multinational companies must translate foreign operations! The functional currency determination and translation method directly impact financial statements. BAR tests these concepts!"
        },
        {
          title: 'Functional Currency Determination',
          type: 'text',
          content: "**Consider economic facts:**\n\n• Primary currency of cash flows\n• Currency of sales prices\n• Currency of costs\n• Currency of financing\n• Volume of intercompany transactions\n\n**Functional = Currency of primary economic environment**"
        },
        {
          title: 'Translation Methods',
          type: 'table',
          headers: ['Method', 'When Used', 'Exchange Difference'],
          rows: [
            ['Current Rate', 'Functional ≠ Reporting', 'OCI (CTA)'],
            ['Remeasurement (Temporal)', 'Functional = Reporting', 'Income Statement'],
            ['Highly Inflationary', '3-yr cumulative > 100%', 'Remeasure (Income)']
          ]
        },
        {
          title: '🧠 Memory Aid: Current Rate Method',
          type: 'callout',
          content: "**\"ACE\" for Current Rate:**\n\n**A**ssets & Liabilities → Current rate\n**C**apital accounts → Historical rate\n**E**xpense/Revenue → Average rate (or historical)\n\n**Difference → OCI (Cumulative Translation Adjustment)**"
        },
        {
          title: 'Remeasurement (Temporal)',
          type: 'text',
          content: "**When functional = parent's currency:**\n\n**Historical rate:**\n• Inventory (LIFO, FIFO specific)\n• PP&E, Depreciation\n• Prepaid expenses\n• Capital accounts\n\n**Current rate:**\n• Cash, Receivables, Payables\n• Most liabilities\n\n**Gain/loss → Income statement**"
        },
        {
          title: '⚠️ Exam Trap: Highly Inflationary',
          type: 'warning',
          content: "**Special rules when inflation > 100% over 3 years:**\n\n• Use parent's currency as functional\n• Remeasure (even if otherwise wouldn't)\n• Gain/loss in income statement\n\n**Cannot use current rate method for hyperinflation!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Functional currency = Primary economic environment",
            "Current rate: All A/L at current, equity at historical",
            "Remeasurement: Monetary at current, non-monetary at historical",
            "Current rate → OCI; Remeasurement → Income",
            "Highly inflationary: Must remeasure (Income)",
            "Foreign currency transactions: Gains/losses in income"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-V-015',
    section: 'BAR',
    title: "Income Tax Accounting: Advanced Topics",
    description: "Master complex deferred tax and valuation allowance issues",
    order: 55,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Technical Accounting", "Taxes"],
    blueprintArea: 'null',
    blueprintTopic: 'null-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Income tax accounting under ASC 740 involves complex judgments! Understanding deferred taxes, valuation allowances, and uncertain tax positions is critical for BAR!"
        },
        {
          title: 'Deferred Tax Basics',
          type: 'text',
          content: "**Deferred Tax Asset (DTA):**\n• Future deductible amounts\n• Examples: Accrued expenses, NOL carryforwards\n\n**Deferred Tax Liability (DTL):**\n• Future taxable amounts\n• Examples: Accelerated depreciation, installment sales"
        },
        {
          title: 'Valuation Allowance',
          type: 'table',
          headers: ['Evidence Type', 'Positive (No VA)', 'Negative (VA Needed)'],
          rows: [
            ['Earnings history', 'Cumulative income', 'Cumulative losses'],
            ['Future income', 'Projections support', 'Uncertain projections'],
            ['Tax strategies', 'Prudent, feasible', 'None available'],
            ['Carryforward period', 'Sufficient time', 'Expiring soon']
          ]
        },
        {
          title: '🧠 Memory Aid: More Likely Than Not',
          type: 'callout',
          content: "**VA Test: \"More likely than not\"**\n\n>50% probability DTA won't be realized?\n→ Record valuation allowance\n\n**Weigh ALL evidence:**\n• Negative evidence gets more weight\n• Must overcome negative with positive\n• Projections alone usually insufficient"
        },
        {
          title: 'Uncertain Tax Positions (FIN 48)',
          type: 'text',
          content: "**Two-step process:**\n\n**Step 1: Recognition**\n• More likely than not (>50%) to be sustained?\n• If no → No benefit recognized\n\n**Step 2: Measurement**\n• Largest amount >50% likely to be realized\n• Cumulative probability analysis"
        },
        {
          title: '⚠️ Exam Trap: Rate Changes',
          type: 'warning',
          content: "**When tax rates change (enacted):**\n\n• Remeasure ALL deferred taxes\n• Use NEW rate (rate when differences reverse)\n• Adjustment goes to income tax expense\n\n**Enacted = Becomes law (not just proposed!)**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "DTA: Future deductions; DTL: Future taxable amounts",
            "Valuation allowance if >50% won't realize DTA",
            "Weigh positive and negative evidence",
            "Uncertain positions: Two-step recognition/measurement",
            "Rate changes: Remeasure at enacted rate",
            "Adjustment from rate change → Tax expense"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-II-010',
    section: 'BAR',
    title: "Derivative Instruments",
    description: "Understand accounting for options, forwards, futures, and swaps",
    order: 56,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Technical Accounting", "Derivatives"],
    blueprintArea: 'BAR-II',
    blueprintTopic: 'BAR-II-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Derivatives are everywhere in modern business! Understanding how to account for options, forwards, futures, and swaps—and when hedge accounting applies—is essential for BAR and real-world financial reporting!"
        },
        {
          title: 'What is a Derivative?',
          type: 'text',
          content: "**Three characteristics (ASC 815):**\n\n1. **Underlying + Notional amount** (rate × amount)\n2. **Little or no initial investment** (vs buying asset directly)\n3. **Net settlement possible** (don't have to take delivery)\n\n**Common derivatives:** Options, forwards, futures, swaps"
        },
        {
          title: 'Types of Derivatives',
          type: 'table',
          headers: ['Type', 'Description'],
          rows: [
            ['Forward', 'Custom contract to buy/sell at future date at set price'],
            ['Future', 'Standardized forward, exchange-traded, marked daily'],
            ['Option', 'Right (not obligation) to buy (call) or sell (put)'],
            ['Swap', 'Exchange of cash flows (interest rate, currency)']
          ]
        },
        {
          title: '🧠 Memory Aid: Derivative Types',
          type: 'callout',
          content: "**\"FFOS\"** = Four derivative types:\n\n**F**orwards (custom, OTC)\n**F**utures (standardized, exchange)\n**O**ptions (right, not obligation)\n**S**waps (exchange cash flows)\n\n**All share the three characteristics!**"
        },
        {
          title: 'General Derivative Accounting',
          type: 'text',
          content: "**Without hedge accounting:**\n\n• Record derivative at FAIR VALUE on balance sheet\n• Changes in fair value → Income statement\n• Creates volatility in earnings!\n\n**With hedge accounting:**\n• Can defer gains/losses to match hedged item\n• Reduces earnings volatility\n• Must meet strict requirements"
        },
        {
          title: 'When is Hedge Accounting Allowed?',
          type: 'text',
          content: "**Requirements:**\n\n1. Formal designation and documentation at inception\n2. Expected to be highly effective\n3. Effectiveness assessed regularly\n4. Hedged item creates exposure to gain/loss\n\n**Without proper documentation: NO hedge accounting!**"
        },
        {
          title: 'Types of Hedges',
          type: 'table',
          headers: ['Hedge Type', 'Purpose', 'G/L Location'],
          rows: [
            ['Fair Value Hedge', 'Hedge changes in FV of asset/liability', 'Income (offset by hedged item)'],
            ['Cash Flow Hedge', 'Hedge variability in expected cash flows', 'OCI (until hedged item affects income)'],
            ['Net Investment Hedge', 'Hedge FX exposure in foreign subsidiary', 'OCI (CTA)']
          ]
        },
        {
          title: 'Fair Value Hedge',
          type: 'text',
          content: "**Hedges changes in fair value of:**\n• Recognized asset or liability\n• Unrecognized firm commitment\n\n**Accounting:**\n• Derivative gains/losses → Income\n• ALSO adjust hedged item's carrying value → Income\n• Gains and losses offset (if effective)\n\n**Example:** Hedge FV of fixed-rate debt with interest rate swap"
        },
        {
          title: 'Cash Flow Hedge',
          type: 'text',
          content: "**Hedges variability in cash flows of:**\n• Forecasted transaction\n• Variable-rate debt payments\n\n**Accounting:**\n• Effective portion → OCI\n• Ineffective portion → Income\n• Reclassify from OCI when hedged item affects income\n\n**Example:** Hedge forecasted inventory purchase with forward contract"
        },
        {
          title: '⚠️ Exam Trap: OCI vs Income',
          type: 'warning',
          content: "**Cash Flow Hedge:**\nEffective portion → OCI (deferred)\nIneffective portion → Income (immediately)\n\n**Fair Value Hedge:**\nALL changes → Income (both derivative AND hedged item)\n\n**Know where gains/losses go for each type!**"
        },
        {
          title: 'Embedded Derivatives',
          type: 'text',
          content: "**Derivative within a host contract:**\n\n**Must bifurcate (separate) if:**\n1. Economic characteristics not closely related to host\n2. Hybrid instrument not at fair value through income\n3. Embedded would be a derivative if standalone\n\n**Example:** Convertible bond (debt host + conversion option)"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Derivative: Underlying + Notional, Little investment, Net settlement",
            "Without hedge accounting: Fair value changes → Income (volatile)",
            "Fair value hedge: Derivative + Hedged item both → Income",
            "Cash flow hedge: Effective → OCI, Ineffective → Income",
            "Hedge accounting requires formal documentation at inception",
            "Embedded derivatives may need to be bifurcated",
            "Must test effectiveness to continue hedge accounting"
          ]
        }
      ]
    }
  },
  {
    id: 'BAR-IV-010',
    section: 'BAR',
    title: "Prospective Financial Information",
    description: "Prepare and present financial forecasts and projections",
    order: 57,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Financial Analysis", "Forecasting"],
    blueprintArea: 'BAR-IV',
    blueprintTopic: 'BAR-IV-A-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Prospective financial information (PFI) helps users understand potential future outcomes! Understanding the difference between forecasts and projections—and how to present them—is tested on BAR and important for advisory work!"
        },
        {
          title: 'Forecast vs Projection',
          type: 'table',
          headers: ['Type', 'Definition', 'Use'],
          rows: [
            ['Forecast', 'Expected results (best estimate)', 'General use'],
            ['Projection', 'Results given hypothetical assumptions', 'Limited use (what-if)']
          ]
        },
        {
          title: 'Financial Forecast',
          type: 'text',
          content: "**Based on expected conditions:**\n\n• Management's best estimate of future results\n• Reflects conditions expected to exist\n• Actions management expects to take\n\n**Can be distributed to:**\n• Third parties (banks, investors)\n• General use\n\n**\"What we EXPECT to happen\""
        },
        {
          title: 'Financial Projection',
          type: 'text',
          content: "**Based on hypothetical assumptions:**\n\n• \"What if\" scenarios\n• Conditions may or may not occur\n• Explores alternative outcomes\n\n**Limited use only:**\n• Must understand limitations\n• Generally for management use\n• May mislead general users\n\n**\"What MIGHT happen if...\""
        },
        {
          title: '🧠 Memory Aid: Forecast vs Projection',
          type: 'callout',
          content: "**\"Forecast = Facts (expected)\"**\n**\"Projection = Possibilities (hypothetical)\"**\n\n**Forecast:** Weatherman's best guess\n**Projection:** \"If a hurricane hits, here's what happens\"\n\n**General use vs Limited use**"
        },
        {
          title: 'Components of PFI',
          type: 'list',
          content: [
            "**Summary of significant assumptions** (basis for numbers)",
            "**Summary of significant accounting policies** (GAAP basis)",
            "**Description of assumptions** - Management responsible for reasonableness",
            "**Narrative description** - What the projection/forecast represents",
            "**Period covered** - Usually one year or less"
          ]
        },
        {
          title: 'Preparer Responsibilities',
          type: 'text',
          content: "**Management/preparer must:**\n\n• Have reasonable basis for assumptions\n• Present in conformity with AICPA guidelines\n• Include summary of assumptions\n• Identify type (forecast vs projection)\n• Limit distribution of projections\n\n**PFI is NOT audited F/S—different standards apply**"
        },
        {
          title: 'CPA Involvement with PFI',
          type: 'table',
          headers: ['Service', 'Level', 'Report'],
          rows: [
            ['Compilation', 'None', 'Assembled without assurance'],
            ['Examination', 'Opinion', 'Reasonable basis for assumptions?'],
            ['Agreed-upon procedures', 'Findings', 'Results of specific procedures']
          ]
        },
        {
          title: '⚠️ Exam Trap: Who Uses What',
          type: 'warning',
          content: "**Forecast = General use** (banks, investors OK)\n**Projection = Limited use only**\n\n**Why?**\n• Projections use hypothetical assumptions\n• General users may not understand limitations\n• Could be misleading without context\n\n**Never distribute projections to general public!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Forecast: Expected results based on expected conditions (general use)",
            "Projection: Hypothetical results based on what-if assumptions (limited use)",
            "Both require summary of significant assumptions",
            "Management responsible for assumption reasonableness",
            "CPA can compile, examine, or perform agreed-upon procedures",
            "Never distribute projections for general use",
            "PFI has its own presentation standards (not GAAP F/S)"
          ]
        }
      ]
    }
  }
];
