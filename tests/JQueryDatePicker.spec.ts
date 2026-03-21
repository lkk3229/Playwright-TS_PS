import {test, expect, Locator} from "@playwright/test"

async function selectDate(targetYear:string,  targetMonth:string, targetDate:string, page:Page, isFuture:boolean)
{

 while(true)
        {
           const currentMonth = await page.locator('.ui-datepicker-month').textContent();
           const currentYear = await page.locator('.ui-datepicker-year').textContent();

           if(currentMonth === targetMonth && currentYear === targetYear)
          {
            break; // Desired month and year found, exit the loop
           }

            if(isFuture)
            {
           //Future Date
           await page.locator('.ui-datepicker-next').click(); // Click the "Next" button to navigate to the next month
            }
            else
            {
           //Past Date
           await page.locator('.ui-datepicker-prev').click(); // Click the "Previous" button to navigate to the previous month
            }
           // await page.waitForTimeout(2000);
        }

        const allDate=await page.locator(".ui-datepicker-calendar td").all(); // Click on the target date in the calendar

        for(let dt of allDate)
        {
            const dateText = await dt.textContent();
            if(dateText === targetDate)
            {
                await dt.click(); // Click on the target date
                break;
            }
        }

}

test("JQuery date Picker", async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    const dateInput: Locator = page.locator("#datepicker");
    expect(dateInput).toBeVisible();

    // Approach 1-using fill() method
    //await dateInput.fill("10/20/2027");   //mm/dd/yyyy format


    // Approach 2, 
    await dateInput.click(); // Click on the date input field to open the date picker

    // select future date from calendar
   // const date = "20"; // Target date to select
   // const month= "October"; // Target month to select
    //const year= "2027"; // Target year to select

    // select past date from calendar
   const date = "20"; // Target date to select
   const month= "October"; // Target month to select
   const year= "2023"; // Target year to select

    await selectDate(year, month, date, page, false); // Call the selectDate function to select the target date
    // false - past date, true - future date

    const expectedDate = "10/20/2023"; // Expected date format in the input field
    await expect(dateInput).toHaveValue(expectedDate); // Assert that the input field has the expected date value
    await page.waitForTimeout(5000); // Wait for 5 seconds to observe the filled date

});

