import { useEffect, memo } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { getSimilarMedia, IMAGE_URL } from 'services/media';
import { getMediaOverview, getMediaTitle } from 'utils/media';
import Average from 'components/main/Average';

interface Props {
  data: IMediaResultsInDetail | undefined;
  path: string;
  id: number;
}

function Description({ path, id, data }: Props) {
  const { data: similarData } = useQuery([path, 'similar', data?.id], () =>
    getSimilarMedia(id, path),
  );

  const title = getMediaTitle(path, data);
  const overview = getMediaOverview(path, data);
  const getType = path === 'movie' ? '영화' : '시리즈';

  useEffect(() => {
    console.log(
      '🚀 ~ file: Description.tsx:26 ~ Description ~ similarData',
      data,
    );
  }, [data]);

  return (
    <DescriptionWrapper>
      <Average />
      <h2>{title}</h2>
      <p>{overview}</p>
      <div>
        <h3>추천 {getType}</h3>
        <SimilarMedia>
          {similarData?.map((media) => (
            <li key={media.id}>
              <Link to={`/${path}/${media.id}`}>
                <img
                  src={
                    media.poster_path
                      ? `${IMAGE_URL}/w500/${media.poster_path}`
                      : 'https://blog.kakaocdn.net/dn/b8Kdun/btqCqM43uim/1sWJVkjEEy4LJMfR3mcqxK/img.jpg'
                  }
                  alt={media.name || media.title}
                />
                <span>{media.name || media.title}</span>
              </Link>
            </li>
          ))}
        </SimilarMedia>
      </div>
    </DescriptionWrapper>
  );
}

export default memo(Description);

const DescriptionWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    max-width: 850px;
    padding: 0;
    width: 100%;
    & > div:first-child {
      margin-bottom: 2em;
    }
    h2 {
      font-size: 2.3rem;
      font-weight: 500;
    }

    & > p {
      color: ${theme.colors.gray300};
      font-size: 0.9rem;
      line-height: 1.8;
      margin-top: 3em;
    }

    h3 {
      font-size: 1rem;
      margin-top: 3em;
    }
    & > div:first-child {
    }
    @media ${theme.device.tablet} {
      padding: 0 1em;
    }
    @media (min-width: 1300px) {
      padding: 0 4em;
    }
  `}
`;
const SimilarMedia = styled.ul`
  align-items: flex-start;
  display: flex;
  height: 300px;
  margin-top: 2em;
  max-width: 790px;
  overflow-x: auto;
  overflow-y: hidden;
  li {
    display: flex;
    flex-direction: column;
    width: 140px;
    img {
      border-radius: 30px;
      height: 200px;
      width: 140px;
    }
    span {
      font-size: 0.8rem;
      width: 100%;
      display: inline-block;
      margin-top: 1em;
      text-align: center;
    }
  }
  li + li {
    margin-left: 1.5em;
  }
`;
