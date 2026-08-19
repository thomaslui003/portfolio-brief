# Valuation bands — forward P/S house metric

**As-of:** 2026-08-19 (ET) · **Refresh:** monthly, or when consensus sales/EPS jump  
**Owner policy:** `rules.md` → Valuation bands. Daily briefs copy the table; do not invent new band rules.

## Method

- **House metric:** **forward P/S** (price ÷ NTM consensus sales) vs **own ~10y trailing P/S min/max** as the range proxy when a true historical *forward* P/S series is not free. Label the range **trailing proxy**.
- **Spot** must be **forward** P/S (and forward P/E) when available. Cite StockAnalysis / Yahoo.
- **Band** on the house metric (linear position in min–max, not a true percentile):
  - **Low** — spot closer to min than 25% of the range  
  - **Mid** — 25–75%  
  - **High** — closer to max than 75% of the range  
- **Filter (required):** forward P/E vs own history (same Low/Mid/High). **Low fwd P/S does not clear valuation** if fwd P/E is **High** (or N/M with a broken margin story).
- **SPCX:** both P/S and P/E are **N/A** (treat as listed SpaceX / theme tape until owner confirms instrument). Use vs ARKX/UFO + any premium/discount.

Low band = **valuation evidence** for the Average-down gate only. Not a buy signal.

## Cached ranges (trailing P/S proxy unless noted)

| Ticker | Fwd P/S spot | P/S range (min–max) | P/S band | Fwd P/E spot | P/E range note | P/E band | Gate (P/S Low **and** P/E ≠ High) |
|--------|--------------|---------------------|----------|--------------|----------------|----------|-----------------------------------|
| UNH | 0.79 | 0.52–1.75 (10y GF) | **Low** | 18.51 | 10.3–40.1 (10y GF trailing) | **Mid** | Support *possible* — size/thesis still bind |
| COST | 1.34 | 0.47–1.75 (10y MT qtr) | **Mid** | 43.87 | rich vs own 5y (trailing ~45–52) | **High** | No |
| ODFL | 7.01 | 1.67–9.65 (10y GF) | **Mid** | 33.38 | 10y trailing avg ~28; recent ~28–42 | **Mid** | No |
| TSLA | 12.33 | 1.42–30.25 (10y GF) | **Mid** | 174.74 | structurally elevated | **High** | No |
| LEN | 0.65 | 0.43–1.33 (10y GF) | **Low** | 15.05 | 5y fwd P/E avg ~9.1 (Mstar) | **High** | **No** (P/E filter) |
| PG | 3.77 | 2.80–4.83 (10y MT qtr) | **Mid** | 20.52 | mid vs recent 18–25 | **Mid** | No |
| HSY | 2.96 | 2.98–3.62 (Yahoo ~5q TTM P/S) | **Low** | 19.77 | Yahoo fwd ~21–28 last 5q | **Low** | Support *possible* — not underwater on live mark |
| SPCX | n/a | n/a | n/a | n/a | n/a | n/a | n/a — theme relative only |

**Sources (ranges):** [GuruFocus UNH P/S](https://www.gurufocus.com/term/ps-ratio/UNH), [GuruFocus UNH P/E](https://www.gurufocus.com/term/pe-ratio/UNH), [GuruFocus ODFL P/S](https://www.gurufocus.com/term/ps-ratio/ODFL), [GuruFocus TSLA P/S](https://www.gurufocus.com/term/ps-ratio/TSLA), [GuruFocus LEN P/S](https://www.gurufocus.com/term/ps-ratio/LEN), [MacroTrends COST P/S](https://www.macrotrends.net/stocks/charts/COST/costco/price-sales), [MacroTrends PG P/S](https://www.macrotrends.net/stocks/charts/PG/procter-gamble/price-sales), [Morningstar LEN](https://www.morningstar.com/stocks/xnys/len/valuation), [Yahoo HSY key stats](https://finance.yahoo.com/quote/HSY/key-statistics/).  
**Sources (spot):** [StockAnalysis](https://stockanalysis.com/) statistics pages, 2026-08-19.

## Next monthly refresh

Re-pull GuruFocus/MacroTrends min/max and StockAnalysis forward P/S + forward P/E. Replace HSY’s 5-quarter Yahoo window with a 10y MacroTrends/GuruFocus P/S range when available.
