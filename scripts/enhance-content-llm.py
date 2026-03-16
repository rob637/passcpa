#!/usr/bin/env python3
"""
LLM Content Enhancement Pipeline
Replaces template/placeholder text with real exam-quality content using Gemini API.

Processes: MCQs, Lessons, Flashcards
Resume-capable: tracks progress in checkpoint files.

Usage:
    python3 scripts/enhance-content-llm.py                    # Run all
    python3 scripts/enhance-content-llm.py --type mcqs        # MCQs only
    python3 scripts/enhance-content-llm.py --type lessons     # Lessons only
    python3 scripts/enhance-content-llm.py --type flashcards  # Flashcards only
    python3 scripts/enhance-content-llm.py --section CIA1     # One section only
    python3 scripts/enhance-content-llm.py --status           # Show progress
"""

import os
import sys
import json
import time
import re
import argparse

from datetime import datetime
from pathlib import Path

from dotenv import load_dotenv
load_dotenv('.env.local')

import warnings
warnings.filterwarnings('ignore', category=FutureWarning)

import google.generativeai as genai
genai.configure(api_key=os.getenv('VITE_GEMINI_API_KEY'))
MODEL = genai.GenerativeModel('gemini-2.0-flash')

# ─── CONFIG ───────────────────────────────────────────────────────────────────

MCQ_BATCH_SIZE = 10        # Questions per API call
LESSON_BATCH_SIZE = 2      # Lessons per API call (bigger output)
FLASHCARD_BATCH_SIZE = 15  # Flashcards per API call
MAX_RETRIES = 3
RETRY_DELAY = 5            # seconds, doubles each retry
SAVE_EVERY = 1             # Save checkpoint after every N batches
CHECKPOINT_DIR = Path('scripts/.enhance-checkpoints')
CHECKPOINT_DIR.mkdir(parents=True, exist_ok=True)

# ─── EXAM CONTEXT FOR PROMPTS ────────────────────────────────────────────────

