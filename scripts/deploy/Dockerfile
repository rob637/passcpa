FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY scripts/deploy/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy bot code
COPY scripts/discord_bots/ /app/discord_bots/
COPY scripts/reddit_monitor/ /app/reddit_monitor/
COPY scripts/deploy/runner.py /app/runner.py

# Remove any local .env files (secrets come from Railway env vars)
RUN rm -f /app/discord_bots/.env /app/reddit_monitor/.env

# Health check — verify Python is working
HEALTHCHECK --interval=60s --timeout=5s --retries=3 \
  CMD python -c "print('ok')" || exit 1

CMD ["python", "runner.py"]
