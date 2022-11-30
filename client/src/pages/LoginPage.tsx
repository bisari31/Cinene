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
      <img src={`${IMAGE_URL}/original/${backdrop}`} alt="backdrop" />
      <SignForm type={pathname} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => css`
    img {
      filter: brightness(50%);
      height: 100vh;
      left: 0;
      object-fit: cover;
      position: absolute;
      width: 100vw;
    }
  `}
`;
