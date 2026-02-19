"""
Slack Adapter for VoraPrep Quiz Engine (Stub)

This adapter will implement Slack Bolt for posting quizzes to Slack workspaces.
The same quiz engine powers both Discord and Slack bots.

To implement:
  pip install slack-bolt
  Set SLACK_BOT_TOKEN and SLACK_SIGNING_SECRET in .env
  
Slash commands: /quiz, /daily, /leaderboard, /stats

Architecture:
  - Slack Bolt app listens for slash commands
  - Block Kit for rich message formatting (equivalent to Discord embeds)
  - Interactive buttons for answer selection (equivalent to Discord reactions)
  - Scheduled messages for daily questions
"""

from typing import Dict, Any, Optional
from quiz_engine import QuizEngine, Question, PlatformAdapter

import logging
logger = logging.getLogger('voraprep_slack')


class SlackAdapter(PlatformAdapter):
    """
    Slack implementation of the quiz bot.
    
    Uses Slack Bolt framework with Block Kit for rich messages.
    Interactive buttons replace Discord's emoji reactions.
    """

    def __init__(self, engine: QuizEngine, config: dict, bot_token: str, signing_secret: str):
        super().__init__(engine, config)
        self.bot_token = bot_token
        self.signing_secret = signing_secret
        self.app = None  # Will be slack_bolt.App

    async def start(self):
        """Start the Slack bot."""
        try:
            from slack_bolt.async_app import AsyncApp
            from slack_bolt.adapter.socket_mode.async_handler import AsyncSocketModeHandler
        except ImportError:
            logger.error('slack-bolt not installed. Run: pip install slack-bolt')
            return

        self.app = AsyncApp(
            token=self.bot_token,
            signing_secret=self.signing_secret,
        )

        self._register_commands()
        handler = AsyncSocketModeHandler(self.app)
        await handler.start_async()

    async def stop(self):
        """Stop the Slack bot."""
        pass

    def _register_commands(self):
        """Register Slack slash commands and interactions."""
        if not self.app:
            return

        @self.app.command('/quiz')
        async def handle_quiz(ack, respond, command):
            await ack()
            question = self.engine.get_random_question(
                server_id=command['team_id']
            )
            if question:
                blocks = self._build_question_blocks(question)
                await respond(blocks=blocks)

        @self.app.command('/daily')
        async def handle_daily(ack, respond, command):
            await ack()
            question = self.engine.get_daily_question()
            blocks = self._build_question_blocks(question, title='📅 Daily Question')
            await respond(blocks=blocks)

        @self.app.command('/leaderboard')
        async def handle_leaderboard(ack, respond, command):
            await ack()
            top = self.engine.get_leaderboard(command['team_id'])
            if not top:
                await respond(text='No quiz activity yet! Use /quiz to start.')
                return
            blocks = self._build_leaderboard_blocks(top)
            await respond(blocks=blocks)

        @self.app.action('quiz_answer')
        async def handle_answer(ack, body, respond):
            await ack()
            # Parse answer from action value
            # Record in leaderboard
            # Respond with result

    def _build_question_blocks(self, question: Question, title: str = None) -> list:
        """Build Slack Block Kit blocks for a question."""
        exam = self.engine.exam_upper
        title = title or f'{self.config["emoji"]} {exam} Quiz'

        blocks = [
            {
                'type': 'header',
                'text': {'type': 'plain_text', 'text': title}
            },
            {
                'type': 'section',
                'text': {'type': 'mrkdwn', 'text': f'*{question.question}*'}
            },
            {'type': 'divider'},
        ]

        # Answer buttons
        elements = []
        for i, option in enumerate(question.options):
            letter = chr(65 + i)
            elements.append({
                'type': 'button',
                'text': {'type': 'plain_text', 'text': f'{letter}. {option[:70]}'},
                'action_id': 'quiz_answer',
                'value': f'{question.id}|{i}',
            })

        blocks.append({
            'type': 'actions',
            'elements': elements,
        })

        blocks.append({
            'type': 'context',
            'elements': [
                {'type': 'mrkdwn', 'text': (
                    f'📁 {question.section} • '
                    f'{self.format_difficulty_badge(question.difficulty)} • '
                    f'📖 {question.topic} • '
                    f'Powered by <{self.config["url"]}|VoraPrep>'
                )}
            ]
        })

        return blocks

    def _build_leaderboard_blocks(self, users) -> list:
        """Build Slack Block Kit blocks for leaderboard."""
        exam = self.engine.exam_upper
        blocks = [
            {
                'type': 'header',
                'text': {'type': 'plain_text', 'text': f'🏆 {exam} Leaderboard'}
            },
        ]

        medals = ['🥇', '🥈', '🥉']
        lines = []
        for i, user in enumerate(users):
            medal = medals[i] if i < 3 else f'{i+1}.'
            lines.append(
                f'{medal} *{user.username}* — {user.correct}/{user.total} ({user.accuracy}%)'
            )

        blocks.append({
            'type': 'section',
            'text': {'type': 'mrkdwn', 'text': '\n'.join(lines)}
        })

        return blocks

    async def post_question(self, channel_id: str, question: Question) -> str:
        """Post a question to a Slack channel."""
        if not self.app:
            raise RuntimeError('Slack app not initialized')
        blocks = self._build_question_blocks(question)
        result = await self.app.client.chat_postMessage(
            channel=channel_id,
            blocks=blocks,
            text=question.question,
        )
        return result['ts']

    async def reveal_answer(self, channel_id, message_id, question, answers):
        pass

    async def post_leaderboard(self, channel_id: str, server_id: str):
        pass
