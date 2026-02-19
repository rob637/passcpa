#!/usr/bin/env python3
"""
Multi-Platform Opportunity Finder for VoraPrep
==============================================

Monitors multiple platforms for people asking about exam prep software 
(CPA, EA, CMA, CIA, CISA, CFP). Sends email notifications with links 
and AI-generated suggested responses.

Supported Platforms:
    - Reddit (via PRAW API) ✅ Ready
    - Twitter/X (via API v2) ✅ Ready  
    - LinkedIn (manual export) 🔜 Planned
    - Quora (web scraping) 🔜 Planned
    - Discord (bot API) 🔜 Planned

Usage:
    python reddit_opportunity_finder.py                      # Run all platforms once
    python reddit_opportunity_finder.py --platform reddit    # Run Reddit only
    python reddit_opportunity_finder.py --platform twitter   # Run Twitter only
    python reddit_opportunity_finder.py --daemon             # Run continuously
    python reddit_opportunity_finder.py --test               # Test mode (no emails)

Requirements:
    pip install praw tweepy google-generativeai requests python-dotenv

Environment Variables (in .env):
    # Reddit
    REDDIT_CLIENT_ID=your_client_id
    REDDIT_CLIENT_SECRET=your_client_secret
    REDDIT_USER_AGENT=VoraPrepOpportunityFinder/1.0
    
    # Twitter/X (optional)
    TWITTER_BEARER_TOKEN=your_bearer_token
    
    # Notifications
    GEMINI_API_KEY=your_gemini_key
    RESEND_API_KEY=your_resend_key
    NOTIFICATION_EMAIL=your@email.com
"""

import os
import json
import time
import hashlib
import argparse
from abc import ABC, abstractmethod
from datetime import datetime, timedelta
from pathlib import Path
from typing import Optional, List, Dict
from dataclasses import dataclass, asdict

import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# ============================================================================
# DATA STRUCTURES
# ============================================================================

@dataclass
class Opportunity:
    """Standardized opportunity across all platforms."""
    id: str
    platform: str           # 'reddit', 'twitter', 'linkedin', etc.
    type: str               # 'post', 'comment', 'tweet', 'reply'
    title: str
    text: str
    url: str
    author: str
    created: str            # ISO format
    score: int              # upvotes, likes, etc.
    exams: List[str]        # Detected exam types
    extra: Dict = None      # Platform-specific data
    
    def to_dict(self) -> dict:
        return asdict(self)

# ============================================================================
# SHARED CONFIGURATION
# ============================================================================

# Keywords that indicate someone is looking for exam prep help
OPPORTUNITY_KEYWORDS = [
    # General study material questions
    "study material",
    "review course", 
    "study course",
    "exam prep",
    "exam preparation",
    "study guide",
    "which course",
    "course recommendation",
    "recommend a course",
    "best course",
    "best study",
    "affordable course",
    "cheap course",
    "budget course",
    "free resources",
    
    # Comparison/alternative seeking
    "becker alternative",
    "becker vs",
    "gleim vs",
    "surgent vs",
    "roger vs",
    "wiley vs",
    "ninja vs",
    "alternative to becker",
    "cheaper than becker",
    "instead of becker",
    "switching from becker",
    "can't afford becker",
    "too expensive",
    
    # Specific exam prep questions
    "how to study for",
    "how to pass",
    "studying for cpa",
    "studying for ea",
    "studying for cma",
    "studying for cia",
    "studying for cisa",
    "studying for cfp",
    "preparing for cpa",
    "preparing for the exam",
    "first time candidate",
    "retaking the exam",
    "failed the exam",
    "need to pass",
    
    # Feature-specific
    "adaptive learning",
    "practice questions",
    "mcq practice",
    "simulation practice",
    "tbs practice",
    "flashcards for",
    "ai tutor",
    "score predictor",
    
    # Frustration with current tools
    "hate becker",
    "becker not working",
    "looking for something else",
    "any other options",
    "what else is there",
]

# Keywords to EXCLUDE (people selling, affiliates, etc.)
EXCLUDE_KEYWORDS = [
    "affiliate",
    "sponsored",
    "discount code",
    "promo code",
    "i work for",
    "i'm a rep",
    "selling my",
]

# Exam-specific context for response generation
EXAM_CONTEXT = {
    "cpa": "CPA (Certified Public Accountant) exam - FAR, AUD, REG, and discipline sections",
    "ea": "EA (Enrolled Agent) exam - SEE1, SEE2, SEE3 for IRS practice rights",
    "cma": "CMA (Certified Management Accountant) exam - management accounting",
    "cia": "CIA (Certified Internal Auditor) exam - internal audit profession",
    "cisa": "CISA (Certified Information Systems Auditor) exam - IS audit and security",
    "cfp": "CFP (Certified Financial Planner) exam - comprehensive financial planning",
}

# File to track already-seen posts (shared across platforms)
SEEN_POSTS_FILE = Path(__file__).parent / "seen_posts.json"

# ============================================================================
# BASE PLATFORM ADAPTER
# ============================================================================

