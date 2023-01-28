interface IPost {
  body: string;
  createdAt: string;
  seq: number;
  title: string;
  updatedAt: string;
  views: number;
  writer: IUser;
  __v: number;
  _id: string;
  commentsNum: number;
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

interface IFavoritesContents {
  average: number;
  count: number;
  name: string;
  poster: string;
  tmdbId: number;
  type: string;
  __v: number;
  _id: string;
}

interface IFavoritesContent {
  contentId: IFavoritesContents;
  userId: string;
  __v: number;
  _id: string;
}

interface IFavoritesData {
  contents: IFavoritesContent[];
  success: boolean;
}
