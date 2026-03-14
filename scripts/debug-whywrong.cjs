const fs = require('fs');
const path = require('path');

const qPath = path.join(__dirname, '..', 'content', 'cpa', 'far', 'questions.json');
const data = JSON.parse(fs.readFileSync(qPath, 'utf8'));

const q = data.questions.find(fq => fq.id === 'far-add-001');

console.log('ID:', q.id);
console.log('Keys:', Object.keys(q.whyWrong));

// Map index to letter
const indexToLetter = ['A', 'B', 'C', 'D'];

for (const [key, text] of Object.entries(q.whyWrong)) {
    const idx = parseInt(key);
    const correctLetter = indexToLetter[idx];
    const pattern = /((?:Why\s+)?(?:option|choice)\s+)([A-D])/i;
    const match = text.match(pattern);
    
    console.log(`Key ${key} (${correctLetter}): "${text.substring(0, 30)}..."`);
    if (match) {
        console.log(`  Match: "${match[0]}"`);
        console.log(`  Expected: ${correctLetter}, Found: ${match[2].toUpperCase()}`);
        const newText = text.replace(pattern, `$1${correctLetter}`);
        if (newText !== text) {
             console.log(`  REPLACEMENT WOULD HAPPEN: "${newText.substring(0, 30)}..."`);
        } else {
             console.log(`  NO REPLACEMENT (text unchanged)`);
        }
    } else {
        console.log(`  NO MATCH`);
    }
}
