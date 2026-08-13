/** Shared markdown helpers for brief parsing. */

export function extractSection(md: string, heading: string): string {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`^##\\s+${escaped}\\s*$\\n([\\s\\S]*?)(?=\\n##\\s+|$)`, "im");
  return re.exec(md)?.[1]?.trim() ?? "";
}

/** First H2 whose label contains `needle` (case-insensitive). */
export function extractSectionByNeedle(md: string, needle: string): string {
  const n = needle.toLowerCase();
  const matches = [...md.matchAll(/^##\s+(.+)$/gm)];
  for (let i = 0; i < matches.length; i++) {
    const label = matches[i][1].trim();
    if (!label.toLowerCase().includes(n)) continue;
    const start = (matches[i].index ?? 0) + matches[i][0].length;
    const end = i + 1 < matches.length ? (matches[i + 1].index ?? md.length) : md.length;
    return md.slice(start, end).trim();
  }
  return "";
}

export function stripMarkdownTables(md: string): string {
  return md
    .split("\n")
    .filter((line) => !/^\s*\|/.test(line))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function stripBold(s: string): string {
  return s.replace(/\*\*/g, "").trim();
}

export function parseSignedPct(raw: string): number | null {
  const cleaned = raw
    .replace(/[*_`]/g, "")
    .replace(/%/g, "")
    .replace(/[−–—]/g, "-")
    .replace(/,/g, "")
    .trim();
  if (!cleaned || cleaned === "-" || cleaned.toLowerCase() === "n/a") return null;
  const n = Number(cleaned.replace(/^\+/, ""));
  return Number.isFinite(n) ? n : null;
}

export function parseMoney(raw: string): number | null {
  const cleaned = raw.replace(/[*_`$,]/g, "").replace(/[−–—]/g, "-").trim();
  if (!cleaned) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

export function bullets(md: string): string[] {
  return md
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("- ") || l.startsWith("* "))
    .map((l) => stripBold(l.replace(/^[-*]\s+/, "")));
}
