"""
VoraPrep UX Audit Configuration

Environment variables (set in .env or export):
  ANTHROPIC_API_KEY   - Claude API key (required)
  VORAPREP_URL        - App URL (default: http://localhost:5173)
  VORAPREP_EMAIL      - Test user email
  VORAPREP_PASSWORD   - Test user password
"""

import os
import glob
from dotenv import load_dotenv

load_dotenv()


def _find_chromium() -> str | None:
    """Auto-detect Playwright's Chromium binary."""
    patterns = [
        os.path.expanduser("~/.cache/ms-playwright/chromium-*/chrome-linux*/chrome"),
        "/usr/bin/chromium-browser",
        "/usr/bin/chromium",
        "/usr/bin/google-chrome",
    ]
    for pattern in patterns:
        matches = glob.glob(pattern)
        if matches:
            return matches[0]
    return None

# ============================================================================
# App Configuration
# ============================================================================

APP_URL = os.getenv("VORAPREP_URL", "http://localhost:5174")
TEST_EMAIL = os.getenv("VORAPREP_EMAIL", "test@voraprep.com")
TEST_PASSWORD = os.getenv("VORAPREP_PASSWORD", "testpassword123")

# Claude model to use for the audit agent
LLM_MODEL = os.getenv("AUDIT_LLM_MODEL", "claude-sonnet-4-20250514")

# ============================================================================
# Course Configuration
# ============================================================================

COURSES = {
    "cpa": {
        "name": "CPA (Certified Public Accountant)",
        "landing": "/cpa",
        "sections": ["FAR", "AUD", "REG", "BAR", "ISC", "TCP"],
        "has_tbs": True,
        "has_wc": False,  # WC retired with BEC Dec 2023
        "has_essay": False,
        "exam_route": "/exam",
    },
    "ea": {
        "name": "EA (Enrolled Agent)",
        "landing": "/ea-prep",
        "sections": ["SEE1", "SEE2", "SEE3"],
        "has_tbs": False,
        "has_wc": False,
        "has_essay": False,
        "exam_route": "/ea-exam",
    },
    "cma": {
        "name": "CMA (Certified Management Accountant)",
        "landing": "/cma",
        "sections": ["CMA1", "CMA2"],
        "has_tbs": False,
        "has_wc": False,
        "has_essay": True,
        "exam_route": "/cma-exam",
    },
    "cia": {
        "name": "CIA (Certified Internal Auditor)",
        "landing": "/cia",
        "sections": ["CIA1", "CIA2", "CIA3"],
        "has_tbs": False,
        "has_wc": False,
        "has_essay": False,
        "exam_route": "/cia-exam",
    },
    "cisa": {
        "name": "CISA (Certified Information Systems Auditor)",
        "landing": "/cisa",
        "sections": ["CISA1", "CISA2", "CISA3", "CISA4", "CISA5"],
        "has_tbs": False,
        "has_wc": False,
        "has_essay": False,
        "exam_route": "/cisa-exam",
    },
    "cfp": {
        "name": "CFP (Certified Financial Planner)",
        "landing": "/cfp",
        "sections": ["CFP1", "CFP2", "CFP3", "CFP4", "CFP5", "CFP6", "CFP7", "CFP8"],
        "has_tbs": False,
        "has_wc": False,
        "has_essay": False,
        "exam_route": "/cfp-exam",
    },
}

# ============================================================================
# Audit Settings
# ============================================================================

# Maximum steps per audit task (prevents infinite loops)
MAX_STEPS = 50

# Maximum actions the LLM can take per step
MAX_ACTIONS_PER_STEP = 5

# Browser settings
HEADLESS = os.getenv("AUDIT_HEADLESS", "true").lower() == "true"
VIEWPORT_WIDTH = 1440
VIEWPORT_HEIGHT = 900
CHROME_PATH = os.getenv("CHROME_PATH") or _find_chromium()

# Report output directory
REPORTS_DIR = os.path.join(os.path.dirname(__file__), "reports")

# Screenshots directory
SCREENSHOTS_DIR = os.path.join(os.path.dirname(__file__), "screenshots")
