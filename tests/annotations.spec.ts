/*
Annotations
===============
only
skip
fail
fixme
slow
*/

import {test, expect} from '@playwright/test';

test.only('test1', async ({page}) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
});

test.skip('test2', async ({page}) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
});

//skip the test based on condition
test('test3', async ({page, browserName}) => {
    test.skip(browserName === 'chromium','condition not met'); // Skip this test if the platform is Windows
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
});

test.fail('test4', async ({page}) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
});

test.fixme('test5', async ({page}) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
});

test('test6', async ({page}) => {
    test.slow(); // Mark this test as slow, which will increase the default timeout for this test
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
}); 

// default = 30 sec, now 90 sec





