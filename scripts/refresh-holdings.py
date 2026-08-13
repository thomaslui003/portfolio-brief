#!/usr/bin/env python3
"""Refresh Price / MV / Weight / P&L in holdings.md from Yahoo Finance.

Never changes Qty or Cost/sh (last broker snapshot). Intended to run at the
start of every weekday brief:

    python3 scripts/refresh-holdings.py
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime
from http.cookiejar import CookieJar
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
HOLDINGS_PATH = ROOT / "holdings.md"
ET = ZoneInfo("America/New_York")
UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
)
MINUS = "\u2212"  # Unicode minus, matches existing holdings.md / briefs


class Quote:
    __slots__ = ("ticker", "price", "market_state", "source")

    def __init__(self, ticker: str, price: float, market_state: str, source: str):
        self.ticker = ticker
        self.price = price
        self.market_state = market_state
        self.source = source


def _opener() -> urllib.request.OpenerDirector:
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(CookieJar()))
    opener.addheaders = [
        ("User-Agent", UA),
        ("Accept", "application/json,text/plain,*/*"),
        ("Accept-Language", "en-US,en;q=0.9"),
    ]
    return opener


def _open(opener: urllib.request.OpenerDirector, url: str, timeout: int = 20) -> bytes:
    last: Exception | None = None
    for attempt, delay in enumerate((0, 4, 8, 16)):
        if delay:
            time.sleep(delay)
        try:
            with opener.open(url, timeout=timeout) as resp:
                return resp.read()
        except urllib.error.HTTPError as e:
            last = e
            # 404 on fc.yahoo.com is expected (sets cookie).
            if e.code in {429, 500, 502, 503, 504} and attempt < 3:
                continue
            raise
        except (urllib.error.URLError, TimeoutError) as e:
            last = e
            if attempt < 3:
                continue
            raise
    raise last or RuntimeError(f"failed to open {url}")


def _prime_cookie(opener: urllib.request.OpenerDirector) -> None:
    try:
        _open(opener, "https://fc.yahoo.com")
    except urllib.error.HTTPError:
        # 404 still sets the A3 cookie needed for getcrumb.
        pass


def _crumb(opener: urllib.request.OpenerDirector) -> str:
    raw = _open(opener, "https://query1.finance.yahoo.com/v1/test/getcrumb")
    crumb = raw.decode("utf-8").strip()
    if not crumb or "<" in crumb:
        raise RuntimeError(f"unexpected Yahoo crumb: {crumb[:80]!r}")
    return crumb


def _pick_price(regular: float | None, pre: float | None, post: float | None, state: str) -> float:
    state = (state or "").upper()
    if state in {"PRE", "PREPRE"} and pre is not None:
        return pre
    if state in {"POST", "POSTPOST"} and post is not None:
        # After the close, post is the latest print; morning briefs should be PRE.
        return post
    if regular is None:
        raise ValueError("no regularMarketPrice")
    return regular


def fetch_quotes(tickers: list[str]) -> dict[str, Quote]:
    """Batch Yahoo v7 quote (premarket-aware). Fallback: v8 chart per name."""
    opener = _opener()
    _prime_cookie(opener)
    try:
        crumb = _crumb(opener)
        syms = urllib.parse.quote(",".join(tickers), safe=",")
        url = (
            "https://query1.finance.yahoo.com/v7/finance/quote"
            f"?symbols={syms}&crumb={urllib.parse.quote(crumb)}"
        )
        data = json.loads(_open(opener, url))
        rows = (data.get("quoteResponse") or {}).get("result") or []
        out: dict[str, Quote] = {}
        for row in rows:
            ticker = str(row.get("symbol") or "").upper()
            if not ticker:
                continue
            state = str(row.get("marketState") or "")
            price = _pick_price(
                _num(row.get("regularMarketPrice")),
                _num(row.get("preMarketPrice")),
                _num(row.get("postMarketPrice")),
                state,
            )
            src = "Yahoo premarket" if state.upper() in {"PRE", "PREPRE"} and row.get("preMarketPrice") is not None else "Yahoo"
            out[ticker] = Quote(ticker, price, state, src)
        missing = [t for t in tickers if t not in out]
        if missing:
            out.update(_fetch_chart(opener, missing))
        return out
    except Exception as quote_err:
        print(f"quote API failed ({quote_err}); falling back to chart", file=sys.stderr)
        return _fetch_chart(opener, tickers)


def _fetch_chart(opener: urllib.request.OpenerDirector, tickers: list[str]) -> dict[str, Quote]:
    out: dict[str, Quote] = {}
    for ticker in tickers:
        url = (
            f"https://query2.finance.yahoo.com/v8/finance/chart/{urllib.parse.quote(ticker)}"
            "?range=1d&interval=1m&includePrePost=true"
        )
        data = json.loads(_open(opener, url))
        result = (data.get("chart") or {}).get("result") or []
        if not result:
            raise RuntimeError(f"no chart result for {ticker}")
        meta = result[0].get("meta") or {}
        price = _num(meta.get("regularMarketPrice"))
        if price is None:
            raise RuntimeError(f"no regularMarketPrice for {ticker}")
        out[ticker] = Quote(ticker, price, str(meta.get("marketState") or ""), "Yahoo chart")
        time.sleep(0.2)
    return out


def _num(value: object) -> float | None:
    if value is None or value == "":
        return None
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def parse_money(cell: str) -> float:
    return float(cell.replace(",", "").replace("$", "").strip())


def fmt_price(n: float) -> str:
    return f"{n:.2f}"


def fmt_mv(n: float) -> str:
    return f"{n:,.2f}"


def fmt_weight(n: float) -> str:
    return f"{n:.1f}%"


def fmt_pnl(n: float) -> str:
    sign = "+" if n >= 0 else MINUS
    return f"{sign}{abs(n):.1f}%"


def fmt_total(n: float) -> str:
    return f"${round(n):,}"


def split_row(line: str) -> list[str] | None:
    if not line.startswith("|"):
        return None
    return [c.strip() for c in line.strip().strip("|").split("|")]


def is_holdings_data_row(cells: list[str]) -> bool:
    if len(cells) < 11:
        return False
    ticker = cells[0].upper()
    if ticker == "TICKER" or not re.fullmatch(r"[A-Z.]{1,6}", ticker):
        return False
    if re.fullmatch(r"[-:]+", cells[1]):
        return False
    return True


def refresh_markdown(md: str, quotes: dict[str, Quote], marks_as_of: str) -> str:
    lines = md.splitlines(keepends=True)
    out: list[str] = []
    in_holdings_table = False
    pending: list[tuple[int, list[str], str]] = []
    m_qty = re.search(r"\*\*Qty/cost as-of:\*\*\s*([0-9]{4}-[0-9]{2}-[0-9]{2})", md)
    if m_qty:
        qty_cost_as_of = m_qty.group(1)
    else:
        m_old = re.search(r"\*\*As-of:\*\*\s*([0-9]{4}-[0-9]{2}-[0-9]{2})", md)
        if m_old:
            qty_cost_as_of = m_old.group(1)
        else:
            qty_cost_as_of = "2026-08-02"

    for line in lines:
        nl = "\n" if line.endswith("\n") else ""
        raw = line[:-1] if nl else line
        cells = split_row(raw)
        if cells and cells[0] == "Ticker" and cells[1] == "Name" and "Qty" in cells:
            in_holdings_table = True
            out.append(line)
            continue
        if in_holdings_table:
            if cells is None or not raw.strip():
                in_holdings_table = False
                out.append(line)
                continue
            if is_holdings_data_row(cells):
                pending.append((len(out), cells, nl))
                out.append(line)  # placeholder
                continue
            out.append(line)
            continue
        out.append(line)

    # Compute MV / weights / P&L from Yahoo prices × frozen qty/cost.
    computed: list[tuple[int, list[str], str, float, float, float, float]] = []
    missing: list[str] = []
    for idx, cells, nl in pending:
        ticker = cells[0].upper()
        qty = parse_money(cells[2])
        cost = parse_money(cells[4])
        q = quotes.get(ticker)
        if q is None:
            missing.append(ticker)
            continue
        price = q.price
        mv = qty * price
        pnl = (price / cost - 1.0) * 100.0 if cost else 0.0
        computed.append((idx, cells, nl, price, mv, pnl, qty))

    if missing:
        raise SystemExit(f"missing Yahoo quotes for: {', '.join(missing)}")
    if not computed:
        raise SystemExit("no holdings rows found")

    total_mv = sum(item[4] for item in computed)
    if total_mv <= 0:
        raise SystemExit("total market value is zero")

    weights: dict[str, float] = {}
    pnls: dict[str, float] = {}
    for idx, cells, nl, price, mv, pnl, qty in computed:
        ticker = cells[0].upper()
        weight = mv / total_mv * 100.0
        weights[ticker] = weight
        pnls[ticker] = pnl
        new_cells = list(cells)
        new_cells[3] = fmt_price(price)
        new_cells[5] = fmt_mv(mv)
        new_cells[6] = fmt_weight(weight)
        new_cells[7] = fmt_pnl(pnl)
        # Preserve Qty (2) and Cost/sh (4) exactly.
        out[idx] = "| " + " | ".join(new_cells) + " |" + nl
        src = quotes[ticker].source
        print(
            f"{ticker:5} {src:16}  {qty:g} × {fmt_price(price)}  "
            f"MV {fmt_mv(mv)}  {fmt_weight(weight)}  {fmt_pnl(pnl)}"
        )

    text = "".join(out)
    if not text.endswith("\n"):
        text += "\n"

    # Header: split marks vs qty/cost as-of.
    header = (
        f"**Marks as-of:** {marks_as_of} · **Qty/cost as-of:** {qty_cost_as_of} "
        f"· Currency: USD · Total MV ≈ **{fmt_total(total_mv)}**"
    )
    if re.search(r"\*\*Marks as-of:\*\*", text):
        text = re.sub(
            r"\*\*Marks as-of:\*\*.+",
            header,
            text,
            count=1,
        )
    elif re.search(r"\*\*As-of:\*\*", text):
        text = re.sub(r"\*\*As-of:\*\*.+", header, text, count=1)
    else:
        text = header + "\n" + text

    intro = (
        "Qty and cost from last broker snapshot; Price / MV / Weight / P&L "
        "refreshed from Yahoo each run."
    )
    text = re.sub(
        r"^Snapshot from broker UI\..+$",
        intro,
        text,
        count=1,
        flags=re.M,
    )
    text = re.sub(
        r"^Qty and cost from last broker snapshot;.+$",
        intro,
        text,
        count=1,
        flags=re.M,
    )

    def cluster_pct(tickers: list[str]) -> int:
        return int(round(sum(weights.get(t, 0.0) for t in tickers)))

    core = cluster_pct(["UNH", "COST", "ODFL"])
    cyc = cluster_pct(["ODFL", "LEN"])
    staples = cluster_pct(["COST", "PG", "HSY"])
    beta = cluster_pct(["TSLA", "SPCX"])
    text = re.sub(
        r"(\*\*Largest weights:\*\* UNH, COST, ODFL \()~\d+% combined",
        rf"\1~{core}% combined",
        text,
        count=1,
    )
    text = re.sub(
        r"(\*\*Cyclical cluster:\*\* ODFL \+ LEN \()~\d+%",
        rf"\1~{cyc}%",
        text,
        count=1,
    )
    text = re.sub(
        r"(\*\*Defensive cluster:\*\* COST \+ PG \+ HSY \()~\d+%",
        rf"\1~{staples}%",
        text,
        count=1,
    )
    text = re.sub(
        r"(\*\*High-beta / thematic:\*\* TSLA \+ SPCX \()~\d+%",
        rf"\1~{beta}%",
        text,
        count=1,
    )

    underwater = [t for t, pnl in pnls.items() if pnl < 0]
    if underwater:
        joined = " & ".join(underwater)
        text = re.sub(
            r"^- \*\*[^*]+\*\* are underwater vs cost",
            rf"- **{joined}** are underwater vs cost",
            text,
            count=1,
            flags=re.M,
        )
        text = re.sub(
            r"^- \*\*No names\*\* are underwater vs cost",
            rf"- **{joined}** are underwater vs cost",
            text,
            count=1,
            flags=re.M,
        )
    else:
        text = re.sub(
            r"^- \*\*[^*]+\*\* are underwater vs cost",
            "- **No names** are underwater vs cost",
            text,
            count=1,
            flags=re.M,
        )

    return text


def verify_qty_cost_frozen(before: str, after: str) -> None:
    def rows(md: str) -> dict[str, tuple[str, str]]:
        found: dict[str, tuple[str, str]] = {}
        in_table = False
        for line in md.splitlines():
            cells = split_row(line)
            if cells and cells[0] == "Ticker" and cells[1] == "Name" and "Qty" in cells:
                in_table = True
                continue
            if in_table and cells and is_holdings_data_row(cells):
                found[cells[0].upper()] = (cells[2], cells[4])
            elif in_table and (not cells or not line.strip()):
                break
        return found

    a, b = rows(before), rows(after)
    if a != b:
        raise SystemExit(f"qty/cost drifted: {a} -> {b}")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--path", type=Path, default=HOLDINGS_PATH)
    args = parser.parse_args()
    path: Path = args.path
    md = path.read_text(encoding="utf-8")

    tickers: list[str] = []
    in_table = False
    for line in md.splitlines():
        cells = split_row(line)
        if cells and cells[0] == "Ticker" and cells[1] == "Name" and "Qty" in cells:
            in_table = True
            continue
        if in_table and cells and is_holdings_data_row(cells):
            tickers.append(cells[0].upper())
        elif in_table and (not cells or not line.strip()):
            break

    if not tickers:
        raise SystemExit("no tickers found in holdings.md")

    print(f"Refreshing {len(tickers)} marks from Yahoo: {', '.join(tickers)}")
    quotes = fetch_quotes(tickers)
    today = datetime.now(ET).date().isoformat()
    updated = refresh_markdown(md, quotes, today)
    verify_qty_cost_frozen(md, updated)
    path.write_text(updated, encoding="utf-8")
    print(f"Wrote {path} (marks as-of {today}; qty/cost unchanged)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
