#!/usr/bin/env python3
"""
VoraPrep Lesson Enhancement Engine
===================================
Automatically enhances CPA lessons with interactive elements using Gemini AI.

Features generated:
- Knowledge checks (inline quizzes)
- Reveal sections (click-to-reveal answers)
- Comparison cards (side-by-side distinctions)
- Practice links (related question IDs)
- Flowcharts (decision trees) [where applicable]
- Calculations (fill-in-the-blank) [where applicable]

Usage:
    # Process all FAR lessons
    python enhance_lessons.py --section FAR

    # Process specific lesson
    python enhance_lessons.py --lesson FAR-I-001

    # Dry run (don't write files)
    python enhance_lessons.py --section FAR --dry-run

    # Resume from checkpoint
    python enhance_lessons.py --section FAR --resume

Environment:
    GEMINI_API_KEY - Google Gemini API key (required)
"""

import os
import sys
import json
import time
import argparse
import re
import urllib.request
import urllib.error
from pathlib import Path
from datetime import datetime
from typing import Optional

# ============================================================================
# Configuration
# ============================================================================

WORKSPACE_ROOT = Path(__file__).parent.parent.parent
LESSONS_DIR = WORKSPACE_ROOT / "src" / "data" / "cpa" / "lessons"
OUTPUT_DIR = WORKSPACE_ROOT / "content_factory" / "lesson_enhancement" / "output"
PROGRESS_FILE = OUTPUT_DIR / "progress.json"
ENHANCED_DIR = OUTPUT_DIR / "enhanced"

# Gemini API configuration
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

# Sections to process
SECTIONS = ["far", "aud", "reg", "bar", "isc", "tcp", "prep"]

# Rate limiting
REQUESTS_PER_MINUTE = 15
REQUEST_DELAY = 60 / REQUESTS_PER_MINUTE  # 4 seconds between requests

# ============================================================================
# Gemini Setup
# ============================================================================

def get_api_key() -> str:
    """Get Gemini API key from environment or .env file."""
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("VITE_GEMINI_API_KEY")
    if not api_key:
        # Try to load from .env file
        env_file = WORKSPACE_ROOT / ".env"
        if env_file.exists():
            with open(env_file) as f:
                for line in f:
                    if line.startswith("VITE_GEMINI_API_KEY="):
                        api_key = line.split("=", 1)[1].strip().strip('"\'')
                        break
    
    if not api_key:
        print("ERROR: GEMINI_API_KEY environment variable not set.")
        print("Set it with: export GEMINI_API_KEY=your-api-key")
        sys.exit(1)
    
    return api_key

def call_gemini(api_key: str, system_prompt: str, user_prompt: str) -> str:
    """Call Gemini API via REST endpoint."""
    url = f"{GEMINI_API_URL}?key={api_key}"
    
    payload = {
        "contents": [
            {
                "parts": [{"text": system_prompt + "\n\n" + user_prompt}]
            }
        ],
        "generationConfig": {
            "temperature": 0.7,
            "topK": 40,
            "topP": 0.95,
            "maxOutputTokens": 8192,
        }
    }
    
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        url,
        data=data,
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    
    try:
        with urllib.request.urlopen(req, timeout=60) as response:
            result = json.loads(response.read().decode('utf-8'))
            return result['candidates'][0]['content']['parts'][0]['text']
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        raise Exception(f"Gemini API error {e.code}: {error_body}")
    except urllib.error.URLError as e:
        raise Exception(f"Network error: {e.reason}")

# ============================================================================
# Lesson Parser
# ============================================================================

