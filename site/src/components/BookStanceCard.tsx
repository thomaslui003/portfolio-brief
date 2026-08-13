import type { BookStance } from "@/lib/bookStance";
import { policyVerbClass } from "@/lib/format";

/** Compact callout for the book-level portfolio recommendation. */
export function BookStanceCard({ stance }: { stance: BookStance }) {
  const verbClass = policyVerbClass(stance.verb);

  return (
    <aside className="stance-card" aria-labelledby="stance-card-heading">
      <div className="stance-card__top">
        <p className="stance-card__kicker" id="stance-card-heading">
          Book-level stance
        </p>
        <span className={`stance-card__verb ${verbClass}`}>{stance.verb}</span>
      </div>
      <p className="stance-card__body">{stance.body}</p>
      {stance.falsifier ? (
        <p className="stance-card__falsifier">
          <span>Falsifier</span> {stance.falsifier}
        </p>
      ) : null}
    </aside>
  );
}
