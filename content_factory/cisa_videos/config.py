"""
Configuration for CISA Video Pipeline
"""
import os
import random
from dotenv import load_dotenv

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '..', '.env'))
load_dotenv()

# API Keys
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GEMINI_API_KEY = os.getenv("VITE_GEMINI_API_KEY") or os.getenv("GEMINI_API_KEY")

# HeyGen Credentials (for browser automation)
HEYGEN_EMAIL = os.getenv("HEYGEN_EMAIL")
HEYGEN_PASSWORD = os.getenv("HEYGEN_PASSWORD")

# =============================================================================
# AVATAR POOL - 4 presenters (2 female, 2 male) with multiple outfits each
# HeyGen Avatar IDs with friendly display names and multiple outfits
# =============================================================================
AVATAR_CONFIGS = {
    "Freja": {
        "name": "Sarah",
        "gender": "female",
        "looks": ["Freja Look 1", "Freja Look 2", "Freja Look 3", "Freja Look 4", "Freja Look 5"]
    },
    "Zosia": {
        "name": "Emma",
        "gender": "female",
        "looks": ["Zosia Look 1", "Zosia Look 2", "Zosia Look 3", "Zosia Look 4", "Zosia Look 5"]
    },
    "Jinwoo": {
        "name": "James",
        "gender": "male",
        "looks": ["Jinwoo Look 1", "Jinwoo Look 2", "Jinwoo Look 3", "Jinwoo Look 4", "Jinwoo Look 5"]
    },
    "Esmond": {
        "name": "Marcus",
        "gender": "male",
        "looks": ["Esmond Look 1", "Esmond Look 2", "Esmond Look 3", "Esmond Look 4"]
    },
}

# Flat list for simple iteration (backwards compatible)
AVATARS = [
    {"id": avatar_id, "name": config["name"], "gender": config["gender"], "look": config["looks"][0]}
    for avatar_id, config in AVATAR_CONFIGS.items()
]

# =============================================================================
# BACKGROUND SETTINGS
# Custom business/office backgrounds uploaded to HeyGen
# =============================================================================
USE_DEFAULT_STUDIO_BACKGROUND = False  # Use our custom backgrounds

# Our 4 professional gradient backgrounds (landscape 1920x1080)
BACKGROUNDS = [
    "bg_corporate_blue.png",   # Deep blue to navy - corporate, trustworthy
    "bg_modern_teal.png",      # Teal gradient - modern, tech
    "bg_slate_gray.png",       # Slate gray - neutral, professional
    "bg_executive_dark.png",   # Navy to charcoal - executive
]

# Brand colors (for future use)
BRAND_COLORS = {
    "primary_blue": "#1e40af",
    "primary_teal": "#0d9488",
    "dark_bg": "#1e293b",
    "light_bg": "#f1f5f9",
    "accent": "#3b82f6",
}

def get_random_presenter():
    """Get a random avatar with a random outfit from the pool."""
    avatar_id = random.choice(list(AVATAR_CONFIGS.keys()))
    config = AVATAR_CONFIGS[avatar_id]
    look = random.choice(config["looks"])
    return {
        "id": avatar_id,
        "name": config["name"],
        "gender": config["gender"],
        "look": look
    }

def get_random_background():
    """Get a random background from the pool."""
    return random.choice(BACKGROUNDS)

def get_random_combo():
    """Get a random avatar + random outfit + random background combination."""
    return {
        "avatar": get_random_presenter(),
        "background": get_random_background()
    }

# Firebase Storage (for video uploads)
FIREBASE_STORAGE_BUCKET = os.getenv("VITE_FIREBASE_STORAGE_BUCKET")

