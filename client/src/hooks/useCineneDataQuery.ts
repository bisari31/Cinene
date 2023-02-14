import { useQuery } from 'react-query';
import { addContent, getContent } from 'services/contents';

export default function useCineneDataQuery(
  type: string | undefined,
  id: number | undefined,
  body?: IMovieTvDetails | IPerson,
  personName?: string,
) {
  const media = body as IMovieTvDetails;
  const person = body as IPerson;

  const { data } = useQuery(['cinene', type, id], () => getContent(type, id), {
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: (a) => {
      console.log(`a: `, a);
    },
  });
  const { data: newData } = useQuery(
    ['cinene', type, id],
    () =>
      addContent(type, {
        name: personName || media.name || media.title,
        poster: media.poster_path || person.profile_path,
        tmdbId: media.id || person.id,
      }),
    {
      enabled: !!data?.message && !!body,
      // enabled: !data?.success,
    },
  );

  return data?.content || newData?.content;
}
