/**
 * Fix remaining flashcard issues:
 * - Convert domain to section in CISA/CFP mnemonics
 * - Add type field
 */

const fs = require('fs');

const files = [
  'src/data/cisa/flashcards/mnemonics.ts',
  'src/data/cfp/flashcards/cfp-flashcards-risk-batch2.ts',
  'src/data/cfp/flashcards/mnemonics.ts'
];

const domainToSection = {
  'CISA1': 'CISA1',
  'CISA2': 'CISA2',
  'CISA3': 'CISA3',
  'CISA4': 'CISA4',
  'CISA5': 'CISA5',
  'GEN': 'CFP-GEN',
  'INV': 'CFP-INV',
  'RET': 'CFP-RET',
  'TAX': 'CFP-TAX',
  'EST': 'CFP-EST',
  'RISK': 'CFP-RIS',
  'RIS': 'CFP-RIS',
  'PRO': 'CFP-PRO',
  'PSY': 'CFP-PSY',
};

for (const filePath of files) {
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Convert domain to section
  for (const [domain, section] of Object.entries(domainToSection)) {
    const pattern = new RegExp(`(\\s+)domain: '${domain}'(,?)\\n`, 'g');
    if (content.match(pattern)) {
      content = content.replace(pattern, `$1section: '${section}',\n$1type: 'concept',\n`);
      modified = true;
    }
  }
  
  // Also handle quoted domain values in type definitions
  content = content.replace(/domain: 'CISA1' \| 'CISA2' \| 'CISA3' \| 'CISA4' \| 'CISA5';/g, 
    "section: string;\n  type: string;");
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✓ ' + filePath);
  }
}

console.log('Done!');
