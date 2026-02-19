"""
Telegram Adapter for VoraPrep Quiz Engine

Renders quiz engine output as Telegram messages with inline keyboards
for answer selection. Supports both group and private chats.

Commands:
  /quiz                   — Random quiz question
  /quiz_FAR               — Question from a specific section
  /daily                  — Question of the day
  /leaderboard            — Group leaderboard
  /stats                  — Your personal stats
  /sections               — List available exam sections
  /help or /start         — How to use the bot
"""

import asyncio
import logging
from datetime import time as dtime
from typing import Dict, Optional

from telegram import (
    Update,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
)
from telegram.ext import (
    Application,
    CommandHandler,
    CallbackQueryHandler,
    ContextTypes,
)

from quiz_engine import QuizEngine, Question, Difficulty, PlatformAdapter

logger = logging.getLogger('voraprep_telegram')

# Answer labels
ANSWER_LABELS = ['A', 'B', 'C', 'D']


class ActiveQuiz:
    """Tracks an active quiz question awaiting answers."""
    def __init__(self, question: Question, chat_id: int, message_id: int):
        self.question = question
        self.chat_id = chat_id
        self.message_id = message_id
        self.answers: Dict[int, int] = {}  # user_id -> answer_index
        self.usernames: Dict[int, str] = {}  # user_id -> display_name
        self.revealed = False


