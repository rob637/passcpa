# Content Quality Guidelines: Preventing AI Artifacts

This document provides guidelines for preventing AI "thinking out loud" artifacts from appearing in exam content.

## What Are AI Artifacts?

AI artifacts are phrases that appear when AI models work through problems in their responses but forget to clean up their reasoning process. These include:

### Red Flag Phrases to NEVER Include:

| Category | Examples |
|----------|----------|
| **Self-correction** | "Wait...", "Hmm...", "Actually...", "Let me reconsider..." |
| **Verification** | "Let me recalculate...", "Let me verify...", "Let me re-read..." |
| **Uncertainty** | "That doesn't seem right...", "This contradicts...", "That's not matching..." |
| **Thinking process** | "I think...", "I would...", "Here's my analysis..." |
| **Mid-stream changes** | "But actually:", "No, wait...", "On second thought..." |

## Prevention Strategies

### 1. Content Review Checklist

Before committing any new content, run these checks:

```bash
# Search for common AI artifacts
grep -rn "let me recalculate\|let me reconsider\|let me verify\|let me re-read" src/data/
grep -rn "Wait.*\.\.\.\|Hmm.*\.\.\.\|Actually,\|But actually" src/data/
grep -rn "that's not right\|doesn't seem right\|this contradicts\|not matching" src/data/
```

### 2. Automated Pre-Commit Hook

Add to `.husky/pre-commit`:

```bash
#!/bin/sh
# Check for AI artifacts in content files
ARTIFACTS=$(grep -rn "Let me recalculate\|Wait—\|Hmm,\|Actually, let me" src/data/ || true)
if [ -n "$ARTIFACTS" ]; then
    echo "❌ AI artifacts detected in content files:"
    echo "$ARTIFACTS"
    echo ""
    echo "Please clean up these phrases before committing."
    exit 1
fi
```

### 3. ESLint Custom Rule (Optional)

Create `eslint-rules/no-ai-artifacts.js` to flag these patterns in explanation strings.

### 4. Content Generation Prompts

When using AI to generate content, include these instructions:

```
IMPORTANT: Provide ONLY the final, polished explanation. Do NOT include:
- Self-corrections ("Wait, let me recalculate...")
- Uncertainty markers ("Hmm...", "Actually...")  
- Working/draft calculations that get revised
- Any text that shows the reasoning process being revised

Present the calculation steps cleanly from start to finish.
```

### 5. Review Process

All generated content should go through:

1. **Automated scan** for red flag phrases
2. **Human review** of explanations for clarity and professionalism  
3. **Accuracy check** to ensure the final answer matches the explanation

## Clean Explanation Examples

### ❌ BAD (Contains AI Artifacts):
```
NIIT = 3.8% on lesser of NII or excess MAGI. 
Wait - let me recalculate...
$30,000 × 0.038 = $1,140.
Hmm, but the answer says $1,900. Let me re-read...
Actually, if we use excess MAGI instead...
```

### ✅ GOOD (Clean):
```
NIIT = 3.8% on the lesser of (a) NII ($30,000) or (b) MAGI 
over threshold ($250,000 - $200,000 = $50,000). 

Using the lesser amount: $30,000 × 3.8% = $1,140.

Note: Using excess MAGI would incorrectly give $1,900.
```

## Common Patterns to Fix

| Before | After |
|--------|-------|
| "Wait—this contradicts my initial analysis. Let me reconsider." | (Simply delete and present correct analysis) |
| "$120K... Actually reviewing: if..." | "Step 1: Convert... Step 2: Compare..." |
| "Hmm, that's not matching. Let me recalculate:" | (Delete and show correct calculation only) |
| "But actually:" | "Key insight:" or (delete transitional phrase) |

## Regex Patterns for Scanning

Use these patterns to find artifacts:

```regex
# Self-correction patterns
Wait[—\-\s].*let me
Hmm[,.].*let me
Actually,?\s*(let me|I|the)
Let me (recalculate|reconsider|verify|re-read|check)

# Uncertainty patterns  
that's not (right|matching|correct)
doesn't seem right
this contradicts
seems wrong
seems too (high|low)

# Draft process patterns
But actually:?
On second thought
I think this
```

## Integration with CI/CD

Add this step to your CI pipeline:

```yaml
content-quality:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Check for AI artifacts
      run: |
        FOUND=$(grep -rniE "let me recalculate|wait.*let me|hmm.*let me" src/data/ || true)
        if [ -n "$FOUND" ]; then
          echo "::error::AI artifacts found in content files"
          echo "$FOUND"
          exit 1
        fi
```

## Summary

1. **Never commit** content with "Wait", "Hmm", "Let me reconsider/recalculate"
2. **Use automated scanning** before every commit
3. **Review all AI-generated content** manually
4. **Present calculations cleanly** from start to finish
5. **Delete working notes** - show only final explanations

---

*Last updated: February 2026*
*Issues fixed in this cleanup: 23 across 13 files*
