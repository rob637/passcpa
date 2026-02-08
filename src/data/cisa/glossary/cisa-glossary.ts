/**
 * CISA Glossary - Key Terms and Definitions
 * Based on ISACA CISA Review Manual
 */

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
  relatedTerms?: string[];
  examRelevance?: 'high' | 'medium' | 'low';
  examDomain?: string;
}

export const cisaGlossary: GlossaryTerm[] = [
  // ============================================================================
  // A
  // ============================================================================
  {
    id: 'CISA-GLOSS-001',
    term: 'Access Control',
    definition: 'The process of granting or denying specific requests to obtain and use information and related information processing services.',
    category: 'Security',
    relatedTerms: ['Authentication', 'Authorization', 'AAA'],
  },
  {
    id: 'CISA-GLOSS-002',
    term: 'ALE (Annualized Loss Expectancy)',
    definition: 'The expected annual monetary loss from a risk. Calculated as SLE × ARO (Single Loss Expectancy × Annualized Rate of Occurrence).',
    category: 'Risk Management',
    relatedTerms: ['SLE', 'ARO', 'Risk Assessment'],
  },
  {
    id: 'CISA-GLOSS-003',
    term: 'Application Controls',
    definition: 'Controls specific to individual business applications that ensure transactions are valid, authorized, and completely processed.',
    category: 'Controls',
    relatedTerms: ['ITGCs', 'Input Controls', 'Processing Controls'],
  },
  {
    id: 'CISA-GLOSS-004',
    term: 'ARO (Annualized Rate of Occurrence)',
    definition: 'The frequency at which a threat is expected to occur annually. Used in quantitative risk analysis.',
    category: 'Risk Management',
    relatedTerms: ['ALE', 'SLE', 'Threat'],
  },
  {
    id: 'CISA-GLOSS-005',
    term: 'Asymmetric Encryption',
    definition: 'Encryption using a key pair (public and private). Data encrypted with one key can only be decrypted with the other. Also called public key encryption.',
    category: 'Cryptography',
    relatedTerms: ['Symmetric Encryption', 'PKI', 'RSA'],
  },
  {
    id: 'CISA-GLOSS-006',
    term: 'Audit Evidence',
    definition: 'Information used by an auditor to support audit findings and conclusions. Must be sufficient, competent, relevant, and appropriate (SCAR).',
    category: 'Audit',
    relatedTerms: ['SCAR', 'Audit Procedures', 'Workpapers'],
  },
  {
    id: 'CISA-GLOSS-007',
    term: 'Audit Risk',
    definition: 'The risk that an auditor expresses an inappropriate opinion. Comprised of inherent risk, control risk, and detection risk.',
    category: 'Audit',
    relatedTerms: ['Inherent Risk', 'Control Risk', 'Detection Risk'],
  },
  
  // ============================================================================
  // B
  // ============================================================================
  {
    id: 'CISA-GLOSS-008',
    term: 'BCP (Business Continuity Plan)',
    definition: 'A plan that documents procedures and provides guidance for sustaining critical business operations during and after a disruption.',
    category: 'Business Continuity',
    relatedTerms: ['DRP', 'BIA', 'MTD'],
  },
  {
    id: 'CISA-GLOSS-009',
    term: 'BIA (Business Impact Analysis)',
    definition: 'Process to identify critical business processes and the impact of unavailability. Determines recovery priorities, RTO, and RPO.',
    category: 'Business Continuity',
    relatedTerms: ['RTO', 'RPO', 'MTD', 'BCP'],
  },
  {
    id: 'CISA-GLOSS-010',
    term: 'Biometric',
    definition: 'Authentication factor based on unique physical characteristics (fingerprint, retina, face). "Something you are."',
    category: 'Access Control',
    relatedTerms: ['Authentication', 'MFA', 'Access Control'],
  },
  
  // ============================================================================
  // C
  // ============================================================================
  {
    id: 'CISA-GLOSS-011',
    term: 'CAB (Change Advisory Board)',
    definition: 'A group responsible for evaluating, prioritizing, and approving changes to IT systems. Typically includes IT and business representatives.',
    category: 'Change Management',
    relatedTerms: ['Change Management', 'RFC', 'ITIL'],
  },
  {
    id: 'CISA-GLOSS-012',
    term: 'CAATs (Computer-Assisted Audit Techniques)',
    definition: 'Software tools used by auditors to analyze data, test controls, and increase audit efficiency. Includes GAS, test data, ITF.',
    category: 'Audit',
    relatedTerms: ['GAS', 'ITF', 'Test Data'],
  },
  {
    id: 'CISA-GLOSS-013',
    term: 'CASB (Cloud Access Security Broker)',
    definition: 'Security policy enforcement point between cloud users and providers. Provides visibility, compliance, data protection, and threat prevention.',
    category: 'Cloud Security',
    relatedTerms: ['Cloud Security', 'Shadow IT', 'DLP'],
  },
  {
    id: 'CISA-GLOSS-014',
    term: 'Chain of Custody',
    definition: 'Documentation tracking who handled evidence, when, and what actions were taken. Essential for forensic integrity and legal admissibility.',
    category: 'Incident Response',
    relatedTerms: ['Digital Forensics', 'Evidence', 'Incident Response'],
  },
  {
    id: 'CISA-GLOSS-015',
    term: 'CIA Triad',
    definition: 'The three fundamental security objectives: Confidentiality (prevents unauthorized disclosure), Integrity (prevents unauthorized modification), Availability (ensures authorized access).',
    category: 'Security',
    relatedTerms: ['Confidentiality', 'Integrity', 'Availability'],
  },
  {
    id: 'CISA-GLOSS-016',
    term: 'CMDB (Configuration Management Database)',
    definition: 'Repository containing information about configuration items (CIs) and their relationships. Foundation for IT service management.',
    category: 'IT Operations',
    relatedTerms: ['Configuration Item', 'ITIL', 'Change Management'],
  },
  {
    id: 'CISA-GLOSS-017',
    term: 'COBIT',
    definition: 'Control Objectives for Information and Related Technology - ISACA framework for IT governance and management. Provides goals, metrics, and maturity models.',
    category: 'Governance',
    relatedTerms: ['ISACA', 'IT Governance', 'Framework'],
  },
  {
    id: 'CISA-GLOSS-018',
    term: 'Cold Site',
    definition: 'A disaster recovery facility with basic infrastructure (power, HVAC) but no equipment. Requires weeks to become operational.',
    category: 'Business Continuity',
    relatedTerms: ['Warm Site', 'Hot Site', 'DRP'],
  },
  {
    id: 'CISA-GLOSS-019',
    term: 'Compensating Control',
    definition: 'An alternative control used when primary controls cannot be implemented. Must adequately address the original risk.',
    category: 'Controls',
    relatedTerms: ['Control', 'SoD', 'Risk Management'],
  },
  {
    id: 'CISA-GLOSS-020',
    term: 'Control Risk',
    definition: 'The risk that a material misstatement will not be prevented or detected by internal controls.',
    category: 'Audit',
    relatedTerms: ['Audit Risk', 'Inherent Risk', 'Detection Risk'],
  },
  {
    id: 'CISA-GLOSS-021',
    term: 'COSO',
    definition: 'Committee of Sponsoring Organizations - developed the Internal Control Framework with five components: Control Environment, Risk Assessment, Control Activities, Information/Communication, Monitoring.',
    category: 'Governance',
    relatedTerms: ['Internal Control', 'Framework', 'ERM'],
  },
  {
    id: 'CISA-GLOSS-022',
    term: 'CSA (Control Self-Assessment)',
    definition: 'A technique where management and staff evaluate their own control environment. Empowers process owners but requires independent validation.',
    category: 'Audit',
    relatedTerms: ['Control', 'Assessment', 'Internal Audit'],
  },
  {
    id: 'CISA-GLOSS-023',
    term: 'CVSS (Common Vulnerability Scoring System)',
    definition: 'Standard framework for rating vulnerability severity on a 0-10 scale. Considers attack vector, complexity, impact on CIA.',
    category: 'Vulnerability Management',
    relatedTerms: ['Vulnerability', 'Patch Management', 'Risk'],
  },
  
  // ============================================================================
  // D
  // ============================================================================
  {
    id: 'CISA-GLOSS-024',
    term: 'DAC (Discretionary Access Control)',
    definition: 'Access control model where the resource owner decides who has access. Flexible but less secure than mandatory controls.',
    category: 'Access Control',
    relatedTerms: ['MAC', 'RBAC', 'Access Control'],
  },
  {
    id: 'CISA-GLOSS-025',
    term: 'Data Classification',
    definition: 'Process of categorizing data based on sensitivity (e.g., Public, Internal, Confidential) to apply appropriate protection controls.',
    category: 'Data Protection',
    relatedTerms: ['Data Owner', 'DLP', 'Information Security'],
  },
  {
    id: 'CISA-GLOSS-026',
    term: 'Data Custodian',
    definition: 'Person responsible for implementing and maintaining the controls specified by the data owner. Usually IT personnel.',
    category: 'Governance',
    relatedTerms: ['Data Owner', 'Data Classification', 'Responsibility'],
  },
  {
    id: 'CISA-GLOSS-027',
    term: 'Data Owner',
    definition: 'Business person responsible for data classification, access decisions, and ensuring appropriate use. Accountable for data protection.',
    category: 'Governance',
    relatedTerms: ['Data Custodian', 'Data Classification', 'Accountability'],
  },
  {
    id: 'CISA-GLOSS-028',
    term: 'Defense in Depth',
    definition: 'Security strategy using multiple layers of controls so that failure of one layer does not compromise the entire system.',
    category: 'Security',
    relatedTerms: ['Layered Security', 'Controls', 'Security Architecture'],
  },
  {
    id: 'CISA-GLOSS-029',
    term: 'Detection Risk',
    definition: 'The risk that audit procedures fail to detect a material misstatement. The only component of audit risk that auditors directly control.',
    category: 'Audit',
    relatedTerms: ['Audit Risk', 'Inherent Risk', 'Control Risk'],
  },
  {
    id: 'CISA-GLOSS-030',
    term: 'DevSecOps',
    definition: 'Integration of security practices into the DevOps process. Security is "shifted left" and automated in CI/CD pipelines.',
    category: 'Development',
    relatedTerms: ['DevOps', 'CI/CD', 'SDLC'],
  },
  {
    id: 'CISA-GLOSS-031',
    term: 'Digital Signature',
    definition: 'Cryptographic mechanism providing integrity, authentication, and non-repudiation. Created by hashing a message and encrypting with the private key.',
    category: 'Cryptography',
    relatedTerms: ['PKI', 'Hash', 'Non-repudiation'],
  },
  {
    id: 'CISA-GLOSS-032',
    term: 'DLP (Data Loss Prevention)',
    definition: 'Technology that detects and prevents unauthorized data transfers. Monitors network, endpoints, and storage for sensitive data.',
    category: 'Data Protection',
    relatedTerms: ['Data Classification', 'Data Protection', 'Exfiltration'],
  },
  {
    id: 'CISA-GLOSS-033',
    term: 'DMZ (Demilitarized Zone)',
    definition: 'Network segment between the internal network and internet. Houses public-facing services isolated from internal systems.',
    category: 'Network Security',
    relatedTerms: ['Firewall', 'Network Segmentation', 'Security Zone'],
  },
  {
    id: 'CISA-GLOSS-034',
    term: 'DRP (Disaster Recovery Plan)',
    definition: 'Documented procedures for recovering IT systems after a disaster. Focuses on technology recovery to support business operations.',
    category: 'Business Continuity',
    relatedTerms: ['BCP', 'Recovery Site', 'RTO'],
  },
  
  // ============================================================================
  // E
  // ============================================================================
  {
    id: 'CISA-GLOSS-035',
    term: 'EDR (Endpoint Detection and Response)',
    definition: 'Advanced endpoint security providing real-time monitoring, threat detection, investigation capabilities, and automated response.',
    category: 'Security',
    relatedTerms: ['Endpoint Security', 'Antivirus', 'Threat Detection'],
  },
  {
    id: 'CISA-GLOSS-036',
    term: 'Encryption',
    definition: 'Process of converting plaintext into ciphertext using an algorithm and key, making data unreadable without the decryption key.',
    category: 'Cryptography',
    relatedTerms: ['Decryption', 'Symmetric', 'Asymmetric'],
  },
  {
    id: 'CISA-GLOSS-037',
    term: 'Exposure Factor (EF)',
    definition: 'The percentage of asset value lost when a threat occurs. Used in quantitative risk analysis: SLE = AV × EF.',
    category: 'Risk Management',
    relatedTerms: ['SLE', 'Asset Value', 'Risk Assessment'],
  },
  
  // ============================================================================
  // F
  // ============================================================================
  {
    id: 'CISA-GLOSS-038',
    term: 'Firewall',
    definition: 'Network security device that monitors and controls network traffic based on security rules. Creates a barrier between trusted and untrusted networks.',
    category: 'Network Security',
    relatedTerms: ['IDS', 'IPS', 'Network Security'],
  },
  {
    id: 'CISA-GLOSS-039',
    term: 'Five Cs of Findings',
    definition: 'Framework for documenting audit findings: Condition (what is), Criteria (what should be), Cause (why), Consequence (impact), Corrective action (fix).',
    category: 'Audit',
    relatedTerms: ['Audit Finding', 'Audit Report', 'Root Cause'],
  },
  
  // ============================================================================
  // G
  // ============================================================================
  {
    id: 'CISA-GLOSS-040',
    term: 'GAS (Generalized Audit Software)',
    definition: 'CAAT for extracting and analyzing data from various systems. Examples include ACL, IDEA. Used for data analytics in audits.',
    category: 'Audit',
    relatedTerms: ['CAATs', 'Data Analysis', 'Audit Procedures'],
  },
  {
    id: 'CISA-GLOSS-041',
    term: 'GDPR (General Data Protection Regulation)',
    definition: 'EU regulation for personal data protection. Requires lawful basis, consent, breach notification (72 hours), grants data subject rights.',
    category: 'Privacy',
    relatedTerms: ['Privacy', 'Data Protection', 'Consent'],
  },
  {
    id: 'CISA-GLOSS-042',
    term: 'GFS (Grandfather-Father-Son)',
    definition: 'Backup rotation strategy: Son (daily), Father (weekly), Grandfather (monthly). Balances recovery options with media usage.',
    category: 'Business Continuity',
    relatedTerms: ['Backup', 'Rotation', 'Recovery'],
  },
  
  // ============================================================================
  // H
  // ============================================================================
  {
    id: 'CISA-GLOSS-043',
    term: 'Hash',
    definition: 'One-way cryptographic function producing a fixed-length output from variable input. Used for integrity verification. Cannot be reversed.',
    category: 'Cryptography',
    relatedTerms: ['SHA', 'MD5', 'Integrity'],
  },
  {
    id: 'CISA-GLOSS-044',
    term: 'Hot Site',
    definition: 'Fully equipped disaster recovery facility with systems pre-configured and ready. Provides fastest recovery (hours) but highest cost.',
    category: 'Business Continuity',
    relatedTerms: ['Warm Site', 'Cold Site', 'DRP'],
  },
  
  // ============================================================================
  // I
  // ============================================================================
  {
    id: 'CISA-GLOSS-045',
    term: 'IAM (Identity and Access Management)',
    definition: 'Framework for managing digital identities and access rights. Covers provisioning, authentication, authorization, and deprovisioning.',
    category: 'Access Control',
    relatedTerms: ['SSO', 'MFA', 'Access Control'],
  },
  {
    id: 'CISA-GLOSS-046',
    term: 'IDS (Intrusion Detection System)',
    definition: 'System that monitors network/host activity for malicious behavior and generates alerts. Passive - does not block traffic.',
    category: 'Network Security',
    relatedTerms: ['IPS', 'SIEM', 'Threat Detection'],
  },
  {
    id: 'CISA-GLOSS-047',
    term: 'Incident',
    definition: 'An unplanned interruption to a service or reduction in quality. Incident management focuses on rapid service restoration.',
    category: 'IT Operations',
    relatedTerms: ['Problem', 'ITIL', 'Service Management'],
  },
  {
    id: 'CISA-GLOSS-048',
    term: 'Inherent Risk',
    definition: 'The risk that exists before controls are applied. Based on the nature of the activity or environment.',
    category: 'Risk Management',
    relatedTerms: ['Residual Risk', 'Control Risk', 'Audit Risk'],
  },
  {
    id: 'CISA-GLOSS-049',
    term: 'IPS (Intrusion Prevention System)',
    definition: 'System that monitors network traffic and actively blocks malicious activity. Inline and active - can disrupt traffic.',
    category: 'Network Security',
    relatedTerms: ['IDS', 'Firewall', 'Threat Prevention'],
  },
  {
    id: 'CISA-GLOSS-050',
    term: 'ISACA',
    definition: 'Global association for IT governance, security, audit, and assurance professionals. Develops CISA, CISM, COBIT, and related standards.',
    category: 'Professional',
    relatedTerms: ['CISA', 'COBIT', 'Standards'],
  },
  {
    id: 'CISA-GLOSS-051',
    term: 'IT Governance',
    definition: 'Framework ensuring IT investments support business objectives, risks are managed, and resources are used responsibly. Part of corporate governance.',
    category: 'Governance',
    relatedTerms: ['COBIT', 'Board', 'Strategic Alignment'],
  },
  {
    id: 'CISA-GLOSS-052',
    term: 'ITF (Integrated Test Facility)',
    definition: 'CAAT where a fictitious entity is created in production to process test transactions alongside real data. Tests actual processing.',
    category: 'Audit',
    relatedTerms: ['CAATs', 'Test Data', 'Audit Procedures'],
  },
  {
    id: 'CISA-GLOSS-053',
    term: 'ITGCs (IT General Controls)',
    definition: 'Controls that apply across the IT environment supporting multiple applications. Include access security, change management, operations, development.',
    category: 'Controls',
    relatedTerms: ['Application Controls', 'Controls', 'Access Control'],
  },
  {
    id: 'CISA-GLOSS-054',
    term: 'ITIL',
    definition: 'IT Infrastructure Library - best practice framework for IT Service Management. Covers service lifecycle from strategy to improvement.',
    category: 'IT Operations',
    relatedTerms: ['ITSM', 'Service Management', 'Framework'],
  },
  
  // ============================================================================
  // K-L
  // ============================================================================
  {
    id: 'CISA-GLOSS-055',
    term: 'Known Error',
    definition: 'A problem with documented root cause and workaround. Stored in the Known Error Database (KEDB) for faster incident resolution.',
    category: 'IT Operations',
    relatedTerms: ['Problem', 'KEDB', 'ITIL'],
  },
  {
    id: 'CISA-GLOSS-056',
    term: 'Least Privilege',
    definition: 'Principle that users should have only the minimum access rights necessary to perform their job functions. Reduces attack surface.',
    category: 'Access Control',
    relatedTerms: ['Need to Know', 'Access Control', 'Zero Trust'],
  },
  
  // ============================================================================
  // M
  // ============================================================================
  {
    id: 'CISA-GLOSS-057',
    term: 'MAC (Mandatory Access Control)',
    definition: 'Access control model where the system enforces access based on security labels and user clearances. Common in government/military.',
    category: 'Access Control',
    relatedTerms: ['DAC', 'RBAC', 'Classification'],
  },
  {
    id: 'CISA-GLOSS-058',
    term: 'Malware',
    definition: 'Malicious software designed to damage or compromise systems. Types include virus, worm, trojan, ransomware, spyware, rootkit.',
    category: 'Security',
    relatedTerms: ['Virus', 'Ransomware', 'Endpoint Security'],
  },
  {
    id: 'CISA-GLOSS-059',
    term: 'MFA (Multi-Factor Authentication)',
    definition: 'Authentication requiring factors from different categories (know, have, are). Provides stronger security than single-factor.',
    category: 'Access Control',
    relatedTerms: ['Authentication', 'Two-Factor', 'Access Control'],
  },
  {
    id: 'CISA-GLOSS-060',
    term: 'MTD (Maximum Tolerable Downtime)',
    definition: 'Maximum time a business function can be unavailable before causing unacceptable consequences. MTD must be greater than RTO.',
    category: 'Business Continuity',
    relatedTerms: ['RTO', 'RPO', 'BIA'],
  },
  
  // ============================================================================
  // N-O
  // ============================================================================
  {
    id: 'CISA-GLOSS-061',
    term: 'NGFW (Next-Generation Firewall)',
    definition: 'Advanced firewall combining traditional firewall with application awareness, integrated IPS, and user identity capabilities.',
    category: 'Network Security',
    relatedTerms: ['Firewall', 'IPS', 'Application Control'],
  },
  {
    id: 'CISA-GLOSS-062',
    term: 'Non-repudiation',
    definition: 'Assurance that someone cannot deny an action. Provided by digital signatures - sender cannot deny sending.',
    category: 'Security',
    relatedTerms: ['Digital Signature', 'Authentication', 'Integrity'],
  },
  {
    id: 'CISA-GLOSS-063',
    term: 'OWASP',
    definition: 'Open Web Application Security Project - nonprofit organization providing resources for web application security, including the Top 10 vulnerabilities.',
    category: 'Development',
    relatedTerms: ['Web Security', 'SQL Injection', 'XSS'],
  },
  
  // ============================================================================
  // P
  // ============================================================================
  {
    id: 'CISA-GLOSS-064',
    term: 'PAM (Privileged Access Management)',
    definition: 'Controls for protecting administrator and privileged accounts. Includes credential vaulting, session recording, just-in-time access.',
    category: 'Access Control',
    relatedTerms: ['IAM', 'Privileged Access', 'Least Privilege'],
  },
  {
    id: 'CISA-GLOSS-065',
    term: 'Parallel Testing',
    definition: 'Implementation approach where old and new systems run simultaneously. Provides safety but requires double resources.',
    category: 'Development',
    relatedTerms: ['Implementation', 'Conversion', 'Testing'],
  },
  {
    id: 'CISA-GLOSS-066',
    term: 'Patch Management',
    definition: 'Process of identifying, testing, and deploying software updates to address vulnerabilities and bugs.',
    category: 'IT Operations',
    relatedTerms: ['Vulnerability Management', 'Change Management', 'Security'],
  },
  {
    id: 'CISA-GLOSS-067',
    term: 'Penetration Testing',
    definition: 'Authorized simulated attack to evaluate security. Attempts to exploit vulnerabilities and assess real-world risk.',
    category: 'Security',
    relatedTerms: ['Vulnerability Assessment', 'Red Team', 'Security Testing'],
  },
  {
    id: 'CISA-GLOSS-068',
    term: 'Phishing',
    definition: 'Social engineering attack using deceptive emails to steal credentials or install malware. Spear phishing targets specific individuals.',
    category: 'Security',
    relatedTerms: ['Social Engineering', 'Vishing', 'Spear Phishing'],
  },
  {
    id: 'CISA-GLOSS-069',
    term: 'PIR (Post-Implementation Review)',
    definition: 'Formal evaluation after go-live to assess if project delivered expected benefits and identify lessons learned.',
    category: 'Development',
    relatedTerms: ['Project Management', 'Implementation', 'Lessons Learned'],
  },
  {
    id: 'CISA-GLOSS-070',
    term: 'PKI (Public Key Infrastructure)',
    definition: 'Framework for managing digital certificates and public-key encryption. Components include CA, RA, certificates, and CRL.',
    category: 'Cryptography',
    relatedTerms: ['CA', 'Digital Certificate', 'Asymmetric Encryption'],
  },
  {
    id: 'CISA-GLOSS-071',
    term: 'Privacy by Design',
    definition: 'Approach embedding privacy into systems proactively during design, not as an afterthought. GDPR requirement.',
    category: 'Privacy',
    relatedTerms: ['GDPR', 'Privacy', 'Data Protection'],
  },
  {
    id: 'CISA-GLOSS-072',
    term: 'Problem',
    definition: 'The root cause of one or more incidents. Problem management focuses on finding and eliminating root causes to prevent recurrence.',
    category: 'IT Operations',
    relatedTerms: ['Incident', 'Root Cause', 'ITIL'],
  },
  
  // ============================================================================
  // R
  // ============================================================================
  {
    id: 'CISA-GLOSS-073',
    term: 'RBAC (Role-Based Access Control)',
    definition: 'Access control model where permissions are assigned to roles, and users are assigned to roles. Most common in business environments.',
    category: 'Access Control',
    relatedTerms: ['DAC', 'MAC', 'Access Control'],
  },
  {
    id: 'CISA-GLOSS-074',
    term: 'Residual Risk',
    definition: 'Risk remaining after controls are implemented. Must fall within the organizations risk appetite to be acceptable.',
    category: 'Risk Management',
    relatedTerms: ['Inherent Risk', 'Risk Appetite', 'Control'],
  },
  {
    id: 'CISA-GLOSS-075',
    term: 'Risk Appetite',
    definition: 'The amount and type of risk an organization is willing to accept in pursuit of objectives. Set by the board.',
    category: 'Risk Management',
    relatedTerms: ['Risk Tolerance', 'Residual Risk', 'Governance'],
  },
  {
    id: 'CISA-GLOSS-076',
    term: 'RPO (Recovery Point Objective)',
    definition: 'Maximum acceptable data loss measured in time. Determines backup frequency requirements.',
    category: 'Business Continuity',
    relatedTerms: ['RTO', 'MTD', 'Backup'],
  },
  {
    id: 'CISA-GLOSS-077',
    term: 'RTO (Recovery Time Objective)',
    definition: 'Maximum acceptable time to restore a system or process after disruption. Determines recovery strategy.',
    category: 'Business Continuity',
    relatedTerms: ['RPO', 'MTD', 'Recovery Site'],
  },
  
  // ============================================================================
  // S
  // ============================================================================
  {
    id: 'CISA-GLOSS-078',
    term: 'SAST (Static Application Security Testing)',
    definition: 'Security testing that analyzes source code for vulnerabilities without executing the program. "White-box" testing.',
    category: 'Development',
    relatedTerms: ['DAST', 'Code Review', 'Security Testing'],
  },
  {
    id: 'CISA-GLOSS-079',
    term: 'SCAR',
    definition: 'Criteria for audit evidence quality: Sufficient (quantity), Competent (reliable), Appropriate (fits objective), Relevant (relates to finding).',
    category: 'Audit',
    relatedTerms: ['Audit Evidence', 'Audit Procedures', 'Workpapers'],
  },
  {
    id: 'CISA-GLOSS-080',
    term: 'SDLC (System Development Life Cycle)',
    definition: 'Framework for planning, building, and maintaining systems. Phases: feasibility, requirements, design, development, testing, implementation, maintenance.',
    category: 'Development',
    relatedTerms: ['Waterfall', 'Agile', 'Development'],
  },
  {
    id: 'CISA-GLOSS-081',
    term: 'Segregation of Duties (SoD)',
    definition: 'Control dividing critical functions among different people to prevent fraud and error. Authorization, custody, recording should be separated.',
    category: 'Controls',
    relatedTerms: ['Control', 'Fraud Prevention', 'Compensating Control'],
  },
  {
    id: 'CISA-GLOSS-082',
    term: 'SIEM (Security Information and Event Management)',
    definition: 'Platform that aggregates logs, correlates events, generates alerts, and provides dashboards for security monitoring and compliance.',
    category: 'Security',
    relatedTerms: ['Log Management', 'Security Monitoring', 'SOC'],
  },
  {
    id: 'CISA-GLOSS-083',
    term: 'SLA (Service Level Agreement)',
    definition: 'Formal agreement defining service expectations between provider and customer: availability, performance, response times, and remedies.',
    category: 'IT Operations',
    relatedTerms: ['ITIL', 'Service Management', 'Vendor'],
  },
  {
    id: 'CISA-GLOSS-084',
    term: 'SLE (Single Loss Expectancy)',
    definition: 'Expected monetary loss from a single occurrence of a risk event. Calculated as Asset Value × Exposure Factor.',
    category: 'Risk Management',
    relatedTerms: ['ALE', 'ARO', 'Exposure Factor'],
  },
  {
    id: 'CISA-GLOSS-085',
    term: 'Social Engineering',
    definition: 'Manipulation techniques exploiting human psychology to gain unauthorized access or information. Includes phishing, pretexting, baiting.',
    category: 'Security',
    relatedTerms: ['Phishing', 'Vishing', 'Security Awareness'],
  },
  {
    id: 'CISA-GLOSS-086',
    term: 'SQL Injection',
    definition: 'Attack inserting malicious SQL code into input fields to bypass authentication, access unauthorized data, or execute admin operations.',
    category: 'Development',
    relatedTerms: ['OWASP', 'Input Validation', 'Web Security'],
  },
  {
    id: 'CISA-GLOSS-087',
    term: 'SSO (Single Sign-On)',
    definition: 'Authentication mechanism where one login provides access to multiple systems. Improves usability but concentrates authentication risk.',
    category: 'Access Control',
    relatedTerms: ['IAM', 'Authentication', 'SAML'],
  },
  {
    id: 'CISA-GLOSS-088',
    term: 'Symmetric Encryption',
    definition: 'Encryption using the same key for encryption and decryption. Fast but requires secure key distribution. Examples: AES, 3DES.',
    category: 'Cryptography',
    relatedTerms: ['Asymmetric Encryption', 'AES', 'Key Management'],
  },
  
  // ============================================================================
  // T
  // ============================================================================
  {
    id: 'CISA-GLOSS-089',
    term: 'Tabletop Exercise',
    definition: 'Discussion-based BC/DR exercise where participants walk through a scenario to identify gaps and decision points without actual recovery.',
    category: 'Business Continuity',
    relatedTerms: ['DR Testing', 'BCP', 'Exercise'],
  },
  {
    id: 'CISA-GLOSS-090',
    term: 'TCO (Total Cost of Ownership)',
    definition: 'Complete cost of an IT investment over its lifecycle including purchase, implementation, operation, maintenance, and disposal.',
    category: 'Governance',
    relatedTerms: ['ROI', 'IT Investment', 'Financial Management'],
  },
  {
    id: 'CISA-GLOSS-091',
    term: 'Three Lines of Defense',
    definition: 'Risk governance model: 1st line (operations/management), 2nd line (risk/compliance functions), 3rd line (internal audit - independent).',
    category: 'Governance',
    relatedTerms: ['Governance', 'Risk Management', 'Internal Audit'],
  },
  {
    id: 'CISA-GLOSS-092',
    term: 'TLS (Transport Layer Security)',
    definition: 'Cryptographic protocol providing secure communication over networks. Successor to SSL. Used for HTTPS, email, VPN.',
    category: 'Cryptography',
    relatedTerms: ['SSL', 'HTTPS', 'Encryption'],
  },
  
  // ============================================================================
  // U-V
  // ============================================================================
  {
    id: 'CISA-GLOSS-093',
    term: 'UAT (User Acceptance Testing)',
    definition: 'Testing performed by end users to verify system meets business requirements. Success determines readiness for production.',
    category: 'Development',
    relatedTerms: ['Testing', 'SDLC', 'Requirements'],
  },
  {
    id: 'CISA-GLOSS-094',
    term: 'UPS (Uninterruptible Power Supply)',
    definition: 'Device providing battery backup for short power outages, power conditioning, and surge protection. Typically 15-30 minutes runtime.',
    category: 'IT Operations',
    relatedTerms: ['Power', 'Data Center', 'Environmental'],
  },
  {
    id: 'CISA-GLOSS-095',
    term: 'VLAN (Virtual Local Area Network)',
    definition: 'Logical network segmentation at Layer 2. Isolates traffic and reduces broadcast domain without physical separation.',
    category: 'Network Security',
    relatedTerms: ['Network Segmentation', 'Switch', 'Security Zone'],
  },
  {
    id: 'CISA-GLOSS-096',
    term: 'VPN (Virtual Private Network)',
    definition: 'Encrypted tunnel over public networks providing secure remote access. Protocols include IPSec and SSL/TLS.',
    category: 'Network Security',
    relatedTerms: ['Encryption', 'Remote Access', 'IPSec'],
  },
  {
    id: 'CISA-GLOSS-097',
    term: 'Vulnerability',
    definition: 'A weakness in a system that could be exploited by a threat to cause harm. Identified through scanning and assessment.',
    category: 'Security',
    relatedTerms: ['Threat', 'Risk', 'Patch Management'],
  },
  
  // ============================================================================
  // W-Z
  // ============================================================================
  {
    id: 'CISA-GLOSS-098',
    term: 'WAF (Web Application Firewall)',
    definition: 'Security device protecting web applications by filtering HTTP/HTTPS traffic. Defends against OWASP Top 10 attacks.',
    category: 'Network Security',
    relatedTerms: ['Firewall', 'OWASP', 'Web Security'],
  },
  {
    id: 'CISA-GLOSS-099',
    term: 'Warm Site',
    definition: 'Disaster recovery facility with some equipment installed but not fully configured. Recovery time measured in days.',
    category: 'Business Continuity',
    relatedTerms: ['Cold Site', 'Hot Site', 'DRP'],
  },
  {
    id: 'CISA-GLOSS-100',
    term: 'Workpapers',
    definition: 'Documentation supporting audit work performed, evidence collected, and conclusions reached. Provides audit trail and basis for opinions.',
    category: 'Audit',
    relatedTerms: ['Audit Evidence', 'Documentation', 'Audit Trail'],
  },
  {
    id: 'CISA-GLOSS-101',
    term: 'XSS (Cross-Site Scripting)',
    definition: 'Web vulnerability where malicious scripts are injected into pages viewed by other users. Types: Stored, Reflected, DOM-based.',
    category: 'Development',
    relatedTerms: ['OWASP', 'Web Security', 'Input Validation'],
  },
  {
    id: 'CISA-GLOSS-102',
    term: 'Zero Trust',
    definition: 'Security model based on "never trust, always verify." Requires verification regardless of network location. Assumes breach.',
    category: 'Security',
    relatedTerms: ['Network Security', 'Microsegmentation', 'Least Privilege'],
  },
];

export default cisaGlossary;
