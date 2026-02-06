/**
 * CMA Part 1, Section C: Performance Management
 * Weight: 20% of Part 1 Exam
 * 
 * Topics covered:
 * - Cost and variance measures
 * - Responsibility centers and reporting
 * - Performance measures
 * - Balanced scorecard
 * 
 * Based on IMA CMA Content Specification Outline 2025-2026
 */

import { Lesson } from '../../../types';

export const cma1CLessons: Lesson[] = [
  // ============================================================================
  // CMA1-C: PERFORMANCE MANAGEMENT (Lessons 1-10)
  // ============================================================================
  
  {
    id: 'CMA1-C-001',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Variance Analysis Framework',
    description: 'Understand the purpose and structure of variance analysis for performance evaluation',
    order: 19,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Variance analysis', 'Favorable vs unfavorable', 'Management by exception'],
    blueprintArea: 'CMA1-C',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Variance analysis is THE core CMA skill! It tells you what went wrong (or right) and why. Without it, you're just reporting numbers. With it, you're providing insights that drive improvement. Master this section - it's heavily tested!",
        },
        {
          title: 'What is Variance Analysis?',
          type: 'text',
          content: "**Definition:**\nThe process of comparing actual results to budgeted/standard amounts and analyzing differences.\n\n**Purpose:**\n• Identify where performance differs from expectations\n• Understand WHY differences occurred\n• Take corrective action\n• Improve future planning\n\n**Management by Exception:**\nFocus attention on significant variances - don't waste time on immaterial differences.",
        },
        {
          title: 'Favorable vs. Unfavorable',
          type: 'text',
          content: "**Favorable (F):** Actual results are BETTER than budget\n• Revenue higher than budgeted\n• Cost lower than budgeted\n• Increases profit\n\n**Unfavorable (U):** Actual results are WORSE than budget\n• Revenue lower than budgeted\n• Cost higher than budgeted\n• Decreases profit\n\n**Warning:** \"Favorable\" doesn't always mean \"good\" - it just means positive impact on profit. Skipping quality inspections might reduce costs (favorable) but create future problems!",
        },
        {
          title: '🧠 Memory Aid: F vs. U',
          type: 'callout',
          content: "**\"PLI\"** - Profit Line Impact:\n\n**Think about impact on the profit line:**\n• Revenue variance: Actual > Budget = **Favorable**\n• Cost variance: Actual < Budget = **Favorable**\n\n**Quick test:** Would this variance make profit go UP or DOWN?\n• UP = Favorable\n• DOWN = Unfavorable",
        },
        {
          title: 'The Variance Analysis Hierarchy',
          type: 'text',
          content: "**Level 1: Total Variance**\nActual profit vs. Budget profit\n\n**Level 2: Revenue and Cost Variances**\nSales variances + Cost variances = Total variance\n\n**Level 3: Component Variances**\n• Sales: Price variance + Volume variance\n• DM: Price variance + Usage variance\n• DL: Rate variance + Efficiency variance\n• OH: Spending + Efficiency + Volume variances\n\n**Drill down from total to identify root causes!**",
        },
        {
          title: 'Variance Significance',
          type: 'table',
          headers: ['Approach', 'When to Investigate', 'Example'],
          rows: [
            ['Dollar threshold', 'Variance > $10,000', 'Material cost variance $15,000 - investigate'],
            ['Percentage', 'Variance > 5% of budget', '8% over budget - investigate'],
            ['Statistical', 'Outside control limits', 'More than 2 standard deviations'],
            ['Pattern', 'Recurring variances', 'Same issue 3 months in a row'],
          ],
        },
        {
          title: 'Controllable vs. Non-Controllable',
          type: 'text',
          content: "**Controllable Variances:**\n• Manager can influence the outcome\n• Hold manager accountable\n• Example: Labor efficiency (supervisor controls scheduling)\n\n**Non-Controllable Variances:**\n• Outside manager's influence\n• Don't hold manager accountable\n• Example: Material price change (purchasing decided)\n\n**Key Principle:** Evaluate managers only on factors they control!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Variance = Actual - Budget (or Standard)",
            "Favorable increases profit; Unfavorable decreases profit",
            "Cost variances: Lower actual = Favorable",
            "Use management by exception - investigate significant variances",
            "Drill down from total to component variances",
            "Evaluate managers only on controllable variances",
            "Set investigation thresholds (dollar, percentage, or statistical)",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-C-002',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Direct Materials Variances',
    description: 'Calculate and interpret materials price and usage variances',
    order: 20,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Materials price variance', 'Materials usage variance', 'Standard costs'],
    blueprintArea: 'CMA1-C',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Materials are often the largest manufacturing cost. Price variances tell you about purchasing effectiveness. Usage variances tell you about production efficiency. CMAs use these to drive cost reduction and hold the right people accountable.",
        },
        {
          title: 'The Two Materials Variances',
          type: 'text',
          content: "**Total Materials Variance:**\n(Actual Quantity × Actual Price) - (Standard Quantity × Standard Price)\n\n**Broken into two components:**\n\n**Materials Price Variance (MPV):**\nActual Quantity × (Actual Price - Standard Price)\n\n**Materials Usage Variance (MUV):**\nStandard Price × (Actual Quantity - Standard Quantity*)\n\n*Standard Quantity = Standard qty per unit × Actual units produced",
        },
        {
          title: '🧠 Memory Aid: Variance Formulas',
          type: 'callout',
          content: "**\"PUQ\"** - Price Uses actual Quantity:\n\n**Price Variance:** AQ × (AP - SP)\n• Calculated at ACTUAL quantity\n• Isolates the price effect\n\n**Quantity/Usage Variance:** SP × (AQ - SQ)\n• Calculated at STANDARD price\n• Isolates the usage effect\n\n**This pattern works for DM, DL, and Variable OH!**",
        },
        {
          title: 'Materials Variance Example',
          type: 'text',
          content: "**Given:**\n• Standard: 2 lbs per unit @ $5/lb\n• Actual production: 1,000 units\n• Actual materials: 2,100 lbs @ $4.80/lb\n\n**Standard Quantity Allowed:**\n1,000 units × 2 lbs = 2,000 lbs\n\n**Materials Price Variance:**\n2,100 lbs × ($4.80 - $5.00) = 2,100 × (-$0.20) = **$420 Favorable**\n\n**Materials Usage Variance:**\n$5.00 × (2,100 - 2,000) = $5.00 × 100 = **$500 Unfavorable**\n\n**Total:** $420 F + $500 U = **$80 Unfavorable**",
        },
        {
          title: 'Three-Column Diagram',
          type: 'table',
          headers: ['Actual (AQ × AP)', 'Actual Qty at Std Price (AQ × SP)', 'Flexible Budget (SQ × SP)'],
          rows: [
            ['2,100 × $4.80', '2,100 × $5.00', '2,000 × $5.00'],
            ['= $10,080', '= $10,500', '= $10,000'],
            ['←— MPV $420 F —→', '←— MUV $500 U —→', ''],
          ],
        },
        {
          title: 'Causes of Materials Variances',
          type: 'table',
          headers: ['Variance', 'Possible Causes'],
          rows: [
            ['Price - Favorable', 'Quantity discounts, lower market prices, alternate suppliers, lower quality materials'],
            ['Price - Unfavorable', 'Rush orders, commodity price increases, supplier issues, higher quality materials'],
            ['Usage - Favorable', 'Better quality materials, skilled workers, improved processes, lower scrap rates'],
            ['Usage - Unfavorable', 'Poor quality materials, untrained workers, machine problems, excessive waste'],
          ],
        },
        {
          title: '⚠️ Exam Trap: When to Calculate MPV',
          type: 'warning',
          content: "**Price variance can be calculated at two points:**\n\n**At Purchase:**\nMPV = Quantity Purchased × (AP - SP)\n• Isolates purchasing responsibility immediately\n• May differ from quantity used\n\n**At Use:**\nMPV = Quantity Used × (AP - SP)\n• Matches with production reporting\n• More common in exam problems\n\n**Read carefully whether problem says \"purchased\" or \"used\"!**",
        },
        {
          title: 'Responsibility Assignment',
          type: 'text',
          content: "**Materials Price Variance:**\n• Purchasing department typically responsible\n• But consider reasons outside their control:\n  - Rush orders requested by production\n  - Market price changes\n  - Specified vendor requirements\n\n**Materials Usage Variance:**\n• Production department typically responsible\n• But consider reasons outside their control:\n  - Low-quality materials (purchasing fault)\n  - Machine breakdowns (maintenance fault)\n  - Design flaws (engineering fault)",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "MPV = AQ × (AP - SP) measures price efficiency",
            "MUV = SP × (AQ - SQ) measures usage efficiency",
            "Standard Quantity = Std per unit × Actual units produced",
            "Price variance: purchasing accountability",
            "Usage variance: production accountability",
            "Favorable price + Unfavorable usage may indicate quality issue",
            "Watch for purchase vs. use timing in exam problems",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-C-003',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Direct Labor Variances',
    description: 'Calculate and interpret labor rate and efficiency variances',
    order: 21,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Labor rate variance', 'Labor efficiency variance', 'Labor standards'],
    blueprintArea: 'CMA1-C',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Labor is often the most controllable manufacturing cost. Rate variances reveal hiring and scheduling decisions. Efficiency variances show production productivity. CMAs use these to identify training needs and improve labor planning.",
        },
        {
          title: 'The Two Labor Variances',
          type: 'text',
          content: "**Total Labor Variance:**\n(Actual Hours × Actual Rate) - (Standard Hours × Standard Rate)\n\n**Labor Rate Variance (LRV):**\nActual Hours × (Actual Rate - Standard Rate)\n\n**Labor Efficiency Variance (LEV):**\nStandard Rate × (Actual Hours - Standard Hours*)\n\n*Standard Hours = Standard hours per unit × Actual units produced\n\n**Same pattern as materials!** Just substitute:\n• Hours for Quantity\n• Rate for Price",
        },
        {
          title: 'Labor Variance Example',
          type: 'text',
          content: "**Given:**\n• Standard: 0.5 hours per unit @ $20/hour\n• Actual production: 1,000 units\n• Actual labor: 480 hours @ $21/hour\n\n**Standard Hours Allowed:**\n1,000 units × 0.5 hours = 500 hours\n\n**Labor Rate Variance:**\n480 hours × ($21 - $20) = 480 × $1 = **$480 Unfavorable**\n\n**Labor Efficiency Variance:**\n$20 × (480 - 500) = $20 × (-20) = **$400 Favorable**\n\n**Total:** $480 U + $400 F = **$80 Unfavorable**",
        },
        {
          title: '🧠 Memory Aid: Labor = Materials Pattern',
          type: 'callout',
          content: "**Use the SAME formula structure:**\n\n**Rate (Price) Variance:** AH × (AR - SR)\n**Efficiency (Usage) Variance:** SR × (AH - SH)\n\n**\"RARE\":**\n**R**ate uses **A**ctual hours\n**E**fficiency uses standard **R**at**E**\n\nThis works for EVERY input variance!",
        },
        {
          title: 'Causes of Labor Variances',
          type: 'table',
          headers: ['Variance', 'Possible Causes'],
          rows: [
            ['Rate - Favorable', 'Using lower-skilled workers, temporary workers, wage decreases'],
            ['Rate - Unfavorable', 'Overtime premium, using higher-skilled workers, union wage increases'],
            ['Efficiency - Favorable', 'Well-trained workers, improved processes, good supervision, good materials'],
            ['Efficiency - Unfavorable', 'Inexperienced workers, equipment problems, poor materials, inadequate supervision'],
          ],
        },
        {
          title: 'Labor Mix and Yield Variances',
          type: 'text',
          content: "**When multiple labor types are used:**\n\n**Labor Mix Variance:**\nDifference due to changing proportions of labor types\n(Actual Mix - Standard Mix) × Standard Rate × Total Actual Hours\n\n**Labor Yield Variance:**\nDifference due to total productivity\n(Actual Hours - Standard Hours) × Weighted Average Standard Rate\n\n**Example:**\nIf you substitute skilled workers ($25/hr) for unskilled ($15/hr), you'll have:\n• Unfavorable mix variance (more expensive workers)\n• Possibly favorable yield variance (more productive)",
        },
        {
          title: '⚠️ Exam Trap: Idle Time',
          type: 'warning',
          content: "**Idle time creates an UNFAVORABLE efficiency variance!**\n\nIf workers are paid for 500 hours but only work productively for 480 hours:\n• 20 hours of idle time\n• Still included in \"Actual Hours\" for efficiency variance\n\n**Some companies report idle time separately:**\nIdle Time Variance = Idle Hours × Standard Rate\n\nThis helps identify machine breakdowns, material shortages, etc.",
        },
        {
          title: 'Responsibility Assignment',
          type: 'text',
          content: "**Labor Rate Variance:**\n• HR/Hiring managers (base wage decisions)\n• Production supervisors (overtime decisions)\n• Union contracts (may be non-controllable)\n\n**Labor Efficiency Variance:**\n• Production supervisors (scheduling, training)\n• But consider external factors:\n  - Poor quality materials slow production\n  - Equipment breakdowns\n  - Unrealistic standards\n  - Learning curve on new products",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "LRV = AH × (AR - SR) measures wage rate efficiency",
            "LEV = SR × (AH - SH) measures labor productivity",
            "Standard Hours = Std per unit × Actual units produced",
            "Same formula pattern as materials variances",
            "Favorable rate + Unfavorable efficiency may indicate skill mismatch",
            "Idle time is included in efficiency variance (monitor separately)",
            "Overtime premium creates unfavorable rate variance",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-C-004',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Overhead Variances',
    description: 'Calculate variable and fixed overhead variances using two, three, and four-way analysis',
    order: 22,
    duration: 60,
    difficulty: 'advanced',
    topics: ['Variable overhead variances', 'Fixed overhead variances', 'Volume variance'],
    blueprintArea: 'CMA1-C',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Overhead is the most complex area of variance analysis! Variable overhead behaves like DM/DL. Fixed overhead has unique variances including the production volume variance that measures capacity utilization. Master this for exam success!",
        },
        {
          title: 'Variable Overhead Variances',
          type: 'text',
          content: "**Same pattern as DM and DL:**\n\n**Variable OH Spending Variance:**\nActual Hours × (Actual VOH Rate - Standard VOH Rate)\nOR: Actual VOH - (AH × Standard VOH Rate)\n\n**Variable OH Efficiency Variance:**\nStandard VOH Rate × (Actual Hours - Standard Hours)\n\n**Note:** Variable OH efficiency variance is driven by the same efficiency as labor - if workers are slow, they use more hours and more variable overhead!",
        },
        {
          title: 'Fixed Overhead Variances',
          type: 'text',
          content: "**Fixed OH Budget Variance:**\nActual Fixed OH - Budgeted Fixed OH\n\n**Fixed OH Volume Variance:**\nBudgeted Fixed OH - Applied Fixed OH\nOR: (Budgeted Hours - Standard Hours Allowed) × Fixed OH Rate\n\n**The Volume Variance is unique:**\n• Measures capacity utilization\n• Favorable if actual production > planned\n• Unfavorable if actual production < planned\n• NOT a measure of spending control!",
        },
        {
          title: '🧠 Memory Aid: Fixed OH Volume Variance',
          type: 'callout',
          content: "**\"Spreading the Peanut Butter\"**\n\nFixed costs are like peanut butter - you have a fixed amount to spread.\n\n• More slices (production) = **thinner spread = Favorable** (absorbed more fixed cost per unit)\n• Fewer slices = **thicker spread = Unfavorable** (absorbed less, leftover unabsorbed)\n\n**Unfavorable volume variance = Wasted capacity**",
        },
        {
          title: 'Overhead Variance Example',
          type: 'text',
          content: "**Given:**\n• Budgeted production: 10,000 units\n• Standard: 0.5 DLH per unit\n• VOH rate: $6/DLH, FOH rate: $10/DLH\n• Budgeted FOH: $50,000\n• Actual: 9,500 units, 4,900 DLH\n• Actual VOH: $30,000, Actual FOH: $51,000\n\n**Standard Hours Allowed:** 9,500 × 0.5 = 4,750 hours\n\n**VOH Spending:** $30,000 - (4,900 × $6) = $30,000 - $29,400 = **$600 U**\n**VOH Efficiency:** $6 × (4,900 - 4,750) = $6 × 150 = **$900 U**\n\n**FOH Budget:** $51,000 - $50,000 = **$1,000 U**\n**FOH Volume:** $50,000 - (4,750 × $10) = $50,000 - $47,500 = **$2,500 U**",
        },
        {
          title: 'Two, Three, and Four-Way Analysis',
          type: 'table',
          headers: ['Analysis', 'Variances Reported', 'Total'],
          rows: [
            ['Two-way', 'Controllable + Volume', 'VOH Spending + VOH Efficiency + FOH Budget = Controllable'],
            ['Three-way', 'Spending + Efficiency + Volume', 'Combines all spending into one'],
            ['Four-way', 'VOH Spending + VOH Efficiency + FOH Budget + FOH Volume', 'Most detailed breakdown'],
          ],
        },
        {
          title: 'Total Overhead Variance Summary',
          type: 'text',
          content: "**Four-Way Analysis:**\n```\n  Variable OH Spending Variance     $600 U\n+ Variable OH Efficiency Variance   $900 U\n+ Fixed OH Budget Variance        $1,000 U\n+ Fixed OH Volume Variance        $2,500 U\n= Total Overhead Variance         $5,000 U\n```\n\n**Check:** Actual OH - Applied OH = Total Variance\n($30,000 + $51,000) - (4,750 × $16) = $81,000 - $76,000 = $5,000 U ✓",
        },
        {
          title: '⚠️ Exam Trap: Capacity vs. Actual',
          type: 'warning',
          content: "**Watch what the \"budgeted hours\" mean:**\n\n• **Normal (Practical) Capacity:** Long-run average expected\n  - Used for product costing\n  - FOH rate based on this\n\n• **Budgeted Capacity:** Planned for this period\n  - May differ from normal capacity\n  - Can have different variance calculations\n\n**Most exam problems use normal capacity for the FOH rate!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Variable OH variances follow same pattern as DM and DL",
            "VOH Efficiency tied to labor efficiency (same driver)",
            "FOH Budget Variance = Actual FOH - Budgeted FOH (spending control)",
            "FOH Volume Variance = Budgeted FOH - Applied FOH (capacity utilization)",
            "Volume variance: Favorable if produced more than budgeted",
            "Four-way analysis gives maximum detail",
            "Total OH Variance = Actual OH - Applied OH (check your work!)",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-C-005',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Sales Variances',
    description: 'Analyze sales price, volume, mix, and quantity variances',
    order: 23,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Sales price variance', 'Sales volume variance', 'Sales mix variance', 'Sales quantity variance'],
    blueprintArea: 'CMA1-C',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Revenue drives everything! Sales variances help you understand why revenue differed from plan. Was it price? Volume? Product mix? CMAs must isolate these effects to advise on pricing strategy, sales compensation, and product portfolio decisions.",
        },
        {
          title: 'Basic Sales Variances',
          type: 'text',
          content: "**Sales Price Variance:**\nActual Units Sold × (Actual Price - Budgeted Price)\n\n**Sales Volume Variance:**\nBudgeted Price × (Actual Units - Budgeted Units)\nOR: Budgeted CM × (Actual Units - Budgeted Units)\n\n**Note:** Volume variance can be calculated using:\n• Revenue basis (price focus)\n• Contribution margin basis (profit focus) - preferred!",
        },
        {
          title: 'Sales Variance Example',
          type: 'text',
          content: "**Given:**\n• Budgeted: 10,000 units @ $50 = $500,000\n• Actual: 11,000 units @ $48 = $528,000\n• Budgeted CM per unit: $20\n\n**Sales Price Variance:**\n11,000 × ($48 - $50) = 11,000 × (-$2) = **$22,000 Unfavorable**\n\n**Sales Volume Variance (CM basis):**\n$20 × (11,000 - 10,000) = $20 × 1,000 = **$20,000 Favorable**\n\n**Net Revenue Variance:** $528,000 - $500,000 = $28,000 F\n(But CM impact is -$22,000 + $20,000 = -$2,000 because of price drop!)",
        },
        {
          title: '🧠 Memory Aid: Sales Variance Pattern',
          type: 'callout',
          content: "**Same \"PUQ\" pattern as costs - but REVERSED signs!**\n\n**Price Variance:** AQ × (AP - BP)\n• Higher price = FAVORABLE for revenue\n\n**Quantity Variance:** BP (or CM) × (AQ - BQ)\n• More units = FAVORABLE for revenue\n\n**Remember:** Revenue variances are friendly - higher actual = Favorable!",
        },
        {
          title: 'Sales Mix and Quantity Variances',
          type: 'text',
          content: "**When selling multiple products:**\n\n**Sales Mix Variance:**\n(Actual Mix % - Budgeted Mix %) × Actual Total Units × Budgeted CM per unit\n\n**Sales Quantity Variance:**\nBudgeted Mix % × (Actual Total Units - Budgeted Total Units) × Budgeted CM per unit\n\n**Volume = Mix + Quantity**\n\nMix variance: Did we sell the RIGHT products?\nQuantity variance: Did we sell ENOUGH products overall?",
        },
        {
          title: 'Multi-Product Example',
          type: 'table',
          headers: ['Product', 'Budget Units', 'Budget Mix', 'Actual Units', 'Actual Mix', 'CM/unit'],
          rows: [
            ['Product A', '6,000', '60%', '5,500', '50%', '$30'],
            ['Product B', '4,000', '40%', '5,500', '50%', '$15'],
            ['Total', '10,000', '100%', '11,000', '100%', ''],
          ],
        },
        {
          title: 'Mix Variance Calculation',
          type: 'text',
          content: "**Product A:**\n(50% - 60%) × 11,000 × $30 = -10% × 11,000 × $30 = **($33,000) U**\n\n**Product B:**\n(50% - 40%) × 11,000 × $15 = +10% × 11,000 × $15 = **$16,500 F**\n\n**Total Mix Variance:** ($33,000) + $16,500 = **($16,500) Unfavorable**\n\n*Interpretation:* Shift toward lower-margin Product B hurt profitability.",
        },
        {
          title: '⚠️ Exam Trap: Market Share vs. Market Size',
          type: 'warning',
          content: "**Advanced breakdown of Sales Quantity Variance:**\n\n**Market Size Variance:**\nHow much of quantity change due to market growing/shrinking?\n\n**Market Share Variance:**\nHow much due to gaining/losing share?\n\n**Formula:**\n• Market Size = Budgeted Share × (Actual Market - Budget Market) × Budget CM\n• Market Share = Actual Market × (Actual Share - Budget Share) × Budget CM\n\n**Share variance is controllable; Size variance often isn't!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Sales Price Variance = AQ × (AP - BP) - higher price is favorable",
            "Sales Volume Variance = BPrice/CM × (AQ - BQ) - more units is favorable",
            "Use CM for volume variance to measure profit impact",
            "Mix Variance: Did product mix shift favorably?",
            "Quantity Variance: Did total volume increase?",
            "Volume = Mix + Quantity when detailed breakdown needed",
            "Market Share vs. Size helps separate controllable from external factors",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-C-006',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Responsibility Centers',
    description: 'Understand cost, revenue, profit, and investment centers',
    order: 24,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Cost centers', 'Revenue centers', 'Profit centers', 'Investment centers'],
    blueprintArea: 'CMA1-C',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Responsibility accounting matches authority with accountability. CMAs design reporting systems that hold managers responsible only for what they control. This is fundamental to performance evaluation and motivation.",
        },
        {
          title: 'Types of Responsibility Centers',
          type: 'table',
          headers: ['Type', 'Manager Controls', 'Evaluated On', 'Example'],
          rows: [
            ['Cost Center', 'Costs only', 'Cost efficiency, variances', 'Manufacturing department'],
            ['Revenue Center', 'Revenue only', 'Sales volume, revenue', 'Sales region'],
            ['Profit Center', 'Revenue AND costs', 'Profit margin', 'Product line, division'],
            ['Investment Center', 'Revenue, costs, AND assets', 'ROI, Residual Income', 'Autonomous business unit'],
          ],
        },
        {
          title: 'Cost Centers',
          type: 'text',
          content: "**Definition:**\nOrganizational unit where manager controls COSTS but not revenues or investment.\n\n**Evaluation Metrics:**\n• Cost variances (vs. standard or budget)\n• Cost per unit\n• Efficiency ratios\n\n**Example:**\nFactory production department\n• Evaluated on: materials, labor, and overhead variances\n• NOT evaluated on: sales revenue or capital investment\n\n**Key:** Provide resources needed; don't starve cost centers then blame them for quality issues!",
        },
        {
          title: 'Revenue Centers',
          type: 'text',
          content: "**Definition:**\nOrganizational unit where manager controls REVENUES but not the costs of products sold.\n\n**Evaluation Metrics:**\n• Sales volume (units or dollars)\n• Sales price variance\n• Market share\n• Customer acquisition\n\n**Example:**\nRegional sales office\n• Evaluated on: sales targets, price maintenance\n• NOT evaluated on: product costs, gross profit\n\n**Limitation:** May ignore profitability - could push unprofitable sales!",
        },
        {
          title: 'Profit Centers',
          type: 'text',
          content: "**Definition:**\nOrganizational unit where manager controls BOTH revenues AND costs.\n\n**Evaluation Metrics:**\n• Gross profit\n• Contribution margin\n• Operating profit\n• Profit margin percentage\n\n**Example:**\nProduct line manager\n• Controls pricing and promotional decisions\n• Controls some operating costs\n• NOT responsible for allocated corporate overhead\n\n**Key issue:** Which costs are \"controllable\" vs. allocated?",
        },
        {
          title: 'Investment Centers',
          type: 'text',
          content: "**Definition:**\nProfit center where manager ALSO controls the investment in assets.\n\n**Evaluation Metrics:**\n• Return on Investment (ROI)\n• Residual Income (RI)\n• Economic Value Added (EVA)\n\n**Example:**\nDivision of large corporation\n• Full P&L responsibility\n• Controls capital expenditure decisions\n• May control working capital\n\n**Most comprehensive responsibility level - treated like a mini-company!**",
        },
        {
          title: '🧠 Memory Aid: CRPI Hierarchy',
          type: 'callout',
          content: "**\"CRPI\"** - Control increases down the list:\n\n**C**ost Center - Costs only\n**R**evenue Center - Revenue only  \n**P**rofit Center - Revenue AND Costs\n**I**nvestment Center - Revenue, Costs, AND Assets\n\n**Think of expanding circles of control!**",
        },
        {
          title: 'Controllability Principle',
          type: 'text',
          content: "**Core Principle:**\nManagers should be evaluated only on items they can control.\n\n**Practical Challenges:**\n• Pure controllability is rare (interdependencies exist)\n• Some costs are \"influenced\" rather than controlled\n• Time horizon matters (short vs. long-term control)\n\n**Solutions:**\n• Distinguish controllable from non-controllable in reports\n• Evaluate on \"influence\" when control is shared\n• Use separate metrics for performance vs. economic evaluation",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Cost center: controls costs, evaluated on cost efficiency",
            "Revenue center: controls revenue, evaluated on sales performance",
            "Profit center: controls revenue AND costs, evaluated on profit",
            "Investment center: controls revenue, costs, AND assets (full autonomy)",
            "Match evaluation metrics to level of control",
            "Controllability principle: evaluate only on what manager controls",
            "Consider influence where pure control doesn't exist",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-C-007',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Return on Investment (ROI)',
    description: 'Calculate and interpret ROI for investment center performance evaluation',
    order: 25,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['ROI', 'DuPont analysis', 'Asset turnover', 'Profit margin'],
    blueprintArea: 'CMA1-C',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "ROI is THE classic measure for investment centers! It tells you how efficiently a division uses its assets. CMAs must calculate ROI, decompose it using DuPont analysis, and understand its limitations for driving suboptimal behavior.",
        },
        {
          title: 'ROI Formula',
          type: 'text',
          content: "**Basic Formula:**\nROI = Operating Income / Average Operating Assets\n\n**Or expressed as percentage:**\nROI = (Operating Income / Average Operating Assets) × 100\n\n**Operating Assets include:**\n• Cash (operating portion)\n• Receivables\n• Inventory\n• Fixed assets (net of depreciation)\n\n**Exclude:** Investments in other divisions, idle assets",
        },
        {
          title: 'DuPont Analysis',
          type: 'text',
          content: "**ROI is the product of two components:**\n\nROI = Profit Margin × Asset Turnover\n\n**Where:**\n• Profit Margin = Operating Income / Sales\n• Asset Turnover = Sales / Average Operating Assets\n\n**The math:**\n(Income/Sales) × (Sales/Assets) = Income/Assets ✓\n\n**This decomposition shows TWO paths to improve ROI:**\n1. Improve profitability (higher margin)\n2. Improve efficiency (more sales per dollar of assets)",
        },
        {
          title: '🧠 Memory Aid: DuPont ROI',
          type: 'callout',
          content: "**\"PM × AT = ROI\"**\n\n**P**rofit **M**argin × **A**sset **T**urnover = **ROI**\n\n**Two ways to boost ROI:**\n• Make MORE per sale (increase margin)\n• Make FASTER sales (increase turnover)\n\n**Example companies:**\n• High margin, low turnover: Luxury goods (Rolex)\n• Low margin, high turnover: Discount retail (Walmart)",
        },
        {
          title: 'ROI Calculation Example',
          type: 'text',
          content: "**Division Data:**\n• Sales: $5,000,000\n• Operating Income: $600,000\n• Beginning Assets: $2,800,000\n• Ending Assets: $3,200,000\n\n**Calculations:**\nAverage Assets = ($2,800,000 + $3,200,000) / 2 = $3,000,000\n\nProfit Margin = $600,000 / $5,000,000 = 12%\n\nAsset Turnover = $5,000,000 / $3,000,000 = 1.67×\n\n**ROI = 12% × 1.67 = 20%**\n\nOr directly: $600,000 / $3,000,000 = 20%",
        },
        {
          title: 'Improving ROI',
          type: 'table',
          headers: ['Strategy', 'Effect', 'Example'],
          rows: [
            ['Increase sales (same assets)', 'Higher turnover', 'Better marketing, longer hours'],
            ['Reduce costs', 'Higher margin', 'Process improvement, automation'],
            ['Reduce assets', 'Higher turnover', 'Better inventory mgmt, collect AR faster'],
            ['Increase prices', 'Higher margin', 'If demand is inelastic'],
            ['Invest in higher-return assets', 'Higher margin/turnover', 'Replace old equipment'],
          ],
        },
        {
          title: '⚠️ Exam Trap: ROI Suboptimization',
          type: 'warning',
          content: "**The MAJOR flaw of ROI:**\n\nManagers may REJECT profitable investments if they would lower division ROI!\n\n**Example:**\nDivision ROI: 25%\nNew project ROI: 18%\nCompany's cost of capital: 12%\n\n**Manager's view:** \"18% brings down my 25%\" → Reject\n**Company's view:** \"18% > 12% cost of capital\" → Accept!\n\n**Solution:** Use Residual Income instead of ROI!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "ROI = Operating Income / Average Operating Assets",
            "DuPont: ROI = Profit Margin × Asset Turnover",
            "Two paths to improve: increase margin OR increase turnover",
            "Use average assets for the denominator",
            "ROI can cause suboptimal decisions (reject good projects)",
            "High ROI divisions may reject investments above cost of capital",
            "Consider Residual Income as alternative metric",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-C-008',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Residual Income and EVA',
    description: 'Calculate residual income and economic value added for performance evaluation',
    order: 26,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Residual income', 'EVA', 'Capital charge', 'WACC'],
    blueprintArea: 'CMA1-C',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Residual Income and EVA solve the ROI suboptimization problem! They measure value creation above the cost of capital. CMAs use these to align manager incentives with shareholder value creation.",
        },
        {
          title: 'Residual Income (RI)',
          type: 'text',
          content: "**Formula:**\nResidual Income = Operating Income - (Required Return × Operating Assets)\n\nOR:\nRI = Operating Income - Capital Charge\n\n**Where:**\nCapital Charge = Required Rate of Return × Invested Capital\n\n**Interpretation:**\n• RI > 0: Division creates value above required return\n• RI = 0: Division earns exactly required return\n• RI < 0: Division destroys value",
        },
        {
          title: 'RI vs. ROI Example',
          type: 'text',
          content: "**Division A:**\n• Operating Income: $300,000\n• Operating Assets: $2,000,000\n• Required Return: 12%\n\n**ROI:** $300,000 / $2,000,000 = 15%\n**RI:** $300,000 - (12% × $2,000,000) = $300,000 - $240,000 = **$60,000**\n\n**New Investment Opportunity:**\n• Additional investment: $500,000\n• Additional income: $75,000\n• Project ROI: $75,000 / $500,000 = 15%\n\n**Manager using ROI:** Accept (maintains 15%)\n**Manager using RI:** Accept (adds $75,000 - $60,000 = $15,000 to RI)\n\n**Both accept this time...but what if project ROI was 13%?**",
        },
        {
          title: '🧠 Memory Aid: ROI vs. RI Decision',
          type: 'callout',
          content: "**The 13% Project Test:**\n\nDivision ROI: 15%, Required Return: 12%, Project ROI: 13%\n\n**ROI Manager:** \"13% < my 15% → REJECT!\"\n**RI Manager:** \"13% > 12% cost → ACCEPT!\"\n\n**RI aligns with shareholder interests:**\nAny project above the cost of capital creates value!\n\n**RI eliminates the suboptimization problem.**",
        },
        {
          title: 'Economic Value Added (EVA)',
          type: 'text',
          content: "**EVA = NOPAT - (WACC × Invested Capital)**\n\n**Where:**\n• NOPAT = Net Operating Profit After Tax\n• WACC = Weighted Average Cost of Capital\n• Invested Capital = Total assets - Non-interest-bearing current liabilities\n\n**EVA refinements over basic RI:**\n• Uses after-tax operating income\n• Uses WACC instead of arbitrary required return\n• Adjusts for accounting distortions (R&D, goodwill, etc.)\n\n**Trademark of Stern Stewart & Co.**",
        },
        {
          title: 'EVA Calculation Example',
          type: 'text',
          content: "**Given:**\n• EBIT: $1,500,000\n• Tax rate: 25%\n• Total assets: $8,000,000\n• Current liabilities (non-interest): $1,200,000\n• WACC: 10%\n\n**NOPAT:** $1,500,000 × (1 - 0.25) = $1,125,000\n\n**Invested Capital:** $8,000,000 - $1,200,000 = $6,800,000\n\n**Capital Charge:** $6,800,000 × 10% = $680,000\n\n**EVA:** $1,125,000 - $680,000 = **$445,000**\n\n*The division created $445,000 of value above the cost of capital!*",
        },
        {
          title: 'Common EVA Adjustments',
          type: 'table',
          headers: ['Item', 'Accounting Treatment', 'EVA Adjustment'],
          rows: [
            ['R&D', 'Expensed', 'Capitalize and amortize'],
            ['Operating leases', 'Off-balance sheet (old GAAP)', 'Capitalize as debt/asset'],
            ['Goodwill amortization', 'Reduces income', 'Add back (or use cash)'],
            ['LIFO reserve', 'Understates inventory', 'Add to invested capital'],
            ['Deferred taxes', 'Liability', 'May exclude from capital'],
          ],
        },
        {
          title: 'Advantages and Disadvantages',
          type: 'text',
          content: "**Advantages of RI/EVA:**\n• Promotes goal congruence\n• Accepts all projects above cost of capital\n• Measures value creation in dollars\n• Links to shareholder value\n\n**Disadvantages of RI/EVA:**\n• Absolute measure - hard to compare different-sized divisions\n• Determining cost of capital can be subjective\n• Many adjustments needed for \"pure\" EVA\n• Short-term focus can remain",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "RI = Operating Income - (Required Return × Assets)",
            "RI solves ROI suboptimization - accepts any project above hurdle rate",
            "EVA = NOPAT - (WACC × Invested Capital)",
            "EVA is RI with after-tax income and WACC",
            "Positive RI/EVA = value creation; Negative = value destruction",
            "RI is an absolute measure; compare carefully across sizes",
            "EVA often requires accounting adjustments for accuracy",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-C-009',
    courseId: 'cma',
    section: 'CMA1',
    title: 'The Balanced Scorecard',
    description: 'Design and implement a balanced scorecard for strategic performance management',
    order: 27,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Four perspectives', 'Strategy map', 'Leading and lagging indicators', 'Cause and effect'],
    blueprintArea: 'CMA1-C',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Financial measures alone can't tell the whole story! The Balanced Scorecard adds customer, process, and learning perspectives to create a comprehensive view of performance. CMAs design and maintain scorecards that link strategy to operations.",
        },
        {
          title: 'The Four Perspectives',
          type: 'text',
          content: "**1. Financial Perspective:**\n• \"How do we look to shareholders?\"\n• Revenue growth, profitability, ROI, EVA\n\n**2. Customer Perspective:**\n• \"How do customers see us?\"\n• Satisfaction, retention, market share, acquisition\n\n**3. Internal Business Process Perspective:**\n• \"What must we excel at?\"\n• Quality, cycle time, productivity, innovation\n\n**4. Learning and Growth Perspective:**\n• \"How can we continue to improve?\"\n• Employee skills, technology, culture, knowledge",
        },
        {
          title: '🧠 Memory Aid: BSC Perspectives',
          type: 'callout',
          content: "**\"FCIL\"** - From bottom to top:\n\n**L**earning & Growth (Foundation) →\n**I**nternal Processes (How we operate) →\n**C**ustomer (Who we serve) →\n**F**inancial (Results we achieve)\n\n**The logic:** Skilled employees → Better processes → Happy customers → Financial results",
        },
        {
          title: 'Strategy Maps',
          type: 'text',
          content: "**Visual representation of cause-and-effect relationships:**\n\n**Example chain:**\n```\nEmployee Training (L&G)\n       ↓\nFaster Order Processing (Internal)\n       ↓\nHigher Customer Satisfaction (Customer)\n       ↓\nIncreased Revenue (Financial)\n```\n\n**Strategy maps:**\n• Show how objectives link across perspectives\n• Communicate strategy visually\n• Identify gaps in strategic logic",
        },
        {
          title: 'Objectives, Measures, Targets, Initiatives',
          type: 'table',
          headers: ['Perspective', 'Objective', 'Measure', 'Target', 'Initiative'],
          rows: [
            ['Financial', 'Increase profitability', 'Operating margin', '15%', 'Cost reduction program'],
            ['Customer', 'Improve satisfaction', 'CSAT score', '90%', 'Service training'],
            ['Internal', 'Reduce defects', 'Defect rate', '<1%', 'Six Sigma project'],
            ['Learning', 'Develop skills', 'Training hours', '40 hrs/employee', 'Online learning platform'],
          ],
        },
        {
          title: 'Leading vs. Lagging Indicators',
          type: 'text',
          content: "**Lagging Indicators:**\n• Outcome measures - what happened\n• Financial results, customer satisfaction scores\n• Historical - after the fact\n• Example: Revenue, profit, customer complaints\n\n**Leading Indicators:**\n• Performance drivers - predict future outcomes\n• Process measures, activity measures\n• Forward-looking\n• Example: Training hours, on-time delivery, employee engagement\n\n**Balanced Scorecard uses BOTH** - leading indicators in L&G and Internal, lagging in Customer and Financial.",
        },
        {
          title: 'Implementation Challenges',
          type: 'text',
          content: "**Common pitfalls:**\n• Too many measures (keep to 15-25 total)\n• Measures not linked to strategy\n• No cause-and-effect validation\n• Lack of management commitment\n• Static - not updated as strategy evolves\n• Measures become ends rather than means\n\n**Success factors:**\n• Executive sponsorship\n• Clear strategy first\n• Employee understanding\n• Regular review and update\n• Link to compensation (carefully!)",
        },
        {
          title: '⚠️ Exam Trap: BSC is NOT Just Metrics',
          type: 'warning',
          content: "**The BSC is a STRATEGIC MANAGEMENT SYSTEM, not just a measurement system!**\n\n**Four management processes:**\n1. Translating the vision (clarify strategy)\n2. Communicating and linking (align organization)\n3. Business planning (set targets and initiatives)\n4. Feedback and learning (test and adapt strategy)\n\n**Exam questions may ask about BSC as a management tool, not just metrics!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Four perspectives: Financial, Customer, Internal Process, Learning & Growth",
            "Strategy maps show cause-and-effect across perspectives",
            "Each objective needs: measure, target, and initiative",
            "Leading indicators predict; lagging indicators confirm",
            "L&G drives Internal drives Customer drives Financial",
            "BSC is a strategic management system, not just a scorecard",
            "Limit to 15-25 measures linked to strategic objectives",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-C-010',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Transfer Pricing',
    description: 'Understand transfer pricing methods and their effects on performance evaluation',
    order: 28,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Market-based', 'Cost-based', 'Negotiated', 'Goal congruence'],
    blueprintArea: 'CMA1-C',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "When divisions trade with each other, the transfer price determines each division's profit! Wrong transfer prices cause suboptimal decisions - divisions may buy externally when internal production is cheaper. CMAs must design transfer pricing systems that align divisional and corporate interests.",
        },
        {
          title: 'Transfer Pricing Objectives',
          type: 'text',
          content: "**A good transfer price should:**\n\n1. **Goal Congruence:** Encourage decisions that benefit the whole company\n2. **Performance Evaluation:** Fairly measure each division's contribution\n3. **Autonomy:** Allow division managers to make independent decisions\n4. **Motivation:** Provide incentives for efficiency\n\n**The challenge:** These objectives often conflict!",
        },
        {
          title: 'Transfer Pricing Methods',
          type: 'table',
          headers: ['Method', 'Price Set At', 'Best When'],
          rows: [
            ['Market-based', 'External market price', 'Competitive external market exists'],
            ['Cost-based (Variable)', 'Variable cost of production', 'Excess capacity, no market'],
            ['Cost-based (Full)', 'Full cost (variable + fixed)', 'Simplicity desired'],
            ['Cost-plus', 'Cost + markup', 'Selling division needs profit margin'],
            ['Negotiated', 'Divisions negotiate', 'No clear market, divisions equal power'],
            ['Dual pricing', 'Different prices for each division', 'Can\'t satisfy both divisions otherwise'],
          ],
        },
        {
          title: 'Market-Based Transfer Prices',
          type: 'text',
          content: "**When to use:**\n• Competitive external market exists\n• Product is widely available\n• Buying division could purchase externally\n\n**Advantages:**\n• Most closely reflects arm's-length transaction\n• Objective and verifiable\n• Promotes efficiency (have to compete with market)\n\n**Disadvantages:**\n• Market may not exist for intermediate goods\n• Market prices fluctuate\n• May need adjustments for internal savings (no marketing, etc.)",
        },
        {
          title: 'Cost-Based Transfer Prices',
          type: 'text',
          content: "**Variable Cost:**\n• No profit for selling division\n• Encourages buying division to use internally (lowest cost)\n• Poor for performance evaluation\n\n**Full Cost:**\n• Includes allocated fixed costs\n• May cause buying division to seek external sources\n• Creates \"double marginalization\" problem\n\n**Cost Plus:**\n• Cost + markup for selling division profit\n• Common: Full cost + 10%\n• Can approximate market price\n• Which costs? Actual vs. Standard? (Use standard to encourage efficiency)",
        },
        {
          title: '🧠 Memory Aid: General Transfer Pricing Rule',
          type: 'callout',
          content: "**Minimum Transfer Price:**\n\nTP ≥ Variable Cost + Opportunity Cost\n\n**Where:**\n• Variable Cost = What it costs to produce\n• Opportunity Cost = Lost contribution from external sales\n\n**If excess capacity:** TP ≥ Variable Cost (no opportunity cost)\n**If full capacity:** TP ≥ Variable Cost + CM per unit on external sales",
        },
        {
          title: 'Transfer Pricing Example',
          type: 'text',
          content: "**Selling Division (makes components):**\n• Variable cost: $30/unit\n• Fixed cost: $10/unit\n• External selling price: $50/unit\n• Capacity: 10,000 units\n• External demand: 8,000 units\n\n**Buying Division needs:** 3,000 units\n\n**Minimum transfer price:**\n• For first 2,000 (excess capacity): $30 (no opportunity cost)\n• For next 1,000 (gives up external): $30 + ($50 - $30) = $50\n\n**General solution:** Negotiate between $30 and $50",
        },
        {
          title: '⚠️ Exam Trap: International Transfer Pricing',
          type: 'warning',
          content: "**Tax implications matter internationally!**\n\n• Higher transfer price → More profit in selling division's country\n• Lower transfer price → More profit in buying division's country\n\n**If selling division is in HIGH tax country:**\nCompany benefits from LOWER transfer price (shift profit to low-tax country)\n\n**IRS and tax authorities require:**\n• Arm's-length pricing (what unrelated parties would pay)\n• Documentation of methodology\n• Severe penalties for manipulation",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Transfer prices affect divisional profits and decision-making",
            "Market price is best when competitive external market exists",
            "Minimum TP = Variable Cost + Opportunity Cost",
            "If excess capacity, opportunity cost is zero",
            "Cost-based methods may distort decisions",
            "Negotiated prices work when divisions have equal bargaining power",
            "International transfer pricing has major tax implications",
          ],
        },
      ],
    },
  },
];

// Helper functions
export const getCMA1CLessons = () => cma1CLessons;
export const getCMA1CLessonById = (id: string) => cma1CLessons.find(lesson => lesson.id === id);
export const getCMA1CLessonCount = () => cma1CLessons.length;

export default cma1CLessons;
