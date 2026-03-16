#!/bin/bash
# generate-gap-fill.sh - Generate questions for underweight blueprint areas
# Run after enhancement completes
#
# Usage: ./scripts/generate-gap-fill.sh
#        ./scripts/generate-gap-fill.sh --batch 50   # 50 questions per area

set -e

cd "$(dirname "$0")/.."

# Load API key
export GEMINI_API_KEY=$(grep VITE_GEMINI_API_KEY .env | cut -d'=' -f2)

BATCH_SIZE=${1:-25}  # Default 25 questions per area

echo "=========================================="
echo "VoraPrep Gap-Fill Question Generation"
echo "Started: $(date)"
echo "Batch size per area: $BATCH_SIZE"
echo "=========================================="

# Priority areas based on blueprint analysis (sorted by gap size)
# These are the areas that need the most questions to reach 2,000/section

echo ""
echo "📝 Phase 1: HIGH Priority - Underweight Areas"
echo "=========================================="

# BAR-I: Business Analysis (need +558)
echo ""
echo "Starting BAR-I at $(date)"
node scripts/qbank-generate.cjs BAR-I --count=$BATCH_SIZE

# BAR-II: Technical Accounting (need +501)
echo ""
echo "Starting BAR-II at $(date)"
node scripts/qbank-generate.cjs BAR-II --count=$BATCH_SIZE

# ISC-I: Information Systems (need +499)
echo ""
echo "Starting ISC-I at $(date)"
node scripts/qbank-generate.cjs ISC-I --count=$BATCH_SIZE

# ISC-II: Security & Privacy (need +495)
echo ""
echo "Starting ISC-II at $(date)"
node scripts/qbank-generate.cjs ISC-II --count=$BATCH_SIZE

# TCP-I: Individual Tax Planning (need +438)
echo ""
echo "Starting TCP-I at $(date)"
node scripts/qbank-generate.cjs TCP-I --count=$BATCH_SIZE

# AUD-III: Audit Evidence (need +412)
echo ""
echo "Starting AUD-III at $(date)"
node scripts/qbank-generate.cjs AUD-III --count=$BATCH_SIZE

echo ""
echo "📝 Phase 2: MEDIUM Priority Areas"
echo "=========================================="

# TCP-II: Entity Tax Compliance (need +351)
echo ""
echo "Starting TCP-II at $(date)"
node scripts/qbank-generate.cjs TCP-II --count=$BATCH_SIZE

# TCP-III: Entity Tax Planning (need +339)
echo ""
echo "Starting TCP-III at $(date)"
node scripts/qbank-generate.cjs TCP-III --count=$BATCH_SIZE

# AUD-II: Risk Assessment (need +331)
echo ""
echo "Starting AUD-II at $(date)"
node scripts/qbank-generate.cjs AUD-II --count=$BATCH_SIZE

# REG-IV: Entity Taxation (need +320)
echo ""
echo "Starting REG-IV at $(date)"
node scripts/qbank-generate.cjs REG-IV --count=$BATCH_SIZE

# FAR-II: Financial Statement Accounts (need +279)
echo ""
echo "Starting FAR-II at $(date)"
node scripts/qbank-generate.cjs FAR-II --count=$BATCH_SIZE

# FAR-III: Select Transactions (need +231)
echo ""
echo "Starting FAR-III at $(date)"
node scripts/qbank-generate.cjs FAR-III --count=$BATCH_SIZE

echo ""
echo "=========================================="
echo "Gap-Fill Generation Complete"
echo "Finished: $(date)"
echo "=========================================="

# Show updated stats
echo ""
echo "📊 Updated Statistics:"
npm run qbank:stats

# Rebuild TypeScript
echo ""
echo "🔨 Rebuilding TypeScript from JSON..."
npm run qbank:build

echo ""
echo "✅ All done! Run 'npm run build' to verify."