class PlatformAdapter(ABC):
    """Base class for platform-specific adapters."""
    
    name: str = "unknown"
    
    @abstractmethod
    def is_configured(self) -> bool:
        """Check if this platform's API credentials are configured."""
        pass
    
    @abstractmethod
    def find_opportunities(self, seen_posts: set, limit: int = 100) -> List[Opportunity]:
        """Find opportunities on this platform."""
        pass
    
    def matches_opportunity(self, text: str) -> bool:
        """Check if text contains opportunity keywords and no exclusions."""
        text_lower = text.lower()
        
        # Check for exclusions first
        if any(excl in text_lower for excl in EXCLUDE_KEYWORDS):
            return False
        
        # Check for opportunity keywords
        return any(kw in text_lower for kw in OPPORTUNITY_KEYWORDS)
    
    def detect_exam_type(self, text: str) -> List[str]:
        """Detect which exam(s) the text is about."""
        text_lower = text.lower()
        exams = []
        
        exam_indicators = {
            "cpa": ["cpa", "far ", "aud ", "reg ", "bec ", "bar ", "isc ", "tcp ", 
                    "certified public accountant"],
            "ea": ["enrolled agent", " ea ", "see1", "see2", "see3", "irs exam"],
            "cma": ["cma", "certified management accountant", "management accounting"],
            "cia": ["cia", "internal audit", "certified internal auditor"],
            "cisa": ["cisa", "information systems audit", "isaca"],
            "cfp": ["cfp", "financial planner", "certified financial planner"],
        }
        
        for exam, indicators in exam_indicators.items():
            if any(ind in text_lower for ind in indicators):
                exams.append(exam)
        
        return exams if exams else ["general"]

# ============================================================================
# REDDIT ADAPTER (RSS FEEDS - NO API KEY NEEDED)
# ============================================================================

class RedditAdapter(PlatformAdapter):
    """Reddit platform adapter using public RSS feeds.
    
    No API key required! Uses Reddit's public RSS endpoints:
    - https://reddit.com/r/{subreddit}/new.rss
    - https://reddit.com/r/{subreddit}/comments.rss
    """
    
    name = "reddit"
    
    # Subreddits to monitor
    SUBREDDITS = [
        "CPA",
        "Accounting", 
        "CFP",
        "FinancialPlanning",
        "InternalAudit",
        "cybersecurity",      # For CISA
        "taxpros",            # For EA
        "cpa_exam",
        "AccountingStudents",
    ]
    
    def __init__(self):
        try:
            import feedparser
            self._feedparser = feedparser
        except ImportError:
            print("  ⚠️  feedparser not installed. Run: pip install feedparser")
            self._feedparser = None
    
    def is_configured(self) -> bool:
        # RSS feeds are always available - no API key needed!
        return self._feedparser is not None
    
    def _fetch_rss(self, url: str) -> list:
        """Fetch and parse an RSS feed."""
        try:
            # Add user agent to avoid being blocked
            headers = {'User-Agent': 'VoraPrepOpportunityFinder/1.0 (exam prep monitoring)'}
            resp = requests.get(url, headers=headers, timeout=10)
            
            if resp.status_code != 200:
                return []
            
            feed = self._feedparser.parse(resp.content)
            return feed.entries
        except Exception as e:
            print(f"  ⚠️  Error fetching {url}: {e}")
            return []
    
    def _extract_post_id(self, entry) -> str:
        """Extract Reddit post ID from RSS entry."""
        # RSS id is like "t3_xxxxx" or a URL
        if hasattr(entry, 'id'):
            entry_id = entry.id
            if 'reddit.com' in entry_id:
                # Extract from URL: .../comments/xxxxx/...
                parts = entry_id.split('/comments/')
                if len(parts) > 1:
                    return parts[1].split('/')[0]
            elif entry_id.startswith('t3_'):
                return entry_id[3:]
            elif entry_id.startswith('t1_'):
                return entry_id[3:]
        # Fallback: hash the link
        return hashlib.md5(entry.link.encode()).hexdigest()[:12]
    
    def _clean_html(self, text: str) -> str:
        """Remove HTML tags from text."""
        import re
        # Remove HTML tags
        clean = re.sub(r'<[^>]+>', '', text)
        # Decode HTML entities
        clean = clean.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
        clean = clean.replace('&quot;', '"').replace('&#39;', "'")
        clean = clean.replace('&nbsp;', ' ')
        return clean.strip()
    
    def find_opportunities(self, seen_posts: set, limit: int = 100) -> List[Opportunity]:
        if not self.is_configured():
            return []
        
        opportunities = []
        
        for subreddit_name in self.SUBREDDITS:
            # Fetch new posts RSS
            posts_url = f"https://reddit.com/r/{subreddit_name}/new.rss?limit={min(limit, 25)}"
            entries = self._fetch_rss(posts_url)
            
            for entry in entries:
                post_id = self._extract_post_id(entry)
                post_key = f"reddit_{post_id}"
                
                if post_key in seen_posts:
                    continue
                
                title = entry.get('title', '')
                # RSS summary contains the post content in HTML
                summary = self._clean_html(entry.get('summary', ''))
                full_text = f"{title} {summary}"
                
                if self.matches_opportunity(full_text):
                    opportunities.append(Opportunity(
                        id=post_key,
                        platform="reddit",
                        type="post",
                        title=title,
                        text=summary[:500] + "..." if len(summary) > 500 else summary,
                        url=entry.get('link', ''),
                        author=entry.get('author', 'unknown'),
                        created=entry.get('published', datetime.now().isoformat()),
                        score=0,  # RSS doesn't include score
                        exams=self.detect_exam_type(full_text),
                        extra={"subreddit": subreddit_name}
                    ))
            
            # Small delay between subreddits to be nice to Reddit
            time.sleep(0.5)
        
        return opportunities

# ============================================================================
# TWITTER/X ADAPTER
# ============================================================================

