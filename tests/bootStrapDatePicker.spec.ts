import {test, expect, Locator} from "@playwright/test";

test ('Booking.com date Picker Test - Check-in and Check-out', async({page})=>{

    await page.goto("https://www.booking.com/");

    //Click on the date picker field to open calender
    await page.locator('[data-testid="searchbox-dates-container"]').click();

    // ======== Check-in date selection ===========
    let checkinYear: string = "2028";
    let checkinMonth: string = "June";
    let checkinDay: string = "25";

    //Navigate through the calender to find the desired check-in month and year
    while(true)
    {
        const checkInMonthYear = await page.locator('h3[aria-live="polite"]').nth(0).innerText(); // Get the month and year text of the first calendar
        const currentMonth = checkInMonthYear.split(" ")[0]; // Extract the month from the text
        const currentYear = checkInMonthYear.split(" ")[1]; // Extract the year from the text

        if(currentMonth === checkinMonth && currentYear === checkinYear)
        {
            break; // Desired month and year found, exit the loop
        }
        else{
            await page.locator('button[aria-label="Next month"]').click(); // Click the "Next" button to navigate to the next month
        }
    }

    // Select the specific check-in date
    let allDates = await page.locator('table.b8fcb0c66a tbody').nth(0).locator('td').all(); // Get all the date cells in the first calendar
    let checkinDateSelected = false;

    for(let date of allDates)
    {
        const dateText = await date.innerText(); // Get the date value from the "data-date" attribute
        if(dateText === checkinDay) {
            await date.click(); // Click on the desired check-in date
            checkinDateSelected = true;
            break; // Exit the loop after selecting the date
        }
    }

    // Assertion to confirm check-in date was selected
    expect(checkinDateSelected).toBeTruthy(); // Assert that the check-in date was successfully selected

    // ======== Check-out date selection ===========
    let checkoutYear: string = "2028";
    let checkoutMonth: string = "June";
    let checkoutDay: string = "30";

    // Navigate to the required check-out month and year
    while(true)
    {
        const checkOutMonthYear = await page.locator('h3[aria-live="polite"]').nth(1).innerText(); // Get the month and year text of the second calendar
        const currentMonth = checkOutMonthYear.split(" ")[0]; // Extract the month from the text
        const currentYear = checkOutMonthYear.split(" ")[1]; // Extract the year from the text
        if(currentMonth === checkoutMonth && currentYear === checkoutYear)
        {
            break; // Desired month and year found, exit the loop
        }
        else{
            await page.locator('button[aria-label="Next month"]').click(); // Click the "Next" button to navigate to the next month
        }
    } 

    // Select the specific check-out date
    allDates = await page.locator('table.b8fcb0c66a tbody').nth(1).locator('td').all(); // Get all the date cells in the second calendar
    let checkoutDateSelected = false;   

    for(let date of allDates)
    {
        const dateText = await date.innerText(); // Get the date value from the "data-date" attribute   
        if(dateText === checkoutDay) {
            await date.click(); // Click on the desired check-out date
            checkoutDateSelected = true;
            break; // Exit the loop after selecting the date
        }
    }

    // Assertion to confirm check-out date was selected
    expect(checkoutDateSelected).toBeTruthy(); // Assert that the check-out date was successfully selected

   await page.waitForTimeout(3000); // Wait for 3 seconds to observe the selected dates before closing the browser

});




