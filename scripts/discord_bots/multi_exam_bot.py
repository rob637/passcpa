"""
VoraPrep Multi-Exam Discord Bot

Single bot that serves all 6 exam quiz engines. Users pick their exam
via the /quiz command's `exam` parameter, or just use /quiz in an
exam-specific channel (e.g., #cpa-quiz auto-selects CPA).

Commands:
  /quiz [exam] [section] [difficulty]  — Random practice question
  /daily [exam]                        — Question of the day
  /leaderboard [exam]                  — Server leaderboard
  /stats [exam] [@user]                — Your stats
  /sections [exam]                     — List available exam sections
  /exams                               — Show all supported exams
  /help                                — How to use the bot
"""

import asyncio
import json
import os
import discord
from discord import app_commands
from discord.ext import commands, tasks
from typing import Dict, Optional, List
from datetime import datetime, time
import logging

from quiz_engine import QuizEngine, Question, Difficulty, PlatformAdapter

logger = logging.getLogger('voraprep_discord')

# Emoji mapping for answers
ANSWER_EMOJIS = ['🇦', '🇧', '🇨', '🇩']
EMOJI_TO_INDEX = {e: i for i, e in enumerate(ANSWER_EMOJIS)}

# Timer for answer reveal (seconds)
ANSWER_REVEAL_DELAY = 30

# Channel name → exam mapping
CHANNEL_EXAM_MAP = {
    'cpa-quiz': 'cpa',
    'cpa': 'cpa',
    'ea-quiz': 'ea',
    'ea': 'ea',
    'cma-quiz': 'cma',
    'cma': 'cma',
    'cia-quiz': 'cia',
    'cia': 'cia',
    'cisa-quiz': 'cisa',
    'cisa': 'cisa',
    'cfp-quiz': 'cfp',
    'cfp': 'cfp',
}

ALL_EXAMS = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp']


class ActiveQuiz:
    """Tracks an active quiz question awaiting answers."""
    def __init__(self, question: Question, message_id: int, channel_id: int, exam: str):
        self.question = question
        self.message_id = message_id
        self.channel_id = channel_id
        self.exam = exam
        self.answers: Dict[str, int] = {}  # user_id -> answer_index
        self.usernames: Dict[str, str] = {}  # user_id -> display_name
        self.created_at = datetime.now()


