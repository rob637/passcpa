#!/usr/bin/env python3
"""
Multi-Course Lesson Enhancement Pipeline

Enhances lessons for all 6 exams: CPA, EA, CMA, CIA, CISA, CFP
Uses Gemini AI to generate interactive sections (knowledge checks, reveals, comparisons)

Usage:
    python enhance_all_courses.py --status              # Show progress
    python enhance_all_courses.py --course ea           # Enhance one course
    python enhance_all_courses.py --all                 # Enhance all courses
    python enhance_all_courses.py --course cisa --dry-run
"""

import os
import sys
import json
import urllib.request
import urllib.error
import argparse
from pathlib import Path
from datetime import datetime
from typing import Optional, Dict, List

# Paths
WORKSPACE = Path('/workspaces/passcpa')
BACKUP_DIR = WORKSPACE / 'content_factory' / 'lesson_enhancement' / 'json_backups'

# Course configurations - JSON directory and sections for each course
COURSE_CONFIGS = {
    'cpa': {
        'json_dir': WORKSPACE / 'src' / 'data' / 'cpa' / 'lessons' / 'json',
        'sections': ['far', 'aud', 'reg', 'bar', 'isc', 'tcp'],
        'exam_name': 'CPA Exam',
    },
    'ea': {
        'json_dir': WORKSPACE / 'src' / 'data' / 'ea' / 'lessons' / 'json',
        'sections': ['see1', 'see2', 'see3'],
        'exam_name': 'EA Exam (Special Enrollment Examination)',
    },
    'cma': {
        'json_dir': WORKSPACE / 'src' / 'data' / 'cma' / 'lessons' / 'json',
        'sections': ['cma1-a', 'cma1-b', 'cma1-c', 'cma1-d', 'cma1-e', 'cma1-f',
                     'cma2-a', 'cma2-b', 'cma2-c', 'cma2-d', 'cma2-e', 'cma2-f'],
        'exam_name': 'CMA Exam (Certified Management Accountant)',
    },
    'cia': {
        'json_dir': WORKSPACE / 'src' / 'data' / 'cia' / 'lessons' / 'json',
        'sections': ['cia1', 'cia1-batch2', 'cia1-batch3',
                     'cia2', 'cia2-batch2', 'cia2-batch3', 'cia2-domain-iii',
                     'cia3', 'cia3-batch2', 'cia3-batch3',
                     'cia-batch3', 'cia-batch4', 'cia-batch5',
                     'gias-2024', 'cia-missing'],
        'exam_name': 'CIA Exam (Certified Internal Auditor)',
    },
    'cisa': {
        'json_dir': WORKSPACE / 'src' / 'data' / 'cisa' / 'lessons' / 'json',
        'sections': ['cisa1', 'cisa1-batch2', 'cisa1-batch3',
                     'cisa2', 'cisa2-batch2',
                     'cisa3', 'cisa3-batch2',
                     'cisa4', 'cisa4-batch2',
                     'cisa5', 'cisa5-batch2'],
        'exam_name': 'CISA Exam (Certified Information Systems Auditor)',
    },
    'cfp': {
        'json_dir': WORKSPACE / 'src' / 'data' / 'cfp' / 'lessons' / 'json',
        'sections': ['gen-financial-statements', 'gen-time-value', 'gen-economic', 'gen-education',
                     'inv-theory', 'inv-vehicles', 'inv-portfolio',
                     'ris-fundamentals', 'ris-life', 'ris-health', 'ris-property',
                     'tax-fundamentals', 'tax-strategies', 'tax-advanced',
                     'ret-needs', 'ret-employer', 'ret-individual', 'ret-executive', 'ret-special', 'ret-advanced',
                     'est-documents', 'est-transfers', 'est-taxation', 'est-advanced',
                     'psy-behavioral', 'psy-counseling',
                     'pro-standards', 'pro-regulations', 'pro-fiduciary'],
        'exam_name': 'CFP Exam (Certified Financial Planner)',
    },
}

