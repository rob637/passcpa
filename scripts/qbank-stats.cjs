#!/usr/bin/env node
/**
 * qbank-stats: Display comprehensive question bank statistics
 * 
 * Shows:
 * - Question counts per section
 * - Blueprint coverage
 * - Difficulty distribution
 * - Enhancement status (whyWrong, memoryAid, etc.)
 * - Quality metrics
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content/cpa');
const SRC_QUESTIONS = path.join(PROJECT_ROOT, 'src/data/cpa/questions');

const SECTIONS = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'];

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function color(c, text) {
  return `${colors[c]}${text}${colors.reset}`;
}

/**
 * Count questions from TypeScript source files (current state)
 */
function countFromTypeScript(section) {
  const sectionLower = section.toLowerCase();
  const prefix = `${sectionLower}-`;
  
  if (!fs.existsSync(SRC_QUESTIONS)) return null;
  
  const files = fs.readdirSync(SRC_QUESTIONS)
    .filter(f => f.startsWith(prefix) && f.endsWith('.ts'));
  
  let totalQuestions = 0;
  let withWhyWrong = 0;
  let withMemoryAid = 0;
  let withBottomLine = 0;
  let byDifficulty = { easy: 0, medium: 0, hard: 0 };
  let byBlueprint = {};
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(SRC_QUESTIONS, file), 'utf-8');
    
    // Count questions by looking for id patterns
    const idMatches = content.match(/id:\s*['"][a-z]+-[^'"]+['"]/g) || [];
    const sectionMatches = content.match(new RegExp(`section:\\s*['"]${section}['"]`, 'g')) || [];
    
    // Use whichever is smaller to avoid counting other sections
    const questionCount = Math.min(idMatches.length, sectionMatches.length || idMatches.length);
    totalQuestions += questionCount;
    
    // Count enhancements
    withWhyWrong += (content.match(/whyWrong:\s*\{/g) || []).length;
    withMemoryAid += (content.match(/memoryAid:\s*['"`]/g) || []).length;
    withBottomLine += (content.match(/bottomLine:\s*['"`]/g) || []).length;
    
    // Count difficulty
    byDifficulty.easy += (content.match(/difficulty:\s*['"]easy['"]/gi) || []).length;
    byDifficulty.medium += (content.match(/difficulty:\s*['"]medium['"]/gi) || []).length;
    byDifficulty.hard += (content.match(/difficulty:\s*['"]hard['"]/gi) || []).length;
    
    // Count blueprint areas
    const bpMatches = content.matchAll(/blueprintArea:\s*['"]([^'"]+)['"]/g);
    for (const match of bpMatches) {
      const area = match[1];
      byBlueprint[area] = (byBlueprint[area] || 0) + 1;
    }
  }
  
  return {
    files: files.length,
    totalQuestions,
    withWhyWrong,
    withMemoryAid,
    withBottomLine,
    byDifficulty,
    byBlueprint,
  };
}

/**
 * Get stats from migrated JSON (if available)
 */
function getJsonStats(section) {
  const jsonPath = path.join(CONTENT_DIR, section.toLowerCase(), 'questions.json');
  
  if (!fs.existsSync(jsonPath)) return null;
  
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const questions = data.questions || [];
  
  let withWhyWrong = 0;
  let withMemoryAid = 0;
  let withBottomLine = 0;
  let byDifficulty = { easy: 0, medium: 0, hard: 0 };
  let byBlueprint = {};
  let byStatus = { draft: 0, review: 0, approved: 0, retired: 0 };
  
  for (const q of questions) {
    if (q.whyWrong && Object.keys(q.whyWrong).length > 0) withWhyWrong++;
    if (q.memoryAid) withMemoryAid++;
    if (q.bottomLine) withBottomLine++;
    
    byDifficulty[q.difficulty] = (byDifficulty[q.difficulty] || 0) + 1;
    byBlueprint[q.blueprintArea] = (byBlueprint[q.blueprintArea] || 0) + 1;
    byStatus[q.status] = (byStatus[q.status] || 0) + 1;
  }
  
  return {
    totalQuestions: questions.length,
    withWhyWrong,
    withMemoryAid,
    withBottomLine,
    byDifficulty,
    byBlueprint,
    byStatus,
    exportedAt: data.exportedAt,
  };
}

function progressBar(value, max, width = 20) {
  const percent = max > 0 ? value / max : 0;
  const filled = Math.round(width * percent);
  const empty = width - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);
  return `${bar} ${Math.round(percent * 100)}%`;
}

function main() {
  console.log('');
  console.log(color('bright', '╔══════════════════════════════════════════════════════════════╗'));
  console.log(color('bright', '║              VoraPrep CPA Question Bank Statistics            ║'));
  console.log(color('bright', '╚══════════════════════════════════════════════════════════════╝'));
  console.log('');
  
  // Check for JSON content
  const hasJsonContent = fs.existsSync(CONTENT_DIR) && 
    fs.readdirSync(CONTENT_DIR).some(f => fs.statSync(path.join(CONTENT_DIR, f)).isDirectory());
  
  let grandTotal = 0;
  let grandEnhanced = 0;
  const sectionStats = [];
  
  // Header
  console.log(color('cyan', '  Section  │  Questions  │   Enhanced   │  Difficulty Distribution'));
  console.log('  ─────────┼─────────────┼──────────────┼──────────────────────────');
  
  for (const section of SECTIONS) {
    const tsStats = countFromTypeScript(section);
    const jsonStats = getJsonStats(section);
    
    // Use JSON stats if available, otherwise TypeScript
    const stats = jsonStats || tsStats;
    
    if (!stats || stats.totalQuestions === 0) {
      console.log(`  ${section.padEnd(8)} │      0      │      -       │  No questions found`);
      continue;
    }
    
    const total = stats.totalQuestions;
    const enhanced = stats.withWhyWrong;
    const enhancedPct = total > 0 ? Math.round((enhanced / total) * 100) : 0;
    
    grandTotal += total;
    grandEnhanced += enhanced;
    
    // Difficulty bars
    const easy = stats.byDifficulty.easy || 0;
    const medium = stats.byDifficulty.medium || 0;
    const hard = stats.byDifficulty.hard || 0;
    const diffTotal = easy + medium + hard;
    
    const easyPct = diffTotal > 0 ? Math.round((easy / diffTotal) * 100) : 0;
    const medPct = diffTotal > 0 ? Math.round((medium / diffTotal) * 100) : 0;
    const hardPct = diffTotal > 0 ? Math.round((hard / diffTotal) * 100) : 0;
    
    const diffBar = `${color('green', `E:${easyPct}%`)} ${color('yellow', `M:${medPct}%`)} ${color('red', `H:${hardPct}%`)}`;
    
    const enhanceColor = enhancedPct === 100 ? 'green' : enhancedPct > 50 ? 'yellow' : 'dim';
    
    console.log(`  ${color('bright', section.padEnd(8))} │ ${total.toString().padStart(6)}      │ ${color(enhanceColor, (enhancedPct + '%').padStart(5))} (${enhanced})  │  ${diffBar}`);
    
    sectionStats.push({ section, total, enhanced, stats });
  }
  
  // Summary
  console.log('  ─────────┼─────────────┼──────────────┼──────────────────────────');
  const grandPct = grandTotal > 0 ? Math.round((grandEnhanced / grandTotal) * 100) : 0;
  console.log(`  ${color('bright', 'TOTAL'.padEnd(8))} │ ${color('bright', grandTotal.toString().padStart(6))}      │ ${color('bright', (grandPct + '%').padStart(5))} (${grandEnhanced})  │`);
  
  // Enhancement status
  console.log('');
  console.log(color('cyan', '  Enhancement Progress'));
  console.log('  ' + progressBar(grandEnhanced, grandTotal, 40));
  console.log('');
  
  // Blueprint coverage per section
  console.log(color('cyan', '  Blueprint Area Coverage'));
  for (const { section, stats } of sectionStats) {
    if (!stats || !stats.byBlueprint) continue;
    
    const areas = Object.entries(stats.byBlueprint).sort();
    if (areas.length === 0) continue;
    
    console.log(`  ${color('bright', section)}: ${areas.map(([area, count]) => `${area}(${count})`).join(', ')}`);
  }
  
  // JSON migration status
  console.log('');
  console.log(color('cyan', '  JSON Migration Status'));
  for (const section of SECTIONS) {
    const jsonPath = path.join(CONTENT_DIR, section.toLowerCase(), 'questions.json');
    const exists = fs.existsSync(jsonPath);
    const icon = exists ? color('green', '✓') : color('dim', '○');
    console.log(`  ${icon} ${section}: ${exists ? 'Migrated' : 'Not migrated'}`);
  }
  
  console.log('');
}

main();
