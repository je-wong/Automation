import { test, expect } from '@playwright/test';

test('Todo List Test', async ({ page }) => {
  // Navigate to URL
  await page.goto('https://example.cypress.io/todo#/');

  // Add a new todo item
  const newItemText = 'Buy groceries';
  await page.fill('.new-todo', newItemText);
  await page.press('.new-todo', 'Enter');

  // Wait for the new item to be added to the list
  await page.waitForSelector(`.todo-list:has-text("${newItemText}")`);

  // Verify that the new item is added to the list
  const todoListContent = await page.textContent('.todo-list');
  expect(todoListContent).toContain(newItemText);
  
  // Take a screenshot for verification
  await page.screenshot({ path: 'add-success.png' });
});
