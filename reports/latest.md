# Portfolio brief — 2026-08-13

> Not investment advice. Research and decision-support only. Verify prices, filings, and news before acting.

**Session:** Thursday pre-open (ET), ~08:55 ET. **Manual test run on merged `main`** (mark-refresh pipeline). **PPI printed 8:30 ET** (cool). Freddie PMMS **noon ET** still pending. **Marks as-of 2026-08-13** Yahoo PRE; **Qty/cost as-of 2026-08-02**. Futures: Yahoo continuous vs prior settle. Holdings: Yahoo PRE vs prior close.

## Market regime (US + Asia/HK overnight)

- **Post-PPI:** Cool wholesale print (see KPI). Yahoo globex bid but not a melt-up: ES **+0.18**, NQ **−0.01**, YM **+0.30**, RTY **+0.27**.
- **Rates / vol:** 10y (^TNX) **4.66%** (eased vs the 05:40 **4.68%**); VIX **14.51** ([Yahoo ^TNX](https://finance.yahoo.com/quote/%5ETNX/); [Yahoo ^VIX](https://finance.yahoo.com/quote/%5EVIX/)).
- **Oil:** WTI **$81.28 (−2.39%)** ([Yahoo CL=F](https://finance.yahoo.com/quote/CL%3DF/)).
- **Asia/HK:** Nikkei **68,308.59 (+1.16%)**; HSI **25,396.51 (−0.17%)** — Japan bid, HK still soft ([Yahoo ^N225](https://finance.yahoo.com/quote/%5EN225/); [Yahoo ^HSI](https://finance.yahoo.com/quote/%5EHSI/)).

## US premarket

Script E2E on `main`: MV ≈ **$30,691**. Book-relevant: **LEN +0.92** with DHI/PHM (builder co-bid after cool PPI — not idiosyncratic); **HSY +0.91**; **TSLA −0.71** lagging autos; **SPCX −0.30** squeeze leftover faded. Core (UNH/COST/ODFL/PG) quiet green-to-flat.

| Symbol | Name | Premarket % |
|--------|------|-------------|
| ES | S&P 500 futures | +0.18 |
| NQ | Nasdaq 100 futures | -0.01 |
| YM | Dow futures | +0.30 |
| RTY | Russell 2000 futures | +0.27 |
| UNH | UnitedHealth | +0.46 |
| COST | Costco | +0.21 |
| ODFL | Old Dominion | -0.03 |
| TSLA | Tesla | -0.71 |
| LEN | Lennar | +0.92 |
| PG | Procter & Gamble | +0.35 |
| HSY | Hershey | +0.91 |
| SPCX | SPCX ETF | -0.30 |

## Money flow / sector rotation

Last **full session Wed Aug 12** ([thetrading.tools](https://www.thetrading.tools/sector-performance)). Premarket sector % is not a substitute for the cash session.

- **Leaders:** **XLK (Technology) +1.49%**, **XLRE (Real Estate) +0.93%**, **XLU (Utilities) +0.48%**, **XLP (Consumer Staples) +0.46%**.
- **Laggards:** **XLB (Materials) −1.24%**, **XLY (Consumer Discretionary) −1.13%**, **XLC (Communication Services) −0.90%**.
- **~5-day (1W):** **XLE (Energy) +6.49%** / **XLV (Health Care) +2.61%** still lead; **XLRE (Real Estate) −1.57%** still the duration laggard.
- **Style:** **IWF (growth) +0.66%** vs **IWD (value) −0.06%**; **IWM (small caps) +0.57%** ([Yahoo](https://finance.yahoo.com/)).
- **Fund flows:** No sourced ETF flow print — **price leadership only**.
- **Book map:** Wed **XLK** still the risk-on sleeve (helps TSLA/SPCX tape, not UNH/COST/ODFL weights). Cool PPI + 10y ease is a **duration/housing** overlay into Freddie — not yet a rotation into this book.

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

- **Concentration / bands:** UNH 19.9% + COST 18.6% + ODFL 17.3% ≈ **56%** (under soft top-3 **60%**). Cyclical **29%**, staples **34%**, high-beta **17%**. No hard breach. Qty/cost freeze verified (**2026-08-02**).
- **Underwater vs cost:** LEN **−24.5%**, TSLA **−10.0%**, SPCX **−2.8%**. HSY through cost.
- **Peer divergences:** Wed **SPCX vs ARKX/UFO** still the material 1-session theme gap (PRE today is a co-fade). LTL: ODFL still trails XPO/SAIA/TFII on Wed. UNH lagged ELV/HUM on Wed (PRE catching up). Builders **co-bid** this morning. TSLA PRE softer than GM/F/RIVN.
- **Average-down gate:** **Fails** on LEN (Freddie still noon; trailing P/E **12.91×** / P/B **0.92** — cheap vs book, not a clear cheap-vs-history edge) and SPCX (Aug 20 supply). Cool PPI does **not** clear the gate. ([Yahoo LEN stats](https://finance.yahoo.com/quote/LEN/key-statistics/))

## Leading indicators (book map)

- **PPI (printed):** Final demand **0.0% MoM** (cons. **+0.2%**); **+4.7% YoY**. Core **+0.2%** (cons. **+0.3%**). June revised to **−0.1%** (was **−0.3%**). Goods **−0.7%** / energy **−3.1%**; services **+0.2%**. ([BLS](https://www.bls.gov/news.release/ppi.htm); [CNBC](https://www.cnbc.com/2026/08/13/wholesale-prices-were-flat-in-july-below-expectations-for-0point2percent-increase.html))
- **Claims:** **209k** (+9k; prior revised **200k**); 4-wk avg **199k** unchanged ([DOL](https://www.dol.gov/newsroom/releases/eta)).
- **LEN / housing:** Freddie still **6.69%** (Aug 6); **noon ET** is the print ([Freddie Mac](https://www.freddiemac.com/pmms)). NAR Jul existing sales **−1.7%**.
- **SPCX:** Next unlock ~**319M Aug 20** ([TipRanks](https://www.tipranks.com/news/spacex-spcx-completed-its-first-lock-up-heres-what-investors-should-watch-next)).
- **HSY / cocoa:** CC=F **$5,754** — still sub-**$6k** ([Yahoo CC=F](https://finance.yahoo.com/quote/CC%3DF/)).
- **ODFL:** ISM Jul **55.6**; relative LTL gap unchanged.

## What needs attention today

- **Freddie noon** — last LEN/rates Watch of the print pair; no average-down into it.
- **SPCX** squeeze faded PRE; **Aug 20** supply still the event.
- **ODFL** LTL peer lag — Watch, not kill.
- Quiet: UNH/COST/PG/HSY. TSLA PRE lag vs autos is noise vs the margin/FCF kill line.

## Position ratings (dual lens)

| Ticker | Quant | Fundamental | Net | Note (≤12 words) |
|--------|-------|-------------|-----|------------------|
| UNH | Hold | Hold | Hold | PRE catch-up; thesis intact |
| COST | Hold | Hold | Hold | Quiet PRE; membership intact |
| ODFL | Watch | Hold | Watch | Peer gap; ISM intact |
| TSLA | Watch | Watch | Watch | PRE lag vs autos; no kill |
| LEN | Watch | Watch | Watch | PPI cool; Freddie still pending |
| PG | Hold | Hold | Hold | Staples ballast; quiet |
| HSY | Hold | Hold | Hold | Through cost; cocoa sub-$6k |
| SPCX | Watch | Watch | Watch | Squeeze faded; Aug 20 supply |

## Position notes (fundamental lens)

### LEN — cool PPI, still event-blind into Freddie
Yahoo PRE **$85.96 (+0.92%)** with DHI/PHM. Thesis (housing/rates) intact; 10y eased but mortgage KPI is noon. Valuation still **peer-ish / not a clear cheap-vs-history edge** (see health). Gate **fails**.

### SPCX — leftover squeeze faded
Yahoo PRE **$145.71 (−0.30%)** vs Wed theme divergence. Repo still labels AXS ETF vs listed SpaceX — **confirm instrument**. Gate fails (unlock). P&L vs $150 cost **−2.8%**.

### ODFL — lag Watch, not kill
PRE flat; Wed still trailed XPO/SAIA/TFII. Q2 yield-up / tons-down path unchanged.

**No material update:** UNH, COST, PG, HSY, TSLA.

## Portfolio recommendation (book-level)

**[Watch]** **Freddie noon**; **Hold policy** on core size. Cool PPI (and a small 10y ease) is not permission to add LEN or chase SPCX. Why: rotation still **XLK**-led vs this book’s heavy sleeves; bands inside soft limits; LEN/SPCX gate still fails (Freddie + Aug 20). Falsifier: Freddie print that re-tightens mortgage, or an Aug 20 unlock that forces high-beta **Review→Trim**. Sleeve tilt: none.

## Ranked suggestions (max 3)

1. **[Watch]** Freddie noon for LEN/rates; no average-down. Evidence: gate still fails (health / LEN note). Confidence: **High**. Falsifier: mortgage drop with order/ASP stabilization into ~Sep 17 est. earnings.

2. **[Watch]** SPCX into Aug 20 unlock; do not fade-chase. Evidence: supply calendar (KPI / SPCX note). Confidence: **High**. Falsifier: orderly float digestion + owner thesis refresh.

3. **[Watch]** ODFL vs LTL peers; hold size unless tonnage/yield breaks. Evidence: lag not closed; ISM still constructive. Confidence: **Med**. Falsifier: peer gap closes on next freight prints, or sustained share loss.

## Explicit non-actions

- Do not treat cool PPI or LEN’s +0.9% PRE as an add.
- Do not trim UNH solely for Wed peer lag while inside the soft weight band.

## Delta vs yesterday

- PPI Watch **resolved cool** (see KPI); remaining Watch is **Freddie noon**.
- Pipeline re-run on merged `main`: qty/cost frozen; MV **$30,691**; live PRE on all 8 names.
- SPCX PRE faded; P&L vs cost **−2.8%** (05:40 was **−1.5%**). LEN PRE **+0.92** with builders.

## Open questions for next run

1. Post-Freddie: does the mortgage path ease LEN Watch, or keep Review pressure into ~Sep 17?
2. Does SPCX give back more into Aug 20, or does volume/overhang force high-beta **Review→Trim**?
3. Confirm **SPCX instrument** label (listed SpaceX vs AXS ETF in `holdings.md`).

## Sources

- [BLS — Producer Price Indexes July 2026](https://www.bls.gov/news.release/ppi.htm)
- [CNBC — July PPI unchanged vs +0.2% consensus](https://www.cnbc.com/2026/08/13/wholesale-prices-were-flat-in-july-below-expectations-for-0point2percent-increase.html)
- [DOL — weekly UI claims Aug 13](https://www.dol.gov/newsroom/releases/eta)
- [Yahoo Finance — quotes / futures / peers / cocoa / 10y / VIX](https://finance.yahoo.com/)
- [thetrading.tools — sector SPDR performance Aug 12](https://www.thetrading.tools/sector-performance)
- [Freddie Mac PMMS](https://www.freddiemac.com/pmms)
- [Yahoo — LEN key statistics](https://finance.yahoo.com/quote/LEN/key-statistics/)
- [TipRanks — SPCX lock-up calendar](https://www.tipranks.com/news/spacex-spcx-completed-its-first-lock-up-heres-what-investors-should-watch-next)
- [BLS CPI — July 2026 (Aug 12)](https://www.bls.gov/news.release/cpi.htm)
