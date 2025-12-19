import { BasePage } from './BasePage';
import type { Locator, Page } from '@playwright/test';

export class EditorPage extends BasePage {
  readonly articleTitleInput: Locator;
  readonly articleAboutInput: Locator;
  readonly articleTextInput: Locator;
  readonly articleTagsInput: Locator;
  readonly publishArticleButton: Locator;

  constructor(page: Page) {
    super(page);

    this.articleTitleInput = page.getByPlaceholder('Article Title');
    this.articleAboutInput = page.getByPlaceholder("What's this article about?");
    this.articleTextInput = page.getByPlaceholder('Write your article (in markdown)');
    this.articleTagsInput = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', { name: 'Publish Article' });
  }

  async fillNewArticle(data: { title: string; description: string; body: string; tag?: string }) {
    await this.articleTitleInput.fill(data.title);
    await this.articleAboutInput.fill(data.description);
    await this.articleTextInput.fill(data.body);

    if (data.tag) {
      await this.articleTagsInput.fill(data.tag);
    }
  }
  async publishNewArticle() {
    await this.publishArticleButton.click();
  }

  async getSlug(): Promise<string> {
    const url = this.page.url(); // https://conduit.../article/slug-value
    return url.split('/').pop()!;
  }
}
