# CPA Question Accuracy Audit Report

Generated: 2026-03-02

## Summary

| Metric | Value |
|--------|-------|
| Total Questions | 9,002 |
| Total Issues Found | 438 |

### Questions by Section

| Section | Count |
|---------|-------|
| FAR | 1,506 |
| AUD | 1,458 |
| REG | 1,468 |
| BAR | 1,600 |
| ISC | 1,487 |
| TCP | 1,483 |

### Issues by Severity

| Severity | Count |
|----------|-------|
| HIGH | 169 |
| MEDIUM | 265 |
| INFO | 4 |

### Issues by Category

| Category | Count |
|----------|-------|
| Option quality issues | 257 |
| whyWrong labeling mismatch | 169 |
| Numerical answer review | 8 |
| Accounting pattern check | 4 |

---

## Detailed Issue Log

### HIGH Issues (169)

#### `far-cons-052` (FAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"WRONG\" but this is the correct answer",
    "text": "Why option B is WRONG - While elimination does impact retained earnings, the allocation of the elimination between controlling and non-controlling int"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=1",
    "text": "Why option D is CORRECT - Unrealized intercompany profit must be eliminated from consolidated inventory and profit. In downstream sales, the entire el"
  }
]
```

---

#### `far-d16-006` (FAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"WRONG\" but this is the correct answer",
    "text": "Why option B is WRONG - The contract modification does not fundamentally change the nature of the original contract; it's an adjustment to the existin"
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=1",
    "text": "Why option C is CORRECT - When a contract modification doesn't qualify as a separate contract, the entity accounts for the modification prospectively."
  }
]
```

---

#### `far-d16-015` (FAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"WRONG\" but this is the correct answer",
    "text": "Why option B is WRONG - This calculation incorrectly assigns the first 100 units sold at the price of the last purchase and the next 200 at the beginn"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=1",
    "text": "Why option B is CORRECT - Under FIFO, the first units purchased are assumed to be the first units sold. Therefore, the Cost of Goods Sold (COGS) is (1"
  }
]
```

---

#### `far-d9-011` (FAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"WRONG\" but this is the correct answer",
    "text": "Why option B is WRONG - This answer correctly calculates taxable income by adjusting for permanent differences, but it incorrectly assumes that the re"
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=1",
    "text": "Why option C is CORRECT - The total income tax expense is calculated by first adjusting pre-tax book income for permanent differences to arrive at tax"
  }
]
```

---

#### `far-d9-014` (FAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"WRONG\" but this is the correct answer",
    "text": "Why option D is WRONG - This incorrectly applies the loss rates twice, resulting in an overstated allowance. The loss rate should only be applied once"
  }
]
```

---

#### `far-extra-156` (FAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"CORRECT\" but correctAnswer=2",
    "text": "Why option A is CORRECT - Nonspendable fund balances represent assets that are not in a spendable form or are legally or contractually required to be "
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"WRONG\" but this is the correct answer",
    "text": "Why option D is WRONG - Restricted fund balances are constrained by external parties, constitutional provisions, or enabling legislation, but these co"
  }
]
```

---

#### `far-wc-080` (FAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=3",
    "text": "Why option C is CORRECT - Diluted EPS considers the potential dilution from convertible securities. The incremental EPS from the bonds ($1.50) is less"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"WRONG\" but this is the correct answer",
    "text": "Why option D is WRONG - $1.95 is the correct diluted EPS. The question asks for diluted EPS, which incorporates the impact of potentially dilutive sec"
  }
]
```

---

#### `far-gen-1321` (FAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=1",
    "text": "This answer would be correct if the options vested over 5 years and expense was recognized evenly each year ($150,000 / 5). However, the options vest "
  }
]
```

---

#### `far-gen-1327` (FAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "The present value calculation is correct, but the lease is classified as a finance lease, not an operating lease, because it meets the 'major part' te"
  }
]
```

---

#### `far-gen-1351` (FAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - This answer incorrectly subtracts the actuarial loss instead of adding it, resulting in an understated APBO."
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - The accumulated post-retirement benefit obligation (APBO) at year-end is calculated by adding service cost, interest cost, a"
  }
]
```

---

#### `far-gen-1352` (FAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=0",
    "text": "This option only subtracts the uncollectible portion. While it is a step closer to the correct answer, it does not consider the 60-day availability cr"
  }
]
```

---

#### `far-gen-1409` (FAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"WRONG\" but this is the correct answer",
    "text": "Why option B is WRONG: Recognizing the entire profit of $400,000 is incorrect. With an operating lease in a sale-leaseback, profit recognition is ofte"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=1",
    "text": "Why option D is CORRECT: When the leaseback is classified as an operating lease, profit is recognized only to the extent the sales price exceeds the a"
  }
]
```

---

#### `far-gen-1418` (FAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - This answer incorrectly calculates basic EPS, likely due to an arithmetic error in the final division step or a miscalculation"
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - Basic EPS is calculated by subtracting preferred dividends from net income and dividing the result by the weighted average n"
  }
]
```

---

#### `far-gen-1432` (FAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - While the General Fund and Capital Projects Fund are major funds, the Special Revenue Fund does not meet both the 10% and 5% t"
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - A fund is considered major if it meets both the 10% of total governmental funds and enterprise funds *and* 5% of total gover"
  }
]
```

---

#### `far-gen-1449` (FAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=1",
    "text": "This option adds all cash inflows including the subsidy, which is not the correct treatment of a subsidy in an enterprise fund's operating statement."
  }
]
```

---

#### `far-gen-1473` (FAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"WRONG\" but this is the correct answer",
    "text": "Why option B is WRONG - $2,900 is not the correct calculation under FIFO. This value may arise from adding the total purchase cost to the beginning in"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=1",
    "text": "Why option D is CORRECT - Under FIFO (First-In, First-Out), the oldest inventory is assumed to be sold first. Therefore, the 250 units sold consist of"
  }
]
```

---

#### `far-gen-1474` (FAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"WRONG\" but this is the correct answer",
    "text": "Why option C is WRONG - This answer likely miscalculates either the amortization of the original grant or the incremental compensation expense due to "
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=2",
    "text": "Why option D is CORRECT - The modification of the stock options requires recognizing both the amortization of the original grant and the incremental c"
  }
]
```

---

#### `far-gen-1488` (FAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - This option correctly calculates depreciation expense, but it incorrectly states that the answer is $45,000. The correct answe"
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - Depreciation expense is calculated as (Cost - Salvage Value) / Useful Life. In this case, ($500,000 - $50,000) / 10 years = "
  }
]
```

---

#### `far-gen-1490` (FAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Option B is correct because the net increase in net position is calculated by subtracting total expenses (including depreciation and interest) from re"
  }
]
```

---

#### `far-9k-004` (FAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"CORRECT\" but correctAnswer=1",
    "text": "This answer would be correct for an operating lease or a finance lease without a transfer of ownership or a bargain purchase option."
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=1",
    "text": "This would be the correct answer if it was an operating lease or a finance lease with no transfer of ownership or bargain purchase option."
  }
]
```

---

#### `aud-exp-040` (AUD)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Option A is CORRECT because professional skepticism is characterized by a questioning mind, a critical assessment of audit evidence, and alertness to "
  }
]
```

---

#### `aud-ext-rep-005` (AUD)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"CORRECT\" but correctAnswer=3",
    "text": "Why option A is CORRECT - If management's plans are deemed adequate to alleviate the substantial doubt about the entity's ability to continue as a goi"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"WRONG\" but this is the correct answer",
    "text": "Why option D is WRONG - An Emphasis-of-Matter (EOM) paragraph is used to highlight a matter appropriately presented or disclosed in the financial stat"
  }
]
```