def extract_lessons_from_file(file_path: Path) -> list[dict]:
    """
    Parse a TypeScript lesson file and extract lesson objects.
    This is a simplified parser - it extracts JSON-like structures.
    """
    content = file_path.read_text()
    lessons = []
    
    # Find the array of lessons
    # Match pattern: export const xxxLessons: Lesson[] = [...]
    match = re.search(r'export\s+const\s+\w+Lessons:\s*Lesson\[\]\s*=\s*\[', content)
    if not match:
        return []
    
    # Extract each lesson object (simplified - looks for id: 'xxx' pattern)
    # This is a basic extractor - for production, consider using a proper TS parser
    lesson_pattern = re.compile(
        r"\{\s*id:\s*['\"]([^'\"]+)['\"].*?content:\s*\{.*?sections:\s*\[(.*?)\]\s*\}",
        re.DOTALL
    )
    
    # For now, we'll use a simpler approach: just extract lesson IDs and titles
    # The actual enhancement will read the full file and inject new sections
    
    id_pattern = re.compile(r"id:\s*['\"]([^'\"]+)['\"]")
    title_pattern = re.compile(r"title:\s*['\"]([^'\"]+)['\"]")
    
    # Split by lesson objects (heuristic: look for { id: pattern)
    lesson_blocks = re.split(r'\n\s*\{(?=\s*id:)', content)
    
    for block in lesson_blocks[1:]:  # Skip first (before any lessons)
        id_match = id_pattern.search(block)
        title_match = title_pattern.search(block)
        if id_match:
            lessons.append({
                'id': id_match.group(1),
                'title': title_match.group(1) if title_match else 'Unknown',
                'raw_block': '{' + block  # Keep raw for context
            })
    
    return lessons

def get_lesson_content(lesson_id: str, section: str) -> Optional[str]:
    """Get the full content of a lesson for analysis."""
    file_path = LESSONS_DIR / f"{section.lower()}.ts"
    if not file_path.exists():
        return None
    
    content = file_path.read_text()
    
    # Find the lesson block
    # Look for the pattern starting with the lesson ID
    pattern = re.compile(
        rf"\{{\s*id:\s*['\"]({re.escape(lesson_id)})['\"].*?(?=\{{\s*id:\s*['\"]|^\s*\];)",
        re.DOTALL | re.MULTILINE
    )
    
    match = pattern.search(content)
    if match:
        return match.group(0)
    
    return None

# ============================================================================
# Enhancement Prompts
# ============================================================================

