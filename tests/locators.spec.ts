/*
locators: Itentifies the element on the page.
Locators are the central piece of Playwright's auto-waiting and retry-ability.
In a nutshell, locators represent a way to find element(s) on the page at any moment.

DOM : Document Object Model - An API Interface provided by browser

These are the recommended built-in locators.
======================================================

page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content. (Non interactive elements)
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).

*/

import {test,expect, Locator} from '@playwright/test'

test('Verify Playwright Locators', async ({page}) => {

await page.goto('https://demo.nopcommerce.com');
// 1. page.getByAltText() - Identifies images (and similar elements) based on the  alt attribute.
// Use this locator when your elements supports alt text such as img and area elements.

const logo:Locator = page.getByAltText('nopCommerce demo store');
await expect(logo).toBeVisible();   // to check the visibility of the logo

//2. page.getByText() - Find an element by the text it contains. You can match by a substring, exact string or a regular expression.
//Locate by visible text
// Use this locator to find non interactive elements like div, span, p etc.
// For interactive elements like button, link etc. use role locators.

//const text:Locator = page.getByRole('Welcome to our store'); 
//await expect(text).toBeVisible();   // to check the visibility of the text

await expect(page.getByText("Welcome to our store")).toBeVisible();   // to check the visibility of the full text
await expect(page.getByText("Welcome")).toBeVisible();   // to check the visibility of the text using subString
await expect(page.getByText(/Welcome/)).toBeVisible();   // to check the visibility of the text using regular expression

// 3. page.getByRole() - Locating by Role (role is not an attribute)
/*Role locators include buttons, checkboxes,headings, links, lists, headings, tables, etc. 
 and follow WeC specifications for ARIA roles and attributes.
Use this locator for interactive elements like button, link etc. 
For non interactive elements like div, span, p etc. use text locators.

https://playwright.dev/docs/locators#locate-by-role

*/

await page.getByRole('link', { name: 'Register' }).click();   // to click on the register link
   
await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();   // to check the visibility of the heading
// we can also use get by text locator to check the visibility of the heading

// 4. page.getByLabel() - Locate form control by label's text
//when to use : Ideal for form fields with visible labels.

await page.getByLabel('Email:').fill('test@example.com');   // to fill the email field
await page.getByLabel('Password:').fill('test123');   // to fill the password field

//5. page.getByPlaceholder() - Locate an input by placeholder
// Best for inputs without a label but having a placeholder attribute.

await page.getByPlaceholder('Search store').fill('laptop');   // to fill the search field

// 6. page.getByTitle() - Locate an element by its title attribute
// Use this locator when your element has a title attribute that provides a meaningful description.

const searchIcon:Locator = page.getByTitle('Search');
await expect(searchIcon).toBeVisible();   // to check the visibility of the search icon

await expect(page.getByTitle('Search')).toBeVisible();   // to check the visibility of the search icon using get by title locator

// 7. page.getByTestId() - Locate an element based on its data-testid attribute (other attributes can be configured).
// Use this locator for elements that have a unique data-testid attribute, often used in testing environments.
// When to use : Ideal for elements that are difficult to select using other locators or when you want to avoid relying on visible text or attributes that may change.
// means role-based locators are unstable or not suitable for the element, you can use test id locator to locate the element.

await page.getByTestId('unique-element').click();   // to click on the element with the specified test ID
await expect(page.getByTestId('unique-element')).toBeVisible();   // to check the visibility of the element with the specified test ID
await expect(page.getByTestId('unique-element')).toHaveText('Expected Text');   // to check the text of the element with the specified test ID


 
});