export type PremarketTapeRow = {
  symbol: string;
  name: string;
  premarketPct: number;
  kind: "index" | "holding";
};

const INDEX_ORDER = ["ES", "NQ", "YM", "RTY", "VIX", "TNX"] as const;

const INDEX_NAMES: Record<string, string> = {
  ES: "S&P 500 futures",
  NQ: "Nasdaq 100 futures",
  YM: "Dow futures",
  RTY: "Russell 2000 futures",
  VIX: "VIX",
  TNX: "10Y yield",
};

const HOLDING_ORDER = [
  "UNH",
  "COST",
  "ODFL",
  "TSLA",
  "LEN",
  "PG",
  "HSY",
  "SPCX",
] as const;

function parsePct(raw: string): number | null {
  const cleaned = raw.replace(/[*_`]/g, "").replace(/%/g, "").trim();
  if (!cleaned || cleaned === "—" || cleaned === "-" || cleaned.toLowerCase() === "n/a") {
    return null;
  }
  const n = Number(cleaned.replace(/^\+/, ""));
  return Number.isFinite(n) ? n : null;
}

function normalizeSymbol(raw: string): string {
  return raw
    .replace(/\*\*/g, "")
    .replace(/=F$/i, "")
    .replace(/^\^/, "")
    .trim()
    .toUpperCase();
}

/**
 * Pull the US premarket table (`| Symbol | Name | Premarket % |`) from a brief.
 */
export function extractPremarketTape(md: string): PremarketTapeRow[] {
  const section = /## US premarket\n([\s\S]*?)(?=\n## )/.exec(md);
  const body = section?.[1] ?? "";

  const rows: PremarketTapeRow[] = [];
  for (const line of body.split("\n")) {
    if (!line.trim().startsWith("|")) continue;
    const cells = line
      .split("|")
      .slice(1, -1)
      .map((c) => c.trim());
    if (cells.length < 3) continue;

    const symbol = normalizeSymbol(cells[0]);
    if (!/^[A-Z0-9]{1,6}$/.test(symbol) || symbol === "SYMBOL") continue;
    if (/^[-:]+$/.test(cells[1])) continue;

    const name =
      cells[1].replace(/\*\*/g, "").trim() ||
      INDEX_NAMES[symbol] ||
      symbol;
    const premarketPct = parsePct(cells[2]);
    if (premarketPct == null) continue;

    const kind: "index" | "holding" = (INDEX_ORDER as readonly string[]).includes(
      symbol,
    )
      ? "index"
      : "holding";

    rows.push({ symbol, name, premarketPct, kind });
  }

  rows.sort((a, b) => {
    if (a.kind !== b.kind) return a.kind === "index" ? -1 : 1;
    if (a.kind === "index") {
      const ia = (INDEX_ORDER as readonly string[]).indexOf(a.symbol);
      const ib = (INDEX_ORDER as readonly string[]).indexOf(b.symbol);
      if (ia === -1 && ib === -1) return a.symbol.localeCompare(b.symbol);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    }
    const ia = (HOLDING_ORDER as readonly string[]).indexOf(a.symbol);
    const ib = (HOLDING_ORDER as readonly string[]).indexOf(b.symbol);
    if (ia === -1 && ib === -1) return a.symbol.localeCompare(b.symbol);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });

  return rows;
}
