import { useQuery } from 'react-query';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { getNowPlayingMovie, getUpcomingMovie, IMAGE_URL } from 'services/tmdb';
import { EMPTY_IMAGE } from 'utils/imageUrl';

import Slider from 'components/common/Slider';
import dayjs from 'dayjs';
import { tmdbKeys } from 'utils/keys';

interface Props {
  type: 'upcoming' | 'now';
}

export default function Upcomming({ type }: Props) {
  const { data: upcomingData } = useQuery(
    tmdbKeys.upcoming(),
    getUpcomingMovie,
    {
      staleTime: 1000 * 60 * 60 * 6,
      enabled: type === 'upcoming',
      select: (prevData) => {
        const day = dayjs();
        return prevData
          .sort((a, b) => dayjs(a.release_date).diff(b.release_date, 'd'))
          .filter((item) => day.diff(item.release_date, 'd') < 1);
      },
    },
  );
  const { data: nowData } = useQuery(
    tmdbKeys.nowPlaying(),
    getNowPlayingMovie,
    {
      staleTime: 1000 * 60 * 60 * 6,
      enabled: type === 'now',
    },
  );

  const mediaType = {
    upcoming: {
      title: '개봉 예정작',
      data: upcomingData,
    },
    now: {
      title: '상영작',
      data: nowData,
    },
  };

  const getDday = (day: string) => {
    const today = dayjs();
    const releaseDate = dayjs(day);
    const dday = releaseDate.diff(today, 'day');
    return dday === 0 ? 'D-Day' : `D-${dday}`;
  };

  const getMovieImage = (item: MovieResult) => {
    if (item.backdrop_path)
      return `${IMAGE_URL}/original/${item.backdrop_path}`;
    if (item.poster_path) return `${IMAGE_URL}/original/${item.poster_path}`;
    return EMPTY_IMAGE;
  };

  return (
    <UpcommingWrapper>
      <Slider title={mediaType[type].title}>
        <ul>
          {mediaType[type].data?.map((movie) => (
            <List key={movie.id}>
              <Link to={`/movie/${movie.id}`} draggable="false">
                <img
                  draggable="false"
                  src={getMovieImage(movie)}
                  alt={movie.title}
                />
                <p>{movie.title}</p>
                {type === 'upcoming' && (
                  <p className="dday">{getDday(movie.release_date)}</p>
                )}
              </Link>
            </List>
          ))}
        </ul>
      </Slider>
    </UpcommingWrapper>
  );
}

const UpcommingWrapper = styled.div``;
const List = styled.li`
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
