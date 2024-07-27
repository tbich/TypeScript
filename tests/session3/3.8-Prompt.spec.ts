import {test,expect} from '@playwright/test'

test('Prompt Dialog', async({page}) =>{
    //open page url
    await page.goto("https://testautomationpractice.blogspot.com/");

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