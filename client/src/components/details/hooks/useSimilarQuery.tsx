import { useQuery } from 'react-query';

import { getFilmography, getSimilarMedia } from 'services/tmdb';
import { queryOptions, tmdbKeys } from 'utils/queryOptions';

export default function useSimilarQuery(
  id: number,
  path: MediaType,
  type?: 'crew' | 'cast',
) {
  const { data: similarData } = useQuery(
    tmdbKeys.similar(path, id),
    () => getSimilarMedia(id, path),
    { ...queryOptions, enabled: !type },
  );

  const { data: filmographyData } = useQuery(
    tmdbKeys.filmography(path, id),
    () => getFilmography(id),
    {
      ...queryOptions,
      enabled: !!type,
    },
  );

  return {
    similarData,
    filmographyData,
  };
}
