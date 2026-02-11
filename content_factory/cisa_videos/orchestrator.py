#!/usr/bin/env python3
"""
CISA Video Pipeline Orchestrator

Fully automated, background-capable pipeline that:
- Runs completely unattended for hours/days
- Persists state to disk (survives restarts)
- Handles failures with automatic retries
- Logs everything to files
- Can run as a background process or Docker container

Usage:
  # Start in background
  nohup python orchestrator.py --batch-size 100 > /dev/null 2>&1 &
  
  # Or with systemd/Docker (see README)
  
  # Check progress anytime
  python orchestrator.py --status
"""
import os
import sys
import json
import time
import logging
import argparse
import signal
import subprocess
from datetime import datetime
from pathlib import Path
from enum import Enum
from dataclasses import dataclass, asdict
from typing import Optional, List
import traceback

# Pipeline stages
class Stage(Enum):
    PENDING = "pending"
    ANALYZING = "analyzing"
    SCRIPT_GENERATING = "script_generating"
    BACKGROUND_GENERATING = "background_generating"
    HEYGEN_QUEUED = "heygen_queued"
    HEYGEN_PROCESSING = "heygen_processing"
    DOWNLOADING = "downloading"
    UPLOADING = "uploading"
    COMPLETED = "completed"
    FAILED = "failed"

@dataclass
class VideoTask:
    id: str
    topic: str
    stage: str = Stage.PENDING.value
    created_at: str = ""
    updated_at: str = ""
    script_file: Optional[str] = None
    background_file: Optional[str] = None
    avatar_id: Optional[str] = None
    avatar_name: Optional[str] = None
    heygen_video_id: Optional[str] = None
    video_file: Optional[str] = None
    storage_url: Optional[str] = None
    error: Optional[str] = None
    retry_count: int = 0
    
    def to_dict(self):
        return asdict(self)

class PipelineState:
    """Persistent state manager - survives restarts."""
    
    def __init__(self, state_file: Path):
        self.state_file = state_file
        self.tasks: List[VideoTask] = []
        self.load()
    
    def load(self):
        """Load state from disk."""
        if self.state_file.exists():
            with open(self.state_file, 'r') as f:
                data = json.load(f)
                self.tasks = [VideoTask(**t) for t in data.get('tasks', [])]
    
    def save(self):
        """Persist state to disk."""
        with open(self.state_file, 'w') as f:
            json.dump({
                'tasks': [t.to_dict() for t in self.tasks],
                'last_updated': datetime.now().isoformat()
            }, f, indent=2)
    
    def add_task(self, task: VideoTask):
        self.tasks.append(task)
        self.save()
    
    def update_task(self, task_id: str, **kwargs):
        for task in self.tasks:
            if task.id == task_id:
                for key, value in kwargs.items():
                    setattr(task, key, value)
                task.updated_at = datetime.now().isoformat()
                self.save()
                return
    
    def get_next_pending(self, stage: Stage) -> Optional[VideoTask]:
        """Get next task ready for a given stage."""
        for task in self.tasks:
            if task.stage == stage.value and task.retry_count < 3:
                return task
        return None
    
    def get_stats(self) -> dict:
        """Get pipeline statistics."""
        stats = {stage.value: 0 for stage in Stage}
        for task in self.tasks:
            stats[task.stage] = stats.get(task.stage, 0) + 1
        return stats


