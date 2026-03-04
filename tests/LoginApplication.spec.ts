import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountsPage } from '../pages/MyAccountsPage';
import { TestConfig } from '../test.config';
import { DataProviders } from '../utils/DataProviders';
import { RandomUtilGenerator } from '../utils/RandomUtilGenerator';

let homePage: HomePage;
let loginPage: LoginPage;
let myAccountsPage: MyAccountsPage;

test.beforeEach(async ({ page }) => {
    const config = new TestConfig();
    const appurl = config.appUrl;
    await page.goto(appurl);
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    myAccountsPage = new MyAccountsPage(page);

});

test.afterEach(async ({ page }) => {
    page.waitForTimeout(3000);
    page.close();
});

test('login applicaton test',
    {
        tag: ['@master', '@sanity', '@regression', '@smoke'],
        annotation: { type: 'issue', description: 'jira-12232' }
    },
    async () => {
        let title = await homePage.doesTitleExists();
        expect(title).toBe(true);
        await homePage.clickMyAccount();
        await homePage.clickLoginLink();

        const loginHeader = await loginPage.verifyLoginPageLoading();
        expect(loginHeader).toBe(true);

        const config = new TestConfig();
        const email = config.email;
        const password = config.password;

        await loginPage.loginToApplication(email, password);

        const myAccountsHeader = await myAccountsPage.verifyMyAccountsHeader();
        expect(myAccountsHeader).toBe(true);
    }
)
