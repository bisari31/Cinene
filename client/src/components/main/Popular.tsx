import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { getMediaDetail, getVideos, IMAGE_URL } from 'services/media';
import { ChevronLeft, ChevronRight } from 'assets';
import useTrendingMediaQuery from 'hooks/useTrendingMediaQuery';
import { getMediaOverview, getMediaTitle } from 'utils/media';

import { EMPTY_IMAGE } from 'utils/imageUrl';
import { buttonEffect } from 'styles/css';
import useCineneDataQuery from 'hooks/useCineneDataQuery';
import AverageButton from './Average';

export default function Popular() {
  const [viewIndex, setViewIndex] = useState(0);
  const [currentMedia, setCurrentMedia] = useState<IMediaResults>();

  const { data, isLoading, isFetching } = useTrendingMediaQuery();

  const { data: detailData } = useQuery(
    ['media', 'details', currentMedia?.id],
    () => getMediaDetail(currentMedia?.id, currentMedia?.media_type),
    {
      staleTime: 1000 * 60 * 60 * 6,
    },
  );
  const cineneData = useCineneDataQuery(
    currentMedia?.media_type,
    currentMedia?.id,
    detailData,
  );

  // const { data: videoData } = useQuery(
  //   ['media', 'video', currentMedia?.id],
  //   () => getVideos(currentMedia?.id, currentMedia?.media_type),
  //   {
  //     staleTime: 1000 * 60 * 60 * 6,
  //   },
  // );

  const handleSlide = (index: number) => {
    const maxIndex = data?.length;
    if (!maxIndex) return;
    let newIndex = viewIndex + index;
    if (newIndex > maxIndex - 1) newIndex = 0;
    else if (newIndex < 0) newIndex = maxIndex - 1;
    setViewIndex(newIndex);
  };

  const title = getMediaTitle(detailData);
  const overview = getMediaOverview(detailData);

  useEffect(() => {
    if (data) {
      setCurrentMedia(data[viewIndex]);
    }
  }, [data, viewIndex]);

  useEffect(() => {
    const slider = setTimeout(() => handleSlide(1), 40000);
    return () => clearTimeout(slider);
  });

  return (
    <section>
      <Background
        src={
          currentMedia
            ? `${IMAGE_URL}/original/${currentMedia?.backdrop_path}`
            : EMPTY_IMAGE
        }
      />
      <Item>
        <div>
          <Category>
            <AverageButton
              tmdb={currentMedia?.vote_average}
              cinene={cineneData}
            />
          </Category>
          <Overview>
            <p>{title}</p>
            <p>{overview}</p>
          </Overview>
          <ButtonWrapper color="pink">
            <Link to={`/${currentMedia?.media_type}/${currentMedia?.id}`}>
              자세히 보기
            </Link>
            <Button
              color="navy50"
              type="button"
              onClick={() => handleSlide(-1)}
            >
              <ChevronLeft />
            </Button>
            <Button color="navy50" type="button" onClick={() => handleSlide(1)}>
              <ChevronRight />
            </Button>
          </ButtonWrapper>
        </div>
      </Item>
      {/* <VideoWrapper>
        {videoData && (
          <ReactPlayer
            controls
            playing
            url={`https://youtu.be/${videoData.key}`}
            muted
            width={500}
            height={300}
          />
        )}
      </VideoWrapper> */}
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

const Overview = styled.div`
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

const Button = styled.button`
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

const VideoWrapper = styled.div`
  position: absolute;
  right: 300px;
  top: 300px;
`;
