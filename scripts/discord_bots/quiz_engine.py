"""
VoraPrep Quiz Engine — Platform-Agnostic Core

This is the brain of the quiz bot system. It handles:
- Question loading and selection
- Answer validation
- Leaderboard tracking
- Daily question scheduling
- Stats and analytics

Platform adapters (Discord, Slack, Telegram, etc.) call this engine
and render the results in their native format.
"""

import json
import os
import random
import hashlib
from abc import ABC, abstractmethod
from datetime import datetime, date
from typing import Dict, List, Optional, Tuple, Any
from dataclasses import dataclass, field, asdict
from enum import Enum

# ─── Data Models ────────────────────────────────────────────────

@dataclass
class Question:
    id: str
    exam: str
    section: str
    topic: str
    difficulty: str
    question: str
    options: List[str]
    correct_answer: int  # 0-indexed
    explanation: str


@dataclass
class QuizResult:
    question: Question
    user_id: str
    username: str
    server_id: str
    answered_correctly: bool
    user_answer: Optional[int]  # 0-indexed, None if timed out
    time_taken_seconds: float
    timestamp: str = field(default_factory=lambda: datetime.now().isoformat())


@dataclass
class UserStats:
    user_id: str
    username: str
    correct: int = 0
    total: int = 0
    streak: int = 0
    best_streak: int = 0
    last_answer: Optional[str] = None
    joined: str = field(default_factory=lambda: datetime.now().isoformat())
    by_section: Dict[str, Dict[str, int]] = field(default_factory=dict)
    by_difficulty: Dict[str, Dict[str, int]] = field(default_factory=dict)

    @property
    def accuracy(self) -> float:
        return round(self.correct / max(self.total, 1) * 100, 1)


class Difficulty(Enum):
    EASY = 'easy'
    MEDIUM = 'medium'
    HARD = 'hard'
    ANY = 'any'


# ─── Quiz Engine ────────────────────────────────────────────────

