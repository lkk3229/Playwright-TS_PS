import {test, expect, Locator} from "@playwright/test";
import { text } from "node:stream/consumers";

test('Comparing Methods', async({page})=>{

await page.goto("https://demowebshop.tricentis.com/");

const products: Locator = page.locator('.product-title');  //6 products

/*
// 1. innerText() Vs textContent()
//console.log(await products.nth(1).innerText());  // returns the visible text content of the element, excluding hidden text and extra whitespace
// output: 14.1-inch Laptop
//console.log(await products.nth(1).textContent());  // returns the full text content of the element, including hidden text and extra whitespace
// output: 14.1-inch Laptop

const count=await products.count();

for(let i=0; i<count; i++){
    
    //const productName1:string=await products.nth(i).innerText(); // Extracts plain text. Eliminates hidden text and extra whitespace.
    //console.log(productName1);

    //const productName2:string | null=await products.nth(i).textContent(); // Extracts all text, including hidden text and extra whitespace.
    //console.log(productName2);

    const productName3:string | null=await products.nth(i).textContent(); // Extracts all text, including hidden text and extra whitespace.
    console.log(productName3?.trim()); // Removes leading and trailing whitespace from the text content.
}
*/


// 2. allInnerTexts() Vs allTextContents()
/*
console.log("************ allInnerTexts() Vs allTextContents() ***********"); 

//const productName1:string[]=await products.allInnerTexts();  // returns an array of visible text content of all the elements, excluding hidden text and extra whitespace
//console.log(productName1);  // output: [ '14.1-inch Laptop', 'Build your own computer', 'HTC One M8 Android L 5.0 Lollipop', 'HTC One Mini Blue', 'HTC One Mini Pink', 'HTC One Mini Red' ]

const productName2:string[]=await products.allTextContents();  // returns an array of full text content of all the elements, including hidden text and extra whitespace
console.log(productName2);  // output: [ '14.1-inch Laptop', 'Build your own computer', 'HTC One M8 Android L 5.0 Lollipop', 'HTC One Mini Blue', 'HTC One Mini Pink', 'HTC One Mini Red' ]

const productNamesTrimmed: string[] = productName2.map(text=>text.trim());  // Removes leading and trailing whitespace from each product name in the array.
console.log(productNamesTrimmed);
*/

// 3. all() method : converts Locator ---> Locator[]
// Returns array of locators)
// Returns array of Locators (Store locators of products)/Coverts Locators to array of locators (for iteration)
const productLocators: Locator[] = await products.all();  // returns an array of Locator objects representing all the elements matching the selector
console.log(productLocators);  // output: [Locator, Locator, Locator, Locator, Locator, Locator]

//console.log(await productLocators[1].innerText());  // returns the visible text content of the second product element, excluding hidden text and extra whitespace

/*
for(let productloc of productLocators){
    console.log(await productloc.innerText());
}
*/

for (let i in productLocators) {
    console.log(await productLocators[i].innerText());  
}

});