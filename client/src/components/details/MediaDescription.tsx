import { memo, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useQuery } from 'react-query';

import { getMediaOverview, getMediaTitle } from 'utils/media';
import { getSimilarMedia } from 'services/media';

import Average from 'components/main/Average';
import SimilarMedia from './SimilarMedia';
import Credits from './Credits';
import Seasons from './Seasons';

interface Props {
  data: IMovieTvDetails | undefined;
  path: string;
  id: number;
}

function Description({ path, data, id }: Props) {
  const title = getMediaTitle(data);
  const overview = getMediaOverview(data);

  const { data: similarData } = useQuery(
    [path, 'similar', id],
    () => getSimilarMedia(id, path),
    { refetchOnWindowFocus: false },
  );
  const setTitle = path === 'movie' ? '영화' : 'TV';

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <DescriptionWrapper>
      <Average />
      <h2>{title}</h2>
      <Genre>
        <p>{data?.release_date ?? data?.first_air_date}</p>
        <p>
          {setTitle === '영화'
            ? `${data?.runtime}분`
            : `시즌 ${data?.seasons.length}`}
        </p>
        <p>{setTitle}</p>
        {data?.genres.map((genre) => (
          <p key={genre.id}>{genre.name}</p>
        ))}
      </Genre>
      <p>{overview}</p>
      <Seasons seasons={data?.seasons} />
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
