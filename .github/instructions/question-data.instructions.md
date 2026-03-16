---
description: "Use when creating or modifying question data files, lesson data, flashcards, or any exam content."
applyTo: "src/data/**"
---
# Question & Content Data Standards

## Question IDs
- Pattern: `{section}-{batch-or-descriptor}-{number}` all lowercase
- Examples: `far-001`, `see1-batch5-015`, `cisa1-093`
- Never uppercase IDs

## Required Fields (Every Question)
```typescript
{
  id: string,            // lowercase, section-prefixed
  courseId: CourseId,     // 'cpa' | 'ea' | 'cma' | 'cia' | 'cisa' | 'cfp'
  section: string,       // Uppercase: 'FAR', 'SEE1', 'CISA1'
  blueprintArea: string, // Area code: 'FAR-I', 'SEE1-A'
  topic: string,
  difficulty: 'easy' | 'medium' | 'hard',
  skillLevel: string,    // Bloom's: 'Remembering' | 'Application' | 'Analysis'
  question: string,
  options: string[],     // 4 options (A-D)
  correctAnswer: number, // 0-indexed
  explanation: string,
}
```

## File Naming
- `{section}-questions-batch{n}.ts`
- Export: `{SECTION}_QUESTIONS_BATCH{N}` (uppercase)
- One section per file — never mix sections

## CourseId Values
`'cpa' | 'cma' | 'ea' | 'cia' | 'cfp' | 'cisa'`

## Retired Content
- BEC section retired December 2023 — never reference it
