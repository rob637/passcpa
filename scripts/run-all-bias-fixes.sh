#!/bin/bash
# Run length bias fix for all courses in order of severity
# CISA (95.9%) > CIA (85.8%) > CFP (69.9%) > EA (69.2%) > CPA (62.8%) > CMA (58.4%)

set -e
cd /workspaces/passcpa
export $(grep VITE_GEMINI_API_KEY .env)

COURSES=("cisa" "cia" "cfp" "ea" "cpa" "cma")

for course in "${COURSES[@]}"; do
  echo ""
  echo "=========================================="
  echo "Starting $course at $(date)"
  echo "=========================================="
  
  node scripts/fix-answer-length-bias.cjs --course=$course --resume 2>&1 | tee -a /tmp/length-bias-all.log
  
  echo ""
  echo "$course completed at $(date)"
  echo ""
  sleep 5
done

echo ""
echo "=========================================="
echo "ALL COURSES COMPLETE"
echo "=========================================="

# Final bias check
node /tmp/bias-check.js
