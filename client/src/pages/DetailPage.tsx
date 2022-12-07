import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useQuery } from 'react-query';

import { getMediaDetail, IMAGE_URL } from 'services/media';
import { config } from 'styles/theme';
import { numberRegex } from 'utils/regex';

import Actors from 'components/details/Actors';
import Description from 'components/details/Description';
import useCurrentPathName from 'hooks/useCurrentPathName';

export default function DetailPage() {
  const [height, setHeight] = useState<number | undefined>();
  const ref = useRef<HTMLDivElement>(null);
  const { id, path } = useCurrentPathName();
  const { data } = useQuery([path, id], () => getMediaDetail(id, path));

  useEffect(() => {
    if (ref) {
      if (ref.current && window.innerHeight < ref.current.offsetHeight) {
        const HEADER = Number(config.header.match(numberRegex));
        return setHeight(ref.current.scrollHeight + HEADER);
      }
      setHeight(window.innerHeight);
    }
  }, [ref]);

  return (
    <DetailPageWrapper>
      <Background
        height={height}
        src={
          data?.backdrop_path
            ? `${IMAGE_URL}/original/${data?.backdrop_path}`
            : 'https://blog.kakaocdn.net/dn/b8Kdun/btqCqM43uim/1sWJVkjEEy4LJMfR3mcqxK/img.jpg'
        }
      >
        <div />
      </Background>
      <Content ref={ref}>
        <div>
          <img
            src={
              data?.poster_path
                ? `${IMAGE_URL}/original/${data?.poster_path}`
                : 'https://blog.kakaocdn.net/dn/b8Kdun/btqCqM43uim/1sWJVkjEEy4LJMfR3mcqxK/img.jpg'
            }
            alt="poster"
          />
        </div>
        <Description data={data} path={path} id={id} />
        <Actors path={path} id={id} />
      </Content>
    </DetailPageWrapper>
  );
}

const DetailPageWrapper = styled.div``;

const Background = styled.div<{ src: string; height: number | undefined }>`
  ${({ src, theme, height }) => css`
    background-color: ${theme.colors.navy};
    height: ${`${height}px`};
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
    div {
      background: ${`linear-gradient(
        rgba(24, 25, 32, 0.5) 10vh,
        rgba(24, 25, 32, 1) 50vh
      ), url(${src}) center`};
      background-size: cover;
      height: 50%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }
  `}
`;

const Content = styled.article`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 15em;
    position: relative;
    & > div:nth-child(1) {
      bottom: 3em;
      position: relative;
      img {
        border-radius: 30px;
        height: 300px;
        object-fit: cover;
        width: 200px;
      }
    }
  `}
`;
