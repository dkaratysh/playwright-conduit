import { BasePage } from './BasePage';
import type { Locator, Page } from '@playwright/test';

export class HomePage extends BasePage {
  readonly newArticleButton: Locator;

  constructor(page: Page) {
    super(page);

    this.newArticleButton = page.getByRole('link', { name: 'New Article' });
  }

  async open() {
    await this.page.goto('/');
  }

  async goToEditor() {
    await this.newArticleButton.click();
  }
}