---

#### `aud-gap-vii-012` (AUD)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"WRONG\" but this is the correct answer",
    "text": "Why option C is WRONG - While a 5-year retention period was previously required under GAAS, current standards require a longer retention period."
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=2",
    "text": "Why option D is CORRECT - PCAOB standards require audit documentation to be retained for seven years from the report release date, and this is the min"
  }
]
```

---

#### `aud-wc-129` (AUD)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"WRONG\" but this is the correct answer",
    "text": "Why option B is CORRECT - Revenue recognition before it's earned overstates current revenue and understates deferred revenue. This impacts the cutoff "
  }
]
```

---

#### `aud-wc-211` (AUD)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=3",
    "text": "Why option C is CORRECT - A Type 1 SOC report only assesses the design of controls at a specific point in time. To rely on the service organization's "
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"WRONG\" but this is the correct answer",
    "text": "Why option D is WRONG - While additional procedures are needed, the fundamental problem is the *type* of report. Performing procedures to bridge the g"
  }
]
```

---

#### `aud-gen-1041` (AUD)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - While revenue can be used, it's less directly related to profitability for a manufacturing company and may result in an inappr"
  }
]
```

---

#### `aud-gen-1093` (AUD)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - While lack of awareness can sometimes mitigate independence issues, the father's investment still creates an indirect financia"
  }
]
```

---

#### `aud-gen-1218` (AUD)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"CORRECT\" but correctAnswer=1",
    "text": "While sending a second confirmation is an option, the auditor cannot simply assume the balance is correct if there is no response to either confirmati"
  }
]
```

---

#### `aud-gen-1261` (AUD)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Decreasing the expected population deviation rate will generally lead to a *smaller* sample size. However, the question asks which choice will *always"
  }
]
```

---

#### `aud-gen-1320` (AUD)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=2",
    "text": "The sample deviation rate is calculated correctly as 3.33% but it is not the upper deviation rate. The conclusion is correct based on a UDR of 9.2% ex"
  }
]
```

---

#### `aud-gen-1393` (AUD)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - This range only considers the lower end of both the revenue and net income calculations, failing to account for the auditor's "
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option C is CORRECT - Preliminary materiality is determined by applying percentage ranges to relevant benchmarks like revenue and net income, then"
  }
]
```

---

#### `aud-gen-1433` (AUD)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=2",
    "text": "While qualifying the opinion is an option, the more ethical approach is to insist on correction and withdraw if necessary. A qualified opinion may not"
  }
]
```

---

#### `aud-gen-1449` (AUD)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"WRONG\" but this is the correct answer",
    "text": "Why option D is WRONG - The impairment arises from performing management functions, not simply preparing source documents. Review and approval by the "
  }
]
```

---

#### `reg-corp-b6-002` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - Life insurance proceeds, while increasing cash, only increase E&P to the extent the cash surrender value exceeds premiums paid"
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - Tax-exempt interest increases a corporation's ability to pay dividends, even though it's not included in taxable income. E&P"
  }
]
```

---

#### `reg-cred-001` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - This answer incorrectly assumes the maximum qualifying expenses are $8,000 and applies a rate lower than 35%."
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option D is CORRECT - The maximum qualifying child care expenses for one child are $3,000. With an AGI of $35,000, the applicable credit rate is 3"
  }
]
```

---

#### `reg-d8-014` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - The fair market value of the new building is not the basis in a like-kind exchange. The basis is generally carried over from t"
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - In a like-kind exchange with boot, the basis of the new property is calculated as the adjusted basis of the old property, le"
  }
]
```

---

#### `reg-d8-017` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - $320,000 is the cost of the replacement property, but it doesn't account for the deferred gain resulting from the involuntary "
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option C is CORRECT - The basis of the replacement property under §1033 is its cost less the deferred gain. In this case, the deferred gain is $12"
  }
]
```

---

#### `reg-easy-exp-012` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Option A is WRONG because it significantly underestimates the total itemized deductions, failing to account for the full amount of deductible mortgage"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=0",
    "text": "Option A is CORRECT because it accurately sums the deductible mortgage interest ($14,000), state and local taxes ($8,300), and charitable contribution"
  }
]
```

---

#### `reg-elite-002` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"WRONG\" but this is the correct answer",
    "text": "Why option B is WRONG - IRC §183(d) states that an activity is presumed for profit if it generates a profit in at least three out of five consecutive "
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=1",
    "text": "Option A is CORRECT because it lists the major exclusions to cancellation of debt (COD) income as defined by IRC Section 108. These exclusions allow t"
  }
]
```

---

#### `reg-ext-136` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"WRONG\" but this is the correct answer",
    "text": "Why option C is CORRECT - To be a holder in due course, a holder must acquire the instrument for value (meaning something of worth was given), in good"
  }
]
```

---

#### `reg-wc-191` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"CORRECT\" but correctAnswer=3",
    "text": "Option A is CORRECT because S corporation losses first reduce stock basis to zero, then debt basis. Subsequent income first restores debt basis that w"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"WRONG\" but this is the correct answer",
    "text": "Option D is WRONG because the $10,000 income in year 2 must first restore the debt basis that was reduced by losses in year 1. The debt basis would no"
  }
]
```

---

#### `reg-gen-0920` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=1",
    "text": "Paying the deficiency immediately is not the correct first step if the taxpayer disagrees with the assessment. The taxpayer should first exhaust their"
  }
]
```

---

#### `reg-gen-0934` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - The general statute of limitations is three years, but the omission of gross income exceeding 25% of the *stated* gross income"
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - When a taxpayer omits gross income exceeding 25% of the gross income reported on their return, the statute of limitations fo"
  }
]
```

---

#### `reg-gen-0950` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - While Second Bank filed first, the 'first-to-file-or-perfect' rule considers both filing and perfection. First Bank's earlier "
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - The 'first-to-file-or-perfect' rule dictates priority. First Bank's security interest attached on March 1 and was perfected "
  }
]
```

---

#### `reg-gen-0968` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"CORRECT\" but correctAnswer=3",
    "text": "Why option A is CORRECT: Taxable income is calculated by subtracting the standard deduction (or itemized deductions, whichever is greater) and persona"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"WRONG\" but this is the correct answer",
    "text": "Why option D is WRONG: This answer likely results from an error in calculating either the standard deduction, itemized deductions, or the subtraction "
  }
]
```

---

#### `reg-gen-0974` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=3",
    "text": "While the child tax credit amount is correct, they are not eligible for EITC because their earned income exceeds the threshold."
  }
]
```

---

#### `reg-gen-0978` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"CORRECT\" but correctAnswer=1",
    "text": "Why option A is CORRECT - The AMT exemption is phased out based on AMTI. Because John's AMTI exceeds the phase-out threshold, his exemption is reduced"
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"WRONG\" but this is the correct answer",
    "text": "Why option C is WRONG - $35,990 represents a partial calculation of the exemption, but it doesn't account for the full phase-out due to John's high AM"
  }
]
```

---

#### `reg-gen-0984` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"WRONG\" but this is the correct answer",
    "text": "Why option B is WRONG - $115,600 is not related to the AMT exemption phaseout for single taxpayers in 2023; it's significantly lower than the actual t"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=1",
    "text": "Why option D is CORRECT - For single taxpayers in 2023, the AMT exemption begins to phase out when alternative minimum taxable income (AMTI) exceeds $"
  }
]
```

---

