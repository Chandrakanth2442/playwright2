import { type Locator, type Page, expect } from "@playwright/test";

export class Tests {
  readonly page: Page;
  readonly _simpleFormDemoButton: Locator;
  readonly expect: TestsAssertions;
  readonly _enterMessage: Locator;
  readonly _getCheckedValue: Locator;

  constructor(page: Page) {
    this.page = page;
    this._simpleFormDemoButton = page.getByRole("link", {
      name: "Simple Form Demo",
    });
    this.expect = new TestsAssertions(this);
    this._enterMessage = page.getByPlaceholder("Please enter your Message");
    this._getCheckedValue = page.getByRole("button", {
      name: "Get Checked Value",
    });
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async click(locator: Locator) {
    await locator.click();
  }

  async enterValue(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }
}

export class TestsAssertions {
  private tests: Tests;

  constructor(tests: Tests) {
    this.tests = tests;
  }

  async pageIsNavigated(name: string): Promise<void> {
    await expect(this.tests.page).toHaveURL(new RegExp(name));
  }

  async textIsVisible(message: string): Promise<void> {
    await this.tests.page.waitForTimeout(5000);
    const textElement: Locator = this.tests.page.getByText(message, {
      exact: false,
    });
    await expect(textElement).toBeVisible();
  }
}
