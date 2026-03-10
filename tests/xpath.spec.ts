import {test, expect, Locator} from "@playwright/test";

test("XPath locators in Playwright", async ({page}) => {
    
    await page.goto("https://demowebshop.tricentis.com/");

    // 1. Absolute xpath
    const absolutelogo:Locator = page.locator("//html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/a[1]/img[1]");
    await expect(absolutelogo).toBeVisible();   // to check the visibility of the logo

    // 2. Relative xpath
    const relativelogo:Locator = page.locator("//img[@alt='Tricentis Demo Web Shop']");
    await expect(relativelogo).toBeVisible();   // to check the visibility of the logo

    // 3. XPath with contains() function
    const containslogo:Locator = page.locator("//img[contains(@alt,'Demo Web Shop')]");
    await expect(containslogo).toBeVisible();   // to check the visibility of the logo

    const products:Locator = page.locator("//h2/a[contains(@href,'computer')]");
    const productCount = await products.count();
    console.log(`Number of products containing 'computer' in the href: ${productCount}`);   // to log the number of products containing 'computer' in the href
    expect(productCount).toBeGreaterThan(0);   // to check that there is at least one product containing 'computer' in the href

    //console.log(await product.textContent());  // Error: strict mode violation

    console.log("First computer related product:", await products.first().textContent());
    console.log("Last computer related product", await products.last().textContent());
    console.log("Nth computer related product", await products.nth(2).textContent());  // Index is starting from zero

    let productTitle:string[]=await products.allTextContents(); // getting all the matched product titles as an array of strings

    console.log("All computer related products:", productTitle);

    for(let pt of productTitle)
        {
            console.log("Product Title:", pt);
        }

    
    // 4. XPath with starts-with() function
    const startswithlogo:Locator = page.locator("//img[starts-with(@alt,'Tricentis')]");
    await expect(startswithlogo).toBeVisible();   // to check the visibility of the logo

    
    // 5. XPath with text() function
    const textlogo:Locator = page.locator("//a[text()='Register']");
    await expect(textlogo).toBeVisible();   // to check the visibility of the register link
/*
    // 6. XPath with logical operators
    const logicallogo:Locator = page.locator("//img[@alt='Tricentis Demo Web Shop' and @src='/Themes/DefaultClean/Content/images/logo.png']");
    await expect(logicallogo).toBeVisible();   // to check the visibility of the logo

    // 7. XPath with indexing
    const indexlogo:Locator = page.locator("(//img[@alt='Tricentis Demo Web Shop'])[1]");
    await expect(indexlogo).toBeVisible();   // to check the visibility of the logo

    // 8. XPath with axes
    const axeslogo:Locator = page.locator("//div[@class='header-logo']//img");
    await expect(axeslogo).toBeVisible();   // to check the visibility of the logo

    // 9. XPath with wildcards (matching any element type with specific attribute)
    const wildcardlogo:Locator = page.locator("//*[@alt='Tricentis Demo Web Shop']");
    await expect(wildcardlogo).toBeVisible();   // to check the visibility of the logo

    // 10. XPath with functions
    const functionlogo:Locator = page.locator("//img[starts-with(@alt,'Tricentis') and contains(@src,'logo')]");
    await expect(functionlogo).toBeVisible();   // to check the visibility of the logo

    // 11. XPath with multiple attributes
    const multipleattributelogo:Locator = page.locator("//img[@alt='Tricentis Demo Web Shop' and @src='/Themes/DefaultClean/Content/images/logo.png']");
    await expect(multipleattributelogo).toBeVisible();   // to check the visibility of the logo

    // 12. XPath with parent-child relationship
    const parentchildlogo:Locator = page.locator("//div[@class='header-logo']/a/img");
    await expect(parentchildlogo).toBeVisible();   // to check the visibility of the logo

    // 13. XPath with sibling relationship
    const siblinglogo:Locator = page.locator("//a[text()='Log in']");
    await expect(siblinglogo).toBeVisible();   // to check the visibility of the login link

    // 14. XPath with ancestor relationship
    const ancestorlogo:Locator = page.locator("//img[@alt='Tricentis Demo Web Shop']/ancestor::div[@class='header-logo']");
    await expect(ancestorlogo).toBeVisible();   // to check the visibility of the header logo div

    // 15. XPath with descendant relationship
    const descendantlogo:Locator = page.locator("//div[@class='header-logo']//descendant::img[@alt='Tricentis Demo Web Shop']");
    await expect(descendantlogo).toBeVisible();   // to check the visibility of the logo

    // 16. XPath with union operator
    const unionlogo:Locator = page.locator("//img[@alt='Tricentis Demo Web Shop'] | //a[text()='Register']");
    await expect(unionlogo.first()).toBeVisible();   // to check the visibility of the first matching element (either the logo or the register link)

    // 17. XPath with not() function
    const notlogo:Locator = page.locator("//img[@alt='Tricentis Demo Web Shop' and not(@src='/Themes/DefaultClean/Content/images/logo.png')]");
    await expect(notlogo).toBeHidden();   // to check that the logo with the specified src is not visible

    // 18. XPath with position() function
    const positionlogo:Locator = page.locator("(//img[@alt='Tricentis Demo Web Shop'])[position()=1]");
    await expect(positionlogo).toBeVisible();   // to check the visibility of the first logo element

    // 19. XPath with last() function
    const lastlogo:Locator = page.locator("(//img[@alt='Tricentis Demo Web Shop'])[last()]");
    await expect(lastlogo).toBeVisible();   // to check the visibility of the last logo element

    // 20. XPath with count() - using Playwright's count method
    const countlogo:Locator = page.locator("//img[@alt='Tricentis Demo Web Shop']");
    const logoCount = await countlogo.count();
    console.log(`Number of logo elements: ${logoCount}`);   // to log the number of logo elements
*/

});
