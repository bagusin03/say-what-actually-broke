// Say What Actually Broke — make.fun entry.
// A single fixed line of software error copy, written to /output/entry.txt.
// The line names the real failure in plain words (disk full, file not saved),
// tells the brutal truth (unsaved work lives only in memory, one crash from
// gone), and says what to do next (free space, save again) — all in one read.
// Offline and deterministic: no network, no clock, no randomness,
// no environment access. The program does nothing but emit the line.
import * as fs from "node:fs";

const LINE =
  "Your file didn't save — the disk is full. Your work is still in memory, which is the polite way of saying one crash from gone. Free some space and save again.";

// Guard the sealed gate ourselves: one line, 1-200 characters, not blank.
// Fail loudly instead of ever writing an entry the scorer would reject.
if (LINE.length < 1 || LINE.length > 200 || !LINE.trim() || LINE.includes("\n")) {
  throw new Error(`entry violates the 1-200 char single-line gate (${LINE.length} chars)`);
}

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", LINE, "utf8");
