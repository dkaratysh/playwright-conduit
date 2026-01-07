import type { Page, Locator } from '@playwright/test';

export class NavbarComponent {
  readonly page: Page;

  readonly homeLink: Locator;
  readonly signInLink: Locator;
  readonly signUpLink: Locator;
  readonly profileLink: Locator;
  readonly newArticleLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.signInLink = page.getByRole('link', { name: 'Sign in' });
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });
    this.profileLink = page.locator('[href^="/profile"]');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  async goToHome() {
    await this.homeLink.click();
  }

  async goToSignIn() {
    await this.signInLink.click();
  }

  async goToSignUp() {
    await this.signUpLink.click();
  }

  async goToEditor() {
    await this.newArticleLink.click();
  }

  async goToProfile() {
    await this.profileLink.click();
  }
}
