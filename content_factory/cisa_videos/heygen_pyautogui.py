#!/usr/bin/env python3
"""
HeyGen Automation using PyAutoGUI for reliable clicking/typing.
Playwright handles navigation, pyautogui handles UI interactions.

Usage:
    python heygen_pyautogui.py --calibrate   # Run calibration to get coordinates
    python heygen_pyautogui.py --test        # Test with one video
    python heygen_pyautogui.py               # Run full batch
"""

import pyautogui
import pyperclip
import time
import json
import os
import logging
from pathlib import Path
from playwright.sync_api import sync_playwright

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')
logger = logging.getLogger(__name__)

# Safety settings
pyautogui.PAUSE = 0.3  # Pause between actions
pyautogui.FAILSAFE = True  # Move mouse to corner to abort

# ============================================================
# COORDINATES - These need to be calibrated for your screen
# Run with --calibrate to set these
# ============================================================
COORDS = {
    # Title field in upper left
    "title": (225, 62),
    
    # Script text area (left panel)
    "script": (300, 400),
    
    # Avatar in video preview (center of screen)
    "avatar_preview": (740, 380),
    
    # Change avatar button (appears after clicking avatar)
    "change_avatar": (658, 102),
    
    # Public Avatars tab
    "public_avatars": (1111, 128),
    
    # Search box in avatar panel
    "avatar_search": (1113, 157),
    
    # First avatar result (after search)
    "avatar_result": (1078, 320),
    
    # First outfit thumbnail (after clicking avatar name)
    "outfit_thumbnail": (1078, 250),
    
    # Motion Engine dropdown
    "motion_engine": (1133, 345),
    
    # Avatar III option
    "avatar_iii": (1133, 400),
    
    # Customize button (for background)
    "customize_bg": (1046, 420),
    
    # Uploads tab (in background panel)
    "uploads_tab": (1100, 180),
    
    # First uploaded background
    "first_upload": (1080, 250),
    
    # Layout button (right sidebar, "Layouts" icon)
    "layouts_button": (1269, 480),
    
    # Portrait 9:16 option
    "portrait_9_16": (1100, 200),
}


def calibrate():
    """Interactive calibration to find coordinates."""
    print("\n" + "="*60)
    print("CALIBRATION MODE")
    print("="*60)
    print("\nI'll guide you through finding the coordinates.")
    print("Move your mouse to each location and press ENTER.")
    print("Press Ctrl+C to exit at any time.\n")
    
    coords_to_find = [
        ("title", "the 'Untitled Video' title text (upper left)"),
        ("script", "the script text area (left panel)"),
        ("avatar_preview", "the avatar in the video preview (center)"),
        ("change_avatar", "'Change avatar' button (after clicking avatar)"),
        ("public_avatars", "'Public Avatars' tab"),
        ("avatar_search", "the search box in avatar panel"),
        ("avatar_result", "where the first avatar appears after searching"),
        ("outfit_thumbnail", "the first outfit image (after clicking avatar name)"),
        ("motion_engine", "'Motion Engine' dropdown showing Avatar III/IV"),
        ("avatar_iii", "'Avatar III' option in the dropdown"),
        ("customize_bg", "'Customize' button under Avatar Background"),
        ("uploads_tab", "'Uploads' tab in background panel"),
        ("first_upload", "where the first uploaded image appears"),
        ("layouts_button", "'Layouts' icon in right sidebar"),
        ("portrait_9_16", "Portrait 9:16 layout option"),
    ]
    
    results = {}
    
    for key, description in coords_to_find:
        input(f"\nMove mouse to: {description}\nThen press ENTER...")
        x, y = pyautogui.position()
        results[key] = (x, y)
        print(f"  → Saved: {key} = ({x}, {y})")
    
    print("\n" + "="*60)
    print("CALIBRATION COMPLETE!")
    print("="*60)
    print("\nCopy this into the COORDS dict in heygen_pyautogui.py:\n")
    print("COORDS = {")
    for key, (x, y) in results.items():
        print(f'    "{key}": ({x}, {y}),')
    print("}")
    
    # Save to file
    with open("coords.json", "w") as f:
        json.dump(results, f, indent=2)
    print("\nAlso saved to coords.json")
    
    return results


def load_coords():
    """Load coordinates from coords.json if it exists."""
    coords_file = Path("coords.json")
    if coords_file.exists():
        with open(coords_file) as f:
            loaded = json.load(f)
            # Convert lists to tuples
            return {k: tuple(v) for k, v in loaded.items()}
    return COORDS


def click(name, double=False):
    """Click at a named coordinate."""
    coords = load_coords()
    x, y = coords.get(name, COORDS.get(name))
    logger.info(f"{'Double-' if double else ''}Clicking {name} at ({x}, {y})")
    if double:
        pyautogui.doubleClick(x, y)
    else:
        pyautogui.click(x, y)
    time.sleep(0.5)


def type_text(text, paste=False):
    """Type text, optionally using paste for speed."""
    if paste:
        pyperclip.copy(text)
        pyautogui.hotkey('ctrl', 'v')
        time.sleep(0.3)
    else:
        # Clear existing text first
        pyautogui.hotkey('ctrl', 'a')
        time.sleep(0.1)
        pyautogui.typewrite(text, interval=0.02) if text.isascii() else pyautogui.write(text)
    time.sleep(0.3)


def paste_text(text):
    """Paste text using clipboard (faster, handles special chars)."""
    pyperclip.copy(text)
    pyautogui.hotkey('ctrl', 'v')
    time.sleep(0.5)


