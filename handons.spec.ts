import {test,expect} from '@playwright/test'

test('Login success', async({page}) =>{
    await page.goto("https://practice.expandtesting.com/");
    // let text="login";
    // let locatorA = page.locator(`div[name=${text}]`);
    await page.getByRole('heading').filter({hasText: "Login Form"}).click();
    await page.getByLabel("Username").fill("practice");
    await page.getByLabel("Password").fill("SuperSecretPassword!");
    await page.getByRole("button", {name: "Login"}).click();
    await expect(page.getByRole("alert")).toHaveText("You logged into a secure area!");
})