EXAM_CONTEXT = {
    "CIA1": "CIA Part 1 - Essentials of Internal Auditing. Covers IIA Standards (IPPF), Code of Ethics, internal audit charter, independence/objectivity, proficiency/due professional care, QAIP, governance/risk/control frameworks. Based on IIA Global Internal Audit Standards.",
    "CIA2": "CIA Part 2 - Practice of Internal Auditing. Covers managing the internal audit activity, planning engagements, performing engagements (evidence, analysis, documentation, sampling, CAATs, fraud awareness), and communicating results. Based on IIA Performance Standards 2000-2500.",
    "CIA3": "CIA Part 3 - Business Knowledge for Internal Auditing. Covers strategic management, organizational behavior, project management, IT governance (COBIT), information security (CIA triad, ISO 27001), financial accounting, managerial accounting, capital budgeting.",
    "CISA1": "CISA Domain 1 - Information Systems Auditing Process (21% weight). Covers IS audit standards/guidelines (ISACA ITAF), risk-based audit planning, audit evidence, CAATs, continuous auditing, control frameworks (COSO/COBIT), and reporting.",
    "CISA2": "CISA Domain 2 - Governance and Management of IT (16% weight). Covers IT governance frameworks, IT strategy alignment, policies/standards, risk assessment methodologies, third-party risk, regulatory compliance (SOX/HIPAA/PCI-DSS), privacy (GDPR/CCPA).",
    "CISA3": "CISA Domain 3 - Information Systems Acquisition, Development and Implementation (18% weight). Covers SDLC methodologies (Agile/Waterfall/DevOps), project governance, requirements management, testing, change management, secure coding, vendor evaluation, cloud acquisition.",
    "CISA4": "CISA Domain 4 - Information Systems Operations and Business Resilience (20% weight). Covers IT service management (ITIL), incident/problem management, SLAs, disaster recovery planning (DRP), backup strategies, BCP, BIA, recovery strategies.",
    "CISA5": "CISA Domain 5 - Protection of Information Assets (25% weight). Covers security program management, IAM, authentication, network security, cryptography/PKI, physical/environmental controls, cloud security, IoT security.",
    "FAR": "CPA FAR - Financial Accounting and Reporting. Covers FASB Conceptual Framework, revenue recognition (ASC 606), leases (ASC 842), fair value (ASC 820), governmental accounting (GASB 34), fund accounting, NFP reporting (ASC 958), SEC reporting requirements.",
    "AUD": "CPA AUD - Auditing and Attestation. Covers AICPA professional standards, ethics/independence, audit planning/risk assessment (AU-C 300-320), audit evidence (AU-C 500), sampling (AU-C 530), analytical procedures, audit reports (AU-C 700-706), SSARS/attestation engagements, SOC reports.",
    "REG": "CPA REG - Regulation. Covers federal taxation (individuals, entities, property transactions), business law (contracts, UCC, agency), ethics/professional responsibility (Circular 230), and business structures.",
    "BAR": "CPA BAR - Business Analysis and Reporting. Covers financial statement analysis, performance metrics, prospective financial information, technical accounting (consolidations, derivatives, foreign currency, partnerships, governmental/NFP).",
    "ISC": "CPA ISC - Information Systems and Controls. Covers IT governance (COBIT/ITIL), information security (CIA triad, ISO 27001), identity/access management, encryption/PKI, network security, cloud computing, SDLC, incident response, data analytics, AI in accounting, RPA.",
    "TCP": "CPA TCP - Tax Compliance and Planning. Covers individual tax compliance (filing status, deductions, credits), property transactions (basis, 1031 exchanges, capital gains, depreciation recapture), entity taxation (C-corp, S-corp, partnership), estate/gift/trust taxation, multi-jurisdictional issues, tax planning strategies.",
    "SEE1": "EA SEE Part 1 - Individual Taxation. Covers AMT, self-employment tax, NIIT (IRC 1411), education tax benefits (AOTC/LLC), foreign earned income exclusion (IRC 911), amended returns, estate/gift basics, NRA taxation.",
    "CFP-PCR": "CFP Professional Conduct and Regulation (7% weight). Covers CFP Board Code of Ethics, Standards of Conduct, fiduciary duty, compensation disclosure, disciplinary rules/procedures.",
    "CFP-GEN": "CFP General Financial Planning Principles (15% weight). Covers personal financial statements, cash flow/budgeting, financial ratios, education planning (529s/ESAs), financial aid (FAFSA), debt strategies, mortgage analysis, credit management.",
    "CFP-RISK": "CFP Risk Management and Insurance Planning (12% weight). Covers life insurance analysis (term vs permanent), needs analysis (human life value/capital retention), health insurance (HSAs/FSAs), Medicare (Parts A-D/Medigap), property insurance, umbrella/excess liability.",
    "CFP-INV": "CFP Investment Planning (17% weight). Covers MPT, efficient frontier, asset allocation, equity valuation (DCF/P:E/DDM), bond pricing (duration/convexity/yield curves), alternatives, performance measurement (Sharpe/TWR/IRR), tax-loss harvesting, asset location, municipal bonds.",
    "CFP-TAX": "CFP Tax Planning (14% weight). Covers filing status, income tax computation, capital gains, estimated tax payments, IRS audit procedures, withholding, statute of limitations, charitable deductions (QCDs/DAFs/CRTs).",
    "CFP-RET": "CFP Retirement Savings and Income Planning (18% weight). Covers Social Security benefits, spousal/survivor benefits, qualified plans (401k/403b/457/DB), IRAs (Traditional/Roth), RMDs (SECURE Act), retirement income needs analysis, withdrawal sequencing, Roth conversions.",
    "CFP-EST": "CFP Estate Planning (10% weight). Covers trust types (revocable/irrevocable), wills/probate, gift/estate tax (annual exclusion/lifetime exemption), portability (DSUE), advanced techniques (GRATs/QPRTs/IDGTs), FLPs/valuation discounts.",
    "CFP-PSY": "CFP Psychology of Financial Planning (7% weight). Covers client communication, money scripts, crisis counseling, building trust, cognitive biases (anchoring/confirmation/recency), loss aversion/prospect theory, mental accounting, overconfidence.",
}

# ─── FILE PATHS ───────────────────────────────────────────────────────────────

Q_FILES = {
    "CIA1": "content/cia/cia1/questions.json",
    "CIA2": "content/cia/cia2/questions.json",
    "CIA3": "content/cia/cia3/questions.json",
    "CISA1": "content/cisa/cisa1/questions.json",
    "CISA2": "content/cisa/cisa2/questions.json",
    "CISA3": "content/cisa/cisa3/questions.json",
    "CISA4": "content/cisa/cisa4/questions.json",
    "CISA5": "content/cisa/cisa5/questions.json",
    "FAR": "content/cpa/far/questions.json",
    "AUD": "content/cpa/aud/questions.json",
    "REG": "content/cpa/reg/questions.json",
    "BAR": "content/cpa/bar/questions.json",
    "ISC": "content/cpa/isc/questions.json",
    "TCP": "content/cpa/tcp/questions.json",
    "SEE1": "content/ea/see1/questions.json",
    "CFP-PCR": "content/cfp/CFP-PCR/questions.json",
    "CFP-GEN": "content/cfp/CFP-GEN/questions.json",
    "CFP-RISK": "content/cfp/CFP-RISK/questions.json",
    "CFP-INV": "content/cfp/CFP-INV/questions.json",
    "CFP-TAX": "content/cfp/CFP-TAX/questions.json",
    "CFP-RET": "content/cfp/CFP-RET/questions.json",
    "CFP-EST": "content/cfp/CFP-EST/questions.json",
    "CFP-PSY": "content/cfp/CFP-PSY/questions.json",
}

