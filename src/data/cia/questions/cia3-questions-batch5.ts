/**
 * CIA Part 3: Business Knowledge - Batch 5
 * Expanding Information Security & Business Acumen coverage
 * 
 * Focus Areas:
 * - Security Frameworks (NIST, ISO 27001) (8 questions)
 * - Privacy & Advanced Threats (7 questions)
 * - Strategic Management & M&A (10 questions)
 */

import { Question } from '../../../types';

export const CIA3_QUESTIONS_BATCH5: Question[] = [
  // ============================================================================
  // SECURITY FRAMEWORKS (8 questions) - CIA3-II
  // ============================================================================
  
  {
    id: 'cia3-b5-001',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    question: 'The NIST Cybersecurity Framework (CSF) organizes cybersecurity outcomes into five core functions. Which of the following correctly lists all five?',
    options: [
      'Identify, Protect, Detect, Respond, Recover',
      'Assess, Protect, Monitor, Report, Restore',
      'Identify, Prevent, Detect, Mitigate, Recover',
      'Plan, Protect, Detect, Respond, Recover',
    ],
    correctAnswer: 0,
    explanation: 'The NIST Cybersecurity Framework\'s five core functions are: Identify (understand context and risks), Protect (implement safeguards), Detect (identify security events), Respond (take action), and Recover (restore operations). Often remembered as "I-P-D-R-R."',
    topic: 'Information Security',
    subtopic: 'Security Frameworks',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b5-002',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    question: 'ISO 27001 is an international standard for information security management systems (ISMS). What is the PRIMARY purpose of ISO 27001 certification?',
    options: [
      'To provide a systematic approach to managing sensitive information through risk management',
      'To eliminate all identified cybersecurity risks',
      'To comply with all national data privacy regulations',
      'To guarantee that no security breaches will occur',
    ],
    correctAnswer: 0,
    explanation: 'ISO 27001 provides a systematic framework for establishing, implementing, maintaining, and continually improving an ISMS using a risk-based approach. Certification demonstrates the organization has a structured approach to managing information security risks, but does not guarantee zero breaches.',
    topic: 'Information Security',
    subtopic: 'Security Frameworks',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b5-003',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    question: 'Which NIST CSF function includes activities for understanding the organization\'s cybersecurity risk to systems, people, assets, and data?',
    options: [
      'Identify',
      'Detect',
      'Respond',
      'Protect',
    ],
    correctAnswer: 0,
    explanation: 'The "Identify" function develops an understanding of cybersecurity risk management to systems, people, assets, data, and capabilities. It includes asset management, business environment understanding, governance, risk assessment, and risk management strategy.',
    topic: 'Information Security',
    subtopic: 'Security Frameworks',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b5-004',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    question: 'An internal auditor is evaluating an organization\'s ISMS against ISO 27001. Which of the following would be the MOST significant finding?',
    options: [
      'The IT department has not updated all systems to the latest patch level',
      'The organization has not performed a comprehensive risk assessment to identify information security risks',
      'Some employees have not completed annual security awareness training',
      'The organization has not deployed the latest antivirus signatures',
    ],
    correctAnswer: 1,
    explanation: 'Risk assessment is foundational to ISO 27001. Without a comprehensive risk assessment, the organization cannot determine which controls are necessary or appropriate. This is a fundamental gap that undermines the entire ISMS, making it more significant than operational items like patches or training.',
    topic: 'Information Security',
    subtopic: 'Security Risk Assessment',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b5-005',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'easy',
    question: 'What is the relationship between NIST CSF and ISO 27001?',
    options: [
      'ISO 27001 is for private sector only; NIST CSF is for government only',
      'NIST CSF replaces ISO 27001 globally',
      'Both are complementary frameworks for managing cybersecurity; NIST CSF is more flexible while ISO 27001 is certifiable',
      'They are the same standard published by different organizations',
    ],
    correctAnswer: 2,
    explanation: 'NIST CSF and ISO 27001 are complementary. NIST CSF provides a flexible framework that can be customized to any organization. ISO 27001 provides a certifiable standard with specific requirements. Many organizations use elements of both.',
    topic: 'Information Security',
    subtopic: 'Security Frameworks',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b5-006',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    question: 'When auditing information security governance, which of the following is the MOST important element to verify?',
    options: [
      'All employees have strong passwords',
      'The IT budget includes security spending',
      'Executive-level ownership and accountability for information security exists',
      'The firewall configuration is up to date',
    ],
    correctAnswer: 2,
    explanation: 'Information security governance requires executive-level ownership and accountability. Without clear ownership and tone from the top, security programs lack authority and resources. This is more fundamental than any individual technical control.',
    topic: 'Information Security',
    subtopic: 'Security Governance',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b5-007',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    question: 'Which element of the NIST CSF "Protect" function addresses the need to manage access permissions and authorizations?',
    options: [
      'Data Security (PR.DS)',
      'Maintenance (PR.MA)',
      'Access Control (PR.AC)',
      'Awareness and Training (PR.AT)',
    ],
    correctAnswer: 2,
    explanation: 'Access Control (PR.AC) within the Protect function manages access to assets and associated facilities, including physical and logical access, remote access management, and the principle of least privilege. This is distinct from data security, training, or maintenance.',
    topic: 'Information Security',
    subtopic: 'Security Controls',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b5-008',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    question: 'An organization wants to implement a security framework but has limited resources. Which approach is MOST appropriate?',
    options: [
      'Purchase the most expensive security tools available',
      'Use the NIST CSF tiers to implement risk-based improvements incrementally',
      'Implement only technical controls and skip governance elements',
      'Delay security improvements until full resources are available',
    ],
    correctAnswer: 1,
    explanation: 'The NIST CSF includes four implementation tiers (Partial, Risk-Informed, Repeatable, Adaptive) that allow organizations to implement security improvements incrementally based on their risk appetite, budget, and maturity. This supports a pragmatic, scalable approach.',
    topic: 'Information Security',
    subtopic: 'Security Frameworks',
  reference: 'IIA Standards'
  },

  // ============================================================================
  // PRIVACY & ADVANCED THREATS (7 questions) - CIA3-II
  // ============================================================================
  
  {
    id: 'cia3-b5-009',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    question: 'The General Data Protection Regulation (GDPR) applies to organizations that:',
    options: [
      'Have more than 250 employees within the EU',
      'Process personal data of EU residents, regardless of where the organization is located',
      'Are publicly traded on European stock exchanges',
      'Are headquartered in the European Union only',
    ],
    correctAnswer: 1,
    explanation: 'GDPR has extraterritorial application—it applies to any organization that processes personal data of EU residents, regardless of where the organization is based. This global reach is a key feature that internal auditors must understand.',
    topic: 'Information Security',
    subtopic: 'Privacy Regulations',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b5-010',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    question: 'Under GDPR, which of the following is NOT a lawful basis for processing personal data?',
    options: [
      'Interest of a competitor in obtaining market intelligence',
      'Compliance with a legal obligation',
      'Legitimate interest of the data controller',
      'Consent of the data subject',
    ],
    correctAnswer: 0,
    explanation: 'GDPR recognizes six lawful bases: consent, contract performance, legal obligation, vital interest, public interest, and legitimate interest. A competitor\'s desire for market intelligence is not a lawful basis for processing another organization\'s personal data.',
    topic: 'Information Security',
    subtopic: 'Privacy Regulations',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b5-011',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    question: 'A "Zero Trust" security architecture is based on which fundamental principle?',
    options: [
      'Trust all authenticated users with full network access',
      'Never trust, always verify—regardless of location inside or outside the network perimeter',
      'Zero security spending is needed for internal networks',
      'Trust but verify all internal network traffic',
    ],
    correctAnswer: 1,
    explanation: 'Zero Trust operates on the principle of "never trust, always verify." It assumes no implicit trust based on network location and requires continuous verification of identity, device health, and context for every access request, whether inside or outside the traditional network perimeter.',
    topic: 'Information Security',
    subtopic: 'Security Architecture',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b5-012',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'easy',
    question: 'Which type of cyberattack involves deceiving individuals into revealing sensitive information through fake emails or websites?',
    options: [
      'SQL Injection',
      'Phishing',
      'Man-in-the-middle',
      'Denial of Service (DoS)',
    ],
    correctAnswer: 1,
    explanation: 'Phishing uses deceptive emails, messages, or websites to trick individuals into revealing passwords, financial information, or other sensitive data. It is one of the most common and effective attack vectors, relying on social engineering rather than technical exploitation.',
    topic: 'Information Security',
    subtopic: 'Threat Landscape',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b5-013',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    question: 'When auditing IoT (Internet of Things) security, which risk is MOST unique to IoT environments compared to traditional IT?',
    options: [
      'Large attack surface due to numerous connected devices with limited built-in security',
      'Database security misconfigurations',
      'Phishing attacks on email',
      'Weak password policies',
    ],
    correctAnswer: 0,
    explanation: 'IoT environments uniquely present a massive attack surface because numerous connected devices often have limited processing power (making security updates difficult), default credentials, and proprietary protocols. The sheer volume and diversity of devices create challenges distinct from traditional IT security.',
    topic: 'Information Security',
    subtopic: 'Emerging Technology Risks',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b5-014',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    question: 'A ransomware attack encrypts an organization\'s critical data. Which element of the NIST CSF addresses the organization\'s ability to restore operations?',
    options: [
      'Protect',
      'Recover',
      'Respond',
      'Identify',
    ],
    correctAnswer: 1,
    explanation: 'The "Recover" function addresses restoration of any capabilities or services impaired by a cybersecurity incident. This includes recovery planning, improvements based on lessons learned, and communications during recovery—all critical after a ransomware attack.',
    topic: 'Information Security',
    subtopic: 'Incident Response',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b5-015',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    question: 'An internal auditor reviewing security awareness should verify that the training program covers all of the following EXCEPT:',
    options: [
      'Physical security awareness (tailgating, clean desk)',
      'How to write secure application code',
      'Password management best practices',
      'Phishing recognition and reporting procedures',
    ],
    correctAnswer: 1,
    explanation: 'Security awareness training for all employees typically covers phishing recognition, password management, physical security, and data handling. Secure coding practices are specialized training for developers, not general security awareness content.',
    topic: 'Information Security',
    subtopic: 'Security Awareness',
  reference: 'IIA Standards'
  },

  // ============================================================================
  // STRATEGIC MANAGEMENT & BUSINESS ACUMEN (10 questions) - CIA3-I
  // ============================================================================
  
  {
    id: 'cia3-b5-016',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    question: 'Porter\'s Five Forces framework is used to analyze which aspect of an organization\'s environment?',
    options: [
      'Financial statement accuracy',
      'Employee satisfaction and retention',
      'Industry competitive dynamics and attractiveness',
      'Internal operational efficiency',
    ],
    correctAnswer: 2,
    explanation: 'Porter\'s Five Forces analyzes industry competitive dynamics: threat of new entrants, bargaining power of suppliers, bargaining power of buyers, threat of substitutes, and rivalry among existing competitors. This helps organizations understand their competitive environment.',
    topic: 'Business Acumen',
    subtopic: 'Strategic Management',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b5-017',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'easy',
    question: 'A SWOT analysis examines which four areas?',
    options: [
      'Strategy, Worth, Operations, Tactics',
      'Sales, Workers, Output, Timing',
      'Strengths, Weaknesses, Opportunities, Threats',
      'Systems, Workflows, Outcomes, Technology',
    ],
    correctAnswer: 2,
    explanation: 'SWOT stands for Strengths (internal), Weaknesses (internal), Opportunities (external), and Threats (external). It provides a structured way to assess an organization\'s strategic position by examining both internal capabilities and external factors.',
    topic: 'Business Acumen',
    subtopic: 'Strategic Management',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b5-018',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    question: 'During a due diligence review for a potential acquisition, the internal auditor should focus on all of the following EXCEPT:',
    options: [
      'Key contractual obligations and potential liabilities',
      'The acquiring company\'s marketing strategy for the combined entity',
      'Regulatory compliance history and pending litigation',
      'Quality of the target\'s financial statements and reportings',
    ],
    correctAnswer: 1,
    explanation: 'Due diligence focuses on evaluating the target company\'s risks, liabilities, financial condition, and compliance status. The acquiring company\'s marketing strategy for the combined entity is a forward-looking business decision, not a due diligence matter.',
    topic: 'Business Acumen',
    subtopic: 'M&A Due Diligence',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b5-019',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    question: 'Which organizational structure BEST supports rapid decision-making and flexibility in a dynamic business environment?',
    options: [
      'Matrix structure with multiple reporting lines',
      'Flat, decentralized organizational structure',
      'Highly bureaucratic functional structure',
      'Highly centralized hierarchical structure',
    ],
    correctAnswer: 1,
    explanation: 'Flat, decentralized structures delegate decision-making authority closer to where information and expertise reside, enabling faster responses to changing conditions. Centralized and bureaucratic structures tend to slow decision-making through multiple approval layers.',
    topic: 'Business Acumen',
    subtopic: 'Organizational Behavior',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b5-020',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    question: 'The Balanced Scorecard approach to strategic performance measurement includes four perspectives. Which of the following is NOT one of the four perspectives?',
    options: [
      'Competitor perspective',
      'Customer perspective',
      'Learning and growth perspective',
      'Financial perspective',
    ],
    correctAnswer: 0,
    explanation: 'The Balanced Scorecard includes four perspectives: Financial, Customer, Internal Business Process, and Learning and Growth. Competitor analysis is not one of the four BSC perspectives, though competitive position may be addressed within other perspectives.',
    topic: 'Business Acumen',
    subtopic: 'Management Frameworks',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b5-021',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    question: 'An internal auditor is reviewing the organization\'s change management process. Which of the following findings would be the MOST significant concern?',
    options: [
      'Changes are not tested in a staging environment before production deployment',
      'An emergency change process exists for critical incidents',
      'Change approval records are maintained for audit trail purposes',
      'Change requests are documented in a change log',
    ],
    correctAnswer: 0,
    explanation: 'Not testing changes before production deployment is the most significant concern as it increases the risk of system failures, data loss, or service disruptions. Testing in a staging environment is a critical control in any change management process.',
    topic: 'Business Acumen',
    subtopic: 'Business Processes',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b5-022',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    topic: 'Business Acumen',
    subtopic: 'Corporate Governance',
    difficulty: 'easy',
    question: 'Which of the following is a key indicator of strong corporate governance in an organization?',
    options: [
      'The CEO also serves as the chairman of the board of directors',
      'An independent board with a majority of outside directors and a separate audit committee',
      'All board members are current executives of the company',
      'The internal audit function reports directly to the CFO',
    ],
    correctAnswer: 1,
    explanation: 'Strong corporate governance is characterized by board independence, separation of the CEO and chairman roles, independent audit committees, and transparent reporting. An independent board with outside directors provides objective oversight of management on behalf of shareholders.',
    reference: 'IIA Standards',
  },
  {
    id: 'cia3-b5-023',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    question: 'When evaluating executive compensation, the internal auditor should PRIMARILY focus on:',
    options: [
      'Whether executives receive more than other employees',
      'Whether compensation structures align with organizational objectives and shareholder interests',
      'The total dollar amount of executive compensation',
      'Whether executive salaries exceed industry averages',
    ],
    correctAnswer: 1,
    explanation: 'The key governance question is whether compensation structures align incentives with organizational objectives and shareholder interests, not the absolute amount. Poorly structured incentives can encourage short-term thinking or excessive risk-taking.',
    topic: 'Business Acumen',
    subtopic: 'Corporate Governance',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b5-024',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    question: 'Kotter\'s 8-Step Change Model begins with which critical step?',
    options: [
      'Empowering broad-based action',
      'Creating a vision for change',
      'Establishing a sense of urgency',
      'Forming a powerful guiding coalition',
    ],
    correctAnswer: 2,
    explanation: 'Kotter\'s model begins with establishing a sense of urgency—helping others see the need for change. Without urgency, people won\'t make the effort required for change. The subsequent steps build on this foundation with coalition building, vision creation, and action.',
    topic: 'Business Acumen',
    subtopic: 'Organizational Behavior',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b5-025',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    question: 'A competitive advantage that is difficult for competitors to duplicate is known as a:',
    options: [
      'Cost advantage',
      'Temporary market position',
      'Sustainable competitive advantage',
      'First-mover advantage',
    ],
    correctAnswer: 2,
    explanation: 'A sustainable competitive advantage is one that competitors cannot easily imitate or substitute. Resources and capabilities that are valuable, rare, inimitable, and organized (VRIO framework) provide sustainable advantages that protect long-term profitability.',
    topic: 'Business Acumen',
    subtopic: 'Strategic Management',
  reference: 'IIA Standards'
  }
];
