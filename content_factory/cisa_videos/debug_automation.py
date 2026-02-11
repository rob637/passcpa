#!/usr/bin/env python3
"""
Debug HeyGen Automation - Interactive Step-by-Step

Run this on your local machine to debug the automation.
It will pause at each step so you can see what's happening.

Usage:
    python debug_automation.py
"""
import time
from pathlib import Path
from playwright.sync_api import sync_playwright

# Configuration
AVATAR_ID = "Tahlia"
AVATAR_LOOK = "Tahlia Front"
BACKGROUND = "bg_corporate_blue.png"  # Must be uploaded to HeyGen already
SCRIPT_FILE = "output/scripts/01_Outsourcing_clean.txt"

def screenshot(page, name):
    """Take a debug screenshot."""
    path = Path(__file__).parent / "output" / f"debug_{name}_{int(time.time())}.png"
    page.screenshot(path=str(path))
    print(f"[SCREENSHOT] {path}")
    return path

def main():
    print("=" * 60)
    print("HeyGen Automation Debug")
    print("=" * 60)
    
    # Load script
    script_path = Path(__file__).parent / SCRIPT_FILE
    if not script_path.exists():
        print(f"[ERROR] Script not found: {script_path}")
        return
    script_text = script_path.read_text(encoding='utf-8')
    print(f"[OK] Script loaded: {len(script_text)} chars")
    
    with sync_playwright() as p:
        # Launch visible browser
        browser_data = Path(__file__).parent / "output" / ".browser_data"
        browser = p.chromium.launch_persistent_context(
            str(browser_data),
            headless=False,
            viewport={'width': 1920, 'height': 1080},
        )
        page = browser.pages[0] if browser.pages else browser.new_page()
        
        print("\n[STEP 1] Navigate to Avatar Studio (NOT Video Agent)...")
        page.goto("https://app.heygen.com/create-v3/avatars", timeout=60000)
        time.sleep(5)
        screenshot(page, "01_avatar_studio")
        
        # Check if logged in
        if "/login" in page.url or "/signin" in page.url:
            print("[!] Not logged in. Please log in manually in the browser window.")
            print("    Press ENTER when done...")
            input()
            # Re-navigate after login
            page.goto("https://app.heygen.com/create-v3/avatars", timeout=60000)
            time.sleep(5)
            screenshot(page, "01b_after_login")
        
        # Avatar Studio is loaded - now set layout
        print("\n[STEP 2] Click Layouts to set aspect ratio...")
        print("    Looking for Layouts button in right sidebar...")
        try:
            # Try multiple selectors
            layouts_found = False
            for selector in ['text="Layouts"', '[aria-label="Layouts"]', 'button:has-text("Layouts")']:
                try:
                    layouts_btn = page.locator(selector).first
                    if layouts_btn and layouts_btn.is_visible():
                        layouts_btn.click()
                        print(f"    [OK] Clicked via: {selector}")
                        layouts_found = True
                        time.sleep(1)
                        break
                except:
                    continue
            
            if not layouts_found:
                print("    [WARN] Layouts button not found with standard selectors")
                print("    Taking screenshot - check right sidebar")
            
            screenshot(page, "04_layouts_panel")
            
            # Look for 16:9 or Avatar Only
            print("    Looking for 16:9 aspect ratio or Avatar Only layout...")
            for selector in ['text="16:9"', 'text="Avatar Only"', '[aria-label*="16:9"]']:
                try:
                    option = page.locator(selector).first
                    if option and option.is_visible():
                        option.click()
                        print(f"    [OK] Selected: {selector}")
                        time.sleep(1)
                        break
                except:
                    continue
            
            screenshot(page, "04b_after_layout")
            page.keyboard.press("Escape")
            time.sleep(0.5)
            
        except Exception as e:
            print(f"[ERROR] {e}")
            screenshot(page, "04_error")
        
        print(f"\n[STEP 3] Select avatar: {AVATAR_ID}...")
        try:
            # Click on Avatar area or Replace button
            print("    Looking for Avatar panel or Replace button...")
            for selector in ['text="Avatar"', '[aria-label="Avatar"]', 'text="Replace avatar"']:
                try:
                    btn = page.locator(selector).first
                    if btn and btn.is_visible():
                        btn.click()
                        print(f"    [OK] Opened avatar panel via: {selector}")
                        time.sleep(1)
                        break
                except:
                    continue
            
            screenshot(page, "05a_avatar_panel")
            
            # Click Public Avatars tab
            public_tab = page.locator('text="Public Avatars"').first
            if public_tab and public_tab.is_visible():
                public_tab.click()
                print("    [OK] Clicked Public Avatars tab")
                time.sleep(1)
            
            # Search for avatar
            search = page.locator('input[placeholder*="Search"]').first
            if search and search.is_visible():
                search.click()
                search.fill(AVATAR_ID)
                print(f"    [OK] Searched for: {AVATAR_ID}")
                time.sleep(2)
            
            screenshot(page, "05b_search_results")
            
            # Click on avatar name
            avatar_result = page.locator(f'text="{AVATAR_ID}"').first
            if avatar_result and avatar_result.is_visible():
                avatar_result.click()
                print(f"    [OK] Clicked avatar: {AVATAR_ID}")
                time.sleep(2)
            
            screenshot(page, "05c_avatar_selected")
            
            # Select specific look/outfit
            if AVATAR_LOOK:
                print(f"    Looking for look: {AVATAR_LOOK}...")
                for selector in [f'text="{AVATAR_LOOK}"', f'[aria-label*="{AVATAR_LOOK}"]', f'img[alt*="{AVATAR_LOOK}"]']:
                    try:
                        look = page.locator(selector).first
                        if look and look.is_visible():
                            look.click()
                            print(f"    [OK] Selected look: {AVATAR_LOOK}")
                            time.sleep(1)
                            break
                    except:
                        continue
            
            screenshot(page, "05d_look_selected")
            
        except Exception as e:
            print(f"[ERROR] {e}")
            screenshot(page, "05_error")
        
        print(f"\n[STEP 4] Set background...")
        try:
            # Need to open background picker
            # Usually there's a "Customize" or background area to click
            for selector in ['text="Customize"', 'text="Background"', 'text="Replace Avatar Background"']:
                try:
                    btn = page.locator(selector).first
                    if btn and btn.is_visible():
                        btn.click()
                        print(f"    [OK] Opened background via: {selector}")
                        time.sleep(1)
                        break
                except:
                    continue
            
            screenshot(page, "06a_bg_panel")
            
            # Click Uploads tab
            uploads_tab = page.locator('text="Uploads"').first
            if uploads_tab and uploads_tab.is_visible():
                uploads_tab.click()
                print("    [OK] Clicked Uploads tab")
                time.sleep(1)
            else:
                print("    [WARN] Uploads tab not visible")
            
            screenshot(page, "06b_uploads_tab")
            
            # Click on first uploaded background
            # Look for any image thumbnail
            bg_thumb = page.locator('[class*="thumbnail"] img, [class*="upload"] img, img').first
            if bg_thumb and bg_thumb.is_visible():
                bg_thumb.click()
                print("    [OK] Clicked background thumbnail")
                time.sleep(1)
            
            screenshot(page, "06c_bg_selected")
            page.keyboard.press("Escape")
            
        except Exception as e:
            print(f"[ERROR] {e}")
            screenshot(page, "06_error")
        
        print("\n[STEP 5] Enter script text...")
        try:
            # Find script input area
            script_input = page.locator('[contenteditable="true"]').first
            if not script_input or not script_input.is_visible():
                script_input = page.locator('textarea').first
            if not script_input or not script_input.is_visible():
                script_input = page.locator('[placeholder*="script"], [placeholder*="Script"]').first
            
            if script_input and script_input.is_visible():
                script_input.click()
                # Use keyboard to paste (handles large text better)
                page.keyboard.type(script_text[:500])  # Just first 500 chars for test
                print(f"    [OK] Entered script preview (500 chars)")
            else:
                print("    [WARN] Could not find script input area")
            
            screenshot(page, "07_script_entered")
            
        except Exception as e:
            print(f"[ERROR] {e}")
            screenshot(page, "07_error")
        
        print("\n" + "=" * 60)
        print("Debug complete!")
        print("Check the screenshots in output/ folder")
        print("=" * 60)
        print("\nPress ENTER to close browser...")
        input()
        
        browser.close()

if __name__ == "__main__":
    main()
