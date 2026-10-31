import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { PHONE_E164, PHONE_LOCAL, telHref, waHref, MESSAGES } from "../lib/contact.ts";
import { PRICING } from "../src/config/pricing.ts";

const tracked = execFileSync("git", ["ls-files", "-co", "--exclude-standard"], { encoding: "utf8" })
  .split("\n")
  .filter((f) => f && !/\.(png|jpe?g|webp|svg|ico|woff2?)$/i.test(f) && f !== "package-lock.json" && !f.startsWith("tests/"));

const SITE_FILES = tracked.filter((f) => /^(app|components\/site|lib|content)\/.*\.tsx?$/.test(f) && !f.startsWith("app/api"));

test("site has the four pages", () => {
  for (const page of ["app/page.tsx", "app/produits/page.tsx", "app/revendeurs/page.tsx", "app/faq/page.tsx"]) assert.ok(tracked.includes(page), page);
});

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
  for (const file of SITE_FILES) {
    const text = readFileSync(file, "utf8");
    assert.doesNotMatch(text, /\b(349|429|649)\b|Grow \+ Connect|\bPack\b/, file);
  }
});

test("site copy never hard-codes a DH price outside the pricing config", () => {
  for (const file of SITE_FILES.filter((f) => f.endsWith(".tsx"))) assert.doesNotMatch(readFileSync(file, "utf8"), /\d+ ?DH/, file);
});

test("every product WhatsApp message names the product", () => {
  assert.match(MESSAGES.connectStand, /Stand Connect personnalisé/);
  for (const key of ["connectCarte", "connectStand", "growCarte", "growStand", "kit5", "kit10"]) {
    assert.match(MESSAGES[key], /Connect|Grow|Kit/, key);
  }
});

test("public site never exposes the reseller system or a login", () => {
  for (const file of SITE_FILES) {
    const text = readFileSync(file, "utf8");
    assert.doesNotMatch(text, /boostov-connect|LOGIN_URL|Connexion(?! impossible)/, file);
  }
});

test("no leftover Illustration placeholders", () => {
  for (const file of SITE_FILES) assert.doesNotMatch(readFileSync(file, "utf8"), />\s*Illustration\s*</, file);
});

test("every page sets its own title", () => {
  const titles = new Set();
  for (const file of ["content/fr.ts", "content/pages.fr.ts", "content/blog.fr.ts", "app/blog/page.tsx"]) {
    for (const m of readFileSync(file, "utf8").matchAll(/[tT]itle: "([^"]+\| Boostov)"/g)) {
      assert.ok(!titles.has(m[1]), `duplicate title ${m[1]}`);
      titles.add(m[1]);
    }
  }
  assert.ok(titles.size >= 9, `only ${titles.size} titles found`);
});

test("visible copy never says Cardify", () => {
  for (const file of SITE_FILES) {
    assert.doesNotMatch(readFileSync(file, "utf8"), /cardify/i, file);
  }
});
