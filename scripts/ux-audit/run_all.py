#!/usr/bin/env python3
"""
Batch UX Audit Runner — Run audits across all courses.

Usage:
    # Smoke test all courses
    python run_all.py

    # Full audit all courses
    python run_all.py --suite full

    # Specific courses only
    python run_all.py --courses cpa ea

    # With visible browser
    python run_all.py --headed

    # Against production
    python run_all.py --url https://voraprep.com
"""

import argparse
import asyncio
import sys
from datetime import datetime

from config import APP_URL, COURSES
from audit import run_suite, run_audit, print_summary, ensure_dirs
from tasks import ALL_TASKS, SMOKE_TEST_TASKS, FULL_AUDIT_TASKS, PUBLIC_TASKS


async def run_batch(
    course_ids: list[str],
    suite: str = "smoke",
    headless: bool = True,
) -> list[dict]:
    """Run audit suite across multiple courses sequentially."""
    all_results = []

    # First run non-course-specific tasks (login, signup)
    print(f"\n{'#'*60}")
    print("  GLOBAL TASKS (no course required)")
    print(f"{'#'*60}")

    task_list = SMOKE_TEST_TASKS if suite == "smoke" else FULL_AUDIT_TASKS

    for task_id in task_list:
        if task_id in PUBLIC_TASKS:
            result = await run_audit(task_id, course_id=None, headless=headless)
            all_results.append(result)

    # Then run course-specific tasks for each course
    for course_id in course_ids:
        course = COURSES.get(course_id)
        if not course:
            print(f"\nSkipping unknown course: {course_id}")
            continue

        print(f"\n{'#'*60}")
        print(f"  COURSE: {course['name']}")
        print(f"{'#'*60}")

        results = await run_suite(suite, course_id, headless)
        all_results.extend(results)

    return all_results


def main():
    parser = argparse.ArgumentParser(
        description="Batch UX Audit Runner for VoraPrep",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )

    parser.add_argument(
        "--courses",
        nargs="+",
        choices=list(COURSES.keys()),
        default=list(COURSES.keys()),
        help="Courses to audit (default: all)",
    )
    parser.add_argument(
        "--suite",
        choices=["smoke", "full"],
        default="smoke",
        help="Audit suite to run (default: smoke)",
    )
    parser.add_argument(
        "--headed",
        action="store_true",
        help="Run with visible browser",
    )
    parser.add_argument(
        "--url",
        help=f"Override app URL (default: {APP_URL})",
    )

    args = parser.parse_args()

    if args.url:
        import config
        config.APP_URL = args.url

    headless = not args.headed

    print(f"\n{'='*60}")
    print("  VoraPrep Batch UX Audit")
    print(f"  Courses: {', '.join(args.courses)}")
    print(f"  Suite:   {args.suite}")
    print(f"  Mode:    {'headless' if headless else 'headed'}")
    print(f"  URL:     {APP_URL}")
    print(f"  Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{'='*60}")

    ensure_dirs()
    results = asyncio.run(run_batch(args.courses, args.suite, headless))
    print_summary(results)


if __name__ == "__main__":
    main()
