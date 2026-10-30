import { test, expect } from '@playwright/test';
import { UserApi, newTestUser } from '../../PagesAPI/UserApi.js';

test('Delete User API Test', async ({ request }) => {
  const api = new UserApi(request);

  // Create a fresh user every run (old fixed user "faizanali" no longer exists -> 404)
  await api.registerAndLogin(newTestUser('del'));

  const deleteResponse = await api.deleteAccount();
  expect(deleteResponse.status()).toBe(200);
});

test('Without auth user delete (401)', async ({ request }) => {
  const api = new UserApi(request);
  const deleteResponse = await api.deleteAccount();
  expect(deleteResponse.status()).toBe(401);
});
