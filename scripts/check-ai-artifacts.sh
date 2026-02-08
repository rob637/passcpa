#!/bin/bash
# Pre-commit hook to detect AI thinking artifacts in content files
# Install: cp scripts/check-ai-artifacts.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# AI artifact patterns to detect
PATTERNS=(
    "Wait[,—].*recalculate"
    "Wait[,—].*reconsider"
    "let me reconsider"
    "let me recalculate"
    "let me verify"
    "Hmm[,.]"
    "Actually[,.].*let me"
    "that doesn't seem right"
    "This contradicts"
    "not matching"
    "that's not right"
    "Here's my analysis"
    "I think.*should be"
    "But actually:"
)

# Build combined regex pattern
COMBINED_PATTERN=$(IFS='|'; echo "${PATTERNS[*]}")

# Get staged TypeScript files in content directories
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '^src/(data|courses)/.*\.ts$' || true)

if [ -z "$STAGED_FILES" ]; then
    exit 0
fi

FOUND_ISSUES=0

for file in $STAGED_FILES; do
    # Check staged content only
    MATCHES=$(git show ":$file" 2>/dev/null | grep -nE "$COMBINED_PATTERN" || true)
    
    if [ -n "$MATCHES" ]; then
        if [ $FOUND_ISSUES -eq 0 ]; then
            echo -e "${RED}ERROR: AI thinking artifacts detected in staged files:${NC}"
            echo ""
        fi
        echo -e "${RED}$file:${NC}"
        echo "$MATCHES" | while read -r line; do
            echo "  $line"
        done
        echo ""
        FOUND_ISSUES=1
    fi
done

if [ $FOUND_ISSUES -eq 1 ]; then
    echo -e "${RED}Please remove AI artifacts before committing.${NC}"
    echo "Common patterns to fix:"
    echo "  - 'Wait, let me recalculate...' → Remove and provide clean explanation"
    echo "  - 'Hmm...' → Remove thinking words"
    echo "  - 'Actually, let me reconsider' → Write final correct answer directly"
    echo ""
    echo "See docs/CONTENT_QUALITY_GUIDELINES.md for full details."
    exit 1
fi

echo -e "${GREEN}✓ No AI artifacts detected${NC}"
exit 0
