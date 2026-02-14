# Financial Calculator Guide

## Approved Calculators for CFP Exam

| Calculator | Features |
|------------|----------|
| HP 10bII+ | Algebraic entry, TVM, cash flows |
| HP 12c | RPN entry, TVM, cash flows |
| TI BA II Plus | Algebraic entry, TVM, cash flows |
| TI BA II Plus Professional | Enhanced display, same functions |

---

## Texas Instruments BA II Plus

### Getting Started

#### Essential Settings
| Setting | Keys | Recommended |
|---------|------|-------------|
| Payments per year | [2nd] [P/Y] | 1 |
| Compounding per year | [2nd] [C/Y] | 1 |
| End mode (ordinary annuity) | [2nd] [BGN] [2nd] [SET] | END |
| Decimal places | [2nd] [FORMAT] | 4 |

#### Clearing
| Action | Keys |
|--------|------|
| Clear TVM | [2nd] [CLR TVM] |
| Clear work | [2nd] [CLR WORK] |
| All clear | [2nd] [RESET] [ENTER] |

---

### Time Value of Money (TVM)

#### Key Layout
| Key | Meaning |
|-----|---------|
| [N] | Number of periods |
| [I/Y] | Interest rate per year (%) |
| [PV] | Present value |
| [PMT] | Payment |
| [FV] | Future value |

#### Sign Convention
- **Cash outflow**: Negative (paying out)
- **Cash inflow**: Positive (receiving)
- **Example**: PV investment = negative, FV received = positive

---

### Common TVM Calculations

#### Future Value of Lump Sum
*How much will $10,000 be worth in 10 years at 7%?*
1. [2nd] [CLR TVM]
2. 10 [N]
3. 7 [I/Y]
4. -10000 [PV]
5. 0 [PMT]
6. [CPT] [FV] → **$19,671.51**

#### Present Value of Future Sum
*How much to invest today for $50,000 in 15 years at 6%?*
1. [2nd] [CLR TVM]
2. 15 [N]
3. 6 [I/Y]
4. 0 [PMT]
5. 50000 [FV]
6. [CPT] [PV] → **-$20,862.98**

#### Retirement Savings (Annuity)
*Save $5,000/year for 30 years at 8%*
1. [2nd] [CLR TVM]
2. 30 [N]
3. 8 [I/Y]
4. 0 [PV]
5. -5000 [PMT]
6. [CPT] [FV] → **$566,416.06**

---

### NPV and IRR

#### Net Present Value
*Initial investment $100,000, cash flows: $30,000/year for 5 years, rate 10%*
1. [CF] [2nd] [CLR WORK]
2. -100000 [ENTER] [↓]
3. 30000 [ENTER] [↓]
4. 5 [ENTER] [↓]
5. [NPV] 10 [ENTER] [↓]
6. [CPT] → **$13,723.60**

#### Internal Rate of Return
*Same data as above*
1. After entering cash flows...
2. [IRR] [CPT] → **15.24%**

---

## HP 12c

### RPN (Reverse Polish Notation)

#### How RPN Works
- Enter numbers first, then operator
- No equals key needed
- Stack-based calculation

| Traditional | RPN |
|-------------|-----|
| 5 + 3 = | 5 [ENTER] 3 [+] |
| 100 × 1.07 = | 100 [ENTER] 1.07 [×] |

---

### Key TVM Layout (HP 12c)

| Key | Meaning |
|-----|---------|
| [n] | Number of periods |
| [i] | Interest rate per period |
| [PV] | Present value |
| [PMT] | Payment |
| [FV] | Future value |

### Financial Modes
| Function | Keys |
|----------|------|
| Begin mode | [g] [BEG] |
| End mode | [g] [END] |
| Clear financial | [f] [FIN] |
| Clear all | [f] [REG] |

---

### Common HP 12c Calculations

#### Future Value Example
*$10,000 at 7% for 10 years*
1. [f] [FIN]
2. 10 [n]
3. 7 [i]
4. 10000 [CHS] [PV]
5. 0 [PMT]
6. [FV] → **$19,671.51**

---

## Critical CFP Calculations

### 1. Time Value of Money
- [ ] Future value of lump sum
- [ ] Present value of lump sum
- [ ] FV of ordinary annuity
- [ ] PV of ordinary annuity
- [ ] FV of annuity due
- [ ] PV of annuity due

### 2. Retirement Planning
- [ ] Required savings rate
- [ ] Portfolio value at retirement
- [ ] Sustainable withdrawal
- [ ] Shortfall analysis

### 3. Education Planning
- [ ] Future cost of education
- [ ] Required savings
- [ ] Current vs future dollars

### 4. Investment Analysis
- [ ] NPV
- [ ] IRR
- [ ] Holding period return
- [ ] Real vs nominal returns

---

## Common Mistakes to Avoid

| Mistake | Solution |
|---------|----------|
| Wrong sign (PV/FV) | Cash out = negative, cash in = positive |
| P/Y not set | Always set P/Y = 1, adjust N and I/Y |
| Forgot to clear | Always clear TVM before new problem |
| BGN vs END | Annuity due = BGN, ordinary = END |
| Rate vs decimal | Enter 7 for 7%, not 0.07 |

---

## Quick Formula Reference

### Real Rate of Return
`Real = [(1 + Nominal) / (1 + Inflation)] - 1`

### Rule of 72
`Years to Double = 72 / Interest Rate`

### Holding Period Return
`HPR = (Ending Value - Beginning Value + Income) / Beginning Value`