#### `reg-gen-0988` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"CORRECT\" but correctAnswer=1",
    "text": "Option A is CORRECT because it accurately calculates taxable income by subtracting the standard deduction ($15,700) and the QBI deduction ($12,000) fr"
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"WRONG\" but this is the correct answer",
    "text": "Option C is WRONG because it incorrectly calculates the QBI deduction or fails to subtract it from the AGI after applying the standard deduction."
  }
]
```

---

#### `reg-gen-0990` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "This option would be correct for a single filer. The question clearly states they are married filing jointly."
  }
]
```

---

#### `reg-gen-1006` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"WRONG\" but this is the correct answer",
    "text": "Why option B is WRONG - The trust is not a simple trust because it made a charitable contribution. Simple trusts cannot make charitable contributions."
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=1",
    "text": "Why option D is CORRECT - The trust is complex because it made a charitable contribution. Beneficiaries of trusts must report their share of DNI, up t"
  }
]
```

---

#### `reg-gen-1018` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"CORRECT\" but correctAnswer=3",
    "text": "Option A is CORRECT because it accurately calculates the gain recognized in Year 1 using the installment method, considering both Section 1231 and unr"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"WRONG\" but this is the correct answer",
    "text": "Option D is WRONG because it only calculates the Section 1231 gain recognized in Year 1 and fails to account for the unrecaptured Section 1250 gain th"
  }
]
```

---

#### `reg-gen-1025` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=0",
    "text": "The $2,000 loss is not recognized due to the wash sale rule. While the basis of $8,000 is correct, the loss is disallowed, not recognized."
  }
]
```

---

#### `reg-gen-1028` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=3",
    "text": "Why option C is CORRECT - John's loss of $150,000 ($550,000 - $400,000) is disallowed. Beta's gain is $200,000 ($600,000 - $400,000). Beta recognizes "
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"WRONG\" but this is the correct answer",
    "text": "Why option D is WRONG - This is the gain Beta Corporation realized before considering the impact of the disallowed loss from the related party transac"
  }
]
```

---

#### `reg-gen-1034` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"CORRECT\" but correctAnswer=3",
    "text": "Why option A is CORRECT - When using the installment method, depreciation recapture (Section 1245 gain) is recognized entirely in the year of sale, re"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"WRONG\" but this is the correct answer",
    "text": "Why option D is WRONG - $100,000 is an arbitrary amount and does not correctly calculate the gain based on the sales price, adjusted basis, and deprec"
  }
]
```

---

#### `reg-gen-1035` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"CORRECT\" but correctAnswer=3",
    "text": "Option A is CORRECT because it accurately reflects the Section 1245 recapture as ordinary income and the Section 1231 gain from the land sale. Section"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"WRONG\" but this is the correct answer",
    "text": "Why option D is WRONG - This option incorrectly classifies the entire gain as ordinary income. While the depreciation recapture is ordinary income, th"
  }
]
```

---

#### `reg-gen-1069` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - $25,000 represents the current earnings and profits of the corporation, but it doesn't account for the accumulated earnings an"
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - The distribution first covers current and accumulated E&P ($75,000), then reduces basis ($10,000). Any remaining distributio"
  }
]
```

---

#### `reg-gen-1070` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=0",
    "text": "While the gain is correctly calculated at $20,000, the stock basis is not $0. The stock basis calculation requires adjustments for gain recognized and"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=0",
    "text": "While the gain is correctly calculated at $20,000, the stock basis is not $50,000. The stock basis calculation requires adjustments for gain recognize"
  }
]
```

---

#### `reg-gen-1077` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - This option incorrectly subtracts from the $1,000,000 limit instead of adding the qualified retirement plan contributions and "
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - Section 162(m) limits deductible compensation to $1,000,000 for covered employees, but this limit *doesn't* apply to qualifi"
  }
]
```

---

#### `reg-gen-1080` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - This answer incorrectly subtracts the trustee fees from the combined dividend and interest income. While trustee fees are dedu"
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - Distributable Net Income (DNI) for a simple trust starts with the trust's gross income (dividends + interest). Capital gains"
  }
]
```

---

#### `reg-gen-1103` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Option A is WRONG because Alice does recognize a loss in this liquidation. The loss arises because the cash and basis of the inventory she received ar"
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Option B is CORRECT because when a partner receives cash, inventory, and other assets in liquidation, a loss is recognized if the partner's outside ba"
  }
]
```

---

#### `reg-gen-1116` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=0",
    "text": "While decreasing the capital account is correct, the absence of a deficit restoration obligation means the allocation may lack substantial economic ef"
  }
]
```

---

#### `reg-gen-1119` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=2",
    "text": "Why option B is CORRECT - Distributable Net Income (DNI) starts with taxable income and is adjusted. Here, it's calculated as dividend income ($50,000"
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"WRONG\" but this is the correct answer",
    "text": "Why option D is WRONG - This answer incorrectly includes the long-term capital gains allocated to the corpus in the DNI calculation. Capital gains all"
  }
]
```

---

#### `reg-gen-1155` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=0",
    "text": "This option correctly calculates the dividend income but fails to account for the basis reduction once dividend income is exhausted."
  }
]
```

---

#### `reg-gen-1186` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=0",
    "text": "This option overstates the Section 1231 gain by including the amount of depreciation recapture. The capital loss is correctly identified, but not rele"
  }
]
```

---

#### `reg-gen-1193` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - This answer incorrectly identifies the gain recognized as the Section 1245 income without comparing it to the accumulated depr"
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option C is CORRECT - Section 1245 dictates that the *lesser* of the gain recognized or the accumulated depreciation is treated as ordinary income"
  }
]
```

---

#### `reg-gen-1204` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - This option fails to account for the Section 1231 lookback rule, which requires recharacterization of a portion of the current"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option D is CORRECT - The net Section 1231 loss of $17,000 is initially treated as an ordinary loss. However, the $5,000 Section 1231 lookback rul"
  }
]
```

---

#### `reg-gen-1228` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"CORRECT\" but correctAnswer=1",
    "text": "Why option A is CORRECT - Section 1245 recapture treats gains from the sale of depreciated personal property as ordinary income to the extent of accum"
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"WRONG\" but this is the correct answer",
    "text": "Why option C is WRONG - This is the amount of the gain realized on the sale ($500,000 - $350,000), but the question asks for the amount of Section 124"
  }
]
```

---

#### `reg-gen-1230` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - This answer incorrectly calculates the gross profit percentage by dividing the gross profit ($180,000) by the *selling price* "
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - The gross profit percentage is calculated by dividing the gross profit by the amount realized. The gross profit is the selli"
  }
]
```

---

#### `reg-gen-1234` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=1",
    "text": "While the disallowed loss of $1,000 is correctly calculated, the basis of the new shares is not simply the purchase price, but includes the disallowed"
  }
]
```

---

#### `reg-gen-1238` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 3 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "This option fails to recognize the correct calculation of the capital loss deduction limitation."
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=0",
    "text": "This option fails to recognize the correct calculation of the capital loss deduction limitation and exceeds the statutory limit."
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=0",
    "text": "This option fails to recognize the correct calculation of the capital loss deduction limitation and exceeds the statutory limit. It also uses the tota"
  }
]
```

---

#### `reg-gen-1240` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG: This answer incorrectly subtracts the cash received from the adjusted basis of the old machine and fails to account for the pot"
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT: The basis in the new machine is calculated as: Adjusted basis of old machine ($80,000) - Cash received ($10,000). Since the c"
  }
]
```

---

#### `reg-gen-1241` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - This option only considers the mother's adjusted basis and ignores the portion of the gift tax that can be added to the basis."
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - John's basis is his mother's adjusted basis ($150,000) plus the gift tax paid attributable to the appreciation. The apprecia"
  }
]
```

---

#### `reg-gen-1242` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=0",
    "text": "The 1231 gain is correctly identified, but the net 1231 gain is not separated from the capital loss."
  }
]
```

