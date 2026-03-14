import {test, expect, Locator} from '@playwright/test';

test('Test Multi Select Dropdown Actions', async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    //1. Select option from the dropdown (4 ways)
    //await page.locator('#colors').selectOption(['Red','Blue', 'Green']);  // Visible text

    //await page.locator('#colors').selectOption([{value:'orange'},{value:'purple'}]); // value attribute

    //await page.locator('#colors').selectOption([{label:'Yellow'},{label:'Pink'}]); // label

   // await page.locator('#colors').selectOption([{index:0},{index:2}]); // index
  
    //2. check numbers of options in dropdown and assert
    const options:Locator=page.locator('#colors>option');
    await expect(options).toHaveCount(7);
    
    //3. Check if specific option is present in dropdown and assert
    const optionValues:string[] = (await options.allTextContents()).map(text => text.trim());
    console.log(optionValues);
    expect(optionValues).toContain('Red');
    expect(optionValues).toContain('Blue');
    expect(optionValues).not.toContain('Black');

    // 4. Printing options from drpdown
    for (const value of optionValues) {
        console.log(value);
    }

    await page.waitForTimeout(5000);


});