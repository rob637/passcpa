#!/usr/bin/env python3
"""
Course Factory — Automated Exam Prep Course Generator

Researches any professional certification exam via Gemini, then generates
a complete course (MCQs, lessons, flashcards) matching VoraPrep's existing
content schemas. Progress is tracked in a local JSON file that the admin
UI polls via a Cloud Function or direct file read.

Usage:
    python3 scripts/course-factory.py research CISSP
    python3 scripts/course-factory.py generate <job-id>
    python3 scripts/course-factory.py enhance <job-id>
    python3 scripts/course-factory.py assemble <job-id>
    python3 scripts/course-factory.py run CISSP              # All phases
    python3 scripts/course-factory.py status <job-id>
    python3 scripts/course-factory.py list
"""

import os
import sys
import json
import time
import re
import argparse
import hashlib
import uuid
# requests was removed — firebase-admin SDK is used instead
from datetime import datetime, timezone
from pathlib import Path

# Ensure sibling modules are importable regardless of CWD
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Template generators and auto-registration helpers
from course_factory_templates import (
    tpl_lessons_index, tpl_data_index, tpl_courses_barrel,
    tpl_adaptive_engine, tpl_progress_service, tpl_score_predictor,
    tpl_analytics, tpl_cram_mode, tpl_progress_hook,
    auto_update_course_id_type, auto_update_course_registry,
    auto_update_content_registry, auto_update_question_service,
    auto_update_adaptive_engine_adapter, auto_update_exam_service,
)

from dotenv import load_dotenv
load_dotenv('.env.local')
load_dotenv('.env')

import warnings
warnings.filterwarnings('ignore', category=FutureWarning)

import google.generativeai as genai
genai.configure(api_key=os.getenv('VITE_GEMINI_API_KEY'))
MODEL = genai.GenerativeModel('gemini-2.0-flash')

# ─── CONFIG ───────────────────────────────────────────────────────────────────

MCQ_BATCH_SIZE = 10
LESSON_BATCH_SIZE = 2
FLASHCARD_BATCH_SIZE = 15
MAX_RETRIES = 3
RETRY_DELAY = 5

JOBS_DIR = Path('scripts/.course-factory-jobs')
JOBS_DIR.mkdir(parents=True, exist_ok=True)

CONTENT_DIR = Path('content')
SRC_DATA_DIR = Path('src/data')
SRC_COURSES_DIR = Path('src/courses')

# Default content targets (can be overridden via --mcqs, --lessons, --flashcards)
DEFAULT_MCQ_TARGET = 2500
DEFAULT_LESSON_TARGET = 150
DEFAULT_FLASHCARD_TARGET = 800

# Firebase Admin SDK Initialization
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

DB = None
cred_path = os.getenv('GOOGLE_APPLICATION_CREDENTIALS', 'serviceAccountKey.json')
if os.path.exists(cred_path):
    try:
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        DB = firestore.client()
        print("✅ Connected to Firestore via Admin SDK.")
    except Exception as e:
        print(f"⚠️ Failed to initialize Firebase Admin: {e}")
else:
    print("⚠️ WARNING: serviceAccountKey.json not found. Firestore sync disabled.")

# ─── FIRESTORE SDK HELPERS ───────────────────────────────────────────────

def firestore_set(collection: str, doc_id: str, data: dict) -> bool:
    """Write a document to Firestore via Admin SDK. Returns True on success."""
    if not DB: return False
    try:
        DB.collection(collection).document(doc_id).set(data)
        return True
    except Exception as e:
        print(f"  ⚠ Firestore write failed: {str(e)[:100]}")
        return False

def firestore_get(collection: str, doc_id: str) -> dict | None:
    """Read a document from Firestore via Admin SDK."""
    if not DB: return None
    try:
        doc = DB.collection(collection).document(doc_id).get()
        if doc.exists:
            return doc.to_dict()
        return None
    except Exception:
        return None

def firestore_query_by_status(collection: str, status: str) -> list[dict]:
    """Query Firestore for documents with a specific status field."""
    if not DB: return []
    try:
        docs = DB.collection(collection).where(filter=firestore.FieldFilter("status", "==", status)).order_by("createdAt", direction=firestore.Query.ASCENDING).get()
        results = []
        for doc in docs:
            d = doc.to_dict()
            d['id'] = doc.id
            results.append(d)
        return results
    except Exception as e:
        print(f"  ⚠ Firestore query failed: {str(e)[:100]}")
        return []



# ─── JOB PERSISTENCE ─────────────────────────────────────────────────────────

def job_path(job_id: str) -> Path:
    return JOBS_DIR / f"{job_id}.json"


def load_job(job_id: str) -> dict:
    """Load job from local file, falling back to Firestore if not found locally."""
    p = job_path(job_id)
    if p.exists():
        with open(p) as f:
            return json.load(f)
    # Try Firestore
    remote = firestore_get('courseFactory', job_id)
    if remote:
        print(f"  📡 Loaded job from Firestore: {job_id}")
        # Cache locally
        with open(p, 'w') as f:
            json.dump(remote, f, indent=2, ensure_ascii=False)
        return remote
    print(f"❌ Job {job_id} not found locally or in Firestore")
    sys.exit(1)


def save_job(job: dict):
    """Save job to local file and sync to Firestore."""
    p = job_path(job['id'])
    job['updatedAt'] = datetime.now(timezone.utc).isoformat()
    with open(p, 'w') as f:
        json.dump(job, f, indent=2, ensure_ascii=False)
    # Sync to Firestore (non-blocking, best-effort)
    firestore_set('courseFactory', job['id'], job)


def create_job(exam_name: str, mcq_target: int, lesson_target: int, flashcard_target: int) -> dict:
    job_id = f"{exam_name.lower()}-{datetime.now().strftime('%Y%m%d-%H%M%S')}"
    course_id = re.sub(r'[^a-z0-9]', '', exam_name.lower())

    job = {
        'id': job_id,
        'examName': exam_name.upper(),
        'courseId': course_id,
        'createdAt': datetime.now(timezone.utc).isoformat(),
        'updatedAt': datetime.now(timezone.utc).isoformat(),
        'status': 'created',
        'blueprint': None,
        'plan': {
            'mcqTarget': mcq_target,
            'lessonTarget': lesson_target,
            'flashcardTarget': flashcard_target,
        },
        'progress': {
            'phase': 'created',
            'currentSection': '',
            'sectionsComplete': 0,
            'sectionsTotal': 0,
            'mcqsGenerated': 0,
            'lessonsGenerated': 0,
            'flashcardsGenerated': 0,
            'tbsGenerated': 0,
            'mcqsEnhanced': 0,
            'lessonsEnhanced': 0,
            'flashcardsEnhanced': 0,
            'errorsCount': 0,
            'errors': [],
            'startedAt': None,
        },
        'output': {
            'filesGenerated': [],
            'configPath': '',
            'registryUpdated': False,
        },
    }
    save_job(job)
    return job


# ─── GEMINI API ───────────────────────────────────────────────────────────────

def parse_json_response(text: str):
    """Extract JSON from Gemini response, stripping markdown fences."""
    cleaned = text.strip()
    cleaned = re.sub(r'^```(?:json)?\s*\n?', '', cleaned)
    cleaned = re.sub(r'\n?```\s*$', '', cleaned)
    return json.loads(cleaned)


def api_call(prompt: str, retries: int = MAX_RETRIES):
    """Call Gemini with exponential backoff retry."""
    delay = RETRY_DELAY
    for attempt in range(retries):
        try:
            resp = MODEL.generate_content(prompt)
            return parse_json_response(resp.text)
        except json.JSONDecodeError:
            if attempt < retries - 1:
                print(f"    ⚠ JSON parse error, retrying ({attempt + 1}/{retries})...")
                time.sleep(delay)
                delay *= 2
            else:
                raise
        except Exception as e:
            if '429' in str(e) or 'rate' in str(e).lower() or 'quota' in str(e).lower():
                wait = min(delay * 2, 60)
                print(f"    ⏳ Rate limited, waiting {wait}s...")
                time.sleep(wait)
                delay *= 2
            elif attempt < retries - 1:
                print(f"    ⚠ API error: {e}, retrying ({attempt + 1}/{retries})...")
                time.sleep(delay)
                delay *= 2
            else:
                raise


# ─── PHASE 1: RESEARCH ───────────────────────────────────────────────────────

