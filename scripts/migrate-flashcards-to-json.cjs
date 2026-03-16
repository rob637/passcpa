#!/usr/bin/env node
/**
 * Flashcard Migration Script: TypeScript → JSON
 * 
 * Converts all flashcard files from src/data/{course}/flashcards/*.ts
 * to consolidated content/{course}/flashcards.json files.
 * 
 * Usage:
 *   node scripts/migrate-flashcards-to-json.cjs --dry-run   # Preview
 *   node scripts/migrate-flashcards-to-json.cjs             # Apply migration
 *   node scripts/migrate-flashcards-to-json.cjs --course=cisa  # Single course
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const SINGLE_COURSE = process.argv.find(a => a.startsWith('--course='))?.split('=')[1];

const COURSES = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];
const SRC_DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const CONTENT_DIR = path.join(__dirname, '..', 'content');

// Stats tracking
const stats = {
  coursesProcessed: 0,
  filesProcessed: 0,
  flashcardsExtracted: 0,
  flashcardsWritten: 0,
  errors: [],
};

/**
 * Parse a TypeScript flashcard file and extract flashcard objects
 */
function parseFlashcardFile(filePath, courseId) {
  const content = fs.readFileSync(filePath, 'utf8');
  const flashcards = [];
  const fileName = path.basename(filePath);
  
  // Extract array content - find exported arrays
  // Match patterns like: export const XXX_FLASHCARDS: Type[] = [...]
  // or const XXX: Type[] = [...]
  
  // Find all object literals that look like flashcard objects
  // This regex finds objects with id, front, back fields
  let inArray = false;
  let depth = 0;
  let currentObj = '';
  let objStart = -1;
  
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    
    if (char === '[' && !inArray) {
      // Check if this looks like a flashcard array declaration
      const before = content.substring(Math.max(0, i - 100), i);
      if (before.match(/(?:Flashcard|Card)\[\]\s*=\s*$/i)) {
        inArray = true;
        depth = 1;
        continue;
      }
    }
    
    if (inArray) {
      if (char === '[') depth++;
      else if (char === ']') {
        depth--;
        if (depth === 0) {
          inArray = false;
        }
      } else if (char === '{' && depth === 1) {
        objStart = i;
      } else if (char === '}' && objStart >= 0) {
        // Check if this closes the object (not a nested object)
        const objContent = content.substring(objStart, i + 1);
        const openBraces = (objContent.match(/\{/g) || []).length;
        const closeBraces = (objContent.match(/\}/g) || []).length;
        
        if (openBraces === closeBraces) {
          // Parse this object
          const card = parseFlashcardObject(objContent, courseId, fileName);
          if (card) {
            flashcards.push(card);
          }
          objStart = -1;
        }
      }
    }
  }
  
  return flashcards;
}

/**
 * Parse a single flashcard object literal into a JSON object
 */
