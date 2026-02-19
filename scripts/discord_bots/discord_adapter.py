"""
Discord Adapter for VoraPrep Quiz Engine

Thin adapter that renders quiz engine output as Discord embeds
with emoji reactions for voting.

Commands:
  /quiz [section] [difficulty]  — Random quiz question
  /daily                        — Question of the day
  /leaderboard                  — Server leaderboard
  /stats [@user]                — Your stats (or another user's)
  /sections                     — List available exam sections
  /help                         — How to use the bot
"""

import asyncio
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


class ActiveQuiz:
    """Tracks an active quiz question awaiting answers."""
    def __init__(self, question: Question, message_id: int, channel_id: int):
        self.question = question
        self.message_id = message_id
        self.channel_id = channel_id
        self.answers: Dict[str, int] = {}  # user_id -> answer_index
        self.usernames: Dict[str, str] = {}  # user_id -> display_name
        self.created_at = datetime.now()


class DiscordAdapter(PlatformAdapter):
    """Discord implementation of the quiz bot."""

    def __init__(self, engine: QuizEngine, config: dict, token: str):
        super().__init__(engine, config)
        self.token = token
        self.active_quizzes: Dict[int, ActiveQuiz] = {}  # message_id -> ActiveQuiz

        # Set up bot with intents
        intents = discord.Intents.default()
        intents.message_content = False  # Not needed for slash commands
        intents.reactions = True
        intents.guilds = True

        self.bot = commands.Bot(
            command_prefix='!',
            intents=intents,
            help_command=None,
        )

        # Register events and commands
        self._register_events()
        self._register_commands()

    def _register_events(self):
        """Register Discord event handlers."""
        bot = self.bot

        @bot.event
        async def on_ready():
            logger.info(f'🤖 {self.config["name"]} bot online as {bot.user}')
            logger.info(f'   Serving {self.engine.get_question_count()} questions')
            logger.info(f'   Connected to {len(bot.guilds)} servers')

            # Set bot status
            activity = discord.Activity(
                type=discord.ActivityType.playing,
                name=f'/quiz — {self.config["full_name"]} Practice'
            )
            await bot.change_presence(activity=activity)

            # Sync slash commands
            try:
                synced = await bot.tree.sync()
                logger.info(f'   Synced {len(synced)} slash commands')
            except Exception as e:
                logger.error(f'   Failed to sync commands: {e}')

            # Start daily question task if not already running
            if not self.daily_question_task.is_running():
                self.daily_question_task.start()

        @bot.event
        async def on_raw_reaction_add(payload: discord.RawReactionActionEvent):
            """Handle answer reactions on quiz questions."""
            # Ignore bot's own reactions
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

            # Only count first answer per user
            if user_id not in quiz.answers:
                quiz.answers[user_id] = answer_index
                # Try to get the username
                guild = bot.get_guild(payload.guild_id) if payload.guild_id else None
                if guild:
                    member = guild.get_member(payload.user_id)
                    if member:
                        quiz.usernames[user_id] = member.display_name

    def _register_commands(self):
        """Register slash commands."""
        bot = self.bot
        exam = self.engine.exam_upper
        config = self.config
        sections = self.engine.get_sections()

        # ─── /quiz ──────────────────────────────────────────

        @bot.tree.command(name='quiz', description=f'Get a random {exam} practice question')
        @app_commands.describe(
            section=f'Exam section (e.g., {", ".join(sections[:3])})',
            difficulty='Question difficulty level'
        )
        @app_commands.choices(
            difficulty=[
                app_commands.Choice(name='🟢 Easy', value='easy'),
                app_commands.Choice(name='🟡 Medium', value='medium'),
                app_commands.Choice(name='🔴 Hard', value='hard'),
                app_commands.Choice(name='🎲 Any', value='any'),
            ]
        )
        async def quiz_command(
            interaction: discord.Interaction,
            section: Optional[str] = None,
            difficulty: Optional[str] = 'any',
        ):
            await interaction.response.defer()

            diff = Difficulty(difficulty) if difficulty else Difficulty.ANY
            server_id = str(interaction.guild_id) if interaction.guild_id else 'dm'

            question = self.engine.get_random_question(
                section=section,
                difficulty=diff,
                server_id=server_id,
            )

            if not question:
                await interaction.followup.send(
                    f'❌ No questions found for those filters. '
                    f'Try `/sections` to see available sections.',
                    ephemeral=True,
                )
                return

            message = await self._post_question_embed(interaction, question)
            if message:
                self.active_quizzes[message.id] = ActiveQuiz(
                    question=question,
                    message_id=message.id,
                    channel_id=message.channel.id,
                )
                # Schedule answer reveal
                asyncio.create_task(self._reveal_after_delay(message.id, server_id))

        # ─── /daily ──────────────────────────────────────────

        @bot.tree.command(name='daily', description=f"Today's {exam} question of the day")
        async def daily_command(interaction: discord.Interaction):
            await interaction.response.defer()
            question = self.engine.get_daily_question()
            server_id = str(interaction.guild_id) if interaction.guild_id else 'dm'

            message = await self._post_question_embed(
                interaction, question, title=f'📅 {exam} Question of the Day'
            )
            if message:
                self.active_quizzes[message.id] = ActiveQuiz(
                    question=question,
                    message_id=message.id,
                    channel_id=message.channel.id,
                )
                asyncio.create_task(self._reveal_after_delay(message.id, server_id))

        # ─── /leaderboard ──────────────────────────────────

        @bot.tree.command(name='leaderboard', description=f'Top {exam} scorers in this server')
        async def leaderboard_command(interaction: discord.Interaction):
            server_id = str(interaction.guild_id) if interaction.guild_id else 'dm'
            top_users = self.engine.get_leaderboard(server_id, limit=10)

            if not top_users:
                await interaction.response.send_message(
                    f'📊 No quiz activity yet! Use `/quiz` to get started.',
                    ephemeral=True,
                )
                return

            embed = discord.Embed(
                title=f'🏆 {exam} Leaderboard',
                color=int(config['color'], 16),
            )

            entries = []
            medals = ['🥇', '🥈', '🥉']
            for i, user in enumerate(top_users):
                medal = medals[i] if i < 3 else f'`{i+1}.`'
                acc = user.accuracy
                streak_txt = f' 🔥{user.streak}' if user.streak >= 3 else ''
                entries.append(
                    f'{medal} **{user.username}** — {user.correct}/{user.total} '
                    f'({acc}%){streak_txt}'
                )

            embed.description = '\n'.join(entries)
            embed.set_footer(text=f'{config["emoji"]} Powered by VoraPrep | {config["url"]}')
            await interaction.response.send_message(embed=embed)

        # ─── /stats ──────────────────────────────────────────

        @bot.tree.command(name='stats', description=f'Your {exam} quiz statistics')
        @app_commands.describe(user='Check another user\'s stats')
        async def stats_command(
            interaction: discord.Interaction,
            user: Optional[discord.Member] = None,
        ):
            target = user or interaction.user
            server_id = str(interaction.guild_id) if interaction.guild_id else 'dm'
            stats = self.engine.get_user_stats(server_id, str(target.id))

            if not stats:
                if target == interaction.user:
                    msg = f'📊 You haven\'t answered any questions yet! Use `/quiz` to start.'
                else:
                    msg = f'📊 {target.display_name} hasn\'t answered any questions yet.'
                await interaction.response.send_message(msg, ephemeral=True)
                return

            embed = discord.Embed(
                title=f'📊 {target.display_name}\'s {exam} Stats',
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

            # Section breakdown
            if stats.by_section:
                section_lines = []
                section_names = config.get('section_names', {})
                for sec, s in sorted(stats.by_section.items()):
                    acc = round(s['correct'] / max(s['total'], 1) * 100) 
                    name = section_names.get(sec, sec)
                    section_lines.append(f'`{sec}` {name}: {s["correct"]}/{s["total"]} ({acc}%)')
                embed.add_field(
                    name='By Section',
                    value='\n'.join(section_lines[:8]),
                    inline=False,
                )

            # Difficulty breakdown
            if stats.by_difficulty:
                diff_lines = []
                for diff in ['easy', 'medium', 'hard']:
                    if diff in stats.by_difficulty:
                        d = stats.by_difficulty[diff]
                        acc = round(d['correct'] / max(d['total'], 1) * 100)
                        badge = self.format_difficulty_badge(diff)
                        diff_lines.append(f'{badge}: {d["correct"]}/{d["total"]} ({acc}%)')
                if diff_lines:
                    embed.add_field(
                        name='By Difficulty',
                        value='\n'.join(diff_lines),
                        inline=False,
                    )

            # CTA
            embed.add_field(
                name='Want more?',
                value=(
                    f'📚 Track your real exam readiness with score prediction '
                    f'and {self.engine.get_question_count():,}+ questions.\n'
                    f'🎯 **Try VoraPrep free** → {config["url"]}'
                ),
                inline=False,
            )

            embed.set_footer(text=f'{config["emoji"]} Powered by VoraPrep')
            await interaction.response.send_message(embed=embed)

        # ─── /sections ──────────────────────────────────────

        @bot.tree.command(name='sections', description=f'List available {exam} exam sections')
        async def sections_command(interaction: discord.Interaction):
            section_names = config.get('section_names', {})
            lines = []
            for sec in self.engine.get_sections():
                count = self.engine.get_question_count(sec)
                name = section_names.get(sec, sec)
                lines.append(f'`{sec}` — {name} ({count} questions)')

            embed = discord.Embed(
                title=f'{config["emoji"]} {exam} Sections',
                description='\n'.join(lines),
                color=int(config['color'], 16),
            )
            embed.add_field(
                name='Usage',
                value=f'`/quiz section:{self.engine.get_sections()[0]}` to practice a specific section',
                inline=False,
            )
            embed.set_footer(text=f'Powered by VoraPrep | {config["url"]}')
            await interaction.response.send_message(embed=embed)

        # ─── /help ──────────────────────────────────────────

        @bot.tree.command(name='help', description=f'{exam} quiz bot commands')
        async def help_command(interaction: discord.Interaction):
            embed = discord.Embed(
                title=f'{config["emoji"]} {config["name"]} — Help',
                description=config['description'],
                color=int(config['color'], 16),
            )

            embed.add_field(
                name='Commands',
                value=(
                    '`/quiz` — Random practice question\n'
                    '`/quiz section:FAR` — Question from a specific section\n'
                    '`/quiz difficulty:hard` — Filter by difficulty\n'
                    '`/daily` — Question of the day\n'
                    '`/leaderboard` — Server rankings\n'
                    '`/stats` — Your personal stats\n'
                    '`/stats @user` — Someone else\'s stats\n'
                    '`/sections` — Available exam sections'
                ),
                inline=False,
            )

            embed.add_field(
                name='How It Works',
                value=(
                    '1️⃣ Use `/quiz` to get a question\n'
                    '2️⃣ React with 🇦 🇧 🇨 or 🇩 to answer\n'
                    f'3️⃣ Answer is revealed after {ANSWER_REVEAL_DELAY} seconds\n'
                    '4️⃣ Correct answers boost your leaderboard rank!'
                ),
                inline=False,
            )

            embed.add_field(
                name='Full Exam Prep',
                value=config['invite_prompt'] + f'\n🎯 **14-day free trial** → {config["url"]}',
                inline=False,
            )

            embed.set_footer(text=f'Powered by VoraPrep | voraprep.com')
            await interaction.response.send_message(embed=embed)

    # ─── Question Posting ──────────────────────────────────

    async def _post_question_embed(
        self,
        interaction: discord.Interaction,
        question: Question,
        title: Optional[str] = None,
    ) -> Optional[discord.Message]:
        """Create and send a question embed with reaction controls."""

        exam = self.engine.exam_upper
        config = self.config
        section_names = config.get('section_names', {})
        section_display = section_names.get(question.section, question.section)

        embed = discord.Embed(
            title=title or f'{config["emoji"]} {exam} Quiz — {question.section}',
            description=f'**{question.question}**',
            color=int(config['color'], 16),
        )

        # Add options
        options_text = []
        for i, option in enumerate(question.options):
            letter = chr(65 + i)  # A, B, C, D
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
                f'{self.format_difficulty_badge(question.difficulty)} • '
                f'📖 {question.topic}'
            ),
            inline=False,
        )

        embed.set_footer(
            text=f'React to answer! Reveals in {ANSWER_REVEAL_DELAY}s | Powered by VoraPrep'
        )

        message = await interaction.followup.send(embed=embed)

        # Add reaction options
        for emoji in ANSWER_EMOJIS:
            await message.add_reaction(emoji)

        return message

    async def _reveal_after_delay(self, message_id: int, server_id: str):
        """Wait for the answer period, then reveal the correct answer."""
        await asyncio.sleep(ANSWER_REVEAL_DELAY)

        if message_id not in self.active_quizzes:
            return

        quiz = self.active_quizzes.pop(message_id)
        question = quiz.question
        config = self.config

        # Record all answers in leaderboard
        correct_users = []
        wrong_users = []

        for user_id, answer in quiz.answers.items():
            username = quiz.usernames.get(user_id, f'User {user_id[:8]}')
            correct = self.engine.check_answer(question, answer)
            self.engine.record_answer(server_id, user_id, username, question, correct)
            if correct:
                correct_users.append(username)
            else:
                wrong_users.append(username)

        # Build reveal embed
        correct_letter = chr(65 + question.correct_answer)
        correct_emoji = ANSWER_EMOJIS[question.correct_answer]
        correct_text = question.options[question.correct_answer]

        embed = discord.Embed(
            title=f'✅ Answer: {correct_emoji} {correct_letter}. {correct_text}',
            color=0x34a853,  # Green
        )

        # Show who got it right
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
            embed.add_field(
                name='😴 No answers',
                value='Nobody answered this one!',
                inline=False,
            )

        # Truncated explanation as teaser
        explanation = question.explanation
        if len(explanation) > 300:
            teaser = explanation[:297] + '...'
        else:
            teaser = explanation

        embed.add_field(
            name='💡 Quick Explanation',
            value=teaser,
            inline=False,
        )

        # CTA
        embed.add_field(
            name='📚 Want the full explanation + AI Tutor?',
            value=(
                f'Practice {self.engine.get_question_count():,}+ {self.engine.exam_upper} '
                f'questions with adaptive learning and score prediction.\n'
                f'🎯 **Try VoraPrep free for 14 days** → {config["url"]}'
            ),
            inline=False,
        )

        embed.set_footer(text=f'{config["emoji"]} Use /quiz for another question | VoraPrep')

        # Send reveal to the same channel
        try:
            channel = self.bot.get_channel(quiz.channel_id)
            if channel:
                await channel.send(
                    content=f'⏰ Time\'s up! Here\'s the answer:',
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
        """Post the daily question to all configured channels."""
        question = self.engine.get_daily_question()
        config = self.config

        for guild in self.bot.guilds:
            # Look for a channel named "quiz", "study", "exam-prep", or the first text channel
            target_channel = None
            preferred_names = ['quiz', 'study', 'exam-prep', 'voraprep', 'general']
            for name in preferred_names:
                channel = discord.utils.get(guild.text_channels, name=name)
                if channel:
                    target_channel = channel
                    break

            if not target_channel and guild.text_channels:
                # Fall back to first channel we can write to
                for ch in guild.text_channels:
                    if ch.permissions_for(guild.me).send_messages:
                        target_channel = ch
                        break

            if target_channel:
                try:
                    embed = discord.Embed(
                        title=f'📅 {self.engine.exam_upper} Daily Question',
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

                    section_names = config.get('section_names', {})
                    section_display = section_names.get(question.section, question.section)
                    embed.add_field(
                        name='Info',
                        value=(
                            f'📁 {section_display} • '
                            f'{self.format_difficulty_badge(question.difficulty)} • '
                            f'📖 {question.topic}'
                        ),
                        inline=False,
                    )
                    embed.set_footer(
                        text=f'React to answer! Reveals in {ANSWER_REVEAL_DELAY}s | VoraPrep'
                    )

                    message = await target_channel.send(embed=embed)
                    for emoji in ANSWER_EMOJIS:
                        await message.add_reaction(emoji)

                    server_id = str(guild.id)
                    self.active_quizzes[message.id] = ActiveQuiz(
                        question=question,
                        message_id=message.id,
                        channel_id=target_channel.id,
                    )
                    asyncio.create_task(self._reveal_after_delay(message.id, server_id))

                    logger.info(f'Posted daily question to {guild.name}/#{target_channel.name}')
                except Exception as e:
                    logger.error(f'Failed to post daily to {guild.name}: {e}')

    # ─── Adapter Interface ─────────────────────────────────

    async def start(self):
        """Start the Discord bot."""
        await self.bot.start(self.token)

    async def stop(self):
        """Stop the Discord bot gracefully."""
        await self.bot.close()

    async def post_question(self, channel_id: str, question: Question) -> str:
        channel = self.bot.get_channel(int(channel_id))
        if not channel:
            raise ValueError(f'Channel {channel_id} not found')
        # Simplified for adapter interface
        embed = discord.Embed(title=question.question)
        msg = await channel.send(embed=embed)
        return str(msg.id)

    async def reveal_answer(self, channel_id, message_id, question, answers):
        # Handled by _reveal_after_delay
        pass

    async def post_leaderboard(self, channel_id: str, server_id: str):
        channel = self.bot.get_channel(int(channel_id))
        if not channel:
            return
        # Handled by slash command
        pass
