/**
 * CIA Part 2: Domain III Expansion - Business Processes and Controls
 * 
 * Domain III accounts for ~40% of CIA Part 2 but was underrepresented
 * This batch adds comprehensive coverage of business process controls
 */

import { Lesson } from '../../../types';

export const cia2DomainIIILessons: Lesson[] = [
  // ============================================================================
  // REVENUE AND COLLECTIONS CYCLE
  // ============================================================================
  {
    id: 'CIA2-III-061',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Revenue Cycle Controls and Risks',
    description: 'Master controls over the order-to-cash process',
    order: 61,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Revenue cycle', 'Sales controls', 'Credit authorization', 'Billing'],
    blueprintArea: 'CIA2-III',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'The revenue cycle is a high-risk area frequently tested on the CIA exam. It spans from customer order through cash collection and involves significant fraud and error risks. Domain III (40% of Part 2) emphasizes business processes.',
        },
        {
          title: 'Revenue Cycle Stages',
          type: 'text',
          content: "**Order-to-Cash Process:**\n\n1. **Sales Order Processing**\n   • Customer order receipt and validation\n   • Credit check and approval\n   • Inventory availability confirmation\n\n2. **Fulfillment/Shipping**\n   • Order picking and packing\n   • Shipping documentation\n   • Transfer of title\n\n3. **Billing**\n   • Invoice generation\n   • Revenue recognition\n   • Customer statement preparation\n\n4. **Collections**\n   • Accounts receivable management\n   • Cash receipts processing\n   • Aging analysis and follow-up",
        },
        {
          title: 'Key Controls by Stage',
          type: 'table',
          headers: ['Stage', 'Key Controls', 'Risk Addressed'],
          rows: [
            ['Credit Approval', 'Credit limits, credit checks before shipping', 'Bad debt, uncollectible accounts'],
            ['Shipping', 'Shipping documents signed, prenumbered documents', 'Theft, unauthorized shipments'],
            ['Billing', 'Three-way match, prenumbered invoices', 'Billing errors, fictitious sales'],
            ['Collections', 'Lockbox, segregation of duties', 'Lapping, misappropriation'],
          ],
        },
        {
          title: 'Critical Segregation of Duties',
          type: 'text',
          content: "**Must Be Separated:**\n\n• **Credit approval** vs. **Sales order entry**\n  (Prevents extending credit to related parties)\n\n• **Shipping** vs. **Billing** vs. **Accounts receivable**\n  (Prevents unrecorded shipments, fictitious sales)\n\n• **Cash receipts** vs. **Accounts receivable**\n  (Prevents lapping, misappropriation)\n\n• **Customer master file maintenance** vs. **Credit limits**\n  (Prevents unauthorized credit extensions)",
        },
        {
          title: 'Revenue Recognition Fraud Indicators',
          type: 'callout',
          content: '**Watch for these red flags:**\n\n• Channel stuffing (excessive sales to distributors)\n• Bill and hold transactions\n• Side agreements modifying terms\n• Unusual sales near period end\n• Revenue without proper performance obligation fulfillment\n• Multiple element arrangements not properly allocated',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Revenue cycle spans order through cash collection',
            'Credit approval must be segregated from sales processing',
            'Cash receipts must be segregated from AR recordkeeping',
            'Period-end revenue transactions require extra scrutiny',
            'Controls should address both error and fraud risks',
          ],
        },
      ],
    },
  },

  // ============================================================================
  // PROCUREMENT AND DISBURSEMENT CYCLE
  // ============================================================================
  {
    id: 'CIA2-III-062',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Procurement Cycle Controls and Risks',
    description: 'Master controls over the procure-to-pay process',
    order: 62,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Procurement', 'Purchase controls', 'Vendor management', 'Disbursements'],
    blueprintArea: 'CIA2-III',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'The procurement cycle is the most common area for fraud and kickbacks. Understanding procure-to-pay controls is essential for CIA Part 2 and real-world internal audit practice.',
        },
        {
          title: 'Procurement Cycle Stages',
          type: 'text',
          content: "**Procure-to-Pay Process:**\n\n1. **Requisition**\n   • Need identification\n   • Requisition preparation and approval\n   • Budget verification\n\n2. **Purchasing**\n   • Vendor selection\n   • Purchase order creation\n   • Contract negotiation (if applicable)\n\n3. **Receiving**\n   • Goods receipt and inspection\n   • Receiving report preparation\n   • Discrepancy handling\n\n4. **Accounts Payable**\n   • Three-way match\n   • Invoice approval\n   • Payment scheduling\n\n5. **Disbursement**\n   • Check/EFT preparation\n   • Payment authorization\n   • Vendor remittance",
        },
        {
          title: 'The Three-Way Match',
          type: 'text',
          content: "**The Three-Way Match** compares:\n\n1. **Purchase Order** - What was ordered (quantity, price, terms)\n2. **Receiving Report** - What was received (quantity, condition)\n3. **Vendor Invoice** - What vendor is billing\n\n**All three documents must agree** before payment is authorized.\n\n**Exceptions Requiring Investigation:**\n• Quantity differences beyond tolerance\n• Price discrepancies\n• Items received but not ordered\n• Invoices without purchase orders (potential fraud)",
        },
        {
          title: 'Key Controls',
          type: 'table',
          headers: ['Control', 'Purpose', 'Tests of Control'],
          rows: [
            ['Approved vendor list', 'Prevent unauthorized/fictitious vendors', 'Review vendor setup approvals'],
            ['Competitive bidding', 'Ensure fair pricing, prevent kickbacks', 'Sample bids, verify process'],
            ['Three-way match', 'Prevent payment for goods not received', 'Test matching exceptions'],
            ['Segregation of duties', 'Prevent fraud collusion', 'Document who does what'],
            ['Check signing limits', 'Control disbursement authority', 'Test compliance with limits'],
          ],
        },
        {
          title: 'Segregation of Duties',
          type: 'text',
          content: "**Must Be Separated:**\n\n• **Requisitioning** vs. **Purchasing** vs. **Receiving**\n  (Prevents ordering for personal use)\n\n• **Vendor file maintenance** vs. **Check preparation**\n  (Prevents payments to fictitious vendors)\n\n• **Receiving** vs. **Accounts Payable**\n  (Prevents paying for goods not received)\n\n• **Check signing** vs. **Bank reconciliation**\n  (Prevents concealment of unauthorized payments)",
        },
        {
          title: 'Vendor Fraud Red Flags',
          type: 'callout',
          content: '**Red flags for vendor fraud/kickbacks:**\n\n• Single-source contracts without justification\n• Vendor addresses match employee addresses\n• Round dollar invoices\n• Invoices just under approval thresholds\n• Unusual volume with one vendor\n• Missing competitive bids\n• Frequent change orders inflating contract value',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Three-way match is the primary control over disbursements',
            'Vendor file maintenance is a high-risk function',
            'Competitive bidding prevents kickbacks and ensures fair pricing',
            'Check signing must be segregated from bank reconciliation',
            'Watch for red flags indicating vendor collusion',
          ],
        },
      ],
    },
  },

  // ============================================================================
  // PAYROLL CYCLE
  // ============================================================================
  {
    id: 'CIA2-III-063',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Payroll Cycle Controls and Risks',
    description: 'Master controls over payroll processing and employee compensation',
    order: 63,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Payroll controls', 'Ghost employees', 'Time reporting', 'Payroll fraud'],
    blueprintArea: 'CIA2-III', 
    content: {
      sections: [
        {
          title: 'Payroll Cycle Overview',
          type: 'text',
          content: "**Key Payroll Functions:**\n\n1. **Human Resources**\n   • Hiring and termination\n   • Pay rate authorization\n   • Employee master file maintenance\n\n2. **Timekeeping**\n   • Time and attendance recording\n   • Supervisor approval\n   • Leave management\n\n3. **Payroll Processing**\n   • Gross pay calculation\n   • Deductions and withholdings\n   • Net pay computation\n\n4. **Disbursement**\n   • Paycheck/EFT preparation\n   • Distribution to employees\n   • Tax remittances",
        },
        {
          title: 'Key Controls',
          type: 'table',
          headers: ['Control', 'Purpose', 'Tests'],
          rows: [
            ['HR approval of new hires', 'Prevent ghost employees', 'Match payroll to HR records'],
            ['Supervisor time approval', 'Validate hours worked', 'Review unapproved time entries'],
            ['Independent payroll distribution', 'Detect ghost employees', 'Observe payroll distribution'],
            ['Separate bank account', 'Facilitate reconciliation', 'Review imprest account'],
            ['Payroll register review', 'Detect anomalies', 'Review management approval'],
          ],
        },
        {
          title: 'Segregation of Duties',
          type: 'text',
          content: "**Critical Separations:**\n\n• **HR (hiring)** vs. **Payroll processing**\n  (Prevents ghost employees)\n\n• **Timekeeping** vs. **Payroll calculation**\n  (Prevents inflated hours)\n\n• **Payroll preparation** vs. **Check distribution**\n  (Prevents payroll check theft)\n\n• **Payroll bank account** vs. **Regular operating account**\n  (Facilitates cash control)",
        },
        {
          title: 'Payroll Fraud Schemes',
          type: 'text',
          content: "**Common Payroll Frauds:**\n\n1. **Ghost Employees**\n   • Fictitious employees on payroll\n   • Departed employees not removed\n   • Detection: Match payroll to HR, observe distribution\n\n2. **Falsified Hours**\n   • Inflated overtime\n   • Hours reported not worked\n   • Detection: Time analysis, supervisor review\n\n3. **Commission Fraud**\n   • Fictitious sales for commission\n   • Revenue reversals after commission paid\n   • Detection: Commission recalculation, reversals analysis\n\n4. **Expense Reimbursement**\n   • Fictitious expenses\n   • Inflated amounts\n   • Detection: Receipt verification, policy compliance",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'HR hiring function must be segregated from payroll processing',
            'Ghost employee prevention requires matching payroll to HR records',
            'Physical payroll distribution or direct deposit reduces theft risk',
            'Supervisor approval of time is essential but not sufficient alone',
            'Separate payroll bank account facilitates control and reconciliation',
          ],
        },
      ],
    },
  },

  // ============================================================================
  // ESG AND SUSTAINABILITY AUDITING
  // ============================================================================
  {
    id: 'CIA2-IV-064',
    courseId: 'cia',
    section: 'CIA2',
    title: 'ESG and Sustainability Auditing',
    description: 'Emerging topic: Auditing Environmental, Social, and Governance factors',
    order: 64,
    duration: 50,
    difficulty: 'advanced',
    topics: ['ESG', 'Sustainability', 'Climate risk', 'Non-financial reporting'],
    blueprintArea: 'CIA2-IV',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'ESG (Environmental, Social, Governance) is a rapidly emerging area for internal audit. Regulators worldwide are mandating climate and sustainability disclosures. The IIA has signaled ESG will be increasingly important on the CIA exam. This is a differentiating topic for world-class preparation.',
        },
        {
          title: 'ESG Components',
          type: 'text',
          content: "**Environmental Factors:**\n• Climate risk and carbon emissions\n• Energy efficiency and renewable energy\n• Water usage and waste management\n• Biodiversity and ecosystem impact\n• Environmental compliance\n\n**Social Factors:**\n• Labor practices and human rights\n• Diversity, equity, and inclusion (DEI)\n• Employee health and safety\n• Community relations and impact\n• Supply chain social responsibility\n\n**Governance Factors:**\n• Board composition and independence\n• Executive compensation\n• Business ethics and anti-corruption\n• Shareholder rights\n• Risk oversight and transparency",
        },
        {
          title: 'Key ESG Reporting Frameworks',
          type: 'table',
          headers: ['Framework', 'Focus', 'Key Points'],
          rows: [
            ['GRI (Global Reporting Initiative)', 'Comprehensive sustainability', 'Most widely used, stakeholder focus'],
            ['SASB (Sustainability Accounting Standards Board)', 'Material industry issues', 'Industry-specific, investor focus'],
            ['TCFD (Task Force on Climate-Related Financial Disclosures)', 'Climate risk', 'Governance, strategy, risk, metrics'],
            ['ISSB/IFRS S1 & S2', 'Global baseline', 'New mandatory standards emerging'],
            ['CDP (Carbon Disclosure Project)', 'Environmental', 'Climate, water, forests disclosure'],
          ],
        },
        {
          title: 'Internal Audit Role in ESG',
          type: 'text',
          content: "**Internal Audit Can Provide Assurance Over:**\n\n1. **ESG Data Quality**\n   • Accuracy of emissions calculations\n   • Completeness of scope 1, 2, 3 data\n   • Reliability of sustainability metrics\n\n2. **Controls Over ESG Reporting**\n   • Data collection processes\n   • Third-party data validation\n   • Report preparation controls\n\n3. **ESG Risk Management**\n   • Climate risk assessment processes\n   • Transition risk planning\n   • Physical risk mitigation\n\n4. **Governance Structures**\n   • Board ESG oversight\n   • ESG-linked compensation\n   • Stakeholder engagement processes",
        },
        {
          title: 'ESG Audit Challenges',
          type: 'text',
          content: "**Unique Challenges for ESG Auditing:**\n\n• **Immature data systems** - ESG data often not as robust as financial data\n• **Multiple frameworks** - No single global mandatory standard (yet)\n• **Scope 3 complexity** - Supply chain emissions difficult to measure\n• **Greenwashing risk** - Misleading or exaggerated claims\n• **Evolving regulations** - Requirements rapidly changing\n• **Estimation uncertainty** - Many metrics require significant judgment\n• **Third-party reliance** - External certifications and offsets",
        },
        {
          title: 'TCFD Recommendations',
          type: 'callout',
          content: '**TCFD Four Core Elements:**\n\n**1. Governance** - Board and management oversight of climate risk\n**2. Strategy** - Climate-related risks and opportunities impact\n**3. Risk Management** - How climate risks are identified, assessed, managed\n**4. Metrics & Targets** - Metrics used to assess and manage climate risk\n\nInternal audit should assess maturity across all four pillars.',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'ESG = Environmental, Social, Governance factors',
            'Multiple reporting frameworks exist (GRI, SASB, TCFD, ISSB)',
            'Internal audit provides assurance over ESG data quality and controls',
            'Greenwashing is a significant risk requiring auditor attention',
            'ESG audit requires understanding emerging regulations and frameworks',
          ],
        },
      ],
    },
  },

  // ============================================================================
  // THIRD-PARTY AND VENDOR RISK MANAGEMENT
  // ============================================================================
  {
    id: 'CIA2-III-065',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Third-Party and Vendor Risk Management',
    description: 'Auditing outsourced functions and vendor relationships',
    order: 65,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Third-party risk', 'Vendor management', 'SOC reports', 'Outsourcing'],
    blueprintArea: 'CIA2-III',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'Organizations increasingly rely on third parties for critical functions. Vendor risks extend to the organization - "You can outsource a function but not the risk." Third-party risk management is frequently tested on CIA Part 2.',
        },
        {
          title: 'Third-Party Risk Categories',
          type: 'text',
          content: "**Key Risk Categories:**\n\n• **Operational Risk** - Service disruption, quality failures\n• **Compliance Risk** - Regulatory violations by vendor\n• **Financial Risk** - Vendor financial instability\n• **Strategic Risk** - Over-dependence, loss of competitive advantage\n• **Reputational Risk** - Vendor actions affecting brand\n• **Cybersecurity Risk** - Data breaches, access vulnerabilities\n• **Concentration Risk** - Reliance on single vendor\n• **Country/Political Risk** - Geopolitical impacts on service",
        },
        {
          title: 'Third-Party Management Lifecycle',
          type: 'table',
          headers: ['Phase', 'Key Activities', 'Internal Audit Focus'],
          rows: [
            ['Planning', 'Needs assessment, risk classification', 'Risk categorization methodology'],
            ['Due Diligence', 'Financial, operational, security assessment', 'Due diligence completeness'],
            ['Contracting', 'SLAs, audit rights, termination clauses', 'Contract terms review'],
            ['Ongoing Monitoring', 'Performance tracking, periodic reviews', 'Monitoring effectiveness'],
            ['Termination', 'Exit planning, data return, transition', 'Data handling controls'],
          ],
        },
        {
          title: 'SOC Reports Overview',
          type: 'text',
          content: "**SOC (System and Organization Controls) Reports:**\n\n**SOC 1** - Controls over Financial Reporting\n• Type I: Design at a point in time\n• Type II: Design and operating effectiveness over period\n• For service organizations affecting clients' financial statements\n\n**SOC 2** - Trust Services Criteria\n• Security, Availability, Processing Integrity, Confidentiality, Privacy\n• Type I or Type II available\n• Not as restricted in distribution\n\n**SOC 3** - Public Report\n• Same criteria as SOC 2\n• Suitable for general distribution\n• Less detailed than SOC 2",
        },
        {
          title: 'Using SOC Reports',
          type: 'callout',
          content: '**When reviewing SOC reports:**\n\n1. **Check scope** - Does it cover your services/locations?\n2. **Review period** - Is it current? Bridge letters for gaps?\n3. **Check exceptions** - Any control failures noted?\n4. **Complementary controls** - What controls are YOUR responsibility?\n5. **Subservice providers** - Are they carved out or included?\n6. **Auditor reputation** - Is the CPA firm reputable?',
        },
        {
          title: 'Key Contract Provisions',
          type: 'text',
          content: "**Essential Vendor Contract Terms:**\n\n• **Right to audit** - Access to vendor facilities and records\n• **Service levels** - Performance metrics and remedies\n• **Security requirements** - Specific controls required\n• **Business continuity** - BCP/DR requirements and testing\n• **Data protection** - Ownership, confidentiality, breach notification\n• **Subcontracting** - Approval requirements, controls\n• **Termination rights** - Exit triggers, data return, transition assistance\n• **Insurance** - Liability coverage requirements\n• **Compliance** - Regulatory obligation compliance",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'You can outsource functions but not accountability',
            'Due diligence should occur before contract signing',
            'SOC reports provide third-party assurance on controls',
            'Right to audit clause enables ongoing monitoring',
            'Exit planning should be considered before engagement',
          ],
        },
      ],
    },
  },
];

export default cia2DomainIIILessons;
