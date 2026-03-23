// Most of the time, web pages show information asynchronously, and using non-retrying assertions can lead to a flaky test.

import {expect, test} from '@playwright/test';

test('assertions in Playwright', async ({page}) => {

    await page.goto('https://demowebshop.tricentis.com/');
/*
   // Hard Assertions - auto-retrying assertions - auto-wait works - when an assertion fails, the test will stop executing further steps and will be marked as failed immediately.
   // This is useful when you want to ensure that a critical condition is met before proceeding with the rest of the test.
    await expect(page).toHaveTitle('Demo Web Shop'); // Assertion to verify that the page title is as expected
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/'); // Assertion to verify that the page has navigated to the expected URL

    const logo=await page.locator("img[alt='Tricentis Demo Web Shop']");// Click on the logo to navigate back to the home page
    await expect(logo).toBeVisible(); // Assertion to verify that the logo is visible on the page
*/
    // Soft Assertions -
    await expect.soft(page).toHaveTitle('Demo Web Shop'); // Assertion to verify that the page title is as expected
    await expect.soft(page).toHaveURL('https://demowebshop.tricentis.com/'); // Assertion to verify that the page has navigated to the expected URL

    const logo=await page.locator("img[alt='Tricentis Demo Web Shop']");// Click on the logo to navigate back to the home page
    await expect.soft(logo).toBeVisible(); // Assertion to verify that the logo is visible on the page

    await page.waitForTimeout(5000); // Wait for 5 seconds to observe the changes before closing the browser


});