import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { lighten, darken } from 'polished';

import { getMediaDetail, getTrendingMedia, IMAGE_URL } from 'services/media';
import { ChevronLeft, ChevronRight, Star } from 'assets';

export default function Popular() {
  const [viewIndex, setViewIndex] = useState(0);
  const [currentMedia, setCurrentMedia] = useState<IMediaResults>();

  const { data } = useQuery(['media', 'popular'], getTrendingMedia, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const { data: detailData } = useQuery(
    ['media', 'details', currentMedia?.id],
    () => getMediaDetail(currentMedia?.id, currentMedia?.media_type),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 1000 * 60 * 60 * 24,
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
    <PopularWrapper>
      <Item>
        <img
          src={`${IMAGE_URL}/original/${currentMedia?.backdrop_path}`}
          alt="backdrop"
        />
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
              <p>
                {currentMedia?.release_date ?? currentMedia?.first_air_date}
              </p>
              {detailData?.genres.map((item) => (
                <p key={item.id}>{item.name}</p>
              ))}
            </div>
          </Category>
          <Overview>
            <p>{currentMedia?.name ?? currentMedia?.title}</p>
            <p>{currentMedia?.overview}</p>
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
    </PopularWrapper>
  );
}

const PopularWrapper = styled.section``;

const Item = styled.div`
  ${({ theme }) => css`
    align-items: flex-end;
    display: flex;
    height: 100vh;
    img {
      background-color: ${theme.colors.navy};
      height: 100vh;
      left: 0;
      object-fit: cover;
      position: absolute;
      right: 0;
      width: 100%;
    }
    & > div {
      display: flex;
      flex-direction: column;
      height: 500px;
      justify-content: center;
      position: relative;
      width: 85%;
    }
  `}
`;

const Category = styled.div`
  ${({ theme }) => css`
    display: flex;
    & > div {
      align-items: center;
      display: flex;
      font-size: 0.8rem;
      margin-bottom: 3em;
    }
    & > div > div:first-child {
      p {
        align-items: center;
        background-color: ${theme.colors.pink};
        border-radius: 100px;
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
      border-radius: 100px;
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
    @media ${theme.device.mobile} {
      flex-direction: column;
      & > div {
        margin-bottom: 1.5em;
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
    margin-top: 3em;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    @media ${({ theme }) => theme.device.mobile} {
      margin-top: 2em;
    }
  }
`;

const ButtonWrapper = styled.div`
  ${({ theme }) => css`
    align-items: center;
    display: flex;
    margin-top: 3em;
    @media ${theme.device.mobile} {
      margin-top: 2em;
    }
    a {
      align-items: center;
      background-color: ${theme.colors.purple};
      border-radius: 100px;
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
      border-radius: 20px;
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
