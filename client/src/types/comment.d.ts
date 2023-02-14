export interface IComment {
  comment: string;
  contentId: string;
  createdAt: string;
  updatedAt: string;
  responseTo: string;
  userId: IUser;
  __v: number;
  _id: string;
}
