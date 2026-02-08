# EA SEE Part 2: Businesses Cheatsheet

## Section Overview
- **Exam Weight**: 100 questions (85 scored, 15 pretest)
- **Time**: 3.5 hours (210 minutes)
- **Passing Score**: 105 scaled (approximately 70%)
- **Focus**: Business entities, partnerships, corporations, S-corps

---

## Entity Classification

### Check-the-Box Rules
| Entity Type | Default Classification | Can Elect |
|-------------|----------------------|-----------|
| Corporation | C-Corp | S-Corp (if eligible) |
| LLC (1 member) | Disregarded entity | Corp or partnership |
| LLC (2+ members) | Partnership | Corporation |
| Partnership | Partnership | Corporation |

### S-Corp Requirements
- ≤ 100 shareholders
- Only individuals, estates, certain trusts
- U.S. citizens or residents only
- One class of stock
- Not a bank, insurance co., or DISC

---

## Sole Proprietorship

### Key Characteristics
- Not a separate entity
- Reported on Schedule C
- Subject to SE tax
- Unlimited personal liability

### Schedule C
- Gross receipts minus COGS = Gross profit
- Gross profit minus expenses = Net profit
- Net profit flows to Form 1040

### Home Office Deduction
- Exclusive and regular business use
- **Simplified method**: $5/sq ft (max 300 sq ft = $1,500)
- **Regular method**: Actual expenses × business %

---

## Partnership Taxation

### Formation
- Generally tax-free (§721)
- Partner's basis = basis of contributed property
- Partnership's basis = carryover from partner

### Outside Basis vs Inside Basis
| Concept | Definition | Used For |
|---------|------------|----------|
| **Outside Basis** | Partner's basis in partnership interest | Loss deductions, distributions, sale |
| **Inside Basis** | Partnership's basis in its assets | Depreciation, asset sales |

### Outside Basis Calculation - **BASE**
| Letter | Component |
|--------|-----------|
| **B** | Beginning basis |
| **A** | Add: Income, contributions, liability increases |
| **S** | Subtract: Losses, distributions, liability decreases |
| **E** | Ending basis |

### Partnership Liabilities

| Liability Type | Allocation Rule | Basis Effect |
|---------------|-----------------|--------------|
| **Recourse** | Economic risk of loss | Partner bearing risk gets basis |
| **Nonrecourse** | Profit-sharing ratio | All partners per % |
| **Qualified Nonrecourse** | Profit-sharing (real estate) | Special at-risk treatment |

### Key Partnership Rules
- Partners include share of liabilities in basis (unlike S-corps!)
- Basis cannot go below zero
- Liability decrease → deemed distribution if exceeds basis
- Built-in gains/losses tracked to contributing partner1

### Distributions
| Type | Tax Treatment |
|------|---------------|
| Cash (operating) | Tax-free to extent of basis |
| Cash > basis | Capital gain on excess |
| Property | Carryover basis, no immediate gain |

### Partner's Distributive Share
- Partners taxed on share of income whether distributed or not
- Separately stated items (capital gains, charitable, etc.)
- Ordinary business income/loss

---

## S Corporation Taxation

### S Election
- Form 2553 by March 15 (or 2 months 15 days into tax year)
- All shareholders must consent
- Election is prospective (or retroactive if timely)

### Pass-Through Taxation
- No entity-level tax (exceptions: LIFO recapture, BIG, passive income)
- Income/loss flows to shareholders via Schedule K-1
- Shareholders taxed whether or not distributed

### Shareholder Basis Rules

| Adds to Basis | Subtracts from Basis |
|---------------|---------------------|
| Stock purchase | Distributions |
| Capital contributions | Nondeductible expenses |
| Share of income | Share of losses |
| Direct shareholder loans | Loan repayments |

### S-Corp vs Partnership: Critical Difference
```
S-Corp: Guaranteed loans do NOT add basis
Partnership: Share of ALL liabilities adds basis
```

### Distribution Ordering (AAA)
1. Accumulated Adjustments Account (AAA) - tax-free to basis
2. Accumulated E&P (from prior C-corp years) - dividend
3. Return of stock basis - tax-free
4. Capital gain - excess

### Built-In Gains Tax
- Applies if S-corp was prior C-corp
- 5-year recognition period
- Tax at 21% on built-in gains

---

## C Corporation Taxation

### Tax Rate
- Flat 21% on taxable income

### Taxable Income Calculation
```
Gross Income
- Business Deductions
= Taxable Income Before Special Deductions
- Dividends Received Deduction
= Taxable Income
```

### Dividends Received Deduction (DRD)
| Ownership % | DRD % |
|-------------|-------|
| < 20% | 50% |
| 20-79% | 65% |
| ≥ 80% | 100% |

### Charitable Contribution Limit
- Limited to 10% of taxable income (before DRD)
- 5-year carryforward