class TwitterAdapter(PlatformAdapter):
    """Twitter/X platform adapter using API v2."""
    
    name = "twitter"
    
    # Search queries for Twitter
    SEARCH_QUERIES = [
        # CPA focused
        '"CPA exam" (course OR study OR prep OR becker OR recommend)',
        '"CPA exam" (alternative OR cheaper OR affordable)',
        'studying for CPA -is:retweet',
        'failed CPA exam -is:retweet',
        
        # EA focused  
        '"enrolled agent" exam (study OR course OR prep)',
        '"EA exam" (study OR prep OR material)',
        
        # Other exams
        '"CMA exam" (study OR course OR prep)',
        '"CIA exam" internal audit (study OR prep)',
        '"CISA exam" (study OR course OR prep)',
        '"CFP exam" (study OR course OR prep)',
        
        # General frustration
        'becker alternatives accounting',
        '"hate becker" OR "becker sucks" OR "becker expensive"',
    ]
    
    def __init__(self):
        self._bearer_token = os.getenv("TWITTER_BEARER_TOKEN")
    
    def is_configured(self) -> bool:
        return bool(self._bearer_token)
    
    def find_opportunities(self, seen_posts: set, limit: int = 100) -> List[Opportunity]:
        if not self.is_configured():
            return []
        
        opportunities = []
        headers = {"Authorization": f"Bearer {self._bearer_token}"}
        
        for query in self.SEARCH_QUERIES:
            try:
                # Twitter API v2 recent search
                url = "https://api.twitter.com/2/tweets/search/recent"
                params = {
                    "query": query,
                    "max_results": min(limit, 100),
                    "tweet.fields": "created_at,public_metrics,author_id",
                    "expansions": "author_id",
                    "user.fields": "username",
                }
                
                resp = requests.get(url, headers=headers, params=params)
                
                if resp.status_code == 429:
                    print("  ⚠️  Twitter rate limit hit, waiting...")
                    time.sleep(60)
                    continue
                    
                if resp.status_code != 200:
                    print(f"  ⚠️  Twitter API error: {resp.status_code}")
                    continue
                
                data = resp.json()
                tweets = data.get("data", [])
                users = {u["id"]: u["username"] for u in data.get("includes", {}).get("users", [])}
                
                for tweet in tweets:
                    tweet_key = f"twitter_{tweet['id']}"
                    if tweet_key in seen_posts:
                        continue
                    
                    if not self.matches_opportunity(tweet["text"]):
                        continue
                    
                    author = users.get(tweet["author_id"], "unknown")
                    metrics = tweet.get("public_metrics", {})
                    
                    opportunities.append(Opportunity(
                        id=tweet_key,
                        platform="twitter",
                        type="tweet",
                        title=tweet["text"][:80] + "..." if len(tweet["text"]) > 80 else tweet["text"],
                        text=tweet["text"],
                        url=f"https://twitter.com/{author}/status/{tweet['id']}",
                        author=author,
                        created=tweet.get("created_at", datetime.now().isoformat()),
                        score=metrics.get("like_count", 0) + metrics.get("retweet_count", 0),
                        exams=self.detect_exam_type(tweet["text"]),
                        extra={
                            "likes": metrics.get("like_count", 0),
                            "retweets": metrics.get("retweet_count", 0),
                            "replies": metrics.get("reply_count", 0),
                        }
                    ))
                    
            except Exception as e:
                print(f"  ⚠️  Twitter search error: {e}")
                continue
        
        return opportunities

# ============================================================================
# LINKEDIN ADAPTER (Manual/Export-based)
# ============================================================================

class LinkedInAdapter(PlatformAdapter):
    """
    LinkedIn adapter - LinkedIn's API is very restricted.
    
    Options:
    1. Manual: Process exported Sales Navigator searches
    2. Google Alerts: Set up alerts for LinkedIn posts
    3. Third-party: Use services like Phantombuster (paid)
    
    This adapter processes manually exported data.
    """
    
    name = "linkedin"
    
    # File where you manually paste LinkedIn post URLs/content
    IMPORT_FILE = Path(__file__).parent / "linkedin_import.json"
    
    def is_configured(self) -> bool:
        return self.IMPORT_FILE.exists()
    
    def find_opportunities(self, seen_posts: set, limit: int = 100) -> List[Opportunity]:
        if not self.is_configured():
            return []
        
        opportunities = []
        
        try:
            with open(self.IMPORT_FILE, "r") as f:
                posts = json.load(f)
            
            for post in posts[:limit]:
                post_key = f"linkedin_{post.get('id', hash(post.get('url', '')))}"
                if post_key in seen_posts:
                    continue
                
                text = post.get("text", "")
                if not self.matches_opportunity(text):
                    continue
                
                opportunities.append(Opportunity(
                    id=post_key,
                    platform="linkedin",
                    type="post",
                    title=text[:80] + "..." if len(text) > 80 else text,
                    text=text[:500],
                    url=post.get("url", ""),
                    author=post.get("author", "unknown"),
                    created=post.get("created", datetime.now().isoformat()),
                    score=post.get("likes", 0),
                    exams=self.detect_exam_type(text),
                    extra={"connection_degree": post.get("connection_degree")}
                ))
                
        except Exception as e:
            print(f"  ⚠️  LinkedIn import error: {e}")
        
        return opportunities

# ============================================================================
# STACK EXCHANGE ADAPTER (RSS FEEDS - NO API KEY NEEDED)
# ============================================================================

