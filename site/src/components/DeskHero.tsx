import type { Brief } from "@/lib/briefs";
import type { HoldingsSnapshot } from "@/lib/holdings";
import { fmtPct } from "@/lib/format";
import { policyVerbClass } from "@/lib/format";

type Props = {
  kicker: string;
  brief: Brief;
  holdings: HoldingsSnapshot;
};

export function DeskHero({ kicker, brief, holdings }: Props) {
  const watch = brief.positionRatings.filter((r) =>
    /watch|review/i.test(r.net),
  ).length;
  const down = holdings.positions.filter((p) => (p.pnlPct ?? 0) < 0).length;
  const top = holdings.positions.slice(0, 3);
  const topW = top.reduce((s, p) => s + (p.weight ?? 0), 0);

  return (
    <section className="hero">
      <p className="hero__kicker">{kicker}</p>
      <h1>{brief.title}</h1>
      <p className="hero__meta">
        {brief.date}
        {holdings.asOf ? `  ·  Holdings as-of ${holdings.asOf}` : ""}
        {"  ·  Switch views to change the question you are answering"}
      </p>
      <ul className="hero-chips">
        {brief.bookStance ? (
          <li>
            <span className="hero-chips__label">Stance</span>
            <span className={`stance-card__verb ${policyVerbClass(brief.bookStance.verb)}`}>
              {brief.bookStance.verb}
            </span>
          </li>
        ) : null}
        <li>
          <span className="hero-chips__label">Watch / Review</span>
          <strong>{watch}</strong>
          <span className="hero-chips__hint">of {brief.positionRatings.length || holdings.positions.length} names</span>
        </li>
        <li>
          <span className="hero-chips__label">Underwater</span>
          <strong>{down}</strong>
          <span className="hero-chips__hint">vs cost basis</span>
        </li>
        {topW > 0 ? (
          <li>
            <span className="hero-chips__label">Top 3</span>
            <strong>{fmtPct(topW, 1, { signed: false })}</strong>
            <span className="hero-chips__hint">{top.map((p) => p.ticker).join(" · ")}</span>
          </li>
        ) : null}
      </ul>
    </section>
  );
}
