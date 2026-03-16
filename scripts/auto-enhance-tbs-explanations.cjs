#!/usr/bin/env node
/**
 * Auto-enhance TBS Explanations
 * 
 * Takes short explanations and expands them to be comprehensive and educational.
 * Uses pattern matching and templates to generate better explanations.
 * 
 * Run: node scripts/auto-enhance-tbs-explanations.cjs --file <filename> [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const TBS_DIR = path.join(__dirname, '../src/data/cpa/tbs');

/**
 * Enhance a calculation explanation
 */
function enhanceCalculationExplanation(current, question, correctAnswer) {
  // If already good, return as-is
  if (current && current.length >= 200) return current;
  
  const formula = current || '';
  
  // Build enhanced explanation
  let enhanced = `**Step-by-Step Solution:**\n\n`;
  
  // Try to parse the formula and expand it
  if (formula.includes('×') || formula.includes('*')) {
    enhanced += `**Calculation:**\n${formula}\n\n`;
  } else if (formula) {
    enhanced += `${formula}\n\n`;
  }
  
  // Add key concept based on pattern matching
  const concepts = {
    'forfeiture': 'Stock-based compensation uses estimated forfeitures at grant date. Actual forfeitures are trued-up when they occur.',
    'EPS': 'Basic EPS excludes dilutive securities. Stock dividends/splits are applied retroactively to all periods.',
    'depreciation': 'Depreciation allocates the depreciable base (cost - salvage) over the useful life.',
    'variance': 'Favorable variances reduce costs (credit balance). Unfavorable variances increase costs (debit balance).',
    'present value': 'Discount future cash flows to their present value using the appropriate rate.',
    'impairment': 'Compare carrying value to recoverable amount. Impairment = Carrying value - Fair value.',
    'revenue': 'Under ASC 606, recognize revenue when performance obligations are satisfied.',
    'lease': 'Operating leases: expense ratably. Finance leases: front-loaded expense pattern.',
    'tax': 'Deferred taxes arise from temporary differences between book and tax treatment.',
    'goodwill': 'Goodwill = Purchase price - Fair value of net identifiable assets.',
    'inventory': 'FIFO: oldest costs to COGS. LIFO: newest costs to COGS. Weighted average: blended cost.',
    'bond': 'Premium/discount amortizes over the bond life. Interest expense = Carrying value × Market rate.',
  };
  
  const lowerQ = (question + ' ' + formula).toLowerCase();
  let foundConcept = false;
  
  for (const [keyword, concept] of Object.entries(concepts)) {
    if (lowerQ.includes(keyword.toLowerCase())) {
      enhanced += `**Key Concept:** ${concept}\n\n`;
      foundConcept = true;
      break;
    }
  }
  
  if (!foundConcept) {
    enhanced += `**Key Concept:** Understand the underlying formula and when to apply it. Pay attention to timing and which numbers to use.\n\n`;
  }
  
  // Add common mistake
  enhanced += `**Common Mistake:** Double-check your calculations and ensure you're using the correct time periods and rates. Many exam errors come from simple arithmetic or using the wrong inputs.\n`;
  
  // Add answer if we have it
  if (correctAnswer !== undefined) {
    enhanced += `\n**Answer:** $${Number(correctAnswer).toLocaleString()}`;
  }
  
  return enhanced;
}

/**
 * Enhance a multiple choice explanation
 */
function enhanceMCQExplanation(current, question, options, correctIndex) {
  if (current && current.length >= 200) return current;
  
  const correctLetter = ['A', 'B', 'C', 'D'][correctIndex] || '?';
  const correctOption = options ? options[correctIndex] : '';
  
  let enhanced = `**Correct Answer: ${correctLetter}) ${correctOption}**\n\n`;
  enhanced += `**Why this is correct:**\n${current || 'This option correctly addresses the scenario.'}\n\n`;
  
  // Add why wrong for each other option
  if (options && options.length > 0) {
    enhanced += `**Why other options are incorrect:**\n`;
    options.forEach((opt, i) => {
      if (i !== correctIndex) {
        const letter = ['A', 'B', 'C', 'D'][i];
        enhanced += `- **${letter})** ${opt.slice(0, 50)}${opt.length > 50 ? '...' : ''} - Does not fully address the requirements of the scenario.\n`;
      }
    });
  }
  
  enhanced += `\n**Exam Tip:** Read all options carefully before selecting. The correct answer addresses the specific requirements of the question.`;
  
  return enhanced;
}

/**
 * Enhance a journal entry explanation
 */
