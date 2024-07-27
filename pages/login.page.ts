import { Locator, Page } from "@playwright/test";

export class LoginPage{
    readonly page: Page;
    readonly usernameTxt: Locator;
    readonly passwordTxt: Locator;
    readonly loginBtn: Locator;
    constructor(page: Page){
        this.page = page;
        this.usernameTxt = page.locator(`//input[@id='user-name']`);
        this.passwordTxt = page.locator(`//input[@id='password']`);
        this.loginBtn = page.locator(`//input[@id='login-button']`);
    }

    //go to url
    async gotoUrl(){
        await this.page.goto(`https://www.saucedemo.com/inventory.html`);
    }

    //input username and password
    async inputUsernameAndPassword(username: string, password: string){
        await this.usernameTxt.fill(username);
        await this.passwordTxt.fill(password);
    }

    //click Login button
    async clickLoginBtn(){
        await this.loginBtn.click();
    }


}