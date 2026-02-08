#!/usr/bin/env python3
"""
Generate backgrounds and prepare scripts for HeyGen manual bulk upload.
Downloads images locally so they don't expire.
"""

import os
import csv
import requests
from dotenv import load_dotenv

# Load environment
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY") or os.getenv("OPEN_API_KEY")

# Output directories
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), 'heygen_upload')
IMAGES_DIR = os.path.join(OUTPUT_DIR, 'backgrounds')
os.makedirs(IMAGES_DIR, exist_ok=True)

# Background prompts for each lesson
BACKGROUND_PROMPTS = {
    "SEE2-005": "A professional corporate presentation background with abstract blue and white geometric patterns. Subtle accounting imagery like faint dollar signs and charts. Clean, modern, 16:9 aspect ratio. No text.",
    "SEE2-006": "A warm professional presentation background with abstract geometric shapes in green and gold tones. Subtle partnership/handshake imagery. Clean modern style, 16:9. No text.",
    "SEE2-001": "A clean corporate presentation background with subtle checkbox and forms imagery. Blue and gray tones. Professional business style. 16:9 aspect ratio. No text.",
    "SEE2-012": "A professional presentation background with industrial machinery silhouettes and abstract financial elements. Orange and blue tones. Modern corporate style 16:9. No text.",
    "SEE2-015": "A sophisticated presentation background with subtle real estate imagery - building outlines and investment graphs. Purple and blue tones. Clean modern 16:9. No text.",
}

def generate_and_download_image(lesson_id, prompt):
    """Generate image via DALL-E and download locally."""
    print(f"🎨 Generating background for {lesson_id}...")
    
    if not OPENAI_API_KEY:
        print("   ⚠️ No OpenAI API key found!")
        return None
    
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "dall-e-3",
        "prompt": prompt,
        "n": 1,
        "size": "1792x1024",  # Landscape for video
        "quality": "standard",
        "response_format": "url"
    }
    
    try:
        response = requests.post(
            "https://api.openai.com/v1/images/generations",
            headers=headers,
            json=payload,
            timeout=120
        )
        response.raise_for_status()
        image_url = response.json()['data'][0]['url']
        
        # Download the image locally
        print(f"   📥 Downloading image...")
        img_response = requests.get(image_url, timeout=60)
        img_response.raise_for_status()
        
        local_path = os.path.join(IMAGES_DIR, f"{lesson_id}_background.png")
        with open(local_path, 'wb') as f:
            f.write(img_response.content)
        
        print(f"   ✅ Saved: {local_path}")
        return local_path
        
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return None

def main():
    print("=" * 60)
    print("🎬 HeyGen Manual Upload Preparation")
    print("=" * 60)
    
    # Read the CSV
    csv_path = os.path.join(os.path.dirname(__file__), 'sarah_batch_1.csv')
    lessons = []
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            lessons.append(row)
    
    print(f"\n📄 Found {len(lessons)} lessons to process\n")
    
    # Process each lesson
    scripts_output = []
    
    for i, lesson in enumerate(lessons, 1):
        lesson_id = lesson['Lesson ID']
        title = lesson['Lesson Title']
        script = lesson['Script']
        
        print(f"\n[{i}/{len(lessons)}] {lesson_id}: {title}")
        
        # Generate background image
        prompt = BACKGROUND_PROMPTS.get(lesson_id, "A clean professional corporate presentation background, blue gradient, no text")
        image_path = generate_and_download_image(lesson_id, prompt)
        
        # Store script info
        scripts_output.append({
            'number': i,
            'id': lesson_id,
            'title': title,
            'script': script,
            'background_file': os.path.basename(image_path) if image_path else "NOT GENERATED"
        })
    
    # Create scripts reference file
    scripts_file = os.path.join(OUTPUT_DIR, 'scripts_for_heygen.txt')
    with open(scripts_file, 'w', encoding='utf-8') as f:
        f.write("=" * 70 + "\n")
        f.write("HEYGEN BULK UPLOAD - SCRIPTS AND BACKGROUNDS\n")
        f.write("=" * 70 + "\n\n")
        f.write("INSTRUCTIONS:\n")
        f.write("1. In HeyGen, click '+' to add a new script for each lesson\n")
        f.write("2. Copy/paste the script below into each script box\n")
        f.write("3. Upload the matching background image from the 'backgrounds' folder\n")
        f.write("4. Select your preferred avatar (e.g., Freja)\n\n")
        f.write("=" * 70 + "\n\n")
        
        for item in scripts_output:
            f.write(f"SCRIPT {item['number']}: {item['id']} - {item['title']}\n")
            f.write(f"Background File: {item['background_file']}\n")
            f.write("-" * 70 + "\n")
            f.write(item['script'] + "\n")
            f.write("\n" + "=" * 70 + "\n\n")
    
    print("\n" + "=" * 60)
    print("✅ DONE! Files created:")
    print(f"   📁 {OUTPUT_DIR}/")
    print(f"   📄 scripts_for_heygen.txt (copy scripts from here)")
    print(f"   🖼️  backgrounds/ (upload these to HeyGen)")
    print("=" * 60)

if __name__ == "__main__":
    main()
