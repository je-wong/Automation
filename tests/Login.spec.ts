import { test, expect } from '@playwright/test';

const testUserData = {
  username: 'Test user',
  password: '123456',
};

test('Login Test', async ({ page }) => {
  // Step 1: Navigate to the login page
  await page.goto('https://demo.applitools.com/');

  // Step 2: Fill in the login form
  await fillLoginForm(page, testUserData);

  // Step 3: Click the Sign in button
  await page.click('#log-in');

  // Step 4: Wait for navigation or some element on the next page to appear
  await page.waitForSelector('#time');

  // Step 5: Verify that the login was successful
  const url = page.url();
  expect(url).toContain('/app.html');

  // Take a screenshot for visual verification if needed
  await page.screenshot({ path: 'login-success.png' });
});

async function fillLoginForm(page, userData) {
  await page.fill('#username', userData.username);
  await page.fill('#password', userData.password);
}

