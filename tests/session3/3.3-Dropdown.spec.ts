import {test,expect} from '@playwright/test'

test('Dropdown', async({page}) =>{
    //open page by url
    await page.goto("https://the-internet.herokuapp.com/");

    //click link Dropdown
    await page.getByRole('link').filter({hasText: "Dropdown"}).click();

    //check page title  Dropdown List
    await page.locator("//div[@id='content']").filter({hasText: "Dropdown List"}).isVisible();     

    //Select item by label ''Option 2' 
    await page.locator("//select[@id='dropdown']").selectOption({ label: 'Option 2' });

    //Select item by index 1
    await page.locator("//select[@id='dropdown']").selectOption({ index: 1 });

    //Select item by value 2
    await page.locator("//select[@id='dropdown']").selectOption({ value: '2' });
})