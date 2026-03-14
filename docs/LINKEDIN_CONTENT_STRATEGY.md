# VoraPrep LinkedIn Content Strategy

## The Shift: From Promotional → Story-Based

Karen Watts' approach works because she:
- Tells stories, not features
- Creates a signature series ("Dear Mover")
- Uses custom visuals, not stock
- Delivers value without asking for anything

VoraPrep should do the same.

---

## Technical Implementation

### System Overview

We now have **two separate LinkedIn posting systems**:

| System | Collection | Trigger | Purpose |
|--------|-----------|---------|---------|
| Blog Auto-Share | `growth_content` | On article publish | SEO link building (promotional) |
| Story Posts | `linkedin_story_posts` | Scheduled Mon/Wed/Fri 9 AM | Brand building (engagement) |

**Recommendation:** Disable blog auto-share for LinkedIn and use only story posts. Blog links can be shared manually when relevant to a story.

### Story Post Collection Structure

```typescript
// Firestore: linkedin_story_posts/{docId}
{
  content: string;           // Full post text (max 3000 chars)
  type: 'founder-story' | 'dear-candidate' | 'data-insight' | 'user-win' | 'industry';
  status: 'draft' | 'approved' | 'posted' | 'failed';
  author: string;
  scheduledFor?: Date;       // Optional: specific date to post
  approvedAt?: Date;         // When admin approved the post
  postedAt?: Date;
  linkedInPostId?: string;
  postUrl?: string;
  createdAt: Date;
  error?: string;            // If failed
}
```

### Approval Workflow

```
┌─────────┐    Admin     ┌──────────┐    Scheduled    ┌────────┐
│  DRAFT  │ ──Approve──► │ APPROVED │ ───Function───► │ POSTED │
└─────────┘              └──────────┘                 └────────┘
     │                         │                           │
     │ Edit                    │ Back to Draft             │ View on LinkedIn
     ▼                         ▼                           ▼
   Edit UI              Back to DRAFT                 postUrl link
```

**Posts require admin approval before auto-posting.** This prevents accidental or poorly-worded posts from going live.

### Admin UI

Access: **Admin > User Growth > LinkedIn Posts** (`/admin/linkedin`)

Features:
- View all posts by status (draft, approved, posted, failed)
- Full post preview before approving
- Edit post content and type
- Approve posts for auto-posting queue
- Manual "Post Now" for immediate posting
- Create new posts directly in the UI
- Delete unwanted posts

### Posting Frequency

**3x per week** is optimal for LinkedIn:

| Day | Time (EST) | Post Type |
|-----|------------|-----------|
| Monday | 9:00 AM | Founder insight / industry perspective |
| Wednesday | 9:00 AM | "Dear CPA Candidate" series |
| Friday | 9:00 AM | User celebration or data insight |

**Why 3x/week?**
- LinkedIn's algorithm favors consistent posters
- Too frequent (daily) = lower per-post reach
- Too infrequent (1x/week) = algorithm forgets you
- 3x/week hits the sweet spot for professional content

### Managing Posts

**Add new posts:**
```bash
# Add to Firestore directly or use admin panel
# Status: 'scheduled' makes it available for auto-posting
# Posts are picked in FIFO order (oldest createdAt first)
```

**Seed initial posts:**
```bash
node scripts/seed-linkedin-posts.cjs
```

**Deploy the scheduled function:**
```bash
firebase deploy --only functions:postScheduledLinkedIn
```

---

## Sample Posts

### Post 1: The Founder's Story (Vulnerability + Credibility)

---

I failed my CPA exam.

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

We're trying to change that.

---

### Post 2: "Dear CPA Candidate" Series (Karen-Style)

**[Image: Custom illustrated envelope/letter visual, similar to Karen's "Dear Mover" style]**

---

Dear CPA Candidate,

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

– Rob

---

### Post 3: Data Insight Story

---

We analyzed 50,000 FAR exam questions answered on our platform.

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

That's probably worth 5-7 points on your score.

---

### Post 4: User Celebration Story

---

Got this message yesterday:

"Rob, I passed AUD. 81. First try. I was averaging 52% in my old review course before I switched. Thank you."

I don't share this to brag about VoraPrep.

I share it because:

She almost gave up.

She'd failed REG twice. Her firm was starting to ask questions. She was crying in her car after work.

She didn't need more questions.

She needed to know WHY she was getting them wrong.

That's the part most review courses skip.

To everyone still in the fight: You're closer than you think.

---

### Post 5: Industry Insight (Position as Expert)

---

The CPA exam changed in January 2024.

If you're using a 2023 study guide, you're studying for the wrong exam.

Here's what's different:

❌ BEC section is gone
✅ New discipline sections: BAR, ISC, TCP
✅ More simulations, fewer MCQs
✅ Higher application-level questions

I talk to candidates every week who don't know this.

They're memorizing formulas that aren't tested anymore.

Quick check: Does your study material cover COSO 2013 or COSO 2017?

If you don't know, find out. It matters.

---

### Post 6: Behind the Scenes (Build in Public)

---

Building VoraPrep taught me something uncomfortable:

Content is 10% of the work.

We have 16,000 questions across 6 exams.

But what actually moves the needle?

→ Explaining WHY wrong answers are wrong
→ Identifying weak topics before YOU realize them
→ Being there at 11pm when you're stuck

Features don't matter.

Feeling understood matters.

That's what I'm building.

---

## Visual Strategy

Don't use stock photos of people studying.

Instead:
- Custom illustrated "letter" graphics (like Karen's Dear Mover)
- Screenshots of user messages (with permission)
- Data visualizations from platform analytics
- Behind-the-scenes photos of you working
- Text-based quote cards with branding

---

## Posting Cadence

| Day | Post Type |
|-----|-----------|
| Monday | Founder insight / industry perspective |
| Wednesday | "Dear CPA Candidate" series |
| Friday | User celebration or data insight |

---

## Hashtag Strategy

Keep minimal (3-5 max):

- #CPAExam
- #AccountingCareer
- #CareerGrowth
- (Avoid #Ad #Sponsored #Marketing)

---

## Repurposing Blog Content

Blog posts CAN feed LinkedIn, but transform them:

| Blog Article | LinkedIn Post |
|--------------|---------------|
| "Free CFP Retirement Planning Questions" | "The #1 mistake I see in retirement planning questions..." + ONE question example |
| "EA SEE3 Breakdown" | "Circular 230 sounds boring. Until you realize it's 20% of your EA exam." |
| "CPA BAR Study Guide" | "Variance analysis isn't hard. Here's the formula I wish someone showed me on day 1." |

Extract ONE insight, wrap it in a story, drop the education.

---

## What NOT to Post

❌ "VoraPrep now has 16,000 questions!"
❌ "Sign up for our free trial!"
❌ "New feature: [feature list]"
❌ Stock photos of people celebrating
❌ Long lists of features/benefits

---

## The Rule

Every post should pass this test:

**Would someone share this if VoraPrep didn't exist?**

If the answer is no, don't post it.
