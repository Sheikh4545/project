import { test, expect } from '@playwright/test';
import { attachApiLog } from '../API/apiLogger.js';
import ApiMethods from '../API/ApiMethods.js';
import testData from '../testData/apiTestData.json';
 
test.describe('Post Test Cases', () => {
    test('User Exists (409)', async ({ request }, testInfo) => {
        const api = new ApiMethods(request);
        const response = await api.post('register', testData.post.existingUser.data);
        await attachApiLog(testInfo, 'User Exists Response', response);
        expect(response.status()).toBe(testData.post.existingUser.expectedStatus);
    });
 
    test('Unauthorized (401)', async ({ request }, testInfo) => {
        const api = new ApiMethods(request);
        const response = await api.post('login', testData.post.unauthorized.data);
        await attachApiLog(testInfo, 'Unauthorized Login Response', response);
        expect(response.status()).toBe(testData.post.unauthorized.expectedStatus);
    });
 
    test('Empty password, Bad Request (400)', async ({ request }, testInfo) => {
        const api = new ApiMethods(request);
        const response = await api.post('login', testData.post.emptyPassword.data);
        await attachApiLog(testInfo, 'Empty Password Response', response);
        expect(response.status()).toBe(testData.post.emptyPassword.expectedStatus);
    });
 
    test('User Logout (200)', async ({ request }, testInfo) => {
        const api = new ApiMethods(request);
        const loginResponse = await api.post('login', testData.post.logoutLogin.data);
        await attachApiLog(testInfo, 'Login Response for Logout Test', loginResponse);
        expect(loginResponse.status()).toBe(testData.post.logoutLogin.expectedStatus);
 
        const logoutResponse = await api.post('logout');
        await attachApiLog(testInfo, 'Logout API Response', logoutResponse);
        expect(logoutResponse.status()).toBe(testData.post.logout.expectedStatus);
    });
 
    test('User Not Found (404)', async ({ request }, testInfo) => {
        const api = new ApiMethods(request);
        const response = await api.post('login', testData.post.userNotFound.data);
        await attachApiLog(testInfo, 'User Not Found Response', response);
        expect(response.status()).toBe(testData.post.userNotFound.expectedStatus);
    });
 
    test('User Login', async ({ request }, testInfo) => {
        const api = new ApiMethods(request);
        const response = await api.post('login', testData.post.userLogin.data);
        await attachApiLog(testInfo, 'User Login Response', response);
        expect(response.status()).toBe(testData.post.userLogin.expectedStatus);

        
    });
});
