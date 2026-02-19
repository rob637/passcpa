"""
Leaderboard tracking for Discord quiz bots.
Per-server, per-exam leaderboard stored in JSON.
"""

import json
import os
from datetime import datetime
from typing import Dict, List, Optional, Tuple

LEADERBOARD_DIR = os.path.join(os.path.dirname(__file__), 'leaderboards')


class Leaderboard:
    """Per-server leaderboard for a specific exam bot."""

    def __init__(self, exam: str):
        self.exam = exam.lower()
        os.makedirs(LEADERBOARD_DIR, exist_ok=True)
        self.filepath = os.path.join(LEADERBOARD_DIR, f'{self.exam}_leaderboard.json')
        self.data = self._load()

    def _load(self) -> dict:
        if os.path.exists(self.filepath):
            with open(self.filepath, 'r') as f:
                return json.load(f)
        return {}

    def _save(self):
        with open(self.filepath, 'w') as f:
            json.dump(self.data, f, indent=2)

    def _ensure_server(self, server_id: str):
        if server_id not in self.data:
            self.data[server_id] = {}

    def _ensure_user(self, server_id: str, user_id: str, username: str):
        self._ensure_server(server_id)
        if user_id not in self.data[server_id]:
            self.data[server_id][user_id] = {
                'username': username,
                'correct': 0,
                'total': 0,
                'streak': 0,
                'best_streak': 0,
                'last_answer': None,
                'joined': datetime.now().isoformat(),
            }
        else:
            # Update username in case it changed
            self.data[server_id][user_id]['username'] = username

    def record_answer(self, server_id: str, user_id: str, username: str, correct: bool):
        """Record a user's answer and update their stats."""
        self._ensure_user(server_id, user_id, username)
        user = self.data[server_id][user_id]

        user['total'] += 1
        user['last_answer'] = datetime.now().isoformat()

        if correct:
            user['correct'] += 1
            user['streak'] += 1
            if user['streak'] > user['best_streak']:
                user['best_streak'] = user['streak']
        else:
            user['streak'] = 0

        self._save()

    def get_user_stats(self, server_id: str, user_id: str) -> Optional[dict]:
        """Get stats for a specific user in a server."""
        if server_id in self.data and user_id in self.data[server_id]:
            return self.data[server_id][user_id]
        return None

    def get_top(self, server_id: str, limit: int = 10) -> List[Tuple[str, dict]]:
        """Get top N users by correct answers for a server."""
        if server_id not in self.data:
            return []

        users = list(self.data[server_id].items())
        # Sort by correct answers (desc), then by accuracy (desc)
        users.sort(key=lambda x: (
            x[1]['correct'],
            x[1]['correct'] / max(x[1]['total'], 1),
            x[1]['best_streak']
        ), reverse=True)

        return users[:limit]

    def get_global_stats(self) -> dict:
        """Get aggregate stats across all servers."""
        total_servers = len(self.data)
        total_users = sum(len(users) for users in self.data.values())
        total_answers = sum(
            user['total']
            for users in self.data.values()
            for user in users.values()
        )
        total_correct = sum(
            user['correct']
            for users in self.data.values()
            for user in users.values()
        )
        return {
            'servers': total_servers,
            'users': total_users,
            'total_answers': total_answers,
            'total_correct': total_correct,
            'accuracy': round(total_correct / max(total_answers, 1) * 100, 1),
        }
