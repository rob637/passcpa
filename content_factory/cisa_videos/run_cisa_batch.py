#!/usr/bin/env python3
"""
CISA Video Generation Runner
Processes all CISA video CSV files through HeyGen automation.

Usage:
    python run_cisa_batch.py [--phase PHASE] [--batch BATCH] [--all] [--status]

Examples:
    python run_cisa_batch.py --all                 # Run all phases
    python run_cisa_batch.py --phase 1             # Run Phase 1 only
    python run_cisa_batch.py --phase 2 --batch 1   # Run Phase 2 Batch 1 only
    python run_cisa_batch.py --status              # Check status of all batches
"""

import os
import sys
import csv
import time
import argparse
import subprocess
from pathlib import Path
from datetime import datetime

# Configuration
SCRIPT_DIR = Path(__file__).parent
HEYGEN_SCRIPT = SCRIPT_DIR / "heygen_automation_v2.py"
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
    # Plus ~1 minute for upload/processing overhead
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


def run_batch(csv_file, dry_run=False):
    """Run HeyGen automation for a single CSV file."""
    csv_path = SCRIPT_DIR / csv_file
    if not csv_path.exists():
        print(f"  [SKIP] {csv_file} - File not found")
        return False
    
    videos = load_csv(csv_path)
    print(f"  [INFO] {csv_file} - {len(videos)} videos")
    
    if dry_run:
        return True
    
    # Create log file for this batch
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    log_file = LOG_DIR / f"{csv_file.replace('.csv', '')}_{timestamp}.log"
    
    # Run HeyGen automation
    cmd = [
        sys.executable,
        str(HEYGEN_SCRIPT),
        "--csv", str(csv_path),
        "--output", str(OUTPUT_DIR),
    ]
    
    print(f"  [RUN] Starting batch: {csv_file}")
    try:
        with open(log_file, "w") as log:
            result = subprocess.run(
                cmd,
                stdout=log,
                stderr=subprocess.STDOUT,
                cwd=SCRIPT_DIR.parent,
            )
        
        if result.returncode == 0:
            print(f"  [OK] Completed: {csv_file}")
            return True
        else:
            print(f"  [ERROR] Failed: {csv_file} (see {log_file})")
            return False
            
    except Exception as e:
        print(f"  [ERROR] Exception running {csv_file}: {e}")
        return False


def show_status():
    """Show status of all batches."""
    print("\n" + "=" * 60)
    print("CISA Video Production Status")
    print("=" * 60)
    
    total, by_phase = count_videos()
    
    print(f"\nTotal Videos: {total}")
    print(f"Estimated Duration: {estimate_duration()}")
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
    
    # Process each batch
    successful = 0
    failed = 0
    
    for csv_file in files:
        success = run_batch(csv_file, dry_run=args.dry_run)
        if success:
            successful += 1
        else:
            failed += 1
        
        # Brief pause between batches
        if not args.dry_run and csv_file != files[-1]:
            print("  [PAUSE] Waiting 30 seconds before next batch...")
            time.sleep(30)
    
    print()
    print("=" * 60)
    print(f"Complete: {successful} batches succeeded, {failed} failed")
    print(f"Finished at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)


if __name__ == "__main__":
    main()
