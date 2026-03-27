import {test} from '@playwright/test';

//test.describe.configure({mode:'serial'}); // Run tests in serial within the same describe block. By default, tests in the same describe block run sequentially.
//test.describe.configure({mode:'parallel'}); // Run tests in parallel within the same describe block. By default, tests in the same describe block run sequentially.

test .describe('group1', () => {
    test('test1', async ({page}) => {
        console.log("This is test 1.....");
    });

    test('test2', async ({page}) => {
        console.log("This is test 2.....");
    }); 

    test('test3', async ({page}) => {
        console.log("This is test 3.....");
    });

    test('test4', async ({page}) => {
        console.log("This is test 4.....");
    });

    test('test5', async ({page}) => {
        console.log("This is test 5.....");
    });
});


// run - npx playwright test tests/parallelTesting.spec.ts --workers 4 
// or
// run - npx playwright test tests/parallelTesting.spec.ts --workers=4 
// run - npx playwright test tests/parallelTesting.spec.ts --workers 1  --- to run sequentially




