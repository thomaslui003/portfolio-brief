# portfolio-brief

Private dual-analyst notebook: **quant risk + fundamental review** of your portfolio, updated on weekday mornings before the US open, published via a **Next.js** static site on GitHub Pages.

The site is a **desk with five perspectives** (not a single scrolling note):

| View | Question it answers |
|------|---------------------|
| **Decision** | What is the book stance, what needs attention, what are the ≤3 suggestions? |
| **Book** | What do I own — weights, clusters, P&L vs cost, rule-band pressure? |
| **Tape** | What is the market doing — premarket, sector rotation, regime, KPIs? |
| **Names** | What is the case for each holding — thesis, kill line, dual-lens rating? |
| **Note** | Full source brief (for citations and archive). |

## What’s in the box

| Path | Role |
|------|------|
| `holdings.md` | Positions, thesis, kill criteria; Price/MV/Weight/P&L refreshed from Yahoo each run |
| `scripts/refresh-holdings.py` | Yahoo mark refresh (keeps Qty and Cost/sh) |
| `rules.md` | Risk bands + suggestion language + valuation bands |
| `valuation.md` | Cached fwd P/S / P/E spots + historical min/max (monthly) |
| `AGENTS.md` | Full agent protocol |
| `calendar.md` | Earnings / catalysts |
| `notes.md` | Your overrides |
| `decisions/JOURNAL.md` | What you did after each brief |
| `reports/` | Dated briefs + `latest.md` (site source of truth) |
| `site/` | Next.js (TypeScript) UI — static export to Pages |
| `automation/PROMPT.md` | Cursor Automations setup |

## Holdings

UNH · COST · ODFL · TSLA · LEN · PG · HSY · SPCX

Qty and cost are the last **broker** paste (**Qty/cost as-of** in `holdings.md`, currently 2026-08-02). Each weekday run runs `python3 scripts/refresh-holdings.py` so Price, market value, weights, and P&L vs cost are **Yahoo marks** (premarket when the tape is open pre-cash). The site Book / Names views read that file at Pages build.

## Schedule

Mon–Fri **08:30 America/New_York** (1 hour before US cash open). Each brief includes a **US premarket** snapshot (index futures + holdings) plus Asia/HK overnight spillover (portfolio is US-listed).

## Local preview of the site

```bash
cd site
npm install
npm run dev
```

Production-like static build:

```bash
cd site
npm run build
npx serve out
```

GitHub Actions sets `GITHUB_ACTIONS=true` so the export uses `basePath=/portfolio-brief` for project Pages.

## GitHub Pages

1. Repo **Settings → Pages → Source: GitHub Actions**
2. Push to `main` (or re-run the **Deploy Pages** workflow)
3. Site URL: `https://<user>.github.io/portfolio-brief/`

Private Pages needs a GitHub plan that supports Pages on private repos.

## Cursor Automation

1. Open [cursor.com/automations](https://cursor.com/automations)  
2. Schedule cron as in `automation/PROMPT.md`  
3. Attach **this repository** on `main`  
4. Paste the prompt; enable browser; **push to main, no PR**  

## Disclaimer

Not investment advice. Decision-support research only.
