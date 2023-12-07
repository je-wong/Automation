import { test, expect } from '@playwright/test';

test('Add, Mark, and Toggle Todo Item', async ({ page }) => {
  // Visit the todo application page
  await page.goto('https://example.cypress.io/todo#/');

  // Add a new todo item
  const newItemText = 'Buy toothpaste';
  await page.fill('.new-todo', newItemText);
  await page.press('.new-todo', 'Enter');

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
