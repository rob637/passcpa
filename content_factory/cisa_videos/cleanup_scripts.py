#!/usr/bin/env python3
"""
Comprehensive cleanup of all 84 CISA video scripts.

Fixes:
1. Domain weight percentages (factual corrections)
2. Persona names (remove character names that don't match avatars)
3. Acronym pronunciation (spell out for TTS clarity)
4. SSML break tag format standardization
5. Awkward phrasing fixes
6. Consistent intro/outro patterns
"""

import os
import re
from pathlib import Path

SCRIPTS_DIR = Path(__file__).parent / "output" / "scripts_spoken"
BACKUP_DIR = Path(__file__).parent / "output" / "scripts_spoken_backup"

# ============================================================
# 1. ACRONYM PRONUNCIATION MAP
# Acronyms that TTS will mispronounce - replace with spaced letters
# Only replace standalone acronyms, not when part of expansions
# ============================================================
ACRONYM_MAP = {
    # Letter-by-letter acronyms (TTS will try to pronounce as words)
    r'\bRTO\b': 'R.T.O.',
    r'\bRTOs\b': 'R.T.O.s',
    r'\bRPO\b': 'R.P.O.',
    r'\bRPOs\b': 'R.P.O.s',
    r'\bMTD\b': 'M.T.D.',
    r'\bBCP\b': 'B.C.P.',
    r'\bDRP\b': 'D.R.P.',
    r'\bBIA\b': 'B.I.A.',
    r'\bKRI\b': 'K.R.I.',
    r'\bKRIs\b': 'K.R.I.s',
    r'\bKPI\b': 'K.P.I.',
    r'\bKPIs\b': 'K.P.I.s',
    r'\bSOC\b': 'S.O.C.',
    r'\bSOX\b': 'SOX',  # Actually pronounced "socks" - OK
    r'\bSLE\b': 'S.L.E.',
    r'\bALE\b': 'A.L.E.',
    r'\bNPV\b': 'N.P.V.',
    r'\bROI\b': 'R.O.I.',
    r'\bPKI\b': 'P.K.I.',
    r'\bVPN\b': 'V.P.N.',
    r'\bVPNs\b': 'V.P.N.s',
    r'\bIDS\b': 'I.D.S.',
    r'\bIPS\b': 'I.P.S.',
    r'\bDBA\b': 'D.B.A.',
    r'\bRFP\b': 'R.F.P.',
    r'\bSAM\b': 'S.A.M.',
    r'\bERM\b': 'E.R.M.',
    r'\bCIO\b': 'C.I.O.',
    r'\bCFO\b': 'C.F.O.',
    r'\bCEO\b': 'C.E.O.',
    r'\bCISO\b': 'C.I.S.O.',
    r'\bSDLC\b': 'S.D.L.C.',
    r'\bUAT\b': 'U.A.T.',
    r'\bQA\b': 'Q.A.',
    r'\bAPO\b': 'A.P.O.',
    r'\bBAI\b': 'B.A.I.',
    r'\bDSS\b': 'D.S.S.',
    r'\bMEA\b': 'M.E.A.',
    r'\bEDM\b': 'E.D.M.',
    r'\bAES\b': 'A.E.S.',
    r'\bDES\b': 'D.E.S.',
    r'\bRSA\b': 'R.S.A.',
    r'\bSHA\b': 'S.H.A.',
    r'\bECC\b': 'E.C.C.',
    r'\bMAC\b': 'M.A.C.',
    r'\bDAC\b': 'D.A.C.',
    r'\bRBAC\b': 'R-back',
    r'\bABAC\b': 'A-back',
    r'\bPDC\b': 'P.D.C.',
    r'\bDR\b(?!\.)': 'D.R.',  # "DR" but not "DR." already
    r'\bPM\b': 'P.M.',

    # Acronyms pronounced as words (already sound right) - keep as-is
    # COBIT -> "KOH-bit" ✅
    # ITIL -> "EYE-til" ✅
    # HIPAA -> "HIP-ah" ✅
    # GDPR -> needs help
    r'\bGDPR\b': 'G.D.P.R.',
    # SIEM -> should be "seem"
    r'\bSIEM\b': 'SEEM',
    # COSO -> "KOH-so" ✅
    # ISACA -> "eye-SAH-kah" ✅
    # CISA -> "SEE-sah" ✅

    # "IS audit" -> "I.S. audit" (otherwise sounds like "is audit")
    r'\bIS audit': 'I.S. audit',
    r'\bIS Audit': 'I.S. Audit',
    r'\bIS auditor': 'I.S. auditor',
    r'\bIS Auditor': 'I.S. Auditor',
    r'\ban IS ': 'an I.S. ',
    r'\bthe IS ': 'the I.S. ',
    
    # IaaS/PaaS/SaaS - spell out
    r'\bIaaS\b': 'I-A-A-S',
    r'\bPaaS\b': 'P-A-A-S',
    r'\bSaaS\b': 'S-A-A-S',
    
    # ISMS
    r'\bISMS\b': 'I.S.M.S.',
}

