import { stripBold } from "./md";

export type CalendarEvent = {
  date: string;
  ticker: string;
  event: string;
  notes: string;
  startDate: string | null;
};

function startDateOf(raw: string): string | null {
  const m = /(~)?(\d{4}-\d{2}-\d{2})/.exec(raw);
  return m ? m[2] : null;
}

export function parseCalendarMarkdown(md: string): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  for (const line of md.split("\n")) {
    if (!line.trim().startsWith("|")) continue;
    const cells = line
      .split("|")
      .slice(1, -1)
      .map((c) => c.trim());
    if (cells.length < 3) continue;
    const date = stripBold(cells[0]);
    if (!date || date.toLowerCase() === "date (et)" || /^[-:]+$/.test(date)) continue;
    if (date.toLowerCase() === "reported" || date.toLowerCase() === "tbd") continue;

    events.push({
      date,
      ticker: stripBold(cells[1] ?? "—") || "—",
      event: stripBold(cells[2] ?? ""),
      notes: stripBold(cells[3] ?? "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"),
      startDate: startDateOf(date),
    });
  }
  return events;
}
