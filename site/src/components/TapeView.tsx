import type { PremarketTapeRow } from "@/lib/premarketTape";
import type { SectorTapeRow } from "@/lib/sectorTape";
import { stripMarkdownTables } from "@/lib/md";
import { MarkdownBody } from "./MarkdownBody";
import { PremarketChart } from "./PremarketChart";
import { SectorRotationChart } from "./SectorRotationChart";

type Props = {
  asOf: string;
  premarketTape: PremarketTapeRow[];
  sectorTape: SectorTapeRow[];
  regime: string;
  premarketNarrative: string;
  flowsNarrative: string;
  bookMap: string | null;
  kpis: string[];
};

export function TapeView({
  asOf,
  premarketTape,
  sectorTape,
  regime,
  premarketNarrative,
  flowsNarrative,
  bookMap,
  kpis,
}: Props) {
  return (
    <div className="desk-grid">
      <div className="desk-grid__main">
        {premarketTape.length > 0 ? (
          <PremarketChart rows={premarketTape} asOf={asOf} />
        ) : (
          <section className="panel">
            <p className="empty">No premarket table in this brief (holiday or weekend).</p>
          </section>
        )}
        {sectorTape.length > 0 ? (
          <SectorRotationChart rows={sectorTape} asOf={asOf} />
        ) : null}

        {regime ? (
          <section className="panel" aria-labelledby="regime-heading">
            <header className="panel__head">
              <h2 id="regime-heading">Market regime</h2>
              <p className="panel__meta">US + Asia/HK overnight</p>
            </header>
            <MarkdownBody content={regime} hideH1 />
          </section>
        ) : null}
      </div>

      <aside className="desk-grid__rail">
        {bookMap ? (
          <section className="panel panel--rail" aria-labelledby="map-heading">
            <header className="panel__head">
              <h2 id="map-heading">Book map</h2>
              <p className="panel__meta">Does rotation favor or fight this book?</p>
            </header>
            <p className="rail-copy">{bookMap}</p>
          </section>
        ) : null}

        {kpis.length ? (
          <section className="panel panel--rail" aria-labelledby="kpi-heading">
            <header className="panel__head">
              <h2 id="kpi-heading">Leading indicators</h2>
            </header>
            <ul className="rail-list">
              {kpis.map((k, i) => (
                <li key={i}>{k}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {premarketNarrative ? (
          <section className="panel panel--rail" aria-labelledby="pm-note">
            <header className="panel__head">
              <h2 id="pm-note">Premarket note</h2>
            </header>
            <MarkdownBody content={stripMarkdownTables(premarketNarrative)} hideH1 />
          </section>
        ) : null}

        {flowsNarrative ? (
          <section className="panel panel--rail" aria-labelledby="flow-note">
            <header className="panel__head">
              <h2 id="flow-note">Flow narrative</h2>
              <p className="panel__meta">Table is charted at left</p>
            </header>
            <MarkdownBody content={stripMarkdownTables(flowsNarrative)} hideH1 />
          </section>
        ) : null}
      </aside>
    </div>
  );
}
