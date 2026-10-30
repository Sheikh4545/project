
import { attachStepScreenshot } from '../utilities/screenshot.js';
import {test} from  '../Fixture/TestSetup.js';
import { AppConfig } from '../testdata/AppConfig.js';
class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = this.page.locator('#username');
        this.password = this.page.locator('#password');
        this.loginButton = this.page.locator('#login');
        this.message = this.page.locator('.welcome_menu');
    }

    async gotoUrl() {
        await this.page.goto(AppConfig.loginUrl);
    }

    async login(username, password) {
        await test.step('After URL open', async () => {
            await attachStepScreenshot(this.page, '01 - After URL open');
        });

        await test.step('Enter username', async () => {
            await this.username.fill(username);
            await attachStepScreenshot(this.page, '02 - After username');
        });

        await test.step('Enter password', async () => {
            await this.password.fill(password);
            await attachStepScreenshot(this.page, '03 - After password');
        });

        await test.step('Click Login', async () => {
            await this.loginButton.click();
            await attachStepScreenshot(this.page, '04 - After login click');
        });
    }
}

export default LoginPage;
