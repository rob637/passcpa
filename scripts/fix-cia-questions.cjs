/**
 * Fix CIA questions:
 * 1. Add blueprintArea based on topic
 * 2. Add skillLevel based on difficulty
 * 3. Add reference field
 * 4. Convert IDs to lowercase
 */
const fs = require('fs');
const path = require('path');

const questionsDir = '/workspaces/passcpa/src/data/cia/questions';

// CIA Blueprint mapping - map topics to blueprint areas
const topicToBlueprintArea = {
  'Foundations of Internal Auditing': 'CIA1-I',
  'Code of Ethics': 'CIA1-I',
  'Charter': 'CIA1-I',
  'Independence and Objectivity': 'CIA1-II',
  'Organizational Independence': 'CIA1-II',
  'Individual Objectivity': 'CIA1-II',
  'Impairments': 'CIA1-II',
  'Proficiency and Due Professional Care': 'CIA1-III',
  'Proficiency': 'CIA1-III',
  'Due Professional Care': 'CIA1-III',
  'Quality Assurance': 'CIA1-IV',
  'Quality Assurance and Improvement Program': 'CIA1-IV',
  'Governance': 'CIA1-V',
  'Risk Management': 'CIA1-V',
  'Control': 'CIA1-V',
  'Governance, Risk Management, and Control': 'CIA1-V',
  // CIA2 topics
  'Managing the Internal Audit Activity': 'CIA2-I',
  'Planning': 'CIA2-I',
  'Resource Management': 'CIA2-I',
  'Performing the Engagement': 'CIA2-II',
  'Engagement Planning': 'CIA2-II',
  'Performing Individual Engagements': 'CIA2-II',
  'Engagement Execution': 'CIA2-II',
  'Audit Testing': 'CIA2-II',
  'Communicating Results': 'CIA2-III',
  'Communication': 'CIA2-III',
  'Reporting': 'CIA2-III',
  'Monitoring Progress': 'CIA2-IV',
  'Follow-up': 'CIA2-IV',
  // CIA3 topics
  'Business Acumen': 'CIA3-I',
  'Organizational Objectives': 'CIA3-I',
  'Strategic Management': 'CIA3-I',
  'Information Security': 'CIA3-II',
  'IT': 'CIA3-II',
  'Information Technology': 'CIA3-II',
  'Data Analytics': 'CIA3-II',
  'Fraud': 'CIA3-III',
  'Fraud Risk': 'CIA3-III',
};

// Difficulty to skill level mapping
const difficultyToSkillLevel = {
  'easy': 'Remembering and Understanding',
  'medium': 'Application',
  'hard': 'Analysis'
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  const fileName = path.basename(filePath);

  // 1. Convert uppercase IDs to lowercase (CIA1-001 -> cia1-001)
  const idPattern = /id: '(CIA\d+-[A-Z0-9-]+)'/g;
  content = content.replace(idPattern, (match, id) => {
    modified = true;
    return `id: '${id.toLowerCase()}'`;
  });

  // 2. Add blueprintArea after section if missing
  // Pattern: section: 'CIA1', followed by difficulty without blueprintArea
  const sectionPattern = /(section: '(CIA\d)',)\n(\s*)(difficulty:)/g;
  content = content.replace(sectionPattern, (match, sectionLine, section, ws, diffLine) => {
    modified = true;
    return `${sectionLine}\n${ws}blueprintArea: '${section}-I',\n${ws}${diffLine}`;
  });

  // 3. Add skillLevel after difficulty if missing
  // Pattern: difficulty: 'xxx', followed by question without skillLevel  
  const diffPattern = /(difficulty: '(easy|medium|hard)',)\n(\s*)(question:)/g;
  content = content.replace(diffPattern, (match, diffLine, diff, ws, questionLine) => {
    const skillLevel = difficultyToSkillLevel[diff] || 'Application';
    modified = true;
    return `${diffLine}\n${ws}skillLevel: '${skillLevel}',\n${ws}${questionLine}`;
  });

  // 4. Add reference after subtopic if missing
  // Pattern: subtopic: 'xxx' followed by } without reference
  const subtopicPattern = /(subtopic: '[^']*')\n(\s*)(},?)/g;
  content = content.replace(subtopicPattern, (match, subtopicLine, ws, ending) => {
    // Only add if not already having reference
    if (!match.includes('reference:')) {
      modified = true;
      return `${subtopicLine},\n${ws}reference: 'IIA Standards'\n${ws}${ending}`;
    }
    return match;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

const files = fs.readdirSync(questionsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');
let modifiedCount = 0;

files.forEach(file => {
  const filePath = path.join(questionsDir, file);
  if (processFile(filePath)) {
    modifiedCount++;
    console.log(`Modified: ${file}`);
  }
});

console.log(`\nTotal files modified: ${modifiedCount}`);
