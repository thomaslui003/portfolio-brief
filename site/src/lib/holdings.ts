import { parseMoney, parseSignedPct, stripBold } from "./md";

export type Holding = {
  ticker: string;
  name: string;
  qty: number | null;
  price: number | null;
  cost: number | null;
  mv: number | null;
  weight: number | null;
  pnlPct: number | null;
  tags: string[];
  thesis: string;
  kill: string;
};

export type HoldingsSnapshot = {
  /** Yahoo marks date (Marks as-of, else legacy As-of). */
  asOf: string | null;
  marksAsOf: string | null;
  qtyCostAsOf: string | null;
  totalMv: number | null;
  currency: string;
  positions: Holding[];
};

export type Cluster = {
  id: string;
  name: string;
  tickers: string[];
  weight: number;
  note: string;
};

const CLUSTERS: { id: string; name: string; tickers: string[]; note: string }[] = [
  {
    id: "core",
    name: "Core compounders",
    tickers: ["UNH", "COST", "ODFL"],
    note: "Largest weights — concentration risk",
  },
  {
    id: "cyclical",
    name: "Cyclical",
    tickers: ["ODFL", "LEN"],
    note: "Freight + housing / rates",
  },
  {
    id: "staples",
    name: "Staples ballast",
    tickers: ["COST", "PG", "HSY"],
    note: "Defensive sleeve",
  },
  {
    id: "highbeta",
    name: "High-beta / theme",
    tickers: ["TSLA", "SPCX"],
    note: "Narrative and multiple risk",
  },
];

function cell(raw: string): string {
  return stripBold(raw).trim();
}

export function parseHoldingsMarkdown(md: string): HoldingsSnapshot {
  const marksAsOf =
    /\*\*Marks as-of:\*\*\s*([0-9]{4}-[0-9]{2}-[0-9]{2})/.exec(md)?.[1] ??
    /\*\*As-of:\*\*\s*([0-9]{4}-[0-9]{2}-[0-9]{2})/.exec(md)?.[1] ??
    null;
  const qtyCostAsOf =
    /\*\*Qty\/cost as-of:\*\*\s*([0-9]{4}-[0-9]{2}-[0-9]{2})/.exec(md)?.[1] ??
    null;
  const asOf = marksAsOf;
  const totalRaw =
    /Total MV[^\d]*([\d,]+(?:\.\d+)?)/i.exec(md)?.[1] ??
    null;
  const totalMv = totalRaw ? parseMoney(totalRaw) : null;

  const positions: Holding[] = [];
  for (const line of md.split("\n")) {
    if (!line.trim().startsWith("|")) continue;
    const cells = line
      .split("|")
      .slice(1, -1)
      .map((c) => c.trim());
    if (cells.length < 10) continue;
    const ticker = cell(cells[0]).toUpperCase();
    if (!/^[A-Z.]{1,6}$/.test(ticker) || ticker === "TICKER") continue;
    if (/^[-:]+$/.test(cells[1])) continue;

    positions.push({
      ticker,
      name: cell(cells[1]),
      qty: parseMoney(cells[2]),
      price: parseMoney(cells[3]),
      cost: parseMoney(cells[4]),
      mv: parseMoney(cells[5]),
      weight: parseSignedPct(cells[6]),
      pnlPct: parseSignedPct(cells[7]),
      tags: cell(cells[8])
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      thesis: cell(cells[9] ?? ""),
      kill: cell(cells[10] ?? ""),
    });
  }

  return {
    asOf,
    marksAsOf,
    qtyCostAsOf,
    totalMv,
    currency: "USD",
    positions,
  };
}

export function clustersFor(snapshot: HoldingsSnapshot): Cluster[] {
  const byTicker = new Map(snapshot.positions.map((p) => [p.ticker, p]));
  return CLUSTERS.map((c) => {
    const weight = c.tickers.reduce((sum, t) => sum + (byTicker.get(t)?.weight ?? 0), 0);
    return { ...c, weight };
  });
}

export function underwater(snapshot: HoldingsSnapshot): Holding[] {
  return snapshot.positions.filter((p) => p.pnlPct != null && p.pnlPct < 0);
}
