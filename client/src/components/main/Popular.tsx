import { useState, useEffect } from 'react';
import { useQueries, useQuery } from 'react-query';
import { getMediaDetail, getTrendingMedia, IMAGE_URL } from 'services/media';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star } from 'assets';
import { lighten, darken } from 'polished';

export default function Popular() {
  const [viewIndex, setViewIndex] = useState(0);
  const [currentMedia, setCurrentMedia] = useState<IMediaDetail>();

  const { data } = useQuery(['media', 'popular'], getTrendingMedia, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const { data: detailData } = useQuery(['media', currentMedia?.id], () =>
    getMediaDetail(currentMedia?.id, currentMedia?.media_type),
  );

  const changeUppercase = (str: string | undefined) => {
    if (str) return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const sliceOverview = (str: string | undefined) => {
    if (!str) return;
    const maxLength = 150;
    if (str.length > maxLength) return `${str.slice(0, maxLength)}...`;
    return str;
  };

  const sliceAverage = (num: number | undefined) => {
    if (num) return num.toFixed(1);
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
    if (data) setCurrentMedia(data[viewIndex]);
  }, [data, viewIndex]);

  console.log(data);
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
              <p>{changeUppercase(currentMedia?.media_type)}</p>
            </div>
            <div>
              <p>{currentMedia?.release_date}</p>
              {detailData?.genre_ids?.map((item) => (
                <p key={item.id}>{item.name}</p>
              ))}
            </div>
          </Category>
          <Overview>
            <div>
              <p>{currentMedia?.name ?? currentMedia?.title}</p>
              <div>
                <Star />
                <span>{sliceAverage(currentMedia?.vote_average)}</span>
              </div>
            </div>
            <p>{sliceOverview(currentMedia?.overview)}</p>
          </Overview>
          <ButtonWrapper>
            <Link to={`/${currentMedia?.media_type}/${currentMedia?.id}`}>
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
    height: 90vh;
    img {
      background-color: ${theme.colors.navy};
      height: 90vh;
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
    font-size: 0.8rem;
    margin-bottom: 3em;
    & > div:first-child {
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
    & > div:nth-child(2) {
      align-items: center;
      color: ${theme.colors.gray300};
      display: flex;
    p + p {
      display: flex;
      align-items: center;
        &::before {
        content: '';
        margin:0 0.5rem;
        display: inline-block;
        height:12px;
        width:2px;
        background-color: ${theme.colors.gray300};
        }
      }
  `}
`;

const Overview = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    & > p:nth-child(2) {
      color: #fff;
      font-size: 0.9rem;
      line-height: 1.6;
      margin-top: 3em;
    }
    & > div {
      align-items: center;
      display: flex;
      & > p {
        font-size: 2.5rem;
        font-weight: 500;
        line-height: 1.3;
      }
      & > div {
        align-items: center;
        background-color: ${theme.colors.yellow};
        border-radius: 3px;
        display: flex;
        height: 35px;
        justify-content: center;
        margin-left: 1.5em;
        width: 85px;
        svg {
          fill: ${theme.colors.black};
          height: 28px;
          stroke: none;
          width: 28px;
          margin-right: 0.5em;
        }
        span {
          color: ${theme.colors.black};
          font-size: 1.5rem;
          font-weight: 500;
        }
      }
    }
  `}
`;

const ButtonWrapper = styled.div`
  ${({ theme }) => css`
    align-items: center;
    display: flex;
    margin-top: 3em;
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
