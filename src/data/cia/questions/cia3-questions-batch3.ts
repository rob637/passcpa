/**
 * CIA Part 3: Business Knowledge - Additional Questions (Batch 2)
 * Questions CIA3-171 through CIA3-270
 * 
 * Domain breakdown:
 * - Domain I: Business Acumen (35%)
 * - Domain II: Information Security (25%)
 * - Domain III: Information Technology (20%)
 * - Domain IV: Financial Management (20%)
 */

import { Question } from '../../../types';

export const CIA3_QUESTIONS_BATCH3: Question[] = [
  // ============================================================================
  // DOMAIN I: BUSINESS ACUMEN (35%)
  // ============================================================================
  
  {
    id: 'CIA3-171',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'A differentiation strategy focuses on:',
    options: [
      'Being the lowest cost producer',
      'Offering unique products or services that customers value',
      'Serving only niche markets',
      'Copying competitor products'
    ],
    correctAnswer: 1,
    explanation: 'Differentiation strategy creates unique value through quality, features, service, innovation, or brand that justifies premium pricing.',
    topic: 'Business Acumen',
    subtopic: 'Competitive Strategy'
  },
  {
    id: 'CIA3-172',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Blue ocean strategy involves:',
    options: [
      'Competing aggressively in existing markets',
      'Creating uncontested market space by making competition irrelevant',
      'Following industry leaders closely',
      'Price matching with competitors'
    ],
    correctAnswer: 1,
    explanation: 'Blue ocean strategy creates new market space (blue oceans) rather than competing in crowded existing markets (red oceans).',
    topic: 'Business Acumen',
    subtopic: 'Strategic Management'
  },
  {
    id: 'CIA3-173',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'The product life cycle includes stages of:',
    options: [
      'Only growth and decline',
      'Introduction, growth, maturity, and decline',
      'Only launch and withdrawal',
      'Only production and sales'
    ],
    correctAnswer: 1,
    explanation: 'Products typically move through introduction (launch), growth (increasing sales), maturity (peak sales), and decline (decreasing sales) stages.',
    topic: 'Business Acumen',
    subtopic: 'Product Management'
  },
  {
    id: 'CIA3-174',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Mergers and acquisitions (M&A) risks include:',
    options: [
      'Only legal issues',
      'Integration challenges, culture clashes, and overvaluation',
      'Only technology incompatibility',
      'Only market timing'
    ],
    correctAnswer: 1,
    explanation: 'M&A risks include integration difficulties, cultural misalignment, overvaluation, hidden liabilities, and failure to achieve synergies.',
    topic: 'Business Acumen',
    subtopic: 'Corporate Strategy'
  },
  {
    id: 'CIA3-175',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Strategic alliances differ from acquisitions in that:',
    options: [
      'They always involve equity investments',
      'Partners maintain separate identities while collaborating',
      'One company always controls the other',
      'They are permanent arrangements'
    ],
    correctAnswer: 1,
    explanation: 'Strategic alliances involve collaborative arrangements where partners maintain independence while working together for mutual benefit.',
    topic: 'Business Acumen',
    subtopic: 'Corporate Strategy'
  },
  {
    id: 'CIA3-176',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Organizational design considers:',
    options: [
      'Only physical office layout',
      'Structure, processes, roles, and systems alignment with strategy',
      'Only reporting relationships',
      'Only compensation systems'
    ],
    correctAnswer: 1,
    explanation: 'Organizational design aligns structure, processes, people, rewards, and systems with strategic objectives.',
    topic: 'Business Acumen',
    subtopic: 'Organizational Structure'
  },
  {
    id: 'CIA3-177',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Matrix organizational structure features:',
    options: [
      'Only functional reporting',
      'Dual reporting relationships (e.g., functional and project)',
      'Only geographic structure',
      'Single chain of command'
    ],
    correctAnswer: 1,
    explanation: 'Matrix structure creates dual reporting lines, typically combining functional expertise with project or product focus.',
    topic: 'Business Acumen',
    subtopic: 'Organizational Structure'
  },
  {
    id: 'CIA3-178',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Talent management includes:',
    options: [
      'Only recruitment',
      'Attracting, developing, retaining, and transitioning employees',
      'Only compensation administration',
      'Only performance reviews'
    ],
    correctAnswer: 1,
    explanation: 'Talent management encompasses the full employee lifecycle: recruiting, developing, engaging, promoting, and managing transitions.',
    topic: 'Business Acumen',
    subtopic: 'Human Resources'
  },
  {
    id: 'CIA3-179',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Succession planning ensures:',
    options: [
      'Only CEO replacement',
      'Continuity of leadership by identifying and developing future leaders',
      'Only retirement planning',
      'Only emergency coverage'
    ],
    correctAnswer: 1,
    explanation: 'Succession planning identifies and develops internal talent to fill key positions, ensuring leadership continuity.',
    topic: 'Business Acumen',
    subtopic: 'Human Resources'
  },
  {
    id: 'CIA3-180',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Disruptive innovation typically:',
    options: [
      'Improves existing products marginally',
      'Starts in underserved segments and eventually displaces incumbents',
      'Comes only from large companies',
      'Requires the highest technology'
    ],
    correctAnswer: 1,
    explanation: 'Disruptive innovations often start as simpler, cheaper alternatives serving overlooked segments before eventually disrupting mainstream markets.',
    topic: 'Business Acumen',
    subtopic: 'Innovation'
  },
  {
    id: 'CIA3-181',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Intellectual property protection includes:',
    options: [
      'Only patents',
      'Patents, trademarks, copyrights, and trade secrets',
      'Only physical security',
      'Only employee confidentiality'
    ],
    correctAnswer: 1,
    explanation: 'IP protection encompasses various legal mechanisms: patents (inventions), trademarks (brands), copyrights (creative works), and trade secrets.',
    topic: 'Business Acumen',
    subtopic: 'Intellectual Property'
  },
  {
    id: 'CIA3-182',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Customer relationship management (CRM) systems:',
    options: [
      'Only store contact information',
      'Manage customer interactions and data to enhance relationships',
      'Only process payments',
      'Only handle complaints'
    ],
    correctAnswer: 1,
    explanation: 'CRM systems consolidate customer data and interactions to support sales, service, and marketing relationship management.',
    topic: 'Business Acumen',
    subtopic: 'Customer Management'
  },
  {
    id: 'CIA3-183',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Quality management systems like ISO 9001 focus on:',
    options: [
      'Only manufacturing quality',
      'Consistent processes meeting customer and regulatory requirements',
      'Only final product inspection',
      'Only documentation'
    ],
    correctAnswer: 1,
    explanation: 'ISO 9001 provides a framework for quality management systems that consistently meet customer needs through process control and continuous improvement.',
    topic: 'Business Acumen',
    subtopic: 'Quality Management'
  },
  {
    id: 'CIA3-184',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Risk culture reflects:',
    options: [
      'Only written policies',
      'Shared values, beliefs, and attitudes toward risk across the organization',
      'Only risk committee structure',
      'Only external requirements'
    ],
    correctAnswer: 1,
    explanation: 'Risk culture comprises the shared values, beliefs, and attitudes that influence how people identify, discuss, and respond to risk.',
    topic: 'Business Acumen',
    subtopic: 'Enterprise Risk Management'
  },
  {
    id: 'CIA3-185',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Crisis management differs from business continuity in that it:',
    options: [
      'Is the same thing',
      'Focuses on managing the crisis event itself and stakeholder communication',
      'Only addresses IT recovery',
      'Only plans for natural disasters'
    ],
    correctAnswer: 1,
    explanation: 'Crisis management addresses real-time response to events including decision-making, communication, and reputation management during the crisis.',
    topic: 'Business Acumen',
    subtopic: 'Crisis Management'
  },

  // ============================================================================
  // DOMAIN II: INFORMATION SECURITY (25%)
  // ============================================================================
  
  {
    id: 'CIA3-186',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'SQL injection attacks exploit:',
    options: [
      'Hardware vulnerabilities',
      'Improper input validation allowing malicious database queries',
      'Network encryption weaknesses',
      'Physical access controls'
    ],
    correctAnswer: 1,
    explanation: 'SQL injection inserts malicious SQL code through improperly validated input fields, potentially accessing or modifying database data.',
    topic: 'Information Security',
    subtopic: 'Application Security'
  },
  {
    id: 'CIA3-187',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Cross-site scripting (XSS) attacks:',
    options: [
      'Target only servers',
      'Inject malicious scripts into web pages viewed by other users',
      'Only affect local computers',
      'Only target databases'
    ],
    correctAnswer: 1,
    explanation: 'XSS injects malicious scripts into trusted websites, which then execute in victims\' browsers, potentially stealing credentials or session data.',
    topic: 'Information Security',
    subtopic: 'Application Security'
  },
  {
    id: 'CIA3-188',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Security Information and Event Management (SIEM) provides:',
    options: [
      'Only antivirus protection',
      'Centralized security event collection, correlation, and analysis',
      'Only backup services',
      'Only access control'
    ],
    correctAnswer: 1,
    explanation: 'SIEM aggregates security log data from multiple sources, correlates events to detect threats, and supports incident response and compliance.',
    topic: 'Information Security',
    subtopic: 'Security Operations'
  },
  {
    id: 'CIA3-189',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Endpoint security protects:',
    options: [
      'Only servers',
      'User devices like laptops, desktops, and mobile devices',
      'Only network equipment',
      'Only cloud systems'
    ],
    correctAnswer: 1,
    explanation: 'Endpoint security protects end-user devices from threats through antivirus, encryption, patch management, and device control.',
    topic: 'Information Security',
    subtopic: 'Endpoint Protection'
  },
  {
    id: 'CIA3-190',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Security baselines establish:',
    options: [
      'Maximum security requirements',
      'Minimum acceptable security configurations',
      'Optional security guidelines',
      'Performance benchmarks'
    ],
    correctAnswer: 1,
    explanation: 'Security baselines define minimum security configuration standards for systems, ensuring consistent basic protection levels.',
    topic: 'Information Security',
    subtopic: 'Security Configuration'
  },
  {
    id: 'CIA3-191',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Privileged access management (PAM) controls:',
    options: [
      'All user passwords',
      'Administrative and elevated access to critical systems',
      'Only guest access',
      'Only physical access'
    ],
    correctAnswer: 1,
    explanation: 'PAM secures, monitors, and audits privileged accounts and access, reducing risks from powerful administrative capabilities.',
    topic: 'Information Security',
    subtopic: 'Access Control'
  },
  {
    id: 'CIA3-192',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Threat intelligence provides:',
    options: [
      'Only historical attack data',
      'Contextual information about current and emerging threats',
      'Only vendor security ratings',
      'Only compliance requirements'
    ],
    correctAnswer: 1,
    explanation: 'Threat intelligence provides actionable information about threats, threat actors, and vulnerabilities to inform security decisions.',
    topic: 'Information Security',
    subtopic: 'Threat Management'
  },
  {
    id: 'CIA3-193',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Secure coding practices include:',
    options: [
      'Only fast development',
      'Input validation, output encoding, and error handling',
      'Only documentation',
      'Only code formatting'
    ],
    correctAnswer: 1,
    explanation: 'Secure coding practices prevent common vulnerabilities through input validation, output encoding, proper error handling, and authentication/authorization.',
    topic: 'Information Security',
    subtopic: 'Application Security'
  },
  {
    id: 'CIA3-194',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Business email compromise (BEC) attacks typically:',
    options: [
      'Only spread malware',
      'Impersonate executives to trick employees into fraudulent transfers',
      'Only steal passwords',
      'Only encrypt files'
    ],
    correctAnswer: 1,
    explanation: 'BEC attacks impersonate trusted individuals (often executives) to deceive employees into unauthorized wire transfers or data disclosure.',
    topic: 'Information Security',
    subtopic: 'Email Security'
  },
  {
    id: 'CIA3-195',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Supply chain attacks target:',
    options: [
      'Only physical shipments',
      'Third-party software, services, or hardware to compromise downstream users',
      'Only internal systems',
      'Only customer data'
    ],
    correctAnswer: 1,
    explanation: 'Supply chain attacks compromise third-party products or services (software, updates, hardware) to infiltrate organizations using them.',
    topic: 'Information Security',
    subtopic: 'Third-Party Risk'
  },
  {
    id: 'CIA3-196',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Cyber insurance:',
    options: [
      'Eliminates all cyber risk',
      'Transfers financial risk from cyber incidents to insurers',
      'Replaces security controls',
      'Prevents all breaches'
    ],
    correctAnswer: 1,
    explanation: 'Cyber insurance transfers financial risk from covered cyber incidents to insurers but doesn\'t replace security controls or eliminate all risk.',
    topic: 'Information Security',
    subtopic: 'Risk Transfer'
  },
  {
    id: 'CIA3-197',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Mobile device management (MDM) enables:',
    options: [
      'Only tracking device location',
      'Centralized management and security of mobile devices',
      'Only email access',
      'Only app downloads'
    ],
    correctAnswer: 1,
    explanation: 'MDM provides centralized management of mobile devices including configuration, security policies, app management, and remote wipe capabilities.',
    topic: 'Information Security',
    subtopic: 'Mobile Security'
  },
  {
    id: 'CIA3-198',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Identity and access management (IAM) encompasses:',
    options: [
      'Only password management',
      'The processes and technologies for managing digital identities and access rights',
      'Only badge access',
      'Only user registration'
    ],
    correctAnswer: 1,
    explanation: 'IAM includes identity lifecycle management, authentication, authorization, and access governance across the organization.',
    topic: 'Information Security',
    subtopic: 'Identity Management'
  },
  {
    id: 'CIA3-199',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Security orchestration, automation, and response (SOAR) platforms:',
    options: [
      'Only generate alerts',
      'Automate security operations and coordinate incident response',
      'Only store logs',
      'Only scan for vulnerabilities'
    ],
    correctAnswer: 1,
    explanation: 'SOAR platforms automate routine security tasks, orchestrate tool integration, and accelerate incident response through playbooks.',
    topic: 'Information Security',
    subtopic: 'Security Operations'
  },
  {
    id: 'CIA3-200',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Red team exercises:',
    options: [
      'Are the same as vulnerability scans',
      'Simulate realistic attacks to test organizational defenses',
      'Only test physical security',
      'Only review documentation'
    ],
    correctAnswer: 1,
    explanation: 'Red team exercises simulate real-world adversary techniques to test detection and response capabilities in realistic attack scenarios.',
    topic: 'Information Security',
    subtopic: 'Security Testing'
  },

  // ============================================================================
  // DOMAIN III: INFORMATION TECHNOLOGY (20%)
  // ============================================================================
  
  {
    id: 'CIA3-201',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'IT asset management tracks:',
    options: [
      'Only physical equipment',
      'Hardware, software, and related assets throughout their lifecycle',
      'Only software licenses',
      'Only warranties'
    ],
    correctAnswer: 1,
    explanation: 'IT asset management maintains inventory and status of hardware, software, and related assets from acquisition through disposal.',
    topic: 'Information Technology',
    subtopic: 'IT Operations'
  },
  {
    id: 'CIA3-202',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Containerization technology:',
    options: [
      'Only applies to physical shipping',
      'Packages applications with dependencies for consistent deployment across environments',
      'Only stores data',
      'Only encrypts files'
    ],
    correctAnswer: 1,
    explanation: 'Containers package applications with their dependencies, enabling consistent operation across different computing environments.',
    topic: 'Information Technology',
    subtopic: 'Infrastructure'
  },
  {
    id: 'CIA3-203',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Microservices architecture:',
    options: [
      'Uses single monolithic applications',
      'Decomposes applications into small, independently deployable services',
      'Only applies to small systems',
      'Increases coupling between components'
    ],
    correctAnswer: 1,
    explanation: 'Microservices decompose applications into loosely coupled services that can be developed, deployed, and scaled independently.',
    topic: 'Information Technology',
    subtopic: 'Application Architecture'
  },
  {
    id: 'CIA3-204',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Software as a Service (SaaS) provides:',
    options: [
      'Only infrastructure',
      'Complete applications accessible via internet',
      'Only development platforms',
      'Only hardware'
    ],
    correctAnswer: 1,
    explanation: 'SaaS delivers complete software applications over the internet, with the provider managing all underlying infrastructure and platforms.',
    topic: 'Information Technology',
    subtopic: 'Cloud Computing'
  },
  {
    id: 'CIA3-205',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Data quality dimensions include:',
    options: [
      'Only accuracy',
      'Accuracy, completeness, consistency, timeliness, and validity',
      'Only storage efficiency',
      'Only access speed'
    ],
    correctAnswer: 1,
    explanation: 'Data quality is multidimensional: accuracy, completeness, consistency, timeliness, validity, and uniqueness are key quality dimensions.',
    topic: 'Information Technology',
    subtopic: 'Data Management'
  },
  {
    id: 'CIA3-206',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Data governance establishes:',
    options: [
      'Only data backup procedures',
      'Policies, roles, and processes for managing data as an asset',
      'Only database design',
      'Only access controls'
    ],
    correctAnswer: 1,
    explanation: 'Data governance provides the framework of policies, roles, responsibilities, and processes for managing data as a strategic asset.',
    topic: 'Information Technology',
    subtopic: 'Data Management'
  },
  {
    id: 'CIA3-207',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'IT service level agreements (SLAs) define:',
    options: [
      'Only pricing',
      'Service expectations, performance metrics, and responsibilities',
      'Only hardware specifications',
      'Only software versions'
    ],
    correctAnswer: 1,
    explanation: 'SLAs document agreed service levels, performance metrics, responsibilities, and remedies for failures between providers and customers.',
    topic: 'Information Technology',
    subtopic: 'IT Service Management'
  },
  {
    id: 'CIA3-208',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'System integration testing verifies:',
    options: [
      'Only individual component function',
      'That integrated components work together correctly',
      'Only user interfaces',
      'Only performance levels'
    ],
    correctAnswer: 1,
    explanation: 'Integration testing verifies that different system components, modules, or services work correctly when combined.',
    topic: 'Information Technology',
    subtopic: 'Testing'
  },
  {
    id: 'CIA3-209',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'User acceptance testing (UAT):',
    options: [
      'Is performed by developers only',
      'Validates that the system meets business requirements from end-user perspective',
      'Tests only technical performance',
      'Occurs before integration testing'
    ],
    correctAnswer: 1,
    explanation: 'UAT is performed by business users to validate that the system meets requirements and is ready for production use.',
    topic: 'Information Technology',
    subtopic: 'Testing'
  },
  {
    id: 'CIA3-210',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Continuous integration/continuous deployment (CI/CD):',
    options: [
      'Eliminates all testing',
      'Automates building, testing, and deploying code changes',
      'Only applies to documentation',
      'Replaces all manual review'
    ],
    correctAnswer: 1,
    explanation: 'CI/CD automates code integration, testing, and deployment, enabling faster, more reliable software delivery.',
    topic: 'Information Technology',
    subtopic: 'DevOps'
  },
  {
    id: 'CIA3-211',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Technical debt refers to:',
    options: [
      'IT budget deficits',
      'Shortcuts in development that create future maintenance burden',
      'Hardware financing',
      'Software licensing costs'
    ],
    correctAnswer: 1,
    explanation: 'Technical debt accumulates when expedient solutions create future work, like poor code quality requiring eventual refactoring.',
    topic: 'Information Technology',
    subtopic: 'Development'
  },
  {
    id: 'CIA3-212',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'IT project post-implementation reviews assess:',
    options: [
      'Only project costs',
      'Whether objectives were achieved and lessons learned',
      'Only technical performance',
      'Only vendor satisfaction'
    ],
    correctAnswer: 1,
    explanation: 'Post-implementation reviews evaluate project success versus objectives, benefit realization, and lessons for future projects.',
    topic: 'Information Technology',
    subtopic: 'Project Management'
  },
  {
    id: 'CIA3-213',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Network protocols like TCP/IP:',
    options: [
      'Only apply to internal networks',
      'Define rules for data communication across networks',
      'Only apply to wireless',
      'Only handle email'
    ],
    correctAnswer: 1,
    explanation: 'TCP/IP and other protocols define how data is formatted, transmitted, routed, and received across networks.',
    topic: 'Information Technology',
    subtopic: 'Networking'
  },
  {
    id: 'CIA3-214',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Software-defined networking (SDN) separates:',
    options: [
      'Hardware from software completely',
      'The network control plane from the data forwarding plane',
      'Users from administrators',
      'Internal from external networks'
    ],
    correctAnswer: 1,
    explanation: 'SDN separates the control plane (network logic) from the data plane (packet forwarding), enabling centralized, programmable network management.',
    topic: 'Information Technology',
    subtopic: 'Networking'
  },
  {
    id: 'CIA3-215',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Internet of Things (IoT) risks include:',
    options: [
      'Only power consumption',
      'Expanded attack surface, weak security, and data privacy concerns',
      'Only device cost',
      'Only connectivity issues'
    ],
    correctAnswer: 1,
    explanation: 'IoT expands the attack surface with devices that often have weak security, challenging patch management, and privacy concerns.',
    topic: 'Information Technology',
    subtopic: 'Emerging Technology'
  },

  // ============================================================================
  // DOMAIN IV: FINANCIAL MANAGEMENT (20%)
  // ============================================================================
  
  {
    id: 'CIA3-216',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'The income statement shows:',
    options: [
      'Financial position at a point in time',
      'Revenue, expenses, and profit/loss over a period',
      'Only cash transactions',
      'Only balance sheet items'
    ],
    correctAnswer: 1,
    explanation: 'The income statement reports revenues earned and expenses incurred over a period, resulting in net income or loss.',
    topic: 'Financial Management',
    subtopic: 'Financial Statements'
  },
  {
    id: 'CIA3-217',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'The DuPont analysis decomposes ROE into:',
    options: [
      'Only profit margin',
      'Profit margin, asset turnover, and financial leverage',
      'Only asset turnover',
      'Only leverage'
    ],
    correctAnswer: 1,
    explanation: 'DuPont analysis breaks down ROE into three drivers: profit margin (profitability), asset turnover (efficiency), and financial leverage.',
    topic: 'Financial Management',
    subtopic: 'Financial Analysis'
  },
  {
    id: 'CIA3-218',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'The cash conversion cycle measures:',
    options: [
      'Only inventory days',
      'Time between paying for inventory and receiving cash from sales',
      'Only receivables collection',
      'Only payables period'
    ],
    correctAnswer: 1,
    explanation: 'Cash conversion cycle = Days Inventory + Days Receivables - Days Payables; measures how quickly cash invested returns as cash.',
    topic: 'Financial Management',
    subtopic: 'Working Capital'
  },
  {
    id: 'CIA3-219',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Depreciation represents:',
    options: [
      'Cash paid for assets',
      'Allocation of asset cost over its useful life',
      'Asset market value decrease',
      'Maintenance expense'
    ],
    correctAnswer: 1,
    explanation: 'Depreciation systematically allocates the cost of tangible assets over their useful lives, matching expense with benefit periods.',
    topic: 'Financial Management',
    subtopic: 'Accounting'
  },
  {
    id: 'CIA3-220',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Capital structure decisions involve:',
    options: [
      'Only equity financing',
      'The mix of debt and equity used to finance the organization',
      'Only short-term financing',
      'Only internal funding'
    ],
    correctAnswer: 1,
    explanation: 'Capital structure determines the proportion of debt versus equity financing, balancing cost of capital with financial risk.',
    topic: 'Financial Management',
    subtopic: 'Corporate Finance'
  },
  {
    id: 'CIA3-221',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Interest rate risk affects:',
    options: [
      'Only short-term investments',
      'The value of fixed-income investments and borrowing costs',
      'Only equity securities',
      'Only foreign investments'
    ],
    correctAnswer: 1,
    explanation: 'Interest rate risk impacts bond prices (inversely), variable rate borrowing costs, and investment returns.',
    topic: 'Financial Management',
    subtopic: 'Financial Risk'
  },
  {
    id: 'CIA3-222',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Credit risk refers to:',
    options: [
      'Currency fluctuation risk',
      'The risk that a counterparty will fail to meet payment obligations',
      'Only market price risk',
      'Only liquidity risk'
    ],
    correctAnswer: 1,
    explanation: 'Credit risk is the potential that borrowers or counterparties will not fulfill their financial obligations.',
    topic: 'Financial Management',
    subtopic: 'Financial Risk'
  },
  {
    id: 'CIA3-223',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Standard costing establishes:',
    options: [
      'Only actual costs',
      'Predetermined costs for measuring performance',
      'Only market prices',
      'Only historical costs'
    ],
    correctAnswer: 1,
    explanation: 'Standard costing sets predetermined costs (material, labor, overhead) as benchmarks for measuring actual performance and analyzing variances.',
    topic: 'Financial Management',
    subtopic: 'Cost Accounting'
  },
  {
    id: 'CIA3-224',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Overhead allocation methods affect:',
    options: [
      'Only direct costs',
      'Product costs and profitability measurement',
      'Only material costs',
      'Only labor costs'
    ],
    correctAnswer: 1,
    explanation: 'Overhead allocation methods determine how indirect costs are assigned to products, affecting product costs and profitability analysis.',
    topic: 'Financial Management',
    subtopic: 'Cost Accounting'
  },
  {
    id: 'CIA3-225',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Sensitivity analysis in financial modeling:',
    options: [
      'Uses only single scenarios',
      'Tests how changes in assumptions affect outcomes',
      'Ignores uncertainties',
      'Only applies to interest rates'
    ],
    correctAnswer: 1,
    explanation: 'Sensitivity analysis tests how changes in key assumptions (revenue growth, costs, rates) impact financial projections and decisions.',
    topic: 'Financial Management',
    subtopic: 'Financial Modeling'
  },
  
  {
    id: 'CIA3-227',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Rolling forecasts:',
    options: [
      'Are created only annually',
      'Continuously update projections by adding new periods as time passes',
      'Never change',
      'Only project one quarter'
    ],
    correctAnswer: 1,
    explanation: 'Rolling forecasts continuously extend the forecast horizon, typically adding a new period as each period ends, maintaining a constant planning horizon.',
    topic: 'Financial Management',
    subtopic: 'Planning'
  },
  {
    id: 'CIA3-228',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Profitability index (PI) is useful for:',
    options: [
      'Only rejecting projects',
      'Ranking projects when capital is limited',
      'Only calculating payback',
      'Only assessing risk'
    ],
    correctAnswer: 1,
    explanation: 'Profitability index (NPV/Initial Investment) helps rank projects by value created per investment dollar when capital is constrained.',
    topic: 'Financial Management',
    subtopic: 'Capital Budgeting'
  },
  {
    id: 'CIA3-229',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Economic Value Added (EVA) measures:',
    options: [
      'Only revenue growth',
      'Economic profit after deducting the cost of capital',
      'Only asset growth',
      'Only market share'
    ],
    correctAnswer: 1,
    explanation: 'EVA = Net Operating Profit After Taxes minus (Capital × Cost of Capital); measures value creation above capital costs.',
    topic: 'Financial Management',
    subtopic: 'Performance Metrics'
  },
  {
    id: 'CIA3-230',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Fraud in financial statements often involves:',
    options: [
      'Only cash theft',
      'Revenue manipulation, expense timing, or asset/liability misstatement',
      'Only inventory theft',
      'Only payroll fraud'
    ],
    correctAnswer: 1,
    explanation: 'Financial statement fraud includes improper revenue recognition, expense manipulation, and asset/liability misstatement to deceive users.',
    topic: 'Financial Management',
    subtopic: 'Fraud Risk'
  },

  // ============================================================================
  // ADDITIONAL MIXED DOMAIN QUESTIONS
  // ============================================================================
  
  {
    id: 'CIA3-231',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Globalization risk factors include:',
    options: [
      'Only currency fluctuation',
      'Political, regulatory, cultural, and economic differences across markets',
      'Only language barriers',
      'Only shipping costs'
    ],
    correctAnswer: 1,
    explanation: 'Global operations face diverse risks including political instability, regulatory variations, cultural differences, and economic conditions.',
    topic: 'Business Acumen',
    subtopic: 'International Business'
  },
  {
    id: 'CIA3-232',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Regulatory compliance programs should include:',
    options: [
      'Only legal review',
      'Policies, training, monitoring, and remediation processes',
      'Only penalty payment reserves',
      'Only external counsel'
    ],
    correctAnswer: 1,
    explanation: 'Effective compliance programs include policies, training, monitoring, reporting, investigation, and remediation elements.',
    topic: 'Business Acumen',
    subtopic: 'Compliance'
  },
  {
    id: 'CIA3-233',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Anti-money laundering (AML) controls include:',
    options: [
      'Only large transaction review',
      'Customer due diligence, transaction monitoring, and suspicious activity reporting',
      'Only currency controls',
      'Only foreign account review'
    ],
    correctAnswer: 1,
    explanation: 'AML programs include know-your-customer procedures, transaction monitoring, suspicious activity reporting, and sanctions screening.',
    topic: 'Business Acumen',
    subtopic: 'Regulatory Compliance'
  },
  {
    id: 'CIA3-234',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Vendor risk management assesses:',
    options: [
      'Only price comparisons',
      'Third-party risks including security, financial, and operational factors',
      'Only delivery times',
      'Only product quality'
    ],
    correctAnswer: 1,
    explanation: 'Vendor risk management evaluates third parties for security, financial stability, operational capability, compliance, and continuity risks.',
    topic: 'Business Acumen',
    subtopic: 'Third-Party Risk'
  },
  {
    id: 'CIA3-235',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Key risk indicators (KRIs) differ from KPIs in that KRIs:',
    options: [
      'Measure historical performance',
      'Provide early warning of increasing risk exposure',
      'Only apply to financial metrics',
      'Are never quantitative'
    ],
    correctAnswer: 1,
    explanation: 'KRIs are forward-looking metrics that signal changes in risk exposure, enabling proactive response before risks materialize.',
    topic: 'Business Acumen',
    subtopic: 'Risk Management'
  },
  {
    id: 'CIA3-236',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Model risk arises from:',
    options: [
      'Only physical asset models',
      'Errors or misuse in quantitative models used for decisions',
      'Only fashion industry',
      'Only prototype products'
    ],
    correctAnswer: 1,
    explanation: 'Model risk stems from models that are incorrectly specified, improperly implemented, or inappropriately used for decision-making.',
    topic: 'Information Technology',
    subtopic: 'Model Risk'
  },
  {
    id: 'CIA3-237',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Ethical considerations in AI development include:',
    options: [
      'Only cost optimization',
      'Fairness, transparency, accountability, and privacy',
      'Only processing speed',
      'Only data volume'
    ],
    correctAnswer: 1,
    explanation: 'AI ethics address fairness (avoiding bias), transparency (explainability), accountability (responsibility), and privacy (data protection).',
    topic: 'Information Technology',
    subtopic: 'AI Ethics'
  },
  {
    id: 'CIA3-238',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Disaster recovery focuses on:',
    options: [
      'Preventing all disasters',
      'Restoring IT systems and data after a disruption',
      'Only natural disasters',
      'Only backup creation'
    ],
    correctAnswer: 1,
    explanation: 'Disaster recovery focuses on restoring IT infrastructure and data to resume technology operations after disruption.',
    topic: 'Information Technology',
    subtopic: 'Disaster Recovery'
  },
  {
    id: 'CIA3-239',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Hot sites versus cold sites differ primarily in:',
    options: [
      'Geographic location only',
      'Readiness level and recovery time capability',
      'Cost only',
      'Size only'
    ],
    correctAnswer: 1,
    explanation: 'Hot sites are fully operational recovery facilities enabling rapid failover; cold sites are basic facilities requiring setup before use.',
    topic: 'Information Technology',
    subtopic: 'Disaster Recovery'
  },
  {
    id: 'CIA3-240',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'SOC (System and Organization Controls) reports provide:',
    options: [
      'Only financial statements',
      'Independent assessment of service organization controls',
      'Only operational metrics',
      'Only security certifications'
    ],
    correctAnswer: 1,
    explanation: 'SOC reports provide independent assurance on service organization controls relevant to security, availability, processing integrity, confidentiality, and privacy.',
    topic: 'Information Technology',
    subtopic: 'Third-Party Assurance'
  },
  {
    id: 'CIA3-241',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Lease versus buy analysis considers:',
    options: [
      'Only initial cost',
      'Total cost of ownership, cash flows, and strategic factors',
      'Only tax implications',
      'Only accounting treatment'
    ],
    correctAnswer: 1,
    explanation: 'Lease-buy analysis compares total costs, cash flow impacts, flexibility, tax effects, and strategic factors to determine optimal approach.',
    topic: 'Financial Management',
    subtopic: 'Capital Decisions'
  },
  {
    id: 'CIA3-242',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Accounts payable turnover indicates:',
    options: [
      'Collection efficiency',
      'How quickly the company pays its suppliers',
      'Inventory movement',
      'Asset efficiency'
    ],
    correctAnswer: 1,
    explanation: 'Payables turnover (Purchases / Average Payables) indicates how frequently the company pays suppliers; lower may indicate cash management or distress.',
    topic: 'Financial Management',
    subtopic: 'Financial Ratios'
  },
  {
    id: 'CIA3-243',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Sunk costs should be:',
    options: [
      'Always included in decisions',
      'Excluded from forward-looking decisions',
      'Only considered for large projects',
      'Added to future costs'
    ],
    correctAnswer: 1,
    explanation: 'Sunk costs are past costs that cannot be recovered and should not influence forward-looking decisions; only future costs matter.',
    topic: 'Financial Management',
    subtopic: 'Decision Making'
  },
  {
    id: 'CIA3-244',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Opportunity cost represents:',
    options: [
      'Direct cash outlays',
      'The value of the best foregone alternative',
      'Only historical costs',
      'Only variable costs'
    ],
    correctAnswer: 1,
    explanation: 'Opportunity cost is the value of the next best alternative foregone when making a choice; relevant for resource allocation decisions.',
    topic: 'Financial Management',
    subtopic: 'Decision Making'
  },
  {
    id: 'CIA3-245',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Segment reporting discloses:',
    options: [
      'Only total company results',
      'Financial information by business segment or geographic area',
      'Only external sales',
      'Only profit centers'
    ],
    correctAnswer: 1,
    explanation: 'Segment reporting provides disaggregated financial information about operating segments to help users understand business components.',
    topic: 'Financial Management',
    subtopic: 'Financial Reporting'
  },
  {
    id: 'CIA3-246',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Related party transactions require:',
    options: [
      'No special treatment',
      'Disclosure and often scrutiny for arm\'s length terms',
      'Only internal reporting',
      'Only legal review'
    ],
    correctAnswer: 1,
    explanation: 'Related party transactions require disclosure and evaluation to ensure they are conducted at arm\'s length and not for improper purposes.',
    topic: 'Financial Management',
    subtopic: 'Financial Reporting'
  },
  {
    id: 'CIA3-247',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Whistleblower programs provide:',
    options: [
      'Only complaint logging',
      'Confidential channels for reporting misconduct with retaliation protection',
      'Only external hotlines',
      'Only legal defense'
    ],
    correctAnswer: 1,
    explanation: 'Whistleblower programs enable confidential reporting of concerns with protections against retaliation, supporting ethics and compliance.',
    topic: 'Business Acumen',
    subtopic: 'Ethics'
  },
  {
    id: 'CIA3-248',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Conflicts of interest:',
    options: [
      'Only apply to executives',
      'Occur when personal interests could improperly influence business decisions',
      'Are only financial in nature',
      'Cannot be managed'
    ],
    correctAnswer: 1,
    explanation: 'Conflicts of interest arise when personal, financial, or other interests could improperly influence judgment in business matters.',
    topic: 'Business Acumen',
    subtopic: 'Ethics'
  },
  {
    id: 'CIA3-249',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Cybersecurity frameworks like NIST provide:',
    options: [
      'Only legal requirements',
      'Structured approaches to managing cybersecurity risk',
      'Only technical specifications',
      'Only certification programs'
    ],
    correctAnswer: 1,
    explanation: 'Frameworks like NIST Cybersecurity Framework provide voluntary standards and best practices for managing cybersecurity risk.',
    topic: 'Information Security',
    subtopic: 'Security Frameworks'
  },
  {
    id: 'CIA3-250',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Backup strategies consider:',
    options: [
      'Only storage cost',
      'Recovery requirements, data criticality, and retention needs',
      'Only media type',
      'Only frequency'
    ],
    correctAnswer: 1,
    explanation: 'Backup strategies balance recovery time objectives, recovery point objectives, data criticality, retention requirements, and cost.',
    topic: 'Information Technology',
    subtopic: 'Data Protection'
  },
  {
    id: 'CIA3-251',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Process documentation serves to:',
    options: [
      'Only create paperwork',
      'Ensure consistency, enable training, and support control assessment',
      'Only satisfy regulators',
      'Only meet ISO requirements'
    ],
    correctAnswer: 1,
    explanation: 'Process documentation ensures consistent execution, enables effective training, supports control evaluation, and facilitates improvement.',
    topic: 'Business Acumen',
    subtopic: 'Process Management'
  },
  {
    id: 'CIA3-252',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'A culture of continuous improvement:',
    options: [
      'Focuses only on major initiatives',
      'Encourages ongoing small improvements by all employees',
      'Only applies to manufacturing',
      'Requires external consultants'
    ],
    correctAnswer: 1,
    explanation: 'Continuous improvement (kaizen) culture encourages all employees to identify and implement incremental improvements consistently over time.',
    topic: 'Business Acumen',
    subtopic: 'Organizational Culture'
  },
  {
    id: 'CIA3-253',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Service level objectives (SLOs) define:',
    options: [
      'Only maximum costs',
      'Target performance levels for services',
      'Only minimum staffing',
      'Only technology requirements'
    ],
    correctAnswer: 1,
    explanation: 'SLOs specify target performance levels (response time, availability, throughput) that services should achieve.',
    topic: 'Information Technology',
    subtopic: 'IT Service Management'
  },
  {
    id: 'CIA3-254',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Capacity planning ensures:',
    options: [
      'Maximum utilization always',
      'Adequate resources to meet future demand',
      'Only cost minimization',
      'Only physical space'
    ],
    correctAnswer: 1,
    explanation: 'Capacity planning forecasts resource needs and ensures adequate capacity (computing, storage, network, people) to meet anticipated demand.',
    topic: 'Information Technology',
    subtopic: 'IT Operations'
  },
  {
    id: 'CIA3-255',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'The difference between gross margin and operating margin:',
    options: [
      'They are the same',
      'Operating margin includes operating expenses beyond cost of goods sold',
      'Gross margin is always lower',
      'Operating margin excludes all expenses'
    ],
    correctAnswer: 1,
    explanation: 'Gross margin is revenue minus COGS; operating margin further deducts operating expenses (SG&A, R&D) from gross profit.',
    topic: 'Financial Management',
    subtopic: 'Financial Ratios'
  },
  {
    id: 'CIA3-256',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Free cash flow represents:',
    options: [
      'Only operating cash flow',
      'Cash available after capital expenditures',
      'Only net income',
      'Total cash on hand'
    ],
    correctAnswer: 1,
    explanation: 'Free cash flow = Operating Cash Flow minus Capital Expenditures; represents cash available for debt, dividends, or growth.',
    topic: 'Financial Management',
    subtopic: 'Cash Flow Analysis'
  },
  {
    id: 'CIA3-257',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Scenario planning differs from forecasting in that it:',
    options: [
      'Predicts single outcomes',
      'Explores multiple possible futures to test strategies',
      'Only uses historical data',
      'Ignores uncertainty'
    ],
    correctAnswer: 1,
    explanation: 'Scenario planning explores multiple possible futures rather than single-point forecasts, testing strategy robustness under different conditions.',
    topic: 'Business Acumen',
    subtopic: 'Strategic Planning'
  },
  {
    id: 'CIA3-258',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Customer lifetime value (CLV) estimates:',
    options: [
      'Only single transaction value',
      'Total revenue expected from a customer relationship over time',
      'Only acquisition cost',
      'Only service costs'
    ],
    correctAnswer: 1,
    explanation: 'CLV estimates the total value a customer will bring over the entire relationship, guiding acquisition spending and retention investment decisions.',
    topic: 'Business Acumen',
    subtopic: 'Customer Analytics'
  },
  {
    id: 'CIA3-259',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Operational risk includes:',
    options: [
      'Only market price risk',
      'Risks from people, processes, systems, or external events',
      'Only credit risk',
      'Only strategic risk'
    ],
    correctAnswer: 1,
    explanation: 'Operational risk encompasses potential losses from inadequate or failed processes, people, systems, or from external events.',
    topic: 'Business Acumen',
    subtopic: 'Risk Management'
  },
  {
    id: 'CIA3-260',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Stress testing in risk management:',
    options: [
      'Only tests employee performance',
      'Evaluates impact of severe but plausible adverse scenarios',
      'Only applies to physical assets',
      'Uses only historical data'
    ],
    correctAnswer: 1,
    explanation: 'Stress testing evaluates how the organization would withstand severe adverse scenarios, informing risk management and capital planning.',
    topic: 'Business Acumen',
    subtopic: 'Risk Management'
  },
  {
    id: 'CIA3-261',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Performance attribution analysis identifies:',
    options: [
      'Only total returns',
      'Sources of investment returns relative to benchmarks',
      'Only trading costs',
      'Only risk factors'
    ],
    correctAnswer: 1,
    explanation: 'Attribution analysis decomposes investment returns to identify contributions from different decisions (allocation, selection, timing).',
    topic: 'Financial Management',
    subtopic: 'Investment Analysis'
  },
  {
    id: 'CIA3-262',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Accounts receivable aging reports:',
    options: [
      'Show only total receivables',
      'Categorize receivables by how long outstanding',
      'Only show paid invoices',
      'Only track new sales'
    ],
    correctAnswer: 1,
    explanation: 'Aging reports categorize receivables by time outstanding (current, 30 days, 60 days, etc.), helping identify collection issues.',
    topic: 'Financial Management',
    subtopic: 'Working Capital'
  },
  {
    id: 'CIA3-263',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Internal controls over financial reporting (ICFR):',
    options: [
      'Only apply to public companies',
      'Provide reasonable assurance regarding financial statement reliability',
      'Guarantee no errors',
      'Only cover cash'
    ],
    correctAnswer: 1,
    explanation: 'ICFR provides reasonable assurance that financial statements are prepared accurately in conformity with applicable standards.',
    topic: 'Financial Management',
    subtopic: 'Internal Controls'
  },
  {
    id: 'CIA3-264',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Material weaknesses in ICFR:',
    options: [
      'Are minor deficiencies',
      'Are deficiencies creating reasonable possibility of material misstatement',
      'Only require disclosure to management',
      'Cannot be remediated'
    ],
    correctAnswer: 1,
    explanation: 'A material weakness is a deficiency creating reasonable possibility that a material misstatement will not be prevented or detected timely.',
    topic: 'Financial Management',
    subtopic: 'Internal Controls'
  },
  {
    id: 'CIA3-265',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Consolidated financial statements:',
    options: [
      'Report only parent company',
      'Present parent and subsidiaries as a single economic entity',
      'Only show minority interests',
      'Exclude subsidiaries'
    ],
    correctAnswer: 1,
    explanation: 'Consolidated statements present the parent and subsidiaries as one economic entity, eliminating intercompany transactions.',
    topic: 'Financial Management',
    subtopic: 'Financial Reporting'
  },
  {
    id: 'CIA3-266',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Liquidity risk refers to:',
    options: [
      'Market price volatility',
      'Inability to meet short-term obligations or convert assets to cash',
      'Only credit default',
      'Only interest rate changes'
    ],
    correctAnswer: 1,
    explanation: 'Liquidity risk is the risk of being unable to meet financial obligations when due or convert assets to cash without significant loss.',
    topic: 'Financial Management',
    subtopic: 'Financial Risk'
  },
  {
    id: 'CIA3-267',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Fair value measurement requires:',
    options: [
      'Only historical cost',
      'Estimating the price in an orderly transaction between market participants',
      'Only replacement cost',
      'Only liquidation value'
    ],
    correctAnswer: 1,
    explanation: 'Fair value is the price receivable or payable in an orderly transaction between market participants at the measurement date.',
    topic: 'Financial Management',
    subtopic: 'Valuation'
  },
  {
    id: 'CIA3-268',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Earnings management differs from fraud in that it:',
    options: [
      'Is equally illegal',
      'May operate within accounting rules while fraud violates them',
      'Is more harmful',
      'Requires external auditor approval'
    ],
    correctAnswer: 1,
    explanation: 'Earnings management uses judgment within accounting rules to influence reported results; fraud intentionally violates standards or conceals information.',
    topic: 'Financial Management',
    subtopic: 'Financial Reporting'
  },
  {
    id: 'CIA3-269',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Board diversity considerations include:',
    options: [
      'Only family relationships',
      'Skills, experience, gender, ethnicity, and perspectives',
      'Only age',
      'Only geographic representation'
    ],
    correctAnswer: 1,
    explanation: 'Board diversity encompasses multiple dimensions including skills, experience, gender, ethnicity, and viewpoints to improve governance.',
    topic: 'Business Acumen',
    subtopic: 'Corporate Governance'
  },
  {
    id: 'CIA3-270',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Executive compensation should be:',
    options: [
      'Only fixed salary',
      'Aligned with performance and long-term shareholder value',
      'Only stock options',
      'Set without oversight'
    ],
    correctAnswer: 1,
    explanation: 'Executive compensation should align incentives with organizational performance and long-term value creation, with appropriate board oversight.',
    topic: 'Business Acumen',
    subtopic: 'Corporate Governance'
  },
];

export default CIA3_QUESTIONS_BATCH3;
