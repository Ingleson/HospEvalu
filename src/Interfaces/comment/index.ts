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
  userId: string,
  professionalId?: string,
  content: string
}