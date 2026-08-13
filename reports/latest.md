# Portfolio brief — 2026-08-13

> Not investment advice. Research and decision-support only. Verify prices, filings, and news before acting.

**Session:** Thursday pre-open (ET), ~05:40 ET. **Manual test run** of the mark-refresh pipeline (`python3 scripts/refresh-holdings.py` E2E). **Marks as-of 2026-08-13** Yahoo PRE; **Qty/cost as-of 2026-08-02**. **PPI 8:30 ET** still pending; Freddie PMMS **noon ET**. Futures: Yahoo continuous vs prior settle. Holdings %: Yahoo PRE vs prior close except ODFL (no PRE print — Wed session %).

## Market regime (US + Asia/HK overnight)

- **Into PPI:** Futures mixed-to-firm after in-line Wed CPI. Yahoo globex: ES **+0.13**, NQ **−0.05**, YM **+0.25**, RTY **+0.19**. Cons. headline PPI **+0.2% MoM** (Dow Jones via [TipRanks](https://www.tipranks.com/news/stock-futures-mixed-as-investors-await-ppi-data); [BLS 8:30 ET](https://www.bls.gov/schedule/news_release/ppi.htm)).
- **Rates / vol:** 10y (^TNX) **4.68%**; VIX **14.67** ([Yahoo ^TNX](https://finance.yahoo.com/quote/%5ETNX/); [Yahoo ^VIX](https://finance.yahoo.com/quote/%5EVIX/)).
- **Oil:** WTI **$81.78 (−1.79%)** — Hormuz bid fading ([Yahoo CL=F](https://finance.yahoo.com/quote/CL%3DF/)).
- **Asia/HK:** Nikkei **68,308.59 (+1.16%)**; HSI **25,396.51 (−0.17%)** — Japan bid, HK still soft ([Yahoo ^N225](https://finance.yahoo.com/quote/%5EN225/); [Yahoo ^HSI](https://finance.yahoo.com/quote/%5EHSI/)).

## US premarket

Pipeline test: script wrote Yahoo PRE marks into `holdings.md` (MV ≈ **$30,667**). Book-relevant gaps: **SPCX +1.09** leftover squeeze bid; **LEN +0.67** bounce after Wed builder fade; **COST −0.27** the only core name red. ODFL has no live PRE print. Cross-check futures: [Markets Insider](https://markets.businessinsider.com/premarket) ~04:54 ET ES **+0.14** / NQ **+0.03** / YM **+0.18**.

| Symbol | Name | Premarket % |
|--------|------|-------------|
| ES | S&P 500 futures | +0.13 |
| NQ | Nasdaq 100 futures | -0.05 |
| YM | Dow futures | +0.25 |
| RTY | Russell 2000 futures | +0.19 |
| UNH | UnitedHealth | +0.19 |
| COST | Costco | -0.27 |
| ODFL | Old Dominion | +1.48 |
| TSLA | Tesla | -0.17 |
| LEN | Lennar | +0.67 |
| PG | Procter & Gamble | +0.47 |
| HSY | Hershey | -0.15 |
| SPCX | SPCX ETF | +1.09 |

## Money flow / sector rotation

Last **full session Wed Aug 12** ([thetrading.tools](https://www.thetrading.tools/sector-performance)).

- **Leaders:** **XLK (Technology) +1.49%**, **XLRE (Real Estate) +0.93%**, **XLU (Utilities) +0.48%**, **XLP (Consumer Staples) +0.46%**.
- **Laggards:** **XLB (Materials) −1.24%**, **XLY (Consumer Discretionary) −1.13%**, **XLC (Communication Services) −0.90%**.
- **~5-day (1W):** **XLE (Energy) +6.49%** / **XLV (Health Care) +2.61%** still lead; **XLRE (Real Estate) −1.57%** remains the duration laggard despite Wed bounce.
- **Style:** **IWF (growth) +0.66%** vs **IWD (value) −0.06%**; **IWM (small caps) +0.57%** ([Yahoo](https://finance.yahoo.com/)).
- **Fund flows:** No sourced ETF flow print — **price leadership only**.
- **Book map:** Wed **XLK** bid helps TSLA/SPCX tape more than this book’s core; **XLRE** bounce did not save LEN; **XLI** quiet while ODFL still lagged LTL peers; **XLP/XLV** green is ballast, not an add.

| ETF | Sector | 1D % | ~5D % |
|-----|--------|------|-------|
| XLY | Consumer Discretionary | -1.13 | -0.63 |
| XLP | Consumer Staples | +0.46 | -0.29 |
| XLE | Energy | +0.16 | +6.49 |
| XLF | Financials | +0.21 | -0.14 |
| XLV | Health Care | +0.26 | +2.61 |
| XLI | Industrials | +0.10 | -0.25 |
| XLB | Materials | -1.24 | -0.11 |
| XLRE | Real Estate | +0.93 | -1.57 |
| XLK | Technology | +1.49 | +1.59 |
| XLU | Utilities | +0.48 | +0.41 |
| XLC | Communication Services | -0.90 | -0.54 |

## Portfolio health (quant lens)

- **Concentration / bands:** UNH 19.9% + COST 18.5% + ODFL 17.3% ≈ **56%** (under soft top-3 **60%**). UNH off **22%** soft-max. Cyclical **29%**, staples **34%**, high-beta **17%** (under **20%**). No hard breach. Qty/cost freeze verified (broker **2026-08-02**).
- **Underwater vs cost (Yahoo marks × frozen cost):** LEN **−24.6%**, TSLA **−9.5%**, SPCX **−1.5%**. HSY through cost.
- **Peer divergences:** **SPCX** vs ARKX/UFO still **material theme divergence** (Wed squeeze; PRE still leading). LTL: ODFL still trails XPO/SAIA/TFII (lag narrowed, not closed). UNH lagged ELV/CI/HUM; COST lagged WMT. Builders and autos were **co-moves** (not idiosyncratic).
- **Average-down gate:** **Fails** on LEN (event-blind into PPI/Freddie; trailing P/E **12.91×** / P/B **0.92** — cheap vs book, not a clear cheap-vs-history edge given PEG) and SPCX (Aug 20 supply; only **−1.5%** vs $150 cost). ([Yahoo LEN stats](https://finance.yahoo.com/quote/LEN/key-statistics/))

## Leading indicators (book map)

- **PPI / claims:** 8:30 ET still **pending** ([BLS PPI](https://www.bls.gov/schedule/news_release/ppi.htm)).
- **LEN / housing:** Freddie **6.69%** (Aug 6); noon PMMS is the print ([Freddie Mac](https://www.freddiemac.com/pmms)). NAR Jul existing sales **−1.7%** last housing KPI.
- **SPCX:** Next unlock ~**319M Aug 20** ([TipRanks](https://www.tipranks.com/news/spacex-spcx-completed-its-first-lock-up-heres-what-investors-should-watch-next)).
- **HSY / cocoa:** CC=F **$5,753** (up vs the ~05:00 **$5,619** print; still sub-**$6k**) ([Yahoo CC=F](https://finance.yahoo.com/quote/CC%3DF/)).
- **ODFL:** ISM Jul **55.6** unchanged; relative LTL gap is the live KPI.
- Quiet: COST July sales / UNH MCR — no new print.

## What needs attention today

- **PPI + Freddie noon** — Watch LEN/rates; no average-down into the prints.
- **SPCX** squeeze vs theme ETFs into **Aug 20** — Watch, do not chase.
- **ODFL** LTL peer lag — Watch until it closes on tonnage/yield, not a kill.
- Quiet: UNH/COST/PG/HSY/TSLA.

## Position ratings (dual lens)

| Ticker | Quant | Fundamental | Net | Note (≤12 words) |
|--------|-------|-------------|-----|------------------|
| UNH | Hold | Hold | Hold | Lagged peers; thesis intact |
| COST | Hold | Hold | Hold | Premarket soft; membership intact |
| ODFL | Watch | Hold | Watch | Peer gap narrower; ISM intact |
| TSLA | Watch | Watch | Watch | Auto co-move; no new kill edge |
| LEN | Watch | Watch | Watch | PRE bounce; gate still fails |
| PG | Hold | Hold | Hold | Staples ballast; quiet |
| HSY | Hold | Hold | Hold | Through cost; cocoa still sub-$6k |
| SPCX | Watch | Watch | Watch | PRE bid vs peers; Aug 20 supply |

## Position notes (fundamental lens)

### LEN — PRE bounce, still event-blind
Yahoo PRE **$85.77 (+0.67%)** after Wed builder co-fade. Thesis (housing/rates) intact; kill criteria live via sticky mortgage. Valuation **peer-ish / not a clear cheap-vs-history edge** (see health). Gate **fails**.

### SPCX — squeeze leftover, not a gate pass
Yahoo PRE **$147.75 (+1.09%)**; Wed short interest ~**11%** from ~**34%** (S3 via [TradingView/Stocktwits](https://www.tradingview.com/news/stocktwits:e6cc21a66094b:0-spcx-stock-eyes-another-green-week-analyst-warns-traders-to-divorce-spacex-rally-from-fundamentals/)). Repo still labels AXS ETF vs listed SpaceX — **confirm instrument**. Gate fails (unlock path). P&L vs $150 cost is **−1.5%**, not the Aug 2 stale **−27.8%** mark.

### ODFL — lag Watch, not kill
No live PRE; Wed still trailed XPO/SAIA/TFII. Q2 yield-up / tons-down path unchanged.

**No material update:** UNH, COST, PG, HSY, TSLA.

## Portfolio recommendation (book-level)

**[Watch]** through **PPI 8:30 ET** and **Freddie noon**; **Hold policy** on core size. Why: rotation still favors **XLK** more than this book’s heavy sleeves; bands inside soft limits; LEN/SPCX average-down gate still fails (event + valuation / supply). Falsifier: hot PPI that re-spikes 10y/mortgage, or an Aug 20 unlock that forces high-beta **Review→Trim**. Sleeve tilt: none.

## Ranked suggestions (max 3)

1. **[Watch]** PPI + Freddie noon for LEN/rates; no average-down. Evidence: builder co-fade + gate fail (health / LEN note). Confidence: **High**. Falsifier: soft PPI + mortgage drop with order/ASP stabilization into ~Sep 17 est. earnings.

2. **[Watch]** SPCX into Aug 20 unlock; do not chase the PRE bid. Evidence: theme divergence + supply calendar (KPI / SPCX note). Confidence: **High**. Falsifier: orderly float digestion + owner thesis refresh.

3. **[Watch]** ODFL vs LTL peers; hold size unless tonnage/yield breaks. Evidence: lag narrowed but not closed; ISM still constructive. Confidence: **Med**. Falsifier: peer gap closes on next freight prints, or sustained share loss.

## Explicit non-actions

- Do not treat the **XLK** bid or SPCX PRE +1% as an add.
- Do not trim UNH solely for lagging HUM/ELV while inside the soft weight band.

## Delta vs yesterday

- Same-day **pipeline re-run** (~05:40 vs ~05:00): `refresh-holdings.py` E2E green; qty/cost frozen; MV **$30,667**.
- Live Yahoo PRE now on 7/8 names (ODFL still Wed %); SPCX vs cost **−1.5%** (was **−1.8%** at 05:00).
- Cocoa **$5,753** vs the 05:00 **$5,619** print — still sub-$6k, HSY Hold.

## Open questions for next run

1. Post-PPI / Freddie: does the 10y/mortgage path ease LEN Watch, or keep Review pressure?
2. Does SPCX give back the squeeze into Aug 20, or does volume/overhang force high-beta **Review→Trim**?
3. Confirm **SPCX instrument** label (listed SpaceX vs AXS ETF in `holdings.md`).

## Sources

- [Yahoo Finance — quotes / futures / peers / cocoa / 10y / VIX / HSI / Nikkei](https://finance.yahoo.com/)
- [Markets Insider — US futures premarket Aug 13](https://markets.businessinsider.com/premarket)
- [TipRanks — futures mixed into PPI](https://www.tipranks.com/news/stock-futures-mixed-as-investors-await-ppi-data)
- [thetrading.tools — sector SPDR performance Aug 12](https://www.thetrading.tools/sector-performance)
- [BLS — PPI schedule (Aug 13, 8:30 ET)](https://www.bls.gov/schedule/news_release/ppi.htm)
- [Freddie Mac PMMS](https://www.freddiemac.com/pmms)
- [Yahoo — LEN key statistics](https://finance.yahoo.com/quote/LEN/key-statistics/)
- [TradingView / Stocktwits — SPCX squeeze / short interest](https://www.tradingview.com/news/stocktwits:e6cc21a66094b:0-spcx-stock-eyes-another-green-week-analyst-warns-traders-to-divorce-spacex-rally-from-fundamentals/)
- [TipRanks — SPCX lock-up calendar](https://www.tipranks.com/news/spacex-spcx-completed-its-first-lock-up-heres-what-investors-should-watch-next)
- [BLS CPI — July 2026 (Aug 12)](https://www.bls.gov/news.release/cpi.htm)