class StackExchangeAdapter(PlatformAdapter):
    """Stack Exchange platform adapter using public RSS feeds.
    
    No API key required! Uses public RSS endpoints:
    - https://{site}.stackexchange.com/feeds (recent questions)
    - https://{site}.stackexchange.com/feeds/tag/{tag} (by tag)
    
    Relevant sites for exam prep:
    - money.stackexchange.com (Personal Finance & Money)
    - accounting.stackexchange.com (Accounting)  
    - law.stackexchange.com (Law)
    """
    
    name = "stackexchange"
    
    # Stack Exchange sites and tags to monitor
    SITES = {
        "money.stackexchange.com": [],  # Main feed has accounting/CPA questions
        "law.stackexchange.com": [],     # Tax law questions
    }
    
    def __init__(self):
        try:
            import feedparser
            self._feedparser = feedparser
        except ImportError:
            print("  ⚠️  feedparser not installed. Run: pip install feedparser")
            self._feedparser = None
    
    def is_configured(self) -> bool:
        return self._feedparser is not None
    
    def _fetch_rss(self, url: str) -> list:
        """Fetch and parse an RSS feed."""
        try:
            headers = {'User-Agent': 'VoraPrepBot/1.0'}
            resp = requests.get(url, headers=headers, timeout=15)
            
            if resp.status_code != 200:
                return []
            
            feed = self._feedparser.parse(resp.content)
            return feed.entries
        except Exception as e:
            return []
    
    def _extract_question_id(self, entry) -> str:
        """Extract SE question ID from RSS entry."""
        # SE IDs look like: https://money.stackexchange.com/q/123456
        if hasattr(entry, 'id'):
            parts = entry.id.split('/')
            for p in parts:
                if p.isdigit():
                    return p
        return hashlib.md5(str(entry.get('link', '')).encode()).hexdigest()[:12]
    
    def _clean_html(self, text: str) -> str:
        """Remove HTML tags from text."""
        import re
        clean = re.sub(r'<[^>]+>', ' ', text)
        clean = clean.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
        clean = clean.replace('&quot;', '"').replace('&#39;', "'")
        clean = clean.replace('&nbsp;', ' ').replace('&#xA;', '\n')
        return ' '.join(clean.split())  # Normalize whitespace
    
    def find_opportunities(self, seen_posts: set, limit: int = 100) -> List[Opportunity]:
        if not self.is_configured():
            return []
        
        opportunities = []
        
        for site, tags in self.SITES.items():
            # Fetch main feed (recent questions)
            feed_url = f"https://{site}/feeds"
            entries = self._fetch_rss(feed_url)
            
            for entry in entries:
                question_id = self._extract_question_id(entry)
                post_key = f"se_{site.split('.')[0]}_{question_id}"
                
                if post_key in seen_posts:
                    continue
                
                title = entry.get('title', '')
                summary = self._clean_html(entry.get('summary', ''))
                full_text = f"{title} {summary}"
                
                # Get tags from entry
                entry_tags = [c.get('term', '') for c in entry.get('tags', [])]
                
                # Check if relevant to exam prep
                is_relevant = (
                    self.matches_opportunity(full_text) or
                    any(tag in ['cpa', 'cpa-exam', 'accounting-certification', 'ea', 'enrolled-agent'] 
                        for tag in entry_tags) or
                    any(kw in full_text.lower() for kw in [
                        'cpa exam', 'cpa test', 'accounting exam', 'cpa review',
                        'enrolled agent', 'ea exam', 'tax exam', 'study material',
                        'exam prep', 'certification exam', 'cma exam', 'cfa exam'
                    ])
                )
                
                if is_relevant:
                    opportunities.append(Opportunity(
                        id=post_key,
                        platform="stackexchange",
                        type="question",
                        title=title[:200] if len(title) > 200 else title,
                        text=summary[:500] + "..." if len(summary) > 500 else summary,
                        url=entry.get('link', ''),
                        author=entry.get('author', {}).get('name', 'unknown') if isinstance(entry.get('author'), dict) else entry.get('author', 'unknown'),
                        created=entry.get('published', datetime.now().isoformat()),
                        score=int(entry.get('re_rank', 0)) if entry.get('re_rank', '').isdigit() else 0,
                        exams=self.detect_exam_type(full_text),
                        extra={"site": site, "tags": entry_tags}
                    ))
            
            time.sleep(0.5)
        
        return opportunities


# Keep QuoraAdapter as stub (Cloudflare blocks their RSS)
class QuoraAdapter(PlatformAdapter):
    """Quora - RSS blocked by Cloudflare. Not implemented."""
    name = "quora"
    def is_configured(self) -> bool:
        return False
    def find_opportunities(self, seen_posts: set, limit: int = 100):
        return []


# ============================================================================
# HACKER NEWS ADAPTER (FREE ALGOLIA API - NO KEY NEEDED)
# ============================================================================