# Output directories
BASE_DIR = os.path.dirname(__file__)
OUTPUT_DIR = os.path.join(BASE_DIR, "output")
SCRIPTS_DIR = os.path.join(OUTPUT_DIR, "scripts")
SCRIPTS_SPOKEN_DIR = os.path.join(OUTPUT_DIR, "scripts_spoken")  # Pronunciation-fixed for TTS
VIDEOS_DIR = os.path.join(OUTPUT_DIR, "videos")
ASSETS_DIR = os.path.join(BASE_DIR, "assets")
BACKGROUNDS_ASSETS_DIR = os.path.join(ASSETS_DIR, "backgrounds")

# Create directories
for d in [OUTPUT_DIR, SCRIPTS_DIR, SCRIPTS_SPOKEN_DIR, VIDEOS_DIR, ASSETS_DIR, BACKGROUNDS_ASSETS_DIR]:
    os.makedirs(d, exist_ok=True)

def get_background_path(filename):
    """Get full path to a background file."""
    return os.path.join(BACKGROUNDS_ASSETS_DIR, filename)

# Video settings
VIDEO_SETTINGS = {
    "target_duration_minutes": 8,  # Target 8-minute videos
    "max_duration_minutes": 10,
    "background_size": "1920x1080",
    "voice_speed": 1.0,
}

# CISA Domain information
CISA_DOMAINS = {
    "CISA1": {
        "name": "Information Systems Auditing Process",
        "weight": 21,
        "topics": ["Audit Planning", "Risk Assessment", "Audit Evidence", "Audit Reporting"]
    },
    "CISA2": {
        "name": "Governance and Management of IT",
        "weight": 17,
        "topics": ["IT Governance", "IT Strategy", "IT Policies", "Risk Management"]
    },
    "CISA3": {
        "name": "Information Systems Acquisition, Development, and Implementation",
        "weight": 12,
        "topics": ["SDLC", "Project Management", "Application Controls", "Testing"]
    },
    "CISA4": {
        "name": "Information Systems Operations and Business Resilience",
        "weight": 23,
        "topics": ["IT Operations", "Change Management", "Disaster Recovery", "Business Continuity"]
    },
    "CISA5": {
        "name": "Protection of Information Assets",
        "weight": 27,
        "topics": ["Security Frameworks", "Access Control", "Network Security", "Encryption"]
    }
}

# Script template for video generation
SCRIPT_PROMPT_TEMPLATE = """
You are creating a focused 2-3 minute educational video script for CISA exam preparation.

Topic: {topic}
Domain: {domain_name}
Subtopic: {subtopic}

Based on these challenging exam questions:
{sample_questions}

Create a CONCISE, high-impact video script that:

1. HOOK (15 sec): One compelling statement - why this topic matters for the exam

2. CORE CONCEPT (45 sec): The essential definition and why auditors care
   - One clear definition
   - One real-world audit connection

3. EXAM TRAP (45 sec): The #1 way ISACA tricks candidates on this topic
   - "The trap is..."
   - "The correct answer is..."

4. QUICK EXAMPLE (30 sec): One brief scenario showing application
   - "For example, when auditing..."

5. TAKEAWAY (15 sec): The ONE thing they must remember
   - End with confidence

Format for talking-head video:
- Direct and punchy - no fluff
- Conversational but efficient
- Use complete sentences with natural punctuation (no ellipses)
- Target 350-450 words (2-3 minutes at 150 wpm)
- Every sentence must add value
- DO NOT use ellipses (...) or special markup tags like <break> or SSML

Return ONLY the script text, no headings or metadata.
"""

# Background image prompt template
BACKGROUND_PROMPT_TEMPLATE = """
Create a professional presentation background for a CISA certification exam prep video.
Topic: {topic}
Domain: {domain_name}

Style requirements:
- Modern, clean corporate design
- Subtle IT/cybersecurity imagery (abstract networks, shields, audit icons)
- Color palette: deep blue (#1e3a5f), teal accents (#00a8a8), white
- 16:9 aspect ratio (1920x1080)
- Leave center clear for avatar placement
- Professional, trustworthy feel
- NO TEXT on the image
- Subtle gradient or geometric patterns
"""
