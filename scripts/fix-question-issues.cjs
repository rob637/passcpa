#!/usr/bin/env node
/**
 * Fix question data issues:
 * - 28 short question stems (<15 chars) → expand to proper question form
 * - 3 duplicate options → replace duplicate with unique distractor
 */

const fs = require('fs');
const path = require('path');

// ─── Short Question Fixes ───
// Each maps: questionId → { file, oldText, newText }
const SHORT_QUESTION_FIXES = [
  // CPA - FAR
  { id: 'far-easy-exp-010', file: 'src/data/cpa/questions/easy-questions-expanded.ts',
    old: "'Land is:'", new: "'In the context of property, plant, and equipment (PP&E), which of the following best describes land?'" },
  { id: 'far-easy-exp-012', file: 'src/data/cpa/questions/easy-questions-expanded.ts',
    old: "'Goodwill is:'", new: "'Under ASC 350, which of the following best describes the accounting treatment of goodwill?'" },
  { id: 'far-easy-sp-024', file: 'src/data/cpa/questions/easy-questions-far-aud-reg.ts',
    old: "'Goodwill is:'", new: "'Which of the following statements best describes goodwill as an intangible asset?'" },

  // CPA - REG
  { id: 'reg-easy-exp-014', file: 'src/data/cpa/questions/easy-questions-expanded.ts',
    old: "'A tax credit:'", new: "'Which of the following best describes the effect of a tax credit on a taxpayer\\'s liability?'" },
  { id: 'reg-easy-exp-016', file: 'src/data/cpa/questions/easy-questions-expanded.ts',
    old: "'A partnership:'", new: "'Which of the following best describes a partnership for federal income tax purposes?'" },
  { id: 'reg-easy-sp-010', file: 'src/data/cpa/questions/easy-questions-far-aud-reg.ts',
    old: "'A tax credit:'", new: "'How does a tax credit differ from a tax deduction in reducing a taxpayer\\'s liability?'" },

  // CPA - BAR
  { id: 'bar-elite-027', file: 'src/data/cpa/questions/bar-questions-elite.ts',
    old: "'Beta measures:'", new: "'In portfolio theory, what does a security\\'s beta coefficient specifically measure?'" },
  { id: 'bar-easy-004', file: 'src/data/cpa/questions/easy-questions.ts',
    old: "'A fixed cost:'", new: "'Which of the following best describes the behavior of a fixed cost within the relevant range?'" },
  { id: 'bar-easy-sp-006', file: 'src/data/cpa/questions/easy-questions-tcp-bar-isc.ts',
    old: "'Fixed costs:'", new: "'Which of the following best characterizes fixed costs in managerial accounting?'" },

  // CPA - ISC
  { id: 'isc-wc-025', file: 'src/data/cpa/questions/isc-questions-world-class.ts',
    old: "'A hot site is:'", new: "'In disaster recovery planning, which of the following best defines a hot site?'" },
  { id: 'isc-easy-exp-004', file: 'src/data/cpa/questions/easy-questions-expanded-2.ts',
    old: "'A foreign key:'", new: "'In relational database design, which of the following best describes the purpose of a foreign key?'" },
  { id: 'isc-easy-exp-014', file: 'src/data/cpa/questions/easy-questions-expanded-2.ts',
    old: "'Phishing is:'", new: "'Which of the following best describes phishing as a cybersecurity threat?'" },
  { id: 'isc-easy-sp-002', file: 'src/data/cpa/questions/easy-questions-tcp-bar-isc.ts',
    old: "'A foreign key:'", new: "'In a relational database, what role does a foreign key serve?'" },
  { id: 'isc-easy-sp-005', file: 'src/data/cpa/questions/easy-questions-tcp-bar-isc.ts',
    old: "'A full backup:'", new: "'Which of the following best describes a full backup in data management?'" },
  { id: 'isc-easy-sp-011', file: 'src/data/cpa/questions/easy-questions-tcp-bar-isc.ts',
    old: "'Ransomware:'", new: "'Which of the following best describes ransomware as a form of malware?'" },
  { id: 'isc-easy-sp-013', file: 'src/data/cpa/questions/easy-questions-tcp-bar-isc.ts',
    old: "'A firewall:'", new: "'Which of the following best describes the primary function of a firewall in network security?'" },

  // EA - SEE3
  { id: 'see3-058', file: 'src/data/ea/questions/see3-questions-batch6.ts',
    old: "'A levy:'", new: "'Under IRC §6331, which of the following best describes a levy as a tax collection tool?'" },
  { id: 'see3-244', file: 'src/data/ea/questions/see3-questions-batch25.ts',
    old: "'A bank levy:'", new: "'Which of the following best describes how a bank levy operates under IRC §6332(c)?'" },
  { id: 'see3-245', file: 'src/data/ea/questions/see3-questions-batch25.ts',
    old: "'A wage levy:'", new: "'How does a wage levy differ from other types of levies under IRC §6331(e)?'" },

  // CMA
  { id: 'cma1-b12-048', file: 'src/data/cma/questions/cma1-mcq-batch12.ts',
    old: "'The median is:'", new: "'In descriptive statistics, which of the following best defines the median of a data set?'" },

  // CIA
  { id: 'cia3-142', file: 'src/data/cia/questions/cia3-questions-batch2.ts',
    old: "'Fixed costs:'", new: "'Which of the following best describes the behavior of fixed costs in financial management?'" },

  // CISA
  { id: 'cisa3-b13-038', file: 'src/data/cisa/questions/cisa-questions-batch13.ts',
    old: "'Fuzz testing:'", new: "'Which of the following best describes fuzz testing as a security testing technique?'" },
  { id: 'cisa5-064', file: 'src/data/cisa/questions/cisa5-questions-batch4.ts',
    old: "'Key escrow:'", new: "'In cryptographic key management, which of the following best describes key escrow?'" },
  { id: 'cisa5-084', file: 'src/data/cisa/questions/cisa5-questions-batch4.ts',
    old: "'Data masking:'", new: "'Which of the following best describes data masking as a data protection technique?'" },
  { id: 'cisa5-085', file: 'src/data/cisa/questions/cisa5-questions-batch4.ts',
    old: "'Tokenization:'", new: "'Which of the following best describes tokenization as a method of protecting sensitive data?'" },
  { id: 'cisa5-b11-081', file: 'src/data/cisa/questions/cisa-questions-batch11.ts',
    old: "'VPN provides:'", new: "'Which of the following best describes what a VPN provides for network security?'" },

  // CFP
  { id: 'CFP-EST-B6-019', file: 'src/data/cfp/questions/estate_batch6.ts',
    old: "'A pet trust:'", new: "'Which of the following best describes a pet trust in estate planning?'" },
  { id: 'CFP-GEN-B8-025', file: 'src/data/cfp/questions/gen_principles_batch8.ts',
    old: "'Form ADV is:'", new: "'Which of the following best describes the purpose and use of Form ADV?'" },
];