LESSON_FILES = {
    "CIA1": "src/data/cia/lessons/json/cia1-batch-v3.json",
    "CIA1-B5": "src/data/cia/lessons/json/cia1-batch5.json",
    "CIA2": "src/data/cia/lessons/json/cia2-batch-v3.json",
    "CIA2-B5": "src/data/cia/lessons/json/cia2-batch5.json",
    "CIA3": "src/data/cia/lessons/json/cia3-batch-v3.json",
    "CIA3-B5": "src/data/cia/lessons/json/cia3-batch5.json",
    "CISA1": "src/data/cisa/lessons/json/cisa1-batch4.json",
    "CISA2": "src/data/cisa/lessons/json/cisa2-batch3.json",
    "CISA3": "src/data/cisa/lessons/json/cisa3-batch3.json",
    "CISA4": "src/data/cisa/lessons/json/cisa4-batch3.json",
    "CISA5": "src/data/cisa/lessons/json/cisa5-batch3.json",
    "FAR": "src/data/cpa/lessons/json/far-batch-v3.json",
    "AUD": "src/data/cpa/lessons/json/aud-batch-v3.json",
    "ISC": "src/data/cpa/lessons/json/isc-batch-v3.json",
    "TCP": "src/data/cpa/lessons/json/tcp-batch-v3.json",
    "SEE1": "src/data/ea/lessons/json/see1-batch2.json",
    "CFP-PCR": "src/data/cfp/lessons/json/pcr-batch2.json",
    "CFP-GEN": "src/data/cfp/lessons/json/gen-batch2.json",
    "CFP-RISK": "src/data/cfp/lessons/json/risk-batch2.json",
    "CFP-INV": "src/data/cfp/lessons/json/inv-batch2.json",
    "CFP-TAX": "src/data/cfp/lessons/json/tax-batch2.json",
    "CFP-RET": "src/data/cfp/lessons/json/ret-batch2.json",
    "CFP-EST": "src/data/cfp/lessons/json/est-batch2.json",
    "CFP-PSY": "src/data/cfp/lessons/json/psy-batch2.json",
}

FC_FILES = {
    "cia": "content/cia/flashcards.json",
    "cisa": "content/cisa/flashcards.json",
    "cfp": "content/cfp/flashcards.json",
    "cpa": "content/cpa/flashcards.json",
    "ea": "content/ea/flashcards.json",
}

# ─── HELPERS ──────────────────────────────────────────────────────────────────

def parse_json_response(text):
    """Parse JSON from Gemini response, handling markdown fences and edge cases."""
    text = text.strip()
    # Remove markdown code fences
    if text.startswith('```'):
        text = text.split('\n', 1)[1] if '\n' in text else text[3:]
    if text.endswith('```'):
        text = text.rsplit('```', 1)[0]
    text = text.strip()

    # Try parsing as-is first
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    # Fix common Gemini JSON issues
    fixed = _fix_json(text)
    try:
        return json.loads(fixed)
    except json.JSONDecodeError:
        pass

    # Try to extract JSON array or object
    match = re.search(r'(\[[\s\S]*\])', text)
    if match:
        try:
            return json.loads(_fix_json(match.group(1)))
        except json.JSONDecodeError:
            pass
    match = re.search(r'(\{[\s\S]*\})', text)
    if match:
        try:
            return json.loads(_fix_json(match.group(1)))
        except json.JSONDecodeError:
            pass

    raise json.JSONDecodeError("Could not parse JSON from response", text, 0)


def _fix_json(text):
    """Fix common JSON issues from LLM output."""
    # Remove trailing commas before } or ]
    text = re.sub(r',\s*([}\]])', r'\1', text)
    # Fix single quotes used as string delimiters (only if no double quotes around them)
    # This is risky so only do it if the text has no double-quoted strings
    if '"' not in text:
        text = text.replace("'", '"')
    # Remove control characters except newlines and tabs
    text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', '', text)
    return text


