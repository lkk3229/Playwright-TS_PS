import {test, expect, chromium} from '@playwright/test';

test('handle popups in Playwright', async ({browser}) => {

    const context = await browser.newContext(); // Create a new browser context
    const page = await context.newPage(); // Create a new page within the browser context

    await page.goto('https://testautomationpractice.blogspot.com/'); // Navigate to the test page

    // Multiple pop ups
    






});
