// Renders the product scenes in assets/renders/scenes.html to transparent PNGs (2x) in
// assets/products-src/, then run `python scripts/build-images.py` for AVIF/WebP + manifest.
// Run: node scripts/build-renders.mjs   (uses the system Chrome via playwright-core)
import { chromium } from "playwright-core";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ deviceScaleFactor: 2, viewport: { width: 900, height: 900 } });
await page.goto(pathToFileURL(path.join(root, "assets/renders/scenes.html")).href);
await page.evaluate(() => document.fonts.ready);
for (const el of await page.locator("[data-render]").all()) {
  const name = await el.getAttribute("data-render");
  await el.screenshot({ path: path.join(root, "assets/products-src", `${name}.png`), omitBackground: true });
  console.log("rendered", name);
}
await browser.close();
