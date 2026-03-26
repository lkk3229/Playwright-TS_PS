/*
3 ways to create trace files in Playwright:
========================================================
1. using playwright.config.ts file to set trace collection for all tests
2. using code(programmatically) context.tracing.start() and context.tracing.stop() methods to control trace collection within a specific test
        context.tracing.start({ screenshots: true, snapshots: true, sources: true }); // Start tracing with options to capture screenshots, snapshots, and sources
       
        // statemets between start and stop will be recorded in the trace file. You can perform any actions or assertions within this block, and they will be included in the trace for debugging and analysis purposes.

        context.tracing.stop({ path: 'trace.zip' }); // Stop tracing and save the trace to a file

3. using command line options to control trace collection
     npx playwright test mytest.spec.ts --trace on
     npx playwright test mytest.spec.ts --trace on-first-retry
     npx playwright test mytest.spec.ts --trace retain-on-failure


To view trace files, you can use the Playwright Trace Viewer, which provides a visual interface to analyze the recorded traces. You can open the trace file in the Trace Viewer to inspect the sequence of events, screenshots, network requests, and other details captured during the test execution.
=========================================================
1. from html file --> click on trace.zip
2. from command line --> npx playwright show-trace trace.zip
3. utility --> https://trace.playwright.dev/     (drag and drop/upload the trace.zip file to view the trace in the browser)




*/




import{test, expect} from '@playwright/test';

test('trace in Playwright', async ({page, context}) => { 

    context.tracing.start({ screenshots: true, snapshots: true, sources: true }); // Start tracing with options to capture screenshots, snapshots, and sources
    
    await page.goto('https://www.demoblaze.com/index.html'); // Navigate to the test page

    await page.getByRole('link', {name: 'Log in'}).click(); // Click on the "Log in" link
    await page.getByPlaceholder('Username').fill('testuser'); // Fill the username field in the login form
    await page.getByPlaceholder('Password').fill('testpassword');
    await page.getByRole('button', {name: 'Log in'}).click(); // Click on the "Log in" button to submit the form

    await expect(page.getByRole('button', {name: 'Log out'})).toBeVisible(); // Assertion to verify successful login by checking the visibility of the "Log out" button

    await expect(page.getByRole('link', {name: 'Welcome testuser'})).toBeVisible(); // Assertion to verify successful login by checking the visibility of the welcome message with the username

    await context.tracing.stop({ path: 'trace.zip' }); // Stop tracing and save the trace to a file

});