// Expanded Written Communication Tasks
// Comprehensive coverage across all CPA exam sections
// Aligned with AICPA Blueprint requirements

import { WCTask } from '../../types';

export const WC_EXPANDED: WCTask[] = [
  // ==========================================
  // FAR - Financial Accounting Written Comms
  // ==========================================
  {
    id: 'wc_far_001',
    section: 'FAR',
    type: 'written_communication',
    topic: 'Revenue Recognition (ASC 606)',
    difficulty: 'moderate',
    estimatedTime: 25,
    blueprintArea: 'FAR-III',
    scenario: `You are a senior accountant at a mid-sized CPA firm. Your client, SoftwarePlus Inc., develops and licenses enterprise software. The company recently entered into a new contract with MegaCorp with the following terms:

- Three-year software license: $300,000
- Implementation services: $75,000 (could be performed by third parties)
- Post-contract support (PCS) for 3 years: $90,000
- Hardware server (specialized): $35,000

The software cannot function without the specialized hardware. Implementation services are not essential to the software functionality. Payment is due 50% at signing, 50% upon go-live.

The CFO, Maria Gonzalez, has asked for guidance on how to recognize revenue from this arrangement under ASC 606.`,
    task: `Write a professional memo to Maria Gonzalez, CFO of SoftwarePlus Inc., that:
1. Identifies the performance obligations in this contract
2. Explains how the transaction price should be allocated
3. Describes when revenue should be recognized for each performance obligation
4. Addresses any potential variable consideration or constraint issues

Your memo should demonstrate your understanding of the five-step revenue recognition model under ASC 606.`,
    keyPoints: [
      'Five-step model: identify contract, POs, transaction price, allocate, recognize',
      'Distinct performance obligations analysis',
      'Bundle vs. separate (software + hardware)',
      'Point-in-time vs. over-time recognition',
      'Standalone selling price allocation',
      'Variable consideration assessment',
    ],
    sampleResponse: `MEMORANDUM

TO: Maria Gonzalez, CFO, SoftwarePlus Inc.
FROM: [Candidate Name], Senior Accountant
DATE: [Current Date]
RE: Revenue Recognition Analysis - MegaCorp Contract under ASC 606

Dear Ms. Gonzalez,

I have analyzed the MegaCorp contract to provide guidance on proper revenue recognition under ASC 606. Below is my assessment following the five-step model.

STEP 1: IDENTIFY THE CONTRACT
The MegaCorp arrangement meets all criteria for a valid contract under ASC 606: approved by both parties, identifiable rights and payment terms, commercial substance, and probable collection.

STEP 2: IDENTIFY PERFORMANCE OBLIGATIONS
Analysis indicates three distinct performance obligations:

1. Software License + Hardware (Combined): Since the software cannot function without the specialized hardware, these items are not distinct and should be combined into a single performance obligation.

2. Implementation Services: These services are capable of being distinct (third parties can perform them) and are separately identifiable within the contract context. This is a separate performance obligation.

3. Post-Contract Support (PCS): The ongoing support is a distinct service delivered over time and represents a separate performance obligation.

STEP 3: DETERMINE TRANSACTION PRICE
Total transaction price: $500,000 ($300,000 + $75,000 + $90,000 + $35,000)
No variable consideration is present as payment terms are fixed.

STEP 4: ALLOCATE TRANSACTION PRICE
Allocation should be based on relative standalone selling prices (SSP). If observable SSPs are not available, estimate using expected cost plus margin or adjusted market approaches.

STEP 5: RECOGNIZE REVENUE

- Software + Hardware: Recognize at a point in time when control transfers (upon delivery/go-live when customer can direct use and obtain benefits)
- Implementation Services: Recognize over time as services are performed (likely using input method - hours incurred)
- PCS: Recognize ratably over the 3-year support period (straight-line)

I recommend documenting the SSP estimation methodology and maintaining evidence of control transfer timing for audit support.

Please contact me if you need assistance with the specific allocation calculations.

Respectfully,
[Candidate Name]`,
  },
  {
    id: 'wc_far_002',
    section: 'FAR',
    type: 'written_communication',
    topic: 'Lease Accounting (ASC 842)',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'FAR-III',
    scenario: `You are a controller at Regional Healthcare Network (RHN). The organization has several lease arrangements that need evaluation under ASC 842:

Lease A - Medical Equipment:
- 5-year term, $50,000 annual payments
- Equipment useful life: 8 years
- Fair value: $250,000
- No purchase option or transfer of ownership
- RHN's incremental borrowing rate: 6%

Lease B - Administrative Building:
- 10-year term, $200,000 annual payments
- Option to extend for 5 additional years at same rate (reasonably certain to exercise)
- Option to purchase at end of initial term for $500,000 (fair value expected to be $1.2M)
- Building useful life: 40 years

The CFO wants to understand how these leases should be classified and recorded.`,
    task: `Write a professional memo to the CFO that:
1. Explains the criteria for finance vs. operating lease classification
2. Analyzes each lease and recommends proper classification
3. Describes the initial recognition and subsequent measurement for each lease
4. Discusses the impact on the balance sheet and income statement

Your memo should demonstrate thorough understanding of ASC 842 lease accounting.`,
    keyPoints: [
      'OWNES criteria for finance lease classification',
      'Lease term determination including options',
      'Right-of-use asset and liability measurement',
      'Finance lease: interest + amortization pattern',
      'Operating lease: straight-line expense pattern',
      'Balance sheet gross-up impact',
    ],
    sampleResponse: `[Sample response would detail the classification analysis and accounting treatment]`,
  },
  {
    id: 'wc_far_003',
    section: 'FAR',
    type: 'written_communication',
    topic: 'Impairment of Long-Lived Assets',
    difficulty: 'moderate',
    estimatedTime: 25,
    blueprintArea: 'FAR-II',
    scenario: `You are the accounting manager for Industrial Manufacturing Corp. Due to significant changes in market conditions, management is concerned about potential impairment of the company's production facility. The following information is available:

Production Facility:
- Carrying value: $15,000,000
- Remaining useful life: 10 years
- Estimated undiscounted future cash flows: $12,000,000
- Fair value (based on market approach): $9,500,000
- Fair value less costs to sell: $9,000,000

Management is unsure whether impairment exists and how to measure any loss.`,
    task: `Write a memo to management explaining:
1. The two-step impairment test under U.S. GAAP (ASC 360)
2. Application of the test to the production facility
3. Calculation and recording of any impairment loss
4. Subsequent accounting considerations

Demonstrate your understanding of long-lived asset impairment accounting.`,
    keyPoints: [
      'Step 1: Recoverability test (undiscounted cash flows)',
      'Step 2: Measurement (fair value)',
      'Asset group concept',
      'Impairment loss = Carrying value - Fair value',
      'No reversal of impairment under GAAP',
      'Disclosure requirements',
    ],
    sampleResponse: `[Sample response would detail the impairment analysis]`,
  },

  // ==========================================
  // AUD - Auditing Written Communications
  // ==========================================
  {
    id: 'wc_aud_001',
    section: 'AUD',
    type: 'written_communication',
    topic: 'Audit Report Modifications',
    difficulty: 'moderate',
    estimatedTime: 25,
    blueprintArea: 'AUD-VI',
    scenario: `You are a senior auditor at Collins & Partners LLP. You have completed the audit of Retail Dynamics Inc. for the year ended December 31, 2025. During the audit, you identified the following issues:

Issue 1: The company changed its inventory valuation method from FIFO to weighted average. The change was properly accounted for and disclosed, and you agree it is preferable.

Issue 2: The company's warehouse, which contains approximately 40% of total inventory, was destroyed by fire on January 15, 2026. The company has adequate insurance coverage and disclosed this subsequent event.

Issue 3: Due to the fire, you were unable to observe the physical inventory count. Alternative procedures were performed but you were unable to obtain sufficient evidence regarding $2.5 million of inventory (material but not pervasive).

The engagement partner has asked for your analysis of the appropriate audit report.`,
    task: `Write a memo to the engagement partner that:
1. Analyzes each issue and its impact on the audit report
2. Recommends the appropriate type of audit opinion
3. Describes any additional paragraphs or report modifications needed
4. Explains the placement and content of report modifications

Demonstrate your understanding of audit reporting under AU-C 700-706.`,
    keyPoints: [
      'Qualified vs. adverse vs. disclaimer of opinion',
      'Material vs. pervasive distinction',
      'Emphasis of matter paragraph (change in accounting)',
      'Subsequent event disclosure evaluation',
      'Scope limitation - insufficient evidence',
      'Report paragraph ordering',
    ],
    sampleResponse: `[Sample response would analyze report modifications]`,
  },
  {
    id: 'wc_aud_002',
    section: 'AUD',
    type: 'written_communication',
    topic: 'Internal Control Deficiencies',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'AUD-V',
    scenario: `You are a senior auditor completing an integrated audit of DataTech Solutions, a publicly traded company. During testing, you identified the following control deficiencies:

1. The CFO has the ability to make journal entries and also approves the final financial statements with no independent review.

2. Access rights to the accounting system are not reviewed annually. Three terminated employees still had active system access.

3. Bank reconciliations are prepared monthly but not reviewed by anyone independent of the cash receipts/disbursements process.

4. New vendors can be added to the master file by any accounts payable clerk without approval.

5. Physical inventory counts differ from perpetual records by 8% but variances are adjusted without investigation.

Management believes these are minor issues that don't require remediation.`,
    task: `Write a communication to the audit committee that:
1. Distinguishes between significant deficiencies and material weaknesses
2. Evaluates each deficiency and classifies appropriately
3. Explains the potential impact of each deficiency
4. Describes management's responsibility and the auditor's communication requirements

Demonstrate understanding of internal control evaluation and communication requirements.`,
    keyPoints: [
      'Material weakness vs. significant deficiency definitions',
      'Compensating controls consideration',
      'Management override of controls (fraud risk)',
      'IT general controls importance',
      'Written communication requirements',
      'Audit committee vs. management communication',
    ],
    sampleResponse: `[Sample response would classify and communicate deficiencies]`,
  },
  {
    id: 'wc_aud_003',
    section: 'AUD',
    type: 'written_communication',
    topic: 'Going Concern Evaluation',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'AUD-VI',
    scenario: `You are the engagement partner for the audit of StartUp Innovations Inc. The company is a three-year-old technology firm. Your audit team has identified several conditions raising substantial doubt about going concern:

Financial indicators:
- Negative working capital of $2.3 million
- Operating losses for all three years ($1.5M, $2.1M, $3.2M)
- Cash burn rate suggests funds exhausted in 4 months
- Loan covenant violations on existing debt

Management's plans:
- Series B funding round expected to close in 60 days ($10M commitment letter in hand)
- Cost reduction plan targeting $500K annual savings
- New product launch expected to generate $2M revenue
- Sale of non-core assets for $800K (LOI signed)

You need to evaluate management's plans and determine appropriate reporting.`,
    task: `Write a memo to the file documenting:
1. The auditor's responsibility regarding going concern
2. Evaluation of the conditions and events identified
3. Assessment of management's plans to mitigate going concern
4. Conclusion on whether substantial doubt exists after considering plans
5. Implications for the audit report

Demonstrate understanding of AU-C 570 going concern requirements.`,
    keyPoints: [
      'One year evaluation period',
      'Conditions vs. mitigating factors',
      'Management plan feasibility assessment',
      'Audit evidence for management assertions',
      'Report impact if doubt remains/is alleviated',
      'Emphasis of matter paragraph requirements',
    ],
    sampleResponse: `[Sample response would document the going concern evaluation]`,
  },

  // ==========================================
  // REG - Regulation Written Communications
  // ==========================================
  {
    id: 'wc_reg_001',
    section: 'REG',
    type: 'written_communication',
    topic: 'S Corporation Election and Eligibility',
    difficulty: 'moderate',
    estimatedTime: 25,
    blueprintArea: 'REG-IV',
    scenario: `You are a tax advisor at a CPA firm. Your client, Green Valley Landscaping LLC, is considering converting to an S corporation. The LLC currently has the following ownership structure:

- Tom Green (U.S. citizen): 45% ownership
- Valley Investments LLC (wholly owned by Tom): 25% ownership  
- Sarah Green (Tom's wife, U.S. citizen): 20% ownership
- Green Family Trust (grantor trust, Tom as grantor): 10% ownership

The business has been profitable with annual taxable income around $500,000. Tom and Sarah are concerned about self-employment taxes and want to understand the S corp option.`,
    task: `Write a memo to Tom and Sarah Green that:
1. Explains the eligibility requirements for S corporation status
2. Analyzes whether their current structure qualifies
3. Identifies any changes needed to make the election
4. Discusses the tax advantages and disadvantages of S corp status
5. Explains the election process and timing

Demonstrate understanding of S corporation requirements under IRC Subchapter S.`,
    keyPoints: [
      '100 shareholder limit',
      'Eligible shareholder types (no partnerships, corps)',
      'One class of stock requirement',
      'Election timing (Form 2553)',
      'Self-employment tax savings',
      'Reasonable compensation requirement',
    ],
    sampleResponse: `[Sample response would analyze S corp eligibility]`,
  },
  {
    id: 'wc_reg_002',
    section: 'REG',
    type: 'written_communication',
    topic: 'Like-Kind Exchange Requirements',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'REG-III',
    scenario: `Your client, Commercial Properties LLC, owns a shopping center in Texas with an adjusted basis of $2,000,000 and fair market value of $5,500,000. They want to dispose of this property and acquire a larger commercial property in Florida valued at $7,000,000.

The proposed transaction structure:
1. Sell Texas property to unrelated buyer for $5,500,000
2. Place proceeds with qualified intermediary
3. Identify Florida property within 45 days
4. Close on Florida property within 180 days
5. Pay $1,500,000 additional cash for Florida property

The client also wants to extract $300,000 cash from the transaction for other investments.`,
    task: `Write a memo to Commercial Properties LLC that:
1. Explains the requirements for a valid Section 1031 like-kind exchange
2. Analyzes whether the proposed transaction qualifies
3. Calculates the tax consequences including any boot received
4. Determines the basis in the replacement property
5. Discusses planning opportunities to minimize taxable gain

Demonstrate understanding of like-kind exchange rules under IRC Section 1031.`,
    keyPoints: [
      'Real property only post-TCJA',
      'Like-kind definition for real estate',
      '45-day identification / 180-day exchange periods',
      'Qualified intermediary requirements',
      'Boot recognition rules',
      'Basis calculation in replacement property',
    ],
    sampleResponse: `[Sample response would analyze the 1031 exchange]`,
  },
  {
    id: 'wc_reg_003',
    section: 'REG',
    type: 'written_communication',
    topic: 'Ethical Standards - Circular 230',
    difficulty: 'moderate',
    estimatedTime: 25,
    blueprintArea: 'REG-I',
    scenario: `You are a CPA at a regional accounting firm. A prospective client, FastTax Services, has approached you with the following situation:

FastTax prepared tax returns for several clients using aggressive positions:
1. Claimed home office deductions for clients without dedicated office space
2. Deducted personal vehicle expenses as 100% business without mileage logs
3. Included charitable contribution deductions without proper substantiation
4. Failed to disclose foreign bank accounts on applicable returns

FastTax's owner says these positions "push the envelope but are defensible" and has asked your firm to take over their practice. They want you to sign amended returns to remove the questionable positions.`,
    task: `Write a memo to your firm's managing partner that:
1. Identifies the ethical issues under Circular 230
2. Analyzes the standards for tax return positions
3. Discusses your obligations regarding the amended returns
4. Recommends a course of action regarding the prospective client
5. Addresses any reporting or disclosure requirements

Demonstrate understanding of practitioner responsibilities under Circular 230.`,
    keyPoints: [
      'Reasonable basis vs. realistic possibility standards',
      'Substantial authority standard',
      'Due diligence requirements',
      'Knowledge of client omissions',
      'Signing returns with known errors',
      'FBAR disclosure requirements',
    ],
    sampleResponse: `[Sample response would analyze Circular 230 requirements]`,
  },

  // ==========================================
  // BAR - Business Analysis Written Comms
  // ==========================================
  {
    id: 'wc_bar_001',
    section: 'BAR',
    type: 'written_communication',
    topic: 'Business Combination Analysis',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'BAR-I',
    scenario: `You are a financial analyst at a private equity firm evaluating the proposed acquisition of Target Manufacturing Inc. by Portfolio Company A. The following information is available:

Target Manufacturing Inc.:
- Book value of net assets: $50 million
- Fair value of identifiable net assets: $65 million
- Proposed purchase price: $90 million

Identifiable intangibles not on Target's books:
- Customer relationships: $8 million (10-year life)
- Developed technology: $5 million (5-year life)
- Trade name: $2 million (indefinite life)

In-process R&D: $3 million
Contingent consideration: Up to $10 million based on revenue targets

The deal includes direct acquisition costs of $2 million.`,
    task: `Write a memo to the investment committee that:
1. Calculates goodwill arising from the acquisition
2. Explains the accounting treatment for each component
3. Analyzes the ongoing impact on financial statements
4. Discusses impairment testing requirements
5. Addresses the contingent consideration accounting

Demonstrate understanding of ASC 805 business combinations.`,
    keyPoints: [
      'Acquisition method accounting',
      'Fair value measurement of consideration',
      'Identifiable intangible recognition criteria',
      'In-process R&D treatment',
      'Contingent consideration liability',
      'Acquisition costs expensed',
    ],
    sampleResponse: `[Sample response would analyze the business combination]`,
  },
  {
    id: 'wc_bar_002',
    section: 'BAR',
    type: 'written_communication',
    topic: 'Financial Statement Analysis',
    difficulty: 'moderate',
    estimatedTime: 25,
    blueprintArea: 'BAR-I',
    scenario: `You are a credit analyst evaluating a loan application from Midwest Distribution Co. The company is requesting a $5 million line of credit. You have been provided with three years of financial data:

Key ratios (2023 / 2024 / 2025):
- Current ratio: 2.1 / 1.8 / 1.4
- Quick ratio: 1.3 / 1.0 / 0.7
- Debt-to-equity: 0.8 / 1.2 / 1.8
- Interest coverage: 5.0x / 3.5x / 2.1x
- Inventory turnover: 8.0 / 6.5 / 5.2
- Days sales outstanding: 35 / 42 / 55
- Return on assets: 8% / 6% / 3%
- Profit margin: 5% / 4% / 2%

Industry averages: Current 1.8, Quick 1.0, D/E 1.0, Interest coverage 4.0x`,
    task: `Write a credit analysis memo that:
1. Analyzes the trends in liquidity, solvency, and profitability
2. Compares performance to industry benchmarks
3. Identifies areas of concern and potential causes
4. Assesses the overall creditworthiness
5. Provides a recommendation with conditions, if appropriate

Demonstrate understanding of financial statement analysis techniques.`,
    keyPoints: [
      'Trend analysis interpretation',
      'Cross-sectional (industry) comparison',
      'Working capital management issues',
      'Leverage and coverage analysis',
      'Profitability deterioration',
      'Risk assessment and mitigating factors',
    ],
    sampleResponse: `[Sample response would provide credit analysis]`,
  },
  {
    id: 'wc_bar_003',
    section: 'BAR',
    type: 'written_communication',
    topic: 'Governmental Accounting - Fund Balance',
    difficulty: 'moderate',
    estimatedTime: 25,
    blueprintArea: 'BAR-II',
    scenario: `You are the finance director for the City of Riverside. The city council has questions about the fund balance classifications shown in the General Fund financial statements:

General Fund - Fund Balance as of December 31, 2025:
- Nonspendable (prepaid items): $150,000
- Restricted (state grants): $800,000
- Committed (capital projects - council resolution): $2,000,000
- Assigned (next year's budget): $500,000
- Unassigned: $1,200,000
- Total Fund Balance: $4,650,000

Council Member Johnson has asked why the city can't use the "committed" funds for the new fire station instead of waiting for the committed capital projects.`,
    task: `Write a memo to the city council that:
1. Explains each fund balance classification under GASB 54
2. Describes the hierarchy and constraints on each category
3. Addresses how committed funds can be used or uncommitted
4. Discusses the role of the highest authority in commitment
5. Recommends a fund balance policy framework

Demonstrate understanding of governmental fund balance reporting.`,
    keyPoints: [
      'GASB 54 classification framework',
      'Hierarchy of constraints',
      'Nonspendable vs. spendable categories',
      'Committed requires formal action to remove',
      'Highest decision-making authority',
      'Fund balance policies and targets',
    ],
    sampleResponse: `[Sample response would explain GASB 54 requirements]`,
  },

  // ==========================================
  // ISC - Information Systems Written Comms
  // ==========================================
  {
    id: 'wc_isc_001',
    section: 'ISC',
    type: 'written_communication',
    topic: 'SOC 2 Report Evaluation',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'ISC-IV',
    scenario: `You are an IT auditor at a financial services company. Management is evaluating a cloud-based accounting software vendor, CloudBooks Inc. The vendor has provided their SOC 2 Type II report. Key findings from the report:

Trust Services Criteria Coverage: Security and Availability (not Confidentiality)

Exceptions noted:
1. Two instances where terminated employees retained system access for 15+ days
2. Backup restoration testing failed once during the period (took 48 hours to restore)
3. Vulnerability scans were performed quarterly instead of monthly as required by policy

Complementary User Entity Controls (CUECs):
- Users must implement strong password policies
- Users responsible for periodic access reviews
- Users must encrypt data before transmission

The report period ended 8 months ago.`,
    task: `Write a memo to management that:
1. Explains what a SOC 2 Type II report covers and its limitations
2. Analyzes the significance of each exception noted
3. Evaluates the CUECs and their implications
4. Assesses the staleness of the report
5. Provides recommendations for additional due diligence

Demonstrate understanding of SOC reports and third-party risk management.`,
    keyPoints: [
      'SOC 2 vs SOC 1 distinction',
      'Type I vs Type II reports',
      'Trust services criteria coverage',
      'Exception significance evaluation',
      'CUEC implementation responsibility',
      'Report currency considerations',
    ],
    sampleResponse: `[Sample response would evaluate the SOC 2 report]`,
  },
  {
    id: 'wc_isc_002',
    section: 'ISC',
    type: 'written_communication',
    topic: 'Data Privacy and Security',
    difficulty: 'moderate',
    estimatedTime: 25,
    blueprintArea: 'ISC-II',
    scenario: `You are the IT compliance officer at HealthFirst Medical Group. The organization is implementing a new patient portal that will allow patients to:

- View medical records and test results
- Schedule appointments online
- Communicate with physicians via messaging
- Pay bills and view statements
- Access prescription information

The portal will be hosted by a third-party vendor and accessible via web and mobile app. The CEO wants to ensure the implementation meets security and privacy requirements.`,
    task: `Write a memo to the CEO that:
1. Identifies the key regulatory requirements (HIPAA, state laws)
2. Recommends technical security controls for the portal
3. Discusses vendor management and BAA requirements
4. Addresses patient authentication and access controls
5. Outlines breach notification procedures

Demonstrate understanding of healthcare data privacy and security requirements.`,
    keyPoints: [
      'HIPAA Security Rule requirements',
      'PHI protection measures',
      'Business Associate Agreement (BAA)',
      'Multi-factor authentication',
      'Encryption requirements',
      'Breach notification rules',
    ],
    sampleResponse: `[Sample response would address HIPAA compliance]`,
  },
  {
    id: 'wc_isc_003',
    section: 'ISC',
    type: 'written_communication',
    topic: 'IT General Controls Assessment',
    difficulty: 'moderate',
    estimatedTime: 25,
    blueprintArea: 'ISC-I',
    scenario: `You are conducting an IT general controls review for MidCity Bank. Your assessment identified the following conditions:

Change Management:
- Change requests exist for most changes, but 20% lacked documented approval
- Developers have the ability to migrate code to production
- No formal regression testing process exists

Logical Access:
- Password policy requires 8 characters with complexity
- No account lockout after failed login attempts
- Privileged access reviews conducted annually

Operations:
- Daily backups performed, stored at same facility
- No documented disaster recovery plan
- Job scheduling is manual with limited monitoring

The bank's regulators require an annual IT controls assessment.`,
    task: `Write a memo that:
1. Identifies the control deficiencies in each area
2. Assesses the risk level of each deficiency
3. Recommends remediation actions with priorities
4. Discusses the potential regulatory impact
5. Suggests a timeline for remediation

Demonstrate understanding of IT general controls and risk assessment.`,
    keyPoints: [
      'ITGC categories: change, access, operations',
      'Segregation of duties (dev vs. production)',
      'Access control best practices',
      'Backup and DR requirements',
      'Risk-based prioritization',
      'Regulatory compliance expectations',
    ],
    sampleResponse: `[Sample response would assess ITGCs and recommend remediation]`,
  },

  // ==========================================
  // TCP - Tax Compliance Written Comms
  // ==========================================
  {
    id: 'wc_tcp_001',
    section: 'TCP',
    type: 'written_communication',
    topic: 'Qualified Business Income Deduction',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'TCP-II',
    scenario: `Your client, Professional Services Group LLC (PSG), is a law firm partnership with three partners. The firm is evaluating its Section 199A qualified business income (QBI) deduction for 2025. Relevant information:

Partnership Information:
- Net ordinary income: $1,800,000
- W-2 wages paid: $600,000
- Qualified property (UBIA): $200,000

Partner Information (each 1/3 partner):
- Allocated QBI: $600,000 each
- Taxable income (before QBI): Partner A: $750,000, Partner B: $450,000, Partner C: $350,000

Note: Law firm is a specified service trade or business (SSTB).

2025 Thresholds: MFJ phaseout begins at $383,900, fully phased out at $483,900`,
    task: `Write a memo to the partners that:
1. Explains the QBI deduction rules for SSTBs
2. Calculates each partner's QBI deduction
3. Discusses the impact of the W-2 wage and UBIA limitations
4. Analyzes planning opportunities to maximize the deduction
5. Addresses any changes between 2025 and 2026 Blueprint provisions

Demonstrate understanding of IRC Section 199A and related planning.`,
    keyPoints: [
      'SSTB definition and limitations',
      'Taxable income thresholds and phaseouts',
      '20% of QBI base calculation',
      'W-2 wage limitation (50% or 25%/2.5%)',
      'UBIA limitation',
      '2025 vs 2026 QBI rate changes',
    ],
    sampleResponse: `[Sample response would calculate QBI deductions]`,
  },
  {
    id: 'wc_tcp_002',
    section: 'TCP',
    type: 'written_communication',
    topic: 'Gift and Estate Tax Planning',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'TCP-IV',
    scenario: `Your client, Margaret Williams (age 72), is a widow with an estate valued at approximately $18 million. She wants to begin transferring wealth to her three children and seven grandchildren while minimizing transfer taxes.

Estate Composition:
- Primary residence: $2,500,000
- Investment portfolio: $8,000,000
- Family business (closely held): $5,000,000
- Life insurance: $2,500,000

Margaret has not made any prior taxable gifts. Her estate plan currently leaves everything to her children equally.

2025 Information:
- Unified credit exemption: ~$13.6 million
- Annual exclusion: $18,000 per donee
- GSTT exemption: ~$13.6 million`,
    task: `Write a memo to Margaret that:
1. Explains the current gift and estate tax framework
2. Analyzes strategies to utilize the annual exclusion
3. Discusses lifetime gifting to use the unified credit
4. Addresses generation-skipping transfer tax planning
5. Recommends strategies for the closely held business

Demonstrate understanding of transfer tax planning strategies.`,
    keyPoints: [
      'Annual exclusion gifts ($18K × 10 = $180K/year)',
      'Unified credit utilization',
      'GSTT planning for grandchildren',
      'Valuation discounts for business interests',
      'Life insurance and ILIT planning',
      'Sunset provisions (if applicable)',
    ],
    sampleResponse: `[Sample response would provide estate planning strategies]`,
  },
  {
    id: 'wc_tcp_003',
    section: 'TCP',
    type: 'written_communication',
    topic: 'Multi-State Taxation',
    difficulty: 'moderate',
    estimatedTime: 25,
    blueprintArea: 'TCP-III',
    scenario: `Your client, E-Commerce Solutions Inc., is a C corporation headquartered in Texas (no state income tax). The company sells software licenses to customers in all 50 states. Recent business expansion has raised state tax nexus concerns:

Current Operations:
- Headquarters and all employees in Texas
- Remote salespeople in California (2), New York (1), Florida (1)
- Cloud servers located in Virginia data center
- Annual revenue: $15 million (distributed across all states based on customer location)

The company has never filed state income tax returns outside Texas. The CFO received nexus questionnaires from California and New York and is concerned about potential exposure.`,
    task: `Write a memo to the CFO that:
1. Explains the concept of state income tax nexus
2. Analyzes the company's potential nexus in various states
3. Discusses physical presence vs. economic nexus standards
4. Addresses voluntary disclosure program options
5. Recommends a compliance strategy going forward

Demonstrate understanding of multi-state taxation principles.`,
    keyPoints: [
      'Physical presence nexus (employees)',
      'Economic nexus (Wayfair implications)',
      'P.L. 86-272 protection (solicitation only)',
      'Apportionment methods',
      'Voluntary disclosure programs',
      'Nexus questionnaire response strategy',
    ],
    sampleResponse: `[Sample response would analyze multi-state tax nexus]`,
  },
];

// Export count for validation
export const WC_EXPANDED_COUNT = WC_EXPANDED.length;
