import { useQuery } from 'react-query';

import { getTrendingMedia } from 'services/tmdb';
import { tmdbKeys } from 'utils/keys';

export default function useTrendingMediaQuery() {
  return useQuery(tmdbKeys.popular(), getTrendingMedia, {
    staleTime: 1000 * 60 * 60 * 6,
  });
}
