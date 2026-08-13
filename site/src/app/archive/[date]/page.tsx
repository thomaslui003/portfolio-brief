import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BriefDesk } from "@/components/BriefDesk";
import { DeskHero } from "@/components/DeskHero";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getBriefBySlug, listBriefDates } from "@/lib/briefs";
import { getHoldings, getUpcomingEvents } from "@/lib/loadBook";

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
  const holdings = getHoldings();
  const events = getUpcomingEvents(brief.date);

  return (
    <>
      <SiteHeader active="archive" />
      <main className="shell">
        <DeskHero kicker="Archived note" brief={brief} holdings={holdings} />
        <BriefDesk brief={brief} holdings={holdings} events={events} />
      </main>
      <SiteFooter />
    </>
  );
}
