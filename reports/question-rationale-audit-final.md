# Question rationale audit — high-confidence (final)

Generated: 2026-04-29T11:20:06.641Z

## Summary

- option-letter-prefix-mismatch: **64**
- correct-option-marked-incorrect: **152**
- self-contradictory-rationale-text: **12**
- wrong-option-marked-correct: **24**

Distinct question IDs flagged: **115**

## Files by impact
| File | Questions flagged | Findings |
|---|---:|---:|
| content/cpa/reg/questions.json | 31 | 34 |
| functions/content-cpa/reg/questions.json | 31 | 34 |
| content/cpa/bar/questions.json | 25 | 25 |
| functions/content-cpa/bar/questions.json | 25 | 25 |
| content/cpa/far/questions.json | 18 | 24 |
| functions/content-cpa/far/questions.json | 18 | 24 |
| content/cpa/tcp/questions.json | 18 | 19 |
| functions/content-cpa/tcp/questions.json | 18 | 19 |
| content/cpa/isc/questions.json | 16 | 16 |
| functions/content-cpa/isc/questions.json | 16 | 16 |
| content/cpa/aud/questions.json | 7 | 7 |
| functions/content-cpa/aud/questions.json | 7 | 7 |

## Methodology
Conservative classifier with these false-positive guards:
- Strips `Why option X is CORRECT/WRONG -` meta-prefix; skips checks if meta label matches reality
- Skips `correct-option-marked-incorrect` for NOT/EXCEPT-style questions
- Ignores `wrong-option-marked-correct` if rationale starts with `Option X is WRONG`
- Ignores phrases like "would be correct only if", "partially correct", "correct in magnitude", "Correct calculation, incorrect location"
- `self-contradictory-rationale-text` requires explicit admission ("originally marked correct", "closest answer is", "options are incorrect", "after correcting the original explanation", "not the best answer")

Per-finding detail in `reports/question-rationale-audit-final.csv`.

NOTE: Each entry should still receive human review before edits — some false positives may remain.