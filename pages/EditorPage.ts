import { BasePage } from './BasePage';
import type { Locator, Page } from '@playwright/test';
import { ArticleFormComponent } from '../components/articleForm.component';

export class EditorPage extends BasePage {
  readonly form: ArticleFormComponent;
  readonly publishArticleButton: Locator;

  constructor(page: Page) {
    super(page);
    this.form = new ArticleFormComponent(this.page);
    this.publishArticleButton = page.getByRole('button', { name: 'Publish Article' });
  }

  async fillNewArticle(data: { title: string; description: string; body: string; tag?: string }) {
    await this.form.fillArticle(data);
  }

  async publishNewArticle() {
    await this.publishArticleButton.click();
  }

  async getSlug(): Promise<string> {
    const url = this.page.url();
    return url.split('/').pop()!;
  }
}
