#!/usr/bin/env python3
"""
CISA Video Generation Runner
Processes all CISA video CSV files through HeyGen automation.

Uses the established avatar/background pool from config.py:
- 4 Avatars: Freja (Sarah), Zosia (Emma), Jinwoo (James), Esmond (Marcus)
- 4 Backgrounds: Corporate blue, modern teal, slate gray, executive dark

Usage:
    python run_cisa_batch.py [--phase PHASE] [--batch BATCH] [--all] [--status]

Examples:
    python run_cisa_batch.py --status                 # Check what's ready
    python run_cisa_batch.py --dry-run --all          # Preview without running
    python run_cisa_batch.py --all                    # Generate everything
    python run_cisa_batch.py --phase 1                # Run Phase 1 only
"""

import os
import sys
import csv
import time
import json
import random
import argparse
from pathlib import Path
from datetime import datetime

# Add parent to path for config import
sys.path.insert(0, str(Path(__file__).parent))

from config import AVATARS, BACKGROUNDS, get_random_combo

# Configuration
SCRIPT_DIR = Path(__file__).parent
OUTPUT_DIR = SCRIPT_DIR / "output"
LOG_DIR = SCRIPT_DIR / "logs"
STATUS_FILE = SCRIPT_DIR / "batch_status.json"

# CSV files in processing order
CSV_FILES = {
    "phase1": ["phase1_foundation.csv"],
    "phase2": [
        "phase2_batch1.csv",
        "phase2_batch2.csv",
        "phase2_batch3.csv",
        "phase2_batch4.csv",
    ],
    "phase3": [
        "phase3_batch1.csv",
        "phase3_batch2.csv",
        "phase3_batch3.csv",
    ],
}


def ensure_dirs():
    """Create output and log directories if they don't exist."""
    OUTPUT_DIR.mkdir(exist_ok=True)
    LOG_DIR.mkdir(exist_ok=True)


def load_csv(csv_path):
    """Load and validate a CSV file."""
    videos = []
    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            videos.append(row)
    return videos


def count_videos():
    """Count total videos across all CSVs."""
    total = 0
    by_phase = {}
    
    for phase, files in CSV_FILES.items():
        phase_count = 0
        for csv_file in files:
            csv_path = SCRIPT_DIR / csv_file
            if csv_path.exists():
                videos = load_csv(csv_path)
                phase_count += len(videos)
        by_phase[phase] = phase_count
        total += phase_count
    
    return total, by_phase


def estimate_duration():
    """Estimate total production time."""
    total_videos, _ = count_videos()
    # HeyGen takes ~3-5 minutes per video for generation
    minutes_per_video = 5
    total_minutes = total_videos * minutes_per_video
    hours = total_minutes // 60
    minutes = total_minutes % 60
    return f"{hours}h {minutes}m"


def get_batch_files(phase=None, batch=None):
    """Get list of CSV files to process based on arguments."""
    files = []
    
    if phase is None:
        # All phases
        for phase_files in CSV_FILES.values():
            files.extend(phase_files)
    else:
        phase_key = f"phase{phase}"
        if phase_key not in CSV_FILES:
            print(f"Error: Phase {phase} not found")
            sys.exit(1)
        
        phase_files = CSV_FILES[phase_key]
        
        if batch is None:
            # All batches in phase
            files.extend(phase_files)
        else:
            if batch > len(phase_files):
                print(f"Error: Batch {batch} not found in Phase {phase}")
                sys.exit(1)
            files.append(phase_files[batch - 1])
    
    return files


def prepare_video_for_heygen(row):
    """
    Convert a CSV row to HeyGen-ready dict with random avatar/background.
    
    Input CSV: ID, Title, Avatar (ignored), Voice (ignored), Duration, Type, Script
    Output: Dict with script_text, title, avatar_id, avatar_look, background_name
    """
    # Get random combo from our pool
    combo = get_random_combo()
    avatar = combo["avatar"]
    background = combo["background"]
    
    return {
        "id": row.get("ID", ""),
        "title": row.get("Title", ""),
        "script_text": row.get("Script", ""),
        "avatar_id": avatar["id"],       # e.g., "Freja"
        "avatar_name": avatar["name"],   # e.g., "Sarah"
        "avatar_look": avatar["look"],   # e.g., "Freja Front"
        "background_name": background,    # e.g., "bg_corporate_blue.png"
        "duration": row.get("Duration", "10"),
        "type": row.get("Type", "concept"),
    }


def run_single_video(video_data, automation, dry_run=False):
    """Run HeyGen automation for a single video."""
    if dry_run:
        print(f"    [DRY] {video_data['id']}: {video_data['title']}")
        print(f"          Avatar: {video_data['avatar_name']} ({video_data['avatar_look']})")
        print(f"          Background: {video_data['background_name']}")
        return True
    
    try:
        success = automation.create_video_draft(
            script_text=video_data["script_text"],
            title=f"{video_data['id']} - {video_data['title']}",
            avatar_name=video_data["avatar_id"],
            background_name=video_data["background_name"],
            save_draft=False  # Generate immediately
        )
        return success
    except Exception as e:
        print(f"    [ERROR] {video_data['id']}: {e}")
        return False


