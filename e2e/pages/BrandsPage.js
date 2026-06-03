export class BrandsPage {
  constructor(page) {
    this.page = page;
    this.nameInput = page.locator("//div//div//div//div//div[1]//input[1]");
    this.countryInput = page.locator("//div//div//div//div//div[1]//input[1]");
    this.websiteInput = page.locator("//div//div//div//div//div[1]//input[1]")
    this.descriptionInput = page.locator("//div//div//div//div//div[1]//input[1]")
    this.submitButton = page.getByRole('button', { name: 'Add' });
    this.tableRow = (name) => page.getByText(name).locator('..');
  }

  async createBrand(name, country, website = '', description = '') {
    await this.nameInput.fill(name);
    await this.countryInput.fill(country);
    if (website) await this.websiteInput.fill(website);
    if (description) await this.descriptionInput.fill(description);
    await this.submitButton.click();
  }

  async deleteBrand(name) {
    const row = this.tableRow(name);
    
    this.page.on('dialog', dialog => dialog.accept());
    await this.page.locator('button').filter({ hasText: 'Delete' }).last().click();
  }
}