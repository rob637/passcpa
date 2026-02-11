"""
HeyGen Automation v2 - Based on actual UI workflow (Feb 2026)

Workflow:
1. Create → Create in AI Studio
2. Paste script
3. Set video title
4. Replace avatar → Public Avatars → Search → Select
5. Verify Motion Engine = Avatar III
6. Customize background → Uploads → Select
7. Layouts → Avatar Only (landscape)
8. Save draft (or Generate)
"""
import os
import time
import logging
from pathlib import Path
from typing import Optional
from playwright.sync_api import sync_playwright, Browser, Page
from dotenv import load_dotenv

# Load environment
load_dotenv(Path(__file__).parent.parent.parent / '.env')
load_dotenv()

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')
logger = logging.getLogger('heygen_v2')

# HeyGen credentials
HEYGEN_EMAIL = os.getenv("HEYGEN_EMAIL")
HEYGEN_PASSWORD = os.getenv("HEYGEN_PASSWORD")

class HeyGenAutomationV2:
    """HeyGen browser automation - correct workflow based on UI screenshots."""
    
    BASE_URL = "https://app.heygen.com"
    
    def __init__(self, headless: bool = False):
        self.headless = headless
        self.browser: Optional[Browser] = None
        self.page: Optional[Page] = None
        self.playwright = None
        
    def start(self):
        """Start browser with persistent session."""
        browser_data = Path(__file__).parent / "browser_data"
        browser_data.mkdir(exist_ok=True)
        
        self.playwright = sync_playwright().start()
        self.browser = self.playwright.chromium.launch_persistent_context(
            str(browser_data),
            headless=self.headless,
            viewport={'width': 1920, 'height': 1080},
            args=['--start-maximized']
        )
        self.page = self.browser.pages[0] if self.browser.pages else self.browser.new_page()
        logger.info("[OK] Browser started")
        
    def stop(self):
        """Close browser."""
        if self.browser:
            self.browser.close()
        if self.playwright:
            self.playwright.stop()
        logger.info("[OK] Browser stopped")
        
    def screenshot(self, name: str):
        """Save debug screenshot."""
        path = Path(__file__).parent / "output" / f"debug_{name}_{int(time.time())}.png"
        self.page.screenshot(path=str(path))
        logger.info(f"[SCREENSHOT] {path}")
        return path
        
    def wait_and_click(self, selectors: list, description: str, timeout: int = 10) -> bool:
        """Try multiple selectors until one works."""
        for selector in selectors:
            try:
                elem = self.page.locator(selector).first
                if elem and elem.is_visible(timeout=timeout * 1000):
                    elem.click()
                    logger.info(f"[OK] {description} via: {selector}")
                    return True
            except:
                continue
        logger.warning(f"[WARN] Could not {description}")
        return False
    
    def _dismiss_popups(self):
        """Dismiss any popup modals that appear (e.g., 'Introducing Brand Systems')."""
        popup_close_selectors = [
            'button[aria-label="Close"]',
            'button[aria-label="close"]',
            '[class*="modal"] button:has-text("×")',
            '[class*="modal"] button:has-text("X")',
            '[class*="Modal"] svg[class*="close"]',
            '[role="dialog"] button:first-child',
            'button:near(:text("Introducing"))',
        ]
        
        for selector in popup_close_selectors:
            try:
                close_btn = self.page.locator(selector).first
                if close_btn and close_btn.is_visible(timeout=1000):
                    close_btn.click()
                    logger.info(f"[OK] Dismissed popup via: {selector}")
                    time.sleep(0.5)
                    return True
            except:
                continue
        
        # Try pressing Escape as fallback
        try:
            self.page.keyboard.press("Escape")
            logger.info("[OK] Dismissed popup via Escape key")
            time.sleep(0.5)
        except:
            pass
        
        return False
        
    def ensure_logged_in(self):
        """Check login status and wait for manual login if needed."""
        self.page.goto(f"{self.BASE_URL}/home", timeout=60000)
        time.sleep(3)
        
        if "/login" in self.page.url or "/signin" in self.page.url:
            logger.info("[!] Not logged in. Please log in manually...")
            # Wait for manual login (up to 5 minutes)
            for _ in range(60):
                time.sleep(5)
                if "/home" in self.page.url or "/create" in self.page.url:
                    logger.info("[OK] Login detected!")
                    return True
            raise TimeoutError("Login timeout")
        
        logger.info("[OK] Already logged in")
        return True
        
    def create_video_draft(
        self,
        script_text: str,
        title: str,
        avatar_name: str,
        background_name: str = None,
        save_draft: bool = True
    ) -> bool:
        """
        Create a video following the exact HeyGen UI workflow.
        
        Args:
            script_text: The script content to paste
            title: Video title
            avatar_name: Avatar to search for (e.g., "Bruce", "Freja", "Zosia")
            background_name: Background filename in Uploads (e.g., "bg_corporate_blue")
            save_draft: If True, save as draft. If False, click Generate.
            
        Returns: True if successful
        """
        logger.info(f"[CREATE] Starting: {title}")
        logger.info(f"         Avatar: {avatar_name}, Background: {background_name}")
        
        try:
            # =========================================================
            # STEP 1: Navigate to home and click Create → Create in AI Studio
            # =========================================================
            logger.info("[STEP 1] Opening AI Studio...")
            self.page.goto(f"{self.BASE_URL}/home", timeout=60000)
            time.sleep(3)
            
            # Click Create button
            self.wait_and_click(
                ['button:has-text("Create")', 'text="Create"'],
                "Click Create button"
            )
            time.sleep(1)
            
            # Click "Create in AI studio" from dropdown
            self.wait_and_click(
                ['text="Create in AI studio"', 'a:has-text("Create in AI studio")'],
                "Click Create in AI Studio"
            )
            time.sleep(5)  # Wait for editor to load
            self.screenshot("01_editor_loaded")
            
            # Dismiss any popup modals (e.g., "Introducing Brand Systems")
            self._dismiss_popups()
            
            # =========================================================
            # STEP 2: Set video title (single click on "Untitled Video")
            # =========================================================
            logger.info("[STEP 2] Setting video title...")
            
            try:
                # Single click on "Untitled Video" text to make it editable
                title_elem = self.page.locator('text="Untitled Video"').first
                if title_elem and title_elem.is_visible(timeout=3000):
                    title_elem.click()
                    time.sleep(0.3)
                    self.page.keyboard.type(title)
                    self.page.keyboard.press("Enter")
                    logger.info(f"[OK] Title set: {title}")
                else:
                    logger.warning("[WARN] Could not find Untitled Video text")
            except Exception as e:
                logger.warning(f"[WARN] Title error: {e}")
            
            time.sleep(0.5)
            
            # =========================================================
            # STEP 3: Paste script in the script input area
            # =========================================================
            logger.info("[STEP 3] Pasting script...")
            script_pasted = False
            
            # The script area is in the left panel under "Script" header
            # First find and click the script area to focus it
            
            # Try clicking directly on the placeholder text
            placeholder_selectors = [
                'text="Type your script or use"',
                'text="Type your script"',
                'text="Write a script for this scene"',
                '[placeholder*="Type your script"]',
                '[placeholder*="Write a script"]',
            ]
            
            for selector in placeholder_selectors:
                try:
                    elem = self.page.locator(selector).first
                    if elem and elem.is_visible(timeout=2000):
                        elem.click()
                        time.sleep(0.3)
                        logger.info(f"[OK] Clicked placeholder: {selector}")
                        break
                except:
                    continue
            
            # Now type/paste the script using keyboard
            # This is more reliable than fill() for rich text editors
            time.sleep(0.5)
            self.page.keyboard.press("Control+a")  # Select all
            time.sleep(0.1)
            
            # Use clipboard to paste (more reliable for long text)
            try:
                # Type the script - for rich text editors this is more reliable
                self.page.keyboard.type(script_text, delay=1)  # Small delay per char
                logger.info("[OK] Script typed via keyboard")
                script_pasted = True
            except Exception as e:
                logger.warning(f"[WARN] keyboard.type failed: {e}")
            
            # Fallback: try fill() on various input elements
            if not script_pasted:
                script_input_selectors = [
                    '.ProseMirror',
                    '[contenteditable="true"]',
                    'textarea',
                    '[class*="script"] [contenteditable]',
                    '[class*="editor"]',
                ]
                
                for selector in script_input_selectors:
                    try:
                        elem = self.page.locator(selector).first
                        if elem and elem.is_visible(timeout=1000):
                            elem.click()
                            time.sleep(0.2)
                            elem.fill(script_text)
                            logger.info(f"[OK] Script filled via: {selector}")
                            script_pasted = True
                            break
                    except:
                        continue
            
            if not script_pasted:
                logger.warning("[WARN] Could not paste script - please paste manually")
                self.screenshot("03_script_paste_failed")
            else:
                time.sleep(1)
                self.screenshot("03_script_pasted")
            
            # =========================================================
            # STEP 4: Click on avatar in main video, then click "Change avatar"
            # =========================================================
            logger.info(f"[STEP 4] Selecting avatar: {avatar_name}...")
            
            # First, click on the avatar in the main video area to select it
            # This shows the floating toolbar with "Change avatar" button
            try:
                # Click on the video/avatar area in center of screen
                video_area = self.page.locator('[class*="preview"], [class*="video"], [class*="canvas"]').first
                if video_area and video_area.is_visible():
                    video_area.click()
                    time.sleep(0.5)
                    logger.info("[OK] Clicked video area")
            except:
                pass
            
            # Now click "Change avatar" in the floating toolbar
            avatar_button_clicked = self.wait_and_click(
                [
                    'text="Change avatar"',
                    'button:has-text("Change avatar")',
                    'text="Replace avatar"',
                    'button:has-text("Replace")',
                ],
                "Click Change avatar button"
            )
            
            if not avatar_button_clicked:
                # Try clicking directly on "Avatar" label in the right sidebar
                self.wait_and_click(
                    ['text="Avatar"', '[class*="avatar"]'],
                    "Click Avatar in sidebar"
                )
            
            time.sleep(1.5)
            self.screenshot("03_avatar_panel")
            
            # Click Public Avatars tab
            self.wait_and_click(
                ['text="Public Avatars"', '[role="tab"]:has-text("Public")'],
                "Click Public Avatars tab"
            )
            time.sleep(1)
            
            # Search for avatar
            search_box = self.page.locator('input[placeholder*="Search"], input[type="search"]').first
            if search_box and search_box.is_visible():
                search_box.click()
                search_box.fill(avatar_name)
                logger.info(f"[OK] Searched for: {avatar_name}")
                time.sleep(2)  # Wait for search results
            
            self.screenshot("04_avatar_search")
            
            # Click on the avatar card (contains avatar name)
            avatar_card = self.page.locator(f'text="{avatar_name}"').first
            if avatar_card:
                avatar_card.click()
                logger.info(f"[OK] Clicked avatar: {avatar_name}")
                time.sleep(1.5)
            
            self.screenshot("05_avatar_looks")
            
            # SIMPLE: Just double-click on the first visible avatar image (outfit)
            # No retries, no fallbacks - one attempt
            time.sleep(1)  # Wait for looks to load
            
            try:
                # Find all visible images - the avatar outfit images
                imgs = self.page.locator('img').all()
                visible_imgs = [img for img in imgs if img.is_visible()]
                
                # Double-click the first visible outfit image
                if visible_imgs:
                    visible_imgs[0].dblclick()
                    logger.info(f"[OK] Double-clicked avatar outfit")
                    time.sleep(1)  # Brief wait for avatar to apply
                else:
                    logger.warning("[WARN] No avatar images visible")
            except Exception as e:
                logger.warning(f"[WARN] Avatar selection: {e}")
            
            self.screenshot("06_avatar_selected")
            
            # =========================================================
            # STEP 5: Set Motion Engine to Avatar III
            # =========================================================
            logger.info("[STEP 5] Setting Motion Engine to Avatar III...")
            
            try:
                # Click whatever Motion Engine is currently shown to open dropdown
                motion_clicked = self.wait_and_click(
                    [
                        'text="Avatar IV"',  # If IV is showing
                        'text="Avatar III"', # If III is showing  
                    ],
                    "Click Motion Engine dropdown"
                )
                
                if motion_clicked:
                    time.sleep(0.5)
                    # Select Avatar III
                    self.wait_and_click(
                        ['text="Avatar III"'],
                        "Select Avatar III"
                    )
                    time.sleep(0.5)
                    logger.info("[OK] Motion Engine set to Avatar III")
            except Exception as e:
                logger.warning(f"[WARN] Motion Engine: {e}")
            
            # =========================================================
            # STEP 6: Customize background → Uploads → Select
            # =========================================================
            if background_name:
                logger.info(f"[STEP 6] Setting background: {background_name}...")
                
                # First, close any open dropdowns by pressing Escape
                self.page.keyboard.press("Escape")
                time.sleep(0.5)
                
                # Scroll the right panel down to find "Avatar Background" section
                # The Customize button is under "Avatar Background" heading
                try:
                    sidebar = self.page.locator('[class*="sidebar"], [class*="panel"]').first
                    if sidebar:
                        sidebar.evaluate("e => e.scrollTop = 300")  # Scroll down
                        time.sleep(0.3)
                except:
                    pass
                
                # Click Customize button under Avatar Background
                customize_clicked = self.wait_and_click(
                    ['text="Customize"', 'button:has-text("Customize")', '[class*="customize"]'],
                    "Click Customize background"
                )
                
                if customize_clicked:
                    time.sleep(1)
                    self.screenshot("07_background_panel")
                    
                    # Click Uploads tab
                    self.wait_and_click(
                        ['text="Uploads"', '[role="tab"]:has-text("Uploads")', 'button:has-text("Uploads")'],
                        "Click Uploads tab"
                    )
                    time.sleep(1)
                    self.screenshot("08_uploads_tab")
                    
                    # DOUBLE-CLICK on uploaded background image
                    try:
                        imgs = self.page.locator('img').all()
                        visible_imgs = [img for img in imgs if img.is_visible()]
                        if visible_imgs:
                            visible_imgs[0].dblclick()
                            logger.info("[OK] Double-clicked background image")
                        else:
                            logger.warning("[WARN] No background images visible")
                    except Exception as e:
                        logger.warning(f"[WARN] Background: {e}")
                    
                    time.sleep(1)
                    self.screenshot("09_background_selected")
                else:
                    logger.warning("[WARN] Could not find Customize button - skipping background")
            
            # =========================================================
            # STEP 7: Layout check (skip if portrait is default)
            # =========================================================
            # Note: Portrait (9:16) may be the default in HeyGen AI Studio
            # Skip layout changes unless we detect landscape
            logger.info("[STEP 7] Layout check - assuming portrait is default, skipping...")
            
            # Close any open panels
            self.page.keyboard.press("Escape")
            time.sleep(0.5)
            
            # =========================================================
            # STEP 8: Save draft or Generate
            # =========================================================
            if save_draft:
                logger.info("[STEP 8] Saving as draft...")
                # Just navigating away should auto-save, or press Ctrl+S
                self.page.keyboard.press("Control+s")
                time.sleep(1)
                logger.info("[OK] Draft saved!")
            else:
                logger.info("[STEP 8] Clicking Generate...")
                self.wait_and_click(
                    ['text="Generate"', 'button:has-text("Generate")'],
                    "Click Generate"
                )
                time.sleep(2)
            
            self.screenshot("12_final")
            logger.info(f"[DONE] Video '{title}' created successfully!")
            return True
            
        except Exception as e:
            logger.error(f"[ERROR] Failed to create video: {e}")
            self.screenshot("error")
            return False
            
    def create_batch_drafts(self, videos: list, limit: int = None):
        """
        Create multiple video drafts.
        
        Args:
            videos: List of dicts with keys: script_text, title, avatar_name, background_name
            limit: Max number to create
        """
        if limit:
            videos = videos[:limit]
            
        logger.info(f"[BATCH] Creating {len(videos)} video drafts...")
        
        for i, video in enumerate(videos, 1):
            logger.info(f"\n{'='*60}")
            logger.info(f"[{i}/{len(videos)}] {video['title']}")
            logger.info(f"{'='*60}")
            
            success = self.create_video_draft(
                script_text=video['script_text'],
                title=video['title'],
                avatar_name=video['avatar_name'],
                background_name=video.get('background_name'),
                save_draft=True
            )
            
            if not success:
                logger.warning(f"[!] Failed video {i}, continuing...")
            
            # Small delay between videos
            time.sleep(2)
        
        logger.info(f"\n[BATCH COMPLETE] Created {len(videos)} drafts")


def main():
    """Test the automation with one video."""
    from pathlib import Path
    
    # Read a sample script
    scripts_dir = Path(__file__).parent / "output" / "scripts_spoken"
    sample_script = scripts_dir / "01_BCP_vs_DRP_spoken.txt"
    
    if not sample_script.exists():
        print(f"Script not found: {sample_script}")
        return
    
    script_text = sample_script.read_text()
    
    # Create automation instance
    automation = HeyGenAutomationV2(headless=False)
    
    try:
        automation.start()
        automation.ensure_logged_in()
        
        automation.create_video_draft(
            script_text=script_text,
            title="CISA - BCP vs DRP",
            avatar_name="Bruce",
            background_name="bg_corporate_blue",
            save_draft=True
        )
        
        print("\nDone! Check HeyGen for the draft.")
        input("Press Enter to close browser...")
        
    finally:
        automation.stop()


if __name__ == "__main__":
    main()
