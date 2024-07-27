import {test,expect} from '@playwright/test'

test('Checkbox', async({page}) =>{
    //open page by url
    await page.goto("https://the-internet.herokuapp.com/");

    //click link Checkboxes
    await page.getByRole('link').filter({hasText: "Checkboxes"}).click();

    //check page title Checkboxes
    await page.locator("//div[@id='content']").filter({hasText: "Checkboxes"}).isVisible();   

    //check Checkbox 1 
    await page.getByRole('checkbox').nth(0).check();

    //uncheck checkboxes 2
    await page.getByRole('checkbox').nth(1).uncheck();   
})