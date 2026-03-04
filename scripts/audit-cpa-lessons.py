import json
import os
import re

files = [
    'src/data/cpa/lessons/json/aud.json',
    'src/data/cpa/lessons/json/bar.json',
    'src/data/cpa/lessons/json/far.json',
    'src/data/cpa/lessons/json/isc.json',
    'src/data/cpa/lessons/json/reg.json',
    'src/data/cpa/lessons/json/tcp.json'
]

issues = []

def check_lesson(section, lesson):
    l_id = lesson.get('id', 'MISSING_ID')
    title = lesson.get('title', 'MISSING_TITLE')
    content = lesson.get('content', '')
    
    if not isinstance(content, str):
        content = json.dumps(content) # Sometimes content is object?
    
    # 1. Check for ID
    if l_id == 'MISSING_ID':
        issues.append(f"[{section}] Lesson missing ID (Title: {title})")
        return

    # 2. Check content length
    if len(content.strip()) < 50:
        issues.append(f"[{section}] {l_id}: Content too short (< 50 chars)")
    
    # 3. Check for placeholders
    placeholders = ["lorem ipsum", "coming soon", "todo:", "tbd", "undefined", "null"]
    lower_content = content.lower()
    for p in placeholders:
        if p in lower_content:
             issues.append(f"[{section}] {l_id}: Contains placeholder text '{p}'")

    # 4. Check for broken markdown links or images
    # e.g. check for EMPTY markdown links []()
    if re.search(r'\[\s*\]\(\s*\)', content):
        issues.append(f"[{section}] {l_id}: Empty markdown link []()")
    
    # 5. Check for missing required fields (topics)
    if 'topics' not in lesson or not lesson['topics']:
         issues.append(f"[{section}] {l_id}: Missing 'topics' array or empty")
    

for file_path in files:
    section = os.path.basename(file_path).replace('.json', '').upper()
    if not os.path.exists(file_path):
        print(f"Skipping {file_path} - not found")
        continue
        
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        lessons = data if isinstance(data, list) else data.get('lessons', [])
        
        print(f"Checking {section} ({len(lessons)} lessons)...")
        
        for lesson in lessons:
            check_lesson(section, lesson)
            
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

if not issues:
    print("\nNo major issues found based on heuristics.")
else:
    print(f"\nFound {len(issues)} potential issues:")
    for i in issues:
        print(f"- {i}")
