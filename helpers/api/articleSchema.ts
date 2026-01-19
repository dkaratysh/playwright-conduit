import type { Article } from '../../types/article';
import { expect } from '@playwright/test';

export function validateArticleSchema(article: unknown): asserts article is Article {
  expect(typeof article).toBe('object');
  expect(article).not.toBeNull();

  const a = article as Record<string, unknown>;
  
  expect(article).toHaveProperty('slug');
  expect(article).toHaveProperty('title');
  expect(article).toHaveProperty('description');
  expect(article).toHaveProperty('body');
  expect(article).toHaveProperty('tagList');
  expect(Array.isArray(a.tagList)).toBe(true);
  expect(article).toHaveProperty('createdAt');
  expect(article).toHaveProperty('updatedAt');
  expect(article).toHaveProperty('favorited');
  expect(typeof a.favorited).toBe('boolean');
  expect(article).toHaveProperty('favoritesCount');
  expect(typeof a.favoritesCount).toBe('number');
  expect(article).toHaveProperty('author');

  const author = a.author as Record<string, unknown>;
  
  expect(author).toHaveProperty('username');
  expect(author).toHaveProperty('bio');
  expect(author).toHaveProperty('image');
  expect(author).toHaveProperty('following');
  expect(typeof author.following).toBe('boolean');
  expect(author).toHaveProperty('followersCount');
  expect(typeof author.followersCount).toBe('number');
}
