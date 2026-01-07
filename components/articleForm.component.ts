import type { Locator, Page } from '@playwright/test';

export class ArticleFormComponent {
  readonly page: Page;
  readonly articleTitleInput: Locator;
  readonly articleAboutInput: Locator;
  readonly articleTextInput: Locator;
  readonly articleTagsInput: Locator;

  constructor(page: Page) {
    this.page = page;

    this.articleTitleInput = page.getByPlaceholder('Article Title');
    this.articleAboutInput = page.getByPlaceholder("What's this article about?");
    this.articleTextInput = page.getByPlaceholder('Write your article (in markdown)');
    this.articleTagsInput = page.getByPlaceholder('Enter tags');
  }

  async fillArticle(data: { title: string; description: string; body: string; tag?: string }) {
    await this.articleTitleInput.fill(data.title);
    await this.articleAboutInput.fill(data.description);
    await this.articleTextInput.fill(data.body);

    if (data.tag) {
      await this.articleTagsInput.fill(data.tag);
    }
  }
}
