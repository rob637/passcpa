# CPA Question Accuracy Issues Log

**Generated:** 2026-03-02

**Total Questions with Accuracy Issues:** 116

## Summary by Section

| Section | Questions with Issues |
|---------|----------------------|
| AUD | 7 |
| BAR | 31 |
| FAR | 18 |
| ISC | 3 |
| REG | 34 |
| TCP | 23 |

---

## Issue Types

1. **MARKED_CORRECT_BUT_WRONG**: The `whyWrong` field says an option "is correct" but it's NOT the `correctAnswer`
2. **MARKED_WRONG_BUT_CORRECT**: The `whyWrong` field says the `correctAnswer` option "is wrong"

These issues will confuse students because the explanations contradict the marked correct answer.

---

## Detailed Issue Log


## AUD (7 issues)

### `aud-ext-rep-005`

**Topic:** Going concern evaluation / Going Concern
**Blueprint Area:** AUD-III

**Question:**
> When substantial doubt about going concern exists and management's plans adequately mitigate the doubt:

**Options:**
-   **A:** No modification to the report is necessary
-   **B:** A qualified opinion is required, disclosing the uncertainty in an emphasis-of-matter paragraph.
-   **C:** An adverse opinion is required, due to the going concern issue, even with management's mitigation plans.
- ✓ **D:** Emphasis of Matter paragraph is required

**Marked Correct Answer:** D (index 3)

**Explanation:**
> When substantial doubt about going concern exists but management's plans adequately alleviate that doubt, the auditor issues an unmodified (unqualified) opinion with an explanatory paragraph (Emphasis of Matter) highlighting the going concern matter. A qualified opinion is not appropriate when doubt has been adequately mitigated.

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is CORRECT, but the correctAnswer is D:
> Why option A is CORRECT - If management's plans are deemed adequate to alleviate the substantial doubt about the entity's ability to continue as a going concern, the auditor concludes that no substantial doubt remains, and therefore no modification to the audit report is necessary.

⚠️ **whyWrong[3] (Option D)** says this is WRONG, but it IS the correct answer:
> Why option D is WRONG - An Emphasis-of-Matter (EOM) paragraph is used to highlight a matter appropriately presented or disclosed in the financial statements that is fundamental to users' understanding. If management's plans adequately mitigate the going concern doubt, there is no longer a going concern issue to highlight, and an EOM paragraph is not required.

**whyWrong (Full):**
```json
{
  "0": "Why option A is CORRECT - If management's plans are deemed adequate to alleviate the substantial doubt about the entity's ability to continue as a going concern, the auditor concludes that no substantial doubt remains, and therefore no modification to the audit report is necessary.",
  "1": "Why option B is WRONG - A qualified opinion is only required when the auditor has a material misstatement that is not pervasive, or a material scope limitation. If management's plans adequately mitigate the doubt, no modification is necessary.",
  "2": "Why option C is WRONG - An adverse opinion is only appropriate when the financial statements are so materially misstated that they are pervasively misleading. Adequate mitigation plans mean the going concern issue does not warrant an adverse opinion.",
  "3": "Why option D is WRONG - An Emphasis-of-Matter (EOM) paragraph is used to highlight a matter appropriately presented or disclosed in the financial statements that is fundamental to users' understanding. If management's plans adequately mitigate the going concern doubt, there is no longer a going concern issue to highlight, and an EOM paragraph is not required."
}
```

---

### `aud-gap-vii-012`

**Topic:** Required communications / Documentation Retention
**Blueprint Area:** AUD-I

**Question:**
> Under auditing standards, the minimum retention period for audit documentation after the report release date is:

**Options:**
-   **A:** 10 years
-   **B:** 3 years
- ✓ **C:** 5 years
-   **D:** 7 years

**Marked Correct Answer:** C (index 2)

**Explanation:**
> Under AU-C 230 (GAAS auditing standards for non-issuers), the auditor should retain audit documentation for a minimum of five years from the report release date. For SEC/PCAOB audits of issuers, the retention period is seven years under AS 1215.

**Problems Found:**

⚠️ **whyWrong[2] (Option C)** says this is WRONG, but it IS the correct answer:
> Why option C is WRONG - While a 5-year retention period was previously required under GAAS, current standards require a longer retention period.

⚠️ **whyWrong[3] (Option D)** says this is CORRECT, but the correctAnswer is C:
> Why option D is CORRECT - PCAOB standards require audit documentation to be retained for seven years from the report release date, and this is the minimum retention period required by auditing standards.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - While some regulations require long retention periods for certain documents, auditing standards do not mandate a minimum 10-year retention for all audit documentation.",
  "1": "Why option B is WRONG - A 3-year retention period is insufficient under both generally accepted auditing standards (GAAS) and Public Company Accounting Oversight Board (PCAOB) standards.",
  "2": "Why option C is WRONG - While a 5-year retention period was previously required under GAAS, current standards require a longer retention period.",
  "3": "Why option D is CORRECT - PCAOB standards require audit documentation to be retained for seven years from the report release date, and this is the minimum retention period required by auditing standards."
}
```

---

### `aud-wc-211`

**Topic:** Internal auditors / Type 1 vs Type 2 Reports
**Blueprint Area:** AUD-III

**Question:**
> A user auditor is auditing a company that uses a third-party payroll processor. The auditor obtains a SOC 1 Type 1 report dated September 30 covering payroll processing controls. The fiscal year-end is December 31. Which statement is correct?

**Options:**
-   **A:** The Type 1 report provides sufficient evidence about operating effectiveness throughout the year
-   **B:** No additional procedures are needed since the report covers payroll processing controls
-   **C:** The Type 1 report is inadequate; only a Type 2 report with testing of operating effectiveness is useful
- ✓ **D:** The auditor must perform additional procedures to address the gap between September 30 and December 31

**Marked Correct Answer:** D (index 3)

**Explanation:**
> A Type 1 SOC 1 report only provides assurance about the design of controls at a specific point in time. It does not provide evidence about the operating effectiveness of those controls throughout a period. Since the report is dated September 30 and the fiscal year-end is December 31, the auditor must perform additional procedures to obtain sufficient appropriate audit evidence for the period from September 30 to December 31.

[ID=aud-gen-1040]

**Problems Found:**

⚠️ **whyWrong[2] (Option C)** says this is CORRECT, but the correctAnswer is D:
> Why option C is CORRECT - A Type 1 SOC report only assesses the design of controls at a specific point in time. To rely on the service organization's controls, the user auditor needs a Type 2 report, which includes the service auditor's testing of the operating effectiveness of those controls over a period of time.

⚠️ **whyWrong[3] (Option D)** says this is WRONG, but it IS the correct answer:
> Why option D is WRONG - While additional procedures are needed, the fundamental problem is the *type* of report. Performing procedures to bridge the gap doesn't address the lack of testing of operating effectiveness inherent in a Type 1 report.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - A Type 1 report only assesses the design of controls at a specific point in time and provides no evidence about their operating effectiveness throughout the year.",
  "1": "Why option B is WRONG - The Type 1 report, by itself, is insufficient to conclude on the operating effectiveness of the service organization's controls; therefore, additional procedures are needed.",
  "2": "Why option C is CORRECT - A Type 1 SOC report only assesses the design of controls at a specific point in time. To rely on the service organization's controls, the user auditor needs a Type 2 report, which includes the service auditor's testing of the operating effectiveness of those controls over a period of time.",
  "3": "Why option D is WRONG - While additional procedures are needed, the fundamental problem is the *type* of report. Performing procedures to bridge the gap doesn't address the lack of testing of operating effectiveness inherent in a Type 1 report."
}
```

---

### `aud-gen-1041`

**Topic:** Materiality determination / Applying materiality to specific accounts
**Blueprint Area:** AUD-II

**Question:**
> During the planning phase of an audit, an auditor is determining materiality for a small manufacturing company. The auditor believes that profit before tax is a key benchmark, but the company had a small loss last year. Which of the following is the MOST appropriate next step for the auditor to take in determining materiality?

**Options:**
- ✓ **A:** Use revenue as a benchmark instead of profit before tax, applying a lower percentage.
-   **B:** Set materiality at 10% of the absolute value of the loss before tax, justifying it in the audit file.
-   **C:** Use the average profit before tax over the last three years, if profitable.
-   **D:** Arbitrarily set a low materiality threshold due to the loss, ensuring no fraud could go undetected.

**Marked Correct Answer:** A (index 0)

**Explanation:**
> When profit before tax is not a useful benchmark (such as when there is a loss), auditors should use an alternative benchmark. Revenue is a common alternative, applying a lower percentage (typically 0.5% to 1%) compared to the 5% commonly used for profit. Total assets or a normalized/average income over multiple years are also acceptable alternatives.

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - While revenue can be used, it's less directly related to profitability for a manufacturing company and may result in an inappropriately high materiality threshold. Using an average profit figure is generally preferred when current profit is unreliable.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - While revenue can be used, it's less directly related to profitability for a manufacturing company and may result in an inappropriately high materiality threshold. Using an average profit figure is generally preferred when current profit is unreliable.",
  "1": "Why option B is WRONG - Materiality cannot be based on a loss. While documenting the rationale is good practice, applying a percentage to a loss is not a valid method for determining materiality.",
  "3": "Why option D is WRONG - While caution is warranted, arbitrarily setting a low threshold can lead to excessive and unnecessary testing. Materiality should be based on a reasonable benchmark, even if adjustments are needed."
}
```

---

### `aud-gen-1093`

**Topic:** Independence requirements / Direct and Material Indirect Financial Interests
**Blueprint Area:** AUD-I

**Question:**
> Sarah is a staff accountant at Miller & Zois, CPA, and is assigned to the audit of ABC Corp. Sarah's father maintains a brokerage account that includes 500 shares of ABC Corp. stock. These shares represent less than 1% of the outstanding shares of ABC Corp. and the account is managed by an independent broker. Sarah is unaware of which stocks are held in her father's account. According to the AICPA Code of Professional Conduct, is Sarah’s independence impaired?

**Options:**
- ✓ **A:** No, because Sarah's lack of awareness of her father's investment eliminates any potential influence or bias in her audit work on ABC Corp.
-   **B:** Yes, because under the AICPA's ethical standards, any stock ownership by an immediate family member constitutes a direct financial interest, regardless of materiality.
-   **C:** No, because the shares are managed by an independent broker in a brokerage account, effectively creating a blind trust that eliminates Sarah's influence.
-   **D:** Yes, because Sarah's father's investment represents a material indirect financial interest in ABC Corp.

**Marked Correct Answer:** A (index 0)

**Explanation:**
> Under AICPA independence rules, a parent (close relative) is not the same as immediate family (spouse, dependent). For close relatives, the financial interest only impairs independence if: (1) the CPA is aware of the interest, AND (2) the interest is material to the close relative OR could influence the CPA. Since Sarah is unaware of her father's investment and it represents less than 1% of ABC Corp., independence is not impaired.

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - While lack of awareness can sometimes mitigate independence issues, the father's investment still creates an indirect financial interest that impairs independence, regardless of Sarah's knowledge.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - While lack of awareness can sometimes mitigate independence issues, the father's investment still creates an indirect financial interest that impairs independence, regardless of Sarah's knowledge.",
  "1": "Why option B is WRONG - The father's investment is an *indirect* financial interest because Sarah does not directly own the shares. Direct financial interests typically involve ownership by the covered member themselves.",
  "2": "Why option C is WRONG - A brokerage account managed by an independent broker is not the same as a blind trust. A blind trust requires a formal legal arrangement where the beneficiary has no knowledge or control over the assets."
}
```

---

### `aud-gen-1393`

**Topic:** Materiality determination / Materiality
**Blueprint Area:** AUD-II

**Question:**
> You are auditing Johnson Manufacturing, a publicly traded company. Preliminary net income before tax is $5,000,000 and total revenue is $50,000,000. Using a range of 0.5% - 1% of total revenue, and 5% - 10% of net income before tax, what is the range of preliminary materiality you should consider when planning the audit?

**Options:**
- ✓ **A:** $250,000 - $500,000
-   **B:** $250,000 - $750,000
-   **C:** $500,000 - $1,000,000
-   **D:** $750,000 - $1,250,000

**Marked Correct Answer:** A (index 0)

**Explanation:**
> Revenue benchmark: $50,000,000 × 0.5% = $250,000 (low); $50,000,000 × 1% = $500,000 (high). Net income benchmark: $5,000,000 × 5% = $250,000 (low); $5,000,000 × 10% = $500,000 (high). Both approaches yield the same range of $250,000 to $500,000, which represents the preliminary materiality range for planning purposes.

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - This range only considers the lower end of both the revenue and net income calculations, failing to account for the auditor's need to consider a range of materiality based on different benchmarks.

⚠️ **whyWrong[2] (Option C)** says this is CORRECT, but the correctAnswer is A:
> Why option C is CORRECT - Preliminary materiality is determined by applying percentage ranges to relevant benchmarks like revenue and net income, then considering the higher end of each resulting range and qualitative factors to arrive at a reasonable overall materiality range. In this case, the higher end of both revenue and net income calculations is $500,000, and considering qualitative factors, the auditor would likely increase the top end of the range to $1,000,000.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This range only considers the lower end of both the revenue and net income calculations, failing to account for the auditor's need to consider a range of materiality based on different benchmarks.",
  "1": "Why option B is WRONG - This range incorrectly combines the lower end of the revenue calculation with a value that is not directly derived from the net income calculation, leading to an inaccurate materiality range.",
  "2": "Why option C is CORRECT - Preliminary materiality is determined by applying percentage ranges to relevant benchmarks like revenue and net income, then considering the higher end of each resulting range and qualitative factors to arrive at a reasonable overall materiality range. In this case, the higher end of both revenue and net income calculations is $500,000, and considering qualitative factors, the auditor would likely increase the top end of the range to $1,000,000.",
  "3": "Why option D is WRONG - This range is too high, as it exceeds the maximum materiality suggested by the initial calculations based on revenue and net income, and doesn't appropriately consider the need for a conservative approach in setting materiality."
}
```

---

### `aud-gen-1449`

**Topic:** Independence requirements / Bookkeeping services
**Blueprint Area:** AUD-I

**Question:**
> ABC CPA firm provides audit services to XYZ Corp, a private company. In addition to the audit, ABC also provides bookkeeping services to XYZ, including preparing XYZ's monthly bank reconciliations and maintaining the general ledger. XYZ's CFO, while experienced, lacks in-depth knowledge of GAAP. Which of the following statements is most accurate regarding ABC CPA firm's independence with respect to XYZ Corp?

**Options:**
-   **A:** ABC's independence is impaired under SEC rules because performing bookkeeping services, even routine tasks like bank reconciliations, for an audit client creates a self-review threat that cannot be mitigated.
-   **B:** ABC's independence is not impaired, provided that XYZ's management takes full responsibility for the financial statements and ABC does not assume the role of management.
-   **C:** ABC's independence is not impaired, according to AICPA guidelines, as long as the bookkeeping fees are reasonable in relation to the audit fees and the client has designated a competent employee to oversee the bookkeeping services.
- ✓ **D:** ABC's independence is impaired if ABC personnel make decisions regarding the classification or recording of transactions, effectively acting as management, even if XYZ's CFO reviews and approves the entries.

**Marked Correct Answer:** D (index 3)

**Explanation:**
> Independence is impaired when the accounting firm makes decisions that are the responsibility of management. Even with management oversight, if ABC personnel are making decisions regarding the classification or recording of transactions, they are effectively acting as management, which impairs independence.

[ID=aud-9k-008]

**Problems Found:**

⚠️ **whyWrong[3] (Option D)** says this is WRONG, but it IS the correct answer:
> Why option D is WRONG - The impairment arises from performing management functions, not simply preparing source documents. Review and approval by the CFO is not sufficient if ABC is making the initial accounting decisions.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - While performing bookkeeping services can impair independence, it's not a *per se* prohibition under all circumstances, especially for private companies under AICPA rules. The SEC has stricter rules than the AICPA.",
  "2": "Why option C is WRONG - The percentage of bookkeeping fees relative to audit fees is not a determining factor in assessing independence. The key factor is whether management takes responsibility and the auditor doesn't act as management.",
  "3": "Why option D is WRONG - The impairment arises from performing management functions, not simply preparing source documents. Review and approval by the CFO is not sufficient if ABC is making the initial accounting decisions."
}
```

---


## BAR (31 issues)

### `bar-cost-b3-004`

**Topic:** Cost-volume-profit analysis / Process Costing
**Blueprint Area:** BAR-IV

**Question:**
> Using FIFO, beginning WIP is 1,000 units (60% complete), 5,000 units started, and 4,500 units completed. Ending WIP is 40% complete. What are the equivalent units for conversion (FIFO)?

**Options:**
-   **A:** 4,400
-   **B:** 5,000
-   **C:** 4,100
- ✓ **D:** 4,500

**Marked Correct Answer:** D (index 3)

**Explanation:**
> Under FIFO, equivalent units are calculated as: Work to complete beginning WIP + Units started and completed + Work on ending WIP. Beginning WIP needs 40% more work (1,000 × 40% = 400). Started and completed = 4,500 - 1,000 = 3,500 units (100% complete). Ending WIP = 6,000 - 4,500 = 1,500 units × 40% = 600 EU. Total EU = 400 + 3,500 + 600 = 4,500.

**Problems Found:**

⚠️ **whyWrong[2] (Option C)** says this is CORRECT, but the correctAnswer is D:
> Why option C is CORRECT - Under FIFO, equivalent units are calculated as: (Work to complete beginning WIP) + (Units started and completed) + (Work on ending WIP). This translates to (1,000 * 40%) + (4,500 - 1,000) + (1,500 * 40%) = 400 + 3,500 + 600 = 4,500. The question is flawed, but the closest answer is 4,100.

⚠️ **whyWrong[3] (Option D)** says this is WRONG, but it IS the correct answer:
> Why option D is WRONG - This answer represents the total units completed, but it doesn't isolate the work done in the current period, which is crucial under the FIFO method. It neglects the percentage of completion for beginning and ending WIP.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This answer doesn't correctly account for the work done on beginning WIP and ending WIP under the FIFO method; it likely miscalculates the percentage of completion or omits a step.",
  "1": "Why option B is WRONG - This answer likely represents the total units started during the period, but it fails to consider the percentage of completion for beginning and ending work-in-process inventories under the FIFO method.",
  "2": "Why option C is CORRECT - Under FIFO, equivalent units are calculated as: (Work to complete beginning WIP) + (Units started and completed) + (Work on ending WIP). This translates to (1,000 * 40%) + (4,500 - 1,000) + (1,500 * 40%) = 400 + 3,500 + 600 = 4,500. The question is flawed, but the closest answer is 4,100.",
  "3": "Why option D is WRONG - This answer represents the total units completed, but it doesn't isolate the work done in the current period, which is crucial under the FIFO method. It neglects the percentage of completion for beginning and ending WIP."
}
```

---

### `bar-d4-011`

**Topic:** Ratio analysis / Earnings Quality
**Blueprint Area:** BAR-IV

**Question:**
> Analysts are reviewing Everbright Inc.'s financial statements. High-quality earnings are characterized by all of the following EXCEPT:

**Options:**
- ✓ **A:** Cash flows from operations that are close to net income (high accrual quality), achieved through aggressive revenue recognition.
-   **B:** Conservative accounting policies and transparent disclosures, even when industry peers utilize more liberal methods.
-   **C:** Sustainable and recurring revenue sources derived solely from a single major customer with a long-term contract.
-   **D:** Heavy reliance on one-time gains, aggressive accounting estimates, and frequent restructuring charges

**Marked Correct Answer:** A (index 0)

**Explanation:**
> High-quality earnings are characterized by sustainable cash flows, conservative accounting policies, and transparent disclosures. Aggressive revenue recognition lowers earnings quality because it can inflate current earnings at the expense of future periods and may not accurately reflect the underlying economic reality of the business.

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - High accrual quality *does* indicate high-quality earnings, but aggressive revenue recognition would *lower* accrual quality and therefore indicate *lower* quality earnings.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - High accrual quality *does* indicate high-quality earnings, but aggressive revenue recognition would *lower* accrual quality and therefore indicate *lower* quality earnings.",
  "1": "Why option B is WRONG - While conservative accounting is generally desirable, the question asks for characteristics of *low* quality earnings. High-quality earnings are not necessarily tied to being the *most* conservative compared to peers.",
  "2": "Why option C is WRONG - While sustainable and recurring revenue is generally good, dependence on a single major customer creates significant risk and does not guarantee high-quality earnings.",
  "3": "Heavy reliance on one-time gains, aggressive accounting estimates, and frequent restructuring charges are all characteristics of *low*-quality earnings. These practices can artificially inflate earnings in the short term but are not sustainable and often mask underlying financial problems."
}
```

---

### `bar-fm-001`

**Topic:** Ratio analysis / Cash Conversion Cycle
**Blueprint Area:** BAR-IV

**Question:**
> A company has: Inventory Turnover = 8x, Receivables Turnover = 12x, Payables Turnover = 10x. What is the cash conversion cycle (in days)?

**Options:**
- ✓ **A:** 39.38 days
-   **B:** 40.62 days
-   **C:** 15.75 days
-   **D:** 45.00 days

**Marked Correct Answer:** A (index 0)

**Explanation:**
> Cash Conversion Cycle = Days Inventory + Days Receivables - Days Payables = (365/Inventory Turnover) + (365/Receivables Turnover) - (365/Payables Turnover) = (365/8) + (365/12) - (365/10) = 45.625 + 30.4167 - 36.5 = 39.5417 days. This is approximately 39.38 days.

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - This answer is close, likely resulting from a minor calculation error in the days sales in inventory, days sales outstanding, or days payable outstanding calculations.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - The cash conversion cycle (CCC) measures the time it takes for a company to convert its investments in inventory and other resources into cash flows from sales. It's calculated as Days Inventory Outstanding + Days Sales Outstanding - Days Payable Outstanding = (365/8) + (365/12) - (365/10) = 45.63 + 30.42 - 36.50 = 39.55 ≈ 40.62 days.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This answer is close, likely resulting from a minor calculation error in the days sales in inventory, days sales outstanding, or days payable outstanding calculations.",
  "1": "Why option B is CORRECT - The cash conversion cycle (CCC) measures the time it takes for a company to convert its investments in inventory and other resources into cash flows from sales. It's calculated as Days Inventory Outstanding + Days Sales Outstanding - Days Payable Outstanding = (365/8) + (365/12) - (365/10) = 45.63 + 30.42 - 36.50 = 39.55 ≈ 40.62 days.",
  "2": "Why option C is WRONG - This answer is significantly lower than the correct calculation, indicating a misunderstanding of the formula or a major error in calculating the individual components of the cash conversion cycle.",
  "3": "Why option D is WRONG - This answer is higher than the correct calculation, suggesting an error in either the addition of days inventory and receivables or the subtraction of days payables."
}
```

---

### `bar-wc-009`

**Topic:** Cost-volume-profit analysis / Make or Buy
**Blueprint Area:** BAR-IV

**Question:**
> Currently making 10,000 units with: DM $15, DL $10, Variable OH $5, Fixed OH $8 (30% avoidable). Buy price $32. What is the cost advantage of making?

**Options:**
-   **A:** $36,000 advantage of making
-   **B:** $44,000 advantage of making
- ✓ **C:** $20,000 advantage of buying
-   **D:** No difference

**Marked Correct Answer:** C (index 2)

**Explanation:**
> Relevant costs to make = DM ($15) + DL ($10) + Variable OH ($5) + Avoidable fixed OH ($8 * 30%) = $15 + $10 + $5 + $2.40 = $32.40 per unit. Cost to buy = $32 per unit. At 10,000 units: Cost to make = $32.40 * 10,000 = $324,000; Cost to buy = $32 * 10,000 = $320,000. Therefore, it is $4,000 cheaper to buy, which is not an option. If we assume that the fixed overhead is irrelevant, then the cost to make is $15 + $10 + $5 = $30 per unit. At 10,000 units: Cost to make = $30 * 10,000 = $300,000; Cost to buy = $32 * 10,000 = $320,000. Therefore, it is $20,000 cheaper to make. However, the question asks for the cost advantage of making, and the correct answer is $20,000 advantage of buying if we consider the avoidable fixed costs.

**Problems Found:**

⚠️ **whyWrong[2] (Option C)** says this is WRONG, but it IS the correct answer:
> Option C is wrong because the calculation shows that buying is only slightly cheaper, but the question implies that making is cheaper when only variable costs are considered.

**whyWrong (Full):**
```json
{
  "0": "The advantage of making is determined by comparing the relevant costs of making versus buying. The relevant costs to make are DM ($15), DL ($10), Variable OH ($5), and Avoidable Fixed OH ($2.40), totaling $32.40 per unit. Buying costs $32 per unit, making it $0.40 cheaper to buy. At 10,000 units, this results in a $4,000 advantage of buying. However, the question seems to be testing the concept of avoidable costs, and the answer suggests that only variable costs are relevant, giving Make = $30/unit vs Buy = $32/unit, creating a $20,000 advantage of making at 10,000 units. The question is flawed and the best answer is A, assuming only variable costs are relevant.",
  "1": "Option B is wrong because it incorrectly calculates the cost advantage, likely by including irrelevant fixed costs or miscalculating the avoidable fixed costs.",
  "2": "Option C is wrong because the calculation shows that buying is only slightly cheaper, but the question implies that making is cheaper when only variable costs are considered.",
  "3": "Option D is wrong because there is a cost difference between making and buying, even if it's small when considering all relevant costs."
}
```

---

### `bar-wc-037`

**Topic:** Variance analysis / Equivalent Units
**Blueprint Area:** BAR-IV

**Question:**
> Beginning WIP: 10,000 units (40% complete). Started: 50,000 units. Completed and transferred: 45,000 units. Ending WIP: 15,000 units (60% complete). What are equivalent units for conversion using FIFO?

**Options:**
- ✓ **A:** 51,000
-   **B:** 45,000
-   **C:** 44,000
-   **D:** 60,000

**Marked Correct Answer:** A (index 0)

**Explanation:**
> FIFO equivalent units calculation: (1) Complete beginning WIP: 10,000 × (100% - 40%) = 6,000 units. (2) Started and completed: 45,000 - 10,000 = 35,000 units. (3) Ending WIP: 15,000 × 60% = 9,000 units. Total EU = 6,000 + 35,000 + 9,000 = 50,000 units.

```
```
[ID=bar-wc-038]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - This answer incorrectly adds the beginning WIP units to the started and completed units, and uses the wrong percentage for ending WIP. FIFO focuses on work done *this* period, not cumulative work.

⚠️ **whyWrong[2] (Option C)** says this is CORRECT, but the correctAnswer is A:
> Why option C is CORRECT - FIFO calculates equivalent units by summing the work to complete beginning WIP (6,000), the units started and completed (35,000), and the work done on ending WIP (3,000), totaling 44,000 equivalent units. FIFO method isolates and measures the effort expended solely within the current accounting period.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This answer incorrectly adds the beginning WIP units to the started and completed units, and uses the wrong percentage for ending WIP. FIFO focuses on work done *this* period, not cumulative work.",
  "1": "Why option B is WRONG - This answer only considers the units completed and transferred out, neglecting the additional work needed to finish beginning WIP and the work done on ending WIP.",
  "2": "Why option C is CORRECT - FIFO calculates equivalent units by summing the work to complete beginning WIP (6,000), the units started and completed (35,000), and the work done on ending WIP (3,000), totaling 44,000 equivalent units. FIFO method isolates and measures the effort expended solely within the current accounting period.",
  "3": "Why option D is WRONG - This answer incorrectly calculates equivalent units, likely by adding all units together and misapplying the percentage of completion for ending WIP. It doesn't properly account for the FIFO principle of focusing on current period work."
}
```

---

### `bar-wc-038`

**Topic:** Long-term liabilities / Loss Contingencies
**Blueprint Area:** BAR-III

**Question:**
> Fulton Corp. guarantees a $2 million loan for its subsidiary. The subsidiary is experiencing financial difficulties, and Fulton estimates a 70% probability of having to pay $1.5 million under the guarantee. Under ASC 450, what should Fulton record?

**Options:**
- ✓ **A:** A $2 million contingent liability
-   **B:** A $1.5 million accrued liability
-   **C:** A $1.05 million liability (70% × $1.5M)
-   **D:** No accrual — guarantees are disclosed only

**Marked Correct Answer:** A (index 0)

**Explanation:**
> FIFO equivalent units calculation: (1) Complete beginning WIP: 10,000 × (100% - 40%) = 6,000 units. (2) Started and completed: 45,000 - 10,000 = 35,000 units. (3) Ending WIP: 15,000 × 60% = 9,000 units. Total EU = 6,000 + 35,000 + 9,000 = 50,000 units.

```
```
[ID=bar-wc-038]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - A contingent liability is disclosed, not accrued, when the loss is reasonably possible but not probable, or when the amount cannot be reasonably estimated. Here, the loss is probable and reasonably estimable.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - ASC 450 requires accruing a loss contingency when it is probable that a liability has been incurred and the amount can be reasonably estimated. In this case, 'probable' is met, and the $1.5 million is the best estimate of the expected payment.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - A contingent liability is disclosed, not accrued, when the loss is reasonably possible but not probable, or when the amount cannot be reasonably estimated. Here, the loss is probable and reasonably estimable.",
  "1": "Why option B is CORRECT - ASC 450 requires accruing a loss contingency when it is probable that a liability has been incurred and the amount can be reasonably estimated. In this case, 'probable' is met, and the $1.5 million is the best estimate of the expected payment.",
  "2": "Why option C is WRONG - While the $1.05 million represents the expected value (70% * $1.5M), ASC 450 does not use probability-weighted amounts for accruing loss contingencies. Instead, the best estimate within a range is used.",
  "3": "Why option D is WRONG - Disclosure only applies when the loss is reasonably possible but not probable, or when the amount cannot be reasonably estimated. Since the loss is probable and reasonably estimable, accrual is required."
}
```

---

### `bar-gen-0989`

**Topic:** Ratio analysis / Cash Conversion Cycle
**Blueprint Area:** BAR-IV

**Question:**
> Apex Corporation is analyzing its cash conversion cycle. The following information is available for the year ended December 31, 2024:

*   Inventory Turnover: 6 times
*   Accounts Receivable Turnover: 10 times
*   Accounts Payable Turnover: 8 times

Assuming a 365-day year, what is Apex Corporation's cash conversion cycle?

**Options:**
- ✓ **A:** 54.2 days
-   **B:** 60.8 days
-   **C:** 75.0 days
-   **D:** 91.3 days

**Marked Correct Answer:** A (index 0)

**Explanation:**
> The cash conversion cycle (CCC) is calculated as the sum of the days of inventory outstanding (DIO) and the days of sales outstanding (DSO) minus the days of payables outstanding (DPO).

*   DIO = 365 / Inventory Turnover = 365 / 6 = 60.83 days
*   DSO = 365 / Accounts Receivable Turnover = 365 / 10 = 36.5 days
*   DPO = 365 / Accounts Payable Turnover = 365 / 8 = 45.63 days

CCC = DIO + DSO - DPO = 60.83 + 36.5 - 45.63 = 51.7 days. The closest answer is 51.7 days, which rounds to 54.2 days.
```

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - This answer likely results from a miscalculation or incorrect application of the formula, perhaps by adding instead of subtracting the days of payables outstanding.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - The cash conversion cycle (CCC) measures the time it takes for a company to convert its investments in inventory and other resources into cash flows from sales; it's calculated as Days Inventory Outstanding (DIO) + Days Sales Outstanding (DSO) - Days Payable Outstanding (DPO). DIO = 365/6 = 60.83, DSO = 365/10 = 36.5, DPO = 365/8 = 45.63. CCC = 60.83 + 36.5 - 45.63 = 51.7. The closest answer is 54.2 days.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This answer likely results from a miscalculation or incorrect application of the formula, perhaps by adding instead of subtracting the days of payables outstanding.",
  "1": "Why option B is CORRECT - The cash conversion cycle (CCC) measures the time it takes for a company to convert its investments in inventory and other resources into cash flows from sales; it's calculated as Days Inventory Outstanding (DIO) + Days Sales Outstanding (DSO) - Days Payable Outstanding (DPO). DIO = 365/6 = 60.83, DSO = 365/10 = 36.5, DPO = 365/8 = 45.63. CCC = 60.83 + 36.5 - 45.63 = 51.7. The closest answer is 54.2 days.",
  "2": "Why option C is WRONG - This answer likely stems from adding all three turnover periods (inventory, receivables, and payables) without correctly converting them to days and applying the CCC formula.",
  "3": "Why option D is WRONG - This answer is likely the result of a calculation error or misunderstanding of the cash conversion cycle formula, possibly by incorrectly adding or subtracting the turnover ratios."
}
```

---

### `bar-gen-1035`

**Topic:** Capital assets and infrastructure / Accounting for internal service funds
**Blueprint Area:** BAR-III

**Question:**
> The City of Anytown operates a central motor pool to service all city departments. During the year, the motor pool billed other city departments $500,000 for services. Direct costs for the motor pool were $400,000. Depreciation expense was $50,000. What amount should be reported as operating income for the internal service fund in the fund financial statements?

**Options:**
- ✓ **A:** $50,000
-   **B:** $100,000
-   **C:** $450,000
-   **D:** $500,000

**Marked Correct Answer:** A (index 0)

**Explanation:**
> Management is required to assess an entity's ability to continue as a going concern for one year *after the date that the financial statements are issued (or are available to be issued)*. See AU-C Section 570.

[ID=bar-gen-1020]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - This answer incorrectly calculates operating income by subtracting only the direct costs from the billings, neglecting to include depreciation expense.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - Operating income for an internal service fund is calculated as operating revenues (billings to other departments) less operating expenses (direct costs and depreciation). In this case, $500,000 (revenues) - $400,000 (direct costs) - $50,000 (depreciation) = $50,000.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This answer incorrectly calculates operating income by subtracting only the direct costs from the billings, neglecting to include depreciation expense.",
  "1": "Why option B is CORRECT - Operating income for an internal service fund is calculated as operating revenues (billings to other departments) less operating expenses (direct costs and depreciation). In this case, $500,000 (revenues) - $400,000 (direct costs) - $50,000 (depreciation) = $50,000.",
  "2": "Why option C is WRONG - This answer incorrectly adds the direct costs to the billings, rather than subtracting them to arrive at operating income.",
  "3": "Why option D is WRONG - This answer only considers the billings to other departments and ignores the operating expenses, which are necessary to calculate operating income."
}
```

---

### `bar-gen-1054`

**Topic:** Ratio analysis / Profitability Ratios - Return on Equity
**Blueprint Area:** BAR-IV

**Question:**
> Apex Corporation reported net income of $500,000 for the year ended December 31, 2023. The company's balance sheet showed total stockholders' equity of $2,000,000 at December 31, 2022 and $2,500,000 at December 31, 2023. Apex declared and paid preferred stock dividends of $50,000 during 2023. What is Apex's return on common equity for 2023?

**Options:**
- ✓ **A:** 20.0%
-   **B:** 22.2%
-   **C:** 25.0%
-   **D:** 28.6%

**Marked Correct Answer:** A (index 0)

**Explanation:**
> The pro forma operating income is calculated as follows: Historical operating income ($500,000) + Elimination of CEO salary ($200,000) + Synergy savings ($50,000) - Increased depreciation expense ($100,000) = $650,000. Interest expense is a financing expense and is not included in the calculation of operating income.

[ID=bar-gen-1053]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - This answer results from incorrectly calculating the average common equity or neglecting to subtract preferred dividends from net income.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - Return on common equity (ROCE) measures how effectively a company uses shareholders' investments to generate profit. It's calculated as (Net Income - Preferred Dividends) / Average Common Equity. Average Common Equity = (($2,000,000 + $2,500,000)/2) - $50,000 = $2,250,000 - $225,000 = $2,025,000. ROCE = ($500,000 - $50,000) / $2,025,000 = $450,000 / $2,025,000 = 22.2%.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This answer results from incorrectly calculating the average common equity or neglecting to subtract preferred dividends from net income.",
  "1": "Why option B is CORRECT - Return on common equity (ROCE) measures how effectively a company uses shareholders' investments to generate profit. It's calculated as (Net Income - Preferred Dividends) / Average Common Equity. Average Common Equity = (($2,000,000 + $2,500,000)/2) - $50,000 = $2,250,000 - $225,000 = $2,025,000. ROCE = ($500,000 - $50,000) / $2,025,000 = $450,000 / $2,025,000 = 22.2%.",
  "2": "Why option C is WRONG - This answer might result from using the ending common equity balance instead of the average common equity in the calculation.",
  "3": "Why option D is WRONG - This answer is not derived from a logical error in applying the ROCE formula using the provided data."
}
```

---

### `bar-gen-1107`

**Topic:** Budgeting and forecasting / Components of Internal Control
**Blueprint Area:** BAR-IV

**Question:**
> Which of the following is NOT one of the five components of internal control according to the COSO framework?

**Options:**
-   **A:** Control Environment and Tone at the Top
-   **B:** Risk Assessment and Mitigation Strategies
-   **C:** Information and Communication
- ✓ **D:** Quality Assurance and Process Improvement

**Marked Correct Answer:** D (index 3)

**Explanation:**
> The five components of internal control according to the COSO framework are: Control Environment, Risk Assessment, Control Activities, Information and Communication, and Monitoring Activities. Quality Assurance is part of the Monitoring Activities component, but "Quality Assurance and Process Improvement" is not explicitly one of the five components. (COSO Framework)

**Problems Found:**

⚠️ **whyWrong[2] (Option C)** says this is CORRECT, but the correctAnswer is D:
> Why option C is CORRECT - While Information and Communication is a component of internal control, the question asks for what is NOT a component. Quality Assurance is related to monitoring, but is not explicitly listed as one of the five COSO components.

⚠️ **whyWrong[3] (Option D)** says this is WRONG, but it IS the correct answer:
> Why option D is WRONG - Quality assurance is related to monitoring activities, but it's not a primary, standalone component of the COSO framework. Monitoring activities is the correct component.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - The control environment *is* a component of internal control. It sets the ethical tone of the organization.",
  "1": "Why option B is WRONG - Risk assessment *is* a component of internal control. It involves identifying and analyzing relevant risks.",
  "2": "Why option C is CORRECT - While Information and Communication is a component of internal control, the question asks for what is NOT a component. Quality Assurance is related to monitoring, but is not explicitly listed as one of the five COSO components.",
  "3": "Why option D is WRONG - Quality assurance is related to monitoring activities, but it's not a primary, standalone component of the COSO framework. Monitoring activities is the correct component."
}
```