---

#### `reg-gen-1248` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - This answer incorrectly calculates the gain and then subtracts the gain from the accumulated depreciation. Section 1245 recapt"
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option C is CORRECT - Section 1245 recapture treats a portion of the gain on the sale of depreciable personal property as ordinary income to the e"
  }
]
```

---

#### `reg-gen-1253` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=1",
    "text": "While the recognized gain is correctly calculated, the basis in the new warehouse is not simply the purchase price. It must be reduced by the deferred"
  }
]
```

---

#### `reg-gen-1255` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - This answer only considers the gain from the sale of land and incorrectly assumes the equipment sale does not contribute to th"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option D is CORRECT - The land sale resulted in a $30,000 Section 1231 gain. The equipment sale resulted in a $15,000 gain ($75,000 - $60,000). Be"
  }
]
```

---

#### `reg-gen-1258` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 3 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "This option would be correct if we simply added the total losses together and subtracted the total gains, but we must first offset losses against gain"
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=0",
    "text": "This option represents the total short-term capital loss before offsetting with the short-term capital gain. This is not the correct procedure."
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=0",
    "text": "This option represents the total of all gains and losses without offsetting. This is not the correct procedure."
  }
]
```

---

#### `reg-gen-1265` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - This answer fails to account for the boot received, which reduces the basis in the new property."
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - In a like-kind exchange with boot, the basis of the new property is the old basis less the boot received, plus any gain reco"
  }
]
```

---

#### `reg-gen-1280` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - This answer is the gross profit divided by the sales price, but it's incorrectly labeled as the gross profit percentage. The c"
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - The gross profit percentage is calculated as (Sales Price - Adjusted Basis - Selling Expenses) / Sales Price. In this case, "
  }
]
```

---

#### `reg-gen-1281` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=0",
    "text": "While the recognized loss is correctly identified as $0, the basis of the newly acquired stock is not simply the purchase price. The disallowed loss i"
  }
]
```

---

#### `reg-gen-1285` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=2",
    "text": "B) $25,000 is correct because to avoid the underpayment penalty, taxpayers must pay the *smaller* of 90% of the current year's tax liability ($30,000 "
  }
]
```

---

#### `reg-gen-1334` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=1",
    "text": "This option doesn't reflect the correct calculation of the AOTC based on the qualified expenses."
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=1",
    "text": "This option doesn't reflect the correct calculation of the AOTC based on the qualified expenses."
  }
]
```

---

#### `reg-gen-1346` (REG)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"CORRECT\" but correctAnswer=1",
    "text": "Why option A is CORRECT - Jeremy does not qualify for any other filing status. He is unmarried and does not have a qualifying child or dependent paren"
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"WRONG\" but this is the correct answer",
    "text": "Why option C is WRONG - To file as Head of Household, Jeremy must maintain a household for a qualifying child or a dependent parent. While Lisa is Jer"
  }
]
```

---

#### `bar-cost-b3-004` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=3",
    "text": "Why option C is CORRECT - Under FIFO, equivalent units are calculated as: (Work to complete beginning WIP) + (Units started and completed) + (Work on "
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"WRONG\" but this is the correct answer",
    "text": "Why option D is WRONG - This answer represents the total units completed, but it doesn't isolate the work done in the current period, which is crucial"
  }
]
```

---

#### `bar-d4-011` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - High accrual quality *does* indicate high-quality earnings, but aggressive revenue recognition would *lower* accrual quality a"
  }
]
```

---

#### `bar-fm-001` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - This answer is close, likely resulting from a minor calculation error in the days sales in inventory, days sales outstanding, "
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - The cash conversion cycle (CCC) measures the time it takes for a company to convert its investments in inventory and other r"
  }
]
```

---

#### `bar-wc-009` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"WRONG\" but this is the correct answer",
    "text": "Option D is wrong because the calculation shows that buying is only slightly cheaper, but the question implies that making is cheaper when only variab"
  }
]
```

---

#### `bar-wc-037` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - This answer incorrectly adds the beginning WIP units to the started and completed units, and uses the wrong percentage for end"
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option C is CORRECT - FIFO calculates equivalent units by summing the work to complete beginning WIP (6,000), the units started and completed (35,"
  }
]
```

---

#### `bar-wc-038` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - A contingent liability is disclosed, not accrued, when the loss is reasonably possible but not probable, or when the amount ca"
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - ASC 450 requires accruing a loss contingency when it is probable that a liability has been incurred and the amount can be re"
  }
]
```

---

#### `bar-wc-136` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=0",
    "text": "While the debt-to-equity ratio is correctly calculated, the conclusion is flawed. A D/E of 0.67 doesn't automatically mean the company *should* increa"
  }
]
```

---

#### `bar-gen-0989` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - This answer likely results from a miscalculation or incorrect application of the formula, perhaps by adding instead of subtrac"
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - The cash conversion cycle (CCC) measures the time it takes for a company to convert its investments in inventory and other r"
  }
]
```

---

#### `bar-gen-0992` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=1",
    "text": "This option confuses the sales mix ratio and adds the units of Alpha instead of correctly calculating the weighted average contribution margin."
  }
]
```

---

#### `bar-gen-1024` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"CORRECT\" but correctAnswer=1",
    "text": "While the land contribution is correctly identified, the cash contribution from the state government should be reported as contributed capital, not as"
  }
]
```

---

#### `bar-gen-1035` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - This answer incorrectly calculates operating income by subtracting only the direct costs from the billings, neglecting to incl"
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - Operating income for an internal service fund is calculated as operating revenues (billings to other departments) less opera"
  }
]
```

---

#### `bar-gen-1036` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=1",
    "text": "C) $3,050,000 decrease is CORRECT because the net change in the fund balance is calculated by subtracting investment income ($50,000) from expenditure"
  }
]
```

---

#### `bar-gen-1054` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - This answer results from incorrectly calculating the average common equity or neglecting to subtract preferred dividends from "
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - Return on common equity (ROCE) measures how effectively a company uses shareholders' investments to generate profit. It's ca"
  }
]
```

---

#### `bar-gen-1062` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Option B is the closest to the correct answer. The probability-weighted NPV considers the likelihood of different scenarios affecting raw material cos"
  }
]
```

---

#### `bar-gen-1085` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=0",
    "text": "This answer doesn't correctly calculate the impact of each option on the cash conversion cycle."
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=0",
    "text": "This answer doesn't correctly calculate the impact of each option on the cash conversion cycle."
  }
]
```

---

#### `bar-gen-1107` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=3",
    "text": "Why option C is CORRECT - While Information and Communication is a component of internal control, the question asks for what is NOT a component. Quali"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"WRONG\" but this is the correct answer",
    "text": "Why option D is WRONG - Quality assurance is related to monitoring activities, but it's not a primary, standalone component of the COSO framework. Mon"
  }
]
```

---

#### `bar-gen-1109` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=2",
    "text": "Option B is correct because the material purchase price variance is $5,000, which equals the dollar threshold. The company's policy is to investigate "
  }
]
```

---

#### `bar-gen-1132` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"WRONG\" but this is the correct answer",
    "text": "Why option B is WRONG - This answer is a result of an incorrect calculation of the weighted average contribution margin or an error in applying the sa"
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=1",
    "text": "Why option C is CORRECT - The break-even point in units for Gizmos is calculated by first finding the weighted average contribution margin based on th"
  }
]
```

---

