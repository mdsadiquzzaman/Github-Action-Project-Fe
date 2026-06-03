import { test, expect } from '@playwright/test';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { BrandsPage } from './pages/BrandsPage';

test.describe('Brands CRUD Flow', { tag: '@brand' }, () => {
  let authPage, dashboardPage, brandsPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    dashboardPage = new DashboardPage(page);
    brandsPage = new BrandsPage(page);

    await authPage.goto();
    await authPage.login('pw@test.com', 'password123');
    await dashboardPage.gotoBrands();
  });

  test('should create a new brand', async ({ page }) => {
    await brandsPage.createBrand('Playwright Brand', 'USA', 'https://pw.dev', 'Testing framework');
    
    await expect(page.getByText('Testing framework', { exact: true })).toBeVisible();
  });

  test('should delete a brand', async ({ page }) => {
    await brandsPage.createBrand('Delete Me Brand', 'UK', 'test.com', 'To be deleted');
    await expect(page.getByText('Delete Me Brand', { exact: true })).toBeVisible();

    await brandsPage.deleteBrand('Delete Me Brand');
    
    await expect(page.getByText('Delete Me Brand')).not.toBeVisible();
  });
});