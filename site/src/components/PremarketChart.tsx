import type { PremarketTapeRow } from "@/lib/premarketTape";

type Props = {
  rows: PremarketTapeRow[];
  asOf?: string;
};

/** Horizontal bar chart for US premarket futures + holdings moves. */
export function PremarketChart({ rows, asOf }: Props) {
  if (!rows.length) return null;

  const maxAbs = Math.max(0.5, ...rows.map((r) => Math.abs(r.premarketPct)));
  const indices = rows.filter((r) => r.kind === "index");
  const holdings = rows.filter((r) => r.kind === "holding");

  return (
    <section className="rotation" aria-labelledby="premarket-heading">
      <div className="rotation__head">
        <h2 id="premarket-heading">US premarket</h2>
        <p className="rotation__meta">
          Futures + holdings · vs prior settle/close
          {asOf ? ` · as of ${asOf}` : ""} · indicate into cash open
        </p>
      </div>

      {indices.length > 0 ? (
        <>
          <p className="rotation__group">Index futures</p>
          <ul className="rotation__list">{indices.map((row) => renderRow(row, maxAbs))}</ul>
        </>
      ) : null}

      {holdings.length > 0 ? (
        <>
          <p className={`rotation__group${indices.length ? " rotation__group--follow" : ""}`}>
            Holdings
          </p>
          <ul className="rotation__list">{holdings.map((row) => renderRow(row, maxAbs))}</ul>
        </>
      ) : null}
    </section>
  );
}

function renderRow(row: PremarketTapeRow, maxAbs: number) {
  const w = (Math.abs(row.premarketPct) / maxAbs) * 50;
  const up = row.premarketPct >= 0;

  return (
    <li key={row.symbol} className="rotation__row">
      <div className="rotation__label">
        <span className="rotation__etf">{row.symbol}</span>
        <span className="rotation__sector">{row.name}</span>
      </div>
      <div
        className="rotation__track"
        role="img"
        aria-label={`${row.symbol} ${row.name}: ${fmt(row.premarketPct)} percent premarket`}
      >
        <div className="rotation__zero" />
        <div
          className={`rotation__bar rotation__bar--day ${up ? "is-up" : "is-down"}`}
          style={
            up ? { left: "50%", width: `${w}%` } : { right: "50%", width: `${w}%` }
          }
        />
      </div>
      <div className="rotation__vals">
        <span className={up ? "is-up" : "is-down"}>{fmt(row.premarketPct)}%</span>
      </div>
    </li>
  );
}

function fmt(n: number): string {
  return `${n > 0 ? "+" : ""}${n.toFixed(2)}`;
}
