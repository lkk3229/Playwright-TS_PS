import { test, expect, Locator } from "@playwright/test";

test('Dynamic Table', async ({ page }) => {

    await page.goto("https://practice.expandtesting.com/dynamic-table");

    const table: Locator = page.locator("table.table tbody");
    await expect(table).toBeVisible();  // Assert that the table is visible on the page

    // Select all the rows, then find number of rows in the table
    const rows: Locator[] = await table.locator("tr").all();
    console.log(`Number of rows in the table: ${rows.length}`);  // Output the number of rows in the table
    expect(rows).toHaveLength(4);  // Assert that there are exactly 4 rows in the table

    //Step 1: For chrome process get value of CPU load
    //Read each row to check Chrome presence

    let cpuLoad = '';  // Initialize a variable to store the CPU load for the Chrome process
    for (const row of rows) {
        const processName = await row.locator('td').nth(0).innerText();
        if (processName === "Chrome") {
            // const cpuLoad = await row.locator('td:has-text("%")').innerText();    // CSS syntax
            cpuLoad = await row.locator('td', { hasText: "%" }).innerText();  // Playwright syntax

            console.log(`CPU Load for Chrome process: ${cpuLoad}`);  // Output the CPU load for the Chrome process
            break;  // Exit the loop once the Chrome process is found and CPU load is retrieved
        }
    }

    // cpmapre the value from yellow label
    let yellowboxtext: string = await page.locator("#chrome-cpu").innerText();
    console.log("Chrome CPU load from yellow label: ", yellowboxtext);

    if (yellowboxtext.includes(cpuLoad)) {
        console.log("CPU load value in the table matches with the value in yellow label");
    }
    else {
        console.log("CPU load value in the table does not match with the value in yellow label");
    }
    expect(yellowboxtext).toContain(cpuLoad);  // Assert that the yellow label text contains the CPU load value retrieved from the table

    await page.waitForTimeout(3000);  // Wait for 3 seconds before closing the browser

});