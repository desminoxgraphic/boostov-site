import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { PACK_SAVING, PACK_SEPARATE_TOTAL, PHONE_E164, PHONE_LOCAL, PRICES, telHref, waHref, MESSAGES } from "../lib/contact.ts";

const tracked = execFileSync("git", ["ls-files", "-co", "--exclude-standard"], { encoding: "utf8" })
  .split("\n")
  .filter((f) => f && !/\.(png|jpe?g|webp|svg|ico|woff2?)$/i.test(f) && f !== "package-lock.json" && !f.startsWith("tests/"));

test("no old Boostov phone number remains in any format", () => {
  const offenders = [];
  for (const file of tracked) {
    let text;
    try { text = readFileSync(file, "utf8"); } catch { continue; }
    // Strip separators so "+212 650-532156", "0650 53 21 56", "212650532156" all collapse to the same digits.
    if (text.replace(/[\s.\-()]/g, "").includes("650532156")) offenders.push(file);
  }
  assert.deepEqual(offenders, []);
});

test("WhatsApp and call links use +212789216699", () => {
  assert.equal(PHONE_LOCAL, "0789216699");
  assert.equal(PHONE_E164, "+212789216699");
  assert.equal(telHref, "tel:+212789216699");
  assert.equal(waHref(), "https://wa.me/212789216699");
  assert.match(waHref(MESSAGES.pack), /^https:\/\/wa\.me\/212789216699\?text=/);
});

test("no hard-coded wa.me or tel: number outside lib/contact.ts", () => {
  for (const file of tracked.filter((f) => /\.(tsx?|mjs|json|md)$/.test(f) && f !== "lib/contact.ts")) {
    const text = readFileSync(file, "utf8");
    assert.doesNotMatch(text, /wa\.me\/\d|tel:\+?\d/, `${file} hard-codes a phone link`);
  }
});

test("pack message names the pack and its price", () => {
  const text = decodeURIComponent(waHref(MESSAGES.pack).split("text=")[1]);
  assert.match(text, /Pack Grow \+ Connect/);
  assert.match(text, /649 DH/);
});

test("pack pricing uses only the site's own prices", () => {
  assert.deepEqual(PRICES, { connect: 349, grow: 429, pack: 649 });
  assert.equal(PACK_SEPARATE_TOTAL, 778);
  assert.equal(PACK_SAVING, 129);
});

test("visible copy never says Cardify", () => {
  for (const file of ["components/boostov-site.tsx", "components/boostov/order-modal.tsx", "app/layout.tsx"]) {
    assert.doesNotMatch(readFileSync(file, "utf8"), /cardify/i, file);
  }
});
