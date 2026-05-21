#!/usr/bin/env node
/**
 * sync-content-to-public.cjs
 *
 * Copies question banks (and flashcards) from `content/` into `public/data/`
 * so they ship as static assets served by Firebase Hosting instead of being
 * bundled into JavaScript chunks.
 *
 * Source layout (authored / committed):
 *   content/{course}/{section}/questions.json
 *   content/{course}/flashcards.json
 *
 * Destination layout (ephemeral; generated, gitignored):
 *   public/data/questions/{course}/{section}.json
 *   public/data/questions/manifest.json
 *   public/data/flashcards/{course}.json
 *
 * The manifest enables runtime listing of available sections per course
 * without `import.meta.glob` (which would force bundling).
 *
 * Run automatically via `npm run prebuild`. Safe to run repeatedly.
 */

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'content');
const OUT_QUESTIONS = path.join(ROOT, 'public', 'data', 'questions');
const OUT_FLASHCARDS = path.join(ROOT, 'public', 'data', 'flashcards');

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function rmIfDir(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}

function copyJson(src, dest) {
  // Validate JSON before copying — fail fast on malformed files.
  const raw = fs.readFileSync(src, 'utf8');
  JSON.parse(raw);
  ensureDir(path.dirname(dest));
  fs.writeFileSync(dest, raw);
  return Buffer.byteLength(raw, 'utf8');
}

function main() {
  if (!fs.existsSync(SRC)) {
    console.error(`[sync-content] content/ directory not found at ${SRC}`);
    process.exit(1);
  }

  rmIfDir(OUT_QUESTIONS);
  rmIfDir(OUT_FLASHCARDS);
  ensureDir(OUT_QUESTIONS);
  ensureDir(OUT_FLASHCARDS);

  const manifest = { courses: {} };
  let totalQuestionBytes = 0;
  let totalFlashcardBytes = 0;
  let questionFileCount = 0;
  let flashcardFileCount = 0;

  for (const course of fs.readdirSync(SRC).sort()) {
    const courseDir = path.join(SRC, course);
    const stat = fs.statSync(courseDir);
    if (!stat.isDirectory()) continue;

    const sections = [];
    for (const entry of fs.readdirSync(courseDir).sort()) {
      const entryPath = path.join(courseDir, entry);
      const entryStat = fs.statSync(entryPath);

      if (entryStat.isDirectory()) {
        const qFile = path.join(entryPath, 'questions.json');
        if (fs.existsSync(qFile)) {
          const dest = path.join(OUT_QUESTIONS, course, `${entry}.json`);
          const bytes = copyJson(qFile, dest);
          sections.push({ section: entry, bytes });
          totalQuestionBytes += bytes;
          questionFileCount++;
        }
      } else if (entry === 'flashcards.json') {
        const dest = path.join(OUT_FLASHCARDS, `${course}.json`);
        const bytes = copyJson(entryPath, dest);
        totalFlashcardBytes += bytes;
        flashcardFileCount++;
      }
    }

    if (sections.length > 0) {
      manifest.courses[course] = { sections };
    }
  }

  manifest.generatedAt = new Date().toISOString();
  fs.writeFileSync(
    path.join(OUT_QUESTIONS, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  const mb = (b) => (b / (1024 * 1024)).toFixed(2);
  console.log(
    `[sync-content] questions: ${questionFileCount} files, ${mb(totalQuestionBytes)} MB`
  );
  console.log(
    `[sync-content] flashcards: ${flashcardFileCount} files, ${mb(totalFlashcardBytes)} MB`
  );
  console.log(`[sync-content] manifest: ${Object.keys(manifest.courses).length} courses`);
}

main();
