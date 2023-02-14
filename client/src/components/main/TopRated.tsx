import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { getTopRatedMovie, IMAGE_URL } from 'services/media';
import { EMPTY_IMAGE } from 'utils/imageUrl';

import Slider from 'components/common/Slider';
import { getTopRated } from 'services/contents';

interface Props {
  type: 'cinene' | 'tmdb';
}

export default function TopRated({ type }: Props) {
  const { data } = useQuery(['movie', 'topRated'], getTopRatedMovie, {
    staleTime: 1000 * 60 * 60 * 6,
    enabled: type === 'tmdb',
  });
  const { data: cinene } = useQuery(['cinene', 'topRated'], getTopRated, {
    refetchOnWindowFocus: false,
    retry: false,
    enabled: type === 'cinene',
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (newDAta) => {
      console.log(newDAta);
    },
  });

  const siteType = {
    cinene: {
      title: '씨네네 최고 평점',
    },
    tmdb: {
      title: 'TMDB 최고 평점',
    },
  };

  return (
    <TopRatedWrapper>
      <Slider title={siteType[type].title}>
        <ul>
          {type === 'tmdb'
            ? data?.map((movie) => (
                <List key={movie.id}>
                  <Link to={`/movie/${movie.id}`} draggable="false">
                    <img
                      draggable="false"
                      src={
                        movie.backdrop_path
                          ? `${IMAGE_URL}/w500/${movie.poster_path}`
                          : EMPTY_IMAGE
                      }
                      alt={movie.title}
                    />
                    {/* <p>{movie.title}</p> */}
                  </Link>
                </List>
              ))
            : cinene?.contents.map((content) => (
                <List key={content._id}>
                  <Link
                    to={`/${content.type}/${content.tmdbId}`}
                    draggable="false"
                  >
                    <img
                      draggable="false"
                      src={
                        content.poster
                          ? `${IMAGE_URL}/w500/${content.poster}`
                          : EMPTY_IMAGE
                      }
                      alt={content.name}
                    />
                    {/* <p>{movie.title}</p> */}
                  </Link>
                </List>
              ))}
        </ul>
      </Slider>
    </TopRatedWrapper>
  );
}

const TopRatedWrapper = styled.div``;
const List = styled.li`
  ${({ theme }) => css`
    position: relative;
    img {
      border-radius: 30px;
      height: 230px;
      object-fit: cover;
      width: 150px;
    }
    p {
      text-align: end;
      width: 180px;
      line-height: 1.2;
      bottom: 1.5em;
      font-size: 1.2rem;
      font-weight: 500;
      position: absolute;
      right: 1.5em;
    }
    & + & {
      padding-left: 1.3em;
    }
    @media ${theme.device.tablet} {
      img {
        width: 200px;
        height: 300px;
      }
      p {
        width: 350px;
      }
    }
  `}
`;