class CISAVideoPipeline:
    """Main pipeline orchestrator."""
    
    MAX_RETRIES = 3
    POLL_INTERVAL = 60  # seconds between HeyGen status checks
    
    def __init__(self, output_dir: Path, batch_size: int = 10):
        self.output_dir = output_dir
        self.batch_size = batch_size
        self.running = True
        
        # Setup directories
        self.state_file = output_dir / "pipeline_state.json"
        self.log_file = output_dir / "pipeline.log"
        
        # Setup logging
        self.setup_logging()
        
        # Load or create state
        self.state = PipelineState(self.state_file)
        
        # Handle graceful shutdown
        signal.signal(signal.SIGINT, self.shutdown)
        signal.signal(signal.SIGTERM, self.shutdown)
    
    def setup_logging(self):
        """Setup file and console logging."""
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s [%(levelname)s] %(message)s',
            handlers=[
                logging.FileHandler(self.log_file),
                logging.StreamHandler(sys.stdout)
            ]
        )
        self.logger = logging.getLogger('pipeline')
    
    def shutdown(self, signum, frame):
        """Graceful shutdown handler."""
        self.logger.info("[STOP] Shutdown signal received, completing current task...")
        self.running = False
    
    def log_progress(self):
        """Log current pipeline status."""
        stats = self.state.get_stats()
        total = len(self.state.tasks)
        completed = stats.get(Stage.COMPLETED.value, 0)
        failed = stats.get(Stage.FAILED.value, 0)
        
        self.logger.info(f"[PROGRESS] {completed}/{total} completed, {failed} failed")
        self.logger.info(f"   Stages: {json.dumps(stats)}")
    
    # ==================== STAGE HANDLERS ====================
    
    def stage_analyze_topics(self):
        """Stage 1: Analyze CISA questions and create tasks."""
        if self.state.tasks:
            self.logger.info("[SKIP] Tasks already exist, skipping analysis")
            return
        
        self.logger.info("[ANALYZE] Stage 1: Analyzing CISA topics...")
        
        try:
            from analyze_topics import analyze_topics
            topics = analyze_topics()
            
            # Create tasks for top N topics
            for i, topic_data in enumerate(topics[:self.batch_size], 1):
                task = VideoTask(
                    id=f"CISA-VIDEO-{i:03d}",
                    topic=topic_data['topic'],
                    stage=Stage.SCRIPT_GENERATING.value,
                    created_at=datetime.now().isoformat()
                )
                self.state.add_task(task)
            
            self.logger.info(f"[OK] Created {len(self.state.tasks)} video tasks")
            
        except Exception as e:
            self.logger.error(f"[ERROR] Analysis failed: {e}")
            traceback.print_exc()
    
    def stage_generate_script(self, task: VideoTask):
        """Stage 2: Generate script for a topic."""
        self.logger.info(f"[SCRIPT] Generating script for: {task.topic}")
        
        try:
            from generate_scripts import generate_script
            from config import SCRIPTS_DIR
            
            script = generate_script({'topic': task.topic, 'sample_questions': []})
            
            if script:
                safe_name = task.topic.replace(' ', '_').replace('/', '-')[:50]
                script_file = Path(SCRIPTS_DIR) / f"{task.id}_{safe_name}.txt"
                
                with open(script_file, 'w', encoding='utf-8') as f:
                    f.write(script)
                
                self.state.update_task(
                    task.id,
                    stage=Stage.BACKGROUND_GENERATING.value,
                    script_file=str(script_file)
                )
                self.logger.info(f"[OK] Script saved: {script_file.name}")
            else:
                raise Exception("Empty script returned")
                
        except Exception as e:
            self.handle_task_error(task, f"Script generation failed: {e}")
    
    def stage_assign_presenter(self, task: VideoTask):
        """Stage 3: Assign random presenter (avatar) and background."""
        self.logger.info(f"[ASSIGN] Assigning presenter for: {task.topic}")
        
        try:
            from config import get_random_combo, get_background_path
            
            # Get random avatar + background combo
            combo = get_random_combo()
            avatar = combo['avatar']
            background_filename = combo['background']
            
            # Get full path to static background
            bg_file = get_background_path(background_filename)
            
            # Verify background exists
            if not Path(bg_file).exists():
                raise Exception(f"Background not found: {bg_file}. Run create_backgrounds.py first.")
            
            self.state.update_task(
                task.id,
                stage=Stage.HEYGEN_QUEUED.value,
                background_file=str(bg_file),
                avatar_id=avatar['id'],
                avatar_name=avatar['name']
            )
            self.logger.info(f"[OK] Assigned: {avatar['name']} ({avatar['id']}) with {background_filename}")
                
        except Exception as e:
            self.handle_task_error(task, f"Presenter assignment failed: {e}")
    
    def stage_heygen_create(self, task: VideoTask):
        """Stage 4: Create video in HeyGen via subprocess (avoids asyncio conflicts)."""
        self.logger.info(f"[HEYGEN] Creating video for: {task.topic} (Presenter: {task.avatar_name})")
        
        try:
            # Run HeyGen in subprocess to avoid Python 3.14 asyncio conflicts
            script_dir = Path(__file__).parent
            result = subprocess.run(
                [
                    sys.executable, str(script_dir / "heygen_subprocess.py"),
                    "create",
                    task.script_file,
                    task.background_file,
                    task.avatar_id,
                    task.topic
                ],
                capture_output=True,
                text=True,
                cwd=str(script_dir),
                timeout=300  # 5 minute timeout
            )
            
            if result.returncode != 0:
                raise Exception(f"Subprocess failed: {result.stderr}")
            
            data = json.loads(result.stdout)
            if not data.get("success"):
                error_msg = data.get("error", "Unknown error")
                if data.get("traceback"):
                    self.logger.debug(f"Traceback:\n{data.get('traceback')}")
                raise Exception(error_msg)
            
            video_id = data.get("video_id")
            if video_id:
                self.state.update_task(
                    task.id,
                    stage=Stage.HEYGEN_PROCESSING.value,
                    heygen_video_id=video_id
                )
                self.logger.info(f"[OK] HeyGen video queued: {video_id}")
            else:
                raise Exception("Failed to create HeyGen video")
                
        except Exception as e:
            self.handle_task_error(task, f"HeyGen creation failed: {e}")
    
    def stage_heygen_poll(self, task: VideoTask):
        """Stage 5: Poll HeyGen for video completion via subprocess."""
        self.logger.info(f"[POLL] Checking HeyGen status for: {task.heygen_video_id}")
        
        try:
            script_dir = Path(__file__).parent
            result = subprocess.run(
                [
                    sys.executable, str(script_dir / "heygen_subprocess.py"),
                    "status",
                    task.heygen_video_id
                ],
                capture_output=True,
                text=True,
                cwd=str(script_dir),
                timeout=120
            )
            
            if result.returncode != 0:
                raise Exception(f"Subprocess failed: {result.stderr}")
            
            data = json.loads(result.stdout)
            if not data.get("success"):
                raise Exception(data.get("error", "Unknown error"))
            
            status = data.get("status")
            download_url = data.get("download_url")
            
            if status == "completed" and download_url:
                self.state.update_task(
                    task.id,
                    stage=Stage.DOWNLOADING.value,
                )
                self.logger.info(f"[OK] Video ready for download")
            elif status == "failed":
                raise Exception("HeyGen video generation failed")
            else:
                # Still processing, will check again next cycle
                self.logger.info(f"[WAIT] Still processing...")
                
        except Exception as e:
            self.handle_task_error(task, f"HeyGen poll failed: {e}")
    
    def stage_download_video(self, task: VideoTask):
        """Stage 6: Download completed video from HeyGen via subprocess."""
        self.logger.info(f"[DOWNLOAD] Downloading video for: {task.topic}")
        
        try:
            from config import VIDEOS_DIR
            
            safe_name = task.topic.replace(' ', '_').replace('/', '-')[:50]
            video_file = Path(VIDEOS_DIR) / f"{task.id}_{safe_name}.mp4"
            
            script_dir = Path(__file__).parent
            result = subprocess.run(
                [
                    sys.executable, str(script_dir / "heygen_subprocess.py"),
                    "download",
                    task.heygen_video_id,
                    str(video_file)
                ],
                capture_output=True,
                text=True,
                cwd=str(script_dir),
                timeout=600  # 10 minutes for download
            )
            
            if result.returncode != 0:
                raise Exception(f"Subprocess failed: {result.stderr}")
            
            data = json.loads(result.stdout)
            if not data.get("success"):
                raise Exception(data.get("error", "Unknown error"))
            
            self.state.update_task(
                task.id,
                stage=Stage.UPLOADING.value,
                video_file=str(video_file)
            )
            self.logger.info(f"[OK] Video downloaded: {video_file.name}")
                
        except Exception as e:
            self.handle_task_error(task, f"Download failed: {e}")
    
    def stage_upload_storage(self, task: VideoTask):
        """Stage 7: Upload video to Firebase Storage."""
        self.logger.info(f"[UPLOAD] Uploading to storage: {task.topic}")
        
        try:
            # For now, just mark as completed
            # Firebase upload can be added later
            self.state.update_task(
                task.id,
                stage=Stage.COMPLETED.value,
                storage_url=f"local://{task.video_file}"
            )
            self.logger.info(f"[OK] Video completed: {task.id}")
                
        except Exception as e:
            self.handle_task_error(task, f"Upload failed: {e}")
    
    def handle_task_error(self, task: VideoTask, error: str):
        """Handle task failure with retry logic."""
        self.logger.error(f"[ERROR] {error}")
        
        if task.retry_count < self.MAX_RETRIES:
            self.state.update_task(
                task.id,
                retry_count=task.retry_count + 1,
                error=error
            )
            self.logger.info(f"[RETRY] Will retry (attempt {task.retry_count + 1}/{self.MAX_RETRIES})")
        else:
            self.state.update_task(
                task.id,
                stage=Stage.FAILED.value,
                error=error
            )
            self.logger.error(f"[FAILED] Task permanently failed after {self.MAX_RETRIES} retries")
    
    # ==================== MAIN LOOP ====================
    
    def run(self):
        """Main pipeline loop - runs until all tasks complete or shutdown."""
        self.logger.info("=" * 60)
        self.logger.info("CISA Video Pipeline Started")
        self.logger.info(f"   Batch size: {self.batch_size}")
        self.logger.info(f"   State file: {self.state_file}")
        self.logger.info(f"   Log file: {self.log_file}")
        self.logger.info("=" * 60)
        
        # Stage 1: Initial analysis
        self.stage_analyze_topics()
        
        # Main processing loop
        while self.running:
            self.log_progress()
            
            # Check if all done
            stats = self.state.get_stats()
            pending = sum(v for k, v in stats.items() 
                         if k not in [Stage.COMPLETED.value, Stage.FAILED.value])
            
            if pending == 0:
                self.logger.info("[DONE] All tasks completed!")
                break
            
            # Process each stage
            processed_any = False
            
            # Stage 2: Generate scripts
            task = self.state.get_next_pending(Stage.SCRIPT_GENERATING)
            if task:
                self.stage_generate_script(task)
                processed_any = True
            
            # Stage 3: Assign presenter (avatar + background)
            task = self.state.get_next_pending(Stage.BACKGROUND_GENERATING)
            if task:
                self.stage_assign_presenter(task)
                processed_any = True
            
            # Stage 4: Create HeyGen videos
            task = self.state.get_next_pending(Stage.HEYGEN_QUEUED)
            if task:
                self.stage_heygen_create(task)
                processed_any = True
            
            # Stage 5: Poll HeyGen status
            task = self.state.get_next_pending(Stage.HEYGEN_PROCESSING)
            if task:
                self.stage_heygen_poll(task)
                # Don't mark as processed - we want to poll again
            
            # Stage 6: Download videos
            task = self.state.get_next_pending(Stage.DOWNLOADING)
            if task:
                self.stage_download_video(task)
                processed_any = True
            
            # Stage 7: Upload to storage
            task = self.state.get_next_pending(Stage.UPLOADING)
            if task:
                self.stage_upload_storage(task)
                processed_any = True
            
            # If nothing to process, wait before next cycle
            if not processed_any:
                self.logger.info(f"[WAIT] Waiting {self.POLL_INTERVAL}s for HeyGen processing...")
                time.sleep(self.POLL_INTERVAL)
        
        self.logger.info("[END] Pipeline finished")
        self.log_progress()
    
    def status(self):
        """Print current pipeline status."""
        stats = self.state.get_stats()
        total = len(self.state.tasks)
        
        print("\n" + "=" * 60)
        print("CISA Video Pipeline Status")
        print("=" * 60)
        print(f"Total tasks: {total}")
        print()
        
        for stage in Stage:
            count = stats.get(stage.value, 0)
            bar = "#" * count + "." * (total - count) if total > 0 else ""
            print(f"  {stage.value:20} {count:3} {bar[:20]}")
        
        print()
        
        # Show recent errors
        errors = [t for t in self.state.tasks if t.error]
        if errors:
            print("Recent errors:")
            for t in errors[:5]:
                print(f"  - {t.id}: {t.error[:50]}...")
        
        print()


def main():
    parser = argparse.ArgumentParser(description='CISA Video Pipeline')
    parser.add_argument('--batch-size', type=int, default=10, help='Number of videos to generate')
    parser.add_argument('--status', action='store_true', help='Show pipeline status and exit')
    parser.add_argument('--output-dir', type=str, default=None, help='Output directory')
    
    args = parser.parse_args()
    
    output_dir = Path(args.output_dir) if args.output_dir else Path(__file__).parent / "output"
    
    pipeline = CISAVideoPipeline(
        output_dir=output_dir,
        batch_size=args.batch_size
    )
    
    if args.status:
        pipeline.status()
    else:
        pipeline.run()


if __name__ == "__main__":
    main()
