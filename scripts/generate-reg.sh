#!/bin/bash
# generate-reg.sh - Generate questions for REG section (already 100% enhanced)

set -e

cd "$(dirname "$0")/.."

export GEMINI_API_KEY=$(grep VITE_GEMINI_API_KEY .env | cut -d'=' -f2)

BATCH_SIZE=${1:-25}

echo "=========================================="
echo "VoraPrep Generation: REG Section"
echo "Started: $(date)"
echo "Batch size per area: $BATCH_SIZE"
echo "=========================================="

echo ""
echo "=== REG Section ==="

echo "Starting REG-I at $(date)"
node scripts/qbank-generate.cjs REG-I --count=$BATCH_SIZE

echo "Starting REG-II at $(date)"
node scripts/qbank-generate.cjs REG-II --count=$BATCH_SIZE

echo "Starting REG-III at $(date)"
node scripts/qbank-generate.cjs REG-III --count=$BATCH_SIZE

echo "Starting REG-IV at $(date)"
node scripts/qbank-generate.cjs REG-IV --count=$BATCH_SIZE

echo "Starting REG-V at $(date)"
node scripts/qbank-generate.cjs REG-V --count=$BATCH_SIZE

echo ""
echo "=========================================="
echo "Generation Complete: REG"
echo "Finished: $(date)"
echo "Generated ~$((BATCH_SIZE * 5)) new questions"
echo "=========================================="

npm run qbank:stats
