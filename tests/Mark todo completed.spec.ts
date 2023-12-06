import { test, expect } from '@playwright/test';

test('Mark Todo Item as Completed', async ({ page }) => {
  // Visit the todo application page
  await page.goto('https://example.cypress.io/todo#/');

  // Add a new todo item
  const newItemText = 'Buy toothpaste';
  await page.fill('.new-todo', newItemText);
  await page.press('.new-todo', 'Enter');

  // Locate the todo item by text (assuming it's unique)
  const todoItemSelector = `.todo-list li:has-text("${newItemText}")`;

  // Click the toggle button for the specific todo item
  await page.click(`${todoItemSelector} .toggle`);

  // Verify that the todo item is marked as completed
const isCompleted = await page.$eval(
  `${todoItemSelector}`,
  (item) => item.classList.contains('completed')
);
expect(isCompleted).toBeTruthy();

  await page.screenshot({ path: 'completed-success.png' });
});
