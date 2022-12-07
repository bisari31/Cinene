import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { IMAGE_URL } from 'services/media';
import useTrendingMediaQuery from 'hooks/useTrendingMediaQuery';

import SignForm from 'components/SignForm';

export default function LoginPage() {
  const [backdrop, setBackdrop] = useState<string>();
  const { data } = useTrendingMediaQuery();

  const { pathname: getPathname } = useLocation();

  const handleSlicePathName = () =>
    getPathname.slice(1) as 'login' | 'register';

  const pathname = handleSlicePathName();

  useEffect(() => {
    if (!data) return;
    const getRandomBackdrop = (array: IMediaResults[]) => {
      const random = Math.floor(Math.random() * array.length);
      return array[random].backdrop_path;
    };
    setBackdrop(getRandomBackdrop(data));
  }, [data, getPathname]);

  return (
    <Wrapper>
      <div>
        <img src={`${IMAGE_URL}/original/${backdrop}`} alt="backdrop" />
      </div>
      <div>
        <SignForm type={pathname} />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => css`
    align-items: center;
    display: flex;
    height: 100vh;
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    width: 100vw;
    z-index: -1;
    & > div:first-child {
      background-color: ${theme.colors.navy};
      height: 100vh;
      left: 0;
      position: absolute;
      top: 0;
      width: 100vw;
      z-index: -1;
      img {
        display: none;
      }
    }
    & > div:last-child {
      background-color: ${theme.colors.navy};
      border-radius: 35px;
      max-width: 450px;
      position: relative;
      width: 100%;
    }
    @media ${theme.device.tablet} {
      & > div:first-child {
        img {
          display: block;
          filter: brightness(50%);
          height: 100vh;
          left: 0;
          object-fit: cover;
          position: absolute;
          width: 100vw;
        }
      }
    }
  `}
`;
