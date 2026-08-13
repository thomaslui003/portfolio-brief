import fs from "node:fs";
import path from "node:path";
import { extractAttention, extractBookMap, extractDelta, extractFlowsNarrative, extractHealth, extractKpis, extractNonActions, extractPremarketNarrative, extractQuestions, extractRegime, type AttentionItem } from "@/lib/attention";
import { extractBookStance, type BookStance } from "@/lib/bookStance";
import { extractPositionNotes, type PositionNote } from "@/lib/positionNotes";
import { extractPremarketTape, type PremarketTapeRow } from "@/lib/premarketTape";
import {
  extractPositionRatings,
  type PositionRatingRow,
} from "@/lib/ratingLabels";
import { extractSectorTape, type SectorTapeRow } from "@/lib/sectorTape";
import { slugify } from "@/lib/slugify";
import { extractSuggestions, type Suggestion } from "@/lib/suggestions";

export type BriefMeta = {
  slug: string;
  date: string;
  title: string;
  summary: string;
};

export type BriefSection = {
  id: string;
  label: string;
};

export type Brief = BriefMeta & {
  content: string;
  sections: BriefSection[];
  sectorTape: SectorTapeRow[];
  premarketTape: PremarketTapeRow[];
  bookStance: BookStance | null;
  positionRatings: PositionRatingRow[];
  attention: AttentionItem[];
  suggestions: Suggestion[];
  nonActions: string[];
  delta: string;
  questions: string[];
  kpis: string[];
  health: string[];
  bookMap: string | null;
  regime: string;
  premarketNarrative: string;
  flowsNarrative: string;
  positionNotes: PositionNote[];
};

function reportsDir(): string {
  return path.join(process.cwd(), "..", "reports");
}

function extractTitle(md: string, fallback: string): string {
  const h1 = /^#\s+(.+)$/m.exec(md);
  return h1 ? h1[1].trim() : fallback;
}

function extractSummary(md: string): string {
  const stance = extractBookStance(md);
  if (stance) {
    return `${stance.verb}: ${stance.body}`.slice(0, 160);
  }
  const attention = extractAttention(md);
  if (attention[0]) return attention[0].text.slice(0, 160);
  const lines = md
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#") && !l.startsWith(">") && !l.startsWith("|"));
  return (lines[0] ?? "Daily dual-analyst portfolio brief").replace(/\*\*/g, "").slice(0, 160);
}

/** H2 outline for jump nav (skips empty labels). */
export function extractSections(md: string): BriefSection[] {
  const sections: BriefSection[] = [];
  const seen = new Set<string>();
  for (const match of md.matchAll(/^##\s+(.+)$/gm)) {
    const label = match[1].trim();
    if (!label) continue;
    let id = slugify(label);
    if (!id) continue;
    if (seen.has(id)) {
      let n = 2;
      while (seen.has(`${id}-${n}`)) n += 1;
      id = `${id}-${n}`;
    }
    seen.add(id);
    sections.push({ id, label });
  }
  return sections;
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
    sections: extractSections(content),
    sectorTape: extractSectorTape(content),
    premarketTape: extractPremarketTape(content),
    bookStance: extractBookStance(content),
    positionRatings: extractPositionRatings(content),
    attention: extractAttention(content),
    suggestions: extractSuggestions(content),
    nonActions: extractNonActions(content),
    delta: extractDelta(content),
    questions: extractQuestions(content),
    kpis: extractKpis(content),
    health: extractHealth(content),
    bookMap: extractBookMap(content),
    regime: extractRegime(content),
    premarketNarrative: extractPremarketNarrative(content),
    flowsNarrative: extractFlowsNarrative(content),
    positionNotes: extractPositionNotes(content),
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
