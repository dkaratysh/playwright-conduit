import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { EditorPage } from '../../pages/EditorPage';
import { ArticlePage } from '../../pages/ArticlePage';
import { buildArticleData } from '../../test-data/article.factory';
import { createArticle, deleteArticle } from '../../fixtures/article.fixture';
import { makeUpdatedArticle } from '../../helpers/article.helpers';
import type { Article } from '../../fixtures/types/article';

test.describe('Article CRUD UI tests', () => {
  let createdArticle: Article | null = null;

  test.afterEach(async ({ request }) => {
    if (createdArticle) {
      await deleteArticle(request, createdArticle.slug);
      createdArticle = null;
    }
  });

  test('Create new article', async ({ page }) => {
    const articleData = buildArticleData();

    const homePage = new HomePage(page);
    const editorPage = new EditorPage(page);
    const articlePage = new ArticlePage(page);

    await homePage.open();
    await homePage.goToEditor();

    await editorPage.fillNewArticle(articleData);
    await editorPage.publishNewArticle();

    await articlePage.assertOpened();

    const slug = page.url().split('/article/')[1];

    createdArticle = {
      ...articleData,
      slug,
      tagList: articleData.tags,
    };

    await articlePage.expectTitle(articleData.title);
    await articlePage.expectBody(articleData.body);
  });

  test('Update the article', async ({ page, request }) => {
    const article = await createArticle(request, {
      title: `Test article ${Date.now()}`,
    });

    const articlePage = new ArticlePage(page);
    const updatedArticle = makeUpdatedArticle(article);

    await articlePage.openArticle(article.slug);
    await articlePage.assertOpened(article.slug);

    await articlePage.updateArticle(updatedArticle);

    const updatedSlug = page.url().split('/article/')[1];

    createdArticle = {
      ...article,
      ...updatedArticle,
      slug: updatedSlug,
    };

    await articlePage.expectTitle(updatedArticle.title);
    await articlePage.expectBody(updatedArticle.body);
  });

  test('Delete the article', async ({ page, request }) => {
    const article = await createArticle(request);
    createdArticle = null;

    const articlePage = new ArticlePage(page);

    await articlePage.openArticle(article.slug);
    await articlePage.assertOpened(article.slug);

    await articlePage.deleteArticle();

    await expect(page).toHaveURL(/#\/$/);

    const response = await request.get(`${process.env.BASE_URL}/api/articles/${article.slug}`);
    expect(response.status()).toBe(404);
  });
});
