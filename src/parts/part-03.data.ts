import type { Block, Listing, PartMeta } from '../components/types';

export const meta: PartMeta = {
  "course": "playwright",
  "part": 3,
  "slug": "find-elements",
  "title": "เทสแรกและการหา element",
  "language": "th",
  "slideCount": 28
};

// Code the slides show, with its real output: name -> listing, name -> output.
export const listings: Record<string, Listing> = {
  "first": {
    lang: "typescript",
    status: "verified",
    reason: "รันใน lab/solutions ด้วย PORT=3103 pnpm exec playwright test e2e/first.spec.ts --reporter=list --project=chromium --no-deps ผ่าน 1 test",
    code: `import { test, expect } from "@playwright/test";

test("เทสแรกของเรา", async ({ page }) => {
  await page.goto("/lessons/01-first-test");
  await expect(page).toHaveTitle("Playwright 01 - First Test");
  await expect(page).toHaveURL(/01-first-test/);
  await expect(page.getByRole("heading", { name: "สวัสดี Playwright" })).toBeVisible();
});`,
  },
  "labels": {
    lang: "typescript",
    status: "verified",
    reason: "รันใน lab/solutions ด้วย PORT=3103 pnpm exec playwright test e2e/labels.spec.ts --reporter=list --project=chromium --no-deps ผ่าน 1 test",
    code: `import { test, expect } from "@playwright/test";

test("หาช่องอีเมลแล้วกรอก", async ({ page }) => {
  await page.goto("/lessons/03-labels-and-placeholders");
  await page.getByLabel("อีเมล").fill("a@b.com");
  await expect(page.getByLabel("อีเมล")).toHaveValue("a@b.com");
});`,
  },
  "delete": {
    lang: "typescript",
    status: "verified",
    reason: "รันใน lab/solutions ด้วย PORT=3103 pnpm exec playwright test e2e/delete.spec.ts --reporter=list --project=chromium --no-deps ผ่าน 1 test",
    code: `import { test, expect } from "@playwright/test";

test("ลบรายการกล้วย", async ({ page }) => {
  await page.goto("/lessons/03-labels-and-placeholders");
  const banana = page.getByRole("listitem").filter({ hasText: "กล้วย" });
  await banana.getByRole("button", { name: "ลบ" }).click();
  await expect(page.getByRole("listitem")).toHaveCount(1);
});`,
  },
};

export const outputs: Record<string, Block> = {
  "first": {
    lang: "text",
    info: "text",
    text: `Running 1 test using 1 worker

  1 passed (856ms)`,
  },
  "labels": {
    lang: "text",
    info: "text",
    text: `Running 1 test using 1 worker

  1 passed (870ms)`,
  },
  "delete": {
    lang: "text",
    info: "text",
    text: `Running 1 test using 1 worker

  1 passed (900ms)`,
  },
};
