import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {

    //Go to by baseURL
    await page.goto('/');

    //login to app
    await page.locator(`//input[@id='user-name']`).fill('standard_user');
    await page.locator(`//input[@id='password']`).fill('secret_sauce');
    await page.locator(`//input[@id='login-button']`).click();

    //Validate the "Products" is visible
    await expect(page.locator(`//span[@data-test="title"]`)).toHaveText("Products");
});

test('Seesion4-TC1-Sort', async ({ page }) => {    

    //select sort by price (low to high)
    await page.locator(`//select[@data-test='product-sort-container']`).selectOption('lohi');

    //Validate the sort work correctly - Locate all the price elements and extract their text content
    const prices = await page.$$eval(`//div[@data-test='inventory-item-price']`, elements => 
    elements.map(element => parseFloat(element.textContent.replace('$', '')))
    );

    // Validate that the prices are sorted in ascending order
    const isSorted = prices.every((price, index, array) => {
        return index === 0 || array[index - 1] <= price;
    });

    //if the list is not sorted by ascending order then fail the test
    if (!isSorted) {
        test.fail();
    }
});

test('Seesion4-TC2-Add to card', {tag: '@smoke',},  async ({ page }) => {
      
    //click the 1st item's Add to cart button
    await page.locator(`//button[text()='Add to cart']`).nth(0).click();

    //get the 1st/selected item name (in order to compare in next steps)    
    const selectedItemText = await page.textContent(`//div[@data-test="inventory-item-name"]`);

    //check the button text is changed to Remove and there is 1 on the cart
    await expect(page.locator(`//div[@data-test='inventory-list']//button`).nth(0)).toHaveText("Remove");
    await page.locator(`//span[@data-test='shopping-cart-badge' and contains(normalize-space(text()), '1')]`).isVisible();

    //click on the cart icon
    await page.locator(`//a[@data-test='shopping-cart-link']`).click();

    //validate pre-added item is visible by selected item name
    await expect(page.locator(`//div[@id='cart_contents_container']//div[@data-test='inventory-item-name']`)).toHaveText(selectedItemText);

    //Click checkout
    await page.locator(`//button[@id='checkout']`).click();  

    //define input fields locator
    const firstNameLocator = page.locator(`//input[@id='first-name']`);
    const lastNameLocator = page.locator(`//input[@id='last-name']`);
    const postalCodeLocator = page.locator(`//input[@id='postal-code']`);

    //define input values
    const firstName='Pam';
    const lastName='Nguyen';
    const postalCode='84';

    //Input all required fields
    await firstNameLocator.fill(firstName);  
    await lastNameLocator.fill(lastName);  
    await postalCodeLocator.fill(postalCode);

    //validate the corresponding fields display input text
    await expect(firstNameLocator).toHaveValue(firstName);
    await expect(lastNameLocator).toHaveValue(lastName);
    await expect(postalCodeLocator).toHaveValue(postalCode);

    //click Continue
    await page.locator(`//input[@id='continue']`).click();

    //validate checkout overview page title
    await expect(page.locator(`//div[@id='header_container']//span[@data-test='title']`)).toHaveText("Checkout: Overview");

    //validate checkout page has item added earlier
    await expect(page.locator(`//div[@data-test='inventory-item-name']`)).toHaveText(selectedItemText);

    //click Finish
    await page.locator(`//button[@id='finish']`).click();

    //validate msg "Thank you for your order!" and "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    await expect(page.locator(`//div[@id='checkout_complete_container']/h2[@data-test='complete-header']`)).toHaveText("Thank you for your order!");
    await expect(page.locator(`//div[@id='checkout_complete_container']/div[@data-test='complete-text']`)).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!");

    // await page.waitForTimeout(6000);
  });