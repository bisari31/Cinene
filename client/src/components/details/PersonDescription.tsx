import { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled, { css } from 'styled-components';

import { getCombinedCredits } from 'services/media';
import useCineneDataQuery from 'hooks/useCineneDataQuery';

import Average from 'components/main/Average';
import SimilarMedia from './SimilarMedia';
import Comment from './comments';
import Like from './Like';
import Reviews from './Reviews';

interface IProps {
  data?: IPerson;
  path: string;
  id: number;
}

export default function PersonDescription({ data, path, id }: IProps) {
  const getKoreanName = (userData: IPerson | undefined) => {
    if (!userData) return;
    const korean = /[가-힣]/;
    const newName = userData?.also_known_as.filter((text) => korean.test(text));
    return !newName?.length
      ? userData?.name
      : `${newName?.at(-1)} (${userData?.name})`;
  };

  const { data: creditData } = useQuery(
    [path, 'similar', id],
    () => getCombinedCredits(id),
    { refetchOnWindowFocus: false, staleTime: 1000 * 60 * 60 * 6 },
  );

  const cineneData = useCineneDataQuery(path, id, data, getKoreanName(data));

  const setCreditData = (array: IMediaResults[] | undefined) => {
    const duplication = array?.reduce(
      (acc: IMediaResults[], cur: IMediaResults) => {
        if (acc.findIndex((prev) => prev.id === cur.id) === -1) {
          acc.push(cur);
        }
        return acc;
      },
      [],
    );
    return duplication?.sort(
      (a, b) =>
        new Date(b.release_date || (b.first_air_date as string)).getTime() -
        new Date(a.release_date || (a.first_air_date as string)).getTime(),
    );
  };

  return (
    <PersonDescriptionWrapper>
      <Average isMedia={false} cinene={cineneData} />
      <h2>{getKoreanName(data)}</h2>
      <Like />
      <div>
        <p>{data?.birthday ? `출생: ${data.birthday}` : '정보 없음'}</p>
      </div>
      {!!creditData?.cast.length && (
        <SimilarMedia
          data={setCreditData(creditData?.cast)}
          title="출연 작품"
        />
      )}
      {!!creditData?.crew.length && (
        <SimilarMedia
          data={setCreditData(creditData?.crew)}
          title="제작 작품"
        />
      )}
      <Reviews />
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