def api_call_with_retry(prompt, retries=MAX_RETRIES):
    """Call Gemini API with exponential backoff retry."""
    delay = RETRY_DELAY
    for attempt in range(retries):
        try:
            resp = MODEL.generate_content(prompt)
            return parse_json_response(resp.text)
        except json.JSONDecodeError as e:
            if attempt < retries - 1:
                print(f"    JSON parse error (attempt {attempt+1}), retrying...")
                time.sleep(delay)
                delay *= 2
            else:
                raise
        except Exception as e:
            err_str = str(e)
            if '429' in err_str or 'quota' in err_str.lower() or 'rate' in err_str.lower():
                wait = min(delay * 2, 60)
                print(f"    Rate limited, waiting {wait}s...")
                time.sleep(wait)
                delay *= 2
            elif attempt < retries - 1:
                print(f"    API error (attempt {attempt+1}): {err_str[:100]}, retrying...")
                time.sleep(delay)
                delay *= 2
            else:
                raise


def load_checkpoint(name):
    """Load checkpoint file, returns set of completed IDs."""
    path = CHECKPOINT_DIR / f"{name}.json"
    if path.exists():
        with open(path) as f:
            return set(json.load(f))
    return set()


def save_checkpoint(name, completed_ids):
    """Save checkpoint with completed IDs."""
    path = CHECKPOINT_DIR / f"{name}.json"
    with open(path, 'w') as f:
        json.dump(sorted(completed_ids), f)


# ─── MCQ ENHANCEMENT ─────────────────────────────────────────────────────────

def build_mcq_prompt(section, questions):
    """Build a prompt to generate real exam questions given template metadata."""
    ctx = EXAM_CONTEXT.get(section, f"{section} exam content")
    
    items_desc = []
    for i, q in enumerate(questions):
        items_desc.append(
            f"  {i+1}. blueprintArea: {q['blueprintArea']}, topic: \"{q['topic']}\", "
            f"subtopic: \"{q.get('subtopic','')}\", difficulty: {q['difficulty']}, "
            f"skillLevel: {q['skillLevel']}, reference: \"{q.get('reference','')}\""
        )
    items_str = "\n".join(items_desc)
    
    return f"""You are an expert {section} exam question writer. Generate {len(questions)} unique, exam-quality multiple-choice questions.

EXAM CONTEXT: {ctx}

For each question below, write a realistic exam question matching the specified topic, difficulty, and skill level.

QUESTIONS TO GENERATE:
{items_str}

REQUIREMENTS:
- Each question must present a unique, realistic professional scenario
- Easy = recall/definition; Medium = application/scenario; Hard = analysis/judgment with nuance
- Options should be plausible — no obviously wrong "joke" answers
- Correct answer should NOT always be the first option — vary position randomly
- Explanations must cite the authoritative source
- whyWrong must explain specifically why each wrong option fails AND why the correct one is right
- examTip should give actionable test-taking advice
- bottomLine should be a single memorable sentence

Return ONLY a valid JSON array with {len(questions)} objects (no markdown fences):
[
  {{
    "question": "Full question text with realistic scenario",
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "correctAnswer": 0,
    "explanation": "2-3 sentences explaining the correct answer with authoritative reference",
    "whyWrong": {{
      "0": "CORRECT: Why this is right with specific reference...",
      "1": "INCORRECT: Why this specific option is wrong...",
      "2": "INCORRECT: Why this specific option is wrong...",
      "3": "INCORRECT: Why this specific option is wrong..."
    }},
    "educational": "2-3 sentences of broader educational context connecting this to exam themes",
    "examTip": "Practical test-taking tip for this topic",
    "memoryAid": "Mnemonic or memory technique",
    "commonMistake": "What candidates typically get wrong and why",
    "bottomLine": "One memorable summary sentence"
  }}
]"""


