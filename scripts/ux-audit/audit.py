#!/usr/bin/env python3
"""
VoraPrep UX Audit Agent

Uses browser-use + Claude to autonomously navigate the app,
test user flows, take screenshots, and produce structured UX reports.

Usage:
    # Single audit
    python audit.py --course cpa --task dashboard

    # Smoke test a course
    python audit.py --course ea --suite smoke

    # Full audit of a course
    python audit.py --course cpa --suite full

    # All tasks for all courses
    python audit.py --all

    # List available tasks
    python audit.py --list

    # Headed mode (watch the browser)
    python audit.py --course cpa --task practice --headed
"""

import argparse
import asyncio
import json
import os
import sys
from datetime import datetime
from pathlib import Path

from browser_use import Agent, BrowserSession
from langchain_anthropic import ChatAnthropic

from config import (
    APP_URL,
    COURSES,
    HEADLESS,
    LLM_MODEL,
    MAX_ACTIONS_PER_STEP,
    MAX_STEPS,
    REPORTS_DIR,
    SCREENSHOTS_DIR,
    TEST_EMAIL,
    TEST_PASSWORD,
    VIEWPORT_HEIGHT,
    VIEWPORT_WIDTH,
)
from tasks import (
    ALL_TASKS,
    COURSE_TASKS,
    FULL_AUDIT_TASKS,
    PUBLIC_TASKS,
    SMOKE_TEST_TASKS,
    AuditTask,
)


def ensure_dirs():
    """Create output directories."""
    Path(REPORTS_DIR).mkdir(parents=True, exist_ok=True)
    Path(SCREENSHOTS_DIR).mkdir(parents=True, exist_ok=True)


def build_system_prompt(course_id: str | None) -> str:
    """Build the system prompt for the agent."""
    lines = [
        "You are a senior UX auditor evaluating VoraPrep, a professional exam prep web application.",
        f"The app is running at: {APP_URL}",
        "",
        "## General Guidelines",
        "- Be thorough and systematic in your evaluation",
        "- Take screenshots at every significant state change",
        "- Note both positive and negative aspects",
        "- Compare against best practices from leading edtech platforms (Coursera, Khan Academy, UWorld)",
        "- Rate issues by severity: Critical > High > Medium > Low > Cosmetic",
        "- Focus on real user impact, not pedantic standards violations",
        "",
    ]

    if course_id and course_id in COURSES:
        course = COURSES[course_id]
        lines.extend(
            [
                f"## Current Course: {course['name']}",
                f"Sections: {', '.join(course['sections'])}",
                f"Landing page: {APP_URL}{course['landing']}",
                f"Exam route: {APP_URL}{course['exam_route']}",
                "",
            ]
        )

    return "\n".join(lines)


def build_task_prompt(task: AuditTask, course_id: str | None) -> str:
    """Build the full task prompt, injecting course details."""
    prompt = task["prompt"]

    if course_id and course_id in COURSES:
        course = COURSES[course_id]
        prompt = prompt.replace("{course_name}", course["name"])
        prompt = prompt.replace("{sections}", ", ".join(course["sections"]))
    else:
        prompt = prompt.replace("{course_name}", "the default course")
        prompt = prompt.replace("{sections}", "all available sections")

    # Add auth instructions if needed
    if task["requires_auth"]:
        auth_block = f"""
## Authentication
First, log in with these credentials:
- Email: {TEST_EMAIL}
- Password: {TEST_PASSWORD}
Then proceed with the audit.
"""
        prompt = auth_block + prompt

    return prompt


def report_filename(course_id: str | None, task_id: str) -> str:
    """Generate a timestamped report filename."""
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    course = course_id or "global"
    return f"ux_audit_{course}_{task_id}_{ts}.md"


