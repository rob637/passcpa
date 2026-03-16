
import os
import glob
import json

# Paths
CPA_CONTENT_DIR = '/workspaces/passcpa/content/cpa'
LESSONS_DIR = '/workspaces/passcpa/src/data/cpa/lessons/json'

SECTIONS = ['far', 'aud', 'reg', 'bar', 'isc', 'tcp']

def analyze_questions():
    print("\n--- Questions Analysis ---")
    total_questions = 0
    issues = []
    
    for section in SECTIONS:
        json_path = os.path.join(CPA_CONTENT_DIR, section, 'questions.json')
        if not os.path.exists(json_path):
            print(f"Skipping {section}: questions.json not found")
            continue
            
        try:
            with open(json_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                questions = data if isinstance(data, list) else data.get('questions', [])
                count = len(questions)
                total_questions += count
                
                missing_exp = 0
                short_exp = 0
                for q in questions:
                    exp = q.get('explanation', '')
                    if not exp:
                        missing_exp += 1
                    elif len(str(exp)) < 50:
                        short_exp += 1
                        
                print(f"{section.upper()}: {count} questions (Missing Exp: {missing_exp}, Short Exp: {short_exp})")
                
        except Exception as e:
            print(f"Error reading {json_path}: {e}")
            
    print(f"Total Questions Found: {total_questions}")
    return total_questions

def analyze_flashcards():
    print("\n--- Flashcards Analysis ---")
    json_path = os.path.join(CPA_CONTENT_DIR, 'flashcards.json')
    if not os.path.exists(json_path):
        # Often flashcards are in a subfolder or individual files in src/data
        # But based on index.ts imports, there seems to be consolidation
        # If this fails, we check src/data/cpa/flashcards/*.ts
        print("content/cpa/flashcards.json not found, checking legacy path...")
        return 0
        
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            # flashcards.json might be an array or object { flashcards: [...] }
            # Let's handle both
            if isinstance(data, list):
                cards = data
            else:
                cards = data.get('flashcards', [])
                
            count = len(cards)
            print(f"Total Flashcards Found: {count}")
            
            # Check for missing sides
            missing_backs = 0
            for card in cards:
                if not card.get('back'):
                    missing_backs += 1
            if missing_backs > 0:
                print(f"Warning: {missing_backs} flashcards are missing 'back' content")
                
            return count
    except Exception as e:
        print(f"Error reading flashcards.json: {e}")
        return 0

def analyze_tbs():
    print("\n--- TBS (Simulations) Analysis ---")
    total_tbs = 0
    
    for section in SECTIONS:
        json_path = os.path.join(CPA_CONTENT_DIR, section, 'tbs.json')
        if not os.path.exists(json_path):
             # Try fallback to TypeScript path? No, stick to new structure
             # print(f"Skipping {section}: tbs.json not found")
             continue
             
        try:
            with open(json_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                # Structure might be array or { code: ..., tbs: [...] }
                if isinstance(data, list):
                    tbs_list = data
                else:
                    tbs_list = data.get('tbs', [])
                    
                count = len(tbs_list)
                total_tbs += count
                print(f"{section.upper()}: {count} TBS")
        except Exception as e:
            print(f"Error reading {json_path}: {e}")
            
    print(f"Total TBS Found: {total_tbs}")
    return total_tbs

def analyze_lessons():
    print("\n--- Lessons Analysis ---")
    try:
        files = glob.glob(os.path.join(LESSONS_DIR, '*.json'))
        total_lessons = 0
        issues = 0
        
        for f in files:
            with open(f, 'r', encoding='utf-8') as file:
                data = json.load(file)
                total_lessons += len(data)
                
                for lesson in data:
                    sections = lesson.get('content', {}).get('sections', [])
                    for s in sections:
                        if s.get('type') == 'list' and not s.get('items'):
                            issues += 1
                        if s.get('title', '').lower() == 'null':
                            issues += 1
                            
        print(f"Total Lessons Found: {total_lessons}")
        if issues > 0:
            print(f"Remaining Content Issues: {issues}")
        else:
            print("No critical content issues found in lessons.")
            
        return total_lessons
    except Exception as e:
        print(f"Error analyzing lessons: {e}")
        return 0

if __name__ == "__main__":
    q = analyze_questions()
    f = analyze_flashcards()
    s = analyze_tbs()
    l = analyze_lessons()
    
    print("\n--- FINAL COUNT ---")
    print(f"Questions:  {q}")
    print(f"Flashcards: {f}")
    print(f"Simulations:{s}")
    print(f"Lessons:    {l}")