SYSTEM_PROMPT = """You are an expert CPA exam content developer for VoraPrep. Your task is to enhance existing lesson content with interactive elements that improve learning outcomes.

You will be given a lesson's content and must generate JSON objects for new interactive sections to INSERT into the lesson.

CRITICAL RULES:
1. Generate VALID JSON only - no comments, no trailing commas
2. Each interactive element should test or reinforce a KEY CONCEPT from the lesson
3. Knowledge checks should have 4 options, exactly one correct
4. Explanations should be thorough but concise
5. Do NOT repeat content already in the lesson - ADD VALUE with new angles
6. Questions should be at the appropriate difficulty level for CPA candidates

INTERACTIVE SECTION TYPES YOU CAN GENERATE:

1. knowledge-check: Quiz question with 4 options
{
  "type": "knowledge-check",
  "title": "Check Your Understanding",
  "knowledgeCheck": {
    "question": "The question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Why this is correct and why others are wrong.",
    "hint": "Optional hint to help without giving away the answer"
  }
}

2. reveal: Click-to-reveal for self-testing
{
  "type": "reveal",
  "title": "Test Yourself",
  "reveal": {
    "question": "What are the three components of the fraud triangle?",
    "answer": "Pressure/Incentive, Opportunity, and Rationalization",
    "hint": "Think about what motivates someone to commit fraud"
  }
}

3. comparison: Side-by-side distinction
{
  "type": "comparison",
  "title": "Compare and Contrast",
  "comparison": {
    "title": "Revenue vs. Gain",
    "items": [
      {
        "label": "Revenue",
        "points": ["From core operations", "Recurring", "Reported gross"],
        "color": "blue"
      },
      {
        "label": "Gain",
        "points": ["From peripheral activities", "Non-recurring", "Reported net"],
        "color": "green"
      }
    ]
  }
}

4. practice-link: Link to related practice questions (use placeholder IDs)
{
  "type": "practice-link",
  "title": "Practice This Concept",
  "practiceLink": {
    "text": "Ready to apply this? Try these practice questions on depreciation methods.",
    "questionIds": ["far-ii-006-001", "far-ii-006-002", "far-ii-006-003"],
    "difficulty": "medium"
  }
}

5. flowchart: Decision tree (for complex decision-making topics only)
{
  "type": "flowchart",
  "title": "Decision Framework",
  "flowchart": {
    "title": "Is This a Finance or Operating Lease?",
    "nodes": [
      {"id": 1, "text": "Does ownership transfer at end of lease?", "yes": 2, "no": 3},
      {"id": 2, "text": "FINANCE LEASE", "terminal": true, "result": "Classify as Finance Lease"},
      {"id": 3, "text": "Is there a bargain purchase option?", "yes": 2, "no": 4},
      {"id": 4, "text": "Is lease term ≥ 75% of economic life?", "yes": 2, "no": 5},
      {"id": 5, "text": "Is PV of payments ≥ 90% of fair value?", "yes": 2, "no": 6},
      {"id": 6, "text": "Is asset specialized with no alternative use?", "yes": 2, "no": 7},
      {"id": 7, "text": "OPERATING LEASE", "terminal": true, "result": "Classify as Operating Lease"}
    ]
  }
}

6. calculation: Fill-in-the-blank math (for quantitative topics only)
{
  "type": "calculation",
  "title": "Work Through It",
  "calculation": {
    "title": "Calculate Straight-Line Depreciation",
    "scenario": "Equipment cost: $50,000. Salvage value: $5,000. Useful life: 9 years.",
    "steps": [
      {"label": "Depreciable Base", "formula": "Cost - Salvage", "value": "$45,000", "editable": false},
      {"label": "Annual Depreciation", "value": "___", "editable": true, "answer": "$5,000"}
    ],
    "solution": "Depreciable Base = $50,000 - $5,000 = $45,000\nAnnual Depreciation = $45,000 / 9 = $5,000"
  }
}

STRATEGY FOR SELECTING ELEMENTS:
- EVERY lesson should get 1-2 knowledge-checks
- Add reveal sections for important definitions or lists to memorize
- Add comparison only when there are commonly confused concepts
- Add flowchart only for decision-tree type topics (lease classification, impairment testing, etc.)
- Add calculation only for quantitative topics
- Keep practice-link IDs as placeholders - they'll be matched to real questions later
"""

def build_enhancement_prompt(lesson_content: str, lesson_id: str) -> str:
    """Build the prompt for Gemini to enhance a lesson."""
    return f"""Analyze this CPA exam lesson and generate 2-4 interactive sections to enhance learning.

LESSON ID: {lesson_id}

LESSON CONTENT:
```
{lesson_content[:8000]}  # Truncate if too long
```

Generate a JSON array of interactive sections. Include:
1. At least 1 knowledge-check (required)
2. 1 reveal section for key memorization points (if applicable)
3. 1 comparison if there are confusable concepts (optional)
4. 1 flowchart OR calculation if the topic warrants it (optional)

Return ONLY a valid JSON array, no markdown code blocks, no explanation:
[
  {{ ... section 1 ... }},
  {{ ... section 2 ... }}
]"""

# ============================================================================
# Progress Tracking
# ============================================================================

def load_progress() -> dict:
    """Load progress from checkpoint file."""
    if PROGRESS_FILE.exists():
        return json.loads(PROGRESS_FILE.read_text())
    return {
        "started_at": datetime.now().isoformat(),
        "completed": [],
        "failed": [],
        "in_progress": None
    }

def save_progress(progress: dict):
    """Save progress to checkpoint file."""
    PROGRESS_FILE.parent.mkdir(parents=True, exist_ok=True)
    PROGRESS_FILE.write_text(json.dumps(progress, indent=2))

# ============================================================================
# Enhancement Logic
# ============================================================================

