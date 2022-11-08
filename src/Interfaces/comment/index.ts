export interface ICommentRequest {
  userId?: string,
  professionalId?: string,
  content: string
};

export interface ICommentDelete{
  userId: string,
  professionalId?: string
}

export interface ICommentUpdate{
  commentId: string,
  professionalId?: string,
  content: string
}