# Gemini API
GEMINI_API_KEY = os.environ.get('VITE_GEMINI_API_KEY', '')
GEMINI_MODEL = 'gemini-2.0-flash'
GEMINI_URL = f'https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent?key={GEMINI_API_KEY}'

def get_enhancement_prompt(exam_name: str) -> str:
    """Generate the enhancement prompt for a specific exam."""
    return f'''You are an expert {exam_name} tutor. Analyze this lesson and generate 2-4 interactive sections that will help students learn and retain the material.

LESSON:
Title: {{title}}
Section: {{section}}
Topics: {{topics}}
Content Summary: {{content_summary}}

Generate interactive sections in this JSON format. Return ONLY valid JSON, no markdown:

{{{{
  "sections": [
    {{{{
      "type": "knowledge-check",
      "title": "Check Your Understanding",
      "knowledgeCheck": {{{{
        "question": "A clear, exam-style multiple choice question",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctIndex": 0,
        "explanation": "Why the correct answer is right",
        "hint": "Optional hint for struggling students"
      }}}}
    }}}},
    {{{{
      "type": "reveal",
      "title": "Test Yourself",
      "reveal": {{{{
        "question": "A concept to test recall",
        "answer": "The detailed answer"
      }}}}
    }}}},
    {{{{
      "type": "comparison",
      "title": "Key Differences",
      "comparison": {{{{
        "headers": ["Concept A", "Concept B"],
        "rows": [
          {{{{"label": "Feature 1", "values": ["A value", "B value"]}}}},
          {{{{"label": "Feature 2", "values": ["A value", "B value"]}}}}
        ]
      }}}}
    }}}}
  ]
}}}}

Rules:
1. Knowledge checks should be {exam_name} level - challenging but fair
2. Make questions specific to THIS lesson's content
3. Reveal sections should test key concepts students need to memorize
4. Comparisons are great for similar concepts that are often confused
5. Generate 2-4 sections total, mixing types as appropriate
6. Keep explanations thorough but concise'''


def load_progress(course: str) -> dict:
    """Load enhancement progress tracking for a course."""
    progress_file = WORKSPACE / 'content_factory' / 'lesson_enhancement' / f'progress_{course}.json'
    if progress_file.exists():
        with open(progress_file, 'r') as f:
            return json.load(f)
    return {'enhanced': [], 'failed': [], 'last_run': None}


def save_progress(course: str, progress: dict):
    """Save enhancement progress for a course."""
    progress_file = WORKSPACE / 'content_factory' / 'lesson_enhancement' / f'progress_{course}.json'
    progress['last_run'] = datetime.now().isoformat()
    with open(progress_file, 'w') as f:
        json.dump(progress, f, indent=2)


def backup_json(course: str, section: str, json_dir: Path) -> Path:
    """Create timestamped backup of JSON file."""
    course_backup_dir = BACKUP_DIR / course
    course_backup_dir.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    
    source = json_dir / f"{section}.json"
    backup_path = course_backup_dir / f"{section}_{timestamp}.json"
    
    if source.exists():
        with open(source, 'r') as f:
            content = f.read()
        with open(backup_path, 'w') as f:
            f.write(content)
    
    return backup_path


def load_lessons(json_dir: Path, section: str) -> list:
    """Load lessons from JSON file."""
    json_file = json_dir / f"{section}.json"
    if not json_file.exists():
        return []
    
    with open(json_file, 'r') as f:
        return json.load(f)


def save_lessons(json_dir: Path, section: str, lessons: list):
    """Save lessons to JSON file."""
    json_file = json_dir / f"{section}.json"
    with open(json_file, 'w') as f:
        json.dump(lessons, f, indent=2)


