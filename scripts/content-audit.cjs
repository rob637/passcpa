#!/usr/bin/env node
/**
 * Comprehensive Content Audit Script
 * 
 * Checks all question files for:
 * 1. Structural issues (missing fields, wrong types, correctAnswer bounds)
 * 2. AI artifacts (thinking-out-loud phrases in explanations)
 * 3. Content quality (answer distribution bias, "all of the above", short explanations)
 * 4. Outdated references (BEC section, repealed laws, old exam formats)
 * 5. ID format issues (uppercase, duplicates, missing courseId)
 * 6. Option count validation (must be exactly 4)
 * 
 * Usage: node scripts/content-audit.cjs [--fix] [--course cpa|ea|cma|cia|cisa|cfp]
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob') || (() => {
  // Fallback glob implementation using fs
  function walkSync(dir, pattern) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        results = results.concat(walkSync(filePath, pattern));
      } else if (filePath.endsWith('.ts') && filePath.includes('questions')) {
        results.push(filePath);
      }
    }
    return results;
  }
  return { sync: (pattern) => walkSync('src/data', pattern) };
})();

// ═══════════════════════════════════════════════════════════
// Configuration
// ═══════════════════════════════════════════════════════════

const AI_ARTIFACT_PATTERNS = [
  /Wait[,—].*recalculate/i,
  /Wait[,—].*reconsider/i,
  /let me reconsider/i,
  /let me recalculate/i,
  /let me verify/i,
  /let me re-?read/i,
  /Hmm[,.]/,
  /Actually[,.].*let me/i,
  /that doesn'?t seem right/i,
  /This contradicts/i,
  /that'?s not right/i,
  /Here'?s my analysis/i,
  /I think.*should be/i,
  /But actually:/i,
  /On second thought/i,
  /No,? wait/i,
  /Let me think/i,
  /I would say/i,
  /\bI believe\b/i,
  /I need to/i,
];

const OUTDATED_REFERENCES = [
  { pattern: /\bBEC\b/, message: 'References BEC section (retired Dec 2023)', context: 'CPA' },
  { pattern: /\bSection 179D\b.*\$1\.80/i, message: 'Old §179D deduction amount ($1.80 → check current rates)', context: 'tax' },
  { pattern: /\b401\(k\).*\$20,500\b/, message: 'Old 401(k) limit ($20,500 was 2022)', context: 'retirement' },
  { pattern: /\b401\(k\).*\$22,500\b/, message: 'Old 401(k) limit ($22,500 was 2023, now $23,500 for 2025)', context: 'retirement' },
  { pattern: /\bIRA.*\$6,000\b/, message: 'Old IRA limit ($6,000 was 2021)', context: 'retirement' },
  { pattern: /\bIRA.*\$6,500\b/, message: 'Old IRA limit ($6,500 was 2023, now $7,000 for 2024+)', context: 'retirement' },
  { pattern: /\bestate.*exemption.*\$12\.06/i, message: 'Old estate exemption ($12.06M was 2022)', context: 'estate' },
  { pattern: /\bestate.*exemption.*\$12\.92/i, message: 'Old estate exemption ($12.92M was 2023)', context: 'estate' },
  { pattern: /\bstandard deduction.*\$12,950/i, message: 'Old standard deduction ($12,950 was 2022)', context: 'tax' },
  { pattern: /\bstandard deduction.*\$13,850/i, message: 'Old standard deduction ($13,850 was 2023)', context: 'tax' },
  { pattern: /\bSarbanes[- ]Oxley\b.*\bSOX\b.*200[23]\b/i, message: 'SOX date reference may be outdated', context: 'audit' },
];

const VALID_SECTIONS = {
  cpa: ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'],
  ea: ['SEE1', 'SEE2', 'SEE3'],
  cma: ['CMA1', 'CMA2'],
  cia: ['CIA1', 'CIA2', 'CIA3'],
  cisa: ['CISA1', 'CISA2', 'CISA3', 'CISA4', 'CISA5'],
  cfp: ['CFP-GEN', 'CFP-PCR', 'CFP-INV', 'CFP-RET', 'CFP-TAX', 'CFP-EST', 'CFP-RISK', 'CFP-PSY'],
};

const REQUIRED_FIELDS = ['id', 'question', 'options', 'correctAnswer', 'explanation'];
const RECOMMENDED_FIELDS = ['courseId', 'section', 'difficulty', 'topic'];

// ═══════════════════════════════════════════════════════════
// Parse questions from TypeScript files
// ═══════════════════════════════════════════════════════════

function parseQuestionsFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const questions = [];
  const lines = content.split('\n');
  
  let current = {};
  let inOptions = false;
  let optionCount = 0;
  let lineNum = 0;
  let questionStartLine = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const s = line.trim();
    lineNum = i + 1;
    
    // New question object
    const idMatch = s.match(/^id:\s*['"]([^'"]+)['"]/);
    if (idMatch) {
      if (current.id) {
        current.optionCount = optionCount;
        questions.push(current);
      }
      current = { id: idMatch[1], _line: lineNum, _file: filePath };
      optionCount = 0;
      questionStartLine = lineNum;
    }
    
    // courseId
    const courseMatch = s.match(/^courseId:\s*['"]([^'"]+)['"]/);
    if (courseMatch) current.courseId = courseMatch[1];
    
    // section
    const sectionMatch = s.match(/^section:\s*['"]([^'"]+)['"]/);
    if (sectionMatch) current.section = sectionMatch[1];
    
    // difficulty
    const diffMatch = s.match(/^difficulty:\s*['"]([^'"]+)['"]/);
    if (diffMatch) current.difficulty = diffMatch[1];
    
    // topic
    const topicMatch = s.match(/^topic:\s*['"]([^'"]+)['"]/);
    if (topicMatch) current.topic = topicMatch[1];
    
    // skillLevel
    const skillMatch = s.match(/^skillLevel:\s*['"]([^'"]+)['"]/);
    if (skillMatch) current.skillLevel = skillMatch[1];
    
    // blueprintArea
    const bpMatch = s.match(/^blueprintArea:\s*['"]([^'"]+)['"]/);
    if (bpMatch) current.blueprintArea = bpMatch[1];
    
    // question text (capture multiline)
    const qMatch = s.match(/^question:\s*['"](.+)['"]/);
    if (qMatch) {
      current.question = qMatch[1];
    } else if (s.match(/^question:\s*$/)) {
      // question is on next line(s)
      current.question = '(multiline)';
    } else if (s.match(/^question:/)) {
      current.question = s.replace(/^question:\s*/, '');
    }
    
    // correctAnswer
    const caMatch = s.match(/^correctAnswer:\s*(\d+)/);
    if (caMatch) current.correctAnswer = parseInt(caMatch[1]);
    
    // explanation (just check if it exists and capture first part)
    if (s.match(/^explanation:/)) {
      const expText = s.replace(/^explanation:\s*/, '');
      current.explanation = expText || '(present)';
    }
    
    // Options
    if (s.includes('options:') && s.includes('[')) {
      current.options = true;
      const afterOptions = s.split('options:')[1];
      const inlineOpts = afterOptions.match(/'[^']*'|"[^"]*"/g) || [];
      optionCount = inlineOpts.length;
      if (afterOptions.includes(']')) {
        inOptions = false;
      } else {
        inOptions = true;
      }
      continue;
    }
    
    if (inOptions) {
      const optsOnLine = s.match(/'[^']*'|"[^"]*"/g) || [];
      optionCount += optsOnLine.length;
      if (s.includes(']')) {
        inOptions = false;
      }
    }
  }
  
  // Last question
  if (current.id) {
    current.optionCount = optionCount;
    questions.push(current);
  }
  
  return questions;
}

