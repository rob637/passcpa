#!/usr/bin/env python3
"""
Lesson Engagement Enhancer
Adds 4 engaging section types to lessons:
1. Real Talk - Practitioner perspectives with personality  
2. Common Mistake - What students get wrong
3. Mini Case Study - Named characters facing real scenarios
4. In Practice - How concepts apply in the real world
"""

import json
import os
import time
import requests
import sys
from pathlib import Path

# Gemini API config
GEMINI_API_KEY = os.environ.get('VITE_GEMINI_API_KEY')
if not GEMINI_API_KEY:
    print("ERROR: VITE_GEMINI_API_KEY not set")
    sys.exit(1)

GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"

def call_gemini(prompt: str, max_retries: int = 3) -> str:
    """Call Gemini API with retry logic."""
    for attempt in range(max_retries):
        try:
            response = requests.post(
                GEMINI_URL,
                headers={"Content-Type": "application/json"},
                json={
                    "contents": [{"parts": [{"text": prompt}]}],
                    "generationConfig": {
                        "temperature": 0.7,
                        "maxOutputTokens": 2000
                    }
                },
                timeout=60
            )
            
            if response.status_code == 429:
                wait = 30 * (attempt + 1)
                print(f"  Rate limited, waiting {wait}s...")
                time.sleep(wait)
                continue
                
            response.raise_for_status()
            data = response.json()
            text = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
            return text
        except Exception as e:
            if attempt < max_retries - 1:
                time.sleep(5)
            else:
                raise e
    return ""

def generate_engagement_sections(lesson: dict, exam_context: str) -> list:
    """Generate 4 engaging sections for a lesson."""
    
    title = lesson.get('title', 'Unknown')
    description = lesson.get('description', '')
    topics = ', '.join(lesson.get('topics', []))
    section = lesson.get('section', '')
    
    # Get summary of existing content
    existing_sections = lesson.get('content', {}).get('sections', [])
    content_summary = ""
    for s in existing_sections[:5]:  # First 5 sections
        if s.get('type') == 'text':
            content_summary += s.get('content', '')[:300] + "\n"
    
    prompt = f"""You are enhancing exam prep lessons to be more engaging and memorable.

LESSON INFO:
- Exam: {exam_context}
- Section: {section}
- Title: {title}
- Description: {description}
- Topics: {topics}
- Content Preview: {content_summary[:500]}

Generate EXACTLY 4 engagement sections in valid JSON format. Each must be unique and valuable:

1. "real-talk" - A practitioner's perspective with personality. Conversational tone, maybe slightly humorous.
   Example: "Look, I've been doing tax returns for 15 years, and I can tell you that 90% of the mistakes I see from new EAs come down to..."

2. "common-mistake" - A specific mistake students make on this topic, with why it's wrong and how to avoid it.
   Example: "Students often confuse [X] with [Y] because... The key difference is..."

3. "case-study" - A mini scenario with a named character. 2-3 sentences setup, then the learning point.
   Example: "Maria, a new audit senior at a regional firm, just received a confirmation exception..."

4. "in-practice" - How this concept applies in actual professional work. Real-world relevance.
   Example: "In a typical month, you'll encounter this when... That's why mastering it now saves hours later."

Return ONLY a JSON array with exactly 4 objects. Each object must have:
- "type": one of ["real-talk", "common-mistake", "case-study", "in-practice"]
- "title": a short engaging title (max 50 chars)
- "content": the engaging text (100-200 words each)

IMPORTANT:
- Be specific to THIS lesson's topic, not generic
- Use realistic details and numbers
- Make it memorable and useful
- NO markdown in content fields
- Return ONLY valid JSON, no other text

JSON array:"""

    response = call_gemini(prompt)
    
    # Parse JSON from response
    try:
        # Find JSON array in response
        start = response.find('[')
        end = response.rfind(']') + 1
        if start >= 0 and end > start:
            json_str = response[start:end]
            sections = json.loads(json_str)
            
            # Validate and format sections
            valid_types = ['real-talk', 'common-mistake', 'case-study', 'in-practice']
            formatted = []
            for s in sections:
                if s.get('type') in valid_types and s.get('content'):
                    formatted.append({
                        "type": s['type'],
                        "title": s.get('title', s['type'].replace('-', ' ').title()),
                        "content": s['content']
                    })
            return formatted
    except json.JSONDecodeError:
        pass
    
    return []

def has_engagement_sections(lesson: dict) -> bool:
    """Check if lesson already has engagement sections."""
    sections = lesson.get('content', {}).get('sections', [])
    engagement_types = {'real-talk', 'common-mistake', 'case-study', 'in-practice'}
    for s in sections:
        if s.get('type') in engagement_types:
            return True
    return False

def enhance_lesson(lesson: dict, exam_context: str) -> tuple[dict, bool]:
    """Add engagement sections to a lesson. Returns (lesson, was_enhanced)."""
    
    if has_engagement_sections(lesson):
        return lesson, False
    
    # Generate new sections
    new_sections = generate_engagement_sections(lesson, exam_context)
    
    if not new_sections:
        return lesson, False
    
    # Insert after summary (if exists) or at end before key-takeaways
    sections = lesson.get('content', {}).get('sections', [])
    
    # Find good insertion point - before key takeaways or summary
    insert_idx = len(sections)
    for i, s in enumerate(sections):
        if s.get('type') == 'summary' or s.get('title', '').lower() == 'key takeaways':
            insert_idx = i
            break
    
    # Insert engagement marker
    marker = {
        "type": "text",
        "title": "",
        "content": "<!-- ENGAGEMENT SECTIONS (2026-02-28) -->"
    }
    
    sections.insert(insert_idx, marker)
    insert_idx += 1
    
    # Insert new sections
    for s in new_sections:
        sections.insert(insert_idx, s)
        insert_idx += 1
    
    lesson['content']['sections'] = sections
    return lesson, True

