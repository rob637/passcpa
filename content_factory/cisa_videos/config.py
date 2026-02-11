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
# AVATAR POOL - 4 presenters (2 female, 2 male)
# HeyGen Avatar IDs with friendly display names
# =============================================================================
AVATARS = [
    {"id": "Freja", "name": "Sarah", "gender": "female"},
    {"id": "Jin", "name": "Maya", "gender": "female"},
    {"id": "Bruce", "name": "David", "gender": "male"},
    {"id": "Esmond", "name": "Marcus", "gender": "male"},
]

# =============================================================================
# BACKGROUND SETTINGS
# Using HeyGen's built-in professional studio backgrounds
# These look more credible than custom solid colors
# =============================================================================
USE_DEFAULT_STUDIO_BACKGROUND = True  # Let HeyGen use its default studio setting

# Legacy custom backgrounds (not currently used)
BACKGROUNDS = [
    "background_blue_gradient.png",
    "background_teal_solid.png",
    "background_dark_professional.png",
    "background_light_modern.png",
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
    """Get a random avatar from the pool."""
    return random.choice(AVATARS)

def get_random_background():
    """Get a random background from the pool."""
    return random.choice(BACKGROUNDS)

def get_random_combo():
    """Get a random avatar + background combination."""
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
VIDEOS_DIR = os.path.join(OUTPUT_DIR, "videos")
ASSETS_DIR = os.path.join(BASE_DIR, "assets")
BACKGROUNDS_ASSETS_DIR = os.path.join(ASSETS_DIR, "backgrounds")

# Create directories
for d in [OUTPUT_DIR, SCRIPTS_DIR, VIDEOS_DIR, ASSETS_DIR, BACKGROUNDS_ASSETS_DIR]:
    os.makedirs(d, exist_ok=True)

def get_background_path(filename):
    """Get full path to a background file."""
    return os.path.join(BACKGROUNDS_ASSETS_DIR, filename)

# Video settings
VIDEO_SETTINGS = {
    "max_duration_minutes": 3,
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
You are creating a 2-3 minute educational video script for CISA exam preparation.

Topic: {topic}
Domain: {domain_name}
Subtopic: {subtopic}

Based on these challenging exam questions:
{sample_questions}

Create a video script that:
1. Opens with a hook that grabs attention (exam failure rate, common mistake)
2. Explains the core concept clearly
3. Highlights 2-3 exam traps/tricks the IRS/ISACA likes to use
4. Provides a memorable mnemonic or memory technique
5. Ends with the key takeaway

Format the script for a talking-head video:
- Use natural, conversational language
- Include <break time='1.0s' /> for pauses
- Keep it under 400 words (about 2.5 minutes spoken)
- Write for someone who has studied but needs reinforcement

Return ONLY the script text, no metadata.
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
