# ADR-001: Multi-Course Architecture

> How we structure VoraPrep to support multiple exam prep courses.

---

## Status

**Status:** Accepted  
**Date:** 2026-01-28  
**Deciders:** Rob

---

## Context

VoraPrep currently supports only CPA exam preparation. We want to expand to other professional certifications (CMA, EA, CIA, etc.) to increase market size and leverage our existing learning platform.

We need to decide how to architect the system to support multiple courses while minimizing code duplication and maintenance burden.

---

## Decision

**We will use a unified codebase with course-aware routing and configuration.**

- Single React application
- Course-specific content in `src/courses/{courseId}/` directories
- Shared components, hooks, and utilities
- `CourseProvider` context to manage active course
- Optional domain-based routing (voraprepcpa.com, voraprepcma.com)
- Bundle pricing to maximize LTV

---

## Alternatives Considered

### Option A: Separate Applications Per Course
**Description:** Create independent apps for each exam (VoraPrep CPA, VoraPrep CMA, etc.)

**Pros:**
- Complete isolation between courses
- Independent release cycles
- Smaller bundle sizes per app
- Focused branding

**Cons:**
- Code duplication across apps
- Bug fixes must be applied N times
- Higher maintenance burden
- Users need separate accounts for each exam
- Cross-selling is harder

### Option B: Unified Platform (Chosen)
**Description:** Single codebase with course abstraction layer

**Pros:**
- One codebase to maintain
- Shared authentication and user accounts
- Easy cross-selling and bundles
- Faster time to add new courses
- Consistent UX across courses

**Cons:**
- More complex routing
- Larger initial bundle (can be mitigated with code splitting)
- All courses affected by breaking changes

### Option C: Micro-Frontends
**Description:** Separate deployable frontends sharing common infrastructure

**Pros:**
- Team independence
- Isolated deployments

**Cons:**
- Overkill for current team size (1 person)
- Complex infrastructure
- Coordination overhead

---

## Consequences

### Positive
- Adding a new course becomes primarily a content task, not a development task
- Users can easily access multiple courses with one account
- Bundle pricing increases average revenue per user
- Maintenance stays manageable for a solo developer

### Negative
- Initial refactor required to abstract CPA-specific code
- More complex mental model for the codebase
- Risk of breaking CPA while adding abstraction (mitigated by tests)

### Neutral
- URL structure changes from `/lessons/far` to `/cpa/lessons/far`
- Need to maintain backwards compatibility during transition

---

## Implementation

See [PHASE_1_MULTI_COURSE_EXPANSION.md](../PHASE_1_MULTI_COURSE_EXPANSION.md) for detailed implementation plan.

**Key milestones:**
1. Create `types/course.ts` and `CourseProvider`
2. Move CPA content to `courses/cpa/`
3. Update routing to be course-aware
4. Add CMA as second course to validate architecture

---

## Related Decisions

- (Future) ADR-002: Pricing Tiers and Bundles
- (Future) ADR-003: Multi-Domain Strategy

---

## References

- [PHASE_1_MULTI_COURSE_EXPANSION.md](../PHASE_1_MULTI_COURSE_EXPANSION.md)
- [Discussion transcript, 2026-01-28]
