#!/usr/bin/env python3
"""
Test HeyGen login - use this for one-time Google OAuth setup.

IMPORTANT: This needs a display (browser window). 

Options:
1. Run locally: git clone the repo locally, then run this script
2. Run in Codespaces with Port Forwarding (experimental):
   - Forward port 9222 from Codespaces
   - Connect Chrome DevTools to debug the browser

For Codespaces without display, see: headless_login.py (experimental)
"""

import os
import sys

# Check if display is available
if sys.platform != 'darwin' and sys.platform != 'win32':
    display = os.environ.get('DISPLAY')
    if not display:
        print("=" * 60)
        print("⚠️  No display available (running in Codespaces/container)")
        print("=" * 60)
        print()
        print("Google OAuth requires a visible browser window.")
        print()
        print("OPTIONS:")
        print()
        print("1. Run locally (recommended):")
        print("   git clone your-repo && cd content_factory/cisa_videos")
        print("   pip install playwright && playwright install chromium")
        print("   python test_login.py")
        print("   Then copy the output/.browser_data folder back to Codespaces")
        print()
        print("2. Use email/password login instead:")
        print("   Add to .env: HEYGEN_EMAIL=your@email.com")
        print("   Add to .env: HEYGEN_PASSWORD=yourpassword")
        print()
        sys.exit(1)

from heygen_automation import HeyGenAutomation
import time

print("=" * 60)
print("HeyGen Login Test")
print("=" * 60)
print()
print("Opening browser window...")
print("Log in with Google when the browser appears.")
print()

# Open visible browser (headless=False) for manual login
automation = HeyGenAutomation(headless=False)
automation.start()

print()
print("✅ SUCCESS! Session saved to output/.browser_data/")
print()
print("You can now run the full automation headless:")
print("  python orchestrator.py")
print()
print("Browser will close in 10 seconds...")
time.sleep(10)

automation.stop()
