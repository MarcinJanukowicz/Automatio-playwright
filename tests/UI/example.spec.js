// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {

  // Navigating to the playwright website
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

// Ramka testu i w środku wpisujemy test (ramka zawsze ta sama)

// test('hi ', async ({ page }) => {

// });

// Navigate to the Playwright page, open API section, validate it landed there.
test('Navigate to API page and validate it got there', async ({ page }) => {
  
  await page.goto('https://playwright.dev/');

  await page.getByRole('link', {name: "API"}).click();

  await expect(page).toHaveURL(/class-playwright/);

  await expect(page).toHaveTitle('Playwright Library | Playwright')

  await expect(page.getByRole('heading', {name: 'Playwright Library'})).toBeVisible();

  await expect(page.getByRole('heading', {name: 'Playwright Library'})).toHaveText('Playwright Library');
});


//Navigate to the Playwright home page, in search field search for “locators”, navigate to the Playwright locators tutorial page and validate it landed there.
test('Navigate Locators', async ({ page }) => {
  
  await page.goto('https://playwright.dev/');

  await page.getByLabel('Search').click();

  await page.getByPlaceholder('Search docs').fill('locators');

  await page.waitForLoadState("networkidle"); //system is waiting for loading

  await page.keyboard.press('Enter');

  await expect(page).toHaveURL('https://playwright.dev/docs/locators');

});

test('Navigate Locators1', async ({ page }) => {
  
  await page.goto('https://playwright.dev/');

  await page.getByLabel('Search').click();

  await page.getByPlaceholder('Search docs').fill('locators');

  await page.getByRole('link', { name: 'Locators', exact: true }).click();  // click the Locators result from found links

  await expect(page.getByRole('heading', { name: 'Locators', exact: true })).toBeVisible();  // validate the Locators heading is visible and we are on the correct page


});



test('hi ', async ({ page }) => {
  
  

});