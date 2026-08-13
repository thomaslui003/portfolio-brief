import type { Metadata } from "next";
import { BriefDesk } from "@/components/BriefDesk";
import { DeskHero } from "@/components/DeskHero";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getLatestBrief } from "@/lib/briefs";
import { getHoldings, getUpcomingEvents } from "@/lib/loadBook";

export const metadata: Metadata = {
  title: "Latest",
};

export default function HomePage() {
  const brief = getLatestBrief();
  const holdings = getHoldings();
  const events = getUpcomingEvents(brief?.date ?? "2026-08-13");

  return (
    <>
      <SiteHeader active="latest" />
      <main className="shell">
        {brief ? (
          <>
            <DeskHero kicker="Daily dual-analyst desk" brief={brief} holdings={holdings} />
            <BriefDesk brief={brief} holdings={holdings} events={events} />
          </>
        ) : (
          <>
            <section className="hero">
              <p className="hero__kicker">Daily dual-analyst desk</p>
              <h1>Portfolio brief</h1>
              <p className="hero__meta">No brief published yet</p>
            </section>
            <article className="panel">
              <p className="empty">
                Run the weekday automation (or a manual AGENTS.md pass) to publish
                the first report under <code>reports/</code>.
              </p>
            </article>
          </>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
