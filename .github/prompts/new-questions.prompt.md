---
description: "Add a new batch of questions for any exam section with proper IDs, types, and validation"
agent: "agent"
---
# New Question Batch

Add a new batch of questions for the specified exam section.

## Requirements
1. Follow the ID pattern: `{section}-{descriptor}-{number}` (lowercase)
2. Include ALL required fields from the Question type
3. Export as `{SECTION}_QUESTIONS_BATCH{N}` (uppercase)
4. Register the new batch in the section's question index file
5. Run `npm run build` to validate TypeScript
6. Run `node scripts/validate-questions.cjs` if available

## Quality Checks
- 4 options per question, only one correct
- Explanations must explain WHY the answer is correct and why others are wrong
- Difficulty distribution: ~30% easy, 50% medium, 20% hard
- Blueprint area must match the section's actual blueprint
- No duplicate question IDs
