/**
 * CISA Domain 4: Information Systems Operations and Business Resilience - Batch 2
 * Coverage: Advanced operations management, incident response, and disaster recovery
 */

import { Lesson } from '../../../types';

export const cisa4LessonsBatch2: Lesson[] = [
  // ===========================================================================
  // INCIDENT MANAGEMENT AND RESPONSE
  // ===========================================================================
  
  {
    id: 'CISA4-017',
    courseId: 'cisa',
    section: 'CISA4',
    title: 'Security Incident Management',
    description: 'Master the incident response lifecycle and auditing of incident management processes',
    order: 17,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Incident Response', 'NIST Framework', 'Incident Categories', 'Forensics'],
    blueprintArea: 'CISA4-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Security incidents are inevitable. The effectiveness of detection and response determines whether a minor incident becomes a major breach. This is a heavily tested CISA topic.",
        },
        {
          title: 'Incident Response Lifecycle (NIST SP 800-61)',
          type: 'text',
          content: "**Phase 1: Preparation**\n• Develop incident response plan\n• Train incident response team\n• Acquire necessary tools and resources\n• Establish communication procedures\n• Conduct tabletop exercises\n\n**Phase 2: Detection and Analysis**\n• Monitor for indicators of compromise\n• Analyze alerts and logs\n• Categorize and prioritize incidents\n• Document findings\n• Notify appropriate stakeholders\n\n**Phase 3: Containment, Eradication, Remediation**\n• Contain to prevent spread\n• Eradicate malware/vulnerabilities\n• Recover systems and data\n• Verify successful remediation\n\n**Phase 4: Post-Incident Activity**\n• Conduct lessons learned\n• Update response procedures\n• Improve controls\n• Prepare incident report",
        },
        {
          title: '🧠 Memory Aid: PCAR',
          type: 'callout',
          content: "**Incident Response Phases: PCAR**\n\n• **P**reparation - Get ready before incidents occur\n• **C**atch (Detection) - Find and analyze the incident\n• **A**ct (Containment/Eradication) - Stop and remove the threat\n• **R**eview (Post-Incident) - Learn and improve\n\nThink: \"Police CAR\" responds to incidents!",
        },
        {
          title: 'Incident Severity Classification',
          type: 'table',
          headers: ['Severity', 'Definition', 'Response Time', 'Example'],
          rows: [
            ['Critical (P1)', 'Business-critical impact, data breach, safety', 'Immediate (minutes)', 'Ransomware spreading, major data exfiltration'],
            ['High (P2)', 'Significant business impact, multiple users', '1-4 hours', 'Critical server compromised, widespread malware'],
            ['Medium (P3)', 'Moderate impact, limited scope', '4-24 hours', 'Phishing compromise, malware on single workstation'],
            ['Low (P4)', 'Minimal impact, informational', '24-72 hours', 'Policy violation, minor malware blocked'],
          ],
        },
        {
          title: 'Key Incident Response Roles',
          type: 'text',
          content: "**Incident Commander**\n• Overall authority during incident\n• Makes escalation decisions\n• Coordinates resources\n• Communicates with executives\n\n**Technical Lead**\n• Directs technical analysis\n• Coordinates containment actions\n• Oversees eradication and recovery\n\n**Communications Lead**\n• Internal stakeholder updates\n• External communications (if needed)\n• Regulatory notifications\n• Media relations\n\n**Legal/Compliance**\n• Advise on notification requirements\n• Evidence preservation\n• Regulatory interface\n\n**Forensic Analyst**\n• Preserve evidence\n• Conduct technical analysis\n• Timeline reconstruction\n• Report findings",
        },
        {
          title: 'Evidence Preservation and Chain of Custody',
          type: 'text',
          content: "**Digital Evidence Principles:**\n\n**Acquisition Order (Volatility):**\n1. Register, cache memory\n2. Routing table, process table, RAM\n3. Temporary file systems\n4. Disk/persistent storage\n5. Remote logs and monitoring data\n6. Physical configuration, network topology\n7. Archival media (backup tapes)\n\n**Chain of Custody:**\n• Document who collected evidence\n• Record date, time, location\n• Track all transfers\n• Secure storage\n• Maintain integrity hashes\n• Document any analysis performed\n\n**Best Practices:**\n• Create forensic images (don't work on originals)\n• Use write blockers\n• Document everything\n• Have witnesses when possible",
        },
        {
          title: 'Auditing Incident Response',
          type: 'text',
          content: "**Audit Areas:**\n\n**Preparation:**\n• Is there a documented IR plan?\n• Is the IR team trained and capable?\n• Are roles and responsibilities clear?\n• Are communication procedures established?\n\n**Detection:**\n• Are monitoring tools adequate?\n• Are alerts reviewed timely?\n• Is severity classification appropriate?\n\n**Response:**\n• Are containment procedures effective?\n• Is evidence properly preserved?\n• Are incidents resolved effectively?\n\n**Recovery:**\n• Are systems restored securely?\n• Is normal operation verified?\n• Are root causes addressed?\n\n**Improvement:**\n• Are lessons learned conducted?\n• Are procedures updated?\n• Are metrics tracked?",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Incident response has 4 phases: Preparation, Detection/Analysis, Containment/Eradication/Recovery, Post-Incident",
            "Incidents should be classified by severity to prioritize response",
            "Evidence must be preserved in order of volatility (most volatile first)",
            "Chain of custody documentation is critical for potential legal proceedings",
            "Auditors should evaluate all phases of the incident response capability",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA4-018',
    courseId: 'cisa',
    section: 'CISA4',
    title: 'Business Continuity Planning',
    description: 'Understand how to audit BCP programs for adequate coverage and testing',
    order: 18,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['BCP', 'Business Impact Analysis', 'Recovery Strategies', 'Plan Testing'],
    blueprintArea: 'CISA4-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Business continuity ensures organizations survive disruptions. IS auditors must evaluate whether BCP is comprehensive, tested, and maintained.",
        },
        {
          title: 'BCP vs. DRP',
          type: 'table',
          headers: ['Aspect', 'Business Continuity (BCP)', 'Disaster Recovery (DRP)'],
          rows: [
            ['Focus', 'Entire business operations', 'IT systems and infrastructure'],
            ['Scope', 'People, processes, facilities, technology', 'Technology recovery'],
            ['Goal', 'Maintain critical business functions', 'Restore IT services'],
            ['Timeframe', 'Immediate through long-term', 'Technical recovery timeline'],
            ['Ownership', 'Business management', 'IT management'],
            ['Relationship', 'Umbrella framework', 'Subset of BCP'],
          ],
        },
        {
          title: 'Business Impact Analysis (BIA)',
          type: 'text',
          content: "**Purpose:**\nIdentify critical business functions and the impact of their disruption.\n\n**Key BIA Outputs:**\n\n**Recovery Time Objective (RTO)**\n• Maximum time a function can be unavailable\n• After RTO, impact becomes unacceptable\n• Drives recovery strategy selection\n\n**Recovery Point Objective (RPO)**\n• Maximum acceptable data loss\n• Measured in time (hours, days)\n• Drives backup frequency\n\n**Maximum Tolerable Downtime (MTD)**\n• Absolute limit before business fails\n• Must be greater than or equal to RTO\n• Also called Maximum Tolerable Period of Disruption (MTPD)\n\n**Process Dependencies:**\n• Upstream and downstream processes\n• Critical vendors\n• Technology dependencies",
        },
        {
          title: '🧠 Memory Aid: RTO vs RPO',
          type: 'callout',
          content: "**RTO = Time to Recover (how long to get back up)**\n**RPO = Point of Return (how far back for data)**\n\nExample:\n• RTO = 4 hours: Must recover systems within 4 hours\n• RPO = 1 hour: Can lose up to 1 hour of data\n\nIf you backup every hour and disaster strikes, you lose at most 1 hour of data (RPO met).",
        },
        {
          title: 'Recovery Strategies',
          type: 'table',
          headers: ['Strategy', 'Description', 'RTO', 'Cost'],
          rows: [
            ['Hot Site', 'Fully equipped, data synced, ready to go', 'Minutes-Hours', 'Very High'],
            ['Warm Site', 'Equipped facility, may need data restore', 'Hours-Days', 'Moderate'],
            ['Cold Site', 'Empty facility, requires equipment setup', 'Days-Weeks', 'Low'],
            ['Mobile Site', 'Portable recovery unit', 'Days', 'Moderate'],
            ['Reciprocal Agreement', 'Partner provides space in emergency', 'Days', 'Low'],
            ['Cloud-Based', 'On-demand recovery in cloud', 'Minutes-Hours', 'Variable'],
          ],
        },
        {
          title: 'BCP Testing Types',
          type: 'text',
          content: "**1. Checklist Review (Paper Test)**\n• Participants review plan documents\n• No actual testing action\n• Validates plan completeness\n• Least disruptive, least effective\n\n**2. Tabletop Exercise/Walkthrough**\n• Participants discuss scenario\n• Walk through procedures verbally\n• Identify gaps in procedures\n• Low risk, moderate effectiveness\n\n**3. Simulation Test**\n• Scenario-based role playing\n• Teams respond as if real\n• Tests decision-making\n• Moderate effort and effectiveness\n\n**4. Parallel Test**\n• Activate alternate site\n• Recover systems without disrupting production\n• Validates technical capabilities\n• High effort, high value\n\n**5. Full Interruption Test**\n• Actually fail over operations\n• Production moves to alternate site\n• Highest risk but most thorough\n• Rarely performed",
        },
        {
          title: 'BCP Audit Considerations',
          type: 'text',
          content: "**Governance:**\n• Is there senior management commitment?\n• Are roles and responsibilities defined?\n• Is there a BCP policy?\n• Is budget adequate?\n\n**Risk Assessment:**\n• Were threats and vulnerabilities identified?\n• Is the BIA current and comprehensive?\n• Are critical processes identified?\n• Are RTOs and RPOs defined?\n\n**Strategies:**\n• Are recovery strategies aligned with RTOs?\n• Are alternate sites appropriate?\n• Are vendor dependencies addressed?\n• Are manual workarounds defined?\n\n**Plan Documentation:**\n• Is the plan complete and current?\n• Are contact lists maintained?\n• Are procedures actionable?\n• Is the plan accessible during disaster?\n\n**Testing:**\n• Is testing frequency adequate?\n• Are tests realistic?\n• Are lessons learned documented?\n• Is the plan updated based on tests?",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "BCP covers entire business; DRP focuses on IT recovery",
            "BIA identifies critical functions and defines RTO, RPO, MTD",
            "RTO = time to recover; RPO = acceptable data loss; RTO ≤ MTD",
            "Hot site = fastest recovery, highest cost; Cold site = slowest, lowest cost",
            "Testing ranges from checklist review (least effective) to full interruption (most thorough)",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA4-019',
    courseId: 'cisa',
    section: 'CISA4',
    title: 'Data Backup and Recovery',
    description: 'Learn data protection strategies and audit considerations for backup systems',
    order: 19,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Backup Strategies', 'Backup Types', 'Restoration', 'Offsite Storage'],
    blueprintArea: 'CISA4-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Backups are the last line of defense against data loss. Understanding backup strategies helps auditors evaluate whether data can actually be recovered when needed.",
        },
        {
          title: 'Backup Types',
          type: 'table',
          headers: ['Type', 'What It Backs Up', 'Pros', 'Cons'],
          rows: [
            ['Full', 'All selected data', 'Complete, simple restore', 'Time-consuming, storage-intensive'],
            ['Incremental', 'Changed since last backup (any)', 'Fastest backup, least storage', 'Slow restore (need all incrementals)'],
            ['Differential', 'Changed since last FULL backup', 'Faster restore than incremental', 'Growing backup size until next full'],
            ['Synthetic Full', 'Combines full + incrementals', 'No full backup window needed', 'Complex, requires processing'],
          ],
        },
        {
          title: 'Backup Strategy: The 3-2-1 Rule',
          type: 'text',
          content: "**The 3-2-1 Backup Rule:**\n\n• **3** copies of data (production + 2 backups)\n• **2** different storage media types\n• **1** copy offsite or in the cloud\n\n**Enhanced: 3-2-1-1-0:**\n• 3 copies\n• 2 different media\n• 1 offsite\n• 1 offline (air-gapped, immutable)\n• 0 errors (verified backups)\n\n**Why Air-Gapped/Immutable Matters:**\n• Ransomware can encrypt connected backups\n• Offline or immutable backups can't be attacked\n• Critical for recovery from ransomware",
        },
        {
          title: '🧠 Memory Aid: Incremental vs Differential',
          type: 'callout',
          content: "**INCREMENTAL = \"Since LAST backup\" (any type)**\nSmall backups, but need FULL + ALL incrementals to restore\n\n**DIFFERENTIAL = \"Since last FULL backup\"**\nGrowing backups, but only need FULL + LAST differential to restore\n\nDifferential = Depends only on the Full\nIncremental = Includes all the In-betweens",
        },
        {
          title: 'Backup Retention and Rotation',
          type: 'text',
          content: "**Common Rotation Schemes:**\n\n**Grandfather-Father-Son (GFS):**\n• Daily backups (Sons) - rotate weekly\n• Weekly backups (Fathers) - retain 4 weeks\n• Monthly backups (Grandfathers) - retain 12 months\n• Annual backups - retain per policy (often 7 years)\n\n**Tower of Hanoi:**\n• Mathematical rotation pattern\n• Maximizes coverage with limited media\n• More complex to manage\n\n**Retention Considerations:**\n• Legal and regulatory requirements\n• Business requirements\n• Storage costs\n• Data sensitivity\n• Recovery scenarios",
        },
        {
          title: 'Backup Testing and Validation',
          type: 'text',
          content: "**Verification Methods:**\n\n**Automated Verification:**\n• Backup software validates completion\n• Checksum verification\n• Logs success/failure\n\n**Manual Verification:**\n• Restore test to separate location\n• Verify file integrity\n• Open and validate applications\n• Test database consistency\n\n**Testing Frequency:**\n• Critical systems: Monthly at minimum\n• Important systems: Quarterly\n• All systems: Annually\n• Document test results\n\n**What to Test:**\n• Can the backup media be read?\n• Are all expected files present?\n• Is data intact and usable?\n• How long does restore actually take?",
        },
        {
          title: 'Offsite Storage Considerations',
          type: 'text',
          content: "**Physical Offsite:**\n• Minimum distance from primary site\n• Consider natural disaster zones\n• Secure transportation\n• Controlled facility access\n• Environmental controls\n\n**Cloud Backup:**\n• Encryption in transit and at rest\n• Provider security controls (SOC 2)\n• Data residency requirements\n• Bandwidth for recovery\n• Costs for egress\n\n**Key Audit Questions:**\n• Where are backups stored?\n• How are they protected?\n• Can they be accessed during a disaster?\n• Are they far enough from primary site?\n• Is there a documented retrieval process?",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Full = all data; Incremental = since last backup; Differential = since last full",
            "3-2-1 rule: 3 copies, 2 media types, 1 offsite",
            "Air-gapped/immutable backups protect against ransomware",
            "GFS rotation provides daily, weekly, monthly, and annual retention",
            "Backup testing is essential - an untested backup is not a backup",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA4-020',
    courseId: 'cisa',
    section: 'CISA4',
    title: 'IT Service Management',
    description: 'Understand ITSM frameworks and auditing IT service delivery',
    order: 20,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['ITSM', 'ITIL', 'Service Desk', 'Problem Management', 'Change Management'],
    blueprintArea: 'CISA4-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "IT Service Management provides structured processes for delivering quality IT services. Understanding ITSM helps auditors evaluate operational effectiveness.",
        },
        {
          title: 'ITIL Framework Overview',
          type: 'text',
          content: "**ITIL = IT Infrastructure Library**\n\nBest practice framework for IT service management.\n\n**ITIL 4 Service Value System:**\n\n**Guiding Principles:**\n• Focus on value\n• Start where you are\n• Progress iteratively with feedback\n• Collaborate and promote visibility\n• Think and work holistically\n• Keep it simple and practical\n• Optimize and automate\n\n**Core Components:**\n• Service Value Chain\n• Practices (34 management practices)\n• Continual Improvement",
        },
        {
          title: 'Key ITSM Processes',
          type: 'table',
          headers: ['Process', 'Purpose', 'Key Metrics'],
          rows: [
            ['Incident Management', 'Restore normal service quickly', 'Mean time to restore (MTTR), First call resolution'],
            ['Problem Management', 'Eliminate root causes', 'Known errors, Repeat incidents'],
            ['Change Management', 'Minimize risk from changes', 'Failed change rate, Emergency changes'],
            ['Service Request', 'Fulfill standard requests', 'Request fulfillment time, User satisfaction'],
            ['Configuration Management', 'Maintain accurate CMDB', 'CI accuracy, Unauthorized changes'],
            ['Service Level Management', 'Ensure SLAs are met', 'SLA compliance, Service availability'],
          ],
        },
        {
          title: 'Incident vs. Problem Management',
          type: 'text',
          content: "**Incident Management:**\n• Goal: Restore service ASAP\n• Focus: Symptom resolution\n• Question: \"How do we get this working again?\"\n• Metric: Speed of restoration\n\n**Problem Management:**\n• Goal: Prevent future incidents\n• Focus: Root cause elimination\n• Question: \"Why did this happen?\"\n• Metric: Reduction in incidents\n\n**The Relationship:**\n1. Multiple incidents may be symptoms of one problem\n2. Incident management identifies patterns\n3. Problem management investigates root cause\n4. Known errors document workarounds\n5. Permanent fix eliminates the problem",
        },
        {
          title: '🧠 Memory Aid: Incident vs Problem',
          type: 'callout',
          content: "**INCIDENT = \"Put out the fire\"** (restore service now!)\n**PROBLEM = \"Install smoke detectors\"** (prevent future fires)\n\nIncident: User can't print → Get them printing\nProblem: Why do print jobs keep failing? → Fix the driver conflict",
        },
        {
          title: 'Service Level Management',
          type: 'text',
          content: "**Service Level Agreement (SLA):**\n• Agreement between IT and business\n• Defines service expectations\n• Measurable targets\n• Remedies for non-performance\n\n**Operational Level Agreement (OLA):**\n• Agreement between IT groups\n• Internal support commitments\n• Enables SLA delivery\n\n**Underpinning Contract (UC):**\n• Agreement with external vendor\n• Supports SLA commitments\n• Includes penalties for non-performance\n\n**Key SLA Metrics:**\n• Availability (e.g., 99.9% uptime)\n• Response time (e.g., 4-hour response)\n• Resolution time (e.g., 24-hour resolution)\n• Performance (e.g., transaction time)",
        },
        {
          title: 'Auditing ITSM Processes',
          type: 'text',
          content: "**Incident Management:**\n• Are incidents logged and categorized?\n• Are response times meeting SLAs?\n• Is there appropriate escalation?\n• Are users notified of status?\n\n**Problem Management:**\n• Are recurring incidents identified?\n• Is root cause analysis performed?\n• Are known errors documented?\n• Are problems closed properly?\n\n**Change Management:**\n• Are all changes authorized?\n• Is impact assessment performed?\n• Is testing adequate?\n• Are failed changes analyzed?\n\n**Configuration Management:**\n• Is the CMDB accurate and current?\n• Are relationships documented?\n• Is the CMDB used for impact analysis?\n• Are CIs reconciled periodically?",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "ITIL provides best practices for IT service management",
            "Incident management restores service; problem management prevents recurrence",
            "SLAs document agreements with business; OLAs are internal IT agreements",
            "Change management controls modifications to minimize risk",
            "CMDB (Configuration Management Database) tracks IT assets and relationships",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA4-021',
    courseId: 'cisa',
    section: 'CISA4',
    title: 'Capacity and Performance Management',
    description: 'Learn to evaluate IT capacity planning and performance monitoring',
    order: 21,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Capacity Planning', 'Performance Monitoring', 'Tuning', 'Resource Optimization'],
    blueprintArea: 'CISA4-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Adequate capacity ensures systems can meet business demands. Poor capacity planning leads to performance issues, outages, and failed business processes.",
        },
        {
          title: 'Capacity Management Process',
          type: 'text',
          content: "**Key Activities:**\n\n**Demand Management:**\n• Forecast future requirements\n• Understand business growth plans\n• Identify seasonal patterns\n• Model what-if scenarios\n\n**Capacity Planning:**\n• Translate demand into resource needs\n• Plan infrastructure expansion\n• Budget for growth\n• Lead time for procurement\n\n**Performance Monitoring:**\n• Track resource utilization\n• Identify bottlenecks\n• Trend analysis\n• Alert on thresholds\n\n**Tuning and Optimization:**\n• Adjust configurations\n• Reallocate resources\n• Eliminate waste\n• Improve efficiency",
        },
        {
          title: 'Key Performance Metrics',
          type: 'table',
          headers: ['Resource', 'Metrics', 'Warning Signs'],
          rows: [
            ['CPU', 'Utilization %, queue depth', 'Sustained > 80%, high queue'],
            ['Memory', 'Utilization %, page faults', 'Sustained > 85%, excessive paging'],
            ['Disk', 'IOPS, latency, free space', 'Latency spikes, < 20% free'],
            ['Network', 'Bandwidth utilization, latency', '> 70% sustained, high packet loss'],
            ['Application', 'Response time, throughput', 'Degraded response, transaction timeouts'],
            ['Database', 'Query time, connection pool', 'Slow queries, pool exhaustion'],
          ],
        },
        {
          title: 'Capacity Planning Approaches',
          type: 'text',
          content: "**Trend Analysis:**\n• Examine historical growth patterns\n• Extrapolate into future\n• Simple but may miss changes\n\n**Workload Modeling:**\n• Model transaction volumes\n• Estimate resource per transaction\n• Scale based on business forecasts\n\n**Simulation:**\n• Create synthetic workloads\n• Test system under load\n• Identify breaking points\n\n**Lead vs. Lag Capacity:**\n\n**Lead Strategy:**\n• Add capacity before it's needed\n• Higher cost, lower risk\n• Appropriate for critical systems\n\n**Lag Strategy:**\n• Add capacity after demand increases\n• Lower cost, higher risk\n• Appropriate for non-critical systems",
        },
        {
          title: 'Cloud Capacity Considerations',
          type: 'text',
          content: "**Auto-Scaling:**\n• Automatically add/remove resources\n• Based on defined triggers\n• Right-sizing in real-time\n\n**Reserved vs. On-Demand:**\n• Reserved: Lower cost, committed usage\n• On-Demand: Higher cost, flexibility\n• Spot/Preemptible: Lowest cost, may be interrupted\n\n**Audit Considerations:**\n• Are scaling policies appropriate?\n• Is cost monitoring in place?\n• Are spending alerts configured?\n• Is right-sizing analyzed regularly?\n• Are unused resources identified?",
        },
        {
          title: 'Auditing Capacity Management',
          type: 'text',
          content: "**Governance:**\n• Is there a capacity management process?\n• Are roles and responsibilities defined?\n• Is capacity reported to management?\n\n**Planning:**\n• Are capacity plans documented?\n• Are business growth plans incorporated?\n• Is lead time for procurement adequate?\n\n**Monitoring:**\n• Are key metrics tracked?\n• Are thresholds and alerts defined?\n• Is trend analysis performed?\n• Are reports reviewed?\n\n**Performance:**\n• Are SLAs being met?\n• Are bottlenecks identified and addressed?\n• Is tuning performed regularly?\n• Are capacity issues preventing business success?",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Capacity management forecasts demand and plans resources accordingly",
            "Key metrics: CPU, memory, disk, network utilization and response times",
            "Lead capacity adds before needed (safer); lag adds after (cheaper)",
            "Cloud auto-scaling provides dynamic capacity adjustment",
            "Auditors should verify capacity planning aligns with business growth",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA4-022',
    courseId: 'cisa',
    section: 'CISA4',
    title: 'System Resilience and High Availability',
    description: 'Understand fault tolerance, redundancy, and high availability architectures',
    order: 22,
    duration: 50,
    difficulty: 'advanced',
    topics: ['High Availability', 'Fault Tolerance', 'Clustering', 'Load Balancing'],
    blueprintArea: 'CISA4-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "High availability architectures prevent outages that disrupt business operations. Understanding resilience helps auditors evaluate whether technical controls match business requirements.",
        },
        {
          title: 'Availability Concepts',
          type: 'text',
          content: "**Availability = MTBF / (MTBF + MTTR)**\n\n**Key Terms:**\n\n**MTBF (Mean Time Between Failures)**\n• Average time system operates before failing\n• Longer = more reliable\n\n**MTTR (Mean Time to Repair)**\n• Average time to restore after failure\n• Shorter = faster recovery\n\n**MTTF (Mean Time to Failure)**\n• For non-repairable components\n• Time from start to failure\n\n**Availability Levels:**\n• 99% = 3.65 days downtime/year\n• 99.9% (\"three nines\") = 8.76 hours/year\n• 99.99% (\"four nines\") = 52.6 minutes/year\n• 99.999% (\"five nines\") = 5.26 minutes/year",
        },
        {
          title: '🧠 Memory Aid: MTBF vs MTTR',
          type: 'callout',
          content: "**MTBF = Between Failures** (how long until it breaks)\n**MTTR = To Repair** (how long to fix it)\n\nTo improve availability:\n• Increase MTBF: Better components, preventive maintenance\n• Decrease MTTR: Redundancy, spare parts, skilled staff",
        },
        {
          title: 'Redundancy Strategies',
          type: 'table',
          headers: ['Strategy', 'Description', 'Failover Time', 'Cost'],
          rows: [
            ['Active-Active', 'Multiple active components share load', 'Immediate (no failover)', 'High (full duplication)'],
            ['Active-Passive', 'Standby takes over on failure', 'Seconds to minutes', 'Moderate'],
            ['N+1', 'One spare for N systems', 'Minutes', 'Efficient'],
            ['N+N', 'Full duplication', 'Seconds to minutes', 'High'],
            ['Geographic', 'Multiple locations', 'Depends on architecture', 'Very High'],
          ],
        },
        {
          title: 'High Availability Technologies',
          type: 'text',
          content: "**Clustering:**\n• Multiple servers working as one\n• Shared workload or failover capability\n• Shared storage or replicated data\n• Cluster manager monitors health\n\n**Load Balancing:**\n• Distributes traffic across servers\n• Health checks detect failures\n• Automatic removal of failed servers\n• Algorithms: Round-robin, least connections, IP hash\n\n**RAID (Redundant Array of Independent Disks):**\n• RAID 0: Striping (performance, no redundancy)\n• RAID 1: Mirroring (full duplication)\n• RAID 5: Striping with parity (survive 1 disk failure)\n• RAID 6: Double parity (survive 2 disk failures)\n• RAID 10: Mirrored stripes (performance + redundancy)",
        },
        {
          title: 'Database High Availability',
          type: 'text',
          content: "**Replication Types:**\n\n**Synchronous Replication:**\n• Writes confirmed on primary AND replica\n• No data loss on failover (RPO = 0)\n• Higher latency (must wait for replica)\n• Used for critical databases\n\n**Asynchronous Replication:**\n• Writes confirmed on primary only\n• Small data loss possible on failover\n• Lower latency (don't wait)\n• Used when some data loss is tolerable\n\n**Failover Options:**\n• Manual failover: Administrator intervention\n• Automatic failover: System detects and switches\n• Planned failover: Graceful transition",
        },
        {
          title: 'Single Points of Failure (SPOF)',
          type: 'text',
          content: "**Definition:** A component whose failure would cause the entire system to fail.\n\n**Common SPOFs:**\n• Single network path\n• Single power supply\n• Single database server\n• Single application server\n• Single administrator password\n• Single vendor dependency\n\n**Audit Questions:**\n• Have SPOFs been identified?\n• Are critical components redundant?\n• Is there a single network path?\n• Is there geographic diversity?\n• Are key staff cross-trained?",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Availability = MTBF / (MTBF + MTTR); higher MTBF and lower MTTR improve it",
            "Active-Active provides immediate failover; Active-Passive requires switchover time",
            "RAID provides disk redundancy; RAID 1 mirrors, RAID 5/6 uses parity",
            "Synchronous replication = no data loss; Asynchronous = potential small loss",
            "Single Points of Failure must be identified and eliminated for critical systems",
          ],
        },
      ],
    },
  },
];

export default cisa4LessonsBatch2;
