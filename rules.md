# Portfolio rules (owner policy)

The automation must grade suggestions against these rules. Do not invent a strategy that conflicts with them.

## Risk bands

| Rule | Limit | Action if breached |
|------|-------|--------------------|
| Single-name weight | Soft max **22%**, hard review **25%** | Flag **Review**; suggest trim band only if news/fundamentals support |
| Top-3 combined | Soft max **60%** | Flag concentration; prefer adds elsewhere |
| Cyclical (ODFL+LEN) | Soft max **35%** | Extra scrutiny when rates/freight/housing news is adverse |
| High-beta / thematic (TSLA+SPCX) | Soft max **20%** | Extra scrutiny; average-down only if **Average-down gate** below is fully met |
| Cash | Not tracked yet | If unknown, do not assume dry powder for adds |

## Average-down / add-on-weakness gate

**Allowed** to use **[Consider]** … average-down / add-on-weakness when **all** of the following are true (cite sources):

1. **Thesis intact** — news/filings do **not** trip kill criteria in `holdings.md`; state why thesis still holds in one line.  
2. **Valuation attractive** — at least one sourced valuation angle vs history, peers, or simple multiples/yield (e.g. P/E, P/B, EV/EBITDA, peer discount). Qualitative OK if hard multiples unavailable, but must say so and still compare to peers or own history. Price merely “down vs cost” is **not** enough.  
3. **Risk bands** — post-add weight would stay inside soft single-name / cluster / high-beta limits (or call out soft-band pressure explicitly and keep the Consider cautious).  
4. **Not event-blind** — if a binary event is imminent (earnings, lock-up, FOMC), prefer **Watch** until after the event unless valuation + thesis still clearly favor a staged add *and* you flag the event risk.  
5. **Language** — **Consider** only (tradeoffs + falsifier). Never “buy N shares”, never present average-down as mandatory.

If the gate fails → default **Hold policy** / **Watch** / **Review** (thesis or size), not average-down.

## Position rating scale (dual lens)

Every brief must rate **each** holding from **both** lenses, plus a **Net** synthesis. Ratings are stances for the owner — **not** trade tickets.

| Rating | Meaning |
|--------|---------|
| **Trim** | Bias to reduce size / take risk off this name (concentration, thesis risk, or adverse tape) |
| **Hold** | Keep current size; no change implied |
| **Add** | Bias to add or average-down — **only** if Average-down gate passes when underwater / adding risk |
| **Watch** | No size change; monitor a catalyst, KPI, or event |
| **Review** | Re-check thesis and/or size within a few sessions (urgency without directing Trim/Add yet) |

**Quant lens** → portfolio construction, weights, clusters, drawdown vs cost, rotation vs sleeve, rule bands.  
**Fundamental lens** → business quality, thesis/kill criteria, catalysts, valuation, KPIs.  
**Net** → if lenses disagree, pick the **more cautious** rating (Watch / Review / Hold over Add / Trim) unless evidence clearly resolves the split.

Do not invent ratings outside this set. Never pair a rating with share counts or market orders.

## Suggestion language (mandatory)

Use only these action verbs in **ranked suggestions** and **book-level stance**:

- **Watch** — event or news to monitor; no portfolio change implied
- **Review** — owner should re-check thesis / size within a few sessions
- **Consider** — optional action with tradeoffs (trim, hold, **add-on-weakness / average-down** when the gate above passes) — never order-like
- **Hold policy** — explicitly do nothing; noise only

Position **ratings** (Trim/Hold/Add/Watch/Review) are separate from suggestion verbs; a Net **Add** still surfaces in ranked suggestions only as **[Consider]** … add-on-weakness (with gate evidence).

Never write: “buy N shares”, “sell all”, “market order”, or guaranteed outcomes.

## Quality bar

- Every factual claim needs a **source URL** or filing reference.
- Max **3** ranked (name/event) suggestions per daily brief, plus one **Portfolio recommendation (book-level)** stance section and a full **Position ratings (dual lens)** table.
- Prefer **Do nothing / Hold policy** when news is non-material.
- **Average-down / add-on-weakness** only via **[Consider]** when the **Average-down gate** above is fully met (valuation attractiveness required — not just P&L vs cost). A Net rating of **Add** does not bypass the gate.
- Target brief length **~1 page** (2 pages only if several theses are in motion). Obey AGENTS.md **Write-once** — do not reprint the same hard number across sections.
- Separate **hard data** (price, filings, earnings dates, reported metrics, valuation multiples when cited) from **narrative**.
- Each run must include a **peer relative** check and a **leading-indicator** skim using the table in `holdings.md` (short is fine when quiet; do not invent peer prints).
- Each run must include a **money flow / sector rotation** skim (sector SPDR leaders/laggards labeled **`TICKER (Sector name)`**, book map, and `| ETF | Sector | 1D % | ~5D % |` table from `holdings.md`). Prefer hard ETF %; label any fund-flow narrative only with a source — no fake Bloomberg terminal numbers.
- Each run must include **Position ratings (dual lens)** for every holding and **Portfolio recommendation (book-level)**; ranked suggestions must not contradict Net ratings or book stance.
- Dual lens required every run:
  1. **Quant / risk** — weights, factor exposure, drawdowns vs cost, correlation themes, peer co-moves vs divergences, sector/style rotation vs book, Quant column in ratings table
  2. **Fundamental / sell-side style** — business quality, catalysts, risks, valuation context (qualitative OK if numbers unavailable), KPI/leading-indicator stress, Fundamental column in ratings table

## Markets in scope

- **US session** primary (all current holdings are US-listed).
- **HK / Asia overnight** secondary: China/Asia macro, FX, supply-chain, and any Asia revenue exposure for holdings; HSI / China ADRs only as context for risk sentiment.

## Disclaimer (append to every brief)

> Not investment advice. Research and decision-support only. Verify prices, filings, and news before acting.
