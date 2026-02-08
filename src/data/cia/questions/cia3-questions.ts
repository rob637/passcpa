
import { Question } from '../../../types';

export const CIA3_QUESTIONS: Question[] = [
  {
    id: 'CIA3-001',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'In the context of IT security, "phishing" is best described as:',
    options: [
      'Intercepting data packets during transmission',
      'Flooding a network with traffic to cause a denial of service',
      'Using social engineering to deceive users into revealing sensitive information',
      'Installing malware that encrypts files for ransom'
    ],
    correctAnswer: 2,
    explanation: 'Phishing is a form of social engineering where attackers masquerade as a trusted entity (usually via email) to trick victims into revealing sensitive data like passwords or credit card numbers.',
    topic: 'Information Security',
    subtopic: 'Cybersecurity'
  },
  {
    id: 'CIA3-002',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Which of the following financial ratios is most useful for assessing a company’s short-term liquidity?',
    options: [
      'Debt-to-Equity Ratio',
      'Return on Assets',
      'Current Ratio',
      'Gross Profit Margin'
    ],
    correctAnswer: 2,
    explanation: 'The Current Ratio (Current Assets / Current Liabilities) is a primary measure of short-term liquidity, indicating the company\'s ability to pay short-term obligations.',
    topic: 'Financial Management',
    subtopic: 'Financial Ratios'
  },
  {
    id: 'CIA3-003',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Under a centralized organizational structure, decision-making authority is primarily:',
    options: [
      'Delegated to lower-level managers',
      'Retained by top management',
      'Distributed geographically',
      'Based on product lines'
    ],
    correctAnswer: 1,
    explanation: 'In a centralized structure, decision-making authority is concentrated at the top levels of management, ensuring consistent policies and control.',
    topic: 'Business Acumen',
    subtopic: 'Organizational Structure'
  },

  // ============================================================================
  // DOMAIN I: BUSINESS ACUMEN (35%)
  // ============================================================================
  
  // Strategic Management
  {
    id: 'CIA3-004',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Which of the following best describes a SWOT analysis?',
    options: [
      'A financial ratio analysis tool',
      'A strategic planning framework examining internal and external factors',
      'A risk assessment methodology for IT systems',
      'A method for calculating net present value'
    ],
    correctAnswer: 1,
    explanation: 'SWOT analysis is a strategic planning framework that examines Strengths (internal), Weaknesses (internal), Opportunities (external), and Threats (external) to inform strategy development.',
    topic: 'Business Acumen',
    subtopic: 'Strategic Management'
  },
  {
    id: 'CIA3-005',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Porter\'s Five Forces model includes all of the following EXCEPT:',
    options: [
      'Threat of new entrants',
      'Bargaining power of employees',
      'Threat of substitute products',
      'Rivalry among existing competitors'
    ],
    correctAnswer: 1,
    explanation: 'Porter\'s Five Forces are: threat of new entrants, bargaining power of suppliers, bargaining power of buyers, threat of substitute products, and rivalry among existing competitors. Bargaining power of employees is not one of the five forces.',
    topic: 'Business Acumen',
    subtopic: 'Strategic Management'
  },
  {
    id: 'CIA3-006',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'A company pursuing a differentiation strategy would most likely focus on:',
    options: [
      'Achieving the lowest production costs in the industry',
      'Creating unique products or services that command premium prices',
      'Serving a narrow market segment with specialized offerings',
      'Acquiring competitors to gain market share'
    ],
    correctAnswer: 1,
    explanation: 'A differentiation strategy focuses on creating unique products or services that customers perceive as superior, allowing the company to charge premium prices rather than competing on cost.',
    topic: 'Business Acumen',
    subtopic: 'Strategic Management'
  },
  {
    id: 'CIA3-007',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'The balanced scorecard approach includes all of the following perspectives EXCEPT:',
    options: [
      'Financial perspective',
      'Customer perspective',
      'Regulatory compliance perspective',
      'Learning and growth perspective'
    ],
    correctAnswer: 2,
    explanation: 'The balanced scorecard includes four perspectives: Financial, Customer, Internal Business Process, and Learning and Growth. Regulatory compliance is not a standard BSC perspective.',
    topic: 'Business Acumen',
    subtopic: 'Performance Measurement'
  },
  {
    id: 'CIA3-008',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Which organizational structure groups employees by both function and product/project?',
    options: [
      'Functional structure',
      'Divisional structure',
      'Matrix structure',
      'Flat structure'
    ],
    correctAnswer: 2,
    explanation: 'A matrix structure combines functional and product/project groupings, where employees report to both a functional manager and a project/product manager.',
    topic: 'Business Acumen',
    subtopic: 'Organizational Structure'
  },
  {
    id: 'CIA3-009',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'The primary purpose of a mission statement is to:',
    options: [
      'Define specific measurable objectives',
      'Communicate the organization\'s fundamental purpose and values',
      'Outline the detailed strategic plan',
      'Establish financial performance targets'
    ],
    correctAnswer: 1,
    explanation: 'A mission statement communicates the organization\'s fundamental purpose, values, and reason for existence. It provides direction but is distinct from specific objectives or detailed plans.',
    topic: 'Business Acumen',
    subtopic: 'Strategic Management'
  },
  {
    id: 'CIA3-010',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'In change management, "unfreezing" refers to:',
    options: [
      'Implementing new processes and procedures',
      'Creating awareness that change is needed and reducing resistance',
      'Reinforcing new behaviors to make them permanent',
      'Documenting the change management process'
    ],
    correctAnswer: 1,
    explanation: 'In Lewin\'s change model, "unfreezing" is the first stage where awareness of the need for change is created and resistance to change is reduced, preparing the organization for transition.',
    topic: 'Business Acumen',
    subtopic: 'Change Management'
  },
  
  // Organizational Behavior
  {
    id: 'CIA3-011',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'According to Maslow\'s hierarchy of needs, which need must be satisfied before an employee can focus on self-actualization?',
    options: [
      'Physiological needs only',
      'Safety needs only',
      'All lower-level needs including esteem',
      'Social needs only'
    ],
    correctAnswer: 2,
    explanation: 'Maslow\'s hierarchy states that lower-level needs (physiological, safety, social/belonging, esteem) must be substantially satisfied before a person can focus on self-actualization, the highest level.',
    topic: 'Business Acumen',
    subtopic: 'Organizational Behavior'
  },
  {
    id: 'CIA3-012',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Which leadership style involves sharing decision-making authority with subordinates?',
    options: [
      'Autocratic leadership',
      'Participative leadership',
      'Laissez-faire leadership',
      'Transactional leadership'
    ],
    correctAnswer: 1,
    explanation: 'Participative (or democratic) leadership involves sharing decision-making authority with subordinates, encouraging their input and involvement in decisions that affect them.',
    topic: 'Business Acumen',
    subtopic: 'Leadership'
  },
  {
    id: 'CIA3-013',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Herzberg\'s two-factor theory distinguishes between:',
    options: [
      'Financial and non-financial rewards',
      'Hygiene factors and motivators',
      'Intrinsic and extrinsic motivation',
      'Individual and team motivation'
    ],
    correctAnswer: 1,
    explanation: 'Herzberg\'s two-factor theory distinguishes between hygiene factors (which prevent dissatisfaction but don\'t motivate) and motivators (which truly motivate and lead to job satisfaction).',
    topic: 'Business Acumen',
    subtopic: 'Organizational Behavior'
  },
  {
    id: 'CIA3-014',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Groupthink is best described as:',
    options: [
      'Collaborative problem-solving in teams',
      'A dysfunctional pattern where group harmony overrides critical thinking',
      'A structured approach to group decision-making',
      'The tendency for groups to make riskier decisions'
    ],
    correctAnswer: 1,
    explanation: 'Groupthink is a dysfunctional pattern where the desire for group harmony and conformity overrides realistic appraisal of alternatives and critical thinking, often leading to poor decisions.',
    topic: 'Business Acumen',
    subtopic: 'Organizational Behavior'
  },
  {
    id: 'CIA3-015',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'The concept of "span of control" refers to:',
    options: [
      'The geographic area a manager oversees',
      'The number of subordinates a manager directly supervises',
      'The range of decisions a manager can make',
      'The budget allocated to a department'
    ],
    correctAnswer: 1,
    explanation: 'Span of control refers to the number of subordinates who report directly to a manager. A wider span means more direct reports; a narrower span means fewer.',
    topic: 'Business Acumen',
    subtopic: 'Organizational Structure'
  },

  // Operations Management
  {
    id: 'CIA3-016',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Just-in-time (JIT) inventory management is designed to:',
    options: [
      'Maximize inventory levels for safety stock',
      'Minimize inventory carrying costs by receiving goods only as needed',
      'Increase purchase order quantities for volume discounts',
      'Maintain consistent inventory levels throughout the year'
    ],
    correctAnswer: 1,
    explanation: 'JIT inventory management minimizes inventory carrying costs by coordinating deliveries to arrive just when needed for production or sale, reducing storage costs and waste.',
    topic: 'Business Acumen',
    subtopic: 'Operations Management'
  },
  {
    id: 'CIA3-017',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Six Sigma methodology focuses primarily on:',
    options: [
      'Increasing market share through advertising',
      'Reducing process variation and defects',
      'Improving employee satisfaction',
      'Minimizing tax liability'
    ],
    correctAnswer: 1,
    explanation: 'Six Sigma is a data-driven methodology focused on reducing process variation and eliminating defects, aiming for no more than 3.4 defects per million opportunities.',
    topic: 'Business Acumen',
    subtopic: 'Quality Management'
  },
  {
    id: 'CIA3-018',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'The Economic Order Quantity (EOQ) model balances:',
    options: [
      'Revenue and expenses',
      'Ordering costs and carrying costs',
      'Assets and liabilities',
      'Fixed and variable costs'
    ],
    correctAnswer: 1,
    explanation: 'The EOQ model calculates the optimal order quantity that minimizes total inventory costs by balancing ordering costs (processing orders) with carrying costs (holding inventory).',
    topic: 'Business Acumen',
    subtopic: 'Operations Management'
  },
  {
    id: 'CIA3-019',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'A RACI matrix is used to:',
    options: [
      'Calculate return on investment',
      'Define roles and responsibilities for tasks or deliverables',
      'Assess risk likelihood and impact',
      'Measure customer satisfaction'
    ],
    correctAnswer: 1,
    explanation: 'A RACI matrix (Responsible, Accountable, Consulted, Informed) is a tool used to clarify roles and responsibilities for tasks, milestones, or deliverables in a project or process.',
    topic: 'Business Acumen',
    subtopic: 'Project Management'
  },
  {
    id: 'CIA3-020',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'The critical path in project management represents:',
    options: [
      'The shortest possible project duration',
      'The longest sequence of dependent tasks determining minimum project duration',
      'Tasks that can be delayed without affecting the project',
      'The most expensive series of activities'
    ],
    correctAnswer: 1,
    explanation: 'The critical path is the longest sequence of dependent activities that determines the minimum project duration. Any delay in critical path activities delays the entire project.',
    topic: 'Business Acumen',
    subtopic: 'Project Management'
  },

  // ============================================================================
  // DOMAIN II: INFORMATION SECURITY (25%)
  // ============================================================================
  
  {
    id: 'CIA3-021',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'The three primary objectives of information security are:',
    options: [
      'Prevention, detection, and correction',
      'Confidentiality, integrity, and availability',
      'Physical, technical, and administrative',
      'Encryption, authentication, and authorization'
    ],
    correctAnswer: 1,
    explanation: 'The CIA triad (Confidentiality, Integrity, and Availability) represents the three primary objectives of information security that organizations must protect.',
    topic: 'Information Security',
    subtopic: 'Security Fundamentals'
  },
  
  {
    id: 'CIA3-023',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Multi-factor authentication requires users to provide:',
    options: [
      'Multiple passwords',
      'Credentials from two or more different categories (something you know, have, or are)',
      'Authentication from multiple administrators',
      'Access codes from different departments'
    ],
    correctAnswer: 1,
    explanation: 'Multi-factor authentication requires verification using at least two different categories: something you know (password), something you have (token), or something you are (biometric).',
    topic: 'Information Security',
    subtopic: 'Access Control'
  },
  {
    id: 'CIA3-024',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Encryption is primarily used to protect:',
    options: [
      'Data availability',
      'Data confidentiality',
      'System performance',
      'Network bandwidth'
    ],
    correctAnswer: 1,
    explanation: 'Encryption protects data confidentiality by converting readable data into coded form that can only be decoded with the proper key, preventing unauthorized access to information.',
    topic: 'Information Security',
    subtopic: 'Cryptography'
  },
  {
    id: 'CIA3-025',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'A firewall is best described as:',
    options: [
      'Software that detects and removes viruses',
      'A network security device that monitors and controls traffic based on security rules',
      'A backup system for disaster recovery',
      'An encryption tool for sensitive data'
    ],
    correctAnswer: 1,
    explanation: 'A firewall is a network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules, acting as a barrier between trusted and untrusted networks.',
    topic: 'Information Security',
    subtopic: 'Network Security'
  },
  {
    id: 'CIA3-026',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Social engineering attacks primarily exploit:',
    options: [
      'Software vulnerabilities',
      'Human psychology and trust',
      'Network configuration weaknesses',
      'Encryption algorithms'
    ],
    correctAnswer: 1,
    explanation: 'Social engineering attacks exploit human psychology and trust to manipulate people into revealing confidential information or performing actions that compromise security.',
    topic: 'Information Security',
    subtopic: 'Cybersecurity Threats'
  },
  {
    id: 'CIA3-027',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'The principle of "least privilege" means:',
    options: [
      'Users should have minimum access necessary to perform their job functions',
      'Only senior management should have system access',
      'All users should have equal access rights',
      'Privileges should be granted on a temporary basis only'
    ],
    correctAnswer: 0,
    explanation: 'The principle of least privilege states that users should be granted only the minimum access rights and permissions necessary to perform their job functions, reducing the risk of unauthorized access or damage.',
    topic: 'Information Security',
    subtopic: 'Access Control'
  },
  {
    id: 'CIA3-028',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'A security incident response plan should be activated when:',
    options: [
      'Only when data has been confirmed stolen',
      'When a potential security breach or threat is detected',
      'Only during regular business hours',
      'After completing the annual security audit'
    ],
    correctAnswer: 1,
    explanation: 'A security incident response plan should be activated when any potential security breach or threat is detected, not just when damage is confirmed. Early response minimizes potential impact.',
    topic: 'Information Security',
    subtopic: 'Incident Response'
  },
  {
    id: 'CIA3-029',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Ransomware is a type of malware that:',
    options: [
      'Collects user data without consent',
      'Encrypts victim data and demands payment for the decryption key',
      'Hijacks computing resources to mine cryptocurrency',
      'Creates unauthorized backdoor access to systems'
    ],
    correctAnswer: 1,
    explanation: 'Ransomware encrypts victim\'s data and demands payment (ransom) in exchange for the decryption key needed to restore access to the encrypted files.',
    topic: 'Information Security',
    subtopic: 'Cybersecurity Threats'
  },
  {
    id: 'CIA3-030',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Penetration testing is used to:',
    options: [
      'Test backup and recovery procedures',
      'Simulate cyberattacks to identify security vulnerabilities',
      'Monitor network traffic for anomalies',
      'Train employees on security awareness'
    ],
    correctAnswer: 1,
    explanation: 'Penetration testing (pen testing) involves simulating cyberattacks against systems, networks, or applications to identify security vulnerabilities before malicious actors can exploit them.',
    topic: 'Information Security',
    subtopic: 'Security Testing'
  },

  // ============================================================================
  // DOMAIN III: INFORMATION TECHNOLOGY (20%)
  // ============================================================================
  
  {
    id: 'CIA3-031',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'IT governance is primarily concerned with:',
    options: [
      'Day-to-day IT operations',
      'Ensuring IT investments support organizational objectives and manage risks',
      'Writing computer programs',
      'Installing hardware and software'
    ],
    correctAnswer: 1,
    explanation: 'IT governance ensures that IT investments support and align with organizational objectives while appropriately managing risks and providing value to stakeholders.',
    topic: 'Information Technology',
    subtopic: 'IT Governance'
  },
  {
    id: 'CIA3-032',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'COBIT is a framework for:',
    options: [
      'Financial reporting',
      'IT governance and management',
      'Human resource management',
      'Physical security'
    ],
    correctAnswer: 1,
    explanation: 'COBIT (Control Objectives for Information and Related Technology) is a framework for IT governance and management that helps organizations align IT with business goals.',
    topic: 'Information Technology',
    subtopic: 'IT Governance'
  },
  {
    id: 'CIA3-033',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'In the systems development life cycle (SDLC), user acceptance testing occurs in which phase?',
    options: [
      'Requirements analysis',
      'Design',
      'Testing/Implementation',
      'Maintenance'
    ],
    correctAnswer: 2,
    explanation: 'User acceptance testing (UAT) occurs in the testing/implementation phase, where end users verify that the system meets their requirements before final deployment.',
    topic: 'Information Technology',
    subtopic: 'Systems Development'
  },
  {
    id: 'CIA3-034',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Cloud computing service model "Infrastructure as a Service" (IaaS) provides:',
    options: [
      'Complete software applications',
      'Development platforms and tools',
      'Virtualized computing resources like servers and storage',
      'Business process outsourcing'
    ],
    correctAnswer: 2,
    explanation: 'IaaS provides virtualized computing infrastructure (servers, storage, networking) over the internet, allowing organizations to rent resources instead of owning physical hardware.',
    topic: 'Information Technology',
    subtopic: 'Cloud Computing'
  },
  {
    id: 'CIA3-035',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'A data warehouse is primarily used for:',
    options: [
      'Processing daily transactions',
      'Storing and analyzing historical data for decision-making',
      'Hosting web applications',
      'Email and communication services'
    ],
    correctAnswer: 1,
    explanation: 'A data warehouse stores integrated historical data from multiple sources and is optimized for analysis, reporting, and supporting business decision-making, not for daily transactions.',
    topic: 'Information Technology',
    subtopic: 'Data Management'
  },
  {
    id: 'CIA3-036',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Change management in IT refers to:',
    options: [
      'Organizational restructuring',
      'Controlling and documenting modifications to IT systems',
      'Employee career development',
      'Project scope changes'
    ],
    correctAnswer: 1,
    explanation: 'IT change management is the process of controlling and documenting any modifications to IT systems (hardware, software, configurations) to minimize service disruptions and ensure proper authorization.',
    topic: 'Information Technology',
    subtopic: 'IT Operations'
  },
  {
    id: 'CIA3-037',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'An ERP (Enterprise Resource Planning) system:',
    options: [
      'Focuses only on financial accounting',
      'Integrates business processes across an organization in a single system',
      'Is used exclusively for customer relationship management',
      'Manages only human resources functions'
    ],
    correctAnswer: 1,
    explanation: 'ERP systems integrate core business processes (finance, HR, manufacturing, supply chain, etc.) across an organization into a single, unified system with a common database.',
    topic: 'Information Technology',
    subtopic: 'Business Systems'
  },
  {
    id: 'CIA3-038',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Backup and recovery controls are examples of:',
    options: [
      'Preventive controls',
      'Detective controls',
      'Corrective controls',
      'Directive controls'
    ],
    correctAnswer: 2,
    explanation: 'Backup and recovery controls are corrective controls because they restore systems and data to normal operation after an incident or failure has occurred.',
    topic: 'Information Technology',
    subtopic: 'IT Controls'
  },
  {
    id: 'CIA3-039',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'The Recovery Point Objective (RPO) represents:',
    options: [
      'The maximum time to restore systems after a failure',
      'The maximum acceptable amount of data loss measured in time',
      'The cost of implementing disaster recovery',
      'The number of recovery attempts allowed'
    ],
    correctAnswer: 1,
    explanation: 'RPO represents the maximum acceptable amount of data loss, measured as time from the last backup. If RPO is 4 hours, backups must occur at least every 4 hours to meet the objective.',
    topic: 'Information Technology',
    subtopic: 'Business Continuity'
  },
  {
    id: 'CIA3-040',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'An application programming interface (API) is used to:',
    options: [
      'Design user interfaces',
      'Enable communication and data exchange between software applications',
      'Encrypt data transmissions',
      'Manage database storage'
    ],
    correctAnswer: 1,
    explanation: 'An API defines protocols and tools that enable different software applications to communicate and exchange data with each other, facilitating integration between systems.',
    topic: 'Information Technology',
    subtopic: 'Systems Integration'
  },

  // ============================================================================
  // DOMAIN IV: FINANCIAL MANAGEMENT (20%)
  // ============================================================================
  
  {
    id: 'CIA3-041',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'The debt-to-equity ratio measures:',
    options: [
      'A company\'s profitability',
      'The proportion of debt financing relative to equity financing',
      'The company\'s cash position',
      'Revenue growth rate'
    ],
    correctAnswer: 1,
    explanation: 'The debt-to-equity ratio (Total Debt / Total Equity) measures the proportion of debt financing relative to equity financing, indicating financial leverage and risk.',
    topic: 'Financial Management',
    subtopic: 'Financial Ratios'
  },
  {
    id: 'CIA3-042',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Working capital is calculated as:',
    options: [
      'Total assets minus total liabilities',
      'Current assets minus current liabilities',
      'Net income plus depreciation',
      'Total equity minus retained earnings'
    ],
    correctAnswer: 1,
    explanation: 'Working capital equals current assets minus current liabilities, representing the liquid assets available for day-to-day operations after satisfying short-term obligations.',
    topic: 'Financial Management',
    subtopic: 'Financial Analysis'
  },
  {
    id: 'CIA3-043',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Net present value (NPV) is used to evaluate:',
    options: [
      'Short-term liquidity',
      'The value of future cash flows discounted to present terms',
      'Current inventory levels',
      'Annual operating budgets'
    ],
    correctAnswer: 1,
    explanation: 'NPV evaluates investments by calculating the present value of expected future cash flows minus the initial investment, using a discount rate to account for time value of money.',
    topic: 'Financial Management',
    subtopic: 'Capital Budgeting'
  },
  {
    id: 'CIA3-044',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'The internal rate of return (IRR) is:',
    options: [
      'The company\'s required rate of return',
      'The discount rate that makes NPV equal to zero',
      'The average return over an investment period',
      'The rate paid on borrowed funds'
    ],
    correctAnswer: 1,
    explanation: 'IRR is the discount rate that makes the net present value of all cash flows from an investment equal to zero. Projects with IRR above the hurdle rate are typically accepted.',
    topic: 'Financial Management',
    subtopic: 'Capital Budgeting'
  },
  {
    id: 'CIA3-045',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'The weighted average cost of capital (WACC) represents:',
    options: [
      'The cost of equity only',
      'The average cost of all sources of capital weighted by their proportion',
      'The historical cost of capital',
      'The cost of debt only'
    ],
    correctAnswer: 1,
    explanation: 'WACC is the average cost of a company\'s sources of capital (debt and equity), weighted by the proportion each contributes to the total capital structure.',
    topic: 'Financial Management',
    subtopic: 'Cost of Capital'
  },
  {
    id: 'CIA3-046',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Activity-based costing (ABC) allocates overhead costs based on:',
    options: [
      'Direct labor hours only',
      'Activities that drive costs',
      'Square footage',
      'Revenue generated'
    ],
    correctAnswer: 1,
    explanation: 'ABC allocates overhead costs based on the activities that drive costs, using multiple cost drivers to provide more accurate product costing than traditional volume-based methods.',
    topic: 'Financial Management',
    subtopic: 'Managerial Accounting'
  },
  {
    id: 'CIA3-047',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'A variance between actual and budgeted results that increases profit is called:',
    options: [
      'An unfavorable variance',
      'A favorable variance',
      'A standard variance',
      'A volume variance'
    ],
    correctAnswer: 1,
    explanation: 'A favorable variance occurs when actual results are better than budgeted, whether from higher revenues or lower costs, resulting in higher profit than planned.',
    topic: 'Financial Management',
    subtopic: 'Budgeting'
  },
  {
    id: 'CIA3-048',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'The contribution margin ratio is calculated as:',
    options: [
      'Net income divided by sales',
      'Contribution margin divided by sales',
      'Gross profit divided by cost of goods sold',
      'Operating income divided by total assets'
    ],
    correctAnswer: 1,
    explanation: 'The contribution margin ratio equals contribution margin (sales minus variable costs) divided by sales, showing the percentage of each sales dollar available to cover fixed costs and profit.',
    topic: 'Financial Management',
    subtopic: 'Cost-Volume-Profit'
  },
  {
    id: 'CIA3-049',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Transfer pricing is most relevant when:',
    options: [
      'A company sells to external customers only',
      'Goods or services are exchanged between divisions of the same organization',
      'A company has only one product line',
      'All transactions are with unrelated parties'
    ],
    correctAnswer: 1,
    explanation: 'Transfer pricing establishes prices for goods or services exchanged between divisions or subsidiaries of the same organization, affecting divisional profit and potentially taxes.',
    topic: 'Financial Management',
    subtopic: 'Managerial Accounting'
  },
  {
    id: 'CIA3-050',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Cash flow from operating activities includes:',
    options: [
      'Proceeds from issuing stock',
      'Cash received from customers and paid to suppliers',
      'Purchase of equipment',
      'Repayment of long-term debt'
    ],
    correctAnswer: 1,
    explanation: 'Operating cash flow includes cash from core business operations: receipts from customers, payments to suppliers and employees, interest, and taxes - not financing or investing activities.',
    topic: 'Financial Management',
    subtopic: 'Financial Statements'
  },

  // Additional Questions for Comprehensive Coverage
  {
    id: 'CIA3-051',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'In risk management, residual risk is:',
    options: [
      'The total risk before any controls are applied',
      'The risk that remains after controls have been implemented',
      'The risk of control failure',
      'Risk that has been transferred to another party'
    ],
    correctAnswer: 1,
    explanation: 'Residual risk is the risk that remains after management has implemented risk responses (controls). It should be within the organization\'s risk appetite.',
    topic: 'Business Acumen',
    subtopic: 'Risk Management'
  },
  {
    id: 'CIA3-052',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Benchmarking involves:',
    options: [
      'Setting arbitrary performance targets',
      'Comparing an organization\'s practices and performance to industry leaders',
      'Creating detailed process documentation',
      'Conducting employee performance evaluations'
    ],
    correctAnswer: 1,
    explanation: 'Benchmarking compares an organization\'s practices, processes, and performance metrics to industry best practices or leaders to identify improvement opportunities.',
    topic: 'Business Acumen',
    subtopic: 'Performance Measurement'
  },
  {
    id: 'CIA3-053',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'A business continuity plan (BCP) primarily addresses:',
    options: [
      'Daily operational procedures',
      'Maintaining essential business functions during and after a disruption',
      'Annual budget preparation',
      'Employee recruitment and retention'
    ],
    correctAnswer: 1,
    explanation: 'A BCP establishes processes and procedures to ensure that essential business functions can continue during and after a disaster or major disruption.',
    topic: 'Business Acumen',
    subtopic: 'Business Continuity'
  },
  {
    id: 'CIA3-054',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'The "tone at the top" refers to:',
    options: [
      'The physical office layout for executives',
      'Leadership\'s commitment to ethics and integrity that influences organizational culture',
      'Communication hierarchy in an organization',
      'Executive compensation packages'
    ],
    correctAnswer: 1,
    explanation: 'Tone at the top refers to the ethical climate established by an organization\'s leadership, which influences the culture, values, and behaviors throughout the organization.',
    topic: 'Business Acumen',
    subtopic: 'Corporate Governance'
  },
  {
    id: 'CIA3-055',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'A denial-of-service (DoS) attack aims to:',
    options: [
      'Steal sensitive data',
      'Make a system or network unavailable to intended users',
      'Install ransomware',
      'Gain unauthorized administrative access'
    ],
    correctAnswer: 1,
    explanation: 'A DoS attack attempts to make a system, server, or network unavailable by overwhelming it with traffic or exploiting vulnerabilities, disrupting normal operations.',
    topic: 'Information Security',
    subtopic: 'Cybersecurity Threats'
  },
  {
    id: 'CIA3-056',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Data classification is important because it:',
    options: [
      'Reduces storage costs',
      'Helps determine appropriate security controls based on data sensitivity',
      'Eliminates the need for encryption',
      'Simplifies database design'
    ],
    correctAnswer: 1,
    explanation: 'Data classification categorizes data by sensitivity level, helping organizations determine and apply appropriate security controls based on the potential impact of unauthorized disclosure.',
    topic: 'Information Security',
    subtopic: 'Data Security'
  },
  {
    id: 'CIA3-057',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Agile methodology in software development is characterized by:',
    options: [
      'Extensive upfront documentation',
      'Iterative development with frequent stakeholder feedback',
      'Sequential phases with formal handoffs',
      'Fixed scope and timeline'
    ],
    correctAnswer: 1,
    explanation: 'Agile methodology emphasizes iterative development, continuous stakeholder collaboration, frequent feedback, and flexibility to adapt to changing requirements.',
    topic: 'Information Technology',
    subtopic: 'Systems Development'
  },
  {
    id: 'CIA3-058',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Blockchain technology is characterized by:',
    options: [
      'Centralized data storage',
      'A decentralized, immutable ledger of transactions',
      'Traditional database architecture',
      'Single-point-of-control authentication'
    ],
    correctAnswer: 1,
    explanation: 'Blockchain is a decentralized, distributed ledger technology where transactions are recorded in blocks and linked cryptographically, creating an immutable record.',
    topic: 'Information Technology',
    subtopic: 'Emerging Technology'
  },
  {
    id: 'CIA3-059',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Return on equity (ROE) is calculated as:',
    options: [
      'Net income divided by total assets',
      'Net income divided by shareholders\' equity',
      'Operating income divided by sales',
      'Gross profit divided by total liabilities'
    ],
    correctAnswer: 1,
    explanation: 'ROE = Net Income / Shareholders\' Equity. It measures how effectively management uses equity capital to generate profits.',
    topic: 'Financial Management',
    subtopic: 'Financial Ratios'
  },
  {
    id: 'CIA3-060',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'The break-even point in units is calculated as:',
    options: [
      'Total costs divided by selling price',
      'Fixed costs divided by contribution margin per unit',
      'Variable costs divided by gross margin',
      'Net income divided by selling price'
    ],
    correctAnswer: 1,
    explanation: 'Break-even units = Fixed Costs / Contribution Margin per Unit. This is where total revenue equals total costs and profit is zero.',
    topic: 'Financial Management',
    subtopic: 'Cost-Volume-Profit'
  },
  {
    id: 'CIA3-061',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Accounts receivable turnover measures:',
    options: [
      'How quickly inventory is sold',
      'How efficiently a company collects credit sales',
      'The rate of fixed asset utilization',
      'The speed of paying suppliers'
    ],
    correctAnswer: 1,
    explanation: 'Accounts receivable turnover (Net Credit Sales / Average AR) measures how efficiently a company collects its receivables, indicating collection effectiveness.',
    topic: 'Financial Management',
    subtopic: 'Financial Ratios'
  },
  {
    id: 'CIA3-062',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Zero-based budgeting requires:',
    options: [
      'Using last year\'s budget as a starting point',
      'Justifying all expenses from zero for each new period',
      'Eliminating all discretionary spending',
      'Setting the budget at exactly zero variance'
    ],
    correctAnswer: 1,
    explanation: 'Zero-based budgeting requires every expense to be justified from a "zero base" each period, rather than simply adjusting the previous period\'s budget.',
    topic: 'Financial Management',
    subtopic: 'Budgeting'
  },
  {
    id: 'CIA3-063',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'A key performance indicator (KPI) should be:',
    options: [
      'Vague and broadly applicable',
      'Specific, measurable, and aligned with objectives',
      'Changed frequently',
      'Based solely on financial data'
    ],
    correctAnswer: 1,
    explanation: 'KPIs should be specific, measurable, achievable, relevant, and time-bound (SMART), and aligned with organizational objectives to effectively measure performance.',
    topic: 'Business Acumen',
    subtopic: 'Performance Measurement'
  },
  {
    id: 'CIA3-064',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Supply chain management (SCM) primarily focuses on:',
    options: [
      'Employee training and development',
      'Managing the flow of goods and services from raw materials to final delivery',
      'Financial statement preparation',
      'Marketing and advertising'
    ],
    correctAnswer: 1,
    explanation: 'SCM involves managing the flow of goods, services, and information from raw material procurement through production and delivery to the end customer.',
    topic: 'Business Acumen',
    subtopic: 'Operations Management'
  },
  {
    id: 'CIA3-065',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Segregation of duties is a control designed to:',
    options: [
      'Improve operational efficiency',
      'Prevent any single person from having complete control over a transaction',
      'Reduce staffing costs',
      'Speed up processing time'
    ],
    correctAnswer: 1,
    explanation: 'Segregation of duties divides critical functions among different people to prevent errors and fraud by ensuring no single individual has complete control over a transaction.',
    topic: 'Information Security',
    subtopic: 'Access Control'
  },
  {
    id: 'CIA3-066',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Business process reengineering (BPR) involves:',
    options: [
      'Making incremental improvements to existing processes',
      'Fundamentally rethinking and radically redesigning business processes',
      'Automating existing manual processes',
      'Documenting current processes without changing them'
    ],
    correctAnswer: 1,
    explanation: 'BPR involves fundamental rethinking and radical redesign of business processes to achieve dramatic improvements in cost, quality, service, and speed.',
    topic: 'Business Acumen',
    subtopic: 'Process Improvement'
  },
  {
    id: 'CIA3-067',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'The Capital Asset Pricing Model (CAPM) is used to:',
    options: [
      'Value inventory',
      'Calculate the expected return on an investment given its systematic risk',
      'Determine depreciation expense',
      'Measure liquidity'
    ],
    correctAnswer: 1,
    explanation: 'CAPM calculates the expected return on an investment based on the risk-free rate, market risk premium, and the investment\'s beta (systematic risk).',
    topic: 'Financial Management',
    subtopic: 'Cost of Capital'
  },
  {
    id: 'CIA3-068',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'A hot site for disaster recovery provides:',
    options: [
      'Empty facility space only',
      'Fully equipped and operational backup facility',
      'Off-site data storage only',
      'Temporary employee housing'
    ],
    correctAnswer: 1,
    explanation: 'A hot site is a fully equipped, operational backup facility with hardware, software, and data that can be activated immediately for disaster recovery.',
    topic: 'Information Technology',
    subtopic: 'Business Continuity'
  },
  {
    id: 'CIA3-069',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'The payback period measures:',
    options: [
      'Total return on investment',
      'Time required to recover the initial investment',
      'Net present value of cash flows',
      'Internal rate of return'
    ],
    correctAnswer: 1,
    explanation: 'Payback period measures the time required for an investment to generate enough cash flows to recover the initial investment cost. It ignores the time value of money.',
    topic: 'Financial Management',
    subtopic: 'Capital Budgeting'
  },
  {
    id: 'CIA3-070',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Robotic Process Automation (RPA) is best suited for:',
    options: [
      'Complex decision-making requiring judgment',
      'Repetitive, rule-based tasks across multiple systems',
      'Creative problem-solving',
      'Strategic planning activities'
    ],
    correctAnswer: 1,
    explanation: 'RPA automates repetitive, rule-based tasks that follow defined steps across multiple systems, freeing employees for higher-value activities. It works best with structured, predictable processes.',
    topic: 'Information Technology',
    subtopic: 'Emerging Technology'
  }
];
