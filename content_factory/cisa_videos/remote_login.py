#!/usr/bin/env python3
"""
Remote Login Helper for Codespaces/Containers

This script launches a browser with remote debugging enabled,
allowing you to connect from your local machine to complete Google OAuth.

Usage:
1. Run this script in Codespaces
2. Forward port 9222 (VS Code will prompt)
3. Open Chrome on your local machine and go to: chrome://inspect
4. Click "Configure" and add localhost:9222
5. Click "inspect" on the HeyGen page
6. Complete Google login in the DevTools window
7. Press Enter in this terminal when done
"""

import os
import time
import subprocess
from pathlib import Path

# Ensure output directory exists
output_dir = Path(__file__).parent / "output"
output_dir.mkdir(exist_ok=True)
browser_data = output_dir / ".browser_data"

print("=" * 60)
print("🌐 Remote Browser Login for HeyGen")
print("=" * 60)
print()

# Check if Playwright is installed
try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print("Installing Playwright...")
    os.system("pip install playwright && playwright install chromium")
    from playwright.sync_api import sync_playwright

print("Launching browser with remote debugging on port 9222...")
print()

# Launch Chrome with remote debugging
chrome_path = Path.home() / ".cache/ms-playwright/chromium-1208/chrome-linux64/chrome"
if not chrome_path.exists():
    # Find chromium
    import glob
    matches = glob.glob(str(Path.home() / ".cache/ms-playwright/chromium-*/chrome-linux*/chrome"))
    if matches:
        chrome_path = Path(matches[0])
    else:
        print("❌ Chromium not found. Run: playwright install chromium")
        exit(1)

cmd = [
    str(chrome_path),
    "--remote-debugging-port=9222",
    "--remote-debugging-address=0.0.0.0",
    f"--user-data-dir={browser_data}",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-sync",
    "https://app.heygen.com/login"
]

print("📍 NEXT STEPS:")
print()
print("1. VS Code should show a popup to forward port 9222")
print("   (If not, go to PORTS tab and add port 9222)")
print()
print("2. On your LOCAL machine, open Chrome and go to:")
print("   chrome://inspect")
print()
print("3. Click 'Configure...' and add: localhost:9222")
print()
print("4. You should see 'app.heygen.com' appear - click 'inspect'")
print()
print("5. Complete Google OAuth login in the DevTools window")
print()
print("6. Press Enter here when done logging in...")
print()
print("-" * 60)

# Start browser
proc = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

try:
    input("Press Enter after completing login...")
except KeyboardInterrupt:
    pass

proc.terminate()

print()
print("✅ Session saved to output/.browser_data/")
print()
print("Now run the pipeline:")
print("  ./start.sh --batch-size 5")
