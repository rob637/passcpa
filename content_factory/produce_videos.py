import os
import json
import time
import requests
from dotenv import load_dotenv

# Load environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path) # Try loading from root if running from subdir
load_dotenv() # Fallback to default behavior

# CONFIGURATION
# ------------------------------------------------------------------------------
# Get these IDs from your HeyGen API Dashboard
# If not provided in .env, the script will attempt to fetch the first available ones.
AVATAR_ID = os.getenv("HEYGEN_AVATAR_ID")
VOICE_ID = os.getenv("HEYGEN_VOICE_ID")

# API KEYS
# Fallback for common typo "OPEN_API_KEY"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY") or os.getenv("OPEN_API_KEY")
HEYGEN_API_KEY = os.getenv("HEYGEN_API_KEY")

CHECK_INTERVAL = 30  # Seconds to wait between status checks

def get_default_avatar_and_voice():
    """Fetches a default avatar and voice if not specified in .env"""
    if not HEYGEN_API_KEY:
        return "default_avatar", "default_voice"
    
    headers = {"X-Api-Key": HEYGEN_API_KEY}
    
    # 1. Fetch Avatars
    print("   🔎 Fetching available avatars...")
    try:
        # v2 API list avatars
        resp = requests.get("https://api.heygen.com/v2/avatars", headers=headers)
        if resp.status_code == 200:
            avatars = resp.json().get('data', {}).get('avatars', [])
            if avatars:
                # Pick the first one that is a "public" avatar (usually safer)
                selected_avatar = next((a['avatar_id'] for a in avatars if a.get('availability') == 'public'), avatars[0]['avatar_id'])
                print(f"      Selected Avatar ID: {selected_avatar}")
            else:
                print("      ⚠️ No avatars found.")
                selected_avatar = "default_avatar"
        else:
            print(f"      ⚠️ Failed to fetch avatars: {resp.text}")
            selected_avatar = "default_avatar"
    except Exception as e:
        print(f"      ⚠️ Error fetching avatars: {e}")
        selected_avatar = "default_avatar"

    # 2. Fetch Voices
    print("   🔎 Fetching available voices...")
    try:
        # v2 API list voices (using v1 endpoint usually works better for simple lists, but let's try standard)
        # Note: HeyGen API for voices can be specific. Let's assume a safe default if this fails.
        # Often 'en-US-JennyNeural' or similar exists. But let's try a fetch.
        # Using a known reliable ID if fetch fails is safer for a demo.
        # "131a436c47064f708d745a782e5668d2" is often a generic ID, but let's try to find one.
        resp = requests.get("https://api.heygen.com/v2/voices?language=en", headers=headers)
        if resp.status_code == 200:
            voices = resp.json().get('data', {}).get('voices', [])
            if voices:
                 selected_voice = voices[0]['voice_id']
                 print(f"      Selected Voice ID: {selected_voice}")
            else: 
                 selected_voice = "2d5b0e6cf361460aa7fc47e3eee4ba54" # A fallback ID
        else:
            selected_voice = "2d5b0e6cf361460aa7fc47e3eee4ba54" # Fallback
    except:
        selected_voice = "2d5b0e6cf361460aa7fc47e3eee4ba54"

    return selected_avatar, selected_voice

def generate_image_dalle(prompt, title):
    """
    Calls OpenAI DALL-E 3 to generate a slide background.
    """
    print(f"🎨 Generating visual for '{title}'...")
    print(f"   Prompt: {prompt[:60]}...")
    
    if not OPENAI_API_KEY:
        print("   ⚠️ SKIPPING: No OpenAI API Key found.")
        return "https://placehold.co/1920x1080?text=Slide+Placeholder"

    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "dall-e-3",
        "prompt": prompt,
        "n": 1,
        "size": "1024x1024",
        "quality": "standard",
        "response_format": "url"
    }
    
    try:
        response = requests.post("https://api.openai.com/v1/images/generations", headers=headers, json=payload)
        response.raise_for_status()
        url = response.json()['data'][0]['url']
        print("   ✅ Image Generated!")
        return url
    except Exception as e:
        print(f"   ❌ Error generating image: {e}")
        return "https://placehold.co/1920x1080?text=Error+Generating+Image"

