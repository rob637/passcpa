#!/usr/bin/env python3
"""
Quick single video test - creates ONE video to verify the pipeline works.

Usage:
    python single_video_test.py

This script either:
1. Uses browser automation if available
2. Opens HeyGen in your browser for manual video creation
"""
import os
import sys
import webbrowser
from pathlib import Path

# Add parent for config
sys.path.insert(0, str(Path(__file__).parent))

SCRIPT_DIR = Path(__file__).parent / "output" / "scripts"
HEYGEN_URL = "https://app.heygen.com/projects"

def get_first_script():
    """Get the first available script."""
    scripts = list(SCRIPT_DIR.glob("*.txt"))
    if not scripts:
        print("❌ No scripts found in output/scripts/")
        print("   Run: python orchestrator.py --batch-size 1")
        return None
    return scripts[0]

def try_automation():
    """Attempt browser automation."""
    try:
        from heygen_automation import HeyGenAutomation
        print("🤖 Playwright available, attempting automation...")
        
        with HeyGenAutomation(headless=False) as heygen:
            script_file = get_first_script()
            if not script_file:
                return False
            
            script_text = script_file.read_text()
            title = script_file.stem.replace("_", " ")
            
            print(f"📄 Using script: {script_file.name}")
            print(f"📝 Title: {title}")
            
            video_id = heygen.create_video(
                title=title,
                script=script_text,
                avatar_id="Jin",  # Default avatar
                background_url=None  # Solid color
            )
            
            if video_id:
                print(f"✅ Video submitted! ID: {video_id}")
                print("⏳ Check HeyGen dashboard for progress...")
                return True
            
    except ImportError:
        print("⚠️  Playwright not available")
    except RuntimeError as e:
        print(f"⚠️  Automation failed: {e}")
    except Exception as e:
        print(f"⚠️  Error: {e}")
    
    return False

def manual_workflow():
    """Guide user through manual video creation."""
    script_file = get_first_script()
    if not script_file:
        return
    
    script_text = script_file.read_text()
    
    print("\n" + "=" * 60)
    print("MANUAL VIDEO CREATION")
    print("=" * 60)
    print()
    print("Since automation isn't working, follow these steps:")
    print()
    print("1. Opening HeyGen in your browser...")
    webbrowser.open(HEYGEN_URL)
    
    print()
    print("2. In HeyGen:")
    print("   - Click 'Create' → 'Video'")
    print("   - Select Avatar: Bruce, Jin, or Sarah")
    print("   - Click 'Edit script'")
    print()
    
    print("3. COPY THIS SCRIPT (between the lines):")
    print("-" * 60)
    print(script_text[:2000])  # First 2000 chars
    if len(script_text) > 2000:
        print(f"\n... [{len(script_text) - 2000} more characters in file]")
    print("-" * 60)
    print()
    print(f"Full script file: {script_file}")
    print()
    print("4. Paste into HeyGen, click 'Submit'")
    print("5. Wait 5-10 minutes for video to render")
    print()
    print("Once video completes, you'll have proof the pipeline works!")

def main():
    print("🎬 Single Video Test")
    print()
    
    # Check for scripts
    if not SCRIPT_DIR.exists():
        SCRIPT_DIR.mkdir(parents=True)
    
    scripts = list(SCRIPT_DIR.glob("*.txt"))
    if not scripts:
        print("No scripts found. Generating one...")
        os.system("python generate_scripts.py --count 1")
        scripts = list(SCRIPT_DIR.glob("*.txt"))
    
    print(f"📁 Found {len(scripts)} script(s)")
    
    # Try automation first
    if try_automation():
        return
    
    # Fall back to manual
    manual_workflow()

if __name__ == "__main__":
    main()
