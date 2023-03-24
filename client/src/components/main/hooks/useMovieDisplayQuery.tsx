import dayjs from 'dayjs';
import { useQuery } from 'react-query';

import { getNowPlayingMovie, getUpcomingMovie } from 'services/tmdb';
import { queryOptions, tmdbKeys } from 'utils/queryOptions';

export default function useMovieDisplayQuery(type: 'upcoming' | 'now') {
  const { data: upcomingMovieData } = useQuery(
    tmdbKeys.upcoming(),
    getUpcomingMovie,
    {
      ...queryOptions,
      enabled: type === 'upcoming',
      select: (prevData) => {
        const day = dayjs();
        return prevData
          .sort((a, b) => dayjs(a.release_date).diff(b.release_date, 'd'))
          .filter((item) => day.diff(item.release_date, 'd') < 1);
      },
    },
  );
  const { data: nowPlayingMovieData } = useQuery(
    tmdbKeys.nowPlaying(),
    getNowPlayingMovie,
    {
      ...queryOptions,
      enabled: type === 'now',
    },
  );

  return type === 'now' ? nowPlayingMovieData : upcomingMovieData;
}
