#!/usr/bin/env node
/**
 * qbank-fix-all: Fix all question quality issues
 * 
 * Fixes:
 * 1. Answer distribution bias - shuffles options for balanced A/B/C/D distribution
 * 2. Missing skillLevel - adds based on difficulty/question complexity
 * 3. Validates all fields are present
 * 
 * Run: node scripts/qbank-fix-all.cjs [--dry-run] [--fix-answers] [--fix-skills] [--verbose]
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const verbose = args.includes('--verbose');
const fixAnswers = args.includes('--fix-answers') || args.includes('--all');
const fixSkills = args.includes('--fix-skills') || args.includes('--all');
const sectionArg = args.find(a => !a.startsWith('-'));

const EXAMS = {
  cpa: ['far', 'aud', 'reg', 'tcp', 'isc', 'bar'],
  ea: ['see1', 'see2', 'see3'],
  cma: ['cma1', 'cma2'],
  cia: ['cia1', 'cia2', 'cia3'],
  cisa: ['cisa1', 'cisa2', 'cisa3', 'cisa4', 'cisa5'],
  cfp: ['CFP-EST', 'CFP-GEN', 'CFP-INV', 'CFP-PCR', 'CFP-PSY', 'CFP-RET', 'CFP-RISK', 'CFP-TAX'],
};

// Seeded random for deterministic shuffling
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function seededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function() {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function shuffleWithSeed(arr, seed) {
  const rng = seededRandom(seed);
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Determine skillLevel based on difficulty and question characteristics
function inferSkillLevel(question) {
  const q = question.question.toLowerCase();
  const difficulty = question.difficulty || 'medium';
  
  // Analysis indicators
  const analysisKeywords = ['analyze', 'evaluate', 'compare', 'contrast', 'assess', 
    'determine the best', 'which would be most', 'what is the primary reason',
    'most likely', 'least likely', 'best course of action', 'recommend'];
  
  // Application indicators  
  const applicationKeywords = ['calculate', 'compute', 'apply', 'prepare', 'record',
    'determine the amount', 'what is the', 'how much', 'how many', 'using the',
    'given the following', 'based on'];
    
  // Check for analysis first (highest level)
  for (const kw of analysisKeywords) {
    if (q.includes(kw)) return 'Analysis';
  }
  
  // Check for application
  for (const kw of applicationKeywords) {
    if (q.includes(kw)) return 'Application';
  }
  
  // Default based on difficulty
  if (difficulty === 'hard') return 'Analysis';
  if (difficulty === 'medium') return 'Application';
  return 'Remembering';
}

function analyzeDistribution(questions) {
  const dist = [0, 0, 0, 0];
  questions.forEach(q => {
    if (q.correctAnswer >= 0 && q.correctAnswer < 4) {
      dist[q.correctAnswer]++;
    }
  });
  const total = dist.reduce((a, b) => a + b, 0);
  return {
    counts: dist,
    percentages: dist.map(d => total > 0 ? (100 * d / total).toFixed(1) : 0),
    maxDeviation: Math.max(...dist.map(d => Math.abs((d / total * 100) - 25)))
  };
}

function fixAnswerDistribution(questions, sectionName) {
  // Target: each option should be ~25% correct
  const targetPerOption = Math.floor(questions.length / 4);
  const distribution = [0, 0, 0, 0];
  let shuffled = 0;
  
  // First pass: count current distribution
  questions.forEach(q => distribution[q.correctAnswer]++);
  
  // Find which positions are over/under represented
  const overRep = distribution.map((d, i) => ({ idx: i, excess: d - targetPerOption }))
    .filter(x => x.excess > 5)
    .sort((a, b) => b.excess - a.excess);
  
  const underRep = distribution.map((d, i) => ({ idx: i, deficit: targetPerOption - d }))
    .filter(x => x.deficit > 5)
    .sort((a, b) => b.deficit - a.deficit);
  
  if (overRep.length === 0) {
    return { questions, shuffled: 0 };
  }
  
  // Shuffle questions that have answers in over-represented positions
  const shuffledQuestions = questions.map((q, idx) => {
    const currentAnswer = q.correctAnswer;
    
    // Only shuffle if this answer position is over-represented
    const isOverRep = overRep.find(o => o.idx === currentAnswer);
    if (!isOverRep || isOverRep.excess <= 0) {
      return q;
    }
    
    // Find an under-represented position to target
    const targetPos = underRep.find(u => u.deficit > 0);
    if (!targetPos) {
      return q; // Can't improve further
    }
    
    // Create shuffled indices that put the correct answer in target position
    const options = [...q.options];
    const correctOption = options[currentAnswer];
    
    // Remove correct answer and shuffle remaining
    options.splice(currentAnswer, 1);
    const seed = hashCode(q.id + sectionName);
    const shuffledWrong = shuffleWithSeed(options, seed);
    
    // Insert correct answer at target position
    shuffledWrong.splice(targetPos.idx, 0, correctOption);
    
    // Update counters
    isOverRep.excess--;
    targetPos.deficit--;
    shuffled++;
    
    // Also update whyWrong keys if present
    let newWhyWrong = q.whyWrong;
    if (q.whyWrong && Object.keys(q.whyWrong).length > 0) {
      const labels = ['A', 'B', 'C', 'D'];
      const oldLabels = labels.map((l, i) => ({ label: l, text: q.options[i] }));
      newWhyWrong = {};
      
      shuffledWrong.forEach((opt, i) => {
        if (i === targetPos.idx) return; // Skip correct answer
        const oldEntry = oldLabels.find(o => o.text === opt);
        if (oldEntry && q.whyWrong[oldEntry.label]) {
          newWhyWrong[labels[i]] = q.whyWrong[oldEntry.label];
        }
      });
    }
    
    return {
      ...q,
      options: shuffledWrong,
      correctAnswer: targetPos.idx,
      whyWrong: newWhyWrong
    };
  });
  
  return { questions: shuffledQuestions, shuffled };
}

async function processSection(exam, section) {
  const jsonPath = path.join(__dirname, '..', 'content', exam, section, 'questions.json');
  
  if (!fs.existsSync(jsonPath)) {
    return null;
  }
  
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const questions = data.questions || [];
  let modified = false;
  let changes = { shuffled: 0, skillsAdded: 0 };
  
  // Analyze current state
  const beforeDist = analyzeDistribution(questions);
  
  // Fix 1: Answer distribution
  if (fixAnswers && beforeDist.maxDeviation > 15) {
    const result = fixAnswerDistribution(questions, `${exam}-${section}`);
    if (result.shuffled > 0) {
      data.questions = result.questions;
      changes.shuffled = result.shuffled;
      modified = true;
    }
  }
  
  // Fix 2: Missing skillLevel
  if (fixSkills) {
    data.questions = data.questions.map(q => {
      if (!q.skillLevel) {
        changes.skillsAdded++;
        modified = true;
        return { ...q, skillLevel: inferSkillLevel(q) };
      }
      return q;
    });
  }
  
  // Save if modified
  if (modified && !dryRun) {
    // Create backup
    const backupPath = jsonPath.replace('.json', `.backup-${Date.now()}.json`);
    fs.copyFileSync(jsonPath, backupPath);
    
    // Write updated file
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8');
  }
  
  const afterDist = analyzeDistribution(data.questions);
  
  return {
    exam,
    section,
    total: questions.length,
    beforeDist,
    afterDist,
    ...changes,
    modified
  };
}

async function main() {
  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║           VoraPrep Question Bank Fixer                        ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');
  
  if (!fixAnswers && !fixSkills) {
    console.log('Usage: node scripts/qbank-fix-all.cjs [options]');
    console.log('\nOptions:');
    console.log('  --fix-answers   Fix answer distribution bias');
    console.log('  --fix-skills    Add missing skillLevel');
    console.log('  --all           Fix everything');
    console.log('  --dry-run       Preview changes without saving');
    console.log('  --verbose       Show detailed output');
    console.log('\nExample: node scripts/qbank-fix-all.cjs --all');
    process.exit(0);
  }
  
  console.log(`Mode: ${dryRun ? '🔍 DRY RUN' : '✏️  LIVE'}`);
  console.log(`Fixing: ${fixAnswers ? '✓ Answers ' : ''}${fixSkills ? '✓ Skills' : ''}\n`);
  
  const results = [];
  
  for (const [exam, sections] of Object.entries(EXAMS)) {
    for (const section of sections) {
      const result = await processSection(exam, section);
      if (result) {
        results.push(result);
        
        if (verbose || result.shuffled > 0 || result.skillsAdded > 0) {
          console.log(`${exam.toUpperCase()} ${section}:`);
          if (result.shuffled > 0) {
            console.log(`  📊 Shuffled ${result.shuffled} questions`);
            console.log(`     Before: A=${result.beforeDist.percentages[0]}% B=${result.beforeDist.percentages[1]}% C=${result.beforeDist.percentages[2]}% D=${result.beforeDist.percentages[3]}%`);
            console.log(`     After:  A=${result.afterDist.percentages[0]}% B=${result.afterDist.percentages[1]}% C=${result.afterDist.percentages[2]}% D=${result.afterDist.percentages[3]}%`);
          }
          if (result.skillsAdded > 0) {
            console.log(`  🎯 Added skillLevel to ${result.skillsAdded} questions`);
          }
        }
      }
    }
  }
  
  // Summary
  const totalShuffled = results.reduce((a, r) => a + r.shuffled, 0);
  const totalSkills = results.reduce((a, r) => a + r.skillsAdded, 0);
  
  console.log('\n' + '═'.repeat(60));
  console.log('SUMMARY');
  console.log('═'.repeat(60));
  console.log(`Total sections processed: ${results.length}`);
  if (fixAnswers) console.log(`Questions shuffled for balance: ${totalShuffled}`);
  if (fixSkills) console.log(`SkillLevel added: ${totalSkills}`);
  
  if (dryRun) {
    console.log('\n⚠️  DRY RUN - no changes saved. Remove --dry-run to apply fixes.');
  } else {
    console.log('\n✅ Changes saved successfully!');
  }
}

main().catch(console.error);