def research_exam(job: dict) -> dict:
    """Use Gemini to research an exam and produce a structured blueprint."""
    exam = job['examName']
    job['status'] = 'researching'
    job['progress']['phase'] = 'research'
    job['progress']['startedAt'] = datetime.now(timezone.utc).isoformat()
    save_job(job)

    print(f"\n🔍 Researching {exam}...")

    prompt = f"""You are an expert on professional certification exams. Research the {exam} exam thoroughly.

Return a JSON object (no markdown fences) with this EXACT structure:
{{
  "examName": "{exam}",
  "fullName": "Full official exam name",
  "provider": "Certifying body (e.g., ISC², ISACA, IMA)",
  "website": "Official exam URL",
  "passingScore": 700,
  "passingScoreMax": 1000,
  "passingScoreNote": "e.g. scaled score, percentage, etc.",
  "totalQuestions": 150,
  "timeAllowedMinutes": 240,
  "questionTypes": ["mcq"],
  "examFormat": "e.g. Computer-Based Testing (CBT), CAT adaptive, etc.",
  "prerequisites": "Experience/education requirements",
  "recertification": "CPE/renewal requirements",
  "costUSD": "Exam registration fee in USD",
  "sections": [
    {{
      "id": "{exam}-D1",
      "name": "Domain/Section name",
      "weight": 15,
      "topics": [
        "Specific topic 1",
        "Specific topic 2",
        "Specific topic 3"
      ]
    }}
  ],
  "authorityRefs": ["Primary reference 1", "Primary reference 2"],
  "studyHoursRecommended": "150-200",
  "difficultyRating": "moderate|challenging|very challenging",
  "targetAudience": "Who takes this exam"
}}

IMPORTANT:
- Include ALL domains/sections of the exam with accurate weights that sum to 100.
- Include 8-15 specific, testable topics per domain.
- Use the MOST CURRENT exam blueprint/outline (2024-2026).
- Weights should be integers representing percentages.
- Be accurate about passing scores, question counts, and time limits.
- Section IDs should follow the pattern: {exam}-D1, {exam}-D2, etc.
"""

    blueprint = api_call(prompt)

    # Validate structure
    required = ['examName', 'fullName', 'provider', 'sections']
    for key in required:
        if key not in blueprint:
            raise ValueError(f"Blueprint missing required field: {key}")

    if not blueprint.get('sections') or len(blueprint['sections']) == 0:
        raise ValueError("Blueprint has no sections")

    # Ensure weights sum to ~100
    total_weight = sum(s.get('weight', 0) for s in blueprint['sections'])
    if total_weight < 90 or total_weight > 110:
        print(f"  ⚠ Warning: Section weights sum to {total_weight}% (expected ~100%)")

    job['blueprint'] = blueprint
    job['status'] = 'researched'
    job['progress']['phase'] = 'researched'
    job['progress']['sectionsTotal'] = len(blueprint['sections'])
    save_job(job)

    print(f"  ✅ Found {len(blueprint['sections'])} domains/sections")
    for s in blueprint['sections']:
        print(f"     {s['id']}: {s['name']} ({s.get('weight', '?')}%) — {len(s.get('topics', []))} topics")

    return job


# ─── PHASE 2: GENERATE CONTENT ───────────────────────────────────────────────

def _distribute_targets(job: dict) -> list:
    """Distribute MCQ/lesson/flashcard targets across sections by weight."""
    sections = job['blueprint']['sections']
    plan = job['plan']

    result = []
    for section in sections:
        weight = section.get('weight', 0) / 100.0
        result.append({
            'section': section,
            'mcqTarget': max(10, round(plan['mcqTarget'] * weight)),
            'lessonTarget': max(2, round(plan['lessonTarget'] * weight)),
            'flashcardTarget': max(5, round(plan['flashcardTarget'] * weight)),
        })
    return result


def _make_question_id(course_id: str, section_id: str, index: int) -> str:
    """Generate a lowercase question ID."""
    sec = section_id.lower().replace('-', '')
    return f"{sec}-{index:03d}"


def _generate_mcqs_for_section(job: dict, section: dict, target: int) -> list:
    """Generate MCQs for a single section via batched Gemini calls."""
    exam = job['examName']
    course_id = job['courseId']
    bp = job['blueprint']
    section_id = section['id']
    topics = section.get('topics', [])

    all_questions = []
    batch_num = 0

    # Checkpoint for this section
    checkpoint_path = JOBS_DIR / f"{job['id']}-mcq-{section_id}.json"
    if checkpoint_path.exists():
        with open(checkpoint_path) as f:
            all_questions = json.load(f)
        print(f"    📂 Resumed {len(all_questions)} existing MCQs for {section_id}")
        if len(all_questions) >= target:
            return all_questions

    while len(all_questions) < target:
        remaining = target - len(all_questions)
        batch_size = min(MCQ_BATCH_SIZE, remaining)
        batch_num += 1

        # Cycle through topics
        topic_idx = (batch_num - 1) % len(topics) if topics else 0
        topic = topics[topic_idx] if topics else section['name']

        # Vary difficulty across batches
        difficulties = ['easy', 'medium', 'medium', 'hard']
        diff_mix = difficulties[batch_num % len(difficulties)]

        prompt = f"""You are an expert {bp['fullName']} ({exam}) exam question writer.

EXAM: {bp['fullName']}
PROVIDER: {bp.get('provider', 'N/A')}
DOMAIN: {section['name']} (Weight: {section.get('weight', '?')}%)
TOPIC FOCUS: {topic}
AUTHORITY REFERENCES: {', '.join(bp.get('authorityRefs', ['official exam guide']))}

Generate {batch_size} unique, exam-quality multiple choice questions.

DIFFICULTY MIX: Primarily {diff_mix} level.
- Easy = direct recall of facts/definitions
- Medium = application to realistic scenarios
- Hard = analysis requiring judgment across multiple concepts

REQUIREMENTS:
- Each question should present a realistic professional scenario
- 4 plausible answer options (no joke answers)
- Correct answer position should vary across questions
- Explanations should cite authoritative sources
- Include why each wrong answer is wrong

Return ONLY a valid JSON array (no markdown):
[
  {{
    "question": "Full scenario-based question text",
    "options": ["A. First option", "B. Second option", "C. Third option", "D. Fourth option"],
    "correctAnswer": 0,
    "explanation": "Detailed explanation citing authoritative source",
    "whyWrong": {{
      "0": "CORRECT: Why this is the right answer",
      "1": "INCORRECT: Why this is wrong",
      "2": "INCORRECT: Why this is wrong",
      "3": "INCORRECT: Why this is wrong"
    }},
    "topic": "{topic}",
    "difficulty": "{diff_mix}",
    "examTip": "Practical test-day advice",
    "memoryAid": "A mnemonic or memorable phrase",
    "bottomLine": "One-sentence summary of the key concept"
  }}
]"""

        try:
            batch = api_call(prompt)
            if not isinstance(batch, list):
                batch = [batch]

            start_idx = len(all_questions) + 1
            for i, q in enumerate(batch):
                q_id = _make_question_id(course_id, section_id, start_idx + i)
                question = {
                    'id': q_id,
                    'courseId': course_id,
                    'section': section_id,
                    'blueprintArea': section_id,
                    'topic': q.get('topic', topic),
                    'subtopic': topic,
                    'difficulty': q.get('difficulty', diff_mix),
                    'skillLevel': 'Application' if diff_mix == 'medium' else ('Remembering' if diff_mix == 'easy' else 'Analysis'),
                    'question': q.get('question', ''),
                    'options': q.get('options', []),
                    'correctAnswer': q.get('correctAnswer', 0),
                    'explanation': q.get('explanation', ''),
                    'whyWrong': q.get('whyWrong', {}),
                    'examTip': q.get('examTip', ''),
                    'memoryAid': q.get('memoryAid', ''),
                    'commonMistake': q.get('commonMistake', ''),
                    'bottomLine': q.get('bottomLine', ''),
                    'reference': ', '.join(bp.get('authorityRefs', [])[:2]),
                    'sourceFile': f'course-factory-{job["id"]}',
                    'version': 1,
                    'status': 'approved',
                }
                all_questions.append(question)

            # Save checkpoint
            with open(checkpoint_path, 'w') as f:
                json.dump(all_questions, f, indent=2, ensure_ascii=False)

        except Exception as e:
            err_msg = f"MCQ batch {batch_num} for {section_id}: {str(e)[:200]}"
            print(f"    ❌ {err_msg}")
            job['progress']['errorsCount'] += 1
            job['progress']['errors'].append({
                'section': section_id,
                'message': err_msg,
                'timestamp': datetime.now(timezone.utc).isoformat(),
            })
            save_job(job)
            # Continue with next batch rather than failing
            continue

        # Update progress
        total_mcqs = sum(1 for _ in all_questions)
        job['progress']['mcqsGenerated'] = _count_total_mcqs(job)
        save_job(job)

        print(f"    📝 {section_id} MCQs: {len(all_questions)}/{target} (batch {batch_num})")

    return all_questions


def _count_total_mcqs(job: dict) -> int:
    """Count total MCQs generated across all sections from checkpoints."""
    total = 0
    if not job.get('blueprint') or not job['blueprint'].get('sections'):
        return 0
    for section in job['blueprint']['sections']:
        cp = JOBS_DIR / f"{job['id']}-mcq-{section['id']}.json"
        if cp.exists():
            with open(cp) as f:
                total += len(json.load(f))
    return total


