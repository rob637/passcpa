/**
 * CFP Domain 2: General Principles of Financial Planning
 * Area GEN-1: Financial Planning Process
 * 
 * These lessons cover the foundational 7-step financial planning process
 * as defined by the CFP Board Practice Standards.
 * 
 * CONVERTED TO STRUCTURED FORMAT - matches CPA lesson structure
 */

import type { Lesson } from '../../../types';

export const CFP_GEN1_LESSONS: Lesson[] = [
  {
    id: 'CFP-GEN-L001',
    courseId: 'cfp',
    section: 'CFP-GEN',
    title: 'The 7-Step Financial Planning Process',
    description: 'Master the seven interconnected steps that CFP® professionals must follow when providing financial planning',
    order: 1,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Financial Planning Process', 'Practice Standards', 'Client Engagement', 'Implementation'],
    blueprintArea: 'GEN-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The 7-step financial planning process is the backbone of the CFP® certification. The CFP Board's Practice Standards establish these steps as MANDATORY when providing financial planning. Failure to follow them can result in disciplinary action, professional liability, and poor client outcomes. This topic is heavily tested on the CFP exam."
        },
        {
          title: 'Overview of the Process',
          type: 'text',
          content: "The CFP Board's Practice Standards establish **seven interconnected steps** that certificants must follow when providing **Financial Planning** (as opposed to Financial Advice, which has fewer requirements).\n\nThese steps are **sequential but iterative**—you may need to return to earlier steps as new information emerges or circumstances change."
        },
        {
          title: '🧠 Memory Aid: U-I-A-D-P-I-M',
          type: 'callout',
          content: "**U**nderstand → **I**dentify → **A**nalyze → **D**evelop → **P**resent → **I**mplement → **M**onitor\n\n*\"Under Intense Analysis, Decisions Propel Implementation Momentum\"*\n\nThis mnemonic helps you remember the 7 steps in order—expect questions that test whether you know which step comes when!"
        },
        {
          title: 'The Seven Steps',
          type: 'table',
          headers: ['Step', 'Name', 'Key Activities'],
          rows: [
            ['1', 'Understanding Client Circumstances', 'Gather quantitative & qualitative data'],
            ['2', 'Identifying and Selecting Goals', 'Transform wishes into SMART goals'],
            ['3', 'Analyzing Current & Alternative Actions', 'Run projections, identify gaps'],
            ['4', 'Developing Recommendations', 'Select best course of action'],
            ['5', 'Presenting Recommendations', 'Communicate plan clearly'],
            ['6', 'Implementing Recommendations', 'Execute the plan'],
            ['7', 'Monitoring Progress', 'Ongoing review and updates']
          ]
        },
        {
          title: 'Step 1: Understanding Client Circumstances',
          type: 'text',
          content: "This is **data gathering**—both quantitative (numbers) and qualitative (attitudes, values, goals).\n\n**Quantitative Data:**\n• Assets: Bank accounts, investments, real estate, personal property\n• Liabilities: Mortgages, loans, credit card balances\n• Income: Salary, bonuses, self-employment, passive income, Social Security\n• Expenses: Fixed and variable spending\n• Insurance policies: Life, health, disability, property, liability\n• Tax information: Returns, W-2s, 1099s, K-1s\n• Estate documents: Wills, trusts, beneficiary designations\n\n**Qualitative Data:**\n• Goals and dreams\n• Values and priorities\n• Risk tolerance (ability and willingness)\n• Time horizons\n• Health status and family dynamics"
        },
        {
          title: 'Step 2: Identifying and Selecting Goals',
          type: 'text',
          content: "Goals must be translated from vague wishes into actionable targets using the **SMART framework**:\n\n• **S**pecific: \"Save for a vacation home\" not \"save more money\"\n• **M**easurable: \"$500,000 purchase price\"\n• **A**chievable: Within realistic income/savings capacity\n• **R**elevant: Aligned with client values\n• **T**ime-bound: \"Within 5 years\"\n\n**Goal Prioritization:** Clients cannot fund all goals. Help them prioritize:\n1. **Needs**: Emergency fund, adequate insurance, retirement minimum\n2. **Wants**: Lifestyle upgrades, vacation home, early retirement\n3. **Wishes**: Luxury items, large inheritance"
        },
        {
          title: '⚠️ Exam Trap: Conflicting Goals',
          type: 'warning',
          content: "Questions often present scenarios where clients have conflicting goals (early retirement vs. funding college, large home vs. savings rate). You must identify the priority order and help clients make trade-offs. The correct answer usually involves quantifying the trade-off, not choosing for the client."
        },
        {
          title: 'Step 3: Analyzing Current & Alternative Courses',
          type: 'text',
          content: "This is the **analytical phase** where you determine:\n• Can the client achieve their goals with current behavior?\n• What gaps exist between current trajectory and goals?\n• What alternative strategies could close those gaps?\n\n**Analysis Techniques:**\n• Cash flow projections\n• Retirement needs analysis (Monte Carlo or deterministic)\n• Insurance gap analysis\n• Tax efficiency review\n• Estate plan review\n\n**Identifying Alternatives:** For each goal gap, brainstorm options:\n• Save more / spend less\n• Delay the goal (retire at 67 instead of 62)\n• Accept more investment risk\n• Downsize the goal\n• Use alternative funding (home equity, inheritance)"
        },
        {
          title: 'Step 4: Developing Recommendations',
          type: 'text',
          content: "Select the **best course of action** from the alternatives analyzed.\n\n**Requirements:**\n• Must be in the client's **best interest** (Fiduciary Duty)\n• Must be **suitable** for the client's circumstances\n• Must be **consistent** with goals and values\n• Must consider **tax implications**\n• Must be **realistic** to implement\n\n**Documentation must include:**\n• What is being recommended\n• Why it is being recommended\n• Expected outcome\n• Risks and trade-offs"
        },
        {
          title: 'Step 5: Presenting Recommendations',
          type: 'text',
          content: "Communicate the plan **clearly and completely** so the client can make informed decisions.\n\n**Presentation Must Include:**\n• Summary of goals and priorities\n• Current status assessment\n• Recommended strategies and actions\n• Assumptions used (inflation, returns, life expectancy)\n• Risks and limitations\n• Alternatives considered and why rejected\n\n**Best Practices:**\n• Use visual aids (charts, graphs)\n• Avoid jargon; ensure client understanding\n• Encourage questions\n• Confirm understanding before proceeding"
        },
        {
          title: 'Step 6: Implementing Recommendations',
          type: 'text',
          content: "Execute the plan with clear assignment of **responsibilities**.\n\n**Implementation Questions:**\n• **Who** is responsible for each action? (Planner, client, attorney, CPA)\n• **What** specific actions need to occur?\n• **When** must each action be completed?\n• **What documentation** is needed?"
        },
        {
          title: 'Implementation Actions by Area',
          type: 'table',
          headers: ['Area', 'Common Actions'],
          rows: [
            ['Investments', 'Open accounts, transfer assets, rebalance portfolio'],
            ['Insurance', 'Apply for policies, update beneficiaries'],
            ['Retirement', 'Increase 401(k) contributions, open IRA'],
            ['Estate', 'Draft will, create trust, fund trust'],
            ['Tax', 'Adjust withholdings, make estimated payments']
          ]
        },
        {
          title: 'Step 7: Monitoring Progress',
          type: 'text',
          content: "Financial planning is **ongoing**, not a one-time event.\n\n**Scheduled Reviews:** Annually, semi-annually, or quarterly for complex situations.\n\n**Trigger Events Requiring Review:**\n• Marriage, divorce, or death\n• Birth or adoption of a child\n• Job change, promotion, or termination\n• Inheritance or windfall\n• Major purchase or sale\n• Tax law changes\n• Significant market movements\n• Health changes\n\n**Update Process:**\n1. Gather updated data\n2. Assess progress toward goals\n3. Identify new goals or changed circumstances\n4. Revise recommendations as needed\n5. Document all changes and rationale"
        },
        {
          title: '⚠️ When Is the Full Process Required?',
          type: 'warning',
          content: "The **complete 7-step process** is required when you:\n• Hold yourself out as providing \"financial planning\"\n• Prepare and deliver a \"financial plan\"\n• Provide Financial Planning as defined by CFP Board\n\n**Limited-Scope Engagements:** You may provide Financial Advice (not full planning) when:\n• The engagement is limited to specific topic(s)\n• Scope limitations are clearly disclosed in writing\n• Client agrees to the limited scope\n• You avoid holding yourself out as providing comprehensive planning"
        },
        {
          title: '📊 Practice Application',
          type: 'example',
          content: "**Scenario:** A couple (ages 45 and 43) wants to retire at 65 and fund their two children's college education.\n\n• **Step 1:** Gather financial statements, tax returns, insurance policies; discuss values\n• **Step 2:** Identify specific goals: Retire at 65 with 80% income replacement; fund 4 years of state university for each child\n• **Step 3:** Run projections—current savings rate funds only 60% of retirement; education underfunded by $120,000\n• **Step 4:** Recommend: Increase savings by $800/month, shift asset allocation, open 529 plans\n• **Step 5:** Present comprehensive plan with projections\n• **Step 6:** Client opens 529 accounts, increases 401(k), portfolio rebalanced\n• **Step 7:** Schedule annual reviews; adjust after job promotion"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "The 7 steps are sequential but iterative—you may return to earlier steps as needed",
            "Documentation is critical at every step for compliance and liability protection",
            "The full process is required for 'Financial Planning' but not all client interactions",
            "Monitoring is ongoing—financial plans are living documents",
            "Fiduciary duty applies throughout all seven steps"
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-GEN-L002',
    courseId: 'cfp',
    section: 'CFP-GEN',
    title: 'Client Data Gathering - Quantitative Information',
    description: 'Learn to gather and organize the numerical financial data needed for comprehensive planning',
    order: 2,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Data Gathering', 'Quantitative Analysis', 'Balance Sheet', 'Income Statement'],
    blueprintArea: 'GEN-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Quantitative data forms the foundation of all financial projections and recommendations. Incomplete or inaccurate data leads to inappropriate recommendations and potential liability. The CFP exam frequently tests whether you recognize when more data is needed before making recommendations."
        },
        {
          title: 'Understanding Quantitative Data',
          type: 'text',
          content: "**Quantitative data** consists of objective, numerical facts about a client's financial situation. This is the \"hard data\" needed to perform calculations and build projections.\n\nIncomplete data leads to:\n• Incorrect recommendations\n• Inappropriate risk exposure\n• Missed opportunities\n• Planner liability"
        },
        {
          title: '⚠️ Exam Trap: Missing Information',
          type: 'warning',
          content: "Questions often present scenarios with missing data. The correct answer is frequently \"gather more information before recommending.\" Don't jump to a recommendation when critical data is absent!"
        },
        {
          title: 'Asset Categories',
          type: 'text',
          content: "Assets are organized into three main categories:\n\n**1. Liquid Assets (Cash & Cash Equivalents)**\n• Checking/savings accounts\n• Money market accounts\n• Certificates of deposit\n• Cash value of life insurance\n\n**2. Investment Assets**\n• Taxable brokerage accounts (with cost basis!)\n• Retirement accounts (401k, IRA, 403b)\n• Stock options / RSUs\n• Annuities\n• Cryptocurrency\n\n**3. Personal Use Assets**\n• Primary residence\n• Vacation/second homes\n• Vehicles\n• Jewelry/Art/Collectibles\n• Business interests"
        },
        {
          title: 'Liability Categories',
          type: 'table',
          headers: ['Type', 'Examples', 'Key Details Needed'],
          rows: [
            ['Current (Due < 1 year)', 'Credit cards, medical bills, taxes owed', 'Balance, APR, minimum payment'],
            ['Long-term Mortgage', 'Primary home, investment property', 'Balance, rate, term, payment, escrow'],
            ['HELOC', 'Home equity line', 'Balance, limit, rate, draw period'],
            ['Student Loans', 'Federal and private', 'Balance, rate, servicer, forgiveness eligibility'],
            ['Auto Loans', 'Vehicle financing', 'Balance, rate, term remaining'],
            ['401(k) Loans', 'Retirement plan loan', 'Balance, repayment schedule']
          ]
        },
        {
          title: 'Income Categories',
          type: 'list',
          content: [
            { term: 'Employment Income', definition: 'Gross salary, bonuses (amount and predictability), commissions, overtime, stock compensation with vesting schedule' },
            { term: 'Self-Employment Income', definition: 'Schedule C net income, K-1 distributions, guaranteed payments, business owner salary' },
            { term: 'Investment Income', definition: 'Interest, dividends (qualified vs. ordinary), capital gains/losses, rental income net of expenses' },
            { term: 'Retirement Income', definition: 'Social Security benefits, pension income, annuity payments, Required Minimum Distributions' },
            { term: 'Other Income', definition: 'Alimony (if divorce pre-2019), royalties, trust distributions' }
          ]
        },
        {
          title: 'Expense Categories',
          type: 'table',
          headers: ['Category', 'Fixed Expenses', 'Variable Expenses'],
          rows: [
            ['Housing', 'Mortgage/rent, property tax, insurance, HOA', '-'],
            ['Insurance', 'Auto, life, health, disability premiums', '-'],
            ['Debt Payments', 'Minimum credit card, loan payments', '-'],
            ['Utilities', 'Electric, gas, water, internet, phone', '-'],
            ['Food', '-', 'Groceries, dining out'],
            ['Transportation', '-', 'Gas, maintenance, parking'],
            ['Healthcare', '-', 'Copays, prescriptions, dental'],
            ['Discretionary', '-', 'Entertainment, travel, clothing']
          ]
        },
        {
          title: 'Insurance Coverage Documentation',
          type: 'text',
          content: "**Life Insurance:**\n• Type (term, whole, universal, variable)\n• Face amount (death benefit)\n• Premium and cash value (if permanent)\n• Beneficiaries and riders\n\n**Health Insurance:**\n• Plan type (HMO, PPO, HDHP)\n• Premium (employee portion)\n• Deductible and out-of-pocket max\n• HSA/FSA availability and balances\n\n**Disability Insurance:**\n• Short-term and long-term policies\n• Benefit amount and duration\n• Definition of disability (own vs. any occupation)\n• Elimination period\n• Employer-paid (taxable) vs. individual (tax-free)\n\n**Property & Liability:**\n• Homeowners/renters limits\n• Auto liability limits\n• Umbrella policy amount"
        },
        {
          title: 'Tax Information Needed',
          type: 'text',
          content: "Request **last 2-3 years of tax returns**, reviewing:\n• Filing status\n• Taxable income vs. AGI vs. MAGI\n• Marginal and effective tax rates\n• Itemized vs. standard deduction history\n• Tax credits claimed\n• Estimated tax payments\n• Capital gains/losses and carryforwards\n• State tax situation"
        },
        {
          title: 'Estate Planning Documents',
          type: 'table',
          headers: ['Document', 'Key Information to Review'],
          rows: [
            ['Will', 'Executor, guardians, specific bequests'],
            ['Revocable Trust', 'Successor trustee, distribution provisions'],
            ['Beneficiary Designations', 'All retirement accounts, life insurance'],
            ['Powers of Attorney', 'Financial POA, Healthcare POA'],
            ['HIPAA Authorization', 'Who can access medical information'],
            ['Prenup/Postnup', 'Asset division, spousal rights']
          ]
        },
        {
          title: '🚩 Red Flags to Watch For',
          type: 'warning',
          content: "When reviewing quantitative data, watch for these common issues:\n\n• Beneficiary designations that don't match estate plan\n• Title mismatches (assets not in trust name when trust exists)\n• Missing disability insurance on high earners\n• Inadequate liability coverage for high net worth\n• Large cash positions earning minimal interest\n• Employer stock concentration\n• Outdated insurance coverage amounts"
        },
        {
          title: 'Organizing the Data',
          type: 'text',
          content: "**Create a Client Profile with:**\n\n1. **Balance Sheet**: Assets vs. Liabilities → Net Worth\n2. **Income Statement**: Income vs. Expenses → Cash Flow\n3. **Insurance Summary**: Coverage inventory\n4. **Account List**: All accounts with titling and beneficiaries\n\nDocument sources and dates for all information. Use standardized forms for consistency across clients."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Quantitative data is objective, numerical information about finances",
            "Complete data includes: assets, liabilities, income, expenses, insurance, taxes, and estate documents",
            "Organize data into balance sheet and income statement formats",
            "Document sources and dates for all information gathered",
            "Watch for red flags like mismatched beneficiaries, title issues, and coverage gaps"
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-GEN-L003',
    courseId: 'cfp',
    section: 'CFP-GEN',
    title: 'Client Data Gathering - Qualitative Information',
    description: 'Learn to gather the subjective information about goals, values, and attitudes that shapes financial recommendations',
    order: 3,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Qualitative Analysis', 'Risk Tolerance', 'Client Goals', 'Money Scripts'],
    blueprintArea: 'GEN-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Two clients with identical net worth, income, and age may need COMPLETELY DIFFERENT plans based on their values, risk tolerance, and family situations. The CFP exam frequently tests whether you recognize when qualitative factors should change a recommendation."
        },
        {
          title: 'Understanding Qualitative Data',
          type: 'text',
          content: "**Qualitative data** is subjective information about a client's values, attitudes, preferences, relationships, and life circumstances. While quantitative data tells you the \"what,\" qualitative data tells you the **\"why.\"**\n\nQualitative factors include:\n• Goals and objectives\n• Risk tolerance\n• Time horizons\n• Values and attitudes about money\n• Family dynamics\n• Health status\n• Employment and career considerations"
        },
        {
          title: 'Goals and Objectives',
          type: 'table',
          headers: ['Goal Type', 'Time Frame', 'Examples'],
          rows: [
            ['Short-term', 'Within 1 year', 'Build emergency fund, pay off credit card'],
            ['Intermediate', '1-10 years', 'Save for home down payment, fund education'],
            ['Long-term', '10+ years', 'Retirement, legacy planning']
          ]
        },
        {
          title: 'Goal Exploration Questions',
          type: 'text',
          content: "Ask open-ended questions to understand client goals:\n\n• \"What are you hoping to accomplish with financial planning?\"\n• \"If you could achieve only one financial goal, what would it be?\"\n• \"What does financial success look like to you?\"\n• \"What are you most worried about?\"\n• \"What would you do if money were no object?\""
        },
        {
          title: 'Risk Tolerance: Two Components',
          type: 'table',
          headers: ['Component', 'Definition', 'How to Assess'],
          rows: [
            ['Risk Capacity (Ability)', 'Financial ability to absorb losses', 'Time horizon, income stability, net worth, liquidity needs'],
            ['Risk Willingness (Attitude)', 'Psychological comfort with volatility', 'Questionnaires, discussion, past behavior']
          ]
        },
        {
          title: '⚠️ Critical Rule: Lower Governs',
          type: 'warning',
          content: "**The LOWER of capacity or willingness governs the recommendation.**\n\nA client may have high capacity (young, high income, long time horizon) but low willingness (anxiety about losses). Recommendations should respect the lower tolerance.\n\nThe exam loves testing this concept—don't recommend aggressive portfolios to clients who can't sleep at night during market downturns!"
        },
        {
          title: 'Risk Assessment Questions',
          type: 'text',
          content: "**Questions to Assess Risk Willingness:**\n\n• \"How did you feel during the 2020 or 2022 market downturns?\"\n• \"What would you do if your portfolio dropped 20% in one month?\"\n• \"Have you ever sold investments during a market decline?\"\n• \"How important is stability of principal vs. growth potential?\"\n\n**Behavioral Indicators:**\n• Checking account balances daily = high anxiety\n• Ignoring statements during downturns = may not understand risk\n• History of panic selling = low willingness"
        },
        {
          title: 'Time Horizons and Asset Allocation',
          type: 'table',
          headers: ['Goal', 'Typical Timeline', 'Asset Allocation Implication'],
          rows: [
            ['Emergency Fund', 'Immediate', '100% liquid, stable'],
            ['Home Purchase', '2-5 years', 'Conservative, limited equity'],
            ['College Funding', '5-18 years', 'Glide path: growth → conservative'],
            ['Retirement', '10-40 years', 'Higher equity allocation'],
            ['Legacy/Estate', 'Perpetual', 'Can be most aggressive']
          ]
        },
        {
          title: 'Money Scripts (Dr. Brad Klontz)',
          type: 'text',
          content: "**Money scripts** are unconscious beliefs about money developed in childhood that drive financial behavior."
        },
        {
          title: 'Four Money Scripts',
          type: 'table',
          headers: ['Script', 'Core Belief', 'Typical Behavior'],
          rows: [
            ['Money Avoidance', 'Money is bad; rich people are greedy', 'May sabotage success, give away money'],
            ['Money Worship', 'More money solves all problems', 'Overspending, over-leveraging'],
            ['Money Status', 'Self-worth tied to net worth', 'Overspending to impress others'],
            ['Money Vigilance', 'Money is secret; frugality is paramount', 'Under-spending, anxiety about finances']
          ]
        },
        {
          title: 'Money Script Discovery Questions',
          type: 'text',
          content: "Ask these questions to uncover money scripts:\n\n• \"What messages about money did you learn growing up?\"\n• \"Do you and your spouse/partner agree about money?\"\n• \"What would you do if you inherited $1 million today?\"\n• \"What role does money play in your definition of success?\"\n• \"Do you feel comfortable discussing your finances with others?\""
        },
        {
          title: 'Family Dynamics',
          type: 'list',
          content: [
            { term: 'Marital Status', definition: 'Married, divorced, widowed, single, domestic partner—affects filing status, estate planning, beneficiaries' },
            { term: 'Children', definition: 'Ages, special needs, adopted, stepchildren—impacts education planning, insurance needs, estate planning' },
            { term: 'Aging Parents', definition: 'Financial support needed? Caregiving responsibilities? Potential inheritance?' },
            { term: 'Blended Families', definition: 'Prior marriages, support obligations, beneficiary complexity' },
            { term: 'Family Discord', definition: 'May require careful estate planning, clear communication, separate trusts' }
          ]
        },
        {
          title: 'Special Family Situations',
          type: 'table',
          headers: ['Situation', 'Planning Impact'],
          rows: [
            ['Special needs child', 'Special needs trust, ABLE account, Medicaid planning'],
            ['Blended family', 'Beneficiary complexity, prenuptial review, QTIP trusts'],
            ['Sandwich generation', 'Dual care obligations, stretched resources'],
            ['Divorced with children', 'Coordination with ex-spouse, support obligations']
          ]
        },
        {
          title: 'Health Status Considerations',
          type: 'text',
          content: "Health affects multiple planning areas:\n\n**Insurance Planning:**\n• Life insurance needs and insurability\n• Long-term care planning urgency\n• Health insurance costs\n\n**Retirement Planning:**\n• Life expectancy assumptions\n• Healthcare cost projections\n\n**Estate Planning:**\n• Urgency of document preparation\n• Trust funding timeline\n\n**Key Questions:**\n• Current health status and chronic conditions\n• Family health history (longevity, hereditary conditions)\n• Lifestyle factors (smoking, exercise, diet)\n• Insurability status"
        },
        {
          title: 'Qualitative vs. Quantitative Comparison',
          type: 'table',
          headers: ['Quantitative', 'Qualitative'],
          rows: [
            ['$1.2M net worth', 'Desire for financial security'],
            ['$180,000 salary', 'Fear of job loss'],
            ['15 years to retirement', 'Dream of retiring to travel'],
            ['$12,000/month expenses', 'Worry about outliving savings'],
            ['6% portfolio return', 'Anxiety about market volatility']
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Qualitative data is subjective: values, goals, attitudes, and relationships",
            "Risk tolerance = capacity (ability) + willingness (comfort)—use the LOWER of the two",
            "Family dynamics (children, aging parents, blended families) significantly shape priorities",
            "Money scripts reveal deeply held beliefs that influence financial behavior",
            "Both quantitative AND qualitative data are essential for sound recommendations"
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-GEN-L004',
    courseId: 'cfp',
    section: 'CFP-GEN',
    title: 'SMART Goals and Priority Setting',
    description: 'Learn to transform vague aspirations into actionable goals and prioritize when resources are limited',
    order: 4,
    duration: 30,
    difficulty: 'intermediate',
    topics: ['SMART Goals', 'Goal Prioritization', 'Trade-off Analysis', 'Needs vs Wants'],
    blueprintArea: 'GEN-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Financial planning succeeds when vague aspirations become SPECIFIC, MEASURABLE targets with clear priorities. The CFP exam tests your ability to transform client wishes into actionable goals and make recommendations when resources are insufficient for all goals."
        },
        {
          title: 'The SMART Framework',
          type: 'table',
          headers: ['Letter', 'Meaning', 'Question to Ask'],
          rows: [
            ['S', 'Specific', 'What exactly do you want to accomplish?'],
            ['M', 'Measurable', 'How will you know when it\'s achieved?'],
            ['A', 'Achievable', 'Is this realistic given your resources?'],
            ['R', 'Relevant', 'Does this align with your values and priorities?'],
            ['T', 'Time-bound', 'When do you want to achieve this?']
          ]
        },
        {
          title: '📊 SMART Goal Transformation',
          type: 'example',
          content: "**Vague Goal:** \"I want to retire comfortably\"\n\n**SMART Goal:** \"I will retire at age 65 with $80,000/year in today's dollars, adjusted for inflation, for 30 years\"\n\n✓ **Specific:** Retire at 65 with defined income\n✓ **Measurable:** $80,000/year in today's dollars\n✓ **Achievable:** To be validated by projections\n✓ **Relevant:** Aligns with desire for financial independence\n✓ **Time-bound:** At age 65 (e.g., in 15 years)"
        },
        {
          title: 'More SMART Examples',
          type: 'table',
          headers: ['Vague Goal', 'SMART Version'],
          rows: [
            ['Pay for kids\' college', 'Fund 100% of in-state public university costs ($25,000/year × 4 years × 2 children) starting in 10 and 13 years'],
            ['Buy a vacation home someday', 'Purchase a $500,000 vacation home within 5 years with 20% down payment'],
            ['Save more for retirement', 'Increase 401(k) contributions to 15% of salary ($22,500/year) starting next pay period'],
            ['Get out of debt', 'Pay off $15,000 credit card balance within 18 months using debt avalanche method']
          ]
        },
        {
          title: 'Goals vs. Constraints',
          type: 'text',
          content: "**Goals (Positive Targets)** — What the client wants to achieve:\n• Retire at 60\n• Fund children's education\n• Leave $500,000 to heirs\n• Buy a business\n\n**Constraints (Limitations)** — Factors that limit how goals can be achieved:\n• Must maintain $50,000 emergency fund\n• Cannot work past age 62 (health)\n• Risk tolerance limits aggressive investing\n• Cash flow limited to $2,000/month savings"
        },
        {
          title: '⚠️ Exam Trap: Goal vs. Constraint',
          type: 'warning',
          content: "Questions often ask whether something is a goal or a constraint. Remember:\n\n• **Goals** are targets you're trying to ACHIEVE\n• **Constraints** are boundaries you must WORK WITHIN\n\nExample: \"I need to keep $50k liquid at all times\" = CONSTRAINT, not a goal"
        },
        {
          title: 'Priority Hierarchy: Needs, Wants, Wishes',
          type: 'text',
          content: "When resources are insufficient for all goals, prioritize using this hierarchy:"
        },
        {
          title: 'The Priority Pyramid',
          type: 'table',
          headers: ['Level', 'Category', 'Examples'],
          rows: [
            ['1 (Fund First)', 'NEEDS (Security)', 'Emergency fund, adequate insurance, minimum retirement, basic estate docs, debt management'],
            ['2 (Fund Next)', 'WANTS (Desirable)', 'Comfortable retirement, children\'s education, home ownership, early retirement'],
            ['3 (If Possible)', 'WISHES (Aspirational)', 'Vacation home, large inheritance, major philanthropy, luxury items, FIRE at 50']
          ]
        },
        {
          title: 'Resolving Conflicting Goals',
          type: 'text',
          content: "Clients often have goals that compete for the same resources. Your job is to:\n\n1. **Quantify the trade-off** — Show the impact of each choice\n2. **Present options** — Don't choose for the client\n3. **Consider hybrid solutions** — Partial funding of both goals\n4. **Document the decision** — Record the client's choice and reasoning"
        },
        {
          title: '📊 Trade-Off Example',
          type: 'example',
          content: "**Conflict:** Client wants to retire at 60 AND fully fund college for two children\n\n**Analysis:** \"If you retire at 60 instead of 65, you'll need to save an additional $1,200/month. Alternatively, you could retire at 60 but with 75% of your target income.\"\n\n**Options to Present:**\n1. Retire at 65, fully fund college\n2. Retire at 60, children take loans for 50% of college\n3. Retire at 62, fund 75% of college\n4. Retire at 60 with reduced income"
        },
        {
          title: 'Common Trade-Off Scenarios',
          type: 'table',
          headers: ['Conflict', 'Resolution Options'],
          rows: [
            ['Early retirement vs. education funding', 'Retire later, or have children take loans'],
            ['Large home vs. savings rate', 'Smaller home, or slower wealth accumulation'],
            ['Lifestyle now vs. later', 'Balance current enjoyment with future security'],
            ['Charity vs. inheritance', 'Discuss legacy priorities with family']
          ]
        },
        {
          title: 'Documenting Goals',
          type: 'text',
          content: "Create a **Goal Summary Table** to organize and prioritize:"
        },
        {
          title: 'Sample Goal Documentation',
          type: 'table',
          headers: ['Goal', 'Amount', 'Time Frame', 'Priority', 'Monthly Funding'],
          rows: [
            ['Emergency Fund', '$30,000', '12 months', 'Need', '$2,500'],
            ['Retirement at 65', '$2M', '20 years', 'Need', '$2,000'],
            ['College - Child 1', '$100,000', '10 years', 'Want', '$700'],
            ['College - Child 2', '$100,000', '13 years', 'Want', '$550'],
            ['Vacation Home', '$500,000', '7 years', 'Wish', '$3,000'],
            ['TOTAL REQUIRED', '-', '-', '-', '$8,750']
          ]
        },
        {
          title: '⚠️ Addressing the Funding Gap',
          type: 'warning',
          content: "**If Total Required > Available Savings:**\n\nThe client must either:\n1. **Increase savings** (reduce expenses, increase income)\n2. **Delay or reduce goals** (retire at 67 instead of 65)\n3. **Eliminate lower-priority goals** (vacation home drops off)\n4. **Accept not achieving all goals**\n\nThis is where the Needs-Wants-Wishes hierarchy becomes essential!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "SMART = Specific, Measurable, Achievable, Relevant, Time-bound",
            "Goals are positive targets; constraints are limitations you must work within",
            "Prioritize: Needs (security) → Wants (comfort) → Wishes (luxury)",
            "Quantify trade-offs when resources are insufficient for all goals",
            "Document the client's decisions AND their reasoning"
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-GEN-L005',
    courseId: 'cfp',
    section: 'CFP-GEN',
    title: 'Scope of Engagement and Client Agreement',
    description: 'Understand the requirements for defining engagement scope and documenting client agreements',
    order: 5,
    duration: 25,
    difficulty: 'intermediate',
    topics: ['Engagement Letters', 'Scope Definition', 'Client Agreements', 'Fiduciary Duty'],
    blueprintArea: 'GEN-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Before beginning work with a client, CFP® professionals must CLEARLY establish the scope of engagement and document it in a WRITTEN agreement. This protects both the client (ensuring they understand what they're getting) and the planner (limiting liability to agreed services)."
        },
        {
          title: 'Benefits of Clear Scope Definition',
          type: 'text',
          content: "A clearly defined scope:\n\n• Sets expectations for both parties\n• Defines what IS and IS NOT included\n• Protects against liability for areas not covered\n• Ensures compliance with CFP Board standards\n• Enables appropriate fee disclosure\n• Creates basis for future engagement expansion"
        },
        {
          title: 'Types of Engagements',
          type: 'table',
          headers: ['Type', 'Coverage', 'Requirements'],
          rows: [
            ['Comprehensive Financial Planning', 'All major areas: cash flow, insurance, investments, tax, retirement, estate', 'Full 7-step process, extensive data gathering, ongoing relationship'],
            ['Limited-Scope (Modular)', 'Specific topics only as agreed', 'Written scope limitation, client agreement, avoid claiming to provide comprehensive planning']
          ]
        },
        {
          title: 'Examples of Limited-Scope Engagements',
          type: 'list',
          content: [
            { term: 'Retirement Income Analysis', definition: 'Focus only on Social Security timing, pension options, and withdrawal strategies' },
            { term: 'Investment Portfolio Review', definition: 'Analyze current holdings and provide rebalancing recommendations' },
            { term: '529 Plan Consultation', definition: 'Plan selection and contribution strategy for education funding' },
            { term: 'Stock Option Strategy', definition: 'Exercise timing and tax planning for employer equity compensation' },
            { term: 'Social Security Claiming', definition: 'Optimize filing strategy for individual or married couple' }
          ]
        },
        {
          title: '⚠️ Requirements for Limited Scope',
          type: 'warning',
          content: "**All of these must be met for valid limited-scope engagement:**\n\n1. Document the limitation **in writing**\n2. Client must **agree** to the limitation\n3. Do NOT provide advice on excluded topics\n4. Do NOT hold yourself out as providing \"financial planning\" if scope is limited\n5. Consider whether limitation is appropriate given client's circumstances"
        },
        {
          title: 'Required Disclosures',
          type: 'table',
          headers: ['Disclosure', 'Description'],
          rows: [
            ['Scope of Engagement', 'What is included AND what is excluded'],
            ['How Advice Will Be Provided', 'Written plan, verbal, ongoing service?'],
            ['Client Responsibilities', 'Providing accurate information, making decisions'],
            ['Conflicts of Interest', 'Compensation incentives, affiliations, dual registration'],
            ['Compensation Method', 'Fee-only, commission, fee-based, salary'],
            ['Termination Process', 'How either party can end the relationship'],
            ['Fiduciary Status', 'When and how fiduciary duty applies']
          ]
        },
        {
          title: 'Written Engagement Agreement Elements',
          type: 'text',
          content: "**A comprehensive engagement letter includes:**\n\n**1. Parties**\n• Names and contact information\n• Entity name if applicable\n\n**2. Scope of Services**\n• Services to be provided (detailed list)\n• Services explicitly excluded\n• Time frame of engagement\n\n**3. Client Responsibilities**\n• Providing complete and accurate information\n• Notifying planner of changes\n• Making final decisions\n\n**4. Compensation**\n• Fee amount and structure\n• Billing frequency\n• What expenses are included/excluded\n• Disclosure of third-party compensation"
        },
        {
          title: 'Engagement Agreement Elements (Continued)',
          type: 'text',
          content: "**5. Conflicts of Interest**\n• Affiliations (broker-dealer, insurance agency)\n• Products you can sell vs. recommend\n• Referral arrangements and compensation\n\n**6. Termination**\n• How either party can terminate\n• Refund policy if applicable\n• What happens to client data\n\n**7. Privacy**\n• How data is protected\n• When data may be shared (with consent)\n• Compliance with privacy regulations"
        },
        {
          title: 'Fiduciary Standards',
          type: 'table',
          headers: ['Engagement Type', 'Standard', 'Key Obligation'],
          rows: [
            ['Financial Planning', 'Fiduciary', 'Act in client\'s best interest throughout'],
            ['Financial Advice (limited)', 'Fiduciary at time of advice', 'Best interest when giving advice, reduced ongoing duty'],
            ['Sales only (no advice)', 'Suitability may apply', 'Still subject to CFP Board discipline']
          ]
        },
        {
          title: 'Practice Standards Requirements',
          type: 'text',
          content: "The CFP Board's Practice Standards require:\n\n1. **Scope must be documented** before planning begins\n2. **Material conflicts** disclosed before or at engagement\n3. **Client must agree** to limited scope if engagement is modular\n4. **Comprehensive planning** must use the full 7-step process\n5. **Written plan** required for financial planning (not just verbal)\n6. **Periodic review** of engagement scope as client needs change"
        },
        {
          title: '📊 Engagement Letter Example',
          type: 'example',
          content: "**Sample Limited-Scope Introduction:**\n\n\"This agreement covers a retirement income planning engagement only. I will analyze your Social Security options, pension elections, and portfolio withdrawal strategy.\n\nThis engagement does NOT include: investment selection, insurance review, estate planning, or tax preparation.\n\nIf during our work you identify needs in excluded areas, we can discuss expanding our engagement or I can refer you to appropriate professionals.\"\n\n**Why this works:** Clear scope, explicit exclusions, path to expansion"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Scope must be clearly defined and documented IN WRITING before work begins",
            "Comprehensive planning covers all major areas; limited-scope covers specific topics",
            "Written engagement must include: scope, compensation, conflicts, termination",
            "Client must AGREE to limited scope in writing",
            "Fiduciary duty applies when providing Financial Planning",
            "Excluded areas should be explicitly stated (not just implied)"
          ]
        }
      ]
    }
  }
];
