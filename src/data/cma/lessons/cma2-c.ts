/**
 * CMA Part 2, Section C: Decision Analysis
 * Weight: 25% of Part 2 Exam (HIGHEST WEIGHT)
 * 
 * Topics covered:
 * - Cost-volume-profit analysis
 * - Marginal analysis
 * - Pricing strategies
 * 
 * Based on IMA CMA Content Specification Outline 2025-2026
 */

import { Lesson } from '../../../types';

export const cma2CLessons: Lesson[] = [
  // ============================================================================
  // CMA2-C: DECISION ANALYSIS (Lessons 1-12)
  // ============================================================================
  
  {
    id: 'CMA2-C-001',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Cost-Volume-Profit Analysis Fundamentals',
    description: 'Understand the relationships between cost, volume, and profit',
    order: 21,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['CVP basics', 'Contribution margin', 'Break-even analysis', 'Profit planning'],
    blueprintArea: 'CMA2-C',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "CVP analysis is the workhorse of managerial accounting. CMAs use it to answer critical questions: How many units must we sell to break even? What price point maximizes profit? How do cost changes affect the bottom line? This is HIGH-WEIGHT EXAM CONTENT!",
        },
        {
          title: 'CVP Fundamentals',
          type: 'text',
          content: "**Basic CVP equation:**\nProfit = (Price × Quantity) - (VC per unit × Quantity) - Fixed Costs\n\n**Or:**\nProfit = (P - V)Q - F\n\n**Where:**\n• P = Selling price per unit\n• V = Variable cost per unit\n• Q = Quantity sold\n• F = Total fixed costs\n\n**Key relationship:**\nEach unit sold contributes (P - V) toward fixed costs and profit.",
        },
        {
          title: 'Contribution Margin',
          type: 'text',
          content: "**Per-unit CM:** Selling Price - Variable Cost = CM per unit\n\n**CM Ratio:** CM per unit / Selling Price = CM%\n\n**Example:**\nPrice: $100, Variable cost: $60\nCM per unit: $100 - $60 = **$40**\nCM ratio: $40 / $100 = **40%**\n\n**Interpretation:**\nEach unit contributes $40 toward fixed costs.\nEach $1 of revenue contributes $0.40 toward fixed costs.",
        },
        {
          title: '🧠 Memory Aid: CM Relationships',
          type: 'callout',
          content: "**\"CVP-CM is KEY\"**\n\n**C**ontribution = Price - Variable cost\n**V**olume × CM = Total contribution\n**P**rofit = Total CM - Fixed costs\n\n**CM is the CRITICAL number!**\nOnce fixed costs are covered, every unit's CM is pure profit.\n\nHigher CM ratio = More operating leverage = More sensitive to volume changes",
        },
        {
          title: 'Break-Even Analysis',
          type: 'text',
          content: "**Break-even in UNITS:**\nBE Units = Fixed Costs / CM per unit\n\n**Break-even in DOLLARS:**\nBE Dollars = Fixed Costs / CM Ratio\n\n**Example:**\nFixed costs: $200,000\nCM per unit: $40\nCM ratio: 40%\n\nBE Units: $200,000 / $40 = **5,000 units**\nBE Dollars: $200,000 / 0.40 = **$500,000**\n\n**Verify:** 5,000 × $100 = $500,000 ✓",
        },
        {
          title: 'Target Profit Analysis',
          type: 'text',
          content: "**Units for target profit:**\nUnits = (Fixed Costs + Target Profit) / CM per unit\n\n**Dollars for target profit:**\nDollars = (Fixed Costs + Target Profit) / CM Ratio\n\n**Example:**\nTarget profit: $80,000\nUnits = ($200,000 + $80,000) / $40 = **7,000 units**\n\n**For after-tax profit target:**\nPre-tax profit needed = After-tax target / (1 - Tax rate)\n\nIf $60,000 after-tax desired, tax rate 25%:\nPre-tax = $60,000 / 0.75 = $80,000",
        },
        {
          title: 'CVP Key Formulas Summary',
          type: 'table',
          headers: ['What to Find', 'Formula'],
          rows: [
            ['CM per unit', 'Price - Variable cost'],
            ['CM ratio', 'CM per unit / Price'],
            ['BE units', 'Fixed costs / CM per unit'],
            ['BE dollars', 'Fixed costs / CM ratio'],
            ['Units for target profit', '(FC + Target) / CM per unit'],
            ['Dollars for target profit', '(FC + Target) / CM ratio'],
          ],
        },
        {
          title: '⚠️ Exam Trap: Variable vs. Fixed',
          type: 'warning',
          content: "**Everything in CVP depends on proper cost classification!**\n\n**Variable:** Changes proportionally with volume\n(Materials, commissions, piece-rate labor)\n\n**Fixed:** Stays constant within relevant range\n(Rent, salaries, depreciation)\n\n**Mixed costs:** Separate into fixed and variable components!\n\n**Wrong classification → Wrong analysis → Wrong decisions**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "CVP: Profit = (P-V)Q - F",
            "Contribution Margin = Price - Variable Cost",
            "CM Ratio = CM / Price (% of revenue toward fixed costs)",
            "Break-even Units = Fixed Costs / CM per unit",
            "Break-even Dollars = Fixed Costs / CM Ratio",
            "Target profit: Add desired profit to fixed costs",
            "For after-tax targets, gross up: Pre-tax = After-tax / (1-t)",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-C-002',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Multi-Product CVP Analysis',
    description: 'Apply CVP analysis to companies with multiple products',
    order: 22,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Sales mix', 'Weighted average CM', 'Multi-product break-even'],
    blueprintArea: 'CMA2-C',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Most companies sell multiple products with different margins. The mix matters! CMAs must understand how product mix affects overall profitability and break-even. Shifting toward higher-margin products can dramatically improve results.",
        },
        {
          title: 'Sales Mix Concept',
          type: 'text',
          content: "**Sales mix:** Proportion of each product in total sales\n\n**Example:**\nProduct A: 60% of units sold\nProduct B: 40% of units sold\n\n**Why mix matters:**\nChanging the mix changes overall profitability!\n\n**Shift toward higher-CM products:**\n→ Overall CM increases\n→ Break-even decreases\n→ Profits increase",
        },
        {
          title: 'Multi-Product Example',
          type: 'table',
          headers: ['Product', 'Price', 'VC', 'CM', 'Mix %'],
          rows: [
            ['Standard', '$50', '$30', '$20', '60%'],
            ['Premium', '$80', '$40', '$40', '40%'],
          ],
        },
        {
          title: 'Weighted Average Contribution Margin',
          type: 'text',
          content: "**WACM = Σ(CM per unit × Mix %)**\n\n**From the example:**\nWACM = ($20 × 0.60) + ($40 × 0.40)\nWACM = $12 + $16 = **$28**\n\n**Break-even in \"bundles\":**\nBE Bundles = Fixed Costs / WACM\n\nIf FC = $280,000:\nBE = $280,000 / $28 = **10,000 bundles**\n\n**Then allocate by mix:**\nStandard: 10,000 × 60% = 6,000 units\nPremium: 10,000 × 40% = 4,000 units",
        },
        {
          title: '🧠 Memory Aid: Multi-Product CVP',
          type: 'callout',
          content: "**\"MIX it up with WACM\"**\n\n**Step 1:** Calculate CM for each product\n**Step 2:** Weight by sales MIX\n**Step 3:** Sum to get WACM\n**Step 4:** Divide FC by WACM for break-even bundles\n**Step 5:** Allocate bundles back by mix\n\n**WACM assumes CONSTANT mix - this is critical!**",
        },
        {
          title: 'Changing the Mix',
          type: 'text',
          content: "**What if mix changes to 50/50?**\n\nNew WACM = ($20 × 0.50) + ($40 × 0.50)\n= $10 + $20 = **$30**\n\nNew BE = $280,000 / $30 = **9,333 bundles**\n\n**Lower break-even because we shifted toward higher-margin Premium!**\n\n**Key insight:**\nManagement can improve profitability by:\n• Marketing high-margin products\n• Commission incentives on premium products\n• Pricing strategies to shift mix",
        },
        {
          title: 'Contribution Margin per Dollar of Revenue',
          type: 'text',
          content: "**Alternative: Use weighted CM ratio**\n\n**Weighted CM Ratio = Σ(CM% × Revenue Mix %)**\n\n**Example:**\nStandard: CM ratio = 40%, Revenue mix = 42.9%\nPremium: CM ratio = 50%, Revenue mix = 57.1%\n\nWeighted CM% = (0.40 × 0.429) + (0.50 × 0.571)\n= 0.172 + 0.286 = **45.8%**\n\n**BE Dollars = FC / Weighted CM%**\n= $280,000 / 0.458 = **$611,354**",
        },
        {
          title: '⚠️ Exam Trap: Mix Given in Units vs. Dollars',
          type: 'warning',
          content: "**Pay attention to how mix is stated!**\n\n**Unit mix:** Use CM per unit, calculate WACM\n**Dollar/revenue mix:** Use CM ratio, calculate weighted CM%\n\n**These can give different percentages!**\n\nExample: If Premium costs 2× Standard:\n• Unit mix: 60/40\n• Dollar mix: Different (more revenue from Premium)\n\n**Read the problem carefully!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Sales mix affects overall profitability",
            "WACM = Weighted Average CM (by unit mix)",
            "BE Bundles = Fixed Costs / WACM",
            "Allocate bundles back to products by mix percentage",
            "Shift toward higher-CM products to improve results",
            "CVP assumes CONSTANT mix (key assumption)",
            "Unit mix ≠ Dollar mix when prices differ",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-C-003',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Operating Leverage',
    description: 'Understand how cost structure affects profit sensitivity',
    order: 23,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Operating leverage', 'Degree of operating leverage', 'Risk-return tradeoff'],
    blueprintArea: 'CMA2-C',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Operating leverage is a double-edged sword. High fixed costs magnify profits when sales are good but magnify losses when sales decline. CMAs analyze cost structure to understand risk, plan capacity, and evaluate strategic alternatives.",
        },
        {
          title: 'Operating Leverage Concept',
          type: 'text',
          content: "**Operating leverage:** The extent to which fixed costs are used in operations\n\n**High operating leverage:**\n• High fixed costs, low variable costs\n• Small sales increase → Large profit increase\n• Small sales decrease → Large profit decrease\n• More risk!\n\n**Low operating leverage:**\n• Low fixed costs, high variable costs\n• Profit changes proportionally with sales\n• Less risky",
        },
        {
          title: 'Degree of Operating Leverage (DOL)',
          type: 'text',
          content: "**DOL = Contribution Margin / Operating Income**\n\n**Or:**\nDOL = % Change in EBIT / % Change in Sales\n\n**Example:**\nSales: $500,000\nVC: $300,000 (60%)\nCM: $200,000 (40%)\nFC: $150,000\nOperating Income: $50,000\n\nDOL = $200,000 / $50,000 = **4.0**\n\n**Interpretation:** 1% increase in sales → 4% increase in EBIT",
        },
        {
          title: '🧠 Memory Aid: DOL',
          type: 'callout',
          content: "**\"DOL = CM / OI\"**\n\n**D**egree of **O**perating **L**everage = **C**ontribution **M**argin / **O**perating **I**ncome\n\n**Higher DOL = Higher risk!**\n\nDOL is highest near break-even (OI near zero)\nDOL decreases as you move away from break-even\n\n**At break-even, DOL is undefined (divide by zero)!**",
        },
        {
          title: 'DOL Calculation Example',
          type: 'text',
          content: "**Current:** Sales = $500,000, EBIT = $50,000, DOL = 4.0\n\n**If sales increase 10%:**\nNew EBIT change = 10% × 4.0 = 40%\nNew EBIT = $50,000 × 1.40 = **$70,000**\n\n**Verify:**\nNew Sales: $550,000\nNew VC: $330,000 (60%)\nNew CM: $220,000\nFC: $150,000 (unchanged)\nNew EBIT: $220,000 - $150,000 = **$70,000** ✓",
        },
        {
          title: 'Cost Structure Comparison',
          type: 'table',
          headers: ['Metric', 'Company A (High OL)', 'Company B (Low OL)'],
          rows: [
            ['Fixed Costs', '$400,000', '$100,000'],
            ['Variable Cost %', '20%', '60%'],
            ['CM Ratio', '80%', '40%'],
            ['Break-even', '$500,000', '$250,000'],
            ['DOL at $600,000 sales', '6.0', '2.4'],
            ['Risk Level', 'Higher', 'Lower'],
          ],
        },
        {
          title: 'Strategic Implications',
          type: 'text',
          content: "**When to choose high operating leverage:**\n• Confident in sales growth\n• Stable demand\n• Want to maximize upside\n\n**When to choose low operating leverage:**\n• Uncertain demand\n• New market entry\n• Risk-averse management\n\n**Trade-off:**\nAutomation → Higher fixed costs → Higher OL\nOutsourcing → Higher variable costs → Lower OL",
        },
        {
          title: '⚠️ Exam Trap: DOL Changes with Volume',
          type: 'warning',
          content: "**DOL is NOT constant!**\n\n• DOL is highest near break-even\n• DOL decreases as volume increases\n• DOL approaches 1 at very high volumes\n\n**Always calculate DOL at the specific volume given!**\n\nDOL = CM / OI\n\nAs OI grows (farther from break-even), DOL shrinks.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Operating leverage measures fixed cost intensity",
            "DOL = CM / Operating Income",
            "High DOL: Small sales change → Large profit change",
            "DOL is highest near break-even",
            "High fixed costs = High OL = High risk",
            "Automation increases OL; Outsourcing decreases OL",
            "Choose OL based on demand stability and risk tolerance",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-C-004',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Relevant Cost Analysis',
    description: 'Identify costs relevant to specific decisions',
    order: 24,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Relevant costs', 'Sunk costs', 'Opportunity costs', 'Differential analysis'],
    blueprintArea: 'CMA2-C',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Not all costs matter for every decision. CMAs must identify which costs are relevant to a specific choice and ignore sunk costs that shouldn't affect the decision. This skill is fundamental to all short-term decisions covered in this section!",
        },
        {
          title: 'What Makes a Cost Relevant?',
          type: 'text',
          content: "**A cost is relevant if it is:**\n\n1. **Future-oriented:** Will be incurred in the future\n2. **Differential:** Differs between alternatives\n\n**Both conditions must be met!**\n\n**Example:**\nBuy vs. Make decision\n• Raw materials cost: Relevant (differs between alternatives)\n• Factory rent: Not relevant if paid either way\n• Past R&D cost: Not relevant (already spent)",
        },
        {
          title: 'Types of Costs',
          type: 'table',
          headers: ['Cost Type', 'Definition', 'Relevant?'],
          rows: [
            ['Sunk cost', 'Already incurred, cannot be recovered', 'NO - Ignore it!'],
            ['Opportunity cost', 'Benefit foregone from best alternative', 'YES - Include it!'],
            ['Differential cost', 'Differs between alternatives', 'YES'],
            ['Incremental cost', 'Additional cost of an alternative', 'YES'],
            ['Avoidable cost', 'Can be eliminated with a choice', 'YES'],
            ['Unavoidable cost', 'Incurred regardless of choice', 'NO'],
          ],
        },
        {
          title: '🧠 Memory Aid: Relevant Costs',
          type: 'callout',
          content: "**\"FD = Future & Different\"**\n\n**F**uture: Will be incurred after the decision\n**D**ifferent: Changes based on the choice\n\n**Sunk costs are NEVER relevant!**\n(No matter how much you spent or regret it)\n\n**The question is always: \"What changes if we choose differently?\"**",
        },
        {
          title: 'Opportunity Cost',
          type: 'text',
          content: "**Definition:** The benefit foregone by choosing one alternative over another\n\n**Example:**\nMachine can produce Product A or Product B (not both)\nProduct A contribution: $50,000\nProduct B contribution: $60,000\n\nIf you choose A, opportunity cost = **$60,000** (lost B contribution)\n\n**Opportunity costs are:**\n• Implicit (not in accounting records)\n• But absolutely relevant to decisions!\n• The \"next best alternative\" value",
        },
        {
          title: 'Sunk Cost Trap',
          type: 'text',
          content: "**Common mistakes:**\n\n**\"We've invested $1 million, we can't stop now!\"**\n→ The $1M is gone either way. Focus on FUTURE costs/benefits.\n\n**\"The equipment cost $500,000...\"**\n→ For decisions, only future costs matter.\n\n**\"We need to recover our investment.\"**\n→ Past investment is irrelevant to optimal future decisions.\n\n**The relevant question:**\n\"Given where we are NOW, what's the best path FORWARD?\"",
        },
        {
          title: 'Differential Analysis Framework',
          type: 'text',
          content: "**Compare alternatives by focusing on differences:**\n\n**Step 1:** Identify all costs/revenues for each alternative\n**Step 2:** Cross out items that are the same\n**Step 3:** Analyze only the differential amounts\n**Step 4:** Include opportunity costs\n**Step 5:** Choose alternative with highest net benefit\n\n**Shortcut:** Only analyze costs/revenues that CHANGE!",
        },
        {
          title: '⚠️ Exam Trap: Allocated Costs',
          type: 'warning',
          content: "**Allocated fixed costs are usually NOT relevant!**\n\n**Example:**\nProduct A is allocated $50,000 of corporate overhead\nShould we drop Product A?\n\n**Wrong:** Include the $50,000 (it's assigned to A)\n**Right:** Will the $50,000 disappear if we drop A?\n\nIf overhead continues regardless → NOT relevant\nIf overhead can be eliminated → Relevant\n\n**Always ask: \"Does this cost CHANGE?\"**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Relevant costs are Future AND Differential",
            "Sunk costs are NEVER relevant (already spent)",
            "Opportunity costs ARE relevant (foregone benefit)",
            "Focus on what CHANGES between alternatives",
            "Allocated costs are relevant only if avoidable",
            "The past is irrelevant - focus on future cash flows",
            "Ask: \"What changes if we choose differently?\"",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-C-005',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Special Order Decisions',
    description: 'Analyze one-time orders at below-normal prices',
    order: 25,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Special orders', 'Incremental analysis', 'Capacity considerations', 'Qualitative factors'],
    blueprintArea: 'CMA2-C',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Should we accept a one-time order at a reduced price? This common scenario requires careful analysis of incremental costs and benefits. CMAs must separate relevant from irrelevant costs and consider capacity, opportunity costs, and strategic implications.",
        },
        {
          title: 'Special Order Defined',
          type: 'text',
          content: "**A special order is:**\n• One-time or unusual order\n• Often at a price below normal\n• From a customer outside regular channels\n• Won't affect regular sales\n\n**Key question:**\nDoes the incremental revenue exceed the incremental cost?\n\n**Decision rule:**\nAccept if: Incremental Revenue > Incremental Cost\nReject if: Incremental Revenue < Incremental Cost",
        },
        {
          title: 'Basic Special Order Analysis',
          type: 'text',
          content: "**Example:**\nRegular price: $100\nVariable cost: $60\nFixed cost per unit (allocated): $25\nFull cost: $85\nRegular margin: $15\n\n**Special order offer: $70 for 1,000 units**\n\nWrong thinking: \"$70 < $85 cost, so reject.\"\n\n**Correct analysis:**\nIncremental revenue: $70 × 1,000 = $70,000\nIncremental cost: $60 × 1,000 = $60,000\nIncremental profit: **$10,000**\n\n**ACCEPT!** (Fixed costs don't change)",
        },
        {
          title: '🧠 Memory Aid: Special Order Rule',
          type: 'callout',
          content: "**\"Above VC = OK\"**\n\nIf special order price > Variable cost per unit:\n→ Accept (with excess capacity)\n\n**Why?**\nFixed costs are paid either way\nAny contribution above variable cost adds profit\n\n**BUT: Consider capacity and opportunity cost!**",
        },
        {
          title: 'Capacity Considerations',
          type: 'text',
          content: "**With excess capacity:**\nNo opportunity cost → Compare to variable cost only\n\n**At full capacity:**\nMust give up regular sales → Include opportunity cost!\n\n**Example at full capacity:**\nSpecial order: 1,000 units at $70\nMust sacrifice regular sales: 500 units at $100\n\nIncremental revenue: $70 × 1,000 = $70,000\nIncremental costs: $60 × 1,000 = $60,000\nLost contribution: ($100-$60) × 500 = **$20,000**\nNet effect: $70,000 - $60,000 - $20,000 = **-$10,000**\n\n**REJECT!**",
        },
        {
          title: 'Special Order Decision Framework',
          type: 'table',
          headers: ['Factor', 'Consider'],
          rows: [
            ['Incremental revenue', 'Special price × Quantity'],
            ['Incremental variable costs', 'VC per unit × Quantity'],
            ['Incremental fixed costs', 'Any additional FC incurred'],
            ['Opportunity cost', 'Lost contribution from regular sales'],
            ['Future impact', 'Will it affect regular prices?'],
          ],
        },
        {
          title: 'Qualitative Considerations',
          type: 'text',
          content: "**Beyond the numbers, consider:**\n\n**Risks of accepting:**\n• Regular customers may demand lower prices\n• May establish precedent for future orders\n• Could damage brand/reputation\n• Relationship with the customer\n\n**Potential benefits:**\n• Opens new market\n• Builds relationship for future business\n• Uses otherwise idle capacity\n• Covers some fixed costs in slow periods\n\n**These factors may override the quantitative analysis!**",
        },
        {
          title: '⚠️ Exam Trap: Which Costs Are Incremental?',
          type: 'warning',
          content: "**Include only costs that CHANGE:**\n\n**Usually incremental:**\n• Direct materials\n• Direct labor (if paid per unit)\n• Variable overhead\n• Shipping (if company pays)\n• Special tooling/setup\n\n**Usually NOT incremental:**\n• Fixed manufacturing overhead\n• Fixed selling/admin costs\n• Allocated corporate costs\n\n**Read carefully for special circumstances!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Accept special order if Incremental Revenue > Incremental Cost",
            "With excess capacity, compare to variable cost only",
            "At full capacity, include opportunity cost of lost sales",
            "Fixed costs usually NOT relevant (incurred anyway)",
            "Consider incremental fixed costs if any (setup, tooling)",
            "Qualitative factors may override quantitative analysis",
            "Beware of setting precedent for lower prices",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-C-006',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Make or Buy Decisions',
    description: 'Analyze whether to manufacture internally or purchase from suppliers',
    order: 26,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Make or buy', 'Outsourcing', 'Avoidable costs', 'Strategic factors'],
    blueprintArea: 'CMA2-C',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Make or buy decisions affect cost structure, quality control, and strategic flexibility. CMAs analyze the relevant costs of manufacturing vs. purchasing, considering both quantitative and qualitative factors. This is a fundamental outsourcing analysis.",
        },
        {
          title: 'Make or Buy Framework',
          type: 'text',
          content: "**Compare:**\nRelevant cost to MAKE vs. Purchase cost to BUY\n\n**Relevant costs to make:**\n• Direct materials\n• Direct labor\n• Variable overhead\n• Avoidable fixed costs\n• Opportunity cost of capacity\n\n**Costs to buy:**\n• Purchase price\n• Transportation/receiving\n• Inspection\n• Any unavoidable making costs",
        },
        {
          title: 'Make or Buy Example',
          type: 'table',
          headers: ['Cost per Unit', 'Make', 'Buy'],
          rows: [
            ['Direct materials', '$8', '-'],
            ['Direct labor', '$12', '-'],
            ['Variable overhead', '$5', '-'],
            ['Fixed overhead (allocated)', '$10', '-'],
            ['Purchase price', '-', '$28'],
            ['Total listed', '$35', '$28'],
          ],
        },
        {
          title: 'Analyzing the Example',
          type: 'text',
          content: "**Listed cost: Make $35 > Buy $28**\nBut wait - is all $10 of fixed overhead avoidable?\n\n**Scenario 1:** Fixed overhead unavoidable\nRelevant make cost: $8 + $12 + $5 = **$25**\nBuy cost: $28\n**Decision: MAKE** (saves $3/unit)\n\n**Scenario 2:** $4 of fixed overhead avoidable\nRelevant make cost: $25 + $4 = **$29**\nBuy cost: $28\n**Decision: BUY** (saves $1/unit)\n\n**The answer depends on which costs are truly avoidable!**",
        },
        {
          title: '🧠 Memory Aid: Make or Buy',
          type: 'callout',
          content: "**\"AVO-CAD-O\"** (like avocado!)\n\n**AVO**idable costs to make\n**C**ompare to\n**A**ll costs to buy\n**D**on't include unavoidable fixed costs!\n**O**pportunity cost if capacity has alternative use\n\n**Only AVOIDABLE costs are relevant!**",
        },
        {
          title: 'Opportunity Cost of Freed Capacity',
          type: 'text',
          content: "**If we buy, freed capacity could be used for:**\n• Producing other profitable products\n• Renting out the space\n• Reducing fixed costs\n\n**Example:**\nFreed capacity can produce Product Z\nProduct Z contribution: $15,000/year\n\n**Analysis (annual, 10,000 units):**\nMake cost: $25 × 10,000 = $250,000\nBuy cost: $28 × 10,000 = $280,000\nBenefits of buying: Z contribution = $15,000\n\nNet cost to make: $250,000 + $15,000 = $265,000\nNet cost to buy: $280,000\n\n**Still MAKE** (even considering opportunity cost)",
        },
        {
          title: 'Qualitative Factors',
          type: 'text',
          content: "**Arguments for making:**\n• Quality control\n• Reliable supply\n• Protect proprietary technology\n• Keep skilled workforce\n\n**Arguments for buying:**\n• Supplier expertise/economies of scale\n• Flexibility in volume\n• Focus on core competencies\n• Reduce capital investment\n\n**Strategic importance may override cost considerations!**",
        },
        {
          title: '⚠️ Exam Trap: Step-Fixed Costs',
          type: 'warning',
          content: "**If buying eliminates a step-fixed cost, it's relevant!**\n\n**Example:**\nMaking requires a supervisor at $60,000/year\nIf we buy, we eliminate this position\n\n**$60,000 is avoidable and RELEVANT!**\n\n**Contrast:**\nFactory manager's salary continues regardless\n→ NOT relevant (unavoidable)\n\n**Ask: \"Does this cost GO AWAY if we buy?\"**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Compare avoidable make costs to total buy costs",
            "Allocated fixed costs are NOT relevant unless avoided",
            "Include opportunity cost of freed capacity",
            "Variable costs are typically relevant",
            "Fixed costs are relevant only if truly eliminated",
            "Qualitative factors may override cost analysis",
            "Consider quality, reliability, strategic importance",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-C-007',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Keep or Drop Decisions',
    description: 'Analyze whether to discontinue a product, segment, or service',
    order: 27,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Segment analysis', 'Product discontinuation', 'Avoidable costs', 'Segment margin'],
    blueprintArea: 'CMA2-C',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "A product looks unprofitable - should we drop it? CMAs must analyze whether eliminating a segment improves overall profit. The key is separating avoidable from unavoidable costs. Many \"unprofitable\" products actually contribute to covering fixed costs!",
        },
        {
          title: 'Keep or Drop Decision Rule',
          type: 'text',
          content: "**Drop if:**\nRevenue lost < Costs avoided\n\n**Keep if:**\nRevenue lost > Costs avoided\n\n**Or equivalently:**\nKeep if segment's contribution margin > Avoidable fixed costs\n\n**The key question:**\nWhat costs actually DISAPPEAR if we drop this segment?",
        },
        {
          title: 'Segment Income Statement',
          type: 'table',
          headers: ['Item', 'Product A', 'Product B', 'Product C', 'Total'],
          rows: [
            ['Revenue', '$500,000', '$300,000', '$200,000', '$1,000,000'],
            ['Variable costs', '(300,000)', '(180,000)', '(150,000)', '(630,000)'],
            ['Contribution margin', '$200,000', '$120,000', '$50,000', '$370,000'],
            ['Direct fixed costs', '(100,000)', '(80,000)', '(60,000)', '(240,000)'],
            ['Segment margin', '$100,000', '$40,000', '$(10,000)', '$130,000'],
            ['Allocated common', '(50,000)', '(30,000)', '(20,000)', '(100,000)'],
            ['Net income', '$50,000', '$10,000', '$(30,000)', '$30,000'],
          ],
        },
        {
          title: 'Analyzing Product C',
          type: 'text',
          content: "**Product C shows $(30,000) loss. Drop it?**\n\n**If we drop C:**\nRevenue lost: $200,000\nVariable costs saved: $150,000\nDirect fixed costs saved (assume avoidable): $60,000\nTotal costs saved: $210,000\n\n**Effect on profit:**\nCosts saved $210,000 > Revenue lost $200,000\n**DROP Product C** - saves $10,000\n\n**BUT WAIT - what if not all fixed costs are avoidable?**",
        },
        {
          title: '🧠 Memory Aid: Segment Margin',
          type: 'callout',
          content: "**\"Segment Margin = Drop Decision\"**\n\n**Segment Margin = CM - Direct Fixed Costs**\n\n**If segment margin is POSITIVE:**\n→ Keep! It covers its own costs and contributes to common costs.\n\n**If segment margin is NEGATIVE:**\n→ Consider dropping (but verify fixed costs are truly avoidable!)\n\n**Ignore allocated common costs for drop decision!**",
        },
        {
          title: 'What if Fixed Costs Aren\'t Fully Avoidable?',
          type: 'text',
          content: "**Reanalysis: Only $40,000 of C's $60,000 fixed costs are avoidable**\n\n**If we drop C:**\nRevenue lost: $200,000\nVariable costs saved: $150,000\nAvoidable fixed costs: $40,000\nTotal costs saved: $190,000\n\n**Effect on profit:**\nCosts saved $190,000 < Revenue lost $200,000\n**KEEP Product C** - dropping costs $10,000!\n\n**The remaining $20,000 will be reallocated to A and B!**",
        },
        {
          title: 'Complementary Products Effect',
          type: 'text',
          content: "**Sometimes products are complementary:**\n\n• Dropping razors may reduce blade sales\n• Dropping appetizers may reduce dinner sales\n• Dropping entry-level product may lose future upgraders\n\n**Include lost contribution from related products!**\n\n**Example:**\nDrop C saves $10,000 (per earlier analysis)\nBut C customers also buy $100,000 of A at 40% CM\nLost A contribution: $40,000\n\nNet effect: ($10,000) - ($40,000) = **$(30,000) loss**\n\n**KEEP Product C!**",
        },
        {
          title: '⚠️ Exam Trap: Common Cost Allocation',
          type: 'warning',
          content: "**IGNORE allocated common costs for drop decisions!**\n\n**Why?**\nCommon costs continue regardless of which segments exist.\nThey just get reallocated to remaining segments.\n\n**Example:**\nTotal common costs: $100,000\nAllocated to C: $20,000\n\nIf C is dropped, the $100,000 doesn't change!\nIt's just split between A and B now.\n\n**Common costs are NOT relevant to the drop decision!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Drop if: Revenue lost < Costs avoided",
            "Segment Margin = CM - Direct (Traceable) Fixed Costs",
            "Positive segment margin = Keep the segment",
            "Only AVOIDABLE costs are relevant",
            "Ignore allocated common costs (continue either way)",
            "Consider complementary product effects",
            "Verify which fixed costs truly disappear",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-C-008',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Sell or Process Further',
    description: 'Determine optimal point to sell joint products',
    order: 28,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Joint costs', 'Split-off point', 'Further processing', 'Incremental analysis'],
    blueprintArea: 'CMA2-C',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Joint products emerge from a common process. Should we sell at split-off or process further? CMAs analyze the incremental revenue vs. incremental cost of additional processing. Joint costs are sunk for this decision!",
        },
        {
          title: 'Joint Costs and Split-Off Point',
          type: 'text',
          content: "**Joint costs:** Costs incurred before products become separately identifiable\n\n**Split-off point:** Where joint products become separate and identifiable\n\n**Example:**\nOil refinery: Crude oil → Gasoline, Diesel, Kerosene\n(Split-off is where products separate)\n\n**Key insight:**\nJoint costs are SUNK for sell/process further decisions!\nThey're incurred regardless of what happens after split-off.",
        },
        {
          title: 'Decision Rule',
          type: 'text',
          content: "**Process further if:**\nIncremental Revenue > Incremental (Separable) Costs\n\n**Compare:**\n• Revenue at split-off\n• Revenue if processed further\n• Costs of additional processing\n\n**DO NOT include joint costs!**\nThey're the same regardless of the decision.\n\n**Focus only on what happens AFTER split-off!**",
        },
        {
          title: 'Sell or Process Example',
          type: 'table',
          headers: ['Product', 'Sales at Split-off', 'Sales if Processed', 'Further Processing Cost'],
          rows: [
            ['Product X', '$50,000', '$80,000', '$20,000'],
            ['Product Y', '$30,000', '$42,000', '$15,000'],
            ['Product Z', '$20,000', '$35,000', '$18,000'],
          ],
        },
        {
          title: 'Analyzing Each Product',
          type: 'text',
          content: "**Product X:**\nIncremental revenue: $80,000 - $50,000 = $30,000\nIncremental cost: $20,000\nIncremental profit: **$10,000** → PROCESS FURTHER\n\n**Product Y:**\nIncremental revenue: $42,000 - $30,000 = $12,000\nIncremental cost: $15,000\nIncremental loss: **$(3,000)** → SELL AT SPLIT-OFF\n\n**Product Z:**\nIncremental revenue: $35,000 - $20,000 = $15,000\nIncremental cost: $18,000\nIncremental loss: **$(3,000)** → SELL AT SPLIT-OFF",
        },
        {
          title: '🧠 Memory Aid: Sell or Process',
          type: 'callout',
          content: "**\"JCS\" - Joint Costs are SUNK!**\n\n**J**oint costs = Already incurred\n**C**ompare only what's AFTER split-off\n**S**eparable costs vs. Incremental revenue\n\n**If incremental revenue > separable cost → Process further**\n**If incremental revenue < separable cost → Sell at split-off**\n\n**Never include joint costs in this decision!**",
        },
        {
          title: 'By-Products',
          type: 'text',
          content: "**By-product:** Minor product with relatively small sales value\n\n**Accounting treatments:**\n\n**Net realizable value method:**\nNRV of by-product reduces joint cost of main products\n\n**Recognition at sale:**\nRevenue recognized when by-product is sold\n\n**For sell/process decisions:**\nAnalyze by-products the same way:\nProcess further only if incremental revenue > incremental cost",
        },
        {
          title: '⚠️ Exam Trap: Don\'t Allocate Joint Costs for Decisions',
          type: 'warning',
          content: "**Joint cost allocation is for:**\n• Inventory valuation\n• External financial reporting\n\n**Joint cost allocation is NOT for:**\n• Sell/process decisions\n• Product profitability analysis\n\n**Why?**\nAllocation methods (sales value, physical units, NRV) are arbitrary.\nThey don't reflect true product costs.\n\n**For decisions: Focus ONLY on separable costs!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Joint costs are SUNK - ignore for sell/process decisions",
            "Compare: Revenue increase vs. Additional processing cost",
            "Process further if incremental revenue > separable cost",
            "Each product is analyzed independently",
            "Different products may have different optimal decisions",
            "By-products analyzed the same way as main products",
            "Don't use allocated joint costs for decision-making",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-C-009',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Pricing Strategies',
    description: 'Understand pricing methods and strategic pricing decisions',
    order: 29,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Cost-plus pricing', 'Target costing', 'Market-based pricing', 'Price elasticity'],
    blueprintArea: 'CMA2-C',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Pricing is one of the most powerful profit levers. CMAs provide cost data for pricing decisions, analyze pricing strategies, and understand how different approaches affect profitability. The right price balances cost recovery, competitive positioning, and customer value.",
        },
        {
          title: 'Pricing Approaches',
          type: 'text',
          content: "**Cost-based pricing:**\nStart with costs, add markup for profit\n\n**Market-based pricing:**\nStart with what market will pay, adjust costs accordingly\n\n**Value-based pricing:**\nPrice based on value delivered to customer\n\n**Competition-based pricing:**\nSet prices relative to competitors\n\n**Each has its place depending on market conditions!**",
        },
        {
          title: 'Cost-Plus Pricing',
          type: 'text',
          content: "**Formula:**\nPrice = Cost + (Markup % × Cost)\n\n**Which cost base?**\n• Variable cost (contribution approach)\n• Absorption cost (full cost)\n• Total cost including SG&A\n\n**Example (absorption cost):**\nFull manufacturing cost: $80\nDesired markup: 25%\nPrice: $80 × 1.25 = **$100**\n\n**Advantages:** Simple, ensures cost recovery\n**Disadvantages:** Ignores market, demand, competition",
        },
        {
          title: 'Markup Calculation',
          type: 'text',
          content: "**Finding required markup:**\n\nMarkup % = Desired Profit / Cost Base\n\n**Example:**\nTarget ROI: 15%\nInvested capital: $1,000,000\nExpected units: 10,000\nCost per unit: $75\n\nDesired profit: 15% × $1,000,000 = $150,000\nProfit per unit: $150,000 / 10,000 = $15\nMarkup %: $15 / $75 = **20%**\nPrice: $75 × 1.20 = **$90**",
        },
        {
          title: '🧠 Memory Aid: Pricing Methods',
          type: 'callout',
          content: "**\"CMVT\"** - Four Pricing Philosophies:\n\n**C**ost-plus: Add margin to cost (inside-out)\n**M**arket: What will market pay? (outside-in)\n**V**alue: What is it worth to customer?\n**T**arget: Market price - profit = Allowable cost\n\n**Cost-plus is easiest but ignores what customers will pay!\nMarket and value approaches focus on the customer.**",
        },
        {
          title: 'Target Costing',
          type: 'text',
          content: "**Market-driven approach:**\n\n**Steps:**\n1. Determine market price customers will pay\n2. Subtract required profit margin\n3. Result = Maximum allowable cost\n4. Design/engineer to meet cost target\n\n**Formula:**\nTarget Cost = Market Price - Required Profit\n\n**Example:**\nMarket price: $200\nRequired margin: 20%\nRequired profit: $40\nTarget cost: $200 - $40 = **$160**\n\n*If we can't make it for $160, don't make it!*",
        },
        {
          title: 'Price Elasticity of Demand',
          type: 'text',
          content: "**Elasticity = % Change in Quantity / % Change in Price**\n\n**Elastic demand (E > 1):**\n• Price cut increases revenue\n• Price hike decreases revenue\n• Customers are price-sensitive\n\n**Inelastic demand (E < 1):**\n• Price cut decreases revenue\n• Price hike increases revenue\n• Customers less price-sensitive\n\n**Example:** E = 2\n10% price cut → 20% more quantity → Revenue increases!",
        },
        {
          title: 'Special Pricing Situations',
          type: 'table',
          headers: ['Situation', 'Pricing Approach'],
          rows: [
            ['New product launch', 'Skimming (high) or Penetration (low)'],
            ['Capacity utilization', 'Above variable cost as floor'],
            ['Product line pricing', 'Consider substitution/complementary effects'],
            ['Competitive response', 'Match, undercut, or differentiate'],
            ['Loss leader', 'Below cost to drive traffic'],
          ],
        },
        {
          title: '⚠️ Exam Trap: Long-Run vs. Short-Run Pricing',
          type: 'warning',
          content: "**Short-run minimum price:**\nVariable cost per unit (contribution pricing)\n→ Any price above VC contributes to fixed costs\n\n**Long-run minimum price:**\nFull cost (covers all costs including fixed)\n→ Must recover ALL costs to be sustainable\n\n**Special orders may accept short-run pricing\nRegular business needs long-run pricing!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Cost-plus: Price = Cost × (1 + Markup%)",
            "Target costing: Target Cost = Market Price - Required Profit",
            "Market-based pricing starts with customer willingness to pay",
            "Price elasticity determines revenue impact of price changes",
            "Short-run floor = Variable cost; Long-run floor = Full cost",
            "Price skimming (high initial) vs. Penetration (low initial)",
            "Different situations call for different pricing strategies",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-C-010',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Transfer Pricing',
    description: 'Establish prices for internal transfers between divisions',
    order: 30,
    duration: 55,
    difficulty: 'advanced',
    topics: ['Transfer pricing methods', 'Goal congruence', 'Performance evaluation', 'Tax implications'],
    blueprintArea: 'CMA2-C',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Divisions within a company often buy from each other. At what price? Transfer pricing affects divisional profits, taxes, and decision-making incentives. CMAs must set transfer prices that motivate goal-congruent behavior while fairly evaluating performance.",
        },
        {
          title: 'Transfer Pricing Objectives',
          type: 'text',
          content: "**Good transfer prices should:**\n\n• **Goal congruence:** Align divisional and corporate interests\n• **Performance evaluation:** Fairly measure divisional profit\n• **Autonomy:** Preserve divisional decision-making\n• **Tax optimization:** Minimize overall tax burden (legally!)\n\n**The challenge:**\nNo single method achieves all objectives perfectly!",
        },
        {
          title: 'Transfer Pricing Methods',
          type: 'table',
          headers: ['Method', 'Price Set At', 'Best When'],
          rows: [
            ['Market price', 'External market price', 'Competitive external market exists'],
            ['Variable cost', 'Variable cost only', 'Excess capacity, internal use'],
            ['Full cost', 'Variable + fixed', 'No external market'],
            ['Cost-plus', 'Cost + markup', 'Simulate profit for seller'],
            ['Negotiated', 'Divisions agree', 'Autonomy important'],
          ],
        },
        {
          title: 'General Transfer Pricing Rule',
          type: 'text',
          content: "**Minimum transfer price (seller's floor):**\nVariable cost + Opportunity cost (lost CM on external sales)\n\n**Maximum transfer price (buyer's ceiling):**\nMarket price (or cost of buying externally)\n\n**Transfer price range:**\nMinimum ≤ TP ≤ Maximum\n\n**Key insight:**\nTransfer should occur if seller's minimum < buyer's maximum\n(Value is created by internal transfer)",
        },
        {
          title: '🧠 Memory Aid: Transfer Price Range',
          type: 'callout',
          content: "**\"VOC to MARket\"**\n\n**Floor (seller's minimum):**\n**V**ariable cost + **O**pportunity **C**ost\n\n**Ceiling (buyer's maximum):**\n**MAR**ket price (what buyer would pay externally)\n\n**If floor > ceiling:**\nNo transfer should occur!\n\n**If floor < ceiling:**\nTransfer at any price in the range is OK for the company.",
        },
        {
          title: 'Transfer Pricing Example',
          type: 'text',
          content: "**Division A (seller) data:**\nVariable cost: $30\nFull cost: $45\nMarket price: $50\nCapacity: 10,000 units\nExternal demand: 8,000 units\n\n**With excess capacity (2,000 units):**\nSeller's minimum: $30 + $0 = **$30** (no opportunity cost)\n\n**At full capacity:**\nSeller's minimum: $30 + ($50-$30) = **$50** (lost CM)\n\n**Division B should buy internally only if their max > seller's min!**",
        },
        {
          title: 'Goal Congruence Issues',
          type: 'text',
          content: "**Problem with variable cost transfer price:**\nSeller shows no profit → No motivation to sell internally\n\n**Problem with cost-plus:**\nPasses inefficiencies to buyer\nNo incentive for seller to control costs\n\n**Problem with market price:**\nMay not exist for intermediate products\nIgnores synergies of internal transfer\n\n**Solution often requires negotiation or dual pricing!**",
        },
        {
          title: 'International Transfer Pricing',
          type: 'text',
          content: "**Tax authorities are watching!**\n\nCompanies may set transfer prices to:\n• Shift profit to low-tax jurisdictions\n• Minimize overall tax burden\n\n**Arms-length principle:**\nTransfer prices should be what unrelated parties would pay.\n\n**Methods accepted by IRS/OECD:**\n• Comparable uncontrolled price (CUP)\n• Resale price method\n• Cost-plus method\n• Transactional net margin method (TNMM)\n\n**Documentation is critical!**",
        },
        {
          title: '⚠️ Exam Trap: Capacity Matters!',
          type: 'warning',
          content: "**The selling division's situation changes the analysis:**\n\n**Excess capacity:**\n• Opportunity cost = $0\n• Minimum TP = Variable cost\n• Internal transfer almost always makes sense\n\n**At full capacity:**\n• Opportunity cost = Lost CM from external sales\n• Minimum TP = VC + Lost CM\n• May equal market price!\n\n**Always check capacity before calculating!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Minimum TP = Variable cost + Opportunity cost",
            "Maximum TP = External market price",
            "Transfer should occur if minimum < maximum",
            "Excess capacity → Opportunity cost = $0",
            "Full capacity → Opportunity cost = Lost contribution margin",
            "No single method achieves all objectives",
            "International transfers must follow arm's-length principle",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-C-011',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Constrained Resource Decisions',
    description: 'Optimize product mix when resources are limited',
    order: 31,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Scarce resources', 'CM per constraint', 'Product mix', 'Linear programming'],
    blueprintArea: 'CMA2-C',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Every company faces constraints - machine hours, labor, materials, or space. CMAs must determine the optimal product mix when resources are limited. The key: maximize contribution margin per unit of the scarce resource, not per unit of product!",
        },
        {
          title: 'The Resource Constraint Problem',
          type: 'text',
          content: "**When you can't make all the products you can sell:**\n\n• What limits you? (the constraint/bottleneck)\n• How should you allocate that resource?\n• Which products should get priority?\n\n**Key insight:**\nMaximize CM per unit of the SCARCE RESOURCE,\nnot CM per unit of product!\n\n**A product with lower CM per unit may be better\nif it uses less of the scarce resource!**",
        },
        {
          title: 'Product Comparison Example',
          type: 'table',
          headers: ['Metric', 'Product A', 'Product B'],
          rows: [
            ['Selling price', '$100', '$80'],
            ['Variable cost', '$60', '$50'],
            ['CM per unit', '$40', '$30'],
            ['Machine hours required', '4 hours', '2 hours'],
            ['CM per machine hour', '$10', '$15'],
          ],
        },
        {
          title: 'Analysis of Example',
          type: 'text',
          content: "**Available machine hours: 8,000\nDemand: Unlimited for both products**\n\n**Wrong approach (CM per unit):**\nMake A ($40 CM) before B ($30 CM)\n\n**Right approach (CM per constraint):**\nB: $30 ÷ 2 hours = **$15/hour**\nA: $40 ÷ 4 hours = **$10/hour**\n\n**Make B first!**\nWith 8,000 hours: 4,000 units of B × $30 = $120,000\nOR: 2,000 units of A × $40 = $80,000\n\n**$40,000 more by prioritizing B!**",
        },
        {
          title: '🧠 Memory Aid: Constraint Optimization',
          type: 'callout',
          content: "**\"CM per CB\"**\n\n**C**ontribution **M**argin per **C**onstraint unit = **B**est product!\n\nNOT CM per unit!\nNOT highest selling price!\nNOT lowest cost!\n\n**The scarce resource is your bottleneck - use it wisely!**\n\nRank products by CM / Resource requirement\nMake highest-ranked products first.",
        },
        {
          title: 'Multiple Constraints',
          type: 'text',
          content: "**When multiple resources are scarce:**\n\n**Simple approach:**\nIdentify the BINDING constraint (most limiting)\nOptimize for that constraint\n\n**Complex approach:**\nLinear programming (LP) required\n\n**LP model:**\nMaximize: Total CM = CM₁X₁ + CM₂X₂ + ...\nSubject to:\nConstraint 1: a₁X₁ + a₂X₂ ≤ Available₁\nConstraint 2: b₁X₁ + b₂X₂ ≤ Available₂\nX₁, X₂ ≥ 0",
        },
        {
          title: 'Theory of Constraints (TOC)',
          type: 'text',
          content: "**Goldratt's approach:**\n\n**Five focusing steps:**\n1. **Identify** the constraint\n2. **Exploit** the constraint (maximize its output)\n3. **Subordinate** everything else to the constraint\n4. **Elevate** the constraint (add capacity)\n5. **Repeat** (find the new constraint)\n\n**Key metric:**\nThroughput = Sales - Truly Variable Costs\n\n**Maximize throughput per constraint unit!**",
        },
        {
          title: 'Practical Application',
          type: 'text',
          content: "**Steps for constrained resource problem:**\n\n1. Identify the constraint (what's limiting output?)\n2. Calculate CM per unit of constraint for each product\n3. Rank products by CM per constraint (highest first)\n4. Allocate constraint to highest-ranked product up to demand\n5. Continue to next product until constraint exhausted\n6. Calculate total contribution margin\n\n**Watch for demand limits - you can't sell more than market wants!**",
        },
        {
          title: '⚠️ Exam Trap: Demand Constraints',
          type: 'warning',
          content: "**Don't make more than you can sell!**\n\n**Example:**\nProduct B: CM/hour = $15, Demand = 2,000 units\nProduct A: CM/hour = $10, Demand = 3,000 units\nAvailable hours: 8,000\n\n**Correct approach:**\nMake B first: 2,000 × 2 hours = 4,000 hours used\nRemaining hours: 4,000 for A\nMake A: 4,000 ÷ 4 = 1,000 units\n\nTotal CM: (2,000 × $30) + (1,000 × $40) = **$100,000**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Maximize CM per unit of SCARCE RESOURCE",
            "Rank products by CM/constraint, not CM/unit",
            "Allocate scarce resource to highest-ranked products first",
            "Respect demand constraints - can't sell infinite units",
            "Multiple constraints may require linear programming",
            "TOC: Identify, Exploit, Subordinate, Elevate, Repeat",
            "The constraint determines maximum throughput",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-C-012',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Decision Analysis Under Uncertainty',
    description: 'Make decisions when outcomes are uncertain using probability analysis',
    order: 32,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Expected value', 'Decision trees', 'Sensitivity analysis', 'Risk preferences'],
    blueprintArea: 'CMA2-C',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Business decisions are rarely certain. CMAs must incorporate uncertainty into analysis using expected value, decision trees, and sensitivity analysis. Understanding how to analyze risky decisions leads to better choices under ambiguity.",
        },
        {
          title: 'Expected Value',
          type: 'text',
          content: "**EV = Σ (Outcome × Probability)**\n\n**Example:**\nNew product investment:\n• 30% probability: $500,000 profit\n• 50% probability: $200,000 profit\n• 20% probability: $(100,000) loss\n\nEV = (0.30 × $500,000) + (0.50 × $200,000) + (0.20 × -$100,000)\nEV = $150,000 + $100,000 - $20,000\nEV = **$230,000**\n\n**Decision:** If EV > 0 or EV > alternative, accept.",
        },
        {
          title: 'Decision Tree Structure',
          type: 'text',
          content: "**Components:**\n\n**Decision nodes (squares):** Points where you choose\n**Chance nodes (circles):** Points where uncertainty resolves\n**Branches:** Represent alternatives or outcomes\n**Payoffs:** End values at branch tips\n\n**Analysis (work backwards):**\n1. Calculate EV at each chance node\n2. Choose best alternative at decision nodes\n3. Roll back to starting point",
        },
        {
          title: '🧠 Memory Aid: Decision Trees',
          type: 'callout',
          content: "**\"Squares for STRATEGY, Circles for CHANCE\"**\n\n□ = You decide (pick one branch)\n○ = Nature decides (weight by probability)\n\n**Analyze from RIGHT to LEFT:**\n1. Start at outcomes (payoffs)\n2. Weight by probability at circles\n3. Choose best option at squares\n4. Work back to root\n\n**The path through best choices = Optimal strategy**",
        },
        {
          title: 'Decision Tree Example',
          type: 'text',
          content: "**Decision:** Launch product A or B?\n\n**Product A:**\n• 60%: Success → $300,000\n• 40%: Failure → $(50,000)\nEV(A) = (0.60 × 300,000) + (0.40 × -50,000) = **$160,000**\n\n**Product B:**\n• 80%: Success → $200,000\n• 20%: Failure → $0\nEV(B) = (0.80 × 200,000) + (0.20 × 0) = **$160,000**\n\n**Same EV! But B has less variance (less risky).**",
        },
        {
          title: 'Sensitivity Analysis',
          type: 'text',
          content: "**What if assumptions change?**\n\n**Steps:**\n1. Identify key variables\n2. Change one variable at a time\n3. Recalculate outcome\n4. Determine \"trigger point\" where decision changes\n\n**Example:**\nIf success probability for A drops below 53.3%,\nEV(A) falls below EV(B).\n\n**Sensitivity analysis answers:**\n\"How wrong can our estimates be before we'd decide differently?\"",
        },
        {
          title: 'Value of Information',
          type: 'text',
          content: "**Expected Value of Perfect Information (EVPI):**\nEVPI = EV with perfect info - EV without info\n\n**What would you pay for a crystal ball?**\n\n**Example:**\nWithout info: EV = $160,000 (best we can do)\nWith perfect info:\n• If knew success (60%): Choose A for $300,000\n• If knew failure (40%): Choose B for $0\nEV with info = (0.60 × $300,000) + (0.40 × $0) = $180,000\n\nEVPI = $180,000 - $160,000 = **$20,000**\n\n**Would pay up to $20,000 for perfect prediction!**",
        },
        {
          title: '⚠️ Exam Trap: Risk Preferences',
          type: 'warning',
          content: "**Expected value assumes risk neutrality!**\n\n**Risk-averse:** Would choose certain outcome over risky one with same EV\n(Most individuals, especially with large amounts)\n\n**Risk-neutral:** Indifferent between certain and risky with same EV\n(Companies often assumed risk-neutral)\n\n**Risk-seeking:** Prefer risky option with same EV\n(Gamblers, some entrepreneurs)\n\n**Real decisions may incorporate risk preferences beyond EV!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Expected Value = Σ(Outcome × Probability)",
            "Decision trees: Squares for decisions, Circles for chance",
            "Analyze decision trees from right to left (backward)",
            "Choose option with highest expected value",
            "Sensitivity analysis tests impact of changing assumptions",
            "EVPI = EV with perfect info - EV without info",
            "Risk preferences may override pure EV analysis",
          ],
        },
      ],
    },
  },
];

// Helper functions
export const getCMA2CLessons = () => cma2CLessons;
export const getCMA2CLessonById = (id: string) => cma2CLessons.find(lesson => lesson.id === id);
export const getCMA2CLessonCount = () => cma2CLessons.length;

export default cma2CLessons;
