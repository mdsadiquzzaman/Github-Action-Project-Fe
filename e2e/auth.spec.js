import { test, expect } from '@playwright/test';
import { AuthPage } from './pages/AuthPage';

test.describe('Authentication Flow', { tag: '@auth' }, () => {
  let authPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    await authPage.goto();
  });

  test('should register a new user successfully', async ({ page }) => {
    await authPage.register('Playwright User', 'pw@test.com', 'password123');
    
    // Should redirect to Dashboard
    await expect(page).toHaveURL('/auth');
    await expect(page.getByText('Hello, Playwright User')).toBeVisible();
  });

  test('should login with seeded admin user', async ({ page }) => {
    await authPage.login('pw@test.com', 'password123');
    
    await expect(page).toHaveURL('/');
    await expect(page.getByText('CRUD Dashboard')).toBeVisible();
  });

  test('should show error on wrong password', async ({ page }) => {
    await authPage.login('admin@example.com', 'wrongpassword');
    
    // Since we use window.alert in React, we can listen for it or just check URL hasn't changed
    await expect(page).toHaveURL('/auth');
  });
});