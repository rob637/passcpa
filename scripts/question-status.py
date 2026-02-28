#!/usr/bin/env python3
"""
Question Bank Status Report
Shows quality metrics and enhancement progress for all 6 exams.
Run: python3 scripts/question-status.py
"""

import json
import os
import subprocess

def analyze_section(exam, section):
    path = f'content/{exam}/{section}/questions.json'
    if not os.path.exists(path):
        return None
    
    data = json.load(open(path))['questions']
    total = len(data)
    if total == 0:
        return None
    
    deep_ww = 0
    has_edu = 0
    
    for q in data:
        ww = q.get('whyWrong', {})
        if ww:
            vals = [v for v in ww.values() if v is not None]
            if vals and all(len(v) >= 80 for v in vals):
                deep_ww += 1
        
        if q.get('educational') and len(q.get('educational', '') or '') > 50:
            has_edu += 1
    
    return {
        'total': total,
        'deep_ww': deep_ww,
        'edu': has_edu
    }

def get_blueprint_coverage(exam):
    """Run blueprint coverage script and parse output"""
    try:
        result = subprocess.run(
            ['node', 'scripts/blueprint-coverage.cjs', '--exam', exam],
            capture_output=True, text=True, timeout=30
        )
        output = result.stdout + result.stderr
        
        import re
        areas_match = re.search(r'Blueprint Areas: (\d+)/(\d+)', output)
        
        if areas_match:
            covered, total = int(areas_match.group(1)), int(areas_match.group(2))
            area_pct = 100 * covered / total if total > 0 else 0
        else:
            area_pct = 0
        
        return area_pct
    except:
        return 0

def main():
    # Define all exams and sections
    exams = {
        'cpa': ['far', 'aud', 'reg', 'tcp', 'isc', 'bar'],
        'ea': ['see1', 'see2', 'see3'],
        'cma': ['cma1', 'cma2'],
        'cia': ['cia1', 'cia2', 'cia3'],
        'cisa': ['cisa1', 'cisa2', 'cisa3', 'cisa4', 'cisa5'],
        'cfp': ['CFP-EST', 'CFP-GEN', 'CFP-INV', 'CFP-PCR', 'CFP-PSY', 'CFP-RET', 'CFP-RISK', 'CFP-TAX']
    }

    # Get blueprint coverage for each exam
    print("Analyzing...", flush=True)
    blueprint_data = {}
    for exam in exams.keys():
        blueprint_data[exam] = get_blueprint_coverage(exam)

    print()
    print(f"{'Exam':<6} {'Section':<10} {'Qs':>6} {'WhyWrong':>9} {'Edu':>5} {'Blueprint':>10} {'Status':<14}")
    print("=" * 72)

    grand_total = {'total': 0, 'deep_ww': 0, 'edu': 0}

    for exam, sections in exams.items():
        exam_total = {'total': 0, 'deep_ww': 0, 'edu': 0}
        bp = blueprint_data.get(exam, 0)
        
        for section in sections:
            result = analyze_section(exam, section)
            if result:
                t = result['total']
                ww_pct = 100 * result['deep_ww'] / t
                edu_pct = 100 * result['edu'] / t
                
                # Determine status
                if ww_pct >= 95 and edu_pct >= 95:
                    status = "✅ Complete"
                elif ww_pct >= 50:
                    status = "⏳ Enhancing"
                else:
                    status = "❌ Needs work"
                
                print(f"{exam.upper():<6} {section:<10} {t:>6} {ww_pct:>8.0f}% {edu_pct:>4.0f}% {'':>10} {status:<14}")
                
                for k in exam_total:
                    exam_total[k] += result[k]
        
        # Exam subtotal with blueprint
        if exam_total['total'] > 0:
            t = exam_total['total']
            ww_pct = 100 * exam_total['deep_ww'] / t
            edu_pct = 100 * exam_total['edu'] / t
            bp_str = f"{bp:.0f}%"
            print(f"{'':6} {'SUBTOTAL':<10} {t:>6} {ww_pct:>8.0f}% {edu_pct:>4.0f}% {bp_str:>10}")
            print("-" * 72)
            
            for k in grand_total:
                grand_total[k] += exam_total[k]

    # Grand total
    print()
    t = grand_total['total']
    ww_pct = 100 * grand_total['deep_ww'] / t
    edu_pct = 100 * grand_total['edu'] / t
    print(f"{'TOTAL':<6} {'ALL':<10} {t:>6} {ww_pct:>8.0f}% {edu_pct:>4.0f}%")

    # Currently running processes
    print("\n" + "=" * 72)
    print("ENHANCEMENT STATUS:")
    ps = subprocess.run(['ps', 'aux'], capture_output=True, text=True)
    found = False
    for line in ps.stdout.split('\n'):
        if 'qbank-enhance' in line and 'grep' not in line:
            found = True
            if 'ea' in line.lower():
                print("  ⏳ EA - running")
            elif 'cfp' in line.lower():
                print("  ⏳ CFP - running")
            elif 'cpa' in line.lower():
                print("  ⏳ CPA - running")
        if 'run-cpa-after' in line and 'grep' not in line:
            found = True
            print("  ⏱️ CPA - queued (waiting for EA/CFP)")
    
    if not found:
        print("  No enhancements running")

if __name__ == '__main__':
    main()
