export interface Comment {
  id: CommentId;
  body: string;
  updatedAt: string;
  createdAt: string;
  author: {
    username: string;
    bio: string | null;
    image: string | null;
    following: boolean;
    followersCount: number;
  };
}

export type CommentId = number & { readonly __brand: 'CommentId' };

export function parseCommentFromApi(raw: any): Comment {
  return {
    ...raw,
    id: raw.id as CommentId,
  };
}

export function parseCommentsFromApi(raw: any[]): Comment[] {
  return raw.map(parseCommentFromApi);
}
