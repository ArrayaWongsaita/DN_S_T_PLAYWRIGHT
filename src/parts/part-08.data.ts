import type { Block, Listing, PartMeta } from '../components/types';

export const meta: PartMeta = {
  "course": "playwright",
  "part": 8,
  "slug": "organize-tests",
  "title": "จัดโครงสร้างเทส",
  "language": "th",
  "slideCount": 28
};

// Code the slides show, with its real output: name -> listing, name -> output.
export const listings: Record<string, Listing> = {
  "compare-before": {
    lang: "typescript",
    status: "verified",
    reason: "รัน e2e/compare.spec.ts ที่ lab/solutions (PORT=3108) ผ่าน 2 เทส",
    code: `test("เพิ่มชา", async ({ page }) => {
  await page.goto("/shop");
  await page.getByRole("button", {
    name: "เพิ่ม ชา ลงตะกร้า",
  }).click();
  await expect(page.getByRole("link", {
    name: /^ตะกร้า/,
  })).toHaveText("ตะกร้า (1)");
});`,
  },
  "compare-after": {
    lang: "typescript",
    status: "verified",
    reason: "รัน e2e/compare.spec.ts ที่ lab/solutions (PORT=3108) ผ่าน 2 เทส",
    code: `test("เพิ่มชา", async ({ page }) => {
  const list = new ProductListPage(page);
  await list.goto();
  await list.add("ชา");
  await expect(list.cartLink)
    .toHaveText("ตะกร้า (1)");
});`,
  },
  "cart-page": {
    lang: "typescript",
    status: "verified",
    reason: "ไฟล์จริง e2e/shop/pages/CartPage.ts · p08-po.spec.ts เรียกใช้และผ่าน (PORT=3108)",
    code: `import type { Locator, Page } from "@playwright/test";

export class CartPage {
  readonly total: Locator;
  readonly items: Locator;

  constructor(private readonly page: Page) {
    this.total = page.getByText(/^รวม ฿/);
    this.items = page.getByRole("listitem");
  }

  async goto(): Promise<void> {
    await this.page.goto("/shop/cart");
  }

  async checkout(): Promise<void> {
    await this.page.getByRole("button", { name: "ไปชำระเงิน" }).click();
  }
}`,
  },
  "story-steps": {
    lang: "typescript",
    status: "verified",
    reason: "รัน e2e/story.spec.ts ที่ lab/solutions (PORT=3108) ผ่าน 1 เทส",
    code: `import { test, expect } from "@playwright/test";

test.describe("หน้าร้านค้า", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/shop");
  });

  test("เพิ่มชา + กาแฟ รวม ฿130", async ({ page }) => {
    await test.step("เพิ่มชา", () => page.getByRole("button", { name: "เพิ่ม ชา ลงตะกร้า" }).click());
    await test.step("เพิ่มกาแฟ", () => page.getByRole("button", { name: "เพิ่ม กาแฟ ลงตะกร้า" }).click());
    await test.step("ตรวจยอด", async () => {
      await page.getByRole("link", { name: /^ตะกร้า/ }).click();
      await expect(page.getByText("รวม ฿130")).toBeVisible();
    });
  });
});`,
  },
  "po-test": {
    lang: "typescript",
    status: "verified",
    reason: "รัน e2e/po.spec.ts ที่ lab/solutions (PORT=3108) ผ่าน 1 เทส",
    code: `import { test, expect } from "@playwright/test";
import { ProductListPage } from "../shop/pages/ProductListPage";
import { CartPage } from "../shop/pages/CartPage";

test("เพิ่มชา + กาแฟ รวม ฿130", async ({ page }) => {
  const list = new ProductListPage(page), cart = new CartPage(page);
  await list.goto();
  await list.add("ชา");
  await list.add("กาแฟ");
  await cart.goto();
  await expect(cart.total).toHaveText("รวม ฿130");
});`,
  },
  "fixtures-test": {
    lang: "typescript",
    status: "verified",
    reason: "รัน e2e/fixture.spec.ts ที่ import fixture จาก e2e/shop/fixtures.ts (PORT=3108) ผ่าน 1 เทส",
    code: `import { test, expect } from "./fixtures";

test("ใช้ fixture ได้เลย", async ({ productList, cart }) => {
  await productList.goto();
  await productList.add("นม");
  await expect(productList.cartLink).toHaveText("ตะกร้า (1)");
  await cart.goto();
  await expect(cart.total).toHaveText("รวม ฿40");
});`,
  },
  "wrong-import": {
    lang: "typescript",
    status: "verified",
    reason: "รัน e2e/wrong-import.spec.ts ที่ lab/solutions (PORT=3108) แล้วได้ error ตามที่แสดง",
    code: `import { test, expect } from "@playwright/test";

test("ใช้ productList จากที่ผิด", async ({ productList }) => {
  await productList.goto();
  await expect(productList.cartLink).toHaveText("ตะกร้า (1)");
});`,
  },
  "skip": {
    lang: "typescript",
    status: "verified",
    reason: "รัน e2e/skip.spec.ts ที่ lab/solutions (PORT=3108) แล้วขึ้น 2 skipped",
    code: `import { test } from "@playwright/test";

test("ปุ่มคูปอง", async ({ page }) => {
  test.skip(true, "ยังไม่มีคูปองในรอบนี้");
  await page.goto("/shop");
});

test.fixme("ใบเสร็จหลังชำระเงิน", async ({ page }) => {
  await page.goto("/shop/checkout");
});`,
  },
  "tag": {
    lang: "typescript",
    status: "verified",
    reason: "รัน e2e/tag.spec.ts ด้วย --grep @smoke ที่ lab/solutions (PORT=3108) ผ่านเฉพาะเทสที่ติด tag",
    code: `import { test, expect } from "@playwright/test";

test("เพิ่มชาลงตะกร้า", { tag: "@smoke" }, async ({ page }) => {
  await page.goto("/shop");
  await page.getByRole("button", { name: "เพิ่ม ชา ลงตะกร้า" }).click();
  await expect(page.getByRole("link", { name: "ตะกร้า (1)" })).toBeVisible();
});`,
  },
  "loop": {
    lang: "typescript",
    status: "verified",
    reason: "รัน e2e/loop.spec.ts ที่ lab/solutions (PORT=3108) ได้ 3 เทสจากข้อมูล 3 อย่าง",
    code: `import { test } from "@playwright/test";

const products = ["ชา", "กาแฟ", "นม"];

for (const name of products) {
  test(\`เพิ่ม \${name} ลงตะกร้า\`, async ({ page }) => {
    await page.goto("/shop");
    await page.getByRole("button", { name: \`เพิ่ม \${name} ลงตะกร้า\` }).click();
  });
}`,
  },
};

