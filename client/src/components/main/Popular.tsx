import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { ChevronLeft, ChevronRight } from 'assets';
import { buttonEffect } from 'styles/css';
import { useImageUrl } from 'hooks/cinene';

import useDetailQuery from 'components/details/hooks/useDetailQuery';
import usePopular from './hooks/usePopular';
import Average from './Average';

export default function Popular() {
  const { data, handleSlide } = usePopular();
  const { mediaData, cineneData } = useDetailQuery(data?.id, data?.media_type);
  const { getImageUrl } = useImageUrl();

  useEffect(() => {
    const slider = setInterval(() => handleSlide(1), 10000);
    return () => clearTimeout(slider);
  });

  return (
    <section>
      <Background src={getImageUrl(data?.backdrop_path, 'full')} />
      <Item>
        <div>
          <Category>
            <Average tmdbAverage={data?.vote_average} cineneData={cineneData} />
          </Category>
          <Overview>
            <p>
              {mediaData && 'title' in mediaData
                ? mediaData.title
                : mediaData?.name}
            </p>
            <p>{mediaData?.overview}</p>
          </Overview>
          <ButtonWrapper color="pink">
            <Link to={`/${data?.media_type}/${data?.id}`}>자세히 보기</Link>
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
