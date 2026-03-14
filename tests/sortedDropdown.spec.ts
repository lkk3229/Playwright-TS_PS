import {test, expect, Locator} from '@playwright/test';

test('Verify Dropdown is sorted', async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    const options:Locator=page.locator('#animals>option');
    const optionValues:string[] = (await options.allTextContents()).map(text => text.trim());

    const originalOptionValues:string[] = [...optionValues]; // Create a copy of the original array to preserve the original order
    console.log(originalOptionValues);

    const sortedOptionValues:string[] = [...optionValues].sort();  //... spread operator to create a copy of the original array and then sort it using localeCompare for case-insensitive sorting
    console.log(sortedOptionValues);
    expect(optionValues).toEqual(sortedOptionValues);

    // sort method will not remove duplicates, it will sort the array in place and return a reference to the same array. If you want to remove duplicates while sorting, you can use a Set to filter out duplicates before sorting, like this:

    await page.waitForTimeout(5000);


});