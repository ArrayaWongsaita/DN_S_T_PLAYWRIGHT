import type { Block, Listing, PartMeta } from '../components/types';

export const meta: PartMeta = {
  "course": "playwright",
  "part": 6,
  "slug": "run-and-debug",
  "title": "รันดูผลและแก้บั๊ก",
  "language": "th",
  "slideCount": 28
};

// Code the slides show, with its real output: name -> listing, name -> output.
export const listings: Record<string, Listing> = {
  "run-chapter": {
    lang: "bash",
    status: "verified",
    reason: "รัน pnpm test:e2e e2e/04-click --reporter=list --project=chromium (PORT=3106) ที่ lab/solutions ผ่าน 4 (setup 1 + chromium 3)",
    code: `pnpm test:e2e e2e/04-click`,
  },
  "grep-regex": {
    lang: "bash",
    status: "verified",
    reason: "รัน pnpm exec playwright test e2e/04-click --reporter=list --project=chromium -g \"กด +1\" (PORT=3106) แล้วขึ้น No tests found จริง",
    code: `pnpm test:e2e e2e/04-click -g "กด +1"`,
  },
  "trace-on": {
    lang: "typescript",
    status: "verified",
    reason: "รัน pnpm test:e2e e2e/09-report-and-trace --workers=1 --reporter=list --project=chromium (PORT=3106) ผ่าน 3 และได้ trace.zip ทุกเทส",
    code: `import { test, expect } from "@playwright/test";

test.use({ trace: "on" });

test.beforeEach(async ({ page }) => {
  await page.goto("/lessons/09-report-and-trace");
});

test("กด โหลด แล้วต้องเห็น พร้อมแล้ว", async ({ page }) => {
  await page.getByRole("button", { name: "โหลด" }).click();
  await expect(page.getByText("พร้อมแล้ว")).toBeVisible();
});

test("ก่อนกดต้องยังไม่เห็น พร้อมแล้ว", async ({ page }) => {
  await expect(page.getByText("พร้อมแล้ว")).toBeHidden();
});`,
  },
  "headed-ui": {
    lang: "bash",
    status: "unverified",
    reason: "รัน --headed แล้วผ่าน 3 เทสบนเครื่องจริง ส่วน --ui เป็นหน้าต่างโต้ตอบ ไม่ได้รันซ้ำ",
    code: `pnpm test:e2e:headed e2e/08-headed-and-ui-mode
pnpm test:e2e:ui`,
  },
  "pause": {
    lang: "typescript",
    status: "unverified",
    reason: "page.pause() เปิด Inspector และรอให้ผู้ใช้กดเล่นต่อ รันใน session headless นี้ไม่ได้",
    code: `import { test } from "@playwright/test";

test("ตรวจฟอร์มเอง", async ({ page }) => {
  await page.goto("/lessons/10-codegen-and-debug");
  await page.pause();
  await page.getByRole("button", { name: "สมัคร" }).click();
});`,
  },
};

export const outputs: Record<string, Block> = {
  "run-chapter": {
    lang: "text",
    info: "text",
    text: `Running 4 tests using 3 workers

  ✓  1 [setup] › e2e/shop/auth.setup.ts:5:1 › login แล้วเก็บ storageState (259ms)
  ✓  2 [chromium] › e2e/04-click/click.spec.ts:7:1 › เริ่มต้นต้องแสดง Count: 0 (201ms)
  ✓  3 [chromium] › e2e/04-click/click.spec.ts:11:1 › กด +1 สองครั้งต้องได้ Count: 2 (268ms)
  ✓  4 [chromium] › e2e/04-click/click.spec.ts:18:1 › กดรีเซ็ตต้องกลับเป็น Count: 0 (268ms)

  4 passed (2.2s)`,
  },
  "grep-regex": {
    lang: "text",
    info: "text",
    text: `Error: No tests found.
Make sure that arguments are regular expressions matching test files.
You may need to escape symbols like "$" or "*" and quote the arguments.`,
  },
  "trace-on": {
    lang: "text",
    info: "text",
    text: `  ✓  2 [chromium] › e2e/09-report-and-trace/trace.spec.ts:9:1 › กด โหลด แล้วต้องเห็น พร้อมแล้ว (176ms)

  3 passed (1.6s)
test-results/09-report-and-trace-trace-กด-โหลด-แล้วต้องเห็น-พร้อมแล้ว-chromium/trace.zip`,
  },
  "fail-count": {
    lang: "text",
    info: "text",
    text: `Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('listitem')
Expected: 4
Received: 3
Timeout:  5000ms`,
  },
};
