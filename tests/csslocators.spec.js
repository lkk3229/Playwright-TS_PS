/*
CSS (Cascading style sheet)

html + js + css

2 types of CSS
==================

1. absolute CSS locator
2. relative CSS locator

Syntax:

tag with id - tag#id     or #id
tag and class - tag.class  or .class
tag and attribute - tag[attribute=value]  or [attribute=value]
tag and pseudo class - tag:pseudo-class  or :pseudo-class
tag with attribute and class - tag.class[attribute=value]  or .class[attribute=value]

page.locator(css/xpath)

*/

import { test, expect, Locator } from '@playwright/test';

test('Verify CSS locators', async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");

    //tag with id
   // const searchbox:Locator = page.locator("#small-searchterms");
   // await searchbox.fill("T-Shirt");

    await expect(page.locator("#small-searchterms")).toBeVisible();
    await page.locator("#small-searchterms").fill("T-Shirt");

    //tag and class
    await expect(page.locator(".search-box-text")).toBeVisible();
    await page.locator(".search-box-text").fill("T-Shirt");

    //tag and attribute
    await expect(page.locator("[type='text']")).toBeVisible();
    await page.locator("[type='text']").fill("T-Shirt");

    //tag and pseudo class
    await expect(page.locator("input:focus")).toBeVisible();
    await page.locator("input:focus").fill("T-Shirt");

    //tag with attribute and class
    await expect(page.locator(".search-box-text[type='text']")).toBeVisible();
    await page.locator(".search-box-text[type='text']").fill("T-Shirt");

    // absolute CSS locator - not prefered to use as it is very long and can break easily if there is any change in the UI
    await expect(page.locator("body > div.master-wrapper-page > div.master-wrapper-content > div > div > div > div > div.search-box > form > input.search-box-text")).toBeVisible();
    await page.locator("body > div.master-wrapper-page > div.master-wrapper-content > div > div > div > div > div.search-box > form > input.search-box-text").fill("T-Shirt");




    // relative CSS locator
    await expect(page.locator("div.search-box > form > input.search-box-text")).toBeVisible();
    await page.locator("div.search-box > form > input.search-box-text").fill("T-Shirt");

});
