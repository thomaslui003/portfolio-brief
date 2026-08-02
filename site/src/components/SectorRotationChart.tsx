import type { SectorTapeRow } from "@/lib/sectorTape";

type Props = {
  rows: SectorTapeRow[];
  asOf?: string;
};

/** Horizontal bar chart for sector SPDR 1D (and optional ~5D) moves. */
export function SectorRotationChart({ rows, asOf }: Props) {
  if (!rows.length) return null;

  const maxAbs = Math.max(
    0.5,
    ...rows.flatMap((r) =>
      [Math.abs(r.dayPct), r.fivePct != null ? Math.abs(r.fivePct) : 0],
    ),
  );

  const sorted = [...rows].sort((a, b) => b.dayPct - a.dayPct);
  const hasFive = sorted.some((r) => r.fivePct != null);

  return (
    <section className="rotation" aria-labelledby="rotation-heading">
      <div className="rotation__head">
        <h2 id="rotation-heading">Sector rotation</h2>
        <p className="rotation__meta">
          SPDR Select Sector · 1D{hasFive ? " vs ~5D" : ""}
          {asOf ? ` · as of ${asOf}` : ""} · price leadership (not fund flows)
        </p>
      </div>

      <div className="rotation__legend" aria-hidden="true">
        <span className="rotation__swatch rotation__swatch--day" /> 1D
        {hasFive ? (
          <>
            <span className="rotation__swatch rotation__swatch--five" /> ~5D
          </>
        ) : null}
      </div>

      <ul className="rotation__list">
        {sorted.map((row) => {
          const dayW = (Math.abs(row.dayPct) / maxAbs) * 50;
          const fiveW =
            row.fivePct != null ? (Math.abs(row.fivePct) / maxAbs) * 50 : 0;
          const dayPos = row.dayPct >= 0;
          const fivePos = (row.fivePct ?? 0) >= 0;

          return (
            <li key={row.etf} className="rotation__row">
              <div className="rotation__label">
                <span className="rotation__etf">{row.etf}</span>
                <span className="rotation__sector">{row.sector}</span>
              </div>
              <div className="rotation__track" role="img" aria-label={`${row.etf} ${row.sector}: ${fmt(row.dayPct)} percent 1 day`}>
                <div className="rotation__zero" />
                <div
                  className={`rotation__bar rotation__bar--day ${dayPos ? "is-up" : "is-down"}`}
                  style={
                    dayPos
                      ? { left: "50%", width: `${dayW}%` }
                      : { right: "50%", width: `${dayW}%` }
                  }
                />
                {row.fivePct != null ? (
                  <div
                    className={`rotation__bar rotation__bar--five ${fivePos ? "is-up" : "is-down"}`}
                    style={
                      fivePos
                        ? { left: "50%", width: `${fiveW}%` }
                        : { right: "50%", width: `${fiveW}%` }
                    }
                  />
                ) : null}
              </div>
              <div className="rotation__vals">
                <span className={dayPos ? "is-up" : "is-down"}>{fmt(row.dayPct)}%</span>
                {row.fivePct != null ? (
                  <span className={`rotation__fiveval ${fivePos ? "is-up" : "is-down"}`}>
                    {fmt(row.fivePct)}%
                  </span>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function fmt(n: number): string {
  return `${n > 0 ? "+" : ""}${n.toFixed(2)}`;
}
