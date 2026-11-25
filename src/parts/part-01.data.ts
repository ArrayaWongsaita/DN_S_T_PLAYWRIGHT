import type { Block, Listing, PartMeta } from '../components/types';

export const meta: PartMeta = {
  "course": "playwright",
  "part": 1,
  "slug": "what-is-playwright",
  "title": "Playwright คืออะไร",
  "language": "th",
  "slideCount": 24
};

// Code the slides show, with its real output: name -> listing, name -> output.
export const listings: Record<string, Listing> = {
  "first-test": {
    lang: "typescript",
    status: "verified",
    reason: "รันใน lab/solutions ด้วย pnpm exec playwright test e2e/01-first-test/first.spec.ts -g \"title ของหน้าต้องเป็น\" --project=chromium --no-deps ผ่าน 1 test",
    code: `import { test, expect } from "@playwright/test";

test("title ของหน้าต้องเป็น Playwright 01 - First Test", async ({ page }) => {
  await page.goto("/lessons/01-first-test");
  await expect(page).toHaveTitle("Playwright 01 - First Test");
});`,
  },
};

export const outputs: Record<string, Block> = {
  "first-test": {
    lang: "text",
    info: "text",
    text: `Running 1 test using 1 worker

  1 passed (838ms)`,
  },
};
