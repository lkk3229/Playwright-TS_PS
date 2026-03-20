import {test, expect, Locator} from "@playwright/test";

test('Reading data from all table pages - Pagination Table', async({page})=>{

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    let hasmorepages=true;

    while(hasmorepages)
    {
        const rows: Locator[] = await page.locator("#example tbody tr").all();

        for (let row of rows)
        {
            console.log(await row.innerText()); 
        }

        await page.waitForTimeout(3000);  // Wait for 3 seconds before navigating to the next page to ensure that the page has loaded completely
        
        //button[aria-label="Next"]  // CSS selector
        //button[aria-controls="example"]:has-text("›")  // Playwright selector
        //button[aria-controls="example"]:nth-child(9)  // Playwright selector

        const nextButton: Locator = page.locator('button[aria-label="Next"]');  // Locate the "Next" button using Playwright selector
        const isDisabled = await nextButton.getAttribute('class');  //dt-paging-button disabled next

        if(isDisabled?.includes("disabled"))            
        {
            hasmorepages = false;  // Set hasmorepages to false to exit the loop if the "Next" button is disabled, indicating there are no more pages to navigate
        }
        else
        {
            await nextButton.click(); // Click the "Next" button to navigate to the next page of the table
        }
    }

});
    test("Filter the rows and check the row count", async({page})=>{

        await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

        const dropdown: Locator = page.locator("#dt-length-0");
        await dropdown.selectOption({label: "25"});  // Select the option with the value "25" from the dropdown to filter the rows and display 25 rows per page

        //Approch 1
        const rows: Locator[] = await page.locator("#example tbody tr").all();
        expect(rows.length).toBe(25);  // Assert that the number of rows displayed on the page is equal to 25 after applying the filter

        // Approch 2
        const rows2 = page.locator("#example tbody tr");
        await expect(rows2).toHaveCount(25);  // Assert that the number of rows displayed on the page is equal to 25 using Playwright's toHaveCount assertion


 });

 test.only("search for specific data in table", async({page})=>{

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    const searchBox: Locator = page.locator('#dt-search-0');

    await searchBox.fill('Paul Byrd');  // Fill the search box with the specific data "Paul Byrd" to filter the table and display only the rows that contain this data

    await page.waitForTimeout(3000);  // Wait for 3 seconds to ensure that the table is updated with the search results before proceeding to check the table rows
    const rows: Locator[] = await page.locator("#example tbody tr").all();

    if(rows.length > 0)
    {
        let matchFound = false;  // Initialize a variable to track whether a match is found in the table rows
        console.log(`Data found in the table. Number of rows matching the search criteria: ${rows.length}`);  // Output a message indicating that the data was found in the table and display the number of rows that match the search criteria
        for(let row of rows)
        {
            const text = await row.innerText();  // Output the text content of each row that matches the search criteria
            if(text.includes("Paul Byrd"))
            {
                matchFound = true;  // Set matchFound to true if the specific data "Paul Byrd" is found in the row
                console.log(`Match found in the row: ${text}`);  // Output a message indicating that a match is found in the current row and display the text content of that row   
                break;  // Exit the loop once a match is found in the table rows
            }
        }
        //expect(matchFound).toBe(true);  // Assert that a match is found in the table rows, indicating that the specific data "Paul Byrd" is present in the table after applying the search filter
        expect(matchFound).toBeTruthy();  // Assert that a match is found in the table rows, indicating that the specific data "Paul Byrd" is present in the table after applying the search filter
    }
    else
    {
        console.log("Data not found in the table.");  // Output a message indicating that the data was not found in the table
    }
 });




