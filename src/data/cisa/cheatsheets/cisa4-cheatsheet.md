# CISA Domain 4: Information Systems Operations and Business Resilience
## 26% of Exam Weight (TIED FOR LARGEST)

---

## IT Operations

### Operations Functions
| Function | Purpose |
|----------|---------|
| Job Scheduling | Automate batch processing |
| Output Management | Control reports/outputs |
| Help Desk | User support |
| Monitoring | System health/performance |
| Incident Management | Restore service |

### Key Operations Controls
- Segregation of duties
- Job scheduling authorization
- Output distribution controls
- Operator activity logging
- Change management

---

## Service Management (ITIL)

### Key ITIL Processes
| Process | Purpose |
|---------|---------|
| Incident Management | Restore service quickly |
| Problem Management | Find root cause |
| Change Management | Control changes |
| Configuration Management | Track CIs |
| Service Level Management | Manage SLAs |

### Incident vs Problem vs Change
| Type | Goal | Example |
|------|------|---------|
| Incident | Restore service | Server down → restart |
| Problem | Prevent recurrence | Why does it keep failing? |
| Change | Implement improvements | Upgrade server |

### Service Level Agreements
| Metric | Definition |
|--------|------------|
| Availability | % uptime |
| Response Time | Time to respond |
| Resolution Time | Time to resolve |
| MTBF | Mean Time Between Failures |
| MTTR | Mean Time To Repair |

---

## Monitoring & Logging

### What to Monitor
| Category | Examples |
|----------|----------|
| Performance | CPU, memory, disk, network |
| Availability | Uptime, response times |
| Security | Access, events, alerts |
| Capacity | Usage trends, thresholds |

### Log Management
- Centralized collection
- Retention policies
- Protection from tampering
- Regular review
- Compliance requirements

### Alert Management
- Define thresholds
- Escalation procedures
- Avoid alert fatigue
- Regular tuning

---

## Business Continuity Planning (BCP)

### BCP Lifecycle
```
Business Impact Analysis (BIA)
         ↓
Risk Assessment
         ↓
Strategy Development
         ↓
Plan Development
         ↓
Testing & Exercises
         ↓
Maintenance
```

### Business Impact Analysis (BIA)
| Determine | Purpose |
|-----------|---------|
| Critical Processes | What must continue |
| Dependencies | Resources needed |
| Impact Over Time | Financial, operational |
| Recovery Objectives | RTO, RPO, MTPD |

### Key Recovery Metrics
| Metric | Definition | Driven By |
|--------|------------|-----------|
| **RTO** | Time to restore | Business tolerance |
| **RPO** | Data loss tolerance | Data criticality |
| **MTPD** | Max disruption time | Survival threshold |
| **WRT** | Work Recovery Time | RTO - system recovery |

### Relationship
```
RPO ←←← Disaster →→→ RTO →→→ WRT →→→ MTPD
(data loss)                      (max tolerance)
```

---

## Disaster Recovery (DR)

### Recovery Site Types
| Type | Recovery Time | Cost | Equipment |
|------|--------------|------|-----------|
| Hot Site | Minutes-hours | Highest | Full, current data |
| Warm Site | Hours-days | Medium | Partial, needs data |
| Cold Site | Days-weeks | Lowest | Space only |
| Mobile Site | Variable | Variable | Transportable |
| Reciprocal | Variable | Low | Shared |

### DR Testing Types (Low to High Risk)
| Test Type | Description | Disruption |
|-----------|-------------|------------|
| Checklist | Review documentation | None |
| Walkthrough | Table-top discussion | None |
| Simulation | Scenario exercise | Low |
| Parallel | Run at recovery site | Medium |
| Full Interruption | Switch to recovery | High |

### Recovery Strategies
| Strategy | Description |
|----------|-------------|
| Active-Passive | Standby takes over |
| Active-Active | Load balanced |
| Clustering | Automatic failover |
| Data Replication | Sync or async |

---

## Backup & Recovery

### 3-2-1 Rule
- **3** copies of data
- **2** different media types
- **1** copy offsite

### Backup Types
| Type | What's Backed Up | Restore Complexity |
|------|------------------|-------------------|
| Full | Everything | Simple |
| Incremental | Changes since last backup | Complex (need all) |
| Differential | Changes since last full | Medium (need last full) |

### Backup Considerations
- Encryption (at rest and transit)
- Regular testing
- Retention policies
- Air-gapped copies
- Ransomware protection

---

## Incident Response

### Incident Response Phases
```
1. Preparation → 2. Detection/Analysis → 3. Containment
                                              ↓
6. Post-Incident ← 5. Recovery ← 4. Eradication
```

### Incident Classification
| Severity | Impact | Response |
|----------|--------|----------|
| Critical | Business stopped | Immediate |
| High | Major functions impacted | < 1 hour |
| Medium | Some impact | < 4 hours |
| Low | Minor impact | < 8 hours |

### Evidence Handling
- Chain of custody
- Forensic imaging
- Hash verification
- Documentation
- Legal preservation

---

## Physical Security

### Defense in Depth Layers
```
1. Perimeter (fences, gates)
    ↓
2. Building (locks, guards)
    ↓
3. Internal (zones, access control)
    ↓
4. Asset (cages, safes)
```

### Data Center Controls
| Category | Examples |
|----------|----------|
| Access | Biometrics, badges, mantraps |
| Environmental | HVAC, fire suppression |
| Power | UPS, generators, PDUs |
| Monitoring | CCTV, sensors |

### Environmental Threats
| Threat | Control |
|--------|---------|
| Fire | Detection, suppression |
| Water | Detection, raised floors |
| Power | UPS, generators |
| Temperature | HVAC, monitoring |
| Humidity | Humidifiers/dehumidifiers |

---

## Cloud Operations

### Shared Responsibility Model
| Layer | IaaS | PaaS | SaaS |
|-------|------|------|------|
| Application | Customer | Customer | Provider |
| Data | Customer | Customer | Customer |
| Platform | Customer | Provider | Provider |
| Infrastructure | Provider | Provider | Provider |
| Physical | Provider | Provider | Provider |

### Cloud Resilience
- Multi-region deployment
- Auto-scaling
- Load balancing
- Backup to different region
- Vendor lock-in awareness

---

## Asset Management

### Lifecycle Stages
```
Acquisition → Deployment → Operation → Maintenance → Disposal
```

### Media Sanitization
| Method | Description | When Used |
|--------|-------------|-----------|
| Clearing | Overwriting | Reuse internally |
| Purging | Degaussing | Reuse externally |
| Destruction | Physical destruction | Highly sensitive |

---

## Quick Reference

### Availability Calculation
```
Availability = MTBF / (MTBF + MTTR) × 100%
```

### Availability Levels
| Nines | Availability | Downtime/Year |
|-------|-------------|--------------|
| 2 nines | 99% | 3.65 days |
| 3 nines | 99.9% | 8.76 hours |
| 4 nines | 99.99% | 52.56 minutes |
| 5 nines | 99.999% | 5.26 minutes |

---

## Exam Tips - Domain 4

1. **RTO and RPO are business decisions, NOT IT**
2. **Testing backups is as important as taking them**
3. **Incident = Restore quickly, Problem = Prevent recurrence**
4. **BIA comes BEFORE disaster recovery planning**
5. **Hot site = fastest, Cold site = cheapest**
6. **Chain of custody is CRITICAL for evidence**
7. **This is the LARGEST domain - know it well!**

---

*Remember: Hope is not a strategy. Plan for failure.*
