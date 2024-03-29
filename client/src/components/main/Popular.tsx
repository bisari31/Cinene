import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import { ChevronLeft, ChevronRight } from 'assets';
import { buttonEffect } from 'styles/css';
import { useDetailQuery, useImageUrl } from 'hooks/cinene';
import { getTrendingMedia } from 'services/tmdb';
import { queryOptions, tmdbKeys } from 'utils/queryOptions';

import Average from './Average';

export default function Popular() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { getImageUrl } = useImageUrl();
  const { data } = useQuery(tmdbKeys.popular(), getTrendingMedia, {
    ...queryOptions,
  });
  const currentData = data?.[currentIndex];
  const { mediaData, cineneData } = useDetailQuery(
    currentData?.id,
    currentData?.media_type,
  );

  const handleSlide = (index: number) => {
    const maxIndex = data?.length;
    if (!maxIndex) return;
    let nextIndex = currentIndex + index;
    if (nextIndex > maxIndex - 1) nextIndex = 0;
    else if (nextIndex < 0) nextIndex = maxIndex - 1;
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    const slider = setInterval(() => handleSlide(1), 10000);
    return () => clearTimeout(slider);
  });

  return (
    <section>
      <StyledBackdrop src={getImageUrl(currentData?.backdrop_path, 'full')} />
      <StyledWrapper>
        <div>
          <StyledCategory>
            <Average
              tmdbAverage={currentData?.vote_average}
              cineneData={cineneData}
            />
          </StyledCategory>
          <StyledOverview>
            <p>
              {mediaData && 'title' in mediaData
                ? mediaData.title
                : mediaData?.name}
            </p>
            <p>{mediaData?.overview}</p>
          </StyledOverview>
          <StyledButtonWrapper color="pink">
            <Link to={`/${currentData?.media_type}/${currentData?.id}`}>
              자세히 보기
            </Link>
            <StyledButton
              color="navy50"
              type="button"
              onClick={() => handleSlide(-1)}
            >
              <ChevronLeft />
            </StyledButton>
            <StyledButton
              color="navy50"
              type="button"
              onClick={() => handleSlide(1)}
            >
              <ChevronRight />
            </StyledButton>
          </StyledButtonWrapper>
        </div>
      </StyledWrapper>
    </section>
  );
}

const StyledBackdrop = styled.div<{ src: string }>`
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

const StyledWrapper = styled.div`
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

const StyledCategory = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;

    @media ${theme.device.tablet} {
      flex-direction: row;
      margin-bottom: 1.5em;
      & > div:nth-child(2) {
        margin: 0;
      }
    }
  `}
`;

const StyledOverview = styled.div`
  display: flex;
  flex-direction: column;

  p:first-child {
    font-size: 2.5rem;
    font-weight: 500;
    line-height: 1.3;
    margin-right: 0.5em;
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

const StyledButtonWrapper = styled.div`
  ${({ theme }) => css`
    align-items: center;
    display: flex;
    margin-top: 2em;
    @media ${theme.device.tablet} {
      margin-top: 3em;
    }
    a {
      align-items: center;
      background-color: ${theme.colors.pink};
      border-radius: 12px;
      display: flex;
      font-size: 0.8rem;
      height: 40px;
      justify-content: center;
      margin-right: 2em;
      width: 120px;
      ${buttonEffect};
    }
  `}
`;

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.navy50};
  border: none;
  border-radius: 12px;
  height: 40px;
  margin-right: 1em;
  ${buttonEffect};
  svg {
    align-items: center;
    display: flex;
    height: 30px;
    stroke: #fff;
    stroke-width: 1;
    width: 30px;
  }
`;
