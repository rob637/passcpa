/**
 * CIA Part 3: Business Knowledge for Internal Auditing - Questions Batch 4
 * Questions CIA3-271 through CIA3-340
 * 
 * Domain breakdown:
 * - Domain I: Business Acumen (35%)
 * - Domain II: Information Security (25%)
 * - Domain III: Information Technology (20%)
 * - Domain IV: Financial Management (20%)
 */

import { Question } from '../../../types';

export const CIA3_QUESTIONS_BATCH4: Question[] = [
  // ============================================================================
  // DOMAIN I: BUSINESS ACUMEN (35%)
  // ============================================================================
  
  {
    id: 'CIA3-271',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Strategic planning involves:',
    options: [
      'Day-to-day operational decisions',
      'Defining long-term direction and allocating resources to achieve goals',
      'Processing payroll',
      'Managing accounts receivable'
    ],
    correctAnswer: 1,
    explanation: 'Strategic planning involves setting long-term organizational direction, goals, and allocating resources to achieve the strategic vision.',
    topic: 'Business Acumen',
    subtopic: 'Strategic Planning'
  },
  {
    id: 'CIA3-272',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'A balanced scorecard measures performance across:',
    options: [
      'Financial perspective only',
      'Financial, customer, internal process, and learning/growth perspectives',
      'Customer satisfaction only',
      'Employee metrics only'
    ],
    correctAnswer: 1,
    explanation: 'The balanced scorecard includes four perspectives: financial, customer, internal business processes, and learning/growth.',
    topic: 'Business Acumen',
    subtopic: 'Performance Measurement'
  },
  
  {
    id: 'CIA3-274',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Supply chain management focuses on:',
    options: [
      'Marketing strategies',
      'Managing flow of goods, information, and finances from source to customer',
      'Human resource policies',
      'Legal compliance'
    ],
    correctAnswer: 1,
    explanation: 'Supply chain management coordinates the flow of goods, services, information, and finances from raw materials to end customer.',
    topic: 'Business Acumen',
    subtopic: 'Supply Chain Management'
  },
  {
    id: 'CIA3-275',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Key performance indicators (KPIs) should be:',
    options: [
      'Numerous to cover all activities',
      'Aligned with strategic objectives and measurable',
      'Created annually with no updates',
      'Focused only on financial results'
    ],
    correctAnswer: 1,
    explanation: 'Effective KPIs are aligned with strategic objectives, quantifiable, actionable, and provide timely information for decision-making.',
    topic: 'Business Acumen',
    subtopic: 'Performance Indicators'
  },
  
  {
    id: 'CIA3-277',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Outsourcing decisions should consider:',
    options: [
      'Cost savings only',
      'Risks, quality, strategic alignment, and total cost',
      'Vendor reputation only',
      'Speed of implementation'
    ],
    correctAnswer: 1,
    explanation: 'Outsourcing decisions must consider risks, quality impacts, strategic fit, vendor capabilities, and total cost including hidden costs.',
    topic: 'Business Acumen',
    subtopic: 'Outsourcing'
  },
  {
    id: 'CIA3-278',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Change management in organizations requires:',
    options: [
      'Surprise announcements',
      'Stakeholder engagement, communication, and managing resistance',
      'Mandating changes without explanation',
      'Technical training only'
    ],
    correctAnswer: 1,
    explanation: 'Effective change management involves stakeholder engagement, clear communication, training, and addressing resistance.',
    topic: 'Business Acumen',
    subtopic: 'Change Management'
  },
  {
    id: 'CIA3-279',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Quality management systems like ISO 9001:',
    options: [
      'Guarantee high quality products',
      'Provide a framework for consistent quality processes',
      'Apply only to manufacturing',
      'Are voluntary suggestions'
    ],
    correctAnswer: 1,
    explanation: 'ISO 9001 provides a framework for quality management systems focused on consistent processes, not guarantee of product quality.',
    topic: 'Business Acumen',
    subtopic: 'Quality Management'
  },
  {
    id: 'CIA3-280',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Organizational structure affects:',
    options: [
      'External market conditions',
      'Communication, decision-making, and accountability',
      'Economic factors',
      'Regulatory requirements'
    ],
    correctAnswer: 1,
    explanation: 'Organizational structure influences how information flows, decisions are made, responsibilities are assigned, and accountability is enforced.',
    topic: 'Business Acumen',
    subtopic: 'Organizational Structure'
  },
  {
    id: 'CIA3-281',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Value chain analysis identifies:',
    options: [
      'Competitor weaknesses',
      'Activities that create value and those that don\'t add value',
      'Employee performance issues',
      'Regulatory gaps'
    ],
    correctAnswer: 1,
    explanation: 'Value chain analysis examines activities to identify which create value for customers and which are candidates for improvement or elimination.',
    topic: 'Business Acumen',
    subtopic: 'Value Chain'
  },
  {
    id: 'CIA3-282',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Project management includes:',
    options: [
      'Ongoing operational activities',
      'Defining scope, timeline, resources, and managing to completion',
      'Routine maintenance tasks',
      'Annual budget preparation'
    ],
    correctAnswer: 1,
    explanation: 'Project management involves planning, organizing, and managing resources to achieve specific goals within defined constraints.',
    topic: 'Business Acumen',
    subtopic: 'Project Management'
  },
  {
    id: 'CIA3-283',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Lean principles focus on:',
    options: [
      'Reducing staff',
      'Eliminating waste and maximizing value',
      'Increasing inventory levels',
      'Adding process steps'
    ],
    correctAnswer: 1,
    explanation: 'Lean principles focus on eliminating waste (non-value-added activities) while maximizing value delivered to customers.',
    topic: 'Business Acumen',
    subtopic: 'Lean Management'
  },
  
  // ============================================================================
  // DOMAIN II: INFORMATION SECURITY (25%)
  // ============================================================================
  
  {
    id: 'CIA3-284',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'The CIA triad in information security refers to:',
    options: [
      'Central Intelligence Agency guidelines',
      'Confidentiality, Integrity, and Availability',
      'Certified Internal Auditor requirements',
      'Control, Inspection, and Assessment'
    ],
    correctAnswer: 1,
    explanation: 'The CIA triad represents the three pillars of information security: Confidentiality, Integrity, and Availability.',
    topic: 'Information Security',
    subtopic: 'Security Fundamentals'
  },
  {
    id: 'CIA3-285',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Defense in depth security strategy involves:',
    options: [
      'One strong security control',
      'Multiple layers of security controls',
      'Physical security only',
      'Perimeter protection exclusively'
    ],
    correctAnswer: 1,
    explanation: 'Defense in depth uses multiple layers of security controls so that if one fails, others provide protection.',
    topic: 'Information Security',
    subtopic: 'Security Strategy'
  },
  {
    id: 'CIA3-286',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Access control least privilege means:',
    options: [
      'Giving everyone minimum access',
      'Granting only access necessary to perform job functions',
      'Removing access after termination',
      'Limiting administrator accounts'
    ],
    correctAnswer: 1,
    explanation: 'Least privilege grants users only the minimum access rights necessary to perform their job functions.',
    topic: 'Information Security',
    subtopic: 'Access Control'
  },
  
  {
    id: 'CIA3-288',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Encryption at rest protects:',
    options: [
      'Data during transmission',
      'Stored data on disks and databases',
      'Data in memory',
      'Network traffic'
    ],
    correctAnswer: 1,
    explanation: 'Encryption at rest protects stored data on devices, databases, and backup media from unauthorized access.',
    topic: 'Information Security',
    subtopic: 'Encryption'
  },
  
  {
    id: 'CIA3-290',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'A security incident response plan should:',
    options: [
      'Be developed after an incident',
      'Define roles, procedures, and communication for handling incidents',
      'Focus only on technical response',
      'Be kept confidential from staff'
    ],
    correctAnswer: 1,
    explanation: 'An incident response plan should be prepared in advance, defining roles, procedures, escalation, and communication protocols.',
    topic: 'Information Security',
    subtopic: 'Incident Response'
  },
  {
    id: 'CIA3-291',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Penetration testing:',
    options: [
      'Is unauthorized hacking',
      'Simulates attacks to identify vulnerabilities with authorization',
      'Replaces vulnerability scanning',
      'Should be done infrequently'
    ],
    correctAnswer: 1,
    explanation: 'Penetration testing is authorized simulated attacks to identify security weaknesses before malicious actors exploit them.',
    topic: 'Information Security',
    subtopic: 'Security Testing'
  },
  {
    id: 'CIA3-292',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Data classification helps:',
    options: [
      'Reduce storage costs only',
      'Determine appropriate handling and protection based on sensitivity',
      'Speed up data processing',
      'Comply with all regulations automatically'
    ],
    correctAnswer: 1,
    explanation: 'Data classification categorizes data by sensitivity level to determine appropriate handling, protection, and access controls.',
    topic: 'Information Security',
    subtopic: 'Data Classification'
  },
  {
    id: 'CIA3-293',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Security awareness training should:',
    options: [
      'Be done once during onboarding',
      'Be ongoing and address current threats',
      'Focus only on IT staff',
      'Cover policies without practical examples'
    ],
    correctAnswer: 1,
    explanation: 'Security awareness training should be ongoing, relevant to current threats, and apply to all employees.',
    topic: 'Information Security',
    subtopic: 'Security Awareness'
  },
  
  // ============================================================================
  // DOMAIN III: INFORMATION TECHNOLOGY (20%)
  // ============================================================================
  
  {
    id: 'CIA3-294',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'IT general controls include:',
    options: [
      'Transaction processing controls',
      'Access security, change management, and operations controls',
      'Input validation only',
      'Output controls exclusively'
    ],
    correctAnswer: 1,
    explanation: 'ITGCs include access security, change management, computer operations, and other controls that enable reliable IT operations.',
    topic: 'Information Technology',
    subtopic: 'IT General Controls'
  },
  {
    id: 'CIA3-295',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'SDLC (Software Development Life Cycle) phases typically include:',
    options: [
      'Coding only',
      'Requirements, design, development, testing, and maintenance',
      'Testing and deployment only',
      'Design and development exclusively'
    ],
    correctAnswer: 1,
    explanation: 'SDLC includes planning, requirements analysis, design, development, testing, deployment, and maintenance phases.',
    topic: 'Information Technology',
    subtopic: 'SDLC'
  },
  {
    id: 'CIA3-296',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Database controls should ensure:',
    options: [
      'Maximum storage capacity',
      'Data integrity, availability, and authorized access',
      'Fastest processing speed',
      'Minimum backup requirements'
    ],
    correctAnswer: 1,
    explanation: 'Database controls protect data integrity, ensure availability, and restrict access to authorized users.',
    topic: 'Information Technology',
    subtopic: 'Database Controls'
  },
  {
    id: 'CIA3-297',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Cloud computing risks include:',
    options: [
      'Reduced costs only',
      'Data security, vendor dependency, and compliance challenges',
      'Improved performance only',
      'Enhanced control'
    ],
    correctAnswer: 1,
    explanation: 'Cloud computing introduces risks around data security, privacy, vendor lock-in, availability, and regulatory compliance.',
    topic: 'Information Technology',
    subtopic: 'Cloud Computing'
  },
  {
    id: 'CIA3-298',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'IT disaster recovery planning should:',
    options: [
      'Focus on data backup only',
      'Address technology, people, processes, and facilities recovery',
      'Be separate from business continuity',
      'Cover IT department only'
    ],
    correctAnswer: 1,
    explanation: 'IT DR planning addresses recovery of technology systems, including hardware, software, data, networks, and supporting infrastructure.',
    topic: 'Information Technology',
    subtopic: 'Disaster Recovery'
  },
  {
    id: 'CIA3-299',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Data analytics in auditing can:',
    options: [
      'Replace auditor judgment',
      'Identify patterns, anomalies, and test entire populations',
      'Eliminate the need for sampling',
      'Guarantee fraud detection'
    ],
    correctAnswer: 1,
    explanation: 'Data analytics enables testing of entire populations, identification of patterns and anomalies, and more effective audit procedures.',
    topic: 'Information Technology',
    subtopic: 'Data Analytics'
  },
  {
    id: 'CIA3-300',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Change management controls should:',
    options: [
      'Allow emergency changes without approval',
      'Document, test, and approve changes before implementation',
      'Focus on hardware changes only',
      'Be waived for small changes'
    ],
    correctAnswer: 1,
    explanation: 'Change management ensures changes are properly requested, assessed, authorized, tested, and documented before implementation.',
    topic: 'Information Technology',
    subtopic: 'Change Management'
  },
  {
    id: 'CIA3-301',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Artificial intelligence in business introduces risks related to:',
    options: [
      'Improved efficiency only',
      'Bias, transparency, accountability, and data quality',
      'Reduced costs only',
      'Enhanced accuracy exclusively'
    ],
    correctAnswer: 1,
    explanation: 'AI introduces risks around algorithmic bias, lack of transparency (black box), accountability questions, and dependency on data quality.',
    topic: 'Information Technology',
    subtopic: 'Emerging Technology'
  },
  
  // ============================================================================
  // DOMAIN IV: FINANCIAL MANAGEMENT (20%)
  // ============================================================================
  
  {
    id: 'CIA3-302',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'The time value of money concept states that:',
    options: [
      'Money has no time sensitivity',
      'A dollar today is worth more than a dollar in the future',
      'Future money is worth more',
      'Interest rates don\'t affect value'
    ],
    correctAnswer: 1,
    explanation: 'Time value of money recognizes that money available now is worth more than the same amount in the future due to earning potential.',
    topic: 'Financial Management',
    subtopic: 'Time Value of Money'
  },
  {
    id: 'CIA3-303',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Net Present Value (NPV) analysis:',
    options: [
      'Ignores the time value of money',
      'Discounts future cash flows to present value and compares to investment',
      'Only considers accounting profit',
      'Focuses on payback period'
    ],
    correctAnswer: 1,
    explanation: 'NPV discounts expected future cash flows to present value using a required rate of return and compares to initial investment.',
    topic: 'Financial Management',
    subtopic: 'Capital Budgeting'
  },
  
  {
    id: 'CIA3-305',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Budget variance analysis:',
    options: [
      'Creates next year\'s budget',
      'Compares actual results to budgeted amounts and investigates differences',
      'Summarizes financial statements',
      'Calculates break-even point'
    ],
    correctAnswer: 1,
    explanation: 'Variance analysis compares actual to budgeted performance, identifies significant differences, and investigates causes.',
    topic: 'Financial Management',
    subtopic: 'Budgeting'
  },
  {
    id: 'CIA3-306',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'The weighted average cost of capital (WACC):',
    options: [
      'Equals the cost of debt only',
      'Represents the blended cost of all capital sources',
      'Is calculated using only equity',
      'Ignores tax effects'
    ],
    correctAnswer: 1,
    explanation: 'WACC is the weighted average of the cost of each capital component (debt and equity), with debt adjusted for tax benefits.',
    topic: 'Financial Management',
    subtopic: 'Cost of Capital'
  },
  
  {
    id: 'CIA3-308',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Return on Investment (ROI) measures:',
    options: [
      'Total revenue',
      'Gain from investment relative to cost',
      'Total assets',
      'Market share'
    ],
    correctAnswer: 1,
    explanation: 'ROI measures the efficiency of an investment by comparing the gain to the cost: (Gain - Cost) / Cost.',
    topic: 'Financial Management',
    subtopic: 'Performance Metrics'
  },
  {
    id: 'CIA3-309',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Transfer pricing affects:',
    options: [
      'External customer sales only',
      'Internal transactions between divisions and tax allocation',
      'Employee compensation',
      'Marketing strategies'
    ],
    correctAnswer: 1,
    explanation: 'Transfer pricing sets prices for transactions between related entities, affecting profit allocation, taxation, and performance measurement.',
    topic: 'Financial Management',
    subtopic: 'Transfer Pricing'
  },
  {
    id: 'CIA3-310',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Financial statement ratio analysis:',
    options: [
      'Creates financial statements',
      'Evaluates relationships between financial statement items',
      'Audits financial statements',
      'Projects future stock prices'
    ],
    correctAnswer: 1,
    explanation: 'Ratio analysis evaluates relationships between financial statement items to assess liquidity, profitability, and other aspects.',
    topic: 'Financial Management',
    subtopic: 'Financial Analysis'
  },
  
  // Additional questions to complete batch
  {
    id: 'CIA3-311',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'SWOT analysis examines:',
    options: [
      'Financial ratios only',
      'Strengths, Weaknesses, Opportunities, and Threats',
      'Market share data',
      'Employee engagement'
    ],
    correctAnswer: 1,
    explanation: 'SWOT analysis evaluates internal strengths and weaknesses and external opportunities and threats facing an organization.',
    topic: 'Business Acumen',
    subtopic: 'Strategic Analysis'
  },
  
  {
    id: 'CIA3-313',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Regulatory compliance programs should:',
    options: [
      'Focus on penalties only',
      'Identify requirements, implement controls, and monitor compliance',
      'Rely on external auditors',
      'Address regulations as violations occur'
    ],
    correctAnswer: 1,
    explanation: 'Compliance programs proactively identify applicable requirements, implement controls, monitor compliance, and address violations.',
    topic: 'Business Acumen',
    subtopic: 'Regulatory Compliance'
  },
  {
    id: 'CIA3-314',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Vendor risk management includes:',
    options: [
      'Selecting the lowest-cost vendor',
      'Assessing, monitoring, and managing risks associated with third parties',
      'Outsourcing all risk management',
      'Contract negotiation only'
    ],
    correctAnswer: 1,
    explanation: 'Vendor risk management involves due diligence, ongoing monitoring, and managing risks throughout the vendor relationship.',
    topic: 'Business Acumen',
    subtopic: 'Vendor Management'
  },
  {
    id: 'CIA3-315',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Ransomware protection strategies include:',
    options: [
      'Paying ransoms quickly',
      'Regular backups, employee training, and patch management',
      'Air-gapped networks only',
      'Cyber insurance exclusively'
    ],
    correctAnswer: 1,
    explanation: 'Ransomware protection requires multiple controls: regular tested backups, security awareness, patching, endpoint protection, and network segmentation.',
    topic: 'Information Security',
    subtopic: 'Ransomware Protection'
  },
  
  {
    id: 'CIA3-317',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Zero trust security architecture:',
    options: [
      'Trusts internal network traffic',
      'Verifies every user and device regardless of location',
      'Eliminates all access controls',
      'Applies only to cloud systems'
    ],
    correctAnswer: 1,
    explanation: 'Zero trust assumes no implicit trust, requiring verification of every user, device, and transaction regardless of network location.',
    topic: 'Information Security',
    subtopic: 'Zero Trust'
  },
  
  {
    id: 'CIA3-319',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Robotic Process Automation (RPA) risks include:',
    options: [
      'Increased manual processing',
      'Unauthorized changes, access control, and process errors',
      'Higher labor costs',
      'Reduced efficiency'
    ],
    correctAnswer: 1,
    explanation: 'RPA risks include unauthorized bot access, uncontrolled changes, process errors, and dependency on proper configuration.',
    topic: 'Information Technology',
    subtopic: 'RPA Risks'
  },
  {
    id: 'CIA3-320',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'API security controls should address:',
    options: [
      'User interface design',
      'Authentication, authorization, input validation, and rate limiting',
      'Database optimization',
      'Network bandwidth'
    ],
    correctAnswer: 1,
    explanation: 'API security requires authentication, authorization, input validation, encryption, rate limiting, and logging.',
    topic: 'Information Technology',
    subtopic: 'API Security'
  },
  {
    id: 'CIA3-321',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'DevOps security (DevSecOps) integrates:',
    options: [
      'Security testing after deployment',
      'Security throughout the development and deployment pipeline',
      'External audits only',
      'Annual security assessments'
    ],
    correctAnswer: 1,
    explanation: 'DevSecOps embeds security practices throughout the development pipeline rather than treating security as a final gate.',
    topic: 'Information Technology',
    subtopic: 'DevSecOps'
  },
  {
    id: 'CIA3-322',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Service Level Agreements (SLAs) should specify:',
    options: [
      'Vendor financial details',
      'Performance metrics, responsibilities, and remedies',
      'Internal organizational goals',
      'Competitor comparisons'
    ],
    correctAnswer: 1,
    explanation: 'SLAs define performance expectations, metrics, responsibilities, consequences for non-performance, and remedies.',
    topic: 'Information Technology',
    subtopic: 'Service Management'
  },
  
  {
    id: 'CIA3-324',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Activity-based costing (ABC):',
    options: [
      'Allocates costs based on volume only',
      'Assigns costs based on activities that drive resource consumption',
      'Ignores indirect costs',
      'Simplifies cost allocation'
    ],
    correctAnswer: 1,
    explanation: 'ABC allocates overhead costs based on activities that drive costs, providing more accurate product/service costing.',
    topic: 'Financial Management',
    subtopic: 'Cost Accounting'
  },
  {
    id: 'CIA3-325',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Cash flow forecasting helps:',
    options: [
      'Report past financial results',
      'Anticipate liquidity needs and plan financing',
      'Calculate profit margins',
      'Determine asset values'
    ],
    correctAnswer: 1,
    explanation: 'Cash flow forecasting projects cash inflows and outflows to anticipate liquidity positions and plan financing needs.',
    topic: 'Financial Management',
    subtopic: 'Cash Management'
  },
  
  {
    id: 'CIA3-327',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Hedging strategies:',
    options: [
      'Increase risk exposure',
      'Offset potential losses from price or rate fluctuations',
      'Guarantee profits',
      'Eliminate all financial risk'
    ],
    correctAnswer: 1,
    explanation: 'Hedging uses financial instruments to offset potential losses from adverse price, interest rate, or currency movements.',
    topic: 'Financial Management',
    subtopic: 'Risk Management'
  },
  {
    id: 'CIA3-328',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Enterprise risk management (ERM):',
    options: [
      'Focuses only on financial risks',
      'Provides a holistic view of risks across the organization',
      'Replaces internal controls',
      'Is required only for public companies'
    ],
    correctAnswer: 1,
    explanation: 'ERM integrates risk management across the enterprise, considering all risk types and their interrelationships.',
    topic: 'Business Acumen',
    subtopic: 'Enterprise Risk'
  },
  
  {
    id: 'CIA3-330',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'ESG (Environmental, Social, Governance) factors:',
    options: [
      'Are relevant only to nonprofits',
      'Influence investment decisions and organizational risk profiles',
      'Replace financial analysis',
      'Are optional for all organizations'
    ],
    correctAnswer: 1,
    explanation: 'ESG factors increasingly influence investor decisions, regulations, reputation, and overall organizational risk and value.',
    topic: 'Business Acumen',
    subtopic: 'ESG Factors'
  },
  {
    id: 'CIA3-331',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Internal rate of return (IRR):',
    options: [
      'Equals the cost of capital',
      'Is the discount rate where NPV equals zero',
      'Shows absolute dollar return',
      'Ignores cash flow timing'
    ],
    correctAnswer: 1,
    explanation: 'IRR is the discount rate at which the net present value of cash flows equals zero, representing the expected return rate.',
    topic: 'Financial Management',
    subtopic: 'Capital Budgeting'
  },
  {
    id: 'CIA3-332',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Cyber insurance coverage:',
    options: [
      'Replaces security controls',
      'Transfers financial risk from cyber incidents',
      'Guarantees no breaches will occur',
      'Covers only physical damage'
    ],
    correctAnswer: 1,
    explanation: 'Cyber insurance transfers financial risk from cyber incidents but does not replace the need for security controls.',
    topic: 'Information Security',
    subtopic: 'Cyber Insurance'
  },
  {
    id: 'CIA3-333',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Modern slavery and supply chain due diligence requires:',
    options: [
      'Cost reduction focus only',
      'Visibility into supplier practices and labor conditions',
      'Domestic supplier preference',
      'Periodic contract renewal'
    ],
    correctAnswer: 1,
    explanation: 'Organizations must understand and monitor supplier practices to identify and address forced labor and human trafficking risks.',
    topic: 'Business Acumen',
    subtopic: 'Supply Chain Ethics'
  },
  {
    id: 'CIA3-334',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'MFA fatigue attacks:',
    options: [
      'Strengthen security',
      'Overwhelm users with authentication requests until they approve',
      'Disable MFA automatically',
      'Are not a concern'
    ],
    correctAnswer: 1,
    explanation: 'MFA fatigue attacks bombard users with authentication requests, hoping they approve one to stop the notifications.',
    topic: 'Information Security',
    subtopic: 'Authentication Attacks'
  },
  {
    id: 'CIA3-335',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'IoT (Internet of Things) security challenges include:',
    options: [
      'Improved network security',
      'Limited device security capabilities and expanded attack surface',
      'Reduced complexity',
      'Standardized security protocols'
    ],
    correctAnswer: 1,
    explanation: 'IoT devices often have limited security capabilities, default credentials, and expand the organization\'s attack surface.',
    topic: 'Information Technology',
    subtopic: 'IoT Security'
  },
  {
    id: 'CIA3-336',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Economic value added (EVA) measures:',
    options: [
      'Total revenue growth',
      'Value created above the cost of capital employed',
      'Market share gains',
      'Customer satisfaction'
    ],
    correctAnswer: 1,
    explanation: 'EVA measures economic profit by deducting the cost of capital from operating profit, showing true value creation.',
    topic: 'Financial Management',
    subtopic: 'Performance Metrics'
  },
  {
    id: 'CIA3-337',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Sustainability reporting frameworks like GRI:',
    options: [
      'Replace financial reporting',
      'Provide standards for disclosing environmental and social impacts',
      'Are mandatory globally',
      'Focus only on carbon emissions'
    ],
    correctAnswer: 1,
    explanation: 'Frameworks like GRI provide standards for organizations to report on environmental, social, and governance impacts.',
    topic: 'Business Acumen',
    subtopic: 'Sustainability Reporting'
  },
  {
    id: 'CIA3-338',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Scenario analysis in risk management:',
    options: [
      'Predicts exact future outcomes',
      'Explores potential impacts of different future conditions',
      'Replaces other risk assessments',
      'Uses only historical data'
    ],
    correctAnswer: 1,
    explanation: 'Scenario analysis explores how different future conditions might affect the organization, supporting strategic planning.',
    topic: 'Business Acumen',
    subtopic: 'Risk Assessment'
  },
  {
    id: 'CIA3-339',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Container security (e.g., Docker, Kubernetes) requires:',
    options: [
      'Traditional perimeter security only',
      'Image scanning, runtime protection, and orchestration security',
      'Virtualization controls',
      'Physical server hardening'
    ],
    correctAnswer: 1,
    explanation: 'Container security requires image vulnerability scanning, runtime protection, secrets management, and secure orchestration.',
    topic: 'Information Technology',
    subtopic: 'Container Security'
  },
  {
    id: 'CIA3-340',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Third-party SOC reports help:',
    options: [
      'Replace vendor due diligence',
      'Evaluate service organization controls without direct testing',
      'Guarantee service provider security',
      'Eliminate audit requirements'
    ],
    correctAnswer: 1,
    explanation: 'SOC reports provide assurance about service organization controls, reducing need for each customer to audit the provider.',
    topic: 'Business Acumen',
    subtopic: 'Third-Party Assurance'
  },
];
