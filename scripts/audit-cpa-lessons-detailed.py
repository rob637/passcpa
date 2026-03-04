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

def check_lesson(section, lesson):
    l_id = lesson.get('id', 'MISSING_ID')
    title = lesson.get('title', 'MISSING_TITLE')
    desc = lesson.get('description', '')
    content = lesson.get('content', '')
    
    if not isinstance(content, str):
        content = json.dumps(content)
        
    # 1. ID Check
    if l_id == 'MISSING_ID':
        issues.append(f"[{section}] Lesson missing ID (Title: {title})")
        return # Skip further checks
        
    # 2. Duplicate ID check (handled globally if needed, currently per-file loop)
        
    # 3. Title Check
    if title == 'MISSING_TITLE' or len(title) < 5:
        issues.append(f"[{section}] {l_id}: Title too short or missing")
        
    # 4. Description Check
    if len(desc) < 20: 
        issues.append(f"[{section}] {l_id}: Description too short (< 20 chars)")
    if "coming soon" in desc.lower() or "tbd" in desc.lower():
        issues.append(f"[{section}] {l_id}: Description contains placeholder")
        
    # 5. Content Validations
    if len(content.strip()) < 100:
        issues.append(f"[{section}] {l_id}: Content extremely short (< 100 chars)")
        
    placeholders = ["lorem ipsum", "coming soon", "todo:", "tbd", "undefined", "null"]
    lower_content = content.lower()
    for p in placeholders:
        if p in lower_content:
             issues.append(f"[{section}] {l_id}: Content contains placeholder '{p}'")
             
    # Check for empty markdown links
    if re.search(r'\[\s*\]\(\s*\)', content):
        issues.append(f"[{section}] {l_id}: Empty markdown link []()")
        
    # Check for code blocks
    # Ensure ``` are matched
    if content.count('```') % 2 != 0:
         issues.append(f"[{section}] {l_id}: Unclosed code block (odd number of backticks)")
         
    # 6. Metadata Check
    if 'topics' not in lesson or not lesson['topics']:
        issues.append(f"[{section}] {l_id}: Missing 'topics' array")
        
    if 'difficulty' not in lesson:
        issues.append(f"[{section}] {l_id}: Missing 'difficulty'")
        
    if 'duration' not in lesson or lesson['duration'] == 0:
         issues.append(f"[{section}] {l_id}: Invalid 'duration' (0 or missing)")
         
    if 'order' not in lesson:
         issues.append(f"[{section}] {l_id}: Missing 'order'")


for section, file_path in files.items():
    if not os.path.exists(file_path):
        print(f"Skipping {section} - file not found")
        continue

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        lessons_list = data if isinstance(data, list) else data.get('lessons', [])
        
        # Check for duplicates or gaps
        seen_ids = set()
        orders = []
        
        for lesson in lessons_list:
            if 'id' in lesson:
                if lesson['id'] in seen_ids:
                    issues.append(f"[{section}] Duplicate ID found: {lesson['id']}")
                seen_ids.add(lesson['id'])
            
            if 'order' in lesson:
                orders.append(lesson['order'])
            
            check_lesson(section, lesson)
            
        # Check order continuity
        if orders:
            orders.sort()
            # simple check for gaps? maybe not critical
            
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

if not issues:
    print("\nNo major issues found based on heuristics.")
else:
    print(f"\nFound {len(issues)} potential issues:")
    for i in issues:
        print(f"- {i}")
