type MediaType = string | undefined;
type Data = IMediaResultsInDetail | undefined;

export const getMediaTitle = (type: MediaType, data: Data) => {
  if (!data) return;
  if (type === 'movie') return data.title;
  return `${
    data?.seasons.length > 1
      ? `${data.name} ${data?.seasons[data.seasons.length - 1].name}`
      : data?.name
  }`;
};

export const getMediaOverview = (type: MediaType, data: Data) => {
  if (data && type === 'movie') return data.overview;
  return data?.seasons[data.seasons.length - 1].overview || data?.overview;
};

export const getReleaseDate = (type: MediaType, data: Data) => {
  if (data && type === 'movie') return data.release_date;
  return data?.seasons[data.seasons.length - 1].air_date;
};
