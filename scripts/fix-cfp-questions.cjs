/**
 * Fix corrupted CFP questions — removes questions with empty/duplicate options
 * caused by apostrophe-triggered JSON serialization errors.
 */
const fs = require('fs');
const path = require('path');

const dir = 'content/cfp';
const subdirs = fs.readdirSync(dir).filter(f => 
  fs.statSync(path.join(dir, f)).isDirectory()
);

let totalRemoved = 0;

function isBroken(q) {
  if (!Array.isArray(q.options) || q.options.length !== 4) return true;
  
  for (const opt of q.options) {
    if (typeof opt !== 'string') return true;
    const trimmed = opt.trim();
    // Empty option
    if (trimmed === '') return true;
    // Pure comma (JSON corruption artifact)
    if (trimmed === ',') return true;
    // Fragment starting with comma and newline (corruption)
    if (trimmed.startsWith(',\n')) return true;
    if (trimmed.startsWith(',\\n')) return true;
  }
  
  // Check for duplicate options
  const normalized = q.options.map(o => o.trim().toLowerCase());
  const unique = new Set(normalized);
  if (unique.size < 4) return true;
  
  return false;
}

for (const sub of subdirs) {
  const qPath = path.join(dir, sub, 'questions.json');
  if (!fs.existsSync(qPath)) continue;
  
  const raw = fs.readFileSync(qPath, 'utf8');
  const data = JSON.parse(raw);
  const before = data.questions.length;
  
  const broken = [];
  const clean = [];
  
  for (const q of data.questions) {
    if (isBroken(q)) {
      broken.push(q.id);
    } else {
      clean.push(q);
    }
  }
  
  if (broken.length > 0) {
    data.questions = clean;
    data.count = clean.length;
    fs.writeFileSync(qPath, JSON.stringify(data, null, 2) + '\n');
    console.log(`${sub}: removed ${broken.length} broken questions (${before} -> ${clean.length})`);
    for (const id of broken) {
      console.log(`  - ${id}`);
    }
    totalRemoved += broken.length;
  }
}

console.log(`\nTotal removed: ${totalRemoved}`);
