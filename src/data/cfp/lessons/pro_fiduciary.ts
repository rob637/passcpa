/**
 * CFP Professional Conduct Lessons - Fiduciary and Practice Management
 * Domain 1: Professional Conduct and Regulation (15% of exam)
 * Blueprint Area: PRO-1 (CFP Board Standards)
 * 
 * 4 lessons covering fiduciary practice and client relationships
 */

import type { Lesson } from '../../../types';

export const PRO_FIDUCIARY_LESSONS: Lesson[] = [
  {
    id: 'PRO-L009',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    title: 'Fiduciary Duty in Practice',
    description: 'Apply the three fiduciary duties in client situations',
    order: 9,
    duration: 35,
    difficulty: 'intermediate',
    topics: [
      'Three fiduciary duties in client situations',
      'Fiduciary vs. suitability standards',
      'Document fiduciary decision-making',
      'Handling challenged fiduciary duty situations'
    ],
    content: {
      sections: [
        {
          title: 'The Three Fiduciary Duties',
          type: 'text',
          content: 'CFP® professionals owe clients three core fiduciary duties, remembered by the acronym LCF: Loyalty, Care, Follow instructions.'
        },
        {
          title: 'Duty of Loyalty',
          type: 'text',
          content: 'Client\'s interests come first. Place client interests above your own, avoid/disclose/manage conflicts, and no self-dealing without informed consent. Key questions: Would this recommendation benefit me more than the client? Am I influenced by compensation differentials? Would I make this same recommendation if compensation were equal?'
        },
        {
          title: 'Duty of Care',
          type: 'text',
          content: 'Prudent professional standard. Act with skill, care, prudence, and diligence. Process matters as much as outcome. Maintain competence in areas of advice. Key questions: Did I gather sufficient information? Did I analyze alternatives? Did I consider the client\'s complete situation?'
        },
        {
          title: 'Duty to Follow Client Instructions',
          type: 'text',
          content: 'Honor client decisions. Clients have final say (within legal/ethical bounds). Document when client declines recommendations. Cannot follow clearly illegal instructions.'
        },
        {
          title: 'Fiduciary vs. Suitability Comparison',
          type: 'table',
          headers: ['Factor', 'Fiduciary', 'Suitability'],
          rows: [
            ['Standard', 'Best interest', 'Reasonable basis'],
            ['Focus', 'Client', 'Product fit'],
            ['Conflicts', 'Must minimize', 'Must disclose'],
            ['Timing', 'Ongoing', 'At recommendation'],
            ['Scope', 'Comprehensive', 'Transaction']
          ]
        },
        {
          title: 'Documenting Fiduciary Decisions',
          type: 'list',
          items: [
            'Document alternatives considered',
            'Note why recommendation is best for THIS client',
            'Record conflicts and how managed',
            'Capture client\'s goals and constraints',
            'Save all supporting analysis'
          ]
        },
        {
          title: 'Sample Documentation',
          type: 'example',
          content: 'Client\'s primary goal: Income stability in retirement. Alternatives considered: (1) Fixed annuity, (2) Bond ladder, (3) Dividend portfolio. Recommendation: Bond ladder—provides liquidity client prioritized, lower fees than annuity, appropriate for client\'s moderate risk tolerance and 20-year time horizon. No conflicts: advisor is fee-only.'
        },
        {
          title: 'When Fiduciary Duty Is Tested',
          type: 'list',
          items: [
            'Compensation Conflicts: Higher commission product is suitable—choose best product regardless of compensation',
            'Client Insists on Poor Decision: Document discussion and risks; cannot prevent client action if informed; consider terminating if unconscionable',
            'Limited Product Shelf: Disclose limitation; refer out if best product unavailable; cannot pretend limited options are comprehensive',
            'Employer Pressure: Fiduciary duty is to client, not employer; report pressure through appropriate channels; may need to decline engagement'
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          content: ['Three duties: Loyalty, Care, Follow Instructions', 'Loyalty = client interests above your own', 'Care = prudent professional process', 'Document alternatives considered and rationale', 'Fiduciary duty is to client, not employer']
        }
      ]
    }
  },
  {
    id: 'PRO-L010',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    title: 'Client Data Gathering and Analysis',
    description: 'Collect comprehensive client information',
    order: 10,
    duration: 30,
    difficulty: 'intermediate',
    topics: [
      'Comprehensive client information collection',
      'Quantitative and qualitative analysis',
      'Identifying data gaps',
      'Handling sensitive information ethically'
    ],
    content: {
      sections: [
        {
          title: 'Step 2: Gathering Information',
          type: 'text',
          content: 'Financial planning requires gathering both quantitative and qualitative data to understand the client\'s complete situation.'
        },
        {
          title: 'Memory Aid: LIFE',
          type: 'callout',
          content: 'Key data categories: Liabilities, Income, Family, Existing assets'
        },
        {
          title: 'Quantitative Data to Gather',
          type: 'table',
          headers: ['Category', 'Examples'],
          rows: [
            ['Income & Cash Flow', 'Salary, business income, investment income, Social Security/pensions, rental income'],
            ['Liquid Assets', 'Checking, savings, money market'],
            ['Investments', 'Brokerage, retirement accounts'],
            ['Real Estate', 'Primary home, rental properties'],
            ['Personal Property', 'Vehicles, collectibles'],
            ['Business Interests', 'Ownership interests'],
            ['Liabilities', 'Mortgages, consumer debt, student loans, business debt'],
            ['Insurance', 'Life, disability, health, property/liability, long-term care']
          ]
        },
        {
          title: 'Documents Needed',
          type: 'list',
          items: [
            'Tax returns (3 years)',
            'Pay stubs',
            'Account statements',
            'Insurance policies',
            'Estate documents',
            'Employee benefits summaries'
          ]
        },
        {
          title: 'Qualitative Data',
          type: 'list',
          items: [
            'Goals: Short-term (1-3 years), medium-term (3-10 years), long-term (10+ years), legacy/charitable intentions',
            'Values and Priorities: Security vs. growth, family priorities, work-life balance, risk attitudes',
            'Health: Current health status, family health history, expected longevity',
            'Family Dynamics: Spouse/partner, children/dependents, aging parents, special needs family members'
          ]
        },
        {
          title: 'Key Financial Ratios',
          type: 'table',
          headers: ['Ratio', 'Formula', 'Target'],
          rows: [
            ['Emergency Fund', 'Liquid Assets / Monthly Expenses', '3-6 months'],
            ['Savings Rate', 'Savings / Gross Income', '15-20%+'],
            ['Debt-to-Income', 'Total Debt Payments / Gross Income', '<36%'],
            ['Housing', 'PITI / Gross Income', '<28%']
          ]
        },
        {
          title: 'Gap Analysis',
          type: 'text',
          content: 'Current Position → Goals = Gap. For example: Retirement need $2,000,000, current savings $400,000, time 20 years, growth rate 6%. Calculate what additional savings are needed.'
        },
        {
          title: 'Handling Sensitive Information',
          type: 'list',
          items: [
            'Privacy: Collect only what\'s needed, secure storage and transmission, limit access to need-to-know, dispose properly',
            'Sensitive topics include: Prior bankruptcy, family conflicts, health issues, previous advisor issues',
            'Approach: Create safe environment, non-judgmental tone, explain why information matters, confirm confidentiality'
          ]
        },
        {
          title: 'Common Data Gaps',
          type: 'table',
          headers: ['Missing Item', 'Risk'],
          rows: [
            ['Beneficiary designations', 'Assets pass incorrectly'],
            ['Insurance details', 'Coverage gaps unknown'],
            ['Business agreements', 'Succession issues'],
            ['Prior marriages', 'Hidden obligations'],
            ['Debt specifics', 'Inaccurate cash flow']
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          content: ['Gather both quantitative and qualitative data', 'Documents needed: tax returns, statements, policies, estate docs', 'Calculate key ratios: savings rate, debt-to-income', 'Identify gaps between current position and goals', 'Handle sensitive information with privacy and respect']
        }
      ]
    }
  },
  {
    id: 'PRO-L011',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    title: 'Presenting Recommendations and Implementation',
    description: 'Develop clear, actionable recommendations',
    order: 11,
    duration: 30,
    difficulty: 'intermediate',
    topics: [
      'Clear, actionable recommendations',
      'Presenting alternatives and trade-offs',
      'Facilitating informed client decisions',
      'Navigating implementation obstacles'
    ],
    content: {
      sections: [
        {
          title: 'Steps 4 & 5: Developing and Implementing',
          type: 'text',
          content: 'Effective recommendations are specific and actionable, prioritized by importance/urgency, connected to client goals, include alternatives considered, and address implementation steps.'
        },
        {
          title: 'Memory Aid: PRICE',
          type: 'callout',
          content: 'Implementation framework: Prioritize, Responsibilities, Implementation steps, Coordination, Evaluation'
        },
        {
          title: 'Priority Matrix',
          type: 'table',
          headers: ['', 'Urgent', 'Not Urgent'],
          rows: [
            ['Important', 'Do first (estate docs, insurance gaps)', 'Schedule (retirement savings, investments)'],
            ['Not Important', 'Delegate/defer', 'Eliminate']
          ]
        },
        {
          title: 'Presenting Trade-offs Example',
          type: 'example',
          content: 'Roth vs. Traditional IRA comparison: Roth IRA has tax-free withdrawals, no RMDs, but no current deduction and income limits. Traditional IRA has current deduction, no income limits, but taxable withdrawals and required distributions. Best for this client because: [specific reasons based on their situation].'
        },
        {
          title: 'Facilitating Decisions',
          type: 'list',
          items: [
            'AVOID: Making decisions for client, overwhelming with options, pushing products, ignoring client hesitation',
            'DO: Present 2-3 clear options, explain pros/cons, answer questions thoroughly, give time to decide'
          ]
        },
        {
          title: 'When Client Hesitates',
          type: 'list',
          items: [
            'Clarify concerns: "What\'s holding you back?"',
            'Provide more information: Address specific questions',
            'Reframe: Connect to their goals',
            'Accept delay: "Take time to think; we can discuss next week"'
          ]
        },
        {
          title: 'Implementation Framework',
          type: 'list',
          items: [
            'Prioritize actions',
            'Assign responsibilities (client vs. advisor)',
            'Set deadlines',
            'Identify dependencies',
            'Schedule follow-up'
          ]
        },
        {
          title: 'Sample Implementation Plan',
          type: 'table',
          headers: ['Action', 'Responsible', 'Deadline', 'Status'],
          rows: [
            ['Increase 401(k) to 15%', 'Client', '2/15', 'Pending'],
            ['Open 529 account', 'Advisor', '2/20', 'In progress'],
            ['Update beneficiaries', 'Client', '2/28', 'Not started'],
            ['Review insurance', 'Advisor', '3/15', 'Not started']
          ]
        },
        {
          title: 'Common Obstacles and Solutions',
          type: 'table',
          headers: ['Obstacle', 'Solution'],
          rows: [
            ['Inertia', 'Break into small steps'],
            ['Complexity', 'Prioritize top 3 actions'],
            ['Fear', 'Explain risks of inaction'],
            ['Cost', 'Show long-term benefit'],
            ['Time', 'Offer to handle paperwork']
          ]
        },
        {
          title: 'Coordination with Other Professionals',
          type: 'list',
          items: [
            'CPA: Tax planning, return preparation',
            'Attorney: Estate documents, trusts',
            'Insurance specialist: Complex policies',
            'Employer HR: Benefits optimization',
            'Professional courtesy: Get client permission, share relevant information only, don\'t criticize prior advice, respect their expertise'
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          content: ['Recommendations should be specific, prioritized, and actionable', 'Present 2-3 options with clear trade-offs', 'Create implementation plan with deadlines and responsibilities', 'Coordinate with CPAs, attorneys, other professionals', 'Document all recommendations and client decisions']
        }
      ]
    }
  },
  {
    id: 'PRO-L012',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    title: 'Monitoring and Updating the Plan',
    description: 'Establish ongoing monitoring systems',
    order: 12,
    duration: 25,
    difficulty: 'intermediate',
    topics: [
      'Ongoing monitoring systems',
      'Plan update triggers',
      'Effective review meetings',
      'Appropriate client contact'
    ],
    content: {
      sections: [
        {
          title: 'Steps 6 & 7: Monitor and Update',
          type: 'text',
          content: 'Financial plans are living documents. Changes occur in client circumstances, laws and regulations, economic conditions, and market performance.'
        },
        {
          title: 'Memory Aid: CALM',
          type: 'callout',
          content: 'Review meeting structure: Check progress, Assess life changes, Look at markets, Make adjustments'
        },
        {
          title: 'Monitoring Framework',
          type: 'list',
          items: [
            'Regular Reviews (Annual+): Progress toward goals, portfolio performance, life changes, strategy effectiveness',
            'Trigger-Based Reviews: Major life events, significant law changes, market disruptions, client requests'
          ]
        },
        {
          title: 'Life Event Triggers',
          type: 'table',
          headers: ['Event', 'Planning Areas Affected'],
          rows: [
            ['Marriage', 'Beneficiaries, estate, insurance, tax filing'],
            ['Divorce', 'Asset division, support, beneficiaries'],
            ['Child birth', 'Insurance, education, estate'],
            ['Job change', 'Benefits, retirement, income'],
            ['Inheritance', 'Tax, investment, estate'],
            ['Health change', 'Insurance, estate, retirement timeline'],
            ['Home purchase', 'Cash flow, insurance, taxes'],
            ['Retirement', 'Income, distributions, healthcare'],
            ['Death in family', 'Estate, beneficiaries, support']
          ]
        },
        {
          title: 'Review Meeting Structure',
          type: 'list',
          items: [
            'Pre-Meeting Preparation: Pull current statements, calculate performance, review prior recommendations, identify discussion items',
            'Meeting Agenda: Life update (5-10 min), Progress review (15-20 min), Recommendations (15-20 min), Questions & next steps (5-10 min)',
            'Post-Meeting Documentation: Summarize discussions, list decisions made, note new action items, update client file'
          ]
        },
        {
          title: 'Contact Frequency Guide',
          type: 'table',
          headers: ['Client Type', 'Minimum Contact'],
          rows: [
            ['Comprehensive planning', 'Quarterly review, annual in-depth'],
            ['Investment management', 'Quarterly report, semi-annual call'],
            ['Project-based', 'At completion + 6-month follow-up']
          ]
        },
        {
          title: 'Contact Methods',
          type: 'list',
          items: [
            'Scheduled reviews: Most important',
            'Performance reports: Regular cadence',
            'Market updates: As warranted (not alarmist)',
            'Educational content: Value-add',
            'Life event check-ins: Show you care'
          ]
        },
        {
          title: 'When to Update vs. Overhaul',
          type: 'table',
          headers: ['Minor Updates', 'Major Overhaul Needed'],
          rows: [
            ['Asset allocation drift', 'Significant life changes (divorce, retirement)'],
            ['Contribution adjustments', 'Goals fundamentally changed'],
            ['Beneficiary updates', 'Major law changes affecting strategy'],
            ['Insurance tweaks', 'Original plan assumptions now invalid']
          ]
        },
        {
          title: 'Terminating the Relationship',
          type: 'list',
          items: [
            'When appropriate: Client unresponsive, relationship unproductive, values conflict, unable to serve client properly',
            'Proper termination: Provide reasonable notice, explain reasons (if appropriate), return documents/records, offer transition assistance, document the termination'
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          content: ['Plans require ongoing monitoring and updates', 'Life events trigger plan reviews', 'Annual reviews minimum; quarterly for active management', 'Document all meetings and decisions', 'Terminate relationships properly when needed']
        }
      ]
    }
  }
];

export default PRO_FIDUCIARY_LESSONS;
