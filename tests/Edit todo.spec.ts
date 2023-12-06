import { test, expect } from '@playwright/test';

test('Add and Edit Todo Entry', async ({ page }) => {
  // Visit the todo application page
  await page.goto('https://example.cypress.io/todo#/');

  // Add a new todo item
  const newItemText = 'Pay for power';
  await page.fill('.new-todo', newItemText);
  await page.press('.new-todo', 'Enter');

  // Verify that the todo entry has been added
  const addedTodoSelector = `.todo-list label:has-text("${newItemText}")`;
  await expect(page.locator(addedTodoSelector).textContent()).resolves.toBe(newItemText);

  // Double click on the todo entry to start editing
  await page.dblclick(addedTodoSelector);

  // Edit the todo entry to 'pay power'
  const editedTodoText = 'pay power';
  const editInputSelector = '.edit';
  await page.fill(editInputSelector, editedTodoText);
  
  // Press Enter to submit the edit
  await page.press(editInputSelector, 'Enter');

  // Verify that the todo entry has been edited
const editedTodoSelector = `.todo-list label:has-text("${editedTodoText}")`;
await expect(page.locator(editedTodoSelector)).toBeVisible();

  // Take a screenshot for verification
  await page.screenshot({ path: 'edit-success.png' });
});