def process_json_file(filepath: str, exam_context: str) -> tuple[int, int]:
    """Process a JSON lesson file. Returns (total, enhanced)."""
    
    print(f"\nProcessing: {filepath}")
    
    with open(filepath, 'r') as f:
        lessons = json.load(f)
    
    total = len(lessons)
    enhanced = 0
    
    for i, lesson in enumerate(lessons):
        lesson_id = lesson.get('id', f'lesson-{i}')
        title = lesson.get('title', 'Unknown')[:40]
        
        if has_engagement_sections(lesson):
            print(f"  [{i+1}/{total}] {lesson_id} - Already enhanced")
            continue
        
        print(f"  [{i+1}/{total}] {lesson_id} - Enhancing...")
        
        try:
            lessons[i], was_enhanced = enhance_lesson(lesson, exam_context)
            if was_enhanced:
                enhanced += 1
                print(f"    ✓ Added 4 engagement sections")
            else:
                print(f"    ⚠ No sections generated")
        except Exception as e:
            print(f"    ✗ Error: {e}")
        
        # Rate limiting
        time.sleep(1.5)
        
        # Save progress every 10 lessons
        if enhanced > 0 and enhanced % 10 == 0:
            with open(filepath, 'w') as f:
                json.dump(lessons, f, indent=2)
            print(f"    [Saved progress: {enhanced} enhanced]")
    
    # Final save
    with open(filepath, 'w') as f:
        json.dump(lessons, f, indent=2)
    
    return total, enhanced

def get_exam_context(filepath: str) -> str:
    """Determine exam context from filepath."""
    path_lower = filepath.lower()
    
    if '/cpa/' in path_lower:
        if 'far' in path_lower: return "CPA Exam - FAR (Financial Accounting and Reporting)"
        if 'aud' in path_lower: return "CPA Exam - AUD (Auditing and Attestation)"
        if 'reg' in path_lower: return "CPA Exam - REG (Regulation/Tax)"
        if 'bar' in path_lower: return "CPA Exam - BAR (Business Analysis and Reporting)"
        if 'isc' in path_lower: return "CPA Exam - ISC (Information Systems and Controls)"
        if 'tcp' in path_lower: return "CPA Exam - TCP (Tax Compliance and Planning)"
        return "CPA Exam"
    elif '/ea/' in path_lower:
        return "Enrolled Agent (EA) Exam - IRS Tax Practice"
    elif '/cma/' in path_lower:
        return "CMA Exam - Certified Management Accountant"
    elif '/cia/' in path_lower:
        return "CIA Exam - Certified Internal Auditor"
    elif '/cisa/' in path_lower:
        return "CISA Exam - Certified Information Systems Auditor"
    elif '/cfp/' in path_lower:
        return "CFP Exam - Certified Financial Planner"
    
    return "Professional Certification Exam"

def main():
    """Main entry point."""
    import argparse
    
    parser = argparse.ArgumentParser(description='Enhance lesson engagement')
    parser.add_argument('--exam', choices=['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp', 'all'], 
                       default='all', help='Which exam to process')
    parser.add_argument('--limit', type=int, default=0, help='Limit lessons per file')
    parser.add_argument('--status', action='store_true', help='Show status only')
    args = parser.parse_args()
    
    base_path = Path('/workspaces/passcpa/src/data')
    
    # Find all JSON lesson files
    exam_dirs = {
        'cpa': base_path / 'cpa' / 'lessons' / 'json',
        'ea': base_path / 'ea' / 'lessons' / 'json',
        'cma': base_path / 'cma' / 'lessons' / 'json',
        'cia': base_path / 'cia' / 'lessons' / 'json',
        'cisa': base_path / 'cisa' / 'lessons' / 'json',
        'cfp': base_path / 'cfp' / 'lessons' / 'json',
    }
    
    if args.exam != 'all':
        exam_dirs = {args.exam: exam_dirs[args.exam]}
    
    total_lessons = 0
    total_enhanced = 0
    
    for exam, json_dir in exam_dirs.items():
        if not json_dir.exists():
            print(f"⚠ No JSON dir for {exam}: {json_dir}")
            continue
        
        json_files = list(json_dir.glob('*.json'))
        print(f"\n{'='*60}")
        print(f"EXAM: {exam.upper()} - {len(json_files)} files")
        print(f"{'='*60}")
        
        for json_file in sorted(json_files):
            exam_ctx = get_exam_context(str(json_file))
            
            if args.status:
                # Just count
                with open(json_file, 'r') as f:
                    lessons = json.load(f)
                enhanced = sum(1 for l in lessons if has_engagement_sections(l))
                print(f"  {json_file.name}: {enhanced}/{len(lessons)} enhanced")
                total_lessons += len(lessons)
                total_enhanced += enhanced
            else:
                t, e = process_json_file(str(json_file), exam_ctx)
                total_lessons += t
                total_enhanced += e
    
    print(f"\n{'='*60}")
    print(f"SUMMARY: {total_enhanced}/{total_lessons} lessons with engagement sections")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
