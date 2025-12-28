export const makeUpdatedArticle = (article: any) => ({
  ...article,
  title: 'Updated ' + article.title,
  description: 'Updated ' + article.description,
  body: 'Updated ' + article.body,
});
