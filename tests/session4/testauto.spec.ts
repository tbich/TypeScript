import {test,expect} from '@playwright/test'

test.beforeEach(async ({ page }) => {
    //Go to URL
    await page.goto(`https://testautomationpractice.blogspot.com/`);
});

test('TC3.8-Prompt Dialog',{tag: ['@smoke', '@regression']}, async({page}) =>{
    //variable declare
    const name="Pam";

    // Add a listener for the dialog event  
    page.on('dialog', async dialog => {
        //check for a prompt dialog
        expect(dialog.type()).toContain('prompt');

        //check prompt message
        expect(dialog.message()).toContain('Please enter your name:');

        //check prompt default value
        expect(dialog.defaultValue()).toContain('Harry Potter');   

        //set value to prompt textbox and accept
        await dialog.accept(name);
    });

    //click Prompt button to trigger dialog
    await page.click('//button[normalize-space()="Prompt"]');

    //Validate the prompt response message matches the inputted value
    const resultMessage = await page.locator('#demo').innerText();
    expect(resultMessage).toBe(`Hello ${name}! How are you today?`); 
})

test('TC3.7-Input',{tag: '@regression',}, async({page}) =>{
  
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