import { useQuery } from 'react-query';
import { addContent, getContent } from 'services/contents';

export default function useCineneDataQuery(
  body?: IMovieDetails | ITvDetails | IPerson,
  type?: MediaTypes,
  id?: number,
  personName?: string,
) {
  const name = body && 'name' in body ? body.name : body?.title;
  const poster =
    body && 'poster_path' in body ? body.poster_path : body?.profile_path;

  const { data } = useQuery(['cinene', type, id], () => getContent(type, id), {
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
  const { data: newData } = useQuery(
    ['cinene', type, id],
    () =>
      addContent(type, {
        name: personName || name,
        poster,
        tmdbId: body?.id,
      }),
    {
      enabled: !!data?.message && !!body,
    },
  );

  return data?.content || newData?.content;
}