class HackerNewsAdapter(PlatformAdapter):
    """Hacker News adapter using free Algolia Search API.
    
    No API key required! Uses public endpoints:
    - https://hn.algolia.com/api/v1/search?query=...&tags=story
    - https://hn.algolia.com/api/v1/search_by_date?query=...
    
    Good for: tech professionals, productivity tools, learning platforms
    """
    
    name = "hackernews"
    
    # Search queries for exam prep opportunities
    SEARCH_QUERIES = [
        "CPA exam",
        "CPA study",
        "accounting certification",
        "enrolled agent",
        "CMA exam",
        "CFP exam",
        "CISA certification",
        "CIA exam audit",
        "study software",
        "exam prep app",
        "flashcard app",
        "spaced repetition",
        "professional certification",
    ]
    
    def __init__(self):
        self.base_url = "https://hn.algolia.com/api/v1"
    
    def is_configured(self) -> bool:
        # Always configured - no API key needed!
        return True
    
    def _search(self, query: str, limit: int = 20) -> list:
        """Search HN via Algolia API."""
        try:
            # Search recent stories and comments
            url = f"{self.base_url}/search_by_date"
            params = {
                "query": query,
                "tags": "(story,comment)",  # Both stories and comments
                "hitsPerPage": limit,
            }
            
            resp = requests.get(url, params=params, timeout=15)
            if resp.status_code != 200:
                return []
            
            data = resp.json()
            return data.get("hits", [])
        except Exception as e:
            return []
    
    def find_opportunities(self, seen_posts: set, limit: int = 100) -> List[Opportunity]:
        opportunities = []
        seen_in_batch = set()  # Avoid duplicates within this batch
        
        for query in self.SEARCH_QUERIES:
            hits = self._search(query, limit=20)
            
            for hit in hits:
                # Get unique ID
                object_id = hit.get("objectID", "")
                post_key = f"hn_{object_id}"
                
                if post_key in seen_posts or post_key in seen_in_batch:
                    continue
                
                seen_in_batch.add(post_key)
                
                # Determine if story or comment
                is_story = hit.get("story_title") is None
                
                if is_story:
                    title = hit.get("title", "")
                    text = hit.get("story_text", "") or ""
                    url = hit.get("url", "") or f"https://news.ycombinator.com/item?id={object_id}"
                else:
                    # Comment
                    title = hit.get("story_title", "")
                    text = hit.get("comment_text", "") or ""
                    url = f"https://news.ycombinator.com/item?id={object_id}"
                
                # Clean HTML from text
                import re
                text = re.sub(r'<[^>]+>', ' ', text)
                text = text.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
                
                full_text = f"{title} {text}"
                
                # Check if it's a genuine opportunity (asking for help/recommendations)
                is_opportunity = (
                    self.matches_opportunity(full_text) or
                    any(kw in full_text.lower() for kw in [
                        'cpa exam', 'cma exam', 'cfa exam', 'cisa exam', 'cia exam',
                        'enrolled agent', 'cfp exam', 'accounting exam',
                        'exam prep', 'study material', 'flashcard', 'spaced repetition',
                        'certification study', 'review course', 'test prep'
                    ])
                )
                
                if is_opportunity:
                    opportunities.append(Opportunity(
                        id=post_key,
                        platform="hackernews",
                        type="story" if is_story else "comment",
                        title=title[:200] if len(title) > 200 else title,
                        text=text[:500] + "..." if len(text) > 500 else text,
                        url=url,
                        author=hit.get("author", "unknown"),
                        created=hit.get("created_at", datetime.now().isoformat()),
                        score=hit.get("points", 0) or 0,
                        exams=self.detect_exam_type(full_text),
                        extra={"num_comments": hit.get("num_comments", 0)}
                    ))
            
            # Small delay between searches
            time.sleep(0.3)
        
        return opportunities


# ============================================================================
# DISCORD ADAPTER
# ============================================================================

class DiscordAdapter(PlatformAdapter):
    """
    Discord adapter - monitors servers for exam prep discussions.
    
    The bot joins specified servers and monitors channels for opportunity keywords.
    Requires a Discord bot token and server invites.
    """
    
    name = "discord"
    
    # Discord servers to monitor (server IDs)
    # You'll need to invite the bot to these servers first
    SERVERS_TO_MONITOR = {
        # Add server IDs after joining. Format: "server_id": ["channel_id1", "channel_id2"]
        # Leave channel list empty to monitor all text channels
        # Example:
        # "1234567890": ["general", "cpa-discussion", "study-help"],
    }
    
    # Channel name patterns to monitor (if not specifying exact channels)
    CHANNEL_PATTERNS = [
        "general",
        "study",
        "help",
        "question",
        "cpa",
        "accounting",
        "exam",
        "prep",
    ]
    
    def __init__(self):
        self._token = os.getenv("DISCORD_BOT_TOKEN")
    
    def is_configured(self) -> bool:
        return bool(self._token)
    
    def find_opportunities(self, seen_posts: set, limit: int = 100) -> List[Opportunity]:
        """
        Search Discord for opportunities.
        
        Note: Discord's API requires async, so we use a synchronous wrapper.
        For production, consider running the Discord bot separately.
        """
        if not self.is_configured():
            return []
        
        opportunities = []
        
        try:
            # Use Discord's REST API directly for simplicity
            headers = {
                "Authorization": f"Bot {self._token}",
                "Content-Type": "application/json",
            }
            
            # Get guilds (servers) the bot is in
            guilds_resp = requests.get(
                "https://discord.com/api/v10/users/@me/guilds",
                headers=headers
            )
            
            if guilds_resp.status_code != 200:
                print(f"  ⚠️  Discord API error: {guilds_resp.status_code}")
                return []
            
            guilds = guilds_resp.json()
            
            for guild in guilds:
                guild_id = guild["id"]
                guild_name = guild["name"]
                
                # Get channels in this guild
                channels_resp = requests.get(
                    f"https://discord.com/api/v10/guilds/{guild_id}/channels",
                    headers=headers
                )
                
                if channels_resp.status_code != 200:
                    continue
                
                channels = channels_resp.json()
                
                # Filter to text channels matching our patterns
                text_channels = [
                    c for c in channels 
                    if c["type"] == 0 and  # Text channel
                    any(pattern in c["name"].lower() for pattern in self.CHANNEL_PATTERNS)
                ]
                
                for channel in text_channels[:5]:  # Limit channels per server
                    channel_id = channel["id"]
                    channel_name = channel["name"]
                    
                    # Get recent messages
                    messages_resp = requests.get(
                        f"https://discord.com/api/v10/channels/{channel_id}/messages?limit=50",
                        headers=headers
                    )
                    
                    if messages_resp.status_code != 200:
                        continue
                    
                    messages = messages_resp.json()
                    
                    for msg in messages:
                        msg_key = f"discord_{msg['id']}"
                        if msg_key in seen_posts:
                            continue
                        
                        content = msg.get("content", "")
                        if not content or not self.matches_opportunity(content):
                            continue
                        
                        author = msg.get("author", {})
                        
                        opportunities.append(Opportunity(
                            id=msg_key,
                            platform="discord",
                            type="message",
                            title=content[:80] + "..." if len(content) > 80 else content,
                            text=content[:500],
                            url=f"https://discord.com/channels/{guild_id}/{channel_id}/{msg['id']}",
                            author=author.get("username", "unknown"),
                            created=msg.get("timestamp", datetime.now().isoformat()),
                            score=0,  # Discord doesn't have upvotes
                            exams=self.detect_exam_type(content),
                            extra={
                                "server": guild_name,
                                "channel": channel_name,
                            }
                        ))
                        
                        if len(opportunities) >= limit:
                            return opportunities
                    
                    # Rate limiting
                    time.sleep(0.5)
                    
        except Exception as e:
            print(f"  ⚠️  Discord error: {e}")
        
        return opportunities

