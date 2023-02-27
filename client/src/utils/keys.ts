export const tmdbKeys = {
  default: ['tmdb'],
  popular: () => [...tmdbKeys.default, 'populr'],
};
