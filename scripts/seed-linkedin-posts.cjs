#!/usr/bin/env node
/**
 * Seed LinkedIn Story Posts to Firestore
 * 
 * Adds story-style posts to the linkedin_story_posts collection.
 * These are non-promotional, storytelling posts designed for engagement.
 * 
 * Usage:
 *   node scripts/seed-linkedin-posts.cjs
 * 
 * The schedule function runs Mon/Wed/Fri at 9 AM EST.
 * Posts are picked in FIFO order (oldest scheduled first).
 */

const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin with default credentials
const serviceAccountPath = path.join(__dirname, '../service-account.json');

try {
  const serviceAccount = require(serviceAccountPath);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch {
  // Fall back to ADC
  admin.initializeApp();
}

const db = admin.firestore();

// Story posts to seed
const STORY_POSTS = [
  {
    type: 'founder-story',
    content: `I failed my CPA exam.

Not once. Twice.

The second time, I missed by 2 points. I sat in my car for 20 minutes before driving home.

The worst part? I'd spent $2,000 on a review course that wasn't working for me. I was doing questions, but I wasn't learning. I was memorizing patterns, not concepts.

That's when I started wondering:

→ What if questions explained WHY each wrong answer was wrong?
→ What if the system knew my weak spots better than I did?
→ What if I could ask "wait, I don't get this" and get an answer at 11pm?

I passed on my third attempt.

Then I built VoraPrep.

Now 10,000+ candidates use it to study smarter.

If you're struggling with the CPA exam, you're not alone. The system wasn't built for how you learn.

We're trying to change that.`,
    author: 'Rob',
  },
  {
    type: 'dear-candidate',
    content: `Dear CPA Candidate,

"I'll start studying tomorrow" is not a plan.

It's a coping mechanism.

I know because I said it 47 times before my FAR exam.

Tomorrow becomes next week.
Next week becomes "after this busy season."
After busy season becomes "I'll take it next window."

Next window becomes a decade.

Here's what I wish someone told me:

You don't need 4 hours.
You need 20 minutes.
Right now.
One topic.
Five questions.

The people who pass aren't smarter.
They just started.

Stop negotiating with yourself.

– Rob`,
    author: 'Rob',
  },
  {
    type: 'data-insight',
    content: `We analyzed 50,000 FAR exam questions answered on our platform.

The #1 topic candidates get wrong?

Government accounting.

It's not even close.

→ GASB fund types: 61% incorrect
→ Modified accrual basis: 58% incorrect
→ Government-wide statements: 54% incorrect

Here's what's interesting:

Most candidates don't even realize it's their weakest area.

They THINK it's leases. Or consolidations.

But government accounting? "I'll figure it out during the exam."

Spoiler: You won't.

If you're taking FAR, spend an extra 5 hours on GASB. Just GASB.

That's probably worth 5-7 points on your score.`,
    author: 'Rob',
  },
  {
    type: 'user-win',
    content: `Got this message yesterday:

"Rob, I passed AUD. 81. First try. I was averaging 52% in my old review course before I switched. Thank you."

I don't share this to brag about VoraPrep.

I share it because:

She almost gave up.

She'd failed REG twice. Her firm was starting to ask questions. She was crying in her car after work.

She didn't need more questions.

She needed to know WHY she was getting them wrong.

That's the part most review courses skip.

To everyone still in the fight: You're closer than you think.`,
    author: 'Rob',
  },
  {
    type: 'industry',
    content: `The CPA exam changed in January 2024.

If you're using a 2023 study guide, you're studying for the wrong exam.

Here's what's different:

❌ BEC section is gone
✅ New discipline sections: BAR, ISC, TCP
✅ More simulations, fewer MCQs
✅ Higher application-level questions

I talk to candidates every week who don't know this.

They're memorizing formulas that aren't tested anymore.

Quick check: Does your study material cover COSO 2013 or COSO 2017?

If you don't know, find out. It matters.`,
    author: 'Rob',
  },
  {
    type: 'founder-story',
    content: `Building VoraPrep taught me something uncomfortable:

Content is 10% of the work.

We have 25,000+ questions across 6 exams.

But what actually moves the needle?

→ Explaining WHY wrong answers are wrong
→ Identifying weak topics before YOU realize them
→ Being there at 11pm when you're stuck

Features don't matter.

Feeling understood matters.

That's what I'm building.`,
    author: 'Rob',
  },
  {
    type: 'dear-candidate',
    content: `Dear CPA Candidate,

You're not "bad at tests."

You're undertrained on a specific skill:
Reading questions under time pressure.

The CPA exam isn't testing whether you know GAAP.
It's testing whether you can apply GAAP in 2 minutes while anxious.

Those are different skills.

Here's what helped me:

1. Read the question stem LAST (requirements first)
2. Eliminate two wrong answers before reading all four
3. Trust your first instinct unless you find evidence otherwise

The exam is beatable.

You just need the right training.

– Rob`,
    author: 'Rob',
  },
  {
    type: 'data-insight',
    content: `Here's a stat that surprised me:

Candidates who study for 25 minutes per day pass at higher rates than those who study 3 hours twice a week.

Same total time. Different outcomes.

Why?

Spaced repetition.

Your brain doesn't form memories during study sessions.
It forms them while you sleep.

Studying every day = more sleep cycles to consolidate.
Cramming twice a week = less encoding, more forgetting.

If you're burned out from marathon study sessions:

Permission granted to study less.
Just study more often.`,
    author: 'Rob',
  },
  {
    type: 'user-win',
    content: `"I thought I was stupid."

That's what a user told me after passing REG.

She'd failed 3 times with another prep course. Scores of 68, 71, 73.

So close. Every time.

Her firm was running out of patience.

When she switched to VoraPrep, we found the problem in 10 minutes:

She understood the concepts.
She was misreading signals in the questions.

Tax law questions often have multiple correct-ish answers.
The exam wants the MOST correct one.

Once she learned to spot the subtle differences, everything clicked.

Score: 79.

She's not stupid.
She was just using the wrong map.`,
    author: 'Rob',
  },
  {
    type: 'industry',
    content: `Hot take: Most CPA review courses are built wrong.

They're built to be comprehensive.
Every topic. Every rule. Maximum coverage.

The problem?

The exam tests 200 questions.
The review course has 5,000.

You're not supposed to learn everything.
You're supposed to learn what's tested.

That's why candidates get stuck:
More content → more overwhelm → less retention → lower scores.

The best prep isn't more content.
It's the right content, at the right time, with the right feedback loops.

That's harder to build. But it's what works.`,
    author: 'Rob',
  },
  {
    type: 'dear-candidate',
    content: `Dear CPA Candidate,

The exam is 4 hours.

You will not stay focused for 4 hours.

Don't even try.

Here's what actually works:

→ First testlet: You're sharpest. Go fast.
→ Take a 30-second breathing break between testlets
→ Simulations: Read the requirements first. Always.
→ Last 30 minutes: Stop guessing. Make decisions.

Mental stamina is a skill.

Train for it like you'd train for a marathon.

Not by running marathons every day.

By building up gradually, with rest days.

– Rob`,
    author: 'Rob',
  },
  {
    type: 'data-insight',
    content: `What's the difference between a 74 and a 76?

I looked at 1,000 candidates who scored between 70-79.

The pattern that separated pass from fail:

It wasn't study hours.
It wasn't number of questions completed.

It was review quality.

Candidates who scored 75+ spent 40% more time REVIEWING wrong answers.

Reading the explanation isn't enough.
Writing down WHY you got it wrong is what matters.

If you're not keeping an error log, start today.

That habit alone is worth 2-3 points.`,
    author: 'Rob',
  },
];

async function seedPosts() {
  console.log('🌱 Seeding LinkedIn story posts...\n');
  
  const batch = db.batch();
  const now = new Date();
  
  for (let i = 0; i < STORY_POSTS.length; i++) {
    const post = STORY_POSTS[i];
    const docRef = db.collection('linkedin_story_posts').doc();
    
    batch.set(docRef, {
      content: post.content,
      type: post.type,
      author: post.author,
      status: 'draft',      // Needs admin approval before posting
      scheduledFor: null,   // No specific date — picked in FIFO order after approval
      createdAt: admin.firestore.Timestamp.fromDate(
        new Date(now.getTime() + i * 1000)  // Stagger creation times for FIFO ordering
      ),
    });
    
    console.log(`  📝 Added: ${post.type} post (${post.content.slice(0, 40)}...)`);
  }
  
  await batch.commit();
  
  console.log(`\n✅ Seeded ${STORY_POSTS.length} posts to linkedin_story_posts collection`);
  console.log('\n⚠️  Posts are created as DRAFTS — they need admin approval to post!');
  console.log('\nTo approve posts:');
  console.log('  1. Go to Admin > LinkedIn Posts');
  console.log('  2. Review each post');
  console.log('  3. Click "Approve" to add to posting queue');
  console.log('\nPosting schedule: Mon/Wed/Fri at 9 AM EST');
  console.log(`At 3 posts/week, this batch covers ${Math.ceil(STORY_POSTS.length / 3)} weeks`);
}

seedPosts()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error seeding posts:', err);
    process.exit(1);
  });
