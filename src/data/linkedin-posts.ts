/**
 * LinkedIn Story Posts — 50 high-value posts for organic engagement
 * 
 * Distribution:
 * - 20 CPA-specific (FAR, AUD, REG, disciplines)
 * - 12 General study/mindset tips
 * - 8 Founder/VoraPrep journey
 * - 4 EA-specific
 * - 6 CMA/CIA/CISA/CFP
 * 
 * Brand mention ratio: ~30% soft mentions, ~70% pure value
 * Posts are pre-shuffled for natural variety.
 */

export type LinkedInPostType = 'founder-story' | 'dear-candidate' | 'data-insight' | 'user-win' | 'industry';

export interface LinkedInPostData {
  type: LinkedInPostType;
  content: string;
  author: string;
  exam?: string; // Optional: 'CPA', 'EA', 'CMA', 'CIA', 'CISA', 'CFP', or undefined for general
}

export const LINKEDIN_POSTS: LinkedInPostData[] = [
  // 1. CPA - FAR (Government Accounting)
  {
    type: 'data-insight',
    content: `We analyzed 50,000 FAR exam questions.

The #1 topic candidates get wrong?

Government accounting.

It's not even close.

→ GASB fund types: 61% incorrect
→ Modified accrual basis: 58% incorrect
→ Government-wide statements: 54% incorrect

Most candidates don't even realize it's their weakest area.

They THINK it's leases. Or consolidations.

But government accounting? "I'll figure it out during the exam."

Spoiler: You won't.

If you're taking FAR, spend an extra 5 hours on GASB. Just GASB.

That's probably worth 5-7 points on your score.`,
    author: 'Rob',
    exam: 'CPA',
  },

  // 2. General - Mindset
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

  // 3. EA - Tax Season
  {
    type: 'industry',
    content: `Tax season just ended.

You're exhausted. You have no energy to study for the EA exam.

But here's what I've learned:

The candidates who pass the EA exam aren't the ones who study during tax season.

They're the ones who start the week AFTER it ends.

While everyone else is on vacation, recovering, "taking a break"…

The people who pass are doing 20 questions a day.

Just 20.

By June, that's 1,500 questions. Enough to pass SEE Part 1.

The gap between you and passing isn't talent.

It's timing.

Start this week.`,
    author: 'Rob',
    exam: 'EA',
  },

  // 4. Founder Story
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

  // 5. CPA - AUD
  {
    type: 'data-insight',
    content: `Here's a pattern I see with AUD candidates:

They understand the concepts.
They pass the MCQs.
They bomb the simulations.

Why?

Because MCQs test recognition.
Simulations test application.

You can recognize that "inquiry alone is not sufficient" as an audit procedure.

But can you draft the actual audit program for revenue testing?

That's different.

My advice for AUD candidates:

→ Do 2x more simulations than you think you need
→ Practice writing memos, not just reading them
→ Time yourself — the real exam is faster than you expect

AUD is a skills exam, not a knowledge exam.

Train accordingly.`,
    author: 'Rob',
    exam: 'CPA',
  },

  // 6. CMA - Essay to CBQ Transition
  {
    type: 'industry',
    content: `The CMA exam is changing.

Starting September 2026, essays are gone. Computer-based questions (CBQs) are in.

If you're planning to take the CMA, here's what this means:

Old format:
→ Write 2 essays per section
→ Partial credit for your reasoning
→ Time management was crucial

New format:
→ CBQs test the same skills
→ But in a structured, guided format
→ Less ambiguity in grading

My advice?

If you struggle with essay writing, wait until September 2026.

If you're a strong writer, consider taking it BEFORE the change.

Either way, the content is the same. Don't let the format distract you from learning the material.`,
    author: 'Rob',
    exam: 'CMA',
  },

  // 7. General - Spaced Repetition
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

  // 8. User Win - REG
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
    exam: 'CPA',
  },

  // 9. CISA - Domain Weights
  {
    type: 'data-insight',
    content: `CISA candidates: Do you know how the exam is weighted?

Domain 1 (Audit Process): 21%
Domain 2 (Governance): 16%
Domain 3 (IS Acquisition): 18%
Domain 4 (IS Operations): 20%
Domain 5 (Protection): 25%

Most candidates study all domains equally.

That's a mistake.

Domain 5 alone is 25% of your score. That's the difference between pass and fail.

My advice:

→ Master Domain 5 first
→ Don't neglect Domain 2 (lowest weight, but tricky)
→ Spend proportional time based on weights

The exam tells you what matters. Listen to it.`,
    author: 'Rob',
    exam: 'CISA',
  },

  // 10. General - Test Taking Skills
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

  // 11. CPA - REG Basis
  {
    type: 'data-insight',
    content: `If you're studying for REG, here's a secret:

Basis is 30-40% of the exam.

Not "a lot" of the exam. Nearly HALF.

→ Property basis
→ Partnership basis
→ S-Corp basis
→ Gift/inheritance basis
→ Like-kind exchange basis

Every REG candidate knows basis is important.

But most spend 15% of their time on it.

That's why they fail.

If you can answer any basis question in 60 seconds, you're going to pass REG.

If you can't, you're gambling.

Stop gambling. Master basis.`,
    author: 'Rob',
    exam: 'CPA',
  },

  // 12. Founder Story - Building
  {
    type: 'founder-story',
    content: `Building VoraPrep taught me something uncomfortable:

Content is 10% of the work.

We have 20,000+ questions across 6 exams.

But what actually moves the needle?

→ Explaining WHY wrong answers are wrong
→ Identifying weak topics before YOU realize them
→ Being there at 11pm when you're stuck

Features don't matter.

Feeling understood matters.

That's what I'm building.`,
    author: 'Rob',
  },

  // 13. CIA - Internal Audit
  {
    type: 'industry',
    content: `The CIA exam tests something most people overlook:

Professional skepticism.

It's not enough to know the IIA standards.

You need to think like an internal auditor.

That means:

→ Question everything (even management's assertions)
→ Understand business context before testing
→ Know when to escalate vs. investigate

Most CIA candidates memorize standards.

The ones who pass internalize the mindset.

When you read a question, ask yourself:

"What would a skeptical internal auditor do here?"

That reframe alone is worth 5 points.`,
    author: 'Rob',
    exam: 'CIA',
  },

  // 14. General - Mental Stamina
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

  // 15. CPA - FAR Leases
  {
    type: 'data-insight',
    content: `FAR candidates: Leases are easier than you think.

Here's the 80/20 rule for ASC 842:

1. Lessee always records a right-of-use asset and lease liability
2. Finance lease = front-loaded expense (interest + amortization)
3. Operating lease = straight-line expense
4. Lessor accounting: sales-type, direct financing, operating

That's it. That's 80% of the questions.

The exam loves to test:
→ Initial measurement (include payments + guarantees)
→ Finance vs. operating classification
→ Subsequent measurement entries

Stop overcomplicating leases.

Learn these 4 rules. Do 30 questions. Move on.`,
    author: 'Rob',
    exam: 'CPA',
  },

  // 16. User Win - AUD
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
    exam: 'CPA',
  },

  // 17. EA - IRS Representation
  {
    type: 'industry',
    content: `Want to know the most underrated benefit of becoming an EA?

Unlimited representation rights before the IRS.

CPAs have it too. But CPAs cost $150-400/hour.

EAs? Often $75-150/hour.

For small business owners with IRS issues, EAs are the sweet spot:
→ Full representation rights
→ Tax expertise
→ More affordable than CPAs

If you're studying for the EA exam, you're not just getting letters after your name.

You're building a practice moat.

Tax resolution is a $5B industry.

And most CPAs don't want to do it.`,
    author: 'Rob',
    exam: 'EA',
  },

  // 18. General - Error Log
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

  // 19. CPA - BAR Discipline
  {
    type: 'industry',
    content: `Picking your CPA discipline section?

Here's what the data says:

BAR (Business Analysis & Reporting):
→ Best for: Public accounting, financial reporting roles
→ Hardest topics: Data analytics, prospective financial info
→ Pass rate: ~50-55%

ISC (Information Systems & Controls):
→ Best for: IT audit, systems implementation
→ Hardest topics: SOC reports, IT governance
→ Pass rate: ~45-50%

TCP (Tax Compliance & Planning):
→ Best for: Tax practice
→ Hardest topics: Research, complex entities
→ Pass rate: ~50-55%

My advice? Pick the one aligned with your career.

The "easy" section doesn't exist.`,
    author: 'Rob',
    exam: 'CPA',
  },

  // 20. Founder Story - Users
  {
    type: 'founder-story',
    content: `The best product feedback comes from people who almost quit.

Last month, a user emailed us:

"I was going to cancel. Then I passed FAR with a 78. What changed?"

I asked him to explain.

His answer: "The AI tutor explained government accounting to me at 11pm when I was stuck. No textbook could do that."

That one feature — being available when you need help — matters more than having 10,000 questions.

We almost didn't build the AI tutor. It was expensive. Complex.

Now it's the reason people pass.

Lesson: Build what users need at 11pm.`,
    author: 'Rob',
  },

  // 21. CFP - Comprehensive Planning
  {
    type: 'industry',
    content: `CFP candidates: The exam isn't testing your knowledge.

It's testing your judgment.

You'll know the rules for Roth conversions.
You'll know the estate tax exemptions.
You'll know the insurance underwriting process.

But the exam asks:

"Given THIS client's situation, what should you recommend FIRST?"

That word — first — is where candidates fail.

They pick a correct answer.
But not the MOST correct answer.

Train yourself to think in priorities, not options.

That's the CFP mindset.`,
    author: 'Rob',
    exam: 'CFP',
  },

  // 22. General - Working While Studying
  {
    type: 'dear-candidate',
    content: `Dear CPA Candidate,

Yes, you can pass while working full-time.

Most people do.

Here's how:

Morning routine (before work):
→ 30 minutes of MCQs
→ Coffee, not social media
→ Review yesterday's wrong answers

Lunch break:
→ 15 minutes of flashcards
→ One topic, not random

Evening (after work):
→ 45 minutes of focused study
→ One simulation if energy allows
→ Stop by 9pm — sleep matters

Total: 1.5 hours/day. 10 hours/week.

That's enough to pass one section in 8-10 weeks.

You don't need to quit your job.

You need a system.

– Rob`,
    author: 'Rob',
  },

  // 23. CPA - REG Ethics
  {
    type: 'data-insight',
    content: `REG candidates: Don't sleep on ethics.

It's only 10-15% of the exam, but here's the thing:

Ethics questions are easy points.

→ Circular 230 rules are black and white
→ Questions test specific rules, not judgment
→ Same concepts repeat across exams

The candidates who fail REG often miss 3-4 ethics questions they should have gotten right.

That's the margin.

My study plan for ethics:

1. Read Circular 230 once (2 hours)
2. Do 30 ethics questions
3. Review what you missed
4. Done.

Don't overcomplicate it. Just don't skip it.`,
    author: 'Rob',
    exam: 'CPA',
  },

  // 24. EA - Representation
  {
    type: 'user-win',
    content: `An EA candidate messaged me last week:

"I passed all 3 parts in 5 months. While working full-time at a tax firm. During busy season."

I had to ask: How?

Her answer:

"I studied on my phone during lunch. 15 minutes. Every day. The app made it possible."

She didn't have 4-hour blocks.
She had fragments.

But she used every fragment.

15 minutes × 5 days × 20 weeks = 25 hours per part.

That's enough to pass SEE if you're strategic.

Stop waiting for perfect conditions.

Start with 15 minutes.`,
    author: 'Rob',
    exam: 'EA',
  },

  // 25. CPA - FAR NFP
  {
    type: 'data-insight',
    content: `FAR candidates: Nonprofit accounting is high-yield.

Here's the 5-minute version:

1. Net assets have 2 categories now (not 3):
   → With donor restrictions
   → Without donor restrictions

2. Revenue recognition:
   → Contributions: when unconditional promise is received
   → Exchange transactions: like a normal business

3. Releases from restriction:
   → When the restriction is satisfied
   → Debit "with," credit "without"

4. Statement of Activities = Income Statement equivalent

That's 80% of NFP questions.

Most candidates skip NFP because it's "weird."

That's why it's high-yield — your competitors aren't studying it.`,
    author: 'Rob',
    exam: 'CPA',
  },

  // 26. General - Comparison Trap
  {
    type: 'founder-story',
    content: `The worst thing you can do while studying:

Compare yourself to others.

"She passed in 3 months."
"He only studied 100 hours."
"They used a free course and passed on the first try."

None of that matters.

Their background isn't yours.
Their job isn't yours.
Their brain isn't yours.

The only comparison that matters:

Are you better than you were yesterday?

If yes, you're on track.

If no, adjust.

That's it. That's the whole game.`,
    author: 'Rob',
  },

  // 27. CMA - Part 1 Topics
  {
    type: 'data-insight',
    content: `CMA Part 1 candidates: Here's where people fail.

The exam is 50% financial planning, performance, and analytics.

Most candidates studying Part 1 focus on:
→ External financial reporting (comfortable)
→ Cost management (familiar)

They underestimate:
→ Planning, budgeting, forecasting
→ Performance management
→ Cost behavior analysis

The hardest questions aren't about debits and credits.

They're about variance analysis for a manufacturing company you've never seen.

If you're a CPA studying for CMA, be careful.

CMA Part 1 tests different muscles.`,
    author: 'Rob',
    exam: 'CMA',
  },

  // 28. CPA - AUD Sampling
  {
    type: 'data-insight',
    content: `AUD candidates: Sampling is easier than you think.

Here's the cheat sheet:

Attribute sampling:
→ Testing controls
→ Looking for deviation rate
→ "Did they follow the procedure?"

Variables sampling:
→ Testing balances
→ Looking for dollar amounts
→ "Is this account materially correct?"

Risk of incorrect acceptance = Beta risk = Most dangerous
Risk of incorrect rejection = Alpha risk = Inefficient but safe

Upper deviation rate > Tolerable rate = Controls are NOT effective

That's it. That's sampling.

Do 20 questions on this. You'll get them all right.`,
    author: 'Rob',
    exam: 'CPA',
  },

  // 29. General - Weekend Warriors
  {
    type: 'dear-candidate',
    content: `Dear Candidate,

Weekend warriors rarely pass.

You know the pattern:

Monday-Thursday: "I'll study this weekend"
Friday: "I need a break"
Saturday: 6 hours of intense study (burned out by hour 3)
Sunday: Guilt-ridden attempt to catch up
Monday: "I'll study this weekend"

Sound familiar?

Here's what works instead:

→ 30 minutes every weekday morning
→ 1 hour Saturday
→ Sunday completely off

Total: 3.5 hours vs. 6 hours weekend cramming

Same study time. Better retention. Less burnout.

Consistency beats intensity.

– Rob`,
    author: 'Rob',
  },

  // 30. CPA - FAR Consolidations
  {
    type: 'data-insight',
    content: `FAR consolidations aren't hard. They're just poorly taught.

Here's the framework:

1. Does the parent have control? If yes, consolidate.

2. Eliminate intercompany transactions:
   → Sales to each other
   → Receivables/payables
   → Unrealized profit in inventory

3. Eliminate the investment:
   → Debit common stock, APIC, retained earnings
   → Credit investment account

4. Noncontrolling interest:
   → Their share of subsidiary's equity
   → Shows up in equity section

5. Goodwill = Purchase price - Fair value of net assets

That's consolidations. Five steps.

The exam doesn't test complex consolidations.

It tests whether you know the basics cold.`,
    author: 'Rob',
    exam: 'CPA',
  },

  // 31. CIA - Part 2 Focus
  {
    type: 'industry',
    content: `CIA Part 2 is where most candidates get stuck.

Parts 1 and 3 are more straightforward:
→ Part 1: Internal audit standards
→ Part 3: Business knowledge

Part 2? Managing the internal audit function.

This tests:

→ Strategic audit planning
→ Resource allocation
→ Quality assurance and improvement
→ Communication with the board

The trap: Candidates study Part 2 like it's an accounting exam.

It's not. It's a management exam.

Think like a Chief Audit Executive, not a staff auditor.

That mindset shift is worth 10 points.`,
    author: 'Rob',
    exam: 'CIA',
  },

  // 32. Founder - Feedback Loop
  {
    type: 'founder-story',
    content: `A user once told me:

"Your explanations are too long."

I was defensive at first. We spent months writing those explanations.

Then I watched 10 people use the app.

She was right.

They'd read 2-3 sentences. Then scroll past.

We rewrote every explanation to lead with the key point. Details second.

Pass rates went up.

Lesson: Your users aren't wrong. You just haven't understood them yet.`,
    author: 'Rob',
  },

  // 33. CPA - ISC Discipline
  {
    type: 'data-insight',
    content: `Taking the ISC discipline? Here's what to expect.

ISC tests 6 areas:

1. IT governance (15-25%)
2. Security, confidentiality, privacy (25-35%)
3. SOC engagements (15-25%)
4. System development/acquisition (10-20%)
5. Business processes and systems (15-25%)

Most candidates from Big 4 feel confident.

Then they hit the simulation.

ISC sims test:
→ SOC report writing
→ IT control evaluation
→ System implementation decisions

These aren't MCQ skills. They're application skills.

Do extra SOC sims. That's where points are lost.`,
    author: 'Rob',
    exam: 'CPA',
  },

  // 34. General - Exam Day Mindset
  {
    type: 'dear-candidate',
    content: `Dear Candidate,

Exam day advice nobody gives:

1. Eat breakfast, even if you're not hungry

2. Arrive 30 minutes early — rushing spikes cortisol

3. During the tutorial, breathe. Don't skip it.

4. First 10 questions: Go slow. Your brain needs time to warm up.

5. If you're stuck, flag it and move on. Come back later.

6. Between testlets, close your eyes for 30 seconds

7. Last hour: No more second-guessing. Make decisions.

The exam isn't testing knowledge alone.

It's testing execution under pressure.

Prepare for both.

– Rob`,
    author: 'Rob',
  },

  // 35. CPA - REG Property Transactions
  {
    type: 'data-insight',
    content: `REG candidates: Property transactions are your friend.

They look scary. Long fact patterns. Numbers everywhere.

But here's the secret:

99% of property questions come down to:

1. What's the basis?
2. What's the amount realized?
3. Is there gain or loss?
4. Is it recognized or deferred?
5. What's the character (ordinary vs. capital)?

That's it. Five questions, every time.

→ Amount realized = Cash + FMV of property received + liabilities assumed by buyer
→ Gain = Amount realized - Adjusted basis
→ Like-kind exchange 1031 = Deferred (mostly)
→ Section 1231 = Best of both worlds

Master this framework. Property questions become easy points.`,
    author: 'Rob',
    exam: 'CPA',
  },

  // 36. EA - SEE Part 3
  {
    type: 'data-insight',
    content: `EA candidates: SEE Part 3 is different.

Parts 1 and 2 test tax knowledge.
Part 3 tests representation procedures.

What that means:

→ IRS audit procedures
→ Appeals process
→ Collection alternatives (OIC, installment, CNC)
→ Circular 230 ethics
→ Power of attorney rules

Most tax professionals know the tax code.

Fewer know how to actually represent clients.

That's Part 3.

Study tip: Don't just memorize procedures.

Imagine you're the practitioner. What would you file? When? In what order?

That's how the questions are written.`,
    author: 'Rob',
    exam: 'EA',
  },

  // 37. Founder - Why I Built This
  {
    type: 'founder-story',
    content: `People ask why I built a CPA review course when there are already big players.

Simple answer:

I wasn't building for average candidates.

I was building for the ones who:

→ Work 50-60 hours/week
→ Have kids, obligations, life
→ Already failed and feel stupid
→ Learn differently than lectures allow

The big companies optimize for the middle.

I optimize for the edges.

Because that's where I was.

And that's who I understand.`,
    author: 'Rob',
  },

  // 38. CISA - Practical Experience
  {
    type: 'industry',
    content: `CISA candidates without IT audit experience: Listen up.

The exam assumes you've DONE the work.

Questions aren't: "What is a control?"

Questions are: "Given this scenario, what control would you test FIRST?"

If you don't have practical experience:

→ Read ISACA case studies
→ Watch IT audit walkthroughs on YouTube
→ Ask someone in the field to explain their day-to-day

The concepts are learnable.

But the judgment takes exposure.

Find ways to simulate experience before the exam.`,
    author: 'Rob',
    exam: 'CISA',
  },

  // 39. CPA - FAR Revenue Recognition
  {
    type: 'data-insight',
    content: `FAR candidates: Revenue recognition is 5 steps.

1. Identify the contract
2. Identify performance obligations
3. Determine the transaction price
4. Allocate the price to obligations
5. Recognize revenue when obligations are satisfied

Most questions test steps 2 and 5.

Step 2: Is it distinct? Can the customer benefit from it alone?

Step 5: Over time or at a point in time?

→ Over time: Customer controls asset as built, or no alternative use with enforceable payment right
→ Point in time: Everything else

Learn the transfer indicators. That's where points are won.

Stop re-reading ASC 606. Start doing questions.`,
    author: 'Rob',
    exam: 'CPA',
  },

  // 40. General - Retakers
  {
    type: 'dear-candidate',
    content: `Dear Retaker,

You're not starting over.

Failing means you've already:

→ Identified weak areas (the hard way)
→ Built study habits (even imperfect ones)
→ Proven you can sit for a 4-hour exam
→ Learned what doesn't work for you

That's valuable.

First-time takers don't have that information.

This time, focus only on what you got wrong.

Not the whole exam. Your exam.

You're closer than you think.

– Rob`,
    author: 'Rob',
  },

  // 41. CMA - Part 2 Financial Decision Making
  {
    type: 'data-insight',
    content: `CMA Part 2: Financial Decision Making.

Here's what trips people up:

→ Corporate finance: NPV, IRR, payback (you know this)
→ Risk management: Hedging, derivatives (less familiar)
→ Investment decisions: Capital budgeting, leasing (straightforward)
→ Professional ethics: IMA standards (easy points, don't skip)

The gap:

CPAs studying for CMA think Part 2 is "just finance."

It's not. It's decision-focused.

Questions ask: "Given X scenario, what should management do?"

The answer isn't always the highest NPV.

Sometimes it's the lowest risk.

Read carefully. Think like a CFO.`,
    author: 'Rob',
    exam: 'CMA',
  },

  // 42. CPA - TCP Discipline
  {
    type: 'data-insight',
    content: `Picking TCP for your CPA discipline? Here's what to know.

TCP covers:

→ Tax compliance (returns, deadlines, extensions)
→ Tax planning for individuals
→ Tax planning for entities
→ Property transactions (deep dive)
→ Tax research skills

If you passed REG, TCP feels familiar.

But TCP goes deeper on planning.

REG: "What's the tax consequence?"
TCP: "What should the client do to minimize tax?"

TCP candidates need to think strategically.

Not just calculate — advise.

Practice writing tax memos. The sims require it.`,
    author: 'Rob',
    exam: 'CPA',
  },

  // 43. User Win - First Try Pass
  {
    type: 'user-win',
    content: `A message I received this morning:

"I passed all 4 CPA sections on the first try. 78, 82, 76, 80. I cried when I saw the last score."

She studied for 14 months. While working full-time. While raising a toddler.

Some people would call that slow.

I call it relentless.

There's no prize for finishing fast.

Only for finishing.

If you're in month 12, month 18, month 24 — keep going.

The only people who fail are the ones who stop.`,
    author: 'Rob',
  },

  // 44. General - Motivation
  {
    type: 'founder-story',
    content: `Motivation is unreliable.

Some days you'll wake up excited to study.

Most days you won't.

The candidates who pass don't rely on motivation.

They rely on:

→ A specific time blocked every day
→ A phone with study apps, not social media
→ A study streak they don't want to break
→ A reason bigger than the exam itself

Find your anchor.

Maybe it's your kid's future.
Maybe it's proving someone wrong.
Maybe it's just not wasting the $2,000 you already spent.

Whatever it is, write it down.

Look at it when motivation fails.`,
    author: 'Rob',
  },

  // 45. CFP - Psychology of Advice
  {
    type: 'industry',
    content: `The CFP exam's hardest questions aren't about numbers.

They're about behavior.

"Client wants to pay off mortgage early but has credit card debt at 22% APR. What do you recommend?"

Mathematically: Pay off the credit card.

But the exam also tests:

→ Client psychology (they feel safer with no mortgage)
→ Behavioral coaching (how do you guide them?)
→ Fiduciary duty (what's truly in their interest?)

Sometimes the "correct" answer includes counseling, not math.

CFP tests advisors, not calculators.

Remember that.`,
    author: 'Rob',
    exam: 'CFP',
  },

  // 46. CPA - Score Release Anxiety
  {
    type: 'dear-candidate',
    content: `Dear Candidate Waiting for Scores,

The anxiety is normal.

You'll analyze every question you remember.
You'll convince yourself you failed.
You'll check NASBA 47 times.

Here's the truth:

You can't change the outcome.

You can only control what you do while waiting.

→ Start studying for the next section (if you have one)
→ Take a mental health day (you earned it)
→ Stop googling "did I pass?" threads

The score is what it is.

If you pass, celebrate.
If you don't, adjust and retry.

Either way, you'll be okay.

– Rob`,
    author: 'Rob',
  },

  // 47. CISA - Audit Evidence
  {
    type: 'data-insight',
    content: `CISA candidates: Know the hierarchy of audit evidence.

From strongest to weakest:

1. Evidence obtained directly by the IS auditor
2. Evidence from independent third parties
3. Evidence from the auditee's internal systems
4. Oral representations from management

The exam loves to test this.

"Which is the MOST reliable evidence?"

It's always the one closest to direct observation.

Screenshots > Reports > Verbal confirmations

This concept appears in 10-15% of questions.

Nail it.`,
    author: 'Rob',
    exam: 'CISA',
  },

  // 48. General - Sleep
  {
    type: 'data-insight',
    content: `The most underrated study technique:

Sleep.

Not 5 hours. Not 6 hours.

7-8 hours.

Here's why:

Your brain consolidates memories during REM sleep.

If you don't sleep enough:
→ New information doesn't stick
→ Old information gets overwritten
→ Decision-making suffers (hello, test day)

Studying until midnight and waking at 5am?

You're undoing your own work.

The best candidates study less and sleep more.

Not because they're lazy.

Because they understand how memory works.`,
    author: 'Rob',
  },

  // 49. CPA - Failing Forward
  {
    type: 'user-win',
    content: `He failed FAR 4 times.

Scores: 67, 71, 72, 74.

By the fourth fail, he was ready to give up.

His firm had stopped asking about the exam. He'd been passed over for promotion. He felt like a fraud.

Then he changed one thing:

Instead of doing more questions, he reviewed fewer — but deeper.

He wrote out every wrong answer in a notebook. Not the explanation — his own words.

Fifth attempt: 81.

Volume isn't the answer.

Understanding is.`,
    author: 'Rob',
    exam: 'CPA',
  },

  // 50. Founder - The Mission
  {
    type: 'founder-story',
    content: `I don't want VoraPrep to be the biggest CPA review.

I want it to be the one that works for people who thought they couldn't pass.

The ones working 60-hour weeks.
The ones with kids and no quiet space.
The ones who failed twice and feel broken.
The ones whose first language isn't English.

The big review courses optimize for the average candidate.

I'm optimizing for the edges.

Because that's where the transformation happens.

When someone who "shouldn't" pass actually passes.

That's why I built this.`,
    author: 'Rob',
  },
];
