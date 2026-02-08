#!/usr/bin/env python3
"""
List available HeyGen avatars to find the correct Avatar ID.
Run: python list_avatars.py
"""
import os
import requests
from dotenv import load_dotenv

# Load environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)
load_dotenv()

HEYGEN_API_KEY = os.getenv("HEYGEN_API_KEY")

if not HEYGEN_API_KEY:
    print("❌ Error: HEYGEN_API_KEY not found in .env")
    print("   Add your key to .env file first")
    exit(1)

headers = {"X-Api-Key": HEYGEN_API_KEY}

print("🔍 Fetching your HeyGen avatars...\n")

# Fetch avatars
resp = requests.get("https://api.heygen.com/v2/avatars", headers=headers)

if resp.status_code != 200:
    print(f"❌ API Error: {resp.status_code}")
    print(resp.text)
    exit(1)

data = resp.json()
avatars = data.get('data', {}).get('avatars', [])

print(f"Found {len(avatars)} avatars:\n")
print("-" * 80)

for i, avatar in enumerate(avatars, 1):
    avatar_id = avatar.get('avatar_id', 'N/A')
    avatar_name = avatar.get('avatar_name', 'Unnamed')
    availability = avatar.get('availability', 'unknown')
    gender = avatar.get('gender', 'unknown')
    
    print(f"{i}. {avatar_name}")
    print(f"   ID: {avatar_id}")
    print(f"   Type: {availability} | Gender: {gender}")
    print()

print("-" * 80)
print("\n📋 To use an avatar, add this to your .env file:")
print("   HEYGEN_AVATAR_ID=<avatar_id_from_above>")
