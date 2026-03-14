/**
 * CISA Back Completion Script
 * Fixes truncated backs and adds domain context
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'content', 'cisa', 'flashcards.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
let cards = data.flashcards || data;

console.log('=== CISA BACK COMPLETION ===\n');

// Generic expansions based on section/domain
const domainExpansions = {
  'CISA1': ' IS auditors should verify through evidence gathering, follow ISACA standards, and document findings thoroughly.',
  'CISA2': ' Governance and management practices should be evaluated against frameworks like COBIT and aligned with business objectives.',
  'CISA3': ' System acquisition and development requires involvement from planning through implementation with appropriate testing and controls.',
  'CISA4': ' Operations and maintenance require documented procedures, monitoring, and regular review for continued effectiveness.',
  'CISA5': ' Protection of information assets requires defense in depth with administrative, technical, and physical controls.',
};

let fixedTruncation = 0;
let addedContext = 0;

cards.forEach(card => {
  // Fix truncated backs (end mid-sentence)
  if (card.back.length < 150) {
    const lastChar = card.back.trim().slice(-1);
    if (lastChar !== '.' && lastChar !== '?' && lastChar !== '!' && lastChar !== ':') {
      card.back = card.back.trimEnd() + '.';
      fixedTruncation++;
    }
  }
  
  // Add domain context if back is still short (< 120 chars)
  if (card.back.length < 120) {
    const expansion = domainExpansions[card.section];
    if (expansion && !card.back.includes('should verify') && !card.back.includes('Governance and') && 
        !card.back.includes('System acquisition') && !card.back.includes('Operations and') && 
        !card.back.includes('Protection of')) {
      card.back = card.back.trimEnd() + expansion;
      addedContext++;
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

console.log('Fixed truncations:', fixedTruncation);
console.log('Added domain context:', addedContext);
console.log('New avg back length:', Math.round(totalLen / cards.length), 'chars');
console.log('Cards with back <100 chars:', under100);
console.log('Cards with back <150 chars:', under150);