class QuizEngine:
    """
    Platform-agnostic quiz engine. Manages questions, answers, and leaderboards
    for a single exam type (CPA, EA, CMA, CIA, CISA, CFP).
    """

    def __init__(self, exam: str, data_dir: str = None):
        self.exam = exam.lower()
        self.exam_upper = exam.upper()
        self.data_dir = data_dir or os.path.join(os.path.dirname(__file__), 'data')
        self.leaderboard_dir = os.path.join(os.path.dirname(__file__), 'leaderboards')

        os.makedirs(self.leaderboard_dir, exist_ok=True)

        self.questions: List[Question] = []
        self.leaderboard: Dict[str, Dict[str, UserStats]] = {}  # server_id -> user_id -> stats
        self._used_questions: Dict[str, set] = {}  # server_id -> set of question IDs used today
        self._daily_question_cache: Dict[str, Question] = {}  # date_str -> daily question

        self._load_questions()
        self._load_leaderboard()

    # ─── Question Management ───────────────────────────────

    def _load_questions(self):
        """Load questions from JSON file."""
        filepath = os.path.join(self.data_dir, f'{self.exam}_questions.json')
        if not os.path.exists(filepath):
            raise FileNotFoundError(f'Question file not found: {filepath}')

        with open(filepath, 'r') as f:
            data = json.load(f)

        self.questions = [
            Question(
                id=q['id'],
                exam=q['exam'],
                section=q['section'],
                topic=q['topic'],
                difficulty=q['difficulty'],
                question=q['question'],
                options=q['options'],
                correct_answer=q['correctAnswer'],
                explanation=q['explanation'],
            )
            for q in data
        ]

    def get_random_question(
        self,
        section: Optional[str] = None,
        difficulty: Difficulty = Difficulty.ANY,
        server_id: str = 'default',
        avoid_repeats: bool = True,
    ) -> Optional[Question]:
        """Get a random question, optionally filtered by section/difficulty."""
        pool = self.questions

        if section:
            pool = [q for q in pool if q.section.upper() == section.upper()]

        if difficulty != Difficulty.ANY:
            pool = [q for q in pool if q.difficulty == difficulty.value]

        # Avoid recently used questions in this server
        if avoid_repeats and server_id in self._used_questions:
            used = self._used_questions[server_id]
            unused = [q for q in pool if q.id not in used]
            if unused:
                pool = unused
            else:
                # All questions used — reset
                self._used_questions[server_id] = set()

        if not pool:
            return None

        question = random.choice(pool)

        # Track usage
        if server_id not in self._used_questions:
            self._used_questions[server_id] = set()
        self._used_questions[server_id].add(question.id)

        return question

    def get_daily_question(self) -> Question:
        """
        Get the question of the day. Deterministic — same question for all
        servers on the same day, changes daily.
        """
        today = date.today().isoformat()

        if today in self._daily_question_cache:
            return self._daily_question_cache[today]

        # Use date + exam as seed for deterministic selection
        seed = hashlib.md5(f'{today}-{self.exam}'.encode()).hexdigest()
        index = int(seed, 16) % len(self.questions)
        question = self.questions[index]

        self._daily_question_cache[today] = question
        return question

    def check_answer(self, question: Question, user_answer: int) -> bool:
        """Check if the user's answer is correct (0-indexed)."""
        return user_answer == question.correct_answer

    def get_sections(self) -> List[str]:
        """Get all available sections for this exam."""
        return sorted(set(q.section for q in self.questions))

    def get_question_count(self, section: Optional[str] = None) -> int:
        """Get total question count, optionally by section."""
        if section:
            return len([q for q in self.questions if q.section.upper() == section.upper()])
        return len(self.questions)

    # ─── Leaderboard Management ────────────────────────────

    def _leaderboard_path(self) -> str:
        return os.path.join(self.leaderboard_dir, f'{self.exam}_leaderboard.json')

    def _load_leaderboard(self):
        """Load leaderboard from disk."""
        path = self._leaderboard_path()
        if os.path.exists(path):
            with open(path, 'r') as f:
                data = json.load(f)
            for server_id, users in data.items():
                self.leaderboard[server_id] = {}
                for user_id, stats in users.items():
                    self.leaderboard[server_id][user_id] = UserStats(
                        user_id=user_id,
                        username=stats.get('username', 'Unknown'),
                        correct=stats.get('correct', 0),
                        total=stats.get('total', 0),
                        streak=stats.get('streak', 0),
                        best_streak=stats.get('best_streak', 0),
                        last_answer=stats.get('last_answer'),
                        joined=stats.get('joined', datetime.now().isoformat()),
                        by_section=stats.get('by_section', {}),
                        by_difficulty=stats.get('by_difficulty', {}),
                    )

    def _save_leaderboard(self):
        """Persist leaderboard to disk."""
        data = {}
        for server_id, users in self.leaderboard.items():
            data[server_id] = {}
            for user_id, stats in users.items():
                data[server_id][user_id] = asdict(stats)

        with open(self._leaderboard_path(), 'w') as f:
            json.dump(data, f, indent=2)

    def record_answer(
        self,
        server_id: str,
        user_id: str,
        username: str,
        question: Question,
        correct: bool,
    ) -> UserStats:
        """Record a user's answer and return updated stats."""
        if server_id not in self.leaderboard:
            self.leaderboard[server_id] = {}

        if user_id not in self.leaderboard[server_id]:
            self.leaderboard[server_id][user_id] = UserStats(
                user_id=user_id,
                username=username,
            )

        stats = self.leaderboard[server_id][user_id]
        stats.username = username  # Update in case it changed
        stats.total += 1
        stats.last_answer = datetime.now().isoformat()

        if correct:
            stats.correct += 1
            stats.streak += 1
            if stats.streak > stats.best_streak:
                stats.best_streak = stats.streak
        else:
            stats.streak = 0

        # Track by section
        section = question.section
        if section not in stats.by_section:
            stats.by_section[section] = {'correct': 0, 'total': 0}
        stats.by_section[section]['total'] += 1
        if correct:
            stats.by_section[section]['correct'] += 1

        # Track by difficulty
        diff = question.difficulty
        if diff not in stats.by_difficulty:
            stats.by_difficulty[diff] = {'correct': 0, 'total': 0}
        stats.by_difficulty[diff]['total'] += 1
        if correct:
            stats.by_difficulty[diff]['correct'] += 1

        self._save_leaderboard()
        return stats

    def get_leaderboard(self, server_id: str, limit: int = 10) -> List[UserStats]:
        """Get top users by correct answers for a server."""
        if server_id not in self.leaderboard:
            return []

        users = list(self.leaderboard[server_id].values())
        users.sort(key=lambda u: (u.correct, u.accuracy, u.best_streak), reverse=True)
        return users[:limit]

    def get_user_stats(self, server_id: str, user_id: str) -> Optional[UserStats]:
        """Get stats for a specific user."""
        if server_id in self.leaderboard and user_id in self.leaderboard[server_id]:
            return self.leaderboard[server_id][user_id]
        return None

    def get_global_stats(self) -> Dict[str, Any]:
        """Aggregate stats across all servers."""
        total_servers = len(self.leaderboard)
        total_users = sum(len(users) for users in self.leaderboard.values())
        total_answers = sum(
            u.total for users in self.leaderboard.values() for u in users.values()
        )
        total_correct = sum(
            u.correct for users in self.leaderboard.values() for u in users.values()
        )
        return {
            'exam': self.exam_upper,
            'servers': total_servers,
            'users': total_users,
            'questions_available': len(self.questions),
            'total_answers': total_answers,
            'total_correct': total_correct,
            'accuracy': round(total_correct / max(total_answers, 1) * 100, 1),
        }


