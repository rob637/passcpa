const fs = require('fs');
const path = require('path');

const REG_FILE_PATH = path.join(__dirname, '../content/cpa/reg/questions.json');

function fixRegQuestionsBatch5() {
  const rawData = fs.readFileSync(REG_FILE_PATH, 'utf8');
  let data = JSON.parse(rawData);
  // Handle object structure with questions array
  let questions = Array.isArray(data) ? data : data.questions;
  
  if (!questions) {
    console.error("Could not find questions array in JSON");
    process.exit(1);
  }

  let fixedCount = 0;

  questions = questions.map(q => {
    // 1. reg-gen-1006: Trust Classification
    if (q.id === 'reg-gen-1006') {
      q.correctAnswer = 3; // Option D (Complex, $50k)
      q.explanation = "A simple trust is one that (1) requires all income to be distributed currently, (2) does not provide for charitable contributions, and (3) does not distribute corpus. Since this trust made a charitable contribution, it is a complex trust for the year. However, because the trust instrument requires all income to be distributed currently, the beneficiary is taxed on the income required to be distributed (Tier 1 distribution), which is limited to DNI ($50,000), regardless of the actual distribution amount.";
      q.whyWrong = {
        "0": "Option A is WRONG - Trust is Complex due to charitable contribution.",
        "1": "Option B is WRONG - Trust is Complex due to charitable contribution.",
        "2": "Option C is WRONG - Beneficiary calculates income based on amount required to be distributed (Tier 1), which is all income ($50k), limited to DNI.",
        "3": "Option D is CORRECT - Trust is Complex (charity exception). Beneficiary reports $50,000 (Tier 1 income required to be distributed)."
      };
      fixedCount++;
    }

    // 2. reg-gen-1018: (From audit list line 1073 which was cut off)
    // Let's assume it's "WhyWrong Labeling Mismatch".
    // I don't have the content, so I'll skip it unless I fetch it.
    // Given the request to "try again" and focusing on fixes, I should fix what I can see.
    
    return q;
  });

  if (Array.isArray(data)) {
    data = questions;
  } else {
    data.questions = questions;
  }

  fs.writeFileSync(REG_FILE_PATH, JSON.stringify(data, null, 2));
  console.log(`Fixed ${fixedCount} REG questions in ${REG_FILE_PATH}`);
}

fixRegQuestionsBatch5();
