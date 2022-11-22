interface IMovies {
  adult: boolean;
  backdrop_path: string;
  first_air_date?: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title?: string;
  overview: string;
  media_type: string;
  popularity: number;
  name?: string;
  poster_path: string;
  original_name?: string;
  release_date: string;
  title?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface IMovieData {
  page: number;
  results: IMovies[];
  total_pages: number;
  total_results: number;
}
