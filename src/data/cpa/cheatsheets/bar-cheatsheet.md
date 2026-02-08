# CPA BAR Cheatsheet (Business Analysis & Reporting)

## Section Overview
- **Exam Weight**: One of three discipline sections (choose 1)
- **Focus Areas**: Data analytics, IT, financial analysis, advanced accounting
- **Time**: 120 minutes
- **Format**: 50 MCQ + Task-Based Simulations

---

## Data Analytics

### Data Types

| Type | Description | Examples |
|------|-------------|----------|
| Structured | Organized in rows/columns | Databases, spreadsheets |
| Semi-structured | Has organizational markers | XML, JSON, emails |
| Unstructured | No predefined format | Text, images, video |

### ETL Process
1. **E**xtract: Pull data from source systems
2. **T**ransform: Clean, validate, standardize
3. **L**oad: Move to target database/warehouse

### Data Quality Attributes - **ACCURATE**
- **A**ccuracy: Correct values
- **C**ompleteness: No missing data
- **C**onsistency: Same format across sources
- **U**niqueness: No duplicates
- **R**elevance: Applicable to analysis
- **A**ccessibility: Available when needed
- **T**imeliness: Current and up-to-date
- **E**nterprise-wide: Consistent across organization

---

## Descriptive Statistics

### Measures of Central Tendency

| Measure | Definition | When to Use |
|---------|------------|-------------|
| Mean | Sum ÷ Count | Normal distributions, no outliers |
| Median | Middle value | Skewed data, with outliers |
| Mode | Most frequent | Categorical data |

### Measures of Variability

| Measure | Formula | Interpretation |
|---------|---------|----------------|
| Range | Max - Min | Overall spread |
| Variance | Σ(x-μ)² / n | Average squared deviation |
| Std Dev | √Variance | Typical deviation from mean |
| Coefficient of Variation | StdDev / Mean | Relative variability |

### Distribution Shapes
- **Normal**: Symmetric, bell-shaped (mean = median = mode)
- **Right-skewed**: Long tail to right (mean > median)
- **Left-skewed**: Long tail to left (mean < median)

---

## Visualization Best Practices

### Chart Selection

| Data Type | Best Chart |
|-----------|------------|
| Trends over time | Line chart |
| Comparisons | Bar chart |
| Proportions | Pie chart (limited categories) |
| Relationships | Scatter plot |
| Distributions | Histogram, box plot |
| Geographic | Map/Heat map |

### Dashboard Principles
- Keep it simple - focus on KPIs
- Use consistent colors and formatting
- Provide drill-down capability
- Update in real-time or near-real-time

---

## Regression Analysis

### Simple Linear Regression
```
Y = a + bX
Where:
  Y = Dependent variable
  X = Independent variable
  a = Y-intercept
  b = Slope coefficient
```

### Key Metrics
| Metric | Meaning | Good Value |
|--------|---------|------------|
| R² | Variation explained | Closer to 1.0 |
| Adjusted R² | Accounts for # of predictors | Closer to 1.0 |
| P-value | Statistical significance | < 0.05 |
| Residuals | Prediction errors | Random, no pattern |

### Multiple Regression Assumptions
1. Linear relationship
2. No multicollinearity
3. Homoscedasticity (constant variance)
4. Normal residuals
5. Independence of observations

---

## Information Technology

### General IT Controls (GITCs)

| Category | Examples |
|----------|----------|
| Access Controls | Passwords, MFA, role-based access |
| Change Management | Testing, approval, documentation |
| Operations | Backups, job scheduling, monitoring |
| Physical Security | Data centers, badges, locks |

### Application Controls

| Type | Purpose |
|------|---------|
| Input Controls | Edit checks, validation, completeness |
| Processing Controls | Batch totals, reasonableness, recalculation |
| Output Controls | Distribution, reconciliation, review |

### Cybersecurity Threats

| Threat | Description |
|--------|-------------|
| Phishing | Deceptive emails to steal credentials |
| Ransomware | Encrypts data, demands payment |
| Malware | Malicious software (viruses, trojans) |
| DDoS | Overwhelms systems with traffic |
| SQL Injection | Malicious database queries |
| Man-in-the-Middle | Intercepts communications |

---

## Cloud Computing

### Service Models

| Model | What's Provided | User Manages |
|-------|-----------------|--------------|
| IaaS | Infrastructure (servers, storage) | OS, applications, data |
| PaaS | Platform (development environment) | Applications, data |
| SaaS | Complete application | Only data/config |

### Deployment Models
- **Public**: Shared infrastructure (AWS, Azure, GCP)
- **Private**: Dedicated to one organization
- **Hybrid**: Combination of public and private
- **Community**: Shared among similar organizations

### Cloud Risks
- Data security and privacy
- Vendor lock-in
- Compliance concerns
- Availability/downtime

