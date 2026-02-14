/**
 * CFP Professional Conduct Lessons - Fiduciary and Practice Management
 * Domain 1: Professional Conduct and Regulation (15% of exam)
 * Blueprint Area: PRO-1 (CFP Board Standards)
 * 
 * 4 lessons covering fiduciary practice and client relationships
 */

import { CFPLesson } from '../../../types/cfp';

export const PRO_FIDUCIARY_LESSONS: CFPLesson[] = [
  {
    id: 'PRO-L009',
    domain: 'CFP-PCR',
    blueprintArea: 'PRO-1',
    title: 'Fiduciary Duty in Practice',
    order: 9,
    duration: 35,
    objectives: [
      'Apply the three fiduciary duties in client situations',
      'Distinguish between fiduciary and suitability standards',
      'Document fiduciary decision-making process',
      'Handle situations where fiduciary duty is challenged'
    ],
    content: `# Fiduciary Duty in Practice

## The Three Fiduciary Duties

CFP® professionals owe clients three core fiduciary duties:

### 1. Duty of Loyalty

**Client's Interest First**
- Place client interests above your own
- Avoid, disclose, and manage conflicts
- No self-dealing without informed consent

**Key Questions:**
- Would this recommendation benefit me more than the client?
- Am I influenced by compensation differentials?
- Would I make this same recommendation if compensation were equal?

### 2. Duty of Care

**Prudent Professional Standard**
- Act with skill, care, prudence, and diligence
- Process matters as much as outcome
- Competence in areas of advice

**Key Questions:**
- Did I gather sufficient information?
- Did I analyze alternatives?
- Did I consider the client's complete situation?

### 3. Duty to Follow Client Instructions

**Honor Client Decisions**
- Clients have final say (within legal/ethical bounds)
- Document when client declines recommendations
- Cannot follow clearly illegal instructions

## Fiduciary vs. Suitability

| Factor | Fiduciary | Suitability |
|--------|-----------|-------------|
| Standard | Best interest | Reasonable basis |
| Focus | Client | Product fit |
| Conflicts | Must minimize | Must disclose |
| Timing | Ongoing | At recommendation |
| Scope | Comprehensive | Transaction |

## Documenting Fiduciary Decisions

### Best Practices

\`\`\`
1. Document alternatives considered
2. Note why recommendation is best for THIS client
3. Record conflicts and how managed
4. Capture client's goals and constraints
5. Save all supporting analysis
\`\`\`

### Sample Documentation

> "Client's primary goal: Income stability in retirement. 
> Alternatives considered: (1) Fixed annuity, (2) Bond ladder, (3) Dividend portfolio.
> Recommendation: Bond ladder - provides liquidity client prioritized, 
> lower fees than annuity, appropriate for client's moderate risk tolerance 
> and 20-year time horizon. No conflicts: advisor is fee-only."

## When Fiduciary Duty Is Tested

### Common Challenges

1. **Compensation Conflicts**
   - Higher commission product is suitable
   - Solution: Choose best product regardless of compensation

2. **Client Insists on Poor Decision**
   - Document discussion and risks
   - Cannot prevent client action if informed
   - Consider terminating if unconscionable

3. **Limited Product Shelf**
   - Disclose limitation
   - Refer out if best product unavailable
   - Cannot pretend limited options are comprehensive

4. **Employer Pressure**
   - Fiduciary duty is to client, not employer
   - Report pressure through appropriate channels
   - May need to decline engagement

## Practical Application

### Case: Investment Recommendation

**Situation:** 
Client needs income. Two products available:
- Product A: Variable annuity, 6% commission
- Product B: Dividend ETF, minimal commission

**Analysis:**
| Factor | Product A | Product B |
|--------|-----------|-----------|
| Income stability | Guaranteed | Variable |
| Fees | High (2%+) | Low (0.2%) |
| Liquidity | Restricted | Full |
| Client preference | Wants guarantees | Open |

**Fiduciary Decision:**
If client's need for guaranteed income outweighs cost and liquidity concerns, Product A may be appropriate despite higher commission. Document the analysis, disclose the conflict, and explain trade-offs to client.
`,
    keyTakeaways: [
      'Three duties: Loyalty, Care, Follow Instructions',
      'Loyalty = client interests above your own',
      'Care = prudent professional process',
      'Document alternatives considered and rationale',
      'Fiduciary duty is to client, not employer'
    ],
    keyFormulas: [],
    mnemonics: [
      {
        acronym: 'LCF',
        meaning: 'Loyalty, Care, Follow instructions - the three fiduciary duties',
        usage: 'Remember the core fiduciary obligations'
      }
    ],
    practiceProblems: [
      {
        question: 'A CFP® earns 8% commission on Product A and 2% on Product B. Both are suitable. What must they do?',
        answer: 'Recommend whichever product is actually in the client\'s best interest (not just suitable), document the analysis, and disclose the compensation difference to the client.'
      }
    ],
    relatedLessons: ['PRO-L001', 'PRO-L002', 'PRO-L003']
  },
  {
    id: 'PRO-L010',
    domain: 'CFP-PCR',
    blueprintArea: 'PRO-1',
    title: 'Client Data Gathering and Analysis',
    order: 10,
    duration: 30,
    objectives: [
      'Collect comprehensive client information',
      'Apply quantitative and qualitative analysis',
      'Identify gaps in client data',
      'Handle sensitive client information ethically'
    ],
    content: `# Client Data Gathering and Analysis

## Step 2 of Financial Planning: Gathering Information

### Quantitative Data

**Income & Cash Flow:**
- Salary and wages
- Business income
- Investment income
- Social Security/pensions
- Rental income

**Assets:**
| Category | Examples |
|----------|----------|
| Liquid | Checking, savings, money market |
| Investments | Brokerage, retirement accounts |
| Real Estate | Primary home, rental properties |
| Personal | Vehicles, collectibles |
| Business | Ownership interests |

**Liabilities:**
- Mortgages
- Consumer debt
- Student loans
- Business debt

**Insurance:**
- Life, disability, health
- Property and liability
- Long-term care

**Documents Needed:**
- Tax returns (3 years)
- Pay stubs
- Account statements
- Insurance policies
- Estate documents
- Employee benefits summaries

### Qualitative Data

**Goals:**
- Short-term (1-3 years)
- Medium-term (3-10 years)
- Long-term (10+ years)
- Legacy/charitable intentions

**Values and Priorities:**
- Security vs. growth
- Family priorities
- Work-life balance
- Risk attitudes

**Health:**
- Current health status
- Family health history
- Expected longevity

**Family Dynamics:**
- Spouse/partner
- Children/dependents
- Aging parents
- Special needs family members

## Data Analysis Framework

### Financial Statement Analysis

**Net Worth Statement:**
$$\\text{Net Worth} = \\text{Total Assets} - \\text{Total Liabilities}$$

**Cash Flow Statement:**
$$\\text{Net Cash Flow} = \\text{Income} - \\text{Expenses} - \\text{Savings}$$

### Key Ratios

| Ratio | Formula | Target |
|-------|---------|--------|
| Emergency Fund | Liquid Assets / Monthly Expenses | 3-6 months |
| Savings Rate | Savings / Gross Income | 15-20%+ |
| Debt-to-Income | Total Debt Payments / Gross Income | <36% |
| Housing | PITI / Gross Income | <28% |

### Gap Analysis

**Current Position → Goals = Gap**

Example:
\`\`\`
Retirement need: $2,000,000
Current savings: $400,000
Time: 20 years
Growth rate: 6%

Gap = What additional savings needed?
\`\`\`

## Handling Sensitive Information

### Privacy Requirements
- Collect only what's needed
- Secure storage and transmission
- Limit access to need-to-know
- Dispose properly

### Sensitive Topics
- Prior bankruptcy
- Family conflicts
- Health issues
- Previous advisor issues

**Approach:**
- Create safe environment
- Non-judgmental tone
- Explain why information matters
- Confirm confidentiality

## Common Data Gaps

| Missing Item | Risk |
|--------------|------|
| Beneficiary designations | Assets pass incorrectly |
| Insurance details | Coverage gaps unknown |
| Business agreements | Succession issues |
| Prior marriages | Hidden obligations |
| Debt specifics | Inaccurate cash flow |

**Solution:** Use comprehensive data gathering checklist; follow up persistently but respectfully.
`,
    keyTakeaways: [
      'Gather both quantitative and qualitative data',
      'Documents needed: tax returns, statements, policies, estate docs',
      'Calculate key ratios: savings rate, debt-to-income',
      'Identify gaps between current position and goals',
      'Handle sensitive information with privacy and respect'
    ],
    keyFormulas: [
      {
        name: 'Net Worth',
        formula: 'Total Assets - Total Liabilities',
        variables: {}
      },
      {
        name: 'Savings Rate',
        formula: 'Annual Savings / Gross Income × 100%',
        variables: {}
      }
    ],
    mnemonics: [
      {
        acronym: 'LIFE',
        meaning: 'Liabilities, Income, Family, Existing assets - key data categories',
        usage: 'Remember comprehensive data gathering areas'
      }
    ],
    practiceProblems: [
      {
        question: 'A client has $50,000 liquid assets and $8,000 monthly expenses. What is their emergency fund ratio?',
        answer: '6.25 months. $50,000 ÷ $8,000 = 6.25, which meets the 3-6 month target.'
      }
    ],
    relatedLessons: ['PRO-L003', 'GEN-L002', 'GEN-L003']
  },
  {
    id: 'PRO-L011',
    domain: 'CFP-PCR',
    blueprintArea: 'PRO-1',
    title: 'Presenting Recommendations and Implementation',
    order: 11,
    duration: 30,
    objectives: [
      'Develop clear, actionable recommendations',
      'Present alternatives and trade-offs effectively',
      'Facilitate informed client decision-making',
      'Navigate implementation obstacles'
    ],
    content: `# Presenting Recommendations and Implementation

## Steps 4 & 5: Developing and Implementing Recommendations

### Effective Recommendations

**Characteristics of Good Recommendations:**
- Specific and actionable
- Prioritized by importance/urgency
- Connected to client goals
- Include alternatives considered
- Address implementation steps

### Priority Matrix

| | Urgent | Not Urgent |
|---|--------|------------|
| **Important** | Do first (estate docs, insurance gaps) | Schedule (retirement savings, investments) |
| **Not Important** | Delegate/defer | Eliminate |

### Presenting Trade-offs

Every recommendation involves trade-offs. Present honestly:

\`\`\`
Example: Roth vs. Traditional IRA

Roth IRA:
✓ Tax-free withdrawals
✓ No RMDs
✗ No current deduction
✗ Income limits

Traditional IRA:
✓ Current deduction
✓ No income limits
✗ Taxable withdrawals
✗ Required distributions

Best for this client because: [specific reasons]
\`\`\`

## Facilitating Decisions

### AVOID:
- Making decisions for client
- Overwhelming with options
- Pushing products
- Ignoring client hesitation

### DO:
- Present 2-3 clear options
- Explain pros/cons
- Answer questions thoroughly
- Give time to decide

### When Client Hesitates

1. **Clarify concerns:** "What's holding you back?"
2. **Provide more information:** Address specific questions
3. **Reframe:** Connect to their goals
4. **Accept delay:** "Take time to think; we can discuss next week"

## Implementation Framework

### Step-by-Step Approach

\`\`\`
1. Prioritize actions
2. Assign responsibilities (client vs. advisor)
3. Set deadlines
4. Identify dependencies
5. Schedule follow-up
\`\`\`

### Sample Implementation Plan

| Action | Responsible | Deadline | Status |
|--------|-------------|----------|--------|
| Increase 401(k) to 15% | Client | 2/15 | Pending |
| Open 529 account | Advisor | 2/20 | In progress |
| Update beneficiaries | Client | 2/28 | Not started |
| Review insurance | Advisor | 3/15 | Not started |

### Common Obstacles

| Obstacle | Solution |
|----------|----------|
| Inertia | Break into small steps |
| Complexity | Prioritize top 3 actions |
| Fear | Explain risks of inaction |
| Cost | Show long-term benefit |
| Time | Offer to handle paperwork |

## Coordination with Other Professionals

### When to Involve Others

- **CPA:** Tax planning, return preparation
- **Attorney:** Estate documents, trusts
- **Insurance specialist:** Complex policies
- **Employer HR:** Benefits optimization

### Professional Courtesy
- Get client permission
- Share relevant information only
- Don't criticize prior advice
- Respect their expertise

## Documentation

### What to Document

1. Recommendations presented
2. Alternatives discussed
3. Client questions and answers
4. Client decisions (accepted/declined)
5. Implementation responsibilities
6. Follow-up schedule

### Client Agreement

For significant decisions, have client acknowledge:
- Understanding of recommendation
- Risks of alternatives
- Their decision
- Implementation responsibilities
`,
    keyTakeaways: [
      'Recommendations should be specific, prioritized, and actionable',
      'Present 2-3 options with clear trade-offs',
      'Create implementation plan with deadlines and responsibilities',
      'Coordinate with CPAs, attorneys, other professionals',
      'Document all recommendations and client decisions'
    ],
    keyFormulas: [],
    mnemonics: [
      {
        acronym: 'PRICE',
        meaning: 'Prioritize, Responsibilities, Implementation steps, Coordination, Evaluation',
        usage: 'Remember implementation framework'
      }
    ],
    practiceProblems: [
      {
        question: 'A client can\'t decide between a Roth conversion and staying traditional. What\'s the best approach?',
        answer: 'Present both options with clear trade-offs, connect to client\'s specific goals (tax bracket, time horizon, legacy), answer questions, and give time to decide if needed. Document the discussion.'
      }
    ],
    relatedLessons: ['PRO-L003', 'PRO-L009', 'GEN-L001']
  },
  {
    id: 'PRO-L012',
    domain: 'CFP-PCR',
    blueprintArea: 'PRO-1',
    title: 'Monitoring and Updating the Plan',
    order: 12,
    duration: 25,
    objectives: [
      'Establish ongoing monitoring systems',
      'Identify triggers requiring plan updates',
      'Conduct effective review meetings',
      'Maintain appropriate client contact'
    ],
    content: `# Monitoring and Updating the Financial Plan

## Steps 6 & 7: Monitor and Update

### Why Monitoring Matters

Financial plans are living documents. Changes occur in:
- Client circumstances
- Laws and regulations
- Economic conditions
- Market performance

### Monitoring Framework

\`\`\`
Regular Reviews (Annual+)
├── Progress toward goals
├── Portfolio performance
├── Life changes
└── Strategy effectiveness

Trigger-Based Reviews
├── Major life events
├── Significant law changes
├── Market disruptions
└── Client requests
\`\`\`

## Life Event Triggers

| Event | Planning Areas Affected |
|-------|------------------------|
| Marriage | Beneficiaries, estate, insurance, tax filing |
| Divorce | Asset division, support, beneficiaries |
| Child birth | Insurance, education, estate |
| Job change | Benefits, retirement, income |
| Inheritance | Tax, investment, estate |
| Health change | Insurance, estate, retirement timeline |
| Home purchase | Cash flow, insurance, taxes |
| Retirement | Income, distributions, healthcare |
| Death in family | Estate, beneficiaries, support |

## Review Meeting Structure

### Pre-Meeting Preparation
- Pull current statements
- Calculate performance
- Review prior recommendations
- Identify discussion items

### Meeting Agenda

\`\`\`
1. Life update (5-10 min)
   - Any changes since last meeting?
   - New goals or concerns?

2. Progress review (15-20 min)
   - Goals on track?
   - Investment performance
   - Net worth update

3. Recommendations (15-20 min)
   - Adjustments needed
   - New opportunities
   - Action items

4. Questions & next steps (5-10 min)
   - Client questions
   - Schedule follow-up
\`\`\`

### Documentation
After each meeting:
- Summarize discussions
- List decisions made
- Note new action items
- Update client file

## Appropriate Client Contact

### Contact Frequency Guide

| Client Type | Minimum Contact |
|-------------|-----------------|
| Comprehensive planning | Quarterly review, annual in-depth |
| Investment management | Quarterly report, semi-annual call |
| Project-based | At completion + 6-month follow-up |

### Contact Methods

- **Scheduled reviews:** Most important
- **Performance reports:** Regular cadence
- **Market updates:** As warranted (not alarmist)
- **Educational content:** Value-add
- **Life event check-ins:** Show you care

## When to Update vs. Overhaul

### Minor Updates
- Asset allocation drift
- Contribution adjustments
- Beneficiary updates
- Insurance tweaks

### Major Overhaul Needed
- Significant life changes (divorce, retirement)
- Goals fundamentally changed
- Major law changes affecting strategy
- Original plan assumptions now invalid

## Technology and Monitoring

### Tools for Effective Monitoring
- Portfolio analytics
- Financial planning software
- Client portals
- CRM systems
- Rebalancing alerts

### Client Self-Service
Empower clients to:
- View accounts
- Update basic info
- Request appointments
- Access documents

## Terminating the Relationship

### When Termination May Be Appropriate
- Client is unresponsive
- Relationship becomes unproductive
- Values conflict
- Unable to serve client properly

### Proper Termination
1. Provide reasonable notice
2. Explain reasons (if appropriate)
3. Return documents/records
4. Offer transition assistance
5. Document the termination
`,
    keyTakeaways: [
      'Plans require ongoing monitoring and updates',
      'Life events trigger plan reviews',
      'Annual reviews minimum; quarterly for active management',
      'Document all meetings and decisions',
      'Terminate relationships properly when needed'
    ],
    keyFormulas: [],
    mnemonics: [
      {
        acronym: 'CALM',
        meaning: 'Check progress, Assess life changes, Look at markets, Make adjustments',
        usage: 'Remember review meeting structure'
      }
    ],
    practiceProblems: [
      {
        question: 'A client gets divorced. What planning areas need immediate review?',
        answer: 'Beneficiary designations, estate documents (wills, POAs), insurance coverage, asset allocation (risk tolerance may change), retirement projections (income and expenses), tax filing status.'
      }
    ],
    relatedLessons: ['PRO-L003', 'PRO-L011', 'GEN-L001']
  }
];

export default PRO_FIDUCIARY_LESSONS;
