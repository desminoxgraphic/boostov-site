import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { PHONE_E164, PHONE_LOCAL, telHref, waHref, MESSAGES } from "../lib/contact.ts";
import { BETA_ACTIVE, BETA_PRICE, BETA_SLOTS, PRICING, PRO_DEMO_URL } from "../src/config/pricing.ts";
import { frameAt, SLOTS } from "../lib/story.ts";

const tracked = execFileSync("git", ["ls-files", "-co", "--exclude-standard"], { encoding: "utf8" })
  .split("\n")
  .filter((f) => f && !/\.(png|jpe?g|webp|svg|ico|woff2?)$/i.test(f) && f !== "package-lock.json" && !f.startsWith("tests/"));

const SITE_FILES = tracked.filter((f) => /^(app|components\/site|lib|content)\/.*\.tsx?$/.test(f) && !f.startsWith("app/api"));

test("site has the v7 pages", () => {
  for (const page of ["app/page.tsx", "app/grow/page.tsx", "app/pro/page.tsx", "app/connect/page.tsx", "app/revendeurs/page.tsx", "app/faq/page.tsx", "app/blog/page.tsx"]) assert.ok(tracked.includes(page), page);
  for (const old of ["app/produits/page.tsx", "app/stands/page.tsx"]) assert.ok(!tracked.includes(old), `${old} should be a redirect`);
});

test("no old Boostov phone numbers remain in any format", () => {
  const offenders = [];
  for (const file of tracked) {
    let text;
    try { text = readFileSync(file, "utf8"); } catch { continue; }
    // Strip separators so "+212 650-532156", "0650 53 21 56", "212650532156" all collapse to the same digits.
    const digits = text.replace(/[\s.\-()]/g, "");
    if (["650532156", "789216699"].some((old) => digits.includes(old))) offenders.push(file);
  }
  assert.deepEqual(offenders, []);
});

test("WhatsApp and call links use +212709272476", () => {
  assert.equal(PHONE_LOCAL, "0709272476");
  assert.equal(PHONE_E164, "+212709272476");
  assert.equal(telHref, "tel:+212709272476");
  assert.equal(waHref(), "https://wa.me/212709272476");
  assert.match(waHref(MESSAGES.connectStand), /^https:\/\/wa\.me\/212709272476\?text=/);
});

test("no hard-coded wa.me or tel: number outside lib/contact.ts", () => {
  for (const file of tracked.filter((f) => /\.(tsx?|mjs|json|md)$/.test(f) && f !== "lib/contact.ts")) {
    const text = readFileSync(file, "utf8");
    assert.doesNotMatch(text, /wa\.me\/\d|tel:\+?\d/, `${file} hard-codes a phone link`);
  }
});

test("prices match the brief", () => {
  assert.deepEqual(PRICING, {
    grow: { stand: 499 },
    pro: { carte: 300 },
    connect: { carte: 200, stand: 250 },
    kits: { kit5: { cartes: 5, price: 250 }, kit10: { cartes: 10, price: 350 } },
  });
});

test("Beta is a separate offer: no invented price, normal Grow v2 price unchanged", () => {
  assert.equal(typeof BETA_ACTIVE, "boolean");
  assert.ok(BETA_PRICE === null || (Number.isInteger(BETA_PRICE) && BETA_PRICE > 0), "BETA_PRICE must be null or a real number");
  assert.equal(BETA_SLOTS, 3);
  const fr = readFileSync("content/fr.ts", "utf8");
  assert.match(fr, /Prix spécial pour les \$\{BETA_SLOTS\} testeurs, sur demande WhatsApp/);
  assert.match(fr, /L’offre normale reste Boostov Grow v2 à \$\{grow\.stand\} DH/);
  const sections = readFileSync("components/site/sections.tsx", "utf8");
  assert.match(sections, /BETA_PRICE \? .*: b\.onRequest/, "Beta block must fall back to the on-request text");
  assert.match(MESSAGES.growBeta, /testeur/);
});

test("scroll story counter matches every step (0/5, 1/5 → 4/5, 5/5, 0/5)", () => {
  const seen = [];
  for (let p = 0; p <= 1; p += 0.01) {
    const f = frameAt(p);
    const key = `${f.step}:${f.state}:${f.count}`;
    if (seen.at(-1) !== key) seen.push(key);
  }
  assert.deepEqual(seen, ["0:tap:0", "1:stamps:1", "1:stamps:2", "1:stamps:3", "1:stamps:4", "2:gift:5", "3:loop:0"]);
  assert.equal(SLOTS, 5);
});

