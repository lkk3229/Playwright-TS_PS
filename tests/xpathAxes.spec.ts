import {test,expect,Locator} from "@playwright/test";

test("XPath axes in Playwright", async ({page}) => {

    await page.goto("https://www.w3schools.com/html/html_tables.asp");

    //self axis
    const germanyCell:Locator = page.locator("//td[text()='Germany']");
    await expect(germanyCell).toHaveText('Germany');   // to check the visibility of the table

    //parent axis
    const parentRow:Locator = page.locator("//td[text()='Germany']/parent::tr");
    await expect(parentRow).toContainText('Maria Anders');   // to check the visibility of the table row containing Germany
    console.log("Parent Row Text:", await parentRow.textContent());  // to log the text content of the parent row

    //child axis
    const secondRowCells:Locator = page.locator("//table[@id='customers']//tr[2]/child::td");
    const childCount = await secondRowCells.count();
    console.log(`Number of child cells in the row containing Germany: ${childCount}`);
    expect(childCount).toBe(3);   // to check that there are 3 child cells in the row containing Germany

    //ancestor
    const table:Locator = page.locator("//td[text()='Germany']/ancestor::table");
    await expect(table).toHaveAttribute('id','customers');   // to check the visibility of the company cell in the ancestor table

    // descendant
    const descendantCells:Locator = page.locator("//table[@id='customers']/descendant::td");
    const descendantCount = await descendantCells.count();
    console.log(`Number of descendant cells in the customers table: ${descendantCount}`);
    expect(descendantCount).toBeGreaterThan(0);   // to check that there are descendant cells in the customers table

    //following
    const followingCells:Locator = page.locator("//td[text()='Germany']/following::td");
    await expect(followingCells).toHaveText("Centro commercial Moctezuma");   // to check the visibility of the company cell in the following axis
    
    //following-sibling
    const followingSiblingCells:Locator = page.locator("//td[text()='Germany']/following-sibling::td");
    await expect(followingSiblingCells).toHaveCount(0);   // to check that there are no following sibling cells for the Germany cell

    const followingSiblingCells1:Locator = page.locator("//td[text()='Maria Anders']/following-sibling::td");
    await expect(followingSiblingCells1).toHaveCount(1);   // to check that there is one following sibling cell for the Maria Anders cell

    //preceding
    const precedingCells:Locator = page.locator("//td[text()='Germany']/preceding::td");
    await expect(precedingCells).toHaveText("Maria Anders");   // to check the visibility of the company cell in the preceding axis

    //preceding-sibling
    const precedingSiblingCells:Locator = page.locator("//td[text()='Germany']/preceding-sibling::td");
    await expect(precedingSiblingCells).toHaveCount(0);   // to check that there are no preceding sibling cells for the Germany cell


});