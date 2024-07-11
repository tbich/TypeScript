import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByLabel('Log in').getByText('Close').click();
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').fill('standard_user');
  await page.locator('#loginpassword').click({
    modifiers: ['ControlOrMeta']
  });
  await page.locator('#loginpassword').fill('secret_sauce');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('link', { name: 'Add to cart' }).click();
  await page.locator('html').click();
  await page.locator('html').click();
  await expect(page.getByRole('heading', { name: 'Samsung galaxy s6' })).toBeVisible();
  await expect(page.locator('h3')).toContainText('$360 *includes tax');
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
});