#### `bar-gen-1149` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is CORRECT - Risk assessment is the process of identifying and analyzing potential obstacles that could prevent an organization from achi"
  }
]
```

---

#### `bar-gen-1175` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Option B is CORRECT. The cash conversion cycle (CCC) measures the time it takes for a company to convert its investments in inventory and accounts rec"
  }
]
```

---

#### `bar-gen-1180` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "This option incorrectly identifies the variance as favorable when it is unfavorable. The calculation is correct, but the sign is wrong."
  }
]
```

---

#### `bar-gen-1205` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Option B is correct because the unfavorable variance of $20,000 exceeds the 5% threshold ($25,000), and the company policy dictates investigation if t"
  }
]
```

---

#### `bar-gen-1219` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"CORRECT\" but correctAnswer=1",
    "text": "Why option A is CORRECT - The times interest earned ratio measures a company's ability to cover its interest expense with its earnings. It's calculate"
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"WRONG\" but this is the correct answer",
    "text": "Why option C is WRONG - This answer likely results from incorrectly calculating EBIT or using an incorrect denominator. Double-check your addition and"
  }
]
```

---

#### `bar-gen-1243` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - This option only considers the impact of the 10% sales deviation on the variable portion of the collections formula (0.8 * Sal"
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option C is CORRECT - This option correctly calculates the high and low sales figures based on the 10% deviation and then applies the regression f"
  }
]
```

---

#### `bar-gen-1268` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"WRONG\" but this is the correct answer",
    "text": "This is wrong because it miscalculates the combined effect of changes in Net Profit Margin and Equity Multiplier on ROE."
  }
]
```

---

#### `bar-gen-1269` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=3",
    "text": "Why option B is CORRECT - The pro forma net income is calculated by combining the individual net incomes, adding synergies (both cost and revenue), an"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"WRONG\" but this is the correct answer",
    "text": "Why option D is WRONG - This answer significantly underestimates the pro forma net income. It likely omits multiple synergy benefits or incorrectly ad"
  }
]
```

---

#### `bar-gen-1270` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=2",
    "text": "Issuing a compilation report without expressing an opinion or assurance is a key characteristic of a compilation engagement, and this statement is cor"
  }
]
```

---

#### `bar-gen-1271` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=3",
    "text": "Option C is CORRECT because the direct labor variance of $3,500, while less than the $5,000 threshold, exceeds the 10% threshold of $4,000 (10% * $40,"
  }
]
```

---

#### `bar-gen-1310` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"WRONG\" but this is the correct answer",
    "text": "Why option B is WRONG - $60 million is an arbitrary number and doesn't relate to the 75% revenue test or the segment revenues provided."
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=1",
    "text": "Why option D is CORRECT - The 75% revenue test requires that the combined revenue of all reportable segments must equal at least 75% of the entire com"
  }
]
```

---

#### `bar-gen-1311` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"WRONG\" but this is the correct answer",
    "text": "Why option B is WRONG - $11 million is not the amount of additional revenue needed to meet the 75% sufficiency test; it's an arbitrary number not deri"
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=1",
    "text": "Why option C is CORRECT - The 75% sufficiency test requires that reportable segments' revenue equals or exceeds 75% of consolidated revenue, which is "
  }
]
```

---

#### `bar-gen-1339` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"WRONG\" but this is the correct answer",
    "text": "USD might be incorrectly chosen as the functional currency. Since the functional currency being tested in the question is ARS, then this answer is wro"
  }
]
```

---

#### `bar-gen-1357` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=0",
    "text": "While accruing a loss is correct, using the midpoint of the range is not appropriate. The actual settlement amount is known and should be used."
  }
]
```

---

#### `bar-gen-1366` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=2",
    "text": "Option B is CORRECT because it accurately reflects the loss recognized in OCI. The increase in the spot rate from $1.08 to $1.12 creates a $40,000 gai"
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"WRONG\" but this is the correct answer",
    "text": "Option D is WRONG because the forward contract is designed to hedge against exchange rate fluctuations, and the change in the spot rate directly impac"
  }
]
```

---

#### `bar-gen-1368` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"CORRECT\" but correctAnswer=2",
    "text": "Option A is CORRECT because it accurately reflects the revenue from all reportable segments ($100M + $80M + $30M = $210M) and correctly places the cum"
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"WRONG\" but this is the correct answer",
    "text": "Option D is WRONG because the revenue disclosure must include all reportable segments, not just North America. A reportable segment is determined by s"
  }
]
```

---

#### `bar-gen-1369` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=0",
    "text": "Technology's revenue of $50 million is exactly 10%, however, the combined revenue of Retail Sales and Financial Services alone already meets the 75% t"
  }
]
```

---

#### `bar-gen-1383` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - $7.5 million is not the correct threshold. The reportable segment threshold is calculated as 10% of the combined revenue of al"
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option C is CORRECT - The revenue threshold for a reportable segment is 10% of the combined revenue of all operating segments. The combined revenu"
  }
]
```

---

#### `bar-gen-1389` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "The equipment is correctly calculated, but Retained earnings are translated at the current rate rather than the weighted average rate."
  }
]
```

---

#### `bar-gen-1421` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - The loan to Alpha Investments also requires disclosure because the interest rate was below market rate, indicating a potential"
  }
]
```

---

#### `bar-gen-1475` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=0",
    "text": "Option D is CORRECT because consolidated operating profit is calculated by summing segment profits/losses and subtracting unallocated corporate overhe"
  }
]
```

---

#### `bar-gen-1483` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=0",
    "text": "The fair value option requires that changes in fair value are reported in current income. A gain of $0 would only be correct if the fair value did not"
  }
]
```

---

#### `bar-gen-1491` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - Beta is reportable, but Alpha also meets the 10% revenue test and is therefore also reportable."
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - A segment is reportable if its revenue is 10% or more of the combined revenue of all operating segments. Alpha and Beta both"
  }
]
```

---

#### `bar-gen-1494` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - This option only considers the incremental adjustment to the lawsuit liability but fails to include the accounts receivable wr"
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - Both the customer's bankruptcy and the lawsuit settlement provide information about conditions that existed at the balance s"
  }
]
```

---

#### `bar-gen-1513` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - While the calculation is correct ($500,000 - $300,000), related party transactions require disclosure, and the gain may not be"
  }
]
```

---

#### `bar-gen-1594` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=2",
    "text": "Why option B is CORRECT - The break-even point for Beta is calculated by first determining the weighted-average contribution margin based on the sales"
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"WRONG\" but this is the correct answer",
    "text": "Why option D is WRONG - This answer is too high. It might arise from incorrectly applying the sales mix or not properly allocating the total break-eve"
  }
]
```

---

#### `bar-gen-1596` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"WRONG\" but this is the correct answer",
    "text": "Why option C is WRONG - This is a significantly incorrect calculation. The sales mix variance is not this large given the provided data and the relati"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=2",
    "text": "Why option D is CORRECT - The sales mix variance measures the impact on profit due to changes in the proportion of products sold. Because the actual s"
  }
]
```

---

#### `bar-9k-002` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Option B is correct as it represents the correct calculation of the present value of all cash flows less the initial investment."
  }
]
```

---

#### `bar-9k-011` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "This option correctly calculates the NPV of the project."
  }
]
```

---

#### `bar-9k-014` (BAR)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=0",
    "text": "This option correctly calculates the forecasted sales."
  }
]
```

---

