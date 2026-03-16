const fs = require('fs');
const path = require('path');

const FAR_FILE = path.join(__dirname, '../content/cpa/far/questions.json');

function fixFarBatch1() {
  if (!fs.existsSync(FAR_FILE)) {
    console.error('FAR file not found!');
    return;
  }

  const data = fs.readFileSync(FAR_FILE, 'utf8');
  let content = JSON.parse(data);
  let questions = Array.isArray(content) ? content : content.questions;

  let fixedCount = 0;

  questions.forEach(q => {
    // FIX 1: far-cons-052
    if (q.id === 'far-cons-052') {
      // Key 1 is correct ("Eliminated against selling entity's RE").
      // WhyWrong 1 says "WRONG". WhyWrong 3 says "CORRECT".
      q.correctAnswer = 1;
      q.whyWrong = {
        "0": "Incorrect. Intercompany profit must be eliminated.",
        "1": "Correct! The elimination is charged against the selling entity (Parent for downstream, Sub for upstream).",
        "2": "Incorrect. It is eliminated, not deferred.",
        "3": "Incorrect. NCI shares in the elimination only for upstream sales, not downstream."
      };
      fixedCount++;
    }

    // FIX 2: far-d16-006
    if (q.id === 'far-d16-006') {
      // Mod: Add 20 units @ $8. Standalone $9.50.
      // Price ($8) does NOT reflect standalone ($9.50).
      // Not distinct + standalone price -> Not a separate contract.
      // Remaining goods are distinct? Yes (units).
      // So it's a Termination of old + Creation of new?
      // Rule:
      // 1. Distinct & Standalone Price -> Separate Contract.
      // 2. Distinct & NOT Standalone -> Termination + New Contract (prospective). Allocating remaining consideration.
      // 3. Not Distinct -> Current Contract (cumulative catch-up).
      // Here: Goods (units) are distinct. Price is NOT standalone.
      // So Rule 2 Applies: Termination + New.
      // Options:
      // A) Separate contract. (False).
      // B) Termination... creation of new. (True).
      // C) Modification... cumulative catch-up. (False - that's for non-distinct).
      // D) Ignored. (False).
      // Key 1 (B) is correct.
      // WhyWrong 1 says "WRONG - ... termination... is not appropriate here".
      // WhyWrong 2 says "CORRECT - ... accounts for modification prospectively... cumulative catch-up".
      // Wait. Prospective and Catch-up are opposites.
      // Rule 2 (Distinct, Not Standalone) is Prospective (Termination + New).
      // Rule 3 (Not Distinct) is Cumulative Catch-up.
      // WhyWrong 2 mixes "prospectively" with "cumulative catch-up".
      // The Explanation says: "...treated as a termination of the existing contract and creation of a new contract."
      // So Key 1 (B) is undoubtedly correct.
      // WhyWrong 1 Text matches Option B but says it is WRONG.
      // WhyWrong 2 Text "Why option C is CORRECT" supports Option C (Catch-up) but incorrectly describes it as having "cumulative catch-up adjustment".
      // Fix: Conform WhyWrong to Key 1.
      q.correctAnswer = 1;
      q.whyWrong = {
        "0": "Incorrect. The price does not reflect standalone selling price.",
        "1": "Correct! Since the remaining goods are distinct but the price is not at standalone, it is treated as a termination of the old contract and creation of a new one (prospective).",
        "2": "Incorrect. Cumulative catch-up is used when remaining goods are not distinct.",
        "3": "Incorrect."
      };
      fixedCount++;
    }

    // FIX 3: far-d16-015
    if (q.id === 'far-d16-015') {
      // FIFO COGS. 300 sold.
      // Beg: 100 @ 10.
      // P1: 200 @ 12.
      // P2: 150 @ 14.
      // Sold 300.
      // 100 @ 10 = 1000.
      // 200 @ 12 = 2400.
      // Total 300. COGS = 3400.
      // Option A: 3200.
      // Option B: 3400.
      // Option C: 3500.
      // Option D: 3600.
      // Key 1 (B) is correct ($3,400).
      // WhyWrong 1 says "Why option B is WRONG... incorrectly assigns...".
      // WhyWrong 3 says "Why option D is CORRECT... (100*10) + (200*12) = 3400".
      // WhyWrong 3 text describes the Correct calculation ($3400) but assigns it to Option D ($3600).
      // Fix: Make WhyWrong 1 "Correct" and WhyWrong 3 "Incorrect".
      q.correctAnswer = 1;
      q.whyWrong = {
        "0": "Incorrect.",
        "1": "Correct! 100 units @ $10 + 200 units @ $12 = $3,400.",
        "2": "Incorrect.",
        "3": "Incorrect. This seems to be LIFO or another method."
      };
      fixedCount++;
    }

    // FIX 4: far-d9-011
    if (q.id === 'far-d9-011') {
      // Pre-tax Book $1,000,000.
      // Muni Interest (exempt) $50,000. (Subtract).
      // Fines (nondeductible) $30,000. (Add).
      // Taxable = 1,000,000 - 50,000 + 30,000 = 980,000.
      // Tax = 980,000 * 21% = 205,800.
      // Options: A) 210k. B) 205,800. C) 193,200. D) 226,800.
      // Key 1 (B) is correct ($205,800).
      // WhyWrong 1 says "Why option B is WRONG... incorrectly assumes that the resulting amount is the total income tax expense. ... question asks for total... calculation only represents current tax expense."
      // WhyWrong 2 says "Why option C is CORRECT... $205,800". Wait. Option C is $193,200.
      // WhyWrong 2 Text describes correct math ($205,800) but is attached to Option C ($193,200).
      // Text "Total income tax expense" vs "Current tax expense".
      // Does "Deferred" play a role? No temporary differences mentioned. Just permanent.
      // So Current = Total.
      // Fix: Keep Key 1 (B). Update descriptions.
      q.correctAnswer = 1; 
      q.whyWrong = {
        "0": "Incorrect.",
        "1": "Correct! Taxable Income = $1,000,000 - $50,000 (Muni) + $30,000 (Fines) = $980,000. Tax = $980,000 * 21% = $205,800.",
        "2": "Incorrect.",
        "3": "Incorrect."
      };
      fixedCount++;
    }

    // FIX 5: far-d9-014
    if (q.id === 'far-d9-014') {
      // CECL Aging.
      // Current 500k @ 1% = 5k.
      // 31-60 200k @ 3% = 6k.
      // 61-90 100k @ 8% = 8k.
      // >90 50k @ 25% = 12.5k.
      // Total = 5 + 6 + 8 + 12.5 = 31.5k.
      // Option D is $31,500.
      // Key 3 (D) is correct.
      // WhyWrong 1 says "Why option B is CORRECT... sum the results... = $31,500. The answer key is incorrect. The correct answer is $31,500."
      // WhyWrong 3 says "Why option D is WRONG... incorrectly applies loss rates twice...".
      // But Option B is $23,500. Option D is $31,500.
      // The text in WhyWrong 1 claims the answer is 31,500 (which is D) but says B is correct (contradiction).
      // Fix: Key 3 (D). Fix WhyWrongs.
      q.correctAnswer = 3;
      q.whyWrong = {
        "0": "Incorrect.",
        "1": "Incorrect. This understates the allowance.",
        "2": "Incorrect.",
        "3": "Correct! ($500k*1%) + ($200k*3%) + ($100k*8%) + ($50k*25%) = $31,500."
      };
      fixedCount++;
    }
  });

  if (fixedCount > 0) {
    if (!Array.isArray(content)) content.questions = questions;
    fs.writeFileSync(FAR_FILE, JSON.stringify(content, null, 2));
    console.log(`Successfully fixed ${fixedCount} FAR questions (Batch 1).`);
  } else {
    console.log('No questions found to fix.');
  }
}

fixFarBatch1();
