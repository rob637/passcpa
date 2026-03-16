const fs = require('fs');
const path = require('path');

const REG_FILE_PATH = path.join(__dirname, '../content/cpa/reg/questions.json');

function fixRegQuestionsBatch3() {
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
    // 1. reg-gen-0920: Audit Appeal Process
    if (q.id === 'reg-gen-0920') {
      q.whyWrong = {
        "0": "Why option A is WRONG - Filing a petition with the U.S. Tax Court is premature at this stage. The taxpayer needs a notice of deficiency (90-day letter) before petitioning the Tax Court.",
        "1": "Why option B is CORRECT - A 30-day letter gives the taxpayer the option to request a conference with the IRS Appeals Office. This is the appropriate action to take to resolve the issue within the IRS before going to court.",
        "2": "Why option C is WRONG - Paying the deficiency immediately is not the correct first step if the taxpayer disagrees with the assessment. The taxpayer should first exhaust their administrative appeal options.",
        "3": "Why option D is WRONG - Ignoring the 30-day letter is not advisable. If the taxpayer takes no action, the IRS will likely issue a notice of deficiency (90-day letter), but the taxpayer will have missed the opportunity to resolve the issue through the IRS appeals process."
      };
      fixedCount++;
    }

    // 2. reg-gen-0934: Statute of Limitations
    if (q.id === 'reg-gen-0934') {
      // Explanation refers to "Circular 230" and ID=reg-gen-0934??
      // The Explanation field in the file seems to be a copy-paste error from another question!
      // The options are dates.
      // Correct Answer is 1 (March 15, 2029) based on WhyWrong.
      // WhyWrong 1 says "Why option B is CORRECT... expiring on March 15, 2029".
      // WhyWrong 0 says "Why option A is WRONG".
      // Currently CorrectAnswer: 0.
      // Action: Set CorrectAnswer to 1. Fix Explanation.
      q.correctAnswer = 1;
      q.explanation = "Generally, the statute of limitations is 3 years. However, if there is a substantial omission of gross income (more than 25% of the gross income stated on the return), the statute is extended to 6 years. $60,000 / $180,000 = 33%, which exceeds 25%. Thus, the 6-year period applies. filed March 15, 2023 + 6 years = March 15, 2029.";
      fixedCount++;
    }

    // 3. reg-gen-0950: Secured Transactions Priority
    if (q.id === 'reg-gen-0950') {
      // First Bank: Attached Mar 1. Perfected (Filed) Mar 5.
      // Second Bank: Attached Mar 2. Perfected (Filed) Mar 3.
      // Rule: First to File or Perfect.
      // Second Bank filed Mar 3. First Bank filed Mar 5.
      // Second Bank filed first.
      // Does First Bank have an earlier perfection date?
      // Perfection requires Attachment + Filing (or possession).
      // First Bank Attached Mar 1, Filed Mar 5 -> Perfected Mar 5.
      // Second Bank Attached Mar 2, Filed Mar 3 -> Perfected Mar 3.
      // Second Bank has priority (First to File OR Perfect).
      // Correct Answer: 0 (Second Bank).
      // WhyWrong 0: "Why option A is WRONG... First Bank... has priority".
      // WhyWrong 1: "Why option B is CORRECT... First Bank... has priority".
      // This logic in WhyWrong is WRONG.
      // UCC 9-322(a)(1): Priority dates from the earlier of the time a filing is made covering the collateral or the security interest is perfected.
      // Second Bank filed Mar 3. First Bank filed Mar 5.
      // Second Bank wins.
      // The WhyWrong text claims First Bank wins because it attached first?? No. Attachment priority is only for unperfected vs unperfected.
      // Wait, "First Bank's security interest attached on March 1 and was perfected by filing on March 5".
      // "Second Bank... filed on March 3".
      // Second Bank filed first.
      // Therefore Second Bank wins.
      // Current CorrectAnswer: 0 (Second Bank).
      // WhyWrong 0 says "Why option A is WRONG".
      // WhyWrong 1 says "Why option B is CORRECT".
      // So the metadata says 0 is correct, but the text says B (First Bank) is correct.
      // The text is legally incorrect.
      // Action: Keep CorrectAnswer 0. Rewrite WhyWrong and Explanation.
      q.correctAnswer = 0;
      q.explanation = "Under the UCC 'first-to-file-or-perfect' rule (UCC §9-322), priority between conflicting perfected security interests is determined by the earlier of the time of filing or perfection. Second Bank filed on March 3. First Bank filed on March 5. Second Bank has priority because it filed first.";
      q.whyWrong = {
        "0": "Why option A is CORRECT - Second Bank filed its financing statement on March 3, which is before First Bank filed on March 5. Under the first-to-file-or-perfect rule, Second Bank has priority.",
        "1": "Why option B is WRONG - First Bank filed after Second Bank. Attachment date is not the primary factor for priority between perfected interests; filing date controls here.",
        "2": "Why option C is WRONG - Loan size is irrelevant.",
        "3": "Why option D is WRONG - Being the first to attach/obtain interest does not give priority over a prior filer."
      };
      fixedCount++;
    }

    // 4. reg-gen-0968: Taxable Income Calc
    if (q.id === 'reg-gen-0968') {
      // Joint. Ages 67/62. Blind (John).
      // AGI $80k.
      // Standard Deduction (2023): $27,700 (Married Joint).
      // Add'l Std Ded: Age 65+ or Blind.
      // John: 65+ ($1,500) + Blind ($1,500) = $3,000? 
      // 2023 Add'l amount is $1,500 for married.
      // Mary: 62 (No age add'l).
      // Total Add'l: $1,500 (John Age) + $1,500 (John Blind) = $3,000.
      // Total Std Ded: $27,700 + $3,000 = $30,700.
      // Itemized:
      // Med: $12k. 7.5% AGI = $6k. Ded = $6k.
      // SALT: $11k. Cap $10k.
      // Mort Int: $8k.
      // Charity: $3k.
      // Total Itemized: $6k + $10k + $8k + $3k = $27,000.
      // Std ($30,700) > Itemized ($27,000).
      // Taxable Income = $80,000 - $30,700 = $49,300.
      // Options:
      // A: $42k
      // B: $44.1k
      // C: $45.1k
      // D: $46k
      // None match $49,300.
      // Explanation says: "Total standard deduction is $27,700 + $3,700 + $1,850 = $33,250"
      // It assumes John gets 2 add'l, Mary gets 1? Mary is 62. Not 65+.
      // Ah, explanation says "Mary is over 65". Question says "Mary is 62".
      // Also, Explanation uses $1,850 for add'l amount? $1,550 was 2023? $1,850 seems high?
      // 2023 Add'l: $1,500 per condition per spouse.
      // 2024 Add'l: $1,550.
      // If we use 2024 numbers:
      // Std Ded: $29,200.
      // Add'l: $1,550 * 2 (John) = $3,100.
      // Total: $32,300.
      // TI = $80k - $32.3k = $47,700.
      // Still doesn't match options.
      // Let's look at the Options/WhyWrong in the file.
      // CorrectAnswer: 3 ($46,000).
      // Explanation claims result is $46,750, closest is $46,000.
      // WhyWrong 0 says "Why option A is CORRECT".
      // Total chaos.
      // Action: Rewrite entire question to be consistent with 2024 numbers (since we are in 2026, usually test 2024/2025).
      // Let's use 2024 numbers.
      // AGI $80,000.
      // Std Ded $29,200.
      // Mary 62 (No add'l). John 67 (Age + Blind) -> 2 * $1,550 = $3,100.
      // Total Std = $32,300.
      // Itemized = $27,000 (calculated above, 10k cap).
      // TI = $80,000 - $32,300 = $47,700.
      // Let's update options to include $47,700.
      q.question = "John (67, blind) and Mary (62) are married filing jointly. Their 2024 AGI is $80,000. Potential itemized deductions: Medical $12,000; SALT $11,000; Mortgage Interest $8,000; Charity $3,000. What is their taxable income?";
      q.options = [
        "$47,700",
        "$50,800",
        "$53,000",
        "$45,000"
      ],
      q.correctAnswer = 0;
      q.explanation = "2024 Standard Deduction for MFJ is $29,200. John gets additional deductions for age (65+) and blindness: 2 * $1,550 = $3,100. Mary (62) gets none. Total Standard Deduction = $29,200 + $3,100 = $32,300. Itemized Deductions: Medical ($12k - 7.5% of $80k) = $6,000. SALT (capped) = $10,000. Mortgage = $8,000. Charity = $3,000. Total Itemized = $27,000. Since Standard ($32,300) > Itemized ($27,000), they use the Standard. Taxable Income = $80,000 - $32,300 = $47,700.";
      q.whyWrong = {
        "0": "Why option A is CORRECT - Taxable Income = AGI - Standard Deduction (including age/blindness additions).",
        "1": "Why option B is WRONG - Calculation error.",
        "2": "Why option C is WRONG - Itemized deduction calculation error.",
        "3": "Why option D is WRONG - Calculation error."
      };
      fixedCount++;
    }

    // 5. reg-gen-0974: Child Tax Credit
    if (q.id === 'reg-gen-0974') {
      // Child David, 16.
      // CTC age limit: Under 17 (16 is okay). Amount $2,000.
      // AGI $52k. Phaseout starts at $400k for MFJ. Full credit available.
      // EITC?
      // Investment income limit ($11,000 in 2023). Interest $1,000 is fine.
      // AGI Phaseout?
      // Options regarding "Eligible" or "Not Eligible".
      // AGI $52,000 is likely too high for EITC with 1 child.
      // 2023 limit for 1 child MFJ is ~$53k. 2024 is higher.
      // Question doesn't specify year, but usually implies current.
      // If AGI $52k, they might be just eligible for a tiny amount or phased out.
      // Let's check options.
      // Options:
      // 0: CTC $2k, EITC Not Eligible.
      // 1: CTC $2k, EITC Eligible.
      // 2: CTC $0, EITC Eligible.
      // 3: CTC $3k, EITC Not Eligible.
      // CorrectAnswer is missing in my manual summary above, but let's check content.
      // "correctAnswer": 1 (CTC $2k, EITC Eligible).
      // WhyWrong 1: "While the child tax credit amount is correct, they are not eligible for EITC because their earned income exceeds the threshold."
      // So WhyWrong 1 contradicts CorrectAnswer 1!!!!!
      // If WhyWrong 1 says "Not eligible", then Option 1 ("Eligible") is WRONG.
      // Option 0 is ("Not Eligible").
      // So CorrectAnswer should be 0.
      // Also need to verify EITC threshold for 2024.
      // 2024 MFJ 1 qualifying child: Phaseout ends at $56,004.
      // AGI $52,000 is < $56,004. So they ARE eligible (for a reduced amount).
      // WhyWrong 1 says "earned income exceeds...". Maybe it was based on older numbers?
      // Or maybe the AI logic is just wrong.
      // If they are eligible, Option 1 is correct.
      // WhyWrong 1 text says "they are not eligible".
      // This text needs to be fixed to match the reality (Eligible).
      // Or we change AGI to be clearly over limit (e.g. $60k).
      // If we change AGI to $60k:
      // CTC still $2k. EITC Not Eligible.
      // Correct Answer -> 0.
      // WhyWrong 0 -> Correct.
      // This is cleaner/safer than calculating exact EITC phaseouts.
      q.question = q.question.replace("$52,000", "$65,000"); // Make clearly ineligible
      q.correctAnswer = 0;
      q.explanation = "Child Tax Credit is $2,000 for a child under 17. EITC is phased out completely for MFJ with 1 child at AGI of approx $56k (2024). With AGI of $65,000, they are not eligible for EITC.";
      q.whyWrong = {
        "0": "Option A is CORRECT - Qualifying child (16) gets $2,000 CTC. Income is too high for EITC.",
        "1": "Option B is WRONG - Income exceeds EITC threshold.",
        "2": "Option C is WRONG - CTC is available.",
        "3": "Option D is WRONG - CTC is $2,000, not $3,000."
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

fixRegQuestionsBatch3();
