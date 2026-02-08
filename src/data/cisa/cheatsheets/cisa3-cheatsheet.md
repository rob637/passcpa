# CISA Domain 3: Information Systems Acquisition, Development & Implementation
## 12% of Exam Weight

---

## SDLC Phases

### Traditional Waterfall SDLC
| Phase | Key Activities |
|-------|---------------|
| 1. Feasibility | Business case, ROI |
| 2. Requirements | Gather, document, approve |
| 3. Design | Architecture, specifications |
| 4. Development | Build, code |
| 5. Testing | Verify, validate |
| 6. Implementation | Deploy, train |
| 7. Maintenance | Support, enhance |

### Phase-End Deliverables
| Phase | Key Deliverable |
|-------|----------------|
| Feasibility | Business case |
| Requirements | SRS (Software Req Spec) |
| Design | SDD (System Design Doc) |
| Development | Source code |
| Testing | Test results |
| Implementation | Go-live approval |

---

## Development Methodologies

### Methodology Comparison
| Methodology | Characteristics |
|-------------|----------------|
| Waterfall | Sequential, documented, rigid |
| Agile | Iterative, flexible, user-focused |
| Spiral | Risk-driven, prototyping |
| RAD | Rapid, prototype-based |
| DevOps | Dev + Ops integration |

### Agile Principles
- Individuals over processes
- Working software over documentation
- Customer collaboration over contracts
- Responding to change over plans

### Scrum Components
| Component | Purpose |
|-----------|---------|
| Sprint | Time-boxed iteration (2-4 weeks) |
| Product Backlog | Prioritized requirements |
| Sprint Backlog | Work for current sprint |
| Daily Standup | 15-min status meeting |
| Sprint Review | Demo to stakeholders |
| Retrospective | Process improvement |

---

## Requirements Management

### Types of Requirements
| Type | Description |
|------|-------------|
| Functional | What system does |
| Non-functional | How system performs |
| Business | Organization needs |
| User | End-user needs |
| Technical | Technology constraints |

### Good Requirements (SMART)
- **S**pecific
- **M**easurable
- **A**chievable
- **R**elevant
- **T**ime-bound

### Requirements Traceability
- Links requirements to design, code, tests
- Ensures all requirements implemented
- Supports change impact analysis

---

## Design & Architecture

### Design Principles
| Principle | Description |
|-----------|-------------|
| Cohesion | Related functions together |
| Coupling | Minimize dependencies |
| Abstraction | Hide complexity |
| Modularity | Independent components |

### Architecture Types
| Type | Characteristics |
|------|----------------|
| Monolithic | Single, tightly coupled |
| Client-Server | Distributed processing |
| SOA | Service-oriented |
| Microservices | Independent services |
| Serverless | Function-based |

---

## Testing

### Testing Levels (Bottom-Up)
```
Unit Testing (developers)
    ↓
Integration Testing (combined units)
    ↓
System Testing (complete system)
    ↓
UAT (user validation)
```

### Testing Types
| Type | Purpose |
|------|---------|
| Functional | Does it work right? |
| Performance | Is it fast enough? |
| Security | Is it secure? |
| Stress | Breaking point? |
| Regression | Did changes break things? |
| UAT | User acceptance |

### Test Design Techniques
| Technique | Description |
|-----------|-------------|
| Equivalence Partitioning | Divide inputs into groups |
| Boundary Value | Test at boundaries |
| Decision Table | Test combinations |
| State Transition | Test state changes |

---

## Security in Development

### OWASP Top 10 (Key Items)
1. Injection (SQL, command)
2. Broken Authentication
3. Sensitive Data Exposure
4. XML External Entities (XXE)
5. Broken Access Control

### Secure Coding Practices
| Practice | Purpose |
|----------|---------|
| Input Validation | Prevent injection |
| Output Encoding | Prevent XSS |
| Parameterized Queries | Prevent SQL injection |
| Least Privilege | Minimize access |
| Error Handling | Prevent info disclosure |

### Security Testing
| Method | When |
|--------|------|
| SAST (Static) | Development |
| DAST (Dynamic) | Testing |
| SCA | Throughout |
| Penetration | Pre-production |

---

## Change Management

### Change Control Process
1. Request submission
2. Impact assessment
3. Risk analysis
4. Authorization (CAB)
5. Implementation
6. Testing
7. Documentation
8. Post-implementation review

### Change Types
| Type | Authorization |
|------|--------------|
| Standard | Pre-approved |
| Normal | CAB approval |
| Emergency | Post-implementation approval |

### Change Advisory Board (CAB)
- Reviews and approves changes
- Assesses risk and impact
- Schedules implementations
- Represented by key stakeholders

---

## Configuration Management

### Key Concepts
| Concept | Definition |
|---------|------------|
| CI (Config Item) | Managed component |
| Baseline | Approved configuration point |
| CMDB | Database of CIs |
| Version Control | Track changes |

### Version Control
- Maintains history of changes
- Enables rollback
- Supports branching/merging
- Provides audit trail

---

## Implementation

### Deployment Strategies
| Strategy | Description | Risk |
|----------|-------------|------|
| Big Bang | All at once | High |
| Phased | Gradual rollout | Medium |
| Parallel | Run old and new | Low |
| Pilot | Limited test group | Low |

### Implementation Risks
- Data migration errors
- User adoption resistance
- Integration failures
- Performance issues
- Rollback failures

### Go-Live Checklist
- [ ] UAT sign-off
- [ ] Training completed
- [ ] Documentation ready
- [ ] Rollback plan tested
- [ ] Support ready
- [ ] Data migration verified

---

## Acquisition

### Buy vs Build Decision
| Factor | Buy | Build |
|--------|-----|-------|
| Time | Faster | Slower |
| Customization | Limited | Full |
| Cost | Predictable | Variable |
| Maintenance | Vendor | Internal |
| Control | Less | More |

### Vendor Selection
1. Define requirements
2. Issue RFP/RFI
3. Evaluate responses
4. Due diligence
5. Contract negotiation
6. Selection/approval

### Software Escrow
- Source code held by third party
- Released if vendor fails
- Protects customer interests

---

## Quick Reference

### Testing Environment Progression
```
DEV → SIT → UAT → STAGING → PRODUCTION
```

### CI/CD Pipeline
```
Code → Build → Test → Deploy
       ↑                  ↓
       ←←← Feedback ←←←←←←
```

---

## Exam Tips - Domain 3

1. **Requirements MUST be traceable**
2. **Testing moves from unit to system level**
3. **All changes go through change control**
4. **Security is built in, not bolted on**
5. **UAT is USER acceptance, not IT**
6. **Rollback plans are MANDATORY**
7. **Documentation is required at EVERY phase**

---

*Remember: Quality in = Quality out. Garbage in = Garbage out.*
