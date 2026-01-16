import type { Article } from '../../types/article';
import { expect } from '@playwright/test';

export function validateArticleSchema(article: any): asserts article is Article {
  expect(article).toHaveProperty('slug');
  expect(article).toHaveProperty('title');
  expect(article).toHaveProperty('description');
  expect(article).toHaveProperty('body');
  expect(article).toHaveProperty('tagList');
  expect(Array.isArray(article.tagList)).toBe(true);
  expect(article).toHaveProperty('createdAt');
  expect(article).toHaveProperty('updatedAt');
  expect(article).toHaveProperty('favorited');
  expect(typeof article.favorited).toBe('boolean');
  expect(article).toHaveProperty('favoritesCount');
  expect(typeof article.favoritesCount).toBe('number');

  expect(article).toHaveProperty('author');
  expect(article.author).toHaveProperty('username');
  expect(article.author).toHaveProperty('bio');
  expect(article.author).toHaveProperty('image');
  expect(article.author).toHaveProperty('following');
  expect(typeof article.author.following).toBe('boolean');
  expect(article.author).toHaveProperty('followersCount');
  expect(typeof article.author.followersCount).toBe('number');
}
