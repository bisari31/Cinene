interface CineneData {
  content_type: MediaType;
  title: string;
  poster_url: string;
  tmdbId: number;
  average: number;
  votes: number;
  __v: number;
  _id: string;
}

interface FavoritesContent {
  content: CineneData;
  liked_by: string;
  __v: number;
  _id: string;
}

interface FavoritesData {
  contents: FavoritesContent[];
  success: boolean;
  accessToken?: string;
}

interface TopRatedData {
  contents: CineneData[];
  success: boolean;
}
