#!/usr/bin/env python3
"""
Enrich question JSON files with bottomLine field using Gemini API.

Reads each question's explanation + correct answer and generates a concise
one-liner takeaway (the "bottom line") that students can memorize.

Usage:
  # Dry run — show what would be enriched
  python scripts/enrich-bottomline.py --dry-run

  # Enrich a single file
  python scripts/enrich-bottomline.py content/cpa/far/questions.json

  # Enrich all files for an exam
  python scripts/enrich-bottomline.py --exam cpa

  # Enrich everything
  python scripts/enrich-bottomline.py --all

  # Set batch size (default 20 questions per API call)
  python scripts/enrich-bottomline.py --all --batch-size 25

Environment:
  GEMINI_API_KEY — Required. Google Gemini API key.
  Or reads from .env / .env.local (VITE_GEMINI_API_KEY).
"""

import argparse
import glob
import json
import os
import sys
import time

try:
    import google.generativeai as genai
except ImportError:
    print("ERROR: google-generativeai not installed. Run: pip install google-generativeai")
    sys.exit(1)


def load_api_key():
    """Load Gemini API key from environment or .env files."""
    key = os.environ.get("GEMINI_API_KEY")
    if key:
        return key

    # Try .env.local then .env
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    for envfile in [".env.local", ".env"]:
        path = os.path.join(root, envfile)
        if os.path.exists(path):
            with open(path) as f:
                for line in f:
                    line = line.strip()
                    if line.startswith("VITE_GEMINI_API_KEY=") and not line.startswith("#"):
                        val = line.split("=", 1)[1].strip().strip('"').strip("'")
                        if val and not val.startswith("your-"):
                            return val
    return None


def find_question_files(exam=None):
    """Find all questions.json files, optionally filtered by exam."""
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    if exam:
        pattern = os.path.join(root, "content", exam, "*", "questions.json")
    else:
        pattern = os.path.join(root, "content", "*", "*", "questions.json")
    return sorted(glob.glob(pattern))


def generate_bottomlines(model, questions_batch):
    """Generate bottomLine for a batch of questions using Gemini."""
    items = []
    for q in questions_batch:
        correct_option = q["options"][q["correctAnswer"]]
        items.append(
            f"ID: {q['id']}\n"
            f"Q: {q['question'][:200]}\n"
            f"Correct: {correct_option[:150]}\n"
            f"Explanation: {q.get('explanation', '')[:300]}"
        )

    prompt = (
        "You are a professional exam prep content writer. For each question below, "
        "write a concise 'Bottom Line' takeaway — a single sentence (15-30 words) that "
        "captures the core rule, principle, or fact the student must remember. "
        "Make it direct and memorable. No fluff, no 'Remember that...', just the rule.\n\n"
        "Return ONLY a JSON array of objects with 'id' and 'bottomLine' fields. "
        "No markdown, no code fences, just the JSON array.\n\n"
        + "\n---\n".join(items)
    )

    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        # Strip markdown code fences if present
        if text.startswith("```"):
            text = text.split("\n", 1)[1] if "\n" in text else text[3:]
        if text.endswith("```"):
            text = text.rsplit("```", 1)[0]
        text = text.strip()

        results = json.loads(text)
        return {r["id"]: r["bottomLine"] for r in results if "id" in r and "bottomLine" in r}
    except (json.JSONDecodeError, KeyError, AttributeError) as e:
        print(f"  WARNING: Failed to parse Gemini response: {e}")
        return {}
    except Exception as e:
        print(f"  ERROR: Gemini API call failed: {e}")
        return {}


def enrich_file(filepath, model, batch_size=20, dry_run=False):
    """Enrich a single questions.json file with bottomLine fields."""
    with open(filepath) as f:
        data = json.load(f)

    questions = data.get("questions", [])
    if not isinstance(questions, list):
        print(f"  Skipping {filepath} — unexpected format")
        return 0

    # Find questions missing bottomLine
    needs_enrichment = [q for q in questions if not q.get("bottomLine")]
    if not needs_enrichment:
        print(f"  {filepath}: all {len(questions)} questions already have bottomLine")
        return 0

    print(f"  {filepath}: {len(needs_enrichment)}/{len(questions)} need bottomLine")

    if dry_run:
        return len(needs_enrichment)

    # Process in batches
    enriched_count = 0
    q_map = {q["id"]: q for q in questions}

    for i in range(0, len(needs_enrichment), batch_size):
        batch = needs_enrichment[i : i + batch_size]
        print(f"    Batch {i // batch_size + 1}: processing {len(batch)} questions...", end=" ", flush=True)

        results = generate_bottomlines(model, batch)

        for qid, bl in results.items():
            if qid in q_map and bl:
                q_map[qid]["bottomLine"] = bl
                enriched_count += 1

        print(f"got {len(results)} results")

        # Rate limiting: ~15 RPM for free tier, be conservative
        if i + batch_size < len(needs_enrichment):
            time.sleep(4)

    # Write back
    if enriched_count > 0:
        with open(filepath, "w") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            f.write("\n")
        print(f"    Wrote {enriched_count} bottomLines to {filepath}")

    return enriched_count


def main():
    parser = argparse.ArgumentParser(description="Enrich questions with bottomLine via Gemini")
    parser.add_argument("file", nargs="?", help="Specific questions.json file to enrich")
    parser.add_argument("--exam", help="Enrich all files for an exam (cpa, ea, cma, cia, cisa, cfp)")
    parser.add_argument("--all", action="store_true", help="Enrich all exam files")
    parser.add_argument("--batch-size", type=int, default=20, help="Questions per API call (default: 20)")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be enriched without making changes")
    args = parser.parse_args()

    if not args.file and not args.exam and not args.all:
        parser.print_help()
        print("\nExample: python scripts/enrich-bottomline.py --exam cpa")
        sys.exit(1)

    api_key = load_api_key()
    if not api_key and not args.dry_run:
        print("ERROR: No Gemini API key found. Set GEMINI_API_KEY env var or add to .env.local")
        sys.exit(1)

    if not args.dry_run:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-2.0-flash")
    else:
        model = None

    # Determine files to process
    if args.file:
        files = [args.file]
    elif args.exam:
        files = find_question_files(args.exam)
    else:
        files = find_question_files()

    if not files:
        print("No question files found.")
        sys.exit(1)

    print(f"{'[DRY RUN] ' if args.dry_run else ''}Processing {len(files)} file(s)...\n")

    total = 0
    for f in files:
        total += enrich_file(f, model, batch_size=args.batch_size, dry_run=args.dry_run)

    print(f"\n{'Would enrich' if args.dry_run else 'Enriched'} {total} questions total.")


if __name__ == "__main__":
    main()
