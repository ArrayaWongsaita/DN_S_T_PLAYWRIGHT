import type { Block, Listing, PartMeta } from '../components/types';

export const meta: PartMeta = {
  "course": "playwright",
  "part": 9,
  "slug": "login-and-full-flow",
  "title": "login ครั้งเดียวและเทสทั้ง flow",
  "language": "th",
  "slideCount": 27
};

// Code the slides show, with its real output: name -> listing, name -> output.
export const listings: Record<string, Listing> = {
  "config-projects": {
    lang: "typescript",
    status: "verified",
    reason: "คัดจาก playwright.config.ts ของ lab/solutions ที่ใช้รันเทสทั้งหมด (setup + chromium) จริงด้วย PORT=3109",
    code: `projects: [
  { name: "setup", testMatch: /auth\\.setup\\.ts/ },
  {
    name: "chromium",
    use: { ...devices["Desktop Chrome"] },
    dependencies: ["setup"],
  },
],`,
  },
  "login-storagestate": {
    lang: "typescript",
    status: "verified",
    reason: "รัน PORT=3109 pnpm exec playwright test e2e/shop/17-login-storagestate.spec.ts --reporter=list --project=chromium --workers=1 ผ่าน 3 (setup 1 + chromium 2)",
    code: `import { test, expect } from "@playwright/test";

test.describe("ใช้ session ที่ login ไว้แล้ว", () => {
  test.use({ storageState: "playwright/.auth/user.json" });

  test("เข้า checkout ได้เลยโดยไม่ถูกส่งไปหน้า login", async ({ page }) => {
    await page.goto("/shop/checkout");
    await expect(page).toHaveURL(/\\/shop\\/checkout$/);
    await expect(page.getByRole("heading", { name: "ชำระเงิน" })).toBeVisible();
  });
});

test.describe("ไม่ได้ login", () => {
  test("ไม่ได้ login เข้า checkout ต้องถูกส่งไปหน้า login", async ({ page }) => {
    await page.goto("/shop/checkout");
    await expect(page).toHaveURL(/\\/shop\\/login/);
  });
});`,
  },
  "full-flow": {
    lang: "typescript",
    status: "verified",
    reason: "รัน PORT=3109 PLAYWRIGHT_LIST_PRINT_STEPS=1 pnpm exec playwright test e2e/shop/18-full-flow.spec.ts --reporter=list --project=chromium ผ่าน 2 (setup 1 + flow 1) และเห็น step 2.1-2.5",
    code: `import { test, expect } from "./fixtures";

test("เลือกสินค้า -> ตะกร้า -> login -> สั่งซื้อสำเร็จ", async ({ page, productList, cart, loginPage }) => {
  await test.step("เลือกชากับกาแฟ", async () => {
    await productList.goto();
    await productList.add("ชา");
    await productList.add("กาแฟ");
  });

  await test.step("ตรวจตะกร้า", async () => {
    await productList.cartLink.click();
    await expect(cart.total).toHaveText("รวม ฿130");
  });

  await test.step("ไปชำระเงินแต่ยังไม่ login จึงถูกส่งไปหน้า login", async () => {
    await cart.checkout();
    await expect(page).toHaveURL(/\\/shop\\/login\\?next=\\/shop\\/checkout/);
  });

  await test.step("login แล้วกลับมาหน้า checkout", async () => {
    await loginPage.login("demo", "1234");
    await expect(page).toHaveURL(/\\/shop\\/checkout$/);
  });

  await test.step("ยืนยันการสั่งซื้อ ตะกร้าต้องว่าง", async () => {
    await page.getByRole("button", { name: "ยืนยันการสั่งซื้อ" }).click();
    await expect(page.getByText("สั่งซื้อสำเร็จ")).toBeVisible();
    await cart.goto();
    await expect(page.getByText("ตะกร้าว่างเปล่า")).toBeVisible();
  });
});`,
  },
  "special-dialog": {
    lang: "typescript",
    status: "verified",
    reason: "รัน PORT=3109 pnpm exec playwright test e2e/dialog.spec.ts --reporter=list --project=chromium --no-deps ผ่าน 1",
    code: `import { test, expect } from "@playwright/test";

test("dialog: รับ alert แล้วไปต่อ", async ({ page }) => {
  await page.setContent(\`<button onclick="alert('ลบสินค้าไหม')">ลบ</button>\`);
  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe("ลบสินค้าไหม");
    await dialog.accept();
  });
  await page.getByRole("button", { name: "ลบ" }).click();
});`,
  },
  "special-popup": {
    lang: "typescript",
    status: "verified",
    reason: "รัน PORT=3109 pnpm exec playwright test e2e/popup.spec.ts --reporter=list --project=chromium --no-deps ผ่าน 1",
    code: `import { test, expect } from "@playwright/test";

test("popup: รอแท็บใหม่แล้วตรวจในแท็บนั้น", async ({ page }) => {
  await page.setContent(\`<button onclick="window.open('about:blank')">เปิดตะกร้า</button>\`);
  const popupPromise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "เปิดตะกร้า" }).click();
  const popup = await popupPromise;
  await popup.setContent("<h1>ตะกร้าของฉัน</h1>");
  await expect(popup.getByRole("heading", { name: "ตะกร้าของฉัน" })).toBeVisible();
});`,
  },
  "special-iframe": {
    lang: "typescript",
    status: "verified",
    reason: "รัน PORT=3109 pnpm exec playwright test e2e/iframe.spec.ts --reporter=list --project=chromium --no-deps ผ่าน 1",
    code: `import { test, expect } from "@playwright/test";

test("iframe: หา element ในกรอบ", async ({ page }) => {
  await page.setContent(\`<iframe srcdoc="<button>ยืนยันคำสั่งซื้อ</button>"></iframe>\`);
  const frame = page.frameLocator("iframe");
  await frame.getByRole("button", { name: "ยืนยันคำสั่งซื้อ" }).click();
  await expect(frame.getByRole("button", { name: "ยืนยันคำสั่งซื้อ" })).toBeVisible();
});`,
  },
  "special-download": {
    lang: "typescript",
    status: "verified",
    reason: "รัน PORT=3109 pnpm exec playwright test e2e/download.spec.ts --reporter=list --project=chromium --no-deps ผ่าน 1",
    code: `import { test, expect } from "@playwright/test";

test("download: รอไฟล์แล้วตรวจชื่อ", async ({ page }) => {
  await page.setContent(\`<a download="report.txt" href="data:text/plain,hello">ดาวน์โหลด</a>\`);
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: "ดาวน์โหลด" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("report.txt");
});`,
  },
};