# ============================================================================
# PLATFORM REGISTRY
# ============================================================================

def get_all_adapters() -> List[PlatformAdapter]:
    """Get all available platform adapters."""
    return [
        RedditAdapter(),
        StackExchangeAdapter(),
        HackerNewsAdapter(),
        DiscordAdapter(),
        TwitterAdapter(),
        LinkedInAdapter(),
        QuoraAdapter(),
    ]

def get_configured_adapters() -> List[PlatformAdapter]:
    """Get only configured platform adapters."""
    return [a for a in get_all_adapters() if a.is_configured()]

# ============================================================================
# UTILITY FUNCTIONS
# ============================================================================

def load_seen_posts() -> set:
    """Load set of already-processed post IDs."""
    if SEEN_POSTS_FILE.exists():
        with open(SEEN_POSTS_FILE, "r") as f:
            data = json.load(f)
            # Clean old entries (older than 30 days)
            cutoff = (datetime.now() - timedelta(days=30)).isoformat()
            return {k for k, v in data.items() if v > cutoff}
    return set()

def save_seen_post(post_id: str, seen_posts: set):
    """Save a post ID as seen."""
    seen_posts.add(post_id)
    # Load existing data and merge
    existing = {}
    if SEEN_POSTS_FILE.exists():
        with open(SEEN_POSTS_FILE, "r") as f:
            existing = json.load(f)
    existing[post_id] = datetime.now().isoformat()
    with open(SEEN_POSTS_FILE, "w") as f:
        json.dump(existing, f, indent=2)

# ============================================================================
# AI RESPONSE GENERATION
# ============================================================================

def generate_suggested_response(opportunity: Opportunity) -> str:
    """Use Gemini to generate a helpful, non-spammy response."""
    
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("VITE_GEMINI_API_KEY")
    if not api_key:
        return "[Gemini API key not configured - manual response needed]"
    
    exam_names = ", ".join([EXAM_CONTEXT.get(e, e.upper()) for e in opportunity.exams])
    
    # Platform-specific tone guidance
    platform_guidance = {
        "reddit": "Match Reddit's casual, community-focused tone. Use bullet points if helpful.",
        "twitter": "Keep it under 280 characters. Be conversational and direct.",
        "linkedin": "Be professional and career-focused. Mention ROI and career advancement.",
    }
    
    tone = platform_guidance.get(opportunity.platform, "Be helpful and professional.")
    
    prompt = f"""You are helping craft a {opportunity.platform.title()} response for someone asking about exam prep.

CONTEXT:
- Platform: {opportunity.platform.title()}
- Post/Comment: {opportunity.title}
- Content: {opportunity.text}
- Relevant exam(s): {exam_names}

PLATFORM TONE: {tone}

TASK:
Write a helpful, genuine response that:
1. First, directly addresses their specific question or concern
2. Provides genuinely useful advice (not just a product pitch)
3. Naturally mentions VoraPrep as ONE option they might consider
4. Explains 1-2 specific features relevant to their situation (AI tutor, adaptive learning, score predictor, affordable pricing at $29-59/mo vs Becker's $159/mo)
5. Mentions there's a free Discord study community with daily quiz questions (https://discord.gg/XBjzDrws)
6. Is conversational and matches the platform's tone
7. Is NOT salesy or spammy - prioritize being helpful

IMPORTANT:
- Start by empathizing or sharing relevant experience
- Don't start with "Hey!" or sound like an ad
- Keep it under {"280 characters" if opportunity.platform == "twitter" else "200 words"}
- Include "voraprep.com" naturally
- Mention the free Discord study group (https://discord.gg/XBjzDrws) as a no-strings-attached resource
- Mention it's newer but has a 14-day free trial if relevant

Write the response:"""

    try:
        import google.generativeai as genai
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.0-flash')
        response = model.generate_content(prompt)
        return response.text.strip()
    except ImportError:
        # Fallback to REST API
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"
        payload = {"contents": [{"parts": [{"text": prompt}]}]}
        resp = requests.post(url, json=payload)
        if resp.status_code == 200:
            return resp.json()["candidates"][0]["content"]["parts"][0]["text"].strip()
        return f"[API Error: {resp.status_code}]"
    except Exception as e:
        return f"[Error generating response: {e}]"

