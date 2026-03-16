
import os
import glob
import json

# Paths
CONTENT_BASE = '/workspaces/passcpa/content'
DATA_BASE = '/workspaces/passcpa/src/data'

EXAMS = {
    'ea': ['see1', 'see2', 'see3'],
    'cma': ['cma1', 'cma2'],
    'cia': ['cia1', 'cia2', 'cia3'],
    'cisa': ['cisa1', 'cisa2', 'cisa3', 'cisa4', 'cisa5'],
    'cfp': ['CFP-PCR', 'CFP-GEN', 'CFP-RISK', 'CFP-INV', 'CFP-TAX', 'CFP-RET', 'CFP-EST', 'CFP-PSY']
}

def load_json_safely(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error reading JSON {file_path}: {e}")
        return None

def analyze_exam(exam, sections):
    print(f"\n=== {exam.upper()} Audit ===")
    
    q_content_base = os.path.join(CONTENT_BASE, exam)
    src_data_base = os.path.join(DATA_BASE, exam)
    
    # 1. Questions Audit
    total_q = 0
    missing_exp = 0
    short_exp = 0
    found_any_questions = False
    
    for section in sections:
        # Check localized JSONs
        possible_paths = [
            os.path.join(q_content_base, section, 'questions.json'),
            os.path.join(q_content_base, section.lower(), 'questions.json'),
            os.path.join(q_content_base, section.upper(), 'questions.json')
        ]
        
        json_path = next((p for p in possible_paths if os.path.exists(p)), None)
        
        if json_path:
            data = load_json_safely(json_path)
            if data:
                # Handle root-level array or object with 'questions' key
                questions = data if isinstance(data, list) else data.get('questions', [])
                count = len(questions)
                total_q += count
                found_any_questions = True
                
                for q in questions:
                    exp = q.get('explanation', '')
                    if not exp: missing_exp += 1
                    elif len(str(exp)) < 50: short_exp += 1
                    
                print(f"  {section}: {count} questions (JSON)")
        else:
            # Fallback check for TS
            print(f"  {section}: JSON missing")
            
    print(f"Total Questions: {total_q}")
    if missing_exp > 0: print(f"  ❌ {missing_exp} questions have NO explanation")
    if short_exp > 0: print(f"  ⚠️ {short_exp} questions have short (<50 char) explanations")

    # 2. Flashcards Audit
    fc_path = os.path.join(q_content_base, 'flashcards.json')
    if os.path.exists(fc_path):
        data = load_json_safely(fc_path)
        if data:
            cards = data if isinstance(data, list) else data.get('flashcards', [])
            total_fc = len(cards)
            missing_backs = sum(1 for c in cards if not c.get('back'))
            print(f"Total Flashcards (JSON): {total_fc}")
            if missing_backs > 0: print(f"  ❌ {missing_backs} cards missing BACK content")
    else:
        # Check TS count
        ts_fc = glob.glob(os.path.join(src_data_base, 'flashcards', '*.ts'))
        count_ts = sum(1 for f in ts_fc if 'index' not in f)
        if count_ts > 0:
            print(f"Total Flashcards (TS Files): {count_ts} files found (content not parsed)")
        else:
            print("Total Flashcards: 0")

    # 3. Lessons Audit
    # Check src/data/{exam}/lessons/json/*.json
    lessons_dir = os.path.join(src_data_base, 'lessons', 'json')
    if os.path.exists(lessons_dir):
        json_files = glob.glob(os.path.join(lessons_dir, '*.json'))
        total_lessons = 0
        empty_lists = 0
        
        for f in json_files:
            data = load_json_safely(f)
            if data and isinstance(data, list):
                total_lessons += len(data)
                for l in data:
                    content_sections = l.get('content', {}).get('sections', [])
                    for s in content_sections:
                        if s.get('type') == 'list':
                             items = s.get('items', [])
                             if not items:
                                 empty_lists += 1
                                 
        print(f"Total Lessons: {total_lessons}")
        if empty_lists > 0: print(f"  ❌ {empty_lists} empty list sections found (Blockers)")
    else:
        print("Total Lessons: 0 (No JSON lessons directory)")

    # 4. Simulations / Essays Audit
    sim_types = ['tbs.json', 'essays.json', 'case-studies.json']
    sim_total = 0
    
    # Check global for exam
    for st in sim_types:
        p = os.path.join(q_content_base, st)
        if os.path.exists(p):
            data = load_json_safely(p)
            if data:
                # heuristic: grab first list value or use direct list
                items = data if isinstance(data, list) else (list(data.values())[0] if data else [])
                count = len(items) if isinstance(items, list) else 0
                sim_total += count
                print(f"  Found {count} global {st.replace('.json','')}")

    # Check per section
    for section in sections:
        for st in sim_types:
            possible_paths = [
                os.path.join(q_content_base, section, st),
                os.path.join(q_content_base, section.lower(), st)
            ]
            p = next((path for path in possible_paths if os.path.exists(path)), None)
            
            if p:
                data = load_json_safely(p)
                if data:
                    items = data if isinstance(data, list) else (list(data.values())[0] if data else [])
                    count = len(items) if isinstance(items, list) else 0
                    sim_total += count
                    print(f"  Found {count} {st.replace('.json','')} in {section}")
                    
    print(f"Total Simulations/Essays: {sim_total}")

if __name__ == "__main__":
    for exam, sections in EXAMS.items():
        analyze_exam(exam, sections)
