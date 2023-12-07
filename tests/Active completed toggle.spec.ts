import { test, expect } from '@playwright/test';
import { addTodoItem } from '../utils/utility';

test('Add, Mark, and Toggle Todo Item', async ({ page }) => {
  // Visit the todo application page
  await page.goto('https://example.cypress.io/todo#/');

  // Add a new todo item using the utility function
  const newItemText = await addTodoItem(page);

  // Locate the todo item by text (assuming it's unique)
  const todoItemSelector = `.todo-list li:has-text("${newItemText}")`;

  // Click the toggle button for the specific todo item to mark it as completed
  await page.click(`${todoItemSelector} .toggle`);

  // Verify that the todo item is marked as completed
  await page.waitForSelector(`${todoItemSelector}.completed`);

  // Click the "Active" filter
  await page.click('a:has-text("Active")');

  // Verify that the todo item is not displayed in the active list
  await page.waitForSelector(`${todoItemSelector}`, { state: 'hidden' });

  // Click the "Completed" filter
  await page.click('a:has-text("Completed")');

  // Verify that the todo item is displayed in the completed list
  await page.waitForSelector(`${todoItemSelector}`, { state: 'visible' });

  // Take a screenshot for verification
  await page.screenshot({ path: 'toggle-success.png' });
});