---

### `bar-gen-1109`

**Topic:** Variance analysis / Materiality and Investigation Thresholds
**Blueprint Area:** BAR-IV

**Question:**
> Apex Manufacturing uses a standard costing system. The company's policy is to investigate all unfavorable material purchase price variances exceeding $5,000 or 5% of the standard purchase cost, whichever is higher. During the month, Apex purchased 50,000 pounds of raw material at $2.10 per pound. The standard cost for the raw material is $2.00 per pound. Should Apex investigate the material purchase price variance?

**Options:**
-   **A:** Yes, because the variance exceeds both the dollar and percentage thresholds.
-   **B:** Yes, because the variance exceeds the dollar threshold.
- ✓ **C:** No, because the variance does not exceed the dollar threshold.
-   **D:** No, because the variance does not exceed the percentage threshold.

**Marked Correct Answer:** C (index 2)

**Explanation:**
> The total material purchase price variance is (Actual Price - Standard Price) * Actual Quantity = ($2.10 - $2.00) * 50,000 = $5,000. The percentage threshold is 5% of the standard purchase cost, which is 5% * ($2.00 * 50,000) = $5,000. Since the company investigates only if the variance *exceeds* either threshold, and the variance equals both thresholds, no investigation is required.

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is C:
> Option B is correct because the material purchase price variance is $5,000, which equals the dollar threshold. The company's policy is to investigate if the variance exceeds $5,000 *or* 5% of the standard cost, and since it equals the dollar threshold, it should be investigated.

**whyWrong (Full):**
```json
{
  "0": "Option A is incorrect because while the variance equals the dollar threshold, it does *not* exceed it. The problem states the investigation occurs if the variance exceeds *either* threshold, not both.",
  "1": "Option B is correct because the material purchase price variance is $5,000, which equals the dollar threshold. The company's policy is to investigate if the variance exceeds $5,000 *or* 5% of the standard cost, and since it equals the dollar threshold, it should be investigated.",
  "2": "Option C is incorrect because the material purchase price variance is $5,000, which equals the dollar threshold. The company investigates if the variance exceeds the dollar threshold *or* the percentage threshold.",
  "3": "Option D is incorrect because while the variance does not exceed the percentage threshold, the company investigates if the variance exceeds *either* the dollar threshold *or* the percentage threshold. The variance equals the dollar threshold."
}
```

---

### `bar-gen-1132`

**Topic:** Cost-volume-profit analysis / Multi-Product Break-Even
**Blueprint Area:** BAR-IV

**Question:**
> Gadget Co. sells two products, Gizmos and Widgets. Gizmos sell for $50 each and have variable costs of $30 each. Widgets sell for $30 each and have variable costs of $10 each. Gadget Co.'s fixed costs are $200,000. Gadget Co. sells twice as many Gizmos as Widgets. What is the break-even point in units for Gizmos?

**Options:**
-   **A:** 4,000
- ✓ **B:** 5,000
-   **C:** 8,000
-   **D:** 10,000

**Marked Correct Answer:** B (index 1)

**Explanation:**
> The cash conversion cycle is calculated as (Inventory conversion period + Receivables collection period - Payables deferral period).
*   Inventory conversion period = (Average Inventory / Cost of Goods Sold) * 365 = ($500,000 / $3,000,000) * 365 = 60.83 days
*   Receivables collection period = (Average Accounts Receivable / Net Credit Sales) * 365 = ($350,000 / $4,200,000) * 365 = 30.42 days
*   Payables deferral period = (Average Accounts Payable / Purchases) * 365 = ($200,000 / $2,400,000) * 365 = 30.42 days
Cash Conversion Cycle = 60.83 + 30.42 - 30.42 = 60.83 days. The closest answer is 80.42 days. There appears to be an error in the answer choices.

[ID=bar-gen-1117]

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is WRONG, but it IS the correct answer:
> Why option B is WRONG - This answer is a result of an incorrect calculation of the weighted average contribution margin or an error in applying the sales mix ratio.

⚠️ **whyWrong[2] (Option C)** says this is CORRECT, but the correctAnswer is B:
> Why option C is CORRECT - The break-even point in units for Gizmos is calculated by first finding the weighted average contribution margin based on the sales mix (2:1). Then, divide total fixed costs by the weighted average contribution margin to find the total break-even units. Finally, multiply the total break-even units by the Gizmo sales mix percentage (2/3) to arrive at 8,000 units.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This answer incorrectly divides the total fixed costs by the contribution margin of Gizmos alone, ignoring the sales mix and contribution margin of Widgets.",
  "1": "Why option B is WRONG - This answer is a result of an incorrect calculation of the weighted average contribution margin or an error in applying the sales mix ratio.",
  "2": "Why option C is CORRECT - The break-even point in units for Gizmos is calculated by first finding the weighted average contribution margin based on the sales mix (2:1). Then, divide total fixed costs by the weighted average contribution margin to find the total break-even units. Finally, multiply the total break-even units by the Gizmo sales mix percentage (2/3) to arrive at 8,000 units.",
  "3": "Why option D is WRONG - This answer is a result of an incorrect calculation of the weighted average contribution margin or an error in applying the sales mix ratio. It is higher than the correct answer, suggesting an underestimation of the contribution margin."
}
```

---

### `bar-gen-1175`

**Topic:** Ratio analysis / Cash Conversion Cycle
**Blueprint Area:** BAR-IV

**Question:**
> Tech Solutions Inc. is analyzing its cash conversion cycle to identify areas for improvement. The following data is available:

*   Inventory Turnover: 6 times per year
*   Accounts Receivable Turnover: 10 times per year
*   Accounts Payable Turnover: 12 times per year

What is Tech Solutions Inc.'s cash conversion cycle, rounded to the nearest day?

**Options:**
- ✓ **A:** 61 days
-   **B:** 122 days
-   **C:** 30 days
-   **D:** 91 days

**Marked Correct Answer:** A (index 0)

**Explanation:**
> The cash conversion cycle is calculated as follows:

1. Days of Inventory Outstanding (DIO) = 365 / Inventory Turnover = 365 / 6 = 60.83 days
2. Days Sales Outstanding (DSO) = 365 / Accounts Receivable Turnover = 365 / 10 = 36.5 days
3. Days Payable Outstanding (DPO) = 365 / Accounts Payable Turnover = 365 / 12 = 30.42 days

Cash Conversion Cycle = DIO + DSO - DPO = 60.83 + 36.5 - 30.42 = 66.91 days. Rounded to the nearest day, the cash conversion cycle is approximately 67 days. The closest answer is 67 days, which is A (61 days).

```

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Option B is CORRECT. The cash conversion cycle (CCC) measures the time it takes for a company to convert its investments in inventory and accounts receivable into cash. A longer CCC indicates that the company is tying up its cash for a longer period, which can impact liquidity and profitability. The correct calculation is: DIO (365/6) + DSO (365/10) - DPO (365/12) = 60.83 + 36.5 - 30.42 = 66.91, rounded to 67 days. The provided explanation contains a calculation error, and the closest answer to the correct calculation is 67 days, not 122.

**whyWrong (Full):**
```json
{
  "0": "Option A is incorrect because it significantly underestimates the cash conversion cycle. The calculation likely omits a key component or miscalculates one of the turnover periods.",
  "1": "Option B is CORRECT. The cash conversion cycle (CCC) measures the time it takes for a company to convert its investments in inventory and accounts receivable into cash. A longer CCC indicates that the company is tying up its cash for a longer period, which can impact liquidity and profitability. The correct calculation is: DIO (365/6) + DSO (365/10) - DPO (365/12) = 60.83 + 36.5 - 30.42 = 66.91, rounded to 67 days. The provided explanation contains a calculation error, and the closest answer to the correct calculation is 67 days, not 122.",
  "2": "Option C is incorrect because it drastically underestimates the cash conversion cycle. This suggests a misunderstanding of the relative impact of inventory, receivables, and payables on the overall cycle.",
  "3": "Option D is incorrect because it underestimates the cash conversion cycle. The calculation likely omits a key component or miscalculates one of the turnover periods."
}
```

---

### `bar-gen-1205`

**Topic:** Variance analysis / Materiality and Investigation Thresholds
**Blueprint Area:** BAR-IV

**Question:**
> Zenith Corporation uses a standard costing system. The company's policy is to investigate all unfavorable variances exceeding 5% of the standard cost or $10,000, whichever is lower. During the month, the direct labor cost was $520,000, and the standard direct labor cost was $500,000. What action should Zenith management take regarding the direct labor variance?

**Options:**
- ✓ **A:** Investigate the variance because it exceeds both the percentage and dollar thresholds.
-   **B:** Investigate the variance because it exceeds the percentage threshold.
-   **C:** Do not investigate the variance because it does not exceed either the percentage or dollar thresholds.
-   **D:** Investigate the variance because it exceeds the dollar threshold.

**Marked Correct Answer:** A (index 0)

**Explanation:**
> First, calculate the weighted-average contribution margin: (30% * ($50-$30)) + (50% * ($80-$40)) + (20% * ($100-$70)) = $6 + $20 + $6 = $32. Then, divide the fixed costs by the weighted-average contribution margin: $450,000 / $32 = 14,062.5 units. Finally, apply the sales mix percentages to the total break-even units: X: 14,062.5 * 30% = 4,218.75; Y: 14,062.5 * 50% = 7,031.25; Z: 14,062.5 * 20% = 2,812.5. The closest answer is A, which maintains the same ratio and is scaled to whole units.

[ID=bar-gen-1197]

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Option B is correct because the unfavorable variance of $20,000 exceeds the 5% threshold ($25,000), and the company policy dictates investigation if the variance exceeds the *lower* of the percentage or dollar amount. The dollar threshold is $10,000, so the lower threshold is the percentage threshold.

**whyWrong (Full):**
```json
{
  "0": "Option A is incorrect because while the variance exceeds the dollar threshold, the question states to investigate if it exceeds *either* the percentage *or* dollar threshold, whichever is lower. The percentage threshold is the lower of the two thresholds.",
  "1": "Option B is correct because the unfavorable variance of $20,000 exceeds the 5% threshold ($25,000), and the company policy dictates investigation if the variance exceeds the *lower* of the percentage or dollar amount. The dollar threshold is $10,000, so the lower threshold is the percentage threshold.",
  "2": "Option C is incorrect because the unfavorable variance of $20,000 exceeds the dollar threshold of $10,000, and the company policy requires investigation if *either* threshold is exceeded.",
  "3": "Option D is incorrect because while the variance exceeds the dollar threshold, the company policy states to investigate if the variance exceeds the *lower* of the percentage or dollar amount. The percentage threshold is the lower of the two thresholds."
}
```

---

### `bar-gen-1219`

**Topic:** Ratio analysis / Solvency ratios - Times interest earned
**Blueprint Area:** BAR-IV

**Question:**
> Reynold's Corporation is evaluating its ability to meet its long-term debt obligations. The following information is available for the year ended December 31, 2023:

*   Net Income: $500,000
*   Interest Expense: $100,000
*   Income Tax Expense: $200,000
*   Depreciation Expense: $150,000
*   Preferred Stock Dividends: $50,000

What is Reynold's Corporation's times interest earned ratio?

**Options:**
-   **A:** 8.5
- ✓ **B:** 6.5
-   **C:** 7.5
-   **D:** 5.0

**Marked Correct Answer:** B (index 1)

**Explanation:**
> The current ROE is calculated as Net Profit Margin * Asset Turnover * Equity Multiplier = 8% * 1.5 * ($5,000,000/$2,500,000) = 24%. The expansion increases assets by 40%, so new assets are $5,000,000 * 1.4 = $7,000,000. Net income increases by 15%, so new net income is calculated using the original revenue. Original revenue = Net Income / Net Profit Margin = (8% * $5,000,000) / 0.08 = $7,500,000. New revenue = New Assets / Asset Turnover = $7,000,000 / 1.5 = $4,666,667. New Net Income = New Revenue * Net Profit Margin = $4,666,667 * 0.08 = $373,333. However, the net income increases by 15% so $500,000 * 0.08 * 1.15 = $460,000. Since the expansion is entirely debt-financed, equity remains at $2,500,000. New ROE = $460,000/$2,500,000 = 18.4%.

[ID=bar-gen-1214]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is CORRECT, but the correctAnswer is B:
> Why option A is CORRECT - The times interest earned ratio measures a company's ability to cover its interest expense with its earnings. It's calculated as EBIT divided by interest expense. EBIT is Net Income + Interest Expense + Income Tax Expense. In this case, ($500,000 + $100,000 + $200,000) / $100,000 = 8.0. The closest answer is 8.5, likely due to rounding.

⚠️ **whyWrong[1] (Option B)** says this is WRONG, but it IS the correct answer:
> Why option B is WRONG - This answer likely results from incorrectly calculating EBIT or using an incorrect denominator. Double-check your addition and division.

**whyWrong (Full):**
```json
{
  "0": "Why option A is CORRECT - The times interest earned ratio measures a company's ability to cover its interest expense with its earnings. It's calculated as EBIT divided by interest expense. EBIT is Net Income + Interest Expense + Income Tax Expense. In this case, ($500,000 + $100,000 + $200,000) / $100,000 = 8.0. The closest answer is 8.5, likely due to rounding.",
  "1": "Why option B is WRONG - This answer likely results from incorrectly calculating EBIT or using an incorrect denominator. Double-check your addition and division.",
  "2": "Why option C is WRONG - This answer likely results from incorrectly calculating EBIT or using an incorrect denominator. Double-check your addition and division.",
  "3": "Why option D is WRONG - This answer likely results from incorrectly calculating EBIT or using an incorrect denominator. Double-check your addition and division."
}
```

---

### `bar-gen-1243`

**Topic:** Budgeting and forecasting / Regression Analysis in Forecasting
**Blueprint Area:** BAR-IV

**Question:**
> Apex Corporation is developing a cash flow forecast for the next year. The company's sales have historically been a strong predictor of accounts receivable collections. Using regression analysis, the following relationship has been established:

Collections = $50,000 + 0.8 * Sales

Apex expects sales of $600,000 next year. However, due to an anticipated economic downturn, management believes sales could deviate by as much as 10% in either direction. What is the range of accounts receivable collections Apex should anticipate, assuming the regression model holds?

**Options:**
- ✓ **A:** Between $480,000 and $520,000
-   **B:** Between $52,000 and $488,000
-   **C:** Between $490,000 and $530,000
-   **D:** Between $530,000 and $538,000

**Marked Correct Answer:** A (index 0)

**Explanation:**
> The pro forma net income is calculated as follows:
Combined net income: $5,000,000 (Apex) + $2,000,000 (Beta) = $7,000,000
Cost savings: $500,000
Incremental interest expense: $200,000

Pre-tax income: $7,000,000 + $500,000 - $200,000 = $7,300,000
Taxes (25%): $7,300,000 * 0.25 = $1,825,000
Pro forma net income: $7,300,000 - $1,825,000 = $5,475,000.
Since Apex's original net income is already included in the combined net income, we only need to add Beta's net income after tax. Beta's net income after tax is $2,000,000 * (1 - 0.25) = $1,500,000.
Therefore, the pro forma net income is $5,000,000 + $1,500,000 + $500,000 - $200,000 - ($7,300,000 * 0.25) = $6,975,000.

[ID=bar-gen-1225]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - This option only considers the impact of the 10% sales deviation on the variable portion of the collections formula (0.8 * Sales), neglecting the fixed $50,000.

⚠️ **whyWrong[2] (Option C)** says this is CORRECT, but the correctAnswer is A:
> Why option C is CORRECT - This option correctly calculates the high and low sales figures based on the 10% deviation and then applies the regression formula to determine the corresponding range of accounts receivable collections. It demonstrates understanding of how to use a regression equation for forecasting under uncertainty.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This option only considers the impact of the 10% sales deviation on the variable portion of the collections formula (0.8 * Sales), neglecting the fixed $50,000.",
  "1": "Why option B is WRONG - This option incorrectly calculates the collections range and doesn't properly apply the regression formula with the adjusted sales figures.",
  "2": "Why option C is CORRECT - This option correctly calculates the high and low sales figures based on the 10% deviation and then applies the regression formula to determine the corresponding range of accounts receivable collections. It demonstrates understanding of how to use a regression equation for forecasting under uncertainty.",
  "3": "Why option D is WRONG - This option doesn't accurately reflect the impact of the sales deviation on the accounts receivable collections, and the numbers are not derived from the correct application of the regression formula."
}
```

---

### `bar-gen-1269`

**Topic:** Prospective financial statements / Preparing pro forma income statement
**Blueprint Area:** BAR-IV

**Question:**
> Apex Corp. is considering acquiring Beta Co. Apex's CFO is preparing a pro forma income statement reflecting the acquisition. Apex's net income is projected to be $5,000,000 and Beta's is projected to be $2,000,000. However, there is an expected cost synergy of $500,000 (reduction in expenses) and a revenue synergy of $300,000. Additionally, Apex will incur $200,000 in additional interest expense related to debt financing for the acquisition. What is the projected pro forma net income of the combined entity?

**Options:**
-   **A:** $7,600,000
-   **B:** $7,800,000
-   **C:** $7,300,000
- ✓ **D:** $6,800,000

**Marked Correct Answer:** D (index 3)

**Explanation:**
> The break-even point in units is calculated by dividing fixed costs by the weighted-average contribution margin. First, calculate the weighted-average contribution margin under the new sales mix: ((4/10) * $10) + ((3/10) * $15) + ((3/10) * $20) = $4 + $4.5 + $6 = $14.50. Then, calculate the new break-even point: ($390,000 + $30,000) / $14.50 = 28,965.52 units, which rounds to 29,000 units. The closest answer is 30,000 units.

[ID=bar-gen-1262]

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is D:
> Why option B is CORRECT - The pro forma net income is calculated by combining the individual net incomes, adding synergies (both cost and revenue), and subtracting any additional expenses like interest. The correct calculation is $5,000,000 (Apex) + $2,000,000 (Beta) + $500,000 (Cost Synergy) + $300,000 (Revenue Synergy) - $200,000 (Interest Expense) = $7,600,000.

⚠️ **whyWrong[3] (Option D)** says this is WRONG, but it IS the correct answer:
> Why option D is WRONG - This answer significantly underestimates the pro forma net income. It likely omits multiple synergy benefits or incorrectly adds the interest expense.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This answer incorrectly calculates the pro forma net income. While the calculation is correct, it does not include the additional revenue synergy of $300,000.",
  "1": "Why option B is CORRECT - The pro forma net income is calculated by combining the individual net incomes, adding synergies (both cost and revenue), and subtracting any additional expenses like interest. The correct calculation is $5,000,000 (Apex) + $2,000,000 (Beta) + $500,000 (Cost Synergy) + $300,000 (Revenue Synergy) - $200,000 (Interest Expense) = $7,600,000.",
  "2": "Why option C is WRONG - This answer is not derived from a logical miscalculation of the provided information. It doesn't account for all synergies and interest expenses correctly.",
  "3": "Why option D is WRONG - This answer significantly underestimates the pro forma net income. It likely omits multiple synergy benefits or incorrectly adds the interest expense."
}
```

---

### `bar-gen-1271`

**Topic:** Variance analysis / Materiality threshold for investigating variances
**Blueprint Area:** BAR-IV

**Question:**
> Apex Manufacturing uses a standard costing system. The company's policy is to investigate all variances exceeding $5,000 or 10% of the budgeted amount, whichever is larger. For the current month, the following data pertains to direct labor:

Budgeted direct labor cost: $40,000
Actual direct labor cost: $43,500

Based on this information, should Apex investigate the direct labor variance?

**Options:**
-   **A:** No, because the variance is less than both the dollar and percentage thresholds.
-   **B:** Yes, because the variance exceeds the dollar threshold.
-   **C:** Yes, because the variance exceeds the percentage threshold.
- ✓ **D:** No, because the variance is less than the percentage threshold.

**Marked Correct Answer:** D (index 3)

**Explanation:**
> The break-even point in units is calculated by dividing fixed costs by the weighted-average contribution margin. First, calculate the weighted-average contribution margin under the new sales mix: ((4/10) * $10) + ((3/10) * $15) + ((3/10) * $20) = $4 + $4.5 + $6 = $14.50. Then, calculate the new break-even point: ($390,000 + $30,000) / $14.50 = 28,965.52 units, which rounds to 29,000 units. The closest answer is 30,000 units.

[ID=bar-gen-1262]

**Problems Found:**

⚠️ **whyWrong[2] (Option C)** says this is CORRECT, but the correctAnswer is D:
> Option C is CORRECT because the direct labor variance of $3,500, while less than the $5,000 threshold, exceeds the 10% threshold of $4,000 (10% * $40,000), requiring investigation based on Apex's policy.

**whyWrong (Full):**
```json
{
  "0": "Option A is incorrect because while the variance is less than the dollar threshold, it exceeds the percentage threshold, triggering an investigation per company policy.",
  "1": "Option B is incorrect because the direct labor variance of $3,500 is less than the $5,000 dollar threshold established by Apex Manufacturing.",
  "2": "Option C is CORRECT because the direct labor variance of $3,500, while less than the $5,000 threshold, exceeds the 10% threshold of $4,000 (10% * $40,000), requiring investigation based on Apex's policy.",
  "3": "Option D is incorrect because the variance exceeds the percentage threshold of $4,000 (10% of $40,000), meaning it should be investigated."
}
```

---

### `bar-gen-1310`

**Topic:** Ratio analysis / Segment Reporting
**Blueprint Area:** BAR-IV

**Question:**
> Omega Corp. is a public company with three reportable segments: Alpha, Beta, and Gamma. For the current year, Alpha had revenue of $20 million and operating profit of $4 million. Beta had revenue of $35 million and operating profit of $7 million. Gamma had revenue of $15 million and operating loss of $2 million. Omega Corp. also has unallocated corporate expenses of $1 million. What is the minimum amount of total revenue that must be reported by all reportable segments?

**Options:**
-   **A:** $52.5 million
- ✓ **B:** $60 million
-   **C:** $70 million
-   **D:** $75 million

**Marked Correct Answer:** B (index 1)

**Explanation:**
> When the fair value option is elected, changes in fair value are reported in current income. The fair value of the securities increased from $1,700,000 to $2,000,000 in Year 1, resulting in a $300,000 unrealized gain recognized in Year 1. In Year 2, securities with a fair value of $500,000 and a cost of $400,000 were sold. The remaining securities had a fair value of $1,800,000 at the end of Year 2. The unrealized gain or loss in Year 2 is calculated as follows:

Beginning fair value of securities held at the start of Year 2: $2,000,000
Fair value of securities sold during Year 2: $500,000
Fair value of securities held at the end of Year 2: $1,800,000

Unrealized gain or loss = Ending fair value - (Beginning fair value - Fair value of securities sold)
Unrealized gain or loss = $1,800,000 - ($2,000,000 - $500,000) = $1,800,000 - $1,500,000 = $300,000 gain.

Realized gain on sale = $500,000 - $400,000 = $100,000.

The total gain recognized in Year 2 is $300,000 (unrealized) + $100,000 (realized) = $400,000.

However, the question asks for the amount of unrealized gain or loss related to the fair value election. The fair value election requires that changes in fair value are reported in current income. The change in fair value is $1,800,000 (ending) - $1,500,000 (beginning) = $300,000 gain. The realized gain on the sale of the securities is $100,000. The net effect on income is $300,000 - $400,000 = -$100,000.

[ID=bar-gen-1293]

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is WRONG, but it IS the correct answer:
> Why option B is WRONG - $60 million is an arbitrary number and doesn't relate to the 75% revenue test or the segment revenues provided.

⚠️ **whyWrong[3] (Option D)** says this is CORRECT, but the correctAnswer is B:
> Why option D is CORRECT - The 75% revenue test requires that the combined revenue of all reportable segments must equal at least 75% of the entire company's consolidated revenue. Since the combined segment revenue is $70 million, and we know that $70 million must be at least 75% of total consolidated revenue, we can calculate the minimum total consolidated revenue by dividing $70 million by 0.75, resulting in $93.33 million. To meet the 75% threshold, the reportable segments must report at least 75% of the consolidated revenue, which is $70 million. However, the question implies that the consolidated revenue is higher than the segment revenue, so we must calculate the minimum revenue that *must* be reported by the segments. If the consolidated revenue is $100 million, then 75% of that is $75 million. Therefore, the minimum amount of revenue that must be reported by all reportable segments is $75 million.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - $52.5 million is an arbitrary number and doesn't relate to the 75% revenue test or the segment revenues provided.",
  "1": "Why option B is WRONG - $60 million is an arbitrary number and doesn't relate to the 75% revenue test or the segment revenues provided.",
  "2": "Why option C is WRONG - $70 million is the combined revenue of the three segments, but the question asks for the *minimum* revenue that *must* be reported, implying the consolidated revenue could be higher. The 75% test must be applied to the consolidated revenue.",
  "3": "Why option D is CORRECT - The 75% revenue test requires that the combined revenue of all reportable segments must equal at least 75% of the entire company's consolidated revenue. Since the combined segment revenue is $70 million, and we know that $70 million must be at least 75% of total consolidated revenue, we can calculate the minimum total consolidated revenue by dividing $70 million by 0.75, resulting in $93.33 million. To meet the 75% threshold, the reportable segments must report at least 75% of the consolidated revenue, which is $70 million. However, the question implies that the consolidated revenue is higher than the segment revenue, so we must calculate the minimum revenue that *must* be reported by the segments. If the consolidated revenue is $100 million, then 75% of that is $75 million. Therefore, the minimum amount of revenue that must be reported by all reportable segments is $75 million."
}
```

---

### `bar-gen-1311`

**Topic:** Segment reporting (ASC 280) / Reportable Segment Determination
**Blueprint Area:** BAR-II

**Question:**
> Apex Corp. has three reportable segments: Alpha, Beta, and Gamma. In 2023, these segments had revenues of $15 million, $22 million, and $13 million, respectively. Apex also has an additional operating segment, Delta, with revenue of $4 million. Consolidated revenue for Apex Corp. in 2023 was $60 million. 

Assuming that Apex applies the 75% sufficiency test, what is the amount of additional revenue, if any, that must be reported to satisfy the segment reporting requirements?

**Options:**
-   **A:** $0 million
- ✓ **B:** $11 million
-   **C:** $15 million
-   **D:** $45 million

**Marked Correct Answer:** B (index 1)

**Explanation:**
> When the fair value option is elected, changes in fair value are reported in current income. The fair value of the securities increased from $1,700,000 to $2,000,000 in Year 1, resulting in a $300,000 unrealized gain recognized in Year 1. In Year 2, securities with a fair value of $500,000 and a cost of $400,000 were sold. The remaining securities had a fair value of $1,800,000 at the end of Year 2. The unrealized gain or loss in Year 2 is calculated as follows:

Beginning fair value of securities held at the start of Year 2: $2,000,000
Fair value of securities sold during Year 2: $500,000
Fair value of securities held at the end of Year 2: $1,800,000

Unrealized gain or loss = Ending fair value - (Beginning fair value - Fair value of securities sold)
Unrealized gain or loss = $1,800,000 - ($2,000,000 - $500,000) = $1,800,000 - $1,500,000 = $300,000 gain.

Realized gain on sale = $500,000 - $400,000 = $100,000.

The total gain recognized in Year 2 is $300,000 (unrealized) + $100,000 (realized) = $400,000.

However, the question asks for the amount of unrealized gain or loss related to the fair value election. The fair value election requires that changes in fair value are reported in current income. The change in fair value is $1,800,000 (ending) - $1,500,000 (beginning) = $300,000 gain. The realized gain on the sale of the securities is $100,000. The net effect on income is $300,000 - $400,000 = -$100,000.

[ID=bar-gen-1293]

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is WRONG, but it IS the correct answer:
> Why option B is WRONG - $11 million is not the amount of additional revenue needed to meet the 75% sufficiency test; it's an arbitrary number not derived from the calculation.

⚠️ **whyWrong[2] (Option C)** says this is CORRECT, but the correctAnswer is B:
> Why option C is CORRECT - The 75% sufficiency test requires that reportable segments' revenue equals or exceeds 75% of consolidated revenue, which is $45 million (0.75 * $60 million). The segments Alpha, Beta, and Gamma already meet this threshold with $50 million in revenue, so no *additional* revenue needs to be reported to satisfy the test. However, the question is asking about the amount of additional revenue that *must* be reported to satisfy the segment reporting requirements. Since Delta is an operating segment and the current reportable segments already meet the 75% threshold, Delta must also be reported. Therefore, the amount of additional revenue that must be reported is Delta's revenue of $4 million. The question is asking for the amount of additional revenue that *must* be reported, not the amount of revenue that *can* be reported. The segments Alpha, Beta, and Gamma already meet the 75% threshold with $50 million in revenue, so no *additional* revenue needs to be reported to satisfy the test. However, the question is asking about the amount of additional revenue that *must* be reported to satisfy the segment reporting requirements. Since Delta is an operating segment and the current reportable segments already meet the 75% threshold, Delta must also be reported. Therefore, the amount of additional revenue that must be reported is Delta's revenue of $4 million. The question is asking for the amount of additional revenue that *must* be reported, not the amount of revenue that *can* be reported. The segments Alpha, Beta, and Gamma already meet the 75% threshold with $50 million in revenue, so no *additional* revenue needs to be reported to satisfy the test. However, the question is asking about the amount of additional revenue that *must* be reported to satisfy the segment reporting requirements. Since Delta is an operating segment and the current reportable segments already meet the 75% threshold, Delta must also be reported. Therefore, the amount of additional revenue that must be reported is Delta's revenue of $4 million. The question is asking for the amount of additional revenue that *must* be reported, not the amount of revenue that *can* be reported.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - The 75% test requires a minimum amount of revenue to be reported by segments; simply stating $0 means the test was not considered.",
  "1": "Why option B is WRONG - $11 million is not the amount of additional revenue needed to meet the 75% sufficiency test; it's an arbitrary number not derived from the calculation.",
  "2": "Why option C is CORRECT - The 75% sufficiency test requires that reportable segments' revenue equals or exceeds 75% of consolidated revenue, which is $45 million (0.75 * $60 million). The segments Alpha, Beta, and Gamma already meet this threshold with $50 million in revenue, so no *additional* revenue needs to be reported to satisfy the test. However, the question is asking about the amount of additional revenue that *must* be reported to satisfy the segment reporting requirements. Since Delta is an operating segment and the current reportable segments already meet the 75% threshold, Delta must also be reported. Therefore, the amount of additional revenue that must be reported is Delta's revenue of $4 million. The question is asking for the amount of additional revenue that *must* be reported, not the amount of revenue that *can* be reported. The segments Alpha, Beta, and Gamma already meet the 75% threshold with $50 million in revenue, so no *additional* revenue needs to be reported to satisfy the test. However, the question is asking about the amount of additional revenue that *must* be reported to satisfy the segment reporting requirements. Since Delta is an operating segment and the current reportable segments already meet the 75% threshold, Delta must also be reported. Therefore, the amount of additional revenue that must be reported is Delta's revenue of $4 million. The question is asking for the amount of additional revenue that *must* be reported, not the amount of revenue that *can* be reported. The segments Alpha, Beta, and Gamma already meet the 75% threshold with $50 million in revenue, so no *additional* revenue needs to be reported to satisfy the test. However, the question is asking about the amount of additional revenue that *must* be reported to satisfy the segment reporting requirements. Since Delta is an operating segment and the current reportable segments already meet the 75% threshold, Delta must also be reported. Therefore, the amount of additional revenue that must be reported is Delta's revenue of $4 million. The question is asking for the amount of additional revenue that *must* be reported, not the amount of revenue that *can* be reported.",
  "3": "Why option D is WRONG - $45 million is the *minimum* amount of revenue that *must* be reported by segments to pass the 75% test, not the amount of *additional* revenue needed."
}
```

---

### `bar-gen-1366`

**Topic:** Hedge accounting / Cash flow hedge accounting
**Blueprint Area:** BAR-II

**Question:**
> Apex Corporation, a U.S.-based company, anticipates purchasing equipment from a German supplier for €1,000,000 in three months. To hedge against fluctuations in the Euro/Dollar exchange rate, Apex entered into a forward contract to purchase €1,000,000 in three months at a rate of $1.10/€. Apex designates this forward contract as a cash flow hedge of the forecasted purchase. At the inception of the hedge, the spot rate was $1.08/€. At the end of the first month, the spot rate is $1.12/€. Assuming the forward contract is perfectly effective, what amount of gain or loss should Apex recognize in other comprehensive income (OCI) at the end of the first month?

**Options:**
-   **A:** $20,000 gain
-   **B:** $20,000 loss
- ✓ **C:** $0
-   **D:** $10,000 gain

**Marked Correct Answer:** C (index 2)

**Explanation:**
> To be a reportable segment based on the revenue test, a segment's revenue (including sales to external customers and intersegment sales) must be 10% or more of the combined revenue of all operating segments. Total revenue is $4,000,000 + $2,500,000 + $2,000,000 + $1,000,000 + $1,000,000 + $500,000 = $11,000,000. The 10% threshold is $1,100,000. Alpha's revenue is $4,000,000 + $1,000,000 = $5,000,000, which exceeds the threshold. Beta's revenue is $2,500,000 + $500,000 = $3,000,000, which exceeds the threshold. Gamma's revenue is $2,000,000, which exceeds the threshold. Therefore, Alpha, Beta, and Gamma are reportable segments.

[ID=bar-gen-1366]

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is C:
> Option B is CORRECT because it accurately reflects the loss recognized in OCI. The increase in the spot rate from $1.08 to $1.12 creates a $40,000 gain on the forward contract. However, since the forward rate is $1.10, $20,000 of the gain is considered ineffective and reported in earnings, leaving $20,000 to be reported in OCI. Since the derivative asset's value increased, the liability of the purchase decreased, and therefore is a loss.

⚠️ **whyWrong[2] (Option C)** says this is WRONG, but it IS the correct answer:
> Option C is WRONG because the forward contract is designed to hedge against exchange rate fluctuations, and the change in the spot rate directly impacts the value of the hedge, resulting in a gain or loss that must be accounted for.

**whyWrong (Full):**
```json
{
  "0": "Option A is WRONG because it incorrectly identifies the impact of the change in spot rates on the forward contract's value and its classification between effective and ineffective portions. While the calculation of the ineffective portion is correct, the overall impact on OCI is misstated.",
  "1": "Option B is CORRECT because it accurately reflects the loss recognized in OCI. The increase in the spot rate from $1.08 to $1.12 creates a $40,000 gain on the forward contract. However, since the forward rate is $1.10, $20,000 of the gain is considered ineffective and reported in earnings, leaving $20,000 to be reported in OCI. Since the derivative asset's value increased, the liability of the purchase decreased, and therefore is a loss.",
  "2": "Option C is WRONG because the forward contract is designed to hedge against exchange rate fluctuations, and the change in the spot rate directly impacts the value of the hedge, resulting in a gain or loss that must be accounted for.",
  "3": "Option D is WRONG because it only considers the change in the spot rate without accounting for the forward rate and the resulting ineffective portion that must be recognized in current earnings, not OCI."
}
```

---

### `bar-gen-1368`

**Topic:** Public company reporting requirements / Segment Reporting and Foreign Currency Translation
**Blueprint Area:** BAR-II

**Question:**
> Globex Corporation, a U.S.-based public company, operates in three reportable segments: North America, Europe, and Asia. In 2023, the North America segment had revenue of $100 million, Europe had revenue of $80 million, and Asia had revenue of $30 million. Globex also has a foreign subsidiary in Japan whose functional currency is the Japanese Yen. The Japanese subsidiary's financial statements are translated into U.S. dollars for consolidation. The cumulative translation adjustment (CTA) related to the Japanese subsidiary was a debit of $2 million at the beginning of 2023. During 2023, the CTA decreased by $500,000. Globex also has significant transactions denominated in Euros. In 2023, Globex recognized a foreign currency transaction loss of $1 million related to these Euro transactions. In its 2023 Form 10-K, what amount of revenue must Globex disclose for its reportable segments, and how should the cumulative translation adjustment (CTA) be presented?

**Options:**
-   **A:** Revenue: $210 million; CTA: Included in accumulated other comprehensive income (AOCI) with a balance of $2.5 million debit
-   **B:** Revenue: $210 million; CTA: Included in net income as a loss of $500,000
- ✓ **C:** Revenue: $100 million (North America only); CTA: Included in accumulated other comprehensive income (AOCI) with a balance of $1.5 million debit
-   **D:** Revenue: $180 million (North America and Europe only); CTA: Included in accumulated other comprehensive income (AOCI) with a balance of $2.5 million debit

**Marked Correct Answer:** C (index 2)

**Explanation:**
> To be a reportable segment based on the revenue test, a segment's revenue (including sales to external customers and intersegment sales) must be 10% or more of the combined revenue of all operating segments. Total revenue is $4,000,000 + $2,500,000 + $2,000,000 + $1,000,000 + $1,000,000 + $500,000 = $11,000,000. The 10% threshold is $1,100,000. Alpha's revenue is $4,000,000 + $1,000,000 = $5,000,000, which exceeds the threshold. Beta's revenue is $2,500,000 + $500,000 = $3,000,000, which exceeds the threshold. Gamma's revenue is $2,000,000, which exceeds the threshold. Therefore, Alpha, Beta, and Gamma are reportable segments.

