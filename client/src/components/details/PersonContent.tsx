import { useRef } from 'react';
import { useQuery } from 'react-query';
import styled, { css } from 'styled-components';

import { tmdbKeys } from 'utils/keys';
import { getCombinedCredits } from 'services/tmdb';

import Average from 'components/main/Average';
import useCineneDataQuery from './hooks/useCineneDataQuery';
import useSortData from './hooks/useSortData';
import LikeButton from './content/like/LikeButton';
import SimilarMedia from './content/similar';
import Reviews from './content/reviews';
import Comments from './content/comments';

interface Props {
  data?: PersonDetails;
  path: MediaType;
  id: number;
}

export default function PersonContent({ data, path, id }: Props) {
  const reviewRef = useRef<HTMLHeadingElement>(null);

  const getKoreanName = (userData?: PersonDetails) => {
    if (!userData) return '';
    const { also_known_as: names, name } = userData;
    const re = /[가-힣]/;
    const koreanName = names?.filter((text) => re.test(text));
    return koreanName?.length
      ? `${koreanName?.at(-1)} (${userData?.name})`
      : name;
  };

  const { data: creditData } = useQuery(
    tmdbKeys.similar(path, id),
    () => getCombinedCredits(id),
    { staleTime: 1000 * 60 * 60 * 6 },
  );

  const cineneData = useCineneDataQuery(data, path, id, getKoreanName(data));
  const cast = useSortData(creditData?.cast);
  const crew = useSortData(creditData?.crew);

  return (
    <PersonDescriptionWrapper>
      <Average isMedia={false} cinene={cineneData} />
      <h2>{getKoreanName(data)}</h2>
      <LikeButton ref={reviewRef} cinene={cineneData} />
      <div>
        <p>{data?.birthday ? `출생: ${data.birthday}` : '정보 없음'}</p>
      </div>
      {!!creditData?.cast.length && (
        <SimilarMedia data={cast} title="출연 작품" />
      )}
      {!!creditData?.crew.length && (
        <SimilarMedia data={crew} title="제작 작품" />
      )}
      <Reviews ref={reviewRef} data={cineneData} />
      <Comments contentId={cineneData?._id} />
    </PersonDescriptionWrapper>
  );
}

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
