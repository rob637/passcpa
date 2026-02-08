# CMA Part 1: Financial Planning, Performance, and Analytics

## Section Overview
- **Exam Weight**: Part 1 of 2
- **Questions**: 100 MCQ + 2 Essays
- **Time**: 4 hours
- **Passing Score**: 360 scaled (out of 500)

---

## Section A: External Financial Reporting Decisions (15%)

### Financial Statement Elements
| Statement | Key Elements |
|-----------|-------------|
| **Balance Sheet** | Assets = Liabilities + Equity |
| **Income Statement** | Revenue - Expenses = Net Income |
| **Cash Flow** | Operating + Investing + Financing = Net Change |
| **Equity Statement** | Beginning + Net Income - Dividends +/- OCI = Ending |

### Revenue Recognition (ASC 606)
Five-step model:
1. Identify the contract
2. Identify performance obligations
3. Determine transaction price
4. Allocate to performance obligations
5. Recognize when/as obligations satisfied

### Inventory Methods
| Method | COGS (Rising Prices) | Ending Inventory | Tax |
|--------|---------------------|------------------|-----|
| FIFO | Lower | Higher | Higher |
| LIFO | Higher | Lower | Lower |
| Weighted Avg | Middle | Middle | Middle |

### Depreciation Methods
| Method | Formula |
|--------|---------|
| **Straight-Line** | (Cost - Salvage) / Useful Life |
| **Double-Declining** | 2 × (1/Life) × Book Value |
| **Units of Production** | (Cost - Salvage) × (Units Used / Total Units) |
| **Sum-of-Years** | (Cost - Salvage) × (Remaining Years / SYD) |

SYD = n(n+1)/2 where n = useful life

### Lease Accounting (ASC 842)
| Type | Balance Sheet | Income Statement |
|------|---------------|------------------|
| **Operating** | ROU Asset + Liability | Single lease expense |
| **Finance** | ROU Asset + Liability | Amortization + Interest |

---

## Section B: Planning, Budgeting, and Forecasting (20%)

### Master Budget Components
```
Sales Budget → Production Budget → Direct Materials Budget
                                 → Direct Labor Budget
                                 → Manufacturing Overhead Budget
                    ↓
            Ending Inventory Budget
                    ↓
            Cost of Goods Sold Budget
                    ↓
            Selling & Admin Budget
                    ↓
            Budgeted Income Statement
                    ↓
            Cash Budget → Budgeted Balance Sheet
```

### Production Budget Formula
```
Production Units = Sales Units + Desired Ending Inventory - Beginning Inventory
```

### Direct Materials Budget
```
Materials Needed = Production Units × Materials per Unit
Materials to Purchase = Materials Needed + Ending Inventory - Beginning Inventory
```

### Cash Budget Components
| Inflows | Outflows |
|---------|----------|
| Cash sales | Materials purchases |
| Collections on A/R | Labor payments |
| Loan proceeds | Overhead payments |
| Asset sales | S&A expenses |
| Interest/dividends received | Capital expenditures |
| | Loan payments |
| | Tax payments |

### Forecasting Methods
| Method | Use Case |
|--------|----------|
| **Time Series** | Historical patterns, trends |
| **Causal/Regression** | Variable relationships |
| **Qualitative** | New products, no history |
| **Moving Average** | Smooth fluctuations |
| **Exponential Smoothing** | Weight recent data more |

---

## Section C: Performance Management (20%)

### Variance Analysis Formulas

#### Direct Materials
| Variance | Formula |
|----------|---------|
| **Price** | (AP - SP) × AQ Purchased |
| **Quantity/Usage** | (AQ Used - SQ Allowed) × SP |

#### Direct Labor
| Variance | Formula |
|----------|---------|
| **Rate** | (AR - SR) × AH Worked |
| **Efficiency** | (AH Worked - SH Allowed) × SR |

#### Variable Overhead
| Variance | Formula |
|----------|---------|
| **Spending** | Actual VOH - (AH × Standard Rate) |
| **Efficiency** | (AH - SH) × Standard VOH Rate |

#### Fixed Overhead
| Variance | Formula |
|----------|---------|
| **Spending** | Actual FOH - Budgeted FOH |
| **Volume** | Budgeted FOH - Applied FOH |

### Responsibility Accounting
| Center | Controls | Evaluated On |
|--------|----------|--------------|
| **Cost** | Costs only | Variances, efficiency |
| **Revenue** | Revenue only | Sales targets |
| **Profit** | Revenue & costs | Operating income, margin |
| **Investment** | Revenue, costs, assets | ROI, RI, EVA |