export const outputs: Record<string, Block> = {
  "story-steps": {
    lang: "text",
    info: "text",
    text: `  ✓  1 [setup] › e2e/shop/auth.setup.ts:5:1 › login แล้วเก็บ storageState (239ms)
  ✓  2 [chromium] › e2e/story.spec.ts:8:3 › หน้าร้านค้า › เพิ่มชา + กาแฟ รวม ฿130 (288ms)

  2 passed (1.6s)`,
  },
  "po-test": {
    lang: "text",
    info: "text",
    text: `  ✓  1 [setup] › e2e/shop/auth.setup.ts:5:1 › login แล้วเก็บ storageState (239ms)
  ✓  3 [chromium] › e2e/po.spec.ts:5:1 › เพิ่มชา + กาแฟ รวม ฿130 (255ms)

  2 passed (1.6s)`,
  },
  "fixtures-test": {
    lang: "text",
    info: "text",
    text: `  ✓  1 [setup] › e2e/shop/auth.setup.ts:5:1 › login แล้วเก็บ storageState (250ms)
  ✓  2 [chromium] › e2e/fixture.spec.ts:3:1 › ใช้ fixture ได้เลย (215ms)

  2 passed (1.5s)`,
  },
  "wrong-import": {
    lang: "text",
    info: "text",
    text: `Test has unknown parameter "productList".

   at wrong-import.spec.ts:3`,
  },
  "skip": {
    lang: "text",
    info: "text",
    text: `  -  2 [chromium] › e2e/skip.spec.ts:8:6 › ใบเสร็จหลังชำระเงิน
  -  3 [chromium] › e2e/skip.spec.ts:3:1 › ปุ่มคูปอง

  2 skipped`,
  },
  "tag": {
    lang: "text",
    info: "text",
    text: `  ✓  1 [setup] › e2e/shop/auth.setup.ts:5:1 › login แล้วเก็บ storageState (356ms)
  ✓  2 [chromium] › e2e/tag.spec.ts:3:1 › เพิ่มชาลงตะกร้า @smoke (176ms)

  2 passed (1.8s)`,
  },
  "loop": {
    lang: "text",
    info: "text",
    text: `  ✓  1 [setup] › e2e/shop/auth.setup.ts:5:1 › login แล้วเก็บ storageState (242ms)
  ✓  4 [chromium] › e2e/loop.spec.ts:6:3 › เพิ่ม นม ลงตะกร้า (222ms)
  ✓  3 [chromium] › e2e/loop.spec.ts:6:3 › เพิ่ม ชา ลงตะกร้า (236ms)
  ✓  2 [chromium] › e2e/loop.spec.ts:6:3 › เพิ่ม กาแฟ ลงตะกร้า (236ms)

  4 passed (1.6s)`,
  },
};
