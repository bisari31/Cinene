import { useQuery } from 'react-query';

import { createContent, getContent } from 'services/contents';
import { getMediaDetail, getPersonDetail } from 'services/tmdb';
import { cineneKeys, queryOptions, tmdbKeys } from 'utils/queryOptions';

export default function useDetailQuery(id?: number, path?: MediaType) {
  const { data: mediaData } = useQuery(
    tmdbKeys.detail(path, id),
    () => getMediaDetail(id, path),
    {
      enabled: path !== 'person',
      ...queryOptions,
    },
  );

  const { data: personData } = useQuery(
    tmdbKeys.detail(path, id),
    () => getPersonDetail(id, path),
    {
      enabled: path === 'person',
      ...queryOptions,
    },
  );

  const { data: cineneData } = useQuery(
    cineneKeys.detail(path, id),
    () => getContent(path, id),
    {
      ...queryOptions,
      retry: false,
      enabled: !!mediaData || !!personData,
    },
  );

  const title =
    mediaData && 'title' in mediaData ? mediaData.title : mediaData?.name;

  const { data: newCineneData } = useQuery(
    cineneKeys.detail(path, id),
    () =>
      createContent({
        content_type: path,
        poster_url: mediaData?.poster_path ?? personData?.profile_path,
        title: title ?? personData?.name,
        tmdbId: id,
      }),
    {
      enabled: !!cineneData?.message,
      retry: false,
    },
  );

  return {
    mediaData,
    personData,
    cineneData: cineneData?.content || newCineneData?.content,
  };
}
