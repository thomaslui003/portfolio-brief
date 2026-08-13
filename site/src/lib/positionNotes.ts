import { extractSectionByNeedle, stripBold } from "./md";

export type PositionNote = {
  ticker: string | null;
  heading: string;
  body: string;
};

const TICKERS = ["UNH", "COST", "ODFL", "TSLA", "LEN", "PG", "HSY", "SPCX"] as const;

export function extractPositionNotes(md: string): PositionNote[] {
  const body = extractSectionByNeedle(md, "position notes");
  if (!body) return [];

  const notes: PositionNote[] = [];
  const grouped = /\*\*No material update:\*\*\s*([\s\S]+)$/i.exec(body);
  const main = grouped ? body.slice(0, grouped.index).trim() : body;

  const parts = main.split(/^###\s+/m).filter(Boolean);
  for (const part of parts) {
    const nl = part.indexOf("\n");
    const heading = stripBold((nl === -1 ? part : part.slice(0, nl)).trim());
    const rest = nl === -1 ? "" : part.slice(nl + 1).trim();
    if (!heading) continue;
    const hit = TICKERS.find((t) => heading.toUpperCase().startsWith(t));
    notes.push({
      ticker: hit ?? null,
      heading,
      body: stripBold(rest.replace(/\n+/g, " ")).slice(0, 600),
    });
  }

  if (grouped) {
    notes.push({
      ticker: null,
      heading: "No material update",
      body: stripBold(grouped[1]).replace(/\n+/g, " ").slice(0, 400),
    });
  }
  return notes;
}

export function noteForTicker(notes: PositionNote[], ticker: string): PositionNote | undefined {
  return notes.find((n) => n.ticker === ticker);
}