def enhance_mcqs_for_section(section, filepath):
    """Enhance all template MCQs in a section's question file."""
    checkpoint_name = f"mcq-{section}"
    completed = load_checkpoint(checkpoint_name)
    
    with open(filepath) as f:
        data = json.load(f)
    
    template_qs = [
        (i, q) for i, q in enumerate(data['questions'])
        if q.get('sourceFile', '').startswith('generated-gap-fill')
        and q['id'] not in completed
    ]
    
    if not template_qs:
        print(f"  {section}: All MCQs already enhanced ✓")
        return 0
    
    total = len(template_qs)
    print(f"  {section}: {total} MCQs to enhance...")
    
    enhanced_count = 0
    batch_count = 0
    
    for batch_start in range(0, total, MCQ_BATCH_SIZE):
        batch = template_qs[batch_start:batch_start + MCQ_BATCH_SIZE]
        batch_indices = [idx for idx, _ in batch]
        batch_qs = [q for _, q in batch]
        
        try:
            enhanced = api_call_with_retry(build_mcq_prompt(section, batch_qs))
            
            if not isinstance(enhanced, list) or len(enhanced) != len(batch_qs):
                print(f"    ⚠ Batch returned {len(enhanced) if isinstance(enhanced, list) else 'non-list'}, expected {len(batch_qs)}. Retrying individual...")
                # Fall back to individual processing
                for idx, q in batch:
                    try:
                        single = api_call_with_retry(build_mcq_prompt(section, [q]))
                        if isinstance(single, list) and len(single) == 1:
                            _apply_mcq_enhancement(data['questions'][idx], single[0])
                            completed.add(q['id'])
                            enhanced_count += 1
                    except Exception as e:
                        print(f"    ✗ Failed {q['id']}: {str(e)[:80]}")
                continue
            
            for (idx, q), enh in zip(batch, enhanced):
                _apply_mcq_enhancement(data['questions'][idx], enh)
                completed.add(q['id'])
                enhanced_count += 1
            
            batch_count += 1
            if batch_count % SAVE_EVERY == 0:
                save_checkpoint(checkpoint_name, completed)
                _save_questions(filepath, data)
            
            progress = batch_start + len(batch)
            print(f"    [{progress}/{total}] +{len(batch)} enhanced")
            time.sleep(1)  # Small delay between batches
            
        except Exception as e:
            print(f"    ✗ Batch error: {str(e)[:120]}")
            # Save progress and continue to next batch
            save_checkpoint(checkpoint_name, completed)
            _save_questions(filepath, data)
            # Try individual items from this batch as fallback
            print(f"    ↻ Falling back to individual processing for this batch...")
            for idx, q in batch:
                if q['id'] in completed:
                    continue
                try:
                    single = api_call_with_retry(build_mcq_prompt(section, [q]))
                    if isinstance(single, list) and len(single) >= 1:
                        _apply_mcq_enhancement(data['questions'][idx], single[0])
                        completed.add(q['id'])
                        enhanced_count += 1
                    elif isinstance(single, dict):
                        _apply_mcq_enhancement(data['questions'][idx], single)
                        completed.add(q['id'])
                        enhanced_count += 1
                except Exception as e2:
                    print(f"      ✗ Skipping {q['id']}: {str(e2)[:80]}")
            save_checkpoint(checkpoint_name, completed)
            _save_questions(filepath, data)
    
    # Final save
    save_checkpoint(checkpoint_name, completed)
    _save_questions(filepath, data)
    print(f"  {section}: {enhanced_count}/{total} MCQs enhanced ✓")
    return enhanced_count


def _apply_mcq_enhancement(original, enhanced):
    """Apply LLM-generated content to original question, preserving metadata."""
    text_fields = ['question', 'options', 'correctAnswer', 'explanation', 
                   'whyWrong', 'educational', 'examTip', 'memoryAid',
                   'commonMistake', 'bottomLine']
    for field in text_fields:
        if field in enhanced and enhanced[field]:
            original[field] = enhanced[field]
    # Ensure options is always length 4
    if len(original.get('options', [])) != 4:
        original['options'] = (original.get('options', []) + ['', '', '', ''])[:4]
    # Ensure correctAnswer is valid
    if not isinstance(original.get('correctAnswer'), int) or original['correctAnswer'] not in range(4):
        original['correctAnswer'] = 0
    # Mark as enhanced
    original['sourceFile'] = original.get('sourceFile', '') + '-enhanced'


def _save_questions(filepath, data):
    """Save question file with updated timestamp."""
    data['lastEnhanced'] = datetime.now().strftime("%Y-%m-%dT%H:%M:%S.000Z")
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


# ─── LESSON ENHANCEMENT ──────────────────────────────────────────────────────

