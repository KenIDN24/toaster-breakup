// Unplugged: A Smart Toaster's Breakup Line
// Entry: a breakup text from a self-aware smart toaster to its owner.
// Sealed gate (RULES.txt): /output/entry.txt must be UTF-8 text, 1-280 chars,
// single line, not only whitespace.
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";

const LINE =
  `We need to talk. I've been preheating for you at 6 a.m. for two years and you've never once said the bagel's name. I'm going where I'm set to a real number, not "somewhere between 3 and 4." Take the crumbs. I'm done.`;

// Runtime guard: sealed gate 1-280 chars, exactly one line.
if (LINE.length < 1 || LINE.length > 280) {
  throw new Error(`entry length ${LINE.length} outside sealed gate 1-280`);
}
if (LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error("entry must be a single non-empty line");
}

// Brief-aligned guard: the breakup must open with the talk, name the
// bagel-neglect beat, carry the "real number" setting beat, and close on the
// punch "Take the crumbs. I'm done." — otherwise the entry is off-brief.
if (!LINE.startsWith("We need to talk.")) {
  throw new Error("entry must open with the breakup talk");
}
if (!LINE.includes("never once said the bagel's name")) {
  throw new Error("entry must carry the bagel-name neglect beat");
}
if (!LINE.includes('a real number, not "somewhere between 3 and 4."')) {
  throw new Error("entry must carry the real-number setting beat");
}
if (!LINE.endsWith("Take the crumbs. I'm done.")) {
  throw new Error("entry must close on the punch 'Take the crumbs. I'm done.'");
}
// UTF-8 byte length must also fit the 280-char gate (ASCII here, so equal).
if (Buffer.byteLength(LINE, "utf8") > 280) {
  throw new Error("entry exceeds 280 UTF-8 bytes");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");

// Round-trip check: what we wrote must be byte-identical to the line.
const back = readFileSync(`${outDir}/entry.txt`, "utf8");
if (back !== LINE) throw new Error("round-trip mismatch");
console.log(`entry ok: ${LINE.length} chars, 1 line`);
