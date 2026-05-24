import { test, expect } from '@playwright/test';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { ItemsPage } from './pages/ItemsPage';

test.describe('Items CRUD Flow', { tag: '@item' }, () => {
  let authPage, dashboardPage, itemsPage;

  // Login before every item test
  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    dashboardPage = new DashboardPage(page);
    itemsPage = new ItemsPage(page);

    await authPage.goto();
    await authPage.login('pw@test.com', 'password123');
    await dashboardPage.gotoItems();
  });

  test('should create a new item', async ({ page }) => {
    await itemsPage.createItem('Playwright Item', 99.99, 'Created via E2E');
    
    await expect(page.getByText('Playwright Item')).toBeVisible();
    await expect(page.getByText('$99.99')).toBeVisible();
  });

  test('should edit an existing item', async ({ page }) => {
    // Create an item first to ensure it exists
    await itemsPage.createItem('Old Item Name', 10);
    await expect(page.getByText('Old Item Name')).toBeVisible();

    // Edit it
    await itemsPage.editItem('Old Item Name', 'Updated Item Name', 20.00);
    
    await expect(page.getByText('Updated Item Name')).toBeVisible();
    await expect(page.getByText('$20.00')).toBeVisible();
  });

  test('should delete an item', async ({ page }) => {
    await itemsPage.createItem('Item To Delete', 50);
    await expect(page.getByText('Item To Delete')).toBeVisible();

    await itemsPage.deleteItem('Item To Delete');
    
    // Verify it's gone from the DOM
    await expect(page.getByText('Item To Delete')).not.toBeVisible();
  });
});