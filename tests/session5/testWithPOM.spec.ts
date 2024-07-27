import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { HomePage } from '../../pages/home.page';
import { YourCartPage } from '../../pages/yourCart.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { CheckoutOverviewPage } from '../../pages/checkoutOverview.page';
import { CheckoutCompletePage } from '../../pages/checkoutComplete.page';

test('POM-TC1-locked user', async ({page }) =>{
    const loginPage = new LoginPage(page);

    await loginPage.gotoUrl();
    await loginPage.inputUsernameAndPassword(`locked_out_user`, `secret_sauce`);
    await loginPage.clickLoginBtn();

    //Verify error message “Epic sadface: Sorry, this user has been locked out.” displayed
    await expect(page.locator(`//div[@id='login_button_container']//h3[@data-test='error']`)).toHaveText("Epic sadface: Sorry, this user has been locked out.");
})

test('POM-TC2-addToCart', async({page}) =>{

    const loginPage = new LoginPage(page);   
    const homePage = new HomePage(page);
    const yourCartPage = new YourCartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await loginPage.gotoUrl();
    await loginPage.inputUsernameAndPassword(`standard_user`, `secret_sauce`);
    await loginPage.clickLoginBtn();

    //get 1st item name shown on page
    const firstItemName = await homePage.getItemName(0);

    await homePage.clickNthAddToCartBtn(0);
    await homePage.clickCartBtn();

    //validate pre-added item name is visible
    let selectedItemName = await yourCartPage.getSelectedItemName();
    expect(selectedItemName).toEqual(firstItemName);
    // console.log('firstItemName: ' +firstItemName );
    // console.log('selectedItemName: ' +selectedItemName );

    //click Checkout
    await yourCartPage.clickCheckoutBtn();
    //input info fields
    const firstName = `pam`;
    const lastName = `nguyen`;
    const zipCode = `84`;
    await checkoutPage.inputUserInfo(firstName, lastName, zipCode);

    //validate the corresponding fields display input text
    let inputFirstName = await checkoutPage.getFirstName();
    let inputLastName = await checkoutPage.getLastName();
    let inputZipcode = await checkoutPage.getZipcode();
    expect(inputFirstName).toEqual(firstName);
    expect(inputLastName).toEqual(lastName);
    expect(inputZipcode).toEqual(zipCode);

    await checkoutPage.clickContinueBtn();

    //validate checkout page has item added earlier
    selectedItemName = await checkoutOverviewPage.getSelectedItemName();
    expect(selectedItemName).toEqual(firstItemName);

    await checkoutOverviewPage.clickFinishBtn();

    //validate msg: "Thank you for your order!" and "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    let checkoutCompleteHeader = await checkoutCompletePage.getCompleteHeaderText();
    let checkoutCompleteText = await checkoutCompletePage.getCompleteText();
    expect(checkoutCompleteHeader).toEqual(`Thank you for your order!`);
    expect(checkoutCompleteText).toEqual(`Your order has been dispatched, and will arrive just as fast as the pony can get there!`);
})
