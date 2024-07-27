import {test,expect} from '@playwright/test'

test('Input', async({page}) =>{
    //open page by url
    await page.goto("https://testautomationpractice.blogspot.com/");

    //check page title "Dynamically Loaded Page Elements header is shown"
    await page.locator("xpath=//div[@id='header-inner']").filter({hasText: "Automation Testing Practice"}).isVisible();     

    //Input a name into Name textbox 
    const nameXpath="xpath=//input[@id='name']";
    const inputName="Pam";
    await page.locator(nameXpath).fill(inputName);

    //verify inputted Name shows on Name textbox
    await expect(page.locator(nameXpath)).toHaveValue(inputName);
  
    //Input a address into Address textbox 
    const addressXpath="xpath=//textarea[@id='textarea']";
    const inputAddress="This is my address";
    await page.locator(addressXpath).fill(inputAddress);

    //verify inputted address shows on Address textarea
    await expect(page.locator(addressXpath)).toHaveValue(inputAddress);

    //clear name and address
    await page.locator(nameXpath).clear();
    await page.locator(addressXpath).clear();
})