async def run_audit(
    task_id: str,
    course_id: str | None = None,
    headless: bool | None = None,
) -> dict:
    """
    Run a single UX audit task.

    Returns a dict with:
        - task_id: str
        - course_id: str | None
        - report_path: str
        - success: bool
        - error: str | None
    """
    if task_id not in ALL_TASKS:
        return {
            "task_id": task_id,
            "course_id": course_id,
            "report_path": None,
            "success": False,
            "error": f"Unknown task: {task_id}. Available: {', '.join(ALL_TASKS.keys())}",
        }

    if task_id in COURSE_TASKS and not course_id:
        return {
            "task_id": task_id,
            "course_id": course_id,
            "report_path": None,
            "success": False,
            "error": f"Task '{task_id}' requires a --course argument",
        }

    task = ALL_TASKS[task_id]
    use_headless = headless if headless is not None else HEADLESS

    print(f"\n{'='*60}")
    print(f"  AUDIT: {task['name']}")
    if course_id:
        print(f"  COURSE: {COURSES[course_id]['name']}")
    print(f"  MODE: {'headless' if use_headless else 'headed'}")
    print(f"{'='*60}\n")

    ensure_dirs()

    # Build prompts
    system_prompt = build_system_prompt(course_id)
    task_prompt = build_task_prompt(task, course_id)

    # Set up LLM
    llm = ChatAnthropic(model=LLM_MODEL)

    # Set up browser session
    browser_session = BrowserSession(
        headless=use_headless,
        viewport={"width": VIEWPORT_WIDTH, "height": VIEWPORT_HEIGHT},
    )

    try:
        # Create and run the agent
        agent = Agent(
            task=task_prompt,
            llm=llm,
            browser_session=browser_session,
            max_actions_per_step=MAX_ACTIONS_PER_STEP,
            override_system_message=system_prompt,
        )

        print(f"Starting agent (max {MAX_STEPS} steps)...")
        result = await agent.run(max_steps=MAX_STEPS)

        # Extract the final output
        report_content = _format_report(task, course_id, result)

        # Save report
        fname = report_filename(course_id, task_id)
        report_path = os.path.join(REPORTS_DIR, fname)
        with open(report_path, "w") as f:
            f.write(report_content)

        print(f"\n  Report saved: {report_path}")

        return {
            "task_id": task_id,
            "course_id": course_id,
            "report_path": report_path,
            "success": True,
            "error": None,
        }

    except Exception as e:
        print(f"\n  ERROR: {e}")
        return {
            "task_id": task_id,
            "course_id": course_id,
            "report_path": None,
            "success": False,
            "error": str(e),
        }

    finally:
        await browser_session.close()


def _format_report(task: AuditTask, course_id: str | None, result) -> str:
    """Format the agent's output into a clean markdown report."""
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    course_name = COURSES[course_id]["name"] if course_id else "N/A"

    header = f"""# UX Audit Report: {task['name']}

| Field | Value |
|-------|-------|
| **Date** | {ts} |
| **Course** | {course_name} |
| **Task** | {task['id']} |
| **App URL** | {APP_URL} |
| **LLM** | {LLM_MODEL} |

---

"""
    # Extract the final answer from the agent result
    final_text = ""
    if hasattr(result, "final_result"):
        final_text = result.final_result() or ""

    if not final_text and hasattr(result, "extracted_content"):
        # Concatenate all extracted content from the run
        contents = result.extracted_content()
        if contents:
            final_text = "\n\n".join(c for c in contents if c)

    if not final_text:
        final_text = str(result)

    return header + final_text


async def run_suite(
    suite: str,
    course_id: str,
    headless: bool | None = None,
) -> list[dict]:
    """Run a suite of audit tasks for a course."""
    if suite == "smoke":
        task_ids = SMOKE_TEST_TASKS
    elif suite == "full":
        task_ids = FULL_AUDIT_TASKS
    else:
        print(f"Unknown suite: {suite}. Use 'smoke' or 'full'.")
        return []

    results = []
    total = len(task_ids)

    for i, task_id in enumerate(task_ids, 1):
        print(f"\n[{i}/{total}] Running: {task_id}")

        # Skip course-specific tasks if no course provided
        if task_id in COURSE_TASKS and not course_id:
            print(f"  Skipping {task_id} (requires course)")
            continue

        result = await run_audit(task_id, course_id, headless)
        results.append(result)

    return results


