import json
import os
import re

files = {
    'AUD': 'src/data/cpa/lessons/json/aud.json',
    'BAR': 'src/data/cpa/lessons/json/bar.json',
    'FAR': 'src/data/cpa/lessons/json/far.json',
    'ISC': 'src/data/cpa/lessons/json/isc.json',
    'REG': 'src/data/cpa/lessons/json/reg.json',
    'TCP': 'src/data/cpa/lessons/json/tcp.json'
}

issues = []

def check_lesson_content(section, l_id, content_obj):
    if not isinstance(content_obj, dict):
        issues.append(f"[{section}] {l_id}: Content is not an object")
        return

    sections = content_obj.get('sections', [])
    if not sections:
        issues.append(f"[{section}] {l_id}: Content has no sections")
        return

    for idx, sec in enumerate(sections):
        s_title = sec.get('title', f'Section {idx}')
        s_type = sec.get('type', 'unknown')
        
        # Check for empty content based on type
        if s_type == 'table':
            rows = sec.get('rows', [])
            if not rows:
                 issues.append(f"[{section}] {l_id}: Table section '{s_title}' has no rows")
        elif s_type == 'list':
            items = sec.get('items', [])
            if not items:
                 issues.append(f"[{section}] {l_id}: List section '{s_title}' has no items")
        elif s_type in ['text', 'callout', 'example']:
            s_content = sec.get('content')
            if not s_content or (isinstance(s_content, str) and len(s_content.strip()) < 10):
                issues.append(f"[{section}] {l_id}: Section '{s_title}' ({s_type}) content empty or too short")
            
            # Check for placeholders in string content
            if isinstance(s_content, str):
                lower_c = s_content.lower()
                for p in ["lorem ipsum", "coming soon", "todo:", "tbd"]:
                    if p in lower_c:
                        issues.append(f"[{section}] {l_id}: Section '{s_title}' contains placeholder '{p}'")
                
                # Check for "null" / "undefined" logic errors in text
                if "undefined" in lower_c:
                     issues.append(f"[{section}] {l_id}: Section '{s_title}' contains 'undefined'")
                     
        # Check title
        if not s_title or len(s_title) < 2:
             issues.append(f"[{section}] {l_id}: Section {idx} missing title")


def check_lesson_completeness(section, lesson):
    l_id = lesson.get('id', 'MISSING_ID')
    
    # Check basics
    if 'blueprintArea' not in lesson: 
         issues.append(f"[{section}] {l_id}: Missing blueprintArea")
    elif not lesson['blueprintArea']:
         issues.append(f"[{section}] {l_id}: Empty blueprintArea")
         
    if 'blueprintTopic' not in lesson:
         issues.append(f"[{section}] {l_id}: Missing blueprintTopic")

    # Check content structure
    content = lesson.get('content')
    if content:
        check_lesson_content(section, l_id, content)
    else:
        issues.append(f"[{section}] {l_id}: Missing 'content' field entirely")

print("Starting audit...")
for sec_name, file_path in files.items():
    if not os.path.exists(file_path):
        print(f"Skipping {sec_name} - not found")
        continue

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        lessons_list = data if isinstance(data, list) else data.get('lessons', [])
        
        for lesson in lessons_list:
            check_lesson_completeness(sec_name, lesson)
            
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

if not issues:
    print("\nNo major content issues found.")
else:
    print(f"\nFound {len(issues)} potential content issues:")
    for i in issues:
        print(f"- {i}")
