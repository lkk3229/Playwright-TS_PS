import {test, expect, chromium} from '@playwright/test';

test('handle tabs in Playwright', async () => {

    const browser = await chromium.launch(); // Launch the Chromium browser
    const context = await browser.newContext();

    //Creating 2 pages
    const parentPage = await context.newPage(); // Create a new page within the browser context
    
    await parentPage.goto('https://testautomationpractice.blogspot.com/'); 

    // these two actions are performed in parallel, waiting for the new page to open after clicking the button that opens a new tab
    //context.waitForEvent('page');//pending, fulfilled, rejected
    //parentPage.locator("button:has-text('New Tab')").click();// Click the button to open a new tab/new page

    const [childPage] = await Promise.all([context.waitForEvent('page'),parentPage.locator("button:has-text('New Tab')").click()]);

    // Approch 1 : switch between pages and get titles
    const pages = context.pages(); // Get all the pages in the browser context
    console.log("Total pages in the context: ", pages.length); // Log the number of pages in the context

    console.log("Title of the parent page: ", await pages[0].title()); // Log the title of the parent page
    console.log("Title of the child page: ", await pages[1].title()); // Log the title of the child page

    // Approch 2 : directly get the title of the child page without switching to it
    console.log("Title of the Parent page: ", await parentPage.title()); // Log the title of the parent page
    console.log("Title of the Child page: ", await childPage.title()); // Log the title of the child page   
   




 


});