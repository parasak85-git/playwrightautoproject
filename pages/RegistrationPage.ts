import { Page, expect, Locator } from '@playwright/test';

export class RegistrationPage {

    private readonly page: Page;
    private readonly hdrRegPage: Locator;
    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtEmail: Locator;
    private readonly txtTelephone: Locator;
    private readonly txtPassword: Locator;
    private readonly txtConfirmPassword: Locator;
    private readonly chckSubscribe: Locator;
    private readonly chckPrivacy: Locator;
    private readonly btnContinue: Locator;
    private readonly confirmMsg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.hdrRegPage = page.locator("//div/div/h1[text()='Register Account']");
        this.txtFirstName = page.locator("#input-firstname");
        this.txtLastName = page.locator("#input-lastname");
        this.txtEmail = page.locator("#input-email");
        this.txtTelephone = page.locator("#input-telephone");
        this.txtPassword = page.locator("#input-password");
        this.txtConfirmPassword = page.locator("#input-confirm");
        this.chckSubscribe = page.locator("//div/label/input[@type='radio' and @value='1' and @name='newsletter']");
        this.chckPrivacy = page.locator("input[name='agree']");
        this.btnContinue = page.locator("input[type='submit']");
        this.confirmMsg = page.locator("//div/div/h1[text()='Your Account Has Been Created!']");
    }

    async verifyRegistrationPageLoading(): Promise<boolean> {
        let header = await this.hdrRegPage.textContent();
        console.log(header);
        return header != null;
    }

    async fillRegistrationForm(firstName: string, lastName: string, email: string,
        password: string, telephone: string): Promise<void> {
        await this.txtFirstName.fill(firstName);
        await this.txtLastName.fill(lastName);
        await this.txtEmail.fill(email);
        await this.txtPassword.fill(password);
        await this.txtConfirmPassword.fill(password);
        await this.txtTelephone.fill(telephone);
        await this.chckSubscribe.click();
        await this.chckPrivacy.click();
        await this.btnContinue.click();
    }
    async getConfirmationMessage() {
        const confirmMsg = await this.confirmMsg.textContent();
        return confirmMsg;
    }
}