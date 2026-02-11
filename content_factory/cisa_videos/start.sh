#!/bin/bash
#
# CISA Video Pipeline - Background Starter
#
# Usage:
#   ./start.sh                    # Start pipeline (default 10 videos)
#   ./start.sh --batch-size 20    # Start with specific batch size
#   ./start.sh --status           # Check status
#   ./start.sh --logs             # Tail logs
#   ./start.sh --stop             # Stop pipeline
#

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

PID_FILE="output/.pipeline.pid"
LOG_FILE="output/pipeline.log"
BATCH_SIZE=10

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --batch-size)
            BATCH_SIZE="$2"
            shift 2
            ;;
        --status|status)
            python orchestrator.py --status
            exit 0
            ;;
        --logs|logs)
            echo "📋 Tailing $LOG_FILE (Ctrl+C to exit)"
            tail -f "$LOG_FILE"
            exit 0
            ;;
        --stop|stop)
            if [ -f "$PID_FILE" ]; then
                PID=$(cat "$PID_FILE")
                if kill -0 "$PID" 2>/dev/null; then
                    echo "🛑 Stopping pipeline (PID $PID)..."
                    kill -TERM "$PID"
                    sleep 2
                    if kill -0 "$PID" 2>/dev/null; then
                        kill -9 "$PID"
                    fi
                    rm -f "$PID_FILE"
                    echo "✅ Pipeline stopped"
                else
                    echo "⚠️  Pipeline not running"
                    rm -f "$PID_FILE"
                fi
            else
                echo "⚠️  No PID file found"
            fi
            exit 0
            ;;
        --start|start)
            shift
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Ensure output directory exists
mkdir -p output

# Check if already running
if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE") 2>/dev/null; then
    echo "⚠️  Pipeline already running (PID $(cat $PID_FILE))"
    echo "   Use: $0 --status"
    exit 1
fi

echo "🚀 Starting CISA Video Pipeline..."
echo "   Batch size: $BATCH_SIZE videos"
echo "   Logs: $LOG_FILE"
echo ""

# Install dependencies if needed
if ! python -c "import playwright" 2>/dev/null; then
    echo "📦 Installing dependencies..."
    pip install -r requirements.txt
    playwright install chromium
fi

# Start in background with nohup
nohup python orchestrator.py --batch-size $BATCH_SIZE >> "$LOG_FILE" 2>&1 &
echo $! > "$PID_FILE"

echo "✅ Pipeline started (PID $!)"
echo ""
echo "Commands:"
echo "  $0 --status   Check progress"
echo "  $0 --logs     Watch logs"
echo "  $0 --stop     Stop pipeline"
