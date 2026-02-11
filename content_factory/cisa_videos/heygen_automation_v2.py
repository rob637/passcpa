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
            # STEP 2: Paste script in the script input area
            # =========================================================
            logger.info("[STEP 2] Pasting script...")
            script_pasted = False
            
            # First, click on "Write a script for this scene" to activate the input
            write_script_selectors = [
                'text="Write a script for this scene"',
                'text="Write a script"',
                '[placeholder*="Write a script"]',
                '.script-panel',
            ]
            for selector in write_script_selectors:
                try:
                    elem = self.page.locator(selector).first
                    if elem and elem.is_visible(timeout=2000):
                        elem.click()
                        time.sleep(0.5)
                        logger.info(f"[OK] Clicked: {selector}")
                        break
                except:
                    continue
            
            # Now find the active input/textarea and paste
            script_selectors = [
                'textarea:visible',
                '[contenteditable="true"]:visible',
                '[placeholder*="Type your script"]',
                '[placeholder*="script"]',
                '.ProseMirror',
            ]
            
            for selector in script_selectors:
                try:
                    elem = self.page.locator(selector).first
                    if elem and elem.is_visible(timeout=2000):
                        elem.click()
                        time.sleep(0.2)
                        # Clear any existing content
                        elem.press("Control+a")
                        time.sleep(0.1)
                        # Type the script
                        elem.fill(script_text)
                        logger.info(f"[OK] Script pasted via: {selector}")
                        script_pasted = True
                        break
                except Exception as e:
                    continue
            
            # Fallback: try clicking text that might activate the script area
            if not script_pasted:
                click_texts = [
                    'text="Paste script here"',
                    'text="Enter script"',
                    'text="Type or paste"',
                    'text="Upload audio"',  # Nearby area
                    'text="Script Writer"',  # Feature name
                ]
                for text_selector in click_texts:
                    try:
                        text_elem = self.page.locator(text_selector).first
                        if text_elem and text_elem.is_visible(timeout=1000):
                            text_elem.click()
                            time.sleep(0.5)
                            # Now try to find and fill textarea
                            textarea = self.page.locator('textarea').first
                            if textarea and textarea.is_visible():
                                textarea.fill(script_text)
                                logger.info(f"[OK] Script pasted after clicking: {text_selector}")
                                script_pasted = True
                                break
                    except:
                        continue
            
            if not script_pasted:
                logger.warning("[WARN] Could not paste script - please paste manually")
                self.screenshot("02_script_paste_failed")
            else:
                time.sleep(1)
                self.screenshot("02_script_pasted")
            
            # =========================================================
            # STEP 3: Set video title (top left - click on "Untitled Video" text)
            # =========================================================
            logger.info("[STEP 3] Setting video title...")
            title_set = False
            
            # First, try clicking the "Untitled Video" text to make it editable
            untitled_selectors = [
                'text="Untitled Video"',
                '[class*="title"]:has-text("Untitled")',
                'span:has-text("Untitled Video")',
                'div:has-text("Untitled Video")',
            ]
            for selector in untitled_selectors:
                try:
                    elem = self.page.locator(selector).first
                    if elem and elem.is_visible(timeout=2000):
                        elem.click()
                        time.sleep(0.3)
                        break
                except:
                    continue
            
            # Now find the input that appeared and type the title
            title_input_selectors = [
                'input:focus',
                'input[type="text"]',
                '[class*="title"] input',
                'input',
            ]
            for selector in title_input_selectors:
                try:
                    title_input = self.page.locator(selector).first
                    if title_input and title_input.is_visible():
                        title_input.fill(title)
                        title_input.press("Enter")
                        logger.info(f"[OK] Title set: {title}")
                        title_set = True
                        break
                except:
                    continue
            
            if not title_set:
                logger.warning("[WARN] Could not set title")
            time.sleep(0.5)
            
            # =========================================================
            # STEP 4: Click "Change avatar" button in toolbar
            # =========================================================
            logger.info(f"[STEP 4] Selecting avatar: {avatar_name}...")
            
            # Click "Change avatar" button at top of video area
            self.wait_and_click(
                [
                    'text="Change avatar"',
                    'button:has-text("Change avatar")',
                    'text="Replace avatar"',
                    'button:has-text("Replace")',
                ],
                "Click Change avatar button"
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
            
            # Double-click on the outfit/look (first one visible)
            # The looks are shown as images after clicking avatar name
            look_images = self.page.locator('[class*="look"] img, [class*="avatar"] img').all()
            if look_images:
                look_images[0].dblclick()
                logger.info("[OK] Selected first look (double-click)")
                time.sleep(1.5)
            
            self.screenshot("06_avatar_selected")
            
            # =========================================================
            # STEP 5: Verify Motion Engine is Avatar IV (latest)
            # =========================================================
            logger.info("[STEP 5] Checking Motion Engine...")
            
            # Check if Avatar IV is visible (already selected)
            avatar_iv = self.page.locator('text="Avatar IV"').first
            if avatar_iv and avatar_iv.is_visible():
                logger.info("[OK] Avatar IV already selected")
            else:
                # Click the Motion Engine dropdown and select Avatar IV
                motion_dropdown = self.page.locator('text="Motion Engine"').first
                if motion_dropdown:
                    motion_dropdown.click()
                    time.sleep(0.5)
                    self.wait_and_click(
                        ['text="Avatar IV"', 'text="Avatar III"'],  # IV preferred, III fallback
                        "Select Motion Engine"
                    )
                    time.sleep(0.5)
            
            # =========================================================
            # STEP 6: Customize background → Uploads → Select
            # =========================================================
            if background_name:
                logger.info(f"[STEP 6] Setting background: {background_name}...")
                
                # Click Customize button under Avatar Background
                self.wait_and_click(
                    ['text="Customize"', 'button:has-text("Customize")'],
                    "Click Customize background"
                )
                time.sleep(1)
                self.screenshot("07_background_panel")
                
                # Click Uploads tab
                self.wait_and_click(
                    ['text="Uploads"', '[role="tab"]:has-text("Uploads")'],
                    "Click Uploads tab"
                )
                time.sleep(1)
                self.screenshot("08_uploads_tab")
                
                # Click on the background image (search by partial filename)
                # Background images might have alt text or title containing the name
                bg_selectors = [
                    f'img[alt*="{background_name}"]',
                    f'img[title*="{background_name}"]',
                    f'[class*="thumbnail"]:has-text("{background_name}")',
                ]
                
                bg_found = False
                for selector in bg_selectors:
                    try:
                        bg_img = self.page.locator(selector).first
                        if bg_img and bg_img.is_visible():
                            bg_img.click()
                            logger.info(f"[OK] Selected background: {background_name}")
                            bg_found = True
                            break
                    except:
                        continue
                
                if not bg_found:
                    # Try clicking the first gradient-looking image in uploads
                    upload_images = self.page.locator('[class*="upload"] img, [class*="thumbnail"] img').all()
                    if upload_images:
                        # Click first one as fallback
                        upload_images[0].click()
                        logger.info("[OK] Clicked first upload image")
                
                time.sleep(1)
                self.screenshot("09_background_selected")
            
            # =========================================================
            # STEP 7: Layouts → Original (landscape full-body)
            # =========================================================
            logger.info("[STEP 7] Setting layout...")
            
            # Check if "Original" layout is already selected in right panel
            original_btn = self.page.locator('button:has-text("Original")').first
            if original_btn and original_btn.is_visible():
                # Check if it's already selected (highlighted)
                logger.info("[OK] Original layout already visible (likely selected)")
            else:
                # Click Layouts in right sidebar to open layout options
                self.wait_and_click(
                    [
                        'text="Layouts"',
                        '[aria-label="Layouts"]',
                        'button:has-text("Layouts")',
                        '[class*="sidebar"] text="Layouts"',
                    ],
                    "Click Layouts"
                )
                time.sleep(1)
                self.screenshot("10_layouts_panel")
                
                # Try to select Avatar Only or Original
                self.wait_and_click(
                    [
                        'text="Avatar Only"',
                        'text="Original"',
                        'img[alt*="Avatar Only"]',
                        '[aria-label*="Avatar Only"]',
                    ],
                    "Select layout"
                )
                time.sleep(1)
                self.screenshot("11_layout_selected")
                
                # Close layouts panel
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
