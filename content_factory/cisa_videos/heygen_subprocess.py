#!/usr/bin/env python3
"""
HeyGen Subprocess Wrapper

Runs HeyGen automation in a subprocess to avoid asyncio conflicts with Python 3.14+.
This script is called by the orchestrator to perform HeyGen operations.

Usage:
    python heygen_subprocess.py create <script_file> <background_file> <avatar_id> <title>
    python heygen_subprocess.py status <video_id>
    python heygen_subprocess.py download <video_id> <output_file>
"""
import sys
import json
import argparse


def create_video(script_file: str, background_file: str, avatar_id: str, title: str) -> dict:
    """Create a video in HeyGen."""
    from heygen_automation import HeyGenAutomation
    
    try:
        with HeyGenAutomation() as heygen:
            video_id = heygen.create_video(
                script_file=script_file,
                background_file=background_file,
                avatar_id=avatar_id,
                title=title
            )
        return {"success": True, "video_id": video_id}
    except Exception as e:
        return {"success": False, "error": str(e)}


def check_status(video_id: str) -> dict:
    """Check video status in HeyGen."""
    from heygen_automation import HeyGenAutomation
    
    try:
        with HeyGenAutomation() as heygen:
            status, download_url = heygen.check_video_status(video_id)
        return {"success": True, "status": status, "download_url": download_url}
    except Exception as e:
        return {"success": False, "error": str(e)}


def download_video(video_id: str, output_file: str) -> dict:
    """Download completed video."""
    from heygen_automation import HeyGenAutomation
    
    try:
        with HeyGenAutomation() as heygen:
            heygen.download_video(video_id, output_file)
        return {"success": True, "file": output_file}
    except Exception as e:
        return {"success": False, "error": str(e)}


def main():
    parser = argparse.ArgumentParser(description="HeyGen subprocess wrapper")
    subparsers = parser.add_subparsers(dest="command", required=True)
    
    # Create command
    create_parser = subparsers.add_parser("create", help="Create a video")
    create_parser.add_argument("script_file", help="Path to script file")
    create_parser.add_argument("background_file", help="Path to background image")
    create_parser.add_argument("avatar_id", help="Avatar ID")
    create_parser.add_argument("title", help="Video title")
    
    # Status command
    status_parser = subparsers.add_parser("status", help="Check video status")
    status_parser.add_argument("video_id", help="HeyGen video ID")
    
    # Download command
    download_parser = subparsers.add_parser("download", help="Download video")
    download_parser.add_argument("video_id", help="HeyGen video ID")
    download_parser.add_argument("output_file", help="Output file path")
    
    args = parser.parse_args()
    
    if args.command == "create":
        result = create_video(args.script_file, args.background_file, args.avatar_id, args.title)
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
