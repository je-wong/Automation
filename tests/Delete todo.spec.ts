import { test, expect } from '@playwright/test';

test('Delete Todo Item', async ({ page }) => {
  // Visit the todo application page
  await page.goto('https://example.cypress.io/todo#/');

  // Add a new todo item
  const newItemText = 'Buy cereal';
  await page.fill('.new-todo', newItemText);
  await page.press('.new-todo', 'Enter');

  // Locate the todo item by text (assuming it's unique)
  const todoItemSelector = `.todo-list li:has-text("${newItemText}")`;

   // Hover over the todo item to make the destroy button visible
  await page.hover(`${todoItemSelector}`);

  // Click the "destroy" button to delete the todo item
  await page.click(`${todoItemSelector} .destroy`);

  // Verify that the todo item is deleted
  const deletedTodoItem = await page.$(`${todoItemSelector}`);
  expect(deletedTodoItem).toBeNull();

  await page.screenshot({ path: 'delete-success.png' });
});
