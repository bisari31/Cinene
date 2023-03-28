import { useQuery } from 'react-query';

import { getTopRatedMovie } from 'services/tmdb';
import { getTopRated } from 'services/contents';
import { cineneKeys, queryOptions, tmdbKeys } from 'utils/queryOptions';

import Slider from 'components/common/Slider';
import TopRatedItem from './TopRatedItem';

interface Props {
  type: 'cinene' | 'tmdb';
}
const TITLE = {
  cinene: '씨네네 최고 평점',
  tmdb: 'TMDB 최고 평점',
};

export default function TopRated({ type }: Props) {
  const { data } = useQuery(tmdbKeys.topRated(), getTopRatedMovie, {
    ...queryOptions,
    enabled: type === 'tmdb',
  });
  const { data: cinene } = useQuery(cineneKeys.topRated(), getTopRated, {
    enabled: type === 'cinene',
  });

  return (
    <div>
      <Slider title={TITLE[type]}>
        <ul>
          {type === 'cinene'
            ? cinene?.contents.map((item) => (
                <TopRatedItem key={item._id} item={item} />
              ))
            : data?.map((item) => <TopRatedItem key={item.id} item={item} />)}
        </ul>
      </Slider>
    </div>
  );
}
