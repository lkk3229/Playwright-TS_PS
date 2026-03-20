import {test, expect, Locator} from "@playwright/test";

test('Static Table', async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    const table: Locator = page.locator("table[name='BookTable'] tbody");  // Locate the table element with the name attribute "BookTable"
    await expect(table).toBeVisible();  // Assert that the table is visible on the page

    // 1. Count number of rows in the table
    const rows: Locator = page.locator("table[name='BookTable'] tbody tr");  // Locate all the row elements (tr) within the tbody of the table
    //or
   // const rows: Locator = table.locator('tr');  // Locate all the row elements (tr) within the table

   //await expect(rows).toHaveCount(7);  // Assert that there are exactly 7 rows in the table  // Approch 1

    const rowCount: number = await rows.count();  // Get the count of rows in the table  
    console.log(`Number of rows in the table: ${rowCount}`);  // Output the number of rows in the table
    expect(rowCount).toBe(7);  // Assert that the row count is equal to 7   // Approch 2

    // 2. Count number of columns in the table
    //const columns=await page.locator("table[name='BookTable'] tbody tr th");
    //or
    const columns: Locator = rows.locator('th');  // Locate all the column elements (th) within the rows
    await expect(columns).toHaveCount(4);  // Assert that there are exactly 4 columns in the table  // Approch 1

    const columnCount: number = await columns.count();  // Get the count of columns in the table
    console.log(`Number of columns in the table: ${columnCount}`);  // Output the number of columns in the table
    expect(columnCount).toBe(4);  // Assert that the column count is equal to 4   // Approch 2

// 3. Read all the data from 2nd row of the table (index 2 means 3rd row including header row)
const secondRowCells: Locator = rows.nth(2).locator('td');  // Locate all the cell elements (td) within the 2nd row
const secondRowTexts: string[] = await secondRowCells.allInnerTexts();  // Get the visible text content of all the cells in the 2nd row as an array of strings
console.log(`Data in the 2nd row: ${secondRowTexts}`);  // Output the data in the 2nd row  // Learn Java,Mukesh,Java,500

await expect(secondRowCells).toHaveText(['Learn Java', 'Mukesh', 'Java', '500']);  // Assert that the data in the 2nd row matches the expected values

console.log("Printing the 2nd row data using for loop:");
for(let text of secondRowTexts){
    console.log(text);  
}

// 4. Read all the data from the table (excluding header row)
console.log("Printing all the data from the table (excluding header row):.................");

const allRowData = await rows.all();  // Get an array of Locator objects representing all the rows in the table (excluding header row)

console.log("Book Name Author Subject Price");

for(let row of allRowData.slice(1))   // slice(1) --> skip header row (index 0) and iterate through the remaining rows of the table
    {                                // Iterate through each row in the table, starting from the second row (index 1) to exclude the header row
    const cols: string[] = await row.locator('td').allInnerTexts();  // Get the visible text content of all the cells in the current row as an array of strings
    console.log(cols.join('\t'));  // Output the data in the current row
}

// 5. Read book names where author is Mukesh
console.log("Book names where author is Mukesh:.................");

const MukeshBooks: string[] = [];  // Initialize an array to store the book names where the author is Mukesh
for(let row of allRowData.slice(1))   // slice(1) --> skip header row (index 0) and iterate through the remaining rows of the table
    {                               
    const cells: string[] = await row.locator('td').allInnerTexts();  // Get the visible text content of all the cells in the current row as an array of strings
    const author: string = cells[1];  // Get the author name from the 2nd column (index 1) of the current row
    const bookName: string = cells[0];  // Get the book name from the 1st column (index 0) of the current row
    if(author === 'Mukesh')  // Check if the author (2nd column) is "Mukesh"
    {
        console.log(`Author: ${author} \t Book: ${bookName}`);  // Output the book name (1st column) if the author is "Mukesh"
        MukeshBooks.push(bookName);  // Add the book name to the array of Mukesh's books
    }
    }

expect(MukeshBooks).toHaveLength(2);  // Assert that there are exactly 2 books where the author is Mukesh

// 6. calculate the total price of all the books in the table
console.log("Calculating the total price of all the books in the table:.................");
let totalPrice: number = 0;  // Initialize a variable to store the total price of all the books
for(let row of allRowData.slice(1))   // slice(1) --> skip header row (index 0) and iterate through the remaining rows of the table
    {                               
    const cells: string[] = await row.locator('td').allInnerTexts();  // Get the visible text content of all the cells in the current row as an array of strings
    const price: number = parseFloat(cells[3]);  // Get the price from the 4th column (index 3) of the current row and convert it to a number using parseFloat()
    totalPrice += price;  // Add the price of the current book to the total price
    }
console.log(`Total price of all the books: ${totalPrice}`);  // Output the total price of all the books in the table
expect(totalPrice).toBe(7100);  // Assert that the total price of all the books is equal to 7100

});