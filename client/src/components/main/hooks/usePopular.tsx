import { useState } from 'react';
import { useQuery } from 'react-query';

import { getTrendingMedia } from 'services/tmdb';
import { tmdbKeys } from 'utils/keys';
import { staleTime } from 'utils/queryOptions';

export default function usePopular() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data } = useQuery(tmdbKeys.popular(), getTrendingMedia, {
    ...staleTime,
  });

  const handleSlide = (index: number) => {
    const maxIndex = data?.length;
    if (!maxIndex) return;
    let nextIndex = currentIndex + index;
    if (nextIndex > maxIndex - 1) nextIndex = 0;
    else if (nextIndex < 0) nextIndex = maxIndex - 1;
    setCurrentIndex(nextIndex);
  };

  return {
    data: data?.[currentIndex],
    handleSlide,
  };
}