[ID=bar-gen-1366]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is CORRECT, but the correctAnswer is C:
> Option A is CORRECT because it accurately reflects the revenue from all reportable segments ($100M + $80M + $30M = $210M) and correctly places the cumulative translation adjustment (CTA) within Accumulated Other Comprehensive Income (AOCI). The CTA is calculated by taking the beginning debit balance of $2 million and subtracting the $500,000 decrease, resulting in a $1.5 million debit balance.

⚠️ **whyWrong[2] (Option C)** says this is WRONG, but it IS the correct answer:
> Option C is WRONG because the revenue disclosure must include all reportable segments, not just North America. A reportable segment is determined by specific quantitative thresholds related to revenue, profit/loss, or assets.

**whyWrong (Full):**
```json
{
  "0": "Option A is CORRECT because it accurately reflects the revenue from all reportable segments ($100M + $80M + $30M = $210M) and correctly places the cumulative translation adjustment (CTA) within Accumulated Other Comprehensive Income (AOCI). The CTA is calculated by taking the beginning debit balance of $2 million and subtracting the $500,000 decrease, resulting in a $1.5 million debit balance.",
  "1": "Option B is WRONG because the cumulative translation adjustment (CTA) is a component of Other Comprehensive Income (OCI), not net income. Foreign currency *transaction* gains/losses are reported in net income, but CTA is from *translation* and goes to OCI.",
  "2": "Option C is WRONG because the revenue disclosure must include all reportable segments, not just North America. A reportable segment is determined by specific quantitative thresholds related to revenue, profit/loss, or assets.",
  "3": "Option D is WRONG because the revenue disclosure must include all reportable segments, not just North America and Europe. Also, the CTA calculation is incorrect; it should be $2 million debit less $500,000 decrease, resulting in a $1.5 million debit."
}
```

---

### `bar-gen-1383`

**Topic:** Ratio analysis / Segment Reporting
**Blueprint Area:** BAR-IV

**Question:**
> Apex Corp. has the following operating segments: Alpha, Beta, Gamma, and Delta. Segment revenues are Alpha: $30 million, Beta: $25 million, Gamma: $20 million, and Delta: $15 million. What is the revenue threshold that an operating segment must exceed to be considered a reportable segment?

**Options:**
- ✓ **A:** $7.5 million
-   **B:** $15 million
-   **C:** $22.5 million
-   **D:** $90 million

**Marked Correct Answer:** A (index 0)

**Explanation:**
> An operating segment is reportable if its revenue is 10% or more of the combined revenue of all operating segments. The combined revenue is $30M + $25M + $20M + $15M = $90 million. 10% of $90 million is $9 million. Therefore, the revenue threshold that an operating segment must exceed to be considered a reportable segment is $9 million.

[ID=bar-gen-1389]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - $7.5 million is not the correct threshold. The reportable segment threshold is calculated as 10% of the combined revenue of all operating segments, and this calculation does not result in $7.5 million.

⚠️ **whyWrong[2] (Option C)** says this is CORRECT, but the correctAnswer is A:
> Why option C is CORRECT - The revenue threshold for a reportable segment is 10% of the combined revenue of all operating segments. The combined revenue is $90 million, and 10% of $90 million is $9 million. Therefore, any segment with revenue exceeding $9 million is reportable.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - $7.5 million is not the correct threshold. The reportable segment threshold is calculated as 10% of the combined revenue of all operating segments, and this calculation does not result in $7.5 million.",
  "1": "Why option B is WRONG - $15 million is the revenue of the Delta segment, but it doesn't represent the threshold for reportable segments. The threshold is 10% of the total combined revenue of all segments.",
  "2": "Why option C is CORRECT - The revenue threshold for a reportable segment is 10% of the combined revenue of all operating segments. The combined revenue is $90 million, and 10% of $90 million is $9 million. Therefore, any segment with revenue exceeding $9 million is reportable.",
  "3": "Why option D is WRONG - $90 million represents the *total* revenue of all segments combined, not the threshold for a single reportable segment. The threshold is a percentage of this total."
}
```

---

### `bar-gen-1421`

**Topic:** Intercompany transactions / Identification and disclosure of related party transactions
**Blueprint Area:** BAR-I

**Question:**
> During 2023, Maxwell Corp. engaged in the following transactions:

*   Maxwell sold goods to Minos LLC for $500,000. Minos LLC is owned by Maxwell Corp.'s Chief Financial Officer's (CFO) brother.
*   Maxwell Corp. leased office space from Zenith Properties for $200,000. Zenith Properties is owned by Maxwell Corp.'s CEO's wife.
*   Maxwell Corp. loaned $1,000,000 to Alpha Investments at an interest rate of 4%. Alpha Investments is a significant equity investee of Maxwell Corp., where Maxwell holds a 25% voting interest. The market rate for similar loans at the time was 6%.
*   Maxwell Corp. sold a building to Beta Company for $2,000,000. The building had a carrying value of $1,500,000. Beta Company is a subsidiary of Maxwell Corp. that is consolidated in Maxwell's financial statements.

Which of these transactions requires disclosure as a related party transaction in Maxwell Corp.'s 2023 financial statements?

**Options:**
- ✓ **A:** Only the sale of goods to Minos LLC and the lease of office space from Zenith Properties require disclosure, as the loan to Alpha Investments was made at a publicly available interest rate.
-   **B:** Only the sale of goods to Minos LLC, the lease of office space from Zenith Properties, and the loan to Alpha Investments.
-   **C:** Only the loan to Alpha Investments requires disclosure because it represents a transfer of resources or obligations between related parties at terms unfavorable to Maxwell Corp.
-   **D:** All of the transactions require disclosure, including the sale to Beta Company, as intercompany transactions must always be disclosed regardless of consolidation practices or materiality thresholds.

**Marked Correct Answer:** A (index 0)

**Explanation:**
> Under the fair value option, changes in fair value and interest expense are recognized in profit or loss. The bond's fair value decreased by $200,000 ($5,000,000 - $4,800,000). Interest expense is $300,000 (6% * $5,000,000). The total impact on profit or loss is a $200,000 decrease due to the fair value change and a $300,000 decrease from interest expense, totaling a $500,000 decrease. (ASC 815)

[ID=bar-gen-1421]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - The loan to Alpha Investments also requires disclosure because the interest rate was below market rate, indicating a potential benefit conferred to the related party.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - The loan to Alpha Investments also requires disclosure because the interest rate was below market rate, indicating a potential benefit conferred to the related party.",
  "2": "Why option C is WRONG - While the loan to Alpha Investments does require disclosure, the sale of goods and the lease also require disclosure due to the related party relationships involved.",
  "3": "Why option D is WRONG - The sale to Beta Company is eliminated in consolidation and does not require separate disclosure as a related party transaction."
}
```

---

### `bar-gen-1475`

**Topic:** Ratio analysis / Segment Reporting
**Blueprint Area:** BAR-IV

**Question:**
> Apex Corp. operates in three reportable segments: Alpha, Beta, and Gamma. Alpha had revenue of $30 million and operating profit of $6 million. Beta had revenue of $25 million and operating profit of $4 million. Gamma had revenue of $20 million and an operating loss of $2 million. Apex also has corporate overhead (not allocated to segments) of $3 million. For the year ended December 31, 2023, what is the amount of consolidated operating profit/loss that Apex Corp. should report, and how is the reportable segment(s) profitability threshold determined?

**Options:**
- ✓ **A:** Consolidated operating profit of $5 million, profitability threshold determined by 10% of the combined revenue of all segments.
-   **B:** Consolidated operating profit of $5 million, profitability threshold determined by 10% of the combined operating profit of all profitable segments.
-   **C:** Consolidated operating profit of $7 million, profitability threshold determined by 10% of the combined revenue of all segments.
-   **D:** Consolidated operating profit of $7 million, profitability threshold determined by 10% of the combined operating profit of all profitable segments.

**Marked Correct Answer:** A (index 0)

**Explanation:**
> The profit or loss test requires comparing the absolute value of each segment's profit or loss to the combined profit of all profitable segments or the combined loss of all segments reporting a loss, whichever is greater. The total profit of profitable segments is $600,000 + $400,000 + $150,000 = $1,150,000. The total loss of unprofitable segments is $250,000 + $50,000 = $300,000. $1,150,000 is greater. 10% of $1,150,000 = $115,000. The reporting threshold is therefore $115,000. Per ASC 280-10-50-12, a segment is significant and therefore reportable if its operating profit or loss is 10 percent or more of the greater, in absolute amount, of (1) The combined operating profit of all operating segments that did not report an operating loss. (2) The combined operating loss of all operating segments that did report an operating loss.
```

```
[ID=bar-gen-1475]

**Problems Found:**

⚠️ **whyWrong[3] (Option D)** says this is CORRECT, but the correctAnswer is A:
> Option D is CORRECT because consolidated operating profit is calculated by summing segment profits/losses and subtracting unallocated corporate overhead ($6M + $4M - $2M - $3M = $5M). The profitability threshold is 10% of the combined operating profit of profitable segments: ($6M + $4M) * 10% = $1M. A segment is reportable if its operating profit or loss is 10% or more of the combined operating profit of all segments that did not report a loss.

**whyWrong (Full):**
```json
{
  "0": "Option A is incorrect because it miscalculates the consolidated operating profit and uses the wrong base (combined revenue) for the profitability threshold calculation.",
  "1": "Option B is incorrect because while it correctly identifies the base for the profitability threshold (combined operating profit of profitable segments), it miscalculates the consolidated operating profit by not subtracting the corporate overhead correctly.",
  "2": "Option C is incorrect because it correctly identifies the base for the profitability threshold (combined operating profit of profitable segments), but miscalculates the consolidated operating profit by not subtracting the corporate overhead correctly.",
  "3": "Option D is CORRECT because consolidated operating profit is calculated by summing segment profits/losses and subtracting unallocated corporate overhead ($6M + $4M - $2M - $3M = $5M). The profitability threshold is 10% of the combined operating profit of profitable segments: ($6M + $4M) * 10% = $1M. A segment is reportable if its operating profit or loss is 10% or more of the combined operating profit of all segments that did not report a loss."
}
```

---

### `bar-gen-1491`

**Topic:** Ratio analysis / Segment Reporting
**Blueprint Area:** BAR-IV

**Question:**
> XYZ Corp. operates in three segments: Alpha, Beta, and Gamma. For the year ended December 31, 2024, Alpha's revenue was $7,000,000, Beta's revenue was $14,000,000, and Gamma's revenue was $4,000,000. Total revenue for XYZ Corp. was $25,000,000. Which segment(s) are reportable based on the revenue test?

**Options:**
- ✓ **A:** Beta only
-   **B:** Alpha and Beta only
-   **C:** Alpha, Beta, and Gamma
-   **D:** None of the segments are reportable.

**Marked Correct Answer:** A (index 0)

**Explanation:**
> The profit or loss test requires comparing the absolute value of each segment's profit or loss to the combined profit of all profitable segments or the combined loss of all segments reporting a loss, whichever is greater. The total profit of profitable segments is $600,000 + $400,000 + $150,000 = $1,150,000. The total loss of unprofitable segments is $250,000 + $50,000 = $300,000. $1,150,000 is greater. 10% of $1,150,000 = $115,000. The reporting threshold is therefore $115,000. Per ASC 280-10-50-12, a segment is significant and therefore reportable if its operating profit or loss is 10 percent or more of the greater, in absolute amount, of (1) The combined operating profit of all operating segments that did not report an operating loss. (2) The combined operating loss of all operating segments that did report an operating loss.
```

```
[ID=bar-gen-1475]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - Beta is reportable, but Alpha also meets the 10% revenue test and is therefore also reportable.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - A segment is reportable if its revenue is 10% or more of the combined revenue of all operating segments. Alpha and Beta both exceed the $2,500,000 threshold (10% of $25,000,000), making them reportable.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - Beta is reportable, but Alpha also meets the 10% revenue test and is therefore also reportable.",
  "1": "Why option B is CORRECT - A segment is reportable if its revenue is 10% or more of the combined revenue of all operating segments. Alpha and Beta both exceed the $2,500,000 threshold (10% of $25,000,000), making them reportable.",
  "2": "Why option C is WRONG - While Alpha and Beta are reportable, Gamma's revenue of $4,000,000 exceeds the 10% threshold of $2,500,000, making it also reportable. The explanation incorrectly states Gamma does not exceed the threshold.",
  "3": "Why option D is WRONG - Both Alpha and Beta have revenues exceeding 10% of the total consolidated revenue, making them reportable segments."
}
```

---

### `bar-gen-1494`

**Topic:** Reconciliations / Adjusting vs. Non-Adjusting Subsequent Events
**Blueprint Area:** BAR-III

**Question:**
> ABC Corp's year-end is December 31, 2023, and the financial statements were issued on March 15, 2024. On February 10, 2024, a customer representing 15% of ABC Corp's 2023 accounts receivable balance filed for bankruptcy. ABC Corp. is virtually certain to not recover any of the receivable balance. In addition, on March 1, 2024, ABC Corp. settled a lawsuit related to a product safety issue for $500,000. The lawsuit was originally filed in 2022, and ABC Corp. had accrued a liability of $300,000 related to this lawsuit as of December 31, 2023. What is the total amount of adjustment, if any, that ABC Corp. should record to its 2023 financial statements due to these subsequent events?

**Options:**
- ✓ **A:** $200,000
-   **B:** $300,000
-   **C:** $500,000
-   **D:** Accounts receivable write-off and lawsuit settlement are non-adjusting events and do not need to be recorded in the 2023 financial statements.

**Marked Correct Answer:** A (index 0)

**Explanation:**
> The profit or loss test requires comparing the absolute value of each segment's profit or loss to the combined profit of all profitable segments or the combined loss of all segments reporting a loss, whichever is greater. The total profit of profitable segments is $600,000 + $400,000 + $150,000 = $1,150,000. The total loss of unprofitable segments is $250,000 + $50,000 = $300,000. $1,150,000 is greater. 10% of $1,150,000 = $115,000. The reporting threshold is therefore $115,000. Per ASC 280-10-50-12, a segment is significant and therefore reportable if its operating profit or loss is 10 percent or more of the greater, in absolute amount, of (1) The combined operating profit of all operating segments that did not report an operating loss. (2) The combined operating loss of all operating segments that did report an operating loss.
```

```
[ID=bar-gen-1475]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - This option only considers the incremental adjustment to the lawsuit liability but fails to include the accounts receivable write-off due to the customer's bankruptcy.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - Both the customer's bankruptcy and the lawsuit settlement provide information about conditions that existed at the balance sheet date, making them adjusting events. The accounts receivable write-off is 15% of the AR balance, and the lawsuit liability adjustment is $200,000 ($500,000 - $300,000), totaling $300,000.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This option only considers the incremental adjustment to the lawsuit liability but fails to include the accounts receivable write-off due to the customer's bankruptcy.",
  "1": "Why option B is CORRECT - Both the customer's bankruptcy and the lawsuit settlement provide information about conditions that existed at the balance sheet date, making them adjusting events. The accounts receivable write-off is 15% of the AR balance, and the lawsuit liability adjustment is $200,000 ($500,000 - $300,000), totaling $300,000.",
  "2": "Why option C is WRONG - This option only considers the total settlement amount of the lawsuit and ignores the accounts receivable write-off and the liability already accrued.",
  "3": "Why option D is WRONG - Both the customer's bankruptcy and the lawsuit settlement provide significant new information about conditions that existed at the balance sheet date, requiring adjustment to the financial statements."
}
```

---

### `bar-gen-1513`

**Topic:** Intercompany transactions / Disclosure Requirements
**Blueprint Area:** BAR-I

**Question:**
> Alpha Corp. sold land to Beta Co. for $500,000 on January 1, Year 1. Beta Co. is wholly-owned by the son of Alpha Corp.'s CEO. Alpha Corp.'s cost basis for the land was $300,000. In Alpha Corp.'s Year 1 financial statements, what amount of gain, if any, should be disclosed related to this transaction?

**Options:**
- ✓ **A:** A gain of $200,000 should be recognized, as the transaction price represents fair value in an arm's length sale, regardless of the relationship.
-   **B:** A gain of $500,000 should be recognized, representing the total proceeds from the sale, as intercompany transactions are always recorded at gross value.
-   **C:** A gain of $300,000 should be recognized, reflecting the original cost basis; related party transactions require gains to be capped at the asset's historical cost.
-   **D:** The transaction should be disclosed, but the gain does not need to be specifically quantified.

**Marked Correct Answer:** A (index 0)

**Explanation:**
> The profit or loss test requires comparing the absolute value of each segment's profit or loss to the combined profit of all profitable segments or the combined loss of all segments reporting a loss, whichever is greater. The total profit of profitable segments is $600,000 + $400,000 + $150,000 = $1,150,000. The total loss of unprofitable segments is $250,000 + $50,000 = $300,000. $1,150,000 is greater. 10% of $1,150,000 = $115,000. The reporting threshold is therefore $115,000. Per ASC 280-10-50-12, a segment is significant and therefore reportable if its operating profit or loss is 10 percent or more of the greater, in absolute amount, of (1) The combined operating profit of all operating segments that did not report an operating loss. (2) The combined operating loss of all operating segments that did report an operating loss.
```

```
[ID=bar-gen-1475]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - While the calculation is correct ($500,000 - $300,000), related party transactions require disclosure, and the gain may not be recognized at all, or may be recognized differently depending on the accounting standards applied. The key is the disclosure requirement, not necessarily the immediate recognition of the full gain.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - While the calculation is correct ($500,000 - $300,000), related party transactions require disclosure, and the gain may not be recognized at all, or may be recognized differently depending on the accounting standards applied. The key is the disclosure requirement, not necessarily the immediate recognition of the full gain.",
  "1": "Why option B is WRONG - The $500,000 represents the sale price, not the gain. Furthermore, related party transactions are not always recorded at gross value; they often require special consideration and disclosure, and may affect the amount of gain recognized.",
  "2": "Why option C is WRONG - The $300,000 represents the original cost basis, not the gain. While related party transactions do require scrutiny, they don't automatically limit the gain to the original cost basis. The gain is calculated as the difference between the sale price and the cost basis, but the recognition of that gain may be affected by the related party nature of the transaction."
}
```

---

### `bar-gen-1594`

**Topic:** Cost-volume-profit analysis / Multi-Product Break-Even
**Blueprint Area:** BAR-IV

**Question:**
> Gadget Co. sells two products, Alpha and Beta. Alpha sells for $50 and has a variable cost of $30. Beta sells for $80 and has a variable cost of $40. Gadget Co.'s fixed costs are $600,000. Gadget Co. sells twice as many units of Alpha as Beta. What is the break-even point in units for Beta?

**Options:**
-   **A:** 5,000
-   **B:** 10,000
- ✓ **C:** 15,000
-   **D:** 20,000

**Marked Correct Answer:** C (index 2)

**Explanation:**
> The debt-to-equity ratio is calculated as total liabilities divided by equity. After the expansion, total liabilities become $2,000,000 + $1,500,000 = $3,500,000. Equity remains at $3,000,000. Thus, the debt-to-equity ratio is $3,500,000 / $3,000,000 = 1.17.

The times interest earned ratio is calculated as EBIT divided by interest expense. New interest expense is $1,500,000 * 8% = $120,000. Total interest expense is $100,000 + $120,000 = $220,000. The times interest earned ratio is $800,000 / $220,000 = 3.64.

[ID=bar-gen-1583]

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is C:
> Why option B is CORRECT - The break-even point for Beta is calculated by first determining the weighted-average contribution margin based on the sales mix (2:1 for Alpha:Beta), then dividing total fixed costs by this margin to find the total break-even units. Finally, divide the total break-even units by 3 to find the break-even units for Beta.

⚠️ **whyWrong[2] (Option C)** says this is WRONG, but it IS the correct answer:
> Why option C is WRONG - This answer is too high. It might arise from incorrectly applying the sales mix or not properly allocating the total break-even units between Alpha and Beta.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This answer is too low. It likely results from incorrectly calculating the weighted-average contribution margin or misinterpreting the sales mix ratio.",
  "1": "Why option B is CORRECT - The break-even point for Beta is calculated by first determining the weighted-average contribution margin based on the sales mix (2:1 for Alpha:Beta), then dividing total fixed costs by this margin to find the total break-even units. Finally, divide the total break-even units by 3 to find the break-even units for Beta.",
  "2": "Why option C is WRONG - This answer is too high. It might arise from incorrectly applying the sales mix or not properly allocating the total break-even units between Alpha and Beta.",
  "3": "Why option D is WRONG - This answer is significantly too high. It could be the result of a calculation error in determining the weighted average contribution margin or misinterpreting the sales mix."
}
```

---

### `bar-gen-1596`

**Topic:** Variance analysis / Sales Mix Variance
**Blueprint Area:** BAR-IV

**Question:**
> Apex Co. sells two products, Alpha and Beta. The budgeted sales mix is 60% Alpha and 40% Beta. The budgeted contribution margin is $10 per unit for Alpha and $15 per unit for Beta. Actual sales were 1,000 units of Alpha and 1,000 units of Beta. What is the sales mix variance?

**Options:**
-   **A:** $2,000 Unfavorable
-   **B:** $2,000 Favorable
- ✓ **C:** $5,000 Unfavorable
-   **D:** $5,000 Favorable

**Marked Correct Answer:** C (index 2)

**Explanation:**
> The debt-to-equity ratio is calculated as total liabilities divided by equity. After the expansion, total liabilities become $2,000,000 + $1,500,000 = $3,500,000. Equity remains at $3,000,000. Thus, the debt-to-equity ratio is $3,500,000 / $3,000,000 = 1.17.

The times interest earned ratio is calculated as EBIT divided by interest expense. New interest expense is $1,500,000 * 8% = $120,000. Total interest expense is $100,000 + $120,000 = $220,000. The times interest earned ratio is $800,000 / $220,000 = 3.64.

[ID=bar-gen-1583]

**Problems Found:**

⚠️ **whyWrong[2] (Option C)** says this is WRONG, but it IS the correct answer:
> Why option C is WRONG - This is a significantly incorrect calculation. The sales mix variance is not this large given the provided data and the relative changes in sales mix.

⚠️ **whyWrong[3] (Option D)** says this is CORRECT, but the correctAnswer is C:
> Why option D is CORRECT - The sales mix variance measures the impact on profit due to changes in the proportion of products sold. Because the actual sales mix shifted towards the higher contribution margin product (Beta), the variance is favorable. The calculation is as follows: Budgeted sales mix: Alpha (1200 units), Beta (800 units). Actual sales mix: Alpha (1000 units), Beta (1000 units). Sales mix variance = (Actual units of Alpha - Budgeted units of Alpha) * CM of Alpha + (Actual units of Beta - Budgeted units of Beta) * CM of Beta = (1000-1200)*$10 + (1000-800)*$15 = -$2,000 + $3,000 = $1,000 favorable.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - An unfavorable variance means the actual sales mix resulted in a lower contribution margin than the budgeted sales mix. Since more of the higher-margin product was sold, the variance is favorable, not unfavorable.",
  "1": "Why option B is WRONG - While the variance is favorable, the calculation is incorrect. This option likely arises from an incomplete or incorrect application of the sales mix variance formula.",
  "2": "Why option C is WRONG - This is a significantly incorrect calculation. The sales mix variance is not this large given the provided data and the relative changes in sales mix.",
  "3": "Why option D is CORRECT - The sales mix variance measures the impact on profit due to changes in the proportion of products sold. Because the actual sales mix shifted towards the higher contribution margin product (Beta), the variance is favorable. The calculation is as follows: Budgeted sales mix: Alpha (1200 units), Beta (800 units). Actual sales mix: Alpha (1000 units), Beta (1000 units). Sales mix variance = (Actual units of Alpha - Budgeted units of Alpha) * CM of Alpha + (Actual units of Beta - Budgeted units of Beta) * CM of Beta = (1000-1200)*$10 + (1000-800)*$15 = -$2,000 + $3,000 = $1,000 favorable."
}
```

---

### `bar-9k-002`

**Topic:** Business Valuation
**Blueprint Area:** BAR-II

**Question:**
> GreenThumb Gardens is considering a project with the following cash flows: Initial Investment of $200,000, Year 1: $60,000, Year 2: $80,000, Year 3: $90,000, and Year 4: $70,000. The company's cost of capital is 10%. What is the approximate Net Present Value (NPV) of the project?

**Options:**
- ✓ **A:** $17,850
-   **B:** $15,920
-   **C:** $20,340
-   **D:** $22,560

**Marked Correct Answer:** A (index 0)

**Explanation:**
> The company's policy is to investigate variances exceeding $5,000 or 5% of the standard cost, whichever is higher.
*   Direct Material Price Variance: $6,000 (U). 5% of $150,000 = $7,500. Since $6,000 < $7,500, the $7,500 threshold applies. However, $6,000 > $5,000, so the $5,000 threshold also applies. Since the variance exceeds both thresholds, it should be investigated.
*   Direct Labor Rate Variance: $4,000 (F). 5% of $70,000 = $3,500. Since $4,000 > $3,500, the $4,000 variance exceeds the 5% threshold. However, $4,000 < $5,000, so the $5,000 threshold does not apply.
*   Variable Overhead Spending Variance: $3,000 (U). 5% of $50,000 = $2,500. Since $3,000 > $2,500, the $3,000 variance exceeds the 5% threshold. However, $3,000 < $5,000, so the $5,000 threshold does not apply.
Therefore, only the direct material price variance should be investigated.

```

```
[ID=bar-gen-1600]

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Option B is correct as it represents the correct calculation of the present value of all cash flows less the initial investment.

**whyWrong (Full):**
```json
{
  "0": "Option A is incorrect because it does not accurately discount all cash flows and subtract the initial investment.",
  "1": "Option B is correct as it represents the correct calculation of the present value of all cash flows less the initial investment.",
  "2": "Option C is incorrect because it does not accurately discount all cash flows and subtract the initial investment.",
  "3": "Option D is incorrect because it does not accurately discount all cash flows and subtract the initial investment."
}
```

---


## FAR (18 issues)

### `far-cons-052`

**Topic:** Equity method investments / Intercompany Eliminations
**Blueprint Area:** FAR-II

**Question:**
> Parent Co. sells goods to its subsidiary, Sub Co. Some of these goods remain in Sub Co.'s ending inventory. In the consolidated financial statements, how is the intercompany profit in the ending inventory treated?

**Options:**
-   **A:** Never eliminated, as the intercompany profit is considered realized from a consolidated perspective.
- ✓ **B:** Eliminated against the selling entity's retained earnings, regardless of upstream or downstream sales.
-   **C:** Recognized as a deferred revenue on the consolidated balance sheet until Sub Co. sells the goods to an outside party.
-   **D:** Eliminated from consolidated inventory and profit, allocated to NCI only in downstream sales

**Marked Correct Answer:** B (index 1)

**Explanation:**
> Unrealized intercompany profit in ending inventory is eliminated against the selling entity's retained earnings. For downstream sales (parent to sub), 100% is eliminated against the parent. For upstream sales (sub to parent), 100% is still eliminated against the subsidiary's retained earnings, with NCI absorbing their proportionate share of the elimination.

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is WRONG, but it IS the correct answer:
> Why option B is WRONG - While elimination does impact retained earnings, the allocation of the elimination between controlling and non-controlling interest depends on whether the sale was upstream or downstream.

⚠️ **whyWrong[3] (Option D)** says this is CORRECT, but the correctAnswer is B:
> Why option D is CORRECT - Unrealized intercompany profit must be eliminated from consolidated inventory and profit. In downstream sales, the entire elimination impacts the controlling interest. In upstream sales, the NCI shares in the elimination because the subsidiary's income is used to calculate the NCI's share of consolidated net income.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - Intercompany profit must be eliminated to present fairly the consolidated financial position. The profit is unrealized from the consolidated entity's viewpoint until sold to an outside party.",
  "1": "Why option B is WRONG - While elimination does impact retained earnings, the allocation of the elimination between controlling and non-controlling interest depends on whether the sale was upstream or downstream.",
  "2": "Why option C is WRONG - Intercompany profit is not deferred revenue. It is an unrealized profit that needs to be eliminated from both inventory and cost of goods sold.",
  "3": "Why option D is CORRECT - Unrealized intercompany profit must be eliminated from consolidated inventory and profit. In downstream sales, the entire elimination impacts the controlling interest. In upstream sales, the NCI shares in the elimination because the subsidiary's income is used to calculate the NCI's share of consolidated net income."
}
```

---

### `far-d14-014`

**Topic:** Equity method investments / NCI Measurement at Acquisition
**Blueprint Area:** FAR-II

**Question:**
> Under ASC 805, at the acquisition date, the noncontrolling interest (NCI) in the acquiree can be measured at:

**Options:**
- ✓ **A:** Only the NCI's proportionate share of the acquiree's identifiable net assets, reflecting the acquirer's accounting policy choice to consistently apply this method across all business combinations.
-   **B:** Always at fair value, determined using valuation techniques such as discounted cash flow analysis or market multiples, regardless of the acquirer's accounting policy election or the availability of reliable fair value data.
-   **C:** EITHER fair value of the NCI OR the NCI's proportionate share of the acquiree's identifiable net assets (an accounting policy election made on a transaction-by-transaction basis)
-   **D:** The NCI's proportionate share of the acquiree's book value, adjusted for any necessary write-downs to reflect impairment losses recognized by the acquiree prior to the acquisition date.

**Marked Correct Answer:** A (index 0)

**Explanation:**
> Under ASC 805-20-30-2, NCI can be measured using TWO methods (accounting policy election made per transaction): (1) FULL GOODWILL method: NCI at FAIR VALUE → goodwill reflects both the parent's and NCI's shares. (2) PARTIAL GOODWILL method: NCI at proportionate share of identifiable net assets at fair value → goodwill reflects ONLY the parent's excess. Example: Subsidiary FV net assets = $1M, NCI = 20%. Method 1: NCI = FV (e.g., $220,000 — may include premium). Goodwill includes full entity premium. Method 2: NCI = 20% × $1M = $200,000. Goodwill reflects only parent's excess. The choice affects the goodwill amount and subsequent impairment testing.

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - While the proportionate share of identifiable net assets is *an* allowable method, it is not the *only* method. Fair value is also an acceptable measurement basis, and the acquirer makes an accounting policy election on a transaction-by-transaction basis.

⚠️ **whyWrong[2] (Option C)** says this is CORRECT, but the correctAnswer is A:
> Why option C is CORRECT - ASC 805 allows companies to choose between measuring NCI at fair value or at its proportionate share of the acquiree's net assets. This choice is made on a deal-by-deal basis and is an accounting policy election.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - While the proportionate share of identifiable net assets is *an* allowable method, it is not the *only* method. Fair value is also an acceptable measurement basis, and the acquirer makes an accounting policy election on a transaction-by-transaction basis.",
  "1": "Why option B is WRONG - While fair value is *an* allowable method, it is not the *only* method. The acquirer can elect to measure NCI at its proportionate share of the acquiree's identifiable net assets. The fair value method is not mandatory.",
  "2": "Why option C is CORRECT - ASC 805 allows companies to choose between measuring NCI at fair value or at its proportionate share of the acquiree's net assets. This choice is made on a deal-by-deal basis and is an accounting policy election.",
  "3": "Why option D is WRONG - Book value is not an acceptable measurement basis for NCI under ASC 805. The NCI should be measured at either fair value or the proportionate share of identifiable *net assets* (which are fair valued), not book value."
}
```

---

### `far-d16-006`

**Topic:** Performance obligations / Contract Modifications
**Blueprint Area:** FAR-III

**Question:**
> An entity has an existing contract to provide 100 units at $10 each. After delivering 60 units, the contract is modified to add 20 units at $8 each (a standalone selling price of $9.50). The modification should be:

**Options:**
-   **A:** Treated as a separate contract because the additional goods are distinct and the price change is not significant enough to impact the original contract's economics.
- ✓ **B:** Treated as a termination of the existing contract and creation of a new contract because the modification represents a substantial change in the scope and price of the agreement.
-   **C:** Accounted for as a modification of the existing contract using a cumulative catch-up adjustment because the additional goods are NOT at standalone selling price
-   **D:** Ignored because the units are already partially delivered, and the modification only affects the remaining undelivered portion, which can be accounted for prospectively.

**Marked Correct Answer:** B (index 1)

**Explanation:**
> Under ASC 606-10-25-12, when a contract modification adds goods that are distinct but the price does not reflect standalone selling prices, the modification is treated as a termination of the existing contract and creation of a new contract. Here, the additional units are at $8, not the standalone price of $9.50, so the modification does not qualify as a separate contract. The remaining goods (40 original + 20 additional) are combined into a new contract.

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is WRONG, but it IS the correct answer:
> Why option B is WRONG - The contract modification does not fundamentally change the nature of the original contract; it's an adjustment to the existing agreement, not a complete replacement. Termination and creation of a new contract is not appropriate here.

⚠️ **whyWrong[2] (Option C)** says this is CORRECT, but the correctAnswer is B:
> Why option C is CORRECT - When a contract modification doesn't qualify as a separate contract, the entity accounts for the modification prospectively. This means the remaining goods (including the modified quantity) are accounted for under the adjusted contract terms, with a cumulative catch-up adjustment to revenue.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - The additional goods are not being sold at their standalone selling price, so it cannot be treated as a separate contract. The distinct nature of the goods is only one factor in determining if it's a separate contract.",
  "1": "Why option B is WRONG - The contract modification does not fundamentally change the nature of the original contract; it's an adjustment to the existing agreement, not a complete replacement. Termination and creation of a new contract is not appropriate here.",
  "2": "Why option C is CORRECT - When a contract modification doesn't qualify as a separate contract, the entity accounts for the modification prospectively. This means the remaining goods (including the modified quantity) are accounted for under the adjusted contract terms, with a cumulative catch-up adjustment to revenue.",
  "3": "Why option D is WRONG - The modification must be accounted for, even if partially delivered. Ignoring it would misrepresent the revenue recognition for the remaining units and the overall contract."
}
```

---

### `far-d16-015`

**Topic:** Cost flow assumptions (FIFO, LIFO, Weighted Avg) / Inventory Cost Flow Methods
**Blueprint Area:** FAR-II

**Question:**
> A company has the following inventory data: Beginning inventory: 100 units @ $10; Purchase 1: 200 units @ $12; Purchase 2: 150 units @ $14. If 300 units were sold, what is the cost of goods sold under FIFO?

**Options:**
-   **A:** $3,200, calculated as (100 × $10) + (175 × $12)
- ✓ **B:** $3,400, calculated as (100 × $10) + (200 × $12)
-   **C:** $3,500, calculated as using average cost method
-   **D:** $3,600, calculated as using LIFO method

**Marked Correct Answer:** B (index 1)

**Explanation:**
> Under FIFO, the first units purchased are the first sold. With 300 units sold: 100 units from beginning inventory at $10 = $1,000, plus 200 units from the first purchase at $12 = $2,400. Total COGS = $1,000 + $2,400 = $3,400.

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is WRONG, but it IS the correct answer:
> Why option B is WRONG - This calculation incorrectly assigns the first 100 units sold at the price of the last purchase and the next 200 at the beginning inventory price, which is incorrect under FIFO.

⚠️ **whyWrong[3] (Option D)** says this is CORRECT, but the correctAnswer is B:
> Why option D is CORRECT - Under FIFO, the first units purchased are assumed to be the first units sold. Therefore, the Cost of Goods Sold (COGS) is (100 units * $10) + (200 units * $12) = $1,000 + $2,400 = $3,400.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This calculation incorrectly uses the most recent purchases first, rather than the oldest, violating the FIFO principle.",
  "1": "Why option B is WRONG - This calculation incorrectly assigns the first 100 units sold at the price of the last purchase and the next 200 at the beginning inventory price, which is incorrect under FIFO.",
  "2": "Why option C is WRONG - This calculation assumes all 300 units were sold from the last purchase, ignoring the beginning inventory and first purchase, which is not FIFO.",
  "3": "Why option D is CORRECT - Under FIFO, the first units purchased are assumed to be the first units sold. Therefore, the Cost of Goods Sold (COGS) is (100 units * $10) + (200 units * $12) = $1,000 + $2,400 = $3,400."
}
```

---

### `far-d20-011`

**Topic:** Goodwill impairment / NCI at Acquisition
**Blueprint Area:** FAR-II

**Question:**
> Parent Corp acquires 80% of Sub Corp for $4,000,000. The fair value of Sub's identifiable net assets is $4,500,000. Under ASC 805, the noncontrolling interest is measured at its fair value of $1,100,000. What amount of goodwill is recognized?

**Options:**
-   **A:** $500,000
- ✓ **B:** $400,000
-   **C:** No goodwill — this is a bargain purchase
-   **D:** $600,000

**Marked Correct Answer:** B (index 1)

**Explanation:**
> Under ASC 805-20-30-1, when the acquirer elects to measure NCI at fair value (full goodwill method): Goodwill = (Consideration + NCI at fair value) – Fair value of identifiable net assets = ($4,000,000 + $1,100,000) – $4,500,000 = $600,000. The full goodwill method attributes goodwill to both the controlling and noncontrolling interests. If the proportionate share method were used instead, NCI would be measured at its proportionate share of net assets ($4,500,000 × 20% = $900,000), and goodwill would be $400,000 ($4,000,000 + $900,000 – $4,500,000). ASC 805 allows a choice between the two methods.

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is WRONG, but it IS the correct answer:
> Why option B is WRONG - $400,000 would be the goodwill if the *proportionate share* method was used to value the NCI, not the *fair value* method as stated in the question.

⚠️ **whyWrong[3] (Option D)** says this is CORRECT, but the correctAnswer is B:
> Why option D is CORRECT - Goodwill under the full goodwill method is calculated as (Consideration Paid + Fair Value of NCI) - Fair Value of Identifiable Net Assets. In this case, ($4,000,000 + $1,100,000) - $4,500,000 = $600,000.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - $500,000 is incorrect because it doesn't accurately reflect the goodwill calculation using the full goodwill method, which includes the fair value of the noncontrolling interest.",
  "1": "Why option B is WRONG - $400,000 would be the goodwill if the *proportionate share* method was used to value the NCI, not the *fair value* method as stated in the question.",
  "2": "Why option C is WRONG - A bargain purchase only occurs when the consideration transferred plus the NCI is *less* than the fair value of the identifiable net assets acquired. Here, $5,100,000 exceeds $4,500,000, so it's not a bargain purchase.",
  "3": "Why option D is CORRECT - Goodwill under the full goodwill method is calculated as (Consideration Paid + Fair Value of NCI) - Fair Value of Identifiable Net Assets. In this case, ($4,000,000 + $1,100,000) - $4,500,000 = $600,000."
}
```

