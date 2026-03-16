#!/usr/bin/env bash
# =============================================================================
# VoraPrep Deploy Script — Manual deployment with safety gates
#
# Usage:
#   ./scripts/deploy.sh staging          # Deploy to staging
#   ./scripts/deploy.sh production       # Deploy to production
#   ./scripts/deploy.sh production app   # Deploy hosting only (no functions)
#   ./scripts/deploy.sh dev              # Deploy to dev (no gate)
#
# Requires typing "DEPLOY STAGING" or "DEPLOY PRODUCTION" to confirm.
# =============================================================================
set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

TARGET="${1:-}"
SCOPE="${2:-full}"  # "full" or "app" (app = hosting only, no functions)

if [[ -z "$TARGET" ]]; then
  echo -e "${RED}Usage: ./scripts/deploy.sh <staging|production|dev> [app]${NC}"
  echo ""
  echo "  staging     → voraprep-staging.web.app"
  echo "  production  → voraprep.com (hosting + functions)"
  echo "  dev         → passcpa-dev (development)"
  echo ""
  echo "  Optional: add 'app' to skip Cloud Functions deployment"
  echo "            e.g., ./scripts/deploy.sh production app"
  exit 1
fi

# ─── Gather context ──────────────────────────────────────────────────────────
BRANCH=$(git branch --show-current)
LAST_COMMIT=$(git log -1 --oneline)
UNCOMMITTED=$(git status --porcelain | wc -l | tr -d ' ')
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo ""
echo -e "${BOLD}═══════════════════════════════════════════════════${NC}"
echo -e "${BOLD}  VoraPrep Deployment${NC}"
echo -e "${BOLD}═══════════════════════════════════════════════════${NC}"
echo ""
echo -e "  ${BLUE}Target:${NC}      $TARGET"
echo -e "  ${BLUE}Scope:${NC}       $SCOPE"
echo -e "  ${BLUE}Branch:${NC}      $BRANCH"
echo -e "  ${BLUE}Last commit:${NC} $LAST_COMMIT"
echo -e "  ${BLUE}Uncommitted:${NC} $UNCOMMITTED file(s)"
echo -e "  ${BLUE}Time:${NC}        $TIMESTAMP"
echo ""

# ─── Warn about uncommitted changes ─────────────────────────────────────────
if [[ "$UNCOMMITTED" -gt 0 ]]; then
  echo -e "${YELLOW}⚠  WARNING: You have $UNCOMMITTED uncommitted change(s).${NC}"
  echo -e "${YELLOW}   These will NOT be included in the deployed build.${NC}"
  echo ""
fi

# ─── Dev environment (low risk, no gate) ─────────────────────────────────────
if [[ "$TARGET" == "dev" ]]; then
  echo -e "${GREEN}→ Building and deploying to development...${NC}"
  npm run build:dev
  firebase deploy --only hosting -P development
  echo ""
  echo -e "${GREEN}✅ Deployed to development${NC}"
  exit 0
fi

# ─── Staging gate ────────────────────────────────────────────────────────────
if [[ "$TARGET" == "staging" ]]; then
  echo -e "${YELLOW}${BOLD}To deploy to STAGING, type exactly:${NC}  ${BOLD}DEPLOY STAGING${NC}"
  echo ""
  read -rp "  Confirm: " CONFIRM
  
  if [[ "$CONFIRM" != "DEPLOY STAGING" ]]; then
    echo ""
    echo -e "${RED}✗ Deployment cancelled. You typed: '$CONFIRM'${NC}"
    echo -e "${RED}  Expected: 'DEPLOY STAGING'${NC}"
    exit 1
  fi

  echo ""
  echo -e "${GREEN}→ Building for staging...${NC}"
  npm run build:staging
  
  echo -e "${GREEN}→ Deploying hosting to voraprep-staging...${NC}"
  firebase deploy --only hosting -P staging
  
  echo ""
  echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
  echo -e "${GREEN}  ✅ STAGING deployment complete${NC}"
  echo -e "${GREEN}  🔗 https://voraprep-staging.web.app${NC}"
  echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
  exit 0
fi

# ─── Production gate ─────────────────────────────────────────────────────────
if [[ "$TARGET" == "production" ]]; then
  # Extra warnings for production
  echo -e "${RED}${BOLD}╔══════════════════════════════════════════════╗${NC}"
  echo -e "${RED}${BOLD}║  ⚠  PRODUCTION DEPLOYMENT — LIVE USERS  ⚠   ║${NC}"
  echo -e "${RED}${BOLD}╚══════════════════════════════════════════════╝${NC}"
  echo ""
  
  if [[ "$BRANCH" != "main" ]]; then
    echo -e "${RED}${BOLD}⚠  WARNING: You are on branch '$BRANCH', not 'main'.${NC}"
    echo -e "${RED}   Production deploys should typically be from 'main'.${NC}"
    echo ""
  fi

  if [[ "$SCOPE" == "full" ]]; then
    echo -e "  This will deploy: ${BOLD}Hosting + Cloud Functions${NC}"
  else
    echo -e "  This will deploy: ${BOLD}Hosting only${NC} (functions skipped)"
  fi
  echo ""
  echo -e "${YELLOW}${BOLD}To deploy to PRODUCTION, type exactly:${NC}  ${BOLD}DEPLOY PRODUCTION${NC}"
  echo ""
  read -rp "  Confirm: " CONFIRM

  if [[ "$CONFIRM" != "DEPLOY PRODUCTION" ]]; then
    echo ""
    echo -e "${RED}✗ Deployment cancelled. You typed: '$CONFIRM'${NC}"
    echo -e "${RED}  Expected: 'DEPLOY PRODUCTION'${NC}"
    exit 1
  fi

  echo ""
  if [[ "$SCOPE" == "app" ]]; then
    echo -e "${GREEN}→ Building for production (app only)...${NC}"
    npm run build:prod
  else
    echo -e "${GREEN}→ Building for production (full: hosting + blog)...${NC}"
    npm run build:all
  fi

  echo -e "${GREEN}→ Deploying hosting to voraprep-prod...${NC}"
  firebase deploy --only hosting -P production

  if [[ "$SCOPE" == "full" ]]; then
    echo -e "${GREEN}→ Deploying Cloud Functions to voraprep-prod...${NC}"
    cd functions && npm ci && cd ..
    firebase deploy --only functions -P production
  fi

  echo ""
  echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
  echo -e "${GREEN}  ✅ PRODUCTION deployment complete${NC}"
  echo -e "${GREEN}  🔗 https://voraprep.com${NC}"
  echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
  exit 0
fi

# ─── Unknown target ──────────────────────────────────────────────────────────
echo -e "${RED}Unknown target: '$TARGET'. Use: staging, production, or dev${NC}"
exit 1
