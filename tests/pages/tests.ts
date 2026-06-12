import { type Locator, type Page, expect } from "@playwright/test";

export class Tests {
  readonly page: Page;
  readonly _simpleFormDemoButton: Locator;
  readonly expect: TestsAssertions;

  // Scenario 1 Locators
  readonly _enterMessage: Locator;
  readonly _getCheckedValue: Locator;

  // Scenario 2 Locators
  readonly _dragAndDropSlider: Locator;
  readonly _defaultValueSlider: Locator;
  readonly _sliderOutputValue: Locator;

  // Scenario 3 Locators
  readonly _inputFormButton: Locator;
  readonly _inputFormSubmitButton: Locator;
  readonly _name: Locator;
  readonly _email: Locator;
  readonly _password: Locator;
  readonly _company: Locator;
  readonly _website: Locator;
  readonly _country: Locator;
  readonly _city: Locator;
  readonly _address1: Locator;
  readonly _address2: Locator;
  readonly _state: Locator;
  readonly _zipCode: Locator;
  readonly _thankYouMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.expect = new TestsAssertions(this);

    this._simpleFormDemoButton = page.getByRole("link", {
      name: "Simple Form Demo",
    });
    this._enterMessage = page.getByPlaceholder("Please enter your Message");
    this._getCheckedValue = page.getByRole("button", {
      name: "Get Checked Value",
    });

    // Scenario 2
    this._dragAndDropSlider = page.getByRole("link", {
      name: "Drag & Drop Sliders",
    });
    this._defaultValueSlider = page.locator("#slider3").getByRole("slider");
    this._sliderOutputValue = page.locator("#rangeSuccess");

    // Scenario 3
    this._inputFormButton = page.getByRole("link", {
      name: "Input Form Submit",
    });
    this._inputFormSubmitButton = page.getByRole("button", { name: "Submit" });
    this._name = page.getByPlaceholder("Name", { exact: true });
    this._email = page.getByPlaceholder("Email", { exact: true });
    this._password = page.getByPlaceholder("Password");
    this._company = page.getByPlaceholder("Company");
    this._website = page.getByPlaceholder("Website");
    this._country = page.getByRole("combobox");
    this._city = page.getByPlaceholder("City");
    this._address1 = page.getByPlaceholder("Address 1");
    this._address2 = page.getByPlaceholder("Address 2");
    this._state = page.getByPlaceholder("State");
    this._zipCode = page.getByPlaceholder("Zip code");
    this._thankYouMessage = page.getByText("Thanks for contacting us, we");
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

  async moveSliderWithKeyboard(
    locator: Locator,
    target: number,
    current: number,
  ): Promise<void> {
    await locator.focus();
    const steps = target - current;
    for (let i = 0; i < steps; i++) {
      await this.page.keyboard.press("ArrowRight");
    }
  }

  async getValidationMessage(locator: Locator): Promise<string> {
    return await locator.evaluate(
      (element: HTMLInputElement) => element.validationMessage,
    );
  }

  async selectDropdownByLabel(locator: Locator, label: string): Promise<void> {
    await locator.selectOption({ label: label });
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
    const textElement: Locator = this.tests.page.getByText(message, {
      exact: false,
    });
    await expect(textElement).toBeVisible();
  }

  async sliderValueEquals(expectedValue: string): Promise<void> {
    await expect(this.tests._sliderOutputValue).toHaveText(expectedValue);
  }

  async validationMessageIsEqualTo(
    locator: Locator,
    expectedMessage: string,
  ): Promise<void> {
    const actualMessage = await this.tests.getValidationMessage(locator);
    expect(actualMessage).toBe(expectedMessage);
  }

  async thanksMessageIsSeen(): Promise<void> {
    await expect(this.tests._thankYouMessage).toHaveText(
      "Thanks for contacting us, we will get back to you shortly.",
    );
  }
}
