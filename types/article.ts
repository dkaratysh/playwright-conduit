export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string | null;
    image: string | null;
    following: boolean;
    followersCount: number;
  };
}

export type ArticleSlug = string & {readonly __brand : ArticleSlug };

export function toArticleSlug(slug: string | undefined): ArticleSlug {
  if (!slug) throw new Error('Cannot parse ArticleSlug from string');
  return slug as ArticleSlug;
}

export function parseArticleFromApi(article: any): Article {
  return {
    ...article,
    slug: article.slug as ArticleSlug, 
  };
}

export function parseArticlesFromApi(articles: any[]): Article[] {
  return articles.map(parseArticleFromApi);
}