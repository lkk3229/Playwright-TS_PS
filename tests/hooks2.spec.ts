import {test, expect, Page} from '@playwright/test';

let page: Page;

test.beforeAll('Open Application', async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("https://www.demoblaze.com/index.html");
});

test.afterAll('Close Application', async () => {
    await page.close();
});

test.afterEach("login", async () => {
    await page.locator('#login2').click();
    await page.locator('#loginusername').fill("pavanol");
    await page.locator('#loginpassword').fill("test@123");
    await page.locator('button:has-text("Log in")').click();
    await page.waitForTimeout(2000);
});

test.afterEach("logout", async () => {
    await page.locator('#logout2').click();
    await page.waitForTimeout(2000);
});

test.describe('mygroup', () => {

    test('Find the no of Products', async () => {
        const products = page.locator('#tbodyid .hrefch');
        const count = await products.count();
        console.log(`Number of products: ${count}`);
        await expect(products).toHaveCount(9);
    });

    test('Add Product to Cart', async () => {
        await page.locator("text='Samsung galaxy s6'").click();
        
        //Handle alert pop up before click
        page.once('dialog', async (dialog) => {
            expect(dialog.message()).toContain("Product added");
            await dialog.accept(); // Accept the alert
        });

    await page.locator('.btn.btn-success.btn-lg').click();

});

});