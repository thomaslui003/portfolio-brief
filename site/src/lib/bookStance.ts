import { slugify } from "./slugify";

export type BookStance = {
  verb: string;
  body: string;
  sectionId: string;
};

const VERBS = ["Watch", "Review", "Consider", "Hold policy"] as const;

/**
 * Pull the book-level portfolio recommendation for a site callout card.
 */
export function extractBookStance(md: string): BookStance | null {
  const section = /## Portfolio recommendation \(book-level\)\n([\s\S]*?)(?=\n## )/.exec(
    md,
  );
  if (!section) return null;

  let text = section[1].trim();
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

  const body = text
    .replace(/\*\*/g, "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!body) return null;

  return {
    verb,
    body: body.slice(0, 520),
    sectionId: slugify("Portfolio recommendation (book-level)"),
  };
}
