#!/usr/bin/env python3
"""
Webhook Server for Make.com/Zapier Integration

Provides HTTP endpoints to:
- Trigger video generation
- Check pipeline status
- Get individual video status
- Receive HeyGen completion callbacks

Run: python webhook_server.py
Or: gunicorn webhook_server:app -b 0.0.0.0:5050
"""
import os
import json
import logging
from pathlib import Path
from flask import Flask, request, jsonify
from datetime import datetime

from orchestrator import CISAVideoPipeline, PipelineState, VideoTask, Stage

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

OUTPUT_DIR = Path(__file__).parent / "output"
STATE_FILE = OUTPUT_DIR / "pipeline_state.json"

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/status', methods=['GET'])
def get_status():
    """Get current pipeline status."""
    try:
        state = PipelineState(STATE_FILE)
        stats = state.get_stats()
        total = len(state.tasks)
        
        return jsonify({
            'success': True,
            'total_tasks': total,
            'stages': stats,
            'completed': stats.get(Stage.COMPLETED.value, 0),
            'failed': stats.get(Stage.FAILED.value, 0),
            'in_progress': total - stats.get(Stage.COMPLETED.value, 0) - stats.get(Stage.FAILED.value, 0)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/tasks', methods=['GET'])
def list_tasks():
    """List all tasks with their status."""
    try:
        state = PipelineState(STATE_FILE)
        tasks = [t.to_dict() for t in state.tasks]
        return jsonify({
            'success': True,
            'count': len(tasks),
            'tasks': tasks
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/tasks/<task_id>', methods=['GET'])
def get_task(task_id):
    """Get a specific task by ID."""
    try:
        state = PipelineState(STATE_FILE)
        for task in state.tasks:
            if task.id == task_id:
                return jsonify({
                    'success': True,
                    'task': task.to_dict()
                })
        return jsonify({'success': False, 'error': 'Task not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/trigger', methods=['POST'])
def trigger_pipeline():
    """
    Trigger new video generation.
    
    POST body:
    {
        "batch_size": 10,
        "topics": ["optional", "specific", "topics"]
    }
    """
    try:
        data = request.get_json() or {}
        batch_size = data.get('batch_size', 10)
        topics = data.get('topics', None)
        
        # Create pipeline instance
        pipeline = CISAVideoPipeline(
            output_dir=OUTPUT_DIR,
            batch_size=batch_size
        )
        
        # Just trigger topic analysis for now
        # Full pipeline runs separately
        pipeline.stage_analyze_topics()
        
        return jsonify({
            'success': True,
            'message': f'Pipeline triggered for {batch_size} videos',
            'tasks_created': len(pipeline.state.tasks)
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/webhook/heygen', methods=['POST'])
def heygen_callback():
    """
    Callback endpoint for HeyGen video completion.
    Configure this URL in HeyGen webhook settings.
    """
    try:
        data = request.get_json()
        event_type = data.get('event')
        video_id = data.get('video_id')
        status = data.get('status')
        
        logging.info(f"HeyGen callback: {event_type} - {video_id} - {status}")
        
        if event_type == 'video.completed':
            # Update task status
            state = PipelineState(STATE_FILE)
            for task in state.tasks:
                if task.heygen_video_id == video_id:
                    state.update_task(
                        task.id,
                        stage=Stage.DOWNLOADING.value
                    )
                    break
        
        return jsonify({'received': True})
        
    except Exception as e:
        logging.error(f"Webhook error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/add-topic', methods=['POST'])
def add_topic():
    """
    Add a specific topic for video generation.
    
    POST body:
    {
        "topic": "COBIT Framework",
        "domain": "CISA2"
    }
    """
    try:
        data = request.get_json()
        topic = data.get('topic')
        
        if not topic:
            return jsonify({'success': False, 'error': 'Topic is required'}), 400
        
        state = PipelineState(STATE_FILE)
        
        # Create new task
        task_id = f"CISA-VIDEO-{len(state.tasks) + 1:03d}"
        task = VideoTask(
            id=task_id,
            topic=topic,
            stage=Stage.SCRIPT_GENERATING.value,
            created_at=datetime.now().isoformat()
        )
        state.add_task(task)
        
        return jsonify({
            'success': True,
            'task_id': task_id,
            'message': f'Task created for: {topic}'
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5050))
    print(f"🌐 Webhook server starting on port {port}")
    print(f"   Endpoints:")
    print(f"   - GET  /health      - Health check")
    print(f"   - GET  /status      - Pipeline status")
    print(f"   - GET  /tasks       - List all tasks")
    print(f"   - POST /trigger     - Start pipeline")
    print(f"   - POST /add-topic   - Add specific topic")
    print()
    app.run(host='0.0.0.0', port=port, debug=False)
