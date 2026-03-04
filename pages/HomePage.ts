import { Page, expect, Locator } from '@playwright/test';

export class HomePage {
    private readonly page: Page;
    private readonly searchBox: Locator;
    private readonly searchBtn: Locator;
    private readonly myAccountLink: Locator;
    private readonly registerLink: Locator;
    private readonly loginLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBox = page.locator("//input[@name='search' and type = 'text']");
        this.searchBtn = page.locator("//div[@id='search']/button[@type='button']");
        this.myAccountLink = page.locator("//ul/li/a[@title='My Account']");
        this.registerLink = page.getByRole('link', { name: "Register" });
        this.loginLink = page.getByRole('link', { name: "Login" });
    }
    async doesTitleExists(): Promise<boolean> {
        let title: string = await this.page.title();
        return title != null;
    }

    async clickMyAccount(): Promise<void> {
        await this.myAccountLink.click();
    }

    async clickRegisterLink(): Promise<void> {
        await this.registerLink.click();
    }
    async clickLoginLink(): Promise<void> {
        await this.loginLink.click();
    }
    async performSearch(keyWord: string): Promise<void> {
        await this.searchBox.fill(keyWord);
        await this.searchBtn.click();
    }
}