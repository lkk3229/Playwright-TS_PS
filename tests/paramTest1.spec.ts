// preference for test data file
// json then csv then excel

import {test, expect} from '@playwright/test';

//test data
const searchItems: string[] = ['laptop','Gift card', 'smartphone', 'monitor'];

/*
// using for of loop
for (const item of searchItems) {
    test(`Search test for ${item} using for of loop`, async ({page}) => {
        await page.goto('https://demowebshop.tricentis.com/');
        await page.locator('#small-searchterms').fill(item); // item is coming from test data file
        await page.locator("input[value='Search']").click(); // click on the search button
        await expect.soft(page.locator('h2 a').nth(0)).toContainText(item, {ignoreCase: true}); // verify the first product name contains the search item
    });
}  
    */
   
/*

//using for each function
searchItems.forEach((item) => {
    test(`Search test for ${item} using for each Loop`, async ({page}) => { 
        await page.goto('https://demowebshop.tricentis.com/');
        await page.locator('#small-searchterms').fill(item);        
        await page.locator("input[value='Search']").click(); // click on the search button
        await expect.soft(page.locator('h2 a').nth(0)).toContainText(item, {ignoreCase: true}); // verify the first product name contains the search item
    });
});
*/

//describe
test.describe('Search tests using describe block', () => {
    searchItems.forEach((item) => {
    test(`Search test for ${item} using for each Loop`, async ({page}) => { 
        await page.goto('https://demowebshop.tricentis.com/');
        await page.locator('#small-searchterms').fill(item);        
        await page.locator("input[value='Search']").click(); // click on the search button
        await expect.soft(page.locator('h2 a').nth(0)).toContainText(item, {ignoreCase: true}); // verify the first product name contains the search item
    });
});
});
