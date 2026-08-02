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

## Suggestion language (mandatory)

Use only these action verbs:

- **Watch** — event or news to monitor; no portfolio change implied
- **Review** — owner should re-check thesis / size within a few sessions
- **Consider** — optional action with tradeoffs (trim, hold, **add-on-weakness / average-down** when the gate above passes) — never order-like
- **Hold policy** — explicitly do nothing; noise only

Never write: “buy N shares”, “sell all”, “market order”, or guaranteed outcomes.

## Quality bar

- Every factual claim needs a **source URL** or filing reference.
- Max **3** ranked (name/event) suggestions per daily brief, plus one **Portfolio recommendation (book-level)** stance section.
- Prefer **Do nothing / Hold policy** when news is non-material.
- **Average-down / add-on-weakness** only via **[Consider]** when the **Average-down gate** above is fully met (valuation attractiveness required — not just P&L vs cost).
- Separate **hard data** (price, filings, earnings dates, reported metrics, valuation multiples when cited) from **narrative**.
- Each run must include a **peer relative** check and a **leading-indicator** skim using the table in `holdings.md` (short is fine when quiet; do not invent peer prints).
- Each run must include a **money flow / sector rotation** skim (sector SPDR leaders/laggards labeled **`TICKER (Sector name)`**, book map, and `| ETF | Sector | 1D % | ~5D % |` table from `holdings.md`). Prefer hard ETF %; label any fund-flow narrative only with a source — no fake Bloomberg terminal numbers.
- Each run must include **Portfolio recommendation (book-level)**: overall stance from regime + rotation + concentration/rules + KPIs; policy verbs only; ranked suggestions must not contradict it.
- Dual lens required every run:
  1. **Quant / risk** — weights, factor exposure, drawdowns vs cost, correlation themes, peer co-moves vs divergences, sector/style rotation vs book
  2. **Fundamental / sell-side style** — business quality, catalysts, risks, valuation context (qualitative OK if numbers unavailable), KPI/leading-indicator stress

## Markets in scope

- **US session** primary (all current holdings are US-listed).
- **HK / Asia overnight** secondary: China/Asia macro, FX, supply-chain, and any Asia revenue exposure for holdings; HSI / China ADRs only as context for risk sentiment.

## Disclaimer (append to every brief)

> Not investment advice. Research and decision-support only. Verify prices, filings, and news before acting.
