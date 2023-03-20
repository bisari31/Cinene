import { useRef } from 'react';
import { useQuery } from 'react-query';
import styled, { css } from 'styled-components';

import { getCombinedCredits } from 'services/tmdb';
import { useCineneDataQuery } from 'hooks';

import Average from 'components/main/Average';
import { tmdbKeys } from 'utils/keys';
import SimilarMedia from './SimilarMedia';
import Comment from './comments';
import Like from './LikeButton';
import Reviews from './reviews';

interface Props {
  data?: PersonDetails;
  path: MediaType;
  id: number;
}

export default function PersonDescription({ data, path, id }: Props) {
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

  // const setCreditData = (array?: MediaResults[]) => {
  //   const duplication = array?.reduce(
  //     (acc: MediaResults[], cur: MediaResults) => {
  //       if (acc.findIndex((prev) => prev.id === cur.id) === -1) {
  //         acc.push(cur);
  //       }
  //       return acc;
  //     },
  //     [],
  //   );
  //   return duplication?.sort(
  //     (a, b) =>
  //       new Date(b.release_date || (b.first_air_date as string)).getTime() -
  //       new Date(a.release_date || (a.first_air_date as string)).getTime(),
  //   );
  // };

  const setCreditData = (array: CombinedCreditsCastAndCrew[]) => {
    const removedDuclication = array.reduce(
      (acc: CombinedCreditsCastAndCrew[], cur: CombinedCreditsCastAndCrew) => {
        if (acc.findIndex((item) => item.id === cur.id) === -1) {
          acc.push(cur);
        }
        return acc;
      },
      [],
    );
    return removedDuclication;
  };

  return (
    <PersonDescriptionWrapper>
      <Average isMedia={false} cinene={cineneData} />
      <h2>{getKoreanName(data)}</h2>
      <Like ref={reviewRef} cinene={cineneData} />
      <div>
        <p>{data?.birthday ? `출생: ${data.birthday}` : '정보 없음'}</p>
      </div>
      {!!creditData?.cast.length && (
        <SimilarMedia data={setCreditData(creditData.cast)} title="출연 작품" />
      )}
      {!!creditData?.crew.length && (
        <SimilarMedia data={setCreditData(creditData.crew)} title="제작 작품" />
      )}
      <Reviews ref={reviewRef} data={cineneData} />
      <Comment contentId={cineneData?._id} />
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