# ============================================================
# 2. DOMAIN WEIGHT CORRECTIONS
# Correct CISA 2024 exam weights
# ============================================================
DOMAIN_WEIGHT_FIXES = {
    # Script 05 - Domain 2: says 17% / 25 questions -> should be 16% / 24
    "05_Domain_2_Overview_IT_Governance_spoken.txt": [
        ("seventeen percent", "sixteen percent"),
        ("roughly twenty-five questions", "roughly twenty-four questions"),
    ],
    # Script 09 - Domain 3: says 12% -> should be 18%
    "09_Domain_3_Overview_Building_Systems_spoken.txt": [
        ("At twelve percent, this is the smallest domain", "At eighteen percent, this is an important domain"),
    ],
    # Script 11 - Domain 4: says 23% / 34 questions -> should be 20% / 30
    "11_Domain_4_Overview_Keeping_IT_Running_spoken.txt": [
        ("twenty-three percent", "twenty percent"),
        ("roughly thirty-four questions", "roughly thirty questions"),
    ],
    # Script 15 - Domain 5: says 27% / 40 questions -> should be 25% / 37-38
    "15_Domain_5_Overview_Protecting_Information_Assets_spoken.txt": [
        ("twenty-seven percent", "twenty-five percent"),
        ("roughly forty questions", "roughly thirty-seven questions"),
    ],
}

# ============================================================
# 3. PERSONA NAME REMOVALS
# Remove character names that don't match the avatar speaking
# ============================================================
PERSONA_FIXES = {
    "01_Domain_1_Overview_The_IS_Audit_Process_spoken.txt": [
        ("I'm Marcus, and I've been conducting IS audits for over fifteen years.",
         "I've been conducting I.S. audits for over fifteen years."),
    ],
    "05_Domain_2_Overview_IT_Governance_spoken.txt": [
        ("I'm Sarah, and I specialize in IT governance frameworks.",
         "Let's dive into IT governance frameworks."),
    ],
    "11_Domain_4_Overview_Keeping_IT_Running_spoken.txt": [
        ("I'm David, and I've spent my career keeping critical systems running.",
         "This domain is all about keeping critical systems running."),
    ],
    "15_Domain_5_Overview_Protecting_Information_Assets_spoken.txt": [
        ("I'm Nicole, and security is my specialty.",
         "Security is the focus of this critical domain."),
    ],
    "18_How_ISACA_Writes_Questions_spoken.txt": [
        ("I'm James, and I'm going to share insider knowledge",
         "Let me share insider knowledge"),
    ],
}

# ============================================================
# 4. PHRASING FIXES
# Fix awkward or problematic phrasing
# ============================================================
PHRASING_FIXES = {
    "02_Domain_1_Memory_Aids_spoken.txt": [
        # "Judgmental is judgmental" sounds like a self-correction
        ("Statistical is mathematical. Judgmental is judgmental.",
         "Statistical is mathematical. Judgmental relies on your professional expertise."),
        # The recap also has it
        ("Statistical is mathematical. I Can Detect",
         "Statistical uses math, judgmental uses expertise. I Can Detect"),
    ],
}

