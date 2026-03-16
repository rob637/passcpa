/**
 * CISA Back Expansion Script
 * Expands short flashcard backs with detailed context
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'content', 'cisa', 'flashcards.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
let cards = data.flashcards || data;

console.log('=== CISA BACK EXPANSION ===\n');
console.log(`Processing ${cards.length} cards...`);

// Context expansions for common CISA topics
const expansions = {
  'firewall': '\n\nTypes: Packet filtering, stateful inspection, application-level gateway, next-gen (NGFW). Audit focus: rule review, logging enabled, change management.',
  'encryption': '\n\nSymmetric (AES, 3DES) for speed, asymmetric (RSA, ECC) for key exchange. Key management critical: rotation, storage, access controls.',
  'access control': '\n\nModels: DAC (owner decides), MAC (labels), RBAC (roles), ABAC (attributes). Principle of least privilege essential.',
  'residual risk': ' Calculated as: Inherent Risk - Risk Reduction from Controls. Management must formally accept residual risk.',
  'audit': ' Key phases: planning, fieldwork, reporting, follow-up. Independence and objectivity required throughout.',
  'control': ' Types: preventive (stop incidents), detective (identify incidents), corrective (fix after). Automated preferred over manual.',
  'backup': '\n\nTypes: Full (complete copy), incremental (changes since last backup), differential (changes since last full). Test restoration regularly.',
  'disaster': ' RTO (max downtime) and RPO (max data loss) drive strategy. Hot/warm/cold sites balance cost vs. recovery speed.',
  'network': '\n\nDefense in depth: perimeter security, DMZ, internal segmentation, endpoint protection. Monitor with IDS/IPS, SIEM.',
  'database': '\n\nControls: access restrictions, input validation, encryption, auditing, backup. Watch for SQL injection, privilege escalation.',
  'application': '\n\nSDLC security: requirements review, secure design, code review, testing, deployment controls, maintenance patches.',
  'change management': '\n\nProcess: request, impact assessment, approval, testing, implementation, review. Emergency changes need post-implementation review.',
  'incident': '\n\nPhases: preparation, identification, containment, eradication, recovery, lessons learned. Document everything for forensics.',
  'business continuity': '\n\nComponents: risk assessment, business impact analysis, strategy development, plan development, testing, maintenance.',
  'governance': '\n\nFrameworks: COBIT for IT governance, ITIL for service management, ISO 27001 for security. Board oversight essential.',
  'compliance': '\n\nRegulations vary: SOX (financial), HIPAA (health), PCI DSS (payments), GDPR (privacy). Non-compliance = fines, reputation damage.',
  'vendor': '\n\nDue diligence: financial stability, security practices, SLAs, right-to-audit clauses. Monitor ongoing performance.',
  'cloud': '\n\nModels: IaaS (infrastructure), PaaS (platform), SaaS (software). Shared responsibility varies by model. Review SOC 2 reports.',
  'mobile': '\n\nRisks: device loss, malware, insecure apps, public WiFi. Controls: MDM, encryption, remote wipe, containerization.',
  'identity': '\n\nLifecycle: provisioning, authentication, authorization, access review, deprovisioning. Automate to reduce errors.',
  'password': '\n\nBest practices: complexity, length (12+ chars), rotation, no reuse, MFA preferred. Password managers recommended.',
  'vulnerability': '\n\nProcess: discovery (scanning), assessment (risk ranking), remediation (patching), verification. Continuous monitoring essential.',
  'penetration': '\n\nTypes: black box (no knowledge), white box (full knowledge), gray box (partial). Rules of engagement critical.',
  'cobit': '\n\nFive principles: meeting stakeholder needs, covering enterprise end-to-end, applying single integrated framework, enabling holistic approach, separating governance from management.',
  'iso 27': '\n\nISO 27001: ISMS requirements. ISO 27002: security controls. Certification requires external audit, annual surveillance.',
  'nist': '\n\nCybersecurity Framework: Identify, Protect, Detect, Respond, Recover. Risk Management Framework for federal systems.',
  'soc 2': '\n\nTrust principles: security, availability, processing integrity, confidentiality, privacy. Type I = point-in-time, Type II = over period.',
  'segregation': '\n\nKey incompatible duties: authorization, custody, recording, reconciliation. Where not possible, use compensating controls.',
  'logging': '\n\nCapture: who, what, when, where, outcome. Protect logs from tampering. Retain per policy. Review regularly or use SIEM.',
  'authentication': '\n\nFactors: something you know (password), have (token), are (biometric). MFA combines two or more factors.',
  'authorization': '\n\nGrant minimum necessary access. Regular certification reviews. Privileged access requires additional controls.',
  'devops': '\n\nKey practices: CI/CD pipelines, infrastructure as code, automated testing, monitoring. Audit concerns: change bypass, pipeline security.',
  'vlan': '\n\nBenefits: reduced broadcast traffic, improved security isolation, flexible network management. Audit: configuration review, trunk security.',
  'vpn': '\n\nTypes: site-to-site, remote access. Protocols: IPsec, SSL/TLS. Audit: authentication strength, encryption standards, split tunneling policy.',
  'ids': '\n\nTypes: network-based (NIDS), host-based (HIDS). Detection: signature-based, anomaly-based. Tune to reduce false positives.',
  'ips': '\n\nIntrusion Prevention System: active blocking vs. IDS passive monitoring. Placement critical. May cause availability issues if misconfigured.',
  'siem': '\n\nSecurity Information and Event Management: aggregates logs, correlates events, generates alerts. Critical for incident detection.',
  'dlp': '\n\nData Loss Prevention: monitors and blocks sensitive data exfiltration. Requires content classification. Network, endpoint, cloud variants.',
  'patch': '\n\nProcess: identify patches, test in lab, prioritize by risk, deploy, verify. Emergency patches may skip testing.',
  'malware': '\n\nTypes: virus, worm, trojan, ransomware, spyware. Controls: antivirus, email filtering, user training, application whitelisting.',
  'phishing': '\n\nSocial engineering via email/messages. Controls: email filtering, user awareness training, MFA, reporting mechanism.',
  'social engineering': '\n\nExploits human psychology. Types: phishing, pretexting, baiting, tailgating. Primary defense: security awareness training.',
  'wireless': '\n\nProtocols: WPA3 preferred, WPA2 acceptable, WEP insecure. Controls: strong authentication, encryption, rogue AP detection.',
  'virtualization': '\n\nRisks: VM escape, hypervisor compromise, VM sprawl. Controls: patch hypervisor, segment VMs, monitor resource usage.',
  'container': '\n\nDocker, Kubernetes. Risks: image vulnerabilities, escape attacks, orchestration misconfig. Scan images, limit privileges.',
  'api': '\n\nApplication Programming Interface security: authentication, rate limiting, input validation, encryption. OWASP API Security Top 10.',
  'sdlc': '\n\nSecure SDLC: integrate security at each phase. Requirements, design review, secure coding, testing, deployment, maintenance.',
};

let expanded = 0;
cards.forEach(card => {
  if (card.back.length < 150) {
    const backLower = card.back.toLowerCase();
    for (const [keyword, addition] of Object.entries(expansions)) {
      if (backLower.includes(keyword.toLowerCase())) {
        // Check we haven't already added this expansion
        if (!card.back.includes(addition.substring(5, 25))) {
          card.back = card.back.trimEnd() + addition;
          expanded++;
          break;
        }
      }
    }
  }
});

// Write back
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// Recalculate stats
let totalLen = 0;
let under100 = 0;
let under150 = 0;
cards.forEach(c => {
  totalLen += c.back.length;
  if (c.back.length < 100) under100++;
  if (c.back.length < 150) under150++;
});

console.log(`\nBacks expanded: ${expanded}`);
console.log(`New avg back length: ${Math.round(totalLen / cards.length)} chars`);
console.log(`Cards with back <100 chars: ${under100}`);
console.log(`Cards with back <150 chars: ${under150}`);
