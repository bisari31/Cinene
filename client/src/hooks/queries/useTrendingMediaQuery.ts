import { useQuery } from 'react-query';

import { getTrendingMedia } from 'services/tmdb';

export default function useTrendingMediaQuery() {
  return useQuery(['media', 'popular'], getTrendingMedia, {
    staleTime: 1000 * 60 * 60 * 6,
  });
}
