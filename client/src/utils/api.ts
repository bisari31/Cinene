type Data = IMovieTvDetails | undefined;

export const getMediaTitle = (data: Data) => data?.title || data?.name;

export const getMediaOverview = (data: Data) => data?.overview;