def create_video(title, script_text, avatar_name, background_name=None):
    """
    Create a single video in HeyGen AI Studio.
    Assumes the browser is already on the HeyGen editor page.
    """
    logger.info(f"\n{'='*60}")
    logger.info(f"Creating: {title}")
    logger.info(f"Avatar: {avatar_name}")
    logger.info(f"{'='*60}")
    
    # Step 1: Set title
    logger.info("[STEP 1] Setting title...")
    click("title")
    pyautogui.hotkey('ctrl', 'a')  # Select all
    time.sleep(0.2)
    paste_text(title)
    pyautogui.press('enter')
    time.sleep(0.5)
    
    # Step 2: Paste script
    logger.info("[STEP 2] Pasting script...")
    click("script")
    time.sleep(0.3)
    paste_text(script_text)
    time.sleep(1)
    
    # Step 3: Select avatar
    logger.info(f"[STEP 3] Selecting avatar: {avatar_name}...")
    click("avatar_preview")
    time.sleep(0.5)
    click("change_avatar")
    time.sleep(1)
    
    click("public_avatars")
    time.sleep(0.5)
    
    click("avatar_search")
    time.sleep(0.3)
    paste_text(avatar_name)
    time.sleep(1.5)  # Wait for search results
    
    click("avatar_result")  # Click avatar name
    time.sleep(1)
    
    click("outfit_thumbnail", double=True)  # Double-click outfit
    time.sleep(2)
    
    # Step 4: Set Motion Engine to Avatar III
    logger.info("[STEP 4] Setting Motion Engine to Avatar III...")
    click("motion_engine")
    time.sleep(0.5)
    click("avatar_iii")
    time.sleep(0.5)
    
    # Step 5: Set background
    if background_name:
        logger.info(f"[STEP 5] Setting background: {background_name}...")
        click("customize_bg")
        time.sleep(1)
        click("uploads_tab")
        time.sleep(1)
        click("first_upload", double=True)  # Double-click background
        time.sleep(1)
    
    # Step 6: Set layout to Portrait 9:16
    logger.info("[STEP 6] Setting layout to Portrait 9:16...")
    click("layouts_button")
    time.sleep(1)
    click("portrait_9_16")
    time.sleep(1)
    pyautogui.press('escape')  # Close panel
    time.sleep(0.5)
    
    # Save with Ctrl+S
    logger.info("[DONE] Saving draft...")
    pyautogui.hotkey('ctrl', 's')
    time.sleep(1)
    
    logger.info(f"[SUCCESS] Created: {title}")
    return True


def run_batch(limit=None):
    """Run batch creation of videos."""
    
    # Load video matrix
    matrix_file = Path("output/video_matrix.json")
    if not matrix_file.exists():
        logger.error("video_matrix.json not found!")
        return
    
    with open(matrix_file) as f:
        videos = json.load(f)
    
    if limit:
        videos = videos[:limit]
    
    logger.info(f"Creating {len(videos)} videos...")
    
    # Open browser with Playwright
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context(
            viewport={'width': 1920, 'height': 1080}
        )
        page = context.new_page()
        
        # Navigate to HeyGen
        page.goto("https://app.heygen.com/home")
        
        input("\n>>> Log in to HeyGen, then press ENTER to continue...")
        
        for i, video in enumerate(videos):
            logger.info(f"\n[{i+1}/{len(videos)}] Processing...")
            
            # Navigate to create new video
            page.goto("https://app.heygen.com/home")
            time.sleep(2)
            
            # Click Create → Create in AI Studio
            page.click('button:has-text("Create")')
            time.sleep(0.5)
            page.click('text="Create in AI studio"')
            time.sleep(5)  # Wait for editor to load
            
            # Load script
            script_file = Path(f"output/scripts_spoken/{video['script_file']}")
            if not script_file.exists():
                logger.error(f"Script not found: {script_file}")
                continue
            
            script_text = script_file.read_text()
            
            # Create the video using pyautogui
            create_video(
                title=video['title'],
                script_text=script_text,
                avatar_name=video['avatar'],
                background_name=video.get('background')
            )
            
            time.sleep(2)  # Pause between videos
        
        browser.close()
    
    logger.info("\n" + "="*60)
    logger.info("BATCH COMPLETE!")
    logger.info("="*60)


def test_single():
    """Test with a single video."""
    logger.info("Testing with one video...")
    
    # Load first video from matrix
    with open("output/video_matrix.json") as f:
        videos = json.load(f)
    
    video = videos[0]
    script_file = Path(f"output/scripts_spoken/{video['script_file']}")
    script_text = script_file.read_text()
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context(viewport={'width': 1920, 'height': 1080})
        page = context.new_page()
        
        page.goto("https://app.heygen.com/home")
        input("\n>>> Log in to HeyGen, then press ENTER...")
        
        # Create video
        page.click('button:has-text("Create")')
        time.sleep(0.5)
        page.click('text="Create in AI studio"')
        time.sleep(5)
        
        create_video(
            title=video['title'],
            script_text=script_text,
            avatar_name=video['avatar'],
            background_name=video.get('background')
        )
        
        input("\n>>> Check the result, then press ENTER to close...")
        browser.close()


if __name__ == "__main__":
    import sys
    
    if "--calibrate" in sys.argv:
        calibrate()
    elif "--test" in sys.argv:
        test_single()
    else:
        limit = None
        for arg in sys.argv[1:]:
            if arg.startswith("--limit="):
                limit = int(arg.split("=")[1])
        run_batch(limit=limit)
