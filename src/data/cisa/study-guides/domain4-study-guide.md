# CISA Domain 4: IS Operations and Business Resilience (26%)

## Overview

Domain 4 covers IT operations, data management, incident handling, and business continuity/disaster recovery. This domain tests your understanding of day-to-day operations and recovery planning.

## Key Weight

**26% of the exam** - Tied for largest domain with Domain 5. Expect approximately 39 questions.

---

## Domain 4A: IS Operations

### Service Level Management

| Term | Definition |
|------|------------|
| **SLA** | Service Level Agreement - contract with customer |
| **OLA** | Operational Level Agreement - internal agreement |
| **UC** | Underpinning Contract - with external suppliers |
| **KPI** | Key Performance Indicator - metric for success |

### Job Scheduling

- Automated batch processing
- Dependency management
- Error handling procedures
- Audit trail requirements
- Restart/recovery capabilities

### Operator Console Logs

- Record all operator activities
- Monitor for unauthorized actions
- Support incident investigation
- Retention requirements

---

## Domain 4B: Data Center Management

### Environmental Controls

| Control | Purpose |
|---------|---------|
| **HVAC** | Temperature and humidity control |
| **Fire Suppression** | Gas-based (no water) for equipment |
| **UPS** | Uninterruptible Power Supply |
| **Generator** | Extended power outages |
| **Raised Floor** | Cable management, airflow |

### Physical Security

- Access control systems
- Mantraps/turnstiles
- CCTV monitoring
- Visitor logs
- Escort requirements

### Power Protection

