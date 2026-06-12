import { test } from "@playwright/test";
import { Tests, TestsAssertions } from "../pages/tests";

test.describe("Test scenarios", () => {
  let testsPage: Tests;
  let testsAssertions: TestsAssertions;

  test.beforeEach(async ({ page }) => {
    testsPage = new Tests(page);
    testsAssertions = new TestsAssertions(testsPage);

    await page.evaluate(
      (_) => {},
      `lambdatest_action: ${JSON.stringify({
        action: "setTestName",
        arguments: { name: test.info().title },
      })}`,
    );
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("Test Scenario 1", async () => {
    const message: string = "Welcome to TestMu AI";
    await testsPage.goto("https://www.testmuai.com/selenium-playground/");
    await testsPage.click(testsPage._simpleFormDemoButton);
    await testsPage.expect.pageIsNavigated("/simple-form-demo/");

    await testsPage.enterValue(testsPage._enterMessage, message);
    await testsPage.click(testsPage._getCheckedValue);
    await testsPage.expect.textIsVisible(message);
  });

  test("Test Scenario 2", async () => {
    await testsPage.goto("https://www.testmuai.com/selenium-playground/");
    await testsPage.click(testsPage._dragAndDropSlider);
    await testsPage.expect.pageIsNavigated("/drag-drop-range-sliders-demo/");
    await testsPage.moveSliderWithKeyboard(
      testsPage._defaultValueSlider,
      95,
      15,
    );
    await testsPage.expect.sliderValueEquals("95");
  });

  test("Test Scenario 3", async () => {
    await testsPage.goto("https://www.testmuai.com/selenium-playground/");
    await testsPage.click(testsPage._inputFormButton);
    await testsPage.expect.pageIsNavigated("/input-form-demo/");
    await testsPage.click(testsPage._inputFormSubmitButton);
    //name
    await testsPage.expect.validationMessageIsEqualTo(
      testsPage._name,
      "Please fill out this field.",
    );
    await testsPage.enterValue(testsPage._name, "John Doe");

    //email
    await testsPage.click(testsPage._inputFormSubmitButton);
    await testsPage.expect.validationMessageIsEqualTo(
      testsPage._email,
      "Please fill out this field.",
    );
    await testsPage.enterValue(testsPage._email, "johndoe@gmail.com");

    //password
    await testsPage.click(testsPage._inputFormSubmitButton);
    await testsPage.expect.validationMessageIsEqualTo(
      testsPage._password,
      "Please fill out this field.",
    );
    await testsPage.enterValue(testsPage._password, "password1234");

    //company
    await testsPage.click(testsPage._inputFormSubmitButton);
    await testsPage.expect.validationMessageIsEqualTo(
      testsPage._company,
      "Please fill out this field.",
    );
    await testsPage.enterValue(testsPage._company, "Playwright Software");

    //website
    await testsPage.click(testsPage._inputFormSubmitButton);
    await testsPage.expect.validationMessageIsEqualTo(
      testsPage._website,
      "Please fill out this field.",
    );
    await testsPage.enterValue(testsPage._website, "https://playwright.dev/");

    //country
    await testsPage.click(testsPage._inputFormSubmitButton);
    await testsPage.selectDropdownByLabel(testsPage._country, "United States");

    //City
    await testsPage.click(testsPage._inputFormSubmitButton);
    await testsPage.expect.validationMessageIsEqualTo(
      testsPage._city,
      "Please fill out this field.",
    );
    await testsPage.enterValue(testsPage._city, "California");

    //address1
    await testsPage.click(testsPage._inputFormSubmitButton);
    await testsPage.expect.validationMessageIsEqualTo(
      testsPage._address1,
      "Please fill out this field.",
    );
    await testsPage.enterValue(testsPage._address1, "123 Main Street");

    //address2
    await testsPage.click(testsPage._inputFormSubmitButton);
    await testsPage.expect.validationMessageIsEqualTo(
      testsPage._address2,
      "Please fill out this field.",
    );
    await testsPage.enterValue(testsPage._address2, "MS Building");

    //state
    await testsPage.click(testsPage._inputFormSubmitButton);
    await testsPage.expect.validationMessageIsEqualTo(
      testsPage._state,
      "Please fill out this field.",
    );
    await testsPage.enterValue(testsPage._state, "California");

    //zipCode
    await testsPage.click(testsPage._inputFormSubmitButton);
    await testsPage.expect.validationMessageIsEqualTo(
      testsPage._zipCode,
      "Please fill out this field.",
    );
    await testsPage.enterValue(testsPage._zipCode, "123_123");

    //submit and verify the message
    await testsPage.click(testsPage._inputFormSubmitButton);
    await testsPage.expect.thanksMessageIsSeen();
  });
});
