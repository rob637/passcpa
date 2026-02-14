# CISA Video Pipeline - Docker Container
# Runs the full pipeline in an isolated, reproducible environment

FROM mcr.microsoft.com/playwright/python:v1.40.0-jammy

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Playwright browsers
RUN playwright install chromium

# Copy pipeline code
COPY . .

# Create output directories
RUN mkdir -p output/scripts output/backgrounds output/videos

# Environment variables (override in docker-compose or .env)
ENV PYTHONUNBUFFERED=1
ENV HEADLESS=true

# Health check
HEALTHCHECK --interval=60s --timeout=10s --start-period=30s \
  CMD python -c "import json; print(json.load(open('output/pipeline_state.json', 'r'))['last_updated'])" || exit 1

# Default command - run the pipeline
CMD ["python", "orchestrator.py", "--batch-size", "100"]
