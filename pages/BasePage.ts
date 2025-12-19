import type { Page } from '@playwright/test';

export abstract class BasePage {
  protected constructor(protected page: Page) {}

  async open(path: string = '/') {
    const BASE_URL = process.env.BASE_URL;
    if (!BASE_URL) throw new Error('BASE_URL does not exist in .env');
    await this.page.goto(`${BASE_URL}${path}`);
  }
}
