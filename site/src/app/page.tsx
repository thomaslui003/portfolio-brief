import type { Metadata } from "next";
import { BookStanceCard } from "@/components/BookStanceCard";
import { BriefToc } from "@/components/BriefToc";
import { MarkdownBody } from "@/components/MarkdownBody";
import { PositionRatingsCard } from "@/components/PositionRatingsCard";
import { PremarketChart } from "@/components/PremarketChart";
import { SectorRotationChart } from "@/components/SectorRotationChart";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getLatestBrief } from "@/lib/briefs";
import { slugify } from "@/lib/slugify";

export const metadata: Metadata = {
  title: "Latest",
};

export default function HomePage() {
  const brief = getLatestBrief();
  const ratingsId = slugify("Position ratings (dual lens)");

  return (
    <>
      <SiteHeader active="latest" />
      <main className="shell">
        <section className="hero">
          <p className="hero__kicker">Daily dual-analyst note</p>
          <h1>{brief?.title ?? "Portfolio brief"}</h1>
          <p className="hero__meta">
            {brief
              ? `${brief.date}  ·  Premarket  ·  Quant  ·  Ratings  ·  Flows  ·  Book stance`
              : "No brief published yet"}
          </p>
        </section>
        {brief ? <BriefToc sections={brief.sections} /> : null}
        {brief?.bookStance ? <BookStanceCard stance={brief.bookStance} /> : null}
        {brief ? (
          <PositionRatingsCard
            rows={brief.positionRatings}
            sectionId={
              brief.sections.some((s) => s.id === ratingsId) ? ratingsId : undefined
            }
          />
        ) : null}
        {brief && brief.premarketTape.length > 0 ? (
          <PremarketChart rows={brief.premarketTape} asOf={brief.date} />
        ) : null}
        {brief && brief.sectorTape.length > 0 ? (
          <SectorRotationChart rows={brief.sectorTape} asOf={brief.date} />
        ) : null}
        <article className="panel">
          {brief ? (
            <MarkdownBody content={brief.content} />
          ) : (
            <p className="empty">
              Run the weekday automation (or a manual AGENTS.md pass) to publish
              the first report under <code>reports/</code>.
            </p>
          )}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
