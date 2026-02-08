import os
import requests
import json
from dotenv import load_dotenv

# Load environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)
load_dotenv() 

HEYGEN_API_KEY = os.getenv("HEYGEN_API_KEY")
VIDEO_ID = "fb4259347cc346a9868a9f2a6c6db3ae"

if not HEYGEN_API_KEY:
    print("Error: HEYGEN_API_KEY not found")
    exit(1)

url = f"https://api.heygen.com/v1/video_status.get?video_id={VIDEO_ID}"
headers = {"X-Api-Key": HEYGEN_API_KEY}

import time

print(f"Checking status for Video ID: {VIDEO_ID}...")

while True:
    try:
        response = requests.get(url, headers=headers)
        data = response.json()
        status_data = data.get('data', {})
        status = status_data.get('status')
        
        print(f"Status: {status}")
        if status == 'completed':
            print(f"✅ Video URL: {status_data.get('video_url')}")
            break
        elif status == 'failed':
            print(f"❌ Error: {status_data.get('error')}")
            break
        
        time.sleep(30)
    except Exception as e:
        print(f"Exception: {e}")
        time.sleep(30)
