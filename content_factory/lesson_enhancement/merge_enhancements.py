#!/usr/bin/env python3
"""
VoraPrep Lesson Enhancement Merger
===================================
Takes generated enhancement JSON files and merges them into the TypeScript lesson files.

Usage:
    # Preview what would be changed (dry run)
    python merge_enhancements.py --section FAR --dry-run
    
    # Apply enhancements to FAR lessons
    python merge_enhancements.py --section FAR
    
    # Apply specific lesson enhancement
    python merge_enhancements.py --lesson FAR-I-001
    
    # Apply all enhancements
    python merge_enhancements.py --all
"""

import os
import sys
import json
import re
import argparse
from pathlib import Path
from datetime import datetime
import shutil

# ============================================================================
# Configuration
# ============================================================================

WORKSPACE_ROOT = Path(__file__).parent.parent.parent
LESSONS_DIR = WORKSPACE_ROOT / "src" / "data" / "cpa" / "lessons"
ENHANCED_DIR = WORKSPACE_ROOT / "content_factory" / "lesson_enhancement" / "output" / "enhanced"
BACKUP_DIR = WORKSPACE_ROOT / "content_factory" / "lesson_enhancement" / "backups"

SECTIONS = ["far", "aud", "reg", "bar", "isc", "tcp", "prep"]

# ============================================================================
# TypeScript Code Generator
# ============================================================================

def json_to_typescript(obj, indent=0) -> str:
    """Convert a Python object to TypeScript literal format."""
    pad = "  " * indent
    
    if obj is None:
        return "null"
    elif isinstance(obj, bool):
        return "true" if obj else "false"
    elif isinstance(obj, (int, float)):
        return str(obj)
    elif isinstance(obj, str):
        # Escape single quotes and use single quotes for TS
        escaped = obj.replace("\\", "\\\\").replace("'", "\\'").replace("\n", "\\n")
        return f"'{escaped}'"
    elif isinstance(obj, list):
        if not obj:
            return "[]"
        items = [json_to_typescript(item, indent + 1) for item in obj]
        if all(isinstance(x, (str, int, float, bool)) for x in obj) and len(str(obj)) < 100:
            # Single line for simple arrays
            return "[" + ", ".join(items) + "]"
        return "[\n" + ",\n".join(f"{pad}  {item}" for item in items) + f"\n{pad}]"
    elif isinstance(obj, dict):
        if not obj:
            return "{}"
        items = []
        for key, value in obj.items():
            # Use camelCase keys without quotes if valid identifier
            if re.match(r'^[a-zA-Z_][a-zA-Z0-9_]*$', key):
                items.append(f"{key}: {json_to_typescript(value, indent + 1)}")
            else:
                items.append(f"'{key}': {json_to_typescript(value, indent + 1)}")
        return "{\n" + ",\n".join(f"{pad}  {item}" for item in items) + f"\n{pad}}}"
    else:
        return str(obj)

def section_to_typescript(section: dict) -> str:
    """Convert a section JSON object to TypeScript code."""
    return json_to_typescript(section, 4)

# ============================================================================
# Lesson File Manipulation
# ============================================================================

def find_section_insertion_point(lesson_block: str) -> int:
    """
    Find the best place to insert new sections in a lesson block.
    We insert just before the summary section (if exists) or at the end of sections array.
    """
    # Look for summary section
    summary_match = re.search(r"{\s*title:\s*['\"]Key Takeaways['\"]", lesson_block)
    if summary_match:
        return summary_match.start()
    
    # Look for the closing of sections array
    # Find pattern: sections: [ ... ]
    sections_match = re.search(r"sections:\s*\[", lesson_block)
    if not sections_match:
        return -1
    
    # Find the closing bracket of sections array
    bracket_count = 0
    in_sections = False
    for i, char in enumerate(lesson_block[sections_match.start():]):
        if char == '[':
            bracket_count += 1
            in_sections = True
        elif char == ']':
            bracket_count -= 1
            if in_sections and bracket_count == 0:
                # Found the end of sections array - insert before the ]
                return sections_match.start() + i
    
    return -1