# ============================================================================
# NOTIFICATIONS
# ============================================================================

def get_platform_emoji(platform: str) -> str:
    """Get emoji for platform."""
    return {
        "reddit": "🤖",
        "discord": "🎮",
        "twitter": "🐦",
        "linkedin": "💼",
        "quora": "❓",
    }.get(platform, "📱")

def send_email_notification(opportunities: List[Opportunity]):
    """Send email notification via Resend."""
    
    resend_key = os.getenv("RESEND_API_KEY")
    to_email = os.getenv("NOTIFICATION_EMAIL")
    
    if not resend_key or not to_email:
        print("⚠️  Email not configured (RESEND_API_KEY or NOTIFICATION_EMAIL missing)")
        return
    
    # Group by platform
    by_platform = {}
    for opp in opportunities:
        by_platform.setdefault(opp.platform, []).append(opp)
    
    platform_summary = ", ".join([f"{len(v)} {k}" for k, v in by_platform.items()])
    
    # Build email HTML
    html_parts = [
        "<h1>🎯 Social Media Opportunities Found</h1>",
        f"<p>Found {len(opportunities)} opportunities ({platform_summary}) on {datetime.now().strftime('%Y-%m-%d %H:%M')}</p>",
        "<hr>",
    ]
    
    for i, opp in enumerate(opportunities, 1):
        suggested = generate_suggested_response(opp)
        emoji = get_platform_emoji(opp.platform)
        
        extra_info = ""
        if opp.extra:
            if opp.platform == "reddit":
                extra_info = f"r/{opp.extra.get('subreddit', 'unknown')}"
            elif opp.platform == "twitter":
                extra_info = f"❤️ {opp.extra.get('likes', 0)} | 🔁 {opp.extra.get('retweets', 0)}"
        
        html_parts.append(f"""
        <div style="margin-bottom: 30px; padding: 15px; border: 1px solid #ddd; border-radius: 8px;">
            <h2>{emoji} #{i}: {opp.title[:80]}</h2>
            <p><strong>Platform:</strong> {opp.platform.title()} | 
               <strong>Type:</strong> {opp.type} | 
               <strong>Score:</strong> {opp.score} |
               <strong>Exams:</strong> {', '.join(opp.exams).upper()}
               {f' | {extra_info}' if extra_info else ''}</p>
            <p><strong>Posted by:</strong> {opp.author} on {opp.created[:10]}</p>
            
            <div style="background: #f5f5f5; padding: 10px; border-radius: 4px; margin: 10px 0;">
                <strong>Original Content:</strong><br>
                {opp.text.replace(chr(10), '<br>')}
            </div>
            
            <p><a href="{opp.url}" style="color: #0066cc; font-weight: bold;">🔗 Open on {opp.platform.title()}</a></p>
            
            <div style="background: #e8f4e8; padding: 10px; border-radius: 4px; margin: 10px 0;">
                <strong>💡 Suggested Response:</strong><br><br>
                {suggested.replace(chr(10), '<br>')}
            </div>
            
            <p style="font-size: 12px; color: #666;">
                <a href="{opp.url}">Click here to respond</a> (copy the suggested response above)
            </p>
        </div>
        """)
    
    html_parts.append("""
    <hr>
    <p style="color: #666; font-size: 12px;">
        This email was sent by VoraPrep Opportunity Finder.<br>
        Remember: Always provide genuine value first. Be helpful, not salesy.
    </p>
    """)
    
    # Send via Resend
    try:
        resp = requests.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {resend_key}",
                "Content-Type": "application/json",
            },
            json={
                "from": "VoraPrep Bot <alerts@voraprep.com>",
                "to": [to_email],
                "subject": f"🎯 {len(opportunities)} Opportunities: {platform_summary}",
                "html": "\n".join(html_parts),
            },
        )
        if resp.status_code == 200:
            print(f"✅ Email sent to {to_email}")
        else:
            print(f"❌ Email failed: {resp.status_code} - {resp.text}")
    except Exception as e:
        print(f"❌ Email error: {e}")

def print_opportunities(opportunities: List[Opportunity]):
    """Print opportunities to console (for test mode)."""
    print(f"\n{'='*60}")
    print(f"🎯 Found {len(opportunities)} opportunities")
    print(f"{'='*60}\n")
    
    for i, opp in enumerate(opportunities, 1):
        emoji = get_platform_emoji(opp.platform)
        print(f"#{i} {emoji} [{opp.type.upper()}] {opp.platform.title()}")
        print(f"   Title: {opp.title[:60]}...")
        print(f"   Exams: {', '.join(opp.exams).upper()}")
        print(f"   URL: {opp.url}")
        print(f"   Score: {opp.score}")
        if opp.extra:
            print(f"   Extra: {opp.extra}")
        print()
        
        # Generate and show suggested response
        print("   💡 Suggested Response:")
        suggested = generate_suggested_response(opp)
        for line in suggested.split('\n'):
            print(f"      {line}")
        print()
        print("-" * 60)
        print()

# ============================================================================
# MAIN
# ============================================================================