\`\`\`
UPS (seconds-minutes) → Generator (hours-days)
\`\`\`

- **UPS**: Bridge until generator starts
- **Generator**: Extended operations
- **PDU**: Power Distribution Unit

---

## Domain 4C: Incident Management

### Incident Response Phases

1. **Prepare** - Plans, training, tools
2. **Identify** - Detect and classify
3. **Contain** - Limit damage/spread
4. **Eradicate** - Remove threat
5. **Recover** - Restore operations
6. **Lessons Learned** - Improve for future

### Memory Aid: PICER-L
\`\`\`
Prepare → Identify → Contain → Eradicate → Recover → Lessons Learned
\`\`\`

### Incident Classification

| Level | Impact | Response |
|-------|--------|----------|
| **P1 - Critical** | Business down | Immediate, all hands |
| **P2 - High** | Major degradation | Urgent, team assigned |
| **P3 - Medium** | Partial impact | Normal queue |
| **P4 - Low** | Minimal impact | Scheduled |

### Evidence Handling

- **Chain of Custody**: Document every handler
- **Preservation**: Don't alter originals
- **Forensic Copy**: Bit-for-bit image
- **Hash Values**: Prove integrity

---

## Domain 4D: Business Continuity Planning (BCP)

### BCP Development Phases

1. **Business Impact Analysis (BIA)**
2. **Strategy Development**
3. **Plan Development**
4. **Testing and Exercises**
5. **Maintenance and Updates**

### Business Impact Analysis (BIA)

| Term | Definition |
|------|------------|
| **MTD** | Maximum Tolerable Downtime |
| **RTO** | Recovery Time Objective |
| **RPO** | Recovery Point Objective |
| **WRT** | Work Recovery Time |

### Critical Relationship

\`\`\`
RPO ← (Data Loss) → Incident → (Downtime) → RTO → (Rebuild) → WRT ≤ MTD
\`\`\`

- **RPO**: How much data can you lose?
- **RTO**: How fast must systems recover?
- **WRT**: Time to catch up on lost work
- **MTD**: Total time business can survive

---

## Domain 4E: Disaster Recovery

### Recovery Site Types

| Site | Cost | Recovery Time | Description |
|------|------|---------------|-------------|
| **Cold** | Low | Days-Weeks | Space only, no equipment |
| **Warm** | Medium | Hours-Days | Equipment, older data |
| **Hot** | High | Hours | Ready systems, near-current data |
| **Mobile** | Variable | Variable | Transportable facility |
| **Reciprocal** | Low | Variable | Partner agreement |
| **Cloud** | Variable | Hours | DRaaS solutions |

### Data Replication

| Type | Description | RPO |
|------|-------------|-----|
| **Synchronous** | Real-time, zero data loss | Near 0 |
| **Asynchronous** | Periodic copy, some lag | Minutes-Hours |
| **Backup** | Point-in-time copy | Hours-Days |

---

## Domain 4F: Backup Management

### Backup Types

| Type | What is Backed Up | Time | Restore Needs |
|------|-------------------|------|---------------|
| **Full** | All data | Longest | Full only |
| **Incremental** | Changes since last ANY backup | Shortest | Full + all incrementals |
| **Differential** | Changes since last FULL backup | Medium | Full + last differential |

### Backup Best Practices

- **3-2-1 Rule**: 3 copies, 2 media types, 1 offsite
- Test restores regularly
- Encrypt backup media
- Maintain backup inventory
- Rotate offsite media
- Document retention schedules

### Tape Rotation Schemes

- **Grandfather-Father-Son (GFS)**
  - Daily (Son) → Weekly (Father) → Monthly (Grandfather)
- **Tower of Hanoi** - Complex rotation for extended retention

---

## Domain 4G: Problem Management

### Problem vs. Incident

| Aspect | Incident | Problem |
|--------|----------|---------|
| **Goal** | Restore service | Prevent recurrence |
| **Focus** | Symptoms | Root cause |
| **Timeline** | Immediate | Longer-term |
| **Action** | Workaround | Permanent fix |

### Root Cause Analysis (RCA)

Methods include:
- 5 Whys
- Fishbone (Ishikawa) diagram
- Fault tree analysis
- Pareto analysis

### Known Error Database (KEDB)

- Documents known problems and workarounds
- Speeds incident resolution
- Supports problem investigation

---

## Domain 4H: Asset Management

### Asset Lifecycle

1. **Procurement** - Acquire assets
2. **Deployment** - Install and configure
3. **Operation** - Use and maintain
4. **Disposal** - Secure decommission

### Data Sanitization

| Method | Description | Security Level |
|--------|-------------|----------------|
| **Clear** | Overwrite once | Low |
| **Purge** | Multiple overwrites | Medium |
| **Destroy** | Physical destruction | High |

### Media Disposal

- Degaussing for magnetic media
- Shredding for physical destruction
- Certificate of destruction
- Chain of custody documentation

---

## Domain 4I: Monitoring and Capacity

### Performance Monitoring

- CPU utilization
- Memory usage
- Disk I/O
- Network bandwidth
- Application response time

### Capacity Planning

- Trend analysis
- Growth forecasting
- Resource optimization
- Proactive scaling
- Cost management

### SIEM (Security Information and Event Management)

- Log aggregation
- Correlation analysis
- Alert generation
- Compliance reporting
- Forensic investigation

---

## Key Formulas

### Recovery Relationship
\`\`\`
RPO + RTO + WRT ≤ MTD
\`\`\`

### Availability Calculation
\`\`\`
Availability = (Total Time - Downtime) / Total Time × 100%
\`\`\`

### MTBF and MTTR
\`\`\`
MTBF = Mean Time Between Failures
MTTR = Mean Time To Repair
Availability = MTBF / (MTBF + MTTR)
\`\`\`

---

## Memory Aids

### Recovery Sites (Hot → Cold)
\`\`\`
Hot ($$$, Fast) → Warm ($$, Medium) → Cold ($, Slow)
\`\`\`

### Backup Restore Requirements
\`\`\`
Full: Just Full
Differential: Full + Last Differential
Incremental: Full + ALL Incrementals
\`\`\`

### Incident Response: PICER-L
\`\`\`
Prepare → Identify → Contain → Eradicate → Recover → Lessons Learned
\`\`\`

---

## Exam Tips for Domain 4

1. **BIA determines RTO/RPO** based on business needs
2. **Hot site is fastest** recovery but most expensive
3. **Incremental backup** takes longest to restore
4. **Problem management** finds root cause; incident management restores service
5. **Chain of custody** is critical for forensic evidence
6. **Test backups** by actually restoring data
7. **MT D > RTO + WRT** must always be true
8. **Cold sites** have no pre-installed equipment

---

## Practice Questions Focus Areas

- BIA outputs and recovery objectives
- Backup types and restore requirements
- Recovery site characteristics
- Incident response phases
- Problem vs. incident management
- Asset lifecycle and disposal
- Environmental controls
- SLA/OLA/UC relationships