def merge_enhancements_into_lesson(lesson_file: Path, lesson_id: str, enhancements: list, dry_run: bool = False) -> bool:
    """
    Merge enhancement sections into a lesson TypeScript file.
    Returns True if successful.
    """
    content = lesson_file.read_text()
    
    # Find the lesson block
    # Pattern: { id: 'LESSON_ID', ... content: { sections: [ ... ] } }
    lesson_pattern = re.compile(
        rf"\{{\s*id:\s*['\"]({re.escape(lesson_id)})['\"]",
        re.DOTALL
    )
    
    match = lesson_pattern.search(content)
    if not match:
        print(f"  ❌ Could not find lesson {lesson_id} in file")
        return False
    
    lesson_start = match.start()
    
    # Find the sections array within this lesson
    # We need to find: sections: [ ... ]
    # And insert our new sections before the closing ]
    
    # Find the content: { sections: [ pattern after the lesson start
    remaining = content[lesson_start:]
    sections_match = re.search(r"sections:\s*\[", remaining)
    if not sections_match:
        print(f"  ❌ Could not find sections array in lesson")
        return False
    
    sections_start = lesson_start + sections_match.end()
    
    # Now we need to find where to insert - before the 'summary' section or at the end
    # Find the closing ] of sections array by counting brackets
    bracket_count = 1
    pos = sections_start
    last_section_end = sections_start
    
    while pos < len(content) and bracket_count > 0:
        char = content[pos]
        if char == '[':
            bracket_count += 1
        elif char == ']':
            bracket_count -= 1
            if bracket_count == 0:
                break
        elif char == '}' and bracket_count == 1:
            # This might be the end of a section object
            # Check if followed by comma and whitespace
            after = content[pos:pos+20].strip()
            if after.startswith('},'):
                last_section_end = pos + 1  # After the }
        pos += 1
    
    sections_end = pos  # Position of closing ]
    
    # Check if there's a summary section - we want to insert before it
    sections_content = content[sections_start:sections_end]
    summary_match = re.search(r"\{\s*title:\s*['\"]Key Takeaways['\"]", sections_content)
    
    if summary_match:
        insertion_point = sections_start + summary_match.start()
    else:
        # Insert before the closing bracket
        insertion_point = sections_end
    
    # Generate TypeScript code for new sections
    new_sections_code = ""
    for section in enhancements:
        ts_code = section_to_typescript(section)
        new_sections_code += f"        {ts_code},\n"
    
    # Add a comment marker
    marker = f"        // ===== AUTO-GENERATED INTERACTIVE SECTIONS ({datetime.now().strftime('%Y-%m-%d')}) =====\n"
    
    # Check if we already have interactive sections
    if "AUTO-GENERATED INTERACTIVE SECTIONS" in content:
        print(f"  ⚠️  Lesson already has interactive sections - skipping")
        return False
    
    # Build the new content
    if summary_match:
        # Insert before summary
        new_content = (
            content[:insertion_point] +
            marker +
            new_sections_code +
            "\n" +
            content[insertion_point:]
        )
    else:
        # Insert before closing bracket, need to add comma to previous section
        # Find the last } before the insertion point
        before = content[:insertion_point].rstrip()
        if before.endswith('}'):
            # Add comma
            before = before + ','
        new_content = (
            before +
            "\n" +
            marker +
            new_sections_code.rstrip().rstrip(',') +
            "\n        " +
            content[insertion_point:]
        )
    
    if dry_run:
        print(f"  🔍 DRY RUN - Would insert {len(enhancements)} sections")
        for section in enhancements:
            print(f"      - {section['type']}: {section.get('title', 'untitled')}")
        return True
    
    # Write back
    lesson_file.write_text(new_content)
    print(f"  ✅ Merged {len(enhancements)} sections into {lesson_file.name}")
    return True

# ============================================================================
# Main Processing
# ============================================================================

