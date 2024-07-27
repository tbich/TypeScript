import { Locator, Page } from "@playwright/test";

export class CheckoutCompletePage{
    readonly page: Page;
    readonly completeHeader: Locator;
    readonly completeText: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.completeHeader = page.locator(`//div[@id='checkout_complete_container']/h2[@data-test='complete-header']`);
        this.completeText = page.locator(`//div[@id='checkout_complete_container']/div[@data-test='complete-text']`);
    }

    async getCompleteHeaderText(): Promise<string> {
        return await this.completeHeader.textContent();
    }  

    async getCompleteText(): Promise<string> {
        return await this.completeText.textContent();
    }    
}