import { expect } from '@playwright/test';
import { BaseApi } from './BaseApi.js';

export class UserApi extends BaseApi {
    constructor(request) {
        super(request);
        this.users = `${this.baseURL}/api/v1/users`;
    }

    async registerUser(payload) {
        return this.request.post(`${this.users}/register`, { headers: await this.getHeaders(), data: payload });
    }

    async loginUser(payload) {
        return this.request.post(`${this.users}/login`, { headers: await this.getHeaders(), data: payload });
    }

    async updateAccount(payload) {
        return this.request.patch(`${this.users}/update-account`, { headers: await this.getHeaders(), data: payload });
    }

    async replaceAccount(payload) {
        return this.request.put(`${this.users}/replace-account`, { headers: await this.getHeaders(), data: payload });
    }

    async deleteAccount() {
        return this.request.delete(`${this.users}/delete-account`, { headers: await this.getHeaders() });
    }

    /** Register a brand new user, then log in. The `request` context keeps the auth cookie. */
    async registerAndLogin(user) {
        const reg = await this.registerUser(user);
        expect(reg.ok(), `register failed: ${reg.status()} ${await reg.text()}`).toBeTruthy();
        const login = await this.loginUser(user);
        expect(login.status(), `login failed: ${await login.text()}`).toBe(200);
        return login;
    }
}

/** Unique user per test run, so tests never depend on a user that a previous run deleted. */
export function newTestUser(prefix = 'pw') {
    const id = `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;
    return {
        fullname: `${id} tester`,
        email: `${id}@example.com`,
        username: id,
        password: `${id}Pass`,
    };
}
