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
# HeyGen Avatar IDs with friendly display names and specific outfit/look
# =============================================================================
AVATARS = [
    {"id": "Freja", "name": "Sarah", "gender": "female", "look": "Freja Front"},
    {"id": "Jin", "name": "Maya", "gender": "female", "look": "Jin Vest Front"},
    {"id": "Bruce", "name": "David", "gender": "male", "look": "Bruce Front"},
    {"id": "Esmond", "name": "Marcus", "gender": "male", "look": "Esmond Front"},
]

# =============================================================================
# BACKGROUND SETTINGS
# Custom business/office backgrounds uploaded to HeyGen
# =============================================================================
USE_DEFAULT_STUDIO_BACKGROUND = False  # Use our custom backgrounds

# Our 4 professional office backgrounds (blurred business settings)
BACKGROUNDS = [
    "bg_office_1.png",
    "bg_office_2.png",
    "bg_office_3.png",
    "bg_office_4.png",
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
You are creating an 8-minute educational video script for CISA exam preparation.

Topic: {topic}
Domain: {domain_name}
Subtopic: {subtopic}

Based on these challenging exam questions:
{sample_questions}

Create a comprehensive video script that:

1. HOOK (30 sec): Open with a compelling hook - exam failure rate, real-world consequence, or common mistake that costs people points

2. CONCEPT FOUNDATION (2 min): Explain the core concept clearly
   - Define key terms
   - Explain WHY this matters for auditors
   - Connect to real-world IT audit scenarios

3. EXAM TRAPS (2 min): Detail 3-4 specific ways ISACA tricks candidates
   - "Watch out for questions that..."
   - "Don't confuse X with Y..."
   - "The answer that LOOKS right but isn't..."

4. DEEP DIVE EXAMPLES (2 min): Walk through 1-2 specific scenarios
   - "Let's say you're auditing a company that..."
   - Show how to apply the concept step-by-step

5. MEMORY TECHNIQUES (1 min): Provide memorable ways to retain this
   - Mnemonic acronym
   - Visual association
   - "Think of it like..."

6. KEY TAKEAWAYS (30 sec): Summarize the 3 things they MUST remember
   - "If you remember nothing else..."
   - End with confidence builder

Format for talking-head video:
- Natural, conversational tone (like explaining to a colleague)
- Use "..." for pauses between thoughts
- Use natural punctuation for rhythm (periods, commas, dashes)
- Target 1100-1300 words (about 8 minutes spoken at 150 wpm)
- Vary sentence length for natural rhythm
- Use "you" and "we" to engage the viewer
- DO NOT use any special markup tags like <break> or SSML

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
