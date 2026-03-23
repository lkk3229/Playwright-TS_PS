import {expect, test} from '@playwright/test';

test('handle authenticated popups in Playwright', async ({browser}) => {

    const context = await browser.newContext({
                                                httpCredentials: {
                                                    username: 'admin',
                                                    password: 'admin'
                                                }
    }); // Create a new browser context with HTTP credentials
    
    const page = await context.newPage(); // Create a new page within the browser context

    // Approach 1: Embedding credentials in the URL to handle basic authentication pop-up

    //https://the-internet.herokuapp.com/basic_auth
    //https://admin:admin@the-internet.herokuapp.com/basic_auth
   /* await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth'); // Navigate to the test page

    await page.waitForLoadState(); // Wait for the page to load completely
    
    await expect(page.locator('text=Congratulations')).toBeVisible(); // Assertion to verify successful authentication by checking the presence of a specific text on the page
   
    await page.waitForTimeout(5000); // Wait for 5 seconds to observe the changes before closing the browser
*/

// Approach 2: Using HTTP credentials in the browser context to handle basic authentication pop-up
// 2nd Approch preferred.

    await page.goto('https://the-internet.herokuapp.com/basic_auth'); // Navigate to the test page
    await page.waitForLoadState(); // Wait for the page to load completely
    await expect(page.locator('text=Congratulations')).toBeVisible(); // Assertion to verify successful authentication by checking the presence of a specific text on the page
    await page.waitForTimeout(5000); // Wait for 5 seconds to observe the changes before closing the browser



});
