import {test, expect, Locator} from "@playwright/test";

test('Autosuggest Dropdown', async({page})=>{

await page.goto("https://www.flipkart.com/");

await page.locator("input[name='q']:not([readonly])").fill("smart");  //Search text
await page.waitForTimeout(5000);  // wait for the dropdown options to appear

//Get all the suggested options  --> Cltr+Shift+P on DOM --> emulate a focused element --> select the input field and press enter --> copy the selector of the dropdown options

const dropdownOptions:Locator=page.locator("ul>li");
const count:number=await dropdownOptions.count();

console.log("Total dropdown options:",count);

// Print all the dropdown options
for(let i=0; i<count; i++){
    console.log(await dropdownOptions.nth(i).innerText());
    console.log(await dropdownOptions.nth(i).textContent());
}

//Select/Click on smartPhone option
for(let i=0; i<count; i++){
    const optionText:string=await dropdownOptions.nth(i).innerText();   
    if(optionText.trim()==="smartphone"){
        await dropdownOptions.nth(i).click();
        break;
    }
}


await page.waitForTimeout(3000);
});
