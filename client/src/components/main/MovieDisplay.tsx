import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { useImageUrl } from 'hooks/cinene';
import Slider from 'components/common/Slider';
import { useQuery } from 'react-query';
import { queryOptions, tmdbKeys } from 'utils/queryOptions';
import { getNowPlayingMovie, getUpcomingMovie } from 'services/tmdb';

interface Props {
  type: 'upcoming' | 'now';
}

export default function MovieDisplay({ type }: Props) {
  const { getImageUrl } = useImageUrl();
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

  const getDday = (day: string) => {
    const today = dayjs().format('YYYY-MM-DD');
    const releaseDate = dayjs(day);
    const dday = releaseDate.diff(today, 'd');
    return dday === 0 ? 'D-Day' : `D-${dday}`;
  };

  const data = type === 'now' ? nowPlayingMovieData : upcomingMovieData;

  return (
    <div>
      <Slider title={type === 'now' ? '상영작' : '개봉 예정작'}>
        <ul>
          {data?.map((movie) => (
            <StyledList key={movie.id}>
              <Link to={`/movie/${movie.id}`} draggable="false">
                <img
                  draggable="false"
                  src={getImageUrl(
                    movie.backdrop_path || movie.poster_path,
                    '500',
                  )}
                  alt={movie.title}
                />
                <p>{movie.title}</p>
                {type === 'upcoming' && (
                  <p className="dday">{getDday(movie.release_date)}</p>
                )}
              </Link>
            </StyledList>
          ))}
        </ul>
      </Slider>
    </div>
  );
}

const StyledList = styled.li`
  ${({ theme }) => css`
    position: relative;
    img {
      border-radius: 30px;
      height: 200px;
      object-fit: cover;
      width: 300px;
    }
    p {
      line-height: 1.2;
      position: absolute;
      font-weight: 500;
    }
    p:nth-of-type(1) {
      background-color: rgba(0, 0, 0, 0.4);
      font-size: 1.2rem;
      text-align: end;
      max-width: 350px;
      bottom: 1.5em;
      right: 1.5em;
      width: auto;
      padding: 0.2em 0.4em;
      word-break: keep-all;
      border-radius: 7px;
    }
    p:nth-of-type(2) {
      font-size: 0.9rem;
      width: auto;
      color: ${theme.colors.yellow};
      padding: 0.3em 0.5em;
      border-radius: 7px;
      background-color: rgba(0, 0, 0, 0.8);
      top: 1.5em;
      left: 1.5em;
    }
    & + & {
      margin-left: 1.8em;
    }
    @media ${theme.device.tablet} {
      img {
        width: 400px;
        height: 250px;
      }
      p {
        width: 350px;
      }
    }
  `}
`;