def _generate_lessons_for_section(job: dict, section: dict, target: int) -> list:
    """Generate lessons for a single section."""
    exam = job['examName']
    course_id = job['courseId']
    bp = job['blueprint']
    section_id = section['id']
    topics = section.get('topics', [])

    all_lessons = []
    checkpoint_path = JOBS_DIR / f"{job['id']}-lessons-{section_id}.json"
    if checkpoint_path.exists():
        with open(checkpoint_path) as f:
            all_lessons = json.load(f)
        if len(all_lessons) >= target:
            return all_lessons

    batch_num = 0
    while len(all_lessons) < target:
        remaining = target - len(all_lessons)
        batch_size = min(LESSON_BATCH_SIZE, remaining)
        batch_num += 1

        # Pick topics for this batch
        batch_topics = []
        for i in range(batch_size):
            idx = (len(all_lessons) + i) % len(topics) if topics else 0
            batch_topics.append(topics[idx] if topics else section['name'])

        prompt = f"""You are an expert {bp['fullName']} ({exam}) instructor.

DOMAIN: {section['name']} (Weight: {section.get('weight', '?')}%)
TOPICS: {json.dumps(batch_topics)}

Create {batch_size} comprehensive lesson(s). Each lesson should teach one topic thoroughly.

Return ONLY a valid JSON array (no markdown):
[
  {{
    "title": "Lesson title",
    "description": "One-line summary",
    "duration": 45,
    "difficulty": "intermediate",
    "topics": ["topic1", "topic2"],
    "content": {{
      "sections": [
        {{
          "title": "Why This Matters",
          "type": "callout",
          "content": "Real-world relevance and exam importance..."
        }},
        {{
          "title": "Key Concepts",
          "type": "text",
          "content": "Core concepts with bullet points and explanations..."
        }},
        {{
          "title": "Deep Dive",
          "type": "text",
          "content": "Detailed analysis with frameworks, examples, and scenarios..."
        }},
        {{
          "title": "Practical Application",
          "type": "text",
          "content": "Real-world scenarios showing how concepts apply..."
        }},
        {{
          "title": "Key Takeaways",
          "type": "callout",
          "content": "Bullet-point summary of the most important points..."
        }}
      ]
    }}
  }}
]"""

        try:
            batch = api_call(prompt)
            if not isinstance(batch, list):
                batch = [batch]

            start_idx = len(all_lessons) + 1
            for i, lesson in enumerate(batch):
                lesson_id = f"{course_id}-{section_id.lower().replace('-', '')}-lesson-{start_idx + i:03d}"
                lesson_obj = {
                    'id': lesson_id,
                    'courseId': course_id,
                    'section': section_id,
                    'blueprintArea': section_id,
                    'title': lesson.get('title', f'{section["name"]} Lesson {start_idx + i}'),
                    'description': lesson.get('description', ''),
                    'order': start_idx + i,
                    'duration': lesson.get('duration', 45),
                    'difficulty': lesson.get('difficulty', 'intermediate'),
                    'topics': lesson.get('topics', batch_topics),
                    'content': lesson.get('content', {'sections': []}),
                    'sourceFile': f'course-factory-{job["id"]}',
                }
                all_lessons.append(lesson_obj)

            with open(checkpoint_path, 'w') as f:
                json.dump(all_lessons, f, indent=2, ensure_ascii=False)

        except Exception as e:
            err_msg = f"Lesson batch {batch_num} for {section_id}: {str(e)[:200]}"
            print(f"    ❌ {err_msg}")
            job['progress']['errorsCount'] += 1
            job['progress']['errors'].append({
                'section': section_id,
                'message': err_msg,
                'timestamp': datetime.now(timezone.utc).isoformat(),
            })
            save_job(job)
            continue

        job['progress']['lessonsGenerated'] = _count_total_items(job, 'lessons')
        save_job(job)
        print(f"    📖 {section_id} Lessons: {len(all_lessons)}/{target} (batch {batch_num})")

    return all_lessons


def _generate_flashcards_for_section(job: dict, section: dict, target: int) -> list:
    """Generate flashcards for a single section."""
    exam = job['examName']
    course_id = job['courseId']
    bp = job['blueprint']
    section_id = section['id']
    topics = section.get('topics', [])

    all_cards = []
    checkpoint_path = JOBS_DIR / f"{job['id']}-fc-{section_id}.json"
    if checkpoint_path.exists():
        with open(checkpoint_path) as f:
            all_cards = json.load(f)
        if len(all_cards) >= target:
            return all_cards

    batch_num = 0
    while len(all_cards) < target:
        remaining = target - len(all_cards)
        batch_size = min(FLASHCARD_BATCH_SIZE, remaining)
        batch_num += 1

        topic_idx = (batch_num - 1) % len(topics) if topics else 0
        topic = topics[topic_idx] if topics else section['name']

        prompt = f"""You are an expert {bp['fullName']} ({exam}) study guide author.

DOMAIN: {section['name']}
TOPIC: {topic}

Generate {batch_size} flashcards for exam preparation. Mix types: definitions, concepts, formulas, comparisons.

Return ONLY a valid JSON array (no markdown):
[
  {{
    "front": "Question or prompt (be specific and exam-focused)",
    "back": "Clear, concise answer with key details",
    "topic": "{topic}",
    "type": "concept",
    "difficulty": "medium",
    "tags": ["tag1", "tag2"]
  }}
]"""

        try:
            batch = api_call(prompt)
            if not isinstance(batch, list):
                batch = [batch]

            start_idx = len(all_cards) + 1
            for i, card in enumerate(batch):
                card_id = f"{course_id}-{section_id.lower().replace('-', '')}-fc-{start_idx + i:03d}"
                fc = {
                    'id': card_id,
                    'courseId': course_id,
                    'section': section_id,
                    'blueprintArea': section_id,
                    'type': card.get('type', 'concept'),
                    'topic': card.get('topic', topic),
                    'front': card.get('front', ''),
                    'back': card.get('back', ''),
                    'difficulty': card.get('difficulty', 'medium'),
                    'tags': card.get('tags', [topic.lower().replace(' ', '-')]),
                }
                all_cards.append(fc)

            with open(checkpoint_path, 'w') as f:
                json.dump(all_cards, f, indent=2, ensure_ascii=False)

        except Exception as e:
            err_msg = f"Flashcard batch {batch_num} for {section_id}: {str(e)[:200]}"
            print(f"    ❌ {err_msg}")
            job['progress']['errorsCount'] += 1
            continue

        job['progress']['flashcardsGenerated'] = _count_total_items(job, 'fc')
        save_job(job)
        print(f"    🃏 {section_id} Flashcards: {len(all_cards)}/{target} (batch {batch_num})")

    return all_cards


def _count_total_items(job: dict, prefix: str) -> int:
    """Count total items across all section checkpoints."""
    total = 0
    if not job.get('blueprint') or not job['blueprint'].get('sections'):
        return 0
    for section in job['blueprint']['sections']:
        cp = JOBS_DIR / f"{job['id']}-{prefix}-{section['id']}.json"
        if cp.exists():
            with open(cp) as f:
                total += len(json.load(f))
    return total


