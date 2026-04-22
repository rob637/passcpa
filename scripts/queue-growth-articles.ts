#!/usr/bin/env node

import fs from 'fs';
import os from 'os';
import path from 'path';
import { pathToFileURL } from 'url';

type Brief = {
  id: string;
  title: string;
  slug: string;
  courseId: string;
  section?: string;
  contentType: string;
  targetKeywords: string[];
  primaryKeyword: string;
  searchIntent: string;
  estimatedVolume: number;
  competitorUrls: string[];
  outline: Array<{ heading: string; level: 2 | 3; keyPoints: string[]; wordCount: number }>;
  wordCountTarget: number;
  internalLinks: string[];
  ctaType: string;
  ctaUrl: string;
  status: string;
  priority: number;
  createdAt?: Date;
  updatedAt?: Date;
};

type LiveDocInfo = {
  id: string;
  slug: string;
  status: string;
};

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {
    limit: 25,
    course: '',
    queuePublishedSlug: '90-day-cpa-study-plan-2026',
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--limit' && args[i + 1]) {
      parsed.limit = Number(args[++i]) || parsed.limit;
    } else if (arg === '--course' && args[i + 1]) {
      parsed.course = args[++i];
    } else if (arg === '--queue-published-slug' && args[i + 1]) {
      parsed.queuePublishedSlug = args[++i];
    }
  }

  return parsed;
}

function toFirestoreValue(value: unknown): any {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) return { timestampValue: value.toISOString() };
  if (Array.isArray(value)) {
    const values = value.map((v) => toFirestoreValue(v)).filter(Boolean);
    return values.length ? { arrayValue: { values } } : { arrayValue: {} };
  }
  if (typeof value === 'string') return { stringValue: value };
  if (typeof value === 'boolean') return { booleanValue: value };
  if (typeof value === 'number') {
    return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  }
  if (typeof value === 'object') {
    const fields: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      const converted = toFirestoreValue(val);
      if (converted !== null) fields[key] = converted;
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(value) };
}

async function getAccessToken(): Promise<string> {
  const configPath = path.join(os.homedir(), '.config', 'configstore', 'firebase-tools.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const refreshToken = config.tokens?.refresh_token;

  if (!refreshToken) {
    throw new Error('Firebase CLI refresh token not found. Run `firebase login --reauth`.');
  }

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: '563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com',
      client_secret: 'j9iVZfS8kkCEFUPaAeJV0sAi',
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) {
    throw new Error(`Could not refresh Google access token: ${await response.text()}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function getGeminiKey(accessToken: string): Promise<string> {
  const response = await fetch(
    'https://secretmanager.googleapis.com/v1/projects/voraprep-prod/secrets/GEMINI_API_KEY/versions/latest:access',
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

  if (!response.ok) {
    throw new Error(`Could not access production Gemini key: ${await response.text()}`);
  }

  const data = await response.json();
  return Buffer.from(data.payload.data, 'base64').toString('utf8').trim();
}

async function getLiveDocs(accessToken: string): Promise<Map<string, LiveDocInfo>> {
  const response = await fetch(
    'https://firestore.googleapis.com/v1/projects/voraprep-prod/databases/(default)/documents/growth_content?pageSize=500',
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

  if (!response.ok) {
    throw new Error(`Could not load growth_content docs: ${await response.text()}`);
  }

  const data = await response.json();
  const docs = new Map<string, LiveDocInfo>();

  for (const doc of data.documents || []) {
    const fields = doc.fields || {};
    const slug = fields.slug?.stringValue;
    const status = fields.status?.stringValue || 'unknown';
    const id = doc.name?.split('/').pop();

    if (slug && id) {
      docs.set(slug, { id, slug, status });
    }
  }

  return docs;
}

async function writeDoc(accessToken: string, docId: string, payload: Record<string, unknown>) {
  const response = await fetch(
    'https://firestore.googleapis.com/v1/projects/voraprep-prod/databases/(default)/documents:commit',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        writes: [
          {
            update: {
              name: `projects/voraprep-prod/databases/(default)/documents/growth_content/${docId}`,
              fields: Object.fromEntries(
                Object.entries(payload)
                  .map(([key, value]) => [key, toFirestoreValue(value)])
                  .filter(([, value]) => value !== null),
              ),
            },
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Firestore write failed for ${docId}: ${await response.text()}`);
  }
}