// ─── Duplicate Option Fixes ───
const DUPLICATE_OPTION_FIXES = [
  // bar-wc-047: options[0] and options[2] are both '$205,000' 
  // Change options[2] to a different distractor
  { id: 'bar-wc-047', file: 'src/data/cpa/questions/world-class-batch-3.ts',
    // After shuffle, the options array may have been reordered. 
    // Need to find the line with the duplicate and change one instance.
    searchId: 'bar-wc-047',
    duplicateValue: '$205,000',
    replacement: '$215,000' },

  // see1-calc-010: options[0] and options[3] are both '$14,130'
  { id: 'see1-calc-010', file: 'src/data/ea/questions/see1-calculation-problems.ts',
    searchId: 'see1-calc-010',
    duplicateValue: '$14,130',
    replacement: '$14,530' },

  // cma2-a-089: options[1] and options[3] are both '$1,050M'
  { id: 'cma2-a-089', file: 'src/data/cma/questions/cma2a-questions-batch4.ts',
    searchId: 'cma2-a-089',
    duplicateValue: '$1,050M',
    replacement: '$1,100M' },
];

let fixedCount = 0;
let errorCount = 0;

// ─── Apply short question fixes ───
for (const fix of SHORT_QUESTION_FIXES) {
  const filePath = path.join(process.cwd(), fix.file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${fix.file}`);
    errorCount++;
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find the question field near the ID
  const idIdx = content.indexOf(`'${fix.id}'`);
  if (idIdx === -1) {
    // Try double quotes
    const idIdx2 = content.indexOf(`"${fix.id}"`);
    if (idIdx2 === -1) {
      console.error(`❌ ID not found: ${fix.id} in ${fix.file}`);
      errorCount++;
      continue;
    }
  }

  // Replace the question text (first occurrence after the ID)
  const actualIdIdx = content.indexOf(`'${fix.id}'`) !== -1 
    ? content.indexOf(`'${fix.id}'`)
    : content.indexOf(`"${fix.id}"`);
    
  // Find the question field within the next ~500 chars
  const searchRegion = content.substring(actualIdIdx, actualIdIdx + 500);
  const qMatch = searchRegion.match(/question:\s*'[^']*'/);
  if (!qMatch) {
    // Try double quotes
    const qMatch2 = searchRegion.match(/question:\s*"[^"]*"/);
    if (!qMatch2) {
      console.error(`❌ question field not found for ${fix.id}`);
      errorCount++;
      continue;
    }
    // Replace with double quote version
    const oldFull = qMatch2[0];
    const newFull = `question: ${fix.new.replace(/^'/, '"').replace(/'$/, '"')}`;
    content = content.substring(0, actualIdIdx) + 
              searchRegion.replace(oldFull, newFull) + 
              content.substring(actualIdIdx + 500);
  } else {
    const oldFull = qMatch[0];
    const newFull = `question: ${fix.new}`;
    content = content.substring(0, actualIdIdx) + 
              searchRegion.replace(oldFull, newFull) + 
              content.substring(actualIdIdx + 500);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Fixed short question: ${fix.id}`);
  fixedCount++;
}

// ─── Apply duplicate option fixes ───
for (const fix of DUPLICATE_OPTION_FIXES) {
  const filePath = path.join(process.cwd(), fix.file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${fix.file}`);
    errorCount++;
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  const idIdx = content.indexOf(`'${fix.searchId}'`);
  if (idIdx === -1) {
    console.error(`❌ ID not found: ${fix.searchId}`);
    errorCount++;
    continue;
  }

  // Find the options array region (within ~1000 chars after ID)
  const searchRegion = content.substring(idIdx, idIdx + 1000);
  
  // Find the options array
  const optionsStart = searchRegion.indexOf('options:');
  if (optionsStart === -1) {
    console.error(`❌ options not found for ${fix.searchId}`);
    errorCount++;
    continue;
  }

  // Find all occurrences of the duplicate value in the options region
  const optionsRegion = searchRegion.substring(optionsStart, optionsStart + 300);
  
  // Replace SECOND occurrence of the duplicate value
  const firstIdx = optionsRegion.indexOf(`'${fix.duplicateValue}'`);
  if (firstIdx === -1) {
    console.error(`❌ Duplicate value '${fix.duplicateValue}' not found for ${fix.searchId}`);
    errorCount++;
    continue;
  }
  
  const secondIdx = optionsRegion.indexOf(`'${fix.duplicateValue}'`, firstIdx + 1);
  if (secondIdx === -1) {
    console.error(`⚠️  Only one occurrence of '${fix.duplicateValue}' for ${fix.searchId} (may already be fixed)`);
    continue;
  }

  // Replace the second occurrence
  const before = optionsRegion.substring(0, secondIdx);
  const after = optionsRegion.substring(secondIdx + `'${fix.duplicateValue}'`.length);
  const newOptionsRegion = before + `'${fix.replacement}'` + after;
  
  const newSearchRegion = searchRegion.substring(0, optionsStart) + 
                          newOptionsRegion + 
                          searchRegion.substring(optionsStart + optionsRegion.length);
  
  content = content.substring(0, idIdx) + newSearchRegion + content.substring(idIdx + searchRegion.length);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Fixed duplicate option: ${fix.searchId} ('${fix.duplicateValue}' → '${fix.replacement}')`);
  fixedCount++;
}

console.log(`\n📊 Summary: ${fixedCount} fixed, ${errorCount} errors`);
process.exit(errorCount > 0 ? 1 : 0);
