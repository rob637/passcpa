#!/bin/bash
# generate-far-aud.sh - Generate for FAR and AUD sections
# Safe to run - these sections are already fully enhanced

set -e

cd "$(dirname "$0")/.."

export GEMINI_API_KEY=$(grep VITE_GEMINI_API_KEY .env | cut -d'=' -f2)

BATCH_SIZE=${1:-25}

echo "=========================================="
echo "VoraPrep Generation: FAR, AUD (already enhanced)"
echo "Started: $(date)"
echo "Batch size per area: $BATCH_SIZE"
echo "=========================================="

# FAR Section
echo ""
echo "=== FAR Section ==="
echo "Starting FAR-II at $(date)"
node scripts/qbank-generate.cjs FAR-II --count=$BATCH_SIZE

echo "Starting FAR-III at $(date)"
node scripts/qbank-generate.cjs FAR-III --count=$BATCH_SIZE

echo "Starting FAR-IV at $(date)"
node scripts/qbank-generate.cjs FAR-IV --count=$BATCH_SIZE

# AUD Section  
echo ""
echo "=== AUD Section ==="
echo "Starting AUD-II at $(date)"
node scripts/qbank-generate.cjs AUD-II --count=$BATCH_SIZE

echo "Starting AUD-III at $(date)"
node scripts/qbank-generate.cjs AUD-III --count=$BATCH_SIZE

echo "Starting AUD-I at $(date)"
node scripts/qbank-generate.cjs AUD-I --count=$BATCH_SIZE

echo ""
echo "=========================================="
echo "Generation Complete: FAR, AUD"
echo "Finished: $(date)"
echo "Generated ~$((BATCH_SIZE * 6)) new questions"
echo "=========================================="

npm run qbank:stats
