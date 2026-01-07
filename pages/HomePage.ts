import { BasePage } from './BasePage';
import type { Locator, Page } from '@playwright/test';
import { NavbarComponent } from '../components/navbar.component';

export class HomePage extends BasePage {
  readonly navbar: NavbarComponent;

  readonly banner: Locator;
  readonly globalFeedTab: Locator;
  readonly yourFeedTab: Locator;

  constructor(page: Page) {
    super(page);
    this.navbar = new NavbarComponent(this.page);

    this.banner = this.page.locator('.banner');
    this.globalFeedTab = this.page.getByRole('link', { name: 'Global Feed' });
    this.yourFeedTab = this.page.getByRole('link', { name: 'Your Feed' });
  }

  async goToEditor() {
    await this.navbar.goToEditor();
  }

  async goto() {
    await this.page.goto('/');
  }
}
