import { BasePage } from './BasePage';
import type { Locator, Page } from '@playwright/test';
import { NavbarComponent } from '../components/navbar.component';
import { expect } from '@playwright/test';

export class HomePage extends BasePage {
  readonly navbar: NavbarComponent;

  readonly banner: Locator;
  readonly globalFeedTab: Locator;
  readonly yourFeedTab: Locator;

  constructor(page: Page) {
    super(page);
    this.navbar = new NavbarComponent(this.page);

    this.banner = this.page.locator('.banner');
    this.globalFeedTab = this.page.getByRole('button', { name: 'Global Feed' });
    this.yourFeedTab = this.page.getByRole('button', { name: 'Your Feed' });
  }

  async goToEditor() {
    await this.navbar.goToEditor();
  }

  async goto() {
    await this.page.goto('/');
  }

  async navigateToGlobalFeed() {
    await expect(this.globalFeedTab).toBeVisible();
    await this.globalFeedTab.click();
  }

  async expectEmptyFeed() {
    await expect(this.page.locator('.article-preview')).toHaveText('Articles not available.');
  }

  async expectPageVisible() {
    await expect(this.page.locator('app-root, body')).toBeVisible();
  }

  async expectMockedArticle(title: string) {
    await expect(this.page.getByText(title)).toBeVisible();
  }

  async openfirstArticle() {
    await this.page.locator('a.preview-link').nth(0).click();
  }

  async assertOpened() {
    await expect(this.globalFeedTab).toBeVisible();
  }
}
