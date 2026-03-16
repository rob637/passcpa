#!/bin/bash
# Enhance all CPA sections sequentially
# Run with: nohup ./scripts/enhance-all-sections.sh > /tmp/enhance-all.log 2>&1 &

set -e

cd /workspaces/passcpa

# Get API key
export GEMINI_API_KEY=$(grep VITE_GEMINI_API_KEY .env | cut -d'=' -f2)

echo "=========================================="
echo "VoraPrep Full CPA Question Enhancement"
echo "Started: $(date)"
echo "=========================================="

SECTIONS="FAR AUD REG BAR ISC TCP"

for SECTION in $SECTIONS; do
  echo ""
  echo "=========================================="
  echo "Starting $SECTION at $(date)"
  echo "=========================================="
  
  node scripts/qbank-enhance.cjs $SECTION
  
  echo ""
  echo "✅ $SECTION complete at $(date)"
  echo ""
  
  # Validate after each section
  node scripts/qbank-validate.cjs $SECTION
  
  # Small pause between sections
  sleep 5
done

echo ""
echo "=========================================="
echo "ALL SECTIONS COMPLETE at $(date)"
echo "=========================================="

# Final stats
node scripts/qbank-stats.cjs

# Build TypeScript
echo ""
echo "Building TypeScript from JSON..."
node scripts/qbank-build.cjs

echo ""
echo "🎉 Enhancement pipeline complete!"
