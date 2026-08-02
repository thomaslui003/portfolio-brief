import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookStanceCard } from "@/components/BookStanceCard";
import { BriefToc } from "@/components/BriefToc";
import { MarkdownBody } from "@/components/MarkdownBody";
import { PositionRatingsCard } from "@/components/PositionRatingsCard";
import { SectorRotationChart } from "@/components/SectorRotationChart";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getBriefBySlug, listBriefDates } from "@/lib/briefs";
import { slugify } from "@/lib/slugify";

type Props = { params: Promise<{ date: string }> };

export function generateStaticParams() {
  return listBriefDates().map((date) => ({ date }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  const brief = getBriefBySlug(date);
  return { title: brief?.title ?? date };
}

export default async function ArchiveDatePage({ params }: Props) {
  const { date } = await params;
  const brief = getBriefBySlug(date);
  if (!brief) notFound();

  const ratingsId = slugify("Position ratings (dual lens)");

  return (
    <>
      <SiteHeader active="archive" />
      <main className="shell">
        <section className="hero">
          <p className="hero__kicker">Archived note</p>
          <h1>{brief.title}</h1>
          <p className="hero__meta">
            {brief.date}  ·  Quant  ·  Ratings  ·  Flows  ·  Book stance
          </p>
        </section>
        <BriefToc sections={brief.sections} />
        {brief.bookStance ? <BookStanceCard stance={brief.bookStance} /> : null}
        <PositionRatingsCard
          rows={brief.positionRatings}
          sectionId={
            brief.sections.some((s) => s.id === ratingsId) ? ratingsId : undefined
          }
        />
        {brief.sectorTape.length > 0 ? (
          <SectorRotationChart rows={brief.sectorTape} asOf={brief.date} />
        ) : null}
        <article className="panel">
          <MarkdownBody content={brief.content} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