# ─── Platform Adapter Interface ────────────────────────────────

class PlatformAdapter(ABC):
    """
    Abstract base class for platform adapters.
    Each platform (Discord, Slack, Telegram) implements this interface.
    """

    def __init__(self, engine: QuizEngine, config: Dict[str, Any]):
        self.engine = engine
        self.config = config

    @abstractmethod
    async def start(self):
        """Start the bot on this platform."""
        pass

    @abstractmethod
    async def stop(self):
        """Stop the bot gracefully."""
        pass

    @abstractmethod
    async def post_question(self, channel_id: str, question: Question) -> str:
        """Post a question to a channel. Returns message ID."""
        pass

    @abstractmethod
    async def reveal_answer(self, channel_id: str, message_id: str, question: Question, answers: Dict[str, int]):
        """Reveal the answer after voting period ends."""
        pass

    @abstractmethod
    async def post_leaderboard(self, channel_id: str, server_id: str):
        """Post the leaderboard to a channel."""
        pass

    def format_difficulty_badge(self, difficulty: str) -> str:
        """Format difficulty as a visual badge."""
        badges = {
            'easy': '🟢 Easy',
            'medium': '🟡 Medium',
            'hard': '🔴 Hard',
        }
        return badges.get(difficulty, difficulty)

    def format_answer_letter(self, index: int) -> str:
        """Convert 0-indexed answer to letter."""
        return chr(65 + index)  # A, B, C, D

    def get_voraprep_cta(self) -> str:
        """Get the call-to-action text for VoraPrep."""
        exam = self.engine.exam_upper
        url = self.config.get('url', 'https://voraprep.com')
        return (
            f"📚 Want the full explanation? Practice {self.engine.get_question_count():,}+ "
            f"{exam} questions with AI tutor, score prediction, and adaptive learning.\n"
            f"🎯 **Try VoraPrep free for 14 days** → {url}"
        )
