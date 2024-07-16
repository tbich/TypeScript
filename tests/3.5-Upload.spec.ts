import {test,expect} from '@playwright/test'
import path from 'path';

test('Upload', async({page}) =>{
    //open page by url
    await page.goto("https://the-internet.herokuapp.com/");

    //click File Upload link 
    await page.getByRole('link').filter({hasText: "File Upload"}).click();

    //check page title File Upload
    await page.locator("//div[@id='content']").filter({hasText: "File Upload"}).isVisible();     

    // Select one file to upload
    const fileName = 'myfile.pdf';
    const uploadPath = "../" + fileName;
    const filePath = path.join(__dirname, uploadPath); 
    await page.locator("//input[@id='file-upload']").setInputFiles(filePath);

    //click Upload button
    await page.locator("//input[@id='file-submit']").click();

    //verify The message - which containing the file name is shown
    await expect(page.locator("//div[@id='uploaded-files']")).toHaveText(fileName);
})