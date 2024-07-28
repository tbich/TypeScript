import {test,expect} from '@playwright/test'
import path from 'path';

test.beforeEach(async ({ page }) => {
    //Go to URL
    await page.goto(`https://the-internet.herokuapp.com/`);
});

test.skip('TC3.1-Checkbox', {tag: ['@smoke', '@regression'],}, async({page}) =>{

    //click link Checkboxes
    await page.getByRole('link').filter({hasText: "Checkboxes"}).click();

    //check page title Checkboxes
    await page.locator("//div[@id='content']").filter({hasText: "Checkboxes"}).isVisible();   

    //check Checkbox 1 
    await page.getByRole('checkbox').nth(0).check();

    //uncheck checkboxes 2
    await page.getByRole('checkbox').nth(1).uncheck();   
})

test('TC3.6-Dynamic Load', {tag: ['@smoke', '@regression'],}, async({page}) =>{
    //select Dynamic Loading link
    await page.getByRole('link').filter({hasText: "Dynamic Loading"}).click();

    //check page title "Dynamically Loaded Page Elements header is shown"
    await page.locator("//div[@id='content']").filter({hasText: "Dynamically Loaded Page Elements"}).isVisible();     

    //Go to example 1 page 
    await page.locator("//a[@href='/dynamic_loading/1']").click();

    //check page title "Dynamically Loaded Page Elements header is shown"
    await page.locator("//div[@id='content']").filter({hasText: "Dynamically Loaded Page Elements"}).isVisible();    
    
    //click Start button
     await page.getByRole("button", {name: "Start"}).click();

    //wait for loading label appears then disappears
    const loadingLabel = page.locator("xpath=//div[@id='loading']");
    await loadingLabel.waitFor();
    await loadingLabel.waitFor({state: "hidden"});

    //verify text Hello World! shown
    await expect(page.locator("xpath=//div[@id='finish']")).toHaveText("Hello World!");
})

test('TC3.5-Upload', {tag: ['@smoke', '@regression'],}, async({page}) =>{
    //click File Upload link 
    await page.getByRole('link').filter({hasText: "File Upload"}).click();

    //check page title File Upload
    await page.locator("//div[@id='content']").filter({hasText: "File Upload"}).isVisible();     

    // Select one file to upload
    const fileName = 'myfile.pdf';
    const uploadPath = "../../file-upload/" + fileName;
    const filePath = path.join(__dirname, uploadPath); 
    await page.locator("//input[@id='file-upload']").setInputFiles(filePath);

    //click Upload button
    await page.locator("//input[@id='file-submit']").click();

    //verify The message - which containing the file name is shown
    await expect(page.locator("//div[@id='uploaded-files']")).toHaveText(fileName);
})

test.fail('TC3.3-Dropdown',{tag: '@regression',}, async({page}) =>{
 
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

test('TC3.2-Drag and Drop',{tag: '@regression',}, async({page}) =>{
    
     //click link Drag and Drop
     await page.getByRole('link').filter({hasText: "Drag and Drop"}).click();
 
     //check page title Drag and Drop
     await page.locator("//div[@id='content']").filter({hasText: "Drag and Drop"}).isVisible();     
 
     //Drag and Drop column A to column B
     await page.locator("//div[@id='column-a']").dragTo(page.locator("//div[@id='column-b']"));
   })