/**
 * CMA Part 1, Section D: Cost Management
 * Weight: 15% of Part 1 Exam
 * 
 * Topics covered:
 * - Measurement concepts
 * - Costing systems
 * - Overhead costs
 * - Supply chain management
 * 
 * Based on IMA CMA Content Specification Outline 2025-2026
 */

import { Lesson } from '../../../types';

export const cma1DLessons: Lesson[] = [
  // ============================================================================
  // CMA1-D: COST MANAGEMENT (Lessons 1-10)
  // ============================================================================
  
  {
    id: 'CMA1-D-001',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Cost Behavior and Classification',
    description: 'Understand how costs behave and are classified for management decisions',
    order: 36,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Variable costs', 'Fixed costs', 'Mixed costs', 'Relevant range'],
    blueprintArea: 'CMA1-D',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Understanding cost behavior is FOUNDATIONAL. Every planning, budgeting, and break-even analysis depends on knowing which costs change with activity and which don't. CMAs must classify costs correctly to provide useful decision information.",
        },
        {
          title: 'Cost Behavior Patterns',
          type: 'text',
          content: "**Variable Costs:**\n• Change in TOTAL as activity changes\n• Constant PER UNIT\n• Examples: Direct materials, direct labor, sales commissions\n\n**Fixed Costs:**\n• Constant in TOTAL within relevant range\n• Change PER UNIT as activity changes\n• Examples: Rent, salaries, depreciation (straight-line)\n\n**Mixed (Semi-variable) Costs:**\n• Contain both fixed and variable components\n• Examples: Utilities, phone, maintenance",
        },
        {
          title: '🧠 Memory Aid: Fixed vs. Variable',
          type: 'callout',
          content: "**\"Total vs. Per Unit - They're Opposites!\"**\n\n**Variable:**\n• Total varies (up and down)\n• Per unit stays constant (fixed rate)\n\n**Fixed:**\n• Total stays fixed (constant)\n• Per unit varies (spreads over more units)\n\n**Remember: What's fixed/variable in TOTAL is opposite PER UNIT!**",
        },
        {
          title: 'Relevant Range',
          type: 'text',
          content: "**Definition:**\nThe range of activity over which cost behavior assumptions are valid.\n\n**Outside the relevant range:**\n• Fixed costs may change (need more space, equipment)\n• Variable cost per unit may change (quantity discounts, overtime)\n\n**Example:**\n• Rent is fixed at $10,000/month for 0-10,000 sq ft\n• At 10,001 sq ft, need additional space → rent jumps to $18,000\n\n**Always specify the relevant range for cost estimates!**",
        },
        {
          title: 'High-Low Method',
          type: 'text',
          content: "**Simple technique to separate mixed costs:**\n\n**Step 1: Variable Cost per Unit**\n(High Cost - Low Cost) / (High Activity - Low Activity)\n\n**Step 2: Fixed Cost**\nTotal Cost - (Variable Rate × Activity Level)\n\n**Example:**\nHigh: 10,000 units, $45,000 cost\nLow: 6,000 units, $33,000 cost\n\nVariable: ($45,000 - $33,000) / (10,000 - 6,000) = $3/unit\nFixed: $45,000 - ($3 × 10,000) = $15,000\n\n**Cost function:** Y = $15,000 + $3X",
        },
        {
          title: 'Cost Classifications',
          type: 'table',
          headers: ['Classification', 'Purpose', 'Categories'],
          rows: [
            ['By behavior', 'Planning, CVP analysis', 'Fixed, Variable, Mixed'],
            ['By function', 'Financial reporting', 'Product vs. Period'],
            ['By traceability', 'Product costing', 'Direct vs. Indirect'],
            ['By controllability', 'Performance evaluation', 'Controllable vs. Uncontrollable'],
            ['By relevance', 'Decision-making', 'Relevant vs. Sunk'],
          ],
        },
        {
          title: 'Product vs. Period Costs',
          type: 'text',
          content: "**Product Costs (Inventoriable):**\n• Attached to inventory until sold\n• DM, DL, Manufacturing Overhead\n• Become COGS when sold\n\n**Period Costs:**\n• Expensed in period incurred\n• Selling expenses\n• Administrative expenses\n• Not attached to products\n\n**Key difference:** Product costs sit on balance sheet (inventory) until sale; period costs hit income statement immediately.",
        },
        {
          title: '⚠️ Exam Trap: Step Costs',
          type: 'warning',
          content: "**Step costs are fixed within ranges, then jump:**\n\n• Supervisor salaries (1 per 10 workers)\n• Equipment rental (per machine)\n• Storage space\n\n**Treatment on exam:**\n• Often treated as fixed within relevant range\n• May need to identify the \"step\" when crossing ranges\n• Watch for questions asking about cost at specific activity levels",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Variable costs change in total but are constant per unit",
            "Fixed costs are constant in total but change per unit",
            "Relevant range defines where cost behavior holds true",
            "High-Low Method: (High - Low Cost) / (High - Low Activity) = Variable rate",
            "Product costs attach to inventory; Period costs expense immediately",
            "Different classifications serve different purposes",
            "Step costs are fixed within ranges, then jump",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-D-002',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Job Order Costing',
    description: 'Calculate product costs using job order costing systems',
    order: 37,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Job cost sheet', 'Overhead application', 'Over/underapplied overhead'],
    blueprintArea: 'CMA1-D',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Job order costing tracks costs to specific jobs, products, or batches. CMAs use it for custom manufacturing, construction, and professional services. Understanding job costing is essential for accurate product costing and pricing.",
        },
        {
          title: 'When to Use Job Order Costing',
          type: 'text',
          content: "**Appropriate when:**\n• Products are distinct/customized\n• Each job is identifiable\n• Costs differ significantly between jobs\n\n**Industries:**\n• Custom furniture manufacturing\n• Construction\n• Printing shops\n• Consulting/professional services\n• Repair shops\n• Movie production",
        },
        {
          title: 'Job Cost Sheet',
          type: 'text',
          content: "**The key document that accumulates costs for each job:**\n\n```\nJob Order Cost Sheet\nJob No: 101\nCustomer: ABC Corp\nDate Started: 1/5    Date Completed: 1/20\n\nDirect Materials:\n  Requisition #201    $2,000\n  Requisition #205      $800\n  Total DM           $2,800\n\nDirect Labor:\n  40 hrs @ $25/hr    $1,000\n  20 hrs @ $30/hr      $600\n  Total DL           $1,600\n\nManufacturing Overhead Applied:\n  60 hrs × $15/DLH     $900\n\nTotal Job Cost:       $5,300\n```",
        },
        {
          title: 'Overhead Application',
          type: 'text',
          content: "**Predetermined Overhead Rate (POHR):**\n\nPOHR = Estimated OH / Estimated Activity Base\n\n**Common allocation bases:**\n• Direct labor hours\n• Direct labor dollars\n• Machine hours\n• Direct materials cost\n\n**Overhead Applied:**\nActual Activity × POHR\n\n**Example:**\nPOHR = $300,000 / 20,000 DLH = $15/DLH\nJob 101 used 60 DLH\nOH Applied = 60 × $15 = $900",
        },
        {
          title: '🧠 Memory Aid: OH Flow',
          type: 'callout',
          content: "**\"APAR\"** - What happens to overhead:\n\n**A**ctual OH → Debit OH Control (incurred)\n**P**redetermined rate calculated\n**A**pplied OH → Credit OH Control, Debit WIP\n**R**econcile at year-end (close difference)\n\n**Actual ≠ Applied (almost always!)**",
        },
        {
          title: 'Over/Underapplied Overhead',
          type: 'text',
          content: "**At year-end:**\nActual OH incurred vs. OH Applied\n\n**Underapplied (Debit balance):**\nActual OH > Applied OH\n\"We didn't charge enough to products\"\n\n**Overapplied (Credit balance):**\nApplied OH > Actual OH\n\"We charged too much to products\"\n\n**Disposition:**\n• If immaterial: Close to COGS\n• If material: Allocate to WIP, FG, and COGS based on overhead in each",
        },
        {
          title: 'Journal Entries',
          type: 'table',
          headers: ['Transaction', 'Debit', 'Credit'],
          rows: [
            ['Purchase materials', 'Raw Materials Inventory', 'Accounts Payable'],
            ['Issue direct materials', 'WIP Inventory', 'Raw Materials Inventory'],
            ['Record direct labor', 'WIP Inventory', 'Wages Payable'],
            ['Apply overhead', 'WIP Inventory', 'Manufacturing OH'],
            ['Complete job', 'Finished Goods', 'WIP Inventory'],
            ['Sell job', 'COGS', 'Finished Goods'],
            ['Close underapplied OH', 'COGS', 'Manufacturing OH'],
          ],
        },
        {
          title: '⚠️ Exam Trap: Actual vs. Applied',
          type: 'warning',
          content: "**Never use actual OH for job costing during the period!**\n\n**Why?**\n• Actual OH not known until period ends\n• Need cost information for pricing decisions NOW\n• Some OH is seasonal (e.g., heating costs)\n\n**Use POHR and applied OH for:**\n• Pricing decisions\n• Job profitability analysis\n• Inventory valuation\n\n**Reconcile to actual only at period end!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Job order costing traces costs to specific jobs/batches",
            "Job cost sheet accumulates DM + DL + Applied OH",
            "POHR = Estimated OH / Estimated Activity",
            "Applied OH = Actual Activity × POHR",
            "Underapplied: Actual > Applied (charged too little)",
            "Overapplied: Applied > Actual (charged too much)",
            "Immaterial over/under → close to COGS",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-D-003',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Process Costing',
    description: 'Calculate product costs using process costing and equivalent units',
    order: 38,
    duration: 55,
    difficulty: 'advanced',
    topics: ['Equivalent units', 'FIFO', 'Weighted average', 'Cost reconciliation'],
    blueprintArea: 'CMA1-D',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Process costing averages costs over identical units in continuous production. It's used in chemicals, food processing, oil refining, and semiconductors. CMAs must calculate equivalent units to properly value inventory when units are partially complete.",
        },
        {
          title: 'When to Use Process Costing',
          type: 'text',
          content: "**Appropriate when:**\n• Products are homogeneous (identical)\n• Continuous production process\n• Costs cannot be traced to individual units\n\n**Industries:**\n• Oil refining\n• Chemical processing\n• Food and beverage\n• Pharmaceuticals\n• Cement\n• Paper manufacturing",
        },
        {
          title: 'The Problem: Partially Complete Units',
          type: 'text',
          content: "**At any point, production has:**\n• Beginning WIP (started last period)\n• Units started and completed\n• Ending WIP (not yet finished)\n\n**Question:** How do we calculate cost per unit when some units aren't finished?\n\n**Solution: Equivalent Units (EU)**\nConvert partial units to their equivalent in fully completed units.\n\n**Example:**\n1,000 units 40% complete = 400 equivalent units",
        },
        {
          title: 'Equivalent Units Calculation',
          type: 'text',
          content: "**Weighted Average Method:**\nEU = Units Completed + (Ending WIP × % Complete)\n\n**FIFO Method:**\nEU = (Beg WIP × % to Complete) + Units Started & Completed + (Ending WIP × % Complete)\n\n**Key difference:**\n• Weighted Average: Blends beginning inventory with current period\n• FIFO: Separates beginning inventory from current period work\n\n**Note:** Materials often added at beginning (100%), conversion at various points.",
        },
        {
          title: '🧠 Memory Aid: FIFO EU',
          type: 'callout',
          content: "**\"Complete, Start Fresh, End Partial\"**\n\nFIFO Equivalent Units:\n\n1. **Complete** the beginning WIP (what's left to do)\n2. **Start Fresh** - units started AND completed\n3. **End Partial** - ending WIP progress\n\n**Units Started & Completed = Units Started - Ending WIP**\nOR\n**= Units Completed - Beginning WIP**",
        },
        {
          title: 'Process Costing Example',
          type: 'text',
          content: "**Given:**\n• Beginning WIP: 2,000 units (40% complete for conversion)\n• Started: 10,000 units\n• Completed: 9,000 units\n• Ending WIP: 3,000 units (60% complete for conversion)\n• Beginning WIP cost: $8,000\n• Current period conversion costs: $72,000\n\n**Weighted Average EU:**\n9,000 + (3,000 × 60%) = 9,000 + 1,800 = 10,800 EU\n\n**Cost per EU (WA):**\n($8,000 + $72,000) / 10,800 = $7.41/EU\n\n**FIFO EU:**\n(2,000 × 60%) + (9,000 - 2,000) + (3,000 × 60%)\n= 1,200 + 7,000 + 1,800 = 10,000 EU\n\n**Cost per EU (FIFO):**\n$72,000 / 10,000 = $7.20/EU",
        },
        {
          title: 'Cost Reconciliation',
          type: 'table',
          headers: ['Item', 'Units', 'Equivalent Units', 'Cost'],
          rows: [
            ['Beginning WIP', '2,000', '(Prior period)', '$8,000'],
            ['Current costs', '—', '10,000 EU', '$72,000'],
            ['Total to account for', '—', '—', '$80,000'],
            ['Transferred out', '9,000', '9,000 EU', '$66,667'],
            ['Ending WIP', '3,000', '1,800 EU', '$13,333'],
            ['Total accounted for', '—', '—', '$80,000 ✓'],
          ],
        },
        {
          title: '⚠️ Exam Trap: Materials vs. Conversion',
          type: 'warning',
          content: "**Materials and conversion often have DIFFERENT % complete!**\n\n**Common pattern:**\n• Materials added at START → 100% complete for all WIP\n• Conversion added evenly → varies based on stage\n\n**Example:**\nEnding WIP: 1,000 units, 100% materials, 40% conversion\n\nEU for materials: 1,000 × 100% = 1,000\nEU for conversion: 1,000 × 40% = 400\n\n**Calculate separately, cost separately, add together!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Process costing for homogeneous products in continuous production",
            "Equivalent Units convert partial units to completed equivalents",
            "WA EU = Completed + (Ending WIP × %)",
            "FIFO EU separates beginning WIP from current period work",
            "Materials often 100% at start; Conversion varies",
            "Calculate materials and conversion EU separately",
            "Cost reconciliation: Total in = Total out (check your work!)",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-D-004',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Activity-Based Costing (ABC)',
    description: 'Apply ABC to calculate accurate product costs using cost drivers',
    order: 39,
    duration: 55,
    difficulty: 'advanced',
    topics: ['Cost drivers', 'Activity cost pools', 'ABC advantages', 'Implementation'],
    blueprintArea: 'CMA1-D',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Traditional costing uses one overhead rate and often subsidizes complex products. ABC assigns overhead based on what actually drives costs. CMAs use ABC to reveal true product profitability and identify cost reduction opportunities.",
        },
        {
          title: 'The Problem with Traditional Costing',
          type: 'text',
          content: "**Traditional (plantwide or departmental) overhead:**\n• Uses volume-based allocations (DLH, machine hours)\n• Assumes all products consume OH in proportion to volume\n\n**Result:**\n• High-volume simple products → Overcosted\n• Low-volume complex products → Undercosted\n\n**Why?** Complex products require more:\n• Setups, inspections, engineering changes\n• Special handling, smaller batches\n• These costs don't correlate with volume!",
        },
        {
          title: 'ABC Approach',
          type: 'text',
          content: "**Step 1:** Identify activities that consume resources\n\n**Step 2:** Assign costs to activity cost pools\n\n**Step 3:** Identify cost drivers for each activity\n\n**Step 4:** Calculate activity rate = Pool Cost / Total Driver Units\n\n**Step 5:** Apply costs to products based on actual driver consumption\n\n**Key insight:** Assign costs based on what CAUSES the cost!",
        },
        {
          title: '🧠 Memory Aid: Cost Hierarchy',
          type: 'callout',
          content: "**\"U-B-P-F\"** - From specific to broad:\n\n**U**nit-level: Each unit (machining, direct materials)\n**B**atch-level: Each batch (setups, inspections)\n**P**roduct-level: Each product (engineering, design)\n**F**acility-level: Overall capacity (rent, plant manager)\n\n**Only unit-level varies with production volume!**",
        },
        {
          title: 'ABC Example',
          type: 'table',
          headers: ['Activity', 'Cost Pool', 'Driver', 'Rate'],
          rows: [
            ['Machine setup', '$50,000', '100 setups', '$500/setup'],
            ['Quality inspection', '$30,000', '600 inspections', '$50/inspection'],
            ['Material handling', '$20,000', '500 moves', '$40/move'],
            ['Engineering', '$40,000', '200 eng. hours', '$200/hour'],
          ],
        },
        {
          title: 'Product Cost Comparison',
          type: 'text',
          content: "**Product A (high volume, simple):**\n• 10,000 units, 10 setups, 100 inspections\n• ABC OH: (10 × $500) + (100 × $50) = $10,000\n• Per unit: $1.00\n\n**Product B (low volume, complex):**\n• 1,000 units, 30 setups, 150 inspections\n• ABC OH: (30 × $500) + (150 × $50) = $22,500\n• Per unit: $22.50\n\n**Traditional (based on units):**\nProducts appear equally profitable\n\n**ABC reveals:**\nProduct B is 22× more overhead-intensive per unit!",
        },
        {
          title: 'ABC Implementation',
          type: 'text',
          content: "**Benefits:**\n• More accurate product costs\n• Better pricing decisions\n• Identifies process improvement opportunities\n• Supports product mix decisions\n\n**Challenges:**\n• Time and cost to implement\n• Requires activity analysis\n• Cost driver selection can be subjective\n• Need to maintain/update system\n\n**Best for:**\n• Diverse product lines\n• Significant indirect costs\n• Non-volume-related activities",
        },
        {
          title: '⚠️ Exam Trap: ABC Doesn\'t Always Differ',
          type: 'warning',
          content: "**When does ABC produce SIMILAR results to traditional?**\n\n• All products are similar (single product company)\n• Most costs are truly volume-driven\n• Low overhead relative to direct costs\n• No product diversity\n\n**ABC matters most when:**\n• Product diversity is high\n• Overhead is significant\n• Batch and product-sustaining activities are major cost drivers",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Traditional costing uses volume bases; ABC uses causal drivers",
            "ABC cost hierarchy: Unit, Batch, Product, Facility",
            "Only unit-level costs vary with production volume",
            "Complex/low-volume products are often undercosted traditionally",
            "Activity Rate = Cost Pool / Driver Quantity",
            "ABC reveals true product profitability",
            "Implementation requires activity analysis and driver selection",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-D-005',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Variable and Absorption Costing',
    description: 'Compare variable and absorption costing methods and their impact on income',
    order: 40,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Absorption costing', 'Variable costing', 'Income differences', 'Reconciliation'],
    blueprintArea: 'CMA1-D',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Absorption costing (GAAP) and variable costing (internal) produce different income figures when production ≠ sales. CMAs must understand when and why income differs, reconcile between methods, and know when each is appropriate.",
        },
        {
          title: 'The Key Difference',
          type: 'text',
          content: "**Fixed Manufacturing Overhead Treatment:**\n\n**Absorption Costing (Full Costing):**\n• Fixed MOH is a PRODUCT cost\n• Included in inventory\n• Required by GAAP and tax regulations\n\n**Variable Costing (Direct Costing):**\n• Fixed MOH is a PERIOD cost\n• Expensed immediately\n• Used for internal decision-making",
        },
        {
          title: 'Product Cost Components',
          type: 'table',
          headers: ['Cost', 'Absorption', 'Variable'],
          rows: [
            ['Direct Materials', 'Product', 'Product'],
            ['Direct Labor', 'Product', 'Product'],
            ['Variable MOH', 'Product', 'Product'],
            ['Fixed MOH', 'Product', 'PERIOD'],
            ['Variable S&A', 'Period', 'Period'],
            ['Fixed S&A', 'Period', 'Period'],
          ],
        },
        {
          title: '🧠 Memory Aid: Income Differences',
          type: 'callout',
          content: "**\"PIE\" - Production vs. Income Effect:**\n\n**P**roduction > Sales → Absorption income **HIGHER**\n(Fixed OH sits in inventory instead of expensing)\n\n**I**nventory increases → Absorption income > Variable\n\n**E**quals: When Production = Sales → Same income\n\n**Simple rule:** If inventory goes UP, absorption > variable",
        },
        {
          title: 'Income Comparison Example',
          type: 'text',
          content: "**Given:**\n• Selling price: $50/unit\n• Variable costs: $30/unit\n• Fixed MOH: $100,000\n• Fixed S&A: $50,000\n• Production: 10,000 units\n• Sales: 8,000 units\n\n**Absorption:**\nFixed MOH/unit = $100,000/10,000 = $10\nCOGS = 8,000 × ($30 + $10) = $320,000\nGross profit = $400,000 - $320,000 = $80,000\nOperating income = $80,000 - $50,000 = **$30,000**\n\n**Variable:**\nCM = 8,000 × ($50 - $30) = $160,000\nOperating income = $160,000 - $100,000 - $50,000 = **$10,000**\n\n**Difference:** $30,000 - $10,000 = **$20,000**",
        },
        {
          title: 'Reconciliation',
          type: 'text',
          content: "**Income Difference Formula:**\n\nAbsorption Income - Variable Income = \nChange in Inventory (units) × Fixed MOH per unit\n\n**From example:**\nInventory increase: 10,000 - 8,000 = 2,000 units\nFixed MOH/unit: $10\nDifference: 2,000 × $10 = $20,000 ✓\n\n**Works every time!**\nInventory ↑ → Absorption > Variable\nInventory ↓ → Variable > Absorption",
        },
        {
          title: 'Advantages and Disadvantages',
          type: 'table',
          headers: ['Method', 'Advantages', 'Disadvantages'],
          rows: [
            ['Absorption', 'GAAP compliant; matches costs to revenue; includes all product costs', 'Income can be manipulated by production levels; fixed costs capitalized'],
            ['Variable', 'Better for CVP analysis; clear CM reporting; no production manipulation', 'Not GAAP; may undervalue inventory; fixed costs expensed immediately'],
          ],
        },
        {
          title: '⚠️ Exam Trap: Manipulation via Production',
          type: 'warning',
          content: "**Under absorption costing, managers can boost income by overproducing!**\n\n**Example:**\nManager needs $100,000 income but is at $80,000\nSolution: Produce extra 2,000 units (Fixed MOH/unit = $10)\nResult: $20,000 more fixed OH absorbed into inventory\n\n**The units just sit in warehouse, but income goes up!**\n\n**Variable costing eliminates this manipulation incentive.**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Absorption: Fixed MOH is product cost (GAAP required)",
            "Variable: Fixed MOH is period cost (internal use)",
            "Production > Sales → Absorption income higher",
            "Production < Sales → Variable income higher",
            "Production = Sales → Same income",
            "Difference = Change in inventory × Fixed MOH/unit",
            "Variable costing prevents production manipulation of income",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-D-006',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Joint and By-Product Costing',
    description: 'Allocate joint costs and account for by-products in manufacturing',
    order: 41,
    duration: 45,
    difficulty: 'advanced',
    topics: ['Split-off point', 'Joint cost allocation', 'Further processing', 'By-products'],
    blueprintArea: 'CMA1-D',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Many industries produce multiple products from the same input (oil refining, meat processing, chemicals). CMAs must allocate joint costs for inventory valuation AND know that joint costs are irrelevant for sell-or-process-further decisions!",
        },
        {
          title: 'Joint Cost Terminology',
          type: 'text',
          content: "**Joint Costs:**\nCosts incurred before products become separately identifiable.\n\n**Split-off Point:**\nWhere joint products become separately identifiable.\n\n**Joint Products:**\nMain products from a joint process (each has significant value).\n\n**By-Products:**\nMinor products with relatively small value.\n\n**Separable Costs:**\nCosts incurred AFTER split-off (one product only).",
        },
        {
          title: 'Joint Cost Allocation Methods',
          type: 'table',
          headers: ['Method', 'Basis', 'Best When'],
          rows: [
            ['Physical measure', 'Weight, volume, units', 'Products similar in nature'],
            ['Sales value at split-off', 'Market value at split-off', 'All products saleable at split-off'],
            ['Net realizable value (NRV)', 'Final sales - Separable costs', 'Products require further processing'],
            ['Constant gross margin %', 'Same margin for all products', 'Want consistent GM percentage'],
          ],
        },
        {
          title: 'NRV Method Example',
          type: 'text',
          content: "**Joint Costs:** $100,000\n\n**Product A:**\n• Final sales value: $80,000\n• Separable costs: $20,000\n• NRV: $80,000 - $20,000 = $60,000\n\n**Product B:**\n• Final sales value: $60,000\n• Separable costs: $20,000\n• NRV: $60,000 - $20,000 = $40,000\n\n**Total NRV:** $100,000\n\n**Allocation:**\nProduct A: $100,000 × ($60,000/$100,000) = **$60,000**\nProduct B: $100,000 × ($40,000/$100,000) = **$40,000**",
        },
        {
          title: '🧠 Memory Aid: Joint Costs and Decisions',
          type: 'callout',
          content: "**\"SUNK at Split-off\"**\n\nJoint costs are SUNK for sell-or-process-further decisions!\n\n**Decision rule:**\nProcess further if:\nIncremental Revenue > Incremental (Separable) Costs\n\n**Joint costs are irrelevant - they're the same either way!**\n\nAllocation of joint costs matters only for:\n• Inventory valuation\n• Cost-based pricing\n• NOT for process-further decisions",
        },
        {
          title: 'Sell vs. Process Further',
          type: 'text',
          content: "**Product A at Split-off:**\n• Sales value at split-off: $50,000\n• Sales value after processing: $80,000\n• Further processing costs: $20,000\n\n**Analysis:**\nIncremental revenue: $80,000 - $50,000 = $30,000\nIncremental cost: $20,000\nIncremental profit: **$10,000**\n\n**Decision:** Process further!\n\n**Note:** Joint costs of $60,000 allocated to Product A are IRRELEVANT - same either way.",
        },
        {
          title: 'By-Product Accounting',
          type: 'text',
          content: "**Two methods:**\n\n**Production Method:**\n• Recognize revenue when produced\n• Credit Inventory or reduce COGS\n\n**Sales Method:**\n• Recognize revenue when sold\n• Credit Other Revenue or reduce COGS\n\n**Common treatments:**\n• NRV of by-product reduces joint cost to allocate\n• By-product revenue shown as Other Income\n• By-product revenue reduces COGS\n\n**By-products receive NO allocation of joint costs!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Joint costs incurred before split-off; separable costs after",
            "NRV Method: Allocate based on (Final Sales - Separable Costs)",
            "Joint costs are SUNK for sell-or-process decisions",
            "Process further if Incremental Revenue > Incremental Cost",
            "By-products: minor value, no joint cost allocation",
            "Joint cost allocation for inventory valuation only",
            "Physical measures appropriate when products are similar",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-D-007',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Standard Costing System',
    description: 'Establish and use standard costs for planning and control',
    order: 42,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Standard costs', 'Standard setting', 'Variance investigation', 'Journal entries'],
    blueprintArea: 'CMA1-D',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Standard costs are predetermined costs that serve as benchmarks. CMAs use standards for budgeting, variance analysis, and simplifying accounting. Standards help answer: \"What SHOULD this product cost?\" vs. \"What DID it cost?\"",
        },
        {
          title: 'Types of Standards',
          type: 'table',
          headers: ['Type', 'Description', 'Motivation Effect'],
          rows: [
            ['Ideal (Theoretical)', 'Perfect conditions, no waste', 'Demotivating - unattainable'],
            ['Basic (Historical)', 'Unchanged for long periods', 'May be outdated'],
            ['Currently attainable', 'Achievable with reasonable effort', 'Best for motivation'],
            ['Practical', 'Allows for normal inefficiencies', 'Realistic expectations'],
          ],
        },
        {
          title: 'Setting Standards',
          type: 'text',
          content: "**Materials Standards:**\n• Quantity: Engineering specs + allowance for normal waste\n• Price: Expected purchase price including freight, net of discounts\n\n**Labor Standards:**\n• Time: Time and motion studies + learning curve\n• Rate: Expected wage rates including benefits, FICA\n\n**Overhead Standards:**\n• Variable: Based on cost driver relationship\n• Fixed: Based on budgeted costs and normal capacity\n\n**Involve operations, purchasing, HR in setting standards!**",
        },
        {
          title: 'Standard Cost Card',
          type: 'text',
          content: "**Product: Widget Model A**\n\n```\nDirect Materials:\n  2 lbs @ $5.00/lb                    $10.00\n\nDirect Labor:\n  0.5 hrs @ $20.00/hr                 $10.00\n\nVariable Overhead:\n  0.5 DLH @ $6.00/DLH                  $3.00\n\nFixed Overhead:\n  0.5 DLH @ $10.00/DLH                 $5.00\n\nStandard Cost per Unit:               $28.00\n```\n\n**This becomes the \"should cost\" for planning and control.**",
        },
        {
          title: '🧠 Memory Aid: Standard Cost Benefits',
          type: 'callout',
          content: "**\"PISC\"** - Standards help with:\n\n**P**lanning - Budgets based on standards\n**I**nventory valuation - Simplify record-keeping\n**S**implify accounting - Book at standard, track variances\n**C**ontrol - Compare actual to standard, investigate variances",
        },
        {
          title: 'Journal Entries with Standards',
          type: 'text',
          content: "**Record at STANDARD, isolate VARIANCE:**\n\n**Materials Purchase (at standard):**\nDr Raw Materials (AQ × SP)    10,500\nDr Materials Price Variance        420 U\n    Cr Accounts Payable (AQ × AP)    10,920\n\n**Materials Use (at standard):**\nDr WIP (SQ × SP)              10,000\nDr Materials Usage Variance      500 U\n    Cr Raw Materials (AQ × SP)      10,500\n\n**Variances are recorded AS THEY OCCUR!**",
        },
        {
          title: 'Variance Investigation',
          type: 'text',
          content: "**When to investigate:**\n• Dollar threshold exceeded\n• Percentage threshold exceeded\n• Recurring pattern\n• Controllable variance\n• Statistical significance\n\n**Cost-benefit test:**\nInvestigate if: Expected savings > Investigation cost\n\n**Investigation options:**\n• Internal review of processes\n• Discuss with responsible managers\n• Review source documents\n• Statistical process control charts",
        },
        {
          title: '⚠️ Exam Trap: When to Update Standards',
          type: 'warning',
          content: "**Don't update standards too frequently!**\n\n**Update when:**\n• Permanent price changes occur\n• Technology/process fundamentally changes\n• Learning curve reaches steady state\n• Original standard was wrong\n\n**Don't update for:**\n• Temporary fluctuations\n• Seasonal variations\n• One-time events\n\n**Frequent changes make variance analysis meaningless!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Standards are predetermined benchmark costs",
            "Currently attainable standards best for motivation",
            "Standard cost card shows expected cost per unit",
            "Record inventory at standard; isolate variances",
            "Book variances as they occur, not at period end",
            "Investigate material and recurring variances",
            "Update standards for permanent changes only",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-D-008',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Lean Manufacturing and JIT',
    description: 'Apply lean principles and just-in-time inventory management',
    order: 43,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Lean principles', 'JIT', 'Pull systems', 'Waste elimination'],
    blueprintArea: 'CMA1-D',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Lean manufacturing eliminates waste and reduces inventory. CMAs must understand how JIT changes costing, how to measure lean performance, and the risks/benefits of minimal inventory. This is increasingly tested as more companies adopt lean practices.",
        },
        {
          title: 'The Seven Wastes (Muda)',
          type: 'text',
          content: "**Lean identifies seven types of waste:**\n\n1. **Overproduction** - Making more than needed\n2. **Waiting** - Idle time, delays\n3. **Transportation** - Unnecessary movement of materials\n4. **Overprocessing** - More work than customer values\n5. **Inventory** - Excess raw materials, WIP, finished goods\n6. **Motion** - Unnecessary worker movement\n7. **Defects** - Rework, scrap, inspection\n\n**Goal: Eliminate all non-value-adding activities!**",
        },
        {
          title: '🧠 Memory Aid: 7 Wastes',
          type: 'callout',
          content: "**\"TIM WOOD\"** - The 7 Wastes:\n\n**T**ransportation\n**I**nventory\n**M**otion\n**W**aiting\n**O**verproduction\n**O**verprocessing\n**D**efects\n\n**TIM WOOD is the enemy of lean!**",
        },
        {
          title: 'Just-in-Time (JIT) Principles',
          type: 'text',
          content: "**Core concepts:**\n• **Pull system** - Produce only when demanded by next stage\n• **Zero defects** - Quality at the source\n• **Minimal inventory** - Material arrives just when needed\n• **Continuous improvement** (Kaizen)\n• **Respect for workers** - Empower problem-solving\n\n**JIT requires:**\n• Reliable suppliers\n• Short setup times\n• Flexible workforce\n• High-quality processes",
        },
        {
          title: 'JIT Effects on Costing',
          type: 'table',
          headers: ['Traditional', 'JIT/Lean'],
          rows: [
            ['Large inventory buffers', 'Minimal inventory'],
            ['Complex variance analysis', 'Simpler costing'],
            ['Detailed job/process costing', 'Backflush costing'],
            ['Multiple cost pools', 'Fewer cost pools'],
            ['Focus on cost per unit', 'Focus on throughput'],
            ['Absorption costing emphasis', 'Variable/throughput emphasis'],
          ],
        },
        {
          title: 'Backflush Costing',
          type: 'text',
          content: "**Definition:**\nCosting system that delays recording until completion or sale.\n\n**How it works:**\n1. No WIP account (or minimal)\n2. Costs \"backflushed\" when units completed or sold\n3. Standard costs applied at that point\n4. Variances recognized at completion\n\n**Appropriate when:**\n• JIT environment\n• Minimal WIP at any time\n• Short production cycles\n• Stable, predictable processes",
        },
        {
          title: 'Lean Performance Metrics',
          type: 'text',
          content: "**Beyond traditional cost metrics:**\n\n• **Lead time** - Order to delivery\n• **Cycle time** - Start to finish for one unit\n• **Setup time** - Time to change over\n• **First-pass yield** - % with no rework\n• **Throughput** - Units per period\n• **Days of inventory** - Lower is better\n• **Value-added ratio** - (Value-add time / Total time)\n\n**Focus on TIME and QUALITY, not just cost!**",
        },
        {
          title: '⚠️ Exam Trap: JIT Risks',
          type: 'warning',
          content: "**JIT isn't always appropriate:**\n\n**Risks of minimal inventory:**\n• Supply chain disruptions (COVID example!)\n• Supplier quality problems\n• Demand spikes can't be met\n• Single-source supplier dependency\n\n**JIT works best with:**\n• Reliable suppliers\n• Stable demand\n• Short distances\n• Healthy supplier relationships\n\n**Exam may ask when JIT is NOT appropriate!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Seven wastes (TIM WOOD) are targets for elimination",
            "JIT is a pull system - produce only when demanded",
            "JIT requires minimal inventory, reliable suppliers",
            "Backflush costing simplifies accounting in JIT",
            "Lean metrics focus on time and quality, not just cost",
            "JIT risks: supply disruptions, demand variability",
            "Kaizen = continuous improvement",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-D-009',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Target Costing and Kaizen',
    description: 'Apply target costing for product development and kaizen for continuous improvement',
    order: 44,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Target costing', 'Value engineering', 'Kaizen costing', 'Life-cycle costing'],
    blueprintArea: 'CMA1-D',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Target costing starts with the customer and works backward to allowable costs. CMAs drive cross-functional teams to design products that meet cost AND profit targets. This is essential for competitive industries where price is market-driven.",
        },
        {
          title: 'Target Costing Formula',
          type: 'text',
          content: "**Traditional approach:**\nPrice = Cost + Profit\n(We ADD profit to cost)\n\n**Target costing approach:**\nTarget Cost = Target Price - Required Profit\n(We SUBTRACT from price)\n\n**The market sets the price!**\n\n**Example:**\n• Market research shows customers will pay: $100\n• Required profit margin: 20%\n• Required profit: $100 × 20% = $20\n• **Target Cost: $100 - $20 = $80**\n\nNow design the product to cost $80 or less!",
        },
        {
          title: 'Target Costing Process',
          type: 'text',
          content: "**Step 1:** Conduct market research (what will customers pay?)\n\n**Step 2:** Determine target selling price\n\n**Step 3:** Calculate required profit margin\n\n**Step 4:** Calculate target cost (Price - Profit)\n\n**Step 5:** Design product to meet target cost\n• Value engineering\n• Supplier involvement\n• Design for manufacturability\n\n**Step 6:** If cost can't be achieved, don't launch product!",
        },
        {
          title: '🧠 Memory Aid: Target Costing',
          type: 'callout',
          content: "**\"The Market is the Boss\"**\n\nTraditional: Cost → Price (cost-plus)\n• We tell the market our price\n\nTarget: Price → Cost (market-driven)\n• Market tells us the price\n• We work backward to cost\n\n**Formula: Target Cost = Target Price - Target Profit**",
        },
        {
          title: 'Value Engineering',
          type: 'text',
          content: "**Definition:**\nSystematic analysis to achieve required functions at lowest cost.\n\n**Key question:** What does the customer actually VALUE?\n\n**Techniques:**\n• Eliminate unnecessary features\n• Simplify design\n• Use cheaper materials (same quality)\n• Reduce number of parts\n• Design for manufacturing\n• Involve suppliers early\n\n**Value = Function / Cost**\nIncrease value by improving function OR reducing cost!",
        },
        {
          title: 'Kaizen Costing',
          type: 'text',
          content: "**Target costing:** BEFORE production (design phase)\n**Kaizen costing:** DURING production (ongoing)\n\n**Kaizen = Continuous Improvement**\n\n**Approach:**\n• Set cost reduction targets each period\n• Small, incremental improvements\n• Involve all employees\n• Focus on process improvements\n\n**Example:**\nYear 1 actual cost: $82\nKaizen target: Reduce by 3% per year\nYear 2 target: $82 × 97% = $79.54",
        },
        {
          title: 'Life-Cycle Costing',
          type: 'table',
          headers: ['Phase', 'Cost Category', 'Consideration'],
          rows: [
            ['R&D', 'Development costs', '80% of costs committed here'],
            ['Design', 'Engineering, prototyping', 'Value engineering opportunities'],
            ['Production', 'Manufacturing costs', 'Kaizen improvements'],
            ['Service', 'Warranty, support', 'Design affects service costs'],
            ['Disposal', 'Environmental, recycling', 'Growing regulatory importance'],
          ],
        },
        {
          title: '⚠️ Exam Trap: Target Costing Prerequisites',
          type: 'warning',
          content: "**Target costing works best when:**\n\n• Market price is competitive/known\n• Design flexibility exists\n• Cross-functional teams available\n• Supplier collaboration possible\n• Long product development cycle\n\n**Less effective when:**\n• You have pricing power (monopoly)\n• Design is fixed (commodities)\n• Short development cycles\n• Limited supplier options",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Target Cost = Target Price - Required Profit",
            "Market determines price; we design to cost",
            "Value engineering reduces cost while maintaining function",
            "Target costing: design phase; Kaizen: production phase",
            "80% of costs are committed in design phase",
            "Life-cycle costing considers R&D through disposal",
            "Kaizen = continuous small improvements",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-D-010',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Supply Chain Management',
    description: 'Understand supply chain concepts and their cost management implications',
    order: 45,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Supply chain costs', 'Vendor management', 'Outsourcing', 'Total cost of ownership'],
    blueprintArea: 'CMA1-D',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Supply chain costs can exceed direct production costs! CMAs analyze total cost of ownership, evaluate make-vs-buy decisions, and measure supplier performance. Poor supply chain management destroys value; excellent SCM creates competitive advantage.",
        },
        {
          title: 'Supply Chain Components',
          type: 'text',
          content: "**Upstream (Inbound):**\n• Suppliers and their suppliers\n• Procurement\n• Inbound logistics\n\n**Operations:**\n• Manufacturing/conversion\n• Internal logistics\n\n**Downstream (Outbound):**\n• Distribution\n• Wholesalers/retailers\n• End customers\n\n**Goal: Optimize the ENTIRE chain, not just your piece!**",
        },
        {
          title: 'Total Cost of Ownership (TCO)',
          type: 'text',
          content: "**TCO includes more than purchase price:**\n\n**Acquisition costs:**\n• Purchase price\n• Ordering costs\n• Freight and duties\n\n**Possession costs:**\n• Carrying costs\n• Storage and handling\n• Insurance\n\n**Usage costs:**\n• Quality issues (inspection, rework)\n• Downtime from defects\n• Warranty claims\n\n**Lowest price ≠ Lowest total cost!**",
        },
        {
          title: '🧠 Memory Aid: TCO',
          type: 'callout',
          content: "**\"APU\"** - Three cost categories:\n\n**A**cquisition - Getting it\n**P**ossession - Holding it\n**U**sage - Using it\n\n**Example:**\nSupplier A: $10/unit + $2 shipping + $1 inspection = $13 TCO\nSupplier B: $11/unit + $1 shipping + $0 inspection = $12 TCO\n\n**Higher price, lower TCO wins!**",
        },
        {
          title: 'Make vs. Buy Decision',
          type: 'text',
          content: "**Relevant costs to compare:**\n\n**Make:**\n• Variable manufacturing costs\n• Direct fixed costs (avoidable)\n• Opportunity cost of capacity\n\n**Buy:**\n• Purchase price\n• Ordering costs\n• Receiving and inspection\n• Quality assurance\n\n**Exclude:** Allocated fixed costs (not avoidable)\n\n**Qualitative factors:**\n• Control over quality\n• Confidentiality/IP protection\n• Supplier reliability\n• Strategic importance",
        },
        {
          title: 'Make vs. Buy Example',
          type: 'table',
          headers: ['Cost Category', 'Make', 'Buy'],
          rows: [
            ['Direct materials', '$6', '—'],
            ['Direct labor', '$4', '—'],
            ['Variable overhead', '$2', '—'],
            ['Avoidable fixed OH', '$3', '—'],
            ['Purchase price', '—', '$14'],
            ['Inspection costs', '—', '$1'],
            ['Total relevant cost', '$15', '$15'],
          ],
        },
        {
          title: 'Supplier Selection and Management',
          type: 'text',
          content: "**Vendor evaluation criteria:**\n• Quality (defect rates, certifications)\n• Delivery (on-time %, lead time)\n• Price and payment terms\n• Capacity and flexibility\n• Financial stability\n• Innovation capability\n• Sustainability/ethical practices\n\n**Supplier relationship spectrum:**\n• Arms-length (multiple sources, price focus)\n• Preferred supplier (fewer, longer-term)\n• Strategic partner (integrated, shared planning)\n• Vertical integration (ownership)",
        },
        {
          title: '⚠️ Exam Trap: Outsourcing Risks',
          type: 'warning',
          content: "**Don't outsource purely for cost savings!**\n\n**Hidden risks:**\n• Loss of core competency\n• Quality control challenges\n• Supply disruption (single source)\n• Intellectual property exposure\n• Hidden costs (coordination, travel)\n• Currency and political risk (offshore)\n\n**Strategic items should usually stay in-house!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Supply chain: upstream (suppliers) → operations → downstream (customers)",
            "TCO = Acquisition + Possession + Usage costs",
            "Lowest price doesn't mean lowest TCO",
            "Make vs. Buy: Use only relevant (avoidable) costs",
            "Exclude allocated fixed costs from make/buy analysis",
            "Consider qualitative factors in sourcing decisions",
            "Outsourcing has hidden costs and strategic risks",
          ],
        },
      ],
    },
  },
];

// Helper functions
export const getCMA1DLessons = () => cma1DLessons;
export const getCMA1DLessonById = (id: string) => cma1DLessons.find(lesson => lesson.id === id);
export const getCMA1DLessonCount = () => cma1DLessons.length;

export default cma1DLessons;
