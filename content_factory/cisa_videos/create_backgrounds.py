#!/usr/bin/env python3
"""
Generate 4 simple branded backgrounds for VoraPrep videos.

Creates static PNG backgrounds with:
- VoraPrep logo in corner
- Clean professional colors
- Space for avatar in center

Run once to create all backgrounds.
"""
import os
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False
    print("⚠️ Pillow not installed. Run: pip install Pillow")

from config import BRAND_COLORS, BACKGROUNDS

OUTPUT_DIR = Path(__file__).parent / "assets" / "backgrounds"

# Background definitions
BACKGROUND_SPECS = [
    {
        "filename": "background_blue_gradient.png",
        "type": "gradient",
        "color1": "#1e3a5f",  # Dark blue
        "color2": "#2563eb",  # Lighter blue
        "logo_color": "white"
    },
    {
        "filename": "background_teal_solid.png",
        "type": "solid",
        "color1": "#0f766e",  # Teal
        "color2": None,
        "logo_color": "white"
    },
    {
        "filename": "background_dark_professional.png",
        "type": "gradient",
        "color1": "#0f172a",  # Very dark blue
        "color2": "#1e293b",  # Slate
        "logo_color": "white"
    },
    {
        "filename": "background_light_modern.png",
        "type": "solid",
        "color1": "#f1f5f9",  # Light gray
        "color2": None,
        "logo_color": "#1e40af"  # Blue logo on light bg
    },
]

def hex_to_rgb(hex_color):
    """Convert hex color to RGB tuple."""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def create_gradient(width, height, color1, color2, direction='horizontal'):
    """Create a gradient image."""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    c1 = hex_to_rgb(color1)
    c2 = hex_to_rgb(color2)
    
    for x in range(width):
        ratio = x / width
        r = int(c1[0] * (1 - ratio) + c2[0] * ratio)
        g = int(c1[1] * (1 - ratio) + c2[1] * ratio)
        b = int(c1[2] * (1 - ratio) + c2[2] * ratio)
        draw.line([(x, 0), (x, height)], fill=(r, g, b))
    
    return img

def create_solid(width, height, color):
    """Create a solid color image."""
    return Image.new('RGB', (width, height), hex_to_rgb(color))

def add_logo_text(img, color="white"):
    """Add VoraPrep text logo to top-left corner."""
    draw = ImageDraw.Draw(img)
    
    # Try to load a nice font, fall back to default
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 48)
    except:
        font = ImageFont.load_default()
    
    # Logo text
    logo_text = "VoraPrep"
    
    # Position in top-left with padding
    x, y = 60, 40
    
    # Draw the "V" in accent color and "oraPrep" in main color
    if color == "white":
        v_color = "#3b82f6"  # Blue accent
        text_color = "white"
    else:
        v_color = "#3b82f6"
        text_color = color
    
    # Draw text
    draw.text((x, y), "V", font=font, fill=v_color)
    # Get width of "V" to position rest of text
    try:
        v_width = draw.textlength("V", font=font)
    except:
        v_width = 30
    draw.text((x + v_width, y), "oraPrep", font=font, fill=text_color)
    
    return img

def add_subtle_pattern(img):
    """Add subtle geometric pattern for visual interest."""
    draw = ImageDraw.Draw(img)
    width, height = img.size
    
    # Add very subtle diagonal lines in corner
    for i in range(0, 400, 40):
        # Bottom right corner pattern
        x_start = width - 400 + i
        y_start = height
        x_end = width
        y_end = height - 400 + i
        
        if x_start < width and y_end < height:
            draw.line([(x_start, y_start), (x_end, y_end)], 
                     fill=(255, 255, 255, 20), width=1)
    
    return img

def generate_backgrounds():
    """Generate all 4 branded backgrounds."""
    if not PIL_AVAILABLE:
        print("❌ Pillow required. Install with: pip install Pillow")
        return
    
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    print("=" * 60)
    print("🎨 Generating VoraPrep Video Backgrounds")
    print("=" * 60)
    
    width, height = 1920, 1080
    
    for spec in BACKGROUND_SPECS:
        filename = spec["filename"]
        filepath = OUTPUT_DIR / filename
        
        print(f"\n📐 Creating: {filename}")
        
        # Create base background
        if spec["type"] == "gradient":
            img = create_gradient(width, height, spec["color1"], spec["color2"])
        else:
            img = create_solid(width, height, spec["color1"])
        
        # Add logo
        img = add_logo_text(img, spec["logo_color"])
        
        # Save
        img.save(filepath, "PNG")
        print(f"   ✅ Saved: {filepath}")
    
    print(f"\n✅ Created {len(BACKGROUND_SPECS)} backgrounds in: {OUTPUT_DIR}")
    print("\nBackgrounds are ready to use!")

if __name__ == "__main__":
    generate_backgrounds()