def build_lesson_prompt(section, lessons):
    """Build prompt to generate real lesson content."""
    ctx = EXAM_CONTEXT.get(section, f"{section} exam content")
    
    items = []
    for i, l in enumerate(lessons):
        items.append(
            f"  {i+1}. title: \"{l['title']}\", blueprintArea: {l.get('blueprintArea','')}, "
            f"topics: {l.get('topics', [])}, difficulty: {l.get('difficulty','intermediate')}, "
            f"duration: {l.get('duration', 35)} min"
        )
    items_str = "\n".join(items)
    
    return f"""You are an expert {section} exam prep instructor creating study material.

EXAM CONTEXT: {ctx}

Generate comprehensive lesson content for these {len(lessons)} lessons:
{items_str}

For EACH lesson, write thorough educational content that a candidate would actually study from.

REQUIREMENTS:
- Content must be factually accurate and cite real standards/frameworks/rules
- Use clear explanations suitable for professionals studying for the exam
- Include concrete examples, not abstract descriptions
- Each lesson should have 4-6 content sections with varied types
- Cover the topic thoroughly enough to support 30-45 min of study time

Return ONLY a valid JSON array with {len(lessons)} objects:
[
  {{
    "title": "Clear, descriptive lesson title",
    "description": "1-2 sentence lesson summary",
    "content": {{
      "sections": [
        {{"title": "Why This Matters", "type": "callout", "content": "Brief motivational context for exam relevance"}},
        {{"title": "Key Concepts", "type": "text", "content": "Main content with **bold terms**, bullet points, and clear structure. At least 200 words."}},
        {{"title": "Detailed Analysis", "type": "text", "content": "Deeper coverage with examples, comparisons, and frameworks. At least 300 words."}},
        {{"title": "Exam Focus Areas", "type": "text", "content": "What the exam tests and how. Include common question patterns."}},
        {{"title": "Practical Example", "type": "text", "content": "Real-world scenario applying these concepts"}},
        {{"title": "Key Takeaways", "type": "callout", "content": "• Bullet point summary of must-know facts"}}
      ]
    }}
  }}
]"""


def enhance_lessons_for_section(section, filepath):
    """Enhance all template lessons in a section's lesson file."""
    checkpoint_name = f"lesson-{section}"
    completed = load_checkpoint(checkpoint_name)
    
    if not os.path.exists(filepath):
        print(f"  {section}: No lesson file found")
        return 0
    
    with open(filepath) as f:
        lessons = json.load(f)
    
    # Filter to un-enhanced lessons (check if content is template-like)
    template_lessons = [
        (i, l) for i, l in enumerate(lessons)
        if l['id'] not in completed
        and _is_template_lesson(l)
    ]
    
    if not template_lessons:
        print(f"  {section}: All lessons already enhanced ✓")
        return 0
    
    total = len(template_lessons)
    print(f"  {section}: {total} lessons to enhance...")
    
    enhanced_count = 0
    
    for batch_start in range(0, total, LESSON_BATCH_SIZE):
        batch = template_lessons[batch_start:batch_start + LESSON_BATCH_SIZE]
        batch_lessons = [l for _, l in batch]
        
        try:
            enhanced = api_call_with_retry(build_lesson_prompt(section, batch_lessons))
            
            if not isinstance(enhanced, list):
                enhanced = [enhanced]
            
            for (idx, orig), enh in zip(batch, enhanced[:len(batch)]):
                _apply_lesson_enhancement(lessons[idx], enh)
                completed.add(orig['id'])
                enhanced_count += 1
            
            save_checkpoint(checkpoint_name, completed)
            with open(filepath, 'w') as f:
                json.dump(lessons, f, indent=2, ensure_ascii=False)
            
            progress = batch_start + len(batch)
            print(f"    [{progress}/{total}] +{len(batch)} enhanced")
            
        except Exception as e:
            print(f"    ✗ Batch error: {str(e)[:120]}")
            save_checkpoint(checkpoint_name, completed)
            with open(filepath, 'w') as f:
                json.dump(lessons, f, indent=2, ensure_ascii=False)
    
    print(f"  {section}: {enhanced_count}/{total} lessons enhanced ✓")
    return enhanced_count


def _is_template_lesson(lesson):
    """Check if a lesson has template/placeholder content."""
    content = lesson.get('content', {})
    sections = content.get('sections', [])
    if not sections:
        return True
    # Check if content has template markers
    text_parts = []
    for s in sections:
        c = s.get('content', '')
        if isinstance(c, str):
            text_parts.append(c)
        elif isinstance(c, list):
            text_parts.extend(str(x) for x in c)
    full_text = ' '.join(text_parts)
    template_markers = [
        'Establish objectives and scope based on risk assessment',
        'Step 1: Identify the relevant standards',
        'Understanding.*is critical for the.*exam',
        'Focus on practical application, not just theory',
        'This lesson covers.*a key topic in.*exam preparation',
        'directly impacts.*exam readiness',
        'Understanding.*is essential for .{2,6}\\.',
    ]
    for marker in template_markers:
        if re.search(marker, full_text):
            return True
    return False


def _apply_lesson_enhancement(original, enhanced):
    """Apply LLM-generated content to original lesson."""
    if 'title' in enhanced and enhanced['title']:
        original['title'] = enhanced['title']
    if 'description' in enhanced and enhanced['description']:
        original['description'] = enhanced['description']
    if 'content' in enhanced and enhanced['content']:
        original['content'] = enhanced['content']


# ─── FLASHCARD ENHANCEMENT ───────────────────────────────────────────────────

