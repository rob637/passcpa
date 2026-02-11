#!/usr/bin/env python3
"""
Generate background images for CISA videos using DALL-E 3.
"""
import os
import json
import requests
from pathlib import Path
from config import (
    OPENAI_API_KEY,
    BACKGROUNDS_DIR,
    BACKGROUND_PROMPT_TEMPLATE
)

def generate_background(topic, domain_name, output_path):
    """Generate a background image using DALL-E 3."""
    
    prompt = BACKGROUND_PROMPT_TEMPLATE.format(
        topic=topic,
        domain_name=domain_name
    )
    
    if not OPENAI_API_KEY:
        print(f"  ⚠️ No OpenAI API key - skipping image generation")
        return None
    
    try:
        response = requests.post(
            "https://api.openai.com/v1/images/generations",
            headers={
                "Authorization": f"Bearer {OPENAI_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "dall-e-3",
                "prompt": prompt,
                "n": 1,
                "size": "1792x1024",  # Landscape for video
                "quality": "standard",
                "response_format": "url"
            },
            timeout=120
        )
        response.raise_for_status()
        
        image_url = response.json()['data'][0]['url']
        
        # Download the image
        img_response = requests.get(image_url, timeout=60)
        img_response.raise_for_status()
        
        with open(output_path, 'wb') as f:
            f.write(img_response.content)
        
        return output_path
        
    except Exception as e:
        print(f"  ❌ Error generating image: {e}")
        return None

def generate_backgrounds_for_scripts(manifest_file=None):
    """Generate backgrounds for all scripts in the manifest."""
    print("=" * 60)
    print("🎨 CISA Video Background Generator")
    print("=" * 60)
    
    # Load scripts manifest
    if manifest_file is None:
        manifest_file = Path(__file__).parent / "output" / "scripts_manifest.json"
    
    if not manifest_file.exists():
        print("❌ No scripts manifest found. Run generate_scripts.py first.")
        return []
    
    with open(manifest_file, 'r') as f:
        scripts = json.load(f)
    
    print(f"\n🎯 Generating backgrounds for {len(scripts)} videos\n")
    
    updated = []
    
    for i, script_data in enumerate(scripts, 1):
        topic = script_data['topic']
        safe_name = topic.replace(' ', '_').replace('/', '-')[:50]
        bg_file = Path(BACKGROUNDS_DIR) / f"{i:02d}_{safe_name}.png"
        
        print(f"[{i}/{len(scripts)}] {topic}")
        
        # Skip if already exists
        if bg_file.exists():
            print(f"  ⏭️ Background already exists, skipping")
            script_data['background_file'] = str(bg_file)
        else:
            result = generate_background(
                topic=topic,
                domain_name=script_data.get('domain_name', 'CISA Exam'),
                output_path=bg_file
            )
            
            if result:
                print(f"  ✅ Saved: {bg_file.name}")
                script_data['background_file'] = str(bg_file)
            else:
                print(f"  ❌ Failed to generate background")
                script_data['background_file'] = None
        
        updated.append(script_data)
    
    # Update manifest with background paths
    with open(manifest_file, 'w', encoding='utf-8') as f:
        json.dump(updated, f, indent=2)
    
    success_count = sum(1 for s in updated if s.get('background_file'))
    print(f"\n✅ Generated {success_count}/{len(updated)} backgrounds")
    
    return updated

if __name__ == "__main__":
    generate_backgrounds_for_scripts()