def create_heygen_video(script, bg_image_url):
    """
    Submits a video generation job to HeyGen.
    """
    print(f"🎬 Submitting video job to HeyGen...")
    
    if not HEYGEN_API_KEY:
        print("   ⚠️ SKIPPING: No HeyGen API Key found.")
        return None

    url = "https://api.heygen.com/v2/video/generate"
    headers = {
        "X-Api-Key": HEYGEN_API_KEY,
        "Content-Type": "application/json"
    }
    
    # Constructing the HeyGen Payload (simplified for v2)
    payload = {
        "video_inputs": [
            {
                "character": {
                    "type": "avatar",
                    "avatar_id": AVATAR_ID,
                    "scale": 1.0,
                    "avatar_style": "normal"
                },
                "voice": {
                    "type": "text",
                    "voice_id": VOICE_ID,
                    "input_text": script
                },
                "background": {
                    "type": "image",
                    "url": bg_image_url
                }
            }
        ],
        "test": False, # Production Mode active
        "dimension": {
            "width": 1280,
            "height": 720
        }
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()
        video_id = data['data']['video_id']
        print(f"   ✅ Job Submitted! Video ID: {video_id}")
        return video_id
    except Exception as e:
        print(f"   ❌ Error submitting to HeyGen: {e}")
        if hasattr(e, 'response') and e.response is not None:
             print(f"      Response: {e.response.text}")
        return None

def check_video_status(video_id):
    """
    Polls HeyGen for video completion.
    """
    url = f"https://api.heygen.com/v1/video_status.get?video_id={video_id}"
    headers = {"X-Api-Key": HEYGEN_API_KEY}
    
    try:
        response = requests.get(url, headers=headers)
        data = response.json()
        
        if response.status_code != 200:
             print(f"   ⚠️ Status Check HTTP Error: {response.text}")
             return "error"

        status_data = data.get('data', {})
        if not status_data:
             print(f"   ⚠️ Unexpected Status Response: {data}")
             return "error"

        status = status_data.get('status')
        error = status_data.get('error')
        
        if status == 'completed':
            return status_data.get('video_url')
        elif status == 'failed':
            print(f"   ❌ Video generation failed. Reason: {error}")
            return "failed"
        else:
            return "processing"
            
    except Exception as e:
        print(f"   ⚠️ Error checking status: {e}")
        return "error"

def main():
    print("🚀 STARTING CONTENT FACTORY WORKFLOW")
    print("------------------------------------")
    
    # 0. Setup Assets
    global AVATAR_ID, VOICE_ID
    if not AVATAR_ID or not VOICE_ID:
        print("⚙️  Avatar/Voice IDs not in .env. Auto-selecting...")
        AVATAR_ID, VOICE_ID = get_default_avatar_and_voice()
        if AVATAR_ID == "default_avatar":
             # Still default? That means API keys might be wrong or network failed.
             pass

    # 1. Load the Manifest
    manifest_path = os.path.join(os.path.dirname(__file__), 'ea_batch1_manifest.json')
    if not os.path.exists(manifest_path):
        print(f"❌ Error: Manifest file not found at {manifest_path}")
        return

    with open(manifest_path, 'r') as f:
        lessons = json.load(f)
    
    completed_videos = []

    # 2. Loop through each lesson
    # USER REQUEST: Only process 1 video for quality check
    lessons = lessons[:1]
    
    for lesson in lessons:
        # TRUNCATE SCRIPT FOR TRIAL (Save Credits)
        # Limit to ~1 minute (approx 900 chars)
        original_script = lesson['script_full']
        lesson['script_full'] = original_script[:900]
        print(f"\n📄 Processing: {lesson['id']} - {lesson['title']}")
        print(f"   ✂️  Script truncated to 900 chars (approx 1 min) to conserve credits.")
        
        # Step A: Generate Visuals (Just doing the first one as a background for now to save tokens)
        first_prompt = lesson['visual_generation_prompts'][0]['dalle_prompt']
        bg_image_url = generate_image_dalle(first_prompt, lesson['title'])
        
        # Step B: Create Video
        # Note: We pass the full script. 
        # In a V2, we would split the script and match images to timestamps.
        video_id = create_heygen_video(lesson['script_full'], bg_image_url)
        
        if video_id:
            lesson['video_id'] = video_id
            lesson['status'] = 'processing'
            completed_videos.append(lesson)
        else:
            print("   ⚠️ Creating mock entry for demo purposes...")
            lesson['video_url'] = "https://mock_video_url.mp4"
            
    # 3. Poll for Completion (Video Rendering takes time)
    if not HEYGEN_API_KEY:
        print("\n🏁 DONE (Dry Run Mode). keys not present.")
        print("To run for real, add keys to .env file.")
        return

    print(f"\n⏳ Polling for completion (Checking every {CHECK_INTERVAL}s)...")
    
    pending = len(completed_videos)
    while pending > 0:
        for vid in completed_videos:
            if vid.get('status') == 'processing':
                url = check_video_status(vid['video_id'])
                if url not in ['processing', 'error', 'failed']:
                    print(f"   🎉 VIDEO READY: {vid['title']}")
                    print(f"      URL: {url}")
                    vid['video_url'] = url
                    vid['status'] = 'completed'
                    pending -= 1
        
        if pending > 0:
            time.sleep(CHECK_INTERVAL)

    # 4. Save Results
    with open('ea_batch1_results.json', 'w') as f:
        json.dump(completed_videos, f, indent=2)
    print("\n✅ All jobs finished. Results saved to 'ea_batch1_results.json'.")

if __name__ == "__main__":
    main()
