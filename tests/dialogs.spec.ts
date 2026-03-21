// alert(), confirm(), prompt() dialogs/JSalerts
// Reference: https://playwright.dev/docs/dialogs

// 1. By default, dialogs are auto-dismissed by Playwright, so you don't have to handle them
// 2. However, you can register a dialog handler before the action that triggers the dialog to either
// dialog.accept() or dialog.dismiss()  it.

import { test, expect } from "@playwright/test";

test('Simple Alerts or dialog', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('dialog', async (dialog) => 
        {
            console.log("Dialog type is: " + dialog.type()); // Log the type of dialog (alert, confirm, prompt)
            expect(dialog.type()).toContain("alert"); // Assert that the dialog type is "alert"
            console.log("Dialog message is: " + dialog.message()); // Log the message of the dialog
            expect(dialog.message()).toContain("I am an alert box!"); // Assert that the dialog message contains the expected text
            dialog.accept(); // Register a dialog handler to accept the alert
        });

    await page.locator('#alertBtn').click(); // Open the alert dialog by clicking the button with id "alertBtn"

    await page.waitForTimeout(5000);

});

test('confirmation Alerts or dialog', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('dialog', async (dialog) => 
        {
            console.log("Dialog type is: " + dialog.type()); // Log the type of dialog (alert, confirm, prompt)
            expect(dialog.type()).toContain("confirm"); // Assert that the dialog type is "confirm"
            console.log("Dialog message is: " + dialog.message()); // Log the message of the dialog
            expect(dialog.message()).toContain("Press a button!"); // Assert that the dialog message contains the expected text
            dialog.accept(); // Register a dialog handler to accept the confirm
            //dialog.dismiss(); // Register a dialog handler to dismiss the confirm

        });

    await page.locator('#confirmBtn').click(); // Open the confirmation dialog by clicking the button with id "confirmBtn"
    const text: string = await page.locator('#demo').innerText();
    console.log("Output: " + text); // Log the text on the page after handling the confirm dialog
    //await expect(page.locator('#demo')).toHaveText("You pressed Cancel!"); // Assert that the text on the page reflects the dismissal of the confirm dialog
    await expect(page.locator('#demo')).toHaveText("You pressed OK!"); // Assert that the text on the page reflects the acceptance of the confirm dialog
    await page.waitForTimeout(5000);

});

test.only('Prompt Alerts or dialog', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('dialog', async (dialog) => 
        {
            console.log("Dialog type is: " + dialog.type()); // Log the type of dialog (alert, confirm, prompt)
            expect(dialog.type()).toContain("prompt"); // Assert that the dialog type is "prompt"
            console.log("Dialog message is: " + dialog.message()); // Log the message of the dialog
            expect(dialog.message()).toContain("Please enter your name:"); // Assert that the dialog message contains the expected text
           
            expect(dialog.defaultValue()).toContain("Harry Potter"); // Assert that the default value of the prompt dialog is "Harry Potter"

            dialog.accept("John Doe"); // Register a dialog handler to accept the prompt with a value
            //dialog.dismiss(); // Register a dialog handler to dismiss the prompt

        });

    await page.locator('#promptBtn').click(); // Open the prompt dialog by clicking the button with id "promptBtn"
    const text: string = await page.locator('#demo').innerText();
    console.log("Output: " + text); // Log the text on the page after handling the prompt dialog
    //await expect(page.locator('#demo')).toHaveText("You pressed Cancel!"); // Assert that the text on the page reflects the dismissal of the prompt dialog
    await expect(page.locator('#demo')).toHaveText("Hello John Doe! How are you today?"); // Assert that the text on the page reflects the acceptance of the prompt dialog
    await page.waitForTimeout(5000);

});


