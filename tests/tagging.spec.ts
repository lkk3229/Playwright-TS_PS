/*
test 1 - sanity
test 2 - sanity, regression
test 3 - regression

*/

import {test, expect} from '@playwright/test';

test('@sanity Check title of the home page', async ({ page }) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
});

test('Check title of the home page',{tag:'@sanity'}, async ({ page }) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
});

test('@sanity @regression Check title of the home page', async ({ page }) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
});

test('Check title2 of the home page',{tag:['@sanity','@regression']}, async ({ page }) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
}); 



test('@regression Check title of the home page', async ({ page }) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
});

test('Check title3 of the home page',{tag:'@regression'}, async ({ page }) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
});

// for sanity - npx playwright test tests/tagging.spec.ts --grep "@sanity"
// for regression - npx playwright test tests/tagging.spec.ts --grep "@regression"
// for both sanity and regression - npx playwright test tests/tagging.spec.ts --grep "@sanity|@regression"
   //    npx playwright test tests/tagging.spec.ts --grep @sanity@regression
  //     npx playwright test tests/tagging.spec.ts --grep (?=.*@sanity)(?=.*@regression)  -- look for tests that have both @sanity and @regression tags

// for only sanity no regression - npx playwright test tests/tagging.spec.ts --grep "@sanity" --grep-invert "@regression"

// run either sanity or regression but not both - npx playwright test tests/tagging.spec.ts --grep "@sanity|@regression" --grep-invert "(?=.*@sanity)(?=.*@regression)"

// run all test other than sanity - npx playwright test tests/tagging.spec.ts --grep-invert "@sanity"

// run all test other than regression - npx playwright test tests/tagging.spec.ts --grep-invert "@regression"




