export type SectorTapeRow = {
  etf: string;
  sector: string;
  dayPct: number;
  fivePct: number | null;
};

const SECTOR_FALLBACK: Record<string, string> = {
  XLK: "Technology",
  XLF: "Financials",
  XLE: "Energy",
  XLV: "Health Care",
  XLI: "Industrials",
  XLY: "Consumer Discretionary",
  XLP: "Consumer Staples",
  XLU: "Utilities",
  XLRE: "Real Estate",
  XLB: "Materials",
  XLC: "Communication Services",
};

function parsePct(raw: string): number | null {
  const cleaned = raw.replace(/[*_`]/g, "").replace(/%/g, "").trim();
  if (!cleaned || cleaned === "—" || cleaned === "-" || cleaned.toLowerCase() === "n/a") {
    return null;
  }
  const n = Number(cleaned.replace(/^\+/, ""));
  return Number.isFinite(n) ? n : null;
}

/**
 * Pull the Money-flow SPDR tape table (`| ETF | Sector | 1D % | ~5D % |`) from a brief.
 */
export function extractSectorTape(md: string): SectorTapeRow[] {
  const section = /## Money flow \/ sector rotation\n([\s\S]*?)(?=\n## )/.exec(md);
  const body = section?.[1] ?? md;

  const rows: SectorTapeRow[] = [];
  for (const line of body.split("\n")) {
    if (!line.trim().startsWith("|")) continue;
    const cells = line
      .split("|")
      .slice(1, -1)
      .map((c) => c.trim());
    if (cells.length < 3) continue;

    const etf = cells[0].replace(/\*\*/g, "").trim().toUpperCase();
    if (!/^[A-Z]{2,5}$/.test(etf) || etf === "ETF") continue;
    if (/^[-:]+$/.test(cells[1])) continue; // separator row

    const sector =
      cells[1].replace(/\*\*/g, "").trim() || SECTOR_FALLBACK[etf] || etf;
    const dayPct = parsePct(cells[2]);
    if (dayPct == null) continue;
    const fivePct = cells[3] != null ? parsePct(cells[3]) : null;

    rows.push({ etf, sector, dayPct, fivePct });
  }

  // Prefer known GICS order when present
  const order = Object.keys(SECTOR_FALLBACK);
  rows.sort((a, b) => {
    const ia = order.indexOf(a.etf);
    const ib = order.indexOf(b.etf);
    if (ia === -1 && ib === -1) return a.etf.localeCompare(b.etf);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });

  return rows;
}