### Capital Losses
- Can only offset capital gains
- 3-year carryback, 5-year carryforward

### Net Operating Losses (NOL)
- 80% of taxable income limit
- Unlimited carryforward
- No carryback (generally)

---

## Corporate Formation (§351)

### Requirements for Tax-Free Treatment
1. Property transferred to corporation
2. Transferors control corporation (≥ 80%)
3. Stock received in exchange

### Boot Rules
- Boot = anything received other than stock
- Boot received → gain recognized (not losses)
- Basis in stock = basis of property - boot + gain recognized

### Shareholder's Basis in Stock
```
Basis of property contributed
+ Gain recognized
- Boot received
- Liabilities assumed by corp
= Basis in stock received
```

---

## Depreciation & Asset Expensing

### MACRS Recovery Periods
| Asset | GDS | ADS |
|-------|-----|-----|
| Autos, computers | 5 years | 5 years |
| Office furniture | 7 years | 10 years |
| Residential rental | 27.5 years | 30 years |
| Commercial real estate | 39 years | 40 years |

### §179 Expense (2026)
- Maximum: $1,220,000
- Phase-out begins: $3,050,000
- Limited to business income
- Cannot create loss

### Bonus Depreciation (2026)
- 40% (phasing down)
- No income limitation
- New AND used property

### Listed Property
- Must be > 50% business use for accelerated depreciation
- Auto limits apply annually

---

## §1231 and Recapture

### §1231 Property
- Business property held > 1 year
- Net gain → Long-term capital gain
- Net loss → Ordinary loss

### Depreciation Recapture

| Rule | Property Type | Recapture Amount |
|------|---------------|------------------|
| §1245 | Personal property | All depreciation |
| §1250 | Real property | Excess over straight-line |
| Unrecaptured §1250 | Real property | 25% rate on depreciation |

---

## Like-Kind Exchanges (§1031)

### Requirements
- Real property only (since 2018)
- Held for business or investment
- 45-day identification period
- 180-day closing period

### Basis Calculation
```
Basis of old property
+ Boot paid
- Boot received
+ Gain recognized
= Basis of new property
```

### Boot = Taxable Gain
- Cash received = boot
- Net mortgage relief = boot
- Boot triggers gain (not loss)

---

## Employment Taxes

### Rates for 2026
| Tax | Employee | Employer | Total |
|-----|----------|----------|-------|
| Social Security | 6.2% | 6.2% | 12.4% |
| Medicare | 1.45% | 1.45% | 2.9% |
| Additional Medicare | 0.9% | N/A | 0.9% |

### Wage Bases
- Social Security: $176,100
- Medicare: No limit
- Additional Medicare: Over $200K (single) / $250K (MFJ)

### Deposit Rules
| Lookback Liability | Deposit Schedule |
|-------------------|------------------|
| ≤ $50,000 | Monthly (by 15th) |
| > $50,000 | Semi-weekly |
| ≥ $100,000 any day | Next business day |

---

## Accounting Methods

### Cash Method
- Income when received
- Expenses when paid
- Cannot use: C-corps > $30M, tax shelters, inventory (generally)

### Accrual Method
- Income when earned (all events test)
- Expenses when incurred and economic performance met
- Required for large businesses

### Inventory Methods
| Method | COGS in Inflation | EI in Inflation |
|--------|------------------|-----------------|
| FIFO | Lower | Higher |
| LIFO | Higher | Lower |
| Average | Middle | Middle |

---

## Key Numbers to Memorize

| Item | 2026 Amount |
|------|-------------|
| §179 Maximum | $1,220,000 |
| §179 Phase-out | $3,050,000 |
| Bonus Depreciation | 40% |
| Corporate Tax Rate | 21% |
| SS Wage Base | $176,100 |
| S-Corp Shareholders Max | 100 |
| 45-day ID period (1031) | 45 days |
| 180-day closing (1031) | 180 days |
| Monthly deposit threshold | $50,000 |

---

## Common Exam Traps

1. **S-Corp basis**: Guaranteed loans do NOT add basis (unlike partnerships!)
2. **Partnership liabilities**: Partners get basis for share of ALL liabilities
3. **§1031**: Real property ONLY since 2018
4. **§351**: Must have 80% control AFTER transfer
5. **DRD**: Limited to percentage of taxable income (except 100% DRD)
6. **Built-in gains**: 5-year period for S-corps from C-corp conversion
7. **AAA**: Can go negative (unlike stock basis)
8. **Check-the-box**: Default for LLC depends on number of members

---

## Mnemonics

- **BASE**: Outside basis calculation (Beginning, Add, Subtract, Ending)
- **DISCO**: S-corp prohibited entities (DISC, Insurance, Certain banks)
- **SIMPLE**: Entity selection considerations
- **MACRS**: Modified Accelerated Cost Recovery System
