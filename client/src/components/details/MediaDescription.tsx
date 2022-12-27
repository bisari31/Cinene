import { memo } from 'react';

import styled, { css } from 'styled-components';

import { getMediaOverview, getMediaTitle } from 'utils/media';
import Average from 'components/main/Average';
import { useQuery } from 'react-query';
import { getSimilarMedia } from 'services/media';
import SimilarMedia from './SimilarMedia';
import Credits from './Credits';

interface Props {
  data: IMediaResultsInDetail | undefined;
  path: string;
  id: number;
}

function Description({ path, data, id }: Props) {
  const title = getMediaTitle(path, data);
  const overview = getMediaOverview(path, data);

  const { data: similarData } = useQuery(
    [path, 'similar', id],
    () => getSimilarMedia(id, path),
    { refetchOnWindowFocus: false },
  );
  const setTitle = path === 'movie' ? '영화' : '시리즈';

  return (
    <DescriptionWrapper>
      <Average />
      <h2>{title}</h2>
      <Genre>
        <p>{setTitle}</p>
        <p>{data?.release_date ?? data?.first_air_date}</p>
        {data?.genres.map((genre) => (
          <p key={genre.id}>{genre.name}</p>
        ))}
      </Genre>
      <p>{overview}</p>
      <SimilarMedia data={similarData} title={`추천 ${setTitle}`} type={path} />
      <Credits id={id} path={path} />
    </DescriptionWrapper>
  );
}

export default memo(Description);

const DescriptionWrapper = styled.div`
  ${({ theme }) => css`
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
      margin: 3rem 0;
    }
  `}
`;

const Genre = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em 1em;
    margin-top: 1.5em;
    p {
      background-color: ${theme.colors.navy100};
      border-radius: 7px;
      color: ${theme.colors.white};
      display: inline-block;
      font-size: 0.78rem;
      font-weight: 400;
      padding: 0.6em 0.8em;
      width: auto;
    }
  `}
`;
