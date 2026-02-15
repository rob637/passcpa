/**
 * CFP Domain 7: Estate Planning
 * Advanced Estate Lessons
 * 
 * These lessons cover digital assets, trust administration, international estates,
 * and post-mortem planning strategies.
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_EST4_LESSONS: CFPLesson[] = [
  {
    id: "CFP-EST-L013",
    domain: "CFP-EST",
    blueprintArea: "EST-1",
    title: "Digital Assets and Estate Planning",
    order: 13,
    duration: 45,
    objectives: [
      "Identify types of digital assets requiring estate planning",
      "Apply the Revised Uniform Fiduciary Access to Digital Assets Act (RUFADAA)",
      "Create strategies for digital asset transfer and access",
      "Document digital assets for fiduciaries"
    ],
    content: `
# Digital Assets and Estate Planning

Digital assets are increasingly valuable parts of estates. Understanding how to plan for them is essential for modern estate planning.

---

## Types of Digital Assets

### Categories

| Category | Examples |
|----------|----------|
| **Financial** | Cryptocurrency, online banking, payment apps (Venmo, PayPal) |
| **Business** | Websites, domains, online stores, digital intellectual property |
| **Personal media** | Photos, videos, music, e-books |
| **Social** | Email, social media accounts, blogs |
| **Subscriptions** | Streaming services, cloud storage, software |
| **Gaming** | Game accounts, in-game purchases, virtual items |

### What Makes Them Different

| Issue | Traditional Assets | Digital Assets |
|-------|-------------------|----------------|
| **Access** | Physical possession | Password/authentication required |
| **Title** | Clear ownership | May be licensed, not owned |
| **Valuation** | Usually determinable | May be volatile or unclear |
| **Discovery** | Tangible evidence | May be unknown to family |

---

## Legal Framework: RUFADAA

### The Revised Uniform Fiduciary Access to Digital Assets Act

| Feature | Description |
|---------|-------------|
| **Purpose** | Grants fiduciaries access to decedents' digital accounts |
| **Adoption** | Most states have adopted (with variations) |
| **Key principle** | Terms-of-service controls, unless user directs otherwise |

### Hierarchy of Authority

1. **User's online tool** (platform-specific settings)
2. **User's estate plan** (will, trust, power of attorney)
3. **Terms of service** (default if no instructions)

### Platform Tools

| Platform | Tool Available |
|----------|---------------|
| Google | Inactive Account Manager |
| Facebook | Legacy Contact or memorialization |
| Apple | Digital Legacy contacts (iOS 15+) |
| Most platforms | Nothing built-in; rely on estate documents |

---

## Cryptocurrency Estate Planning

### Unique Challenges

| Challenge | Issue |
|-----------|-------|
| **Private keys** | If lost, assets are permanently inaccessible |
| **No intermediary** | No customer service to call |
| **Volatility** | Value can change dramatically |
| **Security vs. accessibility** | Trade-off between protection and fiduciary access |

### Planning Strategies

| Strategy | Description |
|----------|-------------|
| **Hardware wallet with documented seed phrase** | Secure, but phrase must be accessible |
| **Multi-signature wallet** | Multiple parties needed to access |
| **Custodial solutions** | Third-party holds keys (Coinbase, etc.) |
| **Digital asset trust** | Specialized trust with crypto provisions |

### Documentation

| Item | Store |
|------|-------|
| List of wallets/exchanges | Secure location (not with seed phrases) |
| Seed phrases | Separate secure location (safe deposit, vault) |
| Access instructions | Attorney's files or secure message |

---

## Creating a Digital Estate Plan

### Step 1: Inventory Digital Assets

| Field | Example |
|-------|---------|
| Account/asset name | Gmail, Coinbase, Domain name |
| URL/location | gmail.com, coinbase.com, GoDaddy |
| Username | john.doe@gmail.com |
| Access method | Password in manager, 2FA setup |
| Estimated value | N/A, $25,000, $500/year |

### Step 2: Update Estate Documents

Include digital asset provisions in:
- **Will** – General authorization for fiduciary access
- **Trust** – Specific digital asset provisions
- **Power of Attorney** – Authority during incapacity
- **Memorandum** – Detailed inventory (updated regularly)

### Sample Will Language

> "I authorize my Executor to access, manage, distribute, and delete any of my digital assets, accounts, and electronically stored information, including but not limited to email accounts, social media, cryptocurrency, and cloud storage, to the extent permitted by law and applicable terms of service."

### Step 3: Set Up Platform Tools

Configure each platform's legacy settings when available.

### Step 4: Secure Access Information

| Method | Pros | Cons |
|--------|------|------|
| Password manager with shared vault | Easy access | Security risk if compromised |
| Letter to executor with passwords | Simple | Outdated quickly |
| Digital asset vault service | Professional | Cost |
| Split knowledge (attorney + family) | Secure | Complex |

---

## Email and Social Media

### Email Access

| Platform | Policy |
|----------|--------|
| Gmail | Inactive Account Manager; may provide data with court order |
| Outlook/Microsoft | Next-of-kin process with documentation |
| Yahoo | Generally will delete; may provide data |

### Social Media Options

| Platform | Options |
|----------|---------|
| Facebook | Memorialize or delete; Legacy Contact manages |
| Instagram | Memorialize or remove |
| Twitter/X | Deactivate with proof of death |
| LinkedIn | Remove profile with death certificate |

---

## Key Takeaways

1. **Inventory digital assets** regularly and keep list updated
2. **Use platform tools** to designate legacy contacts
3. **Include digital asset provisions** in will, trust, and POA
4. **Document cryptocurrency access** securely but accessibly
5. **Store access information** where fiduciaries can find it

---

## Practice Questions

1. Under RUFADAA, the hierarchy of authority for digital asset access is:
   - A) Terms of service, then estate documents, then online tools
   - B) Online tools, then estate documents, then terms of service
   - C) Estate documents always override terms of service
   - D) Only a court order can grant access

   **Answer: B** - User's online tools (platform settings) take priority, then estate documents, then terms of service.

2. The PRIMARY risk with cryptocurrency in estates is:
   - A) Double taxation
   - B) Loss of private keys making assets inaccessible
   - C) Automatic transfer to the state
   - D) Prohibition against inheritance

   **Answer: B** - Without private keys or seed phrases, cryptocurrency cannot be accessed and is effectively lost forever.
`,
    keyTerms: [
      { term: "RUFADAA", definition: "Law granting fiduciaries access to decedents' digital accounts" },
      { term: "Private Key", definition: "Cryptographic key required to access cryptocurrency" },
      { term: "Seed Phrase", definition: "Recovery words for cryptocurrency wallet access" },
      { term: "Legacy Contact", definition: "Platform-designated person to manage account after death" }
    ],
    relatedQuestionIds: ["CFP-EST-B7-025", "CFP-EST-B7-026"]
  },
  {
    id: "CFP-EST-L014",
    domain: "CFP-EST",
    blueprintArea: "EST-2",
    title: "Trust Administration and Fiduciary Duties",
    order: 14,
    duration: 55,
    objectives: [
      "Explain fiduciary duties of trustees and executors",
      "Apply prudent investor rules to trust administration",
      "Manage trust distributions and documentation",
      "Avoid common trust administration mistakes"
    ],
    content: `
# Trust Administration and Fiduciary Duties

Serving as a trustee or executor carries significant legal responsibilities. Understanding fiduciary duties and administration requirements is essential.

---

## Fiduciary Duties Overview

### What Is a Fiduciary?

A person obligated to act in the best interest of another.

### Key Fiduciary Duties

| Duty | Description |
|------|-------------|
| **Duty of Loyalty** | Act solely in beneficiaries' interests |
| **Duty of Impartiality** | Balance interests of current and remainder beneficiaries |
| **Duty of Prudence** | Invest and manage with care, skill, and caution |
| **Duty to Inform** | Keep beneficiaries reasonably informed |
| **Duty to Account** | Provide regular accountings of trust activity |
| **Duty to Administer** | Carry out trust terms and applicable law |

### Consequences of Breach

| Consequence | Example |
|-------------|---------|
| **Surcharge** | Personal liability for losses caused |
| **Removal** | Court removes trustee |
| **Denial of fees** | Compensation forfeited |
| **Criminal liability** | In cases of theft or fraud |

---

## The Prudent Investor Rule

### Modern Portfolio Theory Standard

| Requirement | Application |
|-------------|-------------|
| **Diversification** | Unless imprudent under circumstances |
| **Risk/return balance** | Consider portfolio as a whole |
| **Delegation permitted** | Can hire investment advisors |
| **Consider all circumstances** | Beneficiary needs, time horizon, tax impact |

### What's Changed from Old Rules

| Old Standard | Modern Standard |
|--------------|-----------------|
| Avoid speculation | Total portfolio risk considered |
| Each investment must be safe | Diversification is key |
| Limited delegation | Delegation with prudent selection |

### Investment Policy Statement

| Component | Content |
|-----------|---------|
| **Objectives** | Income needs, growth, liquidity |
| **Time horizon** | Trust duration, beneficiary ages |
| **Risk tolerance** | Based on beneficiary circumstances |
| **Asset allocation** | Target percentages by asset class |
| **Rebalancing** | When and how to adjust |

---

## Trust Accounting and Record-Keeping

### What Trustees Must Track

| Category | Examples |
|----------|----------|
| **Receipts** | Income, contributions, distributions received |
| **Disbursements** | Distributions, expenses, taxes paid |
| **Investments** | Purchases, sales, gains, losses |
| **Principal vs. Income** | Allocation of receipts and expenses |

### Principal vs. Income Allocation

| Item | Allocated To |
|------|--------------|
| Dividends | Income |
| Interest | Income |
| Rent | Income |
| Capital gains | Principal |
| Trustee fees | Often split or all principal |
| Taxes on income | Income |
| Taxes on principal | Principal |

### Accounting to Beneficiaries

| Requirement | Frequency |
|-------------|-----------|
| Annual statements | At least annually |
| Response to requests | Within reasonable time |
| Final accounting | At trust termination |

---

## Distribution Decisions

### Trust Distribution Standards

| Standard | Trustee Discretion |
|----------|-------------------|
| **Mandatory** | "Shall distribute all income" — No discretion |
| **Discretionary** | "May distribute" — Full discretion |
| **HEMS** | Health, Education, Maintenance, Support — Guided discretion |
| **Ascertainable** | Clear standard limiting discretion |

### HEMS Standard

| Stands For | What It Covers |
|------------|----------------|
| **Health** | Medical care, insurance, prescriptions |
| **Education** | Tuition, books, reasonable living expenses |
| **Maintenance** | Standard of living maintenance |
| **Support** | Basic needs, housing, food |

The HEMS standard makes distributions excludable from beneficiary's taxable estate.

### Documentation of Distributions

| Document | Purpose |
|----------|---------|
| **Distribution request** | Beneficiary asks in writing |
| **Trustee analysis** | How request fits trust terms |
| **Distribution memo** | Decision and rationale |
| **Beneficiary acknowledgment** | Receipt of funds |

---

## Common Trust Administration Mistakes

### Investment Errors

| Mistake | Consequence |
|---------|-------------|
| Failing to diversify | Surcharge for preventable losses |
| Keeping unsuitable inherited assets | Breach of prudent investor rule |
| Self-dealing | Removal, surcharge |
| Not reviewing investments | Failure to monitor |

### Administrative Errors

| Mistake | Consequence |
|---------|-------------|
| Missing tax filings | Penalties, interest |
| Co-mingling personal/trust funds | Breach of duty |
| Unauthorized distributions | Surcharge for improper payments |
| Poor record-keeping | Liability for unsubstantiated actions |

### Beneficiary Relations Errors

| Mistake | Consequence |
|---------|-------------|
| Favoritism | Breach of impartiality |
| Ignoring beneficiary communications | Breach of duty to inform |
| Failure to provide accountings | Court-ordered removal |

---

## Key Takeaways

1. **Fiduciary duties** include loyalty, prudence, impartiality, and accounting
2. **Prudent investor rule** focuses on total portfolio, permits delegation
3. **Principal vs. income** allocation affects different beneficiaries
4. **HEMS standard** provides guided discretion for distributions
5. **Documentation** is essential protection against liability

---

## Practice Questions

1. A trustee holds a trust with two beneficiaries: an income beneficiary and a remainder beneficiary. The trustee's primary duty regarding these beneficiaries is:
   - A) To maximize income beneficiary payments
   - B) To preserve principal for the remainder beneficiary
   - C) To balance the interests of both impartially
   - D) To follow income beneficiary's instructions

   **Answer: C** - The duty of impartiality requires balancing interests of current and remainder beneficiaries.

2. Under the Prudent Investor Rule, a trustee may:
   - A) Not delegate investment decisions
   - B) Only invest in government bonds
   - C) Delegate to professional managers with prudent selection
   - D) Prioritize individual security safety over portfolio risk

   **Answer: C** - Modern Prudent Investor Rule permits delegation with proper due diligence and monitoring.
`,
    keyTerms: [
      { term: "Duty of Loyalty", definition: "Obligation to act solely in beneficiaries' interests" },
      { term: "Prudent Investor Rule", definition: "Standard requiring portfolio-level prudent investing" },
      { term: "HEMS", definition: "Health, Education, Maintenance, Support distribution standard" },
      { term: "Surcharge", definition: "Personal liability for trustee's breach of duty" }
    ],
    relatedQuestionIds: ["CFP-EST-B7-027", "CFP-EST-B7-028"]
  },
  {
    id: "CFP-EST-L015",
    domain: "CFP-EST",
    blueprintArea: "EST-3",
    title: "International and Cross-Border Estate Planning",
    order: 15,
    duration: 50,
    objectives: [
      "Identify issues with U.S. citizens and foreign assets",
      "Apply rules for non-citizen spouses",
      "Analyze foreign trust reporting requirements",
      "Navigate estate tax treaties"
    ],
    content: `
# International and Cross-Border Estate Planning

Global mobility creates complex estate planning challenges. Understanding cross-border issues helps advisors serve clients with international connections.

---

## Who Is Affected?

| Situation | Issues |
|-----------|--------|
| U.S. citizen with foreign assets | FBAR, foreign probate, taxation |
| U.S. resident alien | Same as citizen (worldwide estate taxation) |
| Non-resident alien with U.S. assets | Limited U.S. estate tax exemption |
| U.S. citizen married to non-citizen | Reduced marital deduction |
| U.S. person inheriting from foreigner | Gift/inheritance reporting |

---

## Non-Citizen Spouse Rules

### The Problem

Unlimited marital deduction requires spouse to be a U.S. citizen.

| Spouse Status | Marital Deduction |
|---------------|-------------------|
| U.S. citizen | Unlimited |
| Non-citizen | Limited to annual exclusion (~$190,000/year for gifts) |

### Solution: Qualified Domestic Trust (QDOT)

| Feature | Requirement |
|---------|-------------|
| **At least one U.S. trustee** | Required for all QDOTs |
| **For trusts over $2M** | U.S. bank as trustee, or post bond |
| **Estate tax** | Deferred until distributions to surviving spouse |
| **On death of survivor** | Remaining assets taxed in survivor's estate |

### QDOT Mechanics

1. Assets pass to QDOT at first spouse's death
2. Marital deduction allowed
3. Principal distributions trigger estate tax (as if first spouse's estate)
4. Income can be distributed without estate tax
5. Upon survivor's death, remaining principal taxed

---

## Non-Resident Aliens (NRAs)

### Estate Tax on NRAs

| Factor | NRA Rule |
|--------|----------|
| **What's taxable** | Only U.S.-situs property |
| **Exemption** | Only ~$60,000 (vs. $13.6M for citizens/residents) |
| **Tax rates** | Same as U.S. persons (up to 40%) |

### U.S.-Situs Assets

| U.S.-Situs (Taxable) | Non-U.S.-Situs (Not Taxable) |
|---------------------|----------------------------|
| U.S. real estate | Bank deposits (portfolio interest) |
| U.S. tangible personal property | Life insurance proceeds |
| U.S. corporate stock | Debt obligations (portfolio) |
| U.S. partnership interests | Stock in foreign corporations |

### Planning for NRAs

| Strategy | Application |
|----------|-------------|
| **Treaty benefits** | Some increase exemption (e.g., Germany) |
| **Holding structures** | Foreign corporation owning U.S. real estate |
| **Life insurance** | Proceeds are not U.S.-situs |
| **Joint ownership** | Different rules for non-citizens |

---

## Foreign Trusts

### What Is a Foreign Trust?

A trust that:
- Has no U.S. trustee, or
- Is not under U.S. court supervision

### Reporting Requirements

| Form | Who Files | What It Reports |
|------|-----------|-----------------|
| **Form 3520** | U.S. beneficiary or grantor | Transactions with foreign trusts |
| **Form 3520-A** | Foreign trust with U.S. owner | Annual information return |
| **FBAR (FinCEN 114)** | Any U.S. person | Foreign accounts over $10,000 |
| **Form 8938** | U.S. persons over threshold | Foreign financial assets (FATCA) |

### Penalties

| Violation | Penalty |
|-----------|---------|
| **Failure to file 3520** | 35% of gross value of property |
| **Failure to file FBAR** | Up to $100,000+ or 50% of account |

### Throwback Rules

Distributions from foreign trusts to U.S. beneficiaries may be subject to:
- Tax on accumulated income
- Interest charge on deferred tax

---

## Foreign Assets: Probate and Practical Issues

### Multiple Probates

| Asset Location | Probate Required |
|----------------|------------------|
| Each country where real estate located | Usually yes |
| Each country with local securities | Varies by country |

### Strategies to Avoid Foreign Probate

| Strategy | Application |
|----------|-------------|
| **Revocable trust** | May work in some jurisdictions |
| **Joint ownership** | Depends on local law |
| **Beneficiary designations** | Life insurance, retirement accounts |
| **Local counsel** | Essential for proper planning |

### Currency and Valuation

| Issue | Consideration |
|-------|---------------|
| **Exchange rates** | Value at date of death |
| **Local appraisals** | May need certified valuations |
| **Timing** | Different estate settlement timelines |

---

## Key Takeaways

1. **Non-citizen spouses** need QDOT for marital deduction
2. **Non-resident aliens** face limited exemption on U.S. assets
3. **Foreign trusts** trigger significant reporting requirements
4. **Estate tax treaties** may provide relief (check country-specific)
5. **Multi-jurisdiction estates** require coordination with local counsel

---

## Practice Questions

1. A U.S. citizen dies leaving assets to their non-citizen spouse. To obtain the marital deduction, assets should pass:
   - A) Outright to the spouse
   - B) Into a Qualified Domestic Trust (QDOT)
   - C) To a bypass trust
   - D) To the spouse's country of citizenship

   **Answer: B** - A QDOT is required for the marital deduction when the surviving spouse is not a U.S. citizen.

2. A non-resident alien owns $5 million in U.S. stock. Their U.S. estate tax exposure is approximately:
   - A) $0 (no tax on foreigners)
   - B) $2 million (40% of $5M)
   - C) Approximately $1,976,000 after $60,000 exemption
   - D) Same as U.S. citizen with $13.6 million exemption

   **Answer: C** - NRAs have only ~$60,000 exemption on U.S.-situs assets; 40% tax on remaining ~$4.94M ≈ $1,976,000.
`,
    keyTerms: [
      { term: "QDOT", definition: "Qualified Domestic Trust for non-citizen spouse marital deduction" },
      { term: "U.S.-Situs", definition: "Assets located in the U.S. subject to U.S. estate tax" },
      { term: "Form 3520", definition: "Report of transactions with foreign trusts" },
      { term: "Non-Resident Alien", definition: "Foreign person not meeting substantial presence test" }
    ],
    relatedQuestionIds: ["CFP-EST-B7-029", "CFP-EST-B7-030"]
  },
  {
    id: "CFP-EST-L016",
    domain: "CFP-EST",
    blueprintArea: "EST-2",
    title: "Post-Mortem Estate Planning",
    order: 16,
    duration: 50,
    objectives: [
      "Apply disclaimer strategies for tax optimization",
      "Evaluate post-mortem elections and choices",
      "Analyze estate income tax planning opportunities",
      "Navigate the estate settlement timeline"
    ],
    content: `
# Post-Mortem Estate Planning

Estate planning doesn't end at death. Post-mortem decisions can significantly affect family wealth. Understanding these strategies helps optimize outcomes.

---

## Disclaimers

### What Is a Disclaimer?

An irrevocable, unqualified refusal to accept property.

### Requirements for Qualified Disclaimer

| Requirement | Detail |
|-------------|--------|
| **In writing** | Written refusal required |
| **Timely** | Within 9 months of death or transfer |
| **No benefit received** | Cannot accept benefits before disclaiming |
| **Property passes without direction** | Disclaimant cannot control who receives |

### Why Disclaim?

| Reason | Example |
|--------|---------|
| **Estate tax savings** | Push assets to bypass trust |
| **Creditor protection** | Assets pass to protected beneficiary |
| **Medicaid planning** | Assets pass away from Medicaid applicant |
| **Generation planning** | Skip to grandchildren |

### Disclaimer Example

| Scenario | Result Without Disclaimer | Result With Disclaimer |
|----------|--------------------------|----------------------|
| Husband's will: "All to wife" | Wife inherits all | |
| Wife's estate is already taxable | Combined estates taxable | Wife disclaims enough to use husband's exemption |
| Alternative taker | N/A | Disclaimed portion passes to trust for wife's benefit |

### Partial Disclaimers

Allowed—disclaim a portion, accept the rest (if clearly severable).

---

## Estate Income Tax Planning

### The Estate as a Taxpayer

Estates hit the top 37% bracket at only ~$15,200 (2026), making tax planning critical.

### Distributable Net Income (DNI)

| Concept | Application |
|---------|-------------|
| **DNI defined** | Income available for distribution |
| **Distribution deduction** | Estate deducts DNI distributed |
| **Beneficiary taxation** | Beneficiary includes distributed DNI |

### Strategy: Push Income to Lower-Bracket Beneficiaries

| If Estate | Then |
|-----------|------|
| Keeps income | Taxed at 37% over ~$14,450 |
| Distributes income | Taxed at beneficiary's (probably lower) rate |

### 65-Day Election

Distributions made within 65 days after year-end can be treated as made in prior tax year.

| Use Case | Strategy |
|----------|----------|
| Year 1 has high estate income | Make distribution in January |
| Elect to treat as Year 1 distribution | Estate gets deduction in Year 1 |

---

## Executor Elections and Choices

### Key Elections

| Election | Deadline | Impact |
|----------|----------|--------|
| **Alternate valuation date** | 6 months after death | May reduce estate value/tax |
| **Portability** | File Form 706 | Preserve deceased spouse's exemption |
| **QTIP election** | Form 706 | Marital deduction for trust assets |
| **Section 2032A (Special Use)** | Form 706 | Reduced value for farm/business real estate |
| **Installment payment (6166)** | Form 706 | 15-year estate tax payment for closely held business |

### Alternate Valuation Date

| Requirement | Detail |
|-------------|--------|
| **When available** | Only if reduces gross estate AND tax |
| **Valuation date** | 6 months after death |
| **If sold within 6 months** | Use sale date value |

### Portability Election

| If Fail to Elect | Consequence |
|------------------|-------------|
| Don't file Form 706 | Deceased spouse's unused exemption lost forever |
| File late | May qualify for 2-year safe harbor |

---

## Estate Settlement Timeline

### Key Deadlines

| Deadline | Action |
|----------|--------|
| **Immediately** | Secure assets, locate documents |
| **10-30 days** | Notify beneficiaries, file will with court |
| **60-90 days** | Open probate, get Letters Testamentary |
| **3-4 months** | Publish notice to creditors |
| **9 months** | File Form 706 (estate tax, if required) |
| **12-18 months** | Close estate, final distributions |

### Fiduciary Returns

| Form | Due Date | Purpose |
|------|----------|---------|
| **Final 1040** | April 15 of following year | Decedent's final income |
| **Form 1041** | April 15 (calendar year) or 9/30 | Estate/trust income tax |
| **Form 706** | 9 months after death (can extend 6 months) | Estate tax return |

---

## Asset Valuation Decisions

### Date of Death vs. Alternate Valuation

| Factor | Date of Death | Alternate (6 months) |
|--------|--------------|---------------------|
| Use when | Assets appreciate | Assets depreciate |
| Affects | Estate tax | Estate tax and heir basis |

### Stepped basis reflects chosen valuation date.

### Special Rule for Sold Assets

If asset sold within 6 months and alternate valuation elected:
- Use sale price as value
- Not 6-month date value

---

## Key Takeaways

1. **Disclaimers** can optimize tax outcomes even after death
2. **65-day election** allows income shifting to prior year
3. **Portability election** preserves unused exemption—must file Form 706
4. **Alternate valuation** available only if it reduces estate and tax
5. **Estate income tax rates** are steep—distribute income when possible

---

## Practice Questions

1. A qualified disclaimer must be made within:
   - A) 30 days of death
   - B) 6 months of death
   - C) 9 months of death or transfer
   - D) 12 months of death

   **Answer: C** - Qualified disclaimers must be made within 9 months of death or transfer creating the interest.

2. To preserve a deceased spouse's unused estate tax exemption for the surviving spouse, the executor must:
   - A) Do nothing—it's automatic
   - B) Make a portability election on a timely-filed Form 706
   - C) File a disclaimer
   - D) Create a QDOT

   **Answer: B** - Portability requires an election on Form 706, even if no estate tax is due.
`,
    keyTerms: [
      { term: "Qualified Disclaimer", definition: "Irrevocable written refusal of property within 9 months" },
      { term: "DNI", definition: "Distributable Net Income determining estate/beneficiary taxation" },
      { term: "Alternate Valuation Date", definition: "Optional 6-month valuation if reduces estate and tax" },
      { term: "65-Day Election", definition: "Treat early-year distributions as prior year for tax deduction" }
    ],
    relatedQuestionIds: ["CFP-EST-B7-031", "CFP-EST-B7-032"]
  }
];
