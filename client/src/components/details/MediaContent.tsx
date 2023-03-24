import { memo, useRef } from 'react';
import styled, { css } from 'styled-components';

import Average from 'components/main/Average';
import SimilarMedia from './content/similarMedia';
import Credits from './content/credits';
import Seasons from './content/seasons';
import Comment from './content/comments';
import LikeButton from './content/like/LikeButton';
import Reviews from './content/reviews/index';
import Genre from './content/genre';

interface Props {
  tmdbData?: MovieDetails | TvDetails;
  cineneData?: CineneData;
  path: MediaType;
  id: number;
}

function MediaContent({ path, tmdbData, id, cineneData }: Props) {
  const reviewRef = useRef<HTMLHeadingElement>(null);
  return (
    <DescriptionWrapper>
      <Average
        tmdbAverage={tmdbData?.vote_average}
        cineneData={cineneData}
        isMedia
      />
      <h2>
        {tmdbData && 'title' in tmdbData ? tmdbData.title : tmdbData?.name}
      </h2>
      <LikeButton ref={reviewRef} cinene={cineneData} />
      <Genre data={tmdbData} />
      <p>{tmdbData?.overview}</p>
      {path === 'tv' && <Seasons data={tmdbData as TvDetails} />}
      <SimilarMedia path={path} id={id} />
      <Credits id={id} path={path} />
      <Reviews ref={reviewRef} data={cineneData} />
      <Comment />
    </DescriptionWrapper>
  );
}

export default memo(MediaContent);

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
