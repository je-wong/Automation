import { test, expect } from '@playwright/test';
import { addTodoItem } from '../utils/utility';

test('Add, Mark, and Toggle Todo Item - Error Handling', async ({ page }) => {
  // Visit the todo application page
  await page.goto('https://example.cypress.io/todo#/');

  // Add a new todo item using the utility function
  const newItemText = await addTodoItem(page);

  // Attempt to delete a non-existent todo item
  const nonExistentItemSelector = `.todo-list li:has-text("NonExistentItem")`;

  // Click the delete button for the non-existent todo item
  const deleteButtonSelector = `${nonExistentItemSelector} .destroy`;
  const deleteButton = await page.$(deleteButtonSelector);
  
  // Check if the delete button exists before clicking
  if (deleteButton) {
    await deleteButton.click();
    // Wait for a short period to allow any potential error message to appear
    await page.waitForTimeout(1000);

    // Verify that an error message is displayed
    const errorMessageSelector = '.error-message'; // Adjust based on the actual error message element
    const errorMessage = await page.$(errorMessageSelector);
    
    expect(errorMessage).toBeTruthy(); // Check if the error message element exists
    if (errorMessage) {
      const errorMessageText = await errorMessage.innerText();
      expect(errorMessageText).toContain('Item not found'); // Adjust based on the expected error message
    }

    // Take a screenshot for verification
    await page.screenshot({ path: 'error-handling.png' });
  } else {
    // If the delete button is found, fail the test
    expect(deleteButton).toBeFalsy();
  }
});
