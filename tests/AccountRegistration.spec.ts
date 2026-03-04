import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { TestConfig } from '../test.config';
import { RandomUtilGenerator } from '../utils/RandomUtilGenerator';

let homepage: HomePage;
let registrationpage: RegistrationPage;

test.beforeEach('test case set up', async ({ page }) => {
    const config = new TestConfig();
    const testurl = config.appUrl;
    await page.goto(testurl);

    homepage = new HomePage(page);
    registrationpage = new RegistrationPage(page);
});

test.afterEach('tear down', async ({ page }) => {
    await page.waitForTimeout(5000);
    await page.close();
});

test('registration test',
    {
        tag: ['@master', '@sanity', '@regression', '@smoke'],
        annotation: { type: 'issue', description: 'jira-7797' }
    },
    async () => {
        await homepage.clickMyAccount();
        await homepage.clickRegisterLink();
        let isRegPageLandingSuccess: boolean = await registrationpage.verifyRegistrationPageLoading();
        expect(isRegPageLandingSuccess).toBe(true);

        let firstname = RandomUtilGenerator.getFirstName();
        let lastname = RandomUtilGenerator.getLastName();
        let email = RandomUtilGenerator.getEmailAddress();
        let password = RandomUtilGenerator.getPassword();
        let telephone = RandomUtilGenerator.getTelephoneNumber();

        registrationpage.fillRegistrationForm(firstname, lastname, email, password, telephone);
        let confirmationMessage = await registrationpage.getConfirmationMessage();
        console.log(confirmationMessage);
        expect(confirmationMessage).toContain('Your Account Has Been Created!');

    }
)