def _generate_tbs_for_section(job: dict, section: dict, target: int) -> list:
    """Generate Task-Based Simulations for a single section."""
    exam = job['examName']
    course_id = job['courseId']
    bp = job['blueprint']
    section_id = section['id']
    topics = section.get('topics', [])

    all_tbs = []
    checkpoint_path = JOBS_DIR / f"{job['id']}-tbs-{section_id}.json"
    if checkpoint_path.exists():
        with open(checkpoint_path) as f:
            all_tbs = json.load(f)
        if len(all_tbs) >= target:
            return all_tbs

    batch_num = 0
    while len(all_tbs) < target:
        remaining = target - len(all_tbs)
        batch_size = min(2, remaining)
        batch_num += 1

        topic_idx = (batch_num - 1) % len(topics) if topics else 0
        topic = topics[topic_idx] if topics else section['name']

        prompt = f"""You are an expert {bp['fullName']} ({exam}) exam simulation writer.

DOMAIN: {section['name']} (Weight: {section.get('weight', '?')}%)
TOPIC: {topic}

Generate {batch_size} task-based simulation(s). Each TBS should present a realistic professional
scenario requiring the candidate to perform a multi-step task.

Return ONLY a valid JSON array (no markdown):
[
  {{
    "title": "TBS title describing the task",
    "scenario": "Detailed scenario description (3-5 paragraphs). Include names, numbers, and context.",
    "requirements": [
      "Specific task requirement 1",
      "Specific task requirement 2",
      "Specific task requirement 3"
    ],
    "exhibits": [
      {{
        "title": "Exhibit name (e.g., Financial Statement, Policy Document)",
        "content": "Exhibit content with realistic data"
      }}
    ],
    "solution": {{
      "steps": ["Step 1 explanation", "Step 2 explanation"],
      "answer": "Final answer or correct approach",
      "explanation": "Why this is the correct solution"
    }},
    "topic": "{topic}",
    "difficulty": "medium",
    "estimatedMinutes": 15,
    "skillLevel": "Application"
  }}
]"""

        try:
            batch = api_call(prompt)
            if not isinstance(batch, list):
                batch = [batch]

            start_idx = len(all_tbs) + 1
            for i, tbs in enumerate(batch):
                tbs_id = f"{course_id}-{section_id.lower().replace('-', '')}-tbs-{start_idx + i:03d}"
                tbs_obj = {
                    'id': tbs_id,
                    'courseId': course_id,
                    'section': section_id,
                    'blueprintArea': section_id,
                    'title': tbs.get('title', f'{section["name"]} TBS {start_idx + i}'),
                    'scenario': tbs.get('scenario', ''),
                    'requirements': tbs.get('requirements', []),
                    'exhibits': tbs.get('exhibits', []),
                    'solution': tbs.get('solution', {}),
                    'topic': tbs.get('topic', topic),
                    'difficulty': tbs.get('difficulty', 'medium'),
                    'estimatedMinutes': tbs.get('estimatedMinutes', 15),
                    'skillLevel': tbs.get('skillLevel', 'Application'),
                    'sourceFile': f'course-factory-{job["id"]}',
                }
                all_tbs.append(tbs_obj)

            with open(checkpoint_path, 'w') as f:
                json.dump(all_tbs, f, indent=2, ensure_ascii=False)

        except Exception as e:
            err_msg = f"TBS batch {batch_num} for {section_id}: {str(e)[:200]}"
            print(f"    ❌ {err_msg}")
            job['progress']['errorsCount'] += 1
            continue

        job['progress']['tbsGenerated'] = _count_total_items(job, 'tbs')
        save_job(job)
        print(f"    🧪 {section_id} TBS: {len(all_tbs)}/{target} (batch {batch_num})")

    return all_tbs


def _generate_study_materials(job: dict) -> dict:
    """Generate cheatsheets and study guides from the blueprint."""
    bp = job['blueprint']
    course_id = job['courseId']
    exam = job['examName']

    checkpoint_path = JOBS_DIR / f"{job['id']}-studymaterials.json"
    if checkpoint_path.exists():
        with open(checkpoint_path) as f:
            return json.load(f)

    print(f"    📚 Generating study materials for {exam}...")

    prompt = f"""You are an expert {bp['fullName']} ({exam}) study guide author.

EXAM: {bp['fullName']}
SECTIONS:
{json.dumps([{{'id': s['id'], 'name': s['name'], 'weight': s.get('weight', 0), 'topics': s.get('topics', [])}} for s in bp['sections']], indent=2)}

Create comprehensive study materials. Return ONLY a valid JSON object:
{{
  "cheatsheets": [
    {{
      "id": "{course_id}-cheatsheet-001",
      "title": "Section Name Quick Reference",
      "section": "SECTION-ID",
      "content": "Formatted cheat sheet content with key formulas, definitions, and rules",
      "keyPoints": ["Key point 1", "Key point 2", "Key point 3"]
    }}
  ],
  "formulas": [
    {{
      "id": "{course_id}-formula-001",
      "name": "Formula name",
      "formula": "The formula expression",
      "section": "SECTION-ID",
      "description": "When and how to use this formula",
      "example": "A worked example"
    }}
  ],
  "mnemonics": [
    {{
      "id": "{course_id}-mnemonic-001",
      "topic": "Topic name",
      "section": "SECTION-ID",
      "mnemonic": "The mnemonic device",
      "explanation": "What each letter/word stands for"
    }}
  ]
}}

Generate at least 1 cheatsheet per section, 5-10 key formulas, and 5-10 mnemonics.
"""

    try:
        materials = api_call(prompt)
        with open(checkpoint_path, 'w') as f:
            json.dump(materials, f, indent=2, ensure_ascii=False)
        print(f"    ✅ Generated {len(materials.get('cheatsheets', []))} cheatsheets, "
              f"{len(materials.get('formulas', []))} formulas, "
              f"{len(materials.get('mnemonics', []))} mnemonics")
        return materials
    except Exception as e:
        print(f"    ⚠ Study materials generation failed: {str(e)[:200]}")
        return {'cheatsheets': [], 'formulas': [], 'mnemonics': []}


def generate_content(job: dict) -> dict:
    """Phase 2: Generate all content (MCQs, lessons, flashcards, TBS, study materials)."""
    if not job.get('blueprint'):
        print("❌ No blueprint found. Run research phase first.")
        sys.exit(1)

    job['status'] = 'generating'
    job['progress']['phase'] = 'generating'
    if not job['progress']['startedAt']:
        job['progress']['startedAt'] = datetime.now(timezone.utc).isoformat()
    save_job(job)

    targets = _distribute_targets(job)
    sections = job['blueprint']['sections']

    # TBS target: ~5 per section (smaller target since TBS are expensive to generate)
    tbs_per_section = max(2, round(job['plan'].get('tbsTarget', 30) / len(sections)))

    print(f"\n🏗️  Generating content for {job['examName']} ({len(sections)} sections)...")
    print(f"   Targets: {job['plan']['mcqTarget']} MCQs, {job['plan']['lessonTarget']} lessons, "
          f"{job['plan']['flashcardTarget']} flashcards, ~{tbs_per_section * len(sections)} TBS\n")

    for i, t in enumerate(targets):
        section = t['section']
        section_id = section['id']
        print(f"\n{'='*60}")
        print(f"  Section {i+1}/{len(targets)}: {section['name']} ({section.get('weight', '?')}%)")
        print(f"  Targets: {t['mcqTarget']} MCQs, {t['lessonTarget']} lessons, "
              f"{t['flashcardTarget']} flashcards, {tbs_per_section} TBS")
        print(f"{'='*60}")

        job['progress']['currentSection'] = section_id
        save_job(job)

        # Generate MCQs
        _generate_mcqs_for_section(job, section, t['mcqTarget'])

        # Generate lessons
        _generate_lessons_for_section(job, section, t['lessonTarget'])

        # Generate flashcards
        _generate_flashcards_for_section(job, section, t['flashcardTarget'])

        # Generate TBS
        _generate_tbs_for_section(job, section, tbs_per_section)

        job['progress']['sectionsComplete'] = i + 1
        save_job(job)
        print(f"  ✅ Section {section_id} complete")

    # Generate course-wide study materials (cheatsheets, formulas, mnemonics)
    print(f"\n📚 Generating study materials...")
    _generate_study_materials(job)

    # Final counts
    job['progress']['mcqsGenerated'] = _count_total_mcqs(job)
    job['progress']['lessonsGenerated'] = _count_total_items(job, 'lessons')
    job['progress']['flashcardsGenerated'] = _count_total_items(job, 'fc')
    job['progress']['tbsGenerated'] = _count_total_items(job, 'tbs')
    job['status'] = 'generated'
    job['progress']['phase'] = 'generated'
    save_job(job)

    print(f"\n✅ Generation complete!")
    print(f"   MCQs: {job['progress']['mcqsGenerated']}")
    print(f"   Lessons: {job['progress']['lessonsGenerated']}")
    print(f"   Flashcards: {job['progress']['flashcardsGenerated']}")
    print(f"   TBS: {job['progress']['tbsGenerated']}")
    print(f"   Errors: {job['progress']['errorsCount']}")

    return job


# ─── PHASE 3: ENHANCE (optional LLM quality pass) ────────────────────────────

