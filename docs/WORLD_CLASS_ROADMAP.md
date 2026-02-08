# Road to "World Class" for EA & CMA

To elevate the Enrolled Agent (EA) and Certified Management Accountant (CMA) modules to match or exceed the quality of the CPA course, we must address specific gaps in **interactive simulation**, **content depth**, and **tooling**.

## 1. CMA: The "Essay Gap"
**Status:** The current CMA module has excellent MCQ coverage (~28k lines of data), but lacks the critical Essay component.
**Why it matters:** Essays account for 25% of the CMA score. Students who only practice MCQs are unprepared for the format.
**Proposed Solution: AI-Graded Essay Simulator**
*   **Feature:** A dedicated practice mode where users type responses to scenarios (already in `src/data/cma/essays`).
*   **Tech:** Use the `aiService` (updated with 'evaluate' prompt) to grade responses against the rubric in real-time.
*   **Metric:** "World Class" means instant, personalized feedback on writing style and technical accuracy.

## 2. EA: The "Forms Facade"
**Status:** The EA exam is heavily form-based. Our current content references forms (e.g., "See Form 1040"), but users can't *see* them.
**Why it matters:** Visual learners struggle to map text rules to physical form lines without seeing them.
**Proposed Solution: Interactive IRS Form Explorer**
*   **Feature:** A sidebar or modal that opens the relevant PDF/Image of the form being discussed.
*   **Tech:** A "Form Map" component linking `Form 1040` text to a visual SVG or PDF viewer.
*   **Metric:** "World Class" means never having to leave the app to Google a form.

## 3. Analytics: Blueprint Granularity
**Status:** We track overall accuracy. CPA candidates often get "Weak in REG-4" style feedback.
**Proposed Solution: Detailed Blueprint Heatmap**
*   **Feature:** Visual heatmap of performance by detailed blueprint area (e.g., "SEE1-3: Taxation of Property").
*   **Tech:** Leverage the `blueprintArea` field already present in our data to aggregate stats.

## 4. Content: Video & Rich Media
**Status:** Our lessons are text-heavy. Competitors (Gleim, Becker) use video.
**Proposed Solution: Integrated Video Lessons**
*   **Feature:** Embed short, concept-specific videos (can be curated YouTube content initially) into the Lesson Viewer.
*   **Tech:** Add `videoUrl` to the `Lesson` type and a player in `LessonViewer.tsx`.

## 5. Adaptive Learning (Both)
**Status:** `dailyPlanService` is good but linear.
**Proposed Solution:** "Smart Review" sessions that injects 5-10 questions from *last week's* weak topics into *today's* plan automatically.
