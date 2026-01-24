# CPA Exam Question Schema - 2026 AICPA Blueprint Alignment

This document describes the question schema used in the CPA Review application,
updated to align with the **2026 AICPA CPA Exam Blueprints**.

## Schema Overview

Each MCQ question follows this structure:

```javascript
{
  // Unique identifier
  id: 'reg-eth-001',
  
  // CPA Section: AUD, FAR, REG, BAR, ISC, TCP
  section: 'REG',
  
  // ==========================================
  // 2026 AICPA Blueprint Tagging (NEW - Required)
  // ==========================================
  blueprintArea: 'REG-I',        // Area code (e.g., REG-I through REG-IV)
  blueprintGroup: 'REG-I-A',     // Group code within the area
  blueprintTopic: 'REG-I-A-1',   // Specific topic code
  
  // ==========================================
  // Legacy Topic Fields (Backward Compatible)
  // ==========================================
  topicId: 'reg-ethics',
  topic: 'Ethics and Professional Responsibility',
  subtopic: 'Circular 230',
  
  // ==========================================
  // Question Attributes
  // ==========================================
  difficulty: 'medium',          // easy, medium, hard
  skillLevel: 'Application',     // Bloom's Taxonomy level
  
  // ==========================================
  // Question Content
  // ==========================================
  question: 'Question text...',
  options: ['A', 'B', 'C', 'D'],
  correctAnswer: 1,              // 0-indexed
  explanation: 'Detailed explanation...',
  reference: 'IRC §6694(a)',     // Authoritative reference
  
  // ==========================================
  // Optional Metadata
  // ==========================================
  hr1: false,                    // true if affected by H.R. 1 (July 2026)
  effectiveDate: null,           // If law has specific effective date
  tags: [],                      // Additional categorization
}
```

## Blueprint Codes

### AUD - Auditing and Attestation (15-25%, 25-35%, 30-40%, 15-25%)

| Area | Name | Weight |
|------|------|--------|
| AUD-I | Ethics, Professional Responsibilities, and General Principles | 15-25% |
| AUD-II | Assessing Risk and Developing a Planned Response | 25-35% |
| AUD-III | Performing Further Procedures and Obtaining Evidence | 30-40% |
| AUD-IV | Forming Conclusions and Reporting | 15-25% |

### FAR - Financial Accounting and Reporting (5-15%, 30-40%, 25-35%, 10-20%, 5-15%)

| Area | Name | Weight |
|------|------|--------|
| FAR-I | Conceptual Framework and Standard Setting | 5-15% |
| FAR-II | Financial Statement Accounts | 30-40% |
| FAR-III | Transactions | 25-35% |
| FAR-IV | State and Local Government | 10-20% |
| FAR-V | Not-for-Profit Entities | 5-15% |

### REG - Taxation and Regulation (10-20%, 10-20%, 22-32%, 23-33%)

| Area | Name | Weight |
|------|------|--------|
| REG-I | Ethics, Professional Responsibilities, and Federal Tax Procedures | 10-20% |
| REG-II | Business Law | 10-20% |
| REG-III | Federal Taxation of Individuals | 22-32% |
| REG-IV | Federal Taxation of Entities | 23-33% |

### BAR - Business Analysis and Reporting (15-25%, 25-35%, 20-30%, 15-25%)

| Area | Name | Weight |
|------|------|--------|
| BAR-I | Business Combinations and Consolidations | 15-25% |
| BAR-II | Technical Accounting | 25-35% |
| BAR-III | State and Local Government | 20-30% |
| BAR-IV | Financial Statement Analysis and Planning | 15-25% |

### ISC - Information Systems and Controls (30-40%, 25-35%, 25-35%)

| Area | Name | Weight |
|------|------|--------|
| ISC-I | Information Systems and Data Management | 30-40% |
| ISC-II | Security, Confidentiality, and Privacy | 25-35% |
| ISC-III | SOC Engagements | 25-35% |

### TCP - Tax Compliance and Planning (20-30%, 30-40%, 15-25%, 10-20%)

| Area | Name | Weight |
|------|------|--------|
| TCP-I | Individual Tax Planning | 20-30% |
| TCP-II | Entity Tax Planning | 30-40% |
| TCP-III | Property Transactions | 15-25% |
| TCP-IV | Gift and Estate Tax | 10-20% |

## Skill Levels (Bloom's Taxonomy)

Questions should be tagged with the cognitive skill level being tested:

| Level | Description | Question Types |
|-------|-------------|----------------|
| Remembering | Recall facts, terms, definitions | "What is...", "Which of the following..." |
| Understanding | Explain concepts, interpret meaning | "Explain why...", "What does X mean..." |
| Application | Apply rules to new situations | "Calculate...", "How would you apply..." |
| Analysis | Break down information, identify patterns | "Why did...", "What caused..." |
| Evaluation | Make judgments, justify decisions | "Which is best...", "Evaluate..." |

## H.R. 1 "One Big Beautiful Bill" Act Questions

Questions related to the H.R. 1 tax provisions (effective July 1, 2026) should include:

```javascript
{
  // ... standard fields
  hr1: true,
  effectiveDate: '2025-01-01',  // Tax year effective date
  blueprintTopic: 'REG-III-A-3', // H.R.1: Tip income exclusion
}
```

### Key H.R. 1 Topics

| Topic ID | Description |
|----------|-------------|
| REG-III-A-3 | Tip income exclusion |
| REG-III-B-4 | Updated SALT deduction limits |
| REG-III-D-4 | Enhanced child tax credit |
| TCP-I-A-3 | New income exclusions |
| TCP-I-B-3 | Updated deduction limits |

## Importing Blueprint Helpers

Use the helper functions from examConfig to work with Blueprint data:

```javascript
import {
  getAllTopicsForSection,
  getTopicById,
  isHR1Topic,
  getProgressByArea,
  EXAM_BLUEPRINTS,
} from '../../config/examConfig';

// Get all topics for a section
const regTopics = getAllTopicsForSection('REG');

// Check if question topic is affected by H.R. 1
const affectedByHR1 = isHR1Topic(question.blueprintTopic);

// Get user progress by Blueprint area
const areaProgress = getProgressByArea(userProgress, 'REG');
```

## Migration Guide

To migrate existing questions to the new Blueprint schema:

1. **Map `topicId` to `blueprintTopic`**: Use the EXAM_BLUEPRINTS structure to find the matching topic ID
2. **Derive `blueprintArea` and `blueprintGroup`**: Parse from the topic ID (e.g., 'REG-I-A-1' → Area: 'REG-I', Group: 'REG-I-A')
3. **Add `skillLevel`**: Analyze the question type and assign appropriate Bloom's level
4. **Tag H.R. 1 questions**: Mark questions affected by the new tax legislation

### Example Migration

**Before:**
```javascript
{
  topicId: 'reg-ethics',
  topic: 'Ethics',
  subtopic: 'Circular 230',
}
```

**After:**
```javascript
{
  blueprintArea: 'REG-I',
  blueprintGroup: 'REG-I-A',
  blueprintTopic: 'REG-I-A-1',
  topicId: 'reg-ethics',           // Keep for backward compatibility
  topic: 'Ethics',
  subtopic: 'Circular 230',
  skillLevel: 'Application',
}
```

## Validation

Questions are validated against the Blueprint structure at build time. Invalid topic codes will generate warnings.

The `questionService.js` supports filtering by Blueprint area and topic for targeted practice.
