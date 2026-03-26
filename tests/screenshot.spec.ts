import {test, expect} from '@playwright/test';
import { timeStamp } from 'node:console';

test('screenshot in Playwright', async ({page}) => {    

await page.goto('https://demowebshop.tricentis.com/'); // Navigate to the test page

const timeStamp=Date.now(); // Get the current timestamp to create a unique filename for the screenshot

// Take a screenshot of the visible part of the page and save it to the specified path
await page.screenshot({path: `screenshot/visible_part_screenshot_${timeStamp}.png`}); // This will capture only the visible part of the page in the viewport

// Take a screenshot of the entire page and save it to the specified path
await page.screenshot({path: `screenshot/full_page_screenshot_${timeStamp}.png`, fullPage: true}); // fullPage: true captures the entire page, including the parts that are not visible in the viewport

// Take a screenshot of a specific element and save it to the specified path
const elementLocator = page.locator('div[class="product-grid home-page-product-grid"]');
await elementLocator.screenshot({path: `screenshot/element_screenshot_${timeStamp}.png`}); // This will capture only the specified element on the page

// Take a screenshot of the page with a specific name and save it to the specified path
await page.screenshot({path: `screenshot/screenshot_with_name_${timeStamp}.png`}); // This will capture the entire page and save it with a specific name    


await page.waitForTimeout(5000); // Wait for 5 seconds to observe the changes before closing the browser



});

test.only('screenshot on failure by configuration in Playwright', async ({page}) => {

    await page.goto('https://demowebshop.tricentis.com/'); // Navigate to the test page

    // Intentionally failing assertion to trigger screenshot capture on failure
    await expect(page).toHaveTitle('Incorrect Title'); // This assertion will fail, and a screenshot will be captured if configured in the Playwright configuration file    
    await page.waitForTimeout(5000); // Wait for 5 seconds to observe the changes before closing the browser 
       
});