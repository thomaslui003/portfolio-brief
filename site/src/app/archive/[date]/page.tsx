import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BriefToc } from "@/components/BriefToc";
import { MarkdownBody } from "@/components/MarkdownBody";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getBriefBySlug, listBriefDates } from "@/lib/briefs";

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

  return (
    <>
      <SiteHeader active="archive" />
      <main className="shell">
        <section className="hero">
          <p className="hero__kicker">Archived note</p>
          <h1>{brief.title}</h1>
          <p className="hero__meta">
            {brief.date}  ·  Quant  ·  Flows  ·  Peers/KPIs  ·  Fundamental
          </p>
        </section>
        <BriefToc sections={brief.sections} />
        <article className="panel">
          <MarkdownBody content={brief.content} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
