export interface Comment {
  id: number;
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

export interface CreateCommentResponse {
  comment: Comment;
}

export interface GetCommentsResponse {
  comments: Comment[];
}
