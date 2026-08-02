# portfolio-brief

Private dual-analyst notebook: **quant risk + fundamental review** of your portfolio, updated on weekday mornings before the US open, published via a **Next.js** static site on GitHub Pages.

## What’s in the box

| Path | Role |
|------|------|
| `holdings.md` | Positions, weights, thesis, kill criteria |
| `rules.md` | Risk bands + suggestion language |
| `AGENTS.md` | Full agent protocol |
| `calendar.md` | Earnings / catalysts |
| `notes.md` | Your overrides |
| `decisions/JOURNAL.md` | What you did after each brief |
| `reports/` | Dated briefs + `latest.md` (site source of truth) |
| `site/` | Next.js (TypeScript) UI — static export to Pages |
| `automation/PROMPT.md` | Cursor Automations setup |

## Holdings (snapshot 2026-08-02)

UNH · COST · ODFL · TSLA · LEN · PG · HSY · SPCX

## Schedule

Mon–Fri **08:30 America/New_York** (1 hour before US cash open). Asia/HK overnight is included as spillover context (portfolio is US-listed).

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
