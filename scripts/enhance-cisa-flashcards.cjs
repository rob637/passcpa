/**
 * CISA Flashcard Enhancement Script
 * Adds type variety, difficulty levels, and examples
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'content', 'cisa', 'flashcards.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
let cards = data.flashcards || data;

console.log('=== CISA FLASHCARD ENHANCEMENT ===\n');
console.log(`Processing ${cards.length} cards...\n`);

// Keywords for type classification
const typePatterns = {
  definition: [
    /^what (is|are|does)/i,
    /^define/i,
    /^explain what/i,
    /stand for/i,
    /meaning of/i
  ],
  formula: [
    /formula/i,
    /calculate/i,
    /equation/i,
    /\bRTO\b/i,
    /\bRPO\b/i,
    /\bMTTR\b/i,
    /\bMTBF\b/i,
    /audit risk/i
  ],
  comparison: [
    /difference between/i,
    /compare/i,
    /vs\./i,
    /versus/i,
    /contrast/i,
    /distinguish/i
  ],
  standard: [
    /ISACA/i,
    /COBIT/i,
    /ISO 27/i,
    /NIST/i,
    /GDPR/i,
    /SOX/i,
    /PCI.DSS/i,
    /standard/i,
    /framework/i,
    /regulation/i
  ],
  mnemonic: [
    /mnemonic/i,
    /acronym/i,
    /remember/i,
    /\bSCAR\b/i,
    /steps/i
  ]
};

// Keywords for difficulty classification
const hardKeywords = [
  /cryptograph/i,
  /asymmetric/i,
  /PKI/i,
  /certificate authority/i,
  /digital signature/i,
  /blockchain/i,
  /zero.?day/i,
  /APT/i,
  /advanced persistent/i,
  /forensic/i,
  /pentest/i,
  /penetration test/i,
  /buffer overflow/i,
  /SQL injection/i,
  /cross.?site scripting/i,
  /XSS/i,
  /OWASP/i,
  /SDLC security/i,
  /SOC 2/i,
  /ISAE/i,
  /attestation/i,
  /audit committee/i,
  /materiality/i
];

const easyKeywords = [
  /^what does .+ stand for/i,
  /^what is the definition/i,
  /basic/i,
  /primary objective/i,
  /^what is a /i,
  /firewall/i,
  /password/i,
  /backup/i,
  /virus/i,
  /malware/i,
  /phishing/i,
  /^what are the (three|four|five) /i
];

// Example templates for common topics
const exampleTemplates = {
  'RTO': 'A hospital requires patient records available within 4 hours of an outage (RTO = 4 hours), while a retail website may tolerate 24 hours downtime.',
  'RPO': 'A bank with RPO of 1 hour must back up transactions at least hourly. If failure occurs at 3:30 PM and last backup was 3:00 PM, maximum data loss is 30 minutes.',
  'audit risk': 'If inherent risk is 80%, control risk is 50%, and desired audit risk is 5%, detection risk must be 12.5% (0.05 / (0.80 × 0.50)).',
  'three lines': 'At a bank: 1st line = branch managers (accept customer risk), 2nd line = compliance/risk departments, 3rd line = internal audit.',
  'segregation of duties': 'In payroll: one person creates employee records, another processes payroll, a third authorizes payments - no single person controls all.',
  'change management': 'A code change request is submitted, reviewed by CAB, tested in staging, approved, and deployed to production with rollback plan documented.',
  'access control': 'New hire receives role-based access: accountant gets finance system access, developer gets code repositories, neither gets the other.',
  'BCP': 'Company maintains hot site 50 miles away, replicates critical data in real-time, and conducts annual failover tests with full staff participation.',
  'incident response': 'Security team detects unusual network traffic at 2 AM, isolates affected servers, preserves evidence, notifies management, and begins forensic analysis.',
  'encryption': 'Credit card data encrypted with AES-256 at rest, transmitted over TLS 1.3, with keys stored in HSM and rotated quarterly.',
  'vulnerability': 'Monthly Nessus scans identify missing patches, critical vulnerabilities remediated within 7 days, medium within 30 days per policy.',
  'penetration test': 'Annual external pentest simulates attacker gaining initial access via phishing, escalating privileges, and attempting data exfiltration.',
  'firewall': 'Perimeter firewall blocks all inbound traffic except ports 80/443, inspects packets for malicious patterns, and logs all denied connections.',
  'COBIT': 'Organization uses COBIT to align IT goals with business objectives, measuring IT effectiveness through defined KPIs and maturity levels.',
  'SDLC': 'Requirements gathered from stakeholders, design reviewed for security, code peer-reviewed, security testing before deployment, production monitoring.',
  'disaster recovery': 'Data center flood triggers DR activation: staff notified via call tree, operations shifted to backup site, customers informed of service impact.',
  'network segmentation': 'PCI cardholder environment isolated in separate VLAN, accessible only from specific jump servers with multi-factor authentication.',
  'identity management': 'User provisioning automated via HR system integration; terminations disable accounts within 4 hours of HR notification.'
};

let stats = {
  typeChanges: 0,
  difficultyChanges: 0,
  examplesAdded: 0,
  backsExpanded: 0
};

cards.forEach(card => {
  const front = card.front.toLowerCase();
  const back = card.back.toLowerCase();
  const combined = front + ' ' + back;
  
  // 1. Assign type based on content
  let newType = 'concept'; // default
  
  for (const [type, patterns] of Object.entries(typePatterns)) {
    if (patterns.some(p => p.test(front) || p.test(back))) {
      newType = type;
      break;
    }
  }
  
  if (card.type !== newType) {
    card.type = newType;
    stats.typeChanges++;
  }
  
  // 2. Assign difficulty
  let newDifficulty = 'medium'; // default
  
  if (hardKeywords.some(p => p.test(combined))) {
    newDifficulty = 'hard';
  } else if (easyKeywords.some(p => p.test(combined))) {
    newDifficulty = 'easy';
  }
  
  if (card.difficulty !== newDifficulty) {
    card.difficulty = newDifficulty;
    stats.difficultyChanges++;
  }
  
  // 3. Add examples for cards that don't have them
  if (!card.example) {
    for (const [keyword, example] of Object.entries(exampleTemplates)) {
      if (combined.includes(keyword.toLowerCase())) {
        card.example = example;
        stats.examplesAdded++;
        break;
      }
    }
  }
  
  // 4. Expand short backs (< 100 chars)
  if (card.back.length < 100) {
    // Add context based on topic
    const expansions = {
      'DevOps': '\n\nKey practices: CI/CD pipelines, infrastructure as code, automated testing, monitoring. Audit concerns: change management bypass, security in pipeline, container security.',
      'residual risk': ' Calculated as: Inherent Risk - Risk Reduction from Controls. Management must formally accept residual risk above tolerance levels.',
      'VLAN': '\n\nBenefits: reduced broadcast traffic, improved security isolation, flexible network management. Audit focus: proper VLAN configuration, trunk security, inter-VLAN routing controls.',
      'hot site': ' Contains all necessary hardware, software, and network connectivity. Most expensive but provides fastest recovery (minutes to hours).',
      'cold site': ' Requires equipment installation before use. Cheapest option but longest recovery time (days to weeks).',
      'warm site': ' Has some equipment pre-installed but needs data restoration. Balance between cost and recovery time (hours to days).',
      'principle of least privilege': ' Users receive minimum access needed for job functions. Regularly reviewed and revoked when no longer needed.',
      'defense in depth': '\n\nLayers include: physical security, network security, host security, application security, data security. Multiple independent controls reduce single point of failure.',
    };
    
    for (const [keyword, expansion] of Object.entries(expansions)) {
      if (combined.includes(keyword.toLowerCase()) && !card.back.includes(expansion.substring(0, 20))) {
        card.back = card.back.trimEnd() + expansion;
        stats.backsExpanded++;
        break;
      }
    }
  }
});

// Write back
const output = data.flashcards ? { flashcards: cards } : cards;
fs.writeFileSync(filePath, JSON.stringify(output, null, 2));

// Print stats
console.log('=== ENHANCEMENT SUMMARY ===');
console.log(`Types reclassified: ${stats.typeChanges}`);
console.log(`Difficulty adjusted: ${stats.difficultyChanges}`);
console.log(`Examples added: ${stats.examplesAdded}`);
console.log(`Backs expanded: ${stats.backsExpanded}`);

// Show new distribution
const typeCount = {};
const diffCount = {};
let withExample = 0;

cards.forEach(c => {
  typeCount[c.type] = (typeCount[c.type] || 0) + 1;
  diffCount[c.difficulty] = (diffCount[c.difficulty] || 0) + 1;
  if (c.example) withExample++;
});

console.log('\nNew type distribution:', JSON.stringify(typeCount));
console.log('New difficulty distribution:', JSON.stringify(diffCount));
console.log(`Cards with examples: ${withExample} (${Math.round(withExample/cards.length*100)}%)`);
