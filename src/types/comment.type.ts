export type CreateCommentDto = {
  lessonId: number;
  userId: number;
  content: string;
  parentCommentId: number;
}

export type CommentProps = {
  commentId: number;
  username: string;
  content: string;
  commentTime: Date;
  hasChildren: boolean;
};
