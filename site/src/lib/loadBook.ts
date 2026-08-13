import fs from "node:fs";
import path from "node:path";
import { parseCalendarMarkdown, type CalendarEvent } from "./calendarEvents";
import { parseHoldingsMarkdown, type HoldingsSnapshot } from "./holdings";

export function getHoldings(): HoldingsSnapshot {
  const file = path.join(process.cwd(), "..", "holdings.md");
  if (!fs.existsSync(file)) {
    return { asOf: null, totalMv: null, currency: "USD", positions: [] };
  }
  return parseHoldingsMarkdown(fs.readFileSync(file, "utf8"));
}

export function getUpcomingEvents(asOf: string, days = 21): CalendarEvent[] {
  const file = path.join(process.cwd(), "..", "calendar.md");
  if (!fs.existsSync(file)) return [];
  const all = parseCalendarMarkdown(fs.readFileSync(file, "utf8"));
  const end = new Date(`${asOf}T00:00:00Z`);
  end.setUTCDate(end.getUTCDate() + days);
  const endStr = end.toISOString().slice(0, 10);
  return all.filter((e) => {
    if (!e.startDate || e.startDate < asOf || e.startDate > endStr) return false;
    if (/^Printed\b/i.test(e.notes)) return false;
    return true;
  });
}
