#!/usr/bin/env python3
"""
Proof of Concept: End-to-End Video Generation

This script proves the full pipeline:
1. Parse a lesson from VoraPrep
2. Generate slides (HTML)
3. Generate TTS script
4. Send to D-ID API → Get talking head video
5. (Optional) Composite avatar on slides

To run:
    export DID_API_KEY="your_api_key_here"
    python prove_concept.py

Get a D-ID API key (free trial with credits):
    https://studio.d-id.com/account

"""

import os
import sys
import time
import json
import base64
import requests
from pathlib import Path

# Add services to path
sys.path.insert(0, str(Path(__file__).parent))
from services.lesson_parser import LessonParser
from services.slide_generator import SlideGenerator
from services.script_generator import ScriptGenerator


def check_api_key():
    """Check if D-ID API key is set."""
    api_key = os.getenv('DID_API_KEY')
    if not api_key:
        print("""
╔═══════════════════════════════════════════════════════════════════╗
║  D-ID API Key Required                                            ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  1. Sign up at: https://studio.d-id.com                          ║
║  2. Get API key from: Settings → API Keys                        ║
║  3. Run:                                                          ║
║                                                                   ║
║     export DID_API_KEY="your_key_here"                           ║
║     python prove_concept.py                                       ║
║                                                                   ║
║  Free tier includes $5.00 credit (~3 minutes of video)           ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
        """)
        return None
    return api_key


def create_did_video(script: str, api_key: str) -> dict:
    """
    Create a talking head video using D-ID API.
    
    D-ID API flow:
    1. POST /talks → creates video job, returns talk_id
    2. Poll GET /talks/{id} until status="done"
    3. Download result_url
    """
    
    headers = {
        'Authorization': f'Basic {api_key}',
        'Content-Type': 'application/json'
    }
    
    # Use D-ID's built-in presenter (free, no image upload needed)
    # Amy is a professional-looking cartoon-style avatar
    payload = {
        'source_url': 'https://create-images-results.d-id.com/DefaultPresenters/Cassidy_f/thumbnail.jpeg',
        'script': {
            'type': 'text',
            'input': script[:1000],  # Limit for demo (D-ID has 1500 char limit per request)
            'provider': {
                'type': 'microsoft',
                'voice_id': 'en-US-JennyNeural'  # Natural female voice
            }
        },
        'config': {
            'stitch': True,
            'result_format': 'mp4'
        }
    }
    
    print("\n📤 Creating D-ID video...")
    print(f"   Script length: {len(script[:1000])} chars")
    
    # Step 1: Create the talk
    response = requests.post(
        'https://api.d-id.com/talks',
        headers=headers,
        json=payload
    )
    
    if response.status_code == 402:
        print("❌ Insufficient credits in D-ID account")
        return {'error': 'insufficient_credits'}
    
    if response.status_code != 201:
        print(f"❌ D-ID API error: {response.status_code}")
        print(f"   {response.text}")
        return {'error': response.text}
    
    result = response.json()
    talk_id = result['id']
    print(f"   Talk ID: {talk_id}")
    
    # Step 2: Poll for completion
    print("   Waiting for video generation", end='', flush=True)
    
    for i in range(60):  # Max 5 minutes
        time.sleep(5)
        print('.', end='', flush=True)
        
        status_response = requests.get(
            f'https://api.d-id.com/talks/{talk_id}',
            headers=headers
        )
        
        status = status_response.json()
        
        if status.get('status') == 'done':
            print(" ✅")
            return {
                'status': 'success',
                'video_url': status.get('result_url'),
                'duration': status.get('duration'),
                'talk_id': talk_id
            }
        
        if status.get('status') == 'error':
            print(" ❌")
            return {'error': status.get('error', 'Unknown error')}
    
    print(" ⏱️ Timeout")
    return {'error': 'timeout'}


def download_video(url: str, output_path: Path) -> bool:
    """Download video from URL."""
    print(f"\n📥 Downloading video to {output_path.name}...")
    
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        output_path.write_bytes(response.content)
        size_mb = output_path.stat().st_size / (1024 * 1024)
        print(f"   Saved: {output_path} ({size_mb:.2f} MB)")
        return True
    return False


