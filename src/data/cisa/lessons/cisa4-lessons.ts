/**
 * CISA Domain 4: Information Systems Operations and Business Resilience (23%)
 * Based on ISACA CISA Review Manual
 * 
 * Key Topics:
 * - IT Service Delivery and Operations
 * - Business Continuity and Disaster Recovery
 * - Incident Management
 */

import { Lesson } from '../../../types';

export const cisa4Lessons: Lesson[] = [
  // ============================================================================
  // DOMAIN 4A: IT OPERATIONS
  // ============================================================================
  
  {
    id: 'CISA4-001',
    courseId: 'cisa',
    section: 'CISA4',
    title: 'IT Operations Management',
    description: 'Understand the fundamentals of managing IT operations and service delivery',
    order: 1,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['IT Operations', 'Service Delivery', 'Operations Controls', 'Monitoring'],
    blueprintArea: 'CISA4-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "IT operations keep business systems running. Effective operations management ensures systems are available, performant, and secure. Poor operations lead to outages and security breaches.",
        },
        {
          title: 'IT Operations Functions',
          type: 'text',
          content: "**Core Operations Activities:**\n\n**Infrastructure Management**\n• Server administration\n• Network operations\n• Storage management\n• Database administration\n\n**Service Management**\n• Service desk\n• Incident management\n• Problem management\n• Request fulfillment\n\n**Batch Processing**\n• Job scheduling\n• Batch execution\n• Output management\n• Error handling\n\n**Security Operations**\n• Vulnerability management\n• Security monitoring\n• Access management\n• Patch management",
        },
        {
          title: 'Operations Control Objectives',
          type: 'table',
          headers: ['Objective', 'Focus', 'Key Controls'],
          rows: [
            ['Availability', 'Systems accessible', 'Redundancy, monitoring'],
            ['Performance', 'Acceptable response', 'Capacity planning, tuning'],
            ['Integrity', 'Accurate processing', 'Validation, reconciliation'],
            ['Security', 'Protection from threats', 'Access control, monitoring'],
            ['Compliance', 'Regulatory adherence', 'Logging, reporting'],
          ],
        },
        {
          title: 'Job Scheduling Controls',
          type: 'text',
          content: "**Batch Processing Controls:**\n\n**Scheduling Controls**\n• Documented schedules\n• Dependency management\n• Resource allocation\n• Conflict prevention\n\n**Execution Controls**\n• Operator procedures\n• Error handling\n• Restart/recovery\n• Logging\n\n**Output Controls**\n• Output verification\n• Distribution controls\n• Retention management\n• Sensitive output handling\n\n**Monitoring**\n• Job completion verification\n• SLA tracking\n• Performance metrics\n• Exception alerting",
        },
        {
          title: 'System Monitoring',
          type: 'text',
          content: "**Monitoring Elements:**\n\n**Infrastructure Monitoring**\n• Server health (CPU, memory, disk)\n• Network traffic and latency\n• Storage capacity and performance\n• Environmental (temperature, humidity)\n\n**Application Monitoring**\n• Application availability\n• Response times\n• Error rates\n• Transaction volumes\n\n**Security Monitoring**\n• Security events\n• Access attempts\n• Policy violations\n• Threat indicators\n\n**Business Monitoring**\n• SLA compliance\n• User satisfaction\n• Business process metrics",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "IT operations manage infrastructure, services, batch processing, and security",
            "Control objectives: availability, performance, integrity, security, compliance",
            "Job scheduling requires schedule control, execution control, and monitoring",
            "Monitoring covers infrastructure, applications, security, and business metrics",
            "Operations ensure systems support business requirements reliably",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA4-002',
    courseId: 'cisa',
    section: 'CISA4',
    title: 'Data Center and Facilities Management',
    description: 'Learn physical and environmental controls for IT facilities',
    order: 2,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Data Center', 'Physical Security', 'Environmental Controls', 'Power'],
    blueprintArea: 'CISA4-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Physical controls protect against theft, damage, and environmental threats. A sophisticated security architecture is worthless if someone can walk in and steal a server.",
        },
        {
          title: 'Physical Security Layers',
          type: 'text',
          content: "**Defense in Depth:**\n\n**Perimeter Security**\n• Fencing and barriers\n• Security guards\n• Surveillance cameras\n• Lighting\n\n**Building Entry**\n• Badge access control\n• Visitor management\n• Mantrap/airlock\n• Security desk\n\n**Data Center Entry**\n• Biometric access\n• Two-factor authentication\n• Access logging\n• Escort requirements\n\n**Rack/Cage Level**\n• Locked cabinets\n• Individual access control\n• Asset tracking\n• Video monitoring",
        },
        {
          title: 'Environmental Controls',
          type: 'table',
          headers: ['Control', 'Purpose', 'Key Considerations'],
          rows: [
            ['HVAC', 'Temperature/humidity control', 'Redundancy, monitoring, climate'],
            ['Fire Suppression', 'Fire protection', 'Clean agent, early detection, water damage'],
            ['Water Detection', 'Leak detection', 'Under-floor, ceiling, perimeter'],
            ['Power Protection', 'Clean, reliable power', 'UPS, generator, redundant feeds'],
          ],
        },
        {
          title: 'Power Management',
          type: 'text',
          content: "**Power Protection Layers:**\n\n**Uninterruptible Power Supply (UPS)**\n• Battery backup for short outages\n• Power conditioning\n• Surge protection\n• Typically 15-30 minutes runtime\n\n**Generator Backup**\n• Long-term power alternative\n• Fuel supply considerations\n• Automatic transfer switch\n• Regular testing required\n\n**Power Redundancy**\n• Dual power feeds\n• Separate utility substations\n• N+1 or 2N redundancy\n• Diverse power paths\n\n**Power Distribution**\n• PDU monitoring\n• Load balancing\n• Circuit protection\n• Maintenance bypass",
        },
        {
          title: 'Fire Protection',
          type: 'text',
          content: "**Fire Protection Systems:**\n\n**Detection**\n• Smoke detectors\n• Heat detectors\n• Very Early Smoke Detection (VESDA)\n• Air sampling\n\n**Suppression**\n• **Clean agents** (FM-200, Novec) - No residue, safe for equipment\n• **Inert gas** - Oxygen displacement\n• **Pre-action sprinkler** - Requires two triggers\n• **Dry pipe** - Water held until needed\n\n**Prevention**\n• No combustibles in data center\n• Cable management\n• Equipment maintenance\n• Smoking prohibition\n\n**Response**\n• Emergency procedures\n• Kill switch\n• Evacuation plan\n• Fire department coordination",
        },
        {
          title: 'Data Center Tiers',
          type: 'text',
          content: "**Uptime Institute Tiers:**\n\n**Tier I: Basic**\n• Single path for power/cooling\n• No redundancy\n• 99.671% availability\n\n**Tier II: Redundant Components**\n• Some redundancy\n• Single distribution path\n• 99.741% availability\n\n**Tier III: Concurrently Maintainable**\n• Multiple paths\n• N+1 redundancy\n• No shutdown for maintenance\n• 99.982% availability\n\n**Tier IV: Fault Tolerant**\n• 2N+1 redundancy\n• All components redundant\n• No single point of failure\n• 99.995% availability",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Physical security uses defense in depth with multiple layers",
            "Environmental controls: HVAC, fire suppression, water detection, power",
            "Power protection: UPS for short term, generator for long term",
            "Fire suppression: clean agents preferred for data centers",
            "Data center tiers range from basic (I) to fault tolerant (IV)",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA4-003',
    courseId: 'cisa',
    section: 'CISA4',
    title: 'Network Infrastructure Operations',
    description: 'Understand network operations and infrastructure management',
    order: 3,
    duration: 55,
    difficulty: 'advanced',
    topics: ['Network Operations', 'Network Security', 'Telecommunications', 'Cloud Networking'],
    blueprintArea: 'CISA4-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Networks connect everything. Network security is critical because attackers must traverse the network to reach their targets. A compromised network compromises everything.",
        },
        {
          title: 'Network Components',
          type: 'text',
          content: "**Key Network Devices:**\n\n**Routers**\n• Connect different networks\n• Route packets based on IP\n• Enforce routing policies\n• WAN connectivity\n\n**Switches**\n• Connect devices on same network\n• Forward frames based on MAC\n• Create network segments (VLANs)\n• Layer 2 connectivity\n\n**Firewalls**\n• Control traffic between zones\n• Enforce security policies\n• Deep packet inspection\n• Application awareness\n\n**Load Balancers**\n• Distribute traffic across servers\n• Improve availability\n• Health checking\n• SSL termination",
        },
        {
          title: 'Network Security Zones',
          type: 'table',
          headers: ['Zone', 'Purpose', 'Trust Level'],
          rows: [
            ['DMZ', 'Public-facing services', 'Low trust'],
            ['Internal Network', 'Business applications', 'Medium trust'],
            ['Secure Zone', 'Sensitive systems', 'High trust'],
            ['Management Network', 'Admin access', 'Highest trust'],
            ['Guest Network', 'Visitor access', 'No trust'],
          ],
        },
        {
          title: 'Network Security Controls',
          type: 'text',
          content: "**Network Protection Measures:**\n\n**Perimeter Security**\n• Next-generation firewalls\n• IDS/IPS systems\n• Web application firewalls\n• Email security gateways\n\n**Segmentation**\n• VLANs\n• Network access control (NAC)\n• Microsegmentation\n• Zero trust architecture\n\n**Encryption**\n• VPN for remote access\n• TLS for web traffic\n• IPsec for site-to-site\n• Encrypted protocols\n\n**Monitoring**\n• Network traffic analysis\n• Flow data collection\n• Security analytics\n• Threat detection",
        },
        {
          title: 'Wireless Network Security',
          type: 'text',
          content: "**WiFi Security Considerations:**\n\n**Standards Evolution:**\n• WEP - Broken, never use\n• WPA - Improved, but deprecated\n• WPA2 - Current standard\n• WPA3 - Latest, enhanced security\n\n**Enterprise Security:**\n• WPA2/WPA3 Enterprise (802.1X)\n• RADIUS authentication\n• Certificate-based authentication\n• Separate SSIDs for guest/employee\n\n**Additional Controls:**\n• Rogue AP detection\n• Client isolation\n• MAC filtering (limited value)\n• Physical coverage management",
        },
        {
          title: 'Cloud Networking',
          type: 'text',
          content: "**Cloud Network Considerations:**\n\n**Virtual Networks**\n• VPCs (Virtual Private Cloud)\n• Subnets and routing\n• Security groups\n• Network ACLs\n\n**Connectivity**\n• VPN to cloud\n• Direct connect/ExpressRoute\n• Internet egress\n• Hybrid connectivity\n\n**Security Controls**\n• Cloud firewalls\n• Web Application Firewall (WAF)\n• DDoS protection\n• Traffic flow logs\n\n**Multi-Cloud**\n• Inter-cloud networking\n• Consistent security policies\n• Centralized management",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Network components: routers, switches, firewalls, load balancers",
            "Security zones separate trust levels (DMZ, internal, secure)",
            "Network security includes perimeter, segmentation, encryption, monitoring",
            "Use WPA2/WPA3 Enterprise for wireless security",
            "Cloud networking requires VPC, security groups, and connectivity controls",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN 4B: INCIDENT MANAGEMENT
  // ============================================================================

  {
    id: 'CISA4-004',
    courseId: 'cisa',
    section: 'CISA4',
    title: 'Incident Management Process',
    description: 'Master the incident management lifecycle from detection to resolution',
    order: 4,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Incident Management', 'Incident Response', 'Escalation', 'Communication'],
    blueprintArea: 'CISA4-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Effective incident management minimizes business impact when issues occur. Organizations with mature incident processes recover faster and learn from each event.",
        },
        {
          title: 'Incident vs. Problem',
          type: 'table',
          headers: ['Aspect', 'Incident', 'Problem'],
          rows: [
            ['Focus', 'Restore service quickly', 'Find root cause'],
            ['Goal', 'Minimize business impact', 'Prevent future incidents'],
            ['Timeframe', 'Immediate resolution', 'May take longer'],
            ['Example', 'Server is down, restart it', 'Why does server keep crashing?'],
          ],
        },
        {
          title: 'Incident Management Process',
          type: 'text',
          content: "**Incident Lifecycle:**\n\n**1. Detection and Logging**\n• Identify incident\n• Log in ticketing system\n• Capture initial details\n• Timestamp everything\n\n**2. Classification and Prioritization**\n• Categorize by type\n• Assess impact and urgency\n• Assign priority level\n• Route to appropriate team\n\n**3. Investigation and Diagnosis**\n• Gather information\n• Identify potential causes\n• Test hypotheses\n• Document findings\n\n**4. Resolution and Recovery**\n• Implement fix/workaround\n• Verify service restored\n• Confirm with user\n• Document solution\n\n**5. Closure**\n• User confirmation\n• Documentation complete\n• Close ticket\n• Trigger review if needed",
        },
        {
          title: 'Priority Matrix',
          type: 'text',
          content: "**Impact x Urgency = Priority**\n\n**Impact Levels:**\n• **High** - Business-critical, many users\n• **Medium** - Important, limited users\n• **Low** - Non-critical, workaround exists\n\n**Urgency Levels:**\n• **High** - No workaround, immediate need\n• **Medium** - Workaround available, can wait\n• **Low** - Can be scheduled\n\n**Priority Examples:**\n• **P1/Critical** - Production system down, all users affected\n• **P2/High** - Major function unavailable, many users\n• **P3/Medium** - Service degraded, some users\n• **P4/Low** - Minor issue, workaround available",
        },
        {
          title: 'Escalation Procedures',
          type: 'text',
          content: "**Escalation Types:**\n\n**Functional Escalation**\n• Route to specialized team\n• More expertise needed\n• Technical escalation\n\n**Hierarchical Escalation**\n• Escalate to management\n• Decision authority needed\n• Resource conflicts\n• SLA at risk\n\n**Escalation Triggers:**\n• Time thresholds exceeded\n• Priority increase\n• Additional resources needed\n• Customer request\n\n**Key Actions:**\n• Document escalation\n• Notify appropriate parties\n• Provide status updates\n• Track to resolution",
        },
        {
          title: 'Incident Communication',
          type: 'text',
          content: "**Communication Requirements:**\n\n**Internal Communication:**\n• Status updates to stakeholders\n• Management notifications\n• Technical team coordination\n• Post-incident reports\n\n**External Communication:**\n• Customer notifications\n• Status page updates\n• Regulatory reporting\n• Partner communication\n\n**Communication Templates:**\n• Initial notification\n• Progress updates\n• Resolution notification\n• Post-incident summary\n\n**Key Principle:** Communicate early, often, and honestly.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Incident management restores service; problem management finds root cause",
            "Process: detect, classify, investigate, resolve, close",
            "Priority = Impact × Urgency",
            "Escalation can be functional (expertise) or hierarchical (authority)",
            "Communication is critical throughout the incident lifecycle",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA4-005',
    courseId: 'cisa',
    section: 'CISA4',
    title: 'Security Incident Response',
    description: 'Understand the security incident response process and controls',
    order: 5,
    duration: 55,
    difficulty: 'advanced',
    topics: ['Security Incidents', 'CSIRT', 'Forensics', 'Lessons Learned'],
    blueprintArea: 'CISA4-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Security incidents are inevitable. A well-prepared incident response capability minimizes damage, preserves evidence, and enables faster recovery.",
        },
        {
          title: 'Incident Response Framework',
          type: 'text',
          content: "**NIST Incident Response Phases:**\n\n**1. Preparation**\n• Develop IR plan\n• Train the team\n• Acquire tools\n• Establish communication\n\n**2. Detection and Analysis**\n• Monitor for indicators\n• Analyze alerts\n• Assess scope and impact\n• Document findings\n\n**3. Containment, Eradication, Remediation**\n• Stop the spread\n• Remove threat\n• Restore systems\n• Verify clean\n\n**4. Post-Incident Activity**\n• Lessons learned\n• Evidence retention\n• Reporting\n• Improvement actions",
        },
        {
          title: 'Incident Response Team',
          type: 'table',
          headers: ['Role', 'Responsibilities', 'Involvement'],
          rows: [
            ['IR Manager', 'Lead response, decisions', 'All incidents'],
            ['Security Analyst', 'Technical analysis, containment', 'All incidents'],
            ['Forensic Analyst', 'Evidence collection, analysis', 'Major incidents'],
            ['Communications', 'Internal/external comms', 'Significant incidents'],
            ['Legal', 'Legal implications, disclosure', 'As needed'],
            ['HR', 'Employee-related incidents', 'Insider incidents'],
          ],
        },
        {
          title: 'Containment Strategies',
          type: 'text',
          content: "**Containment Options:**\n\n**Short-Term Containment**\n• Isolate affected systems\n• Block malicious IPs/domains\n• Disable compromised accounts\n• Implement emergency rules\n\n**Long-Term Containment**\n• Apply patches\n• Reset credentials\n• Enhance monitoring\n• Remove attacker access\n\n**Eradication**\n• Remove malware\n• Reimage systems\n• Close vulnerabilities\n• Verify complete removal\n\n**Key Decision:** Balance evidence preservation with business recovery needs.",
        },
        {
          title: 'Digital Forensics',
          type: 'text',
          content: "**Forensic Principles:**\n\n**Evidence Handling:**\n• Chain of custody\n• Write protection\n• Forensic imaging\n• Hash verification\n\n**Evidence Sources:**\n• System logs\n• Network traffic\n• Memory (volatile)\n• Storage (non-volatile)\n• Cloud logs\n\n**Best Practices:**\n• Work on copies, not originals\n• Document everything\n• Use forensic tools\n• Maintain timeline\n\n**Legal Considerations:**\n• Admissibility requirements\n• Privacy regulations\n• Disclosure obligations\n• Law enforcement coordination",
        },
        {
          title: 'Post-Incident Activities',
          type: 'text',
          content: "**After the Incident:**\n\n**Lessons Learned Meeting**\n• What happened?\n• What went well?\n• What could improve?\n• Action items\n\n**Documentation**\n• Incident timeline\n• Actions taken\n• Evidence preserved\n• Costs incurred\n\n**Improvement Actions**\n• Update IR plan\n• Enhance controls\n• Additional training\n• Tool improvements\n\n**Reporting**\n• Management report\n• Regulatory notifications\n• Customer disclosure\n• Board briefing",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "IR phases: preparation, detection, containment/eradication, post-incident",
            "IR team includes manager, analysts, forensics, legal, communications",
            "Containment balances stopping the attack with preserving evidence",
            "Forensics requires chain of custody and working on copies",
            "Post-incident review drives continuous improvement",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN 4C: BUSINESS CONTINUITY AND DISASTER RECOVERY
  // ============================================================================

  {
    id: 'CISA4-006',
    courseId: 'cisa',
    section: 'CISA4',
    title: 'Business Continuity Planning',
    description: 'Understand business continuity planning principles and components',
    order: 6,
    duration: 55,
    difficulty: 'advanced',
    topics: ['BCP', 'Business Impact Analysis', 'Recovery Strategies', 'BC Testing'],
    blueprintArea: 'CISA4-C',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Business continuity ensures the organization can survive disruptions. Without BCP, even minor incidents can become existential threats. BCP is heavily tested on the CISA exam!",
        },
        {
          title: 'BCP vs. DRP',
          type: 'table',
          headers: ['Aspect', 'Business Continuity (BCP)', 'Disaster Recovery (DRP)'],
          rows: [
            ['Scope', 'Entire business', 'IT systems'],
            ['Focus', 'Continuing critical operations', 'Restoring IT systems'],
            ['Owner', 'Executive management', 'IT management'],
            ['Timeframe', 'During and after disruption', 'After disruption'],
            ['Output', 'BC plan, procedures', 'DR plan, technical procedures'],
          ],
        },
        {
          title: 'BCP Development Process',
          type: 'text',
          content: "**BCP Phases:**\n\n**1. Project Initiation**\n• Management support\n• Define scope\n• Assign resources\n• Establish governance\n\n**2. Business Impact Analysis**\n• Identify critical processes\n• Determine dependencies\n• Assess impact of disruption\n• Define recovery requirements\n\n**3. Risk Assessment**\n• Identify threats\n• Assess vulnerabilities\n• Analyze risk scenarios\n• Prioritize risks\n\n**4. Strategy Development**\n• Define recovery strategies\n• Select options\n• Develop cost-benefit\n• Obtain approval\n\n**5. Plan Development**\n• Document procedures\n• Assign responsibilities\n• Identify resources\n• Establish communication\n\n**6. Testing and Maintenance**\n• Conduct exercises\n• Update plans\n• Train staff\n• Continuous improvement",
        },
        {
          title: 'Critical BIA Outputs',
          type: 'text',
          content: "**Key BIA Results:**\n\n**Recovery Objectives:**\n• **MTD** - Maximum Tolerable Downtime\n• **RTO** - Recovery Time Objective\n• **RPO** - Recovery Point Objective\n• **WRT** - Work Recovery Time\n\n**Relationship:**\nMTD > RTO + WRT\n\n**Example:**\n• MTD = 24 hours (business fails after)\n• RTO = 8 hours (systems up in 8)\n• WRT = 4 hours (verify, catch up)\n• Total = 12 hours (within MTD)\n\n**Process Prioritization:**\nBased on impact of unavailability:\n• Revenue loss\n• Regulatory penalties\n• Customer impact\n• Reputational damage",
        },
        {
          title: 'Recovery Strategies',
          type: 'text',
          content: "**Strategy Options:**\n\n**Do Nothing**\n• Accept downtime\n• Cost: Lowest\n• Risk: Highest\n\n**Manual Procedures**\n• Paper-based workarounds\n• Limited functionality\n• Temporary solution\n\n**Reciprocal Agreements**\n• Partner shares facilities\n• Mutual arrangement\n• Limited capacity\n\n**Cold Site**\n• Empty facility\n• Requires equipment\n• Longest recovery\n\n**Warm Site**\n• Some equipment\n• Moderate recovery time\n• Cost/recovery balance\n\n**Hot Site**\n• Fully equipped\n• Fast recovery\n• Highest cost\n\n**Cloud/Mobile**\n• Cloud-based recovery\n• Flexible capacity\n• Subscription model",
        },
        {
          title: 'BC Plan Components',
          type: 'text',
          content: "**Plan Elements:**\n\n**Activation Procedures**\n• Triggering criteria\n• Declaration authority\n• Initial response steps\n\n**Contact Information**\n• Key personnel\n• Vendors and partners\n• Emergency services\n• Stakeholders\n\n**Recovery Procedures**\n• Step-by-step instructions\n• Resource requirements\n• Priority sequence\n• Dependencies\n\n**Communication Plan**\n• Internal communication\n• External communication\n• Media handling\n• Stakeholder updates\n\n**Return to Normal**\n• Criteria for return\n• Transition procedures\n• Verification steps",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "BCP covers entire business; DRP focuses on IT recovery",
            "BIA determines MTD, RTO, RPO for critical processes",
            "Recovery sites: cold (empty), warm (partial), hot (ready)",
            "BCP includes activation, contacts, recovery, communication, return",
            "MTD > RTO + WRT (recovery plus verification time)",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA4-007',
    courseId: 'cisa',
    section: 'CISA4',
    title: 'Disaster Recovery Planning',
    description: 'Master disaster recovery strategies and technical recovery procedures',
    order: 7,
    duration: 55,
    difficulty: 'advanced',
    topics: ['DRP', 'Recovery Sites', 'Backup Strategies', 'DR Testing'],
    blueprintArea: 'CISA4-C',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Disaster recovery restores IT systems after major disruptions. The difference between hours and days of recovery can mean business survival or failure.",
        },
        {
          title: 'Recovery Site Options',
          type: 'table',
          headers: ['Site Type', 'Description', 'Recovery Time', 'Cost'],
          rows: [
            ['Cold Site', 'Facility only, no equipment', 'Weeks', 'Lowest'],
            ['Warm Site', 'Facility + some equipment', 'Days', 'Medium'],
            ['Hot Site', 'Fully equipped and configured', 'Hours', 'High'],
            ['Mobile Site', 'Portable facility', 'Days', 'Medium'],
            ['Cloud DR', 'Cloud-based recovery', 'Minutes-Hours', 'Variable'],
          ],
        },
        {
          title: 'Backup Strategies',
          type: 'text',
          content: "**Backup Types:**\n\n**Full Backup**\n• Complete copy of all data\n• Longest backup time\n• Fastest restore\n• Highest storage use\n\n**Incremental Backup**\n• Changes since last backup\n• Fastest backup\n• Slowest restore (chain needed)\n• Least storage use\n\n**Differential Backup**\n• Changes since last full\n• Moderate backup time\n• Moderate restore time\n• Moderate storage\n\n**Common Strategy:**\nWeekly full + daily incremental or differential",
        },
        {
          title: '🧠 Memory Aid: Backup Types',
          type: 'callout',
          content: "**Incremental = Changes since last ANY backup**\nMon backup has Mon changes\nTue backup has Tue changes only\n\n**Differential = Changes since last FULL backup**\nMon backup has Mon changes\nTue backup has Mon + Tue changes\n\n*Incremental is smaller but needs more tapes to restore!*",
        },
        {
          title: 'Data Replication',
          type: 'text',
          content: "**Replication Types:**\n\n**Synchronous Replication**\n• Data written to both sites simultaneously\n• Zero data loss (RPO = 0)\n• Distance limited by latency\n• Performance impact\n\n**Asynchronous Replication**\n• Data written to DR after primary\n• Some data loss possible\n• No distance limitation\n• Minimal performance impact\n\n**Database-Specific:**\n• Log shipping\n• Database mirroring\n• Always-On availability groups\n• Active-passive clusters",
        },
        {
          title: 'DR Testing Types',
          type: 'text',
          content: "**Test Types (Least to Most Rigorous):**\n\n**1. Checklist Review**\n• Paper review of plans\n• Verify contact info\n• Check procedures current\n• Minimal disruption\n\n**2. Tabletop Exercise**\n• Walkthrough scenario\n• Discussion-based\n• Identify gaps\n• No actual recovery\n\n**3. Simulation**\n• Practice procedures\n• Role-playing\n• More realistic\n• Still no actual failover\n\n**4. Parallel Test**\n• Recover to DR site\n• Production continues\n• Validate systems work\n• No user cutover\n\n**5. Full Interruption**\n• Actual failover\n• Production stops\n• Real recovery\n• Highest risk, highest value",
        },
        {
          title: 'DR Plan Maintenance',
          type: 'text',
          content: "**Keeping Plans Current:**\n\n**Update Triggers:**\n• System changes\n• Personnel changes\n• Vendor changes\n• Address/location changes\n• After incidents\n• After tests\n• Regulatory changes\n\n**Review Schedule:**\n• Annual full review minimum\n• Quarterly contact verification\n• Monthly checklist reviews\n• After significant changes\n\n**Documentation:**\n• Version control\n• Change log\n• Approval records\n• Distribution list",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Recovery sites: cold (facility only) to hot (fully ready)",
            "Backup types: full, incremental (since last backup), differential (since last full)",
            "Synchronous replication = zero data loss; asynchronous = some loss possible",
            "DR tests: checklist, tabletop, simulation, parallel, full interruption",
            "Plans require regular updates and testing to remain effective",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA4-008',
    courseId: 'cisa',
    section: 'CISA4',
    title: 'BC/DR Testing and Exercises',
    description: 'Learn how to plan, conduct, and evaluate BC/DR tests',
    order: 8,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['BC Testing', 'Exercise Types', 'Test Planning', 'Results Analysis'],
    blueprintArea: 'CISA4-C',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Untested plans are untrusted plans. Testing validates that plans work, people know their roles, and recovery objectives can be met. The time to find gaps is during exercises, not actual disasters.",
        },
        {
          title: 'Test Planning Process',
          type: 'text',
          content: "**Exercise Planning Steps:**\n\n**1. Define Objectives**\n• What are we testing?\n• What do we want to learn?\n• Success criteria?\n\n**2. Select Scope**\n• Which systems/processes?\n• Which teams?\n• What scenarios?\n\n**3. Choose Type**\n• Tabletop vs. functional\n• Announced vs. surprise\n• Partial vs. full\n\n**4. Develop Scenario**\n• Realistic conditions\n• Inject events\n• Observer assignments\n\n**5. Conduct Exercise**\n• Brief participants\n• Execute scenario\n• Document observations\n• Debrief immediately\n\n**6. Analyze and Report**\n• Compile findings\n• Identify improvements\n• Track to completion",
        },
        {
          title: 'Exercise Comparison',
          type: 'table',
          headers: ['Type', 'Effort', 'Realism', 'Risk', 'Value'],
          rows: [
            ['Checklist', 'Very Low', 'None', 'None', 'Basic validation'],
            ['Tabletop', 'Low', 'Low', 'Very Low', 'Process/decision gaps'],
            ['Simulation', 'Medium', 'Medium', 'Low', 'Procedure testing'],
            ['Parallel', 'High', 'High', 'Medium', 'Technical validation'],
            ['Full Interruption', 'Very High', 'Highest', 'High', 'Complete validation'],
          ],
        },
        {
          title: 'Tabletop Exercise Design',
          type: 'text',
          content: "**Tabletop Best Practices:**\n\n**Preparation:**\n• Develop scenario narrative\n• Prepare inject cards\n• Assign facilitator\n• Invite right participants\n\n**Facilitation:**\n• Present scenario\n• Ask probing questions\n• Inject complications\n• Keep discussion focused\n\n**Discussion Points:**\n• Who makes decisions?\n• How do we communicate?\n• What if X happens?\n• Do we have resources needed?\n\n**Outputs:**\n• Action items\n• Gap identification\n• Plan updates needed\n• Training needs",
        },
        {
          title: 'Technical Testing',
          type: 'text',
          content: "**Functional Test Components:**\n\n**Recovery Testing:**\n• System restoration from backup\n• Application startup\n• Data integrity verification\n• Performance validation\n\n**Failover Testing:**\n• Automatic failover mechanisms\n• Manual failover procedures\n• Network cutover\n• DNS changes\n\n**Integration Testing:**\n• System dependencies\n• Third-party connectivity\n• End-to-end workflow\n• User acceptance\n\n**Measurement:**\n• Actual RTO achieved\n• Actual RPO achieved\n• Issues encountered\n• Variance from plan",
        },
        {
          title: 'Post-Exercise Activities',
          type: 'text',
          content: "**After the Exercise:**\n\n**Hot Wash (Immediate)**\n• Initial reactions\n• Major issues\n• Quick wins\n• Participants' perspectives\n\n**Detailed Analysis**\n• Compile observations\n• Analyze gaps\n• Root cause issues\n• Categorize findings\n\n**Improvement Plan**\n• Prioritized actions\n• Assigned owners\n• Target dates\n• Resource requirements\n\n**Reporting**\n• Executive summary\n• Detailed findings\n• Recommendations\n• Track to closure",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Exercise types range from checklist to full interruption",
            "Test planning: objectives, scope, type, scenario, execution, analysis",
            "Tabletops test decisions and processes with minimal risk",
            "Functional tests validate technical recovery capabilities",
            "Post-exercise review drives continuous improvement",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA4-009',
    courseId: 'cisa',
    section: 'CISA4',
    title: 'Problem Management',
    description: 'Understand problem management and root cause analysis techniques',
    order: 9,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Problem Management', 'Root Cause Analysis', 'Known Errors', 'Proactive PM'],
    blueprintArea: 'CISA4-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Problem management prevents recurring incidents. Without it, organizations keep firefighting the same issues. Root cause analysis breaks the cycle.",
        },
        {
          title: 'Problem Management Process',
          type: 'text',
          content: "**Problem Lifecycle:**\n\n**1. Problem Detection**\n• Triggered by recurring incidents\n• Trend analysis\n• Proactive identification\n• Customer complaints\n\n**2. Problem Logging**\n• Document in problem record\n• Link to related incidents\n• Assign ownership\n\n**3. Investigation**\n• Gather information\n• Root cause analysis\n• Known error identification\n\n**4. Resolution**\n• Develop permanent fix\n• Implement change\n• Close known error\n\n**5. Closure**\n• Verify resolution\n• Update knowledge base\n• Close problem record",
        },
        {
          title: 'Root Cause Analysis Techniques',
          type: 'table',
          headers: ['Technique', 'Description', 'Best For'],
          rows: [
            ['5 Whys', 'Ask why repeatedly', 'Simple problems'],
            ['Fishbone/Ishikawa', 'Cause-effect diagram', 'Complex problems'],
            ['Fault Tree', 'Top-down logic diagram', 'Safety/reliability'],
            ['Pareto Analysis', '80/20 rule prioritization', 'Prioritizing causes'],
            ['Timeline Analysis', 'Sequence of events', 'Incident investigation'],
          ],
        },
        {
          title: 'Five Whys Technique',
          type: 'text',
          content: "**Example: Server Crash**\n\n**Problem:** Server crashed causing outage\n\n1. **Why?** Memory exhausted\n2. **Why?** Memory leak in application\n3. **Why?** Bug in recent code release\n4. **Why?** Insufficient code review\n5. **Why?** Time pressure to release quickly\n\n**Root Cause:** Inadequate code review process\n\n**Fix:** Implement mandatory code review with checklist before releases\n\n**Key:** Keep asking until you reach an actionable root cause, typically 5 iterations.",
        },
        {
          title: 'Known Error Database',
          type: 'text',
          content: "**Known Error Management:**\n\n**Definition:**\nA known error is a problem with documented root cause and workaround (but not yet permanent fix).\n\n**KEDB Contents:**\n• Problem description\n• Root cause\n• Workaround procedures\n• Permanent fix status\n• Affected systems/services\n\n**Benefits:**\n• Faster incident resolution\n• Consistent troubleshooting\n• Knowledge preservation\n• Fix prioritization\n\n**Maintenance:**\n• Update when fixes implemented\n• Remove resolved known errors\n• Regular review for relevance",
        },
        {
          title: 'Proactive Problem Management',
          type: 'text',
          content: "**Proactive Approach:**\n\n**Trend Analysis**\n• Analyze incident patterns\n• Identify recurring issues\n• Spot emerging problems\n\n**Capacity/Performance**\n• Monitor thresholds\n• Predict future issues\n• Address before failure\n\n**Risk Assessment**\n• Identify potential problems\n• Assess likelihood/impact\n• Prevent issues proactively\n\n**Major Incident Review**\n• After significant incidents\n• Even if resolved\n• Determine if problem exists",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Problem management finds and addresses root causes",
            "Process: detect, log, investigate, resolve, close",
            "RCA techniques: 5 Whys, Fishbone, Fault Tree, Pareto",
            "Known errors document root cause and workaround",
            "Proactive PM identifies problems before incidents occur",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA4-010',
    courseId: 'cisa',
    section: 'CISA4',
    title: 'Backup and Recovery Operations',
    description: 'Master backup strategies, procedures, and recovery operations',
    order: 10,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Backup Operations', 'Media Management', 'Recovery Procedures', 'Data Protection'],
    blueprintArea: 'CISA4-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Backups are the last line of defense against data loss. But a backup is only valuable if you can restore from it. Many organizations learn this the hard way.",
        },
        {
          title: 'Backup Operation Controls',
          type: 'text',
          content: "**Backup Process Controls:**\n\n**Scheduling**\n• Documented backup schedule\n• Automated execution\n• Off-hours where possible\n• Conflict avoidance\n\n**Monitoring**\n• Backup job completion\n• Success/failure alerts\n• Capacity monitoring\n• Performance tracking\n\n**Verification**\n• Backup log review\n• Sample restore tests\n• Integrity checks\n• Media verification\n\n**Documentation**\n• Backup procedures\n• Recovery procedures\n• Media inventory\n• Retention records",
        },
        {
          title: 'Media Management',
          type: 'table',
          headers: ['Control', 'Purpose', 'Best Practice'],
          rows: [
            ['Labeling', 'Identification', 'Standardized naming, barcodes'],
            ['Rotation', 'Media life management', 'GFS, rotation schedules'],
            ['Off-site Storage', 'Geographic protection', 'Secure facility, transport'],
            ['Disposal', 'Prevent data leakage', 'Degaussing, destruction'],
            ['Inventory', 'Track all media', 'Regular reconciliation'],
          ],
        },
        {
          title: 'Grandfather-Father-Son (GFS)',
          type: 'text',
          content: "**GFS Rotation Scheme:**\n\n**Daily (Son)**\n• Mon-Thu backups\n• Rotate weekly\n• 4 tapes minimum\n\n**Weekly (Father)**\n• Friday full backup\n• 4-5 tapes\n• Rotated monthly\n\n**Monthly (Grandfather)**\n• End of month backup\n• 12 tapes\n• Annual rotation\n\n**Benefits:**\n• Multiple recovery points\n• Efficient tape usage\n• Long-term retention\n• Balanced cost",
        },
        {
          title: 'Off-Site Storage',
          type: 'text',
          content: "**Off-Site Considerations:**\n\n**Location Selection**\n• Geographic separation\n• Natural disaster zones\n• Accessibility\n• Security\n\n**Transport Security**\n• Encrypted media\n• Secure containers\n• Tracked delivery\n• Chain of custody\n\n**Storage Facility**\n• Climate control\n• Fire protection\n• Access controls\n• Insurance\n\n**Cloud Backup**\n• Encryption in transit/rest\n• Access management\n• Data location awareness\n• Vendor reliability",
        },
        {
          title: 'Recovery Testing',
          type: 'text',
          content: "**Recovery Test Requirements:**\n\n**What to Test:**\n• Complete system restores\n• Individual file restores\n• Database recovery\n• Application recovery\n\n**Test Frequency:**\n• Critical systems: Monthly minimum\n• Other systems: Quarterly\n• After major changes\n• Random sampling\n\n**Documentation:**\n• Test procedures\n• Test results\n• Recovery time achieved\n• Issues encountered\n\n**⚠️ Key Principle:** If you haven't tested a restore, you don't have a backup.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Backup controls include scheduling, monitoring, verification, documentation",
            "Media management covers labeling, rotation, off-site storage, disposal",
            "GFS rotation provides daily, weekly, and monthly recovery points",
            "Off-site storage requires geographic separation and security",
            "Regular recovery testing validates backup reliability",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA4-011',
    courseId: 'cisa',
    section: 'CISA4',
    title: 'IT Asset Management',
    description: 'Understand IT asset lifecycle management and inventory controls',
    order: 11,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Asset Management', 'ITAM', 'Software Licensing', 'Disposal'],
    blueprintArea: 'CISA4-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "You can't protect what you don't know you have. IT asset management provides the foundation for security, compliance, and cost optimization.",
        },
        {
          title: 'Asset Lifecycle Stages',
          type: 'text',
          content: "**ITAM Lifecycle:**\n\n**1. Planning and Procurement**\n• Requirements definition\n• Vendor selection\n• Purchase/lease decision\n• Contract negotiation\n\n**2. Deployment**\n• Receiving and logging\n• Configuration\n• Installation\n• Assignment\n\n**3. Operation**\n• Usage tracking\n• Maintenance\n• Updates and patches\n• Performance monitoring\n\n**4. Retirement**\n• Data sanitization\n• Disposal/recycling\n• Lease return\n• Record update",
        },
        {
          title: 'Asset Inventory Controls',
          type: 'table',
          headers: ['Control', 'Purpose', 'Method'],
          rows: [
            ['Registration', 'Record all assets', 'Upon receipt'],
            ['Tagging', 'Physical identification', 'Asset tags, barcodes'],
            ['Discovery', 'Find network assets', 'Automated scanning'],
            ['Reconciliation', 'Verify accuracy', 'Periodic physical counts'],
            ['Tracking', 'Location/assignment', 'CMDB/asset database'],
          ],
        },
        {
          title: 'Software Asset Management',
          type: 'text',
          content: "**SAM Objectives:**\n\n**License Compliance**\n• Track license entitlements\n• Monitor actual usage\n• Prevent under/over licensing\n• Audit preparation\n\n**Cost Optimization**\n• Eliminate unused licenses\n• Consolidate vendors\n• Negotiate volume discounts\n• Renewal management\n\n**Security**\n• Identify unauthorized software\n• Ensure supported versions\n• Patch compliance\n• Reduce attack surface\n\n**Key Reports:**\n• License position (owned vs. deployed)\n• Usage metrics\n• Expiring licenses\n• Compliance gaps",
        },
        {
          title: 'Asset Disposal Controls',
          type: 'text',
          content: "**Disposal Process:**\n\n**Data Sanitization**\n• Overwriting (multiple passes)\n• Degaussing (magnetic media)\n• Physical destruction\n• Cryptographic erasure\n\n**Documentation**\n• Disposal authorization\n• Sanitization certificate\n• Destruction certificate\n• Chain of custody\n\n**Environmental Compliance**\n• E-waste regulations\n• Certified recyclers\n• Hazardous materials\n• Documentation requirements\n\n**Liability:**\n• Data breach from disposed assets\n• Environmental violations\n• Audit trail maintenance",
        },
        {
          title: 'BYOD Considerations',
          type: 'text',
          content: "**Bring Your Own Device:**\n\n**Asset Management Challenges:**\n• Not organization-owned\n• Multiple devices per user\n• Personal/corporate data mix\n• Varying security posture\n\n**Required Controls:**\n• Device registration\n• MDM enrollment\n• Security requirements\n• Data protection\n• Remote wipe capability\n\n**Policy Elements:**\n• Acceptable use\n• Supported devices\n• Security requirements\n• Support boundaries\n• Liability",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Asset lifecycle: planning, deployment, operation, retirement",
            "Inventory controls: registration, tagging, discovery, reconciliation",
            "SAM ensures license compliance and cost optimization",
            "Disposal requires data sanitization and documentation",
            "BYOD requires additional controls for unowned devices",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA4-012',
    courseId: 'cisa',
    section: 'CISA4',
    title: 'Patch and Vulnerability Management',
    description: 'Learn how to manage vulnerabilities and apply security patches',
    order: 12,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Patch Management', 'Vulnerability Management', 'Risk Prioritization', 'Testing'],
    blueprintArea: 'CISA4-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Unpatched systems are the entry point for most breaches. Effective patch and vulnerability management closes security gaps before attackers can exploit them.",
        },
        {
          title: 'Vulnerability Management Process',
          type: 'text',
          content: "**VM Lifecycle:**\n\n**1. Discovery**\n• Inventory assets\n• Identify software\n• Map network\n\n**2. Scanning**\n• Vulnerability scans\n• Configuration assessments\n• Penetration testing\n\n**3. Analysis**\n• Validate findings\n• Prioritize by risk\n• Determine remediation\n\n**4. Remediation**\n• Apply patches\n• Configuration changes\n• Compensating controls\n\n**5. Verification**\n• Rescan to confirm\n• Test functionality\n• Document results\n\n**6. Reporting**\n• Metrics and trends\n• SLA compliance\n• Risk status",
        },
        {
          title: 'Vulnerability Prioritization',
          type: 'table',
          headers: ['Factor', 'High Priority', 'Lower Priority'],
          rows: [
            ['CVSS Score', '9.0+ Critical', 'Below 4.0 Low'],
            ['Exploitability', 'Active exploitation', 'Theoretical only'],
            ['Asset Criticality', 'Production systems', 'Test systems'],
            ['Exposure', 'Internet-facing', 'Internal only'],
            ['Data Sensitivity', 'PII, financial', 'Public data'],
          ],
        },
        {
          title: 'Patch Management Process',
          type: 'text',
          content: "**Patch Lifecycle:**\n\n**1. Identification**\n• Monitor vendor releases\n• Security advisories\n• Threat intelligence\n\n**2. Assessment**\n• Applicability\n• Urgency\n• Dependencies\n• Impact analysis\n\n**3. Testing**\n• Lab environment\n• Functionality testing\n• Compatibility testing\n• Rollback testing\n\n**4. Deployment**\n• Scheduled windows\n• Staged rollout\n• Monitoring\n• Rollback capability\n\n**5. Verification**\n• Confirm installation\n• Test functionality\n• Scan for closure",
        },
        {
          title: 'Patch Testing Requirements',
          type: 'text',
          content: "**Testing Approach:**\n\n**Why Test First:**\n• Patches can break functionality\n• Application compatibility\n• Integration issues\n• Performance impact\n\n**Test Environment:**\n• Representative of production\n• Isolated network\n• Subset of applications\n• Test data (sanitized)\n\n**Test Cases:**\n• Basic functionality\n• Critical business processes\n• Integration points\n• Performance benchmarks\n\n**Emergency Patches:**\n• Accelerated testing\n• Risk-based decision\n• Enhanced monitoring\n• Rollback ready",
        },
        {
          title: 'CVSS Overview',
          type: 'text',
          content: "**Common Vulnerability Scoring System:**\n\n**Score Ranges:**\n• 0.0: None\n• 0.1-3.9: Low\n• 4.0-6.9: Medium\n• 7.0-8.9: High\n• 9.0-10.0: Critical\n\n**Scoring Factors:**\n• Attack vector (network, local, etc.)\n• Attack complexity\n• Privileges required\n• User interaction\n• Scope\n• Impact (CIA)\n\n**Limitations:**\n• Doesn't consider your specific environment\n• Use with asset criticality for prioritization\n• Consider exploitability in the wild",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "VM process: discover, scan, analyze, remediate, verify, report",
            "Prioritize by CVSS, exploitability, asset criticality, exposure",
            "Patch process: identify, assess, test, deploy, verify",
            "Always test patches before deploying to production",
            "CVSS provides baseline severity; combine with context for priority",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA4-013',
    courseId: 'cisa',
    section: 'CISA4',
    title: 'Cloud Operations and SLA Management',
    description: 'Understand cloud service operations and service level agreement management',
    order: 13,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Cloud Operations', 'SLA Management', 'Cloud Monitoring', 'Service Governance'],
    blueprintArea: 'CISA4-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Cloud services shift operational responsibilities but not accountability. Auditors must verify that cloud operations meet business requirements and SLAs are properly managed.",
        },
        {
          title: 'Cloud Service Models',
          type: 'table',
          headers: ['Model', 'Provider Manages', 'Customer Manages'],
          rows: [
            ['IaaS', 'Infrastructure, virtualization', 'OS, middleware, applications, data'],
            ['PaaS', 'Infrastructure through runtime', 'Applications and data'],
            ['SaaS', 'Everything technical', 'Configuration, user access, data'],
          ],
        },
        {
          title: 'Cloud Operations Controls',
          type: 'text',
          content: "**Key Control Areas:**\n\n**Identity and Access**\n• Federated identity\n• Multi-factor authentication\n• Privileged access management\n• Access reviews\n\n**Data Protection**\n• Encryption at rest\n• Encryption in transit\n• Key management\n• Data loss prevention\n\n**Network Security**\n• Virtual network segmentation\n• Firewalls and security groups\n• Web application firewall (WAF)\n• DDoS protection\n\n**Monitoring and Logging**\n• Cloud-native monitoring\n• Log aggregation\n• SIEM integration\n• Alert management",
        },
        {
          title: 'SLA Key Elements',
          type: 'text',
          content: "**Essential SLA Components:**\n\n**Availability Commitments**\n• Uptime percentage (99.9%, 99.99%)\n• Measurement method\n• Exclusions and maintenance windows\n• Credit/remedy for breach\n\n**Performance Metrics**\n• Response time\n• Throughput\n• Latency\n• Error rates\n\n**Support Levels**\n• Severity definitions\n• Response times by severity\n• Escalation procedures\n• Support hours\n\n**Security and Compliance**\n• Security certifications\n• Audit rights\n• Breach notification\n• Data handling",
        },
        {
          title: 'SLA Monitoring',
          type: 'text',
          content: "**Monitoring Requirements:**\n\n**What to Monitor:**\n• Actual vs. committed availability\n• Performance against baselines\n• Incident response times\n• Security events\n\n**How to Verify:**\n• Independent monitoring tools\n• Provider dashboards\n• Third-party attestations (SOC reports)\n• Synthetic transactions\n\n**Governance Activities:**\n• Regular SLA review meetings\n• Trend analysis\n• Credit claims when applicable\n• Contract renewal planning",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Cloud responsibility varies by service model (IaaS, PaaS, SaaS)",
            "Key controls: identity, data protection, network security, monitoring",
            "SLAs must define availability, performance, support, and security",
            "Independent monitoring verifies provider SLA compliance",
            "Regular governance ensures SLAs continue to meet business needs",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA4-014',
    courseId: 'cisa',
    section: 'CISA4',
    title: 'IT Service Continuity Management',
    description: 'Learn comprehensive IT service continuity planning and management',
    order: 14,
    duration: 55,
    difficulty: 'advanced',
    topics: ['ITSCM', 'Business Continuity', 'Recovery Strategies', 'Continuity Testing'],
    blueprintArea: 'CISA4-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "IT Service Continuity Management (ITSCM) ensures IT can support business operations during and after disruptions. It's a critical component of Business Continuity Management (BCM).",
        },
        {
          title: 'ITSCM Process',
          type: 'text',
          content: "**ITSCM Lifecycle:**\n\n**1. Initiation**\n• Define scope\n• Establish governance\n• Allocate resources\n• Identify stakeholders\n\n**2. Requirements Analysis**\n• Business Impact Analysis (BIA)\n• Risk assessment\n• Recovery objectives (RTO, RPO)\n• Critical IT services\n\n**3. Strategy Development**\n• Recovery options\n• Cost-benefit analysis\n• Resource requirements\n• Vendor strategies\n\n**4. Implementation**\n• Develop plans\n• Establish recovery sites\n• Implement solutions\n• Train staff\n\n**5. Operation**\n• Testing and exercises\n• Maintenance and updates\n• Continuous improvement\n• Audit and review",
        },
        {
          title: 'Recovery Options',
          type: 'table',
          headers: ['Site Type', 'Description', 'Recovery Time', 'Cost'],
          rows: [
            ['Hot Site', 'Fully equipped, data synced', 'Hours', 'High'],
            ['Warm Site', 'Partial equipment, recent backup', '1-3 days', 'Medium'],
            ['Cold Site', 'Basic facility only', 'Days to weeks', 'Low'],
            ['Mobile Site', 'Transportable facility', '1-2 days', 'Medium'],
            ['Cloud DR', 'Virtual infrastructure', 'Minutes to hours', 'Variable'],
          ],
        },
        {
          title: 'Data Replication Strategies',
          type: 'text',
          content: "**Replication Methods:**\n\n**Synchronous Replication**\n• Zero data loss (RPO = 0)\n• Transactions committed at both sites\n• Distance limited (latency impact)\n• Higher cost\n\n**Asynchronous Replication**\n• Near-zero data loss\n• Some transaction lag\n• Greater distance supported\n• Lower cost\n\n**Backup Strategies**\n• Full backup (complete copy)\n• Incremental (changes since last backup)\n• Differential (changes since last full)\n• Continuous Data Protection (CDP)",
        },
        {
          title: 'Continuity Testing Types',
          type: 'text',
          content: "**Testing Approaches:**\n\n**Plan Review**\n• Desk check of documentation\n• Identify gaps and outdated info\n• Low cost/risk\n• Limited assurance\n\n**Walkthrough/Tabletop**\n• Team reviews procedures\n• Discussion-based\n• Identifies coordination issues\n• Moderate assurance\n\n**Simulation/Drill**\n• Scenario-based exercise\n• Mobilize recovery teams\n• Practice procedures\n• Higher assurance\n\n**Full Interruption Test**\n• Actual failover to recovery site\n• Real operations at DR site\n• Highest assurance\n• Highest risk/cost",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "ITSCM aligns IT recovery with business continuity requirements",
            "BIA drives RTO/RPO requirements for critical IT services",
            "Site options: hot, warm, cold, mobile, cloud - balance cost with recovery time",
            "Sync replication for zero data loss; async for cost efficiency",
            "Regular testing validates plans - progress from walkthroughs to full tests",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA4-015',
    courseId: 'cisa',
    section: 'CISA4',
    title: 'End-User Computing Controls',
    description: 'Understand controls for spreadsheets, databases, and user-developed applications',
    order: 15,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['End-User Computing', 'Spreadsheet Controls', 'Shadow IT', 'Data Governance'],
    blueprintArea: 'CISA4-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "End-user computing (EUC) applications like spreadsheets often support critical business processes but lack the controls of formal systems. Uncontrolled EUC creates significant operational and financial risk.",
        },
        {
          title: 'EUC Risk Areas',
          type: 'text',
          content: "**Key Risks:**\n\n**Data Integrity**\n• Formula errors\n• Manual data entry mistakes\n• Version confusion\n• Unauthorized changes\n\n**Availability**\n• Single points of failure\n• No disaster recovery\n• Key person dependency\n• Lack of documentation\n\n**Security**\n• Inadequate access controls\n• Sensitive data exposure\n• Lack of audit trails\n• Unencrypted storage\n\n**Compliance**\n• Regulatory requirements\n• Audit trail gaps\n• Data retention issues\n• SOX/regulatory exposure",
        },
        {
          title: 'EUC Control Framework',
          type: 'table',
          headers: ['Control Area', 'Key Controls', 'Purpose'],
          rows: [
            ['Inventory', 'Registration, classification', 'Know what exists'],
            ['Development', 'Testing, review, approval', 'Ensure accuracy'],
            ['Change Control', 'Version control, documentation', 'Maintain integrity'],
            ['Access', 'Protection, permissions', 'Prevent unauthorized changes'],
            ['Backup', 'Regular backup, recovery testing', 'Ensure availability'],
          ],
        },
        {
          title: 'Spreadsheet Controls',
          type: 'text',
          content: "**Specific Spreadsheet Controls:**\n\n**Design Controls**\n• Separate inputs from calculations\n• Clear cell labeling\n• Formula documentation\n• Error checking formulas\n\n**Integrity Controls**\n• Cell protection\n• Data validation\n• Input range checks\n• Formula auditing\n\n**Operational Controls**\n• Version numbering\n• Change log\n• Backup copies\n• Access restrictions\n\n**Review Controls**\n• Independent formula review\n• Periodic accuracy testing\n• Comparison to source data\n• Reasonableness checks",
        },
        {
          title: 'Shadow IT Management',
          type: 'text',
          content: "**Addressing Shadow IT:**\n\n**Discovery**\n• Network monitoring\n• Cloud access security brokers\n• User surveys\n• Expense report analysis\n\n**Risk Assessment**\n• Data sensitivity\n• Business criticality\n• Compliance implications\n• Security posture\n\n**Governance Options**\n• Sanctioned vs. unsanctioned\n• Migration to approved tools\n• Added to enterprise controls\n• Accepted with monitoring\n\n**Prevention**\n• Responsive IT services\n• Easy provisioning\n• User education\n• Clear policies",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "EUC risks: data integrity, availability, security, compliance",
            "Maintain inventory of critical EUC applications",
            "Spreadsheet controls: design, integrity, operational, review",
            "Shadow IT requires discovery, assessment, and governance",
            "Balance EUC flexibility with appropriate risk controls",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA4-016',
    courseId: 'cisa',
    section: 'CISA4',
    title: 'Performance and Capacity Management',
    description: 'Learn to audit IT performance monitoring and capacity planning processes',
    order: 16,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Performance Management', 'Capacity Planning', 'SLA Monitoring', 'Trend Analysis'],
    blueprintArea: 'CISA4-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Poor performance impacts user productivity and customer satisfaction. Inadequate capacity leads to outages during peak demand. Proactive management prevents costly problems.",
        },
        {
          title: 'Performance Management',
          type: 'text',
          content: "**Performance Monitoring:**\n\n**Infrastructure Metrics**\n• CPU utilization\n• Memory usage\n• Disk I/O and latency\n• Network bandwidth/latency\n\n**Application Metrics**\n• Response time\n• Transaction throughput\n• Error rates\n• User concurrency\n\n**Business Metrics**\n• SLA achievement\n• User satisfaction\n• Business process completion\n• Revenue impact\n\n**Monitoring Tools**\n• Real-time dashboards\n• Historical trending\n• Alerting and notification\n• Root cause analysis",
        },
        {
          title: 'Performance Baselines',
          type: 'table',
          headers: ['Baseline Type', 'Purpose', 'Refresh Frequency'],
          rows: [
            ['Normal Operations', 'Detect anomalies', 'Quarterly'],
            ['Peak Periods', 'Plan for high demand', 'Annually'],
            ['Post-Change', 'Validate changes', 'After major changes'],
            ['Degradation Trend', 'Predict issues', 'Monthly review'],
          ],
        },
        {
          title: 'Capacity Planning Process',
          type: 'text',
          content: "**Capacity Management:**\n\n**1. Demand Analysis**\n• Current utilization\n• Growth trends\n• Business forecasts\n• Planned projects\n\n**2. Resource Analysis**\n• Current capacity\n• Component limits\n• Scalability options\n• Technology refresh\n\n**3. Gap Analysis**\n• Demand vs. capacity\n• Timeline to threshold\n• Risk assessment\n• Priority ranking\n\n**4. Planning**\n• Capacity additions\n• Budget requirements\n• Implementation timeline\n• Alternative strategies\n\n**5. Implementation**\n• Procurement\n• Installation\n• Testing\n• Cutover",
        },
        {
          title: 'Capacity Strategies',
          type: 'text',
          content: "**Capacity Options:**\n\n**Lead Strategy**\n• Add capacity before need\n• Lower risk of shortage\n• Higher carrying cost\n• Good for predictable growth\n\n**Lag Strategy**\n• Add capacity after demand\n• Lower cost, higher risk\n• Reactive approach\n• May cause performance issues\n\n**Match Strategy**\n• Incremental additions\n• Balance cost and risk\n• Requires good forecasting\n• Most common approach\n\n**Cloud Elasticity**\n• On-demand scaling\n• Pay-per-use\n• Rapid provisioning\n• Ideal for variable workloads",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Monitor infrastructure, application, and business metrics",
            "Establish and maintain performance baselines",
            "Capacity planning: demand analysis, resource analysis, gap analysis, planning",
            "Strategies: lead (proactive), lag (reactive), match (balanced), elastic (cloud)",
            "Proactive capacity management prevents performance crises",
          ],
        },
      ],
    },
  },
];

export default cisa4Lessons;
