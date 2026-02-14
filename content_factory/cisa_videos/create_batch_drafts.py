"""
CISA Video Batch Runner — PyAutoGUI backend with progress tracking.

Uses heygen_pyautogui.py to drive the real browser UI. Your mouse WILL be
in use while it runs, so kick it off when you can step away (lunch, overnight).
You can Ctrl+C to stop at any time — progress is saved after every video.

Usage:
    python create_batch_drafts.py                  # Start from beginning
    python create_batch_drafts.py --resume         # Pick up where you left off
    python create_batch_drafts.py --status         # See progress dashboard
    python create_batch_drafts.py --limit 10       # Only do next 10 videos
    python create_batch_drafts.py --start 25       # Start from video #25
    python create_batch_drafts.py --retry-failed   # Redo any that failed
    python create_batch_drafts.py --reset          # Wipe progress, start fresh

Workflow:
    1. Script opens HeyGen editor in your browser
    2. You log in manually (one time)
    3. Press ENTER and walk away
    4. Ctrl+C anytime to stop — progress is saved
    5. Run with --resume to continue later
"""
import argparse
import json
import time
import webbrowser
import logging
import sys
from pathlib import Path
from datetime import datetime

# Import the PyAutoGUI video creator
from heygen_pyautogui import create_video, open_heygen_editor, load_coords
import pyautogui

SCRIPT_DIR = Path(__file__).parent
OUTPUT_DIR = SCRIPT_DIR / "output"
PROGRESS_FILE = OUTPUT_DIR / "batch_progress.json"
LOG_FILE = OUTPUT_DIR / "batch_log.txt"


# ─── Logging ─────────────────────────────────────────────────
def setup_logging():
    """Dual logging: console (clean) + file (timestamped)."""
    root = logging.getLogger()
    root.setLevel(logging.INFO)
    # Clear existing handlers to avoid duplicates on resume
    root.handlers.clear()

    fh = logging.FileHandler(LOG_FILE, mode='a', encoding='utf-8')
    fh.setFormatter(logging.Formatter('%(asctime)s  %(message)s'))
    root.addHandler(fh)

    ch = logging.StreamHandler()
    ch.setFormatter(logging.Formatter('%(message)s'))
    root.addHandler(ch)


# ─── Progress ────────────────────────────────────────────────
def load_progress():
    if PROGRESS_FILE.exists():
        with open(PROGRESS_FILE) as f:
            return json.load(f)
    return {"completed": [], "failed": [], "started_at": None}


def save_progress(progress):
    with open(PROGRESS_FILE, 'w') as f:
        json.dump(progress, f, indent=2)


# ─── Video matrix / scripts ─────────────────────────────────
def load_video_matrix():
    matrix_file = OUTPUT_DIR / "video_matrix.json"
    if not matrix_file.exists():
        raise FileNotFoundError(f"video_matrix.json not found at {matrix_file}")
    with open(matrix_file) as f:
        return json.load(f)


def load_script(script_file: str) -> str:
    path = OUTPUT_DIR / "scripts_spoken" / script_file
    if not path.exists():
        raise FileNotFoundError(f"Script not found: {path}")
    return path.read_text(encoding='utf-8')


