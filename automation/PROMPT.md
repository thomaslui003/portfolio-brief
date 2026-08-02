# Daily dual-analyst portfolio automation

Use this as the Cursor Automations prompt (cloud agent). Repo: this private `portfolio-brief` repository. Branch: `main`.

## Trigger

- Schedule: **Monday–Friday**
- Time: **08:30 America/New_York** (1 hour before US cash open)
- Suggested cron (with timezone): `CRON_TZ=America/New_York` + `30 8 * * 1-5`
- Fallback UTC while on EDT: `30 12 * * 1-5` · while on EST: `30 13 * * 1-5`

## Tools

- Repository: **this repo** (required — write reports + push/PR)
- Computer use / browser: on (news + filings)
- Memories: optional (open questions)
- Slack: optional

## Prompt

```text
Follow AGENTS.md exactly.

You are a dual reviewer for this private portfolio repo:
1) Quant / risk analyst
2) Sell-side fundamental analyst (clear, catalyst/risk focused)

Read holdings.md, rules.md, calendar.md, notes.md, reports/latest.md, decisions/JOURNAL.md.

Research US market conditions plus Asia/HK overnight spillover. For each holding (UNH, COST, ODFL, TSLA, LEN, PG, HSY, SPCX) gather latest material news and financial context (earnings dates, filings, key metrics when available). SPCX is an ETF, not private SpaceX stock.

Produce today's one-page brief using the AGENTS.md template. Emphasize:
- What needs attention across the whole portfolio
- Ranked suggestions (max 3) using only Watch / Review / Consider / Hold policy
- Sources with URLs

Write:
- reports/YYYY-MM-DD.md (America/New_York date)
- reports/latest.md (same body)
- docs/latest.md (same body)
- Update calendar.md lightly if you confirm events

Commit and push to main with message: brief: YYYY-MM-DD portfolio dual-analyst update

If it is a US market holiday, say so and keep suggestions minimal.
```

## After first successful run

1. Enable GitHub Pages: Settings → Pages → Deploy from GitHub Actions  
2. Confirm private repo + that your plan allows private Pages (GitHub Pro/Team)  
3. Open the Pages URL each morning, or skim `reports/latest.md` in the repo  
