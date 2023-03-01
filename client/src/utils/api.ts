export const getMediaTitle = (data?: IMovieDetails | ITvDetails) => {
  if (!data) return;
  if ('title' in data) return data.title;
  return data.name;
};

export const getMediaOverview = (data?: IMovieDetails | ITvDetails) => {
  if (!data) return;
  return 'overview' in data && data.overview;
};
