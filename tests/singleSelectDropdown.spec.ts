import {test, expect, Locator} from '@playwright/test';

test('Test Single Select Dropdown Actions', async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    //1. Select option from the dropdown (4 ways)
/*
    await page.locator('#country').selectOption('India');  // Visible text
    await expect(page.locator('#country')).toHaveValue('india');

    await page.locator('#country').selectOption({value:'uk'}); // value attribute   
    await expect(page.locator('#country')).toHaveValue('uk');

    await page.locator('#country').selectOption({label:'USA'}); // label
    await expect(page.locator('#country')).toHaveValue('usa');

    await page.locator('#country').selectOption({index:1}); // index
    await expect(page.locator('#country')).toHaveValue('canada');  
*/

    //2. check numbers of options in dropdown and assert
    const options:Locator=page.locator('#country>option');
    await expect(options).toHaveCount(10);

    //3. Check if specific option is present in dropdown and assert
    const optionValues:string[] = (await options.allTextContents()).map(text => text.trim());
    console.log(optionValues);
    expect(optionValues).toContain('India');
    expect(optionValues).toContain('United States');
    expect(optionValues).not.toContain('Russia');

    // 4. Printing options from drpdown
    for(const option of optionValues){
        console.log(option);
    }



    await page.waitForTimeout(5000);


}); 
