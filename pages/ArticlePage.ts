import { BasePage } from './BasePage';
import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class ArticlePage extends BasePage {
  readonly articleTitleInput: Locator;
  readonly articleAboutInput: Locator;
  readonly articleTextInput: Locator;
  readonly articleTagsInput: Locator;
  readonly delete: Locator;
  readonly edit: Locator;
  readonly submitUpdate: Locator;
  readonly articleTitle: Locator;
  readonly articleBody: Locator;

  constructor(page: Page) {
    super(page);

    this.articleTitleInput = page.getByPlaceholder('Article Title');
    this.articleAboutInput = page.getByPlaceholder("What's this article about?");
    this.articleTextInput = page.getByPlaceholder('Write your article (in markdown)');
    this.articleTagsInput = page.getByPlaceholder('Enter tags');
    this.edit = page.getByRole('button', { name: ' Edit Article' });
    this.delete = page.getByRole('button', { name: 'Delete Article' });
    this.submitUpdate = page.getByRole('button', { name: 'Update Article' });
    this.articleTitle = page.getByRole('heading');
    this.articleBody = page.locator('.article-content');
  }

  async openArticle(slug: string) {
    const homeUrl = `${process.env.BASE_URL}/#/article/${slug}`;
    await this.page.goto(homeUrl);
  }

  async assertOpened(slug?: string) {
    await expect(this.page).toHaveURL(/#\/article\//);
    if (slug) {
      await expect(this.page).toHaveURL(new RegExp(slug));
    }
  }

  async updateArticle(data: { title: string; description: string; body: string; tag?: string }) {
    await this.edit.nth(0).click();
    await this.articleTitleInput.fill(data.title);
    await this.articleAboutInput.fill(data.description);
    await this.articleTextInput.fill(data.body);
    await this.submitUpdate.click();
    await Promise.all([this.page.waitForURL(/#\/article\//), this.submitUpdate.click()]);
  }

  async expectTitle(text: string) {
    await expect(this.articleTitle).toHaveText(text);
  }

  async expectBody(text: string) {
    await expect(this.articleBody).toContainText(text);
  }

  async getCurrentSlug(): Promise<string> {
    const url = this.page.url();

    const match = url.match(/#\/(article|editor)\/(.+)$/);
    if (!match) {
      throw new Error(`Cannot extract article slug from URL: ${url}`);
    }

    return match[2];
  }

  async deleteArticle() {
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });

    await this.delete.nth(0).click();
  }
}
