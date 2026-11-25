import type { Block, Listing, PartMeta } from '../components/types';

export const meta: PartMeta = {
  "course": "playwright",
  "part": 5,
  "slug": "assertions-and-waiting",
  "title": "ตรวจผลและการรอ",
  "language": "th",
  "slideCount": 27
};

// Code the slides show, with its real output: name -> listing, name -> output.
export const listings: Record<string, Listing> = {
  "detail-panel": {
    lang: "typescript",
    status: "verified",
    reason:
      'รันใน lab/solutions ด้วย PORT=3105 pnpm exec playwright test e2e/assertions.spec.ts --reporter=list --project=chromium --no-deps ผ่าน 1 test (202ms)',
    code: `import { test, expect } from "@playwright/test";

test("panel สลับแสดงและซ่อน", async ({ page }) => {
  await page.goto("/lessons/07-assertions");
  await expect(page.getByText("รายละเอียดสินค้า")).toBeHidden();
  await page.getByRole("button", { name: /รายละเอียด/ }).click();
  await expect(page.getByText("รายละเอียดสินค้า")).toBeVisible();
  await page.getByRole("button", { name: /รายละเอียด/ }).click();
  await expect(page.getByText("รายละเอียดสินค้า")).toBeHidden();
});`,
  },
  "wait-api": {
    lang: "typescript",
    status: "verified",
    reason:
      'รันใน lab/solutions ด้วย PORT=3105 pnpm exec playwright test e2e/wait-api.spec.ts --reporter=list --project=chromium --no-deps ผ่าน 1 test (1.9s)',
    code: `import { test, expect } from "@playwright/test";

test("ข้อความต้องมาหลังโหลดเสร็จ โดยไม่ต้อง sleep", async ({ page }) => {
  await page.goto("/lessons/11-auto-waiting");
  await expect(page.getByText("ข้อมูลมาแล้ว")).toBeVisible();
});`,
  },
  "wait-loading": {
    lang: "typescript",
    status: "verified",
    reason:
      'รันใน lab/solutions ด้วย PORT=3105 pnpm exec playwright test e2e/wait-loading.spec.ts --reporter=list --project=chromium --no-deps ผ่าน 1 test (1.9s)',
    code: `import { test, expect } from "@playwright/test";

test("กำลังโหลดต้องหายไปเมื่อข้อมูลมา", async ({ page }) => {
  await page.goto("/lessons/11-auto-waiting");
  await expect(page.getByText("กำลังโหลด...")).toBeVisible();
  await expect(page.getByText("กำลังโหลด...")).toBeHidden();
  await expect(page.getByText("ข้อมูลมาแล้ว")).toBeVisible();
});`,
  },
  "slow-timeout": {
    lang: "typescript",
    status: "verified",
    reason:
      'รันใน lab/solutions ด้วย PORT=3105 pnpm exec playwright test e2e/timeout.spec.ts --reporter=list --project=chromium --no-deps ผ่าน 1 test (2.0s)',
    code: `import { test, expect } from "@playwright/test";

test("รอนานขึ้นเฉพาะจุด", async ({ page }) => {
  await page.goto("/lessons/11-auto-waiting");
  await expect(page.getByText("ข้อมูลมาแล้ว")).toBeVisible({ timeout: 10_000 });
});`,
  },
  "poll-status": {
    lang: "typescript",
    status: "verified",
    reason:
      'รันใน lab/solutions ด้วย PORT=3105 pnpm exec playwright test e2e/poll.spec.ts --reporter=list --project=chromium --no-deps ผ่าน 1 test (1.7s)',
    code: `import { test, expect } from "@playwright/test";

test("poll รอสถานะจาก API", async ({ page, request }) => {
  await page.goto("/lessons/11-auto-waiting");
  await expect
    .poll(async () => {
      const res = await request.get("/api/lessons/11-auto-waiting/message");
      return (await res.json()).message;
    })
    .toBe("ข้อมูลมาแล้ว");
});`,
  },
};

export const outputs: Record<string, Block> = {
  "detail-panel": {
    lang: "text",
    info: "text",
    text: `Running 1 test using 1 worker

  1 passed (970ms)`,
  },
  "wait-api": {
    lang: "text",
    info: "text",
    text: `Running 1 test using 1 worker

  1 passed (2.7s)`,
  },
  "wait-loading": {
    lang: "text",
    info: "text",
    text: `Running 1 test using 1 worker

  1 passed (2.7s)`,
  },
  "slow-timeout": {
    lang: "text",
    info: "text",
    text: `Running 1 test using 1 worker

  1 passed (2.7s)`,
  },
};