### Performance Metrics
| Metric | Formula |
|--------|---------|
| **ROI** | Operating Income / Average Assets |
| **Residual Income** | Operating Income - (Required Rate × Assets) |
| **EVA** | NOPAT - (WACC × Invested Capital) |

---

## Section D: Cost Management (15%)

### Cost Behavior
| Type | Characteristics |
|------|-----------------|
| **Variable** | Changes with activity |
| **Fixed** | Constant in total |
| **Mixed** | Fixed + Variable component |
| **Step** | Fixed within range, then jumps |

### High-Low Method
```
Variable Cost/Unit = (High Cost - Low Cost) / (High Activity - Low Activity)
Fixed Cost = Total Cost - (Variable Rate × Activity)
```

### Cost Allocation Methods
| Method | Description |
|--------|-------------|
| **Direct** | Allocate directly to production |
| **Step-down** | Sequential allocation (includes service) |
| **Reciprocal** | Simultaneous equations (most accurate) |

### Activity-Based Costing (ABC)
```
1. Identify activities
2. Assign costs to cost pools
3. Determine cost drivers
4. Calculate activity rates
5. Apply rates to products
```

### Joint and By-Product Costing
| Method | Allocation Basis |
|--------|------------------|
| **Physical Measure** | Quantity (weight, volume) |
| **Sales Value at Split-off** | Relative sales value |
| **NRV** | Sales value - Completion costs |

---

## Section E: Internal Controls (15%)

### COSO Framework Components
1. **Control Environment** - Tone at the top
2. **Risk Assessment** - Identify/analyze risks
3. **Control Activities** - Policies/procedures
4. **Information & Communication** - Information flows
5. **Monitoring** - Ongoing evaluation

### Types of Controls
| Type | Examples |
|------|----------|
| **Preventive** | Segregation of duties, authorization |
| **Detective** | Reconciliations, audits, reviews |
| **Corrective** | Error correction, policy updates |

### Segregation of Duties
| Function | Should Be Separate |
|----------|-------------------|
| **Authorization** | Approve transactions |
| **Recording** | Record in books |
| **Custody** | Handle physical assets |

---

## Section F: Technology and Analytics (15%)

### Data Analytics Types
| Type | Question Answered |
|------|-------------------|
| **Descriptive** | What happened? |
| **Diagnostic** | Why did it happen? |
| **Predictive** | What will happen? |
| **Prescriptive** | What should we do? |

### Key IT Controls
| Control Type | Examples |
|--------------|----------|
| **General Controls** | Access, development, operations |
| **Application Controls** | Input, processing, output |

### ERP Systems
- **Enterprise Resource Planning** - Integrated business software
- **Modules**: Finance, HR, Supply Chain, CRM
- **Benefits**: Single source of truth, real-time data
- **Risks**: Implementation cost, complexity

### Data Visualization
| Chart Type | Best For |
|------------|----------|
| **Bar/Column** | Comparisons |
| **Line** | Trends over time |
| **Pie** | Parts of whole (use sparingly) |
| **Scatter** | Correlations |
| **Heat Map** | Intensity/density |

---

## Key Formulas Summary

### Financial Ratios
| Ratio | Formula |
|-------|---------|
| Current Ratio | Current Assets / Current Liabilities |
| Quick Ratio | (Cash + A/R + Marketable Securities) / CL |
| Debt-to-Equity | Total Debt / Total Equity |
| Asset Turnover | Sales / Average Assets |
| Gross Margin | (Sales - COGS) / Sales |
| Operating Margin | Operating Income / Sales |

### Cost Formulas
| Concept | Formula |
|---------|---------|
| Break-even Units | Fixed Costs / CM per Unit |
| Break-even Sales | Fixed Costs / CM Ratio |
| Target Profit Units | (FC + Target Profit) / CM per Unit |
| Margin of Safety | Actual Sales - Break-even Sales |

### TVM Quick Reference
| Concept | Meaning |
|---------|---------|
| PV | Today's value of future cash |
| FV | Future value of today's cash |
| n | Number of periods |
| i | Interest rate per period |
| PMT | Periodic payment |

---

## Exam Tips
1. **Variance analysis** - Know all formulas cold; most tested topic
2. **Budget relationships** - Understand flow from sales to cash budget
3. **Responsibility centers** - Match evaluation metric to center type
4. **Cost behavior** - High-low method is calculation favorite
5. **ABC** - Understand when superior to traditional costing
