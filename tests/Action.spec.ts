import {test, expect, Locator} from "@playwright/test";

//Text Input/ Text Box/ Input Box
test('Test Input Actions', async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    const textbox:Locator=page.locator('#name');

    await expect(textbox).toBeVisible();
    await expect(textbox).toBeEnabled();

    const maxlength:string | null=await textbox.getAttribute("maxlength"); // Returns value of maxlength of the element

    expect(maxlength).toBe('15');

    await textbox.fill("John canedy");

    //console.log("text content of FirstName:", await textbox.textContent());  // returns empty
    
    const entervalue:string = await textbox.inputValue();
    console.log("value of FirstName:",entervalue );  // returns the value of the input field
    expect(entervalue).toBe("John canedy");

    await page.waitForTimeout(3000);
});

test('Test Radio Button Actions', async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

   const maleRadio:Locator=page.locator('#male');   //male radio button

   await expect(maleRadio).toBeVisible();
   await expect(maleRadio).toBeEnabled();

   expect(await maleRadio.isChecked()).toBe(false);  // to check that the radio button is not selected

   await maleRadio.check()  //select radio button
   expect(await maleRadio.isChecked()).toBe(true);  //to check that the radio button is selected
   await expect(maleRadio).toBeChecked();  // to check that the radio button is selected

   await page.waitForTimeout(3000);
});

test.only('Test Checkbox Actions', async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    // 1. Select specific checkbox(Sunday) using getByLabel and assert
    const sundayCheckbox:Locator=page.getByLabel('Sunday');

    await sundayCheckbox.check({force:true});
    await expect(sundayCheckbox).toBeChecked();

    // 2. Select All the checkboxes and assert
   /*
    const allCheckboxes: Locator = page.locator('input[type="checkbox"]');
    const count = await allCheckboxes.count();
    for (let i = 0; i < count; i++) {
        await allCheckboxes.nth(i).check();
        await expect(allCheckboxes.nth(i)).toBeChecked();
    }
    */

    // 2. Select All the checkboxes and assert
    const days:string[]=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

    const checkboxes:Locator[] = days.map(index => page.getByLabel(index));
    expect(checkboxes.length).toBe(7);

    //3. Select all the checkboxes using for of loop and assert
    for(const checkbox of checkboxes){
        await checkbox.check({force:true});
        await expect(checkbox).toBeChecked();
    }

    // 4. Uncheck last 3 checkboxes and assert
   for(const checkbox of checkboxes.slice(-3)){
       await checkbox.uncheck({force:true});
        await expect(checkbox).not.toBeChecked();
    } 

    // 5. Toggle checkboxes: If checked, checked, if unchecked, check it and assert
    for(const checkbox of checkboxes){
        const isChecked:boolean=await checkbox.isChecked();
        if(isChecked){
            await checkbox.uncheck({force:true});
            await expect(checkbox).not.toBeChecked();
        }
        else{
            await checkbox.check({force:true});
            await expect(checkbox).toBeChecked();
        }
    }  
    
    // 6. Randomly select checkboxes by index(1,3,6) and assert
    const randomIndexes:number[]=[1,3,6];
    for(const index of randomIndexes){
        const checkbox:Locator=checkboxes[index];
        await checkbox.check({force:true});
        await expect(checkbox).toBeChecked();
    }

    // 7. select the checkbox based on the label
    const labelToSelect:string="Friday";
    const targetIndex:number = days.indexOf(labelToSelect);
    const checkboxToSelect:Locator | undefined = targetIndex >= 0 ? checkboxes[targetIndex] : undefined;

    if(checkboxToSelect){
        await checkboxToSelect.check({force:true});
        await expect(checkboxToSelect).toBeChecked();
    }  

    const weekname:string="Friday";

    for(const checkbox of checkboxes)
        {
            const checkbox=page.getByLabel(weekname);
            await checkbox.check({force:true});
            await expect(checkbox).toBeChecked();
        } 
        
        
    
    










    await page.waitForTimeout(5000);
});
