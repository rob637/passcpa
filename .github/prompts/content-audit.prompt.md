---
description: "Audit content quality, question accuracy, or blueprint coverage for an exam"
agent: "agent"
---
# Content Audit

Audit the specified exam's content for quality and completeness:

## Checks
1. **Question counts**: Compare actual vs contentRegistry counts
2. **Required fields**: Every question has id, courseId, section, blueprintArea, topic, difficulty, options, correctAnswer, explanation
3. **ID format**: All lowercase, section-prefixed
4. **Blueprint coverage**: All blueprint areas have questions
5. **Difficulty distribution**: Reasonable spread across easy/medium/hard
6. **Duplicate detection**: No duplicate IDs or near-duplicate question text
7. **Answer accuracy**: Spot-check that correctAnswer index matches the right option

## Output
- Summary table of findings
- List of specific issues with file locations
- Recommended fixes prioritized by severity
