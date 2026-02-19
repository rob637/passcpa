#!/usr/bin/env python3
"""
VoraPrep Bot Services Runner

Runs both the Discord quiz bot and the Reddit/HN/SE opportunity monitor
as concurrent processes. Designed for deployment on Railway, Fly.io, or any VPS.

Usage:
    python runner.py              # Run both services
    python runner.py --bot-only   # Discord bot only
    python runner.py --monitor-only  # Monitor only
"""

import subprocess
import sys
import os
import signal
import time
import argparse

# Directories — works both locally and in Docker
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

# In Docker: /app/discord_bots, /app/reddit_monitor
# Locally:   scripts/discord_bots, scripts/reddit_monitor
if os.path.exists(os.path.join(SCRIPT_DIR, "discord_bots")):
    # Docker layout (/app/runner.py, /app/discord_bots/, /app/reddit_monitor/)
    BOT_DIR = os.path.join(SCRIPT_DIR, "discord_bots")
    MONITOR_DIR = os.path.join(SCRIPT_DIR, "reddit_monitor")
else:
    # Local layout (scripts/deploy/runner.py, scripts/discord_bots/, scripts/reddit_monitor/)
    BOT_DIR = os.path.join(os.path.dirname(SCRIPT_DIR), "discord_bots")
    MONITOR_DIR = os.path.join(os.path.dirname(SCRIPT_DIR), "reddit_monitor")

processes = []


def signal_handler(signum, frame):
    """Clean shutdown of all child processes."""
    print(f"\n🛑 Received signal {signum}, shutting down...")
    for name, proc in processes:
        if proc.poll() is None:
            print(f"   Stopping {name} (PID {proc.pid})...")
            proc.terminate()
    # Give them 5 seconds to clean up
    time.sleep(2)
    for name, proc in processes:
        if proc.poll() is None:
            print(f"   Force-killing {name}...")
            proc.kill()
    sys.exit(0)


def start_discord_bot():
    """Start the multi-exam Discord quiz bot."""
    print("🤖 Starting Discord Quiz Bot...")
    env = os.environ.copy()
    proc = subprocess.Popen(
        [sys.executable, "multi_exam_bot.py"],
        cwd=BOT_DIR,
        env=env,
        stdout=sys.stdout,
        stderr=sys.stderr,
    )
    processes.append(("Discord Bot", proc))
    print(f"   ✅ Discord Bot started (PID {proc.pid})")
    return proc


def start_monitor():
    """Start the Reddit/HN/SE opportunity monitor."""
    print("📡 Starting Opportunity Monitor...")
    env = os.environ.copy()
    proc = subprocess.Popen(
        [sys.executable, "reddit_opportunity_finder.py", "--daemon", "--interval", "60"],
        cwd=MONITOR_DIR,
        env=env,
        stdout=sys.stdout,
        stderr=sys.stderr,
    )
    processes.append(("Opportunity Monitor", proc))
    print(f"   ✅ Monitor started (PID {proc.pid})")
    return proc


def monitor_processes():
    """Watch child processes, restart if they crash."""
    restart_delay = 30  # seconds between restart attempts
    max_restarts = 5
    restart_counts = {}

    while True:
        for i, (name, proc) in enumerate(processes):
            exit_code = proc.poll()
            if exit_code is not None:
                count = restart_counts.get(name, 0)
                if count >= max_restarts:
                    print(f"❌ {name} has crashed {max_restarts} times. Giving up.")
                    continue

                print(f"⚠️  {name} exited with code {exit_code}. Restarting in {restart_delay}s... (attempt {count + 1}/{max_restarts})")
                time.sleep(restart_delay)

                if "Discord" in name:
                    new_proc = subprocess.Popen(
                        [sys.executable, "multi_exam_bot.py"],
                        cwd=BOT_DIR,
                        env=os.environ.copy(),
                        stdout=sys.stdout,
                        stderr=sys.stderr,
                    )
                else:
                    new_proc = subprocess.Popen(
                        [sys.executable, "reddit_opportunity_finder.py", "--daemon", "--interval", "60"],
                        cwd=MONITOR_DIR,
                        env=os.environ.copy(),
                        stdout=sys.stdout,
                        stderr=sys.stderr,
                    )

                processes[i] = (name, new_proc)
                restart_counts[name] = count + 1
                print(f"   🔄 {name} restarted (PID {new_proc.pid})")

        time.sleep(10)  # Check every 10 seconds


def main():
    parser = argparse.ArgumentParser(description="VoraPrep Bot Services Runner")
    parser.add_argument("--bot-only", action="store_true", help="Run Discord bot only")
    parser.add_argument("--monitor-only", action="store_true", help="Run monitor only")
    args = parser.parse_args()

    # Register signal handlers for clean shutdown
    signal.signal(signal.SIGTERM, signal_handler)
    signal.signal(signal.SIGINT, signal_handler)

    print("=" * 60)
    print("🚀 VoraPrep Bot Services")
    print("=" * 60)

    # Validate environment
    missing = []
    if not args.monitor_only:
        if not os.getenv("DISCORD_BOT_TOKEN"):
            missing.append("DISCORD_BOT_TOKEN")
    if not args.bot_only:
        if not os.getenv("GEMINI_API_KEY") and not os.getenv("VITE_GEMINI_API_KEY"):
            print("   ⚠️  No GEMINI_API_KEY — AI responses will be disabled")
        if not os.getenv("RESEND_API_KEY"):
            print("   ⚠️  No RESEND_API_KEY — email notifications will be disabled")

    if missing:
        print(f"❌ Missing required env vars: {', '.join(missing)}")
        sys.exit(1)

    # Start services
    if not args.monitor_only:
        start_discord_bot()
    if not args.bot_only:
        start_monitor()

    if not processes:
        print("❌ No services to run!")
        sys.exit(1)

    print(f"\n{'=' * 60}")
    print(f"   Running {len(processes)} service(s). Press Ctrl+C to stop.")
    print(f"{'=' * 60}\n")

    # Monitor and auto-restart
    try:
        monitor_processes()
    except KeyboardInterrupt:
        signal_handler(signal.SIGINT, None)


if __name__ == "__main__":
    main()
