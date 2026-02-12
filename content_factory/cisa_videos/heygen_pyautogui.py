#!/usr/bin/env python3
"""
HeyGen Automation using PyAutoGUI for reliable clicking/typing.
Uses webbrowser to open Chrome, pyautogui handles UI interactions.

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
import subprocess
import webbrowser
import logging
from pathlib import Path

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
    
    # First uploaded background (row 1, col 1 - dark navy)
    "bg_row1_col1": (1147, 383),
    
    # Row 1, Col 2 - gray gradient
    "bg_row1_col2": (1232, 383),
    
    # Row 1, Col 3 - teal
    "bg_row1_col3": (1317, 383),
    
    # Row 2, Col 1 - corporate blue
    "bg_row2_col1": (1147, 468),
    
    # Layout button (right sidebar, "Layouts" icon)
    "layouts_button": (1269, 480),
    
    # Portrait 9:16 option
    "portrait_9_16": (1100, 200),
    
    # Generate button (top right, green button)
    "generate_button": (1380, 62),
    
    # Title field in generate dialog (shows "Untitled Video")
    "generate_title": (700, 300),
    
    # Submit button (in generate dialog)
    "submit_button": (1380, 500),
}


def calibrate_quick():
    """Quick recalibration for specific elements (5-second countdown)."""
    print("\n" + "="*60)
    print("QUICK RECALIBRATION: Background Elements")
    print("="*60)
    print("\nYou have 8 seconds per element. Watch the live cursor position.")
    print("The script will AUTO-CLICK between steps to open panels.\n")
    
    # Load existing coords
    coords_file = Path("coords.json")
    if coords_file.exists():
        with open(coords_file) as f:
            results = json.load(f)
    else:
        results = {}
    
    # Step 1: Customize button
    print("\n" + "-"*40)
    print("STEP 1: CUSTOMIZE BUTTON")
    print("-"*40)
    print("Look at RIGHT panel > 'Avatar Background' section")
    print("Point at 'Customize' (paint brush icon)")
    print("\nMove mouse there NOW! 8 seconds...")
    for i in range(8, 0, -1):
        x, y = pyautogui.position()
        print(f"  {i}... (cursor at {x}, {y})", flush=True)
        time.sleep(1)
    x, y = pyautogui.position()
    results["customize_bg"] = [x, y]
    print(f"  ✓ Saved: customize_bg = ({x}, {y})")
    
    # Auto-click to open the panel
    print("\n>>> Auto-clicking Customize to open panel...")
    pyautogui.click(x, y)
    time.sleep(2)  # Wait for panel to open
    
    # Step 2: Uploads tab
    print("\n" + "-"*40)
    print("STEP 2: UPLOADS TAB")
    print("-"*40)
    print("Panel should be open with tabs: [All] [AI Generated] [Uploads]")
    print("Point at 'Uploads' tab")
    print("\nMove mouse there NOW! 8 seconds...")
    for i in range(8, 0, -1):
        x, y = pyautogui.position()
        print(f"  {i}... (cursor at {x}, {y})", flush=True)
        time.sleep(1)
    x, y = pyautogui.position()
    results["uploads_tab"] = [x, y]
    print(f"  ✓ Saved: uploads_tab = ({x}, {y})")
    
    # Auto-click Uploads tab
    print("\n>>> Auto-clicking Uploads tab...")
    pyautogui.click(x, y)
    time.sleep(2)  # Wait for uploads to load
    
    # Step 3-6: Background grid
    bg_items = [
        ("bg_row1_col1", "TOP-LEFT (DARK NAVY)"),
        ("bg_row1_col2", "TOP-MIDDLE (GRAY)"),  
        ("bg_row1_col3", "TOP-RIGHT (TEAL)"),
        ("bg_row2_col1", "2ND ROW LEFT (BLUE GRADIENT)"),
    ]
    
    for i, (key, desc) in enumerate(bg_items, 3):
        print(f"\n" + "-"*40)
        print(f"STEP {i}: {desc}")
        print("-"*40)
        print(f"Point at the {desc} thumbnail")
        print(f"\nMove mouse there NOW! 8 seconds...")
        for j in range(8, 0, -1):
            x, y = pyautogui.position()
            print(f"  {j}... (cursor at {x}, {y})", flush=True)
            time.sleep(1)
        x, y = pyautogui.position()
        results[key] = [x, y]
        print(f"  ✓ Saved: {key} = ({x}, {y})")
    
    with open("coords.json", "w") as f:
        json.dump(results, f, indent=2)
    
    print("\n✓ Updated coords.json with new title & script positions")
    return results


def calibrate():
    """Interactive calibration to find coordinates using countdown timer."""
    print("\n" + "="*60)
    print("CALIBRATION MODE")
    print("="*60)
    print("\nI'll guide you through finding the coordinates.")
    print("For each element:")
    print("  1. Read what to find")
    print("  2. Move your mouse to that element")
    print("  3. Hold still - position captured after 3 seconds")
    print("\nPress Ctrl+C to exit at any time.\n")
    
    coords_to_find = [
        ("script", "the SCRIPT text area (left panel) - click INSIDE the text box"),
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
        ("bg_row1_col1", "BACKGROUND Row 1 Col 1 - DARK NAVY (top-left)"),
        ("bg_row1_col2", "BACKGROUND Row 1 Col 2 - GRAY (top-middle)"),
        ("bg_row1_col3", "BACKGROUND Row 1 Col 3 - TEAL (top-right)"),
        ("bg_row2_col1", "BACKGROUND Row 2 Col 1 - BLUE (second row, left)"),
        ("layouts_button", "'Layouts' icon in right sidebar"),
        ("portrait_9_16", "Portrait 9:16 layout option"),
        ("generate_button", "the green 'Generate' button (top right)"),
        ("generate_title", "TITLE field in generate dialog - click on 'Untitled Video' text"),
        ("submit_button", "the 'Submit' button in the generate dialog"),
    ]
    
    results = {}
    
    for key, description in coords_to_find:
        print(f"\nNext: {description}")
        print("Move your mouse there now...")
        
        # Countdown - automatically starts (5 seconds)
        for i in range(5, 0, -1):
            print(f"  {i}...", end=" ", flush=True)
            time.sleep(1)
        
        x, y = pyautogui.position()
        results[key] = (x, y)
        print(f"\n  ✓ Saved: {key} = ({x}, {y})")
    
    print("\n" + "="*60)
    print("CALIBRATION COMPLETE!")
    print("="*60)
    print("\nCoordinates saved to coords.json")
    
    # Save to file
    with open("coords.json", "w") as f:
        json.dump(results, f, indent=2)
    
    # Print for reference
    print("\nYour coordinates:")
    for key, (x, y) in results.items():
        print(f"  {key}: ({x}, {y})")
    
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


# Set to True to show mouse movement before clicking
DEBUG_CLICKS = True


def click(name, double=False):
    """Click at a named coordinate."""
    coords = load_coords()
    coord = coords.get(name) or COORDS.get(name)
    if coord is None:
        logger.error(f"  ERROR: No coordinates found for '{name}'! Check coords.json or run --remap")
        return
    x, y = coord
    logger.info(f"{'Double-' if double else ''}Clicking {name} at ({x}, {y})")
    
    if DEBUG_CLICKS:
        # Move mouse to position first so user can see where it will click
        pyautogui.moveTo(x, y, duration=0.3)
        time.sleep(0.5)  # Pause so user can see the position
    
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


# Background name to coordinate key (based on 3-column grid in Uploads)
# Row 1: executive_dark, slate_gray, modern_teal
# Row 2: corporate_blue, ...
BACKGROUND_COORDS = {
    "bg_executive_dark.png": "bg_row1_col1",   # Dark navy (top-left)
    "bg_slate_gray.png": "bg_row1_col2",        # Gray gradient (top-middle)
    "bg_modern_teal.png": "bg_row1_col3",       # Teal (top-right)
    "bg_corporate_blue.png": "bg_row2_col1",    # Blue gradient (row 2, left)
}


def create_video(title, script_text, avatar_name, avatar_look=None, background_name=None):
    """
    Create a single video in HeyGen AI Studio.
    Assumes the browser is already on the HeyGen editor page.
    """
    logger.info(f"\n{'='*60}")
    logger.info(f"Creating: {title}")
    logger.info(f"Avatar: {avatar_name} ({avatar_look})")
    logger.info(f"Background: {background_name}")
    logger.info(f"{'='*60}")
    
    coords = load_coords()
    
    # Step 1: Paste script
    logger.info("[STEP 1] Pasting script...")
    x, y = coords.get("script", COORDS.get("script"))
    logger.info(f"  Script field coords: ({x}, {y})")
    if DEBUG_CLICKS:
        pyautogui.moveTo(x, y, duration=0.3)
        time.sleep(0.5)
    pyautogui.tripleClick(x, y)  # Triple-click to select all in script area
    time.sleep(0.3)
    pyautogui.hotkey('ctrl', 'a')  # Also Ctrl+A to be sure
    time.sleep(0.2)
    paste_text(script_text)
    time.sleep(1)
    
    # Step 2: Select avatar
    logger.info(f"[STEP 2] Selecting avatar: {avatar_name}...")
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
    
    click("avatar_result")  # Click avatar name to expand outfits
    time.sleep(1.5)
    
    # Double-click first outfit  
    click("outfit_thumbnail", double=True)
    time.sleep(2)
    
    # Step 3: Set Motion Engine to Avatar III
    logger.info("[STEP 3] Setting Motion Engine to Avatar III...")
    coords = load_coords()
    
    # Click the motion engine dropdown
    x, y = coords.get("motion_engine", COORDS.get("motion_engine"))
    logger.info(f"  Motion engine coords: ({x}, {y})")
    if DEBUG_CLICKS:
        pyautogui.moveTo(x, y, duration=0.3)
        time.sleep(0.5)
    pyautogui.click(x, y)
    time.sleep(1)
    
    # Click Avatar III option directly
    x3, y3 = coords.get("avatar_iii", COORDS.get("avatar_iii"))
    logger.info(f"  Clicking avatar_iii at ({x3}, {y3})")
    if DEBUG_CLICKS:
        pyautogui.moveTo(x3, y3, duration=0.3)
        time.sleep(0.5)
    pyautogui.click(x3, y3)
    time.sleep(1)
    
    # Close any panel that might be open before background selection
    pyautogui.press('escape')
    time.sleep(0.5)
    
    # Step 4: Set background
    if background_name:
        logger.info(f"[STEP 4] Setting background: {background_name}...")
        click("customize_bg")
        time.sleep(1.5)  # Wait for panel to open
        click("uploads_tab")
        time.sleep(1.5)  # Wait for uploads to load
        
        # Get background coordinate key
        bg_coord_key = BACKGROUND_COORDS.get(background_name, "bg_row1_col1")
        logger.info(f"  Background file: {background_name}")
        logger.info(f"  Mapped to coord key: {bg_coord_key}")
        
        # Get actual coordinates
        coord = coords.get(bg_coord_key) or COORDS.get(bg_coord_key)
        if coord:
            logger.info(f"  Coordinates: {coord}")
        else:
            logger.error(f"  ERROR: No coordinates for {bg_coord_key}!")
        
        # Double-click the specific background
        click(bg_coord_key, double=True)
        time.sleep(1.5)
    
    # Step 5: Set layout to Portrait 9:16
    logger.info("[STEP 5] Setting layout to Portrait 9:16...")
    click("layouts_button")
    time.sleep(1)
    click("portrait_9_16")
    time.sleep(1)
    pyautogui.press('escape')  # Close panel
    time.sleep(0.5)
    
    # Step 6: Click Generate
    logger.info("[STEP 6] Clicking Generate...")
    click("generate_button")
    time.sleep(2)  # Wait for dialog
    
    # Step 7: Set title in generate dialog
    logger.info("[STEP 7] Setting title in dialog...")
    x, y = coords.get("generate_title", COORDS.get("generate_title"))
    logger.info(f"  Title field coords: ({x}, {y})")
    if DEBUG_CLICKS:
        pyautogui.moveTo(x, y, duration=0.3)
        time.sleep(0.5)
    pyautogui.tripleClick(x, y)  # Triple-click to select "Untitled Video"
    time.sleep(0.3)
    paste_text(title)
    time.sleep(0.5)
    
    # Step 8: Click Submit
    logger.info("[STEP 8] Clicking Submit...")
    click("submit_button")
    time.sleep(3)  # Wait for generation to start
    
    logger.info(f"[SUCCESS] Generated: {title}")
    return True


def open_heygen_editor():
    """Open HeyGen AI Studio in default browser."""
    # Open the create page directly - this should open AI Studio
    url = "https://app.heygen.com/create-v4/draft"
    webbrowser.open(url)
    logger.info(f"Opened: {url}")


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
    
    # Open browser to HeyGen
    open_heygen_editor()
    
    input("\n>>> Log in to HeyGen and wait for editor to load, then press ENTER...")
    
    for i, video in enumerate(videos):
        logger.info(f"\n[{i+1}/{len(videos)}] Processing...")
        
        # Load script
        script_file = Path(f"output/scripts_spoken/{video['script']}")
        if not script_file.exists():
            logger.error(f"Script not found: {script_file}")
            continue
        
        script_text = script_file.read_text()
        
        # Create the video using pyautogui
        create_video(
            title=video['topic'],
            script_text=script_text,
            avatar_name=video['avatar_id'],
            avatar_look=video.get('avatar_look'),
            background_name=video.get('background')
        )
        
        # Wait a bit, then open new editor for next video
        if i < len(videos) - 1:
            time.sleep(3)
            # Open new tab with new editor
            pyautogui.hotkey('ctrl', 't')  # New tab
            time.sleep(0.5)
            pyautogui.typewrite('https://app.heygen.com/create-v4/draft', interval=0.02)
            pyautogui.press('enter')
            time.sleep(5)  # Wait for editor to load
    
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
    script_file = Path(f"output/scripts_spoken/{video['script']}")
    script_text = script_file.read_text()
    
    # Open HeyGen in browser
    open_heygen_editor()
    
    input("\n>>> Log in to HeyGen and wait for editor to load, then press ENTER...")
    
    # Create video
    create_video(
        title=video['topic'],
        script_text=script_text,
        avatar_name=video['avatar_id'],
        avatar_look=video.get('avatar_look'),
        background_name=video.get('background')
    )
    
    logger.info("\n>>> Done! Check the result.")


if __name__ == "__main__":
    import sys
    
    if "--calibrate" in sys.argv:
        calibrate()
    elif "--remap" in sys.argv:
        calibrate_quick()
    elif "--test" in sys.argv:
        test_single()
    else:
        limit = None
        for arg in sys.argv[1:]:
            if arg.startswith("--limit="):
                limit = int(arg.split("=")[1])
        run_batch(limit=limit)
