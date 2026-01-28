// Blueprint Area Mapper Utility
// Adds blueprintArea to questions missing it based on topicId

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Blueprint area mappings based on topic
const BLUEPRINT_MAPPINGS: Record<string, Record<string, string>> = {
  REG: {
    'reg-ethics': 'REG-I',
    'reg-tax-procedures': 'REG-I',
    'reg-law': 'REG-II',
    'reg-bus-law': 'REG-II',
    'reg-business-law': 'REG-II',
    'reg-property': 'REG-III',
    'reg-individual': 'REG-III',
    'reg-federal-tax': 'REG-III',
    'reg-corporate': 'REG-IV',
    'reg-entity': 'REG-IV',
    'reg-partnership': 'REG-IV',
  },
  FAR: {
    'far-conceptual': 'FAR-I',
    'far-concepts': 'FAR-I',
    'far-standards': 'FAR-I',
    'far-revenue': 'FAR-II',
    'far-inventory': 'FAR-II',
    'far-assets': 'FAR-II',
    'far-cash': 'FAR-II',
    'far-fixed': 'FAR-III',
    'far-intangible': 'FAR-III',
    'far-ppe': 'FAR-III',
    'far-investments': 'FAR-III',
    'far-liability': 'FAR-IV',
    'far-liabilities': 'FAR-IV',
    'far-bonds': 'FAR-IV',
    'far-equity': 'FAR-V',
    'far-stockholders': 'FAR-V',
    'far-government': 'FAR-VI',
    'far-nfp': 'FAR-VI',
    'far-nonprofit': 'FAR-VI',
    'far-leases': 'FAR-IV',
    'far-pensions': 'FAR-IV',
    'far-consolidation': 'FAR-V',
    'far-foreign': 'FAR-V',
    'far-eps': 'FAR-V',
    'far-statement': 'FAR-I',
    'far-presentation': 'FAR-I',
  },
  AUD: {
    'aud-engagement': 'AUD-I',
    'aud-planning': 'AUD-I',
    'aud-professional': 'AUD-I',
    'aud-responsibilities': 'AUD-I',
    'aud-risk': 'AUD-II',
    'aud-evidence': 'AUD-II',
    'aud-internal-control': 'AUD-III',
    'aud-controls': 'AUD-III',
    'aud-reporting': 'AUD-IV',
    'aud-opinions': 'AUD-IV',
    'aud-ethics': 'AUD-I',
    'aud-audit': 'AUD-II',
    'aud-sampling': 'AUD-II',
    'aud-procedures': 'AUD-II',
    'aud-communications': 'AUD-IV',
    'aud-fraud': 'AUD-II',
  },
};

function inferBlueprintArea(section: string, topicId: string): string {
  const sectionMappings = BLUEPRINT_MAPPINGS[section];
  if (sectionMappings) {
    // Try exact match first
    if (sectionMappings[topicId]) {
      return sectionMappings[topicId];
    }
    // Try prefix match
    for (const [prefix, area] of Object.entries(sectionMappings)) {
      if (topicId.startsWith(prefix.replace(section.toLowerCase() + '-', ''))) {
        return area;
      }
    }
  }
  // Default based on section
  return `${section}-I`;
}

function processFile(filePath: string) {
  const content = readFileSync(filePath, 'utf-8');
  
  // Regex to find questions without blueprintArea
  // This matches questions that have section but no blueprintArea after it
  const questionPattern = /\{\s*\n(\s*)id:\s*['"]([^'"]+)['"],\s*\n\s*section:\s*['"]([^'"]+)['"],\s*\n\s*topicId:/g;
  
  let modified = content;
  let match;
  let count = 0;
  
  while ((match = questionPattern.exec(content)) !== null) {
    const indent = match[1];
    const id = match[2];
    const section = match[3];
    
    // Check if blueprintArea already exists for this question
    const questionStart = match.index;
    const nextQuestionOrEnd = content.indexOf('\n  {', questionStart + 1);
    const questionBlock = content.substring(questionStart, nextQuestionOrEnd === -1 ? content.length : nextQuestionOrEnd);
    
    if (!questionBlock.includes('blueprintArea:')) {
      // Extract topicId from the question block
      const topicIdMatch = questionBlock.match(/topicId:\s*['"]([^'"]+)['"]/);
      if (topicIdMatch) {
        const topicId = topicIdMatch[1];
        const blueprintArea = inferBlueprintArea(section, topicId);
        
        // Add blueprintArea after section
        const oldPattern = `section: '${section}',\n${indent}topicId:`;
        const newPattern = `section: '${section}',\n${indent}blueprintArea: '${blueprintArea}',\n${indent}topicId:`;
        modified = modified.replace(oldPattern, newPattern);
        count++;
      }
    }
  }
  
  if (count > 0) {
    writeFileSync(filePath, modified);
    console.log(`Updated ${count} questions in ${filePath}`);
  }
  
  return count;
}

// Process all question files
const questionsDir = join(process.cwd(), 'src/data/questions');
const files = [
  'reg-questions.ts',
  'reg-questions-extended.ts',
  'reg-questions-extra.ts',
  'far-questions.ts',
  'far-questions-extended.ts',
  'far-questions-extra.ts',
  'aud-questions.ts',
  'aud-questions-extended.ts',
  'aud-questions-extra.ts',
];

let totalUpdated = 0;
for (const file of files) {
  const filePath = join(questionsDir, file);
  try {
    totalUpdated += processFile(filePath);
  } catch (error) {
    console.log(`Skipping ${file}: ${error}`);
  }
}

console.log(`\nTotal questions updated: ${totalUpdated}`);
