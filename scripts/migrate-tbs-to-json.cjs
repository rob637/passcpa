#!/usr/bin/env node
/**
 * TBS Migration Script - TypeScript to JSON
 * 
 * Converts TBS data from TypeScript files to JSON format with enhanced explanations.
 * 
 * Usage:
 *   node scripts/migrate-tbs-to-json.cjs [--dry-run] [--enhance]
 * 
 * Options:
 *   --dry-run   Show what would be migrated without writing files
 *   --enhance   Add UWorld-style explanation formatting
 */

const fs = require('fs');
const path = require('path');

// Configuration
const TBS_SOURCE_DIR = path.join(__dirname, '../src/data/cpa/tbs');
const CONTENT_DIR = path.join(__dirname, '../content/cpa');

// TBS type constants (matches TBS_TYPES in types/index.ts)
const TBS_TYPES = {
  JOURNAL_ENTRY: 'journal_entry',
  RECONCILIATION: 'reconciliation',
  DOCUMENT_REVIEW: 'document_review',
  RESEARCH: 'research',
  CALCULATION: 'calculation',
  FORM_COMPLETION: 'form_completion',
  WRITTEN_COMMUNICATION: 'written_communication',
  MULTIPLE_CHOICE: 'multiple_choice',
};

// Parse command line args
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const ENHANCE = args.includes('--enhance');

/**
 * Parse a TypeScript TBS file and extract TBS array definitions
 */
function parseTBSFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const filename = path.basename(filePath);
  
  // Find all exported TBS arrays
  const tbsArrays = [];
  
  // Pattern to match: export const VAR_NAME: TBS[] = [...]
  // We need to extract the array content
  const exportMatches = content.matchAll(/export\s+const\s+(\w+):\s*TBS\[\]\s*=\s*\[/g);
  
  for (const match of exportMatches) {
    const varName = match[1];
    const startIndex = match.index + match[0].length - 1; // Position of [
    
    // Find matching closing bracket using bracket counting
    let depth = 0;
    let endIndex = startIndex;
    let inString = false;
    let stringChar = '';
    let escaped = false;
    
    for (let i = startIndex; i < content.length; i++) {
      const char = content[i];
      
      if (escaped) {
        escaped = false;
        continue;
      }
      
      if (char === '\\') {
        escaped = true;
        continue;
      }
      
      if (!inString && (char === '"' || char === "'" || char === '`')) {
        inString = true;
        stringChar = char;
        continue;
      }
      
      if (inString && char === stringChar) {
        inString = false;
        continue;
      }
      
      if (!inString) {
        if (char === '[') depth++;
        if (char === ']') depth--;
        
        if (depth === 0) {
          endIndex = i;
          break;
        }
      }
    }
    
    const arrayContent = content.slice(startIndex, endIndex + 1);
    
    tbsArrays.push({
      name: varName,
      content: arrayContent,
      sourceFile: filename
    });
  }
  
  return tbsArrays;
}

/**
 * Convert TypeScript object syntax to valid JSON
 */
function tsToJson(tsContent) {
  let json = tsContent;
  
  // Remove TBS_TYPES references and convert to string values
  json = json.replace(/TBS_TYPES\.JOURNAL_ENTRY/g, '"journal_entry"');
  json = json.replace(/TBS_TYPES\.RECONCILIATION/g, '"reconciliation"');
  json = json.replace(/TBS_TYPES\.DOCUMENT_REVIEW/g, '"document_review"');
  json = json.replace(/TBS_TYPES\.RESEARCH/g, '"research"');
  json = json.replace(/TBS_TYPES\.CALCULATION/g, '"calculation"');
  json = json.replace(/TBS_TYPES\.FORM_COMPLETION/g, '"form_completion"');
  json = json.replace(/TBS_TYPES\.WRITTEN_COMMUNICATION/g, '"written_communication"');
  json = json.replace(/TBS_TYPES\.MULTIPLE_CHOICE/g, '"multiple_choice"');
  
  // Remove 'as const' assertions
  json = json.replace(/\s+as\s+const/g, '');
  
  // Convert unquoted object keys to quoted (but not inside strings)
  // This is a simplified approach - handles most cases
  json = json.replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');
  
  // Handle template literals (backticks) - convert to regular strings
  // This is tricky - we need to handle multiline strings
  let result = '';
  let i = 0;
  while (i < json.length) {
    if (json[i] === '`') {
      // Find matching backtick
      let end = i + 1;
      while (end < json.length && json[end] !== '`') {
        end++;
      }
      // Extract content and escape for JSON
      const templateContent = json.slice(i + 1, end);
      const escaped = templateContent
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');
      result += '"' + escaped + '"';
      i = end + 1;
    } else {
      result += json[i];
      i++;
    }
  }
  json = result;
  
  // Handle trailing commas (not valid in JSON)
  json = json.replace(/,(\s*[\]}])/g, '$1');
  
  // Handle null values
  json = json.replace(/:\s*null\b/g, ': null');
  
  // Clean up any remaining issues
  json = json.trim();
  
  return json;
}

