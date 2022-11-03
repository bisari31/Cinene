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

interface IPostUpdateBody {
  postId: string;
  userId: string;
  title: string;
  body: string;
}