function enhanceJournalEntryExplanation(current, question, correctEntries) {
  if (current && current.length >= 200) return current;
  
  let enhanced = `**Required Journal Entry:**\n\n`;
  
  if (correctEntries && correctEntries.length > 0) {
    // Group entries
    for (const entry of correctEntries) {
      if (entry.debit) {
        enhanced += `Dr. ${entry.account}    $${Number(entry.debit).toLocaleString()}\n`;
      }
      if (entry.credit) {
        enhanced += `    Cr. ${entry.account}    $${Number(entry.credit).toLocaleString()}\n`;
      }
    }
    enhanced += `\n`;
  }
  
  enhanced += `**Explanation:**\n${current || 'Record the transaction based on the economic substance of the event.'}\n\n`;
  
  enhanced += `**Key Principle:** Journal entries must balance (debits = credits). Assets and expenses increase with debits; liabilities, equity, and revenues increase with credits.\n\n`;
  
  enhanced += `**Common Errors:**\n- Reversing debits and credits\n- Using wrong account names\n- Incorrect amounts from calculation errors`;
  
  return enhanced;
}

/**
 * Process a single file and enhance explanations
 */
function processFile(fileName, dryRun = false) {
  const filePath = path.join(TBS_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let enhancementCount = 0;
  
  console.log(`\n📝 Processing ${fileName}...`);
  
  // Find requirements with short explanations
  // Match patterns like: explanation: 'short text',
  const explanationRegex = /explanation:\s*(['"`])((?:[^\\]|\\.)*?)\1/g;
  
  content = content.replace(explanationRegex, (match, quote, explanation) => {
    // Skip already good explanations
    if (explanation.length >= 200) {
      return match;
    }
    
    enhancementCount++;
    
    // Enhance based on context
    // For now, wrap the short explanation with educational content
    const enhanced = enhanceCalculationExplanation(explanation, '', undefined);
    
    if (dryRun) {
      console.log(`\n  Would enhance: "${explanation.slice(0, 50)}..."`);
      console.log(`  To: "${enhanced.slice(0, 100)}..."`);
      return match; // Don't change in dry run
    }
    
    // Use template string for multiline
    return `explanation: \`${enhanced.replace(/`/g, "\\`")}\``;
  });
  
  // Handle missing explanations - add after correctAnswer or tolerance
  const missingExplanationPatterns = [
    // After correctAnswer: 64000, (no explanation follows)
    /correctAnswer:\s*(\d+),?\s*\n(\s*)(tolerance:\s*\d+,?\s*\n)?(\s*)((?!explanation)[^\}])/g,
    // After correctEntries array (no explanation follows)  
    /correctEntries:\s*\[[^\]]+\](\s*),?\s*\n(\s*)((?!explanation)[^\}])/g,
  ];
  
  for (const pattern of missingExplanationPatterns) {
    content = content.replace(pattern, (match, ...groups) => {
      // Skip if this is in dry run
      if (dryRun) {
        enhancementCount++;
        console.log(`\n  Would add missing explanation`);
        return match;
      }
      
      // Add a placeholder explanation
      return match.slice(0, -1) + `\n        explanation: \`Detailed explanation to be added.\`,\n` + match.slice(-1);
    });
  }
  
  if (!dryRun && enhancementCount > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Enhanced ${enhancementCount} explanations in ${fileName}`);
  } else if (dryRun) {
    console.log(`\n📊 Would enhance ${enhancementCount} explanations in ${fileName}`);
  } else {
    console.log(`✓ No enhancements needed in ${fileName}`);
  }
  
  return enhancementCount;
}

/**
 * Process all TBS files
 */
function processAll(dryRun = false) {
  const files = fs.readdirSync(TBS_DIR).filter(f => f.endsWith('.ts'));
  let total = 0;
  
  for (const file of files) {
    total += processFile(file, dryRun) || 0;
  }
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Total enhancements: ${total}`);
}

// CLI
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const fileIndex = args.indexOf('--file');

if (args.includes('--help')) {
  console.log(`
Auto-enhance TBS Explanations

Usage:
  node scripts/auto-enhance-tbs-explanations.cjs [options]

Options:
  --file <name>    Process a single file
  --all            Process all TBS files
  --dry-run        Show what would be changed without making changes
  --help           Show this help

Examples:
  node scripts/auto-enhance-tbs-explanations.cjs --file additional-tbs.ts --dry-run
  node scripts/auto-enhance-tbs-explanations.cjs --all
  `);
} else if (fileIndex >= 0 && args[fileIndex + 1]) {
  processFile(args[fileIndex + 1], dryRun);
} else if (args.includes('--all')) {
  processAll(dryRun);
} else {
  console.log('Use --help for usage information');
}
