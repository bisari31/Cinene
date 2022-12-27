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
  const { data: creditData } = useQuery([path, 'similar', id], () =>
    getCombinedCredits(id),
  );
  return (
    <PersonDescriptionWrapper>
      <h2>{data?.also_known_as[0]}</h2>
      <div>
        <p>출생: {data?.birthday}</p>
      </div>
      {!!creditData?.cast.length && (
        <SimilarMedia data={creditData?.cast} title="출연 작품" />
      )}
      {!!creditData?.crew.length && (
        <SimilarMedia data={creditData?.crew} title="제작 작품" />
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
