/**
 * CMA Part 2, Section E: Investment Decisions
 * Weight: 10% of Part 2 Exam
 * 
 * Topics covered:
 * - Capital budgeting process
 * - Capital investment analysis methods
 * - Risk analysis in capital investment
 * 
 * Based on IMA CMA Content Specification Outline 2025-2026
 */

import { Lesson } from '../../../types';

export const cma2ELessons: Lesson[] = [
  // ============================================================================
  // CMA2-E: INVESTMENT DECISIONS (Lessons 1-6)
  // ============================================================================
  
  {
    id: 'CMA2-E-001',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Capital Budgeting Process',
    description: 'Understand the steps and considerations in capital investment decisions',
    order: 93,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Capital budgeting', 'Investment process', 'Project classification', 'Post-audit'],
    blueprintArea: 'CMA2-E',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Capital investments are the largest financial decisions organizations make. CMAs analyze investments, build business cases, and monitor project performance. These decisions shape the company's future for years or decades!",
        },
        {
          title: 'What is Capital Budgeting?',
          type: 'text',
          content: "**Definition:**\nThe process of planning and evaluating significant investments in long-term assets.\n\n**Characteristics:**\n• Large initial outlay\n• Benefits over multiple years\n• Often irreversible\n• Significant strategic impact\n\n**Examples:**\n• New plant or facility\n• Major equipment purchases\n• Acquisitions\n• R&D investments\n• IT systems",
        },
        {
          title: 'Capital Budgeting Steps',
          type: 'table',
          headers: ['Step', 'Description', 'CMA Role'],
          rows: [
            ['1. Identify', 'Generate investment ideas', 'Collect proposals from business units'],
            ['2. Evaluate', 'Analyze financial returns', 'Build financial models, calculate NPV/IRR'],
            ['3. Select', 'Choose best projects', 'Present analysis, support decision'],
            ['4. Implement', 'Execute project', 'Track spending vs. budget'],
            ['5. Monitor', 'Post-implementation review', 'Compare actual to projected returns'],
          ],
        },
        {
          title: 'Project Classifications',
          type: 'text',
          content: "**By purpose:**\n• **Replacement:** Maintain operations or reduce costs\n• **Expansion:** Increase capacity for existing products\n• **New products/markets:** Strategic growth\n• **Regulatory/safety:** Mandatory compliance\n\n**By relationship:**\n• **Independent:** Can accept/reject separately\n• **Mutually exclusive:** Accept one means reject others\n• **Contingent:** One depends on another\n\n**Classification affects how we evaluate!**",
        },
        {
          title: '🧠 Memory Aid: Capital Budgeting',
          type: 'callout',
          content: "**\"IESIM\"** - The five-step process:\n\n**I**dentify opportunities\n**E**valuate alternatives\n**S**elect best projects\n**I**mplement chosen projects\n**M**onitor results (post-audit)\n\n**CMAs are involved in every step!**",
        },
        {
          title: 'Relevant Cash Flows',
          type: 'text',
          content: "**Include these cash flows:**\n• Initial investment (negative)\n• Operating cash inflows\n• Working capital changes\n• Terminal/salvage value\n• Tax effects\n\n**Exclude:**\n• Sunk costs (already spent)\n• Allocated overhead (not incremental)\n• Financing costs (in discount rate)\n\n**Key principle:** Only INCREMENTAL cash flows matter!",
        },
        {
          title: 'Post-Implementation Audit',
          type: 'text',
          content: "**Purpose:**\n• Compare actual vs. projected results\n• Identify reasons for variances\n• Improve future forecasting\n• Hold managers accountable\n\n**Challenges:**\n• Isolating project's specific contribution\n• Changed assumptions over time\n• Reluctance to admit poor decisions\n\n**Best practice:** Compare to original approval document, not revised forecasts!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Capital budgeting evaluates large, long-term investments",
            "Five steps: Identify, Evaluate, Select, Implement, Monitor",
            "Projects classified by purpose and relationship to others",
            "Only incremental cash flows are relevant",
            "Exclude sunk costs and allocated overhead",
            "Post-audit compares actual to projected returns",
            "CMAs build models and support decisions throughout process",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-E-002',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Net Present Value (NPV)',
    description: 'Calculate and interpret NPV for investment evaluation',
    order: 94,
    duration: 55,
    difficulty: 'advanced',
    topics: ['NPV', 'Discounted cash flows', 'Required rate of return', 'Accept/reject decision'],
    blueprintArea: 'CMA2-E',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "NPV is the gold standard of capital budgeting! It directly measures value creation in today's dollars. CMAs must master NPV calculations and understand why NPV is theoretically superior to other methods. Exam heavily tests this!",
        },
        {
          title: 'NPV Formula',
          type: 'text',
          content: "**Net Present Value:**\n\nNPV = Σ [CFt / (1 + r)^t] - Initial Investment\n\n**Where:**\n• CFt = Cash flow in period t\n• r = Required rate of return (discount rate)\n• t = Time period\n\n**Decision rule:**\n• NPV > 0 → Accept (creates value)\n• NPV < 0 → Reject (destroys value)\n• NPV = 0 → Indifferent (earns exactly required return)",
        },
        {
          title: 'NPV Calculation Example',
          type: 'text',
          content: "**Project data:**\n• Initial investment: $100,000\n• Annual cash flows: $30,000 for 5 years\n• Required return: 10%\n\n**Present Value of annuity:**\nPVA = $30,000 × PVIFA(10%, 5)\nPVA = $30,000 × 3.7908 = $113,724\n\n**NPV:**\nNPV = $113,724 - $100,000 = **$13,724**\n\n**Decision:** Accept! Project creates $13,724 of value.",
        },
        {
          title: '🧠 Memory Aid: NPV Interpretation',
          type: 'callout',
          content: "**\"NPV = How Much Richer\"**\n\nPositive NPV tells you exactly how much wealthier the shareholders become in TODAY'S dollars.\n\n• NPV of $50,000 = Shareholders are $50,000 richer\n• NPV of -$20,000 = Would destroy $20,000 of value\n\n**That's why it's the best measure!**",
        },
        {
          title: 'Why NPV is Superior',
          type: 'table',
          headers: ['Advantage', 'Explanation'],
          rows: [
            ['Dollar measure', 'Shows actual value created (additive)'],
            ['Time value', 'Properly discounts future cash flows'],
            ['All cash flows', 'Considers entire project life'],
            ['Correct reinvestment', 'Assumes reinvestment at cost of capital (realistic)'],
            ['Additive', 'Sum of project NPVs = Portfolio NPV'],
          ],
        },
        {
          title: 'Choosing the Discount Rate',
          type: 'text',
          content: "**Options for discount rate:**\n\n**Weighted Average Cost of Capital (WACC):**\n• Most common for average-risk projects\n• Reflects company's overall cost of capital\n\n**Risk-adjusted rate:**\n• Higher rate for riskier projects\n• Lower rate for safer projects\n\n**Hurdle rate:**\n• Minimum acceptable return\n• May include strategic premium\n\n**Wrong rate = Wrong decision!**",
        },
        {
          title: '⚠️ Exam Trap: NPV vs. IRR Conflict',
          type: 'warning',
          content: "**When NPV and IRR give different rankings:**\n\nThis happens with mutually exclusive projects of different:\n• Size (scale)\n• Timing of cash flows\n• Project life\n\n**Always choose based on NPV!**\n\nNPV measures actual value creation; IRR can mislead when projects differ significantly.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "NPV = PV of inflows - Initial investment",
            "Accept if NPV > 0 (creates shareholder value)",
            "NPV shows value creation in today's dollars",
            "Use WACC or risk-adjusted rate for discounting",
            "NPV is theoretically superior to other methods",
            "When NPV and IRR conflict, use NPV",
            "NPVs are additive across projects",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-E-003',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Internal Rate of Return (IRR)',
    description: 'Calculate and evaluate investments using IRR',
    order: 95,
    duration: 50,
    difficulty: 'advanced',
    topics: ['IRR', 'Modified IRR', 'IRR limitations', 'Multiple IRRs'],
    blueprintArea: 'CMA2-E',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "IRR is popular because it's expressed as a percentage, making it easy to compare to cost of capital. CMAs must understand IRR calculations, its limitations, and when it can mislead. Many executives prefer IRR, so you need to interpret it correctly!",
        },
        {
          title: 'IRR Definition',
          type: 'text',
          content: "**Internal Rate of Return:**\nThe discount rate that makes NPV = 0\n\nSolve for r where:\nΣ [CFt / (1 + r)^t] = Initial Investment\n\n**Decision rule:**\n• IRR > Required return → Accept\n• IRR < Required return → Reject\n• IRR = Required return → Indifferent\n\n**IRR represents the project's percentage return on investment.**",
        },
        {
          title: 'IRR Calculation',
          type: 'text',
          content: "**Trial and error or financial calculator/Excel:**\n\n**Example:**\n• Initial investment: $100,000\n• Year 1 CF: $60,000\n• Year 2 CF: $60,000\n\n**Find r where:**\n-$100,000 + $60,000/(1+r) + $60,000/(1+r)² = 0\n\n**Solution:** IRR ≈ 13.1%\n\n**At 10% required return:** Accept (13.1% > 10%)\n**At 15% required return:** Reject (13.1% < 15%)",
        },
        {
          title: '🧠 Memory Aid: IRR Meaning',
          type: 'callout',
          content: "**\"IRR = Breakeven Cost of Capital\"**\n\nIRR tells you the maximum cost of capital at which the project is still acceptable.\n\n• If IRR = 15%, you can borrow up to 15% and still break even\n• If cost of capital > IRR, you're paying more than the project earns\n\n**IRR is the project's \"interest rate\"**",
        },
        {
          title: 'IRR Limitations',
          type: 'table',
          headers: ['Problem', 'Cause', 'Solution'],
          rows: [
            ['Multiple IRRs', 'Non-conventional cash flows', 'Use NPV or MIRR'],
            ['Scale ignored', 'Percentage, not dollars', 'Use NPV for ranking'],
            ['Reinvestment assumption', 'Assumes reinvest at IRR', 'Use MIRR'],
            ['No IRR', 'All positive or all negative CFs', 'Use NPV'],
            ['Mutually exclusive', 'May conflict with NPV', 'Use NPV'],
          ],
        },
        {
          title: 'Modified IRR (MIRR)',
          type: 'text',
          content: "**MIRR addresses reinvestment problem:**\n\n1. Discount all negative cash flows to present at financing rate\n2. Compound all positive cash flows to terminal value at reinvestment rate\n3. Find MIRR that equates PV of costs to FV of benefits\n\n**Formula:**\nMIRR = (Terminal Value / PV of Costs)^(1/n) - 1\n\n**MIRR uses realistic reinvestment rate (usually WACC)**",
        },
        {
          title: '⚠️ Exam Trap: Non-Conventional Cash Flows',
          type: 'warning',
          content: "**When cash flows change signs multiple times:**\n\n**Conventional:** - + + + + (one sign change)\n• One IRR exists\n\n**Non-conventional:** - + + + - + (multiple sign changes)\n• Multiple IRRs possible!\n• Each sign change can create another IRR\n\n**Example:** Project with cleanup costs at end\n-$100, +$200, +$200, -$150\n\n**Solution:** Use NPV profile or MIRR",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "IRR = Discount rate where NPV = 0",
            "Accept if IRR > Required return",
            "IRR is the project's percentage return",
            "Limitation: Assumes reinvestment at IRR (unrealistic)",
            "Multiple IRRs possible with non-conventional cash flows",
            "Scale problem: High IRR on small investment may not be best",
            "When conflicting with NPV, use NPV for decision",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-E-004',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Payback and Other Methods',
    description: 'Apply payback period, discounted payback, and accounting rate of return',
    order: 96,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Payback period', 'Discounted payback', 'Accounting rate of return', 'Profitability index'],
    blueprintArea: 'CMA2-E',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "While NPV is theoretically best, many companies use simpler methods too. Payback measures liquidity risk, and ARR connects to accounting returns. CMAs must understand all methods because different stakeholders prefer different measures!",
        },
        {
          title: 'Simple Payback Period',
          type: 'text',
          content: "**Definition:**\nTime required to recover the initial investment.\n\n**Formula (even cash flows):**\nPayback = Initial Investment / Annual Cash Flow\n\n**Decision rule:**\nAccept if Payback < Maximum acceptable period\n\n**Example:**\nInvestment: $100,000, Annual CF: $25,000\nPayback = $100,000 / $25,000 = **4 years**",
        },
        {
          title: 'Payback with Uneven Cash Flows',
          type: 'text',
          content: "**Cumulative approach:**\n\n| Year | Cash Flow | Cumulative |\n|------|-----------|------------|\n| 0 | -$100,000 | -$100,000 |\n| 1 | $30,000 | -$70,000 |\n| 2 | $40,000 | -$30,000 |\n| 3 | $50,000 | +$20,000 |\n\n**Payback between years 2 and 3:**\nPayback = 2 + ($30,000 / $50,000) = **2.6 years**\n\n(Recovered $70,000 in first 2 years, need $30,000 more from Year 3's $50,000)",
        },
        {
          title: 'Payback Advantages and Disadvantages',
          type: 'table',
          headers: ['Advantages', 'Disadvantages'],
          rows: [
            ['Simple to calculate', 'Ignores time value of money'],
            ['Easy to understand', 'Ignores cash flows after payback'],
            ['Measures liquidity risk', 'Arbitrary cutoff period'],
            ['Favors shorter projects', 'Doesn\'t measure profitability'],
          ],
        },
        {
          title: '🧠 Memory Aid: Payback Uses',
          type: 'callout',
          content: "**\"PILL\"** - When payback makes sense:\n\n**P**reliminary screening\n**I**lliquidity concerns\n**L**imited time horizon\n**L**ack of data for detailed analysis\n\n**Use as supplement to NPV, not replacement!**",
        },
        {
          title: 'Discounted Payback',
          type: 'text',
          content: "**Improvement:** Use present values of cash flows\n\n| Year | CF | PV@10% | Cumulative PV |\n|------|------|--------|---------------|\n| 0 | -$100,000 | -$100,000 | -$100,000 |\n| 1 | $40,000 | $36,364 | -$63,636 |\n| 2 | $40,000 | $33,058 | -$30,578 |\n| 3 | $40,000 | $30,053 | -$525 |\n| 4 | $40,000 | $27,321 | +$26,796 |\n\n**Discounted payback ≈ 3.02 years**\n\n**Better than simple payback but still ignores post-payback CFs!**",
        },
        {
          title: 'Profitability Index (PI)',
          type: 'text',
          content: "**Formula:**\nPI = PV of Future Cash Flows / Initial Investment\n\nOR: PI = 1 + (NPV / Initial Investment)\n\n**Decision rule:**\n• PI > 1 → Accept\n• PI < 1 → Reject\n\n**Example:**\nPV of inflows: $113,724, Investment: $100,000\nPI = $113,724 / $100,000 = **1.14**\n\n**Useful when capital is rationed:** Rank by PI to maximize NPV per dollar invested.",
        },
        {
          title: 'Accounting Rate of Return (ARR)',
          type: 'text',
          content: "**Formula:**\nARR = Average Accounting Profit / Average Investment\n\nOR: ARR = Average Net Income / [(Initial + Salvage) / 2]\n\n**Example:**\nAverage net income: $15,000\nInitial: $100,000, Salvage: $20,000\nAverage investment: ($100,000 + $20,000) / 2 = $60,000\n\nARR = $15,000 / $60,000 = **25%**\n\n**Uses accounting income, not cash flows - major weakness!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Payback: Time to recover investment (ignores TVM)",
            "Discounted payback: Uses PVs (still ignores post-payback)",
            "PI = PV of inflows / Investment (useful for capital rationing)",
            "ARR uses accounting income (not cash flows)",
            "Payback useful for liquidity assessment and screening",
            "All methods have limitations - NPV remains best",
            "Use multiple methods for complete picture",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-E-005',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Risk Analysis in Capital Budgeting',
    description: 'Incorporate risk into capital investment analysis',
    order: 97,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Sensitivity analysis', 'Scenario analysis', 'Simulation', 'Risk-adjusted discount rate'],
    blueprintArea: 'CMA2-E',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Cash flow projections are uncertain. CMAs must quantify this uncertainty through risk analysis! Single-point estimates can be dangerously misleading. Sensitivity and scenario analysis reveal what drives project risk and inform better decisions.",
        },
        {
          title: 'Sources of Project Risk',
          type: 'text',
          content: "**Revenue risk:**\n• Price uncertainty\n• Volume uncertainty\n• Competition\n• Economic conditions\n\n**Cost risk:**\n• Input cost volatility\n• Labor costs\n• Operating efficiency\n\n**Execution risk:**\n• Construction delays\n• Cost overruns\n• Technology problems\n\n**Identify key risk drivers for each project!**",
        },
        {
          title: 'Sensitivity Analysis',
          type: 'text',
          content: "**Definition:**\nChange ONE variable at a time to see impact on NPV.\n\n**Example:**\nBase case NPV: $50,000\n\n| Variable | -10% Change | +10% Change |\n|----------|-------------|-------------|\n| Price | -$30,000 | +$70,000 |\n| Volume | -$20,000 | +$60,000 |\n| Costs | +$60,000 | +$40,000 |\n\n**Conclusion:** NPV most sensitive to PRICE changes.",
        },
        {
          title: '🧠 Memory Aid: Sensitivity Analysis',
          type: 'callout',
          content: "**\"One at a Time\"**\n\nSensitivity analysis changes ONE variable while holding others constant.\n\n**Shows:**\n• Which variables matter most\n• Breakeven points for each variable\n• Where to focus risk management\n\n**Limitation:** Ignores correlations between variables!",
        },
        {
          title: 'Scenario Analysis',
          type: 'text',
          content: "**Definition:**\nChange MULTIPLE variables together for different scenarios.\n\n**Common scenarios:**\n• Base case (most likely)\n• Best case (optimistic)\n• Worst case (pessimistic)\n\n**Example:**\n| Scenario | Price | Volume | Costs | NPV |\n|----------|-------|--------|-------|-----|\n| Best | $55 | 12,000 | $30 | $150,000 |\n| Base | $50 | 10,000 | $35 | $50,000 |\n| Worst | $45 | 8,000 | $40 | -$30,000 |\n\n**Better than sensitivity: Considers correlations!**",
        },
        {
          title: 'Monte Carlo Simulation',
          type: 'text',
          content: "**Most sophisticated approach:**\n\n1. Assign probability distributions to key variables\n2. Computer randomly samples from distributions\n3. Calculate NPV for each sample\n4. Repeat thousands of times\n5. Analyze distribution of outcomes\n\n**Results show:**\n• Expected NPV\n• Standard deviation of NPV\n• Probability NPV < 0\n• Range of possible outcomes\n\n**Requires specialized software (Excel @RISK, Crystal Ball)**",
        },
        {
          title: 'Risk-Adjusted Discount Rate',
          type: 'text',
          content: "**Increase discount rate for riskier projects:**\n\n**Company WACC:** 10%\n\n| Project Type | Risk Adjustment | Rate Used |\n|--------------|-----------------|------------|\n| Replacement | -2% | 8% |\n| Expansion | 0% | 10% |\n| New product | +3% | 13% |\n| New market | +5% | 15% |\n\n**Higher rate → Lower NPV → Harder to accept**\n\n**Compensates for risk in the cash flows themselves!**",
        },
        {
          title: '⚠️ Exam Trap: Certainty Equivalents',
          type: 'warning',
          content: "**Alternative to risk-adjusted rate:**\n\n• Convert risky cash flows to \"certainty equivalents\"\n• Discount at risk-free rate\n• CE = Risky CF × Certainty Coefficient\n\n**Example:**\nRisky CF: $100,000, Certainty coefficient: 0.85\nCE = $100,000 × 0.85 = $85,000\nDiscount $85,000 at risk-free rate\n\n**Both methods should give same answer if done correctly!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Sensitivity: Change one variable, see NPV impact",
            "Scenario: Change multiple variables together",
            "Simulation: Probability distributions and thousands of trials",
            "Risk-adjusted rate: Higher rate for riskier projects",
            "Sensitivity reveals key drivers; Scenario addresses correlations",
            "Understand probability of negative NPV, not just expected NPV",
            "Match risk analysis method to project importance",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-E-006',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Real Options and Strategic Value',
    description: 'Evaluate managerial flexibility and strategic options in capital budgeting',
    order: 98,
    duration: 45,
    difficulty: 'advanced',
    topics: ['Real options', 'Option to expand', 'Option to abandon', 'Strategic value'],
    blueprintArea: 'CMA2-E',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "NPV assumes passive management, but projects often include valuable flexibility! Real options capture the value of being able to expand, abandon, or delay. CMAs who understand real options can justify strategic investments that basic NPV might reject.",
        },
        {
          title: 'What are Real Options?',
          type: 'text',
          content: "**Definition:**\nThe right, but not obligation, to take future actions based on new information.\n\n**Key insight:**\n• Traditional NPV assumes fixed plan\n• Real options recognize management flexibility\n• Flexibility has value, especially under uncertainty\n\n**Option value increases with:**\n• Greater uncertainty\n• Longer time to decide\n• More flexibility",
        },
        {
          title: 'Types of Real Options',
          type: 'table',
          headers: ['Option Type', 'Description', 'Example'],
          rows: [
            ['Expand', 'Right to increase scale if successful', 'Build plant with room to add capacity'],
            ['Abandon', 'Right to exit if unsuccessful', 'Sell assets, shut down division'],
            ['Delay', 'Right to postpone investment', 'Wait for more market information'],
            ['Switch', 'Right to change inputs or outputs', 'Flexible manufacturing equipment'],
            ['Stage', 'Right to invest in phases', 'Pilot project before full rollout'],
          ],
        },
        {
          title: 'Option to Expand Example',
          type: 'text',
          content: "**Base project:**\n• Investment: $100,000\n• Expected NPV: -$10,000\n• Standard analysis: REJECT\n\n**With expansion option:**\n• If market conditions favorable (40% probability)\n• Can invest additional $150,000\n• Additional NPV: $80,000\n\n**Value of option:**\n40% × $80,000 = $32,000\n\n**Adjusted NPV:** -$10,000 + $32,000 = **$22,000**\n\n**Decision with option: ACCEPT!**",
        },
        {
          title: '🧠 Memory Aid: Real Options',
          type: 'callout',
          content: "**\"FADED\"** - Types of real options:\n\n**F**lexibility to switch\n**A**bandon if failing\n**D**elay investment\n**E**xpand if successful\n**D**ivide into stages\n\n**Total value = NPV + Value of options**",
        },
        {
          title: 'Option to Abandon',
          type: 'text',
          content: "**Value of being able to exit:**\n\n**Without abandon option:**\n• Must continue even if project fails\n• NPV includes full downside\n\n**With abandon option:**\n• Can sell assets/exit if failing\n• Limits downside losses\n• Salvage value sets floor\n\n**Example:**\nProject fails 30% of time, loss = $200,000\nAbandonment recovers $150,000\nOption value: 30% × ($200,000 - $50,000 loss) = $45,000 saved",
        },
        {
          title: 'Strategic Investments',
          type: 'text',
          content: "**Some investments create future opportunities:**\n\n• R&D projects (platform for future products)\n• Market entry (beachhead for expansion)\n• Learning investments (develop capabilities)\n• Standard-setting (influence industry)\n\n**These may have negative NPV but positive strategic value!**\n\n**CMA challenge:** Quantify strategic value without wishful thinking\n\n**Approach:** Identify and value specific options created",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Real options = value of managerial flexibility",
            "Common options: Expand, Abandon, Delay, Switch, Stage",
            "Total value = Traditional NPV + Option value",
            "Options more valuable with higher uncertainty",
            "Strategic investments often contain embedded options",
            "Abandonment option limits downside risk",
            "Real options can justify investments that NPV alone rejects",
          ],
        },
      ],
    },
  },
];

// Helper functions
export const getCMA2ELessons = () => cma2ELessons;
export const getCMA2ELessonById = (id: string) => cma2ELessons.find(lesson => lesson.id === id);
export const getCMA2ELessonCount = () => cma2ELessons.length;

export default cma2ELessons;
