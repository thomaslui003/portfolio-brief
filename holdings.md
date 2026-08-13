# Holdings

Qty and cost from last broker snapshot; Price / MV / Weight / P&L refreshed from Yahoo each run.
**Marks as-of:** 2026-08-13 · **Qty/cost as-of:** 2026-08-02 · Currency: USD · Total MV ≈ **$30,880**

| Ticker | Name | Qty | Price | Cost/sh | MV ($) | Weight | P&L vs cost | Tags | Thesis (1 line) | Kill / review if |
|--------|------|-----|-------|---------|--------|--------|-------------|------|-----------------|------------------|
| UNH | UnitedHealth | 15 | 403.39 | 309.944 | 6,050.85 | 19.6% | +30.1% | healthcare, managed-care, US, large-cap | Quality compounder in US healthcare; watch policy & utilization | Structural margin break, adverse CMS/regulatory shock, thesis-breaking litigation |
| COST | Costco | 6 | 954.02 | 934.657 | 5,724.13 | 18.5% | +2.1% | consumer-staples, retail, membership, US, large-cap | Membership moat + traffic; long-duration compounder | Membership/traffic deterioration, sustained gross-margin collapse |
| ODFL | Old Dominion Freight Line | 25 | 216.82 | 157.267 | 5,420.50 | 17.6% | +37.9% | industrials, trucking, LTL, cyclical, US | Best-in-class LTL; cycle + share gains | Sustained tonnage/price weakness, share loss to peers |
| TSLA | Tesla | 11.179 | 333.29 | 361.10 | 3,725.85 | 12.1% | −7.7% | auto, EV, tech-adjacent, high-beta, US | Optional growth/AI narrative; size as satellite, not core | Repeated delivery misses + margin collapse without offsetting energy/AI story |
| LEN | Lennar | 42 | 87.29 | 113.824 | 3,666.18 | 11.9% | −23.3% | homebuilder, rates-sensitive, US, cyclical | Housing cycle / rates bet; underwater — needs thesis refresh | Higher-for-longer rates + order cancelations, land impairments |
| PG | Procter & Gamble | 22 | 145.11 | 141.55 | 3,192.42 | 10.3% | +2.5% | consumer-staples, defensive, FX-sensitive, US, large-cap | Defensive cash-flow ballast | Volume decline + pricing fatigue, major brand share loss |
| HSY | Hershey | 9 | 186.11 | 181.77 | 1,674.99 | 5.4% | +2.4% | consumer-staples, cocoa-input, US | Brand snack name; cocoa/input-cost sensitive | Cocoa spike without pricing power, category weakness |
| SPCX | AXS Space Priority ETF | 10 | 142.52 | 150.00 | 1,425.20 | 4.6% | −5.0% | thematic, space, ETF, high-risk | Thematic SpaceX/space exposure via ETF (not direct SpaceX equity) | Thesis failure on space theme, structural underperformance vs peers |

## Portfolio notes

- **Largest weights:** UNH, COST, ODFL (~56% combined) — concentration risk is real.
- **Cyclical cluster:** ODFL + LEN (~29%) — freight + housing amplify industrial/rates sensitivity.
- **Defensive cluster:** COST + PG + HSY (~34%) — staples ballast, but not immune to input costs (HSY) or valuation (COST).
- **High-beta / thematic:** TSLA + SPCX (~17%) — narrative and multiple risk.
- **TSLA & LEN & SPCX** are underwater vs cost — stress-test thesis; average-down only if `rules.md` Average-down gate passes (valuation + thesis + bands).
- **SPCX** is an ETF proxy for space priority theme, not private SpaceX stock — analyze as ETF (holdings, liquidity, premium/discount if any).

## Peers & leading indicators (agent must-check)

Use for **relative performance** and **leading-indicator** checks each run. Cite sources. Skip quiet peers with one line if co-moves are normal.

