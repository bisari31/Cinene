interface IFavoritesContents {
  average: number;
  count: number;
  name: string;
  poster: string;
  tmdbId: number;
  type: 'movie' | 'tv' | 'person';
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