def build_flashcard_prompt(section, course_id, flashcards):
    """Build prompt to generate real flashcard content."""
    ctx = EXAM_CONTEXT.get(section, f"{section} exam content")
    
    items = []
    for i, fc in enumerate(flashcards):
        items.append(
            f"  {i+1}. topic: \"{fc['topic']}\", blueprintArea: {fc.get('blueprintArea','')}, "
            f"difficulty: {fc.get('difficulty','medium')}"
        )
    items_str = "\n".join(items)
    
    return f"""You are an expert {section} exam prep instructor creating flashcards.

EXAM CONTEXT: {ctx}

Generate high-quality flashcard content for these {len(flashcards)} cards:
{items_str}

REQUIREMENTS:
- Front: A clear, specific question that tests one concept (not vague or overly broad)
- Back: A concise, accurate answer (2-4 sentences max) with the key fact + brief context
- Cards should test real exam knowledge, not generic study advice
- Vary question types: "What is...", "How does...", "What distinguishes...", "When should..."

Return ONLY a valid JSON array with {len(flashcards)} objects:
[
  {{
    "front": "Specific exam-relevant question",
    "back": "Concise, accurate answer with key fact and brief supporting context."
  }}
]"""


def enhance_flashcards_for_course(course_id, filepath):
    """Enhance all template flashcards in a course's flashcard file."""
    checkpoint_name = f"fc-{course_id}"
    completed = load_checkpoint(checkpoint_name)
    
    with open(filepath) as f:
        data = json.load(f)
    
    # Filter to template flashcards
    template_fcs = [
        (i, fc) for i, fc in enumerate(data['flashcards'])
        if fc['id'] not in completed
        and _is_template_flashcard(fc)
    ]
    
    if not template_fcs:
        print(f"  {course_id}: All flashcards already enhanced ✓")
        return 0
    
    total = len(template_fcs)
    print(f"  {course_id}: {total} flashcards to enhance...")
    
    enhanced_count = 0
    
    # Group by section for better context
    by_section = {}
    for idx, fc in template_fcs:
        sec = fc.get('section', 'unknown')
        by_section.setdefault(sec, []).append((idx, fc))
    
    for section, section_fcs in by_section.items():
        for batch_start in range(0, len(section_fcs), FLASHCARD_BATCH_SIZE):
            batch = section_fcs[batch_start:batch_start + FLASHCARD_BATCH_SIZE]
            batch_fcs = [fc for _, fc in batch]
            
            try:
                enhanced = api_call_with_retry(
                    build_flashcard_prompt(section, course_id, batch_fcs)
                )
                
                if not isinstance(enhanced, list):
                    enhanced = [enhanced]
                
                for (idx, orig), enh in zip(batch, enhanced[:len(batch)]):
                    if 'front' in enh and enh['front']:
                        data['flashcards'][idx]['front'] = enh['front']
                    if 'back' in enh and enh['back']:
                        data['flashcards'][idx]['back'] = enh['back']
                    completed.add(orig['id'])
                    enhanced_count += 1
                
                save_checkpoint(checkpoint_name, completed)
                with open(filepath, 'w') as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
                
                print(f"    {section} [{enhanced_count}/{total}] +{len(batch)} enhanced")
                
            except Exception as e:
                print(f"    ✗ Batch error ({section}): {str(e)[:120]}")
                save_checkpoint(checkpoint_name, completed)
                with open(filepath, 'w') as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"  {course_id}: {enhanced_count}/{total} flashcards enhanced ✓")
    return enhanced_count


def _is_template_flashcard(fc):
    """Check if a flashcard has template/placeholder content."""
    front = fc.get('front', '')
    back = fc.get('back', '')
    template_markers = [
        'What is the key requirement of',
        'What is the key concept of',
        'What is the primary purpose of',
        'What is the key rule for',
        'Define .* in the context of',
        'What is .* in the context of',
        'requires.*to ensure proper governance',
        'As defined by.*this requires a systematic approach',
        'establishes that.*involves',
        'is essential for professional financial planning practice',
        'This concept is fundamental to .* exam content',
        'as defined by .* This concept is fundamental',
    ]
    for marker in template_markers:
        if re.search(marker, front + ' ' + back):
            return True
    return False


# ─── STATUS / PROGRESS ───────────────────────────────────────────────────────

