import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { getMediaDetail, getPersonDetail, IMAGE_URL } from 'services/tmdb';
import { EMPTY_IMAGE, USER_IMAGE } from 'utils/imageUrl';
import { tmdbKeys } from 'utils/keys';

export default function useDetailQuery(id: number, path: MediaType) {
  const { data: mediaData } = useQuery(
    tmdbKeys.detail(path, id),
    () => getMediaDetail(id, path),
    {
      enabled: path !== 'person',
      staleTime: 1000 * 60 * 60,
    },
  );

  const { data: personData } = useQuery(
    tmdbKeys.detail(path, id),
    () => getPersonDetail(id, path),
    {
      enabled: path === 'person',
      staleTime: 1000 * 60 * 60,
    },
  );

  const backdrop = useMemo(() => {
    if (mediaData?.backdrop_path) {
      return `${IMAGE_URL}/original/${mediaData?.backdrop_path}`;
    }
    return EMPTY_IMAGE;
  }, [mediaData?.backdrop_path]);

  const getPoster = useMemo(
    () => (pathname: string, size: 'w500' | 'original') => {
      if (pathname === 'person') {
        return personData?.profile_path
          ? `${IMAGE_URL}/${size}/${personData.profile_path}`
          : USER_IMAGE;
      }
      if (mediaData?.poster_path) {
        return `${IMAGE_URL}/${size}/${mediaData?.poster_path}`;
      }
      return EMPTY_IMAGE;
    },
    [mediaData?.poster_path, personData?.profile_path],
  );

  return { mediaData, personData, backdrop, getPoster };
}
