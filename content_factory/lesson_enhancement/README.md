# VoraPrep Lesson Enhancement System

Automated system to enhance CPA lessons with interactive elements using Google Gemini AI.

## Features Generated

| Type | Description | Example |
|------|-------------|---------|
| **Knowledge Check** | Inline quiz with 4 options | "Which qualitative characteristic...?" |
| **Reveal** | Click-to-reveal hidden answer | "What are the 5 steps of revenue recognition?" |
| **Comparison** | Side-by-side distinctions | Revenue vs. Gain |
| **Practice Link** | Link to related questions | "Try 5 questions on depreciation" |
| **Flowchart** | Interactive decision tree | Lease classification |
| **Calculation** | Fill-in-the-blank math | Depreciation calculation |

## Quick Start

### 1. Set up environment

```bash
cd content_factory/lesson_enhancement

# Ensure you have the Gemini API key set
export GEMINI_API_KEY="your-api-key"
# Or it will read from ../.env (VITE_GEMINI_API_KEY)

# Install dependencies if needed
pip install google-generativeai
```

### 2. Test with a single lesson

```bash
# Dry run - see what would be generated
python enhance_lessons.py --lesson FAR-I-001 --dry-run

# Generate enhancements for one lesson
python enhance_lessons.py --lesson FAR-I-001
```

### 3. Run full batch (background)

```bash
# Process all sections (runs in background)
nohup python run_batch.py --all > enhancement.log 2>&1 &

# Check progress
python run_batch.py --status

# Or tail the log
tail -f enhancement.log
```

### 4. Review and merge

```bash
# Preview changes (dry run)
python merge_enhancements.py --section FAR --dry-run

# Apply enhancements to lesson files
python merge_enhancements.py --section FAR

# Or merge all at once
python merge_enhancements.py --all
```

## File Structure

```
content_factory/lesson_enhancement/
├── enhance_lessons.py      # Gemini enhancement generator
├── merge_enhancements.py   # Merge JSON into TypeScript files
├── run_batch.py           # Batch runner with progress tracking
├── README.md              # This file
└── output/
    ├── progress.json      # Checkpoint file for resume
    └── enhanced/          # Generated enhancement JSON files
        ├── far/
        │   ├── FAR-I-001.json
        │   ├── FAR-I-002.json
        │   └── ...
        ├── aud/
        └── ...
```

## Commands Reference

### enhance_lessons.py

```bash
# Single lesson
python enhance_lessons.py --lesson FAR-I-001

# Entire section
python enhance_lessons.py --section FAR

# All sections
python enhance_lessons.py --all

# Options
--dry-run     # Don't write output files
--resume      # Resume from checkpoint
```

### merge_enhancements.py

```bash
# Single lesson
python merge_enhancements.py --lesson FAR-I-001

# Entire section
python merge_enhancements.py --section FAR

# All sections
python merge_enhancements.py --all

# Options
--dry-run     # Preview without modifying files
```

### run_batch.py

```bash
# Check progress
python run_batch.py --status

# Run in background
nohup python run_batch.py --all > enhancement.log 2>&1 &

# Resume interrupted run
python run_batch.py --all --resume
```

## Time Estimates

- ~4 seconds per lesson (rate limited)
- FAR: ~65 lessons = ~4.5 minutes
- All sections: ~303 lessons = ~20-25 minutes

## Troubleshooting

### JSON Parse Errors
The Gemini response sometimes includes markdown code blocks. The script auto-strips these, but if issues persist, check the raw response in the logs.

### Rate Limiting
The script waits 4 seconds between API calls. If you hit rate limits, increase `REQUEST_DELAY` in enhance_lessons.py.

### Resume After Crash
The script checkpoints to `output/progress.json`. Use `--resume` to continue where you left off:
```bash
python enhance_lessons.py --section FAR --resume
```

### Backups
Original lesson files are backed up to `backups/` before merging. To restore:
```bash
cp backups/far_20260228_143022.ts ../../../src/data/cpa/lessons/far.ts
```

## Manual Review

After generation, review the JSON files in `output/enhanced/` before merging. Key things to check:

1. **Knowledge checks**: Are questions clear? Is the correct answer actually correct?
2. **Comparisons**: Do the distinctions make sense?
3. **Flowcharts**: Are decision paths logical?
4. **Calculations**: Are the numbers correct?

You can edit the JSON files directly before running the merge.
