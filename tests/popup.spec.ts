import {test} from '@playwright/test';

test('handle popups in Playwright', async ({browser}) => {

    const context = await browser.newContext(); // Create a new browser context
    const page = await context.newPage(); // Create a new page within the browser context

    await page.goto('https://testautomationpractice.blogspot.com/'); // Navigate to the test page

    // Multiple pop ups

    //await page.waitForEvent('popup');
    //await page.locator('#PopUp').click(); // Click the button to trigger the pop-up

    await Promise.all([
        page.waitForEvent('popup'), // Wait for the first pop-up event to occur
        page.locator('#PopUp').click() // Click the button to trigger pop-up windows
    ]);

    await page.waitForTimeout(1500); // Give additional pop-ups time to open

    const allPopUpWindows = context.pages(); // Get all the pages (including pop-ups) in the browser context
    console.log(`Total pop-up windows opened: ${allPopUpWindows.length}`); // Log the number of pop-up windows (including the main page)

    // Log every opened page URL (main page + pop-ups)
    for (const popupPage of allPopUpWindows) {
        console.log(popupPage.url());
    }

    for(const pw of allPopUpWindows) {
        const title = await pw.title(); // Get the title of each pop-up window
      if(title.includes("Playwright")) {  
        await pw.locator('.getStarted_Sjon').click(); // Interact with an element in the pop-up window that contains "Playwright" in its title
       await pw.waitForTimeout(2000); // Wait for 2 seconds to observe the changes before closing the pop-up window
        //Perform any action....
       
        await pw.close();  //this will close playwright website pop up
    }
    }
    await page.waitForTimeout(5000); // Wait for 5 seconds to observe the changes before closing the browser

});
