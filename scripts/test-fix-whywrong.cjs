const fs = require('fs');

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
    
    const pattern = /((?:Why\s+)?(?:option|choice)\s+)([A-D])/i;
    const match = text.match(pattern);
    
    if (match) {
      const prefix = match[1];
      const foundLetter = match[2].toUpperCase();
      
      if (foundLetter !== correctLetter) {
        const newText = text.replace(pattern, `$1${correctLetter}`);
        
        if (newText !== text) {
            newWhyWrong[key] = newText;
            fixed = true;
            console.log(`FIXED: ${text} -> ${newText}`);
        }
      }
    }
  }
  
  if (fixed) {
    q.whyWrong = newWhyWrong;
  }
  return fixed;
}

const testQ = {
  whyWrong: {
    "0": "Why option B is CORRECT - relevance...", // Expect fix to A
    "1": "Why option C is WRONG - materiality...",   // Expect fix to B
    "2": "Choice D is irrelevant..."                 // Expect fix to C
  }
};

fixQuestion(testQ);
console.log(JSON.stringify(testQ, null, 2));
