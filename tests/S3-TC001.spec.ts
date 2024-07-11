import {test,expect} from '@playwright/test'

test('Session 3-TC001', async({page}) =>{
    await page.goto("https://the-internet.herokuapp.com/");
    await page.getByRole('link').filter({hasText: "Checkboxes"}).click();
    await page.getByRole('checkbox').nth(0).check();
    await page.getByRole('checkbox').nth(1).uncheck();

    // await page.locator("//form[@id='checkboxes']/input[@type='checkbox']").nth(0).check();
    await page.waitForTimeout(10000)
        // await page.getByRole('heading').filter({hasText: "Login Form"}).isVisible();
    // await page.getByRole('link').filter({hasText: "checkbox 1"}).isVisible();
    // await page.getByText('Checkboxes').click();
    // await page.click('text=Checkboxes');
    // await page.getByRole('heading').filter({hasText: "Login Form"}).click();
    // await page.getByLabel("Username").fill("practice");
    // await page.getByLabel("Password").fill("SuperSecretPassword!");
    // await page.getByRole("button", {name: "Login"}).click();
    // await expect(page.getByRole("alert")).toHaveText("You logged into a secure area!");
})