#!/bin/bash
# generate-gap-fill-safe.sh - Generate for sections NOT currently being enhanced
# Safe for parallel execution with enhance-all-sections.sh
#
# Enhancement order: FAR → AUD → REG → BAR → ISC → TCP
# This script: BAR → ISC → TCP (safe to run in parallel)

set -e

cd "$(dirname "$0")/.."

# Load API key
export GEMINI_API_KEY=$(grep VITE_GEMINI_API_KEY .env | cut -d'=' -f2)

BATCH_SIZE=${1:-25}

echo "=========================================="
echo "VoraPrep Safe Parallel Gap-Fill Generation"
echo "Started: $(date)"
echo "Batch size per area: $BATCH_SIZE"
echo ""
echo "SAFE: Generating for BAR, ISC, TCP only"
echo "(not touching FAR/AUD/REG which are being enhanced)"
echo "=========================================="

# BAR Section (needs +1,036 to reach 2,000)
echo ""
echo "=== BAR Section ==="
echo "Starting BAR-I at $(date)"
node scripts/qbank-generate.cjs BAR-I --count=$BATCH_SIZE

echo "Starting BAR-II at $(date)"
node scripts/qbank-generate.cjs BAR-II --count=$BATCH_SIZE

echo "Starting BAR-III at $(date)"
node scripts/qbank-generate.cjs BAR-III --count=$BATCH_SIZE

# ISC Section (needs +1,060 to reach 2,000)
echo ""
echo "=== ISC Section ==="
echo "Starting ISC-I at $(date)"
node scripts/qbank-generate.cjs ISC-I --count=$BATCH_SIZE

echo "Starting ISC-II at $(date)"
node scripts/qbank-generate.cjs ISC-II --count=$BATCH_SIZE

echo "Starting ISC-III at $(date)"
node scripts/qbank-generate.cjs ISC-III --count=$BATCH_SIZE

# TCP Section (needs +1,117 to reach 2,000)
echo ""
echo "=== TCP Section ==="
echo "Starting TCP-I at $(date)"
node scripts/qbank-generate.cjs TCP-I --count=$BATCH_SIZE

echo "Starting TCP-II at $(date)"
node scripts/qbank-generate.cjs TCP-II --count=$BATCH_SIZE

echo "Starting TCP-III at $(date)"
node scripts/qbank-generate.cjs TCP-III --count=$BATCH_SIZE

echo "Starting TCP-IV at $(date)"
node scripts/qbank-generate.cjs TCP-IV --count=$BATCH_SIZE

echo ""
echo "=========================================="
echo "Safe Gap-Fill Complete"
echo "Finished: $(date)"
echo "Generated ~$((BATCH_SIZE * 10)) new questions for BAR/ISC/TCP"
echo "=========================================="

# Show updated stats
npm run qbank:stats
