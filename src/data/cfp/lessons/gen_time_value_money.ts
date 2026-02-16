/**
 * CFP Domain 2: General Principles of Financial Planning
 * Area GEN-3: Time Value of Money
 *
 * These lessons cover TVM fundamentals, PV/FV calculations,
 * annuities, NPV, IRR, and loan amortization.
 *
 * TVM represents ~30% of Domain 2 and is tested heavily on the exam.
 */

import type { Lesson } from '../../../types';

export const CFP_GEN3_LESSONS: Lesson[] = [
  {
    id: 'CFP-GEN-L010',
    courseId: 'cfp',
    section: 'CFP-GEN',
    title: 'Time Value of Money - Core Concepts',
    description: 'Understand why money has time value and master the fundamentals of compounding, EAR, and financial calculator setup',
    order: 10,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['TVM Fundamentals', 'Simple vs Compound Interest', 'Effective Annual Rate', 'Rule of 72', 'Financial Calculator Setup'],
    blueprintArea: 'GEN-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The **Time Value of Money (TVM)** is arguably the most fundamental concept in financial planning. Every major financial decision involves comparing dollars across time. Mastering TVM is essential for understanding retirement planning, loan analysis, and investment evaluation."
        },
        {
          title: 'The Core Principle',
          type: 'text',
          content: "**A dollar today is worth more than a dollar tomorrow.**\n\nWhy? Three reasons:\n\n- **Opportunity Cost**: Money today can be invested to earn returns\n- **Inflation**: Purchasing power erodes over time\n- **Risk/Uncertainty**: Future payments are less certain"
        },
        {
          title: 'Simple Interest vs. Compound Interest',
          type: 'text',
          content: "**Simple Interest** is interest earned only on the **original principal**.\n\n$$\\text{FV} = \\text{PV} \\times (1 + r \\times n)$$\n\n**Compound Interest** is interest earned on **principal PLUS accumulated interest**.\n\n$$\\text{FV} = \\text{PV} \\times (1 + r)^n$$"
        },
        {
          title: '📊 Comparing Simple vs. Compound Interest',
          type: 'example',
          content: "**$10,000 at 5% for 3 years:**\n\n**Simple Interest:**\n- Year 1: $10,000 × 0.05 = $500\n- Year 2: $10,000 × 0.05 = $500\n- Year 3: $10,000 × 0.05 = $500\n- **Total Interest**: $1,500 | **FV**: $11,500\n\n**Compound Interest:**\n- Year 1: $10,000 × 1.05 = $10,500\n- Year 2: $10,500 × 1.05 = $11,025\n- Year 3: $11,025 × 1.05 = $11,576.25\n- **Total Interest**: $1,576.25 | **FV**: $11,576.25\n\n**Key Insight**: Compounding produces **exponentially more growth** over time. This is why starting early matters so much."
        },
        {
          title: 'Compounding Frequency',
          type: 'table',
          headers: ['Frequency', 'Periods/Year (m)'],
          rows: [
            ['Annually', '1'],
            ['Semi-annually', '2'],
            ['Quarterly', '4'],
            ['Monthly', '12'],
            ['Daily', '365'],
            ['Continuous', '∞']
          ]
        },
        {
          title: 'Discrete Compounding Formula',
          type: 'text',
          content: "$$\\text{FV} = \\text{PV} \\times \\left(1 + \\frac{r}{m}\\right)^{m \\times t}$$\n\nWhere:\n- r = annual nominal rate\n- m = compounding periods per year\n- t = number of years"
        },
        {
          title: '📊 $10,000 at 8% for 5 Years',
          type: 'table',
          headers: ['Frequency', 'Calculation', 'FV'],
          rows: [
            ['Annual', '$10,000 × (1.08)^5', '$14,693.28'],
            ['Quarterly', '$10,000 × (1.02)^20', '$14,859.47'],
            ['Monthly', '$10,000 × (1.00667)^60', '$14,898.46'],
            ['Daily', '$10,000 × (1.000219)^1825', '$14,918.16']
          ]
        },
        {
          title: 'Effective Annual Rate (EAR)',
          type: 'text',
          content: "The **Effective Annual Rate** converts any nominal rate with compounding to an equivalent annual rate for comparison.\n\n$$\\text{EAR} = \\left(1 + \\frac{r}{m}\\right)^m - 1$$"
        },
        {
          title: '📊 Credit Card EAR Example',
          type: 'example',
          content: "**18% APR (nominal) Compounding Monthly:**\n\n$$\\text{EAR} = \\left(1 + \\frac{0.18}{12}\\right)^{12} - 1$$\n$$\\text{EAR} = (1.015)^{12} - 1 = 1.1956 - 1 = 19.56\\%$$"
        },
        {
          title: '⚠️ Exam Tip: Comparing Rates',
          type: 'warning',
          content: "When comparing loans or investments with different compounding frequencies, **convert to EAR first**. This is the true apples-to-apples comparison."
        },
        {
          title: 'Real Rate of Return (Inflation-Adjusted)',
          type: 'text',
          content: "The **Real Rate** removes the inflation impact from returns.\n\n**Approximate Method (Simple):**\n$$\\text{Real Rate} \\approx \\text{Nominal Rate} - \\text{Inflation Rate}$$\n\n**Exact Method (Fisher Equation):**\n$$\\text{Real Rate} = \\frac{1 + \\text{Nominal}}{1 + \\text{Inflation}} - 1$$"
        },
        {
          title: '📊 Real Rate Example',
          type: 'example',
          content: "**8% Nominal Return, 3% Inflation:**\n\n**Approximate**: 8% - 3% = 5%\n\n**Exact**: (1.08 / 1.03) - 1 = 1.0485 - 1 = **4.85%**\n\n**When to Use Exact**: For precise calculations, especially over long periods. The difference compounds over time."
        },
        {
          title: 'The Rule of 72',
          type: 'text',
          content: "A quick mental math shortcut to estimate **how long it takes to double money**.\n\n$$\\text{Years to Double} \\approx \\frac{72}{\\text{Interest Rate}}$$"
        },
        {
          title: 'Rule of 72 Examples',
          type: 'table',
          headers: ['Rate', 'Years to Double'],
          rows: [
            ['4%', '72 ÷ 4 = 18 years'],
            ['6%', '72 ÷ 6 = 12 years'],
            ['8%', '72 ÷ 8 = 9 years'],
            ['10%', '72 ÷ 10 = 7.2 years'],
            ['12%', '72 ÷ 12 = 6 years']
          ]
        },
        {
          title: '⚠️ Exam Tip: Rule of 72 Quick Checks',
          type: 'warning',
          content: "Use Rule of 72 for quick checks. If an MCQ shows 8% return over ~9 years, the ending value should be approximately double the starting value. Also works in reverse: What rate doubles money in 10 years? r = 72 ÷ 10 = 7.2%"
        },
        {
          title: 'The Five TVM Variables',
          type: 'table',
          headers: ['Variable', 'Calculator Key', 'Description'],
          rows: [
            ['N', 'N', 'Number of periods'],
            ['I/Y', 'I/Y or I/YR', 'Interest rate per period'],
            ['PV', 'PV', 'Present Value'],
            ['PMT', 'PMT', 'Payment amount'],
            ['FV', 'FV', 'Future Value']
          ]
        },
        {
          title: 'The Golden Rule',
          type: 'callout',
          content: "**Know Any 4, Solve for the 5th.** In every problem, you'll be given four variables and asked to find the unknown fifth."
        },
        {
          title: 'Financial Calculator Setup',
          type: 'text',
          content: "**HP 10bII+ Initial Setup:**\n1. Clear all: **[Orange] [C ALL]**\n2. Set P/YR: **1 [Orange] [P/YR]** (for annual problems)\n3. Set END mode: **[Orange] [BEG/END]** (should show no BEG indicator)\n\n**TI BA II Plus Initial Setup:**\n1. Clear TVM: **[2nd] [CLR TVM]**\n2. Set P/Y: **[2nd] [P/Y] 1 [ENTER] [CE/C]** (for annual problems)\n3. Set END mode: **[2nd] [BGN]** (should show END)"
        },
        {
          title: 'Critical Setup Notes',
          type: 'text',
          content: "- **P/Y (Payments per Year)**: Must match your problem's period\n  - Annual payments: P/Y = 1\n  - Monthly payments: P/Y = 12\n- **BEGIN vs. END Mode**:\n  - END = Ordinary annuity (payments at period end)\n  - BEGIN = Annuity due (payments at period start)"
        },
        {
          title: '⚠️ The Sign Convention (Most Common Student Error!)',
          type: 'warning',
          content: "**Cash OUTFLOW (you pay)**: **Negative (-)**\n**Cash INFLOW (you receive)**: **Positive (+)**\n\n**Example**: You invest $10,000 today to receive $15,000 in 5 years:\n- PV = **-10,000** (cash out of your pocket today)\n- FV = **+15,000** (cash into your pocket in the future)"
        },
        {
          title: '🧠 Memory Aid: Sign Convention',
          type: 'callout',
          content: "If you're **paying money out**, it has a **minus sign**. If money is **coming to you**, it's **positive**."
        },
        {
          title: 'Common TVM Problem Types',
          type: 'table',
          headers: ['Problem Type', 'Given', 'Solve For'],
          rows: [
            ['Future value of lump sum', 'PV, I/Y, N', 'FV'],
            ['Present value of lump sum', 'FV, I/Y, N', 'PV'],
            ['Required savings (annuity)', 'FV, I/Y, N', 'PMT'],
            ['Loan payment', 'PV, I/Y, N', 'PMT'],
            ['Required return', 'PV, FV, N', 'I/Y'],
            ['Time to goal', 'PV, FV, I/Y', 'N']
          ]
        },
        {
          title: '🧠 Memory Aid: 5 TVM Keys',
          type: 'callout',
          content: "**Never Invest Poor Money Fast** (N, I/Y, PV, PMT, FV)"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Compound interest: FV = PV × (1 + r)^n - exponential growth',
            'EAR enables comparison of rates with different compounding',
            'Real Rate = (1 + Nominal) / (1 + Inflation) - 1',
            'Rule of 72: Years to double ≈ 72 / rate',
            'Sign convention: outflows negative, inflows positive'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-GEN-L011',
    courseId: 'cfp',
    section: 'CFP-GEN',
    title: 'Present Value Calculations',
    description: 'Calculate present value of single sums, ordinary annuities, annuities due, and perpetuities',
    order: 11,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Present Value', 'Discounting', 'Ordinary Annuities', 'Annuities Due', 'Perpetuities'],
    blueprintArea: 'GEN-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "**Present Value (PV)** answers the question: *\"What is a future sum or stream of payments worth in today's dollars?\"* This is essential for retirement planning, pension valuation, and investment comparison."
        },
        {
          title: 'Applications of Present Value',
          type: 'text',
          content: "Present value is used to:\n\n- Determine how much to save today for a future goal\n- Compare different investment options\n- Value streams of income (pensions, Social Security, annuities)\n- Calculate fair prices for bonds and other fixed income\n- Evaluate whether a purchase is financially worthwhile"
        },
        {
          title: 'Present Value of a Single Sum (Lump Sum)',
          type: 'text',
          content: "$$\\text{PV} = \\frac{\\text{FV}}{(1 + r)^n}$$\n\nOr equivalently:\n\n$$\\text{PV} = \\text{FV} \\times (1 + r)^{-n}$$"
        },
        {
          title: 'Calculator Approach - Single Sum',
          type: 'table',
          headers: ['Input', 'Value'],
          rows: [
            ['N', 'Number of periods'],
            ['I/Y', 'Interest rate per period'],
            ['FV', 'Future value (positive)'],
            ['PMT', '0 (no periodic payments)'],
            ['**Solve for**', '**PV**']
          ]
        },
        {
          title: '📊 Example 1: College Funding',
          type: 'example',
          content: "**Question**: Your client wants to have $100,000 in 10 years for their child's college. If investments earn 7% annually, how much must they invest today?\n\n**Calculator Inputs**:\n- N = 10\n- I/Y = 7\n- FV = 100,000\n- PMT = 0\n- **Solve PV = -$50,834.93**\n\n**Interpretation**: The client must invest $50,834.93 today to have $100,000 in 10 years at 7%."
        },
        {
          title: '📊 Example 2: Retirement Lump Sum Need',
          type: 'example',
          content: "**Question**: A client will need $2,000,000 at retirement in 25 years. If they earn 8% annually, what is that worth today?\n\n**Calculator Inputs**:\n- N = 25\n- I/Y = 8\n- FV = 2,000,000\n- PMT = 0\n- **Solve PV = -$292,017.75**"
        },
        {
          title: 'The Discount Rate',
          type: 'text',
          content: "The interest rate in PV calculations is often called the **discount rate** because we're discounting future values back to present.\n\nChoosing the discount rate depends on:\n- **Market rates** for similar-risk investments\n- **Required return** given the risk\n- **Inflation expectations** (for real PV calculations)"
        },
        {
          title: '⚠️ Key Relationship',
          type: 'warning',
          content: "**Higher discount rate = Lower present value** (future dollars worth less today)"
        },
        {
          title: 'Present Value of an Ordinary Annuity',
          type: 'text',
          content: "An **annuity** is a series of equal payments at regular intervals.\n\n**Ordinary Annuity**: Payments occur at the **END** of each period.\n\n$$\\text{PV}_{\\text{Ordinary}} = \\text{PMT} \\times \\frac{1 - (1 + r)^{-n}}{r}$$"
        },
        {
          title: 'Calculator Approach - Ordinary Annuity (END Mode)',
          type: 'table',
          headers: ['Input', 'Value'],
          rows: [
            ['N', 'Number of payments'],
            ['I/Y', 'Interest rate per period'],
            ['PMT', 'Payment amount'],
            ['FV', '0 (or any remaining value)'],
            ['**Solve for**', '**PV**']
          ]
        },
        {
          title: '📊 Example 3: Pension Valuation',
          type: 'example',
          content: "**Question**: A client will receive $3,000 per month for 20 years from a pension starting at retirement. What is the present value of this pension at retirement, assuming 5% annual discount rate?\n\n**Calculator Inputs** (monthly):\n- N = 20 × 12 = 240\n- I/Y = 5 ÷ 12 = 0.4167 (or set P/Y = 12, I/Y = 5)\n- PMT = 3,000\n- FV = 0\n- **Solve PV = -$454,534.96**\n\n**Interpretation**: The pension has a present value of approximately $454,535 at retirement date."
        },
        {
          title: '📊 Example 4: Car Loan Affordability',
          type: 'example',
          content: "**Question**: A client can afford $500/month for a car loan. How much car can they finance if the rate is 6% annual for 5 years?\n\n**Calculator Inputs** (monthly):\n- N = 60\n- I/Y = 6 ÷ 12 = 0.5\n- PMT = -500 (outflow)\n- FV = 0\n- **Solve PV = $25,862.78**"
        },
        {
          title: 'Present Value of an Annuity Due',
          type: 'text',
          content: "**Annuity Due**: Payments occur at the **BEGINNING** of each period.\n\nCommon examples:\n- Rent payments (due at start of month)\n- Lease payments\n- Insurance premiums\n\n$$\\text{PV}_{\\text{Due}} = \\text{PV}_{\\text{Ordinary}} \\times (1 + r)$$\n\nOr simply calculate in BEGIN mode on your calculator."
        },
        {
          title: '📊 Example 5: Lease Valuation',
          type: 'example',
          content: "**Question**: An office lease requires payments of $2,500/month for 5 years, paid at the beginning of each month. What is the present value at 6%?\n\n**Calculator Inputs** (BEGIN mode, monthly):\n- N = 60\n- I/Y = 0.5\n- PMT = -2,500 (outflow)\n- FV = 0\n- **Solve PV = $129,964.50**\n\nCompare to ordinary annuity (END mode): $129,313.88\nThe difference is approximately one month's interest on the PV."
        },
        {
          title: 'Choosing Between Ordinary and Due',
          type: 'table',
          headers: ['Situation', 'Type', 'Mode'],
          rows: [
            ['Loan payments', 'Ordinary', 'END'],
            ['Mortgage payments', 'Ordinary', 'END'],
            ['Investment contributions at month-end', 'Ordinary', 'END'],
            ['Rent payments', 'Annuity Due', 'BEGIN'],
            ['Lease payments', 'Annuity Due', 'BEGIN'],
            ['Benefits received at start of period', 'Annuity Due', 'BEGIN'],
            ['Retirement income at start of month', 'Annuity Due', 'BEGIN']
          ]
        },
        {
          title: 'Present Value of a Perpetuity',
          type: 'text',
          content: "A **perpetuity** is an infinite stream of equal payments.\n\n$$\\text{PV}_{\\text{Perpetuity}} = \\frac{\\text{PMT}}{r}$$"
        },
        {
          title: '📊 Example 6: Endowment',
          type: 'example',
          content: "**Question**: A university wants to create an endowment to fund a $50,000 annual scholarship forever. If the endowment earns 5%, how much is needed?\n\n$$\\text{PV} = \\frac{50,000}{0.05} = \\$1,000,000$$"
        },
        {
          title: 'Growing Perpetuity',
          type: 'text',
          content: "If payments grow at a constant rate g:\n\n$$\\text{PV} = \\frac{\\text{PMT}}{r - g}$$\n\n**Requirement**: r > g (otherwise PV is infinite)"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'PV = FV / (1 + r)^n for single sum discounting',
            'Ordinary annuity = END of period payments (default mode)',
            'Annuity due = BEGINNING of period payments (× 1+r adjustment)',
            'Higher discount rate produces lower present value',
            'Perpetuity PV = PMT / r (for infinite payments)'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-GEN-L012',
    courseId: 'cfp',
    section: 'CFP-GEN',
    title: 'Future Value Calculations',
    description: 'Calculate future value of lump sums and annuities, and understand the power of compound growth',
    order: 12,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Future Value', 'Compound Growth', 'Retirement Projections', 'Cost of Waiting', 'Inflation-Adjusted FV'],
    blueprintArea: 'GEN-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "**Future Value (FV)** answers the question: *\"What will today's money or a series of payments be worth at some future date?\"* This is critical for projecting retirement balances, college savings, and understanding the impact of early vs. late savings."
        },
        {
          title: 'Applications of Future Value',
          type: 'text',
          content: "Future value calculations are used to:\n\n- Project retirement account balances\n- Estimate college fund accumulation\n- Set savings goals for major purchases\n- Understand the impact of early vs. late savings\n- Model portfolio growth scenarios"
        },
        {
          title: 'Future Value of a Single Sum (Lump Sum)',
          type: 'text',
          content: "$$\\text{FV} = \\text{PV} \\times (1 + r)^n$$"
        },
        {
          title: 'Calculator Approach - Single Sum',
          type: 'table',
          headers: ['Input', 'Value'],
          rows: [
            ['N', 'Number of periods'],
            ['I/Y', 'Interest rate per period'],
            ['PV', 'Present value (negative if outflow)'],
            ['PMT', '0 (no periodic payments)'],
            ['**Solve for**', '**FV**']
          ]
        },
        {
          title: '📊 Example 1: Investment Growth',
          type: 'example',
          content: "**Question**: A client invests $25,000 today. What will it be worth in 20 years at 8% annually?\n\n**Calculator Inputs**:\n- N = 20\n- I/Y = 8\n- PV = -25,000\n- PMT = 0\n- **Solve FV = $116,523.90**\n\n**The Power of Time**: That's nearly 5× the original investment!"
        },
        {
          title: '📊 Example 2: The Power of Starting Early',
          type: 'example',
          content: "**Question**: Compare investing $10,000 at age 25 vs. age 35, both at 7% until age 65.\n\n**Age 25 Investor** (40 years):\n- FV = $10,000 × (1.07)^40 = **$149,744.58**\n\n**Age 35 Investor** (30 years):\n- FV = $10,000 × (1.07)^30 = **$76,122.55**\n\n**Insight**: The early investor has nearly **2× the ending value** from just 10 extra years!"
        },
        {
          title: 'Future Value of an Ordinary Annuity',
          type: 'text',
          content: "Regular contributions at the **END** of each period.\n\n$$\\text{FV}_{\\text{Ordinary}} = \\text{PMT} \\times \\frac{(1 + r)^n - 1}{r}$$"
        },
        {
          title: 'Calculator Approach - Ordinary Annuity (END Mode)',
          type: 'table',
          headers: ['Input', 'Value'],
          rows: [
            ['N', 'Number of payments'],
            ['I/Y', 'Interest rate per period'],
            ['PV', '0 (or beginning balance)'],
            ['PMT', 'Payment amount (negative if outflow)'],
            ['**Solve for**', '**FV**']
          ]
        },
        {
          title: '📊 Example 3: Monthly Retirement Savings',
          type: 'example',
          content: "**Question**: A client saves $500/month for 30 years at 7% annual return. What's the ending balance?\n\n**Calculator Inputs** (monthly):\n- N = 360\n- I/Y = 7 ÷ 12 = 0.5833\n- PV = 0\n- PMT = -500\n- **Solve FV = $609,985.19**\n\n**Insight**: Total contributions = $180,000. Growth = $429,985 (70% of total!)"
        },
        {
          title: '📊 Example 4: Annual 401(k) Contributions',
          type: 'example',
          content: "**Question**: A client contributes $24,500/year (2026 limit) to a 401(k) for 25 years at 8%. What's the balance?\n\n**Calculator Inputs** (annual):\n- N = 25\n- I/Y = 8\n- PV = 0\n- PMT = -24,500\n- **Solve FV = $1,791,095**"
        },
        {
          title: 'Future Value of an Annuity Due',
          type: 'text',
          content: "Contributions at the **BEGINNING** of each period.\n\n$$\\text{FV}_{\\text{Due}} = \\text{FV}_{\\text{Ordinary}} \\times (1 + r)$$\n\nSet calculator to BEGIN mode for annuity due calculations."
        },
        {
          title: '📊 Example 5: Annual Investment at Year Start',
          type: 'example',
          content: "**Question**: A client invests $6,000/year into a Roth IRA at the beginning of each year for 35 years at 9%. What's the FV?\n\n**Calculator Inputs** (BEGIN mode):\n- N = 35\n- I/Y = 9\n- PV = 0\n- PMT = -6,000\n- **Solve FV = $1,411,461.56**\n\nCompare to ordinary (END mode): $1,294,917.94\nDifference: **$116,543 extra** just from contributing at start of year!"
        },
        {
          title: 'Combining Lump Sum and Annuity',
          type: 'text',
          content: "Many real scenarios involve **both** a starting balance AND regular contributions."
        },
        {
          title: '📊 Example 6: Existing Savings Plus Contributions',
          type: 'example',
          content: "**Question**: A client has $100,000 now and will add $10,000/year for 20 years at 7%. What's the ending balance?\n\n**Calculator Inputs**:\n- N = 20\n- I/Y = 7\n- PV = -100,000 (current balance)\n- PMT = -10,000 (annual additions)\n- **Solve FV = $796,754.57**\n\n**Breakdown**:\n- FV of $100,000 alone: $386,968\n- FV of $10,000/yr alone: $409,787\n- Combined: $796,755"
        },
        {
          title: 'The Cost of Waiting',
          type: 'table',
          headers: ['Start Age', 'End Age', 'Total Contributions', 'Ending Balance'],
          rows: [
            ['25', '55', '$180,000', '$745,179'],
            ['30', '60', '$180,000', '$745,179'],
            ['25', '65', '$240,000', '$1,745,501'],
            ['35', '65', '$180,000', '$745,179']
          ]
        },
        {
          title: '⚠️ The True Cost of a 10-Year Delay',
          type: 'warning',
          content: "Starting at 25 vs. 35 (same contributions, but 10 more years) → **$1 million more!**\n\nIf you delay 10 years but want the same outcome, you must:\n- Save **2.23× as much per month** to catch up\n- Or accept **less than half** the ending balance"
        },
        {
          title: '📊 Example 7: Inflation-Adjusted FV',
          type: 'example',
          content: "To plan in **today's purchasing power**, discount the FV by inflation.\n\n**Question**: A client will have $1,000,000 in 30 years. If inflation averages 3%, what's that worth in today's dollars?\n\n$$\\text{Real FV} = \\frac{\\$1,000,000}{(1.03)^{30}} = \\frac{\\$1,000,000}{2.4273} = \\$412,000$$\n\n**Insight**: That million dollars will only buy what $412,000 buys today."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'FV = PV × (1 + r)^n for lump sum growth',
            'Annuity due (BEGIN) produces ~1 period more growth than ordinary',
            'Starting early beats saving more later (time is the most powerful variable)',
            'Combine lump sum + annuity for realistic projections',
            'Divide FV by (1 + inflation)^n for real purchasing power'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-GEN-L013',
    courseId: 'cfp',
    section: 'CFP-GEN',
    title: 'Annuities - Ordinary and Due',
    description: 'Distinguish between ordinary annuities and annuities due, and apply each to common financial scenarios',
    order: 13,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Ordinary Annuities', 'Annuities Due', 'Calculator Modes', 'Deferred Annuities', 'Retirement Income'],
    blueprintArea: 'GEN-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "**Annuities** are streams of equal payments made at regular intervals. Understanding the timing of payments is crucial for accurate calculations—using the wrong mode can throw off your answer significantly."
        },
        {
          title: 'The Two Types of Annuities',
          type: 'text',
          content: "**Ordinary Annuity (Annuity in Arrears)**\nPayments occur at the **END** of each period.\n\nCommon Examples:\n- Loan payments (mortgage, auto loan)\n- Bond coupon payments\n- Investment contributions made at month-end\n- Salary paid at end of pay period\n\n**Annuity Due (Annuity in Advance)**\nPayments occur at the **BEGINNING** of each period.\n\nCommon Examples:\n- Rent payments\n- Lease payments\n- Insurance premiums\n- Retirement income (received at start of month)\n- College tuition (paid at start of semester)"
        },
        {
          title: '📊 Why Timing Matters: $1,000/month for 30 years at 8%',
          type: 'table',
          headers: ['Type', 'Future Value'],
          rows: [
            ['Ordinary Annuity (END mode)', '$1,490,359'],
            ['Annuity Due (BEGIN mode)', '$1,500,296']
          ]
        },
        {
          title: 'The Annuity Relationship',
          type: 'text',
          content: "**Difference**: $9,937 more with annuity due!\n\n**Why?**: Each payment has one more period to compound when made at the beginning.\n\n$$\\text{Annuity Due} = \\text{Ordinary Annuity} \\times (1 + r)$$\n\nThis applies to both PV and FV calculations."
        },
        {
          title: 'Decision Framework',
          type: 'callout',
          content: "Ask: **\"When does the payment occur relative to the period?\"**"
        },
        {
          title: 'Timing Reference',
          type: 'table',
          headers: ['Timing', 'Type', 'Calculator Mode'],
          rows: [
            ['End of month/year/period', 'Ordinary', 'END'],
            ['Beginning of month/year/period', 'Due', 'BEGIN']
          ]
        },
        {
          title: 'Common Scenarios Reference',
          type: 'table',
          headers: ['Scenario', 'Type', 'Why'],
          rows: [
            ['Mortgage payments', 'Ordinary', 'Payments due at month-end'],
            ['Car loan payments', 'Ordinary', 'Payments due at month-end'],
            ['401(k) contributions', 'Ordinary', 'Contributions with paycheck'],
            ['Rent/Lease payments', 'Due', 'Due at start of month'],
            ['Insurance premiums', 'Due', 'Due at start of coverage'],
            ['Retirement withdrawals', 'Often Due', 'Income needed at start'],
            ['Tuition payments', 'Due', 'Due at start of semester']
          ]
        },
        {
          title: 'Calculator Mode Settings',
          type: 'text',
          content: "**HP 10bII+**\n- **Set END mode**: [Orange] [BEG/END] until display shows no \"BEG\"\n- **Set BEGIN mode**: [Orange] [BEG/END] until display shows \"BEG\"\n\n**TI BA II Plus**\n- **Set END mode**: [2nd] [BGN] → display should show \"END\"\n- **Set BEGIN mode**: [2nd] [BGN] [2nd] [SET] → display shows \"BGN\""
        },
        {
          title: '⚠️ Exam Tip: Verify Mode Before Solving',
          type: 'warning',
          content: "Always verify your mode BEFORE solving. **Wrong mode = wrong answer.**"
        },
        {
          title: 'Converting Between Types',
          type: 'text',
          content: "If you calculate in the wrong mode, you can convert:\n\n$$\\text{Annuity Due} = \\text{Ordinary Annuity} \\times (1 + r)$$"
        },
        {
          title: '📊 Conversion Example',
          type: 'example',
          content: "You calculated FV = $500,000 (ordinary) at 6%.\n\nTo get annuity due FV:\n$$\\text{FV}_{\\text{Due}} = \\$500,000 \\times 1.06 = \\$530,000$$"
        },
        {
          title: '📊 Application 1: Retirement Income Planning',
          type: 'example',
          content: "**Question**: A retiree needs $5,000/month at the **beginning** of each month for 25 years. How much should they have at retirement to fund this at 5%?\n\n**This is an annuity due** (income at start of month).\n\n**Calculator (BEGIN mode)**:\n- N = 300 (25 × 12)\n- I/Y = 0.4167 (5 ÷ 12)\n- PMT = 5,000\n- FV = 0\n- **Solve PV = -$859,242.21**"
        },
        {
          title: '📊 Application 2: Lease vs. Purchase Analysis',
          type: 'example',
          content: "**Question**: A car lease requires $450/month for 36 months (paid at month start). What is the present value of the lease at 6%?\n\n**Calculator (BEGIN mode)**:\n- N = 36\n- I/Y = 0.5\n- PMT = -450\n- FV = 0\n- **Solve PV = $14,777.95**"
        },
        {
          title: '📊 Application 3: Savings Goal',
          type: 'example',
          content: "**Question**: A client wants $200,000 in 18 years for their child's education. If they invest at month-end and earn 7%, what monthly payment is needed?\n\n**This is ordinary annuity** (contributions at month-end).\n\n**Calculator (END mode)**:\n- N = 216\n- I/Y = 0.5833\n- PV = 0\n- FV = 200,000\n- **Solve PMT = -$476.21**"
        },
        {
          title: 'Deferred Annuities',
          type: 'text',
          content: "Sometimes payments **don't start immediately**."
        },
        {
          title: '📊 Example: Retirement Starting in 10 Years',
          type: 'example',
          content: "**Question**: A client will receive $3,000/month (at month start) for 20 years, but payments don't begin for 10 years. At 6%, what's the present value today?\n\n**Step 1**: Calculate PV at the START of payments (10 years from now)\n- N = 240\n- I/Y = 0.5\n- PMT = 3,000\n- FV = 0\n- **PV (at year 10) = $420,124.58**\n\n**Step 2**: Discount that value back 10 years\n- N = 120\n- I/Y = 0.5\n- FV = 420,124.58\n- PMT = 0\n- **PV (today) = $231,408.19**"
        },
        {
          title: '🧠 Memory Aids',
          type: 'callout',
          content: "- **BEGIN = Annuity Due** (payments at Beginning)\n- **END = Ordinary Annuity** (payments at End)\n- **Rent is Due at the start** → Annuity Due"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Ordinary annuity = END of period payments (loans, most contributions)',
            'Annuity due = BEGINNING of period (rent, leases, retirement income)',
            'Annuity Due = Ordinary × (1 + r) for both PV and FV',
            'Annuity due always produces higher values (extra compounding period)',
            'Always check your calculator mode (END vs. BEGIN) before computing'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-GEN-L014',
    courseId: 'cfp',
    section: 'CFP-GEN',
    title: 'Uneven Cash Flows - NPV and IRR',
    description: 'Calculate Net Present Value and Internal Rate of Return for irregular cash flows and investment decisions',
    order: 14,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['NPV', 'IRR', 'Uneven Cash Flows', 'Investment Selection', 'Serial Problems'],
    blueprintArea: 'GEN-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Real-world investments often have **irregular cash flows** that don't fit the constant annuity pattern. Net Present Value (NPV) and Internal Rate of Return (IRR) are the tools for these situations—essential for business valuation, pension decisions, and real estate analysis."
        },
        {
          title: 'Net Present Value (NPV)',
          type: 'text',
          content: "**NPV** is the sum of all cash flows (inflows and outflows) discounted to present value at a required rate of return.\n\n$$\\text{NPV} = \\sum_{t=0}^{n} \\frac{CF_t}{(1+r)^t}$$\n\nOr equivalently:\n\n$$\\text{NPV} = -\\text{Initial Investment} + \\sum_{t=1}^{n} \\frac{CF_t}{(1+r)^t}$$"
        },
        {
          title: 'NPV Decision Rule',
          type: 'table',
          headers: ['NPV Result', 'Decision'],
          rows: [
            ['**NPV > 0**', 'Accept the investment (adds value)'],
            ['**NPV = 0**', 'Indifferent (earns exactly required return)'],
            ['**NPV < 0**', 'Reject the investment (destroys value)']
          ]
        },
        {
          title: '📊 Example 1: NPV Calculation - Manual',
          type: 'example',
          content: "**Investment**: $100,000 today\n**Cash flows**: Year 1 = $30,000, Year 2 = $40,000, Year 3 = $50,000\n**Required return**: 10%\n\n| Year | Cash Flow | Discount Factor | Present Value |\n|------|-----------|-----------------|---------------|\n| 0 | -$100,000 | 1.0000 | -$100,000.00 |\n| 1 | +$30,000 | 0.9091 | +$27,272.73 |\n| 2 | +$40,000 | 0.8264 | +$33,057.85 |\n| 3 | +$50,000 | 0.7513 | +$37,565.74 |\n| | | **NPV** | **-$2,103.68** |\n\n**Decision**: NPV < 0, so **reject** this investment at 10% required return."
        },
        {
          title: 'NPV Calculation - HP 10bII+',
          type: 'text',
          content: "1. **Clear**: [Orange] [C ALL]\n2. **Enter CF0** (initial investment): **-100000** [CF]\n3. **Enter CF1**: **30000** [CF]\n4. **Enter CF2**: **40000** [CF]\n5. **Enter CF3**: **50000** [CF]\n6. **Enter Rate**: **10** [I/YR]\n7. **Calculate NPV**: [Orange] [NPV]\n8. **Display**: -2,103.68"
        },
        {
          title: 'NPV Calculation - TI BA II Plus',
          type: 'text',
          content: "1. **Clear**: [CF] [2nd] [CLR Work]\n2. **Enter CF0**: **-100000** [ENTER] [↓]\n3. **Enter CF1**: **30000** [ENTER] [↓] [↓]\n4. **Enter CF2**: **40000** [ENTER] [↓] [↓]\n5. **Enter CF3**: **50000** [ENTER] [↓] [↓]\n6. **Calculate**: [NPV] → enter I = **10** [ENTER] [↓] [CPT]\n7. **Display**: -2,103.68"
        },
        {
          title: 'Internal Rate of Return (IRR)',
          type: 'text',
          content: "**IRR** is the discount rate that makes NPV equal to zero. It represents the investment's actual rate of return."
        },
        {
          title: 'IRR Decision Rule',
          type: 'table',
          headers: ['Result', 'Decision'],
          rows: [
            ['**IRR > Required Return**', 'Accept'],
            ['**IRR = Required Return**', 'Indifferent'],
            ['**IRR < Required Return**', 'Reject']
          ]
        },
        {
          title: '📊 Example 2: IRR Calculation',
          type: 'example',
          content: "**Investment**: $100,000 today\n**Cash flows**: Year 1 = $30,000, Year 2 = $40,000, Year 3 = $50,000\n\nUsing the same cash flow register from NPV:\n\n**HP 10bII+**: After entering cash flows: [Orange] [IRR/YR] → **Display: 8.90%**\n\n**TI BA II Plus**: After entering cash flows: [IRR] [CPT] → **Display: 8.90%**\n\n**Interpretation**: This investment returns 8.90%. If required return is 10%, **reject** (IRR < required). This confirms the negative NPV."
        },
        {
          title: '⚠️ NPV vs. IRR: When They Conflict',
          type: 'warning',
          content: "NPV and IRR usually agree, but can conflict when:\n\n1. **Mutually Exclusive Projects** (choosing one)\n2. **Different Reinvestment Assumptions** - NPV assumes reinvestment at discount rate (realistic); IRR assumes reinvestment at IRR (often unrealistic)\n3. **Multiple IRRs** - Non-conventional cash flows can have multiple IRRs\n\n**Rule**: When forced to choose, **use NPV**. It measures actual value creation."
        },
        {
          title: '📊 Conflicting Results Example',
          type: 'table',
          headers: ['Project', 'Initial Cost', 'Year 1', 'Year 2', 'NPV @ 10%', 'IRR'],
          rows: [
            ['A', '-$100,000', '$80,000', '$60,000', '$23,554', '26.9%'],
            ['B', '-$50,000', '$35,000', '$35,000', '$10,744', '25.7%']
          ]
        },
        {
          title: 'Conflict Resolution',
          type: 'text',
          content: "**Conflict**: B has higher IRR but A has higher NPV.\n\n**Rule**: When forced to choose, **use NPV**. It measures actual value creation."
        },
        {
          title: '📊 Serial (Two-Stage) Problems',
          type: 'example',
          content: "**Situation**:\n- Client is age 40, wants $60,000/year (beginning of year) for 25 years starting at age 65\n- Investments earn 7% before retirement, 5% during retirement\n- What annual savings needed (end of year) from now to retirement?\n\n**Step 1: Calculate amount needed at retirement (age 65)**\nIn BEGIN mode:\n- N = 25\n- I/Y = 5\n- PMT = 60,000\n- FV = 0\n- **Solve PV = $887,449.10** (amount needed at retirement)\n\n**Step 2: Calculate annual savings needed**\nIn END mode:\n- N = 25 (years to retirement)\n- I/Y = 7\n- PV = 0\n- FV = 887,449.10\n- **Solve PMT = -$14,031.47**\n\n**Answer**: Client must save $14,031.47/year for 25 years."
        },
        {
          title: 'Common CFP Exam Applications',
          type: 'list',
          content: [
            { term: 'Investment Selection', definition: 'Choose between competing investments using NPV' },
            { term: 'Business Valuation', definition: 'NPV of projected cash flows = business value' },
            { term: 'Retirement Planning', definition: 'Two-stage calculation: accumulation → distribution' },
            { term: 'Real Estate Analysis', definition: 'NPV of rental income minus purchase price' },
            { term: 'Pension Buyout Decision', definition: 'NPV of pension payments vs. lump sum offer' }
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'NPV = sum of all cash flows discounted to present value',
            'NPV > 0 → Accept; NPV < 0 → Reject',
            'IRR = discount rate where NPV = 0',
            'When NPV and IRR conflict, prefer NPV (measures value added)',
            'Use cash flow register for uneven cash flows'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-GEN-L015',
    courseId: 'cfp',
    section: 'CFP-GEN',
    title: 'Loan Amortization and Payment Calculations',
    description: 'Calculate loan payments, understand amortization mechanics, and evaluate refinancing decisions',
    order: 15,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Loan Payment', 'Amortization', 'Principal vs Interest', 'Refinancing', 'APR vs EAR'],
    blueprintArea: 'GEN-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Understanding loan mechanics is essential for advising clients on mortgages, auto loans, student loans, and refinancing decisions. Knowing how amortization works helps clients understand where their money goes."
        },
        {
          title: 'Basic Loan Payment Calculation',
          type: 'text',
          content: "A loan payment is simply an **annuity** where you're solving for PMT."
        },
        {
          title: 'Loan Payment Setup',
          type: 'table',
          headers: ['Variable', 'Description'],
          rows: [
            ['PV', 'Loan amount (positive)'],
            ['N', 'Number of payment periods'],
            ['I/Y', 'Interest rate per period'],
            ['FV', '0 (fully amortized) or balloon amount'],
            ['**Solve**', '**PMT** (will be negative = outflow)']
          ]
        },
        {
          title: '📊 Example 1: Mortgage Payment',
          type: 'example',
          content: "**Loan**: $400,000\n**Rate**: 6.5% annual\n**Term**: 30 years\n\n**Calculator Inputs (monthly)**:\n- N = 360\n- I/Y = 6.5 ÷ 12 = 0.5417\n- PV = 400,000\n- FV = 0\n- **Solve PMT = -$2,528.27**"
        },
        {
          title: 'Understanding Amortization',
          type: 'text',
          content: "Each payment has two components:\n\n1. **Interest** = Outstanding Balance × Periodic Rate\n2. **Principal** = Payment - Interest"
        },
        {
          title: '📊 Early Payments: Mostly Interest',
          type: 'example',
          content: "For the $400,000 mortgage above (first payment):\n\n**Interest** = $400,000 × 0.065/12 = **$2,166.67**\n**Principal** = $2,528.27 - $2,166.67 = **$361.60**\n\n**Over 85% of the first payment is interest!**"
        },
        {
          title: '📊 Later Payments: Mostly Principal',
          type: 'example',
          content: "For payment #300 (after 25 years):\n\n- Remaining balance ≈ $143,000\n- Interest = $143,000 × 0.005417 ≈ **$775**\n- Principal = $2,528.27 - $775 ≈ **$1,753**"
        },
        {
          title: 'Amortization Schedule Excerpt',
          type: 'table',
          headers: ['Payment #', 'Payment', 'Interest', 'Principal', 'Balance'],
          rows: [
            ['1', '$2,528', '$2,167', '$361', '$399,639'],
            ['2', '$2,528', '$2,165', '$363', '$399,276'],
            ['12', '$2,528', '$2,146', '$382', '$395,548'],
            ['60', '$2,528', '$2,017', '$511', '$370,206'],
            ['120', '$2,528', '$1,817', '$711', '$332,199'],
            ['180', '$2,528', '$1,530', '$998', '$280,212'],
            ['240', '$2,528', '$1,120', '$1,408', '$203,876'],
            ['300', '$2,528', '$524', '$2,004', '$94,116'],
            ['360', '$2,528', '$13', '$2,515', '$0']
          ]
        },
        {
          title: 'Solving for Other Variables',
          type: 'text',
          content: "You can solve for any of the five TVM variables when you know the other four."
        },
        {
          title: '📊 Find the Loan Amount You Can Afford',
          type: 'example',
          content: "**Question**: A client can afford $1,500/month. What mortgage can they afford at 6% for 30 years?\n\n**Calculator Inputs**:\n- N = 360\n- I/Y = 0.5\n- PMT = -1,500\n- FV = 0\n- **Solve PV = $250,187.30**"
        },
        {
          title: '📊 Find the Rate on an Existing Loan',
          type: 'example',
          content: "**Question**: A client pays $850/month on a $45,000 auto loan for 5 years. What's the rate?\n\n**Calculator Inputs**:\n- N = 60\n- PV = 45,000\n- PMT = -850\n- FV = 0\n- **Solve I/Y = 0.573% per month × 12 = 6.88% annually**"
        },
        {
          title: '📊 Find How Long to Pay Off',
          type: 'example',
          content: "**Question**: A client has a $15,000 credit card balance at 18% and can pay $500/month. How long to pay off?\n\n**Calculator Inputs**:\n- I/Y = 1.5 (18 ÷ 12)\n- PV = 15,000\n- PMT = -500\n- FV = 0\n- **Solve N = 38.6 months (about 3.2 years)**"
        },
        {
          title: 'Remaining Balance After X Payments',
          type: 'text',
          content: "The remaining balance equals the present value of remaining payments.\n\n**Method 1**: Use AMORT function on many calculators\n**Method 2**: Calculate directly"
        },
        {
          title: '📊 Find Remaining Balance',
          type: 'example',
          content: "**Question**: What's the balance on the $400,000 mortgage after 5 years (60 payments)?\n\n**Calculator Inputs**:\n- N = 300 (remaining payments)\n- I/Y = 0.5417\n- PMT = -2,528.27\n- FV = 0\n- **Solve PV = $370,206** (remaining balance)"
        },
        {
          title: 'Extra Principal Payments',
          type: 'text',
          content: "Making extra payments dramatically shortens loan term and saves interest."
        },
        {
          title: '📊 $200 Extra Per Month Impact',
          type: 'example',
          content: "Original: $400,000 at 6.5% for 30 years → Payment = $2,528.27\n\nWith $200 extra: Total payment = $2,728.27\n\n**Calculator Inputs**:\n- I/Y = 0.5417\n- PV = 400,000\n- PMT = -2,728.27\n- FV = 0\n- **Solve N = 293 months (24.4 years)**\n\n**Savings**:\n- Time: 5.6 years earlier\n- Original interest: $910,179\n- New interest: $799,304\n- **Interest saved: $110,875**"
        },
        {
          title: 'Refinancing Analysis',
          type: 'text',
          content: "**Key Factors**:\n1. **New payment** vs. old payment\n2. **Closing costs** (typically 2-5% of loan)\n3. **Break-even period** (time to recoup costs)\n4. **Time remaining** in home"
        },
        {
          title: '📊 Refinancing Decision Example',
          type: 'example',
          content: "**Current**: $350,000 remaining at 7%, 25 years left → $2,473/month\n**New offer**: 5.5%, 25 years, $8,000 closing costs\n\n**New Payment**:\n- N = 300\n- I/Y = 0.4583\n- PV = 350,000\n- FV = 0\n- **PMT = $2,154/month**\n\n**Monthly Savings**: $2,473 - $2,154 = $319\n**Break-even**: $8,000 ÷ $319 = **25 months**\n\n**Decision**: If staying 25+ months, refinance makes sense."
        },
        {
          title: 'APR vs. Effective Rate',
          type: 'text',
          content: "**APR (Annual Percentage Rate)**\nNominal rate that must be disclosed by lenders. Includes fees but quoted without compounding.\n\n**Effective Interest Rate**\nTrue annual cost including compounding frequency.\n\n$$\\text{Effective Rate} = \\left(1 + \\frac{APR}{m}\\right)^m - 1$$"
        },
        {
          title: '📊 APR vs. Effective Example',
          type: 'example',
          content: "**6% APR Compounded Monthly:**\n\n$$\\text{Effective} = \\left(1 + \\frac{0.06}{12}\\right)^{12} - 1 = 6.17\\%$$"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Loan payment = Annuity PMT with loan amount as PV',
            'Early payments are mostly interest; later mostly principal',
            'Extra principal payments dramatically reduce total interest',
            'Refinance break-even = Closing costs ÷ Monthly savings',
            'Effective Rate = (1 + APR/m)^m - 1'
          ]
        }
      ]
    }
  }
];

export default CFP_GEN3_LESSONS;