async def run_all_courses(headless: bool | None = None) -> list[dict]:
    """Run smoke tests across all courses."""
    all_results = []

    for course_id in COURSES:
        print(f"\n{'#'*60}")
        print(f"  COURSE: {COURSES[course_id]['name']}")
        print(f"{'#'*60}")

        results = await run_suite("smoke", course_id, headless)
        all_results.extend(results)

    return all_results


def print_summary(results: list[dict]):
    """Print a summary table of audit results."""
    print(f"\n{'='*60}")
    print("  AUDIT SUMMARY")
    print(f"{'='*60}\n")

    passed = sum(1 for r in results if r["success"])
    failed = len(results) - passed

    for r in results:
        status = "PASS" if r["success"] else "FAIL"
        icon = "✓" if r["success"] else "✗"
        course = r["course_id"] or "global"
        task = r["task_id"]
        print(f"  {icon} [{status}] {course}/{task}")
        if r["error"]:
            print(f"          Error: {r['error']}")
        if r["report_path"]:
            print(f"          Report: {r['report_path']}")

    print(f"\n  Total: {len(results)} | Passed: {passed} | Failed: {failed}")

    # Save summary JSON
    ensure_dirs()
    summary_path = os.path.join(
        REPORTS_DIR,
        f"summary_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json",
    )
    with open(summary_path, "w") as f:
        json.dump(
            {
                "timestamp": datetime.now().isoformat(),
                "total": len(results),
                "passed": passed,
                "failed": failed,
                "results": results,
            },
            f,
            indent=2,
        )
    print(f"\n  Summary saved: {summary_path}\n")


def main():
    parser = argparse.ArgumentParser(
        description="VoraPrep AI-Powered UX Audit Tool",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python audit.py --course cpa --task dashboard
  python audit.py --course ea --suite smoke
  python audit.py --course cpa --suite full --headed
  python audit.py --all
  python audit.py --list
        """,
    )

    parser.add_argument(
        "--course",
        choices=list(COURSES.keys()),
        help="Course to audit (cpa, ea, cma, cia, cisa, cfp)",
    )
    parser.add_argument(
        "--task",
        choices=list(ALL_TASKS.keys()),
        help="Specific audit task to run",
    )
    parser.add_argument(
        "--suite",
        choices=["smoke", "full"],
        help="Run a predefined suite of tasks",
    )
    parser.add_argument(
        "--all",
        action="store_true",
        help="Run smoke tests across ALL courses",
    )
    parser.add_argument(
        "--headed",
        action="store_true",
        help="Run with visible browser (not headless)",
    )
    parser.add_argument(
        "--list",
        action="store_true",
        help="List all available audit tasks",
    )
    parser.add_argument(
        "--url",
        help=f"Override app URL (default: {APP_URL})",
    )

    args = parser.parse_args()

    # Override URL if provided
    if args.url:
        import config
        config.APP_URL = args.url

    # List tasks
    if args.list:
        print("\nAvailable Audit Tasks:")
        print("-" * 60)
        for tid, task in ALL_TASKS.items():
            auth = "🔒" if task["requires_auth"] else "🌐"
            course = "📚" if tid in COURSE_TASKS else "  "
            print(f"  {auth} {course} {tid:20s} {task['name']}")
        print()
        print("  🔒 = requires auth  🌐 = public  📚 = requires --course")
        print()
        print("Suites:")
        print(f"  smoke: {', '.join(SMOKE_TEST_TASKS)}")
        print(f"  full:  all {len(FULL_AUDIT_TASKS)} tasks")
        print()
        return

    # Determine headless mode
    headless = not args.headed

    # Run
    if args.all:
        results = asyncio.run(run_all_courses(headless))
    elif args.suite:
        if not args.course:
            print("Error: --suite requires --course")
            sys.exit(1)
        results = asyncio.run(run_suite(args.suite, args.course, headless))
    elif args.task:
        result = asyncio.run(run_audit(args.task, args.course, headless))
        results = [result]
    else:
        parser.print_help()
        return

    print_summary(results)


if __name__ == "__main__":
    main()
