import {test, expect, Locator} from "@playwright/test";

test("Dynamic XPath in Playwright", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    // loop to click the button 5 times
    for(let i=1; i<=5; i++) 
    {
        const button:Locator = page.locator(`//button[text()='Click Me ${i}']`);
        await button.click();

        await page.waitForTimeout(2000);   // to wait for 2 seconds after clicking the button
    }

});
  