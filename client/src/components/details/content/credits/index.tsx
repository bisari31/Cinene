import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getCasts } from 'services/tmdb';

import Slider from 'components/common/Slider';
import { tmdbKeys } from 'utils/keys';
import CreditItem from './CreditItem';

interface Props {
  id: number;
  path: MediaType;
}

export default function Credits({ id, path }: Props) {
  const { data } = useQuery(tmdbKeys.credits(path, id), () =>
    getCasts(id, path),
  );

  const getDirector = () =>
    data?.crew.filter((preson) => preson.job === 'Director');

  const directors = getDirector();

  if (!data?.cast.length && !data?.crew.length) return null;

  return (
    <CreditsWrapper>
      <Slider title="감독 / 출연진">
        <ul>
          {directors?.map((crew) => (
            <CreditItem key={crew.credit_id} item={crew} isDirector />
          ))}
        </ul>
        <ul>
          {data?.cast.map((cast) => (
            <CreditItem key={cast.credit_id} item={cast} />
          ))}
        </ul>
      </Slider>
    </CreditsWrapper>
  );
}

const CreditsWrapper = styled.div`
  overflow: hidden;
`;
