import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const docs = path.join(root, "docs");
const reportsDir = path.join(root, "reports");

function escapeHtml(s) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Minimal markdown → HTML for daily briefs (headings, lists, links, bold, code, quotes). */
function mdToHtml(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let inUl = false;
  let inOl = false;
  let inBq = false;

  const closeLists = () => {
    if (inUl) {
      out.push("</ul>");
      inUl = false;
    }
    if (inOl) {
      out.push("</ol>");
      inOl = false;
    }
  };
  const closeBq = () => {
    if (inBq) {
      out.push("</blockquote>");
      inBq = false;
    }
  };

  const inline = (text) => {
    let t = escapeHtml(text);
    t = t.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" rel="noopener">$1</a>');
    t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
    return t;
  };

  for (const raw of lines) {
    const line = raw;

    if (line.startsWith("> ")) {
      closeLists();
      if (!inBq) {
        out.push("<blockquote>");
        inBq = true;
      }
      out.push(`<p>${inline(line.slice(2))}</p>`);
      continue;
    }
    if (inBq && line.trim() === "") {
      closeBq();
      continue;
    }
    if (inBq && !line.startsWith(">")) {
      closeBq();
    }

    const h = /^(#{1,3})\s+(.*)$/.exec(line);
    if (h) {
      closeLists();
      const level = h[1].length;
      out.push(`<h${level}>${inline(h[2])}</h${level}>`);
      continue;
    }

    const ul = /^[-*]\s+(.*)$/.exec(line);
    if (ul) {
      closeBq();
      if (inOl) {
        out.push("</ol>");
        inOl = false;
      }
      if (!inUl) {
        out.push("<ul>");
        inUl = true;
      }
      out.push(`<li>${inline(ul[1])}</li>`);
      continue;
    }

    const ol = /^(\d+)\.\s+(.*)$/.exec(line);
    if (ol) {
      closeBq();
      if (inUl) {
        out.push("</ul>");
        inUl = false;
      }
      if (!inOl) {
        out.push("<ol>");
        inOl = true;
      }
      out.push(`<li>${inline(ol[2])}</li>`);
      continue;
    }

    if (line.trim() === "") {
      closeLists();
      continue;
    }

    closeLists();
    out.push(`<p>${inline(line)}</p>`);
  }

  closeLists();
  closeBq();
  return out.join("\n");
}

function replaceBlock(html, startMarker, endMarker, inner) {
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker);
  if (start === -1 || end === -1 || end < start) {
    throw new Error(`Missing markers ${startMarker} / ${endMarker}`);
  }
  return (
    html.slice(0, start + startMarker.length) +
    "\n" +
    inner +
    "\n" +
    html.slice(end)
  );
}

const latestMd = fs.readFileSync(path.join(docs, "latest.md"), "utf8");
const latestHtml = mdToHtml(latestMd);

let index = fs.readFileSync(path.join(docs, "index.html"), "utf8");
index = replaceBlock(index, "<!-- CONTENT:START -->", "<!-- CONTENT:END -->", latestHtml);
fs.writeFileSync(path.join(docs, "index.html"), index);

const reportFiles = fs
  .readdirSync(reportsDir)
  .filter((f) => /^\d{4}-\d{2}-\d{2}\.md$/.test(f))
  .sort()
  .reverse();

const archiveItems = [
  '<li><a href="index.html">latest (current)</a></li>',
  ...reportFiles.map((f) => {
    const day = f.replace(/\.md$/, "");
    return `<li><code>reports/${f}</code> — ${day} (see repo)</li>`;
  }),
].join("\n");

let archive = fs.readFileSync(path.join(docs, "archive.html"), "utf8");
archive = replaceBlock(archive, "<!-- ARCHIVE:START -->", "<!-- ARCHIVE:END -->", archiveItems);
fs.writeFileSync(path.join(docs, "archive.html"), archive);

console.log(`Baked docs/index.html from docs/latest.md (${reportFiles.length} dated reports listed).`);
