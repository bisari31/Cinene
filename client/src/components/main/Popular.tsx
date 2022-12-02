import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { lighten, darken } from 'polished';

import { getMediaDetail, IMAGE_URL } from 'services/media';
import { ChevronLeft, ChevronRight, Star } from 'assets';
import useTrendingMediaQuery from 'hooks/useTrendingMediaQuery';

export default function Popular() {
  const [viewIndex, setViewIndex] = useState(0);
  const [currentMedia, setCurrentMedia] = useState<IMediaResults>();

  const { data } = useTrendingMediaQuery();

  const { data: detailData } = useQuery(
    ['media', 'details', currentMedia?.id],
    () => getMediaDetail(currentMedia?.id, currentMedia?.media_type),
    {
      staleTime: 1000 * 60 * 60 * 24,
    },
  );

  const changeUppercase = (str: string | undefined) => {
    if (str) return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const sliceAverage = (num: number | undefined) => {
    if (num) return num.toFixed(1);
    return 0;
  };

  const handleSlide = (index: number) => {
    const maxIndex = data?.length;
    if (!maxIndex) return;
    let newIndex = viewIndex + index;
    if (newIndex > maxIndex - 1) newIndex = 0;
    else if (newIndex < 0) newIndex = maxIndex - 1;
    setViewIndex(newIndex);
  };

  const getMediaTitle = () => {
    if (currentMedia?.media_type === 'movie') return currentMedia.title;
    return `${detailData?.name} ${
      detailData?.seasons[detailData.seasons.length - 1].name
    }`;
  };

  const getMediaOverview = () => {
    if (currentMedia?.media_type === 'movie') return currentMedia.overview;
    return (
      detailData?.seasons[detailData.seasons.length - 1].overview ||
      detailData?.overview
    );
  };

  const getReleaseDate = () => {
    if (currentMedia?.media_type === 'movie') return currentMedia.release_date;
    return detailData?.seasons[detailData.seasons.length - 1].air_date;
  };

  const mediaRelease = getReleaseDate();
  const mediaTitle = getMediaTitle();
  const mediaOverview = getMediaOverview();

  useEffect(() => {
    if (data) {
      setCurrentMedia(data[viewIndex]);
    }
  }, [data, viewIndex]);

  useEffect(() => {
    const slider = setTimeout(() => handleSlide(1), 10000);
    return () => clearTimeout(slider);
  });

  return (
    <section>
      <Background
        src={`${IMAGE_URL}/original/${currentMedia?.backdrop_path}`}
      />
      <Item>
        <div>
          <Category>
            <div>
              <div>
                <p>{changeUppercase(currentMedia?.media_type)}</p>
              </div>
              <div>
                <Star />
                <span>{sliceAverage(currentMedia?.vote_average)}</span>
              </div>
            </div>
            <div>
              <p>{mediaRelease}</p>
              {detailData?.genres.map((item) => (
                <p key={item.id}>{item.name}</p>
              ))}
            </div>
          </Category>
          <Overview>
            <p>{mediaTitle}</p>
            <p>{mediaOverview}</p>
          </Overview>
          <ButtonWrapper>
            <Link
              to={`/${currentMedia?.media_type}/${currentMedia?.id}`}
              state={{ path: currentMedia?.media_type, id: currentMedia?.id }}
            >
              자세히 보기
            </Link>
            <button type="button" onClick={() => handleSlide(-1)}>
              <ChevronLeft />
            </button>
            <button type="button" onClick={() => handleSlide(1)}>
              <ChevronRight />
            </button>
          </ButtonWrapper>
        </div>
      </Item>
    </section>
  );
}

const Background = styled.div<{ src: string }>`
  ${({ src }) => css`
    background: ${`linear-gradient(
        rgba(24, 25, 32, 0.5) 70vh,
        rgba(24, 25, 32, 1) 100vh
      ), url(${src}) center`};
    background-size: cover;
    height: 100vh;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
  `}
`;

const Item = styled.div`
  ${({ theme }) => css`
    align-items: flex-end;
    display: flex;
    height: 90vh;
    & > div {
      bottom: 10%;
      display: flex;
      flex-direction: column;
      height: 500px;
      justify-content: flex-end;
      position: relative;
      width: 90%;
    }
    @media ${theme.device.tablet} {
      & > div {
        width: 80%;
      }
    }
  `}
`;

const Category = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    & > div {
      align-items: center;
      display: flex;
      font-size: 0.8rem;
      margin-bottom: 1.5em;
    }
    & > div > div:first-child {
      p {
        align-items: center;
        background-color: ${theme.colors.pink};
        border-radius: 10.5px;
        color: #fff;
        display: flex;
        height: 35px;
        justify-content: center;
        width: 60px;
      }
      margin-right: 1em;
    }
    & > div > div:nth-child(2) {
      align-items: center;
      background-color: ${theme.colors.yellow};
      border-radius: 10.5px;
      display: flex;
      height: 35px;
      justify-content: center;
      margin-right: 1em;
      svg {
        fill: ${theme.colors.black};
        height: 20px;
        margin-right: 0.2em;
        stroke: none;
        stroke-linecap: round;
        width: 20px;
      }
      span {
        color: ${theme.colors.black};
        font-weight: 500;
      }
      width: 60px;
    }

    & > div:nth-child(2) {
      align-items: center;
      color: ${theme.colors.gray100};
      display: flex;
      flex-wrap: wrap;
      line-height: 1.3;
      p + p {
        align-items: center;
        display: flex;
        &::before {
          background-color: ${theme.colors.gray100};
          content: '';
          display: inline-block;
          height: 12px;
          margin: 0 0.5rem;
          width: 2px;
        }
      }
    }
    @media ${theme.device.tablet} {
      flex-direction: row;

      & > div {
        margin-bottom: 3em;
      }
    }
  `}
`;

const Overview = styled.div`
  display: flex;
  flex-direction: column;
  & > p:first-child {
    font-size: 2.5rem;
    font-weight: 500;
    line-height: 1.3;
  }
  & > p:nth-child(2) {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
    color: ${({ theme }) => theme.colors.gray100};
    display: -webkit-box;
    font-size: 0.9rem;
    line-height: 1.6;
    margin-top: 2em;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    @media ${({ theme }) => theme.device.tablet} {
      margin-top: 3em;
    }
  }
`;

const ButtonWrapper = styled.div`
  ${({ theme }) => css`
    align-items: center;
    display: flex;
    margin-top: 2em;
    @media ${theme.device.tablet} {
      margin-top: 3em;
    }
    a {
      align-items: center;
      background-color: ${theme.colors.purple};
      border-radius: 12px;
      display: flex;
      font-size: 0.8rem;
      height: 40px;
      justify-content: center;
      margin-right: 2em;
      width: 120px;
      &:hover {
        background-color: ${lighten(0.1, theme.colors.purple)};
      }
      &:active {
        background-color: ${darken(0.1, theme.colors.purple)};
      }
    }
    button {
      background-color: ${theme.colors.purple};
      border: none;
      border-radius: 12px;
      height: 40px;
      margin-right: 1em;
      svg {
        align-items: center;
        display: flex;
        height: 30px;
        stroke: #fff;
        stroke-width: 1;
        width: 30px;
      }
      &:hover {
        background-color: ${lighten(0.1, theme.colors.purple)};
      }
      &:active {
        background-color: ${darken(0.1, theme.colors.purple)};
      }
    }
  `}
`;
