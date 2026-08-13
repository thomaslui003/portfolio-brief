import type { PositionNote } from "@/lib/positionNotes";
import type { Holding } from "@/lib/holdings";
import { fmtPct, signedClass } from "@/lib/format";
import { ratingToneClass, type PositionRatingRow } from "@/lib/ratingLabels";

type Props = {
  positions: Holding[];
  ratings: PositionRatingRow[];
  notes: PositionNote[];
};

export function NamesView({ positions, ratings, notes }: Props) {
  const ratingBy = new Map(ratings.map((r) => [r.ticker, r]));
  const noteBy = new Map(
    notes.filter((n) => n.ticker).map((n) => [n.ticker as string, n]),
  );
  const groupedQuiet = notes.find((n) => /no material/i.test(n.heading) || /no material/i.test(n.body));

  const tickers = positions.length
    ? positions.map((p) => p.ticker)
    : ratings.map((r) => r.ticker);

  return (
    <div className="desk-stack">
      <p className="view-lede">
        One card per name: Yahoo-mark weight and P&amp;L vs frozen cost, dual-lens
        rating from today&apos;s brief, and the standing thesis / kill line from
        holdings.md.
      </p>
      <div className="names-grid">
        {tickers.map((ticker) => {
          const pos = positions.find((p) => p.ticker === ticker);
          const rating = ratingBy.get(ticker);
          const note = noteBy.get(ticker);
          return (
            <article key={ticker} className="name-card">
              <header className="name-card__head">
                <div>
                  <h2>{ticker}</h2>
                  <p className="name-card__name">{pos?.name ?? ticker}</p>
                </div>
                {rating ? (
                  <span className={`rating-pill rating-pill--net ${ratingToneClass(rating.net)}`}>
                    {rating.net}
                  </span>
                ) : null}
              </header>
              <dl className="name-card__stats">
                <div>
                  <dt>Weight</dt>
                  <dd>{fmtPct(pos?.weight ?? null, 1, { signed: false })}</dd>
                </div>
                <div>
                  <dt>P&amp;L vs cost</dt>
                  <dd className={signedClass(pos?.pnlPct ?? null)}>
                    {fmtPct(pos?.pnlPct ?? null)}
                  </dd>
                </div>
                <div>
                  <dt>Quant</dt>
                  <dd>{rating?.quant ?? "—"}</dd>
                </div>
                <div>
                  <dt>Fundamental</dt>
                  <dd>{rating?.fundamental ?? "—"}</dd>
                </div>
              </dl>
              {rating?.note ? <p className="name-card__today">{rating.note}</p> : null}
              {pos?.thesis ? (
                <p className="name-card__thesis">
                  <span>Thesis</span> {pos.thesis}
                </p>
              ) : null}
              {pos?.kill ? (
                <p className="name-card__kill">
                  <span>Kill if</span> {pos.kill}
                </p>
              ) : null}
              {note ? <p className="name-card__note">{note.body}</p> : null}
            </article>
          );
        })}
      </div>
      {groupedQuiet && !groupedQuiet.ticker ? (
        <p className="quiet-line">{groupedQuiet.body || groupedQuiet.heading}</p>
      ) : null}
    </div>
  );
}
