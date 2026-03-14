#!/usr/bin/env python3
"""
Lesson Enhancement Pipeline - JSON Version

This script:
1. Loads lessons from JSON files
2. Uses Gemini to generate interactive sections
3. Inserts them directly into the JSON
4. Saves the enhanced JSON

Much simpler than the TypeScript string manipulation approach!

Usage:
    python enhance_json.py --section far           # Enhance one section
    python enhance_json.py --lesson FAR-I-001      # Enhance one lesson
    python enhance_json.py --all                   # Enhance all sections
    python enhance_json.py --dry-run --section far # Preview without saving
"""

import os
import sys
import json
import urllib.request
import urllib.error
import argparse
from pathlib import Path
from datetime import datetime
from typing import Optional

# Paths
WORKSPACE = Path('/workspaces/passcpa')
JSON_DIR = WORKSPACE / 'src' / 'data' / 'cpa' / 'lessons' / 'json'
BACKUP_DIR = WORKSPACE / 'content_factory' / 'lesson_enhancement' / 'json_backups'
PROGRESS_FILE = WORKSPACE / 'content_factory' / 'lesson_enhancement' / 'enhancement_progress.json'

CPA_SECTIONS = ['far', 'aud', 'reg', 'bar', 'isc', 'tcp']  # Skip prep for now

# Gemini API
GEMINI_API_KEY = os.environ.get('VITE_GEMINI_API_KEY', '')
GEMINI_MODEL = 'gemini-2.0-flash'
GEMINI_URL = f'https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent?key={GEMINI_API_KEY}'

# Enhancement prompt - generates interactive sections
ENHANCEMENT_PROMPT = '''You are an expert CPA exam tutor. Analyze this lesson and generate 2-4 interactive sections that will help students learn and retain the material.

LESSON:
Title: {title}
Section: {section}
Topics: {topics}
Content Summary: {content_summary}

Generate interactive sections in this JSON format. Return ONLY valid JSON, no markdown:

{{
  "sections": [
    {{
      "type": "knowledge-check",
      "title": "Check Your Understanding",
      "knowledgeCheck": {{
        "question": "A clear, exam-style multiple choice question",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctIndex": 0,
        "explanation": "Why the correct answer is right",
        "hint": "Optional hint for struggling students"
      }}
    }},
    {{
      "type": "reveal",
      "title": "Test Yourself",
      "reveal": {{
        "question": "A concept to test recall",
        "answer": "The detailed answer"
      }}
    }},
    {{
      "type": "comparison",
      "title": "Key Differences",
      "comparison": {{
        "headers": ["Concept A", "Concept B"],
        "rows": [
          {{"label": "Feature 1", "values": ["A value", "B value"]}},
          {{"label": "Feature 2", "values": ["A value", "B value"]}}
        ]
      }}
    }}
  ]
}}

Rules:
1. Knowledge checks should be CPA exam level - challenging but fair
2. Make questions specific to THIS lesson's content
3. Reveal sections should test key concepts students need to memorize
4. Comparisons are great for similar concepts that are often confused
5. Generate 2-4 sections total, mixing types as appropriate
6. Keep explanations thorough but concise'''


def load_progress() -> dict:
    """Load enhancement progress tracking."""
    if PROGRESS_FILE.exists():
        with open(PROGRESS_FILE, 'r') as f:
            return json.load(f)
    return {'enhanced': [], 'failed': [], 'last_run': None}


def save_progress(progress: dict):
    """Save enhancement progress."""
    progress['last_run'] = datetime.now().isoformat()
    with open(PROGRESS_FILE, 'w') as f:
        json.dump(progress, f, indent=2)


def backup_json(section: str) -> Path:
    """Create timestamped backup of JSON file."""
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    
    source = JSON_DIR / f"{section}.json"
    backup_path = BACKUP_DIR / f"{section}_{timestamp}.json"
    
    with open(source, 'r') as f:
        content = f.read()
    with open(backup_path, 'w') as f:
        f.write(content)
    
    return backup_path


def load_lessons(section: str) -> list:
    """Load lessons from JSON file."""
    json_file = JSON_DIR / f"{section}.json"
    if not json_file.exists():
        return []
    
    with open(json_file, 'r') as f:
        return json.load(f)


def save_lessons(section: str, lessons: list):
    """Save lessons to JSON file."""
    json_file = JSON_DIR / f"{section}.json"
    with open(json_file, 'w') as f:
        json.dump(lessons, f, indent=2)


def get_content_summary(lesson: dict) -> str:
    """Extract a summary of lesson content for the prompt."""
    content = lesson.get('content', {})
    sections = content.get('sections', [])
    
    summary_parts = []
    for section in sections[:5]:  # First 5 sections
        section_type = section.get('type', 'text')
        title = section.get('title', '')
        
        # Skip already-generated interactive sections
        if section_type in ['knowledge-check', 'reveal', 'comparison', 'practice-link', 'flowchart', 'calculation']:
            continue
            
        if section_type == 'text':
            content_text = section.get('content', '')
            if isinstance(content_text, str):
                summary_parts.append(f"{title}: {content_text[:300]}...")
        elif section_type == 'list':
            items = section.get('content', [])
            if items and isinstance(items, list):
                terms = [item.get('term', str(item)[:50]) for item in items[:3] if isinstance(item, dict)]
                summary_parts.append(f"{title}: {', '.join(terms)}")
    
    return '\n'.join(summary_parts[:3])


