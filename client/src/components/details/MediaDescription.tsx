import { memo, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';

import { getMediaOverview, getMediaTitle } from 'utils/api';
import { getSimilarMedia } from 'services/media';
import { useCineneDataQuery } from 'hooks';

import Average from 'components/main/Average';
import SimilarMedia from './SimilarMedia';
import Credits from './Credits';
import Seasons from './Seasons';
import Comment from './comments';
import Like from './LikeButton';
import Reviews from './reviews/index';

interface Props {
  data: IMovieTvDetails | undefined;
  path: string;
  id: number;
}

function Description({ path, data, id }: Props) {
  const title = getMediaTitle(data);
  const overview = getMediaOverview(data);
  const reviewRef = useRef<HTMLHeadingElement>(null);

  const { data: similarData } = useQuery(
    [path, 'similar', id],
    () => getSimilarMedia(id, path),
    { refetchOnWindowFocus: false, staleTime: 1000 * 60 * 60 * 6 },
  );
  const cineneData = useCineneDataQuery(path, id, data);
  const setTitle = path === 'movie' ? '영화' : 'TV';

  const getReleaseDate = (releaseItem?: IMovieTvDetails) => {
    if (releaseItem?.release_date)
      return <p>개봉: {releaseItem.release_date}</p>;
    if (releaseItem?.first_air_date) {
      const last = releaseItem?.last_air_date;
      const first = releaseItem?.first_air_date;
      const today = dayjs();
      const diff = today.diff(last, 'd');

      let result;
      if (first === last) result = first;
      else if (diff > 7) result = `${first} ~ ${last}`;
      else result = `${first} ~ `;

      return <p>{result}</p>;
    }
  };

  return (
    <DescriptionWrapper>
      <Average tmdb={data?.vote_average} cinene={cineneData} />
      <h2>{title}</h2>
      <Like ref={reviewRef} cinene={cineneData} />
      <Genre>
        {getReleaseDate(data)}
        <p>
          {setTitle === '영화'
            ? `${data?.runtime}분`
            : `시즌 ${data?.seasons.length}`}
        </p>
        {data?.genres.map((genre) => (
          <p className="genre_button" key={genre.id}>
            {genre.name}
          </p>
        ))}
      </Genre>

      <p>{overview}</p>
      <Seasons seasons={data?.seasons} />
      <SimilarMedia data={similarData} title={`추천 ${setTitle}`} type={path} />
      <Credits id={id} path={path} />
      <Reviews ref={reviewRef} data={cineneData} />
      <Comment contentId={cineneData?._id} />
    </DescriptionWrapper>
  );
}

export default memo(Description);

const DescriptionWrapper = styled.div`
  ${({ theme }) => css`
    & > div:first-child {
      margin-bottom: 2em;
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
    gap: 0.8em 1em;
    margin-top: 1em;
    p {
      background-color: ${theme.colors.pink};
      border-radius: 7px;
      color: ${theme.colors.white};
      display: inline-block;
      font-size: 0.78rem;
      font-weight: 400;
      padding: 0.6em 0.8em;
    }
    .genre_button {
      background-color: ${theme.colors.navy50};
    }
  `}
`;
