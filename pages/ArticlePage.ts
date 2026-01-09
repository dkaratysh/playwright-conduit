import { BasePage } from './BasePage';
import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { ArticleFormComponent } from '../components/articleForm.component';

export class ArticlePage extends BasePage {
  readonly form: ArticleFormComponent;
  readonly delete: Locator;
  readonly edit: Locator;
  readonly submitUpdate: Locator;
  readonly articleTitle: Locator;
  readonly articleBody: Locator;
  readonly commentInput: Locator;
  readonly postCommentButton: Locator;
  readonly commentLocator: Locator;
  readonly favoriteIcon: Locator;
  readonly favoriteCount: Locator;

  constructor(page: Page) {
    super(page);

    this.form = new ArticleFormComponent(this.page);

    this.edit = page.getByRole('button', { name: ' Edit Article' });
    this.delete = page.getByRole('button', { name: 'Delete Article' });
    this.submitUpdate = page.getByRole('button', { name: 'Update Article' });
    this.articleTitle = page.locator('.article-page h1');
    this.articleBody = page.locator('.article-content');
    this.commentInput = page.getByPlaceholder('Write a comment...');
    this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
    this.commentLocator = page.locator('.card-text');
    this.favoriteIcon = page.locator('.article-page .banner button', { hasText: 'Favorite' });
    this.favoriteCount = this.favoriteIcon.locator('span.counter');
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
    await this.form.fillArticle(data);
    await Promise.all([
      this.page.waitForURL(/#\/article\//), 
      this.submitUpdate.click()]);
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

  async postComment(comment: string) {
    await this.commentInput.fill(comment);
    await this.postCommentButton.click();
  }

  async expectCommentVisible(comment: string) {
    await expect(this.commentLocator.filter({ hasText: comment }).first()).toBeVisible();
  }

  async deleteComment(comment: string) {
    const commentCard = this.page
      .locator('.card')
      .filter({
        has: this.page.locator('.card-text', { hasText: comment }),
      })
      .first();

    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });

    await commentCard.locator('button:has(i.ion-trash-a)').click();

    await expect(commentCard).toHaveCount(0);
  }

  async expectNoComments(comment: string) {
    await expect(this.commentLocator.filter({ hasText: comment }).first()).toHaveCount(
      0,
    );
  }

  async clickFavorite() {
    await this.favoriteIcon.click();
  }

  async getFavoriteCount(): Promise<number> {
    const text = await this.favoriteCount.textContent();
    return Number(text);
  }

  async expectFavorited() {
    await expect(this.favoriteIcon).toHaveClass(/btn-primary/);
  }

  async expectNotFavorited() {
    await this.favoriteIcon.waitFor({ state: 'visible' });
    await expect(this.favoriteIcon).toHaveClass(/btn-outline-primary/);
  }

  async expectedTitle(title: string) {
    await expect(this.articleTitle).toHaveText(title);
  }
}
