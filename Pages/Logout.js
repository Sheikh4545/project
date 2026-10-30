
 import { attachStepScreenshot } from '../utilities/screenshot.js';
import { test } from '../Fixture/TestSetup.js';
import { AppConfig } from '../testdata/AppConfig.js';

class Logout {
    constructor(page) {
        this.page = page;
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.loginAgainLink = page.getByRole('link', { name: 'Click here to login again' });
    }

    
    async gotoUrl(url = AppConfig.logoutUrl) {
        await test.step('Navigate to App', async () => {
            await this.page.goto(url);
            await attachStepScreenshot(this.page, '00 - Navigated to Page');
        });
    }

    async performLogout() {
        await test.step('Click Logout', async () => {
            await this.logoutLink.click();
            await attachStepScreenshot(this.page, '01 - After Logout Click');
        });
    }

    async clickLoginAgain() {
        await test.step('Click Login Again', async () => {
            await this.loginAgainLink.click();
            await attachStepScreenshot(this.page, '02 - After Login Again Click');
        });
    }
}

export default Logout;