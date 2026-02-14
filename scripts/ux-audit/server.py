#!/usr/bin/env python3
"""
VoraPrep UX Audit — Web Server

A lightweight FastAPI server that provides a web UI for configuring
and running UX audits. Serves a single-page frontend and exposes
API endpoints for audit management.

Usage:
    cd scripts/ux-audit
    python server.py
    # Open http://localhost:8642
"""

import asyncio
import json
import os
import uuid
from datetime import datetime
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
import uvicorn

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
from tasks import ALL_TASKS, COURSE_TASKS, PUBLIC_TASKS, SMOKE_TEST_TASKS, FULL_AUDIT_TASKS


app = FastAPI(title="VoraPrep UX Audit")

# --------------------------------------------------------------------------
# State
# --------------------------------------------------------------------------

# Active audit runs: {run_id: {status, task_id, course_id, log, ...}}
active_runs: dict[str, dict] = {}

# WebSocket connections for live log streaming
ws_connections: dict[str, list[WebSocket]] = {}


# --------------------------------------------------------------------------
# API Routes
# --------------------------------------------------------------------------

@app.get("/api/config")
async def get_config():
    """Return current configuration and available options."""
    has_api_key = bool(os.getenv("ANTHROPIC_API_KEY"))
    return {
        "app_url": APP_URL,
        "test_email": TEST_EMAIL,
        "has_api_key": has_api_key,
        "llm_model": LLM_MODEL,
        "headless": HEADLESS,
        "viewport": {"width": VIEWPORT_WIDTH, "height": VIEWPORT_HEIGHT},
        "max_steps": MAX_STEPS,
        "courses": {
            cid: {"name": c["name"], "sections": c["sections"], "landing": c["landing"]}
            for cid, c in COURSES.items()
        },
        "tasks": {
            tid: {
                "name": t["name"],
                "description": t["description"],
                "requires_auth": t["requires_auth"],
                "requires_course": tid in COURSE_TASKS,
                "estimated_steps": t["estimated_steps"],
            }
            for tid, t in ALL_TASKS.items()
        },
        "suites": {
            "smoke": SMOKE_TEST_TASKS,
            "full": FULL_AUDIT_TASKS,
        },
    }


@app.post("/api/config/key")
async def set_api_key(body: dict):
    """Set the Anthropic API key at runtime."""
    key = body.get("key", "").strip()
    if not key:
        return JSONResponse({"error": "API key is required"}, status_code=400)
    os.environ["ANTHROPIC_API_KEY"] = key
    return {"status": "ok", "has_api_key": True}


@app.post("/api/config/update")
async def update_config(body: dict):
    """Update runtime configuration."""
    import config as cfg
    if "app_url" in body:
        cfg.APP_URL = body["app_url"]
    if "test_email" in body:
        cfg.TEST_EMAIL = body["test_email"]
    if "test_password" in body:
        cfg.TEST_PASSWORD = body["test_password"]
    if "headless" in body:
        cfg.HEADLESS = body["headless"]
    if "llm_model" in body:
        cfg.LLM_MODEL = body["llm_model"]
    if "max_steps" in body:
        cfg.MAX_STEPS = int(body["max_steps"])
    return {"status": "ok"}


@app.post("/api/audit/run")
async def start_audit(body: dict):
    """Start an audit run. Returns a run_id for tracking."""
    task_id = body.get("task_id")
    course_id = body.get("course_id")
    headless = body.get("headless", HEADLESS)

    if not os.getenv("ANTHROPIC_API_KEY"):
        return JSONResponse(
            {"error": "Anthropic API key not set. Go to Settings to add it."},
            status_code=400,
        )

    if not task_id or task_id not in ALL_TASKS:
        return JSONResponse(
            {"error": f"Invalid task: {task_id}"},
            status_code=400,
        )

    if task_id in COURSE_TASKS and not course_id:
        return JSONResponse(
            {"error": f"Task '{task_id}' requires a course selection"},
            status_code=400,
        )

    run_id = str(uuid.uuid4())[:8]
    active_runs[run_id] = {
        "run_id": run_id,
        "task_id": task_id,
        "course_id": course_id,
        "status": "starting",
        "started_at": datetime.now().isoformat(),
        "finished_at": None,
        "report_path": None,
        "error": None,
        "log": [],
    }

    # Run audit in background
    asyncio.create_task(_execute_audit(run_id, task_id, course_id, headless))

    return {"run_id": run_id, "status": "starting"}


