import { clustersFor, underwater, type HoldingsSnapshot } from "@/lib/holdings";
import { fmtMoney, fmtPct, signedClass } from "@/lib/format";
import type { PositionRatingRow } from "@/lib/ratingLabels";
import { PositionRatingsCard } from "./PositionRatingsCard";

type Props = {
  holdings: HoldingsSnapshot;
  ratings: PositionRatingRow[];
  health: string[];
};

export function BookView({ holdings, ratings, health }: Props) {
  const clusters = clustersFor(holdings);
  const down = underwater(holdings);
  const totalW = holdings.positions.reduce((s, p) => s + (p.weight ?? 0), 0);

  return (
    <div className="desk-stack">
      <section className="panel" aria-labelledby="weights-heading">
        <header className="panel__head">
          <h2 id="weights-heading">Book weights</h2>
          <p className="panel__meta">
            Snapshot {holdings.asOf ?? "—"}
            {holdings.totalMv != null ? ` · MV ${fmtMoney(holdings.totalMv)}` : ""}
            {" · "}update holdings.md after trades
          </p>
        </header>

        <div className="weight-bar" role="img" aria-label="Portfolio weights">
          {holdings.positions.map((p) => (
            <span
              key={p.ticker}
              className={`weight-bar__seg weight-bar__seg--${p.ticker.toLowerCase()}`}
              style={{ flexGrow: p.weight ?? 0, flexBasis: 0 }}
              title={`${p.ticker} ${fmtPct(p.weight)}`}
            >
              {(p.weight ?? 0) >= 8 ? p.ticker : ""}
            </span>
          ))}
        </div>
          {totalW ? (
          <p className="panel__meta">Sum of weights {fmtPct(totalW, 1, { signed: false })}</p>
        ) : null}

        <div className="holdings-table-wrap">
          <table className="holdings-table">
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Name</th>
                <th className="num">Weight</th>
                <th className="num">P&amp;L vs cost</th>
                <th className="num">MV</th>
              </tr>
            </thead>
            <tbody>
              {holdings.positions.map((p) => (
                <tr key={p.ticker}>
                  <td className="ratings-table__ticker">{p.ticker}</td>
                  <td>{p.name}</td>
                  <td className="num">{fmtPct(p.weight, 1, { signed: false })}</td>
                  <td className={`num ${signedClass(p.pnlPct)}`}>{fmtPct(p.pnlPct)}</td>
                  <td className="num">{fmtMoney(p.mv)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="cluster-grid">
        {clusters.map((c) => (
          <article key={c.id} className="cluster-card">
            <p className="cluster-card__kicker">{c.name}</p>
            <p className="cluster-card__w">{fmtPct(c.weight, 1, { signed: false })}</p>
            <p className="cluster-card__tickers">{c.tickers.join(" · ")}</p>
            <p className="cluster-card__note">{c.note}</p>
          </article>
        ))}
      </div>

      <section className="panel" aria-labelledby="uw-heading">
        <header className="panel__head">
          <h2 id="uw-heading">Underwater vs cost</h2>
          <p className="panel__meta">
            Cheap vs cost is not a buy signal — average-down needs the valuation gate
          </p>
        </header>
        {down.length ? (
          <ul className="uw-list">
            {down.map((p) => (
              <li key={p.ticker}>
                <strong>{p.ticker}</strong>
                <span className="is-down">{fmtPct(p.pnlPct)}</span>
                <span className="uw-list__meta">
                  {fmtMoney(p.price)} vs cost {fmtMoney(p.cost)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty">No names underwater vs cost in the snapshot.</p>
        )}
      </section>

      {health.length ? (
        <section className="panel" aria-labelledby="health-heading">
          <header className="panel__head">
            <h2 id="health-heading">Quant health (from brief)</h2>
            <p className="panel__meta">Concentration, rules, peer divergences</p>
          </header>
          <ul className="rail-list">
            {health.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <PositionRatingsCard rows={ratings} />
    </div>
  );
}
