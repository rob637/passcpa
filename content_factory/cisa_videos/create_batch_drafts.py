"""
Create all 30 CISA video drafts in HeyGen.

Usage:
    python create_batch_drafts.py                  # Create all 30 drafts
    python create_batch_drafts.py --limit 5        # Create first 5 only
    python create_batch_drafts.py --start 10       # Start from video 10
"""
import argparse
import json
from pathlib import Path

from heygen_automation_v2 import HeyGenAutomationV2

def load_video_matrix():
    """Load the video matrix with avatar/background assignments."""
    matrix_file = Path(__file__).parent / "output" / "video_matrix.json"
    
    if not matrix_file.exists():
        raise FileNotFoundError(f"Video matrix not found: {matrix_file}")
    
    with open(matrix_file) as f:
        return json.load(f)

def load_script(script_file: str) -> str:
    """Load script content from file."""
    scripts_dir = Path(__file__).parent / "output" / "scripts_spoken"
    script_path = scripts_dir / script_file
    
    if not script_path.exists():
        raise FileNotFoundError(f"Script not found: {script_path}")
    
    return script_path.read_text(encoding='utf-8')

def main():
    parser = argparse.ArgumentParser(description='Create CISA video drafts in HeyGen')
    parser.add_argument('--limit', type=int, help='Max number of videos to create')
    parser.add_argument('--start', type=int, default=1, help='Start from video number (1-indexed)')
    parser.add_argument('--headless', action='store_true', help='Run in headless mode (not recommended)')
    args = parser.parse_args()
    
    # Load video matrix
    print("Loading video matrix...")
    matrix = load_video_matrix()
    
    # Filter by start/limit
    start_idx = args.start - 1  # Convert to 0-indexed
    videos = matrix[start_idx:]
    if args.limit:
        videos = videos[:args.limit]
    
    print(f"\nWill create {len(videos)} video drafts (starting from #{args.start})")
    print("-" * 60)
    
    # Prepare video data
    video_data = []
    for v in videos:
        script_file = v['script']
        try:
            script_text = load_script(script_file)
        except FileNotFoundError as e:
            print(f"[SKIP] {e}")
            continue
        
        video_data.append({
            'script_text': script_text,
            'title': f"CISA - {v['topic']}",
            'avatar_name': v['avatar_id'],
            'background_name': v['background'].replace('.png', ''),
        })
        print(f"  {v['num']:2}. {v['topic']} -> {v['avatar_id']} + {v['background']}")
    
    print("-" * 60)
    print(f"\nReady to create {len(video_data)} drafts.")
    
    # Start automation - browser opens first so you can log in
    automation = HeyGenAutomationV2(headless=args.headless)
    
    try:
        automation.start()
        
        # Navigate to HeyGen so user can log in
        automation.page.goto("https://app.heygen.com/home")
        
        print("\n" + "=" * 60)
        print("Browser opened and navigated to HeyGen!")
        print("Please log in if prompted.")
        print("=" * 60)
        input("\nPress Enter when you're logged in and on the HeyGen home page...")
        
        automation.create_batch_drafts(video_data)
        
        print("\n" + "=" * 60)
        print("DONE! All drafts created.")
        print("Go to HeyGen Projects to review and generate videos.")
        print("=" * 60)
        
        input("\nPress Enter to close browser...")
        
    finally:
        automation.stop()


if __name__ == "__main__":
    main()