class MultiExamDiscordBot:
    """
    Single Discord bot that serves all 6 exam quiz engines.
    Auto-detects exam from channel name, or user picks via /quiz exam:cpa.
    """

    def __init__(self, token: str, data_dir: str = None, config_path: str = None):
        self.token = token
        self.data_dir = data_dir or os.path.join(os.path.dirname(__file__), 'data')
        self.active_quizzes: Dict[int, ActiveQuiz] = {}  # message_id -> ActiveQuiz

        # Load bot configs
        config_path = config_path or os.path.join(os.path.dirname(__file__), 'bot_configs.json')
        with open(config_path, 'r') as f:
            self.configs = json.load(f)

        # Create quiz engines for all 6 exams
        self.engines: Dict[str, QuizEngine] = {}
        for exam in ALL_EXAMS:
            try:
                self.engines[exam] = QuizEngine(exam, data_dir=self.data_dir)
                logger.info(f'Loaded {exam.upper()}: {self.engines[exam].get_question_count()} questions')
            except FileNotFoundError:
                logger.warning(f'No question file for {exam.upper()} — skipping')

        # Set up bot
        intents = discord.Intents.default()
        intents.message_content = False
        intents.reactions = True
        intents.guilds = True

        self.bot = commands.Bot(
            command_prefix='!',
            intents=intents,
            help_command=None,
        )

        self._register_events()
        self._register_commands()

    def _detect_exam(self, channel_name: str) -> Optional[str]:
        """Detect exam from channel name."""
        name = channel_name.lower().strip()
        return CHANNEL_EXAM_MAP.get(name)

    def _get_engine(self, exam: str) -> Optional[QuizEngine]:
        return self.engines.get(exam.lower())

    def _get_config(self, exam: str) -> dict:
        return self.configs.get(exam.lower(), {})

    def _all_sections(self) -> List[str]:
        """Get all sections across all exams."""
        sections = []
        for engine in self.engines.values():
            sections.extend(engine.get_sections())
        return sorted(set(sections))

    def _format_difficulty_badge(self, difficulty: str) -> str:
        badges = {'easy': '🟢 Easy', 'medium': '🟡 Medium', 'hard': '🔴 Hard'}
        return badges.get(difficulty, difficulty)

    def _register_events(self):
        bot = self.bot

        @bot.event
        async def on_ready():
            total_q = sum(e.get_question_count() for e in self.engines.values())
            logger.info(f'🤖 VoraPrep Quiz Bot online as {bot.user}')
            logger.info(f'   Serving {total_q} questions across {len(self.engines)} exams')
            logger.info(f'   Connected to {len(bot.guilds)} servers')

            activity = discord.Activity(
                type=discord.ActivityType.playing,
                name=f'/quiz — 6 Exam Prep Quizzes'
            )
            await bot.change_presence(activity=activity)

            try:
                synced = await bot.tree.sync()
                logger.info(f'   Synced {len(synced)} slash commands')
            except Exception as e:
                logger.error(f'   Failed to sync commands: {e}')

            if not self.daily_question_task.is_running():
                self.daily_question_task.start()

        @bot.event
        async def on_raw_reaction_add(payload: discord.RawReactionActionEvent):
            if payload.user_id == bot.user.id:
                return
            emoji = str(payload.emoji)
            if emoji not in EMOJI_TO_INDEX:
                return
            if payload.message_id not in self.active_quizzes:
                return

            quiz = self.active_quizzes[payload.message_id]
            user_id = str(payload.user_id)
            answer_index = EMOJI_TO_INDEX[emoji]

            if user_id not in quiz.answers:
                quiz.answers[user_id] = answer_index
                guild = bot.get_guild(payload.guild_id) if payload.guild_id else None
                if guild:
                    member = guild.get_member(payload.user_id)
                    if member:
                        quiz.usernames[user_id] = member.display_name

    def _register_commands(self):
        bot = self.bot

        # Build exam choices for slash commands
        exam_choices = [
            app_commands.Choice(name=f'{self.configs[e]["emoji"]} {e.upper()}', value=e)
            for e in ALL_EXAMS if e in self.engines
        ]

        # ─── /quiz ──────────────────────────────────────────

        @bot.tree.command(name='quiz', description='Get a random practice question')
        @app_commands.describe(
            exam='Which exam (auto-detected from channel name if not specified)',
            section='Exam section (e.g., FAR, SEE1, CISA1)',
            difficulty='Question difficulty level'
        )
        @app_commands.choices(
            exam=exam_choices,
            difficulty=[
                app_commands.Choice(name='🟢 Easy', value='easy'),
                app_commands.Choice(name='🟡 Medium', value='medium'),
                app_commands.Choice(name='🔴 Hard', value='hard'),
                app_commands.Choice(name='🎲 Any', value='any'),
            ]
        )
        async def quiz_command(
            interaction: discord.Interaction,
            exam: Optional[str] = None,
            section: Optional[str] = None,
            difficulty: Optional[str] = 'any',
        ):
            # Auto-detect exam from channel name
            if not exam and interaction.channel:
                exam = self._detect_exam(interaction.channel.name)
            if not exam:
                await interaction.response.send_message(
                    '🎯 Which exam? Use `/quiz exam:cpa` or try from an exam channel like `#cpa-quiz`.\n\n'
                    'Available: ' + ', '.join(f'**{e.upper()}**' for e in self.engines.keys()),
                    ephemeral=True,
                )
                return

            engine = self._get_engine(exam)
            if not engine:
                await interaction.response.send_message(f'❌ Exam `{exam}` not available.', ephemeral=True)
                return

            await interaction.response.defer()

            diff = Difficulty(difficulty) if difficulty else Difficulty.ANY
            server_id = str(interaction.guild_id) if interaction.guild_id else 'dm'

            question = engine.get_random_question(
                section=section,
                difficulty=diff,
                server_id=server_id,
            )

            if not question:
                await interaction.followup.send(
                    f'❌ No questions found. Try `/sections exam:{exam}` to see available sections.',
                    ephemeral=True,
                )
                return

            config = self._get_config(exam)
            message = await self._post_question_embed(interaction, question, config, engine)
            if message:
                self.active_quizzes[message.id] = ActiveQuiz(
                    question=question,
                    message_id=message.id,
                    channel_id=message.channel.id,
                    exam=exam,
                )
                asyncio.create_task(self._reveal_after_delay(message.id, server_id, exam))

        # ─── /daily ──────────────────────────────────────────

        @bot.tree.command(name='daily', description="Today's question of the day")
        @app_commands.describe(exam='Which exam (auto-detected from channel)')
        @app_commands.choices(exam=exam_choices)
        async def daily_command(interaction: discord.Interaction, exam: Optional[str] = None):
            if not exam and interaction.channel:
                exam = self._detect_exam(interaction.channel.name)
            if not exam:
                await interaction.response.send_message(
                    '🎯 Which exam? Use `/daily exam:cpa` or try from an exam channel.',
                    ephemeral=True,
                )
                return

            engine = self._get_engine(exam)
            if not engine:
                await interaction.response.send_message(f'❌ Exam `{exam}` not available.', ephemeral=True)
                return

            await interaction.response.defer()
            config = self._get_config(exam)
            question = engine.get_daily_question()
            server_id = str(interaction.guild_id) if interaction.guild_id else 'dm'

            message = await self._post_question_embed(
                interaction, question, config, engine,
                title=f'📅 {exam.upper()} Question of the Day',
            )
            if message:
                self.active_quizzes[message.id] = ActiveQuiz(
                    question=question,
                    message_id=message.id,
                    channel_id=message.channel.id,
                    exam=exam,
                )
                asyncio.create_task(self._reveal_after_delay(message.id, server_id, exam))

        # ─── /leaderboard ──────────────────────────────────

        @bot.tree.command(name='leaderboard', description='Top scorers in this server')
        @app_commands.describe(exam='Which exam (auto-detected from channel)')
        @app_commands.choices(exam=exam_choices)
        async def leaderboard_command(interaction: discord.Interaction, exam: Optional[str] = None):
            if not exam and interaction.channel:
                exam = self._detect_exam(interaction.channel.name)
            if not exam:
                await interaction.response.send_message(
                    '🎯 Which exam? Use `/leaderboard exam:cpa`.',
                    ephemeral=True,
                )
                return

            engine = self._get_engine(exam)
            config = self._get_config(exam)
            if not engine:
                await interaction.response.send_message(f'❌ Exam `{exam}` not available.', ephemeral=True)
                return

            server_id = str(interaction.guild_id) if interaction.guild_id else 'dm'
            top_users = engine.get_leaderboard(server_id, limit=10)

            if not top_users:
                await interaction.response.send_message(
                    f'📊 No {exam.upper()} quiz activity yet! Use `/quiz exam:{exam}` to get started.',
                    ephemeral=True,
                )
                return

            embed = discord.Embed(
                title=f'🏆 {exam.upper()} Leaderboard',
                color=int(config['color'], 16),
            )

            entries = []
            medals = ['🥇', '🥈', '🥉']
            for i, user in enumerate(top_users):
                medal = medals[i] if i < 3 else f'`{i+1}.`'
                streak_txt = f' 🔥{user.streak}' if user.streak >= 3 else ''
                entries.append(
                    f'{medal} **{user.username}** — {user.correct}/{user.total} '
                    f'({user.accuracy}%){streak_txt}'
                )

            embed.description = '\n'.join(entries)
            embed.set_footer(text=f'{config["emoji"]} Powered by VoraPrep | {config["url"]}')
            await interaction.response.send_message(embed=embed)

        # ─── /stats ──────────────────────────────────────────

        @bot.tree.command(name='stats', description='Your quiz statistics')
        @app_commands.describe(
            exam='Which exam (auto-detected from channel)',
            user='Check another user\'s stats',
        )
        @app_commands.choices(exam=exam_choices)
        async def stats_command(
            interaction: discord.Interaction,
            exam: Optional[str] = None,
            user: Optional[discord.Member] = None,
        ):
            if not exam and interaction.channel:
                exam = self._detect_exam(interaction.channel.name)
            if not exam:
                await interaction.response.send_message(
                    '🎯 Which exam? Use `/stats exam:cpa`.',
                    ephemeral=True,
                )
                return

            engine = self._get_engine(exam)
            config = self._get_config(exam)
            if not engine:
                await interaction.response.send_message(f'❌ Exam `{exam}` not available.', ephemeral=True)
                return

            target = user or interaction.user
            server_id = str(interaction.guild_id) if interaction.guild_id else 'dm'
            stats = engine.get_user_stats(server_id, str(target.id))

            if not stats:
                if target == interaction.user:
                    msg = f'📊 You haven\'t answered any {exam.upper()} questions yet! Use `/quiz exam:{exam}` to start.'
                else:
                    msg = f'📊 {target.display_name} hasn\'t answered any {exam.upper()} questions yet.'
                await interaction.response.send_message(msg, ephemeral=True)
                return

            embed = discord.Embed(
                title=f'📊 {target.display_name}\'s {exam.upper()} Stats',
                color=int(config['color'], 16),
            )

            embed.add_field(
                name='Overall',
                value=(
                    f'✅ **{stats.correct}** / {stats.total} correct ({stats.accuracy}%)\n'
                    f'🔥 Current streak: **{stats.streak}**\n'
                    f'⭐ Best streak: **{stats.best_streak}**'
                ),
                inline=False,
            )

            if stats.by_section:
                section_lines = []
                section_names = config.get('section_names', {})
                for sec, s in sorted(stats.by_section.items()):
                    acc = round(s['correct'] / max(s['total'], 1) * 100)
                    name = section_names.get(sec, sec)
                    section_lines.append(f'`{sec}` {name}: {s["correct"]}/{s["total"]} ({acc}%)')
                embed.add_field(name='By Section', value='\n'.join(section_lines[:8]), inline=False)

            if stats.by_difficulty:
                diff_lines = []
                for diff in ['easy', 'medium', 'hard']:
                    if diff in stats.by_difficulty:
                        d = stats.by_difficulty[diff]
                        acc = round(d['correct'] / max(d['total'], 1) * 100)
                        badge = self._format_difficulty_badge(diff)
                        diff_lines.append(f'{badge}: {d["correct"]}/{d["total"]} ({acc}%)')
                if diff_lines:
                    embed.add_field(name='By Difficulty', value='\n'.join(diff_lines), inline=False)

            embed.add_field(
                name='Want more?',
                value=(
                    f'📚 Track your real exam readiness with score prediction '
                    f'and {engine.get_question_count():,}+ questions.\n'
                    f'🎯 **Try VoraPrep free** → {config["url"]}'
                ),
                inline=False,
            )
            embed.set_footer(text=f'{config["emoji"]} Powered by VoraPrep')
            await interaction.response.send_message(embed=embed)

        # ─── /sections ──────────────────────────────────────

        @bot.tree.command(name='sections', description='List available exam sections')
        @app_commands.describe(exam='Which exam (auto-detected from channel)')
        @app_commands.choices(exam=exam_choices)
        async def sections_command(interaction: discord.Interaction, exam: Optional[str] = None):
            if not exam and interaction.channel:
                exam = self._detect_exam(interaction.channel.name)
            if not exam:
                await interaction.response.send_message(
                    '🎯 Which exam? Use `/sections exam:cpa`.',
                    ephemeral=True,
                )
                return

            engine = self._get_engine(exam)
            config = self._get_config(exam)
            if not engine:
                await interaction.response.send_message(f'❌ Exam `{exam}` not available.', ephemeral=True)
                return

            section_names = config.get('section_names', {})
            lines = []
            for sec in engine.get_sections():
                count = engine.get_question_count(sec)
                name = section_names.get(sec, sec)
                lines.append(f'`{sec}` — {name} ({count} questions)')

            embed = discord.Embed(
                title=f'{config["emoji"]} {exam.upper()} Sections',
                description='\n'.join(lines),
                color=int(config['color'], 16),
            )
            embed.add_field(
                name='Usage',
                value=f'`/quiz exam:{exam} section:{engine.get_sections()[0]}` to practice a specific section',
                inline=False,
            )
            embed.set_footer(text=f'Powered by VoraPrep | {config["url"]}')
            await interaction.response.send_message(embed=embed)

        # ─── /exams ──────────────────────────────────────────

        @bot.tree.command(name='exams', description='Show all supported certification exams')
        async def exams_command(interaction: discord.Interaction):
            lines = []
            total_q = 0
            for exam_id, engine in self.engines.items():
                config = self._get_config(exam_id)
                count = engine.get_question_count()
                total_q += count
                sections = ', '.join(engine.get_sections())
                lines.append(
                    f'{config["emoji"]} **{exam_id.upper()}** — {config["full_name"]}\n'
                    f'   {count} questions • Sections: {sections}'
                )

            embed = discord.Embed(
                title='📚 VoraPrep — Supported Exams',
                description='\n\n'.join(lines),
                color=0x1a73e8,
            )
            embed.add_field(
                name='How to Play',
                value=(
                    'Use `/quiz exam:cpa` to start, or just type `/quiz` in an exam channel '
                    'like `#cpa-quiz` and the exam is auto-detected!\n\n'
                    f'**{total_q:,} total questions** across {len(self.engines)} exams'
                ),
                inline=False,
            )
            embed.add_field(
                name='Full Exam Prep',
                value=(
                    'AI tutor, score prediction, adaptive learning, flashcards & more.\n'
                    '🎯 **Try VoraPrep free for 14 days** → https://voraprep.com'
                ),
                inline=False,
            )
            embed.add_field(
                name='📢 Invite Friends',
                value='Share this server → https://discord.gg/XBjzDrws',
                inline=False,
            )
            embed.set_footer(text='Powered by VoraPrep | voraprep.com')
            await interaction.response.send_message(embed=embed)

        # ─── /help ──────────────────────────────────────────

        @bot.tree.command(name='help', description='VoraPrep Quiz Bot — how to use')
        async def help_command(interaction: discord.Interaction):
            embed = discord.Embed(
                title='📚 VoraPrep Quiz Bot — Help',
                description=(
                    'Practice questions for CPA, EA, CMA, CIA, CISA, and CFP exams.\n'
                    'Use exam channels (e.g., `#cpa-quiz`) for auto-detection, '
                    'or specify the exam explicitly.'
                ),
                color=0x1a73e8,
            )

            embed.add_field(
                name='Commands',
                value=(
                    '`/quiz` — Random question (auto-detects exam from channel)\n'
                    '`/quiz exam:cpa` — CPA question\n'
                    '`/quiz exam:ea section:SEE1` — EA Part 1 question\n'
                    '`/quiz difficulty:hard` — Hard questions only\n'
                    '`/daily` — Question of the day\n'
                    '`/leaderboard` — Server rankings\n'
                    '`/stats` — Your personal stats\n'
                    '`/sections` — Available sections for an exam\n'
                    '`/exams` — All supported exams'
                ),
                inline=False,
            )

            embed.add_field(
                name='How It Works',
                value=(
                    '1️⃣ Use `/quiz` to get a question\n'
                    '2️⃣ React with 🇦 🇧 🇨 or 🇩 to answer\n'
                    f'3️⃣ Answer is revealed after {ANSWER_REVEAL_DELAY} seconds\n'
                    '4️⃣ Correct answers boost your leaderboard rank!\n'
                    '5️⃣ Build streaks for bragging rights 🔥'
                ),
                inline=False,
            )

            embed.add_field(
                name='Exam Channels',
                value=(
                    'Use these channels for auto-detection:\n'
                    '`#cpa-quiz` `#ea-quiz` `#cma-quiz` `#cia-quiz` `#cisa-quiz` `#cfp-quiz`'
                ),
                inline=False,
            )

            embed.add_field(
                name='Full Exam Prep',
                value=(
                    'Want AI tutor, score prediction, and 16,000+ questions?\n'
                    '🎯 **Try VoraPrep free for 14 days** → https://voraprep.com'
                ),
                inline=False,
            )

            embed.add_field(
                name='📢 Invite Friends',
                value='Share this study group → https://discord.gg/XBjzDrws',
                inline=False,
            )

            embed.set_footer(text='Powered by VoraPrep | voraprep.com')
            await interaction.response.send_message(embed=embed)

    # ─── Question Posting ──────────────────────────────────

    async def _post_question_embed(
        self,
        interaction: discord.Interaction,
        question: Question,
        config: dict,
        engine: QuizEngine,
        title: Optional[str] = None,
    ) -> Optional[discord.Message]:
        """Create and send a question embed with reaction controls."""

        exam = engine.exam_upper
        section_names = config.get('section_names', {})
        section_display = section_names.get(question.section, question.section)

        embed = discord.Embed(
            title=title or f'{config["emoji"]} {exam} Quiz — {question.section}',
            description=f'**{question.question}**',
            color=int(config['color'], 16),
        )

        options_text = []
        for i, option in enumerate(question.options):
            letter = chr(65 + i)
            options_text.append(f'{ANSWER_EMOJIS[i]} **{letter}.** {option}')

        embed.add_field(
            name='Options',
            value='\n\n'.join(options_text),
            inline=False,
        )

        embed.add_field(
            name='Info',
            value=(
                f'📁 {section_display} • '
                f'{self._format_difficulty_badge(question.difficulty)} • '
                f'📖 {question.topic}'
            ),
            inline=False,
        )

        embed.set_footer(
            text=f'React to answer! Reveals in {ANSWER_REVEAL_DELAY}s | Powered by VoraPrep'
        )

        message = await interaction.followup.send(embed=embed)

        for emoji in ANSWER_EMOJIS:
            await message.add_reaction(emoji)

        return message

    async def _reveal_after_delay(self, message_id: int, server_id: str, exam: str):
        """Wait, then reveal the correct answer."""
        await asyncio.sleep(ANSWER_REVEAL_DELAY)

        if message_id not in self.active_quizzes:
            return

        quiz = self.active_quizzes.pop(message_id)
        question = quiz.question
        config = self._get_config(exam)
        engine = self._get_engine(exam)

        correct_users = []
        wrong_users = []

        for user_id, answer in quiz.answers.items():
            username = quiz.usernames.get(user_id, f'User {user_id[:8]}')
            correct = engine.check_answer(question, answer)
            engine.record_answer(server_id, user_id, username, question, correct)
            if correct:
                correct_users.append(username)
            else:
                wrong_users.append(username)

        correct_letter = chr(65 + question.correct_answer)
        correct_emoji = ANSWER_EMOJIS[question.correct_answer]
        correct_text = question.options[question.correct_answer]

        embed = discord.Embed(
            title=f'✅ Answer: {correct_emoji} {correct_letter}. {correct_text}',
            color=0x34a853,
        )

        if correct_users:
            embed.add_field(
                name=f'🎉 Correct ({len(correct_users)})',
                value=', '.join(correct_users[:15]),
                inline=True,
            )
        if wrong_users:
            embed.add_field(
                name=f'❌ Incorrect ({len(wrong_users)})',
                value=', '.join(wrong_users[:15]),
                inline=True,
            )
        if not quiz.answers:
            embed.add_field(name='😴 No answers', value='Nobody answered this one!', inline=False)

        explanation = question.explanation
        if len(explanation) > 300:
            teaser = explanation[:297] + '...'
        else:
            teaser = explanation

        embed.add_field(name='💡 Quick Explanation', value=teaser, inline=False)

        embed.add_field(
            name='📚 Want the full explanation + AI Tutor?',
            value=(
                f'Practice {engine.get_question_count():,}+ {engine.exam_upper} '
                f'questions with adaptive learning and score prediction.\n'
                f'🎯 **Try VoraPrep free for 14 days** → {config["url"]}'
            ),
            inline=False,
        )

        embed.set_footer(text=f'{config["emoji"]} Use /quiz for another question | VoraPrep')

        try:
            channel = self.bot.get_channel(quiz.channel_id)
            if channel:
                await channel.send(
                    content='⏰ Time\'s up! Here\'s the answer:',
                    embed=embed,
                    reference=discord.MessageReference(
                        message_id=quiz.message_id,
                        channel_id=quiz.channel_id,
                    ),
                )
        except Exception as e:
            logger.error(f'Failed to reveal answer: {e}')

    # ─── Daily Question Task ───────────────────────────────

    @tasks.loop(time=time(hour=14, minute=0))  # 2 PM UTC = ~9 AM EST
    async def daily_question_task(self):
        """Post daily questions to exam-specific channels."""
        for guild in self.bot.guilds:
            for channel in guild.text_channels:
                exam = self._detect_exam(channel.name)
                if not exam or exam not in self.engines:
                    continue

                engine = self.engines[exam]
                config = self._get_config(exam)
                question = engine.get_daily_question()

                try:
                    embed = discord.Embed(
                        title=f'📅 {exam.upper()} Daily Question',
                        description=f'**{question.question}**',
                        color=int(config['color'], 16),
                    )

                    options_text = []
                    for i, option in enumerate(question.options):
                        letter = chr(65 + i)
                        options_text.append(f'{ANSWER_EMOJIS[i]} **{letter}.** {option}')

                    embed.add_field(name='Options', value='\n\n'.join(options_text), inline=False)

                    section_names = config.get('section_names', {})
                    section_display = section_names.get(question.section, question.section)
                    embed.add_field(
                        name='Info',
                        value=(
                            f'📁 {section_display} • '
                            f'{self._format_difficulty_badge(question.difficulty)} • '
                            f'📖 {question.topic}'
                        ),
                        inline=False,
                    )
                    embed.set_footer(text=f'React to answer! Reveals in {ANSWER_REVEAL_DELAY}s | VoraPrep')

                    message = await channel.send(embed=embed)
                    for emoji in ANSWER_EMOJIS:
                        await message.add_reaction(emoji)

                    server_id = str(guild.id)
                    self.active_quizzes[message.id] = ActiveQuiz(
                        question=question,
                        message_id=message.id,
                        channel_id=channel.id,
                        exam=exam,
                    )
                    asyncio.create_task(self._reveal_after_delay(message.id, server_id, exam))

                    logger.info(f'Posted {exam.upper()} daily to {guild.name}/#{channel.name}')
                except Exception as e:
                    logger.error(f'Failed to post daily to #{channel.name}: {e}')

    # ─── Start / Stop ──────────────────────────────────────

    async def start(self):
        """Start the bot."""
        await self.bot.start(self.token)

    async def stop(self):
        """Stop the bot gracefully."""
        await self.bot.close()


def run_bot():
    """Run the multi-exam bot from the command line."""
    from dotenv import load_dotenv

    for env_path in ['.env', '../reddit_monitor/.env']:
        full = os.path.join(os.path.dirname(__file__), env_path)
        if os.path.exists(full):
            load_dotenv(full)
            break

    token = os.environ.get('DISCORD_BOT_TOKEN')
    if not token:
        print('❌ DISCORD_BOT_TOKEN not found in .env')
        return

    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s [%(name)s] %(levelname)s: %(message)s',
    )

    bot = MultiExamDiscordBot(token)

    total_q = sum(e.get_question_count() for e in bot.engines.values())
    print(f'\n🚀 VoraPrep Quiz Bot')
    print(f'   {len(bot.engines)} exams • {total_q:,} questions')
    print(f'   Exams: {", ".join(e.upper() for e in bot.engines.keys())}\n')

    import asyncio
    try:
        asyncio.run(bot.start())
    except KeyboardInterrupt:
        print('\n👋 Bot stopped.')


if __name__ == '__main__':
    run_bot()
