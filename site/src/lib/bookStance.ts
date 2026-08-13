import { extractSectionByNeedle, stripBold } from "./md";
import { slugify } from "./slugify";

export type BookStance = {
  verb: string;
  /** Short so-what line for the decision card. */
  body: string;
  falsifier: string | null;
  sectionId: string;
};

const VERBS = ["Watch", "Review", "Consider", "Hold policy"] as const;

/**
 * Pull the book-level portfolio recommendation for a site callout card.
 * Prefers the opening stance sentence — not the full evidence dump.
 */
export function extractBookStance(md: string): BookStance | null {
  const section = extractSectionByNeedle(md, "portfolio recommendation");
  if (!section) return null;

  let text = section.trim();
  if (!text) return null;

  let verb = "Hold policy";
  const bracket = /\*\*\[([^\]]+)\]\*\*/.exec(text) ?? /\[([^\]]+)\]/.exec(text);
  if (bracket) {
    verb = bracket[1].trim();
    text = text.replace(bracket[0], "").trim();
  } else {
    for (const v of VERBS) {
      if (text.toLowerCase().startsWith(v.toLowerCase())) {
        verb = v;
        break;
      }
    }
  }

  text = stripBold(text).replace(/\n+/g, " ").replace(/\s+/g, " ").trim();

  let falsifier: string | null = null;
  const fal = /Falsifiers?:\s*([^.]+\.)/i.exec(text);
  if (fal) {
    falsifier = fal[1].trim();
  } else {
    const fal2 = /What would change[^:]*:\s*([^.]+\.)/i.exec(text);
    if (fal2) falsifier = fal2[1].trim();
  }

  // Cut the evidence dump — keep the stance clause before "Evidence:" / "Why".
  const cutAt = text.search(/\b(Evidence:|Why \(|Why —|Falsifiers?:)/i);
  let body = (cutAt > 40 ? text.slice(0, cutAt) : text).trim();
  // First sentence if still long.
  if (body.length > 280) {
    const sentence = body.match(/^[\s\S]{40,280}?[.!]/);
    if (sentence) body = sentence[0];
  }
  body = body.replace(/[—–]\s*$/, "").trim();
  if (body) body = body.charAt(0).toUpperCase() + body.slice(1);

  if (!body) return null;

  return {
    verb,
    body: body.slice(0, 360),
    falsifier: falsifier ? falsifier.slice(0, 280) : null,
    sectionId: slugify("Portfolio recommendation (book-level)"),
  };
}
