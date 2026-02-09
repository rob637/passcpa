/**
 * CISA Domain 5: Protection of Information Assets - Flashcards Batch 2
 * Additional flashcards covering advanced security topics
 */

import { Flashcard } from './types';

export const cisa5FlashcardsBatch2: Flashcard[] = [
  // Access Control Advanced
  {
    id: 'CISA5-FC-037',
    front: 'What are the three factors of authentication?',
    back: 'Something you know (password), something you have (token), something you are (biometric).',
    category: 'Access Control',
    tags: ['authentication', 'factors', 'CISA5'],
  },
  {
    id: 'CISA5-FC-038',
    front: 'What is the difference between identification and authentication?',
    back: 'Identification: Claiming an identity (username). Authentication: Proving that identity (password, token, biometric).',
    category: 'Access Control',
    tags: ['identification', 'authentication', 'CISA5'],
  },
  {
    id: 'CISA5-FC-039',
    front: 'What is role-based access control (RBAC)?',
    back: 'Access rights assigned to roles, users assigned to roles - simplifies administration by grouping permissions.',
    category: 'Access Control',
    tags: ['RBAC', 'access control', 'CISA5'],
  },
  {
    id: 'CISA5-FC-040',
    front: 'What is mandatory access control (MAC)?',
    back: 'Access based on security labels assigned by administrators - users cannot change permissions. Used in high-security environments.',
    category: 'Access Control',
    tags: ['MAC', 'access control', 'CISA5'],
  },
  {
    id: 'CISA5-FC-041',
    front: 'What is discretionary access control (DAC)?',
    back: 'Owner of resource controls access permissions - flexible but less secure than MAC.',
    category: 'Access Control',
    tags: ['DAC', 'access control', 'CISA5'],
  },
  {
    id: 'CISA5-FC-042',
    front: 'What is privilege creep?',
    back: 'Accumulation of access rights over time as job responsibilities change without removal of old rights.',
    category: 'Access Control',
    tags: ['privilege creep', 'access', 'CISA5'],
  },
  {
    id: 'CISA5-FC-043',
    front: 'What is a privileged access management (PAM) solution?',
    back: 'Controls and monitors privileged accounts with features like password vaulting, session recording, and just-in-time access.',
    category: 'Access Control',
    tags: ['PAM', 'privileged access', 'CISA5'],
  },
  
  // Cryptography
  {
    id: 'CISA5-FC-044',
    front: 'What is symmetric encryption?',
    back: 'Same key for encryption and decryption - fast but requires secure key distribution.',
    category: 'Cryptography',
    tags: ['symmetric', 'encryption', 'CISA5'],
  },
  {
    id: 'CISA5-FC-045',
    front: 'What is asymmetric encryption?',
    back: 'Public/private key pair - public encrypts, private decrypts. Slower but solves key distribution problem.',
    category: 'Cryptography',
    tags: ['asymmetric', 'encryption', 'CISA5'],
  },
  {
    id: 'CISA5-FC-046',
    front: 'What is a hash function?',
    back: 'One-way function creating fixed-length output from any input - used for integrity verification and password storage.',
    category: 'Cryptography',
    tags: ['hashing', 'integrity', 'CISA5'],
  },
  {
    id: 'CISA5-FC-047',
    front: 'What is a digital signature?',
    back: 'Hash encrypted with sender\'s private key - provides authentication, integrity, and non-repudiation.',
    category: 'Cryptography',
    tags: ['digital signature', 'authentication', 'CISA5'],
  },
  {
    id: 'CISA5-FC-048',
    front: 'What is a digital certificate?',
    back: 'Binds public key to identity - issued by Certificate Authority (CA) to verify authenticity.',
    category: 'Cryptography',
    tags: ['certificate', 'PKI', 'CISA5'],
  },
  {
    id: 'CISA5-FC-049',
    front: 'What is PKI (Public Key Infrastructure)?',
    back: 'Framework for managing digital certificates including CAs, registration, certificate management, and revocation.',
    category: 'Cryptography',
    tags: ['PKI', 'certificates', 'CISA5'],
  },
  {
    id: 'CISA5-FC-050',
    front: 'What is key escrow?',
    back: 'Third party holds copy of encryption keys for authorized recovery - balances security with legitimate access needs.',
    category: 'Cryptography',
    tags: ['key escrow', 'key management', 'CISA5'],
  },
  
  // Network Security
  {
    id: 'CISA5-FC-051',
    front: 'What is a firewall?',
    back: 'Network security device filtering traffic based on rules - can be packet filter, stateful, or application layer.',
    category: 'Network Security',
    tags: ['firewall', 'network', 'CISA5'],
  },
  {
    id: 'CISA5-FC-052',
    front: 'What is a DMZ (Demilitarized Zone)?',
    back: 'Network segment between external and internal networks hosting public-facing services with controlled access.',
    category: 'Network Security',
    tags: ['DMZ', 'network', 'CISA5'],
  },
  {
    id: 'CISA5-FC-053',
    front: 'What is an IDS vs IPS?',
    back: 'IDS (Intrusion Detection System) monitors and alerts. IPS (Intrusion Prevention System) can also block threats.',
    category: 'Network Security',
    tags: ['IDS', 'IPS', 'CISA5'],
  },
  {
    id: 'CISA5-FC-054',
    front: 'What is a VPN (Virtual Private Network)?',
    back: 'Encrypted tunnel over public network providing secure communication as if on private network.',
    category: 'Network Security',
    tags: ['VPN', 'encryption', 'CISA5'],
  },
  {
    id: 'CISA5-FC-055',
    front: 'What is network segmentation?',
    back: 'Dividing network into isolated segments to limit breach impact and contain threats.',
    category: 'Network Security',
    tags: ['segmentation', 'network', 'CISA5'],
  },
  {
    id: 'CISA5-FC-056',
    front: 'What is a VLAN (Virtual LAN)?',
    back: 'Logical network segmentation allowing devices to be grouped regardless of physical location.',
    category: 'Network Security',
    tags: ['VLAN', 'network', 'CISA5'],
  },
  
  // Threats and Attacks
  {
    id: 'CISA5-FC-057',
    front: 'What is phishing?',
    back: 'Social engineering attack using deceptive emails to trick users into revealing information or clicking malicious links.',
    category: 'Threats',
    tags: ['phishing', 'social engineering', 'CISA5'],
  },
  {
    id: 'CISA5-FC-058',
    front: 'What is ransomware?',
    back: 'Malware encrypting victim\'s data and demanding payment for decryption key.',
    category: 'Threats',
    tags: ['ransomware', 'malware', 'CISA5'],
  },
  {
    id: 'CISA5-FC-059',
    front: 'What is SQL injection?',
    back: 'Attack inserting malicious SQL through user input to manipulate database - mitigated by parameterized queries.',
    category: 'Threats',
    tags: ['SQL injection', 'attack', 'CISA5'],
  },
  {
    id: 'CISA5-FC-060',
    front: 'What is cross-site scripting (XSS)?',
    back: 'Attack injecting malicious scripts into web pages viewed by other users.',
    category: 'Threats',
    tags: ['XSS', 'web security', 'CISA5'],
  },
  {
    id: 'CISA5-FC-061',
    front: 'What is a man-in-the-middle attack?',
    back: 'Attacker secretly intercepts and potentially alters communication between two parties.',
    category: 'Threats',
    tags: ['MITM', 'attack', 'CISA5'],
  },
  {
    id: 'CISA5-FC-062',
    front: 'What is a denial of service (DoS) attack?',
    back: 'Attack overwhelming system resources to make service unavailable to legitimate users.',
    category: 'Threats',
    tags: ['DoS', 'DDoS', 'CISA5'],
  },
  
  // Data Protection
  {
    id: 'CISA5-FC-063',
    front: 'What is data classification?',
    back: 'Categorizing data by sensitivity level (e.g., public, internal, confidential, restricted) to apply appropriate controls.',
    category: 'Data Protection',
    tags: ['classification', 'data', 'CISA5'],
  },
  {
    id: 'CISA5-FC-064',
    front: 'What is data loss prevention (DLP)?',
    back: 'Technology and processes preventing unauthorized data exfiltration - monitors email, endpoints, and network.',
    category: 'Data Protection',
    tags: ['DLP', 'data protection', 'CISA5'],
  },
  {
    id: 'CISA5-FC-065',
    front: 'What is encryption at rest vs in transit?',
    back: 'At rest: Data encrypted when stored. In transit: Data encrypted during transmission over network.',
    category: 'Data Protection',
    tags: ['encryption', 'data protection', 'CISA5'],
  },
  {
    id: 'CISA5-FC-066',
    front: 'What is data masking?',
    back: 'Hiding original data with modified content while maintaining format - used for testing and development.',
    category: 'Data Protection',
    tags: ['masking', 'data protection', 'CISA5'],
  },
  {
    id: 'CISA5-FC-067',
    front: 'What is tokenization?',
    back: 'Replacing sensitive data with non-sensitive placeholder tokens - original data stored securely in token vault.',
    category: 'Data Protection',
    tags: ['tokenization', 'data protection', 'CISA5'],
  },
  
  // Security Operations
  {
    id: 'CISA5-FC-068',
    front: 'What is a SIEM?',
    back: 'Security Information and Event Management - collects and analyzes security events from multiple sources for threat detection.',
    category: 'Security Operations',
    tags: ['SIEM', 'monitoring', 'CISA5'],
  },
  {
    id: 'CISA5-FC-069',
    front: 'What is vulnerability scanning?',
    back: 'Automated assessment identifying known vulnerabilities in systems - should be regular and cover all assets.',
    category: 'Security Operations',
    tags: ['vulnerability', 'scanning', 'CISA5'],
  },
  {
    id: 'CISA5-FC-070',
    front: 'What is penetration testing?',
    back: 'Authorized simulated attack to identify exploitable vulnerabilities - goes beyond scanning to test actual exploitation.',
    category: 'Security Operations',
    tags: ['penetration testing', 'security', 'CISA5'],
  },
  {
    id: 'CISA5-FC-071',
    front: 'What is patch management?',
    back: 'Process for identifying, testing, and applying software updates to address vulnerabilities.',
    category: 'Security Operations',
    tags: ['patch', 'vulnerability', 'CISA5'],
  },
  
  // Endpoint Security
  {
    id: 'CISA5-FC-072',
    front: 'What is endpoint detection and response (EDR)?',
    back: 'Security solution monitoring endpoints for threats with capabilities for investigation and response.',
    category: 'Endpoint Security',
    tags: ['EDR', 'endpoint', 'CISA5'],
  },
  {
    id: 'CISA5-FC-073',
    front: 'What is mobile device management (MDM)?',
    back: 'Solution for managing and securing mobile devices - controls apps, data, and security settings.',
    category: 'Endpoint Security',
    tags: ['MDM', 'mobile', 'CISA5'],
  },
  {
    id: 'CISA5-FC-074',
    front: 'What is application whitelisting?',
    back: 'Only approved applications can run - prevents execution of unauthorized or malicious software.',
    category: 'Endpoint Security',
    tags: ['whitelisting', 'endpoint', 'CISA5'],
  },
  
  // Cloud Security
  {
    id: 'CISA5-FC-075',
    front: 'What is a CASB (Cloud Access Security Broker)?',
    back: 'Security policy enforcement point between users and cloud services - visibility, compliance, data security, and threat protection.',
    category: 'Cloud Security',
    tags: ['CASB', 'cloud', 'CISA5'],
  },
  {
    id: 'CISA5-FC-076',
    front: 'What is Zero Trust security model?',
    back: '"Never trust, always verify" - requires verification for all access regardless of location or network.',
    category: 'Cloud Security',
    tags: ['zero trust', 'security', 'CISA5'],
  },
];
