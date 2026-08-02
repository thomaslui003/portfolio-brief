# Portfolio rules (owner policy)

The automation must grade suggestions against these rules. Do not invent a strategy that conflicts with them.

## Risk bands

| Rule | Limit | Action if breached |
|------|-------|--------------------|
| Single-name weight | Soft max **22%**, hard review **25%** | Flag **Review**; suggest trim band only if news/fundamentals support |
| Top-3 combined | Soft max **60%** | Flag concentration; prefer adds elsewhere |
| Cyclical (ODFL+LEN) | Soft max **35%** | Extra scrutiny when rates/freight/housing news is adverse |
| High-beta / thematic (TSLA+SPCX) | Soft max **20%** | No averaging down without fresh thesis |
| Cash | Not tracked yet | If unknown, do not assume dry powder |

## Suggestion language (mandatory)

Use only these action verbs:

- **Watch** — event or news to monitor; no portfolio change implied
- **Review** — owner should re-check thesis / size within a few sessions
- **Consider** — optional action with tradeoffs (trim, hold, add-on-weakness) — never order-like
- **Hold policy** — explicitly do nothing; noise only

Never write: “buy N shares”, “sell all”, “market order”, or guaranteed outcomes.

## Quality bar

- Every factual claim needs a **source URL** or filing reference.
- Max **3** ranked suggestions per daily brief.
- Prefer **Do nothing / Hold policy** when news is non-material.
- Separate **hard data** (price, filings, earnings dates, reported metrics) from **narrative**.
- Each run must include a **peer relative** check and a **leading-indicator** skim using the table in `holdings.md` (short is fine when quiet; do not invent peer prints).
- Each run must include a **money flow / sector rotation** skim (sector SPDR leaders/laggards + book map from `holdings.md`). Prefer hard ETF %; label any fund-flow narrative only with a source — no fake Bloomberg terminal numbers.
- Dual lens required every run:
  1. **Quant / risk** — weights, factor exposure, drawdowns vs cost, correlation themes, peer co-moves vs divergences, sector/style rotation vs book
  2. **Fundamental / sell-side style** — business quality, catalysts, risks, valuation context (qualitative OK if numbers unavailable), KPI/leading-indicator stress

## Markets in scope

- **US session** primary (all current holdings are US-listed).
- **HK / Asia overnight** secondary: China/Asia macro, FX, supply-chain, and any Asia revenue exposure for holdings; HSI / China ADRs only as context for risk sentiment.

## Disclaimer (append to every brief)

> Not investment advice. Research and decision-support only. Verify prices, filings, and news before acting.
