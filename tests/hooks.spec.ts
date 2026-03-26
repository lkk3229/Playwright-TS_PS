import {test, expect} from '@playwright/test';

//step 1: 

//step 2: 

test.beforeEach(async () => {
    console.log("This is before each hook");
});

test.afterEach(async () => {
    console.log("This is after each hook");
});

test.beforeAll(async () => {
    console.log("This is before all hook");
});

test.afterAll(async () => {
    console.log("This is after all hook")
});

test('Test1', async () => {
    //login
    console.log("This is test 1");
    //logout
});

test('Test2', async () => {
    //login
    console.log("This is test 2");
    //logout
});

test('Test3', async () => {
    console.log("This is test 3");
});

test('Test4', async () => {
    console.log("This is test 4");
});