def main():
    print("""
╔═══════════════════════════════════════════════════════════════════╗
║  VoraPrep Video Pipeline — Proof of Concept                       ║
║  Lesson → Slides → Script → Avatar Video                          ║
╚═══════════════════════════════════════════════════════════════════╝
    """)
    
    # Check API key
    api_key = check_api_key()
    if not api_key:
        # Run in demo mode without API
        print("\n🎬 Running in DEMO MODE (no video generation)")
        api_key = None
    
    # Config
    config = {
        'output_dir': Path(__file__).parent / 'output'
    }
    
    # Step 1: Parse a lesson
    print("\n[1/4] 📖 Parsing lesson...")
    parser = LessonParser(config)
    lesson = parser.parse('cpa', 'PREP-001')
    
    if not lesson:
        print("❌ Lesson not found")
        return
    
    print(f"   Title: {lesson['title']}")
    print(f"   Sections: {len(lesson.get('sections', []))}")
    
    # Step 2: Generate slides
    print("\n[2/4] 🎨 Generating slides...")
    slide_gen = SlideGenerator(config)
    slides_path = slide_gen.generate(lesson)
    print(f"   Saved: {slides_path}")
    
    # Step 3: Generate script
    print("\n[3/4] 📝 Generating TTS script...")
    script_gen = ScriptGenerator(config)
    script_path = script_gen.generate(lesson)
    print(f"   Saved: {script_path}")
    
    # Read the script
    script = script_path.read_text()
    
    # Show a preview
    print("\n   Script preview:")
    print("   " + "-" * 60)
    for line in script.split('\n')[:8]:
        print(f"   {line}")
    print("   ...")
    print("   " + "-" * 60)
    
    # Step 4: Generate video (if API key available)
    if api_key:
        print("\n[4/4] 🎬 Generating avatar video...")
        result = create_did_video(script, api_key)
        
        if result.get('status') == 'success':
            video_url = result['video_url']
            duration = result.get('duration', 'unknown')
            
            print(f"\n✅ Video generated successfully!")
            print(f"   Duration: {duration} seconds")
            print(f"   URL: {video_url}")
            
            # Download video
            output_dir = config['output_dir'] / 'videos'
            output_dir.mkdir(parents=True, exist_ok=True)
            video_path = output_dir / 'PREP-001_avatar.mp4'
            
            if download_video(video_url, video_path):
                print(f"\n🎉 PROOF OF CONCEPT COMPLETE!")
                print(f"\n   Video saved to: {video_path}")
                print(f"   Slides at: {slides_path}")
                print(f"\n   Next step: Composite avatar on slides using ffmpeg")
        else:
            print(f"\n❌ Video generation failed: {result.get('error')}")
    else:
        print("\n[4/4] 🎬 Skipping video generation (no API key)")
        print("\n📋 Demo complete! Here's what was generated:")
        print(f"   • Slides: {slides_path}")
        print(f"   • Script: {script_path}")
        print(f"\n   To generate actual video, get a D-ID API key and run:")
        print(f"   export DID_API_KEY='your_key'")
        print(f"   python prove_concept.py")
    
    # Summary
    print("\n" + "=" * 65)
    print("PIPELINE SUMMARY")
    print("=" * 65)
    print(f"""
    ✅ Lesson parsed:     {lesson['title'][:40]}...
    ✅ Slides generated:  {slides_path.name}
    ✅ Script generated:  {script_path.name}
    {"✅" if api_key else "⏭️ "} Avatar video:      {"Generated" if api_key else "Skipped (no API key)"}
    
    Cost estimate:
    • D-ID: ~$0.03/second = ~$1.80/minute of video
    • This script: {len(script)} chars ≈ {len(script)//150} seconds ≈ ${len(script)//150 * 0.03:.2f}
    
    For 1,121 lessons @ 2 min each ≈ $4,000 total
    For 1,121 lessons @ 30 sec "quick intro" ≈ $1,000 total
    """)


if __name__ == '__main__':
    main()