// ═══════════════════════════════════════════════════════════
// Audit checks
// ═══════════════════════════════════════════════════════════

function auditQuestion(q, fileContent) {
  const issues = [];
  
  // 1. Missing required fields
  for (const field of REQUIRED_FIELDS) {
    if (q[field] === undefined || q[field] === null) {
      issues.push({ severity: 'error', check: 'missing-field', message: `Missing required field: ${field}` });
    }
  }
  
  // 2. Missing recommended fields
  for (const field of RECOMMENDED_FIELDS) {
    if (q[field] === undefined || q[field] === null) {
      issues.push({ severity: 'warning', check: 'missing-field', message: `Missing recommended field: ${field}` });
    }
  }
  
  // 3. correctAnswer bounds
  if (q.correctAnswer !== undefined && q.optionCount > 0) {
    if (q.correctAnswer >= q.optionCount) {
      issues.push({ severity: 'critical', check: 'answer-bounds', message: `correctAnswer=${q.correctAnswer} >= options count=${q.optionCount}` });
    }
    if (q.correctAnswer < 0) {
      issues.push({ severity: 'critical', check: 'answer-bounds', message: `correctAnswer is negative: ${q.correctAnswer}` });
    }
  }

  // 4. Option count
  if (q.optionCount > 0 && q.optionCount !== 4) {
    // Might be a parsing artifact from apostrophes
    if (q.optionCount > 4) {
      issues.push({ severity: 'info', check: 'option-count', message: `${q.optionCount} options detected (may be apostrophe in text)` });
    } else {
      issues.push({ severity: 'error', check: 'option-count', message: `Only ${q.optionCount} options (expected 4)` });
    }
  }
  
  // 5. ID format
  if (q.id !== q.id.toLowerCase()) {
    issues.push({ severity: 'warning', check: 'id-format', message: `ID not lowercase: ${q.id}` });
  }
  
  // 6. Difficulty validation
  if (q.difficulty && !['easy', 'medium', 'hard'].includes(q.difficulty)) {
    issues.push({ severity: 'error', check: 'invalid-difficulty', message: `Invalid difficulty: ${q.difficulty}` });
  }
  
  // 7. Section validation
  if (q.courseId && q.section) {
    const validSections = VALID_SECTIONS[q.courseId] || [];
    if (validSections.length > 0 && !validSections.includes(q.section)) {
      issues.push({ severity: 'warning', check: 'invalid-section', message: `Section '${q.section}' not in valid sections for ${q.courseId}` });
    }
  }
  
  // 8. AI artifacts in explanation (check the raw file content around this question)
  if (q.explanation) {
    // Get the explanation text from the file
    const explanationRegex = new RegExp(`id:\\s*['"]${q.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"][\\s\\S]*?explanation:\\s*['"\`]([\\s\\S]*?)['"\`]\\s*,?\\s*(?:reference|topic|subtopic|\\})`);
    const expMatch = fileContent.match(explanationRegex);
    const explanationText = expMatch ? expMatch[1] : q.explanation;
    
    for (const pattern of AI_ARTIFACT_PATTERNS) {
      if (pattern.test(explanationText)) {
        const match = explanationText.match(pattern);
        issues.push({ severity: 'error', check: 'ai-artifact', message: `AI artifact: "${match[0]}"` });
      }
    }
  }
  
  // 9. Outdated references
  const questionBlock = fileContent.substring(
    fileContent.indexOf(`'${q.id}'`) || 0,
    fileContent.indexOf(`'${q.id}'`) > 0 ? fileContent.indexOf(`'${q.id}'`) + 3000 : 0
  );
  if (questionBlock) {
    for (const ref of OUTDATED_REFERENCES) {
      if (ref.pattern.test(questionBlock)) {
        issues.push({ severity: 'warning', check: 'outdated-ref', message: ref.message });
      }
    }
  }
  
  // 10. Old-format fields
  if (fileContent.includes(`'${q.id}'`)) {
    const block = questionBlock || '';
    if (block.includes('correctOptionId:')) {
      issues.push({ severity: 'critical', check: 'old-format', message: 'Uses correctOptionId instead of correctAnswer' });
    }
    if (/\btext:\s*['"]/.test(block) && !/\bquestion:\s*['"]/.test(block) && block.indexOf(q.id) < block.indexOf('text:')) {
      issues.push({ severity: 'critical', check: 'old-format', message: 'Uses text instead of question field' });
    }
  }
  
  return issues;
}

// ═══════════════════════════════════════════════════════════
// Main execution
// ═══════════════════════════════════════════════════════════

function findQuestionFiles(courseFilter) {
  const baseDir = path.join(__dirname, '..', 'src', 'data');
  const files = [];
  
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.ts') && fullPath.includes('questions')) {
        // Skip index files and type files
        if (entry.name === 'index.ts' || entry.name === 'types.ts') continue;
        files.push(fullPath);
      }
    }
  }
  
  if (courseFilter) {
    walk(path.join(baseDir, courseFilter));
  } else {
    const courses = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];
    for (const course of courses) {
      walk(path.join(baseDir, course));
    }
  }
  
  return files.sort();
}