@app.post("/api/audit/suite")
async def start_suite(body: dict):
    """Start a suite of audits. Returns run_ids for each task."""
    suite = body.get("suite", "smoke")
    course_id = body.get("course_id")
    headless = body.get("headless", HEADLESS)

    if not os.getenv("ANTHROPIC_API_KEY"):
        return JSONResponse(
            {"error": "Anthropic API key not set. Go to Settings to add it."},
            status_code=400,
        )

    task_ids = SMOKE_TEST_TASKS if suite == "smoke" else FULL_AUDIT_TASKS
    run_ids = []

    for task_id in task_ids:
        if task_id in COURSE_TASKS and not course_id:
            continue
        run_id = str(uuid.uuid4())[:8]
        active_runs[run_id] = {
            "run_id": run_id,
            "task_id": task_id,
            "course_id": course_id,
            "status": "queued",
            "started_at": datetime.now().isoformat(),
            "finished_at": None,
            "report_path": None,
            "error": None,
            "log": [],
        }
        run_ids.append(run_id)

    # Run sequentially in background
    asyncio.create_task(_execute_suite(run_ids, headless))

    return {"run_ids": run_ids, "suite": suite}


@app.get("/api/audit/status/{run_id}")
async def get_status(run_id: str):
    """Get status of a specific audit run."""
    run = active_runs.get(run_id)
    if not run:
        return JSONResponse({"error": "Run not found"}, status_code=404)
    return run


@app.get("/api/audit/runs")
async def list_runs():
    """List all audit runs."""
    return {"runs": list(active_runs.values())}


@app.get("/api/reports")
async def list_reports():
    """List all saved reports."""
    reports_path = Path(REPORTS_DIR)
    if not reports_path.exists():
        return {"reports": []}

    reports = []
    for f in sorted(reports_path.glob("*.md"), reverse=True):
        stat = f.stat()
        reports.append({
            "filename": f.name,
            "size": stat.st_size,
            "modified": datetime.fromtimestamp(stat.st_mtime).isoformat(),
        })
    return {"reports": reports}


@app.get("/api/reports/{filename}")
async def get_report(filename: str):
    """Read a specific report file."""
    report_path = Path(REPORTS_DIR) / filename
    if not report_path.exists() or not report_path.suffix == ".md":
        return JSONResponse({"error": "Report not found"}, status_code=404)
    content = report_path.read_text()
    return {"filename": filename, "content": content}


# --------------------------------------------------------------------------
# WebSocket for live logs
# --------------------------------------------------------------------------

@app.websocket("/ws/logs/{run_id}")
async def websocket_logs(websocket: WebSocket, run_id: str):
    """Stream live logs for an audit run."""
    await websocket.accept()
    if run_id not in ws_connections:
        ws_connections[run_id] = []
    ws_connections[run_id].append(websocket)

    # Send existing logs
    run = active_runs.get(run_id)
    if run:
        for log in run["log"]:
            await websocket.send_json(log)

    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        ws_connections[run_id].remove(websocket)


# --------------------------------------------------------------------------
# Audit Execution
# --------------------------------------------------------------------------

async def _broadcast_log(run_id: str, message: str, level: str = "info"):
    """Add log entry and broadcast to WebSocket clients."""
    entry = {
        "timestamp": datetime.now().isoformat(),
        "level": level,
        "message": message,
    }

    if run_id in active_runs:
        active_runs[run_id]["log"].append(entry)

    for ws in ws_connections.get(run_id, []):
        try:
            await ws.send_json(entry)
        except Exception:
            pass


async def _execute_audit(run_id: str, task_id: str, course_id: Optional[str], headless: bool):
    """Execute a single audit task."""
    try:
        active_runs[run_id]["status"] = "running"
        await _broadcast_log(run_id, f"Starting audit: {task_id}" + (f" for {course_id}" if course_id else ""))

        from audit import run_audit
        result = await run_audit(task_id, course_id, headless)

        active_runs[run_id]["status"] = "completed" if result["success"] else "failed"
        active_runs[run_id]["finished_at"] = datetime.now().isoformat()
        active_runs[run_id]["report_path"] = result.get("report_path")
        active_runs[run_id]["error"] = result.get("error")

        if result["success"]:
            await _broadcast_log(run_id, f"Audit complete. Report: {result['report_path']}", "success")
        else:
            await _broadcast_log(run_id, f"Audit failed: {result['error']}", "error")

    except Exception as e:
        active_runs[run_id]["status"] = "failed"
        active_runs[run_id]["error"] = str(e)
        active_runs[run_id]["finished_at"] = datetime.now().isoformat()
        await _broadcast_log(run_id, f"Error: {e}", "error")


async def _execute_suite(run_ids: list[str], headless: bool):
    """Execute a suite of audits sequentially."""
    for run_id in run_ids:
        run = active_runs[run_id]
        await _execute_audit(run_id, run["task_id"], run["course_id"], headless)


# --------------------------------------------------------------------------
# Frontend
# --------------------------------------------------------------------------

STATIC_DIR = Path(__file__).parent / "static"

@app.get("/")
async def index():
    return FileResponse(STATIC_DIR / "index.html")


# Mount static files (CSS, JS) — after specific routes
if STATIC_DIR.exists():
    app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")


# --------------------------------------------------------------------------
# Main
# --------------------------------------------------------------------------

if __name__ == "__main__":
    print("\n  VoraPrep UX Audit Dashboard")
    print("  http://localhost:8642\n")
    uvicorn.run(app, host="0.0.0.0", port=8642, log_level="info")
