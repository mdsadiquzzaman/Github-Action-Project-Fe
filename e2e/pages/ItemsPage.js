export class ItemsPage {
  constructor(page) {
    this.page = page;
    this.nameInput = page.locator("//div[@class='bg-white p-6 rounded-lg shadow-md border-t-2 border-blue-600']//div[1]//input[1]");
    this.priceInput = page.locator("//div[@class='bg-white p-6 rounded-lg shadow-md border-t-2 border-blue-600']//div[2]//input[1]");
    this.descriptionInput = page.locator("//div[@class='bg-white p-6 rounded-lg shadow-md border-t-2 border-blue-600']//div[3]//input[1]");
    this.submitButton = page.page.getByText('Add', { exact: true });
    this.tableRow = (name) => page.getByText(name).locator('..');
 
  }

  async createItem(name, price, description = '') {
    await this.nameInput.fill(name);
    await this.priceInput.fill(String(price));
    if (description) await this.descriptionInput.fill(description);
    await this.submitButton.click();
  }

  async editItem(oldName, newName, newPrice) {
    const row = this.tableRow(oldName);
    await row.getByText('Edit').click();
    
    await this.nameInput.clear();
    await this.nameInput.fill(newName);
    await this.priceInput.clear();
    await this.priceInput.fill(String(newPrice));
    
    await this.page.getByRole('button', { name: 'Update' }).click();
  }

  async deleteItem(name) {
    const row = this.tableRow(name);
    this.page.on('dialog', dialog => dialog.accept());
    await row.getByText('Delete').click();
  }
}