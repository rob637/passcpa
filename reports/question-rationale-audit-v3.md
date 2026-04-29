# Question rationale audit — high-confidence (v3)

Generated: 2026-04-29T11:18:20.641Z

Filters applied to remove false positives:
- Strips "Why option X is CORRECT/WRONG -" meta prefix before classification
- Skips checks when meta-prefix label is consistent with the answer key
- Skips correct-option-marked-incorrect for NOT/EXCEPT-style questions
- Adds guards for "while X is correct", "Option X is WRONG because [Y is] correct"
- Tightened self-contradictory to require explicit admissions ("originally marked correct", "options are incorrect", "closest answer is", etc.)

## Findings by type

- self-contradictory-rationale-text: **18**
- option-letter-prefix-mismatch: **64**
- correct-option-marked-incorrect: **152**
- wrong-option-marked-correct: **26**

Distinct question IDs flagged: **124**

## Files by impact
| File | Questions flagged | Total findings |
|---|---:|---:|
| content/cpa/reg/questions.json | 31 | 34 |
| functions/content-cpa/reg/questions.json | 31 | 34 |
| content/cpa/bar/questions.json | 25 | 25 |
| functions/content-cpa/bar/questions.json | 25 | 25 |
| content/cpa/far/questions.json | 18 | 23 |
| functions/content-cpa/far/questions.json | 18 | 23 |
| content/cpa/tcp/questions.json | 19 | 20 |
| functions/content-cpa/tcp/questions.json | 19 | 20 |
| content/cpa/isc/questions.json | 16 | 16 |
| functions/content-cpa/isc/questions.json | 16 | 16 |
| content/cpa/aud/questions.json | 7 | 7 |
| functions/content-cpa/aud/questions.json | 7 | 7 |
| content/cfp/CFP-TAX/questions.json | 3 | 3 |
| content/ea/see1/questions.json | 2 | 2 |
| content/cfp/CFP-EST/questions.json | 1 | 1 |
| content/cfp/CFP-GEN/questions.json | 1 | 1 |
| content/ea/see2/questions.json | 1 | 1 |

Per-finding detail in `reports/question-rationale-audit-v3.csv`.

NOTE: Still a heuristic. Review each before editing.