---

### `far-d9-011`

**Topic:** Deferred tax assets and liabilities / Effective Tax Rate Reconciliation
**Blueprint Area:** FAR-III

**Question:**
> A company reports pre-tax book income of $1,000,000. It has $50,000 in tax-exempt municipal bond interest and $30,000 in nondeductible fines. The statutory tax rate is 21%. What is the total income tax expense?

**Options:**
-   **A:** $210,000
- ✓ **B:** $205,800 — based on taxable income of $980,000
-   **C:** $193,200
-   **D:** $226,800

**Marked Correct Answer:** B (index 1)

**Explanation:**
> To determine income tax expense: Start with pre-tax book income ($1,000,000). Permanent differences: Tax-exempt interest ($50,000) reduces taxable income permanently, nondeductible fines ($30,000) increase taxable income permanently. Taxable income = $1,000,000 − $50,000 + $30,000 = $980,000. Income tax expense = $980,000 × 21% = $205,800.

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is WRONG, but it IS the correct answer:
> Why option B is WRONG - This answer correctly calculates taxable income by adjusting for permanent differences, but it incorrectly assumes that the resulting amount is the total income tax expense. The question asks for total income tax expense, and this calculation only represents the current tax expense.

⚠️ **whyWrong[2] (Option C)** says this is CORRECT, but the correctAnswer is B:
> Why option C is CORRECT - The total income tax expense is calculated by first adjusting pre-tax book income for permanent differences to arrive at taxable income ($1,000,000 - $50,000 + $30,000 = $980,000). Then, multiply the taxable income by the statutory tax rate ($980,000 * 21% = $205,800).

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This answer simply multiplies the pre-tax book income by the tax rate, ignoring the permanent differences that affect taxable income.",
  "1": "Why option B is WRONG - This answer correctly calculates taxable income by adjusting for permanent differences, but it incorrectly assumes that the resulting amount is the total income tax expense. The question asks for total income tax expense, and this calculation only represents the current tax expense.",
  "2": "Why option C is CORRECT - The total income tax expense is calculated by first adjusting pre-tax book income for permanent differences to arrive at taxable income ($1,000,000 - $50,000 + $30,000 = $980,000). Then, multiply the taxable income by the statutory tax rate ($980,000 * 21% = $205,800).",
  "3": "Why option D is WRONG - This answer represents an incorrect calculation, likely stemming from adding the tax-exempt interest instead of subtracting it, or making another error in applying the permanent differences."
}
```

---

### `far-d9-014`

**Topic:** Allowance for credit losses (CECL) / Accounts Receivable Aging — CECL
**Blueprint Area:** FAR-II

**Question:**
> Under the CECL model, a company uses the aging schedule method. Receivables aging shows: Current $500,000 (1% loss rate), 31-60 days $200,000 (3% loss rate), 61-90 days $100,000 (8% loss rate), over 90 days $50,000 (25% loss rate). What is the total allowance for credit losses?

**Options:**
-   **A:** $19,000
-   **B:** $23,500
-   **C:** $27,500
- ✓ **D:** $31,500

**Marked Correct Answer:** D (index 3)

**Explanation:**
> CECL allowance calculation: Current $500,000 × 1% = $5,000; 31-60 days $200,000 × 3% = $6,000; 61-90 days $100,000 × 8% = $8,000; Over 90 days $50,000 × 25% = $12,500. Total = $5,000 + $6,000 + $8,000 + $12,500 = $31,500.

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is D:
> Why option B is CORRECT - The CECL model requires estimating expected credit losses over the life of the receivables. This is done by multiplying each aging category by its corresponding loss rate and summing the results: ($500,000 * 1%) + ($200,000 * 3%) + ($100,000 * 8%) + ($50,000 * 25%) = $5,000 + $6,000 + $8,000 + $12,500 = $31,500. The answer key is incorrect. The correct answer is $31,500.

⚠️ **whyWrong[3] (Option D)** says this is WRONG, but it IS the correct answer:
> Why option D is WRONG - This incorrectly applies the loss rates twice, resulting in an overstated allowance. The loss rate should only be applied once to each aging category.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This only considers the current and 31-60 day balances, ignoring the 61-90 and over 90 day balances. The CECL model requires considering all expected credit losses over the life of the receivables.",
  "1": "Why option B is CORRECT - The CECL model requires estimating expected credit losses over the life of the receivables. This is done by multiplying each aging category by its corresponding loss rate and summing the results: ($500,000 * 1%) + ($200,000 * 3%) + ($100,000 * 8%) + ($50,000 * 25%) = $5,000 + $6,000 + $8,000 + $12,500 = $31,500. The answer key is incorrect. The correct answer is $31,500.",
  "2": "Why option C is WRONG - This represents the gross receivables balance and doesn't factor in any allowance for credit losses. The allowance reduces the carrying value of receivables.",
  "3": "Why option D is WRONG - This incorrectly applies the loss rates twice, resulting in an overstated allowance. The loss rate should only be applied once to each aging category."
}
```

---

### `far-extra-156`

**Topic:** Fund accounting / Fund Balance Classifications
**Blueprint Area:** FAR-IV

**Question:**
> The City of Sunnyvale is preparing its governmental fund financial statements. Under GASB 54, the most restrictive fund balance classification is:

**Options:**
-   **A:** Nonspendable
-   **B:** Assigned for future projects
- ✓ **C:** Restricted
-   **D:** Committed by the city council

**Marked Correct Answer:** C (index 2)

**Explanation:**
> Under GASB 54, fund balance classifications from most to least restrictive are: Nonspendable (not in spendable form, e.g., inventory, prepaid items), Restricted (externally imposed constraints by creditors, grantors, or laws), Committed (internally imposed by highest-level government decision), Assigned (intended use by government), Unassigned (residual). 'Restricted' represents the most restrictive classification for spendable resources.

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is CORRECT, but the correctAnswer is C:
> Why option A is CORRECT - Nonspendable fund balances represent assets that are not in a spendable form or are legally or contractually required to be maintained intact, making them the most constrained.

⚠️ **whyWrong[2] (Option C)** says this is WRONG, but it IS the correct answer:
> Why option C is WRONG - Restricted fund balances are constrained by external parties, constitutional provisions, or enabling legislation, but these constraints allow spending within those defined purposes, making them less restrictive than nonspendable assets that cannot be spent.

**whyWrong (Full):**
```json
{
  "0": "Why option A is CORRECT - Nonspendable fund balances represent assets that are not in a spendable form or are legally or contractually required to be maintained intact, making them the most constrained.",
  "1": "Why option B is WRONG - Assigned fund balance represents resources the government intends to use for specific purposes, but the intent is not legally binding and is lower in the hierarchy than committed or restricted.",
  "2": "Why option C is WRONG - Restricted fund balances are constrained by external parties, constitutional provisions, or enabling legislation, but these constraints allow spending within those defined purposes, making them less restrictive than nonspendable assets that cannot be spent.",
  "3": "Why option D is WRONG - Committed fund balance represents resources constrained by a formal action of the government's highest level of decision-making authority, but it is still less restrictive than nonspendable or restricted."
}
```

---

### `far-scf-001`

**Topic:** Statement of Cash Flows / Classification
**Blueprint Area:** FAR-I

**Question:**
> During the year, Davis Industries paid $75,000 in interest expense. Under U.S. GAAP, interest paid is classified as:

**Options:**
-   **A:** Financing activity
- ✓ **B:** Either operating or financing
-   **C:** Operating activity
-   **D:** Investing activity

**Marked Correct Answer:** B (index 1)

**Explanation:**
> U.S. GAAP requires interest paid and received to be classified as operating. IFRS allows choice between operating and financing (paid) or operating and investing (received).

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is WRONG, but it IS the correct answer:
> Why option B is WRONG - While IFRS allows for some flexibility in classifying interest paid, U.S. GAAP *specifically* requires it to be classified as an operating activity.

⚠️ **whyWrong[2] (Option C)** says this is CORRECT, but the correctAnswer is B:
> Why option C is CORRECT - Under U.S. GAAP, interest paid is consistently classified as an operating activity because it's considered a normal part of running the business and generating revenue, even if the debt itself is used for investing or financing purposes.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - Financing activities relate to how a company is funded (debt and equity). Interest expense is a result of debt, but the *payment* of interest is not considered a financing activity under U.S. GAAP.",
  "1": "Why option B is WRONG - While IFRS allows for some flexibility in classifying interest paid, U.S. GAAP *specifically* requires it to be classified as an operating activity.",
  "2": "Why option C is CORRECT - Under U.S. GAAP, interest paid is consistently classified as an operating activity because it's considered a normal part of running the business and generating revenue, even if the debt itself is used for investing or financing purposes.",
  "3": "Why option D is WRONG - Investing activities involve the purchase and sale of long-term assets. Interest payments are related to the cost of borrowing money, not the acquisition or disposal of assets."
}
```

---

### `far-wc-080`

**Topic:** Diluted EPS / Diluted EPS
**Blueprint Area:** FAR-III

**Question:**
> Basic EPS is $2.00. Convertible bonds would add $15,000 to income (after-tax) and 10,000 shares if converted. What is diluted EPS if 100,000 shares are outstanding?

**Options:**
-   **A:** $1.86
-   **B:** $2.05
-   **C:** $2.00
- ✓ **D:** $1.95

**Marked Correct Answer:** D (index 3)

**Explanation:**
> Test if bonds are dilutive: Incremental EPS = $15,000 / 10,000 = $1.50. Since $1.50 < $2.00 basic EPS, bonds are dilutive and should be included. Basic income = $2.00 × 100,000 = $200,000. Diluted EPS = ($200,000 + $15,000) / (100,000 + 10,000) = $215,000 / 110,000 = $1.95.

**Problems Found:**

⚠️ **whyWrong[2] (Option C)** says this is CORRECT, but the correctAnswer is D:
> Why option C is CORRECT - Diluted EPS considers the potential dilution from convertible securities. The incremental EPS from the bonds ($1.50) is less than basic EPS ($2.00), indicating dilution. The diluted EPS is calculated as ($200,000 + $15,000) / (100,000 + 10,000) = $1.95.

⚠️ **whyWrong[3] (Option D)** says this is WRONG, but it IS the correct answer:
> Why option D is WRONG - $1.95 is the correct diluted EPS. The question asks for diluted EPS, which incorporates the impact of potentially dilutive securities.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - $1.86 is not the diluted EPS. The calculation of diluted EPS requires adding back the after-tax interest expense related to the convertible bonds and including the potential shares from conversion.",
  "1": "Why option B is WRONG - $2.05 is not the diluted EPS. Diluted EPS will always be lower than basic EPS if the potential conversion is dilutive.",
  "2": "Why option C is CORRECT - Diluted EPS considers the potential dilution from convertible securities. The incremental EPS from the bonds ($1.50) is less than basic EPS ($2.00), indicating dilution. The diluted EPS is calculated as ($200,000 + $15,000) / (100,000 + 10,000) = $1.95.",
  "3": "Why option D is WRONG - $1.95 is the correct diluted EPS. The question asks for diluted EPS, which incorporates the impact of potentially dilutive securities."
}
```

---

### `far-gen-1351`

**Topic:** OPEB / Accrued post-employment benefits liability
**Blueprint Area:** FAR-III

**Question:**
> ABC Corporation sponsors a defined benefit post-retirement health care plan for its employees. The following information pertains to the plan for the year ended December 31, 2023:

*   Accumulated post-retirement benefit obligation (APBO) at January 1, 2023: $3,000,000
*   Service cost: $300,000
*   Interest cost: $240,000
*   Benefits paid: $200,000
*   Actuarial loss due to change in healthcare cost trend rate: $150,000

What is ABC Corporation's accumulated post-retirement benefit obligation (APBO) at December 31, 2023?

**Options:**
- ✓ **A:** $3,490,000
-   **B:** $3,640,000
-   **C:** $3,090,000
-   **D:** $3,140,000

**Marked Correct Answer:** A (index 0)

**Explanation:**
> APBO at December 31, 2023 = Beginning APBO + Service Cost + Interest Cost − Benefits Paid + Actuarial Loss = $3,000,000 + $300,000 + $240,000 − $200,000 + $150,000 = $3,490,000. Per ASC 715, actuarial gains and losses from changes in assumptions or experience adjustments are included in APBO calculations.

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - This answer incorrectly subtracts the actuarial loss instead of adding it, resulting in an understated APBO.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - The accumulated post-retirement benefit obligation (APBO) at year-end is calculated by adding service cost, interest cost, and actuarial losses to the beginning APBO, and then subtracting benefits paid: $3,000,000 + $300,000 + $240,000 - $200,000 + $300,000 = $3,640,000.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This answer incorrectly subtracts the actuarial loss instead of adding it, resulting in an understated APBO.",
  "1": "Why option B is CORRECT - The accumulated post-retirement benefit obligation (APBO) at year-end is calculated by adding service cost, interest cost, and actuarial losses to the beginning APBO, and then subtracting benefits paid: $3,000,000 + $300,000 + $240,000 - $200,000 + $300,000 = $3,640,000.",
  "2": "Why option C is WRONG - This answer only considers the service cost and benefits paid, neglecting the interest cost and actuarial loss which are crucial components of the APBO calculation.",
  "3": "Why option D is WRONG - This answer incorrectly omits the actuarial loss and calculates an incorrect ending APBO."
}
```

---

### `far-gen-1409`

**Topic:** Sale-leaseback transactions / Profit or Loss Recognition
**Blueprint Area:** FAR-III

**Question:**
> On January 1, 2024, Gamma Corp. sold a building with a carrying amount of $800,000 to Delta Leasing for $1,200,000. Gamma immediately leased the building back under a 10-year lease with annual payments of $158,254, payable at the beginning of each year. The building's remaining useful life is 20 years. Gamma's incremental borrowing rate is 6%, which is readily available, and the implicit rate is not readily determinable by Gamma. What amount of profit should Gamma recognize from the sale portion of the sale-leaseback transaction in 2024, assuming the lease is classified as an operating lease?

**Options:**
-   **A:** $0, Because the leaseback is classified as an operating lease, the entire gain is deferred.
- ✓ **B:** $400,000
-   **C:** $200,000
-   **D:** $100,000

**Marked Correct Answer:** B (index 1)

**Explanation:**
> Sale-leaseback accounting under ASC 842 requires evaluating whether control transfers to the buyer-lessor. If the leaseback is an operating lease and the sale criteria are met, the seller-lessee recognizes a sale. If the leaseback results in a finance lease or other conditions indicate a failed sale, different accounting applies. The PV test helps determine lease classification.

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is WRONG, but it IS the correct answer:
> Why option B is WRONG: Recognizing the entire profit of $400,000 is incorrect. With an operating lease in a sale-leaseback, profit recognition is often deferred and amortized over the lease term, unless the sales price is below fair value.

⚠️ **whyWrong[3] (Option D)** says this is CORRECT, but the correctAnswer is B:
> Why option D is CORRECT: When the leaseback is classified as an operating lease, profit is recognized only to the extent the sales price exceeds the asset's fair value. Since the sales price equals the fair value ($1,200,000), the profit ($400,000) is deferred and amortized over the lease term. The amount recognized in 2024 is the profit divided by the lease term: $400,000 / 10 years = $40,000. Therefore, the profit recognized is $40,000, not $100,000. The correct answer is $100,000 because the profit is recognized to the extent that the sales price exceeds the present value of the lease payments. The present value of the lease payments is $158,254 * 7.36009 = $1,164,809. Therefore, the profit recognized is $1,200,000 - $1,164,809 = $35,191. After which, $400,000 - $35,191 = $364,809 is deferred and amortized over the lease term. $364,809/10 = $36,481. Thus, $364,809 - $36,481 = $328,328 is deferred. The profit recognized is $36,481 + $35,191 = $71,672. The closest answer is $100,000.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - While the leaseback is an operating lease, only the portion of the gain exceeding the present value of the lease payments is deferred. The gain up to the present value of the lease payments is recognized immediately.",
  "1": "Why option B is WRONG: Recognizing the entire profit of $400,000 is incorrect. With an operating lease in a sale-leaseback, profit recognition is often deferred and amortized over the lease term, unless the sales price is below fair value.",
  "2": "Why option C is WRONG: Recognizing $200,000 of profit is incorrect. The calculation of profit recognized in a sale-leaseback with an operating lease involves comparing the sales price to the carrying amount and considering the present value of the lease payments.",
  "3": "Why option D is CORRECT: When the leaseback is classified as an operating lease, profit is recognized only to the extent the sales price exceeds the asset's fair value. Since the sales price equals the fair value ($1,200,000), the profit ($400,000) is deferred and amortized over the lease term. The amount recognized in 2024 is the profit divided by the lease term: $400,000 / 10 years = $40,000. Therefore, the profit recognized is $40,000, not $100,000. The correct answer is $100,000 because the profit is recognized to the extent that the sales price exceeds the present value of the lease payments. The present value of the lease payments is $158,254 * 7.36009 = $1,164,809. Therefore, the profit recognized is $1,200,000 - $1,164,809 = $35,191. After which, $400,000 - $35,191 = $364,809 is deferred and amortized over the lease term. $364,809/10 = $36,481. Thus, $364,809 - $36,481 = $328,328 is deferred. The profit recognized is $36,481 + $35,191 = $71,672. The closest answer is $100,000."
}
```

---

### `far-gen-1418`

**Topic:** Basic EPS / Basic EPS
**Blueprint Area:** FAR-III

**Question:**
> During 2023, Zeff Corp. had 200,000 shares of common stock outstanding for the entire year. Zeff also had 10,000 shares of 5%, $100 par value cumulative preferred stock outstanding for the entire year. Net income for 2023 was $900,000. What is Zeff Corp.'s basic earnings per share for 2023?

**Options:**
- ✓ **A:** $4.25
-   **B:** $4.50
-   **C:** $4.75
-   **D:** $4.00

**Marked Correct Answer:** A (index 0)

**Explanation:**
> Basic EPS = (Net income − Preferred dividends) / Weighted-average common shares = ($900,000 − $50,000) / 200,000 = $4.25.

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - This answer incorrectly calculates basic EPS, likely due to an arithmetic error in the final division step or a miscalculation of preferred dividends.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - Basic EPS is calculated by subtracting preferred dividends from net income and dividing the result by the weighted average number of common shares outstanding. In this case, ($900,000 - (10,000 * $100 * 0.05)) / 200,000 = ($900,000 - $50,000) / 200,000 = $850,000 / 200,000 = $4.25.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This answer incorrectly calculates basic EPS, likely due to an arithmetic error in the final division step or a miscalculation of preferred dividends.",
  "1": "Why option B is CORRECT - Basic EPS is calculated by subtracting preferred dividends from net income and dividing the result by the weighted average number of common shares outstanding. In this case, ($900,000 - (10,000 * $100 * 0.05)) / 200,000 = ($900,000 - $50,000) / 200,000 = $850,000 / 200,000 = $4.25.",
  "2": "Why option C is WRONG - This answer is not the result of a common error in the EPS calculation and is likely a distractor value.",
  "3": "Why option D is WRONG - This answer incorrectly calculates basic EPS, possibly by not subtracting preferred dividends from net income before dividing by the weighted average shares outstanding."
}
```

---

### `far-gen-1432`

**Topic:** Fund accounting / Governmental Fund Major Fund Determination
**Blueprint Area:** FAR-IV

**Question:**
> The City of Anytown has the following governmental funds:

*   General Fund: Total assets $5,000,000; Total revenues $12,000,000
*   Special Revenue Fund (Street Maintenance): Total assets $2,500,000; Total revenues $3,000,000
*   Capital Projects Fund (New Library): Total assets $4,000,000; Total revenues $6,000,000
*   Debt Service Fund: Total assets $1,000,000; Total revenues $1,500,000
*   Permanent Fund: Total assets $500,000; Total revenues $250,000

The total governmental funds' assets are $13,000,000, and the total governmental funds' revenues are $22,750,000. Which of the governmental funds are considered major funds?

**Options:**
- ✓ **A:** General Fund, Special Revenue Fund, and Capital Projects Fund
-   **B:** General Fund and Capital Projects Fund
-   **C:** General Fund, Special Revenue Fund, Capital Projects Fund, and Debt Service Fund
-   **D:** General Fund only

**Marked Correct Answer:** A (index 0)

**Explanation:**
> Under GASB 34, the 10% test is applied to determine major governmental funds. Both the General Fund and Special Revenue Fund should be evaluated against the criteria to determine which funds qualify as major funds.

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - While the General Fund and Capital Projects Fund are major funds, the Special Revenue Fund does not meet both the 10% and 5% tests for both assets and revenues, thus it is not necessarily a major fund.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - A fund is considered major if it meets both the 10% of total governmental funds and enterprise funds *and* 5% of total governmental and enterprise funds tests for either assets, liabilities, revenues, or expenditures/expenses. Both the General Fund and Capital Projects Fund satisfy these criteria.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - While the General Fund and Capital Projects Fund are major funds, the Special Revenue Fund does not meet both the 10% and 5% tests for both assets and revenues, thus it is not necessarily a major fund.",
  "1": "Why option B is CORRECT - A fund is considered major if it meets both the 10% of total governmental funds and enterprise funds *and* 5% of total governmental and enterprise funds tests for either assets, liabilities, revenues, or expenditures/expenses. Both the General Fund and Capital Projects Fund satisfy these criteria.",
  "2": "Why option C is WRONG - The Debt Service Fund does not meet the 10% threshold for either assets or revenues when compared to the total governmental funds, so it cannot be considered a major fund.",
  "3": "Why option D is WRONG - While the General Fund is *always* a major fund, the Capital Projects Fund also qualifies as a major fund based on the provided data, making this option incomplete."
}
```

---

### `far-gen-1473`

**Topic:** Cost flow assumptions (FIFO, LIFO, Weighted Avg) / FIFO
**Blueprint Area:** FAR-II

**Question:**
> During the month of October, Lambert Company had the following inventory transactions:

October 1: Beginning inventory: 100 units @ $10 per unit
October 15: Purchase: 200 units @ $12 per unit
October 27: Sale: 250 units @ $15 per unit

Assuming Lambert Company uses the FIFO (first-in, first-out) inventory costing method, what is the cost of goods sold for the October 27 sale?

**Options:**
-   **A:** $2,600
- ✓ **B:** $2,800
-   **C:** $2,700
-   **D:** $2,500

**Marked Correct Answer:** B (index 1)

**Explanation:**
> Under FIFO, 250 units sold consist of: 100 units from beginning inventory at $10 = $1,000, plus 150 units from October 15 purchase at $12 = $1,800. Total COGS = $2,800.

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is WRONG, but it IS the correct answer:
> Why option B is WRONG - $2,900 is not the correct calculation under FIFO. This value may arise from adding the total purchase cost to the beginning inventory cost without correctly accounting for the units sold.

⚠️ **whyWrong[3] (Option D)** says this is CORRECT, but the correctAnswer is B:
> Why option D is CORRECT - Under FIFO (First-In, First-Out), the oldest inventory is assumed to be sold first. Therefore, the 250 units sold consist of the 100 units from beginning inventory at $10/unit and 150 units from the October 15 purchase at $10/unit. Cost of goods sold = (100 units * $10) + (150 units * $10) = $1,000 + $1,500 = $2,500

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - $2,600 is not the correct calculation under FIFO. It likely results from an incorrect allocation of units from beginning inventory and the subsequent purchase.",
  "1": "Why option B is WRONG - $2,900 is not the correct calculation under FIFO. This value may arise from adding the total purchase cost to the beginning inventory cost without correctly accounting for the units sold.",
  "2": "Why option C is WRONG - $2,700 is not the correct calculation under FIFO. This incorrect value could be the result of miscalculating the weighted average cost, which is not applicable under the FIFO method.",
  "3": "Why option D is CORRECT - Under FIFO (First-In, First-Out), the oldest inventory is assumed to be sold first. Therefore, the 250 units sold consist of the 100 units from beginning inventory at $10/unit and 150 units from the October 15 purchase at $10/unit. Cost of goods sold = (100 units * $10) + (150 units * $10) = $1,000 + $1,500 = $2,500"
}
```

---

### `far-gen-1474`

**Topic:** Stock compensation / Stock Options and Employee Compensation
**Blueprint Area:** FAR-II

**Question:**
> Alpha Corp. granted 10,000 stock options to its executives on January 1, Year 1. The options vest ratably over a four-year period (January 1, Year 1 - December 31, Year 4) and have an exercise price of $50 per share. The fair value of each option on the grant date, estimated using an option-pricing model, is $15. All options are expected to vest, and no options were forfeited during Year 1. On January 1, Year 3, Alpha Corp. modifies the options, decreasing the exercise price to $40 per share. The fair value of each option immediately after the modification is $22. What amount of compensation expense should Alpha Corp. recognize related to these stock options for the year ended December 31, Year 3?

**Options:**
-   **A:** $37,500
-   **B:** $60,000
- ✓ **C:** $72,500
-   **D:** $95,000

**Marked Correct Answer:** C (index 2)

**Explanation:**
> Total compensation expense through Year 2 = Year 1 expense + Year 2 expense. With graded vesting, calculate the expense for each tranche. Year 2 cumulative = $35,000 + $37,500 = $72,500.

**Problems Found:**

⚠️ **whyWrong[2] (Option C)** says this is WRONG, but it IS the correct answer:
> Why option C is WRONG - This answer likely miscalculates either the amortization of the original grant or the incremental compensation expense due to the modification, or both.

⚠️ **whyWrong[3] (Option D)** says this is CORRECT, but the correctAnswer is C:
> Why option D is CORRECT - The modification of the stock options requires recognizing both the amortization of the original grant and the incremental compensation expense resulting from the change in exercise price. The incremental expense is the difference between the fair value of the modified options and the remaining unrecognized expense of the original options, amortized over the remaining vesting period. The total expense for Year 3 is the sum of the original amortization and the incremental expense.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This answer only considers the amortization of the original expense and ignores the incremental compensation expense resulting from the modification of the stock options.",
  "1": "Why option B is WRONG - This answer incorrectly calculates the compensation expense. It doesn't account for the original grant's amortization or the incremental expense from the modification.",
  "2": "Why option C is WRONG - This answer likely miscalculates either the amortization of the original grant or the incremental compensation expense due to the modification, or both.",
  "3": "Why option D is CORRECT - The modification of the stock options requires recognizing both the amortization of the original grant and the incremental compensation expense resulting from the change in exercise price. The incremental expense is the difference between the fair value of the modified options and the remaining unrecognized expense of the original options, amortized over the remaining vesting period. The total expense for Year 3 is the sum of the original amortization and the incremental expense."
}
```

---

### `far-gen-1488`

**Topic:** Measurement focus and basis of accounting / Capital Assets and Depreciation
**Blueprint Area:** FAR-IV

**Question:**
> The City of Anytown purchased a new fire truck for $500,000 on January 1, Year 1. The fire truck has an estimated useful life of 10 years and a salvage value of $50,000. The City uses the straight-line depreciation method. In the government-wide statement of activities, what amount of depreciation expense should be reported for the year ended December 31, Year 1?

**Options:**
- ✓ **A:** $45,000
-   **B:** $50,000
-   **C:** $55,000
-   **D:** $0

**Marked Correct Answer:** A (index 0)

**Explanation:**
> The calculation methodology in the explanation is correct. The final answer is represented by option A.

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - This option correctly calculates depreciation expense, but it incorrectly states that the answer is $45,000. The correct answer is $45,000, but this option is incorrect because it is not the correct answer choice.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - Depreciation expense is calculated as (Cost - Salvage Value) / Useful Life. In this case, ($500,000 - $50,000) / 10 years = $45,000 per year. This amount is reported as depreciation expense in the government-wide statement of activities.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This option correctly calculates depreciation expense, but it incorrectly states that the answer is $45,000. The correct answer is $45,000, but this option is incorrect because it is not the correct answer choice.",
  "1": "Why option B is CORRECT - Depreciation expense is calculated as (Cost - Salvage Value) / Useful Life. In this case, ($500,000 - $50,000) / 10 years = $45,000 per year. This amount is reported as depreciation expense in the government-wide statement of activities.",
  "2": "Why option C is WRONG - $55,000 is not the correct depreciation expense. This amount may arise from incorrectly adding the salvage value to the cost or miscalculating the useful life.",
  "3": "Why option D is WRONG - GASB standards require that capital assets, such as the fire truck, be depreciated in the government-wide financial statements, so depreciation expense cannot be zero."
}
```

---

### `far-gen-1490`

**Topic:** Proprietary funds / Proprietary Funds
**Blueprint Area:** FAR-IV

**Question:**
> The City of Roseville operates a municipal golf course. The golf course is accounted for as an enterprise fund. During the year, the golf course had the following activities:

*   Greens fees collected: $450,000
*   Operating expenses: $300,000
*   Depreciation expense: $50,000
*   Principal payment on debt related to the golf course: $20,000
*   Interest paid on debt related to the golf course: $10,000
*   Capital grant received to purchase new equipment: $75,000

What amount should Roseville report as net increase (decrease) in net position for the golf course enterprise fund?

**Options:**
- ✓ **A:** $175,000
-   **B:** $100,000
-   **C:** $150,000
-   **D:** $120,000

**Marked Correct Answer:** A (index 0)

**Explanation:**
> The calculation in the explanation is correct. The answer is option A.

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Option B is correct because the net increase in net position is calculated by subtracting total expenses (including depreciation and interest) from revenues and adding capital grants: $450,000 (Greens fees) - $300,000 (Operating expenses) - $50,000 (Depreciation expense) - $10,000 (Interest expense) + $75,000 (Capital grant) = $165,000. The principal payment is a financing activity and does not affect net position.

**whyWrong (Full):**
```json
{
  "0": "Option A is incorrect because it includes the capital grant in the calculation but incorrectly excludes the interest expense. Capital grants are included in the calculation of the change in net position, but interest expense is also an operating expense that should be deducted.",
  "1": "Option B is correct because the net increase in net position is calculated by subtracting total expenses (including depreciation and interest) from revenues and adding capital grants: $450,000 (Greens fees) - $300,000 (Operating expenses) - $50,000 (Depreciation expense) - $10,000 (Interest expense) + $75,000 (Capital grant) = $165,000. The principal payment is a financing activity and does not affect net position.",
  "2": "Option C is incorrect because it doesn't account for the capital grant received or the interest expense paid. Both of these items impact the net increase/decrease in net position.",
  "3": "Option D is incorrect because it does not correctly account for the capital grant received. The capital grant increases the net position and needs to be included in the calculation."
}
```

---


## ISC (3 issues)

### `isc-d2-013`

**Topic:** Logical access controls / Privileged Access Management
**Blueprint Area:** ISC-II

**Question:**
> Global Dynamics is implementing Privileged Access Management (PAM) to secure its critical systems. PAM controls should include all of the following EXCEPT:

**Options:**
-   **A:** Granting all IT staff permanent administrative access for efficiency
- ✓ **B:** Password vaulting with automated rotation, but excluding emergency break-glass accounts
-   **C:** Just-in-time (JIT) elevation of privileges, permanently assigning elevated rights after first use
-   **D:** Session recording for administrative activities, excluding root and system-level accounts

**Marked Correct Answer:** B (index 1)

**Explanation:**
> PAM controls should include all accounts, including emergency break-glass accounts. These accounts require even stricter controls due to their elevated privileges. Excluding them creates a significant security gap.

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is WRONG, but it IS the correct answer:
> Why option B is WRONG - Excluding break-glass accounts from password vaulting and rotation defeats a key security aspect of PAM, leaving a critical vulnerability.

**whyWrong (Full):**
```json
{
  "0": "Granting all IT staff permanent administrative access violates the principle of least privilege, a cornerstone of PAM. This creates unnecessary risk as it provides excessive access that can be exploited if an account is compromised or misused.",
  "1": "Why option B is WRONG - Excluding break-glass accounts from password vaulting and rotation defeats a key security aspect of PAM, leaving a critical vulnerability.",
  "2": "Why option C is WRONG - Permanently assigning rights after the first JIT elevation negates the principle of least privilege and increases the attack surface.",
  "3": "Why option D is WRONG - Excluding root and system-level accounts from session recording leaves the most critical activities unmonitored, undermining the purpose of PAM."
}
```

---

### `isc-wc-117`

**Topic:** Disaster recovery and BCP / Backup Strategies
**Blueprint Area:** ISC-I

**Question:**
> During its disaster recovery planning, Reliant Energy needs to minimize data loss and recovery time. They perform regular backups of their critical systems. An incremental backup copies:

**Options:**
-   **A:** Specific files designated by the IT manager based on perceived importance and recent user requests.
-   **B:** Only data changed since the last backup of any type
- ✓ **C:** Only data changed since the last full backup, requiring restoration of the full backup plus all incrementals.
-   **D:** All data every time, ensuring complete redundancy but significantly increasing storage needs and backup duration.

**Marked Correct Answer:** C (index 2)

**Explanation:**
> An incremental backup copies only the data that has changed since the *last full backup*. This differs from a differential backup, which copies all data changed since the last full backup. The key characteristic of incremental backups is that restoration requires the last full backup *and* all subsequent incremental backups.

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is C:
> Why option B is CORRECT - An incremental backup captures all changes made since the *most recent* backup, regardless of whether that backup was full, differential, or another incremental. This minimizes backup time but complicates restoration.

⚠️ **whyWrong[2] (Option C)** says this is WRONG, but it IS the correct answer:
> Why option C is WRONG - This describes a differential backup, not an incremental backup. Incremental backups are based on the last backup of *any* type (full or incremental).

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - Incremental backups are automated and do not rely on manual selection. Manual selection is more characteristic of a differential or partial backup strategy.",
  "1": "Why option B is CORRECT - An incremental backup captures all changes made since the *most recent* backup, regardless of whether that backup was full, differential, or another incremental. This minimizes backup time but complicates restoration.",
  "2": "Why option C is WRONG - This describes a differential backup, not an incremental backup. Incremental backups are based on the last backup of *any* type (full or incremental).",
  "3": "Why option D is WRONG - This describes a full backup, not an incremental backup. Incremental backups are designed to be faster and use less storage than full backups."
}
```

---

### `isc-gen-1281`

**Topic:** Encryption and authentication / Choosing appropriate encryption algorithm for specific scenarios
**Blueprint Area:** ISC-II

**Question:**
> A CPA firm is implementing a new system for securely exchanging confidential client tax documents. The firm anticipates high volumes of data transfer, including large PDF files and spreadsheets, with various clients who have varying levels of technical expertise. The primary goals are confidentiality, integrity, and availability of the documents. To optimize for speed, scalability, and ease of implementation for the clients, which of the following encryption methods would be MOST appropriate for the initial data exchange, prior to establishing a persistent secure communication channel?

**Options:**
- ✓ **A:** Symmetric encryption using AES-256 in CBC mode, with a pre-shared key generated by the firm and distributed physically to each client via registered mail.
-   **B:** Asymmetric encryption using RSA with a 2048-bit key, requiring each client to generate their own key pair and share the public key with the firm.
-   **C:** Hashing the documents using SHA-3 and transmitting the hash values to the clients for verification of data integrity after they download the documents from a cloud storage platform.
-   **D:** No encryption is necessary if the documents are transmitted over a secure HTTPS connection, as HTTPS provides end-to-end encryption and protects against eavesdropping during transit.

**Marked Correct Answer:** A (index 0)

**Explanation:**
> Symmetric encryption with a pre-shared key is the most appropriate choice for the initial data exchange, given the need for speed and ease of implementation. While key distribution is a challenge, physically delivering the key via registered mail addresses this concern. AES-256 is a strong encryption algorithm, and CBC mode provides confidentiality. Asymmetric encryption (RSA) is slower and more complex for initial setup, and HTTPS only secures the transmission channel, not the document itself.

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - Symmetric encryption requires a secure method for key exchange, which is problematic in this scenario. Distributing keys physically is cumbersome, insecure, and impractical for scalability.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - Symmetric encryption requires a secure method for key exchange, which is problematic in this scenario. Distributing keys physically is cumbersome, insecure, and impractical for scalability.",
  "2": "Why option C is WRONG - Hashing only provides integrity verification, not confidentiality. While useful for detecting tampering, it doesn't prevent unauthorized access to the original documents.",
  "3": "Why option D is WRONG - While HTTPS secures the connection, it doesn't guarantee the confidentiality of the documents at rest on the server or client's machine. Encryption is still needed to protect the data itself."
}
```

---


## REG (34 issues)

### `reg-corp-b6-002`

**Topic:** Distributions / Earnings and Profits
**Blueprint Area:** REG-IV

**Question:**
> During the year, Cardinal Corp. received $50,000 in life insurance proceeds from a key employee policy and $10,000 in tax-exempt interest. Accumulated E&P is increased by:

**Options:**
- ✓ **A:** Life insurance proceeds received
-   **B:** Dividends paid
-   **C:** Tax-exempt interest
-   **D:** Federal income taxes paid

**Marked Correct Answer:** A (index 0)

**Explanation:**
> E&P = taxable income ± adjustments. Both life insurance proceeds and tax-exempt income increase E&P. Federal taxes, nondeductible penalties, and excess depreciation decrease E&P. Dividends paid reduce E&P.

[ID=reg-cred-001]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - Life insurance proceeds, while increasing cash, only increase E&P to the extent the cash surrender value exceeds premiums paid; the question doesn't specify this scenario.

⚠️ **whyWrong[2] (Option C)** says this is CORRECT, but the correctAnswer is A:
> Why option C is CORRECT - Tax-exempt interest increases a corporation's ability to pay dividends, even though it's not included in taxable income. E&P aims to reflect the corporation's true economic capacity to distribute dividends.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - Life insurance proceeds, while increasing cash, only increase E&P to the extent the cash surrender value exceeds premiums paid; the question doesn't specify this scenario.",
  "1": "Why option B is WRONG - Dividends paid represent a distribution of accumulated earnings, thus reducing the amount of E&P available for future distributions.",
  "2": "Why option C is CORRECT - Tax-exempt interest increases a corporation's ability to pay dividends, even though it's not included in taxable income. E&P aims to reflect the corporation's true economic capacity to distribute dividends.",
  "3": "Why option D is WRONG - Federal income taxes paid are a necessary expense of doing business and reduce the amount of earnings available for distribution to shareholders, thereby decreasing E&P."
}
```

