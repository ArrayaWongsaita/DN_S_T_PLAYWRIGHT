import type { Block, Listing, PartMeta } from '../components/types';

export const meta: PartMeta = {
  "course": "playwright",
  "part": 7,
  "slug": "network-mock",
  "title": "จำลอง API และสถานะต่างๆ",
  "language": "th",
  "slideCount": 24
};

// Code the slides show, with its real output: name -> listing, name -> output.
export const listings: Record<string, Listing> = {
  "mock-one": {
    lang: "typescript",
    status: "verified",
    reason:
      "รัน pnpm exec playwright test e2e/mock-one.spec.ts --reporter=list --project=chromium --no-deps (PORT=3107) ผ่าน 1 test",
    code: `import { test, expect } from "@playwright/test";

test("mock ให้เหลือ นม ชิ้นเดียว", async ({ page }) => {
  await page.route("**/api/lessons/12-mock-api/products", (route) =>
    route.fulfill({ json: [{ id: 9, name: "นม" }] }),
  );
  await page.goto("/lessons/12-mock-api");
  await expect(page.getByRole("listitem")).toHaveCount(1);
  await expect(page.getByText("นม")).toBeVisible();
});`,
  },
  "states": {
    lang: "typescript",
    status: "verified",
    reason:
      "รัน pnpm exec playwright test e2e/states.spec.ts --reporter=list --project=chromium --no-deps (PORT=3107) ผ่าน 3 tests",
    code: `import { test, expect } from "@playwright/test";

const api = "**/api/lessons/12-mock-api/products";
const url = "/lessons/13-error-empty-loading";

test("API ล้มเหลว (500) ต้องเห็น เกิดข้อผิดพลาด", async ({ page }) => {
  await page.route(api, (route) => route.fulfill({ status: 500 }));
  await page.goto(url);
  await expect(page.getByText("เกิดข้อผิดพลาด")).toBeVisible();
});

test("API คืนรายการว่าง ต้องเห็น ไม่มีสินค้า", async ({ page }) => {
  await page.route(api, (route) => route.fulfill({ json: [] }));
  await page.goto(url);
  await expect(page.getByText("ไม่มีสินค้า")).toBeVisible();
});

test("ระหว่างรอ API ต้องเห็น กำลังโหลด... แล้วค่อยเห็นสินค้า", async ({ page }) => {
  await page.route(api, async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    await route.fulfill({ json: [{ id: 1, name: "ชา" }] });
  });
  await page.goto(url);
  await expect(page.getByText("กำลังโหลด...")).toBeVisible();
  await expect(page.getByText("ชา")).toBeVisible();
});`,
  },
  "request-check": {
    lang: "typescript",
    status: "verified",
    reason:
      "รัน pnpm exec playwright test e2e/request-check.spec.ts --reporter=list --project=chromium --no-deps (PORT=3107) ผ่าน 1 test",
    code: `import { test, expect } from "@playwright/test";

test("หน้าเว็บต้องเรียก API products", async ({ page }) => {
  const request = page.waitForRequest("**/api/lessons/12-mock-api/products");
  await page.goto("/lessons/12-mock-api");
  expect((await request).method()).toBe("GET");
});`,
  },
  "abort": {
    lang: "typescript",
    status: "verified",
    reason:
      "รัน pnpm exec playwright test e2e/abort.spec.ts --reporter=list --project=chromium --no-deps (PORT=3107) ผ่าน 1 test",
    code: `import { test, expect } from "@playwright/test";

test("เน็ตล่ม: หน้าเห็น เกิดข้อผิดพลาด", async ({ page }) => {
  await page.route("**/api/lessons/12-mock-api/products", (route) => route.abort());
  await page.goto("/lessons/12-mock-api");
  await expect(page.getByText("เกิดข้อผิดพลาด")).toBeVisible();
});`,
  },
  "fetch": {
    lang: "typescript",
    status: "verified",
    reason:
      "รัน pnpm exec playwright test e2e/fetch.spec.ts --reporter=list --project=chromium --no-deps (PORT=3107) ผ่าน 1 test",
    code: `import { test, expect } from "@playwright/test";

test("ดึงของจริงมาแก้ก่อนส่ง", async ({ page }) => {
  await page.route("**/api/lessons/12-mock-api/products", async (route) => {
    const items = await (await route.fetch()).json();
    await route.fulfill({ json: [{ ...items[0], name: "ชาเย็น" }] });
  });
  await page.goto("/lessons/12-mock-api");
  await expect(page.getByText("ชาเย็น")).toBeVisible();
});`,
  },
  "request-fixture": {
    lang: "typescript",
    status: "verified",
    reason:
      "รัน pnpm exec playwright test e2e/request-fixture.spec.ts --reporter=list --project=chromium --no-deps (PORT=3107) ผ่าน 1 test",
    code: `import { test, expect } from "@playwright/test";

test("เรียก API ตรงๆ ไม่ผ่านหน้า", async ({ request }) => {
  const res = await request.get("/api/lessons/12-mock-api/products");
  expect(res).toBeOK();
  expect(await res.json()).toHaveLength(2);
});`,
  },
};

export const outputs: Record<string, Block> = {
  "mock-one": {
    lang: "text",
    info: "text",
    text: `Running 1 test using 1 worker

  1 passed (894ms)`,
  },
  "states": {
    lang: "text",
    info: "text",
    text: `Running 3 tests using 3 workers

  3 passed (1.8s)`,
  },
  "request-check": {
    lang: "text",
    info: "text",
    text: `Running 1 test using 1 worker

  1 passed (876ms)`,
  },
  "abort": {
    lang: "text",
    info: "text",
    text: `Running 1 test using 1 worker

  1 passed (879ms)`,
  },
  "fetch": {
    lang: "text",
    info: "text",
    text: `Running 1 test using 1 worker

  1 passed (903ms)`,
  },
  "request-fixture": {
    lang: "text",
    info: "text",
    text: `Running 1 test using 1 worker

  1 passed (767ms)`,
  },
};
