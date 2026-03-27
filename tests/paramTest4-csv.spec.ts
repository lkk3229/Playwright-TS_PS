import { test, expect } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

/*
Pre-requisite:
Install the csv-parse module to read CSV files:
        npm install csv-parse
*/

// Reading data from csv
const csvPath="TestData/data.csv";
const fileContent=fs.readFileSync(csvPath,'utf-8'); 

const records= parse(fileContent, {
    columns: true, // Use first row as column names
    skip_empty_lines: true // Skip empty lines in the CSV
});

// main test
test.describe('Login Tests data driven', async () => {
    for (const data of records) {

        test(`Login Test for "${data.email}" and "${data.password}"`, async ({ page }) => {

            await page.goto('https://demowebshop.tricentis.com/login');

            //Fill login form
            await page.locator('#Email').fill(data.email);
            await page.locator('#Password').fill(data.password);
            await page.locator("input[value='Log in']").click();

            if (data.validity.toLowerCase() === "valid") {
                // Assert logout link is visible - indicate successfull login
                const logoutLink = page.locator("a[href='/logout']");
                await expect(logoutLink).toBeVisible({ timeout: 5000 });

            } else {
                //Assert error message is visible
                const errorMessage = page.locator('.validation-summary-errors');
                await expect(errorMessage).toBeVisible({ timeout: 5000 });

                // Assert user is still on the login page
                await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
            }

        });
    }

});