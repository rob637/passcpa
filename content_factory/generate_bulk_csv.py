import os
import json
import csv
import requests
from dotenv import load_dotenv

# Load environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)
load_dotenv() 

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def generate_image_dalle(prompt, title):
    print(f"🎨 Generating visual for '{title}'...")
    
    if not OPENAI_API_KEY:
        print("   ⚠️ SKIPPING: No OpenAI API Key found.")
        return "https://placehold.co/1920x1080?text=Background+Placeholder"

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
        return "https://placehold.co/1920x1080?text=Error"

def main():
    print("🚀 GENERATING BULK IMPORT CSV")
    print("-----------------------------")
    
    # Load the manifest
    manifest_path = os.path.join(os.path.dirname(__file__), 'ea_batch1_manifest.json')
    with open(manifest_path, 'r') as f:
        lessons = json.load(f)
        
    # Output CSV path
    csv_path = os.path.join(os.path.dirname(__file__), 'sarah_batch_1.csv')
    
    with open(csv_path, 'w', newline='', encoding='utf-8') as csvfile:
        # HeyGen Bulk Create typically expects specific headers. 
        # We will map variables: 'Script' and 'Background'
        fieldnames = ['Lesson ID', 'Lesson Title', 'Script', 'Background Image']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        
        writer.writeheader()
        
        for lesson in lessons:
            print(f"\nProcessing: {lesson['title']}")
            
            # Generate the background image
            prompt = lesson['visual_generation_prompts'][0]['dalle_prompt']
            image_url = generate_image_dalle(prompt, lesson['title'])
            
            # Write row
            writer.writerow({
                'Lesson ID': lesson['id'],
                'Lesson Title': lesson['title'],
                'Script': lesson['script_full'], # Using full script
                'Background Image': image_url
            })
            
    print(f"\n✅ CSV Generated: {csv_path}")

if __name__ == "__main__":
    main()
