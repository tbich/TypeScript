import {test,expect} from '@playwright/test'

test('Frames', async({page}) =>{
    //open page url
    await page.goto("https://the-internet.herokuapp.com/");

    //Select 'WYSIWYG Editor' link
    await page.getByRole('link').filter({hasText: "WYSIWYG Editor"}).click();

    //check page title
    await page.locator("//div[@id='content']").filter({hasText: "An iFrame containing the TinyMCE WYSIWYG Editor"}).isVisible();     

    //Select item by label ''Option 2' 
    const text='Hello, how are you?';
    const locator=page.frameLocator('#mce_0_ifr').getByText('Your content goes here.');

    //Set new content "Hello, how are you?"
    locator.fill(text);

    //Verify the content body is 'Hello, how are you?'
    await expect(locator).toHaveText(text);   

})