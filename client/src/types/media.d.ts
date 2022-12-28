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

interface ICombinedCredits {
  crew: IMediaResults[];
  cast: IMediaResults[];
}

interface IMediaData {
  page: number;
  results: IMediaResults[];
  total_pages: number;
  total_results: number;
}

interface newResults
  extends Pick<
      Crew,
      | 'known_for_department'
      | 'media_type'
      | 'name'
      | 'popularity'
      | 'profile_path'
    >,
    IMediaResults {}

interface ISearchData {
  page: number;
  results: newResults[];
  total_pages: number;
  total_results: number;
}

interface IVideos {
  id: number;
  results: [
    {
      iso_639_1: string;
      iso_3166_1: string;
      name: string;
      key: string;
      site: string;
      size: 1080;
      type: string;
      official: boolean;
      published_at: string;
      id: string;
    },
  ];
}

type IMovieTvDetails = IMovieDetails & ITvDetails;

interface IMovieDetails {
  adult: false;
  backdrop_path: string;
  belongs_to_collection: null | object;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
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
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface ITvDetails {
  adult: false;
  backdrop_path: string;
  created_by: {
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    profile_path: string;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
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
  name: string;
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  next_episode_to_air: null;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
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
  vote_average: number;
  vote_count: number;
}
