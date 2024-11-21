// @ts-check
const { test, expect } = require('@playwright/test');


//Go to the Google landing page, search for "Playwright getting started", 
//click on the Playwright Getting Started ink and validate that we ended up there.


test('Google Playwright getting started', async ({ page }) => {

  // Navigating to the playwright website
  await page.goto('https://www.google.com')
 
 
});

