# portfolio-brief

Private dual-analyst notebook: **quant risk + fundamental review** of your portfolio, updated on weekday mornings before the US open, published to a private GitHub Pages site.

## What’s in the box

| Path | Role |
|------|------|
| `holdings.md` | Positions, weights, thesis, kill criteria |
| `rules.md` | Risk bands + suggestion language |
| `AGENTS.md` | Full agent protocol |
| `calendar.md` | Earnings / catalysts |
| `notes.md` | Your overrides |
| `decisions/JOURNAL.md` | What you did after each brief |
| `reports/` | Dated briefs + `latest.md` |
| `docs/` | GitHub Pages site |
| `automation/PROMPT.md` | Cursor Automations setup |

## Holdings (snapshot 2026-08-02)

UNH · COST · ODFL · TSLA · LEN · PG · HSY · SPCX

## Schedule

Mon–Fri **08:30 America/New_York** (1 hour before US cash open). Asia/HK overnight is included as spillover context (portfolio is US-listed).

## Local preview of Pages

```bash
node scripts/bake-site.mjs
open docs/index.html
```

## Create the private GitHub repo

`gh` was not available on this machine when scaffolding. From this folder:

```bash
# install GitHub CLI if needed, then:
gh auth login
gh repo create portfolio-brief --private --source=. --remote=origin --push
```

Then: **Settings → Pages → Build and deployment → GitHub Actions**.

Private Pages requires a GitHub plan that supports Pages on private repos.

## Cursor Automation

1. Open [cursor.com/automations](https://cursor.com/automations)  
2. New automation → schedule cron as in `automation/PROMPT.md`  
3. Attach **this repository**  
4. Paste the prompt from `automation/PROMPT.md`  
5. Enable browser/computer use; allow commits/PRs to `main`  

Or run once manually in Cursor Agent: “Follow AGENTS.md and produce today’s brief.”

## Disclaimer

Not investment advice. Decision-support research only.
