export const RATING_LABELS = [
  {
    id: "Trim",
    meaning: "Bias to reduce size / take risk off",
  },
  {
    id: "Hold",
    meaning: "Keep current size; no change implied",
  },
  {
    id: "Add",
    meaning: "Bias to add or average-down (gate required)",
  },
  {
    id: "Watch",
    meaning: "No size change; monitor catalyst / event",
  },
  {
    id: "Review",
    meaning: "Re-check thesis and/or size soon",
  },
] as const;

export type RatingId = (typeof RATING_LABELS)[number]["id"];

export type PositionRatingRow = {
  ticker: string;
  quant: string;
  fundamental: string;
  net: string;
  note: string;
};

const ALLOWED = new Set(RATING_LABELS.map((r) => r.id.toLowerCase()));

export function normalizeRating(raw: string): string {
  const cleaned = raw.replace(/\*\*/g, "").trim();
  if (!cleaned) return "—";
  const hit = RATING_LABELS.find((r) => r.id.toLowerCase() === cleaned.toLowerCase());
  return hit?.id ?? cleaned;
}

export function ratingToneClass(rating: string): string {
  const r = rating.toLowerCase();
  if (r === "trim") return "is-trim";
  if (r === "add") return "is-add";
  if (r === "watch") return "is-watch";
  if (r === "review") return "is-review";
  if (r === "hold") return "is-hold";
  return "is-unknown";
}

export function isKnownRating(rating: string): boolean {
  return ALLOWED.has(rating.toLowerCase());
}

/**
 * Pull `| Ticker | Quant | Fundamental | Net | Note |` from Position ratings section.
 */
export function extractPositionRatings(md: string): PositionRatingRow[] {
  const section = /## Position ratings \(dual lens\)\n([\s\S]*?)(?=\n## )/.exec(md);
  const body = section?.[1] ?? "";
  if (!body) return [];

  const rows: PositionRatingRow[] = [];
  for (const line of body.split("\n")) {
    if (!line.trim().startsWith("|")) continue;
    const cells = line
      .split("|")
      .slice(1, -1)
      .map((c) => c.trim());
    if (cells.length < 4) continue;

    const ticker = cells[0].replace(/\*\*/g, "").trim().toUpperCase();
    if (!/^[A-Z.]{1,6}$/.test(ticker) || ticker === "TICKER") continue;
    if (/^[-:]+$/.test(cells[1])) continue;

    rows.push({
      ticker,
      quant: normalizeRating(cells[1]),
      fundamental: normalizeRating(cells[2]),
      net: normalizeRating(cells[3]),
      note: (cells[4] ?? "").replace(/\*\*/g, "").trim(),
    });
  }
  return rows;
}
