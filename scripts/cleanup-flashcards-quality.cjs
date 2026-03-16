/**
 * Flashcard Cleanup Script
 * Removes duplicates, fixes truncated backs, standardizes section names
 */

const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '..', 'content');
const courses = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];

let totalRemoved = 0;
let totalFixed = 0;

console.log('=== FLASHCARD CLEANUP ===\n');

courses.forEach(course => {
  const filePath = path.join(contentDir, course, 'flashcards.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let cards = data.flashcards || data;
  const originalCount = cards.length;
  
  console.log(`\n--- ${course.toUpperCase()} (${cards.length} cards) ---`);
  
  // 1. Remove duplicate fronts (keep first occurrence)
  const seenFronts = new Map();
  const duplicateIds = [];
  
  cards.forEach(card => {
    const frontKey = card.front.toLowerCase().trim();
    if (seenFronts.has(frontKey)) {
      duplicateIds.push(card.id);
    } else {
      seenFronts.set(frontKey, card.id);
    }
  });
  
  if (duplicateIds.length > 0) {
    console.log(`  Removing ${duplicateIds.length} duplicate fronts`);
    cards = cards.filter(c => !duplicateIds.includes(c.id));
    totalRemoved += duplicateIds.length;
  }
  
  // 2. Fix truncated backs (ending with backslash or incomplete quote)
  let truncatedFixed = 0;
  cards.forEach(card => {
    // Fix backs ending with backslash
    if (card.back.endsWith('\\') || card.back.endsWith('\\"') || card.back.endsWith("'s\\")) {
      card.back = card.back.replace(/\\+$/, '').replace(/\\"$/, '"');
      truncatedFixed++;
    }
    
    // Fix backs that are clearly truncated (end mid-word or with incomplete structure)
    if (card.back.length < 35 && card.back.includes('"') && !card.back.endsWith('"')) {
      // Try to complete common patterns
      const patterns = [
        { match: /organization"$/, replace: "organization's risk appetite." },
        { match: /lessee"$/, replace: "lessee's right to use an underlying asset." },
        { match: /Corporation"$/, replace: "Corporation's structure and governance." },
        { match: /victim"$/, replace: "victim's data and demands ransom for decryption." },
        { match: /Stockholders"$/, replace: "Stockholders' Equity" },
      ];
      
      for (const p of patterns) {
        if (p.match.test(card.back)) {
          card.back = card.back.replace(p.match, p.replace);
          truncatedFixed++;
          break;
        }
      }
    }
  });
  
  if (truncatedFixed > 0) {
    console.log(`  Fixed ${truncatedFixed} truncated backs`);
    totalFixed += truncatedFixed;
  }
  
  // 3. Standardize CFP section names
  if (course === 'cfp') {
    let sectionFixed = 0;
    const sectionMap = {
      'EST': 'CFP-EST',
      'GEN': 'CFP-GEN',
      'INV': 'CFP-INV',
      'PRO': 'CFP-PCR',  // Map PRO to PCR
      'RET': 'CFP-RET',
      'RISK': 'CFP-RISK',
      'TAX': 'CFP-TAX'
    };
    
    cards.forEach(card => {
      if (sectionMap[card.section]) {
        const oldSection = card.section;
        card.section = sectionMap[card.section];
        // Also update blueprintArea if it matches old section
        if (card.blueprintArea === oldSection) {
          card.blueprintArea = card.section;
        }
        sectionFixed++;
      }
    });
    
    if (sectionFixed > 0) {
      console.log(`  Standardized ${sectionFixed} section names`);
    }
  }
  
  // 4. Expand vague fronts (add context)
  let vagueFixed = 0;
  cards.forEach(card => {
    const front = card.front;
    
    // Fix truncated question fronts ending with backslash
    if (front.endsWith('\\"') || front.endsWith("'s\\") || front.endsWith("\"")) {
      // Common patterns to fix
      const fixes = {
        "What is Benford\\'s": "What is Benford's Law and how is it used in auditing?",
        "What is Benford\"": "What is Benford's Law and how is it used in auditing?",
        "What are Porter\\'s": "What are Porter's Five Forces?",
        "What are Porter\"": "What are Porter's Five Forces?",
        "What is Porter\\'s": "What is Porter's Value Chain?",
        "What is Jensen\\'s": "What is Jensen's Alpha and how is it calculated?",
        "What is Jensen\"": "What is Jensen's Alpha and how is it calculated?",
        "What are MASLOW\\'s": "What are Maslow's Hierarchy of Needs and how do they apply to financial planning?",
        "What are MASLOW\"": "What are Maslow's Hierarchy of Needs?",
        "What is FINRA\\'s": "What is FINRA's role in regulating financial advisors?",
        "What is FINRA\"": "What is FINRA's role in securities regulation?",
        "What are the CAE\\'s": "What are the CAE's roles and responsibilities?",
        "What are the CAE\"": "What are the CAE's roles and responsibilities?",
        "What is internal audit\\'s": "What is internal audit's role in governance?",
        "What is internal audit\"": "What is internal audit's role in governance?",
        "How is a partner\\'s": "How is a partner's basis calculated?",
        "How is a partner\"": "How is a partner's basis calculated?",
        "What is a partner\\'s": "What is a partner's distributive share?",
        "What is a partner\"": "What is a partner's distributive share?",
        "IMA\\'s": "What is the IMA Statement of Ethical Professional Practice?",
        "IMA\"": "What is the IMA Statement of Ethical Professional Practice?"
      };
      
      for (const [pattern, replacement] of Object.entries(fixes)) {
        if (front.includes(pattern.replace(/\\/g, ''))) {
          card.front = replacement;
          vagueFixed++;
          break;
        }
      }
    }
  });
  
  if (vagueFixed > 0) {
    console.log(`  Fixed ${vagueFixed} vague/truncated fronts`);
  }
  
  // Write back
  const newCount = cards.length;
  if (newCount !== originalCount || truncatedFixed > 0 || vagueFixed > 0) {
    // Preserve the structure (some files have { flashcards: [...] }, others have [...])
    const output = data.flashcards ? { flashcards: cards } : cards;
    fs.writeFileSync(filePath, JSON.stringify(output, null, 2));
    console.log(`  Saved: ${originalCount} → ${newCount} cards`);
  }
});

console.log('\n=== SUMMARY ===');
console.log(`Total duplicates removed: ${totalRemoved}`);
console.log(`Total truncated backs fixed: ${totalFixed}`);
console.log('Done!');
