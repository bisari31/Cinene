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
  similar: (path?: MediaType, id?: number) => [
    ...tmdbKeys.default,
    path,
    id,
    'similar',
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
  newDetail: (path?: MediaType, id?: number) => [
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

// export const authKeys = {
//   default: ['auth'],
//   id: (id?: string) => [...authKeys.default, id],
// };
