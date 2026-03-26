import {test, expect} from '@playwright/test';

test.describe('Group1', () => {
    test('Test1', async ({ page }) => {
        console.log("This is test 1.....");
    });

    test('Test2', async ({ page }) => {
        console.log("This is test 2.....");
    });
});

test.describe('Group2', () => {
    test('Test3', async ({ page }) => {
        console.log("This is test 3.....");
    });

    test('Test4', async ({ page }) => {
        console.log("This is test 4.....");
    });
});