#!/usr/bin/env python3
"""
Generate 4 simple branded backgrounds for VoraPrep videos.
Run this ONCE to create the static backgrounds.

Uses Pillow for simple gradient/solid backgrounds with logo.
No AI needed - just clean professional backgrounds.
"""
import os
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("Installing Pillow...")
    os.system("pip install Pillow")
    from PIL import Image, ImageDraw, ImageFont

# Output directory
OUTPUT_DIR = Path(__file__).parent / "output" / "backgrounds"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Video dimensions (16:9)
WIDTH = 1920
HEIGHT = 1080

# Brand colors
COLORS = {
    "primary_blue": (30, 64, 175),       # #1e40af
    "primary_teal": (13, 148, 136),      # #0d9488
    "dark_bg": (30, 41, 59),             # #1e293b
    "light_bg": (241, 245, 249),         # #f1f5f9
    "accent": (59, 130, 246),            # #3b82f6
    "white": (255, 255, 255),
    "dark_text": (30, 41, 59),
}

def create_gradient(width, height, color1, color2, direction="vertical"):
    """Create a gradient image."""
    img = Image.new("RGB", (width, height))
    
    for y in range(height):
        for x in range(width):
            if direction == "vertical":
                ratio = y / height
            else:
                ratio = x / width
            
            r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
            g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
            b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
            
            img.putpixel((x, y), (r, g, b))
    
    return img

def add_logo_text(img, text="VoraPrep", position="bottom_right"):
    """Add VoraPrep text logo to the image."""
    draw = ImageDraw.Draw(img)
    
    # Try to load a nice font, fall back to default
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 48)
    except:
        font = ImageFont.load_default()
    
    # Determine text color based on background brightness
    # For now, use white for dark backgrounds
    text_color = COLORS["white"]
    
    # Position the logo
    padding = 40
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    if position == "bottom_right":
        x = WIDTH - text_width - padding
        y = HEIGHT - text_height - padding
    elif position == "bottom_left":
        x = padding
        y = HEIGHT - text_height - padding
    elif position == "top_right":
        x = WIDTH - text_width - padding
        y = padding
    else:
        x = padding
        y = padding
    
    # Add subtle shadow
    draw.text((x + 2, y + 2), text, font=font, fill=(0, 0, 0, 128))
    draw.text((x, y), text, font=font, fill=text_color)
    
    return img

def add_decorative_elements(img, style="minimal"):
    """Add subtle decorative elements."""
    draw = ImageDraw.Draw(img)
    
    if style == "corner_accent":
        # Add accent corner shapes
        draw.polygon([(0, 0), (200, 0), (0, 200)], fill=(*COLORS["accent"], 50))
        draw.polygon([(WIDTH, HEIGHT), (WIDTH - 200, HEIGHT), (WIDTH, HEIGHT - 200)], 
                    fill=(*COLORS["accent"], 50))
    
    elif style == "bottom_bar":
        # Subtle bottom bar
        draw.rectangle([(0, HEIGHT - 80), (WIDTH, HEIGHT)], 
                      fill=(*COLORS["dark_bg"], 200))
    
    return img

def generate_backgrounds():
    """Generate all 4 branded backgrounds."""
    print("=" * 60)
    print("🎨 VoraPrep Background Generator")
    print("=" * 60)
    
    backgrounds = []
    
    # Background 1: Blue gradient (top to bottom, light to dark blue)
    print("\n1. Creating blue gradient background...")
    bg1 = create_gradient(WIDTH, HEIGHT, 
                         COLORS["accent"], 
                         COLORS["primary_blue"])
    bg1 = add_logo_text(bg1, "VoraPrep", "bottom_right")
    bg1_path = OUTPUT_DIR / "background_blue_gradient.png"
    bg1.save(bg1_path, "PNG")
    backgrounds.append(bg1_path)
    print(f"   ✅ Saved: {bg1_path.name}")
    
    # Background 2: Teal solid with subtle gradient
    print("\n2. Creating teal background...")
    bg2 = create_gradient(WIDTH, HEIGHT,
                         COLORS["primary_teal"],
                         (10, 120, 110))
    bg2 = add_logo_text(bg2, "VoraPrep", "bottom_right")
    bg2_path = OUTPUT_DIR / "background_teal_solid.png"
    bg2.save(bg2_path, "PNG")
    backgrounds.append(bg2_path)
    print(f"   ✅ Saved: {bg2_path.name}")
    
    # Background 3: Dark professional
    print("\n3. Creating dark professional background...")
    bg3 = create_gradient(WIDTH, HEIGHT,
                         (40, 50, 70),
                         COLORS["dark_bg"])
    bg3 = add_logo_text(bg3, "VoraPrep", "bottom_right")
    bg3_path = OUTPUT_DIR / "background_dark_professional.png"
    bg3.save(bg3_path, "PNG")
    backgrounds.append(bg3_path)
    print(f"   ✅ Saved: {bg3_path.name}")
    
    # Background 4: Light modern (for contrast variety)
    print("\n4. Creating light modern background...")
    bg4 = create_gradient(WIDTH, HEIGHT,
                         COLORS["light_bg"],
                         (220, 230, 240))
    # Use dark text for light background
    draw = ImageDraw.Draw(bg4)
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 48)
    except:
        font = ImageFont.load_default()
    
    padding = 40
    text = "VoraPrep"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = WIDTH - text_width - padding
    y = HEIGHT - text_height - padding
    draw.text((x, y), text, font=font, fill=COLORS["primary_blue"])
    
    bg4_path = OUTPUT_DIR / "background_light_modern.png"
    bg4.save(bg4_path, "PNG")
    backgrounds.append(bg4_path)
    print(f"   ✅ Saved: {bg4_path.name}")
    
    print("\n" + "=" * 60)
    print(f"✅ Created {len(backgrounds)} branded backgrounds!")
    print(f"📁 Location: {OUTPUT_DIR}")
    print("=" * 60)
    
    return backgrounds

if __name__ == "__main__":
    generate_backgrounds()
