import { Locator, Page } from "@playwright/test";

export class HomePage{
    readonly page: Page;
    readonly addToCartBtn: Locator;
    readonly cartBtn: Locator;
    readonly itemName: Locator;
 
    constructor(page: Page){
        this.page = page;
        this.addToCartBtn = page.locator(`//button[text()='Add to cart']`);
        this.cartBtn = page.locator(`//a[@data-test='shopping-cart-link']`);
        this.itemName = page.locator(`//div[@data-test="inventory-item-name"]`);   
    }

    //click nth's Add To Cart button
    async clickNthAddToCartBtn(orderNum: number){
        await this.addToCartBtn.nth(orderNum).click();
    }

    //click Cart button
    async clickCartBtn(){
        await this.cartBtn.click();
    }

    //get the 1st/selected item name (in order to compare in next steps)    
    async getItemName(orderNum: number): Promise<string> {
        return await this.itemName.nth(orderNum).textContent();
    }  
}
