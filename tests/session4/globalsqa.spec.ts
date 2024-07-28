import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  //Go to URL
  await page.goto(`https://www.globalsqa.com/demo-site/frames-and-windows/`);
});

test('Frames',{tag: '@regression',}, async ({ page }) => {

  // Click iFrame tab
  await page.locator('#iFrame').click();

  // Check page title Frames And Windows
  await expect(page.locator('h1')).toContainText('Frames And Windows');

  // Input Playwright into Search textbox 
  const text = 'Playwright';

  // Define the frame locator
  const frameLocator = page.frameLocator('iframe[name="globalSqa"]');

  // Input text into search textbox
  await frameLocator.getByPlaceholder('Search...').fill(text);

  // Click Search icon
  await frameLocator.getByRole('button').click();

  // Verify the search result text
  await expect(frameLocator.locator('ol')).toContainText('Sorry, no posts matched your criteria.');
});
