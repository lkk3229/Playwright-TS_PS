import {test, expect} from '@playwright/test';

test('auto waiting and forcing in Playwright', async ({page}) => {
 
    test.setTimeout(50000); // Set the test timeout to 50 seconds (50000 milliseconds) test timeout
    //test.slow(); // 90 sec (default is 30 sec) - marks the test as slow, which can be useful for tests that are expected to take longer than usual. It can help to prevent false positives in test results by allowing more time for the test to complete before it is marked as failed due to a timeout.
    await page.goto('https://demowebshop.tricentis.com/');


    //Assertion - auto-wait works
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/', {timeout: 10000}); // Assertion to verify that the page has navigated to the expected URL
    await expect(page.locator('text=Welcome to our store')).toBeVisible({timeout: 10000}); // Assertion to verify that a specific text is visible on the page

    // Actions - auto-wait works
    await page.locator('#small-searchterms').fill('laptop',{force:true}); // {force:true} is used to force the action even if the element is not in an interactable state (e.g., covered by another element, disabled, etc.)
    await page.locator('.button-1.search-box-button').click({force:true}); 

 // Most of the time, web pages show information asynchronously, and using non-retrying assertions can lead to a flaky test.


});