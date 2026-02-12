/**
 * Script to add blueprintArea to CIA questions based on topic mapping
 * Run with: node scripts/add-blueprintarea-cia.cjs
 */

const fs = require('fs');
const path = require('path');

const CIA_QUESTIONS_DIR = path.join(__dirname, '../src/data/cia/questions');

// Mapping of topics to blueprint areas (based on CIA course config)
const TOPIC_TO_BLUEPRINT = {
  // CIA1-I: Foundations of Internal Auditing (40%)
  'Foundations of Internal Auditing': 'CIA1-I',
  'Mission of Internal Audit': 'CIA1-I',
  'Definition of Internal Auditing': 'CIA1-I',
  'Core Principles': 'CIA1-I',
  'Code of Ethics': 'CIA1-I',
  'Standards': 'CIA1-I',
  'Internal Audit Charter': 'CIA1-I',
  'IPPF Framework': 'CIA1-I',
  'GIAS 2024': 'CIA1-I',
  
  // CIA1-II: Independence and Objectivity (15%)
  'Independence and Objectivity': 'CIA1-II',
  'Organizational Independence': 'CIA1-II',
  'Threats to Objectivity': 'CIA1-II',
  'Threats': 'CIA1-II',
  'Impairment': 'CIA1-II',
  
  // CIA1-III: Proficiency and Due Professional Care (15%)
  'Proficiency and Due Professional Care': 'CIA1-III',
  'Proficiency and Due Care': 'CIA1-III',
  'Due Professional Care': 'CIA1-III',
  'Proficiency': 'CIA1-III',
  
  // CIA1-IV: Quality Assurance and Improvement Program (10%)
  'Quality Assurance and Improvement Program': 'CIA1-IV',
  'Quality Assurance': 'CIA1-IV',
  'Quality Management': 'CIA1-IV',
  'Internal Assessments': 'CIA1-IV',
  'External Assessments': 'CIA1-IV',
  
  // CIA1-V: Governance, Risk Management, and Control (20%)
  'Governance, Risk Management, and Control': 'CIA1-V',
  'Governance, Risk, and Control': 'CIA1-V',
  'Governance': 'CIA1-V',
  'Governance Assessment': 'CIA1-V',
  'Corporate Governance': 'CIA1-V',
  'Three Lines Model': 'CIA1-V',
  'Risk Management': 'CIA1-V',
  'Risk Concepts': 'CIA1-V',
  'Risk Assessment': 'CIA1-V',
  'Risk Response': 'CIA1-V',
  'Risk-Based Planning': 'CIA1-V',
  'Types of Controls': 'CIA1-V',
  'Control Types': 'CIA1-V',
  
  // CIA2-I: Managing the Internal Audit Activity (20%)
  'Managing the Internal Audit Activity': 'CIA2-I',
  'Managing Internal Audit Activity': 'CIA2-I',
  'Managing Internal Audit': 'CIA2-I',
  'Resource Management': 'CIA2-I',
  'Resource Allocation': 'CIA2-I',
  'Policies and Procedures': 'CIA2-I',
  
  // CIA2-II: Planning the Engagement (20%)
  'Planning the Engagement': 'CIA2-II',
  'Engagement Objectives': 'CIA2-II',
  'Engagement Scope': 'CIA2-II',
  'Risk and Control Matrix': 'CIA2-II',
  'Preliminary Survey': 'CIA2-II',
  
  // CIA2-III: Performing the Engagement (30%)
  'Performing the Engagement': 'CIA2-III',
  'Audit Procedures': 'CIA2-III',
  'Audit Techniques': 'CIA2-III',
  'Supervision': 'CIA2-III',
  'Evidence Reliability': 'CIA2-III',
  'Documentation': 'CIA2-III',
  'Sampling': 'CIA2-III',
  'Sampling Techniques': 'CIA2-III',
  'Statistical Sampling': 'CIA2-III',
  'Analytical Procedures': 'CIA2-III',
  'Computer-Assisted Audit Techniques': 'CIA2-III',
  'Data Analytics': 'CIA2-III',
  'Evidence': 'CIA2-III',
  'Working Papers': 'CIA2-III',
  
  // CIA2-IV: Communicating Results (20%)
  'Communicating Results': 'CIA2-IV',
  'Communication Quality': 'CIA2-IV',
  
  // CIA2-V: Monitoring Progress (10%)
  'Monitoring Progress': 'CIA2-V',
  'Follow-Up': 'CIA2-V',
  
  // CIA3-I: Business Acumen (35%)
  'Business Acumen': 'CIA3-I',
  'Strategic Management': 'CIA3-I',
  'Operations Management': 'CIA3-I',
  'Project Management': 'CIA3-I',
  'Organizational Structure': 'CIA3-I',
  'Organizational Behavior': 'CIA3-I',
  'Performance Measurement': 'CIA3-I',
  'Business Continuity': 'CIA3-I',
  
  // CIA3-II: Information Security (25%)
  'Information Security': 'CIA3-II',
  'Security Frameworks': 'CIA3-II',
  'Access Control': 'CIA3-II',
  'Network Security': 'CIA3-II',
  'Application Security': 'CIA3-II',
  'Cryptography': 'CIA3-II',
  'Incident Response': 'CIA3-II',
  'Data Protection': 'CIA3-II',
  'Third-Party Risk': 'CIA3-II',
  
  // CIA3-III: Information Technology (20%)
  'Information Technology': 'CIA3-III',
  'IT Governance': 'CIA3-III',
  'IT Controls': 'CIA3-III',
  'IT Knowledge': 'CIA3-III',
  'Data Management': 'CIA3-III',
  'Cloud Computing': 'CIA3-III',
  'Emerging Technology': 'CIA3-III',
  
  // CIA3-IV: Financial Management (20%)
  'Financial Management': 'CIA3-IV',
  'Financial Analysis': 'CIA3-IV',
  'Financial Ratios': 'CIA3-IV',
  'Financial Statements': 'CIA3-IV',
  'Financial Statement Fraud': 'CIA3-IV',
  'Financial Reporting': 'CIA3-IV',
  'IFRS vs GAAP': 'CIA3-IV',
  'Capital Budgeting': 'CIA3-IV',
  'Budgeting': 'CIA3-IV',
  
  // Fraud - distribute based on context (default to CIA1-V)
  'Fraud': 'CIA1-V',
  'Fraud Detection': 'CIA2-III',
  'Fraud Knowledge': 'CIA1-V',
};

function addBlueprintAreaToFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if already has blueprintArea for all questions
  const questionCount = (content.match(/id:\s*['"]CIA/g) || []).length;
  const blueprintCount = (content.match(/blueprintArea:/g) || []).length;
  
  if (questionCount > 0 && blueprintCount >= questionCount) {
    return { file: filePath, status: 'already-complete' };
  }
  
  let changeMade = false;
  
  // Strategy: Find each question block, extract topic, insert blueprintArea after section
  // Pattern: Match section: 'CIAx', and insert blueprintArea based on topic found in that block
  
  // Split by question boundaries (look for "  {" at start of question)
  const questionPattern = /(\s*\{[\s\S]*?topic:\s*['"]([^'"]+)['"][\s\S]*?\})/g;
  
  content = content.replace(/(\s*section:\s*['"]CIA\d['"]\s*,\s*\n)(?!\s*blueprintArea:)([\s\S]*?topic:\s*['"]([^'"]+)['"])/g, 
    (match, sectionLine, rest, topicValue) => {
      const blueprintArea = TOPIC_TO_BLUEPRINT[topicValue];
      if (blueprintArea) {
        const indent = sectionLine.match(/^(\s*)/)[1] || '    ';
        changeMade = true;
        return `${sectionLine}${indent}blueprintArea: '${blueprintArea}',\n${rest}`;
      }
      return match;
    }
  );
  
  if (changeMade) {
    fs.writeFileSync(filePath, content, 'utf8');
    return { file: filePath, status: 'updated' };
  }
  
  return { file: filePath, status: 'no-change' };
}

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  const results = { updated: 0, noChange: 0, alreadyComplete: 0 };
  
  for (const file of files) {
    if (!file.endsWith('.ts') || file === 'index.ts') continue;
    
    const filePath = path.join(dirPath, file);
    const result = addBlueprintAreaToFile(filePath);
    
    if (result.status === 'updated') {
      results.updated++;
      console.log(`✓ Updated: ${file}`);
    } else if (result.status === 'already-complete') {
      results.alreadyComplete++;
    } else {
      results.noChange++;
      console.log(`- No change: ${file}`);
    }
  }
  
  console.log(`\nSummary: ${results.updated} updated, ${results.alreadyComplete} already complete, ${results.noChange} no changes`);
}

processDirectory(CIA_QUESTIONS_DIR);
