import { test, expect } from '@playwright/test';
import { UserApi, newTestUser } from '../../PagesAPI/UserApi.js';

test('PUT User API Test', async ({ request }) => {
  const api = new UserApi(request);
  const user = newTestUser('put');

  // Fresh user every run (old fixed user "fahad1" no longer exists -> 404)
  await api.registerAndLogin(user);

  const putResponse = await api.replaceAccount({
    fullname: 'Updated User',
    email: `updated_${user.email}`,
    username: `${user.username}u`,
    password: user.password,
  });
  console.log(await putResponse.json());
  expect(putResponse.status()).toBe(200);

  // Cleanup: remove the test user (best effort)
  await api.deleteAccount().catch(() => {});
});