---

## Business Combinations

### Acquisition Method
1. Identify the acquirer
2. Determine acquisition date
3. Recognize/measure identifiable assets/liabilities at FV
4. Recognize goodwill or gain on bargain purchase

### Goodwill Calculation
```
Consideration transferred
+ Fair value of noncontrolling interest
+ Fair value of previously held equity interest
- Fair value of identifiable net assets acquired
= Goodwill (or Bargain Purchase Gain if negative)
```

### Consolidation Entries - **SIADE**
- **S**: Stock investment eliminated against equity
- **I**: Inter-company balances eliminated
- **A**: Assets adjusted to fair value
- **D**: Deferred tax effects
- **E**: Eliminate inter-company transactions

---

## Foreign Currency

### Functional Currency Tests
- Primary economic environment
- Where cash is generated/spent
- Where sales/costs are denominated

### Translation vs. Remeasurement

| Aspect | Translation | Remeasurement |
|--------|-------------|---------------|
| When used | Functional ≠ Reporting | Functional = Reporting (parent's) |
| Assets/Liabilities | Current rate | Monetary: Current; Non-monetary: Historical |
| Revenues/Expenses | Weighted average rate | Weighted average (or historical for some) |
| Adjustment | OCI (cumulative translation adj) | Income statement (gain/loss) |

### Current Rate Method (Translation)
- All assets/liabilities: Current exchange rate
- Equity: Historical rate
- Income statement: Average rate
- CTA goes to OCI

---

## Financial Analysis Ratios

### Liquidity Ratios
| Ratio | Formula | Interpretation |
|-------|---------|----------------|
| Current Ratio | Current Assets / Current Liabilities | > 1.5 generally good |
| Quick Ratio | (CA - Inventory) / CL | More conservative |
| Cash Ratio | Cash + Marketable Securities / CL | Most conservative |

### Profitability Ratios
| Ratio | Formula |
|-------|---------|
| Gross Margin | Gross Profit / Sales |
| Operating Margin | Operating Income / Sales |
| Net Profit Margin | Net Income / Sales |
| ROA | Net Income / Average Total Assets |
| ROE | Net Income / Average Equity |

### Leverage Ratios
| Ratio | Formula | Interpretation |
|-------|---------|----------------|
| Debt Ratio | Total Debt / Total Assets | Higher = more leveraged |
| Debt-to-Equity | Total Debt / Total Equity | Higher = more risk |
| Interest Coverage | EBIT / Interest Expense | Higher = safer |

### DuPont Analysis (ROE Decomposition)
```
ROE = Net Profit Margin × Asset Turnover × Financial Leverage
    = (NI/Sales) × (Sales/Assets) × (Assets/Equity)
```

---

## Variance Analysis

### Standard Cost Variances

| Variance | Formula | Favorable When |
|----------|---------|----------------|
| Material Price | (AP - SP) × AQ Purchased | AP < SP |
| Material Quantity | (AQ Used - SQ) × SP | AQ < SQ |
| Labor Rate | (AR - SR) × AH | AR < SR |
| Labor Efficiency | (AH - SH) × SR | AH < SH |
| Variable OH Spending | (AR - SR) × AH | AR < SR |
| Variable OH Efficiency | (AH - SH) × SR | AH < SH |
| Fixed OH Budget | Actual FOH - Budgeted FOH | Actual < Budget |
| Fixed OH Volume | Budgeted FOH - Applied FOH | Applied > Budget |

---

## Key Numbers to Memorize

| Item | Value |
|------|-------|
| Confidence level (typical) | 95% (p < 0.05) |
| R² interpretation | > 0.7 generally strong |
| Standard deviation (normal) | 68% within 1 SD, 95% within 2 SD |
| Consolidation control threshold | > 50% voting interest |
| Equity method | 20-50% ownership |
| Significant influence indicator | Board representation |

---

## Common Exam Traps

1. **Correlation ≠ Causation**: High R² doesn't prove cause
2. **Goodwill**: Never amortized (GAAP), tested annually for impairment
3. **Translation adjustment**: Goes to OCI, not income
4. **Remeasurement gain/loss**: Goes to income statement
5. **Variable vs Absorption costing**: Difference is fixed manufacturing OH
6. **Cloud SaaS**: User responsible only for data, not infrastructure
7. **Intercompany profit**: Must eliminate unrealized profit on downstream/upstream sales
8. **Noncontrolling interest**: Presented IN equity, not as liability

---

## Mnemonics

- **ACCURATE**: Data quality attributes
- **ETL**: Extract, Transform, Load
- **SIADE**: Consolidation entries
- **CRIME**: Internal control components (from AUD)
- **IPS**: Cloud models (Infrastructure, Platform, Software)
