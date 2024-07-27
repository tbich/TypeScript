import { Locator, Page } from "@playwright/test";

export class CheckoutPage{
    readonly page: Page;
    readonly continueBtn: Locator;
    readonly firstNameTxt: Locator;
    readonly lastNameTxt: Locator;
    readonly zipCodeTxt: Locator;
    constructor(page: Page){
        this.page = page;
        this.continueBtn = page.locator(`//input[@id='continue']`);
        this.firstNameTxt = page.locator(`//input[@id='first-name']`);
        this.lastNameTxt = page.locator(`//input[@id='last-name']`);
        this.zipCodeTxt = page.locator(`//input[@id='postal-code']`);
    }

    async clickContinueBtn(){
        await this.continueBtn.click();
    }

    async inputUserInfo(firstName: string, lastName: string, zipCode: string){
        await this.firstNameTxt.fill(firstName);
        await this.lastNameTxt.fill(lastName);
        await this.zipCodeTxt.fill(zipCode);
    }     
    
    async getFirstName(){ 
        return await this.firstNameTxt.inputValue();
    }

    async getLastName(){ 
        return await this.lastNameTxt.inputValue();
    }

    async getZipcode(){ 
        return await this.zipCodeTxt.inputValue();
    }
}