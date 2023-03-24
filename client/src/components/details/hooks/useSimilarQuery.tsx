import { useQuery } from 'react-query';
import { getFilmography, getSimilarMedia } from 'services/tmdb';
import { tmdbKeys } from 'utils/keys';
import { staleTime } from 'utils/queryOptions';

export default function useSimilarQuery(
  id: number,
  path: MediaType,
  type?: 'crew' | 'cast',
) {
  const { data: similarData } = useQuery(
    tmdbKeys.similar(path, id),
    () => getSimilarMedia(id, path),
    { ...staleTime, enabled: !type },
  );

  const { data: filmographyData } = useQuery(
    tmdbKeys.filmography(path, id),
    () => getFilmography(id),
    {
      ...staleTime,
      enabled: !!type,
    },
  );

  return {
    similarData,
    filmographyData,
  };
}