def run_once(test_mode: bool = False, platforms: List[str] = None):
    """Run the finder once."""
    print(f"\n🔍 Opportunity Finder — {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print("=" * 50)
    
    seen_posts = load_seen_posts()
    all_opportunities = []
    
    # Get adapters
    if platforms:
        adapters = [a for a in get_all_adapters() if a.name in platforms]
    else:
        adapters = get_configured_adapters()
    
    if not adapters:
        print("❌ No platforms configured. Set up API credentials in .env")
        print("   Available platforms: reddit, twitter, linkedin")
        return
    
    # Run each adapter
    for adapter in adapters:
        print(f"\n{get_platform_emoji(adapter.name)} Checking {adapter.name.title()}...")
        
        if not adapter.is_configured():
            print(f"  ⚠️  {adapter.name.title()} not configured, skipping")
            continue
        
        try:
            opportunities = adapter.find_opportunities(seen_posts)
            if opportunities:
                print(f"  ✅ Found {len(opportunities)} opportunities")
                all_opportunities.extend(opportunities)
            else:
                print(f"  ℹ️  No new opportunities")
        except Exception as e:
            print(f"  ❌ Error: {e}")
    
    print(f"\n{'='*50}")
    
    if not all_opportunities:
        print("No new opportunities found across all platforms.")
        return
    
    print(f"📊 Total: {len(all_opportunities)} opportunities")
    
    if test_mode:
        print_opportunities(all_opportunities)
    else:
        send_email_notification(all_opportunities)
    
    # Mark all as seen
    for opp in all_opportunities:
        save_seen_post(opp.id, seen_posts)
    
    print(f"✅ Done. Marked {len(all_opportunities)} posts as seen.")

def run_daemon(interval_minutes: int = 30, platforms: List[str] = None):
    """Run continuously."""
    print(f"🤖 Starting Multi-Platform Opportunity Finder daemon")
    print(f"   Checking every {interval_minutes} minutes")
    print("   Press Ctrl+C to stop.\n")
    
    while True:
        try:
            run_once(platforms=platforms)
            print(f"\n💤 Sleeping for {interval_minutes} minutes...\n")
            time.sleep(interval_minutes * 60)
        except KeyboardInterrupt:
            print("\n👋 Stopping daemon.")
            break
        except Exception as e:
            print(f"❌ Error: {e}")
            print(f"Retrying in {interval_minutes} minutes...")
            time.sleep(interval_minutes * 60)

def show_status():
    """Show configuration status for all platforms."""
    print("\n📊 Platform Configuration Status")
    print("=" * 50)
    
    for adapter in get_all_adapters():
        status = "✅ Configured" if adapter.is_configured() else "❌ Not configured"
        print(f"  {get_platform_emoji(adapter.name)} {adapter.name.title():12} {status}")
    
    print("\n📁 Seen Posts File:", SEEN_POSTS_FILE)
    if SEEN_POSTS_FILE.exists():
        seen = load_seen_posts()
        print(f"   {len(seen)} posts tracked (last 30 days)")
    else:
        print("   (not created yet)")
    
    print("\n🔧 Environment Variables:")
    env_vars = [
        ("DISCORD_BOT_TOKEN", "Discord Bot"),
        ("TWITTER_BEARER_TOKEN", "Twitter/X API"),
        ("GEMINI_API_KEY", "AI Response Generation"),
        ("RESEND_API_KEY", "Email Notifications"),
        ("NOTIFICATION_EMAIL", "Notification Recipient"),
    ]
    for var, desc in env_vars:
        status = "✅" if os.getenv(var) else "❌"
        print(f"   {status} {var}: {desc}")
    
    print("\n📡 Reddit: Uses public RSS feeds (no API key required)")
    print()

def main():
    parser = argparse.ArgumentParser(
        description="Multi-Platform Opportunity Finder for VoraPrep",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python reddit_opportunity_finder.py                    # Run all configured platforms
  python reddit_opportunity_finder.py --platform reddit  # Reddit only
  python reddit_opportunity_finder.py --platform discord # Discord only
  python reddit_opportunity_finder.py --platform reddit --platform discord  # Both
  python reddit_opportunity_finder.py --test             # Test mode (print, don't email)
  python reddit_opportunity_finder.py --daemon           # Run continuously
  python reddit_opportunity_finder.py --status           # Show configuration status
        """
    )
    parser.add_argument("--test", action="store_true", help="Test mode (print to console, don't email)")
    parser.add_argument("--daemon", action="store_true", help="Run continuously")
    parser.add_argument("--interval", type=int, default=30, help="Minutes between checks (daemon mode)")
    parser.add_argument("--platform", type=str, action="append", 
                       choices=["reddit", "stackexchange", "hackernews", "discord", "twitter", "linkedin", "quora"],
                       help="Specific platform(s) to check (can use multiple times)")
    parser.add_argument("--status", action="store_true", help="Show configuration status")
    args = parser.parse_args()
    
    if args.status:
        show_status()
        return
    
    # Check for at least one configured platform
    configured = get_configured_adapters()
    if not configured and not args.platform:
        print("❌ No platforms configured!")
        print()
        print("Quick setup for Reddit (free API):")
        print("  1. Go to https://www.reddit.com/prefs/apps")
        print("  2. Create a 'script' type app")
        print("  3. Copy client_id and client_secret to .env:")
        print()
        print("     REDDIT_CLIENT_ID=your_id")
        print("     REDDIT_CLIENT_SECRET=your_secret")
        print("     REDDIT_USER_AGENT=VoraPrepOpportunityFinder/1.0")
        print()
        print("Run with --status to see full configuration.")
        return
    
    if args.daemon:
        run_daemon(args.interval, args.platform)
    else:
        run_once(test_mode=args.test, platforms=args.platform)

if __name__ == "__main__":
    main()
