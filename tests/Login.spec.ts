import { test, expect } from '@playwright/test';

test('Login Test', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://demo.applitools.com/');

  // Fill in the login form
  await page.fill('#username', 'Test user');
  await page.fill('#password', '123456');

  // Click the Sign in button
  await page.click('#log-in');

  // Wait for navigation or some element on the next page to appear
  await page.waitForSelector('#time');

  // Verify that the login was successful
  const url = page.url();
  expect(url).toContain('/app.html');;

  // You can add more assertions as needed

  // Take a screenshot for visual verification if needed
  await page.screenshot({ path: 'login-success.png' });
});