async function generateArticle(prompt: string, geminiKey: string): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8192,
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Gemini generation failed: ${await response.text()}`);
  }

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.map((part: any) => part.text || '').join('').trim();

  if (!content) {
    throw new Error('Gemini returned empty content.');
  }

  return content;
}

async function main() {
  const { limit, course, queuePublishedSlug } = parseArgs();

  const moduleUrl = pathToFileURL(path.resolve(process.cwd(), 'src/services/growth/contentEngine.ts')).href;
  const growthModule = await import(moduleUrl) as {
    generateFullContentMatrix: () => Brief[];
    buildContentGenerationPrompt: (brief: Brief) => string;
  };

  const accessToken = await getAccessToken();
  const geminiKey = await getGeminiKey(accessToken);
  const liveDocs = await getLiveDocs(accessToken);

  // Undo any accidental immediate publish so it stays queued instead.
  if (queuePublishedSlug && liveDocs.has(queuePublishedSlug)) {
    const existing = liveDocs.get(queuePublishedSlug)!;
    if (existing.status === 'published') {
      await writeDoc(accessToken, existing.id, {
        slug: existing.slug,
        status: 'approved',
        updatedAt: new Date(),
      });
      console.log(`↺ Moved ${queuePublishedSlug} back to approved queue.`);
      existing.status = 'approved';
    }
  }

  const allBriefs = growthModule.generateFullContentMatrix();
  const candidates = allBriefs
    .filter((brief) => !course || brief.courseId === course)
    .filter((brief) => {
      const existing = liveDocs.get(brief.slug);
      return !existing || ['brief', 'draft', 'review', 'unknown'].includes(existing.status);
    })
    .sort((a, b) => a.priority - b.priority || a.wordCountTarget - b.wordCountTarget || a.title.localeCompare(b.title))
    .slice(0, limit);

  console.log(`Queueing ${candidates.length} article(s)${course ? ` for ${course}` : ''}...`);

  let success = 0;
  let failed = 0;
  const failures: Array<{ slug: string; error: string }> = [];

  for (let i = 0; i < candidates.length; i++) {
    const brief = candidates[i];
    try {
      const prompt = growthModule.buildContentGenerationPrompt(brief);
      let generated = '';
      let lastError: Error | null = null;

      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          generated = await generateArticle(prompt, geminiKey);
          break;
        } catch (error) {
          lastError = error as Error;
          if (attempt < 3) {
            await new Promise((resolve) => setTimeout(resolve, 1500 * attempt));
          }
        }
      }

      if (!generated) {
        throw lastError || new Error('Failed to generate content.');
      }

      const now = new Date();
      const metaDescription = generated.match(/^(?:\*\*)?Meta\s*Description:?\*?\*?\s*(.+)$/im)?.[1]?.trim() || brief.primaryKeyword;
      const docId = liveDocs.get(brief.slug)?.id || brief.id;

      await writeDoc(accessToken, docId, {
        ...brief,
        status: 'approved',
        generatedContent: generated,
        metaTitle: `${brief.title} | VoraPrep`.slice(0, 60),
        metaDescription,
        author: 'VoraPrep Team',
        generatedAt: now,
        updatedAt: now,
        wordCount: generated.split(/\s+/).filter(Boolean).length,
        generatedBy: 'gemini-2.0-flash',
        distribution: {
          blog: { status: 'pending' },
          rss: { status: 'pending' },
          linkedin: { status: 'pending' },
        },
      });

      success++;
      console.log(`[${i + 1}/${candidates.length}] queued → ${brief.slug}`);
      await new Promise((resolve) => setTimeout(resolve, 350));
    } catch (error) {
      failed++;
      failures.push({
        slug: brief.slug,
        error: error instanceof Error ? error.message : String(error),
      });
      console.log(`[${i + 1}/${candidates.length}] failed → ${brief.slug}`);
    }
  }

  console.log('\nQueue job complete.');
  console.log(JSON.stringify({ requested: limit, success, failed, failures }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
