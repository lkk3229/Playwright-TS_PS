/*
Ann iframe (short for "inline frame") is an HTML element that allows you to embed another HTML document within the current document.
It is commonly used to display content from another source, such as a different website or a different part of the same website, without having to navigate away from the current page.
*/

import { test, expect } from '@playwright/test';

test('Handling frames in Playwright', async ({ page }) => {

    await page.goto('https://ui.vision/demo/webtest/frames/');

    //total frames on the page
    const frames = page.frames();
    console.log(`Total frames on the page: ${frames.length}`);  
/*
// Approch 1: Using page.frame() method to access the frame by its name or URL
    const frame = page.frame({url:"https://ui.vision/demo/webtest/frames/frame_1.html"}); // Accessing the frame by its name
    
    if(frame)
        {
            await frame.locator("[name='myText1']").fill('Hello'); // Interacting with an element inside the frame
           // await frame.fill("[name='myText1']", 'Hello'); // Interacting with an element inside the frame
        }
    else
    {
        console.log("Frame not found");
    }

    await page.waitForTimeout(2000); // Wait for 2 seconds to observe the changes before closing the browser
*/
// Approch 2: Using frameLocator() method to directly interact with elements inside the frame without explicitly switching to it

    const inputbox = page.frameLocator("src='frame_1.html'").locator("[name='myText1']"); // Locating the frame using its src attribute
    await inputbox.fill('Hello'); // Interacting with the element inside the frame
    await page.waitForTimeout(5000);


});

test.only('innerframes/child frames in Playwright', async ({ page }) => {

    await page.goto('https://ui.vision/demo/webtest/frames/');

    const frame3=page.frame({url:"https://ui.vision/demo/webtest/frames/frame_3.html"});

    if(frame3)
    {
        await frame3.locator("[name='myText3']").fill('Hello from frame 3'); // Interacting with an element inside the inner frame
        const childFrames = frame3.childFrames();
        console.log("Total child frames inside frame 3: ",childFrames.length); // Log the number of child frames inside frame 3
        const radio=childFrames[0].getByLabel("I am a human");
        await radio.check(); // Interacting with an element inside the child frame
        await expect(radio).toBeChecked(); // Assertion to verify that the radio button is checked
    
    
    }
    else    {
        console.log("Frame 3 not found");
    }
 
    await page.waitForTimeout(5000); // Wait for 5 seconds to observe the changes before closing the browser





});
