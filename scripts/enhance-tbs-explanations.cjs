#!/usr/bin/env node
/**
 * Enhance TBS Explanations
 * 
 * Identifies TBS requirements with short or missing explanations
 * and provides templates for comprehensive, educational explanations.
 * 
 * Run: node scripts/enhance-tbs-explanations.cjs [--audit|--enhance|--file <filename>]
 */

const fs = require('fs');
const path = require('path');

const TBS_DIR = path.join(__dirname, '../src/data/cpa/tbs');

// Minimum explanation length for "good" quality (chars)
const MIN_GOOD_LENGTH = 200;
const MIN_ACCEPTABLE_LENGTH = 100;

/**
 * Parse a TBS file and extract requirements needing enhancement
 */
function parseFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  
  const issues = [];
  
  // Find all TBS blocks
  const tbsRegex = /\{\s*id:\s*['"]([^'"]+)['"]/g;
  let tbsMatch;
  
  while ((tbsMatch = tbsRegex.exec(content)) !== null) {
    const tbsId = tbsMatch[1];
    if (!tbsId.includes('-tbs-')) continue;
    
    // Find the TBS block boundaries
    const startIndex = tbsMatch.index;
    let depth = 0;
    let endIndex = startIndex;
    
    for (let i = startIndex; i < content.length; i++) {
      if (content[i] === '{') depth++;
      if (content[i] === '}') depth--;
      if (depth === 0 && i > startIndex) {
        endIndex = i + 1;
        break;
      }
    }
    
    const tbsBlock = content.slice(startIndex, endIndex);
    
    // Extract scenario/title for context
    const titleMatch = tbsBlock.match(/title:\s*['"]([^'"]+)['"]/);
    const title = titleMatch ? titleMatch[1] : 'Unknown';
    
    const topicMatch = tbsBlock.match(/topic:\s*['"]([^'"]+)['"]/);
    const topic = topicMatch ? topicMatch[1] : 'Unknown';
    
    // Find requirements
    const reqRegex = /\{\s*id:\s*['"]req-(\d+)['"][^}]+/g;
    let reqMatch;
    
    while ((reqMatch = reqRegex.exec(tbsBlock)) !== null) {
      const reqId = `req-${reqMatch[1]}`;
      const reqBlock = reqMatch[0];
      
      // Extract question
      const questionMatch = reqBlock.match(/question:\s*['"]([\s\S]*?)['"]/);
      const question = questionMatch ? questionMatch[1].slice(0, 100) : 'Unknown';
      
      // Extract type
      const typeMatch = reqBlock.match(/type:\s*['"]([^'"]+)['"]/);
      const type = typeMatch ? typeMatch[1] : 'unknown';
      
      // Check for explanation
      const explanationMatch = reqBlock.match(/explanation:\s*(['"`])([\s\S]*?)\1/);
      
      if (!explanationMatch) {
        issues.push({
          file: fileName,
          tbsId,
          title,
          topic,
          reqId,
          type,
          question,
          issue: 'MISSING',
          currentLength: 0,
          currentExplanation: null,
        });
      } else {
        const explanation = explanationMatch[2];
        if (explanation.length < MIN_ACCEPTABLE_LENGTH) {
          issues.push({
            file: fileName,
            tbsId,
            title,
            topic,
            reqId,
            type,
            question,
            issue: 'SHORT',
            currentLength: explanation.length,
            currentExplanation: explanation,
          });
        } else if (explanation.length < MIN_GOOD_LENGTH) {
          issues.push({
            file: fileName,
            tbsId,
            title,
            topic,
            reqId,
            type,
            question,
            issue: 'NEEDS_ENHANCEMENT',
            currentLength: explanation.length,
            currentExplanation: explanation,
          });
        }
      }
    }
  }
  
  return issues;
}

/**
 * Generate an enhanced explanation template based on type
 */
function generateEnhancementTemplate(issue) {
  const templates = {
    calculation: `
**Step-by-Step Solution:**

1. **Identify the given values:**
   - [List key numbers from the problem]

2. **Apply the formula:**
   - Formula: [Relevant formula]
   - Calculation: [Show work]

3. **Result:** [Answer with units]

**Key Concept:** [Why this matters for the exam]

**Common Mistake:** [What students often get wrong]
`,
    journal_entry: `
**Required Journal Entry:**

Dr. [Account]     $X,XXX
    Cr. [Account]     $X,XXX

**Explanation:**
- **Why we debit [Account]:** [Reasoning]
- **Why we credit [Account]:** [Reasoning]

**Key Principle:** [Underlying accounting rule, e.g., "Revenue recognition occurs when..."]

**Common Error:** [What students often do wrong]
`,
    multiple_choice: `
**Correct Answer: [Option Letter]**

**Why [Correct Answer] is correct:**
[Detailed explanation of the concept]

**Why other answers are wrong:**
- **A)** [If wrong - explain why]
- **B)** [If wrong - explain why]
- **C)** [If wrong - explain why]
- **D)** [If wrong - explain why]

**Exam Tip:** [What to remember for similar questions]
`,
    reconciliation: `
**Reconciliation Approach:**

**Starting Point:** [Beginning balance]

**Adjustments - [Side 1]:**
+ [Addition]: $X,XXX (reason)
- [Deduction]: $X,XXX (reason)
= **Adjusted Balance:** $X,XXX

**Adjustments - [Side 2]:**
+ [Addition]: $X,XXX (reason)
- [Deduction]: $X,XXX (reason)
= **Adjusted Balance:** $X,XXX

**Verification:** Both sides equal $X,XXX ✓

**Key Concept:** [Why certain items go to each side]
`,
  };
  
  return templates[issue.type] || templates.calculation;
}

/**
 * Main audit function
 */
function audit() {
  const files = fs.readdirSync(TBS_DIR).filter(f => f.endsWith('.ts'));
  
  let allIssues = [];
  
  for (const file of files) {
    const filePath = path.join(TBS_DIR, file);
    const issues = parseFile(filePath);
    allIssues = allIssues.concat(issues);
  }
  
  // Group by severity
  const missing = allIssues.filter(i => i.issue === 'MISSING');
  const short = allIssues.filter(i => i.issue === 'SHORT');
  const needsEnhancement = allIssues.filter(i => i.issue === 'NEEDS_ENHANCEMENT');
  
  console.log('\n📊 TBS EXPLANATION AUDIT REPORT');
  console.log('='.repeat(60));
  console.log(`\n🔴 CRITICAL - Missing explanations: ${missing.length}`);
  console.log(`🟠 HIGH - Short explanations (<${MIN_ACCEPTABLE_LENGTH} chars): ${short.length}`);
  console.log(`🟡 MEDIUM - Needs enhancement (<${MIN_GOOD_LENGTH} chars): ${needsEnhancement.length}`);
  console.log(`\nTotal issues: ${allIssues.length}`);
  
  // Show details by file
  console.log('\n\n📁 ISSUES BY FILE:');
  console.log('-'.repeat(60));
  
  const byFile = {};
  for (const issue of allIssues) {
    if (!byFile[issue.file]) byFile[issue.file] = [];
    byFile[issue.file].push(issue);
  }
  
  for (const [file, issues] of Object.entries(byFile)) {
    console.log(`\n${file}: ${issues.length} issues`);
    for (const issue of issues.slice(0, 5)) {
      const icon = issue.issue === 'MISSING' ? '🔴' : issue.issue === 'SHORT' ? '🟠' : '🟡';
      console.log(`  ${icon} ${issue.tbsId} > ${issue.reqId} (${issue.type}): ${issue.issue}`);
      if (issue.currentExplanation) {
        console.log(`     Current: "${issue.currentExplanation.slice(0, 60)}..."`);
      }
    }
    if (issues.length > 5) console.log(`  ... and ${issues.length - 5} more`);
  }
  
  return allIssues;
}

/**
 * Generate enhancement suggestions for a specific file
 */
function enhanceFile(fileName) {
  const filePath = path.join(TBS_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }
  
  const issues = parseFile(filePath);
  
  console.log(`\n📝 ENHANCEMENT SUGGESTIONS FOR ${fileName}`);
  console.log('='.repeat(60));
  
  for (const issue of issues) {
    console.log(`\n\n${'─'.repeat(60)}`);
    console.log(`TBS: ${issue.tbsId} - ${issue.title}`);
    console.log(`Topic: ${issue.topic}`);
    console.log(`Requirement: ${issue.reqId} (${issue.type})`);
    console.log(`Question: ${issue.question}...`);
    console.log(`Issue: ${issue.issue} (${issue.currentLength} chars)`);
    
    if (issue.currentExplanation) {
      console.log(`\nCurrent explanation:`);
      console.log(`  "${issue.currentExplanation}"`);
    }
    
    console.log(`\n📋 SUGGESTED TEMPLATE:`);
    console.log(generateEnhancementTemplate(issue));
  }
}

// CLI
const args = process.argv.slice(2);
const command = args[0] || '--audit';

if (command === '--audit') {
  audit();
} else if (command === '--enhance' && args[1]) {
  enhanceFile(args[1]);
} else if (command === '--file' && args[1]) {
  enhanceFile(args[1]);
} else if (command === '--help') {
  console.log(`
TBS Explanation Enhancer

Usage:
  node scripts/enhance-tbs-explanations.cjs [command] [options]

Commands:
  --audit              Audit all TBS files for explanation quality (default)
  --enhance <file>     Show enhancement suggestions for a specific file
  --file <file>        Same as --enhance
  --help               Show this help message

Examples:
  node scripts/enhance-tbs-explanations.cjs --audit
  node scripts/enhance-tbs-explanations.cjs --enhance additional-tbs.ts
  `);
} else {
  console.error('Unknown command. Use --help for usage.');
  process.exit(1);
}
