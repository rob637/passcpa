# CISA Video Pipeline - Quick Reference

**Last Updated:** 2026-02-11

## Current Status

- ✅ 10 scripts generated (`output/scripts/*_clean.txt`)
- ✅ 4 gradient backgrounds created (`assets/backgrounds/`)
- ✅ 4 avatars configured (Sarah, Emma, David, Marcus)
- ⏳ Need to run automation locally (not in Codespaces)

---

## Avatars

| HeyGen ID | Display Name | Gender |
|-----------|--------------|--------|
| Freja | Sarah | Female |
| Tahlia | Emma | Female |
| Bruce | David | Male |
| Esmond | Marcus | Male |

---

## Backgrounds

Located in `assets/backgrounds/`:

| File | Style |
|------|-------|
| `bg_corporate_blue.png` | Deep blue → navy gradient |
| `bg_modern_teal.png` | Teal gradient |
| `bg_slate_gray.png` | Neutral gray gradient |
| `bg_executive_dark.png` | Navy → charcoal gradient |

**Important:** Upload these to HeyGen's "Uploads" section before running automation.

---

## Scripts

Located in `output/scripts/`:

| # | Topic | Words | Duration |
|---|-------|-------|----------|
| 01 | Outsourcing | ~1000 | ~6-7 min |
| 02 | Risk-Based Audit Planning | ~850 | ~5-6 min |
| 03 | Third-Party Audits | ~820 | ~5-6 min |
| 04 | Physical Security Audit | ~920 | ~6 min |
| 05 | Fraud | ~770 | ~5 min |
| 06 | IT General Controls | ~1060 | ~7 min |
| 07 | Cloud Audit | ~1130 | ~7-8 min |
| 08 | Audit Materiality | ~870 | ~6 min |
| 09 | Estimation | ~950 | ~6 min |
| 10 | System Modeling | ~790 | ~5 min |

Use `*_clean.txt` versions (no SSML tags).

---

## Run Locally

### Prerequisites

```bash
# On your local machine (not Codespaces)
cd passcpa/content_factory/cisa_videos
pip install -r requirements.txt
playwright install chromium
```

### First-Time HeyGen Login

```bash
python test_login.py
# Browser opens → Log in with Google → Session saved
```

### Create Videos

```bash
# Use pre-generated scripts (recommended)
python orchestrator.py --use-scripts --batch-size 1

# Or generate new scripts + create videos
python orchestrator.py --batch-size 5
```

---

## Manual Video Creation (HeyGen Web)

If automation fails:

1. Go to https://app.heygen.com/projects
2. Click **Create** → **Create in AI studio**
3. Click **Layouts** (right sidebar) → Select **16:9** aspect ratio
4. Click **Layouts** → Select **Avatar Only** (prevents head cropping)
5. Search avatar: `Tahlia`, `Freja`, `Bruce`, or `Esmond`
6. Select an outfit (e.g., "Tahlia Front")
7. Click background area → **Uploads** tab → Select your gradient background
8. Paste script from `output/scripts/XX_Topic_clean.txt`
9. Click **Generate**
10. Wait 5-15 min for rendering

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Heads cut off | Select **Avatar Only** layout |
| Wrong background | Click **Uploads** tab (not Stock) |
| Portrait mode | Set **16:9** in Layouts panel |
| Script error | Use `*_clean.txt` versions (no SSML tags) |
| "Workflow error" | HeyGen backend issue - retry |

---

## Files Reference

```
content_factory/cisa_videos/
├── orchestrator.py      # Main pipeline controller
├── config.py            # Avatars, backgrounds, settings
├── generate_scripts.py  # Gemini script generation
├── heygen_automation.py # Browser automation
├── assets/backgrounds/  # Upload these to HeyGen
└── output/scripts/      # Ready-to-use scripts
```
