import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.testmuai.com/selenium-playground/");
  await page
    .getByRole("listitem")
    .filter({ hasText: "Simple Form Demo" })
    .click();
  await page.getByRole("link", { name: "Simple Form Demo" }).click();
  await page
    .locator(
      'iframe[src="https://challenges.cloudflare.com/cdn-cgi/challenge-platform/h/g/turnstile/f/ov2/av0/rch/dvz4i/0x4AAAAAAADnPIDROrmt1Wwj/light/fbE/new/normal?lang=auto"]',
    )
    .contentFrame()
    .locator("body")
    .click();
  await page
    .locator(
      'iframe[src="https://challenges.cloudflare.com/cdn-cgi/challenge-platform/h/g/turnstile/f/ov2/av0/rch/r3ldf/0x4AAAAAAADnPIDROrmt1Wwj/light/fbE/new/normal?lang=auto"]',
    )
    .contentFrame()
    .locator("body")
    .click();
  await page.goto(
    "https://www.testmuai.com/selenium-playground/simple-form-demo/",
  );
  await page
    .locator(
      'iframe[src="https://challenges.cloudflare.com/cdn-cgi/challenge-platform/h/g/turnstile/f/ov2/av0/rch/tgf8b/0x4AAAAAAADnPIDROrmt1Wwj/light/fbE/new/normal?lang=auto"]',
    )
    .contentFrame()
    .locator("body")
    .click();
  await page.goto(
    "https://www.testmuai.com/selenium-playground/simple-form-demo/",
  );
  await page
    .locator(
      'iframe[src="https://challenges.cloudflare.com/cdn-cgi/challenge-platform/h/g/turnstile/f/ov2/av0/rch/j78qn/0x4AAAAAAADnPIDROrmt1Wwj/light/fbE/new/normal?lang=auto"]',
    )
    .contentFrame()
    .locator("body")
    .click();
});
