import { extractSectionByNeedle, stripBold } from "./md";

export type Suggestion = {
  rank: number;
  verb: string;
  title: string;
  body: string;
  confidence: string | null;
  falsifier: string | null;
};

/**
 * Parse numbered ranked suggestions.
 * Typical line: `1. **[Watch]** **PPI ...** rest. Confidence: **High**. Falsifier: ...`
 */
export function extractSuggestions(md: string): Suggestion[] {
  const body = extractSectionByNeedle(md, "ranked suggestion");
  if (!body) return [];

  const chunks = body.split(/(?=^\d+\.\s+)/m).filter((c) => /^\d+\.\s+/.test(c.trim()));
  const out: Suggestion[] = [];

  for (const chunk of chunks) {
    const rank = Number(/^(\d+)\./.exec(chunk.trim())?.[1] ?? out.length + 1);
    let text = chunk.trim().replace(/^\d+\.\s+/, "");

    let verb = "Hold policy";
    const bracket = /\*\*\[([^\]]+)\]\*\*/.exec(text) ?? /^\[([^\]]+)\]/.exec(text);
    if (bracket) {
      verb = bracket[1].trim();
      text = text.replace(bracket[0], "").trim();
    }

    let confidence: string | null = null;
    const conf = /Confidence:\s*\*?\*?([^*\n.]+)\*?\*?/i.exec(text);
    if (conf) {
      confidence = conf[1].trim();
      text = text.replace(conf[0], "").trim();
    }

    let falsifier: string | null = null;
    const fal = /Falsifier:\s*([\s\S]+)$/i.exec(text);
    if (fal) {
      falsifier = stripBold(fal[1]).replace(/\s+/g, " ").trim();
      text = text.slice(0, fal.index).trim();
    }

    text = stripBold(text)
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\s+/g, " ")
      .replace(/\s+\./g, ".")
      .replace(/\.{2,}/g, ".")
      .trim();
    // Drop a leading "Evidence:" dump for the card title — keep first clause as title.
    const evidenceIdx = text.search(/\bEvidence:/i);
    let title = text;
    let rest = "";
    if (evidenceIdx >= 0) {
      title = text.slice(0, evidenceIdx).trim().replace(/[.;]\s*$/, "");
      rest = text.slice(evidenceIdx).replace(/^Evidence:\s*/i, "").trim();
    } else {
      const cut = text.split(/(?<=[.!?])\s+/)[0] ?? text;
      title = cut.slice(0, 140);
      rest = text.slice(cut.length).trim();
    }

    out.push({
      rank,
      verb,
      title: title.replace(/[.;]\s*$/, "").slice(0, 180),
      body: rest.slice(0, 360),
      confidence,
      falsifier: falsifier ? falsifier.slice(0, 280) : null,
    });
  }

  return out.slice(0, 3);
}