def process_section(section: str, dry_run: bool = False):
    """Process all enhancement files for a section."""
    enhanced_section_dir = ENHANCED_DIR / section.lower()
    if not enhanced_section_dir.exists():
        print(f"❌ No enhancements found for {section.upper()}")
        print(f"   Run: python enhance_lessons.py --section {section.upper()}")
        return
    
    lesson_file = LESSONS_DIR / f"{section.lower()}.ts"
    if not lesson_file.exists():
        print(f"❌ Lesson file not found: {lesson_file}")
        return
    
    # Backup original file
    if not dry_run:
        backup_file = BACKUP_DIR / f"{section.lower()}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.ts"
        backup_file.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy(lesson_file, backup_file)
        print(f"📦 Backed up to: {backup_file.relative_to(WORKSPACE_ROOT)}")
    
    # Get all enhancement files
    enhancement_files = list(enhanced_section_dir.glob("*.json"))
    print(f"\n📂 Found {len(enhancement_files)} enhancement files for {section.upper()}")
    
    success_count = 0
    for ef in sorted(enhancement_files):
        try:
            data = json.loads(ef.read_text())
            lesson_id = data.get('lessonId')
            sections = data.get('interactiveSections', [])
            
            if not sections:
                print(f"  ⚠️  {lesson_id}: No sections to merge")
                continue
            
            print(f"\n  Processing: {lesson_id}")
            if merge_enhancements_into_lesson(lesson_file, lesson_id, sections, dry_run):
                success_count += 1
                
        except Exception as e:
            print(f"  ❌ Error processing {ef.name}: {e}")
    
    print(f"\n{'='*60}")
    print(f"MERGE COMPLETE: {section.upper()}")
    print(f"  ✅ Merged: {success_count}/{len(enhancement_files)}")
    print(f"{'='*60}")

def process_single_lesson(lesson_id: str, dry_run: bool = False):
    """Process a single lesson enhancement."""
    section = lesson_id.split('-')[0].lower()
    enhanced_file = ENHANCED_DIR / section / f"{lesson_id}.json"
    
    if not enhanced_file.exists():
        print(f"❌ No enhancement found for {lesson_id}")
        print(f"   Run: python enhance_lessons.py --lesson {lesson_id}")
        return
    
    lesson_file = LESSONS_DIR / f"{section}.ts"
    if not lesson_file.exists():
        print(f"❌ Lesson file not found: {lesson_file}")
        return
    
    # Backup
    if not dry_run:
        backup_file = BACKUP_DIR / f"{section}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.ts"
        backup_file.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy(lesson_file, backup_file)
        print(f"📦 Backed up to: {backup_file.relative_to(WORKSPACE_ROOT)}")
    
    data = json.loads(enhanced_file.read_text())
    sections = data.get('interactiveSections', [])
    
    merge_enhancements_into_lesson(lesson_file, lesson_id, sections, dry_run)

# ============================================================================
# CLI
# ============================================================================

def main():
    parser = argparse.ArgumentParser(description="VoraPrep Lesson Enhancement Merger")
    parser.add_argument("--section", type=str, help="Section to process (FAR, AUD, REG, etc.)")
    parser.add_argument("--lesson", type=str, help="Specific lesson ID to process")
    parser.add_argument("--dry-run", action="store_true", help="Preview changes without modifying files")
    parser.add_argument("--all", action="store_true", help="Process all sections")
    
    args = parser.parse_args()
    
    print("🔧 VoraPrep Lesson Enhancement Merger")
    print("="*60)
    
    if args.lesson:
        process_single_lesson(args.lesson, args.dry_run)
    elif args.section:
        process_section(args.section, args.dry_run)
    elif args.all:
        for section in SECTIONS:
            process_section(section, args.dry_run)
    else:
        parser.print_help()
        print("\nExamples:")
        print("  python merge_enhancements.py --section FAR --dry-run")
        print("  python merge_enhancements.py --section FAR")
        print("  python merge_enhancements.py --lesson FAR-I-001")
        print("  python merge_enhancements.py --all")

if __name__ == "__main__":
    main()