export const outputs: Record<string, Block> = {
  "login-storagestate": {
    lang: "text",
    info: "text",
    text: `  ✓  1 [setup] › e2e/shop/auth.setup.ts:5:1 › login แล้วเก็บ storageState (251ms)
  ✓  2 [chromium] › e2e/shop/17-login-storagestate.spec.ts:6:3 › ใช้ session ที่ login ไว้แล้ว › เข้า checkout ได้เลยโดยไม่ถูกส่งไปหน้า login (174ms)
  ✓  3 [chromium] › e2e/shop/17-login-storagestate.spec.ts:14:3 › ไม่ได้ login › ไม่ได้ login เข้า checkout ต้องถูกส่งไปหน้า login (123ms)

  3 passed (1.6s)`,
  },
  "full-flow": {
    lang: "text",
    info: "text",
    text: `  ✓  1 [setup] › e2e/shop/auth.setup.ts:5:1 › login แล้วเก็บ storageState (238ms)
     2.1 [chromium] › 18-full-flow.spec.ts:3:1 › … › เลือกชากับกาแฟ (128ms)
     2.2 [chromium] › 18-full-flow.spec.ts:3:1 › … › ตรวจตะกร้า (63ms)
     2.3 [chromium] › 18-full-flow.spec.ts:3:1 › … › ไปชำระเงินแต่ยังไม่ login จึงถูกส่งไปหน้า login (67ms)
     2.4 [chromium] › 18-full-flow.spec.ts:3:1 › … › login แล้วกลับมาหน้า checkout (38ms)
     2.5 [chromium] › 18-full-flow.spec.ts:3:1 › … › ยืนยันการสั่งซื้อ ตะกร้าต้องว่าง (96ms)
  ✓  2 [chromium] › e2e/shop/18-full-flow.spec.ts:3:1 › เลือกสินค้า -> ตะกร้า -> login -> สั่งซื้อสำเร็จ (467ms)

  2 passed (1.8s)`,
  },
  "special-dialog": {
    lang: "text",
    info: "text",
    text: `  ✓  1 [chromium] › e2e/dialog.spec.ts:3:1 › dialog: รับ alert แล้วไปต่อ (133ms)

  1 passed (845ms)`,
  },
  "special-popup": {
    lang: "text",
    info: "text",
    text: `  ✓  1 [chromium] › e2e/popup.spec.ts:3:1 › popup: รอแท็บใหม่แล้วตรวจในแท็บนั้น (158ms)

  1 passed (881ms)`,
  },
  "special-iframe": {
    lang: "text",
    info: "text",
    text: `  ✓  1 [chromium] › e2e/iframe.spec.ts:3:1 › iframe: หา element ในกรอบ (146ms)

  1 passed (860ms)`,
  },
  "special-download": {
    lang: "text",
    info: "text",
    text: `  ✓  1 [chromium] › e2e/download.spec.ts:3:1 › download: รอไฟล์แล้วตรวจชื่อ (111ms)

  1 passed (824ms)`,
  },
};
