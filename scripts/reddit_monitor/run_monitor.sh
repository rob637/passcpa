#!/bin/bash
# Reddit/Discord Opportunity Monitor - Cron wrapper script
# Runs every hour to find exam prep opportunities and email them

cd "$(dirname "$0")"

# Load environment variables
set -a
source .env
set +a

# Run the monitor (both Reddit and Discord)
/usr/bin/python3 reddit_opportunity_finder.py 2>&1 | head -100

# Log timestamp
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Monitor completed" >> monitor.log