| Ticker | Peer set (primary) | Leading indicators / KPIs to skim |
|--------|--------------------|-----------------------------------|
| UNH | ELV, CI, HUM | Medical cost ratio / utilization commentary; CMS/Medicare Advantage rate news; membership mix |
| COST | WMT, BJ, TGT | Membership growth / renewal; comps & traffic; retail tone (discretionary vs staples) |
| ODFL | XPO, SAIA, TFII | Cass Freight Index / tonnage commentary; ISM/industrial; LTL yield vs tons (peer prints) |
| TSLA | GM, F, RIVN (context); NIO/XPEV for China EV tape | Deliveries / ASP; auto gross margin & FCF; China EV competitive tone |
| LEN | DHI, PHM, TOL | 10y Treasury & 30y mortgage rates; MBA mortgage apps / housing starts; orders, cancellations, incentives |
| PG | CL, KMB, PEP (staples context) | Organic volume vs price; FX (ex-US); retailer inventory / category share chatter |
| HSY | MDLZ, CAG (snacks context) | Cocoa / cocoa butter prices; price vs volume elasticity; Halloween/seasonal sell-in when relevant |
| SPCX | ARKX, UFO (theme ETFs); treat as **ETF** not private SpaceX | Theme ETF relative performance; top holdings / liquidity; premium-discount if available; space/satellite news only as theme |

**Relative-performance rule:** Flag when a holding **materially diverges** from its peer set (same-day or ~5-session). Industry-wide moves ≠ idiosyncratic thesis change.

**Leading-indicator rule:** Adverse move in a name’s KPI column should appear under attention or position notes even if the stock is quiet.

## Sector rotation map (money flow → this book)

Public proxies for a Bloomberg-style “where is the money” skim. Prefer last session % on sector SPDRs; add ~5-day when useful. Cite source.

**Always write `TICKER (Sector name)` in briefs** (never bare `XLY` alone).

| ETF | Sector name (use in prose) | Sleeve in this book | Why it matters |
|-----|----------------------------|---------------------|----------------|
| **XLV** | Health Care | UNH | Managed-care / healthcare leadership vs market |
| **XLP** | Consumer Staples | COST, PG, HSY | Defensive ballast; HSY also snacks/input-cost idiosyncratic |
| **XLI** | Industrials | ODFL | Freight/industrial cycle tone |
| **XLRE** | Real Estate | LEN (+ rates) | Housing / rate-sensitive money; pair with 10y / mortgage |
| **XLY** | Consumer Discretionary | TSLA (context) | High-beta discretionary tone |
| **XLK** | Technology | TSLA / risk appetite | Mega-cap growth / risk-on proxy (with QQQ) |
| **XLC** | Communication Services | — (tape context) | Risk appetite / mega-cap platforms |
| **XLF** | Financials | — (tape context) | Cyclical / rates-sensitive financials |
| **XLE** | Energy | — (tape context) | Commodity / inflation tone |
| **XLB** | Materials | — (tape context) | Cyclical industrials-adjacent |
| **XLU** | Utilities | — (tape context) | Bond-proxy / duration |
| Theme | ARKX / UFO (space theme ETFs) | SPCX | Thematic money — not a GICS sector SPDR |
| Style | IWF (growth) / IWD (value); IWM (small caps) vs SPY/QQQ | Whole book | Risk-on/off and small-cap participation |

**Rotation rule:** Call out when money is leaving the book’s heavy sleeves (e.g. soft XLV/XLP/XLI while indices up) or crowding into them. Price leadership ≠ confirmed fund flows — label fund-flow claims only when a source exists.

**Site chart:** Every brief’s Money flow section must include the `| ETF | Sector | 1D % | ~5D % |` table so Pages can render the rotation graph.

## How to update

After any trade, edit **Qty** and **Cost/sh** only and set **Qty/cost as-of** to the broker date. Do not hand-edit Price / MV / Weight / P&L — `python3 scripts/refresh-holdings.py` (start of every brief) recomputes those from Yahoo. Thesis / kill / peers: edit when the case or instrument identity changes.
