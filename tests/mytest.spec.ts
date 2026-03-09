import {test,expect} from '@playwright/test';

//Syntax for test
/*
 test('test name', async ({page}) => {

}); 
*/

test('Verify Page title', async ({page}) => {

    await page.goto('https://www.google.com');

    await expect(page).toHaveTitle(/Google/);   // by adding / / we can use regular expression to match the title

});