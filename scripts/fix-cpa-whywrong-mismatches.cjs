const fs = require('fs');
const path = require('path');

const EXAMS = {
  cpa: ['far', 'aud', 'reg', 'tcp', 'isc', 'bar'],
};

// Map index to letter
const indexToLetter = ['A', 'B', 'C', 'D'];

function fixQuestion(q) {
  let fixed = false;
  if (!q.whyWrong) return false;
  
  const newWhyWrong = { ...q.whyWrong };
  
  for (const [key, text] of Object.entries(q.whyWrong)) {
    if (typeof text !== 'string') continue;
    const idx = parseInt(key);
    if (isNaN(idx) || idx < 0 || idx > 3) continue;
    
    // Check if the text mentions the wrong option letter
    // If we are at index 0 (A), and text says "Option B", change "Option B" to "Option A"
    
    const correctLetter = indexToLetter[idx];
    
    // Regex to find "Option X" or "Choice X"
    // We want to be careful not to replace something that isn't the label.
    // e.g. "Option A is better than Option B" -> "Option A is better than Option A"? No.
    // Usually these start with "Why option X is WRONG/CORRECT"
    
    // Pattern: ^(Why\s+)?(option|choice)\s+([A-D])\s+(is\s+)?(WRONG|CORRECT|INCORRECT)
    // Actually, looking at the data: "Why option B is CORRECT - ..."
    
    const pattern = /((?:Why\s+)?(?:option|choice)\s+)([A-D])/i;
    const match = text.match(pattern);
    
    if (match) {
      const prefix = match[1];
      const foundLetter = match[2].toUpperCase();
      
      // If the found letter doesn't match the index letter, fix it.
      if (foundLetter !== correctLetter) {
        // Only replace the FIRST occurrence which is usually the label.
        // We replace match[0] (e.g. "Why option B") with "Why option A"
        
        // We need to be careful. The regex match[0] is just the prefix + letter.
        // Let's replace only that part.
        
        const newText = text.replace(pattern, `$1${correctLetter}`);
        
        // Double check we didn't break correct/wrong
        // If the text says "Why option B is CORRECT" and we change to "Why option A is CORRECT"
        // We should ensure that option A (idx 0) IS actually correct?
        // Wait, current logic:
        // We assume the text CONTENT belongs to the KEY index. 
        // We just fix the label to match the index.
        
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
  const jsonPath = path.join(__dirname, '..', 'content', exam, section, 'questions.json');
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
    console.log(`Updated ${count} questions in ${section}`);
  }
  return count;
}

let totalFixed = 0;
for (const [exam, sections] of Object.entries(EXAMS)) {
  for (const section of sections) {
    totalFixed += processSection(exam, section);
  }
}
console.log(`Total fixed: ${totalFixed}`);
