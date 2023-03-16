export const tmdbKeys = {
  default: ['tmdb'],
  popular: () => [...tmdbKeys.default, 'popular'],
  nowPlaying: () => [...tmdbKeys.default, 'nowPlaying'],
  upcoming: () => [...tmdbKeys.default, 'upcoming'],
  topRated: () => [...tmdbKeys.default, 'topRated'],
  search: (text: string) => [...tmdbKeys.default, 'search', text],
  credits: (path?: MediaTypes, id?: number) => [
    ...tmdbKeys.default,
    path,
    id,
    'credit',
  ],
  similar: (path?: MediaTypes, id?: number) => [
    ...tmdbKeys.default,
    path,
    id,
    'similar',
  ],
  detail: (path?: MediaTypes, id?: number) => [
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
  reviews: (path?: MediaTypes, id?: number, loggedIn?: boolean) => [
    ...cineneKeys.default,
    path,
    id,
    'reviews',
    { loggedIn },
  ],
  detail: (path?: MediaTypes, id?: number) => [...cineneKeys.default, path, id],
  newDetail: (path?: MediaTypes, id?: number) => [
    ...cineneKeys.default,
    'new',
    path,
    id,
  ],
  likes: (path?: 'comments' | 'content', id?: string, loggedIn?: boolean) => [
    ...cineneKeys.default,
    path,
    id,
    'likes',
    { loggedIn },
  ],
};

export const authKeys = {
  default: ['auth'],
  id: (id?: string) => [...authKeys.default, id],
};
