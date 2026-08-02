import type { BookStance } from "@/lib/bookStance";

/** Compact callout for the book-level portfolio recommendation. */
export function BookStanceCard({ stance }: { stance: BookStance }) {
  const verbClass = verbTone(stance.verb);

  return (
    <aside className="stance-card" aria-labelledby="stance-card-heading">
      <div className="stance-card__top">
        <p className="stance-card__kicker" id="stance-card-heading">
          Book-level stance
        </p>
        <span className={`stance-card__verb ${verbClass}`}>{stance.verb}</span>
      </div>
      <p className="stance-card__body">{stance.body}</p>
      <a className="stance-card__link" href={`#${stance.sectionId}`}>
        Full recommendation ↓
      </a>
    </aside>
  );
}

function verbTone(verb: string): string {
  const v = verb.toLowerCase();
  if (v.includes("review")) return "is-review";
  if (v.includes("consider")) return "is-consider";
  if (v.includes("watch")) return "is-watch";
  return "is-hold";
}