# ============================================================
# 5. SSML FORMAT STANDARDIZATION
# Normalize break tags to consistent format: <break time='0.8s'/>
# ============================================================
def normalize_breaks(text):
    """Standardize all break tag formats."""
    # Pattern: <break time='X.Xs' /> or <break time='X.Xs'/> (with or without space before />)
    # Also handle multiline break tags that appear on their own line
    
    # Remove standalone break tags on their own lines (from gap scripts 75-84)
    # These create empty paragraphs with just a break
    text = re.sub(r'\n\n<break time=\'[^\']+\' />\n\n', " <break time='1s'/> ", text)
    text = re.sub(r'\n\n<break time=\'[^\']+\' />\n', " <break time='0.8s'/> ", text)
    text = re.sub(r'\n<break time=\'[^\']+\' />\n', " <break time='0.8s'/> ", text)
    
    # Normalize format: <break time='0.5s' /> -> <break time='0.5s'/>
    text = re.sub(r"<break time='([^']+)'\s*/>", r"<break time='\1'/>", text)
    
    # Remove excessive newlines (gap scripts have lots of blank lines)
    text = re.sub(r'\n{2,}', ' ', text)
    
    # Clean up any double spaces
    text = re.sub(r'  +', ' ', text)
    
    return text.strip()


def apply_acronym_fixes(text):
    """Apply all acronym pronunciation fixes."""
    for pattern, replacement in ACRONYM_MAP.items():
        text = re.sub(pattern, replacement, text)
    return text


def apply_targeted_fixes(text, fixes_list):
    """Apply targeted string replacements."""
    for old, new in fixes_list:
        text = text.replace(old, new)
    return text


def process_script(filepath):
    """Process a single script file with all fixes."""
    fname = filepath.name
    
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    
    original = text
    changes = []
    
    # 1. Normalize SSML breaks first
    text = normalize_breaks(text)
    if text != original:
        changes.append("SSML break format")
    
    # 2. Domain weight fixes
    if fname in DOMAIN_WEIGHT_FIXES:
        for old, new in DOMAIN_WEIGHT_FIXES[fname]:
            if old in text:
                text = text.replace(old, new)
                changes.append(f"domain weight: '{old}' -> '{new}'")
    
    # 3. Persona name fixes
    if fname in PERSONA_FIXES:
        for old, new in PERSONA_FIXES[fname]:
            if old in text:
                text = text.replace(old, new)
                changes.append(f"persona: removed name")
    
    # 4. Phrasing fixes
    if fname in PHRASING_FIXES:
        for old, new in PHRASING_FIXES[fname]:
            if old in text:
                text = text.replace(old, new)
                changes.append(f"phrasing fix")
    
    # 5. Acronym pronunciation (do this last to avoid mangling other fixes)
    before_acronyms = text
    text = apply_acronym_fixes(text)
    if text != before_acronyms:
        changes.append("acronym pronunciation")
    
    return text, changes


def main():
    import shutil
    
    # Create backup
    if not BACKUP_DIR.exists():
        print(f"Backing up scripts to {BACKUP_DIR}...")
        shutil.copytree(SCRIPTS_DIR, BACKUP_DIR)
        print("Backup complete.\n")
    else:
        print("Backup already exists, skipping backup.\n")
    
    # Process all scripts
    total_changes = 0
    files_changed = 0
    
    for filepath in sorted(SCRIPTS_DIR.glob("*.txt")):
        new_text, changes = process_script(filepath)
        
        if changes:
            files_changed += 1
            total_changes += len(changes)
            print(f"[FIX] {filepath.name}")
            for c in changes:
                print(f"      - {c}")
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_text)
    
    print(f"\n{'='*60}")
    print(f"CLEANUP COMPLETE")
    print(f"  Files modified: {files_changed} / {len(list(SCRIPTS_DIR.glob('*.txt')))}")
    print(f"  Total changes: {total_changes}")
    print(f"  Backup at: {BACKUP_DIR}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
