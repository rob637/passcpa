#!/bin/bash
#
# Generate questions to reach 9,000 total (1,500 per section)
# This is the "Premium" tier - matching UWorld quality standards
#
# Run: ./scripts/generate-to-9000.sh
#

set -e
cd "$(dirname "$0")/.."

echo "═══════════════════════════════════════════════════════════════════"
echo "    VoraPrep 9,000 Question Generation (1,500/section target)"
echo "═══════════════════════════════════════════════════════════════════"
echo ""

# Check API key
if [ -z "$GEMINI_API_KEY" ]; then
    if [ -f .env ]; then
        export GEMINI_API_KEY=$(grep VITE_GEMINI_API_KEY .env | cut -d"=" -f2 | tr -d '"' | tr -d "'")
    fi
fi

if [ -z "$GEMINI_API_KEY" ]; then
    echo "❌ Error: GEMINI_API_KEY not set"
    echo "   Run: export GEMINI_API_KEY=your-key"
    exit 1
fi

echo "✓ API key loaded"
echo ""

# Current counts and gaps (based on 1,500 target)
# FAR: 1449 → need 51 total
# AUD: 1166 → need 334 total 
# REG: 1039 → need 461 total
# BAR: 1042 → need 458 total
# ISC: 1011 → need 489 total
# TCP: 980 → need 520 total
# TOTAL: 2,313 new questions

TOTAL_TO_GENERATE=0

# ═══════════════════════════════════════════════════════════════════
# FAR: 51 questions needed
# ═══════════════════════════════════════════════════════════════════
echo "═══ FAR (need 51) ═══"

echo "  [1/6] FAR-II: Generating 30 questions..."
node scripts/qbank-generate.cjs FAR-II --count=30 && TOTAL_TO_GENERATE=$((TOTAL_TO_GENERATE + 30))

echo "  [2/6] FAR-IV: Generating 15 questions..."
node scripts/qbank-generate.cjs FAR-IV --count=15 && TOTAL_TO_GENERATE=$((TOTAL_TO_GENERATE + 15))

echo "  [3/6] FAR-III: Generating 6 questions..."
node scripts/qbank-generate.cjs FAR-III --count=6 && TOTAL_TO_GENERATE=$((TOTAL_TO_GENERATE + 6))

echo "✓ FAR complete (51 added)"
echo ""

# ═══════════════════════════════════════════════════════════════════
# AUD: 334 questions needed
# ═══════════════════════════════════════════════════════════════════
echo "═══ AUD (need 334) ═══"

echo "  [1/4] AUD-III: Generating 190 questions (CRITICAL - underweight)..."
node scripts/qbank-generate.cjs AUD-III --count=190 && TOTAL_TO_GENERATE=$((TOTAL_TO_GENERATE + 190))

echo "  [2/4] AUD-II: Generating 100 questions..."
node scripts/qbank-generate.cjs AUD-II --count=100 && TOTAL_TO_GENERATE=$((TOTAL_TO_GENERATE + 100))

echo "  [3/4] AUD-I: Generating 44 questions..."
node scripts/qbank-generate.cjs AUD-I --count=44 && TOTAL_TO_GENERATE=$((TOTAL_TO_GENERATE + 44))

echo "✓ AUD complete (334 added)"
echo ""

# ═══════════════════════════════════════════════════════════════════
# REG: 461 questions needed
# ═══════════════════════════════════════════════════════════════════
echo "═══ REG (need 461) ═══"

echo "  [1/4] REG-IV: Generating 160 questions (Federal Tax of Entities)..."
node scripts/qbank-generate.cjs REG-IV --count=160 && TOTAL_TO_GENERATE=$((TOTAL_TO_GENERATE + 160))

echo "  [2/4] REG-V: Generating 103 questions (Property Transactions)..."
node scripts/qbank-generate.cjs REG-V --count=103 && TOTAL_TO_GENERATE=$((TOTAL_TO_GENERATE + 103))

echo "  [3/4] REG-III: Generating 100 questions (Individual Tax)..."
node scripts/qbank-generate.cjs REG-III --count=100 && TOTAL_TO_GENERATE=$((TOTAL_TO_GENERATE + 100))

echo "  [4/4] REG-II: Generating 98 questions (Business Law)..."
node scripts/qbank-generate.cjs REG-II --count=98 && TOTAL_TO_GENERATE=$((TOTAL_TO_GENERATE + 98))

echo "✓ REG complete (461 added)"
echo ""

# ═══════════════════════════════════════════════════════════════════
# BAR: 458 questions needed (critically underweight)
# ═══════════════════════════════════════════════════════════════════
echo "═══ BAR (need 458) ═══"

echo "  [1/2] BAR-I: Generating 254 questions (Business Analysis - CRITICAL)..."
node scripts/qbank-generate.cjs BAR-I --count=254 && TOTAL_TO_GENERATE=$((TOTAL_TO_GENERATE + 254))

echo "  [2/2] BAR-II: Generating 204 questions (Technical Accounting - CRITICAL)..."
node scripts/qbank-generate.cjs BAR-II --count=204 && TOTAL_TO_GENERATE=$((TOTAL_TO_GENERATE + 204))

echo "✓ BAR complete (458 added)"
echo ""

# ═══════════════════════════════════════════════════════════════════
# ISC: 489 questions needed (critically underweight)
# ═══════════════════════════════════════════════════════════════════
echo "═══ ISC (need 489) ═══"

echo "  [1/2] ISC-I: Generating 250 questions (Information Systems - CRITICAL)..."
node scripts/qbank-generate.cjs ISC-I --count=250 && TOTAL_TO_GENERATE=$((TOTAL_TO_GENERATE + 250))

echo "  [2/2] ISC-II: Generating 239 questions (Security & Privacy - CRITICAL)..."
node scripts/qbank-generate.cjs ISC-II --count=239 && TOTAL_TO_GENERATE=$((TOTAL_TO_GENERATE + 239))

echo "✓ ISC complete (489 added)"
echo ""

# ═══════════════════════════════════════════════════════════════════
# TCP: 520 questions needed (critically underweight)
# ═══════════════════════════════════════════════════════════════════
echo "═══ TCP (need 520) ═══"

echo "  [1/3] TCP-I: Generating 200 questions (Individual Tax Planning)..."
node scripts/qbank-generate.cjs TCP-I --count=200 && TOTAL_TO_GENERATE=$((TOTAL_TO_GENERATE + 200))

echo "  [2/3] TCP-III: Generating 175 questions (Entity Tax Planning)..."
node scripts/qbank-generate.cjs TCP-III --count=175 && TOTAL_TO_GENERATE=$((TOTAL_TO_GENERATE + 175))

echo "  [3/3] TCP-II: Generating 145 questions (Entity Tax Compliance)..."
node scripts/qbank-generate.cjs TCP-II --count=145 && TOTAL_TO_GENERATE=$((TOTAL_TO_GENERATE + 145))

echo "✓ TCP complete (520 added)"
echo ""

# ═══════════════════════════════════════════════════════════════════
# COMPLETE
# ═══════════════════════════════════════════════════════════════════
echo "═══════════════════════════════════════════════════════════════════"
echo "    ✅ GENERATION COMPLETE!"
echo "    Total generated: $TOTAL_TO_GENERATE questions"
echo "═══════════════════════════════════════════════════════════════════"
echo ""

# Verify final counts
echo "Verifying final counts..."
npm run qbank:stats