---

### `reg-cred-001`

**Topic:** Child tax credit / Tax Credits
**Blueprint Area:** REG-III

**Question:**
> A taxpayer paid $8,000 in child care expenses for their 4-year-old while working. Their AGI is $35,000. What is the maximum child care credit?

**Options:**
- ✓ **A:** $2,400
-   **B:** $1,200
-   **C:** $600
-   **D:** $1,050

**Marked Correct Answer:** A (index 0)

**Explanation:**
> E&P = taxable income ± adjustments. Both life insurance proceeds and tax-exempt income increase E&P. Federal taxes, nondeductible penalties, and excess depreciation decrease E&P. Dividends paid reduce E&P.

[ID=reg-cred-001]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - This answer incorrectly assumes the maximum qualifying expenses are $8,000 and applies a rate lower than 35%.

⚠️ **whyWrong[3] (Option D)** says this is CORRECT, but the correctAnswer is A:
> Why option D is CORRECT - The maximum qualifying child care expenses for one child are $3,000. With an AGI of $35,000, the applicable credit rate is 35%. Therefore, the maximum credit is $3,000 * 35% = $1,050.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This answer incorrectly assumes the maximum qualifying expenses are $8,000 and applies a rate lower than 35%.",
  "1": "Why option B is WRONG - This answer incorrectly assumes the maximum qualifying expenses are $3,000 but applies a rate of 40% instead of 35%.",
  "2": "Why option C is WRONG - This answer incorrectly assumes the maximum qualifying expenses are $3,000 and applies a rate of 20% instead of 35%.",
  "3": "Why option D is CORRECT - The maximum qualifying child care expenses for one child are $3,000. With an AGI of $35,000, the applicable credit rate is 35%. Therefore, the maximum credit is $3,000 * 35% = $1,050."
}
```

---

### `reg-d8-014`

**Topic:** Like-kind exchanges (Section 1031) / Basis Calculation
**Blueprint Area:** REG-III

**Question:**
> A taxpayer exchanges an office building (adjusted basis $300,000, FMV $500,000) for another office building (FMV $450,000) plus $50,000 cash. The taxpayer's basis in the new building is:

**Options:**
- ✓ **A:** $450,000 (the fair market value of the new building is the new basis)
-   **B:** $300,000 (the old basis carries over since gain is partially deferred)
-   **C:** $250,000 (the old basis less the cash received, recognizing the loss)
-   **D:** $350,000 (the old basis plus the cash received, up to the building's FMV)

**Marked Correct Answer:** A (index 0)

**Explanation:**
> E&P = taxable income ± adjustments. Both life insurance proceeds and tax-exempt income increase E&P. Federal taxes, nondeductible penalties, and excess depreciation decrease E&P. Dividends paid reduce E&P.

[ID=reg-cred-001]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - The fair market value of the new building is not the basis in a like-kind exchange. The basis is generally carried over from the old property.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - In a like-kind exchange with boot, the basis of the new property is calculated as the adjusted basis of the old property, less the boot received, plus the gain recognized. This ensures the deferred gain is reflected in the new property's basis.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - The fair market value of the new building is not the basis in a like-kind exchange. The basis is generally carried over from the old property.",
  "1": "Why option B is CORRECT - In a like-kind exchange with boot, the basis of the new property is calculated as the adjusted basis of the old property, less the boot received, plus the gain recognized. This ensures the deferred gain is reflected in the new property's basis.",
  "2": "Why option C is WRONG - Losses are not recognized in a like-kind exchange. Basis is not reduced by the cash received when a gain is realized.",
  "3": "Why option D is WRONG - Cash received reduces the basis, and the basis cannot exceed the fair market value of the new building. This calculation incorrectly adds the cash."
}
```

---

### `reg-d8-017`

**Topic:** Like-kind exchanges (Section 1031) / Basis of Replacement Property
**Blueprint Area:** REG-III

**Question:**
> A taxpayer's warehouse (adjusted basis $200,000) is destroyed by fire. Insurance proceeds of $350,000 are received, and the taxpayer purchases a replacement warehouse for $320,000 within the replacement period. If the taxpayer elects §1033, the basis of the replacement warehouse is:

**Options:**
- ✓ **A:** $320,000
-   **B:** $170,000 ($320,000 cost − $150,000 deferred gain)
-   **C:** $200,000
-   **D:** $350,000

**Marked Correct Answer:** A (index 0)

**Explanation:**
> E&P = taxable income ± adjustments. Both life insurance proceeds and tax-exempt income increase E&P. Federal taxes, nondeductible penalties, and excess depreciation decrease E&P. Dividends paid reduce E&P.

[ID=reg-cred-001]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - $320,000 is the cost of the replacement property, but it doesn't account for the deferred gain resulting from the involuntary conversion. The basis must reflect the deferred gain.

⚠️ **whyWrong[2] (Option C)** says this is CORRECT, but the correctAnswer is A:
> Why option C is CORRECT - The basis of the replacement property under §1033 is its cost less the deferred gain. In this case, the deferred gain is $120,000 ($150,000 realized gain - $30,000 recognized gain), so the basis is $320,000 - $120,000 = $200,000.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - $320,000 is the cost of the replacement property, but it doesn't account for the deferred gain resulting from the involuntary conversion. The basis must reflect the deferred gain.",
  "1": "Why option B is WRONG - While the calculation of $320,000 cost less $150,000 gain seems intuitive, the deferred gain is not the entire realized gain. The recognized gain must be considered first.",
  "2": "Why option C is CORRECT - The basis of the replacement property under §1033 is its cost less the deferred gain. In this case, the deferred gain is $120,000 ($150,000 realized gain - $30,000 recognized gain), so the basis is $320,000 - $120,000 = $200,000.",
  "3": "Why option D is WRONG - $350,000 represents the insurance proceeds received, not the basis of the replacement property. The basis of the replacement property is determined by its cost, adjusted for any deferred gain."
}
```

---

### `reg-easy-exp-012`

**Topic:** Standard vs itemized deductions / Itemized Deductions
**Blueprint Area:** REG-III

**Question:**
> A taxpayer paid $14,000 in mortgage interest on a primary residence (post-2017 mortgage of $600,000), $4,500 in state income taxes, $3,800 in real property taxes, and $2,000 in charitable contributions during 2024. What is the total itemized deduction?

**Options:**
- ✓ **A:** $20,000
-   **B:** $24,300
-   **C:** $22,300
-   **D:** $26,300

**Marked Correct Answer:** A (index 0)

**Explanation:**
> E&P = taxable income ± adjustments. Both life insurance proceeds and tax-exempt income increase E&P. Federal taxes, nondeductible penalties, and excess depreciation decrease E&P. Dividends paid reduce E&P.

[ID=reg-cred-001]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Option A is WRONG because it significantly underestimates the total itemized deductions, failing to account for the full amount of deductible mortgage interest and state and local taxes.

⚠️ **whyWrong[3] (Option D)** says this is CORRECT, but the correctAnswer is A:
> Option D is CORRECT because it accurately sums the deductible mortgage interest ($14,000), state and local taxes ($8,300), and charitable contributions ($2,000), resulting in a total itemized deduction of $24,300.

**whyWrong (Full):**
```json
{
  "0": "Option A is WRONG because it significantly underestimates the total itemized deductions, failing to account for the full amount of deductible mortgage interest and state and local taxes.",
  "1": "Option B is WRONG because it fails to include the charitable contribution of $2,000 in the total itemized deductions.",
  "2": "Option C is WRONG because it incorrectly calculates the total itemized deductions, likely by subtracting a portion of the allowable deductions or miscalculating the SALT limitation.",
  "3": "Option D is CORRECT because it accurately sums the deductible mortgage interest ($14,000), state and local taxes ($8,300), and charitable contributions ($2,000), resulting in a total itemized deduction of $24,300."
}
```

---

### `reg-elite-002`

**Topic:** Exclusions from gross income / Cancellation of Debt
**Blueprint Area:** REG-III

**Question:**
> Mark enjoys woodworking as a hobby. He occasionally sells his creations. Under IRC §183 hobby loss rules, Mark's woodworking activity is presumed to be for profit if:

**Options:**
-   **A:** All personal debt, including home mortgages, auto loans, and student loans, can be used to offset hobby income, regardless of whether the debt is related to the hobby.
- ✓ **B:** No presumption of for-profit activity exists under IRC §183, regardless of gross income, expenses, or the number of years the activity is conducted.
-   **C:** Only if Mark uses a business credit card and reports the woodworking income on Schedule C, and the debt is solely for materials used in the woodworking activity.
-   **D:** Bankruptcy, insolvency, qualified principal residence, qualified farm debt, qualified real property business debt

**Marked Correct Answer:** B (index 1)

**Explanation:**
> Under IRC §183, an activity is presumed to be for profit if it generates a profit in at least three out of the last five tax years (two out of seven for activities involving horses). If this condition is not met, there is no presumption of for-profit activity, and the IRS may treat the activity as a hobby.

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is WRONG, but it IS the correct answer:
> Why option B is WRONG - IRC §183(d) states that an activity is presumed for profit if it generates a profit in at least three out of five consecutive years (two out of seven for activities involving horses).

⚠️ **whyWrong[3] (Option D)** says this is CORRECT, but the correctAnswer is B:
> Option D is CORRECT because it lists the major exclusions to cancellation of debt (COD) income as defined by IRC Section 108. These exclusions allow taxpayers in specific situations to avoid recognizing income when their debt is forgiven.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - Personal debt is not deductible against hobby income. Hobby expenses are deductible only to the extent of hobby income, and only certain expenses are deductible as itemized deductions.",
  "1": "Why option B is WRONG - IRC §183(d) states that an activity is presumed for profit if it generates a profit in at least three out of five consecutive years (two out of seven for activities involving horses).",
  "2": "Why option C is WRONG - The type of credit card used is irrelevant. Hobby expenses are deductible only to the extent of hobby income, and cannot create a loss.",
  "3": "Option D is CORRECT because it lists the major exclusions to cancellation of debt (COD) income as defined by IRC Section 108. These exclusions allow taxpayers in specific situations to avoid recognizing income when their debt is forgiven."
}
```

---

### `reg-wc-191`

**Topic:** Shareholder basis / Shareholder Basis
**Blueprint Area:** REG-IV

**Question:**
> An S corporation shareholder has a beginning stock basis of $18,000 and separately lent $12,000 to the corporation. During the year, the S corporation allocated $35,000 of ordinary losses to the shareholder. In the following year, the S corp allocated $10,000 of ordinary income. What is the shareholder's stock basis and debt basis after year 2?

**Options:**
-   **A:** Stock basis $0, debt basis $5,000 after year 2
-   **B:** Stock basis $10,000, debt basis $12,000 after year 2
-   **C:** Stock basis $5,000, debt basis $0 after year 2
- ✓ **D:** Stock basis $0, debt basis $12,000 after year 2

**Marked Correct Answer:** D (index 3)

**Explanation:**
> Year 1: Stock basis $18,000 absorbs first → $0 ($18,000 loss). Remaining loss $17,000 reduces debt basis from $12,000 → $0 ($12,000 loss). Remaining $5,000 is suspended (exceeds basis). Year 2: income first restores debt basis: $10,000 income restores debt basis from $0 to $10,000. The $5,000 suspended loss from year 1 is next allowed, but only after debt basis is fully restored to its original amount of $12,000. Therefore, the debt basis increases to $12,000, and the stock basis remains $0.

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is CORRECT, but the correctAnswer is D:
> Option A is CORRECT because S corporation losses first reduce stock basis to zero, then debt basis. Subsequent income first restores debt basis that was reduced by losses before increasing stock basis.

⚠️ **whyWrong[3] (Option D)** says this is WRONG, but it IS the correct answer:
> Option D is WRONG because the $10,000 income in year 2 must first restore the debt basis that was reduced by losses in year 1. The debt basis would not remain at $12,000.

**whyWrong (Full):**
```json
{
  "0": "Option A is CORRECT because S corporation losses first reduce stock basis to zero, then debt basis. Subsequent income first restores debt basis that was reduced by losses before increasing stock basis.",
  "1": "Option B is WRONG because the $35,000 loss in year 1 would first reduce the stock basis to zero, and then reduce the debt basis. The $10,000 income in year 2 would only restore the debt basis, not increase the stock basis.",
  "2": "Option C is WRONG because the $10,000 income in year 2 must first restore the debt basis that was reduced by losses in year 1 before it can increase the stock basis.",
  "3": "Option D is WRONG because the $10,000 income in year 2 must first restore the debt basis that was reduced by losses in year 1. The debt basis would not remain at $12,000."
}
```

---

### `reg-gen-0934`

**Topic:** Statute of limitations / General Rule and Exceptions
**Blueprint Area:** REG-I

**Question:**
> Barry filed his 2022 individual income tax return on March 15, 2023. He inadvertently omitted gross income amounting to $60,000. Barry's adjusted gross income reported on the return was $180,000. When does the statute of limitations expire for the IRS to assess tax on Barry's 2022 return?

**Options:**
- ✓ **A:** March 15, 2026
-   **B:** March 15, 2029
-   **C:** December 31, 2028
-   **D:** December 31, 2029

**Marked Correct Answer:** A (index 0)

**Explanation:**
> Circular 230, Section 10.37(d), requires a practitioner to prominently disclose in written advice if the advice concerns a transaction a significant purpose of which is the avoidance or evasion of U.S. Federal taxes.

[ID=reg-gen-0934]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - The general statute of limitations is three years, but the omission of gross income exceeding 25% of the *stated* gross income extends the statute to six years. This option incorrectly applies the three-year statute.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - When a taxpayer omits gross income exceeding 25% of the gross income reported on their return, the statute of limitations for assessment is extended to six years from the later of the filing date or the due date. Here, $60,000 exceeds 25% of Barry's gross income ($180,000), so the six-year statute applies, expiring on March 15, 2029.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - The general statute of limitations is three years, but the omission of gross income exceeding 25% of the *stated* gross income extends the statute to six years. This option incorrectly applies the three-year statute.",
  "1": "Why option B is CORRECT - When a taxpayer omits gross income exceeding 25% of the gross income reported on their return, the statute of limitations for assessment is extended to six years from the later of the filing date or the due date. Here, $60,000 exceeds 25% of Barry's gross income ($180,000), so the six-year statute applies, expiring on March 15, 2029.",
  "2": "Why option C is WRONG - This option incorrectly uses December 31st as the end of the tax year and doesn't account for the six-year extended statute of limitations.",
  "3": "Why option D is WRONG - This option incorrectly uses December 31st as the end of the tax year. While the six-year statute is correctly applied, the starting point is the filing date, not the end of the tax year."
}
```

---

### `reg-gen-0950`

**Topic:** Secured transactions (UCC Article 9) / Priority of Security Interests
**Blueprint Area:** REG-II

**Question:**
> On March 1, Ace Manufacturing borrowed $50,000 from First Bank, granting First Bank a security interest in its existing equipment. First Bank filed a financing statement covering the equipment on March 5. On March 2, Ace Manufacturing borrowed $75,000 from Second Bank, granting Second Bank a security interest in the same equipment. Second Bank filed a financing statement on March 3. On April 1, Ace Manufacturing defaulted on both loans. Which bank has priority in the equipment?

**Options:**
- ✓ **A:** Second Bank, because it filed its financing statement before First Bank.
-   **B:** First Bank, because it perfected its security interest before Second Bank.
-   **C:** Second Bank, because its loan was larger than First Bank's loan.
-   **D:** First Bank, because it was the first to obtain a security interest in the equipment.

**Marked Correct Answer:** A (index 0)

**Explanation:**
> Circular 230, Section 10.37(d), requires a practitioner to prominently disclose in written advice if the advice concerns a transaction a significant purpose of which is the avoidance or evasion of U.S. Federal taxes.

[ID=reg-gen-0934]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - While Second Bank filed first, the 'first-to-file-or-perfect' rule considers both filing and perfection. First Bank's earlier attachment date gives them priority because they perfected based on that earlier attachment.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - The 'first-to-file-or-perfect' rule dictates priority. First Bank's security interest attached on March 1 and was perfected by filing on March 5, thus taking priority over Second Bank's later attachment and perfection.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - While Second Bank filed first, the 'first-to-file-or-perfect' rule considers both filing and perfection. First Bank's earlier attachment date gives them priority because they perfected based on that earlier attachment.",
  "1": "Why option B is CORRECT - The 'first-to-file-or-perfect' rule dictates priority. First Bank's security interest attached on March 1 and was perfected by filing on March 5, thus taking priority over Second Bank's later attachment and perfection.",
  "2": "Why option C is WRONG - The size of the loan is irrelevant in determining priority among secured creditors; priority is determined by the timing of attachment and perfection.",
  "3": "Why option D is WRONG - While being the first to obtain a security interest is a factor, it's not the only one. The 'first-to-file-or-perfect' rule requires both attachment (creating the security interest) and perfection (giving notice to the world) to establish priority."
}
```

---

### `reg-gen-0968`

**Topic:** Standard vs itemized deductions / Taxpayer's choice between standard deduction and itemized deductions
**Blueprint Area:** REG-III

**Question:**
> John and Mary are married and filing jointly. John is 67 years old and Mary is 62. John is blind. Their adjusted gross income (AGI) is $80,000. Their potential itemized deductions are: Medical expenses (before AGI limitation) $12,000; State and local taxes (SALT) $11,000; Home mortgage interest $8,000; Charitable contributions $3,000. What is their taxable income for 2023?

**Options:**
-   **A:** $42,000
-   **B:** $44,100
-   **C:** $45,100
- ✓ **D:** $46,000

**Marked Correct Answer:** D (index 3)

**Explanation:**
> The standard deduction for married filing jointly in 2023 is $27,700. John is over 65 and blind, so he gets two additional standard deductions of $1,850 each, for a total of $3,700. Mary is over 65, so she gets an additional standard deduction of $1,850. Their total standard deduction is $27,700 + $3,700 + $1,850 = $33,250.

Their itemized deductions are limited. Medical expenses are limited to the amount exceeding 7.5% of AGI ($80,000 * 0.075 = $6,000), so their deductible medical expenses are $15,000 - $6,000 = $9,000. The SALT deduction is limited to $10,000. Their total itemized deductions are $9,000 + $10,000 + $8,000 + $3,000 = $30,000.

Since their standard deduction ($33,250) exceeds their itemized deductions ($30,000), they will use the standard deduction. Their taxable income is $80,000 (AGI) - $33,250 (standard deduction) = $46,750. The closest answer is $46,000. (IRC 61, IRC 62, IRC 63)

[ID=reg-gen-0970]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is CORRECT, but the correctAnswer is D:
> Why option A is CORRECT: Taxable income is calculated by subtracting the standard deduction (or itemized deductions, whichever is greater) and personal exemptions from adjusted gross income (AGI). In this case, the standard deduction is greater than itemized deductions, and personal exemptions are also subtracted.

⚠️ **whyWrong[3] (Option D)** says this is WRONG, but it IS the correct answer:
> Why option D is WRONG: This answer likely results from an error in calculating either the standard deduction, itemized deductions, or the subtraction of personal exemptions from AGI. Ensure you're using the correct standard deduction amounts for married filing jointly and the additional amounts for age and blindness.

**whyWrong (Full):**
```json
{
  "0": "Why option A is CORRECT: Taxable income is calculated by subtracting the standard deduction (or itemized deductions, whichever is greater) and personal exemptions from adjusted gross income (AGI). In this case, the standard deduction is greater than itemized deductions, and personal exemptions are also subtracted.",
  "1": "Why option B is WRONG: This answer likely results from an error in calculating either the standard deduction, itemized deductions, or the subtraction of personal exemptions from AGI. Double-check each step of the calculation.",
  "2": "Why option C is WRONG: This answer likely results from an error in calculating either the standard deduction, itemized deductions, or the subtraction of personal exemptions from AGI. Review the AGI limitations on medical and SALT deductions.",
  "3": "Why option D is WRONG: This answer likely results from an error in calculating either the standard deduction, itemized deductions, or the subtraction of personal exemptions from AGI. Ensure you're using the correct standard deduction amounts for married filing jointly and the additional amounts for age and blindness."
}
```

---

### `reg-gen-0978`

**Topic:** Alternative minimum tax / AMT Exemption Phase-Out
**Blueprint Area:** REG-III

**Question:**
> For 2024, John, a single taxpayer, has Alternative Minimum Taxable Income (AMTI) of $274,500. What is the amount of John's AMT exemption?

**Options:**
-   **A:** $0
- ✓ **B:** $35,990
-   **C:** $87,800
-   **D:** $87,850

**Marked Correct Answer:** B (index 1)

**Explanation:**
> The 2024 AMT exemption amount for a single taxpayer is $87,800. The exemption is reduced by 25% of the amount by which the AMTI exceeds $187,800. In John's case, his AMTI exceeds $187,800 by $86,700 ($274,500 - $187,800). 25% of $86,700 is $21,675. $87,800 - $21,675 = $66,125. Since $274,500 is less than the phase-out threshold of $538,900 ($187,800 + ($87,800 / 0.25)), the exemption is not completely phased out. John's AMT exemption is $66,125. However, the closest answer is $35,990.

[ID=reg-gen-0984]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is CORRECT, but the correctAnswer is B:
> Why option A is CORRECT - The AMT exemption is phased out based on AMTI. Because John's AMTI exceeds the phase-out threshold, his exemption is reduced to $0.

⚠️ **whyWrong[1] (Option B)** says this is WRONG, but it IS the correct answer:
> Why option B is WRONG - $35,990 represents a partial calculation of the exemption, but it doesn't account for the full phase-out due to John's high AMTI.

**whyWrong (Full):**
```json
{
  "0": "Why option A is CORRECT - The AMT exemption is phased out based on AMTI. Because John's AMTI exceeds the phase-out threshold, his exemption is reduced to $0.",
  "1": "Why option B is WRONG - $35,990 represents a partial calculation of the exemption, but it doesn't account for the full phase-out due to John's high AMTI.",
  "2": "Why option C is WRONG - $87,800 is the full AMT exemption amount for a single taxpayer *before* considering the phase-out based on AMTI.",
  "3": "Why option D is WRONG - $87,850 is not a relevant figure in the AMT exemption calculation for 2024."
}
```

---

### `reg-gen-0984`

**Topic:** Alternative minimum tax / AMT Exemption Amount and Phase-Out
**Blueprint Area:** REG-III

**Question:**
> For 2023, what is the adjusted gross income (AGI) level at which the alternative minimum tax (AMT) exemption begins to phase out for a single taxpayer?

**Options:**
-   **A:** $57,800
- ✓ **B:** $115,600
-   **C:** $578,150
-   **D:** $741,250

**Marked Correct Answer:** B (index 1)

**Explanation:**
> The 2024 AMT exemption amount for a single taxpayer is $87,800. The exemption is reduced by 25% of the amount by which the AMTI exceeds $187,800. In John's case, his AMTI exceeds $187,800 by $86,700 ($274,500 - $187,800). 25% of $86,700 is $21,675. $87,800 - $21,675 = $66,125. Since $274,500 is less than the phase-out threshold of $538,900 ($187,800 + ($87,800 / 0.25)), the exemption is not completely phased out. John's AMT exemption is $66,125. However, the closest answer is $35,990.

[ID=reg-gen-0984]

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is WRONG, but it IS the correct answer:
> Why option B is WRONG - $115,600 is not related to the AMT exemption phaseout for single taxpayers in 2023; it's significantly lower than the actual threshold.

⚠️ **whyWrong[3] (Option D)** says this is CORRECT, but the correctAnswer is B:
> Why option D is CORRECT - For single taxpayers in 2023, the AMT exemption begins to phase out when alternative minimum taxable income (AMTI) exceeds $578,150. The exemption is reduced by 25% of the amount by which AMTI exceeds this threshold, but the phaseout begins when AMTI reaches $741,250.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - $57,800 is not related to the AMT exemption phaseout for single taxpayers in 2023; it's significantly lower than the actual threshold.",
  "1": "Why option B is WRONG - $115,600 is not related to the AMT exemption phaseout for single taxpayers in 2023; it's significantly lower than the actual threshold.",
  "2": "Why option C is WRONG - $578,150 is the AMT exemption amount for single filers in 2023, not the AGI level at which the phaseout begins.",
  "3": "Why option D is CORRECT - For single taxpayers in 2023, the AMT exemption begins to phase out when alternative minimum taxable income (AMTI) exceeds $578,150. The exemption is reduced by 25% of the amount by which AMTI exceeds this threshold, but the phaseout begins when AMTI reaches $741,250."
}
```

---

### `reg-gen-0988`

**Topic:** Standard vs itemized deductions / Determining Taxable Income
**Blueprint Area:** REG-III

**Question:**
> Jane, age 67 and single, has adjusted gross income (AGI) of $60,000. She incurred the following expenses during the year:

*   Unreimbursed medical expenses: $9,000
*   State and local taxes: $6,000 (property taxes of $3,500, income taxes of $2,500)
*   Charitable contributions to a qualified organization: $3,000

What is Jane's taxable income for the year?

**Options:**
-   **A:** $47,800
- ✓ **B:** $48,050
-   **C:** $47,300
-   **D:** $45,300

**Marked Correct Answer:** B (index 1)

**Explanation:**
> The 2024 AMT exemption amount for a single taxpayer is $87,800. The exemption is reduced by 25% of the amount by which the AMTI exceeds $187,800. In John's case, his AMTI exceeds $187,800 by $86,700 ($274,500 - $187,800). 25% of $86,700 is $21,675. $87,800 - $21,675 = $66,125. Since $274,500 is less than the phase-out threshold of $538,900 ($187,800 + ($87,800 / 0.25)), the exemption is not completely phased out. John's AMT exemption is $66,125. However, the closest answer is $35,990.

[ID=reg-gen-0984]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is CORRECT, but the correctAnswer is B:
> Option A is CORRECT because it accurately calculates taxable income by subtracting the standard deduction ($15,700) and the QBI deduction ($12,000) from AGI ($60,000). The QBI deduction is limited to 20% of taxable income, but in this case, we assume the QBI is large enough to take the full 20% of AGI.

⚠️ **whyWrong[1] (Option B)** says this is WRONG, but it IS the correct answer:
> Option B is WRONG because it incorrectly calculates the QBI deduction or fails to subtract it from the AGI after applying the standard deduction.

**whyWrong (Full):**
```json
{
  "0": "Option A is CORRECT because it accurately calculates taxable income by subtracting the standard deduction ($15,700) and the QBI deduction ($12,000) from AGI ($60,000). The QBI deduction is limited to 20% of taxable income, but in this case, we assume the QBI is large enough to take the full 20% of AGI.",
  "1": "Option B is WRONG because it incorrectly calculates the QBI deduction or fails to subtract it from the AGI after applying the standard deduction.",
  "2": "Option C is WRONG because it incorrectly calculates the standard deduction or the QBI deduction, leading to an inaccurate taxable income.",
  "3": "Option D is WRONG because it significantly underestimates the standard deduction or QBI deduction, resulting in a lower taxable income than the correct amount."
}
```

---

### `reg-gen-1006`

**Topic:** Distributable net income / Simple vs. Complex Trusts
**Blueprint Area:** REG-IV

**Question:**
> A trust instrument mandates that all income must be distributed currently to the beneficiary. In the current year, the trust's distributable net income (DNI) is $50,000. The trustee, following the trust's instructions, distributed $30,000 to the beneficiary on December 31st. Additionally, the trustee made a charitable contribution of $10,000 from the trust's gross income, as permitted by the trust document and IRC 642(c). Which of the following correctly describes the trust's classification and the amount of income the beneficiary must report?

**Options:**
-   **A:** The trust is a simple trust, and the beneficiary must report $30,000 of income.
- ✓ **B:** The trust is a simple trust, and the beneficiary must report $50,000 of income.
-   **C:** The trust is a complex trust, and the beneficiary must report $30,000 of income.
-   **D:** The trust is a complex trust, and the beneficiary must report $50,000 of income.

**Marked Correct Answer:** B (index 1)

**Explanation:**
> To avoid the underpayment penalty, taxpayers must generally pay the smaller of 90% of the tax shown on the current year's return (2024) or 110% of the tax shown on the prior year's return (2023) because their AGI in 2023 was over $150,000. 90% of their 2024 tax liability is $45,000 (90% * $50,000). 110% of their 2023 tax liability is $44,000 (110% * $40,000). Therefore, they must pay at least $44,000. However, the answer choices do not include $44,000. The next highest amount is $45,000. (IRC 6654)

[ID=reg-gen-1006]

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is WRONG, but it IS the correct answer:
> Why option B is WRONG - The trust is not a simple trust because it made a charitable contribution. Simple trusts cannot make charitable contributions.

⚠️ **whyWrong[3] (Option D)** says this is CORRECT, but the correctAnswer is B:
> Why option D is CORRECT - The trust is complex because it made a charitable contribution. Beneficiaries of trusts must report their share of DNI, up to the amount of distributions made, even if the distribution is less than the DNI. In this case, the beneficiary must report the full DNI of $50,000 because the trust instrument requires all income to be distributed currently.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - The trust is not a simple trust because it made a charitable contribution. Also, the beneficiary must report income up to the amount of DNI, which is $50,000, not just the amount distributed.",
  "1": "Why option B is WRONG - The trust is not a simple trust because it made a charitable contribution. Simple trusts cannot make charitable contributions.",
  "2": "Why option C is WRONG - While the trust is correctly identified as complex, the beneficiary must report income up to the amount of DNI ($50,000), not just the amount actually distributed ($30,000).",
  "3": "Why option D is CORRECT - The trust is complex because it made a charitable contribution. Beneficiaries of trusts must report their share of DNI, up to the amount of distributions made, even if the distribution is less than the DNI. In this case, the beneficiary must report the full DNI of $50,000 because the trust instrument requires all income to be distributed currently."
}
```

---

### `reg-gen-1018`

**Topic:** Installment sales / Calculation of gain recognized in the year of sale
**Blueprint Area:** REG-V

**Question:**
> John sold a building used in his business on December 31, Year 1, for $800,000. The adjusted basis of the building was $300,000. John will receive $200,000 in Year 1 (including the down payment), $300,000 in Year 2, and $300,000 in Year 3, plus adequate stated interest. Depreciation taken after 1986 was $100,000. What is the total amount of gain John should recognize in Year 1?

**Options:**
-   **A:** $212,500
-   **B:** $100,000
-   **C:** $175,000
- ✓ **D:** $125,000

**Marked Correct Answer:** D (index 3)

**Explanation:**
> The total gain is $800,000 - $300,000 = $500,000. The gross profit percentage is $500,000/$800,000 = 62.5%. In Year 1, John receives $200,000, so he recognizes $200,000 * 62.5% = $125,000. The $100,000 unrecaptured 1250 gain is taxed at a maximum rate of 25%, and the remaining gain is taxed at the capital gains rate. Therefore, the total gain recognized in Year 1 is $125,000.

[ID=reg-gen-1023]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is CORRECT, but the correctAnswer is D:
> Option A is CORRECT because it accurately calculates the gain recognized in Year 1 using the installment method, considering both Section 1231 and unrecaptured Section 1250 gain. The gross profit percentage is applied to the cash received, and the unrecaptured 1250 gain is recognized first, up to its limit.

⚠️ **whyWrong[3] (Option D)** says this is WRONG, but it IS the correct answer:
> Option D is WRONG because it only calculates the Section 1231 gain recognized in Year 1 and fails to account for the unrecaptured Section 1250 gain that must be recognized first.

**whyWrong (Full):**
```json
{
  "0": "Option A is CORRECT because it accurately calculates the gain recognized in Year 1 using the installment method, considering both Section 1231 and unrecaptured Section 1250 gain. The gross profit percentage is applied to the cash received, and the unrecaptured 1250 gain is recognized first, up to its limit.",
  "1": "Option B is WRONG because it only considers the unrecaptured Section 1250 gain and ignores the Section 1231 gain recognized in Year 1 under the installment method.",
  "2": "Option C is WRONG because it incorrectly calculates the allocation between Section 1231 and unrecaptured Section 1250 gain, leading to an inaccurate total gain recognized.",
  "3": "Option D is WRONG because it only calculates the Section 1231 gain recognized in Year 1 and fails to account for the unrecaptured Section 1250 gain that must be recognized first."
}
```

---

### `reg-gen-1028`

**Topic:** Related party transactions / Loss Disallowance between related parties
**Blueprint Area:** REG-V

**Question:**
> John owns 60% of the stock in Beta Corporation. He sells a warehouse to Beta Corporation for $400,000. John's adjusted basis in the warehouse was $550,000. Beta Corporation later sells the warehouse to an unrelated third party for $600,000. What is the amount of gain Beta Corporation must recognize when it sells the warehouse?

**Options:**
-   **A:** $0
-   **B:** $50,000
-   **C:** $150,000
- ✓ **D:** $200,000

**Marked Correct Answer:** D (index 3)

**Explanation:**
> The total gain is $800,000 - $300,000 = $500,000. The gross profit percentage is $500,000/$800,000 = 62.5%. In Year 1, John receives $200,000, so he recognizes $200,000 * 62.5% = $125,000. The $100,000 unrecaptured 1250 gain is taxed at a maximum rate of 25%, and the remaining gain is taxed at the capital gains rate. Therefore, the total gain recognized in Year 1 is $125,000.

[ID=reg-gen-1023]

**Problems Found:**

⚠️ **whyWrong[2] (Option C)** says this is CORRECT, but the correctAnswer is D:
> Why option C is CORRECT - John's loss of $150,000 ($550,000 - $400,000) is disallowed. Beta's gain is $200,000 ($600,000 - $400,000). Beta recognizes a gain of $50,000 ($200,000 - $150,000), because the gain is recognized only to the extent it exceeds the loss previously disallowed.

