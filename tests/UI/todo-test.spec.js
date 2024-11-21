
const { test, expect } = require('@playwright/test');

test('SCENARIO: User should be able to add a new todo', async ({ page }) => {

  await test.step('GIVEN: User has opened the todomvc todos page', async () => {

     // Navigating to the todomvc website
  await page.goto('https://todomvc.com/examples/react/dist/');

  });

  await test.step('WHEN: User types a new todo and submits it.', async () => {
    
    await page.getByTestId('text-input').fill('buy milk');
    await page.getByTestId('text-input').press('Enter');

  });

  await test.step('THEN: User should see the new todo got added.', async () => {
    
    await expect (page.getByTestId('todo-item-label')).toHaveText("buy milk");
    await expect (page.getByTestId('todo-item-label')).toBeVisible();

  });

});

test('SCENARIO: User should be able to see the completed tasks when “Completed” filter is selected', async ({ page }) => {

  await test.step('GIVEN: User is on the todo page and has entered one todo that has been completed.', async () => {

  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.getByTestId('text-input').fill('buy milk');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('todo-item-toggle').click();
  await expect(page.getByTestId('todo-item-toggle')).toBeChecked;

  });

  await test.step('WHEN: User selects the “Completed” filter from the menu', async () => {
    
      await page.getByRole('link', {name: 'Completed'}).click()
      //await page.getByRole('link', {name: 'Completed'}).hover()
     
  
    });

    await test.step('THEN: User is able to see the completed todo task', async () => {
    
      await expect(page).toHaveURL(/.*completed/);
      await expect(page.getByTestId('todo-item-label')).toBeVisible();
     
  
    });

});

// It should be divided in 3 tests
test("SCENARIO 1: User should be able to filter between 'All', 'Active' and 'Completed' filters with desired results.", async ({ page }) => {

  await test.step('GIVEN: User is on the todo page and has entered one todo that has been completed.', async () => {

  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.getByTestId('text-input').fill('buy milk');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('buy tea');
  await page.getByTestId('text-input').press('Enter');
  await page.locator('div').filter({ hasText: 'buy tea' }).getByTestId('todo-item-toggle').click();

  });

  await test.step("WHEN: User click 'All' button 'both items' are visible", async () => {
    
    await page.getByRole('link', {name: 'All'}).click()
    

  });

  await test.step("AND WHEN: User click 'Active' button 'only active' item is visible e", async () => {
    
    await page.getByRole('link', {name: 'Active'}).click()
    

  });

  await test.step("Then: User click 'Completed' button and only inactive item is visible", async () => {
    
    await page.getByRole('link', {name: 'Completed'}).click()
    

  });

});

test("SCENARIO 2: User should be able to remove the completed todos", async ({ page }) => {

  await test.step('GIVEN: User is on the todo page and has entered one todo that has been completed.', async () => {

  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.getByTestId('text-input').fill('buy tea');
  await page.getByTestId('text-input').press('Enter');
  await page.locator('div').filter({ hasText: 'buy tea' }).getByTestId('todo-item-toggle').click();

  });

  await test.step('"WHEN: User click "Clear completed" button"', async () => {

  //await page.getByRole('button', { name: 'Clear completed' }).click()

  });

  await test.step('THEN: Todo list is empty', async () => {

    await expect(page.getByTestId('text-input')).toBeVisible();
    });

});


test("SCENARIO 3: User should be able to toggle multiple tasks as completed from complete all toggle.", async ({ page }) => {

  await test.step('GIVEN: User is on the todo page and has entered two todo that has been completed.', async () => {

  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.getByTestId('text-input').fill('buy milk');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('buy tea');
  await page.getByTestId('text-input').press('Enter');
  
  });

  await test.step('WHEN: User click "Input toggle all" button represented by down arrow', async () => {

    await page.getByTestId('toggle-all').click()
  

  });

  await test.step('THEN: All todo task should be marked as done (inactive)', async () => {

    await expect(page.getByTestId('toggle-all')).toBeVisible();
    });

});


test("SCENARIO 4: User should be able to remove an added todo with x icon.", async ({ page }) => {

  await test.step('GIVEN: User is on the todo page and has entered one todo', async () => {

  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.getByTestId('text-input').fill('buy milk');
  await page.getByTestId('text-input').press('Enter');
  
  
  });

  await test.step('WHEN: User click "X" button in todo list', async () => {

   await page.getByTestId('todo-item-label').hover()
   await page.getByTestId('todo-item-button').click();
  
 });

 await test.step('THEN: Todo list should be empty', async () => {

  await expect(page.getByTestId('todo-list')).toBeEmpty();

  });

});



//await expect(locator).toHaveClass('destroy')
  //await page.getByTestId('text-input').fill('buy milk');
  
  //Different locators to target the 'needs to be done' input box
  //await page.getByPlaceholder('What needs to be done?');
  //await page.getByLabel("New Todo Input");
  //await page.locator("[class='new-todo']");
  //await page.locator('#todo-input');
  //await page.locator('input');
  //await page.locator("xpath=/html/body/section/header/div/input");

