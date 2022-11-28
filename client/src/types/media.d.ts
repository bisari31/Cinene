interface IMediaDetail {
  adult: boolean;
  backdrop_path: string;
  first_air_date?: string;
  genre_ids: {
    id: number;
    name: string;
  }[];
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

interface IMediaData {
  page: number;
  results: IMediaDetail[];
  total_pages: number;
  total_results: number;
}
