import {test, expect, Locator} from "@playwright/test";

test('Hidden Bootstrap Dropdown', async({page})=>{

await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

//Login to the application
await page.locator("input[name='username']").fill("Admin");
await page.locator("input[name='password']").fill("admin123");
await page.locator("button[type='submit']").click();

//Click on PIM module
await page.getByText('PIM').click();

//Click on Job Title dropdown
await page.locator('form i').nth(2).click();  // Click on the 3rd dropdown icon
await page.waitForTimeout(3000);  // wait for the dropdown options to appear

//Capture all the options from the dropdown
const options:Locator= page.locator("div[role='listbox'] span");
const count:number=await options.count();

console.log("Total dropdown options:",count);

//Print all the dropdown options

console.log("All the text content:", await options.allTextContents());  // returns an array of text content of all the options in the dropdown


for(let i=0; i<count; i++){
   // console.log(await options.nth(i).innerText());
    console.log(await options.nth(i).textContent());
}

//Select/Click on specific option from the dropdown
for(let i=0; i<count; i++){
    const optionText1:string=await options.nth(i).textContent();   
    if(optionText1.trim()==="IT Manager"){
        await options.nth(i).click();
        break;
    }
}

await page.waitForTimeout(3000);

});