#### `isc-d2-013` (ISC)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"WRONG\" but this is the correct answer",
    "text": "Why option C is WRONG - Excluding break-glass accounts from password vaulting and rotation defeats a key security aspect of PAM, leaving a critical vu"
  }
]
```

---

#### `isc-wc-117` (ISC)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=2",
    "text": "Why option B is CORRECT - An incremental backup captures all changes made since the *most recent* backup, regardless of whether that backup was full, "
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"WRONG\" but this is the correct answer",
    "text": "Why option D is WRONG - This describes a differential backup, not an incremental backup. Incremental backups are based on the last backup of *any* typ"
  }
]
```

---

#### `isc-gen-1053` (ISC)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "The RTO is correctly calculated, but the data loss is based on the RTO instead of the RPO and the last backup."
  }
]
```

---

#### `isc-gen-1281` (ISC)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - Symmetric encryption requires a secure method for key exchange, which is problematic in this scenario. Distributing keys physi"
  }
]
```

---

#### `tcp-093` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - The 30-day period begins when the substantially non-vested property is *received*, not when the option is granted. The grant d"
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - A §83(b) election allows you to pay taxes on the fair market value of restricted stock or property when you *receive* it, ra"
  }
]
```

---

#### `tcp-145` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"WRONG\" but this is the correct answer",
    "text": "Why option B is CORRECT - SSTS No. 3 allows CPAs to rely on client-provided information unless it seems wrong, incomplete, or doesn't match other info"
  }
]
```

---

#### `tcp-d1-025` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - $400,000 is not a threshold amount for the Net Investment Income Tax (NIIT). It is a common threshold in other tax contexts, w"
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - The modified adjusted gross income (MAGI) threshold for married couples filing jointly for the Net Investment Income Tax (NI"
  }
]
```

---

#### `tcp-d3-006` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - The QBI deduction is not simply 20% of taxable income. It's limited to the lesser of 20% of QBI or 20% of taxable income, and "
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option D is CORRECT - Because the CPA firm is a specified service trade or business (SSTB) and the owner's taxable income is within the phase-out "
  }
]
```

---

#### `tcp-d4-011` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - Suspension from practice before the IRS is a permissible sanction that the Office of Professional Responsibility (OPR) can imp"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option D is CORRECT - Criminal imprisonment is not a sanction imposed by the OPR for Circular 230 violations; criminal prosecution is handled by t"
  }
]
```

---

#### `tcp-wc-060` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=2",
    "text": "Why option B is CORRECT - Corporations generally avoid underpayment penalties by paying the *lesser* of 100% of the current year's tax or 100% of the "
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"WRONG\" but this is the correct answer",
    "text": "Why option D is WRONG - While $800,000 (100% of the prior year) is a valid option, the question asks for the *minimum* payment to avoid penalties. The"
  }
]
```

---

#### `tcp-wc-157` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"WRONG\" but this is the correct answer",
    "text": "Why option B is WRONG - While a CLT does pay income to a charity, the remainder goes to individual beneficiaries, which is the opposite of a charitabl"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=1",
    "text": "Why option D is CORRECT - A charitable lead trust (CLT) is specifically designed to provide a stream of income to a designated charity for a defined p"
  }
]
```

---

#### `tcp-gen-0894` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=1",
    "text": "This option assumes that the entire $20,000 distribution is taxable. This is only correct if the distribution exceeds contributions, which is not the "
  }
]
```

---

#### `tcp-gen-0912` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=0",
    "text": "This option is derived from assuming a corporation had $2,000,000 in taxable income. This is also not the correct calculation to base estimated tax pa"
  }
]
```

---

#### `tcp-gen-0933` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - SubCo is treated as liquidating into ParentCo, not BuyerCo, because it was part of ParentCo's consolidated group before the de"
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option C is CORRECT - A 338(h)(10) election allows the buyer to step up the basis of the acquired company's assets to fair market value. The selli"
  }
]
```

---

#### `tcp-gen-1013` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=3",
    "text": "While the RMD amount is correct, the April 1st deadline only applies to the first RMD year if the individual turned 73 during the prior year. Since Ha"
  }
]
```

---

#### `tcp-gen-1027` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "While the RMD amount is correct, the deadline for the first RMD can be delayed until April 1 of the following year if the individual turned 72 in the "
  }
]
```

---

#### `tcp-gen-1030` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - While Roth IRA earnings grow tax-free, contributions are not deductible in the current year. Also, Roth IRAs are primarily for"
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - A Health Savings Account (HSA) offers a triple tax advantage: contributions are deductible, earnings grow tax-free, and dist"
  }
]
```

---

#### `tcp-gen-1037` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=0",
    "text": "Option C is CORRECT because it accurately calculates the increased Social Security benefit for delaying retirement. Delaying retirement past the full "
  }
]
```

---

#### `tcp-gen-1046` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"CORRECT\" but correctAnswer=3",
    "text": "Why option A is CORRECT - Roth 401(k) accounts are generally subject to RMDs, and the SECURE 2.0 Act changed the age for RMDs. For those born between "
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"WRONG\" but this is the correct answer",
    "text": "Why option D is WRONG - Roth *IRAs* are exempt from RMDs during the owner's lifetime, but Roth 401(k)s are *not* exempt and are subject to RMD rules."
  }
]
```

---

#### `tcp-gen-1068` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=3",
    "text": "Why option B is CORRECT - The maximum charitable deduction is limited to 50% of the donor's AGI. The present value of the remainder interest is calcul"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"WRONG\" but this is the correct answer",
    "text": "Why option D is WRONG - $300,000 represents Dr. Sharma's entire AGI, and the charitable deduction is limited to a percentage of AGI, not the entire am"
  }
]
```

---

#### `tcp-gen-1075` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=0",
    "text": "This option is a rounded number but is not the correct calculation. It is important to use the correct formula for RMD calculation."
  }
]
```

---

#### `tcp-gen-1077` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"WRONG\" but this is the correct answer",
    "text": "Why option C is WRONG - While $3,100 is close, it doesn't account for the rounding rules Social Security uses when calculating benefits. The calculati"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=2",
    "text": "Why option D is CORRECT - Delaying retirement increases benefits by 8% per year for those born after 1942. Delaying for three years results in a 24% i"
  }
]
```

---

#### `tcp-gen-1083` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"CORRECT\" but correctAnswer=3",
    "text": "Option A is CORRECT because donors can deduct cash contributions to a DAF up to 60% of their AGI and contributions of appreciated property (capital ga"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"WRONG\" but this is the correct answer",
    "text": "Why option D is WRONG - Donors relinquish control over assets contributed to a DAF. While they can provide non-binding recommendations, the sponsoring"
  }
]
```

---

#### `tcp-gen-1091` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=3",
    "text": "Why option B is CORRECT - $8,300 is the maximum HSA contribution for family HDHP coverage in 2024. Since Mark wants to maximize his contribution and t"
  },
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"WRONG\" but this is the correct answer",
    "text": "Why option D is WRONG - $7,300 is not the correct HSA contribution limit for either individual or family HDHP coverage in 2024. This number is not rel"
  }
]
```

---

#### `tcp-gen-1104` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Option A is WRONG because it represents the 2024 individual HSA contribution limit, but the question states John has family HDHP coverage, not individ"
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Option B is CORRECT because the 2024 HSA contribution limit for individuals with family HDHP coverage is $8,300. John's HDHP deductible of $3,500 meet"
  }
]
```

---

#### `tcp-gen-1141` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=2",
    "text": "Why option B is CORRECT - The maximum HSA contribution for an individual covered by a high-deductible health plan (HDHP) who is also the *only* person"
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"WRONG\" but this is the correct answer",
    "text": "Why option D is WRONG - $3,850 is not a standard HSA contribution limit for 2024. The individual limit is $4,150 and the family limit is $8,300."
  }
]
```

---

