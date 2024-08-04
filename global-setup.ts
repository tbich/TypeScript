import { chromium, type FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log("Global setup");
  await page.goto(baseURL!);
 
  //login to app
  await page.locator(`//input[@id='user-name']`).fill('standard_user');
  await page.locator(`//input[@id='password']`).fill('secret_sauce');
  await page.locator(`//input[@id='login-button']`).click();

  //Validate the "Products" is visible
//   await expect(page.locator(`//span[@data-test="title"]`)).toHaveText("Products");

  await page.context().storageState({ path: storageState as string });
  await browser.close();
  console.log("Global setup. End");
}

export default globalSetup;