test("one navigation only (no duplicated menu)", () => {
  const navs = SITE_FILES.filter((f) => f.endsWith(".tsx")).flatMap((f) => [...readFileSync(f, "utf8").matchAll(/aria-label="Navigation principale"/g)].map(() => f));
  assert.deepEqual(navs, ["components/site/nav-links.tsx"]);
  assert.match(readFileSync("content/fr.ts", "utf8"), /\["\/blog", "Guides"\]/);
});

test("structured data comes after the page content (no meta text first)", () => {
  for (const file of ["app/page.tsx", "app/grow/page.tsx", "app/pro/page.tsx", "app/connect/page.tsx", "app/revendeurs/page.tsx", "app/faq/page.tsx", "app/blog/page.tsx", "components/site/post-view.tsx"]) {
    const text = readFileSync(file, "utf8");
    const json = text.indexOf("<JsonLd"), end = text.lastIndexOf("</>");
    assert.ok(json > 0 && end - json < 400, `${file}: JsonLd should be the last element`);
  }
});

test("Pro demo button only renders when PRO_DEMO_URL is set", () => {
  assert.equal(typeof PRO_DEMO_URL, "string");
  for (const file of ["app/pro/page.tsx", "components/site/sections.tsx"]) {
    const text = readFileSync(file, "utf8");
    assert.match(text, /PRO_DEMO_URL \?|PRO_DEMO_URL &&/, `${file} must guard the demo link`);
    assert.doesNotMatch(text, /href="https?:\/\/[^"]*demo/i, `${file} hard-codes a demo URL`);
  }
});

test("no old prices or the old pack remain in site copy", () => {
  for (const file of SITE_FILES) {
    const text = readFileSync(file, "utf8");
    assert.doesNotMatch(text, /\b(349|429|649)\b|Grow \+ Connect|\bPack\b|Grow v1|Grow Carte|Carte Grow|Stand Grow personnalisé|Deux produits, deux formats|Choufna|Visuel de démonstration/, file);
  }
});

test("site copy never hard-codes a DH price outside the pricing config", () => {
  for (const file of SITE_FILES.filter((f) => f.endsWith(".tsx"))) assert.doesNotMatch(readFileSync(file, "utf8"), /\d+ ?DH/, file);
});

test("every product WhatsApp message is French, polite and names the product", () => {
  const names = { grow: /Boostov Grow v2/, growBeta: /Boostov Grow v2/, pro: /Boostov Pro/, connect: /Boostov Connect/, connectCarte: /carte Boostov Connect/, connectStand: /stand Boostov Connect/, kit5: /Kit 5/, kit10: /Kit 10/, reseller: /kit revendeur/ };
  for (const [key, re] of Object.entries(names)) {
    assert.match(MESSAGES[key], re, key);
    assert.match(MESSAGES[key], /^Bonjour Boostov,/, key);
  }
  assert.match(MESSAGES.grow, new RegExp(`${PRICING.grow.stand} DH`));
});

test("every CTA is the gold WhatsApp button (no other order button component)", () => {
  for (const file of SITE_FILES.filter((f) => f.endsWith(".tsx"))) {
    const text = readFileSync(file, "utf8");
    assert.doesNotMatch(text, /WaButton|btn--wa/, file);
  }
  assert.match(readFileSync("content/fr.ts", "utf8"), /cta: "Commander sur WhatsApp"/);
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
  for (const file of ["content/fr.ts", "content/pages.fr.ts", "content/blog.fr.ts"]) {
    for (const m of readFileSync(file, "utf8").matchAll(/[tT]itle: ["`]([^"`]+\| Boostov)["`]/g)) {
      assert.ok(!titles.has(m[1]), `duplicate title ${m[1]}`);
      titles.add(m[1]);
    }
  }
  assert.ok(titles.size >= 9, `only ${titles.size} titles found`);
});

test("no delivery price on the site (discussed with each customer on WhatsApp)", () => {
  for (const file of SITE_FILES) assert.doesNotMatch(readFileSync(file, "utf8"), /livraison|delivery|shipping/i, file);
});

test("visible copy never says Cardify", () => {
  for (const file of SITE_FILES) {
    assert.doesNotMatch(readFileSync(file, "utf8"), /cardify/i, file);
  }
});
