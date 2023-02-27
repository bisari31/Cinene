import styled from 'styled-components';
import { useQuery } from 'react-query';

import { getTopRatedMovie } from 'services/tmdb';
import { getTopRated } from 'services/contents';
import { cineneKeys, tmdbKeys } from 'utils/keys';

import Slider from 'components/common/Slider';
import TopRatedItem from './TopRatedItem';

interface Props {
  type: 'cinene' | 'tmdb';
}

export default function TopRated({ type }: Props) {
  const { data } = useQuery(tmdbKeys.topRated(), getTopRatedMovie, {
    staleTime: 1000 * 60 * 60 * 6,
    enabled: type === 'tmdb',
  });
  const { data: cinene } = useQuery(cineneKeys.topRated(), getTopRated, {
    enabled: type === 'cinene',
  });

  const siteType = {
    cinene: {
      title: '씨네네 최고 평점',
    },
    tmdb: {
      title: 'TMDB 최고 평점',
    },
  };

  return (
    <TopRatedWrapper>
      <Slider title={siteType[type].title}>
        <ul>
          {type === 'cinene'
            ? cinene?.contents.map((item) => (
                <TopRatedItem key={item._id} type="cinene" item={item} />
              ))
            : data?.map((item) => (
                <TopRatedItem key={item.id} type="tmdb" item={item} />
              ))}
        </ul>
      </Slider>
    </TopRatedWrapper>
  );
}

const TopRatedWrapper = styled.div``;
