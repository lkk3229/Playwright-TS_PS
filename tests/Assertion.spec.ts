// Most of the time, web pages show information asynchronously, and using non-retrying assertions can lead to a flaky test.

import {expect, test} from '@playwright/test';

test('assertions in Playwright', async ({page}) => {

    await page.goto('https://demowebshop.tricentis.com/');

    //Auto-retrying assertions - auto-wait works
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/'); // Assertion to verify that the page has navigated to the expected URL
    
    // Auto-retrying assertions - auto-wait works
    await expect(page.locator('text=Welcome to our store')).toBeVisible(); // Assertion to verify that a specific text is visible on the page
    await expect(page.locator("div[class='product-grid home-page-product-grid'] strong")).toHaveText('Featured products'); // Assertion to verify that there are exactly 6 product items on the page

    // 2. Using non-retrying assertion - not recommended as it can lead to flaky tests
    const title=await page.title(); // Get the title of the page
    expect(title.includes('Demo Web Shop')).toBeTruthy(); // Assertion to verify that the page title is as expected

    const welcomeText=await page.locator('text=Welcome to our store').textContent(); // Get the text content of a specific element
    expect(welcomeText).toContain('Welcome'); // Assertion to verify that the text content is as expected

    //3. Negative matcher (applicable to both retrying and non-retrying assertions)
    await expect(page.locator('text=Welcme to our store')).not.toBeVisible(); // auto-retry
    expect(welcomeText).not.toContain('Helo'); // no auto-retry

    await page.waitForTimeout(5000); // Wait for 5 seconds to observe the changes before closing the browser

});