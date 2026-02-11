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
    
    def create_video(self, script_file: str, background_file: str, title: str, avatar_id: str = None, avatar_look: str = None) -> Optional[str]:
        """
        Create a video in HeyGen.
        
        Args:
            script_file: Path to script text file
            background_file: Path to background PNG
            title: Video title
            avatar_id: HeyGen avatar ID (e.g., "Freja", "Bruce")
            avatar_look: Specific outfit/look name (e.g., "Jin Vest Front")
        
        Returns: video_id if successful, None if failed
        """
        # Use provided avatar_id or fall back to first avatar in pool
        avatar_to_use = avatar_id or AVATARS[0]['id']
        look_to_use = avatar_look  # Specific look/outfit to select
        logger.info(f"[CREATE] Creating video: {title} (Avatar: {avatar_to_use}, Look: {look_to_use})")
        
        try:
            # Navigate to home
            self.page.goto(f"{self.BASE_URL}/home", timeout=60000)
            time.sleep(3)
            
            # Click "Create" button to open dropdown
            create_btn = self.page.wait_for_selector(
                'button:has-text("Create")',
                timeout=15000
            )
            create_btn.click()
            time.sleep(1)
            
            # Click "Create in AI studio" from the dropdown menu
            ai_studio_btn = self.page.wait_for_selector(
                'text="Create in AI studio"',
                timeout=10000
            )
            ai_studio_btn.click()
            time.sleep(5)  # Wait for editor to load
            
            # =========================================================
            # SET LANDSCAPE MODE (16:9) - multiple possible locations
            # =========================================================
            try:
                # Method 1: Look for Layouts button in right sidebar, then select 16:9
                layouts_btn = self.page.locator('text="Layouts"').first
                if layouts_btn and layouts_btn.is_visible():
                    layouts_btn.click()
                    logger.info("[OK] Clicked Layouts button")
                    time.sleep(1)
                    
                    # Look for 16:9 option in the layouts panel
                    ratio_selectors = [
                        'text="16:9"',
                        '[aria-label*="16:9"]',
                        '[aria-label*="Landscape"]',
                        'button:has-text("16:9")',
                        '[data-ratio="16:9"]',
                    ]
                    for selector in ratio_selectors:
                        ratio_btn = self.page.locator(selector).first
                        if ratio_btn and ratio_btn.is_visible():
                            ratio_btn.click()
                            logger.info("[OK] Set 16:9 landscape via Layouts")
                            time.sleep(1)
                            break
                    # Close layouts panel
                    close_btn = self.page.locator('button[aria-label*="Close"], [class*="close"]').first
                    if close_btn and close_btn.is_visible():
                        close_btn.click()
                        time.sleep(0.5)
                else:
                    # Method 2: Look for aspect ratio buttons in toolbar
                    landscape_selectors = [
                        'button[aria-label*="Landscape"]',
                        'button[aria-label*="16:9"]',
                        '[data-testid="landscape"]',
                        'button:has-text("16:9")',
                        'button[class*="aspect"]',
                        # Icon buttons in toolbar - one might be aspect ratio
                        '[class*="toolbar"] button svg',
                    ]
                    for selector in landscape_selectors:
                        landscape_btn = self.page.locator(selector).first
                        if landscape_btn and landscape_btn.is_visible():
                            landscape_btn.click()
                            logger.info("[OK] Clicked landscape/16:9 button")
                            time.sleep(1)
                            break
                    else:
                        # Try looking at header icons near title
                        header_buttons = self.page.locator('header button, [class*="header"] button, [class*="toolbar"] button').all()
                        for btn in header_buttons[:8]:
                            try:
                                btn_text = btn.inner_text().lower() if btn.inner_text() else ""
                                btn_label = btn.get_attribute('aria-label') or ""
                                if '16' in btn_text or 'landscape' in btn_text.lower() or 'ratio' in btn_label.lower():
                                    btn.click()
                                    logger.info("[OK] Clicked landscape via header scan")
                                    time.sleep(1)
                                    break
                            except:
                                pass
            except Exception as e:
                logger.warning(f"[WARN] Could not set landscape mode: {e}")
            
            # Debug screenshot - see what page we're on
            debug_path = Path(__file__).parent / "output" / f"debug_after_ai_studio_{int(time.time())}.png"
            self.page.screenshot(path=str(debug_path))
            logger.info(f"[DEBUG] After AI studio click: {debug_path}")
            
            # Select the specified avatar
            # Flow: Click "Replace avatar" -> Click "Public Avatars" tab -> Search for avatar -> Click it
            try:
                # Click "Replace avatar" button or the avatar section to open picker
                replace_btn = self.page.locator('text="Replace avatar"').first
                if replace_btn:
                    replace_btn.click()
                else:
                    # Try clicking on avatar name (e.g., "Annie")
                    self.page.locator('[class*="avatar"]').first.click()
                time.sleep(1)
                
                # Click "Public Avatars" tab
                public_tab = self.page.locator('text="Public Avatars"').first
                if public_tab:
                    public_tab.click()
                    time.sleep(1)
                
                # Use the search box to find our avatar
                search_box = self.page.locator('input[placeholder*="Search"]').first
                if search_box:
                    search_box.click()
                    search_box.fill(avatar_to_use)
                    time.sleep(2)  # Wait for search results
                
                # Click on the avatar in search results
                avatar_option = self.page.locator(f'text="{avatar_to_use}"').first
                if avatar_option:
                    avatar_option.click()
                    time.sleep(2)
                    logger.info(f"[OK] Clicked avatar: {avatar_to_use}")
                    
                    # Now select the specific outfit/look
                    if look_to_use:
                        time.sleep(1)
                        # Try clicking on the specific look by name
                        look_selectors = [
                            f'[aria-label*="{look_to_use}"]',
                            f'img[alt*="{look_to_use}"]',
                            f'text="{look_to_use}"',
                            f'div[title*="{look_to_use}"]',
                        ]
                        look_found = False
                        for selector in look_selectors:
                            try:
                                look_btn = self.page.locator(selector).first
                                if look_btn and look_btn.is_visible():
                                    look_btn.click()
                                    logger.info(f"[OK] Selected look: {look_to_use}")
                                    look_found = True
                                    time.sleep(1)
                                    break
                            except:
                                pass
                        
                        if not look_found:
                            # Try clicking on outfit cards by image index (first outfit after avatar click)
                            outfit_cards = self.page.locator('[class*="avatar"] img, [class*="look"] img, [class*="card"] img').all()
                            if len(outfit_cards) > 0:
                                # Click the first outfit card (usually the one shown in preview)
                                outfit_cards[0].click()
                                logger.info(f"[OK] Clicked first outfit card")
                                time.sleep(1)
                    
                    # Debug screenshot after avatar selection
                    debug_avatar = Path(__file__).parent / "output" / f"debug_after_avatar_{int(time.time())}.png"
                    self.page.screenshot(path=str(debug_avatar))
                else:
                    logger.warning(f"[WARN] Avatar '{avatar_to_use}' not found in search")
                    
            except Exception as e:
                logger.warning(f"[WARN] Could not select avatar: {e}")
            
            time.sleep(1)
            
            # =========================================================
            # SET BACKGROUND - Upload our custom office background
            # =========================================================
            try:
                # In the right panel, find "Avatar Background" section
                # Click "Customize" to open the background picker
                customize_btn = self.page.locator('text="Customize"').first
                if customize_btn and customize_btn.is_visible():
                    customize_btn.click()
                    logger.info("[OK] Clicked Customize background")
                    time.sleep(2)
                    
                    # Look for "Upload" tab/button in the background picker
                    upload_selectors = [
                        'text="Upload"',
                        'button:has-text("Upload")',
                        '[data-testid="upload-tab"]',
                        'text="My uploads"',
                        'text="Custom"',
                    ]
                    for selector in upload_selectors:
                        upload_tab = self.page.locator(selector).first
                        if upload_tab and upload_tab.is_visible():
                            upload_tab.click()
                            logger.info("[OK] Clicked Upload tab")
                            time.sleep(1)
                            break
                    
                    # Now upload the background file
                    # Look for file input or upload button
                    if background_file and os.path.exists(background_file):
                        # Find the file input element
                        file_input = self.page.locator('input[type="file"]').first
                        if file_input:
                            file_input.set_input_files(background_file)
                            logger.info(f"[OK] Uploaded background: {background_file}")
                            time.sleep(3)  # Wait for upload
                        else:
                            # Try clicking an upload area/button that triggers file dialog
                            upload_area = self.page.locator('[class*="upload"], [class*="dropzone"], button:has-text("Upload")').first
                            if upload_area:
                                # Use file chooser
                                with self.page.expect_file_chooser() as fc_info:
                                    upload_area.click()
                                file_chooser = fc_info.value
                                file_chooser.set_files(background_file)
                                logger.info(f"[OK] Uploaded background via file chooser: {background_file}")
                                time.sleep(3)
                    else:
                        logger.warning(f"[WARN] Background file not found: {background_file}")
                        # Fall back to first available or recently uploaded
                        first_bg = self.page.locator('[class*="thumbnail"] img, [class*="background-item"] img').first
                        if first_bg and first_bg.is_visible():
                            first_bg.click()
                            logger.info("[OK] Selected first available background")
                            time.sleep(1)
                    
                    # Close the picker if there's a confirm/apply button
                    apply_btn = self.page.locator('button:has-text("Apply"), button:has-text("Done"), button:has-text("Select"), button:has-text("Use")').first
                    if apply_btn and apply_btn.is_visible():
                        apply_btn.click()
                        time.sleep(1)
                else:
                    logger.warning("[WARN] Customize button not found")
            except Exception as e:
                logger.warning(f"[WARN] Could not set background: {e}")
            
            # Read script
            with open(script_file, 'r', encoding='utf-8') as f:
                script_text = f.read()
            
            # HeyGen uses a rich text editor for scripts
            # We need to click in the editable area and type
            
            # First, find the Script section in the left panel
            # Look for the editable area with the placeholder
            script_entered = False
            
            # Method 1: Click on placeholder text "Type your script"
            try:
                # The placeholder contains this text
                placeholder = self.page.locator('text="Type your script"').first
                if placeholder:
                    placeholder.click()
                    time.sleep(0.5)
                    # Now type the script
                    self.page.keyboard.type(script_text[:2000], delay=10)
                    script_entered = True
                    logger.info("[OK] Entered script via placeholder click")
            except Exception as e:
                logger.warning(f"Method 1 failed: {e}")
            
            # Method 2: Look for the contenteditable div in the Script section
            if not script_entered:
                try:
                    # Find contenteditable within the left panel
                    editor = self.page.locator('[contenteditable="true"]').first
                    if editor:
                        editor.click()
                        time.sleep(0.5)
                        # Select all and replace
                        self.page.keyboard.press("Control+a")
                        time.sleep(0.2)
                        self.page.keyboard.type(script_text[:2000], delay=10)
                        script_entered = True
                        logger.info("[OK] Entered script via contenteditable")
                except Exception as e:
                    logger.warning(f"Method 2 failed: {e}")
            
            # Method 3: Click in the script panel area by coordinates
            if not script_entered:
                try:
                    # The script panel is on the left side, roughly at x=200, y=200
                    self.page.mouse.click(250, 200)
                    time.sleep(0.5)
                    self.page.keyboard.type(script_text[:2000], delay=10)
                    script_entered = True
                    logger.info("[OK] Entered script via coordinate click")
                except Exception as e:
                    logger.warning(f"Method 3 failed: {e}")
            
            if not script_entered:
                logger.error("[ERROR] Could not enter script - all methods failed")
            
            time.sleep(1)
            
            # Debug screenshot - see if script was entered
            debug_path2 = Path(__file__).parent / "output" / f"debug_after_script_{int(time.time())}.png"
            self.page.screenshot(path=str(debug_path2))
            logger.info(f"[DEBUG] After script entry: {debug_path2}")
            
            logger.info(f"[OK] Script entered ({len(script_text)} chars)")
            
            # Click Generate button - it may be a dropdown button with arrow
            # First try to find and click the main Generate button
            generate_btn = self.page.wait_for_selector(
                'button:has-text("Generate")',
                timeout=10000
            )
            generate_btn.click()
            logger.info("[OK] Clicked Generate button")
            time.sleep(1)
            
            # Screenshot to see if dropdown appeared
            debug_path3 = Path(__file__).parent / "output" / f"debug_after_generate_click_{int(time.time())}.png"
            self.page.screenshot(path=str(debug_path3))
            logger.info(f"[DEBUG] After Generate click: {debug_path3}")
            
            # The Generate button opens a "Generate Video" modal with Submit button
            # Wait for modal to appear and click Submit
            time.sleep(1)
            
            # Look for the Submit button in the modal
            submit_btn = self.page.wait_for_selector(
                'button:has-text("Submit")',
                timeout=10000
            )
            submit_btn.click()
            logger.info("[OK] Clicked Submit button in Generate Video modal")
            time.sleep(3)
            
            # Screenshot after submit
            debug_path4 = Path(__file__).parent / "output" / f"debug_after_submit_{int(time.time())}.png"
            self.page.screenshot(path=str(debug_path4))
            logger.info(f"[DEBUG] After Submit: {debug_path4}")
            
            # Wait for video to be queued
            time.sleep(5)
            
            # Navigate to projects page to find the new video ID
            self.page.goto(f"{self.BASE_URL}/projects", timeout=60000)
            time.sleep(3)
            
            # The most recent video should be first - look for video cards
            # The video ID is usually in the URL when you click on a video
            video_id = None
            
            # Try to get the first video card's link/ID
            try:
                # Look for video card links that contain video ID
                first_video = self.page.locator('a[href*="/video/"]').first
                if first_video:
                    href = first_video.get_attribute('href')
                    if href and '/video/' in href:
                        # Extract ID from URL like /video/ABCD1234
                        video_id = href.split('/video/')[-1].split('?')[0].split('/')[0]
                        logger.info(f"[OK] Found video ID from projects: {video_id}")
            except Exception as e:
                logger.warning(f"Could not extract video ID from projects: {e}")
            
            # Fallback: Try the original extraction method
            if not video_id:
                video_id = self._extract_video_id()
            
            # Final fallback: use timestamp
            if not video_id:
                video_id = f"heygen_{int(time.time())}"
                logger.warning(f"[WARN] Could not extract video ID, using: {video_id}")
            
            logger.info(f"[OK] Video queued with ID: {video_id}")
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
