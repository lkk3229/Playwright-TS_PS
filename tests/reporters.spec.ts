import {test, expect} from '@playwright/test';

test.beforeEach('Lauching app', async ({page}) => {
    await page.goto('https://demowebshop.tricentis.com/');
});

test.afterEach('Closing app', async ({page}) => {
    await page.close();
});

test('logotest', async ({page}) => {
    await expect(page.locator("img[alt='Tricentis Demo Web Shop']")).toBeVisible();
});

test('title test', async ({page}) => {
    await expect(page).toHaveTitle('Demo Web Shop');
});

test('Search test', async ({page}) => {
    await page.locator('#small-searchterms').fill('laptop');
    await page.locator("input[value='Search']").click();
    await expect.soft(page.locator('h2 a')).toContainText('laptop', {ignoreCase: true});
});



