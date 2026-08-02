import fs from "node:fs";
import path from "node:path";

export type BriefMeta = {
  slug: string;
  date: string;
  title: string;
  summary: string;
};

export type Brief = BriefMeta & {
  content: string;
};

function reportsDir(): string {
  return path.join(process.cwd(), "..", "reports");
}

function extractTitle(md: string, fallback: string): string {
  const h1 = /^#\s+(.+)$/m.exec(md);
  return h1 ? h1[1].trim() : fallback;
}

function extractSummary(md: string): string {
  const attention = /## What needs attention today\n([\s\S]*?)(?=\n## )/.exec(md);
  if (attention) {
    const firstBullet = /^- (.+)$/m.exec(attention[1]);
    if (firstBullet) return firstBullet[1].replace(/\*\*/g, "").slice(0, 160);
  }
  const lines = md
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#") && !l.startsWith(">") && !l.startsWith("|"));
  return (lines[0] ?? "Daily dual-analyst portfolio brief").replace(/\*\*/g, "").slice(0, 160);
}

export function listBriefDates(): string[] {
  const dir = reportsDir();
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /^\d{4}-\d{2}-\d{2}\.md$/.test(f))
    .map((f) => f.replace(/\.md$/, ""))
    .sort()
    .reverse();
}

export function getBriefBySlug(slug: string): Brief | null {
  const file =
    slug === "latest"
      ? path.join(reportsDir(), "latest.md")
      : path.join(reportsDir(), `${slug}.md`);

  if (!fs.existsSync(file)) return null;
  const content = fs.readFileSync(file, "utf8");
  const date = slug === "latest" ? listBriefDates()[0] ?? "latest" : slug;

  return {
    slug,
    date,
    title: extractTitle(content, `Portfolio brief — ${date}`),
    summary: extractSummary(content),
    content,
  };
}

export function getLatestBrief(): Brief | null {
  const latest = getBriefBySlug("latest");
  if (latest && !latest.content.includes("Scaffold only")) return latest;
  const dates = listBriefDates();
  if (!dates.length) return latest;
  return getBriefBySlug(dates[0]);
}

export function listArchive(): BriefMeta[] {
  return listBriefDates().map((date) => {
    const brief = getBriefBySlug(date)!;
    return {
      slug: date,
      date: brief.date,
      title: brief.title,
      summary: brief.summary,
    };
  });
}
