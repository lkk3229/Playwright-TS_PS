import {test, expect, Page, chromium, firefox, webkit} from '@playwright/test';

// Fixtures in Playwright are a powerful way to set up and tear down test environments, manage test data, and share common resources across multiple tests. They help in creating a consistent and reusable testing environment, making it easier to write and maintain tests. Fixtures can be used to initialize browser contexts, set up test data, or perform any necessary setup before running the tests. They can also be used to clean up resources after the tests have completed.
//=======================================================================================

// Browser ---> Context ---> Page

// Browser ---> chromium, firefox, webkit

// Contexts ---> we can have multiple context for multiple users/apps for the same browser
               // provide a way to operate multiple independent browser sessions.

// page ---> New tab, window, pop-up

test('Browser context demo in Playwright', async () => {

   const browser=await chromium.launch(); // Launch the Chromium browser
   // const browser=await chromium.launch({headless:false}); // Launch the Chromium browser in headed mode (with UI)

   //const browser=await firefox.launch({headless:false}); // Launch the Firefox browser in headed mode (with UI)

    //const browser=await webkit.launch({headless:false}); // Launch the WebKit browser in headed mode (with UI)

    const context = await browser.newContext(); // Create a new browser context
    
    // creating two pages within the same browser context to demonstrate isolation between them
    const page1 = await context.newPage(); // Create a new page within the browser context
    const page2 = await context.newPage(); // Create another page within the same browser context

    console.log("No of pages in the context: ", context.pages().length); // Log the number of pages in the context
   
    await page1.goto('https://testautomationpractice.blogspot.com/'); // Navigate to Google
    await expect(page1).toHaveTitle(/Automation Testing/); // Assertion to verify the page title contains "Google"
   
    await page2.goto('https://www.selenium.dev/'); // Navigate to Selenium
    await expect(page2).toHaveTitle(/Selenium/); // Assertion to verify the page title contains "Selenium"

    await page1.waitForTimeout(5000); // Wait for 5 seconds to observe the changes before closing the browser
    await page2.waitForTimeout(5000); // Wait for 5 seconds to observe the changes before closing the browser

});
