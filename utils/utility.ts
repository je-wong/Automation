import { Page } from '@playwright/test';

export async function addTodoItem(page: Page, newItemText: string | null = null): Promise<string> {
  // Generate a random string if newItemText is not provided
  if (!newItemText) {
    newItemText = 'Item-' + Math.random().toString(36).substr(2, 5);
  }

  await page.fill('.new-todo', newItemText);
  await page.press('.new-todo', 'Enter');

  // Return the generated or provided newItemText for reference in the test
  return newItemText;
}
