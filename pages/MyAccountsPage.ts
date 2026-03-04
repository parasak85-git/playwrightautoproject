import { Page, expect, Locator } from '@playwright/test';

export class MyAccountsPage {

    private readonly page: Page;
    private readonly myAccountHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.myAccountHeader = page.locator("//div[@id='account-account']//h2[text()='My Account']");
    }

    async verifyMyAccountsHeader(): Promise<boolean> {
        const myAccountHeader = await this.myAccountHeader.textContent();
        return myAccountHeader != null;
    }

}