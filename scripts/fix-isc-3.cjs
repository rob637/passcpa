const fs = require('fs');
const path = require('path');

const ISC_FILE = path.join(__dirname, '../content/cpa/isc/questions.json');

function fixISC() {
  if (!fs.existsSync(ISC_FILE)) {
    console.error('ISC file not found at: ' + ISC_FILE);
    return;
  }

  const data = fs.readFileSync(ISC_FILE, 'utf8');
  let content = JSON.parse(data);

  let questions = [];
  if (Array.isArray(content)) {
    questions = content;
  } else if (content.questions && Array.isArray(content.questions)) {
    questions = content.questions;
  } else {
    console.error('Unknown file structure');
    return;
  }

  let fixedCount = 0;

  questions.forEach(q => {
    // FIX 1: isc-d2-013 (PAM Weakness)
    if (q.id === 'isc-d2-013') {
      console.log('Fixing isc-d2-013 (PAM Weakness logic)...');
      q.question = "Which of the following practices represents a SIGNIFICANT WEAKNESS in a Privileged Access Management (PAM) implementation?";
      q.options = [
        "Granting just-in-time (JIT) access for specific administrative tasks based on approved tickets.", // Good (A)
        "Password vaulting with automated rotation, but excluding emergency break-glass accounts.", // Bad (B) -> Correct Answer (1)
        "Implementing multi-factor authentication (MFA) for all privileged sessions and elevation requests.", // Good (C)
        "Recording all privileged sessions including root and system-level administrative activities." // Good (D)
      ];
      q.correctAnswer = 1; 
      q.explanation = "Excluding emergency break-glass accounts from PAM controls creates a significant security gap. These accounts are high-value targets and must be vaulted, rotated, and monitored just like standard admin accounts. Options A, C, and D describe standard PAM best practices.";
      q.whyWrong = {
        "0": "Just-in-Time (JIT) access is a core PAM best practice, adhering to the principle of least privilege.",
        "2": "MFA is an essential control for privileged access and strengthens the PAM implementation.",
        "3": "Session recording is a critical detection and monitoring control within PAM."
      };
      fixedCount++;
    }

    // FIX 2: isc-wc-117 (Backups)
    if (q.id === 'isc-wc-117') {
      console.log('Fixing isc-wc-117 (Incremental vs Differential swap)...');
      q.correctAnswer = 1; 
      q.options[2] = "Only data changed since the last full backup."; 
      q.explanation = "An incremental backup copies only the data that has changed since the last backup of ANY type (full or incremental). This differs from a differential backup (Option C), which copies all data changed since the last FULL backup. Incremental backups are faster but slower to restore.";
      q.whyWrong = {
        "0": "Manual selection is not characteristic of standard automated backup strategies.",
        "2": "This describes a differential backup strategy, not incremental.",
        "3": "This describes a full backup strategy."
      };
      fixedCount++;
    }

    // FIX 3: isc-gen-1281 (Encryption)
    if (q.id === 'isc-gen-1281') {
      console.log('Fixing isc-gen-1281 (Encryption Scalability)...');
      q.correctAnswer = 1; 
      q.explanation = "Asymmetric encryption (using public/private key pairs) is most appropriate for the initial exchange because it solves the key distribution problem. Each client can generate a key pair and share the public key openly. Option A (Symmetric) requires a secure pre-existing channel to share the key (physical mail is not scalable or speedy).";
      q.whyWrong = {
        "0": "Symmetric encryption is faster for bulk data, but key distribution is the primary bottleneck here. Mailing keys physically is not scalable.",
        "2": "Hashing provides integrity, not confidentiality.",
        "3": "HTTPS protects transit, but the question implies a need for document-level encryption for storage or after receipt."
      };
      fixedCount++;
    }
  });

  if (fixedCount > 0) {
    if (Array.isArray(content)) {
      content = questions;
    } else {
      content.questions = questions;
    }
    fs.writeFileSync(ISC_FILE, JSON.stringify(content, null, 2));
    console.log('Successfully fixed ' + fixedCount + ' ISC questions.');
  } else {
    console.log('No questions found to fix.');
  }
}

fixISC();
