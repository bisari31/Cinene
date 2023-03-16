import { useQuery } from 'react-query';
import { addContent, getContent } from 'services/contents';
import { cineneKeys } from 'utils/keys';

export default function useCineneDataQuery(
  body?: MovieDetails | TvDetails | Person,
  type?: MediaTypes,
  id?: number,
  personName?: string,
) {
  const name = body && 'name' in body ? body.name : body?.title;
  const poster =
    body && 'poster_path' in body ? body.poster_path : body?.profile_path;
  const { data } = useQuery(
    cineneKeys.detail(type, id),
    () => getContent(type, id),
    {
      staleTime: 1000 * 60 * 60,
      retry: false,
    },
  );
  const { data: newData } = useQuery(
    cineneKeys.newDetail(type, id),
    () =>
      addContent(type, {
        name: personName || name,
        poster,
        tmdbId: body?.id,
      }),
    {
      enabled: !!data?.message && !!body,
      retry: false,
    },
  );

  return data?.content || newData?.content;
}
