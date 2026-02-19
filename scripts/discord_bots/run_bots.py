#!/usr/bin/env python3
"""
VoraPrep Quiz Bot Launcher

Runs one or more exam quiz bots across one or more platforms.
Each bot is independent — runs in its own async task with its own
quiz engine and platform adapter.

Usage:
  # Run all 6 exam bots on Discord
  python run_bots.py --platform discord

  # Run just CPA and EA bots
  python run_bots.py --platform discord --exams cpa ea

  # Run CPA bot on Discord with a specific token
  python run_bots.py --platform discord --exams cpa

  # Show bot status
  python run_bots.py --status

  # Dry run — load questions and show stats without connecting
  python run_bots.py --dry-run
"""

import asyncio
import argparse
import json
import os
import sys
import signal
import logging
from datetime import datetime
from typing import List, Dict

from dotenv import load_dotenv

# Load .env from multiple possible locations
for env_path in ['.env', '../reddit_monitor/.env', '../../.env']:
    full_path = os.path.join(os.path.dirname(__file__), env_path)
    if os.path.exists(full_path):
        load_dotenv(full_path)
        break

from quiz_engine import QuizEngine
from discord_adapter import DiscordAdapter

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(name)s] %(levelname)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)
logger = logging.getLogger('voraprep_launcher')

# Load bot configs
CONFIG_PATH = os.path.join(os.path.dirname(__file__), 'bot_configs.json')
with open(CONFIG_PATH, 'r') as f:
    BOT_CONFIGS = json.load(f)

ALL_EXAMS = list(BOT_CONFIGS.keys())


def get_bot_token(exam: str) -> str:
    """
    Get Discord bot token for an exam.
    
    Token resolution order:
    1. Exam-specific token: DISCORD_BOT_TOKEN_CPA
    2. Shared token: DISCORD_BOT_TOKEN (all bots use same token)
    
    For 6 separate bots, you'll want 6 separate Discord applications.
    For development, a single bot token works fine.
    """
    config = BOT_CONFIGS[exam]
    # Try exam-specific token first
    token = os.environ.get(config.get('env_token_key', ''))
    if token:
        return token
    # Fall back to shared token
    token = os.environ.get('DISCORD_BOT_TOKEN')
    if token:
        return token
    raise ValueError(
        f'No Discord bot token found for {exam.upper()}. '
        f'Set {config.get("env_token_key", "DISCORD_BOT_TOKEN_" + exam.upper())} '
        f'or DISCORD_BOT_TOKEN in your .env file.'
    )


def create_engine(exam: str) -> QuizEngine:
    """Create a quiz engine for the given exam."""
    data_dir = os.path.join(os.path.dirname(__file__), 'data')
    return QuizEngine(exam, data_dir=data_dir)


def print_dry_run(exams: List[str]):
    """Show question stats without connecting to any platform."""
    print('\n' + '='*60)
    print('  VoraPrep Quiz Bots — Dry Run')
    print('='*60)

    total_questions = 0
    for exam in exams:
        try:
            engine = create_engine(exam)
            config = BOT_CONFIGS[exam]
            stats = engine.get_global_stats()
            sections = engine.get_sections()

            print(f'\n  {config["emoji"]} {config["full_name"]}')
            print(f'     Questions: {stats["questions_available"]}')
            print(f'     Sections:  {", ".join(sections)}')
            print(f'     Servers:   {stats["servers"]}')
            print(f'     Users:     {stats["users"]}')
            print(f'     Answers:   {stats["total_answers"]} ({stats["accuracy"]}% accuracy)')

            # Section breakdown
            for sec in sections:
                count = engine.get_question_count(sec)
                name = config.get('section_names', {}).get(sec, sec)
                print(f'       {sec}: {count} questions — {name}')

            total_questions += stats['questions_available']

            # Check token availability
            try:
                token = get_bot_token(exam)
                print(f'     Token:     ✅ Found ({token[:20]}...)')
            except ValueError:
                print(f'     Token:     ❌ Not found')

        except FileNotFoundError:
            print(f'\n  ❌ {exam.upper()}: Question file not found')
            print(f'     Run: npx tsx scripts/discord_bots/extract_questions.ts')

    print(f'\n  📊 Total: {total_questions} questions across {len(exams)} exams')
    print('='*60 + '\n')


