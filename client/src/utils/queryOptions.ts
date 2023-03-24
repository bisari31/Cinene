export const queryOptions = {
  staleTime: 1000 * 60 * 30,
  cacheTime: 1000 * 60 * 40,
};

export const tmdbKeys = {
  default: ['tmdb'],
  popular: () => [...tmdbKeys.default, 'popular'],
  nowPlaying: () => [...tmdbKeys.default, 'nowPlaying'],
  upcoming: () => [...tmdbKeys.default, 'upcoming'],
  topRated: () => [...tmdbKeys.default, 'topRated'],
  search: (text: string) => [...tmdbKeys.default, 'search', text],
  credits: (path?: MediaType, id?: number) => [
    ...tmdbKeys.default,
    path,
    id,
    'credit',
  ],
  similar: (path: MediaType, id: number) => [
    ...tmdbKeys.default,
    path,
    id,
    'similar',
  ],
  filmography: (path: MediaType, id: number) => [
    ...tmdbKeys.default,
    path,
    id,
    'filmography',
  ],
  detail: (path?: MediaType, id?: number) => [
    ...tmdbKeys.default,
    path,
    id,
    'detail',
  ],
};

export const cineneKeys = {
  default: ['cinene'],
  topRated: () => [...cineneKeys.default, 'topRated'],
  favorites: () => [...cineneKeys.default, 'favorites'],
  comments: (id?: string) => [...cineneKeys.default, id, 'comments'],
  reviews: (path?: MediaType, id?: number, loggedIn?: boolean) => [
    ...cineneKeys.default,
    path,
    id,
    'reviews',
    { loggedIn },
  ],
  detail: (path?: MediaType, id?: number) => [...cineneKeys.default, path, id],
  likes: (path?: 'comments' | 'content', id?: string, loggedIn?: boolean) => [
    ...cineneKeys.default,
    path,
    id,
    'likes',
    { loggedIn },
  ],
};