class TelegramAdapter(PlatformAdapter):
    """Telegram implementation of the quiz bot."""

    def __init__(self, engine: QuizEngine, config: dict, token: str):
        super().__init__(engine, config)
        self.token = token
        self.active_quizzes: Dict[str, ActiveQuiz] = {}  # "chat_id:msg_id" -> ActiveQuiz
        self.app: Optional[Application] = None

    def _quiz_key(self, chat_id: int, message_id: int) -> str:
        return f'{chat_id}:{message_id}'

    # ─── Bot Setup ─────────────────────────────────────────

    def _build_app(self) -> Application:
        """Build the Telegram application with all handlers."""
        app = Application.builder().token(self.token).build()
        exam = self.engine.exam_upper
        sections = self.engine.get_sections()

        # Command handlers
        app.add_handler(CommandHandler('start', self._cmd_help))
        app.add_handler(CommandHandler('help', self._cmd_help))
        app.add_handler(CommandHandler('quiz', self._cmd_quiz))
        app.add_handler(CommandHandler('daily', self._cmd_daily))
        app.add_handler(CommandHandler('leaderboard', self._cmd_leaderboard))
        app.add_handler(CommandHandler('stats', self._cmd_stats))
        app.add_handler(CommandHandler('sections', self._cmd_sections))

        # Section-specific quiz commands: /quiz_FAR, /quiz_SEE1, etc.
        for section in sections:
            app.add_handler(CommandHandler(
                f'quiz_{section}',
                self._make_section_handler(section),
            ))

        # Callback query handler for inline button answers
        app.add_handler(CallbackQueryHandler(self._handle_answer, pattern=r'^answer:'))

        return app

    def _make_section_handler(self, section: str):
        """Create a handler for a section-specific quiz command."""
        async def handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
            await self._send_quiz(update, section=section)
        return handler

    # ─── Command Handlers ──────────────────────────────────

    async def _cmd_help(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /start and /help."""
        config = self.config
        exam = self.engine.exam_upper
        sections = self.engine.get_sections()
        section_cmds = ', '.join(f'/quiz_{s}' for s in sections[:4])

        text = (
            f'{config["emoji"]} *{config["name"]} Quiz Bot*\n\n'
            f'{config["description"]}\n\n'
            f'*Commands:*\n'
            f'/quiz — Random practice question\n'
            f'{section_cmds}... — Section-specific\n'
            f'/daily — Question of the day\n'
            f'/leaderboard — Group rankings\n'
            f'/stats — Your personal stats\n'
            f'/sections — Available sections\n\n'
            f'*How it works:*\n'
            f'1️⃣ Use /quiz to get a question\n'
            f'2️⃣ Tap a button to answer\n'
            f'3️⃣ See if you got it right!\n\n'
            f'📚 *Full exam prep:* {config["invite_prompt"]}\n'
            f'🎯 Try VoraPrep free → {config["url"]}'
        )

        await update.message.reply_text(text, parse_mode='Markdown')

    async def _cmd_quiz(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /quiz with optional args."""
        section = None
        difficulty = Difficulty.ANY

        # Parse args: /quiz FAR hard
        if context.args:
            for arg in context.args:
                arg_upper = arg.upper()
                if arg_upper in [s.upper() for s in self.engine.get_sections()]:
                    section = arg_upper
                elif arg.lower() in ['easy', 'medium', 'hard']:
                    difficulty = Difficulty(arg.lower())

        await self._send_quiz(update, section=section, difficulty=difficulty)

    async def _cmd_daily(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /daily."""
        question = self.engine.get_daily_question()
        chat_id = update.effective_chat.id

        text, keyboard = self._format_question(
            question,
            title=f'📅 {self.engine.exam_upper} Question of the Day',
        )

        msg = await update.message.reply_text(
            text,
            parse_mode='Markdown',
            reply_markup=keyboard,
        )

        key = self._quiz_key(chat_id, msg.message_id)
        self.active_quizzes[key] = ActiveQuiz(question, chat_id, msg.message_id)

    async def _cmd_leaderboard(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /leaderboard."""
        chat_id = str(update.effective_chat.id)
        top_users = self.engine.get_leaderboard(chat_id, limit=10)
        exam = self.engine.exam_upper

        if not top_users:
            await update.message.reply_text(
                f'📊 No quiz activity yet! Use /quiz to get started.'
            )
            return

        medals = ['🥇', '🥈', '🥉']
        lines = [f'🏆 *{exam} Leaderboard*\n']

        for i, user in enumerate(top_users):
            medal = medals[i] if i < 3 else f'{i+1}.'
            streak = f' 🔥{user.streak}' if user.streak >= 3 else ''
            lines.append(
                f'{medal} *{user.username}* — {user.correct}/{user.total} '
                f'({user.accuracy}%){streak}'
            )

        lines.append(f'\n{self.config["emoji"]} _Powered by VoraPrep_')
        await update.message.reply_text('\n'.join(lines), parse_mode='Markdown')

    async def _cmd_stats(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /stats."""
        user = update.effective_user
        chat_id = str(update.effective_chat.id)
        stats = self.engine.get_user_stats(chat_id, str(user.id))
        exam = self.engine.exam_upper

        if not stats:
            await update.message.reply_text(
                f'📊 You haven\'t answered any questions yet! Use /quiz to start.'
            )
            return

        lines = [
            f'📊 *{user.first_name}\'s {exam} Stats*\n',
            f'✅ *{stats.correct}* / {stats.total} correct ({stats.accuracy}%)',
            f'🔥 Current streak: *{stats.streak}*',
            f'⭐ Best streak: *{stats.best_streak}*',
        ]

        # Section breakdown
        if stats.by_section:
            lines.append('\n*By Section:*')
            section_names = self.config.get('section_names', {})
            for sec, s in sorted(stats.by_section.items()):
                acc = round(s['correct'] / max(s['total'], 1) * 100)
                name = section_names.get(sec, sec)
                lines.append(f'  `{sec}` {name}: {s["correct"]}/{s["total"]} ({acc}%)')

        # Difficulty breakdown
        if stats.by_difficulty:
            lines.append('\n*By Difficulty:*')
            badges = {'easy': '🟢', 'medium': '🟡', 'hard': '🔴'}
            for diff in ['easy', 'medium', 'hard']:
                if diff in stats.by_difficulty:
                    d = stats.by_difficulty[diff]
                    acc = round(d['correct'] / max(d['total'], 1) * 100)
                    lines.append(f'  {badges.get(diff, "")} {diff.title()}: {d["correct"]}/{d["total"]} ({acc}%)')

        lines.append(f'\n📚 Full practice → {self.config["url"]}')
        await update.message.reply_text('\n'.join(lines), parse_mode='Markdown')

    async def _cmd_sections(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /sections."""
        section_names = self.config.get('section_names', {})
        exam = self.engine.exam_upper

        lines = [f'{self.config["emoji"]} *{exam} Sections*\n']
        for sec in self.engine.get_sections():
            count = self.engine.get_question_count(sec)
            name = section_names.get(sec, sec)
            lines.append(f'  `{sec}` — {name} ({count} questions)')

        lines.append(f'\nUse /quiz\\_SECTION to practice (e.g. /quiz\\_{self.engine.get_sections()[0]})')
        await update.message.reply_text('\n'.join(lines), parse_mode='Markdown')

    # ─── Quiz Logic ────────────────────────────────────────

    async def _send_quiz(
        self,
        update: Update,
        section: Optional[str] = None,
        difficulty: Difficulty = Difficulty.ANY,
    ):
        """Send a quiz question with inline keyboard."""
        chat_id = update.effective_chat.id
        server_id = str(chat_id)

        question = self.engine.get_random_question(
            section=section,
            difficulty=difficulty,
            server_id=server_id,
        )

        if not question:
            await update.message.reply_text(
                '❌ No questions found for those filters. Use /sections to see available sections.'
            )
            return

        text, keyboard = self._format_question(question)

        msg = await update.message.reply_text(
            text,
            parse_mode='Markdown',
            reply_markup=keyboard,
        )

        key = self._quiz_key(chat_id, msg.message_id)
        self.active_quizzes[key] = ActiveQuiz(question, chat_id, msg.message_id)

    def _format_question(
        self,
        question: Question,
        title: Optional[str] = None,
    ) -> tuple:
        """Format a question as Markdown text + inline keyboard."""
        config = self.config
        exam = self.engine.exam_upper
        section_names = config.get('section_names', {})
        section_display = section_names.get(question.section, question.section)

        header = title or f'{config["emoji"]} *{exam} Quiz — {question.section}*'
        diff_badge = self.format_difficulty_badge(question.difficulty)

        lines = [
            header,
            '',
            f'*{question.question}*',
            '',
        ]

        # Add options as text
        for i, option in enumerate(question.options):
            letter = ANSWER_LABELS[i]
            lines.append(f'*{letter}.* {option}')

        lines.extend([
            '',
            f'📁 {section_display} • {diff_badge}',
            f'📖 {question.topic}',
            '',
            '_Tap a button below to answer!_',
        ])

        text = '\n'.join(lines)

        # Inline keyboard with answer buttons
        buttons = [
            InlineKeyboardButton(
                f'{ANSWER_LABELS[i]}',
                callback_data=f'answer:{question.id}:{i}',
            )
            for i in range(len(question.options))
        ]
        keyboard = InlineKeyboardMarkup([buttons])

        return text, keyboard

    async def _handle_answer(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle inline button presses for answers."""
        query = update.callback_query
        await query.answer()  # Acknowledge the button press

        # Parse callback data: answer:question_id:answer_index
        parts = query.data.split(':')
        if len(parts) != 3:
            return

        _, question_id, answer_str = parts
        answer_index = int(answer_str)
        user = query.from_user
        chat_id = query.message.chat_id
        message_id = query.message.message_id

        key = self._quiz_key(chat_id, message_id)
        quiz = self.active_quizzes.get(key)

        if not quiz or quiz.revealed:
            # Quiz already finished
            await query.answer('⏰ This quiz has already ended!', show_alert=True)
            return

        user_id = user.id

        # Only count first answer per user
        if user_id in quiz.answers:
            await query.answer('You already answered!', show_alert=True)
            return

        quiz.answers[user_id] = answer_index
        quiz.usernames[user_id] = user.first_name or f'User {user_id}'

        # Check answer immediately for the user (private feedback)
        correct = self.engine.check_answer(quiz.question, answer_index)
        correct_letter = ANSWER_LABELS[quiz.question.correct_answer]

        # Record in leaderboard
        server_id = str(chat_id)
        username = user.first_name or f'User {user_id}'
        self.engine.record_answer(server_id, str(user_id), username, quiz.question, correct)

        if correct:
            stats = self.engine.get_user_stats(server_id, str(user_id))
            streak_msg = f' 🔥 Streak: {stats.streak}!' if stats and stats.streak >= 2 else ''
            feedback = f'✅ Correct!{streak_msg}'
        else:
            feedback = f'❌ Wrong! The answer was {correct_letter}.'

        # Show truncated explanation
        explanation = quiz.question.explanation
        if len(explanation) > 200:
            explanation = explanation[:197] + '...'

        feedback += f'\n\n💡 {explanation}'
        feedback += f'\n\n📚 Full explanations at {self.config["url"]}'

        await query.answer(feedback[:200], show_alert=True)

        # Update the message to show who answered
        num_answers = len(quiz.answers)
        if num_answers >= 1:
            # After first answer, update message footer
            original_text = query.message.text
            if original_text and '_Tap a button below' in original_text:
                new_text = original_text.replace(
                    '_Tap a button below to answer!_',
                    f'_👥 {num_answers} answer(s) so far_'
                )
                try:
                    await query.message.edit_text(
                        new_text,
                        parse_mode='Markdown',
                        reply_markup=query.message.reply_markup,
                    )
                except Exception:
                    pass  # Message might be unchanged

    # ─── Adapter Interface ─────────────────────────────────

    async def start(self):
        """Start the Telegram bot."""
        self.app = self._build_app()
        logger.info(f'🤖 Starting {self.config["name"]} bot on Telegram...')
        logger.info(f'   {self.engine.get_question_count()} questions loaded')

        # Run polling (blocking)
        await self.app.initialize()
        await self.app.start()
        await self.app.updater.start_polling(drop_pending_updates=True)
        logger.info(f'✅ {self.config["name"]} Telegram bot is running!')

        # Keep running until stopped
        stop_event = asyncio.Event()
        await stop_event.wait()

    async def stop(self):
        """Stop the Telegram bot."""
        if self.app:
            await self.app.updater.stop()
            await self.app.stop()
            await self.app.shutdown()

    async def post_question(self, channel_id: str, question: Question) -> str:
        """Post a question to a chat."""
        text, keyboard = self._format_question(question)
        msg = await self.app.bot.send_message(
            chat_id=int(channel_id),
            text=text,
            parse_mode='Markdown',
            reply_markup=keyboard,
        )
        return str(msg.message_id)

    async def reveal_answer(self, channel_id, message_id, question, answers):
        """Reveal handled inline via callback."""
        pass

    async def post_leaderboard(self, channel_id: str, server_id: str):
        """Post leaderboard to a chat."""
        top_users = self.engine.get_leaderboard(server_id, limit=10)
        if not top_users:
            await self.app.bot.send_message(
                chat_id=int(channel_id),
                text='📊 No quiz activity yet!',
            )
            return

        medals = ['🥇', '🥈', '🥉']
        lines = [f'🏆 *{self.engine.exam_upper} Leaderboard*\n']
        for i, user in enumerate(top_users):
            medal = medals[i] if i < 3 else f'{i+1}.'
            lines.append(f'{medal} *{user.username}* — {user.correct}/{user.total} ({user.accuracy}%)')

        await self.app.bot.send_message(
            chat_id=int(channel_id),
            text='\n'.join(lines),
            parse_mode='Markdown',
        )
