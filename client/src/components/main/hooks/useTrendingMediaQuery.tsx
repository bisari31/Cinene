import { useQuery } from 'react-query';

import { getTrendingMedia } from 'services/tmdb';
import { tmdbKeys } from 'utils/keys';
import { staleTime } from 'utils/queryOptions';

export default function useTrendingMediaQuery() {
  return useQuery(tmdbKeys.popular(), getTrendingMedia, {
    ...staleTime,
  });
}
