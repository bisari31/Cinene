interface CineneData {
  average: number;
  votes: number;
  name: string;
  poster: string;
  tmdbId: number;
  type: MediaTypes;
  __v: number;
  _id: string;
}

interface FavoritesContent {
  contentId: CineneData;
  userId: string;
  __v: number;
  _id: string;
}

interface FavoritesData {
  contents: FavoritesContent[];
  success: boolean;
}

interface TopRatedData {
  contents: CineneData[];
  success: boolean;
}
