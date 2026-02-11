#!/usr/bin/env python3
"""
HeyGen Subprocess Wrapper

Runs HeyGen automation in a subprocess to avoid asyncio conflicts with Python 3.14+.
This script is called by the orchestrator to perform HeyGen operations.

Usage:
    python heygen_subprocess.py create <script_file> <background_file> <avatar_id> <title> [avatar_look]
    python heygen_subprocess.py status <video_id>
    python heygen_subprocess.py download <video_id> <output_file>
"""
import sys
import json
import argparse
import traceback


def create_video(script_file: str, background_file: str, avatar_id: str, title: str, avatar_look: str = None) -> dict:
    """Create a video in HeyGen."""
    from heygen_automation import HeyGenAutomation
    
    heygen = None
    try:
        # Use headless=False so browser is visible for debugging
        heygen = HeyGenAutomation(headless=False)
        heygen.start()
        video_id = heygen.create_video(
            script_file=script_file,
            background_file=background_file,
            avatar_id=avatar_id,
            title=title,
            avatar_look=avatar_look
        )
        if video_id:
            return {"success": True, "video_id": video_id}
        else:
            # Check for error screenshot
            import os
            from pathlib import Path
            output_dir = Path(__file__).parent / "output"
            screenshots = sorted(output_dir.glob("error_*.png"), reverse=True)
            hint = f"Check {screenshots[0]}" if screenshots else "No screenshot captured"
            return {"success": False, "error": f"create_video returned None. {hint}"}
    except Exception as e:
        return {"success": False, "error": str(e), "traceback": traceback.format_exc()}
    finally:
        if heygen:
            try:
                heygen.stop()
            except:
                pass


def check_status(video_id: str) -> dict:
    """Check video status in HeyGen."""
    from heygen_automation import HeyGenAutomation
    
    heygen = None
    try:
        heygen = HeyGenAutomation()
        heygen.start()
        status, download_url = heygen.check_video_status(video_id)
        return {"success": True, "status": status, "download_url": download_url}
    except Exception as e:
        return {"success": False, "error": str(e), "traceback": traceback.format_exc()}
    finally:
        if heygen:
            try:
                heygen.stop()
            except:
                pass


def download_video(video_id: str, output_file: str) -> dict:
    """Download completed video."""
    from heygen_automation import HeyGenAutomation
    
    heygen = None
    try:
        heygen = HeyGenAutomation()
        heygen.start()
        heygen.download_video(video_id, output_file)
        return {"success": True, "file": output_file}
    except Exception as e:
        return {"success": False, "error": str(e), "traceback": traceback.format_exc()}
    finally:
        if heygen:
            try:
                heygen.stop()
            except:
                pass


def main():
    parser = argparse.ArgumentParser(description="HeyGen subprocess wrapper")
    subparsers = parser.add_subparsers(dest="command", required=True)
    
    # Create command
    create_parser = subparsers.add_parser("create", help="Create a video")
    create_parser.add_argument("script_file", help="Path to script file")
    create_parser.add_argument("background_file", help="Path to background image")
    create_parser.add_argument("avatar_id", help="Avatar ID")
    create_parser.add_argument("title", help="Video title")
    create_parser.add_argument("avatar_look", nargs="?", default="", help="Avatar look/outfit name")
    
    # Status command
    status_parser = subparsers.add_parser("status", help="Check video status")
    status_parser.add_argument("video_id", help="HeyGen video ID")
    
    # Download command
    download_parser = subparsers.add_parser("download", help="Download video")
    download_parser.add_argument("video_id", help="HeyGen video ID")
    download_parser.add_argument("output_file", help="Output file path")
    
    args = parser.parse_args()
    
    if args.command == "create":
        avatar_look = args.avatar_look if args.avatar_look else None
        result = create_video(args.script_file, args.background_file, args.avatar_id, args.title, avatar_look)
    elif args.command == "status":
        result = check_status(args.video_id)
    elif args.command == "download":
        result = download_video(args.video_id, args.output_file)
    else:
        result = {"success": False, "error": f"Unknown command: {args.command}"}
    
    # Output JSON result
    print(json.dumps(result))


if __name__ == "__main__":
    main()
