import type { Metadata } from "next";
import { BriefToc } from "@/components/BriefToc";
import { MarkdownBody } from "@/components/MarkdownBody";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getLatestBrief } from "@/lib/briefs";

export const metadata: Metadata = {
  title: "Latest",
};

export default function HomePage() {
  const brief = getLatestBrief();

  return (
    <>
      <SiteHeader active="latest" />
      <main className="shell">
        <section className="hero">
          <p className="hero__kicker">Daily dual-analyst note</p>
          <h1>{brief?.title ?? "Portfolio brief"}</h1>
          <p className="hero__meta">
            {brief
              ? `${brief.date}  ·  Quant  ·  Flows  ·  Peers/KPIs  ·  Fundamental`
              : "No brief published yet"}
          </p>
        </section>
        {brief ? <BriefToc sections={brief.sections} /> : null}
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