# ─── Status dashboard ───────────────────────────────────────
def show_status():
    matrix = load_video_matrix()
    progress = load_progress()
    completed = set(progress.get("completed", []))
    failed = set(progress.get("failed", []))
    remaining = [v for v in matrix if v['num'] not in completed and v['num'] not in failed]

    pct = len(completed) / len(matrix) * 100 if matrix else 0
    bar_len = 40
    filled = int(bar_len * len(completed) / len(matrix)) if matrix else 0
    bar = "█" * filled + "░" * (bar_len - filled)

    print(f"\n{'='*60}")
    print(f"  CISA Video Batch Progress")
    print(f"{'='*60}")
    print(f"  [{bar}] {pct:.0f}%")
    print(f"  Total:      {len(matrix)}")
    print(f"  Completed:  {len(completed)}")
    print(f"  Failed:     {len(failed)}")
    print(f"  Remaining:  {len(remaining)}")

    if progress.get("started_at"):
        print(f"  Started:    {progress['started_at']}")

    if completed:
        # Estimate time remaining
        elapsed = None
        if progress.get("started_at"):
            started = datetime.fromisoformat(progress["started_at"])
            elapsed = (datetime.now() - started).total_seconds()
            per_video = elapsed / len(completed)
            eta_sec = per_video * len(remaining)
            eta_h = int(eta_sec // 3600)
            eta_m = int((eta_sec % 3600) // 60)
            print(f"  Avg time:   {per_video:.0f}s per video")
            print(f"  ETA:        ~{eta_h}h {eta_m}m for remaining {len(remaining)}")

    if failed:
        print(f"\n  Failed videos:")
        for num in sorted(failed):
            v = next((x for x in matrix if x['num'] == num), None)
            name = v['topic'] if v else '???'
            print(f"    #{num:2}: {name}")

    if remaining:
        print(f"\n  Next up:")
        for v in remaining[:5]:
            print(f"    #{v['num']:2}: {v['topic'][:50]}")
        if len(remaining) > 5:
            print(f"    ... and {len(remaining) - 5} more")

    print(f"{'='*60}\n")


# ─── Main batch loop ────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(
        description='CISA video batch runner (PyAutoGUI + progress tracking)')
    parser.add_argument('--limit',        type=int, help='Max videos to create this run')
    parser.add_argument('--start',        type=int, default=1, help='Start from video number')
    parser.add_argument('--resume',       action='store_true', help='Resume from where you left off')
    parser.add_argument('--status',       action='store_true', help='Show progress dashboard')
    parser.add_argument('--retry-failed', action='store_true', help='Retry failed videos only')
    parser.add_argument('--reset',        action='store_true', help='Clear all progress')
    args = parser.parse_args()

    # ── Quick actions (no browser needed) ──
    if args.status:
        show_status()
        return

    if args.reset:
        if PROGRESS_FILE.exists():
            PROGRESS_FILE.unlink()
        print("Progress reset. Run again to start fresh.")
        return

    setup_logging()
    logger = logging.getLogger("batch")

    # ── Load data ──
    matrix = load_video_matrix()
    progress = load_progress()

    if not progress["started_at"]:
        progress["started_at"] = datetime.now().isoformat()

    completed = set(progress.get("completed", []))
    failed    = set(progress.get("failed", []))

    # ── Determine which videos to process ──
    if args.retry_failed:
        videos = [v for v in matrix if v['num'] in failed]
        # Clear them from failed so they get re-attempted
        for v in videos:
            failed.discard(v['num'])
        progress["failed"] = list(failed)
        save_progress(progress)
        logger.info(f"Retrying {len(videos)} previously failed videos...")
    elif args.resume:
        videos = [v for v in matrix if v['num'] not in completed and v['num'] not in failed]
        logger.info(f"Resuming: {len(completed)} done, {len(videos)} remaining")
    else:
        videos = [v for v in matrix if v['num'] >= args.start]
        videos = [v for v in videos if v['num'] not in completed]

    if args.limit:
        videos = videos[:args.limit]

    if not videos:
        print("Nothing to do — all videos completed (or none match criteria).")
        show_status()
        return

    # ── Show the plan ──
    print(f"\n{'='*60}")
    print(f"  Will create {len(videos)} video drafts")
    print(f"{'='*60}")
    for v in videos[:10]:
        print(f"  #{v['num']:2}  {v['topic'][:42]:42}  {v['avatar_id']} ({v.get('avatar_look','?')})")
    if len(videos) > 10:
        print(f"  ... and {len(videos) - 10} more")
    print(f"{'='*60}")
    print(f"\n  TIP: Ctrl+C to stop at any time — progress is saved.")
    print(f"       Then 'python create_batch_drafts.py --resume' to continue.\n")

    # ── Open HeyGen editor ──
    open_heygen_editor()
    input(">>> Log in to HeyGen, wait for the editor to load, then press ENTER... ")

    # Give the page time to settle
    time.sleep(3)

    # ── Process videos ──
    success_count = 0
    fail_count = 0

    try:
        for i, v in enumerate(videos, 1):
            num   = v['num']
            topic = v['topic']

            logger.info(f"\n{'─'*60}")
            logger.info(f"[{i}/{len(videos)}] #{num}: {topic}")
            logger.info(f"  Avatar: {v['avatar_id']} ({v.get('avatar_look')})")
            logger.info(f"  Background: {v['background']}")
            logger.info(f"{'─'*60}")

            # Load script text
            try:
                script_text = load_script(v['script'])
            except FileNotFoundError as e:
                logger.error(f"[SKIP] {e}")
                failed.add(num)
                progress["failed"] = list(failed)
                save_progress(progress)
                fail_count += 1
                continue

            # Create the video via PyAutoGUI
            try:
                create_video(
                    title=f"{num} - {topic}",
                    script_text=script_text,
                    avatar_name=v['avatar_id'],
                    avatar_look=v.get('avatar_look'),
                    background_name=v.get('background'),
                )
                success = True
            except Exception as e:
                logger.error(f"[ERROR] #{num}: {e}")
                success = False

            # Record result
            if success:
                success_count += 1
                completed.add(num)
                progress["completed"] = list(completed)
                logger.info(f"[OK] #{num} done  ({success_count} done, {len(videos) - i} left)")
            else:
                fail_count += 1
                failed.add(num)
                progress["failed"] = list(failed)
                logger.warning(f"[FAIL] #{num}  ({fail_count} failures)")

            # Save after EVERY video — safe to Ctrl+C between videos
            save_progress(progress)

            # Open new editor tab for next video
            if i < len(videos):
                logger.info("Opening new editor for next video...")
                pyautogui.hotkey('ctrl', 't')
                time.sleep(0.5)
                pyautogui.typewrite('https://app.heygen.com/create-v4/draft', interval=0.02)
                pyautogui.press('enter')
                time.sleep(5)  # Wait for editor to fully load

    except KeyboardInterrupt:
        logger.info(f"\n\n>>> Stopped by user (Ctrl+C)")
        logger.info(f">>> Progress saved: {success_count} completed this run")
        logger.info(f">>> Run 'python create_batch_drafts.py --resume' to continue\n")
        save_progress(progress)
        return

    # ── Final summary ──
    total_done = len(completed)
    logger.info(f"\n{'='*60}")
    logger.info(f"  BATCH COMPLETE")
    logger.info(f"  This run:   {success_count} success, {fail_count} failed")
    logger.info(f"  Overall:    {total_done} / {len(matrix)} videos done")
    logger.info(f"{'='*60}")

    if fail_count:
        logger.info(f"\n  To retry failed: python create_batch_drafts.py --retry-failed")
    if total_done < len(matrix):
        logger.info(f"  To continue:     python create_batch_drafts.py --resume")

    logger.info(f"\n  Full log: {LOG_FILE}")


if __name__ == "__main__":
    main()
