import { test, expect } from "@playwright/test";
import { Tests, TestsAssertions } from "../pages/tests";

test.describe("Test scenarios", () => {
  let testsPage: Tests;
  let testsAssertions: TestsAssertions;

  test.beforeEach(async ({ page, context }) => {
    // 1. Initialize your Page Objects
    testsPage = new Tests(page);
    testsAssertions = new TestsAssertions(testsPage);

    // 🟢 2. INJECT STEALTH SCRIPT: Overrides 'navigator.webdriver' on the active context
    await context.addInitScript(() => {
      Object.defineProperty(navigator, "webdriver", {
        get: () => undefined,
      });
    });
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("testing scenario 1", async () => {
    const message: string = "Welcome to TestMu AI";
    await testsPage.goto("https://www.testmuai.com/selenium-playground/");
    await testsPage.click(testsPage._simpleFormDemoButton);
    await testsPage.expect.pageIsNavigated("/simple-form-demo/");

    await testsPage.enterValue(testsPage._enterMessage, message);
    await testsPage.click(testsPage._getCheckedValue);
    await testsPage.expect.textIsVisible(message);
  });
});