def run_batch(csv_file, dry_run=False, automation=None):
    """Run HeyGen automation for a single CSV file."""
    csv_path = SCRIPT_DIR / csv_file
    if not csv_path.exists():
        print(f"  [SKIP] {csv_file} - File not found")
        return False, 0, 0
    
    videos = load_csv(csv_path)
    print(f"  [INFO] {csv_file} - {len(videos)} videos")
    
    if dry_run:
        print(f"  [DRY RUN] Would process:")
        for row in videos:
            video_data = prepare_video_for_heygen(row)
            run_single_video(video_data, None, dry_run=True)
        return True, len(videos), 0
    
    # Process each video
    successful = 0
    failed = 0
    
    for i, row in enumerate(videos, 1):
        video_data = prepare_video_for_heygen(row)
        print(f"  [{i}/{len(videos)}] {video_data['id']}: {video_data['title']}")
        print(f"           Avatar: {video_data['avatar_name']} | BG: {video_data['background_name']}")
        
        success = run_single_video(video_data, automation, dry_run=False)
        
        if success:
            successful += 1
        else:
            failed += 1
        
        # Brief pause between videos
        if i < len(videos):
            time.sleep(5)
    
    return True, successful, failed


def show_status():
    """Show status of all batches."""
    print("\n" + "=" * 60)
    print("CISA Video Production Status")
    print("=" * 60)
    
    total, by_phase = count_videos()
    
    print(f"\nTotal Videos: {total}")
    print(f"Estimated Duration: {estimate_duration()}")
    print()
    
    print("Avatar Pool:")
    for avatar in AVATARS:
        print(f"  - {avatar['name']} ({avatar['id']}) - {avatar['look']}")
    print()
    
    print("Background Pool:")
    for bg in BACKGROUNDS:
        print(f"  - {bg}")
    print()
    
    for phase, files in CSV_FILES.items():
        phase_num = phase[-1]
        print(f"Phase {phase_num}: {by_phase[phase]} videos")
        for csv_file in files:
            csv_path = SCRIPT_DIR / csv_file
            if csv_path.exists():
                videos = load_csv(csv_path)
                status = "✓ Ready"
            else:
                videos = []
                status = "✗ Missing"
            print(f"  - {csv_file}: {len(videos)} videos [{status}]")
        print()
    
    # Check for completed videos in output
    if OUTPUT_DIR.exists():
        completed = list(OUTPUT_DIR.glob("*.mp4"))
        print(f"Completed Videos: {len(completed)}")
    else:
        print("Completed Videos: 0 (output directory not found)")
    
    print("=" * 60)


def main():
    parser = argparse.ArgumentParser(description="CISA Video Generation Runner")
    parser.add_argument("--phase", type=int, choices=[1, 2, 3], help="Process specific phase")
    parser.add_argument("--batch", type=int, help="Process specific batch within phase")
    parser.add_argument("--all", action="store_true", help="Process all phases")
    parser.add_argument("--status", action="store_true", help="Show batch status")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be processed")
    
    args = parser.parse_args()
    
    ensure_dirs()
    
    if args.status:
        show_status()
        return
    
    if not args.all and args.phase is None:
        parser.print_help()
        print("\nUse --status to see current batch status")
        return
    
    # Get files to process
    phase = None if args.all else args.phase
    files = get_batch_files(phase=phase, batch=args.batch)
    
    print("\n" + "=" * 60)
    print("CISA Video Generation")
    print("=" * 60)
    print(f"\nBatches to process: {len(files)}")
    
    if args.dry_run:
        print("\n[DRY RUN MODE - No videos will be generated]\n")
    else:
        print(f"\nStarting at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"Output directory: {OUTPUT_DIR}")
        print()
    
    # Initialize automation if not dry run
    automation = None
    if not args.dry_run:
        try:
            from heygen_automation_v2 import HeyGenAutomationV2
            automation = HeyGenAutomationV2(headless=False)
            automation.start()
            automation.ensure_logged_in()
            print("[OK] HeyGen automation started\n")
        except Exception as e:
            print(f"[ERROR] Failed to start HeyGen automation: {e}")
            sys.exit(1)
    
    # Process each batch
    total_success = 0
    total_failed = 0
    
    try:
        for csv_file in files:
            print(f"\n{'='*50}")
            print(f"Processing: {csv_file}")
            print(f"{'='*50}")
            
            success, batch_success, batch_failed = run_batch(
                csv_file, 
                dry_run=args.dry_run,
                automation=automation
            )
            
            total_success += batch_success
            total_failed += batch_failed
            
            # Pause between batches
            if not args.dry_run and csv_file != files[-1]:
                print("  [PAUSE] Waiting 30 seconds before next batch...")
                time.sleep(30)
    
    finally:
        if automation:
            automation.stop()
    
    print()
    print("=" * 60)
    print(f"Complete: {total_success} videos succeeded, {total_failed} failed")
    print(f"Finished at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)


if __name__ == "__main__":
    main()
