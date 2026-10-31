import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { PHONE_E164, PHONE_LOCAL, telHref, waHref, MESSAGES } from "../lib/contact.ts";
import { PRICING } from "../src/config/pricing.ts";

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
  assert.match(waHref(MESSAGES.connectStand), /^https:\/\/wa\.me\/212789216699\?text=/);
});

test("no hard-coded wa.me or tel: number outside lib/contact.ts", () => {
  for (const file of tracked.filter((f) => /\.(tsx?|mjs|json|md)$/.test(f) && f !== "lib/contact.ts")) {
    const text = readFileSync(file, "utf8");
    assert.doesNotMatch(text, /wa\.me\/\d|tel:\+?\d/, `${file} hard-codes a phone link`);
  }
});

test("prices match the brief", () => {
  assert.deepEqual(PRICING, {
    connect: { carte: 200, stand: 250 },
    grow: { carte: 250, stand: 300 },
    delivery: 40,
    kits: { kit5: { cartes: 5, price: 250 }, kit10: { cartes: 10, price: 350 } },
  });
});

test("no old prices or the old pack remain in site copy", () => {
  for (const file of ["components/boostov-site.tsx", "app/layout.tsx", "lib/contact.ts"]) {
    const text = readFileSync(file, "utf8");
    assert.doesNotMatch(text, /(349|429|649)|Grow \+ Connect|Pack/, file);
  }
});

test("site copy never hard-codes a DH price outside the pricing config", () => {
  assert.doesNotMatch(readFileSync("components/boostov-site.tsx", "utf8"), /\d+ ?DH/);
});

test("every product WhatsApp message names the product", () => {
  assert.match(MESSAGES.connectStand, /Stand Connect personnalisé/);
  for (const key of ["connectCarte", "connectStand", "growCarte", "growStand", "kit5", "kit10"]) {
    assert.match(MESSAGES[key], /Connect|Grow|Kit/, key);
  }
});

test("visible copy never says Cardify", () => {
  for (const file of ["components/boostov-site.tsx", "app/layout.tsx"]) {
    assert.doesNotMatch(readFileSync(file, "utf8"), /cardify/i, file);
  }
});