def enhance_lesson(api_key: str, lesson_id: str, section: str, dry_run: bool = False) -> bool:
    """
    Enhance a single lesson with interactive elements.
    Returns True if successful, False otherwise.
    """
    print(f"\n{'='*60}")
    print(f"Enhancing: {lesson_id}")
    print(f"{'='*60}")
    
    # Get lesson content
    lesson_content = get_lesson_content(lesson_id, section)
    if not lesson_content:
        print(f"  ❌ Could not find lesson content")
        return False
    
    print(f"  📖 Lesson content length: {len(lesson_content)} chars")
    
    # Build prompt
    prompt = build_enhancement_prompt(lesson_content, lesson_id)
    
    # Call Gemini
    try:
        print(f"  🤖 Calling Gemini...")
        raw_response = call_gemini(api_key, SYSTEM_PROMPT, prompt)
        raw_response = raw_response.strip()
        print(f"  📝 Response length: {len(raw_response)} chars")
        
        # Clean up response (remove markdown code blocks if present)
        if raw_response.startswith("```"):
            raw_response = re.sub(r'^```\w*\n?', '', raw_response)
            raw_response = re.sub(r'\n?```$', '', raw_response)
        
        # Parse JSON
        try:
            sections = json.loads(raw_response)
            if not isinstance(sections, list):
                sections = [sections]
            print(f"  ✅ Generated {len(sections)} interactive sections")
        except json.JSONDecodeError as e:
            print(f"  ❌ JSON parse error: {e}")
            print(f"  Raw response preview: {raw_response[:500]}")
            return False
        
        # Validate sections
        valid_sections = []
        for s in sections:
            if validate_section(s):
                valid_sections.append(s)
            else:
                print(f"  ⚠️  Invalid section type: {s.get('type', 'unknown')}")
        
        if not valid_sections:
            print(f"  ❌ No valid sections generated")
            return False
        
        # Save enhanced content
        if not dry_run:
            output_file = ENHANCED_DIR / section.lower() / f"{lesson_id}.json"
            output_file.parent.mkdir(parents=True, exist_ok=True)
            output_file.write_text(json.dumps({
                "lessonId": lesson_id,
                "section": section.upper(),
                "generatedAt": datetime.now().isoformat(),
                "interactiveSections": valid_sections
            }, indent=2))
            print(f"  💾 Saved to: {output_file.relative_to(WORKSPACE_ROOT)}")
        else:
            print(f"  🔍 DRY RUN - Would generate {len(valid_sections)} sections")
            for s in valid_sections:
                print(f"      - {s['type']}: {s.get('title', 'untitled')}")
        
        return True
        
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False

def validate_section(section: dict) -> bool:
    """Validate that a section has required fields."""
    valid_types = ['knowledge-check', 'reveal', 'comparison', 'practice-link', 'flowchart', 'calculation']
    
    if not isinstance(section, dict):
        return False
    
    section_type = section.get('type')
    if section_type not in valid_types:
        return False
    
    # Check type-specific required fields
    if section_type == 'knowledge-check':
        kc = section.get('knowledgeCheck', {})
        return all([
            kc.get('question'),
            isinstance(kc.get('options'), list) and len(kc['options']) == 4,
            isinstance(kc.get('correctIndex'), int) and 0 <= kc['correctIndex'] <= 3,
            kc.get('explanation')
        ])
    
    if section_type == 'reveal':
        r = section.get('reveal', {})
        return all([r.get('question'), r.get('answer')])
    
    if section_type == 'comparison':
        c = section.get('comparison', {})
        return all([
            c.get('title'),
            isinstance(c.get('items'), list) and len(c['items']) >= 2,
            all(item.get('label') and isinstance(item.get('points'), list) for item in c['items'])
        ])
    
    if section_type == 'practice-link':
        p = section.get('practiceLink', {})
        return all([p.get('text'), isinstance(p.get('questionIds'), list)])
    
    if section_type == 'flowchart':
        f = section.get('flowchart', {})
        return all([
            f.get('title'),
            isinstance(f.get('nodes'), list) and len(f['nodes']) >= 2
        ])
    
    if section_type == 'calculation':
        c = section.get('calculation', {})
        return all([
            c.get('title'),
            isinstance(c.get('steps'), list) and len(c['steps']) >= 1
        ])
    
    return True

# ============================================================================
# Main Batch Processing
# ============================================================================

