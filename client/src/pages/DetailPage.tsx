import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';
import { getMediaDetail, IMAGE_URL } from 'services/media';
import styled, { css } from 'styled-components';

interface LocationState {
  state: {
    path: string;
    id: string;
  };
}

export default function DetailPage() {
  const [height, setHeight] = useState<number | undefined>();
  const { state }: LocationState = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const { data } = useQuery(
    ['media', state.id],
    () => getMediaDetail(+state.id, state.path),
    {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (err) => {
        console.log(err);
      },
    },
  );

  useEffect(() => {
    if (ref) {
      const clientHeight = ref.current?.clientHeight;
      if (clientHeight && window.innerHeight > clientHeight) {
        return setHeight(window.innerHeight);
      }
      setHeight(clientHeight);
    }
  }, [ref]);

  return (
    <DetailPageWrapper height={height}>
      <Background
        src={
          data?.backdrop_path
            ? `${IMAGE_URL}/original/${data?.backdrop_path}`
            : 'https://blog.kakaocdn.net/dn/b8Kdun/btqCqM43uim/1sWJVkjEEy4LJMfR3mcqxK/img.jpg'
        }
      >
        <div />
      </Background>
      <Content ref={ref}>
        <img
          src={
            data?.poster_path
              ? `${IMAGE_URL}/original/${data?.poster_path}`
              : 'https://blog.kakaocdn.net/dn/b8Kdun/btqCqM43uim/1sWJVkjEEy4LJMfR3mcqxK/img.jpg'
          }
          alt="poster"
        />
      </Content>
    </DetailPageWrapper>
  );
}

const DetailPageWrapper = styled.div<{
  height: number | undefined;
}>`
  ${({ height, theme }) => css``}
`;

const Background = styled.div<{ src: string }>`
  ${({ src, theme }) => css`
    background-color: ${theme.colors.navy};
    height: 100vh;
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

const Content = styled.div`
  img {
    border-radius: 30px;
    height: 300px;
    object-fit: cover;
    width: 200px;
  }
`;
