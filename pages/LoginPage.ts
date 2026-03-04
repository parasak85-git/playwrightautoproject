import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {

    private readonly page: Page;
    private readonly returningCustomer: Locator;
    private readonly txtEmailAddress: Locator;
    private readonly txtPassword: Locator;
    private readonly btnLogin: Locator;

    constructor(page: Page) {
        this.page = page;
        this.returningCustomer = page.locator("#form-login > h2");
        this.txtEmailAddress = page.locator("#input - email");
        this.txtPassword = page.locator("#input - password");
        this.btnLogin = page.locator("#input - password");
    }
    async verifyLoginPageLoading(): Promise<boolean> {
        let returningCustomerText = await this.returningCustomer.textContent();
        console.log(returningCustomerText)
        return returningCustomerText != null;
    }

    async loginToApplication(loginId: string, password: string): Promise<void> {
        await this.txtEmailAddress.fill(loginId);
        await this.txtPassword.fill(password);
        await this.btnLogin.click();
    }

}