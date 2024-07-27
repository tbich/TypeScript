import { Locator, Page } from "@playwright/test";

export class CheckoutOverviewPage{
    readonly page: Page;
    readonly itemName: Locator;
    readonly finishBtn: Locator;
    constructor(page: Page){
        this.page = page;
        this.itemName = page.locator(`//div[@data-test='inventory-item-name']`);
        this.finishBtn = page.locator(`//button[@id='finish']`);
    }

    //click Finish button
    async clickFinishBtn(){
        await this.finishBtn.click();
    }

    //get selected item name shown on page    
    async getSelectedItemName(): Promise<string> {
        return await this.itemName.textContent();
    }    
}