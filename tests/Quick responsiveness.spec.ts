import { test, expect } from '@playwright/test';

const viewports = [
  { width: 320, height: 480 }, // Small mobile
  { width: 768, height: 1024 }, // Tablet
  { width: 1200, height: 800 }, // Desktop
];

test.describe('Responsive Design', () => {
  for (const viewport of viewports) {
    test(`Displays correctly on ${viewport.width}x${viewport.height}`, async ({ page }) => {
      // Set the viewport size
      await page.setViewportSize(viewport);

      // Navigate to your page
      await page.goto('https://example.com');

      // Add your responsiveness checks here, for example:
      // const someElement = await page.$('.your-responsive-element');
      // expect(someElement).not.toBeNull();
    });
  }
});