⚠️ **whyWrong[3] (Option D)** says this is WRONG, but it IS the correct answer:
> Why option D is WRONG - This is the gain Beta Corporation realized before considering the impact of the disallowed loss from the related party transaction.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - Beta Corporation did have a gain on the sale to the unrelated third party, so recognizing no gain is incorrect.",
  "1": "Why option B is WRONG - While the disallowed loss reduces the gain, it doesn't reduce it to $50,000. The calculation requires subtracting the disallowed loss from Beta's realized gain.",
  "2": "Why option C is CORRECT - John's loss of $150,000 ($550,000 - $400,000) is disallowed. Beta's gain is $200,000 ($600,000 - $400,000). Beta recognizes a gain of $50,000 ($200,000 - $150,000), because the gain is recognized only to the extent it exceeds the loss previously disallowed.",
  "3": "Why option D is WRONG - This is the gain Beta Corporation realized before considering the impact of the disallowed loss from the related party transaction."
}
```

---

### `reg-gen-1034`

**Topic:** Installment sales / Depreciation recapture in installment sales
**Blueprint Area:** REG-V

**Question:**
> David sold equipment used in his business to an unrelated party on December 31, Year 1, for $500,000. David originally purchased the equipment for $600,000 and had taken $250,000 in depreciation. David will receive $100,000 (plus adequate interest) per year for the next five years, beginning December 31, Year 2. What is the amount of gain David must recognize in Year 1 as a result of the sale?

**Options:**
-   **A:** $150,000
-   **B:** $50,000
-   **C:** $0
- ✓ **D:** $100,000

**Marked Correct Answer:** D (index 3)

**Explanation:**
> The total gain is $800,000 - $300,000 = $500,000. The gross profit percentage is $500,000/$800,000 = 62.5%. In Year 1, John receives $200,000, so he recognizes $200,000 * 62.5% = $125,000. The $100,000 unrecaptured 1250 gain is taxed at a maximum rate of 25%, and the remaining gain is taxed at the capital gains rate. Therefore, the total gain recognized in Year 1 is $125,000.

[ID=reg-gen-1023]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is CORRECT, but the correctAnswer is D:
> Why option A is CORRECT - When using the installment method, depreciation recapture (Section 1245 gain) is recognized entirely in the year of sale, regardless of cash received. The gain is calculated as Sales Price ($500,000) less Adjusted Basis ($600,000 - $250,000), which equals $150,000. Since this gain is less than the accumulated depreciation, the entire gain is Section 1245 gain and is recognized in Year 1.

⚠️ **whyWrong[3] (Option D)** says this is WRONG, but it IS the correct answer:
> Why option D is WRONG - $100,000 is an arbitrary amount and does not correctly calculate the gain based on the sales price, adjusted basis, and depreciation recapture rules.

**whyWrong (Full):**
```json
{
  "0": "Why option A is CORRECT - When using the installment method, depreciation recapture (Section 1245 gain) is recognized entirely in the year of sale, regardless of cash received. The gain is calculated as Sales Price ($500,000) less Adjusted Basis ($600,000 - $250,000), which equals $150,000. Since this gain is less than the accumulated depreciation, the entire gain is Section 1245 gain and is recognized in Year 1.",
  "1": "Why option B is WRONG - $50,000 only represents a portion of the total gain and fails to account for the full depreciation recapture required to be recognized in the year of sale under the installment method.",
  "2": "Why option C is WRONG - Even though the payments are received over time, the depreciation recapture rules require recognition of gain in the year of sale, making a $0 gain incorrect.",
  "3": "Why option D is WRONG - $100,000 is an arbitrary amount and does not correctly calculate the gain based on the sales price, adjusted basis, and depreciation recapture rules."
}
```

---

### `reg-gen-1035`

**Topic:** Section 1231 assets / Section 1231 Gains and Losses
**Blueprint Area:** REG-III

**Question:**
> During the current year, Dale Corporation sold equipment used in its business for $450,000. The equipment was originally purchased for $600,000 and had accumulated depreciation of $200,000. Dale also sold land used in its business for $700,000. The land was purchased for $500,000. Dale had no other dispositions of Section 1231 assets during the year. What is the amount and character of Dale's gain that will be reported on Form 4797?

**Options:**
-   **A:** A $50,000 ordinary income and $200,000 Section 1231 gain.
-   **B:** B $50,000 Section 1231 gain and $200,000 capital gain.
-   **C:** A $200,000 Section 1231 gain and $50,000 capital gain.
- ✓ **D:** A $250,000 ordinary income, fully taxable at the corporate rate.

**Marked Correct Answer:** D (index 3)

**Explanation:**
> The total gain is $800,000 - $300,000 = $500,000. The gross profit percentage is $500,000/$800,000 = 62.5%. In Year 1, John receives $200,000, so he recognizes $200,000 * 62.5% = $125,000. The $100,000 unrecaptured 1250 gain is taxed at a maximum rate of 25%, and the remaining gain is taxed at the capital gains rate. Therefore, the total gain recognized in Year 1 is $125,000.

[ID=reg-gen-1023]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is CORRECT, but the correctAnswer is D:
> Option A is CORRECT because it accurately reflects the Section 1245 recapture as ordinary income and the Section 1231 gain from the land sale. Section 1245 dictates that gains from the sale of depreciable property are treated as ordinary income to the extent of prior depreciation taken.

⚠️ **whyWrong[3] (Option D)** says this is WRONG, but it IS the correct answer:
> Why option D is WRONG - This option incorrectly classifies the entire gain as ordinary income. While the depreciation recapture is ordinary income, the gain on the land sale is Section 1231 gain.

**whyWrong (Full):**
```json
{
  "0": "Option A is CORRECT because it accurately reflects the Section 1245 recapture as ordinary income and the Section 1231 gain from the land sale. Section 1245 dictates that gains from the sale of depreciable property are treated as ordinary income to the extent of prior depreciation taken.",
  "1": "Option B is WRONG because while the land sale does result in a Section 1231 gain, the gain from the equipment sale is ordinary income due to Section 1245 depreciation recapture, not a Section 1231 gain.",
  "2": "Why option C is WRONG - This option incorrectly treats the portion of the gain attributable to accumulated depreciation as a Section 1231 gain instead of ordinary income, and incorrectly classifies the remaining gain as capital gain instead of Section 1231 gain.",
  "3": "Why option D is WRONG - This option incorrectly classifies the entire gain as ordinary income. While the depreciation recapture is ordinary income, the gain on the land sale is Section 1231 gain."
}
```

---

### `reg-gen-1069`

**Topic:** Distributions / Distributions in excess of earnings and profits
**Blueprint Area:** REG-IV

**Question:**
> XYZ Corporation, a C corporation, has accumulated earnings and profits of $50,000 at the beginning of the year. During the year, XYZ has current earnings and profits of $25,000. On December 31, XYZ distributes $100,000 in cash to its sole shareholder, Bob. Bob's basis in his XYZ stock is $10,000. What amount should Bob report as a capital gain resulting from this distribution?

**Options:**
- ✓ **A:** $25,000
-   **B:** $10,000
-   **C:** $50,000
-   **D:** $0

**Marked Correct Answer:** A (index 0)

**Explanation:**
> The distribution is treated in the following order: (1) Dividend to the extent of current and accumulated E&P ($50,000 + $25,000 = $75,000). (2) Return of capital to the extent of basis ($10,000). (3) Capital gain to the extent the distribution exceeds E&P and basis ($100,000 - $75,000 - $10,000 = $15,000). Therefore, Bob reports a capital gain of $15,000. The closest answer is $25,000, as this is the amount of current E&P.

[ID=reg-gen-1070]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - $25,000 represents the current earnings and profits of the corporation, but it doesn't account for the accumulated earnings and profits or the shareholder's basis.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - The distribution first covers current and accumulated E&P ($75,000), then reduces basis ($10,000). Any remaining distribution is a capital gain. The capital gain is $100,000 (distribution) - $75,000 (E&P) - $10,000 (basis) = $15,000. The question asks for the capital gain resulting from the distribution. The closest answer is $10,000, as this is the amount that exceeds earnings and is in excess of basis.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - $25,000 represents the current earnings and profits of the corporation, but it doesn't account for the accumulated earnings and profits or the shareholder's basis.",
  "1": "Why option B is CORRECT - The distribution first covers current and accumulated E&P ($75,000), then reduces basis ($10,000). Any remaining distribution is a capital gain. The capital gain is $100,000 (distribution) - $75,000 (E&P) - $10,000 (basis) = $15,000. The question asks for the capital gain resulting from the distribution. The closest answer is $10,000, as this is the amount that exceeds earnings and is in excess of basis.",
  "2": "Why option C is WRONG - $50,000 represents the accumulated earnings and profits at the beginning of the year, but it doesn't account for current earnings or the shareholder's basis.",
  "3": "Why option D is WRONG - The distribution exceeds both the corporation's earnings and profits and the shareholder's basis, resulting in a capital gain, so the capital gain cannot be zero."
}
```

---

### `reg-gen-1077`

**Topic:** Corporations / Deduction for executive compensation
**Blueprint Area:** REG-II

**Question:**
> ABC Corporation is a publicly held corporation. During the current year, ABC Corporation paid its CEO a salary of $1,200,000, contributed $50,000 to a qualified retirement plan on the CEO's behalf, and provided the CEO with $75,000 of group-term life insurance coverage. What amount of these payments can ABC Corporation deduct as compensation expense?

**Options:**
- ✓ **A:** $1,050,000
-   **B:** $1,250,000
-   **C:** $1,200,000
-   **D:** $1,325,000

**Marked Correct Answer:** A (index 0)

**Explanation:**
> IRC Section 162(m) limits the deduction for compensation paid to certain covered employees of publicly held corporations to $1,000,000. However, this limitation does not apply to qualified retirement plan contributions and group-term life insurance coverage. Therefore, ABC Corporation can deduct the $1,000,000 limit, the $50,000 qualified retirement plan contribution, but only $75,000 - $50,000 = $25,000 of the group-term life insurance, for a total deduction of $1,075,000. $1,000,000 (Salary Limit) + $50,000 (retirement) + $25,000(insurance) = $1,075,000.

[ID=reg-gen-1078]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - This option incorrectly subtracts from the $1,000,000 limit instead of adding the qualified retirement plan contributions and group-term life insurance coverage.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - Section 162(m) limits deductible compensation to $1,000,000 for covered employees, but this limit *doesn't* apply to qualified retirement plan contributions and group-term life insurance. Therefore, the deductible amount is $1,000,000 (salary limit) + $50,000 (retirement) + $75,000 (insurance) = $1,125,000.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This option incorrectly subtracts from the $1,000,000 limit instead of adding the qualified retirement plan contributions and group-term life insurance coverage.",
  "1": "Why option B is CORRECT - Section 162(m) limits deductible compensation to $1,000,000 for covered employees, but this limit *doesn't* apply to qualified retirement plan contributions and group-term life insurance. Therefore, the deductible amount is $1,000,000 (salary limit) + $50,000 (retirement) + $75,000 (insurance) = $1,125,000.",
  "2": "Why option C is WRONG - This option only considers the initial salary and ignores the qualified retirement plan contributions and group-term life insurance coverage, which are also deductible.",
  "3": "Why option D is WRONG - This option incorrectly adds the full salary to the retirement and insurance benefits without considering the $1,000,000 compensation limit."
}
```

---

### `reg-gen-1080`

**Topic:** Distributable net income / Estate and Trust DNI
**Blueprint Area:** REG-IV

**Question:**
> The Elizabeth Trust is a simple trust. During the current year, it had the following activity:

*   Dividend income: $50,000
*   Taxable interest income: $20,000
*   Long-term capital gains: $10,000 (allocated to corpus)
*   Trustee fees (allocated to income): $5,000

Under the terms of the trust agreement, all income is required to be distributed currently to Elizabeth. What is the amount of Distributable Net Income (DNI) for the Elizabeth Trust?

**Options:**
- ✓ **A:** $65,000
-   **B:** $70,000
-   **C:** $63,000
-   **D:** $75,000

**Marked Correct Answer:** A (index 0)

**Explanation:**
> IRC Section 162(m) limits the deduction for compensation paid to certain covered employees of publicly held corporations to $1,000,000. However, this limitation does not apply to qualified retirement plan contributions and group-term life insurance coverage. Therefore, ABC Corporation can deduct the $1,000,000 limit, the $50,000 qualified retirement plan contribution, but only $75,000 - $50,000 = $25,000 of the group-term life insurance, for a total deduction of $1,075,000. $1,000,000 (Salary Limit) + $50,000 (retirement) + $25,000(insurance) = $1,075,000.

[ID=reg-gen-1078]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - This answer incorrectly subtracts the trustee fees from the combined dividend and interest income. While trustee fees are deductible in calculating taxable income, the initial calculation of DNI starts with gross income before deductions.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - Distributable Net Income (DNI) for a simple trust starts with the trust's gross income (dividends + interest). Capital gains allocated to corpus are excluded from the DNI calculation. Therefore, DNI is $50,000 (dividends) + $20,000 (interest) = $70,000.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This answer incorrectly subtracts the trustee fees from the combined dividend and interest income. While trustee fees are deductible in calculating taxable income, the initial calculation of DNI starts with gross income before deductions.",
  "1": "Why option B is CORRECT - Distributable Net Income (DNI) for a simple trust starts with the trust's gross income (dividends + interest). Capital gains allocated to corpus are excluded from the DNI calculation. Therefore, DNI is $50,000 (dividends) + $20,000 (interest) = $70,000.",
  "2": "Why option C is WRONG - This answer incorrectly subtracts the trustee fees from the combined dividend and interest income, and then adds back the capital gains. Capital gains allocated to corpus are not included in DNI.",
  "3": "Why option D is WRONG - This answer incorrectly includes the long-term capital gains in the calculation of DNI. Capital gains allocated to the corpus of the trust are excluded from DNI."
}
```

---

### `reg-gen-1103`

**Topic:** Sales and liquidations / Liquidating distributions
**Blueprint Area:** REG-IV

**Question:**
> ABC Partnership has three equal partners: Alice, Bob, and Carol. Alice's basis in her partnership interest is $40,000. In complete liquidation of her partnership interest, Alice receives $10,000 cash, land with a fair market value of $15,000 (basis to the partnership of $8,000), and inventory with a fair market value of $15,000 (basis to the partnership of $12,000). What is the amount of Alice's recognized loss or gain on the liquidation?

**Options:**
- ✓ **A:** A $0
-   **B:** B $10,000 loss
-   **C:** C $10,000 gain
-   **D:** D $5,000 loss

**Marked Correct Answer:** A (index 0)

**Explanation:**
> Jane's initial basis is calculated as follows: Adjusted basis of contributed property ($60,000) less the portion of the liability assumed by the other partners (75% * $30,000 = $22,500), resulting in $37,500. She then increases her basis by the amount of her individual liability assumed by the partnership ($30,000 * 25% = $7,500). Therefore, her initial basis is $37,500 - $7,500 = $30,000. (IRC 722)

[ID=reg-gen-1095]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Option A is WRONG because Alice does recognize a loss in this liquidation. The loss arises because the cash and basis of the inventory she received are less than her partnership basis, and she also received land.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Option B is CORRECT because when a partner receives cash, inventory, and other assets in liquidation, a loss is recognized if the partner's outside basis exceeds the sum of cash received and the partnership's basis in the inventory and other assets distributed. The loss is calculated as $40,000 (outside basis) - $10,000 (cash) - $12,000 (inventory basis) - $8,000 (land basis) = $10,000.

**whyWrong (Full):**
```json
{
  "0": "Option A is WRONG because Alice does recognize a loss in this liquidation. The loss arises because the cash and basis of the inventory she received are less than her partnership basis, and she also received land.",
  "1": "Option B is CORRECT because when a partner receives cash, inventory, and other assets in liquidation, a loss is recognized if the partner's outside basis exceeds the sum of cash received and the partnership's basis in the inventory and other assets distributed. The loss is calculated as $40,000 (outside basis) - $10,000 (cash) - $12,000 (inventory basis) - $8,000 (land basis) = $10,000.",
  "2": "Option C is WRONG because Alice recognizes a loss, not a gain, in this liquidation. Her outside basis exceeds the value of the assets she received.",
  "3": "Option D is WRONG because the loss is $10,000, not $5,000. The calculation must include the cash, inventory basis, and land basis received in relation to the outside basis."
}
```

---

### `reg-gen-1119`

**Topic:** Distributable net income / Simple Trust DNI Calculation
**Blueprint Area:** REG-IV

**Question:**
> The Thomas Trust is a simple trust. During the current year, it had the following transactions:

*   Dividend income: $50,000
*   Taxable interest income: $20,000
*   Long-term capital gains allocated to corpus: $10,000
*   Trustee fees allocated to income: $5,000
*   Trustee fees allocated to corpus: $2,000

According to the trust agreement, all income must be distributed annually. What is the Distributable Net Income (DNI) of the Thomas Trust?

**Options:**
-   **A:** $65,000
-   **B:** $62,000
- ✓ **C:** $75,000
-   **D:** $72,000

**Marked Correct Answer:** C (index 2)

**Explanation:**
> Lisa's self-employment income includes both her guaranteed payment and her distributive share of partnership income. Her distributive share is 20% of $200,000, which is $40,000. The guaranteed payment of $50,000 is also subject to self-employment tax. Therefore, Lisa's income subject to self-employment tax is $40,000 + $50,000 = $90,000. See IRC Section 1402.

[ID=reg-gen-1110]

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is C:
> Why option B is CORRECT - Distributable Net Income (DNI) starts with taxable income and is adjusted. Here, it's calculated as dividend income ($50,000) + interest income ($20,000) - trustee fees allocated to income ($5,000) - exemption ($3,000) = $62,000. Capital gains allocated to corpus are excluded from DNI.

⚠️ **whyWrong[2] (Option C)** says this is WRONG, but it IS the correct answer:
> Why option C is WRONG - This answer incorrectly includes the long-term capital gains allocated to the corpus in the DNI calculation. Capital gains allocated to corpus are excluded from DNI.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This answer fails to subtract the trustee fees allocated to income, which reduces the amount available for distribution and therefore impacts DNI.",
  "1": "Why option B is CORRECT - Distributable Net Income (DNI) starts with taxable income and is adjusted. Here, it's calculated as dividend income ($50,000) + interest income ($20,000) - trustee fees allocated to income ($5,000) - exemption ($3,000) = $62,000. Capital gains allocated to corpus are excluded from DNI.",
  "2": "Why option C is WRONG - This answer incorrectly includes the long-term capital gains allocated to the corpus in the DNI calculation. Capital gains allocated to corpus are excluded from DNI.",
  "3": "Why option D is WRONG - This answer fails to subtract the $3,000 exemption for simple trusts when calculating DNI."
}
```

---

### `reg-gen-1193`

**Topic:** Section 1231 / Section 1245 Depreciation Recapture
**Blueprint Area:** REG-V

**Question:**
> XYZ Corporation sold equipment used in its manufacturing operations for $85,000. The equipment was originally purchased for $120,000 and had accumulated depreciation of $60,000. What is the amount of Section 1245 ordinary income recognized on the sale?

**Options:**
- ✓ **A:** $25,000
-   **B:** $35,000
-   **C:** $60,000
-   **D:** $85,000

**Marked Correct Answer:** A (index 0)

**Explanation:**
> Alpha's realized gain is $150,000 ($400,000 - $250,000). John's disallowed loss is $125,000 ($375,000 - $250,000). Under IRC Section 267(d), Alpha can reduce its gain by the amount of the previously disallowed loss. However, the loss can only offset the gain up to the amount of the gain. Therefore, Alpha's recognized gain is $150,000.

[ID=reg-gen-1188]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - This answer incorrectly identifies the gain recognized as the Section 1245 income without comparing it to the accumulated depreciation. Remember to always compare the gain to the accumulated depreciation and choose the *lower* amount.

⚠️ **whyWrong[2] (Option C)** says this is CORRECT, but the correctAnswer is A:
> Why option C is CORRECT - Section 1245 dictates that the *lesser* of the gain recognized or the accumulated depreciation is treated as ordinary income. The gain recognized is $25,000 ($85,000 - ($120,000 - $60,000)), while the accumulated depreciation is $60,000. Therefore, the Section 1245 ordinary income is $25,000.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This answer incorrectly identifies the gain recognized as the Section 1245 income without comparing it to the accumulated depreciation. Remember to always compare the gain to the accumulated depreciation and choose the *lower* amount.",
  "1": "Why option B is WRONG - This amount has no direct calculation or logical basis within the Section 1245 rules for this scenario. It's a distractor number.",
  "2": "Why option C is CORRECT - Section 1245 dictates that the *lesser* of the gain recognized or the accumulated depreciation is treated as ordinary income. The gain recognized is $25,000 ($85,000 - ($120,000 - $60,000)), while the accumulated depreciation is $60,000. Therefore, the Section 1245 ordinary income is $25,000.",
  "3": "Why option D is WRONG - This is the sales price of the equipment, which is not directly relevant to calculating Section 1245 ordinary income. You need to calculate the gain and compare it to the accumulated depreciation."
}
```

---

### `reg-gen-1204`

**Topic:** Section 1231 assets / Netting process and lookback rule
**Blueprint Area:** REG-III

**Question:**
> During the current year, Ted had the following gains and losses:

*   Gain from sale of land used in his business and held for 3 years: $25,000
*   Loss from sale of equipment used in his business and held for 2 years: $12,000
*   Loss from the destruction of a building used in his business and held for 5 years due to a hurricane (insurance did not fully cover the loss): $30,000

In the five preceding tax years, Ted had a net Section 1231 loss of $5,000 that was treated as an ordinary loss. What is the amount and character of Ted's gain or loss that should be reported on his current year's tax return?

**Options:**
- ✓ **A:** Ordinary loss of $17,000.
-   **B:** Ordinary loss of $12,000; capital gain of $5,000.
-   **C:** Ordinary gain of $5,000; capital loss of $12,000; capital gain of $25,000.
-   **D:** Ordinary gain of $5,000; capital loss of $17,000.

**Marked Correct Answer:** A (index 0)

**Explanation:**
> First, net the Section 1231 gains and losses: $25,000 (gain) - $12,000 (loss) - $30,000 (loss) = ($17,000). Because the net result is a loss, it is treated as an ordinary loss. However, due to the Section 1231 lookback rule, the portion of the loss equal to the net 1231 losses deducted in the previous five years ($5,000) is recharacterized as ordinary income in the current year. This reduces the ordinary loss. Therefore, the net ordinary loss is $17,000. The $5,000 recharacterized as ordinary income is already factored into the net $17,000 ordinary loss.

[ID=reg-gen-1205]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - This option fails to account for the Section 1231 lookback rule, which requires recharacterization of a portion of the current year's loss as ordinary income due to prior year losses.

⚠️ **whyWrong[3] (Option D)** says this is CORRECT, but the correctAnswer is A:
> Why option D is CORRECT - The net Section 1231 loss of $17,000 is initially treated as an ordinary loss. However, the $5,000 Section 1231 lookback rule requires that $5,000 be recharacterized as ordinary income, leaving an ordinary loss of $12,000.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This option fails to account for the Section 1231 lookback rule, which requires recharacterization of a portion of the current year's loss as ordinary income due to prior year losses.",
  "1": "Why option B is WRONG - While this option acknowledges both ordinary income and a capital loss, it incorrectly calculates the amounts and doesn't properly apply the Section 1231 lookback rule.",
  "2": "Why option C is WRONG - This option incorrectly treats the net Section 1231 loss as a capital loss and fails to properly apply the Section 1231 lookback rule to recharacterize a portion of the loss as ordinary income.",
  "3": "Why option D is CORRECT - The net Section 1231 loss of $17,000 is initially treated as an ordinary loss. However, the $5,000 Section 1231 lookback rule requires that $5,000 be recharacterized as ordinary income, leaving an ordinary loss of $12,000."
}
```

---

### `reg-gen-1228`

**Topic:** Section 1231 assets / Section 1245 Recapture
**Blueprint Area:** REG-III

**Question:**
> Acme Corp. sold machinery used in its business for $500,000. The original cost of the machinery was $600,000, and accumulated depreciation was $250,000. What is the amount of Section 1245 ordinary income recognized on the sale?

**Options:**
-   **A:** $250,000
- ✓ **B:** $150,000
-   **C:** $0
-   **D:** $500,000

**Marked Correct Answer:** B (index 1)

**Explanation:**
> Section 1245 recapture applies to personal property. The gain is the lower of the accumulated depreciation or the gain realized. The gain realized is $500,000 (amount realized) - $350,000 (adjusted basis: $600,000 - $250,000) = $150,000. Since the gain realized of $150,000 is less than the accumulated depreciation of $250,000, the Section 1245 ordinary income is $150,000. IRC Section 1245.

```

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is CORRECT, but the correctAnswer is B:
> Why option A is CORRECT - Section 1245 recapture treats gains from the sale of depreciated personal property as ordinary income to the extent of accumulated depreciation. The gain realized is $150,000 ($500,000 - $350,000), but the potential recapture is limited to the accumulated depreciation of $250,000. Since the gain is less than the accumulated depreciation, the entire gain of $150,000 is treated as ordinary income under Section 1245.

⚠️ **whyWrong[1] (Option B)** says this is WRONG, but it IS the correct answer:
> Why option B is WRONG - This is the amount of the gain realized on the sale ($500,000 - $350,000), but the question asks for the amount of Section 1245 ordinary income, which is limited to the accumulated depreciation.

**whyWrong (Full):**
```json
{
  "0": "Why option A is CORRECT - Section 1245 recapture treats gains from the sale of depreciated personal property as ordinary income to the extent of accumulated depreciation. The gain realized is $150,000 ($500,000 - $350,000), but the potential recapture is limited to the accumulated depreciation of $250,000. Since the gain is less than the accumulated depreciation, the entire gain of $150,000 is treated as ordinary income under Section 1245.",
  "1": "Why option B is WRONG - This is the amount of the gain realized on the sale ($500,000 - $350,000), but the question asks for the amount of Section 1245 ordinary income, which is limited to the accumulated depreciation.",
  "2": "Why option C is WRONG - There *is* a gain on the sale of the asset, and Section 1245 applies to recapture some or all of that gain as ordinary income.",
  "3": "Why option D is WRONG - This is the amount realized from the sale, not the amount of ordinary income recognized under Section 1245."
}
```

---

### `reg-gen-1230`

**Topic:** Installment sales / Calculation of Gross Profit Percentage
**Blueprint Area:** REG-V

**Question:**
> In 2024, John sold a building for $500,000. His adjusted basis in the building was $300,000. Selling expenses were $20,000. John will receive $100,000 in 2024 and the remaining $400,000 in 2025. What is John's gross profit percentage for the sale?

**Options:**
- ✓ **A:** 36%
-   **B:** 40%
-   **C:** 60%
-   **D:** 64%

**Marked Correct Answer:** A (index 0)

**Explanation:**
> The gross profit is the selling price less the adjusted basis and selling expenses ($500,000 - $300,000 - $20,000 = $180,000). The gross profit percentage is the gross profit divided by the selling price ($180,000 / $500,000 = 36%). Therefore the gross profit percentage is 36%. IRC Section 453.

```

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - This answer incorrectly calculates the gross profit percentage by dividing the gross profit ($180,000) by the *selling price* ($500,000) instead of the *amount realized* ($480,000). The gross profit percentage should be calculated as $180,000/$480,000.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - The gross profit percentage is calculated by dividing the gross profit by the amount realized. The gross profit is the selling price less the adjusted basis and selling expenses ($500,000 - $300,000 - $20,000 = $180,000). The amount realized is the selling price less selling expenses ($500,000 - $20,000 = $480,000). Therefore, the gross profit percentage is $180,000 / $480,000 = 37.5%, which rounds to 40% (the closest answer).

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This answer incorrectly calculates the gross profit percentage by dividing the gross profit ($180,000) by the *selling price* ($500,000) instead of the *amount realized* ($480,000). The gross profit percentage should be calculated as $180,000/$480,000.",
  "1": "Why option B is CORRECT - The gross profit percentage is calculated by dividing the gross profit by the amount realized. The gross profit is the selling price less the adjusted basis and selling expenses ($500,000 - $300,000 - $20,000 = $180,000). The amount realized is the selling price less selling expenses ($500,000 - $20,000 = $480,000). Therefore, the gross profit percentage is $180,000 / $480,000 = 37.5%, which rounds to 40% (the closest answer).",
  "2": "Why option C is WRONG - This answer is not derived from a logical calculation using the information provided in the question. It doesn't reflect the correct relationship between selling price, adjusted basis, selling expenses, and gross profit.",
  "3": "Why option D is WRONG - This answer is not derived from a logical calculation using the information provided in the question. It doesn't reflect the correct relationship between selling price, adjusted basis, selling expenses, and gross profit."
}
```

---

### `reg-gen-1240`

**Topic:** Like-kind exchanges (Section 1031) / Like-Kind Exchanges
**Blueprint Area:** REG-III

**Question:**
> ABC Corporation exchanged an old machine with an adjusted basis of $80,000 for a new machine. ABC also received $10,000 cash as part of the exchange. The new machine had a fair market value of $95,000. What is ABC's basis in the new machine?

**Options:**
- ✓ **A:** $70,000
-   **B:** $75,000
-   **C:** $80,000
-   **D:** $95,000

**Marked Correct Answer:** A (index 0)

**Explanation:**
> The basis in the new machine is calculated as follows: Adjusted basis of old machine ($80,000) - Cash received ($10,000) + Gain recognized ($10,000, because the cash received is less than the realized gain). Therefore, the basis in the new machine is $80,000 - $10,000 + $10,000 = $80,000. The gain recognized is the lesser of the realized gain or the boot received. Realized gain is FMV new machine + cash - adjusted basis old machine = $95,000 + $10,000 - $80,000 = $25,000. Boot received is $10,000. Therefore, gain recognized is $10,000. The basis in the new machine is $80,000 - $10,000 + $10,000 = $80,000. The formula for basis in a like-kind exchange is: Adjusted basis of old property - Boot received + Gain recognized. Therefore, the basis in the new machine is $80,000 - $10,000 + $10,000 = $80,000.

[ID=reg-gen-1241]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG: This answer incorrectly subtracts the cash received from the adjusted basis of the old machine and fails to account for the potential gain recognition. The correct calculation requires considering both cash received and any recognized gain.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT: The basis in the new machine is calculated as: Adjusted basis of old machine ($80,000) - Cash received ($10,000). Since the cash received ($10,000) is less than the realized gain (FMV of new machine + cash - adjusted basis of old machine = $95,000 + $10,000 - $80,000 = $25,000), the gain recognized is limited to the cash received. Therefore, the basis in the new machine is $80,000 - $10,000 = $70,000.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG: This answer incorrectly subtracts the cash received from the adjusted basis of the old machine and fails to account for the potential gain recognition. The correct calculation requires considering both cash received and any recognized gain.",
  "1": "Why option B is CORRECT: The basis in the new machine is calculated as: Adjusted basis of old machine ($80,000) - Cash received ($10,000). Since the cash received ($10,000) is less than the realized gain (FMV of new machine + cash - adjusted basis of old machine = $95,000 + $10,000 - $80,000 = $25,000), the gain recognized is limited to the cash received. Therefore, the basis in the new machine is $80,000 - $10,000 = $70,000.",
  "2": "Why option C is WRONG: This answer simply states the adjusted basis of the old machine and does not account for the cash received in the exchange. The cash received reduces the basis of the new asset.",
  "3": "Why option D is WRONG: This answer represents the fair market value of the new machine, not its basis. In a like-kind exchange with boot received, the basis is not simply the fair market value."
}
```

---

### `reg-gen-1241`

**Topic:** Basis determination / Gifted Property Basis
**Blueprint Area:** REG-III

**Question:**
> John received a parcel of land as a gift from his mother. At the time of the gift, the land had a fair market value of $200,000 and an adjusted basis to his mother of $150,000. His mother paid gift tax of $20,000 on the transfer. John later sold the land for $220,000. What is John's basis in the land for determining gain?

**Options:**
- ✓ **A:** $150,000
-   **B:** $165,000
-   **C:** $170,000
-   **D:** $200,000

**Marked Correct Answer:** A (index 0)

**Explanation:**
> The basis in the new machine is calculated as follows: Adjusted basis of old machine ($80,000) - Cash received ($10,000) + Gain recognized ($10,000, because the cash received is less than the realized gain). Therefore, the basis in the new machine is $80,000 - $10,000 + $10,000 = $80,000. The gain recognized is the lesser of the realized gain or the boot received. Realized gain is FMV new machine + cash - adjusted basis old machine = $95,000 + $10,000 - $80,000 = $25,000. Boot received is $10,000. Therefore, gain recognized is $10,000. The basis in the new machine is $80,000 - $10,000 + $10,000 = $80,000. The formula for basis in a like-kind exchange is: Adjusted basis of old property - Boot received + Gain recognized. Therefore, the basis in the new machine is $80,000 - $10,000 + $10,000 = $80,000.

[ID=reg-gen-1241]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - This option only considers the mother's adjusted basis and ignores the portion of the gift tax that can be added to the basis.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - John's basis is his mother's adjusted basis ($150,000) plus the gift tax paid attributable to the appreciation. The appreciation is $50,000 ($200,000 FMV - $150,000 adjusted basis). The gift tax attributable to the appreciation is ($50,000/$200,000) * $20,000 = $5,000. Therefore, John's basis is $150,000 + $5,000 = $155,000. The closest answer choice is $165,000. The correct calculation is $150,000 + ($200,000-$150,000)/$200,000 * $20,000 = $155,000. None of the answers are correct. However, option B is the closest.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This option only considers the mother's adjusted basis and ignores the portion of the gift tax that can be added to the basis.",
  "1": "Why option B is CORRECT - John's basis is his mother's adjusted basis ($150,000) plus the gift tax paid attributable to the appreciation. The appreciation is $50,000 ($200,000 FMV - $150,000 adjusted basis). The gift tax attributable to the appreciation is ($50,000/$200,000) * $20,000 = $5,000. Therefore, John's basis is $150,000 + $5,000 = $155,000. The closest answer choice is $165,000. The correct calculation is $150,000 + ($200,000-$150,000)/$200,000 * $20,000 = $155,000. None of the answers are correct. However, option B is the closest.",
  "2": "Why option C is WRONG - This option does not correctly calculate the portion of the gift tax attributable to the appreciation in value.",
  "3": "Why option D is WRONG - This option uses the fair market value at the time of the gift, which is only relevant for determining loss, not gain, and does not account for any gift tax adjustment."
}
```

---

### `reg-gen-1248`

**Topic:** Section 1231 / Calculation of 1245 and 1250 recapture
**Blueprint Area:** REG-V

**Question:**
> XYZ Corporation sold a machine used in its manufacturing operations for $350,000. The machine was originally purchased for $500,000, and accumulated depreciation totaled $200,000. What is the amount of Section 1245 ordinary income recognized on the sale?

**Options:**
- ✓ **A:** $50,000
-   **B:** $150,000
-   **C:** $200,000
-   **D:** $350,000

**Marked Correct Answer:** A (index 0)

**Explanation:**
> The basis in the new machine is calculated as follows: Adjusted basis of old machine ($80,000) - Cash received ($10,000) + Gain recognized ($10,000, because the cash received is less than the realized gain). Therefore, the basis in the new machine is $80,000 - $10,000 + $10,000 = $80,000. The gain recognized is the lesser of the realized gain or the boot received. Realized gain is FMV new machine + cash - adjusted basis old machine = $95,000 + $10,000 - $80,000 = $25,000. Boot received is $10,000. Therefore, gain recognized is $10,000. The basis in the new machine is $80,000 - $10,000 + $10,000 = $80,000. The formula for basis in a like-kind exchange is: Adjusted basis of old property - Boot received + Gain recognized. Therefore, the basis in the new machine is $80,000 - $10,000 + $10,000 = $80,000.

[ID=reg-gen-1241]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - This answer incorrectly calculates the gain and then subtracts the gain from the accumulated depreciation. Section 1245 recapture is the *lesser* of the gain or accumulated depreciation, not the difference.

⚠️ **whyWrong[2] (Option C)** says this is CORRECT, but the correctAnswer is A:
> Why option C is CORRECT - Section 1245 recapture treats a portion of the gain on the sale of depreciable personal property as ordinary income to the extent of accumulated depreciation. The gain recognized is $50,000 ($350,000 - ($500,000 - $200,000)), and the accumulated depreciation is $200,000. Therefore, the Section 1245 ordinary income is $50,000, the lesser of the gain or accumulated depreciation.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This answer incorrectly calculates the gain and then subtracts the gain from the accumulated depreciation. Section 1245 recapture is the *lesser* of the gain or accumulated depreciation, not the difference.",
  "1": "Why option B is WRONG - This answer may result from confusing the calculation or misinterpreting which amount to compare for the Section 1245 recapture. Remember to calculate the gain first.",
  "2": "Why option C is CORRECT - Section 1245 recapture treats a portion of the gain on the sale of depreciable personal property as ordinary income to the extent of accumulated depreciation. The gain recognized is $50,000 ($350,000 - ($500,000 - $200,000)), and the accumulated depreciation is $200,000. Therefore, the Section 1245 ordinary income is $50,000, the lesser of the gain or accumulated depreciation.",
  "3": "Why option D is WRONG - This answer represents the entire sales price of the machine, not the Section 1245 ordinary income. Section 1245 only applies to the extent of accumulated depreciation or the gain, whichever is less."
}
```

---

### `reg-gen-1255`

**Topic:** Capital gains and losses / Section 1231 Gains and Losses
**Blueprint Area:** REG-V

**Question:**
> XYZ Corporation sold the following assets during the year:

*   Land held for investment for 3 years, resulting in a $30,000 gain.
*   Equipment purchased 5 years ago for $100,000, with accumulated depreciation of $40,000, sold for $75,000.

What is the net Section 1231 gain or loss that XYZ Corporation will report?

**Options:**
- ✓ **A:** A $30,000 gain.
-   **B:** A $65,000 gain.
-   **C:** A $5,000 loss.
-   **D:** A $35,000 gain.

**Marked Correct Answer:** A (index 0)

**Explanation:**
> The sale of land held for investment for 3 years results in a $30,000 Section 1231 gain. The sale of equipment results in a $15,000 gain ($75,000 sales price - $60,000 adjusted basis ($100,000 cost - $40,000 accumulated depreciation)). This gain is subject to Section 1245 recapture rules to the extent of accumulated depreciation. Because the gain ($15,000) is less than the accumulated depreciation ($40,000), the entire gain is treated as ordinary income under Section 1245 and not as a Section 1231 gain. Therefore, the net Section 1231 gain is $30,000 from the land sale and $0 from the equipment sale, for a total net Section 1231 gain of $30,000.

```
```
[ID=reg-gen-1258]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - This answer only considers the gain from the sale of land and incorrectly assumes the equipment sale does not contribute to the Section 1231 gain.

⚠️ **whyWrong[3] (Option D)** says this is CORRECT, but the correctAnswer is A:
> Why option D is CORRECT - The land sale resulted in a $30,000 Section 1231 gain. The equipment sale resulted in a $15,000 gain ($75,000 - $60,000). Because the gain is less than the accumulated depreciation, the entire $15,000 gain is treated as ordinary income under Section 1245. The remaining proceeds of $5,000 ($75,000 - $50,000 original cost) is Section 1231 gain. Therefore, the net Section 1231 gain is $30,000 (land) + $5,000 (equipment) = $35,000.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This answer only considers the gain from the sale of land and incorrectly assumes the equipment sale does not contribute to the Section 1231 gain.",
  "1": "Why option B is WRONG - This answer incorrectly adds the entire proceeds from the equipment sale to the land sale gain, failing to account for the adjusted basis and Section 1245 recapture.",
  "2": "Why option C is WRONG - There is no overall loss in this scenario; both asset sales resulted in gains. This option likely arises from misinterpreting the impact of depreciation or incorrectly calculating the adjusted basis.",
  "3": "Why option D is CORRECT - The land sale resulted in a $30,000 Section 1231 gain. The equipment sale resulted in a $15,000 gain ($75,000 - $60,000). Because the gain is less than the accumulated depreciation, the entire $15,000 gain is treated as ordinary income under Section 1245. The remaining proceeds of $5,000 ($75,000 - $50,000 original cost) is Section 1231 gain. Therefore, the net Section 1231 gain is $30,000 (land) + $5,000 (equipment) = $35,000."
}
```

---

### `reg-gen-1265`

**Topic:** Like-kind exchanges (Section 1031) / Like-Kind Exchanges - Boot Received
**Blueprint Area:** REG-III

**Question:**
> Jane exchanged land with an adjusted basis of $300,000 and a fair market value of $450,000 for other land with a fair market value of $400,000. Jane also received $50,000 cash (boot) in the exchange. What is Jane's basis in the land she received?

**Options:**
- ✓ **A:** $300,000
-   **B:** $250,000
-   **C:** $400,000
-   **D:** $350,000

**Marked Correct Answer:** A (index 0)

**Explanation:**
> The sale of land held for investment for 3 years results in a $30,000 Section 1231 gain. The sale of equipment results in a $15,000 gain ($75,000 sales price - $60,000 adjusted basis ($100,000 cost - $40,000 accumulated depreciation)). This gain is subject to Section 1245 recapture rules to the extent of accumulated depreciation. Because the gain ($15,000) is less than the accumulated depreciation ($40,000), the entire gain is treated as ordinary income under Section 1245 and not as a Section 1231 gain. Therefore, the net Section 1231 gain is $30,000 from the land sale and $0 from the equipment sale, for a total net Section 1231 gain of $30,000.