def enhance_content(job: dict) -> dict:
    """Phase 3: Run an LLM enhancement pass over generated content.

    This improves question quality by regenerating weak questions with richer
    scenarios. Uses the same pattern as enhance-content-llm.py.
    """
    if job['status'] not in ('generated', 'enhancing'):
        print(f"❌ Job must be in 'generated' status to enhance. Current: {job['status']}")
        sys.exit(1)

    job['status'] = 'enhancing'
    job['progress']['phase'] = 'enhancing'
    save_job(job)

    bp = job['blueprint']
    course_id = job['courseId']
    exam = job['examName']

    print(f"\n✨ Enhancing content for {exam}...")

    for section in bp['sections']:
        section_id = section['id']
        job['progress']['currentSection'] = section_id
        save_job(job)

        # Enhance MCQs — check for any with empty/short questions
        mcq_cp = JOBS_DIR / f"{job['id']}-mcq-{section_id}.json"
        if mcq_cp.exists():
            with open(mcq_cp) as f:
                questions = json.load(f)

            weak = [i for i, q in enumerate(questions)
                    if len(q.get('question', '')) < 50 or len(q.get('explanation', '')) < 30]

            if weak:
                print(f"    🔧 Enhancing {len(weak)} weak MCQs in {section_id}...")
                for batch_start in range(0, len(weak), MCQ_BATCH_SIZE):
                    batch_indices = weak[batch_start:batch_start + MCQ_BATCH_SIZE]
                    batch_qs = [questions[idx] for idx in batch_indices]

                    prompt = f"""You are an expert {bp['fullName']} exam question writer. Improve these {len(batch_qs)} questions.

DOMAIN: {section['name']}
AUTHORITY: {', '.join(bp.get('authorityRefs', ['official guide'])[:2])}

Current questions (need improvement):
{json.dumps([{{'topic': q['topic'], 'difficulty': q['difficulty'], 'question': q['question'][:100]}} for q in batch_qs], indent=2)}

For EACH question, write a completely new, better version with:
- A realistic professional scenario (2-3 sentences)
- 4 plausible options (no obvious filler)
- A detailed explanation citing authoritative sources
- Per-option whyWrong explanations

Return ONLY a valid JSON array with {len(batch_qs)} improved questions:
[
  {{
    "question": "...",
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "correctAnswer": 0,
    "explanation": "...",
    "whyWrong": {{"0": "CORRECT: ...", "1": "INCORRECT: ...", "2": "INCORRECT: ...", "3": "INCORRECT: ..."}},
    "examTip": "...",
    "memoryAid": "...",
    "bottomLine": "..."
  }}
]"""
                    try:
                        enhanced = api_call(prompt)
                        if isinstance(enhanced, list):
                            for idx_in_batch, enh in enumerate(enhanced):
                                if idx_in_batch < len(batch_indices):
                                    orig_idx = batch_indices[idx_in_batch]
                                    for key in ('question', 'options', 'correctAnswer', 'explanation', 'whyWrong', 'examTip', 'memoryAid', 'bottomLine'):
                                        if key in enh:
                                            questions[orig_idx][key] = enh[key]
                            job['progress']['mcqsEnhanced'] = job['progress'].get('mcqsEnhanced', 0) + len(enhanced)

                        with open(mcq_cp, 'w') as f:
                            json.dump(questions, f, indent=2, ensure_ascii=False)

                    except Exception as e:
                        print(f"    ⚠ Enhancement batch failed for {section_id}: {str(e)[:100]}")
                        continue

                    save_job(job)
            else:
                print(f"    ✅ {section_id} MCQs look good (no weak questions)")

        # Enhance lessons — check for short content
        lesson_cp = JOBS_DIR / f"{job['id']}-lessons-{section_id}.json"
        if lesson_cp.exists():
            with open(lesson_cp) as f:
                lessons = json.load(f)

            # Find lessons with very short content sections
            weak_lessons = [i for i, l in enumerate(lessons)
                           if not l.get('content', {}).get('sections') or
                           len(json.dumps(l.get('content', {}))) < 200]

            if weak_lessons:
                print(f"    🔧 Enhancing {len(weak_lessons)} weak lessons in {section_id}...")
                for idx in weak_lessons[:5]:  # Limit to 5 per section to save API calls
                    lesson = lessons[idx]
                    prompt = f"""You are an expert {bp['fullName']} instructor. Improve this lesson.

DOMAIN: {section['name']}
TITLE: {lesson.get('title', 'Untitled')}
TOPICS: {json.dumps(lesson.get('topics', []))}

Write a comprehensive, expanded lesson. Return ONLY valid JSON:
{{
  "content": {{
    "sections": [
      {{"title": "Why This Matters", "type": "callout", "content": "Real-world relevance..."}},
      {{"title": "Key Concepts", "type": "text", "content": "Core concepts with detail..."}},
      {{"title": "Deep Dive", "type": "text", "content": "Detailed analysis..."}},
      {{"title": "Practical Application", "type": "text", "content": "Examples and scenarios..."}},
      {{"title": "Key Takeaways", "type": "callout", "content": "Summary bullet points..."}}
    ]
  }},
  "description": "One-line summary of this lesson"
}}"""
                    try:
                        enhanced = api_call(prompt)
                        if isinstance(enhanced, dict):
                            if 'content' in enhanced:
                                lessons[idx]['content'] = enhanced['content']
                            if 'description' in enhanced:
                                lessons[idx]['description'] = enhanced['description']
                            job['progress']['lessonsEnhanced'] = job['progress'].get('lessonsEnhanced', 0) + 1
                    except Exception as e:
                        print(f"    ⚠ Lesson enhancement failed: {str(e)[:100]}")
                        continue

                with open(lesson_cp, 'w') as f:
                    json.dump(lessons, f, indent=2, ensure_ascii=False)
                save_job(job)
            else:
                print(f"    ✅ {section_id} lessons look good")

        # Enhance flashcards — check for short fronts/backs
        fc_cp = JOBS_DIR / f"{job['id']}-fc-{section_id}.json"
        if fc_cp.exists():
            with open(fc_cp) as f:
                flashcards = json.load(f)

            weak_fcs = [i for i, fc in enumerate(flashcards)
                       if len(fc.get('front', '')) < 20 or len(fc.get('back', '')) < 15]

            if weak_fcs:
                print(f"    🔧 Enhancing {len(weak_fcs)} weak flashcards in {section_id}...")
                for batch_start in range(0, len(weak_fcs), FLASHCARD_BATCH_SIZE):
                    batch_indices = weak_fcs[batch_start:batch_start + FLASHCARD_BATCH_SIZE]
                    batch_fcs = [flashcards[idx] for idx in batch_indices]

                    prompt = f"""You are an expert {bp['fullName']} study guide author. Improve these {len(batch_fcs)} flashcards.

DOMAIN: {section['name']}

Current flashcards (need improvement):
{json.dumps([{{'front': fc['front'][:80], 'back': fc['back'][:80]}} for fc in batch_fcs], indent=2)}

Return ONLY a JSON array with {len(batch_fcs)} improved flashcards:
[
  {{"front": "Clear, specific exam-focused question", "back": "Comprehensive answer with key details"}}
]"""
                    try:
                        enhanced = api_call(prompt)
                        if isinstance(enhanced, list):
                            for idx_in_batch, enh in enumerate(enhanced):
                                if idx_in_batch < len(batch_indices):
                                    orig_idx = batch_indices[idx_in_batch]
                                    for key in ('front', 'back'):
                                        if key in enh:
                                            flashcards[orig_idx][key] = enh[key]
                            job['progress']['flashcardsEnhanced'] = job['progress'].get('flashcardsEnhanced', 0) + len(enhanced)

                        with open(fc_cp, 'w') as f:
                            json.dump(flashcards, f, indent=2, ensure_ascii=False)
                    except Exception as e:
                        print(f"    ⚠ Flashcard enhancement failed: {str(e)[:100]}")
                        continue
                    save_job(job)
            else:
                print(f"    ✅ {section_id} flashcards look good")

    job['status'] = 'enhanced'
    job['progress']['phase'] = 'enhanced'
    save_job(job)
    print(f"\n✅ Enhancement complete! Enhanced {job['progress'].get('mcqsEnhanced', 0)} MCQs, "
          f"{job['progress'].get('lessonsEnhanced', 0)} lessons, "
          f"{job['progress'].get('flashcardsEnhanced', 0)} flashcards")
    return job


# ─── PHASE 4: ASSEMBLE ───────────────────────────────────────────────────────

