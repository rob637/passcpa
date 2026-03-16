#!/usr/bin/env python3
"""
Migrate TypeScript lesson files to JSON format.

This script:
1. Parses existing TypeScript lesson files
2. Extracts the lesson array data
3. Writes clean JSON files
4. Generates a new TypeScript loader that imports from JSON

Usage:
    python migrate_to_json.py --section far          # Migrate one section
    python migrate_to_json.py --all                  # Migrate all sections
    python migrate_to_json.py --dry-run --all       # Preview without writing
"""

import os
import sys
import re
import json
import argparse
import subprocess
from pathlib import Path
from datetime import datetime

# Paths
WORKSPACE = Path('/workspaces/passcpa')
CPA_LESSONS_DIR = WORKSPACE / 'src' / 'data' / 'cpa' / 'lessons'
JSON_OUTPUT_DIR = WORKSPACE / 'src' / 'data' / 'cpa' / 'lessons' / 'json'
BACKUP_DIR = WORKSPACE / 'content_factory' / 'lesson_enhancement' / 'migration_backups'

CPA_SECTIONS = ['far', 'aud', 'reg', 'bar', 'isc', 'tcp', 'prep']


def backup_file(filepath: Path) -> Path:
    """Create a timestamped backup of a file."""
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_path = BACKUP_DIR / f"{filepath.stem}_{timestamp}.ts"
    
    with open(filepath, 'r') as f:
        content = f.read()
    with open(backup_path, 'w') as f:
        f.write(content)
    
    return backup_path


def extract_lessons_with_node(section: str) -> list:
    """
    Use Node.js to extract lesson data - more reliable than regex parsing.
    """
    ts_file = CPA_LESSONS_DIR / f"{section}.ts"
    if not ts_file.exists():
        print(f"  ❌ File not found: {ts_file}")
        return []
    
    # Create a temporary extraction script
    extract_script = f"""
const path = require('path');
const fs = require('fs');

// We need to transpile TS on the fly
try {{
    require('ts-node/register');
}} catch (e) {{
    // Try esbuild-register as fallback
    try {{
        require('esbuild-register/dist/node').register();
    }} catch (e2) {{
        console.error('Need ts-node or esbuild-register');
        process.exit(1);
    }}
}}

// Import the lessons
const lessons = require('{ts_file.absolute()}');

// Get the export (it's usually named {section}Lessons)
const exportName = '{section}Lessons';
const data = lessons[exportName] || lessons.default;

if (!data) {{
    console.error('Could not find export: ' + exportName);
    process.exit(1);
}}

// Output as JSON
console.log(JSON.stringify(data, null, 2));
"""
    
    # Write temp script
    temp_script = WORKSPACE / 'temp_extract.cjs'
    with open(temp_script, 'w') as f:
        f.write(extract_script)
    
    try:
        # Run it
        result = subprocess.run(
            ['node', str(temp_script)],
            capture_output=True,
            text=True,
            cwd=WORKSPACE
        )
        
        if result.returncode != 0:
            print(f"  ⚠️  Node extraction failed: {result.stderr[:200]}")
            return []
        
        lessons = json.loads(result.stdout)
        return lessons
        
    except json.JSONDecodeError as e:
        print(f"  ❌ JSON parse error: {e}")
        return []
    except Exception as e:
        print(f"  ❌ Extraction error: {e}")
        return []
    finally:
        # Clean up
        if temp_script.exists():
            temp_script.unlink()


