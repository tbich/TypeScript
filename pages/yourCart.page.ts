import { Locator, Page, expect } from "@playwright/test";

export class YourCartPage{
    readonly page: Page;
    readonly checkoutBtn: Locator;
    readonly selectedItemNameLbl: Locator;

    constructor(page: Page){
        this.page = page;
        this.checkoutBtn = page.locator(`//button[@id='checkout']`);
        this.selectedItemNameLbl = page.locator(`//div[@id='cart_contents_container']//div[@data-test='inventory-item-name']`);
    }

    //click checkout button
    async clickCheckoutBtn(){
        await this.checkoutBtn.click();
    }

    //validate pre-added item is visible by selected item name
    async getSelectedItemName(): Promise<string>{
        // console.log('getSelectedItemName: ' + await this.selectedItemNameLbl.textContent() );
        return await this.selectedItemNameLbl.textContent();
            }
}