function parseFlashcardObject(objStr, courseId, sourceFile) {
  try {
    // Convert TypeScript object literal to JSON-parseable format
    let json = objStr;
    
    // Handle template literals - convert to regular strings
    json = json.replace(/`([^`]*)`/gs, (match, content) => {
      // Escape quotes and convert newlines
      const escaped = content
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n');
      return `"${escaped}"`;
    });
    
    // Convert single quotes to double quotes (but not inside strings)
    json = json.replace(/'/g, '"');
    
    // Add quotes around unquoted keys
    json = json.replace(/(\s*)(\w+)(\s*):/g, '$1"$2"$3:');
    
    // Remove trailing commas
    json = json.replace(/,(\s*[}\]])/g, '$1');
    
    // Handle comparison objects - they might have unquoted nested keys
    // Try to parse and catch errors
    let card;
    try {
      card = JSON.parse(json);
    } catch (e) {
      // If parsing fails, try a more aggressive cleanup
      // Remove comments
      json = json.replace(/\/\/[^\n]*/g, '');
      json = json.replace(/\/\*[\s\S]*?\*\//g, '');
      
      try {
        card = JSON.parse(json);
      } catch (e2) {
        // Last resort: extract fields manually
        card = extractFieldsManually(objStr);
        if (!card) return null;
      }
    }
    
    // Validate required fields
    if (!card.id || !card.front || !card.back) {
      return null;
    }
    
    // Normalize the card
    const normalized = {
      id: normalizeId(card.id),
      courseId: courseId,
      section: card.section || card.domain || inferSection(card.id, courseId),
      blueprintArea: card.blueprintArea || inferBlueprintArea(card.section || card.domain, courseId),
      type: normalizeType(card.type),
      topic: card.topic || card.category || 'General',
      front: card.front,
      back: card.back,
      difficulty: card.difficulty || 'medium',
    };
    
    // Add optional fields if present
    if (card.subtopic) normalized.subtopic = card.subtopic;
    if (card.example) normalized.example = card.example;
    if (card.formula) normalized.formula = card.formula;
    if (card.mnemonic) normalized.mnemonic = card.mnemonic;
    if (card.comparison) normalized.comparison = card.comparison;
    if (card.tags && card.tags.length > 0) normalized.tags = card.tags;
    if (card.reference || card.irsReference || card.imaReference) {
      normalized.reference = card.reference || card.irsReference || card.imaReference;
    }
    if (card.skillLevel) normalized.skillLevel = card.skillLevel;
    
    // Track source file for migration purposes
    normalized.sourceFile = sourceFile;
    
    return normalized;
  } catch (error) {
    return null;
  }
}

/**
 * Extract fields manually when JSON parsing fails
 */
function extractFieldsManually(objStr) {
  const card = {};
  
  // Extract string fields
  const stringFields = ['id', 'section', 'type', 'topic', 'subtopic', 'front', 'back', 
                        'example', 'formula', 'mnemonic', 'reference', 'difficulty',
                        'blueprintArea', 'domain', 'category', 'irsReference', 'imaReference'];
  
  for (const field of stringFields) {
    // Match field: 'value' or field: "value" or field: `value`
    const regex = new RegExp(`${field}:\\s*(['"\`])([\\s\\S]*?)\\1`, 'i');
    const match = objStr.match(regex);
    if (match) {
      card[field] = match[2];
    }
  }
  
  // Extract tags array
  const tagsMatch = objStr.match(/tags:\s*\[([\s\S]*?)\]/);
  if (tagsMatch) {
    const tags = tagsMatch[1].match(/['"]([^'"]+)['"]/g);
    if (tags) {
      card.tags = tags.map(t => t.replace(/['"]/g, ''));
    }
  }
  
  return card.id && card.front && card.back ? card : null;
}

/**
 * Normalize flashcard ID to lowercase
 */
function normalizeId(id) {
  return id.toLowerCase().replace(/[^a-z0-9-]/g, '-');
}

/**
 * Normalize flashcard type
 */
function normalizeType(type) {
  const validTypes = ['definition', 'formula', 'mnemonic', 'comparison', 'concept', 'rule', 'standard', 'penalty', 'threshold'];
  if (!type) return 'concept';
  const normalized = type.toLowerCase();
  return validTypes.includes(normalized) ? normalized : 'concept';
}

/**
 * Infer section from flashcard ID
 */
function inferSection(id, courseId) {
  if (!id) return courseId.toUpperCase();
  
  const idLower = id.toLowerCase();
  
  // CPA sections
  if (idLower.startsWith('far')) return 'FAR';
  if (idLower.startsWith('aud')) return 'AUD';
  if (idLower.startsWith('reg')) return 'REG';
  if (idLower.startsWith('bar')) return 'BAR';
  if (idLower.startsWith('isc')) return 'ISC';
  if (idLower.startsWith('tcp')) return 'TCP';
  
  // EA sections
  if (idLower.startsWith('see1') || idLower.includes('-see1')) return 'SEE1';
  if (idLower.startsWith('see2') || idLower.includes('-see2')) return 'SEE2';
  if (idLower.startsWith('see3') || idLower.includes('-see3')) return 'SEE3';
  
  // CMA sections
  if (idLower.startsWith('cma1') || idLower.includes('-cma1')) return 'CMA1';
  if (idLower.startsWith('cma2') || idLower.includes('-cma2')) return 'CMA2';
  
  // CIA sections
  if (idLower.startsWith('cia1') || idLower.includes('-cia1')) return 'CIA1';
  if (idLower.startsWith('cia2') || idLower.includes('-cia2')) return 'CIA2';
  if (idLower.startsWith('cia3') || idLower.includes('-cia3')) return 'CIA3';
  
  // CISA sections
  if (idLower.startsWith('cisa1') || idLower.includes('-cisa1')) return 'CISA1';
  if (idLower.startsWith('cisa2') || idLower.includes('-cisa2')) return 'CISA2';
  if (idLower.startsWith('cisa3') || idLower.includes('-cisa3')) return 'CISA3';
  if (idLower.startsWith('cisa4') || idLower.includes('-cisa4')) return 'CISA4';
  if (idLower.startsWith('cisa5') || idLower.includes('-cisa5')) return 'CISA5';
  
  // CFP sections (from domain field typically)
  if (idLower.includes('gen')) return 'CFP-GEN';
  if (idLower.includes('ret')) return 'CFP-RET';
  if (idLower.includes('tax')) return 'CFP-TAX';
  if (idLower.includes('inv')) return 'CFP-INV';
  if (idLower.includes('risk')) return 'CFP-RISK';
  if (idLower.includes('est')) return 'CFP-EST';
  if (idLower.includes('pro')) return 'CFP-PRO';
  if (idLower.includes('psy')) return 'CFP-PSY';
  
  return courseId.toUpperCase();
}

/**
 * Infer blueprintArea from section
 */
function inferBlueprintArea(section, courseId) {
  if (!section) return courseId.toUpperCase();
  
  // Most exams use section as blueprintArea
  const sectionUpper = section.toUpperCase();
  
  // CFP domain mapping
  const cfpMapping = {
    'GEN': 'CFP-GEN',
    'RET': 'CFP-RET',
    'TAX': 'CFP-TAX',
    'INV': 'CFP-INV',
    'RISK': 'CFP-RISK',
    'EST': 'CFP-EST',
    'PRO': 'CFP-PRO',
    'PSY': 'CFP-PSY',
  };
  
  if (cfpMapping[sectionUpper]) return cfpMapping[sectionUpper];
  
  return sectionUpper;
}

/**
 * Process a single course's flashcards
 */
function processCourse(courseId) {
  console.log(`\n[${courseId.toUpperCase()}]`);
  
  const flashcardsDir = path.join(SRC_DATA_DIR, courseId, 'flashcards');
  
  if (!fs.existsSync(flashcardsDir)) {
    console.log(`  ⚠ No flashcards directory found`);
    return;
  }
  
  const files = fs.readdirSync(flashcardsDir)
    .filter(f => f.endsWith('.ts') && f !== 'types.ts');
  
  console.log(`  Found ${files.length} TypeScript files`);
  
  const allFlashcards = [];
  const seenIds = new Set();
  
  for (const file of files) {
    const filePath = path.join(flashcardsDir, file);
    const flashcards = parseFlashcardFile(filePath, courseId);
    
    // Deduplicate by ID
    for (const card of flashcards) {
      if (!seenIds.has(card.id)) {
        seenIds.add(card.id);
        allFlashcards.push(card);
      }
    }
    
    stats.filesProcessed++;
    stats.flashcardsExtracted += flashcards.length;
    
    if (flashcards.length > 0) {
      console.log(`    ${file}: ${flashcards.length} flashcards`);
    }
  }
  
  console.log(`  Total unique flashcards: ${allFlashcards.length}`);
  
  // Sort by section, then by ID
  allFlashcards.sort((a, b) => {
    if (a.section !== b.section) return a.section.localeCompare(b.section);
    return a.id.localeCompare(b.id);
  });
  
  // Write to JSON file
  const outputDir = path.join(CONTENT_DIR, courseId);
  const outputPath = path.join(outputDir, 'flashcards.json');
  
  const output = {
    "$schema": "../schema/flashcard.schema.json",
    "courseId": courseId,
    "exportedAt": new Date().toISOString(),
    "flashcards": allFlashcards.map(card => {
      // Remove sourceFile from final output (it's just for tracking)
      const { sourceFile, ...cleanCard } = card;
      return cleanCard;
    })
  };
  
  if (!DRY_RUN) {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log(`  ✓ Wrote ${outputPath}`);
  } else {
    console.log(`  Would write ${allFlashcards.length} flashcards to ${outputPath}`);
  }
  
  stats.flashcardsWritten += allFlashcards.length;
  stats.coursesProcessed++;
}

/**
 * Main execution
 */
function main() {
  console.log('============================================');
  console.log('  Flashcard Migration: TypeScript → JSON');
  console.log('============================================');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (preview only)' : 'APPLY MIGRATION'}`);
  
  const coursesToProcess = SINGLE_COURSE ? [SINGLE_COURSE] : COURSES;
  
  for (const courseId of coursesToProcess) {
    processCourse(courseId);
  }
  
  console.log('\n============================================');
  console.log('  Summary');
  console.log('============================================');
  console.log(`Courses processed: ${stats.coursesProcessed}`);
  console.log(`Files processed: ${stats.filesProcessed}`);
  console.log(`Flashcards extracted: ${stats.flashcardsExtracted}`);
  console.log(`Flashcards written (deduplicated): ${stats.flashcardsWritten}`);
  
  if (stats.errors.length > 0) {
    console.log('\nErrors:');
    stats.errors.forEach(e => console.log(`  - ${e}`));
  }
  
  if (DRY_RUN) {
    console.log('\n⚠ DRY RUN - No files were modified');
    console.log('Run without --dry-run to apply migration');
  } else {
    console.log('\n✓ Migration complete!');
    console.log('\nNext steps:');
    console.log('1. Update flashcardService.ts to load from JSON');
    console.log('2. Update course data exports');
    console.log('3. Remove old TypeScript flashcard files');
  }
}

main();
