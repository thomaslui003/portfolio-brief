import {
  RATING_LABELS,
  ratingToneClass,
  type PositionRatingRow,
} from "@/lib/ratingLabels";

type Props = {
  rows: PositionRatingRow[];
  compact?: boolean;
};

/** Dual-lens ratings table. Compact mode drops the five-row legend. */
export function PositionRatingsCard({ rows, compact = true }: Props) {
  return (
    <section className="ratings-card" aria-labelledby="ratings-card-heading">
      <div className="ratings-card__head">
        <h2 id="ratings-card-heading">Position ratings</h2>
        <p className="ratings-card__meta">
          Quant · Fundamental · Net — stances, not orders
        </p>
      </div>

      {compact ? (
        <div className="ratings-legend ratings-legend--row" aria-label="Rating scale">
          {RATING_LABELS.map((r) => (
            <span
              key={r.id}
              className={`rating-pill ${ratingToneClass(r.id)}`}
              title={r.meaning}
            >
              {r.id}
            </span>
          ))}
        </div>
      ) : (
        <div className="ratings-legend" aria-label="Allowed rating labels">
          {RATING_LABELS.map((r) => (
            <div key={r.id} className="ratings-legend__item">
              <span className={`rating-pill ${ratingToneClass(r.id)}`}>{r.id}</span>
              <span className="ratings-legend__meaning">{r.meaning}</span>
            </div>
          ))}
        </div>
      )}

      {rows.length > 0 ? (
        <div className="ratings-table-wrap">
          <table className="ratings-table">
            <thead>
              <tr>
                <th scope="col">Ticker</th>
                <th scope="col">Quant</th>
                <th scope="col">Fundamental</th>
                <th scope="col">Net</th>
                <th scope="col">Note</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.ticker}>
                  <td className="ratings-table__ticker">{row.ticker}</td>
                  <td>
                    <span className={`rating-pill ${ratingToneClass(row.quant)}`}>
                      {row.quant}
                    </span>
                  </td>
                  <td>
                    <span className={`rating-pill ${ratingToneClass(row.fundamental)}`}>
                      {row.fundamental}
                    </span>
                  </td>
                  <td>
                    <span className={`rating-pill rating-pill--net ${ratingToneClass(row.net)}`}>
                      {row.net}
                    </span>
                  </td>
                  <td className="ratings-table__note">{row.note || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="ratings-card__empty">
          Rating table appears after the next brief run that includes Position
          ratings (dual lens).
        </p>
      )}
    </section>
  );
}
