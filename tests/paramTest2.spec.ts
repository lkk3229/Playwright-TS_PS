import { test, expect } from '@playwright/test';

const loginTestData: string[][] = [
    ["laura.taylor1234@example.com", "test123", "valid"],
    ["invaliduser@gmail.com", "password123", "invalid"],
    ["validuser@example.com", "password123", "invalid"],
    ["", "", "invalid"],
];

for (const [email, password, validity] of loginTestData) {

        test.describe('Login Tests data driven', async () => {

        test(`Login Test for ${email} and ${password}`, async ({ page }) => {

            await page.goto('https://demowebshop.tricentis.com/login');

            //Fill login form
            await page.locator('#Email').fill(email);
            await page.locator('#Password').fill(password);
            await page.locator("input[value='Log in']").click();

            if (validity.toLowerCase() === "valid") {
                // Assert logout link is visible - indicate successfull login
                const logoutLink = page.locator("a[href='/logout']");
                await expect(logoutLink).toBeVisible({ timeout: 5000 });

            } else {
                //Assert error message is visible
                const errorMessage = page.locator('.validation-summary-errors');
                await expect(errorMessage).toBeVisible({ timeout: 5000 });

                // Assert user is still on the login page
                await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
            }

        });
    });
}