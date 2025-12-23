import type { Page } from '@playwright/test';
import { HomePage } from './HomePage';
import { EditorPage } from './EditorPage';
import { ArticlePage } from './ArticlePage';
import { LoginPage } from './LoginPage';

export class Pages {
  constructor(private readonly page: Page) {}

  get home() {
    return new HomePage(this.page);
  }

  get editor() {
    return new EditorPage(this.page);
  }

  get article() {
    return new ArticlePage(this.page);
  }

  get login() {
    return new LoginPage(this.page);
  }
}
