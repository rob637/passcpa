#!/usr/bin/env python3
"""
Detects and (optionally) auto-fixes whyWrong/correctAnswer contradictions
in question JSON files.

Two contradiction patterns:
  A) whyWrong[correctAnswer] header says the correct option "is WRONG"
  B) whyWrong[i] (i != correctAnswer) header says the wrong option "is CORRECT"

Strategy: We only repair the *header* sentence ("Why option X is WRONG/CORRECT")
when it disagrees with `correctAnswer`. The body of the explanation is NOT
modified — that requires human/LLM review and is reported separately.

Usage:
  python3 scripts/fix-whywrong-contradictions.py                  # dry run, all courses
  python3 scripts/fix-whywrong-contradictions.py --apply          # write fixes
  python3 scripts/fix-whywrong-contradictions.py --course cpa     # filter
  python3 scripts/fix-whywrong-contradictions.py --section tcp    # filter
"""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Iterable

ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = ROOT / "content"

LETTERS = ["A", "B", "C", "D", "E", "F"]

# Header regexes: "Why option X is WRONG/CORRECT - …" (case insensitive,
# tolerant to punctuation and missing dash).
HEADER_RE = re.compile(
    r"^(?P<prefix>\s*Why\s+option\s+(?P<letter>[A-F])\s+is\s+)"
    r"(?P<verdict>CORRECT|WRONG|INCORRECT|RIGHT)"
    r"(?P<rest>\b.*)",
    re.IGNORECASE | re.DOTALL,
)


def iter_question_files(course_filter: str | None, section_filter: str | None) -> Iterable[Path]:
    if not CONTENT_DIR.exists():
        return
    for course_dir in sorted(CONTENT_DIR.iterdir()):
        if not course_dir.is_dir():
            continue
        if course_filter and course_dir.name != course_filter:
            continue
        for section_dir in sorted(course_dir.iterdir()):
            if not section_dir.is_dir():
                continue
            if section_filter and section_dir.name != section_filter:
                continue
            qfile = section_dir / "questions.json"
            if qfile.exists():
                yield qfile


def fix_header(text: str, should_be_correct: bool) -> tuple[str, bool]:
    """Return (new_text, changed)."""
    m = HEADER_RE.match(text)
    if not m:
        return text, False
    current = m.group("verdict").upper()
    is_correct_now = current in ("CORRECT", "RIGHT")
    if is_correct_now == should_be_correct:
        return text, False
    new_verdict = "CORRECT" if should_be_correct else "WRONG"
    new_text = f"{m.group('prefix')}{new_verdict}{m.group('rest')}"
    return new_text, True


def process_file(path: Path, apply: bool) -> dict:
    raw = path.read_text(encoding="utf-8")
    data = json.loads(raw)
    questions = data.get("questions", []) if isinstance(data, dict) else data
    fixes = 0
    body_warnings: list[str] = []

    for q in questions:
        if not isinstance(q, dict):
            continue
        ww = q.get("whyWrong")
        ca = q.get("correctAnswer")
        if not isinstance(ww, dict) or not isinstance(ca, int):
            continue
        for key, val in list(ww.items()):
            try:
                idx = int(key)
            except (TypeError, ValueError):
                continue
            if not isinstance(val, str):
                continue
            should_be_correct = idx == ca
            new_val, changed = fix_header(val, should_be_correct)
            if changed:
                ww[key] = new_val
                fixes += 1
            # Body sanity check: does the body contradict the (now-correct) header?
            body = ww[key]
            lower = body.lower()
            if should_be_correct and re.search(r"\bis (wrong|incorrect)\b", lower[40:]):
                body_warnings.append(f"  {q.get('id')} opt{LETTERS[idx]}: body still says 'is wrong'")
            if (not should_be_correct) and re.search(r"\bis correct\b", lower[40:]):
                body_warnings.append(f"  {q.get('id')} opt{LETTERS[idx]}: body still says 'is correct'")

    if apply and fixes:
        # Preserve trailing newline + 2-space indent style of original
        ends_nl = raw.endswith("\n")
        out = json.dumps(data, indent=2, ensure_ascii=False)
        if ends_nl:
            out += "\n"
        path.write_text(out, encoding="utf-8")

    return {"path": path, "fixes": fixes, "body_warnings": body_warnings}


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--apply", action="store_true", help="Write fixes (default: dry run)")
    p.add_argument("--course", help="Limit to a course (e.g. cpa)")
    p.add_argument("--section", help="Limit to a section dir name (e.g. tcp)")
    args = p.parse_args()

    total_fixes = 0
    total_files = 0
    files_with_fixes = 0
    all_body_warnings: list[str] = []

    for path in iter_question_files(args.course, args.section):
        total_files += 1
        result = process_file(path, args.apply)
        if result["fixes"]:
            files_with_fixes += 1
            total_fixes += result["fixes"]
            rel = result["path"].relative_to(ROOT)
            print(f"{'FIX' if args.apply else 'WOULD FIX'}: {rel} — {result['fixes']} header(s)")
        if result["body_warnings"]:
            all_body_warnings.extend(
                [f"{result['path'].relative_to(ROOT)}:"] + result["body_warnings"]
            )

    print()
    print(f"Files scanned:        {total_files}")
    print(f"Files with header fixes: {files_with_fixes}")
    print(f"Total header fixes:   {total_fixes}")
    print(f"Mode:                 {'APPLIED' if args.apply else 'DRY RUN'}")

    if all_body_warnings:
        print()
        print(f"⚠️  {len([w for w in all_body_warnings if not w.endswith(':')])} body-text contradictions need human review:")
        for w in all_body_warnings[:200]:
            print(w)
        if len(all_body_warnings) > 200:
            print(f"... and {len(all_body_warnings) - 200} more")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
