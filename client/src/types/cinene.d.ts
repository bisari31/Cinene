interface ICineneData {
  average: number;
  votes: number;
  name: string;
  poster: string;
  tmdbId: number;
  type: MediaTypes;
  __v: number;
  _id: string;
}

interface IFavoritesContent {
  contentId: ICineneData;
  userId: string;
  __v: number;
  _id: string;
}

interface IFavoritesData {
  contents: IFavoritesContent[];
  success: boolean;
}

interface ITopRatedData {
  contents: ICineneData[];
  success: boolean;
}