def extract_lessons_with_regex(section: str) -> list:
    """
    Fallback: Extract lessons using regex parsing.
    This is more fragile but doesn't require Node dependencies.
    """
    ts_file = CPA_LESSONS_DIR / f"{section}.ts"
    if not ts_file.exists():
        print(f"  ❌ File not found: {ts_file}")
        return []
    
    with open(ts_file, 'r') as f:
        content = f.read()
    
    # Find the array start
    # Pattern: export const xxxLessons: Lesson[] = [
    match = re.search(
        rf"export\s+const\s+{section}Lessons\s*:\s*Lesson\[\]\s*=\s*\[",
        content,
        re.IGNORECASE
    )
    
    if not match:
        print(f"  ❌ Could not find {section}Lessons array")
        return []
    
    # Find matching bracket - this is complex for nested structures
    start_idx = match.end() - 1  # Position of opening [
    bracket_count = 0
    end_idx = start_idx
    
    for i, char in enumerate(content[start_idx:], start_idx):
        if char == '[':
            bracket_count += 1
        elif char == ']':
            bracket_count -= 1
            if bracket_count == 0:
                end_idx = i + 1
                break
    
    array_content = content[start_idx:end_idx]
    
    # Convert TypeScript to JSON-compatible format
    # This is fragile - the Node approach is better
    json_content = array_content
    
    # Remove trailing commas before ] or }
    json_content = re.sub(r',(\s*[}\]])', r'\1', json_content)
    
    # Convert single quotes to double quotes (careful with apostrophes)
    # This is very fragile - better to use proper parsing
    
    try:
        lessons = json.loads(json_content)
        return lessons
    except json.JSONDecodeError as e:
        print(f"  ❌ JSON parse failed (try Node extraction): {e}")
        return []


def clean_lesson_for_json(lesson: dict) -> dict:
    """
    Clean up a lesson dict for JSON storage.
    Remove any TypeScript-specific artifacts.
    """
    cleaned = {}
    
    for key, value in lesson.items():
        # Skip undefined/null values
        if value is None:
            continue
            
        # Recursively clean nested dicts
        if isinstance(value, dict):
            cleaned[key] = clean_lesson_for_json(value)
        elif isinstance(value, list):
            cleaned[key] = [
                clean_lesson_for_json(item) if isinstance(item, dict) else item
                for item in value
            ]
        else:
            cleaned[key] = value
    
    return cleaned


def write_json_lessons(section: str, lessons: list, dry_run: bool = False) -> bool:
    """Write lessons to JSON file."""
    JSON_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    output_path = JSON_OUTPUT_DIR / f"{section}.json"
    
    # Clean lessons
    cleaned = [clean_lesson_for_json(lesson) for lesson in lessons]
    
    if dry_run:
        print(f"  Would write {len(cleaned)} lessons to {output_path}")
        # Show first lesson as preview
        if cleaned:
            print(f"  Preview of first lesson:")
            preview = json.dumps(cleaned[0], indent=2)[:500]
            print(f"  {preview}...")
        return True
    
    with open(output_path, 'w') as f:
        json.dump(cleaned, f, indent=2)
    
    print(f"  ✅ Wrote {len(cleaned)} lessons to {output_path}")
    return True


def create_json_loader(sections: list, dry_run: bool = False) -> bool:
    """
    Create TypeScript loader that imports JSON files.
    """
    loader_content = '''// Auto-generated JSON loader for CPA lessons
// Generated by migrate_to_json.py

import { Lesson } from '../../../types';

// Import JSON lesson data
'''

    # Add imports for each section
    for section in sections:
        loader_content += f"import {section}Data from './json/{section}.json';\n"
    
    loader_content += '''
// Type assertion and export
'''
    
    for section in sections:
        var_name = f"{section}Lessons"
        loader_content += f"export const {var_name}: Lesson[] = {section}Data as Lesson[];\n"
    
    loader_content += '''
// Maintain backward compatibility - re-export the LESSONS record
export const LESSONS: Record<string, Lesson[]> = {
'''
    
    for section in sections:
        loader_content += f"  {section}: {section}Lessons,\n"
    
    loader_content += '''};

// Helper functions
export const getAllLessons = (): Lesson[] => {
  return Object.values(LESSONS).flat();
};

export const getLessonsBySection = (section: string): Lesson[] => {
  const lessons = LESSONS[section.toLowerCase()] || [];
  return [...lessons].sort((a, b) => (a.order || 0) - (b.order || 0));
};

export const getLessonById = (lessonId: string): Lesson | undefined => {
  return getAllLessons().find((lesson) => lesson.id === lessonId);
};

export const getLessonStats = () => {
  const stats: Record<string, number> = {};
  for (const [section, lessons] of Object.entries(LESSONS)) {
    stats[section.toUpperCase()] = lessons.length;
  }
  return {
    total: getAllLessons().length,
    bySection: stats,
  };
};

export default LESSONS;
'''

    loader_path = CPA_LESSONS_DIR / 'index.ts'
    
    if dry_run:
        print(f"\n📄 Would update {loader_path}")
        print(f"Preview:\n{loader_content[:800]}...")
        return True
    
    # Backup existing
    backup_file(loader_path)
    
    with open(loader_path, 'w') as f:
        f.write(loader_content)
    
    print(f"\n✅ Created new loader: {loader_path}")
    return True