def show_status():
    """Show enhancement progress across all content types."""
    print("\n" + "=" * 70)
    print("ENHANCEMENT PROGRESS")
    print("=" * 70)
    
    # MCQs
    print("\nMCQs:")
    total_mcq = 0
    total_done = 0
    for section, path in Q_FILES.items():
        cp = load_checkpoint(f"mcq-{section}")
        with open(path) as f:
            data = json.load(f)
        template = [q for q in data['questions'] if q.get('sourceFile', '').startswith('generated-gap-fill')]
        done = len(cp)
        remaining = len(template) - done
        total_mcq += len(template)
        total_done += done
        status = "✓" if remaining <= 0 else f"{done}/{len(template)}"
        print(f"  {section:10s}: {status}")
    print(f"  {'TOTAL':10s}: {total_done}/{total_mcq}")
    
    # Lessons
    print("\nLessons:")
    total_les = 0
    total_les_done = 0
    for section, path in LESSON_FILES.items():
        cp = load_checkpoint(f"lesson-{section}")
        if os.path.exists(path):
            with open(path) as f:
                lessons = json.load(f)
            template = [l for l in lessons if _is_template_lesson(l) or l['id'] in cp]
            done = len(cp)
            total_les += len(template)
            total_les_done += done
            status = "✓" if done >= len(template) else f"{done}/{len(template)}"
            print(f"  {section:10s}: {status}")
    print(f"  {'TOTAL':10s}: {total_les_done}/{total_les}")
    
    # Flashcards
    print("\nFlashcards:")
    total_fc = 0
    total_fc_done = 0
    for course, path in FC_FILES.items():
        cp = load_checkpoint(f"fc-{course}")
        with open(path) as f:
            data = json.load(f)
        template = [fc for fc in data['flashcards'] if _is_template_flashcard(fc) or fc['id'] in cp]
        done = len(cp)
        total_fc += len(template)
        total_fc_done += done
        status = "✓" if done >= len(template) else f"{done}/{len(template)}"
        print(f"  {course:10s}: {status}")
    print(f"  {'TOTAL':10s}: {total_fc_done}/{total_fc}")
    
    grand_total = total_mcq + total_les + total_fc
    grand_done = total_done + total_les_done + total_fc_done
    pct = (grand_done / grand_total * 100) if grand_total > 0 else 0
    print(f"\n{'=' * 70}")
    print(f"GRAND TOTAL: {grand_done}/{grand_total} ({pct:.1f}%)")
    print(f"{'=' * 70}\n")


# ─── MAIN ────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description='LLM Content Enhancement Pipeline')
    parser.add_argument('--type', choices=['mcqs', 'lessons', 'flashcards'], 
                       help='Content type to enhance (default: all)')
    parser.add_argument('--section', type=str, help='Single section to process (e.g. CIA1, CISA3)')
    parser.add_argument('--status', action='store_true', help='Show progress status')
    args = parser.parse_args()
    
    if args.status:
        show_status()
        return
    
    start_time = time.time()
    total_enhanced = 0
    
    print(f"\nLLM Content Enhancement Pipeline")
    print(f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)
    
    # MCQs
    if args.type in (None, 'mcqs'):
        print("\n📝 Enhancing MCQs...")
        sections = {args.section: Q_FILES[args.section]} if args.section and args.section in Q_FILES else Q_FILES
        for section, path in sections.items():
            count = enhance_mcqs_for_section(section, path)
            total_enhanced += count
    
    # Lessons
    if args.type in (None, 'lessons'):
        print("\n📚 Enhancing Lessons...")
        sections = {args.section: LESSON_FILES[args.section]} if args.section and args.section in LESSON_FILES else LESSON_FILES
        for section, path in sections.items():
            count = enhance_lessons_for_section(section, path)
            total_enhanced += count
    
    # Flashcards
    if args.type in (None, 'flashcards'):
        print("\n🃏 Enhancing Flashcards...")
        if args.section:
            # Map section to course
            sec_to_course = {}
            for sec in Q_FILES:
                if sec.startswith('CIA'): sec_to_course[sec] = 'cia'
                elif sec.startswith('CISA'): sec_to_course[sec] = 'cisa'
                elif sec.startswith('CFP'): sec_to_course[sec] = 'cfp'
                elif sec == 'FAR': sec_to_course[sec] = 'cpa'
                elif sec == 'SEE1': sec_to_course[sec] = 'ea'
            course = sec_to_course.get(args.section)
            if course:
                count = enhance_flashcards_for_course(course, FC_FILES[course])
                total_enhanced += count
        else:
            for course, path in FC_FILES.items():
                count = enhance_flashcards_for_course(course, path)
                total_enhanced += count
    
    elapsed = time.time() - start_time
    hours = int(elapsed // 3600)
    mins = int((elapsed % 3600) // 60)
    
    print(f"\n{'=' * 70}")
    print(f"COMPLETE: {total_enhanced} items enhanced in {hours}h {mins}m")
    print(f"{'=' * 70}\n")
    
    show_status()


if __name__ == "__main__":
    main()
