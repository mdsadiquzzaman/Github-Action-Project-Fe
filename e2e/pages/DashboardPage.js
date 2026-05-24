export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.welcomeText = page.getByText('Hello,');
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
    this.itemsTab = page.getByRole('button', { name: 'Items' });
    this.brandsTab = page.getByRole('button', { name: 'Brands' });
  }

  async gotoItems() {
    await this.itemsTab.click();
  }

  async gotoBrands() {
    await this.brandsTab.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
}