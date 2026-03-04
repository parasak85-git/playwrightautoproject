import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountsPage } from '../pages/MyAccountsPage';
import { TestConfig } from '../test.config';
import { RandomUtilGenerator } from '../utils/RandomUtilGenerator';
import { DataProviders } from '../utils/DataProviders';

const jsonPath = '../testdata/LoginData.json';
const userData = DataProviders.readDataFromJsonFile(jsonPath);


for (const user of userData) {
    const testiteration = user.testiteration;
    const username = user.username;
    const password = user.password;
    test(`login application ${testiteration}`,
        {
            tag: ['@sanity', '@smoke', '@regression'],
            annotation: { type: 'issue', description: 'jira-1124' }
        },
        async ({ page }) => {
            const homePage = new HomePage(page);
            const loginPage = new LoginPage(page);
            const myAccountPage = new MyAccountsPage(page);
            const config = new TestConfig();
            const testurl = config.appUrl;
            await page.goto(testurl);
            const title = await homePage.doesTitleExists();
            expect(title).toBe(true);
            await homePage.clickMyAccount();
            await homePage.clickLoginLink();
            const loginText = loginPage.verifyLoginPageLoading();
            expect(loginText).toBe(true);
            await loginPage.loginToApplication(username, password);
            const myAccountsText = myAccountPage.verifyMyAccountsHeader();
            expect(myAccountsText).toBe(true);

        }
    )
}