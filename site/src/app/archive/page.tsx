import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { listArchive } from "@/lib/briefs";

export const metadata: Metadata = {
  title: "Archive",
};

export default function ArchivePage() {
  const items = listArchive();

  return (
    <>
      <SiteHeader active="archive" />
      <main className="shell">
        <section className="hero">
          <p className="hero__kicker">Document archive</p>
          <h1>Brief archive</h1>
          <p className="hero__meta">
            {items.length} dated report{items.length === 1 ? "" : "s"} · source{" "}
            <code>reports/</code>
          </p>
        </section>
        <section className="panel">
          {items.length === 0 ? (
            <p className="empty">No dated reports yet.</p>
          ) : (
            <ul className="archive-list">
              {items.map((item) => (
                <li key={item.slug}>
                  <Link href={`/archive/${item.slug}/`} className="archive-card">
                    <div className="archive-card__date">{item.date}</div>
                    <div>
                      <div className="archive-card__title">{item.title}</div>
                      <p className="archive-card__summary">{item.summary}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