#### `tcp-gen-1152` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"CORRECT\" but correctAnswer=2",
    "text": "Why option A is CORRECT: Modified Adjusted Gross Income (MAGI) for Medicare Part B premium calculations (IRMAA) starts with AGI, adds back tax-exempt "
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"WRONG\" but this is the correct answer",
    "text": "Why option D is WRONG: This answer incorrectly subtracts both the tax-exempt interest and the IRA deduction from the AGI, when only the IRA deduction "
  }
]
```

---

#### `tcp-gen-1166` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"CORRECT\" but correctAnswer=3",
    "text": "While the calculation is correct, the deadline for the first RMD is April 1 of the following year, not December 31 of the current year."
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=3",
    "text": "The deadline is correct, but the RMD calculation is slightly off due to rounding. The calculation is $800,000 / 26.5 = $30,188.68."
  }
]
```

---

#### `tcp-gen-1171` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"WRONG\" but this is the correct answer",
    "text": "Why option D is WRONG - Deferring real estate taxes to 2025 is unlikely to be beneficial. The $10,000 SALT deduction limit still applies, so prepaying"
  }
]
```

---

#### `tcp-gen-1227` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"WRONG\" but this is the correct answer",
    "text": "Why option B is WRONG - Liquidating Beta and re-establishing a new subsidiary might address the economic substance argument, but it doesn't fundamenta"
  },
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=1",
    "text": "Why option C is CORRECT - Merging Alpha into Beta shifts the parent company's domicile to State B, the low-tax jurisdiction. Then, creating a subsidia"
  }
]
```

---

#### `tcp-gen-1321` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "2",
    "issue": "whyWrong[2] says \"CORRECT\" but correctAnswer=0",
    "text": "The amount that should be recharacterized is $70,000 ($150,000 reasonable salary - $80,000 actual salary), not $50,000. This option has the correct ac"
  }
]
```

---

#### `tcp-gen-1333` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - $1,250,000 is not the correct GILTI inclusion before the Section 250 deduction. It incorrectly applies the Section 951A(b)(4) "
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "Why option B is CORRECT - The GILTI inclusion is calculated as tested income less 10% of QBAI. In this case, $2,000,000 (tested income) - (10% * $500,"
  }
]
```

---

#### `tcp-gen-1340` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "3",
    "issue": "whyWrong[3] says \"CORRECT\" but correctAnswer=2",
    "text": "This option uses the fair market value of assets instead of the purchase price, and does not use the correct ADSP formula."
  }
]
```

---

#### `tcp-gen-1364` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG: $840,000 represents the corporate tax liability *before* considering the R&D credit. Estimated tax payments are based on the ta"
  }
]
```

---

#### `tcp-gen-1414` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "Why option A is WRONG - The research credit is not limited by gross receipts for partnerships that are not start-up companies. The calculation is 20% "
  }
]
```

---

#### `tcp-gen-1453` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 2 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "0",
    "issue": "whyWrong[0] says \"WRONG\" but this is the correct answer",
    "text": "A) $12,000 is WRONG because it only considers a portion of the Work Opportunity Tax Credit and ignores the research credit entirely."
  },
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "B) $42,000 is CORRECT because it accurately calculates the Work Opportunity Tax Credit ($7,200) and the limitation on the research credit for small bu"
  }
]
```

---

#### `tcp-gen-1468` (TCP)

- **Category:** whyWrong labeling mismatch
- **Message:** 1 whyWrong entries have incorrect labeling
- **Details:**
```json
[
  {
    "optionKey": "1",
    "issue": "whyWrong[1] says \"CORRECT\" but correctAnswer=0",
    "text": "This option correctly calculates the WOTC but fails to reduce the deductible wage expense."
  }
]
```

---

### MEDIUM Issues (265)

#### `far-d16-011` (FAR)

- **Category:** Numerical answer review
- **Message:** Explanation may reference wrong numerical value before correct value
- **Details:**
```json
{
  "correctNum": "61,111",
  "mentionedNum": "200,000"
}
```

---

#### `far-d20-003` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-d5-024` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-d7-004` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-d7-012` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "0"
  }
]
```

---

#### `far-ext-liab-005` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 1,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-extra2-tax-001` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 1,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-tax-050` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-wc-020` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-wc-021` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-wc-022` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-wc-034` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-wc-036` (FAR)

- **Category:** Numerical answer review
- **Message:** Explanation may reference wrong numerical value before correct value
- **Details:**
```json
{
  "correctNum": "30,000",
  "mentionedNum": "40,000"
}
```

---

#### `far-wc-052` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-wc-086` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-wc-095` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1311` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1321` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1322` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1330` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1335` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1336` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 1,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1340` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1356` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1364` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1366` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1369` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1375` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1377` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1383` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1390` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1395` (FAR)

- **Category:** Numerical answer review
- **Message:** Explanation may reference wrong numerical value before correct value
- **Details:**
```json
{
  "correctNum": "1,155,000",
  "mentionedNum": "755,000"
}
```

---

#### `far-gen-1397` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1399` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1401` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1404` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1410` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1416` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1426` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1436` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1441` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1450` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1456` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1458` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1461` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1472` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1480` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1485` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1488` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-gen-1491` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-9k-002` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `far-9k-001-1` (FAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `aud-ext-risk-001` (AUD)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 1,
    "issue": "Very short option",
    "text": "2%"
  }
]
```

---

#### `aud-gen-1168` (AUD)

- **Category:** Option quality issues
- **Message:** 2 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "61"
  },
  {
    "index": 1,
    "issue": "Very short option",
    "text": "92"
  }
]
```

---

#### `aud-gen-1182` (AUD)

- **Category:** Option quality issues
- **Message:** 4 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "A"
  },
  {
    "index": 1,
    "issue": "Very short option",
    "text": "B"
  },
  {
    "index": 2,
    "issue": "Very short option",
    "text": "C"
  },
  {
    "index": 3,
    "issue": "Very short option",
    "text": "D"
  }
]
```

---

#### `aud-gen-1221` (AUD)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "50"
  }
]
```

---

#### `reg-corp-b6-001` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 1,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-d2-007` (REG)

- **Category:** Option quality issues
- **Message:** 2 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "75"
  },
  {
    "index": 1,
    "issue": "Very short option",
    "text": "50"
  }
]
```

---

#### `reg-d3-024` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "5%"
  }
]
```

---

#### `reg-easy-exp-019` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 1,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-ext-corp-002` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 1,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-ext-corp-005` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gi-002` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gi-005` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gi-007` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gi-008` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gi-009` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 1,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-ind-004` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-ind-005` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-ind-007` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 1,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-ind-010` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "2%"
  }
]
```

---

#### `reg-ind-b3-002` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-intl-b3-001` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-item-005` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-part-b3-003` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-prop-006` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 1,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-prop-b3-001` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 1,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-prop-ext-001` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-prop-ext-003` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-qbi-001` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-wc-013` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 1,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-wc-037` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "0%"
  }
]
```

---

#### `reg-wc-051` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-wc-052` (REG)

- **Category:** Numerical answer review
- **Message:** Explanation may reference wrong numerical value before correct value
- **Details:**
```json
{
  "correctNum": "40,000",
  "mentionedNum": "30,000"
}
```

---