def assemble_course(job: dict) -> dict:
    """Phase 4: Write all generated content to the correct file locations."""
    if job['status'] not in ('generated', 'enhanced', 'assembling'):
        print(f"❌ Job must be generated/enhanced to assemble. Current: {job['status']}")
        sys.exit(1)

    job['status'] = 'assembling'
    job['progress']['phase'] = 'assembling'
    save_job(job)

    bp = job['blueprint']
    course_id = job['courseId']
    exam = job['examName']
    sections = bp['sections']
    files_generated = []

    print(f"\n📦 Assembling course files for {exam}...")

    # ── 1. Content directory: questions per section ──
    for section in sections:
        section_id = section['id']
        section_dir = CONTENT_DIR / course_id / section_id.lower().replace('-', '')
        section_dir.mkdir(parents=True, exist_ok=True)

        # Questions
        mcq_cp = JOBS_DIR / f"{job['id']}-mcq-{section_id}.json"
        if mcq_cp.exists():
            with open(mcq_cp) as f:
                questions = json.load(f)
            out_path = section_dir / 'questions.json'
            output = {
                'section': section_id,
                'exportedAt': datetime.now(timezone.utc).isoformat(),
                'courseFactory': job['id'],
                'questions': questions,
            }
            with open(out_path, 'w') as f:
                json.dump(output, f, indent=2, ensure_ascii=False)
            files_generated.append(str(out_path))
            print(f"    ✅ {out_path} ({len(questions)} questions)")

    # ── 2. Content directory: flashcards (course-level) ──
    all_flashcards = []
    for section in sections:
        fc_cp = JOBS_DIR / f"{job['id']}-fc-{section['id']}.json"
        if fc_cp.exists():
            with open(fc_cp) as f:
                all_flashcards.extend(json.load(f))

    if all_flashcards:
        fc_path = CONTENT_DIR / course_id / 'flashcards.json'
        fc_path.parent.mkdir(parents=True, exist_ok=True)
        with open(fc_path, 'w') as f:
            json.dump({'flashcards': all_flashcards, 'exportedAt': datetime.now(timezone.utc).isoformat()}, f, indent=2, ensure_ascii=False)
        files_generated.append(str(fc_path))
        print(f"    ✅ {fc_path} ({len(all_flashcards)} flashcards)")

    # ── 3. Lesson JSON files ──
    lessons_dir = SRC_DATA_DIR / course_id / 'lessons' / 'json'
    lessons_dir.mkdir(parents=True, exist_ok=True)
    for section in sections:
        lesson_cp = JOBS_DIR / f"{job['id']}-lessons-{section['id']}.json"
        if lesson_cp.exists():
            with open(lesson_cp) as f:
                lessons = json.load(f)
            sec_key = section['id'].lower().replace('-', '')
            out_path = lessons_dir / f"{sec_key}-batch1.json"
            with open(out_path, 'w') as f:
                json.dump(lessons, f, indent=2, ensure_ascii=False)
            files_generated.append(str(out_path))
            print(f"    ✅ {out_path} ({len(lessons)} lessons)")

    # ── 4. Course config TypeScript ──
    config_dir = SRC_COURSES_DIR / course_id
    config_dir.mkdir(parents=True, exist_ok=True)

    section_type_ids = [f"'{s['id']}'" for s in sections]
    section_type = f"export type {exam}SectionId = {' | '.join(section_type_ids)};"
    section_ids_array = f"export const {exam}_SECTION_IDS: {exam}SectionId[] = [{', '.join(section_type_ids)}];"

    section_configs = []
    colors = ['bg-indigo-500', 'bg-blue-500', 'bg-cyan-500', 'bg-teal-500', 'bg-emerald-500',
              'bg-green-500', 'bg-amber-500', 'bg-orange-500', 'bg-rose-500', 'bg-purple-500']
    icons = ['FileSearch', 'Shield', 'Settings', 'Server', 'Lock',
             'BookOpen', 'TrendingUp', 'Code', 'Database', 'Globe']

    for i, section in enumerate(sections):
        topics_str = ',\n'.join([f"      '{t}'" for t in section.get('topics', [])])
        total_qs = bp.get('totalQuestions', 150)
        q_count = round(total_qs * section.get('weight', 10) / 100)

        section_configs.append(f"""  '{section['id']}': {{
    id: '{section['id']}' as {exam}SectionId,
    title: '{section['name'].replace("'", "\\'")}',
    shortTitle: '{section['name'][:25].replace("'", "\\'")}',
    description: 'Covers {section['name'].lower().replace("'", "\\'")}',
    weight: {section.get('weight', 10)},
    questionCount: {q_count},
    color: '{colors[i % len(colors)]}',
    icon: '{icons[i % len(icons)]}',
    topics: [
{topics_str}
    ],
  }}""")

    # Compute passing score display
    passing = bp.get('passingScore', 70)
    passing_max = bp.get('passingScoreMax', 100)

    config_ts = f"""import type {{ Course, CourseId }} from '../../types/course';

{section_type}
{section_ids_array}

export interface {exam}SectionConfig {{
  id: {exam}SectionId;
  title: string;
  shortTitle: string;
  description: string;
  weight: number;
  questionCount: number;
  color: string;
  icon: string;
  topics: string[];
}}

export const {exam}_SECTION_CONFIG: Record<{exam}SectionId, {exam}SectionConfig> = {{
{(','+chr(10)).join(section_configs)}
}};

export const {exam}_COURSE: Course = {{
  id: '{course_id}' as CourseId,
  name: '{bp['fullName'].replace("'", "\\'")} Review',
  shortName: '{exam}',
  description: 'Comprehensive preparation for the {bp['fullName'].replace("'", "\\'")}',
  passingScore: {passing},
  totalTime: {bp.get('timeAllowedMinutes', 240)},
  hasTBS: false,
  sections: Object.values({exam}_SECTION_CONFIG).map(s => ({{
    id: s.id,
    name: s.title,
    shortName: s.shortTitle,
    weight: `${{s.weight}}%`,
    questionCount: s.questionCount,
    timeAllowed: {bp.get('timeAllowedMinutes', 240)},
    questionTypes: ['mcq'] as any[],
    blueprintAreas: [{{
      id: s.id,
      name: s.title,
      weight: `${{s.weight}}%`,
      topics: s.topics,
    }}],
  }})),
}};
"""

    config_path = config_dir / 'config.ts'
    with open(config_path, 'w') as f:
        f.write(config_ts)
    files_generated.append(str(config_path))
    print(f"    ✅ {config_path}")

    # ── 5. Questions index.ts ──
    questions_dir = SRC_DATA_DIR / course_id / 'questions'
    questions_dir.mkdir(parents=True, exist_ok=True)

    imports = []
    extractions = []
    exports_lines = []
    switch_cases = []
    all_spread = []

    for section in sections:
        sec_var = section['id'].lower().replace('-', '')
        sec_const = section['id'].replace('-', '_').upper()
        content_path = f"../../../../content/{course_id}/{sec_var}/questions.json"

        imports.append(f"import {sec_var}Data from '{content_path}';")
        extractions.append(f"const {sec_var}Questions = ({sec_var}Data as QuestionFile).questions;")
        exports_lines.append(f"export const {sec_const}_QUESTIONS = {sec_var}Questions;")
        switch_cases.append(f"    case '{section['id']}': return {sec_var}Questions;")
        all_spread.append(f"  ...{sec_var}Questions,")

    index_ts = f"""import type {{ Question }} from '../../../types';
import type {{ Difficulty }} from '../../../types';
import {{ normalizeDifficulty }} from '../../../types';

{chr(10).join(imports)}

interface QuestionFile {{
  section: string;
  exportedAt: string;
  questions: Question[];
}}

{chr(10).join(extractions)}

{chr(10).join(exports_lines)}

export const {exam}_QUESTIONS: Question[] = [
{chr(10).join(all_spread)}
];

export const getQuestionsBySection = (section: string): Question[] => {{
  switch (section) {{
{chr(10).join(switch_cases)}
    default: return [];
  }}
}};

export const getQuestionsByDifficulty = (difficulty: Difficulty): Question[] => {{
  const normalized = normalizeDifficulty(difficulty);
  return {exam}_QUESTIONS.filter((q) => normalizeDifficulty(q.difficulty) === normalized);
}};

export default {exam}_QUESTIONS;
"""

    index_path = questions_dir / 'index.ts'
    with open(index_path, 'w') as f:
        f.write(index_ts)
    files_generated.append(str(index_path))
    print(f"    ✅ {index_path}")

    # ── 6. Flashcards index.ts ──
    fc_index_dir = SRC_DATA_DIR / course_id / 'flashcards'
    fc_index_dir.mkdir(parents=True, exist_ok=True)

    fc_index_ts = f"""import flashcardData from '../../../../content/{course_id}/flashcards.json';

interface FlashcardFile {{
  flashcards: any[];
  exportedAt: string;
}}

export const {exam}_FLASHCARDS = (flashcardData as FlashcardFile).flashcards;
export default {exam}_FLASHCARDS;
"""

    fc_index_path = fc_index_dir / 'index.ts'
    with open(fc_index_path, 'w') as f:
        f.write(fc_index_ts)
    files_generated.append(str(fc_index_path))
    print(f"    ✅ {fc_index_path}")

    # ── 7. Lessons index.ts ──
    print(f"\n  📄 Generating lessons index...")
    lessons_index_dir = SRC_DATA_DIR / course_id / 'lessons'
    lessons_index_dir.mkdir(parents=True, exist_ok=True)
    lessons_index_path = lessons_index_dir / 'index.ts'
    with open(lessons_index_path, 'w') as f:
        f.write(tpl_lessons_index(job))
    files_generated.append(str(lessons_index_path))
    print(f"    ✅ {lessons_index_path}")

    # ── 8. Course data index (CRITICAL — courseDataLoader needs this) ──
    print(f"\n  📄 Generating course data index...")
    data_index_path = SRC_DATA_DIR / course_id / 'index.ts'
    with open(data_index_path, 'w') as f:
        f.write(tpl_data_index(job))
    files_generated.append(str(data_index_path))
    print(f"    ✅ {data_index_path}")

    # ── 9. Course barrel file ──
    print(f"\n  📄 Generating course barrel...")
    barrel_path = SRC_COURSES_DIR / course_id / 'index.ts'
    with open(barrel_path, 'w') as f:
        f.write(tpl_courses_barrel(job))
    files_generated.append(str(barrel_path))
    print(f"    ✅ {barrel_path}")

    # ── 10. TBS content file ──
    all_tbs = []
    for section in sections:
        tbs_cp = JOBS_DIR / f"{job['id']}-tbs-{section['id']}.json"
        if tbs_cp.exists():
            with open(tbs_cp) as f:
                all_tbs.extend(json.load(f))
    if all_tbs:
        tbs_path = CONTENT_DIR / course_id / 'tbs.json'
        tbs_path.parent.mkdir(parents=True, exist_ok=True)
        with open(tbs_path, 'w') as f:
            json.dump({'tbs': all_tbs, 'exportedAt': datetime.now(timezone.utc).isoformat()}, f, indent=2, ensure_ascii=False)
        files_generated.append(str(tbs_path))
        print(f"    ✅ {tbs_path} ({len(all_tbs)} TBS)")

    # ── 11. Study materials ──
    materials_cp = JOBS_DIR / f"{job['id']}-studymaterials.json"
    if materials_cp.exists():
        with open(materials_cp) as f:
            materials = json.load(f)
        mat_path = CONTENT_DIR / course_id / 'study-materials.json'
        mat_path.parent.mkdir(parents=True, exist_ok=True)
        with open(mat_path, 'w') as f:
            json.dump(materials, f, indent=2, ensure_ascii=False)
        files_generated.append(str(mat_path))
        print(f"    ✅ {mat_path}")

    # ── 12. Mock exam config ──
    print(f"\n  📄 Generating mock exam config...")
    total_qs = bp.get('totalQuestions', 150)
    time_mins = bp.get('timeAllowedMinutes', 240)
    mock_config = {
        'courseId': course_id,
        'examName': bp.get('fullName', exam),
        'mockExams': [
            {
                'id': f'{course_id}-mock-full',
                'name': f'Full {exam} Practice Exam',
                'type': 'full',
                'totalQuestions': total_qs,
                'timeMinutes': time_mins,
                'sections': [
                    {
                        'sectionId': s['id'],
                        'questionCount': max(5, round(total_qs * s.get('weight', 10) / 100)),
                    }
                    for s in sections
                ],
            },
            {
                'id': f'{course_id}-mock-half',
                'name': f'Half-Length {exam} Practice',
                'type': 'half',
                'totalQuestions': total_qs // 2,
                'timeMinutes': time_mins // 2,
                'sections': [
                    {
                        'sectionId': s['id'],
                        'questionCount': max(3, round(total_qs * s.get('weight', 10) / 200)),
                    }
                    for s in sections
                ],
            },
            {
                'id': f'{course_id}-mock-mini',
                'name': f'Quick {exam} Quiz',
                'type': 'mini',
                'totalQuestions': 25,
                'timeMinutes': 30,
                'sections': [
                    {
                        'sectionId': s['id'],
                        'questionCount': max(2, round(25 * s.get('weight', 10) / 100)),
                    }
                    for s in sections
                ],
            },
        ],
    }
    mock_path = CONTENT_DIR / course_id / 'mock-exams.json'
    mock_path.parent.mkdir(parents=True, exist_ok=True)
    with open(mock_path, 'w') as f:
        json.dump(mock_config, f, indent=2, ensure_ascii=False)
    files_generated.append(str(mock_path))
    print(f"    ✅ {mock_path}")

    # ── 13. Diagnostic quiz config ──
    diag_config = {
        'courseId': course_id,
        'diagnosticQuiz': {
            'id': f'{course_id}-diagnostic',
            'name': f'{exam} Diagnostic Assessment',
            'description': f'Assess your {bp.get("fullName", exam)} knowledge level across all domains',
            'questionsPerSection': 5,
            'sections': [
                {'sectionId': s['id'], 'sectionName': s['name'], 'questionCount': 5}
                for s in sections
            ],
            'totalQuestions': 5 * len(sections),
            'timeMinutes': max(15, 2 * len(sections)),
        },
    }
    diag_path = CONTENT_DIR / course_id / 'diagnostic.json'
    with open(diag_path, 'w') as f:
        json.dump(diag_config, f, indent=2, ensure_ascii=False)
    files_generated.append(str(diag_path))
    print(f"    ✅ {diag_path}")

    # ── 14. Per-course services (5 files) ──
    services_dir = Path('src/services')
    services_dir.mkdir(parents=True, exist_ok=True)

    service_templates = [
        (f'{course_id}AdaptiveEngine.ts', tpl_adaptive_engine),
        (f'{course_id}ProgressService.ts', tpl_progress_service),
        (f'{course_id}ScorePredictor.ts', tpl_score_predictor),
        (f'{course_id}Analytics.ts', tpl_analytics),
        (f'{course_id}CramMode.ts', tpl_cram_mode),
    ]

    print(f"\n  🔧 Generating per-course services...")
    for filename, tpl_fn in service_templates:
        svc_path = services_dir / filename
        with open(svc_path, 'w') as f:
            f.write(tpl_fn(job))
        files_generated.append(str(svc_path))
        print(f"    ✅ {svc_path}")

    # ── 15. Progress hook ──
    hooks_dir = Path('src/hooks')
    hooks_dir.mkdir(parents=True, exist_ok=True)
    hook_path = hooks_dir / f'use{exam}Progress.ts'
    with open(hook_path, 'w') as f:
        f.write(tpl_progress_hook(job))
    files_generated.append(str(hook_path))
    print(f"    ✅ {hook_path}")

    # ══════════════════════════════════════════════════════════════════════
    # AUTO-REGISTRATION — wire the new course into existing source files
    # ══════════════════════════════════════════════════════════════════════
    print(f"\n  🔌 Auto-registering {course_id} in existing source files...")

    reg_results = {
        'courseId': auto_update_course_id_type(course_id),
        'registry': auto_update_course_registry(course_id, exam),
        'contentRegistry': auto_update_content_registry(job),
        'questionService': auto_update_question_service(job),
        'adaptiveEngine': auto_update_adaptive_engine_adapter(job),
        'examService': auto_update_exam_service(job),
    }

    # ── Content Validation ──
    print(f"\n🚀 Running content validation script on '{course_id}'...")
    import subprocess
    try:
        val_res = subprocess.run(
            ['node', 'scripts/validate-questions.cjs', '--course', course_id],
            capture_output=True, text=True, check=False
        )
        if val_res.returncode != 0 or "Validation PASSED" not in val_res.stdout:
            print("❌ Validation Failed!")
            print(val_res.stdout)
            job['status'] = 'validation_failed'
            
            # Extract basic error context from the script output
            err_lines = [line.strip() for line in val_res.stdout.split('\n') if "Field Coverage Issues" in line or "Quality Issues" in line or (" -" in line and ":" in line)]
            err_msg = "\\n".join(err_lines) if err_lines else "Validation failed! Check logs."
            
            job['progress']['errors'].append({
                'section': 'assemble_validation',
                'message': f"Question format validation failed:\\n{err_msg}",
                'timestamp': datetime.now(timezone.utc).isoformat()
            })
            save_job(job)
            return job
        else:
            print("    ✅ Questions passed format validation")
    except Exception as e:
        print(f"⚠️ Could not run validate-questions.cjs: {e}")

    # ── Assembly manifest ──
    job['output']['filesGenerated'] = files_generated
    job['output']['configPath'] = str(config_path)
    job['output']['registrationResults'] = reg_results
    job['output']['registryUpdated'] = all(reg_results.values())
    job['status'] = 'assembled'
    job['progress']['phase'] = 'assembled'
    save_job(job)

    total_content = (
        job['progress'].get('mcqsGenerated', 0)
        + job['progress'].get('lessonsGenerated', 0)
        + job['progress'].get('flashcardsGenerated', 0)
        + job['progress'].get('tbsGenerated', 0)
    )

    print(f"\n{'='*60}")
    print(f"  📦 ASSEMBLY COMPLETE — {exam}")
    print(f"{'='*60}")
    print(f"  Files generated:    {len(files_generated)}")
    print(f"  Content items:      {total_content}")
    print(f"  Auto-registrations: {sum(1 for v in reg_results.values() if v)}/{len(reg_results)}")

    failed_regs = [k for k, v in reg_results.items() if not v]
    if failed_regs:
        print(f"\n  ⚠️  MANUAL STEPS NEEDED (auto-registration failed):")
        for reg in failed_regs:
            print(f"     - Fix {reg}")
    else:
        print(f"\n  ✅ All registrations successful!")

    print(f"\n  ⏭️  NEXT STEPS:")
    print(f"     1. npx tsc --noEmit    (verify no type errors)")
    print(f"     2. npm run build        (verify production build)")
    print(f"     3. npm test             (run tests)")
    print(f"     4. Start dev server and test the new course")

    return job


