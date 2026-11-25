import type { Block, Listing, PartMeta } from '../components/types';

export const meta: PartMeta = {
  "course": "playwright",
  "part": 4,
  "slug": "actions",
  "title": "ลงมือทำกับหน้าเว็บ",
  "language": "th",
  "slideCount": 32
};

// Code the slides show, with its real output: name -> listing, name -> output.
export const listings: Record<string, Listing> = {
  "click-reset": {
    lang: "typescript",
    status: "verified",
    reason: "รันใน lab/solutions ด้วย PORT=3104 pnpm exec playwright test e2e/click.spec.ts --project=chromium --no-deps ผ่าน 1 test",
    code: `import { test, expect } from "@playwright/test";

test("กด +1 สองครั้งแล้วรีเซ็ต", async ({ page }) => {
  await page.goto("/lessons/04-click");
  await page.getByRole("button", { name: "+1" }).click();
  await page.getByRole("button", { name: "+1" }).click();
  await expect(page.getByText("Count: 2")).toBeVisible();
  await page.getByRole("button", { name: "รีเซ็ต" }).click();
  await expect(page.getByText("Count: 0")).toBeVisible();
});`,
  },
  "fill-greet": {
    lang: "typescript",
    status: "verified",
    reason: "รันใน lab/solutions ด้วย PORT=3104 pnpm exec playwright test e2e/fill.spec.ts --project=chromium --no-deps ผ่าน 1 test",
    code: `import { test, expect } from "@playwright/test";

test("กรอกชื่อแล้วกด ทักทาย", async ({ page }) => {
  await page.goto("/lessons/05-fill-form");
  await page.getByLabel("ชื่อ").fill("สมชาย");
  await page.getByRole("button", { name: "ทักทาย" }).click();
  await expect(page.getByText("สวัสดี, สมชาย")).toBeVisible();
});`,
  },
  "controls-enable": {
    lang: "typescript",
    status: "verified",
    reason: "รันใน lab/solutions ด้วย PORT=3104 pnpm exec playwright test e2e/controls.spec.ts --project=chromium --no-deps ผ่าน 1 test",
    code: `import { test, expect } from "@playwright/test";

test("ติ๊กแล้วปุ่มสมัครใช้ได้", async ({ page }) => {
  await page.goto("/lessons/06-checkbox-radio-select");
  const submit = page.getByRole("button", { name: "สมัคร" });
  await expect(submit).toBeDisabled();
  await page.getByLabel("ยอมรับเงื่อนไข").check();
  await expect(submit).toBeEnabled();
});`,
  },
  "hover-focus": {
    lang: "typescript",
    status: "verified",
    reason: "รันใน lab/solutions ด้วย PORT=3104 pnpm exec playwright test e2e/hover-focus.spec.ts --project=chromium --no-deps ผ่าน 1 test",
    code: `import { test, expect } from "@playwright/test";

test("hover เปิดเมนู และ focus ใส่ช่อง", async ({ page }) => {
  await page.setContent(\`<style>#popup{display:none}#menu:hover+#popup{display:block}</style>
    <button id="menu">เมนู</button><div id="popup">ตัวเลือก</div><input id="name" aria-label="ชื่อ" />\`);
  await page.getByRole("button", { name: "เมนู" }).hover();
  await expect(page.getByText("ตัวเลือก")).toBeVisible();
  await page.getByLabel("ชื่อ").focus();
  await expect(page.getByLabel("ชื่อ")).toBeFocused();
});`,
  },
  "upload-file": {
    lang: "typescript",
    status: "verified",
    reason: "รันใน lab/solutions ด้วย PORT=3104 pnpm exec playwright test e2e/upload.spec.ts --project=chromium --no-deps ผ่าน 1 test",
    code: `import { test } from "@playwright/test";

test("อัปโหลดไฟล์เข้า input", async ({ page }) => {
  await page.setContent(\`<input type="file" aria-label="ไฟล์" />\`);
  const file = page.getByLabel("ไฟล์");
  await file.setInputFiles("e2e/data.txt");
  console.log(await file.evaluate((el) => (el as HTMLInputElement).files![0].name));
});`,
  },
  "drag-drop": {
    lang: "typescript",
    status: "verified",
    reason: "รันใน lab/solutions ด้วย PORT=3104 pnpm exec playwright test e2e/drag.spec.ts --project=chromium --no-deps ผ่าน 1 test",
    code: `import { test, expect } from "@playwright/test";

test("ลากการ์ดไปวาง", async ({ page }) => {
  await page.setContent(\`<div id="src" draggable="true">การ์ด</div><div id="dst">ที่วาง</div>
    <script>src.ondragstart = (e) => e.dataTransfer.setData("text", "x");
      dst.ondragover = (e) => e.preventDefault();
      dst.ondrop = () => (dst.textContent = "วางแล้ว");</script>\`);
  await page.getByText("การ์ด").dragTo(page.getByText("ที่วาง"));
  await expect(page.getByText("วางแล้ว")).toBeVisible();
});`,
  },
};

export const outputs: Record<string, Block> = {
  "click-reset": {
    lang: "text",
    info: "text",
    text: `  ✓  1 [chromium] › e2e/click.spec.ts:3:1 › กด +1 สองครั้งแล้วรีเซ็ต (226ms)

  1 passed (945ms)`,
  },
  "fill-greet": {
    lang: "text",
    info: "text",
    text: `  ✓  1 [chromium] › e2e/fill.spec.ts:3:1 › กรอกชื่อแล้วกด ทักทาย (188ms)

  1 passed (912ms)`,
  },
  "controls-enable": {
    lang: "text",
    info: "text",
    text: `  ✓  1 [chromium] › e2e/controls.spec.ts:3:1 › ติ๊กแล้วปุ่มสมัครใช้ได้ (195ms)

  1 passed (917ms)`,
  },
  "hover-focus": {
    lang: "text",
    info: "text",
    text: `  ✓  1 [chromium] › e2e/hover-focus.spec.ts:3:1 › hover เปิดเมนู และ focus ใส่ช่อง (181ms)

  1 passed (925ms)`,
  },
  "upload-file": {
    lang: "text",
    info: "text",
    text: `data.txt
  ✓  1 [chromium] › e2e/upload.spec.ts:3:1 › อัปโหลดไฟล์เข้า input (110ms)

  1 passed (832ms)`,
  },
  "drag-drop": {
    lang: "text",
    info: "text",
    text: `  ✓  1 [chromium] › e2e/drag.spec.ts:3:1 › ลากการ์ดไปวาง (233ms)

  1 passed (997ms)`,
  },
  "select-error": {
    lang: "text",
    info: "text",
    text: `locator.fill: Error: Element is not an <input>, <textarea> or [contenteditable] element
    - locator resolved to <select>…</select>`,
  },
};
