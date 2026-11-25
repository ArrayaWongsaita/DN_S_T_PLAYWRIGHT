import type { Block, Listing, PartMeta } from '../components/types';

export const meta: PartMeta = {
  "course": "playwright",
  "part": 2,
  "slug": "setup-nextjs",
  "title": "ติดตั้งและตั้งค่า Playwright กับ Next.js",
  "language": "th",
  "slideCount": 34
};

// Code the slides show, with its real output: name -> listing, name -> output.
export const listings: Record<string, Listing> = {
  "install": {
    lang: "bash",
    status: "verified",
    reason: "รันใน lab/fresh ด้วย pnpm create playwright --quiet --browser=chromium --lang=ts --no-browsers (create-playwright 1.17.139); output ตัด ANSI และ path แบบเต็มออก",
    code: `# npm: npm init playwright@latest
pnpm create playwright`,
  },
  "next-config": {
    lang: "typescript",
    status: "verified",
    reason: "รันใน lab/fresh ด้วย config เดียวกันโดยเปลี่ยนพอร์ตเป็น 3102 ตามกฎกันชน แล้ว pnpm exec playwright test ผ่าน 1 test",
    code: `import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "html",
  use: { baseURL: "http://localhost:3100", trace: "on-first-retry", screenshot: "only-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm dev --port 3100",
    url: "http://localhost:3100",
    reuseExistingServer: !process.env.CI, timeout: 120_000,
  },
});`,
  },
  "webserver-two": {
    lang: "typescript",
    status: "verified",
    reason: "รัน lab/fresh ทั้งสองแบบบนพอร์ต 3102: dev และ build+start ผ่าน 1 test",
    code: `// dev: starts fast
webServer: {
  command: "pnpm dev --port 3100",
  url: "http://localhost:3100",
},

// build + start: like production
webServer: {
  command: "pnpm build && pnpm start --port 3100",
  url: "http://localhost:3100",
},`,
  },
  "home-test": {
    lang: "typescript",
    status: "verified",
    reason: "รันใน lab/fresh ด้วย pnpm test:e2e e2e/home.spec.ts --reporter=list --project=chromium ผ่าน 1 test",
    code: `import { test, expect } from "@playwright/test";

test("หน้าแรกของแอปขึ้น", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /To get started/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Templates" })).toBeVisible();
});`,
  },
  "scripts": {
    lang: "json",
    status: "verified",
    reason: "เพิ่มสคริปต์ชุดนี้ใน lab/fresh แล้วรัน pnpm test:e2e ผ่าน 1 test; test:e2e:ui, test:e2e:headed และ report ไม่ได้รันเพราะเปิดหน้าต่าง",
    code: `"scripts": {
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui",
  "test:e2e:headed": "playwright test --headed",
  "report": "playwright show-report"
}`,
  },
};

export const outputs: Record<string, Block> = {
  "install": {
    lang: "text",
    info: "text",
    text: `Installing Playwright Test (pnpm add --save-dev -w @playwright/test)…
Writing playwright.config.ts.
Writing tests/example.spec.ts.
✔ Success!`,
  },
  "home-test": {
    lang: "text",
    info: "text",
    text: `Running 1 test using 1 worker

  ✓  1 [chromium] › e2e/home.spec.ts:3:1 › หน้าแรกของแอปขึ้น (226ms)
  1 passed (3.4s)`,
  },
};