# ─── STATUS & LIST ────────────────────────────────────────────────────────────

def show_status(job: dict):
    """Display current job status."""
    p = job['progress']
    bp = job.get('blueprint', {})

    print(f"\n{'='*60}")
    print(f"  Job: {job['id']}")
    print(f"  Exam: {job['examName']}")
    print(f"  Status: {job['status']}")
    print(f"  Phase: {p['phase']}")
    print(f"{'='*60}")

    if bp:
        print(f"\n  Blueprint: {bp.get('fullName', 'N/A')}")
        print(f"  Provider: {bp.get('provider', 'N/A')}")
        print(f"  Sections: {len(bp.get('sections', []))}")

    print(f"\n  Progress:")
    print(f"    Sections: {p['sectionsComplete']}/{p['sectionsTotal']}")
    print(f"    MCQs:        {p['mcqsGenerated']:>6} / {job['plan']['mcqTarget']}")
    print(f"    Lessons:     {p['lessonsGenerated']:>6} / {job['plan']['lessonTarget']}")
    print(f"    Flashcards:  {p['flashcardsGenerated']:>6} / {job['plan']['flashcardTarget']}")
    print(f"    Errors:      {p['errorsCount']}")

    if p.get('startedAt'):
        started = datetime.fromisoformat(p['startedAt'].replace('Z', '+00:00'))
        elapsed = datetime.now(timezone.utc) - started
        print(f"    Elapsed:     {elapsed}")

    if job.get('output', {}).get('filesGenerated'):
        print(f"\n  Output files: {len(job['output']['filesGenerated'])}")
        for f in job['output']['filesGenerated']:
            print(f"    - {f}")


