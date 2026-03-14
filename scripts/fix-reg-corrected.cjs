const fs = require('fs');
const path = require('path');

const REG_FILE_PATH = path.join(__dirname, '../content/cpa/reg/questions.json');

function fixRegQuestions() {
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
    // 1. reg-corp-b6-002: E&P Increases
    if (q.id === 'reg-corp-b6-002') {
      q.correctAnswer = 2; // Option C (Tax-exempt interest)
      q.whyWrong = {
        "0": "Why option A is WRONG - Life insurance proceeds increase E&P, but only to the extent they exceed the premiums paid (or cash surrender value, depending on the method). It's a correct factor, but option C is unambiguously fully added.",
        "1": "Why option B is WRONG - Dividends paid represent a distribution of accumulated earnings, thus reducing the amount of E&P available for future distributions.",
        "2": "Why option C is CORRECT - Tax-exempt interest increases a corporation's ability to pay dividends and is added to E&P, even though it is excluded from taxable income.",
        "3": "Why option D is WRONG - Federal income taxes paid are a necessary expense and reduce the amount of earnings available for distribution, thereby decreasing E&P."
      };
      q.explanation = "E&P represents a corporation's economic ability to pay dividends. Tax-exempt interest adds to this ability, so it increases E&P. Life insurance proceeds also increase E&P, but generally only the excess of proceeds over premiums/CSV. Dividends paid and federal income taxes decrease E&P.";
      fixedCount++;
    }

    // 2. reg-cred-001: Child Tax Credit Math
    if (q.id === 'reg-cred-001') {
      // Fix AGI to make the math work ($1050 / $3000 = 35% bracket => AGI <= $15k)
      q.topic = "Child and Dependent Care Credit";
      q.question = "A taxpayer paid $8,000 in child care expenses for their 4-year-old while working. Their AGI is $14,000. What is the maximum child care credit?";
      q.correctAnswer = 3; // $1,050
      q.whyWrong = {
        "0": "Why option A is WRONG - This answer incorrectly applies a higher percentage or expense base.",
        "1": "Why option B is WRONG - This incorrectly assumes a different expense limit or rate.",
        "2": "Why option C is WRONG - This uses the minimum 20% rate.",
        "3": "Why option D is CORRECT - The maximum qualifying child care expenses for one child are $3,000. With an AGI of $14,000 (under $15,000), the applicable credit rate is 35%. Therefore, the maximum credit is $3,000 * 35% = $1,050."
      };
      q.explanation = "For one qualifying child, expenses are limited to $3,000. The credit rate is 35% for AGI $15,000 or less, decreasing by 1% for each $2,000 over $15,000. At $14,000 AGI, the rate is 35%. Credit = $3,000 * 35% = $1,050.";
      fixedCount++;
    }

    // 3. reg-d8-014: Like-Kind Exchange Basis
    if (q.id === 'reg-d8-014') {
      q.correctAnswer = 1; // Option B ($300,000)
      q.whyWrong = {
        "0": "Why option A is WRONG - $450,000 is FMV, not basis.",
        "1": "Why option B is CORRECT - New Basis = Old Basis ($300k) - Boot Received ($50k) + Gain Recognized ($50k) = $300,000. Alternatively: FMV New ($450k) - Deferred Gain ($150k) = $300,000.",
        "2": "Why option C is WRONG - Mathematical error.",
        "3": "Why option D is WRONG - Mathematical error."
      };
      fixedCount++;
    }

    // 4. reg-d8-017: Involuntary Conversion Basis
    if (q.id === 'reg-d8-017') {
      q.correctAnswer = 2; // Option C ($200,000)
      q.whyWrong = {
        "0": "Why option A is WRONG - $320,000 is the full cost, failing to reduce by deferred gain.",
        "1": "Why option B is WRONG - Incorrect calculation of deferred gain.",
        "2": "Why option C is CORRECT - Basis = Cost ($320,000) - Deferred Gain ($120,000) = $200,000. Deferred gain = Realized ($150k) - Recognized ($30k unreinvested).",
        "3": "Why option D is WRONG - $350,000 is the insurance proceeds."
      };
      fixedCount++;
    }

    // 5. reg-easy-exp-012: Itemized Deductions
    if (q.id === 'reg-easy-exp-012') {
      // Options: ["$20,000", "$24,300", "$22,300", "$26,300"]
      // Correct is $24,300 (Index 1)
      q.correctAnswer = 1; 
      q.whyWrong = {
        "0": "Why option A is WRONG - Limits the deductions incorrectly.",
        "1": "Why option B is CORRECT - Mortgage Interest ($14,000) + SALT ($8,300) + Charity ($2,000) = $24,300. The SALT deduction is fully allowed as it is under the $10,000 cap.",
        "2": "Why option C is WRONG - Likely omits the charitable contribution.",
        "3": "Why option D is WRONG - Overstates the deduction."
      };
      fixedCount++;
    }
    
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

fixRegQuestions();
