const fs = require('fs');
const path = require('path');

const fixes = [
  { id: 'far-d14-014', section: 'far', newAnswer: 0 },
  { id: 'far-d20-011', section: 'far', newAnswer: 1 },
  { id: 'far-scf-001', section: 'far', newAnswer: 1 },
  { id: 'far-gen-1346', section: 'far', newAnswer: 0 },
  { id: 'aud-gen-1377', section: 'aud', newAnswer: 2 },
  { id: 'aud-gen-1419', section: 'aud', newAnswer: 0 },
  { id: 'tcp-gen-1138', section: 'tcp', newAnswer: 0 },
  { id: 'tcp-gen-1473', section: 'tcp', newAnswer: 0 },
  { id: 'bar-gen-1534', section: 'bar', newAnswer: 0 },
];

function applyFixes() {
  const sectionsToUpdate = [...new Set(fixes.map(f => f.section))];
  
  sectionsToUpdate.forEach(section => {
    const jsonPath = path.join(__dirname, '..', 'content', 'cpa', section, 'questions.json');
    if (!fs.existsSync(jsonPath)) {
      console.log(`Skipping ${section} - file not found`);
      return;
    }
    
    console.log(`Processing ${section}...`);
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    let updatedCount = 0;
    
    data.questions = data.questions.map(q => {
      const fix = fixes.find(f => f.id === q.id);
      if (fix) {
        console.log(`  Fixing ${q.id}: changed correctAnswer from ${q.correctAnswer} to ${fix.newAnswer}`);
        q.correctAnswer = fix.newAnswer;
        updatedCount++;
      }
      return q;
    });
    
    if (updatedCount > 0) {
      fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
      console.log(`  Saved ${updatedCount} fixes to ${section}/questions.json`);
    }
  });
}

applyFixes();
