import { bullets, extractSectionByNeedle } from "./md";

export type AttentionItem = {
  text: string;
  quiet: boolean;
};

export function extractAttention(md: string): AttentionItem[] {
  const body = extractSectionByNeedle(md, "what needs attention");
  if (!body) return [];
  return bullets(body).map((text) => ({
    text,
    quiet: /^quiet/i.test(text) || /no material/i.test(text),
  }));
}

export function extractNonActions(md: string): string[] {
  return bullets(extractSectionByNeedle(md, "explicit non-action"));
}

export function extractDelta(md: string): string {
  return extractSectionByNeedle(md, "delta vs yesterday")
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractQuestions(md: string): string[] {
  const body = extractSectionByNeedle(md, "open question");
  const numbered = [...body.matchAll(/^\d+\.\s+(.+)$/gm)].map((m) =>
    m[1].replace(/\*\*/g, "").trim(),
  );
  if (numbered.length) return numbered;
  return bullets(body);
}

export function extractKpis(md: string): string[] {
  return bullets(extractSectionByNeedle(md, "leading indicator"));
}

export function extractHealth(md: string): string[] {
  return bullets(extractSectionByNeedle(md, "portfolio health"));
}

export function extractBookMap(md: string): string | null {
  const body = extractSectionByNeedle(md, "money flow");
  const line = /book map[:\s*]*([^\n]+)/i.exec(body);
  return line ? line[1].replace(/\*\*/g, "").trim() : null;
}

export function extractRegime(md: string): string {
  return extractSectionByNeedle(md, "market regime");
}

export function extractPremarketNarrative(md: string): string {
  return extractSectionByNeedle(md, "us premarket");
}

export function extractFlowsNarrative(md: string): string {
  return extractSectionByNeedle(md, "money flow");
}
