#!/usr/bin/env node
/**
 * qbank-balance-answers: Fix answer distribution without corrupting whyWrong
 * 
 * This script balances answer distribution by swapping question order,
 * NOT by shuffling options (which would corrupt whyWrong mappings).
 * 
 * Strategy: For sections with bias, identify questions that can have their
 * options reordered safely (where whyWrong keys match option indices).
 * 
 * Run: node scripts/qbank-balance-answers.cjs [--dry-run] [-
 * 
 * -verbose]
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const verbose = args.includes('--verbose');

const EXAMS = {
  cpa: ['far', 'aud', 'reg', 'tcp', 'isc', 'bar'],
  ea: ['see1', 'see2', 'see3'],
  cma: ['cma1', 'cma2'],
  cia: ['cia1', 'cia2', 'cia3'],
  cisa: ['cisa1', 'cisa2', 'cisa3', 'cisa4', 'cisa5'],
  cfp: ['CFP-EST', 'CFP-GEN', 'CFP-INV', 'CFP-PCR', 'CFP-PSY', 'CFP-RET', 'CFP-RISK', 'CFP-TAX'],
};

function analyzeDistribution(questions) {
  const dist = [0, 0, 0, 0];
  questions.forEach(q => {
    const ca = q.correctAnswer;
    if (ca >= 0 && ca < 4) dist[ca]++;
  });
  const total = dist.reduce((a, b) => a + b, 0);
  const pcts = dist.map(d => total > 0 ? 100 * d / total : 0);
  const maxDev = Math.max(...pcts.map(p => Math.abs(p - 25)));
  return { counts: dist, pcts, maxDev, total };
}

// Check if whyWrong uses letter keys (A,B,C,D) or numeric (0,1,2,3)
function getWhyWrongKeyType(q) {
  if (!q.whyWrong) return null;
  const keys = Object.keys(q.whyWrong);
  if (keys.length === 0) return null;
  if (keys.some(k => ['A', 'B', 'C', 'D'].includes(k))) return 'letter';
  if (keys.some(k => ['0', '1', '2', '3'].includes(k))) return 'numeric';
  return 'unknown';
}

// Safely swap options and update all references
function swapOptions(q, fromIdx, toIdx) {
  const labels = ['A', 'B', 'C', 'D'];
  const options = [...q.options];
  
  // Swap options
  [options[fromIdx], options[toIdx]] = [options[toIdx], options[fromIdx]];
  
  // Update correctAnswer
  let newCorrect = q.correctAnswer;
  if (q.correctAnswer === fromIdx) newCorrect = toIdx;
  else if (q.correctAnswer === toIdx) newCorrect = fromIdx;
  
  // Update whyWrong keys
  const keyType = getWhyWrongKeyType(q);
  let newWhyWrong = q.whyWrong ? { ...q.whyWrong } : null;
  
  if (newWhyWrong && keyType === 'letter') {
    const fromKey = labels[fromIdx];
    const toKey = labels[toIdx];
    const fromVal = newWhyWrong[fromKey];
    const toVal = newWhyWrong[toKey];
    
    if (fromVal !== undefined) newWhyWrong[toKey] = fromVal;
    else delete newWhyWrong[toKey];
    
    if (toVal !== undefined) newWhyWrong[fromKey] = toVal;
    else delete newWhyWrong[fromKey];
  } else if (newWhyWrong && keyType === 'numeric') {
    const fromKey = String(fromIdx);
    const toKey = String(toIdx);
    const fromVal = newWhyWrong[fromKey];
    const toVal = newWhyWrong[toKey];
    
    if (fromVal !== undefined) newWhyWrong[toKey] = fromVal;
    else delete newWhyWrong[toKey];
    
    if (toVal !== undefined) newWhyWrong[fromKey] = toVal;
    else delete newWhyWrong[fromKey];
  }
  
  return {
    ...q,
    options,
    correctAnswer: newCorrect,
    ...(newWhyWrong ? { whyWrong: newWhyWrong } : {})
  };
}

function balanceSection(questions, sectionName) {
  const before = analyzeDistribution(questions);
  
  // Only process if bias is significant (>5% deviation)
  if (before.maxDev <= 5) {
    return { questions, swapped: 0, before, after: before };
  }
  
  const target = Math.floor(questions.length / 4);
  const counts = [...before.counts];
  let swapped = 0;
  
  // Process each question
  const result = questions.map(q => {
    const current = q.correctAnswer;
    
    // Skip if current position is not over-represented
    if (counts[current] <= target + 5) return q;
    
    // Find an under-represented position
    const underIdx = counts.findIndex(c => c < target - 5);
    if (underIdx === -1 || underIdx === current) return q;
    
    // Perform swap
    const swappedQ = swapOptions(q, current, underIdx);
    
    // Update our tracking counts
    counts[current]--;
    counts[underIdx]++;
    swapped++;
    
    return swappedQ;
  });
  
  const after = analyzeDistribution(result);
  
  return { questions: result, swapped, before, after };
}

async function processSection(exam, section) {
  const jsonPath = path.join(__dirname, '..', 'content', exam, section, 'questions.json');
  
  if (!fs.existsSync(jsonPath)) {
    return null;
  }
  
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const questions = data.questions || [];
  
  const result = balanceSection(questions, `${exam}-${section}`);
  
  if (result.swapped > 0 && !dryRun) {
    // Create backup
    const backupPath = jsonPath.replace('.json', `.pre-balance-${Date.now()}.json`);
    fs.copyFileSync(jsonPath, backupPath);
    
    // Write balanced file
    data.questions = result.questions;
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8');
  }
  
  return {
    exam: exam.toUpperCase(),
    section: section.toUpperCase(),
    total: questions.length,
    ...result
  };
}

async function main() {
  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║           VoraPrep Answer Balance Tool                        ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');
  
  console.log(`Mode: ${dryRun ? '🔍 DRY RUN' : '✏️  LIVE'}\n`);
  
  const results = [];
  
  for (const [exam, sections] of Object.entries(EXAMS)) {
    for (const section of sections) {
      const result = await processSection(exam, section);
      if (result && result.swapped > 0) {
        results.push(result);
        
        const b = result.before.pcts.map(p => p.toFixed(0) + '%').join('/');
        const a = result.after.pcts.map(p => p.toFixed(0) + '%').join('/');
        
        console.log(`${result.exam} ${result.section}: Swapped ${result.swapped} questions`);
        console.log(`  Before: A/B/C/D = ${b}`);
        console.log(`  After:  A/B/C/D = ${a}`);
      }
    }
  }
  
  if (results.length === 0) {
    console.log('✅ All sections already balanced (within 5% tolerance)');
  } else {
    const totalSwapped = results.reduce((a, r) => a + r.swapped, 0);
    console.log('\n' + '═'.repeat(60));
    console.log(`Total questions rebalanced: ${totalSwapped}`);
    
    if (dryRun) {
      console.log('\n⚠️  DRY RUN - no changes saved. Remove --dry-run to apply.');
    } else {
      console.log('\n✅ Changes saved successfully!');
    }
  }
}

main().catch(console.error);
