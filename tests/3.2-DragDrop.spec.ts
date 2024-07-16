import {test,expect} from '@playwright/test'

test('Drag and Drop', async({page}) =>{
   //open page by url
    await page.goto("https://the-internet.herokuapp.com/");

    //click link Drag and Drop
    await page.getByRole('link').filter({hasText: "Drag and Drop"}).click();

    //check page title Drag and Drop
    await page.locator("//div[@id='content']").filter({hasText: "Drag and Drop"}).isVisible();     

    //Drag and Drop column A to column B
    await page.locator("//div[@id='column-a']").dragTo(page.locator("//div[@id='column-b']"));
  })