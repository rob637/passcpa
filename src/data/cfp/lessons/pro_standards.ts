/**
 * CFP Professional Conduct Lessons - Standards and Ethics
 * Domain 1: Professional Conduct and Regulation (15% of exam)
 * Blueprint Area: PRO-1 - CFP Board's Code and Standards
 * 
 * Topics: Code of Ethics, Standards of Conduct, fiduciary duty
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_PRO1_LESSONS: CFPLesson[] = [
  {
    id: 'CFP-PRO-L001',
    domain: 'CFP-PCR',
    blueprintArea: 'PRO-1',
    title: 'CFP Board Code of Ethics and Standards of Conduct',
    order: 1,
    duration: 35,
    objectives: [
      'Understand the Code of Ethics and its principles',
      'Apply the Fiduciary Duty at all times',
      'Distinguish duties when providing Financial Advice vs. Financial Planning',
      'Recognize key Standards of Conduct'
    ],
    content: `
# CFP Board Code of Ethics and Standards of Conduct

## The Code of Ethics

### Four Principles

Every CFP® professional must adhere to these principles:

**1. Act with Honesty, Integrity, Competence, and Diligence**
- Be truthful in all representations
- Maintain competency in practice areas
- Perform work with appropriate care

**2. Act in the Client's Best Interests**
- The foundational principle
- Client interests override practitioner's interests
- Applies at ALL times

**3. Exercise Due Care**
- Skill, prudence, and diligence
- Apply sound professional judgment
- Appropriate documentation

**4. Maintain the Standards of the Profession**
- Uphold the integrity of the profession
- Report violations by CFP® professionals
- Cooperate with CFP Board

## Fiduciary Duty: At All Times

### Key Change (2019)
CFP® professionals now owe fiduciary duty **at all times** when providing Financial Advice

### What "At All Times" Means
- Not limited to financial planning engagements
- Applies to ALL Financial Advice
- Even one-off recommendations

### Fiduciary Standard Components

**Duty of Loyalty:**
- Place client's interests ahead of your own
- Avoid or manage conflicts of interest
- Disclose conflicts that cannot be avoided

**Duty of Care:**
- Act with skill, prudence, and diligence
- Make recommendations in client's best interest
- Consider factors relevant to the client

## Financial Advice vs. Financial Planning

### Financial Advice
Communication applying financial planning considerations to a client's situation

**Triggers Fiduciary Duty:**
- Recommendation on specific product or strategy
- Applies to one-time advice
- Does not require financial plan

### Financial Planning
Collaborative process with additional requirements:
1. Understanding client's situation
2. Identifying and selecting goals
3. Analyzing current course and alternatives
4. Developing recommendations
5. Presenting recommendations
6. Implementing recommendations
7. Monitoring progress and updating

### Distinction Matters
| Activity | Fiduciary Duty? | 7-Step Process? |
|----------|-----------------|-----------------|
| Financial Advice | Yes | No |
| Financial Planning | Yes | Yes |
| Sales without advice | See rules | No |

## Standards of Conduct Overview

### A. Duties When Providing Financial Advice
1. Fiduciary duty at all times
2. Integrity
3. Competence
4. Diligence
5. Disclose and manage conflicts
6. Sound and objective professional judgment
7. Professionalism
8. Comply with applicable laws

### B. Duties When Providing Financial Planning
All "A" duties, PLUS:
1. Financial Planning agreement requirements
2. Understanding client's information
3. Appropriate scope of engagement

### C. Duties to Prospective Clients
- Honesty
- Accurate representation
- No misleading

### D. Duties to Clients and Prospective Clients
- Privacy and confidentiality
- Complete, accurate, timely disclosures

### E. Duties to Firms and Subordinates
- Reasonable supervision
- Not to intimidate
- Compliance systems

### F. Duties to CFP Board
- Cooperation
- Disclosure of concerning conduct
- Compliance with standards
    `,
    keyTakeaways: [
      'Fiduciary duty applies AT ALL TIMES when providing Financial Advice',
      'Four Code principles: Honesty/Integrity, Client\'s Best Interest, Due Care, Standards',
      'Financial Planning requires the 7-step process; Financial Advice does not',
      'Both Financial Advice and Financial Planning trigger fiduciary duty',
      'Duty of Loyalty requires placing client interests first'
    ],
    keyFormulas: [],
    mnemonics: [
      {
        name: 'HIDS',
        meaning: 'Code Principles: Honesty, (client) Interest, Due care, Standards'
      }
    ],
    practiceProblems: [
      {
        question: 'A CFP® professional recommends a specific mutual fund to a client during a one-time meeting (not a comprehensive planning engagement). Does fiduciary duty apply?',
        answer: 'Yes. This is Financial Advice, and fiduciary duty applies "at all times" when providing Financial Advice, even without a formal financial planning engagement.'
      }
    ],
    relatedLessons: ['CFP-PRO-L002', 'CFP-PRO-L003']
  },
  {
    id: 'CFP-PRO-L002',
    domain: 'CFP-PCR',
    blueprintArea: 'PRO-1',
    title: 'Conflicts of Interest and Duty of Loyalty',
    order: 2,
    duration: 30,
    objectives: [
      'Identify common conflicts of interest',
      'Apply the conflict management framework',
      'Understand compensation-related conflicts',
      'Distinguish material from non-material conflicts'
    ],
    content: `
# Conflicts of Interest and Duty of Loyalty

## Understanding Conflicts of Interest

### Definition
A circumstance where a CFP® professional's interests or duties to third parties conflict (or appear to conflict) with duties to the client

### Categories of Conflicts

**1. Personal Conflicts**
- Personal financial interest in transaction
- Relationships with service providers
- Personal use of client information

**2. Business Conflicts**
- Proprietary products
- Revenue sharing arrangements
- Compensation incentives

**3. Third-Party Conflicts**
- Duties to employer
- Duties to other clients
- Referral arrangements

## Conflict Management Framework

### Step 1: Avoid
If possible, avoid the conflict entirely
- Decline to provide advice
- Refer to another provider
- Restructure arrangement

### Step 2: Disclose
If cannot avoid, disclose BEFORE advice/services
- Material conflict description
- How conflict affects advice
- Written disclosure recommended

### Step 3: Manage
Take appropriate steps to mitigate impact
- Additional safeguards
- Independent review
- Enhanced documentation

### Material Conflicts Must Be:
1. Disclosed in writing
2. Disclosed in a clear and detailed manner
3. Disclosed before or at time of engagement

## Compensation-Related Conflicts

### Commission-Based Compensation
**Conflicts:**
- Incentive to sell products
- Incentive for larger/more expensive products
- Bias toward products with higher commissions

**Management:**
- Full disclosure of compensation
- Compare lower-cost alternatives
- Document rationale

### Fee-Based Compensation
**Conflicts:**
- AUM fees: Incentive against distributions
- Hourly: Incentive to prolong engagement
- Flat fee: Incentive to minimize work

**Management:**
- Transparency about fee structure
- Regular fee reviews
- Documentation

### Third-Party Compensation
**Conflicts:**
- Revenue sharing
- Referral fees
- Soft dollar arrangements

**Disclosure Required:**
- Source of compensation
- Amount (if determinable)
- Impact on objectivity

## Common Conflict Scenarios

### Scenario 1: Proprietary Products
**Conflict:** Firm incentivizes sale of in-house products
**Management:**
- Disclose compensation differential
- Compare to non-proprietary alternatives
- Document why proprietary is appropriate

### Scenario 2: Custody of Client Assets
**Conflict:** Access to client funds
**Management:**
- Independent custodian
- Regular account statements
- Segregation of duties

### Scenario 3: Outside Business Activities
**Conflict:** Other employment may create bias
**Management:**
- Disclose to clients
- Disclose to firm
- Evaluate impact on recommendations

### Scenario 4: Gifts and Entertainment
**Conflict:** May create bias toward gifting party
**Management:**
- Firm policies on limits
- Disclosure when material
- Decline excessive gifts

## Duty of Loyalty in Practice

### "Best Interests" Analysis
When making recommendations, consider:
1. Client's objectives and needs
2. Tax implications
3. Costs and fees
4. Liquidity needs
5. Suitability of product/strategy
6. Client's overall situation

### Cannot Consider:
- Revenue to the CFP® professional
- Benefits to the firm
- Personal relationships with providers

### Documentation Requirements
- Record conflict analysis
- Record disclosure
- Record management steps
- Maintain for appropriate period
    `,
    keyTakeaways: [
      'Conflicts must be avoided, or disclosed AND managed',
      'Material conflicts require written disclosure before engagement',
      'Compensation from any source creates potential conflicts',
      'Duty of Loyalty requires placing client interests first',
      'Document conflict identification, disclosure, and management'
    ],
    keyFormulas: [],
    mnemonics: [
      {
        name: 'ADM',
        meaning: 'Conflict Framework: Avoid, Disclose, Manage'
      }
    ],
    practiceProblems: [
      {
        question: 'A CFP® professional receives higher commissions on Product A than Product B, but Product B is more suitable for the client. What should they do?',
        answer: 'Recommend Product B because it is in the client\'s best interest. Disclose the compensation difference. Document why B is more suitable despite lower compensation. The fiduciary duty requires recommendations based on client interests, not advisor compensation.'
      }
    ],
    relatedLessons: ['CFP-PRO-L001', 'CFP-PRO-L003']
  },
  {
    id: 'CFP-PRO-L003',
    domain: 'CFP-PCR',
    blueprintArea: 'PRO-1',
    title: 'The Financial Planning Process',
    order: 3,
    duration: 30,
    objectives: [
      'Apply the 7-step financial planning process',
      'Understand client engagement requirements',
      'Identify scope of engagement considerations',
      'Document planning appropriately'
    ],
    content: `
# The Financial Planning Process

## The Seven Steps

### Step 1: Understanding the Client's Personal and Financial Circumstances

**Obtain relevant information:**
- Family situation
- Financial position
- Current planning
- Values, attitudes, expectations
- Risk tolerance

**Qualitative and Quantitative:**
- Assets, liabilities, cash flow (quantitative)
- Goals, concerns, preferences (qualitative)

### Step 2: Identifying and Selecting Goals

**Work with client to:**
- Clarify goals
- Prioritize goals
- Quantify goals (amount, timing)
- Distinguish needs vs. wants

**Documentation:**
- Written goal statement
- Measurable objectives
- Timeline for achievement

### Step 3: Analyzing the Client's Current Course of Action and Potential Alternative Courses of Action

**Current Course Analysis:**
- Will current strategies achieve goals?
- Identify gaps and shortfalls
- Evaluate existing products/strategies

**Alternative Analysis:**
- Develop potential strategies
- Compare alternatives
- Consider tax implications
- Evaluate risks

### Step 4: Developing the Financial Planning Recommendation(s)

**Recommendations must:**
- Address identified goals
- Be based on complete analysis
- Consider all relevant factors
- Be suitable for the client

**Present alternatives when appropriate:**
- Multiple ways to achieve goals
- Trade-offs explained
- Rationale documented

### Step 5: Presenting the Financial Planning Recommendation(s)

**Effective presentation:**
- Clear communication
- Explain rationale
- Address questions
- Confirm understanding

**Documentation:**
- Written recommendations
- Assumptions explained
- Risks disclosed
- Client acknowledgment

### Step 6: Implementing the Financial Planning Recommendation(s)

**If CFP® implements:**
- Execute recommendations
- Coordinate with other professionals
- Document implementation

**If client implements:**
- Provide clear instructions
- Referrals if needed
- Follow-up timeline

**Responsibilities:**
- Appropriate products/services selected
- Best interest standard applies
- Timely implementation

### Step 7: Monitoring Progress and Updating

**Ongoing responsibilities:**
- Periodic reviews
- Update for life changes
- Assess goal progress
- Revise as needed

**Scope of monitoring:**
- Defined in engagement
- May be limited or comprehensive
- Document mutual understanding

## Engagement Requirements

### Written Agreement Required
Financial Planning engagement must have:
- Scope of engagement
- Client/planner responsibilities
- Compensation and conflicts
- Duration and termination

### Scope Considerations
**Must consider:**
- Client needs and objectives
- Relevant financial areas
- Integration of areas

**Scope limitations:**
- Must be acceptable to client
- Document limitations
- Refer for out-of-scope needs

### Reasonable Scope
**Limited scope acceptable when:**
- Client requests specific focus
- Client understands limitations
- CFP® documents scope

**Not acceptable:**
- Avoiding material issues
- Client unaware of gaps
- Against client's interest

## Competence Requirements

### Practice Areas
Must be competent in areas where providing advice:
- Investment planning
- Tax planning
- Retirement planning
- Estate planning
- Insurance planning
- General principles

### If Not Competent
Options:
1. Decline the engagement
2. Refer to appropriate professional
3. Collaborate with competent professional

### Continuing Education
- 30 CE credits every 2-year period
- Maintain competence
- Ethics requirement
    `,
    keyTakeaways: [
      'Financial Planning requires all 7 steps; Financial Advice does not',
      'Written engagement agreement required for Financial Planning',
      'Scope can be limited if client understands and agrees',
      'Monitoring obligations depend on engagement scope',
      'Must be competent in areas where providing advice'
    ],
    keyFormulas: [],
    mnemonics: [
      {
        name: 'UIAA DPM',
        meaning: '7 Steps: Understand, Identify goals, Analyze, develop recc(A)mmendations, Develop, Present, iMplement, Monitor'
      }
    ],
    practiceProblems: [
      {
        question: 'A client only wants retirement planning help and explicitly declines other planning areas. Can a CFP® provide limited-scope engagement?',
        answer: 'Yes, if the client understands and accepts the limitations, and the limited scope is appropriate for the client. The CFP® should document the scope, explain what\'s excluded, and refer for out-of-scope needs. However, if ignoring other areas would harm the client, the CFP® may need to decline or address the issue.'
      }
    ],
    relatedLessons: ['CFP-PRO-L001', 'CFP-PRO-L004']
  },
  {
    id: 'CFP-PRO-L004',
    domain: 'CFP-PCR',
    blueprintArea: 'PRO-1',
    title: 'Practice Standards and Professional Responsibility',
    order: 4,
    duration: 25,
    objectives: [
      'Apply confidentiality requirements',
      'Understand supervision obligations',
      'Navigate termination and records',
      'Respond to CFP Board inquiries'
    ],
    content: `
# Practice Standards and Professional Responsibility

## Confidentiality

### General Rule
Client information is confidential
- Cannot be disclosed without consent
- Applies during and after relationship

### Exceptions to Confidentiality
Disclosure permitted when:
1. **Client consents** (written preferred)
2. **Legal requirement** (subpoena, court order)
3. **Defense of charges** against CFP®
4. **CFP Board request** during investigation
5. **Disclosure to related parties** (accountants, attorneys working with client)

### Information Security
- Reasonable safeguards required
- Protect against unauthorized access
- Response plan for breaches

## Supervision Obligations

### Supervisory CFP® Professionals
If supervising others, must:
- Establish reasonable supervision systems
- Ensure compliance with Standards
- Not condone violations

### Cannot:
- Knowingly permit violations
- Pressure subordinates to violate
- Create incentives for violations

### Supervised CFP® Professionals
Remains individually responsible for:
- Personal compliance with Standards
- Cannot blame supervisor for violations
- Must report supervisor misconduct

## Termination of Services

### Client Termination
Client may terminate at any time
- Provide records as appropriate
- Transition assistance

### CFP® Termination
May terminate when:
- Client fails to provide information
- Client fails to follow recommendations
- Relationship becomes untenable
- Business considerations

**Proper Termination:**
- Reasonable notice
- Transfer assistance if requested
- Return of client property/records

### Record Retention
- Maintain appropriate records
- Provide copies to client on request
- Firm policies may govern retention period

## Duties to CFP Board

### Cooperation Required
Must cooperate with:
- Investigations
- Proceedings
- Information requests

### Disclosure Requirements
Must disclose:
- Criminal convictions
- Civil proceedings
- Regulatory actions
- Bankruptcy
- Professional designations revoked

**Timing:**
- Initial certification
- When changes occur (30 days)
- Biennial renewal

### Reporting Others
Should report:
- Conduct that raises concerns
- Knowledge of violations
- Only when in good faith

## Prohibited Conduct

### Examples
- Misleading advertising
- Guaranteeing results
- Misappropriating funds
- Forgery
- False statements to CFP Board
- Obstruction of investigations

### Consequences
- Private censure
- Public letter of admonition
- Suspension
- Revocation of certification

## Professional Responsibility Summary

### Always Required:
- Fiduciary standard (Financial Advice)
- Honesty and integrity
- Competence in practice areas
- Client confidentiality
- Conflict disclosure

### Documentation:
- Engagement agreements
- Client information
- Recommendations
- Disclosures
- Implementation records
    `,
    keyTakeaways: [
      'Client information is confidential—exceptions limited',
      'CFP® supervisors must establish reasonable compliance systems',
      'Each CFP® is individually responsible regardless of supervision',
      'Must cooperate with CFP Board investigations and disclose conduct',
      'Termination requires reasonable notice and record transfer'
    ],
    keyFormulas: [],
    mnemonics: [
      {
        name: 'CLCD',
        meaning: 'Confidentiality Exceptions: Consent, Legal requirement, CFP Board, Defense of charges'
      }
    ],
    practiceProblems: [
      {
        question: 'A CFP® professional is subpoenaed to testify about a client\'s finances in a lawsuit. Can they disclose the information?',
        answer: 'Yes. Legal requirements (subpoenas, court orders) are an exception to confidentiality. The CFP® may (and should) disclose only what is legally required and notify the client if possible. They should consult with legal counsel about scope of required disclosure.'
      }
    ],
    relatedLessons: ['CFP-PRO-L002', 'CFP-PRO-L005']
  }
];

export default CFP_PRO1_LESSONS;
