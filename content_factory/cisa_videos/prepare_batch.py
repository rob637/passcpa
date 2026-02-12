#!/usr/bin/env python3
"""
Convert phase CSV files into video_matrix.json format with proper avatar rotation.

This creates:
1. output/video_matrix_new.json - with all videos and avatar/look assignments
2. output/scripts_spoken/*.txt - individual script files

Then you can run: python create_batch_drafts.py
"""

import os
import csv
import json
import re
import sys
import glob
from pathlib import Path

# Avatar rotation config - matches OUTFIT_COORDS in heygen_pyautogui.py
AVATAR_ROTATION = [
    {"id": "Freja", "looks": ["Freja Look 1", "Freja Look 2", "Freja Look 3", "Freja Look 4", "Freja Look 5"]},
    {"id": "Zosia", "looks": ["Zosia Look 1", "Zosia Look 2", "Zosia Look 3", "Zosia Look 4", "Zosia Look 5"]},
    {"id": "Esmond", "looks": ["Esmond Look 1", "Esmond Look 2", "Esmond Look 3", "Esmond Look 4"]},
    {"id": "Jinwoo", "looks": ["Jinwoo Look 1", "Jinwoo Look 2", "Jinwoo Look 3", "Jinwoo Look 4", "Jinwoo Look 5"]},
]

BACKGROUNDS = [
    "bg_corporate_blue.png",
    "bg_modern_teal.png", 
    "bg_slate_gray.png",
    "bg_executive_dark.png",
]

# CSV files in order
CSV_FILES = [
    "phase1_foundation.csv",
    "phase2_batch1.csv",
    "phase2_batch2.csv",
    "phase2_batch3.csv",
    "phase2_batch4.csv",
    "phase3_batch1.csv",
    "phase3_batch2.csv",
    "phase3_batch3.csv",
    "phase4_gaps.csv",  # Gap coverage videos
]

SCRIPT_DIR = Path(__file__).parent
OUTPUT_DIR = SCRIPT_DIR / "output"
SCRIPTS_DIR = OUTPUT_DIR / "scripts_spoken"


def sanitize_filename(title):
    """Convert title to safe filename."""
    # Remove special chars, replace spaces with underscores
    safe = re.sub(r'[^\w\s-]', '', title)
    safe = re.sub(r'\s+', '_', safe)
    return safe


def main():
    fresh_start = "--fresh" in sys.argv
    
    # Ensure directories exist
    OUTPUT_DIR.mkdir(exist_ok=True)
    SCRIPTS_DIR.mkdir(exist_ok=True)
    
    matrix_file = OUTPUT_DIR / "video_matrix.json"
    
    if fresh_start:
        # Clear existing scripts and start fresh
        print("=" * 60)
        print("FRESH START - Clearing existing videos and scripts")
        print("=" * 60)
        for old_script in SCRIPTS_DIR.glob("*.txt"):
            old_script.unlink()
        video_matrix = []
        video_num = 1
        avatar_idx = 0
        look_idx = 0
        bg_idx = 0
    elif matrix_file.exists():
        # Load existing to append
        with open(matrix_file, "r") as f:
            video_matrix = json.load(f)
        video_num = len(video_matrix) + 1
        print(f"Found {len(video_matrix)} existing videos, starting at #{video_num}")
        
        # Start avatar rotation from where we left off
        avatar_idx = (len(video_matrix)) % len(AVATAR_ROTATION)
        look_idx = (len(video_matrix)) // len(AVATAR_ROTATION)
        bg_idx = (len(video_matrix) // 4) % len(BACKGROUNDS)
    else:
        video_matrix = []
        video_num = 1
        avatar_idx = 0
        look_idx = 0
        bg_idx = 0
    
    for csv_file in CSV_FILES:
        csv_path = SCRIPT_DIR / csv_file
        if not csv_path.exists():
            print(f"[SKIP] {csv_file} not found")
            continue
        
        print(f"\nProcessing {csv_file}...")
        
        with open(csv_path, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                # Support both column name formats
                video_id = row.get("ID") or row.get("video_id") or f"VIDEO-{video_num:03d}"
                title = row.get("Title") or row.get("topic") or "Untitled"
                script = row.get("Script") or row.get("script") or ""
                duration = row.get("Duration") or row.get("duration") or "10"
                video_type = row.get("Type") or row.get("type") or "concept"
                
                # Get current avatar and look
                avatar = AVATAR_ROTATION[avatar_idx]
                avatar_id = avatar["id"]
                avatar_look = avatar["looks"][look_idx % len(avatar["looks"])]
                background = BACKGROUNDS[bg_idx]
                
                # Create script filename
                script_filename = f"{video_num:02d}_{sanitize_filename(title)}_spoken.txt"
                script_path = SCRIPTS_DIR / script_filename
                
                # Write script file
                script_path.write_text(script, encoding="utf-8")
                
                # Add to matrix
                video_matrix.append({
                    "num": video_num,
                    "id": video_id,
                    "topic": title,
                    "type": video_type,
                    "avatar_id": avatar_id,
                    "avatar_look": avatar_look,
                    "background": background,
                    "script": script_filename,
                    "words": len(script.split()),
                    "duration_min": round(len(script.split()) / 150, 1),
                })
                
                print(f"  {video_num:2}. {video_id}: {title[:40]}")
                print(f"      -> {avatar_id} ({avatar_look}) + {background}")
                
                video_num += 1
                
                # Rotate avatar (round-robin through all 4)
                avatar_idx = (avatar_idx + 1) % len(AVATAR_ROTATION)
                
                # Every 4 videos (one cycle through avatars), advance look and background
                if avatar_idx == 0:
                    look_idx += 1
                    bg_idx = (bg_idx + 1) % len(BACKGROUNDS)
    
    # Write video matrix
    matrix_file = OUTPUT_DIR / "video_matrix.json"
    with open(matrix_file, "w") as f:
        json.dump(video_matrix, f, indent=2)
    
    print(f"\n{'='*60}")
    print(f"Created {len(video_matrix)} video entries")
    print(f"Matrix saved to: {matrix_file}")
    print(f"Scripts saved to: {SCRIPTS_DIR}")
    print(f"\nTo create videos, run:")
    print(f"  python create_batch_drafts.py")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
