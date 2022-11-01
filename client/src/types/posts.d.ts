interface IPost {
  body: string;
  createdAt: string;
  numId: number;
  title: string;
  updatedAt: string;
  views: number;
  writer: IUser;
  __v: number;
  _id: string;
}

interface IPostsData {
  posts: IPost[];
  success: boolean;
}
