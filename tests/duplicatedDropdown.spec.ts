import {test, expect, Locator} from '@playwright/test';

test('Verify Dropdown contain duplicates', async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    const options:Locator=page.locator('#animals>option'); // not having dulpicate
   
    const optionValues:string[] = (await options.allTextContents()).map(text => text.trim());
    console.log(optionValues);

    const myset=new Set<string>(); // using Set to filter out duplicates
    const duplicates:string[] = [];
    
    for(const value of optionValues){
        if(myset.has(value)){
            duplicates.push(value); // remove the value from the set to ensure that only duplicates are added to the duplicates array
        }
        else{
            myset.add(value);
        }

    }

    console.log("Duplicate values in dropdown:", duplicates);
    expect(duplicates).toEqual([]); // assert that there are no duplicates in the dropdown
    expect(duplicates.length).toBe(0); // assert that the length of duplicates array is 0
    
    if(duplicates.length > 0){
        console.log("Dropdown contains duplicates:", duplicates);
    }   
    else{
        console.log("Dropdown does not contain duplicates.");
    }       



    await page.waitForTimeout(5000);


});