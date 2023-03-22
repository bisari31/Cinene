import { useRef, memo } from 'react';
import styled, { css } from 'styled-components';

import Average from 'components/main/Average';
import LikeButton from './content/like/LikeButton';
import SimilarMedia from './content/similarMedia';
import Reviews from './content/reviews';
import Comments from './content/comments';

interface Props {
  tmdbData?: PersonDetails;
  cineneData?: CineneData;
  path: MediaType;
  id: number;
}

function PersonContent({ tmdbData, cineneData, path, id }: Props) {
  const reviewRef = useRef<HTMLHeadingElement>(null);

  const getKoreanName = (data?: PersonDetails) => {
    if (!data) return '';
    const { also_known_as: names, name } = data;
    const regex = /[가-힣]/;
    const koreanName = names?.filter((text) => regex.test(text));
    return koreanName?.length ? `${koreanName?.at(-1)} (${data?.name})` : name;
  };
  const koreanName = getKoreanName(tmdbData);

  return (
    <PersonDescriptionWrapper>
      <Average cineneData={cineneData} />
      <h2>{koreanName}</h2>
      <LikeButton ref={reviewRef} cinene={cineneData} />
      <div>
        <p>{tmdbData?.birthday ? `출생: ${tmdbData.birthday}` : '정보 없음'}</p>
      </div>
      <SimilarMedia id={id} path={path} type="cast" />
      <SimilarMedia id={id} path={path} type="crew" />
      <Reviews ref={reviewRef} data={cineneData} />
      <Comments />
    </PersonDescriptionWrapper>
  );
}

export default memo(PersonContent);

const PersonDescriptionWrapper = styled.div`
  ${({ theme }) => css`
    & > div:nth-of-type(1) {
      margin-bottom: 2em;
    }
    & > div:nth-of-type(3) {
      margin-bottom: 2em;
    }
    & > div:nth-of-type(3) {
      color: ${theme.colors.gray300};
      font-size: 0.9rem;
      line-height: 1.8;
      margin: 3rem 0;
    }
  `}
`;
