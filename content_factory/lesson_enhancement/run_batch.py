#!/usr/bin/env python3
"""
VoraPrep Lesson Enhancement - Batch Runner
==========================================
Run the full enhancement pipeline in the background.

This script:
1. Enhances all lessons with interactive elements using Gemini
2. Logs progress to a file for monitoring
3. Can be resumed if interrupted

Usage:
    # Run in background (nohup)
    nohup python run_batch.py --section FAR > enhancement.log 2>&1 &

    # Run all sections in background
    nohup python run_batch.py --all > enhancement.log 2>&1 &
    
    # Check progress
    python run_batch.py --status

    # Resume after interruption
    python run_batch.py --resume
"""

import os
import sys
import json
import argparse
import subprocess
from pathlib import Path
from datetime import datetime

# ============================================================================
# Configuration
# ============================================================================

WORKSPACE_ROOT = Path(__file__).parent.parent.parent
OUTPUT_DIR = Path(__file__).parent / "output"
PROGRESS_FILE = OUTPUT_DIR / "progress.json"
LOG_FILE = OUTPUT_DIR / "enhancement.log"

SECTIONS = ["far", "aud", "reg", "bar", "isc", "tcp", "prep"]

# ============================================================================
# Status Dashboard
# ============================================================================

def show_status():
    """Display current enhancement progress."""
    print("\n" + "="*70)
    print("  VoraPrep Lesson Enhancement - Progress Dashboard")
    print("="*70)
    
    if not PROGRESS_FILE.exists():
        print("\n  No enhancement run started yet.")
        print("  Run: python run_batch.py --all")
        return
    
    progress = json.loads(PROGRESS_FILE.read_text())
    
    print(f"\n  Started: {progress.get('started_at', 'Unknown')}")
    print(f"  Currently Processing: {progress.get('in_progress', 'None')}")
    print()
    
    completed = progress.get('completed', [])
    failed = progress.get('failed', [])
    
    # Group by section
    section_stats = {}
    for section in SECTIONS:
        section_upper = section.upper()
        completed_in_section = [l for l in completed if l.startswith(section_upper)]
        failed_in_section = [l for l in failed if l.startswith(section_upper)]
        section_stats[section_upper] = {
            'completed': len(completed_in_section),
            'failed': len(failed_in_section)
        }
    
    # Display table
    print("  Section    | Completed | Failed  | Status")
    print("  " + "-"*50)
    for section, stats in section_stats.items():
        total = stats['completed'] + stats['failed']
        if total == 0:
            status = "⏳ Pending"
        elif stats['failed'] == 0:
            status = "✅ Done"
        else:
            status = "⚠️ Partial"
        print(f"  {section:<10} | {stats['completed']:<9} | {stats['failed']:<7} | {status}")
    
    print()
    print(f"  Total Completed: {len(completed)}")
    print(f"  Total Failed: {len(failed)}")
    
    # Show failed lessons
    if failed:
        print("\n  Failed Lessons:")
        for lesson in failed[:10]:
            print(f"    - {lesson}")
        if len(failed) > 10:
            print(f"    ... and {len(failed) - 10} more")
    
    # Check for enhanced files ready to merge
    enhanced_dir = OUTPUT_DIR / "enhanced"
    if enhanced_dir.exists():
        enhanced_files = list(enhanced_dir.rglob("*.json"))
        print(f"\n  📁 Enhanced files ready to merge: {len(enhanced_files)}")
        print("     Run: python merge_enhancements.py --all")
    
    print()

# ============================================================================
# Batch Processing
# ============================================================================

def run_enhancement(sections: list, resume: bool = False):
    """Run the enhancement script for specified sections."""
    enhance_script = Path(__file__).parent / "enhance_lessons.py"
    
    print("\n" + "="*70)
    print("  VoraPrep Lesson Enhancement - Starting Batch Run")
    print("="*70)
    print(f"\n  Sections to process: {', '.join(s.upper() for s in sections)}")
    print(f"  Resume mode: {'Yes' if resume else 'No'}")
    print(f"  Log file: {LOG_FILE.relative_to(WORKSPACE_ROOT)}")
    print()
    
    # Create output directory
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    for section in sections:
        print(f"\n{'='*60}")
        print(f"  Processing: {section.upper()}")
        print(f"{'='*60}")
        
        cmd = [
            sys.executable,
            str(enhance_script),
            "--section", section
        ]
        
        if resume:
            cmd.append("--resume")
        
        try:
            result = subprocess.run(
                cmd,
                cwd=str(Path(__file__).parent),
                capture_output=False,  # Let output flow to console/log
                text=True
            )
            
            if result.returncode != 0:
                print(f"  ⚠️  Section {section.upper()} completed with errors")
            else:
                print(f"  ✅ Section {section.upper()} completed successfully")
                
        except Exception as e:
            print(f"  ❌ Error processing {section.upper()}: {e}")
    
    print("\n" + "="*70)
    print("  BATCH RUN COMPLETE")
    print("="*70)
    print("\n  Next steps:")
    print("  1. Review generated files in: content_factory/lesson_enhancement/output/enhanced/")
    print("  2. Merge into lessons: python merge_enhancements.py --all --dry-run")
    print("  3. Apply changes: python merge_enhancements.py --all")
    print()

# ============================================================================
# CLI
# ============================================================================

def main():
    parser = argparse.ArgumentParser(description="VoraPrep Lesson Enhancement Batch Runner")
    parser.add_argument("--section", type=str, help="Section to process (FAR, AUD, REG, etc.)")
    parser.add_argument("--all", action="store_true", help="Process all sections")
    parser.add_argument("--resume", action="store_true", help="Resume from last checkpoint")
    parser.add_argument("--status", action="store_true", help="Show progress dashboard")
    
    args = parser.parse_args()
    
    if args.status:
        show_status()
    elif args.all:
        run_enhancement(SECTIONS, args.resume)
    elif args.section:
        run_enhancement([args.section.lower()], args.resume)
    else:
        parser.print_help()
        print("\nExamples:")
        print("  # Check progress")
        print("  python run_batch.py --status")
        print()
        print("  # Run in background for all sections")
        print("  nohup python run_batch.py --all > enhancement.log 2>&1 &")
        print()
        print("  # Run just FAR section")
        print("  python run_batch.py --section FAR")
        print()
        print("  # Resume after interruption")
        print("  python run_batch.py --all --resume")

if __name__ == "__main__":
    main()
