# Portfolio brief — 2026-08-13

> Not investment advice. Research and decision-support only. Verify prices, filings, and news before acting.

**Session:** Thursday pre-open (ET), ~05:00 ET. **Manual test run** of the write-once desk prompt. Holdings **Marks as-of 2026-08-13** (Yahoo premarket via `scripts/refresh-holdings.py`); **Qty/cost as-of 2026-08-02**. **PPI 8:30 ET**; Freddie PMMS **noon ET**. Last cash: Wed Aug 12 (Yahoo / StockAnalysis). Premarket: [Markets Insider](https://markets.businessinsider.com/premarket) futures; live Yahoo premarket only where printed.

## Market regime (US + Asia/HK overnight)

- **Into PPI:** Futures mixed-to-firm after in-line Wed CPI; S&P 500 cash **+0.26%** Wed, Nasdaq Composite **+0.54%**, Dow ~flat ([TipRanks](https://www.tipranks.com/news/stock-futures-mixed-as-investors-await-ppi-data)). Cons. PPI **+0.2% MoM** (Dow Jones).
- **Rates / vol:** 10y (^TNX) **4.68%** (Wed); VIX **14.55** close / ~**14.7** overnight ([Yahoo ^TNX](https://finance.yahoo.com/quote/%5ETNX/); [Yahoo ^VIX](https://finance.yahoo.com/quote/%5EVIX/)).
- **Oil:** WTI ~**$81.9** premarket (**−1.7%**) after a Hormuz-bid stretch — still an inflation overlay ([Markets Insider](https://markets.businessinsider.com/premarket); [Yahoo CL=F](https://finance.yahoo.com/quote/CL%3DF/)).
- **Asia/HK:** Nikkei **68,308.59 (+1.16%)**; HSI ~**25,399 (−0.2%)** early — Japan/Korea AI bid, HK still soft ([Nikkei Indexes](https://indexes.nikkei.co.jp/en/nkave/archives/data); [FMT](https://www.freemalaysiatoday.com/category/business/2026/08/13/seoul-tech-leads-asian-stock-gains-as-traders-cheer-us-inflation)).

## US premarket

Thin ~05:00 ET book into **PPI**. Futures: **Markets Insider** ES **+0.13**, NQ **−0.01**, YM **+0.18** (~04:37 ET); **Yahoo RTY=F +0.18** vs prior. Live Yahoo premarket: **UNH −0.02**, **PG +0.11**, **SPCX +0.94**. Other holdings in the table are **Wed session %** (no live premarket print). Book-relevant: builders still the soft sleeve; SPCX squeeze leftover bid.

| Symbol | Name | Premarket % |
|--------|------|-------------|
| ES | S&P 500 futures | +0.13 |
| NQ | Nasdaq 100 futures | -0.01 |
| YM | Dow futures | +0.18 |
| RTY | Russell 2000 futures | +0.18 |
| UNH | UnitedHealth | -0.02 |
| COST | Costco | +0.56 |
| ODFL | Old Dominion | +1.48 |
| TSLA | Tesla | -1.59 |
| LEN | Lennar | -2.68 |
| PG | Procter & Gamble | +0.11 |
| HSY | Hershey | +1.24 |
| SPCX | SPCX ETF | +0.94 |

## Money flow / sector rotation

Last **full session Wed Aug 12** ([thetrading.tools](https://www.thetrading.tools/sector-performance)).

- **Leaders:** **XLK (Technology) +1.49%**, **XLRE (Real Estate) +0.93%**, **XLU (Utilities) +0.48%**, **XLP (Consumer Staples) +0.46%**.
- **Laggards:** **XLB (Materials) −1.24%**, **XLY (Consumer Discretionary) −1.13%**, **XLC (Communication Services) −0.90%**.
- **~5-day (1W):** **XLE (Energy) +6.49%** / **XLV (Health Care) +2.61%** still lead; **XLRE (Real Estate) −1.57%** remains the duration laggard despite Wed bounce.
- **Style:** **IWF (growth) +0.66%** vs **IWD (value) −0.06%**; **IWM (small caps) +0.57%** ([Yahoo](https://finance.yahoo.com/)).
- **Fund flows:** No sourced ETF flow print — **price leadership only**.
- **Book map:** Wed **XLK** bid helps risk appetite (TSLA/SPCX tape) more than this book’s core; **XLRE** bounce did **not** save LEN; **XLI** firm-but-quiet while ODFL still lagged LTL peers; **XLP/XLV** green is ballast, not a signal to add UNH/COST.

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

- **Concentration / bands:** UNH 19.9% + COST 18.5% + ODFL 17.3% ≈ **56%** (under soft top-3 **60%**). UNH off the **22%** soft-max. Cyclical **29%**, staples **34%**, high-beta **17%** (under **20%**). No hard breach.
- **Underwater vs cost (Yahoo marks × frozen cost):** LEN **−24.6%**, TSLA **−9.5%**, SPCX **−1.8%**. HSY is through cost. SPCX **$147.25** still below cost **$150**.
- **Peer divergences (Wed):** Builders **co-fade** (LEN with DHI/PHM/TOL). LTL: ODFL **+1.48%** vs XPO **+2.72%** / SAIA **+2.16%** / TFII **+2.83%** — lag **narrowed** vs Tue, not closed. **SPCX +9.65%** vs ARKX **+0.81%** / UFO **+1.90%** — **material theme divergence**. UNH lagged ELV/CI/HUM (industry bid, UNH slower). COST lagged WMT. TSLA with GM/F/RIVN — auto co-move.
- **Average-down gate:** **Fails** on LEN (event-blind into PPI/Freddie; P/E ~**13.4×** / P/B ~**0.95** peer-ish, not a clear cheap-vs-history edge) and SPCX (Aug 20 supply). ([Yahoo LEN stats](https://ca.finance.yahoo.com/quote/LEN/key-statistics/))

## Leading indicators (book map)

- **PPI / claims:** 8:30 ET — next rates falsifier after in-line CPI ([BLS PPI](https://www.bls.gov/schedule/news_release/ppi.htm); [XTB calendar](https://www.xtb.com/int/market-analysis/news-and-research/economic-calendar-us-ppi-jobless-claims-and-fed-speeches-to-bring-more-insight-after-uneventful-cpi-13-08-2026)).
- **LEN / housing:** Freddie still **6.69%** (Aug 6); noon PMMS is the print ([Freddie Mac](https://www.freddiemac.com/pmms)). NAR Jul existing sales **−1.7%** still the last housing KPI.
- **SPCX:** Next unlock ~**319M Aug 20** ([TipRanks](https://www.tipranks.com/news/spacex-spcx-completed-its-first-lock-up-heres-what-investors-should-watch-next)).
- **HSY / cocoa:** CC=F **$5,619** — still sub-**$6k** ([Yahoo CC=F](https://finance.yahoo.com/quote/CC%3DF/)).
- **ODFL:** ISM Jul **55.6** unchanged; relative LTL gap is the live KPI.
- Quiet: COST July sales / UNH MCR path — no new print overnight.

## What needs attention today

- **PPI + Freddie noon** — Watch LEN/rates; no average-down into the prints.
- **SPCX** Wed squeeze vs theme ETFs into **Aug 20** unlock — Watch, do not chase.
- **ODFL** peer lag narrowed Wed — Watch until it closes on tonnage/yield, not a kill.
- Quiet: UNH/COST/PG/HSY/TSLA (peer co-moves / Starlink headline = noise vs margin/FCF edge).

## Position ratings (dual lens)

| Ticker | Quant | Fundamental | Net | Note (≤12 words) |
|--------|-------|-------------|-----|------------------|
| UNH | Hold | Hold | Hold | Lagged peers; thesis intact |
| COST | Hold | Hold | Hold | Lagged WMT; membership intact |
| ODFL | Watch | Hold | Watch | Peer gap narrower; ISM intact |
| TSLA | Watch | Watch | Watch | Auto co-move; Starlink is noise |
| LEN | Watch | Watch | Watch | Fade into PPI/Freddie; gate fails |
| PG | Hold | Hold | Hold | Staples ballast; quiet |
| HSY | Hold | Hold | Hold | Cocoa cool; volume scar residual |
| SPCX | Watch | Watch | Watch | Squeeze vs peers; Aug 20 supply |

## Position notes (fundamental lens)

### LEN — still event-blind
Wed **$85.20 (−2.68%)** with DHI/PHM/TOL. Thesis (housing/rates) intact; kill criteria live via sticky mortgage + existing-sales print. Valuation still **peer-ish / not a clear cheap-vs-history edge** (see health). Gate **fails**. Net **Watch**.

### SPCX — squeeze, not a gate pass
Wed **$146.15 (+9.65%)**; short interest cited down to ~**11%** from ~**34%** (S3 via [TradingView/Stocktwits](https://www.tradingview.com/news/stocktwits:e6cc21a66094b:0-spcx-stock-eyes-another-green-week-analyst-warns-traders-to-divorce-spacex-rally-from-fundamentals/)). Morningstar: divorce tape from fundamentals. Repo still labels AXS ETF vs listed SpaceX — **confirm instrument**. Gate fails (unlock path). Net **Watch**.

### ODFL — lag Watch, not kill
Wed catch-up vs Tue miss; still trailed XPO/SAIA/TFII. Q2 yield-up / tons-down path unchanged. Net **Watch** (cautious of Quant/Fundamental split).

**No material update:** UNH, COST, PG, HSY, TSLA (Starlink-in-all-models headline does not move the margin/FCF kill line).

## Portfolio recommendation (book-level)

**[Watch]** through **PPI 8:30 ET** and **Freddie noon**; **Hold policy** on core size — in-line CPI opened the door but did not authorize adds into soft builders or an SPCX squeeze. Why: rotation helped **XLK** more than this book’s heavy sleeves; concentration inside soft bands; LEN/SPCX average-down gate still fails (valuation + event/supply). Falsifier: hot PPI that re-spikes 10y/mortgage, or an Aug 20 unlock that forces high-beta **Review→Trim**. Sleeve tilt: none.

## Ranked suggestions (max 3)

1. **[Watch]** PPI + Freddie noon for LEN/rates; no average-down. Evidence: builder co-fade + gate fail (health / LEN note). Confidence: **High**. Falsifier: soft PPI + mortgage drop with order/ASP stabilization into ~Sep 17 est. earnings.

2. **[Watch]** SPCX into Aug 20 unlock; do not chase Wed squeeze. Evidence: theme divergence + supply calendar (KPI / SPCX note). Confidence: **High**. Falsifier: orderly float digestion + owner thesis refresh.

3. **[Watch]** ODFL vs LTL peers; hold size unless tonnage/yield breaks. Evidence: lag narrowed but not closed; ISM still constructive. Confidence: **Med**. Falsifier: peer gap closes on next freight prints, or sustained share loss.

## Explicit non-actions

- Do not treat Wed **XLK** bid or TSLA Starlink headline as an add.
- Do not trim UNH solely for lagging HUM/ELV while inside the soft weight band.

## Delta vs yesterday

- CPI Watch **resolved in-line**; today’s Watch is **PPI + Freddie**.
- Book marks now refresh from Yahoo each run (qty/cost still **2026-08-02**); SPCX P&L vs cost is **−1.8%**, not the Aug 2 **−27.8%** stale mark. HSY is through cost.
- **SPCX** squeeze vs theme ETFs and **ODFL** peer lag **narrowed** — still Watch, no add.

## Open questions for next run

1. Post-PPI / Freddie: does the 10y/mortgage path ease LEN Watch, or keep Review pressure?
2. Does SPCX give back the squeeze into Aug 20, or does volume/overhang force high-beta **Review→Trim**?
3. Does ODFL close the LTL peer gap on the next tonnage/peer print?

## Sources

- [Markets Insider — US futures premarket Aug 13](https://markets.businessinsider.com/premarket)
- [TipRanks — futures mixed into PPI](https://www.tipranks.com/news/stock-futures-mixed-as-investors-await-ppi-data)
- [Yahoo Finance — quotes / peers / futures / cocoa / 10y / VIX](https://finance.yahoo.com/)
- [StockAnalysis — ODFL / LEN / PG / HSY / COST / TSLA / UNH history](https://stockanalysis.com/)
- [thetrading.tools — sector SPDR performance Aug 12](https://www.thetrading.tools/sector-performance)
- [BLS — PPI schedule (Aug 13, 8:30 ET)](https://www.bls.gov/schedule/news_release/ppi.htm)
- [Freddie Mac PMMS](https://www.freddiemac.com/pmms)
- [Yahoo Canada — LEN key statistics](https://ca.finance.yahoo.com/quote/LEN/key-statistics/)
- [Nikkei Indexes — Aug 13 close](https://indexes.nikkei.co.jp/en/nkave/archives/data)
- [FMT — Asia tape Aug 13](https://www.freemalaysiatoday.com/category/business/2026/08/13/seoul-tech-leads-asian-stock-gains-as-traders-cheer-us-inflation)
- [TradingView / Stocktwits — SPCX squeeze / short interest](https://www.tradingview.com/news/stocktwits:e6cc21a66094b:0-spcx-stock-eyes-another-green-week-analyst-warns-traders-to-divorce-spacex-rally-from-fundamentals/)
- [TipRanks — SPCX lock-up calendar](https://www.tipranks.com/news/spacex-spcx-completed-its-first-lock-up-heres-what-investors-should-watch-next)
- [BLS CPI — July 2026 (Aug 12)](https://www.bls.gov/news.release/cpi.htm)
