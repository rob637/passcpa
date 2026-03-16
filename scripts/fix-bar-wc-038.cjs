const fs = require('fs');
const path = require('path');

const BAR_FILE = path.join(__dirname, '../content/cpa/bar/questions.json');

function fixBarWC038() {
  if (!fs.existsSync(BAR_FILE)) {
    console.error('BAR file not found!');
    return;
  }

  const data = fs.readFileSync(BAR_FILE, 'utf8');
  let content = JSON.parse(data);
  let questions = Array.isArray(content) ? content : content.questions;

  let fixed = false;

  questions.forEach(q => {
    if (q.id === 'bar-wc-038') {
      console.log('Fixing bar-wc-038...');
      
      // 1. Fix Correct Answer
      // WhyWrong[1] says "B is CORRECT". 
      // Question: 70% prob of $1.5M. ASC 450 requires accruing the best estimate ($1.5M) if probable.
      q.correctAnswer = 1; // Option B ($1.5M accrued liability)

      // 2. Fix Explanation (It was copy-pasted from bar-wc-037 FIFO question)
      q.explanation = "Under ASC 450, a loss contingency must be accrued if it is probable (likely to occur) and the amount can be reasonably estimated. Since the loss is probable (70%) and the estimated amount is $1.5 million, Fulton should accrue the full $1.5 million. The 70% probability is used to determine 'probable' status, not to stick a percentage-weighted value.";

      // 3. Ensure options are consistent (they looked ok in grep, but let's be sure)
      // Options were: [ "$2M", "$1.5M", "$1.05M", "No accrual"]
      // Key 1 = $1.5M. Correct.

      fixed = true;
    }
  });

  if (fixed) {
    if (!Array.isArray(content)) content.questions = questions;
    fs.writeFileSync(BAR_FILE, JSON.stringify(content, null, 2));
    console.log('Successfully fixed bar-wc-038.');
  } else {
    console.log('bar-wc-038 not found.');
  }
}

fixBarWC038();
