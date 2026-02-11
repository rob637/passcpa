#!/usr/bin/env python3
"""
HeyGen Browser Automation

Automates the HeyGen web dashboard to create videos without using the expensive API.
Uses Playwright for browser automation - runs in headless mode for background operation.

Features:
- Headless browser operation (no GUI needed)
- Session persistence (stays logged in)
- Handles video creation workflow
- Polls for completion
- Downloads finished videos
"""
import os
import sys
import time
import json
import logging
from pathlib import Path
from typing import Optional, Tuple

def _get_playwright():
    """Import playwright."""
    try:
        from playwright.sync_api import sync_playwright, Page, Browser
        return sync_playwright, Page, Browser, True
    except ImportError:
        print("[WARN] Playwright not installed. Run: pip install playwright && playwright install chromium")
        return None, None, None, False

sync_playwright, Page, Browser, PLAYWRIGHT_AVAILABLE = _get_playwright()

from config import HEYGEN_EMAIL, HEYGEN_PASSWORD, AVATARS, get_random_combo

logger = logging.getLogger('heygen')

class HeyGenAutomation:
    """Automates HeyGen video creation via browser."""
    
    BASE_URL = "https://app.heygen.com"
    SESSION_FILE = Path(__file__).parent / "output" / ".heygen_session.json"
    
    def __init__(self, headless: bool = True):
        self.headless = headless
        self.browser: Optional[Browser] = None
        self.page: Optional[Page] = None
        self.playwright = None
    
    def __enter__(self):
        self.start()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.stop()
    
    def start(self):
        """Start browser and login."""
        if not PLAYWRIGHT_AVAILABLE:
            raise RuntimeError("Playwright not installed")
        
        self.playwright = sync_playwright().start()
        
        # Use persistent context to maintain login
        user_data_dir = Path(__file__).parent / "output" / ".browser_data"
        user_data_dir.mkdir(parents=True, exist_ok=True)
        
        self.browser = self.playwright.chromium.launch_persistent_context(
            user_data_dir=str(user_data_dir),
            headless=self.headless,
            viewport={'width': 1920, 'height': 1080},
            slow_mo=100  # Slow down for stability
        )
        
        self.page = self.browser.pages[0] if self.browser.pages else self.browser.new_page()
        
        # Check if already logged in
        if not self._is_logged_in():
            self._login()
    
    def stop(self):
        """Close browser."""
        if self.browser:
            self.browser.close()
        if self.playwright:
            self.playwright.stop()
    
    def _is_logged_in(self) -> bool:
        """Check if we're already logged in."""
        try:
            self.page.goto(f"{self.BASE_URL}/home", timeout=30000)
            time.sleep(3)  # Give page more time to load/redirect
            
            current_url = self.page.url
            logger.info(f"[CHECK] Current URL: {current_url}")
            
            # Check for login page indicators
            if "/login" in current_url or "/signin" in current_url or "/sign-in" in current_url:
                logger.info("[CHECK] Detected login page - not logged in")
                return False
            
            # If we're on any heygen app page (not login), we're logged in
            if "app.heygen.com" in current_url and "/login" not in current_url:
                logger.info("[CHECK] On HeyGen app page - logged in")
                return True
            
            # Fallback: Look for dashboard elements
            if self.page.query_selector('[data-testid="create-video-button"]'):
                return True
            
            # Check for avatar selection or project list
            if self.page.query_selector('.project-list') or self.page.query_selector('.avatar-list'):
                return True
            
            # If still on heygen.com but not login, probably logged in
            if "heygen.com" in current_url:
                logger.info("[CHECK] On HeyGen domain, assuming logged in")
                return True
            
            return False
            
        except Exception as e:
            logger.warning(f"Login check failed: {e}")
            return False
    
    def _login(self):
        """Login to HeyGen - supports Google OAuth with manual intervention."""
        logger.info("[LOGIN] Login required for HeyGen...")
        
        self.page.goto(f"{self.BASE_URL}/login", timeout=60000)
        time.sleep(2)
        
        # Check if Google login is preferred (no password set)
        if not HEYGEN_PASSWORD:
            # If running headless, can't do manual login - fail fast with clear message
            if self.headless:
                raise RuntimeError(
                    "No HeyGen session found and running in headless mode.\n"
                    "You need to run test_login.py ONCE first to create a session:\n\n"
                    "    python test_login.py\n\n"
                    "Complete the Google login in the browser window that opens.\n"
                    "After that, the pipeline can run in headless mode."
                )
            
            logger.info("")
            logger.info("=" * 60)
            logger.info("MANUAL LOGIN REQUIRED (one-time only)")
            logger.info("=" * 60)
            logger.info("")
            logger.info("A browser window should have opened.")
            logger.info("Please log in with Google, then the automation will continue.")
            logger.info("")
            logger.info("The session will be saved - you won't need to do this again.")
            logger.info("=" * 60)
            
            # Wait for user to complete login (poll for dashboard URL)
            max_wait = 300  # 5 minutes
            waited = 0
            while waited < max_wait:
                time.sleep(5)
                waited += 5
                
                # Check if we're now on the dashboard
                current_url = self.page.url
                if "/home" in current_url or "/create" in current_url or "/videos" in current_url:
                    logger.info("[OK] Login detected! Continuing automation...")
                    time.sleep(2)
                    return
                
                if waited % 30 == 0:
                    logger.info(f"[WAIT] Waiting for login... ({waited}s / {max_wait}s)")
            
            raise TimeoutError("Login timeout - please try again")
        
        # Email/password login (original flow)
        if not HEYGEN_EMAIL:
            raise ValueError("HEYGEN_EMAIL must be set in .env (or remove HEYGEN_PASSWORD for Google login)")
        
        # Enter email
        email_input = self.page.wait_for_selector('input[type="email"], input[name="email"]', timeout=10000)
        email_input.fill(HEYGEN_EMAIL)
        
        # Enter password
        password_input = self.page.wait_for_selector('input[type="password"]', timeout=10000)
        password_input.fill(HEYGEN_PASSWORD)
        
        # Click login button
        login_button = self.page.query_selector('button[type="submit"]')
        if login_button:
            login_button.click()
        
        # Wait for redirect to dashboard
        self.page.wait_for_url(f"{self.BASE_URL}/home**", timeout=60000)
        logger.info("[OK] Logged into HeyGen")
        time.sleep(2)
    
    def create_video(self, script_file: str, background_file: str, title: str, avatar_id: str = None) -> Optional[str]:
        """
        Create a video in HeyGen.
        
        Args:
            script_file: Path to script text file
            background_file: Path to background PNG
            title: Video title
            avatar_id: HeyGen avatar ID (e.g., "Freja", "Bruce")
        
        Returns: video_id if successful, None if failed
        """
        # Use provided avatar_id or fall back to first avatar in pool
        avatar_to_use = avatar_id or AVATARS[0]['id']
        logger.info(f"[CREATE] Creating video: {title} (Avatar: {avatar_to_use})")
        
        try:
            # Navigate to create video page
            self.page.goto(f"{self.BASE_URL}/create", timeout=60000)
            time.sleep(3)
            
            # Read script
            with open(script_file, 'r', encoding='utf-8') as f:
                script_text = f.read()
            
            # Click "Create Video" or similar button
            create_btn = self.page.wait_for_selector(
                'button:has-text("Create"), [data-testid="create-video-button"]',
                timeout=10000
            )
            create_btn.click()
            time.sleep(2)
            
            # Select avatar (click on avatar selection)
            # This varies by HeyGen UI version - adjust selectors as needed
            avatar_selector = self.page.query_selector(f'[data-avatar-id="{avatar_to_use}"], .avatar-item')
            if avatar_selector:
                avatar_selector.click()
                time.sleep(1)
            
            # Upload background image
            file_input = self.page.query_selector('input[type="file"]')
            if file_input and background_file:
                file_input.set_input_files(background_file)
                time.sleep(2)
            
            # Enter script text
            script_input = self.page.wait_for_selector(
                'textarea[placeholder*="script"], .script-editor textarea, [data-testid="script-input"]',
                timeout=10000
            )
            script_input.fill(script_text)
            time.sleep(1)
            
            # Set video title if field exists
            title_input = self.page.query_selector('input[placeholder*="title"], [data-testid="video-title"]')
            if title_input:
                title_input.fill(title[:50])
            
            # Click Generate/Submit button
            generate_btn = self.page.wait_for_selector(
                'button:has-text("Generate"), button:has-text("Submit"), [data-testid="generate-button"]',
                timeout=10000
            )
            generate_btn.click()
            
            # Wait for video to be queued and get video ID from URL or response
            time.sleep(5)
            
            # Try to extract video ID from URL or page
            video_id = self._extract_video_id()
            
            if video_id:
                logger.info(f"[OK] Video queued with ID: {video_id}")
                return video_id
            else:
                # Generate a timestamp-based ID as fallback
                video_id = f"heygen_{int(time.time())}"
                logger.warning(f"[WARN] Could not extract video ID, using: {video_id}")
                return video_id
                
        except Exception as e:
            logger.error(f"[ERROR] Failed to create video: {e}")
            # Take screenshot for debugging
            screenshot_path = Path(__file__).parent / "output" / f"error_{int(time.time())}.png"
            self.page.screenshot(path=str(screenshot_path))
            logger.info(f"[DEBUG] Screenshot saved: {screenshot_path}")
            return None
    
    def _extract_video_id(self) -> Optional[str]:
        """Extract video ID from current page."""
        # Try URL first
        url = self.page.url
        if "/video/" in url:
            parts = url.split("/video/")
            if len(parts) > 1:
                return parts[1].split("/")[0].split("?")[0]
        
        # Try page content
        # Look for video ID in various places
        video_elements = self.page.query_selector_all('[data-video-id], [data-id]')
        for elem in video_elements:
            video_id = elem.get_attribute('data-video-id') or elem.get_attribute('data-id')
            if video_id:
                return video_id
        
        return None
    
    def check_video_status(self, video_id: str) -> Tuple[str, Optional[str]]:
        """
        Check the status of a video.
        
        Returns: (status, download_url)
        status: 'processing', 'completed', 'failed'
        """
        logger.info(f"[POLL] Checking status for: {video_id}")
        
        try:
            # Navigate to video page
            self.page.goto(f"{self.BASE_URL}/video/{video_id}", timeout=60000)
            time.sleep(3)
            
            # Look for status indicators
            # These selectors need to match HeyGen's actual UI
            
            # Check for completion
            download_btn = self.page.query_selector(
                'button:has-text("Download"), [data-testid="download-button"], a[download]'
            )
            if download_btn:
                download_url = download_btn.get_attribute('href')
                return ('completed', download_url)
            
            # Check for processing status
            processing = self.page.query_selector(
                '.processing, .status-processing, :has-text("processing"), :has-text("generating")'
            )
            if processing:
                return ('processing', None)
            
            # Check for error
            error = self.page.query_selector(
                '.error, .status-failed, :has-text("failed"), :has-text("error")'
            )
            if error:
                return ('failed', None)
            
            # Default to processing if uncertain
            return ('processing', None)
            
        except Exception as e:
            logger.error(f"[ERROR] Status check failed: {e}")
            return ('processing', None)
    
    def download_video(self, video_id: str, output_path: Path) -> bool:
        """Download a completed video."""
        logger.info(f"[DOWNLOAD] Downloading video: {video_id}")
        
        try:
            self.page.goto(f"{self.BASE_URL}/video/{video_id}", timeout=60000)
            time.sleep(3)
            
            # Find download button and get URL
            download_btn = self.page.wait_for_selector(
                'button:has-text("Download"), [data-testid="download-button"], a[download]',
                timeout=30000
            )
            
            # Handle download
            with self.page.expect_download() as download_info:
                download_btn.click()
            
            download = download_info.value
            download.save_as(str(output_path))
            
            logger.info(f"[OK] Video saved: {output_path}")
            return True
            
        except Exception as e:
            logger.error(f"[ERROR] Download failed: {e}")
            return False
    
    def get_video_list(self) -> list:
        """Get list of all videos in account."""
        try:
            self.page.goto(f"{self.BASE_URL}/videos", timeout=60000)
            time.sleep(3)
            
            videos = []
            video_items = self.page.query_selector_all('.video-item, [data-video-id]')
            
            for item in video_items:
                video_id = item.get_attribute('data-video-id') or item.get_attribute('data-id')
                title = item.query_selector('.video-title, .title')
                title_text = title.inner_text() if title else "Untitled"
                
                videos.append({
                    'id': video_id,
                    'title': title_text
                })
            
            return videos
            
        except Exception as e:
            logger.error(f"[ERROR] Failed to get video list: {e}")
            return []


# Standalone testing
if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    
    print("Testing HeyGen Automation...")
    print("   This will open a browser window for testing.")
    print()
    
    with HeyGenAutomation(headless=False) as heygen:
        print("[OK] Browser started and logged in")
        
        # List existing videos
        videos = heygen.get_video_list()
        print(f"\nFound {len(videos)} existing videos:")
        for v in videos[:5]:
            print(f"   - {v['id']}: {v['title']}")
        
        input("\nPress Enter to close browser...")
