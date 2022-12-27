import { hasSelectionSupport } from '@testing-library/user-event/dist/utils';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getCombinedCredits } from 'services/media';
import styled, { css } from 'styled-components';
import SimilarMedia from './SimilarMedia';

interface IProps {
  data?: IPerson;
  path: string;
  id: number;
}

export default function PersonDescription({ data, path, id }: IProps) {
  const getKoreanName = () => {
    const korean = /[가-힣]/;
    const newName = data?.also_known_as.filter((text) => korean.test(text));
    return !newName?.length ? data?.name : `${newName?.at(-1)} (${data?.name})`;
  };

  const { data: creditData } = useQuery(
    [path, 'similar', id],
    () => getCombinedCredits(id),
    { refetchOnWindowFocus: false },
  );

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
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime(),
    );
  };

  return (
    <PersonDescriptionWrapper>
      <h2>{getKoreanName()}</h2>
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
    </PersonDescriptionWrapper>
  );
}

const PersonDescriptionWrapper = styled.div`
  ${({ theme }) => css`
    & > div:first-child {
      margin-bottom: 2em;
    }
    h2 {
      font-size: 2.3rem;
      font-weight: 500;
    }
    & > div:nth-of-type(1) {
      color: ${theme.colors.gray300};
      font-size: 0.9rem;
      line-height: 1.8;
      margin: 3rem 0;
    }
  `}
`;
