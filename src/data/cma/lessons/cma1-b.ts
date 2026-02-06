/**
 * CMA Part 1, Section B: Planning, Budgeting, and Forecasting
 * Weight: 20% of Part 1 Exam
 * 
 * Topics covered:
 * - Strategic planning
 * - Budgeting concepts
 * - Forecasting techniques
 * - Budget methodologies
 * - Annual profit plan and supporting schedules
 * - Top-level planning and analysis
 * 
 * Based on IMA CMA Content Specification Outline 2025-2026
 */

import { Lesson } from '../../../types';

export const cma1BLessons: Lesson[] = [
  // ============================================================================
  // CMA1-B: PLANNING, BUDGETING, AND FORECASTING (Lessons 1-10)
  // ============================================================================
  
  {
    id: 'CMA1-B-001',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Strategic Planning Process',
    description: 'Understand how strategic planning drives budgeting and resource allocation',
    order: 9,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Strategic planning', 'Vision and mission', 'SWOT analysis', 'Strategic objectives'],
    blueprintArea: 'CMA1-B',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "CMAs bridge strategy and finance! You translate strategic goals into financial plans, budgets, and metrics. Understanding the strategic planning process ensures your financial plans align with corporate objectives and create value.",
        },
        {
          title: 'The Strategic Planning Hierarchy',
          type: 'text',
          content: "**Mission → Vision → Strategy → Tactics → Operations**\n\n**Mission Statement:** Why we exist (core purpose)\n• Enduring, rarely changes\n• Example: \"To organize the world's information\" (Google)\n\n**Vision Statement:** Where we're going (future state)\n• Aspirational, may evolve\n• Example: \"To be Earth's most customer-centric company\" (Amazon)\n\n**Strategic Goals:** What we must achieve (3-5 year horizon)\n• Measurable, time-bound\n• Example: \"Achieve 20% market share by 2027\"",
        },
        {
          title: '🧠 Memory Aid: SWOT Analysis',
          type: 'callout',
          content: "**SWOT drives strategic choices:**\n\n**Internal Factors (We control):**\n• **S**trengths - Build on them\n• **W**eaknesses - Address them\n\n**External Factors (Environment):**\n• **O**pportunities - Pursue them\n• **T**hreats - Mitigate them\n\n**Strategy connects internal capabilities to external opportunities while managing threats.**",
        },
        {
          title: 'Strategic Analysis Tools',
          type: 'table',
          headers: ['Tool', 'Purpose', 'Key Elements'],
          rows: [
            ['SWOT', 'Internal/external analysis', 'Strengths, Weaknesses, Opportunities, Threats'],
            ['PESTEL', 'Macro-environment scan', 'Political, Economic, Social, Tech, Environmental, Legal'],
            ['Porter\'s Five Forces', 'Industry attractiveness', 'Rivalry, buyers, suppliers, substitutes, new entrants'],
            ['Value Chain', 'Competitive advantage sources', 'Primary and support activities'],
            ['BCG Matrix', 'Portfolio analysis', 'Stars, Cash Cows, Question Marks, Dogs'],
          ],
        },
        {
          title: 'Porter\'s Five Forces',
          type: 'text',
          content: "**Determines industry profitability potential:**\n\n**1. Rivalry Among Existing Competitors**\n• More intense with many similar-sized firms\n• High fixed costs, low differentiation\n\n**2. Threat of New Entrants**\n• Barriers: capital, scale, brand, regulation\n\n**3. Threat of Substitutes**\n• Products that satisfy same need\n\n**4. Bargaining Power of Buyers**\n• Concentrated buyers, standardized products\n\n**5. Bargaining Power of Suppliers**\n• Few suppliers, unique inputs, switching costs\n\n**Low forces → High industry profitability**",
        },
        {
          title: 'Competitive Strategies',
          type: 'text',
          content: "**Porter's Generic Strategies:**\n\n**Cost Leadership:**\n• Lowest cost producer in industry\n• Compete on price while maintaining margins\n• Example: Walmart, Southwest Airlines\n\n**Differentiation:**\n• Unique product/service justifying premium price\n• Brand, quality, innovation, service\n• Example: Apple, Mercedes-Benz\n\n**Focus (Niche):**\n• Target narrow segment with cost OR differentiation\n• Deep expertise in specific market\n• Example: Rolex (luxury focus), USAA (military focus)\n\n**Stuck in the middle = No clear strategy = Poor performance**",
        },
        {
          title: 'From Strategy to Budget',
          type: 'text',
          content: "**Strategic Planning Informs Budgeting:**\n\n**Long-range Plan (3-5 years):**\n• Capital investment requirements\n• Capacity expansion/contraction\n• New market entry\n• Technology roadmap\n\n**Annual Operating Plan (1 year):**\n• Detailed revenue and expense budgets\n• Headcount plans\n• Project priorities\n\n**Rolling Forecasts (Quarterly updates):**\n• Revise based on actual results\n• Adapt to changing conditions\n\n**Key Link:** Strategic objectives → Key Performance Indicators → Budget targets",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Mission (why) → Vision (where) → Strategy (how) → Tactics → Operations",
            "SWOT analyzes internal strengths/weaknesses and external opportunities/threats",
            "Porter's Five Forces assess industry attractiveness",
            "Generic strategies: Cost leadership, Differentiation, or Focus",
            "Strategic planning drives long-range and annual budget development",
            "CMAs translate strategy into financial plans and performance metrics",
            "Avoid being 'stuck in the middle' with no clear strategic position",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-B-002',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Budgeting Concepts and Systems',
    description: 'Master the purposes, benefits, and limitations of budgeting systems',
    order: 10,
    duration: 45,
    difficulty: 'beginner',
    topics: ['Budget purposes', 'Budget types', 'Budget administration', 'Budget limitations'],
    blueprintArea: 'CMA1-B',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Budgeting is THE core CMA competency! You'll lead budget processes, challenge assumptions, and use budgets for performance evaluation. Understanding budgeting's purposes and limitations makes you an effective finance business partner.",
        },
        {
          title: 'Purposes of Budgeting',
          type: 'text',
          content: "**Planning:**\n• Forces managers to think ahead\n• Translates strategy into specific actions\n• Identifies resource requirements\n\n**Coordination:**\n• Aligns activities across departments\n• Ensures production matches sales plan\n• Highlights interdependencies\n\n**Control:**\n• Provides benchmark for performance evaluation\n• Enables variance analysis\n• Triggers corrective actions\n\n**Communication:**\n• Communicates expectations to all levels\n• Documents approved resource levels\n• Creates accountability",
        },
        {
          title: '🧠 Memory Aid: Budget Functions',
          type: 'callout',
          content: "**\"PACE\"** - Budgets provide:\n\n**P**lanning - Looking ahead systematically\n**A**uthorization - Approved spending levels\n**C**ontrol - Measuring actual vs. plan\n**E**valuation - Assessing manager performance\n\nBudgets also motivate (targets to achieve) and coordinate (align activities).",
        },
        {
          title: 'Types of Budgets',
          type: 'table',
          headers: ['Type', 'Characteristics', 'Best For'],
          rows: [
            ['Master Budget', 'Comprehensive, all functions', 'Overall company planning'],
            ['Operating Budget', 'Revenue and expenses', 'Day-to-day operations'],
            ['Financial Budget', 'Cash, capital, pro forma statements', 'Financing and investment'],
            ['Static Budget', 'Fixed activity level', 'Fixed cost planning'],
            ['Flexible Budget', 'Adjusts to actual volume', 'Performance evaluation'],
            ['Rolling Budget', 'Continuously updated', 'Dynamic environments'],
          ],
        },
        {
          title: 'The Master Budget Framework',
          type: 'text',
          content: "**Operating Budgets (Start Here):**\n1. Sales Budget ← Starting point\n2. Production Budget (or Purchases for retail)\n3. Direct Materials Budget\n4. Direct Labor Budget\n5. Manufacturing Overhead Budget\n6. Selling & Administrative Expense Budget\n7. Cost of Goods Sold Budget\n8. Budgeted Income Statement\n\n**Financial Budgets:**\n9. Capital Expenditures Budget\n10. Cash Budget\n11. Budgeted Balance Sheet\n12. Budgeted Statement of Cash Flows",
        },
        {
          title: 'Budget Administration',
          type: 'text',
          content: "**Budget Committee:**\n• Cross-functional membership (CFO, COO, key managers)\n• Sets guidelines and assumptions\n• Reviews and approves submissions\n• Resolves conflicts\n\n**Budget Manual:**\n• Procedures and timeline\n• Forms and templates\n• Approval requirements\n• Variance reporting standards\n\n**Budget Calendar:**\n• Typically starts 3-6 months before new fiscal year\n• Iterative process with multiple reviews\n• Board approval before year-end",
        },
        {
          title: '⚠️ Exam Trap: Behavioral Issues',
          type: 'warning',
          content: "**Budgets can create dysfunctional behavior:**\n\n**Budgetary Slack:**\n• Understating revenues or overstating costs\n• Managers protect themselves by padding budgets\n\n**Gaming:**\n• Accelerating or deferring transactions to meet targets\n• Short-term focus at expense of long-term value\n\n**Rigid adherence:**\n• Missing opportunities because \"not in budget\"\n• Failing to adapt to changing conditions\n\n**Solution:** Use budgets as tools, not weapons. Combine with rolling forecasts.",
        },
        {
          title: 'Participative vs. Imposed Budgeting',
          type: 'table',
          headers: ['Approach', 'Advantages', 'Disadvantages'],
          rows: [
            ['Participative (Bottom-up)', 'Buy-in, local knowledge, motivation', 'Time-consuming, may include slack'],
            ['Imposed (Top-down)', 'Fast, aligns with strategy, no slack', 'Less buy-in, may miss local factors'],
            ['Negotiated (Combined)', 'Balance of both approaches', 'Requires good communication'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Budgets serve planning, coordination, control, and communication functions",
            "Master budget includes operating budgets and financial budgets",
            "Sales budget is the starting point for the entire budget process",
            "Static budgets fix activity level; flexible budgets adjust to actual volume",
            "Budget committee provides oversight and approval",
            "Watch for behavioral issues: slack, gaming, rigid adherence",
            "Participative budgeting increases buy-in but takes more time",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-B-003',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Sales Forecasting Techniques',
    description: 'Apply quantitative and qualitative methods to forecast sales',
    order: 11,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Qualitative methods', 'Quantitative methods', 'Regression', 'Time series'],
    blueprintArea: 'CMA1-B',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Sales forecasts drive EVERYTHING else in the budget! An inaccurate sales forecast cascades through production, inventory, staffing, and cash flow projections. CMAs must understand forecasting methods and their appropriate applications.",
        },
        {
          title: 'Qualitative vs. Quantitative Methods',
          type: 'text',
          content: "**Qualitative Methods (Judgmental):**\n• Based on opinions, experience, market insights\n• Useful for new products, uncertain environments\n• Examples: Executive opinion, Delphi method, customer surveys\n\n**Quantitative Methods (Statistical):**\n• Based on historical data and mathematical models\n• Requires sufficient historical data\n• Examples: Moving average, regression, time series decomposition\n\n**Best Practice:** Combine both approaches for robust forecasts.",
        },
        {
          title: 'Qualitative Forecasting Methods',
          type: 'table',
          headers: ['Method', 'How It Works', 'Best For'],
          rows: [
            ['Executive Opinion', 'Senior managers provide estimates', 'Quick, top-level forecasts'],
            ['Sales Force Composite', 'Salespeople forecast their territories', 'Customer-level insights'],
            ['Customer Surveys', 'Ask customers about purchase intentions', 'B2B, major purchases'],
            ['Delphi Method', 'Anonymous expert panel, iterative consensus', 'Long-term, uncertain futures'],
            ['Market Research', 'Primary/secondary research, focus groups', 'New products, market entry'],
          ],
        },
        {
          title: 'Moving Average',
          type: 'text',
          content: "**Simple Moving Average:**\nForecast = Average of last n periods\n\n**Example (3-month MA):**\nMonths 1-3 sales: 100, 110, 105\nForecast for Month 4 = (100 + 110 + 105) / 3 = 105\n\n**Weighted Moving Average:**\nAssign more weight to recent periods\n\n**Example (weights: 0.5, 0.3, 0.2):**\nForecast = (105 × 0.5) + (110 × 0.3) + (100 × 0.2) = 105.5\n\n**Smooths out random variations, but lags trends**",
        },
        {
          title: 'Exponential Smoothing',
          type: 'text',
          content: "**Formula:**\nNew Forecast = α(Actual) + (1 - α)(Old Forecast)\n\nWhere α (alpha) = smoothing constant (0 to 1)\n\n**Example:**\nOld forecast: 100\nActual: 120\nα = 0.3\n\nNew Forecast = 0.3(120) + 0.7(100) = 36 + 70 = 106\n\n**Higher α:** More responsive to recent changes\n**Lower α:** More stable, less responsive\n\n**Advantage:** Uses all historical data with declining weights",
        },
        {
          title: '🧠 Memory Aid: Regression Analysis',
          type: 'callout',
          content: "**\"Y = a + bX\"** - The regression line\n\n**Y** = Dependent variable (what you're forecasting)\n**a** = Y-intercept (value when X = 0)\n**b** = Slope (change in Y for each unit change in X)\n**X** = Independent variable (predictor)\n\n**Example:** Sales = 50,000 + 2.5(Advertising)\nEach $1 of advertising generates $2.50 in sales",
        },
        {
          title: 'Regression Analysis',
          type: 'text',
          content: "**Simple Linear Regression:**\nOne independent variable predicts dependent variable\n\n**Multiple Regression:**\nMultiple independent variables\nY = a + b₁X₁ + b₂X₂ + ... + bₙXₙ\n\n**Coefficient of Determination (R²):**\n• Measures how well the model explains variations\n• R² = 0.85 means 85% of variation explained\n• Higher R² = Better predictive power\n\n**Correlation Coefficient (r):**\n• Measures strength and direction of relationship\n• Range: -1 to +1\n• |r| close to 1 = Strong relationship",
        },
        {
          title: 'Time Series Components',
          type: 'table',
          headers: ['Component', 'Description', 'Example'],
          rows: [
            ['Trend (T)', 'Long-term direction', 'Industry growth over 10 years'],
            ['Seasonal (S)', 'Regular pattern within year', 'Retail Q4 holiday spike'],
            ['Cyclical (C)', 'Multi-year economic cycles', 'Recession/recovery patterns'],
            ['Random (R)', 'Unpredictable variation', 'Weather, one-time events'],
          ],
        },
        {
          title: '⚠️ Exam Trap: High-Low Method',
          type: 'warning',
          content: "**Quick cost estimation technique:**\n\nVariable Cost per Unit = (High Cost - Low Cost) / (High Units - Low Units)\n\nFixed Cost = Total Cost - (Variable Rate × Units)\n\n**Example:**\nHigh: 10,000 units, $80,000 cost\nLow: 6,000 units, $56,000 cost\n\nVariable = ($80,000 - $56,000) / (10,000 - 6,000) = $6/unit\nFixed = $80,000 - ($6 × 10,000) = $20,000\n\n**Limitation:** Uses only two data points - regression is more accurate!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Sales forecast is the foundation of the master budget",
            "Qualitative methods use judgment; quantitative use historical data",
            "Moving average smooths variation but lags trends",
            "Exponential smoothing weights recent data more heavily",
            "Regression: Y = a + bX; R² measures explanatory power",
            "Time series has Trend, Seasonal, Cyclical, and Random components",
            "High-low method is quick but uses only two points",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-B-004',
    courseId: 'cma',
    section: 'CMA1',
    title: 'The Sales and Production Budget',
    description: 'Prepare the sales budget and link it to production planning',
    order: 12,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Sales budget', 'Production budget', 'Inventory planning', 'Capacity constraints'],
    blueprintArea: 'CMA1-B',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "The sales budget drives everything! If it's wrong, every downstream budget is wrong. The production budget must balance sales needs with inventory levels and capacity constraints. CMAs must master these foundational calculations.",
        },
        {
          title: 'Sales Budget Structure',
          type: 'text',
          content: "**Basic Formula:**\nBudgeted Sales Revenue = Expected Unit Sales × Selling Price per Unit\n\n**Considerations:**\n• Product mix (multiple products)\n• Seasonal patterns\n• Price changes during year\n• Sales by region or channel\n\n**Example:**\nQ1: 10,000 units × $50 = $500,000\nQ2: 12,000 units × $50 = $600,000\nQ3: 15,000 units × $48 = $720,000 (price reduction)\nQ4: 18,000 units × $48 = $864,000",
        },
        {
          title: 'Production Budget',
          type: 'text',
          content: "**The Core Formula:**\n\n```\n  Budgeted Sales (units)\n+ Desired Ending Inventory\n= Total Units Needed\n- Beginning Inventory\n= Units to Produce\n```\n\n**Example:**\nBudgeted sales: 10,000 units\nDesired ending inventory: 2,000 units (20% of next quarter sales)\nBeginning inventory: 1,500 units\n\nUnits to produce = 10,000 + 2,000 - 1,500 = 10,500 units",
        },
        {
          title: '🧠 Memory Aid: Production Budget',
          type: 'callout',
          content: "**\"SEB\"** = Sales + Ending - Beginning\n\n**S**ales you need to meet\n**E**nding inventory you want\n**B**eginning inventory you already have\n\n**Think of it as:** What comes out (sales + ending) - What's already there (beginning) = What you must make",
        },
        {
          title: 'Quarterly Production Budget Example',
          type: 'table',
          headers: ['Item', 'Q1', 'Q2', 'Q3', 'Q4'],
          rows: [
            ['Budgeted sales (units)', '10,000', '12,000', '15,000', '13,000'],
            ['+ Desired ending inventory*', '2,400', '3,000', '2,600', '2,200'],
            ['= Total units needed', '12,400', '15,000', '17,600', '15,200'],
            ['- Beginning inventory', '2,000', '2,400', '3,000', '2,600'],
            ['= Units to produce', '10,400', '12,600', '14,600', '12,600'],
          ],
        },
        {
          title: 'Inventory Policy Decisions',
          type: 'text',
          content: "**Common Ending Inventory Policies:**\n\n• Percentage of next period's sales (e.g., 20%)\n• Fixed number of days' supply (e.g., 30-day supply)\n• Safety stock plus expected demand\n• Just-in-time (minimal inventory)\n\n**Trade-offs:**\n• **Higher inventory:** Better service, higher carrying costs\n• **Lower inventory:** Lower costs, risk of stockouts\n\n**Seasonal adjustment:** Build inventory before peak seasons",
        },
        {
          title: '⚠️ Exam Trap: Year-End Assumptions',
          type: 'warning',
          content: "**Watch for these in exam questions:**\n\n• **\"Ending inventory is 20% of next quarter sales\"**\n  - Q4 ending requires Year 2, Q1 forecast!\n  - Often given separately in the problem\n\n• **\"Beginning inventory equals last period's ending\"**\n  - Q2 beginning = Q1 ending\n  - This is how budgets flow quarter to quarter\n\n• **Circular reference:** Sometimes Q1 beginning is given; sometimes Year-End ending is given - read carefully!",
        },
        {
          title: 'Capacity Considerations',
          type: 'text',
          content: "**If production requirements exceed capacity:**\n\n**Options:**\n• Build inventory in advance (level production)\n• Add overtime or shifts\n• Outsource production\n• Expand capacity (capital budget)\n• Limit sales (prioritize high-margin products)\n\n**Level Production Strategy:**\n• Constant production rate throughout year\n• Inventory absorbs demand fluctuations\n• Avoids hiring/layoff costs\n• Requires working capital for inventory",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Sales budget = Expected units × Selling price",
            "Production = Sales + Ending Inventory - Beginning Inventory",
            "Ending inventory often set as percentage of next period's sales",
            "Q2 beginning inventory = Q1 ending inventory",
            "Inventory policy balances service levels vs. carrying costs",
            "Capacity constraints may require level production or alternatives",
            "Watch for year-end inventory assumptions in exam problems",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-B-005',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Direct Materials and Labor Budgets',
    description: 'Calculate material purchases and labor requirements from the production budget',
    order: 13,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Direct materials budget', 'Direct labor budget', 'Materials purchasing', 'Labor capacity'],
    blueprintArea: 'CMA1-B',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "These budgets directly drive cash outflows! Materials purchasing affects supplier relationships and cash planning. Labor budgets determine staffing needs and overtime costs. CMAs must accurately translate production plans into resource requirements.",
        },
        {
          title: 'Direct Materials Budget',
          type: 'text',
          content: "**Step 1: Calculate Materials Needed for Production**\nUnits to produce × Materials per unit = Materials for production\n\n**Step 2: Calculate Total Materials Needed**\n```\n  Materials for production\n+ Desired ending materials inventory\n= Total materials needed\n- Beginning materials inventory\n= Materials to purchase\n```\n\n**Step 3: Calculate Purchases in Dollars**\nMaterials to purchase × Cost per unit = Purchases $",
        },
        {
          title: 'Direct Materials Budget Example',
          type: 'table',
          headers: ['Item', 'Q1', 'Q2', 'Q3', 'Q4'],
          rows: [
            ['Units to produce', '10,400', '12,600', '14,600', '12,600'],
            ['× Materials per unit (lbs)', '2', '2', '2', '2'],
            ['= Materials for production', '20,800', '25,200', '29,200', '25,200'],
            ['+ Ending inventory (10% next Q)', '2,520', '2,920', '2,520', '2,000'],
            ['= Total needed', '23,320', '28,120', '31,720', '27,200'],
            ['- Beginning inventory', '2,080', '2,520', '2,920', '2,520'],
            ['= Materials to purchase (lbs)', '21,240', '25,600', '28,800', '24,680'],
            ['× Cost per lb ($5)', '$106,200', '$128,000', '$144,000', '$123,400'],
          ],
        },
        {
          title: '🧠 Memory Aid: Materials Budget',
          type: 'callout',
          content: "**Same \"SEB\" pattern as production:**\n\n**S**upplies for production (production × usage rate)\n**E**nding material inventory desired\n**B**eginning material inventory on hand\n\n**Purchases = S + E - B**\n\nIt's the production budget concept applied one level down!",
        },
        {
          title: 'Direct Labor Budget',
          type: 'text',
          content: "**Step 1: Calculate Labor Hours Needed**\nUnits to produce × Labor hours per unit = Total DL hours\n\n**Step 2: Calculate Labor Cost**\nTotal DL hours × Hourly wage rate = Total DL cost\n\n**Example:**\nQ1 production: 10,400 units\nLabor hours per unit: 0.5 hours\nWage rate: $20/hour\n\nDL hours = 10,400 × 0.5 = 5,200 hours\nDL cost = 5,200 × $20 = $104,000\n\n**No inventory component** - labor cannot be stored!",
        },
        {
          title: 'Direct Labor Budget Example',
          type: 'table',
          headers: ['Item', 'Q1', 'Q2', 'Q3', 'Q4'],
          rows: [
            ['Units to produce', '10,400', '12,600', '14,600', '12,600'],
            ['× DL hours per unit', '0.5', '0.5', '0.5', '0.5'],
            ['= Total DL hours needed', '5,200', '6,300', '7,300', '6,300'],
            ['× Hourly wage rate', '$20', '$20', '$20', '$20'],
            ['= Total DL cost', '$104,000', '$126,000', '$146,000', '$126,000'],
          ],
        },
        {
          title: 'Labor Capacity Planning',
          type: 'text',
          content: "**Convert hours to workers:**\nWorkers needed = DL hours / Hours per worker per period\n\n**Example:**\nQ3 DL hours: 7,300 hours\nHours per worker per quarter: 500 hours\n\nWorkers needed = 7,300 / 500 = 14.6 → 15 workers\n\n**Capacity options:**\n• Hire/fire workers (costly)\n• Overtime (premium paid, 1.5× typical)\n• Temporary workers\n• Cross-training (flexibility)",
        },
        {
          title: '⚠️ Exam Trap: Payroll Taxes and Benefits',
          type: 'warning',
          content: "**Direct labor cost may be just wages OR fully loaded:**\n\n• **Wages only:** $20/hour\n• **With payroll taxes (7.65% employer FICA):** $21.53/hour\n• **Fully loaded (benefits, taxes):** May be 30-40% above wages\n\n**Read the question carefully!**\nIf asks for \"direct labor cost\" typically use wages only.\nIf asks for \"total labor cost\" or \"employment cost\" include loadings.",
        },
        {
          title: 'Cash Flow Timing',
          type: 'text',
          content: "**Materials Payments:**\n• Often lag purchases (30-60 day terms)\n• Example: 40% paid in month of purchase, 60% next month\n• Creates payables build-up\n\n**Labor Payments:**\n• Usually paid in current period (weekly/biweekly)\n• Minimal timing lag\n• Direct cash outflow from cash budget",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Materials: Production needs + Ending inventory - Beginning inventory = Purchases",
            "Materials and production budgets follow same SEB pattern",
            "Direct labor = Production units × Hours per unit × Wage rate",
            "Labor has no inventory - cannot be stored",
            "Convert labor hours to headcount for capacity planning",
            "Watch for fully-loaded vs. wages-only labor cost questions",
            "Materials often paid with a lag; labor paid currently",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-B-006',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Manufacturing Overhead Budget',
    description: 'Develop overhead budgets separating fixed and variable components',
    order: 14,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Variable overhead', 'Fixed overhead', 'Overhead rate', 'Cost behavior'],
    blueprintArea: 'CMA1-B',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Manufacturing overhead is often the LARGEST cost pool and most difficult to manage. CMAs must understand cost behavior (fixed vs. variable) to create accurate budgets and set predetermined overhead rates for product costing.",
        },
        {
          title: 'Manufacturing Overhead Components',
          type: 'text',
          content: "**Variable Manufacturing Overhead:**\n• Varies with production volume\n• Indirect materials (supplies, lubricants)\n• Indirect labor (overtime premiums)\n• Utilities (variable portion)\n• Budgeted per unit or per direct labor hour\n\n**Fixed Manufacturing Overhead:**\n• Stays constant regardless of production\n• Depreciation on factory equipment\n• Factory rent or property taxes\n• Supervisory salaries\n• Budgeted as total per period",
        },
        {
          title: 'Overhead Budget Calculation',
          type: 'text',
          content: "**Variable Overhead:**\nDirect labor hours × Variable overhead rate per DL hour\n\n**Fixed Overhead:**\nSum of all fixed costs (constant per period)\n\n**Total Overhead:**\nVariable OH + Fixed OH\n\n**Cash Disbursements:**\nTotal OH - Non-cash items (depreciation)\n\n**Example:**\nVariable OH: 5,200 DL hours × $6/hour = $31,200\nFixed OH: $50,000\nTotal OH: $81,200\nDepreciation: $12,000\nCash OH = $81,200 - $12,000 = $69,200",
        },
        {
          title: 'Manufacturing Overhead Budget Example',
          type: 'table',
          headers: ['Item', 'Q1', 'Q2', 'Q3', 'Q4'],
          rows: [
            ['Budgeted DL hours', '5,200', '6,300', '7,300', '6,300'],
            ['Variable OH rate ($/DLH)', '$6.00', '$6.00', '$6.00', '$6.00'],
            ['Variable OH', '$31,200', '$37,800', '$43,800', '$37,800'],
            ['Fixed OH', '$50,000', '$50,000', '$50,000', '$50,000'],
            ['Total OH', '$81,200', '$87,800', '$93,800', '$87,800'],
            ['Less: Depreciation', '($12,000)', '($12,000)', '($12,000)', '($12,000)'],
            ['Cash OH disbursements', '$69,200', '$75,800', '$81,800', '$75,800'],
          ],
        },
        {
          title: '🧠 Memory Aid: Overhead Treatment',
          type: 'callout',
          content: "**\"DVFC\"** - Depreciation is a:\n\n**D**educted expense on income statement\n**V**irtual cost (no cash outflow)\n**F**ixed overhead component\n**C**ash flow exclusion (add back)\n\nAlways subtract depreciation from total overhead to get cash disbursements!",
        },
        {
          title: 'Predetermined Overhead Rate',
          type: 'text',
          content: "**Used for product costing throughout the year:**\n\nPredetermined OH Rate = Estimated Total OH / Estimated Activity Base\n\n**Common allocation bases:**\n• Direct labor hours\n• Direct labor cost\n• Machine hours\n• Units produced\n\n**Example:**\nEstimated annual OH: $350,600\nEstimated DL hours: 25,100\nPOHR = $350,600 / 25,100 = $13.97/DL hour\n\n(Variable: $6.00 + Fixed: $7.97)",
        },
        {
          title: 'Applied vs. Actual Overhead',
          type: 'text',
          content: "**Applied Overhead:**\nActual activity × Predetermined rate\n\n**Variance:**\n• **Underapplied:** Actual > Applied (charge to COGS)\n• **Overapplied:** Applied > Actual (credit to COGS)\n\n**Example:**\nApplied: 24,800 hours × $13.97 = $346,456\nActual: $355,000\nUnderapplied: $8,544\n\nAt year-end: Dr. COGS $8,544\n                    Cr. Manufacturing Overhead $8,544",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Split overhead into variable (per unit) and fixed (per period) components",
            "Variable OH changes with production volume; fixed stays constant",
            "Cash disbursements = Total OH - Depreciation",
            "Predetermined overhead rate = Estimated OH / Estimated activity",
            "Apply overhead using POHR × actual activity level",
            "Under/overapplied overhead closed to COGS at year-end",
            "Common bases: DL hours, machine hours, units produced",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-B-007',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Selling and Administrative Expense Budget',
    description: 'Prepare the SG&A budget including fixed and variable components',
    order: 15,
    duration: 40,
    difficulty: 'beginner',
    topics: ['Selling expenses', 'Administrative expenses', 'Fixed vs variable', 'Discretionary costs'],
    blueprintArea: 'CMA1-B',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "SG&A can be 10-30% of revenue and is a key area for cost control. CMAs must distinguish between necessary costs and discretionary spending that can be adjusted. This budget directly impacts profitability and is often the first place management looks to cut.",
        },
        {
          title: 'Components of SG&A',
          type: 'text',
          content: "**Selling Expenses:**\n• Sales salaries and commissions\n• Advertising and promotion\n• Travel and entertainment\n• Shipping and delivery\n• Sales office expenses\n\n**Administrative Expenses:**\n• Executive salaries\n• Office salaries and supplies\n• Depreciation - office equipment\n• Legal and professional fees\n• IT and technology costs\n• Insurance (general)",
        },
        {
          title: 'Cost Behavior in SG&A',
          type: 'table',
          headers: ['Type', 'Examples', 'Budget Approach'],
          rows: [
            ['Variable', 'Sales commissions, shipping', 'Per unit or % of sales'],
            ['Fixed', 'Executive salaries, rent', 'Constant per period'],
            ['Mixed', 'Utilities, phone', 'Base + variable rate'],
            ['Discretionary', 'Advertising, training', 'Management decision'],
          ],
        },
        {
          title: 'SG&A Budget Structure',
          type: 'text',
          content: "**Variable Selling Expenses:**\nSales units × Variable rate per unit\n(or Sales $ × Commission percentage)\n\n**Fixed Selling Expenses:**\nSum of fixed selling costs\n\n**Fixed Administrative Expenses:**\nSum of fixed admin costs\n\n**Total SG&A:**\nVariable + Fixed Selling + Fixed Admin\n\n**Cash SG&A:**\nTotal SG&A - Non-cash items (depreciation)",
        },
        {
          title: 'SG&A Budget Example',
          type: 'table',
          headers: ['Item', 'Q1', 'Q2', 'Q3', 'Q4'],
          rows: [
            ['Budgeted sales (units)', '10,000', '12,000', '15,000', '13,000'],
            ['Variable selling ($/unit)', '$2.00', '$2.00', '$2.00', '$2.00'],
            ['Variable selling expense', '$20,000', '$24,000', '$30,000', '$26,000'],
            ['Fixed selling expense', '$35,000', '$35,000', '$35,000', '$35,000'],
            ['Fixed admin expense', '$45,000', '$45,000', '$45,000', '$45,000'],
            ['Total SG&A', '$100,000', '$104,000', '$110,000', '$106,000'],
            ['Less: Depreciation', '($8,000)', '($8,000)', '($8,000)', '($8,000)'],
            ['Cash SG&A', '$92,000', '$96,000', '$102,000', '$98,000'],
          ],
        },
        {
          title: '🧠 Memory Aid: Discretionary Costs',
          type: 'callout',
          content: "**\"ATRD\"** - Common discretionary (cuttable) costs:\n\n**A**dvertising and promotion\n**T**raining and development\n**R**esearch and development\n**D**onations and community\n\n**Warning:** Cutting these saves short-term cash but may hurt long-term competitiveness!",
        },
        {
          title: 'Commission Structures',
          type: 'text',
          content: "**Common commission approaches:**\n\n• **Flat percentage:** 5% of all sales\n• **Tiered:** 4% up to quota, 7% above quota\n• **Gross profit based:** 10% of gross profit dollars\n• **Product-specific:** Higher % on strategic products\n\n**Example (Tiered):**\nSalesperson quota: $100,000\nActual sales: $130,000\nBase rate: 4%, Accelerator: 7%\n\nCommission = (100,000 × 4%) + (30,000 × 7%)\n           = $4,000 + $2,100 = $6,100",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "SG&A includes selling expenses and administrative expenses",
            "Variable costs (commissions) tie to sales volume",
            "Fixed costs stay constant regardless of sales level",
            "Discretionary costs can be adjusted but may impact long-term",
            "Calculate cash SG&A by subtracting depreciation",
            "Commissions may be flat percentage or tiered/accelerated",
            "SG&A is often a focus area for cost reduction initiatives",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-B-008',
    courseId: 'cma',
    section: 'CMA1',
    title: 'The Cash Budget',
    description: 'Construct a comprehensive cash budget integrating all operating and financial activities',
    order: 16,
    duration: 60,
    difficulty: 'advanced',
    topics: ['Cash receipts', 'Cash disbursements', 'Financing needs', 'Cash management'],
    blueprintArea: 'CMA1-B',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Cash is KING! The cash budget is the culmination of all operating budgets and determines financing needs. Running out of cash kills companies - even profitable ones. CMAs must master cash flow forecasting and identify borrowing needs in advance.",
        },
        {
          title: 'Cash Budget Structure',
          type: 'text',
          content: "**The Basic Framework:**\n```\n  Beginning Cash Balance\n+ Cash Receipts (collections from customers)\n= Total Cash Available\n- Cash Disbursements (all payments)\n= Cash Excess or Deficiency\n± Financing (borrowing/repaying)\n= Ending Cash Balance\n```\n\n**Target:** Maintain minimum cash balance (cushion for unexpected needs)",
        },
        {
          title: 'Cash Receipts: Collection Pattern',
          type: 'text',
          content: "**Credit sales collection assumptions:**\n• 70% collected in month of sale\n• 25% collected in following month\n• 3% collected in second following month\n• 2% uncollectible (bad debts)\n\n**Example:**\nJanuary sales: $100,000\n\nJanuary collections: $70,000\nFebruary collections: $25,000\nMarch collections: $3,000\nUncollectible: $2,000",
        },
        {
          title: 'Cash Receipts Schedule',
          type: 'table',
          headers: ['', 'January', 'February', 'March'],
          rows: [
            ['November sales ($80K)', '$2,400 (3%)', '-', '-'],
            ['December sales ($90K)', '$22,500 (25%)', '$2,700 (3%)', '-'],
            ['January sales ($100K)', '$70,000 (70%)', '$25,000 (25%)', '$3,000 (3%)'],
            ['February sales ($110K)', '-', '$77,000 (70%)', '$27,500 (25%)'],
            ['March sales ($120K)', '-', '-', '$84,000 (70%)'],
            ['Total Receipts', '$94,900', '$104,700', '$114,500'],
          ],
        },
        {
          title: '🧠 Memory Aid: Collection Grid',
          type: 'callout',
          content: "**\"Diagonal Down\" Pattern:**\n\nCreate a grid with months across and sales periods down. Each sale creates a diagonal pattern of collections flowing down and right.\n\nJanuary sales appear in January (70%), February (25%), March (3%).\n\n**Each column total = that month's total receipts**",
        },
        {
          title: 'Cash Disbursements',
          type: 'text',
          content: "**Operating cash outflows:**\n• Materials purchases (per payment terms)\n• Direct labor (current period)\n• Manufacturing overhead (less depreciation)\n• Selling & admin expenses (less depreciation)\n\n**Other cash outflows:**\n• Capital expenditures\n• Income tax payments\n• Dividend payments\n• Loan principal payments\n• Interest payments",
        },
        {
          title: 'Materials Payment Pattern',
          type: 'text',
          content: "**Typical terms: 50% in month of purchase, 50% next month**\n\n**Example:**\nJanuary purchases: $50,000\nFebruary purchases: $60,000\n\nJanuary disbursements: Prior month balance + 50% January\nFebruary disbursements: 50% January + 50% February\n\nIf December purchases were $45,000:\nJanuary cash out = $22,500 (Dec) + $25,000 (Jan) = $47,500",
        },
        {
          title: 'Complete Cash Budget Example',
          type: 'table',
          headers: ['Item', 'Q1', 'Q2', 'Q3', 'Q4'],
          rows: [
            ['Beginning cash balance', '$50,000', '$52,200', '$60,100', '$55,000'],
            ['+ Cash receipts', '$450,000', '$550,000', '$680,000', '$620,000'],
            ['= Total cash available', '$500,000', '$602,200', '$740,100', '$675,000'],
            ['- Cash disbursements', '$467,800', '$577,100', '$705,100', '$595,000'],
            ['= Excess (deficiency)', '$32,200', '$25,100', '$35,000', '$80,000'],
            ['Minimum cash required', '($50,000)', '($50,000)', '($50,000)', '($50,000)'],
            ['Surplus (shortfall)', '($17,800)', '($24,900)', '($15,000)', '$30,000'],
            ['Borrowing (repayment)', '$20,000', '$35,000', '$20,000', '($75,000)'],
            ['Ending cash balance', '$52,200', '$60,100', '$55,000', '$55,000'],
          ],
        },
        {
          title: '⚠️ Exam Trap: Financing Calculations',
          type: 'warning',
          content: "**Watch for interest on borrowings!**\n\n• When to borrow: When projected balance < minimum required\n• Borrow at beginning of period\n• Repay when cash allows (oldest borrowings first)\n• Interest calculated on outstanding balance\n\n**Example:** $20,000 borrowed at 12% annual = $600/quarter interest\n\nSome problems require borrowing in round amounts ($5,000 increments).",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Cash budget = Collections - Disbursements ± Financing",
            "Cash receipts: Apply collection percentages to each month's sales",
            "Use diagonal grid pattern for cash collection schedules",
            "Disbursements: Remove depreciation (non-cash) from operating budgets",
            "Materials payments follow their own timing pattern",
            "Maintain minimum cash balance by borrowing when needed",
            "Interest on borrowings must be included in disbursements",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-B-009',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Pro Forma Financial Statements',
    description: 'Prepare the budgeted income statement and balance sheet',
    order: 17,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Budgeted income statement', 'Budgeted balance sheet', 'Pro forma statements'],
    blueprintArea: 'CMA1-B',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Pro forma statements are the culmination of the entire budgeting process! They show the projected financial results if plans are achieved. CMAs use these for management reporting, banking relationships, and board presentations.",
        },
        {
          title: 'Budgeted Income Statement',
          type: 'text',
          content: "**Pulls from all operating budgets:**\n\n```\n  Sales (from sales budget)\n- Cost of Goods Sold (calculated)\n= Gross Profit\n- Selling & Admin Expenses (from SG&A budget)\n= Operating Income\n- Interest Expense (from cash budget)\n= Income Before Tax\n- Income Tax Expense\n= Net Income\n```",
        },
        {
          title: 'Calculating Cost of Goods Sold',
          type: 'text',
          content: "**For a manufacturer:**\n```\nBeginning Finished Goods Inventory\n+ Cost of Goods Manufactured\n  (DM used + DL + Applied OH)\n= Cost of Goods Available for Sale\n- Ending Finished Goods Inventory\n= Cost of Goods Sold\n```\n\n**Unit Cost:**\nDM per unit + DL per unit + OH per unit = Cost per unit\n\n**COGS = Units sold × Cost per unit**",
        },
        {
          title: 'Budgeted Income Statement Example',
          type: 'table',
          headers: ['Item', 'Amount', 'Source'],
          rows: [
            ['Sales Revenue', '$2,500,000', 'Sales budget'],
            ['Cost of Goods Sold', '($1,500,000)', 'Production costs'],
            ['Gross Profit', '$1,000,000', '40% margin'],
            ['Selling & Admin Expenses', '($420,000)', 'SG&A budget'],
            ['Operating Income', '$580,000', '23.2% of sales'],
            ['Interest Expense', '($30,000)', 'Cash budget'],
            ['Income Before Tax', '$550,000', ''],
            ['Income Tax (25%)', '($137,500)', ''],
            ['Net Income', '$412,500', '16.5% of sales'],
          ],
        },
        {
          title: 'Budgeted Balance Sheet',
          type: 'text',
          content: "**Sources for each line item:**\n\n**Assets:**\n• Cash - Cash budget (ending balance)\n• Accounts Receivable - Sales budget × collection lag\n• Inventory - Production/materials budget\n• Fixed Assets - Prior year + CapEx - Depreciation\n\n**Liabilities:**\n• Accounts Payable - Materials budget × payment lag\n• Loans Payable - Cash budget (borrowings)\n• Accrued Expenses - Labor/overhead timing\n\n**Equity:**\n• Common Stock - Usually unchanged\n• Retained Earnings - Prior year + Net Income - Dividends",
        },
        {
          title: '🧠 Memory Aid: Balance Sheet Links',
          type: 'callout',
          content: "**\"CIFS\"** - Cash Inflow Sources:\n\n**C**ash budget → Cash on B/S\n**I**ncome statement → Retained Earnings change\n**F**inancing budget → Loans payable\n**S**ales uncollected → Accounts Receivable\n\nEvery number on the budgeted B/S comes from another budget!",
        },
        {
          title: 'Calculating Accounts Receivable',
          type: 'text',
          content: "**Based on collection pattern:**\n\nIf 70% collected in month of sale, 30% next month:\n\nEnding AR = 30% of December sales\n          + any remaining from November\n\n**Example:**\nDecember sales: $120,000\nNovember sales: $110,000\nCollection: 70% current, 25% +1, 5% +2\n\nEnding AR = ($120,000 × 30%) + ($110,000 × 5%)\n          = $36,000 + $5,500 = $41,500",
        },
        {
          title: 'Calculating Ending Inventory',
          type: 'text',
          content: "**Finished Goods Inventory:**\nEnding FG units × Cost per unit\n\n**Raw Materials Inventory:**\nEnding RM units × Cost per unit of material\n\n**Example:**\nEnding FG: 2,200 units × $30/unit = $66,000\nEnding RM: 2,000 lbs × $5/lb = $10,000\nTotal Inventory: $76,000",
        },
        {
          title: 'Budgeted Balance Sheet Example',
          type: 'table',
          headers: ['Assets', 'Amount', 'Liabilities & Equity', 'Amount'],
          rows: [
            ['Cash', '$55,000', 'Accounts Payable', '$62,000'],
            ['Accounts Receivable', '$185,000', 'Loans Payable', '$0'],
            ['Inventory', '$76,000', 'Accrued Expenses', '$25,000'],
            ['Total Current Assets', '$316,000', 'Total Current Liabilities', '$87,000'],
            ['Fixed Assets (net)', '$450,000', 'Common Stock', '$200,000'],
            ['', '', 'Retained Earnings', '$479,000'],
            ['Total Assets', '$766,000', 'Total L&E', '$766,000'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Budgeted income statement pulls from sales, production, and SG&A budgets",
            "COGS = Units sold × Unit cost (DM + DL + OH)",
            "Balance sheet ties back to all subsidiary budgets",
            "Ending AR based on uncollected sales per collection pattern",
            "Ending inventory from production and materials budgets",
            "Retained earnings = Prior balance + Net income - Dividends",
            "Pro formas must balance (Assets = Liabilities + Equity)",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-B-010',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Flexible Budgets and Beyond Budgeting',
    description: 'Apply flexible budgets and understand modern budgeting alternatives',
    order: 18,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Flexible budget', 'Rolling forecast', 'Zero-based budgeting', 'Activity-based budgeting'],
    blueprintArea: 'CMA1-B',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Static budgets become obsolete when activity levels differ from plan. Flexible budgets adjust to actual volume for fair performance evaluation. CMAs must also understand modern alternatives that address traditional budgeting limitations.",
        },
        {
          title: 'Static vs. Flexible Budget',
          type: 'text',
          content: "**Static Budget:**\n• Prepared for ONE activity level\n• Does not adjust when volume changes\n• Comparing actual to static can be misleading\n\n**Flexible Budget:**\n• Adjusts for ACTUAL activity level\n• Enables fair performance comparison\n• Separates volume effects from price/efficiency\n\n**Key insight:** You can't fairly evaluate a manager who was budgeted for 10,000 units but actually had to produce 12,000 units against the static budget!",
        },
        {
          title: 'Flexible Budget Formula',
          type: 'text',
          content: "**For each cost:**\nFlexible Budget = (Variable cost per unit × Actual units) + Fixed costs\n\n**Example:**\nVariable OH: $6/unit, Fixed OH: $50,000\nBudgeted: 10,000 units, Actual: 12,000 units\n\nStatic budget OH: ($6 × 10,000) + $50,000 = $110,000\nFlexible budget OH: ($6 × 12,000) + $50,000 = $122,000\n\n**Flexed amount is higher** because more units were produced!",
        },
        {
          title: 'Variance Analysis with Flexible Budget',
          type: 'table',
          headers: ['Item', 'Actual', 'Flexible Budget', 'Static Budget'],
          rows: [
            ['Units', '12,000', '12,000', '10,000'],
            ['Revenue ($50/unit)', '$588,000', '$600,000', '$500,000'],
            ['Variable costs ($30/unit)', '$372,000', '$360,000', '$300,000'],
            ['Fixed costs', '$52,000', '$50,000', '$50,000'],
            ['Operating income', '$164,000', '$190,000', '$150,000'],
          ],
        },
        {
          title: '🧠 Memory Aid: Two-Way Variance Split',
          type: 'callout',
          content: "**Total variance = Volume variance + Flexible budget variance**\n\n**Volume variance:** Static budget vs. Flexible budget\n• Due to producing/selling more or fewer units\n• Uses BUDGETED prices and costs\n\n**Flexible budget variance:** Flexible budget vs. Actual\n• Due to price and efficiency differences\n• Uses ACTUAL activity level\n\nVolume is a planning variance; FB variance is a performance variance.",
        },
        {
          title: 'Rolling Forecasts',
          type: 'text',
          content: "**What it is:**\n• Continuously updated forecast\n• Always looking ahead same time period (e.g., 12 months)\n• Updated monthly or quarterly\n\n**Benefits:**\n• More current than annual budget\n• Adapts to changing conditions\n• Reduces \"end of year\" gaming\n• Better for volatility/uncertainty\n\n**Example:**\nAfter Q1 actual → Reforecast Q2, Q3, Q4, and add Q1 next year\nAlways have 12 months of forward-looking plan",
        },
        {
          title: 'Zero-Based Budgeting (ZBB)',
          type: 'text',
          content: "**Traditional budgeting:**\nStart with last year's budget, adjust up or down\n(Incremental approach)\n\n**Zero-based budgeting:**\n• Start from zero each period\n• Every expense must be justified\n• Rank \"decision packages\" by priority\n• Allocate resources to highest priorities\n\n**Benefits:**\n• Eliminates budget padding\n• Forces review of all activities\n• Aligns spending with current priorities\n\n**Drawbacks:**\n• Time-consuming\n• Requires detailed justification\n• May reduce buy-in",
        },
        {
          title: 'Activity-Based Budgeting (ABB)',
          type: 'text',
          content: "**Extension of Activity-Based Costing:**\n\n1. Identify activities required to meet budget goals\n2. Determine resources consumed by each activity\n3. Budget based on activity demand\n\n**Example:**\nActivity: Process purchase orders\nCost driver: Number of POs\nBudgeted POs: 5,000\nCost per PO: $50\nActivity budget: $250,000\n\n**Benefits:**\n• Links resources to activities\n• Highlights value-added vs. non-value-added\n• Better cost control visibility",
        },
        {
          title: 'Beyond Budgeting Principles',
          type: 'list',
          content: [
            "Replace fixed annual targets with relative, directional goals",
            "Use rolling forecasts instead of annual budgets",
            "Match resources to demands dynamically, not in annual allocations",
            "Use peer benchmarking rather than variance to fixed budgets",
            "Reward shared success rather than individual target achievement",
            "Provide information transparency across the organization",
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Flexible budget adjusts to actual activity level for fair comparison",
            "Total variance = Volume variance + Flexible budget variance",
            "Rolling forecasts continuously update, always looking ahead",
            "Zero-based requires justifying every expense from scratch",
            "Activity-based budgeting links costs to activity demand",
            "Beyond Budgeting advocates relative targets and rolling forecasts",
            "Choose approach based on environment stability and management style",
          ],
        },
      ],
    },
  },
];

// Helper functions
export const getCMA1BLessons = () => cma1BLessons;
export const getCMA1BLessonById = (id: string) => cma1BLessons.find(lesson => lesson.id === id);
export const getCMA1BLessonCount = () => cma1BLessons.length;

export default cma1BLessons;