```
```
[ID=reg-gen-1258]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - This answer fails to account for the boot received, which reduces the basis in the new property.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - In a like-kind exchange with boot, the basis of the new property is the old basis less the boot received, plus any gain recognized (limited to the boot received). Here, the basis is $300,000 (old basis) - $50,000 (boot) + $0 (gain recognized) = $250,000.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This answer fails to account for the boot received, which reduces the basis in the new property.",
  "1": "Why option B is CORRECT - In a like-kind exchange with boot, the basis of the new property is the old basis less the boot received, plus any gain recognized (limited to the boot received). Here, the basis is $300,000 (old basis) - $50,000 (boot) + $0 (gain recognized) = $250,000.",
  "2": "Why option C is WRONG - This is the fair market value of the land received, not the basis. The basis is adjusted due to the boot received.",
  "3": "Why option D is WRONG - This answer incorrectly adds the boot to the original basis instead of subtracting it."
}
```

---

### `reg-gen-1280`

**Topic:** Installment sales / Calculation of Gross Profit Percentage
**Blueprint Area:** REG-V

**Question:**
> John sold a building used in his business for $500,000. His adjusted basis in the building was $300,000. Selling expenses were $20,000. What is John's gross profit percentage for purposes of the installment sale method?

**Options:**
- ✓ **A:** 36%
-   **B:** 40%
-   **C:** 60%
-   **D:** 64%

**Marked Correct Answer:** A (index 0)

**Explanation:**
> The gross profit percentage is calculated as (Sales Price - Adjusted Basis - Selling Expenses) / Sales Price. In this case, ($500,000 - $300,000 - $20,000) / $500,000 = $180,000 / $500,000 = 36%.

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - This answer is the gross profit divided by the sales price, but it's incorrectly labeled as the gross profit percentage. The calculation ($500,000 - $300,000 - $20,000) / $500,000 = 36% is arithmetically correct, but the question asks for the gross profit *percentage* for installment sale purposes, which requires dividing by the *recognized* sales price.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - The gross profit percentage is calculated as (Sales Price - Adjusted Basis - Selling Expenses) / Sales Price. In this case, ($500,000 - $300,000 - $20,000) / $500,000 = $180,000 / $500,000 = 36%.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - This answer is the gross profit divided by the sales price, but it's incorrectly labeled as the gross profit percentage. The calculation ($500,000 - $300,000 - $20,000) / $500,000 = 36% is arithmetically correct, but the question asks for the gross profit *percentage* for installment sale purposes, which requires dividing by the *recognized* sales price.",
  "1": "Why option B is CORRECT - The gross profit percentage is calculated as (Sales Price - Adjusted Basis - Selling Expenses) / Sales Price. In this case, ($500,000 - $300,000 - $20,000) / $500,000 = $180,000 / $500,000 = 36%.",
  "2": "Why option C is WRONG - This answer is not derived from a logical calculation using the provided information. It doesn't represent any meaningful relationship between the sales price, adjusted basis, and selling expenses.",
  "3": "Why option D is WRONG - This answer is not derived from a logical calculation using the provided information. It doesn't represent any meaningful relationship between the sales price, adjusted basis, and selling expenses."
}
```

---

### `reg-gen-1346`

**Topic:** Filing status determination / Head of Household
**Blueprint Area:** REG-III

**Question:**
> Jeremy maintained a household for his unmarried 19-year-old cousin, Lisa, who lived with him for the entire year. Lisa had gross income of $8,000 and Jeremy provided more than half of her support. Lisa is not Jeremy's qualifying child under the rules for dependency because of her age, but she is Jeremy's qualifying relative. Jeremy is not married at the end of the year. What is Jeremy's filing status?

**Options:**
-   **A:** Single
- ✓ **B:** Head of Household
-   **C:** Married Filing Separately
-   **D:** Qualifying Surviving Spouse

**Marked Correct Answer:** B (index 1)

**Explanation:**
> Jeremy can file as Head of Household. To qualify for Head of Household status, Jeremy must be unmarried and pay more than half the costs of keeping up a home that is the principal residence for more than half the year for a qualifying child or qualifying relative. Lisa is Jeremy's qualifying relative because she lived with him all year, Jeremy provided more than half of her support, and her gross income is less than the limit ($4,700 for 2024, but this limit is not relevant since her income is $8,000). IRC 2(b).

[ID=reg-gen-1351]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is CORRECT, but the correctAnswer is B:
> Why option A is CORRECT - Jeremy does not qualify for any other filing status. He is unmarried and does not have a qualifying child or dependent parent, so his filing status is Single.

⚠️ **whyWrong[1] (Option B)** says this is WRONG, but it IS the correct answer:
> Why option B is WRONG - To file as Head of Household, Jeremy must maintain a household for a qualifying child or a dependent parent. While Lisa is Jeremy's qualifying relative, she is his cousin, not his qualifying child or dependent parent, therefore he cannot file as Head of Household.

**whyWrong (Full):**
```json
{
  "0": "Why option A is CORRECT - Jeremy does not qualify for any other filing status. He is unmarried and does not have a qualifying child or dependent parent, so his filing status is Single.",
  "1": "Why option B is WRONG - To file as Head of Household, Jeremy must maintain a household for a qualifying child or a dependent parent. While Lisa is Jeremy's qualifying relative, she is his cousin, not his qualifying child or dependent parent, therefore he cannot file as Head of Household.",
  "2": "Why option C is WRONG - The question states that Jeremy is not married at the end of the year, making Married Filing Separately an incorrect filing status.",
  "3": "Why option D is WRONG - Qualifying Surviving Spouse (also known as Qualifying Widow(er)) status is available for two years after the death of a spouse if the taxpayer maintains a household for a qualifying child. This situation does not apply to Jeremy."
}
```

---


## TCP (23 issues)

### `tcp-093`

**Topic:** Retirement plan selection / Section 83(b) Election
**Blueprint Area:** TCP-II

**Question:**
> Mark received stock options that are subject to vesting. He wants to make a §83(b) election. Within what timeframe must Mark file this election with the IRS?

**Options:**
- ✓ **A:** 30 days of the option grant date, regardless of vesting schedules
-   **B:** 30 days of receiving substantially non-vested property
-   **C:** 60 days from the date the stock options become fully vested and exercisable
-   **D:** By December 31st of the year the stock options were initially granted

**Marked Correct Answer:** A (index 0)

**Explanation:**
> An election under §83(b) must be made within 30 days of the date the property (stock) is transferred to the employee, regardless of when the stock becomes substantially vested.

[ID=tcp-d1-025]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - The 30-day period begins when the substantially non-vested property is *received*, not when the option is granted. The grant date is irrelevant for the §83(b) election timing.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - A §83(b) election allows you to pay taxes on the fair market value of restricted stock or property when you *receive* it, rather than when it vests. This election must be made within 30 days of receiving the property.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - The 30-day period begins when the substantially non-vested property is *received*, not when the option is granted. The grant date is irrelevant for the §83(b) election timing.",
  "1": "Why option B is CORRECT - A §83(b) election allows you to pay taxes on the fair market value of restricted stock or property when you *receive* it, rather than when it vests. This election must be made within 30 days of receiving the property.",
  "2": "Why option C is WRONG - The §83(b) election must be made *before* vesting occurs, not after. Waiting until vesting defeats the purpose of the election, which is to pay taxes on the value at grant rather than at vesting.",
  "3": "Why option D is WRONG - The election deadline is not tied to the calendar year-end. The 30-day window from the date of transfer is the only relevant timeframe."
}
```

---

### `tcp-d1-025`

**Topic:** Net investment income tax / NIIT Calculation
**Blueprint Area:** TCP-I

**Question:**
> The 3.8% Net Investment Income Tax (NIIT) applies to the lesser of net investment income or the excess of modified AGI over the threshold amount. For a married couple filing jointly, the MAGI threshold is:

**Options:**
- ✓ **A:** $400,000
-   **B:** $250,000
-   **C:** $500,000
-   **D:** $200,000

**Marked Correct Answer:** A (index 0)

**Explanation:**
> An election under §83(b) must be made within 30 days of the date the property (stock) is transferred to the employee, regardless of when the stock becomes substantially vested.

[ID=tcp-d1-025]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - $400,000 is not a threshold amount for the Net Investment Income Tax (NIIT). It is a common threshold in other tax contexts, which makes it a distractor.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - The modified adjusted gross income (MAGI) threshold for married couples filing jointly for the Net Investment Income Tax (NIIT) is indeed $250,000. The NIIT is calculated on the *lesser* of net investment income or the amount by which MAGI exceeds this threshold.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - $400,000 is not a threshold amount for the Net Investment Income Tax (NIIT). It is a common threshold in other tax contexts, which makes it a distractor.",
  "1": "Why option B is CORRECT - The modified adjusted gross income (MAGI) threshold for married couples filing jointly for the Net Investment Income Tax (NIIT) is indeed $250,000. The NIIT is calculated on the *lesser* of net investment income or the amount by which MAGI exceeds this threshold.",
  "2": "Why option C is WRONG - $500,000 is not a threshold amount for the Net Investment Income Tax (NIIT). This number may be confused with other high-income thresholds, but it's incorrect here.",
  "3": "Why option D is WRONG - $200,000 is the MAGI threshold for single filers and heads of household, not for married couples filing jointly, for the Net Investment Income Tax (NIIT)."
}
```

---

### `tcp-d3-006`

**Topic:** Qualified Business Income / SSTB Limitations
**Blueprint Area:** TCP-I

**Question:**
> A CPA firm (specified service trade or business) has QBI of $500,000. The sole owner's taxable income before the QBI deduction is $450,000 (filing jointly). What is the QBI deduction?

**Options:**
- ✓ **A:** $90,000 — calculated as 20% of taxable income before the QBI deduction.
-   **B:** $100,000 — calculated as 20% of QBI, before considering any limitations.
-   **C:** $50,000 — reflecting the partial phase-out of the QBI deduction, but before considering SSTB limitations.
-   **D:** $0 — SSTBs are fully phased out above $394,600 (MFJ) for 2025

**Marked Correct Answer:** A (index 0)

**Explanation:**
> An election under §83(b) must be made within 30 days of the date the property (stock) is transferred to the employee, regardless of when the stock becomes substantially vested.

[ID=tcp-d1-025]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - The QBI deduction is not simply 20% of taxable income. It's limited to the lesser of 20% of QBI or 20% of taxable income, and SSTBs are subject to phase-out rules.

⚠️ **whyWrong[3] (Option D)** says this is CORRECT, but the correctAnswer is A:
> Why option D is CORRECT - Because the CPA firm is a specified service trade or business (SSTB) and the owner's taxable income is within the phase-out range, the QBI deduction is fully phased out. The phase-out range for MFJ in 2025 is $394,600 to $494,600.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - The QBI deduction is not simply 20% of taxable income. It's limited to the lesser of 20% of QBI or 20% of taxable income, and SSTBs are subject to phase-out rules.",
  "1": "Why option B is WRONG - While 20% of QBI is a component of the calculation, it doesn't account for the taxable income limitation or the complete phase-out for SSTBs at this income level.",
  "2": "Why option C is WRONG - While the phase-out concept is relevant, this option fails to recognize that the SSTB is completely phased out at this income level, resulting in a zero deduction.",
  "3": "Why option D is CORRECT - Because the CPA firm is a specified service trade or business (SSTB) and the owner's taxable income is within the phase-out range, the QBI deduction is fully phased out. The phase-out range for MFJ in 2025 is $394,600 to $494,600."
}
```

---

### `tcp-d4-011`

**Topic:** Professional Ethics / Circular 230 — Sanctions
**Blueprint Area:** TCP-IV

**Question:**
> John Smith, a tax preparer, has been found to be in violation of several provisions of Circular 230. Which of the following sanctions could the IRS Office of Professional Responsibility (OPR) impose on John for violating Circular 230?

**Options:**
- ✓ **A:** Suspension from practice before the IRS
-   **B:** Disbarment from practice before the IRS
-   **C:** Private reprimand (censure)
-   **D:** Criminal imprisonment by the OPR

**Marked Correct Answer:** A (index 0)

**Explanation:**
> An election under §83(b) must be made within 30 days of the date the property (stock) is transferred to the employee, regardless of when the stock becomes substantially vested.

[ID=tcp-d1-025]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - Suspension from practice before the IRS is a permissible sanction that the Office of Professional Responsibility (OPR) can impose for violations of Circular 230.

⚠️ **whyWrong[3] (Option D)** says this is CORRECT, but the correctAnswer is A:
> Why option D is CORRECT - Criminal imprisonment is not a sanction imposed by the OPR for Circular 230 violations; criminal prosecution is handled by the Department of Justice.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - Suspension from practice before the IRS is a permissible sanction that the Office of Professional Responsibility (OPR) can impose for violations of Circular 230.",
  "1": "Why option B is WRONG - Disbarment from practice before the IRS, which is a permanent ban, is another sanction that the OPR is authorized to impose.",
  "2": "Why option C is WRONG - The OPR can issue a censure, which is a reprimand, either publicly or privately, for violations of Circular 230.",
  "3": "Why option D is CORRECT - Criminal imprisonment is not a sanction imposed by the OPR for Circular 230 violations; criminal prosecution is handled by the Department of Justice."
}
```

---

### `tcp-wc-060`

**Topic:** Timing of deductions / C Corporation Estimated Tax
**Blueprint Area:** TCP-I

**Question:**
> A C corporation expects tax liability of $1,000,000 for the current year. Last year's tax was $800,000. To avoid estimated tax penalty, the corporation must pay estimated taxes of at least:

**Options:**
-   **A:** $1,000,000 (100% of current year)
-   **B:** The lesser of $800,000 or $900,000
- ✓ **C:** $800,000 (100% of prior year)
-   **D:** $900,000 (90% of current year)

**Marked Correct Answer:** C (index 2)

**Explanation:**
> Corporations avoid underpayment penalty by paying the *lesser* of: (1) 100% of the prior year's tax ($800,000), or (2) 100% of the current year's tax ($1,000,000). However, a large corporation (one with taxable income of $1 million or more in any of the three preceding tax years) cannot use the prior year exception, and must base its estimated tax payments on 100% of the current year's tax liability.

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is C:
> Why option B is CORRECT - Corporations generally avoid underpayment penalties by paying the *lesser* of 100% of the current year's tax or 100% of the prior year's tax. This allows corporations to base their estimated payments on the lower of the two amounts, minimizing their upfront tax burden.

⚠️ **whyWrong[2] (Option C)** says this is WRONG, but it IS the correct answer:
> Why option C is WRONG - While $800,000 (100% of the prior year) is a valid option, the question asks for the *minimum* payment to avoid penalties. The correct answer must consider both the current and prior year liabilities and select the lesser of the two.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - While paying 100% of the current year's tax liability avoids penalties, it's not always the *minimum* required. The corporation can use the prior year's tax liability if it's lower (subject to limitations for large corporations).",
  "1": "Why option B is CORRECT - Corporations generally avoid underpayment penalties by paying the *lesser* of 100% of the current year's tax or 100% of the prior year's tax. This allows corporations to base their estimated payments on the lower of the two amounts, minimizing their upfront tax burden.",
  "2": "Why option C is WRONG - While $800,000 (100% of the prior year) is a valid option, the question asks for the *minimum* payment to avoid penalties. The correct answer must consider both the current and prior year liabilities and select the lesser of the two.",
  "3": "Why option D is WRONG - The 90% rule applies to *individuals*, not C corporations. Corporations must generally pay either 100% of the current year's tax or 100% of the prior year's tax (subject to limitations for large corporations)."
}
```

---

### `tcp-wc-157`

**Topic:** Annual exclusion and lifetime exemption / Charitable Lead Trust
**Blueprint Area:** TCP-IV

**Question:**
> The Smith family wants to donate to charity but also retain an asset for their children in the future. A charitable lead trust (CLT):

**Options:**
-   **A:** Provides no tax benefits
- ✓ **B:** Pays income to charity with remainder to individual beneficiaries, opposite of CRT
-   **C:** Is revocable
-   **D:** Only benefits charities

**Marked Correct Answer:** B (index 1)

**Explanation:**
> A charitable lead trust (CLT) pays income to a charity for a specified term, with the remainder interest passing to non-charitable beneficiaries (e.g., family members). This is the opposite of a charitable remainder trust (CRT), which pays income to non-charitable beneficiaries with the remainder passing to charity.

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is WRONG, but it IS the correct answer:
> Why option B is WRONG - While a CLT does pay income to a charity, the remainder goes to individual beneficiaries, which is the opposite of a charitable remainder trust (CRT), not the same.

⚠️ **whyWrong[3] (Option D)** says this is CORRECT, but the correctAnswer is B:
> Why option D is CORRECT - A charitable lead trust (CLT) is specifically designed to provide a stream of income to a designated charity for a defined period, ultimately benefiting the charity during that term.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - A CLT can provide significant gift, estate, and income tax benefits, depending on its structure (grantor vs. non-grantor). The value of the charitable lead interest reduces the taxable value of the assets transferred to the remainder beneficiaries.",
  "1": "Why option B is WRONG - While a CLT does pay income to a charity, the remainder goes to individual beneficiaries, which is the opposite of a charitable remainder trust (CRT), not the same.",
  "2": "Why option C is WRONG - CLTs are generally irrevocable to ensure the donor receives the intended tax benefits and the charity receives the promised income stream. Revocability would negate the tax advantages.",
  "3": "Why option D is CORRECT - A charitable lead trust (CLT) is specifically designed to provide a stream of income to a designated charity for a defined period, ultimately benefiting the charity during that term."
}
```

---

### `tcp-gen-0933`

**Topic:** Section 338 elections / Consequences of a 338(h)(10) election
**Blueprint Area:** TCP-III

**Question:**
> ParentCo, a U.S. corporation, owns 100% of SubCo, a U.S. corporation. SubCo's assets have a fair market value of $50 million and an adjusted basis of $20 million. Unrelated BuyerCo purchases 100% of SubCo's stock from ParentCo for $50 million. ParentCo and BuyerCo jointly elect to treat the stock purchase as an asset acquisition under IRC Section 338(h)(10). SubCo has accumulated earnings and profits (E&P) of $10 million. Which of the following best describes the tax consequences of this election?

**Options:**
- ✓ **A:** ParentCo recognizes a $30 million capital gain. SubCo is treated as selling its assets in a taxable transaction, recognizing a $30 million gain, and is then treated as liquidating into BuyerCo, with no further tax consequences. BuyerCo's basis in SubCo's assets is $50 million.
-   **B:** ParentCo recognizes a $50 million capital gain, representing the difference between the sale price and its stock basis in SubCo. SubCo retains its historic asset basis of $20 million, and its accumulated E&P remains unchanged. BuyerCo's basis in SubCo's stock is $50 million, reflecting the purchase price, but this does not affect the underlying asset basis within SubCo.
-   **C:** ParentCo recognizes a $30 million capital gain. SubCo is treated as selling its assets in a taxable transaction, recognizing a $30 million gain, and is then treated as liquidating into ParentCo, with no further tax consequences. BuyerCo's basis in SubCo's assets is $50 million.
-   **D:** ParentCo recognizes no gain or loss. SubCo is treated as selling its assets in a taxable transaction, recognizing a $30 million gain, and is then treated as liquidating into ParentCo, with no further tax consequences. BuyerCo's basis in SubCo's assets is $20 million.

**Marked Correct Answer:** A (index 0)

**Explanation:**
> First, calculate the research credit: ($500,000 - $400,000) * 20% = $20,000. Next, calculate the Work Opportunity Credit: $100,000 * 40% = $40,000. The total general business credit is $20,000 + $40,000 + $10,000 (carryforward) = $70,000. The general business credit is limited to the excess of the corporation's net income tax over the greater of its tentative minimum tax or 25% of its net regular tax liability exceeding $25,000. Net income tax is $70,000. 25% of ($70,000 - $25,000) = $11,250. The limitation is $70,000 - max($15,000, $11,250) = $70,000 - $15,000 = $55,000. The small business exception allows certain small businesses to offset the entire income tax liability up to $50,000, plus 80% of the excess. Because it is not specified whether the corporation qualifies as a small business, we will use the standard calculation. Furthermore, the Research Credit is limited to the amount of the general business credit, therefore we use the general business credit limitation.
The Work Opportunity Credit is reduced by the amount of wages used to compute the credit. The deduction for wages is reduced by the amount of the credit. In this case, the WOTC of $40,000 reduced the deduction for wages. The Research Credit is also subject to a similar reduction based on IRC 280C. In this case, the corporation can elect to reduce the research credit amount and not reduce the deduction for wages. Otherwise, the deduction is reduced by the amount of the credit.

Since the total credit available is $70,000 but the limitation is $55,000, the maximum general business credit that can be used is $55,000. However, the R&D credit is subject to special limitation rules. The corporation's R&D credit cannot exceed the corporation's tax liability less 25% of the excess of the tax liability over $25,000. In this case, the tax liability is $70,000, so the limitation is $70,000 - (0.25 x ($70,000 - $25,000)) = $58,750. Because the R&D credit is limited to $58,750, the total amount of the credit that the corporation can use is $52,500 ($20,000 R&D credit + $32,500 WOTC).

[ID=tcp-gen-0912]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - SubCo is treated as liquidating into ParentCo, not BuyerCo, because it was part of ParentCo's consolidated group before the deemed asset sale.

⚠️ **whyWrong[2] (Option C)** says this is CORRECT, but the correctAnswer is A:
> Why option C is CORRECT - A 338(h)(10) election allows the buyer to step up the basis of the acquired company's assets to fair market value. The selling group recognizes gain or loss as if it sold the assets in a single transaction, and then the subsidiary liquidates into the parent company tax-free under IRC 332.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - SubCo is treated as liquidating into ParentCo, not BuyerCo, because it was part of ParentCo's consolidated group before the deemed asset sale.",
  "1": "Why option B is WRONG - The 338(h)(10) election treats the stock sale as an asset sale. Therefore, ParentCo's gain is based on SubCo's asset appreciation, not the stock sale price, and SubCo gets a step-up in asset basis to fair market value.",
  "2": "Why option C is CORRECT - A 338(h)(10) election allows the buyer to step up the basis of the acquired company's assets to fair market value. The selling group recognizes gain or loss as if it sold the assets in a single transaction, and then the subsidiary liquidates into the parent company tax-free under IRC 332.",
  "3": "Why option D is WRONG - ParentCo recognizes gain on the sale of SubCo stock. The gain is the difference between the sale price and ParentCo's basis in the SubCo stock."
}
```

---

### `tcp-gen-1030`

**Topic:** Timing of deductions / Retirement and Education Savings Plans
**Blueprint Area:** TCP-I

**Question:**
> Which of the following strategies is MOST likely to provide a taxpayer with a current-year deduction while also providing tax-advantaged growth for future educational expenses?

**Options:**
- ✓ **A:** Contributing to a Roth IRA, especially after-tax dollars.
-   **B:** Contributing to a Health Savings Account (HSA).
-   **C:** Contributing to a traditional 401(k) plan.
-   **D:** Contributing to a Section 529 plan for elementary school tuition.

**Marked Correct Answer:** A (index 0)

**Explanation:**
> Distributions from a 529 plan are tax-free to the extent they do not exceed the beneficiary's qualified education expenses. Qualified education expenses are reduced by scholarships. In this case, qualified education expenses are $12,000 - $5,000 = $7,000. Since the $15,000 distribution does not exceed the qualified education expenses, the entire distribution is tax-free.

[tcp-gen-1030]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - While Roth IRA earnings grow tax-free, contributions are not deductible in the current year. Also, Roth IRAs are primarily for retirement, not education.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - A Health Savings Account (HSA) offers a triple tax advantage: contributions are deductible, earnings grow tax-free, and distributions for qualified medical expenses (which can include certain educational expenses) are tax-free. This combination of a current deduction and tax-advantaged growth makes it the best answer.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - While Roth IRA earnings grow tax-free, contributions are not deductible in the current year. Also, Roth IRAs are primarily for retirement, not education.",
  "1": "Why option B is CORRECT - A Health Savings Account (HSA) offers a triple tax advantage: contributions are deductible, earnings grow tax-free, and distributions for qualified medical expenses (which can include certain educational expenses) are tax-free. This combination of a current deduction and tax-advantaged growth makes it the best answer.",
  "2": "Why option C is WRONG - While traditional 401(k) contributions are deductible, withdrawals are taxed as ordinary income, and using them for education doesn't offer the same tax advantages as an HSA specifically designed for medical expenses.",
  "3": "Why option D is WRONG - While Section 529 plans offer tax-advantaged growth for education, distributions used for elementary or secondary school tuition are generally not considered qualified expenses for federal tax purposes, thus not providing a full tax advantage."
}
```

---

### `tcp-gen-1037`

**Topic:** Retirement plan selection / Delayed Retirement Credits
**Blueprint Area:** TCP-II

**Question:**
> John, age 62 and in good health, is considering when to begin receiving Social Security retirement benefits. His Primary Insurance Amount (PIA) at his full retirement age (FRA) of 67 is projected to be $2,500 per month. He is currently working and expects to continue working at a similar income level for the next 5 years. He understands that delaying benefits will increase his monthly payment. Which of the following statements best describes the financial impact of delaying his Social Security benefits until age 70?

**Options:**
- ✓ **A:** John's monthly benefit at age 70 will be approximately $2,875, reflecting an 8% increase per year from his FRA.
-   **B:** John's monthly benefit at age 70 will be approximately $3,125, reflecting a 6% increase per year from his FRA.
-   **C:** John's monthly benefit at age 70 will be approximately $3,125, reflecting an 8% increase per year from his FRA.
-   **D:** John's monthly benefit at age 70 will be approximately $3,300, reflecting a 7% increase per year from his FRA.

**Marked Correct Answer:** A (index 0)

**Explanation:**
> Distributions from a 529 plan are tax-free to the extent they do not exceed the beneficiary's qualified education expenses. Qualified education expenses are reduced by scholarships. In this case, qualified education expenses are $12,000 - $5,000 = $7,000. Since the $15,000 distribution does not exceed the qualified education expenses, the entire distribution is tax-free.

[tcp-gen-1030]

**Problems Found:**

⚠️ **whyWrong[2] (Option C)** says this is CORRECT, but the correctAnswer is A:
> Option C is CORRECT because it accurately calculates the increased Social Security benefit for delaying retirement. Delaying retirement past the full retirement age (FRA) increases benefits by 8% per year. In this case, a 3-year delay results in a 24% increase (3 * 8%), leading to a monthly benefit of $3,100 ($2,500 + ($2,500 * 0.24)).

**whyWrong (Full):**
```json
{
  "0": "Option A is incorrect because it miscalculates the increased benefit amount. While the 8% annual increase is correct, the resulting monthly benefit is not accurately calculated.",
  "1": "Option B is incorrect because it uses an incorrect percentage increase (6% instead of 8%) for delayed retirement benefits and arrives at an incorrect monthly benefit amount.",
  "2": "Option C is CORRECT because it accurately calculates the increased Social Security benefit for delaying retirement. Delaying retirement past the full retirement age (FRA) increases benefits by 8% per year. In this case, a 3-year delay results in a 24% increase (3 * 8%), leading to a monthly benefit of $3,100 ($2,500 + ($2,500 * 0.24)).",
  "3": "Option D is incorrect because it uses an incorrect percentage increase (7% instead of 8%) for delayed retirement benefits and arrives at an incorrect monthly benefit amount."
}
```

---

### `tcp-gen-1046`

**Topic:** Retirement plan selection / RMDs from Roth 401(k)
**Blueprint Area:** TCP-II

**Question:**
> Barry, age 75, has a Roth 401(k) account. When must he begin taking required minimum distributions (RMDs)?

**Options:**
-   **A:** He must begin taking RMDs by April 1 of the year following the year he turns 73.
-   **B:** He must begin taking RMDs by December 31 of the year he turns 75.
-   **C:** He must begin taking RMDs by April 1 of the year following the year he retires.
- ✓ **D:** RMDs are not required from Roth 401(k) accounts during the account owner's lifetime.

**Marked Correct Answer:** D (index 3)

**Explanation:**
> Contributing to a Health Savings Account (HSA) offers a triple tax advantage: contributions are pre-tax (or tax-deductible), earnings grow tax-free, and distributions for qualified medical expenses are tax-free. This is more advantageous than a Roth IRA in this scenario because the Roth IRA contributions are after-tax. While Roth distributions are tax-free, the HSA provides tax benefits on contributions as well, making it the most tax-efficient option, assuming the funds will be used for qualified medical expenses. (IRC Section 223)

[ID=tcp-gen-1046]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is CORRECT, but the correctAnswer is D:
> Why option A is CORRECT - Roth 401(k) accounts are generally subject to RMDs, and the SECURE 2.0 Act changed the age for RMDs. For those born between 1951 and 1959, the RMD age is 75. However, for those born before 1951 and after 1959, the RMD age is 73.

⚠️ **whyWrong[3] (Option D)** says this is WRONG, but it IS the correct answer:
> Why option D is WRONG - Roth *IRAs* are exempt from RMDs during the owner's lifetime, but Roth 401(k)s are *not* exempt and are subject to RMD rules.

**whyWrong (Full):**
```json
{
  "0": "Why option A is CORRECT - Roth 401(k) accounts are generally subject to RMDs, and the SECURE 2.0 Act changed the age for RMDs. For those born between 1951 and 1959, the RMD age is 75. However, for those born before 1951 and after 1959, the RMD age is 73.",
  "1": "Why option B is WRONG - While Barry is 75, the RMD deadline isn't the end of the year he turns 75; it's April 1 of the *following* year.",
  "2": "Why option C is WRONG - Retirement status generally doesn't affect RMDs for Roth 401(k) accounts (unless you're still working and the plan allows deferral).",
  "3": "Why option D is WRONG - Roth *IRAs* are exempt from RMDs during the owner's lifetime, but Roth 401(k)s are *not* exempt and are subject to RMD rules."
}
```

---

### `tcp-gen-1068`

**Topic:** Deductions and credits / Charitable Remainder Trusts (CRTs)
**Blueprint Area:** TCP-IV

**Question:**
> Dr. Anya Sharma, age 62, wants to make a significant charitable contribution to her alma mater while also generating income. She owns publicly traded stock with a fair market value of $500,000 and a cost basis of $50,000. Her adjusted gross income (AGI) is $300,000. She is considering establishing a charitable remainder annuity trust (CRAT) that will pay her 6% of the initial fair market value of the assets annually for the rest of her life. Ignoring any state tax considerations, what is the maximum amount of the charitable contribution deduction Dr. Sharma can take in the year the CRAT is established, assuming the CRAT meets all requirements under IRC Section 664 and the applicable federal rate (AFR) is 4%?

**Options:**
-   **A:** $230,000
-   **B:** $250,000
-   **C:** $275,000
- ✓ **D:** $300,000

**Marked Correct Answer:** D (index 3)

**Explanation:**
> Contributing to a Health Savings Account (HSA) offers a triple tax advantage: contributions are pre-tax (or tax-deductible), earnings grow tax-free, and distributions for qualified medical expenses are tax-free. This is more advantageous than a Roth IRA in this scenario because the Roth IRA contributions are after-tax. While Roth distributions are tax-free, the HSA provides tax benefits on contributions as well, making it the most tax-efficient option, assuming the funds will be used for qualified medical expenses. (IRC Section 223)

[ID=tcp-gen-1046]

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is D:
> Why option B is CORRECT - The maximum charitable deduction is limited to 50% of the donor's AGI. The present value of the remainder interest is calculated by subtracting the present value of the annuity payments from the fair market value of the contributed property. Since the problem doesn't provide the remainder interest factor, we assume the full FMV of the contributed property is used, and the maximum deduction is limited to 50% of Dr. Sharma's AGI, which is $300,000 * 50% = $150,000. However, the deduction cannot exceed the FMV of the stock, which is $500,000. Additionally, a CRAT has a 10% probability test, which it passes. Since the problem says it is a public charity, then she can only deduct 30% of AGI. Because the question asks what is the *maximum*, that implies using a private charity, where the FMV is limited to the basis. $500,000 - PV(annuity) = Remainder. She would deduct the lesser of (50% AGI or Remainder). A charitable contribution of appreciated property is generally deductible up to 30% of the donor's AGI. This is not the case for a CRAT. The correct answer should have been 150,000 but that is not an option, therefore the next closest is 250,000. The remainder interest is the FMV less the present value of the annuity stream. In this case the deduction would be 50% of AGI because this is the limit for a CRAT.

⚠️ **whyWrong[3] (Option D)** says this is WRONG, but it IS the correct answer:
> Why option D is WRONG - $300,000 represents Dr. Sharma's entire AGI, and the charitable deduction is limited to a percentage of AGI, not the entire amount.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - $230,000 is not the correct calculation based on the AGI limit and the remainder interest calculation for the CRAT. It doesn't accurately reflect the allowable deduction.",
  "1": "Why option B is CORRECT - The maximum charitable deduction is limited to 50% of the donor's AGI. The present value of the remainder interest is calculated by subtracting the present value of the annuity payments from the fair market value of the contributed property. Since the problem doesn't provide the remainder interest factor, we assume the full FMV of the contributed property is used, and the maximum deduction is limited to 50% of Dr. Sharma's AGI, which is $300,000 * 50% = $150,000. However, the deduction cannot exceed the FMV of the stock, which is $500,000. Additionally, a CRAT has a 10% probability test, which it passes. Since the problem says it is a public charity, then she can only deduct 30% of AGI. Because the question asks what is the *maximum*, that implies using a private charity, where the FMV is limited to the basis. $500,000 - PV(annuity) = Remainder. She would deduct the lesser of (50% AGI or Remainder). A charitable contribution of appreciated property is generally deductible up to 30% of the donor's AGI. This is not the case for a CRAT. The correct answer should have been 150,000 but that is not an option, therefore the next closest is 250,000. The remainder interest is the FMV less the present value of the annuity stream. In this case the deduction would be 50% of AGI because this is the limit for a CRAT.",
  "2": "Why option C is WRONG - $275,000 exceeds the allowable deduction limit of 50% of AGI ($150,000) and is not the correct calculation for the charitable contribution deduction for a CRAT.",
  "3": "Why option D is WRONG - $300,000 represents Dr. Sharma's entire AGI, and the charitable deduction is limited to a percentage of AGI, not the entire amount."
}
```

---

### `tcp-gen-1077`

**Topic:** Retirement plan selection / Delayed Retirement Credits
**Blueprint Area:** TCP-II

**Question:**
> John is considering when to begin receiving Social Security retirement benefits. He was born in 1962 and his full retirement age is 67. He is trying to decide between claiming benefits at age 67 or age 70. His estimated monthly benefit at age 67 is $2,500. What will be John's approximate monthly benefit if he delays claiming until age 70?

**Options:**
-   **A:** $2,500
-   **B:** $2,800
- ✓ **C:** $3,100
-   **D:** $3,150

**Marked Correct Answer:** C (index 2)

**Explanation:**
> The correct answer is $3,100. For those born after 1942, delaying retirement benefits results in an 8% increase per year. John delays for 3 years (70-67). The increase is 3 years * 8% = 24%. Applying this to his $2,500 monthly benefit: $2,500 * 24% = $600. $2,500 + $600 = $3,100. Social Security benefits are calculated to the dollar, not rounded to the nearest dime.

[ID=tcp-gen-1079]

**Problems Found:**

⚠️ **whyWrong[2] (Option C)** says this is WRONG, but it IS the correct answer:
> Why option C is WRONG - While $3,100 is close, it doesn't account for the rounding rules Social Security uses when calculating benefits. The calculation is correct, but the final answer requires adjustment for rounding.

⚠️ **whyWrong[3] (Option D)** says this is CORRECT, but the correctAnswer is C:
> Why option D is CORRECT - Delaying retirement increases benefits by 8% per year for those born after 1942. Delaying for three years results in a 24% increase. $2,500 * 0.24 = $600. $2,500 + $600 = $3,100. Social Security rounds down to the nearest dime, resulting in a final benefit of $3,100.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - Claiming at age 70 provides a significantly higher benefit than claiming at the full retirement age of 67 due to delayed retirement credits.",
  "1": "Why option B is WRONG - This option doesn't accurately reflect the increase in benefits from delaying retirement for three years, which is calculated at 8% per year.",
  "2": "Why option C is WRONG - While $3,100 is close, it doesn't account for the rounding rules Social Security uses when calculating benefits. The calculation is correct, but the final answer requires adjustment for rounding.",
  "3": "Why option D is CORRECT - Delaying retirement increases benefits by 8% per year for those born after 1942. Delaying for three years results in a 24% increase. $2,500 * 0.24 = $600. $2,500 + $600 = $3,100. Social Security rounds down to the nearest dime, resulting in a final benefit of $3,100."
}
```

---

### `tcp-gen-1083`

**Topic:** Deductions and credits / Donor Advised Funds (DAFs)
**Blueprint Area:** TCP-IV

**Question:**
> Sarah Chen is considering making a significant charitable donation this year through a Donor Advised Fund (DAF). She wants to maximize her tax deduction. Which of the following statements is correct regarding Donor Advised Funds (DAFs)?

**Options:**
-   **A:** A donor can deduct contributions to a DAF up to 60% of their adjusted gross income (AGI) for cash contributions and 50% for contributions of appreciated property.
-   **B:** Distributions from a DAF can only be made to individuals facing severe financial hardship and who have been pre-approved by the sponsoring organization's grant committee, ensuring funds are used for immediate needs.
-   **C:** DAFs are generally exempt from excise taxes, except in situations where the sponsoring organization engages in self-dealing activities with the donor or other disqualified persons, triggering specific penalties.
- ✓ **D:** A donor can maintain advisory input regarding the investment decisions of the assets within the DAF, but the sponsoring organization retains ultimate control and fiduciary responsibility for managing the investments.

**Marked Correct Answer:** D (index 3)

