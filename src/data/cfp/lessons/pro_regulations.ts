/**
 * CFP Professional Conduct Lessons - Regulatory Environment
 * Domain 1: Professional Conduct and Regulation (15% of exam)
 * Blueprint Area: PRO-2 - Laws and Regulations
 * 
 * Topics: SEC, FINRA, state regulations, investment adviser requirements
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_PRO2_LESSONS: CFPLesson[] = [
  {
    id: 'CFP-PRO-L005',
    domain: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    title: 'Federal Securities Laws and Regulations',
    order: 5,
    duration: 35,
    objectives: [
      'Distinguish Investment Adviser from Broker-Dealer',
      'Understand SEC registration requirements',
      'Apply fiduciary standards under securities law',
      'Identify prohibited practices'
    ],
    content: `
# Federal Securities Laws and Regulations

## Key Securities Acts

### Securities Act of 1933
**Focus:** Issuance of NEW securities
- Registration requirements
- Prospectus delivery
- Anti-fraud provisions
- "Truth in Securities" law

### Securities Exchange Act of 1934
**Focus:** Trading EXISTING securities
- Created SEC
- Broker-dealer registration
- Anti-fraud Rule 10b-5
- Insider trading prohibitions

### Investment Advisers Act of 1940
**Focus:** Regulation of INVESTMENT ADVISERS
- Registration requirements
- Fiduciary standard
- Record-keeping requirements
- Advertising restrictions

### Investment Company Act of 1940
**Focus:** Regulation of INVESTMENT COMPANIES
- Mutual funds
- ETFs
- Closed-end funds
- Unit investment trusts

## Investment Adviser Definition

### Three-Element Test
Person is an Investment Adviser if they:

1. **Provide advice/analysis about securities**
   - Recommendations on specific securities
   - Market timing advice
   - Asset allocation advice

2. **Are in the business** of providing advice
   - Regular basis
   - Compensation for advice
   - Holding out as adviser

3. **Receive compensation**
   - Fees, commissions, or other remuneration
   - Doesn't matter who pays

### Exclusions from Definition
- Banks
- Lawyers, accountants, engineers, teachers (incidental advice)
- Broker-dealers (solely incidental, no special compensation)
- Publishers
- Government securities advisers

## SEC vs. State Registration

### SEC Registration Required
Assets Under Management (AUM):
- **≥ $100 million:** MUST register with SEC
- **$25-100 million:** May register with SEC or state
- **< $25 million:** Generally state registration

### State Registration Required
- Investment advisers below SEC thresholds
- Investment adviser representatives
- State where adviser has place of business

### De Minimis Exemption
For advisers with no place of business in state:
- Fewer than 5 clients in the state over 12 months
- Clients are accredited investors, institutional, or existing

## Investment Adviser vs. Broker-Dealer

### Investment Adviser (IA)
| Feature | Investment Adviser |
|---------|-------------------|
| Standard | Fiduciary (best interest) |
| Registration | SEC or state |
| Compensation | Fees (AUM, hourly, flat) |
| Products | Advice on all products |
| Primary law | Investment Advisers Act 1940 |

### Broker-Dealer (BD)
| Feature | Broker-Dealer |
|---------|--------------|
| Standard | Reg BI (best interest) |
| Registration | FINRA/SEC |
| Compensation | Commissions |
| Products | Trade execution |
| Primary law | Securities Exchange Act 1934 |

### Dual Registration
Many firms register as both:
- IA for advisory services
- BD for commission business
- Clear disclosure required

## SEC Regulation Best Interest (Reg BI)

### Applies To
Broker-dealers and associated persons
- When recommending securities
- To retail customers

### Four Obligations

**1. Disclosure Obligation**
- Material facts about relationship
- Form CRS delivery
- Fees, conflicts, limitations

**2. Care Obligation**
- Reasonable basis to believe recommendation is in client's best interest
- Consider costs and alternatives

**3. Conflict of Interest Obligation**
- Policies to identify and address conflicts
- Eliminate sales contests
- Mitigate incentives

**4. Compliance Obligation**
- Policies and procedures to comply
- Supervision and training

## Form CRS (Client Relationship Summary)

### Required Content
- Introduction
- Relationships and services
- Fees, costs, conflicts
- Standards of conduct  
- Disciplinary history
- Additional information

### Delivery Requirements
- Before or at earliest recommendation
- At account opening
- When relationship changes materially

## Form ADV

### Part 1
- Firm information for SEC
- AUM, business practices
- Disciplinary information

### Part 2A (Brochure)
- Plain English description
- Services, fees
- Conflicts of interest
- Disciplinary history

### Part 2B (Brochure Supplement)
- Individual adviser information
- Education, experience
- Disciplinary history

### Delivery Requirements
- Part 2A: Before or at engagement
- Part 2B: Before or at advice
- Annual updates offered
    `,
    keyTakeaways: [
      'Investment Adviser: Provides advice + In the business + Compensation',
      'SEC registration: $100M+ AUM required; $25-100M optional',
      'IAs have fiduciary standard; BDs have Reg BI standard',
      'Form ADV Part 2A is the "brochure" for clients',
      'Form CRS required for both IAs and BDs with retail customers'
    ],
    keyFormulas: [],
    mnemonics: [
      {
        name: 'ABC',
        meaning: 'IA Test: Advice, In the Business, Compensation'
      }
    ],
    practiceProblems: [
      {
        question: 'An investment adviser has $85 million in AUM with offices in 3 states. Must they register with SEC?',
        answer: 'They may choose SEC or state registration. With $25-100M AUM, advisers in multiple states have the option. SEC registration might be simpler than registering in each state. Below $25M requires state registration; above $100M requires SEC registration.'
      }
    ],
    relatedLessons: ['CFP-PRO-L004', 'CFP-PRO-L006']
  },
  {
    id: 'CFP-PRO-L006',
    domain: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    title: 'FINRA and Insurance Regulation',
    order: 6,
    duration: 30,
    objectives: [
      'Understand FINRA\'s role and requirements',
      'Apply suitability and Reg BI standards',
      'Explain insurance regulation framework',
      'Identify licensing requirements'
    ],
    content: `
# FINRA and Insurance Regulation

## FINRA Overview

### What is FINRA?
**Financial Industry Regulatory Authority**
- Self-regulatory organization (SRO)
- Regulates broker-dealers
- Not a government agency
- Authorized by SEC

### FINRA Functions
1. Write and enforce rules
2. Examine member firms
3. License securities professionals (exams)
4. Investigate complaints
5. Arbitration and mediation

## FINRA Registration Requirements

### Representatives
Must pass qualification exams:
- Series 6: Investment company products
- Series 7: General securities
- Series 63/65/66: State exams
- Series 24: Principal/supervisor

### Firms
- Membership required for securities business
- Net capital requirements
- Supervisory requirements
- Advertising review

## FINRA Suitability and Reg BI

### Prior Suitability Rule (Historical)
Three components:
1. **Reasonable-basis:** Advisor understands product
2. **Customer-specific:** Suitable for this customer
3. **Quantitative:** Not excessive trading

### Regulation Best Interest (Current)
Enhanced standard for retail customers:
- Must be in customer's best interest
- Not just suitable
- Consider costs
- Disclose conflicts

### Key Differences: Suitability vs. Best Interest
| Aspect | Suitability | Reg BI |
|--------|-------------|--------|
| Standard | Suitable for customer | Best interest |
| Cost consideration | Lesser role | Must consider |
| Conflicts | Disclosure | Disclosure + mitigation |
| Applies when | All customers | Retail customers |

## Insurance Regulation

### State-Based System
Insurance regulated primarily by states:
- Each state has insurance commissioner
- Licensing by state
- Different rules by state

### NAIC (National Association of Insurance Commissioners)
- Coordinates state regulation
- Model laws and regulations
- Not a regulatory body itself

## Insurance Licensing

### Producer Licensing
Required to sell insurance products:
- Life and health
- Property and casualty
- Various lines authority

### Requirements
1. Pre-licensing education
2. Pass state exam
3. Background check
4. Continuing education

### Non-Resident Licensing
Selling in state where not resident:
- Reciprocity agreements
- Home state license required
- Non-resident license in target state

## Insurance Conduct Standards

### Suitability (Similar to Securities)
- Product appropriate for customer
- Match to needs and risk tolerance
- Document analysis

### Replacement Regulations
When replacing existing policy:
- Enhanced disclosure
- Comparison of policies
- Potential disadvantages disclosed
- Often requires signatures

### Misrepresentation and Fraud
Prohibited:
- Misrepresenting policy terms
- Twisting (replacement solely for new commission)
- Rebating (usually prohibited)
- Churning (excessive replacement)

## Variable Products

### Dual Regulation
Variable annuities and variable life insurance regulated by:
- **Insurance:** State insurance commissioner
- **Securities:** SEC/FINRA

### Selling Requirements
Must have both:
- State insurance license
- Securities license (Series 6 or 7)

### Prospectus Requirement
- Variable products are securities
- Prospectus required before purchase
- Cannot guarantee returns

## Anti-Money Laundering (AML)

### Bank Secrecy Act / USA PATRIOT Act
Financial institutions must:
- Customer Identification Program (CIP)
- Report suspicious activity (SAR)
- Report cash transactions >$10,000 (CTR)

### CFP® professionals:
- May have AML obligations through firms
- Report suspicious activity
- Know your customer
    `,
    keyTakeaways: [
      'FINRA is an SRO that regulates broker-dealers and their representatives',
      'Reg BI requires "best interest" standard for retail customers',
      'Insurance is regulated primarily by states, not federal government',
      'Variable products require both insurance and securities licenses',
      'Replacement of insurance policies triggers enhanced disclosure'
    ],
    keyFormulas: [],
    mnemonics: [
      {
        name: 'FINRA',
        meaning: 'Functions: Investigations, Norms (rules), Registrations (exams), Arbitration'
      }
    ],
    practiceProblems: [
      {
        question: 'A registered representative wants to sell variable annuities. What licenses are required?',
        answer: 'Both securities and insurance licenses. The securities license (Series 6 or 7) is required because variable annuities are securities. The state insurance license (variable annuity authority) is required because they are also insurance products. This dual registration reflects the dual regulatory nature of variable products.'
      }
    ],
    relatedLessons: ['CFP-PRO-L005', 'CFP-PRO-L007']
  },
  {
    id: 'CFP-PRO-L007',
    domain: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    title: 'ERISA and Qualified Plan Fiduciary Standards',
    order: 7,
    duration: 30,
    objectives: [
      'Understand ERISA fiduciary requirements',
      'Apply prudent expert standard',
      'Identify prohibited transactions',
      'Navigate DOL fiduciary rules'
    ],
    content: `
# ERISA and Qualified Plan Fiduciary Standards

## ERISA Overview

### Purpose
**Employee Retirement Income Security Act of 1974**
- Protect employee benefit plan participants
- Establish fiduciary standards
- Reporting and disclosure requirements
- Enforcement mechanisms

### Plans Covered
- Private employer retirement plans
- 401(k), pension, profit-sharing
- Health and welfare plans

### Plans NOT Covered
- Government plans
- Church plans
- IRAs (but similar rules may apply)

## ERISA Fiduciary Status

### Who is a Fiduciary?
A person is an ERISA fiduciary if they:

1. **Exercise discretion** in plan management
2. **Exercise authority** over plan assets
3. **Have discretionary responsibility** for administration
4. **Provide investment advice** for compensation

### Types of Fiduciaries
| Type | Role |
|------|------|
| Named fiduciary | Identified in plan document |
| Plan administrator | Manages plan operations |
| Investment manager | Manages plan investments |
| Trustee | Holds plan assets |

## ERISA Fiduciary Duties

### Exclusive Benefit Rule
Act solely in interest of participants and beneficiaries
- Benefits only to participants, not employer
- No self-dealing

### Prudent Expert Rule
Act with care, skill, prudence, and diligence of a prudent expert
- Not just a "reasonable person"
- Standard of a professional
- Must have (or obtain) expertise

### Diversification Requirement
Diversify investments to minimize large loss risk
- Unless clearly prudent not to
- Modern portfolio theory applicable

### Follow Plan Documents
Operate plan in accordance with governing documents
- Unless document violates ERISA
- Document consistent with law

## Prohibited Transactions

### Categories

**1. Party in Interest Transactions**
Generally prohibited between plan and:
- Fiduciary
- Service provider
- Employer
- Employees of above
- Relatives of above

**2. Specific Prohibitions**
- Selling/leasing property to plan
- Lending to plan or from plan
- Transferring plan assets
- Using plan assets for own benefit

### Exemptions
Some transactions permitted:
- Reasonable compensation for services
- Arm's length transactions
- DOL exemptions (individual or class)

## DOL Fiduciary Rule

### Investment Advice Fiduciary
A person is a fiduciary when providing:
- Investment recommendations
- For a fee or compensation
- To retirement plans or IRAs

### Retirement Investors
Includes advice to:
- ERISA plan fiduciaries
- Plan participants
- IRA owners
- Rollover recommendations

### PTE 2020-02 (Prohibited Transaction Exemption)
Allows conflicted advice if:
- Acknowledge fiduciary status
- Act in best interest
- Avoid misleading statements
- Reasonable compensation
- Disclosure of conflicts

## Rollover Recommendations

### Heightened Scrutiny
Rollover recommendations must consider:
- Fees (IRA vs. plan)
- Investment options
- Services/features
- Penalty/protection differences

### Documentation Required
- Reasons for recommendation
- Alternatives considered
- Fee comparison
- Why rollover is in best interest

## Bonding Requirements

### Fidelity Bond
- Required for all fiduciaries
- Protects against loss from dishonesty
- Minimum 10% of plan assets
- Maximum $500,000 ($1M with employer securities)

## Consequences of Breach

### Personal Liability
Fiduciaries personally liable for:
- Losses to plan from breach
- Profits made from breach
- Breach of co-fiduciary

### Enforcement
- DOL investigation and lawsuit
- Participant lawsuits
- Excise taxes
- Criminal penalties possible
    `,
    keyTakeaways: [
      'ERISA creates fiduciary status through discretion, authority, or investment advice',
      'Prudent EXPERT standard—higher than ordinary prudence',
      'Prohibited transactions bar dealings between plan and parties in interest',
      'DOL fiduciary rule applies to investment advice to retirement accounts including IRAs',
      'Rollover recommendations require documented best-interest analysis'
    ],
    keyFormulas: [],
    mnemonics: [
      {
        name: 'EPDF',
        meaning: 'ERISA Duties: Exclusive benefit, Prudent expert, Diversify, Follow documents'
      }
    ],
    practiceProblems: [
      {
        question: 'A financial advisor recommends a client roll their 401(k) to an IRA that charges higher fees with similar investments. Is this a fiduciary decision?',
        answer: 'Yes. Under DOL rules, rollover recommendations are fiduciary advice. The advisor must document why the rollover is in the client\'s best interest despite higher fees—perhaps due to better advice, planning integration, or other valuable services. If fees are higher without corresponding value, the recommendation may breach fiduciary duty.'
      }
    ],
    relatedLessons: ['CFP-PRO-L005', 'CFP-PRO-L006']
  },
  {
    id: 'CFP-PRO-L008',
    domain: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    title: 'Consumer Protection and Suitability',
    order: 8,
    duration: 25,
    objectives: [
      'Apply know-your-customer requirements',
      'Understand elder financial protection',
      'Navigate complaint handling',
      'Identify consumer protection requirements'
    ],
    content: `
# Consumer Protection and Suitability

## Know Your Customer (KYC)

### Required Information
At minimum, gather:
- Name, address, identification
- Age and date of birth
- Employment status
- Annual income
- Net worth and liquid assets
- Investment objectives
- Risk tolerance
- Time horizon
- Tax status

### Purpose
- Ensure suitability
- Comply with regulations
- Anti-money laundering
- Customer service

### Ongoing Obligation
- Update information periodically
- Review at significant life events
- Confirm accuracy at transactions

## Suitability Analysis

### Reasonable Basis Suitability
Advisor must understand:
- Product features
- Risks
- Costs
- Appropriate uses

### Customer-Specific Suitability
Recommendation must be appropriate for THIS client:
- Financial situation
- Investment objectives
- Risk tolerance
- Time horizon
- Tax situation

### Quantitative Suitability
Pattern of recommendations must be appropriate:
- Not excessive trading
- Not excessive costs
- Consider whole relationship

## Elder Financial Protection

### Vulnerable Adults
Higher risk of financial exploitation:
- Cognitive decline
- Isolation
- Trust in others
- Less tech-savvy

### Regulatory Protections

**FINRA Rule 2165:**
- Place temporary hold on disbursements
- If reasonable belief of exploitation
- Up to 25 business days

**FINRA Rule 4512:**
- Obtain trusted contact person
- For specified account types
- May contact if concerns arise

### Best Practices
- Require call-backs for large transactions
- Document unusual behavior
- Consider capacity assessments
- Train staff on warning signs
- Report suspected abuse

## Complaint Handling

### Firm Requirements
- Written complaint procedures
- Document all complaints
- Investigate thoroughly
- Respond timely
- Retain records

### Regulatory Implications
- Report to FINRA (some complaints)
- Report on Form ADV (significant events)
- Report to CFP Board (as applicable)

### Best Practices
- Take complaints seriously
- Respond within firm timelines
- Escalate appropriately
- Document resolution
- Learn from patterns

## Privacy and Data Protection

### Regulation S-P (SEC)
- Privacy notices required
- Opt-out for information sharing
- Safeguards required

### Gramm-Leach-Bliley Act
- Financial privacy protections
- Information security requirements
- Annual privacy notices

### State Laws
- May have additional requirements
- California Consumer Privacy Act (CCPA)
- Various state breach notification laws

### CFP Board Requirements
- Confidentiality duty
- Reasonable safeguards
- Limited use of information

## Consumer Protection Disclosures

### Investment Adviser Disclosures
- Form ADV Part 2A (Brochure)
- Form ADV Part 2B (Supplement)
- Form CRS
- Conflicts of interest

### Broker-Dealer Disclosures
- Form CRS
- Transaction confirmations
- Account statements
- Fee schedules

### Insurance Disclosures
- Policy illustrations
- Replacement comparison forms
- Compensation disclosure (some states)

## Arbitration and Dispute Resolution

### FINRA Arbitration
- Predispute agreements common
- Binding decision
- Limited appeal rights
- Generally faster than court

### Mediation
- Non-binding
- Facilitator helps parties agree
- Often faster and cheaper

### CFP Board Process
- Separate from legal process
- Can suspend or revoke certification
- Public discipline for serious violations
    `,
    keyTakeaways: [
      'KYC requires gathering financial situation, objectives, risk tolerance, time horizon',
      'Suitability analysis has three parts: reasonable basis, customer-specific, quantitative',
      'FINRA Rule 2165 allows holds on elder disbursements if exploitation suspected',
      'Trusted contact person helps protect vulnerable clients',
      'Privacy laws require notices, opt-outs, and information safeguards'
    ],
    keyFormulas: [],
    mnemonics: [
      {
        name: 'FROOT',
        meaning: 'KYC Elements: Financial situation, Risk tolerance, Objectives, Other info, Time horizon'
      }
    ],
    practiceProblems: [
      {
        question: 'An 82-year-old client\'s daughter, who is not on the account, requests a $200,000 wire transfer from mom\'s account to her personal account. The client seems confused on the phone. What should the firm do?',
        answer: 'Place a temporary hold under FINRA Rule 2165 (up to 25 days) based on reasonable belief of exploitation. Contact the trusted contact person if one is on file. Document observations about the client\'s confusion. Attempt to speak with the client privately. Consider reporting to Adult Protective Services. Do not process the transaction until concerns are resolved.'
      }
    ],
    relatedLessons: ['CFP-PRO-L006', 'CFP-PRO-L007']
  }
];

export default CFP_PRO2_LESSONS;
