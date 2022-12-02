interface IGenre_ids {
  id: number;
  name: string;
}

interface IMediaResults {
  adult: boolean;
  backdrop_path: string;
  first_air_date?: string;
  genre_ids: IGenre_ids[];
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

interface IMediaResultsInDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: IGenre_ids[];
  homepage: string;
  id: number;
  last_air_date?: string;
  imdb_id: string;
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  }[];
  name?: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: any;
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean | any;
  vote_average: number;
  vote_count: number;
}

interface IMediaData {
  page: number;
  results: IMediaResults[];
  total_pages: number;
  total_results: number;
}