/**
 * Determine section from TBS ID or variable name
 */
function getSectionFromTBS(tbs, varName) {
  // Check TBS id first
  if (tbs.id) {
    const idPrefix = tbs.id.split('-')[0].toUpperCase();
    if (['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP', 'BEC'].includes(idPrefix)) {
      return idPrefix;
    }
  }
  
  // Check section field
  if (tbs.section) {
    return tbs.section.toUpperCase();
  }
  
  // Extract from variable name
  const match = varName.match(/^(FAR|AUD|REG|BAR|ISC|TCP|BEC)/i);
  if (match) {
    return match[1].toUpperCase();
  }
  
  return 'UNKNOWN';
}

/**
 * Enhance a TBS requirement explanation to UWorld-style
 */
function enhanceExplanation(req, tbsScenario, tbsTitle) {
  if (!req.explanation || req.explanation.includes('**Step-by-Step')) {
    // Already enhanced or no explanation
    return req.explanation;
  }
  
  const original = req.explanation;
  let enhanced = '';
  
  if (req.type === 'calculation' || req.type === 'journal_entry') {
    enhanced = `**Step-by-Step Solution:**\n\n${original}`;
    
    // Add common mistake if not present
    if (!original.toLowerCase().includes('common mistake') && !original.toLowerCase().includes('common error')) {
      enhanced += '\n\n**Common Mistake:** Candidates often miss a step in this calculation or use the wrong rate/period.';
    }
  } else if (req.type === 'multiple_choice') {
    enhanced = `**Correct Answer Explanation:**\n\n${original}`;
    
    if (req.options && req.options.length > 0) {
      enhanced += '\n\n**Why other options are wrong:**';
      // Placeholder - actual wrong answer explanations would need to be generated
    }
  } else {
    enhanced = original;
  }
  
  // Add exam tip if not present
  if (!original.toLowerCase().includes('exam tip') && !original.toLowerCase().includes('💡')) {
    enhanced += '\n\n**Exam Tip:** Always verify your answer makes sense in the context of the scenario.';
  }
  
  return enhanced;
}

/**
 * Process TBS and add standard fields
 */