def enable_json_imports():
    """
    Update tsconfig.json to allow JSON imports if not already enabled.
    """
    tsconfig_path = WORKSPACE / 'tsconfig.json'
    
    with open(tsconfig_path, 'r') as f:
        tsconfig = json.load(f)
    
    compiler_options = tsconfig.get('compilerOptions', {})
    
    needs_update = False
    
    if not compiler_options.get('resolveJsonModule'):
        compiler_options['resolveJsonModule'] = True
        needs_update = True
    
    if not compiler_options.get('esModuleInterop'):
        compiler_options['esModuleInterop'] = True
        needs_update = True
    
    if needs_update:
        tsconfig['compilerOptions'] = compiler_options
        with open(tsconfig_path, 'w') as f:
            json.dump(tsconfig, f, indent=2)
        print("✅ Updated tsconfig.json to enable JSON imports")
    else:
        print("✅ tsconfig.json already configured for JSON imports")


def migrate_section(section: str, dry_run: bool = False) -> bool:
    """Migrate a single section to JSON."""
    print(f"\n📦 Migrating {section.upper()} lessons...")
    
    # Try Node extraction first (more reliable)
    lessons = extract_lessons_with_node(section)
    
    if not lessons:
        print(f"  Falling back to regex extraction...")
        lessons = extract_lessons_with_regex(section)
    
    if not lessons:
        print(f"  ❌ Failed to extract lessons from {section}.ts")
        return False
    
    print(f"  Found {len(lessons)} lessons")
    
    # Write JSON
    success = write_json_lessons(section, lessons, dry_run)
    
    return success


def main():
    parser = argparse.ArgumentParser(description='Migrate TypeScript lessons to JSON')
    parser.add_argument('--section', help='Section to migrate (far, aud, reg, etc.)')
    parser.add_argument('--all', action='store_true', help='Migrate all sections')
    parser.add_argument('--dry-run', action='store_true', help='Preview without writing')
    
    args = parser.parse_args()
    
    if not args.section and not args.all:
        parser.print_help()
        sys.exit(1)
    
    print("=" * 60)
    print("  LESSON MIGRATION: TypeScript → JSON")
    print("=" * 60)
    
    if args.dry_run:
        print("🔍 DRY RUN MODE - No files will be written\n")
    
    # Check/update tsconfig
    if not args.dry_run:
        enable_json_imports()
    
    sections_to_migrate = CPA_SECTIONS if args.all else [args.section]
    
    results = {}
    for section in sections_to_migrate:
        success = migrate_section(section, args.dry_run)
        results[section] = success
    
    # Create the new loader
    successful_sections = [s for s, ok in results.items() if ok]
    if successful_sections:
        create_json_loader(successful_sections, args.dry_run)
    
    # Summary
    print("\n" + "=" * 60)
    print("  MIGRATION SUMMARY")
    print("=" * 60)
    
    for section, success in results.items():
        status = "✅" if success else "❌"
        print(f"  {status} {section.upper()}")
    
    if not args.dry_run and all(results.values()):
        print(f"\n🎉 Migration complete!")
        print(f"\nOriginal .ts files can be deleted once verified:")
        for section in successful_sections:
            print(f"  rm {CPA_LESSONS_DIR}/{section}.ts")
        print(f"\nRun 'npm run build' to verify everything compiles.")


if __name__ == '__main__':
    main()
