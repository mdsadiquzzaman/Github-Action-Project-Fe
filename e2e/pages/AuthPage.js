// Use 'export class' instead of 'exports.AuthPage = class'
export class AuthPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder('Email Address');
    this.passwordInput = page.getByPlaceholder('Password');
    this.nameInput = page.getByPlaceholder('Full Name');
    this.submitButton = page.getByRole('button', { name: 'Login' });
    this.toggleAuthLink = page.getByText('Need an account? Register');
  }

  async goto() {
    await this.page.goto('/auth');
  }

  async switchToRegister() {
    await this.toggleAuthLink.click();
    this.submitButton = this.page.getByRole('button', { name: 'Register' });
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();

  }

  async register(name, email, password) {
    await this.switchToRegister();
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
 
  }
}