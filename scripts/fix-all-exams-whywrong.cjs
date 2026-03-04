const fs = require('fs');
const path = require('path');

const EXAMS = {
  // cpa already done
  ea: ['see1', 'see2', 'see3'],
  cma: ['cma1', 'cma2'],
  cia: ['cia1', 'cia2', 'cia3'],
  cisa: ['cisa1', 'cisa2', 'cisa3', 'cisa4', 'cisa5'],
  cfp: ['cfp-est', 'cfp-gen', 'cfp-inv', 'cfp-pcr', 'cfp-psy', 'cfp-ret', 'cfp-risk', 'cfp-tax']
};

const indexToLetter = ['A', 'B', 'C', 'D'];

function fixQuestion(q) {
  let fixed = false;
  if (!q.whyWrong) return false;
  
  const newWhyWrong = { ...q.whyWrong };
  
  for (const [key, text] of Object.entries(q.whyWrong)) {
    if (typeof text !== 'string') continue;
    const idx = parseInt(key);
    if (isNaN(idx) || idx < 0 || idx > 3) continue;
    
    const correctLetter = indexToLetter[idx];
    
    // Pattern: "Why option B" -> "Why option A"
    const pattern = /((?:Why\s+)?(?:option|choice)\s+)([A-D])/i;
    const match = text.match(pattern);
    
    if (match) {
      const prefix = match[1];
      const foundLetter = match[2].toUpperCase();
      
      if (foundLetter !== correctLetter) {
        // Safe string replace only the first match
        const newText = text.replace(pattern, `$1${correctLetter}`);
        if (newText !== text) {
            newWhyWrong[key] = newText;
            fixed = true;
        }
      }
    }
  }
  
  if (fixed) {
    q.whyWrong = newWhyWrong;
  }
  return fixed;
}

function processSection(exam, section) {
  let jsonPath = path.join(__dirname, '..', 'content', exam, section, 'questions.json');
    if (!fs.existsSync(jsonPath)) {
         jsonPath = path.join(__dirname, '..', 'content', exam, section.toUpperCase(), 'questions.json');
    }
  
  if (!fs.existsSync(jsonPath)) return 0;
  
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  let count = 0;
  
  data.questions = data.questions.map(q => {
    if (fixQuestion(q)) {
      count++;
    }
    return q;
  });
  
  if (count > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
    console.log(`Updated ${count} questions in ${exam}/${section}`);
  }
  return count;
}

let totalFixed = 0;
for (const [exam, sections] of Object.entries(EXAMS)) {
  for (const section of sections) {
    totalFixed += processSection(exam, section);
  }
}
console.log(`\nTotal questions updated: ${totalFixed}`);