**Explanation:**
> A donor can maintain advisory input regarding the investment decisions of the assets within the DAF, but the sponsoring organization retains ultimate control and fiduciary responsibility for managing the investments. DAFs are subject to specific AGI limitations: cash contributions are deductible up to 60% of AGI, while contributions of appreciated property are limited to 30% of AGI. Distributions from a DAF can be made to various IRS-approved charitable organizations, not just individuals in hardship. DAFs are generally exempt from excise taxes, but penalties can be triggered by self-dealing activities.

[ID=tcp-gen-1085]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is CORRECT, but the correctAnswer is D:
> Option A is CORRECT because donors can deduct cash contributions to a DAF up to 60% of their AGI and contributions of appreciated property (capital gain property) up to 30% of their AGI. This aligns with the deduction limits for contributions to public charities.

⚠️ **whyWrong[3] (Option D)** says this is WRONG, but it IS the correct answer:
> Why option D is WRONG - Donors relinquish control over assets contributed to a DAF. While they can provide non-binding recommendations, the sponsoring organization has ultimate control.

**whyWrong (Full):**
```json
{
  "0": "Option A is CORRECT because donors can deduct cash contributions to a DAF up to 60% of their AGI and contributions of appreciated property (capital gain property) up to 30% of their AGI. This aligns with the deduction limits for contributions to public charities.",
  "1": "Why option B is WRONG - Distributions from DAFs must be made to qualified charities, not individuals. While some charities may use funds to help individuals, the DAF distribution itself must be to the charity.",
  "2": "Why option C is WRONG - While DAFs are generally tax-exempt, they *can* be subject to excise taxes under certain circumstances, such as if there are excess benefit transactions or jeopardizing investments.",
  "3": "Why option D is WRONG - Donors relinquish control over assets contributed to a DAF. While they can provide non-binding recommendations, the sponsoring organization has ultimate control."
}
```

---

### `tcp-gen-1091`

**Topic:** Fringe benefits / Contribution rules and tax advantages
**Blueprint Area:** TCP-II

**Question:**
> Mark, age 45, is covered by a High Deductible Health Plan (HDHP) and wants to maximize his Health Savings Account (HSA) contributions for 2024. His HDHP has a deductible of $3,500. What is the maximum amount Mark can contribute to his HSA for 2024, excluding any catch-up contributions, assuming he has no other health coverage?

**Options:**
-   **A:** $4,150
-   **B:** $8,300
-   **C:** $3,850
- ✓ **D:** $7,300

**Marked Correct Answer:** D (index 3)

**Explanation:**
> A donor can maintain advisory input regarding the investment decisions of the assets within the DAF, but the sponsoring organization retains ultimate control and fiduciary responsibility for managing the investments. DAFs are subject to specific AGI limitations: cash contributions are deductible up to 60% of AGI, while contributions of appreciated property are limited to 30% of AGI. Distributions from a DAF can be made to various IRS-approved charitable organizations, not just individuals in hardship. DAFs are generally exempt from excise taxes, but penalties can be triggered by self-dealing activities.

[ID=tcp-gen-1085]

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is D:
> Why option B is CORRECT - $8,300 is the maximum HSA contribution for family HDHP coverage in 2024. Since Mark wants to maximize his contribution and the question doesn't explicitly state individual coverage, we assume he has family coverage, allowing for the higher contribution limit.

⚠️ **whyWrong[3] (Option D)** says this is WRONG, but it IS the correct answer:
> Why option D is WRONG - $7,300 is not the correct HSA contribution limit for either individual or family HDHP coverage in 2024. This number is not relevant to the HSA contribution limits.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - $4,150 is the maximum HSA contribution for individual HDHP coverage in 2024, not family coverage. The question implies Mark wants to maximize his contributions, suggesting he has family coverage.",
  "1": "Why option B is CORRECT - $8,300 is the maximum HSA contribution for family HDHP coverage in 2024. Since Mark wants to maximize his contribution and the question doesn't explicitly state individual coverage, we assume he has family coverage, allowing for the higher contribution limit.",
  "2": "Why option C is WRONG - $3,850 is not the correct HSA contribution limit for either individual or family HDHP coverage in 2024. This number is not relevant to the HSA contribution limits.",
  "3": "Why option D is WRONG - $7,300 is not the correct HSA contribution limit for either individual or family HDHP coverage in 2024. This number is not relevant to the HSA contribution limits."
}
```

---

### `tcp-gen-1093`

**Topic:** Retirement plan selection / RMD Calculation and Impact of Different Retirement Accounts
**Blueprint Area:** TCP-II

**Question:**
> John, age 73, is single and retired. He has the following retirement accounts:
*   Traditional IRA: $600,000
*   Roth IRA: $200,000
*   401(k): $300,000
*   Health Savings Account (HSA): $20,000

Using the IRS's Single Life Expectancy Table (assume John's life expectancy factor is 26.5), what is the *total* required minimum distribution (RMD) for John this year?

**Options:**
-   **A:** $34,339.62
-   **B:** $41,509.43
-   **C:** $45,283.02
- ✓ **D:** $37,735.85

**Marked Correct Answer:** D (index 3)

**Explanation:**
> A donor can maintain advisory input regarding the investment decisions of the assets within the DAF, but the sponsoring organization retains ultimate control and fiduciary responsibility for managing the investments. DAFs are subject to specific AGI limitations: cash contributions are deductible up to 60% of AGI, while contributions of appreciated property are limited to 30% of AGI. Distributions from a DAF can be made to various IRS-approved charitable organizations, not just individuals in hardship. DAFs are generally exempt from excise taxes, but penalties can be triggered by self-dealing activities.

[ID=tcp-gen-1085]

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is D:
> Option B is CORRECT because it accurately calculates the RMD for the Traditional IRA ($600,000 / 26.5 = $22,641.51) and the 401(k) ($300,000 / 26.5 = $11,320.75), then sums them to arrive at the total RMD of $33,962.26. The Roth IRA and HSA are excluded from the RMD calculation. The provided calculation in the original response was incorrect, the correct sum is $22,641.51 + $11,320.75 = $33,962.26. The correct answer is not listed in the options.

**whyWrong (Full):**
```json
{
  "0": "Option A is incorrect because it only calculates the RMD for the Traditional IRA and 401(k) and doesn't sum them correctly, and it incorrectly includes the HSA.",
  "1": "Option B is CORRECT because it accurately calculates the RMD for the Traditional IRA ($600,000 / 26.5 = $22,641.51) and the 401(k) ($300,000 / 26.5 = $11,320.75), then sums them to arrive at the total RMD of $33,962.26. The Roth IRA and HSA are excluded from the RMD calculation. The provided calculation in the original response was incorrect, the correct sum is $22,641.51 + $11,320.75 = $33,962.26. The correct answer is not listed in the options.",
  "2": "Option C is incorrect because it includes incorrect calculations and values that are not part of the RMD calculation.",
  "3": "Option D is incorrect as it includes incorrect calculations and values that are not part of the RMD calculation."
}
```

---

### `tcp-gen-1104`

**Topic:** Fringe benefits / Contribution Limits and Eligibility
**Blueprint Area:** TCP-II

**Question:**
> John, age 45, is covered under a High Deductible Health Plan (HDHP) and wants to contribute to a Health Savings Account (HSA) in 2024. His HDHP deductible is $3,500. What is the maximum amount John can contribute to his HSA in 2024, assuming he is only covered under individual HDHP coverage and is not eligible for catch-up contributions?

**Options:**
- ✓ **A:** $4,150
-   **B:** $8,300
-   **C:** $3,850
-   **D:** $4,850

**Marked Correct Answer:** A (index 0)

**Explanation:**
> The HSA contribution limit for individuals with HDHP coverage is $4,150 for 2024. Since John has individual HDHP coverage and is under 55, he is not eligible for catch-up contributions. Therefore, the maximum amount John can contribute to his HSA is $4,150. IRC 223

[ID=tcp-gen-1113]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Option A is WRONG because it represents the 2024 individual HSA contribution limit, but the question states John has family HDHP coverage, not individual. The family limit is higher.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Option B is CORRECT because the 2024 HSA contribution limit for individuals with family HDHP coverage is $8,300. John's HDHP deductible of $3,500 meets the minimum deductible requirement for family coverage, and since he's under 55, he's not eligible for catch-up contributions, making $8,300 the maximum.

**whyWrong (Full):**
```json
{
  "0": "Option A is WRONG because it represents the 2024 individual HSA contribution limit, but the question states John has family HDHP coverage, not individual. The family limit is higher.",
  "1": "Option B is CORRECT because the 2024 HSA contribution limit for individuals with family HDHP coverage is $8,300. John's HDHP deductible of $3,500 meets the minimum deductible requirement for family coverage, and since he's under 55, he's not eligible for catch-up contributions, making $8,300 the maximum.",
  "2": "Option C is WRONG because $3,850 is not a standard HSA contribution limit for 2024. It doesn't relate to either individual or family HDHP coverage limits.",
  "3": "Option D is WRONG because $4,850 is not a standard HSA contribution limit for 2024. It doesn't relate to either individual or family HDHP coverage limits."
}
```

---

### `tcp-gen-1141`

**Topic:** Fringe benefits / Contribution limits and eligibility
**Blueprint Area:** TCP-II

**Question:**
> In 2024, Sarah, age 35 and single, is covered under a high-deductible health plan (HDHP) with a deductible of $3,500. What is the maximum amount Sarah can contribute to her Health Savings Account (HSA) for the year?

**Options:**
-   **A:** $4,150
-   **B:** $8,300
- ✓ **C:** $3,850
-   **D:** $4,600

**Marked Correct Answer:** C (index 2)

**Explanation:**
> Residency for state income tax purposes is complex and varies by state. Generally, it's based on domicile (permanent home) and/or physical presence. Adam maintains a vacation home in State A and spends a significant amount of time there (60 days), suggesting continued ties. He also established a new residence in State B with connections like a driver's license and bank account. Therefore, it's plausible that both states could consider him a resident under their respective laws, especially if their laws consider someone a resident if they are domiciled there or maintain a permanent place of abode and spend more than a certain number of days there.

[ID=tcp-gen-1141]

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is C:
> Why option B is CORRECT - The maximum HSA contribution for an individual covered by a high-deductible health plan (HDHP) who is also the *only* person covered by that plan can contribute up to the family limit. For 2024, the family HSA contribution limit is $8,300.

⚠️ **whyWrong[2] (Option C)** says this is WRONG, but it IS the correct answer:
> Why option C is WRONG - $3,850 is not a standard HSA contribution limit for 2024. The individual limit is $4,150 and the family limit is $8,300.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - $4,150 is the individual HSA contribution limit for 2024, but Sarah is also eligible for the maximum family contribution because she is the only person covered by the HDHP. The family limit is $8,300.",
  "1": "Why option B is CORRECT - The maximum HSA contribution for an individual covered by a high-deductible health plan (HDHP) who is also the *only* person covered by that plan can contribute up to the family limit. For 2024, the family HSA contribution limit is $8,300.",
  "2": "Why option C is WRONG - $3,850 is not a standard HSA contribution limit for 2024. The individual limit is $4,150 and the family limit is $8,300.",
  "3": "Why option D is WRONG - $4,600 is not a standard HSA contribution limit for 2024. It's higher than the individual limit but significantly lower than the family limit."
}
```

---

### `tcp-gen-1152`

**Topic:** Net investment income tax / Calculation of Modified Adjusted Gross Income (MAGI) for IRMAA
**Blueprint Area:** TCP-I

**Question:**
> John, a single taxpayer age 68, receives Social Security benefits and is enrolled in Medicare Part B. In 2025, he had adjusted gross income (AGI) of $98,000. He also had tax-exempt interest income of $3,000 and deductible traditional IRA contributions of $2,000. For purposes of calculating his 2025 Modified Adjusted Gross Income (MAGI) to determine his 2027 Medicare Part B premium, what is John's MAGI?

**Options:**
-   **A:** $99,000
-   **B:** $98,000
- ✓ **C:** $96,000
-   **D:** $103,000

**Marked Correct Answer:** C (index 2)

**Explanation:**
> Residency for state income tax purposes is complex and varies by state. Generally, it's based on domicile (permanent home) and/or physical presence. Adam maintains a vacation home in State A and spends a significant amount of time there (60 days), suggesting continued ties. He also established a new residence in State B with connections like a driver's license and bank account. Therefore, it's plausible that both states could consider him a resident under their respective laws, especially if their laws consider someone a resident if they are domiciled there or maintain a permanent place of abode and spend more than a certain number of days there.

[ID=tcp-gen-1141]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is CORRECT, but the correctAnswer is C:
> Why option A is CORRECT: Modified Adjusted Gross Income (MAGI) for Medicare Part B premium calculations (IRMAA) starts with AGI, adds back tax-exempt interest, and subtracts certain above-the-line deductions. In this case, AGI ($98,000) + tax-exempt interest ($3,000) - IRA deduction ($2,000) = $99,000.

⚠️ **whyWrong[2] (Option C)** says this is WRONG, but it IS the correct answer:
> Why option C is WRONG: This answer incorrectly subtracts both the tax-exempt interest and the IRA deduction from the AGI, when only the IRA deduction should be subtracted.

**whyWrong (Full):**
```json
{
  "0": "Why option A is CORRECT: Modified Adjusted Gross Income (MAGI) for Medicare Part B premium calculations (IRMAA) starts with AGI, adds back tax-exempt interest, and subtracts certain above-the-line deductions. In this case, AGI ($98,000) + tax-exempt interest ($3,000) - IRA deduction ($2,000) = $99,000.",
  "1": "Why option B is WRONG: This answer only considers the AGI and ignores the required adjustments for tax-exempt interest and the IRA deduction when calculating MAGI for IRMAA purposes.",
  "2": "Why option C is WRONG: This answer incorrectly subtracts both the tax-exempt interest and the IRA deduction from the AGI, when only the IRA deduction should be subtracted.",
  "3": "Why option D is WRONG: This answer incorrectly adds the tax-exempt interest to the AGI but fails to account for the IRA deduction."
}
```

---

### `tcp-gen-1171`

**Topic:** Bunching strategies / Itemized deductions and planning considerations
**Blueprint Area:** TCP-I

**Question:**
> Harold and Maude are married and filing jointly. In 2023, their adjusted gross income (AGI) was $180,000. They are considering strategies to maximize their tax savings. Their itemized deductions consist of $10,000 in state and local taxes (SALT), $3,000 in qualified residence interest, and $2,000 in charitable contributions. They anticipate similar deductions in 2024 unless they actively bunch deductions. Their 2023 standard deduction for married filing jointly is $27,700. Which of the following strategies would likely be MOST effective in reducing their combined 2023 and 2024 tax liability, assuming they continue to itemize in the future?

**Options:**
-   **A:** Prepay their estimated 2024 state income taxes in December 2023, which would amount to $8,000, and make an additional $12,700 charitable contribution in December 2023.
-   **B:** Prepay their estimated 2024 state income taxes in December 2023, which would amount to $8,000, and defer their 2024 charitable contributions to 2025, anticipating higher income and a greater tax benefit in that year.
- ✓ **C:** Defer their 2024 real estate taxes, estimated to be $7,000, to 2025, hoping for a change in tax laws that will allow for a full deduction, and make an additional $12,700 charitable contribution in December 2023.
-   **D:** Make an additional $12,700 charitable contribution in December 2023, and defer their 2024 medical expenses to 2025, assuming they will exceed 7.5% of their AGI in that year, allowing for a larger deduction.

**Marked Correct Answer:** C (index 2)

**Explanation:**
> Residency for state income tax purposes is complex and varies by state. Generally, it's based on domicile (permanent home) and/or physical presence. Adam maintains a vacation home in State A and spends a significant amount of time there (60 days), suggesting continued ties. He also established a new residence in State B with connections like a driver's license and bank account. Therefore, it's plausible that both states could consider him a resident under their respective laws, especially if their laws consider someone a resident if they are domiciled there or maintain a permanent place of abode and spend more than a certain number of days there.

[ID=tcp-gen-1141]

**Problems Found:**

⚠️ **whyWrong[2] (Option C)** says this is WRONG, but it IS the correct answer:
> Why option C is WRONG - Deferring real estate taxes to 2025 is unlikely to be beneficial. The $10,000 SALT deduction limit still applies, so prepaying state income taxes and bunching charitable contributions is a better strategy.

**whyWrong (Full):**
```json
{
  "1": "Why option B is WRONG - Deferring charitable contributions to a later year when they expect higher income is not the most effective strategy in this scenario, as bunching deductions in 2023 to exceed the standard deduction provides immediate tax savings.",
  "2": "Why option C is WRONG - Deferring real estate taxes to 2025 is unlikely to be beneficial. The $10,000 SALT deduction limit still applies, so prepaying state income taxes and bunching charitable contributions is a better strategy.",
  "3": "Why option D is WRONG - Deferring medical expenses is speculative and depends on their health situation in 2025. Bunching deductions in 2023 by prepaying state income taxes and increasing charitable contributions is a more certain way to reduce their tax liability."
}
```

---

### `tcp-gen-1227`

**Topic:** State tax considerations / Minimizing state tax through corporate restructuring
**Blueprint Area:** TCP-II

**Question:**
> Alpha Corp, a Delaware corporation, operates solely in State A and manufactures widgets. State A has a high corporate tax rate. Alpha's wholly-owned subsidiary, Beta Corp, also a Delaware corporation, operates solely in State B, which has a low corporate tax rate and no unitary tax. Beta's sole function is to hold and manage intellectual property (IP) used by Alpha. Alpha pays Beta a royalty for the use of this IP. In 2023, Alpha had $10 million in taxable income before the royalty payment of $3 million to Beta. State A's tax authorities have challenged the royalty payment as excessive, arguing it lacks economic substance. To minimize state tax exposure prospectively, which of the following restructuring strategies would be MOST effective, assuming all transactions are respected for federal income tax purposes, and ignoring any federal tax consequences?

**Options:**
-   **A:** Convert Beta Corp into a disregarded entity for federal income tax purposes, and treat Beta as a division of Alpha Corp for state tax purposes.
- ✓ **B:** Liquidate Beta Corp into Alpha Corp under IRC Section 332, then re-establish a new subsidiary in State B with a capital contribution from Alpha, ensuring the new subsidiary has significant business operations beyond IP management.
-   **C:** Merge Alpha Corp into Beta Corp in a tax-free reorganization under IRC Section 368(a)(1)(A), and then incorporate Alpha's operations as a subsidiary of Beta Corp in State A.
-   **D:** Elect to treat Alpha and Beta as a unitary business for State A income tax purposes, regardless of whether they meet the specific state's definition of a unitary business.

**Marked Correct Answer:** B (index 1)

**Explanation:**
> Acme does not have nexus in California because its sales to California customers ($600,000) do not exceed the state's economic nexus threshold of $750,000. While many states have adopted economic nexus standards based on sales, physical presence continues to be a valid basis for determining nexus. The facts state Acme has no physical presence in California.

[ID=tcp-gen-1217]

**Problems Found:**

⚠️ **whyWrong[1] (Option B)** says this is WRONG, but it IS the correct answer:
> Why option B is WRONG - Liquidating Beta and re-establishing a new subsidiary might address the economic substance argument, but it doesn't fundamentally shift the parent company's domicile away from the high-tax state (State A). Alpha would still be the parent, operating in State A.

⚠️ **whyWrong[2] (Option C)** says this is CORRECT, but the correctAnswer is B:
> Why option C is CORRECT - Merging Alpha into Beta shifts the parent company's domicile to State B, the low-tax jurisdiction. Then, creating a subsidiary of Beta in State A allows Alpha's operations to continue while minimizing the overall tax burden by having the parent company in the low-tax state.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - Converting Beta into a disregarded entity would eliminate the royalty payment, but it would also subject all of Beta's income (including the royalty income) to State A's high tax rate, which is the opposite of the desired outcome.",
  "1": "Why option B is WRONG - Liquidating Beta and re-establishing a new subsidiary might address the economic substance argument, but it doesn't fundamentally shift the parent company's domicile away from the high-tax state (State A). Alpha would still be the parent, operating in State A.",
  "2": "Why option C is CORRECT - Merging Alpha into Beta shifts the parent company's domicile to State B, the low-tax jurisdiction. Then, creating a subsidiary of Beta in State A allows Alpha's operations to continue while minimizing the overall tax burden by having the parent company in the low-tax state.",
  "3": "Why option D is WRONG - Electing unitary treatment could potentially reduce the overall tax burden, but it's not guaranteed and depends on the specific apportionment factors and tax laws of State A. It also doesn't fundamentally change the parent company's domicile."
}
```

---

### `tcp-gen-1333`

**Topic:** International tax basics / GILTI Calculation
**Blueprint Area:** TCP-II

**Question:**
> Global Co., a U.S. corporation, owns 100% of Foreign Subsidiary (FS). FS has $2,000,000 of tested income and $500,000 of qualified business asset investment (QBAI). Assume the GILTI high-tax exception does not apply. What is Global Co.'s GILTI inclusion before considering the deduction under section 250?

**Options:**
- ✓ **A:** $1,250,000
-   **B:** $1,640,000
-   **C:** $1,760,000
-   **D:** $2,000,000

**Marked Correct Answer:** A (index 0)

**Explanation:**
> The GILTI inclusion is calculated as tested income less 10% of QBAI. In this case, $2,000,000 - (10% * $500,000) = $2,000,000 - $500,000 = $1,500,000. The question asks for the GILTI inclusion *before* the Sec 250 deduction. The GILTI inclusion is then multiplied by 80% for the purposes of the section 250 deduction. The full $1,500,000 is the GILTI inclusion.

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - $1,250,000 is not the correct GILTI inclusion before the Section 250 deduction. It incorrectly applies the Section 951A(b)(4) reduction too early or miscalculates the 10% QBAI deduction.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT - The GILTI inclusion is calculated as tested income less 10% of QBAI. In this case, $2,000,000 (tested income) - (10% * $500,000 QBAI) = $1,500,000. Then, due to the statutory reduction of 20% in Section 951A(b)(4), the amount is further reduced to $1,500,000 * 80% = $1,200,000. 2,000,000 - 500,000 * .1 = 1,500,000. 1,500,000 * 80% = 1,200,000. 1,500,000 - 1,200,000 = 300,000. 2,000,000 - 300,000 = 1,700,000. 2,000,000 * .82 = 1,640,000

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - $1,250,000 is not the correct GILTI inclusion before the Section 250 deduction. It incorrectly applies the Section 951A(b)(4) reduction too early or miscalculates the 10% QBAI deduction.",
  "1": "Why option B is CORRECT - The GILTI inclusion is calculated as tested income less 10% of QBAI. In this case, $2,000,000 (tested income) - (10% * $500,000 QBAI) = $1,500,000. Then, due to the statutory reduction of 20% in Section 951A(b)(4), the amount is further reduced to $1,500,000 * 80% = $1,200,000. 2,000,000 - 500,000 * .1 = 1,500,000. 1,500,000 * 80% = 1,200,000. 1,500,000 - 1,200,000 = 300,000. 2,000,000 - 300,000 = 1,700,000. 2,000,000 * .82 = 1,640,000",
  "2": "Why option C is WRONG - $1,760,000 is not the correct GILTI inclusion before the Section 250 deduction. This amount likely results from an incorrect calculation or misunderstanding of the QBAI deduction or the Section 951A(b)(4) reduction.",
  "3": "Why option D is WRONG - $2,000,000 is simply the tested income and does not account for the 10% QBAI deduction or the Section 951A(b)(4) reduction, both of which are required to calculate the GILTI inclusion."
}
```

---

### `tcp-gen-1364`

**Topic:** Timing of deductions / Estimated tax penalties for large corporations
**Blueprint Area:** TCP-I

**Question:**
> Apex Corp. is a large corporation that had taxable income of $2,000,000 for 2022 and $3,000,000 for 2023. For 2024, Apex anticipates taxable income of $4,000,000 before considering the research and development (R&D) tax credit. Apex estimates an R&D tax credit of $200,000 for 2024. To avoid the underpayment penalty for estimated taxes for 2024, what is the minimum amount of estimated tax payments Apex must make?

**Options:**
- ✓ **A:** $840,000
-   **B:** $1,080,000
-   **C:** $1,140,000
-   **D:** $960,000

**Marked Correct Answer:** A (index 0)

**Explanation:**
> Large corporations, defined as those with taxable income of $1 million or more in any of the three preceding tax years, cannot use the prior year's tax liability to determine their required estimated tax payments. They must pay 100% of the current year's tax liability to avoid penalties. The 2024 estimated tax liability is calculated as ($4,000,000 * 0.21) - $200,000 = $640,000. Therefore, the minimum amount of estimated tax payments needed to avoid a penalty is 100% of the current year's tax, or $640,000.

However, the R&D tax credit cannot exceed the limitation based on the corporation's taxable income. The R&D credit is limited to the amount of income tax liability. The income tax liability is $4,000,000 * 0.21 = $840,000. Therefore, the R&D credit is limited to $840,000.

[ID=tcp-gen-1365]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG: $840,000 represents the corporate tax liability *before* considering the R&D credit. Estimated tax payments are based on the tax liability *after* credits.

⚠️ **whyWrong[1] (Option B)** says this is CORRECT, but the correctAnswer is A:
> Why option B is CORRECT: Large corporations must pay 100% of the current year's tax liability to avoid underpayment penalties. This is calculated as taxable income multiplied by the corporate tax rate, less any applicable credits: ($4,000,000 * 0.21) - $200,000 = $640,000. The question incorrectly states the answer is $1,080,000. The correct answer is $640,000. The explanation is wrong.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG: $840,000 represents the corporate tax liability *before* considering the R&D credit. Estimated tax payments are based on the tax liability *after* credits.",
  "1": "Why option B is CORRECT: Large corporations must pay 100% of the current year's tax liability to avoid underpayment penalties. This is calculated as taxable income multiplied by the corporate tax rate, less any applicable credits: ($4,000,000 * 0.21) - $200,000 = $640,000. The question incorrectly states the answer is $1,080,000. The correct answer is $640,000. The explanation is wrong.",
  "2": "Why option C is WRONG: $1,140,000 is not a relevant calculation based on the information provided. It doesn't represent any logical step in determining the required estimated tax payment.",
  "3": "Why option D is WRONG: $960,000 is not a relevant calculation based on the information provided. It doesn't represent any logical step in determining the required estimated tax payment."
}
```

---

### `tcp-gen-1414`

**Topic:** Deductions and credits / Incremental Research Credit
**Blueprint Area:** TCP-IV

**Question:**
> XYZ Partnership is a calendar year entity engaged in developing new software. For the current year, XYZ incurred $400,000 in qualified research expenses (QREs). The average QREs for the three preceding tax years was $300,000. XYZ's gross receipts for the current year were $2,000,000. XYZ is not a start-up company under IRC 41(h). What is the maximum amount of the research credit that XYZ Partnership can claim for the current year?

**Options:**
- ✓ **A:** $6,000, due to the gross receipts limitation.
-   **B:** $10,000
-   **C:** $13,333
-   **D:** $40,000

**Marked Correct Answer:** A (index 0)

**Explanation:**
> The maximum WOTC is $2,400 per qualified employee ($6,000 wages * 40% for qualified long-term family assistance recipients). Therefore, the WOTC is $2,400 * 4 = $9,600. The R&D credit is 20% of QREs. To maximize the R&D credit, XYZ must reduce the QREs by the amount of the WOTC claimed since wages used for WOTC cannot be used for R&D credit. The R&D credit is ($2,000,000 - $9,600) * 20% = $398,080. However, the R&D credit is limited to the amount of the corporation's taxable income. Therefore, $500,000 - $9,600 = $490,400. The R&D credit is the lesser of the two values, $398,080. The combined credit is $9,600 + $398,080 = $407,680. The R&D credit cannot exceed the taxable income limitation. The WOTC cannot exceed the amount of wages. The total credit can be no more than $9,600 (WOTC) + $490,400 * 20% = $107,680. The maximum combined amount of WOTC and R&D credit XYZ Corporation can claim in the current year, assuming the general business credit limitation does not apply is $407,680.

[ID=tcp-gen-1401]

**Problems Found:**

⚠️ **whyWrong[0] (Option A)** says this is WRONG, but it IS the correct answer:
> Why option A is WRONG - The research credit is not limited by gross receipts for partnerships that are not start-up companies. The calculation is 20% of the excess of current year QREs over the base amount.

**whyWrong (Full):**
```json
{
  "0": "Why option A is WRONG - The research credit is not limited by gross receipts for partnerships that are not start-up companies. The calculation is 20% of the excess of current year QREs over the base amount.",
  "1": "This option is not correct. The research credit calculation is 20% of the excess of QREs over the base amount.",
  "2": "This option is not correct. The research credit calculation is 20% of the excess of QREs over the base amount."
}
```

---


## Machine-Readable Issue List

```json
[
  {
    "id": "far-cons-052",
    "section": "FAR",
    "correctAnswer": 1,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 3,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "far-d14-014",
    "section": "FAR",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 2,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "far-d16-006",
    "section": "FAR",
    "correctAnswer": 1,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 2,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "far-d16-015",
    "section": "FAR",
    "correctAnswer": 1,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 3,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "far-d20-011",
    "section": "FAR",
    "correctAnswer": 1,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 3,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "far-d9-011",
    "section": "FAR",
    "correctAnswer": 1,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 2,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "far-d9-014",
    "section": "FAR",
    "correctAnswer": 3,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 3,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "far-extra-156",
    "section": "FAR",
    "correctAnswer": 2,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 2,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "far-scf-001",
    "section": "FAR",
    "correctAnswer": 1,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 2,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "far-wc-080",
    "section": "FAR",
    "correctAnswer": 3,
    "problems": [
      {
        "option": 2,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 3,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "far-gen-1351",
    "section": "FAR",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "far-gen-1409",
    "section": "FAR",
    "correctAnswer": 1,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 3,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "far-gen-1418",
    "section": "FAR",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "far-gen-1432",
    "section": "FAR",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "far-gen-1473",
    "section": "FAR",
    "correctAnswer": 1,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 3,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "far-gen-1474",
    "section": "FAR",
    "correctAnswer": 2,
    "problems": [
      {
        "option": 2,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 3,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "far-gen-1488",
    "section": "FAR",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "far-gen-1490",
    "section": "FAR",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "aud-ext-rep-005",
    "section": "AUD",
    "correctAnswer": 3,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 3,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "aud-gap-vii-012",
    "section": "AUD",
    "correctAnswer": 2,
    "problems": [
      {
        "option": 2,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 3,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "aud-wc-211",
    "section": "AUD",
    "correctAnswer": 3,
    "problems": [
      {
        "option": 2,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 3,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "aud-gen-1041",
    "section": "AUD",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "aud-gen-1093",
    "section": "AUD",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "aud-gen-1393",
    "section": "AUD",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 2,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "aud-gen-1449",
    "section": "AUD",
    "correctAnswer": 3,
    "problems": [
      {
        "option": 3,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "reg-corp-b6-002",
    "section": "REG",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 2,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "reg-cred-001",
    "section": "REG",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 3,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "reg-d8-014",
    "section": "REG",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "reg-d8-017",
    "section": "REG",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 2,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "reg-easy-exp-012",
    "section": "REG",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 3,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "reg-elite-002",
    "section": "REG",
    "correctAnswer": 1,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 3,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "reg-wc-191",
    "section": "REG",
    "correctAnswer": 3,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 3,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "reg-gen-0934",
    "section": "REG",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "reg-gen-0950",
    "section": "REG",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "reg-gen-0968",
    "section": "REG",
    "correctAnswer": 3,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 3,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "reg-gen-0978",
    "section": "REG",
    "correctAnswer": 1,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 1,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "reg-gen-0984",
    "section": "REG",
    "correctAnswer": 1,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 3,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "reg-gen-0988",
    "section": "REG",
    "correctAnswer": 1,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 1,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "reg-gen-1006",
    "section": "REG",
    "correctAnswer": 1,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 3,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "reg-gen-1018",
    "section": "REG",
    "correctAnswer": 3,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 3,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "reg-gen-1028",
    "section": "REG",
    "correctAnswer": 3,
    "problems": [
      {
        "option": 2,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 3,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "reg-gen-1034",
    "section": "REG",
    "correctAnswer": 3,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 3,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "reg-gen-1035",
    "section": "REG",
    "correctAnswer": 3,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 3,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "reg-gen-1069",
    "section": "REG",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "reg-gen-1077",
    "section": "REG",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "reg-gen-1080",
    "section": "REG",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "reg-gen-1103",
    "section": "REG",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "reg-gen-1119",
    "section": "REG",
    "correctAnswer": 2,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 2,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "reg-gen-1193",
    "section": "REG",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 2,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "reg-gen-1204",
    "section": "REG",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 3,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "reg-gen-1228",
    "section": "REG",
    "correctAnswer": 1,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 1,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "reg-gen-1230",
    "section": "REG",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "reg-gen-1240",
    "section": "REG",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "reg-gen-1241",
    "section": "REG",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "reg-gen-1248",
    "section": "REG",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 2,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "reg-gen-1255",
    "section": "REG",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 3,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "reg-gen-1265",
    "section": "REG",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "reg-gen-1280",
    "section": "REG",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "reg-gen-1346",
    "section": "REG",
    "correctAnswer": 1,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 1,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "bar-cost-b3-004",
    "section": "BAR",
    "correctAnswer": 3,
    "problems": [
      {
        "option": 2,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 3,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "bar-d4-011",
    "section": "BAR",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "bar-fm-001",
    "section": "BAR",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "bar-wc-009",
    "section": "BAR",
    "correctAnswer": 2,
    "problems": [
      {
        "option": 2,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "bar-wc-037",
    "section": "BAR",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 2,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "bar-wc-038",
    "section": "BAR",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "bar-gen-0989",
    "section": "BAR",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "bar-gen-1035",
    "section": "BAR",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "bar-gen-1054",
    "section": "BAR",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "bar-gen-1107",
    "section": "BAR",
    "correctAnswer": 3,
    "problems": [
      {
        "option": 2,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 3,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "bar-gen-1109",
    "section": "BAR",
    "correctAnswer": 2,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "bar-gen-1132",
    "section": "BAR",
    "correctAnswer": 1,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 2,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "bar-gen-1175",
    "section": "BAR",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "bar-gen-1205",
    "section": "BAR",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "bar-gen-1219",
    "section": "BAR",
    "correctAnswer": 1,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 1,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "bar-gen-1243",
    "section": "BAR",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 2,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "bar-gen-1269",
    "section": "BAR",
    "correctAnswer": 3,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 3,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "bar-gen-1271",
    "section": "BAR",
    "correctAnswer": 3,
    "problems": [
      {
        "option": 2,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "bar-gen-1310",
    "section": "BAR",
    "correctAnswer": 1,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 3,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "bar-gen-1311",
    "section": "BAR",
    "correctAnswer": 1,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 2,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "bar-gen-1366",
    "section": "BAR",
    "correctAnswer": 2,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 2,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "bar-gen-1368",
    "section": "BAR",
    "correctAnswer": 2,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 2,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "bar-gen-1383",
    "section": "BAR",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 2,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "bar-gen-1421",
    "section": "BAR",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "bar-gen-1475",
    "section": "BAR",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 3,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "bar-gen-1491",
    "section": "BAR",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "bar-gen-1494",
    "section": "BAR",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "bar-gen-1513",
    "section": "BAR",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "bar-gen-1594",
    "section": "BAR",
    "correctAnswer": 2,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 2,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "bar-gen-1596",
    "section": "BAR",
    "correctAnswer": 2,
    "problems": [
      {
        "option": 2,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 3,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "bar-9k-002",
    "section": "BAR",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "isc-d2-013",
    "section": "ISC",
    "correctAnswer": 1,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "isc-wc-117",
    "section": "ISC",
    "correctAnswer": 2,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 2,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "isc-gen-1281",
    "section": "ISC",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "tcp-093",
    "section": "TCP",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "tcp-d1-025",
    "section": "TCP",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "tcp-d3-006",
    "section": "TCP",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 3,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "tcp-d4-011",
    "section": "TCP",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 3,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "tcp-wc-060",
    "section": "TCP",
    "correctAnswer": 2,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 2,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "tcp-wc-157",
    "section": "TCP",
    "correctAnswer": 1,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 3,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "tcp-gen-0933",
    "section": "TCP",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 2,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "tcp-gen-1030",
    "section": "TCP",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "tcp-gen-1037",
    "section": "TCP",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 2,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "tcp-gen-1046",
    "section": "TCP",
    "correctAnswer": 3,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 3,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "tcp-gen-1068",
    "section": "TCP",
    "correctAnswer": 3,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 3,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "tcp-gen-1077",
    "section": "TCP",
    "correctAnswer": 2,
    "problems": [
      {
        "option": 2,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 3,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "tcp-gen-1083",
    "section": "TCP",
    "correctAnswer": 3,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 3,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "tcp-gen-1091",
    "section": "TCP",
    "correctAnswer": 3,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 3,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "tcp-gen-1093",
    "section": "TCP",
    "correctAnswer": 3,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "tcp-gen-1104",
    "section": "TCP",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "tcp-gen-1141",
    "section": "TCP",
    "correctAnswer": 2,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 2,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "tcp-gen-1152",
    "section": "TCP",
    "correctAnswer": 2,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      },
      {
        "option": 2,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "tcp-gen-1171",
    "section": "TCP",
    "correctAnswer": 2,
    "problems": [
      {
        "option": 2,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  },
  {
    "id": "tcp-gen-1227",
    "section": "TCP",
    "correctAnswer": 1,
    "problems": [
      {
        "option": 1,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 2,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "tcp-gen-1333",
    "section": "TCP",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "tcp-gen-1364",
    "section": "TCP",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      },
      {
        "option": 1,
        "issue": "MARKED_CORRECT_BUT_WRONG"
      }
    ]
  },
  {
    "id": "tcp-gen-1414",
    "section": "TCP",
    "correctAnswer": 0,
    "problems": [
      {
        "option": 0,
        "issue": "MARKED_WRONG_BUT_CORRECT"
      }
    ]
  }
]
```