def process_section(api_key: str, section: str, dry_run: bool = False, resume: bool = False):
    """Process all lessons in a section."""
    file_path = LESSONS_DIR / f"{section.lower()}.ts"
    if not file_path.exists():
        print(f"❌ Lesson file not found: {file_path}")
        return
    
    print(f"\n{'='*60}")
    print(f"Processing section: {section.upper()}")
    print(f"File: {file_path.relative_to(WORKSPACE_ROOT)}")
    print(f"{'='*60}")
    
    # Load progress
    progress = load_progress() if resume else {
        "started_at": datetime.now().isoformat(),
        "completed": [],
        "failed": [],
        "in_progress": None
    }
    
    # Extract lessons
    lessons = extract_lessons_from_file(file_path)
    print(f"Found {len(lessons)} lessons")
    
    # Filter already completed
    if resume:
        lessons = [l for l in lessons if l['id'] not in progress['completed']]
        print(f"Resuming: {len(lessons)} remaining")
    
    # Process each lesson
    for i, lesson in enumerate(lessons):
        lesson_id = lesson['id']
        
        # Skip if not matching section
        if not lesson_id.upper().startswith(section.upper()):
            continue
        
        print(f"\n[{i+1}/{len(lessons)}] {lesson_id}: {lesson['title'][:50]}")
        
        progress['in_progress'] = lesson_id
        save_progress(progress)
        
        success = enhance_lesson(api_key, lesson_id, section, dry_run)
        
        if success:
            progress['completed'].append(lesson_id)
        else:
            progress['failed'].append(lesson_id)
        
        progress['in_progress'] = None
        save_progress(progress)
        
        # Rate limiting
        print(f"  ⏳ Waiting {REQUEST_DELAY:.1f}s (rate limit)...")
        time.sleep(REQUEST_DELAY)
    
    # Summary
    print(f"\n{'='*60}")
    print(f"SECTION COMPLETE: {section.upper()}")
    print(f"  ✅ Completed: {len(progress['completed'])}")
    print(f"  ❌ Failed: {len(progress['failed'])}")
    print(f"{'='*60}")

def process_single_lesson(api_key: str, lesson_id: str, dry_run: bool = False):
    """Process a single lesson."""
    # Extract section from lesson ID (e.g., FAR-I-001 -> FAR)
    section = lesson_id.split('-')[0].lower()
    success = enhance_lesson(api_key, lesson_id, section, dry_run)
    return success

# ============================================================================
# CLI
# ============================================================================

def main():
    parser = argparse.ArgumentParser(description="VoraPrep Lesson Enhancement Engine")
    parser.add_argument("--section", type=str, help="Section to process (FAR, AUD, REG, BAR, ISC, TCP, PREP)")
    parser.add_argument("--lesson", type=str, help="Specific lesson ID to process")
    parser.add_argument("--dry-run", action="store_true", help="Don't write output files")
    parser.add_argument("--resume", action="store_true", help="Resume from last checkpoint")
    parser.add_argument("--all", action="store_true", help="Process all sections")
    
    args = parser.parse_args()
    
    # Create output directories
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    ENHANCED_DIR.mkdir(parents=True, exist_ok=True)
    
    # Get API key
    print("🚀 VoraPrep Lesson Enhancement Engine")
    print("="*60)
    api_key = get_api_key()
    print("✅ Gemini API key loaded")
    
    if args.lesson:
        # Single lesson mode
        process_single_lesson(api_key, args.lesson, args.dry_run)
    elif args.section:
        # Single section mode
        process_section(api_key, args.section, args.dry_run, args.resume)
    elif args.all:
        # All sections mode
        for section in SECTIONS:
            process_section(api_key, section, args.dry_run, args.resume)
    else:
        parser.print_help()
        print("\nExamples:")
        print("  python enhance_lessons.py --section FAR")
        print("  python enhance_lessons.py --lesson FAR-I-001")
        print("  python enhance_lessons.py --all")
        print("  python enhance_lessons.py --section FAR --dry-run")

if __name__ == "__main__":
    main()