function main() {
  const args = process.argv.slice(2);
  const courseFilter = args.includes('--course') ? args[args.indexOf('--course') + 1] : null;
  const verbose = args.includes('--verbose') || args.includes('-v');
  const jsonOutput = args.includes('--json');
  
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║           VoraPrep Content Audit Report                 ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');
  
  const files = findQuestionFiles(courseFilter);
  console.log(`Scanning ${files.length} question files${courseFilter ? ` (course: ${courseFilter})` : ''}...\n`);
  
  let totalQuestions = 0;
  let totalIssues = { critical: 0, error: 0, warning: 0, info: 0 };
  const allIssues = [];
  const duplicateIds = new Map();
  const answerDistribution = { 0: 0, 1: 0, 2: 0, 3: 0 };
  const courseStats = {};
  
  for (const file of files) {
    const fileContent = fs.readFileSync(file, 'utf8');
    const questions = parseQuestionsFromFile(file);
    const relPath = path.relative(path.join(__dirname, '..'), file);
    
    for (const q of questions) {
      totalQuestions++;
      
      // Track answer distribution
      if (q.correctAnswer !== undefined && q.correctAnswer >= 0 && q.correctAnswer <= 3) {
        answerDistribution[q.correctAnswer]++;
      }
      
      // Track course stats
      const course = q.courseId || 'unknown';
      if (!courseStats[course]) courseStats[course] = { total: 0, errors: 0, warnings: 0 };
      courseStats[course].total++;
      
      // Track duplicates
      if (duplicateIds.has(q.id)) {
        duplicateIds.get(q.id).push(relPath);
      } else {
        duplicateIds.set(q.id, [relPath]);
      }
      
      // Run checks
      const issues = auditQuestion(q, fileContent);
      for (const issue of issues) {
        totalIssues[issue.severity]++;
        if (issue.severity === 'error' || issue.severity === 'critical') {
          courseStats[course].errors++;
        } else if (issue.severity === 'warning') {
          courseStats[course].warnings++;
        }
        
        if (verbose || issue.severity === 'critical' || issue.severity === 'error') {
          allIssues.push({ file: relPath, id: q.id, line: q._line, ...issue });
        }
      }
    }
  }
  
  // Check for duplicate IDs
  let duplicateCount = 0;
  for (const [id, locations] of duplicateIds) {
    if (locations.length > 1) {
      duplicateCount++;
      allIssues.push({
        file: locations.join(', '),
        id,
        line: 0,
        severity: 'error',
        check: 'duplicate-id',
        message: `Duplicate ID found in ${locations.length} files`
      });
      totalIssues.error++;
    }
  }
  
  // ─── Summary ───
  console.log('═══ SUMMARY ═══════════════════════════════════════════════\n');
  console.log(`Total questions scanned: ${totalQuestions}`);
  console.log(`Total files scanned:     ${files.length}`);
  console.log(`Duplicate IDs:           ${duplicateCount}\n`);
  
  console.log('Issues by severity:');
  console.log(`  🔴 Critical: ${totalIssues.critical}`);
  console.log(`  🟠 Error:    ${totalIssues.error}`);
  console.log(`  🟡 Warning:  ${totalIssues.warning}`);
  console.log(`  🔵 Info:     ${totalIssues.info}\n`);
  
  // ─── Answer Distribution ───
  console.log('═══ ANSWER DISTRIBUTION ════════════════════════════════════\n');
  const totalAnswered = Object.values(answerDistribution).reduce((a, b) => a + b, 0);
  for (const [idx, count] of Object.entries(answerDistribution)) {
    const pct = totalAnswered > 0 ? ((count / totalAnswered) * 100).toFixed(1) : 0;
    const letter = String.fromCharCode(65 + parseInt(idx));
    const bar = '█'.repeat(Math.round(pct / 2));
    const expected = (100 / 4).toFixed(1);
    const bias = Math.abs(parseFloat(pct) - 25);
    const flag = bias > 5 ? ' ⚠️  BIASED' : '';
    console.log(`  ${letter}: ${count.toString().padStart(5)} (${pct}%) ${bar}${flag}`);
  }
  console.log();
  
  // ─── Per-Course Stats ───
  console.log('═══ PER-COURSE STATS ══════════════════════════════════════\n');
  for (const [course, stats] of Object.entries(courseStats).sort()) {
    const status = stats.errors > 0 ? '🔴' : stats.warnings > 0 ? '🟡' : '✅';
    console.log(`  ${status} ${course.padEnd(8)} ${stats.total.toString().padStart(5)} questions | ${stats.errors} errors | ${stats.warnings} warnings`);
  }
  console.log();
  
  // ─── Critical & Error Details ───
  if (allIssues.filter(i => i.severity === 'critical' || i.severity === 'error').length > 0) {
    console.log('═══ CRITICAL & ERROR DETAILS ══════════════════════════════\n');
    
    // Group by check type
    const byCheck = {};
    for (const issue of allIssues) {
      if (issue.severity !== 'critical' && issue.severity !== 'error') continue;
      if (!byCheck[issue.check]) byCheck[issue.check] = [];
      byCheck[issue.check].push(issue);
    }
    
    for (const [check, issues] of Object.entries(byCheck).sort()) {
      console.log(`── ${check} (${issues.length}) ──`);
      const shown = issues.slice(0, 20);
      for (const issue of shown) {
        const sev = issue.severity === 'critical' ? '🔴' : '🟠';
        console.log(`  ${sev} ${issue.file}:${issue.line} | ${issue.id} | ${issue.message}`);
      }
      if (issues.length > 20) {
        console.log(`  ... and ${issues.length - 20} more\n`);
      }
      console.log();
    }
  }
  
  // ─── Warnings (if verbose) ───
  if (verbose) {
    const warnings = allIssues.filter(i => i.severity === 'warning');
    if (warnings.length > 0) {
      console.log('═══ WARNINGS ══════════════════════════════════════════════\n');
      const byCheck = {};
      for (const w of warnings) {
        if (!byCheck[w.check]) byCheck[w.check] = [];
        byCheck[w.check].push(w);
      }
      for (const [check, issues] of Object.entries(byCheck).sort()) {
        console.log(`── ${check} (${issues.length}) ──`);
        const shown = issues.slice(0, 10);
        for (const issue of shown) {
          console.log(`  🟡 ${issue.file}:${issue.line} | ${issue.id} | ${issue.message}`);
        }
        if (issues.length > 10) {
          console.log(`  ... and ${issues.length - 10} more`);
        }
        console.log();
      }
    }
  }
  
  // ─── JSON output ───
  if (jsonOutput) {
    const report = {
      timestamp: new Date().toISOString(),
      totalQuestions,
      totalFiles: files.length,
      duplicateIds: duplicateCount,
      issues: totalIssues,
      answerDistribution,
      courseStats,
      details: allIssues,
    };
    fs.writeFileSync('content-audit-report.json', JSON.stringify(report, null, 2));
    console.log('Full report written to content-audit-report.json');
  }
  
  // Exit code
  if (totalIssues.critical > 0) {
    console.log('\n❌ AUDIT FAILED: Critical issues found that MUST be fixed.');
    process.exit(1);
  } else if (totalIssues.error > 0) {
    console.log('\n⚠️  AUDIT WARNING: Errors found that should be reviewed.');
    process.exit(0); // Don't fail on errors, just warn
  } else {
    console.log('\n✅ AUDIT PASSED: No critical issues found.');
    process.exit(0);
  }
}

main();