def get_content_summary(lesson: dict) -> str:
    """Extract a summary of lesson content for the prompt."""
    content = lesson.get('content', {})
    sections = content.get('sections', [])
    
    summary_parts = []
    for section in sections[:5]:
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
    text = response.strip()
    if text.startswith('```'):
        lines = text.split('\n')
        lines = [l for l in lines if not l.startswith('```')]
        text = '\n'.join(lines)
    
    try:
        data = json.loads(text)
        return data.get('sections', [])
    except json.JSONDecodeError:
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


def enhance_lesson(lesson: dict, exam_name: str) -> list:
    """Generate interactive sections for a lesson."""
    title = lesson.get('title', 'Unknown')
    section = lesson.get('section', 'Unknown')
    topics = ', '.join(lesson.get('topics', []))
    content_summary = get_content_summary(lesson)
    
    prompt_template = get_enhancement_prompt(exam_name)
    prompt = prompt_template.format(
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


def process_course(course: str, dry_run: bool = False) -> Dict[str, int]:
    """Process all lessons for a course."""
    config = COURSE_CONFIGS.get(course)
    if not config:
        print(f"  ❌ Unknown course: {course}")
        return {'processed': 0, 'enhanced': 0, 'skipped': 0, 'failed': 0}
    
    json_dir = config['json_dir']
    sections = config['sections']
    exam_name = config['exam_name']
    
    print(f"\n{'='*60}")
    print(f"  ENHANCING {course.upper()} LESSONS")
    print(f"  {exam_name}")
    print(f"{'='*60}")
    
    if not json_dir.exists():
        print(f"  ❌ JSON directory not found: {json_dir}")
        return {'processed': 0, 'enhanced': 0, 'skipped': 0, 'failed': 0}
    
    progress = load_progress(course)
    total_stats = {'processed': 0, 'enhanced': 0, 'skipped': 0, 'failed': 0}
    
    for section_name in sections:
        json_file = json_dir / f"{section_name}.json"
        if not json_file.exists():
            print(f"\n  ⚠️  {section_name}.json not found, skipping")
            continue
            
        print(f"\n📚 Processing {section_name}...")
        
        lessons = load_lessons(json_dir, section_name)
        if not lessons:
            print(f"  ⚠️  No lessons found")
            continue
        
        print(f"  Found {len(lessons)} lessons")
        
        # Backup before modifying
        if not dry_run:
            backup_json(course, section_name, json_dir)
        
        section_enhanced = 0
        
        for i, lesson in enumerate(lessons):
            lesson_id = lesson.get('id', f'lesson-{i}')
            
            # Skip already enhanced
            if is_already_enhanced(lesson):
                print(f"  ⏭️  {lesson_id} - already enhanced")
                total_stats['skipped'] += 1
                continue
            
            # Skip previously processed
            if lesson_id in progress.get('enhanced', []):
                print(f"  ⏭️  {lesson_id} - previously done")
                total_stats['skipped'] += 1
                continue
            
            print(f"  🔄 {lesson_id}...", end=' ', flush=True)
            
            new_sections = enhance_lesson(lesson, exam_name)
            
            if new_sections:
                total_stats['enhanced'] += 1
                section_enhanced += 1
                print(f"✅ +{len(new_sections)} sections")
                
                if not dry_run:
                    content = lesson.get('content', {})
                    existing_sections = content.get('sections', [])
                    existing_sections.extend(new_sections)
                    content['sections'] = existing_sections
                    lesson['content'] = content
                    
                    progress['enhanced'].append(lesson_id)
            else:
                total_stats['failed'] += 1
                print(f"❌ failed")
                if not dry_run:
                    progress['failed'].append(lesson_id)
            
            total_stats['processed'] += 1
        
        # Save updated lessons for this section
        if not dry_run and section_enhanced > 0:
            save_lessons(json_dir, section_name, lessons)
            save_progress(course, progress)
            print(f"  💾 Saved {section_name}.json with {section_enhanced} enhanced lessons")
    
    return total_stats


def show_status():
    """Show enhancement progress status for all courses."""
    print("\n" + "=" * 70)
    print("  LESSON ENHANCEMENT STATUS - ALL COURSES")
    print("=" * 70)
    
    grand_total_lessons = 0
    grand_total_enhanced = 0
    
    for course, config in COURSE_CONFIGS.items():
        json_dir = config['json_dir']
        sections = config['sections']
        
        course_lessons = 0
        course_enhanced = 0
        
        for section in sections:
            json_file = json_dir / f"{section}.json"
            if not json_file.exists():
                continue
            
            try:
                with open(json_file, 'r') as f:
                    lessons = json.load(f)
                
                section_total = len(lessons)
                section_enhanced = sum(1 for l in lessons if is_already_enhanced(l))
                
                course_lessons += section_total
                course_enhanced += section_enhanced
            except:
                pass
        
        grand_total_lessons += course_lessons
        grand_total_enhanced += course_enhanced
        
        if course_lessons > 0:
            pct = (course_enhanced / course_lessons * 100)
            bar = '█' * int(pct / 5) + '░' * (20 - int(pct / 5))
            print(f"  {course.upper():5} [{bar}] {course_enhanced:4}/{course_lessons:4} ({pct:5.1f}%)")
        else:
            print(f"  {course.upper():5} [No lessons found]")
    
    print("-" * 70)
    if grand_total_lessons > 0:
        total_pct = (grand_total_enhanced / grand_total_lessons * 100)
        print(f"  TOTAL: {grand_total_enhanced}/{grand_total_lessons} lessons enhanced ({total_pct:.1f}%)")


def main():
    parser = argparse.ArgumentParser(description='Enhance lessons for all certification exams')
    parser.add_argument('--course', choices=['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'],
                        help='Specific course to enhance')
    parser.add_argument('--all', action='store_true', help='Enhance all courses')
    parser.add_argument('--status', action='store_true', help='Show enhancement status')
    parser.add_argument('--dry-run', action='store_true', help='Preview without saving')
    
    args = parser.parse_args()
    
    if args.status:
        show_status()
        return
    
    if not args.course and not args.all:
        parser.print_help()
        sys.exit(1)
    
    if args.dry_run:
        print("🔍 DRY RUN MODE - No files will be modified\n")
    
    courses_to_process = list(COURSE_CONFIGS.keys()) if args.all else [args.course]
    
    # Skip CPA if already done (check status)
    if args.all:
        cpa_config = COURSE_CONFIGS['cpa']
        cpa_json = cpa_config['json_dir'] / 'far.json'
        if cpa_json.exists():
            with open(cpa_json) as f:
                far_lessons = json.load(f)
            cpa_enhanced = sum(1 for l in far_lessons if is_already_enhanced(l))
            if cpa_enhanced > len(far_lessons) * 0.9:  # >90% done
                print("ℹ️  CPA already enhanced, skipping...")
                courses_to_process.remove('cpa')
    
    all_stats = {}
    
    for course in courses_to_process:
        stats = process_course(course, args.dry_run)
        all_stats[course] = stats
    
    # Summary
    print("\n" + "=" * 60)
    print("  ENHANCEMENT SUMMARY")
    print("=" * 60)
    
    total_enhanced = 0
    total_failed = 0
    
    for course, stats in all_stats.items():
        print(f"  {course.upper():5}: {stats['enhanced']} enhanced, {stats['failed']} failed, {stats['skipped']} skipped")
        total_enhanced += stats['enhanced']
        total_failed += stats['failed']
    
    print("-" * 60)
    print(f"  TOTAL: {total_enhanced} lessons enhanced, {total_failed} failed")
    
    if not args.dry_run:
        print(f"\n✅ Run 'npm run build' to verify, then 'npm run deploy:prod' to deploy")


if __name__ == '__main__':
    main()
