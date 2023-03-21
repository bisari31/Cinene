import { memo } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getMediaCredits } from 'services/tmdb';

import Slider from 'components/common/Slider';
import { tmdbKeys } from 'utils/keys';
import CreditItem from './CreditItem';

interface Props {
  id: number;
  path: MediaType;
}

function Credits({ id, path }: Props) {
  const { data } = useQuery(tmdbKeys.credits(path, id), () =>
    getMediaCredits(id, path),
  );

  const getDirector = () =>
    data?.crew.filter((preson) => preson.job === 'Director');

  const director = getDirector();

  if (!data?.cast.length && !data?.crew.length) return null;

  return (
    <CreditsWrapper>
      <Slider title="감독 / 출연진">
        <ul>
          {director?.map((crew) => (
            <CreditItem key={crew.id} item={crew} isDirector />
          ))}
        </ul>
        <ul>
          {data?.cast.map((actor) => (
            <CreditItem key={actor.id} item={actor} />
          ))}
        </ul>
      </Slider>
    </CreditsWrapper>
  );
}

export default memo(Credits);

const CreditsWrapper = styled.div`
  overflow: hidden;
`;