function processTBS(tbs, sourceFile) {
  // Ensure standard fields
  return {
    id: tbs.id,
    version: 1,
    status: 'approved',
    courseId: tbs.courseId || 'cpa',
    section: tbs.section,
    blueprintArea: tbs.blueprintArea || `${tbs.section}-I`,
    type: tbs.type,
    title: tbs.title || 'Untitled TBS',
    topic: tbs.topic,
    difficulty: tbs.difficulty || 'medium',
    timeEstimate: tbs.timeEstimate || tbs.estimatedTime || 15,
    scenario: (tbs.scenario || '').trim(),
    exhibits: tbs.exhibits || [],
    requirements: (tbs.requirements || tbs.questions || []).map((req, idx) => ({
      id: req.id || `req-${idx + 1}`,
      type: req.type || 'calculation',
      question: req.question || req.text || '',
      options: req.options,
      correctAnswer: req.correctAnswer,
      correctEntries: req.correctEntries,
      tolerance: req.tolerance,
      points: req.points,
      explanation: ENHANCE ? enhanceExplanation(req, tbs.scenario, tbs.title) : req.explanation,
      hints: req.hints,
    })),
    hints: tbs.hints || [],
    references: tbs.references || [],
    sourceFile: sourceFile,
  };
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('TBS Migration: TypeScript → JSON');
  console.log('================================');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  console.log(`Enhance: ${ENHANCE ? 'YES' : 'NO'}`);
  console.log('');
  
  // Get all TBS TypeScript files
  const tbsFiles = fs.readdirSync(TBS_SOURCE_DIR)
    .filter(f => f.endsWith('.ts') && f !== 'index.ts')
    .map(f => path.join(TBS_SOURCE_DIR, f));
  
  console.log(`Found ${tbsFiles.length} TBS source files`);
  
  // Collect TBS by section
  const tbsBySection = {};
  let totalTBS = 0;
  let totalRequirements = 0;
  const errors = [];
  
  for (const file of tbsFiles) {
    const filename = path.basename(file);
    console.log(`\nProcessing: ${filename}`);
    
    try {
      const tbsArrays = parseTBSFile(file);
      
      for (const tbsArray of tbsArrays) {
        console.log(`  Found: ${tbsArray.name}`);
        
        // Parse the array content as JSON
        let jsonContent;
        try {
          const converted = tsToJson(tbsArray.content);
          jsonContent = JSON.parse(converted);
        } catch (parseError) {
          errors.push({
            file: filename,
            array: tbsArray.name,
            error: `Parse error: ${parseError.message}`
          });
          console.log(`    ERROR: Could not parse ${tbsArray.name}`);
          continue;
        }
        
        if (!Array.isArray(jsonContent)) {
          console.log(`    SKIP: Not an array`);
          continue;
        }
        
        console.log(`    Items: ${jsonContent.length}`);
        
        // Process each TBS
        for (const tbs of jsonContent) {
          const section = getSectionFromTBS(tbs, tbsArray.name);
          
          if (section === 'UNKNOWN' || section === 'BEC') {
            // Skip BEC (retired) and unknown sections
            continue;
          }
          
          if (!tbsBySection[section]) {
            tbsBySection[section] = [];
          }
          
          const processed = processTBS(tbs, filename);
          tbsBySection[section].push(processed);
          totalTBS++;
          totalRequirements += (processed.requirements || []).length;
        }
      }
    } catch (err) {
      errors.push({
        file: filename,
        error: err.message
      });
      console.log(`  ERROR: ${err.message}`);
    }
  }
  
  console.log('\n================================');
  console.log('Migration Summary');
  console.log('================================');
  console.log(`Total TBS: ${totalTBS}`);
  console.log(`Total Requirements: ${totalRequirements}`);
  console.log(`Sections: ${Object.keys(tbsBySection).join(', ')}`);
  console.log('');
  
  for (const [section, tbsList] of Object.entries(tbsBySection)) {
    const reqCount = tbsList.reduce((sum, t) => sum + (t.requirements?.length || 0), 0);
    console.log(`  ${section}: ${tbsList.length} TBS, ${reqCount} requirements`);
  }
  
  if (errors.length > 0) {
    console.log(`\nErrors: ${errors.length}`);
    for (const err of errors) {
      console.log(`  - ${err.file}: ${err.error}`);
    }
  }
  
  if (DRY_RUN) {
    console.log('\n[DRY RUN] No files written');
    return;
  }
  
  // Write JSON files
  console.log('\nWriting JSON files...');
  
  for (const [section, tbsList] of Object.entries(tbsBySection)) {
    const sectionDir = path.join(CONTENT_DIR, section.toLowerCase());
    
    // Create directory if needed
    if (!fs.existsSync(sectionDir)) {
      fs.mkdirSync(sectionDir, { recursive: true });
    }
    
    const outputPath = path.join(sectionDir, 'tbs.json');
    const output = {
      "$schema": "../schema/tbs.schema.json",
      section: section,
      exportedAt: new Date().toISOString(),
      tbs: tbsList.sort((a, b) => a.id.localeCompare(b.id))
    };
    
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log(`  Wrote: ${outputPath} (${tbsList.length} TBS)`);
  }
  
  console.log('\nMigration complete!');
}

// Run
migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