def call_gemini(prompt: str) -> Optional[str]:
    """Call Gemini API and return the response text."""
    if not GEMINI_API_KEY:
        print("  ❌ VITE_GEMINI_API_KEY not set")
        return None
    
    request_body = {
        'contents': [{'parts': [{'text': prompt}]}],
        'generationConfig': {
            'temperature': 0.7,
            'maxOutputTokens': 2000,
        }
    }
    
    data = json.dumps(request_body).encode('utf-8')
    req = urllib.request.Request(
        GEMINI_URL,
        data=data,
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    
    try:
        with urllib.request.urlopen(req, timeout=60) as response:
            result = json.loads(response.read().decode('utf-8'))
            
        candidates = result.get('candidates', [])
        if not candidates:
            return None
            
        content = candidates[0].get('content', {})
        parts = content.get('parts', [])
        if not parts:
            return None
            
        return parts[0].get('text', '')
        
    except urllib.error.HTTPError as e:
        print(f"  ❌ HTTP {e.code}: {e.reason}")
        return None
    except Exception as e:
        print(f"  ❌ API error: {e}")
        return None


def parse_gemini_response(response: str) -> list:
    """Parse Gemini response to extract sections."""
    # Clean up response - remove markdown code blocks
    text = response.strip()
    if text.startswith('```'):
        lines = text.split('\n')
        lines = [l for l in lines if not l.startswith('```')]
        text = '\n'.join(lines)
    
    try:
        data = json.loads(text)
        return data.get('sections', [])
    except json.JSONDecodeError:
        # Try to find JSON in the response
        import re
        match = re.search(r'\{[\s\S]*\}', text)
        if match:
            try:
                data = json.loads(match.group())
                return data.get('sections', [])
            except:
                pass
    
    return []


def is_already_enhanced(lesson: dict) -> bool:
    """Check if lesson already has interactive sections."""
    content = lesson.get('content', {})
    sections = content.get('sections', [])
    
    interactive_types = {'knowledge-check', 'reveal', 'comparison', 'practice-link', 'flowchart', 'calculation'}
    
    for section in sections:
        if section.get('type') in interactive_types:
            return True
    
    return False


def enhance_lesson(lesson: dict) -> list:
    """Generate interactive sections for a lesson."""
    title = lesson.get('title', 'Unknown')
    section = lesson.get('section', 'Unknown')
    topics = ', '.join(lesson.get('topics', []))
    content_summary = get_content_summary(lesson)
    
    prompt = ENHANCEMENT_PROMPT.format(
        title=title,
        section=section,
        topics=topics,
        content_summary=content_summary
    )
    
    response = call_gemini(prompt)
    if not response:
        return []
    
    sections = parse_gemini_response(response)
    return sections


def process_section(section_name: str, dry_run: bool = False) -> dict:
    """Process all lessons in a section."""
    print(f"\n📚 Processing {section_name.upper()}...")
    
    lessons = load_lessons(section_name)
    if not lessons:
        print(f"  ❌ No lessons found for {section_name}")
        return {'processed': 0, 'enhanced': 0, 'skipped': 0, 'failed': 0}
    
    print(f"  Found {len(lessons)} lessons")
    
    progress = load_progress()
    stats = {'processed': 0, 'enhanced': 0, 'skipped': 0, 'failed': 0}
    
    # Backup before modifying
    if not dry_run:
        backup_path = backup_json(section_name)
        print(f"  📁 Backed up to {backup_path.name}")
    
    for i, lesson in enumerate(lessons):
        lesson_id = lesson.get('id', f'lesson-{i}')
        
        # Skip already enhanced
        if is_already_enhanced(lesson):
            print(f"  ⏭️  {lesson_id} - already enhanced")
            stats['skipped'] += 1
            continue
        
        # Skip previously processed
        if lesson_id in progress.get('enhanced', []):
            print(f"  ⏭️  {lesson_id} - previously done")
            stats['skipped'] += 1
            continue
        
        print(f"  🔄 {lesson_id}...", end=' ', flush=True)
        
        new_sections = enhance_lesson(lesson)
        
        if new_sections:
            stats['enhanced'] += 1
            print(f"✅ +{len(new_sections)} sections")
            
            if not dry_run:
                # Insert new sections at the end of content
                content = lesson.get('content', {})
                existing_sections = content.get('sections', [])
                
                # Add marker comment section
                marker = {
                    'type': 'text',
                    'title': '',
                    'content': f'<!-- AUTO-GENERATED INTERACTIVE SECTIONS ({datetime.now().strftime("%Y-%m-%d")}) -->'
                }
                
                existing_sections.append(marker)
                existing_sections.extend(new_sections)
                content['sections'] = existing_sections
                lesson['content'] = content
                
                progress['enhanced'].append(lesson_id)
        else:
            stats['failed'] += 1
            print(f"❌ failed")
            if not dry_run:
                progress['failed'].append(lesson_id)
        
        stats['processed'] += 1
    
    # Save updated lessons
    if not dry_run and stats['enhanced'] > 0:
        save_lessons(section_name, lessons)
        save_progress(progress)
        print(f"\n  💾 Saved {section_name}.json with {stats['enhanced']} enhanced lessons")
    
    return stats


def process_single_lesson(lesson_id: str, dry_run: bool = False) -> bool:
    """Process a single lesson by ID."""
    # Parse section from lesson ID (e.g., FAR-I-001 -> far)
    section_name = lesson_id.split('-')[0].lower()
    
    print(f"\n📝 Processing {lesson_id}...")
    
    lessons = load_lessons(section_name)
    if not lessons:
        print(f"  ❌ No lessons found for section {section_name}")
        return False
    
    # Find the lesson
    lesson_idx = None
    for i, lesson in enumerate(lessons):
        if lesson.get('id') == lesson_id:
            lesson_idx = i
            break
    
    if lesson_idx is None:
        print(f"  ❌ Lesson {lesson_id} not found")
        return False
    
    lesson = lessons[lesson_idx]
    
    if is_already_enhanced(lesson):
        print(f"  ⚠️  Already enhanced - skipping")
        return True
    
    # Backup
    if not dry_run:
        backup_json(section_name)
    
    # Enhance
    new_sections = enhance_lesson(lesson)
    
    if new_sections:
        print(f"  ✅ Generated {len(new_sections)} interactive sections")
        
        if not dry_run:
            content = lesson.get('content', {})
            existing_sections = content.get('sections', [])
            existing_sections.extend(new_sections)
            content['sections'] = existing_sections
            lesson['content'] = content
            lessons[lesson_idx] = lesson
            
            save_lessons(section_name, lessons)
            print(f"  💾 Saved to {section_name}.json")
        else:
            print(f"  [DRY RUN] Would add sections:")
            for section in new_sections:
                print(f"    - {section.get('type')}: {section.get('title', 'Untitled')}")
        
        return True
    else:
        print(f"  ❌ Enhancement failed")
        return False


def show_status():
    """Show enhancement progress status."""
    print("\n" + "=" * 60)
    print("  LESSON ENHANCEMENT STATUS")
    print("=" * 60)
    
    progress = load_progress()
    
    total_lessons = 0
    enhanced_count = 0
    
    for section in CPA_SECTIONS:
        lessons = load_lessons(section)
        section_total = len(lessons)
        section_enhanced = sum(1 for l in lessons if is_already_enhanced(l))
        
        total_lessons += section_total
        enhanced_count += section_enhanced
        
        pct = (section_enhanced / section_total * 100) if section_total > 0 else 0
        bar = '█' * int(pct / 5) + '░' * (20 - int(pct / 5))
        
        print(f"  {section.upper():4} [{bar}] {section_enhanced:3}/{section_total:3} ({pct:5.1f}%)")
    
    print("-" * 60)
    total_pct = (enhanced_count / total_lessons * 100) if total_lessons > 0 else 0
    print(f"  TOTAL: {enhanced_count}/{total_lessons} lessons enhanced ({total_pct:.1f}%)")
    
    if progress.get('last_run'):
        print(f"\n  Last run: {progress['last_run']}")
    if progress.get('failed'):
        print(f"  Failed: {len(progress['failed'])} lessons")


def main():
    parser = argparse.ArgumentParser(description='Enhance CPA lessons with interactive content')
    parser.add_argument('--section', help='Section to enhance (far, aud, reg, etc.)')
    parser.add_argument('--lesson', help='Single lesson ID to enhance (e.g., FAR-I-001)')
    parser.add_argument('--all', action='store_true', help='Enhance all sections')
    parser.add_argument('--status', action='store_true', help='Show enhancement status')
    parser.add_argument('--dry-run', action='store_true', help='Preview without saving')
    
    args = parser.parse_args()
    
    if args.status:
        show_status()
        return
    
    if not args.section and not args.lesson and not args.all:
        parser.print_help()
        sys.exit(1)
    
    print("=" * 60)
    print("  LESSON ENHANCEMENT - JSON Pipeline")
    print("=" * 60)
    
    if args.dry_run:
        print("🔍 DRY RUN MODE - No files will be modified\n")
    
    if args.lesson:
        success = process_single_lesson(args.lesson, args.dry_run)
        sys.exit(0 if success else 1)
    
    sections = CPA_SECTIONS if args.all else [args.section]
    
    total_stats = {'processed': 0, 'enhanced': 0, 'skipped': 0, 'failed': 0}
    
    for section in sections:
        stats = process_section(section, args.dry_run)
        for key in total_stats:
            total_stats[key] += stats[key]
    
    print("\n" + "=" * 60)
    print("  ENHANCEMENT SUMMARY")
    print("=" * 60)
    print(f"  Processed: {total_stats['processed']}")
    print(f"  Enhanced:  {total_stats['enhanced']}")
    print(f"  Skipped:   {total_stats['skipped']}")
    print(f"  Failed:    {total_stats['failed']}")


if __name__ == '__main__':
    main()