def list_jobs():
    """List all course factory jobs."""
    jobs = sorted(JOBS_DIR.glob('*.json'))
    # Filter out checkpoint files (they contain hyphens for section IDs)
    jobs = [j for j in jobs if not any(x in j.stem for x in ['-mcq-', '-lessons-', '-fc-', '-tbs-', '-studymaterials'])]

    if not jobs:
        print("No course factory jobs found.")
        return

    print(f"\n{'Job ID':<40} {'Exam':<10} {'Status':<15} {'MCQs':<8} {'Updated'}")
    print('-' * 95)
    for jp in jobs:
        with open(jp) as f:
            j = json.load(f)
        print(f"{j['id']:<40} {j['examName']:<10} {j['status']:<15} {j['progress']['mcqsGenerated']:<8} {j.get('updatedAt', 'N/A')[:19]}")


# ─── CLI ──────────────────────────────────────────────────────────────────────

def watch_jobs(poll_interval: int = 10):
    """Daemon mode: poll Firestore for jobs with status 'generating' and process them."""
    print(f"\n👁️  Watching for course factory jobs (polling every {poll_interval}s)...")
    print(f"   Firestore: {'connected' if DB else 'NOT connected'}")
    print(f"   Press Ctrl+C to stop.\n")

    if not DB:
        print("❌ Firebase Admin SDK not initialized. Ensure serviceAccountKey.json exists.")
        sys.exit(1)

    processed = set()

    while True:
        try:
            # Check for jobs that need generation
            for status_to_check in ['generating', 'enhancing', 'assembling']:
                jobs = firestore_query_by_status('courseFactory', status_to_check)
                for remote_job in jobs:
                    job_id = remote_job.get('id', '')
                    if not job_id or job_id in processed:
                        continue

                    print(f"\n🚀 Found job: {job_id} (status: {status_to_check})")

                    # Merge remote data with local (if exists)
                    local_path = job_path(job_id)
                    if local_path.exists():
                        with open(local_path) as f:
                            job = json.load(f)
                        # Update from remote (plan, blueprint may have been edited in UI)
                        if remote_job.get('blueprint'):
                            job['blueprint'] = remote_job['blueprint']
                        if remote_job.get('plan'):
                            job['plan'] = remote_job['plan']
                        job['status'] = remote_job.get('status', job['status'])
                    else:
                        job = remote_job

                    # Save locally
                    with open(local_path, 'w') as f:
                        json.dump(job, f, indent=2, ensure_ascii=False)

                    # Process based on status
                    try:
                        if status_to_check == 'generating':
                            if not job.get('blueprint'):
                                print(f"  ⚠ Job {job_id} has no blueprint, skipping")
                                continue
                            generate_content(job)
                            enhance_content(job)
                            assemble_course(job)
                            processed.add(job_id)
                        elif status_to_check == 'enhancing':
                            enhance_content(job)
                            assemble_course(job)
                            processed.add(job_id)
                        elif status_to_check == 'assembling':
                            assemble_course(job)
                            processed.add(job_id)
                    except Exception as e:
                        print(f"  ❌ Error processing {job_id}: {e}")
                        job['status'] = 'error'
                        job['progress']['errors'].append({
                            'section': 'watch',
                            'message': str(e)[:500],
                            'timestamp': datetime.now(timezone.utc).isoformat(),
                        })
                        save_job(job)

            time.sleep(poll_interval)

        except KeyboardInterrupt:
            print("\n\n👋 Watch stopped.")
            break
        except Exception as e:
            print(f"  ⚠ Poll error: {e}")
            time.sleep(poll_interval)


def main():
    parser = argparse.ArgumentParser(description='Course Factory — Generate exam prep courses')
    sub = parser.add_subparsers(dest='command', required=True)

    # research
    p_research = sub.add_parser('research', help='Research an exam and create blueprint')
    p_research.add_argument('exam', help='Exam name (e.g., CISSP, CISM, PMP)')
    p_research.add_argument('--mcqs', type=int, default=DEFAULT_MCQ_TARGET, help='MCQ target')
    p_research.add_argument('--lessons', type=int, default=DEFAULT_LESSON_TARGET, help='Lesson target')
    p_research.add_argument('--flashcards', type=int, default=DEFAULT_FLASHCARD_TARGET, help='Flashcard target')

    # generate
    p_gen = sub.add_parser('generate', help='Generate content for a researched job')
    p_gen.add_argument('job_id', help='Job ID from research phase')

    # enhance
    p_enh = sub.add_parser('enhance', help='Run LLM enhancement pass')
    p_enh.add_argument('job_id', help='Job ID')

    # assemble
    p_asm = sub.add_parser('assemble', help='Write content to final file locations')
    p_asm.add_argument('job_id', help='Job ID')

    # run (all phases)
    p_run = sub.add_parser('run', help='Run all phases: research → generate → enhance → assemble')
    p_run.add_argument('exam', help='Exam name')
    p_run.add_argument('--mcqs', type=int, default=DEFAULT_MCQ_TARGET, help='MCQ target')
    p_run.add_argument('--lessons', type=int, default=DEFAULT_LESSON_TARGET, help='Lesson target')
    p_run.add_argument('--flashcards', type=int, default=DEFAULT_FLASHCARD_TARGET, help='Flashcard target')
    p_run.add_argument('--skip-enhance', action='store_true', help='Skip enhancement phase')

    # status
    p_status = sub.add_parser('status', help='Show job status')
    p_status.add_argument('job_id', help='Job ID')

    # list
    sub.add_parser('list', help='List all jobs')

    # watch (daemon mode)
    p_watch = sub.add_parser('watch', help='Watch Firestore for jobs and process them automatically')
    p_watch.add_argument('--interval', type=int, default=10, help='Poll interval in seconds (default: 10)')

    args = parser.parse_args()

    if args.command == 'research':
        job = create_job(args.exam, args.mcqs, args.lessons, args.flashcards)
        research_exam(job)
        print(f"\n✅ Job created: {job['id']}")
        print(f"   Next: python3 scripts/course-factory.py generate {job['id']}")

    elif args.command == 'generate':
        job = load_job(args.job_id)
        generate_content(job)
        print(f"\n   Next: python3 scripts/course-factory.py enhance {job['id']}")

    elif args.command == 'enhance':
        job = load_job(args.job_id)
        enhance_content(job)
        print(f"\n   Next: python3 scripts/course-factory.py assemble {job['id']}")

    elif args.command == 'assemble':
        job = load_job(args.job_id)
        assemble_course(job)

    elif args.command == 'run':
        job = create_job(args.exam, args.mcqs, args.lessons, args.flashcards)
        research_exam(job)
        generate_content(job)
        if not args.skip_enhance:
            enhance_content(job)
        assemble_course(job)

    elif args.command == 'status':
        job = load_job(args.job_id)
        show_status(job)

    elif args.command == 'list':
        list_jobs()

    elif args.command == 'watch':
        watch_jobs(poll_interval=args.interval)


if __name__ == '__main__':
    main()
