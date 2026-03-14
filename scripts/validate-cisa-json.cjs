/**
 * Validate CISA JSON migration
 */
const fs = require('fs');
const path = require('path');

const sections = ['cisa1', 'cisa2', 'cisa3', 'cisa4', 'cisa5'];
const contentDir = path.join(__dirname, '..', 'content', 'cisa');

let total = 0;
const missingWhyWrong = [];
const missingFields = [];

console.log('=== CISA Question Validation ===\n');

for (const section of sections) {
  const filePath = path.join(contentDir, section, 'questions.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  console.log(`${section.toUpperCase()}: ${data.questions.length} questions`);
  total += data.questions.length;
  
  for (const q of data.questions) {
    // Check whyWrong
    if (!q.whyWrong || Object.keys(q.whyWrong).length !== 4) {
      missingWhyWrong.push(q.id);
    }
    
    // Check enhanced fields
    const required = ['educational', 'examTip', 'memoryAid', 'reference'];
    for (const field of required) {
      if (!q[field]) {
        missingFields.push(`${q.id}: missing ${field}`);
      }
    }
    
    // Check options
    if (!q.options || q.options.length !== 4) {
      console.log(`  WARNING: ${q.id} has ${q.options?.length || 0} options`);
    }
  }
}

console.log(`\nTotal: ${total} questions`);
console.log(`Missing whyWrong: ${missingWhyWrong.length}`);
console.log(`Missing other fields: ${missingFields.length}`);

if (missingWhyWrong.length > 0) {
  console.log('\nQuestions missing whyWrong:');
  missingWhyWrong.slice(0, 10).forEach(id => console.log(`  - ${id}`));
  if (missingWhyWrong.length > 10) {
    console.log(`  ... and ${missingWhyWrong.length - 10} more`);
  }
}

if (missingFields.length > 0 && missingFields.length <= 20) {
  console.log('\nMissing enhanced fields:');
  missingFields.forEach(f => console.log(`  - ${f}`));
}

console.log('\n=== Validation Complete ===');