async def run_single_bot(exam: str, platform: str = 'discord'):
    """Run a single exam bot."""
    config = BOT_CONFIGS[exam]
    engine = create_engine(exam)

    if platform == 'discord':
        token = get_bot_token(exam)
        adapter = DiscordAdapter(engine, config, token)
        logger.info(f'Starting {config["name"]} bot on Discord...')
        await adapter.start()
    elif platform == 'slack':
        from slack_adapter import SlackAdapter
        bot_token = os.environ.get(f'SLACK_BOT_TOKEN_{exam.upper()}', os.environ.get('SLACK_BOT_TOKEN', ''))
        signing_secret = os.environ.get('SLACK_SIGNING_SECRET', '')
        adapter = SlackAdapter(engine, config, bot_token, signing_secret)
        logger.info(f'Starting {config["name"]} bot on Slack...')
        await adapter.start()
    elif platform == 'telegram':
        from telegram_adapter import TelegramAdapter
        token = os.environ.get(f'TELEGRAM_BOT_TOKEN_{exam.upper()}', os.environ.get('TELEGRAM_BOT_TOKEN', ''))
        if not token:
            raise ValueError(
                f'No Telegram bot token found for {exam.upper()}. '
                f'Set TELEGRAM_BOT_TOKEN_{exam.upper()} or TELEGRAM_BOT_TOKEN in .env'
            )
        adapter = TelegramAdapter(engine, config, token)
        logger.info(f'Starting {config["name"]} bot on Telegram...')
        await adapter.start()
    else:
        raise ValueError(f'Unknown platform: {platform}')


async def run_multiple_bots(exams: List[str], platform: str = 'discord'):
    """
    Run multiple exam bots concurrently.
    
    IMPORTANT: If using a single Discord bot token, only ONE bot can run at a time.
    For 6 separate bots, you need 6 separate Discord applications with 6 tokens.
    With a single token, use --exams to select one at a time.
    """
    # Check if we have unique tokens or a shared one
    tokens = {}
    shared_token = os.environ.get('DISCORD_BOT_TOKEN', '')
    unique_tokens = True

    for exam in exams:
        try:
            token = get_bot_token(exam)
            tokens[exam] = token
            if token == shared_token:
                unique_tokens = False
        except ValueError as e:
            logger.error(str(e))
            return

    if not unique_tokens and len(exams) > 1:
        logger.warning(
            f'\n⚠️  All {len(exams)} bots share the same Discord token.\n'
            f'   Only ONE bot can run per token. Running {exams[0].upper()} only.\n'
            f'   To run all 6, create separate Discord apps and set:\n'
            f'   DISCORD_BOT_TOKEN_CPA, DISCORD_BOT_TOKEN_EA, etc.\n'
        )
        exams = [exams[0]]

    if len(exams) == 1:
        await run_single_bot(exams[0], platform)
    else:
        tasks = [run_single_bot(exam, platform) for exam in exams]
        await asyncio.gather(*tasks)


def main():
    parser = argparse.ArgumentParser(
        description='VoraPrep Quiz Bot Launcher',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Examples:
  python run_bots.py --platform discord --exams cpa
  python run_bots.py --platform discord --exams cpa ea cma
  python run_bots.py --dry-run
  python run_bots.py --dry-run --exams cisa
        '''
    )

    parser.add_argument(
        '--platform', '-p',
        choices=['discord', 'slack', 'telegram'],
        default='discord',
        help='Platform to run on (default: discord)'
    )
    parser.add_argument(
        '--exams', '-e',
        nargs='+',
        choices=ALL_EXAMS,
        default=ALL_EXAMS,
        help='Exams to run bots for (default: all 6)'
    )
    parser.add_argument(
        '--dry-run', '-d',
        action='store_true',
        help='Show stats without connecting to any platform'
    )
    parser.add_argument(
        '--status', '-s',
        action='store_true',
        help='Show current bot status and leaderboard stats'
    )

    args = parser.parse_args()

    if args.dry_run or args.status:
        print_dry_run(args.exams)
        return

    print(f'\n🚀 Launching VoraPrep Quiz Bots on {args.platform.title()}')
    print(f'   Exams: {", ".join(e.upper() for e in args.exams)}')
    print(f'   Time: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}\n')

    try:
        asyncio.run(run_multiple_bots(args.exams, args.platform))
    except KeyboardInterrupt:
        logger.info('\n👋 Shutting down bots...')
    except Exception as e:
        logger.error(f'Fatal error: {e}')
        sys.exit(1)


if __name__ == '__main__':
    main()
