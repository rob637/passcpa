/**
 * CFP Professional Conduct Lessons - Regulatory Environment
 * Domain 1: Professional Conduct and Regulation (15% of exam)
 * Blueprint Area: PRO-2 - Laws and Regulations
 * 
 * Topics: SEC, FINRA, state regulations, investment adviser requirements
 */

import type { Lesson } from '../../../types';

export const CFP_PRO2_LESSONS: Lesson[] = [
  {
    id: 'CFP-PRO-L005',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    title: 'Federal Securities Laws and Regulations',
    description: 'Distinguish Investment Adviser from Broker-Dealer',
    order: 5,
    duration: 35,
    difficulty: 'intermediate',
    topics: [
      'Investment Adviser vs. Broker-Dealer',
      'SEC registration requirements',
      'Fiduciary standards under securities law',
      'Prohibited practices'
    ],
    content: {
      sections: [
        {
          title: 'Key Securities Acts',
          type: 'table',
          headers: ['Act', 'Focus', 'Key Provisions'],
          rows: [
            ['Securities Act of 1933', 'Issuance of NEW securities', 'Registration requirements, prospectus delivery, anti-fraud provisions, "Truth in Securities" law'],
            ['Securities Exchange Act of 1934', 'Trading EXISTING securities', 'Created SEC, broker-dealer registration, anti-fraud Rule 10b-5, insider trading prohibitions'],
            ['Investment Advisers Act of 1940', 'Regulation of INVESTMENT ADVISERS', 'Registration requirements, fiduciary standard, record-keeping, advertising restrictions'],
            ['Investment Company Act of 1940', 'Regulation of INVESTMENT COMPANIES', 'Mutual funds, ETFs, closed-end funds, unit investment trusts']
          ]
        },
        {
          title: 'Investment Adviser Three-Element Test',
          type: 'callout',
          content: 'Remember ABC: Advice, Business, Compensation. A person is an Investment Adviser if they: (1) Provide advice/analysis about securities, (2) Are in the business of providing advice, and (3) Receive compensation.'
        },
        {
          title: 'Exclusions from IA Definition',
          type: 'list',
          items: [
            'Banks',
            'Lawyers, accountants, engineers, teachers (incidental advice)',
            'Broker-dealers (solely incidental, no special compensation)',
            'Publishers',
            'Government securities advisers'
          ]
        },
        {
          title: 'SEC vs. State Registration',
          type: 'table',
          headers: ['AUM Level', 'Registration Requirement'],
          rows: [
            ['≥ $100 million', 'MUST register with SEC'],
            ['$25-100 million', 'May register with SEC or state'],
            ['< $25 million', 'Generally state registration']
          ]
        },
        {
          title: 'De Minimis Exemption',
          type: 'text',
          content: 'For advisers with no place of business in a state: Fewer than 5 clients in the state over 12 months, and clients are accredited investors, institutional, or existing.'
        },
        {
          title: 'Investment Adviser vs. Broker-Dealer Comparison',
          type: 'table',
          headers: ['Feature', 'Investment Adviser', 'Broker-Dealer'],
          rows: [
            ['Standard', 'Fiduciary (best interest)', 'Reg BI (best interest)'],
            ['Registration', 'SEC or state', 'FINRA/SEC'],
            ['Compensation', 'Fees (AUM, hourly, flat)', 'Commissions'],
            ['Products', 'Advice on all products', 'Trade execution'],
            ['Primary law', 'Investment Advisers Act 1940', 'Securities Exchange Act 1934']
          ]
        },
        {
          title: 'SEC Regulation Best Interest (Reg BI)',
          type: 'text',
          content: 'Applies to broker-dealers and associated persons when recommending securities to retail customers. Four obligations: (1) Disclosure Obligation—material facts, Form CRS, fees, conflicts; (2) Care Obligation—reasonable basis in client\'s best interest, consider costs and alternatives; (3) Conflict of Interest Obligation—policies to identify and address conflicts, eliminate sales contests, mitigate incentives; (4) Compliance Obligation—policies and procedures, supervision and training.'
        },
        {
          title: 'Form CRS (Client Relationship Summary)',
          type: 'list',
          items: [
            'Required content: Introduction, relationships/services, fees/costs/conflicts, standards of conduct, disciplinary history, additional information',
            'Delivery: Before or at earliest recommendation, at account opening, when relationship changes materially'
          ]
        },
        {
          title: 'Form ADV Parts',
          type: 'table',
          headers: ['Part', 'Content', 'Delivery'],
          rows: [
            ['Part 1', 'Firm information for SEC, AUM, business practices, disciplinary information', 'Filed with SEC'],
            ['Part 2A (Brochure)', 'Plain English description, services, fees, conflicts, disciplinary history', 'Before or at engagement'],
            ['Part 2B (Supplement)', 'Individual adviser information, education, experience, disciplinary history', 'Before or at advice']
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          content: ['Investment Adviser: Provides advice + In the business + Compensation', 'SEC registration: $100M+ AUM required; $25-100M optional', 'IAs have fiduciary standard; BDs have Reg BI standard', 'Form ADV Part 2A is the "brochure" for clients', 'Form CRS required for both IAs and BDs with retail customers']
        }
      ]
    }
  },
  {
    id: 'CFP-PRO-L006',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    title: 'FINRA and Insurance Regulation',
    description: 'Understand FINRA\'s role and requirements',
    order: 6,
    duration: 30,
    difficulty: 'intermediate',
    topics: [
      'FINRA role and requirements',
      'Suitability and Reg BI standards',
      'Insurance regulation framework',
      'Licensing requirements'
    ],
    content: {
      sections: [
        {
          title: 'What is FINRA?',
          type: 'text',
          content: 'Financial Industry Regulatory Authority (FINRA) is a self-regulatory organization (SRO) that regulates broker-dealers. It is not a government agency but is authorized by SEC.'
        },
        {
          title: 'FINRA Functions',
          type: 'callout',
          content: 'Remember FINRA: Functions include Investigations, Norms (rules), Registrations (exams), Arbitration'
        },
        {
          title: 'FINRA Registration Requirements',
          type: 'table',
          headers: ['Exam', 'Purpose'],
          rows: [
            ['Series 6', 'Investment company products'],
            ['Series 7', 'General securities'],
            ['Series 63/65/66', 'State exams'],
            ['Series 24', 'Principal/supervisor']
          ]
        },
        {
          title: 'Suitability vs. Best Interest',
          type: 'table',
          headers: ['Aspect', 'Suitability', 'Reg BI'],
          rows: [
            ['Standard', 'Suitable for customer', 'Best interest'],
            ['Cost consideration', 'Lesser role', 'Must consider'],
            ['Conflicts', 'Disclosure', 'Disclosure + mitigation'],
            ['Applies when', 'All customers', 'Retail customers']
          ]
        },
        {
          title: 'Insurance Regulation: State-Based System',
          type: 'text',
          content: 'Insurance is regulated primarily by states, not the federal government. Each state has an insurance commissioner, licensing by state, and different rules by state. NAIC (National Association of Insurance Commissioners) coordinates state regulation and creates model laws but is not a regulatory body itself.'
        },
        {
          title: 'Insurance Producer Licensing',
          type: 'list',
          items: [
            'Pre-licensing education required',
            'Pass state exam',
            'Background check',
            'Continuing education required',
            'Non-resident licensing available through reciprocity agreements'
          ]
        },
        {
          title: 'Insurance Conduct Standards',
          type: 'list',
          items: [
            'Suitability: Product appropriate for customer, match to needs and risk tolerance, document analysis',
            'Replacement regulations: Enhanced disclosure, comparison of policies, potential disadvantages disclosed',
            'Prohibited: Misrepresenting policy terms, twisting (replacement solely for new commission), rebating (usually prohibited), churning (excessive replacement)'
          ]
        },
        {
          title: 'Variable Products: Dual Regulation',
          type: 'warning',
          content: 'Variable annuities and variable life insurance require BOTH state insurance license AND securities license (Series 6 or 7). They are regulated by state insurance commissioner AND SEC/FINRA. Prospectus required before purchase—cannot guarantee returns.'
        },
        {
          title: 'Anti-Money Laundering (AML)',
          type: 'text',
          content: 'Bank Secrecy Act/USA PATRIOT Act requirements: Customer Identification Program (CIP), report suspicious activity (SAR), report cash transactions >$10,000 (CTR). CFP® professionals may have AML obligations through firms.'
        },
        {
          title: 'Summary',
          type: 'summary',
          content: ['FINRA is an SRO that regulates broker-dealers and their representatives', 'Reg BI requires "best interest" standard for retail customers', 'Insurance is regulated primarily by states, not federal government', 'Variable products require both insurance and securities licenses', 'Replacement of insurance policies triggers enhanced disclosure']
        }
      ]
    }
  },
  {
    id: 'CFP-PRO-L007',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    title: 'ERISA and Qualified Plan Fiduciary Standards',
    description: 'Understand ERISA fiduciary requirements',
    order: 7,
    duration: 30,
    difficulty: 'advanced',
    topics: [
      'ERISA fiduciary requirements',
      'Prudent expert standard',
      'Prohibited transactions',
      'DOL fiduciary rules'
    ],
    content: {
      sections: [
        {
          title: 'ERISA Overview',
          type: 'text',
          content: 'Employee Retirement Income Security Act of 1974 protects employee benefit plan participants, establishes fiduciary standards, and includes reporting, disclosure, and enforcement requirements. Covers private employer retirement plans (401(k), pension, profit-sharing) and health/welfare plans. NOT covered: government plans, church plans, IRAs (but similar rules may apply).'
        },
        {
          title: 'Who is an ERISA Fiduciary?',
          type: 'list',
          items: [
            'Exercise discretion in plan management',
            'Exercise authority over plan assets',
            'Have discretionary responsibility for administration',
            'Provide investment advice for compensation'
          ]
        },
        {
          title: 'Types of ERISA Fiduciaries',
          type: 'table',
          headers: ['Type', 'Role'],
          rows: [
            ['Named fiduciary', 'Identified in plan document'],
            ['Plan administrator', 'Manages plan operations'],
            ['Investment manager', 'Manages plan investments'],
            ['Trustee', 'Holds plan assets']
          ]
        },
        {
          title: 'ERISA Fiduciary Duties',
          type: 'callout',
          content: 'Remember EPDF: Exclusive benefit, Prudent expert, Diversify, Follow documents'
        },
        {
          title: 'Key ERISA Standards',
          type: 'list',
          items: [
            'Exclusive Benefit Rule: Act solely in interest of participants and beneficiaries—no self-dealing',
            'Prudent Expert Rule: Act with care, skill, prudence of a prudent EXPERT (higher than ordinary prudence)',
            'Diversification Requirement: Diversify investments to minimize large loss risk unless clearly prudent not to',
            'Follow Plan Documents: Operate plan in accordance with governing documents unless they violate ERISA'
          ]
        },
        {
          title: 'Prohibited Transactions',
          type: 'warning',
          content: 'Generally prohibited between plan and parties in interest (fiduciary, service provider, employer, employees, relatives). Specific prohibitions: selling/leasing property to plan, lending to/from plan, transferring plan assets, using plan assets for own benefit. Some exemptions exist for reasonable compensation and arm\'s length transactions.'
        },
        {
          title: 'DOL Fiduciary Rule',
          type: 'text',
          content: 'A person is a fiduciary when providing investment recommendations for a fee to retirement plans, plan participants, IRA owners, or for rollover recommendations. PTE 2020-02 allows conflicted advice if: acknowledge fiduciary status, act in best interest, avoid misleading statements, reasonable compensation, and disclosure of conflicts.'
        },
        {
          title: 'Rollover Recommendations',
          type: 'warning',
          content: 'Rollover recommendations require heightened scrutiny. Must consider: fees (IRA vs. plan), investment options, services/features, penalty/protection differences. Documentation required: reasons for recommendation, alternatives considered, fee comparison, why rollover is in best interest.'
        },
        {
          title: 'Consequences of ERISA Breach',
          type: 'list',
          items: [
            'Personal liability for losses to plan from breach',
            'Personal liability for profits made from breach',
            'Liability for breach of co-fiduciary',
            'DOL investigation and lawsuit',
            'Participant lawsuits',
            'Excise taxes',
            'Criminal penalties possible'
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          content: ['ERISA creates fiduciary status through discretion, authority, or investment advice', 'Prudent EXPERT standard—higher than ordinary prudence', 'Prohibited transactions bar dealings between plan and parties in interest', 'DOL fiduciary rule applies to investment advice to retirement accounts including IRAs', 'Rollover recommendations require documented best-interest analysis']
        }
      ]
    }
  },
  {
    id: 'CFP-PRO-L008',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    title: 'Consumer Protection and Suitability',
    description: 'Apply know-your-customer requirements',
    order: 8,
    duration: 25,
    difficulty: 'intermediate',
    topics: [
      'Know-your-customer requirements',
      'Elder financial protection',
      'Complaint handling',
      'Consumer protection requirements'
    ],
    content: {
      sections: [
        {
          title: 'Know Your Customer (KYC)',
          type: 'text',
          content: 'At minimum, gather: name, address, identification; age and date of birth; employment status; annual income; net worth and liquid assets; investment objectives; risk tolerance; time horizon; tax status. Purpose: ensure suitability, comply with regulations, anti-money laundering, customer service.'
        },
        {
          title: 'KYC Memory Aid: FROOT',
          type: 'callout',
          content: 'Financial situation, Risk tolerance, Objectives, Other info, Time horizon'
        },
        {
          title: 'Suitability Analysis Components',
          type: 'table',
          headers: ['Component', 'Description'],
          rows: [
            ['Reasonable Basis', 'Advisor must understand product features, risks, costs, appropriate uses'],
            ['Customer-Specific', 'Recommendation must be appropriate for THIS client—financial situation, objectives, risk tolerance, time horizon, tax situation'],
            ['Quantitative', 'Pattern of recommendations must be appropriate—not excessive trading or costs']
          ]
        },
        {
          title: 'Elder Financial Protection',
          type: 'text',
          content: 'Vulnerable adults face higher risk due to cognitive decline, isolation, trust in others, and less tech-savvy. FINRA Rule 2165 allows temporary hold on disbursements (up to 25 business days) if reasonable belief of exploitation. FINRA Rule 4512 requires obtaining trusted contact person.'
        },
        {
          title: 'Best Practices for Elder Protection',
          type: 'list',
          items: [
            'Require call-backs for large transactions',
            'Document unusual behavior',
            'Consider capacity assessments',
            'Train staff on warning signs',
            'Report suspected abuse'
          ]
        },
        {
          title: 'Complaint Handling',
          type: 'list',
          items: [
            'Written complaint procedures required',
            'Document all complaints',
            'Investigate thoroughly',
            'Respond timely',
            'Retain records',
            'Some complaints must be reported to FINRA, Form ADV, CFP Board'
          ]
        },
        {
          title: 'Privacy and Data Protection',
          type: 'table',
          headers: ['Regulation', 'Requirements'],
          rows: [
            ['Regulation S-P (SEC)', 'Privacy notices, opt-out for information sharing, safeguards required'],
            ['Gramm-Leach-Bliley Act', 'Financial privacy protections, information security requirements, annual privacy notices'],
            ['CFP Board', 'Confidentiality duty, reasonable safeguards, limited use of information']
          ]
        },
        {
          title: 'Arbitration and Dispute Resolution',
          type: 'list',
          items: [
            'FINRA Arbitration: Predispute agreements common, binding decision, limited appeal rights, generally faster than court',
            'Mediation: Non-binding, facilitator helps parties agree, often faster and cheaper',
            'CFP Board Process: Separate from legal process, can suspend or revoke certification, public discipline for serious violations'
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          content: ['KYC requires gathering financial situation, objectives, risk tolerance, time horizon', 'Suitability analysis has three parts: reasonable basis, customer-specific, quantitative', 'FINRA Rule 2165 allows holds on elder disbursements if exploitation suspected', 'Trusted contact person helps protect vulnerable clients', 'Privacy laws require notices, opt-outs, and information safeguards']
        }
      ]
    }
  }
];

export default CFP_PRO2_LESSONS;
