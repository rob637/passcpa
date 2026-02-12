import { Question } from '../../../types';

export const WORLD_CLASS_BATCH_43: Question[] = [
  // FAR - Governmental Accounting: Fiduciary Funds (Dark Nook)
  {
    id: 'far-wc-207',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'State and Local Governments',
    topicId: 'fiduciary-funds',
    topic: 'Fiduciary Funds',
    subtopic: 'Custodial Funds',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A county government collects sales taxes on behalf of various municipalities within its boundaries. During the fiscal year, the county collected $5,000,000 and distributed $4,700,000 to the municipalities. The county retains a 2% administrative fee on all collections. At year-end, how should the county report the undistributed amount in its custodial fund?',
    options: [
      'Liability of $300,000 only',
      'Liability of $200,000 and revenue of $100,000',
      'Liability of $300,000 and deferred inflow of $100,000',
      'No liability; the entire $300,000 is revenue'
    ],
    correctAnswer: 1,
    explanation: 'The undistributed amount is $300,000 ($5,000,000 - $4,700,000). Of this, the county\'s 2% administrative fee equals $100,000 ($5,000,000 × 2%), which is recognized as revenue in the custodial fund. The remaining $200,000 represents amounts owed to municipalities and is reported as a liability. Custodial funds recognize revenue and expenses/liabilities as additions and deductions occur.',
    reference: 'GASB Statement No. 84, Fiduciary Activities'
  },
  {
    id: 'far-wc-208',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'State and Local Governments',
    topicId: 'fiduciary-funds',
    topic: 'Fiduciary Funds',
    subtopic: 'Investment Trust Funds',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A state government operates an external investment pool for participating local governments. During the year, the pool earned $8,000,000 in investment income and incurred $200,000 in administrative costs. Participating governments\' equity increased from $150,000,000 to $162,000,000. What amount should be reported as additions in the investment trust fund?',
    options: [
      '$7,800,000',
      '$8,000,000',
      '$12,000,000',
      '$20,000,000'
    ],
    correctAnswer: 3,
    explanation: 'Additions to an investment trust fund include both investment earnings ($8,000,000) and net contributions from participating governments. The net contributions equal the change in equity ($162,000,000 - $150,000,000 = $12,000,000) plus any deductions, adjusted for earnings. Total additions = Investment income $8,000,000 + Participant contributions $12,000,000 = $20,000,000. Administrative costs are reported as deductions.',
    reference: 'GASB Statement No. 84, Fiduciary Activities'
  },
  {
    id: 'far-wc-209',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'State and Local Governments',
    topicId: 'fiduciary-funds',
    topic: 'Fiduciary Funds',
    subtopic: 'Pension Trust Funds',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A city\'s pension trust fund reports the following: beginning net position $500,000,000; employer contributions $40,000,000; employee contributions $25,000,000; benefit payments $55,000,000; investment gain $35,000,000; administrative expenses $2,000,000. What is the ending net position?',
    options: [
      '$543,000,000',
      '$545,000,000',
      '$553,000,000',
      '$598,000,000'
    ],
    correctAnswer: 0,
    explanation: 'Ending net position = Beginning $500,000,000 + Additions (employer contributions $40,000,000 + employee contributions $25,000,000 + investment gain $35,000,000 = $100,000,000) - Deductions (benefit payments $55,000,000 + administrative expenses $2,000,000 = $57,000,000) = $500,000,000 + $100,000,000 - $57,000,000 = $543,000,000.',
    reference: 'GASB Statement No. 67, Financial Reporting for Pension Plans'
  },
  {
    id: 'far-wc-210',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'State and Local Governments',
    topicId: 'fiduciary-funds',
    topic: 'Fiduciary Funds',
    subtopic: 'Private-Purpose Trust Funds',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A city receives a donation of $2,000,000 to establish a scholarship fund for local students attending college. The donor specifies that only investment income may be used for scholarships, while the principal must remain intact. In which fund should the city report this activity?',
    options: [
      'Special revenue fund',
      'Permanent fund',
      'Private-purpose trust fund',
      'Custodial fund'
    ],
    correctAnswer: 2,
    explanation: 'Private-purpose trust funds are used when trust arrangements benefit individuals, private organizations, or other governments rather than the government itself or its citizenry. Since this scholarship fund benefits specific individuals (students) rather than the public as a whole, it should be reported in a private-purpose trust fund. A permanent fund would be used if the purpose benefited the government\'s citizens generally.',
    reference: 'GASB Statement No. 84, Fiduciary Activities'
  },
  // AUD - Consideration of Laws and Regulations (Dark Nook)
  {
    id: 'aud-wc-207',
    section: 'AUD',
    courseId: 'cpa',
    blueprintArea: 'Forming Conclusions and Reporting',
    topicId: 'laws-regulations',
    topic: 'Consideration of Laws and Regulations',
    subtopic: 'Direct and Material Effect Laws',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'During a financial statement audit, the auditor discovers that the client has been systematically underreporting payroll taxes. The underreported amount is material to the financial statements. Which of the following best describes the auditor\'s responsibility?',
    options: [
      'Report the noncompliance to the appropriate governmental agency',
      'Withdraw from the engagement immediately',
      'Evaluate the effect on the financial statements and consider implications for the audit report',
      'Perform forensic procedures to quantify the exact amount of tax evasion'
    ],
    correctAnswer: 2,
    explanation: 'When noncompliance with laws having a direct and material effect on financial statements is discovered, the auditor\'s primary responsibility is to evaluate its effect on the financial statements and consider the implications for the audit report. The auditor is not required to report to governmental agencies unless required by law or regulation, nor to perform forensic procedures. Withdrawal is not automatically required but may be considered depending on circumstances.',
    reference: 'AU-C Section 250, Consideration of Laws and Regulations in an Audit of Financial Statements'
  },
  {
    id: 'aud-wc-208',
    section: 'AUD',
    courseId: 'cpa',
    blueprintArea: 'Forming Conclusions and Reporting',
    topicId: 'laws-regulations',
    topic: 'Consideration of Laws and Regulations',
    subtopic: 'Illegal Acts',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'An auditor suspects that management has engaged in bribery of foreign officials to secure contracts. This activity is material to the financial statements but management denies the allegation and refuses to permit further investigation. What is the auditor\'s most appropriate course of action?',
    options: [
      'Issue an unmodified opinion with an emphasis-of-matter paragraph',
      'Issue a qualified opinion due to scope limitation and communicate with those charged with governance',
      'Issue an adverse opinion due to GAAP departure',
      'Report the suspected bribery directly to the SEC'
    ],
    correctAnswer: 1,
    explanation: 'When management imposes a scope limitation that prevents the auditor from obtaining sufficient appropriate evidence about suspected illegal acts, the auditor should issue a qualified or disclaimer of opinion due to the scope limitation. The auditor must also communicate with those charged with governance. Reporting directly to the SEC is not required unless specific circumstances exist (such as SEC review proceedings).',
    reference: 'AU-C Section 250, Consideration of Laws and Regulations in an Audit of Financial Statements'
  },
  {
    id: 'aud-wc-209',
    section: 'AUD',
    courseId: 'cpa',
    blueprintArea: 'Performing Further Procedures',
    topicId: 'subsequent-events',
    topic: 'Subsequent Events',
    subtopic: 'Type II Subsequent Events',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'On March 15 (after year-end but before the audit report date), a major customer that owed the client $5,000,000 at December 31 filed for bankruptcy. Investigation reveals the customer was financially sound at year-end but deteriorated rapidly due to fraud discovered in February. How should this be treated?',
    options: [
      'Adjust the financial statements to write off the receivable',
      'Disclose the event in the notes without adjustment',
      'No action required since the condition did not exist at year-end',
      'Issue an adverse opinion due to going concern'
    ],
    correctAnswer: 1,
    explanation: 'This is a Type II subsequent event (nonrecognized). The condition causing the loss (fraud discovery and rapid deterioration) occurred after the balance sheet date, and the customer was financially sound at year-end. Type II events do not result in adjustment to the financial statements but should be disclosed in the notes if they are significant enough that nondisclosure would make the financial statements misleading.',
    reference: 'AU-C Section 560, Subsequent Events and Subsequently Discovered Facts'
  },
  {
    id: 'aud-wc-210',
    section: 'AUD',
    courseId: 'cpa',
    blueprintArea: 'Performing Further Procedures',
    topicId: 'subsequent-events',
    topic: 'Subsequent Events',
    subtopic: 'Dual Dating',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'After issuing the audit report dated March 10, the auditor becomes aware on March 25 of a significant event that occurred on March 20. The client agrees to revise the financial statements to disclose this event. If the auditor dual-dates the revised report, what dates should appear?',
    options: [
      'March 10, except for Note X which is dated March 25',
      'March 10, except for Note X which is dated March 20',
      'March 25 for the entire report',
      'March 20 for the entire report'
    ],
    correctAnswer: 1,
    explanation: 'When dual-dating is used, the original report date is retained for the financial statements as a whole, except for the note describing the subsequent event, which is dated as of the date of the event (not the date the auditor became aware of it). Therefore, the report should be dated "March 10, except for Note X which is dated March 20."',
    reference: 'AU-C Section 560, Subsequent Events and Subsequently Discovered Facts'
  },
  // REG - Estate and Gift Tax (Dark Nook)
  {
    id: 'reg-wc-207',
    section: 'REG',
    courseId: 'cpa',
    blueprintArea: 'Federal Taxation of Property Transactions',
    topicId: 'estate-gift-tax',
    topic: 'Estate and Gift Tax',
    subtopic: 'Generation-Skipping Transfer Tax',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A grandmother establishes an irrevocable trust with $5,000,000 for the benefit of her grandchildren (skipping generation). The trust provides income to the grandchildren for life, then principal to great-grandchildren. For generation-skipping transfer tax purposes, when does a taxable distribution occur?',
    options: [
      'When the trust is established',
      'When income is distributed to grandchildren',
      'When principal is distributed to great-grandchildren',
      'Both when income is distributed to grandchildren and when principal is distributed to great-grandchildren'
    ],
    correctAnswer: 3,
    explanation: 'The generation-skipping transfer (GST) tax applies to transfers to "skip persons" (individuals two or more generations below the transferor). Grandchildren are skip persons relative to grandmother. A taxable distribution occurs when trust property is distributed to a skip person (grandchildren receiving income). A taxable termination occurs when trust interests terminate and property passes to skip persons (great-grandchildren receiving principal). Both events trigger GST tax consequences.',
    reference: 'IRC Sections 2601-2664, Generation-Skipping Transfer Tax'
  },
  {
    id: 'reg-wc-208',
    section: 'REG',
    courseId: 'cpa',
    blueprintArea: 'Federal Taxation of Property Transactions',
    topicId: 'estate-gift-tax',
    topic: 'Estate and Gift Tax',
    subtopic: 'Qualified Personal Residence Trust',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A taxpayer aged 60 transfers her primary residence valued at $2,000,000 to a Qualified Personal Residence Trust (QPRT), retaining the right to live in the residence for 15 years. Using IRS valuation tables, the remainder interest is valued at $800,000. If the taxpayer survives the 15-year term, what is the estate tax consequence?',
    options: [
      'The full $2,000,000 is included in the gross estate',
      'Only $800,000 (the gift value) is included in the gross estate',
      'The residence is excluded from the gross estate',
      'The residence\'s fair market value at death is included in the gross estate'
    ],
    correctAnswer: 2,
    explanation: 'If the grantor survives the QPRT term, the residence is not included in the gross estate because the grantor\'s retained interest has terminated. The gift was completed when the QPRT was established (valued at $800,000 for gift tax purposes), and upon surviving the term, the residence passes to the remaindermen free of additional estate tax. This is the primary estate planning benefit of QPRTs.',
    reference: 'IRC Section 2702, Special Valuation Rules'
  },
  {
    id: 'reg-wc-209',
    section: 'REG',
    courseId: 'cpa',
    blueprintArea: 'Federal Taxation of Property Transactions',
    topicId: 'estate-gift-tax',
    topic: 'Estate and Gift Tax',
    subtopic: 'Portability of Unified Credit',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A husband dies in 2025 with a gross estate of $8,000,000. After deductions and use of the marital deduction, his taxable estate is $0. His Deceased Spousal Unused Exclusion (DSUE) amount is $5,000,000. To allow the surviving wife to use this DSUE, what action must be taken?',
    options: [
      'No action required; DSUE transfers automatically',
      'The surviving spouse must file a gift tax return claiming the DSUE',
      'A timely filed estate tax return for the deceased husband must be filed',
      'The surviving spouse must make a written election within 9 months of death'
    ],
    correctAnswer: 2,
    explanation: 'To utilize the portability of the deceased spouse\'s unused exclusion amount (DSUE), the executor of the deceased spouse\'s estate must make an election on a timely filed estate tax return (Form 706), even if the estate would not otherwise be required to file. Without this election, the DSUE is lost and not available to the surviving spouse.',
    reference: 'IRC Section 2010(c)(5), Deceased Spousal Unused Exclusion Amount'
  },
  {
    id: 'reg-wc-210',
    section: 'REG',
    courseId: 'cpa',
    blueprintArea: 'Federal Taxation of Property Transactions',
    topicId: 'estate-gift-tax',
    topic: 'Estate and Gift Tax',
    subtopic: 'Annual Exclusion Planning',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A married couple wants to make gifts to their three adult children and their spouses (6 donees) using the annual exclusion and gift-splitting. Assuming the 2025 annual exclusion is $18,000, what is the maximum total that can be given without reducing the unified credit?',
    options: [
      '$108,000',
      '$216,000',
      '$324,000',
      '$432,000'
    ],
    correctAnswer: 1,
    explanation: 'With gift-splitting, a married couple can give up to $36,000 per donee ($18,000 × 2) without using any unified credit. With 6 donees (3 children + 3 spouses), the maximum annual exclusion gifts = $36,000 × 6 = $216,000. Each spouse is treated as making half of each gift for gift tax purposes.',
    reference: 'IRC Section 2503(b), Annual Exclusion; Section 2513, Gift-Splitting'
  },
  // BAR - Business Combinations (More Complex Scenarios)
  {
    id: 'bar-wc-247',
    section: 'BAR',
    courseId: 'cpa',
    blueprintArea: 'Financial Statement Analysis',
    topicId: 'business-combinations',
    topic: 'Business Combinations',
    subtopic: 'Bargain Purchases',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Company A acquires 100% of Company B for $50,000,000 cash. The fair values of identifiable assets acquired and liabilities assumed are $75,000,000 and $15,000,000, respectively. After reassessing all fair values and confirming no errors, what is the proper accounting treatment?',
    options: [
      'Record goodwill of $10,000,000',
      'Record a gain of $10,000,000 in the income statement',
      'Reduce the values of noncurrent assets proportionally by $10,000,000',
      'Record a deferred credit of $10,000,000 and amortize over 10 years'
    ],
    correctAnswer: 1,
    explanation: 'This is a bargain purchase. Fair value of net assets acquired = $75,000,000 - $15,000,000 = $60,000,000, which exceeds the purchase price of $50,000,000 by $10,000,000. Under ASC 805, after reassessing all identifiable assets and liabilities, any remaining excess (the bargain purchase gain) is recognized immediately in earnings. The historical method of reducing noncurrent assets is no longer followed.',
    reference: 'ASC 805-30-25-2, Business Combinations - Bargain Purchases'
  },
  {
    id: 'bar-wc-248',
    section: 'BAR',
    courseId: 'cpa',
    blueprintArea: 'Financial Statement Analysis',
    topicId: 'business-combinations',
    topic: 'Business Combinations',
    subtopic: 'Contingent Consideration',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'In a business combination, the acquirer agrees to pay additional consideration of $5,000,000 if the acquired company achieves certain EBITDA targets over the next three years. At acquisition date, the fair value of this contingent consideration is estimated at $3,500,000. One year later, based on revised projections, the fair value is re-estimated at $4,200,000. How is the $700,000 change accounted for?',
    options: [
      'Adjustment to goodwill',
      'Prior period adjustment to retained earnings',
      'Expense in the current period income statement',
      'Other comprehensive income'
    ],
    correctAnswer: 2,
    explanation: 'Contingent consideration classified as a liability is remeasured to fair value at each reporting date after the measurement period, with changes in fair value recognized in earnings. Since the fair value increased by $700,000, this is recognized as an expense (or reduction of income) in the current period. Adjustments to goodwill are only permitted during the measurement period (typically one year from acquisition).',
    reference: 'ASC 805-30-35-1, Business Combinations - Contingent Consideration'
  },
  {
    id: 'bar-wc-249',
    section: 'BAR',
    courseId: 'cpa',
    blueprintArea: 'Financial Statement Analysis',
    topicId: 'business-combinations',
    topic: 'Business Combinations',
    subtopic: 'Step Acquisitions',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Company P owns a 30% equity investment in Company S with a carrying value of $15,000,000 and fair value of $21,000,000. Company P acquires an additional 40% of Company S for $28,000,000 cash, obtaining control. What amount is recognized in earnings from this transaction?',
    options: [
      '$0',
      '$6,000,000 gain',
      '$7,000,000 gain',
      '$13,000,000 gain'
    ],
    correctAnswer: 1,
    explanation: 'In a step acquisition achieving control, the previously held equity interest must be remeasured to its acquisition-date fair value, with any gain or loss recognized in earnings. The gain on the previously held 30% interest = $21,000,000 fair value - $15,000,000 carrying value = $6,000,000. This gain is recognized in earnings. The $28,000,000 paid for the additional 40% is simply part of the consideration transferred.',
    reference: 'ASC 805-10-25-10, Business Combinations - Step Acquisitions'
  },
  {
    id: 'bar-wc-250',
    section: 'BAR',
    courseId: 'cpa',
    blueprintArea: 'Financial Statement Analysis',
    topicId: 'business-combinations',
    topic: 'Business Combinations',
    subtopic: 'Measurement Period Adjustments',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An acquisition closed on October 1, Year 1. In preparing Year 1 financial statements (issued March 15, Year 2), management provisionally recorded inventory at $10,000,000. In July Year 2, new information indicates the acquisition-date fair value should have been $8,500,000. How should this be treated?',
    options: [
      'Prospective adjustment beginning July Year 2',
      'Retrospective adjustment to Year 1 as if the revised amount had been recorded initially',
      'Expense of $1,500,000 in Year 2',
      'No adjustment permitted after financial statements are issued'
    ],
    correctAnswer: 1,
    explanation: 'Measurement period adjustments are recognized as if the accounting had been completed at the acquisition date. During the measurement period (up to one year from acquisition), when the acquirer obtains new information about facts and circumstances that existed at the acquisition date, comparative prior period information is adjusted retrospectively. The Year 1 financial statements would be adjusted as if $8,500,000 had been recorded initially.',
    reference: 'ASC 805-10-25-13 to 25-19, Business Combinations - Measurement Period'
  },
  {
    id: 'bar-wc-251',
    section: 'BAR',
    courseId: 'cpa',
    blueprintArea: 'Financial Statement Analysis',
    topicId: 'business-combinations',
    topic: 'Business Combinations',
    subtopic: 'Noncontrolling Interests',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Parent acquires 80% of Subsidiary for $800,000 when Subsidiary\'s identifiable net assets have a fair value of $900,000. The fair value of the noncontrolling interest is independently determined to be $180,000. What amount of goodwill is recorded?',
    options: [
      '$0 - this is a bargain purchase',
      '$80,000',
      '$100,000',
      '$180,000'
    ],
    correctAnswer: 1,
    explanation: 'When the full goodwill method is used (NCI at fair value), goodwill is calculated as: Total consideration ($800,000 for 80%) + NCI fair value ($180,000) - Fair value of identifiable net assets ($900,000) = $80,000. This represents total goodwill attributable to both the parent and noncontrolling interest.',
    reference: 'ASC 805-20-30-1, Business Combinations - Goodwill Calculation'
  },
  // ISC - Cloud Computing and Virtualization
  {
    id: 'isc-wc-207',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'Information Systems and Data Management',
    topicId: 'cloud-computing',
    topic: 'Cloud Computing',
    subtopic: 'Cloud Security',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A company using IaaS (Infrastructure as a Service) experiences a data breach due to misconfigured security groups that allowed unauthorized external access. Under the shared responsibility model, who is primarily responsible for this security failure?',
    options: [
      'The cloud service provider exclusively',
      'The customer exclusively',
      'Shared equally between provider and customer',
      'Neither - this is an inherent cloud risk'
    ],
    correctAnswer: 1,
    explanation: 'Under the shared responsibility model for IaaS, the cloud provider is responsible for security OF the cloud (physical infrastructure, hypervisor, network infrastructure), while the customer is responsible for security IN the cloud (operating systems, applications, data, and configurations including security groups). Misconfigured security groups are a customer configuration error, making the customer primarily responsible.',
    reference: 'Cloud Security Alliance Guidance; AWS/Azure Shared Responsibility Models'
  },
  {
    id: 'isc-wc-208',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'Information Systems and Data Management',
    topicId: 'cloud-computing',
    topic: 'Cloud Computing',
    subtopic: 'Multi-Tenancy Risks',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A financial services company is evaluating cloud providers. Their security team is concerned about "noisy neighbor" and "side-channel" attacks in multi-tenant environments. Which cloud deployment model would best address these concerns while maintaining cost efficiency?',
    options: [
      'Public cloud with enhanced encryption',
      'Private cloud on-premises',
      'Dedicated hosts in a public cloud',
      'Community cloud with other financial institutions'
    ],
    correctAnswer: 2,
    explanation: 'Dedicated hosts in a public cloud provide physical isolation from other tenants while still leveraging cloud economics. This addresses side-channel attack risks (which exploit shared hardware like CPUs) and noisy neighbor issues (resource contention). Private cloud is more secure but more expensive, while public cloud with encryption doesn\'t address hardware-level isolation concerns.',
    reference: 'SOC 2 Type II Considerations for Cloud Environments'
  },
  {
    id: 'isc-wc-209',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'Information Systems and Data Management',
    topicId: 'virtualization',
    topic: 'Virtualization',
    subtopic: 'VM Escape Attacks',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Which control is MOST effective in preventing a virtual machine (VM) escape attack where malicious code on a guest VM attempts to gain access to the hypervisor or other VMs?',
    options: [
      'Network segmentation between VMs',
      'Regular patching of guest operating systems',
      'Regular patching and hardening of the hypervisor',
      'Implementing intrusion detection within each VM'
    ],
    correctAnswer: 2,
    explanation: 'VM escape attacks target vulnerabilities in the hypervisor layer to break out of the virtual machine boundary. The most effective control is regular patching and hardening of the hypervisor itself, as this addresses the attack vector directly. While other controls provide defense-in-depth, they cannot prevent attacks that exploit hypervisor vulnerabilities.',
    reference: 'NIST SP 800-125, Guide to Security for Full Virtualization Technologies'
  },
  {
    id: 'isc-wc-210',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'Information Systems and Data Management',
    topicId: 'cloud-computing',
    topic: 'Cloud Computing',
    subtopic: 'Data Residency and Sovereignty',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A multinational corporation stores customer data in a cloud environment. European customers\' data must comply with GDPR requirements for data residency. Which cloud architecture feature BEST supports this requirement?',
    options: [
      'Data encryption at rest with customer-managed keys',
      'Geographic regions and availability zones with data location controls',
      'Private network connectivity using VPN',
      'Multi-factor authentication for all administrative access'
    ],
    correctAnswer: 1,
    explanation: 'Geographic regions and availability zones with data location controls allow organizations to specify exactly where their data is stored physically. This is essential for GDPR compliance, which may restrict transfer of personal data outside the EU/EEA. While encryption is important, it doesn\'t address the physical location requirement that data residency regulations mandate.',
    reference: 'GDPR Article 44-49, International Data Transfers'
  },
  // TCP - Partnership Taxation Advanced Topics
  {
    id: 'tcp-wc-207',
    section: 'TCP',
    courseId: 'cpa',
    blueprintArea: 'Entity Tax Planning',
    topicId: 'partnership-taxation',
    topic: 'Partnership Taxation',
    subtopic: 'Substantial Economic Effect',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A partnership agreement allocates 90% of depreciation deductions to Partner A (a high-income individual) and 10% to Partner B. Partner A has no other economic interest beyond the depreciation allocation. For this allocation to have substantial economic effect, which requirement is essential?',
    options: [
      'Partner A must contribute at least 90% of partnership capital',
      'The allocation must affect the dollar amounts received by partners upon liquidation',
      'Partner A must guarantee partnership debts',
      'The allocation must be approved by the IRS in advance'
    ],
    correctAnswer: 1,
    explanation: 'For an allocation to have substantial economic effect under IRC Section 704(b), it must have economic effect (maintain capital accounts and liquidate per capital account balances) AND be substantial (create a reasonable possibility that the allocation will substantially affect the dollar amounts received by partners independent of tax consequences). If the allocation only affects taxes without affecting economic outcomes, it lacks substantiality.',
    reference: 'IRC Section 704(b); Treasury Regulations Section 1.704-1(b)'
  },
  {
    id: 'tcp-wc-208',
    section: 'TCP',
    courseId: 'cpa',
    blueprintArea: 'Entity Tax Planning',
    topicId: 'partnership-taxation',
    topic: 'Partnership Taxation',
    subtopic: 'Disguised Sales',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Partner A contributes property with FMV of $1,000,000 and adjusted basis of $200,000 to a partnership. Within 30 days, the partnership distributes $800,000 cash to Partner A as a "distribution." How will this transaction likely be characterized for tax purposes?',
    options: [
      'Tax-free contribution followed by tax-free distribution',
      'Disguised sale of property with $800,000 gain recognition',
      'Part sale/part contribution with $640,000 gain recognition',
      'Loan from partnership to partner, not currently taxable'
    ],
    correctAnswer: 2,
    explanation: 'Under the disguised sale rules of IRC Section 707(a)(2)(B), when a contribution and distribution occur within two years (rebuttable presumption), they may be treated as a sale. The $800,000 distribution represents 80% of the FMV, so 80% is treated as a sale: Gain = ($800,000 proceeds) - ($200,000 × 80% = $160,000 allocated basis) = $640,000 recognized gain. The remaining 20% is a tax-free contribution.',
    reference: 'IRC Section 707(a)(2)(B); Treasury Regulations Section 1.707-3'
  },
  {
    id: 'tcp-wc-209',
    section: 'TCP',
    courseId: 'cpa',
    blueprintArea: 'Entity Tax Planning',
    topicId: 'partnership-taxation',
    topic: 'Partnership Taxation',
    subtopic: 'Hot Assets - Section 751',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Partner sells her 25% partnership interest for $500,000. Her outside basis is $300,000. The partnership has the following assets: cash $400,000; inventory (FMV $800,000, basis $500,000); and land (FMV $800,000, basis $700,000). What is the character of her $200,000 gain?',
    options: [
      '$200,000 long-term capital gain',
      '$75,000 ordinary income and $125,000 long-term capital gain',
      '$100,000 ordinary income and $100,000 long-term capital gain',
      '$200,000 ordinary income'
    ],
    correctAnswer: 1,
    explanation: 'Under Section 751(a), gain on sale of a partnership interest is ordinary to the extent of hot assets (unrealized receivables and inventory). Partner\'s share of inventory = 25% × $800,000 FMV = $200,000; share of basis = 25% × $500,000 = $125,000. Ordinary income component = $200,000 - $125,000 = $75,000. Remaining gain = $200,000 - $75,000 = $125,000 capital gain.',
    reference: 'IRC Section 751(a), Unrealized Receivables and Inventory Items'
  },
  {
    id: 'tcp-wc-210',
    section: 'TCP',
    courseId: 'cpa',
    blueprintArea: 'Entity Tax Planning',
    topicId: 'partnership-taxation',
    topic: 'Partnership Taxation',
    subtopic: 'Technical Terminations',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'On March 1, Partner A sells her 45% partnership interest to new Partner C. On September 1 of the same year, Partner B sells his 40% interest to new Partner D. The partnership uses a calendar year. When does the partnership\'s tax year end for purposes of the selling partners?',
    options: [
      'December 31, as partnerships cannot be terminated mid-year',
      'September 1, as a technical termination occurred',
      'December 31, as technical terminations were eliminated by TCJA',
      'March 1, as the first sale triggered termination'
    ],
    correctAnswer: 2,
    explanation: 'The Tax Cuts and Jobs Act of 2017 eliminated the technical termination rule (former IRC Section 708(b)(1)(B)) that caused a partnership to terminate when 50% or more of total interests were sold within 12 months. Post-TCJA, the partnership continues with its existing tax year regardless of ownership changes. The tax year ends December 31 as normal.',
    reference: 'IRC Section 708, as amended by TCJA; Former Section 708(b)(1)(B) repealed'
  }
];
