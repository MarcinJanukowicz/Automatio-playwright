const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
 
  await page.goto('https://todomvc.com/examples/react/dist/');

});

test('SCENARIO: User should be able to see the completed tasks when “Completed” filter is selected', async ({ page }) => {

    await test.step('GIVEN: User is on the todo page and has entered one todo that has been completed.', async () => {

    //await page.goto('https://todomvc.com/examples/react/dist/');
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



test('SCENARIO: User should be able to add a new todo', async ({ page }) => {

    await test.step('GIVEN: User has opened the todomvc todos page', async () => {
  
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


  test('SCENARIO: User should be able to check how many task left to do on the items counter', async ({ page }) => {

    await test.step('GIVEN: User has opened the todomvc todos page', async () => {
  
    await page.goto('https://todomvc.com/examples/react/dist/');
  
    });
  
    await test.step('WHEN: User types two new todo and submits it.', async () => {
      
      await page.getByTestId('text-input').fill('buy milk');
      await page.getByTestId('text-input').press('Enter');
      await page.getByTestId('text-input').fill('buy tea');
      await page.getByTestId('text-input').press('Enter');
  
  
    });
  
    await test.step('THEN: User should see "2 items left!" on the items counter', async () => {
      

    const itemCount = await page.locator('.todo-count').textContent();
    expect(itemCount).toBe('2 items left!');
  
    });
  
  });