#### `reg-wc-059` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-wc-063` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-wc-066` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-wc-071` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-wc-083` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-wc-091` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "0%"
  }
]
```

---

#### `reg-wc-131` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-wc-196` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-wc-196` (REG)

- **Category:** Numerical answer review
- **Message:** Explanation may reference wrong numerical value before correct value
- **Details:**
```json
{
  "correctNum": "2,000",
  "mentionedNum": "15,000"
}
```

---

#### `reg-gen-0971` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-0976` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-0978` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-0980` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-0981` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-0987` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-0992` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-0996` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-0997` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1005` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1007` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1011` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1013` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1017` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1021` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1022` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1028` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1032` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1034` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1036` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 1,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1037` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1044` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1053` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1056` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 1,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1059` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1067` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1069` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1072` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1091` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1092` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1099` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1104` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1106` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1109` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1117` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1122` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1124` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1148` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1171` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1185` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1187` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1189` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1200` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1203` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1206` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1214` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1220` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1227` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1228` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1246` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1254` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1273` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1274` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1276` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1277` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1278` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1279` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1284` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1288` (REG)

- **Category:** Numerical answer review
- **Message:** Explanation may reference wrong numerical value before correct value
- **Details:**
```json
{
  "correctNum": "69,200",
  "mentionedNum": "60,000"
}
```

---

#### `reg-gen-1289` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1295` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1297` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1305` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1313` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1322` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1325` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1325` (REG)

- **Category:** Numerical answer review
- **Message:** Explanation may reference wrong numerical value before correct value
- **Details:**
```json
{
  "correctNum": "33,640",
  "mentionedNum": "133,520"
}
```

---

#### `reg-gen-1330` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1339` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1342` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1345` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1348` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1350` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1351` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1357` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1358` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1358` (REG)

- **Category:** Numerical answer review
- **Message:** Explanation may reference wrong numerical value before correct value
- **Details:**
```json
{
  "correctNum": "0",
  "mentionedNum": "36,000"
}
```

---

#### `reg-gen-1361` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1363` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1367` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1372` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1387` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1418` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-gen-1428` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-9k-001` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-9k-002` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-9k-004` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-9k-006` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-9k-010` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `reg-9k-011` (REG)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `bar-tech-b3-001` (BAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `bar-tech-b3-003` (BAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `bar-wc-013` (BAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `bar-wc-034` (BAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 1,
    "issue": "Very short option",
    "text": "5%"
  }
]
```

---

#### `bar-wc-053` (BAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 1,
    "issue": "Very short option",
    "text": "9%"
  }
]
```

---

#### `bar-wc-065` (BAR)

- **Category:** Option quality issues
- **Message:** 2 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "9%"
  },
  {
    "index": 1,
    "issue": "Very short option",
    "text": "6%"
  }
]
```

---

#### `bar-wc-074` (BAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `bar-wc-249` (BAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `bar-gen-1004` (BAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `bar-gen-1017` (BAR)

- **Category:** Option quality issues
- **Message:** 4 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "2"
  },
  {
    "index": 1,
    "issue": "Very short option",
    "text": "3"
  },
  {
    "index": 2,
    "issue": "Very short option",
    "text": "4"
  },
  {
    "index": 3,
    "issue": "Very short option",
    "text": "5"
  }
]
```

---

#### `bar-gen-1022` (BAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `bar-gen-1039` (BAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 1,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `bar-gen-1279` (BAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `bar-gen-1286` (BAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `bar-gen-1312` (BAR)

- **Category:** Option quality issues
- **Message:** 4 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "A"
  },
  {
    "index": 1,
    "issue": "Very short option",
    "text": "B"
  },
  {
    "index": 2,
    "issue": "Very short option",
    "text": "C"
  },
  {
    "index": 3,
    "issue": "Very short option",
    "text": "D"
  }
]
```

---

#### `bar-gen-1355` (BAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `bar-gen-1366` (BAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `bar-gen-1524` (BAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 1,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `bar-9k-001` (BAR)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-088` (TCP)

- **Category:** Option quality issues
- **Message:** 3 options have quality issues
- **Details:**
```json
[
  {
    "index": 1,
    "issue": "Very short option",
    "text": "73"
  },
  {
    "index": 2,
    "issue": "Very short option",
    "text": "75"
  },
  {
    "index": 3,
    "issue": "Very short option",
    "text": "72"
  }
]
```

---

#### `tcp-d1-016` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-d2-002` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-d4-016` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 1,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-easy-exp-015` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "0%"
  }
]
```

---

#### `tcp-easy-sp-010` (TCP)

- **Category:** Option quality issues
- **Message:** 2 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "75"
  },
  {
    "index": 3,
    "issue": "Very short option",
    "text": "35"
  }
]
```

---

#### `tcp-ent-004` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-ext-007` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 1,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-ext-008` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-ext-013` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-ext-019` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-ext-027` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-ext-030` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-pship-003` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-ret-002` (TCP)

- **Category:** Option quality issues
- **Message:** 3 options have quality issues
- **Details:**
```json
[
  {
    "index": 1,
    "issue": "Very short option",
    "text": "75"
  },
  {
    "index": 2,
    "issue": "Very short option",
    "text": "72"
  },
  {
    "index": 3,
    "issue": "Very short option",
    "text": "73"
  }
]
```

---

#### `tcp-wc-006` (TCP)

- **Category:** Option quality issues
- **Message:** 3 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "75"
  },
  {
    "index": 2,
    "issue": "Very short option",
    "text": "73"
  },
  {
    "index": 3,
    "issue": "Very short option",
    "text": "72"
  }
]
```

---

#### `tcp-wc-053` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-wc-054` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-wc-061` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-wc-062` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 1,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-0888` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-0889` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-0894` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-0900` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-0909` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "0%"
  }
]
```

---

#### `tcp-gen-0913` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-0958` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-0961` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-0966` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-0973` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-0976` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-0979` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-0984` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-0988` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-0989` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-1002` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-1009` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-1012` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-1024` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-1026` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-1032` (TCP)

- **Category:** Option quality issues
- **Message:** 3 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "5%"
  },
  {
    "index": 1,
    "issue": "Very short option",
    "text": "6%"
  },
  {
    "index": 2,
    "issue": "Very short option",
    "text": "8%"
  }
]
```

---

#### `tcp-gen-1035` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "8%"
  }
]
```

---

#### `tcp-gen-1047` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-1096` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "8%"
  }
]
```

---

#### `tcp-gen-1120` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-1129` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-1138` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "0"
  }
]
```

---

#### `tcp-gen-1174` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-1228` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-1274` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-1276` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-1294` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-1344` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-1349` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-1392` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-1407` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-1409` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 1,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-1447` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 2,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-1455` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-gen-1480` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 3,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-9k-001` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-9k-006` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

#### `tcp-9k-011` (TCP)

- **Category:** Option quality issues
- **Message:** 1 options have quality issues
- **Details:**
```json
[
  {
    "index": 0,
    "issue": "Very short option",
    "text": "$0"
  }
]
```

---

### INFO Issues (4)

#### `far-d11-025` (FAR)

- **Category:** Accounting pattern check
- **Message:** Potential accounting pattern inconsistency detected
- **Details:**
```json
[
  {
    "pattern": "Asset question with Liability answer - verify correctness"
  }
]
```

---

#### `far-d15-018` (FAR)

- **Category:** Accounting pattern check
- **Message:** Potential accounting pattern inconsistency detected
- **Details:**
```json
[
  {
    "pattern": "Asset question with Liability answer - verify correctness"
  }
]
```

---

#### `aud-exp-026` (AUD)

- **Category:** Accounting pattern check
- **Message:** Potential accounting pattern inconsistency detected
- **Details:**
```json
[
  {
    "pattern": "Increase question with Decrease answer - verify correctness"
  }
]
```

---

#### `bar-gen-1053` (BAR)

- **Category:** Accounting pattern check
- **Message:** Potential accounting pattern inconsistency detected
- **Details:**
```json
[
  {
    "pattern": "Increase question with Decrease answer - verify correctness"
  }
]
```

---

