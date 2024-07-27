import {test,expect} from '@playwright/test'

test('Dynamic Load', async({page}) =>{
    //open page by url
    await page.goto("https://the-internet.herokuapp.com/");

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