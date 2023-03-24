type MediaType = 'movie' | 'tv' | 'person';

type Results = TvResult | MovieResult;
type SearchResults = TvResult | MovieResult | PsersonResult;

interface PsersonResult extends Omit<Person, 'credit_id'> {
  media_type: MediaType;
}

interface Credits {
  cast: Cast[];
  crew: Crew[];
}

interface PersonDetails
  extends Omit<Person, 'credit_id' | 'original_name' | 'known_for'> {
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: null | string;
  homepage: string;
  imdb_id: string;
  place_of_birth: string;
}

interface Person {
  adult: boolean;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  profile_path: string | null;
  popularity: number;
  known_for: Results[];
}

interface Cast extends Person {
  cast_id: number;
  character: string;
  order: number;
}

interface Crew extends Person {
  department: string;
  job: string;
}

interface Result {
  adult: boolean;
  genre_ids: number[];
  backdrop_path: string | null;
  media_type: MediaType;
  id: number;
  vote_average: number;
  vote_count: number;
  poster_path: string | null;
  popularity: number;
  overview: string;
  original_language: string;
}

interface TvResult extends Result {
  first_air_date: string;
  name: string;
  origin_country: string[];
  original_name: string;
}

interface MovieResult extends Result {
  original_title: string;
  release_date: string;
  title: string;
  video: false;
}

interface TrendingData {
  page: number;
  results: Results[];
  total_pages: number;
  total_results: number;
}

interface MoviesData {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
}

interface SearchData {
  page: number;
  results: SearchResults[];
  total_pages: number;
  total_results: number;
}

interface MovieDetails extends Omit<MovieResult, 'media_type'> {
  belongs_to_collection: null | object;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  imdb_id: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  revenue: number;
  runtime: number;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
}

interface TvDetails extends Omit<TvResult, 'media_type'> {
  created_by: {
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    profile_path: string;
  }[];
  episode_run_time: number[];
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  next_episode_to_air: null;
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: [];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  }[